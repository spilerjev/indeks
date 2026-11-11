/* Informatika (1. letnik, 2. semester) - 1. kolokvij (prva štiri predavanja).
   Viri: INFO_2026_Silabus (vsebina in termini), EF Zapiski "Informatika zapiski" (po učbeniku Osnove poslovne informatike),
   "Vprašanja in odgovori na izpitna vprašanja", "Primeri izpitov informatike in pogosta vprašanja". */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const cards = (arr) => arr.map(([front, back]) => ({ front, back }));

const NOTES_K1 = `
## Kako poteka predmet
- **Izpit 75 točk + vaje 25 točk**, za oceno 6 skupaj vsaj 55 točk.
- Sprotno: **3 kolokviji po 25 točk** (vsak vsaj 10 točk). 1. kolokvij: prva štiri predavanja; 2. kolokvij: druga štiri; 3. kolokvij: preostala.
- Vprašanja so opisna ("na primeru razloži", "nariši"). Kvizi v appu preverjajo razumevanje pojmov.

## 1 · Poslovna informatika in konkurenčnost
- **Tehnična informatika** razvija računalnike; **uporabna informatika** se ukvarja z učinkovito uporabo računalnikov v praksi. **Poslovna informatika** oblikuje, uvaja in izvaja poslovne IS.
- **Informacijska družba**: največ ljudi obdeluje podatke in opravlja informacijske storitve (težišče ni več proizvodnja materialnih dobrin).
- **Porterjevih 5 tekmovalnih sil**: grožnja novincev, pogajalska moč kupcev, pogajalska moč dobaviteljev, stopnja tekmovalnosti, pritisk nadomestnih izdelkov. IT v splošnem **povečuje konkurenco in zmanjšuje dobiček** (paradoks interneta).
- **Porterjeve strategije**: nižji stroški, razločevanje (diferenciacija), tržna usmeritev (segmentacija).
- **Vrednostna veriga**: temeljne aktivnosti (vhodna logistika, proizvodnja, izhodna logistika, trženje in prodaja, poprodajne storitve) + podporne. Verige vseh členov = **vrednostni sistem**.
- **Turbanov model**: tržni, tehnološki in družbeni pritiski → odzivi (strateški IS, osredotočenje na kupca/CRM, izboljševanje kakovosti, prenova procesov, e-poslovanje, množično prilagajanje).
### Podatek, informacija, kakovost
- **Podatek** = nosilec informacije (fizična predstavitev, nevtralno dejstvo). **Informacija** = sintaktično pravilno, razumljivo zaporedje znakov z **uporabno vrednostjo** za prejemnika.
- **Količina informacije** je večja, čim manj verjeten je dogodek; meri se v bitih.
- **Kakovost**: dostopnost, točnost, pravočasnost, popolnost, zgoščenost, ustreznost, razumljivost, objektivnost. **Dostopnost** = čas od zahteve do prejema; **pravočasnost** = čas od spremembe stanja do prejema informacije.
- **Vrednost informacije** = vrednost spremembe v obnašanju prejemnika − stroški pridobitve. S časom praviloma pada.
- **IS** = strojna oprema, programska oprema, podatki, postopki, ljudje. Integrirani enoti uporabljata **isto bazo podatkov** (prenos ni potreben).

## 2 · Informacijska tehnologija: strojna in programska oprema
- Procesna moč se podvoji približno vsakih **18 mesecev**, cena pa v 10 letih pade za velikostni red.
- **Osnovni model računalnika**: CPE + notranji pomnilnik (osrednji del); vhodne, izhodne enote in zunanji pomnilnik (zunanji del).
- **Notranji pomnilnik** (RAM): majhen, hiter, drag, ob izklopu izgubi vsebino. **Zunanji**: velik, počasen, poceni, trajen (disk, USB).
- **1 bajt = 8 bitov** = 256 različnih znakov. Digitalizacija slike: razdelimo jo na pike (piksle), barve RGB.
- **Programi**: uporabniški (Word, glavna knjiga), programska orodja (za gradnjo rešitev, npr. Access), **sistemski** (OS, gonilniki: Windows, Linux, Android).
- **Multiprogramiranje**: več programov si deli en procesor. **Multiprocesiranje**: več procesorjev.

## 3 · Podatkovne baze
- **PB** = strukturirana zbirka medsebojno povezanih podatkov na računalniškem nosilcu; **integrirana** (podatki za mnoge uporabnike, minimalno podvajanje).
- **Entiteta** = predmet ali dogodek; **atribut** = lastnost; **domena** = množica dopustnih vrednosti; **entitetni tip** = vzorec (ŠTUDENT).
- Atributi: sestavljeni (naslov), elementarni, izpeljani (starost iz datuma rojstva), večvrednostni (ocene).
- **Relacijski model**: dvodimenzionalne tabele; vrstica = entiteta, stolpec = atribut; vrednosti elementarne; vrstni red vrstic ni pomemben.
- **Glavni ključ** enolično loči vrstice (podčrtan); **sestavljeni ključ** iz več atributov. **Tuji ključ** poveže tabeli.
- Povezava **M:N** (študent - predmet, zaposleni - projekt) se razreši z **vmesno tabelo**, katere ključ sestavljata ključa obeh tabel.
- Operacije: izbor vrstic, izbor stolpcev, združevanje tabel (po skupnih atributih).
- **SUPB** (Oracle, MS SQL, MySQL, Access): tvorba, uporaba, celovitost, zaščita, varnostne kopije. Načrtovanje podpirajo orodja **CASE**.
- **Večdimenzionalni model** (za odločanje): kocka - stranice so **dimenzije** (izdelek, regija, čas), elementi so **mere** (vrednost prodaje); zvezdna shema.

## 4 · Elektronske komunikacije
- Komunikacijski sistem: terminalne naprave, povezave, vozlišča. Pot: preklapljanje ali usmerjanje paketov.
- **Model OSI (7 ravni)**: 1 fizična, 2 povezave (Ethernet), 3 omrežja (IP), 4 transportna, 5 seje, 6 predstavitvena, 7 aplikacijska (POP3, SMTP).
- **LAN** (krajevno, lastnik je lastnik medija, hitro, poceni, stikala) / **WAN** (prostrano, zakupljene povezave, hrbtenice). **Usmerjevalnik** povezuje omrežja in usmerja pakete IP.
- **Internet** = omrežje omrežij, protokol **TCP/IP**. **Svetovni splet (WWW)** je le ena storitev interneta: hiperbesedilni dokumenti v HTML, protokol HTTP, odjemalec/strežnik.
- **DNS** pretvarja domenska imena v naslove IP; hierarhičen in decentraliziran.
- **Intranet** = IS podjetja na TCP/IP; **ekstranet** = povezava intranetov več podjetij; **VPN** = šifrirana povezava prek javnega omrežja.
- **Trinivojska arhitektura**: predstavitvena raven, raven poslovnih pravil, podatkovna raven.
- **Računalništvo v oblaku**: viri kot storitev prek interneta - samopostrežba, hitra elastičnost, merjena storitev, univerzalen dostop; predvidljivi stroški, dostop od koder koli.
`;

