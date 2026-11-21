# Epizoda 2 — Verjetnostne porazdelitve in normalna porazdelitev

Predmet: Statistična analiza (2. letnik). Vir: lastni zapiski predavanj in vaj, pripravljeni za zvočno razlago.

## P02 — Verjetnostne porazdelitve

Gradivo: gradivo, R koda: gradivo.

### Prosojnice 2–10 (zamujeni del)

**Ponovitev P01:** populacija, enota, spremenljivka, parameter; srednje vrednosti, kvantili, mere variabilnosti; opisna (prave vrednosti parametrov) vs. sklepna statistika (vzorčne ocene → potrebujemo *porazdelitve vzorčnih ocen*, zato danes porazdelitve).

**Verjetnost in porazdelitev**
- Verjetnost = delež ugodnih izidov med vsemi izidi, vedno na [0, 1].
- **Frekvenčna porazdelitev** = *empirična*: histogram/poligon iz že zbranih podatkov.
- **Verjetnostna porazdelitev** = *teoretična*: model vseh možnih vrednosti + njihovih verjetnosti; velja tudi za prihodnje izide. Določena s F(y) ali f(y).

**Primer 2.1 (čistilci oken, n = 230):** frekvenčna tabela površine (m²/h) v razredih po 5, fk (frekvenca) in Fk (kumulativna). Histogram je približno zvonast → most do teoretične (normalne) porazdelitve. Fk/n ≈ to, kar je pri teoretični porazdelitvi F(y).

**Slučajna spremenljivka Y:** količina, katere vrednost je odvisna od slučaja. Določena z **zalogo vrednosti** (vse možne vrednosti) in **porazdelitvenim zakonom** (verjetnosti).
- diskretne (tabela, graf), zvezne (formula, graf), ostale (mešane).
- Primer 2.2: kocka → zaloga {1,…,6}, vsak izid 1/6 → **enakomerna** porazdelitev.

**Vrste porazdelitev**
- Diskretne: enakomerna; **Bernoullijeva** (2 izida, p in q = 1 − p, en met kovanca); **binomska** (št. uspehov v n poskusih *z vračanjem*); **hipergeometrična** (isto, *brez vračanja*); **Poissonova** (št. dogodkov na časovno/prostorsko enoto, parameter λ; npr. pacienti na urgenci v soboto).
- Zvezne: **normalna** (Gaussova, standardizirana Z), **Studentova t**, **χ²**, **F** — te štiri rabimo v sklepni statistiki.

**Gostota verjetnosti f(y)** (PDF): definirana za vse realne y; f(y) > 0 na nekem intervalu, drugje 0; graf = krivulja (analogija: poligon). **f(y) ni verjetnost**, verjetnost je **ploščina pod krivuljo**, celotna ploščina = 1.

**Porazdelitvena funkcija F(y) = P(Y ≤ y)** (CDF)
- monotono nepadajoča (a ≤ b → F(a) ≤ F(b));
- 0 ≤ F(y) ≤ 1; F(−∞) = 0, F(∞) = 1;
- F′(y) = f(y) in F(y₀) = ∫₋∞^y₀ f(y)dy (F je integral gostote).

**Graf F:** (1) kot *ploščina* pod gostoto levo od y₀; (2) kot *krivulja* v obliki črke »S« (analogija: ogiva / kumulativa pri frekvenčnih porazdelitvah).

### Izračunavanje osnovnih verjetnosti pri zveznih porazdelitvah ⭐

Vse se prevede na **F** (ploščino levo od meje):

| Verjetnost | Formula | Na sliki |
|---|---|---|
| P(Y ≤ a) | = ∫₋∞ᵃ f(y)dy = **F(a)** | modro – vse levo od a |
| P(Y > b) | = ∫ᵦ^∞ f(y)dy = F(∞) − F(b) = **1 − F(b)** | rdeče – desni rep |
| P(a < Y ≤ b) | = ∫ₐᵇ f(y)dy = **F(b) − F(a)** | zeleno – med a in b |
| P(Y = a) | = **0** | ena točka nima ploščine |

