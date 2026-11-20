/* MPSP - vaje v slogu izpita (izbirna vprašanja in trditve P/N): zaloge, MRP, planiranje, napovedovanje, kakovost, projekti.
   Vprašanja so napisana na novo (lastni primeri in formulacije); snov po Rusjan: MPSP in predavanjih. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const PN = (q, drzi, explanation) => ({ q, options: ['Drži', 'Ne drži'], correct: drzi ? 0 : 1, explanation });

module.exports = [
  Q('Hotel ima poleti prezasedene zmogljivosti, pozimi pa prazne sobe. Kateri ukrep izravnava POVPRAŠEVANJE (in ne prilagaja zmogljivosti)?', [
    'Nižje cene in akcijski paketi v zimskem času', 'Zaposlovanje študentov v poletni sezoni', 'Najem dodatnih sob pri drugem hotelu', 'Gradnja novega krila hotela'], 0,
    'Izravnavanje povpraševanja: diferenciacija cen, promocija, rezervacije in odlogi, ponudba z nasprotno sezono. Zaposlovanje, najem in gradnja prilagajajo zmogljivost.'),
  Q('Kaj je odločitvena spremenljivka pri modelu stalnega spremljanja zalog s stohastičnim povpraševanjem?', [
    'Točka ponovnega naročila; čas med naročili se spreminja', 'Čas med naročili, ki je stalen', 'Količina naročila, ki se vsakič spreminja', 'Varnostna zaloga, ki pokriva le čas med pregledi'], 0,
    'Pri stalnem spremljanju naročimo (stalno) količino, ko zaloga pade na točko ponovnega naročila. Stalen časovni presledek je značilnost modela periodičnega pregledovanja.'),
  Q('Kaj od naštetega sodi v izračun MRP?', [
    'Neto potrebe, velikost serije, časovni zamik in razčlenitev po kosovnici', 'Napoved povpraševanja in izravnava prodaje', 'Izračun EOQ in varnostne zaloge končnih izdelkov', 'Izbira lokacije in razmestitev'], 0,
    'MRP iz operativnega plana in kosovnice izračuna neto potrebe po komponentah, jih združi v serije in jih časovno zamakne (termini lansiranja).'),
  Q('Kaj NE velja za kumulativno napako napovedi (KNN)?', [
    'Vrednost 0 dokazuje, da napovedi niso imele nobene napake', 'Je lahko pozitivna ali negativna', 'Pove, ali smo sistematično napovedovali previsoko ali prenizko', 'Je vsota napak napovedi'], 0,
    'KNN = 0 pomeni le, da so se pozitivne in negativne napake izničile; velikost napak meri PANN.'),
  Q('Česa NE določamo pri agregatnem (mesečnem) planiranju proizvodnje?', [
    'Lokacije novega obrata', 'Obsega proizvodnje po mesecih', 'Števila zaposlenih v sezoni in izven nje', 'Uskladitve zmogljivosti s predvidenim povpraševanjem'], 0,
    'Lokacija je dolgoročna odločitev o fiksnih zmogljivostih.'),
  Q('Katera trditev o vidikih kakovosti NE drži?', [
    'Notranji vidik kakovosti temelji na subjektivni presoji kupca', 'Zunanji vidik kakovosti presoja kupec', 'Z notranjega vidika je izdelek kakovosten, ko ustreza specifikacijam', 'Pri notranji kakovosti želje kupcev prevedemo v specifikacije'], 0,
    'Subjektiven je zunanji vidik (kupec); notranji vidik je merljiva skladnost s specifikacijami.'),
  Q('Podjetje se je zelo povečalo in opaža naraščajoče stroške na enoto. Kaj je primer disekonomije obsega?', [
    'Birokratizacija in višji stroški distribucije', 'Porazdelitev fiksnih stroškov na več enot', 'Učinki učenja zaradi ponavljanja', 'Količinski popusti pri nabavi'], 0,
    'Disekonomije obsega: birokratizacija, stroški distribucije na večje razdalje, večja občutljivost na tveganja. Ostali odgovori so ekonomije obsega.'),
  Q('Dobavitelj omogoči digitalno naročanje, zato so stroški naročanja nižji. Kaj se zgodi z optimalno količino naročila (EOQ)?', [
    'EOQ se zmanjša, naročamo pogosteje', 'EOQ se poveča, naročamo redkeje', 'EOQ se ne spremeni', 'Poveča se le varnostna zaloga'], 0,
    'EOQ = √(2DS/H): nižji stroški naročanja S → manjša količina in pogostejša naročila.'),
  Q('Proizvajalec sladoleda zasleduje strategijo LOVLJENJA povpraševanja. Kaj stori poleti?', [
    'Zaposli dodatne (začasne) delavce', 'Uporablja zalogo, izdelano pozimi', 'Dvigne cene, da zmanjša povpraševanje', 'Uvede rezervacije in odloži dobave'], 0,
    'Pri lovljenju zmogljivost sproti prilagajamo povpraševanju (število zaposlenih, nadure). Zaloga iz mirnega obdobja je značilnost niveliranja.'),
  PN('Najdaljša pot v mrežnem diagramu določa najkrajši možni čas izvedbe projekta.', true, 'To je kritična pot.'),
  PN('Projekt najlažje skrajšamo s skrajšanjem nekritičnih aktivnosti.', false, 'Skrajšati moramo kritične aktivnosti; nekritične imajo časovno rezervo.'),
  PN('Kosovnica je ena od vrstic tabele operativnega plana (MPS).', false, 'Operativni plan vsebuje predvideno povpraševanje, sprejeta naročila, plan proizvodnje in razpoložljivo za dobavo; kosovnica je vhod v MRP.'),
  PN('Vhodno-izhodna kontrola določa vrstni red izvajanja nalogov na delovnem mestu.', false, 'Vrstni red določajo prednostna pravila; vhodno-izhodna kontrola usklajuje hitrost lansiranja z zmogljivostjo.'),
  PN('Če se pred delovnim mestom kopiči nedokončana proizvodnja, je treba upočasniti lansiranje nalogov.', true, 'Tako obvladujemo čakalne vrste in pretočne čase.'),
  PN('Kvalitativne metode napovedovanja so primernejše, ko nimamo zanesljivih preteklih podatkov ali je okolje turbulentno.', true, 'Kvantitativne metode predpostavljajo, da se vzorci iz preteklosti nadaljujejo.'),
  PN('Velik N pri drsečih sredinah pomeni stabilnejšo, a manj odzivno napoved.', true, 'Več obdobij bolj zgladi naključna nihanja, a se počasneje odzove na spremembe.'),
  PN('Povprečna absolutna napaka napovedi (PANN) ne more biti negativna.', true, 'Seštevamo absolutne vrednosti napak; smer napake pove KNN.'),
  PN('O vzvodih izdelavnega procesa odloča izdelavna strategija.', true, 'Poslovna strategija določa način konkuriranja (dejavnike zmagovanja in kvalificiranja), izdelavna pa vzvode.'),
  PN('Alternativna korist pomeni, da z eno odločitvijo izboljšamo vse konkurenčne prednostne naloge hkrati.', false, 'Odločitev o vzvodu na nekatere naloge vpliva pozitivno, na druge negativno.'),
  PN('Če skrajšamo cikel montažne linije, se njena planirana zmogljivost zmanjša.', false, 'Krajši cikel pomeni več izdelkov v enakem času, torej večjo zmogljivost.'),
  PN('Dejavniki zmagovanja so konkurenčne naloge, s katerimi pridobimo naročilo pred konkurenco.', true, 'Dejavniki kvalificiranja pa so pogoj, da kupec ponudnika sploh upošteva.'),
  PN('Če se stroški skladiščenja povečajo 4-krat, se EOQ zmanjša na polovico.', true, 'EOQ = √(2DS/H) je obratno sorazmerna s korenom stroškov skladiščenja.'),
  PN('Varnostno zalogo lahko zmanjšamo s krajšim in zanesljivejšim dobavnim rokom.', true, 'Varnostna zaloga pokriva negotovost povpraševanja in dobave v času dobavnega roka.'),
  PN('MRP računa s fiksnimi pretočnimi časi in ne upošteva omejitev zmogljivosti, zato plan preverimo s podrobnim planiranjem zmogljivosti (CRP).', true, 'CRP preveri obremenitev delovnih mest glede na plan lansiranja nalogov.'),
];
