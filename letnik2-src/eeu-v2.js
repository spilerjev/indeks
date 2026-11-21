/* Ekonomika EU in Slovenija - dodatek: Vaje 2 (mednarodna menjava, primerjalne prednosti, pokritost uvoza)
   + teorija iz skripte z rešenimi vajami (Hrovatin 2014): mikroekonomska orodja, carine, integracije, preferencialna liberalizacija.
   Računske naloge so izračunane tukaj; možnosti so enako dolge in verjetne. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const dec = (x, d = 2) => x.toFixed(d).replace('.', ',');

/* ---------- Mednarodna menjava: teorija ---------- */
const mm = [
  withId('q1wpfrwm', Q('Kdo je utemeljitelj teorije ABSOLUTNIH primerjalnih prednosti?', [
    'David Ricardo', 'Adam Smith', 'Jacob Viner', 'Béla Balassa'], 1,
    'Adam Smith: država naj izvaža, kar proizvaja z manj časa (stroški) kot druge. David Ricardo je utemeljil relativne prednosti; Viner je znan po ustvarjanju in preusmerjanju trgovine.')),
  withId('qy77z0m', Q('Kaj je glavna slabost teorije absolutnih prednosti?', [
    'Ne razloži menjave, če je ena država boljša pri vseh proizvodih',
    'Predpostavlja, da so transportni stroški visoki',
    'Zahteva carine za zaščito domače proizvodnje',
    'Velja samo za storitve, ne za blago'], 0,
    'Če je Portugalska produktivnejša pri obeh dobrinah, absolutne prednosti menjave ne razložijo, vseeno pa menjava poteka - to razloži Ricardova teorija relativnih prednosti.')),
  withId('q1ac9mt6', Q('Po teoriji relativnih prednosti se država specializira za proizvod, pri katerem ima:', [
    'najvišjo absolutno produktivnost',
    'najnižji oportunitetni strošek',
    'najvišjo ceno na svetovnem trgu',
    'najmanjši delež v izvozu'], 1,
    'Relativna prednost = nižji oportunitetni strošek (koliko druge dobrine moramo opustiti). Tudi država, ki je slabša pri vsem, ima relativno prednost pri enem proizvodu.')),
  withId('q1hl9ytj', Q('Kako izračunamo oportunitetni strošek proizvodnje dobrine A v državi, če ima produktivnosti a_A in a_B (enot na uro)?', [
    'a_A − a_B',
    'a_A · a_B',
    'a_B / a_A (koliko B opustimo za enoto A)',
    'a_A + a_B'], 2,
    'Če v eni uri naredimo 1 kopalke ali 5 brisač, je 1 kopalke = 5 brisač. Primerjamo oportunitetne stroške med državama.')),
  withId('q3ild0a', Q('Kdaj mednarodna menjava med dvema državama NE poteka (po teoriji relativnih prednosti)?', [
    'Ko je ena država absolutno boljša pri obeh dobrinah',
    'Ko imata državi enaka menjalna razmerja (oportunitetne stroške)',
    'Ko je ena država večja od druge',
    'Ko imajo državi različne valute'], 1,
    'Če sta menjalni razmerji enaki (npr. Italija in Španija: 1 kg pomaranč = 0,75 kg limon), nobena država ne pridobi, zato ni specializacije.')),
  withId('q15a4ox0', Q('Med katerima vrednostma mora ležati menjalno razmerje, da bo menjava koristna za obe državi?', [
    'Med oportunitetnima stroškoma obeh držav',
    'Med ceno doma in transportnim stroškom',
    'Med absolutnima produktivnostma obeh držav',
    'Med svetovno ceno in carino'], 0,
    'Vsaka država mora dobiti dobrino ceneje, kot jo lahko naredi doma. Interval je od nižjega do višjega oportunitetnega stroška.')),
  withId('qt16m1h', Q('Kaj je rezultat specializacije in delitve dela med državami?', [
    'Povečanje skupne proizvodnje in ekonomske koristi',
    'Zmanjšanje cen na vseh trgih za enak odstotek',
    'Izenačitev produktivnosti med državami',
    'Povečanje uvoznih carin zaradi večjega obsega'], 0,
    'Specializacija poveča skupno količino proizvodov in zato blaginjo obeh držav. Zato se zavzemamo za prosto mednarodno menjavo (liberalizem).')),
  withId('q117aqc9', Q('Kaj sodi med oblike protekcionizma?', [
    'Prost pretok kapitala med državami',
    'Carine, tehnične ovire in uvozne kvote',
    'Subvencije za potrošnike izdelkov iz tujine',
    'Harmonizacija standardov med državami'], 1,
    'Protekcionizem ščiti domačo proizvodnjo. Je nezaželen, ker ne vodi v vse koristi proste trgovine.')),
  withId('q1h7rmdv', Q('Kaj je avtarkija?', [
    'Prost pretok blaga brez carin med partnerji',
    'Gospodarstvo z enotno zunanjo carino',
    'Samozadostno gospodarstvo brez mednarodne menjave (npr. popolna prepoved uvoza)',
    'Carinska unija med dvema državama'], 2,
    'Pri avtarkiji sta cena in količina določeni samo z domačo ponudbo in povpraševanjem.')),
  withId('q1yqdgzg', Q('Kaj predpostavlja prosta mednarodna trgovina?', [
    'Izvoz je dovoljen, uvoz pa omejen z kvotami',
    'Carine so enotne za vse države',
    'Brez transportnih stroškov, carin in drugih ovir',
    'Cene so enake po vsem svetu zaradi vlade'], 2,
    'To je izhodišče, s katerim primerjamo učinke carin in integracij.')),
];

