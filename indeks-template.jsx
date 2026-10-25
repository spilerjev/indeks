import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  GraduationCap, BookOpen, ChevronLeft, ChevronRight, FileText,
  CheckCircle2, XCircle, RotateCcw, Trophy, Layers, Lock,
  BarChart3, Brain, Shuffle, Check, X, Moon, Sun, ChevronDown, Calculator, LogOut, Users
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

/* =========================================================================
   semester {id, year, name, subjects} -> predmet -> parts (kolokviji + izpit)
   part: { id, name, type, notes?, decks:[{id,name,questions}], flashcards:[{id,name,cards}] }
   Vprašanje: { q, options:[...], correct:<index>, explanation }
   Kartica:   { front, back }
   ========================================================================= */
const DATA = __DATA_JSON__;

const YEARS = [...new Set(DATA.map((s) => s.year))].sort();

const TIER = {
  S: { label: "S", bg: "var(--terra)", fg: "#fff" },
  A: { label: "A", bg: "var(--ink)", fg: "var(--paper)" },
  B: { label: "B", bg: "var(--teal)", fg: "#fff" },
  C: { label: "C", bg: "#b9b2a3", fg: "var(--ink)" },
};

/* ---- obstojno shranjevanje napredka (localStorage + fallback) ---- */
const store = (() => {
  let mem = {};
  let ok = false;
  try { localStorage.setItem("__ix_t", "1"); localStorage.removeItem("__ix_t"); ok = true; } catch (e) { ok = false; }
  return {
    get(k, d) { try { if (ok) { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } } catch (e) {} return k in mem ? mem[k] : d; },
    set(k, v) { try { if (ok) { localStorage.setItem(k, JSON.stringify(v)); return; } } catch (e) {} mem[k] = v; },
  };
})();
const STATS_KEY = "indeks.stats.v1";
const MIX_KEY = "indeks.mixuse.v1";

/* ---- Supabase: računi + oblačna statistika ---- */
const SUPABASE_URL = "https://fdcnkqjbuatsisznqcos.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkY25rcWpidWF0c2lzem5xY29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1OTY2NDQsImV4cCI6MjEwMTE3MjY0NH0.WVm1CEcJAq_V4yYJPHYo6nYUJA6xlwokjLoWDhZF5NE";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

function useAuth() {
  const [session, setSession] = useState(undefined); // undefined = nalagam, null = odjavljen
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session || null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s || null));
    return () => sub.subscription.unsubscribe();
  }, []);
  const signOut = useCallback(() => supabase.auth.signOut(), []);
  return { session: session === undefined ? null : session, loading: session === undefined, signOut };
}

/* Združi dve statistiki: za vsak deck poveže poskuse in odstrani dvojnike. */
function mergeStats(a, b) {
  const out = {};
  const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
  keys.forEach((k) => {
    const aa = (a && a[k] && a[k].attempts) || [];
    const bb = (b && b[k] && b[k].attempts) || [];
    const seen = new Set();
    const attempts = [];
    [...aa, ...bb].forEach((at) => {
      const id = JSON.stringify(at);
      if (seen.has(id)) return;
      seen.add(id);
      attempts.push(at);
    });
    attempts.sort((x, y) => (x.t || 0) - (y.t || 0));
    out[k] = { attempts };
  });
  return out;
}

/* Statistika: lokalni cache (po uporabniku) + sinhronizacija v oblak.
   Zapisi in nalaganja se ZDRUŽUJEJO (ne prepisujejo), da nič ne izgine med napravami. */
function useCloudStats(userId) {
  const [stats, setStats] = useState({});
  const ref = useRef({});
  const timer = useRef(null);
  const localKey = userId ? "indeks.stats." + userId : STATS_KEY;
  const apply = useCallback((next) => { ref.current = next; setStats(next); store.set(localKey, next); }, [localKey]);
  const fetchCloud = useCallback(async () => {
    const { data, error } = await supabase.from("user_stats").select("stats").eq("user_id", userId).maybeSingle();
    if (error) { console.warn("indeks stats: napaka pri branju:", error.message); return null; }
    return (data && data.stats) || {};
  }, [userId]);

  // Prvo nalaganje + osvežitev, ko se zavihek spet aktivira (računalnik dobi telefonove poskuse in obratno).
  useEffect(() => {
    const cached = store.get(localKey, {});
    ref.current = cached; setStats(cached);
    if (!userId) return;
    let cancelled = false;
    const sync = async () => {
      const cloud = await fetchCloud();
      if (cancelled || cloud == null) return;
      const merged = mergeStats(ref.current, cloud);
      apply(merged);
      if (JSON.stringify(merged) !== JSON.stringify(cloud)) {
        const { error } = await supabase.from("user_stats").upsert({ user_id: userId, stats: merged, updated_at: new Date().toISOString() });
        if (error) console.warn("indeks stats: napaka pri zapisu (uskladitev):", error.message);
      }
    };
    sync();
    const onVis = () => { if (document.visibilityState === "visible") sync(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { cancelled = true; document.removeEventListener("visibilitychange", onVis); };
  }, [userId, localKey, fetchCloud, apply]);

  const record = useCallback((key, res) => {
    const prev = ref.current;
    const cur = prev[key] || { attempts: [] };
    const next = { ...prev, [key]: { attempts: [...cur.attempts, { t: Date.now(), ...res }] } };
    apply(next);
    if (!userId) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      // preberi-združi-zapiši, da ne povozimo poskusov z druge naprave
      const cloud = await fetchCloud();
      const merged = mergeStats(cloud || {}, ref.current);
      const { error } = await supabase.from("user_stats").upsert({ user_id: userId, stats: merged, updated_at: new Date().toISOString() });
      if (error) console.warn("indeks stats: napaka pri shranjevanju:", error.message);
      else apply(merged);
    }, 1000);
  }, [userId, apply, fetchCloud]);

  return { stats, record };
}

/* Slovarček: globalno vklopljen/izklopljen (shranjeno v brskalniku). */
const GlossCtx = React.createContext(true);

/* Povprečja vseh uporabnikov (anonimno, agregat iz Supabase funkcije community_stats).
   Če funkcija še ne obstaja, ostane null in primerjava se ne prikaže. */
function useCommunity(userId) {
  const [comm, setComm] = useState(null);
  useEffect(() => {
    if (!userId) { setComm(null); return; }
    let cancelled = false;
    const load = async () => {
      const { data, error } = await supabase.rpc("community_stats");
      if (error) { console.warn("indeks skupnost: " + error.message); return; }
      if (!cancelled && data) setComm(data);
    };
    load();
    const onVis = () => { if (document.visibilityState === "visible") load(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { cancelled = true; document.removeEventListener("visibilitychange", onVis); };
  }, [userId]);
  return comm;
}
const commDeck = (comm, key) => (comm && comm.decks && comm.decks[key]) || null;
/* Povprečje skupnosti za podan letnik (ponderirano s številom uporabnikov pri posameznem kompletu). */
function commYearAvg(comm, year) {
  if (!comm || !comm.decks) return null;
  const sems = new Set(DATA.filter((s) => !year || s.year === year).map((s) => s.id));
  let w = 0, sum = 0;
  Object.keys(comm.decks).forEach((k) => { if (sems.has(k.split("/")[0])) { const d = comm.decks[k]; w += d.users; sum += d.users * d.avg; } });
  return w ? Math.round(sum / w) : null;
}

function mapAuthErr(error) {
  const m = (error.message || "").toLowerCase();
  if (m.includes("already registered") || m.includes("already exists") || m.includes("user already"))
    return "Ta e-naslov je že registriran. Prijavi se.";
  if (m.includes("invalid") || m.includes("credentials"))
    return "Napačen e-naslov ali geslo.";
  if (m.includes("not confirmed") || m.includes("confirm"))
    return "Račun še ni potrjen. Klikni povezavo v e-pošti.";
  if (m.includes("weak") || m.includes("at least") || m.includes("password"))
    return "Geslo je prešibko (vsaj 6 znakov).";
  if (m.includes("signups") || m.includes("not allowed") || m.includes("disabled"))
    return "Registracija je trenutno zaprta.";
  return error.message || "Napaka. Poskusi znova.";
}

function Login() {
  const [mode, setMode] = useState("in"); // "in" = prijava, "up" = registracija
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const inputStyle = { width: "100%", boxSizing: "border-box", padding: "11px 13px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--paper)", color: "var(--ink)", fontSize: 15, outline: "none" };
  const submit = async (e) => {
    e.preventDefault();
    const addr = email.trim();
    if (!addr || !password) return;
    setErr(""); setInfo("");
    if (mode === "up" && password.length < 6) { setErr("Geslo naj ima vsaj 6 znakov."); return; }
    setBusy(true);
    if (mode === "up") {
      const { data, error } = await supabase.auth.signUp({ email: addr, password, options: { emailRedirectTo: window.location.origin + window.location.pathname } });
      setBusy(false);
      if (error) { setErr(mapAuthErr(error)); return; }
      if (!data.session) {
        // če je potrditev e-pošte vklopljena: ni takojšnje seje
        setInfo("Račun je ustvarjen. Potrdi e-naslov (povezava v e-pošti), nato se prijavi.");
        setMode("in"); setPassword("");
        return;
      }
      // seja obstaja -> onAuthStateChange v useAuth poskrbi za vstop
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email: addr, password });
    setBusy(false);
    if (error) { setErr(mapAuthErr(error)); return; }
    // uspeh: onAuthStateChange v useAuth poskrbi za vstop
  };
  const up = mode === "up";
  return (
    <div style={{ maxWidth: 380, margin: "6vh auto 0" }}>
      <div className="ix-card" style={{ padding: 24 }}>
        <form onSubmit={submit}>
          <div className="ix-serif" style={{ fontWeight: 800, fontSize: 22, marginBottom: 4 }}>{up ? "Registracija" : "Prijava"}</div>
          <div style={{ color: "var(--ink2)", fontSize: 14, marginBottom: 16, lineHeight: 1.5 }}>
            {up
              ? "Ustvari brezplačen račun s svojim e-naslovom in geslom."
              : "Vpiši svoj e-naslov in geslo."}
          </div>
          <input type="email" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="ime@email.com" autoCapitalize="none" autoCorrect="off" autoComplete="username"
            style={{ ...inputStyle, marginBottom: 10 }} />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Geslo" autoComplete={up ? "new-password" : "current-password"} style={inputStyle} />
          {err && <div style={{ color: "var(--terra)", fontSize: 13, marginTop: 10 }}>{err}</div>}
          {info && <div style={{ color: "var(--teal)", fontSize: 13, marginTop: 10 }}>{info}</div>}
          <button type="submit" disabled={busy}
            style={{ width: "100%", marginTop: 14, padding: "11px 13px", borderRadius: 10, border: "none", background: "var(--ink)", color: "var(--paper)", fontSize: 15, fontWeight: 700, cursor: busy ? "default" : "pointer", opacity: busy ? 0.6 : 1 }}>
            {busy ? "Trenutek…" : up ? "Ustvari račun" : "Prijava"}
          </button>
        </form>
        <div style={{ marginTop: 16, textAlign: "center", fontSize: 13, color: "var(--ink2)" }}>
          {up ? "Že imaš račun? " : "Nimaš računa? "}
          <button onClick={() => { setMode(up ? "in" : "up"); setErr(""); setInfo(""); }}
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--terra)", fontWeight: 700, textDecoration: "underline" }}>
            {up ? "Prijava" : "Registriraj se"}
          </button>
        </div>
      </div>
    </div>
  );
}

// stabilen id vprašanja iz besedila (za sledenje uporabe v mešanih kvizih)
function qid(q) {
  const s = (q && q.q) || "";
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return "q" + (h >>> 0).toString(36);
}
function loadMixUse() { return store.get(MIX_KEY, {}); }
// uteženo vzorčenje brez ponavljanja: že uporabljena vprašanja dobijo utež 0.8^uporab
function weightedSample(pool, n) {
  const use = loadMixUse();
  const items = pool.map((q) => ({ q, w: Math.pow(0.8, use[qid(q)] || 0) }));
  const out = [];
  n = Math.min(n, items.length);
  for (let k = 0; k < n; k++) {
    let tot = 0;
    for (const it of items) tot += it.w;
    let r = Math.random() * tot, idx = items.length - 1;
    for (let i = 0; i < items.length; i++) { r -= items[i].w; if (r <= 0) { idx = i; break; } }
    out.push(items[idx].q);
    items.splice(idx, 1);
  }
  return out;
}
function bumpMixUse(qs) {
  const use = loadMixUse();
  qs.forEach((q) => { const id = qid(q); use[id] = (use[id] || 0) + 1; });
  store.set(MIX_KEY, use);
}

/* --- uspešnost po vprašanju (recency-uteženo) za pametno vzorčenje --- */
const QSTAT_KEY = "indeks.qstat.v1";
function loadQStat() { return store.get(QSTAT_KEY, {}); }
function recordQ(q, ok) {
  const m = loadQStat(), id = qid(q), s = m[id] || { a: 0, c: 0 };
  // eksponentno padanje (faktor 0.9): zadnji odgovori štejejo bolj
  m[id] = { a: s.a * 0.9 + 1, c: s.c * 0.9 + (ok ? 1 : 0) };
  store.set(QSTAT_KEY, m);
}
const themeKeyOf = (d) => { const m = /tema\s*(\d+)/i.exec(d.name || ""); return m ? "t" + m[1] : "d:" + (d.id || d.name); };

/* Pametno uteženo vzorčenje:
   utež = 0.8^prikazov × temaFaktor × vprašanjeFaktor.
   temaFaktor = 1 + 1.5·(1 − glajena_uspešnost_teme)   (empirični Bayes, prior 0.7, K=8)
   vprašanjeFaktor = 1 + miss_rate   (le pri ≥~2 poskusih)
   Izbrani nabor je urejen šibko-najprej (padajoča utež). */
function weightedSampleSmart(decks, n) {
  const use = loadMixUse(), qs = loadQStat();
  const grp = {};
  decks.forEach((d) => { const tk = themeKeyOf(d); const g = grp[tk] || (grp[tk] = { a: 0, c: 0 }); d.questions.forEach((q) => { const s = qs[qid(q)]; if (s) { g.a += s.a; g.c += s.c; } }); });
  const themeFactor = (tk) => { const g = grp[tk] || { a: 0, c: 0 }; const p = (g.c + 8 * 0.7) / (g.a + 8); return 1 + 1.5 * (1 - p); };
  const items = [];
  decks.forEach((d) => { const tk = themeKeyOf(d); d.questions.forEach((q) => {
    const id = qid(q), s = qs[id] || { a: 0, c: 0 };
    const qMiss = s.a >= 1.5 ? Math.max(0, 1 - s.c / s.a) : 0;
    items.push({ q, w: Math.pow(0.8, use[id] || 0) * themeFactor(tk) * (1 + qMiss) });
  }); });
  const out = [];
  n = Math.min(n, items.length);
  for (let k = 0; k < n; k++) {
    let tot = 0; for (const it of items) tot += it.w;
    let r = Math.random() * tot, idx = items.length - 1;
    for (let i = 0; i < items.length; i++) { r -= items[i].w; if (r <= 0) { idx = i; break; } }
    out.push(items[idx]); items.splice(idx, 1);
  }
  out.sort((x, y) => y.w - x.w); // šibko / največkrat zgrešeno najprej
  return out.map((o) => o.q);
}

/* Mastery nad celotnim bazenom mešanega kviza (recency-utežena uspešnost po vprašanju).
   osvojeno = vsaj 1 poskus in uspešnost c/a ≥ 0.67; everCorrect = vsaj enkrat pravilno (c>0). */
