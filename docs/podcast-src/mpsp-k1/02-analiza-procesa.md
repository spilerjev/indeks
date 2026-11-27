# Epizoda 2 — Analiza procesa: zmogljivost, ozko grlo in pretočni čas

Tema: Management proizvodnih in storitvenih procesov. Lastna razlaga snovi z lastnimi primeri.

## Postopek za zmogljivost procesa

1. Za vsako aktivnost zapiši, kateri **resursi** jo izvajajo (ljudje, stroji, prostori).
2. **Obremenitev resursa** = vsota časov vseh aktivnosti, pri katerih sodeluje (minut na enoto).
3. **Zmogljivost enote resursa** = 60 / obremenitev (enot na uro) ali razpoložljivi čas / obremenitev (enot na dan).
4. **Zmogljivost skupine** = zmogljivost enote · število enot (npr. trije enaki stroji).
5. **Ozko grlo** je resurs z najmanjšo zmogljivostjo. Njegova zmogljivost je **zmogljivost celega procesa**.
6. **Izkoriščenost resursa** = dejanski pretok / zmogljivost resursa.

## Lasten primer: tiskarna z dvema ozkima grloma

- **Grafika** (dva, vsak 24 minut na naročilo): zmogljivost skupine 2 · 60/24 = **5 naročil na uro**.
- **Tiskalni stroj** (8 minut tiska): 60/8 = 7,5 naročila na uro.
- **Operater** (pred tiskom pripravi papir in barve 8 minut, po tisku razreže 4 minute, skupaj 12): 60/12 = **5 naročil na uro**.
- **Pakirka** (6 minut): 10 naročil na uro.

Zmogljivost tiskarne je **5 naročil na uro**, ozki grli pa sta **dve**: grafika in operater.
- Izkoriščenost stroja: 5 / 7,5 = 67 %; pakirke: 5 / 10 = 50 %.
- Tiskarna zaposli tretjega grafika: grafiki zmorejo 7,5 na uro, **zmogljivost pa ostane 5**, ker še vedno omejuje operater.
- Če zaposli še drugega operaterja, operaterja zmoreta 10 na uro. Novo ozko grlo sta grafiki in stroj (oboje 7,5), zato zmogljivost zraste na **7,5 naročila na uro**.
- Nauk: če je ozkih grl več, moraš razbremeniti vsa. In ko jih odpraviš, se pokaže naslednje.

## Past: naprava ali prostor je zaseden, tudi ko nihče ne dela

**Lasten primer — avtoservis z enim dvigalom:** dvig avta 3 minute, diagnostika 10, čakanje na rezervni del 15 (avto stoji na dvigalu, mehanik ne dela), menjava dela 12, spust 2 minuti.
- Mehanik je obremenjen 3 + 10 + 12 + 2 = 27 minut na avto → 2,2 avta na uro.
- **Dvigalo** je zasedeno ves čas, ko je avto na njem: 3 + 10 + 15 + 12 + 2 = 42 minut → le **1,4 avta na uro ← ozko grlo**.
- Rešitev brez investicije: med čakanjem na del avto spustijo z dvigala in medtem dvignejo naslednjega. Dvigalo je zasedeno 27 minut in zmogljivost zraste na 2,2 avta na uro.

## Izkoriščenost, ko je naročil premalo

**Lasten primer — kopirnica:** zmogljivost je 8 naročil na uro (ozko grlo sta uslužbenca), tiskalnik zmore 10 na uro. Če pride le 6 naročil na uro, proces dela s **pretokom 6**, ne 8.
- Izkoriščenost tiskalnika je zato 6 / 10 = **60 %**, uslužbencev 6 / 8 = 75 %.
- Ko povpraševanje naraste na 12 naročil na uro, kopirnica obdela le 8; ostala čakajo ali odidejo.

## Tehnološki pretočni čas (TPČ) in kritična pot

- **TPČ** je čas, ki ga ena enota potrebuje skozi proces, če nikjer ne čaka. Je dolžina **najdaljše poti** v procesnem diagramu.
- Aktivnosti na tej poti so **kritične**. Aktivnost na krajši vzporedni poti ima **rezervo** (za koliko se lahko podaljša, ne da bi se TPČ podaljšal).

