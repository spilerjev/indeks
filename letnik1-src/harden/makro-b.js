// Makroekonomija, 2. krog: odpravlja pristranskost "pravilni odgovor je najdaljši" (vsaj en napačni je enako dolg ali daljši).
// 'vse' = isto vprašanje je v dveh kvizih (mk* in makro-pregled).
module.exports = [
  ['Kaj so oportunitetni stroški?', [
    'Nepovratni (potopljeni) stroški',
    'Stroški uporabe lastnih virov',
    'Mejni stroški zadnje izdelane enote'], 1],
  ['Kdaj govorimo o recesiji?', [
    'Ko BDP raste počasneje od potencialnega BDP',
    'Ko inflacija v dveh trimesečjih zapored pade',
    'Ko brezposelnost dve leti presega naravno stopnjo'], 2],
  ['Kaj je stagflacija?', [
    'Recesija ob padajoči ravni cen',
    'Hitra rast BDP ob hiperinflaciji',
    'Stagnacija ob stabilnih cenah'], 0],
  ['Čemu je enak investicijski multiplikator?', [
    '1 / (1 − MNV)',
    'MNP / (1 − MNV)',
    '1 / (MNP + MNV)'], 2],
  ['Zakaj je davčni multiplikator nižji od multiplikatorja državnih izdatkov?', [
    'Ker se del dodatnega dohodka ob nižjih davkih porabi za uvoz',
    'Ker davki delujejo le na agregatno ponudbo, ne na povpraševanje',
    'Ker se davčne spremembe v dohodku pokažejo šele z zamikom'], 1],
  ['Kaj pravi paradoks varčevanja?', [
    'Večje varčevanje vedno poveča naložbe in s tem dohodek gospodarstva',
    'Večje varčevanje zniža obrestne mere in zato poveča potrošnjo',
    'Varčevanje gospodinjstev ne vpliva na agregatno povpraševanje'], 3, null, 'vse'],
  ['Čemu je enak denarni multiplikator?', [
    '1 − stopnja obveznih rezerv',
    'Stopnja obveznih rezerv / M1',
    '1 / (1 − stopnja obveznih rezerv)'], 0],
  ['Kako izračunamo denarni multiplikator?', [
    '1 − stopnja obveznih rezerv',
    'Depoziti / stopnja obveznih rezerv',
    '1 / (1 − stopnja obveznih rezerv)'], 2],
  ['Kaj stori centralna banka ob inflaciji?', [
    'Poveča ponudbo denarja, zniža obresti',
    'Zniža obvezne rezerve, kupuje obveznice',
    'Kupuje vrednostne papirje, zniža obresti'], 1],
  ['Kaj je učinek izrinjanja (crowding-out)?', [
    'Višji uvoz izrine domačo proizvodnjo in zmanjša neto izvoz',
    'Višja inflacija izrine varčevanje gospodinjstev v potrošnjo',
    'Ekspanzivna monetarna politika zniža obresti in izrine tuji kapital'], 0, null, 'vse'],
  ['Kaj vsebuje tekoči račun plačilne bilance?', [
    'Blago, storitve, naložbe in posojila',
    'Naložbe, posojila in devizne rezerve',
    'Kapitalske transferje, patente, licence'], 2],
  ['Pri katerem režimu se uporabljata izraza devalvacija in revalvacija?', [
    'Pri prosto drsečem tečaju',
    'Pri uravnavanem drsečem tečaju',
    'Pri skupni valuti (evroobmočje)'], 1],
  ['Kje uporabljamo pojma devalvacija in revalvacija?', [
    'Pri prosto drsečem tečaju',
    'Pri paritetah kupne moči valut',
    'Pri skupni valuti v evroobmočju'], 3],
  ['Kaj je prohibitivna carina?', [
    'Carina, ki uvoz le podraži',
    'Carina na izvoz surovin in hrane',
    'Carina, vezana na količinsko kvoto'], 0],
  ['Kaj pravi Okunov zakon?', [
    '2 % rasti BDP nad potencialom dvigne inflacijo za 1 odstotno točko',
    '1 % več brezposelnosti dvigne potencialni BDP za 2 odstotni točki',
    '1 % višja inflacija zniža brezposelnost za 2 odstotni točki'], 1],
  ['Kaj prikazuje kratkoročna Phillipsova krivulja?', [
    'Pozitivno povezavo med inflacijo in brezposelnostjo',
    'Inverzno povezavo med obrestno mero in naložbami',
    'Pozitivno povezavo med brezposelnostjo in rastjo BDP'], 3],
  ['Kolikšen je multiplikator državnih izdatkov?', [
    '1/(1 − MNV)',
    'MNP/(1 − MNP)',
    '1/(MNP + MNV)'], 0],
  ['Kaj priporoča Ramseyevo pravilo obdavčitve?', [
    'Bolj obdavčiti cenovno elastične dobrine',
    'Vse dobrine obdavčiti po enotni stopnji DDV',
    'Bolj obdavčiti luksuzne dobrine bogatejših'], 2],
  ['Kakšna je Phillipsova krivulja kratkoročno in dolgoročno?', [
    'Kratkoročno navpična (NAIRU), dolgoročno padajoča',
    'Kratkoročno vodoravna, dolgoročno padajoča (NAIRU)',
    'Kratkoročno naraščajoča, dolgoročno navpična'], 1],
  ['Katera so štiri kolesa (dejavniki) gospodarske rasti?', [
    'Potrošnja, naložbe, državni izdatki in neto izvoz',
    'Delo, zemlja, finančni kapital in podjetništvo',
    'Prebivalstvo, surovine, varčevanje, javne naložbe'], 3],
  ['Kaj je likvidnostna past?', [
    'Pri zelo visokih obrestnih merah ljudje ne želijo držati denarja - fiskalna politika je neučinkovita',
    'Banke zaradi pomanjkanja rezerv ne morejo več dajati kreditov, zato ponudba denarja kljub ukrepom CB pade',
    'Država zaradi visokega javnega dolga ne more več prodajati obveznic - fiskalna politika je neučinkovita'], 2],
  ['Kaj je seniorage?', [
    'Obresti, ki jih država plačuje na svoj javni dolg',
    'Davek na dobiček poslovnih bank iz kreditiranja',
    'Pristojbina bank za menjavo tujih valut v domačo'], 1],
  ['Kaj opisuje Humov mehanizem?', [
    'Država s presežkom pridobiva zlato, cene padejo in njen izvoz še naprej raste, neravnotežje ostane',
    'Centralna banka s prodajo zlata ohranja stalen devizni tečaj ne glede na gibanje domačih cen',
    'Višje obrestne mere privabijo tuji kapital, okrepijo domačo valuto in uravnotežijo bilanco'], 3],
  ['Kaj ponazarja zapornikova dilema?', [
    'Ukrepi vlade so neučinkoviti, ker jih ljudje že vnaprej predvidijo in jih upoštevajo pri odločitvah',
    'Posameznik uživa korist javne dobrine, ne da bi zanjo kakor koli plačal ali k njej prispeval',
    'Država z zaporno (prohibitivno) carino zaščiti domačo proizvodnjo pred vso tujo konkurenco'], 1],
  ['Kaj je strukturni deficit?', [
    'Deficit, ki nastane samodejno zaradi recesije in izgine z okrevanjem gospodarstva',
    'Primanjkljaj v tekočem računu plačilne bilance zaradi visokega uvoza blaga in storitev',
    'Razmerje med javnim dolgom in BDP, ki presega mejo 60 % iz maastrichtskih meril'], 0],
  ['Kaj je zastonjkarstvo (free riding)?', [
    'Država brezplačno zagotavlja javne dobrine vsem državljanom brez prispevka',
    'Podjetje prejme državno subvencijo, ne da bi v zameno zaposlilo nove delavce',
    'Poslovna banka prejme kredit centralne banke brez plačila obresti'], 2],
  ['Kaj je bil Bretton-Woodski sporazum (1944)?', [
    'Sporazum o prosto drsečih tečajih vseh valut brez kakršne koli povezave z zlatom; ukinjen IMF',
    'Ustanovitvena pogodba Evropske gospodarske skupnosti in skupne carinske unije (EGS)',
    'Sporazum o uvedbi evra kot skupne valute evropskih držav in o ustanovitvi ECB ter ESM'], 1],
  ['Kaj pomenijo racionalna pričakovanja za ekonomsko politiko?', [
    'Vlada lahko trajno zniža brezposelnost s pričakovano in postopno rastočo inflacijo',
    'Ljudje svoja pričakovanja oblikujejo le na podlagi pretekle inflacije (adaptivno)',
    'Fiskalna politika je učinkovitejša od monetarne, ker jo ljudje težje predvidijo'], 3],
  ['Katere so sestavine indeksa človekovega razvoja (HDI)?', [
    'Rast BDP na prebivalca, produktivnost dela in naložbe v raziskave',
    'Ginijev koeficient, javni dolg in pričakovana življenjska doba',
    'Dohodek na prebivalca, Ginijev koeficient, stopnja revščine'], 0],
  ['Kaj je kvantitativno popuščanje?', [
    'Centralna banka prodaja dolgoročne obveznice, da zmanjša količino denarja v obtoku',
    'Vlada znižuje davke in povečuje izdatke, da poveča razpoložljivi dohodek',
    'Centralna banka zniža obvezne rezerve bank, da spodbudi kreditiranje podjetij'], 2],
  ['Kaj je demografska tranzicija?', [
    'Prehod od nizke rodnosti in smrtnosti k visoki rodnosti in smrtnosti zaradi vojn',
    'Preseljevanje prebivalstva iz manj razvitih v razvite države zaradi višjih plač',
    'Upad prebivalstva v razvitih državah zaradi odseljevanja v hitro rastoče države'], 1],
  ['Kaj je UMAR?', [
    'Urad za meroslovje, ki meri inflacijo in sestavlja košarico indeksa potrošnih cen',
    'Agencija za trg vrednostnih papirjev, ki nadzira ljubljansko borzo in sklade',
    'Oddelek Banke Slovenije, ki vodi monetarno politiko in nadzira poslovne banke'], 3],
  ['Vlada želi višjo rast ob nespremenjeni obrestni meri.', [
    'Samo ekspanzivno fiskalno politiko - premik krivulje IS desno, LM miruje',
    'Ekspanzivno fiskalno (IS desno) in restriktivno monetarno politiko (LM levo)',
    'Samo ekspanzivno monetarno politiko - premik krivulje LM desno, IS miruje'], 0],
  ['Kaj se dolgoročno zgodi po povečanju AD, ko BDP preseže potencialnega', [
    'Potencialni BDP se trajno poveča na raven, ki jo je dosegel dejanski BDP, cene se ne spremenijo',
    'AD se samodejno premakne nazaj, cene padejo pod prvotno raven, BDP se vrne na potencialni',
    'Plače in cene rastejo, SRAS se premakne desno, BDP trajno ostane nad potencialnim'], 2],
  ['Zakaj je monetarna politika v likvidnostni pasti neučinkovita?', [
    'Ker višja obrestna mera izrine zasebne naložbe, zato se BDP ne poveča',
    'Ker dodaten denar takoj dvigne cene, realna ponudba denarja pa ostane enaka',
    'Ker banke dodatne rezerve posodijo tujini, zato se domače naložbe ne povečajo'], 1],
  ['Katera je temeljna omejitev fiskalne politike?', [
    'Likvidnostna past, v kateri obrestne mere ne morejo več pasti',
    'Kvantitativno popuščanje, ki zniža dolgoročne obrestne mere',
    'Neodvisnost centralne banke, ki vladi prepoveduje zadolževanje'], 3],
  ['Kaj je zunanjetrgovinska politika in s katerimi instrumenti deluje?', [
    'Politika do tujine: davki, državni izdatki in transferji',
    'Politika do tujine: obrestna mera in obvezne rezerve bank',
    'Politika do tujine: minimalne plače, nadzor cen in dohodkov'], 0],
  ['Kako v odprtem gospodarstvu velja zveza med varčevanjem, naložbami in neto izvozom?', [
    'Zasebno varčevanje + neto izvoz = domače naložbe + proračunski presežek',
    'Domače naložbe + proračunski presežek = zasebno varčevanje + neto uvoz',
    'Zasebno varčevanje = domače naložbe + proračunski deficit + neto izvoz'], 2],
  ['Kaj mora vlada storiti, da poveča mednarodno konkurenčnost in presežek tekočega računa?', [
    'Dvigniti plače nad rast produktivnosti, da se poveča domača potrošnja in uvoz',
    'Povečati državne izdatke za nakup tujih dobrin in storitev (uvoz)',
    'Dvigniti obrestne mere, da se domača valuta okrepi in uvoz poceni'], 1],
  ['Kaj pravi teorija učinkovitih trgov o ceni delnic (random walk)?', [
    'Z analizo preteklih cen lahko zanesljivo napovemo prihodnje gibanje cen',
    'Cene delnic vedno sledijo rasti BDP z enoletnim zamikom (slučajni hod)',
    'Cene delnic nihajo okoli vrednosti, ki jo določa centralna banka z obrestmi'], 3],
  ['(Izpit) Kaj je dezinflacija?', [
    'Padanje splošne ravni cen skozi daljše obdobje (negativna inflacija)',
    'Hkratna visoka inflacija in visoka brezposelnost ob stagnaciji',
    'Inflacija, pri kateri se relativne cene dobrin ne spremenijo'], 0],
  ['(Izpit) Katere so funkcije denarja?', [
    'Plačilno sredstvo, investicijsko sredstvo, rezerva CB, merilo cen, svetovni denar',
    'Hranilec vrednosti, vir posojil, merilec BDP, zavarovanje in svetovni denar',
    'Menjalno sredstvo, vir dobička, merilo blaginje, vir davkov, svetovni denar'], 2],
  ['(Izpit) Kakšna je razlika med davkom in prispevkom?', [
    'Davek je prostovoljen, prispevek je obvezen za vse zaposlene in podjetja',
    'Prispevek plačujejo samo delodajalci, davek samo gospodinjstva in podjetja',
    'Davek je vedno sorazmeren, prispevek pa vedno progresiven glede na dohodek'], 1],
  ['(Izpit) Katera so načela obdavčenja?', [
    'Načelo nediskriminacije, recipročnosti ter vodoravne in navpične arbitraže',
    'Načelo enake stopnje, enkratnega plačila, prostovoljnosti in preglednosti',
    'Načelo dobička, likvidnosti in varnosti davčnega zavezanca ter države'], 3],
  ['(Izpit) Kaj je davčno breme (incidenca)?', [
    'Skupni znesek davkov, ki jih država pobere v enem letu',
    'Delež vseh davkov in prispevkov v BDP posamezne države',
    'Strošek davčne uprave pri pobiranju in nadzoru davkov'], 0],
  ['(Izpit) Zakaj je proticiklična fiskalna politika možna le z neuravnoteženim proračunom?', [
    'Uravnotežen proračun v recesiji samodejno poveča izdatke in BDP, zato ni potreben',
    'Ker fiskalni pakt prepoveduje proračunski presežek v času konjunkture in razcveta',
    'Ker centralna banka ne sme financirati uravnoteženega proračuna z nakupom obveznic'], 2],
  ['(Izpit) Kako na gospodarstvo vpliva dvig rediskontne stopnje centralne banke?', [
    'Poveča presežne rezerve poslovnih bank in s tem njihovo kreditiranje',
    'Ne vpliva na banke, spremeni le devizni tečaj domače valute do evra',
    'Poveča obseg kreditov CB bankam, obrestne mere bank padejo'], 1],
  ['(Izpit) CB poveča stopnjo obveznih rezerv. Kakšni so učinki?', [
    'Manj kreditov, a višji AD zaradi večjega varčevanja v bankah in višjih cen',
    'Višje obresti, a višji BDP, ker banke dobijo več depozitov in več rezerv',
    'Več presežnih rezerv in kreditov, nižje obresti, višji AD, BDP in cene'], 3],
  ['(Izpit) Kaj je multiplikator v odprtem gospodarstvu?', [
    '1 / (MNV − MNU) - večji, ker izvoz poveča domači dohodek',
    '1 / MNV - enak kot v zaprtem gospodarstvu, uvoz ne vpliva',
    'MNP / (MNV + MNU) - manjši, ker davki odtekajo v proračun'], 0],
  ['(Izpit 2012) Tečaj se spremeni z 1,5 $/€ na 1,1 $/€.', [
    'Dolar depreciira, evro apreciira; ameriški izvoz v evroobmočje zraste',
    'Pri drsečem tečaju gre za revalvacijo evra in devalvacijo dolarja',
    'Evro apreciira, dolar depreciira; ameriški uvoz iz evroobmočja pade'], 2],
  ['(Izpit) Kaj velja po fiskalnem paktu za strukturni primanjkljaj?', [
    'Na letni ravni ne sme presegati 3 % BDP',
    'Na letni ravni ne sme presegati 60 % BDP',
    'Na letni ravni ne sme presegati 1,0 % BDP'], 1],
  ['(Izpit) Katero je eno od temeljnih načel Svetovne trgovinske organizacije (WTO)?', [
    'Trgovinske spore rešujejo države s povračilnimi carinami in kvotami',
    'Pomoč državam v tranziciji pri plačilnobilančnih težavah s posojili',
    'Vsaka država lahko carine prosto zviša brez nadomestila drugim'], 3],
  ['(Izpit) Kakšna je vloga Svetovne banke v primerjavi z IMF?', [
    'Svetovna banka pomaga pri plačilnobilančnih težavah, IMF financira razvojne projekte',
    'Svetovna banka rešuje trgovinske spore, IMF financira infrastrukturo v državah v razvoju',
    'Svetovna banka vodi svetovno monetarno politiko, IMF nadzira mednarodno trgovino'], 0],
  ['(Izpit) Kaj je začaran krog revščine?', [
    'Hiperinflacija → beg kapitala → tiskanje denarja → hiperinflacija',
    'Razvite države izkoriščajo nerazvite z nizkimi cenami surovin (odvisnost)',
    'Beg možganov → manj izobraženih → nižje plače → še večji beg možganov'], 1],
  ['(Izpit) Kaj je tragedija skupnega (nezajemljivi viri)?', [
    'Premajhna ponudba javnih dobrin, ker posameznik ne plača svojega deleža',
    'Izguba blaginje zaradi monopolne cene, ki je višja od mejnih stroškov',
    'Sočasni padec BDP v vseh državah ob izbruhu svetovne finančne krize'], 2],
  ['(Izpit) S katero kombinacijo politik bi znižali visoko inflacijo?', [
    'Restriktivna monetarna politika in ekspanzivna fiskalna politika',
    'Ekspanzivna monetarna politika in restriktivna fiskalna politika',
    'Ekspanzivna monetarna politika in hkrati ekspanzivna fiskalna politika'], 1,
    'Restriktivna monetarna politika in restriktivna fiskalna politika'],
];
