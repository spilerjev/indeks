/* Matematika za poslovne in ekonomske vede - stari izpiti 2014-2022 z uradnimi rešitvami
   (EF Zapiski/1. letnik/1. semester/Matematika za poslovne vede/Izpiti in kolokviji/Izpiti od 2012 do 2022, varianta A).
   Vsaka izpitna naloga je razbita na izbirna vprašanja; rezultati so iz uradnih rešitev (preverjeni). */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

const funkcije = [
  Q('(Izpit 2022) ∫ (eˣ − 3)·eˣ/(eˣ + 2) dx = ?', [
    'eˣ − 5·ln(eˣ + 2) + C', 'eˣ + 5·ln(eˣ + 2) + C', 'eˣ − 3·ln(eˣ + 2) + C', '(eˣ − 3)·ln(eˣ + 2) + C'], 0,
    'Substitucija u = eˣ, du = eˣ dx: ∫ (u − 3)/(u + 2) du = ∫ (1 − 5/(u + 2)) du = u − 5 ln|u + 2| + C.'),
  Q('(Izpit 2022) f(x) = (2 + ln x)/x. Definicijsko območje in ničla?', [
    'D = (0, ∞); ničla x = e⁻² ≈ 0,14', 'D = ℝ \\ {0}; ničla x = e² ≈ 7,39', 'D = (0, ∞); ničla x = 2', 'D = (−2, ∞); ničla x = e⁻¹ ≈ 0,37'], 0,
    'ln x zahteva x > 0; 2 + ln x = 0 → ln x = −2 → x = e⁻². Pol je x = 0.'),
  Q('(Izpit 2022) f(x) = (2 + ln x)/x. Prvi odvod in ekstrem?', [
    'f′(x) = −(1 + ln x)/x²; maksimum v (1/e, e)', 'f′(x) = (1 − ln x)/x²; maksimum v (e, 3/e)', 'f′(x) = −(1 + ln x)/x²; minimum v (1/e, e)', 'f′(x) = (2 + ln x)/x²; ekstrema ni'], 0,
    'Kvocientno pravilo: f′ = (1/x · x − (2 + ln x))/x² = −(1 + ln x)/x². f′ = 0 → x = 1/e, f(1/e) = (2 − 1)·e = e; funkcija narašča na (0, 1/e) in pada naprej → maksimum. Ko x → ∞, f → 0.'),
  Q('(Izpit 2019) f(x) = ln(x² − 4x + 4). Definicijsko območje, ničle in ekstremi?', [
    'D = ℝ \\ {2}; ničli x = 1 in x = 3; ekstremov ni', 'D = (2, ∞); ničla x = 3; minimum v x = 2', 'D = ℝ; ničli x = 1 in x = 3; minimum v x = 2', 'D = ℝ \\ {2}; ničla x = 2; ekstremov ni'], 0,
    'x² − 4x + 4 = (x − 2)² > 0 za x ≠ 2. Ničle: (x − 2)² = 1 → x = 1, 3. f′ = 2/(x − 2) ni nikoli 0; f″ = −2/(x − 2)² < 0 → povsod konkavna, pada na (−∞, 2), narašča na (2, ∞).'),
  Q('(Izpit 2021) f(x) = e^(−2x−3)/(x + 1). Ekstrem?', [
    'Maksimum v T(−3/2, 2)', 'Minimum v T(−3/2, 2)', 'Maksimum v T(−1, e⁻¹)', 'Ekstremov ni, ker ni ničel'], 0,
    'f′(x) = −e^(−2x−3)·(2x + 3)/(x + 1)² = 0 → x = −3/2; f(−3/2) = e⁰/(−1/2) ... = 2 (po uradni rešitvi). Narašča na (−∞, −3/2), pada na (−3/2, −1) in (−1, ∞). Pol lihe stopnje x = −1, ničel ni.'),
  Q('(Izpit 2021) f(x) = x·ln(5 − x). Ploščina omejenega območja med x-osjo in grafom?', [
    '(25/2)·ln 5 − 14 ≈ 6,12', '25·ln 5 − 28 ≈ 12,24', '(25/2)·ln 5 ≈ 20,12', '14 − (25/2)·ln 5 ≈ −6,12'], 0,
    'Ničli: x = 0 in 5 − x = 1 → x = 4. Per partes: ∫ x ln(5 − x) dx = (x²/2)·ln(5 − x) − x²/4 − 5x/2 − (25/2)·ln|x − 5| + C; vrednost od 0 do 4 = (25/2) ln 5 − 14.'),
  Q('(Izpit 2020) f(x) = 10·ln²x/x. Ekstremi?', [
    'Minimum T₁(1, 0) in maksimum T₂(e², 40/e² ≈ 5,41)', 'Minimum T₁(1, 0) in maksimum T₂(e, 10/e ≈ 3,68)', 'Samo maksimum v (e², 40/e²)', 'Samo minimum v (1, 0)'], 0,
    'f′ = 10·(2 ln x − ln²x)/x² = 0 → ln x = 0 ali ln x = 2 → x = 1 ali x = e². f″(1) = 20 > 0 (min), f″(e²) < 0 (max). Narašča na (1, e²). Zaloga vrednosti [0, ∞).'),
  Q('(Izpit 2018) f(x) = ln(x + 2) − x² − 3x − 4. Definicijsko območje in ekstrem?', [
    'D = (−2, ∞); lokalni maksimum v (−1, −2)', 'D = ℝ; lokalni minimum v (−1, −2)', 'D = (−2, ∞); lokalna ekstrema v x = −1 in x = −5/2', 'D = (2, ∞); lokalni maksimum v (−1, −2)'], 0,
    'f′ = 1/(x + 2) − 2x − 3 = 0 → −2x² − 7x − 5 = 0 → x = −1 ali x = −5/2 (zunaj D). f″(−1) = −3 < 0 → maksimum; f(−1) = ln 1 − 1 + 3 − 4 = −2. Konkavna na celem D.'),
  Q('(Izpit 2018) f(x, y) = e⁻ˣ·(x − y²). Stacionarne točke?', [
    'Edina stacionarna točka je T(1, 0)', 'Stacionarni točki sta (1, 0) in (−1, 0)', 'Edina stacionarna točka je T(0, 0)', 'Stacionarnih točk ni'], 0,
    'f_x = (y² − x + 1)e⁻ˣ = 0, f_y = −2y·e⁻ˣ = 0 → y = 0 → x = 1.'),
  Q('(Izpit 2018) f(x, y) = e⁻ˣ·(x − y²), f_x(1, 2) = 4/e, f_y(1, 2) = −4/e. Za koliko spremenimo x, če y zmanjšamo za 0,05 in naj vrednost ostane enaka?', [
    'x zmanjšamo za približno 0,05', 'x povečamo za približno 0,05', 'x zmanjšamo za približno 0,20', 'x ni treba spreminjati'], 0,
    'Totalni diferencial: 0 ≈ f_x·Δx + f_y·Δy → Δx = −f_y/f_x · Δy = −(−4/e)/(4/e) · (−0,05) = −0,05.'),
  Q('(Izpit 2017) Taylorjeva vrsta funkcije f(x) = e^(−x²/2) okoli a = 0 do člena s četrtim odvodom?', [
    '1 − x²/2 + x⁴/8 + …', '1 + x²/2 + x⁴/8 + …', '1 − x² + x⁴/2 + …', '1 − x²/2 + x⁴/24 + …'], 0,
    'f(0) = 1, f′(0) = 0, f″(0) = −1, f‴(0) = 0, f⁗(0) = 3 → 1 − x²/2 + 3x⁴/24 = 1 − x²/2 + x⁴/8.'),
  Q('(Izpit 2017) ∫ ((2 − x)/(x² − 1) + 2) dx = ?', [
    '½·ln|x − 1| − (3/2)·ln|x + 1| + 2x + C', '(3/2)·ln|x − 1| − ½·ln|x + 1| + 2x + C', 'ln|x² − 1| + 2x + C', '−½·ln|x − 1| + (3/2)·ln|x + 1| + 2x + C'], 0,
    'Parcialni ulomki: (2 − x)/((x − 1)(x + 1)) = A/(x − 1) + B/(x + 1); A + B = −1, A − B = 2 → A = ½, B = −3/2.'),
  Q('(Izpit 2016) ∫ (2x³ − 5x² + x + 4)/(x² − 2x) dx = ?', [
    'x² − x − 2·ln|x| + ln|x − 2| + C', 'x² − x + 2·ln|x| − ln|x − 2| + C', 'x² − x − ln|x| + 2·ln|x − 2| + C', '2x² − 5x + ln|x² − 2x| + C'], 0,
    'Deljenje: kvocient 2x − 1, ostanek −x + 4. (−x + 4)/(x(x − 2)) = A/x + B/(x − 2): A = −2, B = 1.'),
  Q('(Izpit 2016) f(x) = (x + 1)/(3e³ˣ). Ekstrem in prevoj?', [
    'Maksimum v (−2/3, e²/9 ≈ 0,82), prevoj v (−1/3, 2e/9 ≈ 0,60)', 'Minimum v (−2/3, e²/9 ≈ 0,82), prevoj v (−1/3, 2e/9 ≈ 0,60)', 'Maksimum v (−1/3, 2e/9 ≈ 0,60), prevoj v (−2/3, e²/9 ≈ 0,82)', 'Maksimum v (−1, 0), prevoj v (−1/3, 2e/9 ≈ 0,60), ničle ni'], 0,
    'f′ = −(3x + 2)/(3e³ˣ) = 0 → x = −2/3; f″ = (3x + 1)/e³ˣ, f″(−2/3) < 0 → maksimum; f″ = 0 → x = −1/3 prevoj. Ničla x = −1; x → ∞: f → 0; x → −∞: f → −∞.'),
  Q('(Izpit 2015) f(x) = (x² − 2x + 1)/(x + 1). Poševna asimptota in ekstrema?', [
    'y = x − 3; maksimum (−3, −8), minimum (1, 0)', 'y = x − 1; maksimum (−3, −8), minimum (1, 0)', 'y = x − 3; minimum (−3, −8), maksimum (1, 0)', 'y = x + 1; ekstremov ni'], 0,
    'Deljenje: (x² − 2x + 1):(x + 1) = x − 3, ostanek 4 → asimptota y = x − 3. f′ = (x − 1)(x + 3)/(x + 1)²: stacionarni točki −3 in 1; f(−3) = −8 (max), f(1) = 0 (min). Konveksna na (−1, ∞).'),
  Q('(Izpit 2014) f(x) = (x² − 2x + 1)·e²ˣ. Ekstrema in limiti?', [
    'Maksimum (0, 1), minimum (1, 0); x → −∞: f → 0, x → ∞: f → ∞', 'Minimum (0, 1), maksimum (1, 0); x → −∞: f → ∞, x → ∞: f → 0', 'Maksimum (0, 1), minimum (1, 0); x → −∞: f → −∞, x → ∞: f → ∞', 'Samo minimum (1, 0), prevoja ni; x → −∞: f → 0, x → ∞: f → 0'], 0,
    'f′ = (2x² − 2x)e²ˣ = 0 → x = 0, 1; f″ = (4x² − 2)e²ˣ: f″(0) = −2 (max), f″(1) = 2e² (min). Prevoja pri x = ±1/√2. Dvojna ničla x = 1.'),
];

