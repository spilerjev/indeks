/* Grafi za naloge »vstavi v graf« (type: "figfill", PROTOTIP 21. 11. 2026).
   Vsak vnos v `fills` je { svg, slots: [{ id, x, y }] }: graf brez številk na mestih, kamor študent vstavlja, in koordinate
   praznih mest v pikslih SVG (viewBox). Motor (FigFillQ v indeks-template.jsx) čez graf postavi gumbe za prazna mesta;
   pravilne vrednosti in odvečni čipi so v vprašanju (q.slots, q.distractors), figures/index.js pripne graf v q.fill. */
const { Fig, Q, P, eq } = require('./lib');

/* pomožno: mesto ob osi x (pod oznako), ob osi y (levo od osi) ali poljubno v grafu */
const atX = (f, q, id) => ({ id, x: f.X(q), y: f.Y(f.pmin) + 16 });
const atY = (f, p, id) => ({ id, x: f.X(f.qmin) - 22, y: f.Y(p) });
const at = (f, q, p, id, dx = 0, dy = 0) => ({ id, x: f.X(q) + dx, y: f.Y(p) + dy });
const tickX = (f, q) => f.bg.push(`<line class="ax" x1="${f.X(q)}" y1="${f.Y(f.pmin)}" x2="${f.X(q)}" y2="${f.Y(f.pmin) + 3}"/>`);
const tickY = (f, p) => f.bg.push(`<line class="ax" x1="${f.X(f.qmin) - 3}" y1="${f.Y(p)}" x2="${f.X(f.qmin)}" y2="${f.Y(p)}"/>`);

/* 1) EEU: ravnotežje in presežka. Jagode: Q_D = 600 − 50P, Q_S = −150 + 100P → P* = 5, Q* = 350; D seka os P pri 12. */
function ravnotezje() {
  const qd = [600, -50], qs = [-150, 100], e = eq(qd, qs);
  const f = new Fig({ qmax: 640, pmax: 13.5, title: 'Jagode: ravnotežje na trgu', ml: 48, mr: 30, mb: 34 });
  f.area([[0, P(qd, 0)], [e.q, e.p], [0, e.p]], 'a1', null);
  f.area([[0, e.p], [e.q, e.p], [0, P(qs, 0)]], 'a4', null);
  f.fn((q) => P(qd, q), 0, 600, 'cD').fn((q) => P(qs, q), 0, 600, 'cS');
  f.guideH(e.p, e.q).guideV(e.q, e.p).dot(e.q, e.p);
  tickX(f, e.q); tickY(f, e.p); tickY(f, P(qd, 0));
  f.legend(null, 'Q_{D} = 600 − 50P, Q_{S} = −150 + 100P (tisoč kg, €/kg)');
  const slots = [
    atY(f, e.p, 'p'), atX(f, e.q, 'q'), atY(f, P(qd, 0), 'pmax'),
    at(f, 560, P(qd, 560), 'cd', 14, -14), at(f, 560, P(qs, 560), 'cs', 16, 4),
    at(f, e.q * 0.33, (P(qd, 0) + e.p) / 2 - 1.2, 'top'),
  ];
  return { svg: f.svg(), slots };
}

/* 2) EEU: carina majhne države. Skiroji: Q_S = 4P − 200, Q_D = 1400 − 4P, P_W = 150, carina 20 % → 180.
   q1 = 400, q2 = 520, q3 = 680, q4 = 800. */
function carina() {
  const qd = [1400, -4], qs = [-200, 4], pw = 150, pt = 180;
  const q1 = Q(qs, pw), q2 = Q(qs, pt), q3 = Q(qd, pt), q4 = Q(qd, pw);
  const f = new Fig({ qmax: 980, pmin: 100, pmax: 230, title: 'Skiroji: uvozna carina', ml: 48, mr: 30, mb: 34 });
  f.area([[0, pw], [q1, pw], [q2, pt], [0, pt]], 'a0', null);
  f.rect(q2, pw, q3, pt, 'a3', null);
  f.hline(pt, 0, 960).hline(pw, 0, 960, 'pl dsh');
  [q1, q4].forEach((q) => f.guideV(q, pw)); [q2, q3].forEach((q) => f.guideV(q, pt));
  f.fn((q) => P(qd, q), Q(qd, 228), 960, 'cD').fn((q) => P(qs, q), Q(qs, 100), Q(qs, 228), 'cS');
  f.text(940, P(qd, 940), 'D', { cls: 'tD', anchor: 'start', dx: 4, dy: 10 }); f.text(Q(qs, 222), 222, 'S', { cls: 'tS', anchor: 'start', dx: 6 });
  [q1, q2, q3, q4].forEach((q) => tickX(f, q)); tickY(f, pw); tickY(f, pt);
  f.legend('a3', 'osenčeni pravokotnik: carinski prihodek države (vstavi znesek v €)');
  f.legend(null, 'Q_{S} = 4P − 200, Q_{D} = 1400 − 4P; svetovna cena 150 €, carina 20 %');
  const slots = [atY(f, pw, 'pw'), atY(f, pt, 'pt'), atX(f, q1, 'q1'), atX(f, q2, 'q2'), atX(f, q3, 'q3'), atX(f, q4, 'q4'), at(f, (q2 + q3) / 2, (pw + pt) / 2, 'c')];
  // nižja vrstica za q2 in q3, da se gumbi ne prekrivajo
  slots[3].y += 20; slots[4].y += 20;
  return { svg: f.svg(), slots };
}

/* 3) MPSP: izbira postopka po prelomnih točkah. Kolesarnica Vrtiljak: TC = 12.000 + 640Q (ročni), 30.000 + 565Q (polavtomatski),
   72.000 + 445Q (robotski) → prelomni točki 240 in 350. */
function prelomna() {
  const R = (q) => 12000 + 640 * q, M = (q) => 30000 + 565 * q, A = (q) => 72000 + 445 * q;
  const f = new Fig({ qmin: 150, qmax: 470, pmin: 90000, pmax: 320000, xl: 'Q', yl: 'TC', title: 'Izbira postopka (prelomne točke)', ml: 58, mr: 104, mb: 34 });
  f.fn(R, 150, 450, 'cS').fn(M, 150, 450, 'c4').fn(A, 150, 450, 'cD');
  f.guideV(240, R(240)).guideV(350, A(350)).dot(240, R(240)).dot(350, A(350));
  tickX(f, 240); tickX(f, 350);
  f.legend(null, 'TC = FC + AVC · Q; FC 12.000 / 30.000 / 72.000 €, AVC 640 / 565 / 445 €');
  f.legend(null, 'vstavi prelomni točki in ime postopka ob vsaki premici');
  // imena ob desnem koncu premic (tam je vrstni red jasen: ročni zgoraj, robotski spodaj); pika poveže mesto s premico
  [[R, 'cS'], [M, 'c4'], [A, 'cD']].forEach(([fn]) => f.dot(450, fn(450)));
  const slots = [atX(f, 240, 'b1'), atX(f, 350, 'b2'), at(f, 450, R(450), 'r', 46, -14), at(f, 450, M(450), 'm', 46, 2), at(f, 450, A(450), 'a', 46, 18)];
  return { svg: f.svg(), slots };
}

const fills = {
  'ff-eeu-ravnotezje': ravnotezje(),
  'ff-eeu-carina': carina(),
  'ff-mpsp-prelomna': prelomna(),
};
module.exports = { fills };
