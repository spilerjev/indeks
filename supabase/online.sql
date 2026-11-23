-- indeks. - prijatelji na spletu in ena prijava na račun (23. 11. 2026)
-- Zadnja aktivnost je v ločeni tabeli brez politik RLS: berejo in pišejo jo samo spodnji funkciji.
-- Prijatelj dobi le, ali si na spletu (izračuna strežnik), nikoli časa tvoje zadnje aktivnosti.
-- Prikaz lahko vsak izklopi v profilu (hidden). Ob izbrisu računa vrstica izgine (on delete cascade).
-- device = naključna oznaka naprave, ki se je zadnja prijavila; druga naprava ob pingu dobi kicked = true in se odjavi.

create table if not exists public.presence (
  user_id uuid primary key references auth.users(id) on delete cascade,
  last_seen timestamptz,
  hidden boolean not null default false,
  device text,
  device_at timestamptz
);
alter table public.presence add column if not exists device text;
alter table public.presence add column if not exists device_at timestamptz;
alter table public.presence enable row level security;
revoke all on public.presence from anon, authenticated;

drop function if exists public.online_ping();

-- Klic vsakih ~45 s, ko je app odprt in viden. p_claim = true ob prvem pingu nove seje (naprava prevzame račun).
-- Vrne: hidden, kicked (račun je prevzela druga naprava) in online (id-ji prijateljev, aktivnih v zadnjih 2 minutah).
create or replace function public.online_ping(p_device text default null, p_claim boolean default false)
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
declare v_me uuid := auth.uid(); v_hidden boolean; v_dev text; v_kicked boolean;
begin
  if v_me is null then raise exception 'Nisi prijavljen.'; end if;
  if p_device is not null and length(p_device) > 80 then raise exception 'Neveljavna naprava.'; end if;
  insert into public.presence (user_id) values (v_me) on conflict (user_id) do nothing;
  if p_device is not null then
    update public.presence set device = p_device, device_at = now()
     where user_id = v_me and (p_claim or device is null);
  end if;
  select hidden, device into v_hidden, v_dev from public.presence where user_id = v_me;
  v_kicked := p_device is not null and v_dev is not null and v_dev <> p_device;
  if not v_kicked then
    update public.presence
       set last_seen = case when hidden then null
                            when last_seen is null or last_seen < now() - interval '30 seconds' then now()
                            else last_seen end
     where user_id = v_me;
  end if;
  return jsonb_build_object(
    'hidden', v_hidden,
    'kicked', v_kicked,
    'online', case when v_kicked then '[]'::jsonb else coalesce((
      select jsonb_agg(o.uid)
      from (select case when f.requester = v_me then f.addressee else f.requester end as uid
            from public.friendships f
            where f.status = 'accepted' and (f.requester = v_me or f.addressee = v_me)) o
      join public.presence p on p.user_id = o.uid
      where not p.hidden and p.last_seen > now() - interval '2 minutes'), '[]'::jsonb) end);
end
$$;
revoke all on function public.online_ping(text, boolean) from public, anon;
grant execute on function public.online_ping(text, boolean) to authenticated;

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
