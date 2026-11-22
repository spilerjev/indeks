# Epizoda 5 — Velikost vzorca in vzorčenja z omejitvami

Tema: Statistična analiza. Lastna razlaga snovi z lastnimi primeri.

## Ponovitev

- α = delež vzorcev iste velikosti, pri katerih intervalna ocena **ne zajame** prave vrednosti. Za konkreten vzorec ne vemo, ali jo zajame.
- **Točnost** ocene: g − Γ = (g − E(g)) + (E(g) − Γ) = **natančnost** + **pristranskost**. Viri pristranskosti: cenilka, vzorčni postopek in **nevzorčni viri** (slabi podatki, nejasna vprašanja, napačni izračuni). Če pristranskost zanemarimo, je točnost enaka natančnosti.
- Predstavljaj si tarčo: zadetki tesno skupaj, a mimo središča = natančno, a pristransko; razpršeni okoli središča = nepristransko, a nenatančno; tesno v središču = točno.
- **Natančnost = širina intervala** (ožji je natančnejši). Vplivajo: **α, velikost vzorca, variabilnost spremenljivke** (pri povprečju) in **ocena p** (pri deležu, prek p(1 − p)), pri nekaterih vzorčenjih tudi način vzorčenja.
- Na α in velikost vzorca **lahko vplivamo**; na velikost populacije in variabilnost spremenljivke ne.
- Premajhen vzorec → preširok interval. Prevelik → nepotrebni stroški.
- **Točkovna ocena** je ena številka; pri **intervalni** gremo od nje »malo gor in malo dol« za odklon zaupanja D_g (polovica širine intervala).
- **SE ima za vsak parameter drugačno formulo** — zato so obrazci pomembni.

## Določanje velikosti vzorca ⭐

Vhodni podatki: α (→ z), vrsta parametra, **zahtevana natančnost** (absolutna D_g ali relativna D°_g = D_g/Γ, tudi v %) in predpostavljena variabilnost (iz izkušenj ali **pilotnega vzorca**).

Formule dajo velikost vzorca **s ponavljanjem (nₛ)**; preračun na vzorec **brez ponavljanja**: **n = nₛ / (1 + nₛ/N)**.
- nₛ **ne zaokrožujemo**; šele n zaokrožimo **navzgor** — vzorec je lahko večji, manjši pa ne sme biti (»vsaj n«).

| Parameter | Absolutna natančnost | Relativna natančnost |
|---|---|---|
| **Povprečje** | nₛ = (z_{α/2} · σ / D_ȳ)² | nₛ = (z_{α/2} · KV / D°_ȳ)²  (KV = σ/μ) |
| **Delež** | nₛ = z² · Π(1−Π) / D_p² | nₛ = (z_{α/2} / D°_p)² · (1−Π)/Π |

- **Absolutna in relativna natančnost:** brezposelnost se dvigne z 8 % na 10 % → **absolutno 2 odstotni točki, relativno 25 %**. »4 % predpostavljene vrednosti« (relativno) in »4 odstotne točke« (absolutno) dasta zelo različen n.
- Pri vsaki nalogi najprej zapiši **ENOTA / SPREMENLJIVKA / PARAMETER**.
- Če ni izrecno enostransko, delamo **dvostransko**. Pri »spodnji meji« ali »zgornji meji« gre v formulo **cela α** (z_α), ne α/2. V R funkcija `sample.size.prop` α sama razpolovi, zato pri enostranski oceni nastaviš `level = 1 − 2α`.

**Rešen primer: masa paketov kave.** N = 2 500 paketov, zahtevana natančnost D = 2 g, σ = 12 g (iz izkušenj), α = 5 %.
- Enota: paket. Spremenljivka: masa paketa (v g). Parameter: μ.
- nₛ = (1,96 · 12 / 2)² = **138,30** → n = 138,30/(1 + 138,30/2 500) = 131,05 → **vsaj 132 paketov**.

**Rešen primer: zamude pri plačilih (spodnja meja).** N = 150 000 podjetij; oceniti želimo **spodnjo mejo** deleža podjetij z zamudo pri plačilih → **enostranska ocena, cela α = 1 % → z = 2,33**; relativna natančnost D°_p = 5 % = 0,05 (v formulo v decimalni obliki); iz lanske raziskave Π = 25 %.
- Enota: podjetje. Spremenljivka: zamuja s plačili (da / ne). Parameter: delež Π.
- nₛ = (2,33/0,05)² · 0,75/0,25 = **6 514,68** → n = 6 514,68/(1 + 6 514,68/150 000) = 6 243,5 → **vsaj 6 244 podjetij**.
- Pogosta napaka: vzeti z = 2,58 (dvostransko), čeprav naloga sprašuje samo po spodnji meji.

