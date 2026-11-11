/* Mikroekonomija 1 (1. letnik, 1. semester) - 2. kolokvij in izpit.
   Viri: učni načrt 2025/26, predavanja 5-7 in 9 (EF Zapiski), drugi kolokvij 10. 12. 2021,
   izpita 17. 1. 2022 in 31. 1. 2022. Vsi številski rezultati so preračunani.
   K2 (12. 12.): 5. proizvodnja, 6. stroški, 7. popolna konkurenca. Izpit_K3: 9. monopol, 10. mon. konkurenca/oligopol, 11. trg dela. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const QF = (q, options, correct, explanation) => ({ q, options, correct, explanation, fixedOrder: true });
const calc = (arr) => arr.map((q) => ({ ...q, calc: true }));
const cards = (arr) => arr.map(([front, back]) => ({ front, back }));

const NOTES_K2 = `
## Kako poteka kolokvij
- **2. kolokvij** (12. 12.): poglavja 5, 6 in 7 - proizvodnja, stroški, popolna konkurenca. 33 % ocene, opravljen pri 50 % točk.
- Format (2021): 40 min, 33 točk. Vprašanja 1-4 obkrožiš (3 točke, z izračunom), 5-7 so daljše naloge s sliko (7 točk).
> Točke dobiš samo za v celoti pravilno rešitev - izračun **in** skica, kjer je zahtevana.

## 5 · Proizvodnja
### Produkcijska funkcija
- **Q = f(K, L)** - največji proizvod pri dani tehnologiji.
- **Kratko obdobje**: vsaj en dejavnik je stalen (fiksen). **Dolgo obdobje**: vsi dejavniki so spremenljivi.
- **MPL = ΔQ/ΔL** (odvod), **APL = Q/L**.
- **Zakon o padajočem donosu**: ob dodajanju spremenljivega dejavnika k stalnim začne MP po neki točki padati.
- MP > AP → AP narašča; MP < AP → AP pada; **MP = AP v maksimumu AP**. Max AP je pri večjem L kot max MP.
- TP narašča, dokler je MP > 0; TP je v maksimumu, ko je MP = 0.
### Izokvanta in MRTS
- **Izokvanta** = vse kombinacije K in L za enak Q.
- **MRTS_L = −ΔK/ΔL = MPL/MPK** (naklon izokvante).
- Popolni substituti: Q = aK + bL, izokvanta je premica, MRTS konstantna. Popolni komplementi: Q = min(K/a, L/b), izokvanta v obliki črke L.
### Donosi obsega (vsi dejavniki × t)
- Cobb-Douglas Q = A·K^α·L^β: **α + β > 1 naraščajoči**, **= 1 konstantni**, **< 1 padajoči**.
- Npr. Q = 2K^¼L^½ → ¾ < 1 → padajoči. Q = 30K^0,5 + 11L^0,5 → padajoči (vsak člen se poveča le za √t).

## 6 · Stroški
### Ekonomski in računovodski stroški
- **Računovodski** = eksplicitni (plače, material). **Ekonomski** = eksplicitni + **oportunitetni** (izgubljene alternative) → ekonomski stroški so večji.
### Kratkoročni stroški
- TC = FC + VC; FC = TC(Q = 0).
- **MC = ΔTC/ΔQ = ΔVC/ΔQ** - fiksni stroški nanje ne vplivajo.
- AFC = FC/Q (vedno pada), AVC = VC/Q, ATC = TC/Q = AFC + AVC.
- **MC seka AVC in ATC v njunem minimumu**: MC < AVC → AVC pada; MC > AVC → AVC narašča.
- Povezava s proizvodnjo: **MC = w/MPL**, **AVC = w/APL**. Ko MPL narašča, MC pada (TC narašča po padajoči stopnji).
- Fiksni davek: povečajo se FC, AFC in ATC, **MC in AVC ostaneta enaka**.
### Dolgoročni stroški
- **Izokosta**: TC = wL + rK → K = TC/r − (w/r)·L, naklon −w/r.
- **Ravnotežje (min. stroški)**: MRTS = w/r oziroma **MPL/w = MPK/r**.
- Če MPL/w > MPK/r: dela je "preveč poceni" → **povečaj L, zmanjšaj K**.
- **Krivulja razvoja** = povezuje optimalne kombinacije pri rasti Q.
- **LAC** = ovojnica kratkoročnih ATC. Naraščajoči donosi obsega → LAC pada; konstantni → vodoravna; padajoči → narašča.

## 7 · Popolna konkurenca
- Predpostavke: homogeni proizvodi, veliko kupcev in prodajalcev, prost vstop in izstop, popolna informiranost → podjetje **sprejema ceno**.
- Za podjetje: **P = MR = AR**, povpraševanje je vodoravno (popolnoma elastično).
- **Potrebni pogoj**: MR = MC (pri popolni konkurenci **P = MC**). **Zadostni pogoj**: P ≥ AVCmin.
- **Točka preloma**: P = ATCmin (dobiček 0). **Točka indiferentnosti (zaprtja)**: P = AVCmin - izguba = FC.
- AVCmin < P < ATCmin: podjetje proizvaja z izgubo, ki je manjša od FC. P < AVCmin: zapre (Q = 0).
- **Kratkoročna ponudba podjetja** = MC nad AVCmin. Ponudba panoge = vodoravna vsota ponudb podjetij.
- **Dolgi rok**: vstop in izstop → **P = LMC = LACmin**, ekonomski dobiček = 0 (podjetje dobi le normalen donos na kapital).
- Število podjetij na dolgi rok = tržna količina pri P = LACmin / količina enega podjetja.
`;

const NOTES_K3 = `
## 9 · Monopol
- En prodajalec, ni bližnjih substitutov, ovire za vstop. Povpraševanje monopolista = **tržno povpraševanje** (padajoče).
- **MR < P**; pri linearni P = a − bQ je **MR = a − 2bQ** (dvakrat strmejša).
- Ravnotežje: **MR = MC**, cena se odčita na povpraševanju. Monopolist proizvaja le na **elastičnem** delu (|E| > 1).
- **MR = P(1 + 1/E)** → pribitek: **P = MC / (1 + 1/E)**. Lernerjev indeks L = (P − MC)/P = −1/E.
- Linearno povpraševanje + konstantni MC: konkurenčna količina je **dvakrat večja** od monopolne.
- **Mrtva izguba** = trikotnik med povpraševanjem in MC od Q_mon do Q_konk.
- **Naravni monopol**: visoki FC, nizki (konstantni) MC, ATC pada na celotnem trgu. Regulacija P = MC (ni mrtve izgube, a izguba podjetja → subvencija) ali **P = ATC** (normalen donos, majhna mrtva izguba).
- **Cenovna diskriminacija**: 1. stopnje (vsak plača svojo maksimalno ceno, potrošniški presežek = 0, ni mrtve izgube), 2. stopnje (po količini), 3. stopnje (po skupinah - višja cena manj elastični skupini).

## 10 · Monopolistična konkurenca, oligopol, kartel
- **Monopolistična konkurenca**: veliko podjetij, **diferencirani** proizvodi, prost vstop. Dolgi rok: P = LAC (dobiček 0), a **P > MC → mrtva izguba > 0** in presežne zmogljivosti.
- **Oligopol**: malo podjetij, medsebojna odvisnost. Modeli: **Cournot** (količine hkrati), **Stackelberg** (vodilno podjetje izbere količino prvo), **Bertrand** (cene, homogeno → P = MC), **prelomljena krivulja povpraševanja** (toge cene).
- **Teorija iger**: **dominantna strategija** = najboljša ne glede na tekmeca. **Nashevo ravnotežje** = nihče nima razloga enostransko spremeniti strategije. Zapornikova dilema: obe dominantni strategiji vodita v slabši izid za oba.
- **Kartel** (OPEC): dogovor o količinah, deluje kot monopolist. OPEC kot **vodilno podjetje**: D_OPEC = D_trg − S_ostalih, nato MR_OPEC = MC_OPEC; ostali sprejmejo ceno. Pogoja za uspeh: **neelastično povpraševanje** in **dogovor o količinah, ki se ga članice držijo**.

## 11 · Trg dela
- Podjetje zaposluje, dokler **MRP_L = MR · MPL = w**. Pri popolni konkurenci na trgu proizvodov: **VMP_L = P · MPL = w**.
- **Ponudba dela posameznika** je lahko nazaj zavita: višja plača → učinek substitucije (več dela) proti učinku dohodka (več prostega časa). Če ponudba pade, **prevlada učinek dohodka**.
- **Monopson** (edini delodajalec): ME > w, zaposli kjer **ME = MRP**, plača se odčita na ponudbi → manj zaposlenih in nižja plača kot pri konkurenci.
- **Sindikat (monopol na trgu dela) - 3 strategije**: max zaposlenost (D_L = S_L), max skupno plačilo (**MR = 0**), max ekonomska renta (**MR = S_L**).
- **Bilateralni monopol**: monopson proti sindikatu - plača je med obema željama, odvisna od pogajalske moči.
`;

/* ---------- 2. kolokvij ---------- */
const proizvodnja = [
  Q('Kaj je značilno za KRATKO obdobje v proizvodnji?', ['Vsaj en proizvodni dejavnik je stalen', 'Vsi dejavniki so spremenljivi', 'Tehnologija se spreminja', 'Podjetje lahko vstopi ali izstopi iz panoge'], 0,
    'Dolgo obdobje: ni stalnih dejavnikov. V kratkem obdobju se tehnologija ne spreminja.'),
  Q('Zakon o padajočem donosu pravi, da:', ['Po neki točki začne mejni proizvod spremenljivega dejavnika padati', 'Celotni proizvod vedno pada', 'Povprečni proizvod je vedno večji od mejnega', 'Ob podvojitvi vseh dejavnikov se proizvod manj kot podvoji'], 0,
    'Velja v kratkem roku (en dejavnik stalen). Zadnja možnost opisuje padajoče DONOSE OBSEGA (dolgi rok).'),
  Q('Kaj velja, ko je mejni proizvod dela VEČJI od povprečnega?', ['Povprečni proizvod narašča', 'Povprečni proizvod pada', 'Povprečni proizvod je v maksimumu', 'Celotni proizvod pada'], 0,
    'MP = AP v maksimumu AP; MP < AP → AP pada.'),
  Q('Kdaj je celotni proizvod v maksimumu?', ['Ko je mejni proizvod enak 0', 'Ko je mejni proizvod v maksimumu', 'Ko je MP = AP', 'Ko je povprečni proizvod enak 0'], 0,
    'Max MP je v prevoju TP; MP = AP v maksimumu AP.'),
  Q('Čemu je enaka mejna stopnja tehnične nadomestljivosti MRTS_L?', ['MPL / MPK', 'MPK / MPL', 'w / r', 'APL / APK'], 0,
    'Naklon izokvante. V ravnotežju je enak razmerju cen w/r.'),
  Q('Kakšna je izokvanta pri popolni nadomestljivosti dejavnikov (Q = aK + bL)?', ['Premica s konstantno MRTS', 'V obliki črke L', 'Konveksna krivulja', 'Navpična premica'], 0,
    'Pri stalnem razmerju (popolni komplementi) je izokvanta v obliki črke L.'),
  Q('Kakšni so donosi obsega pri Q = 30K^0,5 + 11L^0,5? (izpit 31. 1. 2022)', ['Padajoči', 'Konstantni', 'Naraščajoči', 'Najprej naraščajoči, nato padajoči'], 0,
    'Q(tK, tL) = √t · Q(K, L) < t · Q → padajoči donosi obsega.'),
  Q('Kakšni so donosi obsega pri Q = 2K^¼ L^½?', ['Padajoči (¼ + ½ < 1)', 'Konstantni', 'Naraščajoči', 'Ne moremo določiti'], 0,
    'Izpit 17. 1. 2022. Vsota eksponentov 0,75 < 1. MPL = K^¼ · L^−½.'),
];

