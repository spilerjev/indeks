# Epizoda 3 — Razmestitev: montažna linija in metoda CRAFT

Tema: Management proizvodnih in storitvenih procesov. Lastna razlaga snovi z lastnimi primeri.

## Kaj je razmestitev

Razmestitev (layout) pove, kje stojijo naprave, delovna mesta in oddelki ter kako se med njimi gibljejo izdelki, ljudje in informacije. Dobra razmestitev skrajša poti, zmanjša čakanje in zaloge med operacijami.

Osnovne vrste:
- **Razmestitev s fiksnim položajem:** izdelek miruje, ljudje in orodja prihajajo k njemu (gradnja hiše, ladjedelnica).
- **Funkcijska (procesna) razmestitev:** enake naprave so skupaj v oddelkih (vse stružnice skupaj, vsi rentgeni skupaj); primerna za veliko različnih izdelkov v majhnih količinah, a z dolgimi potmi med oddelki.
- **Celična razmestitev:** v celici so naprave, ki jih potrebuje ena družina podobnih izdelkov.
- **Linijska (izdelčna) razmestitev:** naprave stojijo v zaporedju operacij enega izdelka (montažna linija); primerna za velike količine standardnih izdelkov.

## Linijska razmestitev: uravnoteženje linije

Pojmi in formule:
- **Cikel c** = razpoložljivi čas / zahtevana količina. Pove, na koliko sekund mora z linije priti en izdelek. Če ni celo število, ga zaokrožimo **navzdol**, sicer ne dosežemo zahtevane količine.
- **Najmanjše število delovnih mest** = Σt / c, zaokroženo **navzgor** (Σt je vsota časov vseh nalog).
- **Učinkovitost linije** = Σt / (n · c), kjer je n dejansko število delovnih mest.
- **Pravilo razporejanja:** najprej dodeli **najdaljšo** razpoložljivo nalogo; ob izenačenju tisto z **več sledečimi** nalogami. Naloga je razpoložljiva, ko so opravljene vse njene neposredne predhodnice in ko še gre v preostali čas delovnega mesta.
- **Ozko grlo linije** je delovno mesto z najdaljšim časom obdelave.

### Lasten primer: montaža električnih skirojev
Linija mora v 8 urah (28.800 s) izdelati 192 skirojev.

| Naloga | Čas (s) | Neposredne predhodnice |
|---|---|---|
| A | 40 | – |
| B | 60 | A |
| C | 50 | – |
| D | 30 | C |
| E | 70 | B, D |
| F | 20 | E |
| G | 45 | – |
| H | 35 | F, G |

- Σt = 350 s. **Cikel** c = 28.800 / 192 = **150 s**.
- **Najmanjše število delovnih mest** = 350 / 150 = 2,33 → **3**.

Razporejanje po pravilu najdaljše naloge:

| Delovno mesto | Naloge (vrstni red) | Čas | Prosto |
|---|---|---|---|
| 1 | C (50), G (45), A (40) | 135 s | 15 s |
| 2 | B (60), D (30) | 90 s | 60 s |
| 3 | E (70), F (20), H (35) | 125 s | 25 s |

- Na začetku so na voljo A, C in G; najdaljša je C, nato G, nato A. B (60 s) ne gre več v preostalih 15 s.
- Delovno mesto 2: na voljo sta B in D, najprej B, nato D. E (70 s) ne gre v preostalih 60 s.
- **Učinkovitost** = 350 / (3 · 150) = **77,8 %**. Prosti čas je 15 + 60 + 25 = 100 s na cikel.
- **Ozko grlo** je delovno mesto 1 (135 s). Linija bi lahko delala tudi s ciklom 135 s in izdelala 28.800 / 135 = 213 skirojev, če bi bilo povpraševanje dovolj.

## Metoda CRAFT

CRAFT izboljšuje razmestitev naprav, kadar so med njimi pogosti prenosi materiala:
1. Za začetno razmestitev izračunaj skupni strošek **Σ (prenosi × razdalja)** za vse pare naprav.
2. Preizkusi **zamenjavo vsakega para** naprav in izračunaj nov strošek.
3. Izberi zamenjavo z **največjim zmanjšanjem**; ponavljaj, dokler nobena zamenjava ne pomaga.

CRAFT je **hevristika**: najde dobro rešitev, ne pa nujno najboljše možne.

### Lasten primer: tri naprave v delavnici
Prenosi med napravami (na dan): 1–2: 10, 1–3: 25, 2–3: 15.
Razdalje med lokacijami (m): L1–L2: 2, L1–L3: 5, L2–L3: 4.

- **Začetna razmestitev** (naprava 1 na L1, 2 na L2, 3 na L3): 10 · 2 + 25 · 5 + 15 · 4 = 20 + 125 + 60 = **205**.
- Zamenjava naprav 1 in 2: 195. Zamenjava 1 in 3: 195. **Zamenjava 2 in 3: 160** ← največje zmanjšanje.
- Nova razmestitev: naprava 1 na L1, naprava 3 na L2, naprava 2 na L3. Strošek 10 · 5 + 25 · 2 + 15 · 4 = 50 + 50 + 60 = **160**.
- Iz nje nobena zamenjava ne pomaga (180, 165, 205), zato se ustavimo. Tu je 160 tudi najboljša možna razmestitev.
- Logika: napravi 1 in 3 si izmenjata največ materiala (25), zato ju postavimo najbližje (razdalja 2).
