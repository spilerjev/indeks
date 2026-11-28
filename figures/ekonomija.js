/* Grafi: Mikroekonomija, Makroekonomija, Uvod v poslovanje, PF1, MPSP.
   Kjer ima vprašanje številke, graf uporabi točno te številke (preverjeno z razlago). */
const { Fig, num, sgn } = require('./lib');

const range = (a, b, n = 60) => Array.from({ length: n + 1 }, (_, k) => a + (b - a) * k / n);
const pts = (f, a, b, n) => range(a, b, n).map((x) => [x, f(x)]);
function axes(f, q0, p0, q1, p1, xl, yl) {
  f.arrow(q0, p0, q1, p0, 'ax').arrow(q0, p0, q0, p1, 'ax');
  f.text(q1, p0, xl, { anchor: 'end', dy: 14 }); f.text(q0, p1, yl, { anchor: 'end', dx: -5, dy: 4 });
}

/* ---------------- trg (mikro) ---------------- */
// premiki: linearni S: P = s + Q, D: P = d − Q  (simbolni graf)
function shiftFig(o) {
  const f = new Fig({ qmax: 10, pmax: 11, title: o.title, mr: 40 });
  const S = (s) => (q) => s + q, D = (d) => (q) => d - q;
  const s0 = o.s0, s1 = o.s1 != null ? o.s1 : o.s0, d0 = o.d0, d1 = o.d1 != null ? o.d1 : o.d0;
  const e0 = { q: (d0 - s0) / 2, p: (d0 + s0) / 2 }, e1 = { q: (d1 - s1) / 2, p: (d1 + s1) / 2 };
  if (s1 !== s0) f.fn(S(s1), 0, 10, 'cS2').fn(S(s0), 0, 10, 'cS'); else f.fn(S(s0), 0, 10, 'cS');
  if (d1 !== d0) f.fn(D(d1), 0, 10, 'cD2').fn(D(d0), 0, 10, 'cD'); else f.fn(D(d0), 0, 10, 'cD');
  const lab = (fn, q, t, cls) => f.text(q, fn(q), t, { cls, anchor: 'start', dx: 5, dy: 4 });
  if (s1 !== s0) { lab(S(s0), 9.3 - s0, 'S_{0}', 'tS'); lab(S(s1), 9.3 - s1, 'S_{1}', 'tS'); } else lab(S(s0), 9.3 - s0, 'S', 'tS');
  if (d1 !== d0) { lab(D(d0), d0 - 1, 'D_{0}', 'tD'); lab(D(d1), d1 - 1, 'D_{1}', 'tD'); } else lab(D(d0), d0 - 1, 'D', 'tD');
  if (o.arrowS) f.arrow(4.6 - s0 + 1, 5.6, 4.6 - s1 + 1 + (s1 < s0 ? -0.15 : 0.15), 5.6);
  if (o.arrowD) f.arrow(d0 - 2.6 - 0.2, 2.6, d1 - 2.6 - 0.2 + (d1 > d0 ? -0.15 : 0.15), 2.6);
  f.guideH(e0.p, e0.q).guideV(e0.q, e0.p).pt(e0.q, e0.p, 'E_{0}', -12, -4);
  if (e1.q !== e0.q || e1.p !== e0.p) { f.guideH(e1.p, e1.q).guideV(e1.q, e1.p).pt(e1.q, e1.p, 'E_{1}', 12, -4); f.ytick(e1.p, 'P_{1}'); if (e1.q !== e0.q) f.xtick(e1.q, 'Q_{1}'); }
  f.ytick(e0.p, 'P_{0}').xtick(e0.q, e1.q === e0.q ? 'Q_{0} = Q_{1}' : 'Q_{0}');
  (o.legend || []).forEach((l) => f.legend(null, l));
  return f.svg();
}
function priceControl(o) {
  const f = new Fig({ qmax: 10, pmax: 11, title: o.title, mr: 40 });
  const pc = o.p, qs = pc - 1, qd = 9 - pc;
  f.fn((q) => 1 + q, 0, 10, 'cS').fn((q) => 9 - q, 0, 10, 'cD');
  f.text(9.3, 10.3, 'S', { cls: 'tS', anchor: 'start' }); f.text(8, 1, 'D', { cls: 'tD', anchor: 'start', dx: 5 });
  f.hline(pc, 0, 9.6).tag(9.6, pc, o.name);
  f.guideH(5, 4).guideV(4, 5).pt(4, 5, 'E', 0, -8).ytick(5, 'P_{0}').ytick(pc, o.name);
  f.guideV(qs, pc).guideV(qd, pc).xtick(Math.min(qs, qd), o.p < 5 ? 'Q_{S}' : 'Q_{D}').xtick(Math.max(qs, qd), o.p < 5 ? 'Q_{D}' : 'Q_{S}');
  f.area([[Math.min(qs, qd), pc], [Math.max(qs, qd), pc], [Math.max(qs, qd), pc + (o.p < 5 ? -0.35 : 0.35)], [Math.min(qs, qd), pc + (o.p < 5 ? -0.35 : 0.35)]], 'a5', null);
  f.text((qs + qd) / 2, pc + (o.p < 5 ? -0.9 : 0.75), o.gap, { cls: 'tc' });
  f.legend(null, o.leg);
  return f.svg();
}

const ELAST_400 = (() => {
  const f = new Fig({ qmax: 430, pmax: 112, title: 'Elastičnost vzdolž linearnega povpraševanja' });
  f.fn((q) => 100 - q / 4, 0, 200, 'c4').fn((q) => 100 - q / 4, 200, 400, 'c5');
  f.guideH(50, 200).guideV(200, 50).pt(200, 50, 'E = −1', 30, -8);
  f.text(80, 86, '|E| > 1: elastično', { cls: 'tc', anchor: 'start' }); f.text(290, 18, '|E| < 1: neelastično', { cls: 'tc', anchor: 'start' });
  f.ytick(100, '100').ytick(50, '50').xtick(200, '200').xtick(400, '400').text(400, 0, 'D', { cls: 'tD', dy: -6, dx: 8 });
  f.legend(null, 'Q = 400 − 4P: naklon povsod enak, E = −4 · P/Q pa ne');
  f.legend(null, 'na sredini (P = 50, Q = 200): E = −4 · 50/200 = −1');
  return f.svg();
})();
const ELAST_LIN = (() => {
  const f = new Fig({ qmax: 430, pmax: 112, title: 'Elastičnost vzdolž premice Q = a − bP' });
  f.fn((q) => 100 - q / 4, 0, 200, 'c4').fn((q) => 100 - q / 4, 200, 400, 'c5');
  f.guideH(50, 200).guideV(200, 50).pt(200, 50, '|E| = 1', 30, -8);
  f.text(80, 86, '|E| > 1: elastično', { cls: 'tc', anchor: 'start' }); f.text(290, 18, '|E| < 1: neelastično', { cls: 'tc', anchor: 'start' });
  f.ytick(100, 'a/b').ytick(50, 'a/2b').xtick(200, 'a/2').xtick(400, 'a').text(400, 0, 'D', { cls: 'tD', dy: -6, dx: 8 });
  f.legend(null, 'naklon premice je povsod enak');
  f.legend(null, 'E = −b · P/Q se spreminja z razmerjem P/Q');
  f.legend(null, 'na sredini (P = a/2b, Q = a/2) je |E| = 1');
  return f.svg();
})();
const ELAST_40 = (() => {
  const f = new Fig({ qmax: 86, pmax: 44, title: 'Elastičnost pri P = 10' });
  f.fn((q) => 40 - 0.5 * q, 0, 40, 'c4').fn((q) => 40 - 0.5 * q, 40, 80, 'c5');
  f.guideH(20, 40).guideV(40, 20).dot(40, 20).text(40, 20, '|E| = 1', { dx: 26, dy: -6, cls: 'tc' });
  f.guideH(10, 60).guideV(60, 10).pt(60, 10, 'E ≈ −0,33', 0, -9);
  f.ytick(40, '40').ytick(20, '20').ytick(10, '10').xtick(40, '40').xtick(60, '60').xtick(80, '80');
  f.legend(null, 'Q = 80 − 2P; pri P = 10 je Q = 60');
  f.legend(null, 'E = −2 · 10/60 ≈ −0,33: spodnji, neelastični del');
  return f.svg();
})();

function trosarina() {
  // Qd = 286 − 15P, Qs = 86 + 25P, t = 2 (odvedejo proizvajalci)
  const D = (q) => (286 - q) / 15, S = (q) => (q - 86) / 25, St = (q) => S(q) + 2;
  const f = new Fig({ qmax: 290, pmax: 11, pmin: 0, title: 'Trošarina: porazdelitev bremena' });
  const Q0 = 211, P0 = 5, Qt = 192.25, Pd = 6.25, Ps = 4.25;
  f.rect(0, P0, Qt, Pd, 'a1', null).rect(0, Ps, Qt, P0, 'a2', null);
  f.area([[Qt, Pd], [Qt, Ps], [Q0, P0]], 'a5', null);
  f.fn(D, 0, 290, 'cD').fn(S, 0, 290, 'cS').fn(St, 0, 290, 'cS2');
  f.text(220, St(220), 'S + t', { cls: 'tS', anchor: 'end', dx: -8, dy: -4 }); f.text(268, S(268), 'S', { cls: 'tS', anchor: 'start', dx: 5, dy: 4 });
  f.text(150, D(150), 'D', { cls: 'tD', anchor: 'start', dx: 4, dy: -6 });
  f.guideH(P0, Q0).guideV(Q0, P0).guideV(Qt, Pd).dot(Q0, P0).dot(Qt, Pd).dot(Qt, Ps);
  f.ytick(Pd, '6,25 (P_{k})').ytick(P0, '5 (P*)').ytick(Ps, '4,25 (P_{p})').xtick(Qt, '192,25').xtick(Q0, '211');
  f.text(Qt / 2, (Pd + P0) / 2, 'potrošniki', { cls: 'tc', dy: 4 }); f.text(Qt / 2, (Ps + P0) / 2, 'proizvajalci', { cls: 'tc', dy: 4 });
  f.legend('a1', 'breme potrošnikov = (P_{k} − P*) · Q_{t}');
  f.legend('a2', 'breme proizvajalcev = (P* − P_{p}) · Q_{t}');
  f.legend('a5', 'mrtva izguba; davčni prihodek = t · Q_{t} (oba pravokotnika)');
  f.legend(null, 'strmejša (bolj neelastična) stran nosi več bremena');
  return f.svg();
}

