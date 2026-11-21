/* Matematika za poslovne in ekonomske vede (MPEV, 1. letnik, 1. semester 2025/26)
   Viri: predavanja (EF Zapiski: Matematika - predavanja), terminski plan 2025/26, kolokvij 9. 11. 2023 z rešitvami.
   1. kolokvij: funkcije, odvodi, elastičnost, funkcije dveh spremenljivk, integrali, finančna matematika.
   2. kolokvij: matrike, determinante, rang, sistemi, inverzna matrika, verjetnost. Izpit: + slučajne spremenljivke.
   Vsi številski rezultati so preračunani. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const calc = (arr) => arr.map((q) => ({ ...q, calc: true }));
const cards = (arr) => arr.map(([front, back]) => ({ front, back }));

const NOTES_K1 = `
## Funkcije in elastičnost
### Definicijsko območje in zaloga vrednosti
- **Definicijsko območje** D_f: vse x, pri katerih lahko izračunamo f(x). Pazi na: imenovalec ≠ 0, koren iz nenegativnega, ln samo iz pozitivnega.
- **Ekonomsko definicijsko območje**: dodatno zahtevamo smiselne vrednosti (cena p ≥ 0 in količina q ≥ 0). Primer: q(p) = 8 − √p → DM = [0, ∞), DE = [0, 64].
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
- Primer: f(x) = 6 ln(2 − x) − x²: D_f = (−∞, 2), f′ = 2(x − 3)(x + 1)/(2 − x), stacionarni točki 3 ∉ D_f in −1 → maksimum M(−1, 6 ln 3 − 1), pada na (−1, 2).
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
  withId('q1bumg0i', Q('Kakšno je definicijsko območje f(x) = ln(1 − x)?', ['(−∞, 1)', '(1, ∞)', '(−∞, 1]', 'ℝ \\ {1}'], 0, 'ln je definiran samo za pozitivne argumente: 1 − x > 0 → x < 1.')),
  withId('qvoqd6i', Q('Kakšno je definicijsko območje f(x) = √(x − 2)/(x − 5)?', ['[2, 5) ∪ (5, ∞)', '(2, ∞)', '[2, ∞)', 'ℝ \\ {5}'], 0, 'Pod korenom ≥ 0 (x ≥ 2) in imenovalec ≠ 0 (x ≠ 5).')),
  withId('q18lunyj', { q: "Trgovina ocenjuje tedensko povpraševanje po kavi kot q(p) = 9 − √p (p v EUR). Na katerem intervalu cen ima funkcija ekonomski smisel?",
      options: ["[0, 81]","[0, 9]","[0, 81)","[0, 3]"],
      correct: 0,
      explanation: "Cena ne sme biti negativna (p ≥ 0) in količina tudi ne: 9 − √p ≥ 0 → √p ≤ 9 → p ≤ 81. Pri p = 81 je q = 0, kar je še dopustno, zato je interval zaprt.",
      calc: true }),
  withId('q116ba4d', { q: "Pri povpraševanju q(p) = 9 − √p izrazi koeficient cenovne elastičnosti E_q,p kot funkcijo cene.",
      options: ["−√p / (2(9 − √p))","−1 / (2√p)","−√p / (9 − √p)","−2√p / (9 − √p)"],
      correct: 0,
      explanation: "q′(p) = −1/(2√p). E = (p/q)·q′ = p/(9 − √p) · (−1/(2√p)) = −√p/(2(9 − √p)). Druga možnost je samo odvod q′, tretja pozabi faktor ½.",
      calc: true }),
  withId('qcx0l4a', { q: "Pri kateri ceni je povpraševanje q(p) = 9 − √p enotsko elastično (E_q,p = −1)?",
      options: ["p = 36","p = 81","p = 9","p = 20,25"],
      correct: 0,
      explanation: "√p/(2(9 − √p)) = 1 → √p = 18 − 2√p → √p = 6 → p = 36 (q = 3). Pri p = 81 je q = 0, pri p = 9 je E = −0,25, pri p = 20,25 je E = −0,5.",
      calc: true }),
  withId('q9a0bhc', Q('D(p) = −30p + 900. Elastičnost pri p = 20 in kaj pomeni?', ['−2; elastično', '−0,5; neelastično', '−2; neelastično', '−1; usklajeno elastično'], 0, 'q(20) = 300; E = 20/300 · (−30) = −2. |E| > 1: +1 % cene → ≈ −2 % povpraševanja.')),
  withId('q1b17lyn', Q('Kaj pomeni E_q,p = −0,4?', ['Povpraševanje je neelastično: +1 % cene → količina pade za ≈ 0,4 %', 'Povpraševanje je elastično', 'Ob +1 % cene količina naraste za 0,4 %', 'Cena pade za 0,4 %'], 0, '|E| < 1 → neelastično; negativen predznak = nasprotna smer.')),
  withId('q15xgcsr', Q('Kolikšna je elastičnost produkta y = f·g?', ['E_f + E_g', 'E_f · E_g', 'E_f − E_g', 'E_f / E_g'], 0, 'Elastičnost količnika je razlika, konstante pa 0.')),
]);

const odvodi = calc([
  withId('q14tfzyw', Q('(x²·eˣ)′ = ?', ['eˣ(x² + 2x)', '2x·eˣ', 'x²·eˣ', 'eˣ(x² + 2)'], 0, 'Pravilo produkta: 2x·eˣ + x²·eˣ.')),
  withId('qsc088q', Q('(ln(x² + 1))′ = ?', ['2x/(x² + 1)', '1/(x² + 1)', '2x·ln(x² + 1)', '1/(2x)'], 0, 'Verižno pravilo: 1/(x² + 1) · 2x.')),
  withId('q1hw4f8h', Q('((x + 1)/(x − 1))′ = ?', ['−2/(x − 1)²', '2/(x − 1)²', '1/(x − 1)', '−1/(x − 1)²'], 0, '((x − 1) − (x + 1))/(x − 1)² = −2/(x − 1)².')),
  withId('q10h8fa3', { q: "Funkcija f(x) = 6 ln(x + 2) − x² je definirana za x > −2. Kje ima lokalni ekstrem in kakšen je?",
      options: ["Maksimum v x = 1","Minimum v x = 1","Maksimum v x = −3","Maksimum v x = 1 in minimum v x = −3"],
      correct: 0,
      explanation: "f′(x) = 6/(x + 2) − 2x = −2(x − 1)(x + 3)/(x + 2). Ničli sta x = 1 in x = −3, a −3 ni v definicijskem območju. f″(x) = −6/(x + 2)² − 2 < 0 → maksimum M(1, 6 ln 3 − 1).",
      calc: true }),
  withId('q1ptn14d', { q: "Na katerem intervalu je funkcija f(x) = 6 ln(x + 2) − x² padajoča?",
      options: ["(1, ∞)","(−2, 1)","(−3, 1)","(−∞, −3)"],
      correct: 0,
      explanation: "Na definicijskem območju (x > −2) je imenovalec x + 2 pozitiven, zato predznak f′ določa −2(x − 1)(x + 3): pozitiven na (−2, 1), negativen za x > 1. Interval (−3, 1) in (−∞, −3) segata zunaj območja.",
      calc: true }),
  withId('qymvcd', Q('C(q) = q³ − 6q² + 15q + 20. Mejni stroški?', ['3q² − 12q + 15', 'q² − 6q + 15 + 20/q', '3q² − 12q', 'q³ − 6q²'], 0, 'MC = C′(q). Povprečni stroški AC = C/q = q² − 6q + 15 + 20/q.')),
  withId('q1egyop', Q('p = 100 − 2q, C(q) = 20q + 50. Pri kateri količini je dobiček največji in koliko znaša?', ['q = 20; π = 750', 'q = 25; π = 700', 'q = 20; π = 800', 'q = 40; π = 0'], 0,
    'π = (100 − 2q)q − 20q − 50 = −2q² + 80q − 50; π′ = 0 → q = 20; π = 750 (p = 60).')),
  withId('q1g27lxt', Q('f″(x₀) > 0 in f′(x₀) = 0. Kaj je x₀?', ['Lokalni minimum', 'Lokalni maksimum', 'Prevoj', 'Ni mogoče sklepati'], 0, 'f″ < 0 → maksimum; f″ = 0 → test ne odloči.')),
  withId('qp86uxn', Q('Kdaj je funkcija konveksna?', ['Ko je f″ > 0', 'Ko je f′ > 0', 'Ko je f″ < 0', 'Ko je f = 0'], 0, 'f′ > 0 pomeni naraščanje; prevoj je, kjer f″ spremeni predznak.')),
]);

const dveSpr = calc([
  withId('q3diw64', Q('f(x, y) = x²y + 3xy². Parcialni odvod po x?', ['2xy + 3y²', 'x² + 6xy', '2x + 3y²', '2xy + 6xy'], 0, 'y obravnavamo kot konstanto. f_y = x² + 6xy.')),
  withId('q1z02um9', Q('f(x, y) = x³ − 3x + y² − 2y. Kaj je točka (1, 1)?', ['Lokalni minimum', 'Lokalni maksimum', 'Sedlo', 'Ni stacionarna'], 0,
    'f_x = 3x² − 3, f_y = 2y − 2 → (±1, 1). V (1, 1): f_xx = 6, f_yy = 2, f_xy = 0 → D = 12 > 0, f_xx > 0 → minimum.')),
  withId('q1emt3h6', Q('Za f(x, y) = x³ − 3x + y² − 2y: kaj je točka (−1, 1)?', ['Sedlo', 'Minimum', 'Maksimum', 'Ni stacionarna'], 0, 'f_xx = −6 → D = −12 < 0 → sedlo.')),
  withId('qmdt59r', Q('Kdaj je stacionarna točka funkcije dveh spremenljivk maksimum?', ['D > 0 in f_xx < 0', 'D > 0 in f_xx > 0', 'D < 0', 'D = 0'], 0, 'D = f_xx·f_yy − f_xy².')),
  withId('qa403u7', Q('Maksimiraj U = xy pri omejitvi 2x + 4y = 40 (Lagrange). Rešitev?', ['x = 10, y = 5, U = 50', 'x = 5, y = 7,5, U = 37,5', 'x = 20, y = 0, U = 0', 'x = 8, y = 6, U = 48'], 0,
    'L = xy − λ(2x + 4y − 40): y = 2λ, x = 4λ → x = 2y → 4y + 4y = 40 → y = 5, x = 10.')),
]);

const integrali = calc([
  withId('q1x8yepe', Q('∫(3x² + 2x) dx = ?', ['x³ + x² + C', '6x + 2 + C', 'x³ + 2x² + C', '3x³ + x² + C'], 0, '∫xⁿ dx = xⁿ⁺¹/(n + 1) + C.')),
  withId('q1gihe35', Q('∫e^(2x) dx = ?', ['e^(2x)/2 + C', '2e^(2x) + C', 'e^(2x) + C', 'e^(2x+1)/(2x+1) + C'], 0, '∫eᵃˣ dx = eᵃˣ/a + C.')),
  withId('qxr4gvf', Q('∫ 1/x dx = ?', ['ln|x| + C', 'x⁰/0 + C', '−1/x² + C', '1/x² + C'], 0, 'Izjema pravila za potence (n = −1).')),
  withId('q17n6xkj', Q('∫₀² x² dx = ?', ['8/3', '4', '8', '4/3'], 0, 'x³/3 od 0 do 2 = 8/3.')),
  withId('qgjxt3b', Q('Ploščina med y = x in y = x² na [0, 1]?', ['1/6', '1/2', '1/3', '5/6'], 0, '∫₀¹ (x − x²) dx = 1/2 − 1/3 = 1/6.')),
  withId('qb7dccw', Q('MC(q) = 3q² + 4q + 5, fiksni stroški 100. Funkcija celotnih stroškov?', ['C = q³ + 2q² + 5q + 100', 'C = 6q + 4', 'C = q³ + 2q² + 5q', 'C = 3q³ + 4q² + 5q + 100'], 0, 'C(q) = ∫MC dq + FC.')),
  withId('q16zayru', Q('MR(q) = 60 − q/100. Funkcija povpraševanja (R(0) = 0)?', ['p = 60 − q/200', 'p = 60 − q/100', 'p = 60q − q²/200', 'p = −1/100'], 0, 'R = 60q − q²/200; p = R/q = 60 − q/200.')),
]);

const financna = calc([
  withId('q1840n2h', Q('Posojilo 100 d.e. pri 10 % letni ANTICIPATIVNI obrestni meri. Koliko izplačajo in kolikšna je ekvivalentna dekurzivna mera?', ['90 d.e.; 11,11 %', '100 d.e.; 10 %', '90 d.e.; 10 %', '110 d.e.; 9,09 %'], 0,
    'Obresti (10) odtegnejo takoj; vrneš 100 → 10/90 = 11,11 %.')),
  withId('qr84qe9', Q('Obresti od 10.000 € pri 6 % p.a. za 146 dni (navadni, K/365)?', ['240 €', '600 €', '146 €', '24 €'], 0, 'o = G₀·p·d/36500 = 10.000 · 6 · 146/36500 = 240.')),
  withId('qgfj8ys', Q('Diskontirana (dekurzivna) vrednost 800.000, ki dospe čez 124 dni, pri 10 % p.a.?', ['773.714,89', '772.821,92', '800.000,00', '727.272,73'], 0,
    '800.000/(1 + 0,10 · 124/365). Anticipativno: 800.000 · (1 − 0,10 · 124/365) = 772.821,92.')),
  withId('q1uwqhn7', Q('1000 € naložimo za 3 leta pri 5 % p.a., letna kapitalizacija. Končna vrednost?', ['1.157,63 €', '1.150,00 €', '1.161,83 €', '1.050,00 €'], 0, 'G₃ = 1000 · 1,05³.')),
  withId('qchhbsa', Q('Kolikšna je polletna RELATIVNA obrestna mera pri 12 % p.a.?', ['6 %', '5,83 %', '12 %', '3 %'], 0, 'Relativna = p/m. Konformna bi bila (√1,12 − 1) · 100 = 5,83 %.')),
  withId('q1pbzw9m', Q('Mesečna KONFORMNA obrestna mera pri 6 % p.a.?', ['≈ 0,487 %', '0,5 %', '≈ 0,512 %', '6 %'], 0, '(1,06^(1/12) − 1) · 100 = 0,4868 %. Da enako letno končno vrednost kot letna kapitalizacija.')),
  withId('q1ipciio', Q('Kaj je prenumerandni znesek?', ['Znesek, ki dospe na začetku obdobja', 'Znesek, ki dospe na koncu obdobja', 'Znesek brez obresti', 'Anticipativne obresti'], 0, 'Postnumerandni = na koncu obdobja.')),
  withId('qbpxt4c', Q('Končna vrednost 10 postnumerandnih letnih vplačil po 1000 € pri 5 % (letna kapitalizacija)?', ['12.577,89 €', '10.000,00 €', '13.206,79 €', '7.721,73 €'], 0, '1000 · (1,05¹⁰ − 1)/0,05. (7.721,73 je sedanja vrednost.)')),
  withId('q1vk3yi0', Q('10.000 d.e. zvezno obrestujemo 18 mesecev pri 14 % p.a. Končna vrednost?', ['12.336,78', '12.100,00', '12.210,00', '11.400,00'], 0, 'G = 10.000 · e^(0,14 · 1,5).')),
  withId('q1qbe607', Q('Investicija 200.000; donosi 30.000, 40.000, 40.000, 150.000 (konec 1.-4. leta). NSV pri 7 %?', ['+10.061,13', '−27.094,61', '+60.000,00', '−10.061,13'], 0, 'Σ Dₜ/1,07ᵗ − 200.000. Pri 14 % je NSV −27.094,61 → interna stopnja je med 7 % in 14 %.')),
  withId('q1n4vt95', Q('Investicija 100.000 prinese 80.000 čez 1 leto in 40.000 čez 2 leti. Interna stopnja donosnosti?', ['14,83 %', '20 %', '10 %', '12,5 %'], 0, '100.000 = 80.000/r + 40.000/r² → r = 1,1483.')),
  withId('qip65ki', Q('Dolg 300.000, 7 %, 3 leta, OBROČNI način (enake razdolžnine). Prva anuiteta?', ['121.000', '114.315,50', '100.000', '107.000'], 0, 'Q = 100.000; a₁ = Q + 0,07 · 300.000 = 121.000; a₂ = 114.000; a₃ = 107.000.')),
  withId('qk3tnte', Q('Dolg 300.000, 7 %, 3 leta, ANUITETNI način (enake anuitete). Anuiteta?', ['114.315,50', '114.000,00', '121.000,00', '107.000,00'], 0, 'a = D₀·rⁿ(r − 1)/(rⁿ − 1) = 300.000 · 1,07³ · 0,07/(1,07³ − 1).')),
  withId('qzxmd86', Q('Obročni način, dolg 300.000, 7 %, 3 leta. Skupaj plačane obresti?', ['42.000', '21.000', '342.000', '49.000'], 0, '21.000 + 14.000 + 7.000; vsota anuitet 342.000 = dolg + obresti.')),
]);

const matrike = calc([
  withId('qfbre5', Q('det [[3, 2], [1, 4]] = ?', ['10', '14', '−10', '12'], 0, 'ad − bc = 12 − 2.')),
  withId('q1xtclct', Q('det [[1, 2, 3], [0, 1, 4], [5, 6, 0]] = ?', ['1', '−1', '0', '24'], 0, 'Razvoj po 1. vrstici: 1·(0 − 24) − 2·(0 − 20) + 3·(0 − 5) = −24 + 40 − 15 = 1.')),
  withId('qfdp4b0', Q('A = [[1, 2], [3, 4]], B = [[0, 1], [1, 0]]. AB = ?', ['[[2, 1], [4, 3]]', '[[3, 4], [1, 2]]', '[[0, 2], [3, 0]]', '[[1, 2], [3, 4]]'], 0, 'Vrstica × stolpec: B zamenja stolpca matrike A. BA bi zamenjal vrstici.')),
  withId('q1hh8h0c', Q('Inverz [[2, 1], [5, 3]]?', ['[[3, −1], [−5, 2]]', '[[2, −1], [−5, 3]]', '[[3, 1], [5, 2]]', 'Ne obstaja'], 0, 'det = 1; A⁻¹ = 1/det · [[d, −b], [−c, a]].')),
  withId('qptq8fd', Q('Kdaj obstaja inverzna matrika?', ['Ko je det A ≠ 0', 'Ko je A simetrična', 'Vedno', 'Ko je det A = 0'], 0, 'Taka matrika je obrnljiva (nesingularna).')),
  withId('q57cc9u', Q('Rang [[1, 2], [2, 4]]?', ['1', '2', '0', '4'], 0, 'Druga vrstica je 2-kratnik prve, det = 0.')),
  withId('q1g1qcud', Q('Kako rešimo matrično enačbo XA = B?', ['X = BA⁻¹', 'X = A⁻¹B', 'X = B − A', 'X = B/A'], 0, 'Množimo z desne z A⁻¹. Pri AX = B je X = A⁻¹B.')),
  withId('qk72por', Q('Kaj se zgodi z determinanto, če zamenjamo dve vrstici?', ['Spremeni predznak', 'Ostane enaka', 'Postane 0', 'Se podvoji'], 0, 'Če sta dve vrstici enaki ali je vrstica ničel, je det = 0.')),
  withId('qp9anm', Q('Rešitev sistema x + y = 5, 2x − y = 1?', ['x = 2, y = 3', 'x = 3, y = 2', 'x = 1, y = 4', 'Ni rešitve'], 0, 'Seštejemo: 3x = 6 → x = 2, y = 3. Cramer: det A = −3, det A₁ = −6.')),
  withId('qo14z3', Q('rang A = rang [A|b] = 2, neznank je 3. Koliko rešitev ima sistem?', ['Neskončno (1 parameter)', 'Eno', 'Nobene', 'Tri'], 0, 'Kronecker-Capelli: r < n → n − r parametrov. rang A < rang [A|b] → ni rešitve.')),
]);

const verjetnost = calc([
  withId('qyiob57', Q('Na koliko načinov izberemo 3 od 10 ljudi (vrstni red ni pomemben)?', ['120', '720', '30', '1000'], 0, 'C(10, 3) = 120. Če vrstni red šteje (variacije): 10 · 9 · 8 = 720.')),
  withId('qkz6zgz', Q('Koliko različnih vrstnih redov ima 5 knjig?', ['120', '25', '60', '5'], 0, '5! = 120.')),
  withId('q11wfivh', Q('Dve kocki: verjetnost, da je vsota 7?', ['1/6', '1/12', '7/36', '1/36'], 0, 'Ugodni pari: 6 od 36.')),
  withId('q1lindzw', Q('P(A) = 0,5, P(B) = 0,4, P(A ∩ B) = 0,2. P(A ∪ B) = ?', ['0,7', '0,9', '0,2', '0,5'], 0, 'P(A) + P(B) − P(A ∩ B).')),
  withId('q1q44fac', Q('P(A) = 0,5, P(B) = 0,4, P(A ∩ B) = 0,2. Ali sta A in B neodvisna?', ['Da, ker P(A ∩ B) = P(A)·P(B) = 0,2', 'Ne', 'Ne moremo vedeti', 'Da, ker sta nezdružljiva'], 0, 'Neodvisnost: P(A ∩ B) = P(A)·P(B).')),
  withId('q1sq5k8z', Q('P(A ∩ B) = 0,12, P(B) = 0,4. P(A | B) = ?', ['0,3', '0,048', '0,52', '0,12'], 0, 'P(A|B) = P(A ∩ B)/P(B).')),
  withId('q6og22u', Q('Stroj A naredi 60 % izdelkov (2 % izmeta), stroj B 40 % (5 % izmeta). Verjetnost izmeta?', ['0,032', '0,035', '0,07', '0,012'], 0, 'Popolna verjetnost: 0,6 · 0,02 + 0,4 · 0,05.')),
  withId('qsqfluy', Q('Stroj A naredi 60 % izdelkov (2 % izmeta), stroj B 40 % (5 % izmeta). Izdelek je izmet. Verjetnost, da ga je naredil stroj A?', ['0,375', '0,6', '0,02', '0,625'], 0, 'Bayes: 0,012/0,032.')),
]);

const slucajne = calc([
  withId('qvfgu8h', Q('X: vrednosti 0, 1, 2 z verjetnostmi 0,2; 0,5; 0,3. E(X) = ?', ['1,1', '1,0', '0,5', '1,5'], 0, 'Σ xᵢpᵢ = 0 + 0,5 + 0,6.')),
  withId('qc18urz', Q('X: vrednosti 0, 1, 2 z verjetnostmi 0,2; 0,5; 0,3. Var(X) = ?', ['0,49', '1,70', '1,21', '0,70'], 0, 'E(X²) = 0,5 + 1,2 = 1,7; Var = 1,7 − 1,1² = 0,49.')),
  withId('q14iz33f', Q('E(X) = 3, Var(X) = 4. E(2X + 1) in Var(2X + 1)?', ['7 in 16', '7 in 9', '6 in 8', '7 in 8'], 0, 'E(aX + b) = aE + b; Var(aX + b) = a²Var.')),
  withId('qyszxf', Q('Binomska B(4; 0,5): P(X = 2) = ?', ['0,375', '0,5', '0,25', '0,0625'], 0, 'C(4, 2) · 0,5⁴ = 6/16.')),
  withId('q1q8i2yg', Q('Binomska B(n, p): pričakovana vrednost in varianca?', ['np in np(1 − p)', 'n/p in np', 'p in p(1 − p)', 'np in √np'], 0, 'Npr. B(20; 0,3): E = 6, Var = 4,2.')),
  withId('q16l9vdz', Q('X enakomerna na [0, 10]. P(2 < X < 5) = ?', ['0,3', '0,5', '0,2', '0,7'], 0, 'f = 1/10; (5 − 2)/10.')),
  withId('qi922ym', Q('Kateri pogoj mora izpolnjevati gostota verjetnosti?', ['f(x) ≥ 0 in ∫f(x)dx = 1', 'f(x) ≤ 1', 'f je naraščajoča', 'f(0) = 0'], 0, 'Pri zvezni spremenljivki je P(X = a) = 0.')),
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
