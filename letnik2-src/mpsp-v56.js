/* MPSP - Vaje 5 in 6: dolgoročno planiranje zmogljivosti, drevo odločanja, simulacija, lokacija (12. in 19. 11. 2026).
   Ni za kolokvij (1. 12.), je za izpit. Vir: Vaje/ZAPISKI.md (Vaje 5, Vaje 6). */
const tbl = require('./tbl');
const Q = (q, options, correct, explanation, given) => ({ q, options, correct, explanation, ...(given ? { given } : {}) });
const calc = (arr) => arr.map((q) => ({ ...q, calc: true }));

/* Drevo odločanja: vozlišča { id, kind, label, edge, value, slot, children }; slot = pravilna vrednost praznega polja. */
const T = (q, root, distractors, explanation) => ({ type: 'tree', q, root, distractors, explanation });

const drevo = [
  T('Podjetje TLC (Primer 5.3): verjetnost ugodnega in neugodnega trga je po 0,5. Izidi: večji obrat 400.000 / −360.000, manjši obrat 200.000 / −40.000, ne proizvajati 0. Dopolni pričakovani vrednosti v krogih in v kvadratu izberi odločitev.',
    { id: 'd1', kind: 'decision', label: '1', slot: 'manjši obrat', children: [
      { id: 'A', kind: 'chance', label: 'A', edge: 'večji obrat', slot: '20.000', children: [
        { id: 'A1', kind: 'end', label: '400.000', edge: 'ugodno 0,5' },
        { id: 'A2', kind: 'end', label: '−360.000', edge: 'neugodno 0,5' },
      ] },
      { id: 'B', kind: 'chance', label: 'B', edge: 'manjši obrat', slot: '80.000', children: [
        { id: 'B1', kind: 'end', label: '200.000', edge: 'ugodno 0,5' },
        { id: 'B2', kind: 'end', label: '−40.000', edge: 'neugodno 0,5' },
      ] },
      { id: 'N', kind: 'end', label: 'PV = 0', edge: 'ne proizvajati' },
    ] },
    ['40.000', '180.000', '60.000', 'večji obrat', 'ne proizvajati'],
    'PV = Σ verjetnost × izid. A = 0,5 · 400.000 + 0,5 · (−360.000) = 20.000; B = 0,5 · 200.000 + 0,5 · (−40.000) = 80.000. V kvadratu izbereš največjo PV: manjši obrat. Večji obrat ima višji možni dobiček, a veliko možno izgubo.'),
  T('Podjetje Kemo (Primer 5.4, mio EUR, 10 let): večji obrat −30, manjši −13, širitev manjšega po 2 letih −22. Na koncih vej so že sešteti donosi. Reši drevo od desne proti levi: dopolni PV v krogih C, D, B, A in izberi odločitvi v kvadratih 2 in 1.',
    { id: 'd1', kind: 'decision', label: '1', slot: 'večji obrat', children: [
      { id: 'A', kind: 'chance', label: 'A', edge: 'večji (−30)', slot: '35,8', children: [
        { id: 'A1', kind: 'end', label: '10 · 10 = 100', edge: 'visoko 0,6' },
        { id: 'A2', kind: 'end', label: '2·10 + 8·1 = 28', edge: 'visoko → nizko 0,1' },
        { id: 'A3', kind: 'end', label: '10 · 1 = 10', edge: 'nizko 0,3' },
      ] },
      { id: 'B', kind: 'chance', label: 'B', edge: 'manjši (−13)', slot: '24,0', children: [
        { id: 'd2', kind: 'decision', label: '2', edge: 'visoko 0,7 (leti 1–2: 9)', slot: 'širitev', children: [
          { id: 'C', kind: 'chance', label: 'C', edge: 'širitev (−22)', slot: '26,72', children: [
            { id: 'C1', kind: 'end', label: '8 · 7 = 56', edge: 'visoko 0,86' },
            { id: 'C2', kind: 'end', label: '8 · 0,5 = 4', edge: 'nizko 0,14' },
          ] },
          { id: 'D', kind: 'chance', label: 'D', edge: 'brez širitve', slot: '25,12', children: [
            { id: 'D1', kind: 'end', label: '8 · 3 = 24', edge: 'visoko 0,86' },
            { id: 'D2', kind: 'end', label: '8 · 4 = 32', edge: 'nizko 0,14' },
          ] },
        ] },
        { id: 'B2', kind: 'end', label: '10 · 4 = 40', edge: 'nizko 0,3' },
      ] },
    ] },
    ['48,72', '65,8', '37,0', '29,6', 'manjši obrat', 'brez širitve'],
    'C = 0,86·56 + 0,14·4 − 22 = 26,72; D = 0,86·24 + 0,14·32 = 25,12 → v odločitvi 2 širitev (26,72). B = 0,7·(9 + 26,72) + 0,3·40 − 13 = 24,0; A = 0,6·100 + 0,1·28 + 0,3·10 − 30 = 35,8 → v odločitvi 1 večji obrat. Pasti: pogojne verjetnosti 0,86/0,14 (ne 0,6/0,1), investicijo odšteješ v vozlišču, kjer nastane, v vozlišče 2 neseš samo boljšo vejo.'),
];

