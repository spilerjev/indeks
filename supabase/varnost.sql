-- indeks. - varnostni popravki pred uradnim launchem (ZAGNANO 21. 11. 2026 v projektu Indeks, preverjeno)
-- RAZLIČICA: 1 (21. 11. 2026)
-- Zaženi v projektu Indeks (fdcnkqjbuatsisznqcos), NE v family-portal: SQL Editor -> New query -> prilepi -> Run.
-- Varno za ponovni zagon. Popravki so preneseni tudi v username.sql, ranked.sql, ranked-tocke.sql in 1v1.sql.
--
-- POZOR 1: §1 zahteva hkratno spremembo predloge (indeks-template.jsx, Login):
--   - preverjanje zasedenosti imena pred signUp: rpc("login_email") -> rpc("username_taken")
--   - prijava z uporabniškim imenom preneha delovati (app pokaže "vpiši e-naslov").
--   Predloga je bila popravljena v commitu 143ef9b.
-- POZOR 2: popravki so (od 21. 11. 2026) tudi v izvornih datotekah, zato jih njihov ponovni zagon ne razveljavi.
--   Izjema: delete_my_account in constraint ranked_results_sane sta samo tu.

-- =====================================================================
-- 1) BLOKER: login_email je vračal e-naslov komurkoli (tudi neprijavljenim).
--    Z javnimi uporabniškimi imeni (lestvice, arena) je to pomenilo pobiranje vseh e-naslovov.
-- =====================================================================
revoke execute on function public.login_email(text) from anon, authenticated, public;

-- namesto tega: samo "ali je ime zasedeno" (brez e-naslova)
create or replace function public.username_taken(p_username text)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from public.profiles where lower(username) = lower(trim(p_username)));
$$;
revoke all on function public.username_taken(text) from public;
grant execute on function public.username_taken(text) to anon, authenticated;
-- Prijava z uporabniškim imenom: zdaj samo z e-naslovom. Če jo hočeš nazaj, jo naredi prek
-- Edge Function (ime + geslo -> strežnik poišče e-naslov s service_role -> signInWithPassword),
-- da e-naslov nikoli ne pride do odjemalca.

-- =====================================================================
-- 2) BLOKER: politika "update own profile" je dovolila neposreden zapis VSEH stolpcev
--    (username mimo filtra neprimernih besed, email, photo s tujim URL-jem, bio brez omejitve dolžine).
--    Aplikacija profila ne piše neposredno - vse gre prek update_profile / set_username.
-- =====================================================================
drop policy if exists "update own profile" on public.profiles;
revoke insert, update, delete on public.profiles from anon, authenticated;

-- 3) Slika profila: samo lastna datoteka v bucketu avatars (prej je bil dovoljen poljuben URL,
--    ki bi se naložil v brskalniku drugih uporabnikov).
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
  if p_photo is not null and (length(p_photo) > 300 or
     p_photo not like 'https://fdcnkqjbuatsisznqcos.supabase.co/storage/v1/object/public/avatars/' || auth.uid()::text || '.jpg%')
    then raise exception 'Neveljaven naslov slike.'; end if;
  insert into public.profiles (id, email, letnik, smer, bio, avatar, perk, photo, updated_at)
    values (auth.uid(), (select email from auth.users where id = auth.uid()), p_letnik, v_smer, v_bio, left(p_character, 30), left(p_perk, 30), p_photo, now())
    on conflict (id) do update set letnik = excluded.letnik, smer = excluded.smer, bio = excluded.bio,
      avatar = coalesce(excluded.avatar, public.profiles.avatar), perk = coalesce(excluded.perk, public.profiles.perk), photo = coalesce(excluded.photo, public.profiles.photo), updated_at = now();
  return jsonb_build_object('letnik', p_letnik, 'smer', v_smer, 'bio', v_bio, 'character', p_character, 'perk', p_perk, 'photo', p_photo);
end
$$;
revoke all on function public.update_profile(smallint, text, text, text, text, text) from public, anon;
grant execute on function public.update_profile(smallint, text, text, text, text, text) to authenticated;

-- počisti morebitne tuje URL-je, ki so že v bazi
update public.profiles set photo = null
  where photo is not null
    and photo not like 'https://fdcnkqjbuatsisznqcos.supabase.co/storage/v1/object/public/avatars/' || id::text || '.jpg%';

-- =====================================================================
-- 4) Ranked: rezultate pošilja odjemalec, zato goljufije ne moremo preprečiti,
--    lahko pa zavrnemo očitno nemogoče vrednosti. NOT VALID = velja za nove vrstice.
-- =====================================================================
alter table public.ranked_results drop constraint if exists ranked_results_sane;
alter table public.ranked_results add constraint ranked_results_sane
  check (total between 1 and 30 and correct between 0 and total and seconds between 0 and 3600
         and (points is null or points between 0 and total * 225)) not valid;

-- =====================================================================
-- 4b) Lestvice: ime samo iz profiles.username (prej: tudi user_metadata, ki ga uporabnik spreminja
--     mimo filtra, in prve 3 črke e-naslova + ***). Telesa so enaka kot v ranked-tocke.sql, razen imena.
-- =====================================================================
create or replace function public.ranked_leaderboard(p_part_key text)
returns table (user_id uuid, name text, runs bigint, rating int, avg_pct numeric, best_pct numeric, avg_seconds numeric,
               avg_points numeric, best_points int, last_delta int, recent_pct numeric, recent_seconds numeric, is_me boolean)
