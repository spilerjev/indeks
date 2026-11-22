# Epizoda 6 — Osnove preizkušanja domnev

Tema: Statistična analiza. Lastna razlaga snovi z lastnimi primeri.

## Ponovitev: natančnost in vzorčenje

- **Točnost = natančnost + nepristranskost.** Tarča: zadetki tesno skupaj, a mimo središča = natančno, a pristransko (netočno); razpršeni okoli središča = nepristransko, a nenatančno (netočno); tesno v središču = točno.
- **Natančnost = širina intervala.** Vplivajo α, n, variabilnost Y (pri povprečju) in ocena p (pri deležu).
- **Stratificirano vzorčenje** da pri isti α in istem n manjšo se in ožji interval kot ESV.
- Bistvena pomanjkljivost **kvotnega** vzorčenja: ni slučajno, zato ne moremo sklepati na populacijo.

## Dva načina sklepanja

- Preizkušanje domnev je osrednji del sklepne statistike.
- **Intervalna ocena** je uporabna predvsem pri **velikih vzorcih**; pri majhnih je se velika (interval je preširok) in ne velja predpostavka normalnosti. **Preizkušanje domnev** uporabljamo pri majhnih in velikih vzorcih.
- **Razlika v logiki:** pri intervalni oceni nič ne predpostavimo — iz vzorca ocenimo, kje je parameter. Pri preizkusu **najprej nekaj predpostavimo** (H₀, npr. μ = 330 ml) in preverimo, ali vzorec tej predpostavki preveč nasprotuje.
- **Slika:** pri intervalni oceni je zvon centriran pri **naši oceni ȳ** in sprašujemo, ali je prava μ znotraj intervala. Pri preizkusu je zvon centriran pri **predpostavljeni vrednosti μ₀** in pogledamo, ali naša ȳ pade znotraj območja μ₀ ± z·SE (H₀ ne zavrnemo) ali zunaj (zavrnemo). Širini sta enaki (2·z·SE): ista matematika, druga perspektiva.

## Osnovni pojmi

- **Statistična domneva** = trditev o parametru ali obliki porazdelitve.
- **H₀ (ničelna)** = trditev, ki jo preverjamo na podlagi vzorca; vanjo praviloma dvomimo. **Ne moremo je dokazati.**
- **H₁ (alternativna, raziskovalna)** = logično nasprotje H₀. Vanjo zapišemo trditev, ki jo želimo **dokazati**. Če vzorec preveč odstopa od H₀, H₀ zavrnemo in sklepamo v skladu s H₁.
- Domneve so vedno **v parih**; H₀ in H₁ se izključujeta in skupaj pokrijeta vse možnosti.
- **Pravilo: enačaj (=, ≥, ≤) je VEDNO v H₀**; H₁ ima ≠, < ali >.
- Domneve so vedno o **parametru** (μ, σ, Π), nikoli o vzorčni oceni (ȳ, s, p).
- Primeri: H₀: μ = 330, H₁: μ ≠ 330; H₀: μ₁ ≤ μ₂, H₁: μ₁ > μ₂; H₀: σ₁ = σ₂, H₁: σ₁ ≠ σ₂; skladnost porazdelitve H₀: f_j = f′_j.

**Lasten primer — pločevinka napitka, ki naj bi imela 330 ml:**

| Kaj želimo dokazati | H₀ | H₁ | preizkus |
|---|---|---|---|
| polnjenje ni 330 ml (karkoli drugega) | μ = 330 | μ ≠ 330 | dvostranski |
| pločevinke so **premalo napolnjene** | μ ≥ 330 | μ < 330 | enostranski levi |
| pločevinke so **preveč napolnjene** | μ ≤ 330 | μ > 330 | enostranski desni |

- **Nesestavljena domneva:** H₁ ima **eno samo** vrednost parametra (npr. H₀: μ = 330 proti H₁: μ = 325). Takrat lahko izračunamo β. V praksi redko.
- **Sestavljena domneva:** H₁ ima **več (neskončno mnogo)** vrednosti (≠, <, >). V praksi običajno. Pri ≠ so v H₁ vse vrednosti razen ničelne; pri enostranskem je v H₁ samo ena stran, druga pa spada v H₀ (takrat je sestavljena tudi H₀, npr. μ ≥ 330).

**Kam postaviti trditev, ki jo želimo dokazati** — lasten primer: proizvajalec koles trdi, da nova veriga zdrži v povprečju 12 000 km namesto dosedanjih 10 000 km (σ = 1 500 km je znan, n = 30). Trditev, ki jo želi dokazati, gre v H₁, dosedanje stanje v H₀: **H₀: μ = 10 000 km, H₁: μ = 12 000 km** (nesestavljeni domnevi). Napačno bi bilo dati trditev v H₀ ali v domnevo vpisati vzorčno oceno ȳ ali s namesto parametra.

## Pravilni in nepravilni sklepi ⭐