const proizvodnjaRac = calc([
  Q('Q = K^½ L^½. Koliko znaša povprečni proizvod dela? (kolokvij 2021)', ['APL = K^½ / L^½', 'APL = K^½', 'APL = ½ K^½', 'APL = ½ K^½ L^−½'], 0,
    'APL = Q/L = K^½ L^½ / L = K^½ L^−½ = K^½/L^½. Zadnja možnost je MPL.'),
  Q('Q = K^0,5 L^0,5, K = 4, L = 16. Koliko sta APL in MPL?', ['APL = 0,5; MPL = 0,25', 'APL = 0,25; MPL = 0,5', 'APL = 8; MPL = 4', 'APL = 0,5; MPL = 0,5'], 0,
    'Q = 2 · 4 = 8, APL = 8/16 = 0,5. MPL = 0,5 · K^0,5/L^0,5 = 0,5 · 2/4 = 0,25.'),
  Q('Q(L,K) = 5L^0,5 K^0,4. Koliko je MRTS_L pri L = 10, K = 20? (predavanje 5)', ['2,5', '0,4', '1,6', '1,25'], 0,
    'MRTS = MPL/MPK = (0,5/0,4) · K/L = 1,25 · 2 = 2,5: za dodatno enoto dela lahko kapital zmanjšamo za 2,5.'),
  Q('Q = 2K^¼ L^½. Koliko znaša MPL?', ['K^¼ · L^−½', '2K^−¼ · L^−½', 'K^½ · L^−½', '½ K^¼ · L^−½'], 0,
    'MPL = 2 · ½ · K^¼ · L^−½.'),
]);

