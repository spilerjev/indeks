/* Management proizvodnih in storitvenih procesov - vir: School/.../MPSP/Vaje/ZAPISKI.md (Vaje 1, študija primera YG)
   + vaje v slogu izpita (napisane na novo, pogoste izpitne teme). */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const PN = (q, drzi, explanation) => ({ q, options: ['Drži', 'Ne drži'], correct: drzi ? 0 : 1, explanation });

const strategija = [
  withId('q1f1m1pr', Q('Kje se po sliki "izdelavna strategija" začne oblikovanje strategije?', ['Pri odločitvah o procesih', 'Pri zahtevah trga (stranke) in značilnostih storitve', 'Pri financah', 'Pri tehnologiji'], 1,
    'Zahteve trga ↔ značilnosti storitve → poslovna strategija ↔ odločitve o procesih.')),
  withId('q12ezmm2', Q('Kaj so dejavniki zmagovanja?', ['Lastnosti, ki morajo biti "dovolj dobre"', 'Konkurenčne prednostne naloge, s katerimi podjetje pridobi stranke', 'Stroški proizvodnje', 'Slabosti podjetja'], 1,
    'Pri YG: časovna fleksibilnost in lokacijska priročnost (+ cena naročnine).')),
  withId('q1465vyc', Q('Kaj so dejavniki kvalificiranja?', ['Morajo biti najboljši na trgu', 'Morajo biti "dovolj dobri", da stranka sploh razmisli o nakupu', 'Lastnosti konkurentov', 'Kvalifikacije zaposlenih'], 1,
    'Pri YG: dovolj dobra možnost za napredek in sprejemljiva začetna investicija.')),
  withId('qj978gv', Q('Kakšna je poslovna strategija YG (povezani fitnes)?', ['Stroškovno vodstvo z najnižjo ceno', 'Diferenciacija s priročnostjo in prilagodljivostjo po dostopni ceni', 'Nišna strategija za profesionalne športnike', 'Vertikalna integracija'], 1,
    'Vadba kadarkoli in kjerkoli, prilagojena posamezniku.')),
  withId('qeyuism', Q('Pri spider diagramu je rob lestvice "najugodneje za stranko". Kaj pomeni ocena 5 pri ceni?', ['Visoka cena', 'Nizka cena', 'Povprečna cena', 'Cena ni pomembna'], 1,
    'Zato pri ceni in investiciji 5 pomeni NIZKO.')),
  withId('q86627n', Q('Kje je ozko grlo zmogljivosti pri YG?', ['Strežniki', 'Trenerji v živo', 'Prostor', 'Naprave v dvorani'], 1,
    'Program teče za poljubno število strank, trenerji pa so omejeni (6 trenerjev, 2 izmeni).')),
  withId('qix3r1w', Q('Kakšen je stik s stranko pri YG v primerjavi z običajnim fitnesom?', ['Visok, osebni', 'Nizek, digitalen → standardizirano in ceneje', 'Enak', 'Ga ni'], 1,
    'Običajni fitnes: visok osebni stik → prilagojeno, dražje.')),
  withId('q1h8jizv', Q('Kaj je ključna razlika med izdelkom in storitvijo pri usklajevanju ponudbe in povpraševanja?', ['Storitev je dražja', 'Izdelek lahko daš na zalogo (blažilnik), storitev nastaja hkrati s porabo in je ni mogoče skladiščiti', 'Izdelek je vedno standardiziran', 'Ni razlike'], 1,
    'Neporabljena ura trenerja je izgubljena; zmogljivost je treba prilagajati sproti ali usmerjati povpraševanje (cene, rezervacije).')),
  withId('qvwv11i', Q('Povpraševanje po treningih v živo presega ponudbo. Kateri ukrep je primeren?', ['Zmanjšati število trenerjev', 'Različne cene za bolj in manj popularne ure, skupinski treningi, novi trenerji', 'Več marketinga', 'Povečati zalogo'], 1,
    'Ko ponudba presega povpraševanje (prosti termini): manj trenerjev, dodatne marketinške aktivnosti, komplementarne storitve.')),
  withId('qrtdujv', Q('Kateri ukrep usklajevanja velja za PROIZVODNJO opreme, ne pa za storitev?', ['Rezervacijski sistem', 'Varnostna zaloga', 'Dinamične cene', 'Skupinski treningi'], 1,
    'Izdelek lahko naredimo vnaprej; pri storitvi zaloge ni.')),
  withId('q1nuuy8y', Q('Katera je nevarnost iz okolja za YG?', ['Hibridno delo', 'Vračanje ljudi v fitnese po epidemiji in lahko posnemljiva digitalna konkurenca', 'Napredek UI', 'Staranje prebivalstva'], 1,
    'Tudi: GDPR (kamera doma), pomanjkanje trenerjev, motnje v dobavnih verigah, gospodarska negotovost.')),
];

