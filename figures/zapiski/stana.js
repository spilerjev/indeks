/* Grafi za lastne primere v zapiskih Statistične analize (stana/k1). Številke izhajajo iz out/stana-calc.js. */
const { Fig, num } = require('../lib');
// Konstante primerov (iste kot v besedilu; stana-check.js jih primerja z izračuni v stana-calc.js)
const Phi = (z) => { const n = 4000, h = Math.abs(z) / n; let s = 0; for (let i = 0; i <= n; i++) { const w = i === 0 || i === n ? 1 : (i % 2 ? 4 : 2); s += w * Math.exp(-((i * h) ** 2) / 2); } return 0.5 + Math.sign(z) * s * h / 3 / Math.sqrt(2 * Math.PI); };
const r4 = (x) => Math.round(x * 1e4) / 1e4;
const c = (x, d = 2) => (Math.round(x * 10 ** d) / 10 ** d).toFixed(d).replace('-', '−').replace('.', ',');
const K = {
  sad: { mu: 24, sd: 3 },
  bat: (() => { const mu = 1200, s1 = 90, s2 = 126, g = 1050, p1 = 1 - r4(Phi(1.67)), p2 = 1 - r4(Phi(1.19)); return { mu, s1, s2, g, p1, p2, dA: p2 - p1, dR: (p2 - p1) / p1 * 100 }; })(),
  nal: { sg: 120, n: 64, mu0: 800, yb: 836, se: 15, two: [800 - 1.96 * 15, 800 + 1.96 * 15], z: 36 / 15 },
};

const range = (a, b, n = 120) => Array.from({ length: n + 1 }, (_, k) => a + (b - a) * k / n);
const phi = (z) => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI);
const cz = (x) => num(x);

/* Zvon N(24; 3) cm: μ ± kσ na osi, prevoja pri μ ± σ */
function sadike() {
  const { mu, sd } = K.sad, pdf = (y) => phi((y - mu) / sd) / sd, lo = mu - 3.6 * sd, hi = mu + 3.6 * sd;
  const f = new Fig({ qmin: lo, qmax: hi, pmax: pdf(mu) * 1.22, xl: '', yl: 'f(y)', title: `Višina sadik (cm): N(${mu}; ${sd})`, mr: 22, ml: 30, mb: 44 });
  f.area([[mu - 2 * sd, 0], ...range(mu - 2 * sd, mu + 2 * sd, 80).map((y) => [y, pdf(y)]), [mu + 2 * sd, 0]], 'a0', null);
  f.area([[mu - sd, 0], ...range(mu - sd, mu + sd, 60).map((y) => [y, pdf(y)]), [mu + sd, 0]], 'a1', null);
  f.fn(pdf, lo, hi, 'c3', 160);
  f.vline(mu, 0, pdf(mu), 'gd');
  f.dot(mu - sd, pdf(mu - sd)).dot(mu + sd, pdf(mu + sd));
  f.text(mu + sd, pdf(mu + sd), 'prevoj', { anchor: 'start', dx: 6, cls: 'tc' });
  const lab = ['μ − 3σ', 'μ − 2σ', 'μ − σ', 'μ', 'μ + σ', 'μ + 2σ', 'μ + 3σ'];
  [-3, -2, -1, 0, 1, 2, 3].forEach((k, i) => { f.xtick(mu + k * sd, cz(mu + k * sd)); f.text(mu + k * sd, 0, lab[i], { dy: 30, cls: 'tc' }); });
  f.legend('a1', `μ ± σ = ${mu - sd} do ${mu + sd} cm: 68,27 % sadik`);
  f.legend('a0', `μ ± 2σ = ${mu - 2 * sd} do ${mu + 2 * sd} cm: 95,44 % sadik`);
  f.legend(null, `os: višina sadike v cm; μ ± 3σ = ${mu - 3 * sd} do ${mu + 3 * sd} cm: 99,73 %`); f.legend(null, `prevoja zvona pri μ ± σ = ${mu - sd} in ${mu + sd} cm`);
  return f.svg();
}

