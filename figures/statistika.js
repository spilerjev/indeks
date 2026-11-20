/* Grafi: Statistična analiza (stana), Statistika (stat), Matematika (mat). */
const { Fig, num } = require('./lib');

const range = (a, b, n = 120) => Array.from({ length: n + 1 }, (_, k) => a + (b - a) * k / n);
const phi = (z) => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI);
function Phi(z) { // Abramowitz-Stegun 26.2.17
  const t = 1 / (1 + 0.2316419 * Math.abs(z)), d = phi(z);
  const p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z >= 0 ? 1 - p : p;
}
const r4 = (x) => num(Math.round(x * 10000) / 10000);

// zvon N(mu, sd); shade = [[a, b, cls, label]], ticks = [[x, label]]
function bell(o) {
  const { mu, sd } = o, lo = mu - 3.6 * sd, hi = mu + 3.6 * sd, top = phi(0) / sd;
  const f = new Fig({ qmin: lo, qmax: hi, pmax: top * 1.22, xl: o.xl || 'y', yl: o.yl == null ? 'f(y)' : o.yl, title: o.title, mr: 22, ml: 30 });
  const pdf = (y) => phi((y - mu) / sd) / sd;
  (o.shade || []).forEach(([a, b, cls, label, at]) => {
    const A = Math.max(a, lo), B = Math.min(b, hi);
    f.area([[A, 0], ...range(A, B, 80).map((y) => [y, pdf(y)]), [B, 0]], cls, label, at);
  });
  f.fn(pdf, lo, hi, 'c3', 160);
  (o.vlines || []).forEach(([x, cls]) => f.vline(x, 0, pdf(x), cls || 'pl'));
  (o.ticks || []).forEach(([x, t]) => f.xtick(x, t));
  (o.legend || []).forEach((l) => f.legend(l[1] ? l[0] : null, l[1] || l[0]));
  return f.svg();
}