- **F(a) = kvantilni rang** vrednosti a (delež enot z vrednostjo ≤ a).
- **F(∞) = 1** = celotna ploščina → zato je »več kot b« = 1 − »do b« (komplement).
- **F(b) − F(a) ≠ F(b − a)!** (profesorjeva opomba na tabli). F(b−a) bi bila ploščina levo od *vrednosti* b−a, kar je nekaj čisto drugega. Pravilno: vzameš vse do b in odšteješ vse do a.
- Ker je P(Y = a) = 0, pri zveznih spremenljivkah **≤ in < pomenita isto** (P(Y ≤ a) = P(Y < a)). Pri diskretnih to NE velja.
- V R/notaciji tudi `Pr()` ali `Prob()` = isto kot P().

Primer (normalna, μ = 0, σ = 1): F(1) = 0,8413, F(−1) = 0,1587
→ P(Y > 1) = 1 − 0,8413 = 0,1587; P(−1 < Y ≤ 1) = 0,8413 − 0,1587 = 0,6827.

### Normalna porazdelitev ⭐

**Definicija**
- Osnovna porazdelitev sklepne statistike, zvezna, y od −∞ do +∞.
- Gostota: f(y) = 1/(σ√(2π)) · e^(−(y−μ)²/(2σ²)). Formule se ne učiš na pamet — bistvo: odvisna je **samo od μ in σ**. F(y₀) = integral te gostote do y₀ (ročno se ne da izračunati → tabela ali R `pnorm`).
- Zapis: **Y ~ N(μ, σ)** = »Y se porazdeljuje normalno s povprečjem μ in standardnim odklonom σ«.
  - ⚠️ Pri tem predmetu je drugi parameter **σ (standardni odklon)**, ne varianca σ² (v nekaterih knjigah je N(μ, σ²)). R `pnorm(x, mean, sd)` prav tako sprejme sd.
- **Družina** porazdelitev — konkretno določata 2 parametra: **μ = lega** (kje je vrh), **σ = oblika/razpotegnjenost** (kako širok je zvon).
- Grške črke, ker gre za populacijske parametre (teoretični model).

**Zapis Y ~ N(μ, σ) — razčlenjeno**

| Del | Pomen |
|---|---|
| **Y** | slučajna spremenljivka (velika črka = količina, ki še ni izmerjena, npr. masa naključnega jabolka) |
| **~** (tilda) | »se porazdeljuje kot« / »ima porazdelitev« (ne »je enako«, ne »približno«) |
| **N** | ime porazdelitve: Normalna (podobno: t, χ², F, B(n, p) binomska, Po(λ) Poissonova) |
| **μ** | 1. parameter = povprečje = sredina zvona (lega) |
| **σ** | 2. parameter = standardni odklon = širina zvona (pri tem predmetu σ, ne σ²!) |

- Primer 2.3: **Y ~ N(150, 30)** → Y = masa jabolka v g, normalna, μ = 150 g, σ = 30 g.
- **Z ~ N(0, 1)** = standardizirana normalna (μ = 0, σ = 1) — rabimo pri tabelah.
- Zapis pove *celotno* porazdelitev: iz njega izračunaš katerokoli verjetnost (npr. P(Y ≤ 100)).
- Pozor: tilda ima v R drug pomen (`y ~ x` = formula modela, »y v odvisnosti od x«) — ne mešaj.

**Zakaj populacijske oznake (μ, σ)?**
- Lep, gladek zvon dobimo šele pri **zelo velikem številu enot** → normalna porazdelitev je model *populacije* → zato μ, σ (ne x̄, s).
- Majhen vzorec da »stopničast«, nepravilen histogram, ki je le približek zvona.
- Zaenkrat: kako se porazdeljuje **osnovna spremenljivka Y** (npr. masa *posameznega* jabolka).
- Kasneje: **vzorci** → kako se porazdeljujejo *vzorčne ocene* (npr. povprečje x̄ iz vzorca n jabolk) — to je osnova sklepne statistike.

| | populacija (parameter) | vzorec (ocena) |
|---|---|---|
| povprečje | μ | x̄ |
| standardni odklon | σ | s |
| velikost | N | n |

