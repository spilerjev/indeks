/* Temelji managementa (1. letnik, 1. semester)
   Viri: predavanja 1-6 (EF Zapiski), zapiski po učbeniku Dimovski et al. (2014), učni načrt 2025/26,
   vaje v slogu končnega izpita so napisane na novo.
   Ocena: skupinska seminarska naloga 50 % + končni izpit 50 % (pisni izpit od 2026/27; prej Kahoot). */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
// vprašanja z možnostjo "Vse/Nobena trditev ..." - vrstni red ostane (ta možnost je zadnja)
const QF = (q, options, correct, explanation) => ({ q, options, correct, explanation, fixedOrder: true });
const cards = (arr) => arr.map(([front, back]) => ({ front, back }));

const NOTES = `
## Kako poteka izpit
- **Ocena**: skupinska seminarska naloga (z 2 domačima nalogama v prilogi) **50 %** + končni izpit **50 %**. Brez seminarske ni izpita.
- **Končni izpit**: pisni izpit (od 2026/27; prej Kahoot). Podrobnosti o obliki preveri pri predmetu.
- Pozitivno od **55 točk**: 55-60 (6), 61-70 (7), 71-80 (8), 81-90 (9), 91-100 (10).
> Vaje v appu so vprašanja s štirimi trditvami; obliko pravega izpita preveri pri predmetu.

## Uvod v management
### Kaj je management
- **Management** = sodelovanje, interakcija med sodelavci in deležniki; planirati, organizirati, voditi in kontrolirati resurse in procese.
- **Daft**: ustvarjalno, uspešno in učinkovito doseganje ciljev skozi **4 funkcije**: planiranje, organiziranje, vodenje, kontroliranje.
- Zanimivosti s predavanj: švedsko *narings liv* = preskrba za življenje; *company* iz lat. *com panis* = delitev kruha; beseda management v modernem pomenu prvič **1670** (Oxford).
- **Uspešnost** (Drucker) = delati prave stvari (doseganje ciljev). **Učinkovitost** = delati stvari pravilno (poraba virov).
### 5 dimenzij sodobnega okolja managementa
Digitalizacija, ekologija, varnost, zdravje, individualnost (npr. GDPR).
### Ravni in vloge
- **Vrhnji** management: cilji, strategije, vizija, kultura. **Srednji**: uresničuje strategije, timsko delo, konflikti. **Nižji**: dnevni cilji, proizvodi in storitve.
- **Projektni** managerji: začasni projekti. **Funkcijski**: en oddelek z eno funkcijo. **Generalni**: več oddelkov z različnimi funkcijami.
- **Mintzberg - 10 vlog v 3 kategorijah**: medosebne (predstavnik, vodja, **zveza**), informacijske (spremljevalec, razširjevalec, govorec), odločitvene (podjetnik, reševalec motenj, razporejevalec virov, pogajalec).
### Spretnosti
- 3 področja: **tehnične**, **ravnanje s človeškimi viri**, **konceptualne** (organizacija kot celota, dolgi rok). Dubrin doda diagnostične, politične, komunikacijske.
- **Daft in Marcic - 10 lastnosti managerjev**: samozaupanje, nadzor čustev, fokus, objektivnost, graditev odnosov, iniciativnost, osredotočenost na cilje, sposobnost organiziranja, management časa, agilnost.
### Okolje in kultura
- **Splošno** zunanje okolje (družbeni, demografski, ekonomski, tehnološki dejavniki - vplivajo na vse) in **delovno** okolje (konkurenti, dobavitelji, kupci - vsakodnevne transakcije). **Notranje** okolje: organizacijska kultura.
- **Kultura** = vrednote, verovanja, razumevanja in norme, ki jih delijo člani. **Kulturni razkorak** = razlika med želeno in dejansko kulturo. **Simbolično vodenje** = vplivanje na kulturo s simboli.
- **Oakland - 10 načel organizacijske odličnosti**: dolgoročna zavezanost izboljševanju, "nič napak", odnos kupec-dobavitelj, obvladovanje stroškov, učinkovito vodenje, nadzor in usposabljanje, odstranitev ovir in timsko delo, primerjava z najboljšimi, stalno izobraževanje, sistematični pristop.

## Planiranje
### Osnovni pojmi
- Funkcija, najbolj povezana z **vrhnjim (strateškim)** managementom, a planirajo vse ravni.
- **Cilj** = želeno prihodnje stanje. **Plan** = načrt, kako ga doseči (viri, urnik, naloge). **Planiranje** = določanje ciljev in sredstev za njihovo uresničitev.
- **Poslanstvo** = razlog obstoja (Krka: "omogočati ljudem zdravo in kakovostno življenje"). **Vizija** = kje želimo biti v prihodnosti.
### Vrste ciljev
- Po **ravni**: organizacija, poslovna enota, oddelek, posameznik. Po **času**: trajni, dolgoročni, srednjeročni, kratkoročni, operativni. Po **vsebini**: prodajni, proizvodni, nabavni, kadrovski. Po **pomenu**: strateški, taktični, operativni.
- **Strateški** cilji - vrhnji management, dolgoročni. **Taktični** - srednji management, večji oddelki. **Operativni** - nižji management, kratkoročni.
- Dobri cilji: jasni in merljivi, časovno opredeljeni, izziv (težje dosegljivi), pokrivajo vsa področja, povezani z nagrajevanjem.
### Sodobna paradigma planiranja (6 značilnosti)
Močno poslanstvo in vizija; prožni, ambiciozni cilji; okolje, ki spodbuja učenje; plansko osebje kot analitična podpora (ne odločevalci); stalne izboljšave kot način življenja; planiranje se začne in konča na vrhu, a ob vključevanju širokega kroga.
### Strategija
- Iz grške *stratēgos* (vojskovodja). Bistvo: **kako biti drugačen** od konkurence, trajno.
- **Poslovna učinkovitost** (odličnost izvajanja) je nujna, a ne zadostna - prednosti so le začasne.
- Ravni strategij: **korporacijska** (celota), **poslovna** (strateška poslovna enota), **funkcijska** (npr. trženje).
- **Proces strateškega managementa (Hunger in Wheelen, 4 faze)**: analiza okolja (SWOT) → oblikovanje strategije → uresničevanje (programi, predračuni, postopki) → ovrednotenje in kontrola. Uresničevanje je najtežje.
- **SWOT**: prednosti in slabosti (notranje), priložnosti in nevarnosti (zunanje).
- **Porterjeva analiza panoge (5 sil)**: nevarnost novih konkurentov, pogajalska moč kupcev, pogajalska moč dobaviteljev, nevarnost substitutov, rivalstvo obstoječih konkurentov.
- **Porterjeve generične strategije**: diferenciacija, stroškovno vodenje, osredinjenje (na nizke stroške ALI diferenciacijo). Brez izbire → **"ne tič ne miš"**, nižji dobički.
- **Hibridna** strategija: stroškovno vodenje + diferenciacija (Hofer, Lidl z lastnimi kakovostnimi znamkami).
- **Miles in Snow**: iskalec (inovativnost, rast, tveganje), branilec (učinkovitost, stabilnost, niša), proučevalec (manj tveganja, več profita), reaktor (ni prava strategija, ad hoc).
- Orodja uresničevanja: vodenje, organizacijska struktura, informacijski in kontrolni sistem, človeški viri.
- Novi trendi: notranja inovativnost (dinamične zmogljivosti), strateška partnerstva, internet.
### Planska orodja
- **MBO** (planiranje s cilji), 4 koraki: postavljanje ciljev → akcijski plani → spremljanje napredka → ocena in nagrade. Slabost: zahteva stabilno okolje.
- Plani za **enkratno** uporabo in **stalni** plani. **Kontingenčni** plani: odziv na nujne primere (upad prodaje, odhod ključnih ljudi).
- **Scenariji**: 2 do 5 scenarijev, od optimističnega do pesimističnega.
- **Krizno planiranje**: preprečevanje in priprava na krizo. Razlogi za krizo: objektivni (recesija, naravne nesreče) in subjektivni (slabo vodstvo, šibko trženje) - vplivamo lahko na subjektivne.
- **Taktično planiranje** = letno planiranje, predračunavanje.

## Organiziranje
### Temeljni pojmi
- **Organizacijska struktura** = okvir, kako se razdelijo naloge in viri ter koordinirajo oddelki. Strategija = kaj, organizacija = kako.
- **Specializacija** (razdelitev dela), **formalizacija** (pisna pravila - več pravil, višja), **kompleksnost** (horizontalna = specializacija, vertikalna = število ravni, prostorska = lokacije).
- **Centralizacija** = odločitve na vrhu; **decentralizacija** = odločanje na nižjih ravneh. Večja negotovost okolja → decentralizacija; krizni časi → centralizacija.
- **Kontrolni razpon**: ozek (≤ 7, visoka struktura; banka, ministrstvo) ali širok (≥ 30, sploščena struktura; odvetniška pisarna, start-up).
- **Avtoriteta** = formalna pravica odločati in ukazovati: del položaja (ne osebe), sprejeta s strani sodelavcev, teče od vrha navzdol.
- **Delegiranje** = prenos odgovornosti in avtoritete; **ključna odgovornost ostane pri tistem, ki delegira**. Dobro delegiranje = prenos celotne naloge.
- **Opolnomočenje** = zaposlenim damo znanje, informacije in veščine za avtonomne odločitve.
### Strukture
| Struktura | Prednosti | Slabosti |
|---|---|---|
| Funkcijska (Slovenske železnice) | ekonomije obsega, specializacija, za enega ali malo proizvodov | slaba komunikacija med funkcijami, počasne odločitve, malo inovacij |
| Divizijska (McDonald's) | decentralizacija, odzivnost, skrb za trg, za velike z več proizvodi | podvajanje virov, višji stroški, slaba koordinacija med divizijami |
| Matrična | projektni management, ravnotežje čas-stroški-delo, za srednje velike z več izdelki | dvojno vodenje, konflikti, veliko sestankov |
| Timska | manjši stroški administracije, hiter odziv, manj meja med oddelki | dvojna lojalnost, veliko časa za koordinacijo |
| Mrežna (outsourcing) | fleksibilnost, globalno znanje, manj administracije | otežena kontrola, šibkejša lojalnost |
- Klasične: funkcijska, divizijska, matrična. Sodobne: mrežna, timska, horizontalna (procesna), hibridna.
- **Reinženiring** = radikalno preoblikovanje poslovnih procesov (kakovost, stroški, hitrost).
### Delo organizatorja in sestanki
- Organizator: rekrutira sodelavce, svetuje pri ciljih in strategijah, ohranja motivacijo, organizira naloge, razrešuje konflikte, usposablja nove.
- Učinkovit sestanek: **jasna agenda**, **vodja sestanka**, **management konfliktov**.
- 4 vrste sestankov (English): sestanki zaposlenih (kolegij), reševanja problemov, kombinirani, ustvarjalni. **Stoječi** sestanki: ~15 min.
- Pravilo **8-18-1800**: do 8 ljudi za odločanje, do 18 za viharjenje možganov, 1800+ za povezovanje. Sestanek največ ~55 min.
- Vloge: vodja, facilitator, zapisnikar, skrbnik za čas, ekspert.
- **Premortem** (Klein): "Leto kasneje je načrt propadel - napišite zgodovino neuspeha." Prepreči skupinsko razmišljanje.
- Porter in Nohria (2018): direktorji preživijo **72 %** časa na sestankih, 42 % sestankov je ena na ena.

## Vodenje
### Moč
- **Vodenje** = sposobnost vplivanja na druge, da sodelujejo pri doseganju skupnih ciljev. V širšem smislu: vodenje v ožjem smislu, komuniciranje, motiviranje, kadrovanje. Luthans: motiviranje, da zaposleni prostovoljno delujejo k skupnim ciljem.
- **Pozicijska moč**: legitimna, nagrajevanja, prisilna. **Osebnostna moč**: ekspertna, referenčna.
- **Avtokratski** vodja: centralizira, uporablja pozicijsko moč. **Demokratični**: delegira, uporablja ekspertno in referenčno moč.
### Lastnosti in stili
- **Čustvena inteligentnost**: samozavedanje, samoregulacija, motivacija, empatija, socialne sposobnosti.
- **Transakcijski** vodja: pojasni vloge, skrbi za nagrade, plane in urnike. **Karizmatični**: navdihuje ("ogenj"). **Transformacijski**: spodbuja inovacije in spremembe.
- 4 načela transformacijskega vodje: jasna vizija, mobilizira zavezanost, opolnomoči zaposlene, institucionalizira kulturo sprememb.
- **Brocksmith** (KPMG): 9 atributov vodje prihodnosti (vrednote, vizija, vedenjski vzorec, komunikacija, strateško mišljenje, odločnost, znanje, ljudje, osebnost).
- **Drucker**: vodja je nekdo, ki ga posnemajo; učinkovit vodja je tisti, čigar posnemovalci delajo prave stvari; vodje so zgled; vodenje je odgovornost, ne privilegij.
- **Goleman - 6 stilov**: ukazovalni, avtoritativni, očetovski, demokratični, narekovalni, mentorski.
- **Uslužno vodenje**: vodja služi potrebam podrejenih in poslanstvu organizacije.
### Modeli
- **Senge - 5 disciplin učeče se organizacije**: sistemsko mišljenje, osebno mojstrstvo, mentalni modeli, skupna vizija, timsko učenje. 3 vrste vodij: notranji vodja, izvršilni vodja, notranji graditelj mrež (najmanj cenjen, brez avtoritete položaja).
- **Branden - 7 R**: Respect, Responsibility, Risk taking, Rewards and recognition, Relationship, Rolemodelling, Renewal.
- **Bridges**: vodenje organizacije brez delovnih mest - naravnano v motiviranje.
- **Avtentično vodenje**: vodenje v skladu z lastno osebnostjo, prepričanji in vrednotami; samozavedanje (vrednote, čustva, identiteta, motivi) in samoregulacija. Enzo Smrekar (manager leta 2020): "avtentičnost in vlaganje v ljudi".

## Motivacija
- **Motivacija** = notranje in zunanje sile, ki spodbudijo navdušenje, namen in vztrajnost. Notranje nagrade (zadovoljstvo ob delu) in zunanje (od drugih - plača, napredovanje).
- Ovire zunaj človeka → **frustracija**; ovire znotraj → **konflikt**.
- **Vsebinske teorije** (KAJ motivira): Maslow, Herzberg, McClelland. **Procesne** (KAKO): postavljanje ciljev, Adams, Vroom, Skinner.
- **Maslow**: fiziološke → varnost → pripadnost → samospoštovanje → samouresničitev.
- **Herzberg**: **higieniki** (plača, pogoji, odnosi) odstranijo nezadovoljstvo, a ne motivirajo; **motivatorji** (dosežki, priznanje, odgovornost, rast) motivirajo.
- **McClelland**: potreba po dosežkih, po vključenosti (pripadnosti), po moči.
- **Postavljanje ciljev**: jasni, težji, sprejeti cilji + povratne informacije.
- **Adams (enakost)**: primerjava razmerja vložki/izidi z drugimi. Neenakost odpravimo s spremembo vložkov, izidov, percepcije ali odhodom.
- **Vroom (pričakovanja)**: trud → dosežek (E→P), dosežek → izid (P→O), **valenca** = vrednost izida za posameznika.
- **Skinner (okrepitev)**: pozitivna okrepitev (dodamo prijetno), **negativna okrepitev** (odstranimo neprijetno - vedenje se okrepi), kazen (zmanjša vedenje), ugašanje (brez okrepitve vedenje izgine).
- **Oblikovanje dela**: poenostavitev, rotacija, povečanje (več podobnih nalog), **obogatitev** (motivatorji: odgovornost, priznanje, rast).
- **Hackman in Oldham**: 5 jedrnih dimenzij - raznovrstnost spretnosti, identiteta nalog, pomen nalog, avtonomnost, povratne informacije.
- **Opolnomočenje** zahteva prenos 4 elementov: informacij, znanja, moči, nagrad.
- Novi programi plačevanja: plačilo glede na rezultate, delitev dobička, solastništvo delnic, bonusi, plačilo za znanje, fleksibilen delovni čas, kompenzacija na osnovi tima.

## Kontroliranje
- **Organizacijska kontrola** = sistematični proces urejanja aktivnosti, da dosežemo plane, cilje in standarde. Sodobni trend: več zaupanja in samokontrole zaposlenih.
- Kontrolne točke: **preliminarna** (pred), **sprotna** (med), **povratna** (po).
- Po dinamiki: **stalna** (kultura, pravila, samokontrola), **periodična** (sestanki, poročila, revizije), **občasna** (po načelu izjem).
- Strukturirana kontrola: **birokratski** (pravila, standardi), **tržni** (primerjava s konkurenco in cenami), **vedenjski** (skupne vrednote, tradicija) pristop.
- **Model povratne kontrole (4 koraki)**: standardi → merjenje dejanske uspešnosti → primerjava s standardi → popravki.
- **Deming - PDCA**: plan, do, check, act (stalno izboljševanje).
- Nagrade za kakovost: **Demingova** (Japonska), **Malcolm Baldrige** (ZDA), **EFQM/EQA** (Evropa); Slovenija: Priznanje RS za poslovno odličnost po modelu EFQM in logiki **RADAR**.
- **BSC (Kaplan in Norton, 1992)**: finančni vidik, vidik odjemalcev (trženjski), interni poslovni procesi, učenje in rast.
- **Management odprtih knjig** (Jack Stack): vsi zaposleni dobijo informacije o poslovanju celotne organizacije.
- Samokontrola: **multitasking** porabi do 25 % več časa, zniža kakovost in povzroča stres. **Odlašanje** premagamo z vizualizacijo, javno zaobljubo, soočenjem z dejstvi, prvim najmanjšim korakom in nadzorom notranjega dialoga.
`;

