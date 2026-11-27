/* MPSP (mpsp/k1): grafi za nove primere v zapiskih. Številke se računajo iz data.js
   (iste kot v preglasitve.json; preverja check.js). Slog kot figures/*.js (razredi cD, cS, a1 …). */
const { Fig, num } = require('../lib');
/* podatki (kopija ustreznih delov outA/data.js; check.js preveri, da se ujemata) */
const D = {"PEDAL":{"spider":{"dims":[["Hitrost","dostave"],["Cena","kosila"],["Okus in","svežina"],["Izbira","jedi"],["Točnost","termina"]],"pedal":[5,3,4,2,5],"plat":[3,4,3,5,3],"rest":[1,5,4,3,2]},"sedezi":48,"sedenje":40,"ciljGostov":96,"narocilaKonica":30,"krog":24,"kurirji":10},"KOLO":{"O1":10,"O2":25,"O3":15,"O4":30,"O5":10,"dan":450,"O4nov":20},"KLIC":{"P":120,"pogovor":4,"cakanje":2,"operaterji":10,"Pvec":150},"LIN1":{"kol":225,"ur":7.5,"t":{"A":15,"B":65,"C":30,"D":45,"E":65,"F":50,"G":20,"H":40},"pred":{"A":[],"B":["A"],"C":["B"],"D":[],"E":["B"],"F":["C","D"],"G":["E","F"],"H":["G"]},"boljse":[["A","B","C"],["D","E"],["F","G","H"]]},"NAP":{"D":[120,150,135,129,147,144,150]},"PRAZ":{"A":{"FC":48000,"VC":3.2},"B":{"FC":6000,"VC":6.2},"Q":10000,"cena":9},"SIM":{"D":[[10,0.1],[11,0.2],[12,0.3],[13,0.25],[14,0.15]],"rn":[37,82,9,56,71,24,93,48,65,15],"cena":20,"nabava":8,"Q":[12,13]}};

/* linijsko uravnoteženje: najdaljša naloga, ob izenačenju več sledečih nalog (kopija outA/bal.js) */
function followers(pred) {
  const names = Object.keys(pred), succ = {};
  names.forEach((k) => { succ[k] = []; });
  names.forEach((k) => pred[k].forEach((p) => succ[p].push(k)));
  const rec = (k) => { const s = new Set(); succ[k].forEach((c) => { s.add(c); rec(c).forEach((x) => s.add(x)); }); return s; };
  const f = {}; names.forEach((k) => { f[k] = rec(k).size; }); return f;
}
function greedy(t, pred, c) {
  const fol = followers(pred), done = new Set(), st = [], names = Object.keys(t);
  while (done.size < names.length) {
    let load = 0; const cur = [];
    for (;;) {
      const av = names.filter((k) => !done.has(k) && pred[k].every((p) => done.has(p)) && t[k] <= c - load);
      if (!av.length) break;
      av.sort((a, b) => t[b] - t[a] || fol[b] - fol[a] || a.localeCompare(b));
      cur.push(av[0]); done.add(av[0]); load += t[av[0]];
    }
    if (!cur.length) return null;
    st.push(cur);
  }
  return st;
}

const r1 = (x) => Math.round(x * 10) / 10;
const sum = (a) => a.reduce((s, x) => s + x, 0);