const stroski = [
  Q('Kako se ekonomski stroški razlikujejo od računovodskih?', ['Vključujejo tudi oportunitetne stroške, zato so večji', 'Vključujejo samo eksplicitne stroške', 'So vedno manjši', 'Ne vključujejo plač'], 0,
    'Računovodski = eksplicitni (vidni). Ekonomist presoja z vidika alternativnih naložb.'),
  Q('Na katere stroške NE vplivajo fiksni stroški?', ['Na mejne stroške', 'Na celotne stroške', 'Na povprečne celotne stroške', 'Na povprečne fiksne stroške'], 0,
    'MC = ΔTC/ΔQ = ΔVC/ΔQ.'),
  Q('Podjetje mora plačati fiksni letni davek. Kaj se zgodi? (izpit 17. 1. 2022)', ['FC, AFC in ATC se povečajo, MC ostanejo enaki', 'FC in AFC se povečajo, MC in ATC ostanejo enaki', 'Povečajo se FC, AFC, MC in ATC', 'Povečajo se le FC'], 0,
    'Davek ni odvisen od Q, zato ne vpliva na MC in AVC.'),
  Q('Mejni stroški naraščajo, povprečni variabilni stroški pa padajo. Kaj velja? (izpit 17. 1. 2022)', ['MC < AVC', 'MC > AVC', 'AFC so konstantni', 'MC < AFC'], 0,
    'Dokler je MC pod AVC, AVC pada. MC seka AVC v minimumu.'),
  Q('Kje mejni stroški sekajo povprečne celotne stroške?', ['V minimumu ATC', 'V maksimumu ATC', 'Pri Q = 0', 'Nikoli'], 0,
    'Enako MC seka AVC v minimumu AVC.'),
  Q('Kakšna je povezava med mejnimi stroški in mejnim proizvodom dela?', ['MC = w / MPL', 'MC = MPL / w', 'MC = w · MPL', 'MC = w / APL'], 0,
    'AVC = w/APL. Ko MPL narašča, MC pada.'),
  QF('Ali je trditev pravilna: "Ko mejni proizvod variabilnega dejavnika narašča, celotni stroški naraščajo po naraščajoči stopnji"? (kolokvij 2021)', ['Da, ker MC narašča', 'Ne, ker MC takrat pada - TC narašča po padajoči stopnji', 'Da, ker AFC pada', 'Ne, ker TC takrat pada'], 1,
    'MC = w/MPL: ko MPL narašča, MC pada, zato TC raste vedno počasneje.'),
  Q('Kaj je naklon izokoste?', ['−w/r', '−r/w', '−MPL/MPK', '−TC/r'], 0,
    'TC = wL + rK → K = TC/r − (w/r)L.'),
  Q('Kateri pogoj velja v optimalni kombinaciji dejavnikov?', ['MPL/w = MPK/r', 'MPL = MPK', 'w = r', 'MPL/MPK = r/w'], 0,
    'Naklon izokvante (MRTS) = naklon izokoste (w/r).'),
  Q('MPL = 100, MPK = 60, w = 45, r = 250. Kaj naj podjetje stori za nižje stroške pri enakem Q? (izpit 31. 1. 2022)', ['Poveča delo in zmanjša kapital', 'Poveča kapital in zmanjša delo', 'Uporablja samo kapital', 'Nič, je v ravnotežju'], 0,
    'MPL/w = 2,22 > MPK/r = 0,24 → evro v delu prinese več.'),
  Q('Kaj je krivulja LAC?', ['Ovojnica kratkoročnih krivulj povprečnih stroškov', 'Vsota kratkoročnih MC', 'Krivulja povprečnih fiksnih stroškov', 'Krivulja mejnih prihodkov'], 0,
    'Prikazuje najnižje povprečne stroške pri vsakem obsegu.'),
  Q('Kakšna je LAC pri konstantnih donosih obsega?', ['Vodoravna', 'Padajoča', 'Naraščajoča', 'V obliki črke U'], 0,
    'Naraščajoči donosi → LAC pada; padajoči → narašča.'),
];

const stroskiRac = calc([
  QF('MC = Q² − 4Q + 10, FC = 100. Katera trditev je pravilna? (kolokvij 2021)', ['Vrednost MC pri minimumu AVC znaša 7 evrov.', 'TC = Q³ − 2Q² + 10Q + 100.', 'AVC imajo minimum pri Q = 2.', 'ATC = 2Q² − 10 + 100/Q.'], 0,
    'VC = Q³/3 − 2Q² + 10Q, AVC = Q²/3 − 2Q + 10, min pri Q = 3: AVC = 7 = MC(3).'),
  Q('Podjetje proizvaja z 2 enotama kapitala in 1 enoto dela na enoto proizvoda, Q = 60, w = 2, r = 4. Koliko K, L in kolikšni so stroški?', ['K = 120, L = 60, TC = 600', 'K = 60, L = 120, TC = 480', 'K = 120, L = 60, TC = 480', 'K = 30, L = 60, TC = 240'], 0,
    'TC = 2 · 60 + 4 · 120 = 600; LAC = 1 · 2 + 2 · 4 = 10.'),
  Q('Q = 2K + 4L, w = 10, r = 20. Koliko K in L potrebuje za Q = 200? (izpit 17. 1. 2022)', ['L = 50, K = 0', 'K = 100, L = 0', 'L = 25, K = 50', 'L = 50, K = 50'], 0,
    'Popolni substituti: MPL/w = 0,4 > MPK/r = 0,1 → samo delo. LTC = 2,5Q.'),
  Q('K in L se dopolnjujeta 3 : 2, za enoto proizvoda je potrebnih 10 enot dela, r = 6, w = 18. Minimalni stroški za Q = 100? (izpit 31. 1. 2022)', ['27.000', '18.000', '9.000', '30.000'], 0,
    'L = 10Q = 1000, K = 15Q = 1500 → 1500 · 6 + 1000 · 18 = 27.000; LAC = 270.'),
  Q('TC = 100 + 10Q + Q². Pri kateri ceni je točka preloma (P = ATCmin)?', ['30', '10', '20', '50'], 0,
    'ATC = 100/Q + 10 + Q, min pri Q = 10 → ATC = 30. AVC = 10 + Q ima min 10 (točka indiferentnosti).'),
]);

