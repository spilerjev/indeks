/* 2. letnik: naloge povezovanja (pojem ↔ opis) za vse predmete. Vsak predmet je modul { id, parts: [{ id, decks }] };
   add-letnik2-vsebina.js jih doda k obstoječim delom (upsert po id sklopa). Dejstva usklajena z zapiski in obstoječimi vprašanji. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const M = (q, pairs, explanation) => ({ type: 'match', q, pairs: pairs.map(([term, def]) => ({ term, def })), explanation });

const pf1k1 = [
  withId('q1epyaxo', M('Poveži sestavino agentskih stroškov oziroma pojem z opisom (Jensen in Meckling).', [
    ['Stroški nadzora', 'Nosijo jih principali (delničarji), npr. revizija in nadzorni svet'],
    ['Stroški omejitev (bonding)', 'Nosi jih agent (manager), ki se sam zaveže k omejitvam'],
    ['Preostala izguba', 'Praviloma največji del agentskih stroškov'],
    ['Korenček', 'Spodbuda, npr. delniške opcije'],
    ['Palica', 'Grožnja, npr. prevzem podjetja'],
  ], 'Agentski stroški = stroški nadzora + stroški omejitev + preostala izguba.')),
  withId('q1kc5t7n', M('Poveži računovodski izkaz oziroma kategorijo z opisom.', [
    ['Bilanca stanja', 'Stanje sredstev in obveznosti na določen dan'],
    ['Izkaz poslovnega izida', 'Prihodki in odhodki v obdobju (tok)'],
    ['Izkaz denarnih tokov', 'Prejemki in izdatki v obdobju (tok)'],
    ['Prosti denarni tok (FCF)', 'Denar za vse investitorje: lastnike in upnike'],
    ['Neobvladujoči deleži', 'Del odvisnih družb v lasti drugih lastnikov'],
  ], 'Bilanca je stanje, IPI in IDT sta toka; nakup stroja je izdatek v IDT, v IPI pa amortizacija.')),
  withId('qtb25el', M('Poveži pojem časovne vrednosti denarja s formulo.', [
    ['FVIF', '(1 + r)ⁿ'],
    ['PVIF', '(1 + r)⁻ⁿ'],
    ['Efektivna letna obrestna mera', '(1 + r/m)ᵐ − 1'],
    ['Konformna mesečna obrestna mera', '(1 + r)^(1/12) − 1'],
    ['Anuiteta posojila', 'A = PV · r / [1 − (1 + r)⁻ⁿ]'],
  ], 'Proporcionalna mesečna mera je r/12, konformna pa ohrani enako letno donosnost.')),
  withId('q16f0ydd', M('Poveži pojem korporativnega upravljanja in poročanja z opisom.', [
    ['Dvotirni sistem', 'Uprava in nadzorni svet'],
    ['Enotirni sistem', 'Upravni odbor z izvršnimi in neizvršnimi direktorji'],
    ['Korporativno upravljanje (G20/OECD)', 'Sistem razmerij med upravo, svetom, delničarji in deležniki'],
    ['Obseg 2 izpustov', 'Izpusti iz kupljene energije (elektrika)'],
    ['ESEF / iXBRL', 'Enotna strojno berljiva oblika letnih poročil'],
  ], 'V Sloveniji delničarje pri nadzoru uprave zastopa nadzorni svet.')),
];
const pf1k2 = [
  withId('q49s1jm', M('Poveži pojem iz vrednotenja obveznic z opisom.', [
    ['Obveznica s premijo', 'Kupon je višji od zahtevane donosnosti, cena nad nominalno'],
    ['Obveznica z diskontom', 'Kupon je nižji od zahtevane donosnosti, cena pod nominalno'],
    ['Donosnost do dospetja (YTM)', 'Diskontna stopnja, pri kateri je SV plačil enaka ceni'],
    ['Čista cena', 'Cena brez natečenih obresti'],
    ['Obrnjena krivulja donosnosti', 'Kratkoročne donosnosti so višje od dolgoročnih'],
  ], 'Brezkuponska obveznica se pri pozitivni donosnosti vedno prodaja z diskontom.')),
  withId('q1b2876n', M('Poveži pojem iz vrednotenja delnic z opisom.', [
    ['Model diskontiranih dividend', 'Vrednost je SV pričakovanih dividend'],
    ['Gordonov model', 'Dividende rastejo s stalno stopnjo g'],
    ['Sestavljeni model', 'Najprej hitra rast, nato stalna rast'],
    ['Presečni dan', 'Dividendo dobi, kdor je ta dan v delniški knjigi'],
    ['Strošek lastniškega kapitala', 'Diskontna stopnja za diskontiranje dividend'],
  ], 'Pri diskontiranju dividend uporabimo zahtevano donosnost lastnikov, ne WACC.')),
  withId('q7zs0t', M('Poveži pojem iz tveganja in donosnosti z opisom.', [
    ['Sistematično tveganje', 'Tržno tveganje, ki ga z razpršitvijo ne odpravimo'],
    ['Nesistematično tveganje', 'Specifično tveganje podjetja, ki ga diverzifikacija odpravi'],
    ['Beta', 'Občutljivost donosnosti delnice na gibanje trga'],
    ['Tržna premija za tveganje', 'E(r_m) − r_f'],
    ['CAPM', 'E(r) = r_f + β · [E(r_m) − r_f]'],
  ], 'CAPM nagrajuje samo sistematično tveganje, merjeno z beto.')),
];

const stanak1 = [
  withId('q1l0hmyf', M('Poveži mersko lestvico s parametrom, ki ga ta lestvica še omogoča.', [
    ['Imenska', 'Modus (npr. kraj prebivališča)'],
    ['Urejenostna', 'Mediana in kvantili'],
    ['Razmična', 'Aritmetična sredina; ni absolutne ničle'],
    ['Razmernostna', 'Koeficient variacije'],
  ], 'Lestvice so hierarhične: višja omogoča vse, kar nižja, in še več.')),
  withId('qagq8yg', M('Poveži porazdelitev z njeno uporabo.', [
    ['Binomska', 'Število uspehov v n poskusih z vračanjem'],
    ['Hipergeometrična', 'Število uspehov v n poskusih brez vračanja'],
    ['Normalna', 'Zvonasta zvezna porazdelitev, osnova sklepne statistike'],
    ['Studentova t', 'Sklepanje o povprečju pri manjših vzorcih in neznani varianci'],
    ['χ² in F', 'Sklepanje o variancah, neodvisnosti in ANOVA'],
  ], 'Štiri zvezne porazdelitve sklepne statistike so normalna, t, χ² in F.')),
  withId('qe7loua', M('Poveži vrsto vzorca z njegovo značilnostjo.', [
    ['Enostavni slučajni vzorec', 'Vsaka enota ima enako verjetnost izbire iz vzorčnega okvira'],
    ['Stratificirani vzorec', 'Populacija razdeljena na homogene stratume, v vsakem ESV'],
    ['Vzorec v skupinicah', 'Učinkovit, ko so skupinice znotraj raznolike, med seboj podobne'],
    ['Sistematični vzorec', 'Izbira s korakom; pristranski, če se korak ujema s periodo'],
    ['Kvotni vzorec', 'Neslučajni (neverjetnostni) vzorec'],
  ], 'Vzorčenje v več stopnjah je pri isti velikosti vzorca praviloma manj natančno od ESV in stratificiranega.')),
  withId('qrb935e', M('Poveži lastnost cenilke z opredelitvijo.', [
    ['Nepristranskost', 'E(g) = Γ'],
    ['Učinkovitost', 'Med nepristranskimi cenilkami ima najmanjšo varianco'],
    ['Doslednost', 'Z večanjem vzorca se ocene približujejo parametru'],
    ['Standardna napaka', 'Standardni odklon vzorčnih ocen'],
    ['Točnost', 'Natančnost in nepristranskost skupaj'],
  ], 'Velike črke (Var, SE) označujejo prave vrednosti, male (var, se) ocene iz vzorca.')),
  withId('q18lmh1u', M('Poveži ukaz v R z njegovo nalogo.', [
    ['qnorm', 'Iz verjetnosti vrne vrednost (kvantil)'],
    ['pnorm', 'Iz vrednosti vrne verjetnost P(Y ≤ y)'],
    ['dnorm', 'Vrne gostoto normalne porazdelitve'],
    ['car::recode', 'Razvrsti vrednosti v razrede'],
    ['frq()', 'Frekvenčna tabela z deleži'],
  ], 'Ukazi za delo z normalno porazdelitvijo in opisno statistiko v R.')),
];
const stanak2 = [
  withId('qxicqin', M('Poveži pojem iz preizkušanja domnev z opredelitvijo.', [
    ['Napaka 1. vrste', 'Zavrnemo H₀, ki dejansko velja; verjetnost α'],
    ['Napaka 2. vrste', 'Ne zavrnemo H₀, ki ne velja; verjetnost β'],
    ['p-vrednost', 'Najmanjša α, pri kateri bi še zavrnili H₀'],
    ['Moč preizkusa', '1 − β'],
    ['Sestavljena domneva', 'H₁ ima več možnih vrednosti (≠, <, >)'],
  ], 'Pri danem vzorcu zmanjšanje α poveča β; moč preizkusa raste z velikostjo vzorca.')),
  withId('q12awwmr', M('Poveži statistični preizkus z njegovo uporabo.', [
    ['t-preizkus', 'Povprečje ali razlika povprečij pri neznani varianci'],
    ['z-preizkus', 'Delež ali povprečje pri velikem vzorcu'],
    ['χ²-preizkus', 'Neodvisnost v kontingenčni tabeli ali prileganje porazdelitvi'],
    ['F-preizkus (ANOVA)', 'Primerjava več povprečij ali dveh varianc'],
  ], 'Pri ANOVA in primerjavi varianc uporabljamo porazdelitev F.')),
];

const trzk = [
  withId('qnjrml8', M('Poveži trženjsko usmeritev z njenim poudarkom.', [
    ['Proizvodna', 'Nizki stroški in široka dostopnost izdelkov'],
    ['Izdelčna', 'Kakovost in inovativnost izdelka; nevarnost trženjske kratkovidnosti'],
    ['Prodajna', 'Agresivna prodaja in promocija'],
    ['Trženjska', 'Potrebe in želje ciljnih porabnikov'],
    ['Družbena', 'Dolgoročna blaginja porabnikov in družbe'],
  ], 'Google Glass je ob prvem vstopu na trg sledil izdelčni usmeritvi, brez raziskave ciljne skupine.')),
  withId('qji007b', M('Poveži pojem iz ciljnega trženja in trženjskega spleta z opisom.', [
    ['Segmentacija', 'Razdelitev trga na skupine porabnikov s podobnimi potrebami'],
    ['Ciljanje', 'Izbira segmentov, ki jih bo podjetje obravnavalo'],
    ['Zaznano pozicioniranje', 'Kar o izdelku dejansko mislijo porabniki'],
    ['4P', 'Izdelek, cena, tržne poti, komuniciranje'],
    ['Dodatni elementi 7P', 'Ljudje, procesi, fizični dokazi'],
  ], 'STP = segmentacija → ciljanje → pozicioniranje; 7P je storitveni trženjski splet.')),
  withId('q1e7rahw', M('Poveži trženjsko merilo oziroma pojem z opisom.', [
    ['NPS', 'Priporočilni indeks z razponom od −100 do +100'],
    ['CLV', 'Sedanja vrednost vseh pričakovanih dobičkov od porabnika'],
    ['CRM', 'Poslovna filozofija dolgoročnega odnosa s porabniki'],
    ['ROPO', 'Informacije poišče na spletu, kupi v trgovini'],
    ['D2C', 'Prodaja končnemu kupcu brez trgovca'],
  ], 'Merila vrednosti porabnika in sodobne nakupne poti.')),
  withId('qhs6g32', M('Poveži sestavino trženjskega okolja z opisom.', [
    ['Mikro okolje', 'Konkurenti, dobavitelji, porabniki, posredniki'],
    ['Tehnološki dejavnik', 'Makro dejavnik z najbolj uničujočim vplivom'],
    ['Demografske spremembe', 'Počasne in dobro predvidljive, ne bi smele presenetiti'],
    ['Trend', 'Smer dogodkov z določeno vztrajnostjo, npr. staranje prebivalstva'],
    ['Strateške skupine', 'Pristop za iskanje pravih konkurentov'],
  ], 'Makro okolje (demografsko, ekonomsko, tehnološko, politično, kulturno) podjetje ne more nadzorovati.')),
  withId('q12zpelx', M('Poveži skupino dejavnikov vedenja porabnikov s primerom.', [
    ['Kulturni dejavniki', 'Kultura, subkultura, družbeni razred'],
    ['Družbeni dejavniki', 'Referenčne skupine, družina, vloge in status'],
    ['Osebni dejavniki', 'Starost, poklic, življenjski slog, osebnost'],
    ['Psihološki dejavniki', 'Motivacija, zaznavanje, učenje, stališča'],
  ], 'Štiri skupine dejavnikov, ki oblikujejo značilnosti porabnika in njegovo odločanje.')),
  withId('qxn4l65', M('Poveži nakupno vlogo z opisom.', [
    ['Pobudnik', 'Prvi predlaga nakup'],
    ['Vplivnež', 'S svojim mnenjem vpliva na odločitev'],
    ['Odločevalec', 'Odloči, kaj, kje in kako kupiti'],
    ['Kupec', 'Opravi nakup'],
    ['Porabnik', 'Izdelek uporablja'],
  ], 'Pri enem nakupu lahko ena oseba opravlja več vlog ali pa so razdeljene med člane gospodinjstva.')),
  withId('q1oqb806', M('Poveži paradigmo trženja po Rajamannarju (2021) z njenim zaporedjem.', [
    ['1. paradigma', 'Trženje izdelkov'],
    ['2. paradigma', 'Čustveno trženje'],
    ['3. paradigma', 'Podatkovno trženje'],
    ['4. paradigma', 'Digitalno in družabno trženje'],
    ['5. paradigma', 'Kvantno trženje'],
  ], 'Danes prehajamo v peto, kvantno paradigmo.')),
];

const eeuk1 = [
  withId('qbos6qp', M('Poveži leto širitve EU (EGS) z državami, ki so vstopile.', [
    ['1973', 'Velika Britanija, Irska, Danska'],
    ['1986', 'Španija, Portugalska'],
    ['1995', 'Avstrija, Finska, Švedska'],
    ['2004', 'Deset držav, med njimi Slovenija'],
    ['2013', 'Hrvaška'],
  ], 'Širitve: 1973 sever, 1981 Grčija, 1986 jug, 1995 EFTA-države, 2004 in 2007 vzhod, 2013 Hrvaška.')),
  withId('q1ddyvxi', M('Poveži letnico z dogodkom v zgodovini evropskega povezovanja.', [
    ['1958', 'Šest ustanoviteljic: Francija, ZRN, Italija in Beneluks'],
    ['1981', 'Vstop Grčije'],
    ['2007', 'Vstop Bolgarije in Romunije'],
    ['1990', 'Združitev Nemčij (3. 10.)'],
    ['2020', 'Izstop Velike Britanije (31. 1.)'],
  ], 'Berlinski zid je padel 9. 11. 1989, Nemčiji sta se združili 3. 10. 1990.')),
  withId('q1gn2glm', M('Poveži pogodbo z njeno glavno vsebino.', [
    ['Pariška pogodba (1951)', 'Ustanovitev ESPJ'],
    ['Rimska pogodba (1957)', 'Ustanovitev EGS in Euratoma'],
    ['Enotna evropska listina (1986)', 'Enotni trg do 1992 in več odločanja s kvalificirano večino'],
    ['Maastrichtska pogodba (1992)', 'EU s tremi stebri in pot do EMU'],
    ['Lizbonska pogodba (2009)', 'Konec stebrov, pravna osebnost EU, člen 50 o izstopu'],
  ], 'Amsterdamska pogodba (1997) je v besedilo vključila socialno poglavje; Pogodba o ustavi za Evropo nikoli ni začela veljati.')),
  withId('qbveydi', M('Poveži dokument oziroma sodbo z vsebino.', [
    ['Cassis de Dijon (1979)', 'Načelo vzajemnega priznavanja'],
    ['Bela knjiga (1985)', 'Okoli 300 ukrepov za enotni trg do 1992'],
    ['Pogodba o ustavi za Evropo', 'Nikoli ni začela veljati'],
    ['Schengen', 'Odprava nadzora na notranjih mejah'],
    ['Draghijevo poročilo (2024)', 'EU zaostaja v produktivnosti, potrebne so naložbe'],
  ], 'Program EC92 je odpravljal fizične, tehnične in davčne ovire.')),
  withId('qad7b2d', M('Poveži stopnjo ekonomske integracije z njeno vsebino.', [
    ['Območje proste trgovine', 'Odprava carin med članicami, vsaka obdrži svojo zunanjo carino'],
    ['Carinska unija', 'Dodatno skupna zunanja carina'],
    ['Skupni (notranji) trg', 'Dodatno prost pretok storitev in proizvodnih faktorjev'],
    ['Ekonomska unija', 'Dodatno usklajene ekonomske politike'],
    ['Ekonomska in monetarna unija', 'Dodatno skupna valuta'],
  ], 'Vrstni red od najplitkejše do najglobje: FTA, carinska unija, skupni trg, ekonomska unija, EMU.')),
  withId('qxqaet4', M('Poveži organizacijo z njeno vlogo.', [
    ['OEEC (1948)', 'Razdeljevanje Marshallove pomoči; leta 1961 postane OECD'],
    ['Evropska plačilna unija (1950-58)', 'Reševanje nekonvertibilnosti valut'],
    ['SEV (1949)', 'Vzhodni odgovor na Marshallov načrt'],
    ['EFTA (1960)', 'Medvladno območje proste trgovine brez skupne zunanje carine'],
    ['Svet Evrope', 'Organizacija za človekove pravice, ni del EU'],
  ], 'Danes so članice EFTA Islandija, Lihtenštajn, Norveška in Švica.')),
  withId('q1ty3v7j', M('Poveži osebnost z njenim prispevkom.', [
    ['Jean Monnet', 'Idejni vodja ESPJ in prvi predsednik Visoke oblasti'],
    ['Robert Schuman', 'Deklaracija 9. 5. 1950 o skupnem premogu in jeklu'],
    ['Jacques Delors', 'Bela knjiga 1985 in poročilo o EMU v treh fazah'],
    ['Henry Morgenthau', 'Načrt deindustrializacije Nemčije (1944)'],
    ['Richard Baldwin', 'Učinek domin: diskriminacija nečlanic sproži pritisk za vstop'],
  ], 'Dan Evrope je 9. maj po Schumanovi deklaraciji.')),
  withId('q1i3lxnq', M('Poveži ekonomista s pojmom, ki ga je uvedel.', [
    ['Jacob Viner', 'Ustvarjanje in preusmerjanje trgovine'],
    ['Jagdish Bhagwati', 'Spaghetti bowl: prepletenost sporazumov in pravil o poreklu'],
    ['Jan Tinbergen', 'Negativna in pozitivna integracija'],
    ['Adam Smith', 'Teorija absolutnih prednosti'],
    ['Artis in Lee', 'Pogoji, ko integracija verjetneje poveča blaginjo'],
  ], 'Po Artisu in Leeju integracija bolj verjetno poveča blaginjo, ko so začetne carine visoke, razlike v stroških majhne in partnerice blizu.')),
  withId('qnnbf8i', M('Poveži pojem iz teorije carin in integracije z opredelitvijo.', [
    ['Ustvarjanje trgovine', 'Uvoz iz partnerice nadomesti dražjo domačo proizvodnjo'],
    ['Preusmerjanje trgovine', 'Uvoz se preusmeri od cenejše tretje države k dražji članici'],
    ['MFN carina', 'Nediskriminacijska carina po načelu WTO'],
    ['Ad valorem carina', 'Carina kot odstotek vrednosti blaga'],
    ['Potrošnikov presežek', 'Razlika med pripravljenostjo plačati in dejansko ceno'],
  ], 'Vinerjeva nejasnost: neto učinek integracije ni jasen, ker ustvarjanje in preusmerjanje delujeta v nasprotnih smereh.')),
  withId('qdveaal', M('Poveži obdobje z dogajanjem v evropskem povezovanju.', [
    ['1950-1958', 'Obnova, Evropska plačilna unija, ESPJ'],
    ['1958-1968', 'Izgradnja carinske unije EGS, dokončana 1. 7. 1968'],
    ['1965-1966', 'Politika praznega stola in luksemburški kompromis'],
    ['1975-1986', 'Evropesimizem: naftna šoka, stagflacija, protekcionizem'],
    ['1985-1992', 'Program EC92 in dokončanje enotnega trga'],
  ], 'Svetla točka evropesimizma sta bili širitev na jug in ustanovitev EMS (1979).')),
  withId('q5opr1t', M('Poveži pojem iz Svetovne trgovinske organizacije z vsebino.', [
    ['Trije stebri WTO', 'GATT, GATS, TRIPS'],
    ['Doha (2001)', 'Kmetijstvo, razvoj, dostop do trgov'],
    ['Bali (2013)', 'Sporazum o olajševanju trgovine (TFA)'],
    ['Nairobi (2015)', 'Odprava kmetijskih izvoznih subvencij'],
    ['Člen 24 GATT', 'Dovoljuje FTA in carinske unije kot izjemo od MFN'],
  ], 'WTO je bila ustanovljena 1. 1. 1995 na podlagi urugvajskega kroga.')),
  withId('q1lmx2v5', M('Poveži pojem iz širitve na vzhod z vsebino.', [
    ['Kopenhagenski kriteriji (1993)', 'Politični, ekonomski in pravni (acquis)'],
    ['Phare (1989)', 'Program predpristopne pomoči'],
    ['Od Kopenhagna do Kopenhagna', 'Od junija 1993 do decembra 2002'],
    ['1. 5. 2004', 'Slovenija postane članica EU'],
    ['Kosovo', 'Le potencialna kandidatka za članstvo'],
  ], 'Islandski referendum 29. 8. 2026: 52,8 % proti nadaljevanju pogajanj.')),
];

const mpspk1 = [
  withId('q18isxci', M('Poveži pojem iz managementa procesov z opredelitvijo.', [
    ['Dejavniki zmagovanja', 'Konkurenčne prednosti, s katerimi podjetje pridobi stranke'],
    ['Dejavniki kvalificiranja', 'Lastnosti, ki morajo biti dovolj dobre, da je podjetje sploh upoštevano'],
    ['Ozko grlo', 'Resurs z najmanjšo zmogljivostjo, ki določa zmogljivost procesa'],
    ['Zmogljivost skupine resursov', 'Zmogljivost ene enote krat število enot'],
    ['Tehnološki pretočni čas', 'Čas najdaljše poti (kritična pot)'],
  ], 'Zmogljivost celotnega procesa je enaka zmogljivosti ozkega grla.')),
  withId('qbz39da', M('Poveži metodo oziroma mero napovedovanja z opisom.', [
    ['Naivna metoda', 'F_t = D_(t−1)'],
    ['Drseče povprečje', 'Povprečje zadnjih n obdobij'],
    ['Eksponentno glajenje', 'F_t = α · D_(t−1) + (1 − α) · F_(t−1)'],
    ['PANN', 'Povprečna absolutna napaka v napovedi'],
    ['Visoka PANN', 'Napoved v povprečju bolj odstopa od dejanskega; metoda je slabša'],
  ], 'Metode primerjamo po napaki napovedi: manjša PANN pomeni boljšo metodo.')),
  withId('qre9yc5', M('Poveži pojem iz usklajevanja ponudbe in povpraševanja ter razporejanja z opisom.', [
    ['Izdelek', 'Lahko ga damo na zalogo'],
    ['Storitev', 'Ni je mogoče skladiščiti'],
    ['Varnostna zaloga', 'Ukrep, ki velja za proizvodnjo, ne za storitve'],
    ['Pravilo razporejanja na delovna mesta', 'Najprej najdaljša naloga; ob izenačenju tista z več sledečimi'],
    ['Ozko grlo linije', 'Delovno mesto z najdaljšim časom obdelave'],
  ], 'Pri storitvah povpraševanje usklajujemo s čakalnimi vrstami in prilagajanjem zmogljivosti, ne z zalogami.')),
];

module.exports = [
  { id: 'pf1', parts: [
    { id: 'k1', decks: [{ id: 'pf1-k1-povezi', name: 'Povezovanje pojmov', questions: pf1k1 }] },
    { id: 'k2', decks: [{ id: 'pf1-k2-povezi', name: 'Povezovanje pojmov', questions: pf1k2 }] },
  ] },
  { id: 'stana', parts: [
    { id: 'k1', decks: [{ id: 'stana-k1-povezi', name: 'Povezovanje pojmov', questions: stanak1 }] },
    { id: 'k2', decks: [{ id: 'stana-k2-povezi', name: 'Povezovanje pojmov', questions: stanak2 }] },
  ] },
  { id: 'trz', parts: [{ id: 'kvizi', decks: [{ id: 'trz-povezi', name: 'Povezovanje pojmov', questions: trzk }] }] },
  { id: 'eeu', parts: [{ id: 'k1', decks: [{ id: 'eeu-povezi', name: 'Povezovanje: letnice, pogodbe, pojmi', questions: eeuk1 }] }] },
  { id: 'mpsp', parts: [{ id: 'k1', decks: [{ id: 'mpsp-k1-povezi', name: 'Povezovanje pojmov', questions: mpspk1 }] }] },
];
