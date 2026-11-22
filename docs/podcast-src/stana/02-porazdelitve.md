# Epizoda 2 — Verjetnostne porazdelitve in normalna porazdelitev

Tema: Statistična analiza. Lastna razlaga snovi z lastnimi primeri.

## Verjetnost in porazdelitev

- Za sklepno statistiko potrebujemo *porazdelitve vzorčnih ocen*, zato najprej spoznamo verjetnostne porazdelitve.
- Verjetnost = delež ugodnih izidov med vsemi izidi, vedno na [0, 1].
- **Frekvenčna porazdelitev** = *empirična*: histogram ali poligon iz že zbranih podatkov.
- **Verjetnostna porazdelitev** = *teoretična*: model vseh možnih vrednosti in njihovih verjetnosti; velja tudi za prihodnje izide. Določena je s F(y) ali f(y).
- **Lasten primer:** časi 250 tekačev na 5 km, razvrščeni v razrede po 2 minuti. Histogram je približno zvonast, zato ga lahko nadomestimo s teoretično (normalno) porazdelitvijo. Kumulativni delež Fₖ/n je približek tega, kar je pri teoretični porazdelitvi F(y).

**Slučajna spremenljivka Y:** količina, katere vrednost je odvisna od slučaja. Določena je z **zalogo vrednosti** (vse možne vrednosti) in **porazdelitvenim zakonom** (verjetnosti).
- diskretne (tabela, graf), zvezne (formula, graf), mešane;
- lasten primer: kolo sreče z 8 enakimi polji → zaloga {1, …, 8}, vsak izid 1/8 → **enakomerna** porazdelitev.

**Vrste porazdelitev**
- Diskretne: enakomerna; **Bernoullijeva** (2 izida, p in q = 1 − p, npr. en met kovanca); **binomska** (število uspehov v n poskusih *z vračanjem*); **hipergeometrična** (isto, *brez vračanja*); **Poissonova** (število dogodkov na časovno ali prostorsko enoto, parameter λ; npr. klici na servisno linijo v eni uri).
- Zvezne: **normalna** (Gaussova, standardizirana Z), **Studentova t**, **χ²**, **F** — te štiri rabimo v sklepni statistiki.

**Gostota verjetnosti f(y):** definirana za vse realne y; f(y) > 0 na nekem intervalu, drugje 0; graf je krivulja (analogija: poligon). **f(y) ni verjetnost**, verjetnost je **ploščina pod krivuljo**, celotna ploščina je 1.

**Porazdelitvena funkcija F(y) = P(Y ≤ y)**
- monotono nepadajoča (a ≤ b → F(a) ≤ F(b));
- 0 ≤ F(y) ≤ 1; F(−∞) = 0, F(∞) = 1;
- F′(y) = f(y) in F(y₀) = ∫₋∞^y₀ f(y)dy (F je integral gostote).
- Graf F: (1) kot *ploščina* pod gostoto levo od y₀; (2) kot *krivulja* v obliki črke »S« (analogija: kumulativa pri frekvenčnih porazdelitvah).
- **Povezava z deleži:** F(y) = P(Y ≤ y) = f°(Y ≤ y). Verjetnost, da Y zavzame vrednost ≤ y, je enaka deležu enot z vrednostjo ≤ y. To je teoretični dvojnik kumulative relativnih frekvenc Fₖ°.

## Izračunavanje verjetnosti pri zveznih porazdelitvah ⭐

Vse se prevede na **F** (ploščino levo od meje):

| Verjetnost | Formula | Ploščina |
|---|---|---|
| P(Y ≤ a) | = ∫₋∞ᵃ f(y)dy = **F(a)** | vse levo od a |
| P(Y > b) | = ∫ᵦ^∞ f(y)dy = **1 − F(b)** | desni rep |
| P(a < Y ≤ b) | = ∫ₐᵇ f(y)dy = **F(b) − F(a)** | med a in b |
| P(Y = a) | = **0** | ena točka nima ploščine |

