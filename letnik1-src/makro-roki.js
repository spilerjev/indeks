/* Makroekonomija 1 - dodatne vaje v slogu izpita (pojmi, denarna in fiskalna politika, mednarodna ekonomija).
   Vprašanja so napisana na novo; računske naloge imajo nove številke. Teme, ki so že v makro.js, so izpuščene. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });

const roki = [
  withId('q12p36xn', Q('Inflacija nenadoma pospeši, česar ob sklepanju posojilnih pogodb nihče ni predvidel. Kaj se zgodi s premoženjem?', [
    'Prerazdeli premoženje od upnikov k dolžnikom',
    'Prerazdeli premoženje od dolžnikov k upnikom',
    'Ne vpliva na porazdelitev, ker je vključena v pogodbe',
    'Vse cene zrastejo za enak odstotek, relativne ostanejo'], 0,
    'Dolžniki vračajo realno manj vreden denar. Anticipirana inflacija je vključena v obrestne mere in pogodbe, zato malo vpliva. Zadnji odgovor opisuje ravnovesno inflacijo.')),
  withId('q1daxar4', Q('Katera razvrstitev inflacije temelji na njeni intenzivnosti (višini)?', [
    'Zmerna, galopirajoča in hiperinflacija',
    'Anticipirana, neanticipirana in ravnovesna',
    'Stroškovna, povpraševalna in uvožena',
    'Kratkoročna, srednjeročna in dolgoročna'], 0,
    'Po intenzivnosti: zmerna, galopirajoča, hiperinflacija. Po pričakovanju: anticipirana/neanticipirana. Po gibanju relativnih cen: ravnovesna/neravnovesna.')),
  withId('q1bxem5v', Q('Inflacija se je znižala s 6 % na 2 %. Kaj opisuje izraz dezinflacija?', [
    'Zmanjševanje stopnje inflacije (cene še rastejo, a počasneje)',
    'Padanje splošne ravni cen skozi daljše obdobje',
    'Hkratna visoka inflacija in visoka brezposelnost',
    'Inflacija, pri kateri se relativne cene ne spremenijo'], 0,
    'Dezinflacija = nižja stopnja inflacije. Padanje ravni cen je deflacija, hkratna inflacija in stagnacija je stagflacija.')),
  withId('qyboazm', Q('Katere vloge (funkcije) opravlja denar v gospodarstvu?', [
    'Menjalno in plačilno sredstvo, merilec in hranilec vrednosti, svetovni denar',
    'Menjalno sredstvo, vir dobička, merilo blaginje in vir davkov',
    'Plačilno sredstvo, investicijsko sredstvo, rezerva CB in merilo cen',
    'Hranilec vrednosti, vir posojil, merilec BDP in zavarovanje'], 0,
    'Pri evru sta posebej izpostavljeni funkciji svetovnega denarja in hranilca vrednosti; v krizah je ključna stabilnost hranilca in merilca vrednosti.')),
  withId('q1cqr5gx', Q('Po čem se prispevek za socialno varnost razlikuje od davka?', [
    'Pri prispevku vemo namen porabe (npr. socialna varnost), pri davku ne',
    'Davek je prostovoljen, prispevek je obvezen za vse zaposlene',
    'Prispevek plačujejo samo podjetja, davek samo gospodinjstva',
    'Davek je vedno sorazmeren, prispevek pa vedno progresiven'], 0,
    'Davek je obvezna dajatev brez neposredne protidajatve in vnaprej znane namembnosti. Davčno trojico sestavljajo davki, prispevki in dohodnina.')),
  withId('qywat5d', Q('Mejna davčna stopnja pove, kolikšen del dodatnega evra dohodka pobere država. Kako jo izračunamo?', [
    'Sprememba davka / sprememba davčne osnove',
    'Znesek davka / davčna osnova',
    'Znesek davka / bruto domači proizvod',
    'Sprememba davčne osnove / sprememba davka'], 0,
    'Povprečna davčna stopnja = davek / osnova. Pri progresivnem davku je mejna stopnja višja od povprečne.')),
  withId('q1x2rsdd', Q('Na katerih načelih naj temelji pravičen davčni sistem?', [
    'Načelo koristi, plačilne sposobnosti ter vodoravne in navpične enakosti',
    'Načelo dobička, likvidnosti in varnosti davčnega zavezanca',
    'Načelo nediskriminacije, recipročnosti in arbitraže',
    'Načelo enake stopnje, enkratnega plačila in prostovoljnosti'], 0,
    'Vodoravna enakost: enaki plačajo enako. Navpična: tisti z višjim dohodkom plačajo več (plačilna sposobnost).')),
  withId('q162d6kq', Q('Trošarino formalno plača prodajalec, a cena za kupce zraste. Kaj opisuje pojem davčnega bremena (incidence)?', [
    'Končno ekonomsko breme davka - kdo ga dejansko nosi',
    'Skupni znesek davkov, ki jih država pobere v letu',
    'Delež davkov v BDP posamezne države',
    'Strošek davčne uprave pri pobiranju davkov'], 0,
    'Prodajni davek formalno plača prodajalec, a ga lahko prevali na kupca - davčno breme je odvisno od elastičnosti ponudbe in povpraševanja.')),
  withId('qy39ve1', Q('Zakon bi zahteval, da je proračun vsako leto uravnotežen. Zakaj bi to onemogočilo proticiklično fiskalno politiko?', [
    'Uravnotežen proračun v recesiji zahteva rezanje izdatkov in deluje prociklično',
    'Uravnotežen proračun v recesiji samodejno poveča izdatke in BDP',
    'Ker zakon prepoveduje proračunski presežek v času razcveta',
    'Ker centralna banka ne sme financirati uravnoteženega proračuna'], 0,
    'V recesiji davčni prihodki padejo; če mora biti proračun uravnotežen, je treba zmanjšati izdatke, kar recesijo poglobi. Proticiklično: v razcvetu presežek, v recesiji primanjkljaj.')),
  withId('quxjmi6', Q('Centralna banka na odprtem trgu bankam proda državne obveznice. Kakšen je učinek?', [
    'Ponudba denarja se zmanjša, obrestne mere zrastejo',
    'Ponudba denarja se poveča, obrestne mere padejo',
    'Ponudba denarja se ne spremeni, padejo le cene obveznic',
    'Obvezne rezerve bank se samodejno povečajo za enak znesek'], 0,
    'S prodajo obveznic CB pobere denar iz obtoka (restriktivno). Nakup obveznic deluje obratno (ekspanzivno).')),
  withId('qs8zd5o', Q('Centralna banka zviša obrestno mero, po kateri posoja bankam (rediskontno stopnjo). Kakšen je učinek?', [
    'Zmanjša obseg kreditov CB bankam, obrestne mere bank zrastejo',
    'Poveča obseg kreditov CB bankam, obrestne mere bank padejo',
    'Poveča presežek rezerv poslovnih bank in s tem kreditiranje',
    'Ne vpliva na banke, spremeni le devizni tečaj domače valute'], 0,
    'Rediskontna stopnja je cena kredita CB bankam; višja → dražji viri bank → višje obrestne mere za podjetja → manj naložb, nižji AD.')),
  withId('q85hh1x', Q('Banke morajo po novem v obveznih rezervah držati večji delež vlog. Kakšni so učinki na gospodarstvo?', [
    'Manj presežnih rezerv in kreditov, višje obresti, nižji AD, BDP in cene',
    'Več presežnih rezerv in kreditov, nižje obresti, višji AD in BDP',
    'Manj kreditov, a višji AD zaradi večjega varčevanja v bankah',
    'Višje obresti, a višji BDP, ker banke dobijo več depozitov'], 0,
    'Analitično: M↓ → i↑ → I↓ → AD↓ → P↓, Q↓. Restriktivna monetarna politika - uporablja se za zniževanje inflacije.')),
  withId('qg97hvy', C('Centralna banka zviša stopnjo obveznih rezerv z 10 % na 12,5 %. Kako se spremeni denarni multiplikator?', [
    'Z 10 na 8', 'Z 8 na 10', 'Z 10 na 7,5', 'Z 0,1 na 0,125'], 0,
    'Md = 1 / stopnja obveznih rezerv: 1/0,10 = 10, 1/0,125 = 8. Banke lahko ustvarijo manj novega denarja.')),
  withId('qfzs68i', C('Y = 800, G = 200, I = 150, C = 450, T = 180, MNP = 0,8. Investicije padejo za 20. Kolikšen je nov output?', [
    '700', '780', '720', '750'], 0,
    'MNV = 0,2, multiplikator = 1/0,2 = 5. ΔY = 5 × (−20) = −100 → Y = 700. (780 = brez multiplikatorja, 720 = z napačnim multiplikatorjem 4.)')),
  withId('qi0uox7', C('Y = 700 (po padcu investicij), G = 200, T = 180, MNP = 0,8 (primanjkljaj 20). Vlada želi samo z davki spet doseči Y = 800. Kaj mora storiti in kolikšen bo primanjkljaj?', [
    'Znižati davke za 25, primanjkljaj 45', 'Znižati davke za 20, primanjkljaj 40', 'Znižati davke za 100, primanjkljaj 120', 'Zvišati davke za 25, presežek 5'], 0,
    'Davčni multiplikator = −MNP/MNV = −0,8/0,2 = −4. Potrebni ΔY = +100 → ΔT = 100 / (−4) = −25 → T = 155, primanjkljaj = 200 − 155 = 45.')),
  withId('q1gtqdz5', Q('Kako uvoz vpliva na velikost multiplikatorja v odprtem gospodarstvu?', [
    '1 / (MNV + MNU) - manjši, ker del dohodka odteka v uvoz',
    '1 / MNV - enak kot v zaprtem gospodarstvu',
    '1 / (MNV − MNU) - večji, ker izvoz poveča dohodek',
    'MNP / MNV - enak davčnemu multiplikatorju'], 0,
    'MNU = mejna nagnjenost k uvozu. Uvoz je odtekanje iz krožnega toka dohodka, zato je multiplikator manjši kot v zaprtem gospodarstvu.')),
  withId('qtnyykx', { q: "Za 1 € je bilo treba odšteti 0,96 švicarskega franka, zdaj le še 0,90 franka. Kaj se je zgodilo in kako to vpliva na švicarski izvoz v evroobmočje?",
      options: ["Frank je apreciiral, evro depreciiral; švicarski izvoz v evroobmočje se zmanjša","Frank je depreciiral, evro apreciiral; švicarski izvoz v evroobmočje se poveča","Frank je apreciiral; švicarski izvoz se poveča, ker je močna valuta znak konkurenčnosti","Gre za devalvacijo evra, ki jo je izvedla Evropska centralna banka"],
      correct: 0,
      explanation: "Za evro dobimo manj frankov, zato je evro cenejši, frank pa dražji. Švicarsko blago je za kupce v evroobmočju dražje, izvoz pade. Devalvacija je izraz za znižanje fiksnega tečaja; pri prosto drsečem tečaju govorimo o depreciaciji." }),
  withId('q1yq6zjy', Q('Valuta s prosto drsečim tečajem na trgu izgubi vrednost. Kako imenujemo ta pojav?', [
    'Depreciacija', 'Devalvacija', 'Revalvacija', 'Dezinflacija'], 0,
    'Fleksibilni tečaj: depreciacija/apreciacija (trg). Stalni tečaj: devalvacija/revalvacija (uradna odločitev).')),
  withId('qjjddag', Q('Katero pravilo za strukturni primanjkljaj določa fiskalni pakt?', [
    'Na letni ravni ne sme presegati 0,5 % BDP',
    'Na letni ravni ne sme presegati 3 % BDP',
    'Na letni ravni ne sme presegati 60 % BDP',
    'Mora biti vsako leto enak nič'], 0,
    'Fiskalni pakt krepi proračunsko disciplino: strukturni primanjkljaj do 0,5 % BDP. 3 % (dejanski primanjkljaj) in 60 % (dolg) sta maastrichtska kriterija.')),
  withId('q1l8wuel', Q('Katero od naslednjih pravil je eno od temeljnih načel WTO?', [
    'Trgovinske ovire se uporabljajo nediskriminatorno za vse države',
    'Vsaka država lahko carine prosto zviša brez nadomestila',
    'Trgovinske spore rešujejo s povračilnimi carinami',
    'Pomoč državam v tranziciji pri plačilni bilanci'], 0,
    'WTO: zniževanje ovir, nediskriminacija, nadomestilo ob zvišanju carin, spori s pogovori in arbitražo. Pomoč pri plačilni bilanci je naloga IMF.')),
  withId('q1oemkqz', Q('Kako se razlikujeta nalogi Svetovne banke in Mednarodnega denarnega sklada?', [
    'Svetovna banka financira razvojne projekte, IMF pomaga pri plačilnobilančnih težavah',
    'Svetovna banka vodi monetarno politiko, IMF nadzira mednarodno trgovino',
    'Svetovna banka rešuje trgovinske spore, IMF financira infrastrukturo',
    'Obe instituciji izdajata skupno svetovno valuto in nadzirata banke'], 0,
    'Svetovna banka: razvojni projekti in tehnična pomoč manj razvitim (infrastruktura, zdravstvo, šolstvo). IMF: države s težavami v plačilni bilanci in odplačilu dolgov.')),
  withId('qi5cg6x', Q('Katera opredelitev povračilne carine je pravilna?', [
    'Odgovor na carine, ki jih je uvedla druga država',
    'Carina, ki uvoz tujega blaga popolnoma onemogoči',
    'Carina, ki državi prinese največjo možno korist',
    'Carina, ki tuje blago podraži na raven domačega'], 0,
    'Prohibitivna onemogoči uvoz, optimalna maksimira korist države, kompenzacijska izenači ceno tujega blaga z domačim.')),
  withId('q1tc2x7s', Q('Kako poteka začarani krog revščine v nerazvitih državah?', [
    'Nizek dohodek → malo varčevanja in naložb → spet nizek dohodek',
    'Razvite države izkoriščajo nerazvite z nizkimi cenami surovin',
    'Hiperinflacija zaradi tiskanja denarja v revnih državah',
    'Preseljevanje izobraženih ljudi iz revnih v bogate države'], 0,
    'Nizek dohodek pomeni nizko varčevanje, malo kapitala in nizko produktivnost, kar spet vodi v nizek dohodek. Prekinejo ga lahko tuje naložbe in pomoč.')),
  withId('q1875ewh', Q('Ribiči v skupnem jezeru lovijo, dokler rib ne zmanjka. Kaj pojasnjuje ta primer tragedije skupnega?', [
    'Prekomerna raba skupne dobrine, ker posameznik ne nosi vseh stroškov',
    'Premajhna proizvodnja javnih dobrin zaradi problema zastonjkarstva',
    'Izguba blaginje zaradi monopolne cene, ki je nad mejnimi stroški',
    'Sočasni padec BDP v vseh državah ob izbruhu svetovne krize'], 0,
    'Ko je strošek uporabe za posameznika nižji od družbenega, se vir (ribolov, pašniki) prekomerno izrablja - lahko vse do uničenja.')),
  withId('qiweagr', Q('Katera lastnost je značilna za javne dobrine, npr. narodno obrambo?', [
    'Koristi imajo vsi, ne glede na to, ali kdo zanje plača',
    'Proizvaja jih izključno država in jih prodaja po tržni ceni',
    'Uporaba enega posameznika zmanjša količino za vse druge',
    'Uporabnike je mogoče preprosto izključiti z višjo ceno'], 0,
    'Javne dobrine so nekonkurenčne in neizključljive (npr. obramba, svetilnik), zato jih trg proizvaja premalo - problem zastonjkarstva.')),
  withId('q868oup', Q('Zakaj je monopol alokacijsko neučinkovit?', [
    'Monopolist proizvaja manj po višji ceni (P > MC), nastane mrtva izguba',
    'Monopolist proizvaja več po nižji ceni, kot bi bilo družbeno optimalno',
    'Monopolist ima višje stroške, ker nima konkurence',
    'Monopolist ne more prodati vse proizvodnje po enotni ceni'], 0,
    'Ker je cena nad mejnimi stroški, so kupci pripravljeni plačati več od oportunitetnih stroškov dodatne enote - proizvodnja je premajhna, gospodarstvo je pod transformacijsko krivuljo.')),
  withId('q1kooxrt', Q('Kaj opisuje transmisijski mehanizem denarne politike?', [
    'Pot, po kateri sprememba ponudbe denarja vpliva na output in cene',
    'Mehanizem, s katerim davki vplivajo na razporeditev dohodka med ljudi',
    'Prenos inflacije iz tujine v domače gospodarstvo prek uvoznih cen',
    'Samodejno uravnavanje plačilne bilance prek mednarodnih tokov zlata'], 0,
    'M → obrestna mera → naložbe → AD → BDP in cene. Zadnji odgovor opisuje Humov mehanizem.')),
  withId('qny8c29', Q('Kako je videti kratkoročna krivulja agregatne ponudbe pri klasikih in kako pri keynesiancih?', [
    'Klasiki: navpična; keynesianci: vodoravna',
    'Klasiki: vodoravna; keynesianci: navpična',
    'Obe šoli: kratkoročno naraščajoča krivulja',
    'Klasiki: padajoča; keynesianci: naraščajoča'], 0,
    'Klasiki: prilagodljive cene, output vedno pri potencialnem (Sayev zakon). Keynes: rigidne cene in mezde, output določa AD. Monetaristi in neoklasiki: kratkoročno naraščajoča, dolgoročno navpična.')),
  withId('qwy4579', Q('Kaj po Samuelsonu velja za dolgoročni razvoj razvitih gospodarstev?', [
    'Kapitalsko poglabljanje, rast realnih plač, stalen delež plač',
    'Rast kapitalskega količnika K/Q in dolgoročen padec realnih plač',
    'Rast outputa, ki je počasnejša od rasti dela in kapitala',
    'Naraščajoč delež narodnega varčevanja v BDP od leta 1980'], 0,
    'K raste hitreje od zaposlenosti, K/Q pada (nasprotno od napovedi), realne plače rastejo, delež plač je stalen, varčevanje od 1980 pada, output raste hitreje od L in K → vloga tehnologije.')),
  withId('qn63gur', Q('Katera kombinacija politik zniža visoko inflacijo?', [
    'Restriktivna monetarna in restriktivna fiskalna politika',
    'Ekspanzivna monetarna in restriktivna fiskalna politika',
    'Ekspanzivna monetarna in ekspanzivna fiskalna politika',
    'Restriktivna monetarna in ekspanzivna fiskalna politika'], 0,
    'Manj denarja, višje obresti, višji davki in nižji izdatki zmanjšajo AD → nižje cene (a tudi nižji BDP).')),
];

module.exports = {
  id: 'makro',
  parts: [{ id: 'izpit', decks: [{ id: 'makro-roki', name: 'Vaje v slogu izpita: pojmi in politike', questions: roki }] }],
};
