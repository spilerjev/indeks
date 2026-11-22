/* MPSP (mpsp/k1): lastni grafi za predelane primere v zapiskih. Številke ustrezajo besedilu v out/mpsp.json
   (preverja out/mpsp-check.js). Slog kot figures/*.js (razredi cD, cS, a1 …). */
const { Fig, num } = require('../lib');

const r1 = (x) => Math.round(x * 10) / 10;

/* ---- Spider diagram: Besedica proti klasični jezikovni šoli (lestvica 1–5, rob = najugodneje za stranko) ---- */
const SPIDER = {
  dims: [['Časovna', 'fleksibilnost'], ['Začetni strošek', '(učni paket)'], ['Cena', 'naročnine'], ['Govorna praksa', 'v živo'], ['Lokacijska', 'priročnost']],
  bes: [5, 3, 4, 3, 5],
  sola: [2, 4, 2, 5, 2],
};
function spider() {
  const R = 1.05, n = SPIDER.dims.length;
  const f = new Fig({ qmin: -2.2, qmax: 2.2, pmin: -1.45, pmax: 1.55, noAxes: true, ml: 10, mr: 10, mt: 10, mb: 10, h: 252, title: 'Spider diagram: Besedica in klasična jezikovna šola' });
  const ang = (k) => Math.PI / 2 - 2 * Math.PI * k / n;
  const pt = (k, v) => [R * v / 5 * Math.cos(ang(k)), R * v / 5 * Math.sin(ang(k))];
  for (let lv = 1; lv <= 5; lv++) for (let k = 0; k < n; k++) f.seg(...pt(k, lv), ...pt((k + 1) % n, lv), 'gd');
  for (let k = 0; k < n; k++) f.seg(0, 0, ...pt(k, 5), 'gd');
  const poly = (vals) => vals.map((v, k) => pt(k, v));
  f.area(poly(SPIDER.sola), 'a1', null).path([...poly(SPIDER.sola), pt(0, SPIDER.sola[0])], 'cD');
  f.area(poly(SPIDER.bes), 'a2', null).path([...poly(SPIDER.bes), pt(0, SPIDER.bes[0])], 'cS');
  SPIDER.bes.forEach((v, k) => f.dot(...pt(k, v)));
  SPIDER.dims.forEach(([a, b], k) => {
    const [x, y] = pt(k, 5.9), c = Math.cos(ang(k));
    const anchor = Math.abs(c) < 0.2 ? 'middle' : c > 0 ? 'start' : 'end';
    const dy = y > 0.9 ? -10 : y < -0.5 ? 6 : 0;
    f.text(x, y, a, { anchor, dy }).text(x, y, b, { anchor, dy: dy + 11 });
  });
  f.text(0, 0, '1–5', { dy: 4, cls: 'tc' });
  f.legend('a2', 'Besedica (spletna jezikovna šola): 5 / 3 / 4 / 3 / 5');
  f.legend('a1', 'klasična jezikovna šola: 2 / 4 / 2 / 5 / 2');
  f.legend(null, 'zmagovalni dejavniki Besedice: čas, lokacija (+ cena)');
  f.legend(null, 'kvalifikacijski: govorna praksa, začetni strošek');
  return f.svg();
}

