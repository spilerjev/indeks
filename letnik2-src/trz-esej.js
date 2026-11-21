/* Temelji trženja - pogoste esejske teme izpita, pretvorjene v izbirna vprašanja z lastnimi primeri (odgovori po učbeniku). */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

module.exports = [
  withId('q1tdzylb', { q: "Športna znamka prodaja tri linije: tekaške copate, majice in nahrbtnike. Model copat Strela je na voljo v modri, črni, rdeči in beli barvi, vsaka barva v ozki in široki izvedbi. Kolikšna je globina izdelčnega spleta za copate Strela?",
      options: ["8","3","6","4"],
      correct: 0,
      explanation: "Globina = število različic posameznega izdelka: 4 barve · 2 izvedbi = 8. Tri linije (copati, majice, nahrbtniki) so širina spleta; dolžina je skupno število artiklov v vseh linijah, skladnost je opisna (visoka/srednja/nizka). 6 = barve + izvedbe (sešteto namesto zmnoženo), 4 = samo barve." }),
  withId('qerfx07', Q('Katera razsežnost izdelčnega spleta se izraža opisno (npr. visoka, nizka) in ne s številom?', [
    'Skladnost', 'Širina', 'Dolžina', 'Globina'], 0,
    'Skladnost pove, kako tesno so povezane skupine izdelkov (visoka, srednja, nizka); širina, dolžina in globina so števila.')),
  withId('q11cedp0', Q('Kupec avtomobila se pred nakupom posvetuje s prijatelji, bere teste v revijah, obišče salon in opravi testno vožnjo. Katere vrste virov informacij uporablja?', [
    'Osebne, poslovne, izkustvene in javne', 'Primarne, sekundarne in terciarne', 'Formalne, neformalne in interne', 'Notranje, zunanje in posredovane'], 0,
    'Osebni (družina, prijatelji), poslovni (oglasi, prodajalci), javni (mediji, organizacije porabnikov), izkustveni (lastna uporaba). Primarni/sekundarni so podatki v trženjskem raziskovanju.')),
  withId('qwjpqfr', Q('Katere štiri značilnosti ločijo storitve od izdelkov?', [
    'Neopredmetenost, neločljivost, spremenljivost, minljivost', 'Zanesljivost, odzivnost, zaupanje, empatija', 'Nedeljivost, trajnost, standardnost, dostopnost', 'Neopredmetenost, skladiščenje, cena, kakovost'], 0,
    'Zanesljivost, odzivnost, zbujanje zaupanja, empatija in fizični dokazi so določljivke KAKOVOSTI storitev (SERVQUAL), ne značilnosti.')),
  withId('q470tio', { q: "Pri frizerju je rezultat odvisen od tega, kateri frizer in kdaj vas striže. Katera značilnost storitev je to in kako jo omilimo?",
      options: ["Spremenljivost - z enotnimi standardi dela, rednim usposabljanjem frizerjev in zbiranjem mnenj strank","Minljivost - z nižjimi cenami ob slabo zasedenih terminih in s spletnim naročanjem","Neločljivost - z več frizerji na izmeno in s krajšim časom, ki ga stranka preživi v salonu","Neopredmetenost - z vidnimi znaki kakovosti: fotografijami pričesk, lepim salonom in mnenji strank"],
      correct: 0,
      explanation: "Spremenljivost (heterogenost) omilimo s kadri, standardizacijo in nadzorom (sistem pritožb, anketiranje, primerjalno nakupovanje)." }),
  withId('q1v07b4k', { q: "Prodaja pralnega praška Bel že tretje leto stagnira: trg je nasičen, kupci izdelek dobro poznajo, konkurenti ponujajo skoraj enake praške. Vodstvo želi to stopnjo življenjskega cikla podaljšati. Katere tri skupine strategij ima na voljo?",
      options: ["Sprememba trga, sprememba izdelka, sprememba trženjskega spleta","Hitro posnemanje smetane, hiter prodor, počasen prodor","Umik, žetev, nišno pozicioniranje","Širitev blagovne znamke, licenciranje, franšizing"],
      correct: 0,
      explanation: "Stagnacija prodaje, nasičen trg in podobni tekmeci kažejo na stopnjo ZRELOSTI. Strategije: sprememba trga (novi porabniki, večja poraba), izdelka (nove lastnosti, kakovost, slog) in spleta (cena, tržne poti, komuniciranje). Posnemanje smetane in prodor sta strategiji UVAJANJA." }),
  withId('q1f6tu07', Q('Avtomobil: prevoz je jedro, klimatska naprava pričakovani izdelek, brezplačen servis razširjeni izdelek. Na kateri ravni najpogosteje poteka konkurenca v razvitih državah?', [
    'Na ravni razširjenega izdelka', 'Na ravni jedra izdelka', 'Na ravni pričakovanega izdelka', 'Na ravni potencialnega izdelka'], 0,
    'V razvitih državah se konkurenca odvija predvsem na ravni razširjenega izdelka, v manj razvitih na ravni pričakovanega.')),
  withId('q1lgov43', Q('Na katere ravni odziva cilja trženjsko komuniciranje in katera je najpomembnejša za trgovce na drobno?', [
    'Spoznavna, čustvena, vedenjska; trgovci na drobno vedenjsko (nakup)', 'Spoznavna, čustvena, vedenjska; trgovci na drobno spoznavno (zavedanje)', 'Racionalna, čustvena, moralna; trgovci na drobno racionalno', 'Pozornost, zanimanje, želja; trgovci na drobno pozornost'], 0,
    'Porabniki izdelke v trgovini že poznajo, zato trgovec spodbuja neposreden nakup (vedenjski odziv). Razumski, čustveni in moralni so POZIVI v sporočilu.')),
  withId('qwiy6xb', Q('Katere strategije izbire ciljnih trgov poznamo?', [
    'Nediferencirano, diferencirano, koncentrirano in mikro trženje', 'Množično, nišno in individualno trženje', 'Geografsko, demografsko, psihografsko in vedenjsko trženje', 'Notranje, zunanje in interaktivno trženje'], 0,
    'Nediferencirano (ena ponudba za ves trg), diferencirano (več segmentov, vsak svoj splet - npr. Coca-Cola), koncentrirano/nišno (Akrapovič), mikro (lokalno, individualno).')),
  withId('qjqxrfo', { q: "Majhna pivovarna z omejenim kapitalom uspešno prodaja craft piva, zdaj pa razmišlja o vstopu na trg običajnega svetlega piva, kjer prevladujeta dva velika proizvajalca. Ali je pravilno izbrati ta segment, ker ima večji tržni potencial?",
      options: ["Ni nujno - največji segmenti imajo največ konkurentov, manjša podjetja so pogosto uspešnejša v manjših","Da - večji tržni potencial vedno pomeni večji dobiček, ne glede na konkurenco in vire podjetja","Ne - vedno je treba izbrati manjši segment, ker so stroški vstopa nižji in zvestoba kupcev večja","Da - velikost je edini kriterij privlačnosti segmenta, ki ga teorija ciljnega trženja priznava"],
      correct: 0,
      explanation: "Privlačnost segmenta ocenjujemo po velikosti in rasti, konkurenci ter skladnosti s cilji in viri podjetja. Za pivovarno z omejenim kapitalom je segment z dvema velikima tekmecema kljub velikosti lahko manj privlačen od manjšega, kjer ima prednost." }),
  withId('qgsmhdk', Q('Kje vse lahko nastanejo vrzeli v modelu kakovosti storitev (5 vrzeli)?', [
    'Pričakovanja-zaznava vodstva, zaznava-standardi, standardi-izvedba, izvedba-komuniciranje, pričakovana-zaznana storitev', 'Cena-vrednost, izdelek-storitev, prodaja-poprodajni servis, oglas-resničnost, prvi nakup-ponovni nakup', 'Zavedanje-znanje, znanje-všečnost, všečnost-naklonjenost, naklonjenost-prepričanje, prepričanje-nakup', 'Neopredmetenost-dokazi, neločljivost-vpletenost, spremenljivost-standardi, minljivost-rezervacije, zaupanje-odzivnost'], 0,
    'Prve štiri so na strani ponudnika (2., 3. in 4. so odvisne od njega), peta (med zaznano in pričakovano storitvijo) je na strani porabnika in je posledica prejšnjih.')),
  withId('q9jbr4f', { q: "Proizvajalec kolesarske opreme posluje po konceptu IZDELKA. Kaj je zanj značilno in v kaj lahko vodi?",
      options: ["Prepričan je, da kupci želijo najboljše in tehnično najnaprednejše izdelke, zato razvija brez raziskav potreb; nevarnost je trženjska kratkovidnost","Vlaga v prodajno osebje in glasno oglaševanje, da proda zaloge, ki jih kupci sami ne bi kupili; nevarnost je nezaupanje kupcev","Izdelke izdeluje čim ceneje v velikih serijah in jih prodaja v čim več trgovinah; nevarnost so cenovne vojne s konkurenti","Najprej sprašuje kolesarje o njihovih potrebah in razvija opremo po njihovi meri; posledica je dolgoročna zvestoba kupcev"],
      correct: 0,
      explanation: "Izdelčna usmeritev: \"porabniki hočejo najboljši izdelek\" - managerji mislijo, da vedo, kaj si porabniki želijo, a jih ne vprašajo." }),
  withId('q1honuw1', { q: "Prodajalec časopisnih naročnin posluje po PRODAJNEM konceptu. Kaj je zanj značilno?",
      options: ["Naročnine ponuja po telefonu in od vrat do vrat, ker jih bralci sami od sebe ne bi naročili (pogosto pri neiskanih izdelkih)","Najprej razišče, katere vsebine bralci želijo, in jim nato prilagodi ponudbo in obliko naročnin","Vlaga predvsem v kakovost novinarstva in oblikovanja, ker meni, da se dober časopis vedno proda sam","S sodobno tiskarno zniža stroške in ponudi najcenejšo naročnino v državi, ker kupci želijo nizke cene"],
      correct: 0,
      explanation: "Prodajna usmeritev je pogosta pri neiskanih izdelkih in ob presežnih zmogljivostih; tveganje je odpor in nezaupanje javnosti do trženja." }),
  withId('qkl100r', Q('Kako porabnik oblikuje zaznano vrednost ponudbe?', [
    'Razlika med porabnikovo oceno vseh koristi (izdelek, dostopnost, izkušnja) in vseh stroškov ponudbe', 'Razlika med prodajno ceno izdelka in stroški njegove proizvodnje, kot jo zazna porabnik', 'Vsota denarnih in nedenarnih stroškov nakupa (čas, napor, psihični stroški), ki jih zazna porabnik', 'Ocena kakovosti in koristi izdelka, ki jo oblikujejo strokovnjaki in jo porabnik prevzame'], 0,
    'Vrednost zvišamo s povečanjem koristi ali zmanjšanjem stroškov (cena, čas, napor, psihični stroški).')),
  withId('q13bz7dd', Q('Kako glede na dolžino delimo tržne poti (primer pražarne kave)?', [
    'Neposredna (pražarna → porabnik), posredna ene ravni (pražarna → trgovina → porabnik) in dveh ravni (pražarna → veletrgovec → trgovina → porabnik)', 'Ekskluzivna (en posrednik na območju), selektivna (nekaj izbranih posrednikov) in intenzivna (čim več posrednikov) distribucija kave', 'Ustaljena tržna pot, navpični tržni sistem (korporacijski, pogodbeni, administrativni), vodoravni tržni sistem in kombinirana tržna pot', 'Fizična pot (prevoz in skladiščenje knjig), informacijska pot (naročila in podatki o prodaji) in finančna pot (plačila založniku)'], 0,
    'Ravni = dolžina tržne poti (število posrednikov). Ekskluzivna/selektivna/intenzivna je ŠIRINA (število posrednikov na ravni); ustaljena/navpična/vodoravna/kombinirana so SISTEMI tržnih poti.')),
  withId('q1qi3yc2', Q('Po čem se oskrbna veriga razlikuje od tržne poti?', [
    'Oskrbna veriga je širši pojem: vsa podjetja in procesi od dobavitelja do porabnika; tržna pot je del, ki dosega ciljni trg', 'Tržna pot je širši pojem, ker zajema vse funkcije trženja; oskrbna veriga zajema le fizično logistiko in prevoz', 'Pojma sta sopomenki in opisujeta isti pretok materiala, informacij in plačil od dobavitelja do porabnika', 'Oskrbna veriga zajema samo odnose z dobavitelji, tržna pot pa samo odnose s končnimi kupci in posredniki'], 0,
    'Funkcije tržnih poti: fizična distribucija, informiranje, komuniciranje, vzpostavljanje stikov, prilagajanje ponudbe, pogajanja.')),
  withId('q19ha3o3', Q('Fitnes ima nižje cene dopoldne, cenejše članarine za študente in akcijske ponedeljke. Kako imenujemo to strategijo?', [
    'Določanje razločevalnih (diskriminacijskih) cen', 'Psihološko določanje cen (npr. 9,99)', 'Določanje cen na podlagi zaznane vrednosti', 'Dinamično določanje cen (sprotno prilagajanje)'], 0,
    'Osnovna cena se prilagodi razlikam med porabniki, lokacijami, časom ali različicami izdelka.')),
  withId('qzze6ce', Q('Proizvajalec pločevine za avtomobilsko industrijo opazi, da kupci ob podražitvi ne kupijo bistveno manj. Kaj to pove o povpraševanju na medorganizacijskem trgu?', [
    'Spremembe cen malo vplivajo na obseg povpraševanja, ker kupec surovino potrebuje za proizvodnjo', 'Povpraševanje se močno odziva na vsako spremembo cene, ker kupci hitro zamenjajo dobavitelja', 'Povpraševanje je stalno in neodvisno od povpraševanja končnih porabnikov po končnih izdelkih', 'Kupci vedno izberejo najcenejšega dobavitelja, zato je povpraševanje popolnoma cenovno elastično'], 0,
    'Povpraševanje je izpeljano iz povpraševanja končnih porabnikov in kratkoročno neprožno; proizvajalci ne morejo hitro spremeniti postopkov.')),
];