function ppf(o) {
  const f = new Fig({ qmax: 11, pmax: 11, xl: o.xl, yl: o.yl, title: o.title, mr: 20 });
  if (o.zasuk) {
    f.path(pts((x) => 8 * Math.sqrt(Math.max(0, 1 - (x / 8) ** 2)), 0, 8, 80), 'c3');
    f.path(pts((x) => 10 * Math.sqrt(Math.max(0, 1 - (x / 6) ** 2)), 0, 6, 80), 'c4');
    f.arrow(8.15, 0.5, 6.35, 0.5).arrow(0.5, 8.2, 0.5, 9.7);
    f.text(5.3, 6.6, 'prej', { cls: 'tc', anchor: 'start' }); f.text(4.2, 8.6, 'potem', { cls: 'tc', anchor: 'start' });
    f.xtick(8, 'prej').xtick(6, 'potem');
    (o.legend || []).forEach((l) => f.legend(null, l));
  } else {
    f.path(pts((x) => 9 * Math.sqrt(Math.max(0, 1 - (x / 9) ** 2)), 0, 9, 90), 'c3');
    f.path([[0, 9], [9, 0]], 'c32');
    f.dot(3, 9 * Math.sqrt(1 - 1 / 9)).dot(7, 9 * Math.sqrt(1 - 49 / 81));
    f.text(6.4, 7.2, 'izbočena', { cls: 'tc', anchor: 'start' }); f.text(3.2, 4.1, 'premica', { cls: 't', anchor: 'end' });
    f.legend(null, 'izbočena: dejavniki specializirani → oportunitetni strošek');
    f.legend(null, '   dodatne enote X narašča (krivulja je vse strmejša)');
    f.legend(null, 'premica: enako učinkoviti dejavniki → stalen op. strošek');
  }
  return f.svg();
}

function indif() {
  const f = new Fig({ qmax: 10, pmax: 10, xl: 'X', yl: 'Y', title: 'Optimalna potrošna izbira', mr: 30 });
  [[8, 'U_{1}'], [16, 'U_{2}'], [28, 'U_{3}']].forEach(([k, n]) => {
    f.fn((x) => k / x, k / 9.6, 9.6, 'c3'); f.text(9.6, k / 9.6, n, { anchor: 'start', dx: 4, dy: 4, cls: 'tc' });
  });
  f.fn((x) => 8 - x, 0, 8, 'cS');
  f.guideH(4, 4).guideV(4, 4).pt(4, 4, 'E', 8, -6).xtick(4, 'X*').ytick(4, 'Y*');
  f.legend(null, 'rdeča premica = proračunska premica (naklon −P_{X}/P_{Y})');
  f.legend(null, 'v E je premica tangenta na najvišjo dosegljivo U');
  f.legend(null, 'MRS (naklon U) = P_{X}/P_{Y} (naklon premice)');
  f.legend(null, 'vzdolž konveksne U naklon in MRS padata');
  return f.svg();
}
function twoPanel(o) {
  const f = new Fig({ qmax: 22, pmax: 11, noAxes: true, mt: 10, ml: 14, mr: 10, title: o.title });
  f.arrow(0, 0, 9.8, 0, 'ax').arrow(0, 0, 0, 10, 'ax'); f.text(9.8, 0, o.xl, { anchor: 'end', dy: 14 }); f.text(0, 10, o.yl, { anchor: 'start', dx: 4, dy: 4 });
  f.arrow(12, 0, 21.8, 0, 'ax').arrow(12, 0, 12, 10, 'ax'); f.text(21.8, 0, o.xl, { anchor: 'end', dy: 14 }); f.text(12, 10, o.yl, { anchor: 'start', dx: 4, dy: 4 });
  [3, 5.5, 8].forEach((c) => f.path([[0, c], [c, 0]], 'c3'));
  [[1.4, 1.4], [3, 3], [4.8, 4.8]].forEach(([x, y]) => f.path([[12 + x, 9.2], [12 + x, y], [21, y]], 'c3'));
  f.path([[12, 0], [12 + 7, 7 * 1]], 'gd');
  f.text(4.9, 9.4, o.t1, { cls: 'tc' }); f.text(17, 9.4, o.t2, { cls: 'tc' });
  (o.legend || []).forEach((l) => f.legend(null, l));
  return f.svg();
}
function miha() {
  const f = new Fig({ qmax: 34, pmax: 66, xl: 'sendviči', yl: 'čaji', title: 'Popolna komplementa: 1 sendvič + 3 čaji', mr: 20 });
  f.path([[0, 60], [30, 0]], 'cS'); f.text(22, 16, '4S + 2Č = 120', { cls: 'tS', anchor: 'start', dx: 4 });
  f.path([[0, 0], [21, 63]], 'gd'); f.text(20, 60, 'Č = 3S', { anchor: 'end', dx: -6 });
  [[8, 24], [12, 36], [16, 48]].forEach(([x, y], k) => f.path([[x, 64], [x, y], [33, y]], k === 1 ? 'c3' : 'c32'));
  f.guideH(36, 12).guideV(12, 36).pt(12, 36, 'E', -9, -6).xtick(12, '12').ytick(36, '36').xtick(30, '30').ytick(60, '60');
  f.legend(null, 'paket 1 S + 3 Č stane 4 + 3 · 2 = 10 € → 120/10 = 12 paketov');
  f.legend(null, 'optimum je v oglišču L-krivulje na žarku Č = 3S');
  f.legend(null, 'dražji čaj → premica se zasuče navznoter → nižja L');
  return f.svg();
}
function tina() {
  const f = new Fig({ qmax: 58, pmax: 88, xl: 'čaj', yl: 'kakav', title: 'Popolna substituta: 1 čaj = 1,5 kakava', mr: 20 });
  f.path([[0, 80], [40, 0]], 'cS'); f.text(22, 36, '3Č + 1,5K = 120', { cls: 'tS', anchor: 'start', dx: 8 });
  [50, 65, 80].forEach((c, k) => f.path([[0, c], [c / 1.5, 0]], k === 2 ? 'c3' : 'c32'));
  f.pt(0, 80, 'E', 12, 4).xtick(40, '40').ytick(80, '80');
  f.legend(null, 'indiferenčne premice: 1 Č = 1,5 K (naklon −1,5)');
  f.legend(null, 'proračunska premica: naklon −P_{Č}/P_{K} = −3/1,5 = −2');
  f.legend(null, 'MRS 1,5 < 2 → kotna rešitev: samo kakav, 120/1,5 = 80');
  return f.svg();
}
function izokv() {
  const f = new Fig({ qmax: 10, pmax: 10, xl: 'L', yl: 'K', title: 'Optimalna kombinacija dejavnikov', mr: 30 });
  f.fn((x) => 16 / x, 1.65, 9.6, 'c3'); f.text(9.6, 16 / 9.6, 'Q_{0}', { anchor: 'start', dx: 4, dy: 4, cls: 'tc' });
  f.fn((x) => 8 - x, 0, 8, 'cS'); f.text(7.2, 0.8, 'izokosta', { cls: 'tS', anchor: 'start', dx: 4, dy: -4 });
  f.guideH(4, 4).guideV(4, 4).pt(4, 4, 'E', 8, -6).xtick(4, 'L*').ytick(4, 'K*');
  f.legend(null, 'MRTS (naklon izokvante) = MP_{L}/MP_{K}');
  f.legend(null, 'v optimumu MRTS = w/r (naklon izokoste)');
  f.legend(null, '→ MP_{L}/w = MP_{K}/r');
  return f.svg();
}

