# Epizoda 1 — Osnovni pojmi in opisna statistika (P01 + V01)

Predmet: Statistična analiza (2. letnik). Vir: lastni zapiski predavanj in vaj, pripravljeni za zvočno razlago.

## P01 — Uvod (ponovitev osnovnih pojmov, opisna statistika)

Vir: gradivo (12 prosojnic)

### Statistika (prosojnice 2–3)
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
  - Mosteller: »S statistiko je enostavno lagati, še bolj enostavno pa brez.«;
  - Wilks: statistično razmišljanje bo enako pomembno kot branje in pisanje.

### Osnovni statistični pojmi (prosojnice 4–5)
| Pojem | Pomen | Oznaka |
|---|---|---|
| Populacija | množica vseh enot, ki nas zanimajo (krajevni, časovni, stvarni pogoji) | P(u₁, u₂, …, u_N) |
| Statistična enota | posamezna enota opazovanja | uᵢ, i = 1…N |
| Spremenljivka | lastnost enote | Y, X, Z, W ali Y₁, Y₂ … |
| Parameter | lastnost populacije kot celote | Γ_Y: N, μ, σ, VR, Me, Mo … |
| Merjenje | vsaki enoti uᵢ priredimo vrednost yᵢ | yᵢ |

- **Matrika podatkov:**
  - vrstice so enote, stolpci so spremenljivke;
  - element y_ij je vrednost j-te spremenljivke pri i-ti enoti;
  - v praksi je to datoteka.
- Na prosojnici 4 je tipkarska napaka: P(u₁, **u₁**, …) bi moralo biti P(u₁, **u₂**, …).
- **Primer 1.1** (študenti 2. letnika UPEŠ):
  - enota je študent (Š1 … Š444), torej N = 444;
  - spremenljivke so LR (leto rojstva), SŠ (srednja šola), Matura (točke), OS (ocena pri Osnovah statistike).

### Merske lestvice (prosojnici 6–7) ⭐

Od merske lestvice je odvisno, **katere parametre smemo izračunati**. Lestvico določimo glede na to, kako lahko primerjamo dve vrednosti y_A in y_B.

| Vrsta spr. | Lestvica | Primerjava | Primeri | Parametri |
|---|---|---|---|---|
| **neštevilska** (opisna, kategorialna, atributivna) | **imenska (nominalna)** | enakost: y_A = y_B ali y_A ≠ y_B | spol, rojstni kraj, hišna številka, serija proizvoda | frekvenca (število ali delež), **modus** |
| | **urejenostna (ordinalna)** | urejenost: y_A ≤ y_B ali y_A ≥ y_B | kvalifikacija, stopnja izobrazbe, ocena izgleda proizvoda | **rang, mediana**, ostali kvantili |
| **številska** (numerična) | **razmična (intervalna)** | razlika: d = y_A − y_B | temperatura v °C, koledarski čas | **aritmetična sredina, standardni odklon, koeficient korelacije** |
| | **razmernostna (racionalna)** | razmerje: k = y_A / y_B | prihodek, starost, telesna višina | **koeficient variacije, geometrijska sredina, harmonična sredina** |

**Ključno razumevanje:**
1. **Lestvice so hierarhične (kumulativne).**
   - Vsaka višja lestvica omogoča vse, kar omogočajo nižje, in še nekaj več.
   - Za razmernostno spremenljivko lahko torej izračunaš tudi modus, mediano in povprečje.
   - Za nominalno spremenljivko lahko izračunaš samo frekvence in modus.
2. **Nominalna lestvica: vrednosti so samo oznake.**
   - Hišna številka je število, a je *imenska*. Povprečna hišna številka nima pomena.
   - Enako velja za poštno številko, EMŠO in serijsko številko.
3. **Ordinalna lestvica: vrstni red je znan, razdalje niso.**
   - Pri izobrazbi vemo, da je VII > V, ne vemo pa, ali je razlika med V in VI enaka razliki med VI in VII.
   - Zato povprečje in standardni odklon formalno nista primerna. Primerna sta mediana (sredina po vrstnem redu) in kvantili.
