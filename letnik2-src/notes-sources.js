/* Čiščenje sklicev na vire v zapiskih (HTML), preden gredo v app (CLAUDE.md: v vsebini appa ni sklicev na prosojnice,
   strani PDF, imena datotek, vaje po številkah in osebe). Zasebni ZAPISKI.md v mapi School vire lahko obdržijo.
   Kliče ga add-letnik2-vsebina.js za vsak del (po sestavi part.notes). Postopek je idempotenten:
   1) FIXES s stage 'pre' (notes-fixes.js) na surovem HTML,
   2) mehansko: naslovi (»P01 + V01 · «, »Stran 2 (prosojnici 3–4): «, »Prosojnica 11: «), oklepaji, ki so samo sklic
      (»(PDF str. 3, prosojnica 5)«, »(Predavanja/…pdf)«, »(učbenik pogl. 2.2)«, »(prof)«), vrstice »Fotografija: <i>pot</i>«,
   3) splošne fraze (PHRASES spodaj, npr. »Vprašanje s prosojnice« -> »Vprašanje za razmislek«),
   4) FIXES brez stage (ročni vsebinski prepisi po delih, notes-fixes.js) na že očiščenem HTML.
   Če find iz FIXES ne zadene in zamenjave ni v besedilu, izpiše opozorilo (vir se je spremenil: popravi notes-fixes.js). */
const SRC = /PDF\s*str\.|\bpredavanje\s+\d|\bVaje\s+\d|\bdodatek\s+(?:str\.\s*)?\d|\d+\s+pr\.|prosojnic|učbenik|\bslika\s+\d|\bpr\.\s*\d|\.(pdf|pptx?|key|docx?|Rmd|xlsx?)\b|\b[PV]\d{2}\b|Predavanja\/|Vaje\/|Canvas|\bprof\b|profesor/i;
const strip = (h) => h.replace(/<[^>]+>/g, '');
const NUM = '\\d+(?:\\s*[–-]\\s*\\d+)?(?:\\s*(?:in|,)\\s*\\d+)*';
const FILE = '[^\\s()]*\\.(?:pdf|pptx?|key|docx?|Rmd|xlsx?|R)';
/* segment oklepaja, ki je SAMO sklic (brez vsebine) */
const PURE = new RegExp('^(?:(?:glej|gl\\.|prim\\.|več v)\\s+(?:tudi\\s+|zgoraj\\s+)?)?(?:' + [
  'PDF\\s*str\\.\\s*' + NUM,
  'str\\.\\s*' + NUM + '\\s*PDF',
  '(?:\\d+\\s+|~\\s*|zgornja\\s+|spodnja\\s+|dopolnjena\\s+|zbirna\\s+)?prosojnic\\w*(?:\\s+' + NUM + ')?',
  '(?:str\\.|stran)\\s*' + NUM,
  '(?:odgovor\\s+na\\s+)?pr\\.\\s*' + NUM,
  '\\d+\\s+pr\\.(?:\\s*\\+\\s*dodatek)?',
  'dodatek(?:\\s+str\\.)?\\s*' + NUM,
  'predavanje\\s+\\d+(?:\\/\\d+)?',
  'Vaje\\s+\\d+',
  'vaje\\s+\\d{1,2}\\.\\s*\\d{1,2}\\.\\s*\\d{4}',
  '\\d{1,2}\\.\\s*\\d{1,2}\\.\\s*\\d{4}(?=\\s*$)',
  FILE,
  '(?:Predavanja|Vaje)\\/[^()]*',
  'učbenik(?:u)?(?:\\s+(?:pogl\\.|str\\.|poglavje)\\s*[\\d.]+(?:\\s*(?:in|,|[–-])\\s*[\\d.]+)*)?(?:\\s+[\\d.]+\\s+[^()]{0,40})?',
  'slika\\s+\\d+(?:\\.\\d+)?',
  '\\d+\\s+str\\.',
  'prof\\.?(?:\\s+na\\s+(?:vajah|predavanju))?(?:\\s+\\d+\\.\\s*\\d+\\.(?:\\s*\\d{4})?)?',
  'profesor\\w*',
  '(?:na|s)\\s+table',
  '[PV]\\d{1,2}(?:\\s*[+/]\\s*[PV]\\d{2})*(?:\\s+(?:\\d+[a-z]?|nal\\.\\s*\\d+[a-z]?))?',
  '(?:podrobno\\s+)?na\\s+prosojnicah(?:\\s+\\S+)?',
].join('|') + ')$', 'i');