**Rešen primer: zaskrbljenost zaradi cen elektrike.** N = 600 000 gospodinjstev; pilotni vzorec: 36 od 240 zaskrbljenih → **Π = 0,15**; α = 5 %.
- a) **relativna** natančnost D°_p = 5 % = 0,05: nₛ = (1,96/0,05)² · 0,85/0,15 = **8 707,63** → n = 8 707,63/(1 + 8 707,63/600 000) = 8 583,1 → **8 584 gospodinjstev**.
- b) **absolutna** natančnost D_p = 3 odstotne točke = 0,03: nₛ = 1,96² · 0,15 · 0,85/0,03² = **544,23** → n = 543,7 → **544 gospodinjstev**.
- Razlika je ogromna: relativna natančnost 5 % od 15 % je le 0,75 odstotne točke, zato potrebuje veliko večji vzorec.

## Vzorčenja z omejitvami

**Enostavno slučajno vzorčenje (ESV):** vsaka kombinacija n enot ima enako verjetnost. **Vzorčenja z omejitvami** so slučajna izbira pod pogoji; razloga sta **boljša natančnost** (manjša se) in **enostavnejša ali cenejša izvedba**.
- **Enota vzorčenja** = kar izbiramo s slučajnimi števili s seznama; **vzorčna enota** = kar dejansko opazujemo. Pri ESV sta enaki.
- Prednosti ESV: vzorec dobro predstavlja populacijo, preprosto, ne rabi predznanja o populaciji, lahko ugotovimo natančnost. Slabosti: težko dobiti seznam vseh enot, redke enote so slabo zastopane, natančnost povečamo le z večjim vzorcem, oddaljene enote pomenijo visoke stroške.

| Vrsta | Postopek | Prednosti | Slabosti / opombe |
|---|---|---|---|
| **Stratificirano** | heterogeno populacijo razdelimo na k **bolj homogenih, izključujočih se stratumov** (po spremenljivki, ki vpliva na proučevano); v vsakem ESV (vzorčni delež ni nujno enak); ocene izračunamo ločeno in združimo | **bolj učinkovito od ESV** (manjša se pri istem n, α in N → ožji interval), ker je variabilnost znotraj stratumov manjša | potrebni so strokovno znanje in dodatni podatki za oblikovanje stratumov |
| **V skupinicah** | populacijo razdelimo na M skupinic (pogosto naravnih), izberemo m skupinic in **opazujemo VSE enote v izbranih** | potrebujemo samo seznam skupinic; enostavna logistika; poceni | učinkovito le, če je **raznolikost znotraj skupinic velika, med skupinicami pa majhna**; se je lahko večja kot pri ESV |
| **V več stopnjah** | hierarhične populacije (država → regija → občina → naselje → gospodinjstvo); na vsaki stopnji slučajno izberemo enote; pri dveh stopnjah v izbranih primarnih enotah **slučajno izberemo le del** elementarnih | nižji stroški, poenostavljen okvir | pri istem n **manj natančno**; tako delajo velike mednarodne raziskave znanja učencev |
| **Sistematično** | korak **s = N/n = 1/f**, izberemo vsako s-to enoto (f = 20 % → vsaka 5.) | lažje, hitrejše, manj napak, enakomerna zastopanost | **pristranskost, če se korak ujema s periodo** v populaciji (npr. vsak 7. dan je vedno nedelja) |
| **Kvotno** | populacijo razdelimo na podskupine po izbranih lastnostih; **kvota** = število enot iz podskupine; vzorec ima enako strukturo kot populacija | poceni, enostavno, ni okvira | **neslučajno (namerna izbira)** → ne poznamo porazdelitve ocen → **ne moremo sklepati o parametrih** |

- **Stratificirano vzorčenje naredimo vedno, ko je mogoče** (npr. po spolu, starosti, regiji). Stratumi morajo biti **med seboj čim bolj različni, znotraj pa čim bolj homogeni**.
- **Skupinice so ravno obratno:** skupinice so si med seboj podobne, znotraj vsake pa je velika raznolikost — vsaka skupinica je »mini populacija«.

## Stratificirano vzorčenje — formule za povprečje ⭐

- ȳ_str = (1/N) · Σ N_j · ȳ_j — povprečje je **tehtano z velikostjo stratuma N_j**, ne z n_j. To je glavna razlika od navadnega povprečja vzorca.
- var(ȳ_str) = (1/N²) · Σ N_j (N_j − n_j) s_j²/n_j ; se = √var.
- Interval: ȳ_str ± z_{α/2} · se(ȳ_str); za **vsoto** pomnožimo meje z N (ista α).
- s_j² je že nepristranska ocena variance — če je podana varianca, je ne kvadriraš še enkrat.

**Rešen primer: stroški mobilne telefonije po starostnih skupinah** (N = 40 000, n = 250, α = 5 %):