const uvod = [
  withId('q113prwz', { q: "Kaj o pojmu management drži?",
      options: ["Po Dimovskem in sod. (2014) je management tudi interakcija med sodelavci in deležniki.","Management obsega le planiranje in kontroliranje, vodenje je ločena disciplina.","Švedski izraz narings liv pomeni \"delitev kruha\".","Angleška beseda company izhaja iz grške besede za vojskovodjo."],
      correct: 0,
      explanation: "Management obsega planiranje, organiziranje, vodenje in kontroliranje. Narings liv = preskrba za življenje; company izhaja iz lat. com panis (delitev kruha), stratēgos (vojskovodja) pa je izvor besede strategija." }),
  withId('qw0nz48', Q('Kdo opredeli management kot doseganje ciljev skozi planiranje, organiziranje, vodenje in kontroliranje?', ['Daft', 'Maslow', 'Porter', 'Skinner'], 0,
    'Daft: ustvarjalno, uspešno in učinkovito doseganje ciljev skozi 4 procese.')),
  withId('qz9my52', Q('Iz katere besede izhaja angleška beseda "company"?', ['Lat. com panis - delitev kruha', 'Grš. stratēgos - vojskovodja', 'Lat. movere - gibati se', 'Šved. narings liv - preskrba'], 0,
    'Isti koren kot companion. Stratēgos je izvor besede strategija, movere besede motiv.')),
  withId('q1gw0xm3', Q('Uspešnost (effectiveness) po Druckerju pomeni:', ['Delati prave stvari', 'Delati stvari pravilno', 'Delati s čim manj stroški', 'Delati hitreje od konkurence'], 0,
    'Učinkovitost = delati stvari pravilno (gospodarna raba virov).')),
  withId('q4v58jk', Q('Katera NI ena od 5 dimenzij sodobnega okolja managementa s predavanj?', ['Digitalizacija', 'Ekologija', 'Individualnost', 'Centralizacija'], 3,
    'Pet dimenzij: digitalizacija, ekologija, varnost, zdravje, individualnost (GDPR).')),
  withId('q1dz1j8y', Q('Koliko managerskih vlog opiše Mintzberg in kam sodi vloga "zveza"?', ['10 vlog; zveza je medosebna vloga', '10 vlog; zveza je informacijska vloga', '4 vloge; zveza je odločitvena vloga', '3 vloge; zveza je samostojna kategorija'], 0,
    'Mintzberg: 10 vlog v treh kategorijah - medosebne (predstavnik, vodja, zveza), informacijske in odločitvene.')),
  withId('q1l7mizr', Q('V katere tri kategorije Mintzberg razvrsti managerske vloge?', ['Informacijske, medosebne, odločitvene', 'Tehnične, konceptualne, človeške', 'Strateške, taktične, operativne', 'Planske, kontrolne, vodstvene'], 0,
    'Tehnične, konceptualne in človeške so področja managerskih SPRETNOSTI.')),
  withId('q1eq5fw5', Q('Konceptualna spretnost managerja pomeni:', ['Videti organizacijo kot celoto in misliti dolgoročno', 'Obvladati specifične strokovne naloge', 'Motivirati in voditi sodelavce', 'Hitro prepoznati probleme'], 0,
    'Tehnična = specifične naloge; človeški viri = delo z ljudmi; diagnostična (Dubrin) = prepoznavanje problemov.')),
  withId('q1ds2z7q', Q('Katera raven managementa uresničuje strategije vrhnjega managementa in razrešuje konflikte?', ['Srednji management', 'Vrhnji management', 'Nižji management', 'Projektni management'], 0,
    'Vrhnji postavlja cilje in vizijo; nižji skrbi za dnevne cilje in proizvode.')),
  withId('q1l1br3h', Q('Manager, odgovoren za več oddelkov z različnimi funkcijami, je:', ['Generalni manager', 'Funkcijski manager', 'Projektni manager', 'Nižji manager'], 0,
    'Funkcijski je odgovoren za oddelek z eno funkcijo; projektni za začasne projekte.')),
  withId('q1x7yx5', { q: "Podjetje se vsak dan pogaja z dobavitelji, streže kupcem in spremlja tekmece. Kateri ravni okolja pripadajo te skupine?",
      options: ["Delovnemu (bližnjemu) zunanjemu okolju","Splošnemu zunanjemu okolju","Notranjemu okolju, ki ga oblikuje organizacijska kultura","Demografskemu delu splošnega okolja"],
      correct: 0,
      explanation: "Zunanje okolje ima splošno raven (družbeni, demografski, ekonomski, tehnološki dejavniki, ki vplivajo na vse) in delovno raven (konkurenti, dobavitelji, kupci - vsakodnevne transakcije). Notranje okolje je predvsem organizacijska kultura." }),
  withId('q8oouh7', Q('Kako imenujemo razliko med želenimi in dejanskimi kulturnimi normami v podjetju?', ['Kulturni razkorak', 'Simbolično vodenje', 'Organizacijska klima', 'Kulturni šok'], 0,
    'Simbolično vodenje = vodja s simboli vpliva na kulturo.')),
  withId('q1fwurh3', Q('Katera NI ena od 10 lastnosti managerjev po Daftu in Marcicu?', ['Agilnost', 'Iniciativnost', 'Management časa', 'Avtokratičnost'], 3,
    'Še: samozaupanje, nadzor čustev, fokus, objektivnost, graditev odnosov, osredotočenost na cilje, sposobnost organiziranja.')),
  withId('qpmngrf', Q('Kaj po Daftu in Marcicu pomeni "iniciativnost"?', ['Začeti aktivnosti brez prestavljanja in prelaganja', 'Hitro se prilagajati novim okoliščinam', 'Nevtralno gledati na stvari', 'Reči "ne" stvarem, ki ovirajo cilje'], 0,
    'Agilnost = prilagajanje; objektivnost = nevtralen pogled; fokus = reči "ne".')),
  withId('q1q5yglz', Q('Kateri NI eno od Oaklandovih 10 načel organizacijske odličnosti?', ['Filozofija "nič napak"', 'Primerjanje z najboljšimi', 'Odstranitev ovir in timsko delo', 'Strogo centralizirano odločanje'], 3,
    'Še: dolgoročna zavezanost izboljševanju, odnos kupec-dobavitelj, obvladovanje stroškov, stalno izobraževanje, sistematični pristop.')),
];