function scrubParens(html) {
  // oklepaji brez gnezdenja (dovoljene oznake znotraj); segmenti (ločeni z ; , ali /), ki so samo sklic, izpadejo.
  // Če je v oklepaju stavek s sklicem, ostane cel (ročni prepis v notes-fixes.js).
  return html.replace(/\s?\(((?:[^()<]|<[^>]*>)*)\)/g, (m, inner) => {
    if (!SRC.test(strip(inner))) return m;
    const segs = inner.split(/\s*(?:[;,]|\s\/)\s*(?![^<]*>)/);
    if (segs.some((s) => SRC.test(strip(s)) && !PURE.test(strip(s).trim()))) return m;
    const keep = segs.filter((s) => !PURE.test(strip(s).trim()) && strip(s).trim());
    if (!keep.length) return '';
    return (m.startsWith(' ') ? ' ' : '') + '(' + keep.join(', ') + ')';
  });
}
/* »Prosojnica 11: «, »Prosojnici 6–7: «, »Prosojnica 2 (3): «, »Prosojnice 9+: « na začetku naslova */
const PROS = /^\s*(?:Prosojnic\w*|Pr\.)\s+\d+\+?(?:\s*\(\d+(?:[–-]\d+)?\))?(?:\s*(?:[–-]|in|\+)\s*\d*\+?(?:\s*\(\d+(?:[–-]\d+)?\))?)?\s*(?:[:,]|\s[–-])\s*/i;
const cap = (s) => s.replace(/^(\s*)(\p{Ll})/u, (x, sp, c) => sp + c.toUpperCase());
function scrubHeadings(html) {
  return html.replace(/<(h[234])([^>]*)>([\s\S]*?)<\/\1>/g, (m, tag, attrs, t) => {
    let x = t;
    const vaje = tag === 'h2' && /^\s*V\d{2}\s*[·:\-–]/.test(x);                // vaje: ločimo od istoimenskega predavanja
    x = x.replace(/^\s*(?:[PV]\d{2}(?:\s*[+,/&]\s*|\s+in\s+))*[PV]\d{2}\s*[·:\-–]\s*/, '');   // »P01 + V01 · Tema«
    x = x.replace(/^\s*Stran\s+\d+\s*(?=\()/i, '');                                    // »Stran 2 (prosojnici 3–4): Tema«
    x = scrubParens(x);
    if (tag === 'h2') {
      x = x.replace(/^\s*\d+\.\s*(?:predavanje|vaja|vaje)\s*\([^)]*\)\s*[-–]\s*/i, '');   // »3. predavanje (15. 10. 2026) - Tema«
      x = x.replace(/^\s*Vaj[ae]\s+(?:\d+|\d{1,2}\.\s*\d{1,2}\.\s*\d{4})\s*[-–]\s*/i, ''); // »Vaje 2 – Tema«, »Vaja 16. 11. 2026 - Tema«
      x = x.replace(/\s*·\s*\d{1,2}\.\s*\d{1,2}\.\s*\d{4}/g, '');                        // »Tema · 22. 10. 2026«
      x = x.replace(/\s*\((?:(?:pet|vaje|predavanj[ei]?|teden)\s+)?\d{1,2}\.(?:\s*(?:in|[–-])\s*\d{1,2}\.)*\s*\d{1,2}\.\s*\d{4}(?:;\s*Vaje\s*\d+)?\)/gi, ''); // »(13. 10. 2026)«
      x = x.replace(/^\s*\d+\.\s*vaje\s*\(([^()]*)\)\s*$/i, (m, t) => cap(t));            // »1. vaje (osnovni pojmi …)«
    }
    x = x.replace(/^\s*[:·\-–]\s*/, '');
    if (vaje) x = x.replace(/\s+$/, '') + ' (naloge)';
    if (PROS.test(x)) x = cap(x.replace(PROS, ''));
    return `<${tag}${attrs}>${x.replace(/\s{2,}/g, ' ').trim()}</${tag}>`;
  });
}
function mechanical(html) {
  let h = html;
  // vrstice »Fotografija: <i>pot</i>« (fotografije s predavanj se ne objavljajo, ostal je le sklic)
  h = h.replace(/(<\/li><li>|<ul><li>)\s*Fotografija:\s*<i>[^<]*<\/i>\s*(?=<\/li>)/g, (m, a) => (a === '<ul><li>' ? '<ul><li>' : ''));
  // »Prosojnica 11: tema« na začetku krepkega odstavka ali alineje
  h = h.replace(/(<p><b>|<li>\s*<b>)([^<]*)/g, (m, a, t) => (PROS.test(t) ? a + cap(t.replace(PROS, '')) : m));
  // »<b>P01 - Tema</b>«
  h = h.replace(/<b>[PV]\d{2}(?:\s*[+\/]\s*[PV]\d{2})*\s*[-–·:]\s*/g, '<b>');
  h = scrubHeadings(h);
  h = scrubParens(h);
  return h.replace(/<ul><li>\s*<\/li><\/ul>/g, '');
}

