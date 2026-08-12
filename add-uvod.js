/* Enkratna skripta: napolni Uvod v poslovanje -> 1. kolokvij (uvod/k1) z vprašanji + zapiski.
   Vir: prosojnice P1-P5 (School/Uvod v poslovanje 1). Zažene se z: node add-uvod.js  (nato node build.js) */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, 'data.json');
const DATA = JSON.parse(fs.readFileSync(P, 'utf8'));

const decks = [
  {
    id: 'gospodarjenje', name: 'Gospodarjenje in poslovne prvine',
    questions: [
      { q: 'Kaj je gospodarjenje?', options: [
        'Spontano zadovoljevanje potreb brez načrta',
        'Zavestna človekova dejavnost z namenom zmanjšati omejenost dobrin, s katerimi zadovoljujemo potrebe',
        'Izključno proizvodnja dobrin v tovarnah',
        'Trošenje dobrin, ki jih je na razpolago v izobilju'],
        correct: 1, explanation: 'Gospodarjenje je zavestna (ne spontana) dejavnost; trije elementi: zavestna dejavnost, potrebe ljudi, omejenost dobrin.' },
      { q: 'Kaj so proste dobrine?', options: [
        'Dobrine, ki jih je na razpolago manj, kot znašajo potrebe',
        'Dobrine, ki imajo ceno, pri kateri se izenačita ponudba in povpraševanje',
        'Dobrine, ki jih je na razpolago več, kot znašajo potrebe po njih (tudi pri ceni 0 je ponudba večja od povpraševanja)',
        'Vse storitve'],
        correct: 2, explanation: 'Proste dobrine: ponudba > povpraševanje tudi pri ceni 0. Ekonomske (redke) dobrine so tiste, ki jih je manj, kot znašajo potrebe, zato imajo ceno.' },
      { q: 'Kaj je temeljni ekonomski problem in temeljni razlog za gospodarjenje?', options: [
        'Previsoke cene', 'Omejenost (redkost) dobrin, s katerimi zadovoljujemo potrebe', 'Pomanjkanje delovne sile', 'Inflacija'],
        correct: 1, explanation: 'Omejenost dobrin je temeljni ekonomski problem; rešitev je proizvodnja dobrin, kar je temeljni razlog za gospodarjenje.' },
      { q: 'Katere so štiri prvine poslovnega procesa (poslovne prvine)?', options: [
        'Kapital, delo, zemlja, podjetništvo',
        'Delovna sredstva, predmeti dela, delo, storitve',
        'Nabava, proizvodnja, prodaja, financiranje',
        'Prihodki, odhodki, sredstva, obveznosti'],
        correct: 1, explanation: 'Produkcijski faktorji / poslovne prvine: delovna sredstva, predmeti dela, delo, storitve. Tudi te so omejene dobrine.' },
      { q: 'Po čem se delovna sredstva ločijo od predmetov dela?', options: [
        'Delovna sredstva se potrošijo v enem procesu, predmeti dela pa sodelujejo v več procesih',
        'Delovna sredstva se ne spremenijo v poslovni učinek, sodelujejo v več procesih in se postopoma obrabljajo; predmeti dela se spremenijo v učinek in potrošijo v enem procesu',
        'Med njima ni razlike',
        'Predmeti dela ohranijo svojo obliko, delovna sredstva pa ne'],
        correct: 1, explanation: 'Delovna sredstva (stroji, oprema) ohranijo obliko, sodelujejo v več procesih, se postopoma obrabljajo. Predmeti dela (surovine, material) se spremenijo v učinek in potrošijo v enem procesu.' },
      { q: 'Kaj pravi temeljno načelo gospodarjenja (minimaks načelo)?', options: [
        'Vedno proizvajaj čim več, ne glede na stroške',
        'Dani rezultat doseči z minimalno porabo sredstev ALI z danimi sredstvi doseči maksimalni rezultat',
        'Minimiziraj prodajno ceno in maksimiraj količino',
        'Zmanjšaj število zaposlenih na minimum'],
        correct: 1, explanation: 'Minimaks (minimax): (1) dani rezultat z minimalno porabo vložkov ali (2) z danimi vložki maksimalni rezultat. V praksi iščemo optimum pri danih omejitvah.' },
      { q: 'Kaj pomeni, da podjetje ustvarja dodano vrednost?', options: [
        'Da poveča število zaposlenih',
        'Da nastane nekaj novega, bolj uporabnega, kar ima za kupca višjo vrednost kot vsota vrednosti vhodnih prvin',
        'Da dvigne prodajno ceno brez sprememb izdelka',
        'Da zniža stroške materiala'],
        correct: 1, explanation: 'Primer: iz lesa, žebljev in dela nastane miza, vredna več kot vsota delov. To je dodana vrednost.' },
      { q: 'Kaj je angažiranje poslovnih prvin?', options: [
        'Uporaba (trošenje) prvin v procesu ustvarjanja učinkov',
        'Pridobitev (zaposlitev) poslovnih prvin; predpogoj za trošenje – v vrednostnem smislu premoženje podjetja',
        'Prodaja poslovnih učinkov kupcem',
        'Odpis vrednosti delovnih sredstev'],
        correct: 1, explanation: 'Angažiranje = pridobitev prvin (predpogoj trošenja). V naturalnem smislu: sredstva v podjetju; v vrednostnem: premoženje = sredstva v aktivi bilance stanja.' },
      { q: 'Kaj je trošenje in kako je povezano s stroški?', options: [
        'Trošenje je pridobivanje prvin; strošek je njihova nabavna cena',
        'Trošenje je uporaba prvin v procesu; v vrednostnem smislu so to stroški (strošek = potrošek × cena prvine)',
        'Trošenje in stroški nista povezana',
        'Trošenje je izplačilo denarja dobaviteljem'],
        correct: 1, explanation: 'Trošenje je uporaba prvin (nastajajo učinki). Naturalno = potroški (fizične enote), vrednostno = stroški. C = ΣQi·Pi.' },
      { q: 'Kako zapišemo strošek prek potroška in cene?', options: [
        'C = Q / P', 'C = Q + P', 'Strošek (C) = potrošek (Q) × cena prvine (P), skupaj C = Σ Qi·Pi', 'C = P − Q'],
        correct: 2, explanation: 'Strošek je v denarju izražen potrošek: C = Q·P, za več prvin C = Σ Qi·Pi.' },
      { q: 'Kje se pokaže rezultat trošenja v enem letu?', options: [
        'V bilanci stanja', 'V izkazu poslovnega izida', 'V izkazu denarnih tokov', 'Nikjer, ker se ne evidentira'],
        correct: 1, explanation: 'Stroški (rezultat trošenja) se v enem letu pokažejo v izkazu poslovnega izida; premoženje (angažiranje) pa v bilanci stanja.' },
    ],
  },
  {
    id: 'sredstva', name: 'Sredstva podjetja in amortizacija',
    questions: [
      { q: 'Na kaj delimo poslovna sredstva podjetja?', options: [
        'Na kapital in dolg',
        'Na osnovna sredstva, obratna sredstva in finančne naložbe',
        'Na prihodke in odhodke',
        'Na fiksna in variabilna sredstva'],
        correct: 1, explanation: 'Poslovna sredstva = osnovna sredstva (OS) + obratna sredstva (ObS: denar, zaloge, terjatve do kupcev) + finančne naložbe (FN). SRS delijo na dolgoročna in kratkoročna.' },
      { q: 'Kaj so osnovna sredstva (OS)?', options: [
        'Kratkoročno vezana sredstva, ki se obrnejo večkrat na leto',
        'Dolgoročno vezan del premoženja, ki svojo vrednost preko amortizacije postopoma prenaša na poslovne učinke',
        'Denar in terjatve do kupcev',
        'Isto kot delovna sredstva'],
        correct: 1, explanation: 'OS so dolgoročno vezana (zemljišča, zgradbe, oprema, večletni nasadi, osnovna čreda, dolg. neopredmetena sredstva), vrednost prenašajo preko amortizacije. OS ≠ delovna sredstva.' },
      { q: 'Po kateri vrednosti so osnovna sredstva izkazana v bilanci stanja?', options: [
        'Po nabavni vrednosti', 'Po odpisani vrednosti', 'Po neodpisani (sedanji) vrednosti', 'Po reprodukcijski vrednosti'],
        correct: 2, explanation: 'V bilanci stanja so OS izkazana po neodpisani (preostali, sedanji) vrednosti = nabavna − odpisana (kumulativa amortizacije).' },
      { q: 'Kaj vključuje nabavna vrednost osnovnega sredstva?', options: [
        'Samo ceno po fakturi',
        'Nabavno ceno in vse stroške, da je OS sposobno delovati (carina, transport, montaža, izobraževanje delavcev)',
        'Nabavno ceno minus amortizacijo',
        'Le stroške montaže'],
        correct: 1, explanation: 'Nabavna vrednost = nabavna cena + vsi potrebni stroški, da OS lahko deluje (transport, carina, montaža, usposabljanje).' },
      { q: 'Kaj je integralna zmogljivost osnovnega sredstva?', options: [
        'Število proizvodov na časovno enoto (intenzivna)',
        'Število časovnih enot delovanja (ekstenzivna)',
        'Zmnožek intenzivne in ekstenzivne zmogljivosti (proizvodi v nekem obdobju)',
        'Delež izkoriščenosti naprave'],
        correct: 2, explanation: 'Intenzivna = proizvodi/čas. enoto; ekstenzivna = število čas. enot delovanja; integralna = njun zmnožek (proizvodi v obdobju).' },
      { q: 'Kaj so obratna sredstva (ObS)?', options: [
        'Zemljišča, zgradbe in oprema',
        'Denar, vse vrste zalog in terjatve do kupcev; običajno se obrnejo večkrat na leto',
        'Dolgoročne finančne naložbe',
        'Patenti in licence'],
        correct: 1, explanation: 'ObS: denar, zaloge (material, nedokončana proizvodnja, gotovi proizvodi), terjatve do kupcev. So širši pojem od predmetov dela in se v letu večkrat obrnejo.' },
      { q: 'Kako izračunamo koeficient obračanja obratnih sredstev?', options: [
        'Povprečno stanje ObS / stroškovna vrednost proizvodnje',
        'Stroškovna vrednost proizvodnje / povprečno stanje ObS',
        'Število dni v obdobju / dnevi vezave',
        'Prihodki − odhodki'],
        correct: 1, explanation: 'KO = stroškovna vrednost proizvodnje / povprečno stanje ObS. Dnevi vezave = 360 / KO (leto = 360 dni).' },
      { q: 'Kako izračunamo potrebni obseg obratnih sredstev?', options: [
        'Načrtovana stroškovna vrednost proizvodnje × koeficient obračanja',
        'Načrtovana stroškovna vrednost proizvodnje / koeficient obračanja ObS',
        'Koeficient obračanja / dnevi vezave',
        'Prihodki / odhodki'],
        correct: 1, explanation: 'Potrebni obseg ObS = načrtovana stroškovna vrednost proizvodnje / KO. Večji obseg poslovanja ali počasnejše obračanje → večja potreba po virih.' },
      { q: 'Kateri so primeri finančnih naložb?', options: [
        'Zaloge materiala in terjatve do kupcev',
        'Posojila, delnice in deleži drugih podjetij, obveznice, bančni depoziti',
        'Stroji in oprema',
        'Plače zaposlenih'],
        correct: 1, explanation: 'FN: posojila, delnice/deleži drugih podjetij, obveznice, depoziti. Po SRS so kratkoročne FN med kratkoročnimi, dolgoročne med dolgoročnimi sredstvi.' },
      { q: 'Kaj je amortizacija?', options: [
        'Strošek predmetov dela',
        'Strošek delovnega sredstva – postopno razporejanje vrednosti DS na obdobja koristnosti',
        'Odplačilo posojila',
        'Povečanje vrednosti osnovnega sredstva'],
        correct: 1, explanation: 'Amortizacija = strošek delovnega sredstva. Amortiziranje razporeja vrednost DS na dobo koristnosti; osnovni namen je zagotoviti enostavno reprodukcijo (zamenjavo DS v enakem obsegu).' },
      { q: 'Katera sredstva se NE amortizirajo?', options: [
        'Oprema', 'Zgradbe', 'Zemljišča', 'Neopredmetena sredstva s končno dobo koristnosti'],
        correct: 2, explanation: 'Amortiziramo opredmetena OS in neopredmetena sredstva s končno dobo koristnosti. Zemljišča se ne amortizirajo.' },
      { q: 'Glede na katero dobo koristnosti amortiziramo, če se fizična in ekonomska razlikujeta?', options: [
        'Glede na daljšo dobo', 'Glede na krajšo dobo', 'Vedno glede na fizično', 'Povprečje obeh'],
        correct: 1, explanation: 'Amortiziramo glede na krajšo od obeh dob koristnosti (fizična = sposobnost delovati; ekonomska = kdaj DS ekonomsko zastari).' },
      { q: 'Po čem se ločijo časovne in funkcionalne metode amortiziranja?', options: [
        'Časovne temeljijo na uporabi (endogeni dejavniki), funkcionalne na času (eksogeni)',
        'Časovne temeljijo na eksogenih dejavnikih (čas); funkcionalne na endogenih (uporaba/obseg proizvodnje)',
        'Med njima ni razlike',
        'Funkcionalne se uporabljajo samo za zemljišča'],
        correct: 1, explanation: 'Časovne: vrednost pada zaradi eksogenih dejavnikov (čas); letna Am fiksna, Am/izdelek pada. Funkcionalne (npr. proizvodna): endogeni dejavniki (uporaba); Am/izdelek fiksna, letna Am odvisna od obsega.' },
    ],
  },
  {
    id: 'stroski-kalkulacije', name: 'Stroški in kalkulacije',
    questions: [
      { q: 'Katere so štiri naravne vrste stroškov (glede na prvino, ki jih povzroča)?', options: [
        'Fiksni, variabilni, neposredni, posredni',
        'Stroški delovnih sredstev, stroški dela, stroški predmetov dela, stroški storitev',
        'Materialni, nematerialni, denarni, nedenarni',
        'Proizvodni, prodajni, upravni, nabavni'],
        correct: 1, explanation: 'Naravne vrste stroškov (po prvini): stroški delovnih sredstev (amortizacija), stroški dela, stroški predmetov dela (material), stroški storitev.' },
      { q: 'Katere metode vrednotenja porabe materiala SRS NE dovoljuje?', options: [
        'FIFO', 'Metoda povprečnih cen', 'LIFO', 'Vse so dovoljene'],
        correct: 2, explanation: 'FIFO (prve nabavne cene) in povprečne cene so dovoljene; LIFO (zadnje nabavne cene) po SRS ni dovoljena.' },
      { q: 'Kaj upošteva metoda FIFO?', options: [
        'Da gredo iz skladišča najprej predmeti, ki so prišli zadnji',
        'Da gredo iz skladišča najprej predmeti, ki so vanj prišli prvi (prve nabavne cene)',
        'Povprečno ceno vseh zalog',
        'Najvišjo nabavno ceno'],
        correct: 1, explanation: 'FIFO (first in, first out): najprej se porabijo najstarejši predmeti dela – uporabimo prve (najzgodnejše) nabavne cene.' },
      { q: 'Kaj so neposredni (direktni) stroški?', options: [
        'Stroški, ki so skupni več stroškovnim objektom in jih ne moremo natančno pripisati',
        'Stroški, za katere natančno vemo, kateri stroškovni objekt jih je povzročil in koliko',
        'Samo stroški amortizacije',
        'Stroški, ki niso odvisni od obsega poslovanja'],
        correct: 1, explanation: 'Neposredni stroški: točno vemo, kateri stroškovni objekt jih je povzročil in v kakšnem znesku. Posredni (splošni) so skupni za več objektov in jih razporejamo s ključi.' },
      { q: 'Kaj je stroškovni nosilec?', options: [
        'Prostorsko in funkcionalno zaokrožena celota z nosilcem odgovornosti',
        'Poslovni učinek – proizvod ali storitev',
        'Oddelek v podjetju',
        'Vodja stroškovnega mesta'],
        correct: 1, explanation: 'Stroškovni nosilec = poslovni učinek (proizvod/storitev). Stroškovno mesto = zaokrožena celota z vodjo. Stroškovni objekt = karkoli, za kar ločeno ugotavljamo stroške.' },
      { q: 'Kako izračunamo ključ za razporejanje splošnih stroškov?', options: [
        'osnova za razporejanje / splošni stroški × 100',
        'splošni stroški / osnova za razporejanje × 100',
        'splošni stroški − osnova',
        'neposredni stroški / splošni stroški'],
        correct: 1, explanation: 'Ključ = splošni stroški / osnova za razporejanje × 100. Bistvena je izbira pravilne osnove (čim bolj povezane z vrsto splošnih stroškov).' },
      { q: 'Kaj nam pove lastna cena (LC)?', options: [
        'Prodajno ceno izdelka',
        'Koliko znašajo stroški ene enote poslovnega učinka',
        'Maržo trgovca',
        'Dobiček na enoto'],
        correct: 1, explanation: 'LC pove stroške ene enote poslovnega učinka. Je podlaga za postavljanje prodajnih cen in presojanje donosnosti.' },
      { q: 'Zakaj razporejanje stroškov v sodobnih podjetjih poteka dvostopenjsko?', options: [
        'Ker to zahteva zakon',
        'Da lažje spremljamo stroške (kje so kritične točke) in da pravilneje razporedimo stroške na stroškovne nosilce',
        'Da povečamo splošne stroške',
        'Da se izognemo amortizaciji'],
        correct: 1, explanation: '1. stopnja: s podjetja na stroškovna mesta; 2. stopnja: s stroškovnih mest na nosilce (proizvode). Namen: boljši nadzor in pravilnejše razporejanje.' },
      { q: 'Katera od naštetih NI metoda kalkuliranja?', options: [
        'Kalkulacija z dodatki',
        'Enostavna delitvena kalkulacija',
        'Kalkulacija z ekvivalentnimi števili',
        'Kalkulacija z vsoto letnih števil'],
        correct: 3, explanation: 'Metode kalkulacij: enostavna delitvena, z ekvivalentnimi števili, z dodatki, vezanih proizvodov, po spremenljivih stroških. "Vsota letnih števil" je metoda amortiziranja, ne kalkulacije.' },
      { q: 'Za kakšno proizvodnjo je primerna kalkulacija z dodatki?', options: [
        'Za homogeno proizvodnjo enega samega proizvoda',
        'Za heterogeno proizvodnjo (različne vrste proizvodov), kjer splošne stroške razdelimo s ključi',
        'Samo za storitvene dejavnosti',
        'Samo kadar ni splošnih stroškov'],
        correct: 1, explanation: 'Kalkulacija z dodatki je primerna za heterogeno proizvodnjo: splošne (posredne) stroške obdobja razdelimo na proizvode s pomočjo ključev, prištejemo neposredne, dobimo LC.' },
      { q: 'Kaj sestavlja strukturo lastne cene?', options: [
        'Samo neposredni material in delo',
        'Neposredni material, neposredno delo, (neposredna) amortizacija, proizvodna režija ter upravno-prodajno-nabavna režija',
        'Marža in rabat',
        'Prihodki minus odhodki'],
        correct: 1, explanation: 'LC = nep. stroški materiala + nep. stroški dela + amortizacija (če je neposredna) + splošni stroški proizvajanja (proizvodna režija) + splošni stroški uprave/prodaje/nabave.' },
    ],
  },
  {
    id: 'uspeh-ekon-produkt', name: 'Uspeh, ekonomičnost, produktivnost',
    questions: [
      { q: 'Kaj je uspeh poslovanja (poslovni izid)?', options: [
        'Razlika med prejemki in izdatki',
        'Razlika med prihodki in odhodki (dobiček, če prihodki > odhodki; izguba, če prihodki < odhodki)',
        'Vsota vseh stroškov',
        'Denarno stanje na računu'],
        correct: 1, explanation: 'Poslovni izid = prihodki − odhodki. Prihodki > odhodki → dobiček; prihodki < odhodki → izguba. Prihodki = vrednost prodanih količin, odhodki = stroški prodanih količin.' },
      { q: 'Kakšna je razlika med stroški in odhodki?', options: [
        'Sta sinonima',
        'Stroški se nanašajo na proizvedene učinke, odhodki pa na prodane poslovne učinke',
        'Odhodki se nanašajo na proizvedene, stroški na prodane učinke',
        'Odhodki so odlivi denarja'],
        correct: 1, explanation: 'Stroški = ovrednoteni potroški, nanašajo se na proizvedeno. Odhodki = stroški prodanih učinkov. Izdatki so odlivi denarja (vplivajo le na plačilno sposobnost).' },
      { q: 'Če so proizvedene količine večje od prodanih (zaloge naraščajo), kakšno je razmerje med stroški in odhodki?', options: [
        'Stroški < odhodki', 'Stroški = odhodki', 'Stroški > odhodki', 'Razmerja ni mogoče določiti'],
        correct: 2, explanation: 'Proizvedeno > prodano (zaloge rastejo) → stroški > odhodki. Če proizvedeno < prodano (zaloge padajo) → stroški < odhodki.' },
      { q: 'Kaj je primer stroška, ki ni izdatek?', options: [
        'Nakup zemljišča', 'Izplačilo plač', 'Amortizacija', 'Nabava materiala z gotovino'],
        correct: 2, explanation: 'Amortizacija je strošek, a ni izdatek (ni odliva denarja). Nasprotno: nakup zemljišča je izdatek, ki ni strošek.' },
      { q: 'Kaj pomeni likvidnost podjetja?', options: [
        'Da je podjetje dolgoročno sposobno poravnavati obveznosti',
        'Da lahko podjetje poravna zapadle obveznosti v nekem trenutku (denarna sredstva zadoščajo za obveznosti, ki ta dan zapadejo)',
        'Da ima podjetje dobiček',
        'Da so obveznosti večje od premoženja'],
        correct: 1, explanation: 'Likvidnost = sposobnost poravnati zapadle obveznosti v danem trenutku. Solventnost = likvidnost na dolgi rok. Podjetje ima lahko dobiček in je hkrati nelikvidno.' },
      { q: 'Kako izračunamo ekonomičnost poslovanja?', options: [
        'E = odhodki / prihodki',
        'E = Q / C (količina učinkov na enoto stroškov); v praksi E = prihodki / odhodki',
        'E = dobiček / kapital',
        'E = Q / L'],
        correct: 1, explanation: 'Ekonomičnost E = Q/C (učinki na stroške), v praksi prihodki/odhodki. E > 1 = dobiček, E < 1 = izguba, E = 1 = na pragu.' },
      { q: 'Zakaj je pri izračunu produktivnosti dela nujno upoštevati stalne (ne tekoče) cene?', options: [
        'Ker tekoče cene vključujejo DDV',
        'Ker inflacija (rast prodajnih cen) sicer navidezno poveča produktivnost, čeprav se je dejansko zmanjšala',
        'Ker stalne cene vključujejo dobiček',
        'Ker to zahteva zakon'],
        correct: 1, explanation: 'Ob uporabi tekočih cen inflacija zamegli sliko: prihodki na zaposlenega rastejo tudi ob padcu fizičnega obsega. Zato heterogeno proizvodnjo vrednotimo po stalnih cenah.' },
      { q: 'Kaj meri produktivnost dela?', options: [
        'Razmerje med prihodki in odhodki',
        'Razmerje med proizvedeno količino učinkov (Q) in vloženim delovnim časom (L): PL = Q/L',
        'Razmerje med dobičkom in kapitalom',
        'Razmerje med sredstvi in obveznostmi'],
        correct: 1, explanation: 'Produktivnost dela PL = Q/L. Poveča se, če Q na enoto časa raste ali če se čas za enoto učinka zmanjša.' },
      { q: 'Kaj meri rentabilnost kapitala (ROE)?', options: [
        'Dobiček / povprečna sredstva',
        'Dobiček / povprečni kapital',
        'Prihodki / odhodki',
        'Q / L'],
        correct: 1, explanation: 'ROE (return on equity) = dobiček / povprečni kapital. ROA (return on assets) = dobiček / povprečna sredstva.' },
      { q: 'Če je indeks produktivnosti I(2019/2018) = 84, kaj to pomeni?', options: [
        'Produktivnost je bila v 2019 za 84 % višja kot v 2018',
        'Produktivnost se je v 2019 zmanjšala za 16 % glede na 2018',
        'Produktivnost je ostala enaka',
        'Produktivnost se je povečala za 16 %'],
        correct: 1, explanation: 'Indeks 84 pomeni 84 % vrednosti iz baznega leta → zmanjšanje za 16 %. (100 = enako, 120 = +20 %.)' },
      { q: 'Kakšna je razlika med učinkovitostjo (efficiency) in uspešnostjo (effectiveness)?', options: [
        'Učinkovitost = delati prave stvari; uspešnost = delati stvari pravilno',
        'Učinkovitost = delati stvari pravilno; uspešnost = delati prave stvari',
        'Sta sinonima',
        'Učinkovitost se meri le z dobičkom'],
        correct: 1, explanation: 'Učinkovitost (efficiency) = delati stvari pravilno; uspešnost (effectiveness) = delati prave stvari. (Pilot: odličen pristanek na napačnem letališču = učinkovit, a ne uspešen.)' },
      { q: 'Po kateri metodi Slovenija ugotavlja prihodke?', options: [
        'Po metodi plačane realizacije',
        'Po metodi fakturirane (zaračunane) realizacije – prihodek ob izstavitvi računa, nastane terjatev do kupca',
        'Šele ob prejemu denarja',
        'Po metodi povprečnih cen'],
        correct: 1, explanation: 'V Sloveniji velja metoda fakturirane realizacije: prihodek se evidentira ob izstavitvi računa; razliko med fakturirano in plačano realizacijo predstavljajo terjatve do kupcev.' },
    ],
  },
  {
    id: 'racunske', name: 'Računske naloge', calc: true,
    questions: [
      { q: 'Podjetje ima premoženje 400 mio EUR, stopnja kapitalizacije je 70 %. Koliko znašajo dolgovi?', options: [
        '280 mio EUR', '120 mio EUR', '400 mio EUR', '70 mio EUR'],
        correct: 1, explanation: 'Kapital = 0,7 × 400 = 280 mio. Dolg = 400 − 280 = 120 mio EUR (oz. 0,3 × 400).' },
      { q: 'Prihodki so 540 mio EUR, povprečno stanje obratnih sredstev 90 mio EUR. Koliko znaša koeficient obračanja ObS?', options: [
        '4', '5', '6', '0,17'],
        correct: 2, explanation: 'KO = 540 / 90 = 6. ObS se v letu obrnejo 6-krat; dnevi vezave = 360 / 6 = 60 dni.' },
      { q: 'KO obratnih sredstev je 6, načrtovani prihodki leta 2 so 660 mio EUR, lastni viri za financiranje ObS znašajo 100 mio EUR. Za koliko se mora podjetje zadolžiti?', options: [
        '110 mio EUR', '10 mio EUR', '60 mio EUR', '0 – zadolževanje ni potrebno'],
        correct: 1, explanation: 'Potrebni obseg ObS = 660 / 6 = 110 mio. Dolg = 110 − 100 = 10 mio EUR.' },
      { q: 'Amortizacijska osnova je 50.000 EUR, doba koristnosti 5 let. Koliko znaša letna amortizacija po linearni metodi?', options: [
        '25.000 EUR', '10.000 EUR', '5.000 EUR', '50.000 EUR'],
        correct: 1, explanation: 'Linearna metoda: Am = osnova / n = 50.000 / 5 = 10.000 EUR na leto (vsako leto enako).' },
      { q: 'Računalniška oprema: osnova 9.000 EUR, doba koristnosti 3 leta, metoda z vsoto letnih števil. Koliko znaša amortizacija v 1. letu?', options: [
        '3.000 EUR', '4.500 EUR', '1.500 EUR', '9.000 EUR'],
        correct: 1, explanation: 'Vsota letnih števil = n(n+1)/2 = 3·4/2 = 6. Leto 1: stopnja 3/6 × 9.000 = 4.500 EUR (nato 3.000 in 1.500).' },
      { q: 'Proizvodna oprema: osnova 40.000 EUR, doba 5 let, metoda padajoče osnove. Koliko znaša amortizacija v 1. letu?', options: [
        '8.000 EUR', '16.000 EUR', '40.000 EUR', '9.600 EUR'],
        correct: 1, explanation: 'Stopnja = 100 %/n × 2 = 100/5 × 2 = 40 %. Leto 1: 40 % × 40.000 = 16.000 EUR (osnova je vsakokratna neodpisana vrednost).' },
      { q: 'Oprema (nab. vrednost 90.000 EUR) bo v dobi koristnosti proizvedla 1.200.000 proizvodov; v 1. letu 250.000. Amortizacija 1. leta po proizvodni metodi?', options: [
        '22.500 EUR', '18.750 EUR', '0,075 EUR', '90.000 EUR'],
        correct: 1, explanation: 'Am/enoto = 90.000 / 1.200.000 = 0,075 EUR. Leto 1: 0,075 × 250.000 = 18.750 EUR.' },
      { q: 'Zaloga: 300 kg po 5 €, 500 kg po 7 €, 400 kg po 10 €, 800 kg po 12 €. V proizvodnjo gre 1.100 kg. Kolikšni so stroški po metodi FIFO?', options: [
        '12.600 EUR', '8.000 EUR', '10.230 EUR', '18.600 EUR'],
        correct: 1, explanation: 'FIFO porabi najprej najstarejše: 300×5 + 500×7 + 300×10 = 1.500 + 3.500 + 3.000 = 8.000 EUR. (LIFO bi bil 12.600, povprečna cena 10.230.)' },
      { q: 'Ista zaloga (skupaj 18.600 € za 2.000 kg), poraba 1.100 kg. Kolikšni so stroški po metodi povprečnih cen?', options: [
        '8.000 EUR', '10.230 EUR', '12.600 EUR', '9.300 EUR'],
        correct: 1, explanation: 'Povprečna cena = 18.600 / 2.000 = 9,30 €/kg. Stroški = 1.100 × 9,30 = 10.230 EUR.' },
      { q: 'Trgovec nabavi monitor za 100 EUR (nabavna cena) in doda 20 % maržo. Kolikšna je maloprodajna cena?', options: [
        '80 EUR', '120 EUR', '96 EUR', '125 EUR'],
        correct: 1, explanation: 'Marža je % od nabavne cene: MPC = 100 + 0,2 × 100 = 120 EUR.' },
      { q: 'Maloprodajna cena je 120 EUR, trgovec dobi 20 % rabat. Po kakšni ceni je nabavil izdelek?', options: [
        '144 EUR', '100 EUR', '96 EUR', '24 EUR'],
        correct: 2, explanation: 'Rabat je % od prodajne cene: NC = 120 − 0,2 × 120 = 96 EUR. Za pokrivanje stroškov in dobiček mu ostane 24 EUR.' },
      { q: 'Podjetje je proizvedlo 1.000 proizvodov po lastni ceni 5 EUR, prodalo pa 800 po ceni 6 EUR. Kolikšen je poslovni izid?', options: [
        'Dobiček 1.000 EUR', 'Dobiček 800 EUR', 'Izguba 200 EUR', 'Dobiček 4.800 EUR'],
        correct: 1, explanation: 'Prihodki = 800 × 6 = 4.800; odhodki (stroški prodanih) = 800 × 5 = 4.000. Izid = 4.800 − 4.000 = 800 EUR dobička.' },
    ],
  },
];