const plan = [
  withId('q1rzwufi', Q('Katera funkcija managementa je najbolj povezana z vrhnjim (strateškim) managementom?', ['Planiranje', 'Organiziranje', 'Vodenje', 'Kontroliranje'], 0,
    'Določa, kam podjetje gre in kako tja pride - a planirajo vse ravni.')),
  withId('qoonrn3', { q: "Podjetje odpre službo za varstvo osebnih podatkov, digitalizira naročanje in začne meriti ogljični odtis. Na katere dimenzije sodobnega okolja managementa se s tem odziva?",
      options: ["Individualnost, digitalizacijo in ekologijo","Tehnološke, demografske in politične dejavnike splošnega okolja","Kupce, dobavitelje in konkurente delovnega okolja","Planiranje, organiziranje in kontroliranje"],
      correct: 0,
      explanation: "Pet dimenzij sodobnega okolja managementa: digitalizacija, ekologija, varnost, zdravje in individualnost (npr. GDPR in varstvo osebnih podatkov). Druge možnosti naštevajo ravni okolja oziroma funkcije managementa." }),
  withId('qx9gvel', Q('Kaj je PLAN?', ['Načrt, kako doseči cilj, z razporeditvijo virov, urnikom in nalogami', 'Želeno stanje v prihodnosti', 'Razlog, zaradi katerega organizacija obstaja', 'Opis organizacije v prihodnosti'], 0,
    'Cilj = želeno stanje; poslanstvo = razlog obstoja; vizija = slika prihodnosti.')),
  withId('q19g1psa', Q('"Naša osnovna naloga je omogočati ljudem zdravo in kakovostno življenje." (Krka) To je:', ['Poslanstvo', 'Vizija', 'Strateški cilj', 'Operativni cilj'], 0,
    'Krkina vizija: utrjevanje položaja enega vodilnih generičnih farmacevtskih podjetij.')),
  withId('q171yh46', Q('Katera raven managementa praviloma postavlja kratkoročne (operativne) cilje?', ['Nižji management', 'Srednji management', 'Vrhnji management', 'Nadzorni svet'], 0,
    'Strateški (dolgoročni) cilji - vrhnji management; taktični (srednjeročni) - srednji; operativni (kratkoročni) - nižji management.')),
  withId('q1ddsjdm', Q('Kateri par ravni planiranja in vrste ciljev je pravilen?', ['Strateško planiranje - strateški (korporativni) cilji', 'Kratkoročno planiranje - korporativni cilji', 'Srednjeročno planiranje - operativni cilji', 'Strateško planiranje - operativni cilji'], 0,
    'Strateško (dolgoročno) planiranje - strateški cilji; srednjeročno (taktično) - taktični; kratkoročno - operativni cilji.')),
  withId('q1ukmiy5', Q('Razvrstitev ciljev na prodajne, proizvodne, nabavne in kadrovske je razvrstitev po:', ['Vsebini', 'Času', 'Pomenu', 'Organizacijski ravni'], 0,
    'Po pomenu: strateški, taktični, operativni. Po času: trajni ... operativni.')),
  withId('q1cmu3hx', Q('Katera NI značilnost sodobne paradigme planiranja?', ['Centralni oddelek za planiranje sprejema odločitve', 'Prožni in ambiciozni cilji', 'Stalne izboljšave kot način življenja', 'Okolje, ki spodbuja učenje'], 0,
    'Plansko osebje je analitična podpora, ne odločevalci; planiranje je decentralizirano.')),
  withId('qc7f3ya', Q('Po čem se strategija loči od poslovne učinkovitosti?', ['Strategija je posebna kombinacija aktivnosti, drugačna od konkurence', 'Strategija pomeni le dvig produktivnosti', 'Poslovna učinkovitost da trajno prednost', 'Ni razlike'], 0,
    'Poslovna učinkovitost je nujna, a ne zadostna - konkurenti jo hitro posnemajo.')),
  withId('qzpbt6c', Q('Katere so ravni strategij?', ['Korporacijska, poslovna, funkcijska', 'Strateška, taktična, operativna', 'Globalna, regionalna, lokalna', 'Tekmovalna, kooperativna, hibridna'], 0,
    'Funkcijska = na ravni posamezne poslovne funkcije, npr. trženja.')),
  withId('q9au3no', { q: "Podjetje je opravilo analizo SWOT in izbralo strategijo diferenciacije. Katera faza procesa strateškega managementa po Hungerju in Wheelnu sledi?",
      options: ["Uresničevanje strategije s programi, predračuni in postopki","Ovrednotenje in kontrola doseženih rezultatov glede na cilje","Ponovna analiza panoge s Porterjevimi petimi silami","Izbira ene od Porterjevih generičnih strategij za podjetje"],
      correct: 0,
      explanation: "Proces ima štiri faze: analiza okolja (SWOT) → oblikovanje strategije → uresničevanje (programi, predračuni, postopki) → ovrednotenje in kontrola. Uresničevanje velja za najtežjo fazo." }),
  withId('q1req4jn', Q('Prva faza procesa strateškega managementa po Hungerju in Wheelnu je:', ['Analiza okolja', 'Oblikovanje strategije', 'Uresničevanje strategije', 'Ovrednotenje in kontrola'], 0,
    'Analiza (SWOT) → oblikovanje → uresničevanje (programi, predračuni, postopki) → ovrednotenje.')),
  withId('q1trumn5', Q('Kateri del SWOT analize sodi v ZUNANJE okolje?', ['Priložnosti in nevarnosti', 'Prednosti in slabosti', 'Prednosti in priložnosti', 'Slabosti in nevarnosti'], 0,
    'Npr. nevarnost: višje obrestne mere; slabost (notranje): visoka zadolženost.')),
  withId('qq9l6ij', Q('Katera NI ena od Porterjevih 5 konkurenčnih sil?', ['Pogajalska moč zaposlenih', 'Nevarnost substitutov', 'Pogajalska moč dobaviteljev', 'Nevarnost vstopa novih konkurentov'], 0,
    'Še: pogajalska moč kupcev in rivalstvo obstoječih konkurentov.')),
  withId('qrz3891', Q('Porterjev položaj "ne tič ne miš" pomeni, da podjetje:', ['Ne izbere jasne generične strategije in dosega nižje dobičke', 'Kombinira obe strategiji in je najuspešnejše', 'Se osredotoči na eno nišo', 'Izstopi iz panoge'], 0,
    'Generične strategije: diferenciacija, stroškovno vodenje, osredinjenje.')),
  withId('qd0lz49', Q('Hofer in Lidl nižajo stroške in hkrati dodajajo kakovostne lastne znamke. Strategija?', ['Hibridna generična strategija', 'Čista diferenciacija', 'Položaj "ne tič ne miš"', 'Strategija branilca'], 0,
    'Hibridna strategija združuje stroškovno vodenje in diferenciacijo.')),
  withId('q1fs4ure', Q('Po Milesu in Snowu podjetje, ki zgolj ad hoc odgovarja na spremembe v okolju, je:', ['Reaktor', 'Iskalec', 'Branilec', 'Proučevalec'], 0,
    'Reaktor ne predstavlja prave strategije. Iskalec: inovativnost; branilec: stabilnost in niša; proučevalec: manj tveganja, več profita.')),
  withId('q195bv7x', Q('Katera NI eno od 4 orodij za uresničevanje strategije?', ['SWOT analiza', 'Vodenje', 'Organizacijska struktura', 'Informacijski in kontrolni sistem'], 0,
    'Četrto orodje so človeški viri (zaposleni). SWOT je del analize, ne uresničevanja.')),
  withId('qwk28eu', Q('Kaj je glavna slabost planiranja s cilji (MBO)?', ['Zahteva stabilno okolje', 'Ne opredeli ciljev', 'Ne nagrajuje dosežkov', 'Velja samo za vrhnji management'], 0,
    '4 koraki MBO: postavljanje ciljev → akcijski plani → spremljanje napredka → ocena in nagrade.')),
  withId('q8ht50v', Q('Plani, ki opredelijo odziv na upad prodaje ali odhod ključnih ljudi, so:', ['Kontingenčni plani', 'Stalni plani', 'Taktični plani', 'Strateški plani'], 0,
    'Stalni plani usmerjajo redno ponavljajoče se naloge.')),
  withId('q1d8cfyt', Q('Koliko scenarijev za posamezno vrsto dejavnikov običajno razvijejo managerji?', ['2 do 5', '1', '10 do 15', 'Vsaj 20'], 0,
    'Od najbolj optimističnega do najbolj pesimističnega.')),
  withId('q13gs100', Q('Na katere razloge za nastanek krize organizacija lahko vpliva?', ['Subjektivne (slabo vodstvo, šibko trženje)', 'Objektivne (recesija, naravne nesreče)', 'Na vse enako', 'Na nobene'], 0,
    'Zato naj energijo usmeri v subjektivne dejavnike.')),
];

