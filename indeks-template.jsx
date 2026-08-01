import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  GraduationCap, BookOpen, ChevronLeft, ChevronRight, FileText,
  CheckCircle2, XCircle, RotateCcw, Trophy, Layers, Lock,
  BarChart3, Brain, Shuffle, Check, X, Moon, Sun, ChevronDown, Calculator, LogOut
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

/* =========================================================================
   semester -> predmet -> parts (kolokviji + izpit)
   part: { id, name, type, notes?, decks:[{id,name,questions}], flashcards:[{id,name,cards}] }
   Vprašanje: { q, options:[...], correct:<index>, explanation }
   Kartica:   { front, back }
   ========================================================================= */
const DATA = __DATA_JSON__;

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

/* Odobritev računa: skrbnik v Supabase označi profiles.approved = true. */
function useProfile(userId) {
  const [approved, setApproved] = useState(false);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    if (!userId) { setApproved(false); setLoading(false); return; }
    setLoading(true);
    const { data } = await supabase.from("profiles").select("approved").eq("id", userId).maybeSingle();
    setApproved(!!(data && data.approved));
    setLoading(false);
  }, [userId]);
  useEffect(() => { refresh(); }, [refresh]);
  return { approved, profileLoading: loading, refreshProfile: refresh };
}

/* Statistika: lokalni cache (po uporabniku) + sinhronizacija v oblak (debounce). */
function useCloudStats(userId) {
  const [stats, setStats] = useState({});
  const timer = useRef(null);
  const localKey = userId ? "indeks.stats." + userId : STATS_KEY;
  useEffect(() => {
    const cached = store.get(localKey, {});
    setStats(cached);
    if (!userId) return;
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("user_stats").select("stats").eq("user_id", userId).maybeSingle();
      if (cancelled || error) return;
      const cloud = (data && data.stats) || null;
      if (cloud && Object.keys(cloud).length) {
        setStats(cloud);
        store.set(localKey, cloud);
      } else if (cached && Object.keys(cached).length) {
        // prvič: obstoječi lokalni napredek prenesi v oblak
        supabase.from("user_stats").upsert({ user_id: userId, stats: cached, updated_at: new Date().toISOString() });
      }
    })();
    return () => { cancelled = true; };
  }, [userId, localKey]);

  const record = useCallback((key, res) => {
    setStats((prev) => {
      const cur = prev[key] || { attempts: [] };
      const next = { ...prev, [key]: { attempts: [...cur.attempts, { t: Date.now(), ...res }] } };
      store.set(localKey, next);
      if (userId) {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          supabase.from("user_stats").upsert({ user_id: userId, stats: next, updated_at: new Date().toISOString() });
        }, 1000);
      }
      return next;
    });
  }, [userId, localKey]);

  return { stats, record };
}

