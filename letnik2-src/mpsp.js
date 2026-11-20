/* Management proizvodnih in storitvenih procesov - vir: School/.../MPSP/Vaje/ZAPISKI.md (Vaje 1, študija primera YG)
   + vaje v slogu izpita (napisane na novo, pogoste izpitne teme). */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const PN = (q, drzi, explanation) => ({ q, options: ['Drži', 'Ne drži'], correct: drzi ? 0 : 1, explanation });

const strategija = [
  Q('Kje se po sliki "izdelavna strategija" začne oblikovanje strategije?', ['Pri odločitvah o procesih', 'Pri zahtevah trga (stranke) in značilnostih storitve', 'Pri financah', 'Pri tehnologiji'], 1,
    'Zahteve trga ↔ značilnosti storitve → poslovna strategija ↔ odločitve o procesih.'),
  Q('Kaj so dejavniki zmagovanja?', ['Lastnosti, ki morajo biti "dovolj dobre"', 'Konkurenčne prednostne naloge, s katerimi podjetje pridobi stranke', 'Stroški proizvodnje', 'Slabosti podjetja'], 1,
    'Pri YG: časovna fleksibilnost in lokacijska priročnost (+ cena naročnine).'),
  Q('Kaj so dejavniki kvalificiranja?', ['Morajo biti najboljši na trgu', 'Morajo biti "dovolj dobri", da stranka sploh razmisli o nakupu', 'Lastnosti konkurentov', 'Kvalifikacije zaposlenih'], 1,
    'Pri YG: dovolj dobra možnost za napredek in sprejemljiva začetna investicija.'),
  Q('Kakšna je poslovna strategija YG (povezani fitnes)?', ['Stroškovno vodstvo z najnižjo ceno', 'Diferenciacija s priročnostjo in prilagodljivostjo po dostopni ceni', 'Nišna strategija za profesionalne športnike', 'Vertikalna integracija'], 1,
    'Vadba kadarkoli in kjerkoli, prilagojena posamezniku.'),
  Q('Pri spider diagramu je rob lestvice "najugodneje za stranko". Kaj pomeni ocena 5 pri ceni?', ['Visoka cena', 'Nizka cena', 'Povprečna cena', 'Cena ni pomembna'], 1,
    'Zato pri ceni in investiciji 5 pomeni NIZKO.'),
  Q('Kje je ozko grlo zmogljivosti pri YG?', ['Strežniki', 'Trenerji v živo', 'Prostor', 'Naprave v dvorani'], 1,
    'Program teče za poljubno število strank, trenerji pa so omejeni (6 trenerjev, 2 izmeni).'),
  Q('Kakšen je stik s stranko pri YG v primerjavi z običajnim fitnesom?', ['Visok, osebni', 'Nizek, digitalen → standardizirano in ceneje', 'Enak', 'Ga ni'], 1,
    'Običajni fitnes: visok osebni stik → prilagojeno, dražje.'),
  Q('Kaj je ključna razlika med izdelkom in storitvijo pri usklajevanju ponudbe in povpraševanja?', ['Storitev je dražja', 'Izdelek lahko daš na zalogo (blažilnik), storitev nastaja hkrati s porabo in je ni mogoče skladiščiti', 'Izdelek je vedno standardiziran', 'Ni razlike'], 1,
    'Neporabljena ura trenerja je izgubljena; zmogljivost je treba prilagajati sproti ali usmerjati povpraševanje (cene, rezervacije).'),
  Q('Povpraševanje po treningih v živo presega ponudbo. Kateri ukrep je primeren?', ['Zmanjšati število trenerjev', 'Različne cene za bolj in manj popularne ure, skupinski treningi, novi trenerji', 'Več marketinga', 'Povečati zalogo'], 1,
    'Ko ponudba presega povpraševanje (prosti termini): manj trenerjev, dodatne marketinške aktivnosti, komplementarne storitve.'),
  Q('Kateri ukrep usklajevanja velja za PROIZVODNJO opreme, ne pa za storitev?', ['Rezervacijski sistem', 'Varnostna zaloga', 'Dinamične cene', 'Skupinski treningi'], 1,
    'Izdelek lahko naredimo vnaprej; pri storitvi zaloge ni.'),
  Q('Katera je nevarnost iz okolja za YG?', ['Hibridno delo', 'Vračanje ljudi v fitnese po epidemiji in lahko posnemljiva digitalna konkurenca', 'Napredek UI', 'Staranje prebivalstva'], 1,
    'Tudi: GDPR (kamera doma), pomanjkanje trenerjev, motnje v dobavnih verigah, gospodarska negotovost.'),
];

