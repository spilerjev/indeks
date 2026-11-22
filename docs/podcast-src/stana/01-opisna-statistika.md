# Epizoda 1 — Osnovni pojmi in opisna statistika

Tema: Statistična analiza. Lastna razlaga snovi z lastnimi primeri.

## Kaj je statistika

- **Definicija** (Statistični terminološki slovar, 2001):
  - znanost o metodah zbiranja, analize in predstavitve podatkov;
  - zbiranje, obdelava in objavljanje podatkov;
  - sistematično zbrani podatki o enotah populacije;
  - organizacija, ki se s tem ukvarja (npr. SURS).
- **V sklepni statistiki** je statistika slučajna spremenljivka, izračunana iz vzorčnih vrednosti. Najpogosteje je to ocena parametra.
- **Zgodovina:**
  - prvi popis 1066 (Viljem Osvajalec), prvi moderni popis 1846 (Belgija);
  - na Slovenskem 1754 (Marija Terezija);
  - SURS 1944, SdS 1977.
- **Citati:**
  - »laži, preklete laži in statistika«;
  - Mosteller: s statistiko je lahko lagati, brez nje pa še lažje;
  - Wilks: statistično razmišljanje bo enako pomembno kot branje in pisanje.

## Osnovni statistični pojmi

| Pojem | Pomen | Oznaka |
|---|---|---|
| Populacija | množica vseh enot, ki nas zanimajo (krajevni, časovni, stvarni pogoji) | P(u₁, u₂, …, u_N) |
| Statistična enota | posamezna enota opazovanja | uᵢ, i = 1…N |
| Spremenljivka | lastnost enote | Y, X, Z, W ali Y₁, Y₂ … |
| Parameter | lastnost populacije kot celote | Γ_Y: N, μ, σ, VR, Me, Mo … |
| Merjenje | vsaki enoti uᵢ priredimo vrednost yᵢ | yᵢ |

- **Matrika podatkov:** vrstice so enote, stolpci so spremenljivke; element y_ij je vrednost j-te spremenljivke pri i-ti enoti. V praksi je to preglednica ali datoteka.
- **Lasten primer — člani tekaškega kluba:** populacija so vsi člani kluba (N = 180), enota je en član. Spremenljivke: leto rojstva, kraj bivanja, najboljši čas na 10 km (v minutah), stopnja tekaške skupine (začetniki, rekreativci, tekmovalci). Matrika ima 180 vrstic in 4 stolpce.

## Merske lestvice ⭐

Od merske lestvice je odvisno, **katere parametre smemo izračunati**. Lestvico določimo glede na to, kako lahko primerjamo dve vrednosti y_A in y_B.

| Vrsta spr. | Lestvica | Primerjava | Primeri | Parametri |
|---|---|---|---|---|
| **neštevilska** (opisna, kategorialna, atributivna) | **imenska (nominalna)** | enakost: y_A = y_B ali y_A ≠ y_B | spol, kraj bivanja, poštna številka, barva avtomobila | frekvenca (število ali delež), **modus** |
| | **urejenostna (ordinalna)** | urejenost: y_A ≤ y_B ali y_A ≥ y_B | stopnja izobrazbe, tekaška skupina, zadovoljstvo »slabo–dobro–odlično« | **rang, mediana**, ostali kvantili |
| **številska** (numerična) | **razmična (intervalna)** | razlika: d = y_A − y_B | temperatura v °C, ura v dnevu, koledarsko leto | **aritmetična sredina, standardni odklon, koeficient korelacije** |
| | **razmernostna (racionalna)** | razmerje: k = y_A / y_B | najemnina, starost, trajanje, prevožena razdalja | **koeficient variacije, geometrijska sredina, harmonična sredina** |