const matrike = [
  Q('(Izpit 2021) Sistem 2x + y − z + 3u = −2, −6x − 4y + 2z − 4u = 12, 4x − 4z + 6u = −2. Rešitev?', [
    'Enoparametrična: x = z − 2, y = −z − 1, u = 1, z ∈ ℝ', 'Natanko ena rešitev: x = −2, y = −1, z = 0, u = 1', 'Sistem ni rešljiv, ker je rang razširjene matrike večji od ranga matrike', 'Dvoparametrična: x = z − 2, y = −z − 1, u ∈ ℝ, z ∈ ℝ'], 0,
    'Gaussova eliminacija: rang A = rang [A|b] = 3 < 4 neznanke → 1 parameter (z, ker v 3. stolpcu ni pivota).'),
  Q('(Izpit 2019) Sistem −2x − 2y + z + u = 1, x + 2y + z − u = 1, 4x + 6y + z + a·u = 1. Pri katerem a ima sistem dvoparametrično rešitev?', [
    'a = −3', 'a = 3', 'a = 0', 'Pri nobenem; rešitev je vedno enoparametrična'], 0,
    'Po eliminaciji ostane vrstica (0 0 0 a + 3 | 0): pri a = −3 je rang 2 (parametra z in u), sicer rang 3 (parameter le z, u = 0). Sistem je rešljiv za vsak a.'),
  Q('(Izpit 2020) Determinanta je A(x) = −3x² − 6x + 4. Pri kateri vrednosti x je največja?', [
    'x = −1 (A = 7)', 'x = 1 (A = −5)', 'x = 0 (A = 4)', 'x = −2 (A = 4)'], 0,
    'A′(x) = −6x − 6 = 0 → x = −1; A″ = −6 < 0 → maksimum, A(−1) = −3 + 6 + 4 = 7.'),
  Q('(Izpit 2018) det A = (1 + x²)², det B = 2x²·(1 + x²). Za katere x sta determinanti enaki?', [
    'x = 1 in x = −1', 'x = 0', 'x = ±√2', 'Za noben realni x'], 0,
    '(1 + x²)² = 2x²(1 + x²) → 1 + x² = 2x² → x² = 1.'),
  Q('(Izpit 2017) det A = 25 − 4x. Za katere x je matrika A obrnljiva?', [
    'x ≠ 25/4', 'x = 25/4', 'x ≠ 0', 'Za vsak x'], 0,
    'Matrika je obrnljiva natanko takrat, ko je det A ≠ 0.'),
  Q('(Izpit 2016) Sistem −2x + y + z − 3t = 4, −x − y + 2z − 3t = 2, x − 2y + z = −2, −x + y − 2t = 2. Rešitev?', [
    'Enoparametrična: x = z − 2, y = z, t = 0, z ∈ ℝ', 'Natanko ena: x = −2, y = 0, z = 0, t = 0', 'Sistem ni rešljiv', 'Dvoparametrična: x = z − 2, y, z ∈ ℝ'], 0,
    'Rang matrike sistema in razširjene matrike je 3, neznank 4 → en parameter (z); vrstična kanonična oblika da x − z = −2, y − z = 0, t = 0.'),
  Q('(Izpit 2015) Homogeni sistem x + 2y + z + 5t = 0, 3x + 6y − 2z + 5t = 0, x + 2y − 4z − 5t = 0, 2x + 4y − 2z − 5t = 0. Rešitve?', [
    'y ∈ ℝ, x = −2y, z = 0, t = 0', 'Samo trivialna rešitev x = y = z = t = 0', 'z ∈ ℝ, x = −z, y = 0, t = 0', 'Dvoparametrična z y in t'], 0,
    'Homogen sistem je vedno rešljiv; rang 3, 4 neznanke → en parameter (y, v 2. stolpcu ni pivota).'),
  Q('(Izpit 2014) Sistem x + 2y + z + 5t = −1, 3x + 4y + z + 2t = 8, x + y − 3t = 6. Rešitev?', [
    'Enoparametrična: x = 2 + z, y = 1 − z, t = −1, z ∈ ℝ', 'Natanko ena: x = 2, y = 1, z = 0, t = −1', 'Sistem ni rešljiv', 'Enoparametrična: x = 2 + t, y = 1 − t, z = −1'], 0,
    '3 enačbe, 4 neznanke, rang 3 → en parameter; kanonična oblika: x − z = 2, y + z = 1, t = −1.'),
];

