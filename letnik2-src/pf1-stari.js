/* Poslovne finance 1 - vaje v slogu izpita (teorija in računske naloge).
   Vprašanja so napisana na novo (lastne formulacije, nova podjetja in številke); vse računske rešitve so preračunane. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });

const teorija = [
  withId('q1c3dm7g', Q('V katerem primeru nastane agentski odnos med upniki in lastniki podjetja?', [
    'Upniki podjetju posodijo denar, o njegovi uporabi pa odločajo lastniki oziroma managerji',
    'Lastniki posodijo denar upnikom, ki z njim upravljajo namesto podjetja',
    'Zaposleni managerjem zaupajo upravljanje opreme podjetja',
    'Managerji lastnikom prepustijo vse poslovne odločitve'], 0,
    'Agentski odnos: principal pooblasti agenta, da ravna v njegovem imenu. Upniki (principal) zaupajo denar, o njegovi rabi pa odločajo lastniki oz. managerji (agent). Klasičen primer je odnos lastniki → managerji.')),
  withId('q1vkqvjx', Q('Kaj pove sedanja vrednost 1 € pri obrestni meri r in n obdobjih?', [
    'Koliko moramo vložiti danes, da bomo po n obdobjih imeli 1 €',
    'Na koliko naraste 1 € v n obdobjih',
    'Koliko obresti prinese 1 € v enem letu',
    'Koliko je vreden 1 € po n obdobjih, če ga ne vložimo'], 0,
    'SV = 1/(1 + r)ⁿ. Na koliko naraste 1 €, pove prihodnja vrednost (1 + r)ⁿ.')),
  withId('q1lw93e', Q('Podjetje primerja priliv 1.000 € čez 2 leti in priliv 1.100 € čez 4 leta. Kako mora ravnati?', [
    'Oba zneska preračuna na isti trenutek (npr. na danes) in ju šele nato primerja',
    'Primerja ju neposredno, ker sta oba izražena v evrih',
    'Diskontira le znesek, ki je večji od 1.000 €',
    'Sešteje ju, ker je obrestna mera nižja od 10 %'], 0,
    'Denar ima časovno vrednost; primerljivi so le zneski, preračunani na isti trenutek (najpogosteje danes, lahko pa tudi kateri drug dan).')),
  withId('q1pdfuda', Q('Banka ponuja 6 % letno z mesečnim pripisom obresti. Kaj pove efektivna letna obrestna mera?', [
    'Kolikšna bi morala biti letna mera z enkratnim pripisom, da bi dobili enako kot pri mesečnem pripisu',
    'Kolikšna je mesečna obrestna mera (6 % / 12)',
    'Da je dejanski donos vedno 6 %, ne glede na pogostost pripisa',
    'Kolikšna bi morala biti mera s četrtletnim pripisom, da bi dobili enako'], 0,
    'EAR = (1 + r/m)^m − 1 = (1 + 0,06/12)¹² − 1 = 6,17 %: enkratni letni pripis, enakovreden pogostejšemu pripisu.')),
  withId('qp2xv9e', Q('Katera trditev o vrednosti delnice NE drži?', [
    'Delnica podjetja, ki danes ne izplačuje dividend, nima vrednosti',
    'Višja zahtevana donosnost ob drugih enakih pogojih zniža vrednost delnice',
    'Vrednost delnice je sedanja vrednost pričakovanih dividend in prodajne cene',
    'Pri stalni rasti dividend je vrednost delnice D₁/(r − g)'], 0,
    'Delnica brez sedanjih dividend ima vrednost zaradi pričakovanih prihodnjih dividend ali vrednosti ob prodaji oz. likvidaciji.')),
  withId('q17l73m5', Q('Katera trditev o vrednotenju vrednostnih papirjev NE drži?', [
    'Obveznica z višjo kuponsko mero je ob drugih enakih pogojih vredna manj',
    'Vrednost papirja je sedanja vrednost pričakovanih denarnih tokov',
    'Papir brez dospetja z negativno stopnjo rasti tokov ima še vedno pozitivno vrednost',
    'Višja zahtevana donosnost zniža vrednost papirja'], 0,
    'Višji kuponi pomenijo večje denarne tokove in višjo vrednost. Pri g < 0 je vrednost D₁/(r − g) > 0, ker so tokovi sicer manjši, a pozitivni.')),
  withId('qet4c26', Q('Podjetje del lastniškega kapitala nadomesti z dolgom. Kaj se zgodi s tveganjem lastnikov?', [
    'Ista sprememba dobička iz poslovanja povzroči večjo spremembo dobička na delnico',
    'Variabilnost dobička na delnico se zmanjša',
    'Tveganje se poveča le upnikom, lastnikom pa ne',
    'Lastniki pridobijo, ker so dividende davčno priznan odhodek'], 0,
    'Finančni vzvod: fiksne obresti povečajo variabilnost EPS. Davčno priznane so obresti, ne dividende.')),
  withId('qryp2l7', Q('Kako je treba razumeti tehtano povprečje stroškov kapitala (WACC)?', [
    'Kot strošek dodatnega evra kapitala, pridobljenega v ciljni strukturi dolga in lastniškega kapitala',
    'Kot povprečje lanskih obrestnih mer pred davki',
    'Kot računovodski strošek kapitala iz preteklega leta',
    'Kot zahtevano donosnost lastnikov'], 0,
    'WACC je mejni (tržni, prihodnji) strošek dodatnega kapitala v ciljni strukturi, z upoštevanimi obrestmi po davkih.')),
  withId('qha0ckb', Q('Katera trditev o neto sedanji vrednosti (NSV) drži?', [
    'NSV je vsota diskontiranih denarnih tokov; pozitivna NSV poveča premoženje lastnikov',
    'NSV je vsota nediskontiranih denarnih tokov naložbe',
    'NSV je donosnost naložbe v odstotkih začetne investicije',
    'NSV je najnižja cena, po kateri smo naložbo pripravljeni kupiti'], 0,
    'NSV = Σ CFₜ/(1 + r)ᵗ. Pri medsebojno izključujočih se naložbah izberemo tisto z višjo NSV.')),
  withId('qzj7fiq', Q('Kaj je notranja stopnja donosa (NSD)?', [
    'Diskontna stopnja, pri kateri je NSV naložbe enaka 0',
    'Vrednost, na katero naraste naložba do konca projekta',
    'Razlika med donosnostjo projekta in WACC',
    'Presežek prilivov nad odlivi v evrih'], 0,
    'Pri NSD je sedanja vrednost prilivov enaka investiciji. Projekt sprejmemo, če je NSD > WACC.')),
  withId('q18g1rr2', Q('Po čem se popravljena notranja stopnja donosa (MIRR) loči od navadne NSD?', [
    'Predpostavlja, da se vmesni prilivi reinvestirajo po WACC',
    'Predpostavlja reinvestiranje prilivov po sami NSD',
    'Ne upošteva časovne vrednosti denarja',
    'Vedno je višja od navadne NSD'], 0,
    'MIRR = (končna vrednost prilivov, obrestovanih po WACC / investicija)^(1/n) − 1. Navadna NSD implicitno predpostavlja reinvestiranje po NSD.')),
  withId('q9e5bm', Q('Katera trditev o dividendni politiki drži?', [
    'Teorija »ptič v roki«: investitorji dividende štejejo za manj tvegane od kapitalskih dobičkov',
    'Delničarji dividend ne obdavčijo, ker je davek plačalo že podjetje',
    'Do dividende so upravičeni delničarji, vpisani na dan razglasitve dividende',
    'Pri politiki preostalega dobička je dividenda odvisna le od dobička'], 0,
    'Dividende so obdavčene tudi pri delničarju. Upravičenost določa presečni datum, ne datum razglasitve. Pri rezidualni politiki je dividenda odvisna tudi od investicij.')),
];

const racunske = [
  withId('q1qw9id7', C('Obveznica: nominalna vrednost 1.000 €, 4 leta do dospetja, kuponska mera 6 % s polletnimi kuponi, zahtevana donosnost 8 %. Koliko ste pripravljeni plačati?', [
    '932,67 €', '933,76 €', '1.000,00 €', '1.060,00 €'], 0,
    'Kupon 30 € na polletje, r = 4 %, 8 obdobij: 30 · (1 − 1,04⁻⁸)/0,04 + 1.000/1,04⁸ = 201,98 + 730,69 = 932,67 €. (933,76 € bi dobili z letnimi kuponi.) Ker je zahtevana donosnost nad kuponsko, je cena pod nominalo.')),
  withId('q1ycp3km', C('Podjetje LIPA 2 leti ne bo izplačevalo dividend, v 3. letu bo izplačalo 60 €, nato bodo dividende upadale za 2 % letno, rs = 12 %. Kolikšna je največja cena delnice?', [
    '341,65 €', '305,05 €', '478,32 €', '428,57 €'], 0,
    'Vrednost ob koncu 2. leta: D₃/(r − g) = 60/(0,12 + 0,02) = 428,57 €; diskontirano 2 leti: 428,57/1,12² = 341,65 €. (305,05 € = diskontirano 3 leta, 478,32 € = napačno r − |g|.)')),
  withId('qt6p8z8', C('Podjetje BREZA: EBIT 20 mio €, davek 20 %. Nova struktura 60 % dolga po 9 %, rs = 14 %. Kolikšna je vrednost podjetja?', [
    '161,29 mio €', '145,45 mio €', '201,61 mio €', '128,00 mio €'], 0,
    'WACC = 0,6 · 9 % · 0,8 + 0,4 · 14 % = 9,92 %. V = EBIT(1 − t)/WACC = 16/0,0992 = 161,29 mio €. (145,45 = brez davčnega ščita, 201,61 = EBIT pred davki.)')),
  withId('q1jbq58g', C('Podjetje JELKA: projekti z donosnostjo 16, 12, 9 in 6 %, vsak 4 mio €; 30 % dolg, 70 % lastniški kapital; WACC 9,5 % (11 % z novimi delnicami); čisti dobiček 8 mio €; rezidualna politika. Kolikšen delež dobička izplača?', [
    '30 %', '0 %', '70 %', '100 %'], 0,
    'Prelomna točka = 8/0,7 = 11,43 mio €. Sprejmemo projekta s 16 % in 12 % (8 mio €, oba nad WACC 9,5 %), 9 % je pod WACC. Lastniški del 0,7 · 8 = 5,6 mio € → dividende 2,4 mio € = 30 %.')),
  withId('qdv8bb1', C('Podjetje financira 35 % z dolgom in 65 % z lastniškim kapitalom, čisti dobiček je 2,6 mio €, dividendna politika je rezidualna. Koliko investicij lahko izvede, preden mora izdati nove delnice?', [
    '4 mio €', '2,6 mio €', '7,43 mio €', '1,69 mio €'], 0,
    'Prelomna točka = zadržani dobiček / delež lastniškega kapitala = 2,6/0,65 = 4 mio €.')),
  withId('q1eoftz7', C('Podjetje financira 75 % z dolgom; banka zviša obrestno mero za posojila nad 6 mio €. Koliko investicij lahko izvede pred zvišanjem?', [
    '8 mio €', '6 mio €', '4,5 mio €', '24 mio €'], 0,
    'Prelomna točka dolga = 6/0,75 = 8 mio € investicij. (4,5 = 6 · 0,75, 24 = 6/0,25.)')),
  withId('qq3m7ie', C('Investicija 80 mio €, nato 5 let po 25 mio €, WACC 8 %. Kolikšna je popravljena NSD (MIRR)?', [
    '12,89 %', '16,99 %', '8,00 %', '25,00 %'], 0,
    'Končna vrednost prilivov: 25 · (1,08⁵ − 1)/0,08 = 146,67. MIRR = (146,67/80)^(1/5) − 1 = 12,89 %. (Navadna NSD bi bila 16,99 %.)')),
  withId('q1genxzf', C('Podjetje mora namestiti čistilno napravo za 40.000 €, ki 4 leta povzroča še po 6.000 € stroškov; projekt je manj tvegan. WACC 11 %, za manj tvegane projekte −3 o. t. Kako se spremeni premoženje delničarjev?', [
    'Zmanjša se za 59.872,76 €', 'Zmanjša se za 58.614,67 €', 'Zmanjša se za 40.000 €', 'Ostane nespremenjeno'], 0,
    'r = 8 %: NSV = −40.000 − 6.000 · (1 − 1,08⁻⁴)/0,08 = −40.000 − 19.872,76 = −59.872,76 €. (58.614,67 € dobimo z 11 %.)')),
  withId('qkqql9n', C('Podjetje: prodaja 2,19 mio €/leto, zaloge se obrnejo 18,25-krat, terjatve 120.000 €, pogoji dobaviteljev 0/10 neto 30 (plača na 30. dan). Koliko dni je vezan denar?', [
    '10 dni', '−10 dni', '70 dni', '40 dni'], 0,
    'Dnevi zalog 365/18,25 = 20; dnevi terjatev 120.000/(2,19 mio/365) = 20; dobavitelje plačamo na 30. dan. 20 + 20 − 30 = 10.')),
  withId('q1ubt3y2', C('Dobavitelj ponuja 2/10 neto 30, podjetje pa brez stroškov plačuje na 45. dan. Kolikšen je dejanski letni strošek (EAR) odpovedi popustu?', [
    '23,5 %', '44,6 %', '21,3 %', '34,3 %'], 0,
    'Odpoved popustu stane 2/98 za 35 dni (45 − 10): EAR = (1 + 2/98)^(365/35) − 1 = 23,5 %. (44,6 % bi veljalo pri plačilu na 30. dan, 21,3 % je navadna, neobrestovana letna stopnja.)')),
  withId('q1uu6lxt', C('Prodaja 2.000.000 €, nabavna vrednost prodanega 1.200.000 €, čisti dobiček 300.000 €, sredstva 3.000.000 €, obračanje zalog 3. Kako se spremeni ROA, če obračanje zalog povečajo na 6?', [
    'Poveča se za 0,71 o. t.', 'Poveča se za 1,00 o. t.', 'Ne spremeni se', 'Zmanjša se za 0,71 o. t.'], 0,
    'Zaloge = 1.200.000/3 = 400.000 → pri 6: 200.000; sredstva padejo za 200.000 na 2.800.000. ROA: 10,00 % → 10,71 % (+0,71 o. t.).')),
];

module.exports = { teorija, racunske };
