/* Grafi za predelane primere PF1 (lastni primeri). Številke ustrezajo besedilu v out/pf1.json (preverja out/pf1-check.js). */
const { Fig } = require('../lib');

/* DuPont za izmišljeno podjetje Zeta (mio €): 1. leto ČD 824, prihodki 8.240, sredstva 12.360, LK 4.944;
   2. leto ČD 830, prihodki 8.650, sredstva 12.700, LK 5.520. */
function dupontZeta() {
  const y1 = { cd: 824, prih: 8240, A: 12360, E: 4944 }, y2 = { cd: 830, prih: 8650, A: 12700, E: 5520 };
  const m1 = y1.cd / y1.prih, T1 = y1.prih / y1.A, L1 = y1.A / y1.E, m2 = y2.cd / y2.prih, T2 = y2.prih / y2.A, L2 = y2.A / y2.E;
  const roe1 = y1.cd / y1.E, roe2 = y2.cd / y2.E;
  const dM = (m2 - m1) * T1 * L1, dT = m2 * (T2 - T1) * L1, dL = m2 * T2 * (L2 - L1);
  const fx = (x, d) => x.toFixed(d).replace('.', ',');
  const pc = (x, d = 2) => fx(x * 100, d) + ' %';
  const n3 = (x) => fx(x, 3), n2 = (x) => fx(x, 2);
  const op = (x) => (x >= 0 ? '+' : '−') + fx(Math.abs(x) * 100, 2);
  const f = new Fig({ qmax: 100, pmax: 62, noAxes: true, w: 520, h: 250, ml: 6, mr: 6, mt: 6, mb: 4, title: 'DuPontova razčlenitev ROE: podjetje Zeta' });
  // vrh
  f.rect(24, 47, 76, 61, 'a2', null);
  f.text(50, 57, 'ROE = ČD / LK', { cls: 'tl' });
  f.text(50, 50.5, `1. leto ${pc(roe1)} → 2. leto ${pc(roe2)}`, { cls: 'tc' });
  // povezave
  f.seg(50, 47, 50, 43, 'pl').seg(17, 43, 83, 43, 'pl');
  [17, 50, 83].forEach((x) => f.seg(x, 43, x, 39, 'pl'));
  const box = (x, name, form, val, mean) => {
    f.rect(x - 15, 9, x + 15, 39, 'a1', null);
    f.text(x, 33, name, { cls: 'tl' });
    f.text(x, 26.5, form);
    f.text(x, 20, val, { cls: 'tc' });
    f.text(x, 13, mean);
  };
  box(17, 'neto marža', 'ČD / prihodki', `${pc(m1)} → ${pc(m2)}`, 'dobičkonosnost');
  box(50, 'obračanje sredstev', 'prihodki / sredstva', `${n3(T1)} → ${n3(T2)}`, 'učinkovitost');
  box(83, 'multiplikator A/E', 'sredstva / LK', `${n2(L1)} → ${n2(L2)}`, 'finančni vzvod');
  f.text(33.5, 22.5, '×', { cls: 'tl' }).text(66.5, 22.5, '×', { cls: 'tl' });
  f.legend('a1', `ΔROE ${op(roe2 - roe1)} o. t. = marža ${op(dM)}, obračanje ${op(dT)}, vzvod ${op(dL)}`);
  f.legend(null, 'največji vzrok: nižji vzvod (LK +576 iz zadržanega dobička)');
  f.legend(null, 'A/E = 1 + D/E = 1 / (1 − D/A)');
  return f.svg();
}

module.exports = {
  'z-pf1-dupont-zeta': () => dupontZeta(),
};