const financna = [
  Q('(Izpit 2019) Koliko vlagamo na koncu vsakega četrtletja 7 let, da bomo 7 let prejemali prenumerandne polletne anuitete po 500 €, prva na začetku 10. leta? Konformno mesečno obrestovanje, 2,4 % letno.', [
    '203,75 €', '250,00 €', '187,40 €', '233,10 €'], 0,
    'Mesečni faktor r = ¹²√1,024. Ekvivalenca glavnic na konec 16. leta: x·r¹⁰⁸·(r⁸⁴ − 1)/(r³ − 1) = 500·r⁶·(r⁸⁴ − 1)/(r⁶ − 1) → x = 500/(r¹⁰²·(r³ + 1)) = 203,75 €.'),
  Q('(Izpit 2020) Kredit 5.000 € odplačamo z enakimi mesečnimi anuitetami; prva eno leto in en mesec po najemu, zadnja 5 let po najemu. Konformno mesečno obrestovanje, 4 % letno. Anuiteta?', [
    '117,24 €', '104,17 €', '110,94 €', '125,60 €'], 0,
    '48 anuitet, r = ¹²√1,04; ekvivalenca na konec 5. leta: x·(r⁴⁸ − 1)/(r − 1) = 5.000·r⁶⁰ → x = 117,24 €.'),
  Q('(Izpit 2020) Kredit 5.000 € (4 % letno, konformno mesečno obrestovanje) odplačujemo z 48 mesečnimi obroki od 13. do 60. meseca po najemu. Če je mesečna anuiteta 100 €, preostanek pa poravnamo z zadnjim obrokom, koliko znaša zadnje plačilo?', [
    '994,75 €', '827,52 €', '1.117,24 €', '600,00 €'], 0,
    'y = 5.000·r⁶⁰ − 100·r·(r⁴⁷ − 1)/(r − 1) = 994,75 €.'),
  Q('(Izpit 2018) 4 leta na začetku vsakega četrtletja vplačujemo po 1.500 €; nato 5 let prejemamo polletno rento na začetku polletja, prvo 7 let po prvem pologu. 1,2 % letno, relativno četrtletno obrestovanje. Renta?', [
    '2.621,60 €', '2.400,00 €', '2.885,30 €', '1.310,80 €'], 0,
    'r = 1,003 (četrtletno). Ekvivalenca na konec 12. leta: 1.500·r³³·(r¹⁶ − 1)/(r − 1) = x·r²·(r²⁰ − 1)/(r² − 1) → x = 2.621,60 €.'),
  Q('(Izpit 2017) Banka A: 3 % letno, mesečna kapitalizacija z relativno obrestno mero. V začetku januarja, februarja in marca vložimo po 1.000 €. Stanje v začetku novembra?', [
    '3.068,19 €', '3.000,00 €', '3.090,00 €', '3.075,56 €'], 0,
    'r = 1,0025; G = 1.000·(r¹⁰ + r⁹ + r⁸) = 1.000·r⁸·(r² + r + 1) = 3.068,19 €.'),
  Q('(Izpit 2017) Banka B uporablja navadno obrestovanje po 4 % letno. Koliko vložimo v začetku januarja, februarja in marca, da imamo v začetku novembra 3.068,19 €?', [
    '992,94 €', '1.000,00 €', '1.022,73 €', '975,00 €'], 0,
    'Navadne obresti: G = b·(1 + 10p/1200) + b·(1 + 9p/1200) + b·(1 + 8p/1200) = b·(3 + 27·4/1200) = 3,09·b → b = 992,94 €.'),
  Q('(Izpit 2016) 50.000 € vložimo danes; letna renta, prva čez 12 let, izplačana 20-krat; 3 % letno dekurzivno. Renta?', [
    '4.652,11 €', '3.360,77 €', '5.000,00 €', '2.500,00 €'], 0,
    'Ekvivalenca na čas zadnje rente (31 let): G·r³¹ = a·(r²⁰ − 1)/(r − 1) → a = 50.000·1,03³¹·0,03/(1,03²⁰ − 1) = 4.652,11 €.'),
  Q('(Izpit 2016) 50.000 € vložimo danes; VEČNA letna renta, prva čez 12 let; 3 % letno. Renta?', [
    '2.076,35 €', '1.500,00 €', '2.139,43 €', '4.652,11 €'], 0,
    'Glavnica je čez 11 let vredna G·r¹¹; večna renta = letne obresti od nje: a = G·r¹¹·(r − 1) = 50.000·1,03¹¹·0,03 = 2.076,35 €.'),
  Q('(Izpit 2015) Jože vlaga 2 leti na začetku vsakega meseca po 100 €, Franci 2 leti na koncu vsakega trimesečja po 301 €; 3 % letno, relativno mesečno. Kdo ima po 3 letih več?', [
    'Jože: 2.551,78 € proti 2.547,53 €', 'Franci: 2.551,78 € proti 2.547,53 €', 'Oba enako, 2.400 €', 'Franci, ker vplača 2.408 € proti 2.400 €'], 0,
    'r = 1,0025. Jože: 100·r¹³·(r²⁴ − 1)/(r − 1) = 2.551,78; Franci: 301·r¹²·(r²⁴ − 1)/(r³ − 1) = 2.547,53.'),
  Q('(Izpit 2014) Kredit 1.000.000 € v 10 enakih polletnih obrokih, prvi pol leta po najemu; 6 % letno, relativno četrtletno obrestovanje. Obrok?', [
    '117.365,16 €', '100.000,00 €', '136.207,06 €', '115.000,00 €'], 0,
    'r = 1,015 (četrtletno); G·r²⁰ = x·(r²⁰ − 1)/(r² − 1) → x = 117.365,16 €.'),
  Q('(Izpit 2014) Kredit 1.000.000 € odplačamo v 10 enakih polletnih obrokih; 6 % letno, relativno četrtletno obrestovanje, a prvi obrok šele 3 leta po najemu. Obrok?', [
    '136.207,06 €', '117.365,16 €', '127.628,00 €', '150.000,00 €'], 0,
    'Redukcijski termin čez 7,5 leta: G·r³⁰ = y·(r²⁰ − 1)/(r² − 1) → y = 136.207,06 €. Odlog podraži obrok, ker dolg 2,5 leta le raste.'),
];

