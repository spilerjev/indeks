/* Poslovne finance 1 - Vaje 3-6: obveznice, delnice, tveganje in donosnost, CAPM in stroški kapitala.
   Vir: School/.../Poslovne finance 1/Vaje/PF1 vaje 1-6 2026_27.pdf (naloge; rešitve izračunane tu).
   Številke se računajo ob zagonu (ni ročno prepisanih rezultatov); napačni odgovori so tipične napake pri računanju. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

const pvifa = (r, n) => (1 - (1 + r) ** -n) / r;
const bond = (F, c, y, n, m = 1) => (F * c / m) * pvifa(y / m, n * m) + F / (1 + y / m) ** (n * m);
const thou = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const num = (x, d = 2) => { const [i, f] = Math.abs(x).toFixed(d).split('.'); return (x < 0 ? '−' : '') + thou(i) + (f ? ',' + f : ''); };
const eur = (x, d = 2) => num(x, d) + ' €';
const pct = (x, d = 2) => num(x, d) + ' %';

/* Sestavi možnosti: pravilni na mestu pos, napačni (že oblikovani nizi) okoli njega. */
function mk(q, right, wrongs, pos, expl) {
  const w = wrongs.filter((x, i, a) => x !== right && a.indexOf(x) === i).slice(0, 3);
  if (w.length < 3) throw new Error('premalo napačnih: ' + q);
  const o = w.slice(); o.splice(pos, 0, right);
  return Q(q, o, pos, expl);
}

// ---------- Vaje 3: obveznice ----------
const v3 = [
  mk('Obveznica z nominalno vrednostjo 1.000 €, letnim kuponom 6 % in 6 leti do dospetja. Vlagatelji za podobno tveganje zahtevajo 8 %. Koliko je vredna?',
    eur(bond(1000, .06, .08, 6)), [eur(1000), eur(60 * pvifa(.08, 6) + 1000 / 1.06 ** 6), eur(bond(1000, .06, .04, 6))], 2,
    'Kupon (60 €) diskontiramo z zahtevano donosnostjo 8 %, ne s kuponsko mero: 60 · PVIFA(8 %, 6) + 1.000/1,08⁶. Kupon < zahtevana donosnost → diskont (cena pod 1.000 €).'),
  mk('Ista obveznica (1.000 €, kupon 6 %, 6 let). Koliko ste zanjo pripravljeni plačati, če je vaša zahtevana donosnost le 4 %?',
    eur(bond(1000, .06, .04, 6)), [eur(bond(1000, .06, .08, 6)), eur(1000), eur(1060)], 0,
    '60 · PVIFA(4 %, 6) + 1.000/1,04⁶. Zahtevana donosnost je pod kuponom, zato je cena nad nominalno vrednostjo (premija).'),
  mk('30-letna obveznica, nominalna vrednost 1.000 €, kupon 5,5 % s polletnimi izplačili. Kolikšno je kuponsko izplačilo?',
    eur(27.5), [eur(55), eur(5.5), eur(13.75)], 1,
    'Letni kupon 55 € se izplača v dveh obrokih: 55/2 = 27,50 €. Pri polletnih kuponih računamo z 60 obdobji in polovično mero.'),
  mk('Ista 30-letna obveznica (kupon 5,5 %, polletna izplačila). Kolikšna je cena pri zahtevani donosnosti 8 %?',
    eur(bond(1000, .055, .08, 30, 2)), [eur(bond(1000, .055, .08, 30, 1)), eur(1000), eur(27.5 * pvifa(.08, 60) + 1000 / 1.08 ** 60)], 3,
    '27,50 · PVIFA(4 %, 60) + 1.000/1,04⁶⁰. Pazljivo: mera 8 %/2 = 4 % in 60 obdobij. Letni račun (30 let, 8 %) da napačen rezultat.'),
  mk('Obveznica 1.000 €, kupon 8 % (polletna izplačila), 5 let do dospetja, zahtevana donosnost 6 %. Koliko je vredna?',
    eur(bond(1000, .08, .06, 5, 2)), [eur(bond(1000, .08, .06, 5, 1)), eur(1000), eur(bond(1000, .08, .07, 5, 2))], 1,
    '40 · PVIFA(3 %, 10) + 1.000/1,03¹⁰. Premija, ker je kupon (8 %) višji od zahtevane donosnosti (6 %).'),
  (() => { // 4: izpuščeni kuponi
    let p = 0; for (let t = 1; t <= 10; t++) { let c = t <= 4 ? 0 : t <= 8 ? 140 : 70; if (t === 10) c += 1000; p += c / 1.1 ** t; }
    return mk('Obveznica 1.000 €, kupon 7 % (letni), 10 let. Podjetje prvih 4 kuponov ne izplača; v letih 5 do 8 izplača "dvojne" kupone (140 €). Zahtevana donosnost 10 %. Kolikšna je vrednost?',
      eur(p), [eur(bond(1000, .07, .10, 10)), eur(p * 1.1), eur(bond(1000, .07, .10, 10) - 280 / 1.1 ** 5)], 2,
      'Vsak tok diskontiramo posebej: 0 v letih 1-4, 140 v letih 5-8, 70 v letih 9 in 10, ob zapadlosti še 1.000. Ker tokovi niso enaki, anuitetne formule ne uporabimo za vse hkrati.');
  })(),
  mk('Brezkuponska obveznica, 1.000 €, 10 let do dospetja, YTM 10,4 %. Kolikšna je cena?',
    eur(1000 / 1.104 ** 10), [eur(1000 / 1.104 ** 5), eur(1000 / (1 + .104 * 10)), eur(1000 * (1 - .104))], 0,
    '1.000/1,104¹⁰. Brezkuponska obveznica ima en sam tok ob zapadlosti; obrestno-obrestni diskont, ne navadni.'),
  mk('Obveznica 1.000 €, kupon 5 %, 5 let do dospetja, kotira po tečaju 103,5 (cena 1.035 €). Kolikšna je tekoča donosnost?',
    pct(50 / 1035 * 100), [pct(5), pct(4.209), pct(3.5)], 3,
    'Tekoča donosnost = letni kupon / cena = 50/1.035 = 4,83 %. Ne upošteva izgube premije ob zapadlosti.'),
  (() => {
    let lo = 0, hi = .5; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; bond(1000, .05, m, 5) > 1035 ? lo = m : hi = m; }
    return mk('Ista obveznica (kupon 5 %, 5 let, cena 1.035 €). Kolikšna je donosnost do dospetja (YTM)?',
      pct(lo * 100), [pct(50 / 1035 * 100), pct(5), pct((50 - 35 / 5) / 1035 * 100)], 1,
      'YTM je diskontna stopnja, pri kateri je SV plačil = 1.035 € (poskušanje ali preglednica, RATE). Ker je cena nad nominalno, je YTM pod kuponom in pod tekočo donosnostjo.');
  })(),
  mk('Petletna brezkuponska obveznica (1.000 €) kotira po ceni 680,58 €. Kolikšna je donosnost do dospetja?',
    pct(((1000 / 680.58) ** .2 - 1) * 100), [pct(((1000 - 680.58) / 680.58 / 5) * 100), pct(7), pct(8.5)], 2,
    'YTM = (1.000/680,58)^(1/5) − 1 = 8,00 %. Navadna delitev (donos/5) ne upošteva obrestnih obresti.'),
  mk('Dvoletni netvegani vrednostni papir, 1.000 €, kupon 6 %. YTM v prvem letu 4 %, v drugem 4,3 %. Kolikšna je današnja cena?',
    eur(60 / 1.04 + 1060 / 1.043 ** 2), [eur(bond(1000, .06, .04, 2)), eur(bond(1000, .06, .043, 2)), eur(1000)], 1,
    'Vsak tok diskontiramo z lastno mero: 60/1,04 + 1.060/1,043². Kupon 6 % je nad obema merama, zato obveznica kotira s premijo.'),
  mk('Sedemletna obveznica 1.000 €, kupon 8 % (polletni), YTM 6,75 %. Kolikšna je cena in kako kotira?',
    eur(bond(1000, .08, .0675, 7, 2)) + ' (premija)', [eur(bond(1000, .08, .0675, 7, 2)) + ' (diskont)', eur(1000) + ' (po nominalni vrednosti)', eur(bond(1000, .08, .0675, 7, 1)) + ' (premija)'], 0,
    '40 · PVIFA(3,375 %, 14) + 1.000/1,03375¹⁴. Kupon 8 % > YTM 6,75 % → premija. Če bi bila kuponska mera enaka YTM, bi bila cena natanko 1.000 €.'),
  mk('Ista obveznica (7 let, kupon 8 %, polletni kuponi). Kolikšna je cena, če YTM naraste na 7 % (nominalno, polletno obrestovanje)?',
    eur(bond(1000, .08, .07, 7, 2)), [eur(bond(1000, .08, .0675, 7, 2)), eur(bond(1000, .08, .07, 7, 1)), eur(1000)], 3,
    'Višja YTM → nižja cena. 40 · PVIFA(3,5 %, 14) + 1.000/1,035¹⁴.'),
  mk('General Motors: obveznica 1.000 €, kupon 7 % (letni), 10 let, YTM ob izdaji 6 %. Kolikšna je cena ob izdaji?',
    eur(bond(1000, .07, .06, 10)), [eur(1000), eur(bond(1000, .06, .07, 10)), eur(bond(1000, .07, .08, 10))], 2,
    '70 · PVIFA(6 %, 10) + 1.000/1,06¹⁰. Kupon > YTM → premija.'),
  mk('Ista obveznica (GM): kolikšna je cena tik PRED prvim izplačilom kupona (YTM ostane 6 %)?',
    eur(70 + 70 * pvifa(.06, 9) + 1000 / 1.06 ** 9), [eur(bond(1000, .07, .06, 10)), eur(70 * pvifa(.06, 9) + 1000 / 1.06 ** 9), eur(bond(1000, .07, .06, 10) * 1.06 + 70)], 1,
    'Tik pred kuponom ima obveznica še 10 kuponov (prvi je takoj): 70 + 70 · PVIFA(6 %, 9) + 1.000/1,06⁹ = cena tik po kuponu + 70 €.'),
  mk('Ista obveznica (GM): kolikšna je cena tik PO prvem izplačilu kupona (YTM ostane 6 %)?',
    eur(70 * pvifa(.06, 9) + 1000 / 1.06 ** 9), [eur(bond(1000, .07, .06, 10)), eur(70 + 70 * pvifa(.06, 9) + 1000 / 1.06 ** 9), eur(1000)], 3,
    'Ostane 9 kuponov: 70 · PVIFA(6 %, 9) + 1.000/1,06⁹. Cena pade za izplačani kupon in se približuje nominalni vrednosti.'),
  (() => {
    const V = bond(1000, .04, .06, 5), dirty = V * 1.06 ** (4 / 12), clean = dirty - 40 * 4 / 12;
    return mk('Obveznica 1.000 €, kupon 4 % (letni), zadnji kupon pred 4 meseci, še 5 let do dospetja, zahtevana donosnost 6 %. Koliko je vredna danes z natečenimi obrestmi (polna cena)?',
      eur(dirty), [eur(clean), eur(V), eur(V + 40 * 4 / 12)], 0,
      'Vrednost ob zadnjem kuponu 915,75 € zraste še 4 mesece: 915,75 · 1,06^(4/12) = 933,71 € (polna cena). Čista cena (na tečajnici) je polna cena minus natečene obresti 40 · 4/12 = 13,33 €, torej 920,38 €.');
  })(),
];

