/* Mikroekonomija 1 (1. letnik, 1. semester) - 2. kolokvij in izpit.
   Viri: učni načrt 2025/26, predavanja 5-7 in 9 (EF Zapiski). Vaje v slogu izpita so napisane na novo
   (lastna formulacija, nove številke); vsi številski rezultati so preračunani.
   K2 (12. 12.): 5. proizvodnja, 6. stroški, 7. popolna konkurenca. Izpit_K3: 9. monopol, 10. mon. konkurenca/oligopol, 11. trg dela. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const QF = (q, options, correct, explanation) => ({ q, options, correct, explanation, fixedOrder: true });
const calc = (arr) => arr.map((q) => ({ ...q, calc: true }));
const cards = (arr) => arr.map(([front, back]) => ({ front, back }));

const NOTES_K2 = `
## Kako poteka kolokvij
- **2. kolokvij**: proizvodnja, stroški, popolna konkurenca. 33 % ocene, opravljen pri 50 % točk.
- Format: 40 min, 33 točk. Vprašanja 1-4 obkrožiš (3 točke, z izračunom), 5-7 so daljše naloge s sliko (7 točk).
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
- Npr. Q = 3K^⅓L^½ → 5/6 < 1 → padajoči. Q = 4√K + 7√L → padajoči (vsak člen se poveča le za √t).

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
` + require('../letnik1-primeri').mikroK2;   // lastni rešeni primeri

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
  withId('q1ki3wl2', Q('Kaj je značilno za KRATKO obdobje v proizvodnji?', ['Vsaj en proizvodni dejavnik je stalen', 'Vsi dejavniki so spremenljivi', 'Tehnologija se spreminja', 'Podjetje lahko vstopi ali izstopi iz panoge'], 0,
    'Dolgo obdobje: ni stalnih dejavnikov. V kratkem obdobju se tehnologija ne spreminja.')),
  withId('qhjq199', Q('Zakon o padajočem donosu pravi, da:', ['Po neki točki začne mejni proizvod spremenljivega dejavnika padati', 'Celotni proizvod vedno pada', 'Povprečni proizvod je vedno večji od mejnega', 'Ob podvojitvi vseh dejavnikov se proizvod manj kot podvoji'], 0,
    'Velja v kratkem roku (en dejavnik stalen). Zadnja možnost opisuje padajoče DONOSE OBSEGA (dolgi rok).')),
  withId('qkxhdb9', Q('Kaj velja, ko je mejni proizvod dela VEČJI od povprečnega?', ['Povprečni proizvod narašča', 'Povprečni proizvod pada', 'Povprečni proizvod je v maksimumu', 'Celotni proizvod pada'], 0,
    'MP = AP v maksimumu AP; MP < AP → AP pada.')),
  withId('quod5mq', Q('Kdaj je celotni proizvod v maksimumu?', ['Ko je mejni proizvod enak 0', 'Ko je mejni proizvod v maksimumu', 'Ko je MP = AP', 'Ko je povprečni proizvod enak 0'], 0,
    'Max MP je v prevoju TP; MP = AP v maksimumu AP.')),
  withId('q1nc3lc7', Q('Čemu je enaka mejna stopnja tehnične nadomestljivosti MRTS_L?', ['MPL / MPK', 'MPK / MPL', 'w / r', 'APL / APK'], 0,
    'Naklon izokvante. V ravnotežju je enak razmerju cen w/r.')),
  withId('q1gb8i9w', Q('Kakšna je izokvanta pri popolni nadomestljivosti dejavnikov (Q = aK + bL)?', ['Premica s konstantno MRTS', 'V obliki črke L', 'Konveksna krivulja', 'Navpična premica'], 0,
    'Pri stalnem razmerju (popolni komplementi) je izokvanta v obliki črke L.')),
  withId('qzdfxcv', Q('Kakšni so donosi obsega pri Q = 4√K + 7√L?', ['Padajoči, ker se proizvod poveča le za faktor √t', 'Konstantni, ker imata oba dejavnika enak eksponent', 'Naraščajoči, ker je vsota koeficientov 11 > 1', 'Ni jih mogoče določiti brez cen dejavnikov'], 0,
    'Q(tK, tL) = 4√(tK) + 7√(tL) = √t · Q(K, L) < t · Q → padajoči donosi obsega. Koeficienta 4 in 7 na donose obsega ne vplivata.')),
  withId('qt37fe6', Q('Kakšni so donosi obsega pri Q = 3K^⅓ L^½?', ['Padajoči (⅓ + ½ < 1)', 'Konstantni (3 · ⅓ = 1)', 'Naraščajoči (koeficient 3 > 1)', 'Najprej naraščajoči, nato padajoči'], 0,
    'Vsota eksponentov ⅓ + ½ = 5/6 < 1. Koeficient 3 na donose obsega ne vpliva.')),
];

const proizvodnjaRac = calc([
  withId('qy273u', Q('Produkcijska funkcija Q = K^0,3 L^0,7. Kolikšen je povprečni proizvod dela (APL = Q/L)?', ['APL = (K/L)^0,3', 'APL = 0,7 · (K/L)^0,3', 'APL = K^0,3', 'APL = 0,3 · (L/K)^0,7'], 0,
    'APL = Q/L = K^0,3 L^0,7 / L = K^0,3 L^−0,3 = (K/L)^0,3. Druga možnost je MPL (0,7 · APL), zadnja MPK.')),
  withId('qe2i4lr', { q: "Podjetje proizvaja po funkciji Q = K^0,25 L^0,75 in uporablja K = 81 enot kapitala ter L = 16 enot dela. Koliko znašata povprečni (APL) in mejni proizvod dela (MPL)?",
      options: ["APL = 1,5; MPL = 1,125","APL = 1,125; MPL = 1,5","APL = 24; MPL = 18","APL = 1,5; MPL = 0,375"],
      correct: 0,
      explanation: "Q = 81^0,25 · 16^0,75 = 3 · 8 = 24. APL = Q/L = 24/16 = 1,5. MPL = 0,75 · Q/L = 1,125. Zadnja možnost uporabi eksponent kapitala (0,25), tretja pozabi deliti z L.",
      calc: true }),
  withId('qirw16e', { q: "Produkcijska funkcija je Q = 3·L^0,6·K^0,3. Kolikšna je mejna stopnja tehnične substitucije MRTS (MPL/MPK) pri L = 12 in K = 18?",
      options: ["3","1/3 ≈ 0,33","4/3 ≈ 1,33","2"],
      correct: 0,
      explanation: "MRTS = MPL/MPK = (0,6/0,3)·(K/L) = 2 · 18/12 = 3: za dodatno enoto dela lahko kapital zmanjšamo za 3 enote. Možnost 2 upošteva le razmerje eksponentov, 4/3 obrne K/L.",
      calc: true }),
  withId('q1n54zxb', Q('Kako hitro raste proizvod z dodatnim delavcem, če je Q = 3K^⅓ L^½? Izračunaj MPL.', ['1,5 K^⅓ · L^−½', 'K^−⅔ · L^½', '1,5 K^⅓ · L^½', '3 K^⅓ · L^−½'], 0,
    'MPL = 3 · ½ · K^⅓ · L^−½. Druga možnost je MPK.')),
]);

const stroski = [
  withId('q1xjwm7t', Q('Kako se ekonomski stroški razlikujejo od računovodskih?', ['Vključujejo tudi oportunitetne stroške, zato so večji', 'Vključujejo samo eksplicitne stroške', 'So vedno manjši', 'Ne vključujejo plač'], 0,
    'Računovodski = eksplicitni (vidni). Ekonomist presoja z vidika alternativnih naložb.')),
  withId('q1sem7rg', Q('Na katere stroške NE vplivajo fiksni stroški?', ['Na mejne stroške', 'Na celotne stroške', 'Na povprečne celotne stroške', 'Na povprečne fiksne stroške'], 0,
    'MC = ΔTC/ΔQ = ΔVC/ΔQ.')),
  withId('qmaarm3', Q('Občina podjetju zaračuna letno takso v enakem znesku ne glede na obseg proizvodnje. Katere stroškovne krivulje se premaknejo?', ['FC, AFC in ATC; MC in AVC ostanejo enaki', 'FC in AFC; ATC in MC ostanejo enaki', 'FC, AFC, ATC in MC', 'Samo FC; povprečne krivulje ostanejo enake'], 0,
    'Taksa je fiksni strošek: ni odvisna od Q, zato ne vpliva na MC in AVC, poveča pa AFC in s tem ATC.')),
  withId('q1bpxrfx', Q('Podjetje opazi, da povprečni variabilni stroški še padajo, čeprav mejni stroški že rastejo. Kje leži krivulja MC glede na AVC?', ['Pod AVC', 'Nad AVC', 'Na AVC, ker sta v minimumu', 'Tega ni mogoče določiti'], 0,
    'AVC pada, dokler je MC pod njimi (vsaka dodatna enota je cenejša od povprečja). MC seka AVC v minimumu AVC.')),
  withId('q1npsx4b', Q('Kje mejni stroški sekajo povprečne celotne stroške?', ['V minimumu ATC', 'V maksimumu ATC', 'Pri Q = 0', 'Nikoli'], 0,
    'Enako MC seka AVC v minimumu AVC.')),
  withId('qsgy3of', Q('Kakšna je povezava med mejnimi stroški in mejnim proizvodom dela?', ['MC = w / MPL', 'MC = MPL / w', 'MC = w · MPL', 'MC = w / APL'], 0,
    'AVC = w/APL. Ko MPL narašča, MC pada.')),
  withId('q1kj5j3s', QF('"V obsegu, kjer mejni proizvod dela še raste, stane vsaka dodatna enota proizvoda več kot prejšnja." Ali trditev drži?', ['Da, ker takrat AVC raste', 'Ne, ker je takrat MC = w/MPL padajoč', 'Da, ker AFC ves čas pada', 'Ne, ker takrat celotni stroški padajo'], 1,
    'MC = w/MPL: dokler MPL raste, MC pada - celotni stroški rastejo, a vse počasneje.')),
  withId('q10hd5vt', Q('Kaj je naklon izokoste?', ['−w/r', '−r/w', '−MPL/MPK', '−TC/r'], 0,
    'TC = wL + rK → K = TC/r − (w/r)L.')),
  withId('q1vyexjq', Q('Kateri pogoj velja v optimalni kombinaciji dejavnikov?', ['MPL/w = MPK/r', 'MPL = MPK', 'w = r', 'MPL/MPK = r/w'], 0,
    'Naklon izokvante (MRTS) = naklon izokoste (w/r).')),
  withId('q114lyou', Q('MPL = 40, MPK = 90, w = 20, r = 30. Kako naj podjetje prerazporedi dejavnike, da enak Q doseže ceneje?', ['Poveča kapital in zmanjša delo', 'Poveča delo in zmanjša kapital', 'Uporablja samo delo', 'Nič, je že v ravnotežju'], 0,
    'MPL/w = 40/20 = 2 < MPK/r = 90/30 = 3 → zadnji evro v kapitalu prinese več proizvoda, zato kapital povečuje, delo zmanjšuje.')),
  withId('qjxp2vq', Q('Kaj je krivulja LAC?', ['Ovojnica kratkoročnih krivulj povprečnih stroškov', 'Vsota kratkoročnih MC', 'Krivulja povprečnih fiksnih stroškov', 'Krivulja mejnih prihodkov'], 0,
    'Prikazuje najnižje povprečne stroške pri vsakem obsegu.')),
  withId('qkctdjc', Q('Kakšna je LAC pri konstantnih donosih obsega?', ['Vodoravna', 'Padajoča', 'Naraščajoča', 'V obliki črke U'], 0,
    'Naraščajoči donosi → LAC pada; padajoči → narašča.')),
];

const stroskiRac = calc([
  withId('qav1ovi', QF('MC = Q² − 6Q + 20, FC = 50. Katera trditev je pravilna?', ['TC = Q³ − 3Q² + 20Q + 50.', 'AVC imajo minimum pri Q = 3.', 'Vrednost MC pri minimumu AVC znaša 13,25 evra.', 'ATC = Q²/3 − 3Q + 20 + 50Q.'], 2,
    'VC = Q³/3 − 3Q² + 20Q, AVC = Q²/3 − 3Q + 20, minimum pri Q = 4,5: AVC = 13,25 = MC(4,5). Pri Q = 3 je minimum MC, ne AVC; AFC = 50/Q.')),
  withId('qzoahda', Q('Podjetje proizvaja z 2 enotama kapitala in 1 enoto dela na enoto proizvoda, Q = 60, w = 2, r = 4. Koliko K, L in kolikšni so stroški?', ['K = 120, L = 60, TC = 600', 'K = 60, L = 120, TC = 480', 'K = 120, L = 60, TC = 480', 'K = 30, L = 60, TC = 240'], 0,
    'TC = 2 · 60 + 4 · 120 = 600; LAC = 1 · 2 + 2 · 4 = 10.')),
  withId('q1kmggfw', Q('Q = 5K + 2L, w = 8, r = 15. Kako podjetje najceneje proizvede Q = 300?', ['K = 60, L = 0', 'L = 150, K = 0', 'K = 30, L = 75', 'K = 60, L = 150'], 0,
    'Popolni substituti: MPK/r = 5/15 = 0,33 > MPL/w = 2/8 = 0,25 → samo kapital: K = 300/5 = 60, TC = 900 (samo delo bi stalo 1.200). LTC = 3Q.')),
  withId('qvr3p74', Q('Kapital in delo se uporabljata v stalnem razmerju K : L = 2 : 1; za enoto proizvoda so potrebne 3 enote dela. r = 5, w = 12. Najnižji stroški za Q = 80?', ['5.280', '6.960', '3.480', '2.880'], 0,
    'L = 3Q = 240, K = 6Q = 480 → 480 · 5 + 240 · 12 = 2.400 + 2.880 = 5.280; LAC = 66. (Zamenjani ceni dasta 6.960.)')),
  withId('qb8kvco', Q('TC = 100 + 10Q + Q². Pri kateri ceni je točka preloma (P = ATCmin)?', ['30', '10', '20', '50'], 0,
    'ATC = 100/Q + 10 + Q, min pri Q = 10 → ATC = 30. AVC = 10 + Q ima min 10 (točka indiferentnosti).')),
]);

const konkurenca = [
  withId('qyedds2', Q('Katera NI predpostavka popolne konkurence?', ['Diferencirani proizvodi', 'Veliko kupcev in prodajalcev', 'Prost vstop in izstop', 'Popolna informiranost'], 0,
    'Proizvodi so homogeni (standardizirani).')),
  withId('q1sc3b1b', Q('Kakšna je krivulja povpraševanja za posamezno popolnokonkurenčno podjetje?', ['Vodoravna (popolnoma elastična)', 'Padajoča', 'Navpična', 'Enaka tržnemu povpraševanju'], 0,
    'P = MR = AR - podjetje sprejema ceno.')),
  withId('q8ldgrz', Q('Kateri pogoj velja za maksimiranje dobička za VSA podjetja?', ['MR = MC', 'P = MC', 'P = ATC', 'P = AVC'], 0,
    'P = MC velja le pri popolni konkurenci (tam je P = MR).')),
  withId('qxjoo80', Q('Kaj je zadostni pogoj za kratkoročno proizvodnjo popolnega konkurenta?', ['P ≥ AVCmin', 'P ≥ ATCmin', 'P ≥ AFC', 'P = 0'], 0,
    'Podjetje mora pokrivati vsaj variabilne stroške.')),
  withId('q1hndcf0', Q('Pri kateri ceni je popolnemu konkurentu vseeno, ali proizvaja ali zapre obrat (izguba je v obeh primerih enaka FC)?', ['Pri P = AVCmin - točka zaprtja', 'Pri P = ATCmin - točka preloma', 'Pri P = AFC', 'Pri P = MCmin'], 0,
    'Pri P = AVCmin cena pokrije le variabilne stroške, izguba je enaka FC - kot če bi zaprl. Točka preloma (dobiček 0) je pri P = ATCmin.')),
  withId('q1ulvgti', Q('AVCmin < P < ATCmin. Kaj naj podjetje naredi v kratkem roku?', ['Proizvaja z izgubo, ki je manjša od FC', 'Takoj zapre', 'Poveča ceno', 'Proizvaja z dobičkom'], 0,
    'Pod AVCmin bi bila izguba večja od FC → zapre.')),
  withId('q1yqszpd', Q('Kaj je kratkoročna krivulja ponudbe popolnega konkurenta?', ['Krivulja MC nad minimumom AVC', 'Krivulja ATC', 'Krivulja MC pod AVC', 'Krivulja AFC'], 0,
    'Ponudba panoge = vodoravna vsota ponudb podjetij.')),
  withId('q1hhor4u', Q('Kaj velja v dolgoročnem ravnotežju popolne konkurence?', ['P = LMC = LACmin, ekonomski dobiček je 0', 'P > LAC, pozitiven dobiček', 'P < AVC', 'P = MR > MC'], 0,
    'Vstop in izstop izničita ekonomski dobiček; ostane normalen donos na kapital.')),
  withId('q1ifxfef', Q('Popolni konkurent posluje pri P = ATCmin. Država nato uvede pavšalni letni davek na poslovne prostore (neodvisen od Q). Kaj se zgodi v kratkem roku?', ['ATC se dvigne, podjetje ima izgubo, Q se ne spremeni', 'MC se dvigne, podjetje zmanjša proizvodnjo', 'AVC se dvigne, zato podjetje takoj zapre', 'ATC in MC se dvigneta, Q in cena narasteta'], 0,
    'Pavšalni davek je fiksni strošek: MC ostane enak, zato P = MC da enak Q. ATC > P → izguba, a ker P ≥ AVC, podjetje v kratkem roku proizvaja naprej.')),
];

const konkurencaRac = calc([
  withId('q1ng5q1y', Q('Popolni konkurent "Kolesar": P = 240, AVC = 4Q, FC = 1.200. Količina in dobiček?', ['Q = 30, dobiček 2.400', 'Q = 30, dobiček 3.600', 'Q = 60, izguba 1.200', 'Q = 15, dobiček 1.500'], 0,
    'VC = 4Q², MC = 8Q = 240 → Q = 30. Dobiček = 7.200 − 3.600 − 1.200 = 2.400. (3.600 je brez FC; Q = 60 dobimo, če napačno izenačimo P = AVC.)')),
  withId('q120925', Q('Popolni konkurent: TC = 100 + 10Q + Q², P = 50. Količina in dobiček?', ['Q = 20, dobiček 300', 'Q = 25, dobiček 400', 'Q = 20, dobiček 500', 'Q = 10, dobiček 200'], 0,
    'MC = 10 + 2Q = 50 → Q = 20. TR = 1.000, TC = 100 + 200 + 400 = 700.')),
  withId('q1dr1duz', { q: "Ponudba podjetja v popolni konkurenci je S = 2P, fiksni stroški so 50. Za koliko se poveča dobiček, če cena zraste s 15 na 25?",
      options: ["Za 400","Za 800","Za 200","Za 575"],
      correct: 0,
      explanation: "S = 2P pomeni MC = Q/2, zato VC = Q²/4. P = 15: Q = 30, dobiček 450 − 225 − 50 = 175. P = 25: Q = 50, dobiček 1.250 − 625 − 50 = 575. Razlika 400. (800 je le sprememba prihodka, 575 nova raven dobička, 200 = ΔP · ΔQ.)",
      calc: true }),
  withId('q14gawky', Q('Dolgoročni povprečni stroški podjetja LAC = q² − 10q + 40, tržno povpraševanje Q = 5000 − 50P. Koliko podjetij bo v panogi na dolgi rok?', ['850', '4.250', '425', '1.000'], 0,
    'LACmin pri q = 5: LAC = 15 = P. Q = 5000 − 750 = 4.250 → 4.250 / 5 = 850 podjetij. 4.250 je tržna količina.')),
  withId('qdh5ddu', Q('Popolni konkurent ima pri trenutni proizvodnji prihodke 12.000 €, fiksne stroške 3.000 €, ATC = 5, AVC = 3,5 in MC = 4. Kaj naj stori?', ['Poveča proizvodnjo, ker je P = 6 > MC', 'Zmanjša proizvodnjo, ker je ATC > MC', 'Zapre obrat, ker je MC < AVC', 'Ostane pri Q, ker ima dobiček 2.000'], 0,
    'AFC = ATC − AVC = 1,5 → Q = 3.000 / 1,5 = 2.000, P = 12.000 / 2.000 = 6. Dobiček zdaj (6 − 5) · 2.000 = 2.000; ker je P > MC, se povečanje Q splača.')),
]);

/* ---------- izpit (K3) ---------- */
const monopol = [
  withId('q5e9eua', QF('Katera trditev o monopolistu drži?', ['Mejni prihodek je za vsako enoto razen prve nižji od cene.', 'Monopolist proizvaja tam, kjer je povpraševanje neelastično.', 'Krivulja povpraševanja monopolista je bolj elastična od tržne.', 'Pri popolni cenovni diskriminaciji ostane potrošnikom majhen presežek.', 'Nobena trditev ni pravilna.'], 0,
    'MR < P (le za prvo enoto je MR = P). Monopolist proizvaja na elastičnem delu; njegovo povpraševanje JE tržno; pri popolni diskriminaciji je potrošniški presežek 0.')),
  withId('qikfx4h', Q('Na katerem delu povpraševanja proizvaja monopolist?', ['Na elastičnem (|E| > 1)', 'Na neelastičnem (|E| < 1)', 'Pri |E| = 0', 'Kjerkoli'], 0,
    'MR = P(1 + 1/E) > 0 samo, če je |E| > 1.')),
  withId('q1wnp9jw', Q('Povpraševanje je premica, mejni stroški so stalni. Kako se količina monopolista primerja s količino v popolni konkurenci?', ['Monopolist proizvede polovico konkurenčne količine', 'Monopolist proizvede dvakrat več kot konkurenca', 'Količini sta enaki, razlikujeta se le ceni', 'Razmerje je odvisno od višine MC'], 0,
    'MR = a − 2bQ ima dvakrat strmejši naklon kot povpraševanje, zato seka MC pri polovici količine, kjer povpraševanje seka MC.')),
  withId('q4pupcs', Q('Kaj je značilno za naravni monopol?', ['Visoki fiksni in nizki mejni stroški, ATC pada', 'Nizki fiksni in visoki mejni stroški', 'Patent na proizvod', 'Državna lastnina'], 0,
    'En proizvajalec oskrbi trg ceneje kot več podjetij.')),
  withId('q1sooouy', Q('Kako regulirati naravni monopol, da zasluži "normalen" donos?', ['P = ATC', 'P = MC', 'MR = MC', 'P = AVCmin'], 0,
    'P = MC odpravi mrtvo izgubo, a podjetje ima izgubo (potrebna subvencija).')),
  withId('q1x17xx', Q('Pri cenovni diskriminaciji 1. stopnje velja:', ['Potrošniški presežek je 0, mrtve izgube ni', 'Mrtva izguba je največja', 'Vsi plačajo enako ceno', 'Monopolist proizvaja manj kot brez diskriminacije'], 0,
    'Vsak kupec plača svojo maksimalno ceno.')),
  withId('q1rzznd1', Q('Elastičnost povpraševanja po čokoladi znamke A je −3, po znamki B −6. Katera si lahko privošči višji pribitek nad mejnimi stroški?', ['Znamka A (Lernerjev indeks 0,33)', 'Znamka B (Lernerjev indeks 0,17)', 'Obe enak, ker sta na istem trgu', 'Ni mogoče določiti brez MC'], 0,
    'Manj elastično povpraševanje = bolj zvesti kupci. Lerner = (P − MC)/P = −1/E: A 1/3, B 1/6.')),
];

