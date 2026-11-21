# Epizoda 3 — Teoretične osnove vzorčenja

Predmet: Statistična analiza (2. letnik). Vir: lastni zapiski predavanj in vaj, pripravljeni za zvočno razlago.

## P03 — Teoretične osnove vzorčenja

Gradivo: gradivo (Aleša Lotrič Dolinar), R koda: gradivo.

### Ponovitev P02
Gostota in porazdelitvena funkcija; kvantil (vrednost) ↔ kvantilni rang (porazdelitvena funkcija); normalna porazdelitev: 2 parametra (μ, σ), simetrična, unimodalna; Z ~ N(0, 1).

### Vzorčno opazovanje
- **Vzorčno opazovanje** = proučevanje populacije z opazovanjem **dela enot (vzorca)**, na podlagi katerega **sklepamo** na celotno populacijo. Vzorec je podmnožica populacije.
- **Velikost vzorca**: točno število **n** ali **vzorčni delež f = n/N**.
- **Razlogi za vzorčenje:** nižja cena, krajši čas, manj zahtevno, bojazen za pristranskost (npr. zaradi preveč manjkajočih podatkov), včasih popolno opazovanje ni mogoče ali smiselno (npr. test, ki uniči izdelek).
- **Pred analizo premisli o:** (1) metodi ocenjevanja izbranega parametra, (2) načinu vzorčenja, (3) velikosti vzorca.

### Način izbire enot v vzorec
| | Slučajna izbira (verjetnostno) | Neslučajna izbira (neverjetnostno) |
|---|---|---|
| Verjetnost izbire enote | **enaka za vse enote** | **ni znana** |
| Primeri | ESV (glej spodaj) | namerni (tipične enote), **kvotni**, namerno pristranski (kontrolna skupina), na slepo, **najlaže dosegljive enote** |
| Prednosti | statistična teorija: lahko predvidimo porazdelitev ocen in njihovo kakovost | enostavnejša in cenejša izvedba; ob dobri izvedbi so rezultati lahko dobri |
| Slabosti | dražje, potrebuje okvir | **neobjektivnost**, ne moremo predvideti porazdelitve vzorčnih ocen in ugotoviti njihove kakovosti |

→ **Statistična teorija daje prednost slučajni izbiri.** (Povezava s TT: kvotni vzorec je neverjetnostni.)

### Postopek slučajne izbire (3 koraki)
1. **Vzorčni okvir** = oštevilčen seznam **vseh N** enot (registri). Primer 3.1: študenti, vpisani danes v 2. letnik UPEŠ EF; Primer 3.2: podjetja, vpisana v register 1. 1. 2026.
2. S **generatorjem (psevdo)slučajnih števil** (enakomerna porazdelitev) ustvarimo n slučajnih števil: poštena kocka (za seznam do 6 enot) ali v R `sample(X, n)`, npr. `sample(50, size = 8, replace = FALSE)`.
3. Izberemo enote, katerih zaporedne številke se ujemajo z generiranimi števili.

**Dva načina:**
- **s ponavljanjem** – števila se lahko ponovijo → isto enoto lahko izberemo večkrat;
- **brez ponavljanja** – števila morajo biti različna → vsaka enota največ enkrat. **Običajno v družboslovju** (omejena velikost populacije, razlike med enotami so večje).

### Enostavno slučajno vzorčenje (ESV, angl. SRS)
Populacija N enot → okvir z oznakami 1…N → generiramo n enakomernih slučajnih števil → vzorec = teh n enot.
**Vsaka enota je izbrana z enako verjetnostjo ⇒ vsak vzorec iste velikosti je izbran z enako verjetnostjo.**

**Število vseh možnih vzorcev brez ponavljanja** (vrstnega reda ne upoštevamo) = binomski koeficient:

$$\binom{N}{n} = \frac{N!}{n!\,(N-n)!}$$

- Primer 3.1: N = 400 študentov, n = 4 → C(400, 4) = **1 050 739 900**; n = 50 → C(400, 50) = **1,70359 · 10⁶⁴** (zato nikoli ne gledamo vseh vzorcev, ampak jih obravnavamo teoretično).
- R: `choose(6, 4)`, vse vzorce izpiše `combn(y, 4)` (paket `combinat`).