// ---------- Vaje 4: delnice ----------
const v4 = [
  mk('Delnico ste kupili za 350 €, prejeli dividendo 34,50 € in jo konec leta prodali za 387 €. Kolikšna je donosnost naložbe?',
    pct((387 - 350 + 34.5) / 350 * 100), [pct((387 - 350) / 350 * 100), pct(34.5 / 350 * 100), pct((387 - 350 - 34.5) / 350 * 100)], 1,
    '(P₁ − P₀ + D)/P₀ = (37 + 34,50)/350. Dividendna donosnost 9,86 % + kapitalska 10,57 %.'),
  mk('Delnica ABC: cena 17 €, čez eno leto dividenda 2 €, pričakovana cena tik po dividendi 18 €. Kolikšna je pričakovana dividendna donosnost?',
    pct(2 / 17 * 100), [pct(1 / 17 * 100), pct(3 / 17 * 100), pct(2 / 18 * 100)], 3,
    'Dividendna donosnost = D₁/P₀ = 2/17 = 11,76 % (deli se s SEDANJO ceno).'),
  mk('Ista delnica ABC. Kolikšna je pričakovana stopnja kapitalskega dobička?',
    pct(1 / 17 * 100), [pct(2 / 17 * 100), pct(1 / 18 * 100), pct(3 / 17 * 100)], 0,
    '(P₁ − P₀)/P₀ = (18 − 17)/17 = 5,88 %. Skupna donosnost 17,65 % = 11,76 + 5,88.'),
  mk('Delnica izplačuje 5 € dividende na leto (v nedogled). Zahtevana donosnost 10 %. Koliko ste pripravljeni plačati?',
    eur(50), [eur(45.45), eur(55), eur(500)], 2,
    'Stalna dividenda je večna renta: P = D/r = 5/0,10 = 50 €.'),
  mk('Podjetje izplačuje dividendo 1,36 € na leto in bo dividende rastle po 6 % letno. Strošek lastniškega kapitala 15 %. Kolikšna je cena delnice (Gordon)?',
    eur(1.36 * 1.06 / .09), [eur(1.36 / .09), eur(1.36 / .15), eur(1.36 * 1.06 / .15)], 1,
    'P₀ = D₁/(r − g) z D₁ = 1,36 · 1,06 = 1,4416; 1,4416/0,09 = 16,02 €. Brez rasti (1,36/0,15) bi bila cena 9,07 €. Pozor: v števec D₁, ne D₀.'),
  (() => {
    const P5 = 1.5 * 1.04 / .06, v = 1 / 1.1 ** 4 + (1.5 + P5) / 1.1 ** 5;
    return mk('Delnica prva tri leta ne izplačuje dividend; v 4. letu 1 €, v 5. letu 1,5 €, od 6. leta dalje rastejo po 4 %. Zahtevana donosnost 10 %. Koliko je vredna danes?',
      eur(v), [eur(1 / 1.1 ** 4 + (1.5 + 1.5 / .06) / 1.1 ** 5), eur(P5 / 1.1 ** 5), eur(1 / 1.1 ** 4 + 1.5 / 1.1 ** 5 + P5 / 1.1 ** 6)], 3,
      'Ob koncu 5. leta: P₅ = D₆/(r − g) = 1,56/0,06 = 26 €. Vse skupaj diskontiramo: 1/1,1⁴ + (1,5 + 26)/1,1⁵ = 17,76 €. Rast se začne od D₆, zato je D₆ = 1,5 · 1,04.');
  })(),
  mk('Podjetje je pravkar izplačalo 7,00 € dividende; dividende upadajo po 2 % letno. Zahtevana donosnost 10 %. Koliko ste pripravljeni plačati?',
    eur(7 * .98 / .12), [eur(7 * .98 / .08), eur(7 / .12), eur(7 / .10)], 0,
    'g = −2 %: D₁ = 7 · 0,98 = 6,86; r − g = 0,10 + 0,02 = 0,12 → 57,17 €. Napaka: odštevati 2 % namesto prištevati.'),
  mk('Dividendi 2,84 € (konec letos) in 3,01 € (naslednje leto), cena čez 2 leti 50,68 €, strošek lastniškega kapitala 8,3 %. Koliko plačate danes (delnico obdržite 2 leti)?',
    eur(2.84 / 1.083 + (3.01 + 50.68) / 1.083 ** 2), [eur(50.68 / 1.083 ** 2), eur(2.84 / 1.083 + 3.01 / 1.083 ** 2), eur(2.84 + 3.01 + 50.68)], 2,
    'P₀ = D₁/(1+r) + (D₂ + P₂)/(1+r)². Ceno čez 2 leti in drugo dividendo diskontiramo dve leti.'),
  mk('Delnica se prodaja po 45 €, čez leto bo dividenda 2,05 €, strošek lastniškega kapitala 16 %. Po kakšni ceni jo morate pričakovati tik po izplačilu dividende čez leto?',
    eur(45 * 1.16 - 2.05), [eur(45 * 1.16), eur(45 * 1.16 + 2.05), eur(45 - 2.05)], 1,
    'P₀ = (D₁ + P₁)/(1 + r) → P₁ = P₀(1 + r) − D₁ = 52,20 − 2,05 = 50,15 €.'),
  mk('Dividenda 1,00 € (julij 2028, rast 5 % letno), nobenih dividend pred tem, strošek kapitala 11 %. Vrednost delnice julija 2026?',
    eur(1 / .06 / 1.11), [eur(1 / .06), eur(1 / .06 / 1.11 ** 2), eur(1 / .11 / 1.11)], 3,
    'Julija 2027 (tik pred prvo dividendo čez leto) je vrednost D/(r − g) = 1/0,06 = 16,67 €; to diskontiramo še eno leto: 15,02 €.'),
  mk('Podjetje Dorpac ima dividendno donosnost 1,7 % in strošek lastniškega kapitala 7,4 %; dividende rastejo konstantno. Kolikšna je rast g?',
    pct(5.7), [pct(9.1), pct(7.4), pct(1.7)], 0,
    'r = D₁/P₀ + g → g = r − D₁/P₀ = 7,4 % − 1,7 % = 5,7 %.'),
  (() => {
    let v = 0; [1.47, 1.59, 1.71, 1.83, 1.95].forEach((d, i) => { v += d / 1.086 ** (i + 1); }); const P5 = 1.95 * 1.067 / (.086 - .067); v += P5 / 1.086 ** 5;
    return mk('Colgate je izplačal 1,35 €. Dividende rastejo 0,12 € letno še 5 let, nato 6,7 % letno. Strošek lastniškega kapitala 8,6 %. Cena po DDM?',
      eur(v), [eur(1.35 / (.086 - .067)), eur(v - 5), eur(1.47 / (.086 - .067))], 2,
      'D₁…D₅ = 1,47; 1,59; 1,71; 1,83; 1,95. P₅ = D₆/(r − g) = 1,95 · 1,067/0,019 = 109,51 €. Skupaj SV = 79,14 €.');
  })(),
  (() => {
    const r = 4.27 * 1.029 / 49.06 + .029; const np = 2.67 * 1.048 / (r - .048);
    return mk('Cooperton: dividenda 4,27 → 2,67 €, rast dividend se poveča z 2,9 % na 4,8 %, prejšnja cena 49,06 €. Kakšno ceno pričakujemo po napovedi in ali je širitev NSV > 0?',
      eur(np) + '; ne (cena pade)', [eur(np) + '; da (cena pade, a rast je višja)', eur(49.06 * 1.0) + '; da (cena je ista)', eur(2.67 / (r - .048)) + '; ne (cena pade)'], 0,
      'Najprej iz stare cene dobimo r = D₁/P + g = 4,27 · 1,029/49,06 + 0,029 = 11,86 %. Nova cena = 2,67 · 1,048/(0,1186 − 0,048) = 39,66 €. Cena pade, zato je širitev naložba z negativno NSV.');
  })(),
  (() => {
    let v = 0, d = .65; for (let t = 1; t <= 5; t++) { v += d / 1.08 ** t; if (t < 5) d *= 1.12; }
    const P5 = d * 1.02 / .06; v += P5 / 1.08 ** 5;
    return mk('Podjetje X bo čez leto izplačalo 0,65 €; dividende rastejo 12 % do 5. leta, nato 2 % letno. Strošek lastniškega kapitala 8 %. Vrednost delnice?',
      eur(v), [eur(.65 / (.08 - .02)), eur(v + 1.5), eur(0.65 / (.08 - .12))], 1,
      'D₅ = 0,65 · 1,12⁴ = 1,02; P₅ = D₅ · 1,02/(0,08 − 0,02) = 17,39 €; skupaj SV dividend 1.-5. leta in P₅/1,08⁵ = 15,07 €.');
  })(),
  Q('Katera trditev o dobičkonosni in nedobičkonosni rasti je NAPAČNA?', [
    'Če podjetje zadrži več dobička, lahko izplača manj dividend',
    'Podjetje lahko poveča rast tako, da zadrži več dobička',
    'Če podjetje želi dvigniti ceno delnice, mora vedno znižati dividendo in več investirati',
    'Znižanje dividende za naložbe dvigne ceno le, če imajo nove naložbe pozitivno NSV'], 2,
    'Samo rast z naložbami s pozitivno NSV (donosnost nad zahtevano) poveča ceno. Zadrževanje dobička brez dobrih naložb ceno zniža.'),
  Q('Katero diskontno stopnjo uporabimo pri diskontiranju dividend?', [
    'Tehtani povprečni strošek kapitala (WACC)',
    'Strošek dolga pred obdavčitvijo',
    'Strošek lastniškega kapitala',
    'Tehtani povprečni strošek kapitala po obdavčitvi'], 2,
    'Dividende so tok za lastnike, zato jih diskontiramo s stroškom lastniškega kapitala. WACC uporabimo pri FCF (tok za vse investitorje).'),
];