const konk = [
  Q('S čim se ukvarja uporabna informatika?', [
    'S tem, kako računalnike čim učinkoviteje uporabiti v praksi',
    'Z razvojem in izdelavo računalnikov in njihovih sestavnih delov',
    'S programiranjem sistemske programske opreme in gonilnikov',
    'Z gradnjo telekomunikacijskih omrežij in hrbteničnih povezav'], 0,
    'Tehnična informatika (računalništvo) razvija računalnike, uporabna informatika preučuje njihovo smotrno uporabo; njen predmet so informacijski sistemi.'),
  Q('Kaj je poslovna informatika?', [
    'Disciplina, ki oblikuje, uvaja in izvaja poslovne IS v organizacijah',
    'Disciplina, ki razvija strojno opremo za potrebe poslovnih sistemov',
    'Del računovodstva, ki vodi poslovne knjige s pomočjo računalnika',
    'Veja managementa, ki se ukvarja izključno z vodenjem IT oddelka'], 0,
    'Poslovna informatika se ukvarja z oblikovanjem, uvajanjem in izvajanjem poslovnih informacijskih sistemov v organizacijah in poslovnem okolju.'),
  Q('Kaj je bistvena razlika med industrijsko in informacijsko družbo?', [
    'Težišče ni več proizvodnja materialnih dobrin, ampak obdelava podatkov',
    'V informacijski družbi narašča delež zaposlenih v kmetijstvu',
    'V informacijski družbi se delovni čas vseskozi skrajšuje',
    'Informacijska družba ne potrebuje telekomunikacijske infrastrukture'], 0,
    'V informacijski družbi se največ ljudi ukvarja z obdelavo podatkov in informacijskimi storitvami; delež kmetijstva in industrije pada.'),
  Q('Katera NI ena od Porterjevih petih tekmovalnih sil?', [
    'Državna regulativa',
    'Grožnja novincev',
    'Pritisk nadomestnih izdelkov',
    'Pogajalska moč kupcev'], 0,
    'Pet sil: grožnja novincev, pogajalska moč kupcev, pogajalska moč dobaviteljev, stopnja tekmovalnosti, pritisk nadomestnih izdelkov.'),
  Q('Kako IT v splošnem vpliva na tekmovalne sile in dobičkonosnost panoge?', [
    'Povečuje konkurenco in zmanjšuje dobiček (paradoks interneta)',
    'Zmanjšuje konkurenco in povečuje dobiček vseh podjetij v panogi',
    'Povečuje pogajalsko moč dobaviteljev in zmanjšuje moč kupcev',
    'Otežuje vstop novincev, ker so naložbe v IT previsoke'], 0,
    'IT olajša vstop novincev, poveča moč kupcev in pritisk nadomestkov, širi trg - zato prednosti IT podjetja težje izkoristijo za večji dobiček.'),
  Q('Katere so Porterjeve osnovne strategije za premagovanje tekmovalnih sil?', [
    'Nižji stroški, razločevanje (diferenciacija), tržna usmeritev (segmentacija)',
    'Rast, inovacije, notranja učinkovitost in krajšanje časov poslovanja',
    'Integracija, avtomatizacija in formalizacija poslovnih procesov',
    'Zunanje izvajanje, prevzemi konkurentov in strateška zavezništva'], 0,
    'Porterjeve tri generične strategije; strategije rasti, inovacij ipd. so druge (dodatne) strategije.'),
  Q('Kaj je Porterjev vrednostni sistem?', [
    'Vrednostne verige vseh členov oskrbovalne verige skupaj',
    'Zaporedje temeljnih aktivnosti znotraj enega podjetja',
    'Sistem za izračun dodane vrednosti posameznega izdelka',
    'Seznam podpornih aktivnosti, ki posredno vplivajo na izdelek'], 0,
    'Vrednostna veriga je zaporedje aktivnosti v podjetju; vrednostni sistem tvorijo verige dobaviteljev, podjetja in distribucijskih poti.'),
  Q('Katera aktivnost je TEMELJNA aktivnost vrednostne verige?', [
    'Izhodna logistika',
    'Upravljanje kadrov',
    'Razvoj tehnologije',
    'Nabava infrastrukture'], 0,
    'Temeljne: vhodna logistika, proizvodnja, izhodna logistika, trženje in prodaja, poprodajne storitve. Kadri, tehnologija, infrastruktura so podporne.'),
  Q('Kaj je informacija?', [
    'Sintaktično pravilno, razumljivo zaporedje znakov z uporabno vrednostjo za prejemnika',
    'Nevtralno dejstvo o dogodku v podjetju, zapisano na računalniškem nosilcu',
    'Fizična predstavitev podatka v materialni ali energetski obliki',
    'Vsako zaporedje bitov, ki ga računalnik shrani v notranji pomnilnik'], 0,
    'Podatek je nosilec informacije (fizična predstavitev, nevtralno dejstvo). Informacija ima za prejemnika uporabno vrednost.'),
  Q('Kdaj je količina informacije večja?', [
    'Ko izvemo za malo verjeten dogodek',
    'Ko izvemo za pričakovan dogodek',
    'Ko je sporočilo daljše in podrobnejše',
    'Ko informacijo dobimo od več virov'], 0,
    'Količina informacije je tem večja, čim več novega nam pove - torej pri manj verjetnih dogodkih. Meri se v bitih.'),
  Q('Kaj je razlika med dostopnostjo in pravočasnostjo informacije?', [
    'Dostopnost je čas od zahteve do prejema, pravočasnost čas od spremembe stanja do prejema',
    'Dostopnost je čas od spremembe stanja do prejema, pravočasnost čas od zahteve do prejema',
    'Dostopnost pove, ali je informacija točna, pravočasnost pa, ali je popolna',
    'Dostopnost pove, kdo sme informacijo videti, pravočasnost pa, kako dolgo jo hranimo'], 0,
    'Obe sta sodili kakovosti; pravočasnost (ažurnost, odzivnost) je odvisna tudi od dostopnosti.'),
  Q('Kako teoretično določimo vrednost informacije?', [
    'Vrednost spremembe v obnašanju prejemnika, zmanjšana za stroške pridobitve',
    'Stroški zbiranja in obdelave podatkov, potrebnih za informacijo',
    'Število prejemnikov, ki jim informacija koristi, krat njena cena',
    'Količina informacije v bitih, pomnožena s časom njene veljavnosti'], 0,
    'Vrednost je odvisna od časa (praviloma pada) in kakovosti (popolnosti). Prepozna informacija ni vredna skoraj nič.'),
  Q('Iz katerih sestavin je sestavljen informacijski sistem?', [
    'Strojna in programska oprema, podatki, postopki in ljudje',
    'Strojna oprema, programska oprema in komunikacijska omrežja',
    'Podatkovna baza, uporabniški program in operacijski sistem',
    'Procesor, pomnilnik, vhodne in izhodne enote ter podatki'], 0,
    'Zato računalnik z uporabniškim programom še ni IS - manjkajo postopki in ljudje, ki jih izvajajo.'),
  Q('Kdaj sta dve organizacijski enoti integrirani?', [
    'Ko obe uporabljata isto bazo podatkov in prenos podatkov ni potreben',
    'Ko ena enota drugi tedensko pošilja sumarne podatke o poslovanju',
    'Ko imata obe enoti enak uporabniški program na svojih računalnikih',
    'Ko sta geografsko na isti lokaciji in povezani v isto omrežje'], 0,
    'Povezani enoti si podatke prenašata; integrirani uporabljata isto bazo, zato dogodki v eni sočasno vplivajo na drugo.'),
  Q('Kaj je CRM?', [
    'Sistem za upravljanje odnosov s strankami',
    'Sistem za upravljanje oskrbovalne verige',
    'Celovita programska rešitev za vse vire',
    'Sistem za podporo skupinskemu delu'], 0,
    'CRM je odziv na pritisk naraščajoče moči kupcev (Turban): kolaborativni, operativni in analitični CRM.'),
];