4. **Intervalna lestvica: ničla je dogovorjena (arbitrarna).**
   - Razlike so smiselne: 20 °C − 10 °C = 10 °C.
   - Razmerja niso smiselna: 20 °C **ni** »dvakrat topleje« od 10 °C.
   - Koledarsko leto 2000 ni »dvakrat« leto 1000, ker je leto 0 dogovor.
5. **Razmernostna lestvica: ničla je naravna (absolutna).**
   - 0 € pomeni »ni prihodka«, 0 K pomeni »ni toplotnega gibanja«.
   - Zato je razmerje smiselno: 2000 € je dvakrat 1000 €.
   - **KV = σ / μ** zahteva razmernostno lestvico. Deliti z μ je smiselno le, če ima ničla pomen, sicer bi se KV spremenil že ob premiku ničle (°C → °F).
   - Geometrijska in harmonična sredina delata z razmerji in recipročnimi vrednostmi, zato potrebujeta pozitivne vrednosti z naravno ničlo.

**Primer 1.1, razvrstitev spremenljivk** (razvrstitev, preveri na predavanjih):
- **LR (leto rojstva)** je intervalna spremenljivka (koledarski čas, dogovorjena ničla).
- **SŠ (srednja šola)** je nominalna spremenljivka.
- **Matura (točke)** je razmernostna spremenljivka, ker 0 točk pomeni naravno ničlo. Pogosto jo obravnavajo kot intervalno.
- **OS (ocena 5–10)** je strogo gledano ordinalna spremenljivka. V praksi pogosto računamo povprečno oceno, kar je dogovor in ne formalna pravilnost.

**Primer 1.2: ista lastnost (temperatura) na štirih lestvicah**
| Zapis | Lestvica | Zakaj |
|---|---|---|
| »neobičajna za ta letni čas« | nominalna | samo kategorija (običajna / neobičajna), brez vrstnega reda |
| »visoka« | ordinalna | nizka < srednja < visoka; vrstni red obstaja, razdalje niso znane |
| 20 °C | intervalna | razlike so smiselne, ničla (zmrzišče vode) je dogovor |
| 293 K | razmernostna | 0 K je absolutna ničla, zato je razmerje smiselno |

**Pravilo za izpit:** vprašaj se po vrsti:
1. Ali lahko vrednosti uredim? Če ne, je spremenljivka **nominalna**.
2. Ali ima razlika pomen? Če ne, je **ordinalna**.
3. Ali ima ničla pomen, tako da je smiselno razmerje? Če ne, je **intervalna**, sicer je **razmernostna**.

### Opisna in sklepna statistika (prosojnice 8–9)
- **Opisna (deskriptivna) statistika:** iz populacije velikosti N izračunamo **parameter**. Sem spadajo:
  - frekvenčne porazdelitve, tabele in grafikoni;
  - srednje vrednosti (μ, Me, Mo);
  - kvantili (kvartili, decili, centili);
  - mere variabilnosti (min, max, VR, IQR, σ², σ, KV).
- **Problem:** opazovanje cele populacije je zamudno, drago in včasih neizvedljivo.
- **Sklepna (inferenčna) statistika:**
  - iz vzorca velikosti n izračunamo **vzorčno oceno (statistiko)**;
  - dobimo **porazdelitev vzorčnih ocen**;
  - ugotovitve posplošimo na populacijo.

**Poglobljeno (prosojnica 8):**

| | Opisna statistika | Sklepna statistika |
|---|---|---|
| Kaj opazujemo | celo populacijo (N enot) | vzorec (n enot, n ≪ N) |
| Rezultat | **parameter** (prava vrednost, ena sama, točna) | **statistika / vzorčna ocena** (približek, odvisen od izbranega vzorca) |
| Napaka | ni vzorčne napake | **vzorčna napaka**: drug vzorec da drugačno oceno |
| Cilj | povzeti in opisati podatke | posplošiti ugotovitve na populacijo |

1. **Opisna statistika ne pomeni nujno »populacija«.**
   - Iste metode opisa (tabele, grafi, povprečje, mediana …) uporabimo tudi na vzorcu, ko ga samo opisujemo.
   - Razlika je v **namenu**. Pri opisni statistiki podatke povzamemo. Pri sklepni z njimi sklepamo na celoto.