// ---------- Vaje 5: tveganje in donosnost ----------
const p5 = [.2, .3, .3, .2], A = [-.3, .1, .3, .4], B = [.05, .1, -.1, -.05];
const E5 = (a) => a.reduce((s, x, i) => s + x * p5[i], 0);
const S5 = (a) => Math.sqrt(a.reduce((s, x, i) => s + p5[i] * (x - E5(a)) ** 2, 0));
const eA = E5(A), sA = S5(A), eB = E5(B), sB = S5(B);
const cov = A.reduce((s, x, i) => s + p5[i] * (x - eA) * (B[i] - eB), 0);
const sP = Math.sqrt(.09 * sA * sA + .49 * sB * sB + 2 * .3 * .7 * cov);
const betaF = .1 * .5 + .3 * 1 + .4 * 1.5 + .2 * 2.3;
const v5 = [
  mk('Delnica A: donosnost −30 %, 10 %, 30 %, 40 % z verjetnostmi 0,2; 0,3; 0,3; 0,2. Kolikšna je pričakovana donosnost?',
    pct(eA * 100), [pct(12.5), pct(10), pct(37.5)], 1,
    'E(r) = Σ p · r = 0,2·(−30) + 0,3·10 + 0,3·30 + 0,2·40 = 14 %. Navadno povprečje (12,5 %) ne upošteva verjetnosti.'),
  mk('Delnica A (E = 14 %): kolikšna sta standardni odklon in koeficient variacije?',
    `σ = ${pct(sA * 100)}; KV = ${num(sA / eA)}`, [`σ = ${pct(sA * sA * 100)}; KV = ${num(sA * sA / eA)}`, `σ = ${pct(sA * 100)}; KV = ${num(eA / sA)}`, `σ = ${pct(24.58 / 2)}; KV = ${num(sA / eA / 2)}`], 0,
    'σ = √Σ p (r − E)²; KV = σ/E = 24,58/14 = 1,76 (tveganje na enoto donosa). Varianca (σ²) ni v istih enotah kot σ.'),
  mk('Delnica B: donosnost 5 %, 10 %, −10 %, −5 % (iste verjetnosti). Koliko je E(B) in kaj to pomeni za koeficient variacije?',
    `E = ${pct(eB * 100)}; KV ni definiran (deljenje z 0)`, [`E = ${pct(2.5)}; KV = ${num(sB / .025)}`, `E = ${pct(0)}; KV = ${num(0)}`, `E = ${pct(5)}; KV = ${num(sB / .05)}`], 0,
    'E(B) = 0,2·5 + 0,3·10 + 0,3·(−10) + 0,2·(−5) = 0 %. KV = σ/E zahteva E ≠ 0, zato pri B ne moremo uporabiti KV.'),
  mk('Portfelj: 30 % delnice A in 70 % delnice B (korelacija A,B je −0,63). Kolikšna je pričakovana donosnost in standardni odklon portfelja?',
    `E = ${pct((.3 * eA + .7 * eB) * 100)}; σ = ${pct(sP * 100)}`, [`E = ${pct((.3 * eA + .7 * eB) * 100)}; σ = ${pct((.3 * sA + .7 * sB) * 100)}`, `E = ${pct(7)}; σ = ${pct(sP * 100)}`, `E = ${pct((.7 * eA + .3 * eB) * 100)}; σ = ${pct(sP * 100 * 2)}`], 2,
    'E(P) = 0,3·14 + 0,7·0 = 4,2 %. σ(P) ni tehtano povprečje (13,0 %), ker diverzifikacija zmanjša tveganje: σ² = w₁²σ₁² + w₂²σ₂² + 2w₁w₂·Cov = 5,84 %.'),
  mk('Netvegana donosnost 4 %, tržna 9 %, beta delnice X = 1,2. Kolikšna je zahtevana donosnost X (CAPM)?',
    pct(4 + 1.2 * 5, 1), [pct(10.8, 1), pct(9, 1), pct(13.6, 1)], 0,
    'r = rf + β (rm − rf) = 4 + 1,2 · 5 = 10 %.'),
  mk('Isto, a pričakovana inflacija naraste za 2 o. t. (rf in rm oba narasteta za 2 o. t.). Zahtevana donosnost X?',
    pct(12, 1), [pct(10, 1), pct(12.4, 1), pct(14.4, 1)], 1,
    'rf = 6 %, rm = 11 %, premija ostane 5 %: 6 + 1,2 · 5 = 12 %. Inflacija prestavi celotno SML navzgor za 2 o. t.'),
  mk('Isto kot na začetku (rf 4 %, rm 9 %), a se tržna premija za tveganje poveča za 3 o. t. (rf ostane). Zahtevana donosnost X?',
    pct(4 + 1.2 * 8, 1), [pct(4 + 3 + 1.2 * 5, 1), pct(10, 1), pct(4 + 1.2 * 3, 1)], 3,
    'Premija 8 %: 4 + 1,2 · 8 = 13,6 %. Premija se pomnoži z betо, zato je učinek 1,2 · 3 = 3,6 o. t.'),
  mk('Obe spremembi hkrati (inflacija +2 o. t., tržna premija +3 o. t.). Kolikšna je zahtevana donosnost X in za koliko se je spremenila?',
    `${pct(15.6, 1)}; +5,6 o. t.`, [`${pct(15, 1)}; +5,0 o. t.`, `${pct(15.6, 1)}; +3,6 o. t.`, `${pct(14.4, 1)}; +4,4 o. t.`], 0,
    'rf = 6 %, premija = 8 %: 6 + 1,2 · 8 = 15,6 %. Učinek: 2 (rf) + 1,2 · 3 (premija) = 5,6 o. t.'),
  mk('Sklad: A 10 % (β 0,5), B 30 % (β 1,0), C 40 % (β 1,5), D 20 % (β 2,3). rf 3 %, tržna premija 5,5 %. Kolikšna je beta sklada?',
    num(betaF), [num((.5 + 1 + 1.5 + 2.3) / 4), num(2.3), num(1.0)], 1,
    'Beta portfelja = tehtano povprečje bet = 0,1·0,5 + 0,3·1,0 + 0,4·1,5 + 0,2·2,3 = 1,41 (navadno povprečje 1,325 ni pravilno).'),
  mk('Isti sklad: kolikšna je pričakovana donosnost sklada?',
    pct(3 + betaF * 5.5), [pct(3 + 1.325 * 5.5), pct(betaF * 5.5), pct(3 + 1.41 * 8.5)], 2,
    'E(r) = rf + β · premija = 3 + 1,41 · 5,5 = 10,76 %. Pozor: premija je že razlika (rm − rf), rf se ne odšteva ponovno.'),
  mk('Premoženje 10 enakih delnic ima beto 1,64; beta delnice A je 2. Delnico A zamenjamo z B in je beta portfelja 1,55. Kolikšna je beta B?',
    num(1.1, 1), [num(0.9, 1), num(1.55, 1), num(1.64 - 2 + 1.55, 1)], 0,
    'Vsota bet 10 delnic: 16,4; brez A: 14,4. Po zamenjavi: 15,5 → β(B) = 15,5 − 14,4 = 1,1.'),
  mk('Delnica A: E = 13 %, β = 0,9; rf = 5 %, tržni portfelj E = 15 %. Kakšna je zahtevana donosnost po CAPM in kaj to pomeni?',
    `${pct(14, 0)}: precenjena (E < zahtevana) - prodati`, [`${pct(14, 0)}: podcenjena (E > zahtevana) - kupiti`, `${pct(13, 0)}: pravilno vrednotena`, `${pct(15, 0)}: precenjena - prodati`], 1,
    'r = 5 + 0,9 · 10 = 14 % > pričakovana 13 % → delnica ponuja premalo za tveganje, cena je previsoka (alfa −1 %).'),
  mk('Delnica C: E = 25 %, β = 1,8, rf = 5 %, tržna 15 %. Kakšno je vrednotenje po CAPM?',
    `Zahtevana ${pct(23, 0)}: podcenjena (alfa +2 %)`, [`Zahtevana ${pct(23, 0)}: precenjena (alfa −2 %)`, `Zahtevana ${pct(25, 0)}: pravilno vrednotena`, `Zahtevana ${pct(27, 0)}: podcenjena (alfa +2 %)`], 3,
    '5 + 1,8 · 10 = 23 % < pričakovana 25 % → naložba daje več, kot zahteva tveganje, zato je podcenjena; delnica B (16 % = 5 + 1,1 · 10) je pravilno vrednotena.'),
  mk('Manjkajoči podatki iz tabele: σ(m) = 10 %, β(A) = 0,9, σ(A) = 12 %. Kolikšna je korelacija ρ(A, m)?',
    num(.75), [num(.9), num(.9 * .12 / .1), num(.12 / .1)], 3,
    'β = ρ · σ_i/σ_m → ρ = β · σ_m/σ_i = 0,9 · 10/12 = 0,75. Iz β(C) pa: β = 0,75 · 24/10 = 1,8.'),
];