const konkurenca = [
  Q('Katera NI predpostavka popolne konkurence?', ['Diferencirani proizvodi', 'Veliko kupcev in prodajalcev', 'Prost vstop in izstop', 'Popolna informiranost'], 0,
    'Proizvodi so homogeni (standardizirani).'),
  Q('Kakšna je krivulja povpraševanja za posamezno popolnokonkurenčno podjetje?', ['Vodoravna (popolnoma elastična)', 'Padajoča', 'Navpična', 'Enaka tržnemu povpraševanju'], 0,
    'P = MR = AR - podjetje sprejema ceno.'),
  Q('Kateri pogoj velja za maksimiranje dobička za VSA podjetja?', ['MR = MC', 'P = MC', 'P = ATC', 'P = AVC'], 0,
    'P = MC velja le pri popolni konkurenci (tam je P = MR).'),
  Q('Kaj je zadostni pogoj za kratkoročno proizvodnjo popolnega konkurenta?', ['P ≥ AVCmin', 'P ≥ ATCmin', 'P ≥ AFC', 'P = 0'], 0,
    'Podjetje mora pokrivati vsaj variabilne stroške.'),
  Q('Cena pokriva le povprečne variabilne stroške (P = AVCmin). Kako se imenuje ta točka? (kolokvij 2021)', ['Točka indiferentnosti (zaprtja)', 'Točka preloma', 'Dolgoročno ravnotežje', 'Monopolno ravnotežje'], 0,
    'Izguba je enaka FC - vseeno je, ali proizvaja. Točka preloma je pri P = ATCmin.'),
  Q('AVCmin < P < ATCmin. Kaj naj podjetje naredi v kratkem roku?', ['Proizvaja z izgubo, ki je manjša od FC', 'Takoj zapre', 'Poveča ceno', 'Proizvaja z dobičkom'], 0,
    'Pod AVCmin bi bila izguba večja od FC → zapre.'),
  Q('Kaj je kratkoročna krivulja ponudbe popolnega konkurenta?', ['Krivulja MC nad minimumom AVC', 'Krivulja ATC', 'Krivulja MC pod AVC', 'Krivulja AFC'], 0,
    'Ponudba panoge = vodoravna vsota ponudb podjetij.'),
  Q('Kaj velja v dolgoročnem ravnotežju popolne konkurence?', ['P = LMC = LACmin, ekonomski dobiček je 0', 'P > LAC, pozitiven dobiček', 'P < AVC', 'P = MR > MC'], 0,
    'Vstop in izstop izničita ekonomski dobiček; ostane normalen donos na kapital.'),
  Q('Cena ravno pokrije ATC; nato se uvede davek na zemljo, neodvisen od Q. Kaj se zgodi? (izpit 17. 1. 2022)', ['ATC se povečajo, podjetje ima izgubo, Q ostane enak', 'MC se povečajo, Q pade', 'Podjetje takoj zapre', 'Dobiček se poveča'], 0,
    'Fiksni davek ne spremeni MC, zato P = MC da enak Q; ATC > P → izguba.'),
];

const konkurencaRac = calc([
  Q('Podjetje "Ski": P = 360, AVC = 3Q, FC = 1.800. Ravnotežna količina in dobiček? (izpit 17. 1. 2022)', ['Q = 60, dobiček 9.000', 'Q = 60, dobiček 10.000', 'Q = 120, dobiček 43.200', 'Q = 120, izguba 800'], 0,
    'VC = 3Q², MC = 6Q = 360 → Q = 60. Dobiček = 21.600 − 10.800 − 1.800 = 9.000.'),
  Q('Popolni konkurent: TC = 100 + 10Q + Q², P = 50. Količina in dobiček?', ['Q = 20, dobiček 300', 'Q = 25, dobiček 400', 'Q = 20, dobiček 500', 'Q = 10, dobiček 200'], 0,
    'MC = 10 + 2Q = 50 → Q = 20. TR = 1.000, TC = 100 + 200 + 400 = 700.'),
  Q('Ponudba podjetja S = 4P, FC = 100. Za koliko se poveča dobiček, če cena zraste z 10 na 20? (predavanje 7)', ['Za 600', 'Za 400', 'Za 800', 'Za 1.000'], 0,
    'MC = Q/4 → VC = Q²/8. P = 10: Q = 40, dobiček 400 − 100 − 200 = 100. P = 20: Q = 80, dobiček 1.600 − 100 − 800 = 700.'),
  Q('Dolgoročni povprečni stroški podjetja LAC = 2q² − 8q + 36, povpraševanje Q = 7600 − 100P. Število podjetij na dolgi rok? (izpit 31. 1. 2022)', ['2.400', '1.100', '1.400', '4.800'], 0,
    'LACmin pri q = 2: LAC = 28 = P. Q = 7600 − 2800 = 4800 → 4800/2 = 2.400. Če povpraševanje pade, se število podjetij zmanjša.'),
  Q('TR = 10.000, FC = 2.000, ATC = 4, AVC = 3, MC = 2. Kaj naj naredi popolni konkurent? (izpit 31. 1. 2022)', ['Poveča proizvodnjo, ker je P = 5 > MC', 'Zmanjša proizvodnjo', 'Zapre obrat', 'Ostane, je v optimumu'], 0,
    'AFC = 1 → Q = 2.000, P = 5. Dobiček zdaj (5 − 4) · 2.000 = 2.000; P > MC → povečaj Q.'),
]);

/* ---------- izpit (K3) ---------- */
const monopol = [
  QF('Katera značilnost velja za monopolista? (kolokvij 2021)', ['Krivulja povpraševanja monopolista je enaka tržni krivulji povpraševanja.', 'Cena in mejni prihodek sta enaka za vsako enoto proizvoda.', 'Cenovna elastičnost povpraševanja monopolista je manjša od −1 za vse enote.', 'Pri popolni cenovni diskriminaciji imajo potrošniki pozitiven, a majhen presežek.', 'Nobena trditev ni pravilna.'], 0,
    'MR < P; pri popolni diskriminaciji je potrošniški presežek 0.'),
  Q('Na katerem delu povpraševanja proizvaja monopolist?', ['Na elastičnem (|E| > 1)', 'Na neelastičnem (|E| < 1)', 'Pri |E| = 0', 'Kjerkoli'], 0,
    'MR = P(1 + 1/E) > 0 samo, če je |E| > 1.'),
  Q('Linearno povpraševanje in konstantni MC: kaj velja? (izpit 31. 1. 2022)', ['Konkurenčna količina je dvakrat večja od monopolne', 'Konkurenčna količina je dvakrat manjša', 'Dobiček monopolista je dvakrat večji', 'Mrtva izguba je pri obeh enaka'], 0,
    'MR ima dvakrat strmejši naklon kot povpraševanje.'),
  Q('Kaj je značilno za naravni monopol?', ['Visoki fiksni in nizki mejni stroški, ATC pada', 'Nizki fiksni in visoki mejni stroški', 'Patent na proizvod', 'Državna lastnina'], 0,
    'En proizvajalec oskrbi trg ceneje kot več podjetij.'),
  Q('Kako regulirati naravni monopol, da zasluži "normalen" donos?', ['P = ATC', 'P = MC', 'MR = MC', 'P = AVCmin'], 0,
    'P = MC odpravi mrtvo izgubo, a podjetje ima izgubo (potrebna subvencija).'),
  Q('Pri cenovni diskriminaciji 1. stopnje velja:', ['Potrošniški presežek je 0, mrtve izgube ni', 'Mrtva izguba je največja', 'Vsi plačajo enako ceno', 'Monopolist proizvaja manj kot brez diskriminacije'], 0,
    'Vsak kupec plača svojo maksimalno ceno.'),
  Q('Royal Crown ima E = −2,4, Coke E = −5,5. Kdo ima višji pribitek na MC? (izpit 31. 1. 2022)', ['Royal Crown', 'Coke', 'Enako', 'Ni dovolj podatkov'], 0,
    'Manj elastično povpraševanje = močnejša pripadnost znamki. Lerner = −1/E: 0,42 proti 0,18.'),
];