const it = [
  Q('Kateri tehnološki trend velja za procesno moč računalnikov?', [
    'Podvoji se približno vsakih 18 mesecev',
    'Podvoji se približno vsakih 10 let',
    'Raste linearno za 10 % na leto',
    'Od leta 2000 se ne povečuje več'], 0,
    'Procesna moč se podvoji približno vsakih 18 mesecev, cena pa v desetih letih pade za velikostni red.'),
  Q('Kaj sestavlja osrednji del osnovnega modela računalniškega sistema?', [
    'Centralna procesna enota in notranji pomnilnik',
    'Vhodne in izhodne enote ter zunanji pomnilnik',
    'Procesor, trdi disk in komunikacijske naprave',
    'Operacijski sistem in uporabniški programi'], 0,
    'Osrednji del: CPE izvaja ukaze programa iz notranjega pomnilnika. Zunanji del: vhodne, izhodne enote in zunanji pomnilnik.'),
  Q('Kaj velja za notranji pomnilnik v primerjavi z zunanjim?', [
    'Je manjši, hitrejši in dražji ter ob izklopu izgubi vsebino',
    'Je večji, počasnejši in cenejši ter trajno hrani podatke',
    'Je manjši, počasnejši in cenejši ter trajno hrani podatke',
    'Je enako velik, a hitrejši, ker je zunanji samo za varnostne kopije'], 0,
    'Notranji (RAM) hrani programe in podatke, ki jih CPE obdeluje. Zunanji (disk, USB) hrani tiste, ki jih ta trenutek ne uporabljamo.'),
  Q('Koliko različnih znakov lahko predstavimo z enim bajtom?', [
    '256',
    '8',
    '128',
    '1.024'], 0,
    '1 bajt = 8 bitov, 2⁸ = 256 kombinacij. Bajt je osnovna enota za merjenje velikosti pomnilnika.'),
  Q('Kako digitaliziramo sliko?', [
    'Razdelimo jo na drobne kvadratke (pike) in vsakega zapišemo z biti',
    'Zapišemo jo kot zvezno spreminjajočo se fizikalno količino',
    'Pretvorimo jo v besedilo, ki opisuje njeno vsebino',
    'Shranimo jo kot kodo ASCII, en znak za vsako barvo'], 0,
    'Slika je razdeljena na piksle; vsako barvo razstavimo na rdečo, zeleno in modro. Zvezna predstavitev je analogna.'),
  Q('Kaj so sistemski programi?', [
    'Programi, ki krmilijo in usklajujejo delovanje računalnika, npr. operacijski sistem',
    'Programi, ki rešujejo specifične probleme uporabnika, npr. glavna knjiga',
    'Orodja, s katerimi strokovnjaki gradijo uporabniške programe, npr. Access',
    'Programi, ki pretvarjajo izvirno kodo v strojni jezik računalnika'], 0,
    'Tri vrste programov: uporabniški (namenski), programska orodja za gradnjo rešitev in sistemski (OS, pomožni programi).'),
  Q('Kateri je primer uporabniškega (namenskega) programa?', [
    'Program za vodenje skladišča',
    'Operacijski sistem Linux',
    'Gonilnik za tiskalnik',
    'Prevajalnik programskega jezika'], 0,
    'Uporabniški programi avtomatizirajo določeno delovno prakso (glavna knjiga, skladišče, Word, SPSS).'),
  Q('Kaj je multiprogramiranje?', [
    'Sočasno izvajanje več programov, ki si delijo en procesor',
    'Sočasno izvajanje ukazov v sistemu z več procesorji',
    'Pisanje enega programa v več programskih jezikih',
    'Delo več uporabnikov z istim programom prek omrežja'], 0,
    'Multiprocesiranje je sočasno izvajanje na več procesorjih.'),
  Q('Kaj omogoča operacijski sistem?', [
    'Nadzira izvajanje programov in uporabo virov, kot sta procesor in pomnilnik',
    'Rešuje konkretne poslovne probleme, kot je obračun plač zaposlenih',
    'Pretvarja domenska imena računalnikov v naslove IP v omrežju',
    'Skrbi za oblikovanje spletnih strani v jeziku HTML'], 0,
    'OS omogoča zagon programov, delo z datotekami, ukrepanje ob napakah; je enouporabniški ali večuporabniški, eno- ali večopravilen.'),
  Q('Kateri jezik je namenjen univerzalnemu zapisu strukturiranih podatkov v spletu?', [
    'XML',
    'HTML',
    'SQL',
    'Java'], 0,
    'HTML oblikuje spletne strani, XML je univerzalna oblika zapisa strukturiranih dokumentov in podatkov, Java je prenosljiv predmetni jezik.'),
  Q('Kakšni so digitalni podatki v primerjavi z analognimi?', [
    'Bolj univerzalni in poljubno natančni, a ne morejo zvezno predstaviti spremenljivk',
    'Zvezno predstavijo spremenljivke, a so manj natančni in manj univerzalni',
    'Enako natančni, a jih ni mogoče prenašati po komunikacijskih kanalih',
    'Vedno zasedejo manj prostora, ker ne vsebujejo motenj'], 0,
    'Analogni podatki so zvezne fizikalne količine; digitalni so zaporedja znakov neke abecede (binarne).'),
  Q('Ali je računalnik z uporabniškim programom že informacijski sistem?', [
    'Ne, IS vključuje še podatke, postopke in ljudi',
    'Da, če je program povezan s podatkovno bazo',
    'Da, vsak računalnik z nameščenim programom je IS',
    'Ne, IS mora vedno delovati v oblaku'], 0,
    'IS = strojna in programska oprema, podatki, postopki in ljudje. Pogosto izpitno vprašanje.'),
];