/* ---------- Mikroekonomska orodja ---------- */
const mikro = [
  withId('q1sokzun', Q('Kaj je potrošnikov presežek?', [
    'Razlika med ceno, ki jo je potrošnik pripravljen plačati, in ceno, ki jo dejansko plača',
    'Razlika med ceno in mejnimi stroški podjetja',
    'Skupni izdatek potrošnikov za dobrino',
    'Razlika med uvozno in izvozno ceno'], 0,
    'Grafično: lik pod krivuljo povpraševanja in nad ravnotežno ceno. Če cena pade, se potrošnikov presežek poveča.')),
  withId('qnj994w', Q('Kako izračunamo družbeno blaginjo v osnovnem modelu?', [
    'W = potrošnikov presežek − proizvajalčev presežek',
    'W = potrošnikov presežek + proizvajalčev presežek',
    'W = prihodki − stroški',
    'W = izvoz − uvoz'], 1,
    'W = PP + PrP; pri carinah dodamo še prihodek iz carin. Predpostavka: mejna koristnost denarja je konstanta.')),
  withId('q1xao07q', Q('Kaj se zgodi ob prosti trgovini v državi UVOZNICI (svetovna cena pod avtarkično)?', [
    'Potrošniki izgubijo, proizvajalci pridobijo, neto učinek je pozitiven',
    'Potrošniki pridobijo, proizvajalci izgubijo, neto učinek je pozitiven',
    'Potrošniki in proizvajalci pridobijo oboji',
    'Potrošniki pridobijo, proizvajalci izgubijo, neto učinek je negativen'], 1,
    'Potrošnikov presežek naraste za več, kot se zmanjša proizvajalčev: dobiček blaginje je trikotnik CDE.')),
  withId('q1uv33do', Q('Kaj se zgodi ob prosti trgovini v državi IZVOZNICI (svetovna cena nad avtarkično)?', [
    'Proizvajalci pridobijo, potrošniki izgubijo, neto učinek je pozitiven',
    'Proizvajalci izgubijo, potrošniki pridobijo, neto učinek je pozitiven',
    'Proizvajalci in potrošniki izgubijo oboji',
    'Proizvajalci pridobijo, potrošniki izgubijo, neto učinek je negativen'], 0,
    'Višja cena poveča proizvajalčev presežek, zmanjša potrošnikovega; neto korist je trikotnik BCE. Obe državi pridobita, izguba je znotraj države prerazdeljena.')),
  withId('q1x1alrx', Q('Kaj je uvozno povpraševanje države (MD)?', [
    'Skupno povpraševanje po vseh dobrinah v državi',
    'Presežno povpraševanje: domače povpraševanje minus domača ponudba pri ceni pod avtarkično',
    'Povpraševanje tuje države po izvozu',
    'Razlika med izvozno in uvozno ceno'], 1,
    'Uvozno povpraševanje domače države sovpada z izvozno ponudbo tuje države pri svetovni ceni (v primeru: 80 − 40 = 40 enot).')),
];

