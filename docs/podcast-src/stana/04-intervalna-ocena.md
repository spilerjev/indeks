# Epizoda 4 — Točkovna in intervalna ocena (P04 + V04)

Predmet: Statistična analiza (2. letnik). Vir: lastni zapiski predavanj in vaj, pripravljeni za zvočno razlago.

## P04 — Ocenjevanje parametrov: točkovna in intervalna ocena (27. 10. 2026)

Gradivo: gradivo (22 prosojnic), R: gradivo.

### Pregled v enem stavku
Iz vzorca izračunamo oceno (npr. ȳ = 15 l), ker pa vemo, da se ocene od vzorca do vzorca razlikujejo, okoli nje postavimo **interval**, za katerega smo npr. 95 % prepričani, da zajame pravo vrednost parametra.

### Oznake (pr. 3)
| | populacija | en vzorec | vsi možni vzorci |
|---|---|---|---|
| število enot | N | n | (N nad n) |
| spremenljivka | Y | Y | g (cenilka) |
| sredina | μ_Y | ȳ | E(g) |
| variabilnost | σ², σ | s², s | Var(g), **SE(g)** |
Γ (gama) = splošna oznaka za parameter, ki ga ocenjujemo.

### Točkovna vs. intervalna ocena (pr. 4)
- **Točkovna:** g(v) = ena številka (npr. ȳ = 15 l).
- **Intervalna:** g_s < Γ < g_z ; α — dvostranska, ali enostranska (samo spodnja ali samo zgornja meja).

### Stopnja tveganja α (pr. 5) ⭐
- α = verjetnost, da se zgodi tisto, česar nočemo = **delež vzorcev, pri katerih interval NE zajame prave vrednosti**.
- **Stopnja zaupanja = 1 − α** (α = 5 % ↔ 95 % interval zaupanja).
- α izberemo **vnaprej** (ali ga določi naročnik), ne iz podatkov.

**Profesorica:** intervalna ocena ima **vedno zraven α** — brez α je interval brezvezna informacija (ne vemo, kako zanesljiv je).
- α se **ne izračuna** iz podatkov — **izberemo ga vnaprej** (raziskovalec) ali ga **določi naročnik**; na izpitu je podan v nalogi (»pri 5 % tveganju«, »z 1-odstotnim tveganjem«, »95 % interval zaupanja« → α = 5 %).
- Kompromis: manjši α → večja zanesljivost, a širši (manj natančen) interval. α = 0 bi dal interval (−∞, ∞) — 100 % pravilen, a neuporaben.
- Iz α nato dobimo z (tabela): dvostransko z_α/2, enostransko z_α.

### Iz česa sestavimo interval (pr. 6)
1. α → iz tabele z_α/2 (ali z_α), 2. točkovna ocena g(v), 3. standardna napaka SE(g), 4. predpostavka, da je **g ~ N(E(g), SE(g))** — velja, če je Y normalna ALI **n ≥ 100** (centralni limitni izrek).

### Dvostranski interval (pr. 7) ⭐⭐

**g(v) − z_α/2 · SE(g) < Γ < g(v) + z_α/2 · SE(g) ; α**
- = ocena ± **odklon zaupanja D_g = z_α/2 · SE(g)** (»margin of error«)
- širina = 2·D_g
- α = 5 % → z_0,025 = **1,96**; α = 1 % → z_0,005 = **2,58** (spet 1,96!)
- Razlaga: »Pri α = 5 % ocenjujemo, da je prava vrednost med g_s in g_z« oz. »95-odstotni interval zaupanja je med … in …«

### Enostranski interval (pr. 8)
- samo spodnja meja: g(v) − z_α · SE < Γ → »prava vrednost je **najmanj** g_s«
- samo zgornja meja: Γ < g(v) + z_α · SE → »prava vrednost je **največ** g_z«
- ⚠️ tu **z_α** (ne z_α/2): ves α je v enem repu → α = 5 % → z = 1,645; α = 1 % → z = 2,33.

### Pr. 9–10
- Graf: večina intervalov (1 − α) zajame pravo vrednost, delež α je zgreši — pri konkretnem intervalu ne vemo, ali je med »dobrimi«.
- **Meje zaokrožujemo NAVZVEN** (spodnjo navzdol, zgornjo navzgor) → interval ne zožamo → tveganje ne preseže α.

### Aritmetična sredina, veliki vzorci (pr. 11–12)
- cenilka ȳ = Σyᵢ/n, **nepristranska**: E(ȳ) = μ_Y
- **SE(ȳ) = σ/√n · √((N−n)/(N−1))**; ker σ ne poznamo → **se(ȳ) = s/√n · √(1 − f)**, f = n/N (delež izbora; √(1−f) = popravek za končno populacijo, pri majhnem f ≈ 1)
- ko SE ocenimo s s → strogo vzeto **t-porazdelitev** (m = n − 1 stopinj prostosti), za velike n skoraj enaka Z.
- Interval za μ: ȳ ± z_α/2 · se(ȳ); za **total** Y_tot = N·μ: N·ȳ ± z_α/2 · N·se(ȳ) (= meje za μ pomnožene z N, ista α).

