/* Makroekonomija 1 - dodatni kompleti za izpit: računske naloge (multiplikatorji, ravnovesni BDP, BDP/BNP, deflator),
   Humov mehanizem, plače in potrošna funkcija ter kartice z ekonomskimi kategorijami. Lastni scenariji in številke. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });
const cards = (arr) => arr.map(([front, back]) => ({ front, back }));

const racunske = [
  C('Zaprto gospodarstvo brez države ima mejno nagnjenost k potrošnji MNP = 0,6. Investicije se povečajo za 40. Za koliko se poveča ravnovesni BDP?',
    ['24', '66,67', '100', '160'], 2,
    'Multiplikator = 1/(1 − 0,6) = 2,5. ΔY = 2,5 · 40 = 100.'),
  C('MNP = 0,8, država pobira sorazmerni dohodninski davek s stopnjo t = 0,25. Investicije se povečajo za 30. Za koliko se poveča ravnovesni BDP?',
    ['75', '150', '66,67', '120'], 0,
    'Multiplikator = 1/(1 − MNP · (1 − t)) = 1/(1 − 0,8 · 0,75) = 1/0,4 = 2,5. ΔY = 2,5 · 30 = 75.'),
  C('Odprto gospodarstvo: MNP = 0,9, sorazmerna davčna stopnja t = 0,2, mejna nagnjenost k uvozu MNU = 0,22. Kolikšen je multiplikator izdatkov?',
    ['3,57', '10', '1,92', '2'], 3,
    'Multiplikator = 1/(1 − MNP · (1 − t) + MNU) = 1/(1 − 0,72 + 0,22) = 1/0,5 = 2. Brez uvoza bi bil 1/0,28 ≈ 3,57.'),
  C('C = 100 + 0,75 · (Y − T), pavšalni davek T = 80, investicije I = 150, državni izdatki G = 120 (zaprto gospodarstvo). Koliko je ravnovesni BDP?',
    ['1.480', '1.240', '1.160', '413,33'], 1,
    'Y = 100 + 0,75 · (Y − 80) + 150 + 120 → 0,25 · Y = 100 − 60 + 270 = 310 → Y = 1.240.'),
  C('MNP = 0,75, davek je pavšalen (neodvisen od dohodka). Država zviša davke za 40, izdatkov ne spremeni. Za koliko se spremeni ravnovesni BDP?',
    ['−160', '−40', '−120', '−30'], 2,
    'Davčni multiplikator = −MNP/(1 − MNP) = −0,75/0,25 = −3. ΔY = −3 · 40 = −120.'),
  C('BDP države je 2.400. Rezidenti prejmejo iz tujine 180 faktorskih dohodkov (plače, obresti, dividende), tujcem pa izplačajo 260. Koliko je BNP?',
    ['2.320', '2.480', '2.840', '1.960'], 0,
    'Neto faktorski dohodki iz tujine = 180 − 260 = −80. BNP = BDP + neto faktorski dohodki = 2.400 − 80 = 2.320.'),
  C('Nominalni BDP je v prvem letu 800 (deflator 100), v drugem letu 924 (deflator 105). Kolikšna je realna rast BDP?',
    ['15,5 %', '5 %', '10,5 %', '10 %'], 3,
    'Realni BDP v drugem letu = 924/1,05 = 880. Realna rast = 880/800 − 1 = 10 %. Nominalna rast je 15,5 %, odštevanje 5 točk je le približek.'),
  C('V gospodarstvu nastajata le kruh in kolesa. Bazno leto: kruh 2 € (500 kosov), kolo 150 € (20 kosov). Tekoče leto: kruh 2,5 € (600 kosov), kolo 160 € (25 kosov). Koliko je deflator BDP v tekočem letu?',
    ['90', '137,5', '111,1', '106,7'], 2,
    'Nominalni BDP = 2,5 · 600 + 160 · 25 = 5.500. Realni BDP (bazne cene) = 2 · 600 + 150 · 25 = 4.950. Deflator = 5.500/4.950 · 100 ≈ 111,1.'),
];

const pojmi = [
  Q('Pod zlatim standardom ima država velik presežek v trgovinski bilanci. Kaj se po Humovem mehanizmu zgodi v naslednjih letih?', [
    'Zlato odteka v tujino, cene doma padajo in presežek se še poveča',
    'Zlato priteka, količina denarja in cene rastejo, izvoz se podraži in presežek se zmanjšuje',
    'Centralna banka mora razvrednotiti valuto, da ohrani presežek',
    'Zlato priteka, cene ostanejo enake, presežek pa trajno ostane'], 1,
    'Presežek pomeni pritok zlata, torej več denarja in višje domače cene. Domače blago postane dražje od tujega, izvoz upade, uvoz zraste in bilanca se uravnoteži sama.'),
  Q('Na kateri predpostavki sloni samodejno uravnoteženje trgovinske bilance v Humovem mehanizmu?', [
    'Cene so toge, prilagaja se le obseg proizvodnje',
    'Država z vladnimi izdatki nadomesti izpad izvoza',
    'Cene so prožne in se gibljejo sorazmerno s količino denarja',
    'Devizni tečaj prosto pluje glede na povpraševanje po valuti'], 2,
    'Hume se opira na kvantitativno teorijo denarja: več zlata (denarja) pomeni sorazmerno višje cene. Pri zlatem standardu so paritete stalne, zato se prilagajajo cene, ne tečaj.'),
  Q('Agregatno povpraševanje upade, nominalne plače pa se zaradi pogodb ne znižajo. Kaj je po Keynesu posledica?', [
    'Realne plače ostanejo previsoke, nastane neprostovoljna brezposelnost',
    'Trg dela se takoj očisti, brezposelnost ostane naravna',
    'Podjetja povečajo zaposlovanje, ker so plače stalne',
    'Cene in plače padejo sorazmerno, output se ne spremeni'], 0,
    'Toge nominalne plače se ne prilagodijo nižjemu povpraševanju, zato je realna plača nad ravnovesno. Podjetja zaposlujejo manj, kot bi delavci pri tej plači želeli delati.'),
  Q('Splošna raven cen pade za 4 %, nominalne plače pa ostanejo nespremenjene. Kaj se zgodi z realno plačo in zaposlenostjo?', [
    'Realna plača pade za 4 %, zaposlenost zraste',
    'Realna plača se ne spremeni, ker so nominalne plače stalne',
    'Realna plača zraste za približno 4 %, zaposlenost se zmanjša',
    'Realna plača zraste, zaposlenost pa zaradi višje kupne moči zraste'], 2,
    'Realna plača = nominalna plača/raven cen, zato ob 4 % nižjih cenah zraste za približno 4 %. Delo postane za podjetja dražje, zato ga povprašujejo manj.'),
  Q('Kaj pomeni indeksacija plač?', [
    'Samodejno usklajevanje nominalnih plač z rastjo cen, npr. z indeksom cen življenjskih potrebščin',
    'Usklajevanje plač z rastjo produktivnosti dela v posamezni panogi, kot ga določi kolektivna pogodba',
    'Zakonsko določena najnižja plača, ki je enaka za vse panoge',
    'Izračun realnega BDP na zaposlenega s pomočjo deflatorja'], 0,
    'Pri indeksaciji se plače po pravilu prilagajajo inflaciji, da se ohrani njihova kupna moč. Usklajevanje s produktivnostjo je drugo merilo.'),
  Q('Nafta se močno podraži, plače pa so v celoti indeksirane na inflacijo. Kaj je najverjetnejša posledica?', [
    'Inflacija hitro izzveni, ker plače padejo',
    'Realne plače se trajno znižajo, inflacija pa ostane nizka',
    'Brezposelnost pade, ker indeksacija poveča produktivnost',
    'Rast cen sproži rast plač in nato novih cen, inflacija postane trdovratnejša'], 3,
    'Indeksacija ščiti kupno moč, a ob ponudbenem šoku prenese višje cene v višje stroške dela. Nastane spirala plač in cen, zato je dezinflacija težja.'),
  Q('Potrošna funkcija je C = a + b · Y z a > 0. Kaj pomeni avtonomna potrošnja a?', [
    'Del dohodka, ki ga gospodinjstva prihranijo',
    'Povečanje potrošnje, ko se dohodek gospodinjstev poveča za eno denarno enoto',
    'Razmerje med celotno potrošnjo in dohodkom',
    'Potrošnja pri ničelnem dohodku, financirana s prihranki ali zadolževanjem'], 3,
    'Avtonomna potrošnja ni odvisna od dohodka. Povečanje potrošnje na enoto dohodka je MNP (b), razmerje C/Y pa povprečna nagnjenost k potrošnji (PNP).'),
  Q('Potrošna funkcija C = a + b · Y ima a > 0 in 0 < b < 1. Kaj velja za povprečno nagnjenost k potrošnji (PNP) ob rasti dohodka?', [
    'PNP narašča in se približuje 1',
    'PNP pada, a ostaja večja od MNP',
    'PNP je stalna in enaka MNP',
    'PNP pada pod MNP in postane negativna'], 1,
    'PNP = C/Y = a/Y + b. Ko Y raste, se člen a/Y manjša, zato PNP pada proti b (MNP), a ga ne doseže, dokler je a > 0.'),
];

module.exports = { id: 'makro', parts: [
  { id: 'izpit',
    decks: [
      { id: 'makro-iz-multiplikator', name: 'Računske: multiplikator, BDP in deflator', calc: true, questions: racunske },
      { id: 'makro-iz-place-potrosnja', name: 'Humov mehanizem, plače in potrošna funkcija', questions: pojmi },
    ],
    flashcards: [
      { id: 'makro-c-kategorije', name: 'Ekonomske kategorije', cards: cards([
        ['Bruto domači proizvod (BDP)', 'Tržna vrednost vseh končnih dobrin in storitev, proizvedenih na ozemlju države v enem letu, ne glede na lastništvo.'],
        ['Bruto nacionalni proizvod (BNP)', 'Vrednost, ki jo ustvarijo rezidenti države doma in v tujini: BNP = BDP + neto faktorski dohodki iz tujine.'],
        ['Neto faktorski dohodki iz tujine', 'Plače, obresti, dividende in najemnine, prejete iz tujine, minus ista vrsta dohodkov, izplačana tujcem.'],
        ['Razpoložljivi dohodek', 'Dohodek gospodinjstev po plačilu neposrednih davkov in prispevkov ter s prištetimi transferji: Yd = Y − T + TR. Deli se na potrošnjo in varčevanje.'],
        ['Varčevanje', 'Del razpoložljivega dohodka, ki ni porabljen: S = Yd − C. Mejna nagnjenost k varčevanju MNV = 1 − MNP.'],
        ['Investicije (bruto)', 'Izdatki za nova osnovna sredstva, stanovanja in spremembo zalog. Neto investicije so bruto investicije minus amortizacija.'],
        ['Deflator BDP', 'Nominalni BDP/realni BDP · 100. Zajema cene vseh domačih končnih dobrin, tudi investicijskih, ne pa uvoženih.'],
        ['Indeks cen življenjskih potrebščin (CPI)', 'Meri spremembo cene stalne košarice, ki jo kupuje povprečno gospodinjstvo; zajema tudi uvoženo blago. V Sloveniji ga objavlja SURS.'],
        ['Deflator BDP vs. CPI', 'Deflator: vse domače končne dobrine, spremenljiva košarica. CPI: stalna košarica potrošnika, vključno z uvozom.'],
        ['Stopnja brezposelnosti', 'Brezposelni/aktivno prebivalstvo · 100. Anketna (po ILO) šteje tiste, ki aktivno iščejo delo; registrirana tiste, prijavljene na zavodu.'],
        ['Stopnja aktivnosti', 'Aktivno prebivalstvo (zaposleni + brezposelni)/delovno sposobno prebivalstvo · 100.'],
        ['Phillipsova krivulja', 'Kratkoročno: obratna povezava med inflacijo in brezposelnostjo. Dolgoročno: navpična pri naravni stopnji brezposelnosti (NAIRU).'],
        ['Agregatno povpraševanje (AD)', 'Skupni izdatki za domači output pri vsaki ravni cen: C + I + G + NX. Premaknejo ga fiskalna in denarna politika, pričakovanja in tuje povpraševanje.'],
        ['Agregatna ponudba (AS)', 'Output, ki ga podjetja ponudijo pri vsaki ravni cen. Premaknejo jo stroški inputov (nafta, plače), tehnologija in količina kapitala.'],
        ['Mejna nagnjenost k potrošnji (MNP, MPC)', 'ΔC/ΔY: del vsakega dodatnega evra dohodka, ki se porabi. Je naklon potrošne funkcije.'],
        ['Povprečna nagnjenost k potrošnji (PNP, APC)', 'C/Y: delež celotnega dohodka, ki se porabi. Pri pozitivni avtonomni potrošnji z rastjo dohodka pada.'],
        ['Multiplikator v odprtem gospodarstvu', '1/(1 − MNP · (1 − t) + MNU). Davki (t) in uvoz (MNU) pomenijo uhajanje iz kroga izdatkov, zato je manjši.'],
        ['Rigidne (toge) nominalne plače', 'Plače, ki se zaradi pogodb in pogajanj ne znižajo ob padcu povpraševanja; kratkoročna AS je zato naraščajoča, nastane neprostovoljna brezposelnost.'],
        ['Indeksacija plač', 'Samodejno usklajevanje plač z rastjo cen. Ohranja kupno moč, a ob ponudbenih šokih krepi spiralo plač in cen.'],
        ['Okunov zakon', 'Povezava med vrzeljo outputa in brezposelnostjo: približno 2 % BDP pod potencialom ustreza 1 odstotni točki višje brezposelnosti.'],
      ]) },
    ] },
] };
