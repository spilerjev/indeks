-- indeks. — Arena: profil, prijatelji, matchi za 2–4 igralce (duel / trio / četverka), klasika + bitka z liki
-- RAZLIČICA: 8 (12. 11. 2026, 22:30) — predaja ob odhodu, pogoji zmage v klasiki, XP/nivoji in odklepanje, gledalci, slika profila, bucket avatars
-- Zaženi enkrat v Supabase: SQL Editor -> New query -> prilepi -> Run.
-- Varno za ponovni zagon (if not exists / or replace / drop policy if exists).
-- Predpogoj: supabase/ranked.sql in supabase/username.sql (tabela profiles z email, username; user_stats).
-- Opomba: tabele matchev iz prve (1v1) različice te datoteke se pobrišejo in ustvarijo na novo (shema je drugačna).

-- =====================================================================
-- 1) PROFIL: letnik, smer/program, kratek opis, lik + oprema za bitko
-- =====================================================================
alter table public.profiles add column if not exists letnik smallint;
alter table public.profiles add column if not exists smer text;
alter table public.profiles add column if not exists bio text;
alter table public.profiles add column if not exists avatar text;   -- id lika (characters.js)
alter table public.profiles add column if not exists perk text;     -- id opreme (characters.js ITEMS)
alter table public.profiles add column if not exists photo text;    -- URL profilne slike (Storage bucket avatars)
alter table public.profiles add column if not exists updated_at timestamptz;

drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles for select using (auth.uid() = id);
drop policy if exists "update own profile" on public.profiles;
create policy "update own profile" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

drop function if exists public.update_profile(smallint, text, text);
drop function if exists public.update_profile(smallint, text, text, text);
drop function if exists public.update_profile(smallint, text, text, text, text);
create or replace function public.update_profile(p_letnik smallint, p_smer text, p_bio text, p_character text default null, p_perk text default null, p_photo text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_smer text := nullif(trim(coalesce(p_smer, '')), '');
  v_bio  text := nullif(trim(coalesce(p_bio, '')), '');
begin
  if auth.uid() is null then raise exception 'Nisi prijavljen.'; end if;
  if p_letnik is not null and (p_letnik < 1 or p_letnik > 5) then raise exception 'Letnik naj bo med 1 in 5.'; end if;
  if v_smer is not null and length(v_smer) > 60 then raise exception 'Smer naj ima največ 60 znakov.'; end if;
  if v_bio is not null and length(v_bio) > 200 then raise exception 'Opis naj ima največ 200 znakov.'; end if;
  if p_photo is not null and length(p_photo) > 300 then raise exception 'Neveljaven naslov slike.'; end if;
  insert into public.profiles (id, email, letnik, smer, bio, avatar, perk, photo, updated_at)
    values (auth.uid(), (select email from auth.users where id = auth.uid()), p_letnik, v_smer, v_bio, left(p_character, 30), left(p_perk, 30), p_photo, now())
    on conflict (id) do update set letnik = excluded.letnik, smer = excluded.smer, bio = excluded.bio,
      avatar = coalesce(excluded.avatar, public.profiles.avatar), perk = coalesce(excluded.perk, public.profiles.perk), photo = coalesce(excluded.photo, public.profiles.photo), updated_at = now();
  return jsonb_build_object('letnik', p_letnik, 'smer', v_smer, 'bio', v_bio, 'character', p_character, 'perk', p_perk, 'photo', p_photo);
end
$$;
revoke all on function public.update_profile(smallint, text, text, text, text, text) from public, anon;
grant execute on function public.update_profile(smallint, text, text, text, text, text) to authenticated;

-- Storage: bucket 'avatars' (javno branje), vsak uporabnik nalaga samo svojo datoteko <uid>.jpg
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  values ('avatars', 'avatars', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
  on conflict (id) do update set public = true, file_size_limit = 2097152, allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];
drop policy if exists "avatars read" on storage.objects;
create policy "avatars read" on storage.objects for select using (bucket_id = 'avatars');
drop policy if exists "avatars upload own" on storage.objects;
create policy "avatars upload own" on storage.objects for insert to authenticated with check (bucket_id = 'avatars' and name = auth.uid()::text || '.jpg');
drop policy if exists "avatars update own" on storage.objects;
create policy "avatars update own" on storage.objects for update to authenticated using (bucket_id = 'avatars' and name = auth.uid()::text || '.jpg');
drop policy if exists "avatars delete own" on storage.objects;
create policy "avatars delete own" on storage.objects for delete to authenticated using (bucket_id = 'avatars' and name = auth.uid()::text || '.jpg');

-- =====================================================================
-- 2) PRIJATELJI: prošnja -> sprejem/zavrnitev -> seznam
-- =====================================================================
create table if not exists public.friendships (
  id bigint generated always as identity primary key,
  requester uuid not null references auth.users(id) on delete cascade,
  addressee uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (requester <> addressee)
);
create unique index if not exists friendships_pair on public.friendships (least(requester, addressee), greatest(requester, addressee));
create index if not exists friendships_addressee on public.friendships (addressee);
alter table public.friendships enable row level security;
drop policy if exists "friendships read own" on public.friendships;
create policy "friendships read own" on public.friendships for select using (auth.uid() = requester or auth.uid() = addressee);
-- pisanje gre samo prek funkcij spodaj (security definer)

create or replace function public.are_friends(a uuid, b uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.friendships where status = 'accepted'
                 and least(requester, addressee) = least(a, b) and greatest(requester, addressee) = greatest(a, b));
$$;
revoke all on function public.are_friends(uuid, uuid) from public, anon;
grant execute on function public.are_friends(uuid, uuid) to authenticated;

