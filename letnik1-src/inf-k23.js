/* Informatika - 2. kolokvij (poslovni IS, poslovna inteligenca), 3. kolokvij (dodatek: elektronsko poslovanje) in izpit.
   Viri: EF Zapiski "Informatika zapiski" (pogl. 2, 5, 6), "Vprašanja in odgovori na izpitna vprašanja",
   "Primeri izpitov informatike in pogosta vprašanja" (izpiti 2015-2019, kolokviji 2019). */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const cards = (arr) => arr.map(([front, back]) => ({ front, back }));

const NOTES_K2 = `
## Kako poteka 2. kolokvij
- 25 točk (vsaj 10), snov druge štirih predavanj: **poslovni informacijski sistemi** in **programske rešitve za poslovno inteligenco**.
- Vprašanja s kolokvija 2019: pomen omejitev in želenega stanja (nakup računalnika), matični vs. transakcijski podatki, skica BI z integracijo, upravljalna zanka, podatkovno rudarjenje, razlika med rudarjenjem in OLAP.

## Poslovni informacijski sistemi
- **TPS (transakcijski IS)**: podpirajo osnovno dejavnost, zbirajo in hranijo podatke o ponavljajočih se transakcijah (naročila, računi, plače); preproste, vnaprej znane operacije → skoraj povsem avtomatizirani. Delujejo na **operativni ravni**, podatki morajo biti natančni.
- **BI (poslovnointeligenčni IS)**: podpirajo načrtovanje in nadzor; vhod so podatki iz TPS; primerjajo dejansko z načrtovanim; podatki so agregirani in ne nujno zelo natančni; rezultati se uporabljajo znotraj organizacije.
- **ERP** (celovita programska rešitev): en IS s **centralno bazo** za vse oddelke (nabava, proizvodnja, zaloge, finance, prodaja, kadri). Težave: zahtevna uvedba, vprašanje, ali prilagoditi rešitev procesom ali procese rešitvi. Nakup se splača, če rešitev pokrije vsaj **80 %** potreb.
- **Tipi podatkov v ERP**: organizacijski, **matični** (kupci, dobavitelji, material - o kom/čem) in **transakcijski** (posledica izvajanja procesa - količina, datum, znesek naročila).
- **Otoki informacij**: nepovezane baze in IS v eni organizaciji → podvajanje, informacije ne pretekajo. **Funkcijski silosi**: nihče nima pregleda nad celotnim procesom.
- Obseg povezovanja: individualno, skupinsko, organizacijsko, medorganizacijsko.

## Upravljanje in odločanje
- **Upravljalna zanka**: podsistem operativnih in podsistem upravljalnih procesov; izhodi enega so vhodi drugega (povratna zveza).
- **Problem** = razlika med želenim in dejanskim stanjem; upravljalno dejanje izbiramo ob upoštevanju **omejitev** sistema in okolja.
- **Simonov model**: spoznavanje → oblikovanje → izbira (optimalna ali zadovoljiva rešitev).
- **Vrste odgovorov IS**: posamezni podatki in vizualizacija (**opisna**), razlaga vzrokov (**razlagalna**), predvidevanja/kaj-če (**napovedna**), predlogi/optimizacija (**predpisovalna**).
- Strukturirani (optimizacija zalog), polstrukturirani in nestrukturirani problemi (izbira direktorja).

## Poslovna inteligenca
- BI = **kakovostni integrirani podatki** (podatkovno skladišče, transformacijski in integracijski sloj: poenotenje šifer in oblik, čiščenje) + **dostop in analiza**.
- **Podatkovno skladišče**: integrirano, po poslovnih področjih, zgodovinski podatki (časovna dimenzija), nespremenljivo, detajlni in sumarni podatki. **Področno skladišče** je podmnožica za en oddelek - najprimernejši vir za OLAP.
- **OLAP**: managerji si sami pripravijo poglede (vrtilna tabela). Operacije: **vrtanje v globino** (drill-down, podrobneje), **zvijanje** (roll-up, manj podrobno), **vrtenje** (pivot), **rezanje** (slice and dice, podkocka), **prikaz izjem**.
- **Podatkovno rudarjenje**: avtomatizirano iskanje **prej neznanih** vzorcev in pravil v velikih količinah podatkov. Razlika: OLAP je **uporabniško vodeno** (uporabnik ve, kaj išče), rudarjenje je **podatkovno vodeno**.
- Uporaba v CRM: segmentacija, profili kupcev, analiza nakupne košarice, navzkrižno trženje, obdržanje kupca, ciljanje reklam.
- **Nadzorna plošča**: ključni kazalniki, grafični, integrirani, pravočasni; možno vrtanje v globino.
`;