const org = [
  withId('q1k8t9wr', Q('Kaj je organizacijska struktura?', ['Okvir, kako se razdelijo naloge in viri ter koordinirajo oddelki', 'Seznam vseh zaposlenih', 'Vizija in poslanstvo podjetja', 'Letni plan prodaje'], 0,
    'Strategija pove KAJ bomo delali, organizacija KAKO.')),
  withId('qcw2wpk', Q('Formalizacija v organizaciji pomeni:', ['Obstoj pisnih pravil - več pravil, višja formalizacija', 'Število hierarhičnih ravni', 'Geografsko razpršenost enot', 'Prenos odločanja navzdol'], 0,
    'Število ravni = vertikalna diferenciacija; razpršenost = prostorska.')),
  withId('q4i0zya', Q('Vertikalna diferenciacija (kompleksnost) se nanaša na:', ['Število hierarhičnih ravni', 'Stopnjo specializacije', 'Število lokacij', 'Število pravil'], 0,
    'Horizontalna = specializacija; prostorska = lokacije.')),
  withId('qk5qo81', Q('Kdaj je po predavanjih primerna centralizacija?', ['V kriznih časih in pri strategiji zniževanja stroškov', 'Ko je okolje zelo negotovo', 'Ko se želimo hitro odzvati na stranke', 'V učeči se organizaciji'], 0,
    'Večja negotovost okolja in hitro odzivanje strankam → decentralizacija.')),
  withId('qrfsmxf', Q('Kateri primer ima po predavanjih ŠIROK kontrolni razpon?', ['Odvetniška pisarna ali start-up', 'Banka', 'Ministrstvo', 'Javna uprava'], 0,
    'Širok razpon = sploščena struktura (≥ 30 podrejenih); ozek (≤ 7) = visoka struktura.')),
  withId('q1y8x392', Q('Katera NI značilnost avtoritete?', ['Odvisna je od značaja posameznika', 'Je del položaja', 'Sprejeta je s strani sodelavcev', 'Širi se z vrha navzdol'], 0,
    'Kdor koli na istem položaju bi imel enako avtoriteto.')),
  withId('q1co5say', Q('Kdo nosi ključno odgovornost za nalogo po delegiranju?', ['Tisti, ki je nalogo delegiral', 'Samo zaposleni, ki je nalogo prejel', 'Vrhnji management', 'Nihče'], 0,
    'Dobro delegiranje = prenos celotne naloge, ne le majhnega dela.')),
  withId('qvdr5li', Q('Opolnomočenje zaposlenih je:', ['Nudenje znanja, informacij in veščin za avtonomne odločitve', 'Povečanje števila pravil', 'Centralizacija odločanja', 'Ukinitev nagrajevanja'], 0,
    'Zaposleni sami odločajo in za odločitve odgovarjajo.')),
  withId('q1sldfzp', Q('Za katero organizacijo je funkcijska struktura najbolj primerna?', ['Za organizacijo z enim ali malo proizvodi oziroma storitvami', 'Za veliko organizacijo z mnogo različnimi proizvodi', 'Za organizacijo, ki želi veliko inovacij in dobro komunikacijo med oddelki', 'Za organizacijo, ki mora hitro dosegati cilje posameznih divizij'], 0,
    'Prednosti funkcijske: ekonomija obsega, poglobljeno strokovno znanje. Slabosti: slaba komunikacija med funkcijami, počasen odziv, malo inovacij.')),
  withId('q116bmjp', Q('Kateri primer s predavanj ponazarja divizijsko strukturo?', ['McDonald\'s', 'Slovenske železnice', 'Odvetniška pisarna', 'Gradbeno projektno podjetje'], 0,
    'Slovenske železnice = funkcijska; projektna (gradbena) podjetja = matrična.')),
  withId('q1rlfsnp', Q('Katera je slabost divizijske strukture?', ['Podvajanje virov in višji stroški', 'Centralizirane, počasne odločitve', 'Dvojno vodenje', 'Slaba odzivnost na trg'], 0,
    'Prednosti: decentralizacija, fleksibilnost, skrb za trg. Najustreznejša za velike organizacije z več proizvodi.')),
  withId('q1ktzm5n', Q('Dvojno vodenje (vertikalni in horizontalni šef) je značilno za:', ['Matrično strukturo', 'Funkcijsko strukturo', 'Divizijsko strukturo', 'Mrežno strukturo'], 0,
    'Najustreznejša za srednje velike organizacije z več izdelki; slabost: konflikti in veliko sestankov.')),
  withId('qyw4zhk', { q: "Podjetje oddelke zamenja s stalnimi medfunkcijskimi timi. Katera težava se pri taki strukturi najpogosteje pojavi?",
      options: ["Dvojna lojalnost članov in veliko časa za usklajevanje","Počasen odziv in slaba komunikacija med funkcijami","Podvajanje virov in višji stroški med divizijami","Otežena kontrola zunanjih izvajalcev in šibka lojalnost"],
      correct: 0,
      explanation: "Timska struktura: manj administracije, hiter odziv, manj meja med oddelki, a dvojna lojalnost in veliko časa za koordinacijo. Počasen odziv je slabost funkcijske, podvajanje virov divizijske, otežena kontrola mrežne strukture." }),
  withId('q1rwy34a', Q('Strukturna možnost, pri kateri podjetje ključne aktivnosti izvaja samo, ostalo pa da zunanjim specialistom, je:', ['Mrežna struktura (outsourcing)', 'Funkcijska struktura', 'Matrična struktura', 'Divizijska struktura'], 0,
    'Slabosti mrežne: otežena kontrola virov, šibkejša lojalnost.')),
  withId('qxj08a9', Q('Radikalno preoblikovanje poslovnih procesov za večjo kakovost, nižje stroške in hitrost je:', ['Reinženiring', 'Delegiranje', 'Formalizacija', 'Benchmarking'], 0,
    'Načeloma vodi v močnejšo horizontalno koordinacijo.')),
  withId('q1fiqwmr', Q('Katere tri elemente potrebuje učinkovit sestanek?', ['Jasno agendo, vodjo sestanka, management konfliktov', 'Kavo, projektor, zapisnik', 'Vsaj 20 udeležencev, 2 uri, glasovanje', 'Direktorja, pravnika, zapisnikarja'], 0,
    'Vodja skrbi za vsebinsko in časovno komponento.')),
  withId('qwiyciv', Q('Pravilo 8-18-1800 pravi, da je skupina do 18 ljudi idealna za:', ['Viharjenje možganov (brainstorming)', 'Sprejemanje odločitev', 'Povezovanje in druženje', 'Disciplinske postopke'], 0,
    'Do 8 ljudi: odločanje; 1800+: povezovanje in komuniciranje.')),
  withId('qyrooom', Q('Katera NI ena od 4 vrst sestankov po Englishu?', ['Stoječi sestanek', 'Sestanek zaposlenih (kolegij)', 'Sestanek reševanja problemov', 'Ustvarjalni sestanek'], 0,
    'Četrta vrsta je kombinirani sestanek. Stoječi sestanek (~15 min) je sodoben trend.')),
  withId('qwriqqk', Q('Kaj je premortem po Kleinu?', ['Udeleženci si predstavljajo, da je načrt propadel, in opišejo zakaj', 'Analiza po zaključku projekta', 'Glasovanje o odločitvi', 'Sestanek s strankami'], 0,
    'Odpravi skupinsko razmišljanje in zatiranje dvomov.')),
  withId('ql6xe04', Q('Koliko časa po raziskavi Porterja in Nohrie direktorji preživijo na sestankih?', ['72 %', '25 %', '42 %', '90 %'], 0,
    '42 % sestankov je ena na ena; 51 % sestankov direktorji sklicejo sami.')),
  withId('q1nis8gz', Q('Katera NI naloga organizatorja dela?', ['Revizija računovodskih izkazov', 'Rekrutiranje sodelavcev', 'Razreševanje konfliktov', 'Usposabljanje novih sodelavcev'], 0,
    'Še: svetovanje pri ciljih in strategijah, ohranjanje motivacije, organiziranje nalog.')),
];

