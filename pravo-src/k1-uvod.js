// Pravo - 1. kolokvij - Deck 1: Uvod v pravoznanstvo
module.exports = {
  id: "pk1-uvod",
  name: "Uvod v pravoznanstvo",
  questions: [
    {
      q: "Kaj je pravo?",
      options: [
        "Skupek moralnih priporočil, ki jih družba prostovoljno upošteva",
        "Nominativni sistem pravil, podprt s kredibilno grožnjo uporabe fizične sile proti kršitelju",
        "Zbirka sodnih odločb, ki veljajo samo za stranke v sporu",
        "Sistem tehničnih pravil o razmerju med vzrokom in posledico"
      ],
      correct: 1,
      explanation: "Pravo je nominativni sistem pravil, podprt s kredibilno grožnjo uporabe fizične sile proti kršitelju teh norm. Sestavljajo ga pravila države, ki urejajo ravnanje države in njenih državljanov.",
      wrong: {
        0: "Pravo je obvezno in sankcionirano, ne prostovoljno kot morala.",
        3: "To so tehnična pravila (naravoslovje/tehnologija) - pravo je odvisno od človeških odločitev."
      }
    },
    {
      q: "Katera značilnost je tipična za pravo common law (anglo-ameriško pravo)?",
      options: [
        "Obsežni zakoni in dejavna vloga sodnikov",
        "Sodnik navaja precedense, družbene norme in poslovne prakse ter je nevtralen razsodnik",
        "Sodnik svojo razlago utemeljuje izključno z navajanjem pomena zakonov",
        "Porota ne obstaja, odloča izključno sodnik"
      ],
      correct: 1,
      explanation: "Common law: podobne primere rešujejo na podoben način (precedensi), sodnik je nevtralen razsodnik, sodi porota. Kontinentalno pravo: obsežni zakoni, sodniki imajo dejavno vlogo in razlagajo pomen zakonov."
    },
    {
      q: "Katera dva elementa ima načelo delitve oblasti?",
      options: [
        "Ločitev posameznih funkcij oblasti in obstoj zavor in ravnovesij med njimi",
        "Nadrejenost zakonodajne veje in podrejenost sodne veje",
        "Združitev izvršilne in zakonodajne oblasti ter neodvisnost sodstva",
        "Hierarhijo pravnih aktov in pravno državo"
      ],
      correct: 0,
      explanation: "Delitev oblasti (zakonodajna, izvršilna, sodna) preprečuje zlorabo oblasti. Elementa: ločitev funkcij oblasti + zavore in ravnovesja (checks and balances). Je temeljno ustavno načelo v RS."
    },
    {
      q: "Kaj je bistvo pravne države?",
      options: [
        "Da država z zakoni ureja vsa družbena razmerja",
        "Da je delovanje vseh državnih organov urejeno s pravnimi pravili",
        "Da o vseh sporih odloča neodvisno sodišče",
        "Da državljani sami sprejemajo zakone na referendumih"
      ],
      correct: 1,
      explanation: "Pravna država: delovanje državnih organov je pravno vezano - urejeno s pravnimi pravili. Navezuje se na meščansko državo."
    },
    {
      q: "Katere tri sestavine ima pravno pravilo (pravna norma)?",
      options: [
        "Hipotezo, dispozicijo in sankcijo",
        "Zapoved, prepoved in dovoljenje",
        "Splošnost, abstraktnost in konkretnost",
        "Zakon, uredbo in pravilnik"
      ],
      correct: 0,
      explanation: "Hipoteza = okoliščine/dejansko stanje (vožnja v križišče), dispozicija = pravno dopusten način obnašanja (ustavi pred znakom STOP), sankcija = pravne posledice kršitve dispozicije (plačaš 200 EUR).",
      wrong: {
        1: "Zapovedi, prepovedi in dovoljenja so tri VRSTE dispozicije, ne sestavine pravila."
      }
    },
    {
      q: "Dispozicija pravnega pravila določa:",
      options: [
        "okoliščine, v katerih se moramo ravnati po pravilu",
        "pravno dopusten način obnašanja (zapoved, prepoved ali dovoljenje)",
        "pravne posledice kršitve pravila",
        "organ, ki nadzoruje izvajanje pravila"
      ],
      correct: 1,
      explanation: "Dispozicija je osrednji del pravnega pravila in določa pravno dopusten način obnašanja. Tri vrste: zapovedi, prepovedi, dovoljenja. Okoliščine določa hipoteza, posledice kršitve sankcija."
    },
    {
      q: "Na kaj se nanašata splošnost in abstraktnost tipskega pravnega pravila?",
      options: [
        "Splošnost na subjekte urejanja (kdor, vsakdo, državljan), abstraktnost na tipski opis dejanskega stanu",
        "Splošnost na dejanski stan, abstraktnost na subjekte urejanja",
        "Obe se nanašata na krajevno veljavnost pravila",
        "Splošnost na sankcijo, abstraktnost na dispozicijo"
      ],
      correct: 0,
      explanation: "Splošnost = naslovljenci niso individualno določeni, označeni so s tipsko lastnostjo (kdor, vsakdo, študent). Abstraktnost = tipski opis vnaprej zamišljenega, predvidenega dejanskega stanu."
    },
    {
      type: "match",
      q: "Poveži vrsto pravnega akta z opisom.",
      pairs: [
        { term: "Splošni pravni akt", def: "Vzpostavlja, spreminja ali odpravlja splošna in abstraktna pravna pravila (ustava, zakon, pravilnik)" },
        { term: "Posamični pravni akt", def: "Vzpostavlja ali odpravlja posamične in konkretne pravne norme (sodba, odločba, pogodba)" },
        { term: "Materialni pravni akt", def: "Dejansko ravnanje, s katerim subjekt udejanja dispozicije ali sankcije (plačilo davka)" },
        { term: "Oblastni pravni akt", def: "Izdaja ga država, lokalne skupnosti in nosilci javnih pooblastil" },
        { term: "Neoblastni pravni akt", def: "Izdajajo ga društva, zavodi, gospodarske družbe" }
      ],
      explanation: "Normativni pravni akti (splošni + posamični) neposredno ustvarjajo, spreminjajo in ukinjajo pravna pravila; materialni akti so dejanska ravnanja, ki jih udejanjajo."
    },
    {
      q: "Kdaj začnejo veljati splošni pravni akti z državnimi predpisi, če ni določeno drugače?",
      options: [
        "Z dnem objave v Uradnem listu RS",
        "8. dan po objavi v Uradnem listu RS",
        "15. dan po objavi v Uradnem listu RS",
        "30. dan po sprejetju v Državnem zboru"
      ],
      correct: 2,
      explanation: "Splošni pravni akti z državnimi predpisi začnejo veljati 15. dan po objavi v Uradnem listu Republike Slovenije, če ni določeno drugače. (Pozor: uredbe EU začnejo veljati 20. dan po objavi v Uradnem listu EU.)"
    },
    {
      q: "Novi splošni pravni akt ne vsebuje derogacijske klavzule, akta pa si nasprotujeta. Katero pravilo NE velja pri razreševanju?",
      options: [
        "Višji pravni akt razveljavi nižjega",
        "Mlajši pravni akt razveljavi starejšega",
        "Specialnejši pravni akt razveljavi splošnejšega",
        "Starejši pravni akt razveljavi mlajšega"
      ],
      correct: 3,
      explanation: "Velja ravno obratno: mlajši razveljavi starejšega (lex posterior). Ostali pravili: višji razveljavi nižjega (lex superior), specialnejši razveljavi splošnejšega (lex specialis)."
    },
    {
      q: "Pod katerimi pogoji je retroaktivnost izjemoma dopustna?",
      options: [
        "Če jo sprejme vlada z uredbo in velja za celoten zakon",
        "Retroaktivno učinkujejo samo posamezne zakonske določbe, terja jo javna korist in ne posega v pridobljene pravice",
        "Če se z njo strinja večina naslovljencev in jo potrdi ustavno sodišče",
        "Retroaktivnost v pravu nikoli ni dopustna"
      ],
      correct: 1,
      explanation: "Trije pogoji: (1) samo posamezne zakonske določbe, (2) terja jo javna korist, (3) ne posega v pridobljene pravice. Načeloma pa retroaktivnost ni dopustna.",
      wrong: {
        3: "Načeloma res ni dopustna, a zakon pozna izjemo pod tremi strogimi pogoji."
      }
    },
    {
      q: "Kako se lahko spremeni Ustava RS?",
      options: [
        "Z navadno večino glasov v Državnem zboru",
        "Z 2/3 večino vseh glasov v Državnem zboru (60 glasov)",
        "Z referendumom, ki ga razpiše predsednik republike",
        "S soglasjem vlade in ustavnega sodišča"
      ],
      correct: 1,
      explanation: "Ustavo sprejme ali spremeni samo Državni zbor kot ustavodajni organ, in sicer z 2/3 večino VSEH glasov, tj. 60 glasov (od 90 poslancev)."
    },
    {
      q: "Kaj je zakonik?",
      options: [
        "Vsak zakon, ki ga sprejme Državni zbor",
        "Zakon, ki naj bi v celoti in sistematično urejal vsebinsko zaokroženo pravno področje (npr. Obligacijski zakonik)",
        "Podzakonski akt, ki podrobneje ureja zakonsko materijo",
        "Zbirka vseh veljavnih zakonov v državi"
      ],
      correct: 1,
      explanation: "Zakonik celovito in sistematično ureja zaokroženo pravno področje družbenega življenja - npr. Obligacijski zakonik, pomorski zakonik, kazenski zakonik."
    },
    {
      q: "Kdo sprejema uredbe kot najpomembnejše podzakonske akte in kakšna je njihova omejitev?",
      options: [
        "Državni zbor; lahko spreminjajo pravice in dolžnosti subjektov",
        "Vlada RS; z uredbo podrobneje izpelje določbe zakona, ne sme pa posegati v pravice in dolžnosti pravnih subjektov",
        "Posamezni minister; veljajo samo za njegovo ministrstvo",
        "Predsednik republike; potrjuje jih ustavno sodišče"
      ],
      correct: 1,
      explanation: "Uredbe sprejme Vlada RS. Z njimi podrobneje izpelje določbe zakona, ne sme pa vplivati na pravice in dolžnosti pravnih subjektov. Pravilnike sprejemajo ministri (če tako določi zakon/uredba ali po lastni oceni)."
    },
    {
      q: "Katera pravna panoga ureja osebna in premoženjska razmerja, v katerih so pravni subjekti prirejeni (enakopravni) in avtonomni?",
      options: [
        "Upravno pravo",
        "Civilno pravo",
        "Kazensko pravo",
        "Ustavno pravo"
      ],
      correct: 1,
      explanation: "Civilno pravo - subjekti so prirejeni in avtonomni. Podpanoge: stvarno pravo, obligacijsko pravo (odškodninsko), dedno pravo, avtorsko pravo.",
      wrong: {
        0: "V upravnem pravu je država nadrejena stranka (gradbeno dovoljenje, tehnični pregled)."
      }
    },
    {
      q: "Načelo zakonitosti v kazenskem pravu pomeni:",
      options: [
        "da mora vsak zakon sprejeti Državni zbor",
        "da nikomur ne sme biti izrečena kazenska sankcija za dejanje, ki ga zakon ni določil kot kaznivo, še preden je bilo storjeno",
        "da so vsi državljani enaki pred zakonom",
        "da kazenske zadeve obravnavajo samo okrožna sodišča"
      ],
      correct: 1,
      explanation: "Nullum crimen, nulla poena sine lege: kaznivo dejanje in kazen morata biti z zakonom določena VNAPREJ, pred storitvijo dejanja. V kazenskem pravu zato tudi pravne praznine niso dopustne."
    },
    {
      type: "match",
      q: "Poveži pravno panogo z njenim predmetom urejanja.",
      pairs: [
        { term: "Ustavno pravo", def: "Temelji državnopravne ureditve, človekove pravice in svoboščine" },
        { term: "Gospodarsko pravo", def: "Pravni status gospodarskih subjektov in gospodarski pravni posli (ZGD-1, ZIL-1)" },
        { term: "Delovno pravo", def: "Sklenitev in prenehanje pogodbe o zaposlitvi, pravice pogodbenih strank" },
        { term: "Upravno pravo", def: "Organizacija in delovanje državne uprave ter upravnopravna razmerja (gradbeno dovoljenje)" },
        { term: "Mednarodno zasebno pravo", def: "Civilnopravna razmerja z mednarodnim elementom (osebna, družinska, premoženjska)" }
      ],
      explanation: "Klasične pravne panoge: civilno, ustavno, delovno, gospodarsko, kazensko, družinsko, mednarodno javno in zasebno pravo."
    },
    {
      q: "Kaj je avtentična razlaga?",
      options: [
        "Razlaga, ki jo poda vrhovno sodišče v konkretnem sporu",
        "Preoblikovanje spornega besedila s strani organa, ki je akt izdal - ima značilnosti novega pravnega besedila",
        "Teoretična razlaga pravnih strokovnjakov brez zavezujoče narave",
        "Jezikovna razlaga pravne norme po slovnici"
      ],
      correct: 1,
      explanation: "Avtentična razlaga ni prava razlaga zakona: organ, ki je izdal prvotno sporno/dvoumno besedilo, ga na novo definira. Ima vse značilnosti novega pravnega besedila. Vrste razlag sicer: jezikovna, logična, sistematična, namenska, zgodovinska, teleološka."
    },
    {
      q: "Kaj so pravne praznine?",
      options: [
        "Pravna pravila brez sankcije",
        "Družbena razmerja, ki niso pravno urejena, čeprav bi morala biti",
        "Členi zakona, ki so bili razveljavljeni",
        "Razmerja, ki jih pravo namenoma prepušča morali"
      ],
      correct: 1,
      explanation: "Klasične pravne praznine se pojavijo v zakonu (konfliktno razmerje zahteva normo, a je zakon ne vsebuje); praznine v širšem smislu = celotna pravna področja niso urejena (nova država, revolucija). V kazenskem pravu niso dopustne. Ugotovitev praznine izhaja iz poglobljene pravne analize."
    },
    {
      q: "Katera sodišča so v Sloveniji sodišča prve stopnje?",
      options: [
        "Okrajna in okrožna sodišča",
        "Okrajna in višja sodišča",
        "Okrožna in vrhovno sodišče",
        "Višja sodišča in ustavno sodišče"
      ],
      correct: 0,
      explanation: "Prva stopnja: okrajna sodišča (44; splošno pristojna - manj hude kazenske zadeve, odškodninski zahtevki, služnosti, zemljiška knjiga, civilna izvršba) in okrožna sodišča (11; hujše zadeve, mladoletniki, izvrševanje sankcij, stečaj). Pritožbena stopnja: 4 višja sodišča. Najvišje: vrhovno sodišče (izredna pravna sredstva)."
    },
    {
      q: "Koliko je v Sloveniji okrajnih in koliko okrožnih sodišč?",
      options: [
        "44 okrajnih in 11 okrožnih",
        "11 okrajnih in 44 okrožnih",
        "4 okrajna in 11 okrožnih",
        "44 okrajnih in 4 okrožna"
      ],
      correct: 0,
      explanation: "44 okrajnih sodišč, 11 okrožnih sodišč, 4 višja (pritožbena) sodišča in eno vrhovno sodišče. Specializirana: 4 delovna sodišča + 1 socialno, upravno sodišče (status višjega sodišča)."
    },
    {
      q: "Kakšen je položaj Ustavnega sodišča RS?",
      options: [
        "Je najvišja instanca rednega sodstva, nadrejeno vrhovnemu sodišču",
        "Je ločen organ za varstvo ustavnosti, zakonitosti in človekovih pravic; ni del enotnega sodnega sistema; 9 sodnikov izvoli DZ na predlog predsednika republike",
        "Je del vlade in nadzoruje zakonitost dela ministrstev",
        "Njegove sodnike imenuje Sodni svet za dobo 6 let"
      ],
      correct: 1,
      explanation: "Ustavno sodišče je najvišji organ sodne oblasti za varstvo ustavnosti, zakonitosti in človekovih pravic, vendar je LOČEN organ (ni del rednega sodstva). 9 sodnikov na predlog predsednika republike izvoli Državni zbor. Odloča o skladnosti zakonov z ustavo, z mednarodnimi pogodbami itd."
    },
    {
      q: "Kaj velja za Računsko sodišče?",
      options: [
        "Je revizijski organ kontrole javne porabe brez sodnih pristojnosti",
        "Odloča o pritožbah zoper davčne odločbe",
        "Je specializirano sodišče za gospodarske spore",
        "Nadzoruje delo Ustavnega sodišča"
      ],
      correct: 0,
      explanation: "Računsko sodišče je najvišji revizijski organ kontrole državnih računov, proračuna in celotne javne porabe. NIMA sodnih pristojnosti; je samostojen in neodvisen organ."
    },
    {
      q: "Kdaj nastopi pravnomočnost sodne odločbe?",
      options: [
        "Takoj z izdajo sodbe",
        "Ko poteče rok za pritožbo (če se stranke ne pritožijo) oziroma ko višje sodišče odloči o pritožbi",
        "Šele ko vrhovno sodišče zavrne revizijo",
        "Ko sodba postane izvršljiva"
      ],
      correct: 1,
      explanation: "Pravnomočnost = odločbe ni več mogoče izpodbijati z REDNIMI pravnimi sredstvi (pritožba, ugovor). Zoper pravnomočno odločbo je mogoče le še izredno pravno sredstvo (revizija; v kazenskih postopkih zahteva za varstvo zakonitosti in obnova)."
    },
    {
      q: "Kateri so trije pritožbeni razlogi?",
      options: [
        "Napačno ali nepopolno ugotovljeno dejansko stanje, bistvena kršitev postopka, napačna uporaba materialnega predpisa",
        "Zamuda roka, previsoka kazen, pristranskost sodnika",
        "Nova dejstva, novi dokazi, nova zakonodaja",
        "Kršitev ustave, kršitev zakona, kršitev podzakonskega akta"
      ],
      correct: 0,
      explanation: "V pritožbi mora stranka navesti sodbo, obseg izpodbijanja in razloge: (1) napačno/nepopolno ugotovljeno dejansko stanje, (2) bistvena kršitev postopka, (3) napačna uporaba materialnega predpisa."
    },
    {
      q: "Kakšno je razmerje med arbitražo in sodnim postopkom?",
      options: [
        "Dopolnjujeta se - arbitražno odločbo vedno potrdi sodišče",
        "Izključujeta se - z dogovorom o arbitraži stranki izključita pristojnost sodišča; arbitraža je hitrejša",
        "Arbitraža je obvezna prva stopnja pred sodnim postopkom",
        "Arbitraža je mogoča samo v delovnih sporih"
      ],
      correct: 1,
      explanation: "Arbitraža je sodnemu reševanju najbolj podoben alternativni mehanizem (ureja jo ZArbit). Sprti strani spor predložita arbitraži in s tem izključita pristojnost sodišča. Je hitrejša. Drugi mehanizmi: mediacija, konciliacija."
    }
  ]
};
