// Pravo - 2. kolokvij - Deck 4: Delniška družba
module.exports = {
  id: "pk2-dd",
  name: "Delniška družba (d.d.)",
  questions: [
    {
      q: "Kakšen je minimalni osnovni kapital delniške družbe in koliko ga mora biti vplačanega pred vpisom?",
      options: [
        "7.500 EUR; vplačan v celoti",
        "25.000 EUR; vsaj 25 % emisijskega zneska vsake delnice, stvarni vložki v celoti; vsaj 1/3 OK mora biti v denarju",
        "50.000 EUR; vsaj polovica",
        "25.000 EUR; nič pred vpisom"
      ],
      correct: 1,
      explanation: "Min. OK d.d. je 25.000 EUR. Pred vpisom v register: vsaj 25 % emisijskega zneska delnice; stvarni vložek v celoti. Vsaj 1/3 OK mora biti v denarju. Temeljna dolžnost delničarja je vplačilo emisijskega zneska delnice; za dolgove družbe delničarji ne odgovarjajo."
    },
    {
      q: "Kaj pomeni statutarna strogost pri d.d.?",
      options: [
        "Statut lahko določi karkoli",
        "V statutu se lahko dogovori le tisto, kar zakon izrecno dovoljuje - nasprotje pogodbene svobode pri d.o.o.",
        "Statut mora potrditi ustavno sodišče",
        "Statuta ni mogoče spreminjati"
      ],
      correct: 1,
      explanation: "Temeljni akt d.d. je STATUT, za katerega velja statutarna strogost: dogovoriti se je mogoče le tisto, kar zakon izrecno dovoljuje. Pri d.o.o. velja obratno - pogodbena svoboda (vse, česar zakon ne prepoveduje). D.d. je zato manj fleksibilna."
    },
    {
      q: "Kateri je trojni pomen delnice?",
      options: [
        "Alikvotni del OK, skupek korporacijskih pravic, vrednostni papir",
        "Denar, blago, storitev",
        "Lastnina, posest, imetništvo",
        "Dividenda, obresti, kupnina"
      ],
      correct: 0,
      explanation: "Delnica je: (1) alikvotni (sorazmerni) del OK, (2) skupek korporacijskih pravic (premoženjskih in upravljavskih), (3) vrednostni papir. Delnice lahko izdajo samo delniške družbe; celoten OK je razdeljen na delnice."
    },
    {
      q: "Kakšna je razlika med nominalnimi in kosovnimi delnicami?",
      options: [
        "Nominalne se glasijo na nominalni znesek (najmanj 1 EUR ali večkratnik); kosovne nimajo nominalnega zneska - vsaki pripada enak pripadajoči znesek v OK glede na število delnic",
        "Kosovne delnice so vredne več",
        "Nominalne delnice nimajo glasovalne pravice",
        "Kosovne delnice se ne smejo prodajati"
      ],
      correct: 0,
      explanation: "Nominalna delnica: glasi se na nominalni znesek (min. 1 EUR ali večkratnik); OK = št. delnic x nominalna vrednost. Kosovna delnica: pripadajoči znesek v OK = OK / število delnic (ne sme biti pod 1 EUR). V Sloveniji so skoraj vse delnice kosovne."
    },
    {
      q: "Kakšno je razmerje med emisijsko, nominalno in tržno vrednostjo delnice?",
      options: [
        "Emisijska vrednost ne sme biti manjša od nominalne (lahko je večja); tržna je lahko višja ali nižja od obeh",
        "Vse tri morajo biti enake",
        "Tržna vrednost ne sme presegati nominalne",
        "Emisijska mora biti nižja od nominalne"
      ],
      correct: 0,
      explanation: "Emisijska vrednost (ob izdaji, plača jo prvi delničar) ne sme biti pod nominalno/pripadajočim zneskom - zaradi zagotavljanja OK; lahko je večja. Tržna vrednost (na trgu) je lahko višja ali nižja od obeh. Nominalna vrednost je računovodska kategorija za izračun OK."
    },
    {
      q: "Ali sme d.d. delničarjem vrniti ali obrestovati vplačane vložke?",
      options: [
        "Da, s sklepom skupščine",
        "Ne - velja načelo trajnosti in nespremenljivosti delniškega kapitala; družba lahko izplača samo bilančni dobiček",
        "Da, po petih letih",
        "Da, do višine 10 % OK"
      ],
      correct: 1,
      explanation: "Vložki se delničarjem ne smejo vrniti niti obrestovati (načeli zagotovitve in ohranitve OK). Delničar 'izstopi' samo tako, da delnico proda drugemu. Družba lahko izplača le bilančni dobiček. Delničarji lahko do premoženja družbe pridejo le: pri izplačilu bilančnega dobička, pri zmanjšanju OK in ob prenehanju družbe."
    },
    {
      type: "match",
      q: "Poveži pravico delničarja s kategorijo.",
      pairs: [
        { term: "Pravica do dividende", def: "Premoženjska - pogoja: dobiček in sklep skupščine o delitvi" },
        { term: "Prednostni nakup novih emisij", def: "Premoženjska - sorazmerno z deležem v OK pri povečanju OK" },
        { term: "Alikvotni delež pri likvidaciji", def: "Premoženjska - po absolutni prednosti poplačila upnikov" },
        { term: "Glasovalna pravica", def: "Upravljavska - temeljno pravilo: ena delnica, en glas" },
        { term: "Izpodbijanje sklepov skupščine", def: "Upravljavska - vsak delničar, če je sklep v nasprotju s statutom ali zakonom" }
      ],
      explanation: "Delničarji niso lastniki družbe niti njeni upniki - delnica prinaša korporacijska upravičenja. Iz delitve dobička s statutom ni mogoče izključiti določene skupine delničarjev."
    },
    {
      q: "Kdaj postane delnica vrednostni papir?",
      options: [
        "S podpisom statuta",
        "Ko KDD vpiše delnice v centralni register nematerializiranih vrednostnih papirjev (po vpisu družbe v sodni register)",
        "Z natisom listine",
        "S prvo prodajo na borzi"
      ],
      correct: 1,
      explanation: "D.d. lahko delnice izda šele po vpisu v sodni register; delnica postane vrednostni papir z vpisom v centralni register pri KDD. Delnice so nematerializirani vrednostni papirji (NVP) - pravice se pridobijo, omejijo ali prenehajo samo z vpisom v centralni register. Temeljna značilnost: preprosta in prosta prenosljivost."
    },
    {
      q: "Kaj so vinkulirane delnice?",
      options: [
        "Delnice brez glasovalne pravice",
        "Delnice z omejenim prenosom - prodaja tretji osebi le z odobritvijo družbe; mogoče samo pri imenskih delnicah, če statut tako določa ob ustanovitvi",
        "Delnice v lasti države",
        "Delnice, ki kotirajo na borzi"
      ],
      correct: 1,
      explanation: "Vinkulacija = omejitev prenosa delnice (soglasje družbe). Mogoča samo pri imenskih delnicah in samo, če je določena v statutu ob ustanovitvi; za delnice izven organiziranega trga iz utemeljenih razlogov v statutu; za javne d.d. (organiziran trg) vinkulacija ni mogoča oziroma je še bolj omejena."
    },
    {
      q: "Kakšna je razlika med navadnimi in prednostnimi delnicami?",
      options: [
        "Navadne dajejo upravljavske in premoženjske pravice; prednostne dajejo še dodatne prednosti (npr. pri dividendi, likvidaciji), a ne pri glasovanju; prednostnih je lahko največ polovica",
        "Prednostne delnice imajo več glasov",
        "Navadne delnice nimajo pravice do dividende",
        "Prednostne delnice so vedno državne"
      ],
      correct: 0,
      explanation: "Prednostne delnice dajejo dodatne pravice (prednost pri dividendi, pri likvidaciji), NE smejo pa dajati prednosti pri glasovanju; lahko so tudi brez glasovalne pravice. Največ polovica delnic je lahko prednostnih. Če prednostni znesek ni izplačan (in zaostanek ni poravnan naslednje leto), delnice brez glasovalne pravice pridobijo glasovalno pravico do poplačila."
    },
    {
      q: "Kakšna je razlika med kumulativnimi in participativnimi prednostnimi delnicami?",
      options: [
        "Kumulativna daje pravico do dividende za vsako leto z dobičkom, tudi če skupščina odloči, da se dobiček ne deli; participativna daje prednostno dividendo pred navadnimi delničarji (in še delež preostanka)",
        "Kumulativne delnice imajo dva glasova",
        "Participativne delnice se ne smejo prodajati",
        "Razlike ni"
      ],
      correct: 0,
      explanation: "Kumulativna (zbirna): pravica do dividende za vsako poslovno leto z dobičkom, tudi če skupščina odloči, da se ne deli (a dobiček mora obstajati - sicer bi kršili ohranitev OK). Participativna (udeležbena): prednostna dividenda pred navadnimi delničarji + udeležba pri preostanku."
    },
    {
      q: "Kaj velja za lastne delnice d.d.?",
      options: [
        "Družba jih lahko prosto kupuje",
        "Izvirno pridobivanje je prepovedano; derivativno močno omejeno; iz lastnih delnic družba nima nobenih pravic; presežek nad 10 % mora odsvojiti v 3 letih",
        "Iz njih družba prejema dividende",
        "Družba lahko z njimi glasuje na skupščini"
      ],
      correct: 1,
      explanation: "ZGD-1 prepoveduje izvirno pridobivanje lastnih delnic (ob ustanovitvi ali povečanju OK) in omejuje derivativno (na sekundarnem trgu). Če dovoljeno pridobljene delnice presegajo 10 %, jih mora družba odsvojiti v 3 letih. Iz lastnih delnic družba NIMA pravic (ni dividend, ni glasovanja). Razlogi omejitev: varstvo OK, preprečitev diskriminacije delničarjev in glasovanja uprave sami sebi."
    },
    {
      q: "Katera sta postopka ustanovitve d.d.?",
      options: [
        "Sočasna (simultana) - ustanovitelji sami prevzamejo vse delnice; postopna (sukcesivna) - delnice se vpisujejo na podlagi oglasa z vabilom k javnemu vpisu",
        "Redna in skrajšana",
        "Notarska in sodna",
        "Zasebna in državna"
      ],
      correct: 0,
      explanation: "Simultana: vsi ustanovitelji sprejmejo in podpišejo statut ter sami prevzamejo vse delnice; imenujejo prvi nadzorni svet/upravni odbor, ta upravo/izvršne direktorje. Sukcesivna: del delnic prevzamejo ustanovitelji, investitorje iščejo z oglasom (prospekt). Tri faze: predinkorporacijska (dogovor), organiziranje in strukturiranje (statut, vpis OK), inkorporiranje (vpis v register - pravna osebnost)."
    },
    {
      q: "Kateri organi sestavljajo dvotirni in kateri enotirni sistem upravljanja d.d.?",
      options: [
        "Dvotirni: skupščina, nadzorni svet, uprava; enotirni: skupščina in upravni odbor (ta lahko imenuje izvršne direktorje)",
        "Dvotirni: dva direktorja; enotirni: en direktor",
        "Dvotirni: skupščina in uprava; enotirni: samo uprava",
        "Oba sistema imata iste organe, razlika je v imenu"
      ],
      correct: 0,
      explanation: "Dvotirni (tradicionalni germanski): skupščina + nadzorni svet + uprava; ločenost delničarjev od uprave - skupščina uprave ne more neposredno zamenjati (le prek NS). Enotirni: skupščina + upravni odbor (vodi IN nadzira); večja fleksibilnost in avtonomija; javne d.d. morajo imenovati izvršne direktorje. Sistem določijo ustanovitelji v statutu."
    },
    {
      q: "Kdo imenuje upravo v dvotirnem sistemu in za koliko časa?",
      options: [
        "Skupščina za 4 leta",
        "Nadzorni svet za največ 6 let z možnostjo neomejenega ponovnega imenovanja",
        "Sodišče za nedoločen čas",
        "Delavci za 2 leti"
      ],
      correct: 1,
      explanation: "Upravo imenuje nadzorni svet za največ 6 let (ponovna imenovanja neomejena). Uprava vodi posle samostojno in na lastno odgovornost ter zastopa družbo brez omejitev (omejitve ne učinkujejo proti tretjim). Predsednik uprave je v veččlanski upravi obvezen. Član uprave ni nujno delničar."
    },
    {
      q: "Iz katerih razlogov lahko nadzorni svet odpokliče člana uprave?",
      options: [
        "Brez razloga, kadarkoli",
        "Iz utemeljenih razlogov: hujša kršitev obveznosti, nesposobnost vodenja poslov, izrek nezaupnice na skupščini, drugi ekonomsko-poslovni razlogi",
        "Samo s soglasjem člana uprave",
        "Samo ob stečaju"
      ],
      correct: 1,
      explanation: "Za odpoklic uprave so potrebni UTEMELJENI razlogi (za razliko od poslovodje d.o.o. in izvršnih direktorjev, ki jih je mogoče odpoklicati brez razlogov). Uprava mora vsaj 1x letno poročati NS o poslovni politiki, donosnosti, poteku poslov in poslih, pomembnih za donosnost/plačilno sposobnost. Vpis člana uprave v register je deklaratoren."
    },
    {
      q: "Kakšne so pristojnosti nadzornega sveta?",
      options: [
        "Vodi tekoče posle družbe",
        "Nadzoruje vodenje poslov, pregleduje knjige, zahteva poročila, imenuje in odpokliče upravo, pregleda letno poročilo, lahko zahteva revizijo in predlaga sklic skupščine",
        "Izplačuje dividende",
        "Sprejema statut"
      ],
      correct: 1,
      explanation: "NS je nadzorni organ: nadzor vodenja poslov, pregled knjig in dokumentacije, vprašanja in poročila od uprave, IZKLJUČNA pristojnost imenovanja/odpoklica uprave, mnenje o letnem poročilu (če ga potrdi, je sprejeto), revizija, predlog sklica skupščine. Predsednik NS zastopa družbo proti članom uprave. Najmanj 3 člani: predstavniki delničarjev (voli skupščina) + predstavniki delavcev (voli svet delavcev). Člani NS ne morejo biti udeleženi pri dobičku."
    },
    {
      q: "O čem odloča skupščina d.d.?",
      options: [
        "O vodenju vsakodnevnih poslov",
        "O letnem poročilu (pogojno), bilančnem dobičku, imenovanju NS/upravnega odbora, razrešnici, spremembah statuta, povečanju/zmanjšanju kapitala, prenehanju družbe, imenovanju revizorja, politiki prejemkov",
        "O sklepanju pogodb z dobavitelji",
        "O zaposlovanju delavcev"
      ],
      correct: 1,
      explanation: "Skupščina je hierarhično najvišji organ (vsi delničarji), odloča o temeljnih vprašanjih. O vodenju poslov NE more odločati, razen če to zahteva poslovodstvo. Letno poročilo sprejema le, če ga NS/UO ni potrdil, če ji odločitev prepustijo ali če določa statut. Zaseda vsaj 1x letno; skliče jo poslovodstvo, NS ali manjšina delničarjev."
    },
    {
      q: "Kako se skliče skupščina d.d.?",
      options: [
        "S priporočenim pismom 25 dni prej",
        "Objava vsaj 30 dni pred skupščino (AJPES ali dnevnik/glasilo); sklic vsebuje čas, kraj, dnevni red in predloge sklepov; vsak sklep potrdi notar",
        "Po elektronski pošti 8 dni prej",
        "Sklica ni treba objaviti"
      ],
      correct: 1,
      explanation: "Sklic skupščine d.d.: objava vsaj 30 dni prej (AJPES ali dnevnik na celotnem območju Slovenije + glasilo/elektronski medij). Vsak skupščinski sklep potrdi notar v notarskem zapisniku; poslovodja v 24 urah prepis pošlje sodnemu registru. Sklepi se sprejemajo z navadno večino, razen če zakon/statut določata drugače. (Primerjaj: d.o.o. - priporočeno pismo 25 dni.)"
    },
    {
      q: "Kdo ne more biti član organa vodenja ali nadzora v d.d.?",
      options: [
        "Oseba, mlajša od 40 let",
        "Poslovno nesposobna oseba; član drugega organa vodenja/nadzora iste družbe; pravnomočno obsojeni za kazniva dejanja zoper gospodarstvo, delovno razmerje, pravni promet, premoženje, okolje; oseba s prepovedjo opravljanja poklica",
        "Oseba brez univerzitetne izobrazbe",
        "Tujec"
      ],
      correct: 1,
      explanation: "Omejitve: poslovna nesposobnost, hkratno članstvo v drugem organu vodenja ali nadzora TE družbe, pravnomočna obsodba (gospodarstvo, delovno razmerje in socialna varnost, pravni promet, premoženje, okolje), varnostni ukrep prepovedi poklica (dokler traja). Član upravnega odbora tudi ne sme biti že član NS/UO v treh družbah."
    },
    {
      q: "Kakšna je razlika med upravo in izvršnimi direktorji?",
      options: [
        "Uprava vodi posle samostojno in na lastno odgovornost, odpokliče se le iz utemeljenih razlogov; izvršni direktorji upoštevajo navodila in omejitve ter so lahko odpoklicani brez posebnih razlogov",
        "Izvršni direktorji so nadrejeni upravi",
        "Uprava obstaja v enotirnem, izvršni direktorji v dvotirnem sistemu",
        "Razlike ni"
      ],
      correct: 0,
      explanation: "Uprava (dvotirni): samostojno, na lastno odgovornost; odpoklic le iz utemeljenih razlogov. Izvršni direktorji (enotirni): vodijo tekoče posle po navodilih skupščine, statuta, upravnega odbora in poslovnika; odpoklic brez posebnih razlogov; če je izvršni direktor hkrati član UO, po odpoklicu ostane član UO. UO nanje lahko prenese: vodenje tekočih poslov, prijave registru, poslovne knjige, sestavo letnega poročila.",
      more: "Upravni odbor: najmanj 3 člani, voli jih skupščina (odpoklic s 3/4 oddanih glasov), vsaj en predstavnik delavcev (svet delavcev). Predsednik UO (razen pri malih d.d.) ne sme biti izvršni direktor; pri javnih d.d. mora biti vsaj en član UO izvršni direktor."
    },
    {
      q: "Kaj je razrešnica?",
      options: [
        "Odpoved člana uprave",
        "Sklep, s katerim skupščina potrdi in odobri delo organov vodenja ali nadzora v poslovnem letu",
        "Odpoklic nadzornega sveta",
        "Razveljavitev statuta"
      ],
      correct: 1,
      explanation: "Z razrešnico skupščina potrdi in odobri delo organov vodenja/nadzora - izraz zadovoljstva. Nepodelitev razrešnice še NE pomeni nezaupnice posameznemu članu."
    },
    {
      q: "Kakšna je razlika med holdingom in koncernom?",
      options: [
        "Holding: matična družba samo obvladuje (owna) druge družbe brez lastne dejavnosti; koncern: matična družba ima poleg obvladovanja tudi svojo dejavnost",
        "Holding je osebna, koncern kapitalska družba",
        "Koncern je prepovedan",
        "Holding je vedno v državni lasti"
      ],
      correct: 0,
      explanation: "Holding: mati ne opravlja lastne dejavnosti, samo obvladuje hčerinske družbe. Koncern: mati ima tudi svojo dejavnost. Pravo povezanih družb ureja razmerja, da mati ne bi preveč obvladovala hčerinskih družb (pogosto tudi davčni razlogi)."
    },
    {
      q: "D.d. ima OK 100.000 EUR, razdeljen na 10.000 kosovnih delnic. Kolikšen je pripadajoči znesek ene delnice in koliko glasov ima delničar s 500 delnicami?",
      options: [
        "10 EUR; 500 glasov",
        "100 EUR; 50 glasov",
        "1 EUR; 5.000 glasov",
        "10 EUR; 50 glasov"
      ],
      correct: 0,
      explanation: "Pripadajoči znesek = OK / število delnic = 100.000 / 10.000 = 10 EUR. Temeljno pravilo: ena delnica, en glas - 500 delnic = 500 glasov. Statut lahko določi omejitev glasov (npr. največ X % - a ne samo za enega delničarja; v javnih d.d. omejitev ni mogoča)."
    }
  ]
};
