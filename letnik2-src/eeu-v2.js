/* Ekonomika EU in Slovenija - dodatek: Vaje 2 (mednarodna menjava, primerjalne prednosti, pokritost uvoza)
   + teorija iz skripte z rešenimi vajami (Hrovatin 2014): mikroekonomska orodja, carine, integracije, preferencialna liberalizacija.
   Računske naloge so izračunane tukaj; možnosti so enako dolge in verjetne. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const dec = (x, d = 2) => x.toFixed(d).replace('.', ',');

/* ---------- Mednarodna menjava: teorija ---------- */
const mm = [
  Q('Kdo je utemeljitelj teorije ABSOLUTNIH primerjalnih prednosti?', [
    'David Ricardo', 'Adam Smith', 'Jacob Viner', 'Béla Balassa'], 1,
    'Adam Smith: država naj izvaža, kar proizvaja z manj časa (stroški) kot druge. David Ricardo je utemeljil relativne prednosti; Viner je znan po ustvarjanju in preusmerjanju trgovine.'),
  Q('Kaj je glavna slabost teorije absolutnih prednosti?', [
    'Ne razloži menjave, če je ena država boljša pri vseh proizvodih',
    'Predpostavlja, da so transportni stroški visoki',
    'Zahteva carine za zaščito domače proizvodnje',
    'Velja samo za storitve, ne za blago'], 0,
    'Če je Portugalska produktivnejša pri obeh dobrinah, absolutne prednosti menjave ne razložijo, vseeno pa menjava poteka - to razloži Ricardova teorija relativnih prednosti.'),
  Q('Po teoriji relativnih prednosti se država specializira za proizvod, pri katerem ima:', [
    'najvišjo absolutno produktivnost',
    'najnižji oportunitetni strošek',
    'najvišjo ceno na svetovnem trgu',
    'najmanjši delež v izvozu'], 1,
    'Relativna prednost = nižji oportunitetni strošek (koliko druge dobrine moramo opustiti). Tudi država, ki je slabša pri vsem, ima relativno prednost pri enem proizvodu.'),
  Q('Kako izračunamo oportunitetni strošek proizvodnje dobrine A v državi, če ima produktivnosti a_A in a_B (enot na uro)?', [
    'a_A − a_B',
    'a_A · a_B',
    'a_B / a_A (koliko B opustimo za enoto A)',
    'a_A + a_B'], 2,
    'Če v eni uri naredimo 1 kopalke ali 5 brisač, je 1 kopalke = 5 brisač. Primerjamo oportunitetne stroške med državama.'),
  Q('Kdaj mednarodna menjava med dvema državama NE poteka (po teoriji relativnih prednosti)?', [
    'Ko je ena država absolutno boljša pri obeh dobrinah',
    'Ko imata državi enaka menjalna razmerja (oportunitetne stroške)',
    'Ko je ena država večja od druge',
    'Ko imajo državi različne valute'], 1,
    'Če sta menjalni razmerji enaki (npr. Italija in Španija: 1 kg pomaranč = 0,75 kg limon), nobena država ne pridobi, zato ni specializacije.'),
  Q('Med katerima vrednostma mora ležati menjalno razmerje, da bo menjava koristna za obe državi?', [
    'Med oportunitetnima stroškoma obeh držav',
    'Med ceno doma in transportnim stroškom',
    'Med absolutnima produktivnostma obeh držav',
    'Med svetovno ceno in carino'], 0,
    'Vsaka država mora dobiti dobrino ceneje, kot jo lahko naredi doma. Interval je od nižjega do višjega oportunitetnega stroška.'),
  Q('Kaj je rezultat specializacije in delitve dela med državami?', [
    'Povečanje skupne proizvodnje in ekonomske koristi',
    'Zmanjšanje cen na vseh trgih za enak odstotek',
    'Izenačitev produktivnosti med državami',
    'Povečanje uvoznih carin zaradi večjega obsega'], 0,
    'Specializacija poveča skupno količino proizvodov in zato blaginjo obeh držav. Zato se zavzemamo za prosto mednarodno menjavo (liberalizem).'),
  Q('Kaj sodi med oblike protekcionizma?', [
    'Prost pretok kapitala med državami',
    'Carine, tehnične ovire in uvozne kvote',
    'Subvencije za potrošnike izdelkov iz tujine',
    'Harmonizacija standardov med državami'], 1,
    'Protekcionizem ščiti domačo proizvodnjo. Je nezaželen, ker ne vodi v vse koristi proste trgovine.'),
  Q('Kaj je avtarkija?', [
    'Prost pretok blaga brez carin med partnerji',
    'Gospodarstvo z enotno zunanjo carino',
    'Samozadostno gospodarstvo brez mednarodne menjave (npr. popolna prepoved uvoza)',
    'Carinska unija med dvema državama'], 2,
    'Pri avtarkiji sta cena in količina določeni samo z domačo ponudbo in povpraševanjem.'),
  Q('Kaj predpostavlja prosta mednarodna trgovina?', [
    'Izvoz je dovoljen, uvoz pa omejen z kvotami',
    'Carine so enotne za vse države',
    'Brez transportnih stroškov, carin in drugih ovir',
    'Cene so enake po vsem svetu zaradi vlade'], 2,
    'To je izhodišče, s katerim primerjamo učinke carin in integracij.'),
];

