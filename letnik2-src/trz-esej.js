/* Temelji trženja - esejska vprašanja s starih izpitov (EF Zapiski/2. letnik/Temelji trženja/Izpiti/TRŽENJE-IZPIT.docx, razdelek
   "Esejska vprašanja iz izpitov"), pretvorjena v izbirna vprašanja po učbeniških odgovorih. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

module.exports = [
  Q('(Izpitni esej) Pijačo prodajamo v 2 okusih in 3 velikostih steklenice. Kolikšna je globina izdelčnega spleta za to pijačo?', [
    '6', '5', '2', '3'], 0,
    'Globina = število različic posameznega izdelka: 2 · 3 = 6. Širina = število skupin izdelkov, dolžina = skupno število artiklov, skladnost je opisna (visoka/srednja/nizka).'),
  Q('(Izpitni esej) Katera razsežnost izdelčnega spleta je edina podana OPISNO, ne številčno?', [
    'Skladnost', 'Širina', 'Dolžina', 'Globina'], 0,
    'Skladnost pove, kako tesno so povezane skupine izdelkov (visoka, srednja, nizka); širina, dolžina in globina so števila.'),
  Q('(Izpitni esej) Katere vire informacij uporablja porabnik v procesu nakupnega odločanja?', [
    'Osebne, poslovne, izkustvene in javne', 'Primarne in sekundarne', 'Formalne in neformalne', 'Notranje in zunanje'], 0,
    'Osebni (družina, prijatelji), poslovni (oglasi, prodajalci), javni (mediji, organizacije porabnikov), izkustveni (lastna uporaba). Primarni/sekundarni so podatki v trženjskem raziskovanju.'),
  Q('(Izpitni esej) Katere so štiri temeljne značilnosti storitev?', [
    'Neopredmetenost, neločljivost, spremenljivost, minljivost', 'Zanesljivost, odzivnost, zaupanje, empatija', 'Nedeljivost, trajnost, standardnost, dostopnost', 'Neopredmetenost, skladiščenje, cena, kakovost'], 0,
    'Zanesljivost, odzivnost, zbujanje zaupanja, empatija in fizični dokazi so določljivke KAKOVOSTI storitev (SERVQUAL), ne značilnosti.'),
  Q('(Izpitni esej) Zobozdravnik: kakovost je odvisna od tega, kdo, kje in kdaj izvaja storitev. Katera značilnost storitev je to in kako jo omilimo?', [
    'Spremenljivost - z izbiro in usposabljanjem kadrov, standardizacijo postopkov in spremljanjem zadovoljstva', 'Minljivost - z razlikovanjem cen in rezervacijami', 'Neločljivost - z vključevanjem porabnika v izvedbo', 'Neopredmetenost - s fizičnimi dokazi in blagovno znamko'], 0,
    'Spremenljivost (heterogenost) omilimo s kadri, standardizacijo in nadzorom (sistem pritožb, anketiranje, primerjalno nakupovanje).'),
  Q('(Izpitni esej) Katere tri strategije ima prodajalec sladoleda na stopnji ZRELOSTI življenjskega cikla izdelka?', [
    'Sprememba trga, sprememba izdelka, sprememba trženjskega spleta', 'Hitro posnemanje smetane, hiter prodor, počasen prodor', 'Umik, žetev, nišno pozicioniranje', 'Širitev blagovne znamke, licenciranje, franšizing'], 0,
    'Sprememba trga (novi porabniki, večja poraba), izdelka (nove lastnosti, kakovost, slog) in spleta (cena, tržne poti, komuniciranje). Posnemanje smetane in prodor sta strategiji UVAJANJA.'),
  Q('(Izpitni esej) Mobilni telefon: telefoniranje je jedro izdelka, fotoaparat pričakovani izdelek, kompas razširjeni izdelek. Na kateri ravni poteka konkurenca v razvitih državah?', [
    'Na ravni razširjenega izdelka', 'Na ravni jedra izdelka', 'Na ravni pričakovanega izdelka', 'Na ravni potencialnega izdelka'], 0,
    'V razvitih državah se konkurenca odvija predvsem na ravni razširjenega izdelka, v manj razvitih na ravni pričakovanega.'),
  Q('(Izpitni esej) Katere so ravni odziva v trženjskem komuniciranju in katero najpogosteje ciljajo trgovci na drobno?', [
    'Spoznavna, čustvena, vedenjska; trgovci na drobno vedenjsko (nakup)', 'Spoznavna, čustvena, vedenjska; trgovci na drobno spoznavno (zavedanje)', 'Racionalna, čustvena, moralna; trgovci na drobno racionalno', 'Pozornost, zanimanje, želja; trgovci na drobno pozornost'], 0,
    'Porabniki izdelke v trgovini že poznajo, zato trgovec spodbuja neposreden nakup (vedenjski odziv). Razumski, čustveni in moralni so POZIVI v sporočilu.'),
  Q('(Izpitni esej) Katere so strategije izbora ciljnih trgov?', [
    'Nediferencirano, diferencirano, koncentrirano in mikro trženje', 'Množično, nišno in individualno trženje', 'Geografsko, demografsko, psihografsko in vedenjsko trženje', 'Notranje, zunanje in interaktivno trženje'], 0,
    'Nediferencirano (ena ponudba za ves trg), diferencirano (več segmentov, vsak svoj splet - npr. Coca-Cola), koncentrirano/nišno (Akrapovič), mikro (lokalno, individualno).'),
  Q('(Izpitni esej) Podjetje je med dvema segmentoma izbralo večjega z večjim tržnim potencialom. Je ravnalo pravilno?', [
    'Ni nujno - največji segmenti imajo največ konkurentov, manjša podjetja so pogosto uspešnejša v manjših segmentih', 'Da - večji tržni potencial vedno pomeni večji dobiček', 'Ne - vedno je treba izbrati manjši segment', 'Da - velikost je edini kriterij privlačnosti segmenta'], 0,
    'Privlačnost segmenta ocenjujemo po velikosti in rasti, konkurenci ter skladnosti s cilji in viri podjetja.'),
  Q('(Izpitni esej) Katere so vrzeli v modelu kakovosti storitev (5 vrzeli)?', [
    'Pričakovanja-zaznava vodstva, zaznava-standardi, standardi-izvedba, izvedba-komuniciranje, pričakovana-zaznana storitev', 'Cena-vrednost, izdelek-storitev, prodaja-servis, oglas-resničnost, prvi-ponovni nakup', 'Vstop, rast, zrelost, upadanje, umik', 'Neopredmetenost, neločljivost, spremenljivost, minljivost, nedeljivost'], 0,
    'Prve štiri so na strani ponudnika (2., 3. in 4. so odvisne od njega), peta (med zaznano in pričakovano storitvijo) je na strani porabnika in je posledica prejšnjih.'),
  Q('(Izpitni esej) Proizvajalec gospodinjskih aparatov posluje po konceptu IZDELKA. Kaj je zanj značilno in v kaj lahko vodi?', [
    'Poudarek na kakovosti in tehnični izpopolnjenosti brez spraševanja porabnikov; vodi v trženjsko kratkovidnost', 'Agresivna prodaja in oglaševanje; vodi v odpor do trženja', 'Nizki stroški in množična proizvodnja; vodi v cenovne vojne', 'Osredotočenost na potrebe porabnikov; vodi v zvestobo'], 0,
    'Izdelčna usmeritev: "porabniki hočejo najboljši izdelek" - managerji mislijo, da vedo, kaj si porabniki želijo, a jih ne vprašajo.'),
  Q('(Izpitni esej) Zavarovalnica posluje po PRODAJNEM konceptu. Kaj je zanjo značilno?', [
    'Porabniki sami ne bi kupili dovolj, zato jih privablja z agresivno prodajo in komuniciranjem (tipično za neiskane izdelke)', 'Išče prave izdelke za potrebe porabnikov', 'Poudarja kakovost in inovativnost zavarovanj', 'Znižuje stroške in cene polic'], 0,
    'Prodajna usmeritev je pogosta pri neiskanih izdelkih (življenjska zavarovanja) in ob presežnih zmogljivostih; tveganje je odpor javnosti do trženja.'),
  Q('(Izpitni esej) Kaj je zaznana vrednost v očeh porabnika in iz česa je sestavljena?', [
    'Razlika med porabnikovo oceno vseh koristi (celotna vrednost: izdelek, dostopnost, izkušnja) in vseh stroškov ponudbe', 'Razlika med ceno in stroški proizvodnje izdelka', 'Vsota denarnih in nedenarnih stroškov nakupa', 'Ocena kakovosti izdelka s strani strokovnjakov'], 0,
    'Vrednost zvišamo s povečanjem koristi ali zmanjšanjem stroškov (cena, čas, napor, psihični stroški).'),
  Q('(Izpitni esej) Kako glede na dolžino delimo tržne poti (primer knjige)?', [
    'Neposredna (založnik → porabnik prek spleta), posredna ene ravni (založnik → knjigarna → porabnik), posredna dveh ravni (založnik → zastopnik/grosist → knjigarna → porabnik)', 'Ekskluzivna, selektivna in intenzivna', 'Ustaljena, navpična, vodoravna in kombinirana', 'Fizična, informacijska in finančna'], 0,
    'Ravni = dolžina tržne poti (število posrednikov). Ekskluzivna/selektivna/intenzivna je ŠIRINA (število posrednikov na ravni); ustaljena/navpična/vodoravna/kombinirana so SISTEMI tržnih poti.'),
  Q('(Izpitni esej) Kakšna je razlika med oskrbno verigo in tržno potjo?', [
    'Oskrbna veriga je širši pojem: vsa podjetja in procesi od dobavitelja do porabnika (pretok materiala, informacij, plačil); tržna pot je del, ki dosega ciljni trg', 'Tržna pot je širši pojem, oskrbna veriga pa zajema le logistiko', 'Pojma sta sopomenki', 'Oskrbna veriga zajema le dobavitelje, tržna pot le kupce'], 0,
    'Funkcije tržnih poti: fizična distribucija, informiranje, komuniciranje, vzpostavljanje stikov, prilagajanje ponudbe, pogajanja.'),
  Q('(Izpitni esej) Kino razlikuje cene po dnevu (kino torek), delu dneva (dopoldne ceneje) in generaciji (študentske vstopnice). Kako imenujemo to strategijo?', [
    'Določanje razločevalnih (diskriminacijskih) cen', 'Psihološko določanje cen', 'Določanje cen na podlagi vrednosti', 'Dinamično določanje cen'], 0,
    'Osnovna cena se prilagodi razlikam med porabniki, lokacijami, časom ali različicami izdelka.'),
  Q('(Izpitni esej) Medorganizacijski trg ima neprožno povpraševanje. Kaj to pomeni?', [
    'Spremembe cen malo vplivajo na obseg povpraševanja, ker kupec surovino potrebuje za proizvodnjo (zlasti kratkoročno)', 'Povpraševanje se močno odziva na vsako spremembo cene', 'Povpraševanje je stalno in neodvisno od končnih porabnikov', 'Kupci vedno izberejo najcenejšega dobavitelja'], 0,
    'Povpraševanje je izpeljano iz povpraševanja končnih porabnikov in kratkoročno neprožno; proizvajalci ne morejo hitro spremeniti postopkov.'),
];