/* ---- Mizarska delavnica: mrežni diagram, kritična pot in ozko grlo ---- */
const MIZ = { O: { O1: 25, O2: 35, O3: 20, O4: 30, O5: 40 }, dan: 480 };
function mizarska() {
  const O = MIZ.O, crit = O.O1 + O.O2 + O.O4 + O.O5, rez = O.O2 - O.O3;
  const W = { I: O.O1 + O.O2, II: O.O3 + O.O4, III: O.O5 };
  const f = new Fig({ qmax: 100, pmax: 40, noAxes: true, ml: 8, mr: 8, mt: 8, mb: 8, h: 150, title: 'Mizarska delavnica: kritična pot in ozko grlo' });
  const box = (x, y, t, d, crit, who) => {
    f.rect(x - 7.5, y - 5.5, x + 7.5, y + 5.5, crit ? 'a2' : 'a0', null);
    f.text(x, y, t, { cls: 'tv', dy: -1 }); f.text(x, y, d + ' min', { dy: 11 });
    f.text(x, y + 5.5, who, { cls: 'tc', dy: -4 });
  };
  const L = (x1, y1, x2, y2, c) => f.arrow(x1, y1, x2, y2, c ? 'cS' : 'ar');
  box(9, 20, 'O1', O.O1, 1, 'del. I'); box(37, 32, 'O2', O.O2, 1, 'del. I'); box(37, 8, 'O3', O.O3, 0, 'del. II');
  box(64, 20, 'O4', O.O4, 1, 'del. II'); box(90, 20, 'O5', O.O5, 1, 'del. III');
  L(16.5, 22, 29, 31, 1); L(16.5, 18, 29, 9, 0); L(44.5, 31, 56, 22, 1); L(44.5, 9, 56, 18, 0); L(71.5, 20, 82, 20, 1);
  f.legend('a2', `kritična pot O1→O2→O4→O5: ${O.O1} + ${O.O2} + ${O.O4} + ${O.O5} = ${crit} min = TPČ`);
  f.legend('a0', `O3: pot je ${rez} min krajša → rezerva ${rez} min`);
  f.legend(null, `zmogljivost = ${MIZ.dan} / obremenitev: I ${num(MIZ.dan / W.I)}, II ${num(r1(MIZ.dan / W.II))}, III ${num(MIZ.dan / W.III)}`);
  f.legend(null, `ozko grlo = delavec I (O1 + O2 = ${W.I} min) → ${num(MIZ.dan / W.I)} izdelkov/dan`);
  return f.svg();
}

/* ---- Servisni center za telefone: Littlov zakon ---- */
const SRV = { P: 24, Z1: 10, Z2: 16, sprejem: 3, hit: 6, zas: 26, ph: 0.8 };
function servis() {
  const s = SRV, w1 = s.Z1 / s.P * 60, w2 = s.Z2 / s.P * 60;
  const tH = w1 + s.sprejem + w2 + s.hit, tZ = w1 + s.sprejem + w2 + s.zas, avg = s.ph * tH + (1 - s.ph) * tZ;
  const f = new Fig({ qmax: 100, pmax: 100, noAxes: true, ml: 8, mr: 8, mt: 6, mb: 6, h: 250, title: 'Littlov zakon v servisnem centru' });
  const rows = [
    ['čakanje na sprejem', `Z = ${s.Z1} → PČ = ${s.Z1}/${s.P} h = ${num(w1)} min`, 'a0'],
    ['sprejem', `${s.sprejem} min`, 'a2'],
    ['čakanje na tehnika', `Z = ${s.Z2} → PČ = ${s.Z2}/${s.P} h = ${num(w2)} min`, 'a0'],
    ['popravilo', `80 %: hitro ${s.hit} min · 20 %: zaslon ${s.zas} min`, 'a2'],
  ];
  rows.forEach(([t, d, cls], k) => {
    const yT = 96 - k * 25, yB = yT - 17;
    f.rect(4, yB, 96, yT, cls, null);
    f.text(50, yT, t, { cls: 'tv', dy: 13 }); f.text(50, yT, d, { dy: 26 });
    if (k < rows.length - 1) f.arrow(50, yB, 50, yB - 7.5, 'ar');
  });
  f.legend(null, `P = ${s.P} strank/h (pretok)`);
  f.legend(null, `hitro: ${num(w1)} + ${s.sprejem} + ${num(w2)} + ${s.hit} = ${num(tH)} min; zaslon: ${num(tZ)} min`);
  f.legend(null, `povprečni PČ = 0,8 · ${num(tH)} + 0,2 · ${num(tZ)} = ${num(avg)} min`);
  f.legend(null, `Z = P · PČ = ${s.P} · ${num(avg)}/60 = ${num(r1(s.P * avg / 60))} ≈ ${Math.round(s.P * avg / 60)} strank`);
  return f.svg();
}

