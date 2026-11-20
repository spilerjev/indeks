/* Grafi: Organizacijsko vedenje (ov, 1. letnik). Pojmi in poimenovanja po zapiskih predmeta v appu. */
const { Fig } = require('./lib');

function box(f, x0, y0, x1, y1, lines, cls = 'a0', tcls = 'tc') {
  f.rect(x0, y0, x1, y1, cls, null);
  const L = [].concat(lines), cy = (y0 + y1) / 2, step = 4.4;
  L.forEach((t, k) => f.text((x0 + x1) / 2, cy + (L.length - 1) * step / 2 - k * step, t, { cls: k === 0 ? tcls : 't', dy: 4 }));
}
const diag = (h, title, H = 50) => new Fig({ qmax: 100, pmax: H, noAxes: true, ml: 6, mr: 6, mt: 6, mb: 6, h, title });
// vodoravni tok korakov
function flow(title, steps, hi, legend, h = 140) {
  const f = diag(h, title, 24), w = 96 / steps.length;
  steps.forEach((t, k) => { const x = 2 + k * w; box(f, x, 5, x + w - 3.5, 19, t.split('|'), hi.includes(k) ? 'a1' : 'a0', 't'); if (k) f.arrow(x - 3.3, 12, x - 0.3, 12); });
  legend.forEach((l) => f.legend(null, l));
  return f.svg();
}
// matrika 2 × 2: q = [[levo spodaj], [desno spodaj], [levo zgoraj], [desno zgoraj]]
function matrix(o) {
  const f = new Fig({ qmax: 10, pmax: 10, xl: o.xl, yl: o.yl, title: o.title, mr: 14, ml: 26 });
  const cell = (x, y, [t, s, c]) => { f.rect(x, y, x + 5, y + 5, c, null); f.text(x + 2.5, y + 2.9, t, { cls: 'tl' }); if (s) f.text(x + 2.5, y + 1.5, s, {}); };
  cell(0, 0, o.q[0]); cell(5, 0, o.q[1]); cell(0, 5, o.q[2]); cell(5, 5, o.q[3]);
  if (o.mid) { f.rect(3.4, 3.9, 6.6, 6.1, 'a0', null); f.text(5, 4.6, o.mid, { cls: 'tc' }); }
  f.xtick(2.5, 'nizka').xtick(7.5, 'visoka').ytick(2.5, 'nizka').ytick(7.5, 'visoka');
  (o.legend || []).forEach((l) => f.legend(null, l));
  return f.svg();
}

