-- Naloge povezovanja v 1v1: duel_answer dobi množitelj p_mult (1,5 za povezovanje) za škodo in točke.
-- Stara dvoparametrska različica se odstrani, da klic z dvema argumentoma ni dvoumen (p_mult ima privzeto 1).
-- Zaženi v SQL Editorju projekta Indeks (fdcnkqjbuatsisznqcos), enkrat. Datum: 17. 11. 2026.

drop function if exists public.duel_answer(uuid, boolean);

create or replace function public.duel_answer(p_id uuid, p_ok boolean, p_mult numeric default 1)
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
    v_points := round((100 + round(50 * greatest(0, 1 - q_secs / 60.0))) * greatest(0.5, least(3, coalesce(p_mult, 1))));
    if c.mode in ('basic', 'battle') then
      dmg := (me.avatar->>'atk')::numeric * least(1.5, 1 + (me.avatar->>'streak')::numeric * (v_streak - 1))
           * (case when q_secs <= 15 then 1 + coalesce((me.avatar->>'quick')::numeric, 0) else 1 end);
      -- pasivne sposobnosti lika
      if v_ab = 'underdog' then
        select avg(coalesce(hp, 0)) into opp_avg from public.active_players(p_id) where user_id <> me.user_id and not eliminated;
        if opp_avg is not null and coalesce(me.hp, 0) < opp_avg then dmg := dmg * 1.15; end if;
      elsif v_ab = 'rage' and coalesce(me.hp, 0) < 0.3 * coalesce(me.max_hp, 100) then dmg := dmg * 1.4;
      end if;
      dmg := dmg * greatest(0.5, least(3, coalesce(p_mult, 1)));      -- naloga povezovanja: 1,5×
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
revoke all on function public.duel_answer(uuid, boolean, numeric) from public, anon;
grant execute on function public.duel_answer(uuid, boolean, numeric) to authenticated;