/* ---------- Carine ---------- */
const carine = [
  withId('qh2uzub', Q('Kaj je MFN carina?', [
    'Diskriminacijska carina, ki velja samo za članice sporazuma',
    'Nediskriminacijska carina po načelu WTO: enaka za vse partnerje',
    'Carina, ki jo država uvede samo za izvoz',
    'Carina, ki jo plačujejo samo majhne države'], 1,
    'MFN = most favoured nation. Osnovno načelo WTO/GATT je nediskriminacija v aplikaciji carinskih stopenj.')),
  withId('q1ld9bbl', Q('Kaj velja za carino MAJHNE države?', [
    'Svetovna cena se zniža, ker del carine plača tujina',
    'Svetovna cena se poviša, domača cena ostane nespremenjena',
    'Svetovna cena ostane enaka; domača cena naraste za celotno carino: P_w · (1 + t)',
    'Domača cena naraste za manj kot znesek carine'], 2,
    'Majhna država ne vpliva na svetovno ceno (popolnoma elastična uvozna ponudba), zato nosijo celotno breme domači potrošniki.')),
  withId('q14meedu', Q('Kateri učinek NI učinek uvozne carine majhne države?', [
    'Potrošni učinek: domača poraba se zmanjša',
    'Proizvodni učinek: domača proizvodnja se poveča',
    'Fiskalni učinek: državni proračun dobi carinske prihodke',
    'Izboljšanje menjalnih pogojev (TOT) zaradi nižje svetovne cene'], 3,
    'Padec svetovne cene je učinek velike države. Majhna država ima potrošni, proizvodni, uvozni (trgovinski), fiskalni in prerazdelitveni učinek.')),
  withId('q1jgi8b4', Q('Iz česa sestoji mrtva izguba carine majhne države?', [
    'Iz carinskega prihodka države',
    'Iz izgube proizvajalčevega presežka',
    'Iz proizvodne in potrošne izgube (neučinkovita proizvodnja doma in zmanjšana poraba)',
    'Iz povečanja proizvajalčevega presežka'], 2,
    'Mrtva izguba = trikotnika, ki ju nihče ne dobi: potrošni (GCF) in proizvodni (KHJ). Carina zmanjša družbeno blaginjo majhne države.')),
  withId('qs7tq2h', Q('Kako carina velike države vpliva na svetovno in domačo ceno?', [
    'Svetovna cena se zniža, domača naraste za manj kot znesek carine',
    'Svetovna cena naraste, domača naraste za več kot znesek carine',
    'Svetovna cena ostane, domača naraste za celotno carino',
    'Obe ostaneta nespremenjeni'], 0,
    'Velika država zmanjša svetovno povpraševanje, zato tuji izvozniki znižajo ceno (del carine nosijo oni). Koristi iz boljših menjalnih pogojev lahko presežejo mrtvo izgubo.')),
  withId('q6a6de0', Q('Kaj je optimalna carinska stopnja?', [
    'Stopnja, pri kateri je carinski prihodek enak nič',
    'Stopnja, ki jo določi WTO za vse države',
    'Stopnja, ki velikim državam maksimira blaginjo, ker izkoristijo vpliv na svetovno ceno',
    'Stopnja, ki izenači domačo in svetovno ceno'], 2,
    'Velika država lahko s carino poveča blaginjo (border price effect), a na račun tujih izvoznikov. Pri majhni državi je optimalna carina nič.')),
  withId('q9f2aov', Q('Kaj je ad valorem carina?', [
    'Fiksen znesek na enoto uvoženega blaga',
    'Carina kot odstotek vrednosti blaga',
    'Količinska omejitev uvoza',
    'Davek na izvoz'], 1,
    'Domača cena uvoženega izdelka = P_w · (1 + t). Specifična carina bi bila fiksen znesek na enoto.')),
];