- **F(a) = kvantilni rang** vrednosti a (delež enot z vrednostjo ≤ a).
- **F(∞) = 1** = celotna ploščina → zato je »več kot b« = 1 − »do b«.
- **F(b) − F(a) ≠ F(b − a)!** F(b − a) bi bila ploščina levo od *vrednosti* b − a, kar je nekaj čisto drugega. Pravilno: vzameš vse do b in odšteješ vse do a.
- Ker je P(Y = a) = 0, pri zveznih spremenljivkah **≤ in < pomenita isto**. Pri diskretnih to NE velja.

Primer (μ = 0, σ = 1): F(1) = 0,8413, F(−1) = 0,1587 → P(Y > 1) = 0,1587; P(−1 < Y ≤ 1) = 0,6826.

## Normalna porazdelitev ⭐

**Definicija**
- Osnovna porazdelitev sklepne statistike, zvezna, y od −∞ do +∞.
- Gostota: f(y) = 1/(σ√(2π)) · e^(−(y−μ)²/(2σ²)). Formule se ne učiš na pamet; bistvo je, da je odvisna **samo od μ in σ**. F(y₀) se ročno ne da izračunati → tabela ali R `pnorm`.
- Zapis: **Y ~ N(μ, σ)** = »Y se porazdeljuje normalno s povprečjem μ in standardnim odklonom σ«.
  - Pri tem predmetu je drugi parameter **σ (standardni odklon)**, ne varianca σ². Nekateri učbeniki pišejo N(μ, σ²): N(32, 36) je tam ista porazdelitev kot naša N(32, 6). Tudi R `pnorm(x, mean, sd)` sprejme standardni odklon.
- **Družina** porazdelitev: **μ = lega** (kje je vrh), **σ = razpotegnjenost** (kako širok je zvon). Večji μ → zvon se premakne desno; večji σ → zvon nižji in širši, ploščina ostane 1.

| Del zapisa | Pomen |
|---|---|
| **Y** | slučajna spremenljivka (velika črka = še neizmerjena količina) |
| **~** | »se porazdeljuje kot« (ne »je enako«) |
| **N** | ime porazdelitve (podobno t, χ², F, B(n, p), Po(λ)) |
| **μ** | povprečje = sredina zvona |
| **σ** | standardni odklon = širina zvona |

- **Z ~ N(0, 1)** = standardizirana normalna porazdelitev; zanjo so tabele.
- V R ima tilda drug pomen (`y ~ x` je formula modela) — ne mešaj.
- **Zakaj grške črke?** Gladek zvon dobimo šele pri zelo velikem številu enot, zato je normalna porazdelitev model *populacije*. Majhen vzorec da stopničast histogram, ki je le približek zvona. Kasneje bomo enako logiko uporabili za porazdelitev *vzorčnih ocen*.

**Lastnosti**
- **simetrična** okoli μ → F(μ) = 0,5 → **Me = μ**;
- **unimodalna** → **μ = Me = Mo**;
- repi se osi x asimptotično približujejo, a je nikoli ne dotaknejo;
- prevoja gostote sta pri μ ± σ;
- delež vrednosti na [μ − kσ, μ + kσ] je odvisen **samo od k**:
  - k = 1 → **68,27 %**
  - k = 2 → **95,44 %**
  - k = 3 → **99,73 %**
- **Pogosta past pri utemeljevanju:** »Koliko je mediana in zakaj?« Pravilna utemeljitev je **»ker je porazdelitev simetrična«** (polovica ploščine je levo od μ, polovica desno). Stavek »ker pri normalni porazdelitvi velja Me = μ« je le ponovitev trditve, ne razlog.

**Kaj moraš o normalni porazdelitvi znati povedati:**
1. je **zvezna**;
2. določata jo **2 parametra**, μ in σ; zapis Y ~ N(μ, σ);
3. vrednosti se **gostijo okrog povprečja**, σ meri njihovo variabilnost;
4. je **unimodalna** in **simetrična**, zato Mo = Me = μ;
5. znati jo moraš **narisati**: zvon z vrhom nad μ, na osi označi μ, μ ± σ, μ ± 2σ, μ ± 3σ;
6. **ploščina pod krivuljo je 1**; levo od μ je 0,5, desno 0,5.