const verjetnost = [
  Q('(Izpit 2022) Aleš podre vse keglje z verjetnostjo 0,7 (en met), Blaž z 0,2, a ima dva meta (drugi le, če prvi ni uspel). Verjetnost, da oba podreta vse keglje?', [
    '0,252', '0,140', '0,556', '0,312'], 0,
    'Blaž uspe: 0,2 + 0,8·0,2 = 0,36; oba: 0,7·0,36 = 0,252 (= P(AB) + P(A B̄B) = 0,14 + 0,112).'),
  Q('(Izpit 2022) Aleš 0,7 (en met), Blaž 0,2 z največ dvema metoma. Verjetnost, da je natanko eden podrl vse keglje?', [
    '0,556', '0,252', '0,808', '0,448'], 0,
    'P(A, Blaž ne) = 0,7·0,64 = 0,448; P(Aleš ne, Blaž da) = 0,3·0,36 = 0,108 → 0,556.'),
  Q('(Izpit 2022) Aleš 0,7, Blaž 0,36 (dva meta). Verjetnost, da sta oba podrla vse keglje, če vemo, da je vsaj eden?', [
    '≈ 0,312', '≈ 0,252', '≈ 0,452', '≈ 0,892'], 0,
    'P(oba | vsaj eden) = P(oba)/P(vsaj eden) = 0,252/(0,252 + 0,556) = 0,312.'),
  Q('(Izpit 2022) Aleš 0,7, Blaž 0,2 (dva meta). Verjetnost, da je Blaž metal dvakrat, če vemo, da je natanko eden podrl vse keglje?', [
    '≈ 0,892', '≈ 0,556', '≈ 0,800', '≈ 0,312'], 0,
    'Blaž meče dvakrat, kadar prvič zgreši. Med izidi z "natanko enim": A·B̄B̄ (0,448) in A·B̄B (0,048) → (0,448 + 0,048)/0,556 = 0,892.'),
  Q('(Izpit 2019) Pošten kovanec; cifra → iz posode (3 bele, 2 rdeči) izžrebamo 3 kroglice, grb → 2 kroglici. X = število rdečih. Verjetnostna shema in E(X)?', [
    'P(0) = 1/5, P(1) = 3/5, P(2) = 1/5; E(X) = 1', 'P(0) = 3/10, P(1) = 6/10, P(2) = 1/10; E(X) = 0,8', 'P(0) = 1/10, P(1) = 6/10, P(2) = 3/10; E(X) = 1,2', 'P(0) = P(1) = P(2) = 1/3; E(X) = 1'], 0,
    'Popolna verjetnost: P(X = 0) = ½·C(3,3)/C(5,3) + ½·C(3,2)/C(5,2) = ½·1/10 + ½·3/10 = 1/5; P(X = 1) = ½·6/10 + ½·6/10 = 3/5; P(X = 2) = 1/5. E = 0 + 3/5 + 2/5 = 1.'),
  Q('(Izpit 2021) Štirje zdravstveni delavci: eden zboli z verjetnostjo 2/3, trije vsak z 1/3, neodvisno. Z = število obolelih. P(Z = 0) in E(Z)?', [
    'P(Z = 0) = 8/81; E(Z) = 5/3', 'P(Z = 0) = 16/81; E(Z) = 4/3', 'P(Z = 0) = 1/81; E(Z) = 2', 'P(Z = 0) = 8/81; E(Z) = 2'], 0,
    'P(Z = 0) = (1/3)·(2/3)³ = 8/81. E(Z) = vsota verjetnosti obolenja = 2/3 + 3·1/3 = 5/3. Shema: 8/81, 28/81, 30/81, 13/81, 2/81.'),
  Q('(Izpit 2021) Z: P(0) = 8/81, P(1) = 28/81, P(2) = 30/81, P(3) = 13/81, P(4) = 2/81. Verjetnost, da zbolita natanko dva, če vemo, da zboli vsaj eden?', [
    '30/73', '30/81', '28/73', '43/81'], 0,
    'P(Z = 2 | Z ≥ 1) = P(Z = 2)/(1 − P(Z = 0)) = (30/81)/(73/81) = 30/73.'),
  Q('(Izpit 2020) Posode: (1 bela, 1 rdeča), (1 rdeča, 2 modri), (1 bela, 3 modre); iz vsake eno kroglico. X = število rdečih. Verjetnostna shema?', [
    'P(0) = 2/6, P(1) = 3/6, P(2) = 1/6', 'P(0) = 1/6, P(1) = 3/6, P(2) = 2/6', 'P(0) = 1/4, P(1) = 1/2, P(2) = 1/4', 'P(0) = 3/8, P(1) = 4/8, P(2) = 1/8'], 0,
    'Rdeča je lahko le iz 1. (p = ½) in 2. posode (p = 1/3): P(0) = ½·2/3 = 1/3; P(2) = ½·1/3 = 1/6; P(1) = 1/2.'),
  Q('(Izpit 2020) X: P(0) = 2/6, P(1) = 3/6, P(2) = 1/6. P(X = 2 | X ≥ 1), E(X) in σ(X)?', [
    'P = 1/4; E(X) = 5/6; σ = √17/6 ≈ 0,69', 'P = 1/6; E(X) = 5/6; σ = 17/36', 'P = 1/4; E(X) = 1; σ = √17/6', 'P = 1/3; E(X) = 5/6; σ ≈ 0,47'], 0,
    'P = (1/6)/(4/6) = 1/4. E = 3/6 + 2/6 = 5/6. D = E(X²) − E(X)² = (3/6 + 4/6) − 25/36 = 17/36 → σ = √17/6.'),
  Q('(Izpit 2015) Metka reče DA z 0,7, Cvetka z 0,5 (neodvisno). Peter: DA, če obe DA; NE, če obe NE; sicer DA z 0,8. X = število sladoledov. E(X)?', [
    '1,95', '1,50', '2,00', '1,20'], 0,
    'Shema: P(3) = 0,35; P(2) = 0,7·0,5·0,8 + 0,3·0,5·0,8 = 0,40; P(1) = 0,7·0,5·0,2 + 0,3·0,5·0,2 = 0,10; P(0) = 0,15. E = 0,1 + 0,8 + 1,05 = 1,95.'),
  Q('(Izpit 2014) Metka se javi z 0,4, Jure z 0,9 (neodvisno). Če oba, mama izbere vsakega z 0,5. Verjetnost, da skledo poliže Metka?', [
    '0,22', '0,40', '0,04', '0,58'], 0,
    'P(C) = P(samo Metka) + P(oba)·0,5 = 0,4·0,1 + 0,4·0,9·0,5 = 0,04 + 0,18 = 0,22.'),
  Q('(Izpit 2014) Metka 0,4, Jure 0,9. Skleda je bila polizana. Verjetnost, da jo je polizala Metka?', [
    '≈ 0,234', '≈ 0,220', '≈ 0,400', '≈ 0,060'], 0,
    'P(nepolizana) = 0,6·0,1 = 0,06. P(Metka | polizana) = 0,22/0,94 = 0,234. P(natanko eden se javi) = 0,4·0,1 + 0,6·0,9 = 0,58.'),
];

const more = require('./mat-izpiti2');

module.exports = {
  id: 'mat',
  parts: [
    { id: 'k1', decks: [
      { id: 'mat-stari-funkcije', name: 'Stari izpiti: funkcije, odvodi, integrali (z rešitvami)', calc: true, questions: [...funkcije, ...more.funkcije] },
      { id: 'mat-stari-financna', name: 'Stari izpiti: finančna matematika (z rešitvami)', calc: true, questions: [...financna, ...more.financna] },
    ] },
    { id: 'k2', decks: [
      { id: 'mat-stari-matrike', name: 'Stari izpiti: sistemi in determinante (z rešitvami)', calc: true, questions: [...matrike, ...more.matrike] },
      { id: 'mat-stari-verjetnost', name: 'Stari izpiti: verjetnost in slučajne spremenljivke (z rešitvami)', calc: true, questions: [...verjetnost, ...more.verjetnost] },
    ] },
  ],
};