/* stroški: VC = Q³/3 − 3Q² + 20Q, FC = 50 */
const MC = (q) => q * q - 6 * q + 20, AVC = (q) => q * q / 3 - 3 * q + 20, AFC = (q) => 50 / q, ATC = (q) => AVC(q) + AFC(q);
const atcMin = (() => { let b = 1, v = 1e9; for (let q = 1; q < 12; q += 0.001) if (ATC(q) < v) { v = ATC(q); b = q; } return { q: b, v }; })();
function stroski(o = {}) {
  const f = new Fig({ qmax: 10.5, pmax: 48, title: 'Krivulje stroškov', mr: 44, ml: 70 });
  f.fn(AFC, 1.2, 10.2, 'c32').fn(AVC, 0.2, 10.2, 'c4').fn(ATC, 1.6, 10.2, 'c3');
  if (o.fc) f.fn((q) => ATC(q) + 30 / q, 2.2, 10.2, 'c32');
  f.fn(MC, 0.2, 9.1, 'cS');
  if (o.supply) f.fn(MC, 4.5, 9.1, 'cS thick');
  f.text(10.2, AFC(10.2), 'AFC', { anchor: 'start', dx: 4, dy: 4 }); f.text(10.2, AVC(10.2), 'AVC', { anchor: 'start', dx: 4, dy: 6, cls: 'tc' });
  f.text(10.2, ATC(10.2), 'ATC', { anchor: 'start', dx: 4, dy: -2, cls: 'tc' }); f.text(8.9, MC(8.9), 'MC', { cls: 'tS', anchor: 'start', dx: 6, dy: 6 });
  if (o.fc) f.text(10.2, ATC(10.2) + 3, 'ATC + davek', { anchor: 'start', dx: 4, dy: -4 });
  f.guideH(13.25, 4.5).guideV(4.5, 13.25).pt(4.5, 13.25, '', 0, 0).text(4.5, 13.25, 'točka zaprtja', { dy: 15, cls: 'tc' });
  f.guideH(atcMin.v, atcMin.q).guideV(atcMin.q, atcMin.v).dot(atcMin.q, atcMin.v).text(atcMin.q, atcMin.v, 'točka preloma', { dx: -8, dy: -8, anchor: 'end', cls: 'tc' });
  f.ytick(13.25, 'AVC_{min} = 13,25').ytick(atcMin.v, 'ATC_{min} ≈ ' + num(Math.round(atcMin.v * 10) / 10)).xtick(4.5, '4,5').xtick(atcMin.q, num(Math.round(atcMin.q * 10) / 10));
  f.legend(null, 'MC = Q² − 6Q + 20, FC = 50');
  f.legend(null, 'MC seka AVC in ATC v njunih minimumih');
  f.legend(null, 'MC < povprečje → povprečje pada; MC > povprečje → narašča');
  if (o.fc) f.legend(null, 'fiksni davek dvigne le AFC in ATC; MC in AVC ostanejo');
  else f.legend(null, 'ponudba popolnega konkurenta = MC nad AVC_{min}');
  return f.svg();
}
function pkProfit() {
  // TC = 100 + 10Q + Q², P = 50
  const mc = (q) => 10 + 2 * q, atc = (q) => 100 / q + 10 + q, avc = (q) => 10 + q;
  const f = new Fig({ qmax: 27, pmax: 62, title: 'Popolni konkurent: TC = 100 + 10Q + Q²', mr: 70 });
  f.rect(0, 35, 20, 50, 'a1', 'dobiček', [10, 42.5]);
  f.fn(avc, 0.3, 26, 'c4').fn(atc, 2.4, 26, 'c3').fn(mc, 0.3, 25, 'cS');
  f.hline(50, 0, 26, 'pl').tag(26, 50, 'P = MR = AR');
  f.text(26, avc(26), 'AVC', { anchor: 'start', dx: 4, dy: 4, cls: 'tc' }); f.text(26, atc(26), 'ATC', { anchor: 'start', dx: 4, dy: -4, cls: 'tc' }); f.text(25, mc(25), 'MC', { cls: 'tS', anchor: 'start', dx: 5, dy: 10 });
  f.guideV(20, 50).dot(20, 50).dot(20, 35).guideH(35, 20).guideH(30, 10).guideV(10, 30).pt(10, 30, '', 0, 0).text(10, 30, 'točka preloma', { dy: 15, cls: 'tc' });
  f.ytick(50, '50').ytick(35, '35').ytick(30, '30').xtick(10, '10').xtick(20, '20');
  f.legend(null, 'optimum: P = MC → 10 + 2Q = 50 → Q = 20');
  f.legend('a1', 'dobiček = (50 − ATC(20) = 35) · 20 = 300');
  f.legend(null, 'točka preloma: ATC_{min} = 30 pri Q = 10');
  return f.svg();
}
function lac() {
  const L = (q) => 10 + 0.06 * (q - 11) ** 2, dL = (q) => 0.12 * (q - 11);
  const f = new Fig({ qmax: 21, pmax: 22, pmin: 6, title: 'LAC kot ovojnica kratkoročnih krivulj', mr: 44 });
  [4, 11, 17].forEach((qi, k) => { const S = (q) => L(qi) + dL(qi) * (q - qi) + 0.32 * (q - qi) ** 2; f.fn(S, qi - 5, qi + 5, 'c32'); f.text(qi, S(qi - 3.4), 'SAC_{' + (k + 1) + '}', { dy: -3 }); f.dot(qi, L(qi)); });
  f.fn(L, 0.5, 20.5, 'c3'); f.text(20.5, L(20.5), 'LAC', { cls: 'tc', anchor: 'start', dx: 4, dy: 4 });
  f.legend(null, 'LAC se od spodaj dotika vsake SAC');
  f.legend(null, '= najnižji povprečni stroški pri vsakem obsegu');
  f.legend(null, 'padajoči del: naraščajoči donosi obsega; naraščajoči: padajoči');
  return f.svg();
}
function monopol(o) {
  const { a, b, mc } = o, Qm = (a - mc) / (2 * b), Pm = a - b * Qm, Qc = (a - mc) / b;
  const f = new Fig({ qmax: a / b * 1.08, pmax: a * 1.08, title: o.title || 'Monopol', mr: 40 });
  const cs = (a - Pm) * Qm / 2, pr = (Pm - mc) * Qm, dwl = (Pm - mc) * (Qc - Qm) / 2;
  f.area([[0, a], [0, Pm], [Qm, Pm]], 'a1', 'CS', [Qm * 0.3, Pm + (a - Pm) * 0.3]);
  f.rect(0, mc, Qm, Pm, 'a3', o.profit === false ? null : 'π');
  f.area([[Qm, Pm], [Qm, mc], [Qc, mc]], 'a5', 'DWL', [Qm + (Qc - Qm) * 0.32, mc + (Pm - mc) * 0.32]);
  f.fn((q) => a - b * q, 0, a / b, 'cD').fn((q) => a - 2 * b * q, 0, a / (2 * b), 'c4');
  f.hline(mc, 0, a / b * 1.02, 'cS').tag(a / b * 1.02, mc, 'MC', 'tS');
  f.text(0.72 * a / b, 0.28 * a, 'D = AR', { cls: 'tD', anchor: 'start', dx: 6, dy: -4 }); f.text(a / (2 * b), 0, 'MR', { cls: 'tc', anchor: 'start', dx: 4, dy: -6 });
  f.guideH(Pm, Qm).guideV(Qm, Pm).dot(Qm, Pm).dot(Qm, mc).guideV(Qc, mc);
  f.ytick(a, num(a)).ytick(Pm, num(Pm)).ytick(mc, num(mc)).xtick(Qm, num(Qm)).xtick(Qc, num(Qc));
  if (o.elastic) { f.dot(a / (2 * b), a / 2).text(a / (2 * b), a / 2, '|E| = 1', { dx: 8, dy: -6, anchor: 'start', cls: 'tc' }); f.text(a / (5 * b), a - a / 5, 'elastični del', { anchor: 'start', dx: 6, dy: -2 }); }
  f.legend(null, `MR = MC → Q = ${num(Qm)}, P = ${num(Pm)} (P > MC)`);
  f.legend(null, `MR je dvakrat strmejša od D; konkurenca: P = MC → Q = ${num(Qc)}`);
  if (o.show === 'cs') f.legend('a1', `CS = ½ · ${num(a - Pm)} · ${num(Qm)} = ${num(cs)}`);
  else f.legend('a5', `mrtva izguba = ½ · ${num(Pm - mc)} · ${num(Qc - Qm)} = ${num(dwl)}`);
  if (o.elastic) f.legend(null, 'MR > 0 samo nad |E| = 1 → monopolist je na elastičnem delu');
  return f.svg();
}
function monkonk() {
  const lacF = (q) => 60 / q + q, lmc = (q) => 2 * q, D = (q) => 24 - 1.4 * q, MR = (q) => 24 - 2.8 * q, Qc = 24 / 3.4;
  const f = new Fig({ qmax: 15, pmax: 27, title: 'Monopolistična konkurenca, dolgi rok', mr: 40 });
  f.area([[5, 17], [5, 10], [Qc, D(Qc)]], 'a5', null);
  f.fn(lacF, 2.6, 14, 'c3').fn(lmc, 0.5, 12.5, 'cS').fn(D, 0, 14, 'cD').fn(MR, 0, 8.4, 'c4');
  f.text(14, lacF(14), 'LAC', { anchor: 'start', dx: 4, dy: 4, cls: 'tc' }); f.text(12.5, lmc(12.5), 'LMC', { cls: 'tS', anchor: 'start', dx: 4, dy: 8 });
  f.text(14, D(14), 'D', { cls: 'tD', anchor: 'start', dx: 4 }); f.text(8.4, MR(8.4), 'MR', { anchor: 'start', dx: 4, cls: 'tc' });
  f.guideH(17, 5).guideH(10, 5).guideV(5, 17).pt(5, 17, 'P = LAC', 34, -6).dot(5, 10);
  f.ytick(17, 'P').ytick(10, 'MC').xtick(5, 'Q*');
  f.legend(null, 'D se dotika LAC → P = LAC → ekonomski dobiček 0');
  f.legend('a5', 'a P > MC → mrtva izguba (ni kot pri popolni konkurenci)');
  return f.svg();
}
function cournot() {
  const f = new Fig({ qmax: 33, pmax: 33, xl: 'q_{1}', yl: 'q_{2}', title: 'Cournot in Stackelberg (P = 30 − Q, MC = 0)', mr: 20 });
  f.path([[0, 30], [15, 0]], 'c4'); f.path([[0, 15], [30, 0]], 'cS');
  f.text(2, 26, 'q_{1} = (30 − q_{2})/2', { anchor: 'start', dx: 6, cls: 'tc' }); f.text(24, 3, 'q_{2} = (30 − q_{1})/2', { anchor: 'start', dx: -10, dy: -8, cls: 'tS' });
  f.guideH(10, 10).guideV(10, 10).pt(10, 10, 'Cournot', 0, -9);
  f.guideH(7.5, 15).guideV(15, 7.5).pt(15, 7.5, 'Stackelberg', 30, -6);
  f.xtick(10, '10').xtick(15, '15').ytick(10, '10').ytick(7.5, '7,5');
  f.legend(null, 'Cournot: presečišče reakcijskih funkcij → q = 10, Q = 20, P = 10');
  f.legend(null, 'Stackelberg: vodja izbere točko na sledilčevi funkciji');
  f.legend(null, '→ q_{1} = 15, q_{2} = 7,5, P = 7,5');
  return f.svg();
}