function sigmaFig() {
  const f = new Fig({ qmin: -7, qmax: 7, pmax: 0.46, xl: 'y', yl: 'f(y)', title: 'Večji σ: nižji in širši zvon', mr: 22, ml: 30 });
  f.fn((y) => phi(y), -7, 7, 'cD', 160).fn((y) => phi(y / 2) / 2, -7, 7, 'cS', 160);
  f.text(1.1, phi(1.1), 'σ', { cls: 'tD', anchor: 'start', dx: 6 }); f.text(3, phi(1.5) / 2, '2σ', { cls: 'tS', anchor: 'start', dx: 6 });
  f.vline(0, 0, phi(0), 'gd').xtick(0, 'μ');
  f.legend(null, 'μ določa lego, σ obliko (razpotegnjenost)');
  f.legend(null, 'ploščina pod vsakim zvonom je 1');
  return f.svg();
}
function cdfFig() {
  const f = new Fig({ qmin: -3.6, qmax: 3.6, pmax: 1.12, xl: 'y', yl: 'F(y)', title: 'Porazdelitvena funkcija F(y)', mr: 22, ml: 34 });
  f.hline(1, -3.6, 3.6, 'gd');
  f.fn(Phi, -3.6, 3.6, 'c3', 160);
  f.guideH(0.5, 0).guideV(0, 0.5).pt(0, 0.5, 'prevoj', 26, 4);
  f.dot(-1, Phi(-1)).dot(1, Phi(1));
  f.ytick(1, '1').ytick(0.5, '0,5').xtick(-1, 'μ − σ').xtick(0, 'μ').xtick(1, 'μ + σ');
  f.legend(null, 'F(y) = P(Y ≤ y): narašča od 0 do 1 (oblika S, kot ogiva)');
  f.legend(null, 'najstrmejša pri μ (tam ima gostota vrh) → prevoj pri μ, F(μ) = 0,5');
  f.legend(null, 'μ ± σ sta prevoja ZVONA (gostote), ne F');
  return f.svg();
}
function zFig() {
  const f = new Fig({ qmin: -3.6, qmax: 3.6, pmax: 0.5, xl: '', yl: '', title: 'Standardizacija: Y → Z', mr: 22, ml: 30, mb: 44 });
  f.area([[-3.6, 0], ...range(-3.6, 0.8, 80).map((z) => [z, phi(z)]), [0.8, 0]], 'a1', null);
  f.fn(phi, -3.6, 3.6, 'c3', 160);
  [[-2, 'μ − 2σ', '−2'], [0, 'μ', '0'], [0.8, 'a', 'z_{a}'], [2, 'μ + 2σ', '2']].forEach(([z, ty, tz]) => { f.xtick(z, ty); f.text(z, 0, tz, { dy: 30, cls: 'tc' }); });
  f.text(-3.6, 0, 'Y:', { anchor: 'end', dx: -4, dy: 14 }); f.text(-3.6, 0, 'Z:', { anchor: 'end', dx: -4, dy: 30, cls: 'tc' });
  f.legend('a1', 'F_{Y}(a) = F_{Z}(z_{a}), z_{a} = (a − μ)/σ: ploščina ostane enaka');
  f.legend(null, 'zato zadošča ena tabela (za N(0, 1))');
  return f.svg();
}
function asimFig() {
  // gama porazdelitev k = 2.2, θ = 1  (desna asimetrija)
  const k = 2.2, g = (x) => (x <= 0 ? 0 : Math.pow(x, k - 1) * Math.exp(-x));
  const norm = (() => { let s = 0; for (let x = 0.005; x < 30; x += 0.01) s += g(x) * 0.01; return s; })();
  const pdf = (x) => g(x) / norm, mode = k - 1, mean = k;
  let acc = 0, med = 0; for (let x = 0.0005; x < 30; x += 0.001) { acc += pdf(x) * 0.001; if (acc >= 0.5) { med = x; break; } }
  const f = new Fig({ qmax: 9, pmax: pdf(mode) * 1.25, xl: 'y', yl: 'f(y)', title: 'Asimetrija v desno', mr: 22, ml: 30 });
  f.fn(pdf, 0, 9, 'c3', 160);
  f.vline(mode, 0, pdf(mode), 'c4').vline(med, 0, pdf(med), 'c5').vline(mean, 0, pdf(mean), 'cS');
  f.xtick(mode, 'Mo').xtick(med, 'Me').xtick(mean, 'ȳ');
  f.text(6.4, pdf(6.4), 'dolg desni rep', { anchor: 'start', dx: 4, dy: -8 });
  f.legend(null, 'Mo < Me < ȳ: redke velike vrednosti vlečejo povprečje navzgor');
  f.legend(null, 'boxplot: osamelci zgoraj; histogram: dolg desni rep');
  return f.svg();
}
function zeroFig() {
  const f = new Fig({ qmin: -3.6, qmax: 3.6, pmax: 0.5, xl: 'y', yl: 'f(y)', title: 'Verjetnost ene točke', mr: 22, ml: 30 });
  f.area([[0.6, 0], ...range(0.6, 1.4, 30).map((z) => [z, phi(z)]), [1.4, 0]], 'a1', null);
  f.fn(phi, -3.6, 3.6, 'c3', 160); f.vline(-1.2, 0, phi(-1.2), 'cS');
  f.xtick(-1.2, 'a').xtick(0.6, 'b').xtick(1.4, 'c');
  f.legend('a1', 'P(b < Y < c) = ploščina nad intervalom > 0');
  f.legend(null, 'P(Y = a): daljica nima ploščine → 0 (≤ in < sta enaka)');
  return f.svg();
}
function alfaBeta() {
  const f = new Fig({ qmin: -3.6, qmax: 6.6, pmax: 0.5, xl: 'ȳ', yl: '', title: 'Napaki α in β', mr: 22, ml: 16 });
  const c = 1.8, m1 = 3;
  f.area([[c, 0], ...range(c, 3.6, 40).map((z) => [z, phi(z)]), [3.6, 0]], 'a5', null);
  f.area([[-0.6, 0], ...range(-0.6, c, 60).map((z) => [z, phi(z - m1)]), [c, 0]], 'a3', null);
  f.fn(phi, -3.6, 3.6, 'cD', 140).fn((z) => phi(z - m1), -0.6, 6.6, 'cS', 140);
  f.vline(c, 0, 0.46, 'pl'); f.text(c, 0.46, 'kritična meja', { dy: -4, cls: 'tc' });
  f.arrow(c + 0.1, 0.42, c + 1.0, 0.42).arrow(c - 0.1, 0.42, c - 1.0, 0.42);
  f.text(2.25, 0.05, 'α', { cls: 'tl' }); f.text(1.2, 0.07, 'β', { cls: 'tl' });
  f.xtick(0, 'μ_{0}').xtick(m1, 'μ_{1}');
  f.legend('a5', 'α: zavrnemo resnično H_{0} (rep H_{0} za mejo)');
  f.legend('a3', 'β: ne zavrnemo napačne H_{0} (del H_{1} pred mejo)');
  f.legend(null, 'meja desno: α ↓, β ↑ (in obratno); oba ↓ le z večjim n');
  return f.svg();
}
function testDesno() {
  const f = new Fig({ qmin: -3.6, qmax: 3.6, pmax: 0.5, xl: 'ȳ', yl: 'gostota', title: 'Porazdelitev vzorčnih ocen ȳ ob H₀', mr: 22, ml: 30 });
  f.area([[1.645, 0], ...range(1.645, 3.6, 40).map((z) => [z, phi(z)]), [3.6, 0]], 'a5', null);
  f.fn(phi, -3.6, 3.6, 'c3', 160); f.vline(1.645, 0, phi(1.645) + 0.08, 'pl');
  f.text(-0.6, 0.18, 'ne zavrnemo H₀', { cls: 'tc' }); f.text(2.6, 0.12, 'zavrnemo', { cls: 'tc' });
  f.xtick(0, 'μ_{0}').xtick(1.645, 'ȳ_{k}');
  f.legend(null, 'na vodoravni osi je ȳ, na navpični gostota verjetnosti');
  f.legend(null, 'μ_{0} in kritična vrednost ȳ_{k} sta le točki na osi');
  f.legend('a5', 'α = P(ȳ > ȳ_{k}) ob H_{0}; standardna napaka σ/√n = 2 cm');
  return f.svg();
}
function ogiva() {
  const f = new Fig({ qmax: 42, pmax: 22, xl: 'y', yl: 'F (kumulativa)', title: 'Ogiva', mr: 20, ml: 30 });
  const P = [[0, 0], [8, 3], [16, 9], [24, 15], [32, 19], [40, 20]];
  f.path(P, 'c3'); P.forEach(([x, y]) => f.dot(x, y)); f.hline(20, 0, 40, 'gd');
  P.slice(1).forEach(([x]) => f.xtick(x, String(x))); f.ytick(20, 'n');
  f.legend(null, 'ogiva = krivulja kumulativnih frekvenc (do zgornje meje razreda)');
  f.legend(null, 'histogram/poligon prikazujeta frekvence, Lorenz koncentracijo');
  return f.svg();
}
function matXX2() {
  const f = new Fig({ qmin: -0.1, qmax: 1.25, pmin: -0.1, pmax: 1.25, xl: 'x', yl: 'y', title: 'Ploščina med y = x in y = x²', mr: 30, ml: 30 });
  f.area([...range(0, 1, 40).map((x) => [x, x]), ...range(1, 0, 40).map((x) => [x, x * x])], 'a1', '1/6', [0.55, 0.4]);
  f.fn((x) => x, -0.1, 1.2, 'c4').fn((x) => x * x, -0.1, 1.1, 'cS');
  f.text(1.18, 1.18, 'y = x', { anchor: 'end', dx: -6, cls: 'tc' }); f.text(1.08, 1.17, 'y = x²', { anchor: 'start', dx: 6, cls: 'tS' });
  f.xtick(1, '1').ytick(1, '1').dot(1, 1).dot(0, 0);
  f.legend('a1', '∫₀¹ (x − x²) dx = 1/2 − 1/3 = 1/6');
  f.legend(null, 'na [0, 1] je x ≥ x² → zgornja minus spodnja');
  return f.svg();
}
function matXln() {
  const g = (x) => x * Math.log(5 - x);
  const f = new Fig({ qmin: -0.3, qmax: 5.2, pmin: -2.4, pmax: 3.6, xl: 'x', yl: 'y', title: 'f(x) = x · ln(5 − x)', mr: 24, ml: 30 });
  f.area([[0, 0], ...range(0, 4, 60).map((x) => [x, g(x)]), [4, 0]], 'a1', '≈ 6,12', [2.2, 1.2]);
  f.hline(0, -0.3, 5.1, 'ax');
  f.fn(g, -0.3, 4.97, 'c3', 200);
  f.dot(0, 0).dot(4, 0).text(4, 0, '4', { dy: 14, dx: 4 }).text(0, 0, '0', { dy: 14, dx: -6 });
  f.legend('a1', 'ničli: x = 0 in 5 − x = 1 → x = 4');
  f.legend(null, '∫₀⁴ x ln(5 − x) dx = (25/2) ln 5 − 14 ≈ 6,12');
  return f.svg();
}