**Lasten primer:** višina odraslih moških Y ~ N(180 cm, 7 cm) → 68 % jih je visokih med 173 in 187 cm, 95 % med 166,3 in 193,7 cm (180 ± 1,96 · 7).

**Pogosti k:** k = 0,67 → 50 % (med Q₁ in Q₃); k ≈ 1 → 68 %; **k = 1,96 → 95 %**; **k = 2,58 → 99 %**.
- μ ± 1,96σ vsebuje **točno 95 %** vrednosti (k = 2 da 95,44 %, malo preveč). Ostane 5 %, torej **2,5 % v vsakem repu**; F_Z(1,96) = 0,975.
- Števili 1,96 (95 %) in 2,58 (99 %) se pojavljata povsod: v intervalih zaupanja in pri preizkušanju domnev.

## Standardizirana normalna porazdelitev Z ⭐

- **Z = (Y − μ) / σ** → **Z ~ N(0, 1)**.
- Ideja: vsako normalno Y **premaknemo** (−μ, center v 0) in **raztegnemo ali stisnemo** (/σ, širina 1). Vse normalne porazdelitve postanejo ena, zato zadošča **ena tabela**. Standardizacija je povezana z Gaussom, po katerem se normalna porazdelitev imenuje tudi Gaussova.
- **z pove, za koliko standardnih odklonov je vrednost od povprečja**: z > 0 nad, z < 0 pod, z = 0 točno povprečje.
- Ploščine se pri pretvorbi ne spremenijo: **F_Y(a) = F_Z(z_a)**.
- Dve smeri:
  1. **imam vrednost → iščem verjetnost**: z = (a − μ)/σ → tabela → F_Z(z);
  2. **imam verjetnost → iščem vrednost (kvantil)**: v tabeli poišči z, kjer je F_Z(z) = P → **a = μ + z·σ**.
- **Iskanje z v tabeli:** vzemi vrednost, ki je **bližje** iskani ploščini (npr. za 0,60: F(0,25) = 0,5987 je bližje kot F(0,26) = 0,6026).
- Standardizacija omogoča tudi primerjavo različnih spremenljivk: kdo je relativno boljši, nekdo 1,5σ nad povprečjem pri enem testu ali nekdo 1σ nad povprečjem pri drugem?

**P(Y > μ + 2σ):** z = 2 za vsako normalno porazdelitev (μ in σ se pokrajšata) → 1 − F_Z(2) = 1 − 0,9772 = **0,0228**. Preverba: zunaj μ ± 2σ je 4,56 %, polovica v desnem repu = 2,28 % ✔.

## Kako zapisati rešitev ⭐⭐

Sam rezultat ni dovolj. Zapis ima pet korakov:
1. **Zapis porazdelitve:** Y ~ N(32, 6)
2. **Kaj iščem (simbolno):** P(Y ≤ 24) = F_Y(24)
3. **Standardizacija:** z = (24 − 32)/6 = −1,33
4. **Pretvorba in tabela:** F_Y(24) = F_Z(−1,33) = 1 − F_Z(1,33) = 1 − 0,9082 = 0,0918
5. **Interpretacija z besedami, kontekstom in enotami:** »Verjetnost, da je slučajno izbrano naročilo dostavljeno v 24 minutah ali prej, je 0,0918.«

Po možnosti dodaj skico zvona s pobarvano ploščino. Ne piši »…«: vsakič zapiši celotno verigo od verjetnosti do rezultata.

## Rešen primer: čas dostave pice, Y ~ N(32 min, 6 min)

**Enota:** eno naročilo. **Spremenljivka:** čas dostave (v minutah), zvezna, razmernostna, porazdeljena normalno.

**a) P(Y < 32)?** 32 = μ in porazdelitev je simetrična, zato je polovica ploščine levo od μ: **P(Y < 32) = 0,5**. Brez tabele.