### Primer 3.3: vsi možni vzorci (hipotetični)
Populacija 6 enot, **Y = 2, 3, 7, 4, 3, 5**. Populacijski parametri:
- **μ_Y = 4**, **σ²_Y = 2,67**, **σ_Y = 1,63** (populacijska varianca deli z N, ne z N−1).
- Vzorci brez ponavljanja s po **n = 4**: C(6, 4) = 6!/(4!·2!) = **15 vzorcev**.
- Za vsak vzorec v (v = 1…15) izračunamo vzorčno oceno ȳ_v, npr. vzorec 1 (2, 3, 7, 4) → ȳ₁ = 16/4 = **4**; vzorec 2 (2, 3, 7, 3) → 3,75; … vzorec 15 (7, 4, 3, 5) → 4,75.
- Vseh 15 ocen: 4; 3,75; 4,25; 3; 3,5; 3,25; 4; 4,5; 4,25; 3,5; 4,25; 4,75; 4,5; 3,75; 4,75.

### Cenilka in vzorčna ocena ⭐ (pojmi za kolokvij)
| Pojem | Pomen | Oznaka |
|---|---|---|
| **Parameter** | prava (populacijska) vrednost, ena sama, nepoznana | Γ (npr. μ) |
| **Cenilka** (estimator) | **funkcija vzorčnih vrednosti** g = f(y₁…yₙ); je **slučajna spremenljivka**, ker je odvisna od tega, kateri vzorec izberemo | g (npr. ȳ) |
| **Vzorčna ocena** (estimate) | **vrednost cenilke na posameznem vzorcu v** = (točkovna) ocena parametra | g_v (npr. ȳ_v) |

Verjetnostna porazdelitev cenilke (vzorčnih ocen) je odvisna od ocenjevanega parametra.
⚠️ Kdor reče »spremenljivka, katere vrednosti so vzorčne ocene«, misli **cenilko**, ne parameter (glej vprašanje 1E spodaj).

### Porazdelitev vzorčnih ocen: tri mere ⭐
Čez vseh C(N, n) vzorcev (q ≤ C(N, n) različnih ocen):

| Mera | Formula |
|---|---|
| **Pričakovana vrednost** (matematično upanje) cenilke | E(g) = Σ g_v · P(g_v) = (1 / C(N,n)) · Σ g_v |
| **Varianca** vzorčnih ocen | Var(g) = E[g − E(g)]² = (1 / C(N,n)) · Σ (g_v − μ_g)² |
| **Standardna napaka** (SE, standardni odklon vzorčnih ocen) | SE(g) = √Var(g) |

### Primer 3.3: cenilka za aritmetično sredino
- Frekvenčna porazdelitev 15 ocen: vrednosti 3 | 3,25 | 3,5 | 3,75 | 4 | 4,25 | 4,5 | 4,75 s frekvencami 1 | 1 | 2 | 2 | 2 | 3 | 2 | 2 (skupaj 15).
- **E(ȳ) = 4 = μ_Y** (povprečje vseh 15 ocen = pravo povprečje → cenilka je nepristranska).
- **Var(ȳ)** (iz vseh vzorcev) = 0,27 in z obrazcem za **ESV brez ponavljanja**:

$$Var(\bar y)=\frac{\sigma_Y^2}{n}\cdot\frac{N-n}{N-1}=\frac{2{,}67}{4}\cdot\frac{6-4}{6-1}=0{,}27$$

- **SE(ȳ) = √0,27 = 0,52** (v enotah spremenljivke Y).
- Izračun preveri: 2,6667/4 = 0,6667; ·2/5 = **0,2667** ✔.
- ⚠️ **Člen (N−n)/(N−1) je popravek za končno populacijo** (pri vzorčenju brez ponavljanja). Pri vzorčenju s ponavljanjem ga ni.
- **V praksi parametrov ne poznamo** (poznamo samo vzorec), zato varianco in SE **ocenimo** (male črke var, se):

$$var(\bar y)=\frac{s_Y^2}{n}\cdot\frac{N-n}{N}, \qquad se(\bar y)=\frac{s_Y}{\sqrt n}\cdot\sqrt{\frac{N-n}{N}}$$

