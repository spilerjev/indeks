/* Matematika - stari izpiti, 2. del (2013, 2015-2022, varianta A, uradne rešitve). Vključi jih mat-izpiti.js. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

const funkcije = [
  Q('(Izpit 2013) f(x) = ln(½x² + x + 1). Definicijsko območje, ničle in ekstrem?', [
    'D = ℝ; ničli x = 0 in x = −2; minimum v (−1, ln ½ ≈ −0,69)', 'D = (−2, 0); ničli x = 0 in x = −2; maksimum v (−1, ln ½)', 'D = ℝ; ničla x = −1; minimum v (0, 0)', 'D = (0, ∞); ničla x = 1; ekstremov ni'], 0,
    'Diskriminanta ½x² + x + 1 je −1 < 0 → izraz vedno pozitiven → D = ℝ. Ničle: ½x² + x + 1 = 1. f′ = (x + 1)/(½x² + x + 1) = 0 → x = −1; prevoja v (0, 0) in (−2, 0).'),
  Q('(Izpit 2013) f(x) = (x² − x − 2)/(x − 3). Asimptota, ekstrema in tangenta v x = 0?', [
    'y = x + 2; maksimum (1, 1), minimum (5, 9); tangenta y = (5/9)x + 2/3', 'y = x − 2; minimum (1, 1), maksimum (5, 9); tangenta y = (5/9)x + 2/3', 'y = x + 2; maksimum (1, 1), minimum (5, 9); tangenta y = (2/3)x + 5/9', 'y = x + 3; ekstremov ni; tangenta y = x + 2/3'], 0,
    'Deljenje da x + 2, ostanek 4. f′ = (x² − 6x + 5)/(x − 3)² = 0 → x = 1, 5; f(1) = 1, f(5) = 9. f(0) = 2/3, f′(0) = 5/9.'),
  Q('(Izpit 2015) f(x) = eˣ·(4x − x² − 4). Ekstrema in limiti?', [
    'Minimum (0, −4), maksimum (2, 0); x → ∞: f → −∞, x → −∞: f → 0', 'Maksimum (0, −4), minimum (2, 0); x → ∞: f → ∞', 'Minimum (0, −4), maksimum (2, 0); x → ∞: f → 0, x → −∞: f → −∞', 'Samo maksimum (2, 0); x → ∞: f → ∞, x → −∞: f → 0'], 0,
    'f′ = eˣ(−x² + 2x) = 0 → x = 0, 2; f″ = eˣ(−x² + 2): f″(0) = 2 (min), f″(2) < 0 (max). Dvojna ničla x = 2; prevoja pri ±√2.'),
  Q('(Izpit 2015) f(x, y) = 12·ln x − 3xy² + y³. Stacionarne točke in njihova vrsta?', [
    'Edina stacionarna točka A(1, 2) je sedlo', 'Edina stacionarna točka A(1, 2) je minimum', 'Stacionarni točki sta (1, 2) in (1, 0); prva je maksimum', 'Stacionarnih točk ni, ker 12/x ≠ 0'], 0,
    'f_y = 3y(y − 2x) = 0 → y = 0 (f_x = 12/x ≠ 0, ni rešitve) ali y = 2x → 12/x = 12x² → x = 1. H(1, 2) = f_xx·f_yy − f_xy² = (−12)(6) − 144 = −216 < 0 → sedlo.'),
  Q('(Izpit 2013) f(x, y) = x²y + x² + y² − 2y. Kakšne vrste sta stacionarni točki A(0, 1) in B(2, −1)?', [
    'A je minimum, B je sedlo', 'A je maksimum, B je minimum', 'A je sedlo, B je minimum', 'Obe sta minimuma'], 0,
    'f_xx = 2y + 2, f_yy = 2, f_xy = 2x; H = 4y + 4 − 4x². H(A) = 8 > 0 in f_xx(A) = 4 > 0 → minimum; H(B) = −16 < 0 → sedlo.'),
  Q('(Izpit 2016) y = x·e^(x² − 6x + 2). Elastičnost funkcije in njena vrednost pri x = 2?', [
    'E = 2x² − 6x + 1; E(2) = −3: če x povečamo za 1 %, y pade za ≈ 3 % (elastična)', 'E = 2x² − 6x + 1; E(2) = 3: če x povečamo za 1 %, y zraste za ≈ 3 % (elastična)', 'E = x² − 6x + 2; E(2) = −6: če x povečamo za 1 %, y pade za ≈ 6 % (elastična)', 'E = 2x − 6; E(2) = −2: če x povečamo za 1 %, y pade za ≈ 2 % (neelastična)'], 0,
    'E = x·y′/y = x(2x − 6) + 1 = 2x² − 6x + 1. |E| > 1 → elastična. E = 1 pri x = 3 (pri x = 0 ni definirana).'),
  Q('(Izpit 2017) f(x) = √x·e^(−x/2). Definicijsko območje, ekstrem in zaloga vrednosti?', [
    'D = [0, ∞); maksimum (1, 1/√e ≈ 0,61); Z = [0, 1/√e]', 'D = ℝ; maksimum (1, 1/√e); Z = (−∞, 1/√e]', 'D = (0, ∞); minimum (1, 1/√e); Z = [1/√e, ∞)', 'D = [0, ∞); maksimum (2, 1/e); Z = [0, 1/e]'], 0,
    'f′ = ½(x^(−1/2) − x^(1/2))e^(−x/2) = 0 → x = 1. Narašča na (0, 1), pada naprej; (0, 0) je minimum; x → ∞: f → 0.'),
  Q('(Izpit 2017) f(x, y) = ln(xy + 2y); f_x(1, 2) = 1/3, f_y(1, 2) = 1/2. Kako ocenimo spremembo f, če x povečamo za 0,3 in y zmanjšamo za 0,1?', [
    'Δf ≈ 1/3·0,3 + 1/2·(−0,1) = 0,05', 'Δf ≈ 1/3·0,3 − 1/2·(−0,1) = 0,15', 'Δf ≈ 0,3 − 0,1 = 0,2', 'Δf ≈ 1/3·(−0,1) + 1/2·0,3 = 0,117'], 0,
    'Totalni diferencial Δf ≈ f_x Δx + f_y Δy. Da f ostane nespremenjena pri Δy = −0,1, je Δx ≈ −f_y/f_x·Δy = +0,15.'),
  Q('(Izpit 2017) f(x) = ¼x²(3 − 2·ln x). Ničla, ekstrem in prevoj?', [
    'Ničla x = e^(3/2) ≈ 4,48; maksimum (e, e²/4 ≈ 1,85); prevoj (1, 3/4)', 'Ničla x = e^(3/2); minimum (e, e²/4); prevoj (1, 3/4)', 'Ničli x = 0 in x = e^(3/2); maksimum (1, 3/4); prevoj (e, e²/4)', 'Ničla x = e; maksimum (e^(3/2), 0); prevoja ni'], 0,
    'f′ = x(1 − ln x) = 0 → x = e; f″ = −ln x: f″(e) = −1 < 0 (max), f″ = 0 pri x = 1 (prevoj). x = 0 ni v D; lim x→∞ f = −∞.'),
  Q('(Izpit 2017) Povpraševanje D(p) = (2p + 3)·e^(−p). Elastičnost pri ceni 2 EUR in cena, pri kateri je usklajeno elastično?', [
    'E(2) = −10/7 (elastično); usklajeno elastično pri p = 1,50 EUR', 'E(2) = −7/10 (neelastično); usklajeno elastično pri p = 1,50 EUR', 'E(2) = −10/7 (elastično); usklajeno elastično pri p = 3 EUR', 'E(2) = −2 (elastično); usklajeno elastično pri p = 1 EUR'], 0,
    'D′ = −(2p + 1)e^(−p); E = −(2p² + p)/(2p + 3). E(2) = −10/7. E = −1 → 2p² − p − 3 = 0 → p = 3/2.'),
  Q('(Izpit 2018) Povpraševanje D(p) = (3p + 8)·e^(1 − p). Elastičnost pri p = 1 in cena usklajene elastičnosti?', [
    'E(1) = −8/11 (neelastično); usklajeno elastično pri p ≈ 1,33 EUR', 'E(1) = −11/8 (elastično); usklajeno elastično pri p ≈ 1,33 EUR', 'E(1) = −8/11 (neelastično); usklajeno elastično pri p = 1 EUR', 'E(1) = −1 (usklajeno elastično pri p = 1)'], 0,
    'E = −(3p² + 5p)/(3p + 8). |E| = 1 → 3p² + 2p − 8 = 0 → p = 4/3.'),
  Q('(Izpit 2018) f(x) = x/ln x. Definicijsko območje, pol in ekstrem?', [
    'D = (0, 1) ∪ (1, ∞); pol x = 1; minimum (e, e)', 'D = (0, ∞); pol x = 0; maksimum (e, e)', 'D = (1, ∞); pol x = 1; minimum (1, 0)', 'D = ℝ \\ {1}; ničla x = 0; minimum (e, e)'], 0,
    'ln x = 0 pri x = 1 (pol); f′ = (ln x − 1)/(ln x)² = 0 → x = e; f″(e) = 1/e > 0. lim x→0 f = 0, lim x→∞ f = ∞.'),
  Q('(Izpit 2019) Taylorjeva vrsta f(x) = (2x − 1)·ln(x + 1) okrog x₀ = 0 do člena s tretjim odvodom?', [
    '−x + (5/2)x² − (4/3)x³ + …', 'x − (5/2)x² + (4/3)x³ + …', '−x + 5x² − 8x³ + …', '−1 − x + (5/2)x² + …'], 0,
    'f(0) = 0, f′(0) = −1, f″(0) = 5, f‴(0) = −8 → −x + 5/2·x² − 8/6·x³.'),
  Q('(Izpit 2019) f(x) = 4/(eˣ + e⁻ˣ). Ekstrem in limiti?', [
    'Maksimum (0, 2); x → ±∞: f → 0', 'Minimum (0, 2); x → ±∞: f → ∞', 'Maksimum (0, 4); x → ±∞: f → 0', 'Ekstremov ni; x → ∞: f → 0, x → −∞: f → 4'], 0,
    'f′ = −4(eˣ − e⁻ˣ)/(eˣ + e⁻ˣ)² = 0 → x = 0; f″(0) = −2 < 0. Ničel ni, D = ℝ.'),
  Q('(Izpit 2019) TR(K, L) = KL + 14K + 20L, TC(K, L) = K² + 2L² + 2K + 5L + 55. Pri katerih K in L je dobiček največji in kolikšen je?', [
    'K = 9, L = 6; dobiček 44', 'K = 6, L = 9; dobiček 44', 'K = 12, L = 15; dobiček 55', 'K = 7, L = 5; dobiček 40'], 0,
    'π = KL − K² − 2L² + 12K + 15L − 55; π_K = L − 2K + 12 = 0, π_L = K − 4L + 15 = 0 → K = 9, L = 6; π = 44.'),
  Q('(Izpit 2019) f(x) = 2 − 3·ln x/x. Ekstrem in ∫₁ᵉ f(x) dx?', [
    'Minimum (e, 2 − 3/e ≈ 0,90); integral 2e − 7/2 ≈ 1,94', 'Maksimum (e, 2 − 3/e ≈ 0,90); integral 2e − 3/2 ≈ 3,94', 'Minimum (1, 2); integral od 1 do e je 2e − 2 ≈ 3,44', 'Minimum (e, 0,90); integral od 1 do e je 3/2 = 1,50'], 0,
    'f′ = 3(ln x − 1)/x² = 0 → x = e, f″(e) > 0. ∫(2 − 3 ln x/x) dx = 2x − 3/2·(ln x)² + C; od 1 do e: (2e − 3/2) − 2 = 2e − 7/2.'),
  Q('(Izpit 2020) f(x) = (2x + 1)·e^(−x²). Ničla in ekstrema?', [
    'Ničla x = −½; minimum (−1, −e⁻¹ ≈ −0,37), maksimum (½, 2e^(−1/4) ≈ 1,56)', 'Ničla x = ½; maksimum (−1, −e⁻¹ ≈ −0,37), minimum (½, 2e^(−1/4) ≈ 1,56)', 'Ničla x = −½; minimum (−½, 0), maksimum (0, 1); prevojev ni', 'Ničel ni; maksimum (0, 1), minimum (−1, −0,37); limiti sta ∞'], 0,
    'f′ = (−4x² − 2x + 2)e^(−x²) = 0 → x = −1 ali ½; f″(−1) > 0, f″(½) < 0. Narašča na (−1, ½); limiti v ±∞ sta 0.'),
  Q('(Izpit 2021) f(x) = (x + 2)/√(x² + 2). Ekstrem, limiti in zaloga vrednosti?', [
    'Maksimum (1, √3 ≈ 1,7); x → ∞: f → 1, x → −∞: f → −1; Z = (−1, √3]', 'Minimum (1, √3 ≈ 1,7); x → ∞: f → 0, x → −∞: f → 0; Z = [√3, ∞)', 'Maksimum (−2, 0); x → ∞: f → 1, x → −∞: f → −1; Z = (−1, 1)', 'Ekstremov ni; x → ∞: f → 1, x → −∞: f → −1; Z = (−1, 1)'], 0,
    'f′ = (2 − 2x)/(x² + 2)^(3/2) = 0 → x = 1, f(1) = 3/√3 = √3. Ničla x = −2 (liha), polov ni, f(0) = √2.'),
  Q('(Izpit 2022) f(x) = eˣ/(1 − 2x). Pol, ekstrem in limiti?', [
    'Pol x = ½; maksimum (3/2, −e^(3/2)/2 ≈ −2,24); x → −∞: f → 0, x → ∞: f → −∞', 'Pol x = ½; minimum (3/2, −e^(3/2)/2 ≈ −2,24); x → −∞: f → −∞, x → ∞: f → 0', 'Pol x = −½; maksimum (0, 1); x → −∞: f → 0, x → ∞: f → ∞', 'Polov ni; maksimum (3/2, e^(3/2)/2 ≈ 2,24); x → −∞: f → 0, x → ∞: f → 0'], 0,
    'f′ = eˣ(3 − 2x)/(1 − 2x)² = 0 → x = 3/2; f″(3/2) < 0. Konveksna na (−∞, ½), konkavna na (½, ∞); Z = (−∞, −e^(3/2)/2] ∪ (0, ∞).'),
  Q('(Izpit 2022) f(x) = x²/ln x, x₀ = 3. Mejna vrednost in koeficient elastičnosti pri x₀?', [
    'f′(3) ≈ 2,98; E ≈ 1,09 → če x zmanjšamo za 3 %, f pade za ≈ 3,27 %', 'f′(3) ≈ 1,09; E ≈ 2,98 → če x zmanjšamo za 3 %, f pade za ≈ 8,94 %', 'f′(3) ≈ 2,98; E ≈ 0,33 → če x zmanjšamo za 3 %, f pade za ≈ 1,00 %', 'f′(3) ≈ 0,298; E ≈ 1,00 → če x zmanjšamo za 3 %, f pade za ≈ 3,00 %'], 0,
    'f′ = x(2 ln x − 1)/(ln x)²; E = x·f′/f = (2 ln x − 1)/ln x. Usklajeno elastična pri E = ±1: x = e in x = e^(1/3).'),
  Q('(Izpit 2015) Investicija: danes 15.000 €, čez 3 leta še 5.000 €; 6 enakih donosov konec 5. do 10. leta; 5 % letno. Kolikšni donosi dajo NSV = 0 in kolikšna je takrat interna stopnja donosnosti?', [
    'Donosi 4.626,48 €; IRR = 5 %', 'Donosi 3.333,33 €; IRR = 5 %', 'Donosi 4.626,48 €; IRR = 0 %', 'Donosi 5.000,00 €; IRR = 10 %'], 0,
    'NSV = −15.000 − 5.000/r³ + x·(r⁶ − 1)/(r¹⁰(r − 1)) = 0 → x = (15.000 + 5.000/1,05³)·1,05¹⁰·0,05/(1,05⁶ − 1) = 4.626,48 €. Pri NSV = 0 je IRR enaka uporabljeni meri.'),
];

const financna = [
  Q('(Izpit 2013) Renta vredna 100.000 € danes; 5 % letno, mesečni pripis, konformno; izplačila mesečno na začetku meseca, prvo čez 5 let, 120 obrokov. Mesečna renta?', [
    '1.341,31 €', '1.060,66 €', '833,33 €', '1.500,00 €'], 0,
    'r = ¹²√1,05. G·r⁶⁰ = a·(1 + r⁻¹ + … + r⁻¹¹⁹) → a = G·r¹⁷⁹·(r − 1)/(r¹²⁰ − 1) = 1.341,31 €. Večna renta bi bila G·r⁵⁹·(r − 1) = 517,86 €.'),
  Q('(Izpit 2016) Kredit 6.000 € vrnemo v 13 enakih letnih obrokih, prvi čez eno leto, 5 % letno (letna kapitalizacija). Obrok?', [
    '638,73 €', '461,54 €', '700,00 €', '576,92 €'], 0,
    'a = G·r¹³·(r − 1)/(r¹³ − 1) = 6.000·1,05¹³·0,05/(1,05¹³ − 1) ≈ 638,7 €.'),
  Q('(Izpit 2016) Investitor vloži 3 × 2.000 € (takoj, čez 1 in 2 leti) in dobi 9 × 1.000 € (od 5. do 13. leta); 5 % letno. Se mu po kriteriju NSV splača?', [
    'Da, NSV ≈ +128,80 €', 'Ne, NSV ≈ −128,80 €', 'Da, NSV = +3.000 € (9.000 − 6.000)', 'Ne, NSV = 0'], 0,
    'NSV = −2.000(1 + r⁻¹ + r⁻²) + 1.000·(r⁹ − 1)/(r¹³(r − 1)) = 128,80 € > 0.'),
  Q('(Izpit 2017) Stroj 20.000 €, 10 let; dobiček +3.000 € konec vsakega leta; servis 1.000 € konec 2., 4., 6. in 8. leta; 5,5 % letno. Se nakup splača po NSV?', [
    'Ne, NSV ≈ −469,64 €', 'Da, NSV ≈ +469,64 €', 'Da, NSV = +6.000 € (30.000 − 20.000 − 4.000)', 'Ne, NSV ≈ −2.600 €'], 0,
    'NSV = 3.000·(r¹⁰ − 1)/(r¹⁰(r − 1)) − 20.000 − 1.000·(r⁸ − 1)/(r⁸(r² − 1)) = −469,64. S 50 % popustom na prva dva servisa: NSV = −469,64 + 500/r² + 500/r⁴ = +383,20 € → splača.'),
  Q('(Izpit 2018) Kredit 50.000 €, 120 mesečnih obrokov, prvi mesec po najemu, 4 % letno konformno mesečno. Enak obrok?', [
    '504,53 €', '416,67 €', '651,48 €', '555,00 €'], 0,
    'a = G·r¹²⁰·(r − 1)/(r¹²⁰ − 1), r = ¹²√1,04 → 504,53 €.'),
  Q('(Izpit 2018) Kredit 50.000 €, 4 % konformno mesečno, 120 obrokov: prvih 60 enakih (b), zadnjih 60 pol manjših (b/2). Obroka?', [
    'Prvih 60 po 651,48 €, zadnjih 60 po 325,74 €', 'Prvih 60 po 504,53 €, zadnjih 60 po 252,27 €', 'Prvih 60 po 756,80 €, zadnjih 60 po 378,40 €', 'Prvih 60 po 600,00 €, zadnjih 60 po 300,00 €'], 0,
    'G·r¹²⁰ = b·(r⁶⁰ + ½)·(r⁶⁰ − 1)/(r − 1) → b = 651,48 €.'),
  Q('(Izpit 2019) Lara 36 mesecev (okt 2019 – sep 2022) konec vsakega meseca vplača 50 €; 1,8 % letno, relativno mesečno. Stanje po zadnjem pologu in potrebni polog za 2.000 €?', [
    '1.848,06 €; za 2.000 € po 54,11 €', '1.800,00 €; za 2.000 € po 55,56 €', '1.848,06 €; za 2.000 € po 50,00 €', '1.932,40 €; za 2.000 € po 52,00 €'], 0,
    'r = 1,0015; G = 50·(r³⁶ − 1)/(r − 1) = 1.848,06; x = 2.000·(r − 1)/(r³⁶ − 1) = 54,11 €.'),
];

const matrike = [
  Q('(Izpit 2013) A = [[0,0,0],[2,0,0],[2,2,0]], B = [[1,1,−1],[−1,−1,1],[1,1,−1]]. Rešitev matrične enačbe X = XA + B?', [
    'X = B(E − A)⁻¹ = [[−3,−1,−1],[3,1,1],[−3,−1,−1]]', 'X = (E − A)⁻¹B = [[1,1,−1],[1,1,−1],[1,1,−1]]', 'X = B(E + A)⁻¹ = [[1,1,−1],[−1,−1,1],[1,1,−1]]', 'X = BA = 0'], 0,
    'X − XA = B → X(E − A) = B → X = B(E − A)⁻¹; (E − A)⁻¹ = [[1,0,0],[2,1,0],[6,2,1]].'),
  Q('(Izpit 2013) Sistem x₁ + 2x₂ − 3x₃ + x₄ = 2, x₁ + x₂ − x₃ + x₄ = 2, x₁ + x₃ + 2x₄ = 3. Rešitev?', [
    'Enoparametrična: x₁ = 1 − x₃, x₂ = 2x₃, x₄ = 1', 'Natanko ena: x₁ = 1, x₂ = 0, x₃ = 0, x₄ = 1', 'Sistem ni rešljiv', 'Dvoparametrična: x₁ = 1 − x₃, x₂, x₃ ∈ ℝ'], 0,
    'Rang 3, 4 neznanke → parameter x₃ (v 3. stolpcu ni pivota); kanonična oblika: x₁ + x₃ = 1, x₂ − 2x₃ = 0, x₄ = 1.'),
  Q('(Izpit 2015) Inverz matrike A = [[2,2,2],[1,2,3],[1,0,−2]]?', [
    '[[2,−2,−1],[−5/2,3,2],[1,−1,−1]]', '[[2,2,1],[5/2,3,2],[1,1,1]]', '[[1/2,1/2,1/2],[1,1/2,1/3],[1,0,−1/2]]', 'Matrika ni obrnljiva (det A = 0)'], 0,
    'Gauss-Jordan: [A | E] → [E | A⁻¹]. Preverba: A·A⁻¹ = E.'),
  Q('(Izpit 2017) Sistem x + 2y + 3z = 2, −3x + 2y − z = −6, 4x + y − 3z = 0, 2x − 3y + 5z = 10. Rešitev?', [
    'Natanko ena: x = 1, y = −1, z = 1', 'Enoparametrična: x = 1 − z, y = −z, z ∈ ℝ', 'Sistem ni rešljiv (4 enačbe, 3 neznanke)', 'Natanko ena: x = 1, y = 1, z = −1'], 0,
    'Štiri enačbe, a rang matrike sistema in razširjene matrike je 3 = število neznank → enolična rešitev.'),
  Q('(Izpit 2017) Sistem 2u + 3x − 4y = 2, u − 2v − x − 2y = −2, −3u + 2v − 2y = −4. Rešitev?', [
    'Enoparametrična (y): u = 4 − 4y, v = 4 − 5y, x = −2 + 4y', 'Natanko ena: u = 4, v = 4, x = −2, y = 0', 'Sistem ni rešljiv', 'Dvoparametrična (x, y): u = 4 − 4y, v = 4 − 5y'], 0,
    'Rang 3, 4 neznanke; v stolpcu y ni pivota → y parameter.'),
  Q('(Izpit 2018) Sistem x − ay + z + 3t = 1, 2x + 2y + t = 3, 2y − z − t = 0, … je rešljiv le za določen a (rang matrike sistema je 3, zadnja vrstica razširjene matrike je (0 0 0 0 | a + 1)). Za kateri a in kakšna je rešitev?', [
    'a = −1; enoparametrična rešitev (parameter z)', 'a = 1; enolična rešitev (vse štiri neznanke določene)', 'a = 0; dvoparametrična rešitev (parametra z in t)', 'Za vsak a; enoparametrična rešitev (parameter t)'], 0,
    'Rešljiv, ko je rang razširjene matrike enak rangu matrike sistema (3) → a + 1 = 0. Štiri neznanke → en parameter.'),
  Q('(Izpit 2018) Homogeni sistem x + 2y + z − t = 0, 2x + y − z − 2t = 0, 3y + 3z + t = 0 (rang 3). Rešitev?', [
    'z ∈ ℝ: x = z, y = −z, t = 0', 'Samo trivialna rešitev', 'z ∈ ℝ: x = −z, y = z, t = 0', 't ∈ ℝ: x = t, y = −t, z = 0'], 0,
    'Homogen sistem je vedno rešljiv; rang 3 < 4 neznanke → en parameter (z, brez pivota).'),
  Q('(Izpit 2019) A = [[5,1,0],[−3,2,0],[0,2,4]], B = [2, −1, 1]. Rešitev enačbe X·Aᵀ = 3X − B?', [
    'X = −B(Aᵀ − 3E)⁻¹ = [1, −4, 7]', 'X = B(Aᵀ − 3E)⁻¹ = [−1, 4, −7]', 'X = (3E − Aᵀ)⁻¹B = [2, −1, 1]', 'X = B(3E − A) = [6, −5, 3]'], 0,
    'XAᵀ − 3X = −B → X(Aᵀ − 3E) = −B → X = −B(Aᵀ − 3E)⁻¹; (Aᵀ − 3E)⁻¹ = [[−1,3,−6],[−1,2,−4],[0,0,1]].'),
  Q('(Izpit 2019) A = [[1,0,0],[2,1,0],[2,2,1]]. Rešitev enačbe A − X = A⁻¹X?', [
    'X = (A⁻¹ + E)⁻¹A = [[½,0,0],[3/2,½,0],[2,3/2,½]]', 'X = A(A⁻¹ + E) = [[2,0,0],[2,2,0],[2,2,2]]', 'X = A − A⁻¹ = [[0,0,0],[4,0,0],[0,4,0]]', 'X = E'], 0,
    'A = A⁻¹X + X = (A⁻¹ + E)X → X = (A⁻¹ + E)⁻¹A. Enako: X = (A + E)⁻¹A².'),
  Q('(Izpit 2020) Sistem 3x − 3y − 2z + 4u = a², −2x + 2y − z + 2u = −3, x − y + 2z − 4u = 3. Za kateri a je rešljiv in kakšna je rešitev?', [
    'a = ±1; dvoparametrična: x = 1 + y, z = 1 + 2u', 'a = 1; enolična rešitev x = 1, y = 0, z = 1, u = 0', 'a = 0; enoparametrična rešitev s parametrom u', 'Za vsak a; dvoparametrična rešitev x = 1 + y, z = 1 + 2u'], 0,
    'Eliminacija da zadnjo vrstico (0 0 0 0 | a² − 1): rešljiv, ko je a² = 1. Rang 2, 4 neznanke → parametra y in u.'),
  Q('(Izpit 2021) A = [[−1,−2],[1,3]], B = [[1,3,0],[−2,1,1]]. Rešitev enačbe 2XA = Bᵀ + XA⁻¹?', [
    'X = Bᵀ(2A − A⁻¹)⁻¹ = [[1,0],[2,1],[−1/7,1/7]]', 'X = (2A − A⁻¹)⁻¹Bᵀ', 'X = Bᵀ(2A + A⁻¹)⁻¹ = [[1,0],[2,1],[1/7,−1/7]]', 'X = Bᵀ·A/2'], 0,
    'X(2A − A⁻¹) = Bᵀ. A⁻¹ = [[−3,−2],[1,1]], 2A − A⁻¹ = [[1,−2],[1,5]], inverz = 1/7·[[5,2],[−1,1]].'),
  Q('(Izpit 2022) Homogeni sistem −2x + y + 3z = 0, 3x − 2y − 4z + u = 0, 5x − 3y − 7z + 2u = 0. Rešitev?', [
    'z ∈ ℝ: x = 2z, y = z, u = 0', 'Samo trivialna rešitev x = y = z = u = 0', 'z ∈ ℝ: x = −2z, y = −z, u = 0', 'u ∈ ℝ: x = 2u, y = u, z = 0'], 0,
    'r(A) = 3 < 4 → ena prosta neznanka (z); kanonična oblika: x − 2z = 0, y − z = 0, u = 0.'),
];

const verjetnost = [
  Q('(Izpit 2013) Janez gre na 4 neodvisne izpite, vsakega naredi z verjetnostjo 1/3. Verjetnost, da naredi natanko dva?', [
    '8/27 ≈ 29,6 %', '1/9 ≈ 11,1 %', '11/27 ≈ 40,7 %', '4/27 ≈ 14,8 %'], 0,
    'Bernoulli: C(4,2)·(1/3)²·(2/3)² = 6·4/81 = 24/81 = 8/27. Vsaj dva: 8/27 + 1/9 = 11/27.'),
  Q('(Izpit 2013) Janez (4 izpiti, p = 1/3) je naredil vsaj dva izpita. Verjetnost, da je naredil vsaj tri?', [
    '3/11 ≈ 27,2 %', '1/9 ≈ 11,1 %', '8/27 ≈ 29,6 %', '1/3 ≈ 33,3 %'], 0,
    'P(≥3) = 4·(1/3)³·(2/3) + (1/3)⁴ = 9/81 = 1/9; P(≥3 | ≥2) = (1/9)/(11/27) = 3/11.'),
  Q('(Izpit 2013) Tone gre na 4 neodvisne izpite, vsakega naredi z verjetnostjo 1/4. T = število narejenih izpitov. E(T) in D(T)?', [
    'E(T) = 1, D(T) = 3/4', 'E(T) = 1, D(T) = 1/4', 'E(T) = 4/3, D(T) = 1', 'E(T) = 2, D(T) = 3/4'], 0,
    'Binomska porazdelitev: E = np = 1, D = np(1 − p) = 3/4. P(T = 0) = (3/4)⁴ = 81/256.'),
  Q('(Izpit 2017) Tim pošlje prošnji dvema neodvisnima delodajalcema; povabilo na razgovor z verjetnostjo 0,3, nato zaposlitev z 0,6. Verjetnost, da dobi zaposlitev?', [
    '0,3276', '0,18', '0,36', '0,51'], 0,
    'Popolna verjetnost: P(1 razgovor) = 0,42 → 0,6; P(2 razgovora) = 0,09 → 1 − 0,4² = 0,84; P = 0,42·0,6 + 0,09·0,84 = 0,3276.'),
  Q('(Izpit 2017) Tim: povabilo na razgovor pri vsakem od dveh delodajalcev z verjetnostjo 0,3 (neodvisno). Verjetnost dveh razgovorov, če vemo, da je povabljen na vsaj enega?', [
    '3/17 ≈ 0,177', '0,09', '0,42', '9/51 ≈ 0,09'], 0,
    'P(oba) = 0,09; P(vsaj en) = 1 − 0,49 = 0,51; 0,09/0,51 = 3/17.'),
  Q('(Izpit 2018) Loto 3/11: izžrebajo 3 od 11 števil, mi označimo 3. Verjetnost jackpota in verjetnost vsaj ene zadete?', [
    'Jackpot 1/165; vsaj ena 109/165', 'Jackpot 1/165; vsaj ena 56/165', 'Jackpot 3/11; vsaj ena 9/11', 'Jackpot 1/990; vsaj ena 1/2'], 0,
    'C(11,3) = 165 enako verjetnih izidov. P(nobene) = C(8,3)/165 = 56/165 → vsaj ena 109/165. Jackpot, če sta zadeti vsaj dve: (1/165)/((24 + 1)/165) = 1/25.'),
  Q('(Izpit 2018) Dva bobna s kroglicami 3, 4, 5, 6; iz vsakega izžrebamo eno. X = vsota. E(X) in P(X ≥ 9)?', [
    'E(X) = 9; P(X ≥ 9) = 10/16', 'E(X) = 9; P(X ≥ 9) = 6/16', 'E(X) = 8; P(X ≥ 9) = 1/2', 'E(X) = 9,5; P(X ≥ 9) = 7/16'], 0,
    '16 enako verjetnih parov; P(6) = 1/16, P(7) = 2/16, P(8) = 3/16, P(9) = 4/16, P(10) = 3/16, P(11) = 2/16, P(12) = 1/16. P(X ≥ 9 | X ≤ 10) = 7/13.'),
  Q('(Izpit 2019) Izpit: 6 vprašanj, 5 odgovorov, Gregor ugiba. Verjetnost, da pravilno odgovori na natanko 3, in verjetnost, da izpita (≥ 3 pravilnih) ne opravi?', [
    'P(natanko 3) ≈ 8,19 %; P(ne opravi) ≈ 90,11 %', 'P(natanko 3) = 50 %; P(ne opravi) = 50 %', 'P(natanko 3) ≈ 1,6 %; P(ne opravi) ≈ 98 %', 'P(natanko 3) ≈ 8,19 %; P(ne opravi) ≈ 9,89 %'], 0,
    'B(6, 1/5): P(3) = 20·4³/5⁶ = 0,0819; P(0) + P(1) + P(2) = 14.080/15.625 = 0,9011. P(vse napačno | ne opravi) = 0,2909; opravi v 3 rokih: (1 + 0,9011 + 0,9011²)(1 − 0,9011) ≈ 26,8 %.'),
  Q('(Izpit 2022) Tri rdeče in dve črni karti premešamo in zložimo v vrsto. X = število rdečih kart med črnima. Verjetnostna shema in E(X)?', [
    'P(0) = 2/5, P(1) = 3/10, P(2) = 1/5, P(3) = 1/10; E(X) = 1', 'P(0) = 1/10, P(1) = 1/5, P(2) = 3/10, P(3) = 2/5; E(X) = 2', 'P(0) = P(1) = P(2) = P(3) = 1/4; E(X) = 1,5', 'P(0) = 1/2, P(1) = 1/4, P(2) = 1/8, P(3) = 1/8; E(X) = 0,875'], 0,
    'Med 120 razporedi: X = 0 pri 48, X = 1 pri 36, X = 2 pri 24, X = 3 pri 12. E = 1, D = 1, σ = 1; P(X ≥ 2) = 3/10.'),
];

// id + prazni parts: add-letnik1-vsebina.js naloži vse .js v letnik1-src kot module
module.exports = { id: 'mat', parts: [], funkcije, financna, matrike, verjetnost };