/* ---- Oznake predavanj, vaj, nalog, primerov in slik (»P04, slika 2.3 (…)«, »Vaje 3, naloga 1: …«) ----
   Uporablja se za besedilo v slikah SVG (ob kopiranju v docs/img, md-notes.js), za podnapise in alt slik v zapiskih. */
function scrubLabel(t) {
  let x = t;
  x = x.replace(/^\s*(?:(?:[PV]\d{1,2}|[Vv]aje\s*\d+)(?:\s*[+,]\s*(?:[PV]\d{1,2}|[Vv]aje\s*\d+))*)(?:\s*[,:]\s*|\s+(?=\S)|\s*$)/, '');
  x = x.replace(/,?\s*\b(?:izpitn\w*\s+)?(?:slik[ae]|prosojnic\w*|primer\w*|nalog[ae])\s+\d+(?:\.\d+)?(?:\s*[–-]\s*\d+)?\b/gi, '');
  x = x.replace(/\(\s*\)/g, '').replace(/\s+([:,;)])/g, '$1').replace(/^\s*[:,;]\s*/, '').trim();
  const m = /^\(([^()]*)\)$/.exec(x); if (m) x = m[1].trim();
  return x;
}
/* besedilo v <text>/<title> elementih SVG (vključno s <tspan>) */
function scrubSvg(svg) {
  return svg.replace(/(<(text|title)\b[^>]*>)([\s\S]*?)(<\/\2>)/g, (m, a, tag, inner, b) => a + inner.split(/(<[^>]+>)/).map((p) => (p.startsWith('<') ? p : scrubLabel(p))).join('') + b)
    .replace(/(aria-label=")([^"]*)(")/g, (m, a, v, b) => a + scrubLabel(v) + b);
}
/* Nevtralno ime slikovne datoteke: brez »Predavanja_slike_lastni_grafi_«, »Vaje_V02_«, »naloga1«, »tabla«, »Primer_5.2« … */
const NAME_OVERRIDE = { 'Vaje_vaje3_naloga1_graf.svg': 'prosta-trgovina-graf-1.svg', 'Vaje_vaje3_naloga3_graf.svg': 'prosta-trgovina-graf-2.svg' };
function neutralName(name) {
  if (NAME_OVERRIDE[name]) return NAME_OVERRIDE[name];
  if (!/_/.test(name) && name === name.toLowerCase()) return name;   // že nevtralno
  const dot = name.lastIndexOf('.'), base = dot > 0 ? name.slice(0, dot) : name, ext = dot > 0 ? name.slice(dot).toLowerCase() : '';
  const DROP = /^(predavanja|predavanje|vaje|vaja|slike|lastni|grafi|tabla|primer|primeri|naloga|[pv]\d{1,2}|vaje\d+|naloga\d+|\d+(\.\d+)*)$/i;
  const toks = base.split(/[_\s]+/).filter((t) => t && !DROP.test(t));
  return (toks.join('-').toLowerCase() || 'slika') + ext;
}
/* Slike v HTML zapiskov: nevtralni URL, očiščena alt in podnapis */
function scrubFigures(html) {
  return html.replace(/(img\/[a-z0-9]+\/)([^"'\s)]+)/g, (m, dir, f) => dir + neutralName(f))
    .replace(/(<img\b[^>]*\balt=")([^"]*)(")/g, (m, a, v, b) => a + scrubLabel(v) + b)
    .replace(/(<figcaption>)([\s\S]*?)(<\/figcaption>)/g, (m, a, v, b) => a + v.split(/(<[^>]+>)/).map((p) => (p.startsWith('<') ? p : scrubLabel(p))).join('') + b);
}

/* Splošne fraze (vsi deli). Vrstni red je pomemben. */
const PHRASES = [
  [/Navodila profesorjev in asistentov o obliki preverjanja\./g, 'Navodila za obliko preverjanja.'],
  [/Vprašanje s prosojnice/g, 'Vprašanje za razmislek'],
  [/vprašanje s prosojnice/g, 'vprašanje za razmislek'],
  [/Primeri s prosojnic\b/g, 'Primeri'],
  [/Primer s prosojnice\b/g, 'Primer'],
  [/ s prosojnice\b/g, ''],
  [/ s prosojnic\b/g, ''],
  [/\s*-\s*⭐ profine definicije(?: \((?:dopolnjena )?prosojnica\))?/g, ' ⭐'],
  [/<b>Prof:<\/b>\s*/g, ''],
  [/⭐ <b>PROF: /g, '⭐ <b>'],
  [/\(prof\.? - dobesedno\)/g, '(s predavanja)'],
  // oštevilčenja nalog in primerov z vaj in iz učbenika (»Naloga 1 - kriza« -> »Naloga: kriza«, »Primer 2.3 - jabolka« -> »Primer: jabolka«)
  [/\s*\((?:nal\.|naloga|[Pp]rimer\w*|str\.|skripta,\s*str\.)\s*\d+(?:\.\d+)?[a-z]?\)/g, ''],
  [/,\s*naloga\s+\d+[a-z]?(?=\))/g, ''],
  [/\b(?:Izpitna\s+)?([Nn])aloga\s+\d+[a-z]?\s*[-–]\s*/g, '$1aloga: '],
  [/\b(?:Izpitna\s+)?([Nn])aloga\s+\d+[a-z]?\b/g, '$1aloga'],
  [/\b([Pp])rimer\s+\d+\.\d+[a-z]?\s*[-–]\s*/g, '$1rimer: '],
  [/\b([Pp])rimer\s+\d+\.\d+[a-z]?\b/g, '$1rimer'],
  [/\bSlika\s+\d+\.\d+:\s*/g, 'Na grafu: '],
  [/\+\s*\d+\.\s*vaja\b/g, '+ vaja'],
  [/\b([Nn])al\.\s*\d+[a-z]?\b/g, '$1aloga'],
  [/\b\d+\.\s*vaje:\s*/g, 'Vaje: '],
  [/\s*\(str\.\s*\d+\s+v\s+učbeniku\)/g, ''],
  [/\s*\((?:po\s+)?profesor\w*(?:\s+(?:na\s+vajah|na\s+predavanju|poudaril\w*))?\)/g, ''],
  [/(<li>\s*(?:<b>)?)Pr\.\s*\d+(?:[–-]\d+)?(?:\s+(?:podrobneje|dopolnitev|z modeli \(izračun\)))?\s*[:–-]\s*(\p{Ll}?)/gu, (m, a, c) => a + c.toUpperCase()],
  [/\b([Pp])rimer\s+[-–]\s+/g, '$1rimer: '],   // poenotenje, ko je oklepaj med številko in pomišljajem izginil kasneje
];
/* find je besedilo, kjer je vsak presledek lahko tudi nova vrstica v HTML (in obratno) */
const loose = (s) => new RegExp((/^\s/.test(s) ? '\\s*' : '') + s.trim().split(/\s+/).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s+') + (/\s$/.test(s) ? '\\s*' : ''), 'g');
/* Brisanje (replace '') ob ponovnem zagonu ne zadene več in ne opozori; zamenjava opozori, če ni ne find ne replace. */
function applyFixes(html, part, fixes, stage, warn) {
  for (const f of fixes) {
    if ((f.stage || 'post') !== stage || (f.part !== part && f.part !== '*')) continue;
    if (f.find instanceof RegExp) { html = html.replace(f.find, f.replace); continue; }
    if (loose(f.find).test(html)) html = html.replace(loose(f.find), () => f.replace);
    else if (f.replace.trim() && !loose(f.replace.replace(/\[\[(?:[^\]|]+\|)?([^\]]+)\]\]/g, '$1')).test(html.replace(/<a class="ix-goto"[^>]*>|<\/a>/g, ''))) warn(`  ! notes-fixes ${part}: ni zadetka za »${f.find.trim().slice(0, 60)}«`);
  }
  return html;
}
/* ---- Notranje povezave ----
   V zapiskih je sklic zapisan kot [[Naslov razdelka|besedilo]] (ročno v notes-fixes.js ali samodejno spodaj); na koncu postane
   <a class="ix-goto" data-goto="<točen naslov h2/h3>">besedilo</a>. Motor (NotesView) ob kliku odpre razdelek, ga pomakne v pogled
   in poudari. Naslov se razreši po končnih naslovih: točno, sicer edini naslov, ki se začne z njim ali ga vsebuje. */
const label = (t) => t.replace(/<[^>]+>/g, '').replace(/\s*\([^()]*\.(pdf|docx|md|html|xlsx|key|pptx)[^()]*\)/gi, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const range = (a, b) => { const out = []; for (let i = +a; i <= +(b || a) && out.length < 60; i++) out.push(i); return out; };
/* Samodejno (na surovem HTML, preden mehansko čiščenje odstrani številke): »glej prosojnico 6« -> povezava na razdelek,
   ki pokriva prosojnico 6 v istem predavanju (h2); »glej stran 5« enako; »glej X spodaj/zgoraj« -> razdelek z X v naslovu. */
function autoLinks(html) {
  const chunks = html.split(/(?=<h2[\s>])/);
  const allTitles = [...html.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/g)].map((m) => ({ raw: m[1], clean: label(scrubHeadings('<h3>' + m[1] + '</h3>').replace(/<\/?h3>/g, '')) }));
  return chunks.map((chunk) => {
    const slide = {}, page = {};
    let cur = null;
    for (const m of chunk.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>|<p><b>(Prosojnic\w*\s+\d+[^<]*)<\/b>/g)) {
      if (m[1] != null) {
        const raw = m[1], clean = label(scrubHeadings('<h3>' + raw + '</h3>').replace(/<\/?h3>/g, ''));
        cur = clean;
        let x;
        if ((x = /Stran\s+(\d+)\s*\(prosojnic\w*\s+(\d+)(?:\s*[–-]\s*(\d+))?\)/i.exec(raw))) { page[x[1]] = page[x[1]] || clean; range(x[2], x[3]).forEach((n) => { slide[n] = slide[n] || clean; }); }
        if ((x = /PDF\s*str\.\s*(\d+)(?:\s*[–-]\s*(\d+))?/i.exec(raw))) range(x[1], x[2]).forEach((n) => { page[n] = page[n] || clean; });
        for (const y of raw.matchAll(/(?:^|[\s(,])(?:prosojnic\w*|Pr\.)\s*(\d+)(?:\s*[–-]\s*(\d+))?(?![\d.])/gi)) if (!/^\s*(?:Vprašanje|Dodatno)/.test(raw)) range(y[1], y[2]).forEach((n) => { slide[n] = slide[n] || clean; });
      } else if (cur) { const y = /Prosojnic\w*\s+(\d+)(?:\s*[–-]\s*(\d+))?/i.exec(m[2]); if (y) range(y[1], y[2]).forEach((n) => { slide[n] = slide[n] || cur; }); }
    }
    // samo v besedilu (ne v naslovih)
    return chunk.split(/(<h[23][^>]*>[\s\S]*?<\/h[23]>)/).map((part, i) => {
      if (i % 2) return part;
      part = part.replace(/\bglej\s+(tudi\s+)?(?:(prosojnic\w*)|(stran))\s+(\d+)(?:\s*[–-]\s*\d+)?/gi, (m, tudi, pr, st, n) => {
        const t = pr ? slide[n] : page[n];
        return t ? 'glej ' + (tudi || '') + '[[' + t + ']]' : m;
      });
      part = part.replace(/\bglej\s+(?:razdelek\s+)?(»?)([^»«,;()<>\n]{3,60}?)(«?)\s+(spodaj|zgoraj)\b/g, (m, q1, x, q2, where) => {
        const hits = allTitles.filter((t) => t.clean.toLowerCase().includes(x.toLowerCase().trim()));
        const uniq = [...new Set(hits.map((t) => t.clean))];
        return uniq.length === 1 ? 'glej ' + q1 + '[[' + uniq[0] + '|' + x.trim() + ']]' + q2 + ' ' + where : m;
      });
      return part;
    }).join('');
  }).join('');
}
function renderLinks(html, part, warn) {
  const heads = [...html.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/g)].map((m) => label(m[1]));
  const find = (t) => {
    if (heads.includes(t)) return t;
    const low = t.toLowerCase();
    for (const f of [(h) => h.toLowerCase().startsWith(low), (h) => h.toLowerCase().includes(low), (h) => low.startsWith(h.toLowerCase().slice(0, 24))]) {
      const u = [...new Set(heads.filter(f))]; if (u.length === 1) return u[0];
    }
    return null;
  };
  return html.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, t, txt) => {
    const target = find(t.trim()), text = (txt || t).trim();
    if (!target) { warn(`  ! notes-sources ${part}: ni razdelka za povezavo »${t}«`); return text; }
    return `<a class="ix-goto" role="link" tabindex="0" data-goto="${esc(target)}">${text}</a>`;
  });
}
/* notes-fixes.js + zasebni vnosi iz notes-fixes.local.js (ni v gitu; { local: 'Lnn' } v javni tabeli označi njihovo mesto) */
function loadFixes() {
  let local = {};
  try { local = require('./notes-fixes.local'); } catch (e) { /* brez mape School zasebni vnosi niso potrebni */ }
  return require('./notes-fixes').map((f) => (f.local ? local[f.local] : f)).filter(Boolean);
}
function scrubSources(html, part, opts = {}) {
  if (!html) return html;
  const fixes = opts.fixes || loadFixes();
  const warn = opts.warn || ((m) => console.warn(m));
  let h = applyFixes(html, part, fixes, 'pre', warn);
  h = autoLinks(h);
  h = mechanical(h);
  for (const [re, to] of PHRASES) h = h.replace(re, to);
  h = scrubFigures(h);
  h = applyFixes(h, part, fixes, 'post', warn);
  return renderLinks(h, part, warn);
}
module.exports = { applyFixes, scrubSources, mechanical, autoLinks, renderLinks, scrubLabel, scrubSvg, neutralName, scrubFigures, SRC };
