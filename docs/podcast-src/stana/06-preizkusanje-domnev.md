# Epizoda 6 — Osnove preizkušanja domnev

Predmet: Statistična analiza (2. letnik). Vir: lastni zapiski predavanj in vaj, pripravljeni za zvočno razlago.

## P06 — Osnove statističnega preizkušanja domnev

### Ponovitev P05 (predavanje 10. 11. 2026, zapisi s table)
- **Točnost vs. natančnost** (tarče na tabli):
  - natančno + **pristransko** → **netočno** (zadetki skupaj, a mimo centra)
  - **nenatančno** + nepristransko → **netočno** (zadetki okoli centra, a razpršeni)
  - natančno + nepristransko → **točno** (zadetki skupaj v centru)
  → točnost = natančnost + nepristranskost.
- **Natančnost = ŠIRINA intervala** (ožji = natančnejši). Vplivajo: **α**, **n**, **variabilnost Y** (pri aritm. sredini — s), **točkovna ocena p** (pri deležu — p(1−p)).
- Zahteve po natančnosti podamo **absolutno D_ȳ / D_p** ali **relativno D°_ȳ / D°_p**.
- **Stratificirano vs. ESV:** ESV ločeno po stratumih → manjša variabilnost znotraj stratumov → manjša varianca cenilke → manjša SE → **ožja (natančnejša) intervalna ocena pri isti α in istem n**.
- Bistvena pomanjkljivost **kvotnega** vzorčenja: **ni verjetnostno (slučajno)** → ne moremo sklepati na populacijo.

### Profesorica (10. 11.)
- Preizkušanje domnev = **osrednji del semestra**.
- Dva pogosta načina sklepanja: **intervalna ocena** ali **preizkušanje domnev**. Intervalna ocena je uporabna predvsem pri **velikih vzorcih** — pri majhnih je se velika (širok, neuporaben interval) in ne velja predpostavka normalnosti (n ≥ 100).
- **Razlika v logiki:** pri intervalni oceni nič ne predpostavimo — iz vzorca ocenimo, kje je parameter. Pri preizkusu domneve **najprej nekaj predpostavimo** (H₀, npr. μ = 2 kg) in nato preverimo, ali vzorec tej predpostavki preveč nasprotuje.
- Domneve = trditve, ki povedo nekaj o parametru (ali obliki porazdelitve).
- **Skici s table** (prečiščeno): 
  - levo **intervalna ocena**: zvon in interval ȳ ± z·SE sta centrirana pri **naši vzorčni oceni ȳ** → sprašujemo, ali je prava μ znotraj (»?« na tabli).
  - desno **preizkus domnev**: zvon in območje μ₀ ± z·SE sta centrirana pri **predpostavljeni vrednosti μ₀** (H₀) → pogledamo, ali naša ȳ pade znotraj (H₀ ne zavrnemo) ali zunaj (zavrnemo).
  - »=« na tabli: širini sta enaki (2·z·SE) → ista matematika, druga perspektiva.
  - Preizkušanje domnev: za male **+ velike** vzorce (dopis na tabli).

### Osnovni pojmi
- **Statistična domneva** = trditev o parametru ali obliki porazdelitve. Sklepanje o parametru: preizkušanje domnev (mali vzorci), intervalna ocena (veliki vzorci).
- **H₀ (ničelna)** = trditev, ki jo preverjamo (**ne moremo je dokazati**). **H₁ (alternativna, raziskovalna)** = logično nasprotje. Če vzorec preveč odstopa od H₀ → H₀ zavrnemo in sklepamo v skladu s H₁.
- Primeri: H₀: μ = 2 kg, H₁: μ ≠ 2 kg; H₀: μ ≥ 2, H₁: μ < 2; H₀: μ₁ ≤ μ₂, H₁: μ₁ > μ₂; H₀: σ₁ = σ₂, H₁: σ₁ ≠ σ₂; H₀: f_j = f′_j (skladnost porazdelitve).
- **Nesestavljene** domneve (po ena vrednost v H₀ in H₁: Γ = Γ₀ proti Γ = Γ₁) — v praksi redke. **Sestavljene** (v praksi običajne): H₁ ima **več možnih vrednosti** (≠, <, >).

