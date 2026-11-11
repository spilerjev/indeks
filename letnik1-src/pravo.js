/* Pravo družb in poslovno pravo (Pravo 1) - Izpit.
   Viri: Uvodne informacije o predmetu 2025/26 in 2026/27 (format izpita), "Pravo družb in poslovno pravo - Stari izpiti"
   (EF Zapiski; novejši izpiti z 1-2 pravilnima odgovoroma in starejši z 1 pravilnim), Pravo 1 - zapiski po učbeniku.
   Ker app podpira en pravilen odgovor, so vprašanja z dvema pravilnima trditvama predelana tako, da je pravilna ena
   (druga je spremenjena v napačno in to je razloženo). Zastarela vprašanja (SIT, ZOR, SDK) so izpuščena. */
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
  Q('Za splošne pogoje poslovanja je značilno: (izpit)', [
    'Nejasno določilo splošnih pogojev se razlaga v korist druge (šibkejše) stranke',
    'Splošni pogoji poslovanja so samodejno sestavni del vsake sklenjene pogodbe',
    'Veljavni so tudi, če nasprotujejo namenu pogodbe ali dobrim poslovnim običajem',
    'Namenjeni so vnaprej določenemu številu pogodbenih razmerij oziroma subjektov'], 0,
    'Nejasna določila se razlagajo v korist stranke, ki jih ni pripravila. Splošni pogoji so del pogodbe le, če sta jih stranki sprejeli; določila v nasprotju z namenom pogodbe ali dobrimi običaji so nična; namenjeni so NEdoločenemu številu razmerij.'),
  Q('Delniška družba: (izpit)', [
    'Premoženje družbe je ločeno od premoženja delničarjev, lastnik je izključno družba',
    'Delniška družba je osebna družba, ki ima osnovni kapital razdeljen na delnice',
    'Delniška družba ne sme nikoli pridobiti lastnih delnic, niti izjemoma',
    'V dvotirnem sistemu vodita posle delniške družbe uprava in nadzorni svet'], 0,
    'D.d. je kapitalska družba z ločenim premoženjem. Lastne delnice lahko pridobi izjemoma (do 10 %). V dvotirnem sistemu posle vodi uprava, nadzorni svet jo le nadzira.'),
  Q('Alternativno reševanje sporov: (izpit)', [
    'Poravnava je lahko sklenjena neoblično ali pred sodiščem oziroma notarjem',
    'Arbitraža je oblika, kjer arbiter kot posrednik pomaga strankama do dogovora',
    'Pri koncilaciji o sporu z avtoritativno odločbo odloči koncilator',
    'Institucionalne arbitraže se ustanovijo za posamezen spor in nato prenehajo'], 0,
    'Arbiter spor odloči (ne posreduje). Pri mediaciji in koncilaciji odločita stranki sami. Institucionalne arbitraže so stalne, ad hoc arbitraže nastanejo za posamezen spor.'),
  Q('Institucije EU so: (izpit)', [
    'Evropski svet, ki daje EU spodbude in splošne politične usmeritve ter določa prednostne cilje',
    'Evropski parlament, ki izvaja usklajevalno, izvršilno in upravno funkcijo oblasti v EU',
    'Evropsko sodišče za človekove pravice, ki izvaja sodno vejo oblasti v pravnem redu EU',
    'Evropska centralna banka, ki izvaja revizijo vseh prihodkov in odhodkov Unije'], 0,
    'Izvršilno funkcijo ima Komisija. ESČP je organ Sveta Evrope, ne EU (sodna veja EU je Sodišče EU). Revizijo opravlja Evropsko računsko sodišče.'),
  Q('Institucije EU so (druga različica): (izpit)', [
    'Komisija EU, ki izvaja usklajevalno, izvršilno in upravno funkcijo oblasti v EU',
    'Evropski svet, ki z Evropskim parlamentom opravlja zakonodajno in proračunsko funkcijo',
    'Evropsko sodišče za človekove pravice, ki izvaja sodno vejo oblasti v pravnem redu EU',
    'Evropska centralna banka, ki sama, brez nacionalnih centralnih bank, vodi monetarno politiko'], 0,
    'Zakonodajno in proračunsko funkcijo z EP opravlja Svet EU, ne Evropski svet. ECB vodi monetarno politiko SKUPAJ z nacionalnimi centralnimi bankami (to je bila na izpitu druga pravilna trditev).'),
  Q('Za prodajno pogodbo je značilno: (izpit)', [
    'Gospodarska prodajna pogodba je veljavna tudi, če kupnina ni določena',
    'Nevarnost naključnega uničenja stvari preide na kupca šele s plačilom kupnine',
    'Skrito stvarno napako mora kupec sporočiti v 6 mesecih od dneva, ko jo je opazil',
    'Obličnost je predpostavka za veljavno sklenitev vsake prodajne pogodbe'], 0,
    'Pri gospodarski pogodbi brez določene cene velja cena, ki jo prodajalec običajno zaračunava. Nevarnost preide z izročitvijo. Napako je treba sporočiti nemudoma (gosp.) oz. v 8 dneh; 6 mesecev teče od izročitve. Prodajna pogodba je praviloma neoblična.'),
  Q('Prodajna pogodba (druga različica): (izpit)', [
    'Kupec iz gospodarske pogodbe mora skrito napako sporočiti nemudoma, če od prevzema ni minilo 6 mesecev',
    'Če predmet ni mogoč, dopusten ter določen oziroma določljiv, je prodajna pogodba izpodbojna',
    'Stranka lahko vedno zahteva razveljavitev prodajne pogodbe zaradi kakršne koli zmote, tudi nebistvene',
    'Pisna oblika je predpostavka za veljavno sklenitev vsake prodajne pogodbe, ne glede na predmet'], 0,
    'Nemogoč ali nedopusten predmet povzroči ničnost, ne izpodbojnosti. Razveljavitev je mogoča le zaradi bistvene zmote. Oblika je potrebna le, kjer jo predpiše zakon (npr. nepremičnine).'),
  Q('Neveljavne pogodbe: (izpit)', [
    'Pravica do uveljavljanja ničnosti ne zastara',
    'Pogodba je izpodbojna, če nasprotuje ustavi ali prisilnim predpisom',
    'Na izpodbojnost pazi sodišče po uradni dolžnosti',
    'Nična pogodba postane veljavna, če vzrok ničnosti preneha'], 0,
    'Nasprotje z ustavo in prisilnimi predpisi povzroči ničnost. Po uradni dolžnosti sodišče pazi na ničnost, ne na izpodbojnost. Nična pogodba ne postane veljavna, če vzrok pozneje preneha.'),
  Q('Pravice industrijske lastnine: (izpit)', [
    'Geografsko ime proizvoda se zavaruje z označbo porekla blaga',
    'S patentom pridobljeno varstvo izuma časovno ni omejeno',
    'Pravice industrijske lastnine so tako kot obligacijske relativne',
    'Znamka velja 20 let in je po tem ni več mogoče podaljšati'], 0,
    'Patent traja 20 let. Pravice industrijske lastnine so absolutne (kot stvarne pravice) - to je bila na izpitu druga pravilna trditev. Znamka velja 10 let in se lahko poljubnokrat podaljša.'),
  Q('Za lastninsko pravico velja: (izpit)', [
    'O skupni lastnini govorimo, kadar deleži lastnikov niso vnaprej določeni',
    'Lastninska tožba za vrnitev stvari zastara v petih letih od odvzema stvari',
    'Lastninska pravica je obligacijska pravica na premičnih in nepremičnih stvareh',
    'Lastninska pravica se v javnem interesu lahko odvzame tudi brez nadomestila'], 0,
    'Lastninska tožba ne zastara. Lastninska pravica je stvarna. V javno korist se lahko omeji ali odvzame le proti nadomestilu v naravi ali odškodnini.'),
  Q('Za lastninsko pravico velja (druga različica): (izpit)', [
    'Solastniki lahko s svojim idealnim deležem razpolagajo brez soglasja drugih solastnikov',
    'Če je izkazan javni interes, se lastninska pravica lahko omeji, ne more pa se odvzeti',
    'Lastninska pravica je obligacijska pravica na premičnih in nepremičnih stvareh',
    'Pridobi se lahko s pravnim poslom ali sodbo, ne more pa se na podlagi zakona'], 0,
    'Lastnina se v javno korist lahko tudi odvzame (razlastitev). Pridobi se lahko tudi na podlagi zakona, npr. s priposestvovanjem.'),
  Q('Osebne družbe: (izpit)', [
    'Družbenik d.n.o. ne sme razpolagati s svojim deležem brez soglasja drugih družbenikov',
    'Družbenik, ki vstopi v obstoječo d.n.o., ne odgovarja za obveznosti, nastale pred vstopom',
    'Komanditist odgovarja z vsem svojim premoženjem, komplementar pa le s svojim vložkom',
    'V dvojni družbi je komplementar fizična oseba, komanditist pa družba z omejeno odgovornostjo'], 0,
    'Novi družbenik d.n.o. odgovarja tudi za prej nastale obveznosti. V k.d. je neomejeno odgovoren komplementar. Dvojna družba je k.d., v kateri je komplementar kapitalska družba (npr. d.o.o.).'),
  Q('Firma gospodarske družbe: (izpit)', [
    'Načelo obveznosti firme pomeni, da mora vsaka družba imeti ime in z njim nastopati v prometu',
    'Sedež družbe je obvezni sestavni del firme vsake gospodarske družbe',
    'Firme ni treba vpisati v sodni register, je pa to priporočljivo zaradi varnosti',
    'Firma kapitalske družbe mora vsebovati ime in priimek vsaj enega družbenika'], 0,
    'Sedež ni del firme (vpiše se posebej). Firma se obvezno vpiše v sodni register. Ime in priimek družbenikov vsebuje firma osebne družbe; kapitalska ima fantazijski dodatek.'),
  Q('Pravilnik: (izpit)', [
    'Ne more nikoli učinkovati za nazaj',
    'Začne veljati 20 dni po objavi v Uradnem listu RS',
    'Preneha veljati z odločbo Vrhovnega sodišča RS',
    'Mora biti v skladu z ustavo, ne pa nujno z zakoni'], 0,
    'Učinek za nazaj lahko za posamezne določbe določi le zakon. Predpis začne veljati 15. dan po objavi. Razveljavi ga Ustavno sodišče. Podzakonski akt mora biti v skladu z ustavo IN zakoni (na izpitu je bila to druga pravilna trditev).'),
  Q('Delnice: (izpit)', [
    'Delnicam s prednostno pravico pri dobičku se lahko izključi glasovalna pravica',
    'Delnica je korporacijski vrednostni papir, ki ga ureja poseben Zakon o delnicah',
    'Prednostnih delnic družba ne sme izdati za več kot 10 % osnovnega kapitala',
    'Delnica je dolžniški vrednostni papir, ki imetniku daje pravico do obresti'], 0,
    'Delnice ureja ZGD-1 (ni Zakona o delnicah). Prednostne delnice brez glasovalne pravice so omejene na polovico OK. Delnica je lastniški (korporacijski) VP, dolžniški je obveznica.'),
  Q('Za avtorsko pravico je značilno: (izpit)', [
    'Avtorsko delo pridobi popolno pravno varstvo že s samo stvaritvijo',
    'Avtor je lahko fizična ali pravna oseba, ki je delo ustvarila',
    'Moralne avtorske pravice se lahko prenašajo s pogodbami',
    'Za kršitev lahko avtor zahteva le odškodnino za premoženjsko škodo'], 0,
    'Avtor je lahko le fizična oseba. Moralne avtorske pravice so neprenosljive. Avtor lahko zahteva tudi odškodnino za nepremoženjsko škodo.'),
  Q('Za avtorsko pravico je značilno (druga različica): (izpit)', [
    'Pravna oseba ne more biti avtor, lahko pa je nosilec avtorskih pravic',
    'Pravica do prve objave se šteje med materialne avtorske pravice',
    'Avtorska pravica traja neomejeno, dokler je delo v javni rabi',
    'Pri delih iz delovnega razmerja vse pravice preidejo na delodajalca'], 0,
    'Prva objava je moralna pravica. Avtorska pravica traja življenje avtorja + 70 let. Moralne pravice pri delih iz delovnega razmerja ostanejo delavcu (to je bila na izpitu druga pravilna trditev).'),
  Q('Kdo vodi posle gospodarskih družb? (izpit)', [
    'V enotirnem sistemu vodi posle delniške družbe upravni odbor',
    'V dvotirnem sistemu vodita posle uprava in nadzorni svet skupaj',
    'V komanditni družbi vodijo posle komanditisti',
    'V družbi z neomejeno odgovornostjo vodi posle direktor'], 0,
    'Dvotirni: posle vodi uprava, NS nadzira. K.d.: komplementarji. D.n.o.: vsi družbeniki (direktor je organ d.o.o.).'),
  Q('Temeljne predpostavke za sklenitev pravnega posla so: (izpit)', [
    'Pravna in poslovna sposobnost strank, soglasje volj, možnost in dopustnost predmeta ter oblika, kadar jo predpiše zakon ali dogovor strank',
    'Pravna sposobnost strank, soglasje volj o bistvenih sestavinah, pravna možnost in dejanska dopustnost predmeta ter oblika, kadar jo predpiše zakon',
    'Pooblastilo predstavniku, poslovna sposobnost strank, soglasje o vseh elementih, možnost in dopustnost predmeta ter dogovorjena oblika',
    'Pravna in poslovna sposobnost pooblaščencev strank, soglasje volj, fizična in pravna možnost predmeta ter oblika po zakonu ali dogovoru'], 0,
    'Potrebni sta pravna IN poslovna sposobnost strank, soglasje volj, mogoč in dopusten (določen/določljiv) predmet ter oblika, kadar jo zahteva zakon ali dogovor.'),
  Q('Gospodarska družba: (izpit)', [
    'Osebne in kapitalske družbe odgovarjajo za obveznosti družbe z vsem svojim premoženjem',
    'V slovenskem pravnem redu velja koncesijski sistem ustanavljanja gospodarskih družb',
    'Ustanovitveni akt vseh gospodarskih družb, osebnih in kapitalskih, je statut',
    'V slovenskem pravnem redu nimamo omejenega kroga pravnoorganizacijskih oblik družb'], 0,
    'Družba sama vedno odgovarja z vsem svojim premoženjem (razlika je le v odgovornosti družbenikov). Velja normativni sistem, statut ima le d.d., oblike so zaprte (numerus clausus).'),
  Q('Za družbo z neomejeno odgovornostjo velja: (izpit)', [
    'Družbenik, ki vstopi v obstoječo d.n.o., odgovarja tudi za obveznosti, nastale pred vstopom',
    'Obvezni organi d.n.o. so poslovodstvo, nadzorni svet in skupščina družbenikov',
    'D.n.o. je družba dveh ali več oseb, ki za obveznosti družbe ne odgovarjajo',
    'D.n.o. ne more prenehati s stečajem, ker družbeniki odgovarjajo neomejeno'], 0,
    'D.n.o. nima obveznih organov, družbeniki odgovarjajo neomejeno, solidarno in subsidiarno. D.n.o. lahko preneha s stečajem (na izpitu je bila to druga pravilna trditev).'),
  Q('Vrednostni papirji: (izpit)', [
    'Obveznica je dolžniški vrednostni papir, ki ga izdajo država, občine in pod pogoji podjetja',
    'Konosament je stvarnopravni vrednostni papir, sestavljen iz pobotnice in zastavnice',
    'Menica je kavzalen papir, odvisen od pravnega posla, ki je dejanski razlog za njeno izdajo',
    'Ček je stvarnopravni vrednostni papir, ki imetniku daje pravico do izročitve blaga'], 0,
    'Iz pobotnice in zastavnice je sestavljena skladiščnica. Menica je abstrakten VP. Ček je obligacijski (denarni) VP, plačljiv na vpogled.'),
  Q('Delniška družba (druga različica): (izpit)', [
    'Prednostnih delnic brez glasovalne pravice je lahko največ za polovico osnovnega kapitala',
    'Člane uprave, ki zastopajo interese delničarjev, voli skupščina delničarjev',
    'Glavni delničar z najmanj 75 % osnovnega kapitala lahko izključi ostale delničarje',
    'O spremembah statuta odloča nadzorni svet s tričetrtinsko večino'], 0,
    'Upravo imenuje nadzorni svet. Izključitev manjšinskih delničarjev je mogoča pri 90 %. O statutu odloča skupščina.'),
  Q('Sodni register: (izpit)', [
    'Vpis sklepa o imenovanju direktorja v sodni register je deklaratorne narave',
    'Gospodarske družbe z vpisom v sodni register pridobijo poslovno sposobnost',
    'Podjetnik lahko začne opravljati dejavnost, ko se vpiše v sodni register',
    'Sodni register vodi AJPES, okrožna sodišča pa skrbijo za objavo podatkov'], 0,
    'Z vpisom ustanovitve družba pridobi pravno sposobnost (pravno osebnost). S.p. se vpiše v Poslovni register Slovenije. Sodni register vodijo okrožna sodišča, objavo zagotavlja AJPES.'),
  Q('Sprememba in prenehanje obligacij: (izpit)', [
    'Po volji obeh pogodbenih strank obveznost preneha s prenovo (novacijo)',
    'Če dolžnik izpolni zastarano obveznost, lahko terja vrnitev izpolnjenega',
    'Z zastaranjem preneha obveznost in tudi pravica zahtevati izpolnitev',
    'Pobot nastopi le, če se o njem izrecno sporazumeta obe pogodbeni stranki'], 0,
    'Zastaranje odvzame le pravico zahtevati izpolnitev, obveznost ostane (naravna), zato vrnitve ni. Pobot učinkuje z enostransko izjavo, ko se terjatvi srečata.'),
  Q('Viri prava EU: (izpit)', [
    'Uredba EU je zavezujoč pravni akt in sekundarni vir prava EU',
    'Predloge za sprejem uredb EU praviloma daje Evropski svet',
    'Nacionalno sodišče sme uporabiti pravo EU le z dovoljenjem Sodišča EU',
    'Primarni viri prava EU so uredbe, direktive in sklepi institucij'], 0,
    'Zakonodajno pobudo ima Komisija. Nacionalna sodišča pravo EU uporabljajo neposredno (prek predhodnega vprašanja lahko le vprašajo za razlago). Uredbe, direktive in sklepi so sekundarni viri.'),
  Q('Za stvarne pravice je značilno: (izpit)', [
    'Stvarno breme zavezuje lastnika obremenjene nepremičnine k bodočim dajatvam ali storitvam',
    'Predmet zastave ne morejo biti vrednostni papirji, temveč le premičnine in nepremičnine',
    'Stvarne pravice na premičninah se pridobijo z vpisom v zemljiško knjigo, ki je konstitutiven',
    'Služnosti ni mogoče priposestovati, ampak se ustanovi le s pogodbo ali odločbo'], 0,
    'Zastavijo se lahko tudi VP in terjatve. V zemljiško knjigo se vpisujejo pravice na nepremičninah. Služnost se lahko pridobi tudi s priposestvovanjem.'),
  Q('Za insolvenčne postopke je značilno: (izpit)', [
    'Terjatve upnikov, nastale pred začetkom stečaja, se poplačajo sočasno in sorazmerno',
    'Insolvenčne postopke ureja Zakon o gospodarskih družbah (ZGD-1)',
    'Stečaj je posledica sporazuma družbenikov, da družba preneha',
    'Nad osebno družbo se lahko uvede stečaj, ne more pa prisilna poravnava'], 0,
    'Velja načelo enakega obravnavanja upnikov. Insolvenčne postopke ureja ZFPPIPP. Stečaj je posledica insolventnosti (sporazum družbenikov vodi v likvidacijo). Prisilna poravnava je mogoča tudi nad osebno družbo.'),
];