const monopolRac = calc([
  withId('qrepkvk', Q('Monopolist: Q = 200 − 5P, VC = 4Q, FC = 150. Kolikšna je mrtva izguba?', ['810', '405', '1.620', '960'], 0,
    'P = 40 − Q/5, MR = 40 − 2Q/5 = 4 → Q = 90, P = 22. Konkurenca (P = MC = 4): Q = 180. DWL = ½ · 18 · 90 = 810. FC na mrtvo izgubo ne vpliva.')),
  withId('qi61sd0', Q('Monopolist: Q = 300 − 2P, ATC = 30 + 80/Q. Kolikšen je potrošniški presežek?', ['3.600', '7.200', '1.800', '14.400'], 0,
    'TC = 30Q + 80 → MC = 30. P = 150 − Q/2, MR = 150 − Q = 30 → Q = 120, P = 90. CS = ½ · 120 · 60 = 3.600. (14.400 bi bil presežek pri konkurenci.)')),
  withId('q6zrwyy', Q('P = 100 − 2Q, MC = 20. Monopolna cena, količina in mrtva izguba?', ['P = 60, Q = 20, DWL = 400', 'P = 40, Q = 30, DWL = 200', 'P = 60, Q = 20, DWL = 800', 'P = 20, Q = 40, DWL = 0'], 0,
    'MR = 100 − 4Q = 20 → Q = 20, P = 60. Konkurenca Q = 40. DWL = ½ · 40 · 20 = 400.')),
  withId('q1en13mf', Q('Elastičnost povpraševanja je −4, MC = 30. Cena monopolista?', ['40', '30', '120', '37,5'], 0,
    'P = MC/(1 + 1/E) = 30/0,75 = 40.')),
  withId('qakd7cv', Q('V točki na premici povpraševanja je cenovna elastičnost −0,5. Kakšen je tam mejni prihodek?', ['Negativen: MR = P(1 − 2) = −P', 'Pozitiven: MR = P(1 − 0,5) = 0,5P', 'Enak ceni: MR = P', 'Enak nič, ker je |E| < 1'], 0,
    'MR = P(1 + 1/E) = P(1 − 2) < 0 - neelastični del povpraševanja, kjer monopolist nikoli ne proizvaja. MR = 0 je pri |E| = 1.')),
]);