// ---------- Vaje 6: CAPM in stroški kapitala ----------
const v6 = [
  mk('Pepsico: β = 0,72, rf = 2 %, pričakovana tržna donosnost 6 %. Kolikšen je lastniški strošek kapitala?',
    pct(2 + .72 * 4), [pct(.72 * 6), pct(2 + .72 * 6), pct(.72 * 4)], 0,
    'r = rf + β (rm − rf) = 2 + 0,72 · 4 = 4,88 %. Premija je 6 − 2 = 4 %, ne celotna tržna donosnost.'),
  mk('Alcoa β = 1,73, Hormel β = 1,68, pričakovana presežna donosnost trga 3 %. Katero podjetje ima višji strošek kapitala in za koliko?',
    'Alcoa; za 0,15 o. t.', ['Hormel; za 0,15 o. t.', 'Alcoa; za 0,05 o. t.', 'Alcoa; za 1,5 o. t.'], 1,
    'Razlika = Δβ · premija = (1,73 − 1,68) · 3 % = 0,15 o. t. Višja beta pomeni višji zahtevani donos.'),
  mk('Arnell je izdal 10 mio € dolga (le obresti, trajno), obrestna mera 6 %, mejna davčna stopnja 35 %. Kolikšen je letni davčni ščit obresti?',
    eur(.21, 2).replace(' €', ' mio €'), [num(.6, 2) + ' mio €', num(.39, 2) + ' mio €', num(3.5, 2) + ' mio €'], 3,
    'Davčni ščit = obresti · t = 10 · 0,06 · 0,35 = 0,21 mio € na leto.'),
  mk('Isti Arnell. Kolikšna je sedanja vrednost davčnega ščita (tveganje enako tveganju posojila), pri obrestni meri 6 %?',
    num(3.5, 2) + ' mio €', [num(.21, 2) + ' mio €', num(10, 2) + ' mio €', num(6.5, 2) + ' mio €'], 1,
    'Večna renta: PV = 0,21/0,06 = 3,5 mio € = t · D. Pri 5 % je ščit 0,175 mio € letno, a PV je spet 0,175/0,05 = 3,5 mio € - ni odvisna od mere, dokler je dolg trajen.'),
  mk('KRKA: D = 9,10 €, P = 261 €, g = 3 %. Strošek zadržanega dobička po metodi pričakovane donosnosti (D₁/P + g)?',
    pct((9.10 * 1.03 / 261 + .03) * 100), [pct((9.10 / 261 + .03) * 100), pct(9.10 * 1.03 / (261 * .85) * 100 + 3), pct(9.10 / 261 * 100)], 2,
    'D₁ = 9,10 · 1,03 = 9,373; 9,373/261 = 3,59 % + 3 % = 6,59 %. Pozor: D₀ → D₁.'),
  mk('KRKA: strošek novoizdanih delnic, če so stroški izdaje (flotacije) 15 %?',
    pct((9.10 * 1.03 / (261 * .85) + .03) * 100), [pct((9.10 * 1.03 / 261 + .03) * 100), pct((9.10 * 1.03 / (261 * 1.15) + .03) * 100), pct((9.10 * 1.03 / 261 + .03) * 100 * 1.15)], 1,
    'Neto izkupiček je P · (1 − F) = 261 · 0,85 = 221,85 €: 9,373/221,85 + 3 % = 7,22 %. Novi kapital je dražji od zadržanega dobička.'),
  mk('KRKA po CAPM: rf 4 %, β 0,7563, tržna premija 5 %. Strošek lastniškega kapitala?',
    pct(4 + .7563 * 5), [pct(.7563 * 5), pct(4 + .7563 * 9), pct((4 + 5) * .7563)], 3,
    'r = 4 + 0,7563 · 5 = 7,78 %.'),
  mk('KRKA: WACC pri strukturi 70 % lastniškega kapitala (strošek zadržanega dobička po CAPM 7,78 %) in 30 % dolga (5 % pred davkom, davek 15 %)?',
    pct(.7 * (4 + .7563 * 5) + .3 * 5 * .85), [pct(.7 * (4 + .7563 * 5) + .3 * 5), pct(.7 * 5 * .85 + .3 * (4 + .7563 * 5)), pct(.5 * (4 + .7563 * 5) + .5 * 5 * .85)], 0,
    'WACC = w_E · r_E + w_D · r_D · (1 − t) = 0,7 · 7,78 + 0,3 · 5 · 0,85 = 6,72 %. Dolg vedno po davku, uteži po tržnih vrednostih.'),
  mk('Podjetje ima 10 mio delnic po 30 € in 150 mio € dolga (6 %), rf 4 %, premija 5 %, beta = 1, davek 20 %. Kolikšen je strošek kapitala (WACC)?',
    pct(2 / 3 * 9 + 1 / 3 * 6 * .8), [pct(2 / 3 * 9 + 1 / 3 * 6), pct(.5 * 9 + .5 * 4.8), pct(9)], 2,
    'E = 10 · 30 = 300 mio, D = 150 mio → uteži 2/3 in 1/3. r_E = 4 + 1 · 5 = 9 %. WACC = 2/3 · 9 + 1/3 · 6 · 0,8 = 7,6 %.'),
  mk('Podjetje ima 3,67 mrd € čistega dobička, izplača 42,3 % kot dividende, struktura 60 % lastniški kapital, 40 % dolg. Kolikšen kapitalski proračun je mogoč brez novih navadnih delnic?',
    num(3.67 * (1 - .423) / .6, 3) + ' mrd €', [num(3.67 * (1 - .423), 3) + ' mrd €', num(3.67 * (1 - .423) * .6, 3) + ' mrd €', num(3.67, 3) + ' mrd €'], 1,
    'Zadržani dobiček = 3,67 · 0,577 = 2,118 mrd € predstavlja 60 % proračuna → proračun = 2,118/0,6 = 3,529 mrd € (od tega 1,41 mrd € dolga).'),
  (() => {
    const w1 = .6 * .105 + .4 * .05 * .8, w2 = .6 * .123 + .4 * .05 * .8;
    return mk('Isto podjetje: zadržan dobiček stane 10,5 %, nove delnice 12,3 %, dolg 5 % (6 % nad 3 mrd €), davek 20 %. Projekti: P1 4 mrd € (10 %), P2 3 mrd € (9,5 %), P3 5 mrd € (8 %). Katere izvedemo?',
      'P1 in P2 (skupaj 7 mrd €)', ['Samo P1', 'P1, P2 in P3', 'P2 in P3'], 0,
      `Mejni WACC: do 3,53 mrd € ${pct(w1 * 100)}, nato ${pct(w2 * 100)} (nove delnice), nad 7,5 mrd € 9,30 % (dražji dolg). P1 (10 %) in P2 (9,5 %) presegata 8,98 %, P3 (8 %) je pod mejnim WACC → zavrnemo.`);
  })(),
  mk('Weston: divizija brezalkoholnih pijač β = 0,68, FCF 55 mio € (rast 3 %); rf 2 %, premija 4 %. Kolikšen je strošek kapitala in vrednost divizije?',
    `${pct(2 + .68 * 4)}; ${num(55 / (.0472 - .03), 0)} mio €`, [`${pct(2 + .68 * 4)}; ${num(55 / .0472, 0)} mio €`, `${pct(.68 * 6)}; ${num(55 / (.0408 - .03), 0)} mio €`, `${pct(2 + .68 * 4)}; ${num(55 * 1.03 / (.0472 - .03), 0)} mio €`], 3,
    'r = 2 + 0,68 · 4 = 4,72 %; V = FCF/(r − g) = 55/(0,0472 − 0,03) = 3.198 mio €. Napaka: v števec ne gre dodatno pomnožiti z (1 + g), ker je FCF že pričakovani tok prihodnjega leta. Divizija kemikalij: r = 6,16 %, V = 70/0,0416 = 1.683 mio €.'),
];

