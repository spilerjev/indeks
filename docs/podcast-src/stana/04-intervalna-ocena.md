# Epizoda 4 — Točkovna in intervalna ocena

Tema: Statistična analiza. Lastna razlaga snovi z lastnimi primeri.

## V enem stavku

Iz vzorca izračunamo oceno (npr. ȳ = 24 €), ker pa se ocene od vzorca do vzorca razlikujejo, okoli nje postavimo **interval**, za katerega smo npr. 95-odstotno prepričani, da zajame pravo vrednost parametra.

## Oznake

| | populacija | en vzorec | vsi možni vzorci |
|---|---|---|---|
| število enot | N | n | (N nad n) |
| spremenljivka | Y | Y | g (cenilka) |
| sredina | μ_Y | ȳ | E(g) |
| variabilnost | σ², σ | s², s | Var(g), **SE(g)** |

Γ (gama) je splošna oznaka za parameter, ki ga ocenjujemo.

## Točkovna in intervalna ocena

- **Točkovna:** g(v) = ena številka (npr. ȳ = 24 €).
- **Intervalna:** g_s < Γ < g_z ; α — dvostranska ali enostranska (samo spodnja ali samo zgornja meja).

## Stopnja tveganja α ⭐

- α = verjetnost, da se zgodi tisto, česar nočemo = **delež vzorcev, pri katerih interval NE zajame prave vrednosti**.
- **Stopnja zaupanja = 1 − α** (α = 5 % ↔ 95-odstotni interval zaupanja).
- Intervalna ocena ima **vedno zraven α**. Brez α interval nima pomena, ker ne vemo, kako zanesljiv je.
- α se **ne izračuna iz podatkov**: izbere ga raziskovalec vnaprej ali ga določi naročnik. V nalogi je podan (»pri 5-odstotnem tveganju«, »95-odstotni interval« → α = 5 %).
- Kompromis: manjši α → večja zanesljivost, a širši (manj natančen) interval. α = 0 bi dal interval (−∞, ∞) — vedno pravilen, a neuporaben.
- Iz α dobimo z iz tabele: dvostransko z_α/2, enostransko z_α.

## Iz česa sestavimo interval

1. α → z_α/2 (ali z_α);
2. točkovna ocena g(v);
3. standardna napaka SE(g);
4. predpostavka **g ~ N(E(g), SE(g))**, ki velja, če je Y normalna ALI **n ≥ 100** (centralni limitni izrek).

## Dvostranski interval ⭐⭐

**g(v) − z_α/2 · SE(g) < Γ < g(v) + z_α/2 · SE(g) ; α**
- ocena ± **odklon zaupanja D_g = z_α/2 · SE(g)**; širina intervala = 2·D_g;
- α = 5 % → z = **1,96**; α = 1 % → z = **2,58**;
- razlaga: »Pri α = 5 % ocenjujemo, da je prava vrednost med g_s in g_z.«

## Enostranski interval

- samo spodnja meja: g(v) − z_α · SE < Γ → »prava vrednost je **najmanj** g_s«;
- samo zgornja meja: Γ < g(v) + z_α · SE → »prava vrednost je **največ** g_z«;
- tu je **z_α** (ne z_α/2), ker je ves α v enem repu: α = 5 % → z = 1,645; α = 1 % → z = 2,33.

## Kako brati intervale

- Če bi vzeli veliko vzorcev, bi večina intervalov (delež 1 − α) zajela pravo vrednost, delež α pa bi jo zgrešil. Za konkreten interval ne vemo, ali je med »dobrimi«.
- **Meje zaokrožujemo NAVZVEN** (spodnjo navzdol, zgornjo navzgor), da intervala ne zožamo in tveganje ne preseže α.

## Aritmetična sredina, veliki vzorci

- cenilka ȳ = Σyᵢ/n je **nepristranska**: E(ȳ) = μ_Y;
- **SE(ȳ) = σ/√n · √((N−n)/(N−1))**; ker σ ne poznamo → **se(ȳ) = s/√n · √(1 − f)**, f = n/N; √(1 − f) je popravek za končno populacijo, pri majhnem f je skoraj 1;
- ko SE ocenimo s s, je porazdelitev strogo vzeto **t** z m = n − 1 stopinjami prostosti; pri velikem n je skoraj enaka Z;
- interval za μ: ȳ ± z_α/2 · se(ȳ); za **vsoto** Y_tot = N·μ: meje za μ pomnožimo z N (ista α).

## Rešen primer: mesečni stroški mobilne telefonije

N = 40 000 gospodinjstev v občini, n = 250, ȳ = 24 €, s = 9 €, α = 5 %.
**Enota:** gospodinjstvo. **Spremenljivka:** mesečni stroški mobilne telefonije (v €). **Parameter:** μ in vsota Y_tot.
1. se(ȳ) = 9/√250 · √(1 − 250/40 000) = 0,5692 · 0,9969 = **0,567 €**
2. t(249; 0,025) ≈ **1,97** (z bi dal 1,96 — skoraj isto)
3. 24 ± 1,97 · 0,567 = 24 ± 1,12 → **22,88 < μ < 25,12 € ; α = 0,05**
4. Razlaga: »Na podlagi vzorčnih podatkov pri α = 5 % ocenjujemo, da so povprečni mesečni stroški mobilne telefonije med 22,88 in 25,12 € na gospodinjstvo.«
5. Vsota (× 40 000): **915 298 < Y_tot < 1 004 702 € ; α = 0,05** — vsa gospodinjstva v občini skupaj porabijo med približno 0,92 in 1,00 milijona € na mesec.

