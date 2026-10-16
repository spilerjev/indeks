/* Management proizvodnih in storitvenih procesov - vir: School/.../MPSP/Vaje/ZAPISKI.md (Vaje 1, študija primera YG)
   + EF Zapiski: Vprašanja iz preteklih izpitov (samo trditve z nedvoumnim odgovorom). */
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
  PN('Kritična pot je najdaljša pot v mrežnem diagramu projekta in določa najkrajši možni čas izvedbe projekta.', true, 'Kritične aktivnosti določajo minimalni potreben čas.'),
  PN('Skrajšanje trajanja projekta dosežemo tako, da delujemo na kritične aktivnosti.', true, 'Skrajšanje nekritičnih aktivnosti projekta ne skrajša.'),
  PN('Alternativna korist pomeni, da odločitve o vzvodih hkrati pozitivno in negativno vplivajo na različne konkurenčne prednostne naloge.', true,
    'Ni mogoče hkrati doseči najboljših rezultatov pri vseh nalogah (kakovost, stroški, fleksibilnost, hitrost dobave).'),
  PN('Pri montažni liniji povečanje zmogljivosti zahteva podaljšanje cikla.', false, 'Cikel = čas med zaporednimi izdelki; večja dnevna proizvodnja pomeni KRAJŠI cikel.'),
  Q('Katera trditev o strateškem planiranju NI pravilna?', ['Poslovna strategija določa konkurenčno prednost', 'Poslovna strategija sprejema odločitve o vzvodih za doseganje dejavnikov zmagovanja', 'Strategija sestavljenega podjetja razporeja finančna sredstva po področjih', 'Strategija poslovne funkcije upošteva poslovno strategijo'], 1,
    'O vzvodih (resursi, procesi) odloča strategija POSLOVNE FUNKCIJE (izdelavne), ne poslovna strategija.'),
  Q('Kaj velja za kazalec KNN (kumulativna napaka v napovedi)? Izberi NAPAČNO trditev.', ['Je lahko pozitiven ali negativen', 'Pove smer odklanjanja napovedi', 'Je vsota napak v napovedi', 'Če je 0, se v napovedi nismo zmotili'], 3,
    'KNN je blizu 0 tudi, če so napovedi deloma previsoke, deloma prenizke - napake se izničijo. Velikost odstopanj meri povprečna absolutna napaka.'),
  Q('Če se pri neodvisnem povpraševanju povečajo stroški skladiščenja:', ['Se količina naročila poveča', 'Se količina naročila zmanjša, naročamo pogosteje', 'Se dobavni rok podaljša', 'Ni spremembe'], 1,
    'Dražje skladiščenje → manjše zaloge → manjša in pogostejša naročila.'),
  Q('Pri metodi drseče sredine majhen N pomeni:', ['Visoko stabilnost napovedi', 'Visoko odzivnost napovedi', 'Večjo natančnost vedno', 'Ni vpliva'], 1,
    'Čim večje je število obdobij, tem manjša odzivnost in večja stabilnost.'),
];

const rac = [
  Q('Littlov zakon: trening traja 0,5 h, trener ima naenkrat 1 stranko. Koliko strank na uro (pretok)?', ['2', '0,5', '4', '8'], 0,
    'Z = PČ · P → P = Z / PČ = 1 / 0,5 = 2 stranki/h.'),
  Q('Isti primer: izmena traja 4 h. Koliko strank obdela en trener v izmeni?', ['8', '4', '2', '16'], 0, '4 h · 2 = 8 strank.'),
  Q('6 trenerjev, 2 izmeni po 4 h (3 na izmeno). Koliko strank na dan?', ['48', '24', '96', '192'], 0, '8 strank na izmeno na trenerja · 6 trenerjev = 48.'),
  Q('Isti primer, a skupine po 4 stranke (Z = 4, PČ = 0,5 h). Koliko strank na dan?', ['192', '48', '96', '32'], 0,
    'P = 4 / 0,5 = 8 na uro → 32 na izmeno na trenerja → 192 na dan (4× več, a manj osebnega pristopa).'),
  Q('Prodaja 100.000, stroški prodanih 80.000, finančni stroški 6.000, davek 25 %. Prispevek za kritje (dobiček po davku)?', ['10.500', '14.000', '20.000', '15.000'], 0,
    '100.000 − 80.000 = 20.000; − 6.000 = 14.000; − 25 % davka (3.500) = 10.500.'),
  Q('Kateri ukrep najbolj poveča prispevek za kritje (izhodišče 10.500)?', ['Prodaja +50 % (18.000)', 'Finančni stroški −50 % (12.750)', 'Proizvodni stroški −20 % (22.500)', 'Vsi enako'], 2,
    'Stroški prodanih 64.000 → dobiček iz poslovanja 36.000 → 30.000 → po davku 22.500 (+114 %), brez dodatnega povpraševanja ali zmogljivosti.'),
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

module.exports = {
  id: 'mpsp',
  parts: [
    {
      id: 'k1', name: '1. kolokvij', type: 'kolokvij',
      notes: {
        file: '2. letnik (2026-27)/1. semester/Management proizvodnih in storitvenih procesov/Vaje/ZAPISKI.md',
        skip: ['plakat', 'predstavitev'],
      },
      decks: [
        { id: 'mpsp-yg', name: 'Vaje 1: YG - strategija in procesi', questions: strategija },
        { id: 'mpsp-rac', name: 'Računske: Littlov zakon in prispevek za kritje', calc: true, questions: rac },
      ],
      flashcards: [{ id: 'mpsp-c-1', name: 'Pojmi z vaj', cards: kartice.map(([front, back]) => ({ front, back })) }],
    },
    { id: 'k2', name: '2. kolokvij', type: 'kolokvij' },
    { id: 'izpit', name: 'Izpit', type: 'izpit', decks: [{ id: 'mpsp-izpit', name: 'Stara izpitna vprašanja', questions: izpit }] },
  ],
};