**Profesorica (10. 11.):** H₀ = domneva, ki jo želimo preveriti; vanjo **praviloma dvomimo** (ne vedno). Če ji na podlagi vzorca ne moremo verjeti → zavrnemo in sklepamo v skladu s H₁. Domneve vedno **v parih** (H₀ + H₁ = logično nasprotje).
- **Pravilo: enačaj (=, ≥, ≤) je VEDNO v H₀**; H₁ ima ≠, < ali >.
- Tri variante (hlebec 2 kg):
  | Kaj želimo dokazati | H₀ | H₁ | preizkus |
  |---|---|---|---|
  | teža ni 2 kg (karkoli drugega) | μ = 2 | μ ≠ 2 | dvostranski |
  | hlebci so **prelahki** | μ ≥ 2 | μ < 2 | enostranski levi |
  | hlebci so **pretežki** | μ ≤ 2 | μ > 2 | enostranski desni |

**Profesorica:** nesestavljena = v domnevi **ena sama točka na premici** (H₀ in H₁ = dve konkretni, različni vrednosti) → redko v praksi. Sestavljena = **več vrednosti** → običajno.
- Preverjeno (⚠️ delno): »v H₁ so vse vrednosti razen ničelne« drži le pri **dvostranskem** (H₁: μ ≠ μ₀). Pri enostranskem je v H₁ samo **ena stran** (μ < μ₀), druga stran (μ > μ₀) pa spada v H₀ → takrat je sestavljena tudi H₀ (μ ≥ μ₀). Skupaj H₀ ∪ H₁ vedno pokrijeta vse možnosti.

### Pravilni in nepravilni sklepi ⭐
| Sklep \ Dejansko stanje | **H₀ velja** | **H₀ ne velja** |
|---|---|---|
| **H₀ ne zavrnemo** | pravilen, verjetnost **1 − α** | **napaka 2. vrste**, verjetnost **β** |
| **H₀ zavrnemo** | **napaka 1. vrste**, verjetnost **α** | pravilen, verjetnost **1 − β** (**moč preizkusa**) |

- **α = stopnja značilnosti** = tveganje, da zavrnemo H₀, ki dejansko velja.
- **S** = območje nezavračanja (»sprejema«), **K** = kritično območje (zavrnemo), **kritična meja g_k** loči S in K, določena z α. **β je vedno odvisna od kritične meje (α)** in od tega, katera vrednost iz H₁ velja. Pri sestavljeni H₁ β **ne moremo izračunati** (ne vemo, katera vrednost velja) → zato ne sprejemamo H₀, ampak jo »ne zavrnemo«.

**Prosojnica »Verjetnost nepravilnih sklepov pri nesestavljenih domnevah« (10. 11., zapisi s table)**
- Primer s table: H₀: Γ = Γ₀ = 16, H₁: Γ = Γ₁ = 20 (vsaka ena sama vrednost; Γ₀ < Γ₁ → kritično območje desno).
- **Zgornji graf (porazdelitev ocen, če velja H₀, center Γ₀):** α izberemo **VNAPREJ** → določi **kritično mejo g_k**. Levo od g_k = S (»sprejem«/nezavračanje, ploščina 1 − α), desno = K (kritično območje, ploščina α = napaka 1. vrste).
- **Srednji graf (če velja H₁, center Γ₁):** ploščina levo od g_k = **β** (ocena pade v S, čeprav velja H₁ → napačno ne zavrnemo); desno = **1 − β** (moč).
- **Spodnji graf (oba skupaj):** α in β sta »repa« dveh zvonov ob isti g_k. Premik g_k desno → α ↓, β ↑ (in obratno) → **β je vedno odvisna od kritične meje oz. α**. Oba hkrati zmanjšamo samo z večjim n (ožja zvonova).
- S = »sprejem« v narekovajih: H₀ ne sprejmemo, le **ne zavrnemo** (»najbrž velja, ker ni razloga, da ne bi«).

