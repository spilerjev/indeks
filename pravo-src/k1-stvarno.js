// Pravo - 1. kolokvij - Deck 3: Stvarno pravo
module.exports = {
  id: "pk1-stvarno",
  name: "Stvarno pravo",
  questions: [
    {
      q: "Kaj ureja stvarno pravo?",
      options: [
        "Obveznostna razmerja med upniki in dolžniki",
        "Razmerja pripadnosti in oblasti na stvareh v pravnih razmerjih med posamezniki",
        "Prehod premoženja umrlega na druge osebe",
        "Statusna vprašanja gospodarskih družb"
      ],
      correct: 1,
      explanation: "Stvarno pravo je del civilnega prava, ki ureja razmerje pripadnosti in oblasti na stvareh. Je premoženjsko pravo; pravice so prenosljive (razen osebnih služnosti). Osrednji pravni vir je Stvarnopravni zakonik (SPZ)."
    },
    {
      q: "Katera je temeljna značilnost stvarnih pravic?",
      options: [
        "Relativnost - učinkujejo samo med strankama",
        "Absolutnost - učinkujejo proti vsem tretjim osebam",
        "Neprenosljivost",
        "Časovna omejenost na 10 let"
      ],
      correct: 1,
      explanation: "Temeljna značilnost je absolutnost (učinkovanje proti vsem - erga omnes). Klasične značilnosti še: avtonomija in abstraktnost. Število stvarnih pravic je omejeno z zakonom (numerus clausus), njihov predmet je individualno določena stvar."
    },
    {
      q: "Katere so stvarne pravice po SPZ?",
      options: [
        "Lastninska, zastavna, služnostna, stavbna pravica in pravica stvarnega bremena",
        "Lastninska pravica, posest, imetništvo, najem in zakup",
        "Lastninska, avtorska, patentna in znamkovna pravica",
        "Terjatev, dolg, poroštvo in hipoteka"
      ],
      correct: 0,
      explanation: "Stvarne pravice: lastninska pravica, zastavna pravica, služnost, stavbna pravica, stvarno breme (in zemljiški dolg). Posest NI pravica, ampak dejanska oblast, ki je pravno varovana.",
      wrong: {
        1: "Posest in imetništvo nista pravici; najem in zakup sta obligacijski razmerji."
      }
    },
    {
      type: "match",
      q: "Poveži načelo stvarnega prava z vsebino.",
      pairs: [
        { term: "Povezanost zemljišča in objekta", def: "Kar je trajno spojeno z nepremičnino (nad ali pod njo), je njena sestavina" },
        { term: "Domneva dobre vere", def: "Dobra vera se domneva, dokler se ne dokaže nasprotno" },
        { term: "Zaupanje v zemljiško knjigo", def: "Kdor se zanese na podatke v ZK, zaradi tega ne sme trpeti škodljivih posledic" },
        { term: "Prepoved zlorabe", def: "Stvarnih pravic ni dovoljeno izvrševati v nasprotju z njihovim namenom" }
      ],
      explanation: "Pomembna načela stvarnega prava po SPZ. Načelo povezanosti zemljišča in objekta (superficies solo cedit) pomeni, da zgradba deli usodo zemljišča - izjema je stavbna pravica in etažna lastnina."
    },
    {
      q: "Kakšna je razlika med posestjo in imetništvom?",
      options: [
        "Posest je pravica, imetništvo je dejansko stanje",
        "Posest je dejanska in izključna oblast nad stvarjo; imetnik izvršuje oblast ZA DRUGEGA po njegovih navodilih (npr. natakar)",
        "Imetnik ima vedno tudi lastninsko pravico, posestnik ne",
        "Razlike ni - pojma sta sinonima"
      ],
      correct: 1,
      explanation: "Posest = dejanska in izključna oblast nad stvarjo (ni pravica, je pa pravno varovana - varuje se posest ne glede na pravico do posesti). Imetništvo = izvrševanje dejanske oblasti za drugega, po navodilih druge osebe (natakar v restavraciji)."
    },
    {
      q: "Katera upravičenja daje lastninska pravica?",
      options: [
        "Samo uporabo stvari",
        "Posest, uporabo in uživanje ter razpolaganje s stvarjo",
        "Samo razpolaganje in obremenitev",
        "Uporabo stvari z dovoljenjem države"
      ],
      correct: 1,
      explanation: "Lastninska pravica omogoča imeti stvar v posesti, jo uporabljati in uživati ter z njo razpolagati. Omejitve lahko določi le zakon. Ustavnopravno je lastnina splošna pravica posameznika do pridobivanja premoženja."
    },
    {
      q: "Na katerih podlagah se pridobi lastninska pravica?",
      options: [
        "Samo s pravnim poslom",
        "S pravnim poslom, dedovanjem, zakonom ali odločbo državnega organa",
        "Samo z vpisom v zemljiško knjigo",
        "S posestjo, ki traja vsaj eno leto"
      ],
      correct: 1,
      explanation: "Štiri pridobitne podlage: pravni posel, dedovanje, zakon (npr. priposestvovanje) in odločba državnega organa. Pri pravnem poslu so pogoji: prenosnik je lastnik, veljaven zavezovalni posel in razpolagalni posel; za nepremičnine še vpis v zemljiško knjigo."
    },
    {
      q: "Kaj je zemljiškoknjižno dovolilo (intabulacijska klavzula)?",
      options: [
        "Sodna odločba o vpisu lastninske pravice",
        "Izrecna in nepogojna izjava tistega, čigar pravica se prenaša, da dovoljuje vpis v ZK; podpis mora biti notarsko overjen",
        "Potrdilo notarja o plačilu davka na promet nepremičnin",
        "Dovoljenje upravne enote za gradnjo"
      ],
      correct: 1,
      explanation: "Zemljiškoknjižno dovolilo je izrecna in nepogojna izjava osebe, čigar pravica se prenaša, spreminja, obremenjuje ali preneha, da dovoljuje vpis v zemljiško knjigo; podpis mora biti notarsko overjen. Lastninska pravica na premičnini pa se prenese z izročitvijo v posest pridobitelja."
    },
    {
      q: "Kakšni sta priposestvovalni dobi za premičnine in nepremičnine?",
      options: [
        "1 leto za premičnine, 5 let za nepremičnine",
        "3 leta za premičnine, 10 let za nepremičnine",
        "5 let za premičnine, 20 let za nepremičnine",
        "10 let za premičnine, 30 let za nepremičnine"
      ],
      correct: 1,
      explanation: "Priposestvovanje zahteva dobroverno lastniško posest: 3 leta za premičnine, 10 let za nepremičnine. Pogoji: dobra vera (misliš, da je stvar tvoja), lastniška posest (obnašaš se kot lastnik) in potek dobe. Priposestvovati je mogoče tudi stvarno služnost."
    },
    {
      q: "Najditelj premičnine pridobi lastninsko pravico:",
      options: [
        "takoj, ko stvar najde",
        "s pretekom enega leta od obvestila/prijave, če upravičenec ni zahteval izročitve in je stvar še v hrambi najditelja ali policije",
        "nikoli - najdena stvar vedno pripade državi",
        "po treh letih dobroverne posesti"
      ],
      correct: 1,
      explanation: "Pri najdbi: lastninska pravica po 1 letu od obvestila ali prijave, če upravičenec ni zahteval izročitve. Najdeni zaklad pa pripada po enakih delih najditelju in lastniku premičnine/nepremičnine."
    },
    {
      q: "Kako preneha lastninska pravica?",
      options: [
        "Samo s prodajo stvari",
        "Če jo pridobi kdo drug, z opustitvijo, s fizičnim uničenjem stvari ali v drugih zakonskih primerih",
        "Samo s smrtjo lastnika",
        "Z neuporabo stvari več kot 10 let"
      ],
      correct: 1,
      explanation: "Prenehanje: pridobitev s strani drugega, opustitev (premičnina postane nikogaršnja; velja samo pri premičninah - nepremičnine ne moreš kar opustiti), fizično uničenje, drugi zakonski primeri."
    },
    {
      q: "Kakšna je razlika med solastnino in skupno lastnino?",
      options: [
        "Pri solastnini so deleži računsko določeni, pri skupni lastnini deleži niso vnaprej določeni in lastniki odgovarjajo solidarno",
        "Pri skupni lastnini so deleži določeni, pri solastnini ne",
        "Solastnina je mogoča samo na nepremičninah",
        "Razlike ni - gre za isti institut"
      ],
      correct: 0,
      explanation: "Solastnina: vsakemu pripada računsko določen delež (če niso določeni, so enaki); solastnik lahko vedno zahteva delitev (razen ob neprimernem času). Skupna lastnina: deleži niso vnaprej določeni, lastniki stvar skupno uporabljajo in SOLIDARNO odgovarjajo (npr. zakonca, sodediči)."
    },
    {
      q: "Kakšno soglasje solastnikov je potrebno za posle rednega upravljanja stvari?",
      options: [
        "Soglasje vseh solastnikov",
        "Soglasje solastnikov, katerih deleži sestavljajo več kot polovico vrednosti stvari",
        "Odločitev sodišča",
        "Zadostuje odločitev kateregakoli solastnika"
      ],
      correct: 1,
      explanation: "Redno upravljanje: soglasje deležev nad 1/2 vrednosti. Posli, ki presegajo redno upravljanje (razpolaganje s celotno stvarjo, določitev načina rabe, določitev upravitelja): soglasje VSEH. Solastniki imajo pri prodaji predkupno pravico; stroške krijejo sorazmerno z deleži."
    },
    {
      q: "Kdaj morajo etažni lastniki določiti upravnika in ustanoviti rezervni sklad?",
      options: [
        "Vedno, ne glede na velikost stavbe",
        "Če ima nepremičnina več kot 2 etažna lastnika in več kot 8 posameznih delov",
        "Če ima stavba več kot 5 nadstropij",
        "Samo če tako odloči sodišče"
      ],
      correct: 1,
      explanation: "Etažna lastnina = lastnina posameznega dela zgradbe + solastnina skupnih delov (streha, stopnice, dvigalo). Nastane s pravnim poslom ali odločbo sodišča + vpisom v ZK. Pri več kot 2 lastnikih in več kot 8 delih: obvezen upravnik in rezervni sklad. Medsebojna razmerja uredijo s pisno pogodbo."
    },
    {
      q: "S katerimi tožbami se varuje lastninska pravica?",
      options: [
        "Lastninska, publicijanska in negatorna tožba",
        "Pritožba, ugovor in revizija",
        "Izbrisna in izpodbojna tožba",
        "Posestna in odškodninska tožba"
      ],
      correct: 0,
      explanation: "Varstvo lastninske pravice: lastninska tožba (rei vindicatio - zahteva vrnitev stvari), publicijanska tožba (varstvo dobrovernega lastniškega posestnika) in negatorna tožba (proti vznemirjanju)."
    },
    {
      q: "Kaj je zastavna pravica?",
      options: [
        "Pravica uporabljati tujo stvar za lastne potrebe",
        "Omejena stvarna pravica na tuji stvari, ki upniku omogoča poplačilo zavarovane terjatve iz vrednosti zastavljenega predmeta pred drugimi upniki",
        "Pravica države zaseči premoženje dolžnika",
        "Obligacijska pravica upnika do obresti"
      ],
      correct: 1,
      explanation: "Zastavna pravica služi zavarovanju terjatve: ob neplačilu ob zapadlosti se zastavni upnik poplača (z obrestmi in stroški) iz vrednosti zastavljenega predmeta PRED vsemi drugimi upniki. Predmet: stvari, pravice, vrednostni papirji. Izvršitev: sodna ali zunajsodna prodaja."
    },
    {
      q: "Katera trditev o hipoteki je NAPAČNA?",
      options: [
        "Je neposestna zastavna pravica na nepremičninah - zastavitelj nepremičnino obdrži in jo uporablja",
        "Če je terjatev delno plačana, se hipoteka sorazmerno zmanjša",
        "Na isti nepremičnini se lahko ustanovi več hipotek",
        "Nastane s pisno pogodbo, notarskim zapisom, sodno odločbo ali zakonom - vedno z vpisom v ZK"
      ],
      correct: 1,
      explanation: "Hipoteka zavaruje terjatev vse do njenega DOKONČNEGA poplačila - delno plačilo je ne zmanjša. Ostale trditve držijo. Ničen je dogovor, da zastavljena stvar ob neplačilu preide v last upnika (komisorni dogovor) ali da se proda po vnaprej določeni ceni.",
      given: "Pri solastnini lahko vsak solastnik ustanovi hipoteko na svojem idealnem deležu brez soglasja; pri skupni lastnini je hipoteka mogoča le na celotni nepremičnini."
    },
    {
      q: "Kako nastane neposestna zastavna pravica na premičninah?",
      options: [
        "Z izročitvijo premičnine upniku",
        "Z notarskim zapisom - premičnina ostane v posesti zastavitelja",
        "Z vpisom v zemljiško knjigo",
        "Z ustnim dogovorom strank"
      ],
      correct: 1,
      explanation: "Neposestna zastavna pravica na premičninah nastane z notarskim zapisom; stvar (lahko tudi zaloge ali poslovna oprema) ostane v posesti zastavitelja, ki jo lahko ekonomsko uporablja. Ročna zastava (pignus) pa nastane z zastavno pogodbo IN izročitvijo premičnine upniku v neposredno posest; upnik jo hrani kot dober gospodar in je ne sme uporabljati ali prodati brez dovoljenja."
    },
    {
      q: "Kakšna je razlika med stvarno in osebno služnostjo?",
      options: [
        "Stvarna služi drugi nepremičnini in prehaja na pravne naslednike; osebna je ustanovljena v korist osebe in je časovno omejena",
        "Osebna služnost prehaja na dediče, stvarna ne",
        "Stvarna služnost je vedno odplačna, osebna neodplačna",
        "Razlika je samo v načinu vpisa v ZK"
      ],
      correct: 0,
      explanation: "Stvarna služnost: služeča nepremičnina služi gospodujoči nepremičnini; imetnik je lastnik gospodujoče nepremičnine; prehaja na naslednike; mogoče jo je priposestvovati. Osebne služnosti (užitek, raba, služnost stanovanja): v korist osebe, časovno omejene, neprenosljive. Nastanejo z zakonom, pravnim poslom ali odločbo organa."
    },
    {
      q: "Kaj je stvarno breme?",
      options: [
        "Pravica uporabljati tujo stvar",
        "Pravica, na podlagi katere je vsakokratni lastnik obremenjene nepremičnine zavezan k prihodnjim ponavljajočim se dajatvam ali storitvam",
        "Prepoved gradnje na sosednjem zemljišču",
        "Davčna obveznost lastnika nepremičnine"
      ],
      correct: 1,
      explanation: "Stvarno breme zahteva AKTIVNO ravnanje (ponavljajoče se dajatve/storitve) - za razliko od služnosti, ki je pasivna (dopustitev/opustitev). Nepremičnina jamči za posamične izpolnitve. Ustanovi se z zakonom ali pravnim poslom (ZK dovolilo + vpis v ZK)."
    },
    {
      q: "Kaj je stavbna pravica?",
      options: [
        "Pravica imeti v lasti zgrajeno zgradbo nad ali pod tujo nepremičnino",
        "Dovoljenje za gradnjo, ki ga izda upravna enota",
        "Pravica souporabe skupnih delov stavbe",
        "Služnost napeljave komunalnih vodov"
      ],
      correct: 0,
      explanation: "Stavbna pravica = pravica imeti v lasti zgradbo nad ali pod tujo nepremičnino (izjema od načela superficies solo cedit). Imetnik nepremičnino uporablja in uživa; lahko je za določen ali nedoločen čas; je prenosljiva."
    }
  ]
};