/* ---------------- makro ---------------- */
function adas(o) {
  const f = new Fig({ qmax: 10, pmax: 10, xl: 'Y (BDP)', yl: 'P', title: o.title, mr: 46 });
  const lr = o.lr == null ? 5 : o.lr;
  if (lr !== false) { f.vline(lr, 0.4, 9.6, 'c3'); f.text(lr, 9.6, 'LRAS', { dy: -4, cls: 'tc' }); f.xtick(lr, 'Y*'); }
  const sras = (s) => (y) => s + 0.8 * y, ad = (d) => (y) => d - 0.8 * y;
  const lines = [];
  (o.sras || [1]).forEach((s, k, arr) => { f.fn(sras(s), 0, 10, k ? 'cS2' : 'cS'); const y = Math.min(9.6, (9.4 - s) / 0.8); f.text(y, sras(s)(y), arr.length > 1 ? 'SRAS_{' + k + '}' : 'SRAS', { cls: 'tS', anchor: 'start', dx: 5, dy: 6 }); lines.push(0); });
  (o.ad || [9]).forEach((d, k, arr) => { f.fn(ad(d), 0, 10, k ? 'cD2' : 'cD'); const y = Math.min(9.6, (d - 0.6) / 0.8); f.text(y, ad(d)(y), arr.length > 1 ? 'AD_{' + k + '}' : 'AD', { cls: 'tD', anchor: 'start', dx: 4, dy: -2 }); });
  (o.eq || []).forEach(([s, d, name]) => { const y = (d - s) / 1.6, p = s + 0.8 * y; f.guideH(p, y).guideV(y, p).pt(y, p, name, 11, -4); });
  (o.arrows || []).forEach((a) => f.arrow(...a));
  (o.legend || []).forEach((l) => f.legend(null, l));
  return f.svg();
}
function asSole() {
  const f = new Fig({ qmax: 22, pmax: 11, noAxes: true, ml: 22, mr: 10, mt: 12, title: 'Kratkoročna AS: klasiki in Keynes' });
  axes(f, 0, 0, 9.8, 10, 'Y', 'P'); axes(f, 12, 0, 21.8, 10, 'Y', 'P');
  f.vline(6, 0.5, 9, 'cS'); f.text(6, 9, 'AS', { cls: 'tS', dy: -4 });
  f.fn((y) => 9 - 0.9 * y, 1, 9.5, 'cD').fn((y) => 10.8 - 0.9 * y, 2, 9.6, 'cD2'); f.arrow(4.2, 4.4, 4.2, 6.1);
  f.text(4.9, 9.9, 'klasiki: navpična', { cls: 'tc' });
  f.hline(4, 12.5, 21.2, 'cS'); f.text(21.2, 4, 'AS', { cls: 'tS', anchor: 'end', dy: -5 });
  f.fn((y) => 8.5 - 0.9 * (y - 12), 13, 21, 'cD').fn((y) => 10.3 - 0.9 * (y - 12), 15, 21.3, 'cD2'); f.arrow(17.2, 4, 19.1, 4);
  f.text(16.9, 9.9, 'Keynes: vodoravna', { cls: 'tc' });
  f.legend(null, 'klasiki: prilagodljive cene → AD spremeni le P');
  f.legend(null, 'Keynes: toge cene in plače → AD spremeni Y');
  return f.svg();
}
function islm(o) {
  const f = new Fig({ qmax: 10, pmax: 10, xl: 'Y', yl: 'i', title: o.title, mr: 40 });
  const IS = (c) => (y) => c - 0.9 * y, LM = (c) => (y) => c + 0.9 * y;
  (o.is || [8.5]).forEach((c, k, arr) => { f.fn(IS(c), 0, 10, k ? 'cD2' : 'cD'); const y = (c - 0.8) / 0.9; f.text(y, 0.8, arr.length > 1 ? 'IS_{' + k + '}' : 'IS', { cls: 'tD', anchor: 'start', dx: 4 }); });
  if (o.trap) {
    const lm = (y) => (y < 4 ? 1.6 : 1.6 + 0.12 * (y - 4) ** 2), lm1 = (y) => (y < 5.6 ? 1.6 : 1.6 + 0.12 * (y - 5.6) ** 2);
    f.fn(lm, 0, 10, 'c4').fn(lm1, 0, 10, 'c4 dsh'); f.text(9.4, lm(9.4), 'LM_{0}', { anchor: 'end', dx: -4, dy: -2, cls: 'tc' }); f.text(10, lm1(10), 'LM_{1}', { anchor: 'start', dx: 4, cls: 'tc' });
    f.guideH(1.6, 3).guideV(3, 1.6).pt(3, 1.6, 'E', 0, -8).xtick(3, 'Y_{0} = Y_{1}');
    f.text(1.4, 1.6, 'past', { dy: 14 });
  } else {
    (o.lm || [1]).forEach((c, k, arr) => { f.fn(LM(c), 0, 10, k ? 'c32' : 'c3'); const y = Math.min(9.6, (9.4 - c) / 0.9); f.text(y, c + 0.9 * y, arr.length > 1 ? 'LM_{' + k + '}' : 'LM', { anchor: 'start', dx: 4, dy: 6, cls: 'tc' }); });
    (o.eq || []).forEach(([c1, c2, name]) => { const y = (c1 - c2) / 1.8, i = c2 + 0.9 * y; f.guideH(i, y).guideV(y, i).pt(y, i, name, 0, -9); });
  }
  (o.ticks || []).forEach(([ax, v, t]) => (ax === 'x' ? f.xtick(v, t) : f.ytick(v, t)));
  (o.legend || []).forEach((l) => f.legend(null, l));
  return f.svg();
}
function phillips() {
  const f = new Fig({ qmax: 12, pmax: 10, xl: 'u (brezposelnost)', yl: 'π', title: 'Phillipsova krivulja', mr: 40 });
  const pc = (s) => (u) => s + 12 / u;
  f.fn(pc(0), 1.6, 11.5, 'cD').fn(pc(3), 2.2, 11.5, 'cD2');
  f.text(11.5, pc(0)(11.5), 'SRPC_{0}', { cls: 'tD', anchor: 'start', dx: 4, dy: 4 }); f.text(11.5, pc(3)(11.5), 'SRPC_{1}', { cls: 'tD', anchor: 'start', dx: 4, dy: 4 });
  f.vline(6, 0.3, 9.6, 'c3'); f.text(6, 9.6, 'LRPC', { dy: -4, cls: 'tc' }); f.xtick(6, 'NAIRU');
  f.pt(6, pc(0)(6), 'A', 10, 12).pt(4, pc(0)(4), 'B', -10, -2).pt(6, pc(3)(6), 'C', 10, -2); f.arrow(4.15, pc(0)(4) + 0.2, 5.8, pc(3)(6) - 0.15);
  f.legend(null, 'kratkoročno: nižja brezposelnost ↔ višja inflacija (A → B)');
  f.legend(null, 'pričakovanja se prilagodijo → SRPC navzgor (B → C)');
  f.legend(null, 'dolgoročno: navpična pri NAIRU (le višja inflacija)');
  return f.svg();
}
function laffer() {
  const f = new Fig({ qmax: 108, pmax: 11, xl: 't (%)', yl: 'davčni prihodki', title: 'Lafferjeva krivulja', mr: 20 });
  f.fn((t) => 10 * Math.sin(Math.PI * t / 100), 0, 100, 'c3');
  f.guideV(50, 10).pt(50, 10, 't*', 0, -8).xtick(0, '0').xtick(50, 't*').xtick(100, '100');
  f.text(26, 1.6, 'normalno območje', { anchor: 'middle' }); f.text(76, 1.6, 'prepovedano', { anchor: 'middle' });
  f.legend(null, 'pri 0 % in 100 % so prihodki 0, vmes je maksimum t*');
  f.legend(null, 'nad t* višja stopnja ZNIŽA prihodke (manj obdavčljive dejavnosti)');
  return f.svg();
}
function lorenz() {
  const f = new Fig({ qmax: 108, pmax: 108, xl: '% prebivalstva', yl: '% dohodka', title: 'Lorenzova krivulja', mr: 20 });
  const L = (x) => 100 * (x / 100) ** 2.2;
  f.area([[0, 0], ...pts(L, 0, 100, 40), [100, 100]], 'a2', 'A', [55, 44]);
  f.area([...pts(L, 0, 100, 40), [100, 0]], 'a1', 'B', [78, 18]);
  f.path([[0, 0], [100, 100]], 'c32').fn(L, 0, 100, 'c3');
  f.text(38, 50, 'popolna enakost', { anchor: 'end', dx: -6 }); f.xtick(100, '100').ytick(100, '100');
  f.legend(null, 'Gini = A / (A + B): 0 = popolna enakost, 1 = popolna neenakost');
  f.legend(null, 'bolj ko je krivulja upognjena, večja je neenakost');
  return f.svg();
}
function demo() {
  const f = new Fig({ qmax: 100, pmax: 50, xl: 'čas (razvoj)', yl: '‰', title: 'Demografski prehod', mr: 20 });
  const N = (t) => (t < 45 ? 40 : t < 85 ? 40 - 28 * (t - 45) / 40 : 12), M = (t) => (t < 15 ? 38 : t < 55 ? 38 - 27 * (t - 15) / 40 : 11);
  f.area([...pts(N, 0, 100, 100), ...pts(M, 0, 100, 100).reverse()], 'a1', null);
  f.fn(N, 0, 100, 'cD', 200).fn(M, 0, 100, 'cS', 200);
  f.text(30, 40, 'natalitete', { cls: 'tD', dy: -6 }); f.text(32, M(32), 'mortalitete', { cls: 'tS', anchor: 'end', dx: -6, dy: 4 });
  [25, 50, 75].forEach((x) => f.vline(x, 0, 48, 'gd'));
  ['1', '2', '3', '4'].forEach((s, k) => f.text(12.5 + 25 * k, 46, s, { cls: 'tc' }));
  f.legend('a1', 'naravni prirast = natalitete − mortalitete');
  f.legend(null, 'najprej pade smrtnost (2: hitra rast), nato rodnost (3)');
  f.legend(null, 'konec: nizka rodnost in nizka smrtnost (4)');
  return f.svg();
}

