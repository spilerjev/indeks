# Epizoda 2 — Analiza procesa: zmogljivost, ozko grlo in pretočni čas

Tema: Management proizvodnih in storitvenih procesov. Lastna razlaga snovi z lastnimi primeri.

## Postopek za zmogljivost procesa

1. Za vsako aktivnost zapiši, kateri **resursi** jo izvajajo. Aktivnost lahko hkrati zaseda več resursov (človeka in prostor).
2. **Obremenitev resursa** = vsota časov vseh aktivnosti, pri katerih sodeluje (minut na enoto).
3. **Zmogljivost enote resursa** = 60 / obremenitev (enot na uro) ali razpoložljivi čas / obremenitev (enot na dan).
4. **Zmogljivost skupine** = zmogljivost enote · število enot (npr. dva enaka stola).
5. **Ozko grlo** je resurs z najmanjšo zmogljivostjo. Njegova zmogljivost je **zmogljivost celega procesa**.
6. **Izkoriščenost resursa** = zmogljivost procesa / zmogljivost resursa. Ozko grlo je izkoriščeno 100 %.

Pozor: prostor ali naprava je zaseden ves čas, ko je stranka v njem, tudi ko nihče ne dela. To je najpogostejša past.

## Lasten primer: optika Ostrovid

| Aktivnost | Resurs | Čas (min) |
|---|---|---|
| 1 Prijava | receptor | 3 |
| 2 Prehod v kabino in priprava | receptor + kabina | 2 |
| 3 Meritev vida | optometrist + kabina | 12 |
| 4 Meritev razdalje med zenicama | optometrist + kabina | 3 |
| 5 Izbira okvirja | svetovalec | 10 |
| 6 Plačilo | receptor | 2 |

| Resurs | Aktivnosti | Obremenitev (min/stranko) | Zmogljivost (strank/h) | Izkoriščenost |
|---|---|---|---|---|
| receptor | 1, 2, 6 | 3 + 2 + 2 = 7 | 60/7 = 8,57 | 41 % |
| **kabina** | 2, 3, 4 | 2 + 12 + 3 = 17 | 60/17 = **3,53 ← ozko grlo** | 100 % |
| optometrist | 3, 4 | 12 + 3 = 15 | 60/15 = 4,00 | 88 % |
| svetovalec | 5 | 10 | 60/10 = 6,00 | 59 % |

- **Zmogljivost optike je 3,53 stranke na uro**, ker je kabina zasedena 17 minut na stranko.
- **Druga kabina:** zmogljivost kabin naraste na 2 · 3,53 = 7,06 na uro. Ozko grlo se premakne na **optometrista (4 stranke na uro)**. Zmogljivost zraste le na 4, ne na 7,06, ker zdaj omejuje drug resurs.
- Nauk: ko odpraviš ozko grlo, se pojavi naslednje. Investicija se splača le do točke, ko ozko grlo postane drug resurs.

## Tehnološki pretočni čas (TPČ) in kritična pot

- **TPČ** je čas, ki ga ena enota potrebuje skozi proces, če nikjer ne čaka. Je dolžina **najdaljše poti** v procesnem diagramu.
- Aktivnosti na tej poti so **kritične**. Aktivnost na krajši vzporedni poti ima **rezervo**.

### Lasten primer: izdelava lesene mize
Zaporedje: O1 rezanje (20 min) → vzporedno O2 brušenje nog (30 min) in O3 lepljenje plošče (45 min) → O4 sestavljanje (25 min) → O5 lakiranje (40 min).
- Pot čez O3: 20 + 45 + 25 + 40 = **130 min = TPČ**. Kritične: O1, O3, O4, O5.
- Pot čez O2: 20 + 30 + 25 + 40 = 115 min. O2 ima **15 minut rezerve**.

Delavci (vsak 480 min na dan): delavec I opravi O1 in O2 (50 min), delavec II O3 (45 min), delavec III O4 in O5 (65 min).
- Zmogljivost: I 480/50 = 9,6; II 480/45 = 10,7; **III 480/65 = 7,4 mize na dan ← ozko grlo**.
- Nov delavec IV prevzame lakiranje O5: III ima le še O4 (25 min → 19,2), IV ima O5 (40 min → 12). Novo ozko grlo je delavec I: **9,6 mize na dan**.
- **Dodaten delavec ne skrajša TPČ**: ena miza še vedno potrebuje 130 minut, ker se trajanje aktivnosti ni spremenilo. Poveča se le zmogljivost.

## Kako spremembe vplivajo na zmogljivost in TPČ

Odgovori so: **P** (poveča se), **Z** (zmanjša se), **N** (nespremenjeno), **O** (ne vemo).

| Sprememba v primeru mize | Zmogljivost | TPČ |
|---|---|---|
| O2 traja 10 minut manj | N (O2 ni pri ozkem grlu) | N (O2 ni kritična) |
| O3 traja 10 minut dlje | N (delavec II ima 55 min = 8,7 mize, ozko grlo ostane III s 7,4) | P (O3 je kritična) |
| O2 traja 25 minut dlje | Z (delavec I ima 75 min → 6,4 mize, novo ozko grlo) | P (pot čez O2 postane 140 min) |
| O2 traja nekaj minut dlje, ne vemo koliko | O | O (do 15 min N, nad 15 min P) |
| dodaten delavec na O5 | P (razbremeni ozko grlo) | N |

Splošna pravila:
- **Zmogljivost** je vezana na **ozko grlo**. Če je ozkih grl več, moraš razbremeniti vsa.
- **TPČ** je vezan na **kritično pot**. Dodaten delavec ga nikoli ne spremeni. Skrajšanje kritične aktivnosti ga ne skrajša nujno, če obstaja še ena enako dolga pot.

## Littlov zakon pri čakanju

Pri čakalni vrsti običajno poznamo, **koliko ljudi čaka** (zaloga Z), ne pa, koliko časa. Zato: **PČ = Z / P**.

**Lasten primer — upravna enota:** prihaja 30 strank na uro (P), v čakalnici je povprečno 15 ljudi (Z). Povprečno čakanje: 15 / 30 = 0,5 ure = **30 minut**.
- Če bi uvedli spletno naročanje in bi v čakalnici povprečno sedelo le 6 ljudi, bi bilo čakanje 6 / 30 = 0,2 ure = 12 minut.
- Če ena referentka obravnava stranko 6 minut, zmore 10 strank na uro; za 30 strank na uro so potrebne vsaj **3 referentke**, sicer vrsta raste brez konca.