**Ključno razumevanje:**
1. **Lestvice so hierarhične (kumulativne).** Vsaka višja lestvica omogoča vse, kar omogočajo nižje, in še nekaj več. Za razmernostno spremenljivko lahko izračunaš tudi modus, mediano in povprečje. Za imensko samo frekvence in modus.
2. **Imenska lestvica: vrednosti so samo oznake.** Poštna številka je število, a je *imenska*. Povprečna poštna številka nima pomena. Enako velja za telefonsko številko, EMŠO in številko vstopnice.
3. **Urejenostna lestvica: vrstni red je znan, razdalje niso.** Pri tekaških skupinah vemo, da so tekmovalci nad rekreativci, ne vemo pa, ali je »razdalja« med začetniki in rekreativci enaka kot med rekreativci in tekmovalci. Zato povprečje in standardni odklon formalno nista primerna; primerna sta mediana in kvantili.
4. **Razmična lestvica: ničla je dogovorjena.** Razlike so smiselne (20 °C − 10 °C = 10 °C), razmerja pa ne: 20 °C ni »dvakrat topleje« od 10 °C. Ura 14:00 ni »dvakrat« ura 7:00, ker je polnoč dogovor.
5. **Razmernostna lestvica: ničla je naravna.** 0 € pomeni »nič najemnine«, 0 minut pomeni »nič trajanja«. Zato je razmerje smiselno: 600 € je dvakrat 300 €.
   - **KV = σ / μ** zahteva razmernostno lestvico. Deliti z μ je smiselno le, če ima ničla pomen, sicer bi se KV spremenil že ob premiku ničle (°C → °F).
   - Geometrijska in harmonična sredina delata z razmerji in recipročnimi vrednostmi, zato potrebujeta pozitivne vrednosti z naravno ničlo.

**Lasten primer — tekaški klub, razvrstitev spremenljivk:**
- leto rojstva: razmična (koledarski čas, dogovorjena ničla);
- kraj bivanja: imenska;
- najboljši čas na 10 km: razmernostna (0 minut je naravna ničla, 50 minut je dvakrat 25 minut);
- tekaška skupina: urejenostna.

**Lasten primer — ista lastnost (čas) na štirih lestvicah:**

| Zapis | Lestvica | Zakaj |
|---|---|---|
| »termin je ob vikendu« (vikend / delavnik) | imenska | samo kategorija, brez vrstnega reda |
| »termin je zgodaj zjutraj« (zjutraj < popoldne < zvečer) | urejenostna | vrstni red obstaja, razdalje niso znane |
| »termin je ob 14:00« | razmična | razlike so smiselne (2 uri kasneje), ničla (polnoč) je dogovor |
| »trening traja 90 minut« | razmernostna | 0 minut je naravna ničla, 90 minut je dvakrat 45 minut |

**Pravilo za razvrščanje:** vprašaj se po vrsti:
1. Ali lahko vrednosti uredim? Če ne, je spremenljivka **imenska**.
2. Ali ima razlika pomen? Če ne, je **urejenostna**.
3. Ali ima ničla pomen, tako da je smiselno razmerje? Če ne, je **razmična**, sicer je **razmernostna**.

**Diskretna ali zvezna je drugo vprašanje kot merska lestvica.**
- Diskretna je, kadar štejemo in so možne le posamezne vrednosti (število pretečenih maratonov).
- Zvezna je, kadar lahko zavzame katerokoli vrednost na intervalu (čas teka).
- Točke ali zneski v centih so strogo gledano cela števila, a ker je možnih vrednosti zelo veliko, jih obravnavamo kot praktično zvezne.
- Diskretna in zvezna spremenljivka sta lahko obe razmernostni.

**Lasten primer — udeleženci mestnega maratona** (populacija: vsi, ki so tek končali; enota: en tekač):

| Spremenljivka | Vrsta | Lestvica | Zakaj |
|---|---|---|---|
| spol | opisna | imenska | samo = / ≠ |
| starostna kategorija (do 30, 30–45, nad 45) | opisna | urejenostna | kategorije lahko uredimo |
| država kluba | opisna | imenska | SLO ≠ HRV, vrstnega reda ni |
| število doslej pretečenih maratonov | številska, diskretna | razmernostna | 0 = noben, 6 je trikrat 2 |
| čas teka (v minutah) | številska, zvezna | razmernostna | 0 minut je naravna ničla |

**Test za razmernostno lestvico:** (1) ali ima spremenljivka naravno ničlo, ki pomeni »nič te lastnosti«, in (2) ali je smiselno reči »dvakrat toliko«? Če je odgovor dvakrat da, je lestvica razmernostna.

## Opisna in sklepna statistika

- **Opisna statistika:** iz populacije velikosti N izračunamo **parameter**. Sem spadajo frekvenčne porazdelitve, tabele in grafikoni, srednje vrednosti (μ, Me, Mo), kvantili (kvartili, decili, centili) in mere variabilnosti (min, max, VR, IQR, σ², σ, KV).
- **Problem:** opazovanje cele populacije je zamudno, drago in včasih neizvedljivo.
- **Sklepna statistika:** iz vzorca velikosti n izračunamo **vzorčno oceno (statistiko)**; vemo, kako se ocene porazdeljujejo, in ugotovitve posplošimo na populacijo.