| Sklep \ Dejansko stanje | **H₀ velja** | **H₀ ne velja** |
|---|---|---|
| **H₀ ne zavrnemo** | pravilen, verjetnost **1 − α** | **napaka 2. vrste**, verjetnost **β** |
| **H₀ zavrnemo** | **napaka 1. vrste**, verjetnost **α** | pravilen, verjetnost **1 − β** (**moč preizkusa**) |

- **α = stopnja značilnosti** = tveganje, da zavrnemo H₀, ki dejansko velja. Izberemo jo sami **vnaprej**, npr. 5 %.
- **S** = območje nezavračanja (»sprejema«), **K** = kritično območje, **kritična meja g_k** ju loči in je določena z α.
- **β** je vedno odvisna od kritične meje (torej od α) in od tega, katera vrednost iz H₁ velja. Izračunamo jo lahko **samo pri nesestavljeni H₁**.
- **Moč preizkusa** (1 − β) je verjetnost, da H₀ pravilno zavrnemo, ko res ne velja.
- **Slika z dvema zvonovoma:** zgornji zvon (če velja H₀, center Γ₀) — desno od g_k je α; spodnji zvon (če velja H₁, center Γ₁) — levo od g_k je β, desno 1 − β. Lasten primer: H₀: Γ = 50, H₁: Γ = 54, kritično območje je desno. Če g_k premaknemo desno, se α zmanjša, β pa poveča (in obratno). Obe hkrati zmanjšamo samo z **večjim vzorcem** (ožja zvonova).

### Zakaj nikoli ne »sprejmemo« H₀

- Če rečemo »H₀ velja«, sporočimo, da smo o tem prepričani — a verjetnosti te napake (β) pri sestavljeni H₁ **ne poznamo**.
- Poznamo samo verjetnost napake v drugi smeri: **α**.
- Zato: zavrnitev H₀ → sklep z znano verjetnostjo napake (največ α) ✔; nezavrnitev → »**na podlagi vzorca H₀ ne moremo zavrniti**«, ne »H₀ velja«.
- Analogija s sodiščem: razsodba »ni dokazov za krivdo« še ne pomeni »nedolžen«.
- Iz istega razloga **trditev, ki jo želimo dokazati, damo v H₁**.
- β lahko zmanjšamo z **večjim vzorcem** (manjša standardna napaka).

## Rešen primer: polnilna linija za steklenice

Linija naj bi po pogodbi napolnila **2 400 steklenic na uro**. σ = 150 steklenic/uro (znan), opazujemo n = 36 ur → **SE = 150/√36 = 25 steklenic/uro**. H₀: μ = 2 400.
- Popravka (N − n)/(N − 1) ni, ker je populacija ur neskončna.

**a) Nesestavljena domneva:** H₁: μ = 2 340; α = 5 %; kritično območje je levo.
- kritična meja g_k = 2 400 − 1,645 · 25 = **2 358,9**;
- H₀ ne zavrnemo, če H₀ velja: **0,95** (1 − α); zavrnemo, če H₀ velja: **0,05** (α);
- H₀ ne zavrnemo, čeprav velja H₁ (μ = 2 340): β = P(ȳ > 2 358,9 | μ = 2 340) = P(Z > 0,76) = 1 − 0,7764 = **0,2236**;
- zavrnemo, ko velja H₁: **1 − β = 0,7764** (moč).

**b) Sestavljena domneva:** H₁: μ ≠ 2 400 → dvostranski preizkus, α/2 = 2,5 % na vsaki strani:
- območje nezavračanja **2 351 < ȳ < 2 449**;
- verjetnost nezavrnitve, če H₀ velja, je 0,95, zavrnitve 0,05; **β ni izračunljiv**, ker v H₁ ni ene same vrednosti.

**Risanje porazdelitve:** rišemo porazdelitev **cenilke ȳ**, ne posameznih ur, zato je razmik na osi **SE = 25**, ne σ = 150 (to je klasična napaka).
- os ȳ: 2 325, 2 350, 2 375, **2 400**, 2 425, 2 450, 2 475 (= 2 400 ± 1, 2, 3 SE);
- os z pod njo: −3, −2, −1, **0**, 1, 2, 3. Na sredini je ȳ = 2 400 in z = 0.

**c) Vzorec 36 ur da ȳ = 2 455 steklenic/uro** → z = (2 455 − 2 400)/25 = **2,2**.
- **Dvostransko** (H₀: μ = 2 400; H₁: μ ≠ 2 400): kritični z = ±1,96; 2,2 > 1,96 → **zavrnemo H₀**; p = 2 · (1 − 0,9861) = **0,0278**. Pri α = 5 % je zmogljivost linije značilno drugačna od pogodbene.
- **Enostransko levo** (H₀: μ ≥ 2 400; H₁: μ < 2 400): kritični z = −1,645; z = +2,2 je v območju nezavračanja → **H₀ ne moremo zavrniti**; p = **0,9861**. Ni dokaza, da je linija počasnejša — vzorec je celo nad 2 400.
- **Enostransko desno** (H₀: μ ≤ 2 400; H₁: μ > 2 400): kritični z = +1,645; 2,2 > 1,645 → **zavrnemo H₀**; p = **0,0139** (= 0,0278/2). Linija ima značilno **večjo** zmogljivost od pogodbene.