const NOTES_K3_DODATEK = `
## Elektronsko poslovanje
- **E-commerce** = nakup, prodaja in izmenjava prek omrežij; **e-business** = širše (tudi sodelovanje s partnerji, učenje na daljavo, sodelovanje zaposlenih).
- Razvoj: bančni EFT (SWIFT) → **RIP** (računalniška izmenjava podatkov, nadomesti papirne listine, sprva le za velika podjetja) → internet.
- Vrste: **B2B** (največ transakcij), **B2C**, **C2C** (eBay), **G2B** (javni razpisi, DDV), **G2C** (dohodnina), **G2G**.
- **E-tržnica**: veliko ponudnikov in povpraševalcev; vertikalne (panoga) in funkcijske. **Javna** - kupuje kdor koli; **zasebna** - za oskrbo lastnika (npr. Dell, skupna tržnica proizvajalcev avtomobilov, da zmanjšajo moč dobaviteljev).
- **E-trgovina** prodaja blago enega prodajalca; **e-blagovnica** združuje več neodvisnih e-trgovin; **e-oglasnik** je preprosta e-tržnica s fiksno ceno.
- **Modeli prihodkov**: prodaja, **prihodki od transakcij** (provizija glede na število in obseg transakcij), naročnina, oglaševanje (plača se prostor), **provizije za preusmerjanje** (plača se glede na število preusmerjenih obiskovalcev/nakupov).
- **VMI** (vendor managed inventory): zaloge pri trgovcu vodi dobavitelj; IS ob padcu pod mejo samodejno sproži naročilo.
- Oskrbovalna veriga: **preprosta** (izločanje posrednikov) in **skrajšana** (e-poslovanje med obstoječimi členi).
- Slabosti za podjetja: konflikti med prodajnimi kanali, visoke naložbe, ostrejša konkurenca. Za posameznike: prevare, ogrožena zasebnost.
`;

const NOTES_IZPIT = `
## Kako poteka izpit
- Pisni izpit, **75 točk** (+ do 25 točk z vaj), skupaj vsaj **55** za pozitivno oceno. Snov vseh predavanj in učbenik.
- Vprašanja so opisna, pogosto "na primeru": podatek vs. informacija, relacijska shema (M:N!), OLAP, zasebna e-tržnica, ERP, elektronski podpis, šifriranje, BPMN, virus/črv, uvajanje IS, oblak, tri vrste znanj, etična dilema, vprašanje o gostu na predavanjih.
- Skoraj vedno pride: ena naloga iz baz podatkov, razlika virus-hrošč-trojanski konj-črv, ključi in šifriranje, modeliranje procesov (BPMN).
`;