/* ---------- Ekonomske integracije ---------- */
const integr = [
  withId('q42ncbc', Q('Kateri je pravilen vrstni red stopenj ekonomske integracije od najplitkejše do najglobje?', [
    'Carinska unija, FTA, skupni trg, ekonomska unija, EMU',
    'FTA, carinska unija, skupni trg, ekonomska unija, EMU',
    'FTA, skupni trg, carinska unija, EMU, ekonomska unija',
    'Skupni trg, FTA, carinska unija, EMU, ekonomska unija'], 1,
    'FTA: odprava carin med članicami. Carinska unija: skupna zunanja carina. Skupni trg: + štiri svoboščine. Ekonomska unija: + usklajene politike. EMU: + skupna valuta in centralna banka.')),
  withId('q17ih0ry', Q('V čem se FTA razlikuje od carinske unije?', [
    'Pri FTA imajo članice svoje carine do tretjih držav, pri CU skupno zunanjo carino',
    'Pri FTA je skupna valuta, pri CU ni',
    'FTA vključuje samo storitve, CU samo blago',
    'Pri FTA se carine med članicami ohranijo'], 0,
    'Pri FTA nastane problem izogibanja višjim carinam (trade deflection): blago iz tretje države vstopi prek članice z najnižjo carino.')),
  withId('q1a6yr76', Q('Kako rešimo problem trade deflection pri FTA?', [
    'S skupno valuto',
    'S prepovedjo uvoza iz tretjih držav',
    'Z znižanjem carin med članicami',
    'S predpisi o poreklu blaga ali s carinsko unijo'], 3,
    'Predpisi o poreklu so administrativno drag in se pogosto uporabijo za prikriti protekcionizem. Carinska unija zahteva prenos dela suverenosti.')),
  withId('q1501r9b', Q('Kaj vsebuje skupni notranji trg poleg carinske unije?', [
    'Skupno valuto in centralno banko',
    'Skupno fiskalno politiko',
    'Skupno zunanjo in varnostno politiko',
    'Štiri svoboščine: prost pretok blaga, dela, kapitala in storitev'], 3,
    'Ekonomska unija doda koordinacijo politik, EMU še skupno valuto in centralno banko.')),
  withId('qo9r0f5', Q('Kaj velja za EEA (1994)?', [
    'Je carinska unija z enotno zunanjo carino in SKP',
    'Članice EFTA (razen Švice) sprejemajo evropsko zakonodajo štirih svoboščin, ne zajema pa kmetijstva, carinske unije in skupne zunanje politike',
    'Vključuje samo EFTA in ne članic EU',
    'Je monetarna unija z evrom kot valuto'], 1,
    'EEA omogoča državam EFTA sodelovanje na notranjem trgu brez članstva v EU. Ni carinska unija in nima evra.')),
  withId('qpxd07r', Q('Kaj je Schengen?', [
    'Odprava mejnega nadzora na notranjih mejah (sporazuma iz 1985 in 1995), skupna pravila za zunanje meje in skupni vizumski režim',
    'Carinska unija med državami Beneluksa',
    'Skupna valuta evroobmočja',
    'Nadnacionalna sodna institucija EU'], 0,
    'Cilj: hitrejši pretok oseb; vključuje SIS, sodelovanje policij in pravosodnih organov.')),
  withId('qg7v2ww', Q('Kakšen je namen CEFTA in BAFTA?', [
    'Nadomestiti članstvo v WTO',
    'Ustvariti carinsko unijo z lastno valuto',
    'Zaščititi domačo kmetijsko proizvodnjo pred EU',
    'Priprava držav na vstop v EU; z vstopom članstvo preneha'], 3,
    'CEFTA (1992, Višegrajska skupina) in BAFTA (1999, baltske države) sta prostotrgovinska sporazuma za pripravo na EU. Danes CEFTA vključuje države Zahodnega Balkana, Moldavijo in Kosovo.')),
  withId('qcmqwbk', Q('Kaj velja za NAFTA (1994)?', [
    'ZDA, Kanada in Mehika; ne zajema kmetijskih proizvodov',
    'Vse države Južne Amerike; vključuje kmetijstvo',
    'ZDA in EU; vključuje storitve',
    'Mehika, Brazilija in Argentina; carinska unija'], 0,
    'NAFTA je prostotrgovinski sporazum. MERCOSUR je južnoameriški skupni trg (Brazilija, Argentina, Paragvaj, Urugvaj), ASEAN južnoazijsko združenje.')),
];