/* ---------------- uvod: produkt, prag rentabilnosti ---------------- */
function produkt() {
  const AP = (L) => 6 * L - 0.25 * L * L, MP = (L) => 12 * L - 0.75 * L * L;
  const f = new Fig({ qmax: 18.5, pmax: 54, xl: 'L', yl: 'AP, MP', title: 'Povprečni in mejni produkt dela', mr: 40 });
  f.fn(AP, 0, 18, 'c4').fn(MP, 0, 17, 'cS');
  f.text(18, AP(18), 'AP', { anchor: 'start', dx: 4, cls: 'tc' }); f.text(5.5, MP(5.5), 'MP', { cls: 'tS', anchor: 'end', dx: -6, dy: 0 });
  f.guideV(12, 36).pt(12, 36, '', 0, 0).text(12, 36, 'AP max = MP', { dy: -8, cls: 'tc' }); f.dot(16, 0);
  f.xtick(12, 'ekstenzivna meja').xtick(16, 'intenzivna');
  f.legend(null, 'e_{L} = MP/AP');
  f.legend(null, 'ekstenzivna meja: AP je največji in MP = AP → e = 1');
  f.legend(null, 'intenzivna meja: MP = 0 → e = 0');
  return f.svg();
}
function prag(o) {
  // prikaz s pokritjem: (P − AVC) · Q raste od 0, FC je vodoravna; presečišče = prag (TR = TC)
  const { P: p, v, FC, cap } = o, m = p - v, Qbe = FC / m, qmax = cap * 1.06, sym = !!o.symbolic;
  const top = Math.max(m * cap, FC) * 1.15;
  const f = new Fig({ qmax, pmax: top, xl: 'Q', yl: 'EUR', title: 'Prag rentabilnosti', ml: sym ? 30 : 64, mr: 70 });
  f.area([[0, 0], [0, FC], [Qbe, FC]], 'a5', null);
  if (cap > Qbe) f.area([[Qbe, FC], [cap, m * cap], [cap, FC]], 'a1', null);
  f.hline(FC, 0, qmax, 'cS').fn((q) => m * q, 0, qmax, 'cD');
  f.text(qmax, FC, 'FC', { cls: 'tS', anchor: 'start', dx: 4, dy: 4 });
  f.text(qmax, Math.min(m * qmax, top * 0.97), 'pokritje', { cls: 'tD', anchor: 'start', dx: 4, dy: 4 });
  f.text(Qbe * 0.3, FC * 0.62, 'izguba', { cls: 'tc' });
  if (cap > Qbe * 1.15) f.text(Qbe + (cap - Qbe) * 0.72, FC + (m * cap - FC) * 0.3, 'dobiček', { cls: 'tc' });
  f.guideV(Qbe, FC).dot(Qbe, FC).vline(cap, 0, top * 0.98, 'gd');
  f.xtick(Qbe, sym ? 'Q_{BE}' : num(Qbe)).xtick(cap, sym ? 'zmogljivost' : num(cap)).ytick(FC, sym ? 'FC' : num(FC));
  if (o.at) { const q = cap * o.at; f.guideV(q, m * q).dot(q, m * q).xtick(q, num(q)); }
  if (sym) {
    f.legend(null, 'pokritje = (P − AVC) · Q = TR − VC');
    f.legend(null, 'prag: pokritje = FC (⇔ TR = TC) → Q_{BE} = FC / (P − AVC)');
    f.legend(null, 'proporcionalni VC → premici se sekata enkrat → en prag');
  } else {
    f.legend(null, `Q_{BE} = ${num(FC)} / (${num(p)} − ${num(v)}) = ${num(Qbe)}`);
    f.legend(null, `izkoriščenost = ${num(Qbe)} / ${num(cap)} = ${num(Math.round(Qbe / cap * 1000) / 10)} %`);
    if (o.at) { const q = cap * o.at; f.legend(null, `pri ${num(o.at * 100)} % (${num(q)}): π = ${num(m)} · ${num(q)} − ${num(FC)} = ${num(m * q - FC)}`); }
  }
  return f.svg();
}