**b) Kolikšen delež naročil je dostavljenih v 24 minutah ali prej?**
- z = (24 − 32)/6 = −1,33 → F_Z(−1,33) = 1 − 0,9082 = **0,0918** → približno 9,2 % naročil.
- R: `pnorm(24, 32, 6)` = 0,0912 (razlika zaradi zaokrožitve z).
- Preverba smiselnosti: 24 minut je med μ − σ (26, levi rep ≈ 16 %) in μ − 2σ (20, levi rep ≈ 2,3 %) → odgovor med 2,3 % in 16 % ✔.

**c) Od 400 naročil v petek zvečer: koliko jih pričakujemo med 24 in 35 minutami?**
1. P(24 < Y ≤ 35) = F_Y(35) − F_Y(24)
2. z₃₅ = (35 − 32)/6 = 0,50; z₂₄ = −1,33
3. F_Z(0,50) − F_Z(−1,33) = 0,6915 − 0,0918 = **0,5997**
4. 0,5997 · 400 ≈ **240 naročil**
5. »Od 400 naročil pričakujemo približno 240 dostav, ki trajajo med 24 in 35 minutami.«
- Pazi: F(35) − F(24), NE F(35 − 24) = F(11)!

**d) Verjetnost, da dostava traja več kot ___ minut, je 0,25** → obratna smer (kvantil).
1. P(Y > a) = 0,25 → F_Y(a) = 0,75 → a je **tretji kvartil Q₃**
2. v tabeli: F_Z(z) = 0,75 → **z ≈ 0,67**
3. a = 32 + 0,67 · 6 ≈ **36 minut**
4. »Četrtina dostav traja več kot 36 minut.« R: `qnorm(0.75, 32, 6)`.
- 95 % dostav traja med 32 ± 1,96 · 6 = 20,2 in 43,8 minute.

## Rešen primer: razvrščeni podatki — dnevno število korakov

**Enota:** en zaposleni (vzorec 120 zaposlenih). **Spremenljivka:** povprečno dnevno število korakov (v tisočih korakov), številska, razmernostna. Podatki so že razvrščeni.

| k | Koraki (v tisočih) | fₖ | yₖ | fₖ° | Fₖ° |
|---|---|---|---|---|---|
| 1 | do 4 | 12 | 2 | 0,100 | 0,100 |
| 2 | nad 4 do 8 | 36 | 6 | 0,300 | 0,400 |
| 3 | nad 8 do 12 | 30 | 10 | 0,250 | 0,650 |
| 4 | nad 12 do 16 | 22 | 14 | 0,183 | 0,833 |
| 5 | nad 16 do 20 | 13 | 18 | 0,108 | 0,942 |
| 6 | nad 20 do 24 | 7 | 22 | 0,058 | 1,000 |

- **Peš račun:** Σfₖyₖ = 1236 → ȳ = 1236/120 = **10,3 tisoč korakov**; Σfₖ(yₖ − ȳ)² = 3525,2 → s² = 3525,2/119 = **29,62**; s = **5,44 tisoč korakov**; kv = 5,44/10,3 = **0,53** → standardni odklon je 53 % povprečja.
  - primer za 3. razred: f₃y₃ = 30 · 10 = 300; f₃(y₃ − ȳ)² = 30 · (10 − 10,3)² = 2,7.
- **Mediana:** F₂° = 0,400 < 0,5 ≤ F₃° = 0,650 → Me je v razredu **nad 8 do 12 tisoč** korakov. Mediana ima kvantilni rang 0,5: »Ocenjujemo, da polovica zaposlenih naredi največ toliko korakov, kot jih zastopa 3. razred (nad 8 do 12 tisoč), polovica pa več.« Kot reprezentant razreda je Me = 10 tisoč.
- **Q₃:** F₃° = 0,650 < 0,75 ≤ F₄° = 0,833 → razred **nad 12 do 16 tisoč**.
- **Modus** pri razvrščenih podatkih je **sredina razreda z največjo frekvenco**: Mo = 6 tisoč (2. razred, f₂ = 36).
- **Oblika:** Mo = 6 < Me (razred s sredino 10) < ȳ = 10,3 in dolg desni rep → **asimetrična v desno**.
- **Interpretacija 4. razreda:** f₄° = 0,183 → 18,3 % zaposlenih v vzorcu naredi nad 12 do vključno 16 tisoč korakov; F₄° = 0,833 → 83,3 % jih naredi do vključno 16 tisoč.
- **Manjkajoče vrednosti iz kumulative:** fₖ° = Fₖ° − Fₖ₋₁° (0,650 − 0,400 = 0,250); fₖ = fₖ° · n (0,25 · 120 = 30).