### Lasten primer: izdelava namizne svetilke
Dve veji začneta hkrati in se združita na koncu:
- veja A: O1 rezanje podstavka (15 min) → O2 brušenje (25 min);
- veja B: O3 električna napeljava (30 min) → O4 montaža senčnika (20 min);
- obe veji se končata v O5 testiranju (10 min).

Poti: O1-O2-O5 = 15 + 25 + 10 = 50 minut; O3-O4-O5 = 30 + 20 + 10 = **60 minut = TPČ**. Kritične so O3, O4 in O5; O1 in O2 imata skupaj **10 minut rezerve**.

**Delavci** (vsak 360 minut na dan): delavec A opravi O1 in O3 (45 min), delavec B O2 in O4 (45 min), delavec C le O5 (10 min).
- A: 360/45 = 8; B: 360/45 = 8; C: 360/10 = 36. Zmogljivost je **8 svetilk na dan**, ozki grli sta A in B, C pa večino dneva čaka.
- Če C prevzame O2 od delavca B: B ima 20 minut (18 na dan), C 35 minut (10,3 na dan), **A ima še vedno 45 minut**, zato zmogljivost ostane 8.
- Če poleg tega B prevzame O1 od delavca A: A ima 30 minut (12), B 35 minut (10,3), C 35 minut (10,3). Zmogljivost zraste na **10,3 svetilke na dan**, brez novega zaposlenega, le z boljšo razdelitvijo dela.
- **TPČ ostane 60 minut** pri vseh razdelitvah, ker se trajanje aktivnosti ni spremenilo.

### Kdaj skrajšanje kritične aktivnosti ne pomaga v celoti
Če pri svetilki O3 skrajšajo s 30 na 20 minut, veja B traja 20 + 20 + 10 = 50 minut, enako kot veja A. TPČ pade s 60 na **50 minut**. Če bi O3 skrajšali še bolj, TPČ ne bi več padal, ker kritična postane veja A.

## Kako spremembe vplivajo na zmogljivost in TPČ

Odgovori so: **P** (poveča se), **Z** (zmanjša se), **N** (nespremenjeno), **O** (ne vemo).
- **Zmogljivost** je vezana na **ozko grlo**. Spremembe pri resursu, ki ni ozko grlo, je ne spremenijo, dokler ta resurs ne postane novo ozko grlo.
- **TPČ** je vezan na **kritično pot**. Podaljšanje nekritične aktivnosti za manj od rezerve ga ne spremeni; za več od rezerve ga podaljša za razliko. Če ne vemo, za koliko se podaljša, je odgovor O.
- **Dodaten delavec ali stroj nikoli ne spremeni TPČ**, ker ena enota še vedno potrebuje enako časa. Spremeni lahko le zmogljivost.
- Skrajšanje kritične aktivnosti ne skrajša TPČ nujno: če obstaja še ena enako dolga pot, ostane TPČ enak.

## Littlov zakon pri čakanju

Pri čakalni vrsti običajno poznamo, **koliko ljudi čaka** (zaloga Z), ne pa, koliko časa. Zato: **PČ = Z / P**.

**Lasten primer — klicni center:** prihaja 90 klicev na uro, pogovor traja povprečno 6 minut.
- Hkrati poteka Z = 90 · 6/60 = **9 pogovorov**, torej je zasedenih 9 operaterjev. Če jih je zaposlenih 12, je njihova izkoriščenost 9 / 12 = 75 %.
- V čakalni vrsti povprečno čakajo 3 klici. Čas čakanja: PČ = 3 / 90 ure = **2 minuti**.
- Klicatelj v sistemu skupaj preživi 2 + 6 = 8 minut; v sistemu je povprečno 90 · 8/60 = 12 klicev.
- Če bi bilo zaposlenih le 8 operaterjev, bi zmogli 80 klicev na uro, prihaja pa jih 90: vrsta bi rasla brez konca.
