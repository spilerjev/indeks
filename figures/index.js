/* indeks. — grafi v razlagah. Kliče ga build.js po regroup.
   Vsak modul (figures/<predmet>.js) izvozi { figs: {id: svg}, attach: [{subj, q, fig, given?, expl?}] }.
   - q    = začetek besedila vprašanja (startsWith); zadene VSE kopije (k1 + izpit ...).
   - fig  = id grafa; prikaže se v razlagi po odgovoru (polje q.fig).
   - given: true = graf je del vprašanja (nad odgovori, polje q.givenFig) - samo za vprašanja, ki se sklicujejo na oznake slike.
   - expl = nova razlaga (ko stara navaja oznake, ki jih na grafu ni, ali je napačna).
   Pripenjanje je ob vsaki gradnji, zato ga add-*-vsebina skripte ne povozijo. Neujemanje ustavi gradnjo. */
const fs = require('fs');
const path = require('path');

function load() {
  const figs = {}, attach = [], fills = {};
  fs.readdirSync(__dirname).filter((f) => f.endsWith('.js') && f !== 'index.js' && f !== 'lib.js').sort().forEach((f) => {
    const m = require(path.join(__dirname, f));
    Object.entries(m.figs || {}).forEach(([id, svg]) => {
      if (figs[id]) throw new Error('Graf ' + id + ' je definiran dvakrat (' + f + ')');
      figs[id] = svg;
    });
    attach.push(...(m.attach || []));
    Object.entries(m.fills || {}).forEach(([id, v]) => { if (fills[id]) throw new Error('Graf za vstavljanje ' + id + ' je definiran dvakrat (' + f + ')'); fills[id] = v; });
  });
  return { figs, attach, fills };
}

function applyFigures(data) {
  const { figs, attach, fills } = load();
  const used = new Set();
  const bad = [];
  attach.forEach((a) => {
    if (!figs[a.fig]) { bad.push('neznan graf ' + a.fig + ' (' + a.q + ')'); return; }
    let n = 0;
    data.forEach((s) => s.subjects.forEach((su) => {
      if (a.subj && su.id !== a.subj) return;
      su.parts.forEach((p) => (p.decks || []).forEach((d) => (d.questions || []).forEach((q) => {
        if (!q.q || !q.q.startsWith(a.q)) return;
        n++;
        if (a.given) q.givenFig = a.fig; else q.fig = a.fig;
        if (a.expl) q.explanation = a.expl;
      })));
    }));
    if (!n) bad.push('ni vprašanja: [' + (a.subj || '*') + '] ' + a.q);
    used.add(a.fig);
  });
  // naloge »vstavi v graf« (type: "figfill"): q.figfill = id iz fills -> q.fill = { svg, slots }; vsako mesto mora imeti koordinate
  data.forEach((s) => s.subjects.forEach((su) => su.parts.forEach((p) => (p.decks || []).forEach((d) => (d.questions || []).forEach((q) => {
    if (q.type !== 'figfill') return;
    const fl = fills[q.figfill];
    if (!fl) { bad.push('figfill: neznan graf ' + q.figfill + ' (' + (q.q || '').slice(0, 40) + ')'); return; }
    const miss = (q.slots || []).filter((sl) => !fl.slots.some((x) => x.id === sl.id)).map((sl) => sl.id);
    if (miss.length) bad.push('figfill ' + q.figfill + ': mesta brez koordinat: ' + miss.join(', '));
    q.fill = { svg: fl.svg, slots: fl.slots.filter((x) => (q.slots || []).some((sl) => sl.id === x.id)) };
  })))));
  if (bad.length) console.warn('\n⚠️  GRAFI - napake pri pripenjanju (preveri figures/*.js):\n  ' + bad.join('\n  ') + '\n');
  // v izhod samo uporabljeni grafi
  const out = {};
  Object.keys(figs).forEach((id) => { if (used.has(id)) out[id] = figs[id]; });
  const unused = Object.keys(figs).filter((id) => !used.has(id));
  if (unused.length) console.warn('Grafi brez vprašanja (izpuščeni): ' + unused.join(', '));
  return out;
}

module.exports = { applyFigures, load };