### Primer 6.1 — stroj za pakiranje čajnih vrečk
σ = 180, n = 81 → se = 180/√81 = **20 vrečk/uro**; H₀: μ = 4000.
**a) nesestavljena:** H₁: μ = 3950; α = 5 % → kritična meja (levi rep) g_k = 4000 − 1,645 · 20 = **3967,1**.
- H₀ ne zavrnemo, če H₀ velja: **0,95 (1 − α)**; zavrnemo, če H₀ velja: **0,05 (α)**.
- H₀ ne zavrnemo, če velja H₁ (μ = 3950): β = P(ȳ > 3967,1 | μ = 3950) = P(Z > 0,855) = **0,196** (profesorica na predavanju zaokroži z na **0,86** → F = 0,8051 → **β = 0,1949**, moč 0,8051); zavrnemo, če velja H₁: **1 − β = 0,804** (moč).
**b) sestavljena:** H₁: μ ≠ 4000 (prosojnica ima tipkarsko napako »40«) → dvostranski, α/2 = 2,5 % na vsaki strani: **3960,8 < ȳ < 4039,2** = območje nezavračanja. Verjetnost nezavrnitve, če H₀ velja: 0,95; zavrnitve: 0,05; **β ni izračunljiv** (ni ene vrednosti v H₁).

**Profesorica (10. 11.) – zakaj ne trdimo »H₀ velja«:**
- V splošnem (sestavljena H₁) **β ne moremo določiti**, razumeti pa moramo idejo.
- Če rečemo »H₀ velja«, naročniku sporočimo, da smo o tem prepričani — a verjetnosti te napake (β) **ne poznamo**.
- Poznamo samo verjetnost napake v nasprotni smeri: **α** (da zavrnemo H₀, ki velja).
- Zato: zavrnitev H₀ → sklep z znano verjetnostjo napake (≤ α) ✔; nezavrnitev → »na podlagi vzorca H₀ ne moremo zavrniti« (ne »H₀ velja«).
- Isti razlog, zakaj **trditev, ki jo želimo dokazati, damo v H₁**.

### Porazdelitve vzorčnih ocen (mali vzorci)
- **Z** (povprečje pri normalni spr. in znanem σ; delež pri velikih n), **t** (Gosset), **χ²** (Helmert/Pearson), **F** (Fisher–Snedecor). t, χ², F imajo **stopinje prostosti (m)**; pri velikem m so podobne normalni.
- **Stopinje prostosti** = število neodvisnih informacij oz. število vrednosti, ki se lahko »prosto« spreminjajo (število podatkov − število neodvisnih zvez/ocenjenih parametrov).
  - 6.2 a) varianca iz vzorca: **m = n − 1** (ker je ȳ ocenjen); b) 4 kategorije bivališč: **m = 4 − 1 = 3**; c) Cobb–Douglas Q = cKᵃLᵇ (3 parametri): m = n − (št. parametrov) 🔎 (prosojnica ne da rešitve).
- **t:** simetrična, E(t) = 0, bolj sploščena od Z, Var = m/(m−2) > 1 (m > 2); uporaba: povprečje, primerjava dveh povprečij, regresijski koeficienti.
- **χ²:** vsota kvadratov normalnih spr.; **E = m, Var = 2m, Mo = max(0, m−2)**; uporaba: varianca, skladnost porazdelitev.
- **F:** razmerje (X/m₁)/(Y/m₂), X ~ χ²(m₁), Y ~ χ²(m₂); stopinje m₁ (števec), m₂ (imenovalec); **t² ~ F(1, m)**; uporaba: primerjava varianc, **ANOVA** (več povprečij), ustreznost regresijskega modela.