/* ---------- Mikroekonomska orodja ---------- */
const mikro = [
  Q('Kaj je potrošnikov presežek?', [
    'Razlika med ceno, ki jo je potrošnik pripravljen plačati, in ceno, ki jo dejansko plača',
    'Razlika med ceno in mejnimi stroški podjetja',
    'Skupni izdatek potrošnikov za dobrino',
    'Razlika med uvozno in izvozno ceno'], 0,
    'Grafično: lik pod krivuljo povpraševanja in nad ravnotežno ceno. Če cena pade, se potrošnikov presežek poveča.'),
  Q('Kako izračunamo družbeno blaginjo v osnovnem modelu?', [
    'W = potrošnikov presežek − proizvajalčev presežek',
    'W = potrošnikov presežek + proizvajalčev presežek',
    'W = prihodki − stroški',
    'W = izvoz − uvoz'], 1,
    'W = PP + PrP; pri carinah dodamo še prihodek iz carin. Predpostavka: mejna koristnost denarja je konstanta.'),
  Q('Kaj se zgodi ob prosti trgovini v državi UVOZNICI (svetovna cena pod avtarkično)?', [
    'Potrošniki izgubijo, proizvajalci pridobijo, neto učinek je pozitiven',
    'Potrošniki pridobijo, proizvajalci izgubijo, neto učinek je pozitiven',
    'Potrošniki in proizvajalci pridobijo oboji',
    'Potrošniki pridobijo, proizvajalci izgubijo, neto učinek je negativen'], 1,
    'Potrošnikov presežek naraste za več, kot se zmanjša proizvajalčev: dobiček blaginje je trikotnik CDE.'),
  Q('Kaj se zgodi ob prosti trgovini v državi IZVOZNICI (svetovna cena nad avtarkično)?', [
    'Proizvajalci pridobijo, potrošniki izgubijo, neto učinek je pozitiven',
    'Proizvajalci izgubijo, potrošniki pridobijo, neto učinek je pozitiven',
    'Proizvajalci in potrošniki izgubijo oboji',
    'Proizvajalci pridobijo, potrošniki izgubijo, neto učinek je negativen'], 0,
    'Višja cena poveča proizvajalčev presežek, zmanjša potrošnikovega; neto korist je trikotnik BCE. Obe državi pridobita, izguba je znotraj države prerazdeljena.'),
  Q('Kaj je uvozno povpraševanje države (MD)?', [
    'Skupno povpraševanje po vseh dobrinah v državi',
    'Presežno povpraševanje: domače povpraševanje minus domača ponudba pri ceni pod avtarkično',
    'Povpraševanje tuje države po izvozu',
    'Razlika med izvozno in uvozno ceno'], 1,
    'Uvozno povpraševanje domače države sovpada z izvozno ponudbo tuje države pri svetovni ceni (v primeru: 80 − 40 = 40 enot).'),
];