function poolMastery(pool) {
  const qs = loadQStat();
  const seen = new Set();
  let total = 0, everCorrect = 0, mastered = 0;
  pool.forEach((q) => {
    const id = qid(q); if (seen.has(id)) return; seen.add(id); total++;
    const s = qs[id]; if (!s || !s.a) return;
    if (s.c > 0) everCorrect++;
    if (s.c / s.a >= 0.67) mastered++;
  });
  return { total, everCorrect, mastered, weak: total - mastered };
}
/* Najšibkejša (še neosvojena) vprašanja, urejena od najnižje uspešnosti; nevidena = uspešnost 0. */
function weakestSample(pool, n) {
  const qs = loadQStat();
  const seen = new Set(); const arr = [];
  pool.forEach((q) => {
    const id = qid(q); if (seen.has(id)) return; seen.add(id);
    const s = qs[id] || { a: 0, c: 0 };
    const rate = s.a >= 1 ? s.c / s.a : 0;
    if (rate < 0.67) arr.push({ q, rate });
  });
  arr.sort((a, b) => a.rate - b.rate);
  return arr.slice(0, n).map((x) => x.q);
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,900&family=Spline+Sans:wght@400;500;600;700&display=swap');
:root{
  --paper:#efe7d8; --paper2:#f6f0e4; --ink:#191712; --ink2:#5d574a;
  --terra:#b3471f; --teal:#1f6f5c; --red:#a4291f; --line:#d8cfbd;
  --okbg:#e7f1ec; --badbg:#f6e6e3; --back2:#fbf7ee;
}
.ix-dark{
  --paper:#1a1714; --paper2:#231f1b; --ink:#f0e9da; --ink2:#b3a892;
  --terra:#e0794f; --teal:#5bbfa3; --red:#e0857a; --line:#3a342c;
  --okbg:#1e3a30; --badbg:#3a2422; --back2:#2a2520;
}
.ix-root, .ix-root *{transition:background-color .5s ease, color .5s ease, border-color .5s ease;}
.ix-root button{color:inherit;}
.ix-root{font-family:'Spline Sans',system-ui,sans-serif;color:var(--ink);position:relative;background:
  radial-gradient(70% 55% at 100% 0%, rgba(179,71,31,.17) 0%, transparent 62%),
  radial-gradient(65% 55% at 0% 100%, rgba(31,111,92,.16) 0%, transparent 62%),
  radial-gradient(50% 40% at 85% 95%, rgba(214,170,80,.14) 0%, transparent 65%),
  radial-gradient(120% 80% at 100% 0%, #f7f1e6 0%, transparent 55%),
  radial-gradient(120% 90% at 0% 100%, #ece2cf 0%, transparent 50%), var(--paper);
  background-attachment:fixed;
  transition:background .5s ease, color .5s ease;}
.ix-dark.ix-root{background:
  radial-gradient(70% 55% at 100% 0%, rgba(224,121,79,.16) 0%, transparent 62%),
  radial-gradient(65% 55% at 0% 100%, rgba(91,191,163,.13) 0%, transparent 62%),
  radial-gradient(50% 40% at 85% 95%, rgba(214,170,80,.09) 0%, transparent 65%),
  radial-gradient(120% 80% at 100% 0%, #2a241d 0%, transparent 55%),
  radial-gradient(120% 90% at 0% 100%, #15120f 0%, transparent 50%), var(--paper);
  background-attachment:fixed;}
/* nežen vzorec simbolov (Σ % € § π ∫ …), bolj viden ob robovih kot za vsebino */
.ix-root::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.055;
  background-image:url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22260%22%20height%3D%22260%22%3E%3Ctext%20x%3D%2234%22%20y%3D%2246%22%20transform%3D%22rotate%28-12%2034%2046%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23191712%22%3E%CE%A3%3C%2Ftext%3E%3Ctext%20x%3D%22150%22%20y%3D%2230%22%20transform%3D%22rotate%2810%20150%2030%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2226%22%20fill%3D%22%23191712%22%3E%25%3C%2Ftext%3E%3Ctext%20x%3D%22214%22%20y%3D%2292%22%20transform%3D%22rotate%28-8%20214%2092%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23191712%22%3E%E2%82%AC%3C%2Ftext%3E%3Ctext%20x%3D%2278%22%20y%3D%22118%22%20transform%3D%22rotate%2814%2078%20118%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2232%22%20fill%3D%22%23191712%22%3E%C2%A7%3C%2Ftext%3E%3Ctext%20x%3D%22176%22%20y%3D%22168%22%20transform%3D%22rotate%28-14%20176%20168%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23191712%22%3E%CF%80%3C%2Ftext%3E%3Ctext%20x%3D%2230%22%20y%3D%22196%22%20transform%3D%22rotate%288%2030%20196%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2234%22%20fill%3D%22%23191712%22%3E%E2%88%AB%3C%2Ftext%3E%3Ctext%20x%3D%22118%22%20y%3D%22222%22%20transform%3D%22rotate%28-6%20118%20222%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2226%22%20fill%3D%22%23191712%22%3E%C2%B6%3C%2Ftext%3E%3Ctext%20x%3D%22232%22%20y%3D%22226%22%20transform%3D%22rotate%2812%20232%20226%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2226%22%20fill%3D%22%23191712%22%3E%CE%94%3C%2Ftext%3E%3Ctext%20x%3D%2296%22%20y%3D%2270%22%20transform%3D%22rotate%280%2096%2070%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2222%22%20fill%3D%22%23191712%22%3E%E2%89%88%3C%2Ftext%3E%3Ctext%20x%3D%2212%22%20y%3D%22120%22%20transform%3D%22rotate%28-10%2012%20120%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2224%22%20fill%3D%22%23191712%22%3E%E2%88%9A%3C%2Ftext%3E%3C%2Fsvg%3E');background-size:260px 260px;
  -webkit-mask-image:radial-gradient(ellipse 55% 70% at 50% 35%, rgba(0,0,0,.25) 0%, #000 85%);
  mask-image:radial-gradient(ellipse 55% 70% at 50% 35%, rgba(0,0,0,.25) 0%, #000 85%);}
.ix-dark.ix-root::before{opacity:.06;background-image:url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22260%22%20height%3D%22260%22%3E%3Ctext%20x%3D%2234%22%20y%3D%2246%22%20transform%3D%22rotate%28-12%2034%2046%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f0e9da%22%3E%CE%A3%3C%2Ftext%3E%3Ctext%20x%3D%22150%22%20y%3D%2230%22%20transform%3D%22rotate%2810%20150%2030%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2226%22%20fill%3D%22%23f0e9da%22%3E%25%3C%2Ftext%3E%3Ctext%20x%3D%22214%22%20y%3D%2292%22%20transform%3D%22rotate%28-8%20214%2092%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f0e9da%22%3E%E2%82%AC%3C%2Ftext%3E%3Ctext%20x%3D%2278%22%20y%3D%22118%22%20transform%3D%22rotate%2814%2078%20118%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2232%22%20fill%3D%22%23f0e9da%22%3E%C2%A7%3C%2Ftext%3E%3Ctext%20x%3D%22176%22%20y%3D%22168%22%20transform%3D%22rotate%28-14%20176%20168%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2230%22%20fill%3D%22%23f0e9da%22%3E%CF%80%3C%2Ftext%3E%3Ctext%20x%3D%2230%22%20y%3D%22196%22%20transform%3D%22rotate%288%2030%20196%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2234%22%20fill%3D%22%23f0e9da%22%3E%E2%88%AB%3C%2Ftext%3E%3Ctext%20x%3D%22118%22%20y%3D%22222%22%20transform%3D%22rotate%28-6%20118%20222%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2226%22%20fill%3D%22%23f0e9da%22%3E%C2%B6%3C%2Ftext%3E%3Ctext%20x%3D%22232%22%20y%3D%22226%22%20transform%3D%22rotate%2812%20232%20226%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2226%22%20fill%3D%22%23f0e9da%22%3E%CE%94%3C%2Ftext%3E%3Ctext%20x%3D%2296%22%20y%3D%2270%22%20transform%3D%22rotate%280%2096%2070%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2222%22%20fill%3D%22%23f0e9da%22%3E%E2%89%88%3C%2Ftext%3E%3Ctext%20x%3D%2212%22%20y%3D%22120%22%20transform%3D%22rotate%28-10%2012%20120%29%22%20font-family%3D%22Georgia%2Cserif%22%20font-size%3D%2224%22%20fill%3D%22%23f0e9da%22%3E%E2%88%9A%3C%2Ftext%3E%3C%2Fsvg%3E');}
.ix-root > div{position:relative;z-index:1;}
@media (prefers-reduced-motion:no-preference){.ix-root::before{animation:ixDrift 90s linear infinite;}}
@keyframes ixDrift{to{background-position:260px 260px;}}
.ix-serif{font-family:'Fraunces',Georgia,serif;}
.ix-fade{opacity:0;transform:translateY(10px);animation:ixIn .5s cubic-bezier(.2,.7,.2,1) forwards;}
@keyframes ixIn{to{opacity:1;transform:none;}}
.ix-card{background:var(--paper2);border:1px solid var(--line);border-radius:16px;
  transition:transform .18s ease, box-shadow .18s ease, border-color .5s ease, background-color .5s ease, color .5s ease;}
.ix-card:hover{transform:translateY(-3px);box-shadow:0 14px 30px -18px rgba(25,23,18,.45);border-color:var(--terra);}
.ix-tier{font-family:'Fraunces',serif;font-weight:900;font-size:13px;line-height:1;
  width:30px;height:30px;display:grid;place-items:center;border-radius:9px;}
.ix-chip{font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;color:var(--ink2);}
.ix-opt{text-align:left;width:100%;background:var(--paper2);border:1.5px solid transparent;
  border-radius:13px;padding:14px 16px;cursor:pointer;transition:all .14s;font-size:15px;}
.ix-opt:hover:not(:disabled){border-color:var(--ink);transform:translateX(3px);}
.ix-opt:disabled{cursor:default;}
.ix-bar{height:6px;background:var(--line);border-radius:99px;overflow:hidden;}
.ix-bar>span{display:block;height:100%;background:var(--terra);transition:width .4s ease;}
.ix-btn{font-weight:600;border-radius:12px;cursor:pointer;}
.ix-seg{display:inline-flex;gap:4px;padding:4px;background:var(--paper2);border:1px solid var(--line);border-radius:13px;}
.ix-seg button{font-family:'Fraunces',serif;font-weight:600;font-size:15px;border:none;background:none;color:var(--ink2);
  padding:7px 16px;border-radius:9px;cursor:pointer;transition:background .15s, color .15s;}
.ix-seg button:hover{color:var(--ink);}
.ix-seg button[aria-pressed="true"]{background:var(--ink);color:var(--paper);}
.ix-sec{font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;display:flex;align-items:center;gap:7px;margin-bottom:11px;}
.ix-notes{font-size:15px;line-height:1.62;color:var(--ink);}
.ix-notes h2{font-family:'Fraunces',serif;font-size:21px;font-weight:900;margin:28px 0 12px;color:var(--terra);letter-spacing:-.01em;}
.ix-notes h2:first-child{margin-top:0;}
.ix-notes h3{font-family:'Fraunces',serif;font-size:17px;font-weight:600;margin:0 0 8px;}
.ix-notes .note-card{background:var(--paper2);border:1px solid var(--line);border-left:3px solid var(--terra);border-radius:12px;padding:14px 16px;margin:12px 0;}
.ix-notes ul{margin:6px 0;padding-left:20px;}
.ix-notes li{margin:5px 0;}
.ix-notes p{margin:8px 0;color:var(--ink2);}
.ix-notes .tip,.ix-notes .warn{margin-top:10px;padding:9px 12px;border-radius:9px;font-size:14px;background:var(--paper);border-left:3px solid var(--teal);}
.ix-notes .warn{border-left-color:var(--red);}
.ix-notes .tbl{overflow-x:auto;margin:10px 0;}
.ix-notes table{border-collapse:collapse;font-size:14px;min-width:100%;}
.ix-notes th,.ix-notes td{border:1px solid var(--line);padding:6px 9px;text-align:left;vertical-align:top;}
.ix-notes th{background:var(--paper);font-weight:700;}
.ix-notes pre{background:var(--paper);border:1px solid var(--line);border-radius:9px;padding:10px 12px;font-size:12.5px;overflow-x:auto;line-height:1.45;}
.ix-notes ol{margin:6px 0;padding-left:22px;}
.ix-notes em{font-style:italic;}
.ix-notes b{color:var(--ink);}
.ix-notes i{color:var(--teal);font-style:normal;font-weight:600;}
.ix-flip{perspective:1400px;height:280px;width:100%;}
.ix-flip-inner{position:relative;width:100%;height:100%;transition:transform .55s cubic-bezier(.2,.7,.2,1);transform-style:preserve-3d;cursor:pointer;}
.ix-flip-inner.flipped{transform:rotateY(180deg);}
.ix-face{position:absolute;inset:0;-webkit-backface-visibility:hidden;backface-visibility:hidden;
  border-radius:18px;display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;padding:28px;border:1px solid var(--line);background:var(--paper2);
  box-shadow:0 12px 28px -22px rgba(25,23,18,.5);}
.ix-face.back{transform:rotateY(180deg);background:var(--back2);border-left:3px solid var(--teal);}
.ix-spark{display:flex;align-items:flex-end;gap:3px;height:30px;}
.ix-spark>i{flex:1;background:var(--terra);border-radius:2px 2px 0 0;min-height:3px;opacity:.85;}
`;

const partQ = (p) => p.decks.reduce((n, d) => n + d.questions.length, 0);
const partCards = (p) => (p.flashcards || []).reduce((n, d) => n + d.cards.length, 0);
const subjQ = (s) => {
  const seen = new Set();
  s.parts.forEach((p) => p.decks.forEach((d) => d.questions.forEach((q) => seen.add(q.q))));
  return seen.size;
};
const subjCards = (s) => s.parts.reduce((n, p) => n + partCards(p), 0);
const subjHasNotes = (s) => s.parts.some((p) => p.notes);
const partEmpty = (p) => p.decks.length === 0 && (p.flashcards || []).length === 0 && !p.notes;

function deckStats(stats, key) {
  const a = (stats[key] && stats[key].attempts) || [];
  if (!a.length) return null;
  const p = a.map((x) => x.pct);
  return {
    n: a.length, best: Math.max.apply(null, p), last: p[p.length - 1],
    avg: Math.round(p.reduce((s, x) => s + x, 0) / p.length), recent: p.slice(-8),
  };
}

/* Slovarček pojmov — samodejno zaznan v besedilu vprašanja/možnosti/razlage.
   t = prikaz, s = mala iskalna osnova (zajame tudi sklone), d = razlaga. */
const GLOSSARY = [
  { t: "Absentizem", s: "absentiz", d: "Odsotnost z dela." },
  { t: "Fluktuacija", s: "fluktuacij", d: "Odhajanje oz. menjava zaposlenih v organizaciji." },
  { t: "Kohezivnost", s: "kohezivn", d: "Stopnja medsebojne naklonjenosti članov in motiviranosti, da ostanejo v skupini." },
  { t: "Konformizem", s: "konformiz", d: "Prilagajanje vedenja posameznika normam skupine." },
  { t: "Asertivnost", s: "asertivn", d: "Samozavestno, a spoštljivo izražanje lastnih stališč." },
  { t: "Ekspatriiranci", s: "ekspatri", d: "Zaposleni, napoteni na začasno delo v tujino." },
  { t: "Distres", s: "distres", d: "Negativni, neugodni stres." },
  { t: "Eustres", s: "eustres", d: "Pozitivni stres, ki spremlja prijetne dogodke." },
  { t: "Depersonalizacija", s: "depersonal", d: "Ciničen, oddaljen odnos do ljudi (sestavina izgorelosti)." },
  { t: "Izgorelost", s: "izgorel", d: "Občutek izčrpanosti zaradi dolgotrajnih pritiskov in premalo virov." },
  { t: "Kognitivna disonanca", s: "disonan", d: "Neprijetno neskladje med stališči ali med stališčem in vedenjem." },
  { t: "Intrinzično", s: "intrinzičn", d: "Motivacija, ki izhaja iz dela samega (uživanje, razvoj)." },
  { t: "Ekstrinzično", s: "ekstrinzičn", d: "Motivacija iz zunanjih nagrad (plačilo, status, ugodnosti)." },
  { t: "Zanos (flow)", s: "zanos", d: "Stanje popolne vpetosti v dejavnost, v kateri posameznik uživa." },
  { t: "Samoučinkovitost", s: "samoučinkovit", d: "Prepričanje o lastni zmožnosti opraviti določeno nalogo." },
  { t: "Makiavelizem", s: "makiaveliz", d: "Pragmatičnost in prepričanje, da cilj opravičuje sredstva." },
  { t: "Narcisizem", s: "narcisiz", d: "Pretiran občutek lastne pomembnosti in potreba po občudovanju." },
  { t: "Karizma", s: "kariz", d: "Nalezljiv navdih in osebna privlačnost vodje." },
  { t: "Soodvisnost", s: "soodvisn", d: "Stopnja, do katere se člani pri delu zanašajo drug na drugega." },
  { t: "Recipročnost", s: "recipročn", d: "Vračanje usluge; dajanje z namenom prejemanja." },
  { t: "Organizacijsko državljanstvo (OCB)", s: "organizacijsko državljan", d: "Prostovoljno vedenje izven opisa dela, ki koristi organizaciji." },
  { t: "Lokus kontrole", s: "lokus kontrol", d: "Prepričanje, koliko sam vplivaš na dogodke (notranji) ali ne (zunanji)." },
  { t: "Transakcijsko vodenje", s: "transakcijsk", d: "Vodenje z nagradami za dosežene cilje in nadzorom odklonov." },
  { t: "Transformacijsko vodenje", s: "transformacijsk", d: "Vodenje z vizijo in navdihom prek lastnih interesov zaposlenih." },
  { t: "Meta-analiza", s: "meta-analiz", d: "Statistično združevanje rezultatov več raziskav." },
  { t: "Pripisovanje (atribucija)", s: "pripisovanj", d: "Presoja vzrokov vedenja kot notranjih ali zunanjih." },
  { t: "Konsenz", s: "konsenz", d: "Sledenje vedenju in mnenju večine." },
  { t: "Empatija", s: "empatij", d: "Zmožnost vživeti se v čustva in perspektivo drugega." },
  { t: "Avtonomija", s: "avtonomij", d: "Stopnja samostojnosti pri določanju poteka dela." },
  { t: "Diskrecijsko", s: "diskrecijsk", d: "Prostovoljno, po lastni presoji — ni formalno zahtevano." },
  { t: "Stereotipiziranje", s: "stereotip", d: "Pripisovanje posplošenih značilnosti skupine posamezniku." },

  // --- Statistika: kratice in pojmi ---
  { t: "ZRSZ", s: "zrsz", b: 1, d: "Zavod Republike Slovenije za zaposlovanje — vir podatkov o registrirani brezposelnosti." },
  { t: "ILO", s: "ilo", b: 1, d: "Mednarodna organizacija dela (International Labour Organization); po njeni metodologiji se meri anketna brezposelnost." },
  { t: "Registrirana brezposelnost", s: "registriran", d: "Brezposelni, prijavljeni na ZRSZ (administrativni vir)." },
  { t: "Anketna brezposelnost", s: "anketn", d: "Brezposelnost, merjena z anketo po metodologiji ILO (ne le prijavljeni)." },
  { t: "SURS", s: "surs", b: 1, d: "Statistični urad Republike Slovenije — glavni izvajalec uradne statistike v SLO." },
  { t: "ESS", s: "ess", b: 1, d: "Evropski statistični sistem; na vrhu je Eurostat." },
  { t: "Eurostat", s: "eurostat", d: "Statistični urad Evropske unije; koordinira ESS." },
  { t: "NACE", s: "nace", b: 1, d: "Evropska klasifikacija ekonomskih dejavnosti (v SLO kot SKD)." },
  { t: "SKD", s: "skd", b: 1, d: "Standardna klasifikacija dejavnosti — slovenska izvedba NACE." },
  { t: "ISIC", s: "isic", b: 1, d: "Mednarodna standardna klasifikacija dejavnosti (ZN); osnova za NACE." },
  { t: "HS (Harmonized System)", s: "harmonized system", d: "Mednarodna klasifikacija blaga v zunanji trgovini in carini." },
  { t: "PRODCOM", s: "prodcom", b: 1, d: "Klasifikacija industrijskih proizvodov v EU." },
  { t: "CPA", s: "cpa", b: 1, d: "Klasifikacija proizvodov po dejavnosti (EU)." },
  { t: "EED", s: "eed", b: 1, d: "Enota enovrstne dejavnosti — opravlja eno dejavnost na eni lokaciji." },
  { t: "BDP", s: "bdp", b: 1, d: "Bruto domači proizvod — vrednost vseh proizvedenih dobrin in storitev." },
  { t: "PKM", s: "pkm", b: 1, d: "Pariteta kupne moči — pretvornik za primerjavo cen/standarda med državami (npr. Big Mac index)." },
  { t: "TAS", s: "tas", b: 1, d: "Tehtana aritmetična sredina; kot agregatni indeks ustreza Laspeyresovemu." },
  { t: "THS", s: "ths", b: 1, d: "Tehtana harmonična sredina; kot agregatni indeks ustreza Paaschejevemu." },
  { t: "SSN", s: "ssn", b: 1, d: "Splošna stopnja natalitete = živorojeni / srednje št. vseh prebivalcev × 1000." },
  { t: "SSR", s: "ssr", b: 1, d: "Splošna stopnja rodnosti = živorojeni / ženske 15–49 let × 1000." },
  { t: "Deflacioniranje", s: "deflacion", d: "Pretvorba nominalne vrednosti v realno z deljenjem z indeksom cen (×100)." },
  { t: "Deflator", s: "deflator", d: "Indeks cen, s katerim deflacioniramo (nominalno → realno)." },
  { t: "Naravni prirastek", s: "naravni prirastek", d: "Živorojeni − umrli." },
  { t: "Selitveni saldo", s: "selitveni saldo", d: "Priseljeni − odseljeni." },
  { t: "Metapodatki", s: "metapodatk", d: "Podatki o podatkih — metodologija, definicije, kakovost." },
  { t: "Koeficient variacije", s: "koeficient variac", d: "Relativna razpršenost = (standardni odklon / aritmetična sredina) × 100." },
  { t: "CRP", s: "crp", b: 1, d: "Centralni register prebivalstva — osrednja zbirka podatkov o prebivalcih Slovenije (temelji na EMŠO)." },
  { t: "APRS", s: "aprs", b: 1, d: "Administrativni poslovni register — register poslovnih subjektov za upravne namene (npr. PRS pri AJPES); vir za statistični register." },
  { t: "SPRS", s: "sprs", b: 1, d: "Statistični poslovni register — register poslovnih subjektov, ki ga za statistične namene iz administrativnih virov oblikuje in vzdržuje SURS." },
  { t: "Dvorazsežna tabela", s: "dvorazsežn", d: "Tabela, ki enote hkrati razvršča po dveh spremenljivkah (vrstice × stolpci); pri dveh opisnih spremenljivkah je to kontingenčna tabela." },
  { t: "Izvedeni kazalec", s: "izveden", d: "Kazalec, izračunan iz osnovnih (absolutnih) podatkov — deleži, razmerja, koeficienti, stopnje in indeksi (relativna števila)." },
  { t: "Nomenklatura", s: "nomenklatur", d: "Spisek eksplicitno imenovanih enot; enote, ki niso navedene, ne morejo biti uvrščene — zato (za razliko od klasifikacije) ne zagotavlja popolnega razvrščanja." },
  { t: "ISCED", s: "isced", b: 1, d: "Mednarodna standardna klasifikacija izobraževanja (klasifikacija po izobrazbi)." },
  { t: "ISCO", s: "isco", b: 1, d: "Mednarodna standardna klasifikacija poklicev (International Standard Classification of Occupations); razvršča po poklicu. V SLO ji ustreza SKP." },
  { t: "ICSE", s: "icse", b: 1, d: "Mednarodna klasifikacija statusa zaposlitve (International Classification of Status in Employment); razvršča po položaju: zaposleni, samozaposleni, delodajalci, pomagajoči družinski člani." },
  { t: "Administrativni register", s: "administrativni register", d: "Zbirka podatkov, ki nastane pri upravnih postopkih (npr. davčni register, poslovni register); statistika jih uporablja kot sekundarni (administrativni) vir, ne kot lastno anketo." },
  { t: "SSM", s: "ssm", b: 1, d: "Splošna stopnja mortalitete (umrljivosti) = umrli / srednje št. vseh prebivalcev × 1000." },
  { t: "Starostni kontingent", s: "starostni kontingent", d: "Skupina prebivalstva, opredeljena po starosti za določen namen — npr. delovni kontingent (15–64 let), ženske v rodni dobi (15–49), šoloobvezni otroci." },
  { t: "Standardizirane enote", s: "standardizirane enote", d: "Pogojno naturalna mera obsega proizvodnje: različne, a sorodne proizvode pretvorimo na skupno enoto s pretvorbenimi količniki (npr. različna goriva v ekvivalent nafte). Uporabna, ko naturalne enote (tone, kosi) niso neposredno primerljive." },

  // --- Računovodstvo (subj: "rac") ---
  { t: "ZGD", s: "zgd", b: 1, subj: "rac", d: "Zakon o gospodarskih družbah — zakonski okvir poslovanja družb in računovodskega poročanja (določa tudi uporabo SRS/MSRP)." },
  { t: "SRS", s: "srs", b: 1, subj: "rac", d: "Slovenski računovodski standardi (sprejema Slovenski inštitut za revizijo); uporabljajo jih zlasti majhna in srednja podjetja, ki ne kotirajo na borzi." },
  { t: "MSRP", s: "msrp", b: 1, subj: "rac", d: "Mednarodni standardi računovodskega poročanja (IFRS) — obvezni za podjetja, ki kotirajo na borzi (velika)." },
  { t: "DDV", s: "ddv", b: 1, subj: "rac", d: "Davek na dodano vrednost: vstopni (pri nakupu) in izstopni (pri prodaji); razlika je obveznost do države, ob presežku vstopnega pa terjatev." },
  { t: "FIFO", s: "fifo", b: 1, subj: "rac", d: "First In, First Out — oddaja iz zaloge se obračuna po prvih (najstarejših) cenah, končna zaloga ostane po zadnjih (najnovejših)." },
  { t: "LIFO", s: "lifo", b: 1, subj: "rac", d: "Last In, First Out — oddaja po zadnjih cenah; v Sloveniji od leta 2006 ni več dovoljena." },
  { t: "EBIT", s: "ebit", b: 1, subj: "rac", d: "Poslovni izid iz poslovanja (pred obrestmi in davki) — meri uspešnost osnovne dejavnosti." },
  { t: "EBITDA", s: "ebitda", b: 1, subj: "rac", d: "EBIT + amortizacija opredmetenih in neopredmetenih dolgoročnih sredstev (poslovni izid pred obrestmi, davki in amortizacijo)." },
  { t: "ROE", s: "roe", b: 1, subj: "rac", d: "Return on Equity — donosnost lastniškega kapitala (čisti dobiček / kapital)." },
  { t: "EPS", s: "eps", b: 1, subj: "rac", d: "Earnings Per Share — čisti dobiček na delnico." },
  { t: "AJPES", s: "ajpes", b: 1, subj: "rac", d: "Agencija RS za javnopravne evidence in storitve — sprejema in javno objavlja letna poročila podjetij." },
  { t: "GAAP", s: "gaap", b: 1, subj: "rac", d: "Generally Accepted Accounting Principles — ameriški računovodski standardi (US GAAP)." },
  { t: "Bilanca stanja", s: "bilanca stanja", subj: "rac", d: "Računovodski izkaz premoženjskega stanja na določen dan: sredstva = obveznosti do virov sredstev." },
  { t: "Izkaz poslovnega izida", s: "izkaz poslovnega izida", subj: "rac", d: "Izkaz prihodkov in odhodkov v obdobju; razlika je poslovni izid (dobiček ali izguba)." },
  { t: "Izkaz denarnih tokov", s: "izkaz denarnih tokov", subj: "rac", d: "Prikazuje prejemke in izdatke ločeno za tri dejavnosti: poslovanje, naložbenje (investiranje) in financiranje." },
  { t: "Amortizacija", s: "amortizacij", subj: "rac", d: "Postopno prenašanje nabavne vrednosti osnovnega sredstva na stroške/poslovne učinke v dobi koristnosti; zmanjšuje neodpisano vrednost." },
  { t: "Konto", s: "konto", subj: "rac", d: "Dvostranski računovodski račun: debetna (leva) in kreditna (desna) stran." },
  { t: "Temeljnica", s: "temeljnic", subj: "rac", d: "Knjigovodski nalog za knjiženje poslovnega dogodka v poslovne knjige." },
  { t: "Knjigovodska listina", s: "knjigovodska listina", subj: "rac", d: "Pisni dokaz o nastanku poslovnega dogodka; podlaga za knjiženje." },
  { t: "Glavna knjiga", s: "glavna knjiga", subj: "rac", d: "Poslovna knjiga z vsemi (sintetičnimi) konti; pomožne knjige so analitične evidence, ki jo dopolnjujejo." },
  { t: "Časovne razmejitve", s: "časovne razmejitve", subj: "rac", d: "Razmejevanje prihodkov in stroškov med obdobja, na katera se dejansko nanašajo (aktivne in pasivne ČR)." },
  { t: "Poslovni dogodek", s: "poslovni dogodek", subj: "rac", d: "Dogodek, ki spremeni sredstva, obveznosti do virov ali poslovni izid podjetja." },
  { t: "Revidiranje", s: "revidiranj", subj: "rac", d: "Neodvisen pregled računovodskih izkazov; cilj je povečati zaupanje uporabnikov, rezultat je revizorjevo mnenje." },
  { t: "Neodpisana vrednost", s: "neodpisana", subj: "rac", d: "Knjigovodska vrednost osnovnega sredstva = nabavna vrednost − popravek vrednosti (akumulirana amortizacija)." },
  { t: "Pravilnik o računovodstvu", s: "pravilnik o računovodstvu", subj: "rac", d: "Temeljni notranji akt, ki ureja delovanje računovodstva v posameznem podjetju." },
  { t: "Vodoravna analiza", s: "vodoravna analiza", subj: "rac", d: "Analiza sprememb postavk računovodskih izkazov med obdobji (vrednostne razlike, indeksi)." },
  { t: "Navpična analiza", s: "navpična analiza", subj: "rac", d: "Analiza strukturnih deležev postavk glede na izbrano celoto (npr. bilančno vsoto); omogoča primerjavo različno velikih podjetij." },
  { t: "Stopnja udeležbe", s: "stopnja udeležbe", subj: "rac", d: "Relativno število: razmerje med dvema istovrstnima kategorijama, kjer se prva nanaša na del, druga na celoto." },
  // — Pravo —
  { t: "Kogentna norma", s: "kogentn", subj: "pravo", d: "Prisilna pravna norma - velja samo tako, kot določa zakon; drugačen dogovor strank ni mogoč." },
  { t: "Dispozitivna norma", s: "dispozitivn", subj: "pravo", d: "Norma, od katere se stranke lahko z dogovorom oddaljijo; če se ne, velja zakonska ureditev." },
  { t: "Derogacija", s: "derogacij", subj: "pravo", d: "Razveljavitev pravnega akta; derogacijska klavzula je določba, ki razveljavi prejšnji akt." },
  { t: "Retroaktivnost", s: "retroaktivn", subj: "pravo", d: "Veljavnost pravnega akta za nazaj; načeloma nedopustna, izjemoma pod strogimi pogoji." },
  { t: "Pravnomočnost", s: "pravnomočn", subj: "pravo", d: "Sodne odločbe ni več mogoče izpodbijati z rednimi pravnimi sredstvi." },
  { t: "Coreper", s: "coreper", subj: "pravo", d: "Odbor stalnih predstavnikov držav članic v Bruslju; pripravlja in usklajuje delo Sveta EU." },
  { t: "Subsidiarnost", s: "subsidiarn", subj: "pravo", d: "Podrednost: EU deluje le v mejah prenesenih pristojnosti; pri odgovornosti: terjaš šele, ko primarni zavezanec ne izpolni." },
  { t: "Superficies solo cedit", s: "superficies", subj: "pravo", d: "Načelo povezanosti zemljišča in objekta: kar je trajno spojeno z nepremičnino, je njena sestavina." },
  { t: "Pignus", s: "pignus", subj: "pravo", d: "Ročna zastava - zastavna pravica na premičnini, ki nastane z zastavno pogodbo in izročitvijo stvari upniku." },
  { t: "Intabulacijska klavzula", s: "intabulacij", subj: "pravo", d: "Zemljiškoknjižno dovolilo - nepogojna izjava o dovolitvi vpisa v zemljiško knjigo z overjenim podpisom." },
  { t: "Akcesornost", s: "akcesorn", subj: "pravo", d: "Odvisnost stranske pravice (npr. pridržne, zastavne) od obstoja glavne terjatve." },
  { t: "Pacta sunt servanda", s: "pacta sunt", subj: "pravo", d: "Sporazumi zavezujejo - pogodbe je treba spoštovati in izpolniti." },
  { t: "Rebus sic stantibus", s: "rebus sic", subj: "pravo", d: "Institut spremenjenih okoliščin - izjema od pacta sunt servanda; razveza ali sprememba pogodbe zaradi otežene izpolnitve." },
  { t: "Kavza", s: "poslovna podlaga", subj: "pravo", d: "Poslovna podlaga pogodbe - gospodarski namen, ki mora biti možen in dopusten." },
  { t: "Trasant", s: "trasant", subj: "pravo", d: "Izdajatelj trasirane menice, ki pozove trasata, naj plača meničnemu upniku (remitentu)." },
  { t: "Remitent", s: "remitent", subj: "pravo", d: "Menični upnik - oseba, ki ji mora biti plačan menični znesek." },
  { t: "Kaducitetni postopek", s: "kaducitet", subj: "pravo", d: "Postopek izključitve družbenika iz d.o.o. zaradi neplačila osnovnega vložka." },
  { t: "Prokura", s: "prokur", subj: "pravo", d: "Zakonsko določeno pooblastilo za zastopanje: vsi posli razen odsvojitve in obremenitve nepremičnin; vpisana v register." },
  { t: "Komplementar", s: "komplementar", subj: "pravo", d: "Družbenik komanditne družbe, ki odgovarja z vsem premoženjem, vodi posle in zastopa družbo." },
  { t: "Komanditist", s: "komanditist", subj: "pravo", d: "Družbenik k.d., ki ne odgovarja (oz. le do nevplačanega vložka), ne vodi in ni v firmi." },
  { t: "Vinkulacija", s: "vinkul", subj: "pravo", d: "Omejitev prenosa deleža ali imenske delnice - za odsvojitev je potrebno soglasje družbe." },
  { t: "Emisijska vrednost", s: "emisijsk", subj: "pravo", d: "Vrednost delnice ob izdaji; ne sme biti nižja od nominalne oz. pripadajočega zneska." },
  { t: "KDD", s: "kdd", b: 1, subj: "pravo", d: "Centralna klirinško depotna družba - vodi centralni register nematerializiranih vrednostnih papirjev." },
  { t: "Razrešnica", s: "razrešnic", subj: "pravo", d: "Sklep skupščine, s katerim potrdi in odobri delo organov vodenja ali nadzora v poslovnem letu." },
  { t: "COVL", s: "covl", b: 1, subj: "pravo", d: "Centralni oddelek za verodostojno listino pri Okrajnem sodišču v Ljubljani - vodi izvršbe na podlagi verodostojne listine." },
  { t: "In dubio pro auctore", s: "in dubio", subj: "pravo", d: "V dvomu je treba pravne norme razlagati v prid avtorju (avtorsko pravo)." },
  { t: "ZGD-1", s: "zgd", b: 1, subj: "pravo", d: "Zakon o gospodarskih družbah - temeljni predpis korporacijskega prava." },
  { t: "ZASP", s: "zasp", b: 1, subj: "pravo", d: "Zakon o avtorski in sorodnih pravicah." },
  { t: "ZIL-1", s: "zil", b: 1, subj: "pravo", d: "Zakon o industrijski lastnini - patent, model, znamka, geografska označba." },
  { t: "AJPES", s: "ajpes", b: 1, subj: "pravo", d: "Agencija za javnopravne evidence in storitve - vodi PRS, objavlja podatke sodnega registra in letna poročila." },
  { t: "Arbitraža", s: "arbitraž", subj: "pravo", d: "Reševanje spora pred zasebnim razsodiščem (arbitri), o katerem se stranke dogovorijo z arbitražno klavzulo - namesto rednega sodišča. Arbitražna odločba je za stranke zavezujoča in izvršljiva; postopek je hitrejši in zaupen, a praviloma brez pritožbe." },
  { t: "Alikvotni del", s: "alikvotn", subj: "pravo", d: "Sorazmerni del celote. Delnica je alikvotni (sorazmerni) del osnovnega kapitala d.d. - vsaka delnica predstavlja enak delež OK glede na skupno število delnic." },
  { t: "Imenske delnice", s: "imensk", subj: "pravo", d: "Delnice, ki se glasijo na ime določenega imetnika (za razliko od prinosniških). Prenašajo se z vpisom v centralni register (KDD). Samo imenske delnice so lahko vinkulirane - njihov prenos se lahko omeji s soglasjem družbe." },
  // --- pf1 ---
  { t: "EBIT", s: "ebit", b: 1, subj: "pf1", d: "Dobiček iz poslovanja pred obrestmi in davki (angl. earnings before interest and taxes) = prihodki − poslovni odhodki. Izhodišče za izračun NOPAT in FCF." },
  { t: "EBITDA", s: "ebitda", b: 1, subj: "pf1", d: "EBIT + amortizacija. Približek denarnemu toku iz poslovanja pred davki in naložbami." },
  { t: "EBT", s: "ebt", b: 1, subj: "pf1", d: "Dobiček pred davki (earnings before tax) = EBIT − obresti." },
  { t: "NOPAT", s: "nopat", b: 1, subj: "pf1", d: "Čisti poslovni dobiček po davkih, kot da podjetje nima dolga: EBIT · (1 − t). Osnova za FCF." },
  { t: "FCF", s: "fcf", b: 1, subj: "pf1", d: "Prosti denarni tok (free cash flow): denar, ki ga sredstva ustvarijo za vse investitorje (lastnike in upnike). FCF = NOPAT + amortizacija − naložbe v osnovna sredstva − povečanje obratnega kapitala." },
  { t: "WACC", s: "wacc", b: 1, subj: "pf1", d: "Tehtano povprečje stroškov kapitala: delež dolga · stroški dolga · (1 − t) + delež lastniškega kapitala · stroški lastniškega kapitala. Diskontna stopnja za FCF." },
  { t: "ROE", s: "roe", b: 1, subj: "pf1", d: "Donosnost lastniškega kapitala = čisti dobiček / lastniški kapital. DuPont: marža · obračanje sredstev · A/E." },
  { t: "ROA", s: "roa", b: 1, subj: "pf1", d: "Donosnost sredstev = dobiček / sredstva (pogosto pred davki ali po njih, glej nalogo)." },
  { t: "EPS", s: "eps", b: 1, subj: "pf1", d: "Čisti dobiček na delnico = čisti dobiček / število delnic v obtoku." },
  { t: "P/E", s: "p/e", subj: "pf1", d: "Razmerje cena/dobiček = tečaj delnice / EPS. Koliko evrov vlagatelji plačajo za evro dobička." },
  { t: "P/B", s: "p/b", subj: "pf1", d: "Razmerje cena/knjigovodska vrednost = tržna cena delnice / knjigovodska vrednost na delnico (BVPS). P/B > 1: trg vrednoti več, kot kaže bilanca." },
  { t: "BVPS", s: "bvps", b: 1, subj: "pf1", d: "Knjigovodska vrednost na delnico = lastniški kapital / število delnic." },
  { t: "IPI", s: "ipi", b: 1, subj: "pf1", d: "Izkaz poslovnega izida: prihodki, odhodki in dobiček v obdobju (»film«)." },
  { t: "IDT", s: "idt", b: 1, subj: "pf1", d: "Izkaz denarnih tokov: denarni tokovi iz poslovanja, naložbenja in financiranja v obdobju." },
  { t: "Bilanca stanja", s: "bilanc", subj: "pf1", d: "Stanje sredstev in virov (lastniški kapital + obveznosti) na določen dan (»fotografija«)." },
  { t: "LK", s: "lk", b: 1, subj: "pf1", d: "Lastniški kapital (kapital) = sredstva − obveznosti. V formulah D/E, A/E, ROE." },
  { t: "D/E", s: "d/e", subj: "pf1", d: "Razmerje dolg/lastniški kapital (finančni vzvod). A/E = 1 + D/E, če je D vse obveznosti." },
  { t: "A/E", s: "a/e", subj: "pf1", d: "Multiplikator kapitala = sredstva / lastniški kapital. Tretji faktor v DuPontu." },
  { t: "DuPont", s: "dupont", subj: "pf1", d: "Razgradnja ROE na tri dele: neto marža × obračanje sredstev × multiplikator kapitala (A/E)." },
  { t: "TIE", s: "tie", b: 1, subj: "pf1", d: "Kritje obresti (times interest earned) = EBIT / obresti." },
  { t: "Obratni kapital", s: "obratni kapital", subj: "pf1", d: "Kratkoročna sredstva − kratkoročne obveznosti. Neto operativni obratni kapital izloči denar in finančni dolg." },
  { t: "Davčni ščit", s: "davčni ščit", subj: "pf1", d: "Prihranek pri davku, ker so obresti odbitna postavka: obresti · t. Zato dolg stane (1 − t) · r." },
  { t: "Mejna davčna stopnja", s: "mejna davčna", subj: "pf1", d: "Stopnja davka na dodaten evro dobička. Uporabljamo jo pri finančnih odločitvah (ne efektivne)." },
  { t: "Amortizacija", s: "amortizac", subj: "pf1", d: "Razporeditev nabavne vrednosti osnovnega sredstva na obdobja uporabe. Odhodek v IPI, ni denarni izdatek." },
  { t: "PV", s: "pv", b: 1, subj: "pf1", d: "Sedanja vrednost (present value) = FV / (1 + r)ⁿ." },
  { t: "FV", s: "fv", b: 1, subj: "pf1", d: "Prihodnja vrednost (future value) = PV · (1 + r)ⁿ." },
  { t: "NPV", s: "npv", b: 1, subj: "pf1", d: "Neto sedanja vrednost: sedanja vrednost denarnih tokov minus začetna naložba. Sprejmemo projekt, če je NPV > 0." },
  { t: "IRR", s: "irr", b: 1, subj: "pf1", d: "Notranja stopnja donosa: diskontna stopnja, pri kateri je NPV enak nič." },
  { t: "PVIF / FVIF", s: "pvif", b: 1, subj: "pf1", d: "Faktorja sedanje in prihodnje vrednosti: PVIF = 1/(1 + r)ⁿ, FVIF = (1 + r)ⁿ." },
  { t: "PVIFA / FVIFA", s: "pvifa", b: 1, subj: "pf1", d: "Faktorja anuitete: PVIFA = [1 − (1 + r)⁻ⁿ]/r, FVIFA = [(1 + r)ⁿ − 1]/r." },
  { t: "FVIFA", s: "fvifa", b: 1, subj: "pf1", d: "Faktor prihodnje vrednosti anuitete: [(1 + r)ⁿ − 1]/r." },
  { t: "Anuiteta", s: "anuitet", subj: "pf1", d: "Niz enakih denarnih tokov v enakih presledkih (npr. obroki posojila)." },
  { t: "Večna renta (perpetuiteta)", s: "perpetuit", subj: "pf1", d: "Enaki zneski v neskončnost: PV = A/r. Rastoča večna renta: PV = A₁/(r − g)." },
  { t: "Večna renta", s: "večna renta", subj: "pf1", d: "Enaki zneski v neskončnost: PV = A/r. Rastoča večna renta: PV = A₁/(r − g)." },
  { t: "EAR", s: "ear", b: 1, subj: "pf1", d: "Efektivna letna obrestna mera = (1 + r/m)^m − 1; upošteva pogostost pripisa obresti." },
  { t: "EOM", s: "eom", b: 1, subj: "pf1", d: "Efektivna obrestna mera: pri potrošniških posojilih zajame tudi stroške (odobritev, zavarovanje)." },
  { t: "Proporcionalna mera", s: "proporcional", subj: "pf1", d: "Mesečna mera = letna / 12. Konformna: (1 + r)^(1/12) − 1." },
  { t: "Konformna mera", s: "konform", subj: "pf1", d: "Mesečna mera, ki po 12 mesecih da enako efektivno letno mero: (1 + r)^(1/12) − 1." },
  { t: "Fisherjeva enačba", s: "fisher", subj: "pf1", d: "(1 + nominalna) = (1 + realna)(1 + inflacija). Realna ≈ nominalna − inflacija." },
  { t: "Nominalna obrestna mera", s: "nominaln", subj: "pf1", d: "Navedena mera brez upoštevanja pogostosti pripisa ali inflacije. Realna je očiščena inflacije." },
  { t: "Kupon", s: "kupon", subj: "pf1", d: "Redno obrestno plačilo obveznice = kuponska mera · nominalna vrednost." },
  { t: "Nominalna vrednost", s: "nominalna vrednost", subj: "pf1", d: "Znesek glavnice, ki ga izdajatelj obveznice vrne ob zapadlosti (npr. 1.000 €)." },
  { t: "YTM", s: "ytm", b: 1, subj: "pf1", d: "Donosnost do dospetja: diskontna stopnja, pri kateri je sedanja vrednost plačil obveznice enaka ceni." },
  { t: "Tekoča donosnost", s: "tekoča donosnost", subj: "pf1", d: "Letni kupon / tržna cena obveznice. Ne upošteva dobička ali izgube do zapadlosti." },
  { t: "Premija / diskont", s: "diskont", subj: "pf1", d: "Obveznica se prodaja s premijo (cena > nominalna), če je kupon višji od zahtevane donosnosti; z diskontom, če je nižji." },
  { t: "Obrestno tveganje", s: "obrestno tveganje", subj: "pf1", d: "Padec cene obveznice ob rasti obrestnih mer. Večje pri daljši zapadlosti in nižjem kuponu." },
  { t: "Kreditno tveganje", s: "kreditno tveganje", subj: "pf1", d: "Tveganje, da izdajatelj ne plača. Meri ga bonitetna ocena (AAA … D); višje tveganje = višja zahtevana donosnost." },
  { t: "Bonitetna ocena", s: "bonitetn", subj: "pf1", d: "Ocena kreditne sposobnosti izdajatelja (S&P, Moody's, Fitch). Pod BBB− je špekulativni razred." },
  { t: "Čista cena", s: "čista cena", subj: "pf1", d: "Cena obveznice brez natečenih obresti (kot na tečajnici). Kupec plača še natečene obresti." },
  { t: "Natečene obresti", s: "natečen", subj: "pf1", d: "Del kupona, ki pripada prodajalcu za čas, ko je imel obveznico." },
  { t: "Krivulja donosnosti", s: "krivulj", subj: "pf1", d: "Donosnost glede na leta do zapadlosti; obrnjena, če so kratkoročne višje od dolgoročnih." },
  { t: "Gordonov model", s: "gordon", subj: "pf1", d: "Vrednost delnice pri stalni rasti dividend: P₀ = D₁/(rE − g), pogoj rE > g." },
  { t: "DDM", s: "ddm", b: 1, subj: "pf1", d: "Model diskontiranih dividend: vrednost delnice je sedanja vrednost pričakovanih dividend." },
  { t: "Dividendna donosnost", s: "dividendn", subj: "pf1", d: "Dividenda / tečaj delnice. Skupaj s kapitalsko donosnostjo da skupno donosnost delnice." },
  { t: "Kapitalski dobiček", s: "kapitalski dobiček", subj: "pf1", d: "Sprememba tečaja delnice (P₁ − P₀)/P₀." },
  { t: "Zahtevana donosnost", s: "zahtevana donosnost", subj: "pf1", d: "Donosnost, ki jo vlagatelji zahtevajo glede na tveganje (diskontna stopnja). Za delnice rE, za dolg rD." },
  { t: "Odkup lastnih delnic", s: "odkup lastn", subj: "pf1", d: "Način izplačila delničarjem poleg dividend; zmanjša število delnic v obtoku. Lastne delnice nimajo pravice do dividend." },
  { t: "Dan brez dividende", s: "brez dividende", subj: "pf1", d: "Prvi dan, ko delnica kotira brez pravice do dividende; tečaj pade približno za znesek dividende." },
  { t: "KDD", s: "kdd", b: 1, subj: "pf1", d: "Centralna klirinško depotna družba - vodi register nematerializiranih vrednostnih papirjev (delniška knjiga)." },
  { t: "Vesting", s: "vesting", subj: "pf1", d: "Doba, po kateri manager pridobi pravico do opcij ali delnic (npr. 3-5 let); proti kratkoročnosti." },
  { t: "Clawback", s: "clawback", subj: "pf1", d: "Pravica podjetja, da od managerja zahteva vračilo že izplačanih bonusov ob napakah ali prevarah." },
  { t: "Delniška opcija", s: "opcij", subj: "pf1", d: "Pravica (ne obveznost) kupiti delnico po vnaprej določeni ceni. Asimetrično izplačilo spodbuja tveganje." },
  { t: "Problem agenta", s: "agent", subj: "pf1", d: "Spor interesov med lastniki (principali) in managerji (agenti) zaradi ločitve lastništva in upravljanja." },
  { t: "Moralni hazard", s: "moralni hazard", subj: "pf1", d: "Agent ravna v svojo korist, ker posledic ne nosi v celoti (npr. manager z 5 % deleža nosi 5 % stroška jahte)." },
  { t: "Nasprotna izbira", s: "nasprotna izbira", subj: "pf1", d: "Napačna izbira zaradi neznanja ali skritih informacij (adverse selection) - ni isto kot moralni hazard." },
  { t: "Zastonjkar", s: "zastonjkar", subj: "pf1", d: "Mali delničar ne nadzira uprave, ker korist dobijo vsi, strošek nosi sam." },
  { t: "ESG", s: "esg", b: 1, subj: "pf1", d: "Okoljski, družbeni in upravljavski dejavniki (environmental, social, governance)." },
  { t: "ESRS", s: "esrs", b: 1, subj: "pf1", d: "Evropski standardi poročanja o trajnostnosti; temelji na dvojni pomembnosti." },
  { t: "Dvojna pomembnost", s: "dvojna pomembnost", subj: "pf1", d: "Tema je bistvena finančno ALI z vidika učinkov podjetja na ljudi in okolje." },
  { t: "Obseg 1, 2, 3", s: "obseg 2", subj: "pf1", d: "Izpusti toplogrednih plinov: 1 - neposredni, 2 - iz kupljene energije, 3 - ostala vrednostna veriga." },
  // --- stana ---
  { t: "Populacija", s: "populacij", subj: "stana", d: "Množica vseh enot, ki nas zanimajo. Njena značilnost je parameter (μ, σ), iz vzorca dobimo oceno (ȳ, s)." },
  { t: "Parameter", s: "parameter", subj: "stana", d: "Fiksna značilnost populacije kot celote (μ, σ, Me, delež). Ocena parametra z vzorca je cenilka." },
  { t: "Cenilka", s: "cenilk", subj: "stana", d: "Funkcija vzorčnih podatkov, ki je slučajna spremenljivka. Vrednost cenilke na posameznem vzorcu je vzorčna ocena." },
  { t: "Nepristranskost", s: "nepristransk", subj: "stana", d: "Cenilka g je nepristranska, če je E(g) = Γ (povprečje ocen čez vse možne vzorce je enako parametru)." },
  { t: "Standardna napaka", s: "standardna napak", subj: "stana", d: "Standardni odklon vzorčnih ocen SE = √Var(ȳ); meri variiranje ocen od vzorca do vzorca, ne med enotami." },
  { t: "Vzorčni okvir", s: "vzorčni okvir", subj: "stana", d: "Oštevilčen seznam vseh enot populacije, iz katerega izbiramo enote v vzorec." },
  { t: "ESV", s: "esv", b: 1, subj: "stana", d: "Enostavno slučajno vzorčenje: vsaka enota in vsak vzorec iste velikosti sta izbrana z enako verjetnostjo." },
  { t: "Binomski koeficient", s: "binomsk", subj: "stana", d: "C(N, n) = N!/(n!(N − n)!) - število vzorcev velikosti n iz N enot brez ponavljanja." },
  { t: "Merske lestvice", s: "lestvic", subj: "stana", d: "Imenska, urejenostna, razmična, razmernostna. Višja lestvica dovoljuje več parametrov." },
  { t: "Koeficient variacije", s: "koeficient variacij", subj: "stana", d: "KV = σ/μ (ocena kv = s/ȳ): relativna mera variabilnosti; zahteva razmernostno lestvico." },
  { t: "Kvantil", s: "kvantil", subj: "stana", d: "Vrednost, ki loči delež populacije: kvartili (25 %), decili (10 %), centili (1 %). Kvantilni rang je delež do vrednosti." },
  { t: "Gostota verjetnosti", s: "gostot", subj: "stana", d: "f(y) pri zvezni spremenljivki; verjetnost je ploščina pod krivuljo. F(y) = P(Y ≤ y) je porazdelitvena funkcija." },
  { t: "Standardizacija (z)", s: "standardizacij", subj: "stana", d: "z = (y − μ)/σ - pretvorba v standardno normalno porazdelitev N(0, 1)." },
  { t: "Osamelec", s: "osamele", subj: "stana", d: "Vrednost, ki je na boxplotu zunaj ročajev; ročaj kaže največjo vrednost brez osamelcev." },
  { t: "CLI", s: "cli", b: 1, subj: "stana", d: "Centralni limitni izrek: pri velikih vzorcih (n ≥ 100) so ocene μ, deleža ali vsote približno normalne." },
  // --- trz ---
  { t: "NPS", s: "nps", b: 1, subj: "trz", d: "Neto ocena promotorja: delež promotorjev − delež kritikov (−100 do +100)." },
  { t: "CLV", s: "clv", b: 1, subj: "trz", d: "Vrednost življenjske dobe porabnika: sedanja vrednost vseh pričakovanih dobičkov od porabnika." },
  { t: "CRM", s: "crm", b: 1, subj: "trz", d: "Management odnosov s porabniki: filozofija dolgoročnega odnosa in dvosmernega dialoga, ne le programska oprema." },
  { t: "ROPO", s: "ropo", b: 1, subj: "trz", d: "Research online, purchase offline: informacije na spletu, nakup v trgovini. Reverse ROPO: obratno." },
  { t: "D2C", s: "d2c", b: 1, subj: "trz", d: "Direct to consumer: blagovne znamke, ki prodajajo neposredno končnemu kupcu brez trgovca." },
  { t: "FOMO", s: "fomo", b: 1, subj: "trz", d: "Strah, da bomo kaj zamudili (fear of missing out); spodbuja impulzivne nakupe." },
  { t: "SEO / SEM", s: "seo", b: 1, subj: "trz", d: "SEO - neplačana optimizacija za boljšo uvrstitev v iskalniku; SEM - plačano trženje v iskalnikih." },
  { t: "B2B / B2C", s: "b2b", b: 1, subj: "trz", d: "Business to business (podjetje podjetju) in business to consumer (podjetje porabniku)." },
  { t: "Trženjski splet (4P)", s: "trženjski splet", subj: "trz", d: "Izdelek, cena, tržne poti, trženjsko komuniciranje. Pri storitvah še ljudje, procesi in fizični dokazi." },
  { t: "Glokalno", s: "glokaln", subj: "trz", d: "Think global, act local - med standardiziranim in prilagojenim trženjskim spletom." },
  { t: "Born global", s: "born global", subj: "trz", d: "Podjetja, ki se internacionalizirajo že ob ustanovitvi." },
  { t: "Trženjska kratkovidnost", s: "kratkovidn", subj: "trz", d: "Podjetje se zaljubi v izdelek in spregleda potrebe porabnikov (nevarnost izdelčne usmeritve)." },
  { t: "Delfi metoda", s: "delfi", subj: "trz", d: "Več krogov anonimnih ocen strokovnjakov s povratno informacijo do soglasja." },
  { t: "Omnibus raziskava", s: "omnibus", subj: "trz", d: "Ad hoc raziskava z več naročniki v istem vprašalniku; ni zaupna." },
  { t: "Tržni potencial", s: "tržni potencial", subj: "trz", d: "Zgornja meja povpraševanja pri neskončnih trženjskih izdatkih in danem okolju. Tržni minimum: brez izdatkov." },
  { t: "Relativni tržni delež", s: "relativni tržni", subj: "trz", d: "Delež podjetja / delež največjega konkurenta. Nad 100 %: tržni vodja." },
  // --- eeu ---
  { t: "ESPJ", s: "espj", b: 1, subj: "eeu", d: "Evropska skupnost za premog in jeklo (Pariška pogodba 1951/52) - prvi nadnacionalni projekt." },
  { t: "EGS", s: "egs", b: 1, subj: "eeu", d: "Evropska gospodarska skupnost (Rimska pogodba 1957/58): carinska unija šestih držav." },
  { t: "EFTA", s: "efta", b: 1, subj: "eeu", d: "Evropsko združenje za prosto trgovino (1960): prostotrgovinsko območje, medvladno, brez skupne zunanje carine." },
  { t: "OEEC", s: "oeec", b: 1, subj: "eeu", d: "Organizacija za evropsko gospodarsko sodelovanje (1948) za delitev Marshallove pomoči; 1961 postane OECD." },
  { t: "EPU", s: "epu", b: 1, subj: "eeu", d: "Evropska plačilna unija (1950-58): multilateralni kliring neto saldov zaradi nekonvertibilnih valut." },
  { t: "SEV (Comecon)", s: "sev", b: 1, subj: "eeu", d: "Svet za vzajemno gospodarsko pomoč (1949) - vzhodni odgovor na Marshallov načrt." },
  { t: "SKP", s: "skp", b: 1, subj: "eeu", d: "Skupna kmetijska politika (1962): intervencijske cene, subvencije, zaščita pred uvozom." },
  { t: "EMS", s: "ems", b: 1, subj: "eeu", d: "Evropski monetarni sistem (1979): stabilnejši tečaji, predhodnik EMU." },
  { t: "QMV", s: "qmv", b: 1, subj: "eeu", d: "Kvalificirana večina pri odločanju v Svetu: 55 % držav, ki predstavljajo 65 % prebivalstva." },
  { t: "Acquis", s: "acquis", subj: "eeu", d: "Celoten pravni red EU, ki ga mora kandidatka prevzeti (kopenhagenski kriterij)." },
  { t: "Kopenhagenski kriteriji", s: "kopenhagensk", subj: "eeu", d: "Politični (demokracija, pravna država), ekonomski (tržno gospodarstvo) in prevzem pravnega reda (1993)." },
  { t: "Učinek domin", s: "domin", subj: "eeu", d: "Baldwin: preferencialna liberalizacija diskriminira nečlanice, njihovi izvozniki lobirajo za vstop, blok se širi." },
  { t: "Carinska unija", s: "carinska unija", subj: "eeu", d: "Prosta trgovina znotraj bloka + skupna zunanja carina do tretjih držav. Prostotrgovinsko območje ima vsaka država svoje carine." },
  { t: "Vzajemno priznavanje", s: "vzajemno priznavanj", subj: "eeu", d: "Kar je zakonito proizvedeno in prodano v eni članici, se sme prodajati v drugih (Cassis de Dijon, 1979)." },
  { t: "Evropesimizem", s: "evropesimiz", subj: "eeu", d: "Obdobje 1975-86: naftna šoka, stagflacija, blokade odločanja (luksemburški kompromis)." },
  { t: "Preusmeritev trgovine", s: "preusmeritev trgovine", subj: "eeu", d: "Uvoz se preusmeri od cenejšega zunanjega dobavitelja k dražjemu iz bloka, ker ta ne plača carine." },
  { t: "Mrtva izguba", s: "mrtva izguba", subj: "eeu", d: "Izguba blaginje zaradi carine: nekoristna pretirana proizvodnja doma in zmanjšana potrošnja." },
  { t: "MFN", s: "mfn", b: 1, subj: "eeu", d: "Načelo države največjih ugodnosti (WTO): ista carina za vse članice; RTA so dovoljeni izjema po členu 24 GATT." },
  { t: "FTA", s: "fta", b: 1, subj: "eeu", d: "Sporazum o prosti trgovini: odprava carin med članicami; pravila o poreklu preprečujejo preusmeritev uvoza." },
  // --- mpsp ---
  { t: "TPČ", s: "tp", b: 1, subj: "mpsp", d: "Tehnološki pretočni čas: čas najdaljše poti (kritične poti) v procesnem diagramu." },
  { t: "Ozko grlo", s: "ozko grlo", subj: "mpsp", d: "Resurs z najmanjšo zmogljivostjo; določa zmogljivost celotnega procesa." },
  { t: "Littlov zakon", s: "littl", subj: "mpsp", d: "Zaloga = pretok × pretočni čas (Z = P · PČ); PČ = Z/P." },
  { t: "Kritična pot", s: "kritična pot", subj: "mpsp", d: "Najdaljša pot v procesnem diagramu; določa TPČ. Kritične aktivnosti nimajo rezerve." },
  { t: "Izkoriščenost", s: "izkoriščenost", subj: "mpsp", d: "Zmogljivost procesa / zmogljivost resursa; ozko grlo ima 100 %." },
  { t: "Dejavniki zmagovanja", s: "zmagovanj", subj: "mpsp", d: "Lastnosti, po katerih podjetje pridobi stranke pred konkurenti. Kvalificiranja: morajo biti le dovolj dobri." },
  { t: "KNN", s: "knn", b: 1, subj: "mpsp", d: "Kumulativna napaka v napovedi (vsota napak, lahko + ali −); kaže smer odklanjanja." },
  { t: "Prispevek za kritje", s: "prispevek za kritje", subj: "mpsp", d: "Prihodki − variabilni stroški; pokriva stalne stroške in dobiček." },
  { t: "Beta (β)", s: "beta", b: 1, subj: "pf1", d: "Občutljivost donosa naložbe na donos tržnega portfelja: β = Cov(r_i, r_m)/Var(r_m) = ρ · σ_i/σ_m. Tržni portfelj β = 1, netvegana naložba β = 0; beta portfelja je tehtano povprečje bet." },
  { t: "CAPM", s: "capm", b: 1, subj: "pf1", d: "Model vrednotenja kapitalskih naložb: zahtevana donosnost = r_f + β · (E(r_m) − r_f). Plača samo sistematično tveganje." },
  { t: "SML", s: "sml", b: 1, subj: "pf1", d: "Premica trga vrednostnih papirjev: zahtevana donosnost v odvisnosti od bete. Naložbe nad SML so podcenjene, pod njo precenjene." },
  { t: "Tržna premija za tveganje", s: "tržna premija", subj: "pf1", d: "E(r_m) − r_f: dodatna donosnost, ki jo trg zahteva za tveganje tržnega portfelja." },
  { t: "Sistematično tveganje", s: "sistematičn", subj: "pf1", d: "Tržno tveganje, ki zadeva vse naložbe in ga z razpršitvijo ni mogoče odpraviti; meri ga beta." },
  { t: "Nesistematično tveganje", s: "nesistematičn", subj: "pf1", d: "Specifično tveganje posameznega podjetja; z diverzifikacijo ga odpravimo, zato ga trg ne nagradi." },
  { t: "Diverzifikacija", s: "diverzifikacij", subj: "pf1", d: "Razpršitev naložb po več vrednostnih papirjih; zmanjša nesistematično tveganje. Večja pri nižji ali negativni korelaciji." },
  { t: "Razpršitev (diverzifikacija)", s: "razpršitev", subj: "pf1", d: "Razpršitev naložb po več vrednostnih papirjih; zmanjša nesistematično tveganje." },
  { t: "Korelacija (ρ)", s: "korelacij", subj: "pf1", d: "Mera sočasnega gibanja dveh donosnosti (−1 do +1). Cov = ρ · σ₁ · σ₂. Nižja korelacija → večja diverzifikacija." },
  { t: "Kovarianca", s: "kovarianc", subj: "pf1", d: "Mera skupnega gibanja dveh donosnosti: Cov(A, B) = Σ p (r_A − E_A)(r_B − E_B)." },
  { t: "Koeficient variacije", s: "koeficient variacij", subj: "pf1", d: "σ/E: tveganje na enoto pričakovane donosnosti. Pri E = 0 ni definiran." },
  { t: "Flotacijski stroški", s: "flotacij", subj: "pf1", d: "Stroški izdaje novih delnic (F). Strošek novih delnic: D₁/(P₀(1 − F)) + g - dražji od zadržanega dobička." },
  { t: "Mejni strošek kapitala (MCC)", s: "mejni strošek kapitala", subj: "pf1", d: "Strošek zadnjega evra novega kapitala; narašča po stopnjah: zadržan dobiček, nove delnice, dražji dolg." },
  { t: "Alfa", s: "alfa", b: 1, subj: "pf1", d: "Razlika med pričakovano in zahtevano (CAPM) donosnostjo. Alfa > 0: podcenjena delnica; alfa < 0: precenjena." },
];

function mixDecksOf(p) {
  const out = [];
  if (p.decks.filter((d) => !d.calc).length >= 2) out.push({ id: "__mix", name: "Mešani kviz" });
  if (p.decks.filter((d) => d.calc).length >= 2) out.push({ id: "__mixcalc", name: "Mešane računske naloge" });
  return out;
}

function aggregate(stats, year) {
  const items = [];
  DATA.filter((sem) => !year || sem.year === year).forEach((sem) => sem.subjects.forEach((su) => su.parts.forEach((p) => {
    p.decks.forEach((d) => { const ds = deckStats(stats, `${sem.id}/${su.id}/${p.id}/${d.id}`); if (ds) items.push({ semId: sem.id, subjId: su.id, partId: p.id, deckId: d.id, view: "quiz", cat: p.type, kind: "Kviz", subj: su.name, part: p.name, name: d.name, ds }); });
    mixDecksOf(p).forEach((d) => { const ds = deckStats(stats, `${sem.id}/${su.id}/${p.id}/${d.id}`); if (ds) items.push({ semId: sem.id, subjId: su.id, partId: p.id, deckId: d.id, view: "quiz", cat: p.type, kind: "Mešani", subj: su.name, part: p.name, name: d.name, ds }); });
    (p.flashcards || []).forEach((d) => { const ds = deckStats(stats, `${sem.id}/${su.id}/${p.id}/${d.id}`); if (ds) items.push({ semId: sem.id, subjId: su.id, partId: p.id, deckId: d.id, view: "cards", cat: "kartice", kind: "Kartice", subj: su.name, part: p.name, name: d.name, ds }); });
  })));
  const avgOf = (arr) => arr.length ? Math.round(arr.reduce((s, x) => s + x, 0) / arr.length) : 0;
  const catAvg = (c) => { const a = items.filter((i) => i.cat === c).map((i) => i.ds.avg); return { avg: avgOf(a), n: a.length }; };
  return {
    items,
    totalAttempts: items.reduce((n, i) => n + i.ds.n, 0),
    practiced: items.length,
    overallAvg: avgOf(items.map((i) => i.ds.avg)),
    byCat: { kolokvij: catAvg("kolokvij"), izpit: catAvg("izpit"), kartice: catAvg("kartice") },
  };
}

/* ---- Usmerjanje prek #hash: gumb Nazaj/Naprej v brskalniku deluje med stranmi ---- */
const storedYear = () => { const y = store.get("indeks.year", YEARS[YEARS.length - 1]); return YEARS.includes(y) ? y : YEARS[YEARS.length - 1]; };
function routeToHash(r, fallbackYear) {
  const yr = (r.year || fallbackYear || storedYear());
  if (r.view === "home") return "#/letnik-" + yr;
  if (r.view === "allstats") return "#/letnik-" + yr + "/statistika";
  const base = "#/" + r.sem + "/" + r.subj;
  if (r.view === "subject") return base;
  if (r.view === "stats") return base + "/statistika";
  const pb = base + "/" + r.part;
  if (r.view === "part") return pb;
  if (r.view === "notes") return pb + "/zapiski";
  if (r.view === "quiz") return pb + "/kviz/" + r.deck;
  if (r.view === "cards") return pb + "/kartice/" + r.deck;
  return "#/letnik-" + yr;
}
function hashToRoute(hash) {
  const home = { view: "home", year: storedYear() };
  const seg = (hash || "").replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
  if (!seg.length) return home;
  const ym = /^letnik-(\d+)$/.exec(seg[0]);
  if (ym) { const y = +ym[1]; if (!YEARS.includes(y)) return home; return seg[1] === "statistika" ? { view: "allstats", year: y } : { view: "home", year: y }; }
  const sem = DATA.find((x) => x.id === seg[0]);
  const subj = sem && sem.subjects.find((x) => x.id === seg[1]);
  if (!subj) return home;
  const r = { sem: sem.id, subj: subj.id, year: sem.year };
  if (!seg[2]) return { ...r, view: "subject" };
  if (seg[2] === "statistika") return { ...r, view: "stats" };
  const part = subj.parts.find((x) => x.id === seg[2]);
  if (!part) return { ...r, view: "subject" };
  r.part = part.id;
  if (!seg[3]) return { ...r, view: "part" };
  if (seg[3] === "zapiski") return { ...r, view: "notes" };
  if ((seg[3] === "kviz" || seg[3] === "kartice") && seg[4]) return { ...r, view: seg[3] === "kviz" ? "quiz" : "cards", deck: seg[4] };
  return { ...r, view: "part" };
}

export default function App() {
  const [route, setRouteState] = useState(() => hashToRoute(window.location.hash));
  const routeRef = useRef(route);
  routeRef.current = route;
  useEffect(() => {
    const onHash = () => { setRouteState(hashToRoute(window.location.hash)); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  // go(...): nova stran → nov vnos v zgodovini brskalnika (Nazaj te vrne na prejšnjo stran)
  const setRoute = useCallback((r) => {
    const cur = routeRef.current;
    const yr = r.year || cur.year;
    const h = routeToHash(r, yr);
    if (h === window.location.hash) { setRouteState(hashToRoute(h)); window.scrollTo(0, 0); }
    else window.location.hash = h;
  }, []);
  const [dark, setDark] = useState(() => store.get("indeks.theme", "light") === "dark");
  const year = route.year || storedYear();
  useEffect(() => { if (route.year) store.set("indeks.year", route.year); }, [route.year]);
  const setYear = (y) => setRoute({ view: "home", year: y });
  const [gloss, setGloss] = useState(() => store.get("indeks.gloss", true) !== false);
  const toggleGloss = () => setGloss((g) => { store.set("indeks.gloss", !g); return !g; });
  const toggleTheme = () => setDark((d) => { const nd = !d; store.set("indeks.theme", nd ? "dark" : "light"); return nd; });
  // zunanje ozadje (rob/overscroll) naj sledi temi, da ni belega roba okrog
  useEffect(() => {
    const bg = dark ? "#1a1714" : "#efe7d8";
    document.documentElement.style.background = bg;
    document.body.style.background = bg;
  }, [dark]);

  const { session, loading: authLoading, signOut } = useAuth();
  const userId = session && session.user && session.user.id;
  const { stats, record } = useCloudStats(userId || null);
  const comm = useCommunity(userId || null);

  // ob odjavi ali menjavi računa nazaj na domačo stran
  const prevUser = useRef(userId);
  useEffect(() => {
    if (prevUser.current && prevUser.current !== userId) setRoute({ view: "home" });
    prevUser.current = userId;
  }, [userId, setRoute]);

  return (
    <div className={"ix-root" + (dark ? " ix-dark" : "")} style={{ minHeight: "100vh" }}>
      <style>{CSS}</style>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "28px 18px 60px" }}>
        <Header onHome={() => setRoute({ view: "home", year })} home={route.view === "home"} dark={dark} onToggleTheme={toggleTheme} gloss={gloss} onToggleGloss={toggleGloss}
          user={session && session.user} onSignOut={signOut} />
        {authLoading ? (
          <div style={{ textAlign: "center", color: "var(--ink2)", padding: "18vh 0", fontSize: 15 }}>Nalagam…</div>
        ) : !session ? (
          <Login />
        ) : (
          <>
            {route.view === "home" && <Home go={setRoute} stats={stats} year={year} setYear={setYear} comm={comm} />}
            {route.view === "allstats" && <OverallStatsView stats={stats} go={setRoute} year={year} comm={comm} />}
            {route.view === "subject" && <SubjectView route={route} stats={stats} go={setRoute} />}
            {route.view === "part" && <PartView route={route} stats={stats} go={setRoute} />}
            {route.view === "notes" && <NotesView route={route} go={setRoute} />}
            {route.view === "quiz" && <GlossCtx.Provider value={gloss}><QuizView route={route} go={setRoute} record={record} /></GlossCtx.Provider>}
            {route.view === "cards" && <FlashcardsView route={route} go={setRoute} record={record} />}
            {route.view === "stats" && <StatsView route={route} stats={stats} go={setRoute} comm={comm} />}
          </>
        )}
      </div>
    </div>
  );
}

function Header({ onHome, home, dark, onToggleTheme, gloss, onToggleGloss, user, onSignOut }) {
  return (
    <header style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: home ? 26 : 18 }}>
      <button onClick={onHome} className="ix-serif"
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 9, padding: 0 }}>
        <span style={{ width: 38, height: 38, borderRadius: 11, background: "var(--ink)", color: "var(--paper)", display: "grid", placeItems: "center" }}>
          <GraduationCap size={21} />
        </span>
        <span style={{ fontWeight: 900, fontSize: 23, letterSpacing: "-.02em" }}>
          indeks<span style={{ color: "var(--terra)" }}>.</span>
        </span>
      </button>
      {user
        ? <span className="ix-chip" style={{ marginLeft: "auto", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={user.email}>{user.email}</span>
        : <span className="ix-chip" style={{ marginLeft: "auto" }}>EF · UPEŠ</span>}
      {user && (
        <button onClick={onToggleGloss} aria-label="Slovarček" aria-pressed={gloss} title={gloss ? "Slovarček je vklopljen (klik za izklop)" : "Slovarček je izklopljen (klik za vklop)"}
          style={{ background: gloss ? "var(--ink)" : "var(--paper2)", border: "1px solid var(--line)", borderRadius: 10, width: 36, height: 36, cursor: "pointer", display: "grid", placeItems: "center", color: gloss ? "var(--paper)" : "var(--ink2)" }}>
          <BookOpen size={17} />
        </button>
      )}
      <button onClick={onToggleTheme} aria-label="Preklopi temo"
        style={{ background: "var(--paper2)", border: "1px solid var(--line)", borderRadius: 10, width: 36, height: 36, cursor: "pointer", display: "grid", placeItems: "center", color: "var(--ink)" }}>
        {dark ? <Sun size={17} /> : <Moon size={17} />}
      </button>
      {user && (
        <button onClick={onSignOut} aria-label="Odjava" title="Odjava"
          style={{ background: "var(--paper2)", border: "1px solid var(--line)", borderRadius: 10, width: 36, height: 36, cursor: "pointer", display: "grid", placeItems: "center", color: "var(--ink)" }}>
          <LogOut size={17} />
        </button>
      )}
    </header>
  );
}

function YearSwitch({ year, setYear }) {
  return (
    <div className="ix-seg" role="group" aria-label="Letnik">
      {YEARS.map((y) => (
        <button key={y} aria-pressed={y === year} onClick={() => setYear(y)}>{y}. letnik</button>
      ))}
    </div>
  );
}

function Home({ go, stats, year, setYear, comm }) {
  const agg = aggregate(stats, year);
  const sems = DATA.filter((s) => s.year === year);
  return (
    <div>
      <div className="ix-fade" style={{ marginBottom: 30 }}>
        <h1 className="ix-serif" style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.04, letterSpacing: "-.025em", margin: 0 }}>
          Izberi predmet,<br /><span style={{ color: "var(--terra)" }}>razdeljeno na kolokvije.</span>
        </h1>
        <p style={{ color: "var(--ink2)", marginTop: 12, fontSize: 15, maxWidth: 540 }}>
          Predmet → kolokvij → znotraj njega zapiski, kvizi in kartice, lepo ločeno.
        </p>
      </div>

      {YEARS.length > 1 && <div className="ix-fade" style={{ marginBottom: 22 }}><YearSwitch year={year} setYear={setYear} /></div>}

      <OverallBanner agg={agg} comm={comm} year={year} onOpen={() => go({ view: "allstats" })} />

      {sems.map((sem, si) => (
        <section key={sem.id} className="ix-fade" style={{ marginBottom: 34, animationDelay: `${si * 80}ms` }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14 }}>
            <h2 className="ix-serif" style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>{sem.name}</h2>
            <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
            <span className="ix-chip">{sem.subjects.length} predmetov</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 12 }}>
            {sem.subjects.map((subj) => {
              const total = subjQ(subj);
              const cards = subjCards(subj);
              const t = TIER[subj.tier];
              return (
                <button key={subj.id} className="ix-card" onClick={() => go({ view: "subject", sem: sem.id, subj: subj.id })}
                  style={{ textAlign: "left", padding: 16, cursor: "pointer", display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 8 }}>
                    <span className="ix-tier" style={{ background: t.bg, color: t.fg }}>{t.label}</span>
                    <BookOpen size={17} color="var(--ink2)" />
                  </div>
                  <div className="ix-serif" style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.2, minHeight: 41 }}>{subj.name}</div>
                  <div className="ix-chip" style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <Layers size={13} /> {subj.parts.length} delov
                    {total > 0 && <span style={{ color: "var(--terra)" }}>· {total} vprašanj</span>}
                    {cards > 0 && <span style={{ color: "var(--ink)" }}>· {cards} kartic</span>}
                    {subjHasNotes(subj) && <span style={{ color: "var(--teal)" }}>· zapiski</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

/* ---- PREDMET: seznam kolokvijev/izpita ---- */
function SubjectView({ route, stats, go }) {
  const sem = DATA.find((s) => s.id === route.sem);
  const subj = sem.subjects.find((s) => s.id === route.subj);
  const groups = [
    { type: "kolokvij", label: "Kolokviji", parts: subj.parts.filter((p) => p.type === "kolokvij") },
    { type: "izpit", label: "Izpit", parts: subj.parts.filter((p) => p.type === "izpit") },
  ];
  const hasStats = subj.parts.some((p) =>
    p.decks.some((d) => deckStats(stats, `${sem.id}/${subj.id}/${p.id}/${d.id}`)) ||
    (p.flashcards || []).some((d) => deckStats(stats, `${sem.id}/${subj.id}/${p.id}/${d.id}`)));

  return (
    <div className="ix-fade">
      <button onClick={() => go({ view: "home" })} className="ix-chip"
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: 0, marginBottom: 16 }}>
        <ChevronLeft size={15} /> Vsi predmeti
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span className="ix-tier" style={{ width: 40, height: 40, fontSize: 16, background: TIER[subj.tier].bg, color: TIER[subj.tier].fg }}>{subj.tier}</span>
        <div style={{ flex: 1 }}>
          <h1 className="ix-serif" style={{ fontSize: 26, fontWeight: 900, margin: 0, lineHeight: 1.08, letterSpacing: "-.02em" }}>{subj.name}</h1>
          <span className="ix-chip">{sem.year}. letnik · {sem.name}</span>
        </div>
      </div>

      <button className="ix-card" onClick={() => go({ view: "stats", sem: sem.id, subj: subj.id })}
        style={{ width: "100%", textAlign: "left", padding: "12px 15px", cursor: "pointer", display: "flex", alignItems: "center", gap: 11, marginBottom: 22, borderLeft: "3px solid var(--teal)" }}>
        <BarChart3 size={17} color="var(--teal)" />
        <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 14 }}>Statistika</div><div className="ix-chip" style={{ marginTop: 2 }}>{hasStats ? "Tvoj napredek" : "Še ni poskusov"}</div></div>
        <ChevronRight size={17} color="var(--ink2)" />
      </button>

      {groups.map((g) => g.parts.length > 0 && (
        <div key={g.type} style={{ marginBottom: 22 }}>
          <div className="ix-chip" style={{ color: "var(--terra)", marginBottom: 12 }}>{g.label}</div>
          <div style={{ display: "grid", gap: 10 }}>
            {g.parts.map((p) => {
              const nq = partQ(p), nc = partCards(p), empty = partEmpty(p);
              return (
                <button key={p.id} className="ix-card" disabled={empty}
                  onClick={() => !empty && go({ view: "part", sem: sem.id, subj: subj.id, part: p.id })}
                  style={{ textAlign: "left", padding: "16px 17px", cursor: empty ? "default" : "pointer", opacity: empty ? 0.55 : 1, display: "flex", alignItems: "center", gap: 13 }}>
                  <span style={{ width: 38, height: 38, borderRadius: 11, background: "var(--paper)", border: "1px solid var(--line)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    {empty ? <Lock size={17} color="var(--ink2)" /> : <Layers size={17} color="var(--terra)" />}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div className="ix-serif" style={{ fontWeight: 600, fontSize: 17 }}>{p.name}</div>
                    <div className="ix-chip" style={{ marginTop: 3, display: "flex", gap: 9, flexWrap: "wrap" }}>
                      {empty ? <span>Še ni vsebine</span> : (<>
                        {p.notes && <span style={{ color: "var(--teal)" }}>Zapiski</span>}
                        {p.decks.length > 0 && <span style={{ color: "var(--terra)" }}>{p.decks.length} kvizov · {nq} vpr.</span>}
                        {(p.flashcards || []).length > 0 && <span>{nc} kartic</span>}
                      </>)}
                    </div>
                  </div>
                  {!empty && <ChevronRight size={18} color="var(--ink2)" />}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- KOLOKVIJ: ločene sekcije Zapiski / Kvizi / Flashcardi ---- */
function PartView({ route, stats, go }) {
  const sem = DATA.find((s) => s.id === route.sem);
  const subj = sem.subjects.find((s) => s.id === route.subj);
  const part = subj.parts.find((p) => p.id === route.part);
  const cards = part.flashcards || [];
  const theoryDecks = part.decks.filter((d) => !d.calc);
  const calcDecks = part.decks.filter((d) => d.calc);
  const backToSubject = () => go({ view: "subject", sem: sem.id, subj: subj.id });

  return (
    <div className="ix-fade">
      <button onClick={backToSubject} className="ix-chip"
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: 0, marginBottom: 14 }}>
        <ChevronLeft size={15} /> {subj.name}
      </button>

      <div style={{ marginBottom: 22 }}>
        <span className="ix-chip">{subj.name}</span>
        <h1 className="ix-serif" style={{ fontSize: 27, fontWeight: 900, margin: "3px 0 0", letterSpacing: "-.02em" }}>{part.name}</h1>
      </div>

      {/* ZAPISKI */}
      <div style={{ marginBottom: 22 }}>
        <div className="ix-sec" style={{ color: "var(--terra)" }}><BookOpen size={14} /> Zapiski</div>
        {part.notes ? (
          <button className="ix-card" onClick={() => go({ view: "notes", sem: sem.id, subj: subj.id, part: part.id })}
            style={{ width: "100%", textAlign: "left", padding: "15px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 13, borderLeft: "3px solid var(--terra)" }}>
            <FileText size={17} color="var(--terra)" />
            <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 15 }}>Preberi zapiske</div><div className="ix-chip" style={{ marginTop: 2 }}>Teorija za ta kolokvij</div></div>
            <ChevronRight size={18} color="var(--ink2)" />
          </button>
        ) : <Empty text="Ni zapiskov za ta del" />}
      </div>

      {/* KVIZI (teorija) */}
      <div style={{ marginBottom: 22 }}>
        <div className="ix-sec" style={{ color: "var(--ink)" }}><FileText size={14} /> Kvizi (teorija)</div>
        {theoryDecks.length > 0 ? (
          <div style={{ display: "grid", gap: 9 }}>
            {theoryDecks.length >= 2 && (() => {
              const pool = theoryDecks.reduce((n, d) => n + d.questions.length, 0);
              const mixN = Math.min(20, pool);
              const ds = deckStats(stats, `${sem.id}/${subj.id}/${part.id}/__mix`);
              return (
                <button className="ix-card" onClick={() => go({ view: "quiz", sem: sem.id, subj: subj.id, part: part.id, deck: "__mix" })}
                  style={{ textAlign: "left", padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 13, borderLeft: "3px solid var(--terra)" }}>
                  <span style={{ width: 34, height: 34, borderRadius: 10, background: "var(--terra)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <Shuffle size={16} color="#fff" />
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>Mešani kviz</div>
                    <div className="ix-chip" style={{ marginTop: 2 }}>{mixN} naključnih iz {theoryDecks.length} kvizov · vsakič drugačen{ds && <span style={{ color: "var(--teal)" }}> · najboljši {ds.best}%</span>}</div>
                  </div>
                  <ChevronRight size={18} color="var(--ink2)" />
                </button>
              );
            })()}
            {theoryDecks.map((d) => {
              const ds = deckStats(stats, `${sem.id}/${subj.id}/${part.id}/${d.id}`);
              return (
                <button key={d.id} className="ix-card" onClick={() => go({ view: "quiz", sem: sem.id, subj: subj.id, part: part.id, deck: d.id })}
                  style={{ textAlign: "left", padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 13 }}>
                  <span style={{ width: 34, height: 34, borderRadius: 10, background: "var(--paper)", border: "1px solid var(--line)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <FileText size={16} color="var(--ink)" />
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{d.name}</div>
                    <div className="ix-chip" style={{ marginTop: 2 }}>{d.questions.length} vprašanj{ds && <span style={{ color: "var(--teal)" }}> · najboljši {ds.best}%</span>}</div>
                  </div>
                  <ChevronRight size={18} color="var(--ink2)" />
                </button>
              );
            })}
          </div>
        ) : <Empty text="Ni kvizov za ta del" />}
      </div>

      {/* RAČUNSKE NALOGE */}
      {calcDecks.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <div className="ix-sec" style={{ color: "var(--terra)" }}><Calculator size={14} /> Računske naloge</div>
          <div style={{ display: "grid", gap: 9 }}>
            {calcDecks.length >= 2 && (() => {
              const pool = calcDecks.reduce((n, d) => n + d.questions.length, 0);
              const mixN = Math.min(20, pool);
              const ds = deckStats(stats, `${sem.id}/${subj.id}/${part.id}/__mixcalc`);
              return (
                <button className="ix-card" onClick={() => go({ view: "quiz", sem: sem.id, subj: subj.id, part: part.id, deck: "__mixcalc" })}
                  style={{ textAlign: "left", padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 13, borderLeft: "3px solid var(--terra)" }}>
                  <span style={{ width: 34, height: 34, borderRadius: 10, background: "var(--terra)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <Shuffle size={16} color="#fff" />
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>Mešane računske naloge</div>
                    <div className="ix-chip" style={{ marginTop: 2 }}>{mixN} naključnih iz {calcDecks.length} sklopov · vsakič drugačen{ds && <span style={{ color: "var(--teal)" }}> · najboljši {ds.best}%</span>}</div>
                  </div>
                  <ChevronRight size={18} color="var(--ink2)" />
                </button>
              );
            })()}
            {calcDecks.map((d) => {
              const ds = deckStats(stats, `${sem.id}/${subj.id}/${part.id}/${d.id}`);
              return (
                <button key={d.id} className="ix-card" onClick={() => go({ view: "quiz", sem: sem.id, subj: subj.id, part: part.id, deck: d.id })}
                  style={{ textAlign: "left", padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 13 }}>
                  <span style={{ width: 34, height: 34, borderRadius: 10, background: "var(--paper)", border: "1px solid var(--line)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <Calculator size={16} color="var(--terra)" />
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{d.name}</div>
                    <div className="ix-chip" style={{ marginTop: 2 }}>{d.questions.length} nalog{ds && <span style={{ color: "var(--teal)" }}> · najboljši {ds.best}%</span>}</div>
                  </div>
                  <ChevronRight size={18} color="var(--ink2)" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* FLASHCARDI */}
      <div style={{ marginBottom: 8 }}>
        <div className="ix-sec" style={{ color: "var(--teal)" }}><Brain size={14} /> Flashcardi</div>
        {cards.length > 0 ? (
          <div style={{ display: "grid", gap: 9 }}>
            {cards.map((d) => {
              const ds = deckStats(stats, `${sem.id}/${subj.id}/${part.id}/${d.id}`);
              return (
                <button key={d.id} className="ix-card" onClick={() => go({ view: "cards", sem: sem.id, subj: subj.id, part: part.id, deck: d.id })}
                  style={{ textAlign: "left", padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 13 }}>
                  <span style={{ width: 34, height: 34, borderRadius: 10, background: "var(--paper)", border: "1px solid var(--line)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <Brain size={16} color="var(--teal)" />
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{d.name}</div>
                    <div className="ix-chip" style={{ marginTop: 2 }}>{d.cards.length} kartic{ds && <span style={{ color: "var(--teal)" }}> · nazadnje {ds.last}%</span>}</div>
                  </div>
                  <ChevronRight size={18} color="var(--ink2)" />
                </button>
              );
            })}
          </div>
        ) : <Empty text="Ni kartic za ta del" />}
      </div>
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="ix-card" style={{ padding: "12px 15px", opacity: 0.5, display: "flex", alignItems: "center", gap: 10 }}>
      <Lock size={14} color="var(--ink2)" /><span className="ix-chip">{text}</span>
    </div>
  );
}

function QuizView({ route, go, record }) {
  const glossOn = React.useContext(GlossCtx);
  const sem = DATA.find((s) => s.id === route.sem);
  const subj = sem.subjects.find((s) => s.id === route.subj);
  const part = subj.parts.find((p) => p.id === route.part);
  const calcMix = route.deck === "__mixcalc";
  const mixed = route.deck === "__mix" || calcMix;
  const mixDecks = calcMix ? part.decks.filter((d) => d.calc) : part.decks.filter((d) => !d.calc);
  const deck = mixed ? { id: route.deck, name: calcMix ? "Mešane računske naloge" : "Mešani kviz" } : part.decks.find((d) => d.id === route.deck);
  const pool = mixed ? mixDecks.flatMap((d) => d.questions) : deck.questions;
  const mixN = mixed ? Math.min(20, pool.length) : pool.length;
  const key = `${sem.id}/${subj.id}/${part.id}/${deck.id}`;
  const backToPart = () => go({ view: "part", sem: sem.id, subj: subj.id, part: part.id });

  function buildRun(doShuffle) {
    let base;
    if (mixed) { base = weightedSampleSmart(mixDecks, mixN); bumpMixUse(base); }
    else base = doShuffle ? shuffle(pool) : pool.slice();
    return base.map(processQuestion);
  }

  const [started, setStarted] = useState(false);
  const [shuffleQ, setShuffleQ] = useState(false);
  const [run, setRun] = useState([]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correctCount, setCorrect] = useState(0);
  const [wrong, setWrong] = useState([]);
  const [done, setDone] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [openGloss, setOpenGloss] = useState({});
  const [mSel, setMSel] = useState(null);
  const [mMap, setMMap] = useState({});
  const [gSel, setGSel] = useState(null);
  const [gMap, setGMap] = useState({});
  const saved = useRef(false);

  function reset() { setI(0); setPicked(null); setCorrect(0); setWrong([]); setDone(false); setMoreOpen(false); setOpenGloss({}); setMSel(null); setMMap({}); setGSel(null); setGMap({}); saved.current = false; }
  function begin(doShuffle) { setShuffleQ(doShuffle); setRun(buildRun(doShuffle)); reset(); setStarted(true); }
  function restart() { setRun(buildRun(shuffleQ)); reset(); }
  function beginFocus() { setRun(weakestSample(pool, Math.min(20, pool.length)).map(processQuestion)); reset(); }

  // UVODNI ZASLON — izbira vrstnega reda
  if (!started) {
    return (
      <div className="ix-fade">
        <button onClick={backToPart} className="ix-chip"
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: 0, marginBottom: 14 }}>
          <ChevronLeft size={15} /> {part.name}
        </button>
        <div className="ix-card" style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 6 }}>
            {mixed ? <Shuffle size={20} color="var(--terra)" /> : <FileText size={20} color="var(--ink)" />}
            <h2 className="ix-serif" style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>{deck.name}</h2>
          </div>
          {mixed ? (
            <>
              <p style={{ color: "var(--ink2)", fontSize: 14.5, margin: "0 0 18px" }}>
                {mixN} naključnih {calcMix ? "računskih nalog" : "vprašanj"} iz {mixDecks.length} {calcMix ? "sklopov" : "kvizov"} tega dela. Vsakič dobiš drugačen nabor, odgovori so premešani.
              </p>
              <button onClick={() => begin(true)} className="ix-btn" style={{ background: "var(--terra)", color: "#fff", border: "1px solid var(--terra)", padding: "13px 22px", display: "flex", alignItems: "center", gap: 8 }}>
                <Shuffle size={17} /> Začni mešani kviz
              </button>
            </>
          ) : (
            <>
              <p style={{ color: "var(--ink2)", fontSize: 14.5, margin: "0 0 6px" }}>{pool.length} vprašanj. Odgovori (A–D) so vsakič premešani.</p>
              <p style={{ color: "var(--ink2)", fontSize: 13, margin: "0 0 18px" }}>
                <b style={{ color: "var(--ink)" }}>Po vrsti</b> = po zaporedju zapiskov (priporočeno ob prvem ponavljanju z odprtimi zapiski). <b style={{ color: "var(--ink)" }}>Premešano</b> = naključni vrstni red (za kasneje, brez zapiskov).
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button onClick={() => begin(false)} className="ix-btn" style={{ background: "var(--ink)", color: "var(--paper)", border: "1px solid var(--ink)", padding: "13px 20px", display: "flex", alignItems: "center", gap: 8 }}>
                  <FileText size={16} /> Začni po vrsti
                </button>
                <button onClick={() => begin(true)} className="ix-btn" style={{ background: "transparent", color: "var(--ink)", border: "1px solid var(--ink)", padding: "13px 20px", display: "flex", alignItems: "center", gap: 8 }}>
                  <Shuffle size={16} /> Premešaj vprašanja
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  const questions = run;
  const q = questions[i];
  const answered = picked !== null;
  const stemLow = (q.q || "").toLowerCase();
  const restLow = ((q.options ? q.options.join(" ") : (q.pairs ? q.pairs.map((p) => p.term + " " + p.def).join(" ") : "")) + " " + (q.explanation || "") + " " + (q.more || "")).toLowerCase();
  const inTxt = (g, t) => (g.b ? new RegExp("\\b" + g.s + "\\b").test(t) : t.includes(g.s));
  const defQ = /\bkaj (pomeni|je|prikazuje|opisuje|označuje|razumemo)\b|\bkako (opredelimo|definiramo)\b|\bopredeli\b|definicij|\bkateri je\b[\s\S]*\bprimer\b|\bkatere vrste\b|\bkateri tip\b|\bza kaj se uporablja\b/.test(stemLow);
  const gloss = (!glossOn || q.type === "match" || q.type === "grid") ? [] : GLOSSARY.filter((g) => {
    if (g.subj && g.subj !== subj.id) return false;
    const inRest = inTxt(g, restLow), inStem = inTxt(g, stemLow);
    if (!inRest && !inStem) return false;
    if (defQ && inStem) return false; // skrij termin, po katerem je študent vprašan
    return true;
  });
  const wrongExpl = (!answered || picked === q.correct || !q.wrong) ? null : q.wrong[q.options[picked]];

  function choose(idx) {
    if (answered) return;
    setPicked(idx);
    const ok = idx === q.correct;
    recordQ(q, ok);
    if (ok) setCorrect((c) => c + 1);
    else setWrong((w) => [...w, { ...q, picked: idx }]);
  }
  function submitMatch() {
    if (answered) return;
    const allCorrect = q.pairs.every((_, t) => mMap[t] === t);
    setPicked(allCorrect ? 1 : 0);
    recordQ(q, allCorrect);
    if (allCorrect) setCorrect((c) => c + 1);
    else setWrong((w) => [...w, { ...q, mMap: { ...mMap } }]);
  }
  const poolVal = (pid) => { const p = (q._pool || []).find((x) => x.id === pid); return p ? p.val : null; };
  function placeGrid(key) {
    if (answered) return;
    setGMap((prev) => {
      const m = { ...prev };
      if (gSel != null) { for (const k in m) if (m[k] === gSel) delete m[k]; m[key] = gSel; }
      else if (m[key] != null) { delete m[key]; }
      return m;
    });
    if (gSel != null) setGSel(null);
  }
  function submitGrid() {
    if (answered) return;
    const ok = q._blanks.every((b) => gMap[b.key] != null && poolVal(gMap[b.key]) === b.val);
    setPicked(ok ? 1 : 0);
    recordQ(q, ok);
    if (ok) setCorrect((c) => c + 1);
    else setWrong((w) => [...w, { ...q, gMap: { ...gMap } }]);
  }
  function next() {
    if (i + 1 >= questions.length) {
      if (!saved.current) { saved.current = true; record(key, { pct: Math.round((correctCount / questions.length) * 100), correct: correctCount, total: questions.length }); }
      setDone(true);
    } else { setI(i + 1); setPicked(null); setMoreOpen(false); setOpenGloss({}); setMSel(null); setMMap({}); setGSel(null); setGMap({}); }
  }

  if (done) {
    const pct = Math.round((correctCount / questions.length) * 100);
    const good = pct >= 60;
    const mastery = mixed ? poolMastery(pool) : null;
    const mastered = mastery ? (mastery.everCorrect >= mastery.total) : false;
    return (
      <div className="ix-fade">
        <div className="ix-card" style={{ padding: 26, textAlign: "center", marginBottom: 18 }}>
          <Trophy size={34} color={good ? "var(--teal)" : "var(--terra)"} />
          <div className="ix-serif" style={{ fontSize: 46, fontWeight: 900, margin: "8px 0 2px" }}>{pct}%</div>
          <div className="ix-chip">{correctCount} / {questions.length} pravilnih · {deck.name}</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
            <button onClick={restart} className="ix-btn" style={{ background: "var(--ink)", color: "var(--paper)", border: "1px solid var(--ink)", padding: "11px 18px", display: "flex", alignItems: "center", gap: 7 }}>
              <RotateCcw size={16} /> Ponovi
            </button>
            <button onClick={backToPart} className="ix-btn" style={{ background: "transparent", color: "var(--ink)", border: "1px solid var(--ink)", padding: "11px 18px" }}>
              Nazaj na kolokvij
            </button>
          </div>
        </div>

        {mastery && mastery.total > 0 && (
          <div className="ix-card" style={{ padding: 18, marginBottom: 18, borderLeft: `3px solid ${mastered ? "var(--teal)" : "var(--terra)"}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, gap: 10 }}>
              <div className="ix-serif" style={{ fontWeight: 900, fontSize: 17 }}>{mastered ? "Bravo, obvladaš! 🎉" : "Napredek pri obvladovanju"}</div>
              <div className="ix-chip">osvojenih {mastery.mastered}/{mastery.total}</div>
            </div>
            <div style={{ height: 8, borderRadius: 6, background: "var(--paper2)", overflow: "hidden", marginBottom: 10 }}>
              <div style={{ height: "100%", width: `${Math.round(100 * mastery.mastered / mastery.total)}%`, background: "var(--teal)", transition: "width .4s" }} />
            </div>
            <div style={{ color: "var(--ink2)", fontSize: 13.5, lineHeight: 1.55, marginBottom: mastery.weak > 0 ? 12 : 0 }}>
              {mastered
                ? (mastery.weak > 0
                    ? `Vsako vprašanje tega dela si vsaj enkrat rešil pravilno — odlično. Še ${mastery.weak} jih ni povsem trdnih; če želiš, jih dorečeš spodaj.`
                    : "Vsa vprašanja tega dela so zanesljivo osvojena. Snov obvladaš. 💪")
                : `Cilj: vsako vprašanje vsaj enkrat pravilno. Najprej ponovi najšibkejša — ko jih osvojiš, izpadejo iz ponavljanja (${mastery.weak} še za vajo).`}
            </div>
            {mastery.weak > 0 && (
              <button onClick={beginFocus} className="ix-btn" style={{ background: "var(--terra)", color: "#fff", border: "1px solid var(--terra)", padding: "11px 18px", display: "flex", alignItems: "center", gap: 7 }}>
                <Brain size={16} /> Ponovi vprašanja, ki jih še ne znam ({Math.min(20, mastery.weak)})
              </button>
            )}
          </div>
        )}
        {wrong.length > 0 && (
          <div>
            <div className="ix-chip" style={{ color: "var(--red)", marginBottom: 10 }}>Pregled napak ({wrong.length})</div>
            <div style={{ display: "grid", gap: 10 }}>
              {wrong.map((w, k) => (
                <div key={k} className="ix-card" style={{ padding: 15 }}>
                  <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 15 }}>{w.q}</div>
                  {w.given && <div style={{ fontSize: 13, color: "var(--ink2)", marginBottom: 8, lineHeight: 1.5, overflowX: "auto" }} dangerouslySetInnerHTML={{ __html: w.given }} />}
                  {w.type === "match" ? (
                    <div style={{ display: "grid", gap: 4 }}>
                      {w.pairs.map((p, t) => (
                        <div key={t} style={{ fontSize: 13, color: w.mMap[t] === t ? "var(--teal)" : "var(--red)" }}>
                          {p.term} → {w.mMap[t] != null && w.pairs[w.mMap[t]] ? w.pairs[w.mMap[t]].def : "—"}{w.mMap[t] === t ? " ✓" : ` (pravilno: ${p.def})`}
                        </div>
                      ))}
                    </div>
                  ) : w.type === "grid" ? (
                    <div style={{ display: "grid", gap: 4 }}>
                      {w._blanks.map((b) => {
                        const pid = w.gMap[b.key]; const placed = pid != null ? ((w._pool.find((x) => x.id === pid) || {}).val) : "—";
                        const ok = placed === b.val; const rc = b.key.split("-").map(Number);
                        return (
                          <div key={b.key} style={{ fontSize: 13, color: ok ? "var(--teal)" : "var(--red)" }}>
                            {w.rows[rc[0]].label} · {w.cols[rc[1]]}: {placed}{ok ? " ✓" : ` (pravilno: ${b.val})`}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <>
                      <Row icon={<XCircle size={15} color="var(--red)" />} text={w.options[w.picked]} c="var(--red)" />
                      <Row icon={<CheckCircle2 size={15} color="var(--teal)" />} text={w.options[w.correct]} c="var(--teal)" />
                    </>
                  )}
                  {w.type !== "match" && w.wrong && w.wrong[w.options[w.picked]] && <div style={{ fontSize: 13, color: "var(--ink2)", marginTop: 6 }}><b style={{ color: "var(--ink)" }}>Zakaj ne ta:</b> {w.wrong[w.options[w.picked]]}</div>}
                  {w.explanation && <div style={{ fontSize: 13.5, color: "var(--ink2)", marginTop: 6, lineHeight: 1.5 }}>{w.htmlExpl ? <span dangerouslySetInnerHTML={{ __html: w.explanation }} /> : w.explanation}</div>}
                  {w.more && <div style={{ fontSize: 13, color: "var(--ink2)", marginTop: 6, paddingTop: 6, borderTop: "1px solid var(--line)", lineHeight: 1.5 }}>{w.htmlExpl ? <span dangerouslySetInnerHTML={{ __html: w.more }} /> : w.more}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="ix-fade">
      <button onClick={backToPart} className="ix-chip"
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: 0, marginBottom: 14 }}>
        <ChevronLeft size={15} /> {part.name}
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span className="ix-chip">{deck.name}</span>
        <span className="ix-chip">{i + 1} / {questions.length}</span>
      </div>
      <div className="ix-bar" style={{ marginBottom: 22 }}><span style={{ width: `${(i / questions.length) * 100}%` }} /></div>

      <h2 className="ix-serif" style={{ fontSize: 21, fontWeight: 600, lineHeight: 1.3, margin: "0 0 20px" }}>{q.q}</h2>

      {gloss.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, alignItems: "center" }}>
            <span className="ix-chip" style={{ marginRight: 2 }}>Slovarček:</span>
            {gloss.map((g, k) => (
              <button key={k} onClick={() => setOpenGloss((o) => ({ ...o, [g.t]: !o[g.t] }))}
                style={{ fontSize: 12.5, fontWeight: 600, padding: "4px 10px", borderRadius: 999, cursor: "pointer",
                  border: "1px solid var(--line)", background: openGloss[g.t] ? "var(--terra)" : "var(--paper2)",
                  color: openGloss[g.t] ? "#fff" : "var(--ink2)" }}>
                {g.t}
              </button>
            ))}
          </div>
          {gloss.filter((g) => openGloss[g.t]).map((g, k) => (
            <div key={k} className="ix-card" style={{ padding: "9px 12px", marginTop: 8, fontSize: 13, color: "var(--ink2)" }}>
              <b style={{ color: "var(--ink)" }}>{g.t}:</b> {g.d}
            </div>
          ))}
        </div>
      )}

      {q.hint && (
        <div className="ix-card" style={{ padding: "10px 13px", marginBottom: 16, fontSize: 13, lineHeight: 1.5, color: "var(--ink2)", borderLeft: "3px solid var(--teal)", background: "var(--paper2)" }}>
          <b style={{ color: "var(--ink)" }}>Namig:</b> <span dangerouslySetInnerHTML={{ __html: q.hint }} />
        </div>
      )}
      {q.given && (
        <div className="ix-card" style={{ padding: "13px 15px", marginBottom: 18, fontSize: 14, lineHeight: 1.5, overflowX: "auto" }} dangerouslySetInnerHTML={{ __html: q.given }} />
      )}

      {q.type === "match" ? (
        <div>
          <div style={{ fontSize: 13, color: "var(--ink2)", marginBottom: 12 }}>Klikni pojem, nato ustrezno definicijo. Ko povežeš vse, klikni „Preveri".</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ display: "grid", gap: 8 }}>
              {q.pairs.map((p, t) => {
                let st = { borderColor: mSel === t ? "var(--terra)" : "var(--line)" };
                if (answered) st = { borderColor: mMap[t] === t ? "var(--teal)" : "var(--red)", background: mMap[t] === t ? "var(--okbg)" : "var(--badbg)" };
                return (
                  <button key={t} className="ix-opt" disabled={answered} onClick={() => setMSel((s) => (s === t ? null : t))} style={{ ...st, textAlign: "left" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ flex: 1, fontWeight: 600, fontSize: 14 }}>{p.term}</span>
                      {mMap[t] != null && <span style={{ fontSize: 12, fontWeight: 800, color: answered ? (mMap[t] === t ? "var(--teal)" : "var(--red)") : "var(--terra)" }}>→ {q.defOrder.indexOf(mMap[t]) + 1}</span>}
                    </span>
                  </button>
                );
              })}
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {q.defOrder.map((origIdx, slot) => (
                <button key={slot} className="ix-opt" disabled={answered}
                  onClick={() => { if (mSel == null) return; setMMap((prev) => { const m = { ...prev }; for (const k in m) if (m[k] === origIdx) delete m[k]; m[mSel] = origIdx; return m; }); setMSel(null); }}
                  style={{ textAlign: "left" }}>
                  <span style={{ display: "flex", gap: 8 }}>
                    <span style={{ fontWeight: 800, color: "var(--ink2)", fontSize: 12 }}>{slot + 1}</span>
                    <span style={{ flex: 1, fontSize: 13 }}>{q.pairs[origIdx].def}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
          {!answered && (
            <button onClick={submitMatch} disabled={Object.keys(mMap).length < q.pairs.length} className="ix-btn"
              style={{ marginTop: 16, background: Object.keys(mMap).length < q.pairs.length ? "var(--line)" : "var(--terra)", color: "#fff", border: "none", padding: "12px 22px", cursor: Object.keys(mMap).length < q.pairs.length ? "default" : "pointer" }}>
              Preveri povezave ({Object.keys(mMap).length}/{q.pairs.length})
            </button>
          )}
          {answered && (
            <div className="ix-card" style={{ marginTop: 14, padding: "10px 13px", fontSize: 12.5, color: "var(--ink2)" }}>
              <b style={{ color: "var(--ink)" }}>Pravilno:</b> {q.pairs.map((p, t) => `${p.term} → ${q.defOrder.indexOf(t) + 1}`).join(" · ")}
            </div>
          )}
        </div>
      ) : q.type === "grid" ? (
        <div>
          <div style={{ fontSize: 13, color: "var(--ink2)", marginBottom: 12 }}>Klikni klasifikacijo spodaj, nato prazno celico, kamor sodi. (Klik na zapolnjeno celico jo izprazni.)</div>
          <div style={{ overflowX: "auto", marginBottom: 14 }}>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th style={GTH}></th>
                  {q.cols.map((c, ci) => <th key={ci} style={{ ...GTH, fontWeight: 700 }}>{c}</th>)}
                </tr>
              </thead>
              <tbody>
                {q.rows.map((row, r) => (
                  <tr key={r}>
                    <td style={{ ...GTH, textAlign: "left", whiteSpace: "nowrap" }}>{row.label}</td>
                    {row.cells.map((val, c) => {
                      const key = r + "-" + c;
                      if ((q.fixed || []).includes(key)) return <td key={c} style={{ ...GTD, color: "var(--ink2)" }}>{val}</td>;
                      const pid = gMap[key];
                      const placed = pid != null ? poolVal(pid) : null;
                      let cs = { ...GTD, cursor: answered ? "default" : "pointer" };
                      if (answered) { const ok = placed === val; cs = { ...cs, color: ok ? "var(--teal)" : "var(--red)", background: ok ? "var(--okbg)" : "var(--badbg)", fontWeight: 700 }; }
                      else if (placed != null) cs = { ...cs, fontWeight: 700, background: "var(--paper2)" };
                      return (
                        <td key={c} onClick={() => placeGrid(key)} style={cs}>
                          {placed != null ? placed : <span style={{ color: "var(--ink2)", opacity: 0.5, fontSize: 16 }}>＋</span>}
                          {answered && placed !== val && <div style={{ fontSize: 11, color: "var(--teal)", fontWeight: 600, marginTop: 2 }}>{val}</div>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!answered && (
            <>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                {q._pool.filter((p) => !Object.values(gMap).includes(p.id)).map((p) => (
                  <button key={p.id} onClick={() => setGSel((s) => (s === p.id ? null : p.id))}
                    style={{ padding: "8px 14px", borderRadius: 999, border: `1px solid ${gSel === p.id ? "var(--terra)" : "var(--line)"}`, background: gSel === p.id ? "var(--terra)" : "var(--paper)", color: gSel === p.id ? "#fff" : "var(--ink)", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
                    {p.val}
                  </button>
                ))}
              </div>
              <button onClick={submitGrid} disabled={Object.keys(gMap).length < q._blanks.length} className="ix-btn"
                style={{ background: Object.keys(gMap).length < q._blanks.length ? "var(--line)" : "var(--terra)", color: "#fff", border: "none", padding: "12px 22px", cursor: Object.keys(gMap).length < q._blanks.length ? "default" : "pointer" }}>
                Preveri ({Object.keys(gMap).length}/{q._blanks.length})
              </button>
            </>
          )}
        </div>
      ) : (
      <div style={{ display: "grid", gap: 10 }}>
        {q.options.map((opt, idx) => {
          let st = {};
          if (answered) {
            if (idx === q.correct) st = { borderColor: "var(--teal)", background: "var(--okbg)" };
            else if (idx === picked) st = { borderColor: "var(--red)", background: "var(--badbg)" };
            else st = { opacity: 0.6 };
          }
          return (
            <button key={idx} className="ix-opt" disabled={answered} onClick={() => choose(idx)} style={st}>
              <span style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <span style={{ fontWeight: 700, color: "var(--ink2)", fontSize: 13 }}>{"ABCDEF"[idx]}</span>
                <span style={{ flex: 1 }}>{opt}</span>
                {answered && idx === q.correct && <CheckCircle2 size={18} color="var(--teal)" />}
                {answered && idx === picked && idx !== q.correct && <XCircle size={18} color="var(--red)" />}
              </span>
            </button>
          );
        })}
      </div>
      )}

      {answered && (
        <div className="ix-fade" style={{ marginTop: 18 }}>
          {wrongExpl && (
            <div className="ix-card" style={{ padding: 14, fontSize: 13.5, color: "var(--ink2)", marginBottom: 14, borderLeft: "3px solid var(--red)" }}>
              <b style={{ color: "var(--ink)" }}>Zakaj ne ta odgovor:</b> {wrongExpl}
            </div>
          )}
          {q.explanation && (
            <div className="ix-card" style={{ padding: 14, fontSize: 14, color: "var(--ink2)", marginBottom: 14, lineHeight: 1.55 }}>
              {q.htmlExpl ? <span dangerouslySetInnerHTML={{ __html: q.explanation }} /> : q.explanation}
              {q.more && (
                <>
                  <button onClick={() => setMoreOpen((o) => !o)}
                    style={{ background: "none", border: "none", padding: 0, marginTop: 8, cursor: "pointer", color: "var(--terra)", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 5 }}>
                    {moreOpen ? "Skrij" : "Preberi več"} <ChevronDown size={14} style={{ transform: moreOpen ? "rotate(180deg)" : "none", transition: "transform .18s" }} />
                  </button>
                  {moreOpen && <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--line)", lineHeight: 1.55 }}>{q.htmlExpl ? <span dangerouslySetInnerHTML={{ __html: q.more }} /> : q.more}</div>}
                </>
              )}
            </div>
          )}
          <button onClick={next} className="ix-btn" style={{ background: "var(--terra)", color: "#fff", border: "1px solid var(--terra)", padding: "12px 22px", display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
            {i + 1 >= questions.length ? "Zaključi" : "Naprej"} <ChevronRight size={17} />
          </button>
        </div>
      )}
    </div>
  );
}

function FlashcardsView({ route, go, record }) {
  const sem = DATA.find((s) => s.id === route.sem);
  const subj = sem.subjects.find((s) => s.id === route.subj);
  const part = subj.parts.find((p) => p.id === route.part);
  const deck = (part.flashcards || []).find((d) => d.id === route.deck);
  const key = `${sem.id}/${subj.id}/${part.id}/${deck.id}`;
  const backToPart = () => go({ view: "part", sem: sem.id, subj: subj.id, part: part.id });

  const [seed, setSeed] = useState(0);
  const order = useMemo(() => shuffle(deck.cards), [deck, seed]);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [done, setDone] = useState(false);
  const saved = useRef(false);

  const card = order[i];

  function advance(wasKnown) {
    const nk = known + (wasKnown ? 1 : 0);
    if (wasKnown) setKnown(nk);
    if (i + 1 >= order.length) {
      if (!saved.current) { saved.current = true; record(key, { pct: Math.round((nk / order.length) * 100), correct: nk, total: order.length }); }
      setDone(true);
    } else { setI(i + 1); setFlipped(false); }
  }
  function restart() { saved.current = false; setSeed((s) => s + 1); setI(0); setFlipped(false); setKnown(0); setDone(false); }

  if (done) {
    const pct = Math.round((known / order.length) * 100);
    return (
      <div className="ix-fade">
        <div className="ix-card" style={{ padding: 26, textAlign: "center" }}>
          <Brain size={34} color="var(--teal)" />
          <div className="ix-serif" style={{ fontSize: 46, fontWeight: 900, margin: "8px 0 2px" }}>{pct}%</div>
          <div className="ix-chip">{known} / {order.length} znanih · {deck.name}</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
            <button onClick={restart} className="ix-btn" style={{ background: "var(--ink)", color: "var(--paper)", border: "1px solid var(--ink)", padding: "11px 18px", display: "flex", alignItems: "center", gap: 7 }}>
              <Shuffle size={16} /> Premešaj znova
            </button>
            <button onClick={backToPart} className="ix-btn" style={{ background: "transparent", color: "var(--ink)", border: "1px solid var(--ink)", padding: "11px 18px" }}>
              Nazaj na kolokvij
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ix-fade">
      <button onClick={backToPart} className="ix-chip"
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: 0, marginBottom: 14 }}>
        <ChevronLeft size={15} /> {part.name}
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span className="ix-chip">{deck.name}</span>
        <span className="ix-chip">{i + 1} / {order.length} · znanih {known}</span>
      </div>
      <div className="ix-bar" style={{ marginBottom: 18 }}><span style={{ width: `${(i / order.length) * 100}%` }} /></div>

      <div className="ix-flip" style={{ height: card.svg ? 380 : 280 }} onClick={() => setFlipped((f) => !f)}>
        <div className={"ix-flip-inner" + (flipped ? " flipped" : "")}>
          <div className="ix-face">
            <span className="ix-chip" style={{ marginBottom: 12 }}>Pojem</span>
            <div className="ix-serif" style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.25 }}>{card.front}</div>
            <span className="ix-chip" style={{ marginTop: 18, opacity: .7 }}>klikni za odgovor</span>
          </div>
          <div className="ix-face back">
            <span className="ix-chip" style={{ marginBottom: 12, color: "var(--teal)" }}>Odgovor</span>
            <div style={{ fontSize: card.svg ? 14.5 : 16.5, lineHeight: 1.5 }}>{card.back}</div>
            {card.svg && <div style={{ marginTop: 12, width: "100%", maxHeight: 150, display: "flex", justifyContent: "center" }} dangerouslySetInnerHTML={{ __html: card.svg }} />}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 18, justifyContent: "center", flexWrap: "wrap" }}>
        {!flipped ? (
          <button onClick={() => setFlipped(true)} className="ix-btn" style={{ background: "var(--ink)", color: "var(--paper)", border: "1px solid var(--ink)", padding: "12px 22px", display: "flex", alignItems: "center", gap: 8 }}>
            <RotateCcw size={16} /> Obrni
          </button>
        ) : (
          <>
            <button onClick={() => advance(false)} className="ix-btn" style={{ background: "transparent", color: "var(--red)", border: "1px solid var(--red)", padding: "12px 20px", display: "flex", alignItems: "center", gap: 7 }}>
              <X size={16} /> Še ne znam
            </button>
            <button onClick={() => advance(true)} className="ix-btn" style={{ background: "var(--teal)", color: "#fff", border: "1px solid var(--teal)", padding: "12px 20px", display: "flex", alignItems: "center", gap: 7 }}>
              <Check size={16} /> Znam
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function StatsView({ route, stats, go, comm }) {
  const sem = DATA.find((s) => s.id === route.sem);
  const subj = sem.subjects.find((s) => s.id === route.subj);

  const rows = [];
  subj.parts.forEach((p) => {
    p.decks.forEach((d) => { const ds = deckStats(stats, `${sem.id}/${subj.id}/${p.id}/${d.id}`); if (ds) rows.push({ part: p.name, name: d.name, kind: "Kviz", ds, c: commDeck(comm, `${sem.id}/${subj.id}/${p.id}/${d.id}`) }); });
    mixDecksOf(p).forEach((d) => { const ds = deckStats(stats, `${sem.id}/${subj.id}/${p.id}/${d.id}`); if (ds) rows.push({ part: p.name, name: d.name, kind: "Mešani", ds, c: commDeck(comm, `${sem.id}/${subj.id}/${p.id}/${d.id}`) }); });
    (p.flashcards || []).forEach((d) => { const ds = deckStats(stats, `${sem.id}/${subj.id}/${p.id}/${d.id}`); if (ds) rows.push({ part: p.name, name: d.name, kind: "Kartice", ds, c: commDeck(comm, `${sem.id}/${subj.id}/${p.id}/${d.id}`) }); });
  });
  const totalAttempts = rows.reduce((n, r) => n + r.ds.n, 0);
  const overallAvg = rows.length ? Math.round(rows.reduce((s, r) => s + r.ds.avg, 0) / rows.length) : 0;

  return (
    <div className="ix-fade">
      <button onClick={() => go({ view: "subject", sem: sem.id, subj: subj.id })} className="ix-chip"
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: 0, marginBottom: 16 }}>
        <ChevronLeft size={15} /> {subj.name}
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <BarChart3 size={22} color="var(--teal)" />
        <h1 className="ix-serif" style={{ fontSize: 26, fontWeight: 900, margin: 0, letterSpacing: "-.02em" }}>Statistika · {subj.name}</h1>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 22, flexWrap: "wrap" }}>
        <Stat big={totalAttempts} label="poskusov" />
        <Stat big={overallAvg + "%"} label="povprečje" />
        <Stat big={rows.length} label="kvizov/kompletov" />
      </div>

      {rows.length === 0 ? (
        <div className="ix-card" style={{ padding: 16 }}><span className="ix-chip">Še ni poskusov.</span></div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {rows.map((r, k) => (
            <div key={k} className="ix-card" style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{r.name}</div>
                  <div className="ix-chip" style={{ marginTop: 2 }}>{r.kind} · {r.part} · {r.ds.n}×</div>
                </div>
                <div className="ix-serif" style={{ fontSize: 26, fontWeight: 900, color: "var(--teal)" }}>{r.ds.best}%</div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
                <div className="ix-spark" style={{ flex: 1 }}>
                  {r.ds.recent.map((v, j) => (<i key={j} style={{ height: `${Math.max(8, v)}%`, opacity: 0.4 + 0.6 * (j + 1) / r.ds.recent.length }} title={v + "%"} />))}
                </div>
                <div className="ix-chip">povp. {r.ds.avg}% · zadnji {r.ds.last}%{r.c ? ` · vsi ${r.c.avg}% (${r.c.users})` : ""}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ big, label }) {
  return (
    <div className="ix-card" style={{ padding: "14px 18px", flex: "1 1 120px", textAlign: "center" }}>
      <div className="ix-serif" style={{ fontSize: 30, fontWeight: 900 }}>{big}</div>
      <div className="ix-chip" style={{ marginTop: 2 }}>{label}</div>
    </div>
  );
}

function OverallBanner({ agg, comm, year, onOpen }) {
  const has = agg.practiced > 0;
  const cAvg = commYearAvg(comm, year);
  return (
    <button className="ix-card ix-fade" onClick={onOpen}
      style={{ width: "100%", textAlign: "left", padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, marginBottom: 30, borderLeft: "3px solid var(--teal)", flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 13, flex: "1 1 220px" }}>
        <span style={{ width: 42, height: 42, borderRadius: 12, background: "var(--paper)", border: "1px solid var(--line)", display: "grid", placeItems: "center", flexShrink: 0 }}>
          <BarChart3 size={20} color="var(--teal)" />
        </span>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>Skupna statistika</div>
          <div className="ix-chip" style={{ marginTop: 2 }}>{has ? `${agg.totalAttempts} poskusov · ${agg.practiced} kompletov` : "Še ni poskusov — reši kviz ali kartice"}</div>
        </div>
      </div>
      {has ? (
        <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          <CatPill label="Kolokviji" v={agg.byCat.kolokvij} />
          <CatPill label="Izpiti" v={agg.byCat.izpit} />
          <CatPill label="Kartice" v={agg.byCat.kartice} />
          <div style={{ textAlign: "center" }}>
            <div className="ix-serif" style={{ fontSize: 32, fontWeight: 900, color: "var(--teal)" }}>{agg.overallAvg}%</div>
            <div className="ix-chip">povprečje</div>
          </div>
          {cAvg != null && (
            <div style={{ textAlign: "center" }}>
              <div className="ix-serif" style={{ fontSize: 32, fontWeight: 900, color: "var(--ink2)" }}>{cAvg}%</div>
              <div className="ix-chip">vsi</div>
            </div>
          )}
        </div>
      ) : <ChevronRight size={18} color="var(--ink2)" />}
    </button>
  );
}

function CatPill({ label, v }) {
  if (!v || v.n === 0) return null;
  return (
    <div style={{ textAlign: "center" }}>
      <div className="ix-serif" style={{ fontSize: 21, fontWeight: 900 }}>{v.avg}%</div>
      <div className="ix-chip">{label}</div>
    </div>
  );
}

function CommunityCard({ comm, year, mine, mineAll, practiced, myAttempts }) {
  if (!comm) return null;
  const cAvg = commYearAvg(comm, year);
  const avgs = Array.isArray(comm.user_avgs) ? comm.user_avgs : [];
  const below = practiced > 0 && avgs.length >= 3 ? Math.round(100 * avgs.filter((x) => x < mineAll).length / avgs.length) : null;
  const perUser = comm.active ? Math.round(comm.attempts / comm.active) : 0;
  const diff = cAvg != null && mine ? mine - cAvg : null;
  return (
    <div className="ix-card" style={{ padding: "16px 18px", marginBottom: 24, borderLeft: "3px solid var(--terra)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
        <Users size={18} color="var(--terra)" />
        <div style={{ fontWeight: 600, fontSize: 15 }}>Ti proti ostalim</div>
        <span className="ix-chip" style={{ marginLeft: "auto" }}>{comm.active} aktivnih od {comm.registered} registriranih</span>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Stat big={mine ? mine + "%" : "–"} label={`ti · ${year}. letnik`} />
        <Stat big={cAvg != null ? cAvg + "%" : "–"} label="povprečje vseh" />
        <Stat big={diff == null ? "–" : (diff > 0 ? "+" : "") + diff} label="razlika (o. t.)" />
      </div>
      <div className="ix-chip" style={{ marginTop: 12, lineHeight: 1.6 }}>
        {below != null && <>Skupno si boljši od {below} % uporabnikov. </>}
        Povprečen uporabnik: {perUser} poskusov{myAttempts ? `, ti: ${myAttempts}` : ""}. Povprečja so izračunana iz uspešnosti po kompletih, da množični reševalci ne prevladajo.
      </div>
    </div>
  );
}

function OverallStatsView({ stats, go, year, comm }) {
  const agg = aggregate(stats, year);
  const aggAll = aggregate(stats, 0);
  const [open, setOpen] = useState({});
  const toggle = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));

  const bySubj = {};
  agg.items.forEach((it) => {
    const s = bySubj[it.subjId] || (bySubj[it.subjId] = { name: it.subj, parts: {} });
    const pl = it.cat === "izpit" ? "Izpit" : (it.cat === "kartice" ? "Flashcardi" : "Kolokviji");
    (s.parts[pl] || (s.parts[pl] = [])).push(it);
  });
  const avgOf = (arr) => arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;

  return (
    <div className="ix-fade">
      <button onClick={() => go({ view: "home" })} className="ix-chip"
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: 0, marginBottom: 16 }}>
        <ChevronLeft size={15} /> Domov
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <BarChart3 size={22} color="var(--teal)" />
        <h1 className="ix-serif" style={{ fontSize: 26, fontWeight: 900, margin: 0, letterSpacing: "-.02em" }}>Skupna statistika · {year}. letnik</h1>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <Stat big={agg.overallAvg + "%"} label="povprečje vsega" />
        <Stat big={agg.totalAttempts} label="poskusov" />
        <Stat big={agg.practiced} label="kvizov/kompletov" />
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        <Stat big={agg.byCat.kolokvij.n ? agg.byCat.kolokvij.avg + "%" : "–"} label={`kolokviji (${agg.byCat.kolokvij.n})`} />
        <Stat big={agg.byCat.izpit.n ? agg.byCat.izpit.avg + "%" : "–"} label={`izpiti (${agg.byCat.izpit.n})`} />
        <Stat big={agg.byCat.kartice.n ? agg.byCat.kartice.avg + "%" : "–"} label={`kartice (${agg.byCat.kartice.n})`} />
      </div>

      <CommunityCard comm={comm} year={year} mine={agg.overallAvg} mineAll={aggAll.overallAvg} practiced={aggAll.practiced} myAttempts={aggAll.totalAttempts} />

      {agg.items.length === 0 ? (
        <div className="ix-card" style={{ padding: 16 }}><span className="ix-chip">Še ni poskusov. Reši kak kviz ali komplet kartic, pa se bo tukaj prikazal napredek.</span></div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {Object.keys(bySubj).map((sid) => {
            const s = bySubj[sid];
            const all = Object.values(s.parts).flat();
            const subjAvg = avgOf(all.map((i) => i.ds.avg));
            const isOpen = !!open[sid];
            return (
              <div key={sid} className="ix-card" style={{ padding: 0, overflow: "hidden" }}>
                <button onClick={() => toggle(sid)}
                  style={{ width: "100%", textAlign: "left", padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, background: "transparent", border: "none", color: "var(--ink)" }}>
                  <ChevronDown size={18} color="var(--ink2)" style={{ transform: isOpen ? "none" : "rotate(-90deg)", transition: "transform .18s" }} />
                  <div style={{ flex: 1 }}>
                    <div className="ix-serif" style={{ fontWeight: 600, fontSize: 17 }}>{s.name}</div>
                    <div className="ix-chip" style={{ marginTop: 2 }}>{all.length} kompletov · {all.reduce((n, i) => n + i.ds.n, 0)} poskusov</div>
                  </div>
                  <div className="ix-serif" style={{ fontSize: 24, fontWeight: 900, color: "var(--teal)" }}>{subjAvg}%</div>
                </button>

                {isOpen && (
                  <div style={{ padding: "0 14px 14px", display: "grid", gap: 12 }}>
                    {Object.keys(s.parts).map((pl) => (
                      <div key={pl}>
                        <div className="ix-chip" style={{ color: "var(--terra)", margin: "4px 0 8px" }}>{pl}</div>
                        <div style={{ display: "grid", gap: 8 }}>
                          {s.parts[pl].map((r, k) => (
                            <button key={k} onClick={() => go({ view: r.view, sem: r.semId, subj: r.subjId, part: r.partId, deck: r.deckId })}
                              style={{ textAlign: "left", padding: "11px 13px", cursor: "pointer", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 12, display: "flex", alignItems: "center", gap: 11, color: "var(--ink)" }}>
                              {r.view === "cards" ? <Brain size={15} color="var(--teal)" /> : (r.deckId && r.deckId.indexOf("__mix") === 0 ? <Shuffle size={15} color="var(--terra)" /> : <FileText size={15} color="var(--ink)" />)}
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                                <div className="ix-chip" style={{ marginTop: 2 }}>{r.part} · najboljši {r.ds.best}% · povp. {r.ds.avg}% · {r.ds.n}×{commDeck(comm, `${r.semId}/${r.subjId}/${r.partId}/${r.deckId}`) ? ` · vsi ${commDeck(comm, `${r.semId}/${r.subjId}/${r.partId}/${r.deckId}`).avg}%` : ""}</div>
                              </div>
                              <ChevronRight size={16} color="var(--ink2)" />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function NotesView({ route, go }) {
  const sem = DATA.find((s) => s.id === route.sem);
  const subj = sem.subjects.find((s) => s.id === route.subj);
  const part = subj.parts.find((p) => p.id === route.part);
  return (
    <div className="ix-fade">
      <button onClick={() => go({ view: "part", sem: sem.id, subj: subj.id, part: part.id })} className="ix-chip"
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: 0, marginBottom: 16 }}>
        <ChevronLeft size={15} /> {part.name}
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <BookOpen size={22} color="var(--terra)" />
        <h1 className="ix-serif" style={{ fontSize: 24, fontWeight: 900, margin: 0, letterSpacing: "-.02em" }}>Zapiski · {part.name}</h1>
      </div>
      <div className="ix-notes" dangerouslySetInnerHTML={{ __html: part.notes }} />
    </div>
  );
}

function Row({ icon, text, c }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: c, padding: "3px 0" }}>
      {icon}<span>{text}</span>
    </div>
  );
}
function shuffle(arr) {
  const a = [...arr];
  for (let k = a.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [a[k], a[j]] = [a[j], a[k]]; }
  return a;
}
const GTH = { border: "1px solid var(--line)", padding: "7px 10px", background: "var(--paper2)", textAlign: "center", fontWeight: 600, fontSize: 12.5 };
const GTD = { border: "1px solid var(--line)", padding: "7px 10px", textAlign: "center", minWidth: 70 };

function processQuestion(q) {
  if (q.type === "match") {
    let ord = shuffle(q.pairs.map((_, i) => i));
    if (q.pairs.length > 1 && ord.every((o, s) => o === s)) ord = ord.reverse();
    return { ...q, defOrder: ord };
  }
  if (q.type === "grid") {
    const fixed = new Set(q.fixed || []);
    const blanks = [];
    q.rows.forEach((row, r) => row.cells.forEach((val, c) => { const key = r + "-" + c; if (!fixed.has(key)) blanks.push({ key, val }); }));
    const _pool = shuffle(blanks.map((b, idx) => ({ id: idx, val: b.val })));
    return { ...q, _blanks: blanks, _pool };
  }
  // možnosti, ki se sklicujejo na druge možnosti (A in B, nič od naštetega, ...), obdržijo vrstni red
  const refsOptions = q.fixedOrder || q.options.some((o) => /(\bvse\s+(od\s+)?(zgoraj|naštet\w*)|\bnič\s+od\s+naštet\w*|\b(nobeden|nobena|nobeno)\s+od\s+naštet\w*|\bvsi\s+našteti|\b[A-D]\s+in\s+[A-D]\b|\b[A-D]\s*,\s*[A-D]\b|odgovor\w*\s+[A-D]\b)/i.test(o));
  if (refsOptions) return { ...q };
  const order = shuffle(q.options.map((_, idx) => idx));
  return { ...q, options: order.map((idx) => q.options[idx]), correct: order.indexOf(q.correct) };
}