| | Opisna statistika | Sklepna statistika |
|---|---|---|
| Kaj opazujemo | celo populacijo (N enot) | vzorec (n enot, n ≪ N) |
| Rezultat | **parameter** (prava vrednost, ena sama) | **vzorčna ocena** (približek, odvisen od vzorca) |
| Napaka | ni vzorčne napake | **vzorčna napaka**: drug vzorec da drugačno oceno |
| Cilj | povzeti in opisati podatke | posplošiti ugotovitve na populacijo |

1. **Opisna statistika ne pomeni nujno »populacija«.** Iste metode opisa uporabimo tudi na vzorcu, ko ga samo opisujemo. Razlika je v **namenu**: povzeti ali sklepati na celoto.
2. **Zakaj sploh vzorec?** Popis je **zamuden** (podatki zastarijo), **drag** in včasih **neizvedljiv**. Primer so uničujoči testi: če preizkusiš trdnost vsake opeke tako, da jo zdrobiš, ne ostane nobena za prodajo.
3. **Porazdelitev vzorčnih ocen** je ključni pojem sklepne statistike: vsak možni vzorec da svojo oceno, te ocene skupaj tvorijo porazdelitev, iz nje pa vemo, **kako zelo se ocena lahko zmoti**.
4. **Mere variabilnosti:** VR (variacijski razmik) = max − min; IQR (interkvartilni razmik) = Q₃ − Q₁; KV (koeficient variacije) = σ / μ.
5. **Kvantili:** kvartili razdelijo enote na 4 dele (Q₁, Q₂ = Me, Q₃), decili na 10, centili na 100.

| | Populacija (prava vrednost) | Vzorec (ocena) |
|---|---|---|
| Aritmetična sredina | μ = (1/N) Σ yᵢ | ȳ = (1/n) Σ yᵢ |
| Varianca | σ² = (1/N) Σ (yᵢ − μ)² | s² = **(1/(n−1))** Σ (yᵢ − ȳ)² |

- Pri vzorčni varianci delimo z **n − 1**: μ smo nadomestili z ocenjeno ȳ in eno prostostno stopnjo »porabili«, zato je tako ocena nepristranska.

**Univariatna, bivariatna in multivariatna analiza** (lasten primer s tekači):
- univariatna: povprečni čas teka;
- bivariatna: povezava med številom treningov na teden in časom teka;
- multivariatna: čas teka v odvisnosti od starosti, števila treningov in spola.

## Parameter, ocena, enota, spremenljivka

- **Enota** je *kdo* ali *kaj* opazujemo: oseba, podjetje, izdelek.
- **Spremenljivka** je *lastnost*, ki jo merimo pri vsaki enoti; pri različnih enotah ima različne vrednosti.
- **Parameter** je značilnost **populacije kot celote** (μ, σ, Me, delež); pišemo ga z grškimi črkami.
- **Ocena parametra** je ista značilnost, izračunana iz **vzorca**; pišemo jo z latinskimi črkami (ȳ, s, kv, p).
- **Vsako nalogo začni z enoto in spremenljivko** (z mersko enoto). Ime spremenljivke napiši v celoti, ne s kratico.

**Lastni primeri — populacija ali vzorec, enota, spremenljivka, parameter:**

| | Populacija / vzorec | Enota | Spremenljivka (lestvica) | Parameter / ocena |
|---|---|---|---|---|
| a) | **populacija**: vse trgovine v mestu | trgovina | število zaposlenih (razmernostna) | **modus** = 3 zaposleni (parameter) |
| b) | **vzorec**: 4 % obiskovalcev poletnega festivala | obiskovalec | številka vstopnice (imenska — samo oznaka!), država prihoda (imenska), prevožena razdalja (razmernostna) | **ocena modusa**: država prihoda = Slovenija |
| c) | **vzorec**: 3 % pošiljke jajc | jajce | stanje jajca (počeno / celo): imenska, **dihotomna** | **ocena deleža** počenih = 0,04 |
| d) | **populacija**: vsi člani fitnes centra | član | tedenski čas vadbe (v urah, razmernostna) | **kvantil**: tretji kvartil Q₃ = 6 ur (parameter) |

- **Kvantil** je vrednost, ki populacijo deli na **dva dela**. Q₃ = 6 ur pomeni: **tri četrtine članov vadi do vključno 6 ur na teden, četrtina pa več.**
- Kvantil **ni delež**: delež (kvantilni rang, tu 0,75) je podan vnaprej, kvantil pa je **vrednost** spremenljivke (v urah).
- **Delež** je najpogostejši parameter pri kategorialnih spremenljivkah, drugi je modus.
- Vzorec → govorimo o **oceni** parametra; populacija → o **parametru**.