**σ ali σ²?** Varianca σ² = σ·σ, σ = √σ². Nekateri učbeniki pišejo N(μ, σ²) → N(150, 900) je ISTA porazdelitev kot N(150, 30). Na izpitu preveri, kateri zapis je uporabljen (pri nas σ). σ je v **istih enotah** kot Y (g), σ² v kvadratnih (g²) → σ je lažje razlagati.

**Graf:** večji μ → zvon se premakne desno (oblika enaka); večji σ → zvon nižji in širši (ploščina ostane 1).

**Lastnosti**
- **simetrična** okoli μ → F(μ) = 0,5 → **Me = μ** (polovica levo, polovica desno);
- **unimodalna** (en vrh) → **μ = Me = Mo**;
- repi se asimptotično približujejo osi x (nikoli je ne dotaknejo);
- delež vrednosti na [μ − kσ, μ + kσ] je odvisen **samo od k** (ne od μ, σ):
  - k = 1 → **68,27 %**
  - k = 2 → **95,44 %**
  - k = 3 → **99,73 %**

**Profesor na predavanju:**
- Simetrija = če zvon prepogneš po μ, se levi rep pokrije z desnim.
- **Mediana** razdeli ploščino pod krivuljo točno na pol (50 % : 50 %) → zaradi simetrije leži točno pri μ.
- En vrh → **unimodalna** (enomodalna) → vrh (Mo) je v isti točki → **μ = Me = Mo** (vse tri srednje vrednosti enake).
- ⚠️ **Izpitna past:** »Koliko je mediana in zakaj?« → pravilna razlaga je **»ker je porazdelitev simetrična«**. Razlaga »ker pri normalni porazdelitvi velja Me = μ« ni dovolj (to je samo ponovitev trditve, ne razlog) → izgubiš točke za utemeljitev.
- Repi se osi x strogo vzeto nikoli ne dotaknejo (asimptota) — pri risanju profesorica ni stroga.
- Pravilo **68–95–99,7**: μ ± 1σ ≈ 68 % (≈ 2/3), μ ± 2σ ≈ 95,4 %, μ ± 3σ ≈ 99,7 % — velja za **vsako** normalno porazdelitev.
- Zgled vpr. 1 (pr. 24, detergent N(5; 0,05)): pravilen je **E** (Me = Q2 = 5 l). D je napačen, ker je pri normalni Me = Mo.

**Pogosti k:** k = 0,67 → 50 % (med Q1 in Q3), k ≈ 1 → 68 %, **k = 1,96 → 95 %**, **k = 2,58 → 99 %** (to bosta ključni števili pri intervalih zaupanja).

Primer: IQ ~ N(100, 15) → 68 % ljudi ima IQ med 85 in 115, 95 % med 70 in 130.

**k = 1,96:** μ ± 1,96σ vsebuje **točno 95 %** vrednosti (k = 2 da 95,44 %, torej malo preveč). Ostane 5 % → **2,5 % v vsakem repu** (simetrija). F_Z(1,96) = 0,975. Podobno k = 2,58 → točno 99 % (0,5 % v vsakem repu), k = 0,67 → 50 % (med Q1 in Q3). Uporaba: 95 % in 99 % intervali zaupanja ter testi (α = 0,05 / 0,01). Jabolka N(150, 30): 95 % jih tehta med 150 ± 1,96·30 = 91,2 g in 208,8 g.
⭐⭐ **Profesorica: 1,96 si boste zapomnili hočeš nočeš — pojavlja se povsod.** (95 % ↔ 1,96; 99 % ↔ 2,58)

### Primer 2.3 — jabolka, Y ~ N(150, 30)

**a) P(Y < 150) = ?** → 150 = μ, porazdelitev je simetrična → polovica ploščine je levo od μ → **P(Y < 150) = F(150) = 0,5 = 50 %**. Brez računanja, brez tabele. (Ker je zvezna, je P(Y < 150) = P(Y ≤ 150).) R: `pnorm(150, 150, 30)` = 0,5.