const pb = [
  Q('Kaj je podatkovna baza?', [
    'Strukturirana zbirka medsebojno povezanih podatkov na računalniškem nosilcu',
    'Poljubna zbirka datotek, shranjena na strežniku podjetja',
    'Program, ki omogoča vnos, spreminjanje in brisanje podatkov',
    'Tabela v preglednici, v kateri vodimo podatke o strankah'], 0,
    'PB hrani podatke o entitetah in povezavah med njimi. Program za delo z bazo je sistem za upravljanje PB (SUPB).'),
  Q('Kaj pomeni, da je podatkovna baza integrirana?', [
    'Vsebuje podatke za mnoge uporabnike z najmanjšim možnim podvajanjem',
    'Vsak oddelek ima svojo kopijo podatkov, ki se ponoči uskladi',
    'Podatke lahko spreminja le skrbnik podatkovne baze',
    'Hrani le podatke, ki jih potrebuje en sam poslovni proces'], 0,
    'Ker se potrebe uporabnikov prekrivajo, integrirana PB zmanjša podvajanje; podatek spremenimo le na enem mestu.'),
  Q('Kaj je glavni ključ relacije?', [
    'Atribut ali skupina atributov, ki enolično loči vrstice v tabeli',
    'Atribut, ki se v tabeli najpogosteje uporablja pri iskanju',
    'Prvi stolpec v tabeli, ne glede na njegove vrednosti',
    'Atribut, ki povezuje tabelo z vsemi drugimi tabelami v bazi'], 0,
    'Dve vrstici ne moreta imeti iste vrednosti glavnega ključa (npr. EMŠO, vpisna številka). Označimo ga s podčrtajem.'),
  Q('Kdaj uporabimo sestavljeni ključ?', [
    'Ko entitet ni mogoče enolično ločiti z enim samim atributom',
    'Ko tabela vsebuje več kot deset stolpcev',
    'Ko želimo pospešiti iskanje po bazi podatkov',
    'Ko atribut vsebuje več vrednosti hkrati'], 0,
    'Npr. pristop k izpitu: ključ sestavljata študent in izpitni rok.'),
  Q('En zaposleni dela na več projektih, na projektu dela več zaposlenih. Kako to zapišemo v relacijski shemi?', [
    'Z vmesno tabelo, katere ključ sestavljata ključa zaposlenega in projekta',
    'Z dodatnim stolpcem s seznamom projektov v tabeli zaposlenih',
    'S tujim ključem projekta v tabeli zaposlenih',
    'Z eno tabelo, ki združuje vse podatke o zaposlenih in projektih'], 0,
    'Povezavo M:N razrešimo z vmesno tabelo (ZAPOSLEN_PROJEKT). Seznam v enem stolpcu krši pravilo elementarnih vrednosti. Pogosto izpitno vprašanje.'),
  Q('Katera trditev o relacijah (tabelah) je pravilna?', [
    'Vrstni red vrstic v relaciji je nepomemben',
    'Atribut lahko vsebuje več vrednosti hkrati',
    'Dva stolpca imata lahko enako ime',
    'Vsaka vrstica predstavlja en atribut'], 0,
    'Vrstica = entiteta ali povezava, stolpec = atribut, vrednosti so elementarne, imena stolpcev so različna.'),
  Q('Kaj je izpeljani atribut?', [
    'Atribut, katerega vrednost izračunamo iz drugih atributov, npr. starost',
    'Atribut, ki ga lahko razdelimo na manjše enote, npr. naslov',
    'Atribut, ki ima lahko več vrednosti, npr. ocene pri predmetih',
    'Atribut, ki v nekem trenutku nima vrednosti (NULL)'], 0,
    'Starost iz datuma rojstva, povprečna ocena iz ocen. Naslov je sestavljeni, ocene večvrednostni atribut.'),
  Q('Kaj je domena atributa?', [
    'Množica dopustnih vrednosti atributa',
    'Ime tabele, v kateri je atribut',
    'Spletno ime strežnika podatkovne baze',
    'Skupina uporabnikov, ki atribut vidijo'], 0,
    'Npr. poštna številka: cela števila med 1000 in 9999. Pomaga preprečevati napake pri vnosu.'),
  Q('Katere so tri osnovne operacije nad relacijami?', [
    'Izbor vrstic, izbor stolpcev in združevanje tabel',
    'Vnos, spreminjanje in brisanje podatkov',
    'Vrtanje v globino, zvijanje in rezanje',
    'Šifriranje, dešifriranje in varnostno kopiranje'], 0,
    'Združevanje poteka vedno na podlagi skupnih atributov. Vrtanje in zvijanje sta operaciji OLAP.'),
  Q('Kaj je sistem za upravljanje podatkovne baze (SUPB)?', [
    'Zbirka programov za tvorbo, uporabo in vzdrževanje PB, npr. Oracle ali MySQL',
    'Oseba, ki skrbi za varnostne kopije in pravice uporabnikov baze',
    'Orodje CASE, ki se uporablja izključno za načrtovanje baze',
    'Podatkovno skladišče, ki hrani zgodovinske podatke podjetja'], 0,
    'SUPB skrbi tudi za celovitost, zaščito pred nepooblaščenim dostopom in obnovo. Za načrtovanje so orodja CASE; oseba je skrbnik PB.'),
  Q('Kaj je naloga skrbnika podatkovne baze?', [
    'Zaščita, varnostne kopije, dodeljevanje pravic in zahtevnejše poizvedbe',
    'Odločanje o tem, kako pogosto se izdelujejo varnostne kopije',
    'Vnos vseh transakcijskih podatkov, ki nastanejo v podjetju',
    'Izbira poslovne strategije na podlagi podatkov iz baze'], 0,
    'Pogostost varnostnih kopij določa varnostna politika organizacije, ne more biti prepuščena skrbniku.'),
  Q('Na primeru "povprečna ocena študentov po izpitnem roku, letniku in smeri" - kaj je mera?', [
    'Povprečna ocena',
    'Izpitni rok',
    'Letnik študija',
    'Smer študija'], 0,
    'V večdimenzionalnem modelu so dimenzije stranice kocke (rok, letnik, smer), mera je vrednost na preseku (povprečna ocena). Pogosto izpitno vprašanje.'),
  Q('Kateri podatkovni model se uporablja za podporo odločanju (analitiko)?', [
    'Večdimenzionalni model (kocka, zvezdna shema)',
    'Hierarhični model (drevesna struktura)',
    'Mrežni model (povezave kot kazalci)',
    'Relacijski model z normaliziranimi tabelami'], 0,
    'Operativne relacijske baze so za analize prepočasne (poizvedbe po več tabelah); večdimenzionalni model je preprost in blizu razmišljanju analitika.'),
  Q('Kaj je informacijska vrzel?', [
    'Razlika med zbranimi podatki in informacijami, ki jih potrebujemo',
    'Čas med nastankom podatka in njegovim vnosom v bazo',
    'Del podatkov, ki se izgubi ob okvari diska',
    'Razlika v znanju med tehničnimi in poslovnimi informatiki'], 0,
    'Imamo podatke, nimamo pa informacij. Rešujemo jo z analizo podatkovnih potreb in podatkovnim modeliranjem.'),
];

