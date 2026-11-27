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

## Lasten primer: tedenska prodaja kolesarskih čelad

Povpraševanje v tednih 1–6: 200, 230, 210, 250, 240, 260. Primerjamo 3-tedensko drsečo sredino in eksponentno glajenje z α = 0,3 (začetna napoved F₂ = D₁ = 200).

| Teden | D | Drseča sredina (3) | e | Eksp. glajenje (0,3) | e |
|---|---|---|---|---|---|
| 2 | 230 | – | – | 200,0 | +30,0 |
| 3 | 210 | – | – | 200 + 0,3 · 30 = 209,0 | +1,0 |
| 4 | 250 | (200 + 230 + 210)/3 = 213,3 | +36,7 | 209 + 0,3 · 1 = 209,3 | +40,7 |
| 5 | 240 | (230 + 210 + 250)/3 = 230,0 | +10,0 | 209,3 + 0,3 · 40,7 = 221,5 | +18,5 |
| 6 | 260 | (210 + 250 + 240)/3 = 233,3 | +26,7 | 221,5 + 0,3 · 18,5 = 227,1 | +32,9 |

- **PANN za tedne 4–6:** drseča sredina (36,7 + 10,0 + 26,7)/3 = **24,4**; eksponentno glajenje (40,7 + 18,5 + 32,9)/3 = **30,7**.
- Izberemo **drsečo sredino**, ker ima nižjo PANN.
- Vse napake so pozitivne (KNN drseče sredine 73,3, eksponentnega glajenja 92,1): obe metodi **sistematično podcenjujeta**, ker ima prodaja **trend** navzgor. Drseča sredina in eksponentno glajenje vedno zaostajata za trendom.
- Napoved za 7. teden: drseča sredina (250 + 240 + 260)/3 = **250**; eksponentno glajenje 227,1 + 0,3 · 32,9 = **237**.

## Regresija za dolgoročno napovedovanje

Pri vzročni metodi povpraševanje (y) pojasnimo z drugo spremenljivko (x).
- Premica **ŷ = a + b · x**; b = (n Σxy − Σx Σy) / (n Σx² − (Σx)²), a = ȳ − b · x̄.
- **b** pove, za koliko se y v povprečju spremeni, če x naraste za 1.
- **r** (korelacijski koeficient, od −1 do 1) pove smer in jakost povezave; **r²** (determinacijski koeficient) pove, kolikšen delež variabilnosti y pojasni x.
- Regresija je primerna za **dolgoročno** napovedovanje (trend), za kratkoročno uporabimo drsečo sredino ali eksponentno glajenje.
- Napoved zunaj opazovanega razpona x je **ekstrapolacija** in je manj zanesljiva.

### Lasten primer: spletna trgovina
x = obiski spletne strani v mesecu (v tisočih): 12, 15, 18, 20, 22, 25.
y = naročila (v stotinah): 30, 36, 41, 48, 50, 57.
- n = 6, Σx = 112, Σy = 262, Σx² = 2.202, Σxy = 5.123.
- b = (6 · 5.123 − 112 · 262) / (6 · 2.202 − 112²) = (30.738 − 29.344) / (13.212 − 12.544) = 1.394 / 668 = **2,087**.
- a = 262/6 − 2,087 · 112/6 = 43,67 − 38,96 = **4,71**.
- ŷ = 4,71 + 2,087 · x: tisoč obiskov več prinese v povprečju 2,09 stotine (209) naročil več.
- r = 0,995, r² = 0,991: obiski pojasnijo 99 % variabilnosti naročil.
- Napoved za 21 tisoč obiskov: 4,71 + 2,087 · 21 = **48,5 stotine naročil** (znotraj razpona, zanesljivo).
- Napoved za 30 tisoč obiskov: **67,3 stotine** je ekstrapolacija (opazovali smo do 25 tisoč), zato manj zanesljiva.