**b) Kolikšen odstotek jabolk tehta 100 g ali manj? P(Y ≤ 100)** (21)
1. Standardiziraj: z = (100 − 150) / 30 = **−1,67** → 100 g je 1,67 standardnega odklona *pod* povprečjem.
2. F_Y(100) = F_Z(−1,67).
3. Tabela ima običajno samo pozitivne z → simetrija: F_Z(−1,67) = 1 − F_Z(1,67) = 1 − 0,9525 = **0,0475**.
4. **≈ 4,75 %** jabolk tehta 100 g ali manj (R: `pnorm(100, 150, 30)` = 0,0478; razlika zaradi zaokrožitve z).
- Preveri smiselnost: 100 g je med μ − 1σ (120, levi rep ≈ 16 %) in μ − 2σ (90, levi rep ≈ 2,3 %) → odgovor med 2,3 % in 16 % ✔.

### Standardizirana normalna porazdelitev Z ⭐

- **Z = (Y − μ) / σ** → **Z ~ N(0, 1)** (μ_Z = 0, σ_Z = 1). Na pr. 17 je izpeljava: E(Z) = 0, var(Z) = 1 — ni za na pamet, bistvo je rezultat.
- Ideja: vsako normalno Y (jabolka, IQ, plače …) **premaknemo** (−μ → center v 0) in **raztegnemo/stisnemo** (/σ → širina 1) → vse postanejo ENA porazdelitev → **ena tabela** za vse.
- **z pove, za koliko standardnih odklonov je vrednost od povprečja**: z > 0 nad, z < 0 pod, z = 0 točno povprečje. (Jabolko 100 g → z = −1,67; jabolko 210 g → z = +2.)
- Ploščine se pri pretvorbi ne spremenijo: **F_Y(a) = F_Z(z_a)**.
- Dve smeri:
  1. **imam vrednost a → iščem verjetnost**: z_a = (a − μ)/σ → tabela → F_Z(z_a).
  2. **imam verjetnost P → iščem vrednost a** (kvantil): v tabeli poišči z s F_Z(z) = P → **a = μ + z·σ**.
- Uporaba tudi za primerjavo različnih spremenljivk (npr. kdo je relativno boljši: 1,5σ nad povprečjem pri enem predmetu vs. 1σ pri drugem).

### Primer 2.4: P(Y > μ + 2σ) = ?
- z = ((μ + 2σ) − μ)/σ = **2** (velja za vsako normalno — μ in σ se pokrajšata).
- P(Y > a) = 1 − F_Y(a) = 1 − F_Z(2) = 1 − 0,9772 = **0,0228 = 2,28 %** (desni rep).
- Preverba s pravilom 68–95–99,7: μ ± 2σ = 95,44 % → zunaj 4,56 % → polovica v desnem repu = 2,28 % ✔.
- = odgovor B pri zgledu na pr. 25 (detergent nad 5,1 l = μ + 2σ).

### ⭐⭐ Kako zapisati rešitev na izpitu (profesorica: sam rezultat NI dovolj)
1. **Zapis porazdelitve:** Y ~ N(150, 30)
2. **Kaj iščem (simbolno):** P(Y ≤ 100) = F_Y(100)
3. **Standardizacija:** z = (100 − 150)/30 = −1,67
4. **Pretvorba + tabela:** F_Y(100) = F_Z(−1,67) = 1 − F_Z(1,67) = 1 − 0,9525 = 0,0475
5. **Interpretacija v besedah (s kontekstom in enotami):** »Verjetnost, da slučajno izbrano jabolko tehta 100 g ali manj, je 0,0475 (oz. približno 4,75 % jabolk tehta 100 g ali manj).«
(+ po možnosti skica zvona s pobarvano ploščino)

### Primer 2.3 — nadaljevanje

**c) Zaboj s 600 jabolki — koliko jih tehta med 100 in 160 g?**
1. Y ~ N(150, 30); iščem P(100 < Y ≤ 160) = F_Y(160) − F_Y(100)
2. z₁₆₀ = (160 − 150)/30 = 0,33; z₁₀₀ = −1,67
3. F_Z(0,33) − F_Z(−1,67) = 0,6293 − 0,0475 = **0,5818**
4. Število jabolk: 0,5818 · 600 ≈ **349 jabolk**
5. »V zaboju s 600 jabolki pričakujemo približno 349 jabolk z maso med 100 in 160 g.«
- R: `(pnorm(160,150,30) - pnorm(100,150,30)) * 600` ≈ 349,7
- Pazi: F(b) − F(a), NE F(b − a) = F(60)!