const oligopol = [
  withId('q1ewe8rz', Q('Kakšen je izid na trgu z monopolistično konkurenco, ko se vstopanje novih podjetij ustavi?', ['Ekonomski dobiček je 0, cena pa je nad MC (mrtva izguba)', 'Ekonomski dobiček in mrtva izguba sta 0', 'Ekonomski dobiček je pozitiven, mrtve izgube ni', 'Ekonomski dobiček je pozitiven kot pri monopolu'], 0,
    'Vstop izniči dobiček (P = LAC), a ker je povpraševanje podjetja padajoče, je P > MC: mrtva izguba in presežne zmogljivosti ostanejo.')),
  withId('q1vwrm35', Q('Katera NI značilnost monopolistične konkurence?', ['Homogeni proizvodi', 'Veliko proizvajalcev z majhnim deležem', 'Diferencirani proizvodi', 'Prost vstop in izstop'], 0,
    'Križna elastičnost je pozitivna, a ne neskončna.')),
  withId('q16qdzkm', QF('Pivovarni Alfa (vrstice) in Beta (stolpci) izbirata, ali oglašujeta (O) ali ne (N). Dobički (Alfa, Beta): O/O = 50, 40; O/N = 70, 30; N/O = 45, 60; N/N = 80, 55. Kaj velja?', ['Alfa ima dominantno strategijo N, Beta je nima.', 'Obe pivovarni imata dominantno strategijo O.', 'V ravnotežju nobena ne oglašuje.', 'Alfa nima dominantne strategije, Beta ima dominantno strategijo O.'], 3,
    'Beta: 40 > 30 in 60 > 55 → vedno O. Alfa: ob O izbere O (50 > 45), ob N izbere N (80 > 70) - nima dominantne. Nash: (O, O) z dobičkoma 50 in 40.')),
  withId('q16tth5y', Q('Igralca izbirata med strategijama A in B. Izplačila (1., 2.): A/A = 2, 2; A/B = 3, 1; B/A = 1, 3; B/B = 0, 0. Kaj velja?', ['Oba imata dominantno strategijo A, izid (2, 2)', 'Oba imata dominantno strategijo B, izid (0, 0)', 'Noben igralec nima dominantne strategije', 'Ravnotežji sta dve: (A, B) in (B, A)'], 0,
    'Za 1. igralca: proti A je A boljša (2 > 1), proti B tudi (3 > 0). Igra je simetrična, zato oba igrata A.')),
  withId('qt805y4', Q('Kaj je Nashevo ravnotežje?', ['Nihče nima razloga enostransko spremeniti strategije', 'Oba igralca dosežeta največji skupni dobiček', 'Vsak igra dominantno strategijo', 'Igralca se dogovorita'], 0,
    'Ni nujno najboljši skupni izid (zapornikova dilema).')),
  withId('qse0sd7', Q('Kako OPEC kot vodilno podjetje določi ceno?', ['D_OPEC = D_trg − S_ostalih, nato MR_OPEC = MC_OPEC', 'P = MC_OPEC', 'Cena je enaka ceni ostalih', 'Vsaka članica izbere svojo ceno'], 0,
    'Ostali ceno sprejmejo in ponudijo po svoji ponudbi.')),
  withId('q1oqnyfa', Q('Katera dva pogoja potrebuje uspešen kartel?', ['Neelastično povpraševanje in dogovor o količinah, ki se ga članice držijo', 'Elastično povpraševanje in veliko članic', 'Homogen proizvod in državno lastništvo', 'Nizke fiksne stroške in prost vstop'], 0,
    'Z elastičnim povpraševanjem nima monopolne moči.')),
  withId('quyfmow', Q('V katerem modelu oligopola podjetji hkrati izbirata količine?', ['Cournot', 'Stackelberg', 'Bertrand', 'Prelomljena krivulja povpraševanja'], 0,
    'Stackelberg: vodilno podjetje izbere prvo. Bertrand: konkurenca s cenami.')),
];

