# Epizoda 5 — Velikost vzorca in vzorčenja z omejitvami (P05 + V05)

Predmet: Statistična analiza (2. letnik). Vir: lastni zapiski predavanj in vaj, pripravljeni za zvočno razlago.

## P05 — Velikost vzorca, vzorčenja z omejitvami

### Ponovitev
- α = delež vzorcev iste velikosti, pri katerih intervalna ocena **ne zajame** prave vrednosti. Za konkreten vzorec ne vemo, ali jo zajame.
- **Točnost** ocene: g − Γ = (g − E(g)) + (E(g) − Γ) = **natančnost** + **pristranskost**. Viri pristranskosti: cenilka, vzorčni postopek, **nevzorčni viri** (slabi podatki, nejasna navodila, napačni izračuni). Če pristranskost zanemarimo (E(g) = Γ), točnost = natančnost.
- Natančnost ocene vplivajo: **α, velikost vzorca, (za povprečje) variabilnost spremenljivke, (za delež) vzorčna ocena p**, pri nekaterih vzorčenjih tudi način vzorčenja.
- Premajhen vzorec → preširok interval. Prevelik → nepotrebni stroški.

### Določanje velikosti vzorca ⭐
Vhodni podatki: α (→ z), vrsta parametra, **zahtevana natančnost** (absolutno D_g ali relativno D°_g = D_g/Γ, tudi v %), predpostavljena se(g) (iz izkušenj ali **pilotnega vzorca**).
Formule veljajo za vzorec **s ponavljanjem (nₛ)**; preračun na vzorec **brez ponavljanja**: **n = nₛ / (1 + nₛ/N)**, zaokroži **navzgor**.

| Parameter | Absolutna natančnost | Relativna natančnost |
|---|---|---|
| **Povprečje** | nₛ = (z_{α/2} · σ / D_ȳ)² | nₛ = (z_{α/2} · KV / D°_ȳ)²  (KV = σ/μ) |
| **Delež** | nₛ = z² · Π(1−Π) / D_p² | nₛ = (z_{α/2} / D°_p)² · (1−Π)/Π |

**Primer 5.1 (teža izdelkov):** N = 1000, D = 1,5 dag, σ² = 225 (σ = 15), α = 5 % → nₛ = (1,96 · 15 / 1,5)² = **384,16** → n = 384,16/(1 + 384,16/1000) = 277,5 → **278 izdelkov**.
**Primer 5.2 (potres, poškodovane zgradbe):** N = 400 000; »oceniti **spodnjo mejo**« → **enostranski interval → cela α = 1 % → z_α = z_0,01 = 2,3263** (na tabli zaokroženo 2,33); relativna natančnost D°_p = 5 % = 0,05 (v formulo gre v decimalni obliki); **Π = 20 %** → nₛ = (2,3263/0,05)² · 0,8/0,2 = 8 659 → n = 8 659/(1 + 8 659/400 000) = 8 475,6 → **vsaj 8 476 stavb**. R: `sample.size.prop(e=0.05*0.2, P=0.2, N=400000, level=0.98)` → 8476 (**level = 1 − 2α**, ker R α avtomatsko razpolovi). Z z = 2,33 s table: nₛ = 8 686,24 → n = 8 501,6 → 8 502 (zapis s predavanja).
> ✅ Popravek 12. 11. 2026 (po zapiskih s predavanja): na prosojnici NI napake — prejšnji zapis je napačno navajal Π = 8 % in 28 443. Ključ je **cela α pri enostranski oceni (spodnja meja)**, zato z = 2,3263, ne 2,58. ENOTA: zgradba; SPR: poškodovanost (da/ne); PAR: delež poškodovanih zgradb π.

### Vzorčenja z omejitvami
**Enostavno slučajno vzorčenje (ESV):** vsaka kombinacija n enot ima enako verjetnost. **Vzorčenja z omejitvami:** slučajna izbira pod pogoji — razlogi: **boljša natančnost** (manjša se) in **enostavnejša/cenejša izvedba**.
- **Enota vzorčenja** = kar izbiramo s slučajnimi števili z oštevilčenega seznama; **vzorčna enota** = kar dejansko opazujemo. Pri ESV sta enaki.
- ESV prednosti: vzorec dobro predstavlja populacijo, preprosto, ne rabi predznanja o populaciji, lahko ugotovimo natančnost. Slabosti: težko dobiti seznam vseh enot, redke enote slabo zastopane, natančnost povečamo samo z večjim vzorcem, velika variabilnost, geografsko oddaljene enote = dragi stroški.