const vod = [
  withId('q1osmb7b', { q: "Kaj po širšem pojmovanju sodi v funkcijo vodenja?",
      options: ["Usmerjanje ljudi, komuniciranje, motiviranje in kadrovanje","Planiranje, organiziranje in kontroliranje virov in procesov","Samo dajanje navodil in nadzor nad njihovim izvajanjem","Postavljanje strategije in vizije ter analiza okolja SWOT"],
      correct: 0,
      explanation: "Vodenje je sposobnost vplivanja na druge, da sodelujejo pri doseganju skupnih ciljev. V širšem smislu poleg vodenja v ožjem smislu (usmerjanja ljudi) obsega še komuniciranje, motiviranje in kadrovanje. Planiranje, organiziranje in kontroliranje so druge tri funkcije managementa." }),
  withId('q15aa98h', Q('Kako Luthans opredeli vodenje?', ['Motiviranje zaposlenih, da prostovoljno prevzemajo akcije k skupnim ciljem', 'Ukazovanje na podlagi položaja', 'Nadzor nad stroški', 'Sistematično urejanje aktivnosti'], 0,
    'Zadnja možnost je opredelitev organizacijske kontrole.')),
  withId('q16qmrmj', Q('Katera moč je OSEBNOSTNA (in ne pozicijska)?', ['Referenčna', 'Legitimna', 'Prisilna', 'Moč nagrajevanja'], 0,
    'Osebnostna: ekspertna in referenčna. Pozicijska: legitimna, nagrajevanja, prisilna.')),
  withId('q1smsbd9', Q('Moč, ki izhaja iz posebnih znanj vodje, je:', ['Ekspertna moč', 'Referenčna moč', 'Legitimna moč', 'Prisilna moč'], 0,
    'Referenčna izhaja iz osebnih značilnosti, s katerimi se podrejeni poistovetijo.')),
  withId('q1meeqb6', Q('Na katero moč se zanaša avtokratski vodja?', ['Legitimno, prisilno in moč nagrajevanja', 'Ekspertno in referenčno', 'Samo referenčno', 'Na nobeno'], 0,
    'Demokratični vodja delegira in se zanaša na ekspertno in referenčno moč.')),
  withId('qiobcjd', Q('Katera NI sestavina čustvene inteligentnosti?', ['Inteligenčni kvocient', 'Samozavedanje', 'Samoregulacija', 'Empatija'], 0,
    'Pet sestavin: samozavedanje, samoregulacija, motivacija, empatija, socialne sposobnosti.')),
  withId('q1si1opb', Q('Vodja pojasni vloge, skrbi za nagrade, poudarja plane, urnike in predračune. Kateri tip?', ['Transakcijski', 'Transformacijski', 'Karizmatični', 'Uslužni'], 0,
    'Transakcijski = tradicionalna managerska funkcija vodenja.')),
  withId('q16nyh1v', Q('Po čem se transformacijski vodja loči od karizmatičnega?', ['Po sposobnosti spodbujanja inovacij in sprememb', 'Po uporabi prisilne moči', 'Po poudarku na urnikih', 'Po tem, da ne potrebuje vizije'], 0,
    'Karizma = "ogenj", ki podžiga pripadnost; transformacijski poleg tega spreminja organizacijo.')),
  withId('q9kq3ym', Q('Katero NI eno od 4 načel transformacijskega vodje?', ['Centralizira vse odločitve', 'Jasno definira vizijo', 'Mobilizira zavezanost', 'Institucionalizira kulturo sprememb'], 0,
    'Četrto načelo: opolnomoči zaposlene.')),
  withId('qeythl2', Q('Kateri model vodje prihodnosti temelji na 9 atributih (vrednote, vizija, komunikacija, znanje ...)?', ['Brocksmithov', 'Brandenov', 'Sengeov', 'Bridgesov'], 0,
    'Razvit v sodelovanju s KPMG.')),
  withId('q11rngfq', Q('Po Druckerju je vodenje:', ['Odgovornost, ne privilegij', 'Privilegij položaja', 'Zgolj ukazovanje', 'Stvar karizme'], 0,
    'Še: vodja je nekdo, ki ga posnemajo; vodje so vedno zgled.')),
  withId('q16j7yxp', Q('Katera NI ena od Sengeovih 5 disciplin?', ['Strateško planiranje', 'Sistemsko mišljenje', 'Mentalni modeli', 'Timsko učenje'], 0,
    'Še: osebno mojstrstvo in skupna vizija.')),
  withId('q1aie199', Q('Kateri Sengeov tip vodje je najmanj cenjen in nima avtoritete položaja?', ['Notranji graditelj mrež', 'Notranji vodja', 'Izvršilni vodja', 'Transakcijski vodja'], 0,
    'Pomaga koordinirati ljudi in širiti ideje; težko ga je identificirati.')),
  withId('q86tmy7', Q('Kaj pomeni "Rewards and recognition" v Brandenovem modelu 7 R?', ['Nagrade in priznanja - najučinkovitejši način motiviranja', 'Dodeljevanje odgovornosti', 'Kultura stalnega učenja', 'Zgled vrhnjega managementa'], 0,
    '7 R: respect, responsibility, risk taking, rewards and recognition, relationship, rolemodelling, renewal.')),
  withId('qdxdi94', Q('Avtentično vodenje pomeni:', ['Vodenje v skladu z lastno osebnostjo, prepričanji in vrednotami', 'Posnemanje uspešnih vodij', 'Vodenje izključno s pozicijsko močjo', 'Slepo služenje skupini'], 0,
    'Gradi se s samozavedanjem in samoregulacijo. Enzo Smrekar: avtentičnost in vlaganje v ljudi.')),
  withId('qmr0jl4', Q('Kateri NI eden od Golemanovih 6 stilov vodenja?', ['Birokratski', 'Ukazovalni', 'Mentorski', 'Očetovski'], 0,
    'Šest stilov: ukazovalni, avtoritativni, očetovski, demokratični, narekovalni, mentorski.')),
  withId('q123zoo', Q('Uslužni vodja deluje predvsem za:', ['Potrebe podrejenih in poslanstvo organizacije', 'Lastno napredovanje', 'Zmanjševanje stroškov', 'Strog nadzor zaposlenih'], 0,
    'Deli moč, spodbuja participacijo in ustvarjalnost.')),
];