const oligopolRac = calc([
  withId('q1ru2vry', Q('Cournot: P = 30 − Q, MC = 0, dve enaki podjetji. Količina podjetja in cena?', ['q = 10, P = 10', 'q = 15, P = 0', 'q = 7,5, P = 15', 'q = 10, P = 20'], 0,
    'Reakcija q₁ = (30 − q₂)/2 → q = 10, Q = 20, P = 10.')),
  withId('q1xbfdq0', Q('Stackelberg: P = 30 − Q, MC = 0. Količini vodilnega in sledečega podjetja?', ['15 in 7,5', '10 in 10', '7,5 in 15', '20 in 5'], 0,
    'Vodja upošteva q₂ = (30 − q₁)/2 → max (15 − q₁/2)q₁ → q₁ = 15, q₂ = 7,5, P = 7,5.')),
]);

const trgDela = [
  withId('qy727ef', Q('Do katere točke zaposluje podjetje na konkurenčnem trgu proizvodov?', ['P · MPL = w', 'MPL = w', 'APL = w', 'MC = w'], 0,
    'VMP_L = P · MPL. V splošnem MRP_L = MR · MPL.')),
  withId('qmzwsk8', Q('Ko urna postavka zraste z 20 € na 30 €, Tomaž dela manj ur. Kaj to pomeni?', ['Učinka delujeta nasprotno, prevladal je učinek dohodka', 'Učinka delujeta nasprotno, prevladal je učinek substitucije', 'Oba učinka sta zmanjšala število ur', 'Prosti čas je za Tomaža inferiorna dobrina'], 0,
    'Substitucija (dražji prosti čas → več dela) in dohodek (bogatejši → več prostega časa, ker je normalna dobrina) delujeta nasprotno. Ker ur pade, prevlada učinek dohodka - nazaj zavita ponudba dela.')),
  withId('q6u8h3q', Q('Kako imenujemo podjetje, ki je edini delodajalec na trgu?', ['Monopsonist', 'Monopolist', 'Oligopolist', 'Kartel'], 0,
    'Zaposli kjer ME = MRP, plača je na ponudbi dela.')),
  withId('q1e4ge0c', Q('Pri kateri strategiji sindikata velja MR = 0?', ['Maksimiranje skupnega plačila', 'Maksimiranje zaposlenosti', 'Maksimiranje ekonomske rente', 'Bilateralni monopol'], 0,
    'Max zaposlenost: D = S; max renta: MR = S_L.')),
  withId('q6e4b7z', Q('Kaj določa plačo v bilateralnem monopolu?', ['Pogajalska moč monopsonista in sindikata', 'Samo ponudba dela', 'Samo država', 'Presečišče D in S'], 0,
    'Plača je med željo monopsonista in željo sindikata.')),
];