/* ---- Spider: Pedal, dostavna platforma, restavracija s prevzemom (1–5, rob = najugodneje za stranko) ---- */
function spider() {
  const S = D.PEDAL.spider, R = 1.05, n = S.dims.length;
  const f = new Fig({ qmin: -2.2, qmax: 2.2, pmin: -1.45, pmax: 1.55, noAxes: true, ml: 10, mr: 10, mt: 10, mb: 10, h: 252, title: 'Spider diagram: Pedal, platforma in restavracija s prevzemom' });
  const ang = (k) => Math.PI / 2 - 2 * Math.PI * k / n;
  const pt = (k, v) => [R * v / 5 * Math.cos(ang(k)), R * v / 5 * Math.sin(ang(k))];
  for (let lv = 1; lv <= 5; lv++) for (let k = 0; k < n; k++) f.seg(...pt(k, lv), ...pt((k + 1) % n, lv), 'gd');
  for (let k = 0; k < n; k++) f.seg(0, 0, ...pt(k, 5), 'gd');
  const poly = (vals) => vals.map((v, k) => pt(k, v));
  const close = (vals) => [...poly(vals), pt(0, vals[0])];
  f.area(poly(S.rest), 'a4', null).path(close(S.rest), 'c4');
  f.area(poly(S.plat), 'a1', null).path(close(S.plat), 'cD');
  f.area(poly(S.pedal), 'a2', null).path(close(S.pedal), 'cS');
  S.pedal.forEach((v, k) => f.dot(...pt(k, v)));
  S.dims.forEach(([a, b], k) => {
    const [x, y] = pt(k, 5.9), c = Math.cos(ang(k));
    const anchor = Math.abs(c) < 0.2 ? 'middle' : c > 0 ? 'start' : 'end';
    const dy = y > 0.9 ? -10 : y < -0.5 ? 6 : 0;
    f.text(x, y, a, { anchor, dy }).text(x, y, b, { anchor, dy: dy + 11 });
  });
  f.text(0, 0, '1–5', { dy: 4, cls: 'tc' });
  f.legend('a2', `Pedal (dostava kosil s kolesi): ${S.pedal.join(' / ')}`);
  f.legend('a1', `dostavna platforma: ${S.plat.join(' / ')}`);
  f.legend('a4', `restavracija s prevzemom: ${S.rest.join(' / ')}`);
  f.legend(null, 'zmagovalna dejavnika Pedala: hitrost dostave, točnost termina');
  f.legend(null, 'kvalifikacijska: cena, okus');
  return f.svg();
}

/* ---- Servis kolesa: mrežni diagram, kritična pot, dva mehanika ---- */
function koloServis() {
  const K = D.KOLO, tpc = K.O1 + Math.max(K.O2, K.O3, K.O4) + K.O5;
  const wA = K.O1 + K.O2 + K.O5, wB = K.O3 + K.O4;
  const f = new Fig({ qmax: 100, pmax: 44, noAxes: true, ml: 8, mr: 8, mt: 8, mb: 8, h: 170, title: 'Servis kolesa: kritična pot in dva mehanika' });
  const box = (x, y, t, d, crit, who) => {
    f.rect(x - 8, y - 5.5, x + 8, y + 5.5, crit ? 'a2' : 'a0', null);
    f.text(x, y, t, { cls: 'tv', dy: -1 }); f.text(x, y, d + ' min', { dy: 11 });
    f.text(x, y + 5.5, who, { cls: 'tc', dy: -4 });
  };
  box(12, 22, 'O1', K.O1, 1, 'meh. A'); box(50, 37, 'O2', K.O2, 0, 'meh. A'); box(50, 22, 'O4', K.O4, 1, 'meh. B'); box(50, 7, 'O3', K.O3, 0, 'meh. B');
  box(88, 22, 'O5', K.O5, 1, 'meh. A');
  f.arrow(20, 24, 42, 36, 'ar').arrow(20, 22, 42, 22, 'cS').arrow(20, 20, 42, 8, 'ar');
  f.arrow(58, 36, 80, 24, 'ar').arrow(58, 22, 80, 22, 'cS').arrow(58, 8, 80, 20, 'ar');
  f.legend('a2', `kritična pot O1→O4→O5: ${K.O1} + ${K.O4} + ${K.O5} = ${tpc} min = TPČ`);
  f.legend('a0', `rezerva O2 = ${K.O4 - K.O2} min, O3 = ${K.O4 - K.O3} min`);
  f.legend(null, `obremenitev A = ${wA} min, B = ${wB} min → oba ${num(K.dan / wA)} koles/dan`);
  f.legend(null, `zmogljivost ${num(Math.min(K.dan / wA, K.dan / wB))} koles/dan (ozki grli: oba mehanika)`);
  return f.svg();
}

/* ---- Klicni center: Littlov zakon ---- */
function klicni() {
  const k = D.KLIC, zP = k.P * k.pogovor / 60, zV = k.P * k.cakanje / 60, zS = k.P * (k.cakanje + k.pogovor) / 60;
  const f = new Fig({ qmax: 100, pmax: 100, noAxes: true, ml: 8, mr: 8, mt: 6, mb: 6, h: 190, title: 'Littlov zakon v klicnem centru' });
  const rows = [
    ['čakalna vrsta', `PČ = ${k.cakanje} min → Z = ${k.P} · ${k.cakanje}/60 = ${num(zV)}`, 'a0'],
    ['pogovor z operaterjem', `PČ = ${k.pogovor} min → Z = ${k.P} · ${k.pogovor}/60 = ${num(zP)}`, 'a2'],
  ];
  rows.forEach(([t, d, cls], i) => {
    const yT = 94 - i * 50, yB = yT - 34;
    f.rect(4, yB, 96, yT, cls, null);
    f.text(50, yT, t, { cls: 'tv', dy: 16 }); f.text(50, yT, d, { dy: 32 });
    if (i < rows.length - 1) f.arrow(50, yB, 50, yB - 14, 'ar');
  });
  f.legend(null, `P = ${k.P} klicev/h (pretok)`);
  f.legend(null, `v sistemu: Z = ${k.P} · ${k.cakanje + k.pogovor}/60 = ${num(zS)} (${num(zV)} čaka, ${num(zP)} v pogovoru)`);
  f.legend(null, `izkoriščenost ${k.operaterji} operaterjev = ${num(zP)}/${k.operaterji} = ${num(zP / k.operaterji * 100)} %`);
  return f.svg();
}

