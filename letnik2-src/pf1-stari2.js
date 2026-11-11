/* Poslovne finance 1 - "Izbrani izpiti" (EF Zapiski/2. letnik/Poslovne finance/Izpiti/Izbrani izpiti.docx):
   teoretična in računska vprašanja s starih izpitov Poslovnih financ (tudi iz leta 2012). Vse rešitve so preračunane;
   vprašanja v obliki "pravilni sta trditvi 2. in 4." so preoblikovana v neposredna vprašanja (odgovori se v appu premešajo).
   Izpuščene so naloge, ki jim v viru manjkajo podatki (Jabolko WACC, Tri Jezera, Abhold, Marelica, Dimnik, Dolče, Jagoda). */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

const teorija = [
  Q('(Stari izpiti) Dnevi vezave zalog in dnevi vezave terjatev do kupcev so skupaj KRAJŠI od dobe vezave obveznosti do dobaviteljev. Kaj to pomeni?', [
    'Podjetje za financiranje zalog in terjatev ne potrebuje dodatnih zunanjih virov', 'Podjetje mora za zaloge in terjatve pridobiti dodatne zunanje vire financiranja',
    'Podjetje ima likvidnostne težave, ker dobaviteljem plačuje prepozno', 'Podjetje mora dneve vezave obveznosti skrajšati na raven dni vezave zalog'], 0,
    'Denarni cikel = DVZ + DVT − DVO je negativen: dobavitelji financirajo zaloge in terjatve dlje, kot sta vezani, zato dodatni viri niso potrebni.'),
  Q('(Stari izpiti) Kaj drži za določila bank pri najemanju kratkoročnih posojil?', [
    'Pri anticipativnem obrestovanju ima podjetje na voljo manj denarja, kot je znesek, od katerega se obračunajo obresti',
    'Zahteva po minimalnem stanju na transakcijskem računu zniža strošek posojila za podjetje',
    'Kreditna linija je obveznost podjetja, da posojilo v celoti črpa v roku enega leta',
    'Pri dekurzivnem obrestovanju mora podjetje najeti večje posojilo od zneska, ki ga potrebuje'], 0,
    'Anticipativno = obresti odštete vnaprej → razpoložljivega manj, zato je treba najeti več. Kompenzacijsko stanje strošek poveča; kreditna linija je možnost črpanja, ne obveznost.'),
  Q('(Stari izpiti) Krivulji NSV dveh medsebojno izključujočih projektov, ki se razlikujeta po obsegu, se sekata. Kaj iz tega sledi?', [
    'Po metodi IRR lahko izberemo napačen projekt, odvisno od stroška kapitala glede na stopnjo križanja',
    'Oba projekta imata enako notranjo stopnjo donosa, zato odločitev ni mogoča',
    'Metoda NSV je v tem primeru nezanesljiva, zato uporabimo dobo povračila',
    'Projekt z višjo IRR ima pri vsakem strošku kapitala tudi višjo NSV'], 0,
    'Pod stopnjo križanja ima višjo NSV projekt z NIŽJO IRR. Pri izključujočih projektih odloča NSV pri dejanskem strošku kapitala.'),
  Q('(Stari izpiti) Katera trditev o investicijskih kriterijih drži?', [
    'IRR nas pri dveh izključujočih projektih zavede, kadar se krivulji NSV križata',
    'NSV nas zavede pri primerjavi dveh medsebojno izključujočih projektov',
    'Popravljena IRR (MIRR) ima povsem enake slabosti kot navadna IRR',
    'Doba povračila upošteva vse denarne tokove, le časovne vrednosti ne'], 0,
    'Doba povračila ne upošteva tokov PO trenutku povračila; MIRR odpravi predpostavko reinvestiranja po IRR in problem več rešitev.'),
  Q('(Stari izpiti) Katera trditev o vrednotenju navadnih delnic s sestavljeno (večstopenjsko) enačbo drži?', [
    'Manjša kot je razlika med zahtevano donosnostjo in stopnjo rasti dividend, višja je vrednost delnice',
    'Višje prihodnje dividende pomenijo nižjo sedanjo vrednost teh dividend',
    'Stopnja rasti dividend do neskončnosti ne more biti negativna',
    'Višja zahtevana donosnost pomeni višjo sedanjo vrednost prihodnjih dividend'], 0,
    'P = D₁/(r − g): manjši imenovalec → višja vrednost. g je lahko tudi negativen; višji r vrednost znižuje.'),
  Q('(Stari izpiti) Kateri strošek kapitala uporabimo pri vrednotenju investicije (WACC)?', [
    'Tehtano povprečje stroškov DODATNEGA kapitala ob ciljni (optimalni) strukturi kapitala',
    'Tehtano povprečje stroškov že obstoječega kapitala ob dani strukturi kapitala',
    'Navadno (netehtano) povprečje stroškov vseh vrst kapitala podjetja',
    'Zahtevano donosnost virov brez upoštevanja davčnih učinkov in stroškov izdaje'], 0,
    'Relevantni so mejni stroški novega kapitala, uteži so ciljna struktura, dolg upoštevamo po davku, stroške izdaje pa vključimo.'),
  Q('(Stari izpiti) Podjetje omili kreditno politiko (daljši rok, večji popust, daljše brezplačno financiranje kupcev). Katera posledica NI verjetna?', [
    'Manj slabih terjatev in manj odpisov', 'Daljši dnevi vezave terjatev do kupcev',
    'Višji prihodki, a tudi višji stroški proizvodnje', 'Višje terjatve in stroški njihovega financiranja tudi brez rasti prodaje'], 0,
    'Milejša kreditna politika privabi tudi slabše plačnike, zato slabih terjatev ni manj, ampak več.'),
  Q('(Stari izpiti) Katera trditev o politiki financiranja kratkoročnih naložb NE drži?', [
    'Najbolj tvegana je politika, pri kateri vsa gibljiva sredstva financiramo z lastniškim kapitalom',
    'Financiranje začasnih in dela stalnih gibljivih sredstev s kratkoročnimi viri je tvegano, ker virov morda ni mogoče obnoviti',
    'Konzervativna politika financira stalna in del začasnih gibljivih sredstev z dolgoročnimi viri',
    'Financiranje dolgoročnih naložb s kratkoročnimi viri je izjemno tvegano'], 0,
    'Lastniški kapital nima dospetja, zato je taka politika najmanj tvegana (a najdražja).'),
  Q('(Stari izpiti) Katera trditev o prihodnji vrednosti denarja drži?', [
    'Ob vsem drugem enakem je prihodnja vrednost višja, če se obresti pripisujejo večkrat letno',
    'Prihodnja vrednost je višja pri navadnem kot pri obrestno-obrestnem obrestovanju',
    'Prihodnja vrednost je tem višja, čim manjša je začetna glavnica',
    'Prihodnja vrednost je tem nižja, čim dlje je glavnica naložena'], 0,
    'Pogostejši pripis → obresti na obresti znotraj leta → višja efektivna obrestna mera.'),
  Q('(Stari izpiti) Presihajoči sklad (sinking fund): kdaj podjetje obveznice izžreba in odkupi po NOMINALNI vrednosti?', [
    'Ko je tržna cena obveznic višja od nominalne (zahtevana donosnost je pod kuponsko)',
    'Ko je tržna cena obveznic nižja od nominalne (zahtevana donosnost je nad kuponsko)',
    'Vedno, ker je žrebanje edini dovoljeni način odkupa',
    'Nikoli, obveznice vedno odkupi na sekundarnem trgu'], 0,
    'Podjetje izbere cenejšo pot: cena nad nominalno → žreb in odkup po nominalni; cena pod nominalno → nakup na sekundarnem trgu z diskontom.'),
  Q('(Stari izpiti) Kaj od naštetega NI pomanjkljivost financiranja z navadnimi delnicami?', [
    'Delnice ne dospejo, zato ni pritiska za vračilo glavnice', 'Obstoječi delničarji se morda odrečejo delu nadzora',
    'Novi delničarji so udeleženi v dobičku podjetja', 'Dividende niso davčno priznan odhodek'], 0,
    'Odsotnost dospetja je prednost; stroški izdaje in stroški kapitala delnic so sicer višji kot pri obveznicah.'),
  Q('(Stari izpiti) Katera trditev o dejavnikih optimalne strukture kapitala drži?', [
    'Zrela podjetja z visokimi izplačili dividend se običajno financirajo z višjim deležem dolga',
    'Podjetja z nižjimi donosi iz poslovanja se financirajo z višjim deležem dolga',
    'Visoka stopnja poslovnega vzvoda praviloma pomeni višji delež dolga',
    'Večja variabilnost cen in stroškov pomeni višji delež dolga'], 0,
    'Stabilni denarni tokovi prenesejo več dolga; visok poslovni vzvod in variabilnost zahtevata manj finančnega vzvoda.'),
  Q('(Stari izpiti) Kaj NI predpostavka modela CAPM?', [
    'Transakcijski stroški so proporcionalni in večji od nič', 'Trg kapitala je učinkovit - vse informacije se odražajo v cenah',
    'Investitorji so tveganju nenaklonjeni', 'Vsi investitorji imajo enaka pričakovanja o porazdelitvi donosnosti'], 0,
    'CAPM predpostavlja trg brez trenja: brez transakcijskih stroškov in davkov, neomejeno zadolževanje po netvegani meri.'),
  Q('(Stari izpiti) Kaj drži za tveganje in donosnost naložbe, ki je del dobro razpršenega premoženja (CAPM)?', [
    'Premija za tveganje je višja za naložbe z višjim sistematičnim tveganjem (beto)',
    'Investitor je poplačan za sistematično in nesistematično tveganje',
    'Zahtevana donosnost naložbe je neodvisna od netvegane donosnosti',
    'Tržno premoženje ni optimalno razmerje med tveganjem in donosom'], 0,
    'Nesistematično tveganje se z razpršitvijo odpravi, zato zanj ni premije. r = rf + β(rm − rf).'),
  Q('(Stari izpiti) Katera trditev o nalogah finančnega direktorja NE drži?', [
    'Zbere sredstva po najnižji ceni, nato se v nadaljnje faze investiranja ne vmešava več',
    'Izbira vire sredstev in naložbe, ki najbolje sledijo cilju podjetja',
    'Ugotavlja stroške, povezane z viri sredstev', 'Ocenjuje tveganje in donosnost vsake poslovne aktivnosti'], 0,
    'Finančna funkcija spremlja naložbe ves čas (koristi in stroški uporabe sredstev), ne le ob zbiranju virov.'),
  Q('(Stari izpiti) Zakaj so lastniki bolj naklonjeni tveganju kot upniki?', [
    'Ob uspehu tvegane naložbe večina donosa pripade lastnikom, upniki dobijo le pogodbeni donos',
    'Lastniki zaradi omejene odgovornosti ne nosijo nobenega tveganja',
    'Upniki imajo višje zahtevane donosnosti kot lastniki',
    'Lastniki lahko tvegano naložbo kadarkoli prodajo brez izgube'], 0,
    'Asimetrija izplačil: upnikov donos je omejen, izgubo ob stečaju pa nosi tudi on → v pogodbo vgradi omejitve (covenants).'),
  Q('(Stari izpiti) Strošek kapitala je 10,25 %, projekta A (IRR 14 %) in B (IRR 12,25 %) imata normalne tokove in enako tveganje, stopnja križanja je 8 %. Kaj drži?', [
    'Oba imata pozitivno NSV in A ima pri 10,25 % višjo NSV kot B',
    'Oba imata pozitivno NSV, a višjo ima B, ker je stopnja križanja pod stroškom kapitala',
    'Pozitivno NSV ima samo projekt A',
    'Pri izključujočih projektih bi A izbrali pri vsakem strošku kapitala'], 0,
    'IRR > WACC → NSV > 0 za oba. Nad stopnjo križanja (8 %) ima višjo NSV projekt z višjo IRR (A); pod 8 % bi bil boljši B.'),
  Q('(Stari izpiti) Kako pri oceni projekta upoštevamo zmanjšanje prodaje obstoječih izdelkov zaradi novega izdelka?', [
    'Kot negativno eksternalijo - strošek (denarni odtok) projekta', 'Kot nepovratni strošek - ga ne upoštevamo',
    'Kot oportunitetni priliv projekta', 'Ne upoštevamo ga, ker ni del novega projekta'], 0,
    'Štejejo dodatni (inkrementalni) tokovi podjetja kot celote. Obresti pri tokovih NE upoštevamo (so v diskontni stopnji) - sicer NSV podcenimo.'),
  Q('(Stari izpiti) Kaj je premija za ročnost pri obveznicah brez tveganja izostanka plačil?', [
    'Nadomestilo, ki ga investitorji zahtevajo za naložbo v obveznice z daljšo ročnostjo',
    'Nadomestilo za zavarovanje terjatve s kakovostnim premoženjem izdajatelja',
    'Pribitek, ki ga plačujejo podjetja z najvišjo bonitetno oceno',
    'Razlika med kuponsko obrestno mero in zahtevano donosnostjo'], 0,
    'Daljša ročnost → večje tveganje obrestne mere: ob dvigu obrestnih mer cena dolgoročne obveznice pade bolj.'),
  Q('(Stari izpiti) Gondola Lift: v sezoni gibljiva sredstva 190 in kratkoročne obveznosti 190; stalna sredstva 500 = dolgoročni dolg 190 + lastniški kapital 310. Katero politiko financiranja zasleduje?', [
    'Politiko izenačevanja ročnosti', 'Agresivno politiko - del dolgoročnih naložb s kratkoročnimi viri',
    'Konzervativno politiko - del kratkoročnih potreb z dolgoročnimi viri', 'Brez izkaza uspeha tega ni mogoče ugotoviti'], 0,
    'Dolgoročne naložbe so natančno pokrite z dolgoročnimi viri, gibljiva sredstva pa s kratkoročnimi → ročnosti se ujemajo.'),
  Q('(Stari izpiti) Plačilni pogoji se spremenijo iz 4/10 neto 50 na 5/15 neto 70. Kaj se zagotovo NE bo zgodilo?', [
    'Dnevi vezave terjatev se bodo skrajšali (ob nespremenjeni prodaji na kredit)', 'Prodaja se bo verjetno povečala',
    'Povečali se bodo odpisi slabih terjatev', 'Zvišali se bodo stroški financiranja terjatev'], 0,
    'Daljši rok (70 dni) in daljše obdobje popusta podaljšata dneve vezave terjatev.'),
  Q('(Stari izpiti) Katera trditev o NSV nadomestitvene naložbe je NAPAČNA?', [
    'Izguba ob prodaji stare opreme, pomnožena z davčno stopnjo, je na začetku projekta denarni odliv',
    'Davčni ščit amortizacije (amortizacija × davčna stopnja) je denarni priliv',
    'Znižanje stroškov po davkih zaradi nove naložbe je denarni priliv',
    'Povečanje neto obratnega kapitala je na začetku odliv, na koncu projekta priliv'], 0,
    'Izguba ob prodaji zniža davčno osnovo → davčni prihranek (izguba × t) je PRILIV, ne odliv.'),
  Q('(Stari izpiti) Zahtevana donosnost delnice je 13 %, dividende stalno rastejo po 5 % letno. Kolikšen je dividendni donos?', [
    '8 % - skupni donos minus kapitalski dobiček', '5 % - enak stopnji rasti dividend', '13 % - enak zahtevani donosnosti', '18 % - vsota obeh stopenj'], 0,
    'r = D₁/P₀ + g → D₁/P₀ = 13 % − 5 % = 8 %. Pri stalni rasti je kapitalski dobiček enak g.'),
  Q('(Stari izpiti) Katera trditev o finančnih trgih drži?', [
    'Ekonomska funkcija finančnih trgov je učinkovit prenos prihrankov v najproduktivnejše namene',
    'Na kapitalskih trgih se trguje izključno s prednostnimi in navadnimi delnicami',
    'Izdaja novih delnic podjetja, ki že kotira, je transakcija na sekundarnem trgu',
    'Finančni trgi ne omogočajo prilagajanja premoženja glede tveganja'], 0,
    'Nova izdaja je vedno primarni trg; sekundarni trg je trgovanje z že izdanimi papirji (likvidnost).'),
  Q('(Stari izpiti) Kateri dogodek NE spremeni pospešenega koeficienta (quick ratio)?', [
    'Kupci plačajo vse terjatve', 'Z denarjem plačamo obveznosti do dobaviteljev', 'Stalna sredstva prodamo za denar', 'Z denarjem kupimo zaloge'], 0,
    'Pospešeni koeficient = (gibljiva sredstva − zaloge)/kratkoročne obveznosti. Terjatve → denar pusti števec enak; nakup zalog z denarjem ga zniža.'),
  Q('(Stari izpiti) Zakaj je prednostna pravica obstoječih delničarjev do nakupa novih delnic pomembna?', [
    'Varuje obstoječe lastnike pred razvodenitvijo lastniških deležev', 'Zagotavlja višjo dividendo na delnico',
    'Varuje upnike pred spremembo strukture kapitala', 'Managerjem omogoča prodajo delnic pod tržno ceno'], 0,
    'Obstoječi delničar lahko kupi sorazmeren del nove izdaje in ohrani svoj delež glasov in dobička.'),
  Q('(Stari izpiti) Česa NE štejemo med denarne tokove investicijskega projekta?', [
    'Nepovratnih stroškov (sunk costs)', 'Sprememb neto obratnega kapitala', 'Oportunitetnih stroškov', 'Stroškov prevoza in montaže opreme'], 0,
    'Nepovratni stroški so že nastali ne glede na odločitev; oportunitetni stroški in NOK pa so dodatni tokovi projekta.'),
  Q('(Stari izpiti) Kaj drži za finančni najem (zakup)?', [
    'Traja približno celotno življenjsko dobo predmeta; obroki pokrijejo večino njegove vrednosti',
    'Traja manjši del življenjske dobe predmeta; obroki pokrijejo manjši del vrednosti',
    'Uporablja se predvsem za financiranje poslovnih stavb in nepremičnin',
    'Predmet najema se izkazuje samo v bilanci stanja najemodajalca'], 0,
    'Finančni najem je ekonomsko nakup na kredit (nepreklicen); poslovni (operativni) najem je kratkotrajen in preklicen.'),
  Q('(Stari izpiti) Za koga je pomembno tveganje projekta ZNOTRAJ podjetja, ne le tržno (sistematično) tveganje?', [
    'Za delničarje, managerje in posojilodajalce', 'Samo za managerje, ki jim gre za zaposlitev',
    'Samo za posojilodajalce zaradi bonitete', 'Za nikogar, šteje le sistematično tveganje'], 0,
    'Vpliva na posojilno sposobnost in dobiček (delničarji), stabilnost zaposlitve (managerji) in rating (posojilodajalci).'),
  Q('(Stari izpiti) Kaj bi moral biti glavni cilj poslovanja javne delniške družbe?', [
    'Maksimiranje cene delnice v daljšem obdobju', 'Maksimiranje dobička na delnico v tekočem letu',
    'Maksimiranje prihodkov od prodaje', 'Maksimiranje cene delnice na ciljni datum'], 0,
    'Maksimiranje dolgoročne tržne (notranje) vrednosti delnic = vrednosti za lastnike.'),
  Q('(Stari izpiti) Katera trditev o finančnem sistemu NE drži?', [
    'Najbolj tipične pogodbene finančne institucije so vzajemni skladi',
    'Na denarnem trgu centralne banke vodijo denarno politiko',
    'Finančni trgi posredno zagotavljajo likvidnost in želeno sestavo premoženja',
    'Nadzor v Sloveniji izvajajo Banka Slovenije, AZN in ATVP'], 0,
    'Pogodbene institucije so zavarovalnice in pokojninski skladi (pogodbeni prilivi); vzajemni skladi so investicijske institucije.'),
  Q('(Stari izpiti) Katera trditev o IRR in NSV je NAPAČNA?', [
    'Pri normalnih tokovih je NSV pozitivna, če je IRR nižja od stroška kapitala',
    'Ko je IRR enaka strošku kapitala, je NSV enaka nič',
    'NSV je lahko negativna, tudi če je IRR pozitivna',
    'Neodvisni projekti, sprejemljivi po NSV, so sprejemljivi tudi po IRR'], 0,
    'NSV > 0 natanko tedaj, ko je IRR > strošek kapitala (pri normalnih tokovih).'),
  Q('(Stari izpiti) Kaj drži za strukturo kapitala in WACC?', [
    'Struktura, ki minimizira WACC, hkrati maksimira vrednost delnice',
    'Zadržani dobiček je brezplačen vir, ker ni stroškov izdaje',
    'Če je dolg cenejši od lastniškega kapitala, višja zadolžitev vedno zniža WACC',
    'Strošek zadržanega dobička je nižji od stroška dolga po davkih'], 0,
    'Z zadolževanjem rasteta stroška obeh virov (tveganje), zato WACC ne pada v nedogled; zadržani dobiček stane toliko kot lastniški kapital.'),
];