const trgDelaRac = calc([
  withId('ql063ir', Q('Povpraševanje po delu w = 600 − 3L, ponudba w = 60 + 1,5L. Sindikat preide s cilja največjega skupnega plačila na cilj največje zaposlenosti. Za koliko se zaposlenost poveča?', ['Za 20', 'Za 48', 'Za 28', 'Za 120'], 0,
    'Največje skupno plačilo: MR = 600 − 6L = 0 → L = 100. Največja zaposlenost: D = S → 4,5L = 540 → L = 120. Razlika 20. (L = 72 bi dala največja renta, MR = S.)')),
  withId('qjtap5q', Q('MPL = 30L^−½, cena proizvoda P = 3, plača w = 15. Koliko delavcev zaposli popolni konkurent?', ['36', '6', '4', '12'], 0,
    'P · MPL = w: 90 · L^−½ = 15 → √L = 6 → L = 36. (Brez cene: 30/√L = 15 → L = 4.)')),
  withId('q1uqphtw', Q('Monopsonist: S: w = 10 + L, MRP = 100 − 2L. Zaposlenost in plača?', ['L = 22,5, w = 32,5', 'L = 30, w = 40', 'L = 22,5, w = 55', 'L = 45, w = 10'], 0,
    'ME = 10 + 2L = 100 − 2L → L = 22,5; plača na ponudbi: 32,5. Konkurenca bi dala L = 30, w = 40.')),
]);

