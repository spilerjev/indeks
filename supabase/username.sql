-- indeks. — Uporabniško ime: unikatno, filtrirano, omogoča prijavo z imenom namesto e-naslova.
-- Zaženi enkrat v Supabase: SQL Editor -> New query -> prilepi -> Run (varno za ponovni zagon).
-- Predpogoj: supabase/ranked.sql (tabela profiles z email, ranked_leaderboard).

alter table public.profiles add column if not exists username text;
create unique index if not exists profiles_username_lower on public.profiles (lower(username));

-- 1) prijava z uporabniškim imenom: ime -> e-naslov (kliče ga neprijavljen odjemalec pred signInWithPassword)
create or replace function public.login_email(p_username text)
returns text
language sql
security definer
stable
set search_path = public
as $$
  select email from public.profiles where lower(username) = lower(trim(p_username)) limit 1;
$$;
revoke all on function public.login_email(text) from public;
grant execute on function public.login_email(text) to anon, authenticated;

-- 2) nastavitev lastnega uporabniškega imena: oblika, filter neprimernih besed, unikatnost
create or replace function public.set_username(p_username text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v text := trim(p_username);
  n text;
  banned text[] := array['kurac','kurc','kurb','kurv','pizd','pick','jeb','fuk','fuck','drka','peder','pedr','cigan','cefur',
                         'prasic','prasec','sranje','hitler','nacist','nazi','penis','vagin','klitor','seks','sex','porn',
                         'nigg','negr','shit','bitch','cunt','dick','cock','pussy','whore','slut','rape'];
begin
  if auth.uid() is null then raise exception 'Nisi prijavljen.'; end if;
  if v is null or length(v) < 3 or length(v) > 20 then raise exception 'Uporabniško ime naj ima 3–20 znakov.'; end if;
  if v !~ '^[A-Za-z0-9_.-]+$' then raise exception 'Dovoljene so le črke, številke, pika, podčrtaj in pomišljaj.'; end if;
  if v !~ '[A-Za-z]' then raise exception 'Uporabniško ime naj vsebuje vsaj eno črko.'; end if;
  n := regexp_replace(translate(lower(v), '0134578čšžćđ', 'oieastbcszcd'), '[^a-z]', '', 'g');
  if exists (select 1 from unnest(banned) b where position(b in n) > 0) then raise exception 'To uporabniško ime ni dovoljeno.'; end if;
  if exists (select 1 from public.profiles where lower(username) = lower(v) and id <> auth.uid()) then raise exception 'Uporabniško ime je že zasedeno.'; end if;
  insert into public.profiles (id, email, username)
    values (auth.uid(), (select email from auth.users where id = auth.uid()), v)
    on conflict (id) do update set username = excluded.username;
  return v;
end
$$;
revoke all on function public.set_username(text) from public, anon;
grant execute on function public.set_username(text) to authenticated;

-- 3) lestvica prikaže uporabniško ime (nato vzdevek, nato skrajšan e-naslov)
create or replace function public.ranked_leaderboard(p_part_key text)
returns table (user_id uuid, name text, runs bigint, avg_pct numeric, best_pct numeric, avg_seconds numeric, is_me boolean)
language sql
security definer
set search_path = public
as $$
  select r.user_id,
         coalesce(nullif(trim(p.username), ''), nullif(trim(p.nickname), ''), left(split_part(coalesce(p.email, ''), '@', 1), 3) || '***') as name,
         count(*) as runs,
         round(avg(100.0 * r.correct / nullif(r.total, 0)), 1) as avg_pct,
         max(round(100.0 * r.correct / nullif(r.total, 0))) as best_pct,
         round(avg(r.seconds)) as avg_seconds,
         (r.user_id = auth.uid()) as is_me
  from public.ranked_results r
  left join public.profiles p on p.id = r.user_id
  where r.part_key = p_part_key
  group by r.user_id, p.username, p.nickname, p.email
  having count(*) >= 5
  order by avg_pct desc, avg_seconds asc
  limit 100;
$$;
revoke all on function public.ranked_leaderboard(text) from public, anon;
grant execute on function public.ranked_leaderboard(text) to authenticated;