2. **Zakaj sploh vzorec?** Popis cele populacije je:
   - **zamuden**, ker so podatki zastareli, preden jih obdelaš;
   - **drag**;
   - včasih **neizvedljiv**. Primer so uničujoči testi: če preizkusiš vsako žarnico, ne ostane nobena za prodajo. Tudi populacija brez seznama enot je neizvedljiva.
3. **Porazdelitev vzorčnih ocen** je ključni pojem sklepne statistike.
   - Iz populacije lahko izberemo zelo veliko različnih vzorcev velikosti n.
   - Vsak vzorec da svojo oceno (npr. svoj ȳ).
   - Te ocene skupaj tvorijo porazdelitev. Iz nje vemo, **kako zelo se ocena lahko zmoti**, kar je osnova za intervale zaupanja in preizkušanje domnev.
4. **Mere variabilnosti** (kratice s prosojnice):
   - **VR** (variacijski razmik) = max − min;
   - **IQR** (interkvartilni razmik) = Q₃ − Q₁;
   - **KV** (koeficient variacije) = σ / μ.
5. **Kvantili:**
   - kvartili razdelijo enote na 4 dele (Q₁, Q₂ = Me, Q₃);
   - decili na 10 delov;
   - centili (percentili) na 100 delov.

| | Populacija (prava vrednost Γ) | Vzorec (ocena g) |
|---|---|---|
| Aritmetična sredina | μ = (1/N) Σ yᵢ | ȳ = (1/n) Σ yᵢ |
| Varianca | σ² = (1/N) Σ (yᵢ − μ)² | s² = **(1/(n−1))** Σ (yᵢ − ȳ)² |

- Pri vzorčni varianci delimo z **n − 1**. S tem dobimo nepristransko oceno, ker smo μ nadomestili z ocenjeno ȳ in eno prostostno stopnjo »porabili«.

### Univariatna, bivariatna in multivariatna analiza (prosojnica 10)
- **Univariatna analiza (1 spremenljivka):** povprečna ocena pri SA.
- **Bivariatna analiza (2 spremenljivki):** povezava med oceno pri SA in oceno pri OS.
- **Multivariatna analiza (več kot 2 spremenljivki):** ocena pri SA v odvisnosti od OS, Matematike in kohezijske regije.

### Zgledna izpitna vprašanja (prosojnici 11–12) — rešitve
1. **Kaj je statistična enota?** Odgovor je **E (zaposlena oseba)**.
   - C (vsi zaposleni) je populacija.
   - B in D sta spremenljivki.
2. **Na kateri lestvici merimo stopnjo izobrazbe?** Odgovor je **D (ordinalni)**.
3. **Najpogostejši kraj je »Ljubljana«; kako se imenuje ta parameter?** Odgovor je **D (modus)**.
4. **Plače so unimodalne in desno asimetrične; katera trditev je pravilna?** Odgovor je **D**.
   - D drži: decili kot meje razredov dajo v vsakem razredu 10 % enot.
   - A je napačna, ker je VR = max − min.
   - B je napačna. Pri desni asimetriji velja **Mo < Me < μ**, zato pod modusom leži *manj* kot 50 % enot.
   - C je past. 0,5 je *kvantilni rang* mediane, njen rang pa je (N+1)/2.
   - E je napačna, ker je vrstni red obrnjen.

---

## V01 — 1. vaje (osnovni pojmi, opisna statistika, uvod v R)

### Osnovni pojmi (ponovitev na vajah)
- **Enota** je *kdo* ali *kaj* opazujemo: posamezna oseba, podjetje, izdelek … (pri Nalogi 2 je to zaposlena oseba).
- **Spremenljivka** je *lastnost*, ki jo merimo pri vsaki enoti. Pri različnih enotah ima različne vrednosti (pri Nalogi 2 so to letni neto prejemki).
- **Parameter** računamo iz vrednosti spremenljivke.
  - Je značilnost oz. lastnost **populacije kot celote**, ne posamezne enote.
  - Govorimo o **vrednosti parametra** (npr. μ, σ, Me, delež).