const pis = [
  Q('Kaj je značilno za transakcijske informacijske sisteme (TPS)?', [
    'Zbirajo in hranijo podatke o ponavljajočih se transakcijah in jih je mogoče skoraj povsem avtomatizirati',
    'Podpirajo načrtovanje in nadzor ter primerjajo dejansko stanje z načrtovanim',
    'Avtomatizirano iščejo prej neznane vzorce v velikih količinah podatkov',
    'Uporabljajo agregirane, ne nujno zelo natančne podatke za managerje'], 0,
    'TPS podpirajo osnovno dejavnost (naročila, računi, plače) na operativni ravni. Drugi in četrti odgovor opisujeta BI, tretji podatkovno rudarjenje.'),
  Q('Katera vrsta IS deluje na operativni ravni in zahteva zelo natančne informacije?', [
    'Transakcijski IS (TPS)',
    'Poslovnointeligenčni IS (BI)',
    'Direktorski IS',
    'Ekspertni sistem'], 0,
    'Vprašanje z izpita 2019. TPS mora biti natančen (računi, davki), BI dela z agregiranimi podatki.'),
  Q('Kaj je značilno za poslovnointeligenčne sisteme (BI)?', [
    'Vhod so podatki iz TPS, primerjajo dejansko z načrtovanim, podatki so agregirani',
    'Izvajajo vsakodnevne transakcije, kot je izstavitev računa kupcu',
    'Podatke vnašajo ročno operativni uporabniki ob vsakem poslovnem dogodku',
    'Rezultate uporabljajo predvsem zunanji uporabniki, npr. davčna uprava'], 0,
    'BI podpira načrtovanje in nadzor; rezultati (poročila) se uporabljajo znotraj organizacije. Izpitno vprašanje na primeru nakupovalnega središča.'),
  Q('Kaj je glavni cilj ERP?', [
    'Povezati vse oddelke in procese podjetja v en IS s centralno bazo podatkov',
    'Avtomatizirati samo računovodstvo in obračun plač v podjetju',
    'Omogočiti kupcem nakupovanje v spletni trgovini podjetja',
    'Zagotoviti analitikom večdimenzionalne poglede na podatke'], 0,
    'ERP pokriva načrtovanje, nabavo, proizvodnjo, zaloge, vzdrževanje, finance, prodajo, distribucijo in kadre.'),
  Q('Kdaj se podjetju praviloma splača kupiti programsko rešitev namesto lastnega razvoja?', [
    'Ko rešitev na trgu pokrije vsaj 80 % informacijskih potreb področja',
    'Ko ima podjetje več kot 50 zaposlenih v službi za informatiko',
    'Vedno, ker je nakup vedno cenejši od lastnega razvoja',
    'Ko so stroški licenc večji od stroškov uvajanja rešitve'], 0,
    'Stroški licenc so običajno manjši del v primerjavi s stroški uvajanja, prilagajanja in lastništva.'),
  Q('Kaj so matični podatki v ERP?', [
    'Podatki o entitetah, ki sodelujejo v procesih, npr. kupci, dobavitelji, material',
    'Podatki, ki beležijo poslovne dogodke, npr. količina in datum naročila',
    'Podatki o organizacijski strukturi, npr. oddelki in stroškovna mesta',
    'Zgodovinski podatki, preneseni v podatkovno skladišče'], 0,
    'Transakcijski podatki so posledica izvajanja procesa (naročilo: količina, datum, znesek). Kolokvijsko in izpitno vprašanje.'),
  Q('Pri nakupu: ime in naslov kupca ter količina in datum nakupa. Kateri so transakcijski podatki?', [
    'Količina in datum nakupa',
    'Ime in naslov kupca',
    'Ime kupca in datum nakupa',
    'Vsi navedeni podatki'], 0,
    'Ime in naslov sta matična podatka (o kom), količina in datum nastaneta s transakcijo.'),
  Q('Kaj so otoki informacij?', [
    'Nepovezani IS in baze v isti organizaciji, med katerimi informacije ne pretekajo',
    'Oddaljene poslovalnice, ki niso priključene na internet',
    'Področna podatkovna skladišča za posamezne oddelke',
    'Podatki, ki jih podjetje hrani pri ponudniku v oblaku'], 0,
    'Nastanejo zaradi funkcijskega pristopa k informatizaciji; posledica je podvajanje podatkov. Pri velikih podjetjih skoraj neizogibni.'),
  Q('Kaj se zgodi, če različne funkcije v podjetju nimajo istega IS?', [
    'Podatke vnašamo večkrat, več je napak in zamud, nihče nima pregleda nad procesom',
    'Vsaka funkcija dela hitreje, ker ni odvisna od drugih oddelkov',
    'Podjetje ima nižje stroške, ker ne potrebuje centralne baze',
    'Ni posledic, če ima vsak oddelek dovolj zmogljive računalnike'], 0,
    'Funkcijski silosi: zaradi kontrol ob prehodu med funkcijami nastajajo zamude in napake. Izpitno vprašanje.'),
  Q('Kaj je upravljalna zanka?', [
    'Povezava podsistema operativnih in upravljalnih procesov, kjer so izhodi enega vhodi drugega',
    'Zaporedje faz razvoja IS od načrtovanja do vzdrževanja',
    'Ponavljajoči se postopek varnostnega kopiranja podatkovne baze',
    'Povezava med podatkovnim skladiščem in orodji OLAP'], 0,
    'Imenuje se tudi povratna zveza. Kolokvijsko vprašanje 2019.'),
  Q('Kaj je problem v splošnem modelu upravljanja?', [
    'Razlika med želenim in dejanskim stanjem sistema',
    'Pomanjkanje podatkov v podatkovni bazi',
    'Napaka v programski opremi (hrošč)',
    'Omejitev, ki jo postavi okolje sistema'], 0,
    'Upravljanje je zmanjševanje te razlike z upravljalnimi dejanji ob upoštevanju omejitev (npr. pri nakupu računalnika: želeno stanje = zmogljiv računalnik, omejitev = proračun).'),
  Q('Kateri je pravilni vrstni red stopenj Simonovega modela odločanja?', [
    'Spoznavanje, oblikovanje, izbira',
    'Oblikovanje, spoznavanje, izbira',
    'Izbira, izvedba, nadzor',
    'Analiza, sinteza, izvedba'], 0,
    'Spoznavanje (zaznamo problem/priložnost), oblikovanje (iščemo alternative in posledice), izbira (optimalna ali zadovoljiva rešitev).'),
  Q('Katera aktivnost odgovarja na vprašanje "kaj bi bilo, če"?', [
    'Napovedna',
    'Opisna',
    'Razlagalna',
    'Predpisovalna'], 0,
    'Opisna: podatki, poročila, vizualizacija. Razlagalna: zakaj (statistika, rudarjenje). Napovedna: kaj-če. Predpisovalna: predlogi, optimizacija.'),
  Q('Kateri problem je nestrukturiran?', [
    'Izbira novega direktorja',
    'Optimizacija zalog',
    'Obračun plač',
    'Izračun anuitete'], 0,
    'Pri nestrukturiranih problemih je osnova pogosto intuicija, IT jih podpre le deloma. Optimizacija zalog je strukturiran problem.'),
];

