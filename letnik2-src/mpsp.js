/* Management proizvodnih in storitvenih procesov - vir: School/.../MPSP/Vaje/ZAPISKI.md (lasten primer spletne jezikovne šole Besedica)
   + vaje v slogu izpita (napisane na novo, pogoste izpitne teme). */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const PN = (q, drzi, explanation) => ({ q, options: ['Drži', 'Ne drži'], correct: drzi ? 0 : 1, explanation });

const strategija = [
  withId("q1f1m1pr", Q("Kje se začne oblikovanje izdelavne strategije (zaporedje: trg → strategija → procesi)?", ["Pri odločitvah o procesih in izbiri tehnologije","Pri finančnih ciljih in zahtevani donosnosti","Pri analizi virov in zmožnosti podjetja","Pri tržnih zahtevah in značilnostih storitve"], 3,
    "Zahteve trga ↔ značilnosti storitve → poslovna strategija ↔ odločitve o procesih.")),
  withId("q12ezmm2", Q("Kaj so dejavniki zmagovanja?", ["Lastnosti, ki morajo biti dovolj dobre, da je stranka sploh upoštevana","Stroški proizvodnje, ki jih morajo doseči vsi tekmeci v panogi","Slabosti podjetja, ki jih mora odpraviti v določenem roku","Konkurenčne prednosti, s katerimi podjetje pridobi stranke"], 3,
    "Npr. pri dostavi kosil: hitrost dostave; s tem podjetje pridobi stranke.")),
  withId("q1465vyc", Q("Kaj so dejavniki kvalificiranja?", ["Lastnosti, v katerih mora biti podjetje najboljše na trgu","Prednosti konkurentov, ki jih mora podjetje posnemati","Kvalifikacije zaposlenih, ki jih zahteva stranka","Lastnosti, ki morajo biti dovolj dobre za sploh upoštevanje"], 3,
    "Npr. pri dostavi kosil: cena in okus morata biti dovolj dobra, ni pa treba, da sta najboljša.")),
  withId('qj978gv', Q("Pekarna Zrno peče kruh iz domače moke po naročilu in ga do 7. ure zjutraj dostavi na dom, cena je višja kot v trgovini. Kakšna je njena poslovna strategija?", ["Stroškovno vodstvo z najnižjo ceno kruha na trgu","Diferenciacija s svežino in dostavo po višji ceni","Masovna proizvodnja standardnega kruha za trgovske verige","Posnemanje konkurence z enako ponudbo in enako ceno"], 1,
    "Pekarna se razlikuje po svežini in priročnosti (dostava zjutraj), za kar stranke plačajo več: diferenciacija.")),
  withId("qeyuism", Q("Pri spider diagramu je rob lestvice \"najugodneje za stranko\". Kaj pomeni ocena 5 pri ceni?", ["Visoka cena","Nizka cena","Povprečna cena","Cena ni pomembna"], 1,
    "Zato pri ceni in začetnem strošku 5 pomeni NIZKO.")),
  withId('q86627n', Q("Spletna izposoja počitniških kombijev: rezervacije in plačila potekajo samodejno, v poletni sezoni pa so vsi kombiji oddani. Kje je ozko grlo zmogljivosti v sezoni?", ["Spletna stran za rezervacije","Število kombijev","Plačilni sistem","Oglaševanje na družbenih omrežjih"], 1,
    "Digitalni del (rezervacije, plačila) dela za poljubno število strank, število kombijev pa je omejeno. Zmogljivost določa fizični vir.")),
  withId('qix3r1w', Q("Banka zapre poslovalnice in vse storitve preseli v mobilno aplikacijo. Kako se spremeni stik s stranko?", ["Postane bolj oseben, ker stranka aplikacijo uporablja pogosteje","Ostane enak, spremeni se le lokacija opravljanja storitve","Stika ni več, zato kakovost storitve ni več pomembna","Postane večinoma digitalen: proces je bolj standardiziran in cenejši"], 3,
    "Manj osebnega stika pomeni lažjo standardizacijo in nižje stroške, a manj prilagajanja posamezni stranki.")),
  withId("q1h8jizv", Q("Kaj je ključna razlika med izdelkom in storitvijo pri usklajevanju ponudbe in povpraševanja?", ["Storitev je vedno dražja in zato manj povpraševana","Izdelek je vedno standardiziran, storitev vedno po meri","Pri storitvi lahko zalogo kopičimo, pri izdelku ne","Izdelek lahko damo na zalogo, storitve ni mogoče skladiščiti"], 3,
    "Neporabljena ura storitve (npr. prost termin pri frizerju) je izgubljena; zmogljivost je treba prilagajati sproti ali usmerjati povpraševanje (cene, rezervacije).")),
  withId('qvwv11i', Q("Teniški klub ima ob delavnikih zvečer vsa igrišča zasedena, dopoldne pa so skoraj prazna. S katerim ukrepom klub usmerja povpraševanje?", ["Nižja cena dopoldanskih ur in višja cena večernih ur","Dopoldne zapre igrišča, da prihrani pri stroških","Okrepi oglaševanje večernih ur, ko je največ igralcev","Odpove rezervacije, igra se po vrstnem redu prihoda"], 0,
    "Različne cene premaknejo del igralcev na manj zasedene ure. Oglaševanje večernih ur bi gnečo še povečalo, brez rezervacij pa bi stranke čakale.")),
  withId('qrtdujv', Q("Kateri ukrep usklajevanja ponudbe in povpraševanja lahko uporabi tovarna koles, frizerski salon pa ne?", ["Rezervacijski sistem za termine","Proizvodnja na zalogo v mirnih mesecih","Višje cene ob konicah","Dodatni zaposleni v sezoni"], 1,
    "Izdelek lahko naredimo vnaprej in ga skladiščimo, striženja ne. Ostali trije ukrepi so mogoči pri obeh.")),
  withId('q1nuuy8y', Q("Podjetje dostavlja kosila s kolesi po mestu. Kaj je NEVARNOST iz okolja?", ["Več ljudi dela od doma in naroča kosilo","Mestna občina gradi nove kolesarske steze","Velika dostavna platforma vstopi na trg z nižjimi cenami","Podjetja iščejo dostavo hrane za sestanke"], 2,
    "Nov močan konkurent je nevarnost. Delo od doma, kolesarske steze in naročila podjetij so priložnosti.")),
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
  withId('q1hrcsmf', { q: "Restavracija ima 48 sedežev, ki so ob kosilu ves čas zasedeni; gost povprečno sedi 40 minut. Koliko gostov postreže v eni uri?",
      options: ["32","48","72","120"],
      correct: 2,
      explanation: "Littlov zakon: P = Z / PČ = 48 / (40/60 h) = 72 gostov na uro.",
      calc: true }),
  withId('qi8uqs4', { q: "Restavracija ima 48 sedežev, ki so ob kosilu ves čas zasedeni. Koliko časa sme gost povprečno ostati, da postreže 96 gostov na uro?",
      options: ["20 min","30 min","40 min","45 min"],
      correct: 1,
      explanation: "PČ = Z / P = 48 / 96 h = 0,5 h = 30 minut.",
      calc: true }),
  withId('qedsdbm', { q: "Veletrgovec ima v skladišču povprečno 3.000 kosov blaga, kos v skladišču ostane povprečno 12 dni. Koliko kosov proda na dan?",
      options: ["4","250","300","36.000"],
      correct: 1,
      explanation: "P = Z / PČ = 3.000 / 12 = 250 kosov na dan. 36.000 bi dobili, če bi zalogo pomnožili s časom.",
      calc: true }),
  withId('q6i2exq', { q: "Na tehničnem pregledu vozil v vrsti povprečno čaka 12 strank, prihaja jih 36 na uro, sam pregled traja 5 minut. Koliko časa stranka povprečno preživi na tehničnem pregledu?",
      options: ["5 min","17 min","20 min","25 min"],
      correct: 3,
      explanation: "Čakanje: PČ = Z / P = 12 / 36 h = 20 min; skupaj s pregledom 20 + 5 = 25 minut.",
      calc: true }),
  withId('q7w0pic', { q: "Proizvajalec sokov: prodaja 400.000 €, stroški prodanih proizvodov 340.000 €, finančni stroški 20.000 €, davek 20 %. Prodaja zraste za 10 % (stroški prodanih proizvodov sorazmerno). Kolikšen je nov dobiček po davku?",
      options: ["35.200 €","36.800 €","38.400 €","44.000 €"],
      correct: 1,
      explanation: "440.000 − 374.000 = 66.000; − 20.000 = 46.000 pred davkom; − 20 % = 36.800 € (prej 32.000 €). 35.200 je napaka, če bi dobiček po davku preprosto povečali za 10 %.",
      calc: true }),
  withId('qpio041', { q: "Proizvajalec sokov: 10 % več prodaje prinese 6.000 € več dobička iz poslovanja. Za koliko odstotkov bi morali znižati stroške prodanih proizvodov (340.000 €), da bi dosegli enak učinek?",
      options: ["Za 1,8 %","Za 6,0 %","Za 10 %","Za 17,6 %"],
      correct: 0,
      explanation: "6.000 / 340.000 = 1,8 %. Že majhen prihranek pri stroških ima enak učinek kot 10 % več prodaje, za katero potrebujemo tudi več povpraševanja in zmogljivosti.",
      calc: true }),
];
rac.forEach((q) => { q.calc = true; });

const kartice = [
  ['Izdelavna strategija', 'Zahteve trga ↔ značilnosti storitve → poslovna strategija ↔ odločitve o procesih.'],
  ['Dejavniki zmagovanja', 'Konkurenčne naloge, s katerimi pridobimo stranke (npr. hitrost dostave pri dostavi kosil).'],
  ['Dejavniki kvalificiranja', 'Morajo biti "dovolj dobri", ne najboljši (npr. sprejemljiva cena in okus pri dostavi kosil).'],
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
