/* Enkratna skripta: doda 2. letnik (2026/27) v data.json.
   - obstoječima semestroma s1/s2 doda year:1 (id-ji ostanejo -> statistika se ohrani)
   - doda semester y2s1 (zimski) s 5 predmeti; PF1 dobi vprašanja + zapiske iz School/.../PF1_kviz.html
   Zagon: node add-letnik2.js && npm run build */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DATA_PATH = path.join(__dirname, 'data.json');
const PF1_HTML = path.join(process.env.HOME, 'Documents/School/2. letnik (2026-27)/1. semester/Poslovne finance 1/PF1_kviz.html');

const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
if (data.some((s) => s.year === 2)) { console.log('2. letnik že obstaja - nič ne delam.'); process.exit(0); }
fs.writeFileSync(DATA_PATH + '.bak-preletnik2', JSON.stringify(data));

data.forEach((s) => { if (!s.year) s.year = 1; });

// --- PF1: izvleci NOTES in BANK iz kviza (oba sta čista JS literala) ---
const html = fs.readFileSync(PF1_HTML, 'utf8').replace(/[—–]/g, '-'); // kratki pomišljaji
const notesSrc = html.slice(html.indexOf('const NOTES = `'), html.indexOf('`;', html.indexOf('const NOTES = `')) + 2);
const bankStart = html.indexOf('const BANK = {');
const bankSrc = html.slice(bankStart, html.indexOf('\n};', bankStart) + 3);
const ctx = {};
vm.runInNewContext(notesSrc.replace('const NOTES', 'this.NOTES') + '\n' + bankSrc.replace('const BANK', 'this.BANK'), ctx);
const { NOTES, BANK } = ctx;

const toQ = (x) => x.type === 'tf'
  ? { q: x.q, options: ['Drži', 'Ne drži'], correct: x.c ? 0 : 1, explanation: x.e, htmlExpl: true }
  : { q: x.q, options: x.o, correct: x.c, explanation: x.e, htmlExpl: true };
const pf1Decks = Object.entries(BANK).map(([id, b]) => ({ id, name: b.name, questions: b.q.map(toQ) }));

const stdParts = () => [
  { id: 'k1', name: '1. kolokvij', type: 'kolokvij', decks: [] },
  { id: 'k2', name: '2. kolokvij', type: 'kolokvij', decks: [] },
  { id: 'izpit', name: 'Izpit', type: 'izpit', decks: [] },
];

const pf1 = { id: 'pf1', name: 'Poslovne finance 1', tier: 'S', parts: stdParts() };
pf1.parts[0].decks = pf1Decks;
pf1.parts[0].notes = NOTES.trim();

data.push({
  id: 'y2s1', year: 2, name: '1. semester',
  subjects: [
    pf1,
    { id: 'stana', name: 'Statistična analiza', tier: 'B', parts: stdParts() },
    { id: 'trz', name: 'Temelji trženja', tier: 'A', parts: stdParts() },
    { id: 'eeu', name: 'Ekonomika EU in Slovenija', tier: 'A', parts: stdParts() },
    { id: 'mpsp', name: 'Management proizvodnih in storitvenih procesov', tier: 'A', parts: stdParts() },
  ],
});

fs.writeFileSync(DATA_PATH, JSON.stringify(data));
console.log('PF1: ' + pf1Decks.map((d) => d.name + ' (' + d.questions.length + ')').join(', '));