const izpit = [
  withId('q1hlod77', PN('Projekt ne more biti končan prej, kot traja najdaljša pot v mrežnem diagramu.', true, 'Najdaljša pot je kritična pot; določa najkrajši možni čas izvedbe projekta.')),
  withId('q1ucpdze', PN('Če skrajšamo aktivnost, ki ima časovno rezervo, se trajanje projekta skrajša.', false, 'Nekritična aktivnost ima rezervo; trajanje določa kritična pot.')),
  withId('q9sapyo', PN('Odločitev za večjo avtomatizacijo lahko zniža stroške, a zmanjša fleksibilnost.', true, 'To je alternativna korist (trade-off) med konkurenčnimi prednostnimi nalogami.')),
  withId('q1o4s1gb', PN('Montažna linija mora za večjo planirano zmogljivost delovati s krajšim ciklom.', true, 'Cikel = razpoložljivi čas / planirana zmogljivost.')),
  withId('qp224u', Q('Katera trditev o ravneh strateškega planiranja NI pravilna?', ['O vzvodih izdelavnega procesa odloča strategija sestavljenega podjetja', 'Poslovna strategija določa, kako bo poslovna enota konkurirala', 'Strategija sestavljenega podjetja razporeja vire med poslovne enote', 'Strategija poslovne funkcije (npr. izdelavna) odloča o vzvodih svoje funkcije'], 0,
    'O vzvodih izdelavnega procesa odloča izdelavna (funkcijska) strategija.')),
  withId('q1miyojh', Q('Kumulativna napaka napovedi (KNN) je po petih mesecih enaka 0. Kaj to pomeni?', ['Pozitivne in negativne napake so se izničile; napovedi so bile lahko kljub temu netočne', 'Vse napovedi so bile popolnoma točne', 'Napovedi so bile sistematično previsoke', 'Tudi povprečna absolutna napaka je 0'], 0,
    'KNN meri pristranskost (smer), velikost napak pa PANN.')),
  withId('q1oam7qt', Q('Kaj se zgodi z optimalno količino naročila (EOQ), če se stroški skladiščenja enote povečajo?', ['Zmanjša se, naročamo pogosteje', 'Poveča se, naročamo redkeje', 'Ne spremeni se', 'Zmanjša se, naročamo redkeje'], 0,
    'EOQ = √(2DS/H): višji H → manjša količina naročila in pogostejša naročila.')),
  withId('q1rbntnj', Q('Pri drsečih sredinah izberemo majhno število obdobij N. Kaj dosežemo?', ['Napoved se hitro odziva na spremembe, a je manj stabilna', 'Napoved je zelo stabilna in se počasi odziva', 'Napoved je vedno natančnejša', 'Število obdobij na napoved ne vpliva'], 0,
    'Majhen N → visoka odzivnost, večji vpliv naključnih nihanj; velik N → stabilnost.')),
];

