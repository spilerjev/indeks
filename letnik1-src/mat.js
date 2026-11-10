/* Matematika za poslovne in ekonomske vede (MPEV, 1. letnik, 1. semester 2025/26)
   Viri: predavanja (EF Zapiski: Matematika - predavanja), terminski plan 2025/26, kolokvij 9. 11. 2023 z rešitvami.
   1. kolokvij: funkcije, odvodi, elastičnost, funkcije dveh spremenljivk, integrali, finančna matematika.
   2. kolokvij: matrike, determinante, rang, sistemi, inverzna matrika, verjetnost. Izpit: + slučajne spremenljivke.
   Vsi številski rezultati so preračunani. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const calc = (arr) => arr.map((q) => ({ ...q, calc: true }));
const cards = (arr) => arr.map(([front, back]) => ({ front, back }));

const NOTES_K1 = `
## Funkcije in elastičnost
### Definicijsko območje in zaloga vrednosti
- **Definicijsko območje** D_f: vse x, pri katerih lahko izračunamo f(x). Pazi na: imenovalec ≠ 0, koren iz nenegativnega, ln samo iz pozitivnega.
- **Ekonomsko definicijsko območje**: dodatno zahtevamo smiselne vrednosti (cena p ≥ 0 in količina q ≥ 0). Kolokvij 2023: q(p) = 6 − √p → DM = [0, ∞), DE = [0, 36].
- **Zaloga vrednosti** Z_f: vse vrednosti, ki jih funkcija zavzame.
### Koeficient elastičnosti
- **E_y,x = (x / y) · y′** - za koliko % se spremeni y, če x povečamo za 1 %.
- |E| > 1 **elastična**, |E| < 1 **neelastična**, |E| = 1 **usklajeno elastična**. Negativen predznak: y se spreminja v nasprotni smeri.
- Lastnosti: E konstante = 0; E produkta = vsota elastičnosti; E količnika = razlika elastičnosti.
- Zgled: D(p) = −30p + 900, p = 20 → E = 20/300 · (−30) = **−2** (elastično: +1 % cene → ≈ −2 % povpraševanja).

## Odvodi in ekstremi
### Pravila odvajanja
- (xⁿ)′ = n·xⁿ⁻¹; (eˣ)′ = eˣ; (ln x)′ = 1/x; (aˣ)′ = aˣ ln a
- (f·g)′ = f′g + fg′; (f/g)′ = (f′g − fg′)/g²; verižno: (f(g(x)))′ = f′(g(x)) · g′(x)
### Ekstremi in potek
- **Stacionarne točke**: f′(x) = 0 (in v D_f!). f″ < 0 → **maksimum**, f″ > 0 → **minimum**.
- f′ > 0 → narašča, f′ < 0 → pada. f″ > 0 → konveksna, f″ < 0 → konkavna; prevoj: f″ menja predznak.
- Kolokvij 2023: f(x) = 4 ln(1 − x) − x²: D_f = (−∞, 1), f′ = 2(x − 2)(x + 1)/(1 − x), stacionarni točki 2 ∉ D_f in −1 → maksimum M(−1, 4 ln 2 − 1), pada na (−1, 1).
### Ekonomske uporabe
- **Mejni stroški** MC = C′(q); **povprečni stroški** AC = C(q)/q; mejni prihodek MR = R′(q); dobiček π = R − C, max pri MR = MC.

## Funkcije dveh spremenljivk
- Parcialna odvoda f_x, f_y (drugo spremenljivko obravnavamo kot konstanto).
- **Stacionarna točka**: f_x = 0 in f_y = 0. Test: D = f_xx·f_yy − f_xy². D > 0 in f_xx > 0 → **minimum**; D > 0 in f_xx < 0 → **maksimum**; D < 0 → **sedlo**; D = 0 → test ne odloči.
- **Vezani ekstrem (Lagrange)**: L = f(x, y) − λ·(g(x, y) − c); rešimo L_x = 0, L_y = 0, g = c.

## Integrali
- ∫xⁿ dx = xⁿ⁺¹/(n + 1) + C (n ≠ −1); ∫1/x dx = ln|x| + C; ∫eᵃˣ dx = eᵃˣ/a + C.
- **Določeni integral**: ∫ₐᵇ f dx = F(b) − F(a) (Newton-Leibniz). Ploščina med krivuljama = ∫(zgornja − spodnja).
- Ekonomija: C(q) = ∫MC dq + **fiksni stroški**; R(q) = ∫MR dq (R(0) = 0), povpraševanje p = R(q)/q.

## Finančna matematika
### Navadni obrestni račun
- o = G₀·p·d/36500 (dnevi, K/365); mesečno G₀·p·m/1200; letno G₀·p/100.
- **Dekurzivno**: obresti na koncu od začetne glavnice. **Anticipativno**: obresti na začetku od končne glavnice (manj ugodno za jemalca). 10 % anticipativno ≈ **11,11 %** dekurzivno.
### Obrestno obrestni račun
- Gₙ = G₀·rⁿ, r = 1 + p/100 (naobrestimo ·rⁿ, razobrestimo :rⁿ).
- **Relativna** obrestna mera: p/m. **Konformna**: k_r = ᵐ√r, k_p = (ᵐ√(1 + p/100) − 1)·100 - da enako končno vrednost kot letna kapitalizacija.
- **Prenumerandno** = na začetku obdobja, **postnumerandno** = na koncu. Načelo ekvivalence glavnic: vsota vplačil = vsota izplačil na istem terminu.
- Končna vrednost n postnumerandnih vplačil a: a·(rⁿ − 1)/(r − 1).
### Investicije in zvezno obrestovanje
- **NSV** = Σ Dₜ/rᵗ − I₀; **interna stopnja donosnosti** = p, pri kateri je NSV = 0.
- **Zvezno**: G_t = G₀·e^(p·t/100).
### Amortizacija kreditov
- **Obročni način**: enaka razdolžnina Q = D₀/n, anuiteta aᵢ = Q + obresti od ostanka dolga (pada).
- **Anuitetni način**: enake anuitete a = D₀·rⁿ(r − 1)/(rⁿ − 1).
- Preverba: vsota razdolžnin = začetni dolg; vsota anuitet = vsota obresti + razdolžnin.
`;

const NOTES_K2 = `
## Matrike in determinante
- Seštevanje po elementih (enaki dimenziji). **Množenje** A(m×n)·B(n×k) = C(m×k): vrstica × stolpec. Množenje ni komutativno (AB ≠ BA).
- **Determinanta 2×2**: ad − bc. **3×3**: Sarrusovo pravilo ali razvoj po vrstici/stolpcu.
- Lastnosti: zamenjava vrstic spremeni predznak; vrstica ničel ali dve enaki vrstici → det = 0; det(AB) = det A · det B.
- **Rang** = največje število linearno neodvisnih vrstic (stolpcev); določimo z Gaussovo eliminacijo.
### Inverzna matrika
- A⁻¹ obstaja ⇔ det A ≠ 0 (obrnljiva, nesingularna). 2×2: A⁻¹ = 1/(ad − bc) · [[d, −b], [−c, a]].
- Matrične enačbe: AX = B → X = A⁻¹B; XA = B → X = BA⁻¹.

## Sistemi linearnih enačb
- Gaussova eliminacija; **Cramerjevo pravilo**: xᵢ = det Aᵢ / det A (če det A ≠ 0).
- **Rešljivost** (Kronecker-Capelli): rang A = rang [A|b] = n → ena rešitev; = r < n → neskončno rešitev (n − r parametrov); rang A < rang [A|b] → ni rešitve.

## Verjetnostni račun
- **Kombinatorika**: permutacije n!; variacije brez ponavljanja n!/(n − k)!; kombinacije C(n, k) = n!/(k!(n − k)!).
- P(A) = ugodni / vsi (klasična). P(A ∪ B) = P(A) + P(B) − P(A ∩ B); P(A′) = 1 − P(A).
- **Pogojna**: P(A|B) = P(A ∩ B)/P(B). **Neodvisna** dogodka: P(A ∩ B) = P(A)·P(B).
- **Popolna verjetnost**: P(A) = Σ P(Hᵢ)·P(A|Hᵢ); **Bayes**: P(Hᵢ|A) = P(Hᵢ)P(A|Hᵢ)/P(A).

## Slučajne spremenljivke (izpit)
- Diskretna: E(X) = Σ xᵢpᵢ; Var(X) = E(X²) − E(X)²; σ = √Var.
- E(aX + b) = aE(X) + b; Var(aX + b) = a²Var(X).
- **Binomska** B(n, p): P(X = k) = C(n, k)pᵏ(1 − p)ⁿ⁻ᵏ, E = np, Var = np(1 − p).
- Zvezna: gostota f(x) ≥ 0, ∫f = 1, P(a < X < b) = ∫ₐᵇ f dx; enakomerna na [a, b]: f = 1/(b − a), E = (a + b)/2.
`;

const funkcije = calc([
  Q('Kakšno je definicijsko območje f(x) = ln(1 − x)?', ['(−∞, 1)', '(1, ∞)', '(−∞, 1]', 'ℝ \\ {1}'], 0, 'ln je definiran samo za pozitivne argumente: 1 − x > 0 → x < 1.'),
  Q('Kakšno je definicijsko območje f(x) = √(x − 2)/(x − 5)?', ['[2, 5) ∪ (5, ∞)', '(2, ∞)', '[2, ∞)', 'ℝ \\ {5}'], 0, 'Pod korenom ≥ 0 (x ≥ 2) in imenovalec ≠ 0 (x ≠ 5).'),
  Q('Povpraševanje q(p) = 6 − √p. Ekonomsko definicijsko območje?', ['[0, 36]', '[0, 6]', '[0, ∞)', '[6, 36]'], 0, 'p ≥ 0 in q ≥ 0 → √p ≤ 6 → 0 ≤ p ≤ 36 (kolokvij 2023).'),
  Q('q(p) = 6 − √p. Koeficient elastičnosti povpraševanja?', ['−√p / (2(6 − √p))', '−1/(2√p)', '−p/(6 − √p)', '−√p/(6 − √p)'], 0, 'q′ = −1/(2√p); E = (p/q)·q′ = −√p/(2(6 − √p)).'),
  Q('q(p) = 6 − √p. Pri kateri ceni je E = −1?', ['p = 16', 'p = 4', 'p = 36', 'p = 9'], 0, '√p/(2(6 − √p)) = 1 → √p = 12 − 2√p → √p = 4 → p = 16.'),
  Q('D(p) = −30p + 900. Elastičnost pri p = 20 in kaj pomeni?', ['−2; elastično', '−0,5; neelastično', '−2; neelastično', '−1; usklajeno elastično'], 0, 'q(20) = 300; E = 20/300 · (−30) = −2. |E| > 1: +1 % cene → ≈ −2 % povpraševanja.'),
  Q('Kaj pomeni E_q,p = −0,4?', ['Povpraševanje je neelastično: +1 % cene → količina pade za ≈ 0,4 %', 'Povpraševanje je elastično', 'Ob +1 % cene količina naraste za 0,4 %', 'Cena pade za 0,4 %'], 0, '|E| < 1 → neelastično; negativen predznak = nasprotna smer.'),
  Q('Kolikšna je elastičnost produkta y = f·g?', ['E_f + E_g', 'E_f · E_g', 'E_f − E_g', 'E_f / E_g'], 0, 'Elastičnost količnika je razlika, konstante pa 0.'),
]);

const odvodi = calc([
  Q('(x²·eˣ)′ = ?', ['eˣ(x² + 2x)', '2x·eˣ', 'x²·eˣ', 'eˣ(x² + 2)'], 0, 'Pravilo produkta: 2x·eˣ + x²·eˣ.'),
  Q('(ln(x² + 1))′ = ?', ['2x/(x² + 1)', '1/(x² + 1)', '2x·ln(x² + 1)', '1/(2x)'], 0, 'Verižno pravilo: 1/(x² + 1) · 2x.'),
  Q('((x + 1)/(x − 1))′ = ?', ['−2/(x − 1)²', '2/(x − 1)²', '1/(x − 1)', '−1/(x − 1)²'], 0, '((x − 1) − (x + 1))/(x − 1)² = −2/(x − 1)².'),
  Q('f(x) = 4 ln(1 − x) − x². Kje ima ekstrem in kakšen?', ['Maksimum v x = −1', 'Minimum v x = −1', 'Maksimum v x = 2', 'Ni ekstremov'], 0,
    'f′ = 2(x − 2)(x + 1)/(1 − x) = 0 → x = 2 (∉ D_f) ali x = −1; f″(−1) = −3 < 0 → maksimum M(−1, 4 ln 2 − 1).'),
  Q('Na katerem intervalu je f(x) = 4 ln(1 − x) − x² padajoča?', ['(−1, 1)', '(−∞, −1)', '(−∞, 1)', '(1, ∞)'], 0, 'f′ < 0 med maksimumom in robom definicijskega območja.'),
  Q('C(q) = q³ − 6q² + 15q + 20. Mejni stroški?', ['3q² − 12q + 15', 'q² − 6q + 15 + 20/q', '3q² − 12q', 'q³ − 6q²'], 0, 'MC = C′(q). Povprečni stroški AC = C/q = q² − 6q + 15 + 20/q.'),
  Q('p = 100 − 2q, C(q) = 20q + 50. Pri kateri količini je dobiček največji in koliko znaša?', ['q = 20; π = 750', 'q = 25; π = 700', 'q = 20; π = 800', 'q = 40; π = 0'], 0,
    'π = (100 − 2q)q − 20q − 50 = −2q² + 80q − 50; π′ = 0 → q = 20; π = 750 (p = 60).'),
  Q('f″(x₀) > 0 in f′(x₀) = 0. Kaj je x₀?', ['Lokalni minimum', 'Lokalni maksimum', 'Prevoj', 'Ni mogoče sklepati'], 0, 'f″ < 0 → maksimum; f″ = 0 → test ne odloči.'),
  Q('Kdaj je funkcija konveksna?', ['Ko je f″ > 0', 'Ko je f′ > 0', 'Ko je f″ < 0', 'Ko je f = 0'], 0, 'f′ > 0 pomeni naraščanje; prevoj je, kjer f″ spremeni predznak.'),
]);

const dveSpr = calc([
  Q('f(x, y) = x²y + 3xy². Parcialni odvod po x?', ['2xy + 3y²', 'x² + 6xy', '2x + 3y²', '2xy + 6xy'], 0, 'y obravnavamo kot konstanto. f_y = x² + 6xy.'),
  Q('f(x, y) = x³ − 3x + y² − 2y. Kaj je točka (1, 1)?', ['Lokalni minimum', 'Lokalni maksimum', 'Sedlo', 'Ni stacionarna'], 0,
    'f_x = 3x² − 3, f_y = 2y − 2 → (±1, 1). V (1, 1): f_xx = 6, f_yy = 2, f_xy = 0 → D = 12 > 0, f_xx > 0 → minimum.'),
  Q('Ista funkcija: kaj je točka (−1, 1)?', ['Sedlo', 'Minimum', 'Maksimum', 'Ni stacionarna'], 0, 'f_xx = −6 → D = −12 < 0 → sedlo.'),
  Q('Kdaj je stacionarna točka funkcije dveh spremenljivk maksimum?', ['D > 0 in f_xx < 0', 'D > 0 in f_xx > 0', 'D < 0', 'D = 0'], 0, 'D = f_xx·f_yy − f_xy².'),
  Q('Maksimiraj U = xy pri omejitvi 2x + 4y = 40 (Lagrange). Rešitev?', ['x = 10, y = 5, U = 50', 'x = 5, y = 7,5, U = 37,5', 'x = 20, y = 0, U = 0', 'x = 8, y = 6, U = 48'], 0,
    'L = xy − λ(2x + 4y − 40): y = 2λ, x = 4λ → x = 2y → 4y + 4y = 40 → y = 5, x = 10.'),
]);

const integrali = calc([
  Q('∫(3x² + 2x) dx = ?', ['x³ + x² + C', '6x + 2 + C', 'x³ + 2x² + C', '3x³ + x² + C'], 0, '∫xⁿ dx = xⁿ⁺¹/(n + 1) + C.'),
  Q('∫e^(2x) dx = ?', ['e^(2x)/2 + C', '2e^(2x) + C', 'e^(2x) + C', 'e^(2x+1)/(2x+1) + C'], 0, '∫eᵃˣ dx = eᵃˣ/a + C.'),
  Q('∫ 1/x dx = ?', ['ln|x| + C', 'x⁰/0 + C', '−1/x² + C', '1/x² + C'], 0, 'Izjema pravila za potence (n = −1).'),
  Q('∫₀² x² dx = ?', ['8/3', '4', '8', '4/3'], 0, 'x³/3 od 0 do 2 = 8/3.'),
  Q('Ploščina med y = x in y = x² na [0, 1]?', ['1/6', '1/2', '1/3', '5/6'], 0, '∫₀¹ (x − x²) dx = 1/2 − 1/3 = 1/6.'),
  Q('MC(q) = 3q² + 4q + 5, fiksni stroški 100. Funkcija celotnih stroškov?', ['C = q³ + 2q² + 5q + 100', 'C = 6q + 4', 'C = q³ + 2q² + 5q', 'C = 3q³ + 4q² + 5q + 100'], 0, 'C(q) = ∫MC dq + FC.'),
  Q('MR(q) = 60 − q/100. Funkcija povpraševanja (R(0) = 0)?', ['p = 60 − q/200', 'p = 60 − q/100', 'p = 60q − q²/200', 'p = −1/100'], 0, 'R = 60q − q²/200; p = R/q = 60 − q/200.'),
]);

const financna = calc([
  Q('Posojilo 100 d.e. pri 10 % letni ANTICIPATIVNI obrestni meri. Koliko izplačajo in kolikšna je ekvivalentna dekurzivna mera?', ['90 d.e.; 11,11 %', '100 d.e.; 10 %', '90 d.e.; 10 %', '110 d.e.; 9,09 %'], 0,
    'Obresti (10) odtegnejo takoj; vrneš 100 → 10/90 = 11,11 %.'),
  Q('Obresti od 10.000 € pri 6 % p.a. za 146 dni (navadni, K/365)?', ['240 €', '600 €', '146 €', '24 €'], 0, 'o = G₀·p·d/36500 = 10.000 · 6 · 146/36500 = 240.'),
  Q('Diskontirana (dekurzivna) vrednost 800.000, ki dospe čez 124 dni, pri 10 % p.a.?', ['773.714,89', '772.821,92', '800.000,00', '727.272,73'], 0,
    '800.000/(1 + 0,10 · 124/365). Anticipativno: 800.000 · (1 − 0,10 · 124/365) = 772.821,92.'),
  Q('1000 € naložimo za 3 leta pri 5 % p.a., letna kapitalizacija. Končna vrednost?', ['1.157,63 €', '1.150,00 €', '1.161,83 €', '1.050,00 €'], 0, 'G₃ = 1000 · 1,05³.'),
  Q('Kolikšna je polletna RELATIVNA obrestna mera pri 12 % p.a.?', ['6 %', '5,83 %', '12 %', '3 %'], 0, 'Relativna = p/m. Konformna bi bila (√1,12 − 1) · 100 = 5,83 %.'),
  Q('Mesečna KONFORMNA obrestna mera pri 6 % p.a.?', ['≈ 0,487 %', '0,5 %', '≈ 0,512 %', '6 %'], 0, '(1,06^(1/12) − 1) · 100 = 0,4868 %. Da enako letno končno vrednost kot letna kapitalizacija.'),
  Q('Kaj je prenumerandni znesek?', ['Znesek, ki dospe na začetku obdobja', 'Znesek, ki dospe na koncu obdobja', 'Znesek brez obresti', 'Anticipativne obresti'], 0, 'Postnumerandni = na koncu obdobja.'),
  Q('Končna vrednost 10 postnumerandnih letnih vplačil po 1000 € pri 5 % (letna kapitalizacija)?', ['12.577,89 €', '10.000,00 €', '13.206,79 €', '7.721,73 €'], 0, '1000 · (1,05¹⁰ − 1)/0,05. (7.721,73 je sedanja vrednost.)'),
  Q('10.000 d.e. zvezno obrestujemo 18 mesecev pri 14 % p.a. Končna vrednost?', ['12.336,78', '12.100,00', '12.210,00', '11.400,00'], 0, 'G = 10.000 · e^(0,14 · 1,5).'),
  Q('Investicija 200.000; donosi 30.000, 40.000, 40.000, 150.000 (konec 1.-4. leta). NSV pri 7 %?', ['+10.061,13', '−27.094,61', '+60.000,00', '−10.061,13'], 0, 'Σ Dₜ/1,07ᵗ − 200.000. Pri 14 % je NSV −27.094,61 → interna stopnja je med 7 % in 14 %.'),
  Q('Investicija 100.000 prinese 80.000 čez 1 leto in 40.000 čez 2 leti. Interna stopnja donosnosti?', ['14,83 %', '20 %', '10 %', '12,5 %'], 0, '100.000 = 80.000/r + 40.000/r² → r = 1,1483.'),
  Q('Dolg 300.000, 7 %, 3 leta, OBROČNI način (enake razdolžnine). Prva anuiteta?', ['121.000', '114.315,50', '100.000', '107.000'], 0, 'Q = 100.000; a₁ = Q + 0,07 · 300.000 = 121.000; a₂ = 114.000; a₃ = 107.000.'),
  Q('Isti dolg z ANUITETNIM načinom (enake anuitete). Anuiteta?', ['114.315,50', '114.000,00', '121.000,00', '107.000,00'], 0, 'a = D₀·rⁿ(r − 1)/(rⁿ − 1) = 300.000 · 1,07³ · 0,07/(1,07³ − 1).'),
  Q('Obročni način, dolg 300.000, 7 %, 3 leta. Skupaj plačane obresti?', ['42.000', '21.000', '342.000', '49.000'], 0, '21.000 + 14.000 + 7.000; vsota anuitet 342.000 = dolg + obresti.'),
]);

const matrike = calc([
  Q('det [[3, 2], [1, 4]] = ?', ['10', '14', '−10', '12'], 0, 'ad − bc = 12 − 2.'),
  Q('det [[1, 2, 3], [0, 1, 4], [5, 6, 0]] = ?', ['1', '−1', '0', '24'], 0, 'Razvoj po 1. vrstici: 1·(0 − 24) − 2·(0 − 20) + 3·(0 − 5) = −24 + 40 − 15 = 1.'),
  Q('A = [[1, 2], [3, 4]], B = [[0, 1], [1, 0]]. AB = ?', ['[[2, 1], [4, 3]]', '[[3, 4], [1, 2]]', '[[0, 2], [3, 0]]', '[[1, 2], [3, 4]]'], 0, 'Vrstica × stolpec: B zamenja stolpca matrike A. BA bi zamenjal vrstici.'),
  Q('Inverz [[2, 1], [5, 3]]?', ['[[3, −1], [−5, 2]]', '[[2, −1], [−5, 3]]', '[[3, 1], [5, 2]]', 'Ne obstaja'], 0, 'det = 1; A⁻¹ = 1/det · [[d, −b], [−c, a]].'),
  Q('Kdaj obstaja inverzna matrika?', ['Ko je det A ≠ 0', 'Ko je A simetrična', 'Vedno', 'Ko je det A = 0'], 0, 'Taka matrika je obrnljiva (nesingularna).'),
  Q('Rang [[1, 2], [2, 4]]?', ['1', '2', '0', '4'], 0, 'Druga vrstica je 2-kratnik prve, det = 0.'),
  Q('Kako rešimo matrično enačbo XA = B?', ['X = BA⁻¹', 'X = A⁻¹B', 'X = B − A', 'X = B/A'], 0, 'Množimo z desne z A⁻¹. Pri AX = B je X = A⁻¹B.'),
  Q('Kaj se zgodi z determinanto, če zamenjamo dve vrstici?', ['Spremeni predznak', 'Ostane enaka', 'Postane 0', 'Se podvoji'], 0, 'Če sta dve vrstici enaki ali je vrstica ničel, je det = 0.'),
  Q('Rešitev sistema x + y = 5, 2x − y = 1?', ['x = 2, y = 3', 'x = 3, y = 2', 'x = 1, y = 4', 'Ni rešitve'], 0, 'Seštejemo: 3x = 6 → x = 2, y = 3. Cramer: det A = −3, det A₁ = −6.'),
  Q('rang A = rang [A|b] = 2, neznank je 3. Koliko rešitev ima sistem?', ['Neskončno (1 parameter)', 'Eno', 'Nobene', 'Tri'], 0, 'Kronecker-Capelli: r < n → n − r parametrov. rang A < rang [A|b] → ni rešitve.'),
]);

const verjetnost = calc([
  Q('Na koliko načinov izberemo 3 od 10 ljudi (vrstni red ni pomemben)?', ['120', '720', '30', '1000'], 0, 'C(10, 3) = 120. Če vrstni red šteje (variacije): 10 · 9 · 8 = 720.'),
  Q('Koliko različnih vrstnih redov ima 5 knjig?', ['120', '25', '60', '5'], 0, '5! = 120.'),
  Q('Dve kocki: verjetnost, da je vsota 7?', ['1/6', '1/12', '7/36', '1/36'], 0, 'Ugodni pari: 6 od 36.'),
  Q('P(A) = 0,5, P(B) = 0,4, P(A ∩ B) = 0,2. P(A ∪ B) = ?', ['0,7', '0,9', '0,2', '0,5'], 0, 'P(A) + P(B) − P(A ∩ B).'),
  Q('Isti podatki: ali sta A in B neodvisna?', ['Da, ker P(A ∩ B) = P(A)·P(B) = 0,2', 'Ne', 'Ne moremo vedeti', 'Da, ker sta nezdružljiva'], 0, 'Neodvisnost: P(A ∩ B) = P(A)·P(B).'),
  Q('P(A ∩ B) = 0,12, P(B) = 0,4. P(A | B) = ?', ['0,3', '0,048', '0,52', '0,12'], 0, 'P(A|B) = P(A ∩ B)/P(B).'),
  Q('Stroj A naredi 60 % izdelkov (2 % izmeta), stroj B 40 % (5 % izmeta). Verjetnost izmeta?', ['0,032', '0,035', '0,07', '0,012'], 0, 'Popolna verjetnost: 0,6 · 0,02 + 0,4 · 0,05.'),
  Q('Isti primer: izdelek je izmet. Verjetnost, da ga je naredil stroj A?', ['0,375', '0,6', '0,02', '0,625'], 0, 'Bayes: 0,012/0,032.'),
]);

const slucajne = calc([
  Q('X: vrednosti 0, 1, 2 z verjetnostmi 0,2; 0,5; 0,3. E(X) = ?', ['1,1', '1,0', '0,5', '1,5'], 0, 'Σ xᵢpᵢ = 0 + 0,5 + 0,6.'),
  Q('Isti X: Var(X) = ?', ['0,49', '1,70', '1,21', '0,70'], 0, 'E(X²) = 0,5 + 1,2 = 1,7; Var = 1,7 − 1,1² = 0,49.'),
  Q('E(X) = 3, Var(X) = 4. E(2X + 1) in Var(2X + 1)?', ['7 in 16', '7 in 9', '6 in 8', '7 in 8'], 0, 'E(aX + b) = aE + b; Var(aX + b) = a²Var.'),
  Q('Binomska B(4; 0,5): P(X = 2) = ?', ['0,375', '0,5', '0,25', '0,0625'], 0, 'C(4, 2) · 0,5⁴ = 6/16.'),
  Q('Binomska B(n, p): pričakovana vrednost in varianca?', ['np in np(1 − p)', 'n/p in np', 'p in p(1 − p)', 'np in √np'], 0, 'Npr. B(20; 0,3): E = 6, Var = 4,2.'),
  Q('X enakomerna na [0, 10]. P(2 < X < 5) = ?', ['0,3', '0,5', '0,2', '0,7'], 0, 'f = 1/10; (5 − 2)/10.'),
  Q('Kateri pogoj mora izpolnjevati gostota verjetnosti?', ['f(x) ≥ 0 in ∫f(x)dx = 1', 'f(x) ≤ 1', 'f je naraščajoča', 'f(0) = 0'], 0, 'Pri zvezni spremenljivki je P(X = a) = 0.'),
]);

const kartK1 = cards([
  ['Elastičnost', 'E_y,x = (x/y)·y′; |E| > 1 elastična, < 1 neelastična, = 1 usklajeno elastična.'],
  ['Ekonomsko definicijsko območje', 'Matematično D_f + pogoja p ≥ 0 in q ≥ 0.'],
  ['Pravila odvajanja', '(fg)′ = f′g + fg′; (f/g)′ = (f′g − fg′)/g²; (f(g))′ = f′(g)·g′.'],
  ['Ekstrem', 'f′ = 0 (v D_f); f″ < 0 maksimum, f″ > 0 minimum.'],
  ['MC, AC, dobiček', 'MC = C′; AC = C/q; max dobička pri MR = MC (π′ = 0).'],
  ['Ekstrem f(x, y)', 'f_x = f_y = 0; D = f_xx f_yy − f_xy²: D > 0, f_xx < 0 max; D > 0, f_xx > 0 min; D < 0 sedlo.'],
  ['Lagrange', 'L = f − λ(g − c); L_x = L_y = 0 in g = c.'],
  ['Integrali', '∫xⁿ = xⁿ⁺¹/(n + 1); ∫1/x = ln|x|; ∫eᵃˣ = eᵃˣ/a; ∫ₐᵇ f = F(b) − F(a).'],
  ['Stroški iz mejnih', 'C(q) = ∫MC dq + fiksni stroški.'],
  ['Navadne obresti', 'o = G₀·p·d/36500; dekurzivno od G₀, anticipativno od G (končne).'],
  ['Obrestno obrestni', 'Gₙ = G₀·rⁿ, r = 1 + p/100.'],
  ['Relativna / konformna', 'Relativna p/m; konformna (ᵐ√(1 + p/100) − 1)·100.'],
  ['NSV in IRR', 'NSV = Σ Dₜ/rᵗ − I₀; IRR: NSV = 0.'],
  ['Zvezno obrestovanje', 'G_t = G₀·e^(pt/100).'],
  ['Amortizacija', 'Obročni: Q = D₀/n, anuiteta pada. Anuitetni: a = D₀rⁿ(r − 1)/(rⁿ − 1).'],
]);

const kartK2 = cards([
  ['Determinanta 2×2', 'ad − bc.'],
  ['Inverz 2×2', '1/(ad − bc)·[[d, −b], [−c, a]]; obstaja, ko det ≠ 0.'],
  ['Množenje matrik', '(m×n)(n×k) = m×k, vrstica × stolpec; AB ≠ BA.'],
  ['Matrične enačbe', 'AX = B → X = A⁻¹B; XA = B → X = BA⁻¹.'],
  ['Cramer', 'xᵢ = det Aᵢ/det A (det A ≠ 0).'],
  ['Kronecker-Capelli', 'r(A) = r(A|b) = n: 1 rešitev; = r < n: ∞ (n − r parametrov); r(A) < r(A|b): ni rešitve.'],
  ['Kombinatorika', 'Permutacije n!; variacije n!/(n − k)!; kombinacije n!/(k!(n − k)!).'],
  ['Verjetnost unije', 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B).'],
  ['Pogojna, neodvisnost', 'P(A|B) = P(A ∩ B)/P(B); neodvisna: P(A ∩ B) = P(A)P(B).'],
  ['Bayes', 'P(Hᵢ|A) = P(Hᵢ)P(A|Hᵢ)/Σ P(Hⱼ)P(A|Hⱼ).'],
  ['E in Var', 'E = Σ xp; Var = E(X²) − E²; E(aX + b) = aE + b; Var(aX + b) = a²Var.'],
  ['Binomska', 'P(X = k) = C(n, k)pᵏqⁿ⁻ᵏ; E = np; Var = npq.'],
]);

module.exports = {
  id: 'mat',
  parts: [
    {
      id: 'k1', name: '1. kolokvij (funkcije, odvodi, integrali, finančna mat.)', type: 'kolokvij', notesMd: NOTES_K1,
      decks: [
        { id: 'mat-funkcije', name: 'Funkcije, definicijsko območje, elastičnost', calc: true, questions: funkcije },
        { id: 'mat-odvodi', name: 'Odvodi, ekstremi, mejni stroški', calc: true, questions: odvodi },
        { id: 'mat-dvespr', name: 'Funkcije dveh spremenljivk, Lagrange', calc: true, questions: dveSpr },
        { id: 'mat-integrali', name: 'Integrali in uporaba v ekonomiji', calc: true, questions: integrali },
        { id: 'mat-financna', name: 'Finančna matematika', calc: true, questions: financna },
      ],
      flashcards: [{ id: 'mat-c-k1', name: 'Formule (1. kolokvij)', cards: kartK1 }],
    },
    {
      id: 'k2', name: '2. kolokvij (matrike, sistemi, verjetnost)', type: 'kolokvij', notesMd: NOTES_K2,
      decks: [
        { id: 'mat-matrike', name: 'Matrike, determinante, sistemi', calc: true, questions: matrike },
        { id: 'mat-verjetnost', name: 'Kombinatorika in verjetnost', calc: true, questions: verjetnost },
      ],
      flashcards: [{ id: 'mat-c-k2', name: 'Formule (2. kolokvij)', cards: kartK2 }],
    },
    {
      id: 'izpit', name: 'Izpit', type: 'izpit', notesMd: NOTES_K1 + NOTES_K2,
      decks: [{ id: 'mat-slucajne', name: 'Slučajne spremenljivke', calc: true, questions: slucajne }],
    },
  ],
};