// ---------- Teorija ----------
const teor5 = [
  Q('Kaj meri standardni odklon donosnosti naložbe?', [
    'Samo sistematično tveganje, ki ga ni mogoče odpraviti',
    'Celotno tveganje (sistematično in nesistematično)',
    'Občutljivost donosa na gibanje tržnega portfelja',
    'Pričakovano razliko med donosom naložbe in netvegano mero'], 1,
    'σ meri raztros donosov okoli povprečja, torej celotno tveganje. Občutljivost na trg meri beta.'),
  Q('Kaj meri beta koeficient delnice?', [
    'Celotno nihanje donosa delnice okoli njenega povprečja',
    'Delež dobička, ki ga podjetje izplača v dividendah',
    'Občutljivost donosa delnice na donos tržnega portfelja (sistematično tveganje)',
    'Korelacijo med donosom delnice in donosom netvegane naložbe'], 2,
    'β = Cov(r_i, r_m)/Var(r_m) = ρ · σ_i/σ_m. Beta 1,5 pomeni, da delnica ob 1 % spremembi trga v povprečju zraste ali pade za 1,5 %.'),
  Q('Katero tveganje lahko z diverzifikacijo (razpršitvijo) odpravimo?', [
    'Sistematično (tržno) tveganje',
    'Nesistematično (specifično) tveganje posameznega podjetja',
    'Inflacijsko tveganje',
    'Vse tveganje, če imamo vsaj dve delnici'], 1,
    'Specifična tveganja podjetij se v dobro razpršenem portfelju izničijo. Tržno (sistematično) tveganje ostane in zanj trg plača premijo.'),
  Q('Za kaj vlagatelji z dobro razpršenim portfeljem zahtevajo premijo za tveganje?', [
    'Za celotno tveganje posamezne delnice',
    'Za sistematično tveganje, merjeno z beto',
    'Za nesistematično tveganje podjetja',
    'Za vsako tveganje, ki ga prevzamejo'], 1,
    'Nesistematično tveganje odpravijo z razpršitvijo, zato ga trg ne nagradi. Zahtevana donosnost je odvisna samo od bete.'),
  Q('Kolikšni sta beta tržnega portfelja in beta netvegane naložbe?', [
    'Tržni portfelj 1, netvegana naložba 0',
    'Tržni portfelj 0, netvegana naložba 1',
    'Oba 1, ker sta oba brez tveganja',
    'Tržni portfelj 1, netvegana naložba −1'], 0,
    'Tržni portfelj se giblje točno s trgom (β = 1); netvegana naložba se ne giblje s trgom (β = 0, σ = 0).'),
  Q('Kako izračunamo beto portfelja?', [
    'Kot standardni odklon bet posameznih delnic',
    'Kot tehtano povprečje bet posameznih delnic (uteži = deleži v vrednosti portfelja)',
    'Kot vsoto bet posameznih delnic',
    'Kot najvišjo beto med delnicami v portfelju'], 1,
    'β_P = Σ w_i β_i. Beta portfelja je linearna, standardni odklon portfelja pa ni tehtano povprečje σ (zaradi korelacije).'),
  Q('Kaj pove koeficient variacije (σ/E)?', [
    'Tveganje na enoto pričakovane donosnosti',
    'Delež sistematičnega tveganja v celotnem tveganju',
    'Beta koeficient naložbe',
    'Razliko med donosnostjo naložbe in trga'], 0,
    'Nižji KV pomeni manj tveganja za enoto donosa; ni uporaben, če je E = 0 ali negativna.'),
  Q('Kako vpliva nižja korelacija med delnicama na portfelj, sestavljen iz obeh?', [
    'Pričakovana donosnost portfelja se zmanjša',
    'Standardni odklon portfelja se poveča',
    'Nič, korelacija ne vpliva na tveganje portfelja',
    'Standardni odklon portfelja se zmanjša (večja diverzifikacija)'], 3,
    'Pričakovana donosnost je tehtano povprečje, tveganje pa je pri ρ < 1 manjše od tehtanega povprečja σ. Največ koristi je pri negativni korelaciji.'),
  Q('Kaj je tržna premija za tveganje?', [
    'Pričakovana tržna donosnost, E(r_m)',
    'Razlika E(r_m) − r_f',
    'Beta tržnega portfelja',
    'Razlika med donosnostjo delnice in obveznice istega podjetja'], 1,
    'To je dodatna donosnost, ki jo vlagatelji zahtevajo za prevzem tveganja tržnega portfelja v primerjavi z netvegano naložbo.'),
  Q('Kaj prikazuje premica trga vrednostnih papirjev (SML)?', [
    'Razmerje med celotnim tveganjem (σ) in pričakovano donosnostjo portfelja',
    'Razmerje med betо in zahtevano donosnostjo: r = r_f + β (r_m − r_f)',
    'Razmerje med ceno delnice in dividendo',
    'Razmerje med dolgom in lastniškim kapitalom podjetja'], 1,
    'Naložbe nad SML (E > zahtevana) so podcenjene (kupi), pod SML precenjene (prodaj).'),
  Q('Pričakovana donosnost delnice je pod njeno zahtevano donosnostjo po CAPM. Kaj to pomeni?', [
    'Delnica je podcenjena, zato jo kupimo',
    'Delnica je pravilno vrednotena',
    'Delnica je precenjena (cena je previsoka), zato jo prodamo',
    'Delnica ima negativno beto'], 2,
    'Alfa < 0: naložba ne nagradi tveganja. Cena bo morala pasti, da se pričakovana donosnost dvigne na zahtevano.'),
  Q('Kaj se zgodi s SML, če se pričakovana inflacija poveča za 2 o. t.?', [
    'SML se vzporedno premakne navzgor za 2 o. t. (rf in r_m narasteta za 2 o. t.)',
    'SML postane strmejša, naklon se poveča za 2',
    'SML se premakne navzdol',
    'Ostane enaka, ker beta ostane enaka'], 0,
    'Višja inflacija dvigne nominalne mere; tržna premija (naklon SML) ostane, razen če se spremeni odnos do tveganja.'),
];

