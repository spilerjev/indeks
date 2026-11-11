/* Ekonomika EU in Slovenija - stari celotni izpiti 17. 2. 2017 in 29. 1. 2020 (EF Zapiski/.../Kolokvij/Kolokviji.pdf, skeni
   z uradnimi listi odgovorov) ter deli izpitov 2018. Računske naloge so preračunane; "obkrožite dve trditvi" so preoblikovane. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

module.exports = [
  Q('(Izpit 2017) Kaj NE velja za procese evropskega integriranja?', [
    'V sedemdesetih letih ne moremo govoriti o dveh koncentričnih krogih, ker EGS in EFTA nista imeli medsebojnih sporazumov',
    'EFTA je bila ustanovljena leta 1960 s Stockholmsko konvencijo in je v šestdesetih letih imela 7 članic',
    'EFTO so ustanovile zahodnoevropske države, ki se niso strinjale s federalnim pristopom k integriranju',
    'Norvežani so dvakrat na referendumu zavrnili članstvo v današnji Evropski uniji'], 0,
    'Članice EFTA so v 70. letih podpisale bilateralne prostotrgovinske sporazume z EGS, zato je prostotrgovinsko območje zajemalo oba kroga (dva koncentrična kroga).'),
  Q('(Izpit 2017) Kaj NE velja za vodenje fiskalne politike?', [
    'Ciklično prilagojen proračunski primanjkljaj je enak dejanskemu v primeru ničelne stopnje rasti gospodarstva',
    'Pomanjkljivost fiskalne politike v primerjavi z monetarno so časovni odlogi in večji vpliv politike',
    'Zaradi avtomatičnih stabilizatorjev fiskalna politika deluje proticiklično v recesiji in ekspanziji',
    'Eksternalije pri zadolževanju: prevelika zadolženost ene članice evroobmočja zniža rast in konkurenčnost celotnega območja'], 0,
    'Ciklično prilagojen (strukturni) primanjkljaj je enak dejanskemu, ko je proizvodnja na ravni POTENCIALNE (proizvodna vrzel = 0), ne pri ničelni rasti.'),
  Q('(Izpit 2017) Estonija: Qd = 360 − 3/2·P, Qs = 80 + ½·P (morske ribe, kg, EUR). Prosta menjava, Pw = 180 EUR/kg. Neto korist od mednarodne menjave?', [
    '1.600 EUR', '3.200 EUR', '4.000 EUR', '7.200 EUR'], 0,
    'Avtarkija: P = 140, Q = 150. Pri 180: Qs = 170, Qd = 90 → izvoz 80. Neto korist = ½ · 80 · (180 − 140) = 1.600 (PS +6.400, CS −4.800).'),
  Q('(Izpit 2017) Kaj NE velja o principih odločanja v EU?', [
    'Po principu subsidiarnosti velja primat prava EU na vseh področjih, ki niso v izključni pristojnosti članic',
    'Argumenta v prid subsidiarnosti sta heterogenost preferenc državljanov in informacijske asimetrije',
    'Ekonomije obsega in eksternalije so pomemben argument za nadnacionalnost odločanja',
    'Na področjih, kjer EU nima izključnih pristojnosti, članice ohranjajo suverenost'], 0,
    'Subsidiarnost pomeni ravno nasprotno: EU ukrepa le, če cilja ni mogoče doseči na nacionalni ravni; primat prava EU je ločeno načelo.'),
  Q('(Izpit 2017) Kaj NE velja za Evropski mehanizem deviznih tečajev (ERM-1, od 1979)?', [
    'Po letu 1993 je vodstvo monetarne politike prevzela Nemčija, zato ni bilo več devalvacij',
    'Vpeljal je paritetno mrežo na podlagi fiksnih tečajev vsake valute do ECU',
    'Kriza 1992/93 je opozorila na nemožnost sočasne proste mobilnosti kapitala, neodvisne monetarne politike in fiksnega tečaja',
    'Države s šibko valuto (visoka inflacija) so težko vzdrževale fiksni tečaj do ECU in so morale pogosto devalvirati'], 0,
    'Leta 1993 so razpon nihanja razširili na ± 15 %; nemško "vodstvo" je značilno za drugo fazo (1987–1992), ne za obdobje po 1993.'),
  Q('(Izpit 2017) Katera trditev o učinkih preferencialne (diskriminacijske) liberalizacije na blaginjo je NAPAČNA?', [
    'Če domača država tvori integracijo s stroškovno manj učinkovito državo, se pojavi samo učinek preusmerjanja, ne pa tudi ustvarjanja trgovine',
    'Če domača država tvori integracijo s stroškovno učinkovitejšo državo, se pojavi samo učinek ustvarjanja trgovine',
    'Na partnersko državo je neto učinek vedno pozitiven, na tretji svet vedno negativen, na domačo državo pa nejasen',
    'Učinek na tretji svet je negativen zaradi nižje cene na meji in manjšega obsega menjave'], 0,
    'Tudi pri manj učinkoviti partnerici cena doma pade (s Pa + T na Pb), zato se uvoz poveča (ustvarjanje) - hkrati pa se preusmeri (Vinerjeva nejasnost).'),
  Q('(Izpit 2017) Kaj NE velja za Pakt o stabilnosti in rasti (SGP)?', [
    'Slovenija je v postopek presežnega primanjkljaja (EDP) stopila leta 2009 in postopek še vedno traja, ker primanjkljaja ni znižala pod 3 %',
    'Sprejetje šestorčka (six-pack) leta 2011 pomeni zaostritev: avtomatičnost EDP, postopek tudi za javni dolg in za čezmerna neravnotežja',
    'SGP je bil leta 2005 spremenjen v smeri večje fleksibilnosti (ohlapnejša definicija presežnega primanjkljaja, upoštevanje javnega dolga)',
    'V EDP ECOFIN izda priporočila; če država ukrepov ne izvede v roku, depozit postane kazen'], 0,
    'Slovenija je EDP zaključila leta 2016, ko je primanjkljaj padel pod 3 % BDP (2015).'),
  Q('(Izpit 2017) Katera trditev o Evropski monetarni uniji (EMU) je pravilna?', [
    'Evrosistem tvorijo ECB in nacionalne centralne banke držav članic evroobmočja',
    'Glavna cilja ECB sta ohranjanje stabilnosti cen in vzdrževanje visoke zaposlenosti ter rasti',
    'EONIA je obrestna mera, ki jo neposredno določa ECB',
    'Monetarno politiko v ECB določa Izvršilni odbor ECB'], 0,
    'Monetarno politiko določa Svet ECB (Izvršilni odbor + guvernerji NCB evroobmočja); EONIA/€STR je tržna medbančna mera; primarni cilj je le stabilnost cen. ECOFIN sestavljajo finančni ministri vseh članic EU.'),
  Q('(Izpit 2017) Katera trditev o proračunu EU je pravilna?', [
    'Tradicionalni lastni viri so pretežno carine po skupni zunanji tarifi in kmetijske dajatve; članica zadrži del za stroške pobiranja', 'Proračun EU je navzgor omejen na največ 1 % bruto nacionalnega dohodka EU, kar izrecno določa Lizbonska pogodba', 'Največ sredstev gre za postavko trajnostna rast: naravni viri, kjer prevladujejo sredstva za razvoj podeželja', 'Primanjkljaj proračuna EU se pokriva s presežki iz preteklih let in z zadolževanjem Komisije na finančnih trgih'], 0,
    'Proračun EU mora biti uravnotežen (brez primanjkljaja); največji postavki sta pametna in vključujoča rast ter trajnostna rast in naravni viri; meja lastnih virov je 1,23 % BND.'),
  Q('(Izpit 2017) Kaj velja za Pakt o stabilnosti in rasti in njegove spremembe?', [
    'Reforma 2011 je zaostrila izvajanje: za nesprejetje predloga Komisije je potrebna kvalificirana večina (obrnjena večina)', 'Reforma iz leta 2005 je uvedla avtomatičnost postopka presežnega primanjkljaja (EDP) za vse članice evroobmočja', 'Prvotna reforma Pakta (2005) je bila odgovor na gospodarsko krizo in rast primanjkljajev držav PIGS po letu 2008', 'Reforma iz leta 2005 je prinesla avtomatično izvzetje iz EDP ob padcu BDP za več kot 2 % v enem letu'], 0,
    'Six-pack (2011): obrnjena kvalificirana večina, EDP tudi za dolg nad 60 % (zmanjšanje za 1/20 presežka letno) in postopek za makroekonomska neravnotežja.'),
  Q('(Izpit 2017) Kateri trditvi o mednarodni menjavi sta NAPAČNI? 1) V avtarkiji je uvoz enak 0; 2) XSF (izvozna ponudba tuje države) = MSH (uvozna ponudba za domačo državo), naraščajoča; 3) MDH (uvozno povpraševanje domače) = XSF; 4) izvozniki so države, kjer je svetovna cena višja od domače; 5) v izvoznicah je izguba potrošnikov večja od dobička proizvajalcev.', [
    '3 in 5', '1 in 3', '2 in 4', '1 in 5'], 0,
    'MDH je zrcalna slika domačega trga (padajoča), XSF tujega (naraščajoča) - nista enaki. V izvoznici proizvajalci pridobijo več, kot potrošniki izgubijo (neto korist).'),
  Q('(Izpit 2017) Avstrija: Qd = 2500 − 3P, Qs = −500 + 2P (LCD televizorji), Pw = 400 EUR, carina 25 %. Koliko znaša uvoz?', [
    '500 televizorjev', '1.000 televizorjev', '1.300 televizorjev', '700 televizorjev'], 0,
    'Cena s carino 500: Qd = 1.000, Qs = 500 → uvoz 500. (Brez carine: Qd = 1.300, Qs = 300, uvoz 1.000.)'),
  Q('(Izpit 2017) Avstrija: Qd = 2500 − 3P, Qs = −500 + 2P, Pw = 400 EUR, carina 25 % (cena 500). Mrtva izguba zaradi carine?', [
    '25.000 EUR', '50.000 EUR', '20.000 EUR', '30.000 EUR'], 0,
    'Proizvodna izguba ½ · 100 · (500 − 300) = 10.000; potrošna izguba ½ · 100 · (1.300 − 1.000) = 15.000 → 25.000 EUR. Carinski prihodek 100 · 500 = 50.000.'),
  Q('(Izpit 2017) Katera trditev o delovanju ECB je NAPAČNA?', [
    'Politika kvantitativnega rahljanja je standardni ukrep ECB za vodenje monetarne politike',
    'Operacije dolgoročnega refinanciranja so imele sprva ročnost do 3 mesecev, v krizi pa je ECB dodelila kredite z daljšo ročnostjo',
    'ECB je stabilnost cen opredelila kot rast HICP za evroobmočje blizu, vendar pod 2 % v srednjeročnem obdobju',
    'ECB je določila negativno obrestno mero mejnega depozita, da bi spodbudila kreditiranje gospodarstva'], 0,
    'Kvantitativno rahljanje (nakupi vrednostnih papirjev) je NESTANDARDNI ukrep, uveden v krizi; standardni so operacije odprtega trga, odprte ponudbe in obvezne rezerve.'),
  Q('(Izpit 2017) Katera trditev o zgodovini nastanka EU je NAPAČNA?', [
    'Kopenhagenski kriteriji zahtevajo, da imajo države kandidatke stabilno makroekonomsko politiko',
    'Za vzpostavitev skupnega trga je bil zaslužen Jacques Delors, predsednik Komisije 1985–1995',
    'Federalni pristop predvideva nadvladne strukture, ki prevzamejo del moči nacionalnih držav',
    'Evropesimizem je bil prisoten v obdobju 1973–1986, ko so članice z necarinskimi ovirami zavirale skupni trg'], 0,
    'Kopenhagenski kriteriji (1993): stabilne demokratične institucije in človekove pravice; delujoče tržno gospodarstvo, sposobno konkurenčnih pritiskov; sposobnost prevzema acquisa. Makroekonomska politika ni kriterij.'),
  Q('(Izpit 2017) Kaj NE velja za pomembna imena in dogodke v zgodovini EU?', [
    'Prvi korak k današnji EU je ustanovitev Sveta Evrope, ki je še danes pomembna institucija EU',
    '9. maja praznujemo dan Evrope, ker je bila takrat predlagana Schumanova deklaracija (1950) o ESPJ',
    'Jacques Delors je dvakrat zaporedoma vodil Komisijo (1985–1995) in uveljavil notranji trg (EEA, Maastricht)',
    'De Gaulle je bil evroskeptik, naklonjen sodelovanju Francije in Nemčije; dvakrat je zavrnil prošnjo VB'], 0,
    'Svet Evrope (1949) NI institucija EU. Medvladni pristop zagovarja ohranitev suverenosti (ukinitev suverenosti zagovarja federalni).'),
  Q('(Izpit 2017) Islandija in Finska: ure na proizvod - volna: Islandija 1/6, Finska 1/5; med: Islandija 1/11, Finska 1/10. Kaj sledi?', [
    'Islandija bo izvažala volno in uvažala med', 'Islandija bo izvažala volno in med', 'Islandija bo uvažala volno in med', 'Med državama menjava ne bo potekala'], 0,
    'Islandija ima absolutno prednost pri obeh (6 V/h in 11 M/h proti 5 in 10). Oportunitetni strošek volne: Islandija 11/6 = 1,83 M, Finska 10/5 = 2 M → Islandija relativno cenejša pri volni.'),
  Q('(Izpit 2017) Islandija (6 V ali 11 M na uro) in Finska (5 V ali 10 M na uro). V katerem intervalu se oblikuje menjalno razmerje (MR), da menjava poteka?', [
    '11/6 M/V < MR < 2 M/V', '1/2 M/V < MR < 6/11 M/V', '5/6 V/M < MR < 10/11 V/M', '6/11 V/M < MR < 5/10 V/M'], 0,
    'Za 1 volno Islandija zahteva vsaj 11/6 meda (domači strošek), Finska plača največ 2 meda.'),
  Q('(Izpit 2017) Katera trditev o vplivu integracije na velikost trga in prihranke obsega NI pravilna?', [
    'Vpliv celotnega procesa na družbeno blaginjo je na sliki domače države ponazorjen s ploščino lika P₀PₐAE₀',
    'Študija za francoska industrijska podjetja (Bellone et al., 2008) kaže, da se je po enotnem trgu in EMU količnik cena/stroški znižal',
    'Če bi se zgodil samo kratkoročni prokonkurenčni učinek, podjetja ne bi dosegala ničelnega dobička (točka A pod krivuljo BE)',
    'Dolgoročno prestrukturiranje (združitve, bankroti) zmanjša število podjetij; preostala povečajo deleže in znižajo AC'], 0,
    'Blaginja se poveča za ploščino med staro in novo ceno pod krivuljo povpraševanja (P₀ P₁ E₁ E₀), ne do avtarkične točke A.'),
  Q('(Izpit 2017) Selitve delavcev iz tuje (F) v domačo državo (H) na sliki plač in mejnih produktov. Katera trditev je pravilna?', [
    'Izseljeni delavci so prej prejemali plače E, v domači državi prejemajo C+D+E; neto pridobijo C+D', 'Lastniki kapitala v tuji državi izgubijo polje F, ker se zaposlenost v tuji državi zmanjša', 'Lastniki kapitala v domači državi izgubijo polje A in pridobijo polje B zaradi nižjih plač', 'Delavci v domači državi zaradi priselitev izgubijo polje A in pridobijo polje B ob višji zaposlenosti'], 0,
    'Domači delavci izgubijo A (padec plače), domači lastniki kapitala pridobijo A + B; tuji lastniki izgubijo D, preostali tuji delavci pridobijo D.'),
  Q('(Izpit 2017) Kaj NE velja za Lizbonsko pogodbo?', [
    'Sprememba kvalificirane večine je zmanjšala učinkovitost odločanja in verjetnost sprejetja odločitev v Svetu EU',
    'Uvedla je funkcijo visokega predstavnika za zunanje zadeve in varnostno politiko (podpredsednika Komisije)',
    'Tristebrno strukturo EU je preoblikovala v enotno pravno osebnost Unije',
    'Uvedla je možen izstop držav članic iz EU (člen 50)'], 0,
    'Dvojna večina (55 % držav, 65 % prebivalstva) je verjetnost sprejetja odločitev POVEČALA (delež zmagujočih koalicij se je povečal).'),
  Q('(Izpit 2020) Katera trditev o proračunu EU je pravilna?', [
    'Vir na podlagi DDV se obračuna po enotni stopnji 0,30 % od harmonizirane in navzgor omejene osnove za DDV v vsaki članici',
    'Britanski rabat je VB vračal okvirno 1/3 njenega neto prispevka',
    'Razvoj strukture odhodkov kaže na zniževanje sredstev za kmetijsko politiko in druge notranje politike',
    'Večletni finančni okvir je uredba Sveta, sprejeta s kvalificirano večino'], 0,
    'Rabat je vračal okoli 2/3 neto prispevka; večletni finančni okvir Svet sprejme SOGLASNO po odobritvi Parlamenta; delež kmetijstva pada, delež notranjih politik raste.'),
  Q('(Izpit 2020) Katera trditev o institucijah in zakonodaji EU je NAPAČNA?', [
    'Z Amsterdamsko pogodbo smo pridobili državljanstvo EU poleg nacionalnega',
    'Svetu EU predseduje ena od članic, ki se menjajo po rotaciji vsakih 6 mesecev; trojka pripravi skupni program',
    'Evropski svet sestavljajo voditelji držav ali vlad; predsednik ima mandat dve leti in pol; nima formalne vloge pri zakonodaji',
    'Svet EU nima stalne sestave; sestavljajo ga ministri članic za posamezno področje (npr. ECOFIN)'], 0,
    'Državljanstvo Unije je uvedla Maastrichtska pogodba (1993), Amsterdamska (1999) ga je le dopolnila.'),
  Q('(Izpit 2020) Katera trditev o evropskem integriranju je pravilna?', [
    'EFTA je nastala leta 1960 kot odgovor na nastanek EGS, ki je bila ustanovljena z Rimsko pogodbo (1957, v veljavi 1958)',
    'Prošnja VB za vstop v EGS je bila zavrnjena 1967 in 1973; vstop je blokiral de Gaulle',
    'Jean Monnet je bil zaslužen za podpis Enotne evropske listine, ki je zaključila obdobje evropesimizma',
    'OEEC (1948) je temeljila na federalnem pristopu in se je leta 1960 preimenovala v EFTA'], 0,
    'VB je bila zavrnjena 1963 in 1967, vstopila je 1973; Enotni evropski akt je zasluga Delorsa; OEEC (medvladna) se je 1961 preoblikovala v OECD.'),
  Q('(Izpit 2020) Kaj NE velja za zakonodajo EU?', [
    'Dvojna kvalificirana večina po Lizbonski pogodbi je 55 % članic, 65 % prebivalstva in vsaj polovica glasov ministrov v Svetu',
    'Okrepljeno sodelovanje pomeni, da se za sprejem določenega akta dogovori le nekaj članic, ki jih akt tudi edine zavezuje',
    'Rumeni karton: če tretjina nacionalnih parlamentov meni, da je kršena subsidiarnost, mora Komisija predlog ponovno proučiti',
    'Lizbonska pogodba je tristebrno strukturo spremenila v dvostebrno (ekonomske zadeve, pravosodje in notranje zadeve; zunanja in varnostna politika)'], 0,
    'Dvojna večina ima le dva pogoja (države in prebivalstvo); "polovica glasov ministrov" ne obstaja.'),
  Q('(Izpit 2020) Carina v majhni državi (slika s ploskvami A, B, C, D): katera trditev je pravilna?', [
    'Zaradi carine se uvoz zmanjša s (q₄ − q₁) na (q₃ − q₂), družbena blaginja pa za B + D',
    'MFN carine so carine, ki jih carinska unija uveljavi do vseh nečlanic',
    'Zaradi carine se domača proizvodnja zmanjša s q₂ na q₁',
    'Trikotnik B predstavlja potrošni strošek zaščite (neoptimalna alokacija v potrošnji)'], 0,
    'B = proizvodna neučinkovitost (domača proizvodnja zraste s q₁ na q₂ po višjih stroških), D = potrošna izguba; A gre proizvajalcem, C je carinski prihodek.'),
  Q('(Izpit 2020) Italija in Francija: ure na proizvod - vino: Italija 6, Francija 5; mleko: Italija 11, Francija 10. Kaj sledi?', [
    'Italija bo izvažala mleko, Francija pa vino', 'Italija bo izvažala vino, Francija pa mleko', 'Francija bo izvažala vino in mleko', 'Menjava ne bo potekala'], 0,
    'Francija ima absolutno prednost pri obeh. Oportunitetni strošek vina (v mleku): Italija 6/11 = 0,55, Francija 5/10 = 0,5 → Francija relativno cenejša pri vinu, Italija pri mleku.'),
  Q('(Izpit 2020) Italija (vino 6 h, mleko 11 h) in Francija (vino 5 h, mleko 10 h). V katerem intervalu se oblikuje menjalno razmerje, da menjava poteka?', [
    '1/2 M/V < MR < 6/11 M/V', '11/6 M/V < MR < 2 M/V', '5/6 V/M < MR < 10/11 V/M', '6/11 M/V < MR < 1 M/V'], 0,
    'Francija (izvoznica vina) zahteva vsaj 1/2 mleka za vino, Italija plača največ 6/11 mleka.'),
  Q('(Izpit 2020) Katera trditev o zakonodaji EU je NAPAČNA?', [
    'Uredbe in smernice (direktive) veljajo neposredno in jih ni treba prenašati v nacionalne pravne rede',
    'Načeli odločanja sta subsidiarnost in nadnacionalnost',
    'Zakonodajo EU sestavljajo primarna (pogodbe), sodbe Sodišča EU in sekundarna zakonodaja (uredbe, direktive, odločbe, priporočila, mnenja)',
    'Primarnost prava EU pomeni, da ob nasprotju z nacionalnim pravom velja pravo EU'], 0,
    'Uredbe veljajo neposredno; direktive (smernice) določajo cilj, članice pa jih morajo prenesti v nacionalno zakonodajo.'),
  Q('(Izpit 2020) Katera trditev o integracijah je NEPRAVILNA?', [
    'Integracije v WTO so dovoljene, če se carine odpravijo v razumnem času dvajsetih let in sporazum zajema celotno trgovino',
    'Doha runda: v Nairobiju (2015) je bil dosežen dogovor o odpravi izvoznih subvencij za kmetijske proizvode',
    'Evropsko gospodarsko področje (EEA) poleg EU vključuje Islandijo, Norveško in Lihtenštajn',
    'Po Kemp-Wanovem teoremu je mogoče s prerazdelitvijo in ustrezno zunanjo tarifo doseči, da tretji svet ni na slabšem'], 0,
    'Člen XXIV GATT: razumni rok je praviloma do 10 let.'),
  Q('(Izpit 2020) Kateri dve trditvi o zgodovini EU sta NAPAČNI? 1) vsaka demokratična država se lahko pridruži brez dodatnih pogojev; 2) Cassis de Dijon je uveljavil vzajemno priznavanje; 3) Rimska pogodba ne vključuje trgovinske, kmetijske in fiskalne politike; 4) Luksemburški kompromis je uvedel soglasje pri pomembnih interesih; 5) domino učinek: nečlanice se počutijo odrinjene in želijo pristopiti.', [
    '1 in 3', '2 in 4', '1 in 5', '3 in 5'], 0,
    'Pristop zahteva kopenhagenske kriterije; Rimska pogodba JE uredila carinsko unijo, skupno trgovinsko in kmetijsko politiko.'),
  Q('(Izpit 2020) Kaj NE velja za vodenje fiskalne politike?', [
    'Države evroobmočja, ki veliko trgujejo med seboj, imajo podobne cikle, zato koordinacija fiskalnih politik ni potrebna',
    'V recesiji bo zaradi avtomatičnih stabilizatorjev dejanski primanjkljaj višji od ciklično prilagojenega',
    'Po pravilu palca nižja rast za 1 % poveča primanjkljaj za okoli 0,5 % zaradi avtomatičnih stabilizatorjev',
    'Argumenta za ohranitev suverenosti sta heterogenost preferenc in informacijska asimetrija'], 0,
    'Prav zaradi trgovinskih eksternalij (ekspanzija ene članice koristi partnericam, zadolženost škodi vsem) je koordinacija v monetarni uniji potrebna.'),
  Q('(Izpit 2020) Domača država (majhna) odpravi MFN carino le za uvoz iz države, katere cena je višja od cene tretjih držav. Kakšne so posledice?', [
    'Ni mogoče enoznačno sklepati: ustvarjanje deluje pozitivno, preusmerjanje negativno (Vinerjeva nejasnost)', 'Proračunski prihodki domače države se zmanjšajo in se v celoti prerazdelijo domačim potrošnikom', 'Cena v domači državi se po integraciji poveča glede na ceno, ki je veljala pred integracijo', 'Družbena blaginja domače države se zagotovo zmanjša, ker prevlada učinek preusmerjanja trgovine'], 0,
    'Cena pade s Pc + T na Pb (ustvarjanje), uvoz pa se preusmeri od cenejšega C k dražjemu B (izguba carin brez nižje cene na meji).'),
  Q('(Izpit 2020) Katera trditev o EMU je pravilna?', [
    'ECB z obrestnima merama mejnega posojila in mejnega depozita določa koridor za medbančno mero (EONIA/€STR)', 'Glavna cilja ECB sta stabilnost cen in visoka zaposlenost ter gospodarska rast, oba enako pomembna', 'Bančni nadzor (EMN) je eden od dveh elementov bančne unije; zanj je zadolžen Svet ECB', 'Monetarno politiko v ECB določa Izvršilni odbor (predsednik, podpredsednik in štirje člani)'], 0,
    'Monetarno politiko določa Svet ECB; bančna unija ima tri stebre (nadzor, reševanje, jamstvo za vloge); EONIA je tržna mera.'),
  Q('(Izpit 2020) Španija: Qd = 525 − 3/2·P, Qs = −75 + 3/2·P (breskve). Prosta menjava, Pw = 180. Neto korist Španije?', [
    '600 EUR', '300 EUR', '1.200 EUR', '60 EUR'], 0,
    'Avtarkija: P = 200, Q = 225. Pri 180: Qd = 255, Qs = 195 → uvoz 60. Neto korist = ½ · 60 · 20 = 600.'),
  Q('(Izpit 2020) Slovenija: Qd = 240 − ½·P, Qs = −80 + 3/2·P (stoli, tisoč kosov). Norveška 100 EUR, Francija 110 EUR, carina 40 %. Slovenija sklene FTA s Francijo. Uvoz po FTA?', [
    '100.000 stolov', '60.000 stolov', '40.000 stolov', '80.000 stolov'], 0,
    'Pred FTA: Norveška s carino 140 < Francija 154 → P = 140, Qd = 170, Qs = 130, uvoz 40. Po FTA: Francija 110 < 140 → P = 110, Qd = 185, Qs = 85 → uvoz 100.'),
  Q('(Izpit 2020) Slovenija - stoli: pred FTA uvoz 40.000 iz Norveške (140 EUR s carino), po FTA s Francijo 100.000 po 110 EUR. Ustvarjanje in preusmerjanje trgovine?', [
    'Preusmerjanje 40.000 stolov in ustvarjanje 60.000 stolov', 'Le ustvarjanje trgovine 60.000 stolov', 'Preusmerjanje 60.000 in ustvarjanje 40.000 stolov', 'Le preusmerjanje 40.000 stolov'], 0,
    'Dotedanji uvoz iz Norveške se preusmeri k dražji Franciji (40.000); zaradi nižje cene se uvoz poveča za 60.000 (ustvarjanje).'),
  Q('(Izpit 2020) Slovenija - stoli: cena pade s 140 na 110, Qd 170 → 185, Qs 130 → 85 (tisoč), izguba carin 40 · 40. Neto učinek FTA na blaginjo?', [
    '+500.000 EUR', '+900.000 EUR', '−700.000 EUR', '−1.100.000 EUR'], 0,
    'CS +(170 + 185)/2 · 30 = 5.325; PS −(130 + 85)/2 · 30 = 3.225; carine −1.600 (tisoč) → +500 tisoč EUR.'),
  Q('(Izpit 2020) Katera trditev o instrumentih reševanja krize evroobmočja je pravilna?', [
    'EFSF je temeljil na jamstvih držav evroobmočja; ob grški krizi EU še ni imela mehanizma za pomoč', 'Pomoč trojke pomeni vključitev Evropske komisije, Evropske centralne banke in sklada ESM', 'Iz začasnega mehanizma ESM so finančno pomoč prejele Španija, Ciper in Grčija', 'Za pomoč iz ESM državi ni treba skleniti memoranduma o soglasju s pogoji in ukrepi'], 0,
    'Trojko sestavljajo Komisija, ECB in IMF; ESM je STALNI mehanizem (2012); pomoč je pogojena z memorandumom o soglasju.'),
  Q('(Izpit 2020) Katera trditev o pravilih fiskalnega pakta in EDP je pravilna?', [
    'Če javni dolg presega 60 % BDP, mora država presežek nad 60 % zmanjševati v povprečju za 1/20 letno',
    'Kohezijski sklad se izvaja na ravni regij; kriterij je 90 % povprečnega BND na prebivalca regije',
    'V postopku makroekonomskih neravnotežij kazni niso predvidene, le preventivni pregled kazalnikov',
    'Slovenija je bila v EDP od 2009 do 2015, ko je ponovno dosegla primanjkljaj nad 3 %'], 0,
    'Kohezijski sklad je za DRŽAVE pod 90 % povprečnega BND; postopek neravnotežij ima tudi korektivni del s kaznimi; Slovenija je EDP zaključila 2016.'),
  Q('(Stari izpiti) Kateri od naštetih kriterijev NI kopenhagenski kriterij za pridružitev EU?', [
    'Članstvo v WTO', 'Delujoče tržno gospodarstvo, sposobno konkurenčnih pritiskov v EU', 'Stabilne demokratične institucije, vladavina prava, varstvo manjšin', 'Prenos zakonodaje EU (acquis communautaire)'], 0,
    'Tudi članstvo v Svetu Evrope ni kriterij; Svet Evrope ni institucija EU.'),
  Q('(Stari izpiti) Kateri sta največji skupini odhodkov proračuna EU v finančni perspektivi 2014–2020?', [
    'Pametna in vključujoča rast ter trajnostna rast in naravni viri', 'Pametna in vključujoča rast ter varnost in državljanstvo', 'Evropa v svetu in administracija', 'Trajnostna rast in nadomestila'], 0,
    'Kohezija (pametna in vključujoča rast) in kmetijstvo (trajnostna rast: naravni viri) skupaj presegata 70 % proračuna.'),
  Q('(Stari izpiti) Kaj NE velja za monetarno politiko ECB?', [
    'ECB je stabilnost cen opredelila kot rast HICP za evroobmočje pod 3 % letno', 'Na trg vpliva prek kratkoročne medbančne obrestne mere (EONIA/€STR)', 'Primarni cilj ECB je cenovna stabilnost', 'ECB je pri vodenju monetarne politike neodvisna'], 0,
    'Cilj je bil "blizu, vendar pod 2 %", od 2021 simetrični cilj 2 % v srednjem roku.'),
  Q('(Stari izpiti) Španija: povpraševanje P = 350 − 2/3·Qd, ponudba P = −50 + 2/3·Qs (vrhunsko vino, litri, EUR). Prosta menjava, Pw = 200. Kaj velja?', [
    'Španija je izvoznica 150 litrov vina', 'Španija je uvoznica 150 litrov vina', 'Španija izvozi 375 litrov vina', 'Menjave ni, ker je 200 avtarkična cena'], 0,
    'Avtarkija: 350 − 2/3Q = −50 + 2/3Q → Q = 300, P = 150. Pri 200: Qd = 225, Qs = 375 → izvoz 150. Potrošnikov presežek pade za (225 + 300)/2 · 50 = 13.125, neto korist je 3.750 EUR.'),
];