const racunske = [
  Q('(Stari izpiti) Letalo Bing: 6 let, 132 mio €, 35 mio € letno; letalo Asub: 8 let, 160 mio €, 37 mio € letno; strošek kapitala 12 %. Enakovredna letna anuiteta (EAA) donosnejšega letala?', [
    '4,79 mio €', '2,33 mio €', '10,87 mio €', '11,90 mio €'], 0,
    'NSV Bing = 35 · 4,111 − 132 = 11,90 → EAA = 11,90/4,111 = 2,89; NSV Asub = 37 · 4,968 − 160 = 23,80 → EAA = 23,80/4,968 = 4,79. Različne dobe → primerjamo EAA.'),
  Q('(Stari izpiti) Kumara: strošek kapitala 10,86 %, ± 1 o. t. za tveganje. A (manj tvegan): −334; 191, 169, 104, 150, 118. B (bolj tvegan): −261; 114, 133, 108, 156, 122. NSV projekta, ki ga izberemo?', [
    '235,03 €', '221,91 €', '109,30 €', '322,00 €'], 0,
    'A diskontiramo po 9,86 %: NSV = 235,0; B po 11,86 %: NSV = 193,7. Izberemo A (višja NSV).'),
  Q('(Stari izpiti) Obveznica Neroda: nominalna 1.000 €, 4 % letni kupon; 10 let kuponov ne izplačajo, konec 11. leta plačajo vse zaostale kupone, kupon 11. leta in glavnico. Zahtevana donosnost 11 %. Cena danes?', [
    '456,88 €', '1.000,00 €', '322,32 €', '1.034,50 €'], 0,
    'Enkratni tok konec 11. leta: 11 · 40 + 1.000 = 1.440 €; PV = 1.440/1,11¹¹ = 456,88 €.'),
  Q('(Stari izpiti) Delnica Zelje: 3 leta brez dividend, D₄ = 100 €, D₅ = 112 €, nato rast 4 % letno; zahtevana donosnost 10 %. Vrednost delnice?', [
    '1.343,26 €', '1.980,74 €', '2.814,64 €', '3.080,39 €'], 0,
    'D₆ = 116,48; P₅ = 116,48/(0,10 − 0,04) = 1.941,3; P₀ = 100/1,1⁴ + (112 + 1.941,3)/1,1⁵ = 68,3 + 1.275,0 = 1.343,3 €.'),
  Q('(Stari izpiti) Premoženje 50.000 € je enakomerno naloženo v 4 delnice, β premoženja je 1,48. Delnico A (β 1,87) zamenjamo z delnico X in β premoženja postane 1,60. β delnice X?', [
    '2,35', '2,09', '1,99', '1,60'], 0,
    '1,60 = 1,48 − 0,25 · 1,87 + 0,25 · β_X → 0,25 · β_X = 0,5875 → β_X = 2,35.'),
  Q('(Stari izpiti) Delnica Sonata: D₁ = 26 €, D₂ = 31 €, D₃ = 33 €, nato rast 2 % letno; zahtevana donosnost 14 %. Cena delnice?', [
    '258,26 €', '254,55 €', '349,43 €', '169,97 €'], 0,
    'P₃ = 33 · 1,02/(0,14 − 0,02) = 280,5; P₀ = 26/1,14 + 31/1,14² + (33 + 280,5)/1,14³ = 22,8 + 23,9 + 211,6 = 258,3 €.'),
  Q('(Stari izpiti) Dobavitelj: rok 44,87 dni, popust 1 % za plačilo do 7,58. dne. Banka: 11,4 % navedena obrestna mera, 9 % kompenzacijsko stanje (leto 360 dni). Strošek neizkoriščenega popusta (EAR) in strošek bančnega financiranja?', [
    '10,19 % in 12,53 %', '3,60 % in 41,04 %', '9,75 % in 11,88 %', '1,00 % in 11,40 %'], 0,
    'EAR = (1 + 1/99)^(360/37,29) − 1 = 10,19 %; banka: 11,4 %/(1 − 0,09) = 12,53 %. Cenejši je dobaviteljski kredit.'),
  Q('(Stari izpiti) Banka ponuja depozit po 3,48 % letno, obresti pripisuje 2-krat letno. Dejanska letna obrestna mera?', [
    '3,51 %', '3,48 %', '3,45 %', '1,74 %'], 0,
    'EAR = (1 + 0,0348/2)² − 1 = 3,51 %.'),
  Q('(Stari izpiti) 1.000 € naložimo po 12 % letno z letnim pripisom obresti. Čez koliko let znesek naraste na 17.000 €?', [
    '25 let', '18 let', '20 let', '20 let in 3 mesece'], 0,
    'n = ln(17)/ln(1,12) = 2,833/0,1133 = 25,0 let.'),
  Q('(Stari izpiti) Obveznica ACG: nominalna 10.000 €, 10-letna, izdana pred 7 leti, kuponi 3-krat letno (12 % letno), tržna obrestna mera 8 %, tečaj 112,3. Bi jo prodali?', [
    'Da, obveznica je precenjena za okoli 175 €', 'Ne, obveznica je podcenjena za okoli 175 €',
    'Da, ker kuponi prinašajo več kot tržna obrestna mera', 'Ne, obveznica je podcenjena za 12 €'], 0,
    'Še 9 obdobij po 2,667 %, kupon 400: vrednost = 400 · 7,91 + 10.000/1,2673 = 11.055 €; tečaj 112,3 = 11.230 € → precenjena za ≈ 175 €.'),
  Q('(Stari izpiti) Bing: 3 leta, 14,4 mio €, 7,3 mio € letno; Asub: 6 let, 46,4 mio €, 14,4 mio € letno; strošek kapitala 5,4 %. Katero letalo?', [
    'Asub - višja EAA (5,14 mio €)', 'Bing - višja EAA (5,14 mio €)', 'Bing - višja NSV (5,33 mio €)', 'Asub - višja NSV (5,33 mio €)'], 0,
    'NSV Bing = 7,3 · 2,703 − 14,4 = 5,33 (EAA 1,97); NSV Asub = 14,4 · 5,012 − 46,4 = 25,77 (EAA 5,14). Pri različnih dobah primerjamo EAA.'),
  Q('(Stari izpiti) Projekt Mango: −100, +60, −20, −20, +60 (mio €), WACC 10 %. Popravljena notranja stopnja donosa (MIRR)?', [
    '1,54 %', '12,55 %', '8,25 %', '11,48 %'], 0,
    'PV odlivov = 100 + 20/1,1² + 20/1,1³ = 131,6; FV prilivov ob koncu = 60 · 1,1³ + 60 = 139,9; MIRR = (139,9/131,6)^(1/4) − 1 = 1,54 %.'),
  Q('(Stari izpiti) Delnica Dol: σ = 24,61 %, korelacija s trgom 0,86; delnica Log: σ = 9,69 %, korelacija 0,90; σ trga 12 %. Kaj drži?', [
    'β Dol = 1,76', 'β Log = 0,97', 'β premoženja 70:30 = 1,23', 'Premoženje 70:30 je manj tvegano od trga'], 0,
    'β = ρ · σᵢ/σₘ: Dol 0,86 · 24,61/12 = 1,76; Log 0,90 · 9,69/12 = 0,73; premoženje 0,7 · 1,76 + 0,3 · 0,73 = 1,45 > 1.'),
];

module.exports = { teorija, racunske };