const bi2 = [
  Q('Kaj je značilno za podatkovno skladišče?', [
    'Integrirano, zgodovinski podatki s časovno dimenzijo, podatkov ne posodabljamo',
    'Hrani le trenutne vrednosti podatkov, ki se nenehno posodabljajo',
    'Vsak oddelek ima svoje skladišče brez povezave z drugimi',
    'Vsebuje izključno nestrukturirane podatke, kot so slike in video'], 0,
    'Skladišče je organizirano po poslovnih področjih, vsebuje detajlne in sumarne podatke. Trenutne vrednosti so značilnost operativne baze.'),
  Q('Kaj počne transformacijski in integracijski sloj?', [
    'Čisti in poenoti podatke iz operativnih virov, npr. šifre izdelkov in oblike datumov',
    'Prikazuje managerjem ključne kazalnike na nadzorni plošči',
    'Šifrira podatke, preden jih pošljemo v oblak',
    'Briše zgodovinske podatke iz podatkovnega skladišča'], 0,
    'Operativni viri so pogosto neintegrirani (različni identifikatorji, opisi); pred analizo jih je treba integrirati in prečistiti.'),
  Q('Kaj je najprimernejši podatkovni vir za OLAP?', [
    'Področno podatkovno skladišče',
    'Operativna relacijska baza',
    'Zunanji nestrukturirani viri',
    'Varnostna kopija baze'], 0,
    'Področno skladišče vsebuje integrirane podatke v preprostem, večdimenzionalnem modelu, prilagojenem analitiku.'),
  Q('Katera operacija OLAP podatke prikaže manj podrobno?', [
    'Zvijanje (roll-up)',
    'Vrtanje v globino (drill-down)',
    'Rezanje (slice and dice)',
    'Vrtenje (pivot)'], 0,
    'Vrtanje v globino = podrobneje (npr. ko nas zanima, kako je nastal zanimiv sumarni podatek). Zvijanje je nasprotna operacija. Izpitno vprašanje.'),
  Q('Kaj je rezanje (slice and dice) pri OLAP?', [
    'Izbor podatkov - prikažemo podkocko',
    'Obračanje pogleda na podatke',
    'Prikaz vrednosti, ki odstopajo',
    'Izračun novih agregatnih podatkov'], 0,
    'Obračanje je vrtenje (pivot), opozarjanje na odstopanja je prikaz izjem.'),
  Q('Kaj je podatkovno rudarjenje?', [
    'Avtomatizirano iskanje prej neznanih vzorcev in pravil v velikih količinah podatkov',
    'Izdelava poljubnih pogledov na podatke v obliki vrtilnih tabel',
    'Prenos zgodovinskih podatkov iz operativne baze v skladišče',
    'Ročno pregledovanje poročil, ki jih pripravi služba za informatiko'], 0,
    'Rudarjenje omogoča odkrivanje znanja in napovedovanje. Poglede v vrtilnih tabelah omogoča OLAP.'),
  Q('Kakšna je razlika med OLAP in podatkovnim rudarjenjem?', [
    'OLAP je uporabniško vodeno (uporabnik ve, kaj išče), rudarjenje je podatkovno vodeno',
    'OLAP samodejno odkriva vzorce, rudarjenje pa le prikazuje vrtilne tabele',
    'OLAP deluje na operativni bazi, rudarjenje pa izključno na spletnih straneh',
    'Med njima ni razlike, rudarjenje je le novejše ime za OLAP'], 0,
    'Kolokvijsko vprašanje 2019. OLAP ne omogoča avtomatičnega odkrivanja znanja - to je namen rudarjenja.'),
  Q('Kaj je analiza nakupne košarice?', [
    'Iskanje povezav med prodajo izdelkov, npr. za razporeditev po policah',
    'Določanje skupin kupcev z enakimi vzorci obnašanja',
    'Spodbujanje obstoječih kupcev k novim nakupom',
    'Spremljanje poti obiskovalcev po spletnem mestu'], 0,
    'Segmentacija je drugi odgovor, aktiviranje kupca tretji, spletno rudarjenje četrti.'),
  Q('Kaj je navzkrižno trženje?', [
    'Spodbujanje nakupa drugih izdelkov istega podjetja',
    'Prodaja izdelkov konkurenta v lastni trgovini',
    'Hkratno oglaševanje na spletu in v tisku',
    'Izmenjava podatkov o kupcih med podjetji'], 0,
    'Je ena od uporab rudarjenja v analitičnem CRM; lahko nadomešča pridobivanje novih kupcev.'),
  Q('Katera dva ključna elementa sestavljata poslovnointeligenčni sistem?', [
    'Zagotavljanje kakovostnih integriranih podatkov ter dostop do podatkov in njihova analiza',
    'Transakcijska baza podatkov in uporabniški vmesnik za vnos podatkov',
    'Strojna oprema za skladiščenje in programska oprema za šifriranje',
    'Spletna trgovina in sistem za upravljanje odnosov s strankami'], 0,
    'Za prvi element se uporablja podatkovno skladiščenje (integracija), za drugi poročila, poizvedbe, OLAP, rudarjenje, nadzorne plošče.'),
  Q('Kaj je značilno za uporabo podatkov na analitični ravni?', [
    'Zanimajo nas tudi zgodovinski podatki, podvajanje ni problem, dostop je neenakomeren',
    'Podatki se pogosto posodabljajo in se ne smejo podvajati',
    'Zanesljivost mora biti zelo visoka, čas dostopa pa zelo kratek',
    'Način uporabe podatkov se le redko spreminja'], 0,
    'Drugi, tretji in četrti odgovor so značilnosti operativne ravni.'),
  Q('Kaj je nadzorna plošča (dashboard)?', [
    'Prikaz ključnih kazalnikov poslovanja z možnostjo vrtanja v globino',
    'Vmesnik skrbnika baze za dodeljevanje pravic uporabnikom',
    'Program za nadzor nad delovanjem strežnikov v oblaku',
    'Seznam vseh transakcij, ki so nastale v tekočem dnevu'], 0,
    'Kazalniki so grafično predstavljeni, integrirani iz različnih virov in pravočasni za ukrepanje.'),
];

