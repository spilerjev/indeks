// Informatika, 2. krog: odpravlja pristranskost "pravilni odgovor je najdaljši" (vsaj en napačni je enako dolg ali daljši).
module.exports = [
  // ---- 1. kolokvij
  ['Kaj je poslovna informatika?', [
    'Disciplina, ki razvija strojno in programsko opremo za poslovne sisteme',
    'Del računovodstva, ki vodi poslovne knjige s pomočjo računalniških programov',
    'Veja managementa, ki se ukvarja izključno z vodenjem oddelka za IT'], 1],
  ['Kaj je bistvena razlika med industrijsko in informacijsko družbo?', [
    'V informacijski družbi narašča delež zaposlenih v kmetijstvu in rudarstvu',
    'Informacijska družba ne potrebuje več telekomunikacijske infrastrukture',
    'V informacijski družbi se delovni čas vseskozi skrajšuje zaradi strojev'], 2],
  ['Katere so Porterjeve osnovne strategije za premagovanje tekmovalnih sil?', [
    'Rast, inovacije, notranja učinkovitost in krajšanje časov poslovanja (hitrost)',
    'Integracija, avtomatizacija in formalizacija poslovnih procesov (reinženiring)',
    'Zunanje izvajanje, prevzemi konkurentov in strateška zavezništva s partnerji'], 0],
  ['Kaj je informacija?', [
    'Nevtralno dejstvo o dogodku v podjetju, zapisano na računalniškem nosilcu v obliki znakov',
    'Fizična predstavitev podatka v materialni ali energetski obliki, ki jo prejemnik razume',
    'Vsako sintaktično pravilno zaporedje bitov, ki ga računalnik shrani v notranji pomnilnik'], 3],
  ['Kako teoretično določimo vrednost informacije?', [
    'Stroški zbiranja in obdelave podatkov, povečani za stroške njihovega prenosa',
    'Število prejemnikov, ki jim informacija koristi, pomnoženo z njeno tržno ceno',
    'Količina informacije v bitih, pomnožena s časom njene veljavnosti za prejemnika'], 1],
  ['Kdaj sta dve organizacijski enoti integrirani?', [
    'Ko ena enota drugi tedensko pošilja sumarne podatke o svojem poslovanju',
    'Ko imata obe enoti enak uporabniški program na svojih lastnih računalnikih',
    'Ko sta geografsko na isti lokaciji in povezani v isto krajevno omrežje'], 2],
  ['Kaj je CRM?', [
    'Sistem za upravljanje odnosov z dobavitelji',
    'Celovita programska rešitev za vse vire podjetja',
    'Sistem za podporo skupinskemu delu in sodelovanju'], 0],
  ['Kateri tehnološki trend velja za procesno moč računalnikov?', [
    'Podvoji se približno vsakih 36 mesecev',
    'Raste linearno za približno 10 % na leto',
    'Od leta 2000 se praktično ne povečuje več'], 1],
  ['Kaj sestavlja osrednji del osnovnega modela računalniškega sistema?', [
    'Vhodne in izhodne enote ter zunanji pomnilniki',
    'Procesor, trdi disk in komunikacijske naprave',
    'Operacijski sistem in uporabniški programi (SW)'], 2],
  ['Kako digitaliziramo sliko?', [
    'Zapišemo jo kot zvezno spreminjajočo se fizikalno količino (napetost)',
    'Pretvorimo jo v besedilo, ki opisuje njeno vsebino, in to zapišemo z biti',
    'Shranimo jo kot kodo ASCII, en znak za vsako barvo v sliki'], 0],
  ['Kaj so sistemski programi?', [
    'Programi, ki rešujejo specifične probleme uporabnika, npr. glavna knjiga ali obračun plač',
    'Orodja, s katerimi strokovnjaki gradijo uporabniške programe, npr. Access ali Java',
    'Programi, ki pretvarjajo izvirno kodo v strojni jezik računalnika, npr. prevajalnik'], 3],
  ['Kaj je multiprogramiranje?', [
    'Sočasno izvajanje ukazov enega programa na več procesorjih',
    'Pisanje enega programa v več programskih jezikih hkrati',
    'Delo več uporabnikov z istim programom prek omrežja (terminali)'], 1],
  ['Kaj omogoča operacijski sistem?', [
    'Rešuje konkretne poslovne probleme, kot je obračun plač zaposlenih v podjetju',
    'Pretvarja domenska imena računalnikov v naslove IP in usmerja pakete v omrežju',
    'Prevaja izvirno kodo uporabniških programov v strojni jezik procesorja'], 2],
  ['Kakšni so digitalni podatki v primerjavi z analognimi?', [
    'Zvezno predstavijo spremenljivke, a so manj natančni in manj univerzalni od analognih',
    'Enako natančni in univerzalni, a jih ni mogoče prenašati po komunikacijskih kanalih',
    'Vedno zasedejo manj prostora, ker ne vsebujejo motenj, a jih ni mogoče kopirati'], 0],
  ['Kaj je podatkovna baza?', [
    'Poljubna zbirka datotek in dokumentov, shranjena na strežniku podjetja ali v oblaku',
    'Zbirka programov, ki omogoča vnos, spreminjanje, brisanje in iskanje podatkov',
    'Nestrukturirana shramba vseh podatkov podjetja v njihovi surovi obliki (jezero)'], 1],
  ['Kaj pomeni, da je podatkovna baza integrirana?', [
    'Vsak oddelek ima svojo kopijo podatkov, ki se vsako noč samodejno uskladi',
    'Podatke lahko spreminja le skrbnik baze, uporabniki jih lahko samo berejo',
    'Hrani le podatke, ki jih potrebuje en sam poslovni proces ali oddelek'], 3],
  ['Kaj je glavni ključ relacije?', [
    'Atribut, ki se v tabeli najpogosteje uporablja pri iskanju vrstic',
    'Prvi stolpec v tabeli, ne glede na vrednosti, ki jih vsebuje',
    'Atribut, ki povezuje tabelo z vsemi drugimi tabelami v podatkovni bazi'], 0],
  ['En zaposleni dela na več projektih, na projektu dela več zaposlenih.', [
    'Z dodatnim stolpcem, ki v tabeli zaposlenih hrani seznam šifer vseh projektov',
    'S tujim ključem projekta v tabeli zaposlenih in tujim ključem zaposlenega v projektih',
    'Z eno tabelo, ki združuje vse podatke o zaposlenih in projektih v eni vrstici'], 2],
  ['Kaj je izpeljani atribut?', [
    'Atribut, ki ga lahko razdelimo na manjše enote, npr. naslov na ulico in kraj',
    'Atribut, ki ima lahko več vrednosti hkrati, npr. ocene pri različnih predmetih',
    'Atribut, ki v nekem trenutku nima vrednosti (NULL), npr. datum zaključka'], 1],
  ['Katere so tri osnovne operacije nad relacijami?', [
    'Vnos, spreminjanje in brisanje podatkov v tabelah',
    'Vrtanje v globino, zvijanje in rezanje podatkov',
    'Šifriranje, dešifriranje in varnostno kopiranje'], 3],
  ['Kaj je sistem za upravljanje podatkovne baze (SUPB)?', [
    'Oseba, ki skrbi za varnostne kopije in pravice uporabnikov baze, npr. skrbnik',
    'Orodje CASE, ki se uporablja izključno za načrtovanje baze, npr. ERwin ali Visio',
    'Podatkovno skladišče, ki hrani zgodovinske podatke podjetja, npr. SAP BW'], 0],
  ['Kaj je naloga skrbnika podatkovne baze?', [
    'Oblikovanje konceptualnega modela in izbira poslovne strategije podjetja',
    'Vnos vseh transakcijskih podatkov, ki nastanejo v podjetju, in njihov nadzor',
    'Izbira poslovne strategije na podlagi podatkov iz baze in poročil za vodstvo'], 2],
  ['Na primeru "povprečna ocena študentov po izpitnem roku, letniku in smeri" - kaj je mera?', [
    'Izpitni rok (čas)',
    'Letnik in smer študija',
    'Smer študija'], 1],
  ['Kateri podatkovni model se uporablja za podporo odločanju (analitiko)?', [
    'Hierarhični model (drevesna struktura zapisov)',
    'Mrežni model (povezave med zapisi kot kazalci)',
    'Relacijski model z normaliziranimi tabelami'], 3],
  ['Kaj je informacijska vrzel?', [
    'Razlika v znanju med tehničnimi in poslovnimi informatiki v podjetju',
    'Del podatkov, ki se ob okvari diska izgubi med dvema varnostnima kopijama',
    'Čas med nastankom podatka v realnosti in njegovim vnosom v bazo'], 0],
  ['Kaj je značilno za krajevno omrežje (LAN)?', [
    'Pokriva mesto ali regijo, povezave zakupi pri operaterjih, je počasnejše in dražje',
    'Je omrežje omrežij, ki deluje po protokolu TCP/IP po vsem svetu, lastnika nima',
    'Je šifrirana povezava oddaljenega računalnika v omrežje podjetja prek javnega omrežja'], 1],
  ['Katera naprava povezuje krajevna omrežja in usmerja pakete IP', [
    'Večportno stikalo (switch)',
    'Zvezdišče (hub, razdelilnik)',
    'Strežnik DNS (imenski strežnik)'], 2],
  ['Kaj počne sistem DNS?', [
    'Dodeljuje računalnikom v omrežju dinamične naslove IP',
    'Šifrira podatke med odjemalcem in spletnim strežnikom',
    'Razdeli podatke na pakete, jih oštevilči in usmeri'], 1],
  ['Kaj je intranet?', [
    'Povezava intranetov več partnerskih podjetij v skupno omrežje',
    'Brezžično krajevno omrežje v prostorih podjetja (Wi-Fi)',
    'Javno omrežje, ki ga vzdržuje ponudnik dostopa do interneta'], 0],
  ['Kaj je značilno za trinivojsko arhitekturo?', [
    'Vsak uporabnik ima kopijo programa, podatki so na strežniku (2 ravni)',
    'Vsi programi in podatki so na enem samem osrednjem računalniku',
    'Uporabniki si podatke izmenjujejo neposredno brez strežnika (P2P)'], 2],
  ['Kaj je prednost računalništva v oblaku za uporabnika?', [
    'Uporabnik natančno ve, na katerem strežniku so njegovi podatki shranjeni',
    'Viri so trajno omejeni na zmogljivost lastne strojne opreme podjetja',
    'Ni treba plačevati, ker so vse storitve oblaka za podjetja brezplačne'], 3],
  // ---- poslovna analitika
  ['Kaj je Data Warehouse (DWH)?', [
    'Shramba vseh vrst podatkov v surovi obliki za strojno učenje (jezero)',
    'Operativna baza, ki beleži transakcije v realnem času (OLTP)',
    'Orodje za vizualizacijo podatkov na nadzornih ploščah za vodstvo'], 1],
  ['Kaj pomeni kratica ETL?', [
    'Extract, Translate, Load',
    'Export, Transform, Load',
    'Evaluate, Transform, Load'], 2],
  ['Kateri primer najbolje ponazarja operativno bazo (database)?', [
    'Skladišče podatkov za letno poročanje',
    'Jezero surovih dnevniških datotek strežnika',
    'Nadzorna plošča v Power BI za upravo'], 0],
  ['Na katero vprašanje odgovarja DIAGNOSTIČNA analitika?', [
    'Kaj se je zgodilo (opis)?',
    'Kaj se bo zgodilo (napoved)?',
    'Kaj naj naredimo (ukrep)?'], 1, 'Zakaj se je zgodilo (vzrok)?'],
  // ---- 2. kolokvij
  ['Kaj je značilno za transakcijske informacijske sisteme (TPS)?', [
    'Podpirajo načrtovanje in nadzor ter dejansko stanje primerjajo z načrtovanim stanjem',
    'Samodejno iščejo prej neznane vzorce v velikih količinah podatkov podjetja',
    'Managerjem ponujajo agregirane, ne nujno zelo natančne podatke o poslovanju'], 2],
  ['Kaj je značilno za poslovnointeligenčne sisteme (BI)?', [
    'Izvajajo vsakodnevne transakcije, kot je izstavitev računa kupcu, skoraj avtomatizirano',
    'Podatke vnašajo ročno operativni uporabniki ob vsakem poslovnem dogodku v podjetju',
    'Rezultate uporabljajo predvsem zunanji uporabniki, npr. davčna uprava in banke'], 0],
  ['Kaj je glavni cilj ERP?', [
    'Avtomatizirati računovodstvo in obračun plač v podjetju z eno programsko rešitvijo',
    'Omogočiti kupcem nakupovanje v spletni trgovini, povezani z zalogami podjetja',
    'Zagotoviti analitikom večdimenzionalne poglede na podatke iz vseh oddelkov'], 3],
  ['Kdaj se podjetju praviloma splača kupiti programsko rešitev namesto lastnega razvoja?', [
    'Ko ima podjetje več kot 50 zaposlenih v službi za informatiko in razvoj',
    'Vedno, ker je nakup rešitve vedno cenejši in hitrejši od lastnega razvoja',
    'Ko so stroški licenc večji od stroškov uvajanja in prilagajanja rešitve'], 1],
  ['Kaj so matični podatki v ERP?', [
    'Podatki, ki beležijo poslovne dogodke, npr. količina, cena in datum posameznega naročila',
    'Podatki o organizacijski strukturi, npr. oddelki, stroškovna mesta in delovna mesta',
    'Zgodovinski podatki, preneseni v podatkovno skladišče, npr. prodaja po letih'], 2],
  ['Kaj so otoki informacij?', [
    'Oddaljene poslovalnice brez stalne povezave z osrednjim IS',
    'Področna podatkovna skladišča za posamezne oddelke podjetja',
    'Podatki podjetja, shranjeni pri več ponudnikih v oblaku'], 0],
  ['Kaj je problem v splošnem modelu upravljanja?', [
    'Omejitev, ki jo sistemu postavi njegovo okolje',
    'Pomanjkanje podatkov o okolju sistema',
    'Napaka v programski opremi sistema (hrošč)'], 3],
  ['Kaj je značilno za podatkovno skladišče?', [
    'Hrani le trenutne vrednosti podatkov, ki se nenehno posodabljajo, brez zgodovine',
    'Vsak oddelek ima svoje skladišče brez povezave z drugimi, podatki niso integrirani',
    'Vsebuje izključno nestrukturirane podatke, kot so slike, video in dokumenti'], 1],
  ['Kaj počne transformacijski in integracijski sloj?', [
    'Prikazuje managerjem ključne kazalnike na nadzorni plošči (OLAP)',
    'Šifrira in stisne podatke, preden jih podjetje pošlje v oblak',
    'Briše stare zgodovinske podatke iz podatkovnega skladišča'], 2],
  ['Kaj je najprimernejši podatkovni vir za OLAP?', [
    'Operativna relacijska baza (OLTP)',
    'Zunanji nestrukturirani viri',
    'Varnostna kopija operativne baze'], 0],
  ['Kaj je rezanje (slice and dice) pri OLAP?', [
    'Obračanje pogleda na podatke (pivot)',
    'Prikaz vrednosti, ki močno odstopajo',
    'Izračun novih agregatnih podatkov'], 3],
  ['Kaj je podatkovno rudarjenje?', [
    'Prenos zgodovinskih podatkov iz operativne baze v skladišče (ETL)',
    'Ročni pregled poročil, ki jih pripravi služba za informatiko',
    'Izdelava poljubnih pogledov na podatke v obliki vrtilnih tabel'], 1],
  ['Kakšna je razlika med OLAP in podatkovnim rudarjenjem?', [
    'OLAP je podatkovno vodeno (sistem sam išče vzorce), rudarjenje je uporabniško vodeno',
    'OLAP deluje na operativni bazi, rudarjenje pa izključno na podatkovnem skladišču',
    'Med njima ni razlike, rudarjenje je le novejše ime za OLAP v podatkovnem skladišču'], 2],
  ['Kaj je navzkrižno trženje?', [
    'Prodaja izdelkov konkurenta v lastni spletni trgovini',
    'Hkratno oglaševanje na spletu, v tisku in na televiziji',
    'Izmenjava podatkov o kupcih med partnerskimi podjetji'], 0],
  ['Kaj je značilno za uporabo podatkov na analitični ravni?', [
    'Podatki se pogosto posodabljajo in se nikakor ne smejo podvajati',
    'Zanesljivost mora biti zelo visoka, čas dostopa pa čim krajši',
    'Način uporabe podatkov je vnaprej znan in se redko spreminja'], 3],
  ['Kaj je nadzorna plošča (dashboard)?', [
    'Vmesnik skrbnika baze za dodeljevanje pravic uporabnikom in nadzor dostopa',
    'Program za nadzor nad delovanjem strežnikov in omrežja v oblaku',
    'Seznam vseh transakcij, ki so nastale v tekočem dnevu, po oddelkih'], 1],
  ['Pri analizi stroškov in koristi izberemo alternativo z', [
    'najnižjimi začetnimi stroški nakupa in uvedbe rešitve',
    'najkrajšim časom uvedbe in najmanjšim tveganjem',
    'največjim številom funkcij za končne uporabnike'], 2],
  // ---- varnost, UI, blockchain
  ['Kaj je rešitev za odpornost na odpovedi diskov?', [
    'UPS (brezprekinitveno napajanje)',
    'NAS (omrežni pomnilnik)',
    'SSD (polprevodniški disk)'], 1, 'RAID (polje diskov)'],
  ['Socialni inženiring izkorišča predvsem:', [
    'tehnične ranljivosti operacijskega sistema in omrežja',
    'napake v strojni opremi in gonilnikih naprav',
    'šibko šifriranje gesel v podatkovni bazi strežnika'], 2],
  ['Pri BEC napadu (Business Email Compromise) napadalci nazadnje:', [
    'šifrirajo datoteke in zahtevajo odkupnino v bitcoinih',
    'izbrišejo podatkovno bazo in vse varnostne kopije',
    'objavijo ukradene poslovne podatke na temnem spletu'], 0],
  ['Kdo izda digitalno potrdilo?', [
    'Banka imetnika, npr. NLB ali SKB',
    'Ponudnik interneta, npr. Telekom',
    'Imetnik sam s svojim zasebnim ključem'], 1],
  ['Kaj je Turing prispeval leta 1950?', [
    'Zgradil je prvi računalnik s shranjenim programom (Manchester)',
    'Uvedel je termin "umetna inteligenca" na konferenci v Dartmouthu',
    'Razvil je prvi program za igranje šaha na računalniku ENIAC'], 3],
  ['Kaj je RLHF?', [
    'Reinforcement learning from hidden features',
    'Rule-based learning from human feedback',
    'Retrieval learning with hybrid filters'], 0],
  ["Kaj je 'knowledge cutoff'?", [
    'Največja dolžina odgovora modela v žetonih',
    'Meja, po kateri model zavrne nevarno vprašanje',
    'Največja količina besedila v pozivu (kontekst)'], 2],
  ['Kaj je glavni doprinos generativne UI v primerjavi s tradicionalno?', [
    'Natančneje razvršča obstoječe podatke v razrede',
    'Hitreje napoveduje številske vrednosti iz podatkov',
    'Samodejno čisti in povezuje podatke v skladišču'], 1],
  ['Leta 1997 je IBM Deep Blue:', [
    'premagal svetovnega prvaka v igri go',
    'zmagal v televizijskem kvizu Jeopardy!',
    'prvič uspešno opravil Turingov test'], 0],
  ['Globoko učenje (Deep Learning) temelji na:', [
    'globokih odločitvenih drevesih',
    'ekspertnih pravilih in logiki',
    'večkratni linearni regresiji'], 3],
  ["Kaj je 'umetna gotovost' (artificial certainty)?", [
    'Stopnja zaupanja, ki jo model sam pripiše vsakemu svojemu odgovoru',
    'Zanesljivost strojne opreme, na kateri teče jezikovni model',
    'Visoka točnost izračunov modela pri zahtevnih matematičnih nalogah'], 1],
  ['Kdo potrdi vsak dogodek v glavni knjigi?', [
    'centralna banka ali država',
    'en sam izbrani validator',
    'skrbnik (lastnik) omrežja'], 2],
  ['Kdo je razvil pametne pogodbe in kdaj?', [
    'Bitcoin, 2009',
    'Hyperledger, 2016',
    'Ripple (XRP), 2012'], 1],
  ['Kaj pomeni CBDC?', [
    'Centralno bančni digitalni certifikat',
    'Centralizirana blockchain digitalna valuta',
    'Komercialne bančne digitalne valute'], 0],
  ['Kaj je DeFi?', [
    'Digitalni denar, ki ga izda in jamči centralna banka',
    'Finančne storitve bank prek mobilne aplikacije (fintech)',
    'Zasebna podjetniška platforma za blockchain brez žetonov'], 3],
  ['Kaj je DAO?', [
    'Porazdeljeno lastništvo digitalnih sredstev',
    'Digitalni avtomatizirani oracle (vir podatkov)',
    'Decentralizirana avtorizacija operacij'], 1],
  ['Katera platforma je zasebna/podjetniška?', [
    'Ethereum Classic Mainnet',
    'Bitcoin Lightning Network',
    'Solana Mainnet Beta'], 2],
  // ---- e-poslovanje
  ['Kakšna je razlika med e-commerce in e-business?', [
    'E-commerce je širši in vključuje vse oblike elektronske komunikacije s partnerji',
    'E-commerce velja samo za B2B, e-business pa samo za B2C poslovanje s potrošniki',
    'Med njima ni razlike, oba sta sinonima za prodajo prek spleta končnim kupcem'], 1],
  ['Kaj je RIP (računalniška izmenjava podatkov)?', [
    'Spletna dražba, kjer se kupec in prodajalec elektronsko pogajata za ceno',
    'Mednarodno omrežje za prenos finančnih sporočil med bankami (SWIFT)',
    'Prenos govora in slike prek omrežij, ki uporabljajo protokol IP (VoIP)'], 0],
  ['Kaj so prihodki od transakcij?', [
    'Plačilo za oglasni prostor, ki ga pasica zaseda na spletni strani',
    'Plačilo glede na število obiskovalcev, preusmerjenih k trgovcu',
    'Vnaprej plačana naročnina za dostop do vsebin spletne strani'], 2],
  ['Kaj so provizije za preusmerjanje?', [
    'Plačilo za prostor na spletni strani, ne glede na odziv in število obiskovalcev',
    'Provizija glede na število in obseg transakcij, sklenjenih prek spletne strani',
    'Plačilo, ki ga kupec plača posredniku za hitrejšo dostavo naročenega blaga'], 3],
  ['Katera je slabost e-poslovanja za podjetja?', [
    'Višji stroški zaradi posrednikov',
    'Počasnejši dostop do novih trgov',
    'Manjša operativna učinkovitost'], 1],
  ['Kaj je skupinsko nakupovanje?', [
    'Storitev, ki preišče splet in za kupca poišče najnižjo ceno želenega izdelka',
    'Model, v katerem kupec sam predlaga ceno, ki jo je za izdelek pripravljen plačati',
    'Prilagajanje izdelka potrebam posameznega kupca na podlagi podatkov o nakupih'], 0],
  // ---- izpitna vprašanja
  ['Kateri način uvajanja IS je najmanj tvegan?', [
    'Neposreden (takojšnji) prehod na nov sistem',
    'Postopen prehod po posameznih oddelkih',
    'Pilotni prehod v eni poslovni enoti'], 2],
  ['ERP kupimo in prilagodimo lastnim potrebam ali prilagodimo procese rešitvi.', [
    'Prilagajanje rešitve je cenejše in hitrejše, ker procesov ni treba spreminjati',
    'Prilagoditev procesov ni mogoča, ker so procesi podjetja določeni z zakonom',
    'Med pristopoma ni razlike v stroških, tveganju ali času uvedbe rešitve'], 1],
  ['Ali informatika podjetju sama po sebi zagotavlja konkurenčno prednost?', [
    'Da, vsaka naložba v IT samodejno poveča dobiček in tržni delež',
    'Ne, IT nima vpliva, ker jo enako uporabljajo vsa podjetja',
    'Da, a samo pri podjetjih, ki prodajajo izključno prek spleta'], 3],
  ['(Izpit) Katere so štiri značilnosti masovnih podatkov (big data)?', [
    'Količina, cena hrambe, zgoščenost in objektivnost podatkov',
    'Točnost, pravočasnost, popolnost in razumljivost podatkov',
    'Strukturiranost, normaliziranost, integriranost, zanesljivost'], 0],
  ['(Izpit 2018) Kaj je značilno za okolje "pajkove mreže"?', [
    'Ena centralna baza, do katere imajo vsi oddelki enak in hkraten dostop prek omrežja',
    'Podatki se samodejno sinhronizirajo med vsemi oddelki prek spleta brez podvajanja',
    'Omrežje strežnikov, povezanih v obliki zvezde okoli podatkovnega skladišča'], 2],
  ['(Izpit) Kako se postopni prehod na nov IS primerja z ostalimi načini uvajanja?', [
    'Manj tvegan in dražji od vzporednega, bolj tvegan in cenejši od neposrednega',
    'Najmanj tvegan in najdražji, ker stari in novi sistem nekaj časa tečeta sočasno',
    'Najhitrejši in najcenejši, uporabimo ga, kadar starega sistema sploh ni'], 1],
  ['(Izpit) Kako se vrednost informacije spreminja s časom?', [
    'Praviloma raste, ker se informacija sčasoma potrdi v praksi',
    'Ostaja enaka, odvisna je le od stroškov njene pridobitve',
    'Raste do zastaranja podatkov, nato hitro pade na nič'], 3],
  ['(Izpit) Kaj je zgoščenost kot lastnost kakovosti informacije?', [
    'Informacija vsebuje prav vse elemente, ki so potrebni za odločitev, brez izjeme',
    'Informacija čim bolj nepristransko in natančno odraža dejansko stanje sistema',
    'Informacija je uporabniku na voljo v najkrajšem času od trenutka zahteve'], 0],
  ['(Izpit) Kako merimo TOČNOST informacije?', [
    'S časom od spremembe v realnosti do zapisa spremembe v bazi podatkov',
    'S časom od zahteve po informaciji do njene pridobitve (odzivnost)',
    'S številom podrobnosti, ki jih poročilo vsebuje za uporabnika'], 2],
  ['(Izpit) Kako delimo e-tržnice glede na usmerjenost?', [
    'Javne (za vse kupce) in zasebne (za izbrane poslovne partnerje)',
    'Horizontalne (več panog) in vertikalne (ena država ali regija)',
    'Nakupne (za kupce) in prodajne (za trgovce na drobno in debelo)'], 1],
  ['(Izpit) Prejemnik je podpis uspešno dešifriral s pošiljateljevim javnim ključem', [
    'Da je prejemnikov zasebni ključ še vedno varen in tajen',
    'Da je pošiljatelj sporočilo šifriral s prejemnikovim javnim ključem',
    'Da sporočila na poti ni nihče prebral niti prestregel'], 3],
  ['(Izpit) Katera NI ena od treh osnovnih etičnih teorij?', [
    'Maksimirati splošno družbeno dobro (utilitarizem)',
    'Maksimirati osebno dobro (egoizem)',
    'Pravilno obravnavati druge (dolžnost)'], 0, 'Maksimirati dobiček organizacije (profit)'],
  ['(Izpit) Kaj je informacijska zasebnost?', [
    'Zasebnost pošte, telefonskih pogovorov in elektronskih sporočil posameznika',
    'Pravica posameznika, da ga drugi pustijo pri miru in ga ne nadlegujejo',
    'Zaščita informacij, ki so intelektualna lastnina podjetja ali avtorja'], 2],
  ['(Izpit) Kaj velja za stroške nakupa celovite programske rešitve (ERP)?', [
    'Licence predstavljajo večino skupnih stroškov lastništva rešitve v prvih letih',
    'Po nakupu licenc dodatnih stroškov uvajanja in prilagajanja praviloma ni',
    'Stroški prilagajanja so nižji, če organizacija vnaprej ne opredeli svojih potreb'], 1],
  ['(Izpit) ERP ne pokrije vseh potreb podjetja. Katere so tri možnosti?', [
    'Kupiti drugi ERP, razviti lastno rešitev ali zaposliti več informatikov',
    'Uvesti sistem vzporedno, postopno ali pilotno v eni poslovni enoti',
    'Prenesti IS v oblak, na lastni strežnik ali k zunanjemu izvajalcu'], 3],
  ['(Izpit) Kaj je hrošč (bug)?', [
    'Program, ki se razmnožuje po omrežju brez gostitelja (črv)',
    'Koristen program s skritimi škodljivimi ukazi (trojanski konj)',
    'Program, ki vrine kopijo sebe v druge programe (virus)'], 0],
  ['(Izpit) Kakšen dostop do podatkovne baze je značilen za analitične uporabnike', [
    'Vnaprej pripravljene zaslonske maske za vnos in popravljanje podatkov',
    'Pripravljena tedenska poročila, ki se po vsebini in obliki ne spreminjajo',
    'Neposredno ažuriranje trenutnih vrednosti v operativni bazi podatkov'], 2],
  ['(Izpit) Kaj je funkcijska razdrobljenost (funkcijski silosi)?', [
    'Vsak oddelek ima popoln pregled nad procesom, zamude nastanejo le pri kupcu',
    'Podjetje ima en sam IS, ki tesno povezuje vse poslovne funkcije in oddelke',
    'Poslovni procesi potekajo v celoti znotraj enega samega oddelka'], 1],
];