**d) Verjetnost, da je jabolko težje od ___ g, je 0,25** → obratna smer (imam verjetnost, iščem vrednost = kvantil)
1. P(Y > a) = 0,25 → P(Y ≤ a) = F_Y(a) = 0,75 → a je **3. kvartil Q3**
2. V tabeli poiščem z, kjer F_Z(z) = 0,75 → **z ≈ 0,67** (glej k = 0,67 na pr. 15!)
3. a = μ + z·σ = 150 + 0,67 · 30 ≈ **170 g**
4. »Verjetnost, da je slučajno izbrano jabolko težje od 170 g, je 0,25 (četrtina jabolk tehta več kot 170 g).«
- R: `qnorm(0.75, 150, 30)` = 170,2 (qnorm = obratno od pnorm: iz verjetnosti → vrednost)

---

## V02 — 2. vaje (razvrščeni podatki, normalna porazdelitev)

> ⚠️ **Izpit:** **vsako nalogo začni z enoto in spremenljivko** (z mersko enoto). Če ju zamenjaš, imaš lahko pri nalogi **0 točk**.

### Naloga 1: reprezentančni nastopi (vzorec 100 nogometašev, FIFA)
- **Enota:** en nogometaš.
- **Spremenljivka:** število reprezentančnih nastopov (v nastopih). Je številska, diskretna in razmernostna.
- Podatki so že **razvrščeni**. V R jih z ukazom `rep()` »razpihnemo« nazaj na 100 vrednosti: vsako sredino razreda ponovimo fₖ-krat. Brez tega bi R mislil, da ima samo 6 opazovanj.

| k | Št. nastopov | fₖ | yₖ | fₖ° | Fₖ° |
|---|---|---|---|---|---|
| 1 | do 20 | 24 | 10 | 0,24 | 0,24 |
| 2 | nad 20 do 40 | 36 | 30 | 0,36 | 0,60 |
| 3 | nad 40 do 60 | 18 | 50 | 0,18 | 0,78 |
| 4 | nad 60 do 80 | 12 | 70 | 0,12 | 0,90 |
| 5 | nad 80 do 100 | 7 | 90 | 0,07 | 0,97 |
| 6 | nad 100 do 120 | 3 | 110 | 0,03 | 1,00 |

- **a)** ȳ = 40,2 nastopa; s² = 707,03; s = 26,59 nastopa; kv = 0,66 → standardni odklon je 66 % povprečja.
- **b)** Me = 30 → razred **nad 20 do 40** nastopov; Q₃ = 50 → razred **nad 40 do 60** nastopov.
- **c)** Primer za 3. razred:
  - f₃° = 0,18: 18 % nogometašev v vzorcu ima nad 40 do vključno 60 nastopov.
  - F₃° = 0,78: 78 % nogometašev v vzorcu ima do vključno 60 nastopov.
- **Modus**: pri razvrščenih podatkih je modus **vedno sredina razreda z največjo frekvenco**. Tu je to Mo = 30 (2. razred, f₂ = 36).
- **d)** Histogram (`hist`) ali `ggplot`. Porazdelitev je **asimetrična v desno**: Mo = 30 ≤ Me = 30 < ȳ = 40,2 in dolg desni rep.
- **e)** Peš račun, 3. razred:
  - f₃y₃ = 18 · 50 = 900;
  - f₃(y₃ − ȳ)² = 18 · (50 − 40,2)² = 1728,72;
  - vsote: Σfₖyₖ = 4020, Σfₖ(yₖ − ȳ)² = 69996;
  - ȳ = 4020/100 = 40,2;
  - s² = 69996/99 = 707,03;
  - s = √707,03 = 26,59.