/* ---------- Preferencialna liberalizacija ---------- */
const pref = [
  withId('qjw7489', Q('Kaj pomeni preferencialna (diskriminacijska) liberalizacija?', [
    'Znižanje carin za vse države v enaki meri',
    'Odprava carin samo med članicami, za tretje države pa se carine ohranijo',
    'Prepoved uvoza iz tretjih držav',
    'Znižanje carin samo za izvoz'], 1,
    'RTA diskriminirajo nečlanice. Za analizo potrebujemo vsaj tri države: dve članici in preostali svet.')),
  withId('quu77tt', Q('Kaj je ustvarjanje trgovine (trade creation)?', [
    'Uvoz se preusmeri od cenejšega tujega izvoznika k dražjemu partnerju',
    'Uvoz iz partnerske države nadomesti dražjo domačo proizvodnjo; blaginja se poveča',
    'Država poveča izvoz v tretje države',
    'Država uvede carine na uvoz iz tretjih držav'], 1,
    'Po odpravi carin domači potrošniki kupijo od učinkovitejšega partnerja. Učinek je pozitiven (trade volume effect).')),
  withId('qwhga9h', Q('Kaj je preusmerjanje trgovine (trade diversion)?', [
    'Uvoz od cenejšega izvoznika iz tretje države se preusmeri k dražji članici, ker je ta brez carine',
    'Uvoz se poveča zaradi nižjih cen',
    'Država začne izvažati v partnersko državo',
    'Država prepove uvoz'], 0,
    'Cena na meji se zviša (border price effect), blaginja se zmanjša. Preusmerjanje je negativen učinek.')),
  withId('q6vm89v', Q('Kaj je Vinerjeva nejasnost?', [
    'Ni znano, ali bo država ratificirala sporazum',
    'Neto učinek integracije na blaginjo ni jasen: pozitiven učinek obsega trgovine proti negativnemu učinku višje cene na meji',
    'Ni jasno, ali je integracija carinska unija',
    'Ni znano, kdaj sporazum začne veljati'], 1,
    'Če je pozitivni učinek (ustvarjanje) večji od negativnega (preusmerjanje: izguba carinskih prihodkov H), je neto učinek pozitiven; sicer negativen.')),
  withId('q1xemwh8', Q('Kako integracija vpliva na blaginjo partnerske in tretjih držav?', [
    'Partnerska država vedno pridobi, tretje države vedno izgubijo',
    'Obe skupini vedno pridobita',
    'Partnerska država izgubi, tretje države pridobijo',
    'Učinek je v obeh primerih nejasen'], 0,
    'Partner izvozi več po višji ceni (proizvajalčev presežek raste). Tretje države izgubijo zaradi manjšega obsega trgovine in nižje cene na meji.')),
  withId('qaiy6gq', Q('Kaj se zgodi, če se država združi s stroškovno učinkovitejšo partnerko A (pred tem je uvažala iz A)?', [
    'Pride do preusmerjanja trgovine, blaginja se zmanjša',
    'Učinek je enak kot pri MFN liberalizaciji; ni preusmerjanja, blaginja se poveča',
    'Uvoz se zmanjša',
    'Cena na meji naraste'], 1,
    'Ker uvaža iz A že pred integracijo, se samo odpravi carina: nediskriminatorna in preferencialna liberalizacija sta enaki. Diskriminirana je le država B.')),
  withId('ql15n29', Q('Pod katerimi pogoji člen 24 GATT dovoljuje FTA in carinsko unijo?', [
    'Samo če je članov manj kot pet',
    'Samo če je izvoz večji od uvoza',
    'Če sporazum zajame skoraj vso trgovino, se carine med članicami odpravijo v razumnem času in skupna zunanja carina v povprečju ni višja',
    'Če sporazum zajema le izbrane proizvode'], 2,
    'RTA kršijo načelo nediskriminacije, a so z določenimi pogoji (substantially all the trade) dovoljeni.')),
  withId('q1catbiw', Q('Kaj pravi Kemp-Wanov teorem?', [
    'Carinska unija vedno poveča blaginjo držav članic',
    'Z ustrezno prilagoditvijo skupne zunanje carine in prerazdelitvijo se lahko carinska unija izboljša za vse (pareto), tudi za svet, a je praktično težko izvedljiv',
    'Svetovna cena je vedno enaka domači ceni',
    'Preusmerjanje trgovine ne obstaja'], 1,
    'Da noben ne izgubi, je treba zunanje carine nastaviti tako, da ostali svet ne izgubi, in omogočiti prerazdelitev med članicami.')),
  withId('q3k4vcf', Q('Kaj je ugotovila večina empiričnih študij o preferencialnih trgovinskih sporazumih?', [
    'Prevladuje ustvarjanje trgovine; preusmerjanja je malo ali nič',
    'Prevladuje preusmerjanje trgovine',
    'Sporazumi nimajo učinka na trgovino',
    'Vsi sporazumi zmanjšajo blaginjo'], 0,
    'Izjeme (Magee 2008): EU širitev 1986 in evropski sporazumi z vzhodnoevropskimi državami kažejo tudi preusmerjanje.')),
];

