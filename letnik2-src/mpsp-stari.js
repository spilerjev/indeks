/* MPSP - stari izpit (EF Zapiski: "Izpit", zbrane trditve z rešitvami študentov). Rešitve preverjene s snovjo;
   dvomljive (stroški zalog z administrativnimi stroški, sledenje povpraševanju pri fiksnih zmogljivostih) so izpuščene. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const PN = (q, drzi, explanation) => ({ q, options: ['Drži', 'Ne drži'], correct: drzi ? 0 : 1, explanation });

module.exports = [
  Q('(Izpit) S čim lahko podjetje zmanjšuje sezonska nihanja v prodaji (izravnavanje povpraševanja)?', [
    'Z diferenciacijo cen, promocijo ter odlogi dobave in rezervacijami',
    'S spreminjanjem števila zaposlenih in nadurnim delom',
    'S podizvajalci in začasnim najemom dodatne opreme',
    'Z gradnjo novega obrata in nakupom novih strojev'], 0,
    'Izravnavanje vpliva na povpraševanje; zaposleni, nadure in podizvajalci so načini prilagajanja zmogljivosti, novi obrati pa dolgoročna odločitev.'),
  Q('(Izpit) Kaj je značilno za model kontinuiranega spremljanja zalog pri stohastičnem povpraševanju?', [
    'Odločitvena spremenljivka je točka ponovnega naročila, čas med naročili se spreminja',
    'Naročamo v stalnih časovnih presledkih, količina naročila se spreminja',
    'Varnostna zaloga pokriva negotovost za ves čas med dvema pregledoma',
    'Količina naročila se spreminja, točka ponovnega naročila ni potrebna'], 0,
    'Q-model: stalna količina, naročimo ob TPN, zato se čas med naročili spreminja; varnostna zaloga pokriva negotovost v dobavnem roku. Stalni presledki so značilnost periodičnega modela.'),
  Q('(Izpit) Katere korake izvedemo pri postopku MRP?', [
    'Določanje neto potreb, velikosti serije, časovni zamik in eksplozija po kosovnici',
    'Napoved povpraševanja, izravnava prodaje, določanje zaposlenih in nadur',
    'Izračun EOQ, točke ponovnega naročila in varnostne zaloge za vse komponente',
    'Izbira lokacije, določanje zmogljivosti, uravnoteženje montažne linije'], 0,
    'MRP iz glavnega plana izdelkov s kosovnico izpelje bruto in neto potrebe komponent, velikosti serij in termine naročil.'),
  Q('(Izpit) Katera trditev o kazalcu KNN (kumulativna napaka napovedi) je NAPAČNA?', [
    'Če je vrednost kazalca 0, vemo, da se v napovedi nismo zmotili',
    'Vrednost kazalca je lahko pozitivna ali negativna',
    'Kazalec pove smer odklanjanja (napovedujemo preveč ali premalo)',
    'Izračunamo ga kot vsoto napak v napovedi za obdobje'], 0,
    'Pozitivne in negativne napake se izničijo - KNN = 0 lahko kljub velikim napakam. Velikost napak meri PANN.'),
  Q('(Izpit) Katera trditev o mesečnem (agregatnem) planiranju proizvodnje je NAPAČNA?', [
    'Določamo primerno lokacijo za izgradnjo novega proizvodnega obrata',
    'Usklajujemo zmogljivosti s predvidenim povpraševanjem na srednji rok',
    'Določamo obseg proizvodnje po mesecih na ravni družin proizvodov',
    'Določamo primerno število zaposlenih v sezoni in izven nje'], 0,
    'Lokacija in gradnja obrata sodita v dolgoročno planiranje fiksnih zmogljivosti.'),
  Q('(Izpit) Katera trditev o vidikih kakovosti je NAPAČNA?', [
    'Za notranji vidik kakovosti je značilna subjektivnost',
    'Pri notranji kakovosti želje kupcev pretvorimo v tehnični jezik proizvodnje',
    'Z notranjega vidika smo kakovostni, ko je izdelek narejen po specifikacijah',
    'Zunanji vidik kakovosti presoja kupec glede na svoja pričakovanja'], 0,
    'Notranji vidik (skladnost s specifikacijami) je objektiven in merljiv; subjektiven je zunanji vidik kupca.'),
  Q('(Izpit) Kateri so primeri disekonomij obsega?', [
    'Stroški distribucije, birokratizacija, občutljivost na tveganja',
    'Porazdelitev fiksnih stroškov na več enot in popusti pri nabavi',
    'Specializacija dela in učinki učenja v proizvodnji',
    'Nižji stroški na enoto zaradi boljše izkoriščenosti strojev'], 0,
    'Disekonomije obsega nastanejo, ko je obrat prevelik (koordinacija, birokracija, oddaljeni trgi, tveganje). Ostalo so ekonomije obsega.'),
  Q('(Izpit) Pri uravnavanju zalog z neodvisnim povpraševanjem se stroški skladiščenja povečajo. Kaj se zgodi?', [
    'Optimalna količina naročila se zmanjša, naročamo pogosteje',
    'Optimalna količina naročila se poveča, naročamo redkeje',
    'Optimalna količina se ne spremeni, poveča se varnostna zaloga',
    'Optimalna količina se zmanjša, naročamo redkeje'], 0,
    'EOQ = √(2DS/H): višji H → manjša serija → krajša perioda naročanja in večja frekvenca.'),
  Q('(Izpit) Kako pri strategiji lovljenja (chase) usklajujemo zmogljivost s sezonskim povpraševanjem?', [
    'S spreminjanjem števila zaposlenih', 'Z gradnjo zalog v mirnem obdobju', 'Z odlogi dobave in rezervacijami', 'Z diferenciacijo cen v sezoni'], 0,
    'Strategija lovljenja sproti prilagaja zmogljivost (zaposleni, nadure); izravnana strategija gradi zaloge, cene in rezervacije pa vplivajo na povpraševanje.'),
  PN('(Izpit) Kritična pot je najdaljša pot v mrežnem diagramu in določa najkrajši možni čas izvedbe projekta.', true, 'Zamik katerekoli kritične aktivnosti podaljša projekt.'),
  PN('(Izpit) Trajanje projekta lahko skrajšamo tako, da delujemo na kritične aktivnosti.', true, 'Skrajšanje nekritične aktivnosti projekta ne skrajša.'),
  PN('(Izpit) Kategorije za določitev operativnega plana so predvideno povpraševanje, razpoložljivo za dobavo, sprejeta naročila in kosovnica.', false, 'Namesto kosovnice je kategorija končna (planirana) zaloga; kosovnica se uporablja pri MRP.'),
  PN('(Izpit) Z vhodno-izhodno kontrolo poskrbimo za pravilen vrstni red izvajanja nalogov na delovnem mestu.', false, 'Vhodno-izhodna kontrola nadzira pretočne čase in zalogo nedokončane proizvodnje; vrstni red določajo prednostna pravila.'),
  PN('(Izpit) Pri vhodno-izhodni kontroli prevelika zaloga nedokončane proizvodnje narekuje zmanjšanje hitrosti lansiranja nalogov.', true, 'Manj lansiranja → manj čakajočih nalogov → krajši pretočni časi.'),
  PN('(Izpit) V turbulentnem okolju so kvantitativne metode napovedovanja primernejše od kvalitativnih.', false, 'Ravno obratno: v turbulentnem okolju preteklost slabo napoveduje prihodnost, zato so primernejše kvalitativne metode.'),
  PN('(Izpit) Majhen N pri metodi drseče sredine pomeni visoko odzivnost napovedi.', true, 'Manj obdobij v povprečju → hitrejši odziv na spremembe, a več šuma.'),
  PN('(Izpit) Povprečna absolutna napaka (PANN) pove, v katero smer napoved odstopa od dejanskega povpraševanja.', false, 'PANN meri velikost napak (absolutne vrednosti); smer pove kumulativna napaka (KNN).'),
  PN('(Izpit) Poslovna strategija sprejema odločitve o vzvodih (izdelavnega procesa) za doseganje dejavnikov zmagovanja.', false, 'O vzvodih odloča strategija poslovne (izdelavne) funkcije; poslovna strategija določa konkurenčno prednost.'),
  PN('(Izpit) Alternativna korist (trade-off) pomeni, da odločitev o vzvodu hkrati pozitivno in negativno vpliva na različne konkurenčne prednostne naloge.', true, 'Npr. večje zaloge izboljšajo hitrost dobave, a zvišajo stroške.'),
  PN('(Izpit) Pri montažni liniji povečanje planirane zmogljivosti zahteva podaljšanje cikla.', false, 'Cikel = razpoložljiv čas / planirana proizvodnja; večja zmogljivost → krajši cikel.'),
  PN('(Izpit) Dejavniki kvalificiranja so konkurenčne naloge, na podlagi katerih oblikujemo konkurenčno prednost.', false, 'Konkurenčno prednost gradimo z dejavniki zmagovanja; dejavniki kvalificiranja so pogoj za vstop na trg.'),
  PN('(Izpit) Če se stroški skladiščenja zmanjšajo za 4-krat, se serijska zaloga zmanjša za 2-krat.', false, 'EOQ = √(2DS/H): 4-krat nižji H → EOQ se poveča 2-krat, s tem tudi serijska zaloga.'),
  PN('(Izpit) S skrajšanjem dobavnega roka zmanjšamo serijsko zalogo.', false, 'Dobavni rok vpliva na točko ponovnega naročila in varnostno zalogo, ne na velikost serije (EOQ).'),
  PN('(Izpit) Podrobno planiranje zmogljivosti (CRP) ne upošteva omejitev zmogljivosti, ker uporablja fiksne pretočne čase.', true, 'CRP predpostavlja neomejeno zmogljivost (infinite loading) in pokaže preobremenitve.'),
];