create or replace function public.send_friend_request(p_username text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_me uuid := auth.uid();
  v_other uuid;
  v_name text;
  r record;
begin
  if v_me is null then raise exception 'Nisi prijavljen.'; end if;
  select id, username into v_other, v_name from public.profiles where lower(username) = lower(trim(p_username)) limit 1;
  if v_other is null then raise exception 'Uporabnika s tem imenom ni.'; end if;
  if v_other = v_me then raise exception 'Samega sebe ne moreš dodati.'; end if;
  select * into r from public.friendships
    where least(requester, addressee) = least(v_me, v_other) and greatest(requester, addressee) = greatest(v_me, v_other);
  if found then
    if r.status = 'accepted' then raise exception 'Že sta prijatelja.'; end if;
    if r.status = 'pending' and r.requester = v_me then raise exception 'Prošnja je že poslana.'; end if;
    if r.status = 'pending' and r.addressee = v_me then
      update public.friendships set status = 'accepted', updated_at = now() where id = r.id;
      return jsonb_build_object('status', 'accepted', 'username', v_name);
    end if;
    update public.friendships set requester = v_me, addressee = v_other, status = 'pending', created_at = now(), updated_at = now() where id = r.id;
    return jsonb_build_object('status', 'pending', 'username', v_name);
  end if;
  insert into public.friendships (requester, addressee) values (v_me, v_other);
  return jsonb_build_object('status', 'pending', 'username', v_name);
end
$$;
revoke all on function public.send_friend_request(text) from public, anon;
grant execute on function public.send_friend_request(text) to authenticated;

create or replace function public.respond_friend_request(p_id bigint, p_accept boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then raise exception 'Nisi prijavljen.'; end if;
  update public.friendships set status = case when p_accept then 'accepted' else 'declined' end, updated_at = now()
    where id = p_id and addressee = auth.uid() and status = 'pending';
  if not found then raise exception 'Prošnje ni (ali je že obdelana).'; end if;
end
$$;
revoke all on function public.respond_friend_request(bigint, boolean) from public, anon;
grant execute on function public.respond_friend_request(bigint, boolean) to authenticated;

create or replace function public.remove_friend(p_id bigint)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then raise exception 'Nisi prijavljen.'; end if;
  delete from public.friendships where id = p_id and (requester = auth.uid() or addressee = auth.uid());
end
$$;
revoke all on function public.remove_friend(bigint) from public, anon;
grant execute on function public.remove_friend(bigint) to authenticated;

-- =====================================================================
-- 3) MATCHI: gostitelj povabi 1–3 prijatelje; ista vprašanja; napredek v živo; klasika (točke) ali bitka (HP)
-- =====================================================================
drop table if exists public.challenge_events cascade;
drop table if exists public.challenge_players cascade;
drop table if exists public.challenge_progress cascade;
drop table if exists public.challenges cascade;
drop function if exists public.create_challenge(uuid, text, text, jsonb, int);
drop function if exists public.duel_ready(uuid);
drop function if exists public.duel_progress(uuid, int, int, boolean, int);

create table public.challenges (
  id uuid primary key default gen_random_uuid(),
  host uuid not null references auth.users(id) on delete cascade,
  part_key text not null,              -- sem/predmet/del
  part_name text not null,             -- "Predmet · Del" za prikaz
  question_ids jsonb not null,         -- seznam ID-jev vprašanj, enak vrstni red za vse
  seconds_limit int not null default 600,
  mode text not null default 'classic' check (mode in ('classic', 'basic', 'battle')),   -- klasika (točke) | osnovna bitka (vsi enaki) | bitka z liki
  size int not null default 2 check (size between 2 and 4),   -- število igralcev ob začetku (za statistiko: duel/trio/četverka)
  win_rule text not null default 'questions' check (win_rule in ('questions', 'time', 'points')),   -- klasika: pogoj zmage
  win_value int,                       -- questions: št. vprašanj; time: sekunde; points: cilj točk
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined', 'cancelled', 'abandoned', 'done')),
  winner uuid,                         -- null = neodločeno ali ni končano
  abandoned_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.challenge_players (
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'invited' check (status in ('host', 'invited', 'accepted', 'declined', 'left')),
  ready_at timestamptz,
  avatar jsonb,                        -- {id, name, items, ability, hp, atk, crit, streak, quick, shield, heal, healEvery, penaltyAt, hints} (bitka)
  hp int, max_hp int,
  answered int not null default 0,
  correct int not null default 0,
  points int not null default 0,       -- klasika: 100 za pravilen + hitrostni bonus do 50 (enako kot ranked točke)
  streak int not null default 0,
  max_streak int not null default 0,
  wrong_streak int not null default 0,  -- zaporedni napačni (kazen pri 3)
  ability_used boolean not null default false,  -- aktivna sposobnost lika porabljena
  boost boolean not null default false,         -- 'allin': naslednji odgovor 3× / −20 HP
  dmg_dealt int not null default 0,
  finished boolean not null default false,
  eliminated boolean not null default false,
  seconds int,
  last_answer_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (challenge_id, user_id)
);
create index challenge_players_user on public.challenge_players (user_id);
create table public.challenge_events (
  id bigint generated always as identity primary key,
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  actor uuid not null,
  kind text not null,                  -- hit | crit | miss | ko | heal | penalty | ability | finish | left
  dmg int,
  streak int,
  targets jsonb,                       -- [{user_id, hp}]
  created_at timestamptz not null default now()
);
create index challenge_events_ch on public.challenge_events (challenge_id, id);

-- ob spremembi statusa matcha osveži vrstice vseh igralcev: odjemalec posluša samo challenge_players (filter user_id),
-- zato Realtime ne preverja RLS vsakega dogodka na challenges za vse naročnike
create or replace function public.challenges_touch_players()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.challenge_players set updated_at = now() where challenge_id = new.id;
  return new;
end
$$;
drop trigger if exists challenges_touch_players on public.challenges;
create trigger challenges_touch_players after update of status, winner on public.challenges
  for each row execute function public.challenges_touch_players();

-- Realtime potrebuje celotno vrstico v dogodkih (filtri po stolpcih)
alter table public.challenges replica identity full;
alter table public.challenge_players replica identity full;
alter table public.challenge_events replica identity full;

-- član matcha? (security definer, da politika na challenge_players ne kliče same sebe)
create or replace function public.is_player(p_challenge uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.challenge_players where challenge_id = p_challenge and user_id = auth.uid());
$$;
revoke all on function public.is_player(uuid) from public, anon;
grant execute on function public.is_player(uuid) to authenticated;

alter table public.challenges enable row level security;
alter table public.challenge_players enable row level security;
alter table public.challenge_events enable row level security;
-- vsi prijavljeni lahko berejo (gledalci matchev v živo); pisanje gre izključno prek funkcij
drop policy if exists "challenges read own" on public.challenges;
drop policy if exists "challenges read all" on public.challenges;
create policy "challenges read all" on public.challenges for select to authenticated using (true);
drop policy if exists "players read own challenge" on public.challenge_players;
drop policy if exists "players read all" on public.challenge_players;
create policy "players read all" on public.challenge_players for select to authenticated using (true);
drop policy if exists "events read own challenge" on public.challenge_events;
drop policy if exists "events read all" on public.challenge_events;
create policy "events read all" on public.challenge_events for select to authenticated using (true);

-- aktivni igralci (gostitelj + sprejeli; brez zavrnjenih in tistih, ki so odšli)
create or replace function public.active_players(p_id uuid)
returns setof public.challenge_players
language sql
stable
security definer
set search_path = public
as $$
  select * from public.challenge_players where challenge_id = p_id and status in ('host', 'accepted');
$$;
revoke all on function public.active_players(uuid) from public, anon;
grant execute on function public.active_players(uuid) to authenticated;

drop function if exists public.create_challenge(uuid[], text, text, jsonb, text, int);
create or replace function public.create_challenge(p_opponents uuid[], p_part_key text, p_part_name text, p_question_ids jsonb, p_mode text default 'classic', p_seconds_limit int default 600, p_win_rule text default 'questions', p_win_value int default null)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_me uuid := auth.uid();
  v_id uuid;
  o uuid;
  opps uuid[];
begin
  if v_me is null then raise exception 'Nisi prijavljen.'; end if;
  select array_agg(distinct x) into opps from unnest(p_opponents) x where x is not null and x <> v_me;
  if opps is null or array_length(opps, 1) < 1 then raise exception 'Izberi vsaj enega prijatelja.'; end if;
  if array_length(opps, 1) > 3 then raise exception 'Največ 4 igralci (ti + 3).'; end if;
  foreach o in array opps loop
    if not public.are_friends(v_me, o) then raise exception 'Izzoveš lahko samo prijatelje.'; end if;
  end loop;
  if jsonb_typeof(p_question_ids) <> 'array' or jsonb_array_length(p_question_ids) < 1 or jsonb_array_length(p_question_ids) > 60
  then raise exception 'Neveljaven nabor vprašanj.'; end if;
  if p_mode not in ('classic', 'basic', 'battle') then raise exception 'Neznan način.'; end if;
  if p_mode in ('basic', 'battle') and array_length(opps, 1) <> 1 then raise exception 'Bitka je samo za dva igralca (duel).'; end if;
  if p_win_rule not in ('questions', 'time', 'points') then raise exception 'Neznan pogoj zmage.'; end if;
  if (select count(*) from public.challenges where host = v_me and status = 'pending') >= 5 then raise exception 'Imaš že 5 odprtih izzivov; počakaj na odgovore ali jih prekliči.'; end if;
  insert into public.challenges (host, part_key, part_name, question_ids, seconds_limit, mode, size, win_rule, win_value)
    values (v_me, p_part_key, left(p_part_name, 120), p_question_ids, greatest(60, least(3600, coalesce(p_seconds_limit, 600))), p_mode, 1 + array_length(opps, 1),
            case when p_mode = 'classic' then p_win_rule else 'questions' end,
            case when p_mode <> 'classic' then null when p_win_rule = 'points' then least(5000, greatest(300, coalesce(p_win_value, 1000))) when p_win_rule = 'time' then greatest(60, least(3600, coalesce(p_seconds_limit, 600))) else jsonb_array_length(p_question_ids) end)
    returning id into v_id;
  insert into public.challenge_players (challenge_id, user_id, status) values (v_id, v_me, 'host');
  foreach o in array opps loop
    insert into public.challenge_players (challenge_id, user_id, status) values (v_id, o, 'invited');
  end loop;
  return v_id;
end
$$;
revoke all on function public.create_challenge(uuid[], text, text, jsonb, text, int, text, int) from public, anon;
grant execute on function public.create_challenge(uuid[], text, text, jsonb, text, int, text, int) to authenticated;

-- povabljenec sprejme/zavrne; ko odgovorijo vsi: >= 2 igralca -> 'accepted' (lobby), sicer 'declined'
create or replace function public.respond_challenge(p_id uuid, p_accept boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  n_inv int; n_act int;
begin
  if auth.uid() is null then raise exception 'Nisi prijavljen.'; end if;
  update public.challenge_players set status = case when p_accept then 'accepted' else 'declined' end, updated_at = now()
    where challenge_id = p_id and user_id = auth.uid() and status = 'invited'
    and exists (select 1 from public.challenges where id = p_id and status = 'pending');
  if not found then raise exception 'Izziva ni (ali je že obdelan).'; end if;
  select count(*) filter (where status = 'invited'), count(*) filter (where status in ('host', 'accepted')) into n_inv, n_act
    from public.challenge_players where challenge_id = p_id;
  if n_inv = 0 then
    update public.challenges set status = case when n_act >= 2 then 'accepted' else 'declined' end, size = greatest(2, n_act), updated_at = now()
      where id = p_id and status = 'pending';
  end if;
end
$$;
revoke all on function public.respond_challenge(uuid, boolean) from public, anon;
grant execute on function public.respond_challenge(uuid, boolean) to authenticated;

-- gostitelj začne lobby, ko je sprejel vsaj en povabljenec (ne čaka na ostale); ali prekliče izziv
create or replace function public.start_lobby(p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare n_act int;
begin
  if auth.uid() is null then raise exception 'Nisi prijavljen.'; end if;
  select count(*) into n_act from public.active_players(p_id);
  if n_act < 2 then raise exception 'Še nihče ni sprejel.'; end if;
  update public.challenge_players set status = 'declined', updated_at = now() where challenge_id = p_id and status = 'invited';
  update public.challenges set status = 'accepted', size = n_act, updated_at = now() where id = p_id and host = auth.uid() and status = 'pending';
end
$$;
revoke all on function public.start_lobby(uuid) from public, anon;
grant execute on function public.start_lobby(uuid) to authenticated;

create or replace function public.cancel_challenge(p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then raise exception 'Nisi prijavljen.'; end if;
  update public.challenges set status = 'cancelled', updated_at = now()
    where id = p_id and host = auth.uid() and status = 'pending';
end
$$;
revoke all on function public.cancel_challenge(uuid) from public, anon;
grant execute on function public.cancel_challenge(uuid) to authenticated;

-- začetek matcha: 3 s po tem, ko je pripravljen še zadnji aktivni igralec
create or replace function public.duel_start_at(p_id uuid)
returns timestamptz
language sql
stable
security definer
set search_path = public
as $$
  select case when count(*) >= 2 and bool_and(ready_at is not null) then max(ready_at) + interval '3 seconds' end
  from public.active_players(p_id);
$$;
revoke all on function public.duel_start_at(uuid) from public, anon;
grant execute on function public.duel_start_at(uuid) to authenticated;

-- stanje enega matcha (lobby, match, rezultat); server_now za uskladitev ure; zadnjih 25 dogodkov
create or replace function public.duel_state(p_id uuid)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'id', c.id, 'status', c.status, 'host', c.host, 'mode', c.mode, 'size', c.size, 'win_rule', c.win_rule, 'win_value', c.win_value, 'is_player', public.is_player(c.id),
    'part_key', c.part_key, 'part_name', c.part_name, 'question_ids', c.question_ids, 'seconds_limit', c.seconds_limit,
    'winner', c.winner, 'abandoned_by', c.abandoned_by, 'created_at', c.created_at,
    'start_at', public.duel_start_at(c.id), 'server_now', now(),
    'players', coalesce((select jsonb_agg(jsonb_build_object('user_id', p.user_id, 'username', pr.username, 'photo', pr.photo, 'status', p.status, 'ready_at', p.ready_at,
                           'character', p.avatar, 'hp', p.hp, 'max_hp', p.max_hp, 'answered', p.answered, 'correct', p.correct, 'points', p.points,
                           'streak', p.streak, 'max_streak', p.max_streak, 'dmg_dealt', p.dmg_dealt, 'finished', p.finished, 'eliminated', p.eliminated, 'seconds', p.seconds,
                           'ability_used', p.ability_used, 'boost', p.boost)
                           order by (p.status = 'host') desc, lower(pr.username))
                         from public.challenge_players p left join public.profiles pr on pr.id = p.user_id where p.challenge_id = c.id), '[]'::jsonb),
    'events', coalesce((select jsonb_agg(jsonb_build_object('id', e.id, 'actor', e.actor, 'kind', e.kind, 'dmg', e.dmg, 'streak', e.streak, 'targets', e.targets, 'at', e.created_at) order by e.id)
                        from (select * from public.challenge_events where challenge_id = c.id order by id desc limit 25) e), '[]'::jsonb)
  )
  from public.challenges c
  where c.id = p_id and auth.uid() is not null;
$$;
revoke all on function public.duel_state(uuid) from public, anon;
grant execute on function public.duel_state(uuid) to authenticated;

-- "Pripravljen sem" (+ lik za bitko; številke iz characters.js, strežnik jih omeji na varne meje)
create or replace function public.duel_ready(p_id uuid, p_character jsonb default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  c record;
  ch jsonb;
  v_hp int;
begin
  if auth.uid() is null then raise exception 'Nisi prijavljen.'; end if;
  select * into c from public.challenges where id = p_id and status = 'accepted';
  if not found then raise exception 'Match ni v pripravi.'; end if;
  if not exists (select 1 from public.active_players(p_id) where user_id = auth.uid()) then raise exception 'Nisi igralec tega matcha.'; end if;
  if c.mode = 'basic' then
    -- osnovna bitka: vsi enaki (številke so enake kot BASIC v characters.js)
    v_hp := 100;
    ch := jsonb_build_object('id', 'basic', 'name', 'Študent', 'items', '', 'ability', '', 'hp', 100, 'atk', 10, 'crit', 10, 'streak', 0.1,
                             'quick', 0, 'shield', 0, 'heal', 5, 'healEvery', 3, 'penaltyAt', 2, 'hints', 0);
  elsif c.mode = 'battle' then
    ch := coalesce(p_character, '{}'::jsonb);
    -- odklepanje po nivoju (battle pass)
    declare v_level int := public.level_of(public.player_xp(auth.uid())); v_it text;
    begin
      if coalesce((select level from public.arena_unlocks where kind = 'character' and id = coalesce(ch->>'id', 'smith')), 1) > v_level then raise exception 'Ta lik še ni odklenjen (tvoj nivo: %).', v_level; end if;
      foreach v_it in array string_to_array(coalesce(ch->>'items', ''), ',') loop
        if v_it <> '' and coalesce((select level from public.arena_unlocks where kind = 'item' and id = v_it), 1) > v_level then raise exception 'Ta oprema še ni odklenjena (tvoj nivo: %).', v_level; end if;
      end loop;
    end;
    v_hp := least(160, greatest(60, coalesce((ch->>'hp')::int, 100)));
    ch := jsonb_build_object(
      'id', left(coalesce(ch->>'id', 'smith'), 30), 'name', left(coalesce(ch->>'name', 'Adam Smith'), 30), 'items', left(coalesce(ch->>'items', ''), 60),
      'ability', left(coalesce(ch->>'ability', ''), 20),
      'hp', v_hp,
      'atk', least(20, greatest(5, coalesce((ch->>'atk')::int, 10))),
      'crit', least(50, greatest(0, coalesce((ch->>'crit')::int, 10))),
      'streak', least(0.3, greatest(0, coalesce((ch->>'streak')::numeric, 0.1))),
      'quick', least(0.5, greatest(0, coalesce((ch->>'quick')::numeric, 0))),
      'shield', least(0.5, greatest(0, coalesce((ch->>'shield')::numeric, 0))),
      'heal', least(30, greatest(0, coalesce((ch->>'heal')::int, 0))),
      'healEvery', least(5, greatest(2, coalesce((ch->>'healEvery')::int, 3))),
      'penaltyAt', least(4, greatest(2, coalesce((ch->>'penaltyAt')::int, 2))),
      'hints', least(5, greatest(0, coalesce((ch->>'hints')::int, 0))));
  end if;
  update public.challenge_players
    set ready_at = coalesce(ready_at, now()),
        avatar = case when c.mode in ('basic', 'battle') and ready_at is null then ch else avatar end,
        hp = case when c.mode in ('basic', 'battle') and ready_at is null then v_hp else hp end,
        max_hp = case when c.mode in ('basic', 'battle') and ready_at is null then v_hp else max_hp end,
        updated_at = now()
    where challenge_id = p_id and user_id = auth.uid();
  return public.duel_state(p_id);
end
$$;
revoke all on function public.duel_ready(uuid, jsonb) from public, anon;
grant execute on function public.duel_ready(uuid, jsonb) to authenticated;

-- zaključek: vsi aktivni končali (ali izločeni) -> zmagovalec. Ob izteku časa (+15 s) nedokončani veljajo za
-- odšle (zaprt zavihek): pri 2 igralcih je match prekinjen (ne šteje), pri več se nadaljuje brez njih.
-- Lobby, v katerem 2 uri niso vsi pripravljeni, zapade.
create or replace function public.settle_challenge(p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  c record;
  v_start timestamptz;
  v_winner uuid;
  n_act int; n_unfin int;
  best record;
begin
  select * into c from public.challenges where id = p_id and status = 'accepted';
  if not found then return; end if;
  v_start := public.duel_start_at(p_id);
  if v_start is null then
    if now() > c.updated_at + interval '2 hours' then
      update public.challenges set status = 'abandoned', updated_at = now() where id = p_id and status = 'accepted';
    end if;
    return;
  end if;
  -- bitka: ko ostane en sam živ (ali nihče), je matcha konec za vse
  if c.mode in ('basic', 'battle') and (select count(*) from public.active_players(p_id) where not eliminated) <= 1 then
    update public.challenge_players set finished = true, seconds = coalesce(seconds, least(c.seconds_limit, extract(epoch from (now() - v_start))::int)), updated_at = now()
      where challenge_id = p_id and status in ('host', 'accepted') and not finished;
  end if;
  -- klasika na čas: ob izteku so vsi končali; na točke: ko kdo doseže cilj, je konec
  if c.mode = 'classic' and c.win_rule = 'time' and now() >= v_start + make_interval(secs => c.seconds_limit) then
    update public.challenge_players set finished = true, seconds = coalesce(seconds, c.seconds_limit), updated_at = now()
      where challenge_id = p_id and status in ('host', 'accepted') and not finished;
  end if;
  if c.mode = 'classic' and c.win_rule = 'points' and exists (select 1 from public.active_players(p_id) where points >= coalesce(c.win_value, 1000)) then
    update public.challenge_players set finished = true, seconds = coalesce(seconds, least(c.seconds_limit, extract(epoch from (now() - v_start))::int)), updated_at = now()
      where challenge_id = p_id and status in ('host', 'accepted') and not finished;
  end if;
  select count(*) filter (where not finished) into n_unfin from public.active_players(p_id);
  if n_unfin > 0 then
    if now() < v_start + make_interval(secs => c.seconds_limit + 15) then return; end if;
    -- čas je potekel: nedokončani so odšli (predaja)
    update public.challenge_players set status = 'left', finished = true, updated_at = now()
      where challenge_id = p_id and status in ('host', 'accepted') and not finished;
  end if;
  select count(*) into n_act from public.active_players(p_id);
  if n_act = 0 then
    update public.challenges set status = 'abandoned', updated_at = now(),
      abandoned_by = (select user_id from public.challenge_players where challenge_id = p_id and status = 'left' order by updated_at desc limit 1)
      where id = p_id and status = 'accepted';
    return;
  end if;
  if n_act = 1 then
    -- predaja: edini preostali zmaga (tisti, ki so odšli, dobijo poraz)
    update public.challenges set status = 'done', winner = (select user_id from public.active_players(p_id) limit 1), updated_at = now() where id = p_id and status = 'accepted';
    return;
  end if;
  if c.mode in ('basic', 'battle') then
    select * into best from public.active_players(p_id)
      order by (not eliminated) desc, coalesce(hp, 0) desc, correct desc, coalesce(seconds, c.seconds_limit) asc limit 1;
    -- neodločeno: dva najboljša enaka po vseh merilih
    if (select count(*) from public.active_players(p_id) where (not eliminated) = (not best.eliminated) and coalesce(hp, 0) = coalesce(best.hp, 0) and correct = best.correct and coalesce(seconds, c.seconds_limit) = coalesce(best.seconds, c.seconds_limit)) > 1
    then v_winner := null; else v_winner := best.user_id; end if;
  else
    select * into best from public.active_players(p_id)
      order by points desc, correct desc, coalesce(seconds, c.seconds_limit) asc limit 1;
    if (select count(*) from public.active_players(p_id) where points = best.points and correct = best.correct and coalesce(seconds, c.seconds_limit) = coalesce(best.seconds, c.seconds_limit)) > 1
    then v_winner := null; else v_winner := best.user_id; end if;
  end if;
  update public.challenges set status = 'done', winner = v_winner, updated_at = now() where id = p_id and status = 'accepted';
end
$$;
revoke all on function public.settle_challenge(uuid) from public, anon;
grant execute on function public.settle_challenge(uuid) to authenticated;

-- odgovor na vprašanje: strežnik šteje, računa točke (klasika) ali škodo (bitka: napad × serija × hitrost × kritik 2×, ščit tarče;
-- vsak healEvery-ti zaporedni pravilni zdravi heal HP; penaltyAt (privzeto 2) zaporednih napačnih = −10 HP sebi)
create or replace function public.duel_answer(p_id uuid, p_ok boolean)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  c record;
  me record;
  n int;
  v_start timestamptz;
  q_secs numeric;         -- sekunde za to vprašanje (od prejšnjega odgovora oz. začetka)
  v_points int := 0;
  dmg numeric := 0;
  is_crit boolean := false;
  v_streak int;
  v_wrong int := 0;
  tg jsonb := '[]'::jsonb;
  t record;
  v_kind text;
  dmg_t int;
  v_heal int := 0;
  v_pen int := 0;
  v_ab text;
  opp_avg numeric;
begin
  if auth.uid() is null then raise exception 'Nisi prijavljen.'; end if;
  select * into c from public.challenges where id = p_id and status = 'accepted';
  if not found then return public.duel_state(p_id); end if;
  -- zakleni svojo vrstico: dva hitra odgovora zapored se obdelata zaporedno (brez izgubljenega štetja)
  select * into me from public.challenge_players where challenge_id = p_id and user_id = auth.uid() and status in ('host', 'accepted') for update;
  if not found or me.finished then return public.duel_state(p_id); end if;
  v_start := public.duel_start_at(p_id);
  if v_start is null or now() < v_start then raise exception 'Match se še ni začel.'; end if;
  n := jsonb_array_length(c.question_ids);
  if me.answered >= n then return public.duel_state(p_id); end if;
  q_secs := greatest(0, extract(epoch from (now() - coalesce(me.last_answer_at, v_start))));
  v_ab := coalesce(me.avatar->>'ability', '');
  if p_ok then
    v_streak := me.streak + 1;
    v_points := 100 + round(50 * greatest(0, 1 - q_secs / 60.0));
    if c.mode in ('basic', 'battle') then
      dmg := (me.avatar->>'atk')::numeric * least(1.5, 1 + (me.avatar->>'streak')::numeric * (v_streak - 1))
           * (case when q_secs <= 15 then 1 + coalesce((me.avatar->>'quick')::numeric, 0) else 1 end);
      -- pasivne sposobnosti lika
      if v_ab = 'underdog' then
        select avg(coalesce(hp, 0)) into opp_avg from public.active_players(p_id) where user_id <> me.user_id and not eliminated;
        if opp_avg is not null and coalesce(me.hp, 0) < opp_avg then dmg := dmg * 1.15; end if;
      elsif v_ab = 'rage' and coalesce(me.hp, 0) < 0.3 * coalesce(me.max_hp, 100) then dmg := dmg * 1.4;
      end if;
      if me.boost then dmg := dmg * 3; end if;                       -- allin: pravilen = 3×
      if random() * 100 < (me.avatar->>'crit')::numeric then is_crit := true; dmg := dmg * 2; end if;
      dmg := greatest(1, round(dmg));
      if v_ab = 'compound' then v_heal := least(3, greatest(0, coalesce(me.max_hp, 100) - coalesce(me.hp, 0))); end if;
      for t in select * from public.active_players(p_id) where user_id <> me.user_id and not eliminated loop
        dmg_t := greatest(1, round((case when is_crit and coalesce(t.avatar->>'ability', '') = 'nocrit' then dmg / 2 else dmg end) * (1 - coalesce((t.avatar->>'shield')::numeric, 0))))::int;
        update public.challenge_players set hp = greatest(0, hp - dmg_t), updated_at = now() where challenge_id = p_id and user_id = t.user_id;
        tg := tg || jsonb_build_object('user_id', t.user_id, 'hp', greatest(0, t.hp - dmg_t), 'dmg', dmg_t);
        if t.hp - dmg_t <= 0 then
          update public.challenge_players set eliminated = true, finished = true, seconds = least(c.seconds_limit, extract(epoch from (now() - v_start))::int), updated_at = now()
            where challenge_id = p_id and user_id = t.user_id;
          insert into public.challenge_events (challenge_id, actor, kind, dmg, targets) values (p_id, me.user_id, 'ko', dmg::int, jsonb_build_array(jsonb_build_object('user_id', t.user_id, 'hp', 0)));
        end if;
      end loop;
      -- zdravljenje: vsak healEvery-ti zaporedni pravilni odgovor (oprema)
      if coalesce((me.avatar->>'heal')::int, 0) > 0 and v_streak % coalesce((me.avatar->>'healEvery')::int, 3) = 0 then
        v_heal := least(v_heal + (me.avatar->>'heal')::int, greatest(0, coalesce(me.max_hp, 100) - coalesce(me.hp, 0)));
      end if;
    end if;
    v_kind := case when is_crit then 'crit' else 'hit' end;
  else
    v_streak := 0;
    v_wrong := me.wrong_streak + 1;
    v_kind := 'miss';
    -- kazen proti ugibanju: penaltyAt (privzeto 2) zaporednih napačnih = −10 HP
    if c.mode in ('basic', 'battle') and v_wrong >= coalesce((me.avatar->>'penaltyAt')::int, 2) then
      v_pen := 10;
      v_wrong := 0;
      v_kind := 'penalty';
    end if;
    if c.mode in ('basic', 'battle') and me.boost then v_pen := v_pen + 20; v_kind := 'penalty'; end if;   -- allin: napačen = −20 HP
    v_pen := least(v_pen, greatest(0, coalesce(me.hp, 0)));
  end if;
  update public.challenge_players
    set answered = me.answered + 1, correct = me.correct + (case when p_ok then 1 else 0 end), points = me.points + v_points,
        streak = v_streak, max_streak = greatest(me.max_streak, v_streak), wrong_streak = v_wrong, dmg_dealt = me.dmg_dealt + dmg::int, boost = false,
        hp = case when c.mode in ('basic', 'battle') then coalesce(hp, 0) + v_heal - v_pen else hp end,
        eliminated = eliminated or (c.mode in ('basic', 'battle') and coalesce(hp, 0) + v_heal - v_pen <= 0),
        last_answer_at = now(),
        finished = finished or (me.answered + 1 >= n) or (c.mode in ('basic', 'battle') and coalesce(hp, 0) + v_heal - v_pen <= 0),
        seconds = case when me.answered + 1 >= n then coalesce(seconds, least(c.seconds_limit, extract(epoch from (now() - v_start))::int)) else seconds end,
        updated_at = now()
    where challenge_id = p_id and user_id = me.user_id;
  insert into public.challenge_events (challenge_id, actor, kind, dmg, streak, targets)
    values (p_id, me.user_id, v_kind, case when v_kind = 'penalty' then v_pen when c.mode in ('basic', 'battle') and p_ok then dmg::int end, v_streak, case when c.mode in ('basic', 'battle') then tg end);
  if v_heal > 0 and (v_ab <> 'compound' or (coalesce((me.avatar->>'heal')::int, 0) > 0 and v_streak % coalesce((me.avatar->>'healEvery')::int, 3) = 0)) then insert into public.challenge_events (challenge_id, actor, kind, dmg, streak) values (p_id, me.user_id, 'heal', v_heal, v_streak); end if;
  perform public.settle_challenge(p_id);
  return public.duel_state(p_id);
end
$$;
revoke all on function public.duel_answer(uuid, boolean) from public, anon;
grant execute on function public.duel_answer(uuid, boolean) to authenticated;

-- aktivna sposobnost lika (enkrat na match): stimulus (+25 HP), allin (naslednji odgovor 3× / −20), tariff (vsi −15 HP), cheat (odjemalec pokaže odgovor)
create or replace function public.duel_ability(p_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  c record;
  me record;
  t record;
  v_ab text;
  v_start timestamptz;
  tg jsonb := '[]'::jsonb;
begin
  if auth.uid() is null then raise exception 'Nisi prijavljen.'; end if;
  select * into c from public.challenges where id = p_id and status = 'accepted' and mode = 'battle';
  if not found then raise exception 'Sposobnosti so na voljo samo v bitki z liki.'; end if;
  select * into me from public.challenge_players where challenge_id = p_id and user_id = auth.uid() and status in ('host', 'accepted') for update;
  if not found or me.finished then raise exception 'Nisi (več) v matchu.'; end if;
  if me.ability_used then raise exception 'Sposobnost si že porabil.'; end if;
  v_start := public.duel_start_at(p_id);
  if v_start is null or now() < v_start then raise exception 'Match se še ni začel.'; end if;
  v_ab := coalesce(me.avatar->>'ability', '');
  if v_ab not in ('stimulus', 'allin', 'tariff', 'cheat') then raise exception 'Ta lik nima aktivne sposobnosti.'; end if;
  if v_ab = 'stimulus' then
    update public.challenge_players set hp = least(coalesce(max_hp, 100), coalesce(hp, 0) + 25), ability_used = true, updated_at = now() where challenge_id = p_id and user_id = me.user_id;
    insert into public.challenge_events (challenge_id, actor, kind, dmg) values (p_id, me.user_id, 'ability', 25);
  elsif v_ab = 'allin' then
    update public.challenge_players set boost = true, ability_used = true, updated_at = now() where challenge_id = p_id and user_id = me.user_id;
    insert into public.challenge_events (challenge_id, actor, kind) values (p_id, me.user_id, 'ability');
  elsif v_ab = 'tariff' then
    for t in select * from public.active_players(p_id) where user_id <> me.user_id and not eliminated loop
      update public.challenge_players set hp = greatest(0, hp - 15), updated_at = now() where challenge_id = p_id and user_id = t.user_id;
      tg := tg || jsonb_build_object('user_id', t.user_id, 'hp', greatest(0, t.hp - 15), 'dmg', 15);
      if t.hp - 15 <= 0 then
        update public.challenge_players set eliminated = true, finished = true, seconds = least(c.seconds_limit, extract(epoch from (now() - v_start))::int), updated_at = now()
          where challenge_id = p_id and user_id = t.user_id;
        insert into public.challenge_events (challenge_id, actor, kind, dmg, targets) values (p_id, me.user_id, 'ko', 15, jsonb_build_array(jsonb_build_object('user_id', t.user_id, 'hp', 0)));
      end if;
    end loop;
    update public.challenge_players set ability_used = true, dmg_dealt = dmg_dealt + 15, updated_at = now() where challenge_id = p_id and user_id = me.user_id;
    insert into public.challenge_events (challenge_id, actor, kind, dmg, targets) values (p_id, me.user_id, 'ability', 15, tg);
    perform public.settle_challenge(p_id);
  else
    update public.challenge_players set ability_used = true, updated_at = now() where challenge_id = p_id and user_id = me.user_id;
    insert into public.challenge_events (challenge_id, actor, kind) values (p_id, me.user_id, 'ability');
  end if;
  return public.duel_state(p_id);
end
$$;
revoke all on function public.duel_ability(uuid) from public, anon;
grant execute on function public.duel_ability(uuid) to authenticated;

-- konec lastnega dela (iztek časa ali vsa vprašanja): neodgovorjena štejejo kot napačna
create or replace function public.duel_finish(p_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  c record;
  v_start timestamptz;
begin
  if auth.uid() is null then raise exception 'Nisi prijavljen.'; end if;
  select * into c from public.challenges where id = p_id and status = 'accepted';
  if not found then return public.duel_state(p_id); end if;
  v_start := public.duel_start_at(p_id);
  if v_start is not null then
    update public.challenge_players
      set finished = true, seconds = coalesce(seconds, least(c.seconds_limit, extract(epoch from (now() - v_start))::int)), updated_at = now()
      where challenge_id = p_id and user_id = auth.uid() and status in ('host', 'accepted') and not finished;
    if found then insert into public.challenge_events (challenge_id, actor, kind) values (p_id, auth.uid(), 'finish'); end if;
    perform public.settle_challenge(p_id);
  end if;
  return public.duel_state(p_id);
end
$$;
revoke all on function public.duel_finish(uuid) from public, anon;
grant execute on function public.duel_finish(uuid) to authenticated;

-- odhod iz matcha = predaja: odhajajoči dobi poraz, pri dveh igralcih preostali zmaga, pri več ostali nadaljujejo.
-- Pred začetkom (lobby, nihče še ni pripravljen) odhod match prekliče brez posledic.
create or replace function public.abandon_challenge(p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare n_act int; v_start timestamptz;
begin
  if auth.uid() is null then raise exception 'Nisi prijavljen.'; end if;
  if not exists (select 1 from public.challenges where id = p_id and status = 'accepted') then return; end if;
  v_start := public.duel_start_at(p_id);
  if v_start is null and not exists (select 1 from public.active_players(p_id) where ready_at is not null) then
    update public.challenge_players set status = 'left', updated_at = now() where challenge_id = p_id and user_id = auth.uid() and status in ('host', 'accepted');
    if (select count(*) from public.active_players(p_id)) < 2 then
      update public.challenges set status = 'cancelled', updated_at = now() where id = p_id and status = 'accepted';
    end if;
    return;
  end if;
  update public.challenge_players set status = 'left', finished = true, updated_at = now()
    where challenge_id = p_id and user_id = auth.uid() and status in ('host', 'accepted');
  if not found then return; end if;
  insert into public.challenge_events (challenge_id, actor, kind) values (p_id, auth.uid(), 'left');
  select count(*) into n_act from public.active_players(p_id);
  if n_act = 0 then
    update public.challenges set status = 'abandoned', abandoned_by = auth.uid(), updated_at = now() where id = p_id and status = 'accepted';
  elsif n_act = 1 then
    update public.challenges set status = 'done', winner = (select user_id from public.active_players(p_id) limit 1), updated_at = now() where id = p_id and status = 'accepted';
  else
    perform public.settle_challenge(p_id);
  end if;
end
$$;
revoke all on function public.abandon_challenge(uuid) from public, anon;
grant execute on function public.abandon_challenge(uuid) to authenticated;

-- =====================================================================
-- 4a) XP, NIVOJI IN ODKLEPANJE (battle pass) — enake številke kot v characters.js (XP_RULES, LEVELS, unlock)
-- =====================================================================
-- XP: 10 na rešen kviz (vadba), 40 na odigran match, 60 na zmago
create or replace function public.player_xp(p_uid uuid)
returns int
language sql
stable
security definer
set search_path = public
as $$
  select (
    10 * (select count(*) from public.user_stats s,
                 lateral jsonb_each(coalesce(s.stats, '{}'::jsonb)) as d(key, val),
                 lateral jsonb_array_elements(coalesce(d.val->'attempts', '[]'::jsonb)) as a
          where s.user_id = p_uid and a->>'pct' is not null)
    + 40 * (select count(*) from public.challenges c join public.challenge_players cp on cp.challenge_id = c.id and cp.user_id = p_uid
            where c.status = 'done' and cp.status in ('host', 'accepted', 'left'))
    + 60 * (select count(*) from public.challenges c where c.status = 'done' and c.winner = p_uid)
  )::int;
$$;
revoke all on function public.player_xp(uuid) from public, anon;
grant execute on function public.player_xp(uuid) to authenticated;

-- pragovi nivojev (nivo 1 = 0 XP); enako kot LEVELS v characters.js
create or replace function public.level_of(p_xp int)
returns int
language sql
immutable
as $$
  select count(*)::int from unnest(array[0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3250, 3850, 4500, 5200, 5950, 6750, 7600, 8500]) t where t <= coalesce(p_xp, 0);
$$;

-- kaj se odklene na katerem nivoju; enako kot unlock v characters.js (liki in oprema)
create table if not exists public.arena_unlocks (kind text not null, id text not null, level int not null, primary key (kind, id));
insert into public.arena_unlocks (kind, id, level) values
  ('character', 'smith', 1), ('item', 'svincnik', 1), ('item', 'zvezek', 1),
  ('character', 'keynes', 2), ('item', 'macbook', 3), ('character', 'marx', 4), ('item', 'airpods', 5),
  ('character', 'thatcher', 6), ('item', 'redbull', 7), ('character', 'buffett', 8), ('item', 'vrecka', 9),
  ('character', 'gates', 10), ('item', 'kavica', 11), ('character', 'huang', 12), ('item', 'toast', 13),
  ('character', 'musk', 14), ('item', 'burger', 15), ('character', 'trump', 16), ('item', 'ucbenik', 17), ('item', 'plonkec', 18)
  on conflict (kind, id) do update set level = excluded.level;
alter table public.arena_unlocks enable row level security;
drop policy if exists "unlocks read" on public.arena_unlocks;
create policy "unlocks read" on public.arena_unlocks for select to authenticated using (true);

-- =====================================================================
-- 4) JAVNA STATISTIKA IGRALCA (vidijo jo prijatelji): zmage/porazi po velikosti in načinu + vadba
-- =====================================================================
create or replace function public.player_stats(p_uid uuid)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with m as (
    select c.id, c.mode, c.size, c.winner, (c.winner = p_uid) as won
    from public.challenges c join public.challenge_players cp on cp.challenge_id = c.id and cp.user_id = p_uid
    where c.status = 'done' and cp.status in ('host', 'accepted', 'left')
  ),
  att as (
    select (a->>'pct')::numeric as pct
    from public.user_stats s,
         lateral jsonb_each(coalesce(s.stats, '{}'::jsonb)) as d(key, val),
         lateral jsonb_array_elements(coalesce(d.val->'attempts', '[]'::jsonb)) as a
    where s.user_id = p_uid and a->>'pct' is not null
  )
  select jsonb_build_object(
    'duel_w',   (select count(*) from m where size = 2 and won is true),
    'duel_l',   (select count(*) from m where size = 2 and winner is not null and won is not true),
    'trio_w',   (select count(*) from m where size = 3 and won is true),
    'trio_l',   (select count(*) from m where size = 3 and winner is not null and won is not true),
    'squad_w',  (select count(*) from m where size = 4 and won is true),
    'squad_l',  (select count(*) from m where size = 4 and winner is not null and won is not true),
    'battle_w', (select count(*) from m where mode in ('basic', 'battle') and won is true),
    'wins',     (select count(*) from m where won is true),
    'matches',  (select count(*) from m),
    'attempts', (select count(*) from att),
    'avg_pct',  (select round(avg(pct)) from att),
    'xp',       public.player_xp(p_uid),
    'level',    public.level_of(public.player_xp(p_uid))
  );
$$;
revoke all on function public.player_stats(uuid) from public, anon;
grant execute on function public.player_stats(uuid) to authenticated;

-- meta: zmage po likih in opremi v vseh končanih bitkah (vsi uporabniki, brez imen)
create or replace function public.arena_meta()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with rows as (
    select cp.user_id, cp.avatar, (c.winner = cp.user_id) as won, c.size
    from public.challenges c join public.challenge_players cp on cp.challenge_id = c.id
    where c.status = 'done' and c.mode = 'battle' and cp.status in ('host', 'accepted') and cp.avatar is not null
  )
  select jsonb_build_object(
    'matches', (select count(distinct c.id) from public.challenges c where c.status = 'done' and c.mode = 'battle'),
    'characters', coalesce((select jsonb_agg(jsonb_build_object('id', id, 'matches', n, 'wins', w) order by n desc)
                            from (select avatar->>'id' as id, count(*) as n, count(*) filter (where won) as w from rows group by 1) x), '[]'::jsonb),
    'items', coalesce((select jsonb_agg(jsonb_build_object('id', id, 'matches', n, 'wins', w) order by n desc)
                       from (select it as id, count(*) as n, count(*) filter (where won) as w
                             from rows, lateral unnest(string_to_array(coalesce(avatar->>'items', ''), ',')) as it where it <> '' group by 1) x), '[]'::jsonb),
    'setups', coalesce((select jsonb_agg(jsonb_build_object('character', ch, 'items', its, 'matches', n, 'wins', w) order by n desc, w desc)
                        from (select avatar->>'id' as ch, coalesce(avatar->>'items', '') as its, count(*) as n, count(*) filter (where won) as w from rows group by 1, 2) x
                        where n >= 2), '[]'::jsonb)
  );
$$;
revoke all on function public.arena_meta() from public, anon;
grant execute on function public.arena_meta() to authenticated;

-- matchi, ki tečejo zdaj (za gledalce); začeti v zadnjih 2 urah
create or replace function public.arena_live()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'id', c.id, 'mode', c.mode, 'size', c.size, 'part_name', c.part_name, 'created_at', c.created_at, 'start_at', public.duel_start_at(c.id), 'win_rule', c.win_rule, 'win_value', c.win_value,
    'players', (select jsonb_agg(jsonb_build_object('user_id', cp.user_id, 'username', pr.username, 'photo', pr.photo, 'character', cp.avatar->>'id',
                                                     'hp', cp.hp, 'points', cp.points, 'answered', cp.answered, 'correct', cp.correct, 'finished', cp.finished, 'is_me', cp.user_id = auth.uid())
                                   order by (cp.status = 'host') desc)
                from public.challenge_players cp left join public.profiles pr on pr.id = cp.user_id
                where cp.challenge_id = c.id and cp.status in ('host', 'accepted'))
  ) order by c.created_at desc), '[]'::jsonb)
  from public.challenges c
  where c.status = 'accepted' and public.duel_start_at(c.id) is not null and c.created_at > now() - interval '2 hours';
$$;
revoke all on function public.arena_live() from public, anon;
grant execute on function public.arena_live() to authenticated;

-- zgodovina vseh matchev (zadnjih p_limit končanih), vidna vsem prijavljenim
create or replace function public.arena_history(p_limit int default 30)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'id', c.id, 'mode', c.mode, 'size', c.size, 'part_name', c.part_name, 'created_at', c.created_at, 'status', c.status,
    'winner', c.winner, 'winner_name', (select username from public.profiles where id = c.winner),
    'players', (select jsonb_agg(jsonb_build_object('user_id', cp.user_id, 'username', pr.username, 'photo', pr.photo, 'status', cp.status,
                                                     'character', cp.avatar->>'id', 'items', cp.avatar->>'items',
                                                     'hp', cp.hp, 'correct', cp.correct, 'points', cp.points, 'is_me', cp.user_id = auth.uid())
                                   order by (cp.user_id = c.winner) desc, coalesce(cp.hp, 0) desc, cp.points desc)
                from public.challenge_players cp left join public.profiles pr on pr.id = cp.user_id
                where cp.challenge_id = c.id and cp.status in ('host', 'accepted', 'left'))
  ) order by c.created_at desc), '[]'::jsonb)
  from (select * from public.challenges where status = 'done' order by created_at desc limit least(100, greatest(1, coalesce(p_limit, 30)))) c;
$$;
revoke all on function public.arena_history(int) from public, anon;
grant execute on function public.arena_history(int) to authenticated;

-- =====================================================================
-- 5) VSE DRUŽABNO STANJE V ENEM KLICU: profil, prijatelji (+statistika), prošnje, matchi, bilanca
-- =====================================================================
create or replace function public.social_state()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with me as (select auth.uid() as id),
  fr as (
    select f.id, f.status, f.created_at,
           case when f.requester = (select id from me) then f.addressee else f.requester end as other,
           (f.requester = (select id from me)) as outgoing
    from public.friendships f where f.requester = (select id from me) or f.addressee = (select id from me)
  ),
  ch as (
    select c.*, cp.status as my_status
    from public.challenges c join public.challenge_players cp on cp.challenge_id = c.id and cp.user_id = (select id from me)
    order by c.created_at desc limit 60
  )
  select jsonb_build_object(
    'profile', (select jsonb_build_object('username', p.username, 'letnik', p.letnik, 'smer', p.smer, 'bio', p.bio, 'character', p.avatar, 'perk', p.perk, 'photo', p.photo) from public.profiles p where p.id = (select id from me)),
    'record', public.player_stats((select id from me)),
    'friends', coalesce((select jsonb_agg(jsonb_build_object('id', fr.id, 'user_id', fr.other, 'username', p.username, 'letnik', p.letnik, 'smer', p.smer, 'bio', p.bio, 'character', p.avatar, 'perk', p.perk, 'photo', p.photo, 'since', fr.created_at,
                                                             'stats', public.player_stats(fr.other)) order by lower(p.username))
                         from fr join public.profiles p on p.id = fr.other where fr.status = 'accepted'), '[]'::jsonb),
    'requests_in', coalesce((select jsonb_agg(jsonb_build_object('id', fr.id, 'user_id', fr.other, 'username', p.username, 'letnik', p.letnik, 'smer', p.smer, 'photo', p.photo, 'created_at', fr.created_at) order by fr.created_at desc)
                             from fr join public.profiles p on p.id = fr.other where fr.status = 'pending' and not fr.outgoing), '[]'::jsonb),
    'requests_out', coalesce((select jsonb_agg(jsonb_build_object('id', fr.id, 'user_id', fr.other, 'username', p.username, 'created_at', fr.created_at) order by fr.created_at desc)
                              from fr join public.profiles p on p.id = fr.other where fr.status = 'pending' and fr.outgoing), '[]'::jsonb),
    'challenges', coalesce((select jsonb_agg(jsonb_build_object('id', ch.id, 'status', ch.status, 'mode', ch.mode, 'size', ch.size, 'my_status', ch.my_status, 'is_host', ch.host = (select id from me),
                                                 'host', (select username from public.profiles where id = ch.host),
                                                 'part_key', ch.part_key, 'part_name', ch.part_name, 'winner', ch.winner,
                                                 'winner_name', (select username from public.profiles where id = ch.winner),
                                                 'created_at', ch.created_at, 'n', jsonb_array_length(ch.question_ids),
                                                 'players', (select jsonb_agg(jsonb_build_object('user_id', cp.user_id, 'username', pr.username, 'status', cp.status, 'correct', cp.correct, 'points', cp.points, 'hp', cp.hp) order by (cp.status = 'host') desc, lower(pr.username))
                                                             from public.challenge_players cp left join public.profiles pr on pr.id = cp.user_id where cp.challenge_id = ch.id)
                                                ) order by ch.created_at desc)
                            from ch), '[]'::jsonb)
  );
$$;
revoke all on function public.social_state() from public, anon;
grant execute on function public.social_state() to authenticated;

-- =====================================================================
-- 6) REALTIME: dogodki za povabila, sprejem, napredek in udarce v živo
-- =====================================================================
do $$
begin
  begin alter publication supabase_realtime add table public.friendships; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.challenges; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.challenge_players; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.challenge_events; exception when duplicate_object then null; end;
end $$;