### Osnovna ideja in 4 koraki ⭐
Če vzorčna ocena pade v **K** → značilno odstopanje → zavrnemo H₀, sklepamo v skladu s H₁ pri α (oz. p). Če pade v **S** → preizkus **ni odkril značilnega odstopanja**, H₀ ne moremo zavrniti (možno: večji vzorec; izjemoma H₀ sprejmemo, a tvegamo napako 2. vrste — temu se izogibamo). **Tudi pri nezavrnitvi navedemo α.**
1. **Domnevi H₀ in H₁** (izključujoči se). **Trditev, ki jo želimo dokazati, damo v H₁** (ker takrat vemo verjetnost napake).
2. Izberemo **preizkus** glede na parameter in porazdelitev ocen.
3. **Ugotovimo značilnost** odstopanja pri izbrani (čim nižji) α — ali je ocena v kritičnem območju (dvo- ali enostransko).
4. **Sklep:** zavrnemo H₀ ali ne moremo zavrniti → **vsebinski sklep**.

### Dvostranski in enostranski preizkus
- **Dvostranski:** H₀: Γ = Γ₀, H₁: Γ ≠ Γ₀; kritično območje na obeh straneh, **α/2 + α/2**. Primer 6.3 a): hlebec res tehta 2 kg?
- **Enostranski:** H₁: Γ < Γ₀ (levi rep) ali Γ > Γ₀ (desni rep); K samo na eni strani, celotna α na eni strani. Primer 6.3 b): hlebci so **prelahki** (H₀: μ ≥ 2 kg, H₁: μ < 2 kg). Smer izberemo **vnaprej** (ne po videnih podatkih). Pri enostranskem lažje najdemo značilno odstopanje.
- ANOVA, χ² preizkusi skladnosti: K samo na desni → ne govorimo o eno-/dvostranskosti.

### Stopnja značilnosti α in p-vrednost ⭐
- **α** = delež vzorčnih ocen v kritičnem območju; običajno **0,05** (tudi 0,01, 0,001). Če zavrnemo H₀, je verjetnost napake **največ α**.
- **p-vrednost** (Prob., Sig.) = **najmanjša α, pri kateri bi še lahko zavrnili H₀** (»točna stopnja značilnosti«); je natanko verjetnost napake 1. vrste, če na podlagi konkretnega vzorca H₀ zavrnemo.
- **Pravilo: p ≤ α → H₀ zavrnemo; p > α → H₀ ne zavrnemo.**
- **p enostranskega = p dvostranskega / 2** (če je ocena na »pravi« strani).
- **ASA 2016:** p = 0,05 se uporablja, ker je pač navada. **Nizka p ≠ nujno vsebinska pomembnost** (statistična vs. praktična značilnost). Zlorabe: objavljanje samo značilnih rezultatov, manipulacija vzorca, naknadno postavljanje domnev po poznavanju rezultatov.

### Zgled vprašanj
**1. Plašči:** proizvajalec želi **dokazati** porast trajnosti s 45 000 na 50 000 km (σ = 8000 znan, n = 25) → dokazovana trditev gre v H₁, trenutno stanje v H₀ → **B: H₀: μ = 45 000 ; H₁: μ = 50 000** (nesestavljeni domnevi, kot pri primeru 6.1 a). Ostali odgovori so napačni: A in D mešata σ² oz. ȳ (ocene) v domnevi — domneve so vedno o **parametru**, ne o vzorčni oceni; C in E dajo dokazovano trditev v H₀.
**2.** Slika z oznakami (porazdelitvi H₀ in H₁, α, β) je slika — razlaga: α = ploščina H₀-porazdelitve v K, β = ploščina H₁-porazdelitve v S, 1 − β = ploščina H₁ v K.

---

## V06 — 6. vaje (preizkušanje domnev)

**Naloga 1 (manjkajoče besede)**, besede v pravem sklonu (»… ki bi jo radi ___«):
1) **zavrnili**; 2) **dokazali**; 3) (Za) **sestavljene**; 4) **več (neskončno mnogo)**; 5) (o) **dvostranskem**; 6) (o) **enostranskem**; 7) (na) **levi** (strani); 8) (napako) **2.** (vrste); 9) **nesestavljena**.

