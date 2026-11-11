/* 1. letnik: vpiše vsebino iz letnik1-src/*.js v data.json (semestra s1 in s2).
   Ponovno zagonljivo: decki/kartice z istim id se zamenjajo, obstoječi decki z drugimi id ostanejo.
   part.notesMd (Markdown) se pretvori v HTML zapiske; part.notes (HTML) se vzame kot je.
   Zagon: node add-letnik1-vsebina.js && npm run build */
const fs = require('fs');
const path = require('path');
const { render } = require('./letnik2-src/md-notes');

const DATA_PATH = path.join(__dirname, 'data.json');
const SRC = path.join(__dirname, 'letnik1-src');
const MODULES = fs.readdirSync(SRC).filter((f) => f.endsWith('.js')).map((f) => require(path.join(SRC, f)));

const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const bak = DATA_PATH + '.bak-prelet1';
if (!fs.existsSync(bak)) fs.writeFileSync(bak, JSON.stringify(data));

const upsert = (list, items) => {
  for (const it of items || []) {
    const i = list.findIndex((x) => x.id === it.id);
    if (i >= 0) list[i] = it; else list.push(it);
  }
};

for (const mod of MODULES) {
  const subj = data.filter((s) => s.year === 1).flatMap((s) => s.subjects).find((s) => s.id === mod.id);
  if (!subj) throw new Error('Ni predmeta 1. letnika: ' + mod.id);
  if (mod.removeParts) subj.parts = subj.parts.filter((p) => !mod.removeParts.includes(p.id) || p.decks.length);
  for (const mp of mod.parts) {
    let part = subj.parts.find((p) => p.id === mp.id);
    if (!part) { part = { id: mp.id, decks: [] }; subj.parts.push(part); }
    if (mp.name) part.name = mp.name;
    if (mp.type) part.type = mp.type;
    part.decks = part.decks || [];
    upsert(part.decks, mp.decks);
    if (mp.flashcards) { part.flashcards = part.flashcards || []; upsert(part.flashcards, mp.flashcards); }
    if (mp.notesMd) part.notes = render(mp.notesMd);
    if (mp.prependNotesOf) {
      const src = subj.parts.find((p) => p.id === mp.prependNotesOf);
      if (src && src.notes) part.notes = src.notes + '\n' + part.notes;
    }
    else if (mp.notes) part.notes = mp.notes;
  }
  const q = subj.parts.reduce((n, p) => n + p.decks.reduce((m, d) => m + d.questions.length, 0), 0);
  const c = subj.parts.reduce((n, p) => n + (p.flashcards || []).reduce((m, d) => m + d.cards.length, 0), 0);
  console.log(`${subj.name}: ${q} vprašanj, ${c} kartic`);
}

// Težji odgovori (letnik1-src/harden/<predmet>*.js, glej harden-lib.js)
const { applyHarden } = require('./harden-lib');
const HDIR = path.join(SRC, 'harden');
for (const subj of data.filter((s) => s.year === 1).flatMap((s) => s.subjects)) {
  const files = fs.existsSync(HDIR) ? fs.readdirSync(HDIR).filter((f) => f === subj.id + '.js' || f.startsWith(subj.id + '-')) : [];
  const qs = subj.parts.flatMap((p) => (p.decks || []).flatMap((d) => d.questions));
  for (const f of files) applyHarden(qs, require(path.join(HDIR, f)), f);
}

fs.writeFileSync(DATA_PATH, JSON.stringify(data));
