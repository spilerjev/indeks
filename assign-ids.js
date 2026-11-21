/* Dodeli stalni id vprašanjem v data.json in posodobi ids-manifest.json (edini ukaz, ki piše manifest; build nikoli ne piše v data.json).
   node assign-ids.js            vprašanja brez id dobijo nov naključen id ('i' + 10 hex; enaka vsebina = isti id), manifest se dopolni
   node assign-ids.js --check    samo preveri (enako kot build), nič ne zapiše
   node assign-ids.js --retire <id> "<razlog>"   id, ki je namerno odstranjen iz vsebine, gre med upokojene (nikoli več ne sme biti uporabljen)
   node assign-ids.js --init     enkratno (21. 11. 2026): id = hash besedila (= stari qid), pri istem besedilu in različni vsebini
                                 dobijo naslednja vprašanja nov id, v qid-alias.json pa gre zapis »copy« (migracija prekopira staro statistiko).
   Glej CLAUDE.md, razdelek »Stalni id«. */
const fs = require('fs');
const path = require('path');
const L = require('./ids-lib');

const DATA_PATH = path.join(__dirname, 'data.json');
const args = process.argv.slice(2);
const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
let manifest = L.loadManifest();
const alias = L.loadAlias();
alias.copy = alias.copy || {};
const today = new Date().toISOString().slice(0, 10);

const fail = (errs) => { console.error('NAPAKA (' + errs.length + '):\n  ' + errs.slice(0, 50).join('\n  ') + (errs.length > 50 ? '\n  ...' : '')); process.exit(1); };

if (args[0] === '--check') {
  const errs = L.checkIds(data, manifest, alias);
  if (errs.length) fail(errs);
  console.log('id-ji v redu');
  process.exit(0);
}

if (args[0] === '--retire') {
  const [, id, ...why] = args;
  if (!manifest || !manifest.active[id]) fail(['id ' + id + ' ni v manifestu (active)']);
  if (L.allIds(data).has(id)) fail(['id ' + id + ' je še v data.json - najprej odstrani vprašanje']);
  if (!why.length) fail(['navedi razlog']);
  manifest.retired[id] = { datum: today, razlog: why.join(' ') };
  delete manifest.active[id];
} else {
  const init = args[0] === '--init';
  if (init && manifest) fail(['--init je enkraten: ids-manifest.json že obstaja']);
  if (!init && !manifest) fail(['ni ids-manifest.json - prvič zaženi z --init']);
  if (!manifest) manifest = { _opis: 'Stalni id vprašanj: active = id -> hash vsebine (informativno, osveži assign-ids.js), retired = id -> {datum, razlog}. Piše samo assign-ids.js. Glej CLAUDE.md.', active: {}, retired: {} };
  const taken = new Set([...L.allIds(data), ...Object.keys(manifest.active), ...Object.keys(manifest.retired), ...Object.keys(alias.alias || {})]);
  const byContent = {};   // canon -> id (enaka vsebina brez id = isti id)
  L.eachQuestion(data, (q) => { if (q.id && !byContent[L.canon(q)]) byContent[L.canon(q)] = q.id; });
  const firstOfHash = {};  // init: hash -> canon prvega vprašanja s tem hashem
  let n = 0, split = 0;
  L.eachQuestion(data, (q, where, deck, i) => {
    if (q.id) return;
    const c = L.canon(q);
    let id = byContent[c];
    if (!id && init) {
      const h = L.qhash(q.q);
      if (!(h in firstOfHash) && !taken.has(h)) { firstOfHash[h] = c; id = h; taken.add(h); }
      else {   // isto besedilo, druga vsebina: nov id, statistiko starega ključa prekopiramo
        id = L.newId(taken); split++;
        (alias.copy[h] = alias.copy[h] || []).push(id);
        console.log(`  razdeljeno: ${h} -> ${id} (${where})`);
      }
    }
    if (!id) id = L.newId(taken);
    byContent[c] = id;
    deck.questions[i] = L.withId(id, q);
    n++;
  });
  console.log(`nov id: ${n} vprašanj` + (init ? `, od tega ${split} razdeljenih (isto besedilo, druga vsebina)` : ''));
  const present = {};
  L.eachQuestion(data, (q) => { present[q.id] = L.contentHash(q); });
  for (const id of Object.keys(manifest.active)) if (!present[id] && !manifest.retired[id]) fail([`id ${id} iz manifesta manjka v data.json (vrni vprašanje z istim id ali: node assign-ids.js --retire ${id} "razlog")`]);
  for (const [id, h] of Object.entries(present)) manifest.active[id] = h;
}

const sorted = (o) => Object.fromEntries(Object.keys(o).sort().map((k) => [k, o[k]]));
manifest.active = sorted(manifest.active);
manifest.retired = sorted(manifest.retired);
const errs = L.checkIds(data, manifest, alias);
if (errs.length) fail(errs);
fs.writeFileSync(DATA_PATH, JSON.stringify(data));
fs.writeFileSync(L.MANIFEST_PATH, JSON.stringify(manifest, null, 1) + '\n');
fs.writeFileSync(L.ALIAS_PATH, JSON.stringify(alias, null, 1) + '\n');
console.log(`manifest: ${Object.keys(manifest.active).length} aktivnih, ${Object.keys(manifest.retired).length} upokojenih`);
