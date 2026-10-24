/* 2. letnik: vpiše vsebino iz letnik2-src/*.js v data.json in zapiske pretvori iz School/.../ZAPISKI.md.
   Ponovno zagonljivo: decki/kartice z istim id se zamenjajo, zapiski se na novo zgradijo iz ZAPISKI.md
   (ko dopolniš zapiske v School, samo ponovno zaženi: node add-letnik2-vsebina.js && npm run build). */
const fs = require('fs');
const path = require('path');
const { render } = require('./letnik2-src/md-notes');

const DATA_PATH = path.join(__dirname, 'data.json');
const SCHOOL = path.join(process.env.HOME, 'Documents/School');
const MODULES = ['stana', 'pf1', 'trz', 'eeu', 'mpsp'].map((m) => require('./letnik2-src/' + m));

const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const bak = DATA_PATH + '.bak-prevsebina2';
if (!fs.existsSync(bak)) fs.writeFileSync(bak, JSON.stringify(data));

const sem = data.find((s) => s.id === 'y2s1');
if (!sem) throw new Error('Ni semestra y2s1 - najprej zaženi add-letnik2.js');

const upsert = (list, items) => {
  for (const it of items || []) {
    const i = list.findIndex((x) => x.id === it.id);
    if (i >= 0) list[i] = it; else list.push(it);
  }
};

for (const mod of MODULES) {
  const subj = sem.subjects.find((s) => s.id === mod.id);
  if (!subj) throw new Error('Ni predmeta ' + mod.id);
  subj.parts = mod.parts.map((mp) => {
    const ex = subj.parts.find((p) => p.id === mp.id) || {};
    const part = { ...ex, id: mp.id, name: mp.name, type: mp.type, decks: ex.decks ? [...ex.decks] : [] };
    upsert(part.decks, mp.decks);
    if (mp.flashcards) { part.flashcards = part.flashcards ? [...part.flashcards] : []; upsert(part.flashcards, mp.flashcards); }
    if (mp.notes) {
      const file = path.join(SCHOOL, mp.notes.file);
      if (fs.existsSync(file)) part.notes = render(fs.readFileSync(file, 'utf8'), mp.notes);
      else console.warn('  ! ni datoteke z zapiski:', file);
    }
    return part;
  });
  const q = subj.parts.reduce((n, p) => n + p.decks.reduce((m, d) => m + d.questions.length, 0), 0);
  const c = subj.parts.reduce((n, p) => n + (p.flashcards || []).reduce((m, d) => m + d.cards.length, 0), 0);
  console.log(`${subj.name}: ${q} vprašanj, ${c} kartic, zapiski: ${subj.parts.filter((p) => p.notes).map((p) => p.id).join(', ') || '-'}`);
}

// Težji odgovori (letnik2-src/harden/<predmet>*.js, glej harden-lib.js)
const { applyHarden } = require('./harden-lib');
for (const subj of sem.subjects) {
  const dir = path.join(__dirname, 'letnik2-src/harden');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f === subj.id + '.js' || f.startsWith(subj.id + '-')) : [];
  const qs = subj.parts.flatMap((p) => (p.decks || []).flatMap((d) => d.questions));
  for (const f of files) applyHarden(qs, require(path.join(dir, f)), f);
}

fs.writeFileSync(DATA_PATH, JSON.stringify(data));
