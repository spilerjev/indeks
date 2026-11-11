// Osnove statistike: težji napačni odgovori. Vsi popravki veljajo za vse kopije (kolokvij + izpit), zato 'vse'.
const V = (prefix, wrongs, pos, novo) => [prefix, wrongs, pos, novo, 'vse'];
module.exports = [
  V('Katera je tipična omejitev sekundarnih podatkov?', [
    'Visoki stroški in dolgotrajnost zbiranja',
    'Potreba po lastni anketni mreži in anketarjih',
    'Majhen vzorec, ki ne omogoča posploševanja'], 2,
    'Zastarelost in neustrezne definicije'),
  V('Sklepna statistična analiza se ukvarja z:', [
    'Opisovanjem parametrov celotne populacije',
    'Grafičnim prikazom frekvenčnih porazdelitev',
    'Urejanjem in tabeliranjem zbranih podatkov'], 1,
    'Posploševanjem na osnovi vzorčnih podatkov'),
  V('Kaj je konstruktivni register?', [
    'Register, ki ga vodi računalnik brez človeških posegov',
    'Register, ki samo evidentira že nastala dejstva o enotah',
    'Register, ki je dostopen le pooblaščenim institucijam'], 3,
    'Register, pri katerem enota z vpisom pridobi novo lastnost'),
  V('Katera razpredelnica ima enote opazovanja v vrsticah', [
    'Frekvenčna tabela',
    'Kontingenčna tabela',
    'Strukturna tabela'], 0, 'Podatkovna matrika'),
  V('Kateri od navedenih opisuje STVARNO opredelitev', [
    'Opredelitev geografskega območja populacije',
    'Opredelitev časovnega obdobja opazovanja',
    'Opredelitev skupnega števila enot v populaciji'], 2,
    'Opredelitev lastnosti, ki jih mora imeti enota'),
  V('Kvantitativni podatki se delijo na:', [
    'Nominalne in ordinalne',
    'Primarne in sekundarne',
    'Absolutne in relativne'], 3, 'Diskretne in zvezne'),
  V('Kateri od načinov zbiranja podatkov je primeren za oceno stanja', [
    'Anketa na letnem vzorcu gospodinjstev',
    'Panelna anketa z mesečnim sledenjem enot',
    'Register z letnimi posodobitvami podatkov'], 1,
    'Popis vseh enot na točno določen datum'),
  V('Katera od trditev o vzorčni oceni parametra je pravilna?', [
    'Vzorčna ocena je vedno enaka pravi vrednosti parametra',
    'Vzorčna ocena je vedno natančnejša od rezultata popisa',
    'Vzorčna napaka nastane le zaradi napak pri vnosu'], 3,
    'Od prave vrednosti se razlikuje za vzorčno napako'),
  V('Katera trditev o neenakosti med stopnjo registrirane in anketne', [
    'Registrirana brezposelnost je vedno nižja od anketne',
    'Obe merita isti pojav, razlika je le vzorčna napaka',
    'Anketna brezposelnost vedno podcenjuje dejansko stanje'], 1,
    'Razlika nastane zaradi različnih definicij brezposelnih'),
  V('Makro statistični sistemi so:', [
    'Del poslovnih informacijskih sistemov podjetij',
    'Istovetni z računovodskimi sistemi podjetij',
    'Registri, ki jih vodijo posamezne občine'], 3,
    'Samostojni, od podjetij neodvisni sistemi'),
  V('V čem se SPRS razlikuje od APRS?', [
    'SPRS je javno dostopen, APRS pa le za statistične namene',
    'SPRS vsebuje le mikro podjetja, APRS pa vse poslovne subjekte',
    'SPRS ne vključuje podružnic tujih podjetij, APRS jih vključuje'], 0,
    'SPRS temelji na APRS, ažurira spremenljivke in ni javen'),
  V('Katera od navedenih trditev o CRP je pravilna?', [
    'CRP vsebuje podatke o poslovnih subjektih in podružnicah',
    'CRP vsebuje le podatke o davčnih zavezancih z dohodki',
    'CRP vsebuje podatke o delovno aktivnem prebivalstvu'], 2,
    'CRP vsebuje EMŠO in podatke o prebivalcih'),
  V('Stopnja delovne aktivnosti se izračuna kot:', [
    'Brezposelni / aktivno prebiv. × 100',
    'Aktivno prebiv. / skupno prebiv. × 100',
    'Zaposleni / aktivno prebiv. × 100'], 1,
    'Delovno aktivni / delovno sposobni × 100'),
  V('Outlier (ubežnik) je statistični pojem, ki označuje:', [
    'Vrednost, ki manjka v podatkovni matriki',
    'Vrednost, ki je enaka modusu porazdelitve',
    'Enoto, ki ne spada v opazovano populacijo'], 0,
    'Vrednost, ki močno odstopa od ostalih'),
  V('Katera trditev o APRS in europski uredbi', [
    'APRS v celoti izpolnjuje vse zahteve evropske uredbe',
    'APRS vsebuje le aktivne poslovne subjekte, ne pa neaktivnih',
    'APRS ne vsebuje podatkov o pravnoorganizacijski obliki'], 3,
    'APRS ne vključuje vseh spremenljivk iz uredbe'),
  V('Združevanje indeksnih vrst na NOVI osnovi', [
    'Vsak člen stare vrste pomnožimo s stičnim členom in delimo s 100',
    'Vsak člen nove vrste delimo z zadnjim členom stare in množimo s 100',
    'Vsak člen stare vrste delimo s prvim členom nove in množimo s 100'], 1,
    'Vsak člen stare vrste delimo s stičnim in množimo s prvim členom nove'),
  V('Katera trditev o spreminjanju indeksne osnove je pravilna?', [
    'Vsak člen pomnožimo z vrednostjo novega baznega leta',
    'Vsak člen delimo z vrednostjo starega baznega leta',
    'Od vsakega člena odštejemo vrednost novega baznega leta'], 2,
    'Vsak člen delimo z vrednostjo novega baznega leta'),
  V('Indeks je:', [
    'Imenovano število z mersko enoto',
    'Razlika dveh istovrstnih podatkov',
    'Razmerje dveh raznovrstnih podatkov'], 0, 'Neimenovano število za primerjavo'),
  V('Kateri od nastetih koeficientov je smiseln?', [
    'Promet podjetja A v 2023 / zaposleni v podjetju A v 2020',
    'Pridelek hmelja v Nemčiji / površina hmeljišč v Avstriji',
    'Število rojstev v Sloveniji / število prebivalcev EU'], 3,
    'Pridelek hmelja v Nemčiji / hmeljišča v Nemčiji v istem letu'),
  V('Florence Nightingale je v statistiki znana po tem', [
    'Gaussovo krivuljo normalne porazdelitve',
    'Korelacijski koeficient za merjenje povezanosti',
    'Metodo vzorčenja pri nadzoru kakovosti piva'], 3,
    'Grafični prikaz vzrokov umrljivosti vojakov'),
  V('Meta podatki so:', [
    'Surovi podatki pred obdelavo',
    'Agregirani podatki za javnost',
    'Podatki o procesu zbiranja'], 1, 'Podatki o podatkih'),
  V('SKD je:', [
    'Statistični kazalec dejavnosti',
    'Skupni koeficient demografije',
    'Seznam klasificiranih dobrin'], 2, 'Standardna klasifikacija dejavnosti'),
  V('PEST analiza je orodje za sistematično preučevanje dejavnikov:', [
    'Notranjega okolja (prednosti, slabosti)',
    'Panožnega okolja (pet konkurenčnih sil)',
    'Tržnega okolja (kupci, konkurenti)'], 0,
    'Zunanjega okolja (P, E, S, T)'),
  V('Katero od navedenih pojasnuje, kaj je »Para podatek«?', [
    'Podatek, ki opisuje vsebino, strukturo in kakovost zbirke podatkov',
    'Podatek, zbran vzporedno s primarnim za namen poznejšega preverjanja',
    'Sintetični kazalec, izračunan iz dveh ali več osnovnih spremenljivk'], 2,
    'Podatek o procesu zbiranja, ki pojasni nastanek podatkov'),
  V('Katera vrsta podatkov je primerna za izračun koeficienta', [
    'Nominalni in ordinalni podatki',
    'Samo primarni podatki iz anket',
    'Samo atributivni (opisni) podatki'], 3, 'Kvantitativni podatki'),
  V('Katera vrsta grafičnega prikaza je primerna za prikazovanje koeficientov?', [
    'Strukturni krog',
    'Starostna piramida',
    'Razsevni diagram'], 1, 'Pravokotniki (stolpci)'),
  V('Katera trditev o izvedenih demografskih kazalcih je pravilna?', [
    'Absolutni naravni prirastek je izvedeni relativni kazalec',
    'Stopnja naravnega prirastka sodi med absolutne kazalce',
    'Število umrlih v enem letu je izvedeni relativni kazalec'], 2,
    'Splošna stopnja mortalitete je izvedeni kazalec (koeficient)'),
  V('Katera je pravilna opredelitev staranja prebivalstva?', [
    'Porast absolutnega števila oseb, starejših od 65 let',
    'Padanje natalitete ob hkratnem naraščanju mortalitete',
    'Naraščanje povprečne pričakovane življenjske dobe'], 0,
    'Naraščanje deleža starih in padanje deleža mladih'),
  V('Katera od navedenih je pravilna opredelitev para podatka?', [
    'Podatek o podatku (vsebina, struktura, kakovost)',
    'Vzporedno zbrani podatek za namen preverjanja',
    'Sekundarni podatek iz javno dostopnega registra'], 3,
    'Opis procesa zbiranja primarnih podatkov'),
  V('Kaj pomeni bazni enostavni indeks It/0 = 120?', [
    'Vrednost je v baznem obdobju za 20 % višja kot v tekočem',
    'Vrednost se je v tekočem obdobju povečala za 120 %',
    'Vrednost je v tekočem obdobju za 20 % višja kot v prejšnjem'], 1,
    'Vrednost je v tekočem obdobju za 20 % višja kot v baznem'),
  V('Kaj je verižni indeks?', [
    'Indeks, ki vsako obdobje primerja z enim stalnim baznim obdobjem',
    'Indeks, ki primerja isti pojav v dveh krajih ob istem času',
    'Produkt vseh baznih indeksov v obravnavanem časovnem obdobju'], 3,
    'Indeks, ki vsako obdobje primerja z neposredno predhodnim'),
  V('Kaj je deflacioniranje?', [
    'Množenje nominalnih vrednosti s cenovnim indeksom in deljenje s 100',
    'Odštevanje stopnje inflacije od nominalnih vrednosti v odstotkih',
    'Deljenje realnih vrednosti s cenovnim indeksom in množenje s 100'], 0,
    'Deljenje nominalnih vrednosti s cenovnim indeksom in množenje s 100'),
  V('Kaj je prostorski (krajevni) indeks?', [
    'Indeks, ki primerja isti pojav v istem kraju v dveh obdobjih',
    'Indeks, ki primerja dva različna pojava v istem kraju',
    'Verižni indeks, izračunan za več geografskih območij'], 2,
    'Indeks, ki primerja isti pojav v dveh krajih v istem obdobju'),
  V('Tehnika tehtanja pri urejanju podatkov se uporablja za:', [
    'Izračun ponderiranih (agregatnih) indeksov cen',
    'Odkrivanje logičnih napak in ubežnikov v podatkih',
    'Nadomeščanje manjkajočih vrednosti spremenljivk'], 3,
    'Uskladitev strukture vzorca s strukturo populacije'),
  V('Kaj je Fisherjev idealni indeks?', [
    'Aritmetična sredina Laspeyresovega in Paaschejevega',
    'Harmonična sredina Laspeyresovega in Paaschejevega',
    'Razmerje Laspeyresovega in Paaschejevega × 100'], 1,
    'Geometrijska sredina Laspeyresovega in Paaschejevega'),
  V('Indeks strukturnih premikov se izračuna kot:', [
    'Indeks cen s stalno strukturo / indeks s spremenljivo strukturo × 100',
    'Laspeyresov indeks cen / Paaschejev indeks cen × 100',
    'Indeks vrednosti / indeks cen s spremenljivo strukturo × 100'], 2,
    'Indeks cen s spremenljivo strukturo / indeks s stalno strukturo × 100'),
  V('Katera institucija je na vrhu Evropskega statističnega sistema', [
    'Evropska centralna banka',
    'Evropska komisija (DG ECFIN)',
    'Statistični urad RS (SURS)'], 0, 'Eurostat'),
  V('Katera klasifikacija razvršča ekonomske dejavnosti v EU?', [
    'CPA (Classification of Products by Activity)',
    'ISCO (International Standard Classification of Occupations)',
    'PRODCOM (seznam industrijskih proizvodov EU)'], 2,
    'NACE (v Sloveniji SKD)'),
  V('Za kaj se uporablja klasifikacija HS (Harmonized System)?', [
    'Za razvrščanje dejavnosti podjetij v EU',
    'Za razvrščanje poklicev zaposlenih oseb',
    'Za razvrščanje enot po geografski legi'], 0,
    'Za razvrščanje blaga v zunanji trgovini'),
  V('Kaj je lokalna enota?', [
    'Enota, ki opravlja eno samo vrsto dejavnosti, ne glede na lokacijo',
    'Pravna oz. institucionalna enota, ki opravlja ekonomsko dejavnost',
    'Enota, ki je registrirana pri upravni enoti ali občini'], 2,
    'Podjetje ali del podjetja na določenem naslovu (lokaciji)'),
  V('Kaj je enota enovrstne dejavnosti (EED)?', [
    'Enota na eni sami geografski lokaciji',
    'Enota z enim samim lastnikom in sedežem',
    'Enota, ki ima status pravne osebe'], 1,
    'Enota z eno vrsto dejavnosti na več lokacijah'),
  V('Kaj so metapodatki?', [
    'Surovi statistični podatki pred obdelavo in čiščenjem',
    'Agregiran povzetek statističnih analiz za javnost',
    'Zaupni mikropodatki o posameznih statističnih enotah'], 3,
    'Podatki o podatkih (zbiranje, obdelava, objava)'),
  V('Katera je mednarodna klasifikacija dejavnosti (ZN), na kateri temelji NACE?', [
    'CPA (Classification of Products by Activity)',
    'CPC (Central Product Classification)',
    'ISCO (International Standard Classification of Occupations)'], 3,
    'ISIC (International Standard Industrial Classification)'),
  V('Podjetje je v statistiki opredeljeno kot:', [
    'Vsaka geografska lokacija, kjer poteka dejavnost',
    'Skupina enot z enako šifro dejavnosti SKD',
    'Del podjetja, ki opravlja eno vrsto dejavnosti'], 0,
    'Najmanjša organizacijska enota, ki je pravna oseba'),
  V('Enota enovrstne dejavnosti je podjetje ali del podjetja, ki:', [
    'Deluje na točno eni geografski lokaciji',
    'Ima status samostojne pravne osebe',
    'Opravlja več dejavnosti na eni lokaciji'], 2,
    'Na eni ali več lokacijah opravlja eno dejavnost'),
  V('Skupina podjetij je v statistiki opredeljena kot:', [
    'Podjetje z več kot eno lokalno enoto',
    'Del podjetja s homogeno dejavnostjo',
    'Podjetja z enako šifro dejavnosti SKD'], 1,
    'Povezava podjetij na pravni ali finančni osnovi'),
  V('Registri so:', [
    'Tiskane publikacije z letnimi statističnimi podatki',
    'Vzorčne ankete, ki jih SURS izvaja vsako leto',
    'Klasifikacijske sheme za razvrščanje dejavnosti'], 0,
    'Urejene zbirke identifikacijskih podatkov o enotah'),
  V('NACE je:', [
    'Mednarodna klasifikacija poklicev',
    'Slovenska klasifikacija proizvodov',
    'Nomenklatura industrijskih proizvodov'], 3, 'Klasifikacija dejavnosti v EU'),
  V('ISIC je:', [
    'Standardna klasifikacija dejavnosti EU',
    'Klasifikacija poklicev Mednarodne organizacije dela',
    'Nomenklatura industrijskih proizvodov EU'], 0,
    'Klasifikacija dejavnosti Združenih narodov'),
  V('V čem se nomenklatura razlikuje od klasifikacije?', [
    'Nomenklatura zajema le opisne spremenljivke, klasifikacija le številske',
    'Klasifikacija je mednarodna, nomenklatura pa le nacionalna',
    'Nomenklatura se uporablja izključno za razvrščanje poklicev'], 3,
    'Nomenklatura ni popolna - vsebuje le izrecno navedene enote'),
  V('Katera trditev o SKD in NACE je pravilna?', [
    'SKD in NACE sta enaki le do ravni oddelkov, SKD ima dodatne razrede',
    'NACE se v Sloveniji ne uporablja, ker ga v celoti nadomešča SKD',
    'SKD je nastala neodvisno od NACE in se z njo ne ujema'], 1,
    'Do ravni razredov sta enaki, SKD ima še podrazrede'),
  V('Katera trditev o kakovostnih standardih ESS o točnosti', [
    'Točnost meri, kako hitro so podatki objavljeni',
    'Točnost meri, kako enostaven je dostop do podatkov',
    'Točnost meri primerljivost podatkov med državami'], 2,
    'Točnost je skladnost ocene s pravo vrednostjo'),
  V('Načelo primerljivosti v ESS se nanaša na:', [
    'Hitrost objave statističnih podatkov',
    'Enostavnost dostopa do podatkov za javnost',
    'Strokovno neodvisnost statističnih uradov'], 1,
    'Časovno in geografsko primerljivost'),
  V('Skladen statistični sistem po standardih ESS pomeni', [
    'Podatki so vedno objavljeni v istem časovnem roku',
    'Podatki so zbrani z isto metodologijo v vseh državah',
    'Podatki so dostopni vsem uporabnikom brez omejitev'], 3,
    'Podatke je mogoče združevati v kompleksnejše rezultate'),
  V('Kateri od naslednjih izrazov opisuje razliko med klasifikacijo in nomenklaturo?', [
    'Nomenklatura je mednarodni sistem, klasifikacija pa nacionalni',
    'Klasifikacija velja za dejavnosti, nomenklatura pa za osebe',
    'Nomenklatura je hierarhična, klasifikacija pa nima ravni'], 0,
    'Klasifikacija razvrsti vse vrednosti, nomenklatura le navedene'),
  V('Kateri od navedenih je neposredni cilj Eurostata?', [
    'Neposredno izvajati statistična raziskovanja v vseh državah EU',
    'Prevzeti naloge nacionalnih statističnih uradov držav članic',
    'Izdajati zavezujoče standarde z zakonodajno močjo v EU'], 2,
    'Zagotavljati informacije za politike EU in povezovati nacionalne sisteme'),
  V('Katera od navedenih razlag o hierarhičnem načelu klasifikacij', [
    'Vsaka enota se uvrsti v natanko eno skupino klasifikacije',
    'Klasifikacije imajo vedno natanko štiri ravni razvrščanja',
    'Skupin nižjega reda ne smemo združevati v višje skupine'], 3,
    'Skupine nižjega reda se brez preostanka združijo v višje'),
  V('Katera dva dejavnika vplivata na skupno spremembo števila prebivalcev?', [
    'Rodnost in smrtnost',
    'Priseljevanje in odseljevanje',
    'Poroke in razveze'], 0, 'Naravno in selitveno gibanje'),
  V('SRDAP je kratica za:', [
    'Statistični register davčnih plačnikov',
    'Skupni register delovno aktivnih podjetij',
    'Statistični register dohodkov in pokojnin'], 2,
    'Statistični register delovno aktivnega prebivalstva'),
  V('Splošna stopnja mortalitete (m) ima v imenovalcu:', [
    'Število umrlih v enem letu',
    'Srednje število žensk v rodni dobi',
    'Število prebivalcev 1. januarja'], 1, 'Srednje število prebivalstva (P30.6)'),
  V('Kaj označuje P30.6 v demografskih formulah?', [
    'Število živorojenih do 30. junija',
    'Število prebivalcev na dan 1. januarja',
    'Število žensk v rodni dobi 30. junija'], 2,
    'Srednje število prebivalstva (stanje 30. 6.)'),
  V('Kateri od navedenih registrov je konstruktiven?', [
    'Register teritorialnih enot (RTE)',
    'Statistični register delovno aktivnega prebiv. (SRDAP)',
    'Centralni register prebivalstva (CRP)'], 3,
    'Sodni register (poslovni subjekti)'),
  V('Za izračun splošne stopnje priselitev je v imenovalcu:', [
    'Število priseljenih (I)',
    'Število odseljenih (E)',
    'Število prebivalcev 1. 1.'], 0, 'Srednje število prebivalstva'),
  V('Kaj meri skupni koeficient starostne odvisnosti?', [
    'Delež oseb, starih 0-14 in 65+, v celotnem prebivalstvu',
    'Število oseb, starih 65+, na 100 oseb, starih 0-14 let',
    'Število oseb, starih 65+, na 100 oseb, starih 15-64 let'], 3,
    'Število oseb, starih 0-14 in 65+, na 100 oseb, starih 15-64 let'),
  V('Splošna stopnja natalitete (n) ima v imenovalcu:', [
    'Srednje število žensk v rodni dobi',
    'Število živorojenih v enem letu',
    'Število prebivalcev 31. decembra'], 1, 'Srednje število prebivalstva'),
  V('Demografski prehod opisuje:', [
    'Prehod od nizke k visoki nataliteti in mortaliteti',
    'Prehod od visoke natalitete k višji mortaliteti',
    'Prehod iz podeželskega v urbano okolje bivanja'], 2,
    'Prehod od visoke k nizki nataliteti in mortaliteti'),
  V('Katera trditev o primerjavi stopnje rodnosti in stopnje fertilnosti', [
    'Stopnji imata enaka imenovalca, razlikujeta se v števcu',
    'Stopnja rodnosti ima v imenovalcu le ženske v rodni dobi',
    'Stopnji sta po definiciji enaki, razlika je le v imenu'], 0,
    'Fertilnost ima v imenovalcu ženske v rodni dobi, rodnost vse prebivalstvo'),
  V('Pri pozitivni stopnji rasti (r > 0), katera metoda', [
    'Linearna metoda vedno da višjo napoved',
    'Obe metodi vedno data enako napoved',
    'Odvisno od dolžine preteklega obdobja'], 3, 'Geometrijska metoda da višjo napoved'),
  V('Kaj je produktivnost dela, izražena v kosih?', [
    'Čas, ki ga delavec porabi za en kos',
    'Število delavcev, potrebnih za en kos',
    'Vrednost kosov na enoto stroškov dela'], 2,
    'Število kosov na delavca v obdobju'),
  V('Kaj je intenzivnost dela (čas na kos)?', [
    'Sinonim za produktivnost dela, izraženo v kosih',
    'Skupni delovni čas vseh delavcev v mesecu dni',
    'Število delavcev, potrebnih za en kos na uro'], 1,
    'Obratna vrednost produktivnosti: čas za en kos'),
  V('Katera trditev o Porterjevem modelu petih silnic je pravilna?', [
    'Preučuje politično, ekonomsko, socialno in tehnološko okolje podjetja',
    'Analizira prednosti, slabosti, priložnosti in nevarnosti podjetja',
    'Ocenjuje panogo glede na rast prodaje in tržni delež podjetja'], 0,
    'Ocenjuje privlačnost panoge (rivalstvo, substituti, moč kupcev in dobaviteljev, vstop)'),
  V('BDP je:', [
    'Vrednost končne potrošnje gospodinjstev in države v enem letu',
    'Vrednost proizvodnje rezidentov doma in v tujini v enem letu',
    'Vrednost prodaje vseh podjetij na ekonomskem ozemlju v letu'], 3,
    'Vrednost proizvodnje rezidenčnih enot na ekonomskem ozemlju v letu'),
  V('Totalna produktivnost meri:', [
    'Razmerje med proizvodnjo in porabljenim delom',
    'Razmerje med dodano vrednostjo in zaposlenimi',
    'Razmerje med proizvodnjo in porabljenim kapitalom'], 2,
    'Razmerje med proizvodnjo in vsemi faktorji'),
  V('Linearno ekstrapolacijo izberemo, kadar predpostavljamo', [
    'Gibala po enaki povprečni letni stopnji rasti kot doslej',
    'Ustalila na ravni zadnjega opazovanega podatka',
    'Gibala po enaki geometrijski vrsti kot doslej'], 1,
    'Gibala z enakim povprečnim absolutnim prirastkom'),
  V('Kaj je merjenje obsega ustvarjene proizvodnje (Q)', [
    'Bruto prihodek od prodaje brez DDV',
    'Bruto dodana vrednost z amortizacijo',
    'Skupni stroški dela in materiala'], 0,
    'Neto dodana vrednost'),
];