const rac = [
  withId('q1hrcsmf', { q: "Jezikovna šola Besedica: individualna ura s tutorjem traja 0,25 h, tutor ima naenkrat eno stranko. Kolikšen je pretok (stranke na uro) pri enem tutorju?",
      options: ["4","0,25","2","20"],
      correct: 0,
      explanation: "Littlov zakon: Z = PČ · P → P = Z / PČ = 1 / 0,25 = 4 stranke/h. 0,25 je pretočni čas, ne pretok.",
      calc: true }),
  withId('qi8uqs4', { q: "Besedica: ura s tutorjem traja 0,25 h, ena stranka naenkrat (pretok 4 stranke/h), izmena traja 5 h. Koliko strank obdela en tutor v eni izmeni?",
      options: ["20","5","4","40"],
      correct: 0,
      explanation: "5 h · 4 stranke/h = 20 strank na izmeno.",
      calc: true }),
  withId('qedsdbm', { q: "Besedica ima 8 tutorjev, ki delajo v 2 izmenah po 5 h (4 tutorji na izmeno, vsak dela eno izmeno). Koliko strank obdela šola v enem dnevu (individualne ure)?",
      options: ["160","80","320","40"],
      correct: 0,
      explanation: "En tutor obdela 20 strank na izmeno; vsak od 8 tutorjev dela eno izmeno → 20 · 8 = 160 strank na dan. 80 bi bilo samo za eno izmeno, 320 bi pomenilo, da vsak tutor dela obe izmeni.",
      calc: true }),
  withId('q6i2exq', { q: "Besedica uvede skupinske ure: 8 tutorjev, 2 izmeni po 5 h (vsak dela eno izmeno), skupina 3 strank (Z = 3, PČ = 0,25 h). Koliko strank obdela šola v enem dnevu?",
      options: ["160","320","960","480"],
      correct: 3,
      explanation: "P = Z / PČ = 3 / 0,25 = 12 strank/h → 12 · 5 = 60 na izmeno na tutorja → 60 · 8 = 480 na dan (3× več kot pri individualnih urah, a manj osebnega pristopa).",
      calc: true }),
  withId('q7w0pic', { q: "Spletna trgovina s športno opremo: prihodki od prodaje 240.000, stroški prodanega blaga 180.000, finančni stroški 12.000, davek 20 %. Kolikšen je dobiček po davku?",
      options: ["38.400","48.000","60.000","36.000"],
      correct: 0,
      explanation: "240.000 − 180.000 = 60.000 (kosmati dobiček); − 12.000 = 48.000 (pred davkom); − 20 % davka (9.600) = 38.400. Napaka 36.000: davek obračunan pred odštetjem finančnih stroškov.",
      calc: true }),
  withId('qpio041', { q: "Spletna trgovina: prihodki 240.000, stroški prodanega blaga 180.000, finančni stroški 12.000, davek 20 % (dobiček po davku 38.400). Kateri ukrep najbolj poveča dobiček po davku?",
      options: ["Prodaja +30 % (stroški prodanega blaga sorazmerno)","Finančni stroški −50 %","Cena +5 % pri enaki količini","Stroški prodanega blaga −15 %"],
      correct: 3,
      explanation: "Stroški prodanega blaga −15 %: 153.000 → 240.000 − 153.000 − 12.000 = 75.000 → po davku 60.000 (+56 %), brez dodatnega povpraševanja ali zmogljivosti. Prodaja +30 %: 312.000 − 234.000 − 12.000 = 66.000 → 52.800; cena +5 %: 252.000 − 180.000 − 12.000 = 60.000 → 48.000; finančni stroški −50 %: 54.000 → 43.200.",
      calc: true }),
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
        { id: 'mpsp-yg', name: 'Študija primera: strategija in procesi', questions: strategija },
        { id: 'mpsp-rac', name: 'Računske: Littlov zakon in prispevek za kritje', calc: true, questions: rac },
        { id: 'mpsp-v2-teorija', name: 'Analiza procesa: zmogljivost, ozko grlo, TPČ', questions: v2.teorija },
        { id: 'mpsp-v2-rac', name: 'Računske: zmogljivost, ozko grlo, TPČ, Littlov zakon', calc: true, questions: v2.rac },
        { id: 'mpsp-v3-teorija', name: 'Razmestitev in napovedovanje', questions: v3.teorija },
        { id: 'mpsp-v3-rac', name: 'Računske: linija, CRAFT, napovedi', calc: true, questions: v3.rac },
        { id: 'mpsp-maja', name: 'Napovedovanje povpraševanja: dopolnilo', questions: maja.teorija },
        { id: 'mpsp-maja-rac', name: 'Računske: regresija in PANN', calc: true, questions: maja.rac },
      ],
      flashcards: [{ id: 'mpsp-c-1', name: 'Ključni pojmi', cards: kartice.map(([front, back]) => ({ front, back })) },
        { id: 'mpsp-c-2', name: 'Analiza procesa', cards: v2.kartice.map(([front, back]) => ({ front, back })) },
        { id: 'mpsp-c-3', name: 'Razmestitev in napovedovanje', cards: v3.kartice.map(([front, back]) => ({ front, back })) }],
    },
    { id: 'k2', name: '2. kolokvij', type: 'kolokvij' },
    { id: 'izpit', name: 'Izpit', type: 'izpit', decks: [{ id: 'mpsp-izpit', name: 'Vaje v slogu izpita', questions: izpit },
      { id: 'mpsp-v56-drevo', name: 'Drevo odločanja (dopolni drevo)', questions: v56.drevo },
      { id: 'mpsp-v56-teorija', name: 'Planiranje zmogljivosti, simulacija, lokacija (ni za kolokvij)', questions: v56.teorija },
      { id: 'mpsp-v56-rac', name: 'Računske: prelomne točke, zamenjava stroja, drevo, simulacija, lokacija', calc: true, questions: v56.rac }, { id: 'mpsp-izpit3', name: 'Vaje v slogu izpita (2. sklop)', questions: require('./mpsp-stari2') }, { id: 'mpsp-izpit2', name: 'Vaje v slogu izpita: zaloge, MRP, planiranje, kakovost', questions: require('./mpsp-stari') }] },
  ],
};
