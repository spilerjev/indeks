/* Poslovne finance 1 - izbrane vaje v slogu izpita (teorija in računske naloge, 2. sklop).
   Vprašanja so napisana na novo (lastni primeri, podjetja in številke); vse rešitve so preračunane. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

const teorija = [
  withId('q4hrsij', Q('Podjetje ima zaloge vezane 15 dni, terjatve do kupcev 20 dni, dobaviteljem pa plačuje v 45 dneh. Kaj to pomeni za financiranje?', [
    'Dobavitelji financirajo zaloge in terjatve, dodatni viri zanje niso potrebni', 'Podjetje potrebuje dodatne zunanje vire za zaloge in terjatve',
    'Podjetje ima likvidnostne težave, ker dobaviteljem plačuje prepozno', 'Podjetje mora plačilni rok dobaviteljem skrajšati na 15 dni'], 0,
    'Denarni cikel = 15 + 20 − 45 = −10 dni: dobavitelji financirajo zaloge in terjatve dlje, kot sta vezani.')),
  withId('qb1jrnm', Q('Banka odobri kratkoročno posojilo z anticipativnim obračunom obresti. Kaj to pomeni za podjetje?', [
    'Prejme manj denarja, kot je znesek, od katerega tečejo obresti, zato je dejanski strošek višji', 'Prejme celoten znesek, obresti plača šele ob vračilu',
    'Dejanski strošek je nižji od navedene obrestne mere', 'Posojilo mora v celoti počrpati v enem letu'], 0,
    'Anticipativno = obresti so odštete vnaprej → razpoložljivega denarja je manj, zato je treba najeti več. Kompenzacijsko stanje strošek prav tako poveča.')),
  withId('q1vn1yge', Q('Projekta A in B se medsebojno izključujeta in se razlikujeta po obsegu; njuni krivulji NSV se sekata pri 7 %. Strošek kapitala je 5 %. Kaj velja?', [
    'Po IRR lahko izberemo napačen projekt; odločimo se po NSV pri 5 %', 'Pri 5 % imata oba projekta enako NSV',
    'Pri različnem obsegu je NSV nezanesljiva, zato odločimo po dobi povračila', 'Projekt z višjo IRR ima pri vsakem strošku kapitala tudi višjo NSV'], 0,
    'Pod stopnjo križanja ima višjo NSV projekt z NIŽJO IRR. Pri izključujočih se projektih odloča NSV pri dejanskem strošku kapitala.')),
  withId('qqknu11', Q('Kateri investicijski kriterij lahko zavede pri izbiri med izključujočima se projektoma, katerih krivulji NSV se križata?', [
    'Notranja stopnja donosa (IRR)', 'Neto sedanja vrednost pri dejanskem strošku kapitala', 'Enakovredna letna anuiteta pri enakih dobah projektov', 'Nobeden, vsi dajo enak vrstni red'], 0,
    'IRR ne upošteva obsega projekta in predpostavlja reinvestiranje po IRR. MIRR odpravi predpostavko reinvestiranja, doba povračila pa ne upošteva tokov po povračilu.')),
  withId('qza9oc8', Q('Pri vrednotenju delnice z modelom stalne rasti se razlika med zahtevano donosnostjo in stopnjo rasti dividend zmanjša. Kaj se zgodi z vrednostjo delnice?', [
    'Vrednost delnice se poveča', 'Vrednost delnice se zmanjša', 'Vrednost delnice se ne spremeni', 'Vrednost delnice postane negativna'], 0,
    'P = D₁/(r − g): manjši imenovalec → višja vrednost. g je lahko tudi negativen; višji r vrednost znižuje.')),
  withId('q1xbr4f2', Q('Katere stroške kapitala upoštevamo pri vrednotenju nove investicije?', [
    'Stroške dodatnega kapitala, tehtane s ciljno strukturo kapitala', 'Stroške že obstoječega kapitala po knjigovodski strukturi',
    'Navadno povprečje stroškov vseh virov', 'Stroške virov brez davčnih učinkov in stroškov izdaje'], 0,
    'Relevantni so mejni stroški novega kapitala; uteži so ciljna struktura, dolg upoštevamo po davku, stroške izdaje vključimo.')),
  withId('q15lejd5', Q('Podjetje kupcem podaljša plačilni rok in poveča popust za hitro plačilo. Kaj je NAJMANJ verjetna posledica?', [
    'Delež slabih terjatev se zmanjša', 'Dnevi vezave terjatev se podaljšajo', 'Prodaja in stroški proizvodnje se povečajo', 'Stroški financiranja terjatev se povečajo'], 0,
    'Milejša kreditna politika privabi tudi slabše plačnike, zato je slabih terjatev več, ne manj.')),
  withId('q52whfr', Q('Katera trditev o politikah financiranja gibljivih sredstev NE drži?', [
    'Agresivna politika je najmanj tvegana, ker uporablja najcenejše vire', 'Lastniški kapital nima dospetja, zato je financiranje z njim najmanj tvegano (a drago)',
    'Konzervativna politika del začasnih potreb financira z dolgoročnimi viri', 'Financiranje dolgoročnih naložb s kratkoročnimi viri je zelo tvegano'], 0,
    'Agresivna politika del stalnih potreb financira kratkoročno; je cenejša, a najbolj tvegana, ker virov morda ni mogoče obnoviti.')),
  withId('qohq6g9', Q('Banka A obresti pripisuje letno, banka B mesečno; obe po 4 % letno. Kje bomo imeli po 5 letih več?', [
    'V banki B, ker se obresti obrestujejo že med letom', 'V banki A, ker je pripis redkejši', 'Povsod enako, ker je obrestna mera enaka', 'V banki A, če je glavnica majhna'], 0,
    'Pogostejši pripis → obresti na obresti znotraj leta → višja efektivna obrestna mera (4,07 % namesto 4 %).')),
  withId('q1qu043s', Q('Podjetje mora letos v okviru presihajočega sklada umakniti del obveznic. Tržna cena obveznic je 104 % nominalne vrednosti. Kako ravna?', [
    'Obveznice izžreba in odkupi po nominalni vrednosti', 'Obveznice kupi na sekundarnem trgu po tržni ceni',
    'Obveznic ne odkupi, dokler cena ne pade pod nominalo', 'Odkupi jih po tržni ceni sorazmerno od vseh imetnikov'], 0,
    'Podjetje izbere cenejšo pot: pri ceni nad nominalno je ceneje žrebanje in odkup po nominalni; pri ceni pod nominalno nakup na trgu.')),
  withId('q1cnmp9o', Q('Kaj je PREDNOST financiranja z navadnimi delnicami?', [
    'Delnice ne dospejo, zato ni pritiska za vračilo glavnice', 'Dividende so davčno priznan odhodek', 'Obstoječi delničarji ohranijo ves nadzor', 'Stroški izdaje so nižji kot pri obveznicah'], 0,
    'Pomanjkljivosti delnic: razvodenitev nadzora, delitev dobička z novimi lastniki, dividende niso davčno priznane, višji stroški izdaje in kapitala.')),
  withId('q135ocm', Q('Katero podjetje se lahko praviloma financira z višjim deležem dolga?', [
    'Zrelo podjetje s stabilnimi denarnimi tokovi', 'Podjetje z visokim poslovnim vzvodom', 'Podjetje z zelo nihajočimi cenami in stroški', 'Podjetje z nizkimi donosi iz poslovanja'], 0,
    'Stabilni denarni tokovi prenesejo več dolga; visok poslovni vzvod in nihanja zahtevajo manj finančnega vzvoda.')),
  withId('q125klau', Q('Katera od naštetih NI predpostavka modela CAPM?', [
    'Investitorji plačujejo visoke transakcijske stroške', 'Investitorji so tveganju nenaklonjeni', 'Vsi investitorji imajo enaka pričakovanja o donosnostih', 'Zadolževanje in posojanje je mogoče po netvegani obrestni meri'], 0,
    'CAPM predpostavlja trg brez trenja: brez transakcijskih stroškov in davkov, učinkovit trg kapitala.')),
  withId('q1fvqlbx', Q('Investitor ima dobro razpršeno premoženje. Za katero tveganje po CAPM dobi premijo?', [
    'Za sistematično tveganje (beto)', 'Za nesistematično tveganje posameznega podjetja', 'Za sistematično in nesistematično tveganje', 'Za nobeno tveganje, donosnost je enaka netvegani'], 0,
    'Nesistematično tveganje se z razpršitvijo odpravi, zato zanj ni premije. r = rf + β(rm − rf): višja beta, višja premija.')),
  withId('q1nsnqkh', Q('Kaj NI naloga finančnega direktorja?', [
    'Po pridobitvi virov se v uporabo sredstev ne vmešava več', 'Izbira vire in naložbe, ki najbolje sledijo cilju podjetja',
    'Ugotavlja stroške posameznih virov financiranja', 'Presoja tveganje in donosnost poslovnih aktivnosti'], 0,
    'Finančna funkcija spremlja naložbe ves čas (koristi in stroške uporabe sredstev), ne le ob zbiranju virov.')),
  withId('q1cekvo1', Q('Zakaj so lastniki pogosto bolj naklonjeni tveganim naložbam kot upniki?', [
    'Ker ob uspehu večina dodatnega donosa pripade njim, upniki dobijo le dogovorjene obresti', 'Ker zaradi omejene odgovornosti ne nosijo nobenega tveganja',
    'Ker upniki zahtevajo višjo donosnost kot lastniki', 'Ker lahko lastniki delnice vedno prodajo brez izgube'], 0,
    'Asimetrija izplačil: donos upnika je omejen, ob neuspehu pa izgubo nosi tudi on. Zato upniki v pogodbe vgradijo omejitve (zaveze).')),
  withId('qqfsap8', Q('Strošek kapitala je 9 %. Projekt C ima IRR 15 %, projekt D 11 %, krivulji NSV se sekata pri 6 %; tokovi so normalni, tveganje enako. Kaj velja?', [
    'Oba imata pozitivno NSV, pri 9 % ima višjo NSV projekt C', 'Oba imata pozitivno NSV, višjo ima D, ker je stopnja križanja pod 9 %',
    'Pozitivno NSV ima samo projekt C', 'Projekt C bi izbrali pri vsakem strošku kapitala'], 0,
    'IRR > strošek kapitala → NSV > 0 za oba. Nad stopnjo križanja (6 %) ima višjo NSV projekt z višjo IRR (C); pod 6 % bi bil boljši D.')),
  withId('q1br9mm0', Q('Nov izdelek bo zmanjšal prodajo obstoječega izdelka podjetja. Kako to upoštevamo pri oceni projekta?', [
    'Kot zmanjšanje denarnih tokov projekta (negativno eksternalijo)', 'Kot nepovratni strošek, ki ga ne upoštevamo', 'Kot dodatni priliv projekta', 'Ne upoštevamo ga, ker se nanaša na obstoječi izdelek'], 0,
    'Štejejo dodatni (inkrementalni) tokovi podjetja kot celote. Obresti pri tokovih ne upoštevamo, ker so zajete v diskontni stopnji.')),
  withId('q1ajyuac', Q('Zakaj imajo dolgoročne državne obveznice praviloma višjo donosnost od kratkoročnih?', [
    'Zaradi premije za ročnost - večjega tveganja spremembe obrestnih mer', 'Zaradi višjega tveganja neplačila države', 'Ker dolgoročne obveznice nimajo kuponov', 'Ker jih lahko kupijo le institucionalni investitorji'], 0,
    'Ob dvigu obrestnih mer cena dolgoročne obveznice pade bolj, zato investitorji za daljšo ročnost zahtevajo premijo.')),
  withId('q1m4tp11', Q('Podjetje stalna sredstva (600) financira z dolgoročnim dolgom 250 in lastniškim kapitalom 350, sezonska gibljiva sredstva (150) pa s kratkoročnimi obveznostmi 150. Katero politiko financiranja zasleduje?', [
    'Politiko izenačevanja ročnosti', 'Agresivno politiko', 'Konzervativno politiko', 'Tega brez izkaza poslovnega izida ni mogoče ugotoviti'], 0,
    'Dolgoročne naložbe so pokrite z dolgoročnimi viri, začasna gibljiva sredstva s kratkoročnimi → ročnosti se ujemajo.')),
  withId('qfgr3oy', Q('Podjetje spremeni plačilne pogoje iz 2/10 neto 30 v 3/20 neto 60. Kaj se zagotovo NE zgodi?', [
    'Dnevi vezave terjatev se skrajšajo', 'Prodaja se verjetno poveča', 'Stroški slabih terjatev se povečajo', 'Stroški financiranja terjatev se povečajo'], 0,
    'Daljši rok (60 dni) in daljše obdobje popusta podaljšata dneve vezave terjatev.')),
  withId('qbzfsa0', Q('Katera trditev o denarnih tokovih nadomestitvene naložbe NE drži?', [
    'Davek, prihranjen zaradi izgube ob prodaji stare opreme, je denarni odliv', 'Davčni ščit amortizacije je denarni priliv',
    'Prihranek stroškov po davkih je denarni priliv', 'Povečanje neto obratnega kapitala je na začetku odliv, na koncu priliv'], 0,
    'Izguba ob prodaji zniža davčno osnovo → davčni prihranek (izguba × t) je PRILIV.')),
  withId('q41ha0k', Q('Zahtevana donosnost delnice je 11 %, dividende stalno rastejo po 3 % letno. Kolikšen je dividendni donos?', [
    '8 %', '3 %', '11 %', '14 %'], 0,
    'r = D₁/P₀ + g → D₁/P₀ = 11 % − 3 % = 8 %. Pri stalni rasti je kapitalski dobiček (rast cene) enak g.')),
  withId('q18uqxwm', Q('Podjetje, ki že kotira na borzi, izda nove delnice. Na katerem trgu poteka ta transakcija?', [
    'Na primarnem trgu', 'Na sekundarnem trgu', 'Na denarnem trgu', 'Na terminskem trgu'], 0,
    'Nova izdaja je vedno primarni trg; na sekundarnem trgu se trguje z že izdanimi papirji (likvidnost). Ekonomska funkcija trgov je prenos prihrankov v najproduktivnejše namene.')),
  withId('qujin6v', Q('Kateri dogodek NE spremeni hitrega (pospešenega) koeficienta likvidnosti?', [
    'Kupec poravna terjatev', 'Z denarjem kupimo zaloge', 'Z denarjem plačamo dobavitelja', 'Prodamo stroj za gotovino'], 0,
    'Hitri koeficient = (gibljiva sredstva − zaloge)/kratkoročne obveznosti. Terjatev → denar pusti števec enak; nakup zalog z denarjem ga zniža.')),
  withId('qpcw36z', Q('Delniška družba izda nove delnice. Zakaj je za obstoječe delničarje pomembna prednostna pravica?', [
    'Ker lahko kupijo sorazmeren del nove izdaje in ohranijo svoj delež', 'Ker jim zagotavlja višjo dividendo po izdaji',
    'Ker varuje upnike pred spremembo strukture kapitala', 'Ker managerjem omogoča prodajo delnic pod tržno ceno'], 0,
    'Prednostna pravica varuje pred razvodenitvijo deleža glasov in dobička.')),
  withId('qzeapak', Q('Podjetje je lani plačalo 20.000 € za tržno raziskavo novega izdelka. Kako ta znesek upoštevamo pri oceni projekta?', [
    'Ne upoštevamo ga, ker je nepovratni strošek', 'Kot odliv v letu 0', 'Kot oportunitetni strošek', 'Prištejemo ga k začetni investiciji'], 0,
    'Strošek je nastal ne glede na odločitev o projektu. Upoštevamo pa oportunitetne stroške, spremembe NOK ter stroške prevoza in montaže.')),
  withId('q1gt9zda', Q('Podjetje vzame stroj v najem za 9 od 10 let njegove življenjske dobe; obroki pokrijejo skoraj vso vrednost, najema ni mogoče prekiniti. Za kakšen najem gre?', [
    'Finančni najem', 'Poslovni (operativni) najem', 'Kratkoročni najem', 'Najem brez obveznosti plačila'], 0,
    'Finančni najem je ekonomsko nakup na kredit (nepreklicen, traja skoraj vso življenjsko dobo). Poslovni najem je kratkotrajen in praviloma preklicen.')),
  withId('q16bcqf0', Q('Komu je poleg sistematičnega pomembno tudi tveganje projekta znotraj podjetja?', [
    'Delničarjem, managerjem in posojilodajalcem', 'Samo managerjem, ker jim gre za zaposlitev', 'Samo posojilodajalcem zaradi bonitete', 'Nikomur, šteje le sistematično tveganje'], 0,
    'Vpliva na posojilno sposobnost in dobiček (delničarji), stabilnost zaposlitve (managerji) in boniteto (posojilodajalci).')),
  withId('qkpmsjh', Q('Kateri cilj naj zasleduje uprava javne delniške družbe?', [
    'Čim višjo vrednost delnice na dolgi rok', 'Čim višji dobiček na delnico v tekočem letu', 'Čim višje prihodke od prodaje', 'Čim višjo ceno delnice na dan izteka mandata'], 0,
    'Cilj je maksimiranje dolgoročne vrednosti za lastnike, ne kratkoročnih kazalnikov.')),
  withId('q1v7buvp', Q('Katera trditev o finančnih institucijah NE drži?', [
    'Vzajemni skladi so tipične pogodbene finančne institucije', 'Zavarovalnice in pokojninski skladi so pogodbene institucije',
    'Centralna banka vodi denarno politiko na denarnem trgu', 'V Sloveniji nadzor izvajajo Banka Slovenije, AZN in ATVP'], 0,
    'Pogodbene institucije imajo pogodbene prilive (zavarovalnice, pokojninski skladi); vzajemni skladi so investicijske institucije.')),
  withId('q1umof65', Q('Katera trditev o NSV in IRR (normalni denarni tokovi) NE drži?', [
    'Projekt z IRR 6 % ima pri strošku kapitala 8 % pozitivno NSV', 'Projekt z IRR 8 % ima pri strošku kapitala 8 % NSV enako 0',
    'Projekt z IRR 3 % ima pri strošku kapitala 8 % negativno NSV', 'Neodvisen projekt sprejmemo po obeh kriterijih, če je IRR večja od stroška kapitala'], 0,
    'Pri normalnih tokovih je NSV > 0 natanko tedaj, ko je IRR > strošek kapitala.')),
  withId('qa0dmlt', Q('Katera trditev o strukturi kapitala drži?', [
    'Pri strukturi z najnižjim WACC je vrednost podjetja in delnice največja', 'Zadržani dobiček nima stroška, ker ga ni treba izdati',
    'Vsak dodaten evro dolga zniža WACC, saj so obresti davčno priznane', 'Zadržani dobiček je cenejši od dolga po davkih'], 0,
    'Z zadolževanjem rasteta stroška obeh virov (tveganje), zato WACC ne pada v nedogled. Zadržani dobiček stane toliko kot lastniški kapital (oportunitetni strošek).')),
];

const racunske = [
  withId('q1i405ob', Q('Stroj A: 5 let, 80 mio €, 24 mio € letno; stroj B: 7 let, 110 mio €, 26 mio € letno; strošek kapitala 10 %. Kolikšna je enakovredna letna anuiteta (EAA) donosnejšega stroja?', [
    '3,41 mio €', '2,90 mio €', '16,58 mio €', '10,98 mio €'], 0,
    'NSV A = 24 · 3,791 − 80 = 10,98 → EAA = 2,90; NSV B = 26 · 4,868 − 110 = 16,58 → EAA = 3,41. Različne dobe → primerjamo EAA, ne NSV.')),
  withId('q1wybaar', Q('Strošek kapitala je 9 %, za tveganje ± 1,5 o. t. Projekt A (manj tvegan): −300; 120, 110, 90, 80, 60. Projekt B (bolj tvegan): −250; 70, 90, 100, 110, 80. Kolikšna je NSV projekta, ki ga izberemo?', [
    '83,51 €', '80,96 €', '97,11 €', '111,59 €'], 0,
    'A diskontiramo po 7,5 %: NSV = 80,96; B po 10,5 %: NSV = 83,51. Izberemo B (višja NSV). (97,11 = B brez prilagoditve za tveganje, 111,59 = B s prilagoditvijo v napačno smer.)')),
  withId('q197bb3x', Q('Obveznica: nominalna 1.000 €, 5 % letni kupon; 8 let kuponov ne izplačajo, konec 9. leta plačajo vse zaostale kupone, kupon 9. leta in glavnico. Zahtevana donosnost 9 %. Kolikšna je cena danes?', [
    '667,62 €', '760,19 €', '1.000,00 €', '1.450,00 €'], 0,
    'Enkratni tok konec 9. leta: 9 · 50 + 1.000 = 1.450 €; SV = 1.450/1,09⁹ = 667,62 €. (760,19 € bi veljalo pri rednem izplačevanju kuponov.)')),
  withId('qp797dg', Q('Delnica: 2 leti brez dividend, D₃ = 80 €, D₄ = 90 €, nato rast 3 % letno; zahtevana donosnost 11 %. Kolikšna je vrednost delnice?', [
    '881,09 €', '1.158,75 €', '822,59 €', '955,10 €'], 0,
    'D₅ = 92,70; P₄ = 92,70/(0,11 − 0,03) = 1.158,75; P₀ = 80/1,11³ + (90 + 1.158,75)/1,11⁴ = 58,50 + 822,59 = 881,09 €.')),
  withId('q1awktwc', Q('Premoženje je enakomerno naloženo v 5 delnic, β premoženja je 1,20. Delnico A (β 1,50) zamenjamo z delnico X in β premoženja postane 1,14. Kolikšna je β delnice X?', [
    '1,20', '1,14', '0,90', '1,50'], 0,
    '1,14 = 1,20 − 0,2 · 1,50 + 0,2 · β_X → 0,2 · β_X = 0,24 → β_X = 1,20.')),
  withId('q1ytwa5x', Q('Delnica: D₁ = 20 €, D₂ = 24 €, D₃ = 27 €, nato rast 3 % letno; zahtevana donosnost 12 %. Kolikšna je cena delnice?', [
    '276,15 €', '309,00 €', '239,16 €', '231,75 €'], 0,
    'P₃ = 27 · 1,03/(0,12 − 0,03) = 309,0; P₀ = 20/1,12 + 24/1,12² + (27 + 309)/1,12³ = 17,86 + 19,13 + 239,16 = 276,15 €.')),
  withId('qbzr1g', Q('Dobavitelj: rok 40 dni, popust 2 % za plačilo do 10. dne. Banka: 9 % letno z zahtevanim 10 % kompenzacijskim stanjem. Kolikšna sta strošek neizkoriščenega popusta (EAR) in strošek bančnega posojila?', [
    '27,86 % in 10,00 %', '2,04 % in 9,00 %', '24,83 % in 9,90 %', '27,86 % in 9,00 %'], 0,
    'EAR = (1 + 2/98)^(365/30) − 1 = 27,86 %; banka: 9 %/(1 − 0,10) = 10 %. Cenejše je bančno posojilo, s katerim izkoristimo popust.')),
  withId('qhka90g', Q('Banka ponuja depozit po 4,2 % letno, obresti pripisuje četrtletno. Kolikšna je dejanska letna obrestna mera?', [
    '4,27 %', '4,20 %', '4,13 %', '1,05 %'], 0,
    'EAR = (1 + 0,042/4)⁴ − 1 = 4,27 %.')),
  withId('q6wdz2w', Q('2.000 € naložimo po 9 % letno z letnim pripisom obresti. Čez koliko let znesek naraste na 10.000 €?', [
    '18,7 leta', '44,4 leta', '20 let', '15,6 leta'], 0,
    'n = ln(5)/ln(1,09) = 1,609/0,0862 = 18,7 leta. (44,4 = navadne obresti: 400 %/9 %.)')),
  withId('q1sfjycq', Q('Obveznica: nominalna 5.000 €, 8-letna, izdana pred 5 leti, polletni kuponi (10 % letno), tržna obrestna mera 6 %, tečaj 109,5. Bi jo prodali?', [
    'Ne, obveznica je podcenjena za okoli 67 €', 'Da, obveznica je precenjena za okoli 67 €',
    'Da, ker kuponi prinašajo več kot tržna obrestna mera', 'Ne, obveznica je podcenjena za 9,5 €'], 0,
    'Še 6 polletij po 3 %, kupon 250 €: vrednost = 250 · 5,417 + 5.000/1,03⁶ = 5.541,72 €; tečaj 109,5 = 5.475 € → podcenjena za ≈ 67 €, zato je ne prodamo.')),
  withId('q1njjli3', Q('Stroj X: 4 leta, 20 mio €, 7 mio € letno; stroj Y: 8 let, 45 mio €, 9,5 mio € letno; strošek kapitala 6 %. Katerega izberemo?', [
    'Y - višja EAA (2,25 mio €)', 'X - višja EAA (2,25 mio €)', 'X - višja NSV (4,26 mio €)', 'Y - višja NSV (13,99 mio €), EAA ni potrebna'], 0,
    'NSV X = 7 · 3,465 − 20 = 4,26 (EAA 1,23); NSV Y = 9,5 · 6,210 − 45 = 13,99 (EAA 2,25). Pri različnih dobah primerjamo EAA.')),
  withId('q1i5455d', Q('Projekt: −80, +50, −10, −10, +50 (mio €), WACC 8 %. Kolikšna je popravljena notranja stopnja donosa (MIRR)?', [
    '4,02 %', '8,00 %', '12,48 %', '1,54 %'], 0,
    'SV odlivov = 80 + 10/1,08² + 10/1,08³ = 96,51; KV prilivov ob koncu = 50 · 1,08³ + 50 = 112,99; MIRR = (112,99/96,51)^(1/4) − 1 = 4,02 %.')),
  withId('q1iz4pob', Q('Delnica A: σ = 30 %, korelacija s trgom 0,8; delnica B: σ = 10 %, korelacija 0,6; σ trga 15 %. Kaj drži?', [
    'β A = 1,60', 'β B = 0,67', 'β premoženja 60:40 = 1,00', 'Premoženje 60:40 je manj tvegano od trga'], 0,
    'β = ρ · σᵢ/σₘ: A 0,8 · 30/15 = 1,60; B 0,6 · 10/15 = 0,40; premoženje 0,6 · 1,60 + 0,4 · 0,40 = 1,12 > 1, torej bolj tvegano od trga.')),
];

module.exports = { teorija, racunske };
