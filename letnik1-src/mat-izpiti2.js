/* Matematika - naloge v slogu izpita, 2. del. Vključi jih mat-izpiti.js. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const funkcije = [
  Q("f(x) = ln(x² + 2x + 3). Definicijsko območje, ničle in ekstrem?", [
    "D = ℝ; ničel ni; minimum v (−1, ln 2 ≈ 0,69)", "D = ℝ; ničli x = 0 in x = −2; minimum v (−1, ln 2)", "D = (−3, 1); maksimum v (−1, ln 2)", "D = ℝ; ničla x = −1; minimum v (−1, 0)"], 0,
    "Diskriminanta x² + 2x + 3 je 4 − 12 < 0 → izraz je vedno pozitiven → D = ℝ. x² + 2x + 3 = 1 nima realnih rešitev → ničel ni. f′ = (2x + 2)/(x² + 2x + 3) = 0 → x = −1."),
  Q("f(x) = (x² + x − 6)/(x + 1). Asimptota, ekstremi in tangenta v x = 0?", [
    "y = x; ekstremov ni; tangenta y = 7x − 6", "y = x + 1; ekstremov ni; tangenta y = 7x − 6", "y = x; maksimum (−3, 0), minimum (2, 0); tangenta y = −6x + 7", "y = x − 6; ekstremov ni; tangenta y = x − 6"], 0,
    "Deljenje da x, ostanek −6 → asimptota y = x. f′ = (x² + 2x + 7)/(x + 1)² > 0 (diskriminanta < 0) → funkcija narašča, ekstremov ni. f(0) = −6, f′(0) = 7."),
  Q("f(x) = eˣ·(x² − 6x + 9). Ekstrema in limiti?", [
    "Maksimum (1, 4e ≈ 10,87), minimum (3, 0); x → ∞: f → ∞, x → −∞: f → 0", "Minimum (1, 4e), maksimum (3, 0); x → ∞: f → ∞, x → −∞: f → 0", "Maksimum (1, 4e), minimum (3, 0); x → ∞: f → 0, x → −∞: f → ∞", "Samo minimum (3, 0); x → ±∞: f → ∞"], 0,
    "f = eˣ(x − 3)²; f′ = eˣ(x − 3)(x − 1) = 0 → x = 1, 3. Narašča do 1, pada do 3, nato narašča → maksimum v 1, minimum v 3 (dvojna ničla)."),
  Q("f(x, y) = 2·ln x + y² − 2xy. Katere so stacionarne točke in kakšne vrste so?", [
    "Edina stacionarna točka (1, 1) je sedlo", "Edina stacionarna točka (1, 1) je minimum", "Stacionarni točki sta (1, 1) in (−1, −1); prva je maksimum", "Stacionarnih točk ni"], 0,
    "f_y = 2y − 2x = 0 → y = x; f_x = 2/x − 2y = 0 → x² = 1 → x = 1 (x > 0 zaradi ln). f_xx = −2, f_yy = 2, f_xy = −2 → H = −4 − 4 = −8 < 0 → sedlo."),
  Q("f(x, y) = x²y + x² + 2y² − 8y. Kakšne vrste sta stacionarni točki A(0, 2) in B(2√3, −1)?", [
    "A je minimum, B je sedlo", "A je maksimum, B je minimum", "A je sedlo, B je minimum", "Obe sta minimuma"], 0,
    "f_xx = 2y + 2, f_yy = 4, f_xy = 2x; H = 4(2y + 2) − 4x². H(A) = 24 > 0 in f_xx(A) = 6 > 0 → minimum; H(B) = 0 − 48 < 0 → sedlo."),
  Q("y = x·e^(x² − 4x + 1). Kakšna je elastičnost funkcije in njena vrednost pri x = 3?", [
    "E = 2x² − 4x + 1; E(3) = 7: če x povečamo za 1 %, y zraste za ≈ 7 % (elastična)", "E = 2x² − 4x + 1; E(3) = −7: če x povečamo za 1 %, y pade za ≈ 7 % (elastična)", "E = x² − 4x + 1; E(3) = −2: če x povečamo za 1 %, y pade za ≈ 2 % (elastična)", "E = 2x − 4; E(3) = 2: če x povečamo za 1 %, y zraste za ≈ 2 % (elastična)"], 0,
    "E = x·y′/y = 1 + x(2x − 4) = 2x² − 4x + 1. E(3) = 18 − 12 + 1 = 7 > 1 → elastična."),
  Q("f(x) = √x·e^(−x/4). Definicijsko območje, ekstrem in zaloga vrednosti?", [
    "D = [0, ∞); maksimum (2, √2/√e ≈ 0,86); Z = [0, √2/√e]", "D = ℝ; maksimum (2, √2/√e); Z = (−∞, √2/√e]", "D = (0, ∞); minimum (2, √2/√e); Z = [√2/√e, ∞)", "D = [0, ∞); maksimum (4, 2/e ≈ 0,74); Z = [0, 2/e]"], 0,
    "f′ = e^(−x/4)·(1/(2√x) − √x/4) = 0 → x = 2. Narašča na (0, 2), pada naprej; (0, 0) je robni minimum; x → ∞: f → 0."),
  Q("f(x, y) = ln(xy + 3y); f_x(1, 2) = 1/4, f_y(1, 2) = 1/2. Kako ocenimo spremembo f, če x povečamo za 0,2 in y zmanjšamo za 0,3?", [
    "Δf ≈ ¼·0,2 + ½·(−0,3) = −0,10", "Δf ≈ ¼·0,2 − ½·(−0,3) = 0,20", "Δf ≈ ¼·(−0,3) + ½·0,2 = 0,025", "Δf ≈ (0,2 − 0,3)/4 = −0,025"], 0,
    "Totalni diferencial: Δf ≈ f_x·Δx + f_y·Δy = 0,05 − 0,15 = −0,10."),
  Q("f(x) = x²·(2 − ln x). Ničla, ekstrem in prevoj?", [
    "Ničla x = e² ≈ 7,39; maksimum (e^(3/2), e³/2 ≈ 10,04); prevoj (√e, 3e/2 ≈ 4,08)", "Ničla x = e²; minimum (e^(3/2), e³/2); prevoj (√e, 3e/2)", "Ničli x = 0 in x = e²; maksimum (√e, 3e/2); prevoj (e^(3/2), e³/2)", "Ničla x = 2; maksimum (e, e²); prevoja ni"], 0,
    "f′ = x(3 − 2 ln x) = 0 → x = e^(3/2); f″ = 1 − 2 ln x: f″(e^(3/2)) = −2 < 0 (maksimum), f″ = 0 pri x = √e (prevoj). x = 0 ni v D; lim x→∞ f = −∞."),
  Q("Povpraševanje D(p) = (p + 4)·e⁻ᵖ. Kolikšna je elastičnost pri ceni 2 EUR in pri kateri ceni je povpraševanje usklajeno elastično?", [
    "E(2) = −5/3 (elastično); usklajeno elastično pri p ≈ 1,24 EUR", "E(2) = −3/5 (neelastično); usklajeno elastično pri p ≈ 1,24 EUR", "E(2) = −5/3 (elastično); usklajeno elastično pri p = 2 EUR", "E(2) = −2 (elastično); usklajeno elastično pri p = 1 EUR"], 0,
    "D′ = −(p + 3)e⁻ᵖ; E = −p(p + 3)/(p + 4). E(2) = −10/6 = −5/3. E = −1 → p² + 2p − 4 = 0 → p = −1 + √5."),
  Q("Povpraševanje D(p) = (2p + 5)·e^(2 − p). Elastičnost pri p = 1 in cena usklajene elastičnosti?", [
    "E(1) = −5/7 (neelastično); usklajeno elastično pri p ≈ 1,35 EUR", "E(1) = −7/5 (elastično); usklajeno elastično pri p ≈ 1,35 EUR", "E(1) = −5/7 (neelastično); usklajeno elastično pri p = 1 EUR", "E(1) = −1 (usklajeno elastično pri p = 1)"], 0,
    "D′ = −(2p + 3)e^(2 − p); E = −p(2p + 3)/(2p + 5). |E| = 1 → 2p² + p − 5 = 0 → p = (−1 + √41)/4."),
  Q("f(x) = ln x / x². Definicijsko območje, ničla in ekstrem?", [
    "D = (0, ∞); ničla x = 1; maksimum (√e, 1/(2e) ≈ 0,18)", "D = (0, ∞); ničla x = 1; minimum (√e, 1/(2e))", "D = ℝ \\ {0}; ničla x = 0; maksimum (e, 1/e²)", "D = (1, ∞); pol x = 1; minimum (e, 1/e²)"], 0,
    "f′ = (1 − 2 ln x)/x³ = 0 → x = √e, f(√e) = (1/2)/e. Narašča na (0, √e), pada naprej → maksimum. x → 0⁺: f → −∞; x → ∞: f → 0."),
  Q("Taylorjeva vrsta f(x) = (x + 2)·ln(x + 1) okrog x₀ = 0 do člena s tretjim odvodom?", [
    "2x + x³/6 + …", "2x − x² + (2/3)x³ + …", "x + x²/2 + x³/6 + …", "2 + 2x + x³/6 + …"], 0,
    "f(0) = 0, f′(0) = 2, f″(0) = 0, f‴(0) = 1 → 2x + x³/3! = 2x + x³/6."),
  Q("f(x) = 2/(eˣ + 2e⁻ˣ). Ekstrem in limiti?", [
    "Maksimum (ln 2/2 ≈ 0,35; 1/√2 ≈ 0,71); x → ±∞: f → 0", "Minimum (ln 2/2 ≈ 0,35; 1/√2 ≈ 0,71); x → ±∞: f → ∞", "Maksimum (0, 2/3); x → ±∞: f → 0", "Ekstremov ni; x → ∞: f → 0, x → −∞: f → 1"], 0,
    "f′ = −2(eˣ − 2e⁻ˣ)/(eˣ + 2e⁻ˣ)² = 0 → e²ˣ = 2 → x = ln 2/2; f = 2/(√2 + √2) = 1/√2. Pred tem narašča, potem pada. Ničel ni."),
  Q("TR(K, L) = KL + 10K + 18L, TC(K, L) = K² + L² + 2K + 4L + 30. Pri katerih K in L je dobiček največji in kolikšen je?", [
    "K = 10, L = 12; dobiček 94", "K = 12, L = 10; dobiček 94", "K = 8, L = 14; dobiček 90", "K = 10, L = 12; dobiček 124"], 0,
    "π = KL − K² − L² + 8K + 14L − 30; π_K = L − 2K + 8 = 0, π_L = K − 2L + 14 = 0 → K = 10, L = 12; π = 94. Hessejeva determinanta 4 − 1 = 3 > 0, π_KK < 0 → maksimum."),
  Q("f(x) = 3 − 2·ln x/x. Ekstrem in ∫₁ᵉ f(x) dx?", [
    "Minimum (e, 3 − 2/e ≈ 2,26); integral 3e − 4 ≈ 4,15", "Maksimum (e, 3 − 2/e ≈ 2,26); integral 3e − 1 ≈ 7,15", "Minimum (1, 3); integral 3e − 3 ≈ 5,15", "Minimum (e, 2,26); integral 1"], 0,
    "f′ = 2(ln x − 1)/x² = 0 → x = e, f″(e) > 0. ∫(3 − 2 ln x/x) dx = 3x − (ln x)² + C; od 1 do e: (3e − 1) − 3 = 3e − 4."),
  Q("f(x) = (x + 2)·e^(−x²/6). Ničla in ekstrema?", [
    "Ničla x = −2; minimum (−3, −e^(−3/2) ≈ -0,22), maksimum (1, 3e^(−1/6) ≈ 2,54)", "Ničla x = 2; maksimum (−3, −e^(−3/2)), minimum (1, 3e^(−1/6))", "Ničla x = −2; minimum (−2, 0), maksimum (0, 2); prevojev ni", "Ničel ni; maksimum (0, 2), minimum (−3, -0,22); limiti sta ∞"], 0,
    "f′ = e^(−x²/6)·(1 − x(x + 2)/3) = −(x + 3)(x − 1)/3·e^(−x²/6) = 0 → x = −3 ali 1. Narašča na (−3, 1); limiti v ±∞ sta 0."),
  Q("f(x) = (x + 1)/√(x² + 3). Ekstrem, limiti in zaloga vrednosti?", [
    "Maksimum (3, 2/√3 ≈ 1,15); x → ∞: f → 1, x → −∞: f → −1; Z = (−1, 2/√3]", "Minimum (3, 2/√3 ≈ 1,15); x → ±∞: f → 0; Z = [2/√3, ∞)", "Maksimum (−1, 0); x → ∞: f → 1, x → −∞: f → −1; Z = (−1, 1)", "Ekstremov ni; x → ∞: f → 1, x → −∞: f → −1; Z = (−1, 1)"], 0,
    "f′ = (3 − x)/(x² + 3)^(3/2) = 0 → x = 3, f(3) = 4/√12 = 2/√3. Ničla x = −1, polov ni, f(0) = 1/√3."),
  Q("f(x) = eˣ/(2 − x). Pol, ekstrem in limiti?", [
    "Pol x = 2; maksimum (3, −e³ ≈ -20,09); x → −∞: f → 0, x → ∞: f → −∞", "Pol x = 2; minimum (3, −e³); x → −∞: f → −∞, x → ∞: f → 0", "Pol x = −2; maksimum (0, ½); x → −∞: f → 0, x → ∞: f → ∞", "Polov ni; maksimum (3, e³); x → ±∞: f → 0"], 0,
    "f′ = eˣ(3 − x)/(2 − x)² = 0 → x = 3; f″(3) < 0 → maksimum, f(3) = e³/(−1). Za x > 2 je f < 0."),
  Q("f(x) = x³/ln x, x₀ = e. Kolikšni sta mejna vrednost in koeficient elastičnosti pri x₀?", [
    "f′(e) = 2e² ≈ 14,78; E = 2 → če x zmanjšamo za 3 %, f pade za ≈ 6 %", "f′(e) = 2; E = 2e² → če x zmanjšamo za 3 %, f pade za ≈ 44,3 %", "f′(e) = 2e²; E = 0,5 → če x zmanjšamo za 3 %, f pade za ≈ 1,5 %", "f′(e) = e²; E = 1 → če x zmanjšamo za 3 %, f pade za ≈ 3 %"], 0,
    "f′ = x²(3 ln x − 1)/(ln x)² → f′(e) = 2e². E = x·f′/f = (3 ln x − 1)/ln x → E(e) = 2. Relativna sprememba ≈ E · (−3 %) = −6 %."),
  Q("Investicija: danes 20.000 €, čez 2 leti še 8.000 €; 5 enakih donosov na koncu 4. do 8. leta; 4 % letno. Kolikšni donosi dajo NSV = 0 in kolikšna je takrat interna stopnja donosnosti?", [
    "Donosi 6.922,40 €; IRR = 4 %", "Donosi 5.600,00 €; IRR = 4 %", "Donosi 6.922,40 €; IRR = 0 %", "Donosi 6.000,00 €; IRR = 8 %"], 0,
    "NSV = −20.000 − 8.000/1,04² + x·(1,04⁵ − 1)/(1,04⁸·0,04) = 0 → x = 6.922,40 €. Pri NSV = 0 je IRR enaka uporabljeni obrestni meri. (5.600 = 28.000/5 brez obresti.)"),
];

const matrike = [
  Q("A = [[0,0,0],[1,0,0],[3,1,0]], B = [[2,0,1],[1,1,0],[0,1,1]]. Kakšna je rešitev matrične enačbe X = XA + B?", [
    "X = B(E − A)⁻¹ = [[6,1,1],[2,1,0],[5,2,1]]", "X = (E − A)⁻¹B = [[2,0,1],[3,1,1],[9,2,5]]", "X = B(E + A)⁻¹ = [[0,−1,1],[0,1,0],[−3,0,1]]", "X = BA = [[3,1,0],[1,0,0],[4,1,0]]"], 0,
    "X − XA = B → X(E − A) = B → X = B(E − A)⁻¹; (E − A)⁻¹ = [[1,0,0],[1,1,0],[4,1,1]]. Matrično množenje ni komutativno, zato vrstni red šteje."),
  Q("Sistem x₁ + x₂ + 2x₃ + x₄ = 1, 2x₁ + x₂ + x₃ + 2x₄ = 2, x₁ − x₃ + 3x₄ = −1. Kakšna je rešitev?", [
    "Enoparametrična: x₁ = 2 + x₃, x₂ = −3x₃, x₄ = −1", "Natanko ena: x₁ = 2, x₂ = 0, x₃ = 0, x₄ = −1", "Sistem ni rešljiv", "Dvoparametrična: x₁ = 2 + x₃, x₂, x₃ ∈ ℝ"], 0,
    "Rang 3, 4 neznanke → parameter x₃ (v 3. stolpcu ni pivota); kanonična oblika: x₁ − x₃ = 2, x₂ + 3x₃ = 0, x₄ = −1."),
  Q("Kaj je inverz matrike A = [[1,2,1],[2,5,3],[1,0,−2]]?", [
    "[[10,−4,−1],[−7,3,1],[5,−2,−1]]", "[[10,−7,5],[−4,3,−2],[−1,1,−1]]", "[[−10,4,1],[7,−3,−1],[−5,2,1]]", "Matrika ni obrnljiva (det A = 0)"], 0,
    "det A = −1 ≠ 0. Gauss-Jordan: [A | E] → [E | A⁻¹]. Preverba: A·A⁻¹ = E. (Druga možnost je transponirani inverz.)"),
  Q("Sistem x + y + 2z = 3, 2x − 3y + z = 8, −x + 2y + 3z = −1, 3x + y − z = 4. Kakšna je rešitev?", [
    "Natanko ena: x = 2, y = −1, z = 1", "Enoparametrična: x = 2 − z, y = −z, z ∈ ℝ", "Sistem ni rešljiv (4 enačbe, 3 neznanke)", "Natanko ena: x = 2, y = 1, z = −1"], 0,
    "Štiri enačbe, a rang matrike sistema in razširjene matrike je 3 = število neznank → enolična rešitev. Več enačb kot neznank še ne pomeni nerešljivosti."),
  Q("Sistem u + v + x − 2y = 0, 2u + v = 5, u − v + 2x + y = −5. Kakšna je rešitev?", [
    "Enoparametrična (y): u = 2 − y, v = 2y + 1, x = y − 3", "Natanko ena: u = 2, v = 1, x = −3, y = 0", "Sistem ni rešljiv", "Dvoparametrična (x, y)"], 0,
    "Rang 3, 4 neznanke; v stolpcu y ni pivota → y je parameter."),
  Q("Sistem x + y + z + t = 1, x − y + 2t = 2, y − z + t = 0, 2x + y + 4t = a. Za kateri a je rešljiv in kakšna je rešitev?", [
    "a = 3; enoparametrična rešitev", "a = −3; enolična rešitev", "a = 0; dvoparametrična rešitev", "Za vsak a; enoparametrična rešitev"], 0,
    "Vsota prvih treh enačb je 2x + y + 4t = 3, zato je 4. enačba skladna le pri a = 3 (sicer rang razširjene matrike 4 > 3). Rang 3, 4 neznanke → en parameter."),
  Q("Homogeni sistem x + y − z = 0, 2x − y − 5z + t = 0, x − 2z + 3t = 0. Kakšna je rešitev?", [
    "z ∈ ℝ: x = 2z, y = −z, t = 0", "Samo trivialna rešitev", "z ∈ ℝ: x = −2z, y = z, t = 0", "t ∈ ℝ: x = 2t, y = −t, z = 0"], 0,
    "Homogen sistem je vedno rešljiv; rang 3 < 4 neznanke → en parameter (z, brez pivota). Kanonična oblika: x − 2z = 0, y + z = 0, t = 0."),
  Q("A = [[3,1,0],[−2,1,0],[0,1,3]], B = [1,2,−1]. Kakšna je rešitev enačbe X·Aᵀ = 2X − B?", [
    "X = −B(Aᵀ − 2E)⁻¹ = [3,−4,5]", "X = B(Aᵀ − 2E)⁻¹ = [−3,4,−5]", "X = (2E − Aᵀ)⁻¹B = [1,2,−1]", "X = B(2E − A) = [3,2,1]"], 0,
    "XAᵀ − 2X = −B → X(Aᵀ − 2E) = −B → X = −B(Aᵀ − 2E)⁻¹; (Aᵀ − 2E)⁻¹ = [[−1,2,−2],[−1,1,−1],[0,0,1]]."),
  Q("A = [[1,0,0],[1,1,0],[3,1,1]]. Kakšna je rešitev enačbe A − X = A⁻¹X?", [
    "X = (A⁻¹ + E)⁻¹A = [[1/2,0,0],[3/4,1/2,0],[19/8,3/4,1/2]]", "X = A(A⁻¹ + E) = [[2,0,0],[1,2,0],[3,1,2]]", "X = A − A⁻¹ = [[0,0,0],[2,0,0],[5,2,0]]", "X = E"], 0,
    "A = A⁻¹X + X = (A⁻¹ + E)X → X = (A⁻¹ + E)⁻¹A. Enako: X = (A + E)⁻¹A²."),
  Q("Sistem x − y + 2z − u = 5, x − y − z + 2u = −1, 2x − 2y + z + u = a². Za kateri a je rešljiv in kakšna je rešitev?", [
    "a = ±2; dvoparametrična: x = 1 + y − u, z = 2 + u", "a = 2; enolična rešitev x = 1, y = 0, z = 2, u = 0", "a = 0; enoparametrična rešitev s parametrom u", "Za vsak a; dvoparametrična rešitev x = 1 + y − u, z = 2 + u"], 0,
    "3. enačba − 1. − 2. da (0 0 0 0 | a² − 4): rešljiv, ko je a² = 4. Rang 2, 4 neznanke → parametra y in u."),
  Q("A = [[2,1],[1,1]], B = [[1,0,2],[−1,1,0]]. Kakšna je rešitev enačbe 3XA = Bᵀ + XA⁻¹?", [
    "X = Bᵀ(3A − A⁻¹)⁻¹ = [[−5/11,9/11],[4/11,−5/11],[−2/11,8/11]]", "X = (3A − A⁻¹)⁻¹Bᵀ (ni definirano: 2×2 · 3×2)", "X = Bᵀ(3A + A⁻¹)⁻¹ = [[7/31,−9/31],[−2/31,7/31],[10/31,−4/31]]", "X = Bᵀ·A/3 = [[1/3,0],[1/3,1/3],[4/3,2/3]]"], 0,
    "X(3A − A⁻¹) = Bᵀ. A⁻¹ = [[1,−1],[−1,2]], 3A − A⁻¹ = [[5,4],[4,1]], det = −11. Množimo z desne z inverzom."),
  Q("Homogeni sistem x + y − 5z = 0, 2x − y − 4z + u = 0, x − 3z + 3u = 0. Kakšna je rešitev?", [
    "z ∈ ℝ: x = 3z, y = 2z, u = 0", "Samo trivialna rešitev x = y = z = u = 0", "z ∈ ℝ: x = −3z, y = −2z, u = 0", "u ∈ ℝ: x = 3u, y = 2u, z = 0"], 0,
    "r(A) = 3 < 4 → ena prosta neznanka (z); kanonična oblika: x − 3z = 0, y − 2z = 0, u = 0."),
];

const financna = [
  Q("Renta je danes vredna 80.000 €; 4 % letno, konformno mesečno; izplačila mesečno na začetku meseca, prvo čez 4 leta, 96 obrokov. Kolikšna je mesečna renta?", [
    "1.133,96 €", "833,33 €", "305,39 €", "972,48 €"], 0,
    "r = ¹²√1,04. Ekvivalenca na čas zadnjega izplačila (143. mesec): G·r¹⁴³ = a·(r⁹⁶ − 1)/(r − 1) → a = 1.133,96 €. (305,39 € bi bila večna renta s prvim izplačilom čez 4 leta.)"),
  Q("Kredit 9.000 € vrnemo v 10 enakih letnih obrokih, prvi čez eno leto, 4 % letno (letna kapitalizacija). Kolikšen je obrok?", [
    "1.109,62 €", "900,00 €", "1.260,00 €", "1.154,00 €"], 0,
    "a = G·r¹⁰·(r − 1)/(r¹⁰ − 1) = 9.000·1,04¹⁰·0,04/(1,04¹⁰ − 1) = 1.109,62 €. (900 € = brez obresti.)"),
  Q("Investitor vloži 3 × 3.000 € (takoj, čez 1 in čez 2 leti) in dobi 8 × 1.500 € (od 4. do 11. leta); 4 % letno. Se mu naložba po kriteriju NSV splača?", [
    "Da, NSV ≈ +319,79 €", "Ne, NSV ≈ −319,79 €", "Da, NSV = +3.000 € (12.000 − 9.000)", "Ne, NSV = 0"], 0,
    "NSV = −3.000·(1 + r⁻¹ + r⁻²) + 1.500·Σ r⁻ᵗ, t = 4…11 = 319,79 € > 0, zato se splača."),
  Q("Stroj stane 30.000 €, uporabljamo ga 8 let; dobiček +5.000 € na koncu vsakega leta; servis 2.000 € na koncu 3. in 6. leta; 6 % letno. Se nakup po NSV splača?", [
    "Ne, NSV ≈ −2.040,19 €", "Da, NSV ≈ +2.040,19 €", "Da, NSV = +6.000 € (40.000 − 30.000 − 4.000)", "Ne, NSV = −4.000 €"], 0,
    "NSV = 5.000·Σ r⁻ᵗ (t = 1…8) − 30.000 − 2.000·(r⁻³ + r⁻⁶) = -2.040,19 €."),
  Q("Kredit 40.000 €, 96 mesečnih obrokov, prvi mesec po najemu, 3 % letno, konformno mesečno. Kolikšen je enak obrok?", [
    "468,45 €", "416,67 €", "612,54 €", "483,26 €"], 0,
    "a = G·r⁹⁶·(r − 1)/(r⁹⁶ − 1), r = ¹²√1,03 → 468,45 €. (416,67 € je brez obresti.)"),
  Q("Kredit 40.000 €, 3 % letno, konformno mesečno, 96 obrokov: prvih 48 enakih (b), zadnjih 48 pol manjših (b/2). Kolikšna sta obroka?", [
    "Prvih 48 po 612,54 €, zadnjih 48 po 306,27 €", "Prvih 48 po 468,45 €, zadnjih 48 po 234,22 €", "Prvih 48 po 673,79 €, zadnjih 48 po 336,90 €", "Prvih 48 po 555,56 €, zadnjih 48 po 277,78 €"], 0,
    "G·r⁹⁶ = b·(r⁴⁸ + ½)·(r⁴⁸ − 1)/(r − 1) → b = 612,54 €."),
  Q("Nika 24 mesecev na koncu vsakega meseca vplača 80 €; 1,2 % letno, relativno mesečno. Kolikšno je stanje po zadnjem pologu in kolikšen bi moral biti polog za 2.500 €?", [
    "1.942,24 €; za 2.500 € po 102,97 €", "1.920,00 €; za 2.500 € po 104,17 €", "1.942,24 €; za 2.500 € po 80,00 €", "1.965,55 €; za 2.500 € po 100,00 €"], 0,
    "r = 1,001; G = 80·(r²⁴ − 1)/(r − 1) = 1.942,24 €; x = 2.500·(r − 1)/(r²⁴ − 1) = 102,97 €."),
];

const verjetnost = [
  Q("Petra gre na 5 neodvisnih izpitov, vsakega naredi z verjetnostjo 1/4. Kolikšna je verjetnost, da naredi natanko dva?", [
    "135/512 ≈ 26,4 %", "53/512 ≈ 10,4 %", "47/128 ≈ 36,7 %", "1/16 ≈ 6,3 %"], 0,
    "Bernoulli: C(5,2)·(1/4)²·(3/4)³ = 10·27/1024 = 135/512."),
  Q("Petra (5 izpitov, p = 1/4) je naredila vsaj dva izpita. Kolikšna je verjetnost, da je naredila vsaj tri?", [
    "53/188 ≈ 28,2 %", "53/512 ≈ 10,4 %", "135/512 ≈ 26,4 %", "1/2 = 50 %"], 0,
    "P(≥3) = 53/512, P(≥2) = 47/128; P(≥3 | ≥2) = 53/188."),
  Q("Marko gre na 6 neodvisnih izpitov, vsakega naredi z verjetnostjo 1/3. T = število narejenih izpitov. Koliko sta E(T) in D(T)?", [
    "E(T) = 2, D(T) = 4/3", "E(T) = 2, D(T) = 2/3", "E(T) = 3, D(T) = 4/3", "E(T) = 2, D(T) = 2"], 0,
    "Binomska porazdelitev: E = np = 2, D = np(1 − p) = 6·1/3·2/3 = 4/3. P(T = 0) = (2/3)⁶ = 64/729."),
  Q("Maja pošlje prošnji dvema neodvisnima delodajalcema; povabilo na razgovor dobi z verjetnostjo 0,4, po razgovoru pa službo z 0,5. Kolikšna je verjetnost, da dobi službo?", [
    "0,36", "0,20", "0,40", "0,48"], 0,
    "Popolna verjetnost: P(en razgovor) = 0,48 → 0,5; P(dva razgovora) = 0,16 → 1 − 0,5² = 0,75; P = 0,48·0,5 + 0,16·0,75 = 0,36."),
  Q("Maja: povabilo pri vsakem od dveh delodajalcev z verjetnostjo 0,4 (neodvisno). Kolikšna je verjetnost dveh razgovorov, če vemo, da je povabljena na vsaj enega?", [
    "1/4 = 0,25", "0,16", "0,48", "0,64"], 0,
    "P(oba) = 0,16; P(vsaj en) = 1 − 0,36 = 0,64; 0,16/0,64 = 1/4."),
  Q("Loto 3/10: izžrebajo 3 od 10 števil, mi označimo 3. Kolikšni sta verjetnost glavnega dobitka in verjetnost vsaj enega zadetka?", [
    "Glavni dobitek 1/120; vsaj en zadetek 17/24", "Glavni dobitek 1/120; vsaj en zadetek 7/24", "Glavni dobitek 3/10; vsaj en zadetek 7/10", "Glavni dobitek 1/720; vsaj en zadetek 1/2"], 0,
    "C(10,3) = 120 enako verjetnih izidov. P(nobenega) = C(7,3)/120 = 35/120 → vsaj en zadetek 85/120 = 17/24."),
  Q("Dva bobna s kroglicami 1, 2, 3, 4, 5; iz vsakega izžrebamo eno. X = vsota. Koliko sta E(X) in P(X ≥ 8)?", [
    "E(X) = 6; P(X ≥ 8) = 6/25", "E(X) = 6; P(X ≥ 8) = 3/25", "E(X) = 5; P(X ≥ 8) = 6/25", "E(X) = 6; P(X ≥ 8) = 10/25"], 0,
    "25 enako verjetnih parov; E = 3 + 3 = 6. Vsota 8: 3 pari, 9: 2, 10: 1 → 6/25."),
  Q("Test ima 8 vprašanj s 4 možnimi odgovori, Gregor ugiba. Kolikšna je verjetnost, da pravilno odgovori na natanko 4, in verjetnost, da testa (≥ 4 pravilnih) ne opravi?", [
    "P(natanko 4) ≈ 8,65 %; P(ne opravi) ≈ 88,62 %", "P(natanko 4) = 50 %; P(ne opravi) = 50 %", "P(natanko 4) ≈ 0,39 %; P(ne opravi) ≈ 99 %", "P(natanko 4) ≈ 8,65 %; P(ne opravi) ≈ 11,38 %"], 0,
    "B(8, 1/4): P(4) = C(8,4)·(1/4)⁴·(3/4)⁴ = 2835/32768; P(0) + … + P(3) = 58077/65536."),
  Q("Dve rdeči in dve črni karti premešamo in zložimo v vrsto. X = število črnih kart med rdečima. Kakšna je verjetnostna shema in E(X)?", [
    "P(0) = 1/2, P(1) = 1/3, P(2) = 1/6; E(X) = 2/3", "P(0) = 1/6, P(1) = 1/3, P(2) = 1/2; E(X) = 4/3", "P(0) = P(1) = P(2) = 1/3; E(X) = 1", "P(0) = 1/4, P(1) = 1/2, P(2) = 1/4; E(X) = 1"], 0,
    "Rdeči karti zasedeta 2 od 4 mest: C(4,2) = 6 enako verjetnih razporedov. Sosednji mesti (X = 0): 3, razmak 1 (X = 1): 2, razmak 2 (X = 2): 1. E = 2/6 + 2/6 = 2/3."),
];

// id + prazni parts: add-letnik1-vsebina.js naloži vse .js v letnik1-src kot module
module.exports = { id: 'mat', parts: [], funkcije, financna, matrike, verjetnost };