/* ---------- Računske (vaje 2) ---------- */
const rac = [
  withId('q1dlxt3e', { q: "Belgija in Nizozemska: delavec v eni uri izdela čokolado (BE 4 kg, NL 1 kg) ali sir (BE 2 kg, NL 3 kg). Katera država ima absolutno prednost pri čokoladi in katera pri siru?",
      options: ["Čokolada Nizozemska, sir Belgija","Čokolada Belgija, sir Nizozemska","Pri obeh dobrinah Belgija","Pri obeh dobrinah Nizozemska"],
      correct: 1,
      explanation: "Absolutna prednost = višja produktivnost: čokolada BE (4 > 1 kg), sir NL (3 > 2 kg). Tu se absolutni in relativni prednosti ujemata." }),
  withId('q1ibdaow', { q: "Čokolada in sir: belgijski delavec v uri izdela 4 kg čokolade ali 2 kg sira, nizozemski 1 kg čokolade ali 3 kg sira. Za kaj se specializira posamezna država in kaj izvaža?",
      options: ["Belgija sir, Nizozemska čokolado","Obe državi se specializirata za čokolado","Belgija čokolado, Nizozemska sir","Obe državi se specializirata za sir"],
      correct: 2,
      explanation: "Oportunitetni strošek 1 kg čokolade: BE 2/4 = 0,5 kg sira, NL 3/1 = 3 kg sira. Čokolada je relativno cenejša v Belgiji, sir na Nizozemskem (1 kg sira: BE 2 kg čokolade, NL 0,33 kg)." }),
  withId('q11ki9rh', { q: "Čokolada in sir: oportunitetni strošek 1 kg čokolade je v Belgiji 0,5 kg sira, na Nizozemskem 3 kg sira. V katerem intervalu (kg sira za 1 kg čokolade) se oblikuje menjalno razmerje?",
      options: ["Med 1 in 4","Med 0,5 in 3","Med 2 in 3","Med 0,33 in 2"],
      correct: 1,
      explanation: "Belgija čokolade ne proda za manj kot 0,5 kg sira (toliko stane doma), Nizozemska zanjo ne plača več kot 3 kg sira (domači strošek). Razmerje je med obema domačima oportunitetnima stroškoma." }),
  withId('q1sbxpqf', { q: "Čokolada in sir: Belgija (1 kg čokolade = 0,5 kg sira doma) in Nizozemska (1 kg čokolade = 3 kg sira doma) menjata 1 kg čokolade za 2 kg sira. Za koliko sira je Nizozemska na boljšem, če čokolado kupi, namesto da bi jo izdelala sama?",
      options: ["0,5 kg sira","1 kg sira","1,5 kg sira","3 kg sira"],
      correct: 1,
      explanation: "Doma bi za 1 kg čokolade opustila 3 kg sira, z menjavo jo dobi za 2 kg - prihrani 1 kg sira. Belgija za 1 kg čokolade dobi 2 kg sira namesto 0,5 kg, torej pridobi 1,5 kg." }),
  withId('qmw9f1m', { q: "Češka (3 kozarce ali 12 krožnikov na uro) in Madžarska (2 kozarca ali 4 krožnike na uro). Katera država ima absolutno prednost?",
      options: ["Madžarska pri obeh","Češka pri obeh","Češka pri kozarcih, Madžarska pri krožnikih","Madžarska pri kozarcih, Češka pri krožnikih"],
      correct: 1,
      explanation: "Češka izdela več pri obeh (3 > 2 in 12 > 4). Absolutne prednosti zato menjave ne razložijo, relativne pa." }),
  withId('q16q6jb6', { q: "Kozarci in krožniki: Češka izdela 3 kozarce ali 12 krožnikov na uro, Madžarska 2 kozarca ali 4 krožnike. Katera država ima relativno prednost pri kozarcih in kolikšen je oportunitetni strošek 1 kozarca v obeh državah?",
      options: ["Češka; 4 krožniki na Češkem, 2 na Madžarskem","Madžarska; 2 krožnika na Madžarskem, 4 na Češkem","Madžarska; 4 krožniki na Madžarskem, 12 na Češkem","Češka; 0,25 kozarca na Češkem, 0,5 na Madžarskem"],
      correct: 1,
      explanation: "Češka: 1 kozarec = 12/3 = 4 krožniki; Madžarska: 1 kozarec = 4/2 = 2 krožnika. Madžarska je relativno cenejša pri kozarcih, Češka pri krožnikih." }),
  withId('q1um4ro8', { q: "Kozarci in krožniki: oportunitetni strošek 1 kozarca je na Češkem 4 krožnike, na Madžarskem 2 krožnika. V katerem intervalu (krožnikov za 1 kozarec) se mora oblikovati menjalno razmerje?",
      options: ["Med 2 in 4","Med 0,25 in 0,5","Med 4 in 12","Med 3 in 12"],
      correct: 0,
      explanation: "Madžarska kozarca ne proda za manj kot 2 krožnika (domači strošek), Češka zanj ne plača več kot 4 krožnike." }),
  withId('qahudie', { q: "Kozarci in krožniki: Češka (1 kozarec = 4 krožniki doma) in Madžarska (1 kozarec = 2 krožnika doma) menjata 1 kozarec za 2,5 krožnika. Kakšna je korist?",
      options: ["Madžarska dobi 2,5 krožnika več, Češka prihrani 1,5 krožnika","Samo Madžarska pridobi, Češka ostane enaka","Samo Češka pridobi, Madžarska ostane enaka","Madžarska +0,5 krožnika, Češka prihrani 1,5 krožnika"],
      correct: 3,
      explanation: "Madžarska: za kozarec dobi 2,5 namesto 2 krožnikov (+0,5). Češka: zanj plača 2,5 namesto 4 krožnikov (prihranek 1,5). Obe pridobita - zato menjava poteka." }),
  withId('q7g573', { q: "Ciper (paradižnik 1/5 ure/kg, paprika 1/4 ure/kg) in Malta (paradižnik 2/5, paprika 1/2 ure/kg). Ali bo menjava potekala?",
      options: ["Da, Ciper izvaža obe dobrini, ker je absolutno boljši","Ne, ker sta razmerji stroškov enaki (0,8)","Da, Malta izvaža papriko, ker je pri njej relativno boljša","Ne, ker je Ciper absolutno boljši pri obeh dobrinah"],
      correct: 1,
      explanation: "Ciper: (1/5)/(1/4) = 0,8; Malta: (2/5)/(1/2) = 0,8. Brez relativnih razlik ni koristi od menjave, čeprav je Ciper absolutno boljši (manj ur na kg pri obeh)." }),
  withId('q1mi50l9', { q: "Država ima v enem letu izvoz blaga 48,6 mrd € in uvoz blaga 54,0 mrd €. Kolikšna je pokritost uvoza z izvozom?",
      options: ["90,0 %","111,1 %","5,4 %","190,0 %"],
      correct: 0,
      explanation: "Pokritost = izvoz/uvoz · 100 = 48,6/54,0 · 100 = 90,0 %. Pod 100 % pomeni primanjkljaj v blagovni menjavi (5,4 mrd €)." }),
];