const mu = 150, sd = 30;
const figs = {
  'st-ab': bell({ mu: 0, sd: 1, title: 'P(a < Y ≤ b) = F(b) − F(a)', shade: [[-0.6, 1.1, 'a1', null]], ticks: [[-0.6, 'a'], [1.1, 'b']], legend: [['a1', 'ploščina med a in b = F(b) − F(a)'], ['f(y) je gostota (višina), verjetnost je ploščina'], ['ne zamenjaj s F(b − a): ploščina levo od vrednosti b − a']] }),
  'st-gt': bell({ mu: 0, sd: 1, title: 'P(Y > b) = 1 − F(b)', shade: [[-9, 0.9, 'a0', 'F(b)', [-0.6, 0.12]], [0.9, 9, 'a1', null]], ticks: [[0.9, 'b']], legend: [['a1', 'P(Y > b) = celotna ploščina 1 − F(b)']] }),
  'st-sigma': sigmaFig(),
  'st-cdf': cdfFig(),
  'st-z': zFig(),
  'st-asim': asimFig(),
  'st-zero': zeroFig(),
  'st-jab-150': bell({ mu, sd, xl: 'masa (g)', title: 'P(Y < 150) pri N(150, 30)', shade: [[0, 150, 'a1', '0,5', [125, 0.004]]], ticks: [[90, '90'], [120, '120'], [150, '150'], [180, '180'], [210, '210']], legend: [['a1', 'μ = 150: simetrija → polovica ploščine levo od μ = 0,5']] }),
  'st-jab-100': bell({ mu, sd, xl: 'masa (g)', title: 'P(Y ≤ 100) pri N(150, 30)', shade: [[0, 100, 'a5', null]], ticks: [[100, '100'], [120, '120'], [150, '150'], [180, '180']], legend: [['a5', 'z = (100 − 150)/30 = −1,67 → F_{Z}(−1,67) = ' + r4(Phi(-1.67))], ['med μ − 2σ (2,3 %) in μ − σ (16 %) → smiselno']] }),
  'st-jab-100-160': bell({ mu, sd, xl: 'masa (g)', title: 'P(100 < Y ≤ 160) pri N(150, 30)', shade: [[100, 160, 'a1', null]], ticks: [[100, '100'], [150, '150'], [160, '160']], legend: [['a1', 'F_{Z}(0,33) − F_{Z}(−1,67) = 0,6293 − 0,0475 = 0,5818'], ['600 · 0,5818 ≈ 349 jabolk']] }),
  'st-jab-a': bell({ mu, sd, xl: 'masa (g)', title: 'P(Y > a) = 0,25', shade: [[150 + 0.6745 * sd, 400, 'a1', null]], ticks: [[150, '150'], [170.2, 'a ≈ 170']], legend: [['a1', 'desni rep 0,25 → F(a) = 0,75 → a = Q_{3}'], ['z ≈ 0,67 → a = 150 + 0,67 · 30 ≈ 170 g']] }),
  'st-17': bell({ mu: 0, sd: 1, title: 'P(μ − 1,7σ ≤ Y ≤ μ)', shade: [[-1.7, 0, 'a1', null]], ticks: [[-1.7, 'μ − 1,7σ'], [0, 'μ']], legend: [['a1', 'F_{Z}(0) − F_{Z}(−1,7) = 0,5 − 0,0446 = 0,4554']] }),
  'st-alfa-beta': alfaBeta(),
  'st-test-desno': testDesno(),
  'st-ogiva': ogiva(),
  'mk-demo-stat': null,
  'mat-xx2': matXX2(),
  'mat-xln': matXln(),
};
delete figs['mk-demo-stat'];

