// Pravo - 2. kolokvij - Deck 3: Družba z omejeno odgovornostjo
module.exports = {
  id: "pk2-doo",
  name: "Družba z omejeno odgovornostjo (d.o.o.)",
  questions: [
    {
      q: "Koliko družbenikov ima lahko d.o.o. in kakšen je minimalni osnovni kapital?",
      options: [
        "1 do 50 družbenikov; minimalni OK 7.500 EUR, osnovni vložek najmanj 50 EUR",
        "Najmanj 2 družbenika; OK 25.000 EUR",
        "Neomejeno družbenikov; OK 1 EUR",
        "1 do 10 družbenikov; OK 10.000 EUR"
      ],
      correct: 0,
      explanation: "D.o.o. lahko ustanovi 1 do največ 50 fizičnih ali pravnih oseb. Minimalni OK je 7.500 EUR, posamezni osnovni vložek najmanj 50 EUR. Družbenik na podlagi vložka pridobi poslovni delež (izražen v % ali ulomku), sorazmeren z vrednostjo vložka."
    },
    {
      q: "Koliko vložka mora biti vplačanega pred prijavo za vpis d.o.o. v sodni register?",
      options: [
        "Celoten znesek vseh vložkov",
        "Vsak družbenik vsaj 1/4 svojega osnovnega vložka, skupaj vsaj 7.500 EUR; stvarni vložki v celoti",
        "Vsaj polovica OK, stvarni vložki lahko kasneje",
        "Nič - vplača se po vpisu"
      ],
      correct: 1,
      explanation: "Pred prijavo: vsak družbenik vsaj 1/4 osnovnega vložka, skupna vrednost zagotovljenih vložkov vsaj 7.500 EUR. Stvarne vložke (premičnine, nepremičnine, pravice, podjetje) je treba zagotoviti V CELOTI pred vpisom. Denarni vložki na bančni račun; poslovodja mora z vložki prosto razpolagati.",
      more: "Če je vrednost stvarnega vložka nad 100.000 EUR, je potreben cenilec. Znanje, izkušnje in veze ne morejo biti stvarni vložek (nimajo določljive vrednosti)."
    },
    {
      q: "Ali je družbenik lahko oproščen vplačila osnovnega vložka ali ga pobota s svojo terjatvijo do družbe?",
      options: [
        "Da, s sklepom skupščine",
        "Ne - oprostitev ni mogoča niti pobot; mogoča je le ob zmanjšanju OK; ob neplačilu grozi kaducitetni postopek (izključitev)",
        "Da, če ima družba dovolj premoženja",
        "Pobot je vedno mogoč"
      ],
      correct: 1,
      explanation: "Oprostitev vplačila ni mogoča; družbenik tudi ne more pobotati svoje terjatve z zahtevkom družbe za vplačilo vložka. Oprostitev je mogoča samo z zmanjšanjem OK (sorazmerni znesek). Če družbenik kljub pozivu ne plača, se začne kaducitetni postopek - izključitev iz družbe zaradi neplačila."
    },
    {
      q: "V kakšni obliki se sklene družbena pogodba d.o.o.?",
      options: [
        "Ustno pred pričami",
        "V obliki notarskega zapisa ali na posebnem obrazcu (fizično ali elektronsko) z overjenimi podpisi",
        "Z navadno pisno pogodbo brez overitve",
        "S sklepom skupščine"
      ],
      correct: 1,
      explanation: "Družbena pogodba: notarski zapis ALI poseben obrazec (fizičen/elektronski, podpisi overjeni). Obvezna vsebina: podatki o družbenikih; firma, sedež, dejavnost; višina OK, vložki in deleži; morebitne dodatne obveznosti; pri stvarnih vložkih predmet in znesek. Družba postane pravna oseba z vpisom v sodni register."
    },
    {
      q: "S kakšno večino se spreminja družbena pogodba d.o.o. in kakšen je učinek vpisa spremembe?",
      options: [
        "Navadna večina; vpis je deklaratoren",
        "3/4 večina glasov družbenikov; vpis spremembe v sodni register je konstitutiven (velja šele od vpisa)",
        "Soglasje vseh; vpis ni potreben",
        "2/3 večina; velja takoj s sklepom"
      ],
      correct: 1,
      explanation: "Sprememba pogodbe: 3/4 glasov družbenikov; če nalaga dodatne obveznosti, soglasno (razen povečanja OK). Sklep praviloma potrdi notar; poslovodja spremembo prijavi v register s prečiščenim besedilom. Vpis spremembe je KONSTITUTIVEN - velja šele od vpisa."
    },
    {
      type: "match",
      q: "Poveži pravice družbenika d.o.o. s kategorijo.",
      pairs: [
        { term: "Udeležba pri dobičku", def: "Premoženjska pravica - deli se sorazmerno s poslovnimi deleži" },
        { term: "Delež likvidacijske mase", def: "Premoženjska pravica - po poplačilu upnikov in 6 mesecih od zadnjega poziva" },
        { term: "Prednostna pravica pri povečanju OK", def: "Premoženjska pravica do 'novega' poslovnega deleža" },
        { term: "Glasovanje na skupščini", def: "Upravljavska pravica - na vsakih dopolnjenih 50 EUR vložka en glas" },
        { term: "Pravica do informacij in vpogleda", def: "Upravljavska pravica do poslovne dokumentacije" }
      ],
      explanation: "Pravice so urejene v ZGD-1 in z družbeno pogodbo (večina določb je dispozitivnih). Iz delitve dobička družbenika s pogodbo NI mogoče izključiti."
    },
    {
      q: "Kdaj ima družbenik d.o.o. pravico do izplačila dobička?",
      options: [
        "Vsako leto avtomatično",
        "Če družba ustvari dobiček (ob spoštovanju vseh pravil) IN skupščina sklene, da se dobiček razdeli",
        "Kadarkoli na zahtevo družbenika",
        "Samo ob likvidaciji"
      ],
      correct: 1,
      explanation: "Pravica je pogojna: (1) obstoj (bilančnega) dobička v skladu z zakonom in pogodbo, (2) sklep skupščine o razdelitvi (lahko ga tudi investirajo). Deli se sorazmerno z deleži."
    },
    {
      q: "Družbenik d.o.o. želi prodati poslovni delež tretji osebi. Kaj mora storiti?",
      options: [
        "Delež lahko proda prosto brez omejitev",
        "Druge družbenike mora pisno obvestiti o nameri in pogojih ter jih pozvati, da morebitni kupec sporoči pripravljenost za nakup v enem mesecu - družbeniki imajo predkupno pravico",
        "Potrebuje dovoljenje sodišča",
        "Delež lahko proda samo družbi"
      ],
      correct: 1,
      explanation: "Predkupna pravica družbenikov velja pri prodaji TRETJIM osebam (ne med družbeniki): pisno obvestilo o nameri in pogojih + rok 1 mesec. Če je kupcev več družbenikov, postanejo imetniki skupaj. Pogodba lahko določi, da je za odsvojitev tretjim potrebno soglasje (vinkuliran poslovni delež); če soglasja ni in nihče ne kupi, ima družbenik izstopno upravičenje. Za pridobitelja se šteje le tisti, ki poslovodji prijavi in dokaže pridobitev."
    },
    {
      q: "Kako se skliče skupščina d.o.o.?",
      options: [
        "Z objavo v Uradnem listu 30 dni prej",
        "Poslovodja jo skliče s priporočenim pismom družbenikom z dnevnim redom, poslanim vsaj 25 dni pred skupščino",
        "Prek AJPES 15 dni prej",
        "Ustno na zadnji skupščini"
      ],
      correct: 1,
      explanation: "Skupščino (načeloma 1x letno) skliče poslovodja s priporočenim pismom z dnevnim redom, vsaj 25 dni prej. Družbeniki lahko ob soglasju sklenejo tudi, da se skupščina ne opravi in glasove sporočijo poslovodji pisno. Sklepi se sprejemajo z večino oddanih glasov, če zakon/pogodba ne določa drugače.",
      wrong: {
        0: "30-dnevni javni sklic velja za skupščino DELNIŠKE družbe."
      }
    },
    {
      q: "O čem odločajo družbeniki na skupščini d.o.o.?",
      options: [
        "Samo o delitvi dobička",
        "O sprejetju letnega poročila in uporabi bilančnega dobička, zahtevi za vplačilo vložkov, vračanju naknadnih vplačil, delitvi in prenehanju poslovnih deležev itd.",
        "O vsakodnevnem vodenju poslov",
        "O sklepanju vseh pogodb družbe"
      ],
      correct: 1,
      explanation: "Skupščina je temeljni organ (vsi družbeniki): letno poročilo in bilančni dobiček, vplačila vložkov, naknadna vplačila, delitev/prenehanje deležev itd. Vsakodnevno vodenje poslov je naloga poslovodje."
    },
    {
      q: "Kdo je poslovodja d.o.o. in kako ga je mogoče odpoklicati?",
      options: [
        "Poslovodja (direktor) na lastno odgovornost vodi posle in zastopa družbo; skupščina ga lahko odpokliče KADARKOLI, ne glede na mandat",
        "Poslovodjo imenuje sodišče in ga ni mogoče odpoklicati",
        "Poslovodja je vedno največji družbenik",
        "Odpoklic je mogoč samo iz utemeljenih razlogov"
      ],
      correct: 0,
      explanation: "Družba ima enega ali več poslovodij; imenuje jih skupščina (oz. nadzorni svet, če obstaja). Skupščina lahko poslovodjo odpokliče kadarkoli (drugače kot upravo d.d., kjer so potrebni utemeljeni razlogi!). Vpis poslovodje v register je deklaratoren. Obvezna organa d.o.o.: skupščina in poslovodja; nadzorni svet je opcijski (pogodba).",
      wrong: {
        3: "Utemeljeni razlogi so potrebni za odpoklic člana UPRAVE d.d. s strani nadzornega sveta."
      }
    },
    {
      q: "Kdaj lahko družbenik s tožbo izstopi iz d.o.o.?",
      options: [
        "Kadarkoli brez razloga",
        "Če mu drugi družbeniki ali poslovodja povzročajo škodo, ovirajo uresničevanje pravic ali mu nalagajo nesorazmerne obveznosti",
        "Samo ob prodaji celotne družbe",
        "Izstop s tožbo ni mogoč"
      ],
      correct: 1,
      explanation: "Pogodbena pravica do izstopa ni zakonska - mora biti dogovorjena. S tožbo pa lahko izstopi iz utemeljenih razlogov: škoda s strani drugih, oviranje pogodbene pravice do izstopa, oviranje pri uresničevanju pravic, nesorazmerne obveznosti. Izstopivši ima pravico do izplačila ocenjene vrednosti deleža (družba jo mora izplačati v 3 letih); ostali morajo v 3 mesecih zmanjšati OK ali prevzeti nove vložke."
    },
    {
      q: "Kaj je lastni delež d.o.o.?",
      options: [
        "Delež, ki ga ima družba v drugi družbi",
        "Poslovni delež, ki je v lasti družbe same; družba ne more pridobiti vseh deležev, ker bi ostala brez družbenikov",
        "Delež največjega družbenika",
        "Rezervni sklad družbe"
      ],
      correct: 1,
      explanation: "Lastni delež je poslovni delež v lasti družbe. Vseh deležev družba ne more pridobiti - ostala bi brez družbenikov."
    },
    {
      q: "Katere posebnosti veljajo za enoosebno d.o.o.?",
      options: [
        "Ne sme zaposlovati delavcev",
        "Ustanovi se z aktom o ustanovitvi (enostranska izjava volje); OK 7.500 EUR (za nevplačani denarni del varščina); sklepi se vpisujejo v knjigo sklepov",
        "Osnovni kapital ni potreben",
        "Družbenik ne more biti poslovodja"
      ],
      correct: 1,
      explanation: "Enoosebna d.o.o. ('samostojni podjetnik z omejeno odgovornostjo'): akt o ustanovitvi namesto pogodbe; OK 7.500 EUR - za nevplačani denarni del pred prijavo je potrebna varščina; knjiga sklepov (fizična ali elektronska, sklepe potrdi notar). Poslovodja je lahko družbenik ali kdo drug; edini družbenik kot poslovodja z družbo sklene pogodbo o zaposlitvi."
    },
    {
      q: "Kaj pomeni, da je d.o.o. 'hibrid' med osebno in delniško družbo?",
      options: [
        "Družbeniki delno odgovarjajo za dolgove",
        "Združuje pogodbeno svobodo in aktivno vlogo družbenikov (kot osebne družbe) z omejeno odgovornostjo in predpisanim minimalnim OK (kot d.d.)",
        "Lahko izdaja delnice",
        "Polovica družbenikov odgovarja, polovica ne"
      ],
      correct: 1,
      explanation: "D.o.o. je fleksibilna: pogodbena svoboda pri notranjih razmerjih (dispozitivnost - kot pri osebnih družbah), preprosto upravljanje, aktivno vključevanje družbenikov + omejena odgovornost, minimalni OK in preprosta sprememba družbenikov (kot pri kapitalskih). Nasprotje: d.d. s statutarno strogostjo."
    },
    {
      q: "Kdaj se lahko družbenikom d.o.o. izplača premoženje družbe?",
      options: [
        "Kadarkoli po sklepu poslovodje",
        "Samo če ima družba bilančni dobiček ali ob zmanjšanju OK po postopku, ki spoštuje pravice upnikov; prepovedana so prikrita izplačila",
        "Vsak mesec v obliki 'posojil'",
        "Nikoli"
      ],
      correct: 1,
      explanation: "Načelo ohranjanja OK: prepovedana izplačila iz premoženja, potrebnega za ohranitev OK. Dovoljeno: izplačilo bilančnega dobička ali ob predpisanem zmanjšanju OK. Prepovedane so vse oblike prikritega izplačila dobička; sankcija je vrnitev prepovedanih izplačil. Posojilo družbeniku je sicer mogoče, a mora biti vrnjeno - sicer davčne posledice."
    },
    {
      q: "Koliko glasov ima družbenik na skupščini d.o.o. po zakonu?",
      options: [
        "Vsak družbenik en glas",
        "Na vsakih dopolnjenih 50 EUR osnovnega vložka en glas",
        "Glasove določi poslovodja",
        "Sorazmerno s starostjo deleža"
      ],
      correct: 1,
      explanation: "ZGD-1: en glas na vsakih dopolnjenih 50 EUR osnovnega vložka (če pogodba ne določa drugače). Za preprečitev spremembe družbene pogodbe torej zadostuje več kot 25 % glasov (sprememba zahteva 3/4)."
    },
    {
      q: "Posameznik želi v treh mesecih ustanoviti tri d.o.o. Ali lahko?",
      options: [
        "Da, brez omejitev",
        "Ne - v treh mesecih lahko ustanovi le eno d.o.o. oziroma pridobi delež le v eni d.o.o.",
        "Da, če ima dovolj kapitala",
        "Da, a le z dovoljenjem AJPES"
      ],
      correct: 1,
      explanation: "Omejitev ustanavljanja (ZGD-1, proti veriženju): posameznik lahko v treh mesecih ustanovi eno d.o.o. oziroma pridobi poslovni delež le v eni d.o.o."
    }
  ]
};