const notes = `
<h2>1 · Gospodarjenje in poslovne prvine</h2>
<div class="note-card">
<h3>Temeljni pojmi</h3>
<ul>
<li><b>Gospodarjenje</b> = zavestna dejavnost za zmanjševanje omejenosti dobrin. Trije elementi: zavestna dejavnost, potrebe, omejenost dobrin.</li>
<li><b>Proste dobrine</b>: ponudba > povpraševanje tudi pri ceni 0. <b>Ekonomske (redke)</b>: manj, kot znašajo potrebe → imajo ceno.</li>
<li><b>Temeljni ekonomski problem</b> = omejenost dobrin → rešitev je proizvodnja → razlog za gospodarjenje.</li>
<li><b>Minimaks načelo</b>: dani rezultat z minimalno porabo ALI z danimi vložki maksimalni rezultat (iščemo optimum).</li>
</ul>
</div>
<div class="note-card">
<h3>Poslovne prvine, angažiranje, trošenje</h3>
<ul>
<li>4 prvine: <b>delovna sredstva</b> (ne spremenijo se v učinek, več procesov, obraba), <b>predmeti dela</b> (spremenijo se v učinek, en proces), <b>delo</b>, <b>storitve</b>.</li>
<li><b>Angažiranje</b> = pridobitev prvin (vrednostno = premoženje = aktiva bilance stanja).</li>
<li><b>Trošenje</b> = uporaba prvin; naturalno = potroški, vrednostno = <b>stroški</b>. Strošek C = Σ Qi·Pi. Pokaže se v izkazu poslovnega izida.</li>
<li>Podjetje ustvarja <b>dodano vrednost</b> (nekaj bolj uporabnega, večje vrednosti kot vsota vhodov).</li>
</ul>
</div>

<h2>2 · Sredstva podjetja in amortizacija</h2>
<div class="note-card">
<h3>Poslovna sredstva</h3>
<ul>
<li>Delitev: <b>osnovna sredstva (OS)</b>, <b>obratna sredstva (ObS)</b>, <b>finančne naložbe (FN)</b>. SRS: dolgoročna / kratkoročna.</li>
<li><b>OS</b>: dolgoročno vezana, vrednost prek amortizacije prenašajo na učinke. V bilanci po <b>neodpisani</b> vrednosti. Nabavna vrednost = cena + vsi stroški do delovanja. OS ≠ delovna sredstva.</li>
<li>Zmogljivost: <b>intenzivna</b> (proizvodi/čas), <b>ekstenzivna</b> (čas delovanja), <b>integralna</b> (zmnožek).</li>
<li><b>ObS</b>: denar, zaloge, terjatve do kupcev; obrnejo se večkrat na leto. <b>KO</b> = strošk. vrednost proizvodnje / povpr. stanje ObS; <b>dnevi vezave</b> = 360/KO; <b>potrebni obseg</b> = načrt. strošk. vrednost / KO.</li>
</ul>
</div>
<div class="note-card">
<h3>Amortizacija</h3>
<ul>
<li>= strošek delovnega sredstva; namen: <b>enostavna reprodukcija</b>. Zemljišča se ne amortizirajo. Amortiziramo po <b>krajši</b> dobi koristnosti.</li>
<li><b>Časovne metode</b> (eksogeni dejavniki, čas): linearna, padajoči zneski (vsota letnih števil, padajoča osnova), linearna s spremenjenimi stopnjami. Letna Am fiksna, Am/izdelek pada.</li>
<li><b>Funkcionalne</b> (endogeni, uporaba): proizvodna. Am/izdelek fiksna, letna Am odvisna od obsega. <b>Kombinirane</b>: npr. linearno-proizvodna.</li>
</ul>
</div>

<h2>3 · Stroški in kalkulacije</h2>
<div class="note-card">
<h3>Vrste stroškov</h3>
<ul>
<li><b>4 naravne vrste</b> (po prvini): stroški delovnih sredstev (amortizacija), dela, predmetov dela (material), storitev.</li>
<li>Vrednotenje materiala: <b>FIFO</b> (prve cene), <b>povprečne cene</b>; <b>LIFO ni dovoljen</b> po SRS.</li>
<li><b>Neposredni</b> (direktni): vemo, kdo jih je povzročil in koliko. <b>Posredni/splošni</b>: skupni, razporejamo s <b>ključi</b>.</li>
<li>Stroškovni <b>nosilec</b> = proizvod/storitev; <b>mesto</b> = zaokrožena celota z vodjo; <b>objekt</b> = karkoli, za kar ločeno merimo stroške.</li>
</ul>
</div>
<div class="note-card">
<h3>Kalkulacije</h3>
<ul>
<li><b>Ključ</b> = splošni stroški / osnova × 100. Razporejanje dvostopenjsko (podjetje → mesta → nosilci).</li>
<li><b>LC</b> = stroški ene enote učinka. Struktura: nep. material + nep. delo + amortizacija + proizvodna režija + upravno-prodajno-nabavna režija.</li>
<li>Metode: enostavna delitvena, z ekvivalentnimi števili, <b>z dodatki</b> (heterogena proizvodnja), vezanih proizvodov, po spremenljivih stroških.</li>
</ul>
</div>

<h2>4 · Uspeh, ekonomičnost, produktivnost</h2>
<div class="note-card">
<h3>Uspeh in tokovi</h3>
<ul>
<li><b>Poslovni izid</b> = prihodki − odhodki (dobiček / izguba). Prihodki = vrednost prodanih količin, odhodki = stroški prodanih količin.</li>
<li><b>Stroški</b> (proizvedeno) vs <b>odhodki</b> (prodano) vs <b>izdatki</b> (odliv denarja). Amortizacija = strošek, ki ni izdatek; nakup zemljišča = izdatek, ki ni strošek.</li>
<li>Proizvedeno > prodano → stroški > odhodki (zaloge rastejo) in obratno.</li>
<li><b>Likvidnost</b> = poravnava zapadlih obveznosti zdaj; <b>solventnost</b> = likvidnost na dolgi rok. SI: metoda <b>fakturirane realizacije</b>.</li>
</ul>
</div>
<div class="note-card">
<h3>Kazalniki uspešnosti</h3>
<ul>
<li><b>Produktivnost dela</b> PL = Q/L. <b>Ekonomičnost</b> E = Q/C (v praksi prihodki/odhodki; E>1 dobiček). <b>Rentabilnost</b>: ROE = dobiček/kapital, ROA = dobiček/sredstva.</li>
<li>Pri heterogeni proizvodnji vrednotimo po <b>stalnih cenah</b> (tekoče cene zaradi inflacije zavajajo). Indeks 84 = −16 %, 120 = +20 %.</li>
<li><b>Učinkovitost</b> = delati stvari pravilno; <b>uspešnost</b> = delati prave stvari.</li>
<li><b>Oblikovanje PC</b>: stroški plus (LC + pribitek), glede na povpraševanje (elastičnost), glede na konkurenco. Trgovina: <b>marža</b> (% od NC), <b>rabat</b> (% od PC, popust proizvajalca).</li>
</ul>
</div>
`;

let placed = false;
for (const sem of DATA) for (const su of sem.subjects) if (su.id === 'uvod') {
  const p = su.parts.find((x) => x.id === 'k1');
  p.decks = decks;
  p.notes = notes;
  placed = true;
}
if (!placed) { console.error('NAPAKA: uvod/k1 ni najden'); process.exit(1); }

fs.copyFileSync(P, P + '.bak-preuvod');
fs.writeFileSync(P, JSON.stringify(DATA));
let q = 0; decks.forEach((d) => q += d.questions.length);
console.log('Uvod v poslovanje / 1. kolokvij napolnjen:', decks.length, 'sklopov,', q, 'vprašanj, zapiski dodani. Backup: data.json.bak-preuvod');