const kartice = [
  ['Absolutne vs. relativne prednosti', 'Smith: država proizvaja, kjer ima nižje absolutne stroške. Ricardo: specializacija po oportunitetnih stroških (relativna prednost); koristna tudi, če je država slabša pri vsem.'],
  ['Menjalno razmerje', 'Leži med oportunitetnima stroškoma obeh držav; če sta razmerji enaki, menjave ni.'],
  ['PP in PrP', 'Potrošnikov presežek: pod D, nad ceno. Proizvajalčev: nad S, pod ceno. W = PP + PrP.'],
  ['Prosta trgovina: uvoznica / izvoznica', 'Uvoznica: PP +, PrP −, neto +. Izvoznica: PrP +, PP −, neto +.'],
  ['Carina majhne države', 'P_dom = P_w(1 + t). Učinki: potrošni, proizvodni, uvozni, fiskalni, prerazdelitveni. Mrtva izguba = potrošna + proizvodna. Blaginja −.'],
  ['Carina velike države', 'P_w pade, P_dom naraste za manj kot t; del bremena nosijo tuji izvozniki; optimalna carinska stopnja; neto učinek nejasen.'],
  ['Stopnje integracije', 'FTA → carinska unija → skupni trg (+ 4 svoboščine) → ekonomska unija → EMU.'],
  ['Trade creation / diversion', 'Ustvarjanje: partner učinkovitejši od domače proizvodnje (+). Preusmerjanje: dražji partner namesto cenejše tretje države (−). Viner: neto učinek nejasen.'],
  ['Člen 24 GATT', 'RTA dovoljeni, če pokrijejo skoraj vso trgovino, carine med članicami → 0 v razumnem času in zunanja carina ne naraste.'],
  ['Kemp-Wan', 'Z ustrezno CET in prerazdelitvijo je CU lahko pareto učinkovita za ves svet; v praksi težko.'],
];

module.exports = { mm, mikro, carine, integr, pref, rac, kartice };
