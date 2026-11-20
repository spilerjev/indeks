/* Makroekonomija 1 - dodatne vaje v slogu izpita (pojmi, denarna in fiskalna politika, mednarodna ekonomija).
   Vprašanja so napisana na novo; računske naloge imajo nove številke. Teme, ki so že v makro.js, so izpuščene. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });

const roki = [
  Q('Inflacija nenadoma pospeši, česar ob sklepanju posojilnih pogodb nihče ni predvidel. Kaj se zgodi s premoženjem?', [
    'Prerazdeli premoženje od upnikov k dolžnikom',
    'Prerazdeli premoženje od dolžnikov k upnikom',
    'Ne vpliva na porazdelitev, ker je vključena v pogodbe',
    'Vse cene zrastejo za enak odstotek, relativne ostanejo'], 0,
    'Dolžniki vračajo realno manj vreden denar. Anticipirana inflacija je vključena v obrestne mere in pogodbe, zato malo vpliva. Zadnji odgovor opisuje ravnovesno inflacijo.'),
  Q('Katera razvrstitev inflacije temelji na njeni intenzivnosti (višini)?', [
    'Zmerna, galopirajoča in hiperinflacija',
    'Anticipirana, neanticipirana in ravnovesna',
    'Stroškovna, povpraševalna in uvožena',
    'Kratkoročna, srednjeročna in dolgoročna'], 0,
    'Po intenzivnosti: zmerna, galopirajoča, hiperinflacija. Po pričakovanju: anticipirana/neanticipirana. Po gibanju relativnih cen: ravnovesna/neravnovesna.'),
  Q('Inflacija se je znižala s 6 % na 2 %. Kaj opisuje izraz dezinflacija?', [
    'Zmanjševanje stopnje inflacije (cene še rastejo, a počasneje)',
    'Padanje splošne ravni cen skozi daljše obdobje',
    'Hkratna visoka inflacija in visoka brezposelnost',
    'Inflacija, pri kateri se relativne cene ne spremenijo'], 0,
    'Dezinflacija = nižja stopnja inflacije. Padanje ravni cen je deflacija, hkratna inflacija in stagnacija je stagflacija.'),
  Q('Katere vloge (funkcije) opravlja denar v gospodarstvu?', [
    'Menjalno in plačilno sredstvo, merilec in hranilec vrednosti, svetovni denar',
    'Menjalno sredstvo, vir dobička, merilo blaginje in vir davkov',
    'Plačilno sredstvo, investicijsko sredstvo, rezerva CB in merilo cen',
    'Hranilec vrednosti, vir posojil, merilec BDP in zavarovanje'], 0,
    'Pri evru sta posebej izpostavljeni funkciji svetovnega denarja in hranilca vrednosti; v krizah je ključna stabilnost hranilca in merilca vrednosti.'),
  Q('Po čem se prispevek za socialno varnost razlikuje od davka?', [
    'Pri prispevku vemo namen porabe (npr. socialna varnost), pri davku ne',
    'Davek je prostovoljen, prispevek je obvezen za vse zaposlene',
    'Prispevek plačujejo samo podjetja, davek samo gospodinjstva',
    'Davek je vedno sorazmeren, prispevek pa vedno progresiven'], 0,
    'Davek je obvezna dajatev brez neposredne protidajatve in vnaprej znane namembnosti. Davčno trojico sestavljajo davki, prispevki in dohodnina.'),
  Q('Mejna davčna stopnja pove, kolikšen del dodatnega evra dohodka pobere država. Kako jo izračunamo?', [
    'Sprememba davka / sprememba davčne osnove',
    'Znesek davka / davčna osnova',
    'Znesek davka / bruto domači proizvod',
    'Sprememba davčne osnove / sprememba davka'], 0,
    'Povprečna davčna stopnja = davek / osnova. Pri progresivnem davku je mejna stopnja višja od povprečne.'),
  Q('Na katerih načelih naj temelji pravičen davčni sistem?', [
    'Načelo koristi, plačilne sposobnosti ter vodoravne in navpične enakosti',
    'Načelo dobička, likvidnosti in varnosti davčnega zavezanca',
    'Načelo nediskriminacije, recipročnosti in arbitraže',
    'Načelo enake stopnje, enkratnega plačila in prostovoljnosti'], 0,
    'Vodoravna enakost: enaki plačajo enako. Navpična: tisti z višjim dohodkom plačajo več (plačilna sposobnost).'),
  Q('Trošarino formalno plača prodajalec, a cena za kupce zraste. Kaj opisuje pojem davčnega bremena (incidence)?', [
    'Končno ekonomsko breme davka - kdo ga dejansko nosi',
    'Skupni znesek davkov, ki jih država pobere v letu',
    'Delež davkov v BDP posamezne države',
    'Strošek davčne uprave pri pobiranju davkov'], 0,
    'Prodajni davek formalno plača prodajalec, a ga lahko prevali na kupca - davčno breme je odvisno od elastičnosti ponudbe in povpraševanja.'),
  Q('Zakon bi zahteval, da je proračun vsako leto uravnotežen. Zakaj bi to onemogočilo proticiklično fiskalno politiko?', [
    'Uravnotežen proračun v recesiji zahteva rezanje izdatkov in deluje prociklično',
    'Uravnotežen proračun v recesiji samodejno poveča izdatke in BDP',
    'Ker zakon prepoveduje proračunski presežek v času razcveta',
    'Ker centralna banka ne sme financirati uravnoteženega proračuna'], 0,
    'V recesiji davčni prihodki padejo; če mora biti proračun uravnotežen, je treba zmanjšati izdatke, kar recesijo poglobi. Proticiklično: v razcvetu presežek, v recesiji primanjkljaj.'),
  Q('Centralna banka na odprtem trgu bankam proda državne obveznice. Kakšen je učinek?', [
    'Ponudba denarja se zmanjša, obrestne mere zrastejo',
    'Ponudba denarja se poveča, obrestne mere padejo',
    'Ponudba denarja se ne spremeni, padejo le cene obveznic',
    'Obvezne rezerve bank se samodejno povečajo za enak znesek'], 0,
    'S prodajo obveznic CB pobere denar iz obtoka (restriktivno). Nakup obveznic deluje obratno (ekspanzivno).'),
  Q('Centralna banka zviša obrestno mero, po kateri posoja bankam (rediskontno stopnjo). Kakšen je učinek?', [
    'Zmanjša obseg kreditov CB bankam, obrestne mere bank zrastejo',
    'Poveča obseg kreditov CB bankam, obrestne mere bank padejo',
    'Poveča presežek rezerv poslovnih bank in s tem kreditiranje',
    'Ne vpliva na banke, spremeni le devizni tečaj domače valute'], 0,
    'Rediskontna stopnja je cena kredita CB bankam; višja → dražji viri bank → višje obrestne mere za podjetja → manj naložb, nižji AD.'),
  Q('Banke morajo po novem v obveznih rezervah držati večji delež vlog. Kakšni so učinki na gospodarstvo?', [
    'Manj presežnih rezerv in kreditov, višje obresti, nižji AD, BDP in cene',
    'Več presežnih rezerv in kreditov, nižje obresti, višji AD in BDP',
    'Manj kreditov, a višji AD zaradi večjega varčevanja v bankah',
    'Višje obresti, a višji BDP, ker banke dobijo več depozitov'], 0,
    'Analitično: M↓ → i↑ → I↓ → AD↓ → P↓, Q↓. Restriktivna monetarna politika - uporablja se za zniževanje inflacije.'),
  C('Centralna banka zviša stopnjo obveznih rezerv z 10 % na 12,5 %. Kako se spremeni denarni multiplikator?', [
    'Z 10 na 8', 'Z 8 na 10', 'Z 10 na 7,5', 'Z 0,1 na 0,125'], 0,
    'Md = 1 / stopnja obveznih rezerv: 1/0,10 = 10, 1/0,125 = 8. Banke lahko ustvarijo manj novega denarja.'),
  C('Y = 800, G = 200, I = 150, C = 450, T = 180, MNP = 0,8. Investicije padejo za 20. Kolikšen je nov output?', [
    '700', '780', '720', '750'], 0,
    'MNV = 0,2, multiplikator = 1/0,2 = 5. ΔY = 5 × (−20) = −100 → Y = 700. (780 = brez multiplikatorja, 720 = z napačnim multiplikatorjem 4.)'),
  C('Y = 700 (po padcu investicij), G = 200, T = 180, MNP = 0,8 (primanjkljaj 20). Vlada želi samo z davki spet doseči Y = 800. Kaj mora storiti in kolikšen bo primanjkljaj?', [
    'Znižati davke za 25, primanjkljaj 45', 'Znižati davke za 20, primanjkljaj 40', 'Znižati davke za 100, primanjkljaj 120', 'Zvišati davke za 25, presežek 5'], 0,
    'Davčni multiplikator = −MNP/MNV = −0,8/0,2 = −4. Potrebni ΔY = +100 → ΔT = 100 / (−4) = −25 → T = 155, primanjkljaj = 200 − 155 = 45.'),
  Q('Kako uvoz vpliva na velikost multiplikatorja v odprtem gospodarstvu?', [
    '1 / (MNV + MNU) - manjši, ker del dohodka odteka v uvoz',
    '1 / MNV - enak kot v zaprtem gospodarstvu',
    '1 / (MNV − MNU) - večji, ker izvoz poveča dohodek',
    'MNP / MNV - enak davčnemu multiplikatorju'], 0,
    'MNU = mejna nagnjenost k uvozu. Uvoz je odtekanje iz krožnega toka dohodka, zato je multiplikator manjši kot v zaprtem gospodarstvu.'),
  Q('Tečaj se spremeni z 1,30 $/€ na 1,05 $/€. Kaj se zgodi?', [
    'Dolar apreciira, evro depreciira; ameriški uvoz iz evroobmočja zraste',
    'Evro apreciira, dolar depreciira; ameriški uvoz iz evroobmočja pade',
    'Dolar depreciira; ameriški izvoz v evroobmočje zraste',
    'Pri drsečem tečaju gre za revalvacijo evra in devalvacijo dolarja'], 0,
    'Za en evro je treba odšteti manj dolarjev → evro je cenejši, evropsko blago za Američane cenejše. Pri fiksnem tečaju bi govorili o devalvaciji evra.'),
  Q('Valuta s prosto drsečim tečajem na trgu izgubi vrednost. Kako imenujemo ta pojav?', [
    'Depreciacija', 'Devalvacija', 'Revalvacija', 'Dezinflacija'], 0,
    'Fleksibilni tečaj: depreciacija/apreciacija (trg). Stalni tečaj: devalvacija/revalvacija (uradna odločitev).'),
  Q('Katero pravilo za strukturni primanjkljaj določa fiskalni pakt?', [
    'Na letni ravni ne sme presegati 0,5 % BDP',
    'Na letni ravni ne sme presegati 3 % BDP',
    'Na letni ravni ne sme presegati 60 % BDP',
    'Mora biti vsako leto enak nič'], 0,
    'Fiskalni pakt krepi proračunsko disciplino: strukturni primanjkljaj do 0,5 % BDP. 3 % (dejanski primanjkljaj) in 60 % (dolg) sta maastrichtska kriterija.'),
  Q('Katero od naslednjih pravil je eno od temeljnih načel WTO?', [
    'Trgovinske ovire se uporabljajo nediskriminatorno za vse države',
    'Vsaka država lahko carine prosto zviša brez nadomestila',
    'Trgovinske spore rešujejo s povračilnimi carinami',
    'Pomoč državam v tranziciji pri plačilni bilanci'], 0,
    'WTO: zniževanje ovir, nediskriminacija, nadomestilo ob zvišanju carin, spori s pogovori in arbitražo. Pomoč pri plačilni bilanci je naloga IMF.'),
  Q('Kako se razlikujeta nalogi Svetovne banke in Mednarodnega denarnega sklada?', [
    'Svetovna banka financira razvojne projekte, IMF pomaga pri plačilnobilančnih težavah',
    'Svetovna banka vodi monetarno politiko, IMF nadzira mednarodno trgovino',
    'Svetovna banka rešuje trgovinske spore, IMF financira infrastrukturo',
    'Obe instituciji izdajata skupno svetovno valuto in nadzirata banke'], 0,
    'Svetovna banka: razvojni projekti in tehnična pomoč manj razvitim (infrastruktura, zdravstvo, šolstvo). IMF: države s težavami v plačilni bilanci in odplačilu dolgov.'),
  Q('Katera opredelitev povračilne carine je pravilna?', [
    'Odgovor na carine, ki jih je uvedla druga država',
    'Carina, ki uvoz tujega blaga popolnoma onemogoči',
    'Carina, ki državi prinese največjo možno korist',
    'Carina, ki tuje blago podraži na raven domačega'], 0,
    'Prohibitivna onemogoči uvoz, optimalna maksimira korist države, kompenzacijska izenači ceno tujega blaga z domačim.'),
  Q('Kako poteka začarani krog revščine v nerazvitih državah?', [
    'Nizek dohodek → malo varčevanja in naložb → spet nizek dohodek',
    'Razvite države izkoriščajo nerazvite z nizkimi cenami surovin',
    'Hiperinflacija zaradi tiskanja denarja v revnih državah',
    'Preseljevanje izobraženih ljudi iz revnih v bogate države'], 0,
    'Nizek dohodek pomeni nizko varčevanje, malo kapitala in nizko produktivnost, kar spet vodi v nizek dohodek. Prekinejo ga lahko tuje naložbe in pomoč.'),
  Q('Ribiči v skupnem jezeru lovijo, dokler rib ne zmanjka. Kaj pojasnjuje ta primer tragedije skupnega?', [
    'Prekomerna raba skupne dobrine, ker posameznik ne nosi vseh stroškov',
    'Premajhna proizvodnja javnih dobrin zaradi problema zastonjkarstva',
    'Izguba blaginje zaradi monopolne cene, ki je nad mejnimi stroški',
    'Sočasni padec BDP v vseh državah ob izbruhu svetovne krize'], 0,
    'Ko je strošek uporabe za posameznika nižji od družbenega, se vir (ribolov, pašniki) prekomerno izrablja - lahko vse do uničenja.'),
  Q('Katera lastnost je značilna za javne dobrine, npr. narodno obrambo?', [
    'Koristi imajo vsi, ne glede na to, ali kdo zanje plača',
    'Proizvaja jih izključno država in jih prodaja po tržni ceni',
    'Uporaba enega posameznika zmanjša količino za vse druge',
    'Uporabnike je mogoče preprosto izključiti z višjo ceno'], 0,
    'Javne dobrine so nekonkurenčne in neizključljive (npr. obramba, svetilnik), zato jih trg proizvaja premalo - problem zastonjkarstva.'),
  Q('Zakaj je monopol alokacijsko neučinkovit?', [
    'Monopolist proizvaja manj po višji ceni (P > MC), nastane mrtva izguba',
    'Monopolist proizvaja več po nižji ceni, kot bi bilo družbeno optimalno',
    'Monopolist ima višje stroške, ker nima konkurence',
    'Monopolist ne more prodati vse proizvodnje po enotni ceni'], 0,
    'Ker je cena nad mejnimi stroški, so kupci pripravljeni plačati več od oportunitetnih stroškov dodatne enote - proizvodnja je premajhna, gospodarstvo je pod transformacijsko krivuljo.'),
  Q('Kaj opisuje transmisijski mehanizem denarne politike?', [
    'Pot, po kateri sprememba ponudbe denarja vpliva na output in cene',
    'Mehanizem, s katerim davki vplivajo na razporeditev dohodka med ljudi',
    'Prenos inflacije iz tujine v domače gospodarstvo prek uvoznih cen',
    'Samodejno uravnavanje plačilne bilance prek mednarodnih tokov zlata'], 0,
    'M → obrestna mera → naložbe → AD → BDP in cene. Zadnji odgovor opisuje Humov mehanizem.'),
  Q('Kako je videti kratkoročna krivulja agregatne ponudbe pri klasikih in kako pri keynesiancih?', [
    'Klasiki: navpična; keynesianci: vodoravna',
    'Klasiki: vodoravna; keynesianci: navpična',
    'Obe šoli: kratkoročno naraščajoča krivulja',
    'Klasiki: padajoča; keynesianci: naraščajoča'], 0,
    'Klasiki: prilagodljive cene, output vedno pri potencialnem (Sayev zakon). Keynes: rigidne cene in mezde, output določa AD. Monetaristi in neoklasiki: kratkoročno naraščajoča, dolgoročno navpična.'),
  Q('Kaj po Samuelsonu velja za dolgoročni razvoj razvitih gospodarstev?', [
    'Kapitalsko poglabljanje, rast realnih plač, stalen delež plač',
    'Rast kapitalskega količnika K/Q in dolgoročen padec realnih plač',
    'Rast outputa, ki je počasnejša od rasti dela in kapitala',
    'Naraščajoč delež narodnega varčevanja v BDP od leta 1980'], 0,
    'K raste hitreje od zaposlenosti, K/Q pada (nasprotno od napovedi), realne plače rastejo, delež plač je stalen, varčevanje od 1980 pada, output raste hitreje od L in K → vloga tehnologije.'),
  Q('Katera kombinacija politik zniža visoko inflacijo?', [
    'Restriktivna monetarna in restriktivna fiskalna politika',
    'Ekspanzivna monetarna in restriktivna fiskalna politika',
    'Ekspanzivna monetarna in ekspanzivna fiskalna politika',
    'Restriktivna monetarna in ekspanzivna fiskalna politika'], 0,
    'Manj denarja, višje obresti, višji davki in nižji izdatki zmanjšajo AD → nižje cene (a tudi nižji BDP).'),
];

module.exports = {
  id: 'makro',
  parts: [{ id: 'izpit', decks: [{ id: 'makro-roki', name: 'Vaje v slogu izpita: pojmi in politike', questions: roki }] }],
};
