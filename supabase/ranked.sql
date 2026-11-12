-- indeks. — Ranked način: rezultati + lestvica + vzdevek
-- Zaženi enkrat v Supabase: SQL Editor -> New query -> prilepi -> Run.
-- Varno za ponovni zagon (if not exists / or replace / drop policy if exists).

-- 1) vzdevek za lestvico (uporabnik ureja samo svojega)
alter table public.profiles add column if not exists nickname text;
drop policy if exists "update own profile" on public.profiles;
create policy "update own profile" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- 2) rezultati ranked testov
create table if not exists public.ranked_results (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  part_key text not null,            -- npr. y2s1/eeu/k1/__ranked
  correct int not null,
  total int not null,
  seconds int not null,
  created_at timestamptz not null default now()
);
create index if not exists ranked_results_part_user on public.ranked_results(part_key, user_id);
alter table public.ranked_results enable row level security;
drop policy if exists "ranked insert own" on public.ranked_results;
create policy "ranked insert own" on public.ranked_results for insert with check (auth.uid() = user_id);
drop policy if exists "ranked read own" on public.ranked_results;
create policy "ranked read own" on public.ranked_results for select using (auth.uid() = user_id);

-- 3) lestvica: povprečje VSEH rešenih testov uporabnika za dani del, uvrstitev po >= 5 rešenih
create or replace function public.ranked_leaderboard(p_part_key text)
returns table (user_id uuid, name text, runs bigint, avg_pct numeric, best_pct numeric, avg_seconds numeric, is_me boolean)
language sql
security definer
set search_path = public
as $$
  select r.user_id,
         coalesce(nullif(trim(p.nickname), ''), left(split_part(coalesce(p.email, ''), '@', 1), 3) || '***') as name,
         count(*) as runs,
         round(avg(100.0 * r.correct / nullif(r.total, 0)), 1) as avg_pct,
         max(round(100.0 * r.correct / nullif(r.total, 0))) as best_pct,
         round(avg(r.seconds)) as avg_seconds,
         (r.user_id = auth.uid()) as is_me
  from public.ranked_results r
  left join public.profiles p on p.id = r.user_id
  where r.part_key = p_part_key
  group by r.user_id, p.nickname, p.email
  having count(*) >= 5
  order by avg_pct desc, avg_seconds asc
  limit 100;
$$;
revoke all on function public.ranked_leaderboard(text) from public, anon;
grant execute on function public.ranked_leaderboard(text) to authenticated;
