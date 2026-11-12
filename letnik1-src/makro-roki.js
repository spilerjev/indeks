/* Makroekonomija 1 - dodatna vprašanja iz posameznih izpitnih rokov (EF Zapiski: 2012 1.-3. rok, 2013, 2015, 2016,
   2017 2. rok, 2018 2. rok, roka "X" in "Z"). Teme, ki so že v makro.js, so izpuščene. Študentske rešitve so preverjene;
   napačne trditve iz njih (npr. "WTO je nastala v Bretton Woodsu", "za konkurenčnost dvignemo tečaj lastne valute") niso prevzete. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });

const roki = [
  Q('(Izpit) Kaj je značilno za NEANTICIPIRANO (nepričakovano) inflacijo?', [
    'Prerazdeli premoženje od upnikov k dolžnikom',
    'Prerazdeli premoženje od dolžnikov k upnikom',
    'Ne vpliva na porazdelitev, ker je vključena v pogodbe',
    'Vse cene zrastejo za enak odstotek, relativne ostanejo'], 0,
    'Dolžniki vračajo realno manj vreden denar. Anticipirana inflacija je vključena v obrestne mere in pogodbe, zato malo vpliva. Zadnji odgovor opisuje ravnovesno inflacijo.'),
  Q('(Izpit) Kako delimo inflacijo po intenzivnosti?', [
    'Zmerna, galopirajoča in hiperinflacija',
    'Anticipirana, neanticipirana in ravnovesna',
    'Stroškovna, povpraševalna in uvožena',
    'Kratkoročna, srednjeročna in dolgoročna'], 0,
    'Po intenzivnosti: zmerna, galopirajoča, hiperinflacija. Po pričakovanju: anticipirana/neanticipirana. Po gibanju relativnih cen: ravnovesna/neravnovesna.'),
  Q('(Izpit) Kaj je dezinflacija?', [
    'Zmanjševanje stopnje inflacije (cene še rastejo, a počasneje)',
    'Padanje splošne ravni cen skozi daljše obdobje',
    'Hkratna visoka inflacija in visoka brezposelnost',
    'Inflacija, pri kateri se relativne cene ne spremenijo'], 0,
    'Dezinflacija = nižja stopnja inflacije. Padanje ravni cen je deflacija, hkratna inflacija in stagnacija je stagflacija.'),
  Q('(Izpit) Katere so funkcije denarja?', [
    'Menjalno in plačilno sredstvo, merilec in hranilec vrednosti, svetovni denar',
    'Menjalno sredstvo, vir dobička, merilo blaginje in vir davkov',
    'Plačilno sredstvo, investicijsko sredstvo, rezerva CB in merilo cen',
    'Hranilec vrednosti, vir posojil, merilec BDP in zavarovanje'], 0,
    'Pri evru sta posebej izpostavljeni funkciji svetovnega denarja in hranilca vrednosti; v krizah je ključna stabilnost hranilca in merilca vrednosti.'),
  Q('(Izpit) Kakšna je razlika med davkom in prispevkom?', [
    'Pri prispevku vemo namen porabe (npr. socialna varnost), pri davku ne',
    'Davek je prostovoljen, prispevek je obvezen za vse zaposlene',
    'Prispevek plačujejo samo podjetja, davek samo gospodinjstva',
    'Davek je vedno sorazmeren, prispevek pa vedno progresiven'], 0,
    'Davek je obvezna dajatev brez neposredne protidajatve in vnaprej znane namembnosti. Davčno trojico sestavljajo davki, prispevki in dohodnina.'),
  Q('(Izpit) Kako izračunamo mejno davčno stopnjo?', [
    'Sprememba davka / sprememba davčne osnove',
    'Znesek davka / davčna osnova',
    'Znesek davka / bruto domači proizvod',
    'Sprememba davčne osnove / sprememba davka'], 0,
    'Povprečna davčna stopnja = davek / osnova. Pri progresivnem davku je mejna stopnja višja od povprečne.'),
  Q('(Izpit) Katera so načela obdavčenja?', [
    'Načelo koristi, plačilne sposobnosti ter vodoravne in navpične enakosti',
    'Načelo dobička, likvidnosti in varnosti davčnega zavezanca',
    'Načelo nediskriminacije, recipročnosti in arbitraže',
    'Načelo enake stopnje, enkratnega plačila in prostovoljnosti'], 0,
    'Vodoravna enakost: enaki plačajo enako. Navpična: tisti z višjim dohodkom plačajo več (plačilna sposobnost).'),
  Q('(Izpit) Kaj je davčno breme (incidenca)?', [
    'Končno ekonomsko breme davka - kdo ga dejansko nosi',
    'Skupni znesek davkov, ki jih država pobere v letu',
    'Delež davkov v BDP posamezne države',
    'Strošek davčne uprave pri pobiranju davkov'], 0,
    'Prodajni davek formalno plača prodajalec, a ga lahko prevali na kupca - davčno breme je odvisno od elastičnosti ponudbe in povpraševanja.'),
  Q('(Izpit) Zakaj je proticiklična fiskalna politika možna le z neuravnoteženim proračunom?', [
    'Uravnotežen proračun v recesiji zahteva rezanje izdatkov in deluje prociklično',
    'Uravnotežen proračun v recesiji samodejno poveča izdatke in BDP',
    'Ker zakon prepoveduje proračunski presežek v času razcveta',
    'Ker centralna banka ne sme financirati uravnoteženega proračuna'], 0,
    'V recesiji davčni prihodki padejo; če mora biti proračun uravnotežen, je treba zmanjšati izdatke, kar recesijo poglobi. Proticiklično: v razcvetu presežek, v recesiji primanjkljaj.'),
  Q('(Izpit) CB proda vrednostne papirje poslovnim bankam (politika odprtega trga). Kaj se zgodi?', [
    'Ponudba denarja se zmanjša, obrestne mere zrastejo',
    'Ponudba denarja se poveča, obrestne mere padejo',
    'Ponudba denarja se ne spremeni, padejo le cene obveznic',
    'Obvezne rezerve bank se samodejno povečajo za enak znesek'], 0,
    'S prodajo obveznic CB pobere denar iz obtoka (restriktivno). Nakup obveznic deluje obratno (ekspanzivno).'),
  Q('(Izpit) Kako na gospodarstvo vpliva dvig rediskontne stopnje centralne banke?', [
    'Zmanjša obseg kreditov CB bankam, obrestne mere bank zrastejo',
    'Poveča obseg kreditov CB bankam, obrestne mere bank padejo',
    'Poveča presežek rezerv poslovnih bank in s tem kreditiranje',
    'Ne vpliva na banke, spremeni le devizni tečaj domače valute'], 0,
    'Rediskontna stopnja je cena kredita CB bankam; višja → dražji viri bank → višje obrestne mere za podjetja → manj naložb, nižji AD.'),
  Q('(Izpit) CB poveča stopnjo obveznih rezerv. Kakšni so učinki?', [
    'Manj presežnih rezerv in kreditov, višje obresti, nižji AD, BDP in cene',
    'Več presežnih rezerv in kreditov, nižje obresti, višji AD in BDP',
    'Manj kreditov, a višji AD zaradi večjega varčevanja v bankah',
    'Višje obresti, a višji BDP, ker banke dobijo več depozitov'], 0,
    'Analitično: M↓ → i↑ → I↓ → AD↓ → P↓, Q↓. Restriktivna monetarna politika - uporablja se za zniževanje inflacije.'),
  C('(Izpit 2012) CB zviša stopnjo obveznih rezerv z 20 % na 25 %. Kako se spremeni denarni multiplikator?', [
    'S 5 na 4', 'S 4 na 5', 'S 5 na 3,75', 'Z 0,2 na 0,25'], 0,
    'Md = 1 / stopnja obveznih rezerv: 1/0,20 = 5, 1/0,25 = 4. Banke lahko ustvarijo manj novega denarja.'),
  C('(Izpit 2017) Y = 720, G = 300, I = 120, C = 300, T = 250, MNP = 0,75. Investicije padejo za 15. Nov output?', [
    '660', '705', '675', '700'], 0,
    'MNV = 0,25, multiplikator = 1/0,25 = 4. ΔY = 4 × (−15) = −60 → Y = 660. (705 = brez multiplikatorja.)'),
  C('(Izpit 2017) Y = 660 (po padcu investicij), G = 300, T = 250, MNP = 0,75 (primanjkljaj 50). Vlada želi z davki spet doseči Y = 720. Kaj mora storiti in kolikšen bo primanjkljaj?', [
    'Znižati davke za 20, primanjkljaj 70', 'Znižati davke za 15, primanjkljaj 65', 'Znižati davke za 60, primanjkljaj 110', 'Zvišati davke za 20, primanjkljaj 30'], 0,
    'Davčni multiplikator = −MNP/MNV = −3. Potrebni ΔY = +60 → ΔT = 60 / (−3) = −20 → T = 230, primanjkljaj = 300 − 230 = 70.'),
  Q('(Izpit) Kaj je multiplikator v odprtem gospodarstvu?', [
    '1 / (MNV + MNU) - manjši, ker del dohodka odteka v uvoz',
    '1 / MNV - enak kot v zaprtem gospodarstvu',
    '1 / (MNV − MNU) - večji, ker izvoz poveča dohodek',
    'MNP / MNV - enak davčnemu multiplikatorju'], 0,
    'MNU = mejna nagnjenost k uvozu. Uvoz je odtekanje iz krožnega toka dohodka, zato je multiplikator manjši kot v zaprtem gospodarstvu.'),
  Q('(Izpit 2012) Tečaj se spremeni z 1,5 $/€ na 1,1 $/€. Kaj se zgodi?', [
    'Dolar apreciira, evro depreciira; ameriški uvoz iz evroobmočja zraste',
    'Evro apreciira, dolar depreciira; ameriški uvoz iz evroobmočja pade',
    'Dolar depreciira; ameriški izvoz v evroobmočje zraste',
    'Pri drsečem tečaju gre za revalvacijo evra in devalvacijo dolarja'], 0,
    'Za en evro je treba odšteti manj dolarjev → evro je cenejši, evropsko blago za Američane cenejše. Pri fiksnem tečaju bi govorili o devalvaciji evra.'),
  Q('(Izpit) Kateri izraz uporabimo za izgubo vrednosti valute pri DRSEČEM (fleksibilnem) deviznem tečaju?', [
    'Depreciacija', 'Devalvacija', 'Revalvacija', 'Dezinflacija'], 0,
    'Fleksibilni tečaj: depreciacija/apreciacija (trg). Stalni tečaj: devalvacija/revalvacija (uradna odločitev).'),
  Q('(Izpit) Kaj velja po fiskalnem paktu za strukturni primanjkljaj?', [
    'Na letni ravni ne sme presegati 0,5 % BDP',
    'Na letni ravni ne sme presegati 3 % BDP',
    'Na letni ravni ne sme presegati 60 % BDP',
    'Mora biti vsako leto enak nič'], 0,
    'Fiskalni pakt krepi proračunsko disciplino: strukturni primanjkljaj do 0,5 % BDP. 3 % (dejanski primanjkljaj) in 60 % (dolg) sta maastrichtska kriterija.'),
  Q('(Izpit) Katero je eno od temeljnih načel Svetovne trgovinske organizacije (WTO)?', [
    'Trgovinske ovire se uporabljajo nediskriminatorno za vse države',
    'Vsaka država lahko carine prosto zviša brez nadomestila',
    'Trgovinske spore rešujejo s povračilnimi carinami',
    'Pomoč državam v tranziciji pri plačilni bilanci'], 0,
    'WTO: zniževanje ovir, nediskriminacija, nadomestilo ob zvišanju carin, spori s pogovori in arbitražo. Pomoč pri plačilni bilanci je naloga IMF.'),
  Q('(Izpit) Kakšna je vloga Svetovne banke v primerjavi z IMF?', [
    'Svetovna banka financira razvojne projekte, IMF pomaga pri plačilnobilančnih težavah',
    'Svetovna banka vodi monetarno politiko, IMF nadzira mednarodno trgovino',
    'Svetovna banka rešuje trgovinske spore, IMF financira infrastrukturo',
    'Obe instituciji izdajata skupno svetovno valuto in nadzirata banke'], 0,
    'Svetovna banka: razvojni projekti in tehnična pomoč manj razvitim (infrastruktura, zdravstvo, šolstvo). IMF: države s težavami v plačilni bilanci in odplačilu dolgov.'),
  Q('(Izpit) Kaj je povračilna carina?', [
    'Odgovor na carine, ki jih je uvedla druga država',
    'Carina, ki uvoz tujega blaga popolnoma onemogoči',
    'Carina, ki državi prinese največjo možno korist',
    'Carina, ki tuje blago podraži na raven domačega'], 0,
    'Prohibitivna onemogoči uvoz, optimalna maksimira korist države, kompenzacijska izenači ceno tujega blaga z domačim.'),
  Q('(Izpit) Kaj je začaran krog revščine?', [
    'Nizek dohodek → malo varčevanja in naložb → spet nizek dohodek',
    'Razvite države izkoriščajo nerazvite z nizkimi cenami surovin',
    'Hiperinflacija zaradi tiskanja denarja v revnih državah',
    'Preseljevanje izobraženih ljudi iz revnih v bogate države'], 0,
    'Nizek dohodek pomeni nizko varčevanje, malo kapitala in nizko produktivnost, kar spet vodi v nizek dohodek. Prekinejo ga lahko tuje naložbe in pomoč.'),
  Q('(Izpit) Kaj je tragedija skupnega (nezajemljivi viri)?', [
    'Prekomerna raba skupne dobrine, ker posameznik ne nosi vseh stroškov',
    'Premajhna proizvodnja javnih dobrin zaradi problema zastonjkarstva',
    'Izguba blaginje zaradi monopolne cene, ki je nad mejnimi stroški',
    'Sočasni padec BDP v vseh državah ob izbruhu svetovne krize'], 0,
    'Ko je strošek uporabe za posameznika nižji od družbenega, se vir (ribolov, pašniki) prekomerno izrablja - lahko vse do uničenja.'),
  Q('(Izpit) Kaj je značilno za javne dobrine?', [
    'Koristi imajo vsi, ne glede na to, ali kdo zanje plača',
    'Proizvaja jih izključno država in jih prodaja po tržni ceni',
    'Uporaba enega posameznika zmanjša količino za vse druge',
    'Uporabnike je mogoče preprosto izključiti z višjo ceno'], 0,
    'Javne dobrine so nekonkurenčne in neizključljive (npr. obramba, svetilnik), zato jih trg proizvaja premalo - problem zastonjkarstva.'),
  Q('(Izpit) Kaj je alokacijska neučinkovitost monopola?', [
    'Monopolist proizvaja manj po višji ceni (P > MC), nastane mrtva izguba',
    'Monopolist proizvaja več po nižji ceni, kot bi bilo družbeno optimalno',
    'Monopolist ima višje stroške, ker nima konkurence',
    'Monopolist ne more prodati vse proizvodnje po enotni ceni'], 0,
    'Ker je cena nad mejnimi stroški, so kupci pripravljeni plačati več od oportunitetnih stroškov dodatne enote - proizvodnja je premajhna, gospodarstvo je pod transformacijsko krivuljo.'),
  Q('(Izpit) Kaj je transmisijski mehanizem?', [
    'Pot, po kateri sprememba ponudbe denarja vpliva na output in cene',
    'Mehanizem, s katerim davki vplivajo na razporeditev dohodka med ljudi',
    'Prenos inflacije iz tujine v domače gospodarstvo prek uvoznih cen',
    'Samodejno uravnavanje plačilne bilance prek mednarodnih tokov zlata'], 0,
    'M → obrestna mera → naložbe → AD → BDP in cene. Zadnji odgovor opisuje Humov mehanizem.'),
  Q('(Izpit) Kakšna je kratkoročna krivulja AS po klasični in po keynesianski šoli?', [
    'Klasiki: navpična; keynesianci: vodoravna',
    'Klasiki: vodoravna; keynesianci: navpična',
    'Obe šoli: kratkoročno naraščajoča krivulja',
    'Klasiki: padajoča; keynesianci: naraščajoča'], 0,
    'Klasiki: prilagodljive cene, output vedno pri potencialnem (Sayev zakon). Keynes: rigidne cene in mezde, output določa AD. Monetaristi in neoklasiki: kratkoročno naraščajoča, dolgoročno navpična.'),
  Q('(Izpit) Kaj je značilno za dolgoročni razvoj gospodarstev (Samuelsonovi vidiki rasti)?', [
    'Kapitalsko poglabljanje, rast realnih plač, stalen delež plač',
    'Rast kapitalskega količnika K/Q in dolgoročen padec realnih plač',
    'Rast outputa, ki je počasnejša od rasti dela in kapitala',
    'Naraščajoč delež narodnega varčevanja v BDP od leta 1980'], 0,
    'K raste hitreje od zaposlenosti, K/Q pada (nasprotno od napovedi), realne plače rastejo, delež plač je stalen, varčevanje od 1980 pada, output raste hitreje od L in K → vloga tehnologije.'),
  Q('(Izpit) S katero kombinacijo politik bi znižali visoko inflacijo?', [
    'Restriktivna monetarna in restriktivna fiskalna politika',
    'Ekspanzivna monetarna in restriktivna fiskalna politika',
    'Ekspanzivna monetarna in ekspanzivna fiskalna politika',
    'Restriktivna monetarna in ekspanzivna fiskalna politika'], 0,
    'Manj denarja, višje obresti, višji davki in nižji izdatki zmanjšajo AD → nižje cene (a tudi nižji BDP).'),
];

module.exports = {
  id: 'makro',
  parts: [{ id: 'izpit', decks: [{ id: 'makro-roki', name: 'Posamezni izpitni roki 2012-2018', questions: roki }] }],
};