/* ---- Linija: hevristika (4 DM) proti boljši razporeditvi (3 DM), c = 120 s ---- */
function linija() {
  const L = D.LIN1, c = L.ur * 3600 / L.kol, S = sum(Object.values(L.t));
  const g = greedy(L.t, L.pred, c), b = L.boljse;
  const cols = [...g.map((st, k) => ({ st, x: k + 1, lab: `H${k + 1}` })), ...b.map((st, k) => ({ st, x: g.length + 1.6 + k, lab: `B${k + 1}` }))];
  const xmax = g.length + 1.6 + b.length;
  const f = new Fig({ qmin: 0.3, qmax: xmax + 0.1, pmax: 140, xl: '', yl: 's', title: 'Linija: hevristika proti boljši razporeditvi', ml: 40, mr: 54 });
  cols.forEach(({ st, x, lab }) => {
    let y = 0;
    st.forEach((n, j) => {
      f.rect(x - 0.3, y, x + 0.3, y + L.t[n], j % 2 ? 'a2' : 'a1', null);
      f.text(x, y + L.t[n] / 2, `${n} ${L.t[n]}`, { dy: 4 });
      y += L.t[n];
    });
    f.text(x, y, `${y}`, { cls: 'tv', dy: -4 });
    f.xtick(x, lab);
  });
  f.hline(c, 0.3, xmax - 0.1, 'cS').tag(xmax - 0.1, c, `cikel ${c} s`, 'tS');
  f.ytick(c, String(c));
  f.legend(null, `H1–H${g.length}: hevristika, ${g.length} DM → ${S}/(${g.length} · ${c}) = ${num(r1(S / (g.length * c) * 100))} %`);
  f.legend(null, `B1–B${b.length}: boljša razporeditev, ${b.length} DM → ${S}/(${b.length} · ${c}) = ${num(r1(S / (b.length * c) * 100))} %`);
  return f.svg();
}

/* ---- Napovedi: 3-tedenska drseča sredina in naivna metoda ---- */
function napovedi() {
  const Dm = D.NAP.D, w = [4, 5, 6, 7];
  const ma = w.map((t) => (Dm[t - 2] + Dm[t - 3] + Dm[t - 4]) / 3), nv = w.map((t) => Dm[t - 2]);
  const pM = sum(w.map((t, k) => Math.abs(Dm[t - 1] - ma[k]))) / 4, pN = sum(w.map((t, k) => Math.abs(Dm[t - 1] - nv[k]))) / 4;
  const f = new Fig({ qmin: 0.5, qmax: 7.4, pmin: 110, pmax: 160, xl: 'teden', yl: 'povpraševanje', title: 'Napovedi povpraševanja po termovkah', ml: 36, mr: 96 });
  f.path(Dm.map((v, k) => [k + 1, v]), 'cD'); Dm.forEach((v, k) => f.dot(k + 1, v));
  f.path(ma.map((v, k) => [k + 4, v]), 'cS'); ma.forEach((v, k) => f.dot(k + 4, v));
  f.path(nv.map((v, k) => [k + 4, v]), 'c4'); nv.forEach((v, k) => f.dot(k + 4, v));
  for (let k = 1; k <= 7; k++) f.xtick(k, String(k));
  [120, 130, 140, 150].forEach((p) => f.ytick(p, String(p)));
  f.tag(7, Dm[6], 'dejansko D', 'tD', -4).tag(7, ma[3], 'drseča sredina', 'tS', 6).tag(7, nv[3], 'naivna', 'tc', 4);
  f.legend(null, `drseča sredina (3 tedni): F = ${ma.map(num).join(' / ')}; PANN = ${num(pM)}`);
  f.legend(null, `naivna (F_{t} = D_{t−1}): F = ${nv.join(' / ')}; PANN = ${num(pN)}`);
  f.legend(null, 'izberemo drsečo sredino (nižji PANN); obe podcenjujeta rast');
  return f.svg();
}