- **Ocena parametra** je ista značilnost, le da jo izračunamo iz **vzorca**.
  - Pišemo jo z latinskimi črkami (ȳ, s, kv), parameter pa z grškimi (μ, σ).
  - Pri Nalogi 2 je ȳ = 30,47 ocena povprečnih prejemkov vseh zaposlenih v finančni industriji.

### Primer z vaj: EP v kolesarstvu v Sloveniji
- **Populacija:** vsi udeleženci EP v kolesarstvu v Sloveniji. **Enota:** en kolesar.

| Spremenljivka | Vrsta | Lestvica | Zakaj |
|---|---|---|---|
| spol | opisna (kategorialna) | imenska | samo = / ≠ |
| starostna kategorija (člani, U23, mladinci) | opisna | **urejenostna** | kategorije lahko razvrstimo po vrstnem redu |
| država | opisna | imenska | SLO ≠ BEL, vrstnega reda ni |
| št. tekmovalnih dni 2026 | številska, **diskretna** (štejemo) | razmernostna | 0 = ni tekmoval, 40 dni je 2× več kot 20 |
| št. točk na lestvici | številska, praktično **zvezna** | razmernostna | 0 točk = nima točk (prava ničla); 2000 je 2× več kot 1000 |

- **Urejenostna lestvica vključuje tudi imensko.** Lestvice so kumulativne: kar velja za imensko (=, ≠), velja tudi za urejenostno, ta pa doda še vrstni red (<, >).
- **Test za razmernostno lestvico.** Vprašaš se dvoje:
  1. Ali ima spremenljivka **naravno (absolutno) ničlo**, ki pomeni »nič te lastnosti«?
  2. Ali je smiselno reči »**dvakrat** toliko«?

  Če je odgovor dvakrat da, je lestvica razmernostna. Protiprimer je temperatura v °C, kjer 0 °C ne pomeni »nič toplote«, zato je razmična.
- **Diskretna ali zvezna spremenljivka je drugo vprašanje kot merska lestvica.**
  - Diskretna je, kadar štejemo in so možne le posamezne vrednosti (npr. dnevi).
  - Zvezna je, kadar lahko zavzame katerokoli vrednost na intervalu.
  - Točke so strogo gledano lahko cela števila, a ker je možnih vrednosti zelo veliko, jih obravnavamo kot (praktično) zvezne.
  - Diskretna in zvezna spremenljivka sta lahko obe razmernostni.

### Naloga 1: populacija/vzorec, enota, spremenljivka, lestvica, parameter
| | Populacija / vzorec | Enota | Spremenljivka (lestvica) | Parameter / ocena |
|---|---|---|---|---|
| a) | **populacija**: vsa gospodinjstva v občini | gospodinjstvo | število članov (razmernostna) | **modus** = 4 (parameter) |
| b) | **vzorec** 5 % vpisanih študentov EF | študent | tel. številka (imenska, samo oznaka!), kraj prebivališča (imenska), oddaljenost (razmernostna) | **ocena modusa: Mo = Ljubljana** (po profesorju); posledično ocena deleža v LJ > 0,5 |
| c) | **vzorec** 2 % pošiljke žarnic | žarnica | **kakovost žarnice** (pokvarjena / brezhibna): kategorialna, imenska, **dihotomna** (2 vrednosti) | **ocena** deleža pokvarjenih = 0,10 |
| d) | **populacija**: vsi zaposleni v podjetju | zaposleni | neto plača (razmernostna) | **kvantil**: prvi kvartil Q₁ = 1200 € (parameter) |

- **Kvantil** (profesor na vajah) je vrednost, ki deli populacijo na **dva dela**: pod njo je določen delež enot, nad njo pa ostanek.
  - Q₁ = 1200 € pomeni: **četrtina zaposlenih ima plačo do VKLJUČNO 1200 €, ostali (75 %) pa VEČ kot 1200 €** (profesor poudaril).
  - Kvantil **ni delež**: delež je v kvantilu podan vnaprej, kvantil pa je **vrednost** spremenljivke (v €).
  - Posebni kvantili so mediana (50 %), kvartili (25/50/75 %), decili (10 %, 20 % …) in percentili.
