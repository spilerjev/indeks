/* Temelji trženja - pogoste esejske teme izpita, pretvorjene v izbirna vprašanja z lastnimi primeri (odgovori po učbeniku). */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

module.exports = [
  Q('Šampon prodajamo v 4 vonjih in 2 velikostih plastenke. Kolikšna je globina izdelčnega spleta za ta šampon?', [
    '8', '6', '4', '2'], 0,
    'Globina = število različic posameznega izdelka: 4 · 2 = 8. Širina = število skupin izdelkov, dolžina = skupno število artiklov, skladnost je opisna (visoka/srednja/nizka).'),
  Q('Katera razsežnost izdelčnega spleta se izraža opisno (npr. visoka, nizka) in ne s številom?', [
    'Skladnost', 'Širina', 'Dolžina', 'Globina'], 0,
    'Skladnost pove, kako tesno so povezane skupine izdelkov (visoka, srednja, nizka); širina, dolžina in globina so števila.'),
  Q('Kupec avtomobila se pred nakupom posvetuje s prijatelji, bere teste v revijah, obišče salon in opravi testno vožnjo. Katere vrste virov informacij uporablja?', [
    'Osebne, poslovne, izkustvene in javne', 'Primarne, sekundarne in terciarne', 'Formalne, neformalne in interne', 'Notranje, zunanje in posredovane'], 0,
    'Osebni (družina, prijatelji), poslovni (oglasi, prodajalci), javni (mediji, organizacije porabnikov), izkustveni (lastna uporaba). Primarni/sekundarni so podatki v trženjskem raziskovanju.'),
  Q('Katere štiri značilnosti ločijo storitve od izdelkov?', [
    'Neopredmetenost, neločljivost, spremenljivost, minljivost', 'Zanesljivost, odzivnost, zaupanje, empatija', 'Nedeljivost, trajnost, standardnost, dostopnost', 'Neopredmetenost, skladiščenje, cena, kakovost'], 0,
    'Zanesljivost, odzivnost, zbujanje zaupanja, empatija in fizični dokazi so določljivke KAKOVOSTI storitev (SERVQUAL), ne značilnosti.'),
  Q('Pri frizerju je rezultat odvisen od tega, kateri frizer in kdaj vas striže. Katera značilnost storitev je to in kako jo omilimo?', [
    'Spremenljivost - z izbiro in usposabljanjem kadrov, standardizacijo postopkov in spremljanjem zadovoljstva', 'Minljivost - z razlikovanjem cen, sistemom rezervacij in prilagajanjem zmogljivosti povpraševanju', 'Neločljivost - z vključevanjem porabnika v izvedbo, hitrejšim delom in delom z večjimi skupinami', 'Neopredmetenost - s fizičnimi dokazi, urejeno ordinacijo, blagovno znamko in priporočili'], 0,
    'Spremenljivost (heterogenost) omilimo s kadri, standardizacijo in nadzorom (sistem pritožb, anketiranje, primerjalno nakupovanje).'),
  Q('Proizvajalec ledenega čaja je na stopnji ZRELOSTI življenjskega cikla izdelka. Katere tri strategije ima na voljo?', [
    'Sprememba trga, sprememba izdelka, sprememba trženjskega spleta', 'Hitro posnemanje smetane, hiter prodor, počasen prodor', 'Umik, žetev, nišno pozicioniranje', 'Širitev blagovne znamke, licenciranje, franšizing'], 0,
    'Sprememba trga (novi porabniki, večja poraba), izdelka (nove lastnosti, kakovost, slog) in spleta (cena, tržne poti, komuniciranje). Posnemanje smetane in prodor sta strategiji UVAJANJA.'),
  Q('Avtomobil: prevoz je jedro, klimatska naprava pričakovani izdelek, brezplačen servis razširjeni izdelek. Na kateri ravni najpogosteje poteka konkurenca v razvitih državah?', [
    'Na ravni razširjenega izdelka', 'Na ravni jedra izdelka', 'Na ravni pričakovanega izdelka', 'Na ravni potencialnega izdelka'], 0,
    'V razvitih državah se konkurenca odvija predvsem na ravni razširjenega izdelka, v manj razvitih na ravni pričakovanega.'),
  Q('Na katere ravni odziva cilja trženjsko komuniciranje in katera je najpomembnejša za trgovce na drobno?', [
    'Spoznavna, čustvena, vedenjska; trgovci na drobno vedenjsko (nakup)', 'Spoznavna, čustvena, vedenjska; trgovci na drobno spoznavno (zavedanje)', 'Racionalna, čustvena, moralna; trgovci na drobno racionalno', 'Pozornost, zanimanje, želja; trgovci na drobno pozornost'], 0,
    'Porabniki izdelke v trgovini že poznajo, zato trgovec spodbuja neposreden nakup (vedenjski odziv). Razumski, čustveni in moralni so POZIVI v sporočilu.'),
  Q('Katere strategije izbire ciljnih trgov poznamo?', [
    'Nediferencirano, diferencirano, koncentrirano in mikro trženje', 'Množično, nišno in individualno trženje', 'Geografsko, demografsko, psihografsko in vedenjsko trženje', 'Notranje, zunanje in interaktivno trženje'], 0,
    'Nediferencirano (ena ponudba za ves trg), diferencirano (več segmentov, vsak svoj splet - npr. Coca-Cola), koncentrirano/nišno (Akrapovič), mikro (lokalno, individualno).'),
  Q('Mlado podjetje izbira med velikim segmentom z močno konkurenco in manjšim segmentom brez močnih tekmecev. Ali je pravilno izbrati večjega, ker ima večji potencial?', [
    'Ni nujno - največji segmenti imajo največ konkurentov, manjša podjetja so pogosto uspešnejša v manjših', 'Da - večji tržni potencial vedno pomeni večji dobiček, ne glede na konkurenco in vire podjetja', 'Ne - vedno je treba izbrati manjši segment, ker so stroški vstopa nižji in zvestoba kupcev večja', 'Da - velikost je edini kriterij privlačnosti segmenta, ki ga teorija ciljnega trženja priznava'], 0,
    'Privlačnost segmenta ocenjujemo po velikosti in rasti, konkurenci ter skladnosti s cilji in viri podjetja.'),
  Q('Kje vse lahko nastanejo vrzeli v modelu kakovosti storitev (5 vrzeli)?', [
    'Pričakovanja-zaznava vodstva, zaznava-standardi, standardi-izvedba, izvedba-komuniciranje, pričakovana-zaznana storitev', 'Cena-vrednost, izdelek-storitev, prodaja-poprodajni servis, oglas-resničnost, prvi nakup-ponovni nakup', 'Zavedanje-znanje, znanje-všečnost, všečnost-naklonjenost, naklonjenost-prepričanje, prepričanje-nakup', 'Neopredmetenost-dokazi, neločljivost-vpletenost, spremenljivost-standardi, minljivost-rezervacije, zaupanje-odzivnost'], 0,
    'Prve štiri so na strani ponudnika (2., 3. in 4. so odvisne od njega), peta (med zaznano in pričakovano storitvijo) je na strani porabnika in je posledica prejšnjih.'),
  Q('Proizvajalec kolesarske opreme posluje po konceptu IZDELKA. Kaj je zanj značilno in v kaj lahko vodi?', [
    'Poudarek na kakovosti in tehnični izpopolnjenosti brez spraševanja porabnikov; vodi v trženjsko kratkovidnost', 'Agresivna prodaja in množično oglaševanje ne glede na želje porabnikov; vodi v odpor javnosti do trženja', 'Nizki stroški, množična proizvodnja in široka distribucija cenenih aparatov; vodi v cenovne vojne', 'Osredotočenost na potrebe porabnikov in iskanje pravih izdelkov zanje; vodi v dolgoročno zvestobo'], 0,
    'Izdelčna usmeritev: "porabniki hočejo najboljši izdelek" - managerji mislijo, da vedo, kaj si porabniki želijo, a jih ne vprašajo.'),
  Q('Prodajalec časopisnih naročnin posluje po PRODAJNEM konceptu. Kaj je zanj značilno?', [
    'Porabniki sami ne bi kupili dovolj, zato jih privablja z agresivno prodajo (tipično za neiskane izdelke)', 'Išče prave zavarovalne produkte za potrebe porabnikov in gradi dolgoročne odnose z njimi', 'Poudarja kakovost, tehnično izpopolnjenost in inovativnost zavarovalnih produktov ne glede na ceno', 'Znižuje stroške in cene polic ter jih ponuja prek vseh prodajnih poti, ker porabniki želijo poceni izdelke'], 0,
    'Prodajna usmeritev je pogosta pri neiskanih izdelkih (življenjska zavarovanja) in ob presežnih zmogljivostih; tveganje je odpor javnosti do trženja.'),
  Q('Kako porabnik oblikuje zaznano vrednost ponudbe?', [
    'Razlika med porabnikovo oceno vseh koristi (izdelek, dostopnost, izkušnja) in vseh stroškov ponudbe', 'Razlika med prodajno ceno izdelka in stroški njegove proizvodnje, kot jo zazna porabnik', 'Vsota denarnih in nedenarnih stroškov nakupa (čas, napor, psihični stroški), ki jih zazna porabnik', 'Ocena kakovosti in koristi izdelka, ki jo oblikujejo strokovnjaki in jo porabnik prevzame'], 0,
    'Vrednost zvišamo s povečanjem koristi ali zmanjšanjem stroškov (cena, čas, napor, psihični stroški).'),
  Q('Kako glede na dolžino delimo tržne poti (primer pražarne kave)?', [
    'Neposredna (pražarna → porabnik), posredna ene ravni (pražarna → trgovina → porabnik) in dveh ravni (pražarna → veletrgovec → trgovina → porabnik)', 'Ekskluzivna (en posrednik na območju), selektivna (nekaj izbranih posrednikov) in intenzivna (čim več posrednikov) distribucija kave', 'Ustaljena tržna pot, navpični tržni sistem (korporacijski, pogodbeni, administrativni), vodoravni tržni sistem in kombinirana tržna pot', 'Fizična pot (prevoz in skladiščenje knjig), informacijska pot (naročila in podatki o prodaji) in finančna pot (plačila založniku)'], 0,
    'Ravni = dolžina tržne poti (število posrednikov). Ekskluzivna/selektivna/intenzivna je ŠIRINA (število posrednikov na ravni); ustaljena/navpična/vodoravna/kombinirana so SISTEMI tržnih poti.'),
  Q('Po čem se oskrbna veriga razlikuje od tržne poti?', [
    'Oskrbna veriga je širši pojem: vsa podjetja in procesi od dobavitelja do porabnika; tržna pot je del, ki dosega ciljni trg', 'Tržna pot je širši pojem, ker zajema vse funkcije trženja; oskrbna veriga zajema le fizično logistiko in prevoz', 'Pojma sta sopomenki in opisujeta isti pretok materiala, informacij in plačil od dobavitelja do porabnika', 'Oskrbna veriga zajema samo odnose z dobavitelji, tržna pot pa samo odnose s končnimi kupci in posredniki'], 0,
    'Funkcije tržnih poti: fizična distribucija, informiranje, komuniciranje, vzpostavljanje stikov, prilagajanje ponudbe, pogajanja.'),
  Q('Fitnes ima nižje cene dopoldne, cenejše članarine za študente in akcijske ponedeljke. Kako imenujemo to strategijo?', [
    'Določanje razločevalnih (diskriminacijskih) cen', 'Psihološko določanje cen (npr. 9,99)', 'Določanje cen na podlagi zaznane vrednosti', 'Dinamično določanje cen (sprotno prilagajanje)'], 0,
    'Osnovna cena se prilagodi razlikam med porabniki, lokacijami, časom ali različicami izdelka.'),
  Q('Proizvajalec pločevine za avtomobilsko industrijo opazi, da kupci ob podražitvi ne kupijo bistveno manj. Kaj to pove o povpraševanju na medorganizacijskem trgu?', [
    'Spremembe cen malo vplivajo na obseg povpraševanja, ker kupec surovino potrebuje za proizvodnjo', 'Povpraševanje se močno odziva na vsako spremembo cene, ker kupci hitro zamenjajo dobavitelja', 'Povpraševanje je stalno in neodvisno od povpraševanja končnih porabnikov po končnih izdelkih', 'Kupci vedno izberejo najcenejšega dobavitelja, zato je povpraševanje popolnoma cenovno elastično'], 0,
    'Povpraševanje je izpeljano iz povpraševanja končnih porabnikov in kratkoročno neprožno; proizvajalci ne morejo hitro spremeniti postopkov.'),
];
