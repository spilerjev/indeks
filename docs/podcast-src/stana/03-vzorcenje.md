# Epizoda 3 — Teoretične osnove vzorčenja

Tema: Statistična analiza. Lastna razlaga snovi z lastnimi primeri.

## Ponovitev

Gostota in porazdelitvena funkcija; kvantil (vrednost) ↔ kvantilni rang (porazdelitvena funkcija); normalna porazdelitev z dvema parametroma (μ, σ), simetrična, unimodalna; Z ~ N(0, 1).

## Normalna porazdelitev v praksi: dva rešena primera

### Bonboni v vrečkah

- **Enota:** ena vrečka. **Spremenljivka:** število bonbonov v vrečki (v bonbonih), številska, diskretna (modeliramo jo z normalno), razmernostna.
- **Iz podatkov:** 95,44 % vrečk ima med 188 in 212 bonbonov. To je **μ ± 2σ**, zato 200 ± 2σ = 212 → **σ = 6 bonbonov**. **Y ~ N(200; 6)**.
- **Mediana:** **Me = 200 bonbonov, ker je normalna porazdelitev simetrična** — polovica ploščine je levo od μ, polovica desno. Utemeljitev »ker je pri normalni Me = μ« ni dovolj.
- **Graf gostote:** zvon nad osjo »število bonbonov v vrečki«, os y je »gostota verjetnosti f(y)«; na osi označi 182, 188, 194, **200**, 206, 212, 218.
- **F(203)** = P(Y ≤ 203) = P(Z ≤ (203 − 200)/6) = F_Z(0,5) = **0,6915** → 69,15 % vrečk vsebuje do vključno 203 bonbone. Na grafu gostote je to ploščina levo od 203.
- **Graf porazdelitvene funkcije:** krivulja S od 0 do 1, os y je F(y); pri 200 je višina 0,5, pri 203 pa 0,6915. Najstrmejša je pri μ, kjer ima gostota vrh. Pogosta napaka: namesto krivulje S spet narišeš zvon.
- **7. decil D₇:** kvantilni rang P = 0,70 → v tabeli je F(0,52) = 0,6985 (razlika 0,0015) bližje kot F(0,53) = 0,7019 (razlika 0,0019), zato z = 0,52 → D₇ = 200 + 0,52 · 6 = **203,1 bonbona**. 70 % vrečk vsebuje do vključno 203,1 bonbona, 30 % več. R: `qnorm(0.7, 200, 6)`.

### Garancija za robotske sesalnike

- **Enota:** en robotski sesalnik. **Spremenljivka:** trajnost sesalnika (čas delovanja do večje okvare, v letih), zvezna, razmernostna. Zanima nas trajnost; podjetje želi, da so stroški garancijskih popravil čim nižji.
- »Največ sesalnikov se pokvari po 6 letih« → Mo = 6, pri normalni pa Mo = μ. **Y ~ N(6 let; 1,4 leta).** Podjetje je prodalo 4000 sesalnikov, eno popravilo stane 200 €.
- **a) Proračun 80 000 €:** 80 000/200 = **400 popravil** = 400/4000 = **10 %** sesalnikov se sme pokvariti v garanciji.
  - P(Y ≤ g) = 0,10 → z = −1,28 (tabela).
  - g = 6 + (−1,28) · 1,4 = **4,2 leta**.
  - Podjetje naj da garancijo **največ 4,2 leta**; pri daljši bi se v garanciji pokvarilo več kot 10 % sesalnikov in stroški bi presegli proračun. R: `qnorm(0.10, 6, 1.4)`.
- **b) Garancija 3 leta, proračun le 4 000 €:** 4 000/200 = **20 popravil** = 20/4000 = **0,5 %**.
  - P(Y ≤ 3) = 0,005 → z = −2,58.
  - z = (3 − 6)/σ_nov → σ_nov = (3 − 6)/(−2,58) = **1,16 leta**.
  - Sprememba: absolutno 1,16 − 1,4 = **−0,24 leta**; relativno (1,16 − 1,4)/1,4 · 100 = **−17,1 %**.
  - Standardni odklon trajnosti bi se moral **zmanjšati** za 0,24 leta oz. 17,1 % (proizvodnja bi morala biti bolj enakomerna).
  - Za primerjavo: zdaj je P(Y ≤ 3) = F_Z(−2,14) = 0,0162, kar pomeni približno 65 popravil oz. 12 960 €.

