/* Poslovne finance 1 - Vaje 3-6: obveznice, delnice, tveganje in donosnost, CAPM in stroški kapitala.
   Vir: School/.../Poslovne finance 1/Vaje/PF1 vaje 1-6 2026_27.pdf (naloge; rešitve izračunane tu).
   Številke se računajo ob zagonu (ni ročno prepisanih rezultatov); napačni odgovori so tipične napake pri računanju. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
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
  withId('qxfdgnf', { q: "Podjetje ima v obtoku obveznico za 1.000 € z letnim kuponom 5 %, ki dospe čez 7 let. Primerljive obveznice danes prinašajo 7 %. Kolikšna je njena cena?",
      options: ["1.000,00 €","980,15 €","892,21 €","1.124,61 €"],
      correct: 2,
      explanation: "Kupon (50 €) diskontiramo z zahtevano donosnostjo 7 %, ne s kuponsko mero: 50 · PVIFA(7 %, 7) + 1.000/1,07⁷. Kupon < zahtevana donosnost → diskont (cena pod 1.000 €)." }),
  withId('qzxx5bm', { q: "Ista obveznica (1.000 €, kupon 5 %, 7 let). Koliko bi zanjo plačali, če bi zahtevali le 3 % donosnosti?",
      options: ["1.124,61 €","892,21 €","1.000,00 €","1.050,00 €"],
      correct: 0,
      explanation: "50 · PVIFA(3 %, 7) + 1.000/1,03⁷. Zahtevana donosnost je pod kuponom, zato je cena nad nominalno vrednostjo (premija)." }),
  withId('qz1bx74', { q: "Obveznica za 1.000 € dospe čez 20 let in nosi 6,5 % kupon, ki se izplačuje dvakrat letno. Koliko znaša posamezno kuponsko plačilo?",
      options: ["65,00 €","32,50 €","6,50 €","16,25 €"],
      correct: 1,
      explanation: "Letni kupon 65 € se izplača v dveh obrokih: 65/2 = 32,50 €. Pri polletnih kuponih računamo s 40 obdobji in polovično mero." }),
  withId('qgcgu13', { q: "Koliko je vredna ta obveznica (1.000 €, 20 let, 6,5 % kupon dvakrat letno), če vlagatelji zahtevajo 9 % letno?",
      options: ["771,79 €","1.000,00 €","776,48 €","769,98 €"],
      correct: 3,
      explanation: "32,50 · PVIFA(4,5 %, 40) + 1.000/1,045⁴⁰. Pazljivo: mera 9 %/2 = 4,5 % in 40 obdobij. Letni račun (20 let, 9 %) da napačen rezultat (771,79 €)." }),
  withId('q28iiaf', { q: "Štiriletna obveznica za 1.000 € nosi 9 % kupon, plačan v dveh polletnih obrokih. Koliko je vredna, če vlagatelji zahtevajo 7 %?",
      options: ["850,72 €","1.068,74 €","1.000,00 €","1.080,00 €"],
      correct: 1,
      explanation: "45 · PVIFA(3,5 %, 8) + 1.000/1,035⁸. Premija, ker je kupon (9 %) višji od zahtevane donosnosti (7 %). Napaka: polletni kupon z letno mero 7 % (850,72 €)." }),
  (() => { // 4: izpuščeni kuponi
    let p = 0; for (let t = 1; t <= 10; t++) { let c = t <= 4 ? 0 : t <= 8 ? 140 : 70; if (t === 10) c += 1000; p += c / 1.1 ** t; }
    return withId('qdgdgzc', { q: "Obveznica z naraščajočim kuponom: nominalna vrednost 1.000 €, 8 let, letni kupon 3 % v letih 1-3, 6 % v letih 4-6 in 9 % v letih 7-8. Zahtevana donosnost 9 %. Kolikšna je vrednost?",
        options: ["833,96 €","667,91 €","789,48 €","958,58 €"],
        correct: 2,
        explanation: "Vsak tok diskontiramo posebej: 30 v letih 1-3, 60 v letih 4-6, 90 v 7. letu in 90 + 1.000 v 8. letu. Ker tokovi niso enaki, anuitetne formule ne uporabimo za vse hkrati. S povprečnim kuponom 6 % bi dobili 833,96 € - napaka, ker so visoki kuponi na koncu in jih diskontiramo močneje." });
  })(),
  withId('q1472chl', { q: "Koliko stane obveznica brez kuponov za 1.000 €, ki dospe čez 8 let, če je njena donosnost do dospetja 6,8 %?",
      options: ["590,79 €","647,67 €","456,00 €","630,96 €"],
      correct: 0,
      explanation: "1.000/1,068⁸. Brezkuponska obveznica ima en sam tok ob zapadlosti; obrestno-obrestni diskont, ne navadni." }),
  withId('q10w5kjz', { q: "Obveznica za 1.000 € s 4 % kuponom dospe čez 6 let; na borzi je njen tečaj 96,16 (cena 961,60 €). Kolikšna je tekoča donosnost?",
      options: ["4,00 %","4,75 %","3,85 %","4,16 %"],
      correct: 3,
      explanation: "Tekoča donosnost = letni kupon / cena = 40/961,60 = 4,16 %. Ne upošteva dobička ob zapadlosti (obveznica kotira z diskontom)." }),
  (() => {
    let lo = 0, hi = .5; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; bond(1000, .05, m, 5) > 1035 ? lo = m : hi = m; }
    return withId('q1owgek7', { q: "Pri isti obveznici (1.000 €, kupon 4 %, 6 let, cena 961,60 €) izračunajte donosnost do dospetja. Kolikšna je YTM?",
        options: ["4,16 %","4,75 %","4,00 %","7,99 %"],
        correct: 1,
        explanation: "YTM je diskontna stopnja, pri kateri je SV plačil = 961,60 € (poskušanje ali preglednica, RATE): 4,75 %. Ker je cena pod nominalno, je YTM nad kuponom in nad tekočo donosnostjo." });
  })(),
  withId('q7890ag', { q: "Obveznico brez kuponov za 1.000 €, ki dospe čez 7 let, lahko danes kupite za 643,51 €. Kolikšna je njena donosnost do dospetja?",
      options: ["7,91 %","6,00 %","6,50 %","7,00 %"],
      correct: 2,
      explanation: "YTM = (1.000/643,51)^(1/7) − 1 = 6,50 %. Navadna delitev (donos/7 = 7,91 %) ne upošteva obrestnih obresti." }),
  withId('q1czcsb1', { q: "Dvoletni netvegani vrednostni papir, 1.000 €, kupon 4,5 %. YTM za prvo leto je 3,2 %, za drugo 3,6 %. Kolikšna je današnja cena?",
      options: ["1.017,24 €","1.024,80 €","1.017,07 €","1.000,00 €"],
      correct: 0,
      explanation: "Vsak tok diskontiramo z lastno mero: 45/1,032 + 1.045/1,036². Kupon 4,5 % je nad obema merama, zato obveznica kotira s premijo." }),
  withId('q1ra4duz', { q: "Obveznica za 1.000 € s 6 % kuponom (izplačilo polletno) dospe čez 9 let, njena YTM je 7,25 %. Kolikšna je cena in ali kotira s premijo ali diskontom?",
      options: ["918,41 € (diskont)","918,41 € (premija)","1.000,00 € (po nominalni vrednosti)","919,42 € (diskont)"],
      correct: 0,
      explanation: "30 · PVIFA(3,625 %, 18) + 1.000/1,03625¹⁸. Kupon 6 % < YTM 7,25 % → diskont. Če bi bila kuponska mera enaka YTM, bi bila cena natanko 1.000 €." }),
  withId('qbkq9a6', { q: "Obveznica z 9 leti do dospetja (1.000 €, kupon 6 %, polletni kuponi) ima YTM 7,25 %. Kolikšna je cena, če YTM pade na 6,5 % (nominalno, polletno obrestovanje)?",
      options: ["918,41 €","1.000,00 €","966,72 €","966,33 €"],
      correct: 3,
      explanation: "Nižja YTM → višja cena, a obveznica še vedno kotira z diskontom (kupon 6 % < 6,5 %). 30 · PVIFA(3,25 %, 18) + 1.000/1,0325¹⁸." }),
  withId('q1ppdzjy', { q: "Podjetje Delta izda obveznico 1.000 €, kupon 5 % (letni), 12 let, YTM ob izdaji 4 %. Kolikšna je cena ob izdaji?",
      options: ["1.000,00 €","1.026,09 €","1.093,85 €","911,37 €"],
      correct: 2,
      explanation: "50 · PVIFA(4 %, 12) + 1.000/1,04¹². Kupon > YTM → premija." }),
  withId('q13cds3f', { q: "Leto kasneje je obveznica podjetja Delta (kupon 5 %, sprva 12 let) še vedno vrednotena pri 4 %. Kolikšna je cena tik PRED izplačilom prvega kupona?",
      options: ["1.093,85 €","1.137,60 €","1.087,60 €","1.187,60 €"],
      correct: 1,
      explanation: "Tik pred kuponom ima obveznica še 12 kuponov (prvi je takoj): 50 + 50 · PVIFA(4 %, 11) + 1.000/1,04¹¹ = cena tik po kuponu + 50 €." }),
  withId('qe4sona', { q: "Leto kasneje je obveznica podjetja Delta (kupon 5 %, sprva 12 let) še vedno vrednotena pri 4 %. Kolikšna je cena tik PO izplačilu prvega kupona?",
      options: ["1.093,85 €","1.137,60 €","1.000,00 €","1.087,60 €"],
      correct: 3,
      explanation: "Ostane 11 kuponov: 50 · PVIFA(4 %, 11) + 1.000/1,04¹¹. Cena pade za izplačani kupon in se približuje nominalni vrednosti." }),
  (() => {
    const V = bond(1000, .04, .06, 5), dirty = V * 1.06 ** (4 / 12), clean = dirty - 40 * 4 / 12;
    return withId('qmc0hr6', { q: "Obveznica za 1.000 € s 3 % letnim kuponom je zadnji kupon izplačala pred 5 meseci; po tistem kuponu so ji ostala še 4 leta. Vlagatelji zahtevajo 5 %. Kolikšna je polna cena (z natečenimi obrestmi) danes?",
        options: ["948,16 €","935,66 €","929,08 €","941,58 €"],
        correct: 0,
        explanation: "Vrednost ob zadnjem kuponu 929,08 € zraste še 5 mesecev: 929,08 · 1,05^(5/12) = 948,16 € (polna cena). Čista cena (na tečajnici) je polna cena minus natečene obresti 30 · 5/12 = 12,50 €, torej 935,66 €." });
  })(),
];

// ---------- Vaje 4: delnice ----------
const v4 = [
  withId('q1ar3bim', { q: "Vlagatelj je delnico kupil za 820 €, med letom dobil 28,70 € dividende in jo ob koncu leta prodal za 861 €. Kolikšno donosnost je dosegel?",
      options: ["5,00 %","8,50 %","3,50 %","1,50 %"],
      correct: 1,
      explanation: "(P₁ − P₀ + D)/P₀ = (41 + 28,70)/820 = 8,50 %. Dividendna donosnost 3,50 % + kapitalska 5,00 %." }),
  withId('qyvi36b', { q: "Delnica Eta danes stane 24 €; čez leto bo izplačala 1,20 € dividende, nato pričakujete ceno 25,80 €. Kolikšna je pričakovana dividendna donosnost?",
      options: ["7,50 %","12,50 %","4,65 %","5,00 %"],
      correct: 3,
      explanation: "Dividendna donosnost = D₁/P₀ = 1,20/24 = 5,00 % (deli se s SEDANJO ceno, ne s 25,80 €)." }),
  withId('q1ohh9bm', { q: "Pri delnici Eta (danes 24 €, dividenda čez leto 1,20 €, nato pričakovana cena 25,80 €) - kolikšen kapitalski dobiček v odstotkih pričakujete?",
      options: ["7,50 %","5,00 %","6,98 %","12,50 %"],
      correct: 0,
      explanation: "(P₁ − P₀)/P₀ = (25,80 − 24)/24 = 7,50 %. Skupna donosnost 12,50 % = 5,00 + 7,50." }),
  withId('qv10fr7', { q: "Prednostna delnica za vedno izplačuje 3,60 € letno. Koliko je vredna pri zahtevani donosnosti 8 %?",
      options: ["41,67 €","48,60 €","45,00 €","450,00 €"],
      correct: 2,
      explanation: "Stalna dividenda je večna renta: P = D/r = 3,60/0,08 = 45 €." }),
  withId('q1x0zhaw', { q: "Zadnja dividenda je bila 2,40 €, odslej naj bi rasla po 4 % letno. Vlagatelji zahtevajo 11 %. Koliko je delnica vredna po Gordonovem modelu?",
      options: ["34,29 €","35,66 €","21,82 €","22,69 €"],
      correct: 1,
      explanation: "P₀ = D₁/(r − g) z D₁ = 2,40 · 1,04 = 2,496; 2,496/0,07 = 35,66 €. Brez rasti (2,40/0,11) bi bila cena 21,82 €. Pozor: v števec D₁, ne D₀." }),
  (() => {
    const P5 = 1.5 * 1.04 / .06, v = 1 / 1.1 ** 4 + (1.5 + P5) / 1.1 ** 5;
    return withId('qztj4ei', { q: "Mlado podjetje bo prvo dividendo (0,80 €) izplačalo čez 3 leta, čez 4 leta 1,20 €, potem pa bodo dividende rasle po 3 % letno. Koliko je delnica vredna danes pri 9 %?",
        options: ["15,64 €","14,86 €","17,45 €","16,06 €"],
        correct: 3,
        explanation: "Ob koncu 4. leta: P₄ = D₅/(r − g) = 1,236/0,06 = 20,60 €. Vse skupaj diskontiramo: 0,80/1,09³ + (1,20 + 20,60)/1,09⁴ = 16,06 €. Rast se začne od D₅, zato je D₅ = 1,20 · 1,03." });
  })(),
  withId('q1jqmbeh', { q: "Panoga upada: podjetje je pravkar izplačalo 5,00 € dividende, ki se bodo vsako leto znižale za 3 %. Koliko je delnica vredna pri zahtevani donosnosti 9 %?",
      options: ["40,42 €","80,83 €","41,67 €","55,56 €"],
      correct: 0,
      explanation: "g = −3 %: D₁ = 5 · 0,97 = 4,85; r − g = 0,09 + 0,03 = 0,12 → 40,42 €. Napaka: odštevati 3 % namesto prištevati (80,83 €)." }),
  withId('qsdbjm3', { q: "Delnico boste imeli 2 leti: dividendi bosta 1,90 € (čez leto) in 2,05 € (čez dve leti), nato jo prodate za 42,40 €. Koliko je vredna danes pri 7,6 %?",
      options: ["36,62 €","3,54 €","40,16 €","43,08 €"],
      correct: 2,
      explanation: "P₀ = D₁/(1 + r) + (D₂ + P₂)/(1 + r)². Ceno čez 2 leti in drugo dividendo diskontiramo dve leti." }),
  withId('q87rjgf', { q: "Delnica danes stane 38 €, dividenda čez leto bo 1,52 €, vlagatelji zahtevajo 12 %. Kolikšna mora biti cena tik po izplačilu te dividende, da je današnja cena upravičena?",
      options: ["42,56 €","41,04 €","44,08 €","36,48 €"],
      correct: 1,
      explanation: "P₀ = (D₁ + P₁)/(1 + r) → P₁ = P₀(1 + r) − D₁ = 42,56 − 1,52 = 41,04 €." }),
  withId('q5m6h4f', { q: "Podjetje bo prvo dividendo 0,80 € izplačalo čez 3 leta (nato rast 4 % letno), pred tem nič. Strošek kapitala 10 %. Koliko je delnica vredna danes?",
      options: ["13,33 €","10,02 €","12,12 €","11,02 €"],
      correct: 3,
      explanation: "Čez 2 leti (eno leto pred prvo dividendo) je vrednost D/(r − g) = 0,80/0,06 = 13,33 €; to diskontiramo še 2 leti: 11,02 €. Pogosta napaka je diskontirati 3 leta (10,02 €)." }),
  withId('qjbp4ni', { q: "Delnica podjetja Theta prinaša 2,6 % dividendne donosnosti, vlagatelji pa zahtevajo 8,1 %. Po kolikšni stalni stopnji naj bi rasle dividende?",
      options: ["5,50 %","10,70 %","8,10 %","2,60 %"],
      correct: 0,
      explanation: "r = D₁/P₀ + g → g = r − D₁/P₀ = 8,1 % − 2,6 % = 5,5 %." }),
  (() => {
    let v = 0; [1.47, 1.59, 1.71, 1.83, 1.95].forEach((d, i) => { v += d / 1.086 ** (i + 1); }); const P5 = 1.95 * 1.067 / (.086 - .067); v += P5 / 1.086 ** 5;
    return withId('qbjv5bn', { q: "Podjetje Jota je pravkar izplačalo 2,00 €. Dividende rastejo za 0,15 € letno še 4 leta, nato 5 % letno. Strošek lastniškega kapitala 9 %. Cena po DDM?",
        options: ["53,69 €","52,00 €","55,99 €","29,13 €"],
        correct: 2,
        explanation: "D₁…D₄ = 2,15; 2,30; 2,45; 2,60. P₄ = D₅/(r − g) = 2,60 · 1,05/0,04 = 68,25 €. Skupaj SV = 55,99 €." });
  })(),
  (() => {
    const r = 4.27 * 1.029 / 49.06 + .029; const np = 2.67 * 1.048 / (r - .048);
    return withId('q1t06r4q', { q: "Podjetje Psi napove, da bo dividendo znižalo s 3,50 na 2,20 € in z zadržanim dobičkom razvijalo nov izdelek; rast dividend naj bi se zato zvišala z 2 % na 4,5 %. Pred napovedjo je delnica stala 42,00 €. Kakšno ceno pričakujemo in ali ima razvoj NSV > 0?",
        options: ["38,32 €; ne (cena pade)","38,32 €; da (cena pade, a rast je višja)","42,00 €; da (cena je ista)","36,67 €; ne (cena pade)"],
        correct: 0,
        explanation: "Najprej iz stare cene dobimo r = D₁/P + g = 3,50 · 1,02/42,00 + 0,02 = 10,50 %. Nova cena = 2,20 · 1,045/(0,105 − 0,045) = 38,32 €. Cena pade, zato je razvoj naložba z negativno NSV (donosnost novih naložb je pod zahtevano)." });
  })(),
  (() => {
    let v = 0, d = .65; for (let t = 1; t <= 5; t++) { v += d / 1.08 ** t; if (t < 5) d *= 1.12; }
    const P5 = d * 1.02 / .06; v += P5 / 1.08 ** 5;
    return withId('qpx8777', { q: "Prva dividenda bo čez leto 0,90 €; do 4. leta bodo dividende rasle po 10 %, potem trajno po 3 % letno. Koliko je delnica vredna pri 9 % zahtevane donosnosti?",
        options: ["17,49 €","17,92 €","16,71 €","−20,56 €"],
        correct: 1,
        explanation: "D₄ = 0,90 · 1,1³ = 1,20; P₄ = D₄ · 1,03/(0,09 − 0,03) = 20,56 €; skupaj SV dividend 1.-4. leta in P₄/1,09⁴ = 17,92 €." });
  })(),
  withId('qb2ht7t', { q: "Katera trditev o rasti, ki jo podjetje financira z zadržanim dobičkom, NE drži?",
      options: ["Pri enakem dobičku višji delež zadržanega dobička pomeni nižjo dividendo","Z večjim zadrževanjem dobička lahko podjetje pospeši rast dividend","Rezanje dividend za nove naložbe dvigne vrednost le, če imajo naložbe pozitivno NSV","Vsako znižanje dividende v korist naložb dvigne ceno delnice"],
      correct: 3,
      explanation: "Ceno dvigne le rast z naložbami, ki zaslužijo več od zahtevane donosnosti (NSV > 0). Če podjetje zadrži dobiček za slabe naložbe, cena pade." }),
  withId('q1w4e8ui', { q: "S katero stopnjo diskontiramo pričakovane dividende pri vrednotenju delnice?",
      options: ["Z WACC podjetja","Z obrestno mero na posojila podjetja","S stroškom lastniškega kapitala (zahtevano donosnostjo delničarjev)","Z netvegano obrestno mero"],
      correct: 2,
      explanation: "Dividende so tok za lastnike, zato jih diskontiramo s stroškom lastniškega kapitala. WACC uporabimo pri FCF (tok za vse investitorje)." }),
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
  withId('q1wtgaa8', { q: "Donosnost delnice A je v štirih stanjih gospodarstva −25 %, 5 %, 20 % in 30 % (verjetnosti 0,15; 0,35; 0,30; 0,20). Kolikšna je pričakovana donosnost?",
      options: ["7,50 %","10,00 %","5,00 %","30,00 %"],
      correct: 1,
      explanation: "E(r) = Σ p · r = 0,15·(−25) + 0,35·5 + 0,30·20 + 0,20·30 = 10,00 %. Navadno povprečje (7,5 %) ne upošteva verjetnosti." }),
  withId('q1w5zs4l', { q: "Za delnico A (stanja −25 %, 5 %, 20 %, 30 %; verjetnosti 0,15; 0,35; 0,30; 0,20; E = 10 %) izračunajte tveganje. Kolikšna sta standardni odklon in koeficient variacije?",
      options: ["σ = 17,39 %; KV = 1,74","σ = 3,03 %; KV = 0,30","σ = 17,39 %; KV = 0,57","σ = 8,70 %; KV = 0,87"],
      correct: 0,
      explanation: "σ = √Σ p (r − E)² = 17,39 %; KV = σ/E = 17,39/10 = 1,74 (tveganje na enoto donosa). Varianca (σ² = 302,50) ni v istih enotah kot σ." }),
  withId('q1uf0nsb', { q: "Donosnost delnice B je v istih štirih stanjih 3 %, 9 %, −8 % in −6 % (verjetnosti 0,15; 0,35; 0,30; 0,20). Kolikšna je E(B) in ali lahko izračunamo koeficient variacije?",
      options: ["E = −0,50 %; KV = −14,98","E = 0,00 %; KV = 0,00","E = 4,00 %; KV = 1,87","E = 0 %; KV ni definiran"],
      correct: 3,
      explanation: "E(B) = 0,15·3 + 0,35·9 + 0,30·(−8) + 0,20·(−6) = 0,45 + 3,15 − 2,40 − 1,20 = 0 %. KV = σ/E zahteva E ≠ 0, zato pri B ne moremo uporabiti KV (navadno povprečje −0,5 % je napačno, ker ne upošteva verjetnosti)." }),
  withId('q4zkfgh', { q: "V portfelj vložite 40 % v delnico A (E = 10 %, σ = 17,39 %) in 60 % v delnico B (E = 0 %, σ = 7,49 %); korelacija med njima je −0,61. Kolikšni sta pričakovana donosnost in standardni odklon portfelja?",
      options: ["E = 4,00 %; σ = 11,45 %","E = 5,00 %; σ = 5,52 %","E = 4,00 %; σ = 5,52 %","E = 6,00 %; σ = 13,43 %"],
      correct: 2,
      explanation: "E(P) = 0,4·10 + 0,6·0 = 4,00 %. σ(P) ni tehtano povprečje (11,45 %), ker diverzifikacija zmanjša tveganje: σ² = w₁²σ₁² + w₂²σ₂² + 2w₁w₂·Cov, Cov = ρ·σ₁·σ₂ = −79,50 → σ = 5,52 %." }),
  withId('qivhcsv', { q: "Po CAPM: netvegana donosnost 2 %, pričakovana tržna donosnost 7 %, beta delnice Omega 1,4. Kolikšna je zahtevana donosnost Omege?",
      options: ["9,0 %","9,8 %","7,0 %","11,8 %"],
      correct: 0,
      explanation: "r = rf + β (rm − rf) = 2 + 1,4 · 5 = 9 %. Napaka 9,8 % = β · rm (pozabljen rf in premija), 11,8 % = rf + β · rm." }),
  withId('qvx4rje', { q: "Omega (β 1,4; rf 2 %; rm 7 %): vlagatelji pričakujejo za 2 o. t. višjo inflacijo, zato se rf in rm povečata za 2 o. t. Kolikšna je nova zahtevana donosnost?",
      options: ["9,0 %","11,0 %","11,8 %","13,8 %"],
      correct: 1,
      explanation: "rf = 4 %, rm = 9 %, premija ostane 5 %: 4 + 1,4 · 5 = 11 %. Inflacija prestavi celotno SML navzgor za 2 o. t." }),
  withId('qv1ih2w', { q: "Omega (β 1,4; rf 2 %; rm 7 %): vlagatelji postanejo manj naklonjeni tveganju in tržna premija zraste za 2,5 o. t. (rf ostane). Kolikšna je nova zahtevana donosnost?",
      options: ["12,5 %","11,5 %","9,0 %","5,5 %"],
      correct: 0,
      explanation: "Premija 7,5 %: 2 + 1,4 · 7,5 = 12,5 %. Premija se pomnoži z beto, zato je učinek 1,4 · 2,5 = 3,5 o. t. (ne 2,5)." }),
  withId('qjupeg9', { q: "Omega (β 1,4; rf 2 %; rm 7 %, zahtevana donosnost 9 %): inflacija zraste za 2 o. t. (rf in rm +2 o. t.) in hkrati tržna premija za 2,5 o. t. Kolikšna je nova zahtevana donosnost in za koliko se spremeni?",
      options: ["14,5 %; +5,5 o. t.","13,5 %; +4,5 o. t.","14,5 %; +3,5 o. t.","13,8 %; +4,8 o. t."],
      correct: 0,
      explanation: "rf = 4 %, premija = 7,5 %: 4 + 1,4 · 7,5 = 14,5 %. Učinek: 2 (rf) + 1,4 · 2,5 (premija) = 5,5 o. t." }),
  withId('q1qjr170', { q: "Vzajemni sklad vlaga 25 % v A (β 0,6), 15 % v B (β 0,9), 35 % v C (β 1,3) in 25 % v D (β 1,8). rf 2,5 %, tržna premija 6 %. Kolikšna je beta sklada?",
      options: ["1,15","1,19","1,80","1,00"],
      correct: 1,
      explanation: "Beta portfelja = tehtano povprečje bet = 0,25·0,6 + 0,15·0,9 + 0,35·1,3 + 0,25·1,8 = 1,19 (navadno povprečje 1,15 ni pravilno)." }),
  withId('qvxvsav', { q: "Vzajemni sklad vlaga 25 % v A (β 0,6), 15 % v B (β 0,9), 35 % v C (β 1,3) in 25 % v D (β 1,8); rf 2,5 %, tržna premija 6 %. Kolikšna je pričakovana donosnost sklada?",
      options: ["9,40 %","7,14 %","9,64 %","6,67 %"],
      correct: 2,
      explanation: "E(r) = rf + β · premija = 2,5 + 1,19 · 6 = 9,64 %. Pozor: premija je že razlika (rm − rf), rf se ne odšteva ponovno." }),
  withId('q19kjacz', { q: "Portfelj iz 8 delnic z enakimi deleži ima beto 1,25. Delnico K (β 1,6) v celoti zamenjate z delnico L, nato je beta portfelja 1,15. Kolikšna je beta delnice L?",
      options: ["0,8","1,5","1,15","1,2"],
      correct: 0,
      explanation: "Vsota bet 8 delnic: 10,0; brez K: 8,4. Po zamenjavi: 8 · 1,15 = 9,2 → β(L) = 9,2 − 8,4 = 0,8." }),
  withId('q1et8d9u', { q: "Po CAPM ocenjujete delnico A: pričakovana donosnost 8 %, beta 0,75, rf = 3 %, pričakovana donosnost trga 11 %. Kolikšna je zahtevana donosnost in kaj sledi?",
      options: ["9 %: podcenjena (E > zahtevana) - kupiti","8 %: pravilno vrednotena - zadržati","11 %: precenjena (E < zahtevana) - prodati","9 %: precenjena (E < zahtevana) - prodati"],
      correct: 3,
      explanation: "r = 3 + 0,75 · 8 = 9 % > pričakovana 8 % → delnica ponuja premalo za tveganje, cena je previsoka (alfa −1 %)." }),
  withId('q1ophesi', { q: "Po CAPM ocenjujete delnico C: pričakovana donosnost 17 %, beta 1,5, rf = 3 %, pričakovana donosnost trga 11 %. Ali je delnica pravilno vrednotena?",
      options: ["Zahtevana 15 %: precenjena (alfa −2 %)","Zahtevana 17 %: pravilno vrednotena","Zahtevana 19,5 %: precenjena (alfa −2,5 %)","Zahtevana 15 %: podcenjena (alfa +2 %)"],
      correct: 3,
      explanation: "3 + 1,5 · 8 = 15 % < pričakovana 17 % → naložba daje več, kot zahteva tveganje, zato je podcenjena (kupi); delnica B (E = 13 % = 3 + 1,25 · 8) je pravilno vrednotena. Napaka 19,5 % = 3 + 1,5 · 11 (rm namesto premije)." }),
  withId('q13idc', { q: "Trg ima standardni odklon 12 %, delnica A pa standardni odklon 18 % in beto 0,75. Kolikšna je korelacija med delnico A in trgom?",
      options: ["0,50","0,75","1,13","0,67"],
      correct: 0,
      explanation: "β = ρ · σ_i/σ_m → ρ = β · σ_m/σ_i = 0,75 · 12/18 = 0,50. Iz delnice C (σ = 20 %, ρ = 0,9): β = 0,9 · 20/12 = 1,5; za B (β 1,25, ρ 0,6): σ = 1,25 · 12/0,6 = 25 %." }),
];

// ---------- Vaje 6: CAPM in stroški kapitala ----------
const v6 = [
  withId('q1mky5x', { q: "Delnica podjetja Sigma ima beto 0,85, rf = 2,5 %, pričakovana tržna donosnost 7,5 %. Kolikšen je lastniški strošek kapitala?",
      options: ["6,75 %","6,38 %","8,88 %","4,25 %"],
      correct: 0,
      explanation: "r = rf + β (rm − rf) = 2,5 + 0,85 · 5 = 6,75 %. Premija je 7,5 − 2,5 = 5 %, ne celotna tržna donosnost (2,5 + 0,85 · 7,5 = 8,88 %)." }),
  withId('q31k1uq', { q: "Podjetje Tau ima β = 1,45, podjetje Fi β = 1,30, pričakovana presežna donosnost trga je 4,5 %. Katero podjetje ima višji strošek lastniškega kapitala in za koliko?",
      options: ["Fi; za 0,675 o. t.","Tau; za 0,675 o. t.","Tau; za 0,15 o. t.","Tau; za 4,5 o. t."],
      correct: 1,
      explanation: "Razlika = Δβ · premija = (1,45 − 1,30) · 4,5 % = 0,675 o. t. Višja beta pomeni višji zahtevani donos." }),
  withId('q1a036', { q: "Podjetje Kappa se je trajno zadolžilo za 25 mio € (plačuje le obresti po 4 %), mejna davčna stopnja je 22 %. Koliko davka na leto prihrani zaradi obresti?",
      options: ["1,00 mio €","0,78 mio €","5,50 mio €","0,22 mio €"],
      correct: 3,
      explanation: "Davčni ščit = obresti · t = 25 · 0,04 · 0,22 = 0,22 mio € na leto." }),
  withId('q1nyddiz', { q: "Letni davčni ščit podjetja Kappa (25 mio € trajnega dolga po 4 %, davek 22 %) znaša 0,22 mio €. Kolikšna je njegova sedanja vrednost, če je tveganje ščita enako tveganju dolga?",
      options: ["0,22 mio €","5,50 mio €","25,00 mio €","19,50 mio €"],
      correct: 1,
      explanation: "Večna renta: PV = 0,22/0,04 = 5,5 mio € = t · D. Pri 5 % je ščit 0,275 mio € letno, a PV je spet 0,275/0,05 = 5,5 mio € - ni odvisna od mere, dokler je dolg trajen." }),
  withId('qnc9y9', { q: "Delnica podjetja Lambda stane 120 €, pravkar je izplačala 4,20 € dividende, ki naj bi rasle po 2,5 %. Koliko stane zadržani dobiček po modelu D₁/P + g?",
      options: ["6,00 %","6,49 %","6,09 %","3,59 %"],
      correct: 2,
      explanation: "D₁ = 4,20 · 1,025 = 4,3050; 4,3050/120 = 3,59 % + 2,5 % = 6,09 %. Pozor: D₀ → D₁." }),
  withId('q1pxrxie', { q: "Če Lambda (D₀ = 4,20 €, P = 120 €, g = 2,5 %) izda nove delnice s 10 % stroški izdaje, koliko jo stane ta kapital?",
      options: ["6,09 %","6,49 %","6,39 %","3,99 %"],
      correct: 1,
      explanation: "Neto izkupiček je P · (1 − F) = 120 · 0,90 = 108 €: 4,3050/108 + 2,5 % = 6,49 %. Novi kapital je dražji od zadržanega dobička (6,09 %)." }),
  withId('q99usjj', { q: "Podjetje Lambda po CAPM: rf 3 %, β 0,82, tržna premija 5,5 %. Strošek lastniškega kapitala?",
      options: ["4,51 %","9,97 %","8,50 %","7,51 %"],
      correct: 3,
      explanation: "r = 3 + 0,82 · 5,5 = 7,51 %. Napaka 9,97 % = premija, pomnožena z rm (3 + 0,82 · 8,5)." }),
  withId('q1fa062g', { q: "Podjetje Lambda se financira 65 % z lastniškim kapitalom (strošek po CAPM 7,51 %) in 35 % z dolgom (4,2 % pred davkom), davek je 19 %. Kolikšen je WACC?",
      options: ["6,07 %","6,35 %","4,84 %","4,92 %"],
      correct: 0,
      explanation: "WACC = w_E · r_E + w_D · r_D · (1 − t) = 0,65 · 7,51 + 0,35 · 4,2 · 0,81 = 6,07 %. Dolg vedno po davku, uteži po tržnih vrednostih." }),
  withId('q14oh7jg', { q: "Podjetje ima na borzi 25 mio delnic po 12 €, dolguje 100 mio € po 5 %, njegova beta je 1; rf je 3 %, tržna premija 6 %, davek 25 %. Kolikšen je WACC?",
      options: ["9,00 %","7,69 %","8,00 %","6,38 %"],
      correct: 1,
      explanation: "E = 25 · 12 = 300 mio, D = 100 mio → uteži 3/4 in 1/4. r_E = 3 + 1 · 6 = 9 %. WACC = 0,75 · 9 + 0,25 · 5 · 0,75 = 7,69 %." }),
  withId('q136i9l0', { q: "Pričakovani čisti dobiček je 2,40 mrd €, 40 % ga gre za dividende, ciljna struktura je 65 % lastniškega kapitala in 35 % dolga. Koliko lahko podjetje investira, ne da bi izdalo nove delnice?",
      options: ["1,440 mrd €","2,215 mrd €","0,936 mrd €","2,400 mrd €"],
      correct: 1,
      explanation: "Zadržani dobiček = 2,40 · 0,60 = 1,440 mrd € predstavlja 65 % proračuna → proračun = 1,440/0,65 = 2,215 mrd € (od tega 0,775 mrd € dolga)." }),
  (() => {
    const w1 = .6 * .105 + .4 * .05 * .8, w2 = .6 * .123 + .4 * .05 * .8;
    return withId('q12vviw9', { q: "Isto podjetje (zadržani dobiček 1,440 mrd €, ciljno 65 % lastniškega kapitala in 35 % dolga) izbira med projekti P1 (2,0 mrd €, donosnost 11 %), P2 (1,5 mrd €, 10,2 %) in P3 (2,5 mrd €, 9,2 %). Zadržani dobiček stane 11 %, nove delnice 12,5 %, dolg 5,5 % do 1,4 mrd € in 6,5 % nad tem, davek 20 %. Katere projekte izvede?",
        options: ["Samo P1 (2,0 mrd €)","P1, P2 in P3 (6,0 mrd €)","P2 in P3 (4,0 mrd €)","P1 in P2 (3,5 mrd €)"],
        correct: 3,
        explanation: "Mejni WACC: do 2,215 mrd € 8,690 %, nato 9,665 % (nove delnice), nad 4,0 mrd € (1,4/0,35) 9,945 % (dražji dolg). P1 (11 %) in P2 (10,2 %) presegata tudi najvišji mejni WACC, P3 (9,2 %) je pod mejnim WACC (9,665 %-9,945 %) → zavrnemo." });
  })(),
  withId('q1pzehrs', { q: "Skupina Omikron: divizija komunalnih storitev β = 0,74, FCF 40 mio € (rast 2,5 %); rf 2,5 %, premija 4,5 %. Kolikšen je strošek kapitala in vrednost divizije?",
      options: ["5,83 %; 686 mio €","5,83 %; 1.231 mio €","7,00 %; 889 mio €","5,83 %; 1.201 mio €"],
      correct: 3,
      explanation: "r = 2,5 + 0,74 · 4,5 = 5,83 %; V = FCF/(r − g) = 40/(0,0583 − 0,025) = 1.201 mio €. Napaka: v števec ne gre dodatno pomnožiti z (1 + g), ker je FCF že pričakovani tok prihodnjega leta. Divizija turizma (β 1,1, FCF 65 mio €, rast 1,5 %): r = 7,45 %, V = 1.092 mio €." }),
];

// ---------- Teorija ----------
const teor5 = [
  withId('q1kr47ak', Q('Kaj meri standardni odklon donosnosti naložbe?', [
    'Samo sistematično tveganje, ki ga ni mogoče odpraviti',
    'Celotno tveganje (sistematično in nesistematično)',
    'Občutljivost donosa na gibanje tržnega portfelja',
    'Pričakovano razliko med donosom naložbe in netvegano mero'], 1,
    'σ meri raztros donosov okoli povprečja, torej celotno tveganje. Občutljivost na trg meri beta.')),
  withId('qs8stm3', Q('Kaj meri beta koeficient delnice?', [
    'Celotno nihanje donosa delnice okoli njenega povprečja',
    'Delež dobička, ki ga podjetje izplača v dividendah',
    'Občutljivost donosa delnice na donos tržnega portfelja (sistematično tveganje)',
    'Korelacijo med donosom delnice in donosom netvegane naložbe'], 2,
    'β = Cov(r_i, r_m)/Var(r_m) = ρ · σ_i/σ_m. Beta 1,5 pomeni, da delnica ob 1 % spremembi trga v povprečju zraste ali pade za 1,5 %.')),
  withId('q1yrhb40', Q('Katero tveganje lahko z diverzifikacijo (razpršitvijo) odpravimo?', [
    'Sistematično (tržno) tveganje',
    'Nesistematično (specifično) tveganje posameznega podjetja',
    'Inflacijsko tveganje',
    'Vse tveganje, če imamo vsaj dve delnici'], 1,
    'Specifična tveganja podjetij se v dobro razpršenem portfelju izničijo. Tržno (sistematično) tveganje ostane in zanj trg plača premijo.')),
  withId('q1d1qv3b', Q('Za kaj vlagatelji z dobro razpršenim portfeljem zahtevajo premijo za tveganje?', [
    'Za celotno tveganje posamezne delnice',
    'Za sistematično tveganje, merjeno z beto',
    'Za nesistematično tveganje podjetja',
    'Za vsako tveganje, ki ga prevzamejo'], 1,
    'Nesistematično tveganje odpravijo z razpršitvijo, zato ga trg ne nagradi. Zahtevana donosnost je odvisna samo od bete.')),
  withId('q426l6', Q('Kolikšni sta beta tržnega portfelja in beta netvegane naložbe?', [
    'Tržni portfelj 1, netvegana naložba 0',
    'Tržni portfelj 0, netvegana naložba 1',
    'Oba 1, ker sta oba brez tveganja',
    'Tržni portfelj 1, netvegana naložba −1'], 0,
    'Tržni portfelj se giblje točno s trgom (β = 1); netvegana naložba se ne giblje s trgom (β = 0, σ = 0).')),
  withId('qr3daip', Q('Kako izračunamo beto portfelja?', [
    'Kot standardni odklon bet posameznih delnic',
    'Kot tehtano povprečje bet posameznih delnic (uteži = deleži v vrednosti portfelja)',
    'Kot vsoto bet posameznih delnic',
    'Kot najvišjo beto med delnicami v portfelju'], 1,
    'β_P = Σ w_i β_i. Beta portfelja je linearna, standardni odklon portfelja pa ni tehtano povprečje σ (zaradi korelacije).')),
  withId('q1p2h7r4', Q('Kaj pove koeficient variacije (σ/E)?', [
    'Tveganje na enoto pričakovane donosnosti',
    'Delež sistematičnega tveganja v celotnem tveganju',
    'Beta koeficient naložbe',
    'Razliko med donosnostjo naložbe in trga'], 0,
    'Nižji KV pomeni manj tveganja za enoto donosa; ni uporaben, če je E = 0 ali negativna.')),
  withId('q1iopxxd', Q('Kako vpliva nižja korelacija med delnicama na portfelj, sestavljen iz obeh?', [
    'Pričakovana donosnost portfelja se zmanjša',
    'Standardni odklon portfelja se poveča',
    'Nič, korelacija ne vpliva na tveganje portfelja',
    'Standardni odklon portfelja se zmanjša (večja diverzifikacija)'], 3,
    'Pričakovana donosnost je tehtano povprečje, tveganje pa je pri ρ < 1 manjše od tehtanega povprečja σ. Največ koristi je pri negativni korelaciji.')),
  withId('q1prub0q', Q('Kaj je tržna premija za tveganje?', [
    'Pričakovana tržna donosnost, E(r_m)',
    'Razlika E(r_m) − r_f',
    'Beta tržnega portfelja',
    'Razlika med donosnostjo delnice in obveznice istega podjetja'], 1,
    'To je dodatna donosnost, ki jo vlagatelji zahtevajo za prevzem tveganja tržnega portfelja v primerjavi z netvegano naložbo.')),
  withId('q1t9g0gh', Q('Kaj prikazuje premica trga vrednostnih papirjev (SML)?', [
    'Razmerje med celotnim tveganjem (σ) in pričakovano donosnostjo portfelja',
    'Razmerje med beto in zahtevano donosnostjo: r = r_f + β (r_m − r_f)',
    'Razmerje med ceno delnice in dividendo',
    'Razmerje med dolgom in lastniškim kapitalom podjetja'], 1,
    'Naložbe nad SML (E > zahtevana) so podcenjene (kupi), pod SML precenjene (prodaj).')),
  withId('q1bgfs7e', Q('Pričakovana donosnost delnice je pod njeno zahtevano donosnostjo po CAPM. Kaj to pomeni?', [
    'Delnica je podcenjena, zato jo kupimo',
    'Delnica je pravilno vrednotena',
    'Delnica je precenjena (cena je previsoka), zato jo prodamo',
    'Delnica ima negativno beto'], 2,
    'Alfa < 0: naložba ne nagradi tveganja. Cena bo morala pasti, da se pričakovana donosnost dvigne na zahtevano.')),
  withId('qog4tkx', Q('Kaj se zgodi s SML, če se pričakovana inflacija poveča za 2 o. t.?', [
    'SML se vzporedno premakne navzgor za 2 o. t. (rf in r_m narasteta za 2 o. t.)',
    'SML postane strmejša, naklon se poveča za 2',
    'SML se premakne navzdol',
    'Ostane enaka, ker beta ostane enaka'], 0,
    'Višja inflacija dvigne nominalne mere; tržna premija (naklon SML) ostane, razen če se spremeni odnos do tveganja.')),
];

const teor6 = [
  withId('qn87c0', Q('Kako po CAPM izračunamo zahtevano donosnost lastniškega kapitala?', [
    'r_E = r_f + β · (E(r_m) − r_f)',
    'r_E = r_f + β · E(r_m)',
    'r_E = β · r_f + E(r_m)',
    'r_E = E(r_m) − β · r_f'], 0,
    'Netvegana donosnost + beta × tržna premija za tveganje.')),
  withId('q8l47mt', Q('Kako po metodi pričakovane stopnje donosa (Gordon) ocenimo strošek zadržanega dobička?', [
    'r_E = D₀/P₀ − g',
    'r_E = D₁/P₀ + g',
    'r_E = P₀/D₁ + g',
    'r_E = D₁/(P₀ · (1 − F)) − g'], 1,
    'Dividendna donosnost (D₁ = D₀(1 + g)) + pričakovana rast dividend.')),
  withId('q1be6xbu', { q: "Kako flotacijski stroški vplivajo na strošek novoizdanih delnic?",
      options: ["Znižajo ga, ker podjetje prejme več kapitala","Ne vplivajo nanj, ker jih plača država","Povečajo samo strošek dolga, ne lastniškega kapitala","Povečajo ga: r = D₁/(P₀(1 − F)) + g"],
      correct: 3,
      explanation: "Zato je strošek novih delnic višji od stroška zadržanega dobička (primer: 6,49 % proti 6,09 %)." }),
  withId('q1czz086', Q('Kako izračunamo strošek dolga po davkih?', [
    'r_D · (1 + t)',
    'r_D / (1 − t)',
    'r_D · (1 − t)',
    'r_D − t'], 2,
    'Obresti znižujejo davčno osnovo, zato je davčni ščit t · obresti in je efektivni strošek r_D (1 − t).')),
  withId('q1tfaryn', { q: "Kolikšna je sedanja vrednost davčnega ščita obresti pri trajnem dolgu D, če je tveganje ščita enako tveganju dolga?",
      options: ["r_D · D","t · D","(1 − t) · D","t · D / r_D"],
      correct: 1,
      explanation: "Letni ščit t · r_D · D, večna renta, diskontirana z r_D: PV = t · D (primer: 0,22 · 25 = 5,5 mio €)." }),
  withId('q1fewiag', Q('Kako se izračuna WACC?', [
    'Tehtano povprečje stroškov dolga (po davku) in lastniškega kapitala z uteženimi tržnimi vrednostmi',
    'Navadno povprečje stroška dolga in stroška lastniškega kapitala',
    'Tehtano povprečje stroškov z uteženimi knjigovodskimi vrednostmi in dolgom pred davkom',
    'Strošek lastniškega kapitala, povečan za davčno stopnjo'], 0,
    'WACC = w_E · r_E + w_D · r_D · (1 − t); uteži so tržne vrednosti (delnice po tržni ceni), ne bilančne.')),
  withId('q1la4kso', Q('Kako izračunamo uteži kapitalske strukture za WACC, če ima podjetje 10 mio delnic po 30 € in 150 mio € dolga?', [
    'Lastniški kapital 50 %, dolg 50 %',
    'Lastniški kapital 67 %, dolg 33 %',
    'Lastniški kapital 33 %, dolg 67 %',
    'Lastniški kapital 100 %, ker je dolg netržen'], 1,
    'E = 300 mio €, D = 150 mio € → w_E = 300/450 = 2/3, w_D = 1/3.')),
  withId('q9rzi20', Q('Zakaj mejni strošek kapitala naraste, ko se izčrpa zadržani dobiček?', [
    'Ker davek na dobiček naraste',
    'Ker postane dolg cenejši od lastniškega kapitala',
    'Ker mora podjetje izplačati dividende',
    'Ker nov lastniški kapital (nove delnice) zaradi flotacijskih stroškov stane več'], 3,
    'Mejni strošek kapitala raste v stopnjah: najprej zadržan dobiček, nato nove delnice, nazadnje dražji dolg (višja mera nad določenim zneskom).')),
  withId('qbfk414', Q('Kako izberemo projekte po metodi mejnega stroška kapitala?', [
    'Izvedemo vse projekte z donosnostjo nad netvegano mero',
    'Izvedemo samo najdonosnejši projekt',
    'Izvedemo projekte, katerih donosnost presega mejni WACC pri tem obsegu naložb (presek IOS in MCC)',
    'Izvedemo projekte po vrstnem redu velikosti, dokler ne porabimo dobička'], 2,
    'Projekte uredimo po donosnosti (IOS), jih primerjamo z naraščajočim mejnim stroškom kapitala (MCC); optimalni proračun je v preseku.')),
  withId('q1b5ujgl', { q: "Podjetje ima divizijo z veliko višjim tveganjem kot ostale. Katero diskontno stopnjo uporabimo za projekt v tej diviziji?",
      options: ["WACC celotnega podjetja","Netvegano obrestno mero","Strošek dolga po davku","Strošek kapitala divizije"],
      correct: 3,
      explanation: "Če uporabimo WACC podjetja za vse projekte, bomo prevrednotili tvegane in podvrednotili varne projekte. Primer: skupina z divizijama komunalnih storitev (β 0,74) in turizma (β 1,1) - beta in strošek kapitala za vsako divizijo posebej." }),
  withId('qwl5lrm', Q('Podjetje se financira izključno z lastniškim kapitalom. Kako vrednotimo divizije?', [
    'Z diskontiranjem FCF vsake divizije s stroškom kapitala po bete divizije (Gordon: FCF/(r − g))',
    'Z diskontiranjem dividend celotnega podjetja z netvegano mero',
    'Z knjigovodsko vrednostjo sredstev divizije',
    'Z navadnim povprečjem tržnih kazalnikov podjetja'], 0,
    'Brez dolga je WACC = strošek lastniškega kapitala. Vrednost podjetja je vsota vrednosti divizij.')),
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