function mapAuthErr(error) {
  const m = (error.message || "").toLowerCase();
  if (m.includes("already registered") || m.includes("already exists") || m.includes("user already"))
    return "Ta e-naslov je že registriran. Prijavi se.";
  if (m.includes("invalid") || m.includes("credentials"))
    return "Napačen e-naslov ali geslo.";
  if (m.includes("not confirmed") || m.includes("confirm"))
    return "Račun še ni potrjen. Obrni se na skrbnika.";
  if (m.includes("weak") || m.includes("at least") || m.includes("password"))
    return "Geslo je prešibko (vsaj 6 znakov).";
  if (m.includes("signups") || m.includes("not allowed") || m.includes("disabled"))
    return "Registracija je trenutno zaprta. Obrni se na skrbnika.";
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
      const { data, error } = await supabase.auth.signUp({ email: addr, password });
      setBusy(false);
      if (error) { setErr(mapAuthErr(error)); return; }
      if (!data.session) {
        // če je potrditev e-pošte vklopljena: ni takojšnje seje
        setInfo("Registracija oddana. Ko jo skrbnik odobri, se lahko prijaviš.");
        setMode("in"); setPassword("");
        return;
      }
      // seja obstaja -> App pokaže zaslon "čaka na odobritev"
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
              ? "Ustvari račun s svojim e-naslovom in geslom. Skrbnik ga nato odobri."
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

function Pending({ email, onRefresh, onSignOut, busy }) {
  return (
    <div style={{ maxWidth: 380, margin: "6vh auto 0" }}>
      <div className="ix-card" style={{ padding: 24, textAlign: "center" }}>
        <div style={{ width: 46, height: 46, borderRadius: 13, background: "var(--paper)", display: "grid", placeItems: "center", margin: "0 auto 14px", color: "var(--terra)" }}>
          <Lock size={22} />
        </div>
        <div className="ix-serif" style={{ fontWeight: 800, fontSize: 20, marginBottom: 6 }}>Čaka na odobritev</div>
        <div style={{ color: "var(--ink2)", fontSize: 14, lineHeight: 1.5 }}>
          Tvoj račun (<b>{email}</b>) je ustvarjen in čaka, da ga skrbnik odobri. Ko te odobri, klikni Preveri znova.
        </div>
        <button onClick={onRefresh} disabled={busy}
          style={{ width: "100%", marginTop: 16, padding: "11px 13px", borderRadius: 10, border: "none", background: "var(--ink)", color: "var(--paper)", fontSize: 15, fontWeight: 700, cursor: busy ? "default" : "pointer", opacity: busy ? 0.6 : 1 }}>
          {busy ? "Preverjam…" : "Preveri znova"}
        </button>
        <button onClick={onSignOut} className="ix-chip" style={{ marginTop: 12, cursor: "pointer", border: "none" }}>Odjava</button>
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
.ix-root{font-family:'Spline Sans',system-ui,sans-serif;color:var(--ink);background:
  radial-gradient(120% 80% at 100% 0%, #f7f1e6 0%, transparent 55%),
  radial-gradient(120% 90% at 0% 100%, #ece2cf 0%, transparent 50%), var(--paper);
  transition:background .5s ease, color .5s ease;}
.ix-dark.ix-root{background:
  radial-gradient(120% 80% at 100% 0%, #2a241d 0%, transparent 55%),
  radial-gradient(120% 90% at 0% 100%, #15120f 0%, transparent 50%), var(--paper);}
.ix-serif{font-family:'Fraunces',Georgia,serif;}
.ix-fade{opacity:0;transform:translateY(10px);animation:ixIn .5s cubic-bezier(.2,.7,.2,1) forwards;}
@keyframes ixIn{to{opacity:1;transform:none;}}
.ix-card{background:var(--paper2);border:1px solid var(--line);border-radius:16px;
  transition:transform .18s ease, box-shadow .18s ease, border-color .5s ease, background-color .5s ease, color .5s ease;}
.ix-card:hover{transform:translateY(-3px);box-shadow:0 14px 30px -18px rgba(25,23,18,.45);border-color:var(--terra);}
.ix-tier{font-family:'Fraunces',serif;font-weight:900;font-size:13px;line-height:1;
  width:30px;height:30px;display:grid;place-items:center;border-radius:9px;}
.ix-chip{font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;color:var(--ink2);}
.ix-opt{text-align:left;width:100%;background:var(--paper2);border:1.5px solid var(--line);
  border-radius:13px;padding:14px 16px;cursor:pointer;transition:all .14s;font-size:15px;}
.ix-opt:hover:not(:disabled){border-color:var(--ink);transform:translateX(3px);}
.ix-opt:disabled{cursor:default;}
.ix-bar{height:6px;background:var(--line);border-radius:99px;overflow:hidden;}
.ix-bar>span{display:block;height:100%;background:var(--terra);transition:width .4s ease;}
.ix-btn{font-weight:600;border-radius:12px;cursor:pointer;}
.ix-sec{font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;display:flex;align-items:center;gap:7px;margin-bottom:11px;}
.ix-notes{font-size:15px;line-height:1.62;color:var(--ink);}
.ix-notes h2{font-family:'Fraunces',serif;font-size:21px;font-weight:900;margin:28px 0 12px;color:var(--terra);letter-spacing:-.01em;}
.ix-notes h2:first-child{margin-top:0;}
.ix-notes h3{font-family:'Fraunces',serif;font-size:17px;font-weight:600;margin:0 0 8px;}
.ix-notes .note-card{background:var(--paper2);border:1px solid var(--line);border-left:3px solid var(--terra);border-radius:12px;padding:14px 16px;margin:12px 0;}
.ix-notes ul{margin:6px 0;padding-left:20px;}
.ix-notes li{margin:5px 0;}
.ix-notes p{margin:8px 0;color:var(--ink2);}
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
];

function mixDecksOf(p) {
  const out = [];
  if (p.decks.filter((d) => !d.calc).length >= 2) out.push({ id: "__mix", name: "Mešani kviz" });
  if (p.decks.filter((d) => d.calc).length >= 2) out.push({ id: "__mixcalc", name: "Mešane računske naloge" });
  return out;
}

function aggregate(stats) {
  const items = [];
  DATA.forEach((sem) => sem.subjects.forEach((su) => su.parts.forEach((p) => {
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

export default function App() {
  const [route, setRoute] = useState({ view: "home" });
  const [dark, setDark] = useState(() => store.get("indeks.theme", "light") === "dark");
  const toggleTheme = () => setDark((d) => { const nd = !d; store.set("indeks.theme", nd ? "dark" : "light"); return nd; });

  const { session, loading: authLoading, signOut } = useAuth();
  const userId = session && session.user && session.user.id;
  const { approved, profileLoading, refreshProfile } = useProfile(userId);
  const { stats, record } = useCloudStats(approved ? userId : null);

  // ob odjavi ali menjavi računa nazaj na domačo stran
  useEffect(() => { setRoute({ view: "home" }); }, [userId]);

  return (
    <div className={"ix-root" + (dark ? " ix-dark" : "")} style={{ minHeight: "100vh" }}>
      <style>{CSS}</style>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "28px 18px 60px" }}>
        <Header onHome={() => setRoute({ view: "home" })} home={route.view === "home"} dark={dark} onToggleTheme={toggleTheme}
          user={approved ? session && session.user : null} onSignOut={signOut} />
        {authLoading ? (
          <div style={{ textAlign: "center", color: "var(--ink2)", padding: "18vh 0", fontSize: 15 }}>Nalagam…</div>
        ) : !session ? (
          <Login />
        ) : profileLoading ? (
          <div style={{ textAlign: "center", color: "var(--ink2)", padding: "18vh 0", fontSize: 15 }}>Nalagam…</div>
        ) : !approved ? (
          <Pending email={session.user.email} onRefresh={refreshProfile} onSignOut={signOut} busy={profileLoading} />
        ) : (
          <>
            {route.view === "home" && <Home go={setRoute} stats={stats} />}
            {route.view === "allstats" && <OverallStatsView stats={stats} go={setRoute} />}
            {route.view === "subject" && <SubjectView route={route} stats={stats} go={setRoute} />}
            {route.view === "part" && <PartView route={route} stats={stats} go={setRoute} />}
            {route.view === "notes" && <NotesView route={route} go={setRoute} />}
            {route.view === "quiz" && <QuizView route={route} go={setRoute} record={record} />}
            {route.view === "cards" && <FlashcardsView route={route} go={setRoute} record={record} />}
            {route.view === "stats" && <StatsView route={route} stats={stats} go={setRoute} />}
          </>
        )}
      </div>
    </div>
  );
}

function Header({ onHome, home, dark, onToggleTheme, user, onSignOut }) {
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
        : <span className="ix-chip" style={{ marginLeft: "auto" }}>1. letnik · EF · UPEŠ</span>}
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

function Home({ go, stats }) {
  const agg = aggregate(stats);
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

      <OverallBanner agg={agg} onOpen={() => go({ view: "allstats" })} />

      {DATA.map((sem, si) => (
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
          <span className="ix-chip">{sem.name}</span>
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
  const gloss = (q.type === "match" || q.type === "grid") ? [] : GLOSSARY.filter((g) => {
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

function StatsView({ route, stats, go }) {
  const sem = DATA.find((s) => s.id === route.sem);
  const subj = sem.subjects.find((s) => s.id === route.subj);

  const rows = [];
  subj.parts.forEach((p) => {
    p.decks.forEach((d) => { const ds = deckStats(stats, `${sem.id}/${subj.id}/${p.id}/${d.id}`); if (ds) rows.push({ part: p.name, name: d.name, kind: "Kviz", ds }); });
    mixDecksOf(p).forEach((d) => { const ds = deckStats(stats, `${sem.id}/${subj.id}/${p.id}/${d.id}`); if (ds) rows.push({ part: p.name, name: d.name, kind: "Mešani", ds }); });
    (p.flashcards || []).forEach((d) => { const ds = deckStats(stats, `${sem.id}/${subj.id}/${p.id}/${d.id}`); if (ds) rows.push({ part: p.name, name: d.name, kind: "Kartice", ds }); });
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
                <div className="ix-chip">povp. {r.ds.avg}% · zadnji {r.ds.last}%</div>
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

function OverallBanner({ agg, onOpen }) {
  const has = agg.practiced > 0;
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

function OverallStatsView({ stats, go }) {
  const agg = aggregate(stats);
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
        <h1 className="ix-serif" style={{ fontSize: 26, fontWeight: 900, margin: 0, letterSpacing: "-.02em" }}>Skupna statistika</h1>
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
                                <div className="ix-chip" style={{ marginTop: 2 }}>{r.part} · najboljši {r.ds.best}% · povp. {r.ds.avg}% · {r.ds.n}×</div>
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
  const order = shuffle(q.options.map((_, idx) => idx));
  return { ...q, options: order.map((idx) => q.options[idx]), correct: order.indexOf(q.correct) };
}
