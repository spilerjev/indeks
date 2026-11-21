/* Ciljno vpiše posamezne sklope iz izvornih modulov v data.json (brez zapiskov, slik in harden popravkov).
   Uporaba: node sync-decks.js letnik1-src/mikro-k1.js mikro-k1-stari mikro-k1-stari-rac
   Varno ob vzporednem delu: data.json se prebere, spremeni in zapiše v enem koraku. */
const fs = require('fs');
const path = require('path');
const [file, ...ids] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
if (!file || !ids.length) { console.error('node sync-decks.js <modul> <deck-id> ...'); process.exit(1); }
const mods = [].concat(require(path.resolve(file)));
const DATA_PATH = path.join(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const IDS = require('./ids-lib');   // stalni id vprašanj: iz modula (withId), sicer podedovan iz starega kompleta, sicer nov
const TAKEN = IDS.takenIds(data);
let n = 0;
for (const id of ids) {
  let src = null, sid = null, pid = null;
  for (const m of mods) for (const p of m.parts || []) for (const d of p.decks || []) if (d.id === id) { src = d; sid = m.id; pid = p.id; }
  if (!src) throw new Error('V modulu ni sklopa ' + id);
  let hit = 0;
  for (const sem of data) for (const su of sem.subjects) if (su.id === sid) for (const p of su.parts) if (p.id === pid) {
    const i = (p.decks || []).findIndex((d) => d.id === id);
    const nd = IDS.assignDeckIds(JSON.parse(JSON.stringify(src)), i >= 0 ? p.decks[i] : null, TAKEN, sid + '/' + pid + '/' + id);
    if (i >= 0) { p.decks[i] = nd; hit++; } else { p.decks.push(nd); hit++; }
  }
  if (!hit) throw new Error('V data.json ni dela ' + sid + '/' + pid);
  n += src.questions.length;
  console.log(`  ${sid}/${pid}/${id}: ${src.questions.length} vprašanj (${src.name})`);
}
// težji odgovori (harden): kot v add-*-vsebina.js, a le za vpisane sklope; dvoumnost se šteje na celem predmetu
{
  const { applyHarden } = require('./harden-lib');
  const synced = new Set(ids);
  for (const sem of data) for (const su of sem.subjects) {
    const dir = su.id === 'pravo' ? 'harden-pravo' : sem.year === 1 || ['s1', 's2'].includes(sem.id) ? 'letnik1-src/harden' : 'letnik2-src/harden';
    const full = path.join(__dirname, dir);
    if (!fs.existsSync(full)) continue;
    const files = fs.readdirSync(full).filter((f) => f.endsWith('.js') && (su.id === 'pravo' || f === su.id + '.js' || f.startsWith(su.id + '-'))).sort();
    const decks = su.parts.flatMap((p) => (p.decks || []).filter((d) => synced.has(d.id)));
    if (!decks.length || !files.length) continue;
    const all = su.parts.flatMap((p) => (p.decks || []).flatMap((d) => d.questions));
    const mine = new Set(decks.flatMap((d) => d.questions));
    for (const f of files) {
      const patches = require(path.join(full, f)).filter((pt) => {
        const [qp, op] = String(pt[0]).split('||');
        const hit = all.filter((q) => q.options && q.q.startsWith(qp) && (!op || q.options.some((o) => o.includes(op))));
        if (!hit.length || (hit.length > 1 && pt[4] !== 'vse')) return false;
        return hit.some((q) => mine.has(q));
      });
      if (patches.length) applyHarden([...mine], patches, dir + '/' + f);
    }
  }
}
// dodatek k zapiskom (appendNotesMd, kot v add-letnik1-vsebina.js): zamenja se le del za oznako <!--dodatek-->
if (process.argv.includes('--notes')) {
  const { render } = require('./letnik2-src/md-notes');
  // enako zaporedje kot add-letnik1-vsebina.js: notesMd -> prependNotesOf -> appendNotesMd
  for (const m of mods) for (const mp of m.parts || []) if (mp.notesMd || mp.appendNotesMd)
    for (const sem of data) for (const su of sem.subjects) if (su.id === m.id) for (const p of su.parts) if (p.id === mp.id) {
      if (mp.notesMd) p.notes = render(mp.notesMd);
      if (mp.notesMd && mp.prependNotesOf) {
        const pre = [].concat(mp.prependNotesOf).map((id) => (su.parts.find((x) => x.id === id) || {}).notes).filter(Boolean);
        if (pre.length) p.notes = p.notes + '\n' + pre.join('\n');
      }
      if (mp.appendNotesMd) p.notes = (p.notes || '').split('<!--dodatek-->')[0] + '<!--dodatek-->' + render(mp.appendNotesMd);
      console.log('  zapiski: ' + su.id + '/' + p.id);
    }
}
fs.writeFileSync(DATA_PATH, JSON.stringify(data));
console.log('Vpisano: ' + n + ' vprašanj');
