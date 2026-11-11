/* MPSP - vprašanja iz preteklih izpitov (EF Zapiski/2. letnik/Management proizvodnih in storitvenih procesov/Izpiti/
   Izpit.docx in Vprašanja iz preteklih izpitov.docx). Študentske rešitve so preverjene s teorijo (Rusjan: MPSP);
   vprašanja tipa "obkroži pravilne" so preoblikovana v eno pravilno izbiro. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

module.exports = [
  Q('(Stari izpiti) Kateri ukrep NE sodi med načine zmanjševanja sezonskih nihanj v prodaji (izravnavanje povpraševanja)?', [
    'Spreminjanje števila zaposlenih', 'Diferenciacija cen', 'Odlogi dobave in rezervacije', 'Uvajanje proizvodov z drugačno sezonsko komponento'], 0,
    'Spreminjanje števila zaposlenih prilagaja ZMOGLJIVOST povpraševanju (strategija lovljenja); drugi trije ukrepi vplivajo na povpraševanje.'),
  Q('(Stari izpiti) Katera kategorija NE sodi v tabelo operativnega plana (MPS)?', [
    'Kosovnica', 'Predvideno povpraševanje', 'Razpoložljivo za dobavo (ATP)', 'Sprejeta naročila'], 0,
    'Operativni plan vsebuje predvideno povpraševanje, sprejeta naročila, končno zalogo, operativni plan in razpoložljivo za dobavo; kosovnica je vložek MRP.'),
  Q('(Stari izpiti) Kateri korak NE sodi v postopek MRP?', [
    'Določanje točke ponovnega naročila', 'Določanje neto potreb', 'Določanje velikosti serije', 'Vključevanje časovne komponente in eksplozija po kosovnici'], 0,
    'Točka ponovnega naročila je del modelov za NEODVISNO povpraševanje; MRP uravnava odvisno povpraševanje.'),
  Q('(Stari izpiti) Kaj je namen vhodno-izhodne kontrole?', [
    'Kontrola čakalnih vrst in pretočnih časov s prilagajanjem hitrosti lansiranja nalogov zmogljivosti', 'Določanje pravilnega vrstnega reda izvajanja nalogov na delovnem mestu s prednostnimi pravili', 'Preverjanje kakovosti vhodnih materialov in izhodnih proizvodov na vsakem delovnem mestu', 'Oskrba delovnih mest z vsem potrebnim za izvedbo nalogov (material, orodja, dokumentacija)'], 0,
    'Prevelika zaloga nedokončane proizvodnje → zmanjšamo hitrost lansiranja. Vrstni red določajo prednostna pravila; oskrbo delovnih mest dispečing.'),
  Q('(Stari izpiti) Katera trditev o predvidevanju povpraševanja drži?', [
    'Majhen N pri metodi drsečih sredin pomeni visoko odzivnost napovedi', 'V turbulentnem okolju so kvantitativne metode primernejše od kvalitativnih',
    'Kvantitativne metode temeljijo na mnenjih in presoji posameznikov', 'PANN pove smer odstopanja napovedi od dejanskega povpraševanja'], 0,
    'Manj obdobij v povprečju → hitrejši odziv, a manjša stabilnost. Kvantitativne metode izhajajo iz preteklih podatkov; smer odstopanja pove KNN.'),
  Q('(Stari izpiti) Kaj NE drži o ravneh strateškega planiranja?', [
    'Poslovna strategija sprejema odločitve o vzvodih izdelavnega procesa', 'Poslovna strategija določa konkurenčno prednost (dejavnike zmagovanja)',
    'Strategija sestavljenega podjetja razporeja finančna sredstva po področjih delovanja', 'Strategija poslovne funkcije upošteva odločitve poslovne strategije'], 0,
    'O vzvodih (zmogljivost, procesi, zaloge, kakovost, kadri …) odloča izdelavna (funkcijska) strategija.'),
  Q('(Stari izpiti) Kaj NE velja za kumulativno napako v napovedi (KNN)?', [
    'Če je KNN enaka 0, vemo, da se v napovedih nismo zmotili', 'Vrednost je lahko pozitivna ali negativna',
    'Pove smer odklanjanja napovedi (napovedujemo preveč ali premalo)', 'Izračunamo jo kot vsoto napak v napovedi za proučevano obdobje'], 0,
    'Napake z nasprotnim predznakom se izničijo; velikost napak meri PANN (povprečna absolutna napaka), ki je vedno ≥ 0.'),
  Q('(Stari izpiti) Kaj velja za povprečno absolutno napako v napovedi (PANN)?', [
    'Seštevamo absolutne vrednosti napak; PANN = 0 pomeni, da se nismo zmotili; ne more biti negativna', 'Negativna vrednost pomeni, da so napovedi praviloma višje od dejanskega povpraševanja',
    'Pove smer odstopanja napovedi', 'Primerna je le za dolgoročno predvidevanje'], 0,
    'PANN = Σ|napaka|/n meri velikost napak (zanesljivost) metod kratkoročnega predvidevanja; smer pove KNN.'),
  Q('(Stari izpiti) Kaj pomeni alternativna korist (trade-off) pri izdelavni strategiji?', [
    'Odločitve o vzvodih izdelavnega procesa hkrati pozitivno in negativno vplivajo na različne KPN', 'Da pri vsakem vzvodu izdelavne poslovne funkcije sprejmemo več različnih odločitev hkrati', 'Da lahko vse konkurenčne prednostne naloge dosežemo hkrati, če so vzvodi pravilno nastavljeni', 'Da dejavnike zmagovanja in kvalificiranja določi trg, podjetje pa jih ne more izbirati'], 0,
    'Zaradi alternativnih koristi moramo izbrati, katere KPN bodo dejavniki zmagovanja in katere le dejavniki kvalificiranja.'),
  Q('(Stari izpiti) Uravnoteženje montažne linije: kaj se zgodi s ciklom, če povečamo planirano zmogljivost linije?', [
    'Cikel se skrajša', 'Cikel se podaljša', 'Cikel ostane enak, poveča se število delovnih mest', 'Cikel ostane enak, zmanjša se učinkovitost'], 0,
    'c = razpoložljivi čas / planirana količina; več enot → krajši cikel. Minimalno število DM = Σt/c, zato podaljšanje cikla ŠTEVILO DM zmanjša.'),
  Q('(Stari izpiti) Kateri stroški naraščajo z naraščanjem obsega zalog?', [
    'Stroški skladiščenja, zastarevanja in vezanega kapitala', 'Stroški naročanja, prevoza in prevzema naročil', 'Stroški izčrpanja zaloge in izgubljene prodaje', 'Stroški nabavne cene enote in količinskih popustov'], 0,
    'Stroški zalog (holding) rastejo z zalogo; stroški naročanja in izčrpanja z njo padajo. EOQ izenači stroške zalog in naročanja.'),
  Q('(Stari izpiti) Kateri sta prednostni načeli (pravili) za razvrščanje nalogov na delovnem mestu?', [
    'Najzgodnejši rok dobave in najkrajši čas izdelave', 'Največja serija in najvišja cena', 'Naključni izbor in najdaljši čas izdelave', 'Najnovejši nalog in najdražji kupec'], 0,
    'EDD (minimalni rok dobave), SPT (najkrajši čas izdelave), FCFS, kritično razmerje … ; indeksna metoda razporeja naloge, kadar se DM razlikujejo po časih.'),
  Q('(Stari izpiti) S katerim ukrepom pri strategiji LOVLJENJA povpraševanja usklajujemo potrebno in razpoložljivo zmogljivost?', [
    'S spreminjanjem števila zaposlenih', 'S proizvodnjo na zalogo v obdobjih nizkega povpraševanja', 'Z diferenciacijo cen', 'S spreminjanjem dolgoročnih fiksnih zmogljivosti'], 0,
    'Lovljenje (chase) sledi povpraševanju z zaposlovanjem/odpuščanjem in nadurami; izravnavanje (level) proizvaja enakomerno na zalogo.'),
  Q('(Stari izpiti) Kdaj je pri dodajanju fiksnih zmogljivosti primerna strategija SLEDENJA povpraševanja (zmogljivost dodamo šele po rasti povpraševanja)?', [
    'Ko je strošek presežne zmogljivosti zelo visok', 'Ko je strošek nepokritega povpraševanja zelo visok', 'Ko podjetje želi povečati tržni delež', 'Ko je povpraševanje zelo negotovo in želimo prehiteti konkurenco'], 0,
    'Sledenje je manj tvegano glede presežnih zmogljivosti; prehitevanje povpraševanja je primerno, ko so stroški nepokritega povpraševanja visoki.'),
  Q('(Stari izpiti) Katera trditev o kakovosti NE drži?', [
    'Za notranji vidik kakovosti je značilna subjektivnost', 'Pri notranji kakovosti želje kupcev prevedemo v tehnični jezik (specifikacije)',
    'Z notranjega vidika smo kakovostni, ko je izdelek narejen skladno s specifikacijami', 'Zunanji vidik kakovosti je povezan s pričakovanji kupcev'], 0,
    'Notranji vidik (skladnost s specifikacijami) je objektiven; zunanji vidik (kupčeva pričakovanja) je subjektiven in je izhodišče kroga kakovosti.'),
  Q('(Stari izpiti) Katere so konkurenčne prednostne naloge (KPN) izdelavne poslovne funkcije?', [
    'Kakovost, stroški, fleksibilnost in dobava (hitrost, zanesljivost)', 'Zmogljivost, informacijski tokovi, kadri in organizacija', 'Lokacija, razmestitev, tehnologija in stopnja avtomatizacije', 'Dobiček, tržni delež, rast prodaje in donosnost kapitala'], 0,
    'Dejavniki zmagovanja so KPN, s katerimi pridobivamo konkurenčno prednost; dejavniki kvalificiranja so pogoj za vstop na trg. Zmogljivost, procesi, kadri … so VZVODI.'),
  Q('(Stari izpiti) Kaj so dejavniki kvalificiranja?', [
    'KPN, ki jih moramo doseči na ravni konkurence, da sploh pridemo v poštev pri kupcu', 'KPN, na podlagi katerih pridobivamo konkurenčno prednost in dobimo naročilo kupca', 'Vzvodi izdelavnega procesa, o katerih odloča poslovna strategija podjetja', 'Finančni viri, ki jih strategija sestavljenega podjetja razporeja po področjih delovanja'], 0,
    'Dejavniki zmagovanja (order winners) prinašajo naročilo; dejavniki kvalificiranja (order qualifiers) so vstopnica.'),
  Q('(Stari izpiti) Kateri so primeri disekonomij obsega?', [
    'Stroški distribucije, birokratizacija in občutljivost na tveganja', 'Degresivno naraščanje stroškov z velikostjo obrata in učinek učenja', 'Nižji fiksni stroški na enoto in boljša izkoriščenost zmogljivosti', 'Specializacija dela, množična proizvodnja in količinski popusti'], 0,
    'Ekonomije obsega = degresivno naraščanje stroškov z velikostjo obrata; nad optimalno velikostjo se pojavijo disekonomije.'),
  Q('(Stari izpiti) Kaj je vzrok za serijsko zalogo in kako jo zmanjšamo?', [
    'Ekonomije obsega pri proizvodnji in nabavi; zmanjšamo jo z znižanjem stroškov naročanja/preureditve', 'Negotovost povpraševanja v dobavnem roku; zmanjšamo jo s skrajšanjem dobavnega roka in boljšimi napovedmi', 'Dolgi in nezanesljivi dobavni roki; zmanjšamo jo z izbiro zanesljivejšega dobavitelja in krajšimi roki', 'Sezonska nihanja prodaje čez leto; zmanjšamo jo z diferenciacijo cen in izravnavanjem povpraševanja'], 0,
    'Skrajšanje dobavnega roka in zanesljivost dobavitelja zmanjšata VARNOSTNO zalogo; serijsko zalogo določa EOQ (stroški naročanja proti stroškom zalog).'),
  Q('(Stari izpiti) Kaj velja za MRP in podrobno planiranje zmogljivosti?', [
    'MRP ne upošteva omejitev zmogljivosti, ker računa s fiksnimi proizvodnimi pretočnimi časi', 'MRP optimizira zasedenost ozkih grl in razporeja naloge glede na razpoložljivo zmogljivost', 'MRP se uporablja za artikle z neodvisnim povpraševanjem, kjer uporabimo točko ponovnega naročila', 'MRP določa operativni plan na ravni končnih proizvodov za približno enoletni planski horizont'], 0,
    'MRP predpostavlja neomejene zmogljivosti; izvedljivost preverimo s podrobnim planiranjem zmogljivosti (CRP). Operativni plan je VLOŽEK, plan lansiranja nalogov IZLOŽEK MRP.'),
  Q('(Stari izpiti) Kaj zagotovimo z odpravo določljivih (posebnih) vzrokov variabilnosti v procesu?', [
    'Statistično obvladovan (stabilen) proces, ne pa nujno doseganja specifikacij', 'Da proces zagotovo dosega specifikacije in je sposoben (Cp > 1)', 'Odpravo vseh slučajnih (naključnih) vplivov na variabilnost procesa', 'Odpravo potrebe po nadaljnji kontroli kakovosti in kontrolnih kartah'], 0,
    'Obvladovanost (kontrolne meje) in sposobnost procesa (specifikacije) sta različna pojma; slučajnih vzrokov ne odpravimo.'),
  Q('(Stari izpiti) Ali skrajšanje kritične aktivnosti vedno skrajša teoretični pretočni čas projekta?', [
    'Ne, ker ima projekt lahko več kritičnih poti', 'Da, vedno za toliko, kolikor skrajšamo aktivnost', 'Ne, ker kritične aktivnosti nimajo vpliva na trajanje', 'Da, če ima aktivnost časovno rezervo'], 0,
    'Trajanje projekta določa najdaljša pot; če je kritičnih poti več, je treba skrajšati aktivnosti na vseh. Kritične aktivnosti imajo rezervo 0.'),
  Q('(Stari izpiti) Katera oblika operativnega planiranja omogoča najkrajše dobavne roke?', [
    'Proizvodnja na zalogo po predvidenem povpraševanju', 'Kombinacija proizvodnje na zalogo in po naročilu', 'Proizvodnja po naročilu', 'Konstruiranje po naročilu'], 0,
    'Pri proizvodnji na zalogo kupec dobi izdelek takoj; z vsakim premikom k naročilu se dobavni rok podaljša.'),
  Q('(Stari izpiti) Pri eksponentnem glajenju želimo hitro sledenje spremembam povpraševanja. Kakšen α izberemo?', [
    'Velik α (blizu 1)', 'Majhen α (blizu 0)', 'α = 0', 'α ni pomemben, pomembno je število obdobij N'], 0,
    'Velik α daje večjo utež zadnjemu dejanskemu povpraševanju (odzivnost), majhen α gladi (stabilnost).'),
  Q('(Stari izpiti) Katera je prednost linijske razmestitve v primerjavi s skupinsko?', [
    'Manjša poraba prostora, večja učinkovitost in manjše zaloge nedokončane proizvodnje', 'Večja fleksibilnost pri spremembah obsega proizvodnje in menjavi proizvodnega programa', 'Manjša občutljivost na okvare strojev, ker lahko proizvodi potujejo po različnih poteh', 'Univerzalna delovna mesta in različne poti proizvodov skozi proces (prekinjen tok)'], 0,
    'Slabosti linije: nefleksibilnost in občutljivost na okvare. Skupinska razmestitev: podobne operacije skupaj, univerzalni stroji, prekinjen tok, širok program v majhnih količinah.'),
  Q('(Stari izpiti) Katere so kvalitativne metode predvidevanja povpraševanja?', [
    'Anketiranje kupcev, ocene prodajnega osebja in metoda Delfi', 'Drseče sredine, eksponentno glajenje in regresija', 'Analiza časovnih vrst in trend', 'KNN in PANN'], 0,
    'Kvalitativne metode temeljijo na mnenjih (Delfi je primerna za dolgoročno predvidevanje); kvantitativne na preteklih podatkih.'),
  Q('(Stari izpiti) Katera trditev o dolgoročnem planiranju fiksnih zmogljivosti NE drži?', [
    'Določamo število zaposlenih v sezoni in izven nje', 'Določamo lokacijo novega proizvodnega obrata',
    'Težava usklajevanja s povpraševanjem nastane zaradi skokovitega povečevanja zmogljivosti', 'Odločamo o stopnji avtomatizacije procesa'], 0,
    'Število zaposlenih po sezonah je srednjeročna (mesečna) odločitev.'),
  Q('(Stari izpiti) Katera trditev o planiranju projektov NE drži?', [
    'Kritične aktivnosti so tiste, katerih časovna rezerva je večja od nič', 'Kritična pot je najdaljša pot v mrežnem diagramu',
    'Časovna rezerva pove, ali smo pri terminu aktivnosti fleksibilni brez podaljšanja projekta', 'Projekt skrajšamo s skrajšanjem aktivnosti brez časovne rezerve'], 0,
    'Kritične aktivnosti imajo rezervo 0; čas projekta je vsota trajanj aktivnosti na kritični poti.'),
  Q('(Stari izpiti) Kaj NE sodi med vzvode povečanja zmogljivosti procesa?', [
    'Povečanje predvidenih prekinitev', 'Povečanje produktivnosti dela', 'Podaljšanje časa delovanja ozkega grla', 'Dodajanje resursov na ozko grlo ali prenos dela z ozkega grla'], 0,
    'Zmogljivost določa ozko grlo; ukrepi pri resursih, ki niso ozko grlo, zmogljivosti ne povečajo.'),
  Q('(Stari izpiti) Katera trditev o pretočnem času drži?', [
    'Dejanski pretočni čas je daljši od teoretičnega, če je v procesu čakanje', 'Izkoriščenost resursa, ki ni ozko grlo, je večja od 1',
    'Če je prisotno čakanje, je učinkovitost pretočnega časa večja od 1', 'Podaljšanje pretočnega časa pri enakem pretoku zmanjša zaloge'], 0,
    'Učinkovitost = TPČ/DPČ ≤ 1; izkoriščenost ozkega grla je 100 %, drugih manj; po Littlu zaloga = pretok · pretočni čas.'),
  Q('(Stari izpiti) O čem se odločamo v IZDELAVNI strategiji?', [
    'O materialnih tokovih v procesih in drugih vzvodih izdelavne funkcije', 'O dejavnikih zmagovanja in kvalificiranja podjetja na trgu', 'O področjih dejavnosti, na katerih bo podjetje delovalo', 'O zbiranju in razporejanju finančnih sredstev po področjih'], 0,
    'Dejavniki zmagovanja → poslovna strategija; področja delovanja in finančni viri → strategija sestavljenega podjetja.'),
  Q('(Stari izpiti) Katera trditev o MRP drži?', [
    'Časovno komponento vključimo, da od terminov dospetja nalogov pridemo do terminov lansiranja', 'Baze stanja zalog potrebujemo za določanje velikosti serije, ne za izračun neto potreb', 'Plan lansiranja nalogov je eden od vložkov v MRP, operativni plan pa njegov rezultat', 'Operativni plan je rezultat MRP, kosovnica pa rezultat podrobnega planiranja zmogljivosti'], 0,
    'Stanje zalog rabimo za NETO potrebe; vložki so operativni plan, kosovnica in stanje zalog; izložek je plan lansiranja nalogov.'),
  Q('(Stari izpiti) Kaj pomeni bruto in kaj neto potreba po komponenti v MRP?', [
    'Neto potreba = bruto potreba, ki je ne pokrijemo iz zaloge in pričakovanih dospetij; šele ta zahteva nov nalog', 'Bruto potreba vedno pomeni, da je treba lansirati nov nalog, ne glede na zalogo in pričakovana dospetja', 'Neto potreba je potreba po dokončanih proizvodih iz operativnega plana pred eksplozijo po kosovnici', 'Bruto potreba je seštevek pričakovanih dospetij in trenutne zaloge komponente v planskem obdobju'], 0,
    'Eksplozija po kosovnici da bruto potrebe; serija v velikosti neto potrebe (lot-for-lot) minimizira zalogo.'),
  Q('(Stari izpiti) Česa z uvedbo kroga kakovosti NE zagotovimo?', [
    'Zmanjšanja stroškov preprečevanja neustrezne kakovosti', 'Vzpostavitve sistema kontrole kakovosti', 'Odkrivanja in odpravljanja vzrokov slabe kakovosti', 'Določitve dimenzij kakovosti na podlagi potreb uporabnikov'], 0,
    'Stroški preprečevanja se povečajo, zmanjšajo pa se stroški notranjih in zunanjih napak (izmet, popravila, reklamacije).'),
  Q('(Stari izpiti) V čem se razlikujeta metodi CPM in PERT?', [
    'CPM predpostavlja deterministične čase aktivnosti, PERT jih obravnava kot slučajne (tri ocene)', 'PERT predpostavlja deterministične čase aktivnosti, CPM pa jih obravnava kot slučajne s tremi ocenami', 'CPM se uporablja za storitvene projekte, PERT pa za proizvodne projekte z znanimi časi aktivnosti', 'Razlike ni, gre za isto metodo mrežnega planiranja pod dvema različnima imenoma'], 0,
    'PERT: optimistična, najverjetnejša in pesimistična ocena → pričakovani čas (a + 4m + b)/6.'),
  Q('(Stari izpiti) Kaj sodi med delovno dokumentacijo pri izvedbi proizvodnje?', [
    'Proizvodni nalog, predajnica in spremnica', 'Kosovnica, operativni plan in MRP', 'Bilanca, izkaz uspeha in plan prodaje', 'Pogodba s kupcem in ponudba'], 0,
    'Delovna dokumentacija spremlja nalog skozi izvedbo (dispečing); kosovnica in operativni plan sta vložka planiranja.'),
  Q('(Stari izpiti) Katera trditev o stroških procesov drži?', [
    'Mehanizirani procesi imajo višje fiksne stroške kot ročni in višje povprečne variabilne kot avtomatizirani', 'Avtomatizirani procesi imajo najnižje fiksne stroške in najvišje povprečne variabilne stroške na enoto', 'Ročni procesi imajo najvišje fiksne stroške in najnižje povprečne variabilne stroške na enoto proizvoda', 'Ekonomije obsega pomenijo progresivno naraščanje stroškov proizvodnje s povečanjem velikosti obrata'], 0,
    'Z avtomatizacijo rastejo fiksni in padajo variabilni stroški; ekonomije obsega = degresivno naraščanje stroškov z velikostjo obrata.'),
  Q('(Stari izpiti) Kako skrajšamo čakanje strank v storitvenem procesu v razmerah stohastičnosti?', [
    'Z večjo produktivnostjo strežnikov (usposabljanje) in manjšo variabilnostjo prihodov strank', 'Z večjo variabilnostjo strežnih časov in prihodov strank, ki izravnava obremenitev strežnikov', 'S povečanjem izkoriščenosti strežnikov na 100 %, da nobeden od njih nikoli ne čaka na stranko', 'Z daljšimi strežnimi časi in manjšim številom strežnikov, da se stroški strežbe znižajo'], 0,
    'Čakanje raste z izkoriščenostjo in z variabilnostjo prihodov in strežbe; blizu 100 % izkoriščenosti čakalne vrste eksplodirajo.'),
  Q('(Stari izpiti) Katera trditev o optimalni količini naročila (EOQ) NE drži?', [
    'Če želimo zmanjšati serijsko zalogo, moramo predhodno zmanjšati stroške zalog', 'Pri povečanju povpraševanja se pogostost naročanja poveča',
    'Majhno odstopanje od optimalne količine stroške le malo poveča', 'Z EOQ minimiziramo skupne stroške naročanja in zalog'], 0,
    'Serijsko zalogo zmanjšamo z znižanjem stroškov NAROČANJA/preureditve (manjše serije); nižji stroški zalog Q celo povečajo.'),
  Q('(Stari izpiti) Kaj je vzrok za večjo varnostno zalogo?', [
    'Nezanesljiv dobavitelj in dolgi dobavni roki', 'Ekonomije obsega pri nabavi in količinski popusti', 'Visoki stroški naročanja in preureditve strojev', 'Sezonska nihanja prodaje in diferenciacija cen'], 0,
    'Varnostna zaloga pokriva negotovost povpraševanja in dobavnega roka; zmanjšamo jo z zmanjšanjem variabilnosti.'),
];