const teorija = [
  Q('Kaj pomenita kvadrat in krog v drevesu odločanja?', ['Kvadrat je odločitev, ki jo sprejmeš sam; krog je naključni dogodek z verjetnostmi', 'Kvadrat je naključni dogodek, ki ga določi trg; krog je odločitev, ki jo sprejme vodstvo podjetja', 'Kvadrat je začetek drevesa (izhodišče), krog je konec veje s končnim izidom v denarju', 'Kvadrat označuje investicijo, ki jo plačamo; krog označuje letni donos, ki ga veja prinese'], 0,
    'V kvadratu izbiraš ti (največja PV), v krogu odloča trg z verjetnostmi (PV = Σ verjetnost × izid).'),
  Q('V katerem vrstnem redu rešujemo drevo odločanja?', ['Od desne proti levi: najprej najbolj oddaljene odločitve, v vsakem krogu PV, v kvadratu največja PV', 'Od leve proti desni, kot ga narišemo: najprej prva odločitev, nato po vrsti vsi krogi do koncev vej', 'Najprej vse kvadrate (odločitve), nato vse kroge (naključne dogodke), ne glede na položaj v drevesu', 'Vrstni red ni pomemben, ker je PV vsota zmnožkov in jo lahko seštevamo v poljubnem zaporedju'], 0,
    'V kvadratu naprej neseš samo najboljšo vejo, zato moraš oddaljene odločitve rešiti prej.'),
  Q('Kemo (Primer 5.4): verjetnost visokega povpraševanja vseh 10 let je 0,6, visokega 2 leti in nato nizkega 0,1, nizkega vseh 10 let 0,3. Katera verjetnost velja za "ostane visoko" PO dveh visokih letih?', ['0,6 / 0,7 ≈ 0,86 (pogojna verjetnost)', '0,6, ker je to verjetnost, da je povpraševanje visoko vseh 10 let', '0,7, ker je to skupna verjetnost začetnega visokega povpraševanja', '0,9, ker 0,6 in 0,3 skupaj pokrijeta vse izide brez padca'], 0,
    'Po dveh visokih letih smo v veji z verjetnostjo 0,7 (0,6 + 0,1); pogojno ostane visoko 0,6/0,7 = 0,86, pade 0,1/0,7 = 0,14.'),
  Q('Kje v drevesu odločanja odštejemo investicijo (npr. −22 za širitev)?', ['V vozlišču, kjer investicija nastane, torej pri PV tiste veje', 'Samo na koncu drevesa, ko od končne PV v kvadratu 1 odštejemo vsoto vseh investicij', 'Na vsakem koncu veje posebej, da vsak izid že vsebuje svojo investicijo', 'Investicij ne odštevamo, ker so že zajete v letnih donosih na koncih vej'], 0,
    'PV veje C = 0,86·56 + 0,14·4 − 22; investicija zniža PV veje, v kateri jo plačamo.'),
  Q('Kaj se iz odločitvenega kvadrata nese naprej (v levo) v drevesu odločanja?', ['Samo PV najboljše veje', 'Povprečje PV vseh vej', 'Vsota PV vseh vej', 'PV najslabše veje (previdnostno)'], 0,
    'Odločitev pomeni, da bomo izbrali najboljšo možnost, zato v levo gre samo njena PV.'),
  Q('Dom (Primer 5.1): kateri postopek ima najnižji začetek in najbolj strmo premico celotnih stroškov?', ['Ročen (FC 15.000, AVC 820)', 'Mehaniziran (FC 35.000, AVC 730)', 'Avtomatiziran (FC 80.000, AVC 580)', 'Vsi imajo enak začetek, ker je material povsod 350'], 0,
    'Presečišče z osjo y je FC, naklon je AVC. Avtomatiziran ima najvišji začetek in najpoložnejšo premico, zato je primeren za množično proizvodnjo.'),
  Q('Dom (Primer 5.1): zakaj se postopki razlikujejo le v stroških dela, ne v materialu?', ['Material na enoto je pri vseh enak (350), razlika je v neposrednem delu (470 / 380 / 230)', 'Material je pri avtomatiziranem postopku cenejši zaradi manj odpadka, delo pa je pri vseh postopkih enako', 'Delo na enoto je pri vseh postopkih enako (470), razlikuje se samo material zaradi različnih dobaviteljev', 'Razlika je samo v stalnih stroških, spremenljivi stroški na enoto so pri vseh postopkih 820'], 0,
    'AVC = material + neposredno delo; avtomatizacija nadomešča delo, materiala ne.'),
  Q('Primer 5.2 (kdaj in za koliko povečati zmogljivost): zakaj je bila najugodnejša možnost obrat 8.000 čez eno leto, prvo leto pa alternativno povečanje?', ['Zamik investicije za leto prihrani 15 % od 3,6 mio, dražja proizvodnja v 1. letu pa stane le 2 € × 1.000 enot', 'Ker je obrat 8.000 cenejši na enoto zmogljivosti, sama zakasnitev za leto pa na rezultat ne vpliva', 'Ker nadure in zunanji dobavitelji v prvem letu nimajo dodatnih stroškov v primerjavi z lastno proizvodnjo', 'Ker se povpraševanje v 1. letu še ne pojavi in obrat v tem letu sploh ne bi bil potreben'], 0,
    'Investicija je daleč največji strošek, zato je diskontiranje za eno leto vredno veliko več kot 2 € pribitka na majhno količino.'),
  Q('Primer 5.2: povpraševanje raste enakomerno za 2.000 enot na leto. Koliko znaša povprečno povpraševanje v prvem letu in zakaj?', ['1.000, ker raste enakomerno od 0 do 2.000', '2.000, ker je to letna rast in jo v celoti štejemo že v prvem letu', '0, ker se obrat v prvem letu še gradi in proizvodnja še ne teče', '4.000, ker v prvem letu štejemo povprečje prvih dveh let rasti'], 0,
    'Trik 1: v posameznem letu računamo s povprečjem (1.000, 3.000, 5.000, 7.000).'),
  Q('Primer 5.2: na kateri trenutek diskontiramo proizvodne stroške posameznega leta in na katerega investicijo?', ['Proizvodne stroške na sredino leta (1/1,15^0,5 …), investicijo na trenutek nakupa', 'Oboje na konec leta (faktorji 1/1,15, 1/1,15² …), ker takrat zaključimo obračun', 'Oboje na začetek leta, ker takrat sprejmemo odločitev o proizvodnji in nakupu', 'Proizvodnih stroškov ne diskontiramo, diskontiramo samo investicijo na trenutek nakupa'], 0,
    'Trik 2: stroški nastajajo čez vse leto, zato faktorji 0,93 · 0,81 · 0,71 · 0,61; investicija zdaj = 1, čez 1 leto 1/1,15, čez 2 leti 1/1,15².'),
  Q('Primer 5.8 (kdaj zamenjati delovno sredstvo): po katerem merilu določimo trenutek zamenjave?', ['Po toliko letih, da so povprečni letni stroški (investicija, vzdrževanje, izzivalec) najnižji', 'Ko je preostala vrednost stroja enaka nič, ker ga takrat ne moremo več prodati', 'Ko kumulativni stroški vzdrževanja presežejo nabavno vrednost stroja (500)', 'Ko se na trgu pojavi prvi boljši stroj (izzivalec), ne glede na stroške'], 0,
    'AC = AC_INV + AC_VZD + AC_IZZ, vsak kot kumulativa deljeno s številom let; krivulja AC ima obliko U.'),
  Q('Primer 5.8: zakaj ima krivulja povprečnih letnih stroškov obliko U?', ['Investicija na leto pada (razporedi se na več let), vzdrževanje in zaostajanje za novim strojem pa rasteta', 'Vsi trije deli stroškov (investicija, vzdrževanje, izzivalec) z leti enakomerno padajo', 'Vsi trije deli stroškov (investicija, vzdrževanje, izzivalec) z leti enakomerno rastejo', 'Preostala vrednost stroja z leti raste, vzdrževanje pa ostaja ves čas enako'], 0,
    'Minimum je tam, kjer padajoča investicijska komponenta in rastoči vzdrževanje ter prednost izzivalca skupaj dasta najmanj.'),
  Q('Primer 5.5 (simulacija s slučajnimi števili): kako negotovim vložkom dodelimo razpone slučajnih števil?', ['Po kumulativni verjetnosti: vrednost z verjetnostjo 0,2 dobi 00–19, naslednja z 0,3 dobi 20–49 itd.', 'Vsaka vrednost dobi enako širok razpon (npr. po 25 števil pri štirih vrednostih), verjetnosti ne upoštevamo', 'Po velikosti vrednosti: največja vrednost (npr. priliv 410) dobi največji razpon slučajnih števil', 'Razpone določimo naključno, ker slučajna števila tako ali tako izberejo vrednost po naključju'], 0,
    'Širina razpona je sorazmerna verjetnosti, zato slučajna števila vrednosti izbirajo s pravo verjetnostjo.'),
  Q('Primer 5.5: kaj je rezultat simulacije in kaj iz njega razberemo?', ['Porazdelitev donosnosti: poleg pričakovane donosnosti vidimo tudi tveganje (σ)', 'Ena sama natančna donosnost projekta, ki jo dobimo kot povprečje vseh vhodnih podatkov', 'Samo najboljši in najslabši možni izid, iz katerih ocenimo razpon donosnosti', 'Verjetnost, da je napoved povpraševanja pravilna, izražena v odstotkih'], 0,
    'Več ponovitev da bolj zanesljivo oceno; iz deležev ponovitev odčitamo npr. P(ROI ≥ 50 %).'),
  Q('Primer 5.5: kako izračunamo donosnost (ROI) ene ponovitve simulacije?', ['(priliv − odliv) / vlaganje', 'priliv / odliv', '(priliv − vlaganje) / odliv', 'priliv − odliv − vlaganje'], 0,
    'Npr. 1. ponovitev: (400 − 310) / 130 = 69 %.'),
  Q('Hamburger (Primer 5.11): lokacija 1 ima večjo predvideno prodajo, a smo izbrali lokacijo 2. Zakaj?', ['L2 ima večji prispevek za kritje na enoto (35 proti 29,5): večji dobiček in nižja prelomna točka', 'L2 ima nižje stalne stroške, zato je prelomna točka nižja kljub manjšemu prispevku na enoto', 'L1 ima višjo prodajno ceno, a tudi višje stalne stroške, zato je dobiček manjši', 'L2 ima več predvidene prodaje (130.000 enot), zato je dobiček večji kljub višjim stroškom'], 0,
    'Dobiček = (PC − VC) · Q − FC: L1 885.000 €, L2 1.050.000 €; prelomna točka L1 100.000, L2 90.000 enot (manjše tveganje).'),
  Q('Banka Nova (Primer 5.14, točkovna metoda): kaj moramo preveriti pri pondrih in kaj je slabost metode?', ['Vsota pondrov mora biti 1; metoda je subjektivna, ker so pondri in točke ocene vodstva', 'Vsota pondrov mora biti 100; metoda je objektivna, ker temelji na merjenih podatkih o lokacijah', 'Pondri morajo biti za vse dejavnike enaki; metoda upošteva samo stroške zemljišča in poslovanja', 'Pondrov ne preverjamo; metoda je natančna, ker vsak dejavnik točkujemo od 0 do 100'], 0,
    'Skupna ocena = Σ ponder × točke; točke pri stroških so že obrnjene (več = ugodneje).'),
];

