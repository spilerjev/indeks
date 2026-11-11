// Informatika: težji napačni odgovori (verjetne zamenjave sorodnih pojmov, podobne dolžine)
module.exports = [
  // ---- 1. kolokvij (novo)
  ['Kaj je podatkovna baza?', [
    'Poljubna zbirka datotek in dokumentov, shranjena na strežniku podjetja',
    'Zbirka programov, ki omogoča vnos, spreminjanje in brisanje podatkov',
    'Nestrukturirana shramba vseh podatkov podjetja v njihovi surovi obliki'], 0,
    'Strukturirana zbirka medsebojno povezanih podatkov na računalniškem nosilcu'],
  ['Kdaj uporabimo sestavljeni ključ?', [
    'Ko tabela vsebuje več kot deset stolpcev in je iskanje počasno',
    'Ko želimo dve tabeli povezati prek skupnega atributa (tuji ključ)',
    'Ko atribut vsebuje več vrednosti hkrati, npr. ocene pri predmetih'], 3,
    'Ko entitet ni mogoče enolično ločiti z enim samim atributom'],
  ['Čemu je namenjen standard OSI?', [
    'Zaščiti podatkov pred nepooblaščenim dostopom v omrežju podjetja',
    'Določanju enotnih cen komunikacijskih storitev med operaterji',
    'Pretvorbi domenskih imen računalnikov v njihove naslove IP'], 1,
    'Povezovanju opreme različnih proizvajalcev s skupnimi protokoli'],
  ['Katera naprava povezuje krajevna omrežja in usmerja pakete IP', [
    'Zvezdišče (hub)',
    'Stikalo (switch)',
    'Strežnik DNS'], 2, 'Usmerjevalnik (router)'],
  ['Kakšna je razlika med internetom in svetovnim spletom?', [
    'Splet je omrežje omrežij (TCP/IP), internet je storitev za spletne strani',
    'Internet je omrežje za podjetja, splet pa za zasebne uporabnike',
    'Internet deluje prek žičnih povezav, splet pa prek brezžičnih omrežij'], 3,
    'Internet je omrežje omrežij (TCP/IP), splet je ena njegovih storitev'],
  ['Kaj omogoča navidezno zasebno omrežje (VPN)?', [
    'Podjetje zgradi lastno fizično povezavo med vsemi poslovalnicami',
    'Več podjetij si prek ekstraneta deli skupen intranet brez šifriranja',
    'Uporabnik dostopa do interneta brez ponudnika dostopa (ISP)'], 0,
    'Šifrirano vključitev oddaljenega računalnika v omrežje podjetja'],
  // ---- 2. kolokvij (novo)
  ['Kaj je značilno za transakcijske informacijske sisteme (TPS)?', [
    'Podpirajo načrtovanje in nadzor ter dejansko stanje primerjajo z načrtom',
    'Samodejno iščejo prej neznane vzorce v velikih količinah podatkov',
    'Managerjem ponujajo agregirane, ne nujno zelo natančne podatke'], 2,
    'Hranijo podatke o ponavljajočih se transakcijah, skoraj povsem avtomatizirani'],
  ['Kaj so otoki informacij?', [
    'Oddaljene poslovalnice, ki niso priključene na internet',
    'Področna podatkovna skladišča za posamezne oddelke',
    'Podatki podjetja, shranjeni pri ponudniku v oblaku'], 1,
    'Nepovezani IS v isti organizaciji brez pretoka informacij'],
  ['Kaj se zgodi, če različne funkcije v podjetju nimajo istega IS?', [
    'Vsaka funkcija dela hitreje, ker ni odvisna od drugih oddelkov',
    'Podjetje ima nižje stroške, ker ne potrebuje centralne baze',
    'Nič, če ima vsak oddelek dovolj zmogljivo strojno opremo'], 3,
    'Podatke vnašamo večkrat, nastajajo napake in zamude'],
  ['Kaj je upravljalna zanka?', [
    'Zaporedje faz razvoja IS od načrtovanja do vzdrževanja',
    'Ponavljajoč se postopek varnostnega kopiranja baze podatkov',
    'Povezava med podatkovnim skladiščem in orodji za OLAP'], 1,
    'Povratna zveza med operativnim in upravljalnim podsistemom'],
  ['Kaj je problem v splošnem modelu upravljanja?', [
    'Pomanjkanje podatkov v podatkovni bazi',
    'Omejitev, ki jo sistemu postavi okolje',
    'Napaka v programski opremi (hrošč)'], 0,
    'Razlika med želenim in dejanskim stanjem'],
  ['Kateri problem je nestrukturiran?', [
    'Optimizacija zalog',
    'Obračun mesečnih plač',
    'Izračun anuitete kredita'], 3, 'Izbira novega direktorja'],
  ['Kaj počne transformacijski in integracijski sloj?', [
    'Prikazuje managerjem ključne kazalnike na nadzorni plošči',
    'Šifrira podatke, preden jih podjetje pošlje v oblak',
    'Briše stare zgodovinske podatke iz podatkovnega skladišča'], 1,
    'Čisti in poenoti podatke iz operativnih virov (šifre, datumi)'],
  ['Kaj je podatkovno rudarjenje?', [
    'Izdelava poljubnih pogledov na podatke v obliki vrtilnih tabel',
    'Prenos zgodovinskih podatkov iz operativne baze v skladišče',
    'Ročni pregled poročil, ki jih pripravi služba za informatiko'], 2,
    'Avtomatizirano iskanje prej neznanih vzorcev v velikih podatkih'],
  ['Kaj je analiza nakupne košarice?', [
    'Določanje skupin kupcev z enakimi vzorci obnašanja',
    'Spodbujanje obstoječih kupcev k ponovnim nakupom',
    'Spremljanje poti obiskovalcev po spletnem mestu'], 0,
    'Iskanje povezav med prodajo različnih izdelkov'],
  ['Katera dva ključna elementa sestavljata poslovnointeligenčni sistem?', [
    'Transakcijska baza in uporabniški vmesnik za vnos podatkov',
    'Strojna oprema za skladiščenje in programi za šifriranje',
    'Spletna trgovina in sistem za upravljanje odnosov s strankami'], 3,
    'Kakovostni integrirani podatki ter dostop do njih in analiza'],
  ['Kaj je značilno za uporabo podatkov na analitični ravni?', [
    'Podatki se pogosto posodabljajo in se ne smejo podvajati',
    'Zanesljivost mora biti zelo visoka, čas dostopa pa kratek',
    'Način uporabe podatkov se le redko kdaj spreminja'], 2,
    'Zanimajo nas tudi zgodovinski podatki, podvajanje ni problem'],
  // ---- 3. kolokvij in izpit (novo)
  ['Kakšna je razlika med e-commerce in e-business?', [
    'E-commerce je širši in vključuje vse oblike elektronske komunikacije',
    'E-commerce velja samo za B2B, e-business pa samo za B2C poslovanje',
    'Med njima ni razlike, oba sta sinonima za prodajo prek spleta'], 1,
    'E-business je širši: vključuje tudi sodelovanje s partnerji in zaposlenimi'],
  ['Kaj je zasebna e-tržnica?', [
    'E-tržnica, na kateri lahko kupuje in prodaja kdor koli brez omejitev',
    'Spletna trgovina, v kateri podjetje prodaja izključno svoje izdelke',
    'Spletno mesto, ki na enem mestu združuje več neodvisnih e-trgovin'], 3,
    'E-tržnica za oskrbo podjetja, ki je njen lastnik'],
  ['V čem se e-trgovina razlikuje od e-tržnice?', [
    'V e-trgovini se kupec za ceno vedno pogaja, na e-tržnici nikoli',
    'E-trgovina je za podjetja, e-tržnica je izključno za potrošnike',
    'E-trgovina deluje le v okviru zasebnega intraneta podjetja'], 0,
    'V e-trgovini prodaja en prodajalec, na tržnici jih je več'],
  ['Kaj je VMI (vendor managed inventory)?', [
    'Trgovec sam vodi zaloge in ročno naroča blago pri dobaviteljih',
    'Dobavitelj prodaja blago neposredno kupcem, brez trgovca',
    'Trgovec hrani svoje zaloge v skladišču dobavitelja do prodaje'], 1,
    'Zaloge pri trgovcu vodi dobavitelj, naročila sproži IS sam'],
  ['Kaj je skrajšana oskrbovalna veriga?', [
    'Veriga, iz katere so izločeni vsi posredniki',
    'Veriga, v kateri podjetje samo izdela vse dele',
    'Veriga z največ tremi dobavitelji materiala'], 2,
    'E-poslovanje med obstoječimi členi verige'],
  ['Kaj je trojanski konj?', [
    'Programska napaka, ki je osnovni problem računalniških sistemov',
    'Program, ki se brez gostitelja razmnožuje po računalniškem omrežju',
    'Program, ki med brskanjem prikazuje neželene oglase uporabniku'], 0,
    'Uporaben program s skritimi ukazi, ki ob pogoju povzročijo škodo'],
  ['Kateri način uvajanja IS je najmanj tvegan?', [
    'Neposreden prehod na nov sistem',
    'Postopen prehod brez testiranja',
    'Prehod brez urjenja uporabnikov'], 3, 'Vzporedno delovanje obeh sistemov'],
  ['Katera tri področja znanj potrebujejo zaposleni v službi za informatiko?', [
    'Programiranje, računalniška omrežja in podatkovne baze',
    'Računovodstvo, trženje in upravljanje človeških virov',
    'Matematika, statistika in ekonomska teorija'], 1,
    'Znanja IT, managerska in poslovna znanja'],
  ['Kaj pomeni standard ISO/IEC 27001 za podjetje?', [
    'Upravljanje kakovosti izdelkov in storitev v proizvodnji',
    'Okoljsko ravnanje in zmanjševanje izpustov podjetja',
    'Varnost in zdravje zaposlenih pri delu z računalniki'], 0,
    'Upravljanje informacijske varnosti v podjetju'],
  ['Katera je slabost varnosti z gesli?', [
    'Gesla ni mogoče spremeniti, ko je enkrat nastavljeno',
    'Geslo vedno pozna tudi skrbnik sistema v podjetju',
    'Geslo deluje samo znotraj krajevnega omrežja LAN'], 2,
    'Geslo lahko pozabimo, uganemo ali ga kdo izvabi'],
  ['ERP kupimo in prilagodimo lastnim potrebam', [
    'Prilagajanje rešitve je cenejše, ker procesov ni treba spreminjati',
    'Prilagoditev procesov ni mogoča, ker so procesi določeni z zakonom',
    'Med pristopoma ni razlike v stroških, tveganju ali času uvedbe'], 1,
    'Prilagajanje rešitve je drago in tvegano, procesi dobijo najboljšo prakso'],
  ['Ali informatika podjetju sama po sebi zagotavlja konkurenčno prednost?', [
    'Da, vsaka naložba v IT samodejno poveča dobiček podjetja',
    'Ne, IT nima vpliva, ker jo uporabljajo vsa podjetja',
    'Da, a samo pri podjetjih, ki prodajajo prek spleta'], 3,
    'Ne, le če je IS boljši in bolje izkoriščen kot pri tekmecih'],

  // ---- stari kvizi (biz, is, varnost, ai, blockchain)
  ['Kaj je značilno za operativno bazo podatkov (database)?', [
    'Hrani vse vrste podatkov v surovi obliki za projekte UI',
    'Hrani očiščene podatke iz več virov za letno poročanje',
    'Hrani le zgodovinske podatke, ki se ne posodabljajo'], 1,
    'Optimizirana je za vsakodnevne transakcije'],
  ['Kaj je Data Warehouse (DWH)?', [
    'Shramba vseh vrst podatkov v surovi obliki za strojno učenje',
    'Operativna baza, ki beleži transakcije v realnem času',
    'Orodje za vizualizacijo podatkov na nadzornih ploščah'], 2,
    'Centralno skladišče očiščenih podatkov iz več virov za analitiko'],
  ['Kaj je Data Lake?', [
    'Skladišče izključno strukturiranih in očiščenih podatkov',
    'Operativna transakcijska baza za vsakodnevno poslovanje',
    'Orodje za izdelavo standardnih poročil za management'], 0,
    'Shramba vseh vrst podatkov v surovi obliki'],
  ['Katera je ključna razlika med DWH in Data Lake?', [
    'DWH hrani surove podatke za UI, Data Lake urejene podatke za poročila',
    'DWH je namenjen transakcijam, Data Lake pa letnemu poročanju',
    'Data Lake je vedno dražji za shranjevanje kot podatkovno skladišče'], 3,
    'DWH je urejen za poročanje, Data Lake surov za napredno analitiko'],
  ['Kateri primer najbolje ponazarja operativno bazo (database)?', [
    'Skladišče podatkov za letno poročanje',
    'Jezero surovih dnevniških datotek',
    'Nadzorna plošča v Power BI za upravo'], 1,
    'ERP, ki beleži naročila v realnem času'],
  ['Kaj je značilno za najvišjo, KOGNITIVNO raven analitike?', [
    'Sistem predlaga optimalno odločitev, odloči človek',
    'Sistem napove, kaj se bo zgodilo v prihodnosti',
    'Sistem pojasni, zakaj se je nekaj zgodilo'], 3,
    'Sistem se uči in odloča avtonomno (UI)'],
  ['Kaj sestavlja data-driven (na podatkih temelječ) pristop', [
    'Zbiranje podatkov + intuicija + izkušnje vodstva',
    'Vizualizacija podatkov + poročila + nadzorne plošče',
    'Podatkovno skladišče + Data Lake + operativna baza'], 0,
    'Interpretacija podatkov + analitika + odločanje'],
  ['Za kateri namen je Data Lake najbolj primeren?', [
    'Za hitre vsakodnevne transakcije v ERP sistemu',
    'Za strogo strukturirano finančno poročanje upravi',
    'Za nadomestitev operativne baze v trgovini'], 3,
    'Za projekte ML/UI z raznolikimi surovimi podatki'],
  ['Pri analizi stroškov in koristi izberemo alternativo z', [
    'najnižjimi začetnimi stroški nakupa in uvedbe',
    'najkrajšim časom uvedbe in najmanj tveganja',
    'največjim številom funkcij za uporabnike'], 1,
    'največjo razliko med dolgoročnimi koristmi in stroški'],
  ['Kateri dve smeri vplivata na strateški načrt digitalizacije?', [
    'Stroški (navzgor) in koristi (navzdol)',
    'Strojna (navzgor) in programska oprema (navzdol)',
    'Trženje (navzgor) in prodaja (navzdol)'], 0,
    'Poslovne potrebe (navzgor) in vpliv IT (navzdol)'],
  ["Kaj pomeni 'technology for technology's sake'?", [
    'Uvedba tehnologije, ker jo uporablja konkurenca',
    'Uvedba tehnologije, ki je brezplačna ali odprtokodna',
    'Uvedba tehnologije za izobraževanje zaposlenih'], 2,
    'Uvedba tehnologije samo zato, ker je nova'],
  ['Kaj vsebuje strateški načrt podjetja?', [
    'Proračun, kadrovski načrt in investicije',
    'Projekte prenove in razvoja posameznih IS',
    'Arhitekturo strojne in programske opreme'], 3,
    'Poslanstvo, vizijo, cilje in smernice'],
  ['Katera NI eden od štirih izidov managementa tveganj?', [
    'Sprejetje tveganja',
    'Zmanjšanje tveganja',
    'Prenos tveganja (zavarovanje)'], 3, 'Prikrivanje tveganja'],
  ['Socialni inženiring izkorišča predvsem:', [
    'tehnične ranljivosti operacijskega sistema',
    'napake v strojni opremi in gonilnikih',
    'šibko šifriranje gesel v podatkovni bazi'], 0,
    'človekove slabosti in psihološko manipulacijo'],
  ['Pri BEC napadu (Business Email Compromise) napadalci nazadnje:', [
    'šifrirajo datoteke in zahtevajo odkupnino',
    'izbrišejo podatkovno bazo in varnostne kopije',
    'objavijo ukradene podatke na temnem spletu'], 3,
    'na računu spremenijo bančni račun in ga pošljejo'],
  ['Glavna slabost simetričnega šifriranja je:', [
    'počasnost pri šifriranju velikih datotek',
    'ključ je predolg za uporabo na spletu',
    'ne omogoča šifriranja besedila in slik'], 2,
    'problem varne izmenjave skupnega ključa'],
  ['Kdo izda digitalno potrdilo?', [
    'Banka imetnika',
    'Ponudnik interneta',
    'Imetnik sam sebi'], 1, 'Overitelj (CA), npr. SIGEN-CA'],
  ['Kaj je Turing prispeval leta 1950?', [
    'Uvedel je termin "umetna inteligenca"',
    'Razvil je prvi šahovski računalnik Deep Blue',
    'Zgradil je prvi računalnik s shranjenim programom'], 3,
    "Delo 'Computing Machinery and Intelligence' (Turingov test)"],
  ['Kaj velja za halucinacije LLM?', [
    'So programska napaka, ki jo razvijalci zlahka odpravijo',
    'Pojavljajo se le pri starejših in manjših modelih',
    'Nastanejo, ker model namerno zavaja uporabnika'], 0,
    'So lastnost: odgovori so le statistično verjetni'],
  ["Kaj ilustrira primer 'king − man + woman ≈ queen'?", [
    'Pravila slovnice, vgrajena v model',
    'Asimetrično šifriranje besedila',
    'Učenje z ljudskimi povratnimi informacijami'], 2,
    'Pomenske odnose med besedami (embedding)'],
  ['Kaj je RLHF?', [
    'Retrieval with large hybrid filters',
    'Recursive learning of hidden features',
    'Rule-based logic for human feedback'], 1,
    'Reinforcement learning from human feedback'],
  ["Kaj je 'knowledge cutoff'?", [
    'Največja dolžina odgovora modela',
    'Meja, po kateri model zavrne vprašanje',
    'Največja količina besedila v pozivu'], 3,
    'Datum, po katerem model ne pozna dogodkov'],
  ['Razlika med modelom in orodjem:', [
    'Model = vmesnik, orodje = inteligenca',
    'Model = strojna, orodje = programska oprema',
    'Model = podatki, orodje = algoritem'], 2, 'Model = inteligenca, orodje = vmesnik'],
  ['Kaj je glavni doprinos generativne UI v primerjavi s tradicionalno?', [
    'Natančneje razvršča obstoječe podatke',
    'Hitreje napoveduje številske vrednosti',
    'Samodejno čisti podatke v skladišču'], 0,
    'Ustvarja nove vsebine (besedilo, slike, kodo)'],
  ['Leta 1997 je IBM Deep Blue:', [
    'prvič opravil Turingov test',
    'premagal prvaka v igri go',
    'zmagal v kvizu Jeopardy!'], 1, 'premagal šahovskega prvaka Kasparova'],
  ['Globoko učenje (Deep Learning) temelji na:', [
    'odločitvenih drevesih',
    'ekspertnih pravilih',
    'linearni regresiji'], 3, 'umetnih nevronskih mrežah'],
  ["Kaj je 'umetna gotovost' (artificial certainty)?", [
    'Visoka točnost izračunov modela pri matematičnih nalogah',
    'Zanesljivost strojne opreme, na kateri teče model',
    'Stopnja zaupanja, ki jo model pripiše vsakemu odgovoru'], 0,
    'Iluzija strokovnosti zaradi avtoritativno zvenečih odgovorov'],
  ['Na čem temelji blockchain?', [
    'na centralni bazi pri eni banki',
    'na enem strežniku v oblaku',
    'na omrežju SWIFT med bankami'], 1, 'na distribuirani glavni knjigi'],
  ['Kdo potrdi vsak dogodek v glavni knjigi?', [
    'centralna banka',
    'en sam validator',
    'lastnik omrežja'], 0, 'večina udeležencev'],
  ['Kaj so pametne pogodbe?', [
    'pogodbe, ki jih overi notar v elektronski obliki',
    'pogodbe, ki jih sestavi umetna inteligenca',
    'elektronsko podpisane pogodbe v PDF obliki'], 3,
    'programi, ki se izvršijo ob izpolnitvi pogojev'],
  ['Kateri izziv se nanaša na porabo energije?', [
    'Validacija transakcij traja več ur',
    'Glavna knjiga zaseda preveč prostora',
    'Omrežje potrebuje stalen dostop do interneta'], 0,
    'Rudarjenje bitcoina porabi več kot Norveška'],
  ['Kaj je DeFi?', [
    'Digitalni denar, ki ga izda centralna banka',
    'Finančne storitve bank prek mobilne aplikacije',
    'Zasebna podjetniška platforma za blockchain'], 2,
    'Decentralizirane finance brez bank in posrednikov'],
  ['Kaj je DAO?', [
    'Distributed asset ownership',
    'Digital audit operation',
    'Data access object'], 1, 'Decentralizirana avtonomna organizacija'],
  ['Katera platforma je zasebna/podjetniška?', [
    'Ethereum Mainnet',
    'Bitcoin Core',
    'Solana Network'], 3, 'Hyperledger Fabric'],
  ['Koncentracija moči pri blockchainu se kaže predvsem prek:', [
    'centralnih bank in regulatorjev',
    'vlad, ki omejujejo omrežje',
    'razvijalcev pametnih pogodb'], 0, 'rudarskih skupin (mining pools)'],
];