const teor6 = [
  Q('Kako po CAPM izračunamo zahtevano donosnost lastniškega kapitala?', [
    'r_E = r_f + β · (E(r_m) − r_f)',
    'r_E = r_f + β · E(r_m)',
    'r_E = β · r_f + E(r_m)',
    'r_E = E(r_m) − β · r_f'], 0,
    'Netvegana donosnost + beta × tržna premija za tveganje.'),
  Q('Kako po metodi pričakovane stopnje donosa (Gordon) ocenimo strošek zadržanega dobička?', [
    'r_E = D₀/P₀ − g',
    'r_E = D₁/P₀ + g',
    'r_E = P₀/D₁ + g',
    'r_E = D₁/(P₀ · (1 − F)) − g'], 1,
    'Dividendna donosnost (D₁ = D₀(1 + g)) + pričakovana rast dividend.'),
  Q('Kako flotacijski stroški vplivajo na strošek novoizdanih delnic?', [
    'Znižajo ga, ker podjetje prejme več kapitala',
    'Ne vplivajo, plača jih država',
    'Povečajo ga: r = D₁/(P₀ (1 − F)) + g, ker je neto izkupiček manjši od tržne cene',
    'Povečajo samo strošek dolga, ne pa lastniškega kapitala'], 2,
    'Zato je strošek novih delnic višji od stroška zadržanega dobička (KRKA: 7,22 % proti 6,59 %).'),
  Q('Kako izračunamo strošek dolga po davkih?', [
    'r_D · (1 + t)',
    'r_D / (1 − t)',
    'r_D · (1 − t)',
    'r_D − t'], 2,
    'Obresti znižujejo davčno osnovo, zato je davčni ščit t · obresti in je efektivni strošek r_D (1 − t).'),
  Q('Kolikšna je sedanja vrednost davčnega ščita obresti pri trajnem dolgu D, če je tveganje ščita enako tveganju dolga?', [
    'r_D · D',
    't · D',
    '(1 − t) · D',
    't · D / r_D'], 1,
    'Letni ščit t · r_D · D, večna renta, diskontirana z r_D: PV = t · D (Arnell: 0,35 · 10 = 3,5 mio €).'),
  Q('Kako se izračuna WACC?', [
    'Tehtano povprečje stroškov dolga (po davku) in lastniškega kapitala z uteženimi tržnimi vrednostmi',
    'Navadno povprečje stroška dolga in stroška lastniškega kapitala',
    'Tehtano povprečje stroškov z uteženimi knjigovodskimi vrednostmi in dolgom pred davkom',
    'Strošek lastniškega kapitala, povečan za davčno stopnjo'], 0,
    'WACC = w_E · r_E + w_D · r_D · (1 − t); uteži so tržne vrednosti (delnice po tržni ceni), ne bilančne.'),
  Q('Kako izračunamo uteži kapitalske strukture za WACC, če ima podjetje 10 mio delnic po 30 € in 150 mio € dolga?', [
    'Lastniški kapital 50 %, dolg 50 %',
    'Lastniški kapital 67 %, dolg 33 %',
    'Lastniški kapital 33 %, dolg 67 %',
    'Lastniški kapital 100 %, ker je dolg netržen'], 1,
    'E = 300 mio €, D = 150 mio € → w_E = 300/450 = 2/3, w_D = 1/3.'),
  Q('Zakaj mejni strošek kapitala naraste, ko se izčrpa zadržani dobiček?', [
    'Ker davek na dobiček naraste',
    'Ker postane dolg cenejši od lastniškega kapitala',
    'Ker mora podjetje izplačati dividende',
    'Ker nov lastniški kapital (nove delnice) zaradi flotacijskih stroškov stane več'], 3,
    'Mejni strošek kapitala raste v stopnjah: najprej zadržan dobiček, nato nove delnice, nazadnje dražji dolg (višja mera nad določenim zneskom).'),
  Q('Kako izberemo projekte po metodi mejnega stroška kapitala?', [
    'Izvedemo vse projekte z donosnostjo nad netvegano mero',
    'Izvedemo samo najdonosnejši projekt',
    'Izvedemo projekte, katerih donosnost presega mejni WACC pri tem obsegu naložb (presek IOS in MCC)',
    'Izvedemo projekte po vrstnem redu velikosti, dokler ne porabimo dobička'], 2,
    'Projekte uredimo po donosnosti (IOS), jih primerjamo z naraščajočim mejnim stroškom kapitala (MCC); optimalni proračun je v preseku.'),
  Q('Podjetje ima divizijo z veliko višjim tveganjem kot ostale. Katero diskontno stopnjo uporabimo za projekt v tej diviziji?', [
    'WACC celotnega podjetja',
    'Netvegano obrestno mero',
    'Strošek dolga podjetja po davku',
    'Strošek kapitala, ki odraža tveganje divizije (beta divizije)'], 3,
    'Če uporabimo WACC podjetja za vse projekte, bomo prevrednotili tvegane in podvrednotili varne projekte. Weston: beta in strošek kapitala za vsako divizijo posebej.'),
  Q('Podjetje se financira izključno z lastniškim kapitalom. Kako vrednotimo divizije?', [
    'Z diskontiranjem FCF vsake divizije s stroškom kapitala po bete divizije (Gordon: FCF/(r − g))',
    'Z diskontiranjem dividend celotnega podjetja z netvegano mero',
    'Z knjigovodsko vrednostjo sredstev divizije',
    'Z navadnim povprečjem tržnih kazalnikov podjetja'], 0,
    'Brez dolga je WACC = strošek lastniškega kapitala. Vrednost podjetja je vsota vrednosti divizij.'),
];