/* ---------- Carine ---------- */
const carine = [
  Q('Kaj je MFN carina?', [
    'Diskriminacijska carina, ki velja samo za članice sporazuma',
    'Nediskriminacijska carina po načelu WTO: enaka za vse partnerje',
    'Carina, ki jo država uvede samo za izvoz',
    'Carina, ki jo plačujejo samo majhne države'], 1,
    'MFN = most favoured nation. Osnovno načelo WTO/GATT je nediskriminacija v aplikaciji carinskih stopenj.'),
  Q('Kaj velja za carino MAJHNE države?', [
    'Svetovna cena se zniža, ker del carine plača tujina',
    'Svetovna cena se poviša, domača cena ostane nespremenjena',
    'Svetovna cena ostane enaka; domača cena naraste za celotno carino: P_w · (1 + t)',
    'Domača cena naraste za manj kot znesek carine'], 2,
    'Majhna država ne vpliva na svetovno ceno (popolnoma elastična uvozna ponudba), zato nosijo celotno breme domači potrošniki.'),
  Q('Kateri učinek NI učinek uvozne carine majhne države?', [
    'Potrošni učinek: domača poraba se zmanjša',
    'Proizvodni učinek: domača proizvodnja se poveča',
    'Fiskalni učinek: državni proračun dobi carinske prihodke',
    'Izboljšanje menjalnih pogojev (TOT) zaradi nižje svetovne cene'], 3,
    'Padec svetovne cene je učinek velike države. Majhna država ima potrošni, proizvodni, uvozni (trgovinski), fiskalni in prerazdelitveni učinek.'),
  Q('Iz česa sestoji mrtva izguba carine majhne države?', [
    'Iz carinskega prihodka države',
    'Iz izgube proizvajalčevega presežka',
    'Iz proizvodne in potrošne izgube (neučinkovita proizvodnja doma in zmanjšana poraba)',
    'Iz povečanja proizvajalčevega presežka'], 2,
    'Mrtva izguba = trikotnika, ki ju nihče ne dobi: potrošni (GCF) in proizvodni (KHJ). Carina zmanjša družbeno blaginjo majhne države.'),
  Q('Kako carina velike države vpliva na svetovno in domačo ceno?', [
    'Svetovna cena se zniža, domača naraste za manj kot znesek carine',
    'Svetovna cena naraste, domača naraste za več kot znesek carine',
    'Svetovna cena ostane, domača naraste za celotno carino',
    'Obe ostaneta nespremenjeni'], 0,
    'Velika država zmanjša svetovno povpraševanje, zato tuji izvozniki znižajo ceno (del carine nosijo oni). Koristi iz boljših menjalnih pogojev lahko presežejo mrtvo izgubo.'),
  Q('Kaj je optimalna carinska stopnja?', [
    'Stopnja, pri kateri je carinski prihodek enak nič',
    'Stopnja, ki jo določi WTO za vse države',
    'Stopnja, ki velikim državam maksimira blaginjo, ker izkoristijo vpliv na svetovno ceno',
    'Stopnja, ki izenači domačo in svetovno ceno'], 2,
    'Velika država lahko s carino poveča blaginjo (border price effect), a na račun tujih izvoznikov. Pri majhni državi je optimalna carina nič.'),
  Q('Kaj je ad valorem carina?', [
    'Fiksen znesek na enoto uvoženega blaga',
    'Carina kot odstotek vrednosti blaga',
    'Količinska omejitev uvoza',
    'Davek na izvoz'], 1,
    'Domača cena uvoženega izdelka = P_w · (1 + t). Specifična carina bi bila fiksen znesek na enoto.'),
];

