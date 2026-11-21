/* Grafi za predelane naloge (21. 11. 2026): vprašanja, ki so ob predelavi dobila nove številke in so izgubila stari graf
   (predelava 3c in predelava nalog z vaj). Vsak graf ustreza številkam v novem vprašanju in razlagi (preverjeno z izračunom).
   Isti slog kot ostali moduli (figures/lib.js); grafi so v razlagi (po odgovoru), zato ne izdajo rešitve. */
const { Fig, num } = require('./lib');

const range = (a, b, n = 120) => Array.from({ length: n + 1 }, (_, k) => a + (b - a) * k / n);
const phi = (z) => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI);

/* ---- Uvod v poslovanje: prag rentabilnosti (zmogljivost 50.000, FC 900.000, P 80, AVC 50) ---- */
function prag(o) {
  const { P: p, v, FC, cap } = o, m = p - v, Qbe = FC / m, qmax = cap * 1.06;
  const top = Math.max(m * cap, FC) * 1.15;
  const f = new Fig({ qmax, pmax: top, xl: 'Q', yl: 'EUR', title: 'Prag rentabilnosti', ml: 64, mr: 70 });
  f.area([[0, 0], [0, FC], [Qbe, FC]], 'a5', null);
  if (cap > Qbe) f.area([[Qbe, FC], [cap, m * cap], [cap, FC]], 'a1', null);
  f.hline(FC, 0, qmax, 'cS').fn((q) => m * q, 0, qmax, 'cD');
  f.text(qmax, FC, 'FC', { cls: 'tS', anchor: 'start', dx: 4, dy: 4 });
  f.text(qmax, Math.min(m * qmax, top * 0.97), 'pokritje', { cls: 'tD', anchor: 'start', dx: 4, dy: 4 });
  f.text(Qbe * 0.3, FC * 0.62, 'izguba', { cls: 'tc' });
  f.text(Qbe + (cap - Qbe) * 0.72, FC + (m * cap - FC) * 0.3, 'dobiček', { cls: 'tc' });
  f.guideV(Qbe, FC).dot(Qbe, FC).vline(cap, 0, top * 0.98, 'gd');
  f.xtick(Qbe, num(Qbe)).xtick(cap, num(cap)).ytick(FC, num(FC));
  f.legend(null, `Q_{BE} = ${num(FC)} / (${num(p)} − ${num(v)}) = ${num(Qbe)}`);
  f.legend(null, `izkoriščenost = ${num(Qbe)} / ${num(cap)} = ${num(Math.round(Qbe / cap * 1000) / 10)} %`);
  if (o.q) {
    const q = o.q, pi = m * q - FC;
    f.guideV(q, m * q).dot(q, m * q).xtick(q, num(q));
    f.legend(null, `pri ${num(q)} enotah: π = ${num(m)} · ${num(q)} − ${num(FC)} = ${pi < 0 ? '−' + num(-pi) : num(pi)} (${pi < 0 ? 'izguba' : 'dobiček'})`);
  }
  return f.svg();
}

/* ---- Računovodstvo: članarine, plačane vnaprej (120 · 300 € = 36.000 € brez DDV, 12 mesecev) ---- */
function pcr(o) {
  const n = o.months.length, per = o.total / n;
  const f = new Fig({ qmax: n + 0.6, pmax: o.total * 1.12, xl: '', yl: '€', title: o.title, mr: 20, ml: 52 });
  o.months.forEach((m, k) => {
    const left = o.total - per * (k + 1);
    if (left > 0) f.rect(k + 0.12, 0, k + 0.52, left, 'a2', null);
    f.rect(k + 0.56, 0, k + 0.96, per, 'a1', null);
    f.text(k + 0.54, 0, m, { dy: 13 });
  });
  f.ytick(o.total, num(o.total)).ytick(per, num(per));
  f.legend('a1', `prihodki vsak mesec = ${num(o.total)} / ${n} = ${num(per)} € (brez DDV)`);
  f.legend('a2', 'stanje PČR (odloženi prihodki) konec meseca');
  f.legend(null, 'DDV (22 % = 7.920 €) ni prihodek, je obveznost do države');
  return f.svg();
}

/* ---- Statistična analiza: porazdelitev ȳ ob H₀ (μ₀ = 500 g, σ = 24 g, n = 64 → SE = 3 g), desnostranski preizkus ---- */
function testPaket() {
  const mu0 = 500, se = 3, z = (y) => (y - mu0) / se, dens = (y) => phi(z(y)) / se;
  const yk = mu0 + 1.645 * se;
  const f = new Fig({ qmin: 489, qmax: 511, pmax: 0.15, xl: 'ȳ (g)', yl: 'gostota', title: 'Porazdelitev vzorčnih sredin ȳ ob H₀', mr: 22, ml: 30 });
  f.area([[yk, 0], ...range(yk, 511, 40).map((y) => [y, dens(y)]), [511, 0]], 'a5', null);
  f.fn(dens, 489, 511, 'c3', 160); f.vline(yk, 0, dens(yk) + 0.025, 'pl');
  f.vline(mu0, 0, dens(mu0), 'gd');
  f.text(492.4, 0.03, 'ne zavrnemo H₀', { cls: 'tc' }); f.text(508.6, 0.035, 'zavrnemo', { cls: 'tc' });
  f.xtick(mu0 - se, '497').xtick(mu0, '500 = μ_{0}').xtick(mu0 + se, '503').xtick(yk, '');
  f.legend(null, 'središče pri μ_{0} = 500 g (predpostavka H_{0})');
  f.legend(null, 'standardna napaka σ/√n = 24/√64 = 3 g (ne 24/64 = 0,375)');
  f.legend('a5', 'α = 5 %: kritična meja ȳ_{k} = 500 + 1,645 · 3 ≈ 504,9 g');
  return f.svg();
}