/* ---------------- PF1 ---------------- */
function sml(o = {}) {
  const f = new Fig({ qmax: 1.9, pmax: 21, xl: 'β', yl: 'r (%)', title: 'SML: r = r_{f} + β (r_{m} − r_{f})', mr: 30 });
  f.fn((b) => 3 + 8 * b, 0, 1.8, 'c3'); f.text(1.8, 17.4, 'SML', { anchor: 'start', dx: 4, dy: 4, cls: 'tc' });
  f.guideH(11, 1).guideV(1, 11).pt(1, 11, 'M', -8, -6);
  f.ytick(3, '3 = r_{f}').ytick(11, '11 = r_{m}').xtick(1, '1');
  if (o.a) { f.pt(0.75, 8, 'A', 0, 15).guideV(0.75, 8).seg(0.75, 8, 0.75, 9, 'cS').xtick(0.75, '0,75'); }
  if (o.c) { f.pt(1.5, 17, 'C', 0, -8).guideV(1.5, 17).seg(1.5, 15, 1.5, 17, 'cD').pt(1.25, 13, 'B', 8, -6).xtick(1.5, '1,5'); }
  if (!o.a && !o.c) { f.pt(1.4, 17, 'nad SML', 0, -8).pt(1.2, 10, 'pod SML', 0, 15); }
  f.legend(null, 'tržna premija r_{m} − r_{f} = 8 % = naklon SML (pri β = 1 je r = r_{m})');
  if (o.a) f.legend(null, 'A: zahtevana 3 + 0,75 · 8 = 9 % > pričakovana 8 % → pod SML');
  if (o.c) f.legend(null, 'C: zahtevana 3 + 1,5 · 8 = 15 % < pričakovana 17 % → nad SML');
  f.legend(null, 'nad SML: podcenjena (kupi); pod SML: precenjena (prodaj)');
  return f.svg();
}
function smlX(o = {}) {
  const f = new Fig({ qmax: 1.65, pmax: 18, xl: 'β', yl: 'r (%)', title: 'Delnica Omega (β = 1,4): premiki SML', mr: 60 });
  const L = (rf, pr) => (b) => rf + pr * b, all = !o.infl && !o.prem;
  f.fn(L(2, 5), 0, 1.6, 'c3'); f.text(1.6, 10, 'osnova', { anchor: 'start', dx: 4, dy: 4 }); f.dot(1.4, 9).ytick(9, '9');
  if (o.infl || all) { f.fn(L(4, 5), 0, 1.6, 'c4'); f.text(1.6, 12, 'inflacija +2', { anchor: 'start', dx: 4, dy: 4 }); f.dot(1.4, 11).ytick(11, '11').ytick(4, '4'); }
  if (o.prem || all) { f.fn(L(2, 7.5), 0, 1.6, 'c5'); f.text(1.6, 14, 'premija +2,5', { anchor: 'start', dx: 4, dy: 4 }); f.dot(1.4, 12.5).ytick(12.5, '12,5'); }
  if (all) { f.fn(L(4, 7.5), 0, 1.6, 'cS'); f.text(1.6, 16, 'oboje', { anchor: 'start', dx: 4, dy: 4, cls: 'tS' }); f.dot(1.4, 14.5).ytick(14.5, '14,5'); }
  f.vline(1.4, 0, 17, 'gd'); f.ytick(2, '2').xtick(1.4, '1,4');
  if (o.infl || all) f.legend(null, 'inflacija: r_{f} in r_{m} +2 → SML vzporedno navzgor (naklon enak)');
  if (o.prem || all) f.legend(null, 'premija +2,5: SML strmejša, učinek = β · 2,5 = 3,5 o. t.');
  if (all) f.legend(null, 'oboje: 4 + 1,4 · 7,5 = 14,5 % (+5,5 o. t.)');
  return f.svg();
}
function diverz() {
  const f = new Fig({ qmax: 31, pmax: 42, xl: 'število delnic', yl: 'σ portfelja', title: 'Razpršitev (diverzifikacija)', mr: 20 });
  const s = (n) => Math.sqrt(15 * 15 + 35 * 35 / n);
  f.area([...pts(s, 1, 30, 60), [30, 15], [1, 15]], 'a1', 'nesistematično', [11, 21]);
  f.rect(0, 0, 30, 15, 'a2', 'sistematično (tržno)', [15, 7.5]);
  f.fn(s, 1, 30, 'c3').hline(15, 0, 30, 'pl dsh');
  f.legend('a1', 'odpravimo z razpršitvijo → trg ga ne nagradi');
  f.legend('a2', 'ostane (merimo ga z beto) → za to se zahteva premija');
  return f.svg();
}
function korel() {
  const f = new Fig({ qmax: 27, pmax: 16, xl: 'σ (%)', yl: 'E(r) (%)', title: 'Portfelj dveh delnic pri različni korelaciji', mr: 34 });
  const A = { s: 10, e: 6 }, B = { s: 24, e: 14 };
  const port = (rho) => range(0, 1, 50).map((w) => { const sd = Math.sqrt((w * B.s) ** 2 + ((1 - w) * A.s) ** 2 + 2 * rho * w * (1 - w) * A.s * B.s); return [sd, A.e + w * (B.e - A.e)]; });
  f.path(port(1), 'c3').path(port(0.3), 'c4').path(port(-1), 'cS');
  f.pt(A.s, A.e, 'A', 9, 12).pt(B.s, B.e, 'B', 9, -2);
  f.text(17, 10.5, 'ρ = 1', { anchor: 'start', dx: 6, cls: 'tc' }); f.text(12.5, 9.5, 'ρ = 0,3', { anchor: 'end', dx: -4 }); f.text(1.2, 8.7, 'ρ = −1', { cls: 'tS', anchor: 'start' });
  f.legend(null, 'E(r) portfelja je vedno tehtano povprečje');
  f.legend(null, 'σ je pri ρ < 1 manjši od tehtanega povprečja σ');
  f.legend(null, 'nižja korelacija → večja korist razpršitve');
  return f.svg();
}
function npv() {
  // A: −1320, 5 let po 400; B: −500, 5 let po 200 → profila se sekata pri 7 %
  const ann = (r) => (1 - (1 + r) ** -5) / r;
  const nA = (r) => -1320 + 400 * ann(r), nB = (r) => -500 + 200 * ann(r);
  const root = (fn) => { let lo = 0.001, hi = 0.9; for (let k = 0; k < 80; k++) { const m = (lo + hi) / 2; if (fn(m) > 0) lo = m; else hi = m; } return lo; };
  const irrA = root(nA), irrB = root(nB), x = root((r) => nA(r) - nB(r));
  const f = new Fig({ qmax: 33, pmax: 760, pmin: -380, xl: 'r (%)', yl: 'NSV', title: 'Profila NSV izključujočih projektov', mr: 50 });
  f.hline(0, 0, 32, 'ax');
  f.fn((r) => nA(r / 100), 0.1, 32, 'c4').fn((r) => nB(r / 100), 0.1, 32, 'cS');
  f.text(32, nA(0.32), 'A (večji)', { anchor: 'start', dx: 4, dy: 4, cls: 'tc' }); f.text(32, nB(0.32), 'B (manjši)', { anchor: 'start', dx: 4, dy: -2, cls: 'tS' });
  f.dot(irrA * 100, 0).dot(irrB * 100, 0).guideV(x * 100, nA(x)).pt(x * 100, nA(x), 'križanje', 34, -4);
  f.guideV(5, nA(0.05)).dot(5, nA(0.05)).dot(5, nB(0.05));
  f.text(irrA * 100, 0, 'IRR_{A}', { dy: 14 }); f.text(irrB * 100, 0, 'IRR_{B}', { dy: 14 }); f.xtick(5, '5 %').xtick(x * 100, num(Math.round(x * 1000) / 10) + ' %');
  f.legend(null, `IRR_{A} ≈ ${num(Math.round(irrA * 1000) / 10)} % < IRR_{B} ≈ ${num(Math.round(irrB * 1000) / 10)} %`);
  f.legend(null, `pri 5 %: NSV_{A} ≈ ${num(Math.round(nA(0.05)))} > NSV_{B} ≈ ${num(Math.round(nB(0.05)))}`);
  f.legend(null, 'pod 7 % ima višjo NSV projekt A (nižja IRR) → odloča NSV');
  return f.svg();
}
function donosnost() {
  const f = new Fig({ qmax: 11, pmax: 4.2, pmin: 1.6, xl: 'zapadlost (let)', yl: '%', title: 'Krivulja donosnosti', mr: 60 });
  const T = [0.25, 1, 2, 5, 10], up = [2.58, 2.7, 2.85, 3.1, 3.39], inv = [3.9, 3.6, 3.35, 3.05, 2.9];
  f.path(T.map((t, k) => [t, up[k]]), 'cD').path(T.map((t, k) => [t, inv[k]]), 'cS2');
  T.forEach((t, k) => f.dot(t, up[k])); f.text(10, 3.39, 'normalna', { cls: 'tD', anchor: 'start', dx: 5, dy: 4 }); f.text(10, 2.9, 'obrnjena', { cls: 'tS', anchor: 'start', dx: 5, dy: 4 });
  f.xtick(0.25, '¼').xtick(2, '2').xtick(5, '5').xtick(10, '10').ytick(2.58, '2,58').ytick(3.39, '3,39');
  f.legend(null, 'normalna (15. 10. 2026): 3 mes. 2,58 %, 10 let 3,39 %');
  f.legend(null, 'obrnjena: kratkoročne mere višje od dolgoročnih');
  f.legend(null, '→ trg pričakuje nižje obrestne mere (pogosto pred recesijo)');
  return f.svg();
}

/* ---------------- MPSP ---------------- */
function mreza() {
  const f = new Fig({ qmax: 100, pmax: 40, noAxes: true, ml: 8, mr: 8, mt: 8, mb: 8, h: 150, title: 'Mrežni diagram: kritična pot' });
  const box = (x, y, t, d, crit) => {
    f.rect(x - 7.5, y - 5.5, x + 7.5, y + 5.5, crit ? 'a2' : 'a0', null);
    f.text(x, y, t, { cls: 'tv', dy: -1 }); f.text(x, y, d + ' min', { dy: 11 });
  };
  const L = (x1, y1, x2, y2, crit) => f.arrow(x1, y1, x2, y2, crit ? 'cS' : 'ar');
  box(12, 32, 'O1', 20, 0); box(45, 32, 'O2', 30, 0); box(12, 8, 'O3', 25, 1); box(45, 8, 'O4', 35, 1); box(85, 20, 'O5', 15, 1);
  L(19.5, 32, 37.5, 32, 0); L(19.5, 8, 37.5, 8, 1); L(52.5, 31, 77.5, 22, 0); L(52.5, 9, 77.5, 18, 1);
  f.legend('a2', 'kritična pot O3→O4→O5: 25 + 35 + 15 = 75 min');
  f.legend('a0', 'O1→O2→O5: 65 min → rezerva 10 min');
  f.legend(null, 'daljši O1 ali O2 podaljša TPČ šele, ko preseže rezervo');
  return f.svg();
}
function dom() {
  const f = new Fig({ qmin: 0, qmax: 6200, pmin: 0, pmax: 330000, xl: 'Q (kosov na leto)', yl: 'TC', title: 'Ohišje baterije: nakup ali lastna izdelava', ml: 56, mr: 74 });
  const N = (q) => 52 * q, R = (q) => 24000 + 36 * q, A = (q) => 90000 + 21 * q;
  f.fn(N, 0, 6000, 'cS').fn(R, 0, 6000, 'c4').fn(A, 0, 6000, 'cD');
  f.path([[0, N(0)], [1500, N(1500)]], 'cS thick').path([[1500, R(1500)], [4400, R(4400)]], 'c4 thick').path([[4400, A(4400)], [6000, A(6000)]], 'cD thick');
  f.text(6000, N(6000), 'nakup', { anchor: 'start', dx: 4, dy: 0, cls: 'tS' }); f.text(6000, R(6000), 'ročna', { anchor: 'start', dx: 4, dy: 2, cls: 'tc' }); f.text(6000, A(6000), 'celica', { anchor: 'start', dx: 4, dy: 10, cls: 'tD' });
  f.guideV(1500, N(1500)).guideV(4400, R(4400)).dot(1500, N(1500)).dot(4400, R(4400));
  f.xtick(1500, '1.500').xtick(4400, '4.400').ytick(90000, '90.000').ytick(24000, '24.000');
  f.legend(null, 'TC = FC + AVC · Q (FC 0 / 24.000 / 90.000; AVC 52 / 36 / 21)');
  f.legend(null, 'Q < 1.500: nakup; 1.500–4.400: ročna izdelava; Q > 4.400: celica');
  f.legend(null, 'prelomna točka = razlika FC / razlika AVC');
  return f.svg();
}

function zamenjava() {
  const yrs = [1, 2, 3, 4, 5], inv = [10, 9, 8.33, 7.75, 7.2], vzd = [2, 2.5, 3.33, 4.5, 6], tot = [12, 11.5, 11.67, 12.25, 13.2];
  const f = new Fig({ qmax: 5.6, pmax: 15, xl: 'leta', yl: 'AC (tisoč €)', title: 'Dostavni kombi: kdaj ga zamenjati', mr: 64 });
  const line = (arr, cls, name, dy = 4) => { f.path(yrs.map((y, k) => [y, arr[k]]), cls); yrs.forEach((y, k) => f.dot(y, arr[k])); f.text(5, arr[4], name, { anchor: 'start', dx: 6, dy, cls: cls === 'c3' ? 'tc' : 't' }); };
  line(inv, 'c4', 'investicija'); line(vzd, 'cS', 'vzdrževanje'); line(tot, 'c3', 'skupaj AC', -2);
  f.guideV(2, 11.5).pt(2, 11.5, '11,5 (min)', 0, -9);
  yrs.forEach((y) => f.xtick(y, String(y)));
  f.legend(null, 'AC = (40 − preostala vr.)/n + vzdrževanje/n');
  f.legend(null, 'investicija na leto pada, vzdrževanje raste → oblika U');
  f.legend(null, 'najnižji AC po 2 letih (11,5) → takrat zamenjamo');
  return f.svg();
}