**Naloga 1, razlaga na vajah:**
- **Nesestavljena domneva:** H₁ ima **eno samo** vrednost parametra, npr. H₁: μ = 4100. Takrat lahko izračunamo β.
- **Sestavljena domneva:** H₁ ima **več (neskončno mnogo)** možnih vrednosti, npr. H₁: μ ≠ 4000, μ < 4000 ali μ > 4000. Uporablja se v praksi.
  - Pri ≠ so to **vse vrednosti razen tiste iz H₀**.
  - Pri < so to vse vrednosti pod njo, pri > vse nad njo.
- **Dvostranski preizkus:** H₁ z znakom **≠**. Odstopanje je lahko navzgor ali navzdol, zato je kritično območje na **obeh** straneh porazdelitve (α/2 levo in α/2 desno).
- **Enostranski preizkus:** H₁ z znakom **<** ali **>**. Kritično območje je samo na **eni** strani: pri < na **levi**, pri > na **desni**.
- **Beseda 8:** profesor je v besedilu »in je zato ne bi zavrnili« zamenjal z »**in jo zato sprejmemo**«. Sklep »H₀ velja«, ko v resnici velja H₁, je **napaka 2. vrste**.

**Pojmi:**
- **Statistična domneva** je trditev o vrednosti nekega parametra v populaciji.
- **Ničelna domneva H₀** je domneva, ki jo **preverjamo** na podlagi vzorčnih podatkov. Vedno vsebuje enačaj (=, ≤, ≥).
- **Alternativna domneva H₁** je trditev, ki **nasprotuje ničelni domnevi**: H₀ in H₁ se izključujeta in skupaj pokrijeta vse možnosti. Vanjo zapišemo trditev, ki jo želimo **dokazati**. Sprejmemo jo, če H₀ zavrnemo.

**Pravilni in nepravilni sklepi** (priročnik str. 29, pogl. 12; risali na tablo) ⭐
| Sklep na podlagi vzorca \ Dejansko stanje | **H₀ velja** | **H₀ ne velja** |
|---|---|---|
| **H₀ velja** (ne zavrnemo) | ✅ sklep je pravilen, verjetnost **1 − α** | ❌ **napaka 2. vrste**, verjetnost **β** |
| **H₀ ne velja** (zavrnemo) | ❌ **napaka 1. vrste**, verjetnost **α** | ✅ sklep je pravilen, verjetnost **1 − β** = **moč preizkusa** |

- **α** (stopnja značilnosti) si izberemo sami, npr. 5 %.
- **β** lahko izračunamo samo, če je H₁ **nesestavljena** (Naloga 1, beseda 9).
- **Moč preizkusa** (1 − β) je verjetnost, da H₀ pravilno zavrnemo, ko res ne velja.
- ⚠️ **Izpit:** nikoli ne reci »**sprejmemo H₀**«, ampak »**H₀ ne moremo zavrniti**«.
  - Analogija s sodiščem: sodnik razsodi »**not guilty**« (ni dokazov za krivdo), ne pa »innocent« (nedolžen).
  - Ne zavrnjena H₀ pomeni le, da podatki ne nasprotujejo H₀, ne pa, da je dokazana.
- **Zakaj nikoli ne »sprejmemo« H₀**:
  - Če je ocena na vzorcu blizu H₀ in bi H₀ sprejeli, lahko naredimo **napako 2. vrste (β)**. Njene verjetnosti ne poznamo, ker je H₁ sestavljena.
  - Zato H₀ ne sprejmemo, ampak rečemo **»H₀ ne moremo zavrniti«**. Odločitev zadržimo: podatki ne zadoščajo za sklep.
  - β lahko zmanjšamo z **večjim vzorcem** (manjša standardna napaka), ne pa z izbiro, kot jo imamo pri α.
