// Pravo - 2. kolokvij - Deck 2: Samostojni podjetnik in osebne družbe
module.exports = {
  id: "pk2-sp",
  name: "S.p. in osebne družbe",
  questions: [
    {
      q: "Kaj je samostojni podjetnik (s.p.)?",
      options: [
        "Najmanjša oblika gospodarske družbe",
        "Fizična oseba, ki na trgu samostojno opravlja pridobitno dejavnost v okviru organiziranega podjetja",
        "Pravna oseba z enim družbenikom",
        "Vsak, ki občasno opravi delo za plačilo"
      ],
      correct: 1,
      explanation: "S.p. NI gospodarska družba in ni pravna oseba - je fizična oseba, ki poklicno opravlja pridobitno dejavnost. Pravico opravljati dejavnost pridobi z vpisom v Poslovni register Slovenije (PRS), ki ga vodi AJPES. Prijava je brezplačna (točke SPOT, e-VEM)."
    },
    {
      q: "Kakšen osnovni kapital je predpisan za s.p. in kako podjetnik odgovarja za dolgove?",
      options: [
        "7.500 EUR; odgovarja samo s poslovnim premoženjem",
        "Osnovni kapital ni predpisan; za dolgove odgovarja z vsem svojim premoženjem",
        "25.000 EUR; odgovarja subsidiarno",
        "1 EUR; ne odgovarja"
      ],
      correct: 1,
      explanation: "Za s.p. minimalni OK ni predpisan. Podjetnik odgovarja z VSEM svojim premoženjem - premoženje s.p. ni ločeno od osebnega (ločnica deloma obstaja le za davčne namene). V osebnem stečaju se upniki poplačajo tako iz poslovnega kot osebnega premoženja."
    },
    {
      q: "Kaj mora podjetnik storiti najkasneje 8 dni po vpisu v poslovni register?",
      options: [
        "Odpreti trgovino",
        "Vpisati dejavnost v davčni register, register za DDV in podati prijavo na ZZZS",
        "Zaposliti vsaj enega delavca",
        "Objaviti letno poročilo"
      ],
      correct: 1,
      explanation: "V 8 dneh po vpisu v PRS: vpis v davčni register, register za davek na dodano vrednost in prijava na Zavod za zdravstveno zavarovanje Slovenije. Če so za dejavnost predpisana dovoljenja (npr. obrtno dovoljenje), dejavnosti ne sme opravljati, dokler jih ne pridobi."
    },
    {
      q: "Kakšna je razlika med podjetnikom in obrtnikom?",
      options: [
        "Ni razlike",
        "Obrtnik je ožji pojem - podjetnik, ki opravlja obrtno dejavnost; potrebuje dovoljenje (licenco) obrtne zbornice",
        "Obrtnik je pravna oseba, podjetnik fizična",
        "Podjetnik potrebuje licenco, obrtnik ne"
      ],
      correct: 1,
      explanation: "Obrtnik (Obrtni zakon) je podjetnik, ki opravlja obrtno dejavnost - bistvo je usposobljenost, opravljanje z veščino; potrebna je licenca obrtne zbornice. Svobodni poklic: dejavnost, ki jo posameznik opravlja osebno z znanjem iz formalnega izobraževanja (odvetniki, notarji, zasebni zdravniki)."
    },
    {
      q: "Kdaj lahko podjetnik vodi poslovne knjige po sistemu enostavnega knjigovodstva?",
      options: [
        "Vedno",
        "Če ima manj kot 3 delavce, letne prihodke pod 50.000 EUR in aktivo pod 25.000 EUR",
        "Če ima manj kot 10 delavcev in prihodke pod 700.000 EUR",
        "Enostavno knjigovodstvo ni dovoljeno"
      ],
      correct: 1,
      explanation: "Praviloma dvostavno knjigovodstvo; enostavno je dovoljeno, če ima manj kot 3 delavce, letne prihodke pod 50.000 EUR in povprečno aktivo pod 25.000 EUR."
    },
    {
      q: "Podjetnik se preoblikuje v d.o.o. Kako odgovarja za dolgove, nastale pred preoblikovanjem?",
      options: [
        "Zanje ne odgovarja več - prevzame jih d.o.o.",
        "Še naprej odgovarja z vsem svojim premoženjem - upniki zaradi preoblikovanja niso oškodovani",
        "Odgovarja samo do višine osnovnega kapitala d.o.o.",
        "Dolgovi s preoblikovanjem ugasnejo"
      ],
      correct: 1,
      explanation: "Dolg z univerzalnim pravnim nasledstvom preide na d.o.o., vendar podjetnik za stare dolgove še vedno odgovarja z vsem svojim premoženjem: subsidiarno (če družba ne poravna) in solidarno. Upniki preoblikovanja ne morejo preprečiti, so pa tako zaščiteni.",
      more: "Dva načina preoblikovanja: prenos podjetja na NOVO kapitalsko družbo ali na PREVZEMNO kapitalsko družbo. Začne se s pisnim sklepom o prenosu (firma in sedež, izjava o prenosu, vrednost podjetja). Nova družba celostno vstopi v pravni položaj podjetnika (univerzalno pravno nasledstvo). Prenos podjetja na podjetnika prevzemnika: pogodba v obliki notarskega zapisa."
    },
    {
      q: "Kateri elementi so bistveni za delovno razmerje?",
      options: [
        "Prostovoljna vključenost, plačilo, osebno in nepretrgano opravljanje dela po navodilih in pod nadzorom delodajalca",
        "Pisna pogodba in polni delovni čas",
        "Delo v prostorih delodajalca",
        "Članstvo v sindikatu"
      ],
      correct: 0,
      explanation: "Elementi delovnega razmerja: prostovoljna vključenost, plačilo za delo, osebno opravljanje, nepretrgano opravljanje, delo po navodilih in pod nadzorom delodajalca. Ekonomsko odvisna oseba: nima elementov delovnega razmerja, a ima zaradi ekonomske odvisnosti posebno zakonsko zaščito. Prekarno delo: atipične oblike (krajši čas, določen čas, agencijsko delo, navidezne samozaposlitve)."
    },
    {
      q: "Kaj je družba z neomejeno odgovornostjo (d.n.o.)?",
      options: [
        "Družba dveh ali več oseb, ki za obveznosti družbe odgovarjajo z vsem svojim premoženjem",
        "Družba z enim družbenikom brez odgovornosti",
        "Kapitalska družba z minimalnim OK 7.500 EUR",
        "Društvo, ki opravlja pridobitno dejavnost"
      ],
      correct: 0,
      explanation: "D.n.o. = družba dveh ali več oseb (fizičnih ali pravnih), ki za obveznosti družbe odgovarjajo z vsem svojim premoženjem. Nastane s sklenitvijo družbene pogodbe in vpisom v sodni register (konstitutiven učinek). Pogodba: notarski zapis ali zasebna listina z overjenimi podpisi. En sam ustanovitelj ni mogoč (to bi bil s.p.); navzgor družbeniki niso omejeni."
    },
    {
      q: "Kako odgovarjajo družbeniki d.n.o. za dolgove družbe?",
      options: [
        "Vsak do višine svojega vložka",
        "Solidarno (nerazdelno) z vsem svojim premoženjem - upnik lahko celoten dolg zahteva od kateregakoli družbenika; drugačen dogovor proti tretjim ni mogoč",
        "Samo glavni družbenik",
        "Sorazmerno s svojimi deleži, če se tako dogovorijo"
      ],
      correct: 1,
      explanation: "Vsi družbeniki odgovarjajo solidarno z vsem premoženjem: vsak za celoten dolg, dokler ni poplačan; upnik si prosto izbere, od koga bo terjal. Odgovornost je subsidiarna (najprej terja družbo). Dogovor o drugačni odgovornosti učinkuje samo znotraj družbe, ne proti tretjim. Družbenik, ki plača, ima regresni zahtevek do ostalih.",
      more: "Družbenik odgovarja tudi za dolgove, nastale pred njegovim izstopom iz družbe. Notranja razmerja pa so dispozitivna - uredijo jih z družbeno pogodbo."
    },
    {
      q: "Kako se po ZGD-1 deli dobiček v d.n.o., če družbena pogodba ne določa drugače?",
      options: [
        "Po enakih delih",
        "Vsakemu družbeniku najprej pripada 5 % njegovega kapitalskega deleža, preostanek se deli po enakih delih",
        "Sorazmerno z opravljenim delom",
        "O delitvi vsako leto odloči sodišče"
      ],
      correct: 1,
      explanation: "Zakonska delitev: najprej 5 % kapitalskega deleža vsakemu (če ni mogoče, se odstotek zniža), preostanek enakomerno. Kapitalski deleži niso stalni - povečujejo se z dobičkom in zmanjšujejo z izgubo ali izplačili. Družbenik ima tudi pravico vpogleda v poslovne knjige ter pravico/dolžnost vodenja poslov (če ni drugače dogovorjeno); velja konkurenčna prepoved."
    },
    {
      q: "Kaj se zgodi z d.n.o., če družbenik umre ali odpove pogodbo?",
      options: [
        "Družba avtomatično nadaljuje z dediči",
        "Družba preneha, razen če družbena pogodba določa drugače",
        "Družba se preoblikuje v d.o.o.",
        "Delež pripade državi"
      ],
      correct: 1,
      explanation: "Smrt ali odpoved družbenika je razlog za prenehanje, RAZEN če pogodba določa drugače (dedič ne vstopi kar prek oporoke - ostali se morajo strinjati; vstop novega družbenika zahteva soglasje vseh). Drugi razlogi: potek časa, sklep družbenikov, stečaj, sodna odločba, manj kot dva družbenika (zakon daje 1 leto za novega družbenika, sicer prenehanje). Preneha z izbrisom iz registra."
    },
    {
      q: "Kdo sta komplementar in komanditist v komanditni družbi?",
      options: [
        "Komplementar odgovarja z vsem svojim premoženjem in vodi posle; komanditist ne odgovarja (oziroma le do višine nevplačanega vložka) in prispeva kapital",
        "Komanditist vodi posle, komplementar prispeva denar",
        "Oba odgovarjata enako z vsem premoženjem",
        "Komplementar je vedno pravna oseba"
      ],
      correct: 0,
      explanation: "K.d. = družba dveh ali več oseb: vsaj en komplementar (odgovarja z vsem premoženjem, vodi posle, zakoniti zastopnik) in vsaj en komanditist (ne odgovarja; upnikom odgovarja samo do višine NEVPLAČANEGA vložka - če je vložek vplačal, ne odgovarja). Običajno komplementar prispeva znanje in delo, komanditist premoženje. Uporabljajo se pravila o d.n.o."
    },
    {
      q: "Ali je ime komanditista lahko v firmi komanditne družbe?",
      options: [
        "Da, obvezno",
        "Ne - v firmi so samo imena komplementarjev",
        "Da, če s tem soglaša",
        "Da, a le pri dvojni družbi"
      ],
      correct: 1,
      explanation: "Firma k.d. je podobna kot pri d.n.o., vendar ime in priimek komanditista NISTA vključena - v firmi so samo (osebno odgovorni) komplementarji. Komanditist tudi ni upravičen zastopati družbe, razen če mu komplementar podeli prokuro ali posebno pooblastilo.",
      more: "Če komanditist kljub temu nastopa kot zastopnik/v firmi, so posli veljavni, a ga bodo tretji lahko obravnavali kot komplementarja (odgovornost!)."
    },
    {
      q: "Kako se deli dobiček komanditistu v k.d.?",
      options: [
        "Komanditist dobička nikoli ne dobi",
        "Dobiček se pripisuje njegovemu kapitalskemu deležu, dokler ta ne doseže dogovorjenega vložka; šele nato se mu dobiček izplačuje",
        "Komanditist vedno dobi polovico dobička",
        "Dobiček se izplačuje samo komplementarjem"
      ],
      correct: 1,
      explanation: "Vsakemu družbeniku pripada 5 % kapitalskega deleža, presežek po razmerju deležev. Ključno: komanditistu ni dovoljeno izplačevati dobička, dokler njegov kapitalski delež ne doseže vložka, ki bi ga moral vplačati - do takrat se dobiček pripisuje deležu."
    },
    {
      q: "Kaj je dvojna družba?",
      options: [
        "Družba z dvema družbenikoma",
        "Osebna družba (k.d. ali d.n.o.), v kateri so vsi osebno odgovorni družbeniki kapitalske družbe (npr. edini komplementar je d.o.o.)",
        "Družba z dvema dejavnostma",
        "Holding z dvema hčerinskima družbama"
      ],
      correct: 1,
      explanation: "Dvojna družba = k.d., kjer je edini komplementar (oz. vsi komplementarji) kapitalska družba, ali d.n.o., kjer so vsi družbeniki kapitalske družbe. Ostane osebna družba (komplementar odgovarja z vsem premoženjem), a družbeniki tega d.o.o. za dolgove ne odgovarjajo. V firmi mora biti navedena celotna firma komplementarja - kapitalske družbe; posle vodi kapitalska družba (fizično njen direktor)."
    },
    {
      q: "Metka prispeva 50.000 EUR, Nina znanje in delo ter bo vodila posle. Ustanovita k.d. Kdo je kdo?",
      options: [
        "Metka je komplementarka, Nina komanditistka",
        "Metka je komanditistka (prispeva denar, ne odgovarja), Nina je komplementarka (vodi posle, zakonita zastopnica, odgovarja z vsem premoženjem)",
        "Obe sta komplementarki",
        "Obe sta komanditistki"
      ],
      correct: 1,
      explanation: "Tipična delitev vlog v k.d.: komanditist prispeva kapital in ne odgovarja, komplementar prispeva delo, vodi in zastopa družbo ter odgovarja z vsem premoženjem. V firmi bo samo Nina."
    },
    {
      q: "Ali ima družbenik d.n.o. zakonsko pravico do izstopa iz družbe?",
      options: [
        "Da, kadarkoli s pisno izjavo",
        "Ne - lahko pa toži na izstop; če uspe, družba preneha (razen po pogodbi drugače)",
        "Da, z odpovednim rokom 3 mesecev",
        "Da, a izgubi ves vložek"
      ],
      correct: 1,
      explanation: "V d.n.o. družbenik nima zakonske pravice do izstopa; izstop se lahko uredi z družbeno pogodbo. Odpoved pogodbe s strani družbenika je razlog za prenehanje družbe."
    },
    {
      q: "Kakšna je razlika med navadnim in normiranim s.p. pri obdavčitvi?",
      options: [
        "Ni razlike",
        "Navadni: dobiček = prihodki - dejanski stroški, progresivni davek; normirani: stroški so vnaprej priznani v višini 80 % prihodkov, davek se plača od preostalih 20 %",
        "Normirani s.p. ne plačuje davkov",
        "Navadni s.p. plačuje samo DDV"
      ],
      correct: 1,
      explanation: "Navadni s.p.: davek od dejanskega dobička (prihodki minus stroški), progresivno. Normirani s.p.: normirani stroški 80 % prihodkov - obdavčenih je 20 % prihodkov (efektivno 4 % od prihodkov oz. 20 % od dobička).",
      more: "Podatek z vaj: trenutna meja za normirance je 60.000 EUR prihodkov, po napovedani spremembi (2026) 120.000 EUR."
    }
  ]
};
