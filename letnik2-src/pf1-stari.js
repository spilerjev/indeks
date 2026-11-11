/* Poslovne finance 1 - stari izpiti (Poslovne finance, 1. 2. 2016 in 2. rok 2016; EF Zapiski, z rešitvami študentov).
   Vse računske rešitve so preračunane. Popravek: pri čistilni napravi (IKRA) je pravilna diskontna stopnja 8 %
   (manj tvegan projekt: WACC 10 % − 2 o. t.), študentska rešitev je uporabila 12 %.
   Izpuščena vprašanja z dvoumnimi ali nepopolnimi podatki (2. rok: Smet, EAR 2/10, Oblak). */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });

const teorija = [
  Q('(Izpit 2016) Katera trditev o agentskih odnosih v podjetju je pravilna?', [
    'Nastanejo, ko upniki pooblastijo lastnike, da v njihovem imenu upravljajo z denarjem, ki so ga posodili podjetju',
    'Nastanejo, ko managerji pooblastijo lastnike, da v njihovem imenu upravljajo s podjetjem in odločajo',
    'Nastanejo, ko zaposleni pooblastijo managerje, da v njihovem imenu upravljajo z opremo podjetja',
    'Nastanejo, ko lastniki pooblastijo upnike, da v njihovem imenu posodijo denar podjetju in odločajo'], 0,
    'Agentski odnos: principal pooblasti agenta. Med upniki (principal) in lastniki/managerji (agent) - upniki zaupajo denar, o njegovi rabi pa odločajo lastniki. Klasičen primer je lastniki → managerji.'),
  Q('(Izpit 2016) Sedanja vrednost denarne enote je:', [
    'Znesek, ki ga moramo imeti danes, da ob obrestni meri r po n obdobjih dobimo 1 denarno enoto',
    'Znesek, na katerega naraste 1 denarna enota v n letih pri letni obrestni meri r',
    'Znesek, na katerega naraste 1 denarna enota v enem četrtletju pri letni meri r',
    'Znesek, ki ga moramo imeti po n obdobjih, da z naložbo za še eno leto dobimo 1 enoto'], 0,
    'SV = 1/(1 + r)ⁿ. Drugi odgovor opisuje prihodnjo vrednost (1 + r)ⁿ.'),
  Q('(Izpit 2016) Na kaj moramo paziti, ko primerjamo zneske iz različnih obdobij?', [
    'Preračunati jih moramo (diskontirati/obrestovati) na isti trenutek, najpogosteje na danes',
    'Enake zneske (anuitete) lahko primerjamo neposredno, brez diskontiranja',
    'Pri obrestni meri pod 10 % jih lahko seštevamo brez preračunavanja',
    'Če zneski enakomerno rastejo do neskončnosti, diskontiranje ni potrebno'], 0,
    'Denar ima časovno vrednost; primerljivi so le zneski, preračunani na isti trenutek (lahko tudi katerikoli drug dan).'),
  Q('(Izpit 2016) Katera trditev o efektivni obrestni meri je pravilna?', [
    'Pove, kolikšna bi morala biti letna mera z enkratnim pripisom, da dobimo enako kot pri meri r z m-kratnim pripisom',
    'Pove, kolikšna bi morala biti mera z m-kratnim pripisom, da dobimo enako kot pri meri r z enkratnim pripisom',
    'Pove, kolikšna bi morala biti mera s 4-kratnim pripisom, da dobimo enako kot pri meri r z enkratnim pripisom',
    'Efektivna obrestna mera je vedno enaka navedeni (nominalni) letni obrestni meri r'], 0,
    'EAR = (1 + r/m)^m − 1: enkratni letni pripis, ki je enakovreden pogostejšemu pripisu.'),
  Q('(Izpit 2016) Katera trditev o vrednosti delnic je NAPAČNA?', [
    'Delnica podjetja, ki ne izplačuje dividend, je brez vrednosti',
    'Delnica bolj tveganega podjetja ima ceteris paribus nižjo vrednost',
    'Delnica podjetja z enakomerno upadajočimi dividendami je vredna več kot nič',
    'Dividende so lahko nekaj let visoke, nato enakomerno rastejo do neskončnosti'], 0,
    'Delnica brez sedanjih dividend ima vrednost zaradi prihodnjih dividend ali vrednosti ob prodaji/likvidaciji.'),
  Q('(Izpit 2016) Katera trditev o vrednotenju vrednostnih papirjev je NAPAČNA?', [
    'Pri papirju brez dospetja negativna stopnja rasti denarnih tokov pomeni, da je brez vrednosti',
    'Vrednost papirja je enaka sedanji vrednosti vseh prihodnjih pričakovanih denarnih tokov',
    'Večje tveganje pomeni višjo diskontno stopnjo in nižjo vrednost papirja',
    'Prej kot papir prinese denarne tokove, več je vreden ob nespremenjenih ostalih parametrih'], 0,
    'Pri g < 0 je vrednost D₁/(r − g) > 0 - tokovi upadajo, a so pozitivni.'),
  Q('(Izpit 2016) Kako financiranje tudi z dolgom vpliva na tveganje lastnikov?', [
    'Ob isti spremembi dobička iz poslovanja se donos na delnico spremeni bolj kot brez dolga',
    'Variabilnost donosov na delnico (EPS) se zaradi uporabe dolga zmanjša',
    'Dolg ne prinaša dodatnega tveganja za lastnike, temveč samo za upnike',
    'Donosi lastnikov se povečajo, ker so dividende davčno priznan odhodek'], 0,
    'Finančni vzvod: fiksne obresti povečajo variabilnost EPS. Davčno priznane so obresti, ne dividende.'),
  Q('(Izpit 2016) Kaj je tehtano povprečje stroškov kapitala (WACC)?', [
    'Mejni strošek vsake dodatne denarne enote, pridobljene deloma z dolgom in deloma z lastniškim kapitalom',
    'Tehtano povprečje obrestnih mer pred davki, po katerih si je podjetje izposojalo lani',
    'Povprečje stroškov kapitala, izračunano iz računovodskih podatkov preteklega leta',
    'Zahtevana letna stopnja donosa na lastniški kapital podjetja'], 0,
    'WACC je mejni (tržni, prihodnji) strošek dodatnega kapitala v ciljni strukturi, z obrestmi po davkih.'),
  Q('(Izpit 2016) Kaj je neto sedanja vrednost?', [
    'Kriterij odločanja o dolgoročnih naložbah, ki pri medsebojno izključujočih naložbah lahko zavede',
    'Vsota vseh denarnih tokov naložbe, pri čemer denarnih tokov ne diskontiramo',
    'Donosnost naložbe, izražena v odstotku od začetne investicije',
    'Minimalna cena, po kateri smo pripravljeni kupiti dolgoročno naložbo'], 0,
    'NSV = vsota diskontiranih denarnih tokov. Tako je bil zapisan pravilni odgovor na izpitu (NSV je kriterij odločanja).'),
  Q('(Izpit 2016) Kaj je notranja stopnja donosa?', [
    'Diskontna stopnja, pri kateri je sedanja vrednost prilivov enaka sedanji vrednosti investicije',
    'Vrednost, na katero naraste naložba v času trajanja projekta',
    'Presežek prilivov nad odlivi, merjen v odstotnih točkah nad WACC',
    'Presežek denarnih prilivov nad odlivi naložbe, merjen v evrih'], 0,
    'NSD je stopnja, pri kateri je NSV = 0. Popravljena NSD predpostavlja reinvestiranje po WACC.'),
  Q('(Izpit 2016) Kaj je popravljena notranja stopnja donosa (MIRR)?', [
    'Stopnja, pri kateri je SV prilivov enaka investiciji, če se tokovi reinvestirajo po WACC',
    'Stopnja, pri kateri je SV prilivov enaka investiciji, če se tokovi reinvestirajo po isti stopnji',
    'Vrednost, na katero naraste naložba z vmesnimi prilivi, reinvestiranimi po WACC',
    'Presežek prilivov nad odlivi, merjen v odstotnih točkah nad WACC'], 0,
    'MIRR = (končna vrednost prilivov po WACC / investicija)^(1/n) − 1. Drugi odgovor opisuje navadno NSD.'),
  Q('(Izpit 2016) Katera trditev o dividendni politiki je pravilna?', [
    'Teorija "raje vrabec v roki" pravi, da so dividende manj tvegane, zato investitorji višje vrednotijo plačnike dividend',
    'Delničarji raje vidijo dividende, ker na dividende ne plačajo davka, saj ga je že plačalo podjetje',
    'Do dividende so upravičeni delničarji, vpisani v knjigo na dan razglasitve dividende',
    'Pri politiki preostalega dobička se dividenda spremeni le, če se spremeni dobiček'], 0,
    'Dividende so obdavčene tudi pri delničarju. Upravičenost določa presečni datum (ne datum razglasitve). Pri rezidualni politiki je dividenda odvisna tudi od investicij.'),
];