const ep = [
  Q('Kakšna je razlika med e-commerce in e-business?', [
    'E-business je širši: poleg trgovanja vključuje sodelovanje s partnerji, učenje na daljavo, sodelovanje zaposlenih',
    'E-commerce je širši: vključuje e-business in še vse oblike elektronske komunikacije',
    'E-commerce velja le za B2B, e-business pa le za B2C poslovanje',
    'Med njima ni razlike, sta sinonima za spletno prodajo'], 0,
    'Elektronsko poslovanje = e-business + e-commerce.'),
  Q('Kaj je RIP (računalniška izmenjava podatkov)?', [
    'Izmenjava poslovnih listin v elektronski obliki namesto na papirju',
    'Spletna dražba, kjer se kupec in prodajalec pogajata za ceno',
    'Mednarodno omrežje za prenos finančnih sporočil med bankami',
    'Prenos govora prek omrežij, ki uporabljajo protokol IP'], 0,
    'RIP je najstarejša oblika B2B. Dokler je potekal po najetih vodih, je bil primeren le za velika podjetja. Omrežje za banke je SWIFT.'),
  Q('Katera vrsta e-poslovanja je oddaja napovedi za odmero dohodnine?', [
    'G2C',
    'G2B',
    'B2C',
    'C2C'], 0,
    'Država - državljan. Javni razpisi in napoved DDV sta G2B.'),
  Q('Katera vrsta e-poslovanja ima največji delež po količini transakcij?', [
    'B2B',
    'B2C',
    'C2C',
    'G2C'], 0,
    'B2B (med podjetji) je merjeno v količini transakcij najpomembnejši del e-poslovanja.'),
  Q('Kaj je zasebna e-tržnica?', [
    'E-tržnica za oskrbo podjetja, ki je njen lastnik; dobavitelji se potegujejo za njegova naročila',
    'E-tržnica, na kateri lahko kupuje in prodaja kdor koli brez omejitev',
    'Spletna trgovina, v kateri podjetje prodaja izključno svoje izdelke',
    'Spletno mesto, ki združuje več neodvisnih e-trgovin na enem mestu'], 0,
    'Npr. Dell; več konkurentov (proizvajalci avtomobilov) lahko ustanovi skupno zasebno tržnico, da zmanjšajo moč dobaviteljev. Pogosto izpitno vprašanje.'),
  Q('V čem se e-trgovina razlikuje od e-tržnice?', [
    'V e-trgovini prodaja en prodajalec, na e-tržnici se srečujejo različni prodajalci in kupci',
    'V e-trgovini se kupec s prodajalcem vedno pogaja za ceno, na e-tržnici nikoli',
    'E-trgovina je namenjena podjetjem, e-tržnica izključno potrošnikom',
    'E-trgovina deluje le v okviru zasebnega intraneta podjetja'], 0,
    'Lastnik e-tržnice prodajalcem zaračuna provizijo. E-blagovnica združuje več neodvisnih e-trgovin.'),
  Q('Kaj so prihodki od transakcij?', [
    'Provizija glede na število in obseg sklenjenih transakcij',
    'Plačilo za prostor, ki ga oglas zaseda na spletni strani',
    'Plačilo glede na število preusmerjenih obiskovalcev',
    'Vnaprej plačana naročnina za dostop do vsebin'], 0,
    'Npr. prodaja telefona na eBayu prinese eBayu provizijo; posrednik pri prodaji stanovanja dobi odstotek od vrednosti.'),
  Q('Kaj so provizije za preusmerjanje?', [
    'Plačilo glede na število obiskovalcev, ki jih stran preusmeri k oglaševalcu',
    'Plačilo za prostor na spletni strani, ne glede na odziv obiskovalcev',
    'Provizija glede na število in obseg sklenjenih transakcij',
    'Plačilo, ki ga kupec plača za hitrejšo dostavo blaga'], 0,
    'Npr. sponzorirana povezava iskalnika do turistične agencije. Pri oglaševanju se plača prostor, pri preusmerjanju provizija glede na preusmerjene obiskovalce ali nakupe.'),
  Q('Kaj je VMI (vendor managed inventory)?', [
    'Zaloge pri trgovcu vodi dobavitelj; IS ob padcu pod mejo samodejno sproži naročilo',
    'Trgovec sam vodi zaloge in ročno naroča blago pri več dobaviteljih',
    'Dobavitelj prodaja blago neposredno kupcem brez trgovca',
    'Trgovec hrani zaloge v skladišču dobavitelja do prodaje'], 0,
    'Izpitno vprašanje: namesto kupca za zaloge skrbi dobavitelj, s souporabo podatkov.'),
  Q('Kaj je skrajšana oskrbovalna veriga?', [
    'E-poslovanje med obstoječimi členi verige, ki pospeši pretok',
    'Veriga, iz katere so izločeni vsi posredniki',
    'Veriga, v kateri podjetje samo proizvaja vse sestavne dele',
    'Veriga z manj kot tremi dobavitelji'], 0,
    'Preprosta oskrbovalna veriga pomeni izločanje posrednikov; skrajšana pa e-poslovanje med obstoječimi členi. Kolokvijsko vprašanje.'),
  Q('Katera je slabost e-poslovanja za podjetja?', [
    'Konflikti med prodajnimi kanali',
    'Večja operativna učinkovitost',
    'Dostop do novih trgov',
    'Nižji stroški posrednikov'], 0,
    'Tudi visoke naložbe in ostrejša konkurenca. Kupec si npr. izdelek ogleda v fizični trgovini in ga naroči na spletu.'),
  Q('Kaj je skupinsko nakupovanje?', [
    'Storitev, ki združi kupce enakih izdelkov, da zaradi količine kupijo ceneje',
    'Storitev, ki preišče splet in poišče najnižjo ceno izdelka',
    'Model, v katerem kupec sam predlaga ceno, ki jo je pripravljen plačati',
    'Prilagajanje izdelka potrebam posameznega kupca'], 0,
    'Drugi odgovor je "poišči najboljšo ceno", tretji "imenuj svojo ceno", četrti množično prilagajanje.'),
];

