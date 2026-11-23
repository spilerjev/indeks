/* Test merjenja časa učenja (indeks-template.jsx, blok »Čas učenja po predmetu«): node test-cas-ucenja.js */
const fs = require('fs'), assert = require('assert');
const src = fs.readFileSync(__dirname + '/indeks-template.jsx', 'utf8');
const a = src.indexOf('const TIME_ON = true'), b = src.indexOf('function useStudyTime(');
assert(a > 0 && b > a, 'blok ni najden');
const mem = {}; const store = { get: (k, d) => (k in mem ? JSON.parse(mem[k]) : d), set: (k, v) => { mem[k] = JSON.stringify(v); } };
const T = new Function('store', src.slice(a, b) + '; return { timeAdd, timeOf, quizTimeEstimate, fmtDur, dayKey, TIME_LOCK, TIME_TICK };')(store);
const day = (s) => new Date(s + 'T12:00:00').getTime();
// seštevanje po dnevih in zadnjih 7 dni
T.timeAdd('u1', 'y2s1/eeu', 300, day('2026-11-10'));
T.timeAdd('u1', 'y2s1/eeu', 120, day('2026-11-20'));
T.timeAdd('u1', 'y2s1/eeu', 60.5, day('2026-11-23'));
T.timeAdd('u2', 'y2s1/eeu', 999, day('2026-11-23'));   // drug uporabnik ločeno
let r = T.timeOf('u1', 'y2s1/eeu', day('2026-11-23'));
assert.strictEqual(Math.round(r.total * 10) / 10, 480.5); assert.strictEqual(Math.round(r.week * 10) / 10, 180.5); assert.strictEqual(r.first, '2026-11-10');
assert.strictEqual(T.timeOf('u1', 'y2s1/pf1').total, 0);
// ocena iz kvizov: samo poskusi pred prvim izmerjenim dnem, največ 20 min na poskus, samo predmet s predpono
const stats = { 'y2s1/eeu/k1/a': { attempts: [ { t: day('2026-11-05'), u: day('2026-11-05') + 5 * 60e3 }, { t: day('2026-11-06'), u: day('2026-11-06') + 3 * 3600e3 }, { t: day('2026-11-15'), u: day('2026-11-15') + 60e3 }, { t: day('2026-11-07') } ] },
  'y2s1/pf1/k1/b': { attempts: [ { t: day('2026-11-05'), u: day('2026-11-05') + 600e3 } ] } };
assert.strictEqual(T.quizTimeEstimate(stats, 'y2s1/eeu/', '2026-11-10'), 25 * 60);
assert.strictEqual(T.quizTimeEstimate(stats, 'y2s1/eeu/', null), 26 * 60);
// izpis
assert.strictEqual(T.fmtDur(0), '0 min'); assert.strictEqual(T.fmtDur(20), '<1 min'); assert.strictEqual(T.fmtDur(3720), '1 h 2 min'); assert.strictEqual(T.fmtDur(7200), '2 h');
// zaklep zavihkov: logika iz useStudyTime (drug zavihek, ki je tiktaknil pred < 2 tiki, blokira)
const lockOk = (lock, me, now) => !(lock && lock.id !== me && now - lock.t < 2 * T.TIME_TICK);
assert.strictEqual(lockOk({ id: 'A', t: 1000 }, 'B', 1000 + T.TIME_TICK), false);
assert.strictEqual(lockOk({ id: 'A', t: 1000 }, 'B', 1000 + 3 * T.TIME_TICK), true);
assert.strictEqual(lockOk({ id: 'B', t: 1000 }, 'B', 1001), true);
console.log('test-cas-ucenja: vse v redu');
