/* Stalni id vprašanj (glej CLAUDE.md, razdelek »Stalni id«).
   - id vprašanja se nikoli ne spremeni in nikoli ponovno ne uporabi. Statistika v brskalniku (qstat, mixuse, rankedseen)
     je ključena po id (indeks-template.jsx: qid()).
   - Prvotni id-ji (21. 11. 2026) so hash besedila (enak kot stari qid), novi so naključni: 'i' + 10 šestnajstiških znakov.
   - Isti id smejo nositi samo vprašanja z enako vsebino (canon spodaj; razlaga ne šteje).
   Uporabljajo: assign-ids.js, build.js (checkIds), add-letnik1-vsebina.js, add-letnik2-vsebina.js, sync-decks.js
   in moduli v letnik*-src/ (withId). */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const MANIFEST_PATH = path.join(__dirname, 'ids-manifest.json');
const ALIAS_PATH = path.join(__dirname, 'qid-alias.json');

/* Hash besedila - ENAK kot qid() v indeks-template.jsx (stari ključ statistike). */
function qhash(text) {
  const s = text || '';
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return 'q' + (h >>> 0).toString(36);
}
/* Vsebina, ki določa, ali je vprašanje »isto« (razlaga, namigi ipd. ne štejejo). */
const canon = (q) => JSON.stringify({ q: q.q, options: q.options, correct: q.correct, pairs: q.pairs, type: q.type });
const contentHash = (q) => crypto.createHash('sha1').update(canon(q)).digest('hex').slice(0, 12);
const ID_RE = /^(q[0-9a-z]{1,7}|i[0-9a-f]{10})$/;
function newId(taken) {
  let id;
  do id = 'i' + crypto.randomBytes(5).toString('hex'); while (taken && taken.has(id));
  if (taken) taken.add(id);
  return id;
}
/* id na prvo mesto v objektu (enaka oblika data.json ne glede na to, kdo je id dodal). */
const withId = (id, q) => { if (!ID_RE.test(id)) throw new Error('Neveljaven id vprašanja: ' + id); const { id: _old, ...rest } = q; return { id, ...rest }; };

const readJson = (p, d) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : d);
const loadManifest = () => readJson(MANIFEST_PATH, null);
const loadAlias = () => readJson(ALIAS_PATH, { alias: {}, copy: {} });

/* Vsa vprašanja v data.json z mestom (pred regroup.js). */
function eachQuestion(data, fn) {
  for (const sem of data) for (const su of sem.subjects) for (const p of su.parts) for (const d of p.decks || [])
    (d.questions || []).forEach((q, i) => fn(q, `${sem.id}/${su.id}/${p.id}/${d.id}#${i}`, d, i));
}
function allIds(data) { const s = new Set(); eachQuestion(data, (q) => { if (q.id) s.add(q.id); }); return s; }

/* Pred upsert v add-letnik*-vsebina.js / sync-decks.js: vsako vprašanje novega kompleta dobi id.
   1) id iz modula (withId), 2) sicer id vprašanja z natanko enakim besedilom v starem kompletu (enolično;
   pri več enakih besedilih po vrstnem redu pojavitve, če je število enako), 3) sicer nov id (in opozorilo:
   build pade, če je s tem kak id iz manifesta izginil). Vrne nov komplet (vhodni objekt ostane nespremenjen). */
function assignDeckIds(deck, oldDeck, taken, label) {
  const old = {};
  for (const q of (oldDeck && oldDeck.questions) || []) if (q.id) (old[q.q] = old[q.q] || []).push(q.id);
  const seen = {}, cnt = {};
  for (const q of deck.questions || []) cnt[q.q] = (cnt[q.q] || 0) + 1;
  let fresh = 0;
  const questions = (deck.questions || []).map((q) => {
    const k = (seen[q.q] = (seen[q.q] || 0) + 1) - 1;
    if (q.id) return withId(q.id, q);
    const o = old[q.q] || [];
    let id = null;
    if (o.length && new Set(o).size === 1) id = o[0];
    else if (o.length && o.length === cnt[q.q]) id = o[k];
    if (!id) { id = newId(taken); fresh++; }
    return withId(id, q);
  });
  if (fresh) console.warn(`  ! ${label || deck.id}: ${fresh} vprašanj brez id v modulu in brez ujemanja v starem kompletu -> nov id (če je besedilo predelano, v modul zapiši withId('<stari id>', ...))`);
  return { ...deck, questions };
}