const monopolRac = calc([
  Q('Monopolist "Biker": Q = 160 − 4P, VC = 2Q, FC = 100. Mrtva izguba? (kolokvij 2021, izpit 2022)', ['722', '361', '648', '1.444'], 0,
    'P = 40 − Q/4, MR = 40 − Q/2 = 2 → Q = 76, P = 21. Konkurenca: Q = 152. DWL = ½ · 19 · 76 = 722.'),
  Q('Monopolist OCC: Q = 250 − P, ATC = 100 + 50/Q. Potrošniški presežek? (izpit 31. 1. 2022)', ['2.812,5', '5.625', '1.406,25', '11.250'], 0,
    'TC = 100Q + 50 → MC = 100. MR = 250 − 2Q = 100 → Q = 75, P = 175. CS = ½ · 75 · 75.'),
  Q('P = 100 − 2Q, MC = 20. Monopolna cena, količina in mrtva izguba?', ['P = 60, Q = 20, DWL = 400', 'P = 40, Q = 30, DWL = 200', 'P = 60, Q = 20, DWL = 800', 'P = 20, Q = 40, DWL = 0'], 0,
    'MR = 100 − 4Q = 20 → Q = 20, P = 60. Konkurenca Q = 40. DWL = ½ · 40 · 20 = 400.'),
  Q('Elastičnost povpraševanja je −4, MC = 30. Cena monopolista?', ['40', '30', '120', '37,5'], 0,
    'P = MC/(1 + 1/E) = 30/0,75 = 40.'),
  Q('Linearno povpraševanje, E = −0,2. Ali je MR negativen? (kolokvij 2021, izpit 2022)', ['Da, MR = P(1 − 5) = −4P', 'Ne, MR = 0,8P', 'Ne, MR = P', 'Ne moremo določiti'], 0,
    'MR = P(1 + 1/E) = P(1 − 5) < 0 - neelastičen del povpraševanja.'),
]);

const oligopol = [
  Q('Kaj velja za monopolistično konkurenco na dolgi rok? (izpit 31. 1. 2022)', ['Dobiček je 0, mrtva izguba pa je pozitivna', 'Dobiček in mrtva izguba sta 0', 'Dobiček je pozitiven, mrtve izgube ni', 'Enako kot pri monopolu'], 0,
    'P = LAC, a P > MC. Trditev, da je kot pri popolni konkurenci, je napačna.'),
  Q('Katera NI značilnost monopolistične konkurence?', ['Homogeni proizvodi', 'Veliko proizvajalcev z majhnim deležem', 'Diferencirani proizvodi', 'Prost vstop in izstop'], 0,
    'Križna elastičnost je pozitivna, a ne neskončna.'),
  QF('Mercedes (vrstice) in BMW (stolpci): E/E = 10.000, 8.000; E/B = 9.000, 5.000; B/E = 8.000, 12.000; B/B = 11.000, 11.000. Kaj velja? (izpit 17. 1. 2022)', ['Mercedes ima dominantno strategijo bencinska vozila, BMW je nima.', 'Obe podjetji imata dominantno strategijo električna vozila.', 'V ravnotežju bosta razvijala bencinska vozila.', 'Mercedes nima dominantne strategije, BMW ima dominantno strategijo električna vozila.'], 3,
    'BMW: 8.000 > 5.000 in 12.000 > 11.000 → vedno E. Mercedes: ob E izbere E, ob B izbere B. Nash: (E, E).'),
  Q('Kamen-škarje brez papirja: Kamen/Kamen 0,0; Kamen/Škarje 1,−1; Škarje/Kamen −1,1; Škarje/Škarje 0,0. Kaj velja? (izpit 31. 1. 2022)', ['Oba imata dominantno strategijo kamen, izid (0,0)', 'Oba imata dominantno strategijo škarje', 'Noben nima dominantne strategije', 'Ravnotežij je več'], 0,
    'Kamen da vedno več (0 > −1, 1 > 0).'),
  Q('Kaj je Nashevo ravnotežje?', ['Nihče nima razloga enostransko spremeniti strategije', 'Oba igralca dosežeta največji skupni dobiček', 'Vsak igra dominantno strategijo', 'Igralca se dogovorita'], 0,
    'Ni nujno najboljši skupni izid (zapornikova dilema).'),
  Q('Kako OPEC kot vodilno podjetje določi ceno?', ['D_OPEC = D_trg − S_ostalih, nato MR_OPEC = MC_OPEC', 'P = MC_OPEC', 'Cena je enaka ceni ostalih', 'Vsaka članica izbere svojo ceno'], 0,
    'Ostali ceno sprejmejo in ponudijo po svoji ponudbi.'),
  Q('Katera dva pogoja potrebuje uspešen kartel?', ['Neelastično povpraševanje in dogovor o količinah, ki se ga članice držijo', 'Elastično povpraševanje in veliko članic', 'Homogen proizvod in državno lastništvo', 'Nizke fiksne stroške in prost vstop'], 0,
    'Z elastičnim povpraševanjem nima monopolne moči.'),
  Q('V katerem modelu oligopola podjetji hkrati izbirata količine?', ['Cournot', 'Stackelberg', 'Bertrand', 'Prelomljena krivulja povpraševanja'], 0,
    'Stackelberg: vodilno podjetje izbere prvo. Bertrand: konkurenca s cenami.'),
];

const oligopolRac = calc([
  Q('Cournot: P = 30 − Q, MC = 0, dve enaki podjetji. Količina podjetja in cena?', ['q = 10, P = 10', 'q = 15, P = 0', 'q = 7,5, P = 15', 'q = 10, P = 20'], 0,
    'Reakcija q₁ = (30 − q₂)/2 → q = 10, Q = 20, P = 10.'),
  Q('Stackelberg: P = 30 − Q, MC = 0. Količini vodilnega in sledečega podjetja?', ['15 in 7,5', '10 in 10', '7,5 in 15', '20 in 5'], 0,
    'Vodja upošteva q₂ = (30 − q₁)/2 → max (15 − q₁/2)q₁ → q₁ = 15, q₂ = 7,5, P = 7,5.'),
]);

