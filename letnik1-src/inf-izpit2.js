/* Informatika - izpit: dodatna vprašanja iz zbirke "Vprašanja na izpitih" (EF Zapiski), izpitnega roka 2018
   in "Primeri vprašanj na kolokvijih" (2019). Teme, ki so že v k1-k3 in izpitnem kvizu, so izpuščene. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

const vprasanja = [
  Q('(Izpit) Katere so štiri značilnosti masovnih podatkov (big data)?', [
    'Količina, hitrost pretoka, raznolikost tipov, zanesljivost',
    'Količina, cena hrambe, zgoščenost, objektivnost podatkov',
    'Točnost, pravočasnost, popolnost in razumljivost podatkov',
    'Strukturiranost, normaliziranost, integriranost, ključ'], 0,
    'Masovni podatki: obseg (volume), hitrost (velocity), raznolikost (variety) in zanesljivost (veracity) vhodnih podatkov.'),
  Q('(Izpit 2018) Kaj je značilno za okolje "pajkove mreže"?', [
    'Nepovezane baze → podvajanje podatkov, zaklepanje, slabe informacije za vodstvo',
    'Ena centralna baza, do katere imajo vsi oddelki enak in hkraten dostop',
    'Podatki se samodejno sinhronizirajo med vsemi oddelki prek spleta',
    'Omrežje strežnikov, povezanih v obliki zvezde okoli podatkovnega skladišča'], 0,
    'Pri pajkovi mreži podatki ne krožijo: isti delavec je zapisan v več bazah, spremembo je treba vnesti povsod, prodaja ne ve, kdaj bo proizvodnja končala izdelek. Slabosti se najbolj kažejo na višjih ravneh odločanja.'),
  Q('(Izpit) Katera skupina poklicev v informacijski družbi vhodne informacije preoblikuje v izhodne za odločanje na strateški in taktični ravni?', [
    'Obdelovalci informacij (upravitelji, nadzorniki)',
    'Proizvajalci informacij (znanstveniki, svetovalci)',
    'Prenašalci informacij (učitelji, mediji)',
    'Poklici informacijske infrastrukture (Telekom, pošta)'], 0,
    'Proizvajalci ustvarjajo nove informacije, obdelovalci jih preoblikujejo za odločanje (jih je 3- do 4-krat več), prenašalci jih posredujejo, infrastruktura razvija in vzdržuje omrežja.'),
  Q('(Izpit) Kako se postopni prehod na nov IS primerja z ostalimi načini uvajanja?', [
    'Bolj tvegan in cenejši od vzporednega, manj tvegan in dražji od neposrednega',
    'Manj tvegan in dražji od vzporednega, bolj tvegan od neposrednega',
    'Najmanj tvegan in najdražji, ker tečeta stari in novi sistem hkrati',
    'Najhitrejši in najcenejši, uporabimo ga, kadar starega sistema ni'], 0,
    'Vzporedno: najmanj tvegano, najdražje (dvojno delo). Neposredno: najhitrejše, najbolj tvegano. Postopno (modul za modulom) in pilotno sta vmes.'),
  Q('(Izpit) Kaj je pilotno uvajanje IS?', [
    'Nov sistem najprej uporablja manjša skupina, ostali delajo po starem',
    'Stari in novi sistem vsi uporabljajo vzporedno, dokler novi ne deluje',
    'Moduli novega sistema se vključujejo eden za drugim v vseh enotah',
    'Stari sistem se ugasne in vsi takoj preidejo na novega'], 0,
    'Pilot: preizkus na manjši skupini/enoti. Tveganje je večje kot pri vzporednem in manjše kot pri neposrednem prehodu.'),
  Q('(Izpit) Kako IS pomagajo pri delu ljudi?', [
    'Z avtomatizacijo, formalizacijo postopkov in olajšanjem dela',
    'Z zamenjavo vseh odločitev managementa z algoritmi',
    'Z odpravo potrebe po podatkih in postopkih v organizaciji',
    'Z ločevanjem načrtovanja, izvajanja in nadzora v različne sisteme'], 0,
    'Avtomatizacija (sistem dela namesto človeka), formalizacija (enotne oblike dela in postopki), olajšanje (npr. urejevalnik besedil). IS povezujejo načrtovanje, izvajanje in nadzor.'),
  Q('(Izpit) Kako se vrednost informacije spreminja s časom?', [
    'Praviloma pada - prepozna informacija ni vredna skoraj nič',
    'Praviloma raste, ker se informacija sčasoma potrdi',
    'Ostaja enaka, odvisna je le od stroškov pridobitve',
    'Raste do zastaranja podatkov, nato hitro pade na nič'], 0,
    'Prej ko informacijo dobimo, več časa imamo za odločitev in izvedbo. Vrednost je odvisna tudi od kakovosti, zlasti popolnosti.'),
  Q('(Izpit) Kaj je zgoščenost kot lastnost kakovosti informacije?', [
    'Informacija je ravno prav kratka - le podrobnosti, ki jih uporabnik potrebuje',
    'Informacija vsebuje vse elemente, potrebne za odločitev, brez izjeme',
    'Informacija čim bolj nepristransko odraža dejansko stanje sistema',
    'Informacija je na voljo v najkrajšem času od trenutka zahteve'], 0,
    'Težnja k popolnosti lahko uporabnika zasiči s podrobnostmi; zgoščenost to uravnoteži. Ostali odgovori opisujejo popolnost, objektivnost in dostopnost.'),
  Q('(Izpit) Kako merimo TOČNOST informacije?', [
    'Z zanesljivostjo: točne informacije / vse informacije v poročilu',
    'S časom od spremembe v realnosti do zapisa v bazi podatkov',
    'S časom od zahteve po informaciji do njene pridobitve',
    'S številom podrobnosti, ki jih poročilo vsebuje za uporabnika'], 0,
    'Stopnja zanesljivosti = število točnih / število vseh informacij. Nezanesljivost je posledica napačnega delovanja IS. Drugi in tretji odgovor sta pravočasnost in dostopnost.'),
  Q('(Izpit) Kako delimo e-tržnice glede na usmerjenost?', [
    'Vertikalne (ena panoga) in funkcijske (ena poslovna funkcija)',
    'Javne (za vse kupce) in vertikalne (za eno državo)',
    'Horizontalne (B2C) in vertikalne (C2C)',
    'Nakupne (za kupce) in prodajne (za trgovce na drobno)'], 0,
    'Vertikalne so osredotočene na določeno industrijsko panogo, funkcijske na določeno funkcijo (npr. nabava pisarniškega materiala). Po dostopnosti pa ločimo javne in zasebne.'),
  Q('(Izpit) Zakaj več konkurenčnih podjetij (npr. izdelovalci avtomobilov v ZDA) ustanovi skupno zasebno e-tržnico?', [
    'Da s skupnim nastopom zmanjšajo pogajalsko moč dobaviteljev',
    'Da skupaj prodajajo avtomobile končnim kupcem po enotni ceni',
    'Da se izognejo plačilu provizij za preusmerjanje obiskovalcev',
    'Da delijo stroške razvoja skupne e-trgovine za končne kupce'], 0,
    'Zasebna tržnica je nakupna: povabljeni dobavitelji se potegujejo za razpisane potrebe. Skupna tržnica kupcev okrepi njihov položaj nasproti dobaviteljem.'),
  Q('(Izpit) Katera operacija OLAP podatke prikaže PODROBNEJE?', [
    'Vrtanje v globino (drill-down)', 'Zvijanje navzgor (roll-up)', 'Rezanje in kockanje (slice and dice)', 'Vrtenje pogleda (pivot)'], 0,
    'Drill-down se "približa" podatkom (npr. od leta k mesecem), roll-up se odmakne in podatke agregira, slice and dice izbere posamezne dimenzije.'),
  Q('(Izpit) Pri elektronskem podpisu - s katerim ključem pošiljatelj šifrira BESEDILO sporočila?', [
    'S prejemnikovim javnim ključem', 'S svojim zasebnim ključem', 'S prejemnikovim zasebnim ključem', 'S svojim javnim ključem'], 0,
    'Podpis pošiljatelj šifrira s svojim zasebnim ključem (prejemnik ga preveri s pošiljateljevim javnim), besedilo pa s prejemnikovim javnim ključem (dešifrira ga le prejemnikov zasebni).'),
  Q('(Izpit) Prejemnik je podpis uspešno dešifriral s pošiljateljevim javnim ključem in se ujema z besedilom. Kaj je s tem dokazano?', [
    'Istovetnost pošiljatelja in nespremenjenost sporočila',
    'Da sporočila na poti ni nihče prebral',
    'Da je prejemnikov zasebni ključ še vedno varen',
    'Da je pošiljatelj uporabil prejemnikov javni ključ'], 0,
    'Podpis je lahko ustvaril le lastnik zasebnega ključa, zato je pošiljatelj potrjen. Ker se podpis prilega besedilu, besedilo ni bilo spremenjeno. Zaupnost zagotavlja šifriranje s prejemnikovim javnim ključem.'),
  Q('(Izpit) Katera NI ena od treh osnovnih etičnih teorij?', [
    'Maksimirati dobiček organizacije', 'Maksimirati splošno dobro', 'Maksimirati osebno dobro', 'Pravilno obravnavati druge'], 0,
    'Splošno dobro (najbolje za družbo), osebno dobro (dolgoročno najkoristneje zase), pravilno obravnavanje drugih (kot želiš, da drugi obravnavajo tebe).'),
  Q('(Izpit) Kaj je informacijska zasebnost?', [
    'Nadzor nad zbiranjem, uporabo in razširjanjem osebnih podatkov',
    'Zasebnost pošte in telefonskih pogovorov posameznika',
    'Pravica posameznika, da ga drugi pustijo pri miru',
    'Zaščita informacij, ki so intelektualna lastnina'], 0,
    'Zasebnost ima več oblik: pravica, da te pustijo pri miru, informacijska, komunikacijska (pošta, telefon), telesna in prostorska. Intelektualna lastnina je drug vir etičnih problemov (lastnina).'),
  Q('(Izpit) Kaj velja za stroške nakupa celovite programske rešitve (ERP)?', [
    'Licence so manjši del stroškov v primerjavi z uvajanjem in prilagajanjem',
    'Licence predstavljajo večino skupnih stroškov lastništva rešitve',
    'Po nakupu licenc dodatnih stroškov uvajanja praviloma ni',
    'Stroški prilagajanja so nižji, če organizacija ne opredeli potreb'], 0,
    'Stroški uvajanja, prilagajanja in dograjevanja ter skupni stroški lastništva so praviloma precej višji od licenc - še posebej, če organizacija ne zna opredeliti potreb.'),
  Q('(Izpit) ERP ne pokrije vseh potreb podjetja. Katere so tri možnosti?', [
    'Prilagoditi ERP, prilagoditi procese ali se sprijazniti s problemi',
    'Kupiti drugi ERP, razviti lastnega ali zaposliti več informatikov',
    'Uvesti vzporedno, postopno ali pilotno delovanje sistema',
    'Prenesti IS v oblak, na lastni strežnik ali k zunanjemu izvajalcu'], 0,
    'Prilagajanje procesov najboljši praksi naj bo čim večje, sicer so stroški prilagajanja, vzdrževanja in dopolnjevanja preveliki.'),
  Q('(Izpit) Kaj je hrošč (bug)?', [
    'Programska napaka - osnovni problem računalniških sistemov',
    'Program, ki se razmnožuje po omrežju brez gostitelja',
    'Koristen program s skritimi škodljivimi ukazi',
    'Program, ki vrine kopijo sebe v druge programe'], 0,
    'Hrošč je napaka v programu. Črv se širi po omrežju brez gostitelja, trojanski konj skriva ukaze, virus se vrine v gostiteljski program.'),
  Q('(Izpit) Kaj je požarni zid?', [
    'Vozlišče med javnim omrežjem in zasebnim omrežjem podjetja',
    'Program, ki iz računalnika samodejno odstrani viruse in črve',
    'Fizična zaščita strežniške sobe pred ognjem in pred vlomom',
    'Postopek šifriranja podatkov z javnim in zasebnim ključem'], 0,
    'Požarni zid omejuje dostop do npr. lokalnega omrežja podjetja tako, da nadzoruje promet med javnim in zasebnim omrežjem.'),
  Q('(Izpit) Kakšen dostop do podatkovne baze je značilen za analitične uporabnike na višjih ravneh odločanja?', [
    'Ad hoc dostop - poizvedbe, za katere vnaprej ni pripravljenih rešitev',
    'Vnaprej pripravljene zaslonske maske za vnos podatkov',
    'Pripravljena tedenska poročila, ki se ne spreminjajo',
    'Neposredno ažuriranje trenutnih vrednosti v operativni bazi'], 0,
    'Operativni uporabniki delajo z vnaprej pripravljenimi rešitvami (dobro definirani postopki). Analitiki potrebujejo ad hoc dostop, naročanje na podatke in opozarjanje na odstopanja.'),
  Q('(Izpit) Katera je SLABOST računalništva v oblaku za uporabnika?', [
    'Brez (hitrega) interneta storitev ne deluje dobro',
    'Stroški so nepredvidljivi zaradi vzdrževanja in servisa',
    'Uporabnik mora kupiti zmogljivo strojno opremo',
    'Programske opreme ni mogoče posodabljati'], 0,
    'Prednosti oblaka so ravno predvidljivi stroški, sprotno posodabljanje in to, da zmogljiva strojna oprema ni potrebna. Slabosti: odvisnost od interneta, manj funkcij kot namizne različice, vprašanja varnosti in zasebnosti.'),
  Q('(Izpit) Kaj je funkcijska razdrobljenost (funkcijski silosi)?', [
    'Nihče nima pregleda nad celim procesom, prehodi povzročajo zamude',
    'Vsak oddelek ima popoln pregled nad celotnim procesom za kupca',
    'Podjetje ima en sam IS, ki tesno povezuje vse poslovne funkcije',
    'Poslovni procesi potekajo v celoti znotraj enega samega oddelka'], 0,
    'Proces za kupca teče skozi več oddelkov; kontrole ob prehodih podaljšajo izpolnitev naročila. Rešitev je procesni pogled, ki ga podpira ERP.'),
  Q('(Kolokvij 2019, izpit 2018) Kako se izbirni predmet in študenti (en predmet ima mnogo študentov, študent ima en izbirni predmet) zapišejo v relacijski shemi?', [
    'Šifra predmeta je tuji ključ v tabeli Študent',
    'Vpisna številka je tuji ključ v tabeli Predmet',
    'Potrebna je vmesna tabela s sestavljenim ključem',
    'Oba podatka zapišemo kot večvrednostni atribut'], 0,
    'Povezava 1 : N se zapiše s tujim ključem na strani "mnogo" (Študent). Vmesna tabela je potrebna le pri M : N, večvrednostni atributi v relacijskem modelu niso dovoljeni.'),
];

module.exports = {
  id: 'inf',
  parts: [{ id: 'izpit', decks: [{ id: 'inf-iz-vprasanja', name: 'Izpitna vprašanja (zbirka 2015-2019)', questions: vprasanja }] }],
};
