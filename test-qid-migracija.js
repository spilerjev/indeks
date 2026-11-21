/* Test migracije starih ključev statistike (qid). Vzame PRAVO kodo med oznakama QID-MIGRACIJA iz zgrajenega
   dist/indeks-app.jsx in pravi alias iz istega svežnja. Zagon: npm run build:data && node test-qid-migracija.js */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const src = fs.readFileSync(path.join(__dirname, 'dist/indeks-app.jsx'), 'utf8');
const block = src.slice(src.indexOf('/* QID-MIGRACIJA:START'), src.indexOf('/* QID-MIGRACIJA:END */'));
const aliasJson = /const QID_ALIAS = (.*);\n/.exec(src)[1];
const { qhash, qidWith, migrateQids } = Function(block + '\nreturn { qhash, qidWith, migrateQids };')();
const A = JSON.parse(aliasJson);

const mkStore = (init) => {
  const m = {}; let sets = 0;
  for (const [k, v] of Object.entries(init)) m[k] = JSON.stringify(v);
  return { get: (k, d) => (k in m ? JSON.parse(m[k]) : d), set: (k, v) => { sets++; m[k] = JSON.stringify(v); }, dump: () => Object.fromEntries(Object.entries(m).map(([k, v]) => [k, JSON.parse(v)])), sets: () => sets };
};
const near = (x, y) => assert.ok(Math.abs(x - y) < 1e-9, x + ' != ' + y);
const rec = (s, ok) => ({ a: s.a * 0.9 + 1, c: s.c * 0.9 + (ok ? 1 : 0) });   // = recordQ
const seq = (arr) => arr.reduce((s, ok) => rec(s, ok), { a: 0, c: 0 });

// skupine iz pravega aliasa
const byT = {};
for (const [o, t] of Object.entries(A.alias)) (byT[t] = byT[t] || []).push(o);
const two = Object.entries(byT).filter(([, os]) => os.length === 2);
assert.strictEqual(Object.keys(A.alias).length, 868);
assert.strictEqual(two.length, 3, 'tri skupine 2 -> 1');
const [o1, t1] = Object.entries(A.alias).find(([, t]) => byT[t].length === 1 && !A.copy[t]);
const [o2, t2] = Object.entries(A.alias).filter(([, t]) => byT[t].length === 1 && !A.copy[t])[1];
let n = 0; const ok = (name) => console.log('  ok ' + (++n) + ' ' + name);