## Rešen primer: mesečne najemnine študentskih sob (n = 40)

**Enota:** ena oddana študentska soba. **Spremenljivka:** mesečna najemnina (v €), številska, razmernostna. Podatki so vzorec 40 sob.

Razvrščene vrednosti (v €): 210, 225, 240, 245, 250, 255, 260, 265, 270, 275, 280, 280, 285, 290, 295, 300, 300, 305, 310, 315, 320, 325, 330, 335, 340, 345, 350, 360, 370, 380, 390, 400, 410, 420, 440, 460, 480, 620, 710, 860.

| Ocena | Formula | Vrednost |
|---|---|---|
| aritmetična sredina | ȳ = Σyᵢ / n = 14 100 / 40 | **352,50 €** |
| varianca | s² = Σ(yᵢ − ȳ)² / (n − 1) | **16 691,03** |
| standardni odklon | s = √s² | **129,19 €** |
| min / max | | **210 / 860 €** |
| variacijski razmik | vr = y_max − y_min = 860 − 210 | **650 €** |
| koeficient variacije | kv = s / ȳ = 129,19 / 352,50 | **0,366 (36,6 %)** |
| mediana | | **317,50 €** |

**Kako zapisati izračun:** formula → vstavljene številke → rezultat. Sam rezultat ne pokaže postopka.

**Interpretacije:**
- **ȳ:** »Sobe v vzorcu imajo različne najemnine, v povprečju 352,50 € na mesec.«
- **s²:** »Ocena variance, ki meri velikost odklonov najemnin od ocenjenega povprečja, je 16 691,03.« Enote ne pišemo, ker »evri na kvadrat« nimajo pomena.
- **s:** »Ocena standardnega odklona, ki meri velikost odklonov najemnin od ocenjenega povprečja, je 129,19 €.« Koren »odpravi« kvadrat, zato ima s spet enoto.
- **vr:** »Razlika med najvišjo in najnižjo najemnino v vzorcu je 650 €.«
- **kv:** »Standardni odklon znaša 36,6 % ocenjenega povprečja.« Količnik pove, kolikšen del imenovalca (povprečja) predstavlja števec (standardni odklon).
- s², s in vr so **absolutne** mere variabilnosti: odvisne so od merskih enot in niso primerljive med spremenljivkami. **kv** je **relativna** mera, zato z njim primerjamo npr. razpršenost najemnin in razpršenost površin sob.

**Ideja variabilnosti:**
1. Variabilnost merimo z **odkloni** od povprečja (yᵢ − ȳ).
2. Vsota odklonov je vedno 0, ker se pozitivni in negativni izničijo.
3. Zato jih **kvadriramo** in seštejemo.
4. Vsoto kvadratov delimo z n − 1: to je **varianca**.
5. Koren variance je **standardni odklon**, spet v izvirnih enotah.

**Oblika porazdelitve: asimetrična v desno.**
- ȳ = 352,50 € > Me = 317,50 €, ker nekaj zelo dragih sob povleče povprečje navzgor;
- histogram ima dolg desni rep;
- zato je pri takih podatkih mediana boljši opis »tipične« najemnine kot povprečje. Isti razlog je, zakaj povprečna plača v novicah zavaja.

**Grafikon kvantilov (boxplot):**
- debela črta v škatli je mediana (317,50 €);
- spodnji rob škatle ≈ Q₁ (277,50 €), zgornji rob ≈ Q₃ (385 €); v škatli je srednjih 50 % sob;
- kvartilni razmik ≈ 385 − 277,50 = 107,50 €;
- spodnji ročaj je minimum (210 €), zgornji ročaj je največja vrednost **brez osamelcev**: 480 €;
- **osamelci** so vrednosti, ki so od škatle oddaljene več kot 1,5 kvartilnega razmika: tu je meja 385 + 1,5 · 107,50 = 546,25 €, zato so osamelci **620, 710 in 860 €**;
- R pri boxplotu kvartile računa nekoliko drugače kot `quantile()` (ta da Q₁ = 278,75 € in Q₃ = 382,50 €), zato se številki malo razlikujeta.

## Frekvenčna porazdelitev: razvrščeni podatki

Razredi: nad 150 do vključno 300 €, nad 300 do 450 €, … Vsak razred zastopa **sredina razreda** yₖ.

