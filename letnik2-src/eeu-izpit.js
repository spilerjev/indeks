/* Ekonomika EU in Slovenija - vaje v slogu izpita na teme, ki presegajo snov kolokvija (24. 11.):
   institucije EU, odločanje, EMU/ERM/OCA, širitve (Turčija, Zahodni Balkan), javne finance. Vprašanja so napisana na novo. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

module.exports = [
  Q('Katera trditev o EU v svetovnem gospodarstvu NE drži?', [
    'Vse članice imajo BDP na prebivalca blizu povprečja EU (odstopanja le nekaj odstotkov)', 'Po številu prebivalcev (okoli 450 milijonov) je EU za Kitajsko in Indijo na tretjem mestu na svetu', 'EU je skupaj s Kitajsko in ZDA med tremi največjimi svetovnimi izvoznicami in uvoznicami blaga', 'Po obsegu BDP je trg EU primerljiv z ZDA in Kitajsko in med največjimi gospodarstvi na svetu'], 0,
    'Razlike so velike: od okoli 50 % (Bolgarija) do več kot 200 % (Luksemburg) povprečja EU.'),
  Q('Kaj velja za regionalne trgovinske sporazume v zadnjih desetletjih?', [
    'Postali so glavna pot liberalizacije trgovine; od 90. let njihovo število hitro raste močno naraslo v 90. letih',
    'Prevladujejo poglobljene oblike (carinske unije, notranji trgi), sporazumov o prosti trgovini je malo',
    'Pri WTO je prijavljenih manj kot 10 aktivnih sporazumov',
    'V njih sodelujejo le razvite države'], 0,
    'Večina RTA so FTA; sodobni "poglobljeni in vseobsegajoči" sporazumi urejajo tudi investicije, standarde in verige vrednosti.'),
  Q('Kako se regionalni trgovinski sporazumi skladajo s pravili WTO?', [
    'So izjema od načela največjih ugodnosti, ki jo člen XXIV GATT dopušča pod določenimi pogoji', 'RTA so povsem skladni z načelom MFN, ker zagotavljajo prosto trgovino med članicami, zato jih WTO spodbuja', 'Država ne more biti hkrati članica WTO in regionalne ekonomske integracije, ker se pravila izključujejo', 'Cilj WTO je zagotavljanje stabilnosti deviznih tečajev, zato regionalnih trgovinskih sporazumov ne obravnava'], 0,
    'Pogoji: zajemajo skoraj vso trgovino, carine do tretjih držav se v povprečju ne zvišajo, odprava carin v razumnem roku.'),
  Q('Zakaj FTA potrebuje pravila o poreklu blaga?', [
    'Ker bi brez njih blago iz tretjih držav vstopalo prek članice z najnižjo zunanjo carino (trade deflection)', 'Zagotavljajo skupno carinsko tarifo do tretjih držav, ker vsaka članica FTA obdrži lastno carinsko politiko', 'Omogočajo prost pretok blaga znotraj integracije ne glede na poreklo blaga, tudi za blago iz tretjih držav', 'Nadomeščajo potrebo po carinski uniji, ki jo WTO po členu XXIV sicer zahteva od vseh regionalnih integracij'], 0,
    'V FTA vsaka članica obdrži svojo tarifo, zato prosti pretok velja le za blago s poreklom iz članic; v carinski uniji pravila o poreklu niso potrebna.'),
  Q('Katera trditev o pogodbah, ki so poglabljale integracijo EU, drži?', [
    'Z Maastrichtsko pogodbo je EU dobila tri stebre - skupnosti, skupna zunanja in varnostna politika, pravosodje in notranje zadeve', 'Ustavna pogodba je začela veljati in z njo politična unija s skupno zunanjo in obrambno politiko držav članic', 'Notranji trg s štirimi svoboščinami je vzpostavila Amsterdamska pogodba leta 1999', 'Carinska unija z odpravo carin med članicami in skupno carinsko tarifo je bila dokončana šele z Enotnim evropskim aktom'], 0,
    'Carinska unija 1968, notranji trg 1993 (EEA 1986), EMU 1999 (Maastricht), Ustavna pogodba ni bila ratificirana (nadomestila jo je Lizbonska).'),
  Q('Kako je opredeljen maastrichtski konvergenčni kriterij za inflacijo?', [
    'Inflacija sme biti največ 1,5 o. t. višja od povprečja treh članic z najnižjo inflacijo', 'Inflacija največ 2 odstotni točki nad povprečjem inflacije vseh držav članic EU', 'Inflacija pod 2 %, enako srednjeročnemu cilju Evropske centralne banke', 'Inflacija nižja od povprečne inflacije v evroobmočju v zadnjih dveh letih'], 0,
    'Ostali kriteriji: dolgoročne obrestne mere največ 2 o. t. nad tremi najboljšimi, primanjkljaj ≤ 3 % BDP, dolg ≤ 60 % BDP, 2 leti v ERM 2 brez devalvacije, neodvisna centralna banka.'),
  Q('Kaj mora kandidatka za evro izpolniti v mehanizmu ERM 2?', [
    'Vsaj dve leti mora sodelovati v ERM 2, ne da bi devalvirala (tečaj ostane v razponu okoli centralnega), kar je pogoj za uvedbo evra', 'ERM 2 je sistem nepreklicno fiksnih deviznih tečajev med državami, ki so že članice evroobmočja', 'Sodelovanje v ERM 2 je za kandidatke prostovoljno in za uvedbo evra ni potrebno, če izpolnjujejo kriterije', 'ERM 2 določa skupno fiskalno politiko in zgornjo mejo proračunskega primanjkljaja za kandidatke za evro'], 0,
    'Standardni razpon nihanja je ± 15 % okoli centralnega tečaja do evra.'),
  Q('Kaj je bil glavni vzrok krize ERM v letih 1992/93?', [
    'Visoke nemške obrestne mere po združitvi Nemčije, ki niso ustrezale gospodarstvom drugih članic po nizkih; sledile so devalvacije in izstop Italije in VB', 'ECB je zvišala obrestne mere in povzročila recesijo v vseh članicah sistema ERM, ki so nato ena za drugo zapustile mehanizem', 'Zaradi napovedane uvedbe evra so špekulanti napadli nacionalne valute, ki so bile v ERM vezane na ECU, in jih prisilili v devalvacijo', 'Zaradi naftne krize in skoka cen energije so vse članice ERM hkrati devalvirale svoje valute in začasno zamrznile mehanizem'], 0,
    'Asimetrični šok (nemška združitev) in togi tečaji → špekulativni napadi; razpon nihanja so leta 1993 razširili na ± 15 %.'),
  Q('Katerega od kriterijev optimalnega valutnega območja evroobmočje izpolnjuje razmeroma dobro?', [
    'Odprtost (McKinnon) - članice so odprta gospodarstva z veliko medsebojne trgovine', 'Mundellov kriterij mobilnosti dela - delavci se med članicami prosto in množično selijo', 'Kriterij fiskalnih transferjev - skupni proračun EU blaži asimetrične šoke v članicah', 'Kriterij usklajenih poslovnih ciklov - gospodarstva članic se gibljejo popolnoma sinhrono'], 0,
    'Mobilnost dela in fiskalni transferji so v evroobmočju šibki (za razliko od ZDA), odprtost in medsebojna trgovina pa visoki.'),
  Q('Kateri institucionalni (ne številčni) pogoj mora država izpolniti za vstop v EMU?', [
    'Neodvisnost centralne banke', 'Skupni finančni minister z evroobmočjem', 'Odprava lastnega proračuna', 'Članstvo v NATO'], 0,
    'Neodvisnost nacionalne centralne banke (in skladnost zakonodaje s statutom ESCB) je pravni konvergenčni kriterij.'),
  Q('Kaj po Lizbonski pogodbi pomeni kvalificirana večina v Svetu EU?', [
    'Dvojna večina: vsaj 55 % članic, ki skupaj zajemajo vsaj 65 % prebivalcev EU', 'Najmanj 74 % ponderiranih glasov, večina držav članic in najmanj 62 % prebivalstva EU', 'Navadna večina držav članic, ki predstavljajo najmanj polovico prebivalstva EU', 'Soglasje vseh držav članic, pri čemer ima vsaka država enako težo glasu'], 0,
    'Dvojna večina velja od 2014; pogodba iz Nice je uporabljala ponderirane glasove (74 % glasov, večina držav, 62 % prebivalstva).'),
  Q('Katera vloga je značilna za Evropsko komisijo?', [
    'Je izvršilna institucija: predlaga akte, skrbi za izvajanje prava EU in v pogajanjih (npr. v WTO) nastopa v imenu Unije; en komisar na članico', 'Najvišji zakonodajni organ EU, ki sam sprejema vse uredbe in direktive brez sodelovanja Sveta in Parlamenta', 'Zbor voditeljev držav in vlad, ki določa splošne politične smernice in prednostne naloge Unije', 'Sodni organ EU, ki razveljavlja pravne akte članic in Unije ter zagotavlja enotno razlago prava EU'], 0,
    'Komisija ima tudi pravico zakonodajne pobude in nadzoruje izvajanje prava EU (lahko sproži postopek zaradi kršitve).'),
  Q('Katero pristojnost ima Evropski parlament?', [
    'Nadzoruje Komisijo in skupaj s Svetom EU odloča o zakonodaji in proračunu - podobno kot s Svetom', 'Izključna pravica zakonodajne pobude, s katero predlaga vse uredbe in direktive Unije', 'Izvajanje zakonodaje EU in zastopanje Unije v mednarodnih pogajanjih, na primer v WTO', 'Določanje obrestnih mer in vodenje denarne politike evroobmočja skupaj z ECB'], 0,
    'EP potrjuje Komisijo in ji lahko izglasuje nezaupnico; sedež plenarnih zasedanj je v Strasbourgu.'),
  Q('Kdo in kako sprejme akt po rednem zakonodajnem postopku EU?', [
    'Predlog pripravi Komisija, sprejmeta pa ga enakovredno Evropski parlament in Svet EU (Svet praviloma s kvalificirano večino)', 'Evropski svet in Komisija na skupnem zasedanju uskladita končno stališče, ki ga Parlament le potrdi z navadno večino', 'Parlament sam sprejme akt z navadno večino, Svet EU pa poda le posvetovalno mnenje, ki ni zavezujoče', 'Sodišče EU potrdi predlog Komisije in ga po presoji skladnosti s pogodbami razglasi za veljavnega'], 0,
    'Po Lizbonski pogodbi je to glavni postopek odločanja za veliko večino zakonodaje.'),
  Q('Katera trditev o odnosih med Turčijo in EU NE drži?', [
    'Turčija s pristopnimi pogajanji še ni niti začela',
    'Turčija je leta 1963 podpisala pridružitveni sporazum (Ankara) z EGS',
    'Turčija je z EU v carinski uniji, z izjemami (npr. kmetijski proizvodi)',
    'Status kandidatke je dobila 1999, pogajanja od 2005 so bila večkrat zamrznjena'], 0,
    'Pogajanja so se začela oktobra 2005; ovire so razvitost, velikost, človekove pravice, Ciper in politični razlogi.'),
  Q('Katera trditev o državah Zahodnega Balkana in EU NE drži?', [
    'Bosna in Hercegovina je kot prva država regije po Hrvaški že postala članica EU',
    'Na vrhu v Solunu 2003 je bila državam regije obljubljena perspektiva članstva ob izpolnitvi kopenhagenskih kriterijev',
    'Hrvaška je po ratifikaciji pristopne pogodbe vstopila 1. julija 2013',
    'Glavne ovire so nerešeni meddržavni spori, pravna država in počasne gospodarske reforme'], 0,
    'Proces poteka prek stabilizacijsko-pridružitvenih sporazumov; nobena država regije po Hrvaški še ni vstopila.'),
  Q('Katera trditev o federalnem pristopu k povezovanju Evrope NE drži?', [
    'Države ohranijo vso suverenost, skupne odločitve so le medvladne', 'Pristojnosti se prenesejo na nadnacionalne institucije',
    'Cilj je politična unija (Združene države Evrope)', 'Nasprotje mu je medvladni (konfederalni) pristop'], 0,
    'Federalisti (Monnet, Spinelli) želijo nadnacionalnost; medvladni pristop (de Gaulle) ohranja suverenost držav.'),
  Q('Kaj je temelj prostega pretoka delavcev na notranjem trgu EU?', [
    'Na prepovedi razlikovanja med delavci glede na državljanstvo glede zaposlovanja, plačila in delovnih pogojev', 'Na skupni minimalni plači in enotnih delovnih pogojih, ki veljajo v vseh državah članicah EU', 'Na obveznem avtomatičnem priznavanju vseh poklicnih kvalifikacij brez preverjanja v državi gostiteljici', 'Na letnih kvotah za delavce iz drugih držav članic, ki jih določi Evropska komisija'], 0,
    'Načelo nediskriminacije; za regulirane poklice velja sistem priznavanja kvalifikacij (avtomatično ali splošni sistem).'),
  Q('Kako EU ureja trgovino z mediteranskimi državami Severne Afrike?', [
    'Z vzajemnimi preferencialnimi carinami na podlagi evro-mediteranskih pridružitvenih sporazumov in pravil o poreklu', 'Popolna carinska unija s skupno zunanjo carinsko tarifo brez pravil o poreklu, kot velja za Turčijo', 'Samo enostranski preferenciali, ki jih EU priznava brez vzajemnosti, kot pri najmanj razvitih državah', 'Trgovina izključno po MFN carinah WTO, ker EU z mediteranskimi državami nima posebnih sporazumov'], 0,
    'Evro-mediteransko partnerstvo (Barcelona 1995) → pridružitveni sporazumi s prostotrgovinskimi določili.'),
  Q('Kateri davčni prihodki so v Sloveniji največji?', [
    'Prispevki za socialno varnost, DDV in dohodnina', 'Davek od dohodka pravnih oseb, carine in trošarine',
    'Davek na premoženje, dediščine in darila', 'Carine in dajatve na uvoz'], 0,
    'Prispevki za socialno varnost in DDV sta največji; carine so od vstopa v EU prihodek proračuna EU (tradicionalna lastna sredstva).'),
  Q('Kaj NI bil eden od ukrepov EU za reševanje krize evroobmočja po letu 2008?', [
    'Pravila in postopek, po katerem bi prezadolžena članica izstopila iz evroobmočja',
    'Evropski mehanizem za stabilnost (ESM) in reševalni programi',
    'Fiskalni pakt in okrepljen nadzor proračunov (evropski semester)',
    'Bančna unija z enotnim nadzorom ECB'], 0,
    'Pravni okvir izstopa iz evra ne obstaja; člen 50 ureja le izstop iz EU.'),
  Q('Na čem temelji skupna trgovinska politika EU?', [
    'Na enotnih načelih iz 207. člena PDEU (carine, trgovinski sporazumi, liberalizacija, izvozna politika in zaščitni ukrepi)', 'Na dvostranskih sporazumih, ki jih vsaka država članica samostojno sklepa s tretjimi državami in WTO', 'Na soglasju vseh držav članic za vsak posamezen carinski ukrep in vsak trgovinski sporazum s tretjo državo', 'Na priporočilih WTO, ker Unija na področju zunanjetrgovinske politike nima lastnih pristojnosti'], 0,
    'Trgovinska politika je izključna pristojnost Unije; pogaja se Komisija po mandatu Sveta.'),
];
