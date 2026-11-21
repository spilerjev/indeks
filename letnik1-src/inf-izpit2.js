/* Informatika - izpit: dodatna vprašanja v slogu izpita (pogoste izpitne teme), napisana na novo.
   Teme, ki so že v k1-k3 in izpitnem kvizu, so izpuščene. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

const vprasanja = [
  withId('qq3593z', Q('Po katerih štirih lastnostih prepoznamo masovne podatke (big data)?', [
    'Količina, hitrost pretoka, raznolikost tipov, zanesljivost',
    'Količina, cena hrambe, zgoščenost, objektivnost podatkov',
    'Točnost, pravočasnost, popolnost in razumljivost podatkov',
    'Strukturiranost, normaliziranost, integriranost, ključ'], 0,
    'Masovni podatki: obseg (volume), hitrost (velocity), raznolikost (variety) in zanesljivost (veracity) vhodnih podatkov.')),
  withId('q2e59a4', Q('Podjetje ima za vsak oddelek svojo, nepovezano bazo podatkov ("pajkova mreža"). Kakšne so posledice?', [
    'Nepovezane baze → podvajanje podatkov, zaklepanje, slabe informacije za vodstvo',
    'Ena centralna baza, do katere imajo vsi oddelki enak in hkraten dostop',
    'Podatki se samodejno sinhronizirajo med vsemi oddelki prek spleta',
    'Omrežje strežnikov, povezanih v obliki zvezde okoli podatkovnega skladišča'], 0,
    'Pri pajkovi mreži podatki ne krožijo: isti delavec je zapisan v več bazah, spremembo je treba vnesti povsod, prodaja ne ve, kdaj bo proizvodnja končala izdelek. Slabosti se najbolj kažejo na višjih ravneh odločanja.')),
  withId('qgty7k7', { q: "Vodja kontrolinga zbira poročila oddelkov in iz njih pripravi pregled, po katerem uprava odloča o strategiji. V katero skupino informacijskih poklicev sodi?",
      options: ["Med obdelovalce informacij","Med proizvajalce informacij, ki ustvarjajo novo znanje","Med prenašalce informacij, ki jih posredujejo naprej","Med poklice informacijske infrastrukture, ki skrbijo za omrežja"],
      correct: 0,
      explanation: "Obdelovalci (upravitelji, nadzorniki) prejete informacije preoblikujejo za odločanje. Proizvajalci ustvarjajo nove informacije, prenašalci jih posredujejo, infrastruktura razvija in vzdržuje omrežja." }),
  withId('q8x6cu0', Q('Podjetje nov IS uvaja modul za modulom (postopni prehod). Kako se ta način primerja z ostalimi?', [
    'Bolj tvegan in cenejši od vzporednega, manj tvegan in dražji od neposrednega',
    'Manj tvegan in dražji od vzporednega, bolj tvegan od neposrednega',
    'Najmanj tvegan in najdražji, ker tečeta stari in novi sistem hkrati',
    'Najhitrejši in najcenejši, uporabimo ga, kadar starega sistema ni'], 0,
    'Vzporedno: najmanj tvegano, najdražje (dvojno delo). Neposredno: najhitrejše, najbolj tvegano. Postopno (modul za modulom) in pilotno sta vmes.')),
  withId('qxtjh5m', Q('Kaj pomeni, da podjetje nov IS uvaja pilotno?', [
    'Nov sistem najprej uporablja manjša skupina, ostali delajo po starem',
    'Stari in novi sistem vsi uporabljajo vzporedno, dokler novi ne deluje',
    'Moduli novega sistema se vključujejo eden za drugim v vseh enotah',
    'Stari sistem se ugasne in vsi takoj preidejo na novega'], 0,
    'Pilot: preizkus na manjši skupini/enoti. Tveganje je večje kot pri vzporednem in manjše kot pri neposrednem prehodu.')),
  withId('q1pu4efz', Q('Na katere načine informacijski sistemi podpirajo delo ljudi?', [
    'Z avtomatizacijo, formalizacijo postopkov in olajšanjem dela',
    'Z zamenjavo vseh odločitev managementa z algoritmi',
    'Z odpravo potrebe po podatkih in postopkih v organizaciji',
    'Z ločevanjem načrtovanja, izvajanja in nadzora v različne sisteme'], 0,
    'Avtomatizacija (sistem dela namesto človeka), formalizacija (enotne oblike dela in postopki), olajšanje (npr. urejevalnik besedil). IS povezujejo načrtovanje, izvajanje in nadzor.')),
  withId('q1quu989', Q('Kaj se praviloma dogaja z vrednostjo informacije, ko čas teče?', [
    'Praviloma pada - prepozna informacija ni vredna skoraj nič',
    'Praviloma raste, ker se informacija sčasoma potrdi',
    'Ostaja enaka, odvisna je le od stroškov pridobitve',
    'Raste do zastaranja podatkov, nato hitro pade na nič'], 0,
    'Prej ko informacijo dobimo, več časa imamo za odločitev in izvedbo. Vrednost je odvisna tudi od kakovosti, zlasti popolnosti.')),
  withId('qtr0gkv', Q('Kaj pri kakovosti informacije pomeni zgoščenost?', [
    'Informacija je ravno prav kratka - le podrobnosti, ki jih uporabnik potrebuje',
    'Informacija vsebuje vse elemente, potrebne za odločitev, brez izjeme',
    'Informacija čim bolj nepristransko odraža dejansko stanje sistema',
    'Informacija je na voljo v najkrajšem času od trenutka zahteve'], 0,
    'Težnja k popolnosti lahko uporabnika zasiči s podrobnostmi; zgoščenost to uravnoteži. Ostali odgovori opisujejo popolnost, objektivnost in dostopnost.')),
  withId('q1ksio0', Q('S čim izrazimo TOČNOST informacij v poročilu?', [
    'Z zanesljivostjo: točne informacije / vse informacije v poročilu',
    'S časom od spremembe v realnosti do zapisa v bazi podatkov',
    'S časom od zahteve po informaciji do njene pridobitve',
    'S številom podrobnosti, ki jih poročilo vsebuje za uporabnika'], 0,
    'Stopnja zanesljivosti = število točnih / število vseh informacij. Nezanesljivost je posledica napačnega delovanja IS. Drugi in tretji odgovor sta pravočasnost in dostopnost.')),
  withId('qy5fyet', Q('Katera delitev e-tržnic izhaja iz njihove usmerjenosti?', [
    'Vertikalne (ena panoga) in funkcijske (ena poslovna funkcija)',
    'Javne (za vse kupce) in vertikalne (za eno državo)',
    'Horizontalne (B2C) in vertikalne (C2C)',
    'Nakupne (za kupce) in prodajne (za trgovce na drobno)'], 0,
    'Vertikalne so osredotočene na določeno industrijsko panogo, funkcijske na določeno funkcijo (npr. nabava pisarniškega materiala). Po dostopnosti pa ločimo javne in zasebne.')),
  withId('q1atdb77', { q: "Pet bolnišnic skupaj odpre zasebno e-tržnico, na kateri dobavitelji oddajajo ponudbe za medicinski material. Kaj s tem predvsem dosežejo?",
      options: ["Okrepijo svoj pogajalski položaj nasproti dobaviteljem","Pacientom prodajajo svoje storitve po enotni ceni","Zaslužijo s provizijami za preusmerjanje obiskovalcev","Odprejo tržnico, na kateri lahko kupuje kdor koli"],
      correct: 0,
      explanation: "Zasebna e-tržnica služi oskrbi lastnikov: povabljeni dobavitelji se potegujejo za razpisane potrebe, skupen nastop kupcev pa zmanjša moč dobaviteljev. Javna tržnica je odprta za vse kupce." }),
  withId('qk91cab', Q('Analitik želi prodajo namesto po letih videti po mesecih. Katero operacijo OLAP uporabi?', [
    'Vrtanje v globino (drill-down)', 'Zvijanje navzgor (roll-up)', 'Rezanje in kockanje (slice and dice)', 'Vrtenje pogleda (pivot)'], 0,
    'Drill-down se "približa" podatkom (npr. od leta k mesecem), roll-up se odmakne in podatke agregira, slice and dice izbere posamezne dimenzije.')),
  withId('q1nnb71g', Q('Ana pošlje Borisu elektronsko podpisano in zaupno sporočilo. S katerim ključem šifrira BESEDILO sporočila?', [
    'S prejemnikovim javnim ključem', 'S svojim zasebnim ključem', 'S prejemnikovim zasebnim ključem', 'S svojim javnim ključem'], 0,
    'Podpis pošiljatelj šifrira s svojim zasebnim ključem (prejemnik ga preveri s pošiljateljevim javnim), besedilo pa s prejemnikovim javnim ključem (dešifrira ga le prejemnikov zasebni).')),
  withId('q1u0rj5o', { q: "Podjetje prejme e-račun z elektronskim podpisom dobavitelja. Programska oprema podpis preveri z dobaviteljevim javnim ključem in prstni odtis (hash) se ujema z računom. Kaj je s tem zagotovljeno?",
      options: ["Da je račun poslal dobavitelj in da po podpisu ni bil spremenjen","Da računa na poti ni mogel prebrati nihče drug razen prejemnika","Da je dobavitelj račun šifriral z javnim ključem prejemnika","Da je dobavitelj račun lastnoročno podpisal na tablici"],
      correct: 0,
      explanation: "Podpis je lahko ustvaril le lastnik zasebnega ključa (istovetnost pošiljatelja), ujemanje prstnega odtisa pa pomeni nespremenjeno besedilo. Zaupnost bi zagotovilo šifriranje s prejemnikovim javnim ključem; digitaliziran ročni podpis ni elektronski podpis." }),
  withId('q1y6km48', Q('Katero načelo NE sodi med tri osnovne etične teorije?', [
    'Maksimirati dobiček organizacije', 'Maksimirati splošno dobro', 'Maksimirati osebno dobro', 'Pravilno obravnavati druge'], 0,
    'Splošno dobro (najbolje za družbo), osebno dobro (dolgoročno najkoristneje zase), pravilno obravnavanje drugih (kot želiš, da drugi obravnavajo tebe).')),
  withId('qzom199', Q('Katera oblika zasebnosti se nanaša na osebne podatke (informacijska zasebnost)?', [
    'Nadzor nad zbiranjem, uporabo in razširjanjem osebnih podatkov',
    'Zasebnost pošte in telefonskih pogovorov posameznika',
    'Pravica posameznika, da ga drugi pustijo pri miru',
    'Zaščita informacij, ki so intelektualna lastnina'], 0,
    'Zasebnost ima več oblik: pravica, da te pustijo pri miru, informacijska, komunikacijska (pošta, telefon), telesna in prostorska. Intelektualna lastnina je drug vir etičnih problemov (lastnina).')),
  withId('qpok8ou', Q('Podjetje kupuje celovito programsko rešitev (ERP). Kaj velja za stroške?', [
    'Licence so manjši del stroškov v primerjavi z uvajanjem in prilagajanjem',
    'Licence predstavljajo večino skupnih stroškov lastništva rešitve',
    'Po nakupu licenc dodatnih stroškov uvajanja praviloma ni',
    'Stroški prilagajanja so nižji, če organizacija ne opredeli potreb'], 0,
    'Stroški uvajanja, prilagajanja in dograjevanja ter skupni stroški lastništva so praviloma precej višji od licenc - še posebej, če organizacija ne zna opredeliti potreb.')),
  withId('qeg6tc6', { q: "Uvedeni ERP ne podpira posebnega načina obračuna provizij, ki ga uporablja prodajna služba. Katere so tri temeljne možnosti podjetja?",
      options: ["Dograditi ERP, spremeniti način obračuna po rešitvi ali sprejeti to omejitev","Kupiti zmogljivejši strežnik, dokupiti licence ali nadgraditi omrežje","Uvesti modeliranje BPMN, OLAP in podatkovno skladišče","Voditi provizije ročno, ukiniti prodajno službo ali vrniti licenco"],
      correct: 0,
      explanation: "Možnosti so: prilagoditi (dograditi) rešitev, prilagoditi proces rešitvi ali živeti s pomanjkljivostjo. Prilagajanje procesov najboljši praksi naj bo čim večje, sicer so stroški prilagajanja in vzdrževanja preveliki." }),
  withId('qz3f4lz', Q('Kaj v informatiki imenujemo hrošč (bug)?', [
    'Programska napaka - osnovni problem računalniških sistemov',
    'Program, ki se razmnožuje po omrežju brez gostitelja',
    'Koristen program s skritimi škodljivimi ukazi',
    'Program, ki vrine kopijo sebe v druge programe'], 0,
    'Hrošč je napaka v programu. Črv se širi po omrežju brez gostitelja, trojanski konj skriva ukaze, virus se vrine v gostiteljski program.')),
  withId('q10iin9w', Q('Kakšno vlogo ima požarni zid?', [
    'Vozlišče med javnim omrežjem in zasebnim omrežjem podjetja',
    'Program, ki iz računalnika samodejno odstrani viruse in črve',
    'Fizična zaščita strežniške sobe pred ognjem in pred vlomom',
    'Postopek šifriranja podatkov z javnim in zasebnim ključem'], 0,
    'Požarni zid omejuje dostop do npr. lokalnega omrežja podjetja tako, da nadzoruje promet med javnim in zasebnim omrežjem.')),
  withId('q1ufrzai', { q: "Finančna direktorica želi še danes izvedeti, kateri kupci so v zadnjem četrtletju plačevali z več kot 60-dnevno zamudo, takega poročila pa v sistemu ni. Kakšen dostop do podatkov potrebuje?",
      options: ["Ad hoc poizvedbe nad podatki","Vnosne zaslonske maske, kot jih imajo operativni uporabniki","Stalno mesečno poročilo, ki ga čez nekaj tednov pripravi informatik","Pravico do neposrednega popravljanja podatkov v transakcijski bazi"],
      correct: 0,
      explanation: "Operativni uporabniki delajo z vnaprej pripravljenimi rešitvami. Analitični uporabniki na višjih ravneh potrebujejo ad hoc dostop: poizvedbe, za katere vnaprej ni pripravljenih rešitev." }),
  withId('q8us9no', Q('Kaj je za uporabnika SLABOST računalništva v oblaku?', [
    'Brez (hitrega) interneta storitev ne deluje dobro',
    'Stroški so nepredvidljivi zaradi vzdrževanja in servisa',
    'Uporabnik mora kupiti zmogljivo strojno opremo',
    'Programske opreme ni mogoče posodabljati'], 0,
    'Prednosti oblaka so ravno predvidljivi stroški, sprotno posodabljanje in to, da zmogljiva strojna oprema ni potrebna. Slabosti: odvisnost od interneta, manj funkcij kot namizne različice, vprašanja varnosti in zasebnosti.')),
  withId('qqzlenv', Q('Kaj pomeni funkcijska razdrobljenost (funkcijski silosi) v podjetju?', [
    'Nihče nima pregleda nad celim procesom, prehodi povzročajo zamude',
    'Vsak oddelek ima popoln pregled nad celotnim procesom za kupca',
    'Podjetje ima en sam IS, ki tesno povezuje vse poslovne funkcije',
    'Poslovni procesi potekajo v celoti znotraj enega samega oddelka'], 0,
    'Proces za kupca teče skozi več oddelkov; kontrole ob prehodih podaljšajo izpolnitev naročila. Rešitev je procesni pogled, ki ga podpira ERP.')),
  withId('qkxwhaj', Q('V podjetju ima vsak oddelek mnogo zaposlenih, vsak zaposleni pa dela v natanko enem oddelku. Kako to razmerje zapišemo v relacijski shemi?', [
    'Šifra oddelka je tuji ključ v tabeli Zaposleni',
    'Šifra zaposlenega je tuji ključ v tabeli Oddelek',
    'Potrebna je vmesna tabela s sestavljenim ključem',
    'Oba podatka zapišemo kot večvrednostni atribut'], 0,
    'Povezava 1 : N se zapiše s tujim ključem na strani "mnogo" (Zaposleni). Vmesna tabela je potrebna le pri M : N, večvrednostni atributi v relacijskem modelu niso dovoljeni.')),
];

module.exports = {
  id: 'inf',
  parts: [{ id: 'izpit', decks: [{ id: 'inf-iz-vprasanja', name: 'Vaje v slogu izpita', questions: vprasanja }] }],
};