const rac = [
  Q('Dom (Primer 5.1): trije postopki za kuhinjske omare imajo podatke v tabeli. Kateri postopek je najcenejši pri Q = 200 in kateri pri Q = 350 enot?', ['Q = 200: ročen (179.000); Q = 350: avtomatiziran (283.000)', 'Q = 200: mehaniziran (181.000); Q = 350: mehaniziran (290.500)', 'Q = 200: avtomatiziran (196.000); Q = 350: ročen (302.000)', 'Pri obeh količinah ročen'], 0,
    'TC = FC + AVC · Q. Q = 200: 179.000 / 181.000 / 196.000 → ročen. Q = 350: 302.000 / 290.500 / 283.000 → avtomatiziran.',
    tbl('Primer 5.1 – podjetje Dom', ['', 'Ročen', 'Mehaniziran', 'Avtomatiziran'], [['Letni stalni stroški (FC)', '15.000', '35.000', '80.000'], ['Spremenljivi stroški/enoto (AVC)', '820', '730', '580']])),
  Q('Dom (Primer 5.1): pri kateri količini sta ročen in mehaniziran postopek enako draga in pri kateri mehaniziran in avtomatiziran?', ['Q₁ = 20.000 / 90 ≈ 222 (223) enot; Q₂ = 45.000 / 150 = 300 enot', 'Q₁ = 45.000 / 150 = 300 enot; Q₂ = 20.000 / 90 ≈ 222 enot', 'Q₁ = 65.000 / 240 ≈ 271 enot; Q₂ = 45.000 / 150 = 300 enot', 'Q₁ = 20.000 / 90 ≈ 222 enot; Q₂ = 65.000 / 240 ≈ 271 enot'], 0,
    'Prelomna točka: Q = razlika FC / razlika AVC. Ročen = mehaniziran: (35.000 − 15.000)/(820 − 730) = 222,2; mehaniziran = avtomatiziran: (80.000 − 35.000)/(730 − 580) = 300. Odločitev: Q < 223 ročen, 223–300 mehaniziran, > 300 avtomatiziran.',
    tbl('Primer 5.1 – podjetje Dom', ['', 'Ročen', 'Mehaniziran', 'Avtomatiziran'], [['Letni stalni stroški (FC)', '15.000', '35.000', '80.000'], ['Spremenljivi stroški/enoto (AVC)', '820', '730', '580']])),
  Q('Primer 5.8: stroj stane 500 (v 1.000 €). Preostala vrednost po 1–4 letih 350 / 300 / 200 / 0, vzdrževanje po letih 50 / 80 / 110 / 180, prednost izzivalca 0 / 30 / 50 / 100. Po koliko letih ga zamenjamo?', ['Po 2 letih (povprečni letni stroški 180)', 'Po 1 letu (povprečni letni stroški 200)', 'Po 3 letih (povprečni letni stroški 206,7)', 'Po 4 letih (povprečni letni stroški 275)'], 0,
    'AC po letih: 1: 150 + 50 + 0 = 200; 2: 100 + 65 + 15 = 180 (min); 3: 100 + 80 + 26,7 = 206,7; 4: 125 + 105 + 45 = 275.',
    tbl('Primer 5.8 – delovno sredstvo (v 1.000 €)', ['Po letih', '1', '2', '3', '4'], [['Preostala vrednost', '350', '300', '200', '0'], ['Vzdrževanje v letu', '50', '80', '110', '180'], ['Prednost izzivalca v letu', '0', '30', '50', '100']], 'Nabavna vrednost 500.')),
  Q('TLC (Primer 5.3): ugoden in neugoden trg sta enako verjetna (0,5). Večji obrat prinese 400.000 ali −360.000, manjši 200.000 ali −40.000, brez proizvodnje 0. Kakšni sta pričakovani vrednosti in kaj izberemo?', ['Večji 20.000, manjši 80.000 → manjši obrat', 'Večji 40.000, manjši 160.000 → manjši obrat', 'Večji 380.000, manjši 160.000 → večji obrat', 'Večji 20.000, manjši 80.000 → večji obrat zaradi višjega možnega dobička'], 0,
    'PV = Σ verjetnost × izid: 0,5·400.000 + 0,5·(−360.000) = 20.000; 0,5·200.000 + 0,5·(−40.000) = 80.000.'),
  Q('Kemo (Primer 5.4): širitev manjšega obrata stane 22, po širitvi je 8 let donos 7 (visoko, 0,86) ali 0,5 (nizko, 0,14); brez širitve 3 (0,86) ali 4 (0,14). Kakšni sta PV za širitev (C) in brez širitve (D)?', ['C = 26,72; D = 25,12 → širitev', 'C = 48,72; D = 25,12 → širitev', 'C = 26,72; D = 3,12 → širitev', 'C = 4,72; D = 25,12 → brez širitve'], 0,
    'C = 0,86·56 + 0,14·4 − 22 = 26,72; D = 0,86·24 + 0,14·32 = 25,12.'),
  Q('Kemo (Primer 5.4): veja večjega obrata (−30) ima izide 100 (0,6), 28 (0,1) in 10 (0,3); veja manjšega (−13) ima 9 + 26,72 (0,7) in 40 (0,3). Kakšni sta PV in katero odločitev sprejmemo?', ['A = 35,8; B = 24,0 → večji obrat', 'A = 65,8; B = 37,0 → večji obrat', 'A = 35,8; B = 24,0 → manjši obrat, ker je cenejši', 'A = 5,8; B = 24,0 → manjši obrat'], 0,
    'A = 0,6·100 + 0,1·28 + 0,3·10 − 30 = 35,8; B = 0,7·(9 + 26,72) + 0,3·40 − 13 = 24,0.'),
  Q('Primer 5.5: slučajna števila 56, 97, 01 določijo priliv, odliv in vlaganje po tabeli. Kolikšna je donosnost te ponovitve?', ['(400 − 310) / 130 = 69 %', '(400 − 310) / 140 = 64 %', '(410 − 310) / 130 = 77 %', '(400 − 300) / 130 = 77 %'], 0,
    '56 → priliv 400 (50–79), 97 → odliv 310 (90–99), 01 → vlaganje 130 (00–29); ROI = (400 − 310)/130 = 69 %.',
    tbl('Primer 5.5 – razponi slučajnih števil', ['Priliv', 'Sl. št.', 'Odliv', 'Sl. št.', 'Vlaganje', 'Sl. št.'], [['350', '00–19', '270', '00–09', '130', '00–29'], ['370', '20–49', '290', '10–49', '140', '30–69'], ['400', '50–79', '300', '50–89', '150', '70–99'], ['410', '80–99', '310', '90–99', '', '']])),
  Q('Primer 5.5: osem ponovitev simulacije da donosnosti 69, 29, 36, 73, 79, 71, 54 in 57 %. Kolikšna je verjetnost, da je ROI vsaj 50 %, in kolikšna je povprečna donosnost?', ['P(ROI ≥ 50 %) = 6/8 = 75 %; povprečje 58,5 %', 'P(ROI ≥ 50 %) = 5/8; povprečje 58,5 %', 'P(ROI ≥ 50 %) = 6/8; povprečje 65 %', 'P(ROI ≥ 50 %) = 3/8; povprečje 58,5 %'], 0,
    'Verjetnost iz simulacije = delež ponovitev (6 od 8 je ≥ 50 %); povprečje 468/8 = 58,5 %, σ ≈ 18 %.'),
  Q('Hamburger (Primer 5.11): podatki za lokaciji sta v tabeli. Kolikšni sta prelomni točki?', ['L1 = 100.000 enot; L2 = 90.000 enot', 'L1 = 90.000 enot; L2 = 100.000 enot', 'L1 = 96.721 enot; L2 = 118.868 enot', 'L1 = 49.167 enot; L2 = 51.220 enot'], 0,
    'Q_BEP = FC / (PC − VC): L1 = 2.950.000 / 29,5 = 100.000; L2 = 3.150.000 / 35 = 90.000.',
    tbl('Primer 5.11 – Hamburger', ['', 'Lokacija 1', 'Lokacija 2'], [['Stalni stroški/leto (FC)', '2.950.000', '3.150.000'], ['Spremenljivi stroški/enoto (VC)', '30,5', '26,5'], ['Prodajna cena (PC)', '60,0', '61,5'], ['Predvidena prodaja (Q)', '130.000', '120.000']])),
  Q('Hamburger (Primer 5.11): podatki za lokaciji sta v tabeli. Kolikšen je dobiček na vsaki lokaciji in katero izberemo?', ['L1 = 885.000 €; L2 = 1.050.000 € → L2', 'L1 = 3.835.000 €; L2 = 4.200.000 € → L2', 'L1 = 1.050.000 €; L2 = 885.000 € → L1', 'L1 = 885.000 €; L2 = 1.050.000 € → L1 zaradi večje prodaje'], 0,
    'Dobiček = (PC − VC) · Q − FC: L1 = 29,5 · 130.000 − 2.950.000 = 885.000; L2 = 35 · 120.000 − 3.150.000 = 1.050.000.',
    tbl('Primer 5.11 – Hamburger', ['', 'Lokacija 1', 'Lokacija 2'], [['Stalni stroški/leto (FC)', '2.950.000', '3.150.000'], ['Spremenljivi stroški/enoto (VC)', '30,5', '26,5'], ['Prodajna cena (PC)', '60,0', '61,5'], ['Predvidena prodaja (Q)', '130.000', '120.000']])),
  Q('Banka Nova (Primer 5.14): točkovna metoda s pondri in točkami lokacij je v tabeli. Katero lokacijo izberemo?', ['B (82 točk); A 72,5; C 80,5', 'C (80,5 točk)', 'A (72,5 točk)', 'B in C sta izenačeni'], 0,
    'Skupna ocena = Σ ponder × točke: A = 15 + 8 + 18 + 14 + 17,5 = 72,5; B = 25 + 7 + 18 + 12 + 20 = 82; C = 20 + 10 + 16 + 12 + 22,5 = 80,5.',
    tbl('Primer 5.14 – banka Nova', ['Dejavnik', 'Ponder', 'A', 'B', 'C'], [['Prometnost lokacije', '0,25', '60', '100', '80'], ['Stroški zemljišča', '0,10', '80', '70', '100'], ['Stroški poslovanja', '0,20', '90', '90', '80'], ['Razpoložljivost parkirišč', '0,20', '70', '60', '60'], ['Prebivalstvo v radiju 4 km', '0,25', '70', '80', '90']])),
];

module.exports = { drevo, teorija, rac: calc(rac) };