const izpitStarejsi = [
  Q('Molk osebe, na katero je ponudba naslovljena: (izpit)', [
    'Ne pomeni sprejema ponudbe', 'Pomeni sprejem ponudbe v vsakem primeru', 'Pomeni, da je pogodba sklenjena', 'Pomeni zavrnitev ponudbe v vsakem primeru'], 0,
    'Molk praviloma ni sprejem. Izjema: stalna poslovna zveza, kjer naslovnik ponudbo v okviru te zveze mora zavrniti.'),
  Q('Pri cesiji terjatve se: (izpit)', [
    'Spremeni dosedanji upnik', 'Spremeni oseba dolžnika', 'Ob upniku vstopi še nov upnik', 'Spremenita obe stranki'], 0,
    'Cesija (odstop terjatve) zamenja upnika: cedent prenese terjatev na cesionarja, dolžnik ostane isti. Menjava dolžnika je prevzem dolga.'),
  Q('Za kaj odgovarja cedent pri neodplačni cesiji? (izpit)', [
    'Ne za obstoj ne za izterljivost', 'Le za obstoj terjatve', 'Le za izterljivost terjatve', 'Za obstoj in za izterljivost'], 0,
    'Pri odplačnem odstopu cedent odgovarja za obstoj terjatve (za izterljivost le, če je dogovorjeno). Pri neodplačnem ne odgovarja niti za obstoj.'),
  Q('Pristop k dolgu se opravi: (izpit)', [
    'S pogodbo', 'S prevzemom cesije', 'Z akceptom', 'Z regresom'], 0,
    'Pristop k dolgu je pogodba med prevzemnikom in upnikom (ali dolžnikom), s katero prevzemnik vstopi v obveznost poleg dolžnika.'),
  Q('Na čem temelji subjektivna odškodninska odgovornost? (izpit)', [
    'Na krivdi povzročitelja', 'Na vzročni zvezi', 'Na statusu povzročitelja', 'Na nevarnosti stvari'], 0,
    'Subjektivna (krivdna) odgovornost temelji na krivdi. Objektivna odgovornost (nevarna stvar, nevarna dejavnost) ne glede na krivdo.'),
  Q('S čim se predvsem ublaži nepremoženjska škoda? (izpit)', [
    'Z denarno odškodnino', 'Z odškodnino v naravi', 'Z vzpostavitvijo prejšnjega stanja', 'Z odločbo notarja'], 0,
    'Za nepremoženjsko škodo (telesne, duševne bolečine, strah) se prisodi pravična denarna odškodnina.'),
  Q('Kdaj je pogodba nična? (izpit)', [
    'Če nima podlage', 'Če je sklenjena v zmoti', 'Če je bila stranka prevarana', 'Če je stranka mladoletna'], 0,
    'Pogodba brez (dopustne) podlage je nična. Zmota, prevara in omejena poslovna sposobnost povzročijo izpodbojnost.'),
  Q('Kdaj je pogodba razdrta že po samem zakonu? (izpit)', [
    'Če je rok bistvena sestavina in dolžnik ne izpolni v roku', 'Če ena stranka hudo krši zakon ali pogodbo', 'Če dolžnik zamudi z izpolnitvijo navadnega roka', 'Če upnik terjatev iz pogodbe odstopi drugemu'], 0,
    'Pri fiksnem roku je pogodba razdrta po samem zakonu, če dolžnik ne izpolni v roku (razen če upnik takoj zahteva izpolnitev).'),
  Q('Ara se v pogodbi dogovori: (izpit)', [
    'Kot znamenje, da je pogodba sklenjena, in kot varščina', 'Izključno kot predujem (avans) na račun kupnine', 'Kot zakoniti pogoj, brez katerega pogodba ne nastane', 'Kot cena, ki jo stranka plača za odstop od pogodbe'], 0,
    'Ara je znamenje sklenitve in zagotovilo izpolnitve. Cena za odstop od pogodbe je odstopnina (skesnina).'),
  Q('Obveznost poroka pri gospodarskih pogodbah je: (izpit)', [
    'Akcesorna in solidarna z glavnim dolžnikom', 'Vedno akcesorna in subsidiarna do dolžnika', 'Samostojna in abstraktna kot garancija', 'Odvisna le od dogovora upnika in poroka'], 0,
    'Pri gospodarskih pogodbah porok odgovarja kot solidarni porok (upnik lahko terja kogar koli). Akcesorna je, ker je odvisna od glavne obveznosti. Abstraktna je bančna garancija.'),
  Q('Upnik uveljavlja pridržno (retencijsko) pravico tako: (izpit)', [
    'Da zadrži stvar, dokler mu dolžnik ne plača', 'Da na stvari pridobi lastninsko pravico', 'Da stvar da v najem tretji osebi', 'Da stvar uporablja in z njo razpolaga'], 0,
    'Pridržna pravica: upnik, ki ima dolžnikovo stvar, jo sme zadržati do poplačila zapadle terjatve. Stvari ne sme uporabljati ali z njo razpolagati.'),
  Q('Koliko znaša splošni zastaralni rok? (izpit)', [
    '5 let', '3 leta', '1 leto', '10 let'], 0,
    'Splošni zastaralni rok po OZ je 5 let. Krajši roki veljajo npr. za gospodarske pogodbe (3 leta) in občasne terjatve.'),
  Q('Lastninska pravica na nepremičnini se pridobi: (izpit)', [
    'Z vpisom v zemljiško knjigo', 'S prevzemom nepremičnine v posest', 'Z overovitvijo kupoprodajne pogodbe', 'S plačilom kupnine'], 0,
    'Pri pridobitvi s pravnim poslom je vpis v zemljiško knjigo konstitutiven. Pogodba je le zavezovalni posel (titulus), vpis je modus.'),
  Q('Člane uprave delniške družbe imenuje: (izpit)', [
    'Nadzorni svet', 'Skupščina družbe', 'Direktor družbe', 'Imetniki prednostnih delnic'], 0,
    'V dvotirnem sistemu nadzorni svet imenuje in odpokliče upravo; skupščina voli nadzorni svet.'),
  Q('Pravna oseba pridobi pravno sposobnost: (izpit)', [
    'Z vpisom v register', 'S sklenitvijo pogodbe o ustanovitvi', 'Z overovitvijo podpisov ustanoviteljev', 'Z odločbo upravnega organa'], 0,
    'Vpis ustanovitve v sodni register je konstitutiven - družba nastane kot pravna oseba.'),
  Q('Stečaj družbe je posledica: (izpit)', [
    'Insolventnosti družbe', 'Sporazuma družbenikov', 'Uvedbe likvidacije', 'Ničnosti vpisa v register'], 0,
    'Stečaj je insolvenčni postopek. Sporazum družbenikov vodi v (redno) likvidacijo, ničnost vpisa pa v prisilno likvidacijo.'),
  Q('Pri bančni garanciji banka garant: (izpit)', [
    'Nima pooblastila presojati izpolnitve temeljne pogodbe', 'Lahko uveljavlja ugovore iz temeljnega posla', 'Plača šele, ko presodi, da dolžnik ni izpolnil', 'Odgovarja subsidiarno kot navaden porok'], 0,
    'Bančna garancija je abstraktna: banka plača na prvi poziv, če je zahteva v skladu z garancijskimi pogoji, in ne presoja temeljnega razmerja.'),
  Q('Kaj je določujoča prvina nelojalne konkurence? Dejanje, ki: (izpit)', [
    'Nasprotuje dobrim poslovnim običajem', 'Ni skladno z osebno moralo trgovca', 'Krši ustavno svobodo gospodarske pobude', 'Omejuje uvoz tujega blaga v državo'], 0,
    'Nelojalna konkurenca je dejanje v nasprotju z dobrimi poslovnimi običaji, ki povzroči ali lahko povzroči škodo drugim udeležencem na trgu.'),
  Q('Menica z rekta klavzulo ("ne po odredbi") se prenese na tretjo osebo: (izpit)', [
    'S cesijo', 'Z indosamentom', 'Z izročitvijo', 'Z avalom'], 0,
    'Rekta klavzula prepove prenos z indosamentom; menica se lahko prenese le z navadnim odstopom terjatve (cesijo).'),
  Q('Kakšna dospelost velja za ček? (izpit)', [
    'Na vpogled', 'Ustno dogovorjena', 'Pogodbena', 'Po bančnih običajih'], 0,
    'Ček je vedno plačljiv na vpogled; drugačna dospelost se šteje za nenapisano.'),
  Q('Kup na pokušnjo je: (izpit)', [
    'Pogodba z odložnim pogojem', 'Pogodba z razveznim pogojem', 'Posebna prodaja na obroke', 'Pogodba s fiksnim rokom'], 0,
    'Pogodba je sklenjena pod odložnim pogojem, da kupec stvar po pokušnji odobri.'),
];

module.exports = {
  id: 'pravo',
  parts: [
    {
      id: 'izpit', name: 'Izpit', type: 'izpit',
      notesMd: NOTES_IZPIT,
      prependNotesOf: ['k1', 'k2'],
      decks: [
        { id: 'pi-novejsi', name: 'Izpitna vprašanja (novejši izpiti)', questions: izpitNovejsi },
        { id: 'pi-starejsi', name: 'Kratka izpitna vprašanja (starejši izpiti)', questions: izpitStarejsi },
      ],
    },
  ],
};
