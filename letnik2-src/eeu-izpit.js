/* Ekonomika EU in Slovenija - vprašanja s starih kolokvijev/izpitov (EF Zapiski/2. letnik/Ekonomika EU in Slovenija/Kolokvij/
   ekonomika-Slovenija-v-EU-1.-kolokvij-vprašanja-in-odgovori.pdf). Tu so teme, ki presegajo snov kolokvija (24. 11.):
   institucije EU, odločanje, EMU/ERM/OCA, širitve (Turčija, Zahodni Balkan), javne finance. Kombinirana vprašanja
   ("pravilni sta a in d") so preoblikovana v neposredna. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

module.exports = [
  Q('(Stari kolokviji) Katera ugotovitev o pomenu EU v globalni ekonomiji NE drži?', [
    'Razlike v razvitosti med članicami so majhne: BDP na prebivalca se giblje med 90 % in 110 % povprečja EU',
    'EU je po številu prebivalcev za Kitajsko in Indijo',
    'EU je med največjimi svetovnimi izvoznicami in uvoznicami',
    'Po obsegu BDP je trg EU primerljiv z ZDA in Kitajsko'], 0,
    'Razlike so velike: od okoli 50 % (Bolgarija) do več kot 200 % (Luksemburg) povprečja EU.'),
  Q('(Stari kolokviji) Kaj drži za regionalne trgovinske sporazume (RTA)?', [
    'V zadnjih dveh desetletjih so prevladujoča oblika trgovinske liberalizacije; njihovo število je močno naraslo v 90. letih',
    'Prevladujejo poglobljene oblike (carinske unije, notranji trgi), sporazumov o prosti trgovini je malo',
    'Pri WTO je prijavljenih manj kot 10 aktivnih sporazumov',
    'V njih sodelujejo le razvite države'], 0,
    'Večina RTA so FTA; sodobni "poglobljeni in vseobsegajoči" sporazumi urejajo tudi investicije, standarde in verige vrednosti.'),
  Q('(Stari kolokviji) Kakšen je odnos WTO do regionalnih trgovinskih sporazumov (RTA)?', [
    'RTA kršijo načelo nediskriminacije (MFN), a so po členu XXIV GATT izrecno dovoljeni pod določenimi pogoji',
    'RTA so skladni z načelom MFN, zato jih WTO dejavno spodbuja',
    'Država ne more biti hkrati članica WTO in regionalne integracije',
    'Cilj WTO je stabilnost deviznih tečajev, zato RTA ne obravnava'], 0,
    'Pogoji: zajemajo skoraj vso trgovino, carine do tretjih držav se v povprečju ne zvišajo, odprava carin v razumnem roku.'),
  Q('(Stari kolokviji) Čemu služijo pravila o poreklu blaga v sporazumu o prosti trgovini (FTA)?', [
    'Preprečujejo, da bi se uvoz iz tretjih držav preusmerjal prek članice z najnižjo carino (trade deflection)',
    'Zagotavljajo skupno carinsko tarifo do tretjih držav',
    'Omogočajo prost pretok blaga ne glede na poreklo',
    'Nadomeščajo potrebo po carinski uniji po členu XXIV'], 0,
    'V FTA vsaka članica obdrži svojo tarifo, zato prosti pretok velja le za blago s poreklom iz članic; v carinski uniji pravila o poreklu niso potrebna.'),
  Q('(Stari kolokviji) Katera trditev o poglabljanju integracije v EU drži?', [
    'Maastrichtska pogodba je uvedla tristebrno strukturo: skupnosti, skupna zunanja in varnostna politika, pravosodje in notranje zadeve',
    'Ustavna pogodba je vzpostavila politično unijo s skupno obrambno politiko',
    'Z Amsterdamsko pogodbo se je leta 1999 vzpostavil notranji trg',
    'Carinska unija je bila dokončana šele z Enotnim evropskim aktom'], 0,
    'Carinska unija 1968, notranji trg 1993 (EEA 1986), EMU 1999 (Maastricht), Ustavna pogodba ni bila ratificirana (nadomestila jo je Lizbonska).'),
  Q('(Stari kolokviji) Kateri je maastrichtski konvergenčni kriterij za inflacijo?', [
    'Inflacija največ 1,5 odstotne točke nad povprečjem treh članic z najnižjo inflacijo',
    'Inflacija največ 2 odstotni točki nad povprečjem celotne EU',
    'Inflacija pod 2 %, enako cilju ECB',
    'Inflacija nižja od inflacije v evroobmočju'], 0,
    'Ostali kriteriji: dolgoročne obrestne mere največ 2 o. t. nad tremi najboljšimi, primanjkljaj ≤ 3 % BDP, dolg ≤ 60 % BDP, 2 leti v ERM 2 brez devalvacije, neodvisna centralna banka.'),
  Q('(Stari kolokviji) Kaj velja za ERM 2?', [
    'Dvoletno sodelovanje v ERM 2 brez devalvacije (tečaj v dovoljenih mejah okoli centralnega) je pogoj za uvedbo evra',
    'ERM 2 je sistem fiksnih tečajev med članicami evroobmočja',
    'Sodelovanje v ERM 2 je prostovoljno in za evro ni potrebno',
    'ERM 2 določa skupno fiskalno politiko kandidatk za evro'], 0,
    'Standardni razpon nihanja je ± 15 % okoli centralnega tečaja do evra.'),
  Q('(Stari kolokviji) Zakaj je prišlo do krize ERM v letih 1992/93?', [
    'Nemčija je po združitvi vodila restriktivno denarno politiko z visokimi obrestnimi merami, druge članice pa so potrebovale nizke; sledile so devalvacije in izstop Italije in VB',
    'ECB je zvišala obrestne mere in povzročila recesijo',
    'Zaradi uvedbe evra so špekulanti napadli nacionalne valute',
    'Zaradi naftne krize so vse članice hkrati devalvirale'], 0,
    'Asimetrični šok (nemška združitev) in togi tečaji → špekulativni napadi; razpon nihanja so leta 1993 razširili na ± 15 %.'),
  Q('(Stari kolokviji) Kateri kriterij optimalnega valutnega območja (OCA) evroobmočje zadovoljivo izpolnjuje?', [
    'McKinnonov kriterij odprtosti - članice so odprte države, ki intenzivno trgujejo med seboj',
    'Mundellov kriterij visoke mobilnosti dela med članicami',
    'Kriterij velikih fiskalnih transferjev med članicami',
    'Kriterij popolnoma usklajenih poslovnih ciklov'], 0,
    'Mobilnost dela in fiskalni transferji so v evroobmočju šibki (za razliko od ZDA), odprtost in medsebojna trgovina pa visoki.'),
  Q('(Stari kolokviji) Kateri institucionalni pogoj mora izpolniti država za vstop v EMU?', [
    'Neodvisnost centralne banke', 'Skupni finančni minister z evroobmočjem', 'Odprava lastnega proračuna', 'Članstvo v NATO'], 0,
    'Neodvisnost nacionalne centralne banke (in skladnost zakonodaje s statutom ESCB) je pravni konvergenčni kriterij.'),
  Q('(Stari kolokviji) Kako je po Lizbonski pogodbi opredeljena kvalificirana večina v Svetu EU?', [
    'Najmanj 55 % držav članic, ki predstavljajo najmanj 65 % prebivalstva EU (dvojna večina)',
    'Najmanj 74 % ponderiranih glasov, 50 % držav in 62 % prebivalstva',
    'Navadna večina držav članic', 'Soglasje vseh držav članic'], 0,
    'Dvojna večina velja od 2014; pogodba iz Nice je uporabljala ponderirane glasove (74 % glasov, večina držav, 62 % prebivalstva).'),
  Q('(Stari kolokviji) Kaj je značilno za Evropsko komisijo?', [
    'Izvršilni organ: izvaja zakonodajo EU, predlaga akte in zastopa EU v mednarodnih pogajanjih (npr. v WTO); en komisar na članico',
    'Najvišji zakonodajni organ, ki sprejema vse uredbe in direktive',
    'Zbor voditeljev držav, ki določa politične smernice',
    'Sodni organ, ki razveljavlja akte članic'], 0,
    'Komisija ima tudi pravico zakonodajne pobude in nadzoruje izvajanje prava EU (lahko sproži postopek zaradi kršitve).'),
  Q('(Stari kolokviji) Katera je pristojnost Evropskega parlamenta?', [
    'Nadzor nad Komisijo in drugimi institucijami ter soodločanje o zakonodaji in proračunu skupaj s Svetom',
    'Izključna pravica zakonodajne pobude', 'Izvajanje zakonodaje in zastopanje EU v WTO', 'Določanje obrestnih mer evroobmočja'], 0,
    'EP potrjuje Komisijo in ji lahko izglasuje nezaupnico; sedež plenarnih zasedanj je v Strasbourgu.'),
  Q('(Stari kolokviji) Kako poteka redni zakonodajni postopek (prej soodločanje)?', [
    'Komisija pripravi predlog; Evropski parlament in Svet EU ga enakopravno sprejmeta (Svet praviloma s kvalificirano večino)',
    'Evropski svet in Komisija na skupnem zasedanju uskladita končno stališče',
    'Parlament sam sprejme akt z navadno večino, Svet le poda mnenje',
    'Sodišče EU potrdi predlog Komisije'], 0,
    'Po Lizbonski pogodbi je to glavni postopek odločanja za veliko večino zakonodaje.'),
  Q('(Stari kolokviji) Katera trditev o približevanju Turčije EU NE drži?', [
    'Pristopna pogajanja s Turčijo se še niso začela',
    'Turčija je leta 1963 podpisala pridružitveni sporazum (Ankara) z EGS',
    'Turčija je z EU v carinski uniji, z izjemami (npr. kmetijski proizvodi)',
    'Status kandidatke je dobila 1999, pogajanja od 2005 so bila večkrat zamrznjena'], 0,
    'Pogajanja so se začela oktobra 2005; ovire so razvitost, velikost, človekove pravice, Ciper in politični razlogi.'),
  Q('(Stari kolokviji) Katera trditev o širitvi EU na Zahodni Balkan NE drži?', [
    'Bosna in Hercegovina je bila ocenjena kot najbolj napredna država regije z vstopom leta 2019',
    'Na vrhu v Solunu 2003 je bila državam regije obljubljena perspektiva članstva ob izpolnitvi kopenhagenskih kriterijev',
    'Hrvaška je po ratifikaciji pristopne pogodbe vstopila 1. julija 2013',
    'Glavne ovire so nerešeni meddržavni spori, pravna država in počasne gospodarske reforme'], 0,
    'Proces poteka prek stabilizacijsko-pridružitvenih sporazumov; nobena država regije po Hrvaški še ni vstopila.'),
  Q('(Stari kolokviji) Kaj NE velja za federalni pristop k evropskemu integriranju?', [
    'Nacionalne države v celoti zadržijo suverenost', 'Pristojnosti se prenesejo na nadnacionalne institucije',
    'Cilj je politična unija (Združene države Evrope)', 'Nasprotje mu je medvladni (konfederalni) pristop'], 0,
    'Federalisti (Monnet, Spinelli) želijo nadnacionalnost; medvladni pristop (de Gaulle) ohranja suverenost držav.'),
  Q('(Stari kolokviji) Na čem temelji prost pretok dela na notranjem trgu EU?', [
    'Na odpravi vsake diskriminacije delavcev na podlagi državljanstva glede zaposlovanja, plačila in delovnih pogojev',
    'Na skupni minimalni plači v vseh članicah', 'Na obveznem priznavanju vseh poklicnih kvalifikacij brez preverjanja', 'Na kvotah za delavce iz drugih članic'], 0,
    'Načelo nediskriminacije; za regulirane poklice velja sistem priznavanja kvalifikacij (avtomatično ali splošni sistem).'),
  Q('(Stari kolokviji) Kaj velja za trgovanje EU z mediteranskimi državami Severne Afrike?', [
    'Obojestranska preferencialna carinska obravnava na podlagi evro-mediteranskih pridružitvenih sporazumov, ob upoštevanju pravil o poreklu',
    'Popolna carinska unija brez pravil o poreklu', 'Samo enostranski preferenciali EU brez vzajemnosti', 'Trgovina po MFN carinah WTO brez sporazumov'], 0,
    'Evro-mediteransko partnerstvo (Barcelona 1995) → pridružitveni sporazumi s prostotrgovinskimi določili.'),
  Q('(Stari kolokviji) Katere so najpomembnejše skupine davčnih prihodkov v Sloveniji?', [
    'DDV, dohodnina in prispevki za socialno varnost', 'Davek od dohodka pravnih oseb, carine in trošarine',
    'Davek na premoženje, dediščine in darila', 'Carine in dajatve na uvoz'], 0,
    'Prispevki za socialno varnost in DDV sta največji; carine so od vstopa v EU prihodek proračuna EU (tradicionalna lastna sredstva).'),
  Q('(Stari kolokviji) Kaj NE sodi med ukrepe EU za reševanje krize evroobmočja po letu 2008?', [
    'Natančna strategija in pogoji za izstop problematičnih članic iz evroobmočja',
    'Evropski mehanizem za stabilnost (ESM) in reševalni programi',
    'Fiskalni pakt in okrepljen nadzor proračunov (evropski semester)',
    'Bančna unija z enotnim nadzorom ECB'], 0,
    'Pravni okvir izstopa iz evra ne obstaja; člen 50 ureja le izstop iz EU.'),
  Q('(Stari kolokviji) Na čem temelji skupna zunanjetrgovinska politika EU?', [
    'Na enotnih načelih (207. člen PDEU) glede carinskih stopenj, trgovinskih sporazumov, liberalizacije, izvozne politike in zaščitnih ukrepov',
    'Na dvostranskih sporazumih vsake članice s tretjimi državami', 'Na soglasju vseh članic za vsak carinski ukrep', 'Na priporočilih WTO brez lastnih pristojnosti'], 0,
    'Trgovinska politika je izključna pristojnost Unije; pogaja se Komisija po mandatu Sveta.'),
];