/* ---- Linijska razmestitev: montaža električnih skirojev (180 enot v 7,5 h) ---- */
const LIN = { t: { A: 75, B: 55, C: 35, D: 30, E: 45, F: 35, G: 40, H: 85, I: 20 }, st: [['A', 'B'], ['C', 'F', 'G', 'D'], ['H', 'E', 'I']], c: 150 };
function linija() {
  const { t, st, c } = LIN, sum = Object.values(t).reduce((a, b) => a + b, 0);
  const f = new Fig({ qmin: 0.4, qmax: 3.75, pmax: 172, xl: '', yl: 's', title: 'Linijska razmestitev: montaža skirojev', ml: 40, mr: 54 });
  st.forEach((tasks, k) => {
    let y = 0;
    tasks.forEach((n, j) => {
      f.rect(k + 1 - 0.3, y, k + 1 + 0.3, y + t[n], j % 2 ? 'a2' : 'a1', null);
      f.text(k + 1, y + t[n] / 2, `${n} ${t[n]}`, { dy: 4 });
      y += t[n];
    });
    f.text(k + 1, y, `${y} s`, { cls: 'tv', dy: -4 });
    f.xtick(k + 1, `DM ${k + 1}`);
  });
  f.hline(c, 0.4, 3.55, 'cS').tag(3.55, c, `cikel ${c} s`, 'tS');
  f.ytick(c, String(c));
  const loads = st.map((x) => x.reduce((a, n) => a + t[n], 0));
  f.legend(null, `180 enot v 7,5 h → c = 27.000 / 180 = ${c} s`);
  f.legend(null, `min. št. DM = ⌈${sum} / ${c}⌉ = ${Math.ceil(sum / c)}; učinkovitost = ${sum} / (3 · ${c}) = ${num(r1(sum / (3 * c) * 100))} %`);
  f.legend(null, `prosti čas ${loads.map((l) => c - l).join(' + ')} = ${3 * c - sum} s; ozko grlo DM 3`);
  return f.svg();
}

/* ---- Napovedovanje: povpraševanje po kolesarskih čeladah, drseča sredina (2) in eksponentno glajenje (α = 0,3) ---- */
const NAP = { D: [120, 140, 110, 114, 120, 124], a: 0.3 };
function napovedi() {
  const D = NAP.D, a = NAP.a;
  const ma = [4, 5, 6].map((t) => (D[t - 2] + D[t - 3]) / 2);
  const es = [D[2]]; es.push(es[0] + a * (D[3] - es[0])); es.push(es[1] + a * (D[4] - es[1]));
  const pM = [0, 1, 2].reduce((s, k) => s + Math.abs(D[k + 3] - ma[k]), 0) / 3;
  const pE = [0, 1, 2].reduce((s, k) => s + Math.abs(D[k + 3] - es[k]), 0) / 3;
  const f = new Fig({ qmin: 0.5, qmax: 6.4, pmin: 100, pmax: 145, xl: 'teden', yl: 'povpraševanje', title: 'Napovedi povpraševanja po čeladah', ml: 36, mr: 96 });
  f.path(D.map((v, k) => [k + 1, v]), 'cD'); D.forEach((v, k) => f.dot(k + 1, v));
  f.path(ma.map((v, k) => [k + 4, v]), 'cS'); ma.forEach((v, k) => f.dot(k + 4, v));
  f.path(es.map((v, k) => [k + 4, v]), 'c4'); es.forEach((v, k) => f.dot(k + 4, v));
  for (let k = 1; k <= 6; k++) f.xtick(k, String(k));
  [110, 120, 130, 140].forEach((p) => f.ytick(p, String(p)));
  f.text(4, ma[0], num(ma[0]), { dy: -6, cls: 'tS' });
  f.tag(6, D[5], 'dejansko D', 'tD', -4).tag(6, ma[2], 'drseča sredina', 'tS', 6).tag(6, es[2], 'eksp. glajenje', 'tc', 4);
  f.legend(null, `drseča sredina (2 tedna): F = ${ma.map(num).join(' / ')}; PANN = ${num(r1(pM))}`);
  f.legend(null, `eksp. glajenje (α = 0,3, F₄ = D₃): F = ${es.map((x) => num(Math.round(x * 100) / 100)).join(' / ')}; PANN ≈ ${num(r1(pE))}`);
  f.legend(null, 'izberemo eksponentno glajenje (nižji PANN)');
  return f.svg();
}

module.exports = {
  'z-mpsp-besedica-spider': spider,
  'z-mpsp-mizarska-ozko-grlo': mizarska,
  'z-mpsp-servis-littlov': servis,
  'z-mpsp-skiroji-linija': linija,
  'z-mpsp-celade-napovedi': napovedi,
};