const racunske = [
  C('(Izpit 2016) Obveznica: nominalna vrednost 1000 €, 5 let do dospetja, kuponska mera 8 % s četrtletnimi kuponi, zahtevana donosnost 4 %. Koliko ste pripravljeni plačati?', [
    '1.180,46 €', '1.140,00 €', '1.080,57 €', '1.000,00 €'], 0,
    'Kupon 20 € na četrtletje, r = 1 %, 20 obdobij: 20 · (1 − 1,01⁻²⁰)/0,01 + 1000/1,01²⁰ = 360,91 + 819,54 = 1.180,46 €.'),
  C('(Izpit 2016) SMETANA: 3 leta ni dividend, v 4. letu 100 €, nato dividende upadajo za 3 % letno, rs = 10 %. Največja cena delnice?', [
    '577,93 €', '609,46 €', '531,60 €', '700,00 €'], 0,
    'Vrednost ob koncu 3. leta: D₄/(r − g) = 100/(0,10 + 0,03) = 769,23 €; diskontirano 3 leta: 769,23/1,1³ = 577,93 €.'),
  C('(Izpit 2016) BOMBON: EBIT 15 mio €, davek 15 %. Nova struktura 70 % dolga po 12 %, rs naraste na 16 %. Vrednost podjetja?', [
    '106,78 mio €', '100,00 mio €', '112,00 mio €', '96,52 mio €'], 0,
    'WACC = 0,7 · 12 % · 0,85 + 0,3 · 16 % = 11,94 %. V = EBIT(1 − t)/WACC = 12,75/0,1194 = 106,78 mio €.'),
  C('(Izpit 2016) MARMELADA: projekti 15, 13, 7, 5 %, vsak 5 mio €; 40 % dolg, 60 % lastniški; WACC 10 % (12 % z novimi delnicami); čisti dobiček 5 mio €; rezidualna politika. Delež dividend?', [
    '0 %', '40 %', '50 %', '100 %'], 0,
    'Sprejmemo projekta s 15 % in 13 % (oba nad 12 %) = 10 mio €; lastniški del 60 % = 6 mio € > 5 mio € dobička → ves dobiček zadržimo, dividenda 0.'),
  C('(Izpit 2016) ČOKOLADA: 20 % dolg, 80 % lastniški, čisti dobiček 3 mio €, rezidualna politika. Koliko investicij lahko izvede, preden mora izdati nove delnice?', [
    '3,75 mio €', '5 mio €', '3 mio €', '15 mio €'], 0,
    'Prelomna točka = zadržani dobiček / delež lastniškega kapitala = 3/0,8 = 3,75 mio €.'),
  C('(Izpit 2016, 2. rok) 80 % dolg, 20 % lastniški kapital; banka zviša obrestno mero za posojila nad 4 mio €. Koliko investicij pred zvišanjem?', [
    '5 mio €', '4 mio €', '3,2 mio €', '20 mio €'], 0,
    'Prelomna točka dolga = 4/0,8 = 5 mio € investicij.'),
  C('(Izpit 2016) Investicija 100 mio €, nato 4 leta po 40 mio €, WACC 10 %. Popravljena NSD (MIRR)?', [
    '16,72 %', '21,86 %', '10,00 %', '25,50 %'], 0,
    'Končna vrednost prilivov: 40 · (1,1⁴ − 1)/0,1 = 185,64. MIRR = (185,64/100)^(1/4) − 1 = 16,72 %. (Navadna NSD bi bila 21,86 %.)'),
  C('(Izpit 2016) IKRA: čistilna naprava 50.000 €, 5 let, vsako leto še 5.000 €; projekt je manj tvegan; WACC 10 %, za manj tvegane −2 o. t. Sprememba premoženja delničarjev?', [
    'Zmanjša se za 69.963,55 €', 'Zmanjša se za 68.023,88 €', 'Zmanjša se za 50.000 €', 'Ostane nespremenjeno'], 0,
    'r = 8 %: NSV = −50.000 − 5.000 · (1 − 1,08⁻⁵)/0,08 = −50.000 − 19.963,55 = −69.963,55 €. (68.023,88 dobimo napačno z 12 %.)'),
  C('(Izpit 2016) TORTA: prodaja 1,5 mio €/leto, zaloge se obrnejo 36,5-krat, terjatve 82.191,78 €, pogoji dobaviteljev 0/10 neto 40. Dnevi vezave denarja?', [
    '−10 dni', '10 dni', '0 dni', '40 dni'], 0,
    'Dnevi zalog 365/36,5 = 10; dnevi terjatev 82.191,78/(1,5 mio/365) = 20; dobavitelje plačamo na 40. dan. 10 + 20 − 40 = −10.'),
  C('(Izpit 2016) Plačilni rok 40 dni, podjetje plačuje na 60. dan brez stroškov, ob plačilu v 10 dneh dobi 3 % popusta. Dejanski letni strošek (EAR)?', [
    '24,9 %', '17,3 %', '32,0 %', '10,0 %'], 0,
    'Odpoved popustu stane 3/97 za 50 dni (60 − 10): EAR = (1 + 3/97)^(365/50) − 1 = 24,9 %.'),
  C('(Izpit 2016, 2. rok) Prodaja 1.545.000 €, nabavna vrednost prodanega 1.011.000 €, čisti dobiček 235.000 €, sredstva 2.657.000 €, obračanje zalog 2. Kako se spremeni ROA, če obračanje zalog povečajo na 5?', [
    'Poveča se za 1,14 o. t.', 'Poveča se za 0,73 o. t.', 'Ne spremeni se', 'Zmanjša se za 0,63 o. t.'], 0,
    'Zaloge = 1.011.000/2 = 505.500 → pri 5: 202.200; sredstva padejo za 303.300 na 2.353.700. ROA: 8,84 % → 9,98 % (+1,14 o. t.).'),
];

module.exports = { teorija, racunske };