const trgDela = [
  Q('Do katere točke zaposluje podjetje na konkurenčnem trgu proizvodov?', ['P · MPL = w', 'MPL = w', 'APL = w', 'MC = w'], 0,
    'VMP_L = P · MPL. V splošnem MRP_L = MR · MPL.'),
  Q('Višja plača zmanjša ponudbo dela. Kaj velja? (izpit 17. 1. 2022)', ['Učinka delujeta nasprotno, prevlada učinek dohodka', 'Prevlada učinek substitucije', 'Učinka delujeta v isto smer', 'Oba učinka sta negativna'], 0,
    'Nazaj zavita ponudba: več dohodka → več prostega časa.'),
  Q('Kako imenujemo podjetje, ki je edini delodajalec na trgu?', ['Monopsonist', 'Monopolist', 'Oligopolist', 'Kartel'], 0,
    'Zaposli kjer ME = MRP, plača je na ponudbi dela.'),
  Q('Pri kateri strategiji sindikata velja MR = 0?', ['Maksimiranje skupnega plačila', 'Maksimiranje zaposlenosti', 'Maksimiranje ekonomske rente', 'Bilateralni monopol'], 0,
    'Max zaposlenost: D = S; max renta: MR = S_L.'),
  Q('Kaj določa plačo v bilateralnem monopolu?', ['Pogajalska moč monopsonista in sindikata', 'Samo ponudba dela', 'Samo država', 'Presečišče D in S'], 0,
    'Plača je med željo monopsonista in željo sindikata.'),
];

const trgDelaRac = calc([
  Q('D: w = 1000 − 4L, S: w = 100 + 2L. Sindikat preide z max skupnega plačila na max zaposlenost. Za koliko se poveča zaposlenost? (izpit 17. 1. 2022)', ['Za 25', 'Za 60', 'Za 50', 'Za 150'], 0,
    'Max plačilo: MR = 1000 − 8L = 0 → L = 125. Max zaposlenost: D = S → L = 150.'),
  Q('MPL = 24L^−½, P = 2, w = 12. Koliko delavcev zaposli podjetje? (izpit 31. 1. 2022)', ['16', '4', '2', '1'], 0,
    '2 · 24 · L^−½ = 12 → L^−½ = 0,25 → L = 16.'),
  Q('Monopsonist: S: w = 10 + L, MRP = 100 − 2L. Zaposlenost in plača?', ['L = 22,5, w = 32,5', 'L = 30, w = 40', 'L = 22,5, w = 55', 'L = 45, w = 10'], 0,
    'ME = 10 + 2L = 100 − 2L → L = 22,5; plača na ponudbi: 32,5. Konkurenca bi dala L = 30, w = 40.'),
]);

/* izpitne naloge iz 1. dela snovi (K1) */
const izpitK1 = calc([
  Q('Dohodek 30 €, kava 1 €, voda 0,5 €. Kaj velja? (izpit 17. 1. 2022)', ['OC dodatne kave sta 2 enoti vode', 'OC dodatne vode sta 2 enoti kave', 'OC dodatne vode je 1 kava', 'OC dodatne kave je ½ vode'], 0,
    'Kava stane dvakrat toliko kot voda; OC vode je ½ kave.'),
  Q('Q_Coca = 1200 − 3P_Coca + 2P_Pepsi + 3M − 2P_Hotdog. Kaj velja? (izpit 17. 1. 2022)', ['Coca-Cola in Pepsi sta substituta, Coca-Cola je normalna dobrina', 'Sta substituta, Coca-Cola je inferiorna', 'Pepsi in hotdog sta substituta', 'Sta komplementa'], 0,
    '+2P_Pepsi → substituta; +3M → normalna; −2P_Hotdog → komplement.'),
  Q('U = 2x^0,5 y^0,6, Px = 10, Py = 6, M = 44. Ravnotežje? (izpit 17. 1. 2022)', ['x = 2, y = 4', 'x = 4, y = 2', 'x = 2,2, y = 3,7', 'x = 0, y = 7,3'], 0,
    'Cobb-Douglas: x = (0,5/1,1) · 44/10 = 2; y = (0,6/1,1) · 44/6 = 4.'),
  Q('P = 25 − 0,2Q. Velikost cenovne elastičnosti pri P = 5? (izpit 31. 1. 2022)', ['0,25', '4', '0,2', '1'], 0,
    'Q = 100, dQ/dP = −5 → E = −5 · 5/100 = −0,25.'),
  Q('Ana pije 2 dcl vode na 1 dcl soka, voda 3 €, sok 4 €, 30 €. Koliko popije? (izpit 31. 1. 2022)', ['6 dcl vode in 3 dcl soka', '10 dcl vode in 7,5 dcl soka', '6 dcl vode in 2 dcl soka', '3 dcl vode in 6 dcl soka'], 0,
    'Košarica 2 · 3 + 4 = 10 € → 3 košarice.'),
  Q('Ponudba vstopnic je fiksna 150.000, D: Q = 350.000 − 800P. Davek 10 € plača potrošnik. Pd in Ps? (izpit 17. 1. 2022)', ['Pd = 250, Ps = 240', 'Pd = 260, Ps = 250', 'Pd = 255, Ps = 245', 'Pd = 250, Ps = 250'], 0,
    'Ravnotežje P = 250. Navpična ponudba → davek v celoti nosi ponudnik.'),
  Q('S: Q = 1800 + 2P, D: Q = 11.400 − 4P, subvencija najemniku 1.800 $. Ps in Pd? (izpit 31. 1. 2022)', ['Ps = 2.800, Pd = 1.000', 'Ps = 1.600, Pd = −200', 'Ps = 2.200, Pd = 400', 'Ps = 3.400, Pd = 1.600'], 0,
    'Brez subvencije P = 1.600, Q = 5.000. 1800 + 2Ps = 11.400 − 4(Ps − 1800) → Ps = 2.800, Q = 7.400.'),
  Q('Maslo in marmelada sta komplementa. Maslo se poceni. Kaj se zgodi? (izpit 31. 1. 2022)', ['Povpraševanje po marmeladi se premakne v desno', 'Premakne se v levo', 'Spremeni se le obseg povpraševanja', 'Nič'], 0,
    'Cenejši komplement poveča povpraševanje.'),
]);

