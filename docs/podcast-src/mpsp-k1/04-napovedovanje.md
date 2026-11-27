# Epizoda 4 — Predvidevanje povpraševanja

Tema: Management proizvodnih in storitvenih procesov. Lastna razlaga snovi z lastnimi primeri.

## Zakaj napovedujemo

Napoved povpraševanja je osnova za skoraj vse odločitve v procesih: koliko ljudi zaposliti, koliko materiala naročiti, kdaj povečati zmogljivost. Napoved je vedno napačna; vprašanje je le, za koliko, zato merimo napako.

- **Kvalitativne metode:** mnenja strokovnjakov, prodajalcev, raziskave trga. Uporabne, kadar ni podatkov (nov izdelek).
- **Kvantitativne metode:** iz preteklih podatkov. Časovne vrste (drseča sredina, eksponentno glajenje) in vzročne metode (regresija).
- Časovna vrsta ima lahko **trend** (dolgoročno naraščanje ali padanje), **sezonskost** (ponavljanje v letu), **cikel** (večletna nihanja) in **slučajna nihanja**.

## Metode za kratkoročno napovedovanje

- **Naivna metoda:** napoved za naslednje obdobje je zadnje dejansko povpraševanje, F_t = D_(t−1).
- **Drseča sredina (n obdobij):** napoved je povprečje zadnjih n dejanskih povpraševanj.
  - Majhen n: napoved se hitro odzove na spremembe, a bolj niha.
  - Velik n: napoved je stabilna, a se počasi odzove.
- **Eksponentno glajenje:** F_t = F_(t−1) + α · (D_(t−1) − F_(t−1)).
  - Nova napoved je stara napoved, popravljena za delež α napake.
  - **Nizka α:** stabilne napovedi, manj odzivne. **Visoka α:** odzivne napovedi, manj stabilne.
  - Prve napovedi nimamo, zato jo vzamemo z naivno metodo.

## Napaka napovedi

- **Napaka** e_t = D_t − F_t. Pozitivna napaka pomeni, da smo povpraševanje **podcenili** (napoved je bila prenizka), negativna, da smo ga precenili.
- **PANN** (povprečna absolutna napaka napovedi, angl. MAD) = Σ|e_t| / n, kjer je n število obdobij, za katera računamo napako. Za koliko se napoved v povprečju zmoti. **Nižja PANN = zanesljivejša metoda.**
- **KNN** (kumulativna napaka) = Σe_t. Če je stalno pozitivna (ali negativna), napoved sistematično podcenjuje (ali precenjuje). KNN blizu 0 pomeni le, da so se napake izničile, ne pa, da so bile majhne.

## Lasten primer: drseča sredina zaostaja za trendom

Tedenska prodaja kolesarskih čelad v tednih 1–6: 200, 230, 210, 250, 240, 260. Prodaja ima **trend** navzgor.

3-tedenska drseča sredina:
- 4. teden: (200 + 230 + 210)/3 = 213,3; dejansko 250 → napaka +36,7.
- 5. teden: (230 + 210 + 250)/3 = 230,0; dejansko 240 → napaka +10,0.
- 6. teden: (210 + 250 + 240)/3 = 233,3; dejansko 260 → napaka +26,7.

- **PANN** = (36,7 + 10,0 + 26,7)/3 = **24,4**: napoved se v povprečju zmoti za 24 čelad.
- **KNN** = 36,7 + 10,0 + 26,7 = **73,3**: vse napake so pozitivne, zato napoved **sistematično podcenjuje** prodajo. Vzrok je trend: povprečje preteklih tednov je vedno nižje od trenutne ravni.
- Pri izrazitem trendu zato drseča sredina in eksponentno glajenje nista dobra izbira. Bolje je uporabiti metodo, ki trend upošteva, npr. regresijo s časom.

## Lasten primer: kako α vpliva na odziv

Povpraševanje po kavnih kapsulah v trgovini je bilo dolgo 100 škatel na teden, nato pa zaradi akcije sosednje trgovine skoči na **150 in tam ostane**. Začetna napoved je 100.

| Teden po skoku | α = 0,2 | α = 0,6 |
|---|---|---|
| 1 | 100 + 0,2 · 50 = 110,0 | 100 + 0,6 · 50 = 130,0 |
| 2 | 110 + 0,2 · 40 = 118,0 | 130 + 0,6 · 20 = 142,0 |
| 3 | 118 + 0,2 · 32 = 124,4 | 142 + 0,6 · 8 = 146,8 |

- Visoka α (0,6) se na trajno spremembo hitro odzove, nizka α (0,2) še po treh tednih zaostaja za 25 škatel.
- Če pa bi bil skok le enkraten (naslednji teden spet 100), bi visoka α napoved po nepotrebnem dvignila. Nizka α je stabilnejša pri naključnih nihanjih.
- Izbira α je torej kompromis med **odzivnostjo** in **stabilnostjo**. V praksi preizkusimo več vrednosti na preteklih podatkih in izberemo tisto z najnižjo PANN.

## Regresija za dolgoročno napovedovanje

Pri vzročni metodi povpraševanje (y) pojasnimo z drugo spremenljivko (x).
- Premica **ŷ = a + b · x**; b = (n Σxy − Σx Σy) / (n Σx² − (Σx)²), a = ȳ − b · x̄.
- **b** pove, za koliko se y v povprečju spremeni, če x naraste za 1.
- **r** (korelacijski koeficient, od −1 do 1) pove smer in jakost povezave; **r²** (determinacijski koeficient) pove, kolikšen delež variabilnosti y pojasni x.
- Regresija je primerna za **dolgoročno** napovedovanje (trend), za kratkoročno uporabimo drsečo sredino ali eksponentno glajenje.
- Napoved zunaj opazovanega razpona x je **ekstrapolacija** in je manj zanesljiva.

### Lasten primer: avtošola in radijski oglasi
x = ure radijskih oglasov na teden, y = poizvedbe za tečaj (v desetih), pet tednov:

| x | y | x − x̄ | y − ȳ | (x − x̄)(y − ȳ) | (x − x̄)² |
|---|---|---|---|---|---|
| 2 | 5 | −4 | −6 | 24 | 16 |
| 4 | 9 | −2 | −2 | 4 | 4 |
| 6 | 10 | 0 | −1 | 0 | 0 |
| 8 | 15 | 2 | 4 | 8 | 4 |
| 10 | 16 | 4 | 5 | 20 | 16 |

- x̄ = 6, ȳ = 11; Σ(x − x̄)(y − ȳ) = 56; Σ(x − x̄)² = 40.
- b = 56 / 40 = **1,4**: ura oglasov več prinese v povprečju 14 poizvedb več.
- a = ȳ − b · x̄ = 11 − 1,4 · 6 = **2,6**: brez oglasov okoli 26 poizvedb (ljudje pridejo tudi sami).
- Σ(y − ȳ)² = 82, zato r = 56 / √(40 · 82) = **0,98** in r² = **0,96**: oglasi pojasnijo 96 % variabilnosti poizvedb.
- Napoved za 7 ur oglasov: 2,6 + 1,4 · 7 = **12,4** (124 poizvedb), znotraj opazovanega razpona 2–10 ur.
- Za 15 ur bi dobili 23,6, a to je **ekstrapolacija**: ne vemo, ali bi se poslušalci pri tolikšni količini oglasov še enako odzivali, zato je napoved manj zanesljiva.