/* ---- Matematika: f(x) = (x − 4) · ln x, ničli 1 in 4, ploščina 16 ln 2 − 33/4 ≈ 2,84 ---- */
function matX4lnx() {
  const g = (x) => (x - 4) * Math.log(x);
  const f = new Fig({ qmin: 0, qmax: 5.4, pmin: -1.9, pmax: 2.6, xl: 'x', yl: 'y', title: 'f(x) = (x − 4) · ln x', mr: 24, ml: 30 });
  f.area([[1, 0], ...range(1, 4, 60).map((x) => [x, g(x)]), [4, 0]], 'a1', '≈ 2,84', [2.5, -0.55]);
  f.hline(0, 0, 5.3, 'ax');
  f.fn(g, 0.52, 5.3, 'c3', 200);
  f.dot(1, 0).dot(4, 0).text(1, 0, '1', { dy: -6, dx: -4 }).text(4, 0, '4', { dy: -6, dx: 4 });
  f.legend('a1', 'ničli: ln x = 0 → x = 1 in x − 4 = 0 → x = 4; vmes je f < 0');
  f.legend(null, '∫₁⁴ (x − 4) ln x dx = 33/4 − 16 ln 2 ≈ −2,84 → ploščina ≈ 2,84');
  return f.svg();
}

/* ---- Trženje: ravni trga za električne skiroje (40 000 / 12 000 / 3 000) ---- */
function box(f, x0, y0, x1, y1, cls) { f.rect(x0, y0, x1, y1, cls, null); }
function trgiSkiro() {
  const f = new Fig({ qmax: 100, pmax: 50, noAxes: true, ml: 6, mr: 6, mt: 6, mb: 6, h: 230, title: 'Ravni trga: električni skiroji' });
  box(f, 3, 3, 97, 47, 'a0'); f.text(50, 42.5, 'POTENCIALNI · 40 000', { cls: 'tl' });
  box(f, 10, 3, 90, 38, 'a4'); f.text(50, 33.5, 'RAZPOLOŽLJIVI · 12 000', { cls: 'tl' });
  box(f, 18, 3, 82, 29, 'a3'); f.text(50, 24.5, 'CILJNI', { cls: 'tl' });
  box(f, 28, 3, 72, 20, 'a1'); f.text(50, 11, 'DEJANSKI · 3 000', { cls: 'tl' });
  f.legend(null, 'potencialni: zanimanje (40 000)');
  f.legend(null, 'razpoložljivi: zanimanje + dohodek + dostop (12 000)');
  f.legend(null, 'ciljni: del razpoložljivega, ki ga ponudnik želi osvojiti');
  f.legend(null, 'dejanski: že kupili (3 000)');
  return f.svg();
}

const figs = {
  'v2-prag-50k': prag({ P: 80, v: 50, FC: 900000, cap: 50000 }),
  'v2-prag-50k-20': prag({ P: 80, v: 50, FC: 900000, cap: 50000, q: 20000 }),
  'v2-prag-50k-40': prag({ P: 80, v: 50, FC: 900000, cap: 50000, q: 40000 }),
  'v2-pcr-fitnes': pcr({ title: 'Fitnes: članarine po mesecih', total: 36000, months: ['s', 'o', 'n', 'd', 'j', 'f', 'm', 'a', 'm', 'j', 'j', 'a'] }),
  'v2-test-paket': testPaket(),
  'v2-mat-x4lnx': matX4lnx(),
  'v2-trgi-skiro': trgiSkiro(),
};

const P50 = 'Podjetje ima zmogljivost 50.000 enot, fiksne stroške 900.000 EUR, prodajno ceno 80 EUR in povprečne variabilne stroške 50 EUR na enoto.';
const attach = [
  { subj: 'uvod', q: P50 + ' Pri kateri izkoriščenosti', fig: 'v2-prag-50k' },
  { subj: 'uvod', q: P50 + ' Kolikšen je poslovni izid pri 20.000', fig: 'v2-prag-50k-20' },
  { subj: 'uvod', q: P50 + ' Kolikšen je poslovni izid pri 80 %', fig: 'v2-prag-50k-40' },
  { subj: 'rac', q: 'Fitnes center 1. septembra proda 120 letnih članarin', fig: 'v2-pcr-fitnes' },
  { subj: 'stana', q: 'Preverjamo, ali povprečna teža paketa presega 500 g', fig: 'v2-test-paket' },
  { subj: 'mat', q: 'Graf funkcije f(x) = (x − 4)·ln x in x-os omejujeta', fig: 'v2-mat-x4lnx' },
  { subj: 'trz', q: 'Ponudnik električnih skirojev ugotovi', fig: 'v2-trgi-skiro' },
];

module.exports = { figs, attach };
