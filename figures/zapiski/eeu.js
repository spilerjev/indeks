/* Lastni grafi za zapiske Ekonomike EU (eeu/k1): nadomeščajo sliki prosta-trgovina-graf-1.svg in -2.svg.
   Številke so iste kot v besedilu zapiskov in v kvizih eeu-rac-v3 / eeu-maja-rac (jagode, šali). */
const { Fig, num, Q, P, eq, trade } = require('../lib');

/* Jagode: Q_D = 600 − 50P, Q_S = −150 + 100P; po znižanju MC za 0,30: Q_S' = −120 + 100P. */
function jagode() {
  const qd = [600, -50], qs = [-150, 100], qs2 = [-120, 100];
  const e = eq(qd, qs), e2 = eq(qd, qs2), pD = P(qd, 0), pS = P(qs, 0), pS2 = P(qs2, 0);
  const cs = (pD - e.p) * e.q / 2, ps = (e.p - pS) * e.q / 2, cs2 = (pD - e2.p) * e2.q / 2, ps2 = (e2.p - pS2) * e2.q / 2;
  const f = new Fig({ qmax: 660, pmax: 13.5, title: 'Jagode: presežka pred in po znižanju mejnih stroškov', ml: 46, mr: 72 });
  f.area([[0, pD], [0, e.p], [e.q, e.p]], 'a1', 'CS', [e.q * 0.3, e.p + (pD - e.p) * 0.3]);
  f.area([[0, e.p], [0, pS], [e.q, e.p]], 'a2', 'PS', [e.q * 0.3, e.p - (e.p - pS) * 0.32]);
  f.fn((q) => P(qd, q), 0, 600, 'cD').fn((q) => P(qs, q), 0, 640, 'cS').fn((q) => P(qs2, q), 0, 640, 'cS dsh');
  f.text(30, P(qd, 30), 'D', { cls: 'tD', anchor: 'start', dx: 6, dy: -4 });
  f.tag(640, P(qs, 640), 'S', 'tS', 0).tag(640, P(qs2, 640), 'S′ (MC − 0,30)', 'tS', 12);
  f.guideH(e.p, e.q).guideV(e.q, e.p).guideV(e2.q, e2.p);
  f.pt(e.q, e.p, 'E', 0, -8).pt(e2.q, e2.p, 'E′', 12, 14);
  f.ytick(pD, num(pD)).ytick(e.p, num(e.p)).ytick(e2.p, num(e2.p)).ytick(pS, num(pS)).ytick(pS2, num(pS2));
  f.xtick(e.q, num(e.q)).xtick(e2.q, num(e2.q)).xtick(600, '600');
  f.legend(null, 'Q (tisoč kg), P (€/kg)');
  f.legend('a1', `CS = ½ · (12 − 5) · 350 = ${num(cs)} (tisoč €)`);
  f.legend('a2', `PS = ½ · (5 − 1,5) · 350 = ${num(ps)} (tisoč €)`);
  f.legend(null, `po znižanju MC: E′ (P = ${num(e2.p)}; Q = ${num(e2.q)})`);
  f.legend(null, `CS = ${num(cs2)} (+${num(cs2 - cs)}), PS = ${num(ps2)} (+${num(ps2 - ps)})`);
  f.legend(null, `blaginja +${num(cs2 + ps2 - cs - ps)} (tisoč €)`);
  return f.svg();
}

// trade() nariše eno državo; dodamo ime države (desno zgoraj) in vsebinski aria-label
const label = (svg, from, to, name) => {
  if (!svg.includes(`aria-label="${from}"`)) throw new Error('ni oznake ' + from);
  const w = Number(/viewBox="0 0 ([\d.]+) /.exec(svg)[1]);
  return svg.replace(`aria-label="${from}"`, `aria-label="${to}"`).replace(/<\/svg>$/, `<text class="tl" x="${w - 6}" y="12" text-anchor="end">${name}</text></svg>`);
};

module.exports = {
  'z-eeu-jagode-presezki': () => jagode(),
  // šali: Belgija Q_D = 240 − P, Q_S = −60 + P (uvoznica); Avstrija Q_D = 200 − P, Q_S = −100 + 2P (izvoznica); P_W = 120
  'z-eeu-sali-belgija': () => label(trade({ qd: [240, -1], qs: [-60, 1], pw: 120, values: true, unit: 'tisoč €' }), 'Prosta trgovina, država uvoznica', 'Trg šalov: Belgija kot uvoznica pri P_W = 120 €', 'Belgija (uvoznica)'),
  'z-eeu-sali-avstrija': () => label(trade({ qd: [200, -1], qs: [-100, 2], pw: 120, values: true, unit: 'tisoč €' }), 'Prosta trgovina, država izvoznica', 'Trg šalov: Avstrija kot izvoznica pri P_W = 120 €', 'Avstrija (izvoznica)'),
};
