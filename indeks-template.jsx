import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  GraduationCap, BookOpen, ChevronLeft, ChevronRight, FileText,
  CheckCircle2, XCircle, RotateCcw, Trophy, Layers, Lock,
  BarChart3, Brain, Shuffle, Check, X, Moon, Sun, ChevronDown, Calculator, LogOut, Users, Sigma, Search,
  Swords, UserPlus, Pencil, UserRound, Crown, Clock, Zap
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { createPortal } from "react-dom";

/* =========================================================================
   semester {id, year, name, subjects} -> predmet -> parts (kolokviji + izpit)
   part: { id, name, type, notes?, decks:[{id,name,questions}], flashcards:[{id,name,cards}] }
   Vprašanje: { q, options:[...], correct:<index>, explanation }
   Kartica:   { front, back }
   ========================================================================= */
const DATA = __DATA_JSON__;
const FORMULAS = __FORMULAS_JSON__;
const CHARS = __CHARACTERS_JSON__;        // liki in loadouti za bitko (characters.js)

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
const RESUME_KEY = "indeks.resume.v1";   // nedokončani kvizi (vrstni red vprašanj, odgovori) po kompletu
const RANKED_N = 10;                     // ranked: število vprašanj
const RANKED_SECONDS = 600;              // ranked: časovna omejitev (10 min)
const RANKED_MIN_RUNS = 5;               // ranked: najmanj rešenih za uvrstitev na lestvico
const RANKED_FORMULAS = ["stat", "stana"];  // ranked: brez slovarčka in formul, razen formul pri statistiki (statistični priročnik je dovoljen na izpitu)
/* Fraunces nariše makron (ȳ, x̄) zamaknjen v desno čez oklepaj; v serifnih naslovih ga zamenjamo s kombinirano nadčrto U+0305, ki jo pisava postavi pravilno. */
const serifBars = (s) => (typeof s === "string" ? s.replace(/ȳ/g, "y\u0305").replace(/Ȳ/g, "Y\u0305").replace(/\u0304/g, "\u0305").replace(/ŷ/g, "y\u0302").replace(/Ŷ/g, "Y\u0302") : s);
/* Ranked točke in rank (ista formula je v bazi: supabase/ranked-tocke.sql, funkciji ranked_points in ranked_delta).
   Točke na vprašanje: pravilen odgovor 100 + do 50 za hitrost (linearno v okviru RANKED_Q_SECONDS), napačen 0.
   Sprememba ranka na test: 20 · (pravilni − polovica) + bonus/10; rank dela = vsota (ne pod 0), nazivi po pragih. */
const RANKED_Q_SECONDS = 60;
const RANKED_RANKS = [["Bruc", 0], ["Študent", 300], ["Absolvent", 700], ["Diplomant", 1200], ["Magister", 1800], ["Doktor", 2600], ["Profesor", 3500], ["Dekan", 4500]];   // nazivi po ranku dela: odličen test (10/10 v 5 min) = +125, največ +150; 5 odličnih = Študent, Dekan ~35 odličnih
const rankedQPoints = (ok, sec) => (ok ? 100 + Math.round(50 * Math.max(0, 1 - sec / RANKED_Q_SECONDS)) : 0);
const rankedEstPoints = (r) => (r.points != null ? r.points : r.correct * 100 + Math.round(r.correct * 50 * Math.max(0, 1 - r.seconds / (RANKED_Q_SECONDS * r.total))));
const rankedDelta = (correct, total, points) => Math.round(20 * (correct - total / 2)) + Math.floor((points - 100 * correct) / 10);
const rankName = (rating) => { let n = RANKED_RANKS[0][0]; for (const [name, min] of RANKED_RANKS) if (rating >= min) n = name; return n; };
const rankNext = (rating) => RANKED_RANKS.find(([, min]) => min > rating) || null;
/* Ranked: izbira je enakomerno naključna in NE upošteva znanja (kot na izpitu). Edina utež: vprašanja iz zadnjih
   RANKED_RECENT ranked testov tega dela (shranjeno v brskalniku) imajo manjšo možnost ponovitve. */