**V R:** razvrščene podatke s funkcijo `rep(sredine, times = frekvence)` »razpihnemo« nazaj na 120 vrednosti; brez tega bi R mislil, da ima samo 6 opazovanj. `table()` je kontrola (12, 36, 30, 22, 13, 7). `summary()` izpiše Min, 1st Qu., Median, Mean, 3rd Qu., Max.

## Rešen primer: polnjenje plastenk olja, Y ~ N(1000 ml, 8 ml)

**Enota:** ena plastenka. **Spremenljivka:** prostornina olja v plastenki (v ml), zvezna, razmernostna, normalno porazdeljena. Vedno zapiši **Y ~ N(1000 ml; 8 ml)**.

- **a)** P(Y ≤ 1008) = P(Z ≤ (1008 − 1000)/8) = F_Z(1) = **0,8413** → 84,13 % plastenk ima do vključno 1008 ml. R: `pnorm(1008, 1000, 8)`.
- **b)** P(992 < Y < 1016) = F_Z(2) − F_Z(−1) = 0,9772 − 0,1587 = **0,8185**.
- **c)** P(Y > 1020) = 1 − F_Z(2,5) = 1 − 0,9938 = **0,0062** → 0,62 % plastenk. R: `pnorm(1020, 1000, 8, lower.tail = FALSE)`.
- **d) Količina, ki jo preseže 60 % plastenk:** P(Y > a) = 0,60 → F(a) = 0,40 → z = −0,25 (najbližja vrednost v tabeli) → a = 1000 − 0,25 · 8 = **998 ml**. Temu rečemo kvantil (P₄₀). R: `qnorm(0.60, 1000, 8, lower.tail = FALSE)`.

## Rešen primer: sprememba variabilnosti — baterije telefonov

**Enota:** ena baterija. **Spremenljivka:** življenjska doba baterije (v polnilnih ciklih), zvezna, razmernostna. **Y ~ N(800; 64) ciklov.** Proizvajalec da garancijo za 700 ciklov.

**a) Delež baterij, ki odpovejo pred iztekom garancije:**
- z = (700 − 800)/64 = −1,56 → F_Z(−1,56) = 1 − 0,9406 = **0,0594** → 5,94 % baterij.

**b) Novi dobavitelj: koeficient variacije se poveča za 25 %, povprečje ostane enako.** Formule za to ni, zato greš po korakih:
1. **Stanje pred spremembo:** 5,94 %.
2. **Kaj se spremeni:** KV₁ = 64/800 = 0,08; KV₂ = 0,08 · 1,25 = 0,10; μ ostane, zato σ₂ = KV₂ · μ = 0,10 · 800 = **80 ciklov**.
3. **Stanje po spremembi:** z = (700 − 800)/80 = −1,25 → F_Z(−1,25) = 1 − 0,8944 = **0,1056** → 10,56 %.
4. **Sprememba:**
   - **absolutna** = PO − PRED = 10,56 % − 5,94 % = **4,62 odstotne točke** (ne %!);
   - **relativna** = (PO − PRED)/PRED · 100 = 4,62/5,94 · 100 = **77,8 %** (relativna sprememba je vedno v %).
- **Odgovor:** »Delež baterij, ki odpovejo pred iztekom garancije, bi se **povečal** za 4,62 odstotne točke oz. za 77,8 %.« Vedno napiši smer (povečal / zmanjšal), ne samo »spremenil«.