- **Delež** (oz. ocena deleža) je **najpogostejši parameter pri kategorialnih spremenljivkah** (profesor na vajah). Drugi je modus.
- Vzorec → govorimo o **oceni** parametra; populacija → o **parametru**.
- Telefonska številka je kljub številkam **imenska** spremenljivka.

### Naloga 2: letni neto prejemki (n = 46, v tisoč €)
**a) Enota:** en zaposleni (v finančni industriji). **Spremenljivka:** letni neto prejemki **(v 1000 €)**, razmernostna.

> ⚠️ **Izpit (profesor):** pri spremenljivki **vedno napiši mersko enoto** (tu: v 1000 €). **Ne krajšaj** imena spremenljivke, ne piši npr. »LNP«, ampak »letni neto prejemki«.

| Ocena | Formula | Vrednost |
|---|---|---|
| aritmetična sredina | ȳ = Σyᵢ / n = 1401,5 / 46 | **30,47** |
| varianca | s² = Σ(yᵢ − ȳ)² / (n − 1) | **163,16** |
| standardni odklon | s = √s² | **12,77** |
| min / max | | **17,9 / 80,7** |
| variacijski razmik | vr = y_max − y_min | **62,8** |
| koeficient variacije | kv = s / ȳ | **0,419 (41,9 %)** |
| mediana (za primerjavo) | | 25,05 |

- **⚠️ Izpit: kako zapisati izračun (profesor)**
1. Napiši **formulo**.
2. **Vstavi številke** vanjo, da se vidi postopek.
3. Napiši **rezultat**.

Samo formula in »x = 16« ni dovolj, ker izgleda prepisano.

**Interpretacije, kot jih želi profesor** (vedno dodaj enoto in preračunaj iz 1000 €):
- **ȳ:** »Zaposleni v vzorcu imajo različne letne neto prejemke, v povprečju 30,47 · 1000 € = **30.470 €**.«
- **s²:** »Ocena variance, ki meri velikost odklonov opazovanih vrednosti letnih neto prejemkov od ocenjenega povprečja, je enaka **163,16 · 10⁶**.«
  - **Enote ne pišemo**, ker »evri na kvadrat« ne obstajajo.
  - 10⁶ dobimo, ker (1000)² = 10⁶.
- **s:** »Ocena standardnega odklona, ki meri velikost odklonov opazovanih vrednosti letnih neto prejemkov od ocenjenega povprečja, je enaka 12,77 · 10³ € = **12.770 €**.«
  - Standardni odklon ima spet enoto (€), ker koren »odpravi« kvadrat.

- **vr:** variacijski razmik je razlika med največjo in najmanjšo vrednostjo.
  - Formula: vr = y_max − y_min = 80,7 − 17,9 = 62,8.
  - Interpretacija: »Ocenjujemo, da je razlika med najvišjimi in najnižjimi letnimi neto prejemki **62,80 · 10³ € = 62.800 €**.«
- **Absolutne ali relativne mere:** s², s in vr so **absolutne** mere variabilnosti.
  - Odvisne so od merskih enot, zato **niso primerljive med spremenljivkami**.
  - Za primerjavo potrebujemo **relativno** mero, to je koeficient variacije.
  - kv ni odvisen od merskih enot, zato je primerljiv med spremenljivkami.
- **kv:** ocena koeficienta variacije omogoča primerjavo med spremenljivkami.
  - Formula: kv = s / ȳ = 12,77 / 30,47 = 0,419 → 42 %.
  - Interpretacija: »Ocenjujemo, da je standardni odklon **42 % ocenjenega povprečja**.«
  - ⚠️ Študenti imajo pri tem komentarju težave. Pomaga znanje iz 6. razreda osnovne šole: količnik pove, **kolikšen del imenovalca (celote) predstavlja števec**. Števec je s, imenovalec je ȳ, rezultat izraziš v %.

