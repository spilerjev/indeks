-- indeks.: povprečja vseh uporabnikov (anonimno, samo agregati).
-- Zaženi v Supabase → SQL Editor. Varno ponovno zagnati.
-- Posamezne statistike drugih uporabnikov ostanejo skrite (RLS); funkcija vrne le skupne številke.
-- Povprečja po kompletu se prikažejo šele, ko je komplet reševalo vsaj 3 uporabnikov.

create or replace function public.community_stats()
returns jsonb
language sql
stable
security definer
set search_path = public, auth
as $$
  with att as (
    select s.user_id, d.key as deck, (a->>'pct')::numeric as pct
    from public.user_stats s,
         lateral jsonb_each(coalesce(s.stats, '{}'::jsonb)) as d(key, val),
         lateral jsonb_array_elements(coalesce(d.val->'attempts', '[]'::jsonb)) as a
    where a->>'pct' is not null
  ),
  ud as (
    select user_id, deck, count(*) as n, avg(pct) as avg_pct
    from att group by user_id, deck
  ),
  uo as (
    select user_id, avg(avg_pct) as ov, sum(n) as n
    from ud group by user_id
  ),
  dk as (
    select deck, count(*) as users, round(avg(avg_pct)) as avg, sum(n) as attempts
    from ud group by deck having count(*) >= 3
  )
  select jsonb_build_object(
    'registered', (select count(*) from auth.users),
    'active',     (select count(*) from uo),
    'attempts',   coalesce((select sum(n) from uo), 0),
    'overall',    coalesce((select round(avg(ov)) from uo), 0),
    'user_avgs',  coalesce((select jsonb_agg(round(ov)) from uo), '[]'::jsonb),
    'decks',      coalesce((select jsonb_object_agg(deck, jsonb_build_object('users', users, 'avg', avg, 'attempts', attempts)) from dk), '{}'::jsonb)
  );
$$;

revoke all on function public.community_stats() from public, anon;
grant execute on function public.community_stats() to authenticated;
