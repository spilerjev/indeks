/* Statistika (1. letnik) - naloge s starih izpitov: 3. rok 2013 (rešen) ter izpit in preizkušnji 4. 9. 2020.
   Kombinirane rešitve (a+c ...) so pretvorjene v enojne odgovore. Vse vrednosti preračunane; 2020 nima ključa,
   zato so rešitve izračunane tukaj. Vprašanja, ki potrebujejo sliko (porazdelitev, Lorenzove krivulje), so izpuščena. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });

const stari = [
  C('(Izpit 2013) Škofljica je imela 1. 1. 2009 8.413, 1. 1. 2013 pa 9.744 prebivalcev. Kolikšna je povprečna letna stopnja rasti?', [
    '3,7 %', '4,0 %', '3,2 %', '15,8 %'], 0,
    'G = (9.744 / 8.413)^(1/4) = 1,1582^0,25 = 1,037 → 3,7 %. Štiri leta, ne pet. 4,0 % = 15,8 % / 4 (aritmetično, napačno). Povprečni letni absolutni prirastek = 1.331 / 4 = 333.'),
  C('(Izpit 2013) Škofljica je imela 1. 1. 2013 9.744 prebivalcev. Če bi prebivalstvo raslo s 3,7 % na leto naprej, koliko prebivalcev bi imela 1. 1. 2015?', [
    '10.486', '10.410', '10.743', '10.077'], 0,
    '9.744 × 1,037² ≈ 10.486. Trditev s 10.410 na izpitu ni držala. 10.077 = 9.744 + 333 (le eno leto).'),
  C('(Izpit 2013) Jabolka: cena 1,2 → 1,4 €/kg, prodaja 80 → 60 kg; hruške: 2,3 → 2,2 €/kg, 100 → 120 kg. Za koliko se je spremenila vrednost prodaje?', [
    'Povečala se je za 6,7 %', 'Povečala se je za 106,7 %', 'Zmanjšala se je za 6,3 %', 'Povečala se je za 2,5 %'], 0,
    'Vrednost 2012 = 1,2·80 + 2,3·100 = 326 €. 2013 = 1,4·60 + 2,2·120 = 348 €. Iv = 106,7 → +6,7 %.'),
  C('(Izpit 2013) Neto pokojnina: januar 562,54 €, junij 569,26 €. Indeks cen življenjskih potrebščin (dec 2012 = 100): januar 99,2, junij 101,4. Realna sprememba?', [
    'Realno nižja za 1,0 %', 'Realno višja za 1,2 %', 'Realno višja za 3,2 %', 'Realno enaka'], 0,
    'Nominalni indeks 569,26 / 562,54 = 1,0119. Indeks cen 101,4 / 99,2 = 1,0222. Realni indeks = 1,0119 / 1,0222 = 0,990 → −1,0 %.'),
  C('(Izpit 2013) Podjetja v SLO 2011 po številu oseb: 0-1: 119.791, 2-9: 40.195, 10-49: 6.950, 50-249: 2.082, 250+: 342 (skupaj 169.360). Največ koliko oseb je imelo 80 % podjetij?', [
    '4,6', '4,3', '5,0', '9,5'], 0,
    '80 % = 135.488. Do 1 osebe: 119.791, manjka 15.697 iz razreda 2-9 (meje 1,5-9,5, širina 8): 1,5 + 15.697/40.195 · 8 = 4,6.'),
  C('(Izpit 2013) Prebivalci 12 regij (tisoč): 118, 323, 72, 260, 44, 70, 143, 542, 204, 52, 119, 112. Kaj drži?', [
    'Variacijski razmik je 498 tisoč, mediana 118,5 tisoč',
    'Variacijski razmik je 498 tisoč, mediana 106,5 tisoč',
    'Variacijski razmik je 542 tisoč, mediana 118,5 tisoč',
    'Standardni odklon je 133,4 tisoč, mediana 106,5 tisoč'], 0,
    'R = 542 − 44 = 498. Urejeno: 6. in 7. vrednost sta 118 in 119 → Me = 118,5. σ ≈ 138,4 (populacijski), KV ≈ 0,81 → razlike so velike.'),
  Q('(Izpit 2013) Indeks strukturnih premikov plač junij/maj je 99,5. Kaj to pomeni?', [
    'Povečal se je delež zaposlenih z nižjimi plačami',
    'Zmanjšal se je delež zaposlenih z nižjimi plačami',
    'Število zaposlenih se je zmanjšalo za 0,5 %',
    'Plače so se v vseh skupinah znižale za 0,5 %'], 0,
    'ISP < 100: struktura se je premaknila k skupinam z nižjo povprečno vrednostjo - zaradi tega se je povprečna plača znižala za 0,5 %, četudi plače v skupinah ostanejo enake.'),
  Q('(Izpit 2013) Podjetje opravlja 3 dejavnosti na 4 lokacijah. Katere statistične enote lahko določimo?', [
    '3 enote enovrstne dejavnosti in 4 lokalne enote',
    '4 enote enovrstne dejavnosti in 3 lokalne enote',
    '3 lokacijske enote in 3 lokalne enote',
    '4 enote enovrstne dejavnosti in 4 lokacijske enote'], 0,
    'EED (KAU) je vezana na dejavnost, lokalna enota na geografsko lokacijo.'),
  Q('(Izpit 2013) Kaj od naštetega NI relativno število?', [
    'Število zaposlenih', 'Stopnja brezposelnosti', 'Indeks plač', 'Promet na zaposlenega'], 0,
    'Relativna števila so razmerja: stopnje, indeksi, koeficienti (promet na zaposlenega). Število zaposlenih je absolutni podatek.'),
  Q('(Izpit 2013) Trgovina analizira m² prodajne površine na zaposlenega v posamezni občini, kjer ima prodajalne. Kaj je enota opazovanja?', [
    'Občina', 'Zaposleni', 'Prodajna površina', 'Trgovsko podjetje'], 0,
    'Kazalec računamo za vsako občino posebej, zato je enota opazovanja občina; površina in zaposleni sta spremenljivki.'),
  Q('(Izpit 2013) Kateri podatki so PRIMARNI?', [
    'Podatki iz lastne spletne ankete in iz "skrivnostnega nakupovanja"',
    'Časovna serija brezposelnih z domače strani zavoda za zaposlovanje',
    'Podatki iz priloge magistrskega dela, zbrani z intervjujem',
    'Podatki SURS, ki jih urad zbira od podjetij in gospodinjstev'], 0,
    'Primarne podatke zberemo sami za svoj namen. Podatki drugih (zavod, avtor magistrske, SURS) so za nas sekundarni.'),
  Q('(Izpit 2013) Katera kriterija spadata v ILO opredelitev brezposelne osebe?', [
    'Aktivno išče delo (zadnji 4 tedni) in je takoj pripravljena sprejeti delo',
    'Prijavljena je na zavodu za zaposlovanje in aktivno išče delo',
    'Delala je manj kot 4 ure na dan in je prijavljena na zavodu',
    'Prijavljena je na zavodu in je stara od 15 do 64 let'], 0,
    'ILO (anketna brezposelnost): ni delala niti 1 uro, aktivno išče delo in je v 2 tednih pripravljena začeti. Prijava na zavodu je kriterij registrirane brezposelnosti.'),
  Q('(Izpit 2013) S katerim grafikonom prikažemo kumulativo frekvenc?', [
    'Z ogivo', 'S poligonom', 'S histogramom', 'Z Lorenzovim grafikonom'], 0,
    'Ogiva je krivulja kumulativnih frekvenc. Histogram in poligon prikazujeta (gostote) frekvenc, Lorenzov grafikon koncentracijo.'),
  Q('(Izpit 2013) Za 130 honorarjev (708-1.493 €) oblikujemo frekvenčno porazdelitev. Kaj izberemo?', [
    'Enake širine razredov in 8 razredov',
    'Enake širine razredov in 4 razrede',
    'Spodnje meje rastejo s koeficientom 2, 8 razredov',
    'Spodnje meje rastejo s koeficientom 3, 4 razrede'], 0,
    'Razpon ni ekstremen (max/min ≈ 2), zato enake širine. Sturges: k = 1 + 3,3 · log 130 ≈ 8.'),
  Q('(Izpit 2013, 2020) Katera trditev o PEST analizi NE drži?', [
    'Je osnova za del SWOT, ki obravnava prednosti in slabosti',
    'Je orodje za sistematično analizo zunanjega okolja podjetja',
    'Zajema politično, ekonomsko, socialno in tehnološko okolje',
    'Je osnova za del SWOT, ki obravnava priložnosti in nevarnosti'], 0,
    'PEST analizira ZUNANJE okolje, zato napaja priložnosti in nevarnosti. Prednosti in slabosti so notranje. Črka P ni "patenti", temveč politika.'),
  Q('(Izpit 2020) Katera trditev o zbiranju podatkov drži?', [
    'Sledenje uporabniku po spletni trgovini je opazovalna študija',
    'Podatki SURS so za uporabnika primarni podatki',
    'Analiza odpadkov je primer eksperimenta',
    'Fokusna skupina je metoda zbiranja eksperimentalnih podatkov'], 0,
    'Pri sledenju in analizi odpadkov samo opazujemo, ne posegamo. Fokusna skupina je kvalitativna metoda spraševanja. SURS-ovi podatki so za nas sekundarni.'),
  Q('(Izpit 2020) Na dobavnici je šifra 20.41.32.400 iz Nomenklature industrijskih proizvodov (NIP). Kakšna je šifra dejavnosti po NACE?', [
    '20.41', '20.41.3', '20.41.32', 'Ne moremo vedeti, gre za drugo klasifikacijo'], 0,
    'Klasifikacije so hierarhično povezane: NIP (8 mest) → CPA (6 mest, 20.41.32) → NACE/SKD (4 mesta, 20.41).'),
  Q('(Izpit 2020) S katero kratico označujemo klasifikacijo proizvodov po dejavnosti na ravni EU?', [
    'CPA', 'CPC', 'ISIC', 'NIP'], 0,
    'CPA = evropska klasifikacija proizvodov po dejavnostih. CPC je klasifikacija ZN, ISIC mednarodna klasifikacija dejavnosti, NIP slovenska nomenklatura industrijskih proizvodov.'),
  Q('(Izpit 2020) 38 poslovalnic z zelo različnim številom zaposlenih prikazujemo s poligonom. Kaj nanesemo na ordinato?', [
    'Gostoto frekvence', 'Relativno frekvenco', 'Kumulativo frekvenc', 'Absolutno frekvenco'], 0,
    'Zelo različne vrednosti → razredi različnih širin → frekvence moramo preračunati v gostote (f / širina), sicer je slika zavajajoča.'),
  Q('(Izpit 2020) "Prihodki na kvadratni meter prodajne površine" so tehnično gledano:', [
    'Koeficient', 'Indeks', 'Struktura', 'Odstotni delež'], 0,
    'Koeficient je razmerje med dvema različnima pojavoma (prihodki / površina). Struktura in delež primerjata del s celoto, indeks isti pojav v času ali prostoru.'),
  C('(Izpit 2020) Registrirana brezposelnost: ženske 10,3 %, moški 8,4 %. Kaj drži?', [
    'Pri ženskah je višja za 1,9 odstotne točke oz. za 22,6 %',
    'Pri ženskah je višja za 1,9 % oz. za 1,9 odstotne točke',
    'Pri ženskah je višja za 22,6 odstotne točke',
    'Skupna stopnja je točno povprečje obeh, 9,35 %'], 0,
    'Absolutna razlika 10,3 − 8,4 = 1,9 o. t.; relativna 10,3 / 8,4 = 1,226 → 22,6 %. Skupna stopnja je med 8,4 % in 10,3 %, a tehtana s številom aktivnih, ne navadno povprečje.'),
  C('(Izpit 2020) Leta 2019 se je v SLO priselilo 31.319 oseb, prebivalcev je bilo 1. 7. 2019 2.089.310. Splošna stopnja priselitev?', [
    '15,0 ‰', '13,7 ‰', '15,1 ‰', '1,5 ‰'], 0,
    'Imenovalec je povprečno (sredi leta) prebivalstvo: 31.319 / 2.089.310 · 1000 = 15,0 ‰. (15,1 ‰ bi dobil s stanjem 1. 1.)'),
  C('(Izpit 2020) Kaj dobimo, če indeks vrednosti delimo z Laspeyresovim indeksom cen?', [
    'Paaschejev indeks količin', 'Laspeyresov indeks količin', 'Fisherjev indeks cen', 'Paaschejev indeks cen'], 0,
    'Iv = Lp · Pq = Pp · Lq. Torej Iv / Lp = Pq in Iv / Pp = Lq.'),
  C('(Izpit 2020) Čas priprave sladice pri 8 kuharjih (min): 47, 47, 47, 50, 51, 54, 54, 56. Mediana?', [
    '50,5 minute', '47 minut', '51 minut', '50,75 minute'], 0,
    'Sodo število enot: povprečje 4. in 5. vrednosti = (50 + 51) / 2 = 50,5. Modus je 47, aritmetična sredina 50,75.'),
  C('(Izpit 2020) Bombonjera: Supermarket 8,30 → 7,90 € (90 kosov 2020), Na pumpi 9,90 → 9,70 € (40), Čez cesto 8,90 → 9,20 € (30). Paaschejev indeks cen?', [
    'Cene so se znižale za 2,5 %', 'Cene so se znižale za 2,0 %', 'Cene so se znižale za 1,5 %', 'Cene so se znižale za 7,3 %'], 0,
    'Pp = Σp₁q₁ / Σp₀q₁ = (711 + 388 + 276) / (747 + 396 + 267) = 1.375 / 1.410 = 0,975 → −2,5 %.'),
  C('(Izpit 2020) Neto pokojnina 2015: 613,11 €, 2019: 662,97 €. Inflacija 2016-2019: −0,1 %, 1,4 %, 1,7 %, 1,6 %. Kaj drži?', [
    'Nominalno +8,1 %, realno +3,3 %', 'Nominalno +8,1 %, realno +4,0 %', 'Nominalno +8,1 %, cene +4,1 %', 'Nominalno +4,6 %, realno +3,3 %'], 0,
    'Iw = 662,97 / 613,11 = 108,1. Cene: 0,999 · 1,014 · 1,017 · 1,016 = 1,0467 (+4,7 %, ne 4,1 %). Realno 1,081 / 1,0467 = 1,033. Leta 2016 je bila realna rast pozitivna (+0,5 % ob deflaciji).'),
  C('(Preizkušnja 2020) Oskrbovanci domov: 50-59 let moški 296, vseh 50-59 let 444, vseh moških 4.705, vseh 17.694. Kaj pomeni 66,7 %?', [
    'Med oskrbovanci, starimi 50-59 let, je 66,7 % moških',
    'Med moškimi oskrbovanci je 66,7 % starih 50-59 let',
    'Med vsemi oskrbovanci je 66,7 % moških, starih 50-59 let',
    'Moških, starih 50-59 let, je 66,7 % več kot žensk'], 0,
    '296 / 444 = 66,7 % (struktura po vrstici). 296 / 4.705 = 6,3 % moških je starih 50-59 let. 296 / 17.694 = 1,7 % vseh.'),
  C('(Preizkušnja 2020) Hotel: februarja 4.321 nočitev, gostov 1. 2. 350 in 1. 3. 372. Koliko nočitev na gosta?', [
    '11,97', '12,35', '11,62', '10,75'], 0,
    'Gostje so stanje, nočitve tok → povprečno stanje (350 + 372) / 2 = 361. 4.321 / 361 = 11,97. (12,35 = deljeno z začetnim stanjem.)'),
  C('(Preizkušnja 2020) Točke na izpitu: 0-60: 95, 60-69: 40, 69-77: 38, 77-85: 32, 85-93: 20, 93-120: 9 študentov. Koliko odstotkov jih je preseglo 80 točk?', [
    '20,9 %', '26,1 %', '12,4 %', '16,7 %'], 0,
    'N = 234. V razredu 77-85 je nad 80 točk 5/8 · 32 = 20 študentov, plus 20 + 9 = 49. 49 / 234 = 20,9 %. (26,1 % = cel razred 77-85.)'),
  C('(Preizkušnja 2020) 10.000 € vložimo 1. 1. 2019 s pričakovanim donosom 5 % letno. Stanje 1. 1. 2025?', [
    '13.401 €', '13.000 €', '14.071 €', '12.763 €'], 0,
    '6 let: 10.000 · 1,05⁶ = 13.400,96 €. (13.000 = navadne obresti, 14.071 = 7 let, 12.763 = 5 let.)'),
];

module.exports = {
  id: 'stat',
  parts: [{ id: 'izpit', decks: [{ id: 'st-stari', name: 'Stari izpiti 2013 in 2020', calc: true, questions: stari }] }],
};