const mot = [
  withId('q144xzz7', Q('Ovira za zadovoljitev motiva, ki je ZUNAJ človeka, povzroči:', ['Frustracijo', 'Konflikt', 'Valenco', 'Okrepitev'], 0,
    'Ovira znotraj človeka = konflikt.')),
  withId('q18wfrxd', Q('Katera teorija je PROCESNA?', ['Vroomova teorija pričakovanj', 'Maslowova hierarhija potreb', 'Herzbergova dvofaktorska teorija', 'McClellandova teorija pridobljenih potreb'], 0,
    'Vsebinske (KAJ motivira): Maslow, Herzberg, McClelland. Procesne (KAKO): cilji, Adams, Vroom, Skinner.')),
  withId('qkpt5lo', Q('Katera je najvišja raven Maslowove piramide?', ['Samouresničitev', 'Samospoštovanje', 'Pripadnost', 'Varnost'], 0,
    'Fiziološke → varnost → pripadnost → samospoštovanje → samouresničitev.')),
  withId('q1qsnjhr', Q('Želja po zagotovljenem delovnem mestu in varnem delu sodi po Maslowu med potrebe po:', ['Varnosti', 'Pripadnosti', 'Samospoštovanju', 'Samouresničitvi'], 0,
    'Pripadnost = dobri odnosi s sodelavci; samospoštovanje = priznanje prispevkov.')),
  withId('qh2lwod', Q('Kaj po Herzbergu velja za higienike (plača, delovni pogoji, odnosi)?', ['Če so dobri, le odstranijo nezadovoljstvo, ne motivirajo', 'So glavni vir motivacije', 'Vplivajo samo na vrhnje managerje', 'Niso pomembni'], 0,
    'Motivatorji (dosežki, priznanje, odgovornost, rast) povzročijo zadovoljstvo.')),
  withId('qpip4u2', Q('Kateri dejavnik je po Herzbergu MOTIVATOR?', ['Priznanje za dosežke', 'Plača', 'Delovni pogoji', 'Odnosi z nadrejenimi'], 0,
    'Plača, pogoji in odnosi so higieniki.')),
  withId('q11qgri6', Q('Katere potrebe navaja McClelland?', ['Po dosežkih, vključenosti in moči', 'Fiziološke, varnost, pripadnost', 'Higienike in motivatorje', 'Pričakovanje, instrumentalnost, valenca'], 0,
    'Teorija pridobljenih potreb.')),
  withId('qnaeor7', Q('Adamsova teorija enakosti temelji na:', ['Primerjavi razmerja vložki/izidi z drugimi', 'Hierarhiji potreb', 'Pričakovanju nagrade', 'Okrepitvi vedenja'], 0,
    'Neenakost odpravimo s spremembo vložkov, izidov, percepcije ali z odhodom.')),
  withId('q1rx3uhr', Q('Kaj je VALENCA v Vroomovi teoriji?', ['Vrednost oziroma privlačnost izida za posameznika', 'Verjetnost, da trud vodi do dosežka', 'Višina plače', 'Število nalog'], 0,
    'Pričakovanji: trud → dosežek (E→P) in dosežek → izid (P→O).')),
  withId('qzmg0k7', Q('Hrup s ceste nas moti, zapremo okno. Po Skinnerju gre za:', ['Negativno okrepitev', 'Pozitivno okrepitev', 'Kazen', 'Ugašanje'], 0,
    'Odstranitev neprijetnega dražljaja okrepi vedenje. Kazen vedenje zmanjšuje.')),
  withId('qhedgvo', Q('Kaj se zgodi z naučenim vedenjem, ko okrepitve ni več?', ['Sčasoma ugasne', 'Se okrepi', 'Ostane nespremenjeno', 'Se spremeni v kazen'], 0,
    'Hitreje ugaša, če je bilo naučeno z negativnimi okrepitvami.')),
  withId('qtfv597', Q('Vključevanje odgovornosti, priznanja in priložnosti za rast v delovno mesto je:', ['Obogatitev delovnega mesta', 'Povečanje delovnega mesta', 'Rotacija delovnih mest', 'Poenostavitev delovnega mesta'], 0,
    'Povečanje = več podobnih nalog; rotacija = premeščanje med mesti.')),
  withId('q1gszffw', Q('Katera NI ena od 5 jedrnih dimenzij dela po Hackmanu in Oldhamu?', ['Višina plače', 'Raznovrstnost spretnosti', 'Avtonomnost', 'Povratne informacije'], 0,
    'Še: identiteta nalog in pomen nalog.')),
  withId('q1hycghj', Q('Katere 4 elemente zahteva opolnomočenje?', ['Informacije, znanje, moč, nagrade', 'Plačo, bonus, delnice, avto', 'Pravila, nadzor, kazni, nagrade', 'Vizijo, poslanstvo, cilje, plane'], 0,
    'Prenos teh elementov na podrejene za svobodno izvajanje nalog.')),
  withId('q1wajol6', Q('Program, pri katerem plača narašča s številom pridobljenih spretnosti, je:', ['Plačilo za znanje', 'Delitev dobička', 'Kompenzacija na osnovi tima', 'Solastništvo delnic'], 0,
    'Delitev dobička: vsi v enoti so nagrajeni, če dosežejo plan.')),
];

const kont = [
  withId('q1eoqz3r', Q('Organizacijska kontrola je:', ['Sistematični proces urejanja aktivnosti, da dosežemo plane, cilje in standarde', 'Kaznovanje zaposlenih', 'Določanje vizije', 'Izbira organizacijske strukture'], 0,
    'Sodobni trend: več zaupanja in samokontrole zaposlenih.')),
  withId('q8mj5ot', Q('Kontrola, ki poteka MED procesom, je:', ['Sprotna', 'Preliminarna', 'Povratna', 'Strateška'], 0,
    'Preliminarna = pred procesom; povratna = po procesu.')),
  withId('q1g0t7e3', Q('Redni sestanki, poročila in revizijski pregledi so primer:', ['Periodične kontrole', 'Stalne kontrole', 'Občasne kontrole', 'Preliminarne kontrole'], 0,
    'Stalna: kultura, pravila, samokontrola; občasna: po načelu izjem (disciplinski postopki).')),
  withId('q157jhcv', Q('Pristop strukturirane kontrole, ki temelji na skupnih vrednotah in tradiciji, je:', ['Vedenjski', 'Birokratski', 'Tržni', 'Finančni'], 0,
    'Birokratski = pravila in standardi; tržni = primerjava s konkurenco in cenami.')),
  withId('q1l0c198', Q('Kateri je pravilni vrstni red korakov modela povratne kontrole?', ['Standardi → merjenje → primerjava → popravki', 'Merjenje → standardi → popravki → primerjava', 'Popravki → merjenje → standardi → primerjava', 'Primerjava → standardi → merjenje → popravki'], 0,
    'Npr. standard +5 % prodaje, dejansko +2 %, odstopanje → popravki.')),
  withId('qvmig7s', Q('Kaj pomeni Demingov cikel PDCA?', ['Plan, do, check, act', 'Plan, develop, control, assess', 'Prepare, decide, check, adjust', 'Profit, demand, cost, analysis'], 0,
    'Nenehno ponavljanje stalno izboljšuje proizvode in procese.')),
  withId('q8fgkox', Q('Na katerem modelu temelji slovensko Priznanje RS za poslovno odličnost?', ['EFQM (logika RADAR)', 'Malcolm Baldrige', 'Demingova nagrada', 'ISO 9001'], 0,
    'Demingova nagrada = Japonska; Malcolm Baldrige = ZDA.')),
  withId('q15v8onr', Q('Kdo in kdaj je razvil uravnoteženi sistem kazalnikov (BSC)?', ['Kaplan in Norton, 1992', 'Deming, 1950', 'Porter, 1985', 'Senge, 1990'], 0,
    'Odgovor na ozek, zgolj finančen pogled na uspešnost.')),
  withId('qb2cx9x', Q('Kateri NI eden od 4 vidikov BSC?', ['Vidik konkurentov', 'Finančna uspešnost', 'Interni poslovni procesi', 'Učenje in rast'], 0,
    'Četrti vidik je vidik odjemalcev (trženjski).')),
  withId('q1lf4m9q', Q('Management odprtih knjig (Jack Stack) pomeni:', ['Vsi zaposleni dobijo informacije o poslovanju celotne organizacije', 'Javna objava vseh plač', 'Izpit z učbenikom', 'Nadzor nad e-pošto'], 0,
    'Sodobno organizacijsko orodje za kontrolo.')),
  withId('qply03a', { q: "Katera trditev o kontroliranju v sodobnih organizacijah drži?",
      options: ["Model povratne kontrole se začne z merjenjem uspešnosti, standarde pa postavimo šele po meritvi.","Sodobni trend je več zaupanja v zaposlene in več njihove samokontrole.","Preliminarna kontrola poteka po končani aktivnosti, povratna pa pred njenim začetkom.","Uravnoteženi sistem kazalnikov (BSC) spremlja samo finančni vidik poslovanja."],
      correct: 1,
      explanation: "Organizacijska kontrola se premika k zaupanju in samokontroli. Model povratne kontrole: standardi → merjenje → primerjava → popravki. Preliminarna kontrola je pred, sprotna med in povratna po aktivnosti. BSC ima štiri vidike: finančnega, odjemalcev, notranjih procesov ter učenja in rasti." }),
  withId('qickaun', Q('Koliko več časa lahko po raziskavah HBR porabi multitasking?', ['Do 25 %', 'Do 5 %', 'Do 75 %', 'Nič - prihrani čas'], 0,
    'Poleg tega zniža kakovost in produktivnost ter povzroča stres.')),
  withId('q1qg6yqy', Q('Kateri NI nasvet za premagovanje odlašanja s predavanj?', ['Počakati na navdih', 'Vizualizacija zaključene naloge', 'Javna zaobljuba', 'Prvi, najmanjši korak'], 0,
    'Še: soočenje z dejstvi in nadzor notranjega dialoga. Možgani odlašajo pri novih, abstraktnih nalogah (present bias).')),
  withId('qddegyz', Q('Kaj po raziskavi HBR pogosto naredijo ljudje po negativni povratni informaciji sodelavcev?', ['Iščejo nove odnose, ki jih potrdijo ("shopping for confirmation")', 'Takoj izboljšajo delo', 'Prosijo za več kritike', 'Nič se ne spremeni'], 0,
    'Negativna povratna informacija je psihološka grožnja.')),
];