const izpit = [
  PN('Projekt ne more biti končan prej, kot traja najdaljša pot v mrežnem diagramu.', true, 'Najdaljša pot je kritična pot; določa najkrajši možni čas izvedbe projekta.'),
  PN('Če skrajšamo aktivnost, ki ima časovno rezervo, se trajanje projekta skrajša.', false, 'Nekritična aktivnost ima rezervo; trajanje določa kritična pot.'),
  PN('Odločitev za večjo avtomatizacijo lahko zniža stroške, a zmanjša fleksibilnost.', true, 'To je alternativna korist (trade-off) med konkurenčnimi prednostnimi nalogami.'),
  PN('Montažna linija mora za večjo planirano zmogljivost delovati s krajšim ciklom.', true, 'Cikel = razpoložljivi čas / planirana zmogljivost.'),
  Q('Katera trditev o ravneh strateškega planiranja NI pravilna?', ['O vzvodih izdelavnega procesa odloča strategija sestavljenega podjetja', 'Poslovna strategija določa, kako bo poslovna enota konkurirala', 'Strategija sestavljenega podjetja razporeja vire med poslovne enote', 'Strategija poslovne funkcije (npr. izdelavna) odloča o vzvodih svoje funkcije'], 0,
    'O vzvodih izdelavnega procesa odloča izdelavna (funkcijska) strategija.'),
  Q('Kumulativna napaka napovedi (KNN) je po petih mesecih enaka 0. Kaj to pomeni?', ['Pozitivne in negativne napake so se izničile; napovedi so bile lahko kljub temu netočne', 'Vse napovedi so bile popolnoma točne', 'Napovedi so bile sistematično previsoke', 'Tudi povprečna absolutna napaka je 0'], 0,
    'KNN meri pristranskost (smer), velikost napak pa PANN.'),
  Q('Kaj se zgodi z optimalno količino naročila (EOQ), če se stroški skladiščenja enote povečajo?', ['Zmanjša se, naročamo pogosteje', 'Poveča se, naročamo redkeje', 'Ne spremeni se', 'Zmanjša se, naročamo redkeje'], 0,
    'EOQ = √(2DS/H): višji H → manjša količina naročila in pogostejša naročila.'),
  Q('Pri drsečih sredinah izberemo majhno število obdobij N. Kaj dosežemo?', ['Napoved se hitro odziva na spremembe, a je manj stabilna', 'Napoved je zelo stabilna in se počasi odziva', 'Napoved je vedno natančnejša', 'Število obdobij na napoved ne vpliva'], 0,
    'Majhen N → visoka odzivnost, večji vpliv naključnih nihanj; velik N → stabilnost.'),
];

const rac = [
  Q('Littlov zakon: trening traja 0,5 h, trener ima naenkrat 1 stranko. Koliko strank na uro (pretok)?', ['2', '0,5', '4', '8'], 0,
    'Z = PČ · P → P = Z / PČ = 1 / 0,5 = 2 stranki/h.'),
  Q('Trening traja 0,5 h, trener ima naenkrat 1 stranko (pretok 2 stranki/h), izmena traja 4 h. Koliko strank obdela en trener v izmeni?', ['8', '4', '2', '16'], 0, '4 h · 2 = 8 strank.'),
  Q('6 trenerjev, 2 izmeni po 4 h (3 na izmeno). Koliko strank na dan?', ['48', '24', '96', '192'], 0, '8 strank na izmeno na trenerja · 6 trenerjev = 48.'),
  Q('Fitnes: 6 trenerjev, 2 izmeni po 4 h, skupine po 4 stranke (Z = 4, PČ = 0,5 h). Koliko strank na dan?', ['192', '48', '96', '32'], 0,
    'P = 4 / 0,5 = 8 na uro → 32 na izmeno na trenerja → 192 na dan (4× več, a manj osebnega pristopa).'),
  Q('Prodaja 100.000, stroški prodanih 80.000, finančni stroški 6.000, davek 25 %. Prispevek za kritje (dobiček po davku)?', ['10.500', '14.000', '20.000', '15.000'], 0,
    '100.000 − 80.000 = 20.000; − 6.000 = 14.000; − 25 % davka (3.500) = 10.500.'),
  Q('Prodaja 100.000, stroški prodanih 80.000, finančni stroški 6.000, davek 25 % (dobiček po davku 10.500). Kateri ukrep najbolj poveča dobiček po davku?', ['Prodaja +50 % (stroški prodanih sorazmerni)', 'Finančni stroški −50 %', 'Stroški prodanih −20 %', 'Cena +10 % pri enaki količini'], 2,
    'Stroški prodanih −20 %: 64.000 → 36.000 − 6.000 = 30.000 → po davku 22.500 (+114 %), brez dodatnega povpraševanja ali zmogljivosti. Prodaja +50 %: 150.000 − 120.000 − 6.000 = 24.000 → 18.000; cena +10 %: 110.000 − 80.000 − 6.000 = 24.000 → 18.000; finančni stroški −50 %: 17.000 → 12.750.'),
];
rac.forEach((q) => { q.calc = true; });