(Pri oceni je v imenovalcu popravka **N**, pri pravi varianci **N − 1**. Pozor na vrstni red: v števcu je N − n.)
- **Velike črke (Var, SE, σ)** = prave vrednosti iz vseh vzorcev; **male črke (var, se, s)** = ocene iz enega vzorca.

### R izpis (primer 3.3)
```r
y <- c(2, 3, 7, 4, 3, 5)
mean(y)                         # 4  (populacijska sredina)
var_pop <- var(y)*(n-1)/n       # 2.666667 (R-jev var() deli z n-1, zato popravek na N)
sd_pop  <- sqrt(var_pop)        # 1.632993
choose(6, 4)                    # 15 vzorcev
library(combinat); combn(y, 4)  # izpiše vse vzorce (matrika 4 x 15)
y_precna <- combn(y, 4, mean)   # 15 vzorčnih ocen
mean(y_precna)                  # E = 4
v <- length(y_precna); var(y_precna)*(v-1)/v   # Var = 0.2666667
sqrt(Var)                       # SE = 0.5163978
hist(y_precna, breaks = seq(2.5, 5, by = 0.25))   # porazdelitev vzorčnih ocen
```
⚠️ `var()` v R deli z **n − 1**; ko računamo populacijsko varianco ali varianco **vseh** vzorčnih ocen, pomnožimo z (n−1)/n.
Histogram ocen: razpon 3–4,75, vrh pri 4,0–4,25 (3 vzorci), približno zvonast.

### Merila za kakovost cenilke ⭐

Parameter lahko ocenimo z različnimi cenilkami (za »povprečje«: ȳ, mediana, (y_min + y_max)/2). Niso vse enako dobre. Merila:
1. **Nepristranskost** (unbiasedness): **E(g) = Γ**, pričakovana vrednost cenilke je enaka pravi vrednosti parametra.
2. **Učinkovitost** (efficiency): čim **manjša Var(g)** (med nepristranskimi je boljša tista z manjšo varianco).
3. **Doslednost** (consistency): z večanjem vzorca so ocene vse bližje pravi vrednosti, lim P(|g − Γ| < ε) = 1 pri n → ∞.

Primer 3.3: ali je ȳ nepristranska? E(ȳ) = 4 = μ_Y → **da**.