**Ideja variabilnosti (graf na vajah):**
1. Variabilnost merimo z **odkloni** opazovanih vrednosti od povprečja (yᵢ − ȳ).
2. Odkloni so pozitivni in negativni. Njihova vsota je vedno 0, zato bi se med seboj izničili.
3. Zato jih **kvadriramo**, da dobimo pozitivne vrednosti, ki jih lahko seštejemo.
4. Iz vsote kvadratov izračunamo povprečje (deljeno z n − 1). To je **varianca**.
5. Koren variance je **standardni odklon**, ki je spet v izvirnih enotah.

**Porazdelitev ni simetrična, je asimetrična v desno:**
  - ȳ (30,5) > Me (25,05);
  - v boxplotu so trije osamelci zgoraj (55,4, 65,1 in 80,7);
  - histogram ima dolg desni rep.
- Pri varianci deliš z **n − 1**, ker gre za **vzorec** (nepristranska ocena).

**Grafikon kvantilov (boxplot), razlaga na vajah:**
- **Debela črna črta** je mediana (Me = 25,05).
- **Spodnji rob škatle** je ocena Q₁ (≈ 22,8), **zgornji rob** je ocena Q₃ (≈ 33,3).
- **Kvartilni razmik** je razlika med njima: Q₃ − Q₁ ≈ 10,5. V škatli je srednjih 50 % enot.
- **Spodnja črta (ročaj)** je minimum (17,9).
- **Zgornja črta (ročaj)** je maksimum **brez osamelcev**: **y*ₘₐₓ = 46,6**.
- **Krogci** so osamelci (outliers), torej enote, ki močno odstopajo: 55,4, 65,1 in 80,7.
  - R za osamelce šteje vse, kar je dlje kot 1,5 · kvartilni razmik od škatle.
- Q₁/Q₃ v boxplotu (22,8 / 33,3) se malo razlikujeta od `quantile()` (22,9 / 33,3), ker R pri boxplotu uporablja drugačno metodo računanja kvartilov.

**Histogram:** **unimodalna** porazdelitev (en vrh, pri 20–40), **asimetrična v desno**.

**b) Frekvenčna porazdelitev** (meje razredov 0,5 / 20,5 / 40,5 …, tako da 20,4 spada v 1. razred, 20,6 pa v 2.)

| Razred | Sredina yₖ | fₖ | fₖ° | Fₖ | Fₖ° |
|---|---|---|---|---|---|
| 1–20 | 10,5 | 7 | 0,152 | 7 | 0,152 |
| 21–40 | 30,5 | 30 | 0,652 | 37 | 0,804 |
| **41–60** | **50,5** | **7** | **0,152** | **44** | **0,957** |
| 61–80 | 70,5 | 1 | 0,022 | 45 | 0,978 |
| 81–100 | 90,5 | 1 | 0,022 | 46 | 1,000 |

- **3. razred:**
  - y₃ = (40,5 + 60,5)/2 = 50,5;
  - F₃ = F₂ + f₃ = 37 + 7 = 44;
  - f₃° = 7/46 = 0,152;
  - F₃° = 44/46 = 0,957.
- **Razlaga:**
  - 7 oseb (15,2 %) ima prejemke med 41 in 60 tisoč €;
  - 44 oseb (95,7 %) ima prejemke do 60 tisoč €.

**Razlaga 3. razreda (profesorjeva formulacija, uporablja prave meje):**
- **f₃ = 7:** 7 v vzorec vključenih zaposlenih ima letne neto prejemke **nad 40,5 do vključno 60,5 (· 1000 €)**.
- **f₃° = 0,152:** 15,2 % v vzorec vključenih zaposlenih ima letne neto prejemke nad 40.500 € do vključno 60.500 €.
- **F₃ = 44:** 44 v vzorec vključenih zaposlenih ima letne neto prejemke **do vključno 60,5 · 1000 € = 60.500 €**.
- **F₃° = 0,957:** 95,7 % v vzorec vključenih zaposlenih ima letne neto prejemke **do vključno 60.500 €**.

**Sredina razreda (profesor):** sredina razreda je **reprezentant vseh vrednosti v posameznem razredu**. Brez sredin razredov frekvenčne porazdelitve v R ne moremo narediti. Vsako vrednost nadomestimo s sredino njenega razreda z ukazom `recode(...)` iz paketa `car`.

