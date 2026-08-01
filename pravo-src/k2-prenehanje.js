// Pravo - 2. kolokvij - Deck 5: Prenehanje družb, izvršilno pravo in intelektualna lastnina
module.exports = {
  id: "pk2-pren",
  name: "Prenehanje družb, izvršba in intelektualna lastnina",
  questions: [
    {
      q: "Kdaj gospodarska družba pravno preneha?",
      options: [
        "Ko preneha poslovati",
        "Z izbrisom iz sodnega registra",
        "S sklepom skupščine o prenehanju",
        "Z objavo v Uradnem listu"
      ],
      correct: 1,
      explanation: "Družbe nastanejo z vpisom in prenehajo z IZBRISOM iz sodnega registra. Razlog za prenehanje = vzrok; način prenehanja = postopek. Načini: likvidacija, skrajšani postopek, izbris brez likvidacije, prisilna likvidacija, stečaj."
    },
    {
      q: "Kateri od naštetih NI razlog za prenehanje kapitalske družbe?",
      options: [
        "Sklep skupščine z najmanj 3/4 večino zastopanega OK",
        "Poslovodstvo ne deluje več kot 12 mesecev (velja za d.d.)",
        "Zmanjšanje OK pod predpisani minimum",
        "Enoletna izguba pri poslovanju"
      ],
      correct: 3,
      explanation: "Izguba NI razlog za prenehanje (družba lahko posluje z minusom). Razlogi: potek časa, sklep skupščine (3/4 zastopanega OK), nedelovanje poslovodstva nad 12 mesecev (samo d.d.), ničnost družbe, stečaj, sodna odločba, združitev, zmanjšanje OK pod minimum."
    },
    {
      q: "Kakšen je cilj likvidacije in v čem se razlikuje od stečaja?",
      options: [
        "Cilj likvidacije je razdelitev premoženja med družbenike (družba ima dovolj premoženja za poplačilo upnikov); cilj stečaja je najvišje poplačilo upnikov iz premoženja dolžnika",
        "Likvidacija in stečaj sta sinonima",
        "Stečaj vodi družba sama, likvidacijo sodišče",
        "Likvidacija je mogoča samo pri osebnih družbah"
      ],
      correct: 0,
      explanation: "Likvidacija: prostovoljno prenehanje - družba poplača VSE upnike, preostalo premoženje se razdeli med družbenike (sorazmerno z deleži). Temeljni pogoj: dovolj premoženja; če ga ni, se začne stečaj. Stečaj: prisilno prenehanje zaradi finančne nesposobnosti - cilj je čim višje poplačilo upnikov."
    },
    {
      q: "Kako poteka redna likvidacija?",
      options: [
        "Sodišče imenuje stečajnega upravitelja",
        "Skupščina sprejme sklep o prenehanju in začetku likvidacije (rok za prijavo terjatev vsaj 30 dni); k firmi se doda 'v likvidaciji'; vodi jo likvidacijski upravitelj (praviloma član poslovodstva)",
        "AJPES izbriše družbo po uradni dolžnosti",
        "Upniki prevzamejo vodenje družbe"
      ],
      correct: 1,
      explanation: "Redna likvidacija: sklep skupščine (razlogi + rok za prijavo terjatev, ne krajši od 30 dni), vpis v register, firma dobi dodatek 'v likvidaciji'. Likvidacijski upravitelj (eden ali več, praviloma poslovodstvo) poplača dolgove, pripravi poročilo in predlog razdelitve; preostanek se razdeli med družbenike. Prisilno likvidacijo pa uvede sodišče po uradni dolžnosti in imenuje upravitelja - namen je enak."
    },
    {
      q: "Kaj je pogoj za prenehanje družbe po skrajšanem postopku?",
      options: [
        "Družba mora imeti dobiček",
        "Družba nima upnikov oziroma nerešenih razmerij s partnerji in delavci; družbeniki podajo izjavo (pri notarju) in nato eno leto po izbrisu odgovarjajo za morebitne obveznosti z vsem svojim premoženjem",
        "Soglasje vseh upnikov",
        "Družba mora poslovati manj kot 5 let"
      ],
      correct: 1,
      explanation: "Skrajšani postopek = prostovoljno prenehanje BREZ likvidacije: pogoj je, da družba nima upnikov/nerešenih razmerij. Skupščina sprejme sklep, poda predlog registrskemu organu. Varovalka za upnike: v enem letu po objavi izbrisa lahko uveljavijo terjatve do družbenikov, ki so podali izjavo - ti odgovarjajo z VSEM svojim premoženjem."
    },
    {
      q: "Kdaj se družba izbriše iz sodnega registra brez likvidacije?",
      options: [
        "Na predlog kateregakoli upnika",
        "Če je prenehala poslovati, nima premoženja in je izpolnila obveznosti; če ne posluje na registriranem poslovnem naslovu; ali iz drugih zakonskih razlogov",
        "Po desetih letih poslovanja",
        "Če ima več kot tri upnike"
      ],
      correct: 1,
      explanation: "Izbris brez likvidacije (po uradni dolžnosti): (1) prenehala poslovati + ni premoženja + obveznosti izpolnjene, (2) ne posluje na poslovnem naslovu iz registra, (3) drugi zakonski razlogi. Namen: odvzem pravne osebnosti subjektom, ki ne poslujejo oziroma nimajo urejenih osnovnih pogojev."
    },
    {
      q: "Kaj velja za izvršbo denarne terjatve po ZIZ?",
      options: [
        "Upnik lahko izbere izvršilno sredstvo (nepremičnine, premičnine, računi, plača, vrednostni papirji); sodišče pazi, da dovoli sredstvo, ki je za dolžnika manj obremenjujoče",
        "Sredstvo izvršbe vedno izbere dolžnik",
        "Izvršba je mogoča samo na plačo",
        "Sodišče vedno proda dolžnikovo nepremičnino"
      ],
      correct: 0,
      explanation: "Upnik prosto predlaga izvršilno sredstvo (prodaja nepremičnin, premičnin, sredstva na računih, plača, vrednostni papirji/deleži), sodišče pa po uradni dolžnosti pazi na manj obremenjujoče sredstvo (npr. če je nepremičnina edini dom). Velja načelo prioritete: upniki se poplačajo po vrstnem redu pridobitve pravice do poplačila. Pri nedenarnih terjatvah: sodni penali, prisilna izvršitev po izvršitelju."
    },
    {
      q: "Kakšna je razlika med izvršbo na podlagi izvršilnega naslova in na podlagi verodostojne listine?",
      options: [
        "Izvršilni naslov je sodba ali sklep sodišča; verodostojna listina je npr. račun ali menica - namenjena enostavni izterjavi nespornih terjatev",
        "Verodostojna listina je močnejša od izvršilnega naslova",
        "Izvršilni naslov izda upnik sam",
        "Razlike ni"
      ],
      correct: 0,
      explanation: "Delitev po vrsti listine: izvršilni naslov (sodba, sklep sodišča, tudi izvršnica) proti verodostojni listini (račun, menica). Izvršba na podlagi verodostojne listine je mogoča SAMO za denarne terjatve; začne se na predlog upnika pri COVL (Centralni oddelek za verodostojno listino) pri Okrajnem sodišču v Ljubljani.",
      more: "Dolžnik lahko zoper sklep o izvršbi na podlagi verodostojne listine v 8 dneh vloži ugovor - z izvršilnega sodišča gre zadeva potem v pravdo. Insolventnost = dolgoročna nesposobnost poravnavanja obveznosti (trenutna plačilna nesposobnost še ni insolventnost)."
    },
    {
      q: "Kdo je lahko avtor avtorskega dela?",
      options: [
        "Fizična ali pravna oseba",
        "Samo fizična oseba, ki delo ustvari; pravna oseba je lahko le nosilec avtorskih pravic",
        "Samo registrirani umetniki",
        "Vsak, ki delo objavi"
      ],
      correct: 1,
      explanation: "Avtor je lahko SAMO fizična oseba (delo nastane z ustvarjalnostjo). Domneva: za avtorja velja tisti, čigar ime je navedeno na običajen način, dokler se ne dokaže nasprotno. Več avtorjev = soavtorstvo. Ureditev: ZASP (in ZKUASP); najpomembnejši mednarodni vir je Bernska konvencija."
    },
    {
      q: "Kateri so elementi generalne klavzule avtorskega dela po ZASP?",
      options: [
        "Individualna intelektualna stvaritev človeka, s področja književnosti, znanosti in umetnosti, ki je na kakršenkoli način izražena",
        "Registracija, objava in plačilo takse",
        "Novost, inventivnost in industrijska uporabnost",
        "Pisna oblika in notarska overitev"
      ],
      correct: 0,
      explanation: "Trije elementi: (1) individualna intelektualna stvaritev človeka, (2) s področja književnosti, znanosti ali umetnosti, (3) izraženost navzven (zaznavna s človeškim čutom). Avtorska pravica nastane s samo stvaritvijo - brez registracije! Izvedena dela (prevodi, priredbe) so avtorska dela, a je potrebno dovoljenje avtorja izvirnika.",
      wrong: {
        2: "Novost in industrijska uporabnost sta pogoja za PATENT, ne za avtorsko delo."
      }
    },
    {
      type: "match",
      q: "Poveži moralno avtorsko pravico z vsebino.",
      pairs: [
        { term: "Pravica priznanja avtorstva", def: "Avtor odloči o navedbi svojega avtorstva; kršitev = plagiat" },
        { term: "Pravica prve objave", def: "Avtor odloči, kdaj in kako bo delo prvič objavljeno" },
        { term: "Pravica do spoštovanja dela", def: "Upre se skazitvi in posegom, ki bi okrnili njegovo osebnost" },
        { term: "Pravica skesanja", def: "Preklic upravičenja imetniku materialne pravice iz resnih moralnih razlogov, s povrnitvijo škode" }
      ],
      explanation: "Moralne avtorske pravice varujejo duhovne in osebne vezi avtorja z delom. Prenašajo se lahko SAMO z dedovanjem (materialne in druge pravice pa s pisnimi pogodbami)."
    },
    {
      q: "Koliko časa traja avtorska pravica?",
      options: [
        "20 let od stvaritve",
        "Za časa avtorjevega življenja in 70 let po njegovi smrti",
        "50 let od objave",
        "Neomejeno"
      ],
      correct: 1,
      explanation: "Avtorska pravica traja avtorjevo življenje + 70 let po smrti. Pri soavtorjih od smrti zadnjega; pri neznanem avtorju/filmu od objave. Če delo v 70 letih od stvaritve ni objavljeno, pravica preneha. Temeljno načelo materialnih pravic: in dubio pro auctore (v dvomu v prid avtorju)."
    },
    {
      q: "Kaj je sledna pravica?",
      options: [
        "Pravica avtorja prepovedati nadaljnjo prodajo dela",
        "Pravica avtorja, da je ob prodaji izvirnika obveščen in prejme nadomestilo 3 % od maloprodajne cene; ni se ji mogoče odpovedati, se pa deduje",
        "Pravica slediti uporabi dela na internetu",
        "Pravica do brezplačnega vstopa na razstave"
      ],
      correct: 1,
      explanation: "Sledna pravica (pravica zasledovanja) spada med DRUGE pravice avtorja (niso izključne): ob prodaji dela obvestilo + 3 % od maloprodajne cene. Ne more prepovedati prodaje, lahko zahteva provizijo. Druge pravice še: pravica dostopa in izročitve, javnega posojanja, do nadomestila za privatno reproduciranje."
    },
    {
      q: "Kdaj je reproduciranje avtorskega dela prosto (brez dovoljenja in plačila)?",
      options: [
        "Vedno za študijske namene",
        "V največ treh primerkih za zasebno uporabo fizične osebe ali lastno uporabo arhivov, javnih knjižnic ter izobraževalnih in znanstvenih ustanov",
        "Do desetih primerkov za podjetja",
        "Nikoli"
      ],
      correct: 1,
      explanation: "Prosta uporaba: reproduciranje v največ 3 primerkih za zasebno uporabo fizične osebe ali lastno uporabo arhivov, knjižnic, izobraževalnih/znanstvenih ustanov. Cele knjige ni dovoljeno prosto reproducirati (razen če je razprodana že 2 leti). Zakonita licenca pa je ODPLAČNA uporaba po zakonu (čitanke in učbeniki, pregledi tiska) - posega le v pravico reproduciranja, avtorja in vir je treba navesti."
    },
    {
      q: "Delavec v okviru delovnega razmerja ustvari avtorsko delo. Kdo ima materialne pravice?",
      options: [
        "Delavec v celoti",
        "Materialne in druge pravice se prenesejo na delodajalca za 10 let, razen če je s pogodbo določeno drugače",
        "Delodajalec trajno",
        "Država"
      ],
      correct: 1,
      explanation: "Delo iz delovnega razmerja: materialne in druge avtorske pravice preidejo na delodajalca za 10 let (če pogodba ne določa drugače). Prenos pravic sicer: samo materialne in druge (moralne le z dedovanjem), s pisnimi pogodbami; na avtorsko pravico ni mogoče seči s prisilno izvršbo."
    },
    {
      q: "Kaj je patent?",
      options: [
        "Pravica, ki jo država podeli izumitelju, da za omejen čas (20 let) drugim prepove gospodarsko uporabo izuma - kot nadomestilo za razkritje izuma",
        "Trajna pravica do blagovne znamke",
        "Dokazilo o lastništvu podjetja",
        "Zaščita imena podjetja"
      ],
      correct: 0,
      explanation: "Patent varuje izum (rešitev tehničnega problema - izdelek ali postopek); mora biti industrijsko uporaben. Traja 20 let od prijave (izjemoma 25: vojno/izredno stanje ali izdelki, ki potrebujejo oblastno dovoljenje). Po poteku je izum v javni domeni. Prijava pri Uradu RS za intelektualno lastnino; patent velja samo na ozemlju države, ki ga je podelila.",
      more: "Patent lahko preneha prej: odpoved nosilca, prenehanje nosilca, ničnost, neplačevanje taks. Razlika od poslovne skrivnosti: patent je JAVNO razkrit, poslovna skrivnost ravno ne."
    },
    {
      q: "Kakšna je razlika med modelom in vzorcem?",
      options: [
        "Model varuje novo vidno zunanjo obliko izdelka (3D), vzorec novo sliko ali risbo, prenosljivo na izdelek (2D) - vse ostalo je enako",
        "Model je za stroje, vzorec za tekstil",
        "Model traja 20 let, vzorec neomejeno",
        "Vzorec je mednarodni model"
      ],
      correct: 0,
      explanation: "Model = nova vidna zunanja oblika industrijskega izdelka (3D); vzorec = nova vidna slika/risba, prenosljiva na izdelek (2D). Pogoji: vidnost, uporabnost v industriji, novost (ožja kot pri patentu, omejena na Slovenijo). Ne morejo biti zavarovani: fotografska in kartografska dela, tehnični načrti in skice."
    },
    {
      q: "Kaj velja za blagovno oziroma storitveno znamko?",
      options: [
        "Traja 20 let brez podaljšanja",
        "Varuje znak za razlikovanje blaga/storitev; traja 10 let in se lahko poljubno podaljšuje po 10 let; ob 5-letni neuporabi jo Urad lahko razveljavi",
        "Nastane avtomatično z uporabo znaka",
        "Varuje izum"
      ],
      correct: 1,
      explanation: "Znamka zavaruje znak (slika, beseda, risba, kombinacija barv...) za razlikovanje blaga/storitev; imetnik sme uporabljati (R). Traja 10 let + neomejena podaljšanja po 10 let; ob 5 letih neuporabe možna razveljavitev. Sloveče znamke pozna tudi potrošnik, ki jih ne kupuje (Coca-Cola, Nike, Aspirin). Postopek je formalen - vloga pri uradu."
    },
    {
      q: "Kateri znak bi bil zavrnjen pri registraciji znamke?",
      options: [
        "Domišljijski znak 'Zvezdolet' za kolesa",
        "Znak 'mleko' za mleko (označuje le vrsto blaga) ali znak, podoben že zavarovanemu (npr. 'Uho' ob obstoječem 'Oho')",
        "Kombinacija barv",
        "Beseda v mrtvem jeziku"
      ],
      correct: 1,
      explanation: "Razlogi za zavrnitev: znaki brez razlikovalnosti ('night club' za igrala je sicer neprimeren za razlikovanje), zgolj opisni znaki ('mleko' za mleko - za avto pa bi šlo!), običajne oznake vrste ('piano' za kitaro), zavajajoči ('Columbia' za kenijsko kavo), istovetni ali podobni že zavarovanim (Oho/Uho, Martini/Martin, Lanol/Lanoll), uradni znaki, grbi in zastave (brez dovoljenja). Podoba/ime osebe le z dovoljenjem (umrli: zakonec, otroci, starši; zgodovinske osebe: ministrstvo za notranje zadeve)."
    },
    {
      q: "Kaj velja za označbo geografskega porekla?",
      options: [
        "Je individualna pravica enega proizvajalca s trajanjem 10 let",
        "Je kolektivna pravica - uporabljajo jo lahko vsi proizvajalci z območja; trajanje ni časovno omejeno in je ni treba podaljševati",
        "Velja samo za vina",
        "Podeli jo Evropska komisija za 5 let"
      ],
      correct: 1,
      explanation: "Označba porekla zavaruje geografsko ime proizvodov, katerih lastnosti so odvisne od kraja (podnebje, tla, ustaljeni postopki). Je KOLEKTIVNA pravica (vsi proizvajalci z območja; drugi je ne smejo uporabljati), časovno neomejena, brez podaljševanja. Zahtevo vloži državni organ, občina, lokalna skupnost ali zbornica."
    },
    {
      q: "Kaj je prednostna pravica pri prijavi pravic industrijske lastnine?",
      options: [
        "Pravica prvega kupca izdelka",
        "Od datuma pravilne prijave ima prijavitelj prednost pred vsakomer, ki enako stvaritev prijavi kasneje; rok uveljavljanja: 12 mesecev za izum, 6 mesecev za model in znamko",
        "Pravica do znižane takse",
        "Prednost domačih prijaviteljev pred tujimi"
      ],
      correct: 1,
      explanation: "Prednostna pravica teče od prejema pravilne prijave. Roki: izum 12 mesecev, model in znamka 6 mesecev. Prijava vsebuje: podatke o prijavitelju in pravici, zahtevek (varstvo zajema samo, kar je v zahtevku!), opis, stanje tehnike, novost, skico/fotografijo; prijava znamke še znak in seznam proizvodov/storitev."
    },
    {
      q: "Družba je v hudih finančnih težavah in premoženje ne zadošča za poplačilo upnikov. Kateri postopek je pravilen?",
      options: [
        "Redna likvidacija",
        "Stečaj - ker premoženje ne zadošča za poplačilo obveznosti; vodi ga stečajni upravitelj, ki ga določi sodišče",
        "Prenehanje po skrajšanem postopku",
        "Izbris brez likvidacije"
      ],
      correct: 1,
      explanation: "Likvidacija zahteva dovolj premoženja za poplačilo VSEH upnikov; če ga ni, se začne stečaj. Likvidacijskega upravitelja določijo družbeniki (po navadi direktor), stečajnega pa sodišče. Skrajšani postopek zahteva, da družba sploh nima upnikov."
    }
  ]
};