// dodatno vprašanje, ki ne sodi k posamezni funkciji
const delni = [
  withId('q47cpoe', { q: "Katera trditev o orodjih in raziskavah managementa drži?",
      options: ["Uravnoteženi sistem kazalnikov (BSC) sta razvila Deming in Juran kot nagrado za kakovost.","Cikel PDCA (plan, do, check, act) je orodje stalnega izboljševanja.","Po raziskavi Porterja in Nohrie direktorji na sestankih preživijo manj kot četrtino časa.","Nobena trditev ni pravilna."],
      correct: 1,
      explanation: "PDCA je Demingov cikel stalnega izboljševanja. BSC sta leta 1992 razvila Kaplan in Norton. Porter in Nohria (2018): direktorji na sestankih preživijo okoli 72 % časa.",
      fixedOrder: true }),
];

const kartice = cards([
  ['Izpit TM', 'Seminarska 50 % + izpit 50 %, prag 55 točk. Končni izpit je pisni (od 2026/27; prej Kahoot); obliko preveri pri predmetu.'],
  ['4 funkcije managementa', 'Planiranje, organiziranje, vodenje, kontroliranje.'],
  ['Uspešnost vs. učinkovitost', 'Uspešnost = delati prave stvari. Učinkovitost = delati stvari pravilno.'],
  ['5 dimenzij okolja', 'Digitalizacija, ekologija, varnost, zdravje, individualnost.'],
  ['Mintzberg', '10 vlog v 3 kategorijah: medosebne (predstavnik, vodja, zveza), informacijske, odločitvene.'],
  ['Managerske spretnosti', 'Tehnične, ravnanje s človeškimi viri, konceptualne (+ Dubrin: diagnostične, politične, komunikacijske).'],
  ['Zunanje okolje', 'Splošno (vpliva na vse) in delovno (konkurenti, dobavitelji, kupci - vsakodnevne transakcije).'],
  ['Cilji po pomenu', 'Strateški (vrhnji, dolgoročni) → taktični (srednji) → operativni (nižji, kratkoročni).'],
  ['Hunger in Wheelen', 'Analiza okolja (SWOT) → oblikovanje → uresničevanje → ovrednotenje in kontrola.'],
  ['Porter 5 sil', 'Novi konkurenti, moč kupcev, moč dobaviteljev, substituti, rivalstvo obstoječih.'],
  ['Porter generične strategije', 'Diferenciacija, stroškovno vodenje, osredinjenje. Brez izbire = "ne tič ne miš". Hibridna = obe.'],
  ['Miles in Snow', 'Iskalec (inovacije), branilec (stabilnost, niša), proučevalec (manj tveganja), reaktor (ad hoc).'],
  ['MBO', 'Cilji → akcijski plani → spremljanje → ocena in nagrade. Slabost: zahteva stabilno okolje.'],
  ['Kompleksnost', 'Horizontalna (specializacija), vertikalna (ravni), prostorska (lokacije).'],
  ['Kontrolni razpon', 'Ozek ≤ 7 (visoka struktura; banka). Širok ≥ 30 (sploščena; odvetniška pisarna, start-up).'],
  ['Avtoriteta', 'Del položaja, sprejeta s strani sodelavcev, teče od vrha navzdol.'],
  ['Funkcijska struktura', 'Za enega/malo proizvodov; ekonomije obsega. Slabo: komunikacija med funkcijami, malo inovacij.'],
  ['Matrična struktura', 'Dvojno vodenje; projekti; srednje velike organizacije z več izdelki.'],
  ['Učinkovit sestanek', 'Jasna agenda, vodja sestanka, management konfliktov. Pravilo 8-18-1800.'],
  ['Moč', 'Pozicijska: legitimna, nagrajevanja, prisilna. Osebnostna: ekspertna, referenčna.'],
  ['Čustvena inteligentnost', 'Samozavedanje, samoregulacija, motivacija, empatija, socialne sposobnosti.'],
  ['Transformacijski vodja', 'Jasna vizija, mobilizira zavezanost, opolnomoči, institucionalizira kulturo sprememb.'],
  ['Senge 5 disciplin', 'Sistemsko mišljenje, osebno mojstrstvo, mentalni modeli, skupna vizija, timsko učenje.'],
  ['Branden 7 R', 'Respect, responsibility, risk taking, rewards & recognition, relationship, rolemodelling, renewal.'],
  ['Teorije motivacije', 'Vsebinske (KAJ): Maslow, Herzberg, McClelland. Procesne (KAKO): cilji, Adams, Vroom, Skinner.'],
  ['Herzberg', 'Higieniki (plača, pogoji, odnosi) odstranijo nezadovoljstvo; motivatorji (dosežki, priznanje, rast) motivirajo.'],
  ['Vroom', 'Trud → dosežek → izid; valenca = vrednost izida.'],
  ['Skinner', 'Pozitivna okrepitev (+ prijetno), negativna (− neprijetno), kazen, ugašanje.'],
  ['Hackman in Oldham', 'Raznovrstnost spretnosti, identiteta nalog, pomen nalog, avtonomnost, povratne informacije.'],
  ['Vrste kontrole', 'Preliminarna / sprotna / povratna; stalna / periodična / občasna; birokratska / tržna / vedenjska.'],
  ['Povratna kontrola', 'Standardi → merjenje → primerjava → popravki.'],
  ['BSC (Kaplan, Norton 1992)', 'Finančni vidik, odjemalci, interni procesi, učenje in rast.'],
  ['Nagrade za kakovost', 'Deming (Japonska), Malcolm Baldrige (ZDA), EFQM (Evropa); Slovenija: PRSPO po EFQM, RADAR.'],
]);