/* Zaščita (build.js in assign-ids.js): vrne seznam napak. */
function checkIds(data, manifest, aliasFile) {
  const err = [];
  if (!manifest) return ['Ni ids-manifest.json (zaženi node assign-ids.js --init)'];
  const byId = {};
  eachQuestion(data, (q, where) => {
    if (!q.id) { err.push(`vprašanje brez id: ${where}`); return; }
    if (!ID_RE.test(q.id)) err.push(`neveljaven id ${q.id}: ${where}`);
    const c = canon(q);
    if (byId[q.id] && byId[q.id].c !== c) err.push(`isti id ${q.id} z različno vsebino: ${byId[q.id].where} in ${where}`);
    else if (!byId[q.id]) byId[q.id] = { c, where };
    if (manifest.retired && manifest.retired[q.id]) err.push(`uporabljen upokojen id ${q.id}: ${where}`);
  });
  for (const id of Object.keys(manifest.active || {})) if (!byId[id] && !(manifest.retired || {})[id]) err.push(`id ${id} iz ids-manifest.json manjka v data.json (če je vprašanje res odstranjeno: node assign-ids.js --retire ${id} "razlog")`);
  for (const id of Object.keys(byId)) if (!(manifest.active || {})[id]) err.push(`id ${id} ni v ids-manifest.json (zaženi node assign-ids.js): ${byId[id].where}`);
  // ID kompleta mora biti enoličen v delu, ID dela v predmetu, ID predmeta v semestru (regroup.js podvojenega tiho izpusti)
  for (const sem of data) {
    const dup = (list, what) => { const s = new Set(); for (const x of list || []) { if (s.has(x.id)) err.push(`podvojen ID ${what}: ${x.id}`); s.add(x.id); } };
    dup(sem.subjects, `predmeta v ${sem.id}`);
    for (const su of sem.subjects) { dup(su.parts, `dela v ${sem.id}/${su.id}`); for (const p of su.parts) dup(p.decks, `kompleta v ${sem.id}/${su.id}/${p.id}`); }
  }
  // alias: star ključ ne sme biti živ id (migracija bi ga izbrisala), cilj mora obstajati
  const a = (aliasFile && aliasFile.alias) || {}, cp = (aliasFile && aliasFile.copy) || {};
  for (const [o, n] of Object.entries(a)) {
    if (byId[o]) err.push(`alias: star ključ ${o} je živ id`);
    if (!byId[n] && !(manifest.retired || {})[n]) err.push(`alias: cilj ${o} -> ${n} ne obstaja`);
  }
  for (const [from, tos] of Object.entries(cp)) for (const to of tos) {
    if (!byId[to] && !(manifest.retired || {})[to]) err.push(`alias copy: cilj ${from} -> ${to} ne obstaja`);
    if (a[to]) err.push(`alias copy: cilj ${to} je star ključ`);
  }
  return err;
}

/* Vsi že uporabljeni id (data.json + manifest + alias), da nov id ne trči. */
function takenIds(data) {
  const m = loadManifest() || { active: {}, retired: {} }, a = loadAlias();
  return new Set([...allIds(data), ...Object.keys(m.active || {}), ...Object.keys(m.retired || {}), ...Object.keys(a.alias || {})]);
}
/* upsert kompletov po ID z dodelitvijo id vprašanjem (namesto navadnega upsert v add-*-vsebina.js). */
function upsertDecks(list, items, taken, label) {
  for (const it of items || []) {
    const i = list.findIndex((x) => x.id === it.id);
    const d = assignDeckIds(it, i >= 0 ? list[i] : null, taken, (label ? label + '/' : '') + it.id);
    if (i >= 0) list[i] = d; else list.push(d);
  }
}

module.exports = { takenIds, upsertDecks, qhash, canon, contentHash, newId, withId, ID_RE, eachQuestion, allIds, assignDeckIds, checkIds, loadManifest, loadAlias, MANIFEST_PATH, ALIAS_PATH };