### Primer 4.1 — mleko (pr. 13–16)
N = 60 000 gospodinjstev, n = 200, ȳ = 15 l, s = 12 l, α = 5 %.
1. se(ȳ) = 12/√200 · √(1 − 200/60 000) = 0,8485 · 0,9983 = **0,847**
2. t(199; 0,025) = 1,9759 ≈ **1,98** (z bi dal 1,96 — skoraj isto)
3. 15 ± 1,98 · 0,847 → **13,3 < μ < 16,7 l ; α = 0,05**
4. Razlaga: »Na podlagi vzorčnih podatkov pri α = 5 % ocenjujemo, da je bila povprečna mesečna količina kupljenega mleka med 13,3 in 16,7 litra na gospodinjstvo.«
5. Total: ×60 000 → **≈ 800 379 < Y_tot < 999 621 l** (prosojnica uporablja nezaokrožene meje in zaokroži navzven).

### Primer 3.3 nadaljevanje (pr. 17–18)
Vseh 15 vzorcev (n = 4) iz majhne populacije (μ = 4): z z-jem 2 od 15 intervalov zgreši μ → 13,3 % > 5 % (?!) — ker je n majhen in uporabimo s namesto σ. S **t-porazdelitvijo** (m = 3, širši intervali) zgreši samo 1/15 = 6,7 %. → pri majhnih vzorcih t, ne z.

### Delež (pr. 19–20)
- dihotomna spremenljivka (ima lastnost a / nima), parameter **Π = N_a/N**, cenilka **p = n_a/n** (nepristranska)
- n ≥ 100 → p ~ N
- **se(p) = √(p(1−p)/n) · √(1 − f)**
- interval: p ± z_α/2 · se(p); število enot N_a = N·Π → meje × N.

### Primer 4.2 — JEK2 (pr. 21)
n = 34 100, N = 1 696 893, n_a = 8140 proti; α = 1 %, **»največ«** → enostranska zgornja meja.
1. p = 8140/34 100 = **0,2387**
2. se(p) = √(0,2387·0,7613/34 100) · √(1 − 0,0201) = **0,002285**
3. z_0,01 = **2,33** (enostransko!)
4. Π < 0,2387 + 2,33 · 0,002285 = **0,2441 → 24,4 %**; N_a < 1 696 893 · 0,2441 ≈ **414 000** (prosojnica: 414 042)
5. »Pri α = 1 % ocenjujemo, da gradnje JEK2 ne podpira največ 24,4 % oz. največ ≈ 414 000 volilnih upravičencev.«
- **Na tabli (profesorica):** najprej ENOTA = volilni upravičenec, SPR = podpira gradnjo? DA/NE (dihotomna) → PAR: Π in N_a. Zapis: Γ < g ; α → Π < p_z ; α → Π < p + z_α · se(p) ; α → Π < 0,239 + 2,33 · 0,002 → **Π < 0,244 ; α = 1 %**.
- Število: N_a < N · 0,244 = 1 696 893 · 0,244 = 414 041,9 → **zaokrožimo navzgor (navzven) → 414 042** (tako dobi prosojnica).
- Pozor: z se(p) zaokroženim na 0,002 je 0,239 + 0,00466 = 0,2437 → 0,244 (navzgor); natančno 0,2440 — isto.

### Zgled vprašanj (pr. 22) — rešitve
1. Raznolikost vzorčnih ocen merimo s **C. standardno napako** povprečne cene (ne s standardnim odklonom — ta meri raznolikost posameznih parcel).
2. NI pravilna: **D.** Širina ∝ 1/√n → n z 125 na 250 (2×) → širina se zmanjša za faktor √2 (≈ 29 %), **ne prepolovi**. Za prepolovitev bi rabili 4× večji vzorec. (A, B, C, E držijo.)

---

## V04 — 4. vaje (intervalna ocena)

**Naloga 1** — neurje, N = 1500 objektov, n = 150, ȳ = 3800 €, s = 450 €.
a) se(ȳ) = 450/√150 · √(1 − 150/1500) = 36,74 · 0,9487 = **34,86**; z = 1,96 (n velik) → 3800 ± 1,96 · 34,86 = 3800 ± 68,3 → **3731,7 < μ < 3868,3 € ; α = 0,05**. Skupna škoda (×1500): **5 597 521 < Y_tot < 5 802 479 € ; α = 0,05**.
*Zakaj navajamo α?* Ker je interval samo ocena: α pove delež vzorcev iste velikosti, pri katerih interval parametra ne zajame; brez α ne vemo, kako zanesljiva je ocena (in z nižjim α dobimo drug interval).
b) **α = 0,01** → z = 2,58 (večji) → interval **širši** (≈ 180 € vs. 137 €): višja zanesljivost = manj natančna ocena.
c) **n = 100** → se večja → interval **širši** (≈ 170 € vs. 137 €).
d) **s = 400** → se manjša (manjša variabilnost spremenljivke) → interval **ožji** (≈ 121 €).

**Naloga 2** — N = 1385, n = 100, 44 poškodovanih; iščemo **spodnjo mejo** (enostransko), α = 0,01 → z = 2,33.
p = 0,44; se(p) = √(0,44 · 0,56/100) · √(1 − 100/1385) = 0,0496 · 0,9633 = **0,0478**.
Π > 0,44 − 2,33 · 0,0478 = **0,329 → 32,9 % ; α = 0,01**; število: N_a > 1385 · 0,3286 ≈ **455 objektov ; α = 0,01**.

---