// težji napačni odgovori (podobna dolžina kot pravilni) - ključ je začetek vprašanja, pravilni ostane na indeksu 0
const TEZJI = {
  'Katera NI ena od 5 dimenzij sodobnega okolja': ['Centralizacija', 'Digitalizacija', 'Individualnost', 'Varnost'],
  'Konceptualna spretnost managerja pomeni': ['Videti organizacijo kot celoto in misliti dolgoročno', 'Obvladati specifične strokovne naloge svojega področja', 'Delati z ljudmi ter jih motivirati in voditi', 'Hitro prepoznati probleme in njihove vzroke'],
  'Kaj po Daftu in Marcicu pomeni "iniciativnost"': ['Začeti aktivnosti brez prestavljanja in prelaganja', 'Se hitro prilagajati novim in nepričakovanim okoliščinam', 'Gledati na stvari nevtralno, ne po osebnih preferencah', 'Reči "ne" vsem stvarem, ki ovirajo doseganje ciljev'],
  'Kaj je PLAN?': ['Načrt, kako doseči cilj, z razporeditvijo virov, urnikom in nalogami', 'Želeno prihodnje stanje, ki ga organizacija poskuša doseči', 'Razlog, zaradi katerega organizacija sploh obstaja in deluje', 'Opis organizacije kot celote, kakršna naj bi bila v prihodnosti'],
  'Katera NI značilnost sodobne paradigme planiranja': ['Centralni oddelek za planiranje sprejema odločitve', 'Prožni, ambiciozni in jasno postavljeni cilji', 'Stalne izboljšave postanejo način življenja', 'Okolje, ki spodbuja učenje in prilagajanje'],
  'Po čem se strategija loči od poslovne učinkovitosti': ['Strategija je posebna kombinacija aktivnosti, drugačna od konkurence', 'Strategija pomeni predvsem dvig produktivnosti vseh aktivnosti', 'Strategija daje le začasne prednosti, ki jih konkurenti posnemajo', 'Strategija je odličnost pri izvajanju istih aktivnosti kot konkurenca'],
  'Porterjev položaj "ne tič ne miš"': ['Ne izbere jasne generične strategije in dosega nižje dobičke', 'Kombinira diferenciacijo in nizke stroške ter je najuspešnejše', 'Se osredotoči na eno nišo in v njej izbere nizke stroške', 'Se umakne iz panoge zaradi premočne konkurenčne strukture'],
  'Hofer in Lidl': ['Hibridna generična strategija', 'Čista strategija diferenciacije', 'Položaj "ne tič ne miš" po Porterju', 'Strategija osredinjenja na nišo'],
  'Na katere razloge za nastanek krize': ['Subjektivne (slabo vodstvo, šibko trženje)', 'Objektivne (recesija, naravne nesreče)', 'Zunanje (krizna žarišča, konkurenca)', 'Makroekonomske (obrestne mere, tečaji)'],
  'Kaj je organizacijska struktura?': ['Okvir, kako se razdelijo naloge in viri ter koordinirajo oddelki', 'Opis, zakaj organizacija obstaja in kaj želi doseči v prihodnosti', 'Načrt razporeditve virov, urnika in nalog za dosego enega cilja', 'Nabor vrednot, verovanj in norm, ki jih delijo člani organizacije'],
  'Formalizacija v organizaciji pomeni': ['Obstoj pisnih pravil - več pravil, višja formalizacija', 'Število hierarhičnih ravni - več ravni, višja formalizacija', 'Koncentracijo odločanja na vrhu organizacijske strukture', 'Stopnjo razdelitve nalog v manjše specializirane enote'],
  'Vertikalna diferenciacija (kompleksnost)': ['Število hierarhičnih ravni', 'Stopnjo specializacije nalog', 'Geografsko razpršenost enot', 'Število pisnih pravil in postopkov'],
  'Kdaj je po predavanjih primerna centralizacija': ['V kriznih časih in pri strategiji zniževanja stroškov', 'Ko je okolje zelo spremenljivo in negotovo za podjetje', 'Ko se želimo čim hitreje odzivati na potrebe strank', 'Ko gradimo učečo se organizacijo s timskim delom'],
  'Kateri primer ima po predavanjih ŠIROK kontrolni razpon': ['Odvetniška pisarna ali start-up', 'Banka ali zavarovalnica', 'Ministrstvo ali javna uprava', 'Vojska ali policija'],
  'Katera NI značilnost avtoritete': ['Odvisna je od značaja posameznika', 'Je sestavni del položaja managerja', 'Sprejeta je, ker jo sodelavci priznavajo', 'Širi se z vrha hierarhije navzdol'],
  'Opolnomočenje zaposlenih je': ['Nudenje znanja, informacij in veščin za avtonomne odločitve', 'Prenos odgovornosti za nalogo, ki ostane pod nadzorom šefa', 'Povečanje števila pisnih pravil za lažjo koordinacijo dela', 'Razširitev delovnega mesta z več podobnimi nalogami'],
  'Katera je slabost divizijske strukture': ['Podvajanje virov in višji stroški', 'Počasno, centralizirano odločanje', 'Dvojno vodenje in zmeda zaposlenih', 'Slaba odzivnost na potrebe trga'],
  'Strukturna možnost, pri kateri podjetje': ['Mrežna struktura (outsourcing)', 'Divizijska struktura po regijah', 'Matrična projektna struktura', 'Funkcijska struktura z oddelki'],
  'Katere tri elemente potrebuje učinkovit sestanek': ['Jasno agendo, vodjo sestanka, management konfliktov', 'Zapisnikarja, glasovanje in vsaj dve uri časa', 'Prisotnost direktorja, projektor in pisno vabilo', 'Čim več udeležencev, odprto temo in brez vodje'],
  'Pravilo 8-18-1800': ['Viharjenje možganov (brainstorming)', 'Sprejemanje končnih odločitev', 'Povezovanje in druženje množic', 'Formalne letne skupščine'],
  'Kaj je premortem po Kleinu': ['Udeleženci si predstavljajo, da je načrt propadel, in opišejo zakaj', 'Analiza vzrokov neuspeha, ki jo naredimo po zaključku projekta', 'Glasovanje, s katerim skupina potrdi odločitev pred izvedbo', 'Sestanek, na katerem stranke predstavijo svoje potrebe in želje'],
  'Kako Luthans opredeli vodenje': ['Motiviranje zaposlenih, da prostovoljno prevzemajo akcije k skupnim ciljem', 'Ustvarjalno, uspešno in učinkovito doseganje ciljev skozi štiri funkcije', 'Sistematični proces urejanja aktivnosti za doseganje planov in standardov', 'Formalna in legitimna pravica managerja, da odloča in izdaja ukaze'],
  'Na katero moč se zanaša avtokratski vodja': ['Legitimno, prisilno in moč nagrajevanja', 'Ekspertno in referenčno moč', 'Referenčno moč in moč nagrajevanja', 'Ekspertno, legitimno in prisilno moč'],
  'Katera NI sestavina čustvene inteligentnosti': ['Inteligenčni kvocient', 'Samozavedanje', 'Samoregulacija', 'Socialne sposobnosti'],
  'Po čem se transformacijski vodja loči od karizmatičnega': ['Po sposobnosti spodbujanja inovacij in sprememb', 'Po tem, da navdihuje ljudi kljub oviram', 'Po poudarku na planih, urnikih in predračunih', 'Po uporabi legitimne in prisilne moči'],
  'Kateri model vodje prihodnosti temelji na 9': ['Brocksmithov', 'Brandenov', 'Golemanov', 'Bridgesov'],
  'Po Druckerju je vodenje': ['Odgovornost, ne privilegij', 'Privilegij, ne odgovornost', 'Stvar prirojene karizme', 'Pravica, ki izhaja iz položaja'],
  'Katera NI ena od Sengeovih 5 disciplin': ['Strateško planiranje', 'Sistemsko mišljenje', 'Osebno mojstrstvo', 'Skupna vizija'],
  'Kateri Sengeov tip vodje je najmanj cenjen': ['Notranji graditelj mrež', 'Notranji (lokalni) vodja', 'Izvršilni vodja', 'Uslužni vodja'],
  'Kaj pomeni "Rewards and recognition"': ['Nagrade in priznanja - najučinkovitejši način motiviranja', 'Odgovornost - z njo vodja zaposlenim izkaže zaupanje', 'Ponovni začetek - kultura stalnega učenja in povratnih informacij', 'Zgled - vrhnji management je s svojim obnašanjem vzor drugim'],
  'Avtentično vodenje pomeni': ['Vodenje v skladu z lastno osebnostjo, prepričanji in vrednotami', 'Vodenje po zgledu najuspešnejših vodij v svoji panogi', 'Vodenje, ki temelji predvsem na legitimni moči položaja', 'Vodenje, pri katerem vodja slepo služi skupini ljudi'],
  'Uslužni vodja deluje predvsem za': ['Potrebe podrejenih in poslanstvo organizacije', 'Lastno napredovanje in ugled v organizaciji', 'Čim nižje stroške in strog nadzor dela', 'Interese lastnikov in kratkoročni dobiček'],
  'Ovira za zadovoljitev motiva, ki je ZUNAJ': ['Frustracijo', 'Konflikt', 'Ugašanje', 'Valenco'],
  'Katera je najvišja raven Maslowove piramide': ['Samouresničitev', 'Samospoštovanje', 'Pripadnost', 'Varnost'],
  'Kaj po Herzbergu velja za higienike': ['Če so dobri, le odstranijo nezadovoljstvo, ne motivirajo', 'Če so dobri, so glavni vir zadovoljstva in motivacije', 'Če so odsotni, so delavci neopredeljeni, a ne nezadovoljni', 'So potrebe višjega ranga, kot sta priznanje in rast'],
  'Kateri dejavnik je po Herzbergu MOTIVATOR': ['Priznanje za dosežke', 'Višina osnovne plače', 'Dobri delovni pogoji', 'Odnosi z nadrejenim'],
  'Adamsova teorija enakosti temelji na': ['Primerjavi razmerja vložki/izidi z drugimi', 'Zaporedju potreb od nižjih proti višjim', 'Pričakovanju, da bo trud prinesel nagrado', 'Okrepitvi vedenja z nagradami in kaznimi'],
  'Kaj je VALENCA v Vroomovi teoriji': ['Vrednost oziroma privlačnost izida za posameznika', 'Verjetnost, da vloženi trud privede do dosežka', 'Verjetnost, da dober dosežek prinese nagrado', 'Razmerje med vložki in izidi v primerjavi z drugimi'],
  'Hrup s ceste nas moti': ['Negativno okrepitev', 'Pozitivno okrepitev', 'Kazen z odvzemom', 'Ugašanje vedenja'],
  'Organizacijska kontrola je': ['Sistematični proces urejanja aktivnosti, da dosežemo plane, cilje in standarde', 'Preverjanje, pregledovanje in spremljanje poteka posamezne aktivnosti', 'Kaznovanje zaposlenih, ki ne dosegajo postavljenih standardov dela', 'Določanje ciljev organizacije in sredstev za njihovo uresničitev'],
  'Na katerem modelu temelji slovensko Priznanje': ['EFQM (logika RADAR)', 'Malcolm Baldrige (MBNQA)', 'Demingova nagrada', 'Standard ISO 9001'],
  'Kdo in kdaj je razvil uravnoteženi sistem': ['Kaplan in Norton, 1992', 'Deming in Juran, 1951', 'Porter in Nohria, 2018', 'Miles in Snow, 1978'],
  'Management odprtih knjig': ['Vsi zaposleni dobijo informacije o poslovanju celotne organizacije', 'Na izpitu smemo uporabljati originalni, nepopisani učbenik', 'Plače vseh zaposlenih so javno objavljene na oglasni deski', 'Vodstvo sproti nadzira vso elektronsko pošto zaposlenih'],
  'Kaj po raziskavi HBR pogosto naredijo': ['Iščejo nove odnose, ki jih potrdijo ("shopping for confirmation")', 'Takoj izboljšajo svoje delo in se zahvalijo za kritiko', 'Prosijo sodelavce za še več povratnih informacij', 'Ne spremenijo ničesar, saj kritiko hitro pozabijo'],
};
const utrdi = (arr) => arr.map((q) => {
  if (q.fixedOrder) return q;
  const k = Object.keys(TEZJI).find((p) => q.q.startsWith(p));
  return k ? { ...q, options: TEZJI[k], correct: 0 } : q;
});

// vprašanja z delnega testa so samo v svojem decku (brez podvajanja v mešanem kvizu)
const DELNI = [uvod[0], uvod[5], uvod[10], plan[1], plan[4], plan[10], org[8], org[12], vod[0], delni[0]];
const brez = (arr) => utrdi(arr.filter((q) => !DELNI.includes(q)));

module.exports = {
  id: 'mng',
  removeParts: ['k1', 'k2'],
  parts: [
    {
      id: 'izpit', name: 'Izpit', type: 'izpit',
      notesMd: NOTES,
      decks: [
        { id: 'mng-uvod', name: 'Uvod v management', questions: brez(uvod) },
        { id: 'mng-plan', name: 'Planiranje in strategije', questions: brez(plan) },
        { id: 'mng-org', name: 'Organiziranje in sestanki', questions: brez(org) },
        { id: 'mng-vod', name: 'Vodenje', questions: brez(vod) },
        { id: 'mng-mot', name: 'Motivacija', questions: utrdi(mot) },
        { id: 'mng-kont', name: 'Kontroliranje', questions: utrdi(kont) },
        { id: 'mng-delni', name: 'Vaje v slogu izpita (10 vprašanj)', questions: DELNI },
      ],
      flashcards: [{ id: 'mng-c', name: 'Ključni pojmi', cards: kartice }],
    },
  ],
};
