/* indeks. — build: vstavi data.json v indeks-template.jsx → /Users/cocosmacbook/Documents/Claude/Indeks app/indeks-pipeline/dist/indeks-app.jsx
   Pipeline je bil rekonstruiran iz zgrajenega artefakta (vsebina 100% ohranjena).
   DATA je zaenkrat en JSON (data.json). Za urejanje: spreminjaj data.json (ali ga razbij na module in tu sestavi). */
const fs = require('fs');
// PRIVACY_CHECK: osebna imena ne smejo v objavljeno vsebino (imena sklopov, kartic, zapiski)
const PRIVATE_RE = /Majin|\bMaja\b|Špiler|\bTinkar|\bAljaž|\bMatjaž/;
function privacyCheck(data) {
  const bad = [];
  data.forEach((s) => s.subjects.forEach((su) => su.parts.forEach((p) => {
    if (PRIVATE_RE.test((p.notes || '').replace(/<[^>]+>/g, ' '))) bad.push(su.id + '/' + p.id + ' zapiski');
    (p.decks || []).forEach((d) => { if (PRIVATE_RE.test(d.name)) bad.push(su.id + '/' + p.id + '/' + d.id + ' ime sklopa'); });
    (p.flashcards || []).forEach((f) => { if (PRIVATE_RE.test(f.name)) bad.push(su.id + '/' + p.id + '/' + f.id + ' ime kartic'); });
  })));
  if (bad.length) throw new Error('Osebni podatki v vsebini: ' + bad.join(', '));
  return data;
}
// ZAŠČITA ID: gradnja pade ob vprašanju brez id, istem id z različno vsebino, izginulem ali upokojenem id, podvojenem ID kompleta (glej ids-lib.js, CLAUDE.md)
const IDS = require('./ids-lib');
const RAW = JSON.parse(fs.readFileSync(require('path').join(__dirname, 'data.json'), 'utf8'));
const ALIAS = IDS.loadAlias();
{
  const errs = IDS.checkIds(RAW, IDS.loadManifest(), ALIAS);
  if (errs.length) { console.error('GRADNJA USTAVLJENA - napake id (' + errs.length + '):\n  ' + errs.slice(0, 40).join('\n  ') + (errs.length > 40 ? '\n  ...' : '')); process.exit(1); }
}
const DATA = privacyCheck(require('./regroup')(RAW));   // sklopi po temah (regroup.js)
{ // po regroup.js (razpolavljanje velikih sklopov doda -1, -2 ...) ID kompleta v delu še vedno enoličen
  const bad = [];
  DATA.forEach((s) => s.subjects.forEach((su) => su.parts.forEach((p) => { const seen = new Set(); (p.decks || []).forEach((d) => { if (seen.has(d.id)) bad.push(`${s.id}/${su.id}/${p.id}/${d.id}`); seen.add(d.id); }); })));
  if (bad.length) { console.error('GRADNJA USTAVLJENA - podvojen ID kompleta po regroup.js: ' + bad.join(', ')); process.exit(1); }
}
const FIGS = require('./figures').applyFigures(DATA);   // grafi v razlagah (figures/*.js)

// (po želji) pomožnik za iskanje dela predmeta:
function findPart(sid, pid) {
  for (const sem of DATA) for (const su of sem.subjects) if (su.id === sid)
    for (const p of su.parts) if (p.id === pid) return p;
  return null;
}

const tpl = fs.readFileSync(require('path').join(__dirname,'indeks-template.jsx'), 'utf8');
const FORMULAS = require(require('path').join(__dirname,'formulas.js'));
const CHARACTERS = require(require('path').join(__dirname,'characters.js'));
const out = tpl.replace('__DATA_JSON__', JSON.stringify(DATA)).replace('__FORMULAS_JSON__', JSON.stringify(FORMULAS)).replace('__CHARACTERS_JSON__', JSON.stringify(CHARACTERS)).replace('__FIGS_JSON__', () => JSON.stringify(FIGS)).replace('__LEGAL_JSON__', () => JSON.stringify(require('./legal').loadLegal())).replace('__QID_ALIAS_JSON__', () => JSON.stringify({ alias: ALIAS.alias || {}, copy: ALIAS.copy || {} }));
fs.writeFileSync(require('path').join(__dirname, 'dist/indeks-app.jsx'), out);

let q = 0; DATA.forEach(s => s.subjects.forEach(su => su.parts.forEach(p => (p.decks||[]).forEach(d => q += (d.questions||[]).length))));
console.log('Written indeks-app.jsx  |  size: ' + (out.length/1024).toFixed(1) + 'KB  |  total questions: ' + q);
console.log('token replaced: ' + !/__[A-Z_]+_JSON__/.test(out) + '  |  grafi: ' + Object.keys(FIGS).length);