/* ---------- Ekonomske integracije ---------- */
const integr = [
  Q('Kateri je pravilen vrstni red stopenj ekonomske integracije od najplitkejše do najglobje?', [
    'Carinska unija, FTA, skupni trg, ekonomska unija, EMU',
    'FTA, carinska unija, skupni trg, ekonomska unija, EMU',
    'FTA, skupni trg, carinska unija, EMU, ekonomska unija',
    'Skupni trg, FTA, carinska unija, EMU, ekonomska unija'], 1,
    'FTA: odprava carin med članicami. Carinska unija: skupna zunanja carina. Skupni trg: + štiri svoboščine. Ekonomska unija: + usklajene politike. EMU: + skupna valuta in centralna banka.'),
  Q('V čem se FTA razlikuje od carinske unije?', [
    'Pri FTA imajo članice svoje carine do tretjih držav, pri CU skupno zunanjo carino',
    'Pri FTA je skupna valuta, pri CU ni',
    'FTA vključuje samo storitve, CU samo blago',
    'Pri FTA se carine med članicami ohranijo'], 0,
    'Pri FTA nastane problem izogibanja višjim carinam (trade deflection): blago iz tretje države vstopi prek članice z najnižjo carino.'),
  Q('Kako rešimo problem trade deflection pri FTA?', [
    'S skupno valuto',
    'S prepovedjo uvoza iz tretjih držav',
    'Z znižanjem carin med članicami',
    'S predpisi o poreklu blaga ali s carinsko unijo'], 3,
    'Predpisi o poreklu so administrativno drag in se pogosto uporabijo za prikriti protekcionizem. Carinska unija zahteva prenos dela suverenosti.'),
  Q('Kaj vsebuje skupni notranji trg poleg carinske unije?', [
    'Skupno valuto in centralno banko',
    'Skupno fiskalno politiko',
    'Skupno zunanjo in varnostno politiko',
    'Štiri svoboščine: prost pretok blaga, dela, kapitala in storitev'], 3,
    'Ekonomska unija doda koordinacijo politik, EMU še skupno valuto in centralno banko.'),
  Q('Kaj velja za EEA (1994)?', [
    'Je carinska unija z enotno zunanjo carino in SKP',
    'Članice EFTA (razen Švice) sprejemajo evropsko zakonodajo štirih svoboščin, ne zajema pa kmetijstva, carinske unije in skupne zunanje politike',
    'Vključuje samo EFTA in ne članic EU',
    'Je monetarna unija z evrom kot valuto'], 1,
    'EEA omogoča državam EFTA sodelovanje na notranjem trgu brez članstva v EU. Ni carinska unija in nima evra.'),
  Q('Kaj je Schengen?', [
    'Odprava mejnega nadzora na notranjih mejah (sporazuma iz 1985 in 1995), skupna pravila za zunanje meje in skupni vizumski režim',
    'Carinska unija med državami Beneluksa',
    'Skupna valuta evroobmočja',
    'Nadnacionalna sodna institucija EU'], 0,
    'Cilj: hitrejši pretok oseb; vključuje SIS, sodelovanje policij in pravosodnih organov.'),
  Q('Kakšen je namen CEFTA in BAFTA?', [
    'Nadomestiti članstvo v WTO',
    'Ustvariti carinsko unijo z lastno valuto',
    'Zaščititi domačo kmetijsko proizvodnjo pred EU',
    'Priprava držav na vstop v EU; z vstopom članstvo preneha'], 3,
    'CEFTA (1992, Višegrajska skupina) in BAFTA (1999, baltske države) sta prostotrgovinska sporazuma za pripravo na EU. Danes CEFTA vključuje države Zahodnega Balkana, Moldavijo in Kosovo.'),
  Q('Kaj velja za NAFTA (1994)?', [
    'ZDA, Kanada in Mehika; ne zajema kmetijskih proizvodov',
    'Vse države Južne Amerike; vključuje kmetijstvo',
    'ZDA in EU; vključuje storitve',
    'Mehika, Brazilija in Argentina; carinska unija'], 0,
    'NAFTA je prostotrgovinski sporazum. MERCOSUR je južnoameriški skupni trg (Brazilija, Argentina, Paragvaj, Urugvaj), ASEAN južnoazijsko združenje.'),
];

