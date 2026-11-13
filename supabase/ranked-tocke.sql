-- indeks. — Ranked: točkovni rank kot v igrah (kumulativen) + skupna lestvica vseh predmetov
-- Zaženi enkrat v Supabase (SQL Editor -> New query -> prilepi -> Run), PO ranked.sql in username.sql.
-- Varno za ponovni zagon.
--
-- Točke testa (0–1500 pri 10 vprašanjih): pravilen odgovor 100 + hitrostni bonus do 50 (linearno glede na porabljen
--   čas v okviru 60 s na vprašanje); napačen ali neodgovorjen 0. Shranijo se v ranked_results.points.
-- Sprememba ranka za test: 20 · (pravilni − polovica vprašanj) + hitrostni bonus / 10.
--   Manj kot polovica pravilnih -> izguba ranka (do −100), polovica -> 0 do +25, vse pravilno -> +100 do +150.
-- Rank dela = vsota sprememb vseh testov (ne pade pod 0). Prvih 5 testov je uvrstitev, nato si na lestvici.
-- Skupni rank = vsota rankov vseh delov, v katerih imaš vsaj 5 testov.
-- Ime na lestvici: profiles.username, sicer vzdevek, sicer ime iz metapodatkov registracije (uporabnik, ki se je
--   registriral s potrditvijo e-pošte in se še ni prijavil z novo aplikacijo), šele nato skrajšan e-naslov z zvezdicami.
-- Stari testi brez točk se preračunajo iz pravilnih odgovorov in skupnega časa (enak bonus za vsa vprašanja).

-- 1) stolpec za točke
alter table public.ranked_results add column if not exists points int;

-- 2) točke testa (shranjene ali ocenjene za stare teste) in sprememba ranka
create or replace function public.ranked_points(p_correct int, p_total int, p_seconds int, p_points int)
returns int
language sql
immutable
as $$
  select coalesce(p_points,
                  p_correct * 100 + round(p_correct * 50 * greatest(0, 1 - p_seconds::numeric / (60 * nullif(p_total, 0)))))::int;
$$;

create or replace function public.ranked_delta(p_correct int, p_total int, p_seconds int, p_points int)
returns int
language sql
immutable
as $$
  select round(20 * (p_correct - p_total / 2.0))::int
       + floor((public.ranked_points(p_correct, p_total, p_seconds, p_points) - 100 * p_correct) / 10.0)::int;
$$;

-- 3) lestvica dela: rank = vsota sprememb, uvrstitev po >= 5 testih
drop function if exists public.ranked_leaderboard(text);   -- vrnjeni stolpci se spremenijo
create or replace function public.ranked_leaderboard(p_part_key text)
returns table (user_id uuid, name text, runs bigint, rating int, avg_pct numeric, best_pct numeric, avg_seconds numeric,
               avg_points numeric, best_points int, last_delta int, is_me boolean)
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
         coalesce(nullif(trim(p.username), ''), nullif(trim(p.nickname), ''),
                  nullif(trim((select u.raw_user_meta_data->>'username' from auth.users u where u.id = r.user_id)), ''),
                  left(split_part(coalesce(p.email, ''), '@', 1), 3) || '***') as name,
         count(*) as runs,
         greatest(0, sum(r.d))::int as rating,
         round(avg(100.0 * r.correct / nullif(r.total, 0)), 1) as avg_pct,
         max(round(100.0 * r.correct / nullif(r.total, 0))) as best_pct,
         round(avg(r.seconds)) as avg_seconds,
         round(avg(r.pts), 1) as avg_points,
         max(r.pts) as best_points,
         max(case when r.rn = 1 then r.d end) as last_delta,
         (r.user_id = auth.uid()) as is_me
  from r
  left join public.profiles p on p.id = r.user_id
  group by r.user_id, p.username, p.nickname, p.email
  having count(*) >= 5
  order by rating desc, avg_points desc, avg_seconds asc
  limit 100;
$$;
revoke all on function public.ranked_leaderboard(text) from public, anon;
grant execute on function public.ranked_leaderboard(text) to authenticated;

-- 4) skupna lestvica: vsota rankov vseh delov z vsaj 5 testi
drop function if exists public.ranked_overall_leaderboard();
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
  select per.user_id,
         coalesce(nullif(trim(p.username), ''), nullif(trim(p.nickname), ''),
                  nullif(trim((select u.raw_user_meta_data->>'username' from auth.users u where u.id = per.user_id)), ''),
                  left(split_part(coalesce(p.email, ''), '@', 1), 3) || '***') as name,
         count(*) as parts,
         sum(per.n) as runs,
         sum(per.rt)::int as rating,
         (per.user_id = auth.uid()) as is_me
  from per
  left join public.profiles p on p.id = per.user_id
  group by per.user_id, p.username, p.nickname, p.email
  order by rating desc, runs desc
  limit 100;
$$;
revoke all on function public.ranked_overall_leaderboard() from public, anon;
grant execute on function public.ranked_overall_leaderboard() to authenticated;

-- 5) skupna lestvica LETNIKA: vsota rankov delov, katerih semester (prvi del part_key, npr. s1, s2, y2s1) je v p_sems
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
  select per.user_id,
         coalesce(nullif(trim(p.username), ''), nullif(trim(p.nickname), ''),
                  nullif(trim((select u.raw_user_meta_data->>'username' from auth.users u where u.id = per.user_id)), ''),
                  left(split_part(coalesce(p.email, ''), '@', 1), 3) || '***') as name,
         count(*) as parts,
         sum(per.n) as runs,
         sum(per.rt)::int as rating,
         (per.user_id = auth.uid()) as is_me
  from per
  left join public.profiles p on p.id = per.user_id
  group by per.user_id, p.username, p.nickname, p.email
  order by rating desc, runs desc
  limit 100;
$$;
revoke all on function public.ranked_year_leaderboard(text[]) from public, anon;
grant execute on function public.ranked_year_leaderboard(text[]) to authenticated;
