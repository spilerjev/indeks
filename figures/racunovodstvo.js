/* Grafi: Računovodstvo (rac, 1. letnik). Številke računskih nalog so iz naloge in preverjene z razlago. */
const { Fig, num } = require('./lib');

function box(f, x0, y0, x1, y1, lines, cls = 'a0', tcls = 'tc') {
  f.rect(x0, y0, x1, y1, cls, null);
  const L = [].concat(lines), cy = (y0 + y1) / 2, step = 4.4;
  L.forEach((t, k) => f.text((x0 + x1) / 2, cy + (L.length - 1) * step / 2 - k * step, t, { cls: k === 0 ? tcls : 't', dy: 4 }));
}
const diag = (h, title, H = 50) => new Fig({ qmax: 100, pmax: H, noAxes: true, ml: 6, mr: 6, mt: 6, mb: 6, h, title });

function bilanca() {
  const f = diag(230, 'Bilanca stanja na določen dan', 62);
  f.text(25, 59, 'SREDSTVA (aktiva)', { cls: 'tl' }); f.text(75, 59, 'OBVEZNOSTI DO VIROV', { cls: 'tl' });
  box(f, 3, 36, 47, 55, ['dolgoročna sredstva', '(neopredm., OOS, naložbe)'], 'a4');
  box(f, 3, 12, 47, 35, ['kratkoročna sredstva', 'zaloge, terjatve, KFN, denar'], 'a1');
  box(f, 3, 3, 47, 11, ['AČR'], 'a0');
  box(f, 53, 40, 97, 55, ['kapital'], 'a3');
  box(f, 53, 26, 97, 39, ['dolgoročne obveznosti', '(rezervacije, dolgovi)'], 'a2');
  box(f, 53, 12, 97, 25, ['kratkoročne obveznosti'], 'a5');
  box(f, 53, 3, 97, 11, ['PČR'], 'a0');
  f.arrow(1.2, 52, 1.2, 14, 'ar'); f.arrow(98.8, 52, 98.8, 14, 'ar');
  f.legend(null, 'sredstva: od zgoraj navzdol naraščajoča likvidnost');
  f.legend(null, 'obveznosti do virov: naraščajoča zapadlost (kapital najprej)');
  f.legend(null, 'sredstva = obveznosti do virov; statičen in kumulativen izkaz');
  f.legend(null, 'AČR (odloženi stroški) pri sredstvih, PČR pri obveznostih');
  return f.svg();
}
function bsIpi() {
  const f = diag(170, 'Povezava izkaza poslovnega izida in bilance stanja', 44);
  box(f, 3, 18, 40, 40, ['IZKAZ POSL. IZIDA', 'obdobje (film)', 'prihodki − odhodki'], 'a0');
  box(f, 60, 18, 97, 40, ['BILANCA STANJA', 'dan (fotografija)', 'kapital ↑ / ↓'], 'a0');
  f.arrow(40.5, 29, 59.5, 29, 'cS'); f.text(50, 29, 'poslovni izid', { dy: -6, cls: 'tS' });
  box(f, 22, 3, 78, 12, ['dobiček ≠ več denarja (poslovnoizidni ≠ denarni tok)'], 'a3', 't');
  f.legend(null, 'dobiček poveča kapital, izguba ga zmanjša');
  f.legend(null, 'izguba se pokrije z drugimi postavkami kapitala, ne z osnovnim');
  return f.svg();
}
function tokovi() {
  const f = diag(210, 'Poslovnoizidni in denarni tokovi', 56);
  f.text(37, 53, 'je prejemek / izdatek', { cls: 'tc' }); f.text(77, 53, 'ni prejemek / izdatek', { cls: 'tc' });
  f.text(2, 37, 'je prihodek', { anchor: 'start', cls: 'tc' }); f.text(2, 32, '/ odhodek', { anchor: 'start', cls: 'tc' });
  f.text(2, 15, 'ni prihodek', { anchor: 'start', cls: 'tc' }); f.text(2, 10, '/ odhodek', { anchor: 'start', cls: 'tc' });
  box(f, 20, 26, 56, 49, ['gotovinska prodaja', 'plačilo najemnine'], 'a1', 't');
  box(f, 60, 26, 96, 49, ['prodaja na up', 'amortizacija'], 'a3', 't');
  box(f, 20, 3, 56, 24, ['najetje posojila', 'plačilo dobavitelju', 'vplačilo kapitala'], 'a4', 't');
  box(f, 60, 3, 96, 24, ['—'], 'a0', 't');
  f.legend(null, 'prihodki ob nastanku dogodka (izstavitvi računa), ne ob plačilu');
  f.legend(null, 'posojilo = prejemek, ne prihodek; dobiček ≠ denar');
  return f.svg();
}
function konto() {
  const f = diag(170, 'Konto (T-konto)', 44);
  const T = (x, title, d, k) => {
    f.text(x + 20, 40, title, { cls: 'tl' }); f.seg(x, 35, x + 40, 35, 'c3').seg(x + 20, 35, x + 20, 6, 'c3');
    f.text(x + 10, 31, 'DEBET', { cls: 'tc' }); f.text(x + 30, 31, 'KREDIT', { cls: 'tc' });
    d.forEach((t, i) => f.text(x + 10, 23 - i * 6, t, {})); k.forEach((t, i) => f.text(x + 30, 23 - i * 6, t, {}));
  };
  T(5, 'konto sredstev', ['zač. stanje', '+ povečanje'], ['− zmanjšanje']);
  T(55, 'konto obveznosti', ['− zmanjšanje'], ['zač. stanje', '+ povečanje']);
  f.legend(null, 'debet = leva stran (v breme), kredit = desna (v dobro)');
  f.legend(null, 'vsak dogodek na vsaj dveh kontih: vsota v breme = vsota v dobro');
  f.legend(null, 'stroški in odhodki se povečujejo v debet, prihodki v kredit');
  return f.svg();
}
function kontni() {
  const f = diag(210, 'Kontni okvir', 52);
  const R = [['0', 'dolgoročna sredstva', 'a1'], ['1', 'kratk. sredstva brez zalog', 'a1'], ['2', 'kratk. obveznosti, PČR', 'a2'], ['3', 'zaloge materiala', 'a1'], ['4', 'stroški', 'a5'],
    ['5', 'prost', 'a0'], ['6', 'zaloge proizv. in blaga', 'a1'], ['7', 'odhodki in prihodki', 'a3'], ['8', 'poslovni izid', 'a4'], ['9', 'kapital, dolgoročne obv.', 'a2']];
  R.forEach(([n, t, c], k) => {
    const x = k < 5 ? 2 : 51, y = 42 - (k % 5) * 9.6;
    f.rect(x, y, x + 47, y + 8.4, c, null); f.text(x + 3, y + 4.2, n, { cls: 'tl', anchor: 'start', dy: 4 }); f.text(x + 8, y + 4.2, t, { anchor: 'start', dy: 4 });
  });
  f.legend('a1', 'sredstva: razredi 0, 1, 3, 6');
  f.legend('a2', 'obveznosti do virov: 2 in 9 (kapital v 9)');
  f.legend('a5', 'stroški: 4; odhodki in prihodki: 7; poslovni izid: 8');
  return f.svg();
}
function amort() {
  const f = new Fig({ qmax: 6.6, pmax: 112, xl: 'leta', yl: 'vrednost', title: 'Amortizacija osnovnega sredstva', mr: 70, ml: 22 });
  const NV = 100, PV = 20, n = 5, nv = (t) => NV - (NV - PV) * t / n;
  f.area([[0, NV], [n, PV], [n, NV]], 'a2', 'odpisana', [3.6, 80]);
  f.area([[0, 0], [0, NV], [n, PV], [n, 0]], 'a1', 'neodpisana', [1.7, 30]);
  f.hline(NV, 0, 6.2, 'gd').hline(PV, 0, 6.2, 'gd').fn(nv, 0, n, 'c3');
  f.text(6.2, NV, 'nabavna vrednost', { anchor: 'start', dx: 4, dy: 4 }); f.text(6.2, PV, 'preostala vrednost', { anchor: 'start', dx: 4, dy: 4 });
  f.seg(5.6, PV + 1, 5.6, NV - 1, 'cS'); f.text(5.6, 60, 'osnova', { anchor: 'start', dx: 5, cls: 'tS' });
  for (let t = 1; t <= n; t++) f.xtick(t, String(t));
  f.legend(null, 'amortizacijska osnova = nabavna − preostala vrednost');
  f.legend('a1', 'neodpisana (knjigovodska) = nabavna − odpisana vrednost');
  f.legend('a2', 'amortizacija povečuje odpisano vrednost');
  return f.svg();
}
function amortZacetek() {
  const f = new Fig({ qmax: 12.6, pmax: 10, xl: '', yl: '', noAxes: true, title: 'Začetek amortiziranja', ml: 8, mr: 8, mt: 8, mb: 18, h: 130 });
  const M = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'];
  M.forEach((m, k) => { f.rect(k + 0.1, 3, k + 0.9, 7, k >= 9 ? 'a2' : k === 8 ? 'a3' : 'a0', null); f.text(k + 0.5, 3, m, { dy: 13 }); });
  f.text(8.5, 7, 'usposobljena 10. 9.', { dy: -5, cls: 'tc' }); f.text(10.5, 5, '3/12', { cls: 'tl', dy: 4 });
  f.legend(null, 'amortizacija od 1. dne naslednjega meseca (1. 10.)');
  f.legend('a2', 'osnova (24.000 + 1.500 − 3.000) / 5 = 4.500 → 3/12 = 1.125 €');
  return f.svg();
}
// FIFO / povprečne cene: plasti zaloge in porabljena količina
function zaloga(o) {
  const tot = o.layers.reduce((s, l) => s + l[0], 0);
  const f = new Fig({ qmax: tot * 1.02, pmax: 10, noAxes: true, title: o.title, ml: 8, mr: 8, mt: 6, mb: 20, h: 140 });
  let x = 0;
  o.layers.forEach(([q, p], k) => { f.rect(x, 4, x + q, 8, k ? 'a4' : 'a0', null); f.text(x + q / 2, 8, num(q) + ' ' + o.unit + ' po ' + num(p) + ' €', { dy: -5 }); x += q; });
  f.rect(0, 4.6, o.take, 7.4, 'a2', null); f.text(o.take / 2, 6, 'porabljeno ' + num(o.take) + ' ' + o.unit, { cls: 'tc', dy: 4 });
  f.seg(o.take, 3.4, o.take, 8.6, 'cS'); f.text(tot, 4, 'zaloga ostane →', { anchor: 'end', dy: 13 }); f.text(0, 4, 'najstarejše', { anchor: 'start', dy: 13 });
  o.legend.forEach((l) => f.legend(null, l));
  return f.svg();
}
function cena() {
  const f = new Fig({ qmax: 10, pmax: 11, xl: '', yl: '', title: 'Stroškovna cena po metodah', mr: 20, ml: 12 });
  const bar = (x, parts, label) => { let y = 0; parts.forEach(([h, c, t]) => { f.rect(x - 1.2, y, x + 1.2, y + h, c, null); if (t) f.text(x, y + h / 2, t, { dy: 4 }); y += h; }); f.text(x, 0, label, { dy: 13, cls: 'tc' }); f.text(x, y, '', {}); };
  bar(2, [[3, 'a1', 'spremenlj.']], 'spremenljivi'); bar(5, [[3, 'a1', 'spremenlj.'], [2.5, 'a4', 'stalni proizv.']], 'proizvajalni');
  bar(8, [[3, 'a1', 'spremenlj.'], [2.5, 'a4', 'stalni proizv.'], [3, 'a3', 'uprava, nabava']], 'zožena lastna');
  f.text(8, 8.5, 'najvišja', { dy: -6, cls: 'tl' });
  f.legend(null, 'spremenljivi proizvajalni < proizvajalni < zožena lastna cena');
  f.legend(null, 'proizvajalni (MSRP): neposredni + posredni proizvajalni stroški');
  f.legend(null, 'zožena lastna: vse razen neposr. stroškov prodaje in financiranja');
  return f.svg();
}
function ebit() {
  const f = new Fig({ qmax: 10, pmax: 112, xl: '', yl: '', title: 'Od prihodkov do EBIT in EBITDA', mr: 10, ml: 12, h: 250 });
  const steps = [[1, 0, 100, 'a1', 'prihodki'], [3, 60, 100, 'a5', '− proizv. str.'], [5, 0, 60, 'a4', 'kosmati PI'], [7, 25, 60, 'a5', '− prod., uprava'], [9, 0, 25, 'a3', 'EBIT']];
  steps.forEach(([x, y0, y1, c, t], k) => { f.rect(x - 0.75, y0, x + 0.75, y1, c, null); f.text(x, 0, t, { dy: 13 + (k % 2) * 11 }); });
  f.seg(1.75, 100, 2.25, 100, 'gd').seg(3.75, 60, 4.25, 60, 'gd').seg(5.75, 60, 6.25, 60, 'gd').seg(7.75, 25, 8.25, 25, 'gd');
  f.rect(9 - 0.75, 25, 9 + 0.75, 37, 'a0', null); f.text(9, 37, 'EBITDA', { dy: -5, cls: 'tl' }); f.text(9, 31, '+ am.', { dy: 4 });
  f.legend(null, 'kosmati PI od prodaje = prihodki − proizvajalni stroški prodanih');
  f.legend(null, 'EBIT = poslovni izid iz poslovanja (pred obrestmi in davki)');
  f.legend(null, 'EBITDA = EBIT + amortizacija (opredmetenih in neopredmetenih)');
  return f.svg();
}
function bs2(o) {
  const tot = o.assets.reduce((s, a) => s + a[0], 0);
  const f = new Fig({ qmax: 10, pmax: tot * 1.12, xl: '', yl: '', title: o.title, mr: 8, ml: 8, noAxes: true });
  const stack = (x, parts, side) => { let y = 0; parts.forEach(([v, c, t]) => { f.rect(x - 0.9, y, x + 0.9, y + v, c, null); f.text(x + side * 1.1, y + v / 2, t, { anchor: side < 0 ? 'end' : 'start', dy: 0, cls: 'tc' }); f.text(x + side * 1.1, y + v / 2, num(v), { anchor: side < 0 ? 'end' : 'start', dy: 12 }); y += v; }); };
  stack(3.9, o.assets, -1); stack(6.1, o.sources, 1);
  f.seg(2.6, 0, 7.4, 0, 'ax'); f.text(3.9, tot, 'sredstva', { dy: -5, cls: 'tl' }); f.text(6.1, tot, 'viri', { dy: -5, cls: 'tl' });
  o.legend.forEach((l) => f.legend(null, l));
  return f.svg();
}
function pcr(o) {
  const n = o.months.length, per = o.total / n;
  const f = new Fig({ qmax: n + 0.6, pmax: o.total * 1.12, xl: '', yl: '€', title: o.title, mr: 20, ml: 46 });
  o.months.forEach((m, k) => {
    const left = o.total - per * (k + 1);
    f.rect(k + 0.15, 0, k + 0.55, left, 'a2', null); f.rect(k + 0.6, 0, k + 1.0, per, 'a1', null);
    f.text(k + 0.57, 0, m, { dy: 13 });
  });
  f.ytick(o.total, num(o.total)).ytick(per, num(per));
  f.legend('a1', `prihodki vsak mesec = ${num(o.total)} / ${n} = ${num(per)} € (brez DDV)`);
  f.legend('a2', 'stanje PČR (odloženi prihodki) konec meseca');
  f.legend(null, 'DDV ni prihodek, je obveznost do države');
  return f.svg();
}
function anuiteta() {
  const f = new Fig({ qmax: 10, pmax: 52000, xl: '', yl: '€', title: 'Anuiteta 45.000 €', mr: 110, ml: 46, h: 200 });
  f.rect(3, 0, 6, 33000, 'a4', null).rect(3, 33000, 6, 45000, 'a5', null);
  f.text(6, 16500, 'glavnica 33.000 (posojilo ↓)', { anchor: 'start', dx: 6, dy: 4 });
  f.text(6, 39000, 'obresti 12.000 (fin. odhodek)', { anchor: 'start', dx: 6, dy: 4, cls: 'tc' });
  f.ytick(45000, '45.000');
  f.legend(null, 'celotna anuiteta je izdatek (TRR −45.000)');
  f.legend(null, 'odhodek so samo obresti; glavnica ni odhodek');
  return f.svg();
}