const kartice = [
  ['Izdelavna strategija (slika 1)', 'Zahteve trga ↔ značilnosti storitve → poslovna strategija ↔ odločitve o procesih.'],
  ['Dejavniki zmagovanja', 'Konkurenčne naloge, s katerimi pridobimo stranke (YG: časovna fleksibilnost, lokacijska priročnost).'],
  ['Dejavniki kvalificiranja', 'Morajo biti "dovolj dobri", ne najboljši (YG: napredek, začetna investicija).'],
  ['Konkurenčne prednostne naloge', 'Kakovost, stroški, fleksibilnost, hitrost (in zanesljivost) dobave.'],
  ['Alternativne koristi', 'Odločitev, ki izboljša eno nalogo, praviloma poslabša drugo → treba je izbrati dejavnike zmagovanja.'],
  ['Odločitve o storitvenem procesu', 'Lokacija, zmogljivost, razmestitev, tehnologija, stik s stranko, kadri, terminiranje, kakovost, usklajevanje ponudbe in povpraševanja.'],
  ['Izdelek vs. storitev', 'Izdelek gre na zalogo (blažilnik); storitev nastaja hkrati s porabo - zmogljivost prilagajamo sproti ali usmerjamo povpraševanje.'],
  ['Littlov zakon', 'Z = PČ · P (zaloga = pretočni čas × pretok); angl. I = T · R.'],
  ['Kritična pot', 'Najdaljša pot v mrežnem diagramu; določa najkrajši čas projekta.'],
];

const v2 = require('./mpsp-v2');
const v3 = require('./mpsp-v3');
const maja = require('./mpsp-maja');
const v56 = require('./mpsp-v56');

module.exports = {
  id: 'mpsp',
  parts: [
    {
      id: 'k1', name: '1. kolokvij', type: 'kolokvij', date: '2026-12-01T17:30',
      notes: {
        file: '2. letnik (2026-27)/1. semester/Management proizvodnih in storitvenih procesov/Vaje/ZAPISKI.md',
        skip: ['plakat', 'predstavitev'],
      },
      decks: [
        { id: 'mpsp-yg', name: 'Vaje 1: YG - strategija in procesi', questions: strategija },
        { id: 'mpsp-rac', name: 'Računske: Littlov zakon in prispevek za kritje', calc: true, questions: rac },
        { id: 'mpsp-v2-teorija', name: 'Vaje 2: zmogljivost, ozko grlo, TPČ', questions: v2.teorija },
        { id: 'mpsp-v2-rac', name: 'Računske: Vaje 2 (ortodont, delavci, urgenca)', calc: true, questions: v2.rac },
        { id: 'mpsp-v3-teorija', name: 'Vaje 3-4: razmestitev in napovedovanje', questions: v3.teorija },
        { id: 'mpsp-v3-rac', name: 'Računske: linija, CRAFT, napovedi', calc: true, questions: v3.rac },
        { id: 'mpsp-maja', name: 'Dopolnilni zapiski: Vaje 4 (napovedovanje povpraševanja)', questions: maja.teorija },
        { id: 'mpsp-maja-rac', name: 'Računske: regresija in PANN (Vaje 4, dopolnilni zapiski)', calc: true, questions: maja.rac },
      ],
      flashcards: [{ id: 'mpsp-c-1', name: 'Pojmi z vaj', cards: kartice.map(([front, back]) => ({ front, back })) },
        { id: 'mpsp-c-2', name: 'Analiza procesa (Vaje 2)', cards: v2.kartice.map(([front, back]) => ({ front, back })) },
        { id: 'mpsp-c-3', name: 'Razmestitev in napovedovanje', cards: v3.kartice.map(([front, back]) => ({ front, back })) }],
    },
    { id: 'k2', name: '2. kolokvij', type: 'kolokvij' },
    { id: 'izpit', name: 'Izpit', type: 'izpit', decks: [{ id: 'mpsp-izpit', name: 'Vaje v slogu izpita', questions: izpit },
      { id: 'mpsp-v56-drevo', name: 'Vaje 5-6: drevo odločanja (dopolni drevo)', questions: v56.drevo },
      { id: 'mpsp-v56-teorija', name: 'Vaje 5-6: planiranje zmogljivosti, simulacija, lokacija (ni za kolokvij)', questions: v56.teorija },
      { id: 'mpsp-v56-rac', name: 'Računske: Vaje 5-6 (prelomne točke, zamenjava stroja, drevo, simulacija, lokacija)', calc: true, questions: v56.rac }, { id: 'mpsp-izpit3', name: 'Vaje v slogu izpita (2. sklop)', questions: require('./mpsp-stari2') }, { id: 'mpsp-izpit2', name: 'Vaje v slogu izpita: zaloge, MRP, planiranje, kakovost', questions: require('./mpsp-stari') }] },
  ],
};