function hamburger() {
  const f = new Fig({ qmin: 0, qmax: 100000, pmin: 0, pmax: 250000, xl: 'Q (kav na leto)', yl: '€', title: 'Kavarna: prelomna točka', ml: 60, mr: 74 });
  const TR = (q) => 2.4 * q, TC = (q) => 84000 + 0.9 * q;
  f.fn(TR, 0, 95000, 'cS').fn(TC, 0, 95000, 'c4');
  f.text(95000, TR(95000), 'prihodki', { anchor: 'start', dx: 4, dy: 0, cls: 'tS' }); f.text(95000, TC(95000), 'stroški', { anchor: 'start', dx: 4, dy: 8, cls: 'tc' });
  f.guideV(56000, TR(56000)).dot(56000, TR(56000)).guideV(76000, TR(76000)).dot(76000, TR(76000)).dot(76000, TC(76000));
  f.xtick(56000, '56.000').xtick(76000, '76.000').ytick(84000, '84.000');
  f.legend(null, 'prelomna točka: 84.000 / (2,40 − 0,90) = 56.000 kav');
  f.legend(null, 'za 30.000 € dobička: (84.000 + 30.000) / 1,5 = 76.000 kav');
  f.legend(null, 'razdalja med premicama desno od prelomne točke = dobiček');
  return f.svg();
}

const figs = {
  'm-ppf': ppf({ xl: 'dobrina X', yl: 'dobrina Y', title: 'Transformacijska krivulja' }),
  'm-ppf-zasuk': ppf({ xl: 'stanovanja', yl: 'računalniki', title: 'Zasuk transformacijske krivulje', zasuk: true, legend: ['manj gradbenih delavcev → največ stanovanj pade', 'nova programska oprema → največ računalnikov zraste'] }),
  'm-d-desno': shiftFig({ s0: 1, d0: 9, d1: 11, arrowD: true, title: 'Povpraševanje se premakne v desno', legend: ['večji dohodek (normalna dobrina) → D desno', 'pri P_{0} presežek povpraševanja → P in Q narasteta'] }),
  'm-s-desno': shiftFig({ s0: 1, s1: -1, d0: 9, arrowS: true, title: 'Premik ponudbe v desno', legend: ['necenovni dejavnik (cenejše surovine, tehnologija) → S desno', 'sprememba lastne cene = gibanje PO krivulji, ne premik'] }),
  'm-s-levo-d-desno': shiftFig({ s0: 1, s1: 3, d0: 9, d1: 11, arrowS: true, arrowD: true, title: 'S levo in D desno hkrati', legend: ['oba premika dvigneta ceno → P zagotovo naraste', 'S levo zmanjša Q, D desno ga poveča → Q nedoločena', '(tu sta premika enako velika, zato Q ostane enaka)'] }),
  'm-maxcena': priceControl({ p: 3, name: 'P_{max}', gap: 'presežek povpraševanja', title: 'Maksimalna cena', leg: 'P_{max} < P_{0}: Q_{D} > Q_{S} → primanjkljaj (vrste, črni trg)' }),
  'm-mincena': priceControl({ p: 7, name: 'P_{min}', gap: 'presežek ponudbe', title: 'Minimalna cena', leg: 'P_{min} > P_{0}: Q_{S} > Q_{D} → presežek (npr. brezposelnost pri min. plači)' }),
  'm-trosarina': trosarina(),
  'm-elast-400': ELAST_400,
  'm-elast-lin': ELAST_LIN,
  'm-elast-40': ELAST_40,
  'm-indif': indif(),
  'm-subst-kompl': twoPanel({ xl: 'X', yl: 'Y', t1: 'popolna substituta', t2: 'popolna komplementa', title: 'Oblike indiferenčnih krivulj', legend: ['substituta: premice, MRS je konstantna', 'komplementa: L-oblika, optimum v oglišču (na žarku)'] }),
  'm-izokv-oblike': twoPanel({ xl: 'L', yl: 'K', t1: 'popolni substituti', t2: 'popolni komplementi', title: 'Oblike izokvant', legend: ['Q = aK + bL: premica, MRTS = b/a je konstantna', 'stalno razmerje dejavnikov: izokvanta v obliki L'] }),
  'm-miha': miha(),
  'm-tina': tina(),
  'm-izokv': izokv(),
  'm-stroski': stroski({ supply: true }),
  'm-stroski-fc': stroski({ fc: true }),
  'm-pk-profit': pkProfit(),
  'm-lac': lac(),
  'm-monopol': monopol({ a: 100, b: 2, mc: 20, elastic: true, title: 'Monopol: P = 100 − 2Q, MC = 20' }),
  'm-monopol-dwl': monopol({ a: 40, b: 0.2, mc: 4, title: 'Monopol: P = 40 − Q/5, MC = 4' }),
  'm-monopol-cs': monopol({ a: 150, b: 0.5, mc: 30, show: 'cs', title: 'Monopol: P = 150 − Q/2, MC = 30' }),
  'm-monkonk': monkonk(),
  'm-cournot': cournot(),
  'mk-adas': adas({ title: 'Agregatna ponudba in povpraševanje', sras: [1], ad: [9], eq: [[1, 9, 'E']], legend: ['kratkoročno: SRAS narašča (toge plače in cene)', 'dolgoročno: LRAS navpična pri potencialnem BDP Y*', '→ sprememba AD dolgoročno vpliva le na P'] }),
  'mk-as-sole': asSole(),
  'mk-stagflacija': adas({ title: 'Stagflacija: SRAS se premakne levo', sras: [1, 3], ad: [9], eq: [[1, 9, 'E_{0}'], [3, 9, 'E_{1}']], arrows: [[6.6, 6.3, 5.4, 7.3]], lr: false, legend: ['negativen šok ponudbe (npr. dražja nafta) → SRAS levo', 'P naraste IN Y pade hkrati = stagflacija'] }),
  'mk-ad-levo': adas({ title: 'Restriktivna politika: AD levo', sras: [1], ad: [9, 7], eq: [[1, 9, 'E_{0}'], [1, 7, 'E_{1}']], arrows: [[7.4, 3.1, 6.2, 3.1]], lr: false, legend: ['manj denarja / višje obresti / višji davki → AD levo', 'P pade (nižja inflacija), a tudi Y pade'] }),
  'mk-ad-dolg': adas({ title: 'Inflacijska vrzel in prilagoditev', sras: [1, 3.4], ad: [9, 11.4], lr: 5, eq: [[1, 9, 'E_{0}'], [1, 11.4, 'E_{1}'], [3.4, 11.4, 'E_{2}']], legend: ['AD desno: E_{0} → E_{1}, Y nad Y* (inflacijska vrzel)', 'plače rastejo → SRAS levo: E_{1} → E_{2}', 'dolgoročno spet Y*, a pri višjih cenah'] }),
  'mk-islm': islm({ title: 'IS-LM: ekspanzivna monetarna politika', is: [8.5], lm: [1, -0.8], eq: [[8.5, 1, 'E_{0}'], [8.5, -0.8, 'E_{1}']], legend: ['IS: ravnovesje trga blaga (S = I), padajoča', 'LM: ravnovesje trga denarja, naraščajoča', 'več denarja → LM desno → i pade, Y zraste'] }),
  'mk-islm-mix': islm({ title: 'IS-LM: fiskalna + monetarna ekspanzija', is: [8, 9.8], lm: [1, -0.8], eq: [[8, 1, 'E_{0}'], [9.8, -0.8, 'E_{1}']], legend: ['IS desno (fiskalna) bi sama dvignila i (izrinjanje)', 'LM desno (monetarna) ta dvig izniči', '→ Y zraste pri enaki obrestni meri'] }),
  'mk-likvidnostna': islm({ title: 'Likvidnostna past', is: [4.3], trap: true, legend: ['pri zelo nizki i je povpraševanje po denarju popolnoma elastično', '→ LM je vodoravna; več denarja (LM_{1}) ne zniža i', 'Y se ne spremeni: monetarna politika je neučinkovita'] }),
  'mk-phillips': phillips(),
  'mk-laffer': laffer(),
  'mk-lorenz': lorenz(),
  'mk-demo': demo(),
  'u-produkt': produkt(),
  'u-prag': prag({ P: 8.5, v: 7, FC: 45000, cap: 90000, symbolic: true }),
  'u-prag-60k': prag({ P: 12, v: 9, FC: 54000, cap: 60000 }),
  'u-prag-25k': prag({ P: 15, v: 11, FC: 80000, cap: 25000 }),
  'u-prag-120k': prag({ P: 7000, v: 5000, FC: 160000000, cap: 120000 }),
  'u-prag-150k': prag({ P: 40, v: 25, FC: 450000, cap: 150000, at: 0.7 }),
  'u-prag-40k': prag({ P: 300, v: 240, FC: 1800000, cap: 40000 }),
  'pf-sml': sml(),
  'pf-sml-a': sml({ a: true }),
  'pf-sml-c': sml({ c: true }),
  'pf-sml-x': smlX(),
  'pf-sml-infl': smlX({ infl: true }),
  'pf-sml-prem': smlX({ prem: true }),
  'pf-diverz': diverz(),
  'pf-korel': korel(),
  'pf-npv': npv(),
  'pf-donosnost': donosnost(),
  'mp-mreza': mreza(),
  'mp-dom': dom(),
  'mp-zamenjava': zamenjava(),
  'mp-hamburger': hamburger(),
};