| Vrsta | Postopek | Prednosti | Slabosti / opombe |
|---|---|---|---|
| **Stratificirano** | heterogeno populacijo razdelimo na k **bolj homogenih, izključujočih se stratumov** (po faktorialni spremenljivki, ki vpliva na proučevano); v vsakem ESV (vzorčni delež ni nujno enak); ocene ločeno, nato združimo | **bolj učinkovito od ESV** (manjša se pri isti n, α in N → ožji interval), ker je variabilnost znotraj stratumov manjša | potrebno strokovno znanje in dodatne informacije za oblikovanje stratumov |
| **V skupinicah (cluster)** | populacijo razdelimo na M skupinic (primarnih enot, pogosto naravnih), izberemo m skupinic, **opazujemo VSE enote v izbranih** | okvir samo za skupinice, ni seznama vseh enot; enostavna logistika; poceni | učinkovito le, če je **raznolikost znotraj skupinic velika in med skupinicami majhna**; se lahko večja kot pri ESV |
| **V več stopnjah** | hierarhične populacije (država → regija → občina → naselje → gospodinjstvo); na vsaki stopnji slučajno izberemo enote; pri 2 stopnjah: izberemo primarne enote, v njih **slučajno izberemo (ne vseh)** elementarne | nižji stroški, poenostavljen okvir | pri isti n **manj natančno** kot prejšnja; primer: **TIMSS** |
| **Sistematično** | korak **s = N/n = 1/f**, izberemo vsako s-to enoto (npr. f = 20 % → vsako 5.) | lažji, hitrejši, manj napak, enakomerna zastopanost | **pristranskost, če se korak ujema s periodo** v populaciji (npr. vsaka 24. ura, vsak 7. dan) |
| **Kvotno** | populacijo razdelimo na podskupine po izbranih lastnostih; **kvota** = št. enot iz podskupine; vzorec ima enako strukturo kot populacija | poceni, enostavno, ni okvira | **neslučajno (namerna izbira)** → ne poznamo porazdelitve ocen → **ne moremo sklepati o parametrih** |

### Stratificirano vzorčenje — formule za povprečje ⭐
- ȳ_str = (1/N) · Σ N_j · ȳ_j
- var(ȳ_str) = (1/N²) · Σ N_j² · (s_j²/n_j) · (N_j − n_j)/N_j = (1/N²) Σ N_j (N_j − n_j) s_j²/n_j ; se = √var
- Interval: ȳ_str ± z_{α/2} · se(ȳ_str); za **vsoto** pomnožimo meje z N (ista α).

**Primer 4.1 (varianta) — mleko v 3 stratumih** (N = 60 000, n = 200, α = 5 %):
| Stratum | N_j | n_j | ȳ_j | s_j |
|---|---|---|---|---|
| mestni | 13 100 | 46 | 27 | 5 |
| ravninski | 24 450 | 82 | 15 | 3 |
| planinski | 22 450 | 72 | 8 | 2 |

ȳ_str = (13 100 · 27 + 24 450 · 15 + 22 450 · 8)/60 000 = **15,0008 l**; var = 0,05173 → se = **0,2275**; interval **14,56 < μ < 15,45 l ; α = 0,05**; vsota (×60 000): **≈ 873 302 < Y_tot < 926 798 l ; α = 0,05**. (Prosojnica je izračun pustila prazen — lasten izračun, preveri z R.)

### Zgled vprašanj (pr. 27) — MOL, cena m² zemljišč v 3 skupinah
a) **stratificirano vzorčenje** (stratumi: mestna, primestna, podeželska; v vsakem ESV).
b) okvir vzorčenja = **seznam vseh zazidljivih zemljišč na območju MOL** (po stratumih: trije seznami zemljišč).
c) natančnost izražamo z **odklonom zaupanja D_ȳ = z · se(ȳ_str)** (parameter: aritmetična sredina cene m²).
d) (profesorica: »zato se sploh pogovarjamo o stratificiranju«; **učinkovitost = čim manjša standardna napaka** → bolj natančno »cilja«) **Da, bolj učinkovito** — cene se razlikujejo po lokaciji, torej so stratumi bolj homogeni od cele populacije → manjša variabilnost znotraj stratumov → manjša se → ožji interval pri isti n in α.