const RANKED_RECENT = 3;
const RANKED_SEEN_KEY = "indeks.rankedseen.v1";
function rankedSample(pool, n, partKey) {
  const seen = new Set((store.get(RANKED_SEEN_KEY, {})[partKey]) || []);
  const items = pool.map((q) => ({ q, w: seen.has(qid(q)) ? 0.3 : 1 }));
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
  const all = store.get(RANKED_SEEN_KEY, {});
  all[partKey] = out.map(qid).concat(all[partKey] || []).slice(0, n * RANKED_RECENT);
  store.set(RANKED_SEEN_KEY, all);
  return out;
}
const rankedPool = (part) => part.decks.flatMap((d) => d.questions).filter((q) => q.options && q.options.length >= 2);
/* Nedokončan kviz: shranimo celoten potek (največ 12 kompletov, največ 14 dni). */
function loadResume() { return store.get(RESUME_KEY, {}); }
function saveResume(key, state) {
  const all = loadResume(); const now = Date.now();
  Object.keys(all).forEach((k) => { if (now - (all[k].u || 0) > 14 * 86400000) delete all[k]; });
  if (state) all[key] = { ...state, u: now }; else delete all[key];
  const keys = Object.keys(all).sort((a, b) => (all[b].u || 0) - (all[a].u || 0)).slice(0, 12);
  const out = {}; keys.forEach((k) => { out[k] = all[k]; });
  store.set(RESUME_KEY, out);
}
const fmtTime = (sec) => { sec = Math.max(0, sec | 0); return Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0"); };

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

/* JSON z urejenimi ključi: Supabase (jsonb) vrne ključe v drugem vrstnem redu kot lokalni zapis,
   zato navaden JSON.stringify istega poskusa ne prepozna kot dvojnika. */
function canon(v) {
  if (Array.isArray(v)) return "[" + v.map(canon).join(",") + "]";
  if (v && typeof v === "object") return "{" + Object.keys(v).sort().map((k) => JSON.stringify(k) + ":" + canon(v[k])).join(",") + "}";
  return JSON.stringify(v);
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
    const byT = new Map(); // sprotno zapisani poskusi: isti t = isti poskus, obvelja bolj napredovan
    [...aa, ...bb].forEach((at) => {
      if (at && at.t != null && at.answered != null) {
        const ex = byT.get(at.t);
        if (!ex) { byT.set(at.t, at); attempts.push(at); return; }
        const newer = (at.answered || 0) > (ex.answered || 0) || ((at.answered || 0) === (ex.answered || 0) && (at.u || 0) > (ex.u || 0));
        if (newer) { attempts[attempts.indexOf(ex)] = at; byT.set(at.t, at); }
        return;
      }
      const id = canon(at);
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
      if (canon(merged) !== canon(cloud)) {
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
    const at = { t: Date.now(), ...res };
    const idx = res.t != null ? cur.attempts.findIndex((x) => x.t === res.t) : -1;
    const list = idx >= 0 ? cur.attempts.map((x, k) => (k === idx ? at : x)) : [...cur.attempts, at];
    const next = { ...prev, [key]: { attempts: list } };
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

/* Nova različica: GitHub Pages drži index.html do 10 min v predpomnilniku, zato uporabnik lahko ure dolgo
   uporablja star bundle. Ob fokusu in vsakih 15 min preverimo v=hash v svežem index.html in ponudimo osvežitev. */
function useUpdateCheck() {
  const [newer, setNewer] = useState(false);
  useEffect(() => {
    const sc = document.querySelector('script[src*="preview.js"]');
    const m0 = sc && /v=([a-z0-9]+)/.exec(sc.getAttribute("src") || "");
    const cur = m0 ? m0[1] : null;
    if (!cur) return;
    let stop = false;
    const check = async () => {
      try {
        const r = await fetch(window.location.pathname + "?_=" + Date.now(), { cache: "no-store" });
        const t = await r.text();
        const m = /preview\.js\?v=([a-z0-9]+)/.exec(t);
        if (!stop && m && m[1] !== cur) setNewer(true);
      } catch (e) {}
    };
    const onVis = () => { if (document.visibilityState === "visible") check(); };
    const t0 = setTimeout(check, 4000);
    const id = setInterval(check, 15 * 60 * 1000);
    document.addEventListener("visibilitychange", onVis);
    return () => { stop = true; clearTimeout(t0); clearInterval(id); document.removeEventListener("visibilitychange", onVis); };
  }, []);
  return newer;
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

/* Uporabniško ime: 3-20 znakov (črke, številke . _ -), brez neprimernih besed (po normalizaciji: šumniki -> ascii,
   0->o 1->i 3->e 4->a 5->s 7->t). Enako pravilo preverja tudi funkcija set_username v bazi. */
const BANNED_NAMES = ["kurac", "kurc", "kurb", "kurv", "pizd", "pick", "jeb", "fuk", "fuck", "drka", "peder", "pedr", "cigan", "cefur",
  "prasic", "prasec", "sranje", "hitler", "nacist", "nazi", "penis", "vagin", "klitor", "seks", "sex", "porn",
  "nigg", "negr", "shit", "bitch", "cunt", "dick", "cock", "pussy", "whore", "slut", "rape"];
function normName(x) {
  return (x || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d")
    .replace(/0/g, "o").replace(/1/g, "i").replace(/3/g, "e").replace(/4/g, "a").replace(/5/g, "s").replace(/7/g, "t").replace(/8/g, "b").replace(/[^a-z]/g, "");
}
function checkUsername(u) {
  const v = (u || "").trim();
  if (v.length < 3 || v.length > 20) return "Uporabniško ime naj ima 3–20 znakov.";
  if (!/^[A-Za-z0-9_.-]+$/.test(v)) return "Dovoljene so le črke, številke, pika, podčrtaj in pomišljaj.";
  if (!/[A-Za-z]/.test(v)) return "Uporabniško ime naj vsebuje vsaj eno črko.";
  const n = normName(v);
  if (BANNED_NAMES.some((b) => n.includes(normName(b)))) return "To uporabniško ime ni dovoljeno.";
  return null;
}
const displayName = (user) => (user && user.user_metadata && user.user_metadata.username) || (user && user.email) || "";
/* Shrani uporabniško ime: v profil (RPC set_username preveri obliko, filter in unikatnost) in v metapodatke računa (za prikaz). */
async function saveUsername(name) {
  const local = checkUsername(name);
  if (local) return { error: local };
  const { data, error } = await supabase.rpc("set_username", { p_username: name.trim() });
  if (error) return { error: /function.*set_username|schema cache/i.test(error.message) ? "Uporabniška imena še niso vklopljena (supabase/username.sql)." : error.message.replace(/^.*?: /, "") };
  await supabase.auth.updateUser({ data: { username: data } }).catch(() => {});
  return { username: data };
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

/* Preverjanje e-naslova ob registraciji: oblika, tipkarske napake v pogostih domenah (gmail.vom -> gmail.com)
   in nenavadne končnice. Vrne { err, fix } ali { warn } ali null. */
const MAIL_DOMAINS = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "icloud.com", "me.com",
  "gmx.com", "gmx.net", "mail.com", "googlemail.com", "siol.net", "t-2.net", "amis.net", "telemach.net", "student.uni-lj.si", "ef.uni-lj.si", "uni-lj.si"];
const MAIL_TLDS = ["com", "si", "net", "org", "eu", "edu", "gov", "info", "io", "co", "biz", "app", "dev",
  "de", "at", "it", "hr", "rs", "ba", "mk", "me", "ch", "fr", "nl", "be", "hu", "cz", "sk", "pl", "es", "pt", "uk",
  "ie", "se", "no", "dk", "fi", "us", "ca", "au", "ru", "ua", "ro", "bg", "gr", "lu", "li", "mt", "cy", "lt", "lv", "ee"];
function editDist(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
function checkEmail(addr) {
  const a = addr.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/.test(a))
    return { err: "E-naslov ni v pravi obliki (npr. ime@gmail.com)." };
  const [user, dom] = a.split("@");
  const tld = dom.split(".").pop();
  const name = dom.slice(0, -(tld.length + 1));
  if (!MAIL_DOMAINS.includes(dom)) {
    const near = MAIL_DOMAINS.find((kd) => {
      const kt = kd.split(".").pop(), kn = kd.slice(0, -(kt.length + 1));
      if (name === kn) return ["gmail", "icloud"].includes(kn) || !MAIL_TLDS.includes(tld); // gmail.vom, gmail.co
      return tld === kt && editDist(name, kn) <= (kn.length >= 5 ? 2 : 1); // gmial.com, hotmial.com
    });
    if (near) return { err: `Domena "${dom}" ne obstaja - verjetno ${user}@${near}?`, fix: `${user}@${near}` };
  }
  if (!MAIL_TLDS.includes(tld))
    return { warn: `Končnica ".${tld}" je nenavadna - preveri e-naslov. Če je pravilen, klikni "Ustvari račun" še enkrat.` };
  return null;
}

/* Pogoji uporabe in zasebnost. Ob spremembi besedila dvigni TERMS_VERSION (shrani se v user_metadata ob registraciji). */
const TERMS_VERSION = "2026-11-11";
const TERMS_CONTACT = "leon.spiler@gmail.com";
const TERMS = [
  ["Kaj je indeks.", "Brezplačen študijski pripomoček za študente EF UL. Vsebina je pripravljena skrbno, a brez jamstva za popolnost in pravilnost - za izpit veljajo uradna gradiva predmeta."],
  ["Upravljavec podatkov", `Leon Špiler, kontakt: ${TERMS_CONTACT}.`],
  ["Kateri podatki in zakaj", "E-naslov in geslo (geslo je šifrirano) za prijavo ter statistika reševanja kvizov za sinhronizacijo med napravami. Iz statistike vseh uporabnikov prikazujemo le anonimna skupna povprečja."],
  ["Obvestila in ponudbe", "Samo če to posebej označiš: na e-naslov ti občasno pošljemo novosti in ponudbe indeks. (npr. če bo kdaj kakšen del plačljiv). Soglasje ni pogoj za uporabo in ga lahko kadarkoli prekličeš."],
  ["Komu podatke posredujemo", "E-naslova in drugih podatkov ne prodajamo in ne posredujemo tretjim osebam za njihove namene. Podatke tehnično hrani ponudnik baze Supabase kot obdelovalec."],
  ["Tvoje pravice", "Kadarkoli lahko zahtevaš vpogled, popravek ali izbris računa in podatkov ter prekličeš soglasje za obvestila - piši na zgornji kontakt. Pritožbo lahko vložiš pri Informacijskem pooblaščencu RS."],
  ["Spremembe", "Pogoje lahko posodobimo; o bistvenih spremembah te obvestimo po e-pošti ali v aplikaciji."],
];
function TermsBox() {
  return (
    <div style={{ marginTop: 8, maxHeight: 220, overflowY: "auto", padding: "10px 12px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--paper)", fontSize: 12.5, lineHeight: 1.5, color: "var(--ink2)" }}>
      <div style={{ fontWeight: 800, color: "var(--ink)", marginBottom: 6 }}>Pogoji uporabe in zasebnost ({TERMS_VERSION.split("-").reverse().join(". ")})</div>
      {TERMS.map(([h, t]) => (
        <div key={h} style={{ marginBottom: 7 }}><b style={{ color: "var(--ink)" }}>{h.endsWith(".") ? h : h + "."}</b> {t}</div>
      ))}
    </div>
  );
}

function Login({ year, onBack }) {
  const [mode, setMode] = useState("in"); // "in" = prijava, "up" = registracija
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const [fix, setFix] = useState("");
  const [warned, setWarned] = useState("");
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const inputStyle = { width: "100%", boxSizing: "border-box", padding: "11px 13px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--paper)", color: "var(--ink)", fontSize: 15, outline: "none" };
  const submit = async (e) => {
    e.preventDefault();
    let addr = email.trim();
    if (!addr || !password) return;
    setErr(""); setInfo(""); setFix("");
    if (mode === "up") {
      const uerr = checkUsername(username);
      if (uerr) { setErr(uerr); return; }
      const chk = checkEmail(addr);
      if (chk && chk.err) { setErr(chk.err); setFix(chk.fix || ""); return; }
      if (chk && chk.warn && warned !== addr.toLowerCase()) { setErr(chk.warn); setWarned(addr.toLowerCase()); return; }
    }
    if (mode === "up" && password.length < 6) { setErr("Geslo naj ima vsaj 6 znakov."); return; }
    if (mode === "up" && !terms) { setErr("Za registracijo se strinjaj s pogoji uporabe."); return; }
    setBusy(true);
    if (mode === "up") {
      const uname = username.trim();
      // zasedenost imena preverimo pred ustvarjanjem računa
      const taken = await supabase.rpc("login_email", { p_username: uname });
      if (!taken.error && taken.data) { setBusy(false); setErr("Uporabniško ime je že zasedeno."); return; }
      const consent = { terms_version: TERMS_VERSION, terms_accepted_at: new Date().toISOString(), marketing_consent: marketing, username: uname };
      const { data, error } = await supabase.auth.signUp({ email: addr, password, options: { emailRedirectTo: window.location.origin + window.location.pathname, data: consent } });
      setBusy(false);
      if (error) { setErr(mapAuthErr(error)); return; }
      if (data.session) await saveUsername(uname); // sicer ga App nastavi ob prvi prijavi iz metapodatkov
      if (!data.session) {
        // če je potrditev e-pošte vklopljena: ni takojšnje seje
        setInfo("Račun je ustvarjen. Potrdi e-naslov (povezava v e-pošti), nato se prijavi.");
        setMode("in"); setPassword("");
        return;
      }
      // seja obstaja -> onAuthStateChange v useAuth poskrbi za vstop
      return;
    }
    if (!addr.includes("@")) {
      // prijava z uporabniškim imenom: ime -> e-naslov
      const r = await supabase.rpc("login_email", { p_username: addr });
      if (r.error || !r.data) { setBusy(false); setErr(r.error ? "Prijava z uporabniškim imenom še ni vklopljena - vpiši e-naslov." : "Uporabniško ime ne obstaja."); return; }
      addr = r.data;
    }
    const { error } = await supabase.auth.signInWithPassword({ email: addr, password });
    setBusy(false);
    if (error) { setErr(mapAuthErr(error)); return; }
    // uspeh: onAuthStateChange v useAuth poskrbi za vstop
  };
  const up = mode === "up";
  return (
    <div style={{ maxWidth: 380, margin: "6vh auto 0" }}>
      {onBack && (
        <button onClick={onBack} className="ix-chip"
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: 0, marginBottom: 14 }}>
          <ChevronLeft size={15} /> Uvodna stran
        </button>
      )}
      <div className="ix-card" style={{ padding: 24 }}>
        {year && <div className="ix-chip" style={{ color: "var(--terra)", marginBottom: 8 }}>{year}. letnik</div>}
        <form onSubmit={submit}>
          <div className="ix-serif" style={{ fontWeight: 800, fontSize: 22, marginBottom: 4 }}>{up ? "Registracija" : "Prijava"}</div>
          <div style={{ color: "var(--ink2)", fontSize: 14, marginBottom: 16, lineHeight: 1.5 }}>
            {up
              ? "Ustvari brezplačen račun: uporabniško ime, e-naslov in geslo."
              : "Vpiši uporabniško ime ali e-naslov in geslo."}
          </div>
          {up && (
            <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} maxLength={20}
              placeholder="uporabniško ime (3–20 znakov)" autoCapitalize="none" autoCorrect="off" autoComplete="username"
              style={{ ...inputStyle, marginBottom: 10 }} />
          )}
          <input type={up ? "email" : "text"} required autoFocus value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder={up ? "ime@email.com" : "uporabniško ime ali ime@email.com"} autoCapitalize="none" autoCorrect="off" autoComplete={up ? "email" : "username"}
            style={{ ...inputStyle, marginBottom: 10 }} />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Geslo" autoComplete={up ? "new-password" : "current-password"} style={inputStyle} />
          {up && (
            <div style={{ marginTop: 12, fontSize: 13, color: "var(--ink2)", lineHeight: 1.45 }}>
              <label style={{ display: "flex", gap: 8, alignItems: "flex-start", cursor: "pointer" }}>
                <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} style={{ marginTop: 2 }} />
                <span>Strinjam se s{" "}
                  <button type="button" onClick={() => setShowTerms((v) => !v)}
                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--terra)", fontWeight: 700, textDecoration: "underline", fontSize: 13 }}>
                    pogoji uporabe in zasebnosti
                  </button>.</span>
              </label>
              {showTerms && <TermsBox />}
              <label style={{ display: "flex", gap: 8, alignItems: "flex-start", cursor: "pointer", marginTop: 8 }}>
                <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} style={{ marginTop: 2 }} />
                <span>Želim prejemati novosti in ponudbe indeks. na e-naslov (neobvezno, prekličem lahko kadarkoli).</span>
              </label>
            </div>
          )}
          {err && <div style={{ color: "var(--terra)", fontSize: 13, marginTop: 10 }}>{err}</div>}
          {fix && (
            <button type="button" onClick={() => { setEmail(fix); setFix(""); setErr(""); }}
              style={{ background: "none", border: "none", padding: 0, marginTop: 6, cursor: "pointer", color: "var(--terra)", fontSize: 13, fontWeight: 700, textDecoration: "underline" }}>
              Popravi v {fix}
            </button>
          )}
          {info && <div style={{ color: "var(--teal)", fontSize: 13, marginTop: 10 }}>{info}</div>}
          <button type="submit" disabled={busy}
            style={{ width: "100%", marginTop: 14, padding: "11px 13px", borderRadius: 10, border: "none", background: "var(--ink)", color: "var(--paper)", fontSize: 15, fontWeight: 700, cursor: busy ? "default" : "pointer", opacity: busy ? 0.6 : 1 }}>
            {busy ? "Trenutek…" : up ? "Ustvari račun" : "Prijava"}
          </button>
        </form>
        <div style={{ marginTop: 16, textAlign: "center", fontSize: 13, color: "var(--ink2)" }}>
          {up ? "Že imaš račun? " : "Nimaš računa? "}
          <button onClick={() => { setMode(up ? "in" : "up"); setErr(""); setInfo(""); setFix(""); }}
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
html,body{overflow-x:hidden;overflow-x:clip;}
.ix-root{font-family:'Spline Sans',system-ui,sans-serif;color:var(--ink);position:relative;overflow-x:hidden;overflow-x:clip;background:
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
/* plošča Formule */
.ix-root .ix-formbtn{position:fixed;right:18px;bottom:18px;z-index:60;display:flex;align-items:center;gap:7px;padding:10px 15px;border-radius:999px;border:1px solid var(--line);background:var(--ink);color:var(--paper);font-weight:700;font-size:13.5px;cursor:pointer;box-shadow:0 6px 22px rgba(0,0,0,.22);}
.ix-root .ix-formpanel{position:fixed;right:14px;top:14px;bottom:14px;width:min(380px,calc(100vw - 28px));z-index:60;display:flex;flex-direction:column;background:var(--paper2);border:1px solid var(--line);border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,.28);overflow:hidden;}
.ix-formhead{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid var(--line);font-size:14px;}
.ix-root .ix-formx{background:none;border:none;cursor:pointer;color:var(--ink2);display:grid;place-items:center;padding:4px;border-radius:8px;}
.ix-root .ix-formx:hover{background:var(--paper);}
.ix-formsearch{display:flex;align-items:center;gap:7px;margin:10px 12px 4px;padding:7px 10px;border:1px solid var(--line);border-radius:10px;background:var(--paper);}
.ix-formsearch input{flex:1;border:none;outline:none;background:transparent;color:var(--ink);font-size:13.5px;min-width:0;}
.ix-formbody{flex:1;overflow-y:auto;padding:6px 14px 18px;-webkit-overflow-scrolling:touch;}
.ix-formgroup{margin:14px 0 6px;font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--terra);}
.ix-formitem{padding:8px 0;border-bottom:1px dashed var(--line);}
.ix-formname{font-size:12.5px;color:var(--ink2);font-weight:600;}
.ix-formf{margin-top:2px;font-family:'Spline Sans',system-ui,sans-serif;font-size:14.5px;font-weight:500;color:var(--ink);line-height:1.45;word-break:break-word;}
.ix-formd{margin-top:2px;font-size:12px;color:var(--ink2);line-height:1.4;}
@media (max-width:760px){.ix-formpanel{left:8px;right:8px;top:auto;bottom:8px;width:auto;height:58vh;}.ix-root .ix-formbtn{right:12px;bottom:12px;}}
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
.ix-kbd{display:inline-block;font:600 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--ink2);background:var(--paper2);border:1px solid var(--line);border-bottom-width:2px;border-radius:5px;padding:3px 6px;min-width:12px;text-align:center;}
.ix-kbdhint{display:none;flex-wrap:wrap;gap:6px 14px;align-items:center;font-size:12px;color:var(--ink2);margin-top:14px;}
.ix-kbdhint span{display:inline-flex;align-items:center;gap:5px;}
.ix-optkey-num{display:none;}
@media (hover:hover) and (pointer:fine){.ix-kbdhint{display:flex;}.ix-optkey-num{display:inline-block;}.ix-optkey-letter{display:none;}}
.ix-bar{height:6px;background:var(--line);border-radius:99px;overflow:hidden;}
.ix-bar>span{display:block;height:100%;background:var(--terra);transition:width .4s ease;}
.ix-btn{font-weight:600;border-radius:12px;cursor:pointer;}
.ix-seg{display:inline-flex;gap:4px;padding:4px;background:var(--paper2);border:1px solid var(--line);border-radius:13px;}
.ix-seg button{font-family:'Fraunces',serif;font-weight:600;font-size:15px;border:none;background:none;color:var(--ink2);
  padding:7px 16px;border-radius:9px;cursor:pointer;transition:background .15s, color .15s;}
.ix-seg button:hover{color:var(--ink);}
.ix-seg button[aria-pressed="true"]{background:var(--ink);color:var(--paper);}
.ix-sec{font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;display:flex;align-items:center;gap:7px;margin-bottom:11px;}
.ix-notes{font-size:15px;line-height:1.62;color:var(--ink);min-width:0;max-width:100%;overflow-wrap:anywhere;word-break:break-word;}
.ix-notes img,.ix-notes svg,.ix-notes figure{max-width:100%;height:auto;box-sizing:border-box;}
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
/* 1v1: modalno okno, vnosi, gumbi-pilule, značka */
.ix-root .ix-modalbg{position:fixed;inset:0;background:rgba(25,23,18,.45);z-index:70;display:flex;align-items:center;justify-content:center;padding:16px;}
.ix-modal{background:var(--paper2);border:1px solid var(--line);border-radius:16px;width:min(560px,100%);max-height:85vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.35);}
.ix-modalhead{display:flex;align-items:center;gap:8px;padding:14px 16px;border-bottom:1px solid var(--line);}
.ix-modalbody{overflow-y:auto;padding:12px 16px 16px;-webkit-overflow-scrolling:touch;}
.ix-root .ix-input{padding:9px 11px;border-radius:10px;border:1px solid var(--line);background:var(--paper);color:var(--ink);font-size:14px;font-family:inherit;box-sizing:border-box;}
.ix-root .ix-pill{background:none;border:1px solid var(--line);border-radius:999px;padding:5px 11px;cursor:pointer;color:var(--ink);font-size:12.5px;font-weight:600;white-space:nowrap;}
.ix-root .ix-pill.on{background:var(--teal);color:#fff;border-color:var(--teal);}
.ix-root .ix-pill.bad{color:var(--red);}
.ix-root .ix-pill:disabled{opacity:.5;cursor:default;}
.ix-badge{position:absolute;top:-6px;right:-8px;min-width:18px;height:18px;border-radius:999px;background:var(--terra);color:#fff;font-size:10.5px;font-weight:700;display:grid;place-items:center;padding:0 5px;box-sizing:border-box;}
.ix-row{display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid var(--line);flex-wrap:wrap;}
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
  { t: "Osamelec", s: "osamel", subj: "stana", d: "Vrednost, ki je na boxplotu zunaj ročajev; ročaj kaže največjo vrednost brez osamelcev." },
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
  { t: "Boxplot (škatla z brki)", s: "boxplot", subj: ["stana", "stat"], d: "Grafični prikaz porazdelitve: debela črta = mediana, rob škatle = Q₁ in Q₃, ročaja (brka) = najmanjša in največja vrednost BREZ osamelcev, krogci = osamelci." },
  { t: "Ročaj (brk, whisker)", s: "ročaj", subj: ["stana", "stat"], d: "Črta na boxplotu do najmanjše/največje vrednosti, ki ni osamelec (največ 1,5 · IQR od roba škatle)." },
  { t: "Kvartilni razmik (IQR)", s: "iqr", b: 1, subj: ["stana", "stat"], d: "IQR = Q₃ − Q₁: razpon srednje polovice podatkov. Osamelci so več kot 1,5 · IQR izven škatle." },
  { t: "Kvartil", s: "kvartil", subj: ["stana", "stat"], d: "Vrednosti, ki razdelijo urejen niz na štiri dele: Q₁ (25 %), Q₂ = mediana (50 %), Q₃ (75 %)." },
  { t: "Decil / centil (percentil)", s: "decil", subj: ["stana", "stat"], d: "Vrednosti, ki razdelijo niz na 10 (decili) oziroma 100 delov (centili). D₉ = 90. centil: do vključno te vrednosti je 90 % enot." },
  { t: "Percentil (centil)", s: "percentil", subj: ["stana", "stat"], d: "Vrednost, do katere (vključno) leži podani odstotek enot (npr. 90. percentil = D₉)." },
  { t: "Mediana", s: "median", subj: ["stana", "stat"], d: "Srednja vrednost urejenega niza: polovica enot ima manjšo, polovica večjo vrednost. Odporna na osamelce." },
  { t: "Modus", s: "modus", subj: ["stana", "stat"], d: "Najpogostejša vrednost spremenljivke. Edina srednja vrednost, ki jo lahko izračunamo za imensko lestvico." },
  { t: "Aritmetična sredina", s: "aritmetičn", subj: ["stana", "stat"], d: "Povprečje: vsota vrednosti / število enot. Občutljiva na osamelce; zahteva vsaj razmično lestvico." },
  { t: "Standardni odklon", s: "standardni odklon", subj: ["stana", "stat"], d: "Koren variance: povprečni odmik od aritmetične sredine, v enotah spremenljivke." },
  { t: "Varianca", s: "varianc", subj: ["stana", "stat"], d: "Povprečen kvadrat odklonov od sredine: s² = Σ(y − ȳ)²/(n − 1). Enota je kvadrat enote spremenljivke." },
  { t: "Histogram", s: "histogram", subj: ["stana", "stat"], d: "Stolpčni prikaz frekvenčne porazdelitve zvezne spremenljivke; stolpci se stikajo." },
  { t: "Frekvenca", s: "frekvenc", subj: ["stana", "stat"], d: "Število enot v razredu (f), relativna frekvenca f° = f/n, kumulativa F = vsota frekvenc do vključno razreda." },
  { t: "Kumulativa", s: "kumulativ", subj: ["stana", "stat"], d: "Seštevek frekvenc od prvega razreda do vključno obravnavanega: koliko enot ima vrednost do zgornje meje razreda." },
  { t: "Razred in sredina razreda", s: "sredina razreda", subj: ["stana", "stat"], d: "Razred = interval vrednosti (npr. nad 20 do 40); sredina = (spodnja + zgornja meja)/2, uporabimo jo kot reprezentanta razreda." },
  { t: "Asimetrična porazdelitev", s: "asimetri", subj: ["stana", "stat"], d: "Porazdelitev z dolgim repom na eni strani. Desno asimetrična: Mo < Me < ȳ (osamelci zgoraj). Simetrična: ȳ = Me = Mo." },
  { t: "Normalna porazdelitev", s: "normaln", subj: ["stana", "stat"], d: "Zvonasta, simetrična, unimodalna porazdelitev, določena z μ in σ: Y ~ N(μ, σ). Standardizirana: Z ~ N(0, 1)." },
  { t: "Standardizirana normalna (Z)", s: "standardizirana", subj: ["stana", "stat"], d: "N(0, 1): z = (y − μ)/σ pove, za koliko standardnih odklonov je vrednost nad ali pod povprečjem." },
  { t: "Diskretna / zvezna spremenljivka", s: "diskret", subj: ["stana", "stat"], d: "Diskretna: samo cele vrednosti (število otrok). Zvezna: poljubna vrednost na intervalu (višina)." },
  { t: "Zvezna spremenljivka", s: "zvezn", subj: ["stana", "stat"], d: "Lahko zavzame poljubno vrednost na intervalu; verjetnost točke je 0, verjetnost intervala je ploščina pod gostoto." },
  { t: "Imenska lestvica (nominalna)", s: "imensk", subj: ["stana", "stat"], d: "Kategorije brez vrstnega reda (spol, kraj). Dovoljeno: frekvence, deleži, modus." },
  { t: "Urejenostna lestvica (ordinalna)", s: "urejenostn", subj: ["stana", "stat"], d: "Kategorije z vrstnim redom, a nepoznanimi razlikami (izobrazba). Dovoljeno: mediana, kvantili." },
  { t: "Razmična lestvica (intervalna)", s: "razmičn", subj: ["stana", "stat"], d: "Enake razlike, a ničla je dogovorjena (°C, leto). Razlike imajo pomen, razmerja ne." },
  { t: "Razmernostna lestvica", s: "razmernostn", subj: ["stana", "stat"], d: "Ima pravo ničlo (cena, starost, K): razmerja imajo pomen, dovoljeni so vsi parametri (KV, geometrijska sredina)." },
  { t: "Dihotomna spremenljivka", s: "dihotom", subj: ["stana", "stat"], d: "Spremenljivka z dvema vrednostma (da/ne, pokvarjen/brezhiben)." },
  { t: "Spremenljivka", s: "spremenljivk", subj: ["stana", "stat"], d: "Lastnost enote, ki se od enote do enote spreminja (starost, spol). Parameter opisuje populacijo, spremenljivka enoto." },
  { t: "Statistična enota", s: "enota", subj: ["stana", "stat"], d: "Posamezen element populacije, ki ga opazujemo (oseba, podjetje, škatla)." },
  { t: "Vzorec", s: "vzorec", subj: ["stana", "stat"], d: "Del populacije, ki ga dejansko opazujemo; iz njega sklepamo na populacijo." },
  { t: "Frekvenčna tabela v R (frq)", s: "frq", subj: ["stana", "stat"], d: "Ukaz iz paketa sjmisc: izpiše frekvence (N), relativne (Valid %) in kumulativne (Cum. %). Pri razvrščenih podatkih so vrednosti sredine razredov." },
  { t: "Porazdelitvena funkcija F(y)", s: "porazdelitvena funkcij", subj: "stana", d: "F(y) = P(Y ≤ y): verjetnost, da je vrednost največ y. Pri normalni ima prevoj pri μ (F = 0,5)." },
  { t: "pnorm / qnorm", s: "pnorm", subj: "stana", d: "pnorm(y, μ, σ) = P(Y ≤ y) (vrednost → verjetnost); qnorm(p, μ, σ) = kvantil (verjetnost → vrednost); lower.tail = FALSE da P(Y > y)." },
  { t: "Binomska porazdelitev", s: "binomsk", subj: "stana", d: "Število uspehov v n neodvisnih poskusih z vračanjem. Hipergeometrična: brez vračanja. Poissonova: dogodki na enoto časa." },
  { t: "Hipergeometrična porazdelitev", s: "hipergeometri", subj: "stana", d: "Število uspehov v n poskusih BREZ vračanja iz končne populacije." },
  { t: "Poissonova porazdelitev", s: "poisson", subj: "stana", d: "Število redkih dogodkov na enoto časa ali prostora (pacienti na urgenci, napake na stran)." },
  { t: "Slučajna spremenljivka", s: "slučajna spremenljivka", subj: "stana", d: "Spremenljivka, katere vrednost je odvisna od slučaja (npr. cenilka, ki je odvisna od izbranega vzorca)." },
  { t: "Doslednost cenilke", s: "doslednost", subj: "stana", d: "Z večanjem vzorca se ocene vedno bolj približujejo pravi vrednosti parametra." },
  { t: "Učinkovitost cenilke", s: "učinkovit", subj: "stana", d: "Med nepristranskimi cenilkami je učinkovitejša tista z manjšo varianco (manjšo standardno napako)." },
  { t: "Vzorčenje z/brez ponavljanja", s: "ponavljanj", subj: "stana", d: "S ponavljanjem: enota je lahko izbrana večkrat. Brez ponavljanja: največ enkrat (običajno v družboslovju)." },
  { t: "Kvotni vzorec", s: "kvotni", subj: "stana", d: "Neslučajni (neverjetnostni) vzorec: anketar izpolni kvote po lastnostih (spol, starost); verjetnost izbire ni znana." },
  { t: "Vzorčenje v več stopnjah", s: "več stopnjah", subj: "stana", d: "Vzorčenje v stopnjah (kraji → hoteli → gostje); primarne in elementarne enote niso iste; ne potrebujemo seznama vseh enot." },
  { t: "Stratificirano vzorčenje", s: "stratific", subj: "stana", d: "Populacijo razdelimo na sloje (stratume) in vzorčimo v vsakem." },
  { t: "Interval zaupanja", s: "interval zaupanja", subj: "stana", d: "Interval okoli ocene, ki z izbrano verjetnostjo (1 − α) vsebuje pravo vrednost parametra." },
  { t: "Stopnja tveganja α", s: "stopnja tveganja", subj: "stana", d: "Verjetnost, da interval ne vsebuje pravega parametra. Višji α → ožji interval (manjši odklon zaupanja)." },
  { t: "Napaka (odklon zaupanja)", s: "odklon zaupanja", subj: "stana", d: "Polovica širine intervala zaupanja: e = z · SE." },
  { t: "Korenček in palica", s: "palic", subj: "pf1", d: "Angl. »carrot and stick«. Korenček = nagrada (bonus, delniške opcije, napredovanje). Palica = kazen ali pritisk (grožnja prevzema, odpoved, aktivisti, izguba bonusa). Z njima uskladimo interese managerjev z lastniki." },
  { t: "Korenček", s: "korenč", subj: "pf1", d: "Nagrada za managerja: bonus, delniške opcije, delnice. Skupaj s »palico« (kazen) uskladi interese managerjev z interesi lastnikov." },
  { t: "Director / Board of directors", s: "director", subj: "pf1", d: "V angleški literaturi je »director« član odbora (board of directors), ki zastopa delničarje. Pri nas: član nadzornega sveta ali upravnega odbora; ni nujno izvršilni vodja (to je CEO / predsednik uprave)." },
  { t: "Board of directors", s: "board", subj: "pf1", d: "Odbor direktorjev: v anglosaškem enotirnem sistemu organ, ki zastopa delničarje in nadzira managerje (pri nas upravni odbor, v dvotirnem nadzorni svet)." },
  { t: "CEO / CFO", s: "ceo", b: 1, subj: "pf1", d: "CEO = predsednik uprave (glavni izvršni direktor); CFO = finančni direktor." },
  { t: "Manager", s: "manager", subj: "pf1", d: "Oseba, ki vodi podjetje v imenu lastnikov (agent). Problem agenta nastane, ker ima manj kot 100 % lastništva in ne nosi vseh posledic odločitev." },
  { t: "Principal in agent", s: "principal", subj: "pf1", d: "Principal = lastnik (delničar), ki pooblasti agenta (managerja) za vodenje podjetja." },
  { t: "Agencijski stroški", s: "agencijski", subj: "pf1", d: "Stroški problema agenta: nadzor (monitoring), jamstva managerja (bonding) in preostala izguba zaradi sprejemanja odločitev v škodo lastnikov." },
  { t: "Prevzem (takeover)", s: "prevzem", subj: "pf1", d: "Nakup večinskega deleža v podjetju; grožnja prevzema disciplinira managerje, saj novi lastniki zamenjajo slabo vodstvo." },
  { t: "Aktivistični vlagatelj", s: "aktivist", subj: "pf1", d: "Vlagatelj, ki odkupi delež in pritiska na upravo (zamenjava vodstva, spremembe strategije, izplačila)." },
  { t: "Shareholder / stakeholder", s: "stakeholder", subj: "pf1", d: "Shareholder = delničar (lastnik); stakeholder = deležnik (zaposleni, kupci, dobavitelji, družba)." },
  { t: "Nadzorni svet", s: "nadzorni svet", subj: "pf1", d: "Organ, ki nadzira upravo in zastopa delničarje (v dvotirnem sistemu); imenuje in odpokličejo upravo." },
  { t: "Uprava", s: "uprava", subj: "pf1", d: "Izvršilni organ, ki vodi posle družbe na lastno odgovornost." },
  { t: "Dvotirni sistem", s: "dvotirni", subj: "pf1", d: "Upravljanje z upravo in nadzornim svetom (Slovenija, Nemčija). Enotirni: upravni odbor (ZDA, VB)." },
  { t: "Pasivna/aktivna odpoved lastnikov", s: "pasivn", subj: "pf1", d: "Mali delničarji običajno ne nadzirajo uprave (zastonjkar), zato nadzor prevzamejo veliki lastniki, nadzorni svet in trg prevzemov." },
  { t: "Koncentrirano lastništvo", s: "koncentrirano", subj: "pf1", d: "Pri nekaj velikih lastnikih je nadzor močnejši, a nastane spor veliki proti malim lastnikom." },
  { t: "Delničarska demokracija / vstaja delničarjev", s: "vstaja", subj: "pf1", d: "Delničarji lahko zamenjajo upravo na skupščini; vstaja (proxy fight) je zbiranje glasov proti obstoječemu vodstvu." },
  { t: "Deležnik", s: "deležnik", subj: "pf1", d: "Skupina, na katero poslovanje vpliva ali ki vpliva nanj: zaposleni, kupci, dobavitelji, upniki, lokalna skupnost." },
  { t: "Operativni NOK", s: "nok", b: 1, subj: "pf1", d: "Neto operativni obratni kapital = operativna kratkoročna sredstva − operativne kratkoročne obveznosti (brez denarja in finančnega dolga)." },
  { t: "CapEx", s: "capex", subj: "pf1", d: "Capital expenditure: naložbe v osnovna sredstva." },
  { t: "Zahtevana donosnost vs pričakovana", s: "pričakovana donosnost", subj: "pf1", d: "Pričakovana E(r) izhaja iz napovedi; zahtevana (CAPM) iz tveganja. E > zahtevana: podcenjena (kupi)." },
  { t: "Nominalna in realna", s: "realna", subj: "pf1", d: "Nominalne tokove diskontiramo z nominalno, realne z realno obrestno mero (dosledno)." },
  { t: "Portfelj", s: "portfelj", subj: "pf1", d: "Skupina naložb z utežmi (deleži v vrednosti). E(P) je tehtano povprečje; σ(P) je odvisen od korelacij." },
  { t: "Tržni portfelj", s: "tržni portfelj", subj: "pf1", d: "Portfelj vseh tveganih naložb; ima beto 1; približek je delniški indeks." },
  { t: "Netvegana naložba", s: "netveg", subj: "pf1", d: "Naložba z znano donosnostjo (σ = 0, β = 0), npr. kratkoročni državni vrednostni papir. Označimo r_f." },
  { t: "Podcenjena / precenjena delnica", s: "podcenjen", subj: "pf1", d: "Podcenjena: pričakovana donosnost > zahtevana (CAPM), kupi. Precenjena: pričakovana < zahtevana, prodaj." },
  { t: "Cena kapitala (strošek kapitala)", s: "strošek kapitala", subj: "pf1", d: "Donosnost, ki jo vlagatelji zahtevajo za naložbo v podjetje; diskontna stopnja projektov." },
  { t: "Segmentacija", s: "segmentacij", subj: "trz", d: "Delitev trga na skupine porabnikov z enakimi lastnostmi (geografske, demografske, psihografske, vedenjske)." },
  { t: "Ciljanje", s: "ciljanje", subj: "trz", d: "Izbira segmenta, ki je za podjetje največja poslovna priložnost (ciljni trg). Strategije: množično, diferencirano, koncentrirano, mikro." },
  { t: "Pozicioniranje", s: "pozicioniranje", subj: "trz", d: "Jasno, razločevalno in zaželeno mesto izdelka v mislih ciljnih porabnikov glede na konkurenco." },
  { t: "Mikrookolje", s: "mikrookolj", subj: "trz", d: "Podjetje, porabniki, konkurenca, dobavitelji, posredniki, javnosti - nanje podjetje lahko vpliva." },
  { t: "Makrookolje", s: "makrookolj", subj: "trz", d: "Ekonomski, demografski, sociokulturni, politični/pravni, tehnološki in naravni dejavniki - nanje se mora podjetje prilagoditi." },
  { t: "SWOT", s: "swot", b: 1, subj: "trz", d: "Strengths, weaknesses, opportunities, threats: prednosti, slabosti, priložnosti in nevarnosti podjetja." },
  { t: "PEST", s: "pest", b: 1, subj: "trz", d: "Analiza zunanjega okolja: politični, ekonomski, socialni, tehnološki dejavniki." },
  { t: "Trend", s: "trend", subj: "trz", d: "Smer ali zaporedje dogodkov z določeno vztrajnostjo in trajnostjo (staranje prebivalstva). Za razliko od muhe (fad), ki hitro mine." },
  { t: "Trženje od ust do ust", s: "od ust do ust", subj: "trz", d: "Ustna, pisna in elektronska komunikacija med porabniki o izkušnjah z blagovno znamko; neformalna pot." },
  { t: "Formalne komunikacijske poti", s: "formaln", subj: "trz", d: "Poti, ki jih ustvari podjetje (oglaševanje, PR, pospeševanje prodaje, osebna prodaja)." },
  { t: "Pobudnik, vplivnež, odločevalec", s: "odločevalec", subj: "trz", d: "Nakupne vloge: pobudnik predlaga nakup, vplivnež vpliva, odločevalec odloči, kupec kupi, porabnik uporablja." },
  { t: "Referenčna skupina", s: "referenčn", subj: "trz", d: "Skupina (mnenjski voditelji, prijatelji), na katero se porabnik zgleduje pri nakupu (družbeni dejavnik)." },
  { t: "Mnenjski voditelj", s: "mnenjski", subj: "trz", d: "Oseba, ki z mnenjem vpliva na nakupne odločitve drugih." },
  { t: "Vedenjska in stališčna zvestoba", s: "stališčn", subj: "trz", d: "Vedenjska = ponavljanje nakupov. Stališčna = pozitiven odnos do znamke in priporočanje. Vsakdanji izdelki: vedenjska; posebni: stališčna." },
  { t: "Fokusna skupina", s: "fokusn", subj: "trz", d: "Kvalitativna raziskava: moderirana skupinska razprava 6-10 udeležencev." },
  { t: "Globinski intervju", s: "globinski", subj: "trz", d: "Kvalitativna metoda: poglobljen pogovor z enim anketirancem (zaupne teme)." },
  { t: "Primarni in sekundarni podatki", s: "sekundarn", subj: "trz", d: "Primarne zbere raziskovalec sam za določen problem (anketa, intervju); sekundarni že obstajajo (statistika, notranji viri); cenejši." },
  { t: "Kvalitativna / kvantitativna raziskava", s: "kvalitativn", subj: "trz", d: "Kvalitativna: razumevanje razlogov (intervju, fokusna skupina). Kvantitativna: številke na velikem vzorcu (anketa)." },
  { t: "Projektivne tehnike", s: "projektivn", subj: "trz", d: "Psihološka orodja, s katerimi anketiranec posredno razkrije mnenje (»če bi bila znamka oseba, kakšna bi bila?«)." },
  { t: "Priložnostni vzorec", s: "priložnostn", subj: "trz", d: "Neverjetnostni vzorec, izbran po dostopnosti (npr. sledilci na družbenem omrežju); ni reprezentativen." },
  { t: "Blagovna znamka", s: "blagovn", subj: "trz", d: "Ime, znak ali simbol, ki prepoznava izdelek in ga loči od konkurence; premoženje blagovne znamke = zavedanje, podoba, kakovost, zvestoba." },
  { t: "Franšizing in licenciranje", s: "franšiz", subj: "trz", d: "Pogodbena načina vstopa na tuji trg: licenca za uporabo znamke/tehnologije, franšiza = celoten poslovni model." },
  { t: "Internacionalizacija", s: "internacionaliz", subj: "trz", d: "Vstop podjetja na tuje trge; odločitve: kaj, kam, kako (izvozno, pogodbeno, investicijsko), kdaj." },
  { t: "Izvozni / pogodbeni / investicijski vstop", s: "investicijski", subj: "trz", d: "Izvoz (posredni ali neposredni), pogodbeni načini (licenca, franšiza) in investicijski (lastna družba, prevzem v tujini)." },
  { t: "Prodajna usmeritev", s: "prodajna", subj: "trz", d: "Agresivna prodaja in komuniciranje; poudarek je na prodaji obstoječih izdelkov. Trženjska usmeritev začne pri potrebah porabnika." },
  { t: "Proizvodna usmeritev", s: "proizvodna", subj: "trz", d: "Porabniki dajejo prednost dostopnim in cenovno ugodnim izdelkom - poudarek na proizvodnji in distribuciji." },
  { t: "Izdelčna usmeritev", s: "izdelčna", subj: "trz", d: "Porabniki dajejo prednost kakovosti in inovativnosti; nevarnost: trženjska kratkovidnost." },
  { t: "Družbeno odgovorno trženje", s: "družbeno odgovorn", subj: "trz", d: "Upošteva še dolgoročno blaginjo posameznika in družbe (npr. The Body Shop)." },
  { t: "Vrednost za porabnika", s: "zaznana vrednost", subj: "trz", d: "Razlika med celotno vrednostjo (koristi) in celotnimi stroški v očeh porabnika." },
  { t: "Apostol, podkupljivec, talec, terorist", s: "apostol", subj: "trz", d: "Skupine porabnikov glede na zadovoljstvo in zvestobo: apostol (zadovoljen, zvest), podkupljivec (zadovoljen, nezvest), talec (nezadovoljen, zvest), terorist (nezadovoljen, nezvest)." },
  { t: "Podkupljivec", s: "podkupljiv", subj: "trz", d: "Zadovoljen, a nezvest porabnik: preide h konkurentu ob boljši ponudbi." },
  { t: "Talec", s: "talec", subj: "trz", d: "Nezadovoljen, a zvest porabnik (zaradi cene, pomanjkanja alternativ)." },
  { t: "Terorist", s: "terorist", subj: "trz", d: "Nezadovoljen in nezvest porabnik, ki širi slab glas." },
  { t: "Carina", s: "carin", subj: "eeu", d: "Davek na uvoz blaga. Ad valorem: odstotek vrednosti; specifična: fiksen znesek na enoto." },
  { t: "Uvozna kvota", s: "kvot", subj: "eeu", d: "Količinska omejitev uvoza (lahko brez carine)." },
  { t: "Absolutna in relativna prednost", s: "absolutn", subj: "eeu", d: "Absolutna: država proizvede več z enako delovno silo (Smith). Relativna: nižji oportunitetni strošek (Ricardo)." },
  { t: "Oportunitetni strošek", s: "oportunitet", subj: "eeu", d: "Koliko druge dobrine opustimo za enoto dane dobrine; osnova relativnih prednosti." },
  { t: "Specializacija", s: "specializacij", subj: "eeu", d: "Država proizvaja in izvaža dobrino, pri kateri ima relativno prednost, drugo uvaža." },
  { t: "Menjalno razmerje", s: "menjalno razmerje", subj: "eeu", d: "Koliko enot ene dobrine zamenjamo za enoto druge. Leži med oportunitetnima stroškoma držav." },
  { t: "Protekcionizem", s: "protekcioniz", subj: "eeu", d: "Zaščita domače proizvodnje pred tujo konkurenco: carine, kvote, tehnične ovire." },
  { t: "Avtarkija", s: "avtarkij", subj: "eeu", d: "Samozadostno gospodarstvo brez mednarodne menjave." },
  { t: "Potrošnikov presežek", s: "potrošnikov presežek", subj: "eeu", d: "Razlika med ceno, ki jo je potrošnik pripravljen plačati, in dejansko ceno (lik pod D, nad ceno)." },
  { t: "Proizvajalčev presežek", s: "proizvajalčev presežek", subj: "eeu", d: "Razlika med ceno in minimalno ceno, po kateri je ponudnik pripravljen prodajati (lik nad S, pod ceno)." },
  { t: "Prosta mednarodna trgovina", s: "prosta trgovin", subj: "eeu", d: "Menjava brez carin, kvot in transportnih stroškov. Obe državi pridobita (uvoznica: potrošniki, izvoznica: proizvajalci)." },
  { t: "Nadnacionalno in medvladno", s: "nadnaciona", subj: "eeu", d: "Nadnacionalno: države prenesejo del suverenosti na skupne institucije (EGS). Medvladno: odločanje s soglasjem, brez prenosa (EFTA)." },
  { t: "Federalni pristop", s: "federalni", subj: "eeu", d: "Države prenesejo del suverenosti na nadnacionalne institucije (ESPJ, EGS); podprla ga je šesterica." },
  { t: "Evropski svet", s: "evropski svet", subj: "eeu", d: "Voditelji držav ali vlad + predsednik Evropskega sveta in Komisije; daje politične usmeritve, ne sprejema zakonov. Ni isto kot Svet Evrope ali Svet EU." },
  { t: "Svet Evrope", s: "svet evrope", subj: "eeu", d: "Mednarodna organizacija za človekove pravice (Strasbourg, 46 držav); NI institucija EU." },
  { t: "Svet EU", s: "svet eu", subj: "eeu", d: "Ministri držav članic; zakonodajalec skupaj z Evropskim parlamentom." },
  { t: "Evropska komisija", s: "komisij", subj: "eeu", d: "Izvršilni organ EU; ima izključno zakonodajno pobudo." },
  { t: "ECB", s: "ecb", b: 1, subj: "eeu", d: "Evropska centralna banka: izvaja monetarno politiko evroobmočja (Frankfurt)." },
  { t: "EMU", s: "emu", b: 1, subj: "eeu", d: "Ekonomska in monetarna unija: skupna valuta (evro) in centralna banka; zadnja stopnja integracije." },
  { t: "EC92", s: "ec92", subj: "eeu", d: "Program enotnega evropskega trga (Bela knjiga 1985, Enotni evropski akt): odprava fizičnih, tehničnih in davčnih ovir do 31. 12. 1992." },
  { t: "Maastrichtska pogodba", s: "maastricht", subj: "eeu", d: "Pogodba o EU (podpis 7. 2. 1992, velja od 1. 11. 1993): tri stebri, EMU s konvergenčnimi kriteriji, državljanstvo EU." },
  { t: "Lizbonska pogodba", s: "lizbon", subj: "eeu", d: "Velja od 1. 12. 2009: ukine stebre, EU dobi pravno osebnost, stalni predsednik Evropskega sveta, čl. 50 (izstop)." },
  { t: "Schengen", s: "schengen", subj: "eeu", d: "Odprava mejnega nadzora na notranjih mejah (sporazuma 1985 in 1995), skupna pravila za zunanje meje." },
  { t: "Marshallov načrt", s: "marshall", subj: "eeu", d: "Ameriška pomoč za obnovo Evrope po 2. svetovni vojni (1948); dala je OEEC." },
  { t: "Beneluks", s: "beneluks", subj: "eeu", d: "Carinska unija Belgije, Nizozemske in Luksemburga (1948); zgled za carinsko unijo." },
  { t: "Trade creation / diversion", s: "trade creation", subj: "eeu", d: "Ustvarjanje trgovine: partner nadomesti dražjo domačo proizvodnjo (+). Preusmerjanje: dražji partner namesto cenejše tretje države (−)." },
  { t: "Vinerjeva nejasnost", s: "viner", subj: "eeu", d: "Neto učinek preferencialne liberalizacije na blaginjo ni jasen: ustvarjanje trgovine (+) proti preusmerjanju (−)." },
  { t: "Pravila o poreklu", s: "poreklu", subj: "eeu", d: "Pravila v FTA, da blago iz tretjih držav ne vstopi prek članice z najnižjo carino (trade deflection)." },
  { t: "Majhna in velika država", s: "majhna država", subj: "eeu", d: "Majhna ne vpliva na svetovno ceno (carina nosijo domači potrošniki). Velika lahko zniža svetovno ceno (del bremena na tuje izvoznike)." },
  { t: "Kmetijska politika", s: "kmetijsk", subj: "eeu", d: "Skupna kmetijska politika (SKP, 1962): intervencijske cene, subvencije, zaščita pred uvozom." },
  { t: "Resurs", s: "resurs", subj: "mpsp", d: "Sredstvo, ki sodeluje pri večkratni izvedbi procesa (stroj, delavec, prostor). Vložek: sodeluje enkrat (material)." },
  { t: "Vložek in izložek", s: "izložek", subj: "mpsp", d: "Vložki (materiali, podatki) se v procesu preoblikujejo v izložke (izdelke ali storitve z uporabno vrednostjo)." },
  { t: "Konkurenčne prednostne naloge", s: "prednostne naloge", subj: "mpsp", d: "Strateški cilji izdelave: stroški, kakovost, fleksibilnost, dobava (hitrost, zanesljivost)." },
  { t: "Vzvodi", s: "vzvod", subj: "mpsp", d: "Strateške odločitve v izdelavi (zmogljivost, materialni in informacijski tokovi, procesi), s katerimi dosegamo prednostne naloge." },
  { t: "Spider diagram", s: "spider", subj: "mpsp", d: "Radarski diagram za primerjavo konkurentov po dimenzijah konkuriranja (cena, kakovost, hitrost, prilagodljivost ...)." },
  { t: "Dejavniki kvalificiranja", s: "kvalificiranj", subj: "mpsp", d: "Lastnosti, ki morajo biti »dovolj dobre«, da stranka podjetje sploh upošteva; za razliko od dejavnikov zmagovanja." },
  { t: "Pretok in pretočni čas", s: "pretočni", subj: "mpsp", d: "Pretok = število enot na časovno enoto (P). Pretočni čas = čas, ki ga enota preživi v procesu (PČ). Z = P · PČ." },
  { t: "Procesni diagram", s: "procesni diagram", subj: "mpsp", d: "Grafični prikaz aktivnosti procesa in njihovega zaporedja (vzporedne ali zaporedne); iz njega določimo kritično pot." },
  { t: "Drseča sredina", s: "drseča", subj: "mpsp", d: "Metoda napovedi: povprečje zadnjih N obdobij; majhen N = hitrejši odziv, večji N = gladkejša napoved." },
  { t: "EOQ (ekonomična količina naročila)", s: "eoq", b: 1, subj: "mpsp", d: "Q* = √(2DS/H): količina, ki zmanjša vsoto stroškov naročanja in skladiščenja." },
  { t: "MRP", s: "mrp", b: 1, subj: "mpsp", d: "Planiranje potreb po materialu pri odvisnem povpraševanju (npr. komponente glede na končne izdelke)." },
  { t: "Odvisno in neodvisno povpraševanje", s: "odvisn", subj: "mpsp", d: "Neodvisno: po končnih izdelkih (napoved). Odvisno: po komponentah, izvedeno iz načrta končnih izdelkov (MRP)." },
  { t: "Management kakovosti", s: "kakovost", subj: "mpsp", d: "Obvladovanje kakovosti procesa in izdelka (skladnost s specifikacijami, lastnosti)." },
  { t: "Aktiva in pasiva", s: "aktiva", subj: "rac", d: "Aktiva = sredstva (v kaj je podjetje vložilo); pasiva = obveznosti do virov sredstev (kako je financirano)." },
  { t: "Terjatev in obveznost", s: "terjatev", subj: "rac", d: "Terjatev: pravica do plačila (do kupcev). Obveznost: dolg do dobaviteljev, banke, države." },
  { t: "Strošek, odhodek, izdatek", s: "izdatek", subj: "rac", d: "Strošek = poraba prvin (proizvedeno); odhodek = strošek prodanih učinkov; izdatek = odliv denarja." },
  { t: "Kosmati poslovni izid", s: "kosmati", subj: "rac", d: "Prihodki od prodaje − proizvajalni stroški prodanih proizvodov (ali nabavna vrednost prodanega blaga)." },
  { t: "Letno poročilo", s: "letno poročilo", subj: "rac", d: "Poslovno poročilo + računovodsko poročilo (izkazi, priloge s pojasnili, poročilo revizorja)." },
  { t: "Popravek vrednosti", s: "popravek", subj: "rac", d: "Kumulativna amortizacija osnovnega sredstva; nabavna − popravek = neodpisana vrednost." },
  { t: "Rezervacije", s: "rezervacij", subj: "rac", d: "Obveznosti negotove višine ali roka (garancije, tožbe) - oblikujemo jih v breme odhodkov." },
  { t: "Kontni načrt", s: "kontni", subj: "rac", d: "Seznam kontov podjetja po razredih (0-9); 1. številka = razred, 2. = skupina, 3. = sintetični konto." },
  { t: "Prvine in stroški", s: "naravne vrste", subj: "rac", d: "Naravne vrste stroškov: material, delo, amortizacija, storitve." },
  { t: "Poslovne prvine", s: "prvin", subj: "uvod", d: "Delovna sredstva, predmeti dela, delo in storitve." },
  { t: "Delovna sredstva", s: "delovna sredstva", subj: "uvod", d: "Prvine, ki ne spremenijo oblike, sodelujejo v več procesih in se postopno obrabijo (stroji, zgradbe)." },
  { t: "Predmeti dela", s: "predmet", subj: "uvod", d: "Prvine, ki se spremenijo v učinek in se porabijo v enem procesu (material, surovine)." },
  { t: "Angažiranje in trošenje", s: "angažiranj", subj: "uvod", d: "Angažiranje = pridobitev prvin (premoženje); trošenje = uporaba prvin (stroški)." },
  { t: "Minimaks načelo", s: "minimaks", subj: "uvod", d: "Dani rezultat z minimalno porabo vložkov ali z danimi vložki maksimalni rezultat." },
  { t: "Osnovna in obratna sredstva", s: "obratna sredstva", subj: "uvod", d: "Osnovna (OS): dolgoročna, obrabljajo se postopno. Obratna (ObS): obrnejo se večkrat v letu (zaloge, terjatve, denar)." },
  { t: "Koeficient obračanja", s: "obračanj", subj: "uvod", d: "KO = stroškovna vrednost proizvodnje / povprečno stanje ObS; dnevi vezave = 360/KO." },
  { t: "Lastna cena", s: "lastna cena", subj: "uvod", d: "Stroški ene enote učinka: neposredni material + delo + amortizacija + proizvodna režija + uprava, prodaja, nabava." },
  { t: "Ključ razporejanja", s: "ključ", subj: "uvod", d: "Odstotek za razporeditev splošnih stroškov: splošni stroški / osnova · 100." },
  { t: "Ekonomičnost, produktivnost, rentabilnost", s: "rentabilnost", subj: "uvod", d: "E = Q/C (prihodki/odhodki), PL = Q/L, rentabilnost = dobiček/kapital (ROE) ali sredstva (ROA)." },
  { t: "Likvidnost / solventnost", s: "solventnost", subj: "uvod", d: "Likvidnost = poravnava zapadlih obveznosti zdaj; solventnost = likvidnost na dolgi rok." },
  { t: "Marža in rabat", s: "rabat", subj: "uvod", d: "Marža = % od nabavne cene (trgovina); rabat = % popust od prodajne cene." },
  { t: "Agregatno povpraševanje (AD)", s: "agregatno povpraševanje", subj: "makro", d: "AD = C + I + G + NX; padajoča krivulja (nižje cene → večji obseg)." },
  { t: "Agregatna ponudba (AS)", s: "agregatna ponudba", subj: "makro", d: "Kratkoročno naraščajoča, dolgoročno navpična pri potencialnem BDP." },
  { t: "Inflacija", s: "inflacij", subj: "makro", d: "Splošno naraščanje cen; merimo z indeksom cen življenjskih potrebščin (CPI) ali deflatorjem BDP." },
  { t: "Stagflacija", s: "stagflacij", subj: "makro", d: "Upočasnjena rast ob visoki inflaciji (premik AS)." },
  { t: "Recesija", s: "recesij", subj: "makro", d: "Padec realnega BDP vsaj dve zaporedni četrtletji; sledi ekspanzija." },
  { t: "Multiplikator", s: "multiplikator", subj: "makro", d: "1/MNV = 1/(1 − MNP): koliko se poveča BDP ob povečanju avtonomnih izdatkov." },
  { t: "MNP / MNV", s: "mnp", b: 1, subj: "makro", d: "Mejna nagnjenost k potrošnji (MNP) in varčevanju (MNV); MNP + MNV = 1." },
  { t: "Fiskalna in monetarna politika", s: "monetarna politika", subj: "makro", d: "Fiskalna: davki in državni izdatki. Monetarna: količina denarja in obrestne mere (centralna banka)." },
  { t: "Centralna banka", s: "centralna banka", subj: "makro", d: "Izvaja monetarno politiko: diskontna stopnja, odprti trg, obvezne rezerve." },
  { t: "Obvezne rezerve", s: "rezerv", subj: "makro", d: "Delež vlog, ki jih mora banka zadržati pri centralni banki; denarni multiplikator = 1/rr." },
  { t: "Plačilna bilanca", s: "plačilna bilanca", subj: "makro", d: "Tekoči račun + kapitalsko-finančni račun + statistična napaka = 0." },
  { t: "Gini koeficient", s: "gini", subj: "makro", d: "Mera neenakosti (0 = popolna enakost, 1 = popolna neenakost); Lorenzova krivulja." },
  { t: "Elastičnost", s: "elastičn", subj: "mikro", d: "E = %ΔQ/%ΔP: občutljivost količine na spremembo cene (ali dohodka)." },
  { t: "Indiferenčna krivulja", s: "indiferen", subj: "mikro", d: "Kombinacije dobrin z enako koristnostjo; višja krivulja = večje zadovoljstvo." },
  { t: "MRS", s: "mrs", b: 1, subj: "mikro", d: "Mejna stopnja substitucije: koliko ene dobrine odstopiš za enoto druge ob enaki koristnosti = naklon indiferenčne krivulje." },
  { t: "Mejna koristnost", s: "mejna koristnost", subj: "mikro", d: "Dodatna koristnost zadnje enote; pada z porabo. Ravnotežje: MU_A/P_A = MU_B/P_B." },
  { t: "Substituta in komplementa", s: "substitut", subj: "mikro", d: "Substituta: nadomestka (premica); komplementa: dopolnjujoči se dobrini (L-oblika)." },
  { t: "Davčna incidenca", s: "incidenc", subj: "mikro", d: "Kdo dejansko nosi davek (potrošniki ali proizvajalci) - odvisno od elastičnosti." },
  { t: "SDLC", s: "sdlc", b: 1, subj: "inf", d: "Življenjski cikel razvoja informacijskega sistema (5 faz: načrtovanje, analiza, izdelava/nakup, uvajanje, vzdrževanje)." },
  { t: "Podatkovno skladišče", s: "skladišč", subj: "inf", d: "Zbirka očiščenih, strukturiranih podatkov iz več virov za analitiko in poročanje." },
  { t: "Opisna / diagnostična / napovedna / predpisna analitika", s: "analitik", subj: "inf", d: "Kaj se je zgodilo → zakaj → kaj se bo zgodilo → kaj naj naredimo." },
  { t: "Šifriranje", s: "šifrira", subj: "inf", d: "Pretvorba podatkov v nečitljivo obliko. Simetrično: isti ključ. Asimetrično: javni in zasebni ključ." },
  { t: "Hash", s: "hash", subj: "inf", d: "Enosmerna funkcija, ki iz besedila naredi »prstni odtis«; osnova e-podpisa." },
  { t: "MFA / 2FA", s: "mfa", b: 1, subj: "inf", d: "Večfaktorska avtentikacija: geslo (kar veš) + kartica/telefon (kar imaš) + biometrija (kar si)." },
  { t: "Phishing", s: "phishing", subj: "inf", d: "Goljufiva sporočila za izvabljanje gesel in podatkov (socialni inženiring)." },
  { t: "Ransomware", s: "ransomware", subj: "inf", d: "Zlonamerna programska oprema, ki šifrira podatke in zahteva odkupnino." },
  { t: "GDPR", s: "gdpr", b: 1, subj: "inf", d: "Splošna uredba o varstvu podatkov EU." },
  { t: "Blockchain", s: "blockchain", subj: "inf", d: "Porazdeljena (decentralizirana) glavna knjiga; zapise potrdi večina udeležencev, brez centralnega posrednika." },
  { t: "Pametna pogodba", s: "pametn", subj: "inf", d: "Program v blockchainu, ki se samodejno izvrši ob izpolnitvi pogojev (Ethereum)." },
  { t: "LLM", s: "llm", b: 1, subj: "inf", d: "Veliki jezikovni model: napove naslednji token; zato lahko haluciniral." },
  { t: "Halucinacija", s: "halucinacij", subj: "inf", d: "Jezikovni model poda statistično verjeten, a netočen odgovor; lastnost, ne hrošč." },
  { t: "Token / embedding", s: "embedding", subj: "inf", d: "Token = kos besedila; embedding = številska predstavitev pomena (king − man + woman ≈ queen)." },
];

function mixDecksOf(p) {
  const out = [];
  if (p.decks.filter((d) => !d.calc).length >= 2) out.push({ id: "__mix", name: "Mešani kviz" });
  if (p.decks.filter((d) => d.calc).length >= 2) out.push({ id: "__mixcalc", name: "Mešane računske naloge" });
  if (rankedPool(p).length >= RANKED_N) out.push({ id: "__ranked", name: "Ranked" });
  return out;
}

function aggregate(stats, year) {
  const items = [];
  DATA.filter((sem) => !year || sem.year === year).forEach((sem) => sem.subjects.forEach((su) => su.parts.forEach((p) => {
    p.decks.forEach((d) => { const ds = deckStats(stats, `${sem.id}/${su.id}/${p.id}/${d.id}`); if (ds) items.push({ semId: sem.id, subjId: su.id, partId: p.id, deckId: d.id, view: "quiz", cat: p.type, kind: "Kviz", subj: su.name, part: p.name, name: d.name, ds }); });
    mixDecksOf(p).forEach((d) => { const ds = deckStats(stats, `${sem.id}/${su.id}/${p.id}/${d.id}`); if (ds) items.push({ semId: sem.id, subjId: su.id, partId: p.id, deckId: d.id, view: "quiz", cat: p.type, kind: d.id === "__ranked" ? "Ranked" : "Mešani", subj: su.name, part: p.name, name: d.name, ds }); });
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
  if (r.view === "welcome") return "#/";
  const yr = (r.year || fallbackYear || storedYear());
  if (r.view === "home") return "#/letnik-" + yr;
  if (r.view === "allstats") return "#/letnik-" + yr + "/statistika";
  if (r.view === "profile") return "#/profil";
  if (r.view === "duel") return "#/izziv/" + r.id;
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
  if (!seg.length) return { view: "welcome" };
  const ym = /^letnik-(\d+)$/.exec(seg[0]);
  if (ym) { const y = +ym[1]; if (!YEARS.includes(y)) return home; return seg[1] === "statistika" ? { view: "allstats", year: y } : { view: "home", year: y }; }
  if (seg[0] === "profil") return { view: "profile" };
  if (seg[0] === "izziv" && seg[1]) return { view: "duel", id: seg[1] };
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
  // varovalo: med matchem odhod s strani (Nazaj, gumbi v glavi) zahteva potrditev, ker pomeni predajo
  const navGuard = useRef(null);            // { hash, ask: () => boolean }
  const ignoreHash = useRef(false);
  const setNavGuard = useCallback((g) => { navGuard.current = g; }, []);
  useEffect(() => {
    const onHash = () => {
      if (ignoreHash.current) { ignoreHash.current = false; return; }
      const g = navGuard.current;
      if (g && window.location.hash !== g.hash) {
        if (!g.ask()) { ignoreHash.current = true; window.location.hash = g.hash; return; }
        navGuard.current = null;
      }
      setRouteState(hashToRoute(window.location.hash)); window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  // go(...): nova stran → nov vnos v zgodovini brskalnika (Nazaj te vrne na prejšnjo stran)
  const setRoute = useCallback((r) => {
    const cur = routeRef.current;
    const yr = r.year || cur.year;
    const h = routeToHash(r, yr);
    const g = navGuard.current;
    if (g && h !== g.hash) { if (!g.ask()) return; navGuard.current = null; }
    if (h === window.location.hash) { setRouteState(hashToRoute(h)); window.scrollTo(0, 0); }
    else window.location.hash = h;
  }, []);
  const [dark, setDark] = useState(() => store.get("indeks.theme", "light") === "dark");
  const year = route.year || storedYear();
  useEffect(() => { if (route.year) store.set("indeks.year", route.year); }, [route.year]);
  const setYear = (y) => setRoute({ view: "home", year: y });
  const [gloss, setGloss] = useState(() => store.get("indeks.gloss", true) !== false);
  const [formulas, setFormulas] = useState(() => store.get("indeks.formule", true) !== false);
  const toggleFormulas = () => setFormulas((g) => { store.set("indeks.formule", !g); return !g; });
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
  const newer = useUpdateCheck();
  useEffect(() => {
    if (!userId) return;
    const meta = (session.user && session.user.user_metadata) || {};
    if (!meta.username) return;
    // ime iz metapodatkov registracije prepišemo v profil, če ga tam še ni (tudi kadar vrstice profila sploh še ni -
    // npr. registracija s potrditvijo e-pošte, kjer ob registraciji ni seje); lestvica bere ime iz profila
    supabase.from("profiles").select("username").eq("id", userId).maybeSingle().then(({ data, error }) => {
      if (!error && (!data || !data.username)) supabase.rpc("set_username", { p_username: meta.username }).then(() => {});
    });
  }, [userId]); // eslint-disable-line
  const { stats, record } = useCloudStats(userId || null);
  const comm = useCommunity(userId || null);
  const { soc, socErr, reload: reloadSocial } = useSocial(userId || null);
  // ko nasprotnik sprejme moj izziv (pending -> accepted v tej seji), skoči v match
  const seenCh = useRef(null);
  useEffect(() => {
    if (!soc) { seenCh.current = null; return; }
    const cur = {}; (soc.challenges || []).forEach((c) => { cur[c.id] = c.status; });
    if (seenCh.current) {
      const hit = (soc.challenges || []).find((c) => c.status === "accepted" && (c.my_status === "host" || c.my_status === "accepted") && seenCh.current[c.id] === "pending");
      const r = routeRef.current;
      if (hit && !(r.view === "duel" && r.id === hit.id)) setRoute({ view: "duel", id: hit.id });
    }
    seenCh.current = cur;
  }, [soc, setRoute]);

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
        <Header onHome={() => setRoute({ view: "welcome" })} home={route.view === "home" || route.view === "welcome"} dark={dark} onToggleTheme={toggleTheme} gloss={gloss} onToggleGloss={toggleGloss} formulas={formulas} onToggleFormulas={toggleFormulas}
          user={session && session.user} onSignOut={signOut} onProfile={() => setRoute({ view: "profile" })} badge={socialBadge(soc)} profileName={soc && soc.profile && soc.profile.username} charId={soc && soc.profile && unlocked(soc.record && soc.record.level, charById(soc.profile.character)) ? soc.profile.character : null} photo={soc && soc.profile && soc.profile.photo} />
        {newer && (
          <div className="ix-card" style={{ padding: "11px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", borderLeft: "3px solid var(--teal)" }}>
            <div style={{ flex: 1, fontSize: 14 }}><b>Na voljo je nova različica indeks.</b> <span style={{ color: "var(--ink2)" }}>Osveži, da dobiš najnovejše kvize in popravke.</span></div>
            <button onClick={() => window.location.reload()} className="ix-btn" style={{ background: "var(--teal)", color: "#fff", border: "1px solid var(--teal)", padding: "8px 14px" }}>Osveži</button>
          </div>
        )}
        {session && route.view !== "welcome" && <SocialBanner soc={soc} route={route} go={setRoute} reload={reloadSocial} />}
        {authLoading ? (
          <div style={{ textAlign: "center", color: "var(--ink2)", padding: "18vh 0", fontSize: 15 }}>Nalagam…</div>
        ) : route.view === "welcome" ? (
          <Welcome user={session && session.user} go={setRoute} />
        ) : !session ? (
          <Login year={route.view === "home" ? route.year : null} onBack={() => setRoute({ view: "welcome" })} />
        ) : (
          <>
            {route.view === "home" && <Home go={setRoute} stats={stats} year={year} setYear={setYear} comm={comm} />}
            {route.view === "allstats" && <OverallStatsView stats={stats} go={setRoute} year={year} comm={comm} userId={userId || null} />}
            {route.view === "subject" && <SubjectView route={route} stats={stats} go={setRoute} />}
            {route.view === "part" && <PartView route={route} stats={stats} go={setRoute} soc={soc} />}
            {route.view === "profile" && <ProfileView user={session.user} soc={soc} socErr={socErr} reload={reloadSocial} go={setRoute} />}
            {route.view === "duel" && <GlossCtx.Provider value={false}><DuelView route={route} go={setRoute} userId={userId} formulas={formulas} soc={soc} setNavGuard={setNavGuard} /></GlossCtx.Provider>}
            {route.view === "notes" && <NotesView route={route} go={setRoute} />}
            {route.view === "quiz" && <GlossCtx.Provider value={gloss}><QuizView route={route} go={setRoute} record={record} userId={userId || null} /></GlossCtx.Provider>}
            {route.view === "cards" && <FlashcardsView route={route} go={setRoute} record={record} />}
            {route.view === "stats" && <StatsView route={route} stats={stats} go={setRoute} comm={comm} />}
            {formulas && route.subj && ["quiz", "cards", "notes", "part", "subject"].indexOf(route.view) >= 0 && !(route.view === "quiz" && route.deck === "__ranked" && RANKED_FORMULAS.indexOf(route.subj) < 0) && <FormulaDock key={route.subj} subjId={route.subj} />}
          </>
        )}
        <Footer />
      </div>
    </div>
  );
}

/* Plavajoč gumb »Formule« + plošča z (iskalnimi) formulami predmeta. Brez ozadja, da lahko še naprej odgovarjaš. */
function FormulaDock({ subjId }) {
  const groups = FORMULAS[subjId];
  const [open, setOpen] = useState(() => { try { return sessionStorage.getItem("indeks.formOpen") === "1"; } catch (e) { return false; } });
  const [q, setQ] = useState("");
  const setO = (v) => { setOpen(v); try { sessionStorage.setItem("indeks.formOpen", v ? "1" : "0"); } catch (e) {} };
  if (!groups || !groups.length) return null;
  const ql = q.trim().toLowerCase();
  const shown = groups.map((g) => ({ g: g.g, items: g.items.filter((it) => !ql || (it.n + " " + it.f + " " + (it.d || "")).toLowerCase().indexOf(ql) >= 0) })).filter((g) => g.items.length);
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  return (
    <>
      {!open && (
        <button onClick={() => setO(true)} className="ix-formbtn" aria-label="Odpri formule">
          <Sigma size={16} /> Formule
        </button>
      )}
      {open && (
        <aside className="ix-formpanel" role="complementary" aria-label="Formule">
          <div className="ix-formhead">
            <Sigma size={16} color="var(--teal)" />
            <b style={{ flex: 1 }}>Formule · {total}</b>
            <button onClick={() => setO(false)} aria-label="Zapri formule" className="ix-formx"><X size={16} /></button>
          </div>
          <div className="ix-formsearch">
            <Search size={14} color="var(--ink2)" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Išči (npr. ROE, kv, beta, carina)…" />
            {q && <button onClick={() => setQ("")} aria-label="Počisti iskanje" className="ix-formx"><X size={13} /></button>}
          </div>
          <div className="ix-formbody">
            {shown.length === 0 && <div className="ix-chip" style={{ padding: 8 }}>Ni zadetkov.</div>}
            {shown.map((g) => (
              <section key={g.g}>
                <div className="ix-formgroup">{g.g}</div>
                {g.items.map((it) => (
                  <div key={it.n} className="ix-formitem">
                    <div className="ix-formname">{it.n}</div>
                    <div className="ix-formf">{it.f}</div>
                    {it.d && <div className="ix-formd">{it.d}</div>}
                  </div>
                ))}
              </section>
            ))}
          </div>
        </aside>
      )}
    </>
  );
}

/* ---- UVODNA STRAN: pozdrav, izbira letnika, viri, avtorske pravice (vidna tudi brez prijave) ---- */
const YEAR_INFO = {
  1: { title: "1. letnik", sub: "UPEŠ · 2025/26", sources: "predavanja in vaje 1. letnika UPEŠ (2025/26), sprotni zapiski s predavanj ter stari kolokviji in izpiti starejših generacij" },
  2: { title: "2. letnik", sub: "UPEŠ · 2026/27 · sproti dopolnjeno", sources: "predavanja in vaje 2. letnika UPEŠ (2026/27), sprotni zapiski s predavanj ter stari kolokviji in izpiti starejših generacij" },
};
const yearTotals = (y) => {
  const subs = DATA.filter((s) => s.year === y).flatMap((s) => s.subjects);
  return { subjects: subs.length, q: subs.reduce((n, s) => n + subjQ(s), 0), cards: subs.reduce((n, s) => n + subjCards(s), 0) };
};

function Welcome({ user, go }) {
  const last = store.get("indeks.year", null);
  const name = user && user.email ? user.email.split("@")[0].split(/[._-]/)[0] : "";
  const hello = name ? "Živjo, " + name.charAt(0).toUpperCase() + name.slice(1) + "!" : "Pozdravljen!";
  return (
    <div>
      <div className="ix-fade" style={{ marginBottom: 28 }}>
        <div className="ix-chip" style={{ color: "var(--terra)", marginBottom: 10 }}>{hello}</div>
        <h1 className="ix-serif" style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.04, letterSpacing: "-.025em", margin: 0 }}>
          Študijski pripomoček<br /><span style={{ color: "var(--terra)" }}>za študente EF UL.</span>
        </h1>
        <p style={{ color: "var(--ink2)", marginTop: 12, fontSize: 15, maxWidth: 560, lineHeight: 1.55 }}>
          Zapiski, kvizi z razlagami, računske naloge in kartice, razdeljeni po predmetih in kolokvijih.
          Izberi letnik, za katerega se učiš.
        </p>
      </div>

      <div className="ix-fade" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12, marginBottom: 34, animationDelay: "80ms" }}>
        {YEARS.map((y) => {
          const t = yearTotals(y), info = YEAR_INFO[y] || { title: y + ". letnik", sub: "" };
          return (
            <button key={y} className="ix-card" onClick={() => go({ view: "home", year: y })}
              style={{ textAlign: "left", padding: 20, cursor: "pointer", display: "flex", flexDirection: "column", gap: 12, borderLeft: y === last ? "3px solid var(--terra)" : undefined }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <span className="ix-serif" style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-.02em" }}>{info.title}</span>
                {y === last ? <span className="ix-chip" style={{ color: "var(--terra)" }}>zadnjič</span> : <ChevronRight size={18} color="var(--ink2)" />}
              </div>
              <span className="ix-chip">{info.sub}</span>
              <div style={{ fontSize: 14, color: "var(--ink2)", lineHeight: 1.5 }}>
                {t.subjects} predmetov · <b style={{ color: "var(--terra)" }}>{t.q} vprašanj</b>{t.cards > 0 && <> · {t.cards} kartic</>}
              </div>
            </button>
          );
        })}
      </div>

      <section className="ix-fade ix-card" style={{ padding: "18px 20px", marginBottom: 14, animationDelay: "160ms" }}>
        <div className="ix-sec" style={{ color: "var(--teal)" }}><FileText size={14} /> Od kod je snov</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.6, color: "var(--ink2)" }}>
          {YEARS.map((y) => YEAR_INFO[y] && <li key={y}><b style={{ color: "var(--ink)" }}>{y}. letnik:</b> {YEAR_INFO[y].sources}.</li>)}
          <li>Vprašanja, razlage in povzetke je pripravil avtor s pomočjo umetne inteligence. Lahko se zmotijo - pri dvomu preveri v gradivu predavateljev.</li>
          <li>indeks. je neuraden študentski pripomoček in ni povezan z Ekonomsko fakulteto UL. Gradiva predavateljev ostajajo last njihovih avtorjev.</li>
        </ul>
      </section>

      <section className="ix-fade ix-card" style={{ padding: "18px 20px", animationDelay: "220ms" }}>
        <div className="ix-sec" style={{ color: "var(--terra)" }}><GraduationCap size={14} /> Kdo stoji za tem</div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--ink2)" }}>
          indeks. je naredil <b style={{ color: "var(--ink)" }}>Leon Špiler</b>, študent UPEŠ na EF UL (smer Bančni in finančni management),
          najprej za lastno učenje. Napako ali predlog sporoči na{" "}
          <a href="mailto:leon.spiler@gmail.com" style={{ color: "var(--terra)", fontWeight: 700 }}>leon.spiler@gmail.com</a> ali na Instagramu{" "}
          <a href="https://instagram.com/spilerjev" target="_blank" rel="noopener noreferrer" style={{ color: "var(--terra)", fontWeight: 700 }}>@spilerjev</a>.
        </p>
      </section>
    </div>
  );
}

function Footer() {
  return (
    <footer className="ix-chip" style={{ marginTop: 48, paddingTop: 16, borderTop: "1px solid var(--line)", display: "flex", flexWrap: "wrap", gap: "6px 14px", justifyContent: "space-between", textTransform: "none", letterSpacing: ".02em", fontWeight: 500 }}>
      <span>© {new Date().getFullYear()} indeks. · Leon Špiler. Vse pravice pridržane.</span>
      <span>Neuraden pripomoček, ni povezan z EF UL.</span>
    </footer>
  );
}

function Header({ onHome, home, dark, onToggleTheme, gloss, onToggleGloss, formulas, onToggleFormulas, user, onSignOut, onProfile, badge, profileName, charId, photo }) {
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
        ? <button onClick={onProfile} className="ix-chip" title="Profil, prijatelji in izzivi 1v1"
            style={{ marginLeft: "auto", position: "relative", maxWidth: 200, overflow: "visible", background: "none", border: "1px solid var(--line)", borderRadius: 999, padding: "7px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            {photo ? <Pic photo={photo} name={profileName} size={20} /> : charId ? <CharArt id={charId} size={20} /> : <UserRound size={14} />}<span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{profileName || displayName(user)}</span>
            {badge > 0 && <span className="ix-badge">{badge}</span>}
          </button>
        : <span className="ix-chip" style={{ marginLeft: "auto" }}>EF · UPEŠ</span>}
      {user && (
        <button onClick={onToggleGloss} aria-label="Slovarček" aria-pressed={gloss} title={gloss ? "Slovarček je vklopljen (klik za izklop)" : "Slovarček je izklopljen (klik za vklop)"}
          style={{ background: gloss ? "var(--ink)" : "var(--paper2)", border: "1px solid var(--line)", borderRadius: 10, width: 36, height: 36, cursor: "pointer", display: "grid", placeItems: "center", color: gloss ? "var(--paper)" : "var(--ink2)" }}>
          <BookOpen size={17} />
        </button>
      )}
      {user && (
        <button onClick={onToggleFormulas} aria-label="Formule" aria-pressed={formulas} title={formulas ? "Formule so vklopljene (klik za izklop)" : "Formule so izklopljene (klik za vklop)"}
          style={{ background: formulas ? "var(--ink)" : "var(--paper2)", border: "1px solid var(--line)", borderRadius: 10, width: 36, height: 36, cursor: "pointer", display: "grid", placeItems: "center", color: formulas ? "var(--paper)" : "var(--ink2)" }}>
          <Sigma size={17} />
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
function PartView({ route, stats, go, soc }) {
  const sem = DATA.find((s) => s.id === route.sem);
  const subj = sem.subjects.find((s) => s.id === route.subj);
  const part = subj.parts.find((p) => p.id === route.part);
  const [duelPick, setDuelPick] = useState(false);
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

      {/* RANKED */}
      {rankedPool(part).length >= RANKED_N && (() => {
        const ds = deckStats(stats, `${sem.id}/${subj.id}/${part.id}/__ranked`);
        return (
          <div style={{ marginBottom: 22 }}>
            <div className="ix-sec" style={{ color: "var(--teal)" }}><Trophy size={14} /> Ranked</div>
            <button className="ix-card" onClick={() => go({ view: "quiz", sem: sem.id, subj: subj.id, part: part.id, deck: "__ranked" })}
              style={{ width: "100%", textAlign: "left", padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 13, borderLeft: "3px solid var(--teal)" }}>
              <span style={{ width: 34, height: 34, borderRadius: 10, background: "var(--teal)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Trophy size={16} color="#fff" />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>Ranked · {part.name}</div>
                <div className="ix-chip" style={{ marginTop: 2 }}>{RANKED_N} naključnih iz vseh kvizov · {fmtTime(RANKED_SECONDS)} · lestvica{ds && <span style={{ color: "var(--teal)" }}> · rešenih {ds.n}, povprečje {ds.avg}%</span>}</div>
              </div>
              <ChevronRight size={18} color="var(--ink2)" />
            </button>
            <button onClick={() => setDuelPick(true)} className="ix-card" style={{ width: "100%", textAlign: "left", padding: "11px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 13, borderLeft: "3px solid var(--terra)", marginTop: 9 }}>
              <span style={{ width: 34, height: 34, borderRadius: 10, background: "var(--terra)", display: "grid", placeItems: "center", flexShrink: 0 }}><Swords size={16} color="#fff" /></span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>Izzovi prijatelje · duel, trio, četverka</div>
                <div className="ix-chip" style={{ marginTop: 2 }}>ista vprašanja za vse · hkrati · klasika ali bitka z liki</div>
              </div>
              <ChevronRight size={18} color="var(--ink2)" />
            </button>
            {duelPick && <NewMatch soc={soc} presetLoc={{ sem, subj, part }} go={go} onClose={() => setDuelPick(false)} onPick={(id) => { setDuelPick(false); go({ view: "duel", id }); }} />}
          </div>
        );
      })()}

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

/* Ranked lestvica: Supabase tabela ranked_results + funkcija ranked_leaderboard (glej supabase/ranked.sql).
   Če SQL še ni zagnan, se prikaže obvestilo; lokalna statistika deluje ne glede na to. */
function Leaderboard({ partKey, userId, partName, bump }) {
  const [rows, setRows] = useState(null);
  const [mine, setMine] = useState(null);
  const [err, setErr] = useState(null);
  const [nick, setNick] = useState("");
  const [nickDraft, setNickDraft] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    (async () => {
      const lb = await supabase.rpc("ranked_leaderboard", { p_part_key: partKey });
      if (cancelled) return;
      if (lb.error) { setErr(lb.error.message); setRows(null); }
      else { setErr(null); setRows(lb.data || []); }
      let me = await supabase.from("ranked_results").select("correct,total,seconds,points,created_at").eq("part_key", partKey).eq("user_id", userId).order("created_at", { ascending: true });
      if (me.error) me = await supabase.from("ranked_results").select("correct,total,seconds,created_at").eq("part_key", partKey).eq("user_id", userId).order("created_at", { ascending: true }); // baza še brez stolpca points
      if (cancelled) return;
      if (!me.error && me.data) {
        const n = me.data.length;
        const rating = Math.max(0, me.data.reduce((s, r) => s + rankedDelta(r.correct, r.total, rankedEstPoints(r)), 0));
        const avg = n ? Math.round(me.data.reduce((s, r) => s + 100 * r.correct / r.total, 0) / n) : 0;
        const best = n ? Math.max(...me.data.map((r) => Math.round(100 * r.correct / r.total))) : 0;
        const avgSec = n ? Math.round(me.data.reduce((s, r) => s + r.seconds, 0) / n) : 0;
        setMine({ n, avg, best, avgSec, rating });
      }
      const pr = await supabase.from("profiles").select("username").eq("id", userId).maybeSingle();
      if (!cancelled && !pr.error && pr.data) { setNick(pr.data.username || ""); setNickDraft(pr.data.username || ""); }
    })();
    return () => { cancelled = true; };
  }, [partKey, userId, bump]);
  const [nickErr, setNickErr] = useState("");
  async function saveNick() {
    setNickErr("");
    setSaving(true);
    const r = await saveUsername(nickDraft);
    setSaving(false);
    if (r.error) { setNickErr(r.error); return; }
    setNick(r.username); setEditing(false);
  }
  const myRank = rows ? rows.findIndex((r) => r.is_me) : -1;
  if (!userId) return null;
  return (
    <div className="ix-card" style={{ padding: 18, marginTop: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
        <div className="ix-serif" style={{ fontWeight: 900, fontSize: 17, display: "flex", alignItems: "center", gap: 8 }}><Trophy size={16} color="var(--teal)" /> Lestvica · {partName}</div>
        <div className="ix-chip">{mine ? (mine.n >= RANKED_MIN_RUNS ? `${myRank >= 0 ? `ti: ${myRank + 1}. mesto · ` : "ti: "}${rankName(mine.rating)} · ${mine.rating} rank${rankNext(mine.rating) ? ` (do naziva ${rankNext(mine.rating)[0]} še ${rankNext(mine.rating)[1] - mine.rating})` : ""}` : `ti: ${mine.n}/${RANKED_MIN_RUNS} rešenih za uvrstitev${mine.n ? ` · ${mine.rating} rank` : ""}`) : ""}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap", fontSize: 13, color: "var(--ink2)" }}>
        <span>Na lestvici si prikazan kot <b style={{ color: "var(--ink)" }}>{nick || "skrajšan e-naslov"}</b>{nick ? " (z njim se lahko tudi prijaviš)" : ""}.</span>
        {!editing ? (
          <button onClick={() => setEditing(true)} style={{ background: "none", border: "1px solid var(--line)", borderRadius: 999, padding: "3px 10px", cursor: "pointer", color: "var(--ink)", fontSize: 12.5 }}>{nick ? "Spremeni uporabniško ime" : "Nastavi uporabniško ime"}</button>
        ) : (
          <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
            <input value={nickDraft} onChange={(e) => setNickDraft(e.target.value)} maxLength={20} placeholder="uporabniško ime (3–20 znakov)"
              onKeyDown={(e) => { if (e.key === "Enter") saveNick(); if (e.key === "Escape") setEditing(false); }}
              style={{ padding: "5px 9px", borderRadius: 8, border: "1px solid var(--line)", background: "var(--paper)", color: "var(--ink)", fontSize: 13 }} />
            <button onClick={saveNick} disabled={saving || nickDraft.trim().length < 3} style={{ background: "var(--teal)", color: "#fff", border: "none", borderRadius: 999, padding: "5px 11px", cursor: "pointer", fontSize: 12.5 }}>Shrani</button>
            <button onClick={() => { setEditing(false); setNickErr(""); }} style={{ background: "none", border: "1px solid var(--line)", borderRadius: 999, padding: "5px 11px", cursor: "pointer", color: "var(--ink)", fontSize: 12.5 }}>Prekliči</button>
          </span>
        )}
        {nickErr && <span style={{ color: "var(--terra)", width: "100%" }}>{nickErr}</span>}
      </div>
      {err ? (
        <div style={{ fontSize: 13, color: "var(--ink2)" }}>Lestvica še ni vklopljena (v Supabase je treba zagnati <code>supabase/ranked.sql</code> in <code>supabase/ranked-tocke.sql</code>). Tvoji rezultati se vseeno beležijo v statistiko.</div>
      ) : rows == null ? (
        <div style={{ fontSize: 13, color: "var(--ink2)" }}>Nalagam lestvico…</div>
      ) : rows.length === 0 ? (
        <div style={{ fontSize: 13, color: "var(--ink2)" }}>Še nihče ni rešil {RANKED_MIN_RUNS} ranked testov tega dela. Bodi prvi.</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
            <thead><tr style={{ color: "var(--ink2)", fontSize: 12, textAlign: "left" }}>
              <th style={{ padding: "4px 6px" }}>#</th><th style={{ padding: "4px 6px" }}>Ime</th><th style={{ padding: "4px 6px" }}>Naziv</th><th style={{ padding: "4px 6px", textAlign: "right" }}>Rank</th><th style={{ padding: "4px 6px", textAlign: "right" }}>Zadnji</th><th style={{ padding: "4px 6px", textAlign: "right" }}>Povprečje</th><th style={{ padding: "4px 6px", textAlign: "right" }}>Rešenih</th><th style={{ padding: "4px 6px", textAlign: "right" }}>Povpr. čas</th>
            </tr></thead>
            <tbody>
              {rows.map((r, k) => (
                <tr key={r.user_id || k} style={{ borderTop: "1px solid var(--line)", background: r.is_me ? "var(--okbg)" : "transparent", fontWeight: r.is_me ? 700 : 400 }}>
                  <td style={{ padding: "6px 6px" }}>{k + 1}</td>
                  <td style={{ padding: "6px 6px" }}>{r.name}{r.is_me ? " (ti)" : ""}</td>
                  <td style={{ padding: "6px 6px" }}>{r.rating != null ? rankName(r.rating) : "–"}</td>
                  <td style={{ padding: "6px 6px", textAlign: "right" }}>{r.rating != null ? r.rating : "–"}</td>
                  <td style={{ padding: "6px 6px", textAlign: "right", color: r.last_delta < 0 ? "var(--terra)" : "var(--teal)" }}>{r.last_delta != null ? (r.last_delta >= 0 ? "+" : "") + r.last_delta : "–"}</td>
                  <td style={{ padding: "6px 6px", textAlign: "right" }}>{Math.round(r.avg_pct)} %</td>
                  <td style={{ padding: "6px 6px", textAlign: "right" }}>{r.runs}</td>
                  <td style={{ padding: "6px 6px", textAlign: "right" }}>{fmtTime(r.avg_seconds)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function WrongReview({ wrong }) {
  if (!wrong || !wrong.length) return null;
  return (
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
  );
}

/* duel (1v1): ista vprašanja kot nasprotnik (duel.questions), čas po strežniku (duel.left), napredek sporoča DuelView;
   sicer kot ranked (brez razlag/slovarčka). Zaključni zaslon riše DuelView. */
/* Skupna ranked lestvica letnika: vsota rankov vseh delov tega letnika z vsaj RANKED_MIN_RUNS testi (rpc ranked_year_leaderboard, supabase/ranked-tocke.sql). */
function OverallLeaderboard({ userId, year }) {
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState(null);
  const sems = DATA.filter((sm) => sm.year === year).map((sm) => sm.id);
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    supabase.rpc("ranked_year_leaderboard", { p_sems: sems }).then(({ data, error }) => { if (cancelled) return; if (error) { setErr(error.message); setRows(null); } else { setErr(null); setRows(data || []); } });
    return () => { cancelled = true; };
  }, [userId, year]); // eslint-disable-line
  if (!userId) return null;
  const myRank = rows ? rows.findIndex((r) => r.is_me) : -1;
  const me = myRank >= 0 ? rows[myRank] : null;
  const cell = { padding: "6px 6px" }, right = { padding: "6px 6px", textAlign: "right" };
  return (
    <div className="ix-card" style={{ padding: 18, marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
        <div className="ix-serif" style={{ fontWeight: 900, fontSize: 17, display: "flex", alignItems: "center", gap: 8 }}><Trophy size={16} color="var(--teal)" /> Skupna ranked lestvica · {year}. letnik</div>
        <div className="ix-chip">{me ? `ti: ${myRank + 1}. mesto · ${me.rating} rank · ${me.parts} ${me.parts === 1 ? "del" : me.parts === 2 ? "dela" : "delov"}` : rows ? `ti: še brez dela s ${RANKED_MIN_RUNS} rešenimi testi` : ""}</div>
      </div>
      <div style={{ fontSize: 13, color: "var(--ink2)", marginBottom: 10 }}>Vsota rankov vseh delov {year}. letnika, v katerih imaš vsaj {RANKED_MIN_RUNS} ranked testov. Več delov in več reševanja pomeni višji rank.</div>
      {err ? (
        <div style={{ fontSize: 13, color: "var(--ink2)" }}>Skupna lestvica še ni vklopljena (v Supabase je treba zagnati <code>supabase/ranked-tocke.sql</code>).</div>
      ) : rows == null ? (
        <div style={{ fontSize: 13, color: "var(--ink2)" }}>Nalagam lestvico…</div>
      ) : rows.length === 0 ? (
        <div style={{ fontSize: 13, color: "var(--ink2)" }}>Še nihče nima dela s {RANKED_MIN_RUNS} rešenimi ranked testi. Bodi prvi.</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
            <thead><tr style={{ color: "var(--ink2)", fontSize: 12, textAlign: "left" }}>
              <th style={cell}>#</th><th style={cell}>Ime</th><th style={right}>Rank</th><th style={right}>Delov</th><th style={right}>Testov</th>
            </tr></thead>
            <tbody>
              {rows.map((r, k) => (
                <tr key={r.user_id || k} style={{ borderTop: "1px solid var(--line)", background: r.is_me ? "var(--okbg)" : "transparent", fontWeight: r.is_me ? 700 : 400 }}>
                  <td style={cell}>{k + 1}</td>
                  <td style={cell}>{r.name}{r.is_me ? " (ti)" : ""}</td>
                  <td style={right}>{r.rating}</td>
                  <td style={right}>{r.parts}</td>
                  <td style={right}>{r.runs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function QuizView({ route, go, record, userId, duel }) {
  const glossOn = React.useContext(GlossCtx);
  const sem = DATA.find((s) => s.id === route.sem);
  const subj = sem.subjects.find((s) => s.id === route.subj);
  const part = subj.parts.find((p) => p.id === route.part);
  const ranked = route.deck === "__ranked";
  const exam = ranked || !!duel;
  const duelRef = useRef(duel); duelRef.current = duel;
  const calcMix = route.deck === "__mixcalc";
  const mixed = route.deck === "__mix" || calcMix;
  const mixDecks = calcMix ? part.decks.filter((d) => d.calc) : part.decks.filter((d) => !d.calc);
  const deck = duel ? { id: "__1v1", name: "1v1 · " + part.name } : ranked ? { id: "__ranked", name: "Ranked · " + part.name } : mixed ? { id: route.deck, name: calcMix ? "Mešane računske naloge" : "Mešani kviz" } : part.decks.find((d) => d.id === route.deck);
  const pool = exam ? rankedPool(part) : mixed ? mixDecks.flatMap((d) => d.questions) : deck.questions;
  const mixN = duel ? duel.questions.length : ranked ? Math.min(RANKED_N, pool.length) : mixed ? Math.min(20, pool.length) : pool.length;
  const key = `${sem.id}/${subj.id}/${part.id}/${deck.id}`;
  const backToPart = () => go({ view: "part", sem: sem.id, subj: subj.id, part: part.id });

  function buildRun(doShuffle) {
    let base;
    if (duel) base = duel.questions;
    else if (ranked) base = rankedSample(pool, mixN, key);
    else if (mixed) { base = weightedSampleSmart(mixDecks, mixN); bumpMixUse(base); }
    else base = doShuffle ? shuffle(pool) : pool.slice();
    return base.map(processQuestion);
  }

  const [started, setStarted] = useState(!!duel);
  const [shuffleQ, setShuffleQ] = useState(false);
  const [run, setRun] = useState(() => (duel ? buildRun(true) : []));
  const [i, setI] = useState(duel ? Math.min(duel.resumeAnswered || 0, Math.max(0, duel.questions.length - 1)) : 0);
  const [picked, setPicked] = useState(null);
  const [correctCount, setCorrect] = useState(duel ? (duel.resumeCorrect || 0) : 0);
  const [wrong, setWrong] = useState([]);
  const [done, setDone] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [openGloss, setOpenGloss] = useState({});
  const [mSel, setMSel] = useState(null);
  const [mMap, setMMap] = useState({});
  const [gSel, setGSel] = useState(null);
  const [gMap, setGMap] = useState({});
  const [hideOpt, setHideOpt] = useState(null);   // 1v1 plonkec: skrit napačen odgovor
  const [reveal, setReveal] = useState(false);    // 1v1 goljufija: pokazan pravilni odgovor
  const [abBusy, setAbBusy] = useState(false);
  const saved = useRef(false);
  const attemptT = useRef(duel ? Date.now() : null);          // t sprotno zapisanega poskusa (isti t = isti poskus)
  const [left, setLeft] = useState(duel ? duel.left() : RANKED_SECONDS);
  const [lbBump, setLbBump] = useState(0);
  const [lastRun, setLastRun] = useState(null);   // ranked: točke in sprememba ranka pravkar končanega testa
  const qStartT = useRef(Date.now());             // ranked: začetek trenutnega vprašanja (hitrostni bonus)
  const pointsRef = useRef(0);                    // ranked: seštevek točk v tem testu
  const resumeState = !exam ? loadResume()[key] : null;
  const canResume = !!(resumeState && resumeState.run && resumeState.run.length && (resumeState.i > 0 || resumeState.picked != null));

  // Ranked: odštevanje; ob izteku se kviz konča (neodgovorjena vprašanja štejejo kot napačna)
  useEffect(() => {
    if (!exam || !started || done) return;
    const id = duel
      ? setInterval(() => setLeft(duelRef.current.left()), 500)      // 1v1: preostali čas po strežniški uri
      : setInterval(() => setLeft((l) => (l > 0 ? l - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [exam, started, done]); // eslint-disable-line
  useEffect(() => { if (exam && started && !done && left <= 0) finishRun(true); }, [left]); // eslint-disable-line

  // Tipkovnica: 1-6 / A-F izbere odgovor, Enter / presledek / → naprej, Enter začne, R ponovi
  const kb = useRef({});
  useEffect(() => {
    function onKey(e) {
      if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
      const t = e.target, tag = t && t.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (t && t.isContentEditable)) return;
      const st = kb.current, k = e.key;
      const isNext = k === "Enter" || k === " " || k === "ArrowRight";
      if (!st.started) {
        if (k === "Enter" || k === " ") { e.preventDefault(); st.begin(!!st.mixed); }
        else if (!st.mixed && (k === "m" || k === "M")) { e.preventDefault(); st.begin(true); }
        return;
      }
      if (st.done) { if (k === "r" || k === "R") { e.preventDefault(); st.restart(); } return; }
      const q = st.q; if (!q) return;
      if (!st.answered) {
        if (q.type === "match" || q.type === "grid") { if (k === "Enter" && st.canSubmit) { e.preventDefault(); st.submit(); } return; }
        const n = parseInt(k, 10);
        if (n >= 1 && n <= q.options.length) { e.preventDefault(); st.choose(n - 1); return; }
        const li = k.length === 1 ? "abcdef".indexOf(k.toLowerCase()) : -1;
        if (li >= 0 && li < q.options.length) { e.preventDefault(); st.choose(li); }
        return;
      }
      if (isNext) { e.preventDefault(); st.next(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  kb.current = { started, done, mixed, begin, restart };

  function reset() { setI(0); setPicked(null); setCorrect(0); setWrong([]); setDone(false); setMoreOpen(false); setOpenGloss({}); setMSel(null); setMMap({}); setGSel(null); setGMap({}); saved.current = false; attemptT.current = Date.now(); setLeft(RANKED_SECONDS); qStartT.current = Date.now(); pointsRef.current = 0; setLastRun(null); }
  function begin(doShuffle) { if (duel) return; setShuffleQ(doShuffle); const r = buildRun(doShuffle); setRun(r); reset(); setStarted(true); if (!exam) saveResume(key, null); }
  function restart() { if (duel) return; setRun(buildRun(shuffleQ)); reset(); if (!exam) saveResume(key, null); }
  function beginFocus() { setRun(weakestSample(pool, Math.min(20, pool.length)).map(processQuestion)); reset(); if (!exam) saveResume(key, null); }
  // Nadaljevanje nedokončanega kviza (shranjeno v tem brskalniku)
  function continueRun() {
    const r = resumeState; if (!r) return;
    let ii = r.i, pk = r.picked;
    const cq = r.run[ii];
    if (pk != null && cq && (cq.type === "match" || cq.type === "grid")) { ii = ii + 1; pk = null; } // ovire z mapami ne obnavljamo - naprej
    setShuffleQ(!!r.shuffleQ); setRun(r.run); setDone(false); setMoreOpen(false); setOpenGloss({}); setMSel(null); setMMap({}); setGSel(null); setGMap({});
    setCorrect(r.correctCount || 0); setWrong(r.wrong || []); saved.current = false; attemptT.current = r.attemptT || Date.now(); setLeft(RANKED_SECONDS);
    if (ii >= r.run.length) { // vse je bilo že odgovorjeno - samo še zaključi in zapiši
      saved.current = true;
      record(key, { t: attemptT.current, u: Date.now(), pct: Math.round(((r.correctCount || 0) / r.run.length) * 100), correct: r.correctCount || 0, answered: r.run.length, total: r.run.length, done: true });
      saveResume(key, null); setI(r.run.length - 1); setPicked(0); setStarted(true); setDone(true); return;
    }
    setI(ii); setPicked(pk); setStarted(true);
  }
  // Sprotni zapis poskusa v statistiko: isti t se ob vsakem odgovoru posodobi (šteje tudi nedokončan kviz)
  function liveRecord(nCorrect, nAnswered, isDone, extra) {
    const total = run.length || 1;
    record(key, { t: attemptT.current, u: Date.now(), pct: Math.round((nCorrect / Math.max(1, nAnswered)) * 100), correct: nCorrect, answered: nAnswered, total, done: !!isDone, ...(extra || {}) });
  }
  function persist(nCorrect, nWrong, ii, pk) {
    if (exam) return;
    saveResume(key, { run, i: ii, picked: pk, correctCount: nCorrect, wrong: nWrong, shuffleQ, attemptT: attemptT.current });
  }

  // UVODNI ZASLON — izbira vrstnega reda
  if (!started) {
    return (
      <div className="ix-fade">
        <button onClick={backToPart} className="ix-chip"
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: 0, marginBottom: 14 }}>
          <ChevronLeft size={15} /> {part.name}
        </button>
        {canResume && (
          <button className="ix-card" onClick={continueRun}
            style={{ width: "100%", textAlign: "left", padding: "15px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 13, borderLeft: "3px solid var(--teal)", marginBottom: 12 }}>
            <span style={{ width: 34, height: 34, borderRadius: 10, background: "var(--teal)", display: "grid", placeItems: "center", flexShrink: 0 }}><RotateCcw size={16} color="#fff" /></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>Nadaljuj nedokončan kviz</div>
              <div className="ix-chip" style={{ marginTop: 2 }}>pri vprašanju {Math.min(resumeState.run.length, resumeState.i + 1)} / {resumeState.run.length} · pravilnih {resumeState.correctCount || 0} · odgovori že štejejo v statistiko</div>
            </div>
            <ChevronRight size={18} color="var(--ink2)" />
          </button>
        )}
        <div className="ix-card" style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 6 }}>
            {ranked ? <Trophy size={20} color="var(--teal)" /> : mixed ? <Shuffle size={20} color="var(--terra)" /> : <FileText size={20} color="var(--ink)" />}
            <h2 className="ix-serif" style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>{deck.name}</h2>
          </div>
          {ranked ? (
            <>
              <p style={{ color: "var(--ink2)", fontSize: 14.5, margin: "0 0 6px" }}>
                <b style={{ color: "var(--ink)" }}>{mixN} naključnih vprašanj</b> iz vseh kvizov tega dela ({pool.length} v naboru), <b style={{ color: "var(--ink)" }}>{fmtTime(RANKED_SECONDS)} časa</b>. {RANKED_FORMULAS.indexOf(subj.id) >= 0 ? "Med reševanjem ni razlag in slovarčka; formule so dovoljene (kot statistični priročnik na izpitu)." : "Med reševanjem ni razlag, slovarčka in formul (kot na izpitu brez pripomočkov)."} Razlage so v pregledu na koncu.
              </p>
              <p style={{ color: "var(--ink2)", fontSize: 13, margin: "0 0 18px" }}>
                Točke: pravilen odgovor <b style={{ color: "var(--ink)" }}>100</b> + do <b style={{ color: "var(--ink)" }}>50</b> za hitrost (v {RANKED_Q_SECONDS} s). Rank: vsak test prinese <b style={{ color: "var(--ink)" }}>20 · (pravilni − {RANKED_N / 2}) + bonus/10</b>, torej pri manj kot polovici pravilnih rank pade, sicer zraste; rank dela je vsota vseh tvojih testov in nikoli ne pade pod 0. Nazivi od Bruca do Dekana. Na lestvico se uvrstiš po <b style={{ color: "var(--ink)" }}>{RANKED_MIN_RUNS} rešenih</b>. Ob izteku časa neodgovorjena vprašanja štejejo kot napačna. Prekinjen test se ne šteje.
              </p>
              <button onClick={() => begin(true)} className="ix-btn" style={{ background: "var(--teal)", color: "#fff", border: "1px solid var(--teal)", padding: "13px 22px", display: "flex", alignItems: "center", gap: 8 }}>
                <Trophy size={17} /> Začni ranked
              </button>
              <div className="ix-kbdhint"><span><kbd className="ix-kbd">Enter</kbd> začni</span></div>
            </>
          ) : mixed ? (
            <>
              <p style={{ color: "var(--ink2)", fontSize: 14.5, margin: "0 0 18px" }}>
                {mixN} naključnih {calcMix ? "računskih nalog" : "vprašanj"} iz {mixDecks.length} {calcMix ? "sklopov" : "kvizov"} tega dela. Vsakič dobiš drugačen nabor, odgovori so premešani.
              </p>
              <button onClick={() => begin(true)} className="ix-btn" style={{ background: "var(--terra)", color: "#fff", border: "1px solid var(--terra)", padding: "13px 22px", display: "flex", alignItems: "center", gap: 8 }}>
                <Shuffle size={17} /> Začni mešani kviz
              </button>
              <div className="ix-kbdhint"><span><kbd className="ix-kbd">Enter</kbd> začni</span></div>
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
              <div className="ix-kbdhint"><span><kbd className="ix-kbd">Enter</kbd> začni po vrsti</span><span><kbd className="ix-kbd">M</kbd> premešano</span></div>
            </>
          )}
        </div>
        {ranked && <Leaderboard partKey={key} userId={userId} partName={part.name} bump={lbBump} />}
      </div>
    );
  }

  const questions = run;
  const q = questions[i];
  const answered = picked !== null;
  kb.current = { ...kb.current, q, answered, choose, next,
    canSubmit: q.type === "match" ? Object.keys(mMap).length >= q.pairs.length : q.type === "grid" ? Object.keys(gMap).length >= q._blanks.length : false,
    submit: q.type === "match" ? submitMatch : submitGrid };
  const stemLow = (q.q || "").toLowerCase();
  const restLow = ((q.options ? q.options.join(" ") : (q.pairs ? q.pairs.map((p) => p.term + " " + p.def).join(" ") : "")) + " " + (q.explanation || "") + " " + (q.more || "")).toLowerCase();
  const inTxt = (g, t) => (g.b ? new RegExp("\\b" + g.s + "\\b").test(t) : t.includes(g.s));
  const defQ = /\bkaj (pomeni|je|prikazuje|opisuje|označuje|razumemo)\b|\bkako (opredelimo|definiramo)\b|\bopredeli\b|definicij|\bkatere vrste\b|\bkateri tip\b|\bza kaj se uporablja\b/.test(stemLow);
  const gloss = (!glossOn || exam || q.type === "match" || q.type === "grid") ? [] : GLOSSARY.filter((g) => {
    if (g.subj && (Array.isArray(g.subj) ? g.subj.indexOf(subj.id) < 0 : g.subj !== subj.id)) return false;
    const inRest = inTxt(g, restLow), inStem = inTxt(g, stemLow);
    if (!inRest && !inStem) return false;
    if (defQ && inStem) return false; // skrij termin, po katerem je študent vprašan
    return true;
  }).sort((x, y) => (inTxt(y, stemLow) ? 1 : 0) - (inTxt(x, stemLow) ? 1 : 0)).slice(0, 6);
  const wrongExpl = (!answered || picked === q.correct || !q.wrong) ? null : q.wrong[q.options[picked]];

  async function useAbility() {
    if (!duel || !duel.ability || duel.ability.used || abBusy) return;
    setAbBusy(true);
    const r = await duel.useAbility();
    setAbBusy(false);
    if (r === "cheat" && !answered) setReveal(true);
  }
  function usePlonkec() {
    if (!duel || answered || hideOpt != null || !q.options || q.options.length < 3 || !duel.useHint()) return;
    const wrongIdx = q.options.map((_, k) => k).filter((k) => k !== q.correct);
    setHideOpt(wrongIdx[Math.floor(Math.random() * wrongIdx.length)]);
  }
  function choose(idx) {
    if (answered || idx === hideOpt) return;
    setPicked(idx);
    const ok = idx === q.correct;
    recordQ(q, ok);
    if (ranked) pointsRef.current += rankedQPoints(ok, (Date.now() - qStartT.current) / 1000);
    const nc = correctCount + (ok ? 1 : 0), nw = ok ? wrong : [...wrong, { ...q, picked: idx }];
    setCorrect(nc); setWrong(nw);
    sfx(ok ? "correct" : "wrong");
    if (duel) duel.onAnswer(ok, ok ? null : { ...q, picked: idx });
    if (!exam) { liveRecord(nc, i + 1, false); persist(nc, nw, i, idx); }
  }
  function submitMatch() {
    if (answered) return;
    const allCorrect = q.pairs.every((_, t) => mMap[t] === t);
    setPicked(allCorrect ? 1 : 0);
    recordQ(q, allCorrect);
    const nc = correctCount + (allCorrect ? 1 : 0), nw = allCorrect ? wrong : [...wrong, { ...q, mMap: { ...mMap } }];
    setCorrect(nc); setWrong(nw);
    sfx(allCorrect ? "correct" : "wrong");
    if (duel) duel.onAnswer(allCorrect, allCorrect ? null : { ...q, mMap: { ...mMap } });
    if (!exam) { liveRecord(nc, i + 1, false); persist(nc, nw, i, allCorrect ? 1 : 0); }
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
    const nc = correctCount + (ok ? 1 : 0), nw = ok ? wrong : [...wrong, { ...q, gMap: { ...gMap } }];
    setCorrect(nc); setWrong(nw);
    sfx(ok ? "correct" : "wrong");
    if (duel) duel.onAnswer(ok, ok ? null : { ...q, gMap: { ...gMap } });
    if (!exam) { liveRecord(nc, i + 1, false); persist(nc, nw, i, ok ? 1 : 0); }
  }
  function finishRun(timeout) {
    if (saved.current) return;
    saved.current = true;
    const total = run.length;
    const answeredN = timeout ? i + (picked !== null ? 1 : 0) : total;
    if (duel) { setDone(true); duel.onFinish(); return; }
    if (ranked) {
      const seconds = Math.min(RANKED_SECONDS, RANKED_SECONDS - left);
      const points = pointsRef.current, delta = rankedDelta(correctCount, total, points);
      setLastRun({ points, delta });
      record(key, { t: attemptT.current, u: Date.now(), pct: Math.round((correctCount / total) * 100), correct: correctCount, answered: total, total, done: true, seconds, points, timeout: !!timeout });
      if (userId) {
        supabase.from("ranked_results").insert({ user_id: userId, part_key: key, correct: correctCount, total, seconds, points })
          .then(({ error }) => { if (error) console.warn("indeks ranked: " + error.message); setLbBump((b) => b + 1); });
      }
    } else {
      liveRecord(correctCount, answeredN, true);
      saveResume(key, null);
    }
    setDone(true);
  }
  function next() {
    if (i + 1 >= questions.length) finishRun(false);
    else { setI(i + 1); setPicked(null); setMoreOpen(false); setOpenGloss({}); setMSel(null); setMMap({}); setGSel(null); setGMap({}); setHideOpt(null); setReveal(false); qStartT.current = Date.now(); if (!exam) persist(correctCount, wrong, i + 1, null); }
  }

  if (done && duel) return <div className="ix-card" style={{ padding: 24, textAlign: "center", color: "var(--ink2)", fontSize: 14.5 }}>Shranjujem rezultat…</div>;
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
          <div className="ix-chip">{correctCount} / {questions.length} pravilnih · {deck.name}{ranked && <span> · čas {fmtTime(Math.min(RANKED_SECONDS, RANKED_SECONDS - left))}{left <= 0 ? " · čas je potekel" : ""}</span>}</div>
          {ranked && lastRun && <div style={{ marginTop: 10, fontSize: 15 }}><b>{lastRun.points} točk</b> · rank <b style={{ color: lastRun.delta >= 0 ? "var(--teal)" : "var(--terra)" }}>{lastRun.delta >= 0 ? "+" : ""}{lastRun.delta}</b></div>}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
            <button onClick={restart} className="ix-btn" style={{ background: "var(--ink)", color: "var(--paper)", border: "1px solid var(--ink)", padding: "11px 18px", display: "flex", alignItems: "center", gap: 7 }}>
              <RotateCcw size={16} /> Ponovi
            </button>
            <button onClick={backToPart} className="ix-btn" style={{ background: "transparent", color: "var(--ink)", border: "1px solid var(--ink)", padding: "11px 18px" }}>
              Nazaj na kolokvij
            </button>
          </div>
          <div className="ix-kbdhint" style={{ justifyContent: "center" }}><span><kbd className="ix-kbd">R</kbd> ponovi</span></div>
        </div>
        {ranked && <Leaderboard partKey={key} userId={userId} partName={part.name} bump={lbBump} />}

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
        <WrongReview wrong={wrong} />
      </div>
    );
  }

  return (
    <div className="ix-fade">
      <button onClick={duel ? duel.onLeave : backToPart} className="ix-chip"
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: 0, marginBottom: 14, color: duel ? "var(--red)" : undefined }}>
        {duel ? <><X size={15} /> Predaj match</> : <><ChevronLeft size={15} /> {part.name}</>}
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span className="ix-chip">{deck.name}</span>
        <span className="ix-chip">{i + 1} / {questions.length}{exam && <span style={{ marginLeft: 8, color: left <= 60 ? "var(--red)" : "var(--teal)", fontVariantNumeric: "tabular-nums" }}>⏱ {fmtTime(left)}</span>}</span>
      </div>
      <div className="ix-bar" style={{ marginBottom: duel ? 12 : 22 }}><span style={{ width: `${(i / questions.length) * 100}%` }} /></div>
      {duel && <DuelLive live={duel.live} />}

      <h2 className="ix-serif" style={{ fontSize: 21, fontWeight: 600, lineHeight: 1.3, margin: "0 0 20px" }}>{serifBars(q.q)}</h2>

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
          } else if (idx === hideOpt) st = { opacity: 0.3, textDecoration: "line-through" };
          else if (reveal && idx === q.correct) st = { borderColor: "var(--teal)", background: "var(--okbg)" };
          return (
            <button key={idx} className="ix-opt" disabled={answered || idx === hideOpt} onClick={() => choose(idx)} style={st}>
              <span style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <span style={{ fontWeight: 700, color: "var(--ink2)", fontSize: 13 }}><span className="ix-optkey-letter">{"ABCDEF"[idx]}</span><kbd className="ix-kbd ix-optkey-num">{idx + 1}</kbd></span>
                <span style={{ flex: 1 }}>{opt}</span>
                {answered && idx === q.correct && <CheckCircle2 size={18} color="var(--teal)" />}
                {answered && idx === picked && idx !== q.correct && <XCircle size={18} color="var(--red)" />}
              </span>
            </button>
          );
        })}
      </div>
      )}
      {duel && !answered && (duel.hints > 0 && hideOpt == null && q.options && q.options.length >= 3 || (duel.ability && duel.ability.active && !duel.ability.used)) && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 }}>
          {duel.hints > 0 && hideOpt == null && q.options && q.options.length >= 3 && <button onClick={usePlonkec} className="ix-pill">📝 Plonkec ({duel.hints}) · skrij en napačen odgovor</button>}
          {duel.ability && duel.ability.active && !duel.ability.used && <button onClick={useAbility} disabled={abBusy} className="ix-pill on" title={duel.ability.desc}>✨ {duel.ability.name} · {duel.ability.desc.replace(/^Aktivno \(1×\): /, "")}</button>}
        </div>
      )}
      {duel && duel.ability && duel.ability.armed && !answered && <div style={{ fontSize: 12.5, color: "var(--terra)", marginTop: 8, fontWeight: 600 }}>Vse ali nič je aktivno: pravilen odgovor = 3× škoda, napačen = −20 HP.</div>}
      {!answered && (
        <div className="ix-kbdhint">
          {q.type === "match" || q.type === "grid"
            ? <span><kbd className="ix-kbd">Enter</kbd> preveri</span>
            : <span><kbd className="ix-kbd">1</kbd>–<kbd className="ix-kbd">{q.options.length}</kbd> izberi odgovor</span>}
        </div>
      )}

      {answered && (
        <div className="ix-fade" style={{ marginTop: 18 }}>
          {!exam && wrongExpl && (
            <div className="ix-card" style={{ padding: 14, fontSize: 13.5, color: "var(--ink2)", marginBottom: 14, borderLeft: "3px solid var(--red)" }}>
              <b style={{ color: "var(--ink)" }}>Zakaj ne ta odgovor:</b> {wrongExpl}
            </div>
          )}
          {!exam && q.explanation && (
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
          <div className="ix-kbdhint" style={{ justifyContent: "flex-end" }}><span><kbd className="ix-kbd">Enter</kbd> / <kbd className="ix-kbd">presledek</kbd> {i + 1 >= questions.length ? "zaključi" : "naprej"}</span></div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   ARENA: profil, prijatelji, matchi za 2–4 igralce (Supabase: supabase/1v1.sql), liki (characters.js)
   Povabila, sprejem, napredek in udarci v živo prek Realtime (postgres_changes), kot rezerva periodično branje.
   ========================================================================= */
/* Zvoki (WebAudio, brez datotek): pravilno/napačno, klik, povabilo, udarec, kritik, zmaga, poraz. Izklop: profil -> Zvoki. */
const SOUND_KEY = "indeks.sound";
const soundOn = () => store.get(SOUND_KEY, true) !== false;
let _actx = null;
function sfx(kind) {
  if (!soundOn()) return;
  try {
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    _actx = _actx || new AC(); const ctx = _actx; if (ctx.state === "suspended") ctx.resume();
    const t0 = ctx.currentTime;
    const tone = (f, start, dur, type, vol) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = type || "sine"; o.frequency.setValueAtTime(f, t0 + start); g.gain.setValueAtTime(0.0001, t0 + start); g.gain.exponentialRampToValueAtTime(vol || 0.12, t0 + start + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t0 + start + dur); o.connect(g); g.connect(ctx.destination); o.start(t0 + start); o.stop(t0 + start + dur + 0.02); };
    const S = { click: () => tone(900, 0, 0.04, "square", 0.04), correct: () => { tone(660, 0, 0.09); tone(990, 0.09, 0.14); }, wrong: () => tone(160, 0, 0.22, "sawtooth", 0.08),
      invite: () => { tone(784, 0, 0.12); tone(1046, 0.14, 0.2); }, hit: () => tone(220, 0, 0.1, "triangle", 0.1), crit: () => { tone(1200, 0, 0.06, "square", 0.08); tone(300, 0.05, 0.16, "sawtooth", 0.1); },
      hurt: () => tone(120, 0, 0.18, "sawtooth", 0.1), win: () => { tone(523, 0, 0.12); tone(659, 0.12, 0.12); tone(784, 0.24, 0.12); tone(1046, 0.36, 0.3); }, lose: () => { tone(392, 0, 0.18); tone(311, 0.18, 0.18); tone(262, 0.36, 0.3, "sine", 0.1); } };
    if (S[kind]) S[kind]();
  } catch (e) {}
}
/* XP in nivoji (battle pass): številke v characters.js in supabase/1v1.sql. */
const levelOf = (xp) => CHARS.LEVELS.filter((t) => t <= (xp || 0)).length;
const levelXp = (lvl) => CHARS.LEVELS[Math.min(CHARS.LEVELS.length, Math.max(1, lvl)) - 1];
const nextLevelXp = (lvl) => (lvl < CHARS.LEVELS.length ? CHARS.LEVELS[lvl] : null);
const unlocked = (level, obj) => (obj && obj.unlock ? obj.unlock : 1) <= (level || 1);
const DUEL_GRACE = 16;                   // s po izteku: nedokončane strežnik označi kot odšle
const DUEL_BATTLE_N = 30;                // bitka: nabor vprašanj (match traja, dokler nekomu ne zmanjka HP, največ toliko vprašanj)
const DUEL_BATTLE_SECONDS = 900;         // bitka: časovna omejitev
const SIZE_LABEL = { 2: "Duel", 3: "Trio", 4: "Četverka" };
const MODE_LABEL = { classic: "Klasika", basic: "Bitka", battle: "Bitka z liki" };
const isBattle = (mode) => mode === "basic" || mode === "battle";   // oba bojna načina (HP)
const LETNIK_LABELS = { 1: "1. letnik", 2: "2. letnik", 3: "3. letnik", 4: "1. letnik mag.", 5: "2. letnik mag." };
const SMER_SUGGEST = ["UPEŠ", "VPŠ", "Bančni in finančni management", "Računovodstvo in revizija", "Trženje", "Management", "Mednarodno poslovanje", "Poslovna informatika", "Podjetništvo", "Poslovna logistika", "Turizem", "Ekonomija", "Denar in finance"];
const charById = (id) => (id === "basic" ? CHARS.BASIC : CHARS.CHARACTERS.find((c) => c.id === id)) || CHARS.CHARACTERS[0];
const itemById = (id) => CHARS.ITEMS.find((p) => p.id === id) || null;
const ACTIVE_ABILITIES = ["stimulus", "allin", "tariff", "cheat"];
const splitItems = (perk) => (perk || "").split(",").map((x) => x.trim()).filter((x) => itemById(x)).slice(0, 2);
/* Lik + oprema (do 2) -> številke za strežnik (duel_ready jih še omeji na varne meje). */
function charBuild(charId, items) {
  const c = charById(charId);
  const its = (Array.isArray(items) ? items : splitItems(items)).map(itemById).filter(Boolean).slice(0, 2);
  const st = { hp: c.stats.hp, atk: c.stats.atk, crit: c.stats.crit, streak: c.stats.streak, quick: 0, shield: 0, heal: 0, healEvery: 3, penaltyAt: 2, hints: 0 };
  its.forEach((it) => Object.keys(it.mod).forEach((k) => { st[k] = (k === "healEvery" || k === "penaltyAt") ? it.mod[k] : Math.round((st[k] + it.mod[k]) * 100) / 100; }));
  if (c.ability && c.ability.id === "iron") st.shield = Math.round((st.shield + 0.15) * 100) / 100;   // Železna lady: pasivni ščit
  return { id: c.id, name: c.name, items: its.map((x) => x.id).join(","), ability: c.ability ? c.ability.id : "", ...st };
}
/* Profilna slika uporabnika (Storage bucket avatars); brez nje začetnica imena. */
function Pic({ photo, name, size, style }) {
  const [ok, setOk] = useState(true);
  useEffect(() => { setOk(true); }, [photo]);
  const box = { width: size, height: size, borderRadius: "50%", flexShrink: 0, ...(style || {}) };
  if (!photo || !ok) return <span title={name} style={{ ...box, background: "var(--terra)", color: "#fff", display: "grid", placeItems: "center", fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: Math.round(size * 0.46), lineHeight: 1 }}>{(name || "?").charAt(0).toUpperCase()}</span>;
  return <img src={photo} alt={name} title={name} onError={() => setOk(false)} style={{ ...box, objectFit: "cover", display: "block", border: "1px solid var(--line)" }} />;
}
/* Nalaganje profilne slike: pomanjšaj na 256 px (canvas), JPEG, v bucket avatars/<uid>.jpg, URL shrani v profil. */
async function uploadPhoto(file, userId) {   // vrne URL; zapis v profil opravi klicatelj (update_profile)
  const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error("Slike ni mogoče prebrati.")); i.src = URL.createObjectURL(file); });
  const S = 256, c = document.createElement("canvas"); c.width = S; c.height = S;
  const side = Math.min(img.width, img.height), sx = (img.width - side) / 2, sy = (img.height - side) / 2;
  c.getContext("2d").drawImage(img, sx, sy, side, side, 0, 0, S, S);
  const blob = await new Promise((res) => c.toBlob(res, "image/jpeg", 0.86));
  if (!blob) throw new Error("Slike ni mogoče pretvoriti.");
  const path = userId + ".jpg";
  const up = await supabase.storage.from("avatars").upload(path, blob, { upsert: true, contentType: "image/jpeg", cacheControl: "3600" });
  if (up.error) throw new Error(/bucket/i.test(up.error.message) ? "Shramba za slike še ni vklopljena (supabase/1v1.sql)." : up.error.message);
  const url = SUPABASE_URL + "/storage/v1/object/public/avatars/" + path + "?v=" + Date.now();
  return url;
}
/* Slika lika (docs/liki/<id>.png); dokler je ni, začetnice na temnem ozadju. */
function CharArt({ id, size, style }) {
  const c = charById(id);
  const [ok, setOk] = useState(true);
  useEffect(() => { setOk(true); }, [id]);
  const box = { width: size, height: size, borderRadius: Math.round(size * 0.28), flexShrink: 0, ...(style || {}) };
  if (!ok) return <span title={c.name} style={{ ...box, background: "var(--ink)", color: "var(--paper)", display: "grid", placeItems: "center", fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: Math.round(size * 0.42), lineHeight: 1 }}>{c.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2)}</span>;
  return <img src={"liki/" + c.id + ".png"} alt={c.name} title={c.name} onError={() => setOk(false)} style={{ ...box, objectFit: "cover", background: "var(--paper2)", border: "1px solid var(--line)", display: "block" }} />;
}
/* Napaka RPC v slovenščini; če tabel/funkcij še ni, povej, katero SQL datoteko je treba zagnati. */
function rpcErr(error, fallback) {
  if (!error) return null;
  const m = error.message || "";
  if (/does not exist|schema cache|could not find/i.test(m)) return "Arena še ni vklopljena (v Supabase zaženi supabase/1v1.sql).";
  return m.replace(/^[A-Z0-9]+: /, "") || fallback || "Napaka.";
}
/* ID vprašanja za match: besedilo + možnosti (qid uporablja samo besedilo, ki se lahko ponovi). */
function duelQid(q) {
  const s = (q.q || "") + "|" + (q.options || []).join("|");
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return "d" + (h >>> 0).toString(36);
}
const partByKey = (key) => {
  const [semId, subjId, partId] = (key || "").split("/");
  const sem = DATA.find((s) => s.id === semId); const subj = sem && sem.subjects.find((s) => s.id === subjId); const part = subj && subj.parts.find((p) => p.id === partId);
  return part ? { sem, subj, part } : null;
};
/* Vsi deli, v katerih je mogoč match (dovolj vprašanj z možnostmi). */
function duelParts() {
  const out = [];
  DATA.forEach((sem) => sem.subjects.forEach((subj) => subj.parts.forEach((part) => { if (rankedPool(part).length >= RANKED_N) out.push({ sem, subj, part, key: `${sem.id}/${subj.id}/${part.id}` }); })));
  return out;
}
/* Pogoji zmage v klasiki (kot v Call of Duty): število vprašanj, čas ali cilj točk. */
const WIN_RULES = [
  { id: "q10", rule: "questions", value: 10, label: "10 vprašanj", desc: "Vsak reši 10 vprašanj; zmaga največ točk." },
  { id: "q20", rule: "questions", value: 20, label: "20 vprašanj", desc: "Vsak reši 20 vprašanj; zmaga največ točk." },
  { id: "t5", rule: "time", value: 300, label: "5 minut", desc: "Kolikor vprašanj utegneš v 5 minutah; zmaga največ točk." },
  { id: "t10", rule: "time", value: 600, label: "10 minut", desc: "Kolikor vprašanj utegneš v 10 minutah; zmaga največ točk." },
  { id: "p1000", rule: "points", value: 1000, label: "do 1000 točk", desc: "Prvi, ki zbere 1000 točk, konča match." },
];
const winRuleText = (st) => st.mode !== "classic" ? "" : st.win_rule === "time" ? `${fmtTime(st.seconds_limit)} časa` : st.win_rule === "points" ? `do ${st.win_value} točk` : `${(st.question_ids || []).length} vprašanj`;
async function createChallenge(opponentIds, sem, subj, part, mode, winId) {
  const pool = rankedPool(part);
  const battle = isBattle(mode);
  const wr = (!battle && WIN_RULES.find((w) => w.id === winId)) || WIN_RULES[0];
  const want = battle ? DUEL_BATTLE_N : wr.rule === "questions" ? wr.value : 60;
  const seen = new Set(); const ids = [];
  shuffle(pool).forEach((q) => { const id = duelQid(q); if (ids.length < want && !seen.has(id)) { seen.add(id); ids.push(id); } });
  const { data, error } = await supabase.rpc("create_challenge", { p_opponents: opponentIds, p_part_key: `${sem.id}/${subj.id}/${part.id}`, p_part_name: `${subj.name} · ${part.name}`, p_question_ids: ids, p_mode: mode || "classic",
    p_seconds_limit: battle ? DUEL_BATTLE_SECONDS : wr.rule === "time" ? wr.value : wr.rule === "points" ? 900 : RANKED_SECONDS, p_win_rule: wr.rule, p_win_value: wr.rule === "points" ? wr.value : null });
  return { id: data, error: rpcErr(error) };
}
/* Vprašanja matcha iz shranjenih ID-jev (vsi igralci dobijo ista, v istem vrstnem redu). */
function resolveDuel(st) {
  const loc = partByKey(st.part_key);
  if (!loc) return { error: "Tega dela ni več v aplikaciji." };
  const byId = {};
  rankedPool(loc.part).forEach((q) => { const id = duelQid(q); if (!byId[id]) byId[id] = q; });
  const qs = (st.question_ids || []).map((id) => byId[id]).filter(Boolean);
  if (qs.length !== (st.question_ids || []).length) return { ...loc, questions: qs, error: "Vprašanja se ne ujemajo s to različico aplikacije. Osveži stran (nova različica) in poskusi znova." };
  return { ...loc, questions: qs };
}

/* Družabno stanje (profil, prijatelji, prošnje, matchi) v enem klicu + Realtime osvežitev. */
function useSocial(userId) {
  const [soc, setSoc] = useState(null);
  const [err, setErr] = useState(null);
  const loadRef = useRef(null);
  useEffect(() => {
    if (!userId) { setSoc(null); setErr(null); loadRef.current = null; return; }
    let cancelled = false;
    const load = async () => {
      const { data, error } = await supabase.rpc("social_state");
      if (cancelled) return;
      if (error) { setErr(rpcErr(error)); return; }
      setErr(null); setSoc(data || null);
    };
    loadRef.current = load;
    load();
    const onVis = () => { if (document.visibilityState === "visible") load(); };
    document.addEventListener("visibilitychange", onVis);
    const iv = setInterval(() => { if (document.visibilityState === "visible") load(); }, 45000);
    const ch = supabase.channel("social:" + userId)
      .on("postgres_changes", { event: "*", schema: "public", table: "friendships", filter: "addressee=eq." + userId }, () => load())
      .on("postgres_changes", { event: "*", schema: "public", table: "friendships", filter: "requester=eq." + userId }, () => load())
      .on("postgres_changes", { event: "*", schema: "public", table: "challenge_players", filter: "user_id=eq." + userId }, () => load())   // sprememba statusa matcha prek sprožilca osveži tudi te vrstice
      .subscribe();
    return () => { cancelled = true; clearInterval(iv); document.removeEventListener("visibilitychange", onVis); supabase.removeChannel(ch); };
  }, [userId]);
  const reload = useCallback(() => { if (loadRef.current) loadRef.current(); }, []);
  return { soc, socErr: err, reload };
}
const socialBadge = (soc) => soc ? (soc.requests_in || []).length + (soc.challenges || []).filter((c) => c.status === "pending" && c.my_status === "invited").length : 0;
const statPair = (s, k) => `${(s && s[k + "_w"]) || 0}–${(s && s[k + "_l"]) || 0}`;
/* Vrstica javne statistike igralca: zmage–porazi po velikosti, bitke, vadba. */
function StatsLine({ s, full }) {
  if (!s) return null;
  return (
    <span className="ix-chip" style={{ display: "inline-flex", gap: "4px 10px", flexWrap: "wrap", textTransform: "none", letterSpacing: ".04em" }}>
      {s.level != null && <span title={`${s.xp || 0} XP`}>nivo <b style={{ color: "var(--terra)" }}>{s.level}</b></span>}
      <span title="Duel: zmage–porazi">duel <b style={{ color: "var(--ink)" }}>{statPair(s, "duel")}</b></span>
      <span title="Trio: zmage–porazi">trio <b style={{ color: "var(--ink)" }}>{statPair(s, "trio")}</b></span>
      <span title="Četverka: zmage–porazi">četverka <b style={{ color: "var(--ink)" }}>{statPair(s, "squad")}</b></span>
      <span title="Zmage v bitkah">bitke <b style={{ color: "var(--terra)" }}>{s.battle_w || 0}</b></span>
      {(full || s.attempts > 0) && <span title="Rešeni kvizi · povprečje">vadba <b style={{ color: "var(--teal)" }}>{s.attempts || 0}×{s.avg_pct != null ? ` · ${s.avg_pct} %` : ""}</b></span>}
    </span>
  );
}

/* Modalno okno se izriše v .ix-root (portal): znotraj .ix-fade (animacija transform) bi position:fixed veljal glede na vsebino, ne na okno. */
function Modal({ title, icon, onClose, children }) {
  useEffect(() => { const k = (e) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [onClose]);
  useEffect(() => { const prev = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = prev; }; }, []);
  const host = document.querySelector(".ix-root") || document.body;
  return createPortal(
    <div className="ix-modalbg" onClick={onClose}>
      <div className="ix-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={title}>
        <div className="ix-modalhead">
          {icon}<b style={{ fontSize: 15 }}>{title}</b>
          <button onClick={onClose} aria-label="Zapri" className="ix-formx" style={{ marginLeft: "auto" }}><X size={17} /></button>
        </div>
        <div className="ix-modalbody">{children}</div>
      </div>
    </div>,
    host
  );
}

/* Izbira lika in loadouta (profil, lobby bitke). */
function CharPicker({ character, items, onChange, compact, level }) {
  const lvl = level || 1;
  const its = splitItems(Array.isArray(items) ? items.join(",") : items).filter((x) => unlocked(lvl, itemById(x)));
  const b = charBuild(unlocked(lvl, charById(character)) ? character : CHARS.CHARACTERS[0].id, its);
  const toggleItem = (id) => onChange(b.id, its.includes(id) ? its.filter((x) => x !== id) : its.length >= 2 ? [its[1], id] : [...its, id]);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: compact ? "repeat(auto-fill,minmax(120px,1fr))" : "repeat(auto-fill,minmax(150px,1fr))", gap: 8 }}>
        {CHARS.CHARACTERS.map((c) => {
          const on = c.id === b.id, lock = !unlocked(lvl, c);
          return (
            <button key={c.id} onClick={() => { if (!lock) onChange(c.id, its); }} disabled={lock} title={lock ? `Odkleneš na nivoju ${c.unlock}` : c.name} className="ix-card" style={{ padding: "10px 11px", textAlign: "left", cursor: lock ? "default" : "pointer", opacity: lock ? .5 : 1, borderColor: on ? "var(--terra)" : undefined, background: on ? "var(--okbg)" : undefined, display: "grid", gap: 3 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><CharArt id={c.id} size={compact ? 36 : 48} /><div><b style={{ fontSize: 14 }}>{c.name}</b><div className="ix-chip" style={{ fontSize: 10 }}>{lock ? <><Lock size={10} style={{ verticalAlign: -1 }} /> nivo {c.unlock}</> : c.title}</div></div></div>
              {!compact && <div style={{ fontSize: 12, color: "var(--ink2)", lineHeight: 1.4 }}>{c.desc}</div>}
              <div className="ix-chip" style={{ fontSize: 10.5, letterSpacing: ".05em", textTransform: "none" }}>HP {c.stats.hp} · napad {c.stats.atk} · kritik {c.stats.crit} % · serija +{Math.round(c.stats.streak * 100)} %</div>
              {c.ability && <div style={{ fontSize: 12, lineHeight: 1.4, marginTop: 2 }}><b style={{ color: "var(--terra)" }}>{c.ability.name}:</b> <span style={{ color: "var(--ink2)" }}>{c.ability.desc}</span></div>}
            </button>
          );
        })}
      </div>
      <div className="ix-chip" style={{ margin: "12px 0 6px" }}>Oprema (do 2 stvari · {its.length}/2)</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {CHARS.ITEMS.map((it) => { const lock = !unlocked(lvl, it); return (
          <button key={it.id} onClick={() => { if (!lock) toggleItem(it.id); }} disabled={lock} className={"ix-pill" + (its.includes(it.id) ? " on" : "")} style={lock ? { opacity: .45 } : undefined} title={lock ? `Odkleneš na nivoju ${it.unlock}` : it.desc}>{lock && <Lock size={10} style={{ verticalAlign: -1, marginRight: 3 }} />}{it.name}{!compact && <span style={{ opacity: .8, fontWeight: 400 }}> · {lock ? `nivo ${it.unlock}` : it.desc}</span>}</button>
        ); })}
      </div>
      <div style={{ fontSize: 12.5, color: "var(--ink2)", marginTop: 10, lineHeight: 1.5 }}>Izbrano: <b style={{ color: "var(--ink)" }}>{b.name}{its.length ? " + " + its.map((x) => itemById(x).name).join(" + ") : ""}</b> · HP {b.hp} · napad {b.atk} · kritik {b.crit} % (2×) · serija +{Math.round(b.streak * 100)} %/odg.{b.quick ? ` · hitri odgovor +${Math.round(b.quick * 100)} %` : ""}{b.shield ? ` · ščit ${Math.round(b.shield * 100)} %` : ""}{b.heal ? ` · vsak ${b.healEvery}. zaporedni pravilni +${b.heal} HP` : ""}{b.hints ? ` · plonkec ×${b.hints}` : ""} · kazen −10 HP pri {b.penaltyAt} zaporednih napačnih.</div>
    </div>
  );
}

/* Nov match: izbira prijateljev (1–3), načina in kviza. presetFriend / presetLoc predizbereta. */
function NewMatch({ soc, presetFriend, presetLoc, onClose, onPick, go }) {
  const friends = (soc && soc.friends) || [];
  const [sel, setSel] = useState(() => (presetFriend ? [presetFriend.user_id] : []));
  const [mode, setMode] = useState(() => store.get("indeks.arena.mode", "classic"));
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const all = useMemo(duelParts, []);
  const needle = q.trim().toLowerCase();
  const list = needle ? all.filter((x) => (x.subj.name + " " + x.part.name).toLowerCase().includes(needle)) : all;
  const years = [...new Set(list.map((x) => x.sem.year))].sort();
  const [winId, setWinId] = useState(() => store.get("indeks.arena.win", "q10"));
  const maxOpp = isBattle(mode) ? 1 : 3;          // bitka je samo duel; klasika do četverke
  const toggle = (id) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.length >= maxOpp ? (maxOpp === 1 ? [id] : s) : [...s, id]));
  const pickMode = (m) => { setMode(m); store.set("indeks.arena.mode", m); if (isBattle(m)) setSel((s) => s.slice(0, 1)); };
  const pickWin = (w) => { setWinId(w); store.set("indeks.arena.win", w); };
  async function pick(x) {
    if (busy || !sel.length) return; setBusy(true); setErr(null);
    const r = await createChallenge(sel, x.sem, x.subj, x.part, mode, winId);
    setBusy(false);
    if (r.error) { setErr(r.error); return; }
    onPick(r.id);
  }
  const size = sel.length + 1;
  return (
    <Modal title="Nov match" icon={<Swords size={17} color="var(--terra)" />} onClose={onClose}>
      {!friends.length ? (
        <div style={{ fontSize: 13.5, color: "var(--ink2)" }}>Še nimaš prijateljev. <button onClick={() => { onClose(); go({ view: "profile" }); }} className="ix-pill" style={{ marginLeft: 4 }}>Dodaj jih v profilu</button></div>
      ) : (
        <>
          <div className="ix-chip" style={{ marginBottom: 6 }}>1. Način</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 8, marginBottom: 14 }}>
            <button onClick={() => pickMode("classic")} className="ix-card" style={{ padding: "10px 12px", textAlign: "left", cursor: "pointer", borderColor: mode === "classic" ? "var(--teal)" : undefined, background: mode === "classic" ? "var(--okbg)" : undefined }}>
              <b style={{ fontSize: 14 }}><Trophy size={13} style={{ verticalAlign: -2 }} /> Klasika</b><div style={{ fontSize: 12, color: "var(--ink2)", marginTop: 3 }}>Točke: 100 za pravilen odgovor + do 50 za hitrost. Zmaga največ točk.</div>
            </button>
            <button onClick={() => pickMode("basic")} className="ix-card" style={{ padding: "10px 12px", textAlign: "left", cursor: "pointer", borderColor: mode === "basic" ? "var(--terra)" : undefined, background: mode === "basic" ? "var(--badbg)" : undefined }}>
              <b style={{ fontSize: 14 }}><Zap size={13} style={{ verticalAlign: -2 }} /> Bitka</b><div style={{ fontSize: 12, color: "var(--ink2)", marginTop: 3 }}>Vsi enaki (100 HP): vprašanja tečejo, dokler nekomu ne zmanjka HP. Brez izbire lika in opreme.</div>
            </button>
            <button onClick={() => pickMode("battle")} className="ix-card" style={{ padding: "10px 12px", textAlign: "left", cursor: "pointer", borderColor: mode === "battle" ? "var(--terra)" : undefined, background: mode === "battle" ? "var(--badbg)" : undefined }}>
              <b style={{ fontSize: 14 }}><Swords size={13} style={{ verticalAlign: -2 }} /> Bitka z liki</b><div style={{ fontSize: 12, color: "var(--ink2)", marginTop: 3 }}>Do 0 HP, z liki, sposobnostmi in opremo (do 2). Kdo je meta, vidiš na profilu.</div>
            </button>
          </div>
          {mode === "classic" && (
            <>
              <div className="ix-chip" style={{ marginBottom: 6 }}>2. Pogoj zmage</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 4 }}>
                {WIN_RULES.map((w) => <button key={w.id} onClick={() => pickWin(w.id)} className={"ix-pill" + (winId === w.id ? " on" : "")} title={w.desc}>{w.label}</button>)}
              </div>
              <div style={{ fontSize: 12.5, color: "var(--ink2)", marginBottom: 14 }}>{(WIN_RULES.find((w) => w.id === winId) || WIN_RULES[0]).desc}</div>
            </>
          )}
          <div className="ix-chip" style={{ marginBottom: 6 }}>{mode === "classic" ? "3" : "2"}. Nasprotniki ({isBattle(mode) ? "duel: 1" : "1–3"}) · {SIZE_LABEL[size] || "Duel"}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {friends.map((f) => { const on = sel.includes(f.user_id); return (
              <button key={f.id} onClick={() => toggle(f.user_id)} className={"ix-pill" + (on ? " on" : "")} disabled={!on && maxOpp > 1 && sel.length >= maxOpp}>{f.username}</button>
            ); })}
          </div>
          <div className="ix-chip" style={{ marginBottom: 6 }}>{mode === "classic" ? "4" : "3"}. Kviz</div>
          {err && <div style={{ color: "var(--terra)", fontSize: 13, marginBottom: 8 }}>{err}</div>}
          {presetLoc ? (
            <button onClick={() => pick(presetLoc)} disabled={busy || !sel.length} className="ix-btn" style={{ background: "var(--terra)", color: "#fff", border: "1px solid var(--terra)", padding: "12px 18px", display: "flex", alignItems: "center", gap: 8, width: "100%", justifyContent: "center" }}>
              <Swords size={16} /> Pošlji izziv · {presetLoc.subj.name} · {presetLoc.part.name}
            </button>
          ) : (
            <>
              <input className="ix-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Išči predmet ali del…" style={{ width: "100%", marginBottom: 10 }} />
              {!sel.length && <div style={{ fontSize: 12.5, color: "var(--ink2)", marginBottom: 8 }}>Najprej izberi vsaj enega nasprotnika.</div>}
              {years.map((y) => (
                <div key={y} style={{ marginBottom: 10 }}>
                  <div className="ix-chip" style={{ color: "var(--terra)", margin: "6px 0" }}>{y}. letnik</div>
                  {list.filter((x) => x.sem.year === y).map((x) => (
                    <button key={x.key} onClick={() => pick(x)} disabled={busy || !sel.length} className="ix-opt" style={{ padding: "10px 12px", marginBottom: 6, display: "flex", alignItems: "center", gap: 10, opacity: sel.length ? 1 : .6 }}>
                      <span style={{ flex: 1 }}><b style={{ fontSize: 14 }}>{x.subj.name}</b><span style={{ color: "var(--ink2)", fontSize: 13 }}> · {x.part.name}</span></span>
                      <span className="ix-chip">{rankedPool(x.part).length} vpr.</span>
                      <ChevronRight size={16} color="var(--ink2)" />
                    </button>
                  ))}
                </div>
              ))}
              {!list.length && <div style={{ fontSize: 13, color: "var(--ink2)" }}>Ni zadetkov.</div>}
            </>
          )}
        </>
      )}
    </Modal>
  );
}

/* Obvestila: povabilo v match (Sprejmi/Zavrni), match v pripravi. Prikazano na vseh straneh razen na samem matchu. */
function SocialBanner({ soc, route, go, reload }) {
  const [busy, setBusy] = useState(null);
  const seenInv = useRef(null);
  useEffect(() => {
    if (!soc) return;
    const ids = (soc.challenges || []).filter((c) => c.status === "pending" && c.my_status === "invited").map((c) => c.id);
    if (seenInv.current && ids.some((x) => !seenInv.current.includes(x))) sfx("invite");
    seenInv.current = ids;
  }, [soc]);
  if (!soc) return null;
  const items = (soc.challenges || []).filter((c) => (c.status === "pending" && c.my_status === "invited") || (c.status === "accepted" && (c.my_status === "host" || c.my_status === "accepted")))
    .filter((c) => !(route.view === "duel" && route.id === c.id)).slice(0, 3);
  if (!items.length) return null;
  async function respond(c, accept) {
    setBusy(c.id);
    const { error } = await supabase.rpc("respond_challenge", { p_id: c.id, p_accept: accept });
    setBusy(null);
    if (error) { alert(rpcErr(error)); return; }
    reload();
    if (accept) go({ view: "duel", id: c.id });
  }
  return (
    <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
      {items.map((c) => (
        <div key={c.id} className="ix-card" style={{ padding: "11px 14px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", borderLeft: "3px solid var(--terra)" }}>
          <Swords size={17} color="var(--terra)" />
          <div style={{ flex: 1, fontSize: 14, minWidth: 180 }}>
            {c.status === "pending"
              ? <><b>{c.host}</b> te vabi: {SIZE_LABEL[c.size]} · {MODE_LABEL[c.mode]} <span style={{ color: "var(--ink2)" }}>· {c.part_name}</span></>
              : <>{SIZE_LABEL[c.size]} ({MODE_LABEL[c.mode]}) čaka <span style={{ color: "var(--ink2)" }}>· {c.part_name}</span></>}
          </div>
          {c.status === "pending" ? (
            <span style={{ display: "flex", gap: 6 }}>
              <button onClick={() => respond(c, true)} disabled={busy === c.id} className="ix-pill on"><Check size={13} style={{ verticalAlign: -2 }} /> Sprejmi</button>
              <button onClick={() => respond(c, false)} disabled={busy === c.id} className="ix-pill bad">Zavrni</button>
            </span>
          ) : <span style={{ display: "flex", gap: 6 }}><button onClick={() => go({ view: "duel", id: c.id })} className="ix-pill on">Odpri</button><button onClick={async () => { if (!confirm("Zapustim ta match? Zate ne šteje.")) return; setBusy(c.id); await supabase.rpc("abandon_challenge", { p_id: c.id }); setBusy(null); reload(); }} disabled={busy === c.id} className="ix-pill" title="Zapusti match">Zapusti</button></span>}
        </div>
      ))}
    </div>
  );
}

/* ---- PROFIL: urejanje, lik, prijatelji s statistiko, matchi, bilanca ---- */
function ProfileView({ user, soc, socErr, reload, go }) {
  const p = (soc && soc.profile) || {};
  const [edit, setEdit] = useState(false);
  const [d, setD] = useState({ letnik: "", smer: "", bio: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  useEffect(() => { if (!edit) setD({ letnik: p.letnik || "", smer: p.smer || "", bio: p.bio || "" }); }, [soc]); // eslint-disable-line
  const [uEdit, setUEdit] = useState(false);
  const [uDraft, setUDraft] = useState("");
  const [uErr, setUErr] = useState("");
  const [fName, setFName] = useState("");
  const [fMsg, setFMsg] = useState(null);
  const [busy, setBusy] = useState(null);
  const [picker, setPicker] = useState(null);     // { friend? }
  const [open, setOpen] = useState({});
  const [charOpen, setCharOpen] = useState(false);
  const [snd, setSnd] = useState(soundOn());
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoMsg, setPhotoMsg] = useState(null);
  const fileRef = useRef(null);
  const username = p.username || displayName(user);
  async function onPhoto(e) {
    const f = e.target.files && e.target.files[0]; e.target.value = ""; if (!f) return;
    if (!/^image\//.test(f.type)) { setPhotoMsg({ err: "Izberi sliko (JPG, PNG)." }); return; }
    setPhotoBusy(true); setPhotoMsg(null);
    try {
      const url = await uploadPhoto(f, user.id);
      const { error } = await supabase.rpc("update_profile", { p_letnik: p.letnik || null, p_smer: p.smer || "", p_bio: p.bio || "", p_photo: url });
      if (error) throw new Error(rpcErr(error));
      setPhotoMsg({ ok: "Slika je shranjena." }); reload();
    } catch (err) { setPhotoMsg({ err: err.message }); }
    setPhotoBusy(false);
  }
  const [charDraft, setCharDraft] = useState(null);     // lokalna izbira lika/opreme (ostane tudi, če shranjevanje ne uspe)
  const [charMsg, setCharMsg] = useState(null);
  useEffect(() => { if (soc && soc.profile) setCharDraft({ character: soc.profile.character || CHARS.CHARACTERS[0].id, items: splitItems(soc.profile.perk) }); }, [soc && soc.profile && soc.profile.character, soc && soc.profile && soc.profile.perk]); // eslint-disable-line
  const myLevel = (soc && soc.record && soc.record.level) || 1;
  const curChar0 = charDraft ? charDraft.character : p.character;
  const curChar = unlocked(myLevel, charById(curChar0)) ? curChar0 : CHARS.CHARACTERS[0].id;   // zaklenjen (še neodklenjen) lik -> osnovni
  const curItems = (charDraft ? charDraft.items : splitItems(p.perk)).filter((x) => unlocked(myLevel, itemById(x)));
  const myChar = charBuild(curChar, curItems);
  const myItems = splitItems(curItems.join(","));

  async function saveProfile() {
    setSaving(true); setMsg(null);
    const { error } = await supabase.rpc("update_profile", { p_letnik: d.letnik ? +d.letnik : null, p_smer: d.smer, p_bio: d.bio });
    setSaving(false);
    if (error) { setMsg({ err: rpcErr(error) }); return; }
    setEdit(false); reload();
  }
  async function saveChar(c, items) {
    setCharDraft({ character: c, items: items || [] }); setCharMsg(null);
    const { error } = await supabase.rpc("update_profile", { p_letnik: p.letnik || null, p_smer: p.smer || "", p_bio: p.bio || "", p_character: c, p_perk: (items || []).join(",") });
    if (error) { setCharMsg({ err: "Izbira ni shranjena: " + rpcErr(error) }); return; }
    setCharMsg({ ok: "Shranjeno." }); reload();
  }
  async function saveU() {
    setUErr("");
    const r = await saveUsername(uDraft);
    if (r.error) { setUErr(r.error); return; }
    setUEdit(false); reload();
  }
  async function addFriend() {
    const name = fName.trim(); if (!name) return;
    setBusy("add"); setFMsg(null);
    const { data, error } = await supabase.rpc("send_friend_request", { p_username: name });
    setBusy(null);
    if (error) { setFMsg({ err: rpcErr(error) }); return; }
    setFName(""); setFMsg({ ok: data && data.status === "accepted" ? `${data.username} je zdaj tvoj prijatelj.` : `Prošnja je poslana (${data && data.username}).` }); reload();
  }
  async function rpc(fn, args, after) {
    setBusy(fn + JSON.stringify(args));
    const { error } = await supabase.rpc(fn, args);
    setBusy(null);
    if (error) { alert(rpcErr(error)); return; }
    reload(); if (after) after();
  }
  const chs = (soc && soc.challenges) || [];
  const invited = chs.filter((c) => c.status === "pending" && c.my_status === "invited");
  const pendingMine = chs.filter((c) => c.status === "pending" && c.my_status !== "invited" && c.my_status !== "declined");
  const active = chs.filter((c) => c.status === "accepted" && (c.my_status === "host" || c.my_status === "accepted"));
  const history = chs.filter((c) => c.status === "done" || c.status === "abandoned").slice(0, 12);
  const rec = (soc && soc.record) || {};
  const uid = user && user.id;
  const resultOf = (c) => c.status === "abandoned" ? { t: "prekinjen", col: "var(--ink2)" } : c.my_status === "left" ? { t: "predal (poraz)", col: "var(--red)" } : !c.winner ? { t: "neodločeno", col: "var(--ink2)" } : c.winner === uid ? { t: "zmaga", col: "var(--teal)" } : { t: "poraz", col: "var(--red)" };
  const when = (iso) => { const dt = new Date(iso); return dt.toLocaleDateString("sl-SI", { day: "numeric", month: "numeric" }) + " " + dt.toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" }); };
  const others = (c) => (c.players || []).filter((x) => x.user_id !== uid).map((x) => x.username).join(", ");

  return (
    <div className="ix-fade">
      {picker && <NewMatch soc={soc} presetFriend={picker.friend} go={go} onClose={() => setPicker(null)} onPick={(id) => { setPicker(null); reload(); go({ view: "duel", id }); }} />}
      <button onClick={() => go({ view: "home" })} className="ix-chip" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: 0, marginBottom: 14 }}>
        <ChevronLeft size={15} /> Domov
      </button>
      {socErr && <div className="ix-card" style={{ padding: "11px 14px", marginBottom: 14, fontSize: 13.5, color: "var(--ink2)", borderLeft: "3px solid var(--terra)" }}>{socErr}</div>}

      {/* PROFIL */}
      <div className="ix-card" style={{ padding: 22, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <button onClick={() => fileRef.current && fileRef.current.click()} title="Profilna slika (klik za nalaganje)" disabled={photoBusy} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, position: "relative" }}>
            <Pic photo={p.photo} name={username} size={64} />
            <span style={{ position: "absolute", right: -4, bottom: -4, width: 22, height: 22, borderRadius: 999, background: "var(--ink)", color: "var(--paper)", display: "grid", placeItems: "center", border: "2px solid var(--paper2)" }}><Pencil size={11} /></span>
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={onPhoto} style={{ display: "none" }} />
          <button onClick={() => setCharOpen((o) => !o)} title="Moj lik in oprema (klik za spremembo)" style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}><CharArt id={myChar.id} size={44} /></button>
          <div style={{ flex: 1, minWidth: 160 }}>
            {!uEdit ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <h1 className="ix-serif" style={{ fontSize: 26, fontWeight: 900, margin: 0, letterSpacing: "-.02em" }}>{username}</h1>
                <button onClick={() => { setUDraft(p.username || ""); setUEdit(true); }} className="ix-pill" title="Spremeni uporabniško ime"><Pencil size={12} style={{ verticalAlign: -1 }} /> ime</button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                <input className="ix-input" value={uDraft} onChange={(e) => setUDraft(e.target.value)} maxLength={20} placeholder="uporabniško ime (3–20 znakov)" onKeyDown={(e) => { if (e.key === "Enter") saveU(); if (e.key === "Escape") setUEdit(false); }} autoFocus />
                <button onClick={saveU} disabled={uDraft.trim().length < 3} className="ix-pill on">Shrani</button>
                <button onClick={() => setUEdit(false)} className="ix-pill">Prekliči</button>
                {uErr && <span style={{ color: "var(--terra)", fontSize: 13, width: "100%" }}>{uErr}</span>}
              </div>
            )}
            <div className="ix-chip" style={{ marginTop: 4 }}>{[LETNIK_LABELS[p.letnik], p.smer].filter(Boolean).join(" · ") || "letnik in smer še nista nastavljena"} · {myChar.name}{myItems.length ? " + " + myItems.map((x) => itemById(x).name).join(" + ") : ""}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="ix-serif" style={{ fontSize: 22, fontWeight: 900 }}>{rec.wins || 0}<span style={{ fontSize: 14, color: "var(--ink2)" }}> / {rec.matches || 0}</span></div>
            <div className="ix-chip">zmag / matchev</div>
          </div>
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}><StatsLine s={rec} full /><button onClick={() => setCharOpen((o) => !o)} className={"ix-pill" + (charOpen ? " on" : "")} style={{ marginLeft: "auto" }}><Zap size={12} style={{ verticalAlign: -1 }} /> Lik in oprema</button><button onClick={() => { const v = !soundOn(); store.set(SOUND_KEY, v); setSnd(v); if (v) sfx("click"); }} className={"ix-pill" + (snd ? " on" : "")} title="Zvoki ob odgovorih, povabilih in udarcih">{snd ? "🔊 Zvoki" : "🔇 Zvoki"}</button></div>
        <XpBar s={rec} />
        {photoMsg && <div style={{ fontSize: 13, marginTop: 6, color: photoMsg.err ? "var(--terra)" : "var(--teal)" }}>{photoMsg.err || photoMsg.ok}</div>}
        {charOpen && (
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
            <div className="ix-sec" style={{ color: "var(--terra)" }}><Zap size={14} /> Moj lik za bitke</div>
            <div style={{ fontSize: 13, color: "var(--ink2)", marginBottom: 10 }}>Liki se razlikujejo po življenju, moči udarca, kritikih in bonusu za serijo; vsak ima svojo sposobnost, oprema (do 2 stvari) doda posebnosti. Slike: docs/liki/&lt;id&gt;.png.</div>
            <CharPicker character={curChar} items={curItems} onChange={saveChar} level={rec.level || 1} />
            <BattlePass level={rec.level || 1} />
            {charMsg && <div style={{ fontSize: 13, marginTop: 8, color: charMsg.err ? "var(--terra)" : "var(--teal)" }}>{charMsg.err || charMsg.ok}</div>}
          </div>
        )}
        {!edit ? (
          <div style={{ marginTop: 14, display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
            <p style={{ margin: 0, flex: 1, minWidth: 200, fontSize: 14.5, lineHeight: 1.55, color: p.bio ? "var(--ink)" : "var(--ink2)" }}>{p.bio || "Dodaj kratek opis - prijatelji ga vidijo v svojem seznamu."}</p>
            <button onClick={() => setEdit(true)} className="ix-pill"><Pencil size={12} style={{ verticalAlign: -1 }} /> Uredi profil</button>
          </div>
        ) : (
          <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
            <label style={{ fontSize: 13, color: "var(--ink2)", display: "grid", gap: 4 }}>Letnik
              <select className="ix-input" value={d.letnik} onChange={(e) => setD({ ...d, letnik: e.target.value })}>
                <option value="">—</option>
                {Object.keys(LETNIK_LABELS).map((k) => <option key={k} value={k}>{LETNIK_LABELS[k]}</option>)}
              </select>
            </label>
            <label style={{ fontSize: 13, color: "var(--ink2)", display: "grid", gap: 4 }}>Smer / program
              <input className="ix-input" list="ix-smer" value={d.smer} onChange={(e) => setD({ ...d, smer: e.target.value })} maxLength={60} placeholder="npr. UPEŠ, Bančni in finančni management" />
              <datalist id="ix-smer">{SMER_SUGGEST.map((s) => <option key={s} value={s} />)}</datalist>
            </label>
            <label style={{ fontSize: 13, color: "var(--ink2)", display: "grid", gap: 4 }}>Kratek opis <span style={{ fontSize: 11 }}>({d.bio.length}/200)</span>
              <textarea className="ix-input" value={d.bio} onChange={(e) => setD({ ...d, bio: e.target.value.slice(0, 200) })} rows={3} placeholder="Kdo si, kaj študiraš, za kaj se učiš…" style={{ resize: "vertical" }} />
            </label>
            {msg && msg.err && <div style={{ color: "var(--terra)", fontSize: 13 }}>{msg.err}</div>}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={saveProfile} disabled={saving} className="ix-btn" style={{ background: "var(--teal)", color: "#fff", border: "1px solid var(--teal)", padding: "9px 16px" }}>Shrani</button>
              <button onClick={() => { setEdit(false); setD({ letnik: p.letnik || "", smer: p.smer || "", bio: p.bio || "" }); }} className="ix-btn" style={{ background: "transparent", color: "var(--ink)", border: "1px solid var(--line)", padding: "9px 16px" }}>Prekliči</button>
            </div>
          </div>
        )}
      </div>

      {/* PRIJATELJI */}
      <div className="ix-card" style={{ padding: 22, marginBottom: 18 }}>
        <div className="ix-sec" style={{ color: "var(--teal)" }}><Users size={14} /> Prijatelji {soc && soc.friends && soc.friends.length ? `(${soc.friends.length})` : ""}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <input className="ix-input" value={fName} onChange={(e) => setFName(e.target.value)} placeholder="uporabniško ime prijatelja" maxLength={20} onKeyDown={(e) => { if (e.key === "Enter") addFriend(); }} style={{ flex: 1, minWidth: 180 }} />
          <button onClick={addFriend} disabled={busy === "add" || !fName.trim()} className="ix-btn" style={{ background: "var(--ink)", color: "var(--paper)", border: "1px solid var(--ink)", padding: "9px 14px", display: "flex", alignItems: "center", gap: 6 }}><UserPlus size={15} /> Pošlji prošnjo</button>
        </div>
        {fMsg && <div style={{ fontSize: 13, marginTop: 8, color: fMsg.err ? "var(--terra)" : "var(--teal)" }}>{fMsg.err || fMsg.ok}</div>}
        {soc && soc.requests_in && soc.requests_in.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <div className="ix-chip" style={{ color: "var(--terra)", marginBottom: 4 }}>Prošnje zate</div>
            {soc.requests_in.map((r) => (
              <div key={r.id} className="ix-row">
                <Pic photo={r.photo} name={r.username} size={24} />
                <span style={{ flex: 1, fontSize: 14 }}><b>{r.username}</b>{(r.letnik || r.smer) && <span style={{ color: "var(--ink2)" }}> · {[LETNIK_LABELS[r.letnik], r.smer].filter(Boolean).join(", ")}</span>}</span>
                <button onClick={() => rpc("respond_friend_request", { p_id: r.id, p_accept: true })} className="ix-pill on"><Check size={13} style={{ verticalAlign: -2 }} /> Sprejmi</button>
                <button onClick={() => rpc("respond_friend_request", { p_id: r.id, p_accept: false })} className="ix-pill bad">Zavrni</button>
              </div>
            ))}
          </div>
        )}
        {soc && soc.requests_out && soc.requests_out.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <div className="ix-chip" style={{ marginBottom: 4 }}>Poslane prošnje</div>
            {soc.requests_out.map((r) => (
              <div key={r.id} className="ix-row">
                <UserRound size={16} color="var(--ink2)" />
                <span style={{ flex: 1, fontSize: 14 }}><b>{r.username}</b> <span style={{ color: "var(--ink2)" }}>· čaka na odgovor</span></span>
                <button onClick={() => rpc("remove_friend", { p_id: r.id })} className="ix-pill">Prekliči</button>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: 14 }}>
          {soc && soc.friends && soc.friends.length ? soc.friends.map((f) => (
            <div key={f.id} className="ix-row" style={{ alignItems: "flex-start" }}>
              <button onClick={() => setOpen((o) => ({ ...o, [f.id]: !o[f.id] }))} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", flex: 1, textAlign: "left", minWidth: 200 }}>
                <div style={{ fontSize: 14.5, display: "flex", alignItems: "center", gap: 8 }}><Pic photo={f.photo} name={f.username} size={30} />{f.character && <CharArt id={f.character} size={22} />}<b>{f.username}</b><ChevronDown size={14} color="var(--ink2)" style={{ transform: open[f.id] ? "rotate(180deg)" : "none", transition: "transform .18s" }} /></div>
                <div className="ix-chip" style={{ marginTop: 2 }}>{[LETNIK_LABELS[f.letnik], f.smer].filter(Boolean).join(" · ") || "brez podatkov o letniku"}</div>
                <div style={{ marginTop: 4 }}><StatsLine s={f.stats} /></div>
                {open[f.id] && <div style={{ fontSize: 13.5, color: "var(--ink2)", marginTop: 6, lineHeight: 1.5 }}>{f.bio || "Brez opisa."}{f.character ? ` · Lik: ${charById(f.character).name}${splitItems(f.perk).length ? " + " + splitItems(f.perk).map((x) => itemById(x).name).join(" + ") : ""}` : ""}</div>}
              </button>
              <button onClick={() => setPicker({ friend: f })} className="ix-pill on"><Swords size={13} style={{ verticalAlign: -2 }} /> Izzovi</button>
              <button onClick={() => { if (confirm(`Odstranim ${f.username} s seznama prijateljev?`)) rpc("remove_friend", { p_id: f.id }); }} className="ix-pill" title="Odstrani prijatelja"><X size={13} /></button>
            </div>
          )) : <div style={{ fontSize: 13.5, color: "var(--ink2)", marginTop: 4 }}>Še nimaš prijateljev. Vpiši uporabniško ime sošolca in mu pošlji prošnjo; ko jo sprejme, ga lahko izzoveš.</div>}
        </div>
      </div>

      {/* MATCHI */}
      <div className="ix-card" style={{ padding: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
          <div className="ix-sec" style={{ color: "var(--terra)", marginBottom: 0 }}><Swords size={14} /> Arena · matchi</div>
          <button onClick={() => setPicker({})} disabled={!(soc && soc.friends && soc.friends.length)} className="ix-pill on" style={{ marginLeft: "auto" }}><Swords size={13} style={{ verticalAlign: -2 }} /> Nov match</button>
        </div>
        <div style={{ fontSize: 13.5, color: "var(--ink2)", lineHeight: 1.55 }}>Duel, trio ali četverka: vsi rešujejo ista vprašanja hkrati, napredek vidite v živo. <b style={{ color: "var(--ink)" }}>Klasika</b>: {RANKED_N} vprašanj, 100 točk za pravilen odgovor + do 50 za hitrost. <b style={{ color: "var(--ink)" }}>Bitka</b>: vsi enaki s 100 HP, pravilen odgovor udari vse nasprotnike, serija ojača, kritiki podvojijo, 2 zaporedna napačna = −10 HP; vprašanja tečejo, dokler nekomu ne zmanjka HP (največ {DUEL_BATTLE_N}, {fmtTime(DUEL_BATTLE_SECONDS)}). <b style={{ color: "var(--ink)" }}>Bitka z liki</b>: isto, a z liki, sposobnostmi in opremo. Prekinjen match se ne šteje.</div>
        {invited.map((c) => (
          <div key={c.id} className="ix-row">
            <Swords size={16} color="var(--terra)" />
            <span style={{ flex: 1, fontSize: 14 }}><b>{c.host}</b> te vabi: {SIZE_LABEL[c.size]} · {MODE_LABEL[c.mode]} <span style={{ color: "var(--ink2)" }}>· {c.part_name}</span></span>
            <button onClick={() => rpc("respond_challenge", { p_id: c.id, p_accept: true }, () => go({ view: "duel", id: c.id }))} className="ix-pill on"><Check size={13} style={{ verticalAlign: -2 }} /> Sprejmi</button>
            <button onClick={() => rpc("respond_challenge", { p_id: c.id, p_accept: false })} className="ix-pill bad">Zavrni</button>
          </div>
        ))}
        {active.map((c) => (
          <div key={c.id} className="ix-row">
            <Zap size={16} color="var(--teal)" />
            <span style={{ flex: 1, fontSize: 14 }}>{SIZE_LABEL[c.size]} · {MODE_LABEL[c.mode]} z <b>{others(c)}</b> <span style={{ color: "var(--ink2)" }}>· {c.part_name}</span></span>
            <button onClick={() => go({ view: "duel", id: c.id })} className="ix-pill on">Odpri</button>
          </div>
        ))}
        {pendingMine.map((c) => (
          <div key={c.id} className="ix-row">
            <Clock size={16} color="var(--ink2)" />
            <span style={{ flex: 1, fontSize: 14 }}>{c.my_status === "host" ? "Čakam na odgovore" : "Sprejel si, čakamo ostale"}: <b>{others(c)}</b> <span style={{ color: "var(--ink2)" }}>· {c.part_name}</span></span>
            <button onClick={() => go({ view: "duel", id: c.id })} className="ix-pill">Odpri</button>
            {c.my_status === "host" && <button onClick={() => rpc("cancel_challenge", { p_id: c.id })} className="ix-pill">Prekliči</button>}
          </div>
        ))}
        {history.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <div className="ix-chip" style={{ marginBottom: 4 }}>Zadnji matchi</div>
            {history.map((c) => { const r = resultOf(c); const me = (c.players || []).find((x) => x.user_id === uid); return (
              <div key={c.id} className="ix-row" style={{ padding: "7px 0" }}>
                <span style={{ fontSize: 13.5, flex: 1 }}><b style={{ color: r.col }}>{r.t}</b> · {SIZE_LABEL[c.size]} ({MODE_LABEL[c.mode]}) z <b>{others(c)}</b> <span style={{ color: "var(--ink2)" }}>· {c.part_name}</span></span>
                <span className="ix-chip" style={{ fontVariantNumeric: "tabular-nums" }}>{c.status === "done" && me ? (isBattle(c.mode) ? `${me.hp ?? 0} HP · ${me.correct} pravilnih` : `${me.points} t. · ${me.correct} pravilnih`) : ""} · {when(c.created_at)}</span>
                <button onClick={() => go({ view: "duel", id: c.id })} className="ix-pill" title="Podrobnosti"><ChevronRight size={13} /></button>
              </div>
            ); })}
          </div>
        )}
      </div>
      {!socErr && <LiveMatches userId={uid} go={go} />}
      {!socErr && <ArenaMeta userId={uid} go={go} />}
    </div>
  );
}

/* XP in nivo: vrstica napredka do naslednjega nivoja. */
function XpBar({ s }) {
  const xp = (s && s.xp) || 0, lvl = (s && s.level) || levelOf(xp);
  const lo = levelXp(lvl), hi = nextLevelXp(lvl);
  const pct = hi ? Math.round(100 * (xp - lo) / (hi - lo)) : 100;
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink2)", marginBottom: 3 }}>
        <span><b style={{ color: "var(--ink)" }}>Nivo {lvl}</b> · {xp} XP</span>
        <span>{hi ? `še ${hi - xp} XP do nivoja ${lvl + 1}` : "najvišji nivo"}</span>
      </div>
      <div className="ix-bar" style={{ height: 8 }}><span style={{ width: `${Math.max(2, Math.min(100, pct))}%`, background: "var(--teal)" }} /></div>
      <div style={{ fontSize: 11.5, color: "var(--ink2)", marginTop: 3 }}>XP: {CHARS.XP_RULES.attempt} na rešen kviz · {CHARS.XP_RULES.match} na match · {CHARS.XP_RULES.win} na zmago</div>
    </div>
  );
}
/* Battle pass: kaj se odklene na katerem nivoju (liki in oprema po vrsti). */
function BattlePass({ level }) {
  const steps = [...CHARS.CHARACTERS.map((c) => ({ lvl: c.unlock || 1, kind: "character", obj: c })), ...CHARS.ITEMS.map((it) => ({ lvl: it.unlock || 1, kind: "item", obj: it }))].sort((a, b) => a.lvl - b.lvl);
  const byLvl = {}; steps.forEach((x) => { (byLvl[x.lvl] = byLvl[x.lvl] || []).push(x); });
  const lvls = Object.keys(byLvl).map(Number).sort((a, b) => a - b);
  return (
    <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
      <div className="ix-sec" style={{ color: "var(--teal)" }}><Trophy size={14} /> Battle pass · odklepanje po nivojih</div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6 }}>
        {lvls.map((l) => {
          const open = l <= level;
          return (
            <div key={l} className="ix-card" style={{ minWidth: 118, padding: "8px 10px", opacity: open ? 1 : .55, borderColor: l === level ? "var(--terra)" : undefined, flexShrink: 0 }}>
              <div className="ix-chip" style={{ color: open ? "var(--teal)" : "var(--ink2)", marginBottom: 6 }}>{open ? "✓" : <Lock size={10} style={{ verticalAlign: -1 }} />} nivo {l}</div>
              {byLvl[l].map((x) => (
                <div key={x.obj.id} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, marginBottom: 4 }}>
                  {x.kind === "character" ? <CharArt id={x.obj.id} size={22} /> : <span style={{ width: 22, height: 22, borderRadius: 6, background: "var(--paper)", border: "1px solid var(--line)", display: "grid", placeItems: "center", fontSize: 11 }}>🎒</span>}
                  <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{x.obj.name}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
/* Matchi, ki tečejo zdaj (vsi uporabniki): klik = gledanje v živo. */
function LiveMatches({ userId, go }) {
  const [live, setLive] = useState(null);
  useEffect(() => {
    let dead = false;
    const load = () => supabase.rpc("arena_live").then(({ data, error }) => { if (!dead && !error) setLive(data || []); });
    load();
    const iv = setInterval(() => { if (document.visibilityState === "visible") load(); }, 10000);
    return () => { dead = true; clearInterval(iv); };
  }, []);
  if (!live || !live.length) return null;
  return (
    <div className="ix-card" style={{ padding: 18, marginTop: 18, borderLeft: "3px solid var(--red)" }}>
      <div className="ix-sec" style={{ color: "var(--red)" }}><Zap size={14} /> V živo zdaj ({live.length})</div>
      <div style={{ display: "grid", gap: 6 }}>
        {live.map((m) => (
          <div key={m.id} className="ix-row" style={{ padding: "6px 0", borderTop: "none" }}>
            <span style={{ flex: 1, fontSize: 13.5 }}>
              <b>{SIZE_LABEL[m.size]} · {MODE_LABEL[m.mode]}</b> <span style={{ color: "var(--ink2)" }}>· {m.part_name}</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 12px", marginTop: 2, fontSize: 12.5, color: "var(--ink2)" }}>
                {(m.players || []).map((p) => <span key={p.user_id} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{m.mode === "battle" && p.character ? <CharArt id={p.character} size={16} /> : <Pic photo={p.photo} name={p.username} size={16} />}{p.username}{p.is_me ? " (ti)" : ""}: {isBattle(m.mode) ? `${Math.max(0, p.hp || 0)} HP` : `${p.points || 0} t.`}</span>)}
              </div>
            </span>
            <button onClick={() => go({ view: "duel", id: m.id })} className="ix-pill on">{(m.players || []).some((p) => p.is_me) ? "Odpri" : "Glej"}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Meta (kateri liki in oprema zmagujejo) in zgodovina vseh matchev; vidno vsem prijavljenim. */
function ArenaMeta({ userId, go }) {
  const [meta, setMeta] = useState(null);
  const [hist, setHist] = useState(null);
  const [tab, setTab] = useState("meta");
  useEffect(() => {
    let dead = false;
    supabase.rpc("arena_meta").then(({ data, error }) => { if (!dead && !error) setMeta(data); });
    supabase.rpc("arena_history", { p_limit: 30 }).then(({ data, error }) => { if (!dead && !error) setHist(data); });
    return () => { dead = true; };
  }, []);
  if (!meta && !hist) return null;
  const pct = (w, n) => (n ? Math.round(100 * w / n) : 0);
  const when = (iso) => { const dt = new Date(iso); return dt.toLocaleDateString("sl-SI", { day: "numeric", month: "numeric" }) + " " + dt.toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" }); };
  const nameOfItems = (its) => splitItems(its).map((x) => itemById(x).name).join(" + ");
  const Tbl = ({ rows, label, nameOf }) => (
    <div style={{ overflowX: "auto", marginBottom: 12 }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
        <thead><tr style={{ color: "var(--ink2)", fontSize: 12, textAlign: "left" }}><th style={{ padding: "4px 6px" }}>{label}</th><th style={{ padding: "4px 6px", textAlign: "right" }}>Matchi</th><th style={{ padding: "4px 6px", textAlign: "right" }}>Zmage</th><th style={{ padding: "4px 6px", textAlign: "right" }}>%</th></tr></thead>
        <tbody>{[...rows].sort((a, b) => pct(b.wins, b.matches) - pct(a.wins, a.matches) || b.matches - a.matches).map((r, k) => (
          <tr key={k} style={{ borderTop: "1px solid var(--line)" }}><td style={{ padding: "6px" }}>{nameOf(r)}</td><td style={{ padding: "6px", textAlign: "right" }}>{r.matches}</td><td style={{ padding: "6px", textAlign: "right" }}>{r.wins}</td><td style={{ padding: "6px", textAlign: "right", fontWeight: 700 }}>{pct(r.wins, r.matches)} %</td></tr>
        ))}</tbody>
      </table>
    </div>
  );
  return (
    <div className="ix-card" style={{ padding: 22, marginTop: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
        <div className="ix-sec" style={{ color: "var(--ink)", marginBottom: 0 }}><BarChart3 size={14} /> Arena · meta in zgodovina vseh</div>
        <span style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <button onClick={() => setTab("meta")} className={"ix-pill" + (tab === "meta" ? " on" : "")}>Meta</button>
          <button onClick={() => setTab("hist")} className={"ix-pill" + (tab === "hist" ? " on" : "")}>Vsi matchi</button>
        </span>
      </div>
      {tab === "meta" ? (
        !meta || !meta.matches ? <div style={{ fontSize: 13.5, color: "var(--ink2)" }}>Še ni končanih bitk. Ko jih bo nekaj, se tu pokaže, kateri liki in oprema zmagujejo.</div> : (
          <>
            <div style={{ fontSize: 13, color: "var(--ink2)", marginBottom: 10 }}>Končanih bitk: <b style={{ color: "var(--ink)" }}>{meta.matches}</b>. Delež zmag po likih, opremi in kombinacijah (vsi igralci).</div>
            <Tbl rows={meta.characters || []} label="Lik" nameOf={(r) => <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><CharArt id={r.id} size={22} />{charById(r.id).name}</span>} />
            {(meta.items || []).length > 0 && <Tbl rows={meta.items} label="Oprema" nameOf={(r) => (itemById(r.id) || { name: r.id }).name} />}
            {(meta.setups || []).length > 0 && <Tbl rows={meta.setups} label="Kombinacija (≥ 2 matcha)" nameOf={(r) => `${charById(r.character).name}${r.items ? " + " + nameOfItems(r.items) : ""}`} />}
          </>
        )
      ) : (
        !hist || !hist.length ? <div style={{ fontSize: 13.5, color: "var(--ink2)" }}>Še ni končanih matchev.</div> : (
          <div>
            {hist.map((h) => (
              <div key={h.id} className="ix-row" style={{ padding: "8px 0", alignItems: "flex-start" }}>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <div style={{ fontSize: 13.5 }}><b>{SIZE_LABEL[h.size]} · {MODE_LABEL[h.mode]}</b> <span style={{ color: "var(--ink2)" }}>· {h.part_name}</span></div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px", marginTop: 4, fontSize: 13 }}>
                    {(h.players || []).map((p) => (
                      <span key={p.user_id} style={{ display: "inline-flex", alignItems: "center", gap: 5, color: p.user_id === h.winner ? "var(--teal)" : "var(--ink2)", fontWeight: p.user_id === h.winner ? 700 : 400 }}>
                        {p.user_id === h.winner && <Crown size={12} />}{h.mode === "battle" && p.character && <CharArt id={p.character} size={18} />}{p.username}{p.is_me ? " (ti)" : ""}
                        <span style={{ fontWeight: 400, color: "var(--ink2)" }}>{isBattle(h.mode) ? ` ${Math.max(0, p.hp || 0)} HP` : ` ${p.points || 0} t.`}{p.status === "left" ? " · odšel" : ""}{h.mode === "battle" && p.items ? ` · ${nameOfItems(p.items)}` : ""}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <span className="ix-chip">{h.winner_name ? `zmaga ${h.winner_name}` : "neodločeno"} · {when(h.created_at)}</span>
                {(h.players || []).some((p) => p.is_me) && <button onClick={() => go({ view: "duel", id: h.id })} className="ix-pill" title="Podrobnosti"><ChevronRight size={13} /></button>}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

/* Napredek vseh igralcev med matchem (v živo) + zadnji dogodki. */
function DuelLive({ live }) {
  const { players, me, mode, n, events, hitFlash } = live; const fixedN = live.fixedN !== false;
  const lastEv = useRef(null);
  useEffect(() => {
    const last = events.length ? events[events.length - 1] : null;
    if (last && lastEv.current != null && last.id > lastEv.current && isBattle(mode)) {
      if (last.actor === me) { if (last.kind === "crit") sfx("crit"); else if (last.kind === "hit") sfx("hit"); else if (last.kind === "penalty") sfx("hurt"); }
      else if (last.kind === "hit" || last.kind === "crit" || last.kind === "ko") sfx("hurt");
    }
    if (last) lastEv.current = last.id;
  }, [events.length ? events[events.length - 1].id : 0]); // eslint-disable-line
  const name = (uid) => { const p = players.find((x) => x.user_id === uid); return p ? p.username : "?"; };
  const evText = (e) => {
    if (e.kind === "crit") return `💥 KRITIK! ${name(e.actor)} je zadel ${e.dmg}${e.streak > 1 ? ` (serija ${e.streak})` : ""}`;
    if (e.kind === "hit") return `⚔️ ${name(e.actor)} je zadel ${e.dmg}${e.streak > 1 ? ` (serija ${e.streak})` : ""}`;
    if (e.kind === "miss") return `✗ ${name(e.actor)} je zgrešil`;
    if (e.kind === "ko") return `☠️ ${name(e.actor)} je izločil ${e.targets && e.targets[0] ? name(e.targets[0].user_id) : ""}`;
    if (e.kind === "heal") return `🍔 ${name(e.actor)} si je povrnil ${e.dmg} HP (serija ${e.streak})`;
    if (e.kind === "penalty") return `⚠️ ${name(e.actor)}: ${e.dmg > 10 ? "vse ali nič ni uspelo" : "napačni zapored"}, −${e.dmg} HP`;
    if (e.kind === "ability") { const p = players.find((x) => x.user_id === e.actor); const ab = p && p.character && charById(p.character.id).ability; return `✨ ${name(e.actor)}: ${ab ? ab.name : "sposobnost"}${e.dmg ? ` (${e.dmg} HP)` : ""}`; }
    if (e.kind === "finish") return `🏁 ${name(e.actor)} je končal`;
    if (e.kind === "left") return `🚪 ${name(e.actor)} je odšel`;
    return "";
  };
  const feed = isBattle(mode) ? events.slice(-3).reverse() : events.filter((e) => e.kind !== "hit" && e.kind !== "miss" && e.kind !== "crit" && e.kind !== "heal" && e.kind !== "penalty").slice(-2).reverse();
  return (
    <div className="ix-card" style={{ padding: "10px 13px", marginBottom: 18, display: "grid", gap: 6 }}>
      {players.map((p) => {
        const isMe = p.user_id === me;
        const out = p.status === "left" || p.eliminated;
        const val = isBattle(mode) ? Math.max(0, p.hp || 0) / Math.max(1, p.max_hp || 100) : fixedN ? (p.answered || 0) / n : Math.min(1, (p.points || 0) / 1000);
        return (
          <div key={p.user_id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, opacity: out ? .55 : 1, transition: "box-shadow .3s", boxShadow: isMe && hitFlash ? "0 0 0 2px var(--red)" : "none", borderRadius: 6 }}>
            <span style={{ flex: "0 1 130px", minWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: isMe ? 700 : 500, display: "flex", alignItems: "center", gap: 6 }}>{p.character && p.character.id !== "basic" && <CharArt id={p.character.id} size={22} />}<span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{p.username}{isMe ? " (ti)" : ""}</span></span>
            <span className="ix-bar" style={{ flex: "1 1 60px", minWidth: 40, height: isBattle(mode) ? 9 : 6 }}><span style={{ width: `${Math.round(val * 100)}%`, background: isBattle(mode) ? (val > .5 ? "var(--teal)" : val > .25 ? "var(--terra)" : "var(--red)") : isMe ? "var(--terra)" : "var(--teal)" }} /></span>
            <span style={{ flex: "0 0 auto", minWidth: 90, textAlign: "right", color: "var(--ink2)", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", fontSize: 12.5 }}>
              {isBattle(mode) ? <><b style={{ color: "var(--ink)" }}>{Math.max(0, p.hp || 0)} HP</b> · {p.correct || 0}/{p.answered || 0} ✓</> : <>{fixedN ? `${p.answered || 0}/${n}` : `${p.correct || 0}/${p.answered || 0} ✓`} · <b style={{ color: "var(--ink)" }}>{p.points || 0} t.</b></>}
              {p.status === "left" ? " · predal" : p.eliminated ? " · izločen" : p.finished ? " · končal" : ""}
            </span>
          </div>
        );
      })}
      {feed.length > 0 && <div style={{ borderTop: "1px solid var(--line)", paddingTop: 6, display: "grid", gap: 2 }}>{feed.map((e) => <div key={e.id} className="ix-fade" style={{ fontSize: 12.5, color: e.actor === me ? "var(--ink)" : "var(--ink2)" }}>{evText(e)}</div>)}</div>}
    </div>
  );
}

/* ---- MATCH: povabilo -> lobby (lik) -> odštevanje -> QuizView v načinu duel -> rezultat ---- */
function DuelView({ route, go, userId, formulas, soc, setNavGuard }) {
  const id = route.id;
  const [st, setSt] = useState(null);
  const [err, setErr] = useState(null);
  const [wrong, setWrong] = useState([]);
  const [localDone, setLocalDone] = useState(false);
  const [tick, setTick] = useState(0);
  const [busy, setBusy] = useState(false);
  const [hitFlash, setHitFlash] = useState(false);
  const [pick, setPick] = useState(null);   // lik za to bitko {character, items}
  const [hintsLeft, setHintsLeft] = useState(null);   // plonkci (iz opreme), štejemo lokalno
  const offset = useRef(0);
  const stRef = useRef(null);
  const hpRef = useRef(null);
  const now = useCallback(() => Date.now() - offset.current, []);
  const applySt = useCallback((data) => {
    if (!data) return;
    offset.current = Date.now() - Date.parse(data.server_now);
    const me = (data.players || []).find((p) => p.user_id === userId);
    if (me && hpRef.current != null && me.hp != null && me.hp < hpRef.current) { setHitFlash(true); setTimeout(() => setHitFlash(false), 500); }
    hpRef.current = me ? me.hp : null;
    stRef.current = data; setSt(data);
  }, [userId]);
  const load = useCallback(async () => {
    const { data, error } = await supabase.rpc("duel_state", { p_id: id });
    if (error) { setErr(rpcErr(error)); return null; }
    if (!data) { setErr("Tega matcha ni (ali nisi igralec)."); return null; }
    setErr(null); applySt(data); return data;
  }, [id, applySt]);
  useEffect(() => {
    let alive = true;
    setSt(null); setWrong([]); setLocalDone(false); stRef.current = null; hpRef.current = null;
    load().then((d) => { if (alive && d && d.status === "accepted") supabase.rpc("settle_challenge", { p_id: id }).then(() => { if (alive) load(); }); });
    const ch = supabase.channel("duel:" + id)
      .on("postgres_changes", { event: "*", schema: "public", table: "challenges", filter: "id=eq." + id }, () => load())
      .on("postgres_changes", { event: "*", schema: "public", table: "challenge_players", filter: "challenge_id=eq." + id }, () => load())
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "challenge_events", filter: "challenge_id=eq." + id }, () => load())
      .subscribe();
    const iv = setInterval(() => { const s = stRef.current; if (alive && document.visibilityState === "visible" && s && (s.status === "pending" || s.status === "accepted")) load(); }, 5000);
    return () => { alive = false; clearInterval(iv); supabase.removeChannel(ch); };
  }, [id, load]);
  // odhod s strani po "Pripravljen" in pred koncem = predaja (poraz zate, zmaga nasprotniku)
  useEffect(() => () => {
    const s = stRef.current; if (!s || s.status !== "accepted") return;
    const me = (s.players || []).find((p) => p.user_id === userId); if (!me || !me.ready_at || me.finished) return;
    supabase.rpc("abandon_challenge", { p_id: id }).then(() => {});
  }, [id, userId]);
  // zvok ob koncu
  const doneSfx = useRef(false);
  useEffect(() => {
    if (!st || st.status !== "done" || doneSfx.current) return;
    const mine = (st.players || []).some((p) => p.user_id === userId);
    if (mine) { doneSfx.current = true; sfx(st.winner === userId ? "win" : "lose"); }
  }, [st && st.status]); // eslint-disable-line

  const players = (st && st.players) || [];
  const activeP = players.filter((p) => p.status === "host" || p.status === "accepted");
  const me = players.find((p) => p.user_id === userId) || null;
  const others = players.filter((p) => p.user_id !== userId);
  const nameOf = (uid) => { const p = players.find((x) => x.user_id === uid); return p ? p.username : "?"; };
  const startAt = st && st.start_at ? Date.parse(st.start_at) : null;
  const endAt = startAt ? startAt + st.seconds_limit * 1000 : null;
  const res = useMemo(() => (st ? resolveDuel(st) : null), [st && st.part_key, st && JSON.stringify(st.question_ids)]); // eslint-disable-line
  const n = st ? (st.question_ids || []).length : 0;
  const battle = st && isBattle(st.mode);        // HP, dogodki
  const pro = st && st.mode === "battle";          // izbira lika, oprema, sposobnosti
  const running = st && st.status === "accepted" && startAt && now() >= startAt;
  const countdown = st && st.status === "accepted" && startAt && now() < startAt;
  const spectator = st && st.is_player === false;
  // med matchem odhod s strani zahteva potrditev (predaja)
  const guardOn = !!(st && st.status === "accepted" && me && me.ready_at && !me.finished && !localDone && !spectator);
  useEffect(() => {
    if (!setNavGuard) return;
    if (guardOn) setNavGuard({ hash: "#/izziv/" + id, ask: () => confirm(startAt ? "Zapustiš match? To je predaja: ti poraz, nasprotnik zmaga." : "Zapustiš pripravo? Match se zate konča.") });
    else setNavGuard(null);
    return () => setNavGuard(null);
  }, [guardOn, id, startAt]); // eslint-disable-line
  useEffect(() => {
    if (!guardOn || !startAt) return;
    const h = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [guardOn, startAt]);
  const prof = (soc && soc.profile) || {};
  const myLevel = (soc && soc.record && soc.record.level) || 1;
  const myPick = pick || { character: unlocked(myLevel, charById(prof.character)) ? (prof.character || CHARS.CHARACTERS[0].id) : CHARS.CHARACTERS[0].id, items: splitItems(prof.perk).filter((x) => unlocked(myLevel, itemById(x))) };
  useEffect(() => { if (hintsLeft == null && me && me.character) setHintsLeft(me.character.hints || 0); }, [me && me.character]); // eslint-disable-line
  useEffect(() => { if (!countdown) return; const t = setInterval(() => setTick((x) => x + 1), 200); return () => clearInterval(t); }, [countdown]);
  // ko sem končal, drugi pa ne: po izteku časa (+grace) zaključi strežnik
  useEffect(() => {
    if (!st || st.status !== "accepted" || !me || !me.finished || !endAt) return;
    if (activeP.every((p) => p.finished)) return;
    const t = setTimeout(() => supabase.rpc("settle_challenge", { p_id: id }).then(() => load()), Math.max(500, endAt + DUEL_GRACE * 1000 - now()));
    return () => clearTimeout(t);
  }, [st && st.status, me && me.finished, activeP.filter((p) => p.finished).length, endAt]); // eslint-disable-line

  async function act(fn, args, after) {
    setBusy(true);
    const { data, error } = await supabase.rpc(fn, args || { p_id: id });
    setBusy(false);
    if (error) { setErr(rpcErr(error)); return; }
    if (data && data.server_now) applySt(data); else await load();
    if (after) after();
  }
  function onAnswer(ok, entry) {
    if (!ok && entry) setWrong((w) => [...w, entry]);
    supabase.rpc("duel_answer", { p_id: id, p_ok: !!ok }).then(({ data, error }) => { if (error) setErr(rpcErr(error)); applySt(data); });
  }
  function onFinish() {
    setLocalDone(true);
    supabase.rpc("duel_finish", { p_id: id }).then(({ data, error }) => { if (error) setErr(rpcErr(error)); applySt(data); });
  }
  function leave() {
    const msg = !startAt ? "Zapustiš pripravo? Match se zate konča." : activeP.length > 2 ? "Zapustiš match? To je predaja: zate poraz, ostali nadaljujejo." : "Zapustiš match? To je predaja: ti poraz, nasprotnik zmaga.";
    if (confirm(msg)) act("abandon_challenge");
  }
  async function rematch() {
    if (!res || res.error) return;
    setBusy(true);
    const r = await createChallenge(activeP.filter((p) => p.user_id !== userId).map((p) => p.user_id), res.sem, res.subj, res.part, st.mode, st.win_rule === "time" ? (st.seconds_limit <= 300 ? "t5" : "t10") : st.win_rule === "points" ? "p1000" : (st.question_ids || []).length >= 20 ? "q20" : "q10");
    setBusy(false);
    if (r.error) { setErr(r.error); return; }
    go({ view: "duel", id: r.id });
  }
  const back = () => go({ view: "profile" });
  const Back = () => (
    <button onClick={back} className="ix-chip" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: 0, marginBottom: 14 }}>
      <ChevronLeft size={15} /> Profil in arena
    </button>
  );
  const btn = (bg) => ({ background: bg, color: bg === "transparent" ? "var(--ink)" : "#fff", border: `1px solid ${bg === "transparent" ? "var(--ink)" : bg}`, padding: "11px 18px", display: "inline-flex", alignItems: "center", gap: 7 });

  if (err && !st) return <div className="ix-fade"><Back /><div className="ix-card" style={{ padding: 22, fontSize: 14, color: "var(--ink2)" }}>{err}</div></div>;
  if (!st) return <div className="ix-fade"><Back /><div style={{ textAlign: "center", color: "var(--ink2)", padding: "10vh 0", fontSize: 15 }}>Nalagam match…</div></div>;

  const title = `${SIZE_LABEL[st.size] || "Match"} · ${MODE_LABEL[st.mode]}${st.mode === "classic" ? " · " + winRuleText(st) : ""}`;
  const liveObj = { players: activeP.length ? activeP : players, me: userId, mode: st.mode, n, fixedN: st.mode === "classic" && st.win_rule === "questions", events: st.events || [], hitFlash };

  // GLEDALEC: nisem igralec; vidim napredek, dogodke in vprašanja, pri katerih so igralci
  if (spectator && (running || countdown || st.status === "done")) {
    const left = endAt ? Math.max(0, Math.ceil((endAt - now()) / 1000)) : 0;
    return (
      <div className="ix-fade">
        <Back />
        <div className="ix-card" style={{ padding: 22, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 10, flexWrap: "wrap" }}>
            <Swords size={20} color="var(--terra)" />
            <div style={{ flex: 1 }}><h2 className="ix-serif" style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>{title}</h2><div className="ix-chip" style={{ marginTop: 2 }}>{st.part_name} · {st.status === "done" ? "končano" : "v živo"}</div></div>
            {st.status !== "done" && running && <span className="ix-chip" style={{ color: left <= 60 ? "var(--red)" : "var(--teal)", fontVariantNumeric: "tabular-nums" }}>⏱ {fmtTime(left)}</span>}
          </div>
          {st.status === "done" && <div className="ix-serif" style={{ fontSize: 24, fontWeight: 900, margin: "0 0 10px" }}>{st.winner ? `Zmagal je ${nameOf(st.winner)}.` : "Neodločeno."}</div>}
          <DuelLive live={liveObj} />
          {st.status !== "done" && res && !res.error && activeP.map((p) => {
            const q = res.questions[Math.min(p.answered || 0, res.questions.length - 1)];
            return q && !p.finished ? (
              <div key={p.user_id} className="ix-card" style={{ padding: "10px 13px", marginBottom: 8 }}>
                <div className="ix-chip" style={{ marginBottom: 4 }}>{p.username} · vprašanje {(p.answered || 0) + 1}</div>
                <div style={{ fontSize: 14, lineHeight: 1.4 }}>{serifBars(q.q)}</div>
                <div style={{ fontSize: 12.5, color: "var(--ink2)", marginTop: 4 }}>{(q.options || []).map((o, k) => `${"ABCDEF"[k]}) ${o}`).join("  ·  ")}</div>
              </div>
            ) : null;
          })}
        </div>
      </div>
    );
  }

  // MATCH TEČE (jaz še nisem končal)
  if (running && me && me.ready_at && !me.finished && !localDone && res && !res.error) {
    const duel = {
      questions: res.questions, resumeAnswered: me.answered || 0, resumeCorrect: me.correct || 0,
      left: () => Math.max(0, Math.ceil((endAt - now()) / 1000)),
      onAnswer, onFinish, onLeave: leave, live: liveObj,
      hints: hintsLeft || 0, useHint: () => { if (!hintsLeft) return false; setHintsLeft((h) => h - 1); return true; },
      ability: pro && me.character && me.character.ability ? { id: me.character.ability, ...(charById(me.character.id).ability || {}), active: ACTIVE_ABILITIES.includes(me.character.ability), used: !!me.ability_used, armed: !!me.boost } : null,
      useAbility: async () => { const { data, error } = await supabase.rpc("duel_ability", { p_id: id }); if (error) { setErr(rpcErr(error)); return null; } applySt(data); return me.character.ability; },
    };
    return (
      <>
        <QuizView key={id} route={{ view: "quiz", sem: res.sem.id, subj: res.subj.id, part: res.part.id, deck: "__1v1" }} go={go} record={() => {}} userId={userId} duel={duel} />
        {formulas && RANKED_FORMULAS.indexOf(res.subj.id) >= 0 && <FormulaDock key={res.subj.id} subjId={res.subj.id} />}
      </>
    );
  }

  const myFin = !!(me && me.finished) || localDone;
  const leftP = players.filter((p) => p.status === "left");
  const sorted = [...activeP].sort((a, b) => battle
    ? ((b.eliminated ? 0 : 1) - (a.eliminated ? 0 : 1)) || ((b.hp || 0) - (a.hp || 0)) || (b.correct - a.correct) || ((a.seconds ?? 9e9) - (b.seconds ?? 9e9))
    : ((b.points || 0) - (a.points || 0)) || (b.correct - a.correct) || ((a.seconds ?? 9e9) - (b.seconds ?? 9e9))).concat(leftP);
  const fixedN = st.mode === "classic" && st.win_rule === "questions";   // sicer (čas, točke, bitka) štejemo odgovorjena
  const stLabel = { pending: "povabilo", accepted: running ? "match" : countdown ? "začenja se" : "priprava", done: "rezultat", declined: "zavrnjeno", cancelled: "preklicano", abandoned: "prekinjeno" }[st.status];

  return (
    <div className="ix-fade">
      <Back />
      <div className="ix-card" style={{ padding: 24, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 6 }}>
          <Swords size={20} color="var(--terra)" />
          <div><h2 className="ix-serif" style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>{title}</h2><div className="ix-chip" style={{ marginTop: 2 }}>{st.part_name} · {stLabel}</div></div>
        </div>
        {err && <div style={{ color: "var(--terra)", fontSize: 13, margin: "8px 0" }}>{err}</div>}
        {res && res.error && st.status !== "done" && <div style={{ color: "var(--terra)", fontSize: 13.5, margin: "8px 0" }}>{res.error}</div>}

        {/* igralci in njihov status (povabilo / lobby) */}
        {(st.status === "pending" || (st.status === "accepted" && !startAt)) && (
          <div style={{ margin: "12px 0", display: "grid", gap: 4 }}>
            {players.filter((p) => p.status !== "declined" || st.status === "pending").map((p) => (
              <div key={p.user_id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
                <span style={{ width: 26, display: "grid", placeItems: "center" }}>{p.character && pro ? <CharArt id={p.character.id} size={26} /> : p.user_id === userId && pro ? <CharArt id={myPick.character} size={26} /> : <Pic photo={p.photo} name={p.username} size={24} />}</span>
                <b>{p.username}{p.user_id === userId ? " (ti)" : ""}</b>
                <span className="ix-chip" style={{ color: p.status === "declined" ? "var(--red)" : p.ready_at ? "var(--teal)" : "var(--ink2)" }}>
                  {p.status === "host" ? (st.status === "pending" ? "gostitelj" : p.ready_at ? "pripravljen" : "gostitelj · še ni pripravljen") : p.status === "invited" ? "čaka na odgovor" : p.status === "declined" ? "zavrnil" : p.status === "left" ? "odšel" : p.ready_at ? "pripravljen" : (st.status === "pending" ? "sprejel" : "še ni pripravljen")}
                </span>
              </div>
            ))}
          </div>
        )}

        {st.status === "pending" && me && me.status === "host" && (
          <div style={{ marginTop: 8, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <p style={{ color: "var(--ink2)", fontSize: 14, margin: 0, flexBasis: "100%" }}>Ko odgovorijo vsi povabljeni, se match sam premakne v pripravo. Lahko pa začneš že s tistimi, ki so sprejeli.</p>
            {players.some((p) => p.status === "accepted") && <button onClick={() => act("start_lobby")} disabled={busy} className="ix-btn" style={btn("var(--teal)")}><Zap size={16} /> Začni s tistimi, ki so sprejeli</button>}
            <button onClick={() => act("cancel_challenge", null, back)} disabled={busy} className="ix-btn" style={btn("transparent")}>Prekliči izziv</button>
          </div>
        )}
        {st.status === "pending" && me && me.status === "invited" && (
          <div style={{ marginTop: 8 }}>
            <p style={{ color: "var(--ink2)", fontSize: 14.5, margin: "0 0 14px" }}><b style={{ color: "var(--ink)" }}>{nameOf(st.host)}</b> te vabi v {SIZE_LABEL[st.size]}: {battle ? `do ${n} istih vprašanj` : `${n} istih vprašanj`}, {fmtTime(st.seconds_limit)} časa, brez razlag in slovarčka. {pro ? "Bitka z liki: vprašanja tečejo, dokler nekomu ne zmanjka HP; pravilen odgovor udari vse nasprotnike; izbereš lik in opremo. 2 zaporedna napačna = −10 HP." : battle ? "Bitka do 0 HP: vsi imate 100 HP, pravilen odgovor udari vse nasprotnike, vsak 3. zaporedni pravilni vrne 5 HP. 2 zaporedna napačna = −10 HP." : "Klasika: 100 točk za pravilen odgovor + do 50 za hitrost."}</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={() => act("respond_challenge", { p_id: id, p_accept: true })} disabled={busy || !!(res && res.error)} className="ix-btn" style={btn("var(--teal)")}><Check size={16} /> Sprejmi</button>
              <button onClick={() => act("respond_challenge", { p_id: id, p_accept: false }, back)} disabled={busy} className="ix-btn" style={btn("transparent")}>Zavrni</button>
            </div>
          </div>
        )}
        {st.status === "pending" && me && me.status === "accepted" && <p style={{ color: "var(--ink2)", fontSize: 14.5, margin: "8px 0 0" }}>Sprejel si. Čakamo še na ostale; ko odgovorijo (ali gostitelj začne), te aplikacija sama pripelje v pripravo.</p>}
        {st.status === "pending" && me && me.status === "declined" && <p style={{ color: "var(--ink2)", fontSize: 14.5, margin: "8px 0 0" }}>Povabilo si zavrnil.</p>}
        {(st.status === "declined" || st.status === "cancelled") && (
          <p style={{ color: "var(--ink2)", fontSize: 14.5, margin: "14px 0 0" }}>{st.status === "declined" ? "Nihče ni sprejel povabila; match odpade." : (st.host === userId ? "Izziv si preklical." : `${nameOf(st.host)} je izziv preklical.`)}</p>
        )}
        {st.status === "abandoned" && (
          <p style={{ color: "var(--ink2)", fontSize: 14.5, margin: "14px 0 0" }}>Match je bil prekinjen{st.abandoned_by ? (st.abandoned_by === userId ? " (ti)" : ` (${nameOf(st.abandoned_by)})`) : ""} in se ne šteje.</p>
        )}

        {st.status === "accepted" && !startAt && me && (me.status === "host" || me.status === "accepted") && (
          <div style={{ marginTop: 8 }}>
            {!me.ready_at ? (
              <>
                <p style={{ color: "var(--ink2)", fontSize: 14.5, margin: "0 0 6px" }}>{battle ? `Do ${n} vprašanj (konec, ko nekomu zmanjka HP)` : `${n} vprašanj`}, {fmtTime(st.seconds_limit)}. Match začne 3 sekunde po tem, ko so pripravljeni vsi.</p>
                <p style={{ color: "var(--ink2)", fontSize: 13, margin: "0 0 14px" }}>Ko klikneš »Pripravljen«, se odhod s strani šteje kot odhod iz matcha (zate ne šteje{activeP.length > 2 ? ", ostali nadaljujejo" : ""}).</p>
                {pro && (
                  <div style={{ marginBottom: 16 }}>
                    <div className="ix-chip" style={{ color: "var(--terra)", marginBottom: 8 }}>Tvoj lik in oprema za to bitko</div>
                    <CharPicker compact character={myPick.character} items={myPick.items} onChange={(c, its) => setPick({ character: c, items: its })} level={(soc && soc.record && soc.record.level) || 1} />
                  </div>
                )}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button onClick={() => act("duel_ready", { p_id: id, p_character: pro ? charBuild(myPick.character, myPick.items) : null })} disabled={busy || !!(res && res.error)} className="ix-btn" style={btn("var(--teal)")}><Zap size={16} /> Pripravljen sem</button>
                  <button onClick={leave} disabled={busy} className="ix-btn" style={btn("transparent")}>{activeP.length > 2 ? "Zapusti" : "Prekini"}</button>
                </div>
              </>
            ) : (
              <>
                <p style={{ color: "var(--ink2)", fontSize: 14.5, margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}><Clock size={16} /> Pripravljen si. Čakam na: <b style={{ color: "var(--ink)" }}>{activeP.filter((p) => !p.ready_at).map((p) => p.username).join(", ") || "…"}</b></p>
                <button onClick={leave} disabled={busy} className="ix-btn" style={btn("transparent")}>{activeP.length > 2 ? "Zapusti" : "Prekini"}</button>
              </>
            )}
          </div>
        )}
        {countdown && (
          <div style={{ textAlign: "center", padding: "18px 0 6px" }}>
            <div className="ix-chip">začne čez</div>
            <div className="ix-serif" style={{ fontSize: 64, fontWeight: 900, lineHeight: 1 }}>{Math.max(1, Math.ceil((startAt - now()) / 1000))}</div>
          </div>
        )}
        {running && me && !me.ready_at && <p style={{ color: "var(--ink2)", fontSize: 14.5, margin: "14px 0 0" }}>Match že teče brez tebe (nisi kliknil »Pripravljen«).</p>}
        {st.status === "accepted" && me && me.status === "left" && <p style={{ color: "var(--ink2)", fontSize: 14.5, margin: "14px 0 0" }}>Match si predal (poraz). Ostali nadaljujejo.</p>}
        {spectator && !running && !countdown && st.status !== "done" && <p style={{ color: "var(--ink2)", fontSize: 14.5, margin: "14px 0 0" }}>Nisi igralec tega matcha. Ko se začne, ga lahko gledaš v živo.</p>}

        {(myFin || st.status === "done") && (
          <div style={{ marginTop: 16 }}>
            {st.status === "done" ? (
              <div className="ix-serif" style={{ fontSize: 30, fontWeight: 900, margin: "4px 0 12px", color: st.winner === userId ? "var(--teal)" : st.winner ? "var(--red)" : "var(--ink)" }}>
                {st.winner === userId ? "Zmagal si! 🏆" : st.winner ? `Zmagal je ${nameOf(st.winner)}.${me && me.status === "left" ? " Predal si." : ""}` : "Neodločeno."}
              </div>
            ) : (
              <p style={{ color: "var(--ink2)", fontSize: 14.5, margin: "0 0 12px", display: "flex", alignItems: "center", gap: 8 }}><Clock size={16} /> {me && me.eliminated ? "Izločen si. " : "Končal si. "}Čakam, da končajo: {activeP.filter((p) => !p.finished).map((p) => `${p.username} (${p.answered || 0}${battle ? "" : "/" + n})`).join(", ") || "…"}</p>
            )}
            <div style={{ display: "grid", gap: 8 }}>
              {sorted.map((p, k) => {
                const isMe = p.user_id === userId, win = st.status === "done" && st.winner === p.user_id;
                return (
                  <div key={p.user_id} className="ix-card" style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 12, borderLeft: `3px solid ${isMe ? "var(--terra)" : "var(--teal)"}`, background: win ? "var(--okbg)" : undefined, opacity: p.status === "left" ? .6 : 1 }}>
                    <span className="ix-serif" style={{ fontSize: 20, fontWeight: 900, width: 26, color: "var(--ink2)" }}>{k + 1}.</span>
                    {p.character && pro ? <CharArt id={p.character.id} size={34} /> : <Pic photo={p.photo} name={p.username} size={34} />}
                    <div style={{ flex: 1, minWidth: 120 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 6 }}>{win && <Crown size={14} color="var(--teal)" />}{p.username}{isMe ? " (ti)" : ""}</div>
                      <div className="ix-chip">{p.status === "left" ? "predal" : p.eliminated ? "izločen" : p.finished && p.seconds != null ? `čas ${fmtTime(p.seconds)}` : p.finished ? "končal" : `odgovoril ${p.answered || 0}/${n}`}{battle && p.max_streak > 1 ? ` · najdaljša serija ${p.max_streak}` : ""}{battle && p.dmg_dealt ? ` · škoda ${p.dmg_dealt}` : ""}{pro && p.character && p.character.items ? ` · ${splitItems(p.character.items).map((x) => itemById(x).name).join(", ")}` : ""}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="ix-serif" style={{ fontSize: 24, fontWeight: 900, lineHeight: 1 }}>{battle ? <>{Math.max(0, p.hp || 0)}<span style={{ fontSize: 12, color: "var(--ink2)" }}> HP</span></> : <>{p.points || 0}<span style={{ fontSize: 12, color: "var(--ink2)" }}> t.</span></>}</div>
                      <div className="ix-chip">{p.correct || 0} / {fixedN ? n : (p.answered || 0)} pravilnih{p.status === "left" ? " · predal" : ""}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {st.status === "done" && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
                <button onClick={rematch} disabled={busy || !res || !!res.error} className="ix-btn" style={btn("var(--terra)")}><Swords size={16} /> Revanša</button>
                <button onClick={back} className="ix-btn" style={btn("transparent")}>Nazaj na profil</button>
              </div>
            )}
          </div>
        )}
      </div>
      {myFin && battle && st.status !== "done" && <DuelLive live={liveObj} />}
      {wrong.length > 0 && <WrongReview wrong={wrong} />}
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

  // Tipkovnica: presledek / Enter obrne, ← ali 1 = še ne znam, → ali 2 = znam, R ponovi
  const kb = useRef({});
  useEffect(() => {
    function onKey(e) {
      if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
      const t = e.target, tag = t && t.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (t && t.isContentEditable)) return;
      const st = kb.current, k = e.key;
      if (st.done) { if (k === "r" || k === "R") { e.preventDefault(); st.restart(); } return; }
      if (k === " " || k === "Enter") { e.preventDefault(); st.flip(); return; }
      if (!st.flipped) return;
      if (k === "ArrowLeft" || k === "1") { e.preventDefault(); st.advance(false); }
      else if (k === "ArrowRight" || k === "2") { e.preventDefault(); st.advance(true); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  kb.current = { done, flipped, restart, advance, flip: () => setFlipped((f) => !f) };

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
          <div className="ix-kbdhint" style={{ justifyContent: "center" }}><span><kbd className="ix-kbd">R</kbd> premešaj znova</span></div>
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
            <div className="ix-serif" style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.25 }}>{serifBars(card.front)}</div>
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
      <div className="ix-kbdhint" style={{ justifyContent: "center" }}>
        {!flipped
          ? <span><kbd className="ix-kbd">presledek</kbd> obrni</span>
          : <><span><kbd className="ix-kbd">←</kbd> še ne znam</span><span><kbd className="ix-kbd">→</kbd> znam</span></>}
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
    mixDecksOf(p).forEach((d) => { const ds = deckStats(stats, `${sem.id}/${subj.id}/${p.id}/${d.id}`); if (ds) rows.push({ part: p.name, name: d.name, kind: d.id === "__ranked" ? "Ranked" : "Mešani", ds, c: commDeck(comm, `${sem.id}/${subj.id}/${p.id}/${d.id}`) }); });
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

function OverallStatsView({ stats, go, year, comm, userId }) {
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

      <OverallLeaderboard userId={userId} year={year} />

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

/* Zapiski: tabelo brez ovoja .tbl zavije, da drsi vodoravno tabela in ne cela stran (telefon). */
function wrapTables(html) {
  if (!html) return "";
  return html.replace(/<table[\s\S]*?<\/table>/g, (m, off) => (/<div class="tbl">\s*$/.test(html.slice(Math.max(0, off - 40), off)) ? m : '<div class="tbl">' + m + "</div>"));
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
      <div className="ix-notes" dangerouslySetInnerHTML={{ __html: wrapTables(part.notes) }} />
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