/* ---- Prelomna točka: pražarna, A lastni pražilnik, B zunanje praženje ---- */
function prazarna() {
  const P = D.PRAZ, qs = (P.A.FC - P.B.FC) / (P.B.VC - P.A.VC), tcs = P.A.FC + P.A.VC * qs;
  const qmax = 20000, TC = (o, q) => o.FC + o.VC * q;
  const f = new Fig({ qmax, pmax: 140000, xl: 'Q (kg)', yl: 'TC (€)', title: 'Prelomna točka: lastni pražilnik ali zunanje praženje', ml: 46, mr: 60 });
  f.fn((q) => TC(P.A, q), 0, qmax, 'cS').fn((q) => TC(P.B, q), 0, qmax, 'cD');
  f.guideV(qs, tcs).guideH(tcs, qs).pt(qs, tcs, '', 0, 0);
  f.tag(qmax, TC(P.A, qmax), 'A', 'tS').tag(qmax, TC(P.B, qmax), 'B', 'tD');
  [0, 5000, 10000, 20000].forEach((q) => f.xtick(q, num(q)));
  f.xtick(qs, num(qs));
  [P.B.FC, P.A.FC, 120000].forEach((p) => f.ytick(p, num(p)));
  f.ytick(tcs, num(tcs));
  f.legend(null, `A: TC = ${num(P.A.FC)} + ${num(P.A.VC)} · Q · B: TC = ${num(P.B.FC)} + ${num(P.B.VC)} · Q`);
  f.legend(null, `presečišče Q* = ${num(qs)} kg (TC = ${num(tcs)} €): pod njo B, nad njo A`);
  return f.svg();
}

/* ---- Simulacija: dobiček po dnevih pri naročilu 12 in 13 šopkov ---- */
function sopki() {
  const S = D.SIM;
  let kum = 0; const rng = S.D.map(([d, p]) => { const lo = Math.round(kum * 100); kum += p; return { d, lo, hi: Math.round(kum * 100) - 1 }; });
  const dem = S.rn.map((r) => rng.find((x) => r >= x.lo && r <= x.hi).d);
  const pr = S.Q.map((Q) => dem.map((d) => S.cena * Math.min(d, Q) - S.nabava * Q));
  const mean = pr.map((p) => sum(p) / p.length), sd = pr.map((p, i) => Math.sqrt(sum(p.map((x) => (x - mean[i]) ** 2)) / (p.length - 1)));
  const f = new Fig({ qmin: 0.3, qmax: 10.7, pmin: 80, pmax: 165, xl: 'dan', yl: '€', title: 'Simulacija: dobiček po dnevih (12 in 13 šopkov)', ml: 36, mr: 40 });
  dem.forEach((d, k) => {
    f.rect(k + 1 - 0.38, 80, k + 1 - 0.02, pr[0][k], 'a1', null);
    f.rect(k + 1 + 0.02, 80, k + 1 + 0.38, pr[1][k], 'a2', null);
    f.xtick(k + 1, String(k + 1));
  });
  [100, 120, 140, 160].forEach((p) => f.ytick(p, String(p)));
  f.hline(mean[0], 0.3, 10.6, 'gd').tag(10.6, mean[0], `${num(mean[0])}`, 'tc');
  f.legend('a1', `naročilo ${S.Q[0]}: povprečje ${num(mean[0])} €, σ = ${num(r1(sd[0]))} €`);
  f.legend('a2', `naročilo ${S.Q[1]}: povprečje ${num(mean[1])} €, σ = ${num(r1(sd[1]))} €`);
  f.legend(null, 'enako povprečje, različno tveganje → manjše naročilo');
  return f.svg();
}

module.exports = {
  'z-mpsp-pedal-spider': spider,
  'z-mpsp-kolo-servis-mreza': koloServis,
  'z-mpsp-klicni-littlov': klicni,
  'z-mpsp-linija-hevristika': linija,
  'z-mpsp-napovedi-ds3': napovedi,
  'z-mpsp-prazarna-prelomna': prazarna,
  'z-mpsp-sopki-sim': sopki,
};
Object.defineProperty(module.exports, '_data', { value: D, enumerable: false });