### Drži ali ne drži (lastne trditve)

| Trditev | Odgovor | Zakaj |
|---|---|---|
| Vsaka normalna porazdelitev je simetrična. | **DRŽI** | simetrična je okoli μ. Obratno ne drži: vsaka simetrična porazdelitev ni normalna. |
| Pri Z je približno 95 % vrednosti med −1 in +1. | **NE DRŽI** | med −1 in +1 je 68,27 %; 95 % je med −1,96 in +1,96 |
| Pri Z sta standardni odklon in varianca enaka. | **DRŽI** | σ = 1 in σ² = 1² = 1 |
| Vzorčni okvir je seznam enot, ki smo jih izbrali v vzorec. | **NE DRŽI** | je oštevilčen seznam **vseh N enot populacije** |
| Iz N = 12 izberemo n = 4 brez ponavljanja; možnih vzorcev je 48. | **NE DRŽI** | (12 nad 4) = 12!/(4!·8!) = **495**; vsak vzorec ima verjetnost 1/495 |

## Vzorčno opazovanje

- **Vzorčno opazovanje** = proučevanje populacije z opazovanjem **dela enot (vzorca)**, na podlagi katerega **sklepamo** na celotno populacijo. Vzorec je podmnožica populacije.
- **Velikost vzorca**: število **n** ali **vzorčni delež f = n/N**.
- **Razlogi za vzorčenje:** nižja cena, krajši čas, manj zahtevna izvedba, manj napak in manjkajočih podatkov; včasih popolno opazovanje ni mogoče ali smiselno (test, ki uniči izdelek).
- **Pred analizo premisli o:** (1) metodi ocenjevanja parametra, (2) načinu vzorčenja, (3) velikosti vzorca.

### Način izbire enot

| | Slučajna izbira (verjetnostno) | Neslučajna izbira (neverjetnostno) |
|---|---|---|
| Verjetnost izbire enote | **znana** (pri ESV enaka za vse enote) | **ni znana** |
| Primeri | enostavno slučajno vzorčenje (ESV) | namerni (tipične enote), **kvotni**, na slepo, **najlaže dosegljive enote** |
| Prednosti | statistična teorija: lahko predvidimo porazdelitev ocen in njihovo kakovost | enostavnejša in cenejša izvedba |
| Slabosti | dražje, potrebuje okvir | **neobjektivnost**, ne moremo predvideti porazdelitve ocen in njihove kakovosti |

→ **Statistična teorija daje prednost slučajni izbiri.** (Povezava s trženjem: kvotni vzorec v anketah je neverjetnostni.)

### Postopek slučajne izbire

1. **Vzorčni okvir** = oštevilčen seznam **vseh N** enot populacije (registri). Lasten primer: seznam vseh članov tekaškega kluba na določen dan; seznam vseh podjetij v poslovnem registru na 1. januar.
2. Z **generatorjem (psevdo)slučajnih števil** (enakomerna porazdelitev) ustvarimo n slučajnih števil: kolo sreče ali kocka za majhne sezname, v R `sample(250, size = 5, replace = FALSE)`.
3. Izberemo enote, katerih zaporedne številke se ujemajo z generiranimi števili.

- **s ponavljanjem** – isto enoto lahko izberemo večkrat;
- **brez ponavljanja** – vsaka enota največ enkrat. To je običajno v družboslovju.

### Enostavno slučajno vzorčenje (ESV)

**Vsaka enota je izbrana z enako verjetnostjo ⇒ vsak vzorec iste velikosti je izbran z enako verjetnostjo.**

**Število vseh možnih vzorcev brez ponavljanja** (vrstnega reda ne upoštevamo) je binomski koeficient:

$$\binom{N}{n} = \frac{N!}{n!\,(N-n)!}$$

- Lasten primer: tekaški klub z N = 250 člani. Za n = 5 je vseh vzorcev C(250, 5) = **7 817 031 300**, za n = 30 pa ≈ **5,34 · 10³⁸**. Vseh vzorcev zato nikoli ne gledamo, ampak jih obravnavamo teoretično. R: `choose(250, 5)`.
- Lasten primer: pevski zbor ima 18 pevcev, za nastop jih zborovodja izbere 8. Možnih zasedb je C(18, 8) = **43 758**. Na vsaki zasedbi (vzorcu) bi lahko izračunali npr. povprečno starost — dobili bi 43 758 ocen, ki se razlikujejo med sabo.

