// Pravo - 2. kolokvij - Deck 1: Korporacijsko pravo - splošno
module.exports = {
  id: "pk2-korp",
  name: "Korporacijsko pravo - splošno",
  questions: [
    {
      q: "Kaj določa Ustava RS kot temeljni pravni vir korporacijskega prava?",
      options: [
        "Gospodarska pobuda je svobodna; zakon določa pogoje za ustanavljanje; dejavnost se ne sme izvajati v nasprotju z javno koristjo",
        "Vse gospodarske družbe morajo biti v državni lasti",
        "Gospodarsko dejavnost lahko opravljajo samo pravne osebe",
        "Ustanovitev družbe mora odobriti vlada"
      ],
      correct: 0,
      explanation: "Ustava RS: (1) gospodarska pobuda je svobodna, (2) zakon določa pogoje za ustanavljanje gospodarskih organizacij, (3) gospodarska dejavnost se ne sme izvajati v nasprotju z javno koristjo. Osrednji zakon je ZGD-1."
    },
    {
      q: "Kaj je gospodarska družba?",
      options: [
        "Vsaka skupina ljudi, ki skupaj posluje",
        "Pravna oseba, ki na trgu samostojno opravlja pridobitno dejavnost kot svojo izključno dejavnost",
        "Fizična oseba, ki opravlja registrirano dejavnost",
        "Državna ustanova za pospeševanje gospodarstva"
      ],
      correct: 1,
      explanation: "Gospodarska družba je pravna oseba, ki na trgu samostojno opravlja pridobitno dejavnost (dejavnost zaradi pridobivanja dobička) kot izključno dejavnost. Pravna oseba postane z vpisom v sodni register; s tem in z imenovanjem zakonitega zastopnika pridobi tudi poslovno sposobnost."
    },
    {
      q: "Kakšen je pravni položaj družbenikov do gospodarske družbe?",
      options: [
        "So lastniki družbe in njenega premoženja",
        "So upniki družbe in lahko kadarkoli zahtevajo vračilo vložka",
        "Niso lastniki niti upniki - imajo 'zgolj' korporacijska upravičenja (premoženjska in upravljavska)",
        "So solidarno odgovorni za vse dolgove družbe"
      ],
      correct: 2,
      explanation: "Družbeniki NISO lastniki družbe (družba ni stvar, ampak pravna oseba - si imetnik deleža) in ne morejo prosto razpolagati s premoženjem, ki so ga prenesli nanjo, niti niso njeni upniki. Imajo korporacijska upravičenja: premoženjska (delež dobička) in upravljavska (vodenje, odločanje)."
    },
    {
      q: "Katere pravnoorganizacijske oblike so OSEBNE in katere KAPITALSKE družbe?",
      options: [
        "Osebne: d.n.o. in k.d.; kapitalske: d.o.o., d.d., k.d.d. in evropska delniška družba",
        "Osebne: d.o.o. in d.d.; kapitalske: d.n.o. in k.d.",
        "Osebne: s.p. in d.o.o.; kapitalske: d.d. in k.d.",
        "Vse družbe so kapitalske"
      ],
      correct: 0,
      explanation: "Osebne: družba z neomejeno odgovornostjo (d.n.o.) in komanditna družba (k.d.). Kapitalske: d.o.o., delniška družba (d.d.), komanditna delniška družba (k.d.d.), evropska delniška družba. Družbe se lahko ustanovijo SAMO v zakonsko določenih oblikah (numerus clausus). S.p. NI družba, ampak fizična oseba."
    },
    {
      q: "Katera je temeljna razlika med osebnimi in kapitalskimi družbami?",
      options: [
        "Število družbenikov",
        "Odgovornost družbenikov za dolgove: pri osebnih vsaj en družbenik odgovarja z vsem premoženjem, pri kapitalskih družbeniki ne odgovarjajo",
        "Višina osnovnega kapitala",
        "Osebne družbe ne smejo zaposlovati delavcev"
      ],
      correct: 1,
      explanation: "Temeljna razlika je odgovornost za dolgove družbe: osebne družbe - vsaj en družbenik odgovarja subsidiarno z vsem svojim premoženjem; kapitalske - družbeniki ne odgovarjajo (njihova obveznost je le vplačilo vložka). Za obveznosti družbe pa vedno primarno odgovarja družba sama z vsem svojim premoženjem."
    },
    {
      q: "Kaj je firma in katere so njene obvezne sestavine?",
      options: [
        "Firma je ime, s katerim družba nastopa v pravnem prometu; obvezni sestavini sta navedba dejavnosti in pravnoorganizacijske oblike",
        "Firma je poslovni prostor družbe; obvezna sestavina je naslov",
        "Firma je logotip družbe brez predpisanih sestavin",
        "Firma je davčna številka družbe"
      ],
      correct: 0,
      explanation: "Firma je ime družbe - omogoča individualizacijo. Obvezne sestavine: navedba dejavnosti + pravnoorganizacijska oblika. Osebne družbe: še imena osebno odgovornih družbenikov (ali oznaka, da jih je več); kapitalske: fantazijski dodatek. Jasno se mora ločiti od drugih firm, biti v slovenskem jeziku in ne posegati v pravice intelektualne lastnine.",
      more: "Tuji izrazi so izjemoma dovoljeni, če: ustrezajo imenom/priimkom družbenikov, registriranim znamkam, gre za domišljijska poimenovanja ali za mrtvi jezik. V prometu se lahko uporablja skrajšana firma (fantazijski dodatek + oblika)."
    },
    {
      q: "Kaj je sedež družbe?",
      options: [
        "Točen poslovni naslov z ulico in hišno številko",
        "Kraj, ki je kot sedež vpisan v sodni register (npr. Ljubljana) - ne poslovni naslov",
        "Kraj, kjer prebiva direktor",
        "Kraj, kjer je družba plačala največ davkov"
      ],
      correct: 1,
      explanation: "Sedež je KRAJ (ne naslov!), vpisan v sodni register - kraj opravljanja dejavnosti, poslov ali poslovodstva. Poslovni naslov je točen naslov, prav tako vpisan v register, a NI sestavina ustanovitvene pogodbe. O spremembi sedeža odločajo družbeniki/skupščina (sprememba akta + registra)."
    },
    {
      q: "Katero trojno funkcijo ima osnovni kapital v kapitalskih družbah?",
      options: [
        "Temelj za ugotovitev korporacijskega deleža družbenika, pridobitev premoženja za začetek poslovanja, jamstvo upnikom",
        "Plačilo davkov, plač in dividend",
        "Rezerva za izgube, sklad za investicije, nagrada poslovodstvu",
        "Osnova za obračun DDV, dobička in prispevkov"
      ],
      correct: 0,
      explanation: "Trojna funkcija OK: (1) temelj za ugotovitev korporacijskega deleža družbenika, (2) zagotavlja premoženje za začetek poslovanja, (3) jamstvo upnikom. OK mora biti opredeljen v statutu (d.d.) oz. družbeni pogodbi (d.o.o.) in registriran. Vplača se z denarjem ali stvarnim vložkom."
    },
    {
      q: "Kateri načeli varujeta upnike v zvezi z osnovnim kapitalom?",
      options: [
        "Načelo zagotovitve kapitala in načelo ohranitve osnovnega kapitala",
        "Načelo javnosti in načelo zaupanja",
        "Načelo subsidiarnosti in solidarnosti",
        "Načelo dispozitivnosti in kogentnosti"
      ],
      correct: 0,
      explanation: "Načelo zagotovitve kapitala (OK mora biti dejansko vplačan) in načelo ohranitve OK (družbeniki si vplačanega kapitala ne smejo izplačati; prepovedana so izplačila iz premoženja, potrebnega za ohranitev OK). Družbeniki pa niso dolžni dopolnjevati OK, če se premoženje zmanjša - družba lahko posluje z minusom."
    },
    {
      type: "match",
      q: "Poveži družbo z njenim zakonitim zastopnikom.",
      pairs: [
        { term: "d.n.o.", def: "Vsak družbenik" },
        { term: "k.d. in k.d.d.", def: "Komplementar" },
        { term: "d.o.o.", def: "Direktor (poslovodja)" },
        { term: "d.d.", def: "Uprava oziroma upravni odbor" }
      ],
      explanation: "Družba kot pravna oseba ne more izražati svoje volje - zastopajo jo zakoniti zastopniki, ki lahko opravljajo vsa pravna dejanja iz pravne sposobnosti družbe."
    },
    {
      q: "Kakšna je razlika med zakonitim zastopnikom in pooblaščencem?",
      options: [
        "Zakoniti zastopnik ima upravičenje na podlagi zakona/akta družbe in nima omejitev; pooblaščenec ga dobi z izjavo volje zastopanega in je omejen z obsegom pooblastila",
        "Pooblaščenec ima vedno več pravic kot zakoniti zastopnik",
        "Zakoniti zastopnik zastopa samo pred sodiščem",
        "Razlike ni"
      ],
      correct: 0,
      explanation: "Zakoniti zastopnik: določen z zakonom ali aktom o ustanovitvi, lahko dela vse. Pooblaščenec: upravičenje na podlagi izjave volje zastopanega. Generalno (splošno) pooblastilo: vsi redni posli, NE pa menične obveznosti, poroštvo, poravnava, odtujitev/obremenitev nepremičnine, spor, arbitražni sporazum. Specialno: samo posli, za katere je pooblaščen."
    },
    {
      q: "Kaj lahko dela prokurist?",
      options: [
        "Vse posle družbe, vključno s prodajo nepremičnin",
        "Vse posle družbe, RAZEN odsvojitve in obremenitve nepremičnin",
        "Samo posle, navedene v pooblastilu",
        "Samo sklepati pogodbe o zaposlitvi"
      ],
      correct: 1,
      explanation: "Prokura je zastopniško upravičenje, določeno z zakonom: prokurist lahko opravlja VSE posle, razen odsvojitve in obremenitve nepremičnin. Omejitve prokure proti tretjim osebam nimajo pravnega učinka - sklepanje poslov s prokuristom je za tretje varno. Prokurist je vpisan v register (AJPES), navadni pooblaščenec ni. Prokuro podeli zakoniti zastopnik (enemu ali več osebam).",
      more: "Druga posebna pooblastila: pooblastilo po zaposlitvi (prodajalci v trgovini - posli, povezani z njihovim delom) in trgovski potnik (samo posli prodaje blaga, navedeni v pooblastilu)."
    },
    {
      q: "Kaj je spregled pravne osebnosti?",
      options: [
        "Redni način poplačila upnikov kapitalske družbe",
        "Izjemen institut, ko za obveznosti družbe odgovarjajo z vsem premoženjem tudi njeni družbeniki - uporablja se subsidiarno, ko druga sredstva ne zagotavljajo poplačila upnikom",
        "Postopek izbrisa družbe iz registra",
        "Kazenska sankcija zoper poslovodstvo"
      ],
      correct: 1,
      explanation: "Spregled pravne osebnosti je izjema od pravila, da družbeniki kapitalskih družb ne odgovarjajo. Uporablja se subsidiarno in samo za poplačilo upnikom. V praksi ga je težko dokazati."
    },
    {
      q: "Kateri od naštetih NI pogoj za spregled pravne osebnosti?",
      options: [
        "Družbeniki so družbo zlorabili za dosego cilja, ki je zanje prepovedan",
        "Družbeniki so družbo zlorabili za oškodovanje upnikov",
        "Družbeniki niso spoštovali ločenosti premoženja družbe od svojega",
        "Družba je poslovala z izgubo tri leta zapored"
      ],
      correct: 3,
      explanation: "Izguba sama po sebi NI razlog za spregled. Pogoji (alternativno): zloraba za prepovedan cilj, zloraba za oškodovanje upnikov, mešanje premoženja družbe s svojim, zmanjšanje premoženja družbe v svojo korist ob vedenju (ali dolžnem vedenju), da družba ne bo mogla poravnati obveznosti.",
      more: "Kriterij je objektiven: ni treba dokazati, da sta družbenika vedela - dovolj je, da bi kot skrbna strokovnjaka morala vedeti (standard dobrega strokovnjaka)."
    },
    {
      q: "Katere zahteve morajo biti izpolnjene, da je podatek poslovna skrivnost?",
      options: [
        "Je skrivnost (ni splošno znan), ima tržno vrednost in imetnik je razumno ukrepal za ohranitev tajnosti",
        "Podatek mora biti registriran pri Uradu za intelektualno lastnino",
        "Zadostuje ustni dogovor med zaposlenimi",
        "Podatek mora biti starejši od petih let"
      ],
      correct: 0,
      explanation: "Tri zahteve (Zakon o poslovni skrivnosti): ni splošno znan, ima tržno vrednost, razumni ukrepi za tajnost (pisna določitev + seznanjenost vseh oseb, ki prihajajo v stik - NDA, omejitev dostopa). Poslovna skrivnost ne morejo biti javne informacije, informacije o kršitvi zakona ali dobrih poslovnih običajev.",
      wrong: {
        1: "Registracija je značilna za patent - ta je javno dostopen, poslovna skrivnost pa ravno ni."
      }
    },
    {
      q: "Na koga se nanaša konkurenčna prepoved po ZGD-1?",
      options: [
        "Samo na delavce v delovnem razmerju",
        "Na družbenike d.n.o., komplementarje k.d., družbenike in poslovodje d.o.o., člane uprave, upravnega odbora in nadzornega sveta d.d. ter prokuriste",
        "Na vse državljane",
        "Samo na direktorje delniških družb"
      ],
      correct: 1,
      explanation: "ZGD-1 (ne delovnopravna zakonodaja!): navedene osebe ne smejo sodelovati v teh vlogah v drugi konkurenčni družbi. Sankcija: odškodninska odgovornost. Delovnopravna konkurenčna prepoved pa delavcu med trajanjem razmerja brez pisnega soglasja delodajalca prepoveduje konkurenčno dejavnost; konkurenčna klavzula lahko velja še največ 2 leti po prenehanju."
    },
    {
      q: "Kdo vodi sodni register in kdo javno objavlja podatke?",
      options: [
        "Vodijo ga okrožna sodišča, za javno objavo skrbi AJPES",
        "Vodi ga AJPES, objavlja ministrstvo",
        "Vodi ga vlada, objavlja Uradni list",
        "Vodijo ga upravne enote, objavlja FURS"
      ],
      correct: 0,
      explanation: "Sodni register je javna knjiga s pravno pomembnimi dejstvi o subjektih vpisa. Vodijo ga okrožna sodišča, javno objavo zagotavlja AJPES. Družbe in podjetniki morajo voditi poslovne knjige, jih letno zaključiti in letna poročila objaviti na AJPES."
    },
    {
      q: "Kakšna je razlika med konstitutivnim in deklaratornim vpisom v sodni register?",
      options: [
        "Konstitutivni: pravica/razmerje nastane šele z vpisom (ustanovitev družbe); deklaratorni: razmerje je že nastalo, vpis je le obvestilo javnosti (imenovanje direktorja)",
        "Konstitutivni vpis opravi notar, deklaratornega sodišče",
        "Deklaratorni vpis je obvezen, konstitutivni prostovoljen",
        "Razlika je samo v ceni vpisa"
      ],
      correct: 0,
      explanation: "Konstitutivni vpis = pravno razmerje nastane šele z vpisom (ustanovitev družbe, sprememba družbene pogodbe). Deklaratorni = razmerje je že nastalo, vpis je obvestilo javnosti (imenovanje novega direktorja/poslovodje, izbris)."
    },
    {
      type: "match",
      q: "Poveži načelo sodnega registra z vsebino.",
      pairs: [
        { term: "Načelo obveznega vpisa", def: "Vsak subjekt vpisa je dolžan vložiti predlog za vpis" },
        { term: "Načelo javnosti", def: "Podatki so dostopni vsakomur" },
        { term: "Načelo zaupanja", def: "Vsakdo se lahko zanese na vpisane podatke" },
        { term: "Publicitetno načelo", def: "Od dneva objave vpisa se nihče ne more sklicevati, da podatka ni poznal" }
      ],
      explanation: "Štiri načela sodnega registra. Handoff z vaj: 'Nauči se načela sodnega registra' - profesor jih rad vpraša."
    },
    {
      q: "Družba sklene pogodbo v okviru dejavnosti, ki je nima registrirane. Kakšna je posledica?",
      options: [
        "Pogodba je nična",
        "Pogodba je veljavna (razen če je tretja oseba vedela za prekoračitev), družba pa stori prekršek",
        "Pogodba je izpodbojna v roku enega leta",
        "Pogodbo mora potrditi sodišče"
      ],
      correct: 1,
      explanation: "Posli izven registrirane dejavnosti so VELJAVNI, razen če je tretja oseba vedela, da dejavnost ni registrirana. Posledica za družbo je prekršek (denarna globa). Družbeniki so pri izbiri dejavnosti sicer avtonomni."
    },
    {
      q: "Kaj je sistem SPOT?",
      options: [
        "Sistem vstopnih točk, prek katerih stranke vlagajo vloge za registracijo gospodarskih družb in drugih subjektov",
        "Register plačilno nesposobnih podjetij",
        "Davčna blagajna za gotovinsko poslovanje",
        "Borza vrednostnih papirjev"
      ],
      correct: 0,
      explanation: "SPOT (prej e-VEM) ponuja storitve, prek katerih stranke vlagajo vloge za registracijo gospodarskih družb in drugih subjektov. Prijava s.p. je mogoča na vsaki točki SPOT, z digitalnim potrdilom tudi elektronsko."
    },
    {
      q: "Ali lahko upnik družbe poseže na osebno premoženje družbenika d.o.o.?",
      options: [
        "Da, vedno",
        "Ne - premoženje družbe in družbenika sta ločeni; izjema je le spregled pravne osebnosti",
        "Da, če dolg presega 10.000 EUR",
        "Da, s soglasjem sodišča"
      ],
      correct: 1,
      explanation: "Premoženje družbe je ločeno od premoženja družbenikov - upnik lahko predlaga izvršbo samo na premoženje pravne osebe. Družbeniki kapitalskih družb za dolgove ne odgovarjajo; izjema je spregled pravne osebnosti (zloraba, mešanje premoženja). Prav tako ni mogoče pobotati terjatve do družbe s terjatvijo do družbenika - sta različni osebi."
    }
  ]
};
