// Pravo - 1. kolokvij - Deck 2: Pravo EU
module.exports = {
  id: "pk1-eu",
  name: "Pravo EU",
  questions: [
    {
      q: "Po čem se EU razlikuje od klasičnih mednarodnih organizacij?",
      options: [
        "Nastala je brez mednarodne pogodbe",
        "Njene institucije lahko sprejemajo zakonodajo z neposrednimi pravnimi učinki v državah članicah",
        "Nima lastnih institucij",
        "Njeno pravo velja samo, če ga potrdi nacionalni parlament"
      ],
      correct: 1,
      explanation: "EU je nastala z mednarodno pogodbo kot druge mednarodne organizacije, loči pa se po: institucionalni sestavi (evropski skupni interes), obsežnem prenosu pristojnosti in lastnem pravnem redu, neodvisnem od prava DČ. Njena zakonodaja ima neposredne pravne učinke."
    },
    {
      q: "Na katerih pogodbah temelji pravo EU?",
      options: [
        "Na Rimski deklaraciji in Schengenskem sporazumu",
        "Na Pogodbi o EU, Pogodbi o delovanju EU in Listini EU o temeljnih pravicah",
        "Na Evropski konvenciji o človekovih pravicah",
        "Na ustavah držav članic"
      ],
      correct: 1,
      explanation: "Pravo EU temelji na PEU, PDEU in Listini EU o temeljnih pravicah ter na sodni praksi Sodišča EU. Je nadnacionalno pravo - ima prednost pred nacionalnim."
    },
    {
      q: "Katere so štiri glavne svoboščine skupnega trga EU?",
      options: [
        "Prost pretok blaga, storitev (in svoboda ustanavljanja), prosto gibanje delavcev/oseb in prost pretok kapitala",
        "Svoboda govora, tiska, vere in združevanja",
        "Prost pretok blaga, carin, davkov in subvencij",
        "Svoboda potovanja, dela, šolanja in upokojevanja"
      ],
      correct: 0,
      explanation: "Štiri svoboščine: prost pretok blaga, prost pretok storitev in svoboda ustanavljanja, prosto gibanje delavcev/oseb, prost pretok kapitala. Tipične ovire, ki so prepovedane: carine in dajatve z enakim učinkom, diskriminatorna notranja obdavčitev, količinske omejitve."
    },
    {
      q: "Katerih je sedem uradnih institucij EU?",
      options: [
        "Parlament, Evropski svet, Svet, Komisija, Sodišče EU, ECB, Računsko sodišče",
        "Parlament, Svet Evrope, Komisija, NATO, ECB, Sodišče EU, Europol",
        "Parlament, Svet, Komisija, Evropska investicijska banka, ECB, Sodišče EU, Odbor regij",
        "Parlament, Evropski svet, Svet, Komisija, Varuh človekovih pravic, ECB, Eurostat"
      ],
      correct: 0,
      explanation: "Sedem institucij: Evropski parlament, Evropski svet, Svet (EU), Evropska komisija, Sodišče EU, Evropska centralna banka, Računsko sodišče. Pozor: Svet Evrope NI institucija EU."
    },
    {
      q: "Kdo sestavlja Svet (EU)?",
      options: [
        "Predsedniki držav ali vlad držav članic",
        "Po en predstavnik vsake DČ na ministrski ravni, pooblaščen za prevzemanje obveznosti v imenu svoje vlade",
        "Neposredno izvoljeni poslanci",
        "Po en komisar iz vsake države članice"
      ],
      correct: 1,
      explanation: "Svet sestavljajo ministri DČ; sestava ni fiksna, menja se glede na tematiko. Delo pripravlja Odbor stalnih predstavnikov (Coreper). Svetu vsake pol leta predseduje ena država članica. Je najpomembnejši zakonodajni organ (zakonodajno moč si deli s Parlamentom).",
      wrong: {
        0: "To je Evropski svet - najvišje politično telo, ki ne sprejema zakonov."
      }
    },
    {
      q: "Kaj je kvalificirana (dvojna) večina pri odločanju Sveta?",
      options: [
        "Vsaj 55 % držav članic, ki predstavljajo vsaj 65 % prebivalstva EU",
        "Vsaj 65 % držav članic, ki predstavljajo vsaj 55 % prebivalstva EU",
        "2/3 vseh držav članic",
        "Soglasje vseh držav članic"
      ],
      correct: 0,
      explanation: "Dvojna večina: vsaj 55 % DČ + vsaj 65 % prebivalstva EU. Svet tako odloča, razen ko pogodbe določajo drugače. Soglasje (veto) je potrebno za temeljne ukrepe (sprejem novih članic), navadna večina za odločitve brez neposrednega spreminjanja zakonodaje."
    },
    {
      q: "Kje je uradni sedež Evropskega parlamenta?",
      options: [
        "Bruselj",
        "Strasbourg",
        "Luksemburg",
        "Frankfurt"
      ],
      correct: 1,
      explanation: "Uradni sedež EP je v Strasbourgu; drugi dve lokaciji sta Bruselj in Luksemburg. Poslance vsakih 5 let neposredno izvolijo državljani DČ; predsednik EP ima mandat 2,5 leti. Poslanci zastopajo svoje volivce in evropske politične stranke, ne države."
    },
    {
      q: "Kaj velja za glasovanje o nezaupnici Evropski komisiji?",
      options: [
        "Izglasuje jo Svet s kvalificirano večino; odstopi predsednik Komisije",
        "Za izglasovanje sta potrebni 2/3 na seji navzočih poslancev in hkrati absolutna večina vseh poslancev EP; odstopiti mora cela Komisija",
        "Zadostuje navadna večina navzočih poslancev; odstopi posamezni komisar",
        "Nezaupnico lahko izglasuje samo Evropski svet s soglasjem"
      ],
      correct: 1,
      explanation: "Nezaupnica je najmočnejše nadzorno orožje EP: 2/3 navzočih poslancev + absolutna večina vseh poslancev EP. Če je izglasovana, mora odstopiti CELA Komisija. Drugi nadzorni instrumenti: poslanska vprašanja (1x mesečno), preiskovalne komisije (zahteva 1/4 poslancev), letno poročilo Komisije, evropski varuh človekovih pravic."
    },
    {
      q: "Katera institucija ima izključno zakonodajno iniciativo v EU?",
      options: [
        "Evropski parlament",
        "Svet (EU)",
        "Evropska komisija",
        "Evropski svet"
      ],
      correct: 2,
      explanation: "Komisija ima v postopku sprejemanja sekundarne zakonodaje izključno pravico in dolžnost zakonodajne iniciative - zato jo imenujejo 'motor integracije'. O sprejemu nato po rednem zakonodajnem postopku skupaj odločita Svet (kvalificirana dvojna večina) in Parlament (enakopravna)."
    },
    {
      q: "Kako se imenuje predsednik Evropske komisije?",
      options: [
        "Neposredno ga izvolijo državljani EU",
        "Evropski svet ga s kvalificirano večino predlaga, potrdi ga Evropski parlament",
        "Imenuje ga Svet (EU) s soglasjem",
        "Izvolijo ga komisarji med seboj"
      ],
      correct: 1,
      explanation: "Evropski svet s kvalificirano večino predlaga kandidata, o predlogu odloča EP. Nato Evropski svet v soglasju s kandidatom sprejme seznam kandidatov za komisarje; celotno Komisijo z glasovanjem potrdi EP, imenuje pa jo Evropski svet s kvalificirano večino. Komisarji (27, mandat 5 let) zastopajo interese EU, ne svojih držav."
    },
    {
      q: "Kaj je Evropski svet in kdo ga sestavlja?",
      options: [
        "Zakonodajni organ, sestavljen iz ministrov DČ",
        "Najvišje politično telo EU - predsedniki držav ali vlad DČ in predsednik Komisije; sprejema politične odločitve, ne zakonov",
        "Posvetovalni organ regij in mest",
        "Skupščina nacionalnih parlamentov"
      ],
      correct: 1,
      explanation: "Evropski svet (institucija po Lizbonski pogodbi) sestavljajo predsedniki držav/vlad DČ in predsednik Komisije. Ima predsednika z mandatom 2,5 leti, sestane se 4x letno. Ne sprejema zakonov, temveč politične odločitve.",
      wrong: {
        0: "To je Svet (EU) - drug organ!"
      }
    },
    {
      q: "Kako je sestavljeno Sodišče EU?",
      options: [
        "Sodišče: po en sodnik iz vsake DČ; Splošno sodišče: po dva sodnika iz vsake DČ; pomaga 11 pravobranilcev",
        "En sam senat s 27 sodniki, ki jih imenuje Parlament",
        "Po trije sodniki iz vsake DČ brez pravobranilcev",
        "Sodniki so izbrani izmed članov nacionalnih vrhovnih sodišč po žrebu"
      ],
      correct: 0,
      explanation: "Sodišče EU sestavljata Sodišče (1 sodnik/DČ) in Splošno sodišče (2 sodnika/DČ). Pri Sodišču pomaga 11 pravobranilcev (sklepni predlogi). Naloga: zagotavljanje upoštevanja prava pri razlagi in uporabi PEU in PDEU."
    },
    {
      q: "Katera trditev o Evropskem računskem sodišču in ECB je pravilna?",
      options: [
        "Računsko sodišče izdaja pravno zavezujoče sodbe; ECB vodi fiskalno politiko",
        "Računsko sodišče nima sodnih pristojnosti (poročila niso zavezujoča); ECB neodvisno upravlja evro in monetarno politiko",
        "Obe instituciji sta podrejeni Komisiji",
        "Člane Računskega sodišča imenuje vsaka DČ za dosmrtni mandat"
      ],
      correct: 1,
      explanation: "Računsko sodišče: po en član iz vsake DČ, mandat 6 let (enkrat ponovljiv), nima sodnih pristojnosti. ECB: upravljanje evra ter izvajanje in oblikovanje monetarne politike EU, deluje povsem neodvisno; najvišji organ je svet guvernerjev (6 članov izvršilnega odbora + guvernerji centralnih bank evrskega območja)."
    },
    {
      type: "match",
      q: "Poveži sekundarni pravni akt EU z njegovo značilnostjo.",
      pairs: [
        { term: "Uredba", def: "Splošno uporabna, v celoti zavezujoča, neposredno se uporablja v vseh DČ - 'zakon na ravni Unije'" },
        { term: "Direktiva", def: "Zavezuje glede cilja, DČ izbere metodo; treba jo je prenesti v nacionalni pravni red" },
        { term: "Sklep", def: "Individualni pravni akt - zavezujoč za naslovljenega posameznega subjekta" },
        { term: "Priporočila in mnenja", def: "Nezavezujoče 'mehko pravo' - oblikovanje politike na določenem področju" }
      ],
      explanation: "Sekundarne akte sprejemajo organi EU na podlagi pooblastil iz ustanovitvenih pogodb. Uredba in direktiva se objavita v Uradnem listu EU in začneta veljati 20. dan po objavi, če ni določeno drugače."
    },
    {
      q: "V čem se direktiva razlikuje od uredbe?",
      options: [
        "Direktiva je hierarhično nad uredbo",
        "Direktiva ni nujno zavezujoča za vse DČ in je zavezujoča samo glede cilja/rezultata; uredba je v celoti zavezujoča in velja neposredno",
        "Uredbo je treba prenesti v nacionalni pravni red, direktive ne",
        "Direktivo sprejemajo DČ, uredbo pa organi EU"
      ],
      correct: 1,
      explanation: "Dve razliki: (1) direktiva ni nujno naslovljena na vse DČ, (2) zavezujoča je samo glede cilja - DČ izbere metodo in jo mora prenesti v svoj pravni red. Uredba avtomatično velja v vseh DČ z dnem uveljavitve, brez prenosa."
    },
    {
      q: "Med primarne pravne vire EU štejemo:",
      options: [
        "uredbe, direktive in sklepe",
        "ustanovitvene pogodbe, pristopne pogodbe, pogodbe s tretjimi državami in splošna pravna načela, skupna pravnim redom DČ",
        "sodbe Sodišča EU in mnenja Komisije",
        "nacionalne ustave držav članic"
      ],
      correct: 1,
      explanation: "Primarni viri: pogodbe, ki jih sklepajo DČ (PEU, PDEU, pristopne pogodbe, pogodbe s tretjimi državami) + splošna pravna načela. Sprejemajo se soglasno in jih morajo ratificirati DČ. Sekundarne akte sprejemajo organi EU. Dopolnilni viri: sodbe Sodišča EU."
    },
    {
      q: "Kaj pomeni načelo primarnosti prava EU?",
      options: [
        "Pravo EU nastaja in se razlaga izključno po pravilih EU",
        "Pravna pravila, sprejeta na ravni EU, prevladajo nad pravili notranjega pravnega reda DČ",
        "EU deluje le v mejah pristojnosti, ki so jih nanjo prenesle DČ",
        "Norme EU veljajo brez posredovanja nacionalnega organa"
      ],
      correct: 1,
      explanation: "Primarnost = pravo EU prevlada nad notranjim pravom DČ (uredbe so celo nad ustavo nacionalne države). Avtonomnost = pravo EU nastaja, velja in se razlaga izključno po pravilih EU. Neposredna uporabnost = norme veljajo brez posredovanja nacionalnega organa in se posamezniki nanje lahko sklicujejo."
    },
    {
      q: "Pod katerimi pogoji je direktiva neposredno uporabna?",
      options: [
        "Vedno, takoj ko je objavljena v Uradnem listu EU",
        "Gre za razmerje med posameznikom in državo, rok za implementacijo je potekel, pravila so jasna in konkretna",
        "Samo če jo DČ prenese v nacionalni pravni red",
        "Nikoli - direktive nikoli nimajo neposrednega učinka"
      ],
      correct: 1,
      explanation: "Trije pogoji: (1) razmerje posameznik (pravna oseba) - država, (2) rok za implementacijo je potekel, (3) pravila so jasna in konkretna. Ne glede na te pogoje je neposredno uporabna tudi, če konkretizira splošna načela prava EU. Določbe ustanovitvenih pogodb so neposredno uporabne, če so jasne, popolne in dovolj konkretne."
    },
    {
      q: "Na katerih področjih ima EU izključno pristojnost?",
      options: [
        "Kultura, turizem, izobraževanje",
        "Carinska unija, skupna trgovinska politika, konkurenca",
        "Dedno, družinsko in kazensko pravo",
        "Notranji trg"
      ],
      correct: 1,
      explanation: "Izključna pristojnost EU: carinska unija, skupna trgovinska politika, konkurenca - DČ tu ne smejo sprejemati zavezujočih pravil. Deljena pristojnost (najširša): npr. notranji trg. Podporni ukrepi: kultura, turizem, izobraževanje. Izključna pristojnost DČ: dedno, družinsko, kazensko pravo.",
      wrong: {
        3: "Notranji trg spada med DELJENE pristojnosti."
      }
    },
    {
      q: "Kaj ureja načelo subsidiarnosti?",
      options: [
        "Prednost prava EU pred nacionalnim pravom",
        "Razmerje med pristojnostmi EU in držav članic - Unija deluje le v mejah prenesenih pristojnosti",
        "Odgovornost DČ za škodo zaradi neprenesene direktive",
        "Hierarhijo med primarnimi in sekundarnimi viri"
      ],
      correct: 1,
      explanation: "Subsidiarnost (podrednost) ureja razmerje med pristojnostmi EU in DČ: Unija deluje le v mejah pristojnosti, ki so jih DČ z ustanovitvenimi pogodbami prenesle nanjo za uresničevanje ciljev pogodb."
    }
  ]
};