---

## V05 — 5. vaje (velikost vzorca, vzorčenja)

**Naloga 1** — energetska kriza, N = 860 000 gospodinjstev, pilot: 42/200 zaskrbljenih → **Π = 0,21**, α = 5 %.
a) **relativna** natančnost D°_p = 4 % = 0,04: nₛ = (1,96/0,04)² · 0,79/0,21 = **9 032,3** → n = 9 032,3/(1 + 9 032,3/860 000) = **8 938,5 → 8 939 gospodinjstev**.
b) **absolutna** natančnost D_p = 4 odstotne točke = 0,04: nₛ = 1,96² · 0,21 · 0,79/0,04² = **398,3** → n = **398,1 → 399 gospodinjstev**.
*Pazi:* »4 % predpostavljene vrednosti« (relativno) ≠ »4 odstotne točke« (absolutno) → zelo različna n.

**Naloga 2** — študentske zabave, ločena seznama po spolu, ESV z 20 % vzorčnim deležem → **stratificirano vzorčenje**.
| Spol | N_j | n_j (20 %) | ȳ_j | s_j² |
|---|---|---|---|---|
| študentke | 450 | 90 | 7,0 | 5,29 |
| študenti | 280 | 56 | 11,8 | 15,21 |

N = 730; ȳ_str = (450 · 7 + 280 · 11,8)/730 = **8,841**; var = [450 · 360 · 5,29/90 + 280 · 224 · 15,21/56]/730² = 26 557/532 900 = 0,04984 → se = **0,2232**; 1,96 · 0,2232 = 0,438 → **8,40 < μ < 9,28 obiskov ; α = 0,05**. (lasten izračun, ker je vaja prazna; preveri.)

**Naloga 3** — prostovoljni gasilci: 30 društev, vsi člani izbranih društev.
a) vrsta: **vzorčenje v skupinicah**; enota vzorčenja (primarna) = **gasilsko društvo**; vzorčna (elementarna) enota = **posamezen gasilec (član društva)**.
b) dobra učinkovitost, če je **raznolikost med gasilci znotraj društev velika, med društvi pa majhna** (društva so si med seboj podobna, vsako je »mini populacija«).
c) prednosti pred ESV: **seznam samo društev** (seznama vseh gasilcev ni mogoče sestaviti), podatke dobimo na istem mestu (enostavna logistika), **poceni in hitro**.
d) pri **dvostopenjskem** vzorčenju v izbranih društvih slučajno izberemo **le del** članov; pri vzorčenju v skupinicah opazujemo **vse člane** izbranih društev.

**Naloga 4** — kripto trgovanje, **kvotno** vzorčenje n = 120; razmerje letnikov 3 : 2 : 1, v vsakem letniku M : Ž = 4 : 6.
a) **Kvota** = število enot, ki jih moramo vključiti v vzorec iz posamezne podskupine; določena mora biti tako, da je **struktura vzorca enaka strukturi populacije** po relevantnih lastnostih.
b) Lastnosti: **letnik in spol**. 1. letnik 60 (24 M, 36 Ž); 2. letnik 40 (16 M, 24 Ž); 3. letnik 20 (8 M, 12 Ž). Izračunamo lahko le **vzorčni delež p** (opisno) — sklepati o populaciji **ne moremo**.
c) 1) **populacije**; 2) **neslučajen** (namerno izbran).

---

## 📒 Dopolnilni zapiski — P05 in V05 (teden 3.–7. 11. 2026)

