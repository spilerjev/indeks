/* Management proizvodnih in storitvenih procesov - vir: School/.../MPSP/Vaje/ZAPISKI.md (lasten primer spletne jezikovne šole Besedica)
   + vaje v slogu izpita (napisane na novo, pogoste izpitne teme). */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const PN = (q, drzi, explanation) => ({ q, options: ['Drži', 'Ne drži'], correct: drzi ? 0 : 1, explanation });

const strategija = [
  withId("q1f1m1pr", Q("Kje se začne oblikovanje izdelavne strategije (zaporedje: trg → strategija → procesi)?", ["Pri odločitvah o procesih in izbiri tehnologije","Pri finančnih ciljih in zahtevani donosnosti","Pri analizi virov in zmožnosti podjetja","Pri tržnih zahtevah in značilnostih storitve"], 3,
    "Zahteve trga ↔ značilnosti storitve → poslovna strategija ↔ odločitve o procesih.")),
  withId("q12ezmm2", Q("Kaj so dejavniki zmagovanja?", ["Lastnosti, ki morajo biti dovolj dobre, da je stranka sploh upoštevana","Stroški proizvodnje, ki jih morajo doseči vsi tekmeci v panogi","Slabosti podjetja, ki jih mora odpraviti v določenem roku","Konkurenčne prednosti, s katerimi podjetje pridobi stranke"], 3,
    "Pri Besedici: časovna fleksibilnost in lokacijska priročnost (+ cena naročnine).")),
  withId("q1465vyc", Q("Kaj so dejavniki kvalificiranja?", ["Lastnosti, v katerih mora biti podjetje najboljše na trgu","Prednosti konkurentov, ki jih mora podjetje posnemati","Kvalifikacije zaposlenih, ki jih zahteva stranka","Lastnosti, ki morajo biti dovolj dobre za sploh upoštevanje"], 3,
    "Pri Besedici: dovolj govorne prakse in sprejemljiv začetni strošek (učni paket).")),
  withId("qj978gv", Q("Kakšna je poslovna strategija spletne jezikovne šole Besedica?", ["Stroškovno vodstvo z najnižjo ceno med vsemi jezikovnimi šolami","Nišna strategija za poklicne prevajalce in tolmače","Diferenciacija z vrhunskimi učitelji v živo po premijski ceni","Diferenciacija s priročnostjo in prilagodljivostjo po dostopni ceni"], 3,
    "Učenje kadarkoli in kjerkoli, prilagojeno posamezniku.")),
  withId("qeyuism", Q("Pri spider diagramu je rob lestvice \"najugodneje za stranko\". Kaj pomeni ocena 5 pri ceni?", ["Visoka cena","Nizka cena","Povprečna cena","Cena ni pomembna"], 1,
    "Zato pri ceni in začetnem strošku 5 pomeni NIZKO.")),
  withId("q86627n", Q("Kje je ozko grlo storitvene zmogljivosti pri Besedici?", ["Strežniki aplikacije","Tutorji v živo","Učilnice","Prepoznava govora v aplikaciji"], 1,
    "Aplikacija deluje za poljubno število strank, tutorji pa so omejeni (8 tutorjev, 2 izmeni po 5 h).")),
  withId("qix3r1w", Q("Kakšen je stik s stranko pri Besedici v primerjavi s klasično jezikovno šolo?", ["Visok in oseben, saj učitelj vodi vsako uro","Enak kot pri klasični šoli, le s sodobnejšo opremo","Stika ni, ker se stranka uči povsem sama","Večinoma digitalen - standardiziran in cenejši"], 3,
    "Klasična šola: oseben stik → prilagojen, dražji.")),
  withId("q1h8jizv", Q("Kaj je ključna razlika med izdelkom in storitvijo pri usklajevanju ponudbe in povpraševanja?", ["Storitev je vedno dražja in zato manj povpraševana","Izdelek je vedno standardiziran, storitev vedno po meri","Pri storitvi lahko zalogo kopičimo, pri izdelku ne","Izdelek lahko damo na zalogo, storitve ni mogoče skladiščiti"], 3,
    "Neporabljena ura tutorja je izgubljena; zmogljivost je treba prilagajati sproti ali usmerjati povpraševanje (cene, rezervacije).")),
  withId("qvwv11i", Q("Povpraševanje po urah s tutorji v živo presega ponudbo. Kateri ukrep je primeren?", ["Zmanjšati število tutorjev in dvigniti ceno","Okrepiti trženje, da se povpraševanje po urah s tutorji poveča še bolj","Povečati zalogo ur s tutorji za naslednja obdobja","Dražji termini ob konicah, skupinske ure, dodatni tutorji"], 3,
    "Ko povpraševanje presega ponudbo: dodatni (tudi honorarni) tutorji, dražji termini ob konicah, skupinske ure. Ko ponudba presega povpraševanje (prosti termini): manj tutorjev, popusti in marketinške akcije, dodatne storitve tutorjev.")),
  withId("qrtdujv", Q("Kateri ukrep usklajevanja velja za IZDELEK (učni paket), ne pa za storitev?", ["Rezervacijski sistem","Varnostna zaloga","Dinamične cene","Skupinske ure"], 1,
    "Učni paket lahko natisnemo vnaprej in ga damo na zalogo; ure s tutorjem ni mogoče shraniti.")),
  withId("q1nuuy8y", Q("Katera je nevarnost iz okolja za Besedico?", ["Delo v tujini, ki povečuje potrebo po jezikih","Boljša prepoznava govora v aplikacijah","Povpraševanje podjetij po izobraževanju zaposlenih","Brezplačne aplikacije in lahko posnemljiva digitalna storitev"], 3,
    "Tudi: vse boljše strojno prevajanje, GDPR (posnetki glasu, videoklici), premalo usposobljenih tutorjev, dražji papir za učne pakete.")),
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
  ['Izdelavna strategija', 'Zahteve trga ↔ značilnosti storitve → poslovna strategija ↔ odločitve o procesih.'],
  ['Dejavniki zmagovanja', 'Konkurenčne naloge, s katerimi pridobimo stranke (Besedica: časovna fleksibilnost, lokacijska priročnost).'],
  ['Dejavniki kvalificiranja', 'Morajo biti "dovolj dobri", ne najboljši (Besedica: govorna praksa, začetni strošek).'],
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
// Poslušaj: podcasti (Gemini Notebook, viri docs/podcast-src/mpsp-k1, lastni primeri); ista snov tudi za izpit
const AUDIO = [
  { id: 'mpsp-ep1', n: 1, title: 'Strategija, storitve in prispevek za kritje', sub: 'Večji dobiček brez novih strank', file: 'podcast/mpsp-k1/01-strategija-in-storitve.m4a', sec: 692 },
  { id: 'mpsp-ep2', n: 2, title: 'Analiza procesa: zmogljivost, ozko grlo, TPČ', sub: 'Zakaj več zaposlenih ne pohitri procesa', file: 'podcast/mpsp-k1/02-analiza-procesa.m4a', sec: 1236 },
  { id: 'mpsp-ep3', n: 3, title: 'Razmestitev: linija in CRAFT', sub: 'Uravnoteženje proizvodne linije in metoda CRAFT', file: 'podcast/mpsp-k1/03-razmestitev.m4a', sec: 933 },
  { id: 'mpsp-ep4', n: 4, title: 'Napovedovanje povpraševanja', sub: 'Zakaj je vsaka napoved povpraševanja napačna', file: 'podcast/mpsp-k1/04-napovedovanje.m4a', sec: 1159 },
];
const dod = require('./mpsp-k1-dodatno');   // dodatna vprašanja (27. 11. 2026), lastni primeri
dod.rac.forEach((q) => { q.calc = true; });

module.exports = {
  id: 'mpsp',
  parts: [
    {
      id: 'k1', name: '1. kolokvij', type: 'kolokvij', date: '2026-12-01T17:30', audio: AUDIO,
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
        { id: 'mpsp-k1-teorija-vec', name: 'Več vprašanj: strategija, procesi, razmestitev, napovedi', questions: dod.teorija },
        { id: 'mpsp-k1-rac-vec', name: 'Več računskih: Little, kritje, ozko grlo, linija, CRAFT, napovedi', calc: true, questions: dod.rac },
      ],
      flashcards: [{ id: 'mpsp-c-1', name: 'Ključni pojmi', cards: kartice.map(([front, back]) => ({ front, back })) },
        { id: 'mpsp-c-2', name: 'Analiza procesa', cards: v2.kartice.map(([front, back]) => ({ front, back })) },
        { id: 'mpsp-c-3', name: 'Razmestitev in napovedovanje', cards: v3.kartice.map(([front, back]) => ({ front, back })) }],
    },
    { id: 'k2', name: '2. kolokvij', type: 'kolokvij' },
    { id: 'izpit', name: 'Izpit', type: 'izpit', audio: AUDIO, decks: [{ id: 'mpsp-izpit', name: 'Vaje v slogu izpita', questions: izpit },
      { id: 'mpsp-v56-drevo', name: 'Drevo odločanja (dopolni drevo)', questions: v56.drevo },
      { id: 'mpsp-v56-teorija', name: 'Planiranje zmogljivosti, simulacija, lokacija (ni za kolokvij)', questions: v56.teorija },
      { id: 'mpsp-v56-rac', name: 'Računske: prelomne točke, zamenjava stroja, drevo, simulacija, lokacija', calc: true, questions: v56.rac }, { id: 'mpsp-izpit3', name: 'Vaje v slogu izpita (2. sklop)', questions: require('./mpsp-stari2') }, { id: 'mpsp-izpit2', name: 'Vaje v slogu izpita: zaloge, MRP, planiranje, kakovost', questions: require('./mpsp-stari') }] },
  ],
};