const kartice = cards([
  ['Kratko vs. dolgo obdobje', 'Kratko: vsaj en dejavnik stalen. Dolgo: vsi dejavniki spremenljivi.'],
  ['MP in AP', 'MP > AP → AP narašča; MP = AP v max AP; TP max pri MP = 0.'],
  ['MRTS', 'MRTS_L = −ΔK/ΔL = MPL/MPK (naklon izokvante).'],
  ['Donosi obsega (Cobb-Douglas)', 'α + β > 1 naraščajoči, = 1 konstantni, < 1 padajoči.'],
  ['Stroški - formule', 'TC = FC + VC; MC = ΔVC/ΔQ; AFC = FC/Q; AVC = VC/Q; ATC = AFC + AVC.'],
  ['MC in AVC/ATC', 'MC seka AVC in ATC v njunih minimumih. MC = w/MPL, AVC = w/APL.'],
  ['Fiksni davek', 'Povečajo se FC, AFC, ATC; MC in AVC ostaneta enaka.'],
  ['Optimum dejavnikov', 'MPL/w = MPK/r. Če MPL/w > MPK/r → več dela, manj kapitala.'],
  ['LAC in donosi', 'Naraščajoči donosi → LAC pada; konstantni → vodoravna; padajoči → narašča.'],
  ['Popolna konkurenca', 'P = MR = AR; optimum P = MC (potrebni), P ≥ AVCmin (zadostni).'],
  ['Točka preloma / indiferentnosti', 'Preloma: P = ATCmin (dobiček 0). Indiferentnosti: P = AVCmin (izguba = FC).'],
  ['Dolgoročno ravnotežje PK', 'P = LMC = LACmin, ekonomski dobiček 0; št. podjetij = Q_trg / q.'],
  ['Monopol', 'MR = MC; MR = P(1 + 1/E); proizvaja na elastičnem delu; P = MC/(1 + 1/E).'],
  ['Linearna D in MR', 'P = a − bQ → MR = a − 2bQ; Q_konk = 2 · Q_mon (pri konst. MC).'],
  ['Naravni monopol', 'Visoki FC, nizki MC. Regulacija P = ATC (normalen donos) ali P = MC (subvencija).'],
  ['Cenovna diskriminacija', '1. stopnje: CS = 0, ni DWL. 2. stopnje: po količini. 3. stopnje: po skupinah.'],
  ['Monopolistična konkurenca', 'Diferencirani proizvodi, prost vstop. Dolgi rok: dobiček 0, DWL > 0.'],
  ['Teorija iger', 'Dominantna strategija: najboljša ne glede na tekmeca. Nash: nihče ne želi enostransko spremeniti.'],
  ['Oligopol - modeli', 'Cournot (količine hkrati), Stackelberg (vodja prvi), Bertrand (cene), prelomljena D.'],
  ['OPEC', 'D_OPEC = D_trg − S_ostalih; MR_OPEC = MC_OPEC. Pogoja: neelastična D, dogovor o količinah.'],
  ['Povpraševanje po delu', 'MRP_L = MR · MPL = w (konkurenca: P · MPL = w).'],
  ['Sindikat - 3 strategije', 'Max zaposlenost D = S; max skupno plačilo MR = 0; max renta MR = S_L.'],
  ['Monopson', 'ME = MRP, plača na ponudbi → manj zaposlenih, nižja plača.'],
]);