## Cenilka in vzorčna ocena ⭐

| Pojem | Pomen | Oznaka |
|---|---|---|
| **Parameter** | prava (populacijska) vrednost, ena sama, nepoznana | Γ (npr. μ) |
| **Cenilka** | **funkcija vzorčnih vrednosti** g = f(y₁…yₙ); je **slučajna spremenljivka**, ker je odvisna od izbranega vzorca | g (npr. ȳ) |
| **Vzorčna ocena** | **vrednost cenilke na enem vzorcu v** = točkovna ocena parametra | g_v (npr. ȳ_v) |

- Ocene se od vzorca do vzorca spreminjajo; kar se spreminja, obravnavamo kot spremenljivko. **Cenilka je torej slučajna spremenljivka, njene vrednosti pa so ocene pri vseh možnih vzorcih.**
- Pogosta zamenjava: »spremenljivka, katere vrednosti so vzorčne ocene vseh vzorcev« je **cenilka**, ne parameter. Parameter je ena fiksna vrednost.
- Pravilno je »**cenilka** je nepristranska«, ne »spremenljivka Y je nepristranska«.

## Porazdelitev vzorčnih ocen: tri mere ⭐

| Mera | Formula |
|---|---|
| **Pričakovana vrednost** (matematično upanje) cenilke = povprečje vseh ocen | E(g) = (1 / C(N,n)) · Σ g_v |
| **Varianca** vzorčnih ocen | Var(g) = (1 / C(N,n)) · Σ (g_v − E(g))² |
| **Standardna napaka** (standardni odklon vzorčnih ocen) | SE(g) = √Var(g) |

Standardna napaka je ena najpomembnejših količin v statistiki: pove, koliko se ocena v povprečju razlikuje od vzorca do vzorca. Je v enotah spremenljivke.

## Rešen primer: vsi možni vzorci iz majhne populacije

Pet prijateljev je v počitnicah prebralo **Y = 1, 4, 6, 2, 7** knjig. To je cela populacija (N = 5).
- **μ_Y = 20/5 = 4 knjige**; **σ²_Y = (9 + 0 + 4 + 4 + 9)/5 = 5,2**; **σ_Y = 2,28 knjige** (populacijska varianca deli z N).
- Vzorci brez ponavljanja s po **n = 3**: C(5, 3) = 5!/(3!·2!) = **10 vzorcev**.

| Vzorec | ȳ_v | Vzorec | ȳ_v |
|---|---|---|---|
| 1, 4, 6 | 3,67 | 1, 2, 7 | 3,33 |
| 1, 4, 2 | 2,33 | 4, 6, 2 | 4,00 |
| 1, 4, 7 | 4,00 | 4, 6, 7 | 5,67 |
| 1, 6, 2 | 3,00 | 4, 2, 7 | 4,33 |
| 1, 6, 7 | 4,67 | 6, 2, 7 | 5,00 |

- **E(ȳ)** = povprečje vseh 10 ocen = 40/10 = **4 = μ_Y** → cenilka ȳ je **nepristranska**. Povprečje populacije (iz 5 vrednosti) in povprečje vseh vzorčnih povprečij (iz 10 vrednosti) sta isto število.
- **Var(ȳ)** iz vseh 10 vzorcev = **0,867**. Enako da obrazec za **ESV brez ponavljanja**:

$$Var(\bar y)=\frac{\sigma_Y^2}{n}\cdot\frac{N-n}{N-1}=\frac{5{,}2}{3}\cdot\frac{5-3}{5-1}=0{,}867$$

- **SE(ȳ) = √0,867 = 0,93 knjige.**
- **(N − n)/(N − 1) je popravek za končno populacijo** pri vzorčenju brez ponavljanja. Pazi na vrstni red: v števcu N − n, v imenovalcu N − 1. Pri vzorčenju s ponavljanjem popravka ni.
- **V praksi parametrov ne poznamo** (imamo samo en vzorec), zato varianco in SE **ocenimo** (male črke):

$$var(\bar y)=\frac{s_Y^2}{n}\cdot\frac{N-n}{N}, \qquad se(\bar y)=\frac{s_Y}{\sqrt n}\cdot\sqrt{\frac{N-n}{N}}$$

  Pri oceni je v imenovalcu popravka **N**, pri pravi varianci **N − 1**.
