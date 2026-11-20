/* Mikroekonomija 1 - 1. kolokvij: lastne vaje v slogu kolokvija (teorija in računske).
   Naloge so napisane na novo (lastna formulacija, novi primeri in številke); rešitve so preračunane. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });

const teorija = [
  Q('Ko se podražijo tiskalniki, trgovci opazijo, da se krivulja povpraševanja po kartušah premakne v levo. Kakšni dobrini sta tiskalnik in kartuša?', [
    'Komplementa', 'Substituta', 'Neodvisni dobrini', 'Kartuša je Giffenova dobrina'], 0,
    'Dražji tiskalnik → manj kupljenih tiskalnikov → manj povpraševanja po kartušah, ki se uporabljajo skupaj s tiskalnikom. Pri substitutih bi se povpraševanje premaknilo desno.'),
  Q('Dobrina se poceni. Pri kateri vrsti dobrine sam UČINEK DOHODKA (brez učinka substitucije) poveča kupljeno količino?', [
    'Pri normalni dobrini',
    'Pri vsaki dobrini, ker se realni dohodek poveča',
    'Samo pri inferiorni dobrini',
    'Samo pri Giffenovi dobrini'], 0,
    'Nižja cena poveča realni dohodek. Pri normalni dobrini to poveča potrošnjo, pri inferiorni (in Giffenovi) jo zmanjša.'),
  Q('Podražijo se vstopnice za fitnes, ki ga Luka redno obiskuje. Kaj se zgodi z njegovim potrošniškim presežkom in koristnostjo?', [
    'Zmanjšata se oba',
    'Presežek se zmanjša, koristnost ostane enaka',
    'Presežek se poveča, koristnost se zmanjša',
    'Presežek ostane enak, zmanjša se le koristnost'], 0,
    'Višja cena zmanjša ploščino pod krivuljo povpraševanja nad ceno (presežek), premica cene se zasuka navznoter in potrošnik pride na nižjo indiferenčno krivuljo.'),
  Q('Cenovna elastičnost povpraševanja po cigaretah je −0,3. Država zviša trošarino in cena cigaret zraste. Kaj se zgodi s skupnimi izdatki kupcev za cigarete?', [
    'Povečajo se, ker je povpraševanje neelastično',
    'Povečajo se, ker je povpraševanje elastično',
    'Zmanjšajo se, ker je povpraševanje elastično',
    'Zmanjšajo se, ker je povpraševanje neelastično'], 0,
    '|E| = 0,3 < 1: količina pade za manjši odstotek, kot cena zraste, zato izdatki (= prihodki prodajalcev P · Q) narastejo.'),
  Q('Suša zmanjša pridelek krompirja, hkrati pa zaradi priljubljenosti domače hrane naraste povpraševanje po njem. Kaj lahko zanesljivo sklepamo o ravnotežju?', [
    'Cena zraste, sprememba količine je nedoločena',
    'Cena zraste, ravnotežna količina se zagotovo zmanjša',
    'Cena pade, ravnotežna količina se zagotovo poveča',
    'Cena je nedoločena, količina se zmanjša'], 0,
    'Ponudba levo (P↑, Q↓), povpraševanje desno (P↑, Q↑). Oba premika dvigneta ceno; vpliv na količino je odvisen od velikosti premikov.'),
  Q('Ko se podražijo vlakovne vozovnice, več ljudi potuje z avtobusom. Kakšni dobrini sta to in kakšen je predznak križne elastičnosti?', [
    'Nadomestka (substituta) s pozitivno križno elastičnostjo',
    'Dopolnili (komplementa) z negativno križno elastičnostjo',
    'Nadomestka (substituta) z negativno križno elastičnostjo',
    'Nepovezani dobrini s križno elastičnostjo blizu 0'], 0,
    'Dražji vlak → več povpraševanja po avtobusu: cena ene in količina druge se gibljeta v isto smer, E_križna > 0.'),
  Q('Za padajočo premico povpraševanja Q = a − bP velja:', [
    'Naklon je povsod enak, elastičnost pa se spreminja',
    'Elastičnost je povsod enaka, naklon pa se spreminja',
    'Naklon in elastičnost sta povsod enaka',
    'Spreminjata se naklon in elastičnost'], 0,
    'Naklon premice je konstanten, E = (ΔQ/ΔP) · P/Q pa se spreminja z razmerjem P/Q: v zgornjem delu je povpraševanje elastično, v spodnjem neelastično.'),
  Q('Kaj se dogaja z MRS, ko se pomikamo navzdol po običajni konveksni indiferenčni krivulji (več X, manj Y)?', [
    'MRS pada, ker se z njo spreminja tudi naklon krivulje',
    'MRS ostaja enaka, spreminja se le naklon krivulje',
    'MRS raste, naklon krivulje pa ostaja enak',
    'MRS in naklon krivulje sta konstantna'], 0,
    'MRS je absolutna vrednost naklona indiferenčne krivulje, zato se spreminjata skupaj. Pri konveksni krivulji je potrošnik pripravljen za dodatni X dati vse manj Y (padajoča MRS). Konstantna je le pri popolnih substitutih.'),
  Q('Kaj dobimo, če povežemo optimalne košarice, ko se spreminja le dohodek, cene pa ostanejo enake?', [
    'Dohodkovno-potrošno krivuljo (ICC), iz katere izpeljemo Engelovo krivuljo',
    'Cenovno-potrošno krivuljo (PCC), iz katere izpeljemo krivuljo povpraševanja',
    'Krivuljo povpraševanja po dobrini X',
    'Indiferenčno krivuljo z največjo koristnostjo'], 0,
    'Vzporedni premiki premice cene (sprememba dohodka) dajo ICC in iz nje Engelovo krivuljo. Vrtenje premice cene (sprememba cene) da PCC in iz nje krivuljo povpraševanja.'),
  Q('Pri katerih preferencah ležijo vse optimalne košarice - ne glede na to, ali se spremeni cena ali dohodek - na istem žarku iz izhodišča?', [
    'Pri popolnih komplementih',
    'Pri popolnih substitutih',
    'Pri Cobb-Douglasovih preferencah',
    'Pri inferiornih dobrinah'], 0,
    'Pri popolnih komplementih je optimum vedno v oglišču L-krivulje, oglišča pa ležijo na žarku z razmerjem porabe (PCC = ICC). Pri Cobb-Douglasu je žarek le ICC; ob spremembi cene X ostane količina Y enaka (vodoravna PCC).'),
  Q('Ana ima na x osi ure teka, na y osi ure kolesarjenja. Za dodatno uro teka se je pripravljena odpovedati 4 uram kolesarjenja. Kakšna je njena indiferenčna krivulja v tej točki?', [
    'Strma, naklon je −4',
    'Položna, naklon je −1/4',
    'Vodoravna, ker je MRS konstantna',
    'Ne vemo, ker ne poznamo cen obeh dejavnosti'], 0,
    'Naklon = −ΔY/ΔX = −4 kolesarjenja / 1 tek = −4 → strma krivulja. Cene za naklon indiferenčne krivulje niso potrebne.'),
  Q('Ana ima zdaj na x osi ure kolesarjenja, na y osi ure teka. Za dodatno uro teka se še vedno odpove 4 uram kolesarjenja. Kakšna je indiferenčna krivulja v tej točki?', [
    'Položna, naklon je −1/4',
    'Strma, naklon je −4',
    'Strma, naklon je −1/4',
    'Ne vemo, ker ne poznamo cen obeh dejavnosti'], 0,
    'Tek je na y osi: −ΔY/ΔX = 1 ura teka / 4 ure kolesarjenja = 1/4 → položna krivulja. Ista menjalna pripravljenost je videti drugače, ko zamenjamo osi.'),
  Q('Cena instant rezancev (inferiorna dobrina, ki ni Giffenova) se zviša. Kaj velja za učinke na kupljeno količino?', [
    'Substitucija jo zmanjša, dohodek poveča, skupno se zmanjša',
    'Oba učinka jo zmanjšata, skupno zagotovo pade',
    'Substitucija jo poveča, dohodek zmanjša, skupno naraste',
    'Substitucija jo zmanjša, dohodek poveča, skupno vedno naraste'], 0,
    'Učinek substitucije je vedno nasproten spremembi cene (dražje → manj). Nižji realni dohodek pri inferiorni dobrini potrošnjo POVEČA. Ker dobrina ni Giffenova, prevlada substitucija in količina pade.'),
  Q('Dohodkovna elastičnost povpraševanja po mestnem avtobusu je −0,6. Kakšen je naklon Engelove krivulje?', [
    'Krivulja pada: bogatejši se z avtobusom vozijo manj',
    'Krivulja raste: bogatejši se z avtobusom vozijo več',
    'Krivulja je navpična: vožnje niso odvisne od dohodka',
    'Krivulja raste vse hitreje, ker gre za luksuzno dobrino'], 0,
    'Engelova krivulja kaže kupljeno količino pri različnih dohodkih. E_M < 0 pomeni inferiorno dobrino, zato krivulja pada.'),
  Q('Petri se podražijo kino vstopnice, njen dohodek in druge cene ostanejo enaki. Dohodkovna elastičnost po kinu je 0,8. Kaj velja?', [
    'Oba učinka, substitucije in dohodka, zmanjšata obiske kina',
    'Substitucija zmanjša, dohodek pa poveča obiske kina',
    'Substitucija poveča, dohodek pa zmanjša obiske kina',
    'Učinka dohodka ni, ker se nominalni dohodek ne spremeni'], 0,
    'E_M = 0,8 > 0 → normalna dobrina. Podražitev zniža REALNI dohodek, zato pri normalni dobrini oba učinka delujeta v isto smer.'),
  Q('Država proizvaja sir in jogurt; vsi proizvodni dejavniki so pri obeh izdelkih enako produktivni. Kakšna je transformacijska krivulja?', [
    'Ravna črta, ker vsak dodatni jogurt stane enako sira',
    'Izbočena navzven, ker vsak dodatni jogurt stane vse več sira',
    'Vbočena proti izhodišču, ker dodatni jogurt stane vse manj sira',
    'Pravokotna, ker se dejavnikov ne da prerazporediti'], 0,
    'Izbočenost transformacijske krivulje izhaja iz specializiranosti dejavnikov. Če so dejavniki povsod enako produktivni, je oportunitetni strošek stalen in krivulja je premica.'),
  Q('Del gradbenih delavcev se izseli, nova programska oprema pa poveča produktivnost v proizvodnji računalnikov. Kaj se zgodi s transformacijsko krivuljo (stanovanja, računalniki)?', [
    'Na osi računalnikov se premakne navzven, na osi stanovanj navznoter',
    'Celotna krivulja se vzporedno premakne navzven',
    'Na osi stanovanj se premakne navzven, na osi računalnikov navznoter',
    'Celotna krivulja se vzporedno premakne navznoter'], 0,
    'Vsak sektorski šok premakne le "svoje" presečišče: največja možna količina računalnikov zraste, največja količina stanovanj pade, krivulja se zasuka.'),
  Q('Trg medu: bolezen čebel zmanjša število panjev, zdravniki pa priporočajo med namesto sladkorja. Kaj se zgodi?', [
    'Cena medu zraste, vpliv na količino ni določen',
    'Cena in količina medu zagotovo zrasteta',
    'Cena medu zraste, količina se zagotovo zmanjša',
    'Cena medu pade, količina se zagotovo poveča'], 0,
    'Ponudba levo, povpraševanje desno → cena zagotovo zraste, količina je odvisna od velikosti premikov. Med in sladkor sta substituta (E_križna > 0).'),
  Q('Pivo in vino sta substituta. Država zviša trošarino na pivo (plačajo jo proizvajalci), slaba letina ječmena pa podraži proizvodnjo piva. Kaj se zgodi na trgu VINA?', [
    'Povpraševanje po vinu se premakne desno, cena in količina vina zrasteta',
    'Ponudba vina se premakne levo, cena zraste, količina pade',
    'Povpraševanje po vinu se premakne levo, cena in količina padeta',
    'Na trgu vina se nič ne spremeni, saj oba šoka zadeneta le pivo'], 0,
    'Na trgu piva se ponudba dvakrat premakne levo, pivo se podraži. Kupci preidejo na substitut, zato povpraševanje po vinu naraste (desno): cena in količina vina zrasteta.'),
  Q('Kolo in skiro sta substituta. Država proizvajalcem skirojev izplača subvencijo za vsak prodani skiro. Kaj se zgodi na trgu KOLES?', [
    'Povpraševanje po kolesih se premakne levo, cena in količina padeta',
    'Ponudba koles se premakne desno, cena pade, količina zraste',
    'Povpraševanje po kolesih se premakne desno, cena in količina zrasteta',
    'Ponudba koles se premakne levo, cena zraste, količina pade'], 0,
    'Subvencija premakne ponudbo skirojev desno, skiro se poceni. Del kupcev preide s kolesa na skiro, zato se povpraševanje po kolesih zmanjša (levo).'),
];

const racunske = [
  C('Lana ima 84 €, kava stane 2 €. Prvih 12 kosov peciva stane 4 € na kos, vsak nadaljnji 2 €. Katera trditev drži?', [
    'Pri 15 kosih je oportunitetni strošek dodatnega kosa 1 kava',
    'Pri 6 kosih je oportunitetni strošek dodatnega kosa 1/2 kave',
    'Pri 14 kosih je oportunitetni strošek dodatnega kosa 2 kavi',
    'Če kupuje samo pecivo, ga lahko kupi največ 21 kosov'], 0,
    'Do 12 kosov: 4 € / 2 € = 2 kavi na kos. Nad 12: 2 € / 2 € = 1 kava. Samo pecivo: 12 · 4 = 48 €, ostane 36 € → še 18 kosov, skupaj 30 (ne 84 / 4 = 21).'),
  C('Miha k vsakemu sendviču vedno popije tri skodelice čaja. Ima 120 €, sendvič stane 4 €, čaj 2 €. Koliko sendvičev kupi v ravnotežju?', [
    '12', '30', '20', '36'], 0,
    'Popolna komplementa: "paket" 1 sendvič + 3 čaji stane 4 + 3 · 2 = 10 €. 120 / 10 = 12 sendvičev (in 36 čajev).'),
  C('Miha (1 sendvič + 3 čaji, popolna komplementa) ima še vedno 120 €, podraži pa se čaj. Kaj velja?', [
    'Zmanjšata se njegov potrošniški presežek in zadovoljstvo',
    'Presežek se zmanjša, zadovoljstvo ostane enako, ker razmerje 1 : 3 ostane',
    'Zmanjša se le poraba čaja, sendvičev kupi enako',
    'Nič se ne spremeni, ker se sendvič ni podražil'], 0,
    'Dražji čaj podraži celoten paket → manj paketov (manj sendvičev IN čaja) → nižja L-krivulja (manj zadovoljstva) in manjši presežek.'),
  C('Prevod ene strani besedila vam vzame 20 minut, ena stran povzetka učbenika pa 1 uro. Koliko je oportunitetni strošek TREH strani prevoda?', [
    '1 stran povzetka', '1/3 strani povzetka', '3 strani povzetka', '9 strani povzetka'], 0,
    '3 strani · 20 min = 60 min. V 60 minutah naredimo 1 stran povzetka (60 min na stran).'),
  C('Stran povzetka vam vzame 15 minut, stran prevoda pa 1,5 ure. Koliko je oportunitetni strošek DVEH strani prevoda?', [
    '12 strani povzetka', '6 strani povzetka', '3 strani povzetka', '1/6 strani povzetka'], 0,
    '2 strani · 1,5 h = 3 h = 180 min. V 180 minutah naredimo 180 / 15 = 12 strani povzetka. (6 je strošek ENE strani prevoda.)'),
  C('U = 2X²Y, Px = 4 €, Py = 8 €, M = 600 €. Katero kombinacijo izbere potrošnik?', [
    'X = 100, Y = 25', 'X = 50, Y = 50', 'X = 75, Y = 37,5', 'X = 150, Y = 0'], 0,
    'MRS = MUx/MUy = 4XY / 2X² = 2Y/X = Px/Py = 0,5 → Y = X/4. 4X + 8 · X/4 = 6X = 600 → X = 100, Y = 25. (Cobb-Douglas: X dobi 2/3, Y 1/3 dohodka; zamenjani deleži dajo 50 in 50.)'),
  C('U = 5A^0,4 B³ (A = obiski kina, B = koncerti). Koliko koncertov se je potrošnik pripravljen odpovedati za dodaten obisk kina (MRS = MU_A / MU_B)?', [
    '(2/15) · B/A', '7,5 · A/B', '(2/15) · A/B', '2A^−0,6 B³'], 0,
    'MU_A = 2A^−0,6 B³, MU_B = 15A^0,4 B². MU_A/MU_B = 2B / (15A) = (2/15) · B/A.'),
  C('U = 5A^0,4 B³. Koliko obiskov kina se je potrošnik pripravljen odpovedati za dodaten koncert (MRS = MU_B / MU_A)?', [
    '7,5 · A/B', '(2/15) · B/A', '7,5 · B/A', '15A^0,4 B²'], 0,
    'MU_B/MU_A = 15A^0,4 B² / (2A^−0,6 B³) = 7,5 · A/B - obratna vrednost prejšnje MRS.'),
  C('Cene v dveh državah: na Hrvaškem stane dobrina A 8 €, dobrina B 12 €; na Madžarskem A 9 €, B 14 €. A merimo na navpični osi, B na vodoravni. V kateri državi ima premica proračuna večji naklon (po absolutni vrednosti) in kaj to pomeni?', [
    'Na Madžarskem; en dodatni A tam terja odpoved manjšemu delu enote B',
    'Na Madžarskem; en dodatni A tam terja odpoved večjemu delu enote B',
    'Na Hrvaškem; en dodatni A tam terja odpoved večjemu delu enote B',
    'Na Hrvaškem; en dodatni A tam terja odpoved manjšemu delu enote B'], 0,
    'Naklon = −PB/PA: Hrvaška −1,5, Madžarska −1,56 → Madžarska bolj strma. Dodatni A stane PA/PB enot B: HU 0,643 < HR 0,667.'),
  C('Tina pije čaj in kakav; za dodaten čaj se je vedno pripravljena odpovedati 1,5 kakava. Ima 120 €, čaj stane 3 €, kakav 1,5 €. Koliko čaja kupi?', [
    '0 (samo 80 kakavov)', '40 (kakava nič)', '20 čajev in 40 kakavov', '24 čajev in 32 kakavov'], 0,
    'Popolna substituta: 1 čaj je vreden 1,5 kakava, stane pa 3 / 1,5 = 2 kakava. MRS 1,5 < Pč/Pk = 2 → kotna rešitev samo s kakavom: 120 / 1,5 = 80.'),
  C('Prevoznik podraži avtobusne vozovnice za 20 % in proda 5 % manj vozovnic. Kako ocenite povpraševanje in kaj se zgodi s prihodkom od vozovnic?', [
    'Neelastično (E = −0,25), prihodki zrastejo',
    'Neelastično (E = −0,25), prihodki padejo',
    'Elastično (E = −4), prihodki padejo',
    'Elastično (E = −4), prihodki zrastejo'], 0,
    'E = −5 % / 20 % = −0,25. |E| < 1 → višja cena poveča TR.'),
  C('Znižanje cene koncertnih vstopnic za 4 % bi povečalo prodajo za 10 %. "Organizator naj ceno zviša, da poveča prihodke." Ali drži?', [
    'Ne - povpraševanje je elastično (E = −2,5), višja cena prihodke zniža',
    'Da - povpraševanje je neelastično (E = −0,4)',
    'Da - povpraševanje je elastično (E = −2,5)',
    'Ne - povpraševanje je neelastično (E = −0,4)'], 0,
    'E = 10 % / (−4 %) = −2,5, |E| > 1 → prihodke poveča nižja cena, višja jih zmanjša.'),
];

module.exports = {
  id: 'mikro',
  parts: [{
    id: 'k1',
    decks: [
      { id: 'mikro-k1-stari', name: 'Vaje v slogu kolokvija', questions: teorija },
      { id: 'mikro-k1-stari-rac', name: 'Računske v slogu kolokvija', calc: true, questions: racunske },
    ],
    appendNotesMd: `
## Kolokvij - teme, ki se ponavljajo
- **Format**: 35 min, 33 točk, kalkulator. Izbirna vprašanja z obveznim izračunom ali sliko, nato daljše naloge s sliko (trg, potrošnikovo ravnotežje).
- **Pogoste teme**: oportunitetni strošek (čas za naloge, cena s popustom nad določeno količino), hkratna sprememba ponudbe IN povpraševanja, cenovna elastičnost in prihodki, popolni komplementi (paket dobrin).
- **Tudi**: MRS iz Cobb-Douglasove funkcije koristnosti, potrošnikovo ravnotežje (delež dohodka = eksponent / vsota eksponentov), strma ali položna indiferenčna krivulja glede na to, kaj je na kateri osi, učinek substitucije in dohodka pri inferiorni dobrini + Engelova krivulja.
- **Pasti**: pri dveh hkratnih premikih je ena spremenljivka nedoločena. Potrošniški presežek in zadovoljstvo se ob podražitvi zmanjšata **oba**. Pri MRS vedno preveri, katera dobrina je na kateri osi.
`,
  }],
};