#### Naloga 1 v R (razlaga profesorja)
- **`print(podatki)`** izpiše vse vrednosti.
  - Tu izpiše 6 vrstic, zato R misli, da je nogometašev 6. R ne ve, kaj je frekvenca.
  - Za pravilne rezultate potrebujemo **100 vrstic**: vrstica z 10 nastopi se mora pojaviti **24-krat** itd.
- **`rep(…, times = podatki$Frekvenca)`** je ukaz za **reprodukcijo vrstic**. Vsako vrstico ponovi tolikokrat, kolikor znaša njena frekvenca.
- **`table()`** izpiše, kolikokrat se posamezna vrednost pojavi. Služi kot kontrola: 24, 36, 18, 12, 7, 3.
- **`stat.desc()`** je iz knjižnice `pastecs`; `round(…, 2)` zaokroži na 2 decimalki.
- **`summary()`** je že v osnovnem R, zato ne potrebuje nobene knjižnice.
  - Izpiše Min, 1st Qu., Median, Mean, 3rd Qu., Max.
- **Mediana** spada med **kvantile**, ki delijo populacijo na dva dela.
  - Njen **kvantilni rang je 0,5** (50/50).
  - Interpretacija: »Ocenjujemo, da ima polovica nogometašev **do vključno 30** reprezentančnih nastopov, preostala polovica pa več kot toliko.«
- **Frekvenčna porazdelitev** se oblikuje z `frq` (sjmisc) ali `freq` (summarytools).
  - Value so sredine razredov, N so frekvence.
  - Sledita dve skupini relativnih frekvenc, ki sta enaki, ker nimamo manjkajočih vrednosti.
  - Zadnji stolpec je kumulativa (relativnih) frekvenc.
- **Izpis `freq` (summarytools)** za V02:
  ```
          Freq  % Valid  % Valid Cum.  % Total  % Total Cum.
     10     24    24.00         24.00    24.00         24.00
     30     36    36.00         60.00    36.00         60.00
     50     18    18.00         78.00    18.00         78.00
     70     12    12.00         90.00    12.00         90.00
     90      7     7.00         97.00     7.00         97.00
    110      3     3.00        100.00     3.00        100.00
   <NA>      0                           0.00        100.00
  Total    100   100.00        100.00   100.00        100.00
  ```
  - Freq je fₖ, % Valid je fₖ° brez manjkajočih, % Valid Cum. je Fₖ° brez manjkajočih.
  - % Total in % Total Cum. sta isto z manjkajočimi vrednostmi.
  - Za razliko od `frq` ima kumulativo za obe skupini in vrstico **Total**.
- **Manjkajoče vrednosti iz kumulative** (vaja za kolokvij):
  - fₖ° = Fₖ° − Fₖ₋₁° (npr. 78 − 60 = 18 %);
  - fₖ = fₖ° · n (0,18 · 100 = 18);
  - če manjka n: n = fₖ / fₖ°.
- **Relativna frekvenca:** f₃° = f₃/n = 18/100 = 0,18 = 18 %. Formula je v **priročniku na str. 11**.