## Majhni vzorci: zakaj t in ne z

Populacija petih prijateljev s knjigami (Y = 1, 4, 6, 2, 7; μ = 4), vsi vzorci po n = 3:
- Če za vsak od 10 vzorcev naredimo 95-odstotni interval s **z = 1,96** in oceno se iz vzorca, **2 od 10 intervalov zgrešita μ** (vzorca 1, 4, 2 in 4, 6, 7). To je 20 %, precej več kot obljubljenih 5 %.
- Razlog: n je majhen in namesto σ uporabimo s, ki se sam spreminja od vzorca do vzorca.
- S **t-porazdelitvijo** (m = 2, t = 4,30) so intervali širši in **noben** ne zgreši.
- Sklep: pri majhnih vzorcih uporabimo t, ne z.

## Delež

- dihotomna spremenljivka (enota ima lastnost ali je nima), parameter **Π = N_a/N**, cenilka **p = n_a/n** (nepristranska);
- n ≥ 100 → p je približno normalna;
- **se(p) = √(p(1−p)/n) · √(1 − f)**;
- interval: p ± z_α/2 · se(p); za število enot N_a = N·Π meje pomnožimo z N.

## Rešen primer: toplotne črpalke (zgornja meja)

N = 820 000 gospodinjstev, n = 5 000, toplotno črpalko jih ima n_a = 1 150. Zanima nas, **največ** kolikšen je delež; α = 1 % → enostranska zgornja meja.
**Enota:** gospodinjstvo. **Spremenljivka:** ima toplotno črpalko (da / ne), dihotomna. **Parametra:** Π in N_a.
1. p = 1 150/5 000 = **0,23**
2. se(p) = √(0,23 · 0,77/5 000) · √(1 − 5 000/820 000) = **0,00593**
3. z_0,01 = **2,33** (enostransko!)
4. Π < 0,23 + 2,33 · 0,00593 = **0,2439 → 24,4 %**
5. N_a < 820 000 · 0,2439 ≈ **199 937 gospodinjstev** (zaokrožimo navzgor, navzven)
6. »Pri α = 1 % ocenjujemo, da ima toplotno črpalko največ 24,4 % gospodinjstev oziroma največ približno 200 000 gospodinjstev.«
- Zapis po korakih: Γ < g_z ; α → Π < p + z_α · se(p) ; α → **Π < 0,244 ; α = 1 %**.

## Širina intervala in velikost vzorca

- Raznolikost vzorčnih ocen merimo s **standardno napako**, ne s standardnim odklonom (ta meri raznolikost posameznih enot).
- Širina intervala je sorazmerna z 1/√n. Če vzorec podvojimo, se interval zoži za faktor √2 (za približno 29 %), **ne prepolovi**. Za polovično širino potrebujemo **štirikrat večji** vzorec.

## Rešen primer: škoda po toči

N = 2 000 poškodovanih avtomobilov, n = 160, ȳ = 1 450 €, s = 380 €.
**Enota:** poškodovan avtomobil. **Spremenljivka:** višina škode (v €).

a) se(ȳ) = 380/√160 · √(1 − 160/2 000) = 30,04 · 0,9592 = **28,82 €**; z = 1,96 (n je velik) → 1 450 ± 1,96 · 28,82 = 1 450 ± 56,5 → **1 393,5 < μ < 1 506,5 € ; α = 0,05**. Skupna škoda (× 2 000): **2 787 045 < Y_tot < 3 012 955 € ; α = 0,05**.
- *Zakaj navajamo α?* Ker je interval le ocena: α pove delež vzorcev iste velikosti, pri katerih interval parametra ne bi zajel. Brez α ne vemo, kako zanesljiva je ocena.

Kako se interval spremeni (širina je bila 113 €):
- b) **α = 0,01** → z = 2,58 → interval **širši** (149 €): višja zanesljivost, manjša natančnost;
- c) **n = 100** → se večja → interval **širši** (145 €);
- d) **s = 300 €** → se manjša (manjša variabilnost škod) → interval **ožji** (89 €).

## Rešen primer: delež trgovin brez dostopa za invalide (spodnja meja)

N = 1 200 trgovin, n = 120, brez dostopa jih je 30; iščemo **spodnjo mejo**, α = 1 % → z = 2,33.
- p = 30/120 = 0,25; se(p) = √(0,25 · 0,75/120) · √(1 − 120/1 200) = 0,0395 · 0,9487 = **0,0375**
- Π > 0,25 − 2,33 · 0,0375 = **0,1626 → najmanj 16,2 % ; α = 0,01**
- število: N_a > 1 200 · 0,1626 ≈ **195 trgovin ; α = 0,01** (spodnjo mejo zaokrožimo navzdol).