/* naloge v slogu izpita iz 1. dela snovi (K1) */
const izpitK1 = calc([
  withId('q1orqenc', Q('Študent ima 40 € za sendviče (2 €) in jogurte (0,5 €). Kaj velja?', ['OC dodatnega sendviča so 4 jogurti', 'OC dodatnega jogurta so 4 sendviči', 'OC dodatnega jogurta je 1 sendvič', 'OC dodatnega sendviča je ¼ jogurta'], 0,
    'Sendvič stane toliko kot 4 jogurti (2 / 0,5), zato je OC sendviča 4 jogurte, OC jogurta pa ¼ sendviča. Dohodek na razmerje ne vpliva.')),
  withId('q1srwnzp', Q('Q_čaj = 900 − 5P_čaj − 4P_limona + 2P_kava − 0,5M. Kaj velja?', ['Čaj in kava sta substituta, čaj je inferiorna dobrina', 'Čaj in kava sta substituta, čaj je normalna dobrina', 'Čaj in limona sta substituta', 'Čaj in kava sta komplementa'], 0,
    '+2P_kava → substituta; −0,5M → z dohodkom povpraševanje pada, inferiorna dobrina; −4P_limona → komplement.')),
  withId('q1id1ays', Q('U = x^0,4 y^0,8, Px = 5, Py = 4, M = 60. Kje je potrošnikovo ravnotežje?', ['x = 4, y = 10', 'x = 8, y = 5', 'x = 6, y = 7,5', 'x = 0, y = 15'], 0,
    'Cobb-Douglas: x dobi 0,4/1,2 = 1/3 dohodka → 20/5 = 4; y dobi 2/3 → 40/4 = 10. Zamenjana deleža dasta 8 in 5.')),
  withId('qyuwe1b', Q('Inverzno povpraševanje P = 40 − 0,5Q. Kolikšna je absolutna vrednost cenovne elastičnosti pri P = 10?', ['0,33', '3', '0,5', '1'], 0,
    'Q = 80 − 2P → pri P = 10 je Q = 60, dQ/dP = −2 → E = −2 · 10/60 = −0,33 (neelastično). 3 je obratna vrednost.')),
  withId('q17qgypa', Q('Bojan vedno zmeša 3 dcl soka z 1 dcl mineralne vode. Sok stane 2 € na dcl, mineralna voda 1,5 € na dcl, za pijačo ima 30 €. Koliko spije?', ['12 dcl soka in 4 dcl vode', '4 dcl soka in 12 dcl vode', '15 dcl soka in 0 dcl vode', '9 dcl soka in 3 dcl vode'], 0,
    'Popolna komplementa: paket 3 · 2 + 1,5 = 7,5 € → 30 / 7,5 = 4 paketi = 12 dcl soka in 4 dcl vode.')),
  withId('qpw99qz', Q('Stadion ima 40.000 sedežev (navpična ponudba), povpraševanje Q = 100.000 − 500P. Država uvede 8 € davka na vstopnico, ki ga plača kupec. Kolikšni sta Pd in Ps?', ['Pd = 120, Ps = 112', 'Pd = 128, Ps = 120', 'Pd = 124, Ps = 116', 'Pd = 120, Ps = 120'], 0,
    'Brez davka: 40.000 = 100.000 − 500P → P = 120. Količina ostane 40.000, zato kupec še vedno plača 120, prodajalec dobi 112 - pri navpični ponudbi davek v celoti nosi ponudnik.')),
  withId('q141mzne', Q('Najemna stanovanja: S: Q = 1000 + 3P, D: Q = 9000 − 2P. Država najemniku izplača 500 € subvencije na stanovanje. Koliko dobi najemodajalec (Ps) in koliko iz svojega žepa plača najemnik (Pd)?', ['Ps = 1.800, Pd = 1.300', 'Ps = 1.600, Pd = 1.100', 'Ps = 2.100, Pd = 1.600', 'Ps = 1.700, Pd = 1.200'], 0,
    'Brez subvencije P = 1.600, Q = 5.800. S subvencijo Pd = Ps − 500: 1000 + 3Ps = 9000 − 2(Ps − 500) → 5Ps = 9.000 → Ps = 1.800, Pd = 1.300, Q = 6.400.')),
  withId('q39nv1', Q('Smuči in smučarske karte so komplementa. Smučarske karte se podražijo. Kaj se zgodi na trgu smuči?', ['Povpraševanje po smučeh se premakne v levo', 'Povpraševanje po smučeh se premakne v desno', 'Le gibanje po krivulji povpraševanja po smučeh', 'Ponudba smuči se premakne v levo'], 0,
    'Dražji komplement zmanjša povpraševanje po smučeh pri vsaki ceni smuči (premik krivulje v levo). Gibanje po krivulji povzroči le sprememba cene smuči.')),
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
  'Kakšni so donosi obsega pri Q = 3K^⅓': ['Padajoči (⅓ + ½ < 1)', 'Konstantni (3 · ⅓ = 1)', 'Naraščajoči (koeficient 3 > 1)', 'Najprej naraščajoči, nato padajoči'],
  'Kako se ekonomski stroški razlikujejo': ['Vključujejo tudi oportunitetne stroške, zato so večji', 'Vključujejo samo eksplicitne stroške, zato so enaki', 'Ne vključujejo plač, zato so manjši od računovodskih', 'Vključujejo le utopljene stroške preteklih naložb'],
  'Kateri pogoj velja v optimalni kombinaciji': ['MPL/w = MPK/r', 'MPL/r = MPK/w', 'MPL = MPK', 'APL/w = APK/r'],
  'Kaj je krivulja LAC': ['Ovojnica kratkoročnih krivulj povprečnih stroškov', 'Vsota vseh kratkoročnih krivulj mejnih stroškov', 'Krivulja povprečnih fiksnih stroškov na dolgi rok', 'Povezava optimalnih kombinacij dela in kapitala'],
  'Kakšna je krivulja povpraševanja za posamezno': ['Vodoravna (popolnoma elastična)', 'Padajoča, enaka tržni krivulji', 'Navpična (popolnoma neelastična)', 'Naraščajoča kot krivulja MC'],
  'Kaj je zadostni pogoj za kratkoročno': ['P ≥ AVCmin', 'P ≥ ATCmin', 'P ≥ AFCmin', 'P ≥ LACmin'],
  'AVCmin < P < ATCmin': ['Proizvaja z izgubo, ki je manjša od FC', 'Takoj zapre, ker ne pokrije vseh stroškov', 'Proizvaja, dokler ne pokrije ATC z dobičkom', 'Zmanjša količino, dokler ni P = ATC'],
  'Kaj je kratkoročna krivulja ponudbe popolnega': ['Krivulja MC nad minimumom AVC', 'Krivulja MC nad minimumom ATC', 'Krivulja ATC nad minimumom AVC', 'Krivulja AVC nad minimumom MC'],
  'Kaj velja v dolgoročnem ravnotežju popolne': ['P = LMC = LACmin, ekonomski dobiček je 0', 'P = LMC > LACmin, ekonomski dobiček je pozitiven', 'P = AVCmin, podjetje pokriva le variabilne stroške', 'P = LACmin, računovodski dobiček pa je enak 0'],
  'Kaj je značilno za naravni monopol': ['Visoki fiksni in nizki mejni stroški, ATC pada', 'Nizki fiksni in visoki mejni stroški, ATC raste', 'Patent, ki ga podeli država za omejen čas', 'Lastništvo edinega vira surovine na trgu'],
  'Kaj je Nashevo ravnotežje': ['Nihče nima razloga enostransko spremeniti strategije', 'Oba igralca dosežeta največji možni skupni dobiček', 'Vsak igralec igra svojo dominantno strategijo', 'Igralca se dogovorita in delita dobiček na pol'],
  'Kako OPEC kot vodilno podjetje': ['D_OPEC = D_trg − S_ostalih, nato MR_OPEC = MC_OPEC', 'D_OPEC = D_trg + S_ostalih, nato P_OPEC = MC_OPEC', 'S_ostalih = D_trg, nato MR_ostalih = MC_OPEC', 'D_OPEC = D_trg, nato MR_OPEC = MC_ostalih'],
  'Katera dva pogoja potrebuje uspešen kartel': ['Neelastično povpraševanje in dogovor o količinah', 'Elastično povpraševanje in veliko število članic', 'Homogen proizvod in prost vstop novih članic', 'Nizki fiksni stroški in državna lastnina članic'],
  'Do katere točke zaposluje podjetje': ['P · MPL = w', 'P · APL = w', 'MPL = w', 'MC · MPL = w'],
  'Kako imenujemo podjetje, ki je edini delodajalec': ['Monopsonist', 'Monopolist', 'Oligopsonist', 'Kartel'],
  'Pri kateri strategiji sindikata velja MR = 0': ['Maksimiranje skupnega plačila', 'Maksimiranje zaposlenosti', 'Maksimiranje ekonomske rente', 'Maksimiranje plače na delavca'],
  'Kaj določa plačo v bilateralnem monopolu': ['Pogajalska moč monopsonista in sindikata', 'Presečišče tržne ponudbe in povpraševanja', 'Mejni izdatek monopsonista, ki je enak MRP', 'Mejni prihodek sindikata, ki je enak 0'],
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
        { id: 'mikro-iz-k1', name: 'Računske v slogu izpita iz 1. dela snovi', calc: true, questions: utrdi(izpitK1) },
      ],
      flashcards: [{ id: 'mikro-c-iz', name: 'Formule in pojmi (izpit)', cards: kartice }],
    },
  ],
};