/* ---------- Preferencialna liberalizacija ---------- */
const pref = [
  Q('Kaj pomeni preferencialna (diskriminacijska) liberalizacija?', [
    'Znižanje carin za vse države v enaki meri',
    'Odprava carin samo med članicami, za tretje države pa se carine ohranijo',
    'Prepoved uvoza iz tretjih držav',
    'Znižanje carin samo za izvoz'], 1,
    'RTA diskriminirajo nečlanice. Za analizo potrebujemo vsaj tri države: dve članici in preostali svet.'),
  Q('Kaj je ustvarjanje trgovine (trade creation)?', [
    'Uvoz se preusmeri od cenejšega tujega izvoznika k dražjemu partnerju',
    'Uvoz iz partnerske države nadomesti dražjo domačo proizvodnjo; blaginja se poveča',
    'Država poveča izvoz v tretje države',
    'Država uvede carine na uvoz iz tretjih držav'], 1,
    'Po odpravi carin domači potrošniki kupijo od učinkovitejšega partnerja. Učinek je pozitiven (trade volume effect).'),
  Q('Kaj je preusmerjanje trgovine (trade diversion)?', [
    'Uvoz od cenejšega izvoznika iz tretje države se preusmeri k dražji članici, ker je ta brez carine',
    'Uvoz se poveča zaradi nižjih cen',
    'Država začne izvažati v partnersko državo',
    'Država prepove uvoz'], 0,
    'Cena na meji se zviša (border price effect), blaginja se zmanjša. Preusmerjanje je negativen učinek.'),
  Q('Kaj je Vinerjeva nejasnost?', [
    'Ni znano, ali bo država ratificirala sporazum',
    'Neto učinek integracije na blaginjo ni jasen: pozitiven učinek obsega trgovine proti negativnemu učinku višje cene na meji',
    'Ni jasno, ali je integracija carinska unija',
    'Ni znano, kdaj sporazum začne veljati'], 1,
    'Če je pozitivni učinek (ustvarjanje) večji od negativnega (preusmerjanje: izguba carinskih prihodkov H), je neto učinek pozitiven; sicer negativen.'),
  Q('Kako integracija vpliva na blaginjo partnerske in tretjih držav?', [
    'Partnerska država vedno pridobi, tretje države vedno izgubijo',
    'Obe skupini vedno pridobita',
    'Partnerska država izgubi, tretje države pridobijo',
    'Učinek je v obeh primerih nejasen'], 0,
    'Partner izvozi več po višji ceni (proizvajalčev presežek raste). Tretje države izgubijo zaradi manjšega obsega trgovine in nižje cene na meji.'),
  Q('Kaj se zgodi, če se država združi s stroškovno učinkovitejšo partnerko A (pred tem je uvažala iz A)?', [
    'Pride do preusmerjanja trgovine, blaginja se zmanjša',
    'Učinek je enak kot pri MFN liberalizaciji; ni preusmerjanja, blaginja se poveča',
    'Uvoz se zmanjša',
    'Cena na meji naraste'], 1,
    'Ker uvaža iz A že pred integracijo, se samo odpravi carina: nediskriminatorna in preferencialna liberalizacija sta enaki. Diskriminirana je le država B.'),
  Q('Pod katerimi pogoji člen 24 GATT dovoljuje FTA in carinsko unijo?', [
    'Samo če je članov manj kot pet',
    'Samo če je izvoz večji od uvoza',
    'Če sporazum zajame skoraj vso trgovino, se carine med članicami odpravijo v razumnem času in skupna zunanja carina v povprečju ni višja',
    'Če sporazum zajema le izbrane proizvode'], 2,
    'RTA kršijo načelo nediskriminacije, a so z določenimi pogoji (substantially all the trade) dovoljeni.'),
  Q('Kaj pravi Kemp-Wanov teorem?', [
    'Carinska unija vedno poveča blaginjo držav članic',
    'Z ustrezno prilagoditvijo skupne zunanje carine in prerazdelitvijo se lahko carinska unija izboljša za vse (pareto), tudi za svet, a je praktično težko izvedljiv',
    'Svetovna cena je vedno enaka domači ceni',
    'Preusmerjanje trgovine ne obstaja'], 1,
    'Da noben ne izgubi, je treba zunanje carine nastaviti tako, da ostali svet ne izgubi, in omogočiti prerazdelitev med članicami.'),
  Q('Kaj je ugotovila večina empiričnih študij o preferencialnih trgovinskih sporazumih?', [
    'Prevladuje ustvarjanje trgovine; preusmerjanja je malo ali nič',
    'Prevladuje preusmerjanje trgovine',
    'Sporazumi nimajo učinka na trgovino',
    'Vsi sporazumi zmanjšajo blaginjo'], 0,
    'Izjeme (Magee 2008): EU širitev 1986 in evropski sporazumi z vzhodnoevropskimi državami kažejo tudi preusmerjanje.'),
];