**Sklep ima dva dela:**
- **statistični:** pri α = 0,05 zavrnemo H₀ (μ = 2 400) in sprejmemo H₁: povprečna zmogljivost ni enaka 2 400. Ne trdimo, da je μ = 2 455 — to je samo vzorčna ocena;
- **vsebinski:** »Povprečna zmogljivost linije ni enaka zmogljivosti iz pogodbe.«

## Porazdelitve vzorčnih ocen pri majhnih vzorcih

- **Z** (povprečje pri normalni spremenljivki in znanem σ; delež pri velikem n), **t** (Gosset), **χ²** (Helmert, Pearson), **F** (Fisher, Snedecor). t, χ² in F imajo **stopinje prostosti (m)**; pri velikem m so podobne normalni.
- **Stopinje prostosti** = število vrednosti, ki se lahko prosto spreminjajo (število podatkov − število ocenjenih parametrov oz. neodvisnih zvez). Lastni primeri:
  - varianca iz vzorca 20 meritev: m = 20 − 1 = **19** (ȳ smo že ocenili);
  - skladnost porazdelitve s 5 kategorijami prevoza (avto, avtobus, kolo, peš, vlak): m = 5 − 1 = **4**;
  - premica y = a + bx iz 30 točk (dva parametra): m = 30 − 2 = **28**.
- **t:** simetrična, E(t) = 0, bolj sploščena od Z, Var = m/(m−2) > 1 (za m > 2); uporaba: povprečje, primerjava dveh povprečij, regresijski koeficienti.
- **χ²:** vsota kvadratov standardiziranih normalnih spremenljivk; **E = m, Var = 2m, Mo = max(0, m − 2)**; uporaba: varianca, skladnost porazdelitev.
- **F:** razmerje (X/m₁)/(Y/m₂), kjer sta X ~ χ²(m₁) in Y ~ χ²(m₂); **t² ~ F(1, m)**; uporaba: primerjava varianc, **ANOVA** (več povprečij), ustreznost regresijskega modela.

## Osnovna ideja in 4 koraki ⭐

Če vzorčna ocena pade v **K**, je odstopanje značilno → zavrnemo H₀ in sklepamo v skladu s H₁ pri α (oz. p). Če pade v **S**, preizkus **ni odkril značilnega odstopanja** in H₀ ne moremo zavrniti. **Tudi pri nezavrnitvi navedemo α.**
1. **Domnevi H₀ in H₁.** Trditev, ki jo želimo dokazati, gre v H₁.
2. **Izberemo preizkus** glede na parameter in porazdelitev ocen.
3. **Ugotovimo značilnost** odstopanja pri izbrani α — ali je ocena v kritičnem območju (dvo- ali enostransko).
4. **Sklep:** zavrnemo H₀ ali je ne moremo zavrniti → **vsebinski sklep**.

## Dvostranski in enostranski preizkus

- **Dvostranski:** H₀: Γ = Γ₀, H₁: Γ ≠ Γ₀; kritično območje na obeh straneh, **α/2 + α/2**. Odstopanje je lahko navzgor ali navzdol.
- **Enostranski:** H₁: Γ < Γ₀ (kritično območje na **levi**) ali Γ > Γ₀ (na **desni**); cela α je na eni strani. Smer izberemo **vnaprej**, ne po tem, ko vidimo podatke. Pri enostranskem lažje najdemo značilno odstopanje.
- ANOVA in χ²-preizkusi skladnosti imajo kritično območje samo na desni, zato tam ne govorimo o eno- ali dvostranskosti.

## Stopnja značilnosti α in p-vrednost ⭐

- **α** = delež vzorčnih ocen v kritičnem območju; običajno **0,05** (tudi 0,01, 0,001). Najvišja še sprejemljiva vrednost je praviloma 0,05. Če zavrnemo H₀, je verjetnost napake **največ α**.
- **p-vrednost** (v izpisih Prob. ali Sig.) = **najmanjša α, pri kateri bi še zavrnili H₀** (»točna stopnja značilnosti«); je verjetnost napake 1. vrste, če na podlagi tega vzorca H₀ zavrnemo.
- **Pravilo: p ≤ α → H₀ zavrnemo; p > α → H₀ ne moremo zavrniti.**
- **p enostranskega = p dvostranskega / 2** (če je ocena na »pravi« strani).
- Ko H₀ zavrnemo, je odstopanje **statistično značilno**: »na podlagi vzorčnih podatkov pri α = 5 % sklepamo, da …«. Ko je ne zavrnemo, **ne dokažemo, da H₀ velja** — podatki ji le ne nasprotujejo dovolj.
- **Ameriško statistično združenje (ASA, 2016):** meja 0,05 je stvar navade. **Nizka p ne pomeni nujno vsebinske pomembnosti** (statistična proti praktični značilnosti). Zlorabe: objavljanje samo značilnih rezultatov, prirejanje vzorca, postavljanje domnev šele po ogledu rezultatov.