const A = (subj, list) => list.map(([q, fig, o]) => ({ subj, q, fig, ...(o || {}) }));
const attach = [
  ...A('stana', [
    ['ȳ = 30,5 in Me = 25,05', 'st-asim'],
    ['Čas študija študentov v preteklem tednu (n = 150, od 0 do 45 ur)', 'st-asim'],
    ['(Zgled 2010) Na tekmah reprezentance', 'st-asim'],
    ['Kaj je f(y) pri zvezni porazdelitvi?', 'st-ab'],
    ['Kaj je F(y)?', 'st-cdf'],
    ['P(Y = a) pri zvezni slučajni spremenljivki je:', 'st-zero'],
    ['P(a < Y ≤ b) = ?', 'st-ab'],
    ['P(Y > b) = ?', 'st-gt'],
    ['Kaj se zgodi z zvonom, če povečamo σ', 'st-sigma'],
    ['Pri normalni porazdelitvi za vrednost a velja F_Y(a)', 'st-z'],
    ['Masa jabolk Y je normalno porazdeljena s povprečjem 150 g in standardnim odklonom 30 g. Kolikšna je verjetnost, da je jabolko lažje', 'st-jab-150'],
    ['Masa jabolk Y je normalno porazdeljena s povprečjem 150 g in standardnim odklonom 30 g. Kolikšen delež jabolk tehta 100 g', 'st-jab-100'],
    ['Zaboj s 600 jabolki', 'st-jab-100-160'],
    ['Masa jabolk Y je normalno porazdeljena s povprečjem 150 g in standardnim odklonom 30 g. Verjetnost, da je jabolko težje', 'st-jab-a'],
    ['Normalna porazdelitev: kolikšen delež enot ni več kot 1,7σ', 'st-17'],
    ['Kje ima porazdelitvena funkcija normalne porazdelitve prevoj?', 'st-cdf'],
    ['Kako se spremenita α in β', 'st-alfa-beta'],
    ['(Zgled izpita) Preizkus H₀: μ ≤ μ₀, H₁: μ > μ₀ (n = 25', 'st-test-desno'],
  ]),
  ...A('stat', [
    ['(Izpit 2013) S katerim grafikonom prikažemo kumulativo frekvenc?', 'st-ogiva'],
    ['Demografski prehod opisuje:', 'mk-demo'],
  ]),
  ...A('mat', [
    ['Ploščina med y = x in y = x² na [0, 1]?', 'mat-xx2'],
    ['(Izpit 2021) f(x) = x·ln(5 − x).', 'mat-xln'],
  ]),
];

module.exports = { figs, attach };
