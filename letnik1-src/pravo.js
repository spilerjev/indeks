/* Pravo družb in poslovno pravo (Pravo 1) - Izpit.
   Viri: Uvodne informacije o predmetu 2025/26 in 2026/27 (format izpita), Pravo 1 - zapiski po učbeniku.
   Vaje v slogu izpita so napisane na novo (lastna formulacija in primeri); pravna pravila so iz zakonov in učbenika.
   Na izpitu je lahko pravilen en ali dva odgovora; app podpira en pravilen odgovor. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

const NOTES_IZPIT = `
## Kako poteka izpit
- **Pisni izpit, 90 minut, 90 točk**: **30 vprašanj** z več možnimi odgovori (**pravilen je eden ali dva**, 30 × 2 točki) in **2 praktična primera** iz vaj (2 × 15 točk).
- Kolokvija se prištejeta (povprečje), seminarska naloga prinese do 12 bonus točk, če imaš skupaj vsaj 50 točk. Pri 48-49 točkah in seminarski z vsaj 7 točkami je ocena 6.
- Lestvica 2026/27: do 50 → 5, 50-60 → 6, 61-70 → 7, 71-80 → 8, 81-90 → 9, nad 90 → 10.
> Na izpitu je lahko pravilen en ali dva odgovora - vsako trditev preveri posebej. V appu ima vsako vprašanje en pravilen odgovor.

## Pasti, ki se ponavljajo na izpitih
### Pravni akti in EU
- **Retroaktivnost**: predpisi in splošni akti ne morejo učinkovati za nazaj; izjemoma lahko le **zakon** določi učinek za nazaj za posamezne določbe (javna korist, ne posega v pridobljene pravice). Pravilnik torej nikoli.
- Predpis začne veljati **15. dan po objavi**, če ni drugače določeno. Neustavne predpise razveljavi **Ustavno sodišče**, ne Vrhovno.
- **Evropski svet** = politične usmeritve in prednostni cilji. **Svet EU** = z EP zakonodajna in proračunska funkcija. **Komisija** = izvršilna in upravna funkcija, predlaga zakonodajo. **ECB** = monetarna politika z nacionalnimi centralnimi bankami. **Računsko sodišče** = revizija prihodkov in odhodkov. **ESČP** ni institucija EU.
- **Uredba** je zavezujoča, neposredno uporabna, sekundarni vir. Nacionalno sodišče pravo EU uporablja samo, brez dovoljenja.
### Alternativno reševanje sporov
- **Arbitraža**: arbiter **odloči** z zavezujočo odločbo, izključi pristojnost sodišča. **Mediacija/konciliacija**: tretji le pomaga, odločita stranki sami.
- **Institucionalne** arbitraže so stalne; **ad hoc** nastanejo za posamezen spor. Poravnava je lahko neoblična, pred notarjem ali pred sodiščem (sodna poravnava).
### Stvarno pravo
- Lastninska pravica je **stvarna** (absolutna) pravica. Na nepremičnini se pridobi z **vpisom v zemljiško knjigo**; lahko tudi na podlagi zakona (npr. priposestvovanje) ali odločbe.
- **Solastnina**: deleži so določeni (idealni), s svojim deležem solastnik razpolaga brez soglasja. **Skupna lastnina**: deleži niso vnaprej določeni.
- Lastninska tožba **ne zastara**. Lastnina se v javno korist lahko omeji ali odvzame proti nadomestilu ali odškodnini.
- **Služnost** se lahko priposestvuje. **Stvarno breme**: lastnik nepremičnine je zavezan k dajatvam ali storitvam. Zastavijo se lahko tudi vrednostni papirji.
### Obligacijsko pravo
- **Splošni pogoji poslovanja** so del pogodbe le, če sta jih stranki sprejeli (sklicevanje, morala jih je poznati); nična so določila v nasprotju z namenom pogodbe ali dobrimi poslovnimi običaji; **nejasna določila se razlagajo v korist druge stranke**; namenjeni so nedoločenemu številu razmerij.
- **Nična** pogodba: nasprotuje ustavi, prisilnim predpisom ali moralnim načelom, nima podlage, nemogoč/nedopusten predmet. Sodišče pazi po uradni dolžnosti, **pravica uveljavljati ničnost ne zastara**, nična pogodba ne postane veljavna, če vzrok pozneje preneha.
- **Izpodbojna**: napake volje (zmota, prevara, grožnja), delna poslovna sposobnost - le na zahtevo stranke, v rokih.
- **Splošni zastaralni rok je 5 let.** Zastaranje odvzame le pravico zahtevati izpolnitev; kdor izpolni zastarano obveznost, ne more zahtevati vrnitve.
- **Prenova (novacija)**: stranki se dogovorita, da obstoječo obveznost nadomestita z novo. **Pobot** učinkuje z izjavo ene stranke.
- **Ara**: znamenje, da je pogodba sklenjena, in varščina. **Porok** pri gospodarskih pogodbah odgovarja **solidarno** z glavnim dolžnikom.
- **Prodajna pogodba**: gospodarska je veljavna tudi brez določene kupnine (velja običajna cena). Skrito napako mora kupec iz gospodarske pogodbe sporočiti **nemudoma**, prodajalec pa ne odgovarja za napake, ki se pokažejo po **6 mesecih** od izročitve. Nevarnost preide s **izročitvijo**, ne s plačilom.
### Korporacijsko pravo
- Za obveznosti družbe vedno najprej odgovarja **družba z vsem svojim premoženjem**. Slovenija ima **normativni** sistem ustanovitve in **zaprt krog** oblik (numerus clausus). Statut ima le d.d. (in SE); d.o.o. ima družbeno pogodbo.
- **Firma**: obveznost firme (vsaka družba nastopa s firmo), vpisana v sodni register; sedež ni del firme.
- **Sodni register** vodijo okrožna sodišča, objavo podatkov zagotavlja AJPES. Vpis ustanovitve je konstitutiven (družba pridobi **pravno sposobnost**), vpis novega direktorja deklaratoren. Podjetnik (s.p.) se vpiše v **Poslovni register Slovenije**, ne v sodni register.
- **d.n.o.**: posle vodijo vsi družbeniki; delež se prenese le s soglasjem drugih; novi družbenik odgovarja tudi za prej nastale obveznosti; preneha lahko s stečajem.
- **k.d.**: posle vodi in odgovarja **komplementar**; komanditist odgovarja le do vložka.
- **d.d.**: kapitalska družba; **nadzorni svet imenuje upravo**, skupščina voli NS; spremembe statuta sprejme skupščina s 3/4 večino; glavni delničar z **90 %** lahko izključi manjšinske; prednostne delnice brez glasovalne pravice največ do **polovice OK**; v dvotirnem sistemu vodi posle **uprava**, v enotirnem **upravni odbor**. Lastne delnice lahko pridobi le izjemoma (do 10 %).
- **Insolvenca** (ZFPPIPP, ne ZGD-1): stečaj je posledica insolventnosti; upniki se poplačajo **sočasno in sorazmerno** (enako obravnavanje).
### Intelektualna lastnina in vrednostni papirji
- Avtorska pravica nastane **s samo stvaritvijo**; avtor je le **fizična oseba** (pravna je lahko nosilec materialnih pravic); **moralne** pravice so neprenosljive; traja življenje + 70 let; pravica do prve objave je moralna.
- Pravice industrijske lastnine so **absolutne** in časovno omejene: patent 20 let, znamka 10 let z možnostjo podaljševanja. Geografsko ime se zavaruje z **označbo porekla / geografsko označbo**.
- **Menica** je abstrakten VP (neodvisen od temeljnega posla). **Obveznica** je dolžniški VP (država, lokalne skupnosti, podjetja). **Ček** je na vpogled. Skladiščnica je sestavljena iz **pobotnice in zastavnice**.
`;

const izpitNovejsi = [
  Q('Trgovec v splošnih pogojih poslovanja zapiše nejasno določilo o reklamacijah. Katera trditev o splošnih pogojih drži?', [
    'Nejasno določilo se razlaga v korist stranke, ki pogojev ni pripravila',
    'Kupca zavezujejo tudi, če zanje ni vedel in jih ni mogel poznati',
    'Določilo, ki izniči namen pogodbe, velja, ker je del splošnih pogojev',
    'Trgovec jih pripravi posebej za vsakega posameznega kupca'], 0,
    'Nejasna določila gredo v breme tistega, ki jih je pripravil. Splošni pogoji so del pogodbe le, če jih je druga stranka poznala ali morala poznati; določila v nasprotju z namenom pogodbe ali dobrimi poslovnimi običaji so nična; namenjeni so nedoločenemu številu razmerij.'),
  Q('Katera trditev o delniški družbi drži?', [
    'Družba je lastnica svojega premoženja, ki je ločeno od premoženja delničarjev',
    'Delniška družba sodi med osebne družbe, ker jo sestavljajo delničarji',
    'Pridobivanje lastnih delnic je delniški družbi brez izjeme prepovedano',
    'V dvotirnem sistemu nadzorni svet skupaj z upravo vodi tekoče posle'], 0,
    'D.d. je kapitalska družba s premoženjem, ločenim od delničarjev. Lastne delnice sme pridobiti izjemoma (do 10 % osnovnega kapitala). V dvotirnem sistemu posle vodi uprava, nadzorni svet jo nadzira.'),
  Q('Podjetji želita spor rešiti brez pravde pred sodiščem. Katera trditev o alternativnem reševanju sporov drži?', [
    'Poravnavo lahko skleneta brez posebne oblike, pred notarjem ali pred sodiščem',
    'Arbiter strankama le pomaga, da se sami dogovorita o rešitvi spora',
    'Koncilator izda odločbo, ki je za obe stranki zavezujoča',
    'Institucionalna arbitraža se ustanovi za en spor in po njem preneha'], 0,
    'Arbiter spor odloči z zavezujočo odločbo. Pri mediaciji in koncilaciji tretji le pomaga, odločita stranki sami. Institucionalne arbitraže so stalne, ad hoc nastanejo za posamezen spor.'),
  Q('Katera trditev o institucijah EU drži?', [
    'Evropski svet določa splošne politične usmeritve in prednostne cilje Unije',
    'Evropski parlament je izvršilna in upravna institucija Unije',
    'Evropsko sodišče za človekove pravice je sodna institucija EU',
    'Evropska centralna banka revidira prihodke in odhodke Unije'], 0,
    'Izvršilno in upravno funkcijo ima Komisija. ESČP je organ Sveta Evrope, sodna institucija EU je Sodišče EU. Revizijo opravlja Evropsko računsko sodišče.'),
  Q('Katera institucija EU je pravilno povezana s svojo vlogo?', [
    'Evropska komisija - izvršilna in upravna funkcija ter zakonodajna pobuda',
    'Evropski svet - skupaj z Evropskim parlamentom sprejema zakonodajo in proračun',
    'Evropsko sodišče za človekove pravice - sodna veja oblasti v EU',
    'Evropska centralna banka - monetarna politika brez nacionalnih centralnih bank'], 0,
    'Zakonodajno in proračunsko funkcijo z EP opravlja Svet EU (ne Evropski svet). ESČP ni institucija EU. ECB vodi monetarno politiko skupaj z nacionalnimi centralnimi bankami držav evrskega območja.'),
  Q('Katera trditev o prodajni pogodbi drži?', [
    'Gospodarska prodajna pogodba velja tudi, če stranki kupnine nista dogovorili',
    'Tveganje za naključno uničenje stvari nosi prodajalec, dokler kupec ne plača',
    'Kupec mora skrito napako sporočiti v šestih mesecih, odkar jo je odkril',
    'Za veljavnost vsake prodajne pogodbe je potrebna pisna oblika'], 0,
    'Pri gospodarski pogodbi brez dogovorjene cene velja cena, ki jo prodajalec običajno zaračunava. Nevarnost preide z izročitvijo, ne s plačilom. Napako je treba sporočiti nemudoma (gospodarska) oz. v 8 dneh; 6 mesecev teče od izročitve. Prodajna pogodba je praviloma neoblična.'),
  Q('Podjetje kot kupec po štirih mesecih od prevzema odkrije skrito napako kupljenega stroja. Kaj velja?', [
    'Napako mora prodajalcu sporočiti nemudoma, sicer izgubi pravice',
    'Napako lahko sporoči kadar koli v enem letu od odkritja',
    'Prodajalec ne odgovarja, ker so od prevzema minili več kot trije meseci',
    'Pogodbo lahko razveljavi že zaradi katere koli, tudi nebistvene zmote'], 0,
    'Pri gospodarski pogodbi je treba skrito napako sporočiti nemudoma; prodajalec odgovarja za napake, ki se pokažejo v 6 mesecih od izročitve. Razveljavitev zaradi zmote je mogoča le pri bistveni zmoti; nemogoč ali nedopusten predmet pa pogodbo naredi nično.'),
  Q('Kaj velja za nično pogodbo?', [
    'Na ničnost se je mogoče sklicevati kadar koli, ta pravica ne zastara',
    'Postane veljavna, ko vzrok ničnosti pozneje odpade',
    'Sodišče ničnost upošteva le, če jo uveljavlja ena od strank',
    'Pogodba v nasprotju s prisilnimi predpisi je le izpodbojna'], 0,
    'Nasprotje z ustavo, prisilnimi predpisi ali moralo povzroči ničnost. Na ničnost sodišče pazi po uradni dolžnosti, na izpodbojnost pa le na zahtevo stranke. Nična pogodba ne postane veljavna, če vzrok pozneje preneha.'),
  Q('Proizvajalec želi zavarovati ime, ki označuje geografski izvor njegovega izdelka, in nov izum. Katera trditev drži?', [
    'Ime z geografskim izvorom zavaruje z označbo porekla ali geografsko označbo',
    'Izum je s patentom zavarovan časovno neomejeno',
    'Pravice industrijske lastnine učinkujejo le med strankama, kot obligacijske',
    'Znamka velja 20 let in je po tem ni mogoče podaljšati'], 0,
    'Patent traja 20 let. Pravice industrijske lastnine so absolutne (učinkujejo proti vsem). Znamka velja 10 let in se lahko podaljšuje neomejeno.'),
  Q('Katera trditev o lastnini drži?', [
    'Pri skupni lastnini deleži lastnikov niso vnaprej določeni',
    'Zahtevek za vrnitev stvari (lastninska tožba) zastara v petih letih',
    'Lastninska pravica je obligacijska pravica na stvareh',
    'Država sme lastnino v javnem interesu odvzeti brez nadomestila'], 0,
    'Lastninska tožba ne zastara. Lastninska pravica je stvarna (absolutna). V javno korist se lahko omeji ali odvzame le proti nadomestilu v naravi ali odškodnini.'),
  Q('Trije bratje so solastniki hiše, vsak do ene tretjine. Kaj velja?', [
    'Vsak lahko s svojim deležem razpolaga brez soglasja drugih dveh',
    'Za prodajo svojega deleža potrebuje soglasje obeh bratov',
    'Ker so deleži določeni, gre za skupno lastnino',
    'Država jim hiše v javno korist ne more odvzeti, lahko jo le omeji'], 0,
    'Pri solastnini so deleži določeni (idealni) in z njimi solastnik prosto razpolaga. Pri skupni lastnini deleži niso določeni. Lastnina se v javno korist lahko tudi odvzame (razlastitev); pridobi pa se lahko s pravnim poslom, z odločbo ali na podlagi zakona (npr. priposestvovanje).'),
  Q('Katera trditev o osebnih družbah drži?', [
    'Družbenik d.n.o. ne more prenesti svojega deleža brez soglasja ostalih družbenikov',
    'Nov družbenik d.n.o. odgovarja le za obveznosti, nastale po njegovem vstopu',
    'V k.d. komanditist odgovarja neomejeno, komplementar pa do višine vložka',
    'V dvojni družbi je komplementar fizična oseba, komanditist pa d.o.o.'], 0,
    'Novi družbenik d.n.o. odgovarja tudi za prej nastale obveznosti. V k.d. neomejeno odgovarja komplementar. Dvojna družba je k.d., v kateri je komplementar kapitalska družba (npr. d.o.o.).'),
  Q('Katera trditev o firmi gospodarske družbe drži?', [
    'Vsaka družba mora imeti firmo in z njo nastopati v pravnem prometu',
    'Sedež je obvezni sestavni del firme',
    'Vpis firme v sodni register ni obvezen',
    'Firma d.o.o. mora vsebovati osebno ime vsaj enega družbenika'], 0,
    'Načelo obveznosti firme. Sedež ni del firme (vpiše se posebej). Firma se obvezno vpiše v sodni register. Osebno ime družbenika mora vsebovati firma osebne družbe.'),
  Q('Minister izda pravilnik. Kaj zanj velja?', [
    'Ne sme učinkovati za nazaj',
    'Začne veljati 20. dan po objavi, če ni drugače določeno',
    'Če je nezakonit, ga razveljavi Vrhovno sodišče',
    'Usklajen mora biti z ustavo, z zakoni pa ne nujno'], 0,
    'Učinek za nazaj lahko za posamezne določbe določi le zakon. Predpis začne veljati 15. dan po objavi. Neustavne in nezakonite predpise razveljavi Ustavno sodišče. Podzakonski akt mora biti v skladu z ustavo in z zakoni.'),
  Q('Katera trditev o delnicah drži?', [
    'Delnicam s prednostjo pri dividendi je mogoče izključiti glasovalno pravico',
    'Delnice ureja poseben Zakon o delnicah',
    'Prednostne delnice lahko obsegajo največ 10 % osnovnega kapitala',
    'Delnica je dolžniški vrednostni papir, ki prinaša obresti'], 0,
    'Delnice ureja ZGD-1. Prednostne delnice brez glasovalne pravice so omejene na polovico osnovnega kapitala. Delnica je lastniški (korporacijski) VP; dolžniški VP z obrestmi je obveznica.'),
  Q('Katera trditev o avtorski pravici drži?', [
    'Delo je varovano že s tem, ko je ustvarjeno',
    'Avtor dela je lahko tudi pravna oseba, ki je delo naročila',
    'Moralne avtorske pravice lahko avtor s pogodbo prenese na založnika',
    'Ob kršitvi lahko avtor zahteva le povrnitev premoženjske škode'], 0,
    'Varstvo nastane s samo stvaritvijo, brez registracije. Avtor je lahko le fizična oseba. Moralne pravice so neprenosljive. Avtor lahko zahteva tudi odškodnino za nepremoženjsko škodo.'),
  Q('Katera trditev o avtorju in avtorskih pravicah drži?', [
    'Pravna oseba ne more biti avtor, lahko pa je imetnica materialnih avtorskih pravic',
    'Pravica do prve objave je materialna avtorska pravica',
    'Avtorska pravica traja, dokler se delo uporablja',
    'Pri delu iz delovnega razmerja preidejo na delodajalca tudi moralne pravice'], 0,
    'Pravica do prve objave je moralna. Avtorska pravica traja življenje avtorja in 70 let po njegovi smrti. Moralne pravice ostanejo avtorju tudi pri delih iz delovnega razmerja.'),
  Q('Kdo vodi posle v posamezni obliki družbe?', [
    'Delniška družba z enotirnim sistemom - upravni odbor',
    'Delniška družba z dvotirnim sistemom - uprava skupaj z nadzornim svetom',
    'Komanditna družba - komanditisti',
    'Družba z neomejeno odgovornostjo - direktor'], 0,
    'Dvotirni sistem: posle vodi uprava, nadzorni svet nadzira. K.d.: posle vodijo komplementarji. D.n.o.: vsi družbeniki (direktor je organ d.o.o.).'),
  Q('Kaj vse mora biti izpolnjeno za veljavno sklenitev pravnega posla?', [
    'Pravna in poslovna sposobnost strank, soglasje volj, mogoč in dopusten predmet ter oblika, kadar jo zahtevata zakon ali dogovor',
    'Le pravna sposobnost strank, soglasje o bistvenih sestavinah in pravno mogoč predmet',
    'Poslovna sposobnost strank, soglasje o vseh, tudi nebistvenih sestavinah, in vedno pisna oblika',
    'Pooblastilo za sklenitev, soglasje volj in oblika, ki jo določi zakon, ne pa dogovor strank'], 0,
    'Potrebni so: pravna IN poslovna sposobnost, soglasje volj (o bistvenih sestavinah), mogoč, dopusten in določen oz. določljiv predmet ter oblika, kadar jo zahteva zakon ali dogovor strank.'),
  Q('Katera trditev o gospodarskih družbah drži?', [
    'Za obveznosti družbe vedno odgovarja družba sama z vsem svojim premoženjem',
    'Družbe se v Sloveniji ustanavljajo po koncesijskem sistemu',
    'Ustanovitveni akt vseh družb je statut',
    'Ustanovitelji lahko izberejo poljubno obliko družbe, ki je zakon ne pozna'], 0,
    'Družba sama vedno odgovarja z vsem premoženjem; oblike se razlikujejo le po odgovornosti družbenikov. Velja normativni sistem, statut ima le d.d., krog oblik je zaprt (numerus clausus).'),
  Q('Marko vstopi kot družbenik v obstoječo d.n.o. Kaj velja?', [
    'Odgovarja tudi za obveznosti družbe, ki so nastale pred njegovim vstopom',
    'Odgovarja le za obveznosti, nastale po vpisu njegovega vstopa',
    'Za obveznosti ne odgovarja, ker zanje odgovarja d.n.o. sama',
    'Postane član obveznega nadzornega sveta d.n.o.'], 0,
    'Družbeniki d.n.o. odgovarjajo neomejeno, solidarno in subsidiarno, novi družbenik tudi za prej nastale obveznosti. D.n.o. nima obveznih organov; preneha lahko tudi s stečajem.'),
  Q('Katera trditev o vrednostnih papirjih drži?', [
    'Obveznica je dolžniški VP, ki ga lahko izdajo država, občine in podjetja',
    'Konosament je sestavljen iz pobotnice in zastavnice',
    'Menica je kavzalni papir, njena veljavnost je odvisna od temeljnega posla',
    'Ček imetniku daje pravico do izročitve blaga'], 0,
    'Iz pobotnice in zastavnice je sestavljena skladiščnica. Menica je abstrakten VP. Ček je denarni VP, plačljiv na vpogled.'),
  Q('Katera trditev o organih in kapitalu delniške družbe drži?', [
    'Prednostne delnice brez glasovalne pravice smejo obsegati največ polovico osnovnega kapitala',
    'Člane uprave voli skupščina delničarjev',
    'Delničar s 75 % osnovnega kapitala lahko izključi manjšinske delničarje',
    'Statut spreminja nadzorni svet s tričetrtinsko večino'], 0,
    'Upravo imenuje nadzorni svet. Izključitev manjšinskih delničarjev (squeeze-out) je mogoča pri 90 %. Statut spreminja skupščina s 3/4 večino.'),
  Q('Katera trditev o sodnem registru drži?', [
    'Vpis imenovanja novega direktorja je deklaratorne narave',
    'Z vpisom v sodni register družba pridobi poslovno sposobnost',
    'Samostojni podjetnik se vpiše v sodni register',
    'Sodni register vodi AJPES, sodišča pa objavljajo podatke'], 0,
    'Vpis ustanovitve je konstitutiven: družba pridobi pravno sposobnost. S.p. se vpiše v Poslovni register Slovenije. Sodni register vodijo okrožna sodišča, objavo zagotavlja AJPES.'),
  Q('Katera trditev o spremembi in prenehanju obveznosti drži?', [
    'Stranki se lahko dogovorita, da obstoječo obveznost nadomestita z novo (prenova)',
    'Dolžnik, ki plača zastarani dolg, lahko plačilo zahteva nazaj',
    'Z zastaranjem obveznost v celoti ugasne',
    'Pobot je mogoč le s pogodbo med obema strankama'], 0,
    'Zastaranje odvzame le pravico zahtevati izpolnitev; obveznost ostane (naravna), zato vrnitve plačanega ni. Pobot učinkuje z enostransko izjavo, ko se nasprotni terjatvi srečata.'),
  Q('Katera trditev o virih prava EU drži?', [
    'Uredba je zavezujoč sekundarni vir prava EU',
    'Predloge uredb praviloma pripravi Evropski svet',
    'Nacionalno sodišče sme pravo EU uporabiti le z dovoljenjem Sodišča EU',
    'Uredbe, direktive in sklepi so primarni viri prava EU'], 0,
    'Zakonodajno pobudo ima Komisija. Nacionalna sodišča pravo EU uporabljajo sama (s predhodnim vprašanjem lahko le zaprosijo za razlago). Primarni viri so pogodbe; uredbe, direktive in sklepi so sekundarni.'),
  Q('Katera trditev o stvarnih pravicah drži?', [
    'Stvarno breme zavezuje lastnika nepremičnine k dajatvam ali storitvam',
    'Vrednostnih papirjev ni mogoče zastaviti',
    'Stvarne pravice na premičninah se vpisujejo v zemljiško knjigo',
    'Služnosti ni mogoče pridobiti s priposestvovanjem'], 0,
    'Zastavijo se lahko tudi VP in terjatve. Zemljiška knjiga je za nepremičnine. Služnost se lahko pridobi tudi s priposestvovanjem.'),
  Q('Nad družbo se začne stečajni postopek. Kaj velja?', [
    'Upniki s terjatvami pred začetkom stečaja se poplačajo sočasno in sorazmerno',
    'Postopek ureja Zakon o gospodarskih družbah (ZGD-1)',
    'Stečaj se začne na podlagi sporazuma družbenikov',
    'Nad osebno družbo prisilna poravnava ni mogoča'], 0,
    'Velja načelo enakega obravnavanja upnikov. Insolvenčne postopke ureja ZFPPIPP. Stečaj je posledica insolventnosti (sporazum družbenikov vodi v likvidacijo). Prisilna poravnava je mogoča tudi nad osebno družbo.'),
];

const izpitStarejsi = [
  Q('Podjetje A pošlje ponudbo podjetju B, s katerim ni v stalni poslovni zvezi. B ne odgovori. Kaj velja?', [
    'Pogodba ni sklenjena, ker molk ne pomeni sprejema', 'Pogodba je sklenjena, ker B ni ugovarjal v 8 dneh', 'Pogodba je sklenjena pod odložnim pogojem', 'A lahko od B zahteva odškodnino zaradi molka'], 0,
    'Molk praviloma ni sprejem ponudbe. Izjema je stalna poslovna zveza, v kateri mora naslovnik ponudbo, ki se nanaša na to zvezo, izrecno zavrniti.'),
  Q('Banka svojo terjatev do kreditojemalca odstopi agenciji za izterjavo. Kdo se v obligacijskem razmerju zamenja?', [
    'Upnik', 'Dolžnik', 'Upnik in dolžnik', 'Nihče, agencija postane le pooblaščenka banke'], 0,
    'Cesija (odstop terjatve) zamenja upnika: cedent (banka) prenese terjatev na cesionarja (agencijo), dolžnik ostane isti. Zamenjava dolžnika je prevzem dolga.'),
  Q('Oče sinu brezplačno odstopi svojo terjatev do soseda. Za kaj oče sinu odgovarja?', [
    'Ne odgovarja ne za obstoj ne za izterljivost terjatve', 'Le za obstoj terjatve', 'Le za izterljivost terjatve', 'Za obstoj in izterljivost terjatve'], 0,
    'Pri odplačnem odstopu cedent odgovarja za obstoj terjatve (za izterljivost le, če je tako dogovorjeno). Pri neodplačnem ne odgovarja niti za obstoj.'),
  Q('Kako tretja oseba vstopi v obveznost poleg dosedanjega dolžnika (pristop k dolgu)?', [
    'S pogodbo', 'Z indosamentom', 'S sodno odločbo', 'Z regresnim zahtevkom'], 0,
    'Pristop k dolgu je pogodba (prevzemnika z upnikom ali z dolžnikom), s katero prevzemnik vstopi v obveznost poleg dolžnika; dolžnik iz razmerja ne izstopi.'),
  Q('Po čem se subjektivna odškodninska odgovornost loči od objektivne?', [
    'Odvisna je od krivde povzročitelja', 'Nastane ne glede na krivdo, zaradi nevarne stvari', 'Odvisna je od statusa povzročitelja', 'Zanjo zadostuje sama vzročna zveza'], 0,
    'Subjektivna (krivdna) odgovornost temelji na krivdi. Objektivna (za nevarne stvari in dejavnosti) nastane ne glede na krivdo. Vzročna zveza je pogoj pri obeh.'),
  Q('Oškodovanec v prometni nesreči utrpi hude telesne bolečine in strah. Kako se mu ta nepremoženjska škoda praviloma povrne?', [
    'S pravično denarno odškodnino', 'Z vzpostavitvijo prejšnjega stanja', 'Z odškodnino v naravi', 'Le z javnim opravičilom povzročitelja'], 0,
    'Za nepremoženjsko škodo (telesne in duševne bolečine, strah) se prisodi pravična denarna odškodnina; vzpostavitev prejšnjega stanja je pravilo pri premoženjski škodi.'),
  Q('V katerem primeru je pogodba nična in ne le izpodbojna?', [
    'Pogodba nima dopustne podlage', 'Stranka je pogodbo sklenila v bistveni zmoti', 'Druga stranka je stranko prevarala', 'Pogodbo je sklenil 16-letnik brez soglasja staršev'], 0,
    'Pogodba brez (dopustne) podlage je nična. Zmota, prevara, grožnja in omejena poslovna sposobnost povzročijo izpodbojnost.'),
  Q('Torta mora biti dostavljena na dan praznovanja ob 12. uri, rok je bistvena sestavina pogodbe. Slaščičar je ne dostavi. Kaj velja?', [
    'Pogodba je razdrta po samem zakonu, razen če upnik takoj zahteva izpolnitev', 'Pogodba ostane v veljavi, torto je treba dostaviti naslednji dan', 'Pogodba je nična od začetka', 'Upnik mora slaščičarju najprej dati dodatni rok'], 0,
    'Pri fiksnem (bistvenem) roku je pogodba razdrta po samem zakonu, če dolžnik ne izpolni v roku. Upnik jo lahko ohrani, če nemudoma sporoči, da zahteva izpolnitev. Dodatni rok je potreben pri navadnem roku.'),
  Q('Kupec ob sklenitvi pogodbe prodajalcu izroči aro. Kakšno vlogo ima ara?', [
    'Je znamenje, da je pogodba sklenjena, in zagotovilo njene izpolnitve', 'Je cena za pravico odstopiti od pogodbe', 'Je le predujem na račun kupnine, brez drugih učinkov', 'Je pogoj, brez katerega pogodba ne nastane'], 0,
    'Ara je znamenje sklenitve in varščina za izpolnitev. Cena za odstop od pogodbe je odstopnina (skesnina).'),
  Q('Porok jamči za dolg iz gospodarske pogodbe. Kako odgovarja?', [
    'Solidarno z glavnim dolžnikom, njegova obveznost je akcesorna', 'Subsidiarno - upnik mora najprej neuspešno terjati dolžnika', 'Samostojno in abstraktno, neodvisno od glavne obveznosti', 'Le, če to izrecno dovoli glavni dolžnik'], 0,
    'Pri gospodarskih pogodbah je porok solidarni porok (upnik lahko terja dolžnika ali poroka). Obveznost je akcesorna, ker je odvisna od glavne. Abstraktna je bančna garancija.'),
  Q('Avtomehanik ima pri sebi avto stranke, ki popravila ni plačala. Kaj sme storiti na podlagi pridržne pravice?', [
    'Avto zadrži, dokler mu stranka ne plača zapadle terjatve', 'Avto uporablja, dokler stranka ne plača', 'Avto proda brez sodnega postopka in se poplača', 'Na avtu pridobi lastninsko pravico'], 0,
    'Pridržna (retencijska) pravica: upnik sme dolžnikovo stvar, ki jo ima, zadržati do plačila zapadle terjatve. Stvari ne sme uporabljati in z njo ne razpolaga; lastnik ne postane.'),
  Q('Koliko časa traja splošni zastaralni rok po Obligacijskem zakoniku?', [
    '5 let', '3 leta', '10 let', '1 leto'], 0,
    'Splošni zastaralni rok je 5 let. Krajši so npr. pri terjatvah iz gospodarskih pogodb (3 leta) in pri občasnih terjatvah.'),
  Q('Kupec podpiše kupoprodajno pogodbo za stanovanje in plača kupnino. Kdaj postane lastnik?', [
    'Ko je njegova lastninska pravica vpisana v zemljiško knjigo', 'Ko prevzame ključe in posest stanovanja', 'Ko notar overi podpise na pogodbi', 'Ko plača celotno kupnino'], 0,
    'Pri pridobitvi s pravnim poslom je vpis v zemljiško knjigo konstitutiven. Pogodba je zavezovalni posel (titulus), vpis je razpolagalni (modus).'),
  Q('Kdo imenuje člane uprave delniške družbe v dvotirnem sistemu?', [
    'Nadzorni svet', 'Skupščina delničarjev', 'Predsednik uprave', 'Upravni odbor'], 0,
    'Nadzorni svet imenuje in odpokliče upravo; skupščina voli nadzorni svet. Upravni odbor obstaja le v enotirnem sistemu.'),
  Q('Kdaj nova d.o.o. postane pravna oseba?', [
    'Z vpisom v sodni register', 'S podpisom družbene pogodbe pri notarju', 'Z vplačilom osnovnega kapitala', 'Z izdajo odločbe pristojnega ministrstva'], 0,
    'Vpis ustanovitve v sodni register je konstitutiven - z njim družba pridobi pravno sposobnost.'),
  Q('Kaj je razlog za začetek stečaja družbe?', [
    'Insolventnost družbe', 'Sklep družbenikov, da družba preneha', 'Ničnost vpisa v sodni register', 'Iztek časa, za katerega je bila ustanovljena'], 0,
    'Stečaj je insolvenčni postopek. Sklep družbenikov ali iztek časa vodita v (redno) likvidacijo, ničnost vpisa v prisilno likvidacijo.'),
  Q('Upravičenec banki predloži zahtevo za plačilo iz bančne garancije, ki ustreza pogojem garancije. Kaj stori banka?', [
    'Plača, ne da bi presojala, ali je dolžnik temeljno pogodbo res kršil', 'Najprej preveri, ali je dolžnik temeljno pogodbo res kršil', 'Uveljavlja ugovore, ki jih ima dolžnik iz temeljnega posla', 'Plača šele, ko upravičenec dolžnika neuspešno izterja'], 0,
    'Bančna garancija je abstraktna: banka plača na prvi poziv, če je zahteva v skladu z garancijo, temeljnega razmerja pa ne presoja.'),
  Q('Podjetje o konkurentu širi neresnične trditve, da prodaja ponaredke. Kaj je bistvo nelojalne konkurence?', [
    'Dejanje nasprotuje dobrim poslovnim običajem in lahko škodi drugim na trgu', 'Dejanje nasprotuje osebni morali direktorja', 'Dejanje omejuje ustavno svobodo gospodarske pobude', 'Dejanje zmanjšuje uvoz blaga v državo'], 0,
    'Nelojalna konkurenca je dejanje v nasprotju z dobrimi poslovnimi običaji, ki povzroči ali lahko povzroči škodo drugim udeležencem na trgu.'),
  Q('Na menici je zapisano "ne po odredbi" (rekta klavzula). Kako jo upnik prenese na drugo osebo?', [
    'Le z navadnim odstopom terjatve (cesijo)', 'Z indosamentom', 'Z golo izročitvijo', 'Z avalom'], 0,
    'Rekta klavzula izključi prenos z indosamentom, zato je mogoča le cesija. Aval je menično poroštvo, ne prenos.'),
  Q('Na čeku je zapisan datum plačila čez 30 dni. Kdaj je ček plačljiv?', [
    'Na vpogled - drugačna dospelost se šteje za nenapisano', 'Čez 30 dni, kot je zapisano', 'Nikoli, ker je ček zaradi tega ničen', 'Ko se o tem dogovorita imetnik in banka'], 0,
    'Ček je vedno plačljiv na vpogled; vsaka drugačna dospelost se šteje za nenapisano.'),
  Q('Kupec vzame kavni aparat domov na pokušnjo in se mora odločiti v 7 dneh. Kakšna pogodba je to?', [
    'Pogodba pod odložnim pogojem, da kupec stvar po pokušnji odobri', 'Pogodba pod razveznim pogojem', 'Prodaja na obroke', 'Pogodba s fiksnim rokom'], 0,
    'Prodaja na pokušnjo je sklenjena pod odložnim pogojem: učinkuje, ko kupec stvar po pokušnji odobri.'),
];

module.exports = {
  id: 'pravo',
  parts: [
    {
      id: 'izpit', name: 'Izpit', type: 'izpit',
      notesMd: NOTES_IZPIT,
      prependNotesOf: ['k1', 'k2'],
      decks: [
        { id: 'pi-novejsi', name: 'Vaje v slogu izpita: trditve', questions: izpitNovejsi },
        { id: 'pi-starejsi', name: 'Vaje v slogu izpita: kratka vprašanja', questions: izpitStarejsi },
      ],
    },
  ],
};