- **Najvišja še dopustna stopnja značilnosti je α = 0,05**.
  - Če je **p-vrednost > 0,05**, smo v območju, ko **H₀ ne moremo zavrniti**.
  - Če je **p ≤ 0,05**, H₀ zavrnemo.
  - Pri 2a je p = 0,0124 ≤ 0,05, zato zavrnemo; pri 2b je p = 0,9938 > 0,05, zato ne moremo zavrniti.

**Naloga 2, 2. korak (risba na tabli):**
- ⚠️ **Klasična napaka študentov:** na os nanašajo **standardni odklon σ = 180** namesto **standardne napake**.
- Rišemo porazdelitev **cenilke ȳ** (ne posameznih ur!), zato je razmik **SE(ȳ) = σ/√n = 180/√81 = 180/9 = 20 vrečk na uro**.
  - Popravka (N − n)/(N − 1) ni, ker je populacija ur neskončna.
- Os ȳ: 3940, 3960, 3980, **4000**, 4020, 4040, 4060 (= 4000 ± 1, 2, 3 SE).
- Os z pod njo: −3, −2, −1, **0**, 1, 2, 3. **Na sredini je ȳ = 4000, z pa je 0** (ne 4000).
- Naš ȳ = 4050 leži pri **z = (4050 − 4000)/20 = 2,5**.

**Naloga 2** (nadaljevanje 6.1): σ = 180, n = 81 → se = 20; ȳ = 4050 → **z = (4050 − 4000)/20 = 2,5**.
a) **H₀: μ = 4000; H₁: μ ≠ 4000** (dvostranski). Z-preizkus (Y normalna, σ znan). Kritična z = ±1,96; 2,5 > 1,96 → **zavrnemo H₀**; p = 2 · P(Z > 2,5) = **0,0124**. Sklep: pri α = 5 % je zmogljivost stroja značilno drugačna od 4000 vrečk/uro.
b) **H₀: μ ≥ 4000; H₁: μ < 4000** (enostranski levi). Kritična z = −1,645; z = +2,5 je v območju sprejema → **H₀ ne zavrnemo**; p = P(Z < 2,5) = **0,9938**. Ni dokaza, da je stroj počasnejši (vzorec je celo višji od 4000).
c) **H₀: μ ≤ 4000; H₁: μ > 4000** (enostranski desni). Kritična z = +1,645; 2,5 > 1,645 → **zavrnemo H₀**; p = P(Z > 2,5) = **0,0062** (= 0,0124/2). Stroj ima značilno **večjo** zmogljivost od pogodbene.

**4. korak: sklep ima dva dela**:
- **Statistični sklep:** pri α = 0,05 **zavrnemo H₀** (μ = 4000) in **sprejmemo H₁**: aritmetična sredina **ni enaka** 4000.
  - ⚠️ **Ne** sprejmemo, da je μ = 4050. 4050 je samo vzorčna ocena, prave vrednosti μ ne poznamo. Sprejmemo le trditev iz H₁ (μ ≠ 4000).
- **Vsebinski sklep:** »Povprečna zmogljivost stroja **ni enaka** predvideni s kupoprodajno pogodbo.«

**Naloga 3:**
a) **α** = verjetnost napake 1. vrste = tveganje, da zavrnemo H₀, ki dejansko velja (delež vzorcev, ki padejo v kritično območje).
b) **p-vrednost** = najmanjša α, pri kateri še lahko zavrnemo H₀ (točna stopnja značilnosti). Za nalogo 2: **a) 0,0124, b) 0,9938, c) 0,0062**.
c) H₀ zavrnemo, ko je **p ≤ α** (ocena v kritičnem območju) → vsebinski sklep po H₁: odstopanje je **statistično značilno**, »na podlagi vzorčnih podatkov pri α = 5 % sklepamo, da …«.
d) H₀ ne moremo zavrniti (p > α): **preizkus ni odkril značilnega odstopanja** od H₀; **ne dokažemo, da H₀ velja** — podatki ne nasprotujejo H₀ pri izbrani α.

---
