/* node check-len.js <id predmeta>  - izpiše vprašanja, kjer je pravilni odgovor opazno daljši od napačnih */
const d = require('./data.json');
const id = process.argv[2];
const su = d.flatMap((s) => s.subjects).find((x) => x.id === id);
let n = 0, flag = 0, uniq = 0;
for (const p of su.parts) for (const k of p.decks || []) for (const q of k.questions) {
  if (!q.options || q.options.length < 3) continue; n++;
  const l = q.options.map((o) => o.length), c = l[q.correct];
  const w = l.filter((_, i) => i !== q.correct), avg = w.reduce((a, b) => a + b, 0) / w.length;
  if (c === Math.max(...l) && l.filter((x) => x === c).length === 1) uniq++;
  if (c > avg * 1.3 && c === Math.max(...l)) { flag++; if (process.argv[3]) console.log(`${c}/${Math.round(avg)} ${q.q.slice(0, 70)}`); }
}
console.log(`${id}: ${n} MC, najdaljši pravilni ${uniq}, opazno daljši (>1,3x) ${flag}`);