const kom = [
  Q('Katera raven modela OSI določa pot paketov (protokol IP)?', [
    '3. raven - omrežja',
    '2. raven - povezave',
    '4. raven - transportna',
    '7. raven - aplikacijska'], 0,
    '1 fizična, 2 povezave (Ethernet), 3 omrežja (IP), 4 transportna, 5 seje, 6 predstavitvena, 7 aplikacijska (POP3, SMTP).'),
  Q('Čemu je namenjen standard OSI?', [
    'Povezovanju opreme različnih proizvajalcev s skupnimi protokoli',
    'Zaščiti podatkov pred nepooblaščenim dostopom v omrežju',
    'Določanju cen komunikacijskih storitev med operaterji',
    'Pretvorbi domenskih imen v naslove IP'], 0,
    'OSI zajema komunikacijske protokole (pravila komuniciranja), razdeljene na 7 ravni.'),
  Q('Kaj je značilno za krajevno omrežje (LAN)?', [
    'Pokriva eno ali nekaj stavb, lastnik omrežja je lastnik medija, je hitro in poceni',
    'Pokriva širše območje, povezave zakupi pri operaterjih, je počasnejše',
    'Je omrežje omrežij, ki deluje po protokolu TCP/IP po vsem svetu',
    'Je šifrirana povezava oddaljenega računalnika prek javnega omrežja'], 0,
    'Opis WAN je drugi odgovor, interneta tretji, VPN četrti.'),
  Q('Katera naprava povezuje krajevna omrežja in usmerja pakete IP med njimi?', [
    'Usmerjevalnik (router)',
    'Zvezdišče (hub)',
    'Stikalo (switch)',
    'Modem'], 0,
    'Zvezdišča in stikala so del LAN; usmerjevalniki so posebni računalniki, povezani na dve ali več omrežij, lahko tudi kot požarne pregrade.'),
  Q('Kakšna je razlika med internetom in svetovnim spletom?', [
    'Internet je omrežje omrežij (TCP/IP), splet je ena od njegovih storitev (HTTP, HTML)',
    'Splet je omrežje omrežij, internet je storitev za prikaz spletnih strani',
    'Internet je namenjen podjetjem, splet pa zasebnim uporabnikom',
    'Med njima ni razlike, gre za dve imeni za isto stvar'], 0,
    'Splet (WWW) omogoča hiperbesedilne dokumente po načelu odjemalec/strežnik. Druge storitve interneta: e-pošta, telefonija IP, DNS. Kolokvijsko vprašanje.'),
  Q('Kaj počne sistem DNS?', [
    'Pretvarja domenska imena računalnikov v naslove IP',
    'Dodeljuje uporabnikom elektronske poštne predale',
    'Šifrira podatke med odjemalcem in strežnikom',
    'Razdeli podatke na pakete in jih oštevilči'], 0,
    'DNS je hierarhičen (domene) in decentraliziran. Razdelitev na pakete je naloga protokola IP.'),
  Q('Kaj je intranet?', [
    'IS podjetja, ki temelji na TCP/IP in storitvah interneta',
    'Povezava intranetov več podjetij v skupno omrežje',
    'Brezžično krajevno omrežje v prostorih podjetja',
    'Javno omrežje, ki ga vzdržuje ponudnik dostopa (ISP)'], 0,
    'Ekstranet je povezava intranetov več podjetij (npr. s partnerji).'),
  Q('Kaj omogoča navidezno zasebno omrežje (VPN)?', [
    'Oddaljen računalnik se prek javnega omrežja šifrirano vključi v omrežje podjetja',
    'Podjetje zgradi lastno fizično povezavo med vsemi svojimi poslovalnicami',
    'Več podjetij si deli skupen intranet brez šifriranja',
    'Uporabnik dostopa do interneta brez ponudnika dostopa'], 0,
    'Oddaljeni računalniki navidezno postanejo del omrežja podjetja; izmenjava je šifrirana in razmeroma varna.'),
  Q('Kaj je značilno za trinivojsko arhitekturo?', [
    'Ločene ravni: predstavitvena, poslovnih pravil in podatkovna',
    'Vsak uporabnik ima kopijo programa, podatki so na strežniku',
    'Vsi programi in podatki so na enem samem računalniku',
    'Uporabniki si podatke izmenjujejo neposredno brez strežnika'], 0,
    'Opis dvonivojske arhitekture je drugi odgovor. Primer: prijava na izpit - vnos (predstavitev), preverjanje roka (poslovna pravila), zapis (podatki).'),
  Q('Kaj je prednost računalništva v oblaku za uporabnika?', [
    'Dostop od koder koli in predvidljivi, merjeni stroški glede na porabo',
    'Uporabnik natančno ve, na katerem strežniku so njegovi podatki',
    'Viri so trajno omejeni na zmogljivost lastne strojne opreme',
    'Ni treba plačevati, ker so vse storitve oblaka brezplačne'], 0,
    'Značilnosti: samopostrežba, hitra elastičnost, merjena storitev, univerzalen dostop, združevanje virov (uporabnik ne ve, kje točno so podatki). Pogosto izpitno vprašanje.'),
  Q('Katere storitve so prenosne storitve?', [
    'Storitve za prenos podatkov, npr. dostop do interneta (ADSL)',
    'Storitve za dostop do večpredstavnih vsebin, npr. svetovni splet',
    'Storitve za izmenjavo informacij, npr. elektronsko bančništvo',
    'Storitve za prenos zalog med skladišči podjetja'], 0,
    'Prenosne storitve so temelj (prve štiri ravni OSI); storitve omrežij (splet) in informacijske storitve (e-bančništvo) gradijo na njih.'),
  Q('Kateri protokola se uporabljata za elektronsko pošto?', [
    'POP3 in SMTP',
    'HTTP in HTML',
    'TCP in UDP',
    'DNS in IP'], 0,
    'POP3 in SMTP delujeta na zgornjih ravneh OSI. HTTP je protokol spleta, HTML jezik spletnih strani.'),
];