const figs = {
  'rac-bilanca': bilanca(), 'rac-bs-ipi': bsIpi(), 'rac-tokovi': tokovi(), 'rac-konto': konto(), 'rac-kontni': kontni(),
  'rac-amort': amort(), 'rac-amort-zacetek': amortZacetek(), 'rac-cena': cena(), 'rac-ebit': ebit(), 'rac-anuiteta': anuiteta(),
  'rac-fifo-8-10': zaloga({ title: 'FIFO: 3.000 kg po 8 € in 5.000 kg po 10 €', unit: 'kg', layers: [[3000, 8], [5000, 10]], take: 4500, legend: ['FIFO: najprej najstarejša plast → 3.000 · 8 + 1.500 · 10 = 39.000 €', 'povprečna cena (24.000 + 50.000) / 8.000 = 9,25 → 41.625 €', 'ob rastočih cenah FIFO → nižji stroški, višji poslovni izid'] }),
  'rac-fifo-3': zaloga({ title: 'FIFO: 6.000 po 3 € in 10.000 po 3,5 €', unit: 'enot', layers: [[6000, 3], [10000, 3.5]], take: 11000, legend: ['FIFO: 6.000 · 3 + 5.000 · 3,5 = 18.000 + 17.500 = 35.500 €'] }),
  'rac-povp-170': zaloga({ title: 'Povprečna cena: 400 kg za 60.000 € in 1.600 kg po 175 €', unit: 'kg', layers: [[400, 150], [1600, 175]], take: 1500, legend: ['povprečna cena = (60.000 + 280.000) / 2.000 = 170 €/kg', 'strošek = 1.500 · 170 = 255.000 € (FIFO bi dal 252.500 €)'] }),
  'rac-vzvod': bs2({ title: 'Finančni vzvod', assets: [[50000, 'a4', 'dolgoročna'], [30000, 'a1', 'kratkoročna']], sources: [[32000, 'a3', 'kapital'], [20000, 'a2', 'dolgoročni dolgovi'], [28000, 'a5', 'kratkoročni dolgovi']], legend: ['kapital = sredstva − dolgovi = 80.000 − 48.000 = 32.000', 'vzvod = dolgovi / kapital = 48.000 / 32.000 = 1,5'] }),
  'rac-triglav': bs2({ title: 'Podjetje Triglav', assets: [[120000, 'a4', 'dolgoročna 60 %'], [80000, 'a1', 'kratkoročna 40 %']], sources: [[130000, 'a3', 'kapital'], [70000, 'a5', 'dolgovi 35 %']], legend: ['kratkoročna sredstva 80.000 = 40 % → vsa sredstva 200.000', 'dolgovi 35 % = 70.000, kapital = 130.000'] }),
  'rac-pcr-ples': pcr({ title: 'Plesna šola: odloženi prihodki', total: 5400, months: ['okt', 'nov', 'dec', 'jan', 'feb', 'mar'] }),
  'rac-pcr-jadranje': pcr({ title: 'Šola jadranja: prihodki po mesecih', total: 20000, months: ['maj', 'jun', 'jul', 'avg'] }),
};
const attach = [
  ['Bilanca stanja je računovodski izkaz', 'rac-bilanca'],
  ['Bilanca stanja je:', 'rac-bilanca'],
  ['Premoženjsko stanje podjetja v bilanci stanja', 'rac-bilanca'],
  ['Sredstva so v bilanci stanja razvrščena', 'rac-bilanca'],
  ['Obveznosti do virov sredstev so v bilanci stanja razvrščene', 'rac-bilanca'],
  ['Odloženi stroški so po vsebini', 'rac-bilanca'],
  ['Kratkoročne pasivne časovne razmejitve', 'rac-bilanca'],
  ['Kaj predstavlja povezavo med bilanco stanja in izkazom', 'rac-bs-ipi'],
  ['Izkazan čisti dobiček ob koncu', 'rac-bs-ipi'],
  ['Izguba za podjetje pomeni', 'rac-bs-ipi'],
  ['Trditev »Izkazan pozitivni čisti poslovni izid', 'rac-tokovi'],
  ['Najetje (prejem) bančnega posojila', 'rac-tokovi'],
  ['Prihodki se ugotavljajo po načelu', 'rac-tokovi'],
  ['Upoštevanje nastanka poslovnega dogodka pomeni', 'rac-tokovi'],
  ['Konto ima debetno in kreditno stran', 'rac-konto'],
  ['Osnovno načelo dvostavnega knjigovodstva', 'rac-konto'],
  ['V katerih kontnih razredih spremljamo sredstva?', 'rac-kontni'],
  ['V katerem kontnem razredu knjižimo kapital?', 'rac-kontni'],
  ['V katerem kontnem razredu spremljamo stroške?', 'rac-kontni'],
  ['Amortizacijska osnova (amortizirljivi znesek) je enaka', 'rac-amort'],
  ['Amortizacijska osnova (amortizirljivi znesek) opredmetenega', 'rac-amort'],
  ['Neodpisana (knjigovodska) vrednost', 'rac-amort'],
  ['Obračun amortizacije ___', 'rac-amort'],
  ['Amortizacija se začne obračunavati', 'rac-amort-zacetek'],
  ['Nova proizvajalna oprema 24.000', 'rac-amort-zacetek'],
  ['Pri metodi FIFO se', 'rac-fifo-8-10'],
  ['Cene materiala naraščajo.', 'rac-fifo-8-10'],
  ['Zaloga 3.000 kg materiala po 8 €', 'rac-fifo-8-10'],
  ['Zaloga 6.000 enot materiala', 'rac-fifo-3'],
  ['Zaloga 400 kg materiala za 60.000 €', 'rac-povp-170'],
  ['Stroškovna cena proizvoda je najvišja', 'rac-cena'],
  ['Stroškovna cena proizvoda je NAJVIŠJA', 'rac-cena'],
  ['Pri metodi vrednotenja proizvodov s proizvajalnimi stroški', 'rac-cena'],
  ['Poslovni izid iz poslovanja označujemo', 'rac-ebit'],
  ['EBITDA dobimo tako', 'rac-ebit'],
  ['Kosmati poslovni izid od prodaje', 'rac-ebit'],
  ['Kratkoročna sredstva 30.000 €, dolgoročna 50.000 €', 'rac-vzvod'],
  ['Podjetje Triglav', 'rac-triglav'],
  ['Plesna šola', 'rac-pcr-ples'],
  ['Podjetje plača anuiteto dolgoročnega posojila 45.000', 'rac-anuiteta'],
].map(([q, fig, o]) => ({ subj: 'rac', q, fig, ...(o || {}) }));

module.exports = { figs, attach };