/* ---------- Računske (vaje 2) ---------- */
const rac = [
  Q('Francija in Švica: število proizvodov na delavca - ure (FR 3, CH 4), smuči (FR 6, CH 2). Katera država ima absolutno prednost pri urah in katera pri smučeh?', [
    'Ure Francija, smuči Švica',
    'Ure Švica, smuči Francija',
    'Obe Francija',
    'Obe Švica'], 1,
    'Absolutna prednost = višja produktivnost: ure CH (4 > 3), smuči FR (6 > 2). Tu se absolutne in relativne prednosti ujemajo.'),
  Q('Isto: v katerem proizvodu se specializirata državi in kaj izvažata?', [
    'Francija ure, Švica smuči',
    'Francija smuči, Švica ure',
    'Obe državi smuči',
    'Obe državi ure'], 1,
    'Oportunitetni strošek ure: FR 6/3 = 2 smuči, CH 2/4 = 0,5 smuči. Ure so v Švici relativno cenejše; smuči v Franciji.'),
  Q('Isto: v katerem intervalu (smuči za 1 uro) se oblikuje menjalno razmerje?', [
    'Med 2 in 6', 'Med 0,5 in 2', 'Med 1 in 3', 'Med 0,25 in 0,5'], 1,
    'Francija ne plača več kot 2 smuči za uro (domači strošek), Švica ne sprejme manj kot 0,5 smuči (domači strošek).'),
  Q('Isto: državi zamenjata 1 uro za 1 par smuči (MR = 1). Za koliko smuči je Francija na boljšem, če ure kupi, namesto da bi jih proizvedla sama?', [
    '0,5 pari smuči', '1 par smuči', '2 para smuči', '3 pari smuči'], 1,
    'Doma bi za 1 uro opustila 2 para smuči, z menjavo jo dobi za 1 par - prihrani 1 par. Švica dobi 1 par smuči namesto 0,5 para, torej pridobi 0,5 para.'),
  Q('Grčija (kopalke 1, brisače 5 na uro) in Portugalska (kopalke 2, brisače 6 na uro). Katera država ima absolutno prednost?', [
    'Grčija pri obeh',
    'Portugalska pri obeh',
    'Grčija pri kopalkah, Portugalska pri brisačah',
    'Portugalska pri kopalkah, Grčija pri brisačah'], 1,
    'Portugalska proizvede več pri obeh (2 > 1 in 6 > 5). Absolutne prednosti zato menjave ne razložijo, relativne pa.'),
  Q('Isto: katera država ima relativno prednost pri kopalkah in kateri je oportunitetni strošek 1 kopalke v obeh državah?', [
    'Grčija; 5 brisač v Grčiji, 3 brisače na Portugalskem',
    'Portugalska; 3 brisače na Portugalskem, 5 v Grčiji',
    'Portugalska; 6 brisač na Portugalskem, 5 v Grčiji',
    'Grčija; 1 brisača v Grčiji, 2 na Portugalskem'], 1,
    'Grčija: 1 kopalke = 5 brisač; Portugalska: 1 kopalke = 6/2 = 3 brisače. Portugalska je cenejša pri kopalkah, Grčija pri brisačah.'),
  Q('Isto: v katerem intervalu (brisač za 1 kopalke) se mora oblikovati menjalno razmerje?', [
    'Med 3 in 5', 'Med 1 in 3', 'Med 5 in 6', 'Med 2 in 6'], 0,
    'Portugalska ne sprejme manj kot 3 brisač za kopalke, Grčija ne plača več kot 5.'),
  Q('Isto: državi zamenjata 1 kopalke za 4 brisače. Kakšna je korist?', [
    'Portugalska dobi 1 brisačo več, kot bi jih lahko proizvedla; Grčija prihrani 1 brisačo',
    'Portugalska dobi 4 brisače več; Grčija prihrani 1 brisačo',
    'Samo Portugalska pridobi; Grčija ostane enaka',
    'Samo Grčija pridobi; Portugalska ostane enaka'], 0,
    'Portugalska: 4 namesto 3 brisač za kopalke (+1). Grčija: plača 4 namesto 5 brisač (prihranek 1). Obe pridobita - zato menjava poteka.'),
  Q('Italija (pomaranče 1/4 ure/kg, limone 1/3) in Španija (pomaranče 1/2, limone 2/3). Ali bo menjava potekala?', [
    'Da, Italija izvaža obe',
    'Da, Španija izvaža limone',
    'Ne, ker imata državi enaka menjalna razmerja (0,75 kg limon za 1 kg pomaranč)',
    'Ne, ker je Italija absolutno boljša pri obeh dobrinah'], 2,
    'Italija: (1/4)/(1/3) = 0,75; Španija: (1/2)/(2/3) = 0,75. Brez relativnih razlik ni koristi od menjave, čeprav je Italija absolutno boljša.'),
  Q('Izvoz blaga Slovenije 2025 je 72,1 mrd €, uvoz 70,6 mrd €. Kolikšna je pokritost uvoza z izvozom?', [
    `${dec(72.1 / 70.6 * 100, 1)} %`,
    `${dec(70.6 / 72.1 * 100, 1)} %`,
    `${dec((72.1 - 70.6), 1)} %`,
    `${dec((72.1 + 70.6) / 70.6 * 100, 1)} %`], 0,
    'Pokritost = izvoz/uvoz · 100 = 72,1/70,6 = 102,1 %. Nad 100 % pomeni presežek v blagovni menjavi.'),
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