- **Velike črke (Var, SE, σ)** = prave vrednosti iz vseh vzorcev; **male črke (var, se, s)** = ocene iz enega vzorca.

**V R:**
```r
y <- c(1, 4, 6, 2, 7)
mean(y)                          # 4
var(y) * 4/5                     # 5.2 (var() deli z n-1, zato popravek)
choose(5, 3)                     # 10 vzorcev
library(combinat); combn(y, 3)   # vsi vzorci
ocene <- combn(y, 3, mean)       # 10 vzorčnih povprečij
mean(ocene)                      # E = 4
var(ocene) * 9/10                # Var = 0.867
```
`var()` v R deli z n − 1; ko računamo populacijsko varianco ali varianco **vseh** vzorčnih ocen, pomnožimo z (n − 1)/n.

## Merila za kakovost cenilke ⭐

Parameter lahko ocenimo z različnimi cenilkami (za »sredino«: ȳ, mediana, (y_min + y_max)/2). Merila:
1. **Nepristranskost:** **E(g) = Γ** — pričakovana vrednost cenilke je enaka pravi vrednosti.
2. **Učinkovitost:** čim **manjša Var(g)**; med nepristranskimi je boljša tista z manjšo varianco.
3. **Doslednost:** z večanjem vzorca so ocene vse bližje pravi vrednosti; lim P(|g − Γ| < ε) = 1, ko n → ∞.

### Cenilka za varianco

- Parameter: σ²_Y = (1/**N**) Σ(yᵢ − μ)². Cenilka: **s²_Y = (1/(n−1)) Σ(yᵢ − ȳ)²**.
- **Vzorci s ponavljanjem:** E(s²) = σ² → nepristranska.
- **Vzorci brez ponavljanja:** **E(s²) = N/(N−1) · σ²**. Pri knjigah: povprečje s² čez vseh 10 vzorcev je 6,5 = 5/4 · 5,2. Pri velikem N je N/(N−1) ≈ 1, zato je razlika zanemarljiva.

## Oblika porazdelitve vzorčnih ocen

- Zvezne porazdelitve vzorčnih ocen: **normalna (Z), t, χ², F**.
- **Centralni limitni izrek:** pri **velikih vzorcih (n ≥ 100)** se ocene parametrov, ki so **vsote** slučajnih spremenljivk (povprečje μ, vsota Y_tot, **delež** Π, število enot z lastnostjo N_a), porazdeljujejo **približno normalno**, ne glede na porazdelitev Y.
- Torej (če je Y normalna **ali** n ≥ 100): **g ~ N(E(g), SE(g))**. Zvon je centriran pri E(g); robovi so E(g) ± SE(g), ± 2SE(g), ± 3SE(g). Znotraj ± 2SE je 95,44 % ocen, znotraj ± 3SE 99,73 %.
- **Pogoste zamenjave pri sliki porazdelitve ocen:** središče je **E(ȳ)** (ne ȳ enega vzorca); robovi so E(ȳ) ± 3**SE**(ȳ) z veliko črko (prava vrednost), ne se; na osi je vrednost cenilke ȳ.
- **Standardna napaka meri variiranje vzorčnih ocen**, ne variiranje posameznih enot (to meri σ_Y oziroma s_Y).

## Povzetek

- **Vzorec** ≠ **populacija**; **parameter** (ena fiksna vrednost) ≠ **cenilka** (slučajna spremenljivka) ≠ **ocena** (vrednost na enem vzorcu).
- ESV uporabimo, ker lahko za ocene izračunamo **E, Var, SE** in porazdelitev.
- **C(N, n)** vzorcev brez ponavljanja; vsak enako verjeten.
- **SE(ȳ)² = σ²/n · (N−n)/(N−1)**; ocena: s²/n · (N−n)/N.
- **Kakovost:** nepristranskost, učinkovitost, doslednost.
- **CLI:** n ≥ 100 → ocena približno normalna, g ~ N(E(g), SE(g)).
- Pojmi, ki jih moraš znati vstaviti v stavek: f = n/N je **vzorčni delež**; cenilka je **slučajna** spremenljivka; povprečje vseh vzorčnih ocen je **pričakovana vrednost** E(g); če je E(g) = Γ, je cenilka **nepristranska**.