/* Baterija: N(1.200; 90) pred, N(1.200; 126) po spremembi, garancija 1.050 */
function baterija() {
  const b = K.bat, p1 = (y) => phi((y - b.mu) / b.s1) / b.s1, p2 = (y) => phi((y - b.mu) / b.s2) / b.s2;
  const lo = b.mu - 3.6 * b.s2, hi = b.mu + 3.6 * b.s2;
  const f = new Fig({ qmin: lo, qmax: hi, pmax: p1(b.mu) * 1.2, xl: 'cikli', yl: 'f(y)', title: 'Delež baterij pred iztekom garancije', mr: 22, ml: 30 });
  f.area([[lo, 0], ...range(lo, b.g, 80).map((y) => [y, p2(y)]), [b.g, 0]], 'a5', null);
  f.area([[lo, 0], ...range(lo, b.g, 80).map((y) => [y, p1(y)]), [b.g, 0]], 'a1', null);
  f.fn(p1, lo, hi, 'cD', 160).fn(p2, lo, hi, 'cS', 160);
  f.vline(b.g, 0, p1(b.mu) * 1.05, 'pl');
  f.text(b.mu + 0.9 * b.s1, p1(b.mu + 0.9 * b.s1), 'σ = 90', { cls: 'tD', anchor: 'start', dx: 6 });
  f.text(b.mu + 1.6 * b.s2, p2(b.mu + 1.6 * b.s2), 'σ = 126', { cls: 'tS', anchor: 'start', dx: 6 });
  f.xtick(b.g, num(b.g)).xtick(b.mu, num(b.mu)).xtick(b.mu + 2 * b.s1, num(b.mu + 2 * b.s1));
  f.legend('a1', `pred: z = −1,67 → ${c(b.p1, 4)} (${c(b.p1 * 100, 2)} %)`);
  f.legend('a5', `po (kv +40 %, σ = 126): z = −1,19 → ${c(b.p2, 4)} (${c(b.p2 * 100, 2)} %)`);
  f.legend(null, `sprememba: +${num(Math.round(b.dA * 10000) / 100)} odstotne točke oz. +${num(Math.round(b.dR * 10) / 10)} %`);
  return f.svg();
}

/* Porazdelitev ȳ ob H₀: μ₀ = 800 ms, SE = 15 ms; os ȳ in os z; ȳ = 836 */
function nalaganje() {
  const n = K.nal, pdf = (y) => phi((y - n.mu0) / n.se) / n.se, lo = n.mu0 - 3.6 * n.se, hi = n.mu0 + 3.6 * n.se;
  const f = new Fig({ qmin: lo, qmax: hi, pmax: pdf(n.mu0) * 1.25, xl: '', yl: 'f(ȳ)', title: 'Porazdelitev vzorčnih sredin ȳ (ms) ob H₀', mr: 22, ml: 30, mb: 44 });
  f.area([[lo, 0], ...range(lo, n.two[0], 40).map((y) => [y, pdf(y)]), [n.two[0], 0]], 'a5', null);
  f.area([[n.two[1], 0], ...range(n.two[1], hi, 40).map((y) => [y, pdf(y)]), [hi, 0]], 'a5', null);
  f.fn(pdf, lo, hi, 'c3', 160);
  f.vline(n.mu0, 0, pdf(n.mu0), 'gd');
  f.vline(n.yb, 0, pdf(n.mu0) * 0.55, 'pl');
  f.text(n.yb, pdf(n.mu0) * 0.55, 'ȳ = 836', { dy: -5, cls: 'tc' });
  [-3, -2, -1, 0, 1, 2, 3].forEach((k) => { const y = n.mu0 + k * n.se; f.xtick(y, num(y)); f.text(y, 0, k === 0 ? '0' : (k < 0 ? '−' + -k : String(k)), { dy: 30, cls: 'tc' }); });
  f.text(lo, 0, 'ȳ:', { anchor: 'end', dx: -4, dy: 14 }); f.text(lo, 0, 'z:', { anchor: 'end', dx: -4, dy: 30, cls: 'tc' });
  f.legend(null, `os ȳ v ms; SE = σ/√n = ${n.sg}/√${n.n} = ${n.se} ms (ne σ = ${n.sg})`);
  f.legend('a5', `α = 5 % dvostransko: zavrnemo, če ȳ < ${num(n.two[0])} ali ȳ > ${num(n.two[1])}`);
  f.legend(null, `ȳ = ${n.yb} → z = (${n.yb} − ${n.mu0})/${n.se} = ${num(n.z)} > 1,96 → zavrnemo H₀`);
  return f.svg();
}

module.exports = {
  'z-stana-sadike-zvon': sadike,
  'z-stana-baterija-sprememba': baterija,
  'z-stana-nalaganje-se-z': nalaganje,
};
