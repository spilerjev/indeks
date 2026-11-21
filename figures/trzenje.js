/* Grafi: Temelji trženja (trz). Oznake in pojmi po ZAPISKI.md predmeta. */
const { Fig, num } = require('./lib');

const range = (a, b, n = 60) => Array.from({ length: n + 1 }, (_, k) => a + (b - a) * k / n);
// okvir z besedilom (več vrstic), koordinate 0–100 × 0–H
function box(f, x0, y0, x1, y1, lines, cls = 'a0', tcls = 'tc') {
  f.rect(x0, y0, x1, y1, cls, null);
  const L = [].concat(lines), cy = (y0 + y1) / 2, step = 4.6;
  L.forEach((t, k) => f.text((x0 + x1) / 2, cy + (L.length - 1) * step / 2 - k * step, t, { cls: k === 0 ? tcls : 't', dy: 4 }));
}
const diag = (h, title, H = 50) => new Fig({ qmax: 100, pmax: H, noAxes: true, ml: 6, mr: 6, mt: 6, mb: 6, h, title });

function zvestoba() {
  const f = new Fig({ qmax: 10, pmax: 10, xl: 'zadovoljstvo', yl: 'zvestoba', title: 'Zadovoljstvo in zvestoba', mr: 14, ml: 26 });
  f.rect(0, 5, 5, 10, 'a3', null).rect(5, 5, 10, 10, 'a1', null).rect(0, 0, 5, 5, 'a5', null).rect(5, 0, 10, 5, 'a4', null);
  f.text(2.5, 7.9, 'TALCI', { cls: 'tl' }).text(2.5, 6.6, 'nezadovoljni, zvesti', {}).text(2.5, 5.6, '(ne morejo oditi)', {});
  f.text(7.5, 7.9, 'APOSTOLI', { cls: 'tl' }).text(7.5, 6.6, 'zadovoljni, zvesti', {}).text(7.5, 5.6, '(priporočajo)', {});
  f.text(2.5, 2.9, 'TERORISTI', { cls: 'tl' }).text(2.5, 1.6, 'nezadovoljni, nezvesti', {}).text(2.5, 0.6, '(slabe novice)', {});
  f.text(7.5, 2.9, 'PODKUPLJIVCI', { cls: 'tl' }).text(7.5, 1.6, 'zadovoljni, nezvesti', {}).text(7.5, 0.6, '(najboljša ponudba)', {});
  f.xtick(2.5, 'nizko').xtick(7.5, 'visoko').ytick(2.5, 'nizka').ytick(7.5, 'visoka');
  f.legend(null, 'zadovoljstvo in zvestoba sta povezana, a NE sorazmerno:');
  f.legend(null, 'talci so zvesti brez zadovoljstva, podkupljivci obratno');
  return f.svg();
}
function nps() {
  const f = diag(150, 'NPS (priporočilni indeks)', 40);
  for (let s = 0; s <= 10; s++) {
    const x = 4 + s * 8.4, cls = s <= 6 ? 'a5' : s <= 8 ? 'a0' : 'a1';
    f.rect(x, 26, x + 7.6, 34, cls, null); f.text(x + 3.8, 30, String(s), { cls: 'tc', dy: 4 });
  }
  f.text(4 + 3.5 * 8.4, 37, 'obrekovalci (0–6)', { cls: 'tc' }); f.text(4 + 7.9 * 8.4, 37, 'pasivni', { cls: 'tc' }); f.text(4 + 9.9 * 8.4, 37, 'promotorji', { cls: 'tc' });
  f.rect(4, 8, 4 + 92 * 0.5, 18, 'a1', null).rect(4 + 92 * 0.5, 8, 4 + 92 * 0.8, 18, 'a0', null).rect(4 + 92 * 0.8, 8, 96, 18, 'a5', null);
  f.text(4 + 92 * 0.25, 13, '50 % promotorji', { cls: 'tc', dy: 4 }); f.text(4 + 92 * 0.65, 13, '30 % pasivni', { dy: 4 }); f.text(4 + 92 * 0.9, 13, '20 % obrek.', { cls: 'tc', dy: 4 });
  f.text(50, 3, 'primer', {});
  f.legend(null, 'NPS = % promotorjev − % obrekovalcev = 50 − 20 = 30');
  f.legend(null, 'pasivni se ne štejejo; razpon od −100 (vsi obrekovalci) do +100');
  return f.svg();
}
function potencial() {
  const f = new Fig({ qmax: 10.5, pmax: 11, xl: 'izdatki za trženje', yl: 'tržno povpraševanje', title: 'Tržni minimum in tržni potencial', mr: 74, ml: 20 });
  const S = (top, lo) => (x) => lo + (top - lo) / (1 + Math.exp(-(x - 4.5) * 0.95));
  f.fn(S(9, 2), 0, 10, 'c3').fn(S(6.6, 1.6), 0, 10, 'c32');
  f.hline(9.1, 0, 10, 'gd').text(10, 9.1, 'Q₂ (razcvet)', { anchor: 'start', dx: 4, dy: 4, cls: 'tc' });
  f.text(10, S(6.6, 1.6)(10), 'recesija', { anchor: 'start', dx: 4, dy: 4 });
  f.dot(0, S(9, 2)(0)).text(0, S(9, 2)(0), 'Q₁', { anchor: 'start', dx: 6, dy: 14, cls: 'tc' });
  f.guideV(5.6, S(9, 2)(5.6)).pt(5.6, S(9, 2)(5.6), 'napoved', -26, -2).xtick(5.6, 'načrtovani');
  f.legend(null, 'Q₁ tržni minimum: brez izdatkov za trženje (ni nič)');
  f.legend(null, 'tržna napoved: pri načrtovanih izdatkih');
  f.legend(null, 'Q₂ potencial: meja pri neskončnih izdatkih, odvisen od okolja');
  f.legend(null, 'velik razmik Q₁–Q₂ = razširljiv trg; majhen (sol) = nerazširljiv');
  return f.svg();
}
function trgi() {
  const f = diag(230, 'Ravni trga', 50);
  box(f, 3, 3, 97, 47, [], 'a0'); f.text(50, 42.5, 'POTENCIALNI', { cls: 'tl' });
  box(f, 10, 3, 90, 38, [], 'a4'); f.text(50, 33.5, 'RAZPOLOŽLJIVI', { cls: 'tl' });
  box(f, 18, 3, 82, 29, [], 'a3'); f.text(50, 24.5, 'CILJNI', { cls: 'tl' });
  box(f, 28, 3, 72, 20, [], 'a1'); f.text(50, 11, 'DEJANSKI', { cls: 'tl' });
  f.legend(null, 'potencialni: zanimanje');
  f.legend(null, 'razpoložljivi: zanimanje + dohodek + dostop');
  f.legend(null, 'ciljni: del razpoložljivega, ki ga želimo osvojiti');
  f.legend(null, 'dejanski: že kupili (zanimanje še ni dejanski trg)');
  return f.svg();
}
function delez() {
  const f = new Fig({ qmax: 10, pmax: 36, xl: '', yl: 'mio €', title: 'Tržni delež (trg 100 mio €)', mr: 20, ml: 30 });
  [[2, 20, 'mi', 'a1'], [5, 30, 'največji konkurent', 'a2'], [8, 15, 'drugi', 'a0']].forEach(([x, v, n, c]) => {
    f.rect(x - 1.1, 0, x + 1.1, v, c, null); f.text(x, v, num(v), { dy: -5, cls: 'tc' }); f.text(x, 0, n, { dy: 14 });
  });
  f.ytick(20, '20').ytick(30, '30');
  f.legend(null, 'celotni tržni delež = 20 / 100 = 20 %');
  f.legend(null, 'relativni tržni delež = 20 / 30 = 67 % (< 100 % → nismo vodja)');
  f.legend(null, 'vodja ima relativni delež nad 100 % (deli z drugim na trgu)');
  return f.svg();
}
function poti() {
  const f = diag(200, 'Tržne poti in njihove ravni', 52);
  const rows = [['0 ravni', []], ['1 raven', ['trgovec']], ['2 ravni', ['veletrg.', 'trgovec']], ['3 ravni', ['zastopnik', 'veletrg.', 'trgovec']]];
  rows.forEach(([name, mid], r) => {
    const y = 44 - r * 12.5, chain = ['proizvajalec', ...mid, 'porabnik'], w = 84 / chain.length;
    f.text(1, y + 1, name, { anchor: 'start', cls: 'tc' });
    chain.forEach((t, k) => {
      const x0 = 15 + k * w; box(f, x0 + 1, y - 3.6, x0 + w - 2, y + 3.6, t === 'proizvajalec' ? 'proizv.' : t, k === 0 || k === chain.length - 1 ? 'a0' : 'a3', 't');
      if (k) f.arrow(x0 - 1.8, y, x0 + 0.8, y);
    });
  });
  f.legend(null, 'število ravni = število posrednikov med proizvajalcem in porabnikom');
  f.legend(null, 'več ravni → daljša pot (veletrg. = veletrgovec)');
  return f.svg();
}
function odlocanje() {
  const f = diag(170, 'Proces nakupnega odločanja', 46);
  const st = ['prepoznava potrebe', 'iskanje informacij', 'presojanje možnosti', 'nakupna odločitev', 'ponakupno vedenje'];
  st.forEach((t, k) => { const x = 2 + k * 19.6; box(f, x, 26, x + 17, 40, t.split(' '), k === 3 ? 'a1' : 'a0', 't'); if (k) f.arrow(x - 2.4, 33, x - 0.2, 33); });
  box(f, 30, 3, 92, 16, ['stališča drugih', 'nepričakovane okoliščine'], 'a5', 'tc');
  f.arrow(59, 16.4, 63, 25.5, 'ar');
  f.text(50, 21, 'namera', {});
  f.legend('a5', 'med nakupno namero in odločitvijo posežeta 2 dejavnika');
  f.legend(null, 'konec: ponakupno vedenje (zadovoljstvo ali disonanca)');
  return f.svg();
}
function vrednost() {
  const f = new Fig({ qmax: 10, pmax: 11, xl: '', yl: '', title: 'Zaznana vrednost', mr: 20, ml: 12 });
  f.rect(1, 0, 4, 9.5, 'a1', null); f.rect(6, 0, 9, 5.5, 'a2', null);
  ['izdelek', 'dostopnost', 'izkušnja'].forEach((t, k) => f.text(2.5, 2 + k * 2.8, t, { cls: 'tc' }));
  ['denar', 'čas, trud', 'tveganje'].forEach((t, k) => f.text(7.5, 1.2 + k * 1.6, t, { cls: 'tc' }));
  f.text(2.5, 9.5, 'celotna vrednost', { dy: -6 }); f.text(7.5, 5.5, 'celotni stroški', { dy: -6 });
  f.seg(6, 9.5, 9, 9.5, 'gd').seg(7.5, 5.6, 7.5, 9.4, 'cD'); f.text(7.5, 7.5, 'zaznana vrednost', { anchor: 'start', dx: 6, cls: 'tD' });
  f.legend(null, 'zaznana vrednost = celotna vrednost − celotni stroški');
  f.legend(null, 'je RAZLIKA, ne vsota koristi in stroškov');
  return f.svg();
}
function plc() {
  const f = new Fig({ qmax: 10, pmax: 10, xl: 'čas', yl: 'prodaja', title: 'Življenjski cikel izdelka', mr: 14, ml: 20 });
  const s = (t) => 8.5 * Math.exp(-((t - 5.6) ** 2) / 5.2) * (t < 5.6 ? 1 : 1) + 0;
  f.fn(s, 0.3, 9.8, 'c3'); [2.6, 4.6, 7.1].forEach((x) => f.vline(x, 0, 9.4, 'gd'));
  [[1.4, 'uvajanje'], [3.6, 'rast'], [5.85, 'zrelost'], [8.5, 'upadanje']].forEach(([x, t]) => f.text(x, 9.3, t, { cls: 'tc' }));
  f.legend(null, 'štiri stopnje: uvajanje, rast, zrelost, upadanje');
  return f.svg();
}
function stp() {
  const f = diag(210, 'Ciljno trženje (STP)', 54);
  const s = [['1. SEGMENTACIJA', 'spremenljivke, profili segmentov'], ['2. CILJANJE', 'ocena segmentov, izbira ciljnih trgov'], ['3. POZICIONIRANJE', 'razločevalno mesto v mislih porabnikov']];
  s.forEach((t, k) => { const y = 38 - k * 17; box(f, 8, y, 92, y + 13, t, k === 1 ? 'a1' : 'a0'); if (k) f.arrow(50, y + 16.6, 50, y + 13.4); });
  f.legend(null, 'segmentiranje je prvi korak; ciljanje = oceniti in izbrati');
  f.legend(null, 'pozicioniranje podpre celoten trženjski splet');
  return f.svg();
}
function engel() {
  const f = new Fig({ qmax: 10.5, pmax: 60, xl: 'dohodek', yl: 'delež izdatkov (%)', title: 'Engelov zakon', mr: 72, ml: 22 });
  f.fn((x) => 50 - 32 * (1 - Math.exp(-x / 4)), 0.3, 10, 'cS').fn((x) => 12 + 30 * (1 - Math.exp(-x / 4)), 0.3, 10, 'cD');
  f.text(10, 50 - 32 * (1 - Math.exp(-2.5)), 'hrana', { anchor: 'start', dx: 4, dy: 4, cls: 'tS' });
  f.text(10, 12 + 30 * (1 - Math.exp(-2.5)), 'storitve, prosti čas', { anchor: 'start', dx: 4, dy: 4, cls: 'tD' });
  f.legend(null, 'z rastjo dohodka delež za hrano pada,');
  f.legend(null, 'delež za storitve, prosti čas in izobraževanje raste');
  return f.svg();
}
function percep() {
  const f = new Fig({ qmin: -5, qmax: 5, pmin: -5, pmax: 5, noAxes: true, title: 'Percepcijski zemljevid', ml: 10, mr: 10, mt: 10, mb: 10 });
  f.arrow(-4.6, 0, 4.6, 0, 'ax').arrow(4.6, 0, -4.6, 0, 'ax').arrow(0, -4.6, 0, 4.6, 'ax').arrow(0, 4.6, 0, -4.6, 'ax');
  f.text(4.6, 0, 'visoka cena', { anchor: 'end', dy: -6 }); f.text(-4.6, 0, 'nizka cena', { anchor: 'start', dy: -6 });
  f.text(0, 4.6, 'visoka kakovost', { anchor: 'start', dx: 6, dy: 8 }); f.text(0, -4.6, 'nizka kakovost', { anchor: 'start', dx: 6, dy: -2 });
  [[3, 3.2, 'A'], [-2.6, -2.4, 'B'], [1.2, 1.6, 'C'], [-1.4, 2.6, 'D']].forEach(([x, y, n]) => f.pt(x, y, 'znamka ' + n, 0, -7));
  f.legend(null, 'položaj znamk v očeh porabnikov (zaznano pozicioniranje)');
  f.legend(null, 'praznine na zemljevidu so možne tržne priložnosti');
  return f.svg();
}