### Cenilka za varianco (pristranskost!) ⭐
- Parameter: σ²_Y = (1/**N**) Σ(y_i − μ)². Cenilka: **s²_Y = (1/(n−1)) Σ(y_i − ȳ)²**.
- **Vzorci s ponavljanjem:** E(s²) = σ² → nepristranska.
- **Vzorci brez ponavljanja:** **E(s²) = N/(N−1) · σ²** → rahlo pristranska glede na σ² (pri velikem N zanemarljivo, saj N/(N−1) ≈ 1; je pa nepristranska za varianco z deljenjem z N−1).
- Zato se v cenilki deli z **n − 1**, ne z n.

### Oblika porazdelitve vzorčnih ocen
- Možne zvezne porazdelitve vzorčnih ocen: **normalna (Z), t, χ², F** (to so tiste štiri iz P02, pr. 7).
- **Centralni limitni izrek:** pri **velikih vzorcih (n ≥ 100)** se vzorčne ocene za parametre, ki so **vsote** slučajnih spremenljivk (aritmetična sredina μ, vsota Y_tot, **delež** Π, število enot z lastnostjo N_a), porazdeljujejo **približno normalno**, ne glede na porazdelitev Y.
- Torej (če Y ~ N(μ_Y, σ_Y) **ali** n ≥ 100): **g ~ N(E(g), SE(g))**. Zvon je centriran pri E(g), robovi E(g) ± SE(g), ± 2SE(g), ± 3SE(g). Zveza z P02: ± 2SE ≈ 95,44 %, ± 3SE ≈ 99,73 %.

### Vprašanja za preverjanje znanja (rešeno)
**1.** (38 000 študentov, slučajni vzorec n = 300, povprečni izdatki.) Katera trditev **NI** pravilna?
- A ✔ vrednosti ȳ za vse vzorce s po 300 študenti prikazuje porazdelitev vzorčnih ocen;
- B ✔ porazdelitev vzorčnih ocen = porazdelitev cenilke;
- C ✔ cenilka je nepristranska, če je E(g) = Γ;
- D ✔ ȳ je nepristranska cenilka povprečja;
- **E ✘ NI pravilna → odgovor E.** Spremenljivko, katere vrednosti so vzorčne ocene vseh vzorcev in je funkcija vrednosti enot v vzorcu, imenujemo **cenilka**, ne parameter (parameter je ena fiksna populacijska vrednost).

**2.** Kaj merimo s **standardno napako** povprečne višine izdatkov? → **D: variiranje vzorčnih ocen** povprečne višine izdatkov (SE je standardni odklon vzorčnih ocen, ne variiranje med študenti; to meri σ_Y ali s_Y).

**3.** Slika: porazdelitev vzorčnih ocen, oznake ① levi rob (−3 SE), ② središče, ③ desni rob (+3 SE), ④ os. → **D**: ① E(ȳ) − 3SE(ȳ), ② E(ȳ), ③ E(ȳ) + 3SE(ȳ), ④ ȳ.
(Središče je **E(ȳ)**, ne ȳ; **velik SE** = prave vrednosti iz vseh vzorcev, ne male se; os je vrednost cenilke ȳ.)

### Povzetek za kolokvij
- **Vzorec** ≠ **populacija**; **parameter** (1 fiksna vrednost) ≠ **cenilka** (slučajna spremenljivka) ≠ **ocena** (vrednost na 1 vzorcu).
- Slučajno izbiro (ESV) uporabimo, ker lahko za ocene izračunamo **E, Var, SE** in porazdelitev.
- **C(N, n)** vseh vzorcev brez ponavljanja; vsak enako verjeten.
- **SE(ȳ)² = σ²/n · (N−n)/(N−1)**; ocena: s²/n · (N−n)/N.
- **Kakovost:** nepristranskost, učinkovitost, doslednost.
- **CLT:** n ≥ 100 → ocena ≈ normalna, g ~ N(E(g), SE(g)).

## V03 — 3. vaje (normalna porazdelitev, vzorčenje)

> ⚠️ Vsako nalogo začni z enoto in spremenljivko. Normalno porazdelitev zapiši kot Y ~ N(μ, σ). Ne piši »…«, ampak celotno verigo formul.

### Naloga 1: vijaki v škatlah — ⭐ tipičen izpitni primer
- **a) Enota:** ena kartonasta škatla. **Spremenljivka:** število zapakiranih vijakov v škatli (v vijakih), številska, diskretna (modeliramo jo z normalno), razmernostna.
- **Iz podatkov:** 95,44 % škatel je med 680 in 720 vijaki. To je **μ ± 2σ**, zato velja 700 ± 2σ = 720 → **σ = 10 vijakov**. **Y ~ N(700; 10)**.
- **b)** **Me = 700 vijakov**, **ker je normalna porazdelitev simetrična**. Polovica ploščine je levo od μ, polovica desno.
  - ⚠️ Utemeljitev »ker je pri normalni Me = μ« **ni dovolj**.
- **c)** Gostota: zvon nad osjo x »število vijakov v škatli«, os y je »gostota verjetnosti f(y)«; označi 670, 680, 690, **700**, 710, 720, 730.
- **d)** F(705) = P(Y ≤ 705) = P(Z ≤ (705 − 700)/10) = P(Z ≤ 0,5) = F(0,5) = **0,6915**.
  - 69,15 % škatel vsebuje do vključno 705 vijakov.
  - Na grafu gostote je to ploščina levo od 705.
- **Prevoj ogive**: porazdelitvena funkcija ima prevoj pri **y = μ = 700, kjer je F = 0,5**. Tam je najstrmejša, ker ima gostota tam vrh. Gostota (zvon) ima prevoja drugje, pri μ ± σ (690 in 710).
- ⚠️ **Past pri e):** študenti pri e) spet narišejo **zvon (gostoto)**. To je **NAROBE**! Porazdelitvena funkcija ni zvon.
- **e)** Porazdelitvena funkcija: krivulja S od 0 do 1, os y je F(y). Pri y = 705 je višina 0,6915, pri 700 pa 0,5.

- **f) 🏠 Domača naloga (dodatna alineja):** izračunajte 7. decil D₇.
  - Spada v družino **kvantilov**, zato potrebujemo **kvantilni rang P = 0,7**.
  - Iščemo y, ki razdeli populacijo na **70 % / 30 %**: F(y) = 0,70.
  - V tabeli je F(0,52) = 0,6985 (razlika 0,0015) in F(0,53) = 0,7019 (razlika 0,0019). Bližje je 0,52, zato z₀,₇₀ = 0,52.
  - D₇ = μ + z · σ = 700 + 0,52 · 10 = **705,2 vijaka**.
  - Interpretacija: 70 % škatel vsebuje do vključno 705,2 vijaka, 30 % pa več.
  - R: `qnorm(0.7, 700, 10)` = 705,24.

### Naloga 2: FotoExpert, garancija merilnikov — ⚠️ že bila na izpitu (študenti niso vedeli, za kaj gre)
- **Enota:** en merilnik osvetljenosti. **Spremenljivka:** **trajnost merilnika** (čas delovanja do večje napake, v letih), številska, zvezna, razmernostna.
- Profesor: zanima nas **trajnost**. Radi vidimo, da so **stroški** garancijskih popravil **nižji**.
- »Najpogosteje po 5 letih« pomeni Mo = 5, pri normalni pa velja Mo = μ. **Y ~ N(5 let; 1,56 leta)**.
- **a)** Proračun 120 000 € / 240 € = **500 izdelkov** = 500/5000 = **10 %** izdelkov se sme pokvariti v garanciji.
  - P(Y ≤ g) = 0,10 → z₀,₁₀ = −1,28 (tabela; R: −1,2816).
  - g = μ + z · σ = 5 + (−1,28) · 1,56 = 5 − 2,00 = **3,00 let**.
  - Odgovor: podjetje naj da garancijo **največ 3 leta**. Pri daljši garanciji bi se v garancijski dobi pokvarilo več kot 10 % izdelkov in stroški bi presegli 120 000 €.
  - R: `qnorm(0.10, 5, 1.56)` = 3,0008.
- **b)** Garancija 2 leti, proračun 12 000 € / 240 € = **50 izdelkov** = 50/5000 = **1 %**.
  - P(Y ≤ 2) = 0,01 → z₀,₀₁ = −2,33 (tabela; R: −2,3263).
  - z = (2 − 5)/σ_nov → σ_nov = (2 − 5)/(−2,33) = **1,288 leta** (R: 1,2896).
  - Profesor zaokroži **σ_nov = 1,29 leta**.
  - Sprememba: absolutno 1,29 − 1,56 = **−0,27 leta**; relativno 100 · (1,29 − 1,56)/1,56 = −17,31 % ≈ **−17,3 %** (profesorjev rezultat).
  - Standardni odklon bi se moral **zmanjšati** za 0,27 leta oz. **17,3 %**.
  - Za primerjavo: zdaj je P(Y ≤ 2) = 0,0272, kar pomeni 136 izdelkov oziroma 32 640 €.

### Naloga 3: pravilno / nepravilno
| | Trditev | Odgovor | Zakaj |
|---|---|---|---|
| a | Vsaka normalna porazdelitev je simetrična. | **DRŽI** | simetrična okoli μ. ⚠️ **Obratno ne drži:** vsaka simetrična porazdelitev ni normalna. |
| b | Pri Z je ~68,3 % vrednosti med −3 in +3. | **NE DRŽI** | za interval med −1 in +1 bi držalo (68,27 %); med −3 in +3 je **99,73 %** |
| c | Pri Z sta standardni odklon in varianca vedno enaka. | **DRŽI** | σ = 1, σ² = 1² = 1 |
| d | Vzorčni okvir je oštevilčen seznam vseh enot, zajetih v vzorec. | **NE DRŽI** | je oštevilčen seznam **vseh N enot populacije** |
| e | Iz N = 10 izberemo n = 3 brez ponavljanja; možnih vzorcev je 30. | **NE DRŽI** | (10 nad 3) = 10!/(3!·7!) = **120** |

- d in e sta bili rešeni po teoriji vzorčenja, potrjeno na vajah.
  - **d)** Pravilno je »seznam vseh enot **V POPULACIJI**«.
  - **e)** Vzorcev je **120**, zato trditev ne drži.
  - Dodatno vprašanje: verjetnost, da je izbran **točno določen** vzorec, je **1/120**. Pri ESV je vsak vzorec iste velikosti izbran z enako verjetnostjo.
- **Naloga 4 potrjena na vajah:** a) vzorčni delež, b) slučajna, c) pričakovani vrednosti, d) nepristranska.
- ✅ **S tem je zaključeno 1. poglavje (verjetnostne porazdelitve). Naprej: 2. poglavje, vzorčenje.**

### Primer z vaj: slovenska reprezentanca (vzorčenje)
- **Populacija:** 23 nogometašev v zapisniku na tekmi reprezentance, **N = 23**.
- **Enota:** en nogometaš. **Spremenljivka:** število reprezentančnih nastopov (v nastopih).
- **Parameter:** najpogostejši je aritmetična sredina, torej **μ = povprečno število nastopov** vseh 23 nogometašev.
- Selektor izbira prvo postavo (**n = 11**). Na koliko načinov jo lahko sestavi (tudi če je Oblak napadalec)? To je **število vseh možnih vzorcev** (priročnik, str. 24, binomski simbol):
  - (N nad n) = N! / (n! · (N − n)!) = 23! / (11! · 12!) = **1.352.078 enajsteric**.
  - R: `choose(23, 11)`.
- Na vsaki enajsterici (vzorcu) lahko izračunamo **oceno povprečja** ȳ. Dobimo 1.352.078 vzorčnih ocen, ki se med seboj razlikujejo. To vodi do **cenilke** in porazdelitve vzorčnih ocen.

- **Cenilka aritmetične sredine**:
  - Ocene povprečja se od vzorca do vzorca spreminjajo. Kar se v statistiki spreminja, lahko obravnavamo kot **spremenljivko**.
  - Cenilka ȳ je torej (slučajna) spremenljivka, njene vrednosti pa so ocene povprečij pri vseh možnih vzorcih.
- **Aritmetična sredina cenilke** je **povprečje vseh povprečij**. V matematiki ji rečemo **matematično upanje** oz. **pričakovana vrednost** cenilke, E(ȳ).
- **Čemu je enaka E(ȳ)?** Enaka je **μ**.
  - μ izračunamo iz 23 vrednosti (cela populacija).
  - E(ȳ) izračunamo iz 1.352.078 vzorčnih povprečij.
  - Obe dasta **isto število**.
- **Nepristranskost:** če je **pričakovana vrednost cenilke enaka vrednosti parametra**, E(g) = Γ, je **cenilka nepristranska**. Tu velja E(ȳ) = μ, zato je ȳ nepristranska cenilka za μ.
  - Pravilno je »**cenilka** je nepristranska«, ne »spremenljivka«.

- **Variabilnost cenilke** merimo z dvema parametroma (obrazci str. 25):
  1. **Varianca cenilke:** Var(ȳ) = σ²_Y / n · (N − n)/(N − 1).
     - ⚠️ Pazi na vrstni red: v števcu je **N − n**, v imenovalcu **N − 1**.
     - Iz vzorca jo ocenimo: var(ȳ) = s²_Y / n · (N − n)/N.
  2. **Standardni odklon cenilke** je koren variance. Ima posebno ime, ki je **neskončno pomembno: STANDARDNA NAPAKA**, SE(ȳ) = √Var(ȳ).
     - Ocena iz vzorca: se(ȳ) = s_Y/√n · √((N − n)/N).
     - Je v osnovnih merskih enotah spremenljivke.

### Naloga 4: manjkajoče besede
- a) f = n/N je **vzorčni delež**.
- b) Cenilka parametra je **slučajna** spremenljivka …
- c) Aritmetična sredina vseh vzorčnih ocen je enaka **pričakovani vrednosti (matematičnemu upanju)** vzorčnih ocen, E(g).
- d) Če je E(g) = Γ, je cenilka **nepristranska**.

---