function maslow() {
  const f = diag(220, 'Maslowova hierarhija potreb', 52);
  const L = [['fiziološke', 'a3'], ['varnost', 'a3'], ['pripadnost', 'a1'], ['spoštovanje', 'a1'], ['samouresničevanje', 'a1']];
  L.forEach(([t, c], k) => { const y = 3 + k * 9.4, inset = k * 8.5; f.area([[8 + inset, y], [92 - inset, y], [92 - inset - 8.5, y + 9.4], [8 + inset + 8.5, y + 9.4]], c, null); f.text(50, y + 4.7, t, { cls: 'tc', dy: 4 }); });
  f.legend('a3', 'nižji red: fiziološke in varnost, zadovoljene zunanje (plača, pogoji)');
  f.legend('a1', 'višji red: zadovoljene notranje (od znotraj)');
  return f.svg();
}
function flowZanos() {
  const f = new Fig({ qmax: 10, pmax: 10, xl: 'spretnosti', yl: 'izzivi', title: 'Zanos (Csikszentmihalyi)', mr: 14, ml: 22 });
  f.area([[0, 1.2], [8.8, 10], [10, 10], [10, 8.8], [1.2, 0], [0, 0]], 'a1', null);
  f.text(2.6, 7.6, 'tesnoba', { cls: 'tl' }); f.text(7.6, 2.4, 'dolgčas', { cls: 'tl' }); f.text(6.1, 6.1, 'ZANOS', { cls: 'tl' });
  f.legend('a1', 'zanos: izzivi so v ravnotežju s spretnostmi');
  f.legend(null, 'preveliki izzivi → tesnoba; premajhni → dolgčas');
  return f.svg();
}
function adams() {
  const f = diag(150, 'Adamsova teorija pravičnosti', 36);
  const frac = (x, a, b, who) => { f.text(x, 26, a, { cls: 'tc' }); f.seg(x - 13, 22, x + 13, 22, 'c3'); f.text(x, 15, b, { cls: 'tc' }); f.text(x, 6, who, { cls: 't' }); };
  frac(28, 'moji rezultati', 'moji vložki', 'jaz'); frac(72, 'rezultati drugega', 'vložki drugega', 'primerjalna oseba');
  f.text(50, 20.5, '= ?', { cls: 'tl' });
  f.legend(null, 'neenakost razmerij = zaznana nepravičnost');
  f.legend(null, 'odzivi: spremeni vložke/rezultate, popači zaznavo,');
  f.legend(null, 'zamenjaj primerjalno osebo ali odidi');
  return f.svg();
}
function kelley() {
  const f = diag(190, 'Kelleyjeva teorija pripisovanja', 50);
  f.text(52, 46, 'notranji vzrok', { cls: 'tl' }); f.text(82, 46, 'zunanji vzrok', { cls: 'tl' });
  [['razločevalnost', 'drugače kot drugje?', 'nizka', 'visoka'], ['konsenzualnost', 'tako ravnajo vsi?', 'nizka', 'visoka'], ['doslednost', 'vedno enako?', 'visoka', 'nizka']].forEach(([t, s, a, b], k) => {
    const y = 31 - k * 13; box(f, 2, y, 36, y + 11, [t, s], 'a0', 'tc'); box(f, 39, y, 65, y + 11, a, 'a2', 'tc'); box(f, 69, y, 95, y + 11, b, 'a4', 'tc');
  });
  f.legend(null, 'zamuja le ob ponedeljkih, drugje točen → razločevalnost (visoka)');
  return f.svg();
}
function eustres() {
  const f = new Fig({ qmax: 10, pmax: 10, xl: 'raven stresa', yl: 'uspešnost', title: 'Eustres in distres', mr: 14, ml: 22 });
  const u = (x) => 9 * Math.exp(-((x - 4.6) ** 2) / 7);
  f.area([[0, 0], ...Array.from({ length: 47 }, (_, k) => [k / 10, u(k / 10)]), [4.6, 0]], 'a1', 'eustres', [2.6, 3]);
  f.area([[4.6, 0], ...Array.from({ length: 55 }, (_, k) => [4.6 + k / 10, u(4.6 + k / 10)]), [10, 0]], 'a5', 'distres', [6.9, 3]);
  f.fn(u, 0, 10, 'c3'); f.vline(4.6, 0, 9, 'gd'); f.xtick(4.6, 'optimum');
  f.legend('a1', 'eustres: pozitiven stres, spodbuja uspešnost');
  f.legend('a5', 'distres: negativen, preveč stresa zniža uspešnost');
  return f.svg();
}
function konfliktPogled() {
  const f = new Fig({ qmax: 10, pmax: 10, xl: 'raven konflikta', yl: 'uspešnost', title: 'Interakcijski pogled na konflikt', mr: 14, ml: 22 });
  f.fn((x) => 8.6 * Math.exp(-((x - 5) ** 2) / 6), 0, 10, 'c3'); f.vline(5, 0, 8.6, 'gd');
  f.text(1.5, 6.8, 'premalo:', {}).text(1.5, 6, 'apatija', {}); f.text(5, 9.3, 'optimalna raven', { cls: 'tc' }); f.text(8.6, 6.8, 'preveč:', {}).text(8.6, 6, 'kaos', {});
  f.legend(null, 'tradicionalni pogled: konflikt je vedno škodljiv');
  f.legend(null, 'moderni (interakcijski): zmerna raven koristi, je neizogiben');
  return f.svg();
}
function konfliktStrategije() {
  const f = new Fig({ qmax: 10, pmax: 10, xl: 'skrb zase', yl: 'skrb za drugega', title: 'Strategije reševanja konfliktov', mr: 14, ml: 22 });
  const P = [[2, 8, 'izglajevanje', 'a1'], [8, 8, 'reševanje problemov', 'a4'], [2, 2, 'izogibanje', 'a0'], [8, 2, 'prevlada', 'a2'], [5, 5, 'kompromis', 'a3']];
  P.forEach(([x, y, t, c]) => { f.rect(x - 1.9, y - 1.1, x + 1.9, y + 1.1, c, null); f.text(x, y, t, { cls: 'tc', dy: 4 }); });
  f.xtick(2, 'nizka').xtick(8, 'visoka').ytick(2, 'nizka').ytick(8, 'visoka');
  f.legend(null, 'izglajevanje (prilagajanje): popustim, da ohranim odnos');
  f.legend(null, 'reševanje problemov: rešitev, ki koristi obema');
  return f.svg();
}
function schein() {
  const f = diag(190, 'Ravni organizacijske kulture (Schein)', 50);
  f.area([[50, 47], [38, 34], [62, 34]], 'a3', null); f.text(50, 37.5, 'artefakti', { cls: 'tc' });
  f.hline(33, 2, 98, 'pl dsh'); f.text(97, 33, 'vidno', { anchor: 'end', dy: -4 }); f.text(97, 33, 'nevidno', { anchor: 'end', dy: 11 });
  f.area([[38, 34], [26, 18], [74, 18], [62, 34]], 'a4', null); f.text(50, 25, 'izražene vrednote', { cls: 'tc' });
  f.area([[26, 18], [14, 3], [86, 3], [74, 18]], 'a2', null); f.text(50, 9.5, 'temeljne predpostavke', { cls: 'tc' });
  f.legend('a3', 'artefakti: logotip, obleka, arhitektura, prostori');
  f.legend('a2', 'temeljne predpostavke: najgloblja, nezavedna raven');
  return f.svg();
}
function kohlberg() {
  const f = diag(190, 'Kohlbergove stopnje moralnega presojanja', 46);
  [['1. prekonvencionalna', 'kazen, lastna korist'], ['2. konvencionalna', 'pričakovanja drugih, pravila'], ['3. postkonvencionalna', 'lastna, jasno opredeljena načela']].forEach(([t, s], k) => {
    const y = 3 + k * 14.5; box(f, 10, y, 90, y + 11.5, [t, s], k === 2 ? 'a1' : 'a0'); if (k) f.arrow(50, y - 2.8, 50, y - 0.2);
  });
  f.legend(null, 'od spodaj navzgor: pred- → konvencionalna → postkonvencionalna');
  return f.svg();
}
function vroom() {
  const f = diag(140, 'Vroomova teorija pričakovanj', 30);
  [['trud'], ['uspešnost'], ['nagrada'], ['osebni cilji']].forEach((t, k) => box(f, 3 + k * 25, 8, 21 + k * 25, 20, t, 'a0'));
  [['pričakovanje', 21], ['instrumentalnost', 46], ['valenca', 71]].forEach(([t, x], k) => { f.arrow(x + 0.4, 14, x + 6.6, 14, k === 1 ? 'cS' : 'ar'); f.text(x + 3.5, 23, t, { cls: k === 1 ? 'tS' : 'tc' }); });
  f.legend(null, 'motivacija = pričakovanje × instrumentalnost × valenca');
  f.legend(null, 'dober rezultat ne prinese štipendije → nizka instrumentalnost');
  return f.svg();
}
function medeni() {
  const f = new Fig({ qmax: 10, pmax: 10, xl: 'čas', yl: 'zadovoljstvo', title: 'Učinek medenega meseca in mačka', mr: 14, ml: 22 });
  const pts1 = [[0, 4], [1, 5.2], [2, 4.5], [3.3, 3.2]], pts2 = [[3.3, 3.2], [4.4, 7.6], [5.6, 8.4], [7, 6.4], [9.5, 5]];
  f.path(pts1, 'c32').path(pts2, 'c3'); f.vline(3.3, 0, 9.5, 'gd'); f.text(3.3, 1.2, 'menjava službe', { anchor: 'start', dx: 5, cls: 'tc' });
  f.text(5.4, 8.4, 'medeni mesec', { dy: -8, cls: 'tc' }); f.text(8.4, 5.6, 'maček', { dy: -6, cls: 'tc' });
  f.legend(null, 'po menjavi zadovoljstvo hitro naraste (medeni mesec),');
  f.legend(null, 'nato upade (maček)');
  return f.svg();
}
function sreca() {
  const f = diag(150, 'Pita sreče', 34);
  const cx = 26, cy = 17, r = 14, ax = 1.17;
  let a0 = -Math.PI / 2;
  [[0.5, 'a4', 'genetika 50 %'], [0.4, 'a1', 'namerna dejanja 40 %'], [0.1, 'a3', 'okoliščine 10 %']].forEach(([p, c, t], k) => {
    const a1 = a0 + p * 2 * Math.PI, P = [[cx, cy]];
    for (let i = 0; i <= 30; i++) { const a = a0 + (a1 - a0) * i / 30; P.push([cx + r * ax * Math.cos(a), cy + r * Math.sin(a) * -1]); }
    f.area(P, c, null); f.rect(56, 24 - k * 8, 60, 27 - k * 8, c, null); f.text(62, 25.5 - k * 8, t, { anchor: 'start', dy: 4, cls: 'tc' }); a0 = a1;
  });
  f.legend(null, 'na ~40 % sreče lahko vplivamo z namernimi dejanji');
  return f.svg();
}
function katz() {
  const f = diag(170, 'Spretnosti managerjev po ravneh (Katz)', 44);
  [['vrhnji', [30, 45, 25]], ['srednji', [22, 45, 33]], ['nižji', [12, 45, 43]]].forEach(([t, p], k) => {
    const y = 32 - k * 12; f.text(13, y + 4.5, t, { anchor: 'end', cls: 'tc', dy: 4 }); let x = 16;
    [['a4', 'konceptualne'], ['a1', 'medosebne'], ['a3', 'tehnične']].forEach(([c, n], i) => { const w = p[i] * 0.8; f.rect(x, y, x + w, y + 9, c, null); if (k === 0 || w > 14) f.text(x + w / 2, y + 4.5, n, { dy: 4 }); x += w; });
  });
  f.legend('a4', 'vrhnji management: predvsem konceptualne spretnosti');
  f.legend('a3', 'nižji management: predvsem tehnične');
  f.legend('a1', 'medosebne spretnosti so pomembne na vseh ravneh');
  return f.svg();
}