// 1) samo star ključ -> prenesen, star izbrisan
{
  const st = mkStore({ 'indeks.qstat.v1': { [o1]: { a: 2.71, c: 1.9 } }, 'indeks.mixuse.v1': { [o1]: 3 } });
  migrateQids(st, A);
  const d = st.dump();
  assert.deepStrictEqual(d['indeks.qstat.v1'], { [t1]: { a: 2.71, c: 1.9 } });
  assert.deepStrictEqual(d['indeks.mixuse.v1'], { [t1]: 3 });
  ok('samo star ključ');
}
// 2) star + nov -> združeno, kot da bi stari odgovori prišli pred novimi
{
  const old = seq([true, false, true]), neu = seq([true, true]);
  const st = mkStore({ 'indeks.qstat.v1': { [o1]: old, [t1]: neu, x: { a: 1, c: 1 } }, 'indeks.mixuse.v1': { [o1]: 2, [t1]: 5 } });
  migrateQids(st, A);
  const d = st.dump(), want = seq([true, false, true, true, true]);
  near(d['indeks.qstat.v1'][t1].a, want.a); near(d['indeks.qstat.v1'][t1].c, want.c);
  assert.ok(!(o1 in d['indeks.qstat.v1'])); assert.deepStrictEqual(d['indeks.qstat.v1'].x, { a: 1, c: 1 });
  assert.deepStrictEqual(d['indeks.mixuse.v1'], { [t1]: 7 });
  ok('star + nov (formula f = 1 - nov.a/10 = 0,9^n)');
}
// 3) skupina 2 -> 1, zaporedno; 4) kopiranje pri razdeljeni skupini (cilj 2 -> 1 je tudi vir kopije)
{
  const [T, [a, b]] = two.find(([t]) => A.copy[t]);
  const [I] = A.copy[T];
  const sa = seq([true, true]), sb = seq([false]), sn = seq([true]);
  const st = mkStore({ 'indeks.qstat.v1': { [a]: sa, [b]: sb, [T]: sn }, 'indeks.mixuse.v1': { [a]: 1, [b]: 2 } });
  migrateQids(st, A);
  const d = st.dump()['indeks.qstat.v1'];
  const f1 = 1 - sn.a / 10, m1 = { a: sn.a + sa.a * f1, c: sn.c + sa.c * f1 }, f2 = 1 - m1.a / 10, m2 = { a: m1.a + sb.a * f2, c: m1.c + sb.c * f2 };
  near(d[T].a, m2.a); near(d[T].c, m2.c);
  assert.ok(!(a in d) && !(b in d));
  assert.deepStrictEqual(d[I], d[T], 'kopija po združitvi');
  assert.deepStrictEqual(st.dump()['indeks.mixuse.v1'], { [T]: 3, [I]: 3 });
  ok('skupina 2 -> 1 (zaporedno)');
  ok('kopiranje pri razdeljeni skupini (star ključ ostane, nov id dobi kopijo)');
  // kopija ne prepiše že obstoječega zapisa novega id
  const st2 = mkStore({ 'indeks.qstat.v1': { [T]: { a: 5, c: 5 }, [I]: { a: 1, c: 0 } } });
  migrateQids(st2, A);
  assert.deepStrictEqual(st2.dump()['indeks.qstat.v1'][I], { a: 1, c: 0 }); assert.strictEqual(st2.sets(), 0);
  ok('kopija samo, če nov id še nima zapisa');
}
// 5) rankedseen preslikan; resume s starim besedilom zavržen, nov ostane; 6) drugi zagon ne spremeni ničesar
{
  // vprašanje s starim besedilom: umetno besedilo 'STARO', katerega hash dodamo v alias (s pravim starim vprašanjem iz 5f67c34 je preverjeno v brskalniku)
  const fakeOld = { q: 'STARO', options: ['a', 'b'], correct: 0 };
  const A2 = { alias: { ...A.alias, [qhash('STARO')]: t2 }, copy: A.copy };
  const fresh = { id: t1, q: 'NOVO', options: ['a', 'b'], correct: 0 };
  const st = mkStore({
    'indeks.rankedseen.v1': { 'y1/x/k1': [o1, 'qzzz', o2], 'y1/x/k2': ['qyyy'] },
    'indeks.resume.v1': { 'a/b/c/d': { run: [fresh, fakeOld], i: 1, u: 1 }, 'a/b/c/e': { run: [fresh], i: 0, u: 2 } },
    'indeks.qstat.v1': { [o1]: { a: 1, c: 1 } },
  });
  const ch = migrateQids(st, A2);
  const d = st.dump();
  assert.deepStrictEqual(d['indeks.rankedseen.v1'], { 'y1/x/k1': [t1, 'qzzz', t2], 'y1/x/k2': ['qyyy'] });
  assert.deepStrictEqual(Object.keys(d['indeks.resume.v1']), ['a/b/c/e']);
  ok('rankedseen preslikan');
  ok('star resume zavržen, nov ostane (' + ch.join(', ') + ')');
  const before = JSON.stringify(st.dump()), sets = st.sets();
  assert.deepStrictEqual(migrateQids(st, A2), []);
  assert.strictEqual(st.sets(), sets); assert.strictEqual(JSON.stringify(st.dump()), before);
  ok('drugi zagon ne spremeni ničesar');
}
// 7) qid: id ima prednost, sicer alias starega hasha, sicer hash; prazen ali pokvarjen zapis ne pade
{
  assert.strictEqual(qidWith({ id: 'iabcdef0123', q: 'x' }, A), 'iabcdef0123');
  assert.strictEqual(qidWith({ q: 'STARO' }, { alias: { [qhash('STARO')]: 'qnov' } }), 'qnov');
  assert.strictEqual(qidWith({ q: 'nekaj' }, A), qhash('nekaj'));
  const st = mkStore({ 'indeks.qstat.v1': { [o1]: 'pokvarjeno' }, 'indeks.mixuse.v1': [1, 2], 'indeks.resume.v1': null });
  migrateQids(st, A);
  assert.deepStrictEqual(st.dump()['indeks.qstat.v1'], {});
  assert.deepStrictEqual(migrateQids(mkStore({}), A), []);
  ok('qid in pokvarjeni zapisi');
}
console.log('test-qid-migracija: vseh ' + n + ' v redu');
