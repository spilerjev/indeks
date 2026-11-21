/* Statistika (1. letnik) - naloge v slogu izpita in preizkušenj (rast, indeksi, opisne mere, klasifikacije, viri podatkov,
   demografske stopnje). Naloge so napisane na novo z lastnimi primeri in številkami; vse vrednosti so preračunane. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });

const stari = [
  withId('qn1qipm', C('Občina je imela 1. 1. 2018 12.500, 1. 1. 2023 pa 14.200 prebivalcev. Kolikšna je povprečna letna stopnja rasti?', [
    '2,6 %', '2,7 %', '3,2 %', '13,6 %'], 0,
    'G = (14.200 / 12.500)^(1/5) = 1,136^0,2 = 1,026 → 2,6 %. Pet let, ne štiri (3,2 %). 2,7 % = 13,6 % / 5 (aritmetično, napačno). Povprečni letni absolutni prirastek = 1.700 / 5 = 340.')),
  withId('qke1df6', C('Občina je imela 1. 1. 2023 14.200 prebivalcev. Če bi prebivalstvo naprej raslo z izračunano povprečno letno stopnjo (G = 1,02583), koliko prebivalcev bi imela 1. 1. 2025?', [
    '14.943', '14.540', '14.880', '14.983'], 0,
    '14.200 × 1,02583² ≈ 14.943. 14.540 = 14.200 + 340 (le eno leto, absolutno), 14.880 = linearno podaljšanje, 14.983 = z napačno stopnjo 2,72 %.')),
  withId('qa4u1wo', C('Slive: cena 1,5 → 1,8 €/kg, prodaja 50 → 40 kg; marelice: 2,5 → 2,4 €/kg, 80 → 90 kg. Za koliko se je spremenila vrednost prodaje?', [
    'Povečala se je za 4,7 %', 'Povečala se je za 104,7 %', 'Zmanjšala se je za 4,5 %', 'Povečala se je za 1,5 %'], 0,
    'Vrednost v 1. obdobju = 1,5·50 + 2,5·80 = 275 €. V 2. obdobju = 1,8·40 + 2,4·90 = 288 €. Iv = 104,7 → +4,7 %.')),
  withId('q1o805ja', C('Neto plača: januar 1.250 €, junij 1.290 €. Indeks cen življenjskih potrebščin (december = 100): januar 98,5, junij 100,5. Kakšna je realna sprememba plače?', [
    'Realno višja za 1,1 %', 'Realno nižja za 1,1 %', 'Realno višja za 3,2 %', 'Realno višja za 5,2 %'], 0,
    'Nominalni indeks 1.290 / 1.250 = 1,032. Indeks cen 100,5 / 98,5 = 1,0203. Realni indeks = 1,032 / 1,0203 = 1,011 → +1,1 %.')),
  withId('q1dwo15h', { q: "Gospodinjstva po mesečni porabi elektrike (kWh): 0-200: 1.200, 200-400: 2.600, 400-600: 1.400, 600-800: 600, 800-1.200: 200 (skupaj 6.000). Največ koliko kWh porabi 60 % gospodinjstev z najmanjšo porabo?",
      options: ["≈ 384,6 kWh","400,0 kWh","≈ 476,9 kWh","500,0 kWh"],
      correct: 0,
      explanation: "60 % od 6.000 = 3.600. Do 200 kWh je 1.200 gospodinjstev, manjka 2.400 iz razreda 200-400 (2.600, širina 200): 200 + 2.400/2.600 · 200 ≈ 384,6 kWh. (476,9 pozabi odšteti 1.200 gospodinjstev pred razredom, 500 je 75. percentil.)",
      calc: true }),
  withId('q1obfs5m', C('Prebivalci 10 regij (tisoč): 95, 310, 64, 220, 51, 88, 160, 480, 175, 130. Kaj drži?', [
    'Variacijski razmik je 429 tisoč, mediana 145 tisoč',
    'Variacijski razmik je 480 tisoč, mediana 145 tisoč',
    'Variacijski razmik je 429 tisoč, mediana 130 tisoč',
    'Variacijski razmik je 429 tisoč, mediana 177,3 tisoč'], 0,
    'R = 480 − 51 = 429. Urejeno: 5. in 6. vrednost sta 130 in 160 → Me = 145. Aritmetična sredina je 177,3, σ ≈ 125,4 (populacijski) → KV ≈ 0,71, razlike med regijami so velike.')),
  withId('q1aeiy6a', Q('Indeks strukturnih premikov povprečne plače je 101,2. Kaj to pomeni?', [
    'Povečal se je delež zaposlenih v skupinah z višjimi plačami',
    'Povečal se je delež zaposlenih z nižjimi plačami',
    'Število zaposlenih se je povečalo za 1,2 %',
    'Plače so se v vseh skupinah zvišale za 1,2 %'], 0,
    'ISP > 100: struktura se je premaknila k skupinam z višjo povprečno vrednostjo - samo zaradi tega se je povprečna plača zvišala za 1,2 %, četudi plače v skupinah ostanejo enake.')),
  withId('qae7ew7', Q('Podjetje ima 5 poslovalnic na različnih naslovih in opravlja 2 dejavnosti. Katere statistične enote lahko določimo?', [
    '2 enoti enovrstne dejavnosti in 5 lokalnih enot',
    '5 enot enovrstne dejavnosti in 2 lokalni enoti',
    '2 lokalni enoti in 2 enoti enovrstne dejavnosti',
    '10 lokalnih enot enovrstne dejavnosti'], 0,
    'Enota enovrstne dejavnosti (KAU) je vezana na dejavnost, lokalna enota na geografsko lokacijo.')),
  withId('q2pbuk5', Q('Kateri podatek je absolutno (ne relativno) število?', [
    'Število prodanih avtomobilov v letu', 'Delež izvoza v prodaji', 'Indeks cen', 'Število prebivalcev na km²'], 0,
    'Relativna števila so razmerja: deleži, indeksi, koeficienti (gostota prebivalstva). Število prodanih avtomobilov je absolutni podatek.')),
  withId('q8kyjcg', Q('Banka primerja število bankomatov na 1.000 prebivalcev v slovenskih regijah. Kaj je enota opazovanja?', [
    'Regija', 'Bankomat', 'Prebivalec', 'Banka'], 0,
    'Kazalec računamo za vsako regijo posebej, zato je enota opazovanja regija; število bankomatov in prebivalcev sta spremenljivki.')),
  withId('q1redwpp', Q('Kateri podatki so za podjetje PRIMARNI?', [
    'Podatki, ki jih zbere z lastno anketo med kupci', 'Podatki Eurostata o prodaji v EU', 'Podatki iz letnega poročila konkurenta', 'Podatki SURS o gibanju plač'], 0,
    'Primarne podatke zberemo sami za svoj namen. Podatki, ki so jih zbrali drugi (Eurostat, konkurent, SURS), so za nas sekundarni.')),
  withId('q1x8cmmh', Q('Kdo je brezposeln po ILO (anketni) opredelitvi?', [
    'Kdor v referenčnem tednu ni delal, je v zadnjih 4 tednih aktivno iskal delo in lahko takoj začne delati',
    'Kdor je prijavljen na zavodu za zaposlovanje',
    'Kdor dela manj kot polni delovni čas',
    'Kdor je star 15-64 let in nima redne zaposlitve'], 0,
    'ILO: ni delal niti 1 uro, aktivno išče delo in je v 2 tednih pripravljen začeti. Prijava na zavodu je kriterij registrirane brezposelnosti.')),
  withId('qnxume6', Q('Kateri grafikon pokaže, koliko enot ima vrednost do posamezne meje (kumulativne frekvence)?', [
    'Ogiva', 'Poligon', 'Histogram', 'Lorenzova krivulja'], 0,
    'Ogiva je krivulja kumulativnih frekvenc. Histogram in poligon prikazujeta (gostote) frekvenc, Lorenzova krivulja koncentracijo.')),
  withId('q16axzyu', Q('Za 250 mesečnih najemnin (420-980 €) pripravljamo frekvenčno porazdelitev. Kaj je najprimerneje?', [
    'Razredi enakih širin, približno 9 razredov',
    'Razredi enakih širin, 4 razredi',
    'Spodnje meje rastejo s faktorjem 2, 9 razredov',
    'Spodnje meje rastejo s faktorjem 3, 4 razredi'], 0,
    'Razpon ni ekstremen (max/min ≈ 2,3), zato enake širine. Sturges: k = 1 + 3,3 · log 250 ≈ 8,9 → 9 razredov.')),
  withId('q1wywe2d', Q('Katera trditev o PEST analizi drži?', [
    'Napaja del SWOT analize, ki obravnava priložnosti in nevarnosti',
    'Napaja del SWOT analize, ki obravnava prednosti in slabosti',
    'Analizira notranje vire in zmožnosti podjetja',
    'Črka P v kratici pomeni patente'], 0,
    'PEST (politično, ekonomsko, socialno, tehnološko okolje) analizira ZUNANJE okolje, zato napaja priložnosti in nevarnosti. Prednosti in slabosti so notranje.')),
  withId('q6ggisw', Q('Katera trditev o načinih zbiranja podatkov drži?', [
    'Štetje obiskovalcev pred trgovino je opazovalna študija',
    'Podatki SURS so za uporabnika primarni podatki',
    'Spletna anketa je primer eksperimenta',
    'Pri eksperimentu raziskovalec ne spreminja nobenega dejavnika'], 0,
    'Pri opazovalni študiji samo beležimo, ne posegamo. Pri eksperimentu namerno spreminjamo dejavnik. Anketa je spraševanje, ne eksperiment.')),
  withId('qbjkq03', Q('Izdelek ima šifro iz Nomenklature industrijskih proizvodov (NIP) 10.71.11.100. Kakšna je šifra dejavnosti po SKD/NACE?', [
    '10.71', '10.71.1', '10.71.11', 'Ne moremo vedeti, gre za drugo klasifikacijo'], 0,
    'Klasifikacije so hierarhično povezane: NIP (8 mest) → CPA (6 mest, 10.71.11) → NACE/SKD (4 mesta, 10.71).')),
  withId('qdw4293', { q: "Podjetje izvaža blago in ga mora za carinsko statistiko razvrstiti. Katero klasifikacijo uporabi?",
      options: ["HS (harmonizirani sistem za blago)","NACE (klasifikacija dejavnosti v EU)","ISIC (klasifikacija dejavnosti ZN)","SKD (slovenska klasifikacija dejavnosti)"],
      correct: 0,
      explanation: "HS razvršča blago za carino in zunanjo trgovino. NACE (EU), SKD (Slovenija) in ISIC (ZN) razvrščajo dejavnosti, ne blaga." }),
  withId('qrnxsym', Q('Starost 500 kupcev prikazujemo z razredi različnih širin (npr. 18-25, 25-35, 35-65 let). Kaj nanesemo na ordinato histograma?', [
    'Gostoto frekvence', 'Absolutno frekvenco', 'Kumulativo frekvenc', 'Relativno frekvenco'], 0,
    'Pri razredih različnih širin moramo frekvence preračunati v gostote (f / širina), sicer bi bili širši razredi videti preveliki.')),
  withId('q17viz9j', { q: "Podatek »povprečno 2,4 obiska kina na prebivalca na leto« je po vrsti relativnih števil:",
      options: ["Koeficient - razmerje dveh različnih pojavov","Strukturni delež - del celote v odstotkih","Indeks - isti pojav v dveh obdobjih","Stopnja rasti - sprememba v odstotkih"],
      correct: 0,
      explanation: "Število obiskov in število prebivalcev sta različna, vsebinsko povezana pojava, zato gre za koeficient. Struktura primerja del s celoto, indeks isti pojav v času ali prostoru." }),
  withId('q1lukyrd', C('Stopnja brezposelnosti mladih je 14,4 %, starejših 9,0 %. Kaj drži?', [
    'Pri mladih je višja za 5,4 odstotne točke oz. za 60 %',
    'Pri mladih je višja za 5,4 % oz. za 5,4 odstotne točke',
    'Pri mladih je višja za 60 odstotnih točk',
    'Skupna stopnja je navadno povprečje obeh, 11,7 %'], 0,
    'Absolutna razlika 14,4 − 9,0 = 5,4 o. t.; relativna 14,4 / 9,0 = 1,6 → 60 %. Skupna stopnja je tehtana s številom aktivnih v obeh skupinah.')),
  withId('q1lu848z', C('V letu se je iz države odselilo 18.400 oseb; prebivalcev je bilo 1. 1. 2.100.000, sredi leta (1. 7.) 2.110.000. Kolikšna je splošna stopnja odselitev?', [
    '8,7 ‰', '8,8 ‰', '0,9 ‰', '87,2 ‰'], 0,
    'Imenovalec je povprečno (sredi leta) prebivalstvo: 18.400 / 2.110.000 · 1000 = 8,7 ‰. (8,8 ‰ bi dobil s stanjem 1. 1.)')),
  withId('q1bfqlus', { q: "Vrednost prodaje se je glede na bazno leto povečala za 26 %, Laspeyresov indeks cen pa je 105. Koliko znaša Paaschejev indeks količin?",
      options: ["120","121","132,3","131"],
      correct: 0,
      explanation: "Iv = Lp · Pq / 100 → Pq = 126/105 · 100 = 120. (121 odšteje indeksa, 132,3 ju zmnoži, 131 ju sešteje.)",
      calc: true }),
  withId('q1muev6v', C('Čas dostave paketov pri 8 dostavljavcih (min): 22, 25, 25, 28, 30, 31, 35, 38. Kolikšna je mediana?', [
    '29 minut', '25 minut', '28 minut', '29,25 minute'], 0,
    'Sodo število enot: povprečje 4. in 5. vrednosti = (28 + 30) / 2 = 29. Modus je 25, aritmetična sredina 29,25.')),
  withId('q11n5amh', C('Kava: trgovina A 4,20 → 4,50 € (60 kosov v 2. obdobju), B 4,80 → 4,60 € (30), C 5,00 → 5,40 € (20). Kolikšen je Paaschejev indeks cen?', [
    'Cene so se zvišale za 4,0 %', 'Cene so se zvišale za 3,7 %', 'Cene so se zvišale za 3,6 %', 'Cene so se znižale za 4,0 %'], 0,
    'Pp = Σp₁q₁ / Σp₀q₁ = (270 + 138 + 108) / (252 + 144 + 100) = 516 / 496 = 1,040 → +4,0 %. (3,7 % = netehtano povprečje indeksov, 3,6 % = vsota cen.)')),
  withId('q1aj37ch', C('Neto plača 2018: 1.100 €, 2022: 1.260 €. Inflacija 2019-2022: 1,6 %, −0,3 %, 1,9 %, 9,3 %. Kaj drži?', [
    'Nominalno +14,5 %, realno +1,5 %', 'Nominalno +14,5 %, realno +2,0 %', 'Nominalno +14,5 %, cene +12,5 %', 'Nominalno +3,6 %, realno +1,5 %'], 0,
    'Iw = 1.260 / 1.100 = 114,5. Cene: 1,016 · 0,997 · 1,019 · 1,093 = 1,128 (+12,8 %, ne seštevek 12,5 %). Realno 1,145 / 1,128 = 1,015.')),
  withId('qfl3kcu', C('Študenti: ženske na ekonomiji 1.020, vsi na ekonomiji 1.700, vse študentke 6.000, vsi študenti 10.000. Kaj pomeni podatek 60 %?', [
    'Med študenti ekonomije je 60 % žensk',
    'Med vsemi študentkami jih 60 % študira ekonomijo',
    'Med vsemi študenti je 60 % študentk ekonomije',
    'Študentk ekonomije je za 60 % več kot študentov'], 0,
    '1.020 / 1.700 = 60 % (struktura znotraj ekonomije). 1.020 / 6.000 = 17 % študentk študira ekonomijo. 1.020 / 10.000 = 10,2 % vseh.')),
  withId('qm0swx0', C('Kamp ima v juliju 9.300 nočitev, gostov je bilo 1. 7. 280 in 1. 8. 340. Koliko nočitev pride na gosta?', [
    '30,0', '33,2', '27,4', '15,0'], 0,
    'Gostje so stanje, nočitve tok → povprečno stanje (280 + 340) / 2 = 310. 9.300 / 310 = 30,0. (33,2 = deljeno z začetnim stanjem.)')),
  withId('q17zt5z3', C('Točke na preizkušnji: 0-50: 60, 50-60: 45, 60-70: 50, 70-80: 40, 80-90: 25, 90-100: 10 študentov. Koliko odstotkov jih je preseglo 75 točk?', [
    '23,9 %', '32,6 %', '15,2 %', '21,7 %'], 0,
    'N = 230. V razredu 70-80 je nad 75 točk polovica, 20 študentov, plus 25 + 10 = 55. 55 / 230 = 23,9 %. (32,6 % = cel razred 70-80, 15,2 % = le nad 80.)')),
  withId('q1l0aj5g', C('8.000 € vložimo 1. 1. 2020 s pričakovanim donosom 4 % letno. Kolikšno je stanje 1. 1. 2026?', [
    '10.123 €', '9.920 €', '10.527 €', '9.733 €'], 0,
    '6 let: 8.000 · 1,04⁶ = 10.122,55 €. (9.920 = navadne obresti, 10.527 = 7 let, 9.733 = 5 let.)')),
];

module.exports = {
  id: 'stat',
  parts: [{ id: 'izpit', decks: [{ id: 'st-stari', name: 'Vaje v slogu izpita', calc: true, questions: stari }] }],
};
