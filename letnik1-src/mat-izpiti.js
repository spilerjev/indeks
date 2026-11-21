/* Matematika za poslovne in ekonomske vede - naloge v slogu izpita (funkcije, finančna matematika, matrike, verjetnost).
   Naloge so napisane na novo (lastne funkcije, sistemi in primeri); rešitve so izračunane in preverjene s sympy. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const funkcije = [
  withId('q1dj8ut2', Q("∫ (eˣ + 4)·eˣ/(eˣ + 1) dx = ?", [
    "eˣ + 3·ln(eˣ + 1) + C", "eˣ − 3·ln(eˣ + 1) + C", "eˣ + 4·ln(eˣ + 1) + C", "(eˣ + 4)·ln(eˣ + 1) + C"], 0,
    "Substitucija u = eˣ, du = eˣ dx: ∫ (u + 4)/(u + 1) du = ∫ (1 + 3/(u + 1)) du = u + 3 ln|u + 1| + C.")),
  withId('q1t4aflm', Q("f(x) = (3 − ln x)/x. Kakšno je definicijsko območje in kje je ničla?", [
    "D = (0, ∞); ničla x = e³ ≈ 20,09", "D = ℝ \\ {0}; ničla x = e⁻³ ≈ 0,05", "D = (0, ∞); ničla x = 3", "D = (3, ∞); ničla x = e ≈ 2,72"], 0,
    "ln x zahteva x > 0. 3 − ln x = 0 → ln x = 3 → x = e³. Pri x → 0⁺ gre f → +∞ (navpična asimptota x = 0).")),
  withId('qxxbirk', Q("f(x) = (3 − ln x)/x. Kakšen je prvi odvod in kje je ekstrem?", [
    "f′(x) = (ln x − 4)/x²; minimum v (e⁴, −e⁻⁴)", "f′(x) = (4 − ln x)/x²; maksimum v (e⁴, −e⁻⁴)", "f′(x) = (ln x − 4)/x²; maksimum v (e⁴, −e⁻⁴)", "f′(x) = −1/x²; ekstrema ni"], 0,
    "Kvocientno pravilo: f′ = (−1/x · x − (3 − ln x))/x² = (ln x − 4)/x². f′ = 0 → x = e⁴, f(e⁴) = −1/e⁴. Funkcija pada na (0, e⁴) in narašča naprej → minimum. Ko x → ∞, f → 0.")),
  withId('qt4q17w', Q("f(x) = ln(x² + 6x + 9). Definicijsko območje, ničle in ekstremi?", [
    "D = ℝ \\ {−3}; ničli x = −2 in x = −4; ekstremov ni", "D = (−3, ∞); ničla x = −2; minimum v x = −3", "D = ℝ; ničli x = −2 in x = −4; minimum v x = −3", "D = ℝ \\ {−3}; ničla x = −3; ekstremov ni"], 0,
    "x² + 6x + 9 = (x + 3)² > 0 za x ≠ −3. Ničle: (x + 3)² = 1 → x = −2, −4. f′ = 2/(x + 3) ni nikoli 0; pada na (−∞, −3), narašča na (−3, ∞); povsod konkavna.")),
  withId('qo8g4gz', Q("f(x) = e^(−3x+2)/(x − 1). Kje ima funkcija ekstrem?", [
    "Maksimum v T(2/3, −3)", "Minimum v T(2/3, −3)", "Maksimum v T(1, e⁻¹)", "Ekstremov ni, ker funkcija nima ničel"], 0,
    "f′(x) = e^(−3x+2)·(2 − 3x)/(x − 1)² = 0 → x = 2/3; f(2/3) = e⁰/(−1/3) = −3. Narašča na (−∞, 2/3), pada na (2/3, 1) in (1, ∞) → maksimum. Pol x = 1, ničel ni.")),
  withId('qid843r', { q: "Graf funkcije f(x) = (x − 4)·ln x in x-os omejujeta končno območje. Kolikšna je njegova ploščina?",
      options: ["16·ln 2 − 33/4 ≈ 2,84","33/4 − 16·ln 2 ≈ −2,84","8·ln 4 ≈ 11,09","16·ln 2 − 15/4 ≈ 7,34"],
      correct: 0,
      explanation: "Ničli: ln x = 0 → x = 1 in x − 4 = 0 → x = 4; med njima je f < 0. Per partes (u = ln x, dv = (x − 4) dx, v = x²/2 − 4x): ∫₁⁴ f dx = −8 ln 4 − [x²/4 − 4x]₁⁴ = 33/4 − 16 ln 2 ≈ −2,84, ploščina je absolutna vrednost. Druga možnost pozabi absolutno vrednost, tretja vzame le robni člen." }),
  withId('q121595v', { q: "Kje ima funkcija f(x) = x²·ln x (x > 0) lokalne ekstreme?",
      options: ["Samo minimum v T(1/√e, −1/(2e) ≈ −0,18)","Minimum v T(1, 0) in maksimum v T(1/√e, −1/(2e))","Samo maksimum v T(1/√e, −1/(2e))","Minimum v T(1/√e, −1/(2e)) in maksimum v T(0, 0)"],
      correct: 0,
      explanation: "f′ = 2x·ln x + x = x(2 ln x + 1). Ker je x > 0, je f′ = 0 le pri ln x = −1/2 → x = 1/√e ≈ 0,61. f″ = 2 ln x + 3 = 2 > 0 → minimum, f = (1/e)·(−1/2) = −1/(2e). V x = 1 je ničla funkcije, ne ekstrem; x = 0 ni v definicijskem območju." }),
  withId('qs7bfxs', Q("f(x) = ln(x + 3) − x² − 5x. Definicijsko območje in ekstrem?", [
    "D = (−3, ∞); lokalni maksimum v (−2, 6)", "D = ℝ; lokalni minimum v (−2, 6)", "D = (−3, ∞); lokalna ekstrema v x = −2 in x = −7/2", "D = (3, ∞); lokalni maksimum v (−2, 6)"], 0,
    "f′ = 1/(x + 3) − 2x − 5 = 0 → 2x² + 11x + 14 = 0 → x = −2 ali x = −7/2 (zunaj D). f″ = −1/(x + 3)² − 2 < 0 → maksimum; f(−2) = ln 1 − 4 + 10 = 6.")),
  withId('q4ajhs6', { q: "Katere so stacionarne točke funkcije f(x, y) = (x² + y²)·e⁻ʸ?",
      options: ["T₁(0, 0) in T₂(0, 2)","Samo T(0, 0)","T₁(0, 0) in T₂(2, 0)","T₁(0, 2) in T₂(0, −2)"],
      correct: 0,
      explanation: "f_x = 2x·e⁻ʸ = 0 → x = 0. f_y = e⁻ʸ·(2y − x² − y²) = 0; pri x = 0: y(2 − y) = 0 → y = 0 ali y = 2." }),
  withId('q36714e', Q("f(x, y) = e⁻ʸ·(y − x²), f_x(1, 3) = −2/e³, f_y(1, 3) = −1/e³. Kako spremenimo y, če x zmanjšamo za 0,02 in naj vrednost funkcije ostane enaka?", [
    "y povečamo za približno 0,04", "y zmanjšamo za približno 0,04", "y povečamo za približno 0,01", "y ni treba spreminjati"], 0,
    "Totalni diferencial: 0 ≈ f_x·Δx + f_y·Δy → Δy = −f_x/f_y · Δx = −(−2)/(−1) · (−0,02) = +0,04.")),
  withId('qip2kth', Q("Taylorjeva vrsta funkcije f(x) = ln(1 + x²) okoli a = 0 do člena s četrtim odvodom?", [
    "x² − x⁴/2 + …", "x² + x⁴/2 + …", "1 + x² − x⁴/2 + …", "x² − x⁴/4 + …"], 0,
    "f(0) = 0, f′(0) = 0, f″(0) = 2, f‴(0) = 0, f⁗(0) = −12 → 2x²/2! − 12x⁴/4! = x² − x⁴/2.")),
  withId('q1md9gky', Q("∫ ((3 − x)/(x² − 4) + 1) dx = ?", [
    "¼·ln|x − 2| − (5/4)·ln|x + 2| + x + C", "(5/4)·ln|x − 2| − ¼·ln|x + 2| + x + C", "ln|x² − 4| + x + C", "−¼·ln|x − 2| + (5/4)·ln|x + 2| + x + C"], 0,
    "Parcialni ulomki: (3 − x)/((x − 2)(x + 2)) = A/(x − 2) + B/(x + 2); x = 2 → A = 1/4, x = −2 → B = −5/4.")),
  withId('q1ackygq', Q("∫ (2x³ − 7x² + 5x + 6)/(x² − 3x) dx = ?", [
    "x² − x − 2·ln|x| + 4·ln|x − 3| + C", "x² − x + 2·ln|x| − 4·ln|x − 3| + C", "x² − x − 4·ln|x| + 2·ln|x − 3| + C", "2x² − 7x + ln|x² − 3x| + C"], 0,
    "Deljenje: kvocient 2x − 1, ostanek 2x + 6. (2x + 6)/(x(x − 3)) = A/x + B/(x − 3): A = −2, B = 4.")),
  withId('q1wfjhzj', Q("f(x) = (x + 2)/(2e²ˣ). Kje sta ekstrem in prevoj?", [
    "Maksimum v (−3/2, e³/4 ≈ 5,02), prevoj v (−1, e²/2 ≈ 3,69)", "Minimum v (−3/2, e³/4 ≈ 5,02), prevoj v (−1, e²/2 ≈ 3,69)", "Maksimum v (−1, e²/2 ≈ 3,69), prevoj v (−3/2, e³/4 ≈ 5,02)", "Maksimum v (−2, 0), prevoja ni"], 0,
    "f′ = −(2x + 3)/(2e²ˣ) = 0 → x = −3/2 (prej narašča, nato pada → maksimum). f″ = 2(x + 1)/e²ˣ = 0 → x = −1 (prevoj). Ničla x = −2; x → ∞: f → 0; x → −∞: f → −∞.")),
  withId('q2v314k', Q("f(x) = (x² + 4x + 4)/(x − 1). Kakšna je poševna asimptota in kje sta ekstrema?", [
    "y = x + 5; maksimum (−2, 0), minimum (4, 12)", "y = x + 4; maksimum (−2, 0), minimum (4, 12)", "y = x + 5; minimum (−2, 0), maksimum (4, 12)", "y = x − 1; ekstremov ni"], 0,
    "Deljenje: (x² + 4x + 4):(x − 1) = x + 5, ostanek 9 → asimptota y = x + 5. f′ = (x − 4)(x + 2)/(x − 1)²: f(−2) = 0 (maksimum), f(4) = 36/3 = 12 (minimum). Pol x = 1.")),
  withId('q1q97c46', Q("f(x) = x²·e⁻ˣ. Ekstrema in limiti?", [
    "Minimum (0, 0), maksimum (2, 4/e² ≈ 0,54); x → ∞: f → 0, x → −∞: f → ∞", "Maksimum (0, 0), minimum (2, 4/e²); x → ∞: f → ∞, x → −∞: f → 0", "Minimum (0, 0), maksimum (2, 4/e²); x → ∞: f → ∞, x → −∞: f → 0", "Samo minimum (0, 0); x → ±∞: f → 0"], 0,
    "f′ = (2x − x²)·e⁻ˣ = x(2 − x)·e⁻ˣ = 0 → x = 0, 2. Pada na (−∞, 0), narašča na (0, 2), pada naprej. Eksponent prevlada: x → ∞ da f → 0.")),
];

const matrike = [
  withId('q1gxfvad', Q("Sistem 2x + y + 3u = 7, −x − 2y − 3z + u = 3, 3x − 3z + 2u = 7. Kakšna je rešitev?", [
    "Enoparametrična: x = 1 + z, y = −1 − 2z, u = 2, z ∈ ℝ", "Natanko ena: x = 1, y = −1, z = 0, u = 2", "Sistem ni rešljiv, ker je rang razširjene matrike večji od ranga matrike", "Dvoparametrična: x = 1 + z, y = −1 − 2z, u ∈ ℝ, z ∈ ℝ"], 0,
    "Gaussova eliminacija: rang A = rang [A|b] = 3 < 4 neznanke → en parameter (z, ker v 3. stolpcu ni pivota).")),
  withId('q1w0endo', Q("Sistem x + y + z + u = 2, x + 2y − z + 2u = 3, 2x + 3y + a·u = 5. Pri katerem a ima sistem dvoparametrično rešitev?", [
    "a = 3", "a = −3", "a = 0", "Pri nobenem; rešitev je vedno enoparametrična"], 0,
    "3. enačba − 1. − 2. da (0 0 0 a − 3 | 0): pri a = 3 je rang 2 (dva parametra), sicer rang 3 (en parameter). Sistem je rešljiv za vsak a.")),
  withId('q1al6euh', Q("Determinanta je A(x) = −2x² + 8x − 3. Pri kateri vrednosti x je največja?", [
    "x = 2 (A = 5)", "x = −2 (A = −27)", "x = 0 (A = −3)", "x = 4 (A = −3)"], 0,
    "A′(x) = −4x + 8 = 0 → x = 2; A″ = −4 < 0 → maksimum, A(2) = −8 + 16 − 3 = 5.")),
  withId('qfflace', { q: "Za kvadratni matriki A in B velja det A = x²·(x − 1) in det B = 4·(x − 1). Za katere realne x sta determinanti enaki?",
      options: ["x = 1, x = 2 in x = −2","x = 2 in x = −2","x = 2","x = 1"],
      correct: 0,
      explanation: "x²(x − 1) − 4(x − 1) = (x − 1)(x² − 4) = 0 → x = 1 ali x = ±2. Kdor deli z (x − 1), izgubi rešitev x = 1, saj je x − 1 lahko 0." }),
  withId('q1e6y3x', Q("det A = 18 − 5x. Za katere x je matrika A obrnljiva?", [
    "x ≠ 18/5", "x = 18/5", "x ≠ 0", "Za vsak x"], 0,
    "Matrika je obrnljiva natanko takrat, ko je det A ≠ 0, torej 18 − 5x ≠ 0.")),
  withId('qzxz0hp', Q("Sistem x + y − 3z + t = 3, 2x − y = −3, −x + z + 2t = 7, 3x − 3z + t = 0. Kakšna je rešitev?", [
    "Enoparametrična: x = z − 1, y = 1 + 2z, t = 3, z ∈ ℝ", "Natanko ena: x = −1, y = 1, z = 0, t = 3", "Sistem ni rešljiv", "Dvoparametrična: x = z − 1, y, z ∈ ℝ"], 0,
    "Rang matrike sistema in razširjene matrike je 3, neznank 4 → en parameter (z). Kanonična oblika: x − z = −1, y − 2z = 1, t = 3.")),
  withId('qfzpdo8', Q("Homogeni sistem x + 3y + z + 2t = 0, 2x + 6y − z + t = 0, x + 3y − 2z + 4t = 0, 3x + 9y − 3z + 5t = 0. Kakšne so rešitve?", [
    "y ∈ ℝ, x = −3y, z = 0, t = 0", "Samo trivialna rešitev x = y = z = t = 0", "z ∈ ℝ, x = −z, y = 0, t = 0", "Dvoparametrična z y in t"], 0,
    "Homogen sistem je vedno rešljiv; rang 3, 4 neznanke → en parameter (y, v 2. stolpcu ni pivota).")),
  withId('qvxlok2', Q("Sistem x + 2y − z + t = 0, 2x + y + z − t = 3, x − y + 2z + 3t = 8. Kakšna je rešitev?", [
    "Enoparametrična: x = 3 − z, y = z − 2, t = 1, z ∈ ℝ", "Natanko ena: x = 3, y = −2, z = 0, t = 1", "Sistem ni rešljiv", "Enoparametrična: x = 3 − t, y = t − 2, z = 1"], 0,
    "3 enačbe, 4 neznanke, rang 3 → en parameter; kanonična oblika: x + z = 3, y − z = −2, t = 1.")),
];

const financna = [
  withId('ql9v5hz', Q("Koliko moramo 6 let vlagati na koncu vsakega četrtletja, da bomo nato 6 let prejemali prenumerandne polletne anuitete po 600 €, prvo na začetku 9. leta? Konformno mesečno obrestovanje, 3 % letno.", [
    "239,46 €", "300,00 €", "218,62 €", "263,41 €"], 0,
    "Mesečni faktor r = ¹²√1,03. Ekvivalenca na začetku (sedanje vrednosti): x·Σ r^(−3k), k = 1…24 = 600·Σ r^(−(96 + 6j)), j = 0…11 → x = 239,46 €. (300 € = 600 · 12/24 brez obresti.)")),
  withId('qq0aqpj', Q("Kredit 8.000 € odplačamo z enakimi mesečnimi anuitetami; prva je 6 mesecev po najemu, zadnja 4 leta po najemu. Konformno mesečno obrestovanje, 5 % letno. Kolikšna je anuiteta?", [
    "207,37 €", "186,05 €", "203,20 €", "166,67 €"], 0,
    "43 anuitet (od 6. do 48. meseca), r = ¹²√1,05; ekvivalenca na konec 4. leta: x·(r⁴³ − 1)/(r − 1) = 8.000·r⁴⁸ → x = 207,37 €. (203,20 € bi plačevali brez odloga.)")),
  withId('q1t4o6qa', Q("Kredit 8.000 € (5 % letno, konformno mesečno) odplačujemo z 43 mesečnimi obroki od 6. do 48. meseca po najemu. Mesečni obrok je 150 €, preostanek poravnamo z zadnjim obrokom. Koliko znaša zadnje plačilo?", [
    "2.840,19 €", "1.700,00 €", "2.990,19 €", "150,00 €"], 0,
    "Zadnje plačilo = vrednost dolga na koncu 48. meseca − vrednost 42 obrokov po 150 € na isti dan: y = 8.000·r⁴⁸ − 150·Σ r^(48 − k), k = 6…47 = 2.840,19 €. (1.700,00 € je izračun brez obresti.)")),
  withId('q1toz1yv', Q("3 leta na začetku vsakega četrtletja vplačujemo po 1.200 €; nato 4 leta prejemamo polletno rento na začetku polletja, prvo 5 let po prvem pologu. 2 % letno, relativno četrtletno obrestovanje. Kolikšna je renta?", [
    "2.003,52 €", "1.800,00 €", "1.964,24 €", "900,00 €"], 0,
    "r = 1,005 (četrtletno). Pologi v četrtletjih 0…11, rente v četrtletjih 20, 22, …, 34 (8 rent). Ekvivalenca: 1.200·Σ r^(−q) = x·Σ r^(−q) → x = 2.003,52 €. (1.800 € = 14.400/8 brez obresti.)")),
  withId('q19gcdey', Q("Banka A: 2,4 % letno, mesečna kapitalizacija z relativno obrestno mero. V začetku februarja, marca in aprila vložimo po 1.500 €. Kolikšno je stanje v začetku decembra?", [
    "4.581,66 €", "4.500,00 €", "4.608,00 €", "4.590,82 €"], 0,
    "r = 1 + 0,024/12 = 1,002; vloge se obrestujejo 10, 9 in 8 mesecev: G = 1.500·(r¹⁰ + r⁹ + r⁸) = 4.581,66 €.")),
  withId('q1xtjlgs', Q("Banka B uporablja navadno obrestovanje po 3 % letno. Koliko moramo vložiti v začetku februarja, marca in aprila (enak znesek), da imamo v začetku decembra 4.581,66 €?", [
    "1.493,61 €", "1.500,00 €", "1.527,22 €", "1.482,74 €"], 0,
    "Navadne obresti: G = b·(1 + 10·3/1200) + b·(1 + 9·3/1200) + b·(1 + 8·3/1200) = b·(3 + 27·3/1200) = 3,0675·b → b = 1.493,61 €.")),
  withId('qoeyrty', Q("60.000 € vložimo danes; letna renta, prva čez 10 let, izplačana 15-krat; 4 % letno, dekurzivno. Kolikšna je renta?", [
    "7.680,85 €", "4.000,00 €", "5.396,47 €", "3.415,95 €"], 0,
    "Ekvivalenca na čas zadnje rente (24 let): G·r²⁴ = a·(r¹⁵ − 1)/(r − 1) → a = 60.000·1,04²⁴·0,04/(1,04¹⁵ − 1) = 7.680,85 €. (5.396,47 € bi bila renta brez odloga.)")),
  withId('q1cbpug5', Q("60.000 € vložimo danes; VEČNA letna renta, prva čez 10 let; 4 % letno. Kolikšna je renta?", [
    "3.415,95 €", "2.400,00 €", "3.552,59 €", "7.680,85 €"], 0,
    "Glavnica je čez 9 let vredna G·r⁹; večna renta (prva leto kasneje) je enaka letnim obrestim od nje: a = 60.000·1,04⁹·0,04 = 3.415,95 €. (2.400 € bi dobili, če bi renta tekla takoj.)")),
  withId('qi5oi22', Q("Ana 3 leta na začetku vsakega meseca vlaga po 150 €, Bor 3 leta na koncu vsakega četrtletja po 451 €; 2,4 % letno, relativno mesečno. Kdo ima po 4 letih več?", [
    "Ana: 5.740,54 € proti 5.730,35 €", "Bor: 5.740,54 € proti 5.730,35 €", "Oba enako, 5.400 €", "Bor, ker vplača 5.412 € proti 5.400 €"], 0,
    "r = 1,002. Ana: 150·r¹³·(r³⁶ − 1)/(r − 1) = 5.740,54 €; Bor: 451·r¹²·(r³⁶ − 1)/(r³ − 1) = 5.730,35 €. Ana vplača malo manj, a prej in pogosteje.")),
  withId('q138693i', Q("Kredit 600.000 € odplačamo v 8 enakih polletnih obrokih, prvi pol leta po najemu; 4 % letno, relativno četrtletno obrestovanje. Kolikšen je obrok?", [
    "81.941,18 €", "75.000,00 €", "81.905,88 €", "81.000,00 €"], 0,
    "r = 1,01 (četrtletno); G·r¹⁶ = x·(r¹⁶ − 1)/(r² − 1) → x = 81.941,18 €.")),
  withId('q1kf0hac', Q("Kredit 600.000 € odplačamo v 8 enakih polletnih obrokih; 4 % letno, relativno četrtletno obrestovanje, a prvi obrok šele 2 leti po najemu. Kolikšen je obrok?", [
    "86.982,22 €", "81.941,18 €", "85.218,83 €", "90.000,00 €"], 0,
    "Obroki v četrtletjih 8, 10, …, 22; ekvivalenca na čas zadnjega obroka: G·r²² = y·(r¹⁶ − 1)/(r² − 1) → y = 86.982,22 €. Odlog podraži obrok, ker dolg ob odlogu raste.")),
];

const verjetnost = [
  withId('q1bhmyai', { q: "Jan reši uganko z verjetnostjo 0,7. Zala dobi namig z verjetnostjo 0,4; z namigom uganko reši z verjetnostjo 0,9, brez namiga z 0,3. Jan in Zala rešujeta neodvisno. Kolikšna je verjetnost, da uganko rešita oba?",
      options: ["0,378","0,630","0,210","0,862"],
      correct: 0,
      explanation: "Popolna verjetnost: P(Zala reši) = 0,4·0,9 + 0,6·0,3 = 0,54. Oba: 0,7·0,54 = 0,378. (0,630 in 0,210 upoštevata le en primer namiga, 0,862 je verjetnost, da reši vsaj eden.)" }),
  withId('q1jik4cb', { q: "Jan reši uganko z verjetnostjo 0,7. Zala dobi namig z verjetnostjo 0,4; z namigom uganko reši z verjetnostjo 0,9, brez namiga z 0,3. Jan in Zala rešujeta neodvisno. Kolikšna je verjetnost, da uganko reši natanko eden od njiju?",
      options: ["0,484","0,322","0,162","0,622"],
      correct: 0,
      explanation: "P(Zala reši) = 0,54. Natanko eden: 0,7·0,46 + 0,3·0,54 = 0,322 + 0,162 = 0,484. (0,622 = 1 − P(oba) vključuje tudi primer, ko ne reši nihče.)" }),
  withId('q7p24k3', { q: "Jan reši uganko z verjetnostjo 0,7. Zala dobi namig z verjetnostjo 0,4; z namigom uganko reši z verjetnostjo 0,9, brez namiga z 0,3. Jan in Zala rešujeta neodvisno. Znano je, da je uganko rešil vsaj eden. Kolikšna je verjetnost, da sta jo rešila oba?",
      options: ["≈ 0,439","≈ 0,378","≈ 0,781","≈ 0,561"],
      correct: 0,
      explanation: "P(oba) = 0,378, P(vsaj eden) = 1 − 0,3·0,46 = 0,862. P(oba | vsaj eden) = 0,378/0,862 ≈ 0,439. (0,781 deli z verjetnostjo »natanko eden«, 0,561 je P(natanko eden | vsaj eden).)" }),
  withId('q1ayg2z0', { q: "Jan reši uganko z verjetnostjo 0,7. Zala dobi namig z verjetnostjo 0,4; z namigom uganko reši z verjetnostjo 0,9, brez namiga z 0,3. Jan in Zala rešujeta neodvisno. Znano je, da je uganko rešil natanko eden. Kolikšna je verjetnost, da je Zala dobila namig?",
      options: ["≈ 0,281","≈ 0,400","≈ 0,223","≈ 0,667"],
      correct: 0,
      explanation: "Namig in natanko eden: Jan reši, Zala z namigom ne (0,7·0,4·0,1 = 0,028) ali Jan ne, Zala z namigom reši (0,3·0,4·0,9 = 0,108). Skupaj 0,136; P(natanko eden) = 0,484 → 0,136/0,484 ≈ 0,281. (0,400 je verjetnost namiga brez pogoja, 0,667 = P(namig | Zala reši).)" }),
  withId('q1sfwshh', Q("Pošten kovanec: pri cifri iz posode (4 bele, 2 rdeči) izžrebamo 2 kroglici, pri grbu 3 kroglice. X = število rdečih. Kakšna je verjetnostna shema in E(X)?", [
    "P(0) = 3/10, P(1) = 17/30, P(2) = 2/15; E(X) = 5/6", "P(0) = 2/5, P(1) = 8/15, P(2) = 1/15; E(X) = 2/3", "P(0) = 1/5, P(1) = 3/5, P(2) = 1/5; E(X) = 1", "P(0) = P(1) = P(2) = 1/3; E(X) = 1"], 0,
    "Popolna verjetnost: P(X = k) = ½·P(k | 2 kroglici) + ½·P(k | 3 kroglice), hipergeometrijsko npr. P(X = 0) = ½·C(4,2)/C(6,2) + ½·C(4,3)/C(6,3) = 3/10. E = 5/6. (Druga in tretja možnost upoštevata le en izid kovanca.)")),
  withId('q181u5fl', Q("Pet sodelavcev: eden zboli z verjetnostjo 1/2, štirje vsak z 1/4, neodvisno. Z = število obolelih. Koliko sta P(Z = 0) in E(Z)?", [
    "P(Z = 0) = 81/512; E(Z) = 3/2", "P(Z = 0) = 243/1024; E(Z) = 5/4", "P(Z = 0) = 1/1024; E(Z) = 5/2", "P(Z = 0) = 81/512; E(Z) = 5/2"], 0,
    "P(Z = 0) = (1/2)·(3/4)⁴ = 81/512. E(Z) = vsota verjetnosti obolenja = 1/2 + 4·1/4 = 3/2. Shema: 81/512, 189/512, 81/256, 33/256, 13/512, 1/512.")),
  withId('q4hunoj', Q("Z ima shemo P(0) = 81/512, P(1) = 189/512, P(2) = 81/256, … Kolikšna je verjetnost, da zbolita natanko dva, če vemo, da zboli vsaj eden?", [
    "162/431", "81/256", "189/431", "81/121"], 0,
    "P(Z = 2 | Z ≥ 1) = P(Z = 2)/(1 − P(Z = 0)) = 81/256 / 431/512 = 162/431.")),
  withId('q1kta4xg', Q("Posode: (2 beli, 1 rdeča), (1 rdeča, 3 modre), (1 bela, 3 modre); iz vsake izvlečemo eno kroglico. X = število rdečih. Kakšna je verjetnostna shema?", [
    "P(0) = 1/2, P(1) = 5/12, P(2) = 1/12", "P(0) = 1/12, P(1) = 5/12, P(2) = 1/2", "P(0) = 1/3, P(1) = 1/3, P(2) = 1/3", "P(0) = 1/4, P(1) = 1/2, P(2) = 1/4"], 0,
    "Rdeča je lahko le iz 1. (p = 1/3) in 2. posode (p = 1/4): P(0) = 2/3·3/4 = 1/2; P(2) = 1/3·1/4 = 1/12; P(1) = 1 − 1/2 − 1/12 = 5/12.")),
  withId('q9ghbue', Q("X: P(0) = 1/2, P(1) = 5/12, P(2) = 1/12. Koliko so P(X = 2 | X ≥ 1), E(X) in σ(X)?", [
    "P = 1/6; E(X) = 7/12; σ = √59/12 ≈ 0,64", "P = 1/12; E(X) = 7/12; σ = 59/144", "P = 1/6; E(X) = 1; σ = √59/12", "P = 1/2; E(X) = 7/12; σ ≈ 0,41"], 0,
    "P = (1/12)/(1/2) = 1/6. E = 5/12 + 2/12 = 7/12. D = E(X²) − E(X)² = 9/12 − 49/144 = 59/144 → σ = √59/12.")),
  withId('qkv0nyc', Q("Nina reče DA z verjetnostjo 0,6, Eva z 0,4 (neodvisno). Rok reče DA, če rečeta DA obe, NE, če obe rečeta NE, sicer DA z verjetnostjo 0,5. Vsak, ki reče DA, dobi sladoled. X = število sladoledov. Kolikšen je E(X)?", [
    "1,50", "1,24", "1,00", "1,76"], 0,
    "Natanko ena od deklet reče DA z verjetnostjo 0,6·0,6 + 0,4·0,4 = 0,52. P(3) = 0,24; P(2) = 0,52·0,5 = 0,26; P(1) = 0,52·0,5 = 0,26; P(0) = 0,24. E = 0,72 + 0,52 + 0,26 = 1,50. Hitreje: E = 0,6 + 0,4 + P(Rok DA) = 1 + 0,24 + 0,26.")),
  withId('q67n711', Q("Tina se za pomivanje javi z verjetnostjo 0,5, Luka z 0,8 (neodvisno). Če se javita oba, mama vsakega izbere z verjetnostjo 0,5. Kolikšna je verjetnost, da pomiva Tina?", [
    "0,30", "0,50", "0,10", "0,20"], 0,
    "P(Tina) = P(samo Tina) + P(oba)·0,5 = 0,5·0,2 + 0,5·0,8·0,5 = 0,10 + 0,20 = 0,30.")),
  withId('q1w61m9j', Q("Tina 0,5, Luka 0,8; posodo je nekdo pomil. Kolikšna je verjetnost, da jo je pomila Tina?", [
    "≈ 0,333", "≈ 0,300", "≈ 0,500", "≈ 0,100"], 0,
    "P(nihče) = 0,5·0,2 = 0,1. P(Tina | pomito) = 0,30/0,90 = 1/3.")),
];

const more = require('./mat-izpiti2');

module.exports = {
  id: 'mat',
  parts: [
    { id: 'k1', decks: [
      { id: 'mat-stari-funkcije', name: 'V slogu izpita: funkcije, odvodi, integrali (z rešitvami)', calc: true, questions: [...funkcije, ...more.funkcije] },
      { id: 'mat-stari-financna', name: 'V slogu izpita: finančna matematika (z rešitvami)', calc: true, questions: [...financna, ...more.financna] },
    ] },
    { id: 'k2', decks: [
      { id: 'mat-stari-matrike', name: 'V slogu izpita: sistemi in determinante (z rešitvami)', calc: true, questions: [...matrike, ...more.matrike] },
      { id: 'mat-stari-verjetnost', name: 'V slogu izpita: verjetnost in slučajne spremenljivke (z rešitvami)', calc: true, questions: [...verjetnost, ...more.verjetnost] },
    ] },
  ],
};