const figs = {
  'ov-maslow': maslow(),
  'ov-tuckman': flow('Tuckmanove faze razvoja skupine', ['oblikovanje', 'viharna|faza', 'oblikovanje|pravil', 'izvajanje', 'zaključe-|vanje'], [1, 2], ['najprej viharna faza, šele nato skupne norme (pravila)']),
  'ov-zanos': flowZanos(),
  'ov-adams': adams(),
  'ov-kelley': kelley(),
  'ov-karasek': matrix({ title: 'Model zahteve-nadzor (Karasek)', xl: 'zahteve dela', yl: 'nadzor (avtonomija)', q: [['pasivno delo', '', 'a0'], ['visok stres', 'preobremenitev', 'a5'], ['nizek stres', '', 'a1'], ['aktivno delo', 'izziv, učenje', 'a4']], legend: ['stres je funkcija zahtev dela in stopnje nadzora', 'najslabše: visoke zahteve in nizek nadzor'] }),
  'ov-eustres': eustres(),
  'ov-ohio': matrix({ title: 'Vedenjske teorije (Ohio)', xl: 'vzpostavitev strukture', yl: 'vzpostavitev odnosov', q: [['nizko / nizko', '', 'a0'], ['naloge', 'struktura', 'a3'], ['odnosi', 'skrb za ljudi', 'a1'], ['oboje', 'visoko / visoko', 'a4']], legend: ['dve neodvisni dimenziji: struktura (naloge) in odnosi (skrb za ljudi)', 'Michigan: usmerjenost k ljudem ali k nalogam'] }),
  'ov-konflikt-pogled': konfliktPogled(),
  'ov-konflikt-strategije': konfliktStrategije(),
  'ov-schein': schein(),
  'ov-kohlberg': kohlberg(),
  'ov-vroom': vroom(),
  'ov-medeni': medeni(),
  'ov-ustvarjalnost': flow('Ustvarjalni proces', ['priprava', 'inkubacija', 'iluminacija|(uvid)', 'verifikacija'], [1], ['inkubacija: problem zavestno odložimo, podzavest dela naprej', 'iluminacija: nenaden uvid (aha)']),
  'ov-sreca': sreca(),
  'ov-katz': katz(),
  'ov-soodvisnost': flow('Soodvisnost pri nalogah', ['združevalna', 'sekvenčna', 'recipročna', 'popolna'], [3], ['od najnižje do najvišje potrebne koordinacije', 'popolna (poglobljena): vsi nenehno usklajujejo (npr. IDEO)']),
};
const attach = [
  ['Kako Maslow razdeli potrebe', 'ov-maslow'],
  ['Kateri je pravilni vrstni red faz po Tuckmanu?', 'ov-tuckman'],
  ['Po Tuckmanovem modelu skupina najprej', 'ov-tuckman'],
  ['Kaj je po Csikszentmihalyiju', 'ov-zanos'],
  ['Na čem temelji Adamsova teorija', 'ov-adams'],
  ['Katera strategija je odziv na zaznano nepravičnost', 'ov-adams'],
  ['Katere tri dimenzije uporablja Kelleyjeva', 'ov-kelley'],
  ['Vodja opazi, da sodelavec zamuja le na ponedeljkove', 'ov-kelley'],
  ['Kaj predpostavlja Karasekov model', 'ov-karasek'],
  ['Po Karasekovem modelu kombinacija', 'ov-karasek'],
  ['Kaj sta eustres in distres?', 'ov-eustres'],
  ['Kaj loči vedenjske teorije Univerze Ohio?', 'ov-ohio'],
  ['Kaj je značilno za moderni (in ne tradicionalni) pogled na konflikt?', 'ov-konflikt-pogled'],
  ['Po sodobnem (interakcijskem) pogledu je konflikt', 'ov-konflikt-pogled'],
  ['Sodelavec v sporih vedno popusti', 'ov-konflikt-strategije'],
  ['Obleka zaposlenih, arhitektura stavbe in logotip', 'ov-schein'],
  ['Kateri je pravilni vrstni red stopenj po Kohlbergu?', 'ov-kohlberg'],
  ['Kaj je značilno za postkonvencionalno stopnjo', 'ov-kohlberg'],
  ['Študent se pri predmetu ne trudi', 'ov-vroom'],
  ['Ana po menjavi službe', 'ov-medeni'],
  ['V fazi iluminacije ustvarjalnega procesa', 'ov-ustvarjalnost'],
  ["Kako 'pita sreče'", 'ov-sreca'],
  ['Po Katzu prevladujejo', 'ov-katz'],
  ['Katera vrsta soodvisnosti pri nalogah', 'ov-soodvisnost'],
  ['Oblikovalski timi (npr. v podjetju IDEO)', 'ov-soodvisnost'],
].map(([q, fig, o]) => ({ subj: 'ov', q, fig, ...(o || {}) }));

module.exports = { figs, attach };