### Naloga 2: porodna teža ~ N(3,4; 0,3) kg
- **Normalna porazdelitev je najpomembnejša porazdelitev v statistiki**.
- ⭐ **Definitivno na kolokviju in izpitu: kaj moramo vedeti o normalni porazdelitvi**
  1. Je **zvezna** porazdelitev.
  2. Določata jo **2 parametra**: aritmetična sredina μ in standardni odklon σ. Zapis: Y ~ N(μ, σ).
  3. Vrednosti se **gostijo okrog aritmetične sredine**, **standardni odklon pa meri njihovo variabilnost**.
  4. Je **unimodalna** in **simetrična**, zato velja Mo = Me = μ.
  5. Znati jo moraš **narisati**:
     - zvonasta krivulja, vrh nad μ;
     - na osi x označi μ ter μ ± σ, μ ± 2σ, μ ± 3σ;
     - prevoja sta pri μ ± σ;
     - repa se približujeta osi, a se je nikoli ne dotakneta.

  - **Gostota verjetnosti f(y)**: preprosto povedano, je to **ime za krivuljo** (zvon).
    - Njena **višina ni verjetnost**; verjetnost je **ploščina pod njo**.
    - V R: `dnorm` vrne višino krivulje, `pnorm` pa ploščino.
    - Vir: **priročnik, str. 23**.
  > 🟥 **RDEČ OKVIRČEK (tabla):** **F(y) = P(Y ≤ y) = f°(Y ≤ y)**
  > Verjetnost, da Y zavzame vrednost ≤ y, je enaka deležu enot z vrednostjo ≤ y.

  **Tri osnovne verjetnosti (tabla):**
  | Verjetnost | Porazdelitvena funkcija | Integral | Ploščina |
  |---|---|---|---|
  | P(Y ≤ a) | = F(a) | = ∫₋∞ᵃ f(y) dy | levo od a |
  | P(Y > b) | = 1 − F(b) | = ∫_b^∞ f(y) dy | desno od b |
  | P(a < Y ≤ b) | = F(b) − F(a) | = ∫ₐᵇ f(y) dy | med a in b |

  - **Pri zveznih porazdelitvah imamo vedno intervale**. Verjetnost posamezne vrednosti je P(Y = a) = 0, ker ena točka nima ploščine. Zato je vseeno, ali pišemo < ali ≤.
  - **Standardizacija** (profesor: uvedel jo je Gauss):
    - vsak y spremenimo v **standardizirano vrednost z = (y − μ) / σ**;
    - dobimo spremenljivko **Z ~ N(0, 1)**;
    - standardiziramo lahko **VSE normalne porazdelitve**, zato zadošča ena tabela.
    - Zgodovinsko je po Gaussu poimenovana normalna (Gaussova) porazdelitev, tabele za Z pa so nastale kasneje. Za izpit uporabi profesorjevo razlago.
  - Priročnik, ki ga profesor kaže na ekranu, je **Statistični priročnik** (pogl. 9.2 Normalna porazdelitev).
  - **Porazdelitvena funkcija**: vsako **verjetnostno** porazdelitev (diskretno in zvezno) lahko ponazorimo s porazdelitveno funkcijo **F(y) = P(Y ≤ y)**.
    - Pove, kolikšna je verjetnost, da spremenljivka Y zavzame vrednost, **manjšo ali kvečjemu enako** izbrani vrednosti y.
    - Pri zvezni porazdelitvi je to **ploščina pod gostoto levo od y**.
    - V R: `pnorm(y, μ, σ)`. Primer: F(3,7) = 0,8413.
    - Velike črke pomenijo spremenljivko (Y), male pa izbrano vrednost (y).
    - **Povezava z relativno frekvenco**: relativna frekvenca je **delež enot**. F(y) lahko zapišemo tudi kot **f°(Y ≤ y)**.
      - Pove, **kolikšen delež enot ima vrednost spremenljivke manjšo ali kvečjemu enako y**.
      - To je analogija s **kumulativo relativnih frekvenc** Fₖ° iz frekvenčne tabele.
      - Primer: F(3,7) = 0,8413 pomeni, da ima 84,13 % novorojenčkov porodno težo do vključno 3,7 kg.
  6. **Ploščina pod krivuljo je enaka 1** (100 %). Če gremo v povprečje, je levo od μ točno **0,5**, desno pa **0,5**, ker je porazdelitev simetrična. Glej tudi P02, pr. 8 in 12.
- ⚠️ **Izpit:** če se spremenljivka porazdeljuje normalno, **vedno zapiši** Y ~ N(μ, σ). Tu: **Y ~ N(3,4 kg; 0,3 kg)**.
- **Enota:** en novorojenček. **Spremenljivka:** porodna teža (v kg), številska, zvezna, razmernostna, porazdeljena normalno.
- »Največ novorojenčkov je težkih 3,4 kg« pomeni Mo = 3,4. Pri normalni porazdelitvi velja **Mo = Me = μ**.
- ⚠️ **Izpit:** **ne piši »…«**. Vsakič ponovi celotno verigo formul, od verjetnosti do rezultata.
- **a)** P(Y ≤ 3,7) = P(Z ≤ (3,7 − 3,4)/0,3) = P(Z ≤ 1) = F(1) = **0,8413**. R: `pnorm(3.7, 3.4, 0.3)`.
- **b)** P(3,1 < Y < 4,0) = 0,9772 − 0,1587 = **0,8186** → 81,86 %.
- **c)** P(Y > 4,2) = `pnorm(4.2, 3.4, 0.3, lower.tail = FALSE)` = **0,0038** → 0,38 %.
- **d) Iskanje z v tabeli**: poglej v tabelo in vzemi vrednost, ki je **bližje** iskani ploščini.
  - F(0,25) = 0,5987 je od 0,60 oddaljena 0,0013, F(0,26) = 0,6026 pa 0,0026.
  - Bližje je 0,25, zato z = −0,25 (zaradi simetrije negativen).
