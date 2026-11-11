/* Makroekonomija 1 (1. letnik, 2. semester) - dodatni izpitni kvizi.
   Viri: EF Zapiski "Stari izpiti" (zbrani roki 2012-2017), "1. izpitni rok 2020", "Snov na prvem izpitnem roku 2023".
   Izpit je opisni (kategorije, vprašanja, UMAR, ekonomska analiza IS-LM/AD-AS, debata). Rezultati so preračunani;
   nekatere rešitve v študentskih zbirkah so napačne (npr. računovodstvo rasti), zato veljajo izračuni tukaj. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

const NOTES_IZPIT = `
## Kako je videti izpit (stari roki)
1. **Ekonomske kategorije** - opredeli in razloži 4-5 pojmov (npr. likvidnostna past, NAIRU, seniorage, Humov mehanizem, zapornikova dilema, strukturni deficit, Bretton Woods).
2. **UMAR** - branje napovedi in podatkov (BDP, brezposelnost, inflacija).
3. **Vprašanja** z utemeljitvami, grafi in izračuni (BDP/BNP, multiplikatorji, davki, plačilna bilanca, keynesianizem).
4. **Ekonomska analiza** - IS-LM ali AD-AS, vsebinsko, grafično in analitično.
5. **Debata / esej** (npr. "višji dohodek pomeni višjo srečo", ZDA-Kitajska).

## Kategorije, ki se ponavljajo
- **Likvidnostna past**: pri zelo nizkih obrestnih merah je povpraševanje po denarju neskončno elastično - dodaten denar ljudje držijo, obrestne mere ne padejo → **monetarna politika je neučinkovita**.
- **NAIRU** (najnižja vzdržna stopnja brezposelnosti): najnižja stopnja, ki še ne pospešuje inflacije; dolgoročna Phillipsova krivulja je navpična pri NAIRU.
- **Seniorage**: prihodek centralne banke (države) od izdajanja denarja.
- **Humov mehanizem** (pretok zlata in cen): država s primanjkljajem izgublja zlato → cene padejo → konkurenčnost in izvoz rasteta → plačilna bilanca se uravnoteži.
- **Zapornikova dilema**: racionalno ravnanje posameznikov vodi v izid, ki ni optimalen ne za posameznika ne za celoto.
- **Zastonjkarstvo (free riding)**: posameznik uživa korist, ne da bi prispeval - problem javnih dobrin.
- **Strukturni deficit**: deficit, ki bi ostal tudi pri potencialnem BDP (posledica diskrecijske politike); **ciklični** nastane zaradi recesije.
- **Bretton Woods (1944)**: sistem stalnih, a prilagodljivih paritet do dolarja (dolar do zlata); ustanovljena **IMF in Svetovna banka**.
- **Teorija javne izbire**: politiki ravnajo racionalno v lastnem interesu (ponovna izvolitev).
- **Racionalna pričakovanja**: ljudje predvidijo ukrepe vlade, zato pričakovani ukrepi ne vplivajo na realni BDP.
- **HDI** (indeks človekovega razvoja): dohodek na prebivalca, pričakovana življenjska doba, izobrazba.
- **Kvantitativno popuščanje**: CB kupuje dolgoročne obveznice, da zniža dolgoročne obrestne mere.
- **BDP vs. BNP**: Renault v Sloveniji → slovenski BDP in francoski BNP; Gorenje v Srbiji → srbski BDP in slovenski BNP.
- BDP ni dobro merilo blaginje: ne zajame gospodinjskega dela, sive ekonomije, onesnaževanja, prostega časa.

## Izračuni
- Multiplikator: m = 1/(1 − MNP); davčni = −MNP/(1 − MNP); uravnoteženi proračun = 1.
- Y = C + I: C = a + b·Y → Y = (a + I)/(1 − b).
- Denarni multiplikator = 1 / stopnja obveznih rezerv.
- **Računovodstvo rasti**: gQ = ¾·gL + ¼·gK + TS; rast na delavca = gQ − gL = ¼·(gK − gL) + TS.
- MV = PQ; realna obrestna mera ≈ nominalna − inflacija; realni BDP = nominalni / deflator.
`;

const kategorije = [
  Q('Kaj je likvidnostna past?', [
    'Pri zelo nizkih obrestnih merah dodaten denar ne zniža obresti - monetarna politika je neučinkovita',
    'Pri visokih obrestnih merah ljudje ne želijo držati denarja - fiskalna politika je neučinkovita',
    'Banke zaradi pomanjkanja rezerv ne morejo dajati kreditov, zato ponudba denarja pade',
    'Država zaradi visokega dolga ne more več prodajati obveznic na finančnih trgih'], 0,
    'V likvidnostni pasti je špekulativno povpraševanje po denarju zelo elastično; LM je vodoravna, zato premik LM ne spremeni Y. Izpitna kategorija (2015, 2020, 2023).'),
  Q('Kaj je NAIRU (najnižja vzdržna stopnja brezposelnosti)?', [
    'Najnižja stopnja brezposelnosti, ki še ne pospešuje inflacije',
    'Stopnja brezposelnosti, pri kateri je inflacija enaka nič',
    'Najnižja stopnja brezposelnosti, ki jo je država kdaj dosegla',
    'Stopnja brezposelnosti, pri kateri je BDP najvišji'], 0,
    'Pod NAIRU se plače in cene začnejo pospešeno dvigovati. Dolgoročna Phillipsova krivulja je navpična pri NAIRU.'),
  Q('Kaj je seniorage?', [
    'Prihodek centralne banke od izdajanja denarja',
    'Obresti, ki jih država plačuje na javni dolg',
    'Davek na dobiček poslovnih bank',
    'Pristojbina za menjavo tujih valut'], 0,
    'CB izda denar, v zameno pridobi finančno premoženje (posojila, papirje) in od njega prejema donos.'),
  Q('Kaj opisuje Humov mehanizem?', [
    'Država s primanjkljajem izgublja zlato, cene padejo, izvoz raste in bilanca se uravnoteži',
    'Država s presežkom pridobiva zlato, cene padejo in njen izvoz še naprej raste',
    'Centralna banka s prodajo zlata ohranja stalen devizni tečaj ne glede na cene',
    'Višje obrestne mere privabijo tuji kapital in okrepijo domačo valuto'], 0,
    'Mehanizem pretoka zlata in cen pri zlatem standardu: pritok zlata dvigne cene in zmanjša konkurenčnost, odtok jih zniža. Cene morajo biti prilagodljive.'),
  Q('Kaj ponazarja zapornikova dilema?', [
    'Racionalno ravnanje posameznikov vodi v izid, ki ni optimalen ne za posameznika ne za celoto',
    'Država z zaporno (prohibitivno) carino zaščiti domačo proizvodnjo pred vso tujo konkurenco',
    'Posameznik uživa korist javne dobrine, ne da bi zanjo kakor koli plačal ali prispeval',
    'Ukrepi vlade so neučinkoviti, ker jih ljudje že vnaprej predvidijo in upoštevajo'], 0,
    'Iz teorije iger: vsak izbere najboljše glede na pričakovano izbiro drugega, oba pa končata slabše. Tretji odgovor je zastonjkarstvo, četrti racionalna pričakovanja.'),
  Q('Kaj je strukturni deficit?', [
    'Deficit, ki bi ostal tudi pri potencialnem BDP, posledica diskrecijske politike',
    'Deficit, ki nastane samodejno zaradi recesije in izgine z okrevanjem',
    'Primanjkljaj v tekočem računu plačilne bilance zaradi visokega uvoza blaga',
    'Razmerje med javnim dolgom in BDP, izraženo v odstotkih BDP države'], 0,
    'Ciklični deficit nastane zaradi delovanja avtomatskih stabilizatorjev v recesiji. Strukturni je odraz aktivne (ekspanzivne) fiskalne politike.'),
  Q('Kaj je zastonjkarstvo (free riding)?', [
    'Posameznik uživa korist dobrine ali dogovora, ne da bi k njemu prispeval',
    'Država brezplačno zagotavlja javne dobrine vsem državljanom enako',
    'Podjetje prejme državno subvencijo, ne da bi zaposlilo nove delavce',
    'Poslovna banka prejme kredit centralne banke brez plačila obresti'], 0,
    'Problem javnih dobrin in dogovorov: obstaja, dokler kršenje ni sankcionirano.'),
  Q('Kaj je bil Bretton-Woodski sporazum (1944)?', [
    'Sistem stalnih, a prilagodljivih paritet do dolarja; ustanovljena IMF in Svetovna banka',
    'Sporazum o prosto drsečih tečajih vseh valut brez kakršne koli povezave z zlatom',
    'Ustanovitvena pogodba Evropske gospodarske skupnosti in skupne carinske unije',
    'Sporazum o uvedbi evra kot skupne valute evropskih držav in ustanovitvi ECB'], 0,
    'Dolar je bil vezan na zlato, druge valute na dolar. Sistem je propadel v začetku 70. let.'),
  Q('Kaj trdi teorija javne izbire?', [
    'Politiki ravnajo racionalno v lastnem interesu, npr. za ponovno izvolitev',
    'Država vedno izbere tisto politiko, ki maksimira skupno družbeno blaginjo',
    'Javne dobrine mora zagotavljati izključno zasebni sektor, ne država',
    'Volivci vedno izberejo stranko, ki obljublja najnižje davke'], 0,
    'Povezuje ekonomijo in politiko: preučuje, kako se individualne preference prek volilnih sistemov združijo v družbeno izbiro.'),
  Q('Kaj pomenijo racionalna pričakovanja za ekonomsko politiko?', [
    'Pričakovani ukrepi vlade ne vplivajo na realni BDP, ker jih ljudje predvidijo',
    'Vlada lahko trajno zniža brezposelnost z nepričakovano inflacijo',
    'Ljudje svoja pričakovanja oblikujejo le na podlagi pretekle inflacije',
    'Fiskalna politika je učinkovitejša od monetarne v vsakem primeru'], 0,
    'Pri racionalnih pričakovanjih in prožnih cenah "vlada ne more vleči ljudi za nos". Tretji odgovor opisuje prilagodljiva pričakovanja.'),
  Q('Katere so sestavine indeksa človekovega razvoja (HDI)?', [
    'Dohodek na prebivalca, pričakovana življenjska doba, izobrazba',
    'BDP, stopnja brezposelnosti in stopnja inflacije',
    'Ginijev koeficient, javni dolg in proračunski deficit',
    'Rast BDP, produktivnost dela in naložbe v raziskave'], 0,
    'HDI dopolnjuje BDP kot merilo razvitosti: dohodek, zdravje (življenjska doba) in znanje (šolanje, pismenost).'),
  Q('Kaj je kvantitativno popuščanje?', [
    'Centralna banka kupuje dolgoročne obveznice, da zniža dolgoročne obrestne mere',
    'Centralna banka prodaja obveznice, da zmanjša količino denarja v obtoku',
    'Vlada znižuje davke, da poveča razpoložljivi dohodek gospodinjstev',
    'Centralna banka dvigne obvezne rezerve, da omeji kreditiranje'], 0,
    'Nekonvencionalni ukrep, ko so kratkoročne obrestne mere že blizu nič (ECB po 2015).'),
  Q('Kam štejemo proizvodnjo Renaulta v Sloveniji in Gorenja v Srbiji?', [
    'Renault: slovenski BDP in francoski BNP; Gorenje: srbski BDP in slovenski BNP',
    'Renault: francoski BDP in slovenski BNP; Gorenje: slovenski BDP in srbski BNP',
    'Oba štejemo v slovenski BDP, ker gre za slovenske delavce oziroma lastnike',
    'Renault: slovenski BDP in BNP; Gorenje: srbski BDP in BNP'], 0,
    'BDP = proizvodnja na ozemlju države; BNP = proizvodnja rezidentov države, kjer koli. Pogosto izpitno vprašanje (2015, 2017, 2020).'),
  Q('Zakaj BDP ni dobro merilo blaginje?', [
    'Ne zajame gospodinjskega dela, sive ekonomije in onesnaževanja',
    'Ker poleg materialnih dobrin vključuje tudi storitve, ki niso otipljive',
    'Ker ga statistični urad izračuna le enkrat na deset let',
    'Ker vključuje tudi izvoz, ki ga potrošijo tuji kupci'], 0,
    'BDP zajame le tržne transakcije; ne upošteva prostega časa, porazdelitve dohodka in okolja.'),
  Q('Kaj je demografska tranzicija?', [
    'Prehod od visoke rodnosti in smrtnosti k nizki rodnosti in smrtnosti z razvojem',
    'Preseljevanje prebivalstva iz razvitih v manj razvite države',
    'Upad prebivalstva zaradi vojn in epidemij v razvitih državah',
    'Hitra rast prebivalstva v razvitih državah zaradi priseljevanja'], 0,
    'Najprej pade smrtnost (prebivalstvo hitro raste), nato še rodnost. Izpitno vprašanje 2020.'),
  Q('Kaj je UMAR?', [
    'Urad za makroekonomske analize in razvoj, ki napoveduje gospodarska gibanja',
    'Urad za meroslovje, ki meri inflacijo in sestavlja košarico IPC',
    'Agencija za trg vrednostnih papirjev, ki nadzira ljubljansko borzo',
    'Oddelek Banke Slovenije, ki vodi monetarno politiko evrskega območja'], 0,
    'Na izpitu je naloga branja UMAR-jeve napovedi (BDP, brezposelnost, inflacija).'),
];

const racunske = [
  Q('C = 50 + 0,6Y, I = 20 (brez države in tujine). Koliko sta ravnotežni output in multiplikator? (izpit 2017)', [
    'Y = 175, multiplikator 2,5', 'Y = 117, multiplikator 1,67', 'Y = 70, multiplikator 2,5', 'Y = 175, multiplikator 1,67'], 0,
    'Y = 50 + 0,6Y + 20 → 0,4Y = 70 → Y = 175. m = 1/(1 − 0,6) = 2,5.'),
  Q('CB zniža stopnjo obveznih rezerv s 45 % na 5 %. Kako se spremeni denarni multiplikator? (izpit 2015)', [
    'Z 2,22 na 20', 'S 4,5 na 0,5', 'Z 0,45 na 0,05', 'Z 2,22 na 5'], 0,
    'm = 1/r: 1/0,45 ≈ 2,22, 1/0,05 = 20. Banke lahko ustvarijo več depozitov in kreditov - ekspanzivna politika.'),
  Q('Delo raste 1 % letno, kapital 4 %, tehnološke spremembe 1,5 %. Uteži: delo ¾, kapital ¼. Kolikšna je rast outputa? (izpit 2015)', [
    '3,25 %', '4,0 %', '6,5 %', '2,25 %'], 0,
    'gQ = ¾·1 + ¼·4 + 1,5 = 0,75 + 1 + 1,5 = 3,25 %.'),
  Q('Delo raste 1 % letno, kapital 4 %, tehnološke spremembe 1,5 % (uteži ¾ in ¼). Kolikšna je rast outputa na delavca?', [
    '2,25 %', '3,25 %', '1,5 %', '2,5 %'], 0,
    'gQ − gL = 3,25 − 1 = 2,25 % (= ¼·(4 − 1) + 1,5: 0,75 iz poglabljanja kapitala in 1,5 iz tehnoloških sprememb).'),
  Q('MNP = 0,8. Za koliko se poveča BDP, če država poveča izdatke za 100?', [
    'Za 500', 'Za 400', 'Za 125', 'Za 80'], 0,
    'm = 1/(1 − 0,8) = 5 → 5 × 100 = 500.'),
  Q('MNP = 0,8. Za koliko se spremeni BDP, če država zviša davke za 100?', [
    'Zmanjša se za 400', 'Zmanjša se za 500', 'Zmanjša se za 80', 'Poveča se za 400'], 0,
    'Davčni multiplikator = −MNP/(1 − MNP) = −0,8/0,2 = −4 → −400. Po absolutni vrednosti je manjši od multiplikatorja izdatkov (5).'),
  Q('Država poveča izdatke za 100 in davke za 100 (uravnotežen proračun). Za koliko se spremeni BDP?', [
    'Poveča se za 100', 'Ne spremeni se', 'Poveča se za 500', 'Zmanjša se za 100'], 0,
    'Multiplikator uravnoteženega proračuna je 1: +500 (izdatki) − 400 (davki) = +100 pri MNP = 0,8.'),
  Q('BDP pade 4 % pod potencialnega. Za koliko se po Okunovem zakonu dvigne brezposelnost?', [
    'Za 2 odstotni točki', 'Za 4 odstotne točke', 'Za 8 odstotnih točk', 'Za 1 odstotno točko'], 0,
    'Okun (Samuelson): na vsaka 2 % padca BDP pod potencialom se brezposelnost dvigne za 1 odstotno točko.'),
  Q('Nominalni BDP je 1.100, deflator BDP 110. Koliko je realni BDP?', [
    '1.000', '1.210', '990', '1.100'], 0,
    'Realni BDP = nominalni / deflator × 100 = 1.100/110 × 100 = 1.000.'),
  Q('M = 100, V = 5, Q = 250. Kolikšna je raven cen in kaj se zgodi, če M naraste za 10 % (V in Q stalna)?', [
    'P = 2; cene narastejo za 10 %', 'P = 2; cene se ne spremenijo', 'P = 0,5; cene padejo za 10 %', 'P = 2,5; cene narastejo za 5 %'], 0,
    'MV = PQ → P = 500/250 = 2. Po kvantitativni teoriji rast M ob stalnih V in Q sorazmerno dvigne cene.'),
  Q('Nominalna obrestna mera je 6 %, inflacija 2 %. Kolikšna je realna obrestna mera?', [
    'Približno 4 %', 'Približno 8 %', 'Približno 3 %', 'Približno 12 %'], 0,
    'Realna ≈ nominalna − inflacija = 6 − 2 = 4 %.'),
  Q('BDP je 1.000, amortizacija 150. Koliko je NDP?', [
    '850', '1.150', '1.000', '150'], 0,
    'NDP = BDP − amortizacija.'),
];

const politike = [
  Q('Kako ekspanzivna monetarna politika vpliva na BDP (transmisijski mehanizem)?', [
    'Več denarja → nižje obrestne mere → več naložb → večje AD in BDP',
    'Več denarja → višje obrestne mere → manj naložb → manjše AD in BDP',
    'Več denarja → nižji davki → večja potrošnja → večje AD in BDP',
    'Več denarja → višji tečaj → več izvoza → večje AD in BDP'], 0,
    'V IS-LM se LM premakne desno: obrestna mera pade, Y naraste.'),
  Q('Vlada želi višjo rast ob nespremenjeni obrestni meri. Kaj naredi v modelu IS-LM?', [
    'Hkrati ekspanzivno fiskalno (IS desno) in monetarno politiko (LM desno)',
    'Samo ekspanzivno fiskalno politiko - premik krivulje IS desno',
    'Samo restriktivno monetarno politiko - premik krivulje LM levo',
    'Ekspanzivno fiskalno in restriktivno monetarno politiko'], 0,
    'Fiskalna ekspanzija sama dvigne obrestno mero (izrinjanje); monetarna ekspanzija ta dvig izniči. Izpitna analiza.'),
  Q('Kaj se dolgoročno zgodi po povečanju AD, ko BDP preseže potencialnega (inflacijska vrzel)?', [
    'Plače in cene rastejo, SRAS se premakne levo, BDP se vrne na potencialni ob višjih cenah',
    'BDP trajno ostane nad potencialnim, cene in plače pa se ne spremenijo',
    'Potencialni BDP se trajno poveča na raven, ki jo je dosegel dejanski BDP',
    'AD se samodejno premakne nazaj, cene pa padejo pod prvotno raven cen'], 0,
    'Analitično: AD↑ → Y↑, P↑ → w↑ → SRAS↓ → P↑, Y↓ do LRAS. Pogosta izpitna analiza.'),
  Q('Zakaj je monetarna politika v likvidnostni pasti neučinkovita?', [
    'Ker dodaten denar ne zniža obrestne mere, zato se naložbe ne povečajo',
    'Ker centralna banka v recesiji ne sme povečevati ponudbe denarja',
    'Ker višja obrestna mera izrine zasebne naložbe podjetij',
    'Ker previsoki davki zmanjšujejo razpoložljivi dohodek gospodinjstev'], 0,
    'LM je vodoravna; prenos prek obrestne mere ne deluje. Tedaj je učinkovitejša fiskalna politika.'),
  Q('Katera je temeljna omejitev fiskalne politike?', [
    'Učinek izrinjanja zasebnih naložb zaradi višjih obrestnih mer',
    'Likvidnostna past, v kateri obrestne mere ne padejo',
    'Kvantitativno popuščanje, ki zniža dolgoročne obresti',
    'Pariteta kupne moči, ki določa devizni tečaj'], 0,
    'Fiskalna ekspanzija dvigne obrestne mere in zmanjša zasebne naložbe; v recesiji je učinek majhen.'),
  Q('Katera je glavna kritika keynesianske teorije?', [
    'Učinek izrinjanja in nezmožnost reševanja stagflacije',
    'Zanemarjanje agregatnega povpraševanja in vloge države',
    'Predpostavka, da so plače in cene popolnoma prožne',
    'Prepričanje, da je inflacija izključno denarni pojav'], 0,
    'Keynesianci predpostavljajo toge plače in cene ter aktivno vlogo države; kritiki opozarjajo na izrinjanje, inflacijo in stagflacijo 70. let.'),
  Q('Kaj je zunanjetrgovinska politika in s katerimi instrumenti deluje?', [
    'Politika do tujine: devizni tečaj, carine, kvote, takse',
    'Politika do tujine: davki, državni izdatki, transferji',
    'Politika do tujine: obrestna mera in obvezne rezerve',
    'Politika do tujine: minimalne plače in nadzor cen'], 0,
    'Fiskalna: davki in izdatki. Monetarna: količina denarja, obresti. Dohodkovna: cene in plače.'),
  Q('Kako v odprtem gospodarstvu velja zveza med varčevanjem, naložbami in neto izvozom?', [
    'Zasebno varčevanje + proračunski presežek = domače naložbe + neto izvoz',
    'Zasebno varčevanje = domače naložbe + proračunski deficit + uvoz',
    'Domače naložbe = zasebno varčevanje + neto izvoz + davki',
    'Neto izvoz = domače naložbe − davki + transferji gospodinjstvom'], 0,
    'Celotno varčevanje (zasebno + javno) financira domače naložbe in neto tuje naložbe (NX). Če varčevanje preseže naložbe, je NX pozitiven. Izpitno vprašanje.'),
  Q('Kako krepitev evra vpliva na mednarodno trgovino EU?', [
    'Uvoz v EU se poceni in raste, izvoz EU se podraži in upade',
    'Izvoz EU se poceni in raste, uvoz v EU se podraži in upade',
    'Uvoz in izvoz EU se povečata, ker evro postane zanesljivejši',
    'Na trgovino ne vpliva, ker cene določa pariteta kupne moči'], 0,
    'Močnejši evro pomeni, da tujci za evrsko blago plačajo več (izvoz pade), Evropejci pa tuje blago dobijo ceneje.'),
  Q('Kaj mora vlada storiti, da poveča mednarodno konkurenčnost in presežek tekočega računa?', [
    'Znižati relativne stroške domačih dobrin (produktivnost, zmerne plače)',
    'Povečati državne izdatke za nakup tujih dobrin in storitev',
    'Dvigniti obrestne mere, da se domača valuta okrepi do tujih',
    'Dvigniti plače nad rast produktivnosti, da se poveča potrošnja'], 0,
    'Pri evru država nima lastnega tečaja; konkurenčnost izboljša z rastjo produktivnosti in zmernimi plačami (realna depreciacija).'),
  Q('Kaj pravi teorija učinkovitih trgov o ceni delnic (random walk)?', [
    'Javno znane informacije so že v ceni, zato so spremembe nepredvidljive',
    'Cene delnic vedno sledijo rasti BDP z enoletnim zamikom',
    'Z analizo preteklih cen lahko zanesljivo napovemo prihodnje cene',
    'Cene delnic določa centralna banka z obrestno mero'], 0,
    'Nenadna objava (npr. višji davki) cene takoj spremeni; predvidljive informacije pa so že vračunane.'),
];

module.exports = {
  id: 'makro',
  parts: [
    {
      id: 'izpit',
      appendNotesMd: NOTES_IZPIT,
      decks: [
        { id: 'makro-kategorije', name: 'Ekonomske kategorije z izpitov', questions: kategorije },
        { id: 'makro-racunske', name: 'Računske naloge', calc: true, questions: racunske },
        { id: 'makro-politike', name: 'Politike in ekonomska analiza', questions: politike },
      ],
    },
  ],
};