| k | Razred (€) | Sredina yₖ | fₖ | fₖ° | Fₖ | Fₖ° |
|---|---|---|---|---|---|---|
| 1 | nad 150 do 300 | 225 | 17 | 0,425 | 17 | 0,425 |
| 2 | nad 300 do 450 | 375 | 18 | 0,450 | 35 | 0,875 |
| 3 | nad 450 do 600 | 525 | 2 | 0,050 | 37 | 0,925 |
| 4 | nad 600 do 750 | 675 | 2 | 0,050 | 39 | 0,975 |
| 5 | nad 750 do 900 | 825 | 1 | 0,025 | 40 | 1,000 |

- **Kako izračunaš 2. vrstico:** y₂ = (300 + 450)/2 = 375; F₂ = F₁ + f₂ = 17 + 18 = 35; f₂° = 18/40 = 0,450; F₂° = 35/40 = 0,875.
- **Interpretacija:**
  - f₂ = 18: 18 sob v vzorcu ima najemnino nad 300 do vključno 450 €;
  - f₂° = 0,450: 45 % sob v vzorcu ima najemnino nad 300 do vključno 450 €;
  - F₂ = 35: 35 sob ima najemnino do vključno 450 €;
  - F₂° = 0,875: 87,5 % sob ima najemnino do vključno 450 €.
- V odgovoru vedno poudari **razred**, ne samo sredine: 375 € predstavlja vsako sobo iz razreda »nad 300 do vključno 450 €«.

**Manjkajoče vrednosti v frekvenčni tabeli** (pogosta naloga: v izpisu so nekatere celice prazne):
- fₖ° = Fₖ° − Fₖ₋₁° (npr. 0,875 − 0,425 = 0,450);
- fₖ = fₖ° · n (0,450 · 40 = 18);
- če manjka n: n = fₖ / fₖ°.

**Ocene iz razvrščenih podatkov** (vsaka vrednost nadomeščena s sredino razreda):
- ȳ = 345 €, s² = 19 846,15, s = 140,88 €, kv = 40,8 %.
- Rezultati se razlikujejo od ocen iz nerazvrščenih podatkov (352,50 €, 129,19 €), ker sredine razredov niso dejanske vrednosti: z razvrščanjem izgubimo informacijo.
- **9. decil iz razvrščenih podatkov:** ker je F₂° = 0,875 < 0,90 ≤ F₃° = 0,925, leži D₉ v **3. razredu**. Interpretacija: »Ocenjujemo, da ima 90 % sob najemnino do vključno 3. razreda (nad 450 do 600 €), 10 % pa višjo.« Iz nerazvrščenih podatkov je D₉ = 462 €.

## Frekvenčna tabela v R

Izpis funkcije `frq()` (paket `sjmisc`) za razvrščene najemnine:

```
Value |  N | Raw % | Valid % | Cum. %
  225 | 17 | 42.50 |   42.50 |  42.50
  375 | 18 | 45.00 |   45.00 |  87.50
  525 |  2 |  5.00 |    5.00 |  92.50
  675 |  2 |  5.00 |    5.00 |  97.50
  825 |  1 |  2.50 |    2.50 | 100.00
```

| Stolpec | Pomen | Oznaka |
|---|---|---|
| Value | **sredine razredov** | yₖ |
| N | **frekvenca razreda**, NE velikost vzorca (ta je n) | fₖ |
| Raw % | relativna frekvenca v % | fₖ° · 100 |
| Valid % | relativna frekvenca v %, **brez manjkajočih vrednosti** | |
| Cum. % | kumulativa relativnih frekvenc v % | Fₖ° · 100 |

- Pogosta zmeda je stolpec **N**: tu je to frekvenca razreda, velikost vzorca pa je mali **n**.
- `freq()` (paket `summarytools`) izpiše podobno tabelo z dvema sklopoma stolpcev (% Valid in % Total), ki sta enaka, kadar ni manjkajočih vrednosti, in z vrstico Total.

**R ukazi:**
- `read.table(..., header = TRUE, dec = ",")`: uvoz podatkov z decimalno vejico;
- `pastecs::stat.desc(x)`: opisna statistika (`mean`, `var`, `std.dev`, `coef.var` — ta je v deležu, ne v %);
- `boxplot()`, `hist(x, breaks = seq(150, 900, 150))`;
- `car::recode(x, "150:300 = 225; …")`: vrednost → sredina razreda;
- `sjmisc::frq()`, `summarytools::freq()`: frekvenčna tabela;
- `quantile(x, 0.9)`: poljubni kvantil.
