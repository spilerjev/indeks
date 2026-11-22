/* Popravki vprašanj po stalnem id (22. 11. 2026): možnosti, pravilni odgovor in razlaga, ki jih vsebinski moduli ali
   težji odgovori (harden) ob ponovnem zagonu ne smejo povrniti. Kličejo jih add-letnik1-vsebina.js, apply-harden-pravo.js
   in add-letnik2-vsebina.js na koncu. Popravek zadene VSE kopije vprašanja z istim id (k1/k2 in izpit).
   Vnos: { id, options?, correct?, explanation?, why }. Besedila q in id se tu ne spreminjata (CLAUDE.md). */
const PATCHES = require('./id-patches-data.json');
function applyIdPatches(data, label = 'id-patches') {
  const by = new Map(PATCHES.map((p) => [p.id, p]));
  const hit = new Set();
  for (const s of data) for (const su of s.subjects) for (const pa of su.parts) for (const dk of pa.decks || []) for (const q of dk.questions) {
    const p = by.get(q.id); if (!p) continue;
    if (p.options) q.options = p.options.slice();
    if (p.correct != null) q.correct = p.correct;
    if (p.explanation != null) q.explanation = p.explanation;
    hit.add(q.id);
  }
  normalizeDashes(data);
  const miss = PATCHES.filter((p) => !hit.has(p.id) && (!p.subj || data.some((s) => s.subjects.some((su) => su.id === p.subj))));
  console.log(`  ${label}: popravkov po id ${hit.size}/${PATCHES.length}` + (miss.length ? `, brez vprašanja: ${miss.map((p) => p.id).join(', ')}` : ''));
}
/* 1. letnik: dolgi pomišljaj »—« v vidnem besedilu → kratek »-« (slog appa) */
function normalizeDashes(data) {
  const fix = (o, k) => { if (typeof o[k] === 'string' && o[k].includes('—')) o[k] = o[k].replace(/\s*—\s*/g, ' - ').replace(/^ - /, '- '); };
  for (const s of data) if (s.year === 1) for (const su of s.subjects) for (const pa of su.parts) {
    fix(pa, 'name'); fix(pa, 'notes');
    (pa.flashcards || []).forEach((fc) => { fix(fc, 'name'); (fc.cards || []).forEach((c) => { fix(c, 'front'); fix(c, 'back'); }); });
    (pa.decks || []).forEach((dk) => { fix(dk, 'name'); dk.questions.forEach((q) => { ['q', 'explanation', 'hint', 'more', 'given'].forEach((k) => fix(q, k)); if (q.options) q.options = q.options.map((o) => (typeof o === 'string' ? o.replace(/\s*—\s*/g, ' - ') : o)); (q.pairs || []).forEach((pp) => { fix(pp, 'term'); fix(pp, 'def'); }); }); });
  }
}
module.exports = { applyIdPatches, normalizeDashes, PATCHES };