const A = (subj, list) => list.map(([q, fig, o]) => ({ subj, q, fig, ...(o || {}) }));
const attach = [
  ...A('mikro', [
    ['Zakaj je transformacijska krivulja izbočena', 'm-ppf'],
    ['Država proizvaja sir in jogurt; vsi proizvodni dejavniki so pri obeh', 'm-ppf'],
    ['Del gradbenih delavcev se izseli, nova programska oprema pa poveča', 'm-ppf-zasuk'],
    ['Kaj povzroči premik (ne gibanje po) krivulje ponudbe', 'm-s-desno'],
    ['Ob povečanju razpoložljivega dohodka', 'm-d-desno'],
    ['Kaj povzroči predpisana maksimalna cena', 'm-maxcena'],
    ['Kaj je primer predpisane minimalne cene?', 'm-mincena'],
    ['Od česa je odvisen delež trošarine', 'm-trosarina'],
    ['Ali je pomembno, ali trošarino', 'm-trosarina'],
    ['Qd = 286 − 15Pd, Qs = 86 + 25Ps', 'm-trosarina'],
    ['Suša zmanjša pridelek krompirja, hkrati pa zaradi priljubljenosti', 'm-s-levo-d-desno'],
    ['Trg medu: bolezen čebel zmanjša število panjev', 'm-s-levo-d-desno'],
    ['Povpraševanje Qd = 400 − 4Pd.', 'm-elast-400'],
    ['Za padajočo premico povpraševanja Q = a − bP velja', 'm-elast-lin'],
    ['Inverzno povpraševanje P = 40 − 0,5Q.', 'm-elast-40'],
    ['Kaj izraža mejna stopnja nadomestljivosti (MRS)?', 'm-indif'],
    ['Kaj velja v optimalni potrošni izbiri', 'm-indif'],
    ['Kaj se dogaja z MRS, ko se pomikamo navzdol po običajni konveksni', 'm-indif'],
    ['Kakšne so indiferenčne krivulje za popolna substituta?', 'm-subst-kompl'],
    ['Miha k vsakemu sendviču vedno popije tri skodelice čaja', 'm-miha'],
    ['Miha (1 sendvič + 3 čaji, popolna komplementa)', 'm-miha'],
    ['Tina pije čaj in kakav; za dodaten čaj', 'm-tina'],
    ['Čemu je enaka mejna stopnja tehnične nadomestljivosti', 'm-izokv'],
    ['Kakšna je izokvanta pri popolni nadomestljivosti', 'm-izokv-oblike', { expl: 'Pri popolni nadomestljivosti (Q = aK + bL) je izokvanta premica s konstantno MRTS = b/a. Pri stalnem razmerju dejavnikov (popolni komplementi) je izokvanta v obliki črke L.' }],
    ['Kateri pogoj velja v optimalni kombinaciji dejavnikov?', 'm-izokv'],
    ['Občina podjetju zaračuna letno takso v enakem znesku', 'm-stroski-fc'],
    ['Popolni konkurent posluje pri P = ATCmin. Država nato uvede pavšalni', 'm-stroski-fc'],
    ['Podjetje opazi, da povprečni variabilni stroški še padajo', 'm-stroski'],
    ['Kje mejni stroški sekajo povprečne celotne stroške?', 'm-stroski'],
    ['Pri kateri ceni je popolnemu konkurentu vseeno, ali proizvaja', 'm-stroski'],
    ['AVCmin < P < ATCmin.', 'm-stroski'],
    ['Kaj je kratkoročna krivulja ponudbe popolnega konkurenta?', 'm-stroski'],
    ['MC = Q² − 6Q + 20, FC = 50.', 'm-stroski'],
    ['Kaj je krivulja LAC?', 'm-lac'],
    ['Kakšna je krivulja povpraševanja za posamezno popolnokonkurenčno', 'm-pk-profit'],
    ['TC = 100 + 10Q + Q². Pri kateri ceni', 'm-pk-profit'],
    ['Popolni konkurent: TC = 100 + 10Q + Q², P = 50.', 'm-pk-profit'],
    ['Katera trditev o monopolistu drži?', 'm-monopol'],
    ['Na katerem delu povpraševanja proizvaja monopolist?', 'm-monopol'],
    ['Povpraševanje je premica, mejni stroški so stalni', 'm-monopol'],
    ['P = 100 − 2Q, MC = 20.', 'm-monopol'],
    ['Monopolist: Q = 200 − 5P, VC = 4Q, FC = 150.', 'm-monopol-dwl'],
    ['Monopolist: Q = 300 − 2P, ATC = 30 + 80/Q.', 'm-monopol-cs'],
    ['Kakšen je izid na trgu z monopolistično konkurenco, ko se vstopanje', 'm-monkonk'],
    ['Cournot: P = 30 − Q', 'm-cournot'],
    ['Stackelberg: P = 30 − Q', 'm-cournot'],
  ]),
  ...A('makro', [
    ['Kaj meri Ginijev koeficient?', 'mk-lorenz'],
    ['Kakšna je dolgoročna krivulja agregatne ponudbe', 'mk-adas'],
    ['Kako je videti kratkoročna krivulja agregatne ponudbe pri klasikih', 'mk-as-sole'],
    ['Kaj je stagflacija?', 'mk-stagflacija'],
    ['Kaj stori centralna banka ob inflaciji?', 'mk-ad-levo'],
    ['Banke morajo po novem v obveznih rezervah držati večji delež vlog', 'mk-ad-levo'],
    ['Katera kombinacija politik zniža visoko inflacijo?', 'mk-ad-levo'],
    ['Gospodarstvo že deluje na ravni potencialnega BDP, vlada pa močno poveča izdatke.', 'mk-ad-dolg'],
    ['Centralna banka v recesiji poveča ponudbo denarja.', 'mk-islm'],
    ['Kaj predstavlja IS krivulja v modelu IS-LM?', 'mk-islm'],
    ['Kaj predstavljata krivulji IS in LM?', 'mk-islm'],
    ['Podjetja so zelo občutljiva na obrestno mero, država pa je v recesiji.', 'mk-islm-mix'],
    ['Kaj je likvidnostna past?', 'mk-likvidnostna'],
    ['Kaj prikazuje kratkoročna Phillipsova krivulja?', 'mk-phillips'],
    ['Kakšna je Phillipsova krivulja kratkoročno in dolgoročno?', 'mk-phillips'],
    ['Kaj je NAIRU', 'mk-phillips'],
    ['Kaj prikazuje Lafferjeva krivulja?', 'mk-laffer'],
    ['Kaj je demografska tranzicija?', 'mk-demo'],
    ['Zakaj je monopol alokacijsko neučinkovit?', 'm-monopol'],
    ['Trošarino formalno plača prodajalec, a cena za kupce zraste', 'm-trosarina'],
  ]),
  ...A('uvod', [
    ['Koliko je elastičnost produkta glede na faktor v njegovi ekstenzivni meji?', 'u-produkt'],
    ['Kako se gibljejo povprečni fiksni stroški (AFC)', 'm-stroski'],
    ['Kakšna je povezava med MC in AC?', 'm-stroski'],
    ['Kaj predstavlja optimalni obseg, ko je P = AVCmin?', 'm-stroski'],
    ['Popolni konkurent proizvaja obseg, pri katerem je P = MC', 'm-stroski'],
    ['Kje je optimalni obseg poslovanja?', 'm-pk-profit'],
    ['Kaj je prag rentabilnosti (točka preloma)?', 'u-prag'],
    ['Koliko pragov rentabilnosti ima podjetje pri proporcionalnih', 'u-prag'],
    ['Kateri je obrazec za prag rentabilnosti', 'u-prag'],
    ['Kako podjetje zniža prag rentabilnosti?', 'u-prag'],
    ['Zmogljivost je 60.000 izdelkov, P = 12 EUR', 'u-prag-60k'],
    ['Zmogljivost je 25.000 izdelkov, P = 15 EUR', 'u-prag-25k'],
    ['Zmogljivost je 150.000 enot, P = 40 EUR', 'u-prag-150k'],
    ['Zmogljivost je 40.000 enot, P = 300 EUR', 'u-prag-40k'],
  ]),
  ...A('pf1', [
    ['Kaj je krivulja donosnosti in kaj je obrnjena krivulja?', 'pf-donosnost'],
    ['Katero tveganje lahko z diverzifikacijo', 'pf-diverz'],
    ['Za kaj vlagatelji z dobro razpršenim portfeljem', 'pf-diverz'],
    ['Kako vpliva nižja korelacija med delnicama', 'pf-korel'],
    ['Kaj je tržna premija za tveganje?', 'pf-sml'],
    ['Kaj prikazuje premica trga vrednostnih papirjev (SML)?', 'pf-sml'],
    ['Po CAPM ocenjujete delnico A', 'pf-sml-a'],
    ['Po CAPM ocenjujete delnico C', 'pf-sml-c'],
    ['Investitor ima dobro razpršeno premoženje. Za katero tveganje', 'pf-sml'],
    ['Kaj se zgodi s SML, če se pričakovana inflacija', 'pf-sml-infl'],
    ['Omega (β 1,4; rf 2 %; rm 7 %): vlagatelji pričakujejo', 'pf-sml-infl'],
    ['Omega (β 1,4; rf 2 %; rm 7 %): vlagatelji postanejo', 'pf-sml-prem'],
    ['Omega (β 1,4; rf 2 %; rm 7 %, zahtevana donosnost 9 %)', 'pf-sml-x'],
    ['Projekta A in B se medsebojno izključujeta in se razlikujeta po obsegu', 'pf-npv'],
  ]),
  ...A('mpsp', [
    ['Izdelava kolesarske prikolice: veji O1', 'mp-mreza'],
    ['Kolesarska prikolica: poti O1-O2-O5', 'mp-mreza'],
    ['Ohišje baterije', 'mp-dom'],
    ['Dostavni kombi', 'mp-zamenjava'],
    ['Kavarna ob avtobusni postaji', 'mp-hamburger'],
  ]),
];

module.exports = { figs, attach };