**c) Ocene iz razvrščenih podatkov** (vsaka vrednost nadomeščena s sredino razreda):
- ȳ = 32,67, s² = 235,17, s = 15,34, kv = 46,9 %.
- Rezultati se razlikujejo od a), ker z razvrščanjem izgubimo informacijo.
- **9. decil:** P₉₀ = 50,5 (R: `quantile(podatki$PrejemkiRaz, 0.9)`).
  - Iz nerazvrščenih podatkov bi bil P₉₀ ≈ 45,05.
  - 90 % oseb ima torej prejemke največ ~50 tisoč €.

### Frekvenčna porazdelitev v R: `frq` in `freq` (profesor) ⭐ 1. kolokvij
**`frq()` iz paketa `sjmisc`:** ta tabela bo **zagotovo na 1. kolokviju**, z zbrisanimi vrednostmi, ki jih moraš dopolniti.

```
Value |  N | Raw % | Valid % | Cum. %
10.50 |  7 | 15.22 |   15.22 |  15.22
30.50 | 30 | 65.22 |   65.22 |  80.43
50.50 |  7 | 15.22 |   15.22 |  95.65
70.50 |  1 |  2.17 |    2.17 |  97.83
90.50 |  1 |  2.17 |    2.17 | 100.00
```
| Stolpec | Pomen | Oznaka |
|---|---|---|
| Value | **vedno sredine razredov** | yₖ |
| N | ⚠️ **frekvenca razreda**, NE velikost populacije oz. vzorca (ta je n) | fₖ |
| Raw % | relativna frekvenca v % | fₖ° · 100 |
| Valid % | relativna frekvenca v %, **brez manjkajočih vrednosti** (missing) | |
| Cum. % | kumulativa relativnih frekvenc v % | Fₖ° · 100 |

- Študente zbega **N**: v tej tabeli je to frekvenca, velikost populacije oz. vzorca pa je mali **n**.
- V R se tabela izračuna v 5 sekundah.
- ⚠️ **V odgovoru vedno poudari razred, ne samo sredine.** 50,5 predstavlja nekoga iz razreda »nad 40,5 do vključno 60,5 (· 1000 €)«.

**`freq()` iz paketa `summarytools`:**
- Na začetku so sredine razredov.
- Sledita dva sklopa stolpcev (% Valid in % Total), ki sta **v tem primeru enaka**, ker nimamo manjkajočih vrednosti.
- Lokalno potrebuje XQuartz, v Posit Cloudu deluje.

**Parametri iz frekvenčne porazdelitve:** zakaj je ȳ = 32,67 in ne 30,47 kot prej (in so drugačne tudi vse ostale ocene)?
- Za izračun smo uporabili **sredine razredov**, ki so zgolj **reprezentanti** posameznih razredov, ne dejanske vrednosti.

**9. decil: domača naloga.**
- R: `quantile(podatki$PrejemkiRaz, p = 0.90)` = 50,5.
- Ker F₂° = 0,804 < 0,90 ≤ F₃° = 0,957, leži D₉ v **3. razredu**.
- Interpretacija: »Ocenjujemo, da ima 90 % v vzorec vključenih zaposlenih letne neto prejemke **do vključno 3. razreda (nad 40,5 do vključno 60,5 · 1000 €)**, 10 % pa višje.«

### R ukazi
- `read.table("V01-2_podatki.csv", header=TRUE, sep="", dec=",")`: uvoz podatkov (decimalna vejica!).
- `pastecs::stat.desc(x)`: opisna statistika.
  - Izpis: `nbr.val`, `min`, `max`, `range`, `sum`, `median`, `mean`, `var`, `std.dev`, `coef.var`.
  - `coef.var` je v deležu, ne v %.
- `boxplot()`: grafikon kvantilov.
- `hist(x, breaks=seq(0,100,20))`: histogram.
- `car::recode(x, "0.5:20.5=10.5; …")`: razvrščanje v razrede (vrednost → sredina razreda).
- `sjmisc::frq()` / `summarytools::freq()`: frekvenčna tabela.
- `quantile(x, p=0.9)`: poljubni kvantil.

---