const izpit = [
  Q('Kaj je glavna razlika med virusom in črvom?', [
    'Virus potrebuje gostiteljski program, črv se širi samostojno po omrežju',
    'Črv potrebuje gostiteljski program, virus se širi samostojno po omrežju',
    'Virus je programska napaka, črv pa namerno napisan škodljiv program',
    'Virus vedno uniči podatke, črv pa jih samo prebere'], 0,
    'Virus vrine kopijo sebe v druge programe; črv ne spreminja datotek, zasidra se v pomnilniku in se razmnožuje po omrežju. Najpomembnejša razlika za izpit.'),
  Q('Kaj je trojanski konj?', [
    'Uporaben program s skritimi ukazi, ki ob določenem pogoju povzročijo škodo',
    'Programska napaka, ki je osnovni problem računalniških sistemov',
    'Program, ki se razmnožuje po omrežju in zaseda pomnilnik',
    'Program, ki prikazuje neželene oglase med brskanjem'], 0,
    'Hrošč = programska napaka; črv se širi po omrežju; oglaševalski program prikazuje oglase.'),
  Q('Pri elektronskem podpisu - s katerim ključem pošiljatelj šifrira podpis?', [
    'S svojim zasebnim ključem',
    'S prejemnikovim javnim ključem',
    'S svojim javnim ključem',
    'S skupnim simetričnim ključem'], 0,
    'Prejemnik podpis preveri s pošiljateljevim javnim ključem. Besedilo pošiljatelj šifrira s prejemnikovim javnim ključem, prejemnik ga dešifrira s svojim zasebnim.'),
  Q('Kateri način uvajanja IS je najmanj tvegan?', [
    'Vzporedno delovanje starega in novega sistema',
    'Neposreden prehod s starega na nov sistem',
    'Uvedba brez urjenja uporabnikov',
    'Uvedba brez testiranja sistema'], 0,
    'Vzporedno je najvarnejše (ob težavah delamo po starem), a naporno in zahteva dvojno delo. Neposredni prehod je najhitrejši in najbolj tvegan. Izpitno vprašanje 2019.'),
  Q('Kdaj je primeren neposreden prehod na nov IS?', [
    'Ko vzporedno delo ni mogoče ali starega sistema sploh ni',
    'Vedno, kadar gre za kritičen sistem, kot je obračun plač',
    'Kadar želimo najmanjše možno tveganje pri uvajanju',
    'Kadar imajo uporabniki dovolj časa za dvojno delo'], 0,
    'Neposreden prehod je najlažji in najhitrejši, a najbolj tvegan.'),
  Q('Katera tri področja znanj potrebujejo zaposleni v službi za informatiko?', [
    'Znanja IT, managerska znanja ter znanja o poslovanju in organiziranosti',
    'Programiranje, omrežja in podatkovne baze',
    'Računovodstvo, trženje in kadrovanje',
    'Matematika, statistika in ekonomija'], 0,
    'Vsi potrebujejo vse tri, le deleži so različni: član uprave več managerskih, serviser več tehničnih. Pogosto izpitno vprašanje.'),
  Q('Katera znanja v največji meri potrebuje član uprave, zadolžen za informatiko?', [
    'Managerska ter poslovna znanja',
    'Predvsem tehnična znanja IT',
    'Samo znanja s področja omrežij',
    'Samo znanja programiranja'], 0,
    'Višje v hierarhiji je več managerskih znanj, nižje (skrbnik strežnikov, serviser) več tehničnih.'),
  Q('Kaj so viri etičnih problemov pri uporabi informacij?', [
    'Zasebnost, točnost, lastnina in dostop',
    'Hitrost, cena, zmogljivost in razpoložljivost',
    'Virusi, črvi, trojanski konji in hrošči',
    'Strojna, programska oprema, podatki in ljudje'], 0,
    'Primer: pravica do elektronske pozabe (zasebnost). Na izpitu: primer etične dileme v podjetju.'),
  Q('Kaj pomeni standard ISO/IEC 27001 za podjetje?', [
    'Upravljanje informacijske varnosti: neoporečnost, zaupnost, razpoložljivost',
    'Kakovost izdelkov in storitev v proizvodnji',
    'Okoljsko ravnanje in zmanjševanje izpustov',
    'Varnost in zdravje zaposlenih pri delu'], 0,
    'Izhaja iz standarda BS 7799; ISO/IEC 27002 vsebuje najboljše prakse.'),
  Q('Katera je slabost varnosti z gesli?', [
    'Geslo lahko pozabimo, uganemo ali ga kdo izve prek ramena ali zvijače',
    'Gesla ni mogoče spremeniti, ko je enkrat nastavljeno',
    'Geslo vedno pozna tudi skrbnik sistema',
    'Geslo deluje le v krajevnem omrežju'], 0,
    'Gesla so pogosto značilna za tip človeka, zato jih je mogoče uganiti; žrtev ga lahko zaupa tudi sama (socialni inženiring).'),
  Q('ERP kupimo in prilagodimo lastnim potrebam ali prilagodimo procese rešitvi. Kaj velja?', [
    'Prilagajanje rešitve je drago in tvegano, prilagoditev procesov prinese najboljšo prakso',
    'Prilagajanje rešitve je vedno cenejše, ker procesov ni treba spreminjati',
    'Prilagoditev procesov ni mogoča, ker so procesi določeni z zakonom',
    'Med pristopoma ni razlike v stroških ali tveganju'], 0,
    'Spreminjanje programov ustvarja nevarnost novih napak in otežuje nadgradnje; prilagoditev procesov referenčnemu modelu prinese "najboljšo prakso". Izpitno vprašanje.'),
  Q('Ali informatika podjetju sama po sebi zagotavlja konkurenčno prednost?', [
    'Ne, prednost ima le, če je IS bolj razvit in bolje izkoriščen kot pri tekmecih',
    'Da, vsaka naložba v IT samodejno poveča dobiček podjetja',
    'Ne, IT nima vpliva na konkurenčnost, ker jo imajo vsa podjetja',
    'Da, a le pri podjetjih, ki prodajajo prek spleta'], 0,
    'Z informatiko, ki je bolj razvita kot pri tekmecih, lahko podjetje ustvari prednost; hkrati IT v splošnem povečuje konkurenco (paradoks). Izpitno vprašanje 2019.'),
];