| Stratum | N_j | n_j | ȳ_j (€) | s_j (€) |
|---|---|---|---|---|
| do 30 let | 9 000 | 60 | 33 | 8 |
| 30–60 let | 19 000 | 115 | 24 | 6 |
| nad 60 let | 12 000 | 75 | 17 | 5 |

- ȳ_str = (9 000 · 33 + 19 000 · 24 + 12 000 · 17)/40 000 = **23,93 €**
- var = 0,1537 → se = **0,392 €** (pri ESV z istim n je bila se 0,567 €)
- interval **23,15 < μ < 24,70 € ; α = 0,05** — ožji kot pri ESV (22,88–25,12 €), ker so stratumi znotraj bolj homogeni;
- vsota (× 40 000): **926 268 < Y_tot < 987 732 € ; α = 0,05**.

**Rešen primer: dnevi bolniške odsotnosti** — podjetje ima ločena seznama zaposlenih: 600 v proizvodnji in 240 v pisarni. Iz vsakega seznama slučajno izberemo 40 zaposlenih → **stratificirano vzorčenje** (vzorčna deleža nista enaka).

| Stratum | N_j | n_j | ȳ_j (dni) | s_j² |
|---|---|---|---|---|
| proizvodnja | 600 | 40 | 3,2 | 4,00 |
| pisarna | 240 | 40 | 5,5 | 6,25 |

- N = 840; ȳ_str = (600 · 3,2 + 240 · 5,5)/840 = **3,86 dneva**
- var = [600 · 560 · 4,00/40 + 240 · 200 · 6,25/40]/840² = 41 100/705 600 = 0,0583 → se = **0,241**
- 1,96 · 0,241 = 0,47 → **3,38 < μ < 4,34 dneva ; α = 0,05** (dvostransko, ker ni drugače zahtevano).
- Navadno povprečje vseh 80 zaposlenih v vzorcu bi bilo (40 · 3,2 + 40 · 5,5)/80 = **4,35 dneva** — previsoko, ker je pisarna v vzorcu prekomerno zastopana. Zato tehtamo z N_j.

## Rešen primer: vzorčenje v skupinicah — dijaki v oddelkih

Raziskujemo, koliko časa dijaki v regiji preživijo na družbenih omrežjih. Seznama vseh dijakov ni, imamo pa seznam vseh oddelkov. Slučajno izberemo 12 oddelkov in anketiramo **vse** dijake v njih.
- a) Vrsta: **vzorčenje v skupinicah**; enota vzorčenja (primarna) = **oddelek**; vzorčna (elementarna) enota = **dijak**.
- b) Učinkovito je, če so si **oddelki med seboj podobni**, dijaki znotraj oddelka pa **čim bolj različni**.
- c) Prednosti pred ESV: potrebujemo **samo seznam oddelkov**, podatke dobimo na istem mestu, **poceni in hitro**.
- d) Pri **dvostopenjskem** vzorčenju bi v izbranih oddelkih slučajno izbrali **le del** dijakov; pri skupinicah opazujemo **vse**. Oboje je **verjetnostno** vzorčenje — znamo povedati, s kakšno verjetnostjo je enota izbrana.

## Rešen primer: kvotno vzorčenje — anketa o e-skirojih

n = 150; starostne skupine v razmerju 1 : 2 : 2 (do 25, 25–45, nad 45 let), v vsaki skupini M : Ž = 2 : 3.
- a) **Kvota** je število enot, ki jih moramo vključiti iz posamezne podskupine, tako da je **struktura vzorca enaka strukturi populacije** po izbranih lastnostih.
- b) Lastnosti: **starost in spol**. Do 25 let: 30 (12 M, 18 Ž); 25–45 let: 60 (24 M, 36 Ž); nad 45 let: 60 (24 M, 36 Ž). Skupaj 60 M in 90 Ž.
- c) Struktura vzorca posnema strukturo **populacije**, izbira enot pa je **neslučajna** (namerna). Zato lahko izračunamo le opisne deleže v vzorcu, sklepati o populaciji pa ne moremo, ker ne vemo, s kakšno verjetnostjo je bila posamezna enota izbrana.

## Natančnost in učinkovitost — kako odgovoriti

- Pri ocenjevanju povprečne cene stanovanj v mestu, kjer se cene močno razlikujejo po soseskah, je smiselno **stratificirano vzorčenje** po soseskah (v vsaki ESV).
- Okvir vzorčenja so **seznami vseh stanovanj** po stratumih.
- Natančnost izražamo z **odklonom zaupanja D_ȳ = z · se(ȳ_str)**.
- **Učinkovitost** = čim manjša standardna napaka. Stratificirano je bolj učinkovito od ESV, ker so stratumi bolj homogeni od cele populacije → manjša variabilnost znotraj stratumov → manjša se → ožji interval pri istem n in α.
