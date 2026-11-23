-- indeks. - prijatelji na spletu (23. 11. 2026)
-- Zadnja aktivnost je v ločeni tabeli brez politik RLS: berejo in pišejo jo samo spodnji funkciji.
-- Prijatelj dobi le, ali si na spletu (izračuna strežnik), nikoli časa tvoje zadnje aktivnosti.
-- Prikaz lahko vsak izklopi v profilu (hidden). Ob izbrisu računa vrstica izgine (on delete cascade).

create table if not exists public.presence (
  user_id uuid primary key references auth.users(id) on delete cascade,
  last_seen timestamptz,
  hidden boolean not null default false
);
alter table public.presence enable row level security;
revoke all on public.presence from anon, authenticated;

-- Klic vsakih ~45 s, ko je app odprt in viden: posodobi lastno aktivnost (največ na 30 s) in vrne
-- seznam prijateljev, ki so bili aktivni v zadnjih 2 minutah, ter lastno nastavitev skritosti.
create or replace function public.online_ping()
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
declare v_me uuid := auth.uid(); v_hidden boolean;
begin
  if v_me is null then raise exception 'Nisi prijavljen.'; end if;
  insert into public.presence as pr (user_id, last_seen) values (v_me, now())
  on conflict (user_id) do update
    set last_seen = case when pr.hidden then null
                         when pr.last_seen is null or pr.last_seen < now() - interval '30 seconds' then now()
                         else pr.last_seen end;
  select hidden into v_hidden from public.presence where user_id = v_me;
  return jsonb_build_object(
    'hidden', v_hidden,
    'online', coalesce((
      select jsonb_agg(o.uid)
      from (select case when f.requester = v_me then f.addressee else f.requester end as uid
            from public.friendships f
            where f.status = 'accepted' and (f.requester = v_me or f.addressee = v_me)) o
      join public.presence p on p.user_id = o.uid
      where not p.hidden and p.last_seen > now() - interval '2 minutes'), '[]'::jsonb));
end
$$;
revoke all on function public.online_ping() from public, anon;
grant execute on function public.online_ping() to authenticated;

-- Izklop / vklop prikaza »na spletu« za prijatelje. Ob izklopu se zadnja aktivnost izbriše.
create or replace function public.set_online_hidden(p_hidden boolean)
returns void
language plpgsql
volatile
security definer
set search_path = public
as $$
declare v_me uuid := auth.uid();
begin
  if v_me is null then raise exception 'Nisi prijavljen.'; end if;
  insert into public.presence as pr (user_id, last_seen, hidden) values (v_me, null, coalesce(p_hidden, false))
  on conflict (user_id) do update set hidden = coalesce(p_hidden, false), last_seen = case when p_hidden then null else pr.last_seen end;
end
$$;
revoke all on function public.set_online_hidden(boolean) from public, anon;
grant execute on function public.set_online_hidden(boolean) to authenticated;