module.exports = {
  id: 'inf',
  parts: [
    {
      id: 'k2', name: '2. kolokvij', type: 'kolokvij',
      notesMd: NOTES_K2,
      decks: [
        { id: 'inf-k2-pis', name: 'Poslovni informacijski sistemi in odločanje', questions: pis },
        { id: 'inf-k2-bi2', name: 'Podatkovno skladišče, OLAP in rudarjenje', questions: bi2 },
      ],
      flashcards: [{ id: 'inf-c-k2', name: 'Pojmi (2. kolokvij)', cards: cards([
        ['TPS', 'Transakcijski IS: operativna raven, ponavljajoče transakcije, natančni podatki, avtomatizacija.'],
        ['BI', 'Načrtovanje in nadzor; vhod iz TPS; dejansko vs. načrtovano; agregirani podatki.'],
        ['ERP', 'En IS s centralno bazo za vse oddelke; nakup, če pokrije ≥ 80 % potreb.'],
        ['Matični / transakcijski podatki', 'O kom/čem (kupec, material) / posledica procesa (količina, datum).'],
        ['Otoki informacij', 'Nepovezani IS v eni organizaciji → podvajanje, informacije ne pretekajo.'],
        ['Upravljalna zanka', 'Operativni ↔ upravljalni podsistem; izhodi enega so vhodi drugega.'],
        ['Simonov model', 'Spoznavanje → oblikovanje → izbira.'],
        ['Vrste analitike', 'Opisna (kaj), razlagalna (zakaj), napovedna (kaj če), predpisovalna (kaj storiti).'],
        ['OLAP operacije', 'Vrtanje v globino, zvijanje, vrtenje, rezanje, prikaz izjem.'],
        ['OLAP vs. rudarjenje', 'OLAP uporabniško vodeno; rudarjenje podatkovno vodeno, odkriva neznane vzorce.'],
        ['Podatkovno skladišče', 'Integrirano, po področjih, zgodovinsko, nespremenljivo, detajlni in sumarni podatki.'],
      ]) }],
    },
    {
      id: 'k3',
      appendNotesMd: NOTES_K3_DODATEK,
      decks: [{ id: 'inf-k3-ep', name: 'Elektronsko poslovanje', questions: ep }],
    },
    {
      id: 'izpit', name: 'Izpit', type: 'izpit',
      notesMd: NOTES_IZPIT,
      prependNotesOf: ['k1', 'k2', 'k3'],
      decks: [{ id: 'inf-iz-pogosta', name: 'Pogosta izpitna vprašanja', questions: izpit }],
    },
  ],
};