const figs = {
  'trz-zvestoba': zvestoba(), 'trz-nps': nps(), 'trz-potencial': potencial(), 'trz-trgi': trgi(), 'trz-delez': delez(), 'trz-poti': poti(),
  'trz-odlocanje': odlocanje(), 'trz-vrednost': vrednost(), 'trz-plc': plc(), 'trz-stp': stp(), 'trz-engel': engel(), 'trz-percep': percep(),
};
const attach = [
  ['Kako se imenujejo nezadovoljni, a zvesti', 'trz-zvestoba'],
  ['Kako se imenujejo zadovoljni, a nezvesti', 'trz-zvestoba'],
  ['Porabnik, ki je nezadovoljen, a ne more oditi', 'trz-zvestoba'],
  ['Zadovoljstvo in zvestoba sta tesno povezana', 'trz-zvestoba'],
  ['Odgovori na vprašanje o priporočilu (0-10)', 'trz-nps'],
  ['Kateri razpon ima NPS?', 'trz-nps'],
  ['Tržni minimum je povpraševanje', 'trz-potencial'],
  ['Tržni potencial je neodvisen', 'trz-potencial'],
  ['Trg z majhnim razmikom', 'trz-potencial'],
  ['Tržni potencial je odvisen od stanja v okolju', 'trz-potencial'],
  ['Razpoložljivi trg so porabniki', 'trz-trgi'],
  ['Trg 100 mio €, naša prodaja 20 mio €', 'trz-delez'],
  ['Relativni tržni delež je nad 100 %', 'trz-delez'],
  ['Relativni tržni delež primerja', 'trz-delez'],
  ['Podjetje z relativnim tržnim deležem 80 %', 'trz-delez'],
  ['Število ravni tržne poti', 'trz-poti'],
  ['Tržna pot dveh ravni', 'trz-poti'],
  ['Kateri dva dejavnika posežeta med nakupno namero', 'trz-odlocanje'],
  ['Proces nakupnega odločanja se konča', 'trz-odlocanje'],
  ['Dve trgovini prodajata isti izdelek po isti ceni', 'trz-vrednost'],
  ['Kako porabnik oblikuje zaznano vrednost ponudbe?', 'trz-vrednost'],
  ['Kaj od naštetega je pravilno? (1) Življenjski cikel izdelka', 'trz-plc'],
  ['Kateri so trije koraki ciljnega trženja', 'trz-stp'],
  ['Kaj naredimo v koraku CILJANJA?', 'trz-stp'],
  ['Kaj od naštetega je pravilno? (1) Segmentiranje je prvi korak', 'trz-stp'],
  ['Engelov zakon pravi', 'trz-engel'],
  ['Kaj prikazuje percepcijski zemljevid?', 'trz-percep'],
].map(([q, fig, o]) => ({ subj: 'trz', q, fig, ...(o || {}) }));

module.exports = { figs, attach };