const kartice = [
  ['Pričakovana donosnost', 'E(r) = Σ p_i · r_i; σ² = Σ p_i (r_i − E)²; KV = σ/E.'],
  ['Portfelj dveh delnic', 'E(P) = w₁E₁ + w₂E₂; σ² = w₁²σ₁² + w₂²σ₂² + 2w₁w₂Cov. Cov = ρσ₁σ₂. Nižja ρ → manjši σ(P).'],
  ['Sistematično / nesistematično tveganje', 'Sistematično (tržno) merimo z beto in ga ni mogoče razpršiti; nesistematično (specifično) z razpršitvijo odpravimo.'],
  ['Beta', 'β = Cov(r_i, r_m)/Var(r_m) = ρ · σ_i/σ_m. Beta portfelja = tehtano povprečje bet. β_m = 1, β_rf = 0.'],
  ['CAPM / SML', 'r_E = r_f + β · (E(r_m) − r_f). Nad SML: podcenjena (kupi); pod SML: precenjena (prodaj).'],
  ['Strošek zadržanega dobička', 'r = D₁/P₀ + g (Gordon) ali CAPM. Novi delnice: D₁/(P₀(1 − F)) + g.'],
  ['Strošek dolga in ščit', 'r_D(1 − t). PV davčnega ščita trajnega dolga = t · D.'],
  ['WACC', 'w_E r_E + w_D r_D (1 − t); uteži po tržnih vrednostih. Mejni strošek kapitala narašča po stopnjah.'],
  ['Cena obveznice', 'P = C · PVIFA(y, n) + F/(1 + y)ⁿ; polletno: mera y/2, 2n obdobij. Premija: kupon > y.'],
  ['Tekoča donosnost / YTM', 'Tekoča = kupon/cena (ne upošteva premije/diskonta); YTM = diskontna stopnja, pri kateri je SV = cena.'],
  ['Polna in čista cena', 'Polna = čista + natečene obresti; natečene = kupon · (delež obdobja od zadnjega kupona).'],
  ['Delnice: Gordon, sestavljeni model', 'P₀ = D₁/(r − g); rast po fazah: P_N = D_{N+1}/(r − g), diskontiramo še N let.'],
];

module.exports = { v3, v4, v5, v6, teor5, teor6, kartice };