// težji napačni odgovori (podobna dolžina) - ključ je začetek vprašanja, pravilni je na indeksu 0
const TEZJI = {
  'Zakon o padajočem donosu pravi': ['Po neki točki začne mejni proizvod spremenljivega dejavnika padati', 'Po neki točki začne celotni proizvod padati pri vsakem dodatnem delavcu', 'Povprečni proizvod je ves čas večji od mejnega proizvoda dejavnika', 'Ob podvojitvi vseh dejavnikov se proizvod poveča manj kot dvakrat'],
  'Čemu je enaka mejna stopnja tehnične': ['MPL / MPK', 'MPK / MPL', 'APL / APK', 'r / w'],
  'Kakšna je izokvanta pri popolni nadomestljivosti': ['Premica s konstantno MRTS', 'Krivulja v obliki črke L', 'Konveksna krivulja s padajočo MRTS', 'Navpična premica pri danem K'],
  'Kakšni so donosi obsega pri Q = 2K^¼': ['Padajoči (¼ + ½ < 1)', 'Konstantni (2 · ¼ · ½ = ¼)', 'Naraščajoči (koeficient 2 > 1)', 'Najprej naraščajoči, nato padajoči'],
  'Kako se ekonomski stroški razlikujejo': ['Vključujejo tudi oportunitetne stroške, zato so večji', 'Vključujejo samo eksplicitne stroške, zato so enaki', 'Ne vključujejo plač, zato so manjši od računovodskih', 'Vključujejo le utopljene stroške preteklih naložb'],
  'Kateri pogoj velja v optimalni kombinaciji': ['MPL/w = MPK/r', 'MPL/r = MPK/w', 'MPL = MPK', 'APL/w = APK/r'],
  'Kaj je krivulja LAC': ['Ovojnica kratkoročnih krivulj povprečnih stroškov', 'Vsota vseh kratkoročnih krivulj mejnih stroškov', 'Krivulja povprečnih fiksnih stroškov na dolgi rok', 'Povezava optimalnih kombinacij dela in kapitala'],
  'Kakšna je krivulja povpraševanja za posamezno': ['Vodoravna (popolnoma elastična)', 'Padajoča, enaka tržni krivulji', 'Navpična (popolnoma neelastična)', 'Naraščajoča kot krivulja MC'],
  'Kaj je zadostni pogoj za kratkoročno': ['P ≥ AVCmin', 'P ≥ ATCmin', 'P ≥ AFCmin', 'P ≥ LACmin'],
  'Cena pokriva le povprečne variabilne': ['Točka indiferentnosti (zaprtja)', 'Točka preloma (ničelni dobiček)', 'Dolgoročno ravnotežje panoge', 'Optimum tehnične učinkovitosti'],
  'AVCmin < P < ATCmin': ['Proizvaja z izgubo, ki je manjša od FC', 'Takoj zapre, ker ne pokrije vseh stroškov', 'Proizvaja, dokler ne pokrije ATC z dobičkom', 'Zmanjša količino, dokler ni P = ATC'],
  'Kaj je kratkoročna krivulja ponudbe popolnega': ['Krivulja MC nad minimumom AVC', 'Krivulja MC nad minimumom ATC', 'Krivulja ATC nad minimumom AVC', 'Krivulja AVC nad minimumom MC'],
  'Kaj velja v dolgoročnem ravnotežju popolne': ['P = LMC = LACmin, ekonomski dobiček je 0', 'P = LMC > LACmin, ekonomski dobiček je pozitiven', 'P = AVCmin, podjetje pokriva le variabilne stroške', 'P = LACmin, računovodski dobiček pa je enak 0'],
  'Cena ravno pokrije ATC; nato se uvede davek': ['ATC se povečajo, podjetje ima izgubo, Q ostane enak', 'MC se povečajo, podjetje zmanjša proizvodnjo', 'AVC se povečajo, zato podjetje takoj zapre', 'ATC in MC se povečajo, Q in cena narasteta'],
  'TR = 10.000, FC = 2.000': ['Poveča proizvodnjo, ker je P = 5 > MC', 'Zmanjša proizvodnjo, ker je ATC > MC', 'Zapre obrat, ker je MC < AVC', 'Ostane pri Q, ker ima dobiček 2.000'],
  'Linearno povpraševanje in konstantni MC': ['Konkurenčna količina je dvakrat večja od monopolne', 'Konkurenčna količina je dvakrat manjša od monopolne', 'Dobiček monopolista je dvakrat večji od konkurenta', 'Monopolna cena je dvakrat višja od konkurenčne'],
  'Kaj je značilno za naravni monopol': ['Visoki fiksni in nizki mejni stroški, ATC pada', 'Nizki fiksni in visoki mejni stroški, ATC raste', 'Patent, ki ga podeli država za omejen čas', 'Lastništvo edinega vira surovine na trgu'],
  'Kaj velja za monopolistično konkurenco na dolgi': ['Dobiček je 0, mrtva izguba pa je pozitivna', 'Dobiček in mrtva izguba sta enaka 0', 'Dobiček je pozitiven, mrtve izgube ni', 'Dobiček je pozitiven, kot pri monopolu'],
  'Kamen-škarje brez papirja': ['Oba imata dominantno strategijo kamen, izid (0,0)', 'Oba imata dominantno strategijo škarje, izid (0,0)', 'Noben igralec nima dominantne strategije', 'Ravnotežij je več, vsa vodijo do izida (0,0)'],
  'Kaj je Nashevo ravnotežje': ['Nihče nima razloga enostransko spremeniti strategije', 'Oba igralca dosežeta največji možni skupni dobiček', 'Vsak igralec igra svojo dominantno strategijo', 'Igralca se dogovorita in delita dobiček na pol'],
  'Kako OPEC kot vodilno podjetje': ['D_OPEC = D_trg − S_ostalih, nato MR_OPEC = MC_OPEC', 'D_OPEC = D_trg + S_ostalih, nato P_OPEC = MC_OPEC', 'S_ostalih = D_trg, nato MR_ostalih = MC_OPEC', 'D_OPEC = D_trg, nato MR_OPEC = MC_ostalih'],
  'Katera dva pogoja potrebuje uspešen kartel': ['Neelastično povpraševanje in dogovor o količinah', 'Elastično povpraševanje in veliko število članic', 'Homogen proizvod in prost vstop novih članic', 'Nizki fiksni stroški in državna lastnina članic'],
  'Do katere točke zaposluje podjetje': ['P · MPL = w', 'P · APL = w', 'MPL = w', 'MC · MPL = w'],
  'Višja plača zmanjša ponudbo dela': ['Učinka delujeta nasprotno, prevlada učinek dohodka', 'Učinka delujeta nasprotno, prevlada učinek substitucije', 'Učinek dohodka in substitucije delujeta v isto smer', 'Oba učinka sta negativna in enako velika'],
  'Kako imenujemo podjetje, ki je edini delodajalec': ['Monopsonist', 'Monopolist', 'Oligopsonist', 'Kartel'],
  'Pri kateri strategiji sindikata velja MR = 0': ['Maksimiranje skupnega plačila', 'Maksimiranje zaposlenosti', 'Maksimiranje ekonomske rente', 'Maksimiranje plače na delavca'],
  'Kaj določa plačo v bilateralnem monopolu': ['Pogajalska moč monopsonista in sindikata', 'Presečišče tržne ponudbe in povpraševanja', 'Mejni izdatek monopsonista, ki je enak MRP', 'Mejni prihodek sindikata, ki je enak 0'],
  'Linearno povpraševanje, E = −0,2': ['Da, MR = P(1 − 5) = −4P', 'Ne, MR = P(1 − 0,2) = 0,8P', 'Ne, MR = P(1 + 0,2) = 1,2P', 'Da, MR = P(1 − 0,2) − P'],
  'Q_Coca = 1200': ['Substituta, Coca-Cola je normalna dobrina', 'Substituta, Coca-Cola je inferiorna dobrina', 'Komplementa, Pepsi je inferiorna dobrina', 'Pepsi in hotdog sta substituta'],
  'Maslo in marmelada sta komplementa': ['Povpraševanje po marmeladi se premakne v desno', 'Povpraševanje po marmeladi se premakne v levo', 'Spremeni se le obseg povpraševanja po marmeladi', 'Krivulja se premakne desno in nato nazaj'],
};
const utrdi = (arr) => arr.map((q) => {
  if (q.fixedOrder) return q;
  const k = Object.keys(TEZJI).find((p) => q.q.startsWith(p));
  return k ? { ...q, options: TEZJI[k], correct: 0 } : q;
});

module.exports = {
  id: 'mikro',
  parts: [
    {
      id: 'k2', name: '2. kolokvij (proizvodnja, stroški, popolna konkurenca)', type: 'kolokvij',
      notesMd: NOTES_K2,
      decks: [
        { id: 'mikro-k2-proizvodnja', name: 'Proizvodnja', questions: utrdi(proizvodnja) },
        { id: 'mikro-k2-stroski', name: 'Proizvodni stroški', questions: utrdi(stroski) },
        { id: 'mikro-k2-konkurenca', name: 'Popolna konkurenca', questions: utrdi(konkurenca) },
        { id: 'mikro-k2-racunske', name: 'Računske naloge', calc: true, questions: utrdi([...proizvodnjaRac, ...stroskiRac, ...konkurencaRac]) },
      ],
      flashcards: [{ id: 'mikro-c-k2', name: 'Formule in pojmi (K2)', cards: kartice.slice(0, 12) }],
    },
    {
      id: 'izpit', name: 'Izpit (celota)', type: 'izpit',
      notesMd: NOTES_K2 + NOTES_K3,
      prependNotesOf: 'k1',
      decks: [
        { id: 'mikro-iz-monopol', name: 'Monopol', questions: utrdi(monopol) },
        { id: 'mikro-iz-oligopol', name: 'Monopolistična konkurenca, oligopol, igre', questions: utrdi(oligopol) },
        { id: 'mikro-iz-delo', name: 'Trg dela', questions: utrdi(trgDela) },
        { id: 'mikro-iz-racunske', name: 'Računske naloge (monopol, oligopol, trg dela)', calc: true, questions: utrdi([...monopolRac, ...oligopolRac, ...trgDelaRac]) },
        { id: 'mikro-iz-k1', name: 'Izpitne naloge iz 1. dela snovi', calc: true, questions: utrdi(izpitK1) },
      ],
      flashcards: [{ id: 'mikro-c-iz', name: 'Formule in pojmi (izpit)', cards: kartice }],
    },
  ],
};