### P05 — poudarki s predavanja
- **Točkovna ocena** = na vzorcu izračunamo eno številko; **intervalna** = od točkovne gremo »malo gor, malo dol« (D_g = odklon zaupanja = polovica širine intervala). **α** = delež vzorcev, s katerimi zgrešimo; z_{α/2}, ker gledamo na obe strani in α razpolovimo.
- **SE ima za vsak parameter drugačno formulo → obrazci!** Ožji kot je interval, bolj natančna je ocena.
- Na natančnost **lahko vplivamo** z α in z velikostjo vzorca; na velikost populacije in variabilnost spremenljivke **ne moremo**.
- Absolutna vs. relativna natančnost — primer obrestne mere 2 % → 3 %: **absolutno 1 odstotna točka, relativno 50 %**.
- nₛ (s ponavljanjem) **ne zaokrožujemo**; šele n (brez ponavljanja) zaokrožimo **navzgor** — vzorec je lahko večji, manjši pa ne sme biti (»vsaj n«).
- Pri vsaki nalogi najprej zapiši **ENOTA / SPREMENLJIVKA / PARAMETER** (5.1: proizvod / teža y / μ_y; 5.2: zgradba / poškodovanost da-ne / delež π).
- Če ni izrecno enostransko, delamo **dvostransko**. Pri »spodnji meji« ali »zgornji meji« (enostransko) gre v formulo **cela α** (z_α), ne α/2. V R-ju: `level = 1 − 2α`, ker R α avtomatsko razpolovi.
- **Stratificirano vzorčenje naredimo VEDNO, ko je mogoče** (npr. po spolu, starosti). Stratumi morajo biti **med seboj čim bolj različni (heterogenost med stratumi), znotraj pa čim bolj homogeni**. ⭐ IZPIT: kako se pri stratificiranem vzorčenju izračuna povprečje (tehtano z **N_j**, ne z n_j) in v čem se razlikuje od navadnega povprečja.
- Primer 4.1 varianta (mleko) — profesoričin rezultat na tabli: ȳ_str = 15, se = 0,228 → **14,55 < μ < 15,45 (α = 5 %)**; vsota: **873 243 < Y_tot < 926 877** (meje × N, ista α) — iz vzorca sklepamo na populacijo.
- **Skupinice**: ravno obratno kot stratumi — **homogenost na primarni ravni (skupinice si podobne), heterogenost na elementarni ravni**. Okvir vzorčenja = seznam M skupinic (ne N osnovnih enot). Primer 5.3c: izberemo par gimnazij in znotraj njih opazujemo **vse** dijake.

### V05 — kar je bilo rečeno na vajah
- Nal. 1: a) **8 939** (R: `sample.size.prop(e=0.04*0.21, P=0.21, N=860000, level=0.95)`), b) **399** (`e=0.04`) → »toliko ali več«. Delež iz pilota = 42/200 = 0,21; z = 1,96 (α/2 = 0,025).
- Nal. 2: ȳ_str = (450 · 7 + 280 · 11,8)/730 = **8,84**; se = 0,223; »če ni napisano → DVOSTRANSKI interval« → **8,40 < μ < 9,28 (α = 0,05)**. Vzorčni delež 20 %: n₁ = 90, n₂ = 56. Ocena variance s² je že nepristranska — je ne kvadriramo še enkrat.
- Nal. 3 (gasilci): **vzorčenje v skupinicah**; primarna enota = gasilsko društvo, elementarna = prostovoljni gasilec. Učinkovito, če so si **društva čim bolj podobna**, gasilci znotraj društva pa **čim bolj različni**. Prednosti pred ESV: enostavnejše, hitrejše, cenejše, logistično manj zahtevno. d) v skupinicah: ESV **samo na primarni ravni** (nato vsi člani); v dveh stopnjah: slučajno vzorčenje **na primarni IN elementarni ravni**. Vsa ta vzorčenja so **verjetnostna** — znamo povedati, kakšna je verjetnost, da je posamezna enota izbrana v vzorec.
- Nal. 4 (kvotno): **neverjetnostno** vzorčenje — ne vemo, s kakšno verjetnostjo je enota vključena v vzorec. Kvota = število enot z določenimi lastnostmi, ki jih zajamemo v vzorec; določimo jih tako, da čim bolje opišejo strukturo populacije. Lastnosti: letnik in spol → 48 M / 72 Ž: 1. letnik 24/36, 2. letnik 16/24, 3. letnik 8/12. c) populacija; neverjetnosten.

---