const kartice = cards([
  ['Tehnična vs. uporabna informatika', 'Tehnična razvija računalnike; uporabna preučuje njihovo smotrno uporabo (predmet: IS).'],
  ['Porterjevih 5 sil', 'Novinci, moč kupcev, moč dobaviteljev, tekmovalnost, nadomestni izdelki.'],
  ['Porterjeve strategije', 'Nižji stroški, razločevanje, tržna usmeritev (segmentacija).'],
  ['Podatek / informacija', 'Podatek = nosilec, nevtralno dejstvo. Informacija = razumljiva, z uporabno vrednostjo za prejemnika.'],
  ['Vrednost informacije', 'Vrednost spremembe obnašanja prejemnika − stroški pridobitve; s časom pada.'],
  ['Sestavine IS', 'Strojna, programska oprema, podatki, postopki, ljudje.'],
  ['Notranji vs. zunanji pomnilnik', 'Notranji: majhen, hiter, drag, izgubi vsebino. Zunanji: velik, počasen, poceni, trajen.'],
  ['Vrste programov', 'Uporabniški, programska orodja, sistemski (OS).'],
  ['Glavni ključ', 'Atribut(i), ki enolično ločijo vrstice; sestavljeni ključ iz več atributov.'],
  ['Povezava M:N', 'Vmesna tabela s sestavljenim ključem iz ključev obeh tabel.'],
  ['Mera / dimenzija', 'Dimenzije = stranice kocke (čas, regija, izdelek); mera = vrednost na preseku (prodaja).'],
  ['OSI', '1 fizična, 2 povezave, 3 omrežja (IP), 4 transportna, 5 seje, 6 predstavitvena, 7 aplikacijska.'],
  ['Internet vs. splet', 'Internet = omrežje omrežij (TCP/IP); splet = storitev (HTTP, HTML).'],
  ['Intranet / ekstranet / VPN', 'IS podjetja na TCP/IP / povezava intranetov več podjetij / šifrirana povezava prek javnega omrežja.'],
  ['Oblak', 'Samopostrežba, elastičnost, merjena storitev, univerzalen dostop.'],
]);

module.exports = {
  id: 'inf',
  parts: [
    {
      id: 'k1', name: '1. kolokvij', type: 'kolokvij',
      notesMd: NOTES_K1,
      decks: [
        { id: 'inf-k1-konk', name: 'Poslovna informatika in konkurenčnost', questions: konk },
        { id: 'inf-k1-it', name: 'Strojna in programska oprema', questions: it },
        { id: 'inf-k1-pb', name: 'Podatkovne baze', questions: pb },
        { id: 'inf-k1-kom', name: 'Elektronske komunikacije', questions: kom },
      ],
      flashcards: [{ id: 'inf-c-k1', name: 'Pojmi (1. kolokvij)', cards: kartice }],
    },
  ],
};