- **d)** `qnorm(0.60, 3.4, 0.3, lower.tail = FALSE)` = **3,32 kg**. Izračunani vrednosti pravimo **kvantil** (P₄₀, 40. percentil).

### Naloga 3: trajnost pnevmatik ~ N(50 000; 2 880) km, garancija 45 000 km — 🏠 DOMAČA NALOGA
- **Enota:** ena pnevmatika tipa XYZ. **Spremenljivka:** trajnost pnevmatike (v prevoženih km), številska, zvezna, razmernostna, porazdeljena normalno.
- **a)**
  - z = (45 000 − 50 000)/2 880 = −1,74;
  - P(Y < 45 000) = **0,0413** → 4,13 % pnevmatik se izrabi pred iztekom garancije.
- ⭐ **Vprašanje b (sprememba) je pogosto na izpitu.** Formule zanj ni, zato greš **po korakih**:
  1. **Stanje pred spremembo:** iz a) je f°(Y ≤ 45 000) = **4,09 %**.
  2. **Kaj se je spremenilo?** Koeficient variacije se je povečal za 50 %.
     - KV₁ = σ₁/μ = 2 880/50 000 = 0,0576;
     - KV₂ = KV₁ · 1,5 = 0,0576 · 1,5 = 0,0864;
     - μ ostane enak, zato se spremeni σ: KV₂ = σ₂/μ → σ₂ = KV₂ · μ = 0,0864 · 50 000 = **4 320 km**.
     - Standardni odklon je zrasel.
  3. **Stanje po spremembi:**
     - z = (45 000 − 50 000)/4 320 = **−1,16**;
     - f°(Y ≤ 45 000) = f°(Z ≤ −1,16) = 0,1230 = **12,30 %**.

  4. **Izračun spremembe:**
     - **Absolutna** sprememba je odštevanje, PO − PRED (izhodišče je stanje prej): 12,30 % − 4,09 % = **8,21 ODSTOTNE TOČKE** (ne %!).
     - **Relativna** sprememba je **vedno v %**, ne glede na merske enote. Absolutno spremembo primerjamo s stanjem prej: 100 · (PO − PRED)/PRED = 100 · 8,21/4,09 = **200,7 %**.
  - **Odgovor:** »Pri danih spremembah bi se odstotek pnevmatik, ki se izrabijo pred iztekom garancije, **POVEČAL** za 8,21 odstotne točke oz. za 200,7 %.«
  - ⚠️ Ne piši »spremenil«, ampak napiši smer: **povečal / zmanjšal**.
- **a) s tabelo:** z = −1,74 → F(−1,74) = 1 − F(1,74) = 1 − 0,9591 = **0,0409** → 4,09 %.
- **b)** kv se poveča za 50 %, μ ostane enak, zato σ = 1,5 · 2 880 = 4 320.
  - **S tabelo:** z = −1,16 → F(−1,16) = 1 − 0,8770 = **0,1230**.
  - Absolutna sprememba: 0,1230 − 0,0409 = **+8,21 o. t.**; relativna: 0,0821/0,0409 = **+200,7 %**.
  - Vrednosti iz R so navedene spodaj.
  - z = −1,16 → P = **0,1236**;
  - absolutna sprememba: +0,0823 = **+8,23 odstotne točke**;
  - relativna sprememba: 0,0823/0,0413 = **+199 %**.

---
