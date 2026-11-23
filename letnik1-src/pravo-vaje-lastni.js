/* Pravo družb in poslovno pravo - kompleta »Praktični primeri« (k1, k2), predelana 23. 11. 2026.
   Prej so vprašanja sledila scenarijem z vaj (avtorsko delo), zdaj ima vsako vprašanje lasten scenarij, nova imena in
   številke; pravna poanta in stalni id ostaneta (CLAUDE.md). Kompleta prej nista imela modula (enkratna skripta
   add-pravo-vaje.js je onemogočena), zato ta modul nadomesti oba kompleta v celoti. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

const k1 = [
  withId('qdoq5m2', Q('Člen zakona se glasi: »Kdor proda stvar, mora kupcu izročiti tudi listine, ki se nanašajo nanjo.« Kakšno pravno pravilo je to?', [
    'Splošno in abstraktno: velja za vsakega prodajalca in ureja tipski primer',
    'Posamično in konkretno: velja za enega prodajalca in en sam posel',
    'Splošno in konkretno: velja za vsakogar, a le za eno določeno stvar',
    'Abstraktno in posamično: ureja tipski primer, a za enega prodajalca'], 0,
    'Splošno = nedoločen krog naslovljencev (»kdor«), abstraktno = tipski dejanski stan. Posamično in konkretno je npr. sodba ali odločba v enem primeru.')),
  withId('qpgog5s', Q('Za spor iz gradbene pogodbe imajo splošna pravila o podjemni pogodbi in posebna pravila o gradbeni pogodbi različen rok za grajanje napak. Katera pravila uporabi sodišče?', [
    'Splošna pravila o podjemni pogodbi, ker veljajo za več pogodb',
    'Tista, ki jih izbere naročnik kot stranka, ki toži',
    'Obe hkrati, iz vsakega pa vzame ugodnejši rok',
    'Posebna pravila o gradbeni pogodbi, ker so specialnejša'], 3,
    'Lex specialis derogat legi generali: specialnejše pravilo ima prednost pred splošnim. Gradbena pogodba je posebna vrsta podjemne pogodbe.')),
  withId('q1mduh8b', Q('Zakon, objavljen 10. decembra, zviša davek in določi, da velja za vse obveznosti tega leta, tudi za že plačane in zaključene. Ali je to dopustno?', [
    'Da, zakon lahko za nazaj velja vedno, kadar to predlaga vlada',
    'Ne, za zaključena razmerja je takšna obremenitev za nazaj prepovedana',
    'Da, pri davkih je učinek za nazaj vedno v javno korist države',
    'Da, če se s tem v javni razpravi strinja večina davčnih zavezancev'], 1,
    'Prava retroaktivnost (razmerja, ki so se v celoti končala) je izjemoma dopustna le za posamezne določbe zakona, ob javni koristi in brez posega v pridobljene pravice. Dodatna obremenitev že plačanih obveznosti posega v pridobljene pravice.')),
  withId('q1vxki2d', Q('Hrvaška medicinska sestra se zaposli v avstrijski bolnišnici, ki ji za enako delo ponudi nižjo plačo kot avstrijskim kolegicam, ker ni avstrijska državljanka. Katera svoboščina EU je kršena?', [
    'Prost pretok blaga, ker bolnišnica kupuje opremo v tujini',
    'Prosto gibanje delavcev in prepoved diskriminacije po državljanstvu',
    'Prost pretok kapitala, ker se plača nakazuje v drugo državo',
    'Svoboda ustanavljanja, ker bolnišnica deluje v drugi državi'], 1,
    'Prosto gibanje delavcev (45. člen PDEU) in prepoved diskriminacije na podlagi državljanstva (18. člen PDEU): delavec iz druge članice mora imeti enake pogoje kot domači.')),
  withId('q1qtkqot', Q('Kmetijski ministri vseh članic se sestanejo v Luksemburgu in glasujejo o uredbi o ribolovnih kvotah. Kateri organ EU zaseda?', [
    'Evropski svet, ker gre za pomembno politično odločitev',
    'Evropska komisija, ker ima zakonodajno pobudo',
    'Svet EU, ki ga sestavljajo ministri držav članic',
    'Svet Evrope, ker zaseda zunaj Bruslja'], 2,
    'Svet EU sestavljajo ministri članic v sestavi glede na področje; aprila, junija in oktobra zaseda v Luksemburgu. Evropski svet so voditelji držav ali vlad, Svet Evrope pa ni organ EU.')),
  withId('qcsa7nx', Q('Dve manjši članici v Svetu EU glasujeta proti direktivi o embalaži, o kateri se odloča s kvalificirano večino, vse ostale so za. Ali lahko direktivo ustavita?', [
    'Da, ker ima vsaka članica pri sprejemanju direktiv pravico veta',
    'Da, če skupaj predstavljata vsaj desetino prebivalstva Unije',
    'Ne, za blokado so potrebne vsaj štiri članice z več kot 35 % prebivalstva',
    'Ne, ker o vseh direktivah dokončno odloča le Evropski parlament'], 2,
    'Kvalificirana večina = 55 % članic z vsaj 65 % prebivalstva. Blokirna manjšina potrebuje vsaj štiri članice z več kot 35 % prebivalstva.')),
  withId('qkk6e0r', Q('Slovensko podjetje trdi, da je uredba EU o označevanju živil v nasprotju z Ustavo RS, in predlaga, naj jo Ustavno sodišče RS odpravi. Ali je to mogoče?', [
    'Da, ustava je najvišji akt in ima vedno prednost pred uredbo',
    'Ne, o veljavnosti uredbe odloča le Sodišče EU, sodišče ga lahko vpraša',
    'Da, a le, če z odločitvijo soglaša Državni zbor',
    'Ne, ker uredba začne veljati šele po potrditvi v Državnem zboru'], 1,
    'Načelo primarnosti: pravo EU ima prednost tudi pred ustavo članice. Akt EU lahko razveljavi le Sodišče EU (Foto-Frost); nacionalno sodišče ob dvomu vloži predhodno vprašanje (267. člen PDEU).')),
  withId('q1pkgrbn', Q('Rok za prenos direktive o označevanju kemikalij je potekel, Slovenija pa je ni prenesla. Trgovka označuje izdelke po direktivi, tržni inšpektor jo kaznuje po starem zakonu. Ali se lahko sklicuje na direktivo?', [
    'Da, ker gre za spor z državo, rok je potekel in določba je jasna',
    'Ne, ker direktiva nikoli nima neposrednega učinka',
    'Ne, dokler direktive ne prenese Državni zbor',
    'Da, ker direktiva vedno velja neposredno, tudi med zasebniki'], 0,
    'Vertikalni neposredni učinek: posameznik proti državi, rok za prenos je potekel, določba je jasna, natančna in brezpogojna (Ratti).')),
  withId('q1qsuebf', Q('Direktiva o pravicah najemnikov v roku ni prenesena. Najemnik toži zasebnega najemodajalca in se sklicuje neposredno na direktivo. Kdo bo uspel?', [
    'Najemnik, ker direktiva varuje šibkejšo stranko',
    'Najemnik, če toži neposredno pred Sodiščem EU',
    'Nihče, spor mora najprej rešiti Državni zbor z zakonom',
    'Najemodajalec, ker direktiva nima horizontalnega učinka'], 3,
    'Direktiva nima horizontalnega neposrednega učinka: proti zasebniku se nanjo ni mogoče sklicevati. Najemnik ima lahko odškodninski zahtevek proti državi zaradi neprenosa (Francovich).')),
  withId('q1fu1wwc', Q('Brat in sestra podedujeta vikend, vsak do polovice, in se vpišeta v zemljiško knjigo. Sestra bi svojo polovico rada prodala prijateljici. Ali potrebuje bratovo soglasje?', [
    'Da, brez soglasja vseh solastnikov ni mogoče prodati ničesar',
    'Ne, s svojim deležem razpolaga sama, brat pa ima predkupno pravico',
    'Ne, ker je vikend skupna lastnina in deleži niso določeni',
    'Da, ker lahko nepremičnino proda le sodišče z delitvijo'], 1,
    'Pri solastnini ima vsak solastnik določen idealni delež, s katerim prosto razpolaga. Drugi solastniki imajo predkupno pravico.')),
  withId('qdleuh9', Q('Etažna lastnica v stanovanju redi več deset psov, ki ponoči lajajo in onesnažujejo stopnišče; opomini ne pomagajo. Kaj lahko storijo drugi etažni lastniki?', [
    'Nič, ker lastninske pravice na stanovanju ni mogoče izgubiti',
    'Ovadijo upravnika, ker ni preprečil motenja',
    'Po opominu in s soglasjem večine vložijo izključitveno tožbo',
    'Ji odpovejo najemno pogodbo za stanovanje'], 2,
    'Zoper etažnega lastnika, ki huje krši sožitje, je mogoča izključitvena tožba: najprej opomin, nato soglasje solastnikov z več kot polovico deležev, tožbo vloži upravnik. Posledica je prodaja njenega dela.')),
  withId('q4385mv', Q('Neznanec ukrade Robiju fotoaparat in ga prek spletnega oglasa proda Sari, ki misli, da kupuje od lastnika. Ali je Sara postala lastnica?', [
    'Ne, ker tat ni bil lastnik, Sara pa ni kupila od trgovca ali na dražbi',
    'Da, ker je bila v dobri veri in je plačala kupnino',
    'Da, ker lastninska pravica pri premičninah vedno preide z izročitvijo',
    'Da, ker Robi tatvine ni prijavil v osmih dneh'], 0,
    'Nihče ne more prenesti več pravic, kot jih ima. Pridobitev od nelastnika zahteva dobro vero, odplačnost in nakup od trgovca, na javni dražbi ali stvar, zaupano po volji lastnika. Robi lahko z lastninsko tožbo zahteva fotoaparat nazaj.')),
  withId('q1ekaern', Q('Lea ima na vikendu hipoteko za bančni kredit. Vikend podari hčerki, ki se vpiše v zemljiško knjigo, nato Lea kredita ne odplačuje več. Ali lahko banka poseže na vikend?', [
    'Ne, s podaritvijo hčerki je hipoteka na vikendu ugasnila',
    'Ne, banka lahko zdaj terja le Leo osebno za ves kredit',
    'Da, a le, če hči pred notarjem pisno pristane na hipoteko',
    'Da, ker hipoteka sledi nepremičnini ne glede na lastnika'], 3,
    'Hipoteka bremeni nepremičnino in ji sledi tudi po prodaji ali podaritvi. Banka lahko predlaga izvršbo na vikend, čeprav je zdaj hčerin.')),
  withId('q16r1o8o', Q('Društvo naroči kostume za pustno povorko 1. marca in rok izrecno zapiše v pogodbo kot bistven. Kostumi prispejo 3. marca. Kaj velja?', [
    'Društvo mora dobavitelju najprej dati primeren dodatni rok za dobavo',
    'Pogodba je razvezana po samem zakonu, kostumov ni dolžno prevzeti',
    'Društvo mora kostume prevzeti, lahko pa zahteva sorazmeren popust',
    'Dobavitelj ne odgovarja, ker je zamudil le dva dni po dogovorjenem roku'], 1,
    'Pri bistvenem (fiksnem) roku je pogodba ob zamudi razvezana po samem zakonu, razen če upnik takoj sporoči, da vztraja pri izpolnitvi. Dodatni rok je potreben le, kadar rok ni bistven.')),
  withId('q1yu75vx', Q('Podjetje kupi rabljen viličar od drugega podjetja s klavzulo »videno–kupljeno«. Čez dva tedna se pokaže razpoka v ohišju motorja, ki je obstajala že prej in je ni bilo mogoče opaziti. Ali prodajalec odgovarja?', [
    'Ne, ker klavzula izključi vso odgovornost prodajalca',
    'Ne, ker je viličar rabljen in je bila cena temu primerna',
    'Da, ker klavzula izključi le vidne napake, ne skritih',
    'Da, a le, če kupec napako sporoči v šestih mesecih'], 2,
    '»Videno–kupljeno« izključi odgovornost za napake, ki bi jih kupec opazil ob pregledu, ne za skrite. Pri gospodarski pogodbi mora kupec skrito napako sporočiti nemudoma.')),
  withId('q7z1pzw', Q('Hotel naroči prenovo kopalnic pri izvajalcu, ki za polaganje ploščic najame keramičarja. Hotel izvajalcu plača vse, izvajalec keramičarju ne. Ali lahko keramičar plačilo zahteva od hotela?', [
    'Da, ker je hotel končni naročnik in lastnik prenovljenih kopalnic',
    'Da, če so ploščice položene brez napak in jih je hotel prevzel',
    'Ne, terja lahko le izvajalca, s katerim je sklenil pogodbo',
    'Da, a le s pisnim soglasjem izvajalca, ki ga je najel'], 2,
    'Podizvajalec je v pogodbenem razmerju z glavnim izvajalcem, ne z naročnikom. Ker je hotel izvajalcu plačal v celoti, keramičar plačilo terja od izvajalca.')),
  withId('q1kfermr', Q('Upravna enota Petri zavrne izdajo gradbenega dovoljenja. Petra meni, da je odločba nezakonita. Katero pravno sredstvo ima najprej na voljo?', [
    'Ustavno pritožbo na Ustavno sodišče RS',
    'Pritožbo, o kateri odloči drugostopenjski organ',
    'Tožbo v upravnem sporu na Upravno sodišče',
    'Revizijo na Vrhovno sodišče RS v 30 dneh'], 1,
    'Zoper prvostopenjsko upravno odločbo se najprej vloži pritožba, o kateri odloči drugostopenjski organ (ministrstvo). Šele dokončna odločba se izpodbija v upravnem sporu.')),
  withId('q1nkwnyb', Q('Ministrstvo zavrne Petrino pritožbo zoper zavrnitev gradbenega dovoljenja; odločba je dokončna. Kaj lahko Petra stori?', [
    'Ponovno se pritoži na isto ministrstvo',
    'Nič več, ker je odločba že dokončna',
    'Zahteva referendum o odločbi v svoji občini',
    'Sproži upravni spor na Upravnem sodišču'], 3,
    'Zoper dokončno upravno odločbo je mogoč upravni spor pred Upravnim sodiščem. Po izčrpanju pravnih sredstev in ob kršitvi človekove pravice pride v poštev še ustavna pritožba.')),
  withId('q6w34j0', Q('Odlok prepoveduje »vožnjo s kolesom po parku«. Mitja se po parku vozi z električnim skirojem in redar ga kaznuje. Ali je kazen dopustna?', [
    'Ne, prepovedi ni dopustno širiti z analogijo v škodo posameznika',
    'Da, električni skiro je po namenu in nevarnosti enak kolesu',
    'Da, redar lahko praznino v odloku zapolni sam po namenu predpisa',
    'Ne, ker Mitja pred kaznijo ni bil ustno opozorjen na prepoved'], 0,
    'Načelo zakonitosti: kaznivo ali prekrškovno je le ravnanje, ki ga predpis izrecno določa. Analogija v škodo posameznika ni dopustna.')),
  withId('qcg3xn6', Q('Uredba EU določa najvišjo dovoljeno vsebnost pesticida v sadju, nacionalni zakon pa dovoljuje višjo. Katero pravilo se uporabi?', [
    'Nacionalni zakon, ker je bil sprejet kasneje',
    'Uredba EU, ker ima prednost pred nacionalnim pravom',
    'Ugodnejše za pridelovalce, ker uživajo varstvo zaupanja',
    'Nobeno, dokler ustavno sodišče ne odloči o sporu'], 1,
    'Načelo primarnosti: ob nasprotju ima pravo EU prednost; nacionalno sodišče nasprotno določbo ne uporabi. Uredba velja neposredno.')),
  withId('q1jyvjiv', Q('Uredba EU o pravicah potnikov v železniškem prometu ob daljši zamudi priznava delno povračilo cene vozovnice, nacionalni predpis pa ne. Tina toži prevoznika. Ali ima pravico in pred katerim sodiščem toži?', [
    'Nima, ker za njen prevoz velja nacionalni predpis njene države',
    'Ima, a tožiti mora neposredno pred Sodiščem EU v Luksemburgu',
    'Ima, uredba velja neposredno, toži pred nacionalnim sodiščem',
    'Nima, ker uredbe EU veljajo le za javne železniške prevoznike'], 2,
    'Uredba je neposredno uporabljiva in ima prednost. Posameznik pravico uveljavlja pred nacionalnim sodiščem, ki uporabi pravo EU.')),
  withId('q1301pz5', Q('Država dovoli prodajo pirotehnike le v specializiranih trgovinah z dovoljenjem, enako za domače in tuje izdelke. Italijanski proizvajalec trdi, da to krši prost pretok blaga. Kaj velja?', [
    'Ureditev je vedno prepovedana, ker kakor koli ovira trgovino med članicami',
    'Ureditev je vedno dovoljena, ker gre za javno varnost države',
    'O tem odloča le nacionalni parlament, pravo EU tu ne velja',
    'Ureditev je dopustna, če je nediskriminatorna, nujna in sorazmerna'], 3,
    'Ukrepi, ki ovirajo prost pretok blaga, so izjemoma dopustni zaradi nujnih razlogov javnega interesa (javna varnost, zdravje), če so nediskriminatorni, primerni in sorazmerni.')),
  withId('qw0jqq7', Q('Ivo že 25 let vozi po kolovozu čez sosednji travnik do svojega vinograda; služnost ni vpisana. Travnik kupi Gorazd, ki ob ogledu vidi kolovoz, in Ivu vožnjo prepove. Kdo ima prav?', [
    'Ivo, ker je služnost priposestvoval, Gorazd pa ni dobroveren',
    'Gorazd, ker zemljiška knjiga kupca varuje v vsakem primeru',
    'Nihče, potrebna je nova pisna pogodba o služnosti poti',
    'Gorazd, ker se služnost poti po zakonu ne more priposestvovati'], 0,
    'Stvarna služnost se priposestvuje z 20-letnim izvrševanjem. Na zaupanje v zemljiško knjigo se lahko sklicuje le dobroverni pridobitelj; kdor vidi uhojeno pot, bi moral poizvedeti.')),
  withId('q7n92cu', Q('Mojca prenese hišo na nečaka, ta pa se zaveže, da ji bo vsak mesec plačal 300 € in jo vozil k zdravniku; obveznost vpišeta kot stvarno breme. Nečak hišo proda Dušanu. Kdo mora Mojci plačevati?', [
    'Še vedno nečak, ker se je za dajatve zavezal osebno',
    'Dušan, ker stvarno breme bremeni vsakokratnega lastnika',
    'Nihče, ker obveznost s prodajo hiše samodejno ugasne',
    'Dušan, a le, če je to izrecno zapisano v njegovi pogodbi'], 1,
    'Stvarno breme je vpisano na nepremičnini in zavezuje vsakokratnega lastnika k ponavljajočim se dajatvam ali storitvam.')),
  withId('q1f3pakz', Q('Organizator ne more izvesti koncerta, ker oblasti zaradi nenadne poplave prepovejo vse prireditve v regiji. Kupci vstopnic zahtevajo še povračilo potnih stroškov. Kaj velja?', [
    'Organizator mora vrniti vstopnino in povrniti vse potne stroške',
    'Organizator ne vrne ničesar, ker ni kriv',
    'Organizator vrne vstopnino, odškodnine za stroške pa ne dolguje',
    'Organizator mora koncert izvesti, ko se razmere umirijo'], 2,
    'Višja sila (zunanji, nepredvidljiv, neodvrnljiv dogodek) razbremeni odškodninske odgovornosti. Ker izpolnitev ni mogoča, obveznost preneha in prejeto plačilo se vrne.')),
  withId('qo50mdb', Q('Galerist in zbiratelj skleneta pogodbo za kip, ceno pa naj po razstavi določi neodvisni cenilec. Ali je prodajna pogodba veljavna?', [
    'Ne, brez točno določene cene prodajna pogodba sploh ne nastane',
    'Da, a le, če gre za gospodarsko pogodbo med dvema podjetjema',
    'Ne, cena mora biti v pogodbi določena v evrih že ob podpisu',
    'Da, cena je lahko določljiva, npr. jo določi tretja oseba'], 3,
    'Bistveni sestavini prodajne pogodbe sta stvar in cena, cena pa je lahko le določljiva: določi jo tretja oseba ali velja običajna cena.')),
];

const k2 = [
  withId('q1cuwftm', Q('Ana in Bor želita ustanoviti »družbo z odgovornostjo do višine letnega prometa«, obliko, ki je zakon ne pozna. Ali jo lahko ustanovita?', [
    'Da, če to jasno zapišeta v družbeno pogodbo',
    'Ne, ker je krog oblik družb zakonsko zaprt',
    'Da, če obliko odobri AJPES',
    'Da, ker gre za različico komanditne družbe'], 1,
    'Za oblike družb velja numerus clausus: izbrati je treba eno od oblik, ki jih določa zakon.')),
  withId('q19r1xgc', Q('Lina osebno dolguje družbi Alfa d.o.o. 5.000 € za kupljen avto. Družba Beta d.o.o., ki jo vodi Lina, ima do Alfe terjatev 8.000 €. Ali lahko Lina svoj dolg pobota s terjatvijo Bete?', [
    'Da, ker Lina Beto vodi in jo zastopa',
    'Da, a le do višine 5.000 €',
    'Ne, ker terjatvi nista med istima osebama',
    'Da, če pobot odobri direktor Alfe'], 2,
    'Pobot zahteva vzajemnost: stranki morata biti druga drugi hkrati upnik in dolžnik. Lina in Beta sta različna pravna subjekta.')),
  withId('q14dpn0e', Q('Računovodska družba v svojem imenu najame gradbeni stroj za dejavnost, ki je nima registrirane. Kakšna je posledica?', [
    'Pogodba velja, družba pa stori prekršek',
    'Pogodba je nična, ker dejavnost ni registrirana',
    'Pogodba je izpodbojna v enem letu',
    'Pogodbo mora naknadno potrditi sodišče'], 0,
    'Posli zunaj registrirane dejavnosti so zaradi varstva tretjih veljavni. Družba pa odgovarja za prekršek.')),
  withId('qvwvgpp', Q('Trije družbeniki ustanovijo d.n.o.; Tadeja kot vložek prenese dostavni kombi. Njen osebni upnik predlaga rubež kombija. Ali bo uspel?', [
    'Da, ker je kombi ostal Tadejin, družba ga le uporablja',
    'Da, a le do višine Tadejinega deleža',
    'Da, če Tadejin dolg presega vrednost kombija',
    'Ne, ker je kombi z vložkom postal last družbe'], 3,
    'Vloženo premoženje postane last družbe in je ločeno od premoženja družbenika. Osebni upnik lahko poseže le na družbenikov delež, ne na stvari družbe.')),
  withId('qa9p2nq', Q('Prokurist Gašper v imenu družbe kupi nov tiskarski stroj, nato pa bi za posojilo zastavil poslovno stavbo družbe. Kaj od tega sme?', [
    'Oboje, ker je prokurist zakoniti zastopnik družbe za vse posle',
    'Nakup stroja da, hipoteke na stavbi brez posebnega pooblastila ne',
    'Hipoteko da, nakupa stroja pa ne brez soglasja skupščine',
    'Ničesar od tega, ker vse take posle sklepa le direktor družbe'], 1,
    'Prokura obsega vse posle, razen odsvojitve in obremenitve nepremičnin, za kar je potrebno posebno pooblastilo.')),
  withId('q1gitkll', Q('Štirje študenti ustanavljajo d.o.o. z osnovnim kapitalom 4.000 €; eden bo namesto denarja prispeval programersko delo v prihodnjih mesecih. Ali lahko tako ustanovijo d.o.o.?', [
    'Da, prihodnje programersko delo šteje kot stvarni vložek družbenika',
    'Da, ker najnižji osnovni kapital za d.o.o. sploh ni predpisan',
    'Ne, delo ni dovoljen vložek, osnovni kapital pa mora biti vsaj 7.500 €',
    'Da, če programer ne postane družbenik, ampak le zaposleni v družbi'], 2,
    'Vložek je lahko denarni ali stvarni (stvari, pravice), ne pa delo ali storitve. Najnižji osnovni kapital d.o.o. je 7.500 €.')),
  withId('ql06vkb', Q('Edini družbenik d.o.o. tik pred stečajem za simbolično ceno prenese vse stroje družbe na svojo drugo družbo; upniki ostanejo nepoplačani. Kaj lahko storijo?', [
    'Nič, družbenik prosto razpolaga s premoženjem družbe',
    'Le prijavijo terjatve v stečaju, ki ostanejo nepoplačane',
    'Zahtevajo, da AJPES izbriše družbo iz registra',
    'Zahtevajo spregled pravne osebnosti in terjajo družbenika osebno'], 3,
    'Spregled pravne osebnosti: ob zlorabi (izpraznitev premoženja v škodo upnikov) družbenik odgovarja osebno.')),
  withId('qwkiqfy', Q('Normirana podjetnica ima 40.000 € prihodkov. Normirani odhodki so 80 % prihodkov, dohodnina od osnove pa 20 %. Koliko dohodnine plača?', [
    '8.000 €, ker je osnova 20 % prihodkov',
    '1.600 €, kar je efektivno 4 % prihodkov',
    '6.400 €, ker se obdavči 80 % prihodkov',
    'Nič, ker normirani s.p. ne plača dohodnine'], 1,
    'Osnova = 40.000 × 20 % = 8.000 €; dohodnina = 8.000 × 20 % = 1.600 €, kar je 4 % prihodkov (20 % × 20 %).')),
  withId('qnaxrc7', Q('Grafični oblikovalec s s.p. že dve leti dela le za eno agencijo: vsak dan v njenih prostorih, po navodilih vodje in z njeno opremo, od nje dobi 95 % prihodkov. Kako to opredelimo?', [
    'Kot prikrito delovno razmerje oziroma ekonomsko odvisno osebo',
    'Kot običajno delo samostojnega podjetnika, vpisanega v register',
    'Kot podjemno pogodbo z enim samim stalnim naročnikom del',
    'Kot prostovoljno delo, za katero ne velja delovnopravno varstvo'], 0,
    'Delo osebno, nepretrgano, po navodilih in pod nadzorom kaže na prikrito delovno razmerje. Kdor dobi več kot 80 % prihodkov od enega naročnika, je ekonomsko odvisna oseba s posebnim varstvom.')),
  withId('q17ynaei', Q('Podjetnik s s.p. ima 30.000 € dolgov dobaviteljem in s.p. preoblikuje v d.o.o., da bi se rešil osebne odgovornosti. Ali mu uspe?', [
    'Da, dolgovi z vpisom preidejo na d.o.o., on osebno ne odgovarja več',
    'Da, če s preoblikovanjem v pisni obliki soglašajo vsi upniki',
    'Ne, za stare obveznosti še naprej odgovarja z vsem premoženjem',
    'Dolgovi ugasnejo, ker s.p. s preoblikovanjem preneha obstajati'], 2,
    'Ob preoblikovanju preidejo obveznosti na d.o.o., podjetnik pa za obveznosti, nastale pred tem, še naprej odgovarja z vsem svojim premoženjem.')),
  withId('qxfyokp', Q('Družbenica d.n.o. v imenu družbe naroči opremo za 40.000 €; družba računa ne plača. Kako lahko dobavitelj izterja dolg?', [
    'Le od družbe, ker družbeniki d.n.o. za njene dolgove ne odgovarjajo',
    'Najprej od družbe, nato od katerega koli družbenika za ves dolg',
    'Od vsakega družbenika le njegov sorazmerni del glede na delež',
    'Le od družbenice, ki je naročilo opreme sama podpisala'], 1,
    'V d.n.o. družbeniki odgovarjajo z vsem premoženjem, solidarno in subsidiarno. Plačnik ima nato regres do drugih družbenikov.')),
  withId('qhgajk9', Q('Družbena pogodba d.o.o. obljublja družbenici Meti vsako leto 1.000 € »zajamčene dividende«, tudi v letih z izgubo. Je določilo zakonito?', [
    'Da, ker se družbeniki lahko dogovorijo za kar koli',
    'Da, če znesek ne presega 5 % njenega vložka',
    'Ne, družbenikom se lahko izplača le bilančni dobiček',
    'Da, če izplačilo odobri poslovodja'], 2,
    'Izplačila družbenikom so dovoljena le iz bilančnega dobička. Izplačilo brez dobička bi poseglo v osnovni kapital (načelo ohranitve osnovnega kapitala).')),
  withId('q1of74oi', Q('Poslovodja d.o.o. pozabi povabiti na skupščino družbenika z 10 % deležem. Skupščina brez njega sprejme sklep o nakupu vozila. Kaj velja za sklep?', [
    'Sklep je ničen od začetka in nima nobenih pravnih učinkov',
    'Sklep je izpodbojen in velja, dokler ga družbenik ne izpodbije',
    'Sklep je veljaven, ker ima družbenik premajhen delež za ugovor',
    'Sklep mora poslovodja samodejno ponoviti na novi skupščini'], 1,
    'Kršitev pravice do udeležbe povzroči izpodbojnost sklepa. Sklep velja, dokler ga prizadeti družbenik ne izpodbija.')),
  withId('q63ip7h', Q('Družbenica s 25 % deležem izstopi iz d.o.o., cenilec oceni družbo na 200.000 €. Koliko je vreden njen delež in do kdaj ga mora družba izplačati?', [
    '25.000 €, takoj ob izstopu',
    '200.000 €, v enem letu od izstopa',
    '50.000 €, takoj ob izstopu iz družbe',
    '50.000 €, najpozneje v treh letih'], 3,
    '25 % od 200.000 € = 50.000 €. Družba mora izstopivšemu družbeniku vrednost deleža izplačati praviloma najpozneje v treh letih.')),
  withId('q75rwio', Q('Družbenik od svoje družbe najame poslovni prostor za tretjino tržne najemnine, hkrati pa ji za svetovanje zaračuna dvakratno tržno ceno. Za kaj gre?', [
    'Za prikrito izplačilo dobička in kršitev ohranitve kapitala',
    'Za dopusten posel med družbo in njenim lastnim družbenikom',
    'Za posojilo družbenika družbi, ki se vrača z nižjo najemnino',
    'Za običajno nagrado za delo, ki ga družbenik opravi za družbo'], 0,
    'Posli pod netržnimi pogoji, s katerimi se premoženje brez pravega temelja preliva k družbeniku, so prikrito izplačilo dobička. Družba ima vrnitveni zahtevek.')),
  withId('q12inykj', Q('Družbenik družbi, ki je že v finančni krizi, posodi 50.000 €; kmalu zatem se začne stečaj. Kako se obravnava njegovo posojilo?', [
    'Kot navadna terjatev, enakovredna terjatvam drugih upnikov',
    'Kot prednostna terjatev, ker je posojilodajalec družbenik',
    'Kot podrejena terjatev, poplačana šele za zunanjimi upniki',
    'Posojilo z začetkom stečaja samodejno ugasne v celoti'], 2,
    'Posojila družbenikov, ki nadomeščajo lastni kapital, so v stečaju podrejene terjatve in se poplačajo šele za drugimi upniki.')),
  withId('qw4f9s9', Q('Družba ima firmo »Zeleni val, trgovina s sadikami, d.o.o.«, v prometu pa uporablja »Zeleni val d.o.o.«. Ali je to dovoljeno?', [
    'Ne, v pravnem prometu mora vedno uporabljati celotno firmo',
    'Da, uporablja lahko kakršno koli skrajšavo, tudi brez oznake oblike',
    'Da, a le s predhodnim soglasjem AJPES za vsako posamezno uporabo',
    'Da, če je skrajšana firma z oznako oblike vpisana v register'], 3,
    'Družba sme uporabljati skrajšano firmo, ki vsebuje razlikovalno sestavino in oznako pravnoorganizacijske oblike ter je vpisana v register.')),
  withId('qq19bjh', Q('Družbenik bi svoji d.o.o. prodal tovornjak, ki ga družba potrebuje. Ali sme družbenik sklepati posle z lastno družbo?', [
    'Ne, posli med družbo in družbenikom so prepovedani',
    'Da, pod tržnimi pogoji in brez škode za družbo',
    'Da, a le s soglasjem sodišča',
    'Da, a le, če je edini družbenik'], 1,
    'Posli med družbo in družbenikom niso prepovedani, biti pa morajo pod primerljivimi tržnimi pogoji. Sicer gre za prikrito izplačilo dobička.')),
  withId('qpcwlnt', Q('D.o.o. z osnovnim kapitalom 10.000 € ima zaradi izgub le še 3.000 € premoženja. Dobavitelj zahteva, da družbeniki doplačajo razliko »zaradi ohranitve kapitala«. Ima prav?', [
    'Da, osnovni kapital mora biti ves čas pokrit z doplačili družbenikov',
    'Da, družbeniki morajo doplačati vsaj polovico manjkajočega zneska',
    'Ne, načelo prepoveduje izplačila družbenikom, ne zahteva doplačil',
    'Da, sicer mora družba še isti dan predlagati začetek stečaja'], 2,
    'Načelo ohranitve osnovnega kapitala prepoveduje izplačila družbenikom iz premoženja, potrebnega za kapital. Dopolnjevanja kapitala po izgubi ne nalaga, razen če to določa družbena pogodba.')),
  withId('qdgsrkn', Q('V firmo komanditne družbe bi radi zapisali ime komanditistke Urše, ki je vložila največ denarja. Ali je to dovoljeno?', [
    'Ne, v firmi so lahko le imena komplementarjev',
    'Da, ker mora firma navajati vse družbenike družbe',
    'Da, če Urša s tem pisno soglaša pred vpisom',
    'Da, a le pri dvojni (kapitalski) komanditni družbi'], 0,
    'Firma k.d. vsebuje le imena komplementarjev. Ime komanditista bi zavajalo glede odgovornosti, saj komanditist ne odgovarja neomejeno.')),
  withId('q11o37m6', Q('Družbenica d.o.o., ki ni ne poslovodja ne prokuristka, v imenu družbe podpiše najem skladišča za tri leta. Ali pogodba zavezuje družbo?', [
    'Da, vsak družbenik lahko zastopa družbo',
    'Da, če družba skladišče že uporablja',
    'Je izpodbojna v enem letu od podpisa',
    'Ne, razen če jo poslovodja naknadno odobri'], 3,
    'Družbenik sam po sebi ni zastopnik. Posel osebe brez pooblastila družbe ne zavezuje, razen ob naknadni odobritvi; sicer odgovarja tisti, ki ga je sklenil.')),
  withId('q1mvoh5o', Q('Družbena pogodba d.o.o. določa, da družbenik s 25 % deležem dobi 40 % dobička. Je to dopustno?', [
    'Ne, dobiček se deli vedno strogo sorazmerno poslovnim deležem',
    'Da, delitev ni nujno sorazmerna, če se tako dogovorijo',
    'Da, a le za eno poslovno leto in s soglasjem vseh družbenikov',
    'Da, a le na podlagi posebnega sklepa registrskega sodišča'], 1,
    'Družbena pogodba lahko določi nesorazmerno delitev dobička. Nobenega družbenika pa ni dopustno povsem izključiti iz dobička.')),
  withId('qqggktw', Q('Podjetnica se odloča med s.p. in enoosebno d.o.o. Kako se razlikuje obdavčitev dobička?', [
    'Enako, razlika med njima je le v načinu vodenja poslovnih knjig',
    's.p. plača davek od dohodkov pravnih oseb, d.o.o. pa dohodnino',
    's.p. plača dohodnino, d.o.o. davek pravnih oseb in davek na dividende',
    's.p. plača le DDV in prispevke, d.o.o. pa vse ostale davke'], 2,
    'Pri s.p. je dobiček dohodek iz dejavnosti (dohodnina). D.o.o. plača davek od dohodkov pravnih oseb, izplačana dividenda pa je obdavčena še pri družbeniku.')),
  withId('q1ve84m6', Q('Skupščina d.o.o. odpokliče poslovodkinjo Martino. Kaj se zgodi z njeno pogodbo o zaposlitvi?', [
    'Odpoklic pogodbe ne prekine samodejno',
    'Pogodba z odpoklicem samodejno preneha',
    'Pogodba velja še šest mesecev, nato preneha',
    'Poslovodkinje brez krivdnega razloga ni mogoče odpoklicati'], 0,
    'Odpoklic konča korporacijski položaj poslovodje, ne pa samodejno pogodbe o zaposlitvi. Za njeno prenehanje veljajo odpovedna pravila.')),
  withId('q1ulp4yr', Q('D.o.o. želi od družbenika, ki izstopa, odkupiti njegov 30 % poslovni delež. Kateri pogoji veljajo?', [
    'Odkup je prost, če se z njim strinja družbenik, ki izstopa',
    'Potrebna sta sklep poslovodje in predhodna odobritev AJPES',
    'Sklep skupščine zadošča, ne glede na to, ali ima družba prosta sredstva',
    'Sklep skupščine, odkup iz prostih sredstev, brez ogrožanja plačilne sposobnosti'], 3,
    'Lastni delež: odkup na podlagi sklepa skupščine, le iz prostih sredstev in brez ogrožanja plačilne sposobnosti. Iz lastnega deleža družba nima glasovalnih pravic.')),
  withId('qswx2x', Q('Poslovodja predlaga, da družba najame skladišče od podjetja v lasti njegove žene. Kaj mora storiti?', [
    'Nič posebnega, ker je ženino podjetje za družbo zunanja oseba',
    'Razkriti povezavo, pridobiti soglasje in skleniti posel pod tržnimi pogoji',
    'Nič, ker je tak posel prepovedan in ga poslovodja sploh ne sme predlagati',
    'Pridobiti soglasje sodišča za vsak posel s povezano osebo posebej'], 1,
    'Posel s povezano osebo je dopusten le ob razkritju nasprotja interesov, soglasju družbenikov in tržnih pogojih. Sicer grozita odškodninska odgovornost in odpoklic.')),
];

module.exports = {
  id: 'pravo',
  parts: [
    { id: 'k1', decks: [{ id: 'pk1-vaje', name: 'Praktični primeri', questions: k1 }] },
    { id: 'k2', decks: [{ id: 'pk2-vaje', name: 'Praktični primeri', questions: k2 }] },
  ],
};