language sql
security definer
set search_path = public
as $$
  with r as (
    select x.user_id, x.correct, x.total, x.seconds,
           public.ranked_points(x.correct, x.total, x.seconds, x.points) as pts,
           public.ranked_delta(x.correct, x.total, x.seconds, x.points) as d,
           row_number() over (partition by x.user_id order by x.created_at desc) as rn
    from public.ranked_results x
    where x.part_key = p_part_key
  )
  select r.user_id,
         coalesce(nullif(trim(p.username), ''), 'Igralec') as name,
         count(*) as runs,
         greatest(0, sum(r.d))::int as rating,
         round(avg(100.0 * r.correct / nullif(r.total, 0)), 1) as avg_pct,
         max(round(100.0 * r.correct / nullif(r.total, 0))) as best_pct,
         round(avg(r.seconds)) as avg_seconds,
         round(avg(r.pts), 1) as avg_points,
         max(r.pts) as best_points,
         max(case when r.rn = 1 then r.d end) as last_delta,
         round(avg(case when r.rn <= 10 then 100.0 * r.correct / nullif(r.total, 0) end), 1) as recent_pct,
         round(avg(case when r.rn <= 10 then r.seconds end)) as recent_seconds,
         (r.user_id = auth.uid()) as is_me
  from r
  left join public.profiles p on p.id = r.user_id
  group by r.user_id, p.username
  having count(*) >= 5
  order by rating desc, avg_points desc, avg_seconds asc
  limit 100;
$$;
revoke all on function public.ranked_leaderboard(text) from public, anon;
grant execute on function public.ranked_leaderboard(text) to authenticated;

create or replace function public.ranked_overall_leaderboard()
returns table (user_id uuid, name text, parts bigint, runs bigint, rating int, is_me boolean)
language sql
security definer
set search_path = public
as $$
  with per as (
    select x.user_id, x.part_key, count(*) as n,
           greatest(0, sum(public.ranked_delta(x.correct, x.total, x.seconds, x.points)))::int as rt
    from public.ranked_results x
    group by x.user_id, x.part_key
    having count(*) >= 5
  )
  select per.user_id, coalesce(nullif(trim(p.username), ''), 'Igralec') as name,
         count(*) as parts, sum(per.n) as runs, sum(per.rt)::int as rating, (per.user_id = auth.uid()) as is_me
  from per
  left join public.profiles p on p.id = per.user_id
  group by per.user_id, p.username
  order by rating desc, runs desc
  limit 100;
$$;
revoke all on function public.ranked_overall_leaderboard() from public, anon;
grant execute on function public.ranked_overall_leaderboard() to authenticated;

create or replace function public.ranked_year_leaderboard(p_sems text[])
returns table (user_id uuid, name text, parts bigint, runs bigint, rating int, is_me boolean)
language sql
security definer
set search_path = public
as $$
  with per as (
    select x.user_id, x.part_key, count(*) as n,
           greatest(0, sum(public.ranked_delta(x.correct, x.total, x.seconds, x.points)))::int as rt
    from public.ranked_results x
    where split_part(x.part_key, '/', 1) = any(p_sems)
    group by x.user_id, x.part_key
    having count(*) >= 5
  )
  select per.user_id, coalesce(nullif(trim(p.username), ''), 'Igralec') as name,
         count(*) as parts, sum(per.n) as runs, sum(per.rt)::int as rating, (per.user_id = auth.uid()) as is_me
  from per
  left join public.profiles p on p.id = per.user_id
  group by per.user_id, p.username
  order by rating desc, runs desc
  limit 100;
$$;
revoke all on function public.ranked_year_leaderboard(text[]) from public, anon;
grant execute on function public.ranked_year_leaderboard(text[]) to authenticated;

-- =====================================================================
-- 4c) Statistika igralca (zmage, porazi, povprečje kvizov) samo zase in za prijatelje.
--     Prej jo je lahko prebral kdorkoli prijavljen za katerikoli uid. App jo kliče samo prek social_state.
-- =====================================================================
create or replace function public.player_stats(p_uid uuid)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with ok as (select (p_uid = auth.uid() or public.are_friends(auth.uid(), p_uid)) as v),
  m as (
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
  select case when not (select v from ok) then null else jsonb_build_object(
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
  ) end;
$$;
revoke all on function public.player_stats(uuid) from public, anon;
grant execute on function public.player_stats(uuid) to authenticated;

-- =====================================================================
-- 5) Izbris lastnega računa (GDPR, 17. člen) - za gumb "Izbriši račun" v profilu.
--    Aplikacija naj pred klicem izbriše še avatars/<uid>.jpg prek Storage API.
--    Matchi, ki jih je uporabnik gostil, se izbrišejo (cascade); v tujih matchih izgine njegova vrstica.
--    Njegov uuid ostane (brez imena) v challenges.winner / abandoned_by in challenge_events.actor - to ni več osebni podatek,
--    ko račun in profil ne obstajata, ga ni več mogoče povezati z osebo; zgodovina pokaže zmagovalca brez imena.
--    TESTIRAJ NA TESTNEM RAČUNU, preden gumb objaviš.
-- =====================================================================
create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare v_me uuid := auth.uid();
begin
  if v_me is null then raise exception 'Nisi prijavljen.'; end if;
  delete from public.user_stats where user_id = v_me;
  delete from public.profiles where id = v_me;
  delete from auth.users where id = v_me;   -- ostalo (ranked, prijatelji, matchi) gre prek on delete cascade
end
$$;
revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;

-- =====================================================================
-- 6) PREVERJANJE po zagonu (rezultat preglej ročno)
-- =====================================================================
-- a) vse tabele v public morajo imeti rowsecurity = true:
select tablename, rowsecurity from pg_tables where schemaname = 'public' order by 1;
-- b) vse politike:
-- select tablename, policyname, cmd, roles, qual, with_check from pg_policies where schemaname in ('public', 'storage') order by 1, 2;
-- c) nato še Dashboard -> Advisors -> Security Advisor (vse rdeče/rumene postavke).
