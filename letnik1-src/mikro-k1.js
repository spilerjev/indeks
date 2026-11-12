/* Mikroekonomija 1 - 1. kolokvij: stari kolokviji (12. 11. 2025, 7. 11. 2022 A in B, 8. 11. 2021 A in B).
   Vir: Neja - dodatno gradivo / Mikroekonomija / Izpiti in kolokviji. Vse rešitve preračunane;
   naloge, ki brez slike ali manjkajoče enačbe niso rešljive, so izpuščene. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });

const teorija = [
  Q('(Kolokvij 2025) Cena dobrine A se poveča, hkrati se krivulja povpraševanja po dobrini B premakne v levo. Kaj lahko sklepamo?', [
    'A in B sta komplementa', 'A in B sta substituta', 'A in B sta neodvisni dobrini', 'B je Giffenova dobrina'], 0,
    'Dražji A → manj kupljenega A → manj povpraševanja po B, ki se uporablja skupaj z A. Pri substitutih bi se povpraševanje po B premaknilo desno.'),
  Q('(Kolokvij 2025, 2022) Katera trditev drži za UČINEK DOHODKA ob znižanju cene (brez učinka substitucije)?', [
    'Večjo potrošnjo povzroči le pri normalnih dobrinah',
    'Večjo potrošnjo povzroči vedno, ne glede na dobrino',
    'Večjo potrošnjo povzroči le pri inferiornih dobrinah',
    'Večjo potrošnjo povzroči le pri Giffenovih dobrinah'], 0,
    'Nižja cena poveča realni dohodek. Pri normalni dobrini to poveča potrošnjo, pri inferiorni (in Giffenovi) jo zmanjša.'),
  Q('(Kolokvij 2025) "Cena kave se je zvišala, zato se bo Tinin potrošniški presežek zmanjšal, njeno zadovoljstvo pa povečalo." Ali trditev drži?', [
    'Ne - zmanjšala se bosta oba, presežek in zadovoljstvo',
    'Da - presežek se zmanjša, zadovoljstvo pa se poveča',
    'Ne - presežek se poveča, zadovoljstvo pa se zmanjša',
    'Ne - presežek ostane enak, zmanjša se le zadovoljstvo'], 0,
    'Višja cena zmanjša trikotnik pod krivuljo povpraševanja nad ceno (presežek), potrošnik pa pride na nižjo indiferenčno krivuljo.'),
  Q('(Kolokvij 2025) Koeficient cenovne elastičnosti povpraševanja po bencinu je −0,4. Kaj se zgodi s celotnimi prihodki, če se cena bencina poveča?', [
    'Povečajo se, ker je povpraševanje neelastično',
    'Povečajo se, ker je povpraševanje elastično',
    'Zmanjšajo se, ker je povpraševanje elastično',
    'Zmanjšajo se, ker je povpraševanje neelastično'], 0,
    '|E| = 0,4 < 1: količina pade za manjši odstotek, kot cena zraste, zato TR = P · Q naraste.'),
  Q('(Kolokvij 2025, 2021) Zmrzal in vroče poletje zmanjšata pridelek jabolk, hkrati pa potrošniki zaradi lokalne hrane raje kupujejo jabolka kot banane. Kaj se zgodi z ravnotežjem?', [
    'Cena zraste, količina se lahko poveča, zmanjša ali ostane enaka',
    'Cena zraste, ravnotežna količina se zagotovo zmanjša',
    'Cena pade, ravnotežna količina se zagotovo poveča',
    'Cena se lahko spremeni v obe smeri, količina se zmanjša'], 0,
    'Ponudba levo (P↑, Q↓), povpraševanje desno (P↑, Q↑). Oba premika dvigneta ceno; vpliv na količino je odvisen od velikosti premikov.'),
  Q('(Kolokvij 2021, 2025) Kakšni dobrini sta jabolko in banana in kakšna je križna elastičnost med njima?', [
    'Substituta, križna elastičnost je pozitivna',
    'Komplementa, križna elastičnost je negativna',
    'Substituta, križna elastičnost je negativna',
    'Neodvisni dobrini, križna elastičnost je 0'], 0,
    'Potrošniki zamenjujejo banane z jabolki: dražja banana → več povpraševanja po jabolkih, E_križna > 0.'),
  Q('(Kolokvij 2022) Vzdolž katerekoli padajoče linearne krivulje povpraševanja:', [
    'Se elastičnost spreminja, naklon je konstanten',
    'Se naklon spreminja, elastičnost je konstantna',
    'Sta elastičnost in naklon oba konstantna',
    'Se spreminjata elastičnost in tudi naklon'], 0,
    'Naklon premice je povsod enak, E = (ΔQ/ΔP) · P/Q pa se spreminja z razmerjem P/Q: zgoraj elastično, spodaj neelastično.'),
  Q('(Kolokvij 2022) Vzdolž običajne konveksne (Cobb-Douglasove) indiferenčne krivulje:', [
    'Se spreminjata MRS in naklon krivulje',
    'Se MRS spreminja, naklon je konstanten',
    'Se naklon spreminja, MRS je konstantna',
    'Sta MRS in naklon krivulje konstantna'], 0,
    'MRS je (absolutna vrednost) naklona indiferenčne krivulje, zato se spreminjata skupaj; pri konveksni krivulji MRS pada. Konstantna je le pri popolnih substitutih.'),
  Q('(Kolokvij 2022) Cena X se spreminja, cena Y ostane enaka. Kaj predstavlja cenovno-potrošna krivulja (PCC) za X?', [
    'Kombinacije X in Y, ki maksimirajo korist pri različnih cenah X',
    'Kombinacije X in Y, ki maksimirajo korist pri različnih dohodkih',
    'Razmerje med ceno X in količino povpraševanja po dobrini Y',
    'Kombinacije X in Y, ki maksimirajo korist pri različnih količinah X'], 0,
    'PCC poveže optimalne točke ob vrtenju premice cene. Iz nje izpeljemo krivuljo povpraševanja po X. Pri spremembi dohodka dobimo ICC (in Engelovo krivuljo).'),
  Q('(Kolokvij 2021) Katera trditev je pravilna?', [
    'Pri popolnih komplementih sta PCC in ICC enaki',
    'Pri popolnih substitutih sta PCC in ICC enaki',
    'Pri popolnoma neelastičnem povpraševanju je potrošniški presežek 0',
    'Učinek substitucije in dohodka vedno delujeta v isto smer'], 0,
    'Pri popolnih komplementih so vse optimalne točke na žarku skozi oglišča L-krivulj, ne glede na to, ali se spremeni cena ali dohodek. Pri inferiornih dobrinah učinka delujeta nasprotno.'),
  Q('(Kolokvij 2021) Janko nanaša torto na x os, bonbone na y os. Njegova MRS bonbonov za dodatno torto je 9. Janko: "Indiferenčna krivulja je tu strma." Metka: "Ne, položna je." Kdo ima prav?', [
    'Janko - za 1 torto se odpove 9 bonbonom, naklon je −9',
    'Metka - naklon je −1/9, zato je krivulja položna',
    'Nihče - oba govorita o mejni koristnosti, ne o MRS',
    'Ne vemo, ker ne poznamo cen torte in bonbonov'], 0,
    'MRS = ΔY/ΔX (y os bonboni, x os torta) = 9 → naklon −9, krivulja je strma. Cene za naklon indiferenčne krivulje niso potrebne.'),
  Q('(Kolokvij 2021) Janko nanaša bonbone na x os, torto na y os. Njegova MRS bonbonov za dodatno torto je 3. Janko: "Indiferenčna krivulja je tu strma." Metka: "Ne, položna je." Kdo ima prav?', [
    'Metka - ena torta (y) je vredna 3 bonbone (x), naklon je −1/3',
    'Janko - za 1 torto se odpove 3 bonbonom, naklon je −3',
    'Nihče - oba govorita o oportunitetnem strošku',
    'Ne vemo, ker ne poznamo cen torte in bonbonov'], 0,
    'Ker je torta na y osi: −ΔY/ΔX = 1 torta / 3 bonboni = 1/3 → položna krivulja. Ista MRS da drugačen videz glede na to, kaj je na kateri osi.'),
  Q('(Kolokvij 2022) Restavracija hitre prehrane (inferiorna dobrina) zniža ceno obroka. Kaj velja za učinke na količino obrokov?', [
    'Substitucija jo poveča, dohodek zmanjša, skupno običajno naraste',
    'Substitucija in dohodek jo povečata, skupno zagotovo naraste',
    'Substitucija jo zmanjša, dohodek poveča, skupno običajno pade',
    'Substitucija jo poveča, dohodek zmanjša, skupno vedno pade'], 0,
    'Učinek substitucije je pri znižanju cene vedno pozitiven. Pri inferiorni dobrini višji realni dohodek zmanjša potrošnjo. Skupno pade le pri Giffenovi dobrini.'),
  Q('(Kolokvij 2022) Kakšen naklon ima Engelova krivulja za inferiorno dobrino?', [
    'Negativen - z višjim dohodkom potrošnja pada',
    'Pozitiven - z višjim dohodkom potrošnja raste',
    'Navpična - potrošnja ni odvisna od dohodka',
    'Pozitiven, a vse strmejši - luksuzna dobrina'], 0,
    'Engelova krivulja prikazuje količino v odvisnosti od dohodka. Inferiorna: dohodkovna elastičnost < 0, krivulja pada.'),
  Q('(Kolokvij 2021) Nejcu se podraži pomarančni sok, dohodek in cena kruha ostaneta enaka. Dohodkovna elastičnost po soku je 1,5. Kaj velja?', [
    'Učinek substitucije in dohodka zmanjšata nakup soka',
    'Učinek substitucije zmanjša, učinek dohodka poveča nakup soka',
    'Učinek substitucije poveča, učinek dohodka zmanjša nakup soka',
    'Učinek dohodka je nič, ker se nominalni dohodek ne spremeni'], 0,
    'E_M = 1,5 > 0 → normalna (luksuzna) dobrina. Podražitev zniža realni dohodek, zato oba učinka delujeta v isto smer.'),
  Q('(Kolokvij 2021) Kapital in delo sta enako učinkovita v proizvodnji masla in mleka. Kakšna je transformacijska krivulja?', [
    'Premica - oportunitetni strošek je konstanten',
    'Konkavna - oportunitetni strošek narašča',
    'Konveksna - oportunitetni strošek pada',
    'Navpična - proizvede se lahko le ena dobrina'], 0,
    'Izbočenost transformacijske krivulje izhaja iz specializiranosti dejavnikov. Če so enako učinkoviti povsod, je oportunitetni strošek stalen.'),
  Q('(Kolokvij 2021) Država izgubi del kmetijskih delavcev (odidejo v Avstrijo), tehnološki napredek pa poveča produktivnost v proizvodnji avtomobilov. Kaj se zgodi s transformacijsko krivuljo (jabolka, avtomobili)?', [
    'Na osi avtomobilov se premakne navzven, na osi jabolk navznoter',
    'Celotna krivulja se vzporedno premakne navzven',
    'Na osi jabolk se premakne navzven, na osi avtomobilov navznoter',
    'Celotna krivulja se vzporedno premakne navznoter'], 0,
    'Vsak sektorski šok premakne le "svoje" presečišče: največja količina avtomobilov zraste, največja količina jabolk pade, krivulja se zasuka.'),
  Q('(Kolokvij 2021) Trg masla: države zaradi podnebja omejijo živinorejo, potrošniki pa namesto margarine raje kupujejo maslo. Kaj se zgodi?', [
    'Cena masla zraste, vpliv na količino ni določen',
    'Cena in količina masla zagotovo zrasteta',
    'Cena masla zraste, količina se zagotovo zmanjša',
    'Cena masla pade, količina se zagotovo poveča'], 0,
    'Ponudba levo, povpraševanje desno → cena zagotovo zraste, količina je odvisna od velikosti premikov. Maslo in margarina sta substituta (E_križna > 0).'),
  Q('(Kolokvij 2022) Kava in čaj sta substituta. Država uvede davek na kavo, ki ga plača potrošnik, poleg tega pravična trgovina zviša stroške proizvodnje kave. Kaj se zgodi na trgu ČAJA?', [
    'Povpraševanje po čaju se premakne desno, cena in količina čaja zrasteta',
    'Ponudba čaja se premakne levo, cena zraste, količina pade',
    'Povpraševanje po čaju se premakne levo, cena in količina padeta',
    'Na trgu čaja se nič ne spremeni, saj davek velja le za kavo'], 0,
    'Na trgu kave: davek potrošniku → povpraševanje levo, višji stroški → ponudba levo; kava je za kupce dražja. Kupci preidejo na substitut, zato povpraševanje po čaju naraste.'),
  Q('(Kolokvij 2022) Sok in ledeni čaj sta substituta. Proizvajalci plačajo takso na vsako plastenko ledenega čaja. Kaj se zgodi na trgu SOKA?', [
    'Povpraševanje po soku se premakne desno, cena in količina soka zrasteta',
    'Ponudba soka se premakne levo, cena soka zraste, količina pade',
    'Povpraševanje po soku se premakne levo, cena in količina padeta',
    'Ponudba soka se premakne desno, cena soka pade, količina zraste'], 0,
    'Taksa premakne ponudbo ledenega čaja levo, ledeni čaj se podraži, kupci preidejo na sok (substitut).'),
];

const racunske = [
  C('(Kolokvij 2025) Anamarija ima 75 €, kava stane 1,5 €. Prvih 20 piškotov stane 3 € na kos, vsak nadaljnji 1,5 €. Katera trditev drži?', [
    'Pri 22 piškotih je oportunitetni strošek dodatnega piškota 1 kava',
    'Pri 10 piškotih je oportunitetni strošek dodatnega piškota 2/5 kave',
    'Pri 21 piškotih je oportunitetni strošek dodatnega piškota 2,5 kave',
    'Če kupuje samo piškote, jih lahko kupi največ 20'], 0,
    'Do 20 piškotov: 3 € / 1,5 € = 2 kavi na piškot. Nad 20: 1,5 € / 1,5 € = 1 kava. Samo piškoti: 20 · 3 = 60 €, ostane 15 € → še 10, skupaj 30 piškotov.'),
  C('(Kolokvij 2025, 2021) Jakob vsak hamburger poplakne z dvema pivoma. Ima 180 €, hamburger stane 6 €, pivo 3 €. Koliko hamburgerjev kupi v ravnotežju?', [
    '15', '10', '12', '30'], 0,
    'Popolna komplementa: "paket" 1 H + 2 P stane 6 + 2 · 3 = 12 €. 180 / 12 = 15 hamburgerjev (in 30 piv).'),
  C('(Kolokvij 2021) Jakob vsak hamburger poplakne z dvema pivoma (popolna komplementa; ima 180 €, hamburger stane 6 €, pivo 3 €). Cena hamburgerja se poveča. "Potrošniški presežek se mu zmanjša, zadovoljstvo pa poveča." Ali trditev drži?', [
    'Ne - zmanjšata se oba, presežek in zadovoljstvo',
    'Da - presežek se zmanjša, zadovoljstvo se poveča',
    'Ne - presežek se poveča, zadovoljstvo se zmanjša',
    'Ne - pri popolnih komplementih se nič ne spremeni'], 0,
    'Dražji paket → manj paketov → nižja L-krivulja (manj zadovoljstva) in manjši presežek pod krivuljo povpraševanja.'),
  C('(Kolokvij 2022 A) Za domačo nalogo iz matematike porabite pol ure, za nalogo iz mikroekonomije dve uri. Koliko je oportunitetni strošek DVEH nalog iz matematike?', [
    '1/2 naloge iz mikroekonomije', '1 naloga iz mikroekonomije', '2 nalogi iz mikroekonomije', '4 naloge iz mikroekonomije'], 0,
    '2 nalogi · 0,5 h = 1 h. V 1 uri naredimo 1/2 naloge iz mikroekonomije (2 h na nalogo).'),
  C('(Kolokvij 2022 B) Za domačo nalogo iz mikroekonomije porabite pol ure, za nalogo iz matematike dve uri. Koliko je oportunitetni strošek DVEH nalog iz matematike?', [
    '8 nalog iz mikroekonomije', '4 naloge iz mikroekonomije', '2 nalogi iz mikroekonomije', '1/2 naloge iz mikroekonomije'], 0,
    '2 nalogi · 2 h = 4 h. V 4 urah naredimo 4 / 0,5 = 8 nalog iz mikroekonomije.'),
  C('(Kolokvij 2022) U = 3XY², Px = 10 €, Py = 5 €, M = 500 €. Katero kombinacijo izbere potrošnik?', [
    'X = 16,7, Y = 66,7', 'X = 33,3, Y = 33,3', 'X = 66,7, Y = 16,7', 'X = 12, Y = 24'], 0,
    'MRS = MUx/MUy = Y²/(2XY) = Y/(2X) = Px/Py = 2 → Y = 4X. 10X + 5 · 4X = 500 → X = 16,7, Y = 66,7. (Cobb-Douglas: X dobi 1/3, Y 2/3 dohodka.)'),
  C('(Kolokvij 2021 B) U = 3F^0,5 M². Koliko je mejna stopnja substitucije obiska McDonaldsa za dodaten obisk fitnesa (MRS_M/F)?', [
    '0,25 M/F', '0,25 F/M', '4 F/M', '6 F^0,5 M'], 0,
    'MUF = 1,5 F^−0,5 M², MUM = 6 F^0,5 M. MRS_M/F = MUF/MUM = 1,5M / (6F) = 0,25 M/F.'),
  C('(Kolokvij 2021 A) U = 3F^0,5 M². Koliko je mejna stopnja substitucije obiska fitnesa za dodaten obisk McDonaldsa (MRS_F/M)?', [
    '4 F/M', 'F/(4M)', '0,25 M/F', '1,5 F^−0,5 M²'], 0,
    'MRS_F/M = MUM/MUF = 6F^0,5 M / (1,5F^−0,5 M²) = 4F/M - obratna vrednost MRS_M/F.'),
  C('(Kolokvij 2021) Slovenija: PA = 10, PB = 20; Avstrija: PA = 12, PB = 23. Dobrina A je na ordinati. Kje je premica cene bolj strma?', [
    'V Sloveniji - oportunitetni strošek dodatnega A je tam nižji',
    'V Sloveniji - oportunitetni strošek dodatnega A je tam višji',
    'V Avstriji - oportunitetni strošek dodatnega A je tam višji',
    'V Avstriji - oportunitetni strošek dodatnega A je tam nižji'], 0,
    'Naklon = −PB/PA: Slovenija −2, Avstrija −1,92 → Slovenija bolj strma. Dodatni A stane PA/PB enot B: SLO 0,5 < AUT 0,52.'),
  C('(Kolokvij 2021) Marjanca troši zelenjavo in sadje, MRS sadja za dodatno zelenjavo je stalno 2. Ima 150 €, zelenjava stane 2 €, sadje 3 €. Koliko zelenjave kupi?', [
    '75 enot (sadja nič)', '50 enot (sadja nič)', '30 enot in 30 enot sadja', '0 enot (samo 50 sadja)'], 0,
    'Popolna substituta: 1 zelenjava = 2 sadja. Zelenjava stane le 2/3 sadja, a je vredna 2 sadji (MRS 2 > Pz/Ps = 0,67) → kotna rešitev, 150 / 2 = 75.'),
  C('(Kolokvij 2022 A) Cena nafte zraste za 15 %, obseg povpraševanja pade za 3 %. Kakšno je povpraševanje in kaj se zgodi s prihodki proizvajalcev?', [
    'Neelastično (E = −0,2), prihodki zrastejo',
    'Neelastično (E = −0,2), prihodki padejo',
    'Elastično (E = −5), prihodki padejo',
    'Elastično (E = −5), prihodki zrastejo'], 0,
    'E = −3 % / 15 % = −0,2. |E| < 1 → višja cena poveča TR.'),
  C('(Kolokvij 2022 B) Dvig cene smuči za 3 % bi znižal prodajo za 15 %. "Podjetje bi moralo ceno znižati, da poveča prihodke." Ali drži?', [
    'Da - povpraševanje je elastično (E = −5)',
    'Ne - povpraševanje je neelastično (E = −0,2)',
    'Ne - povpraševanje je elastično (E = −5)',
    'Da - povpraševanje je neelastično (E = −0,2)'], 0,
    'E = −15 % / 3 % = −5, |E| > 1 → nižja cena poveča količino za več odstotkov in s tem TR.'),
];

module.exports = {
  id: 'mikro',
  parts: [{
    id: 'k1',
    decks: [
      { id: 'mikro-k1-stari', name: 'Stari kolokviji 2021-2025', questions: teorija },
      { id: 'mikro-k1-stari-rac', name: 'Stari kolokviji - računske', calc: true, questions: racunske },
    ],
    appendNotesMd: `
## Stari kolokviji (2021, 2022, 2025) - kaj se ponavlja
- **Format 2025**: 35 min, 33 točk, kalkulator. Izbirna vprašanja (4 točke) z obveznim izračunom ali sliko, nato daljše naloge s sliko (trg, potrošnikovo ravnotežje).
- **Vsako leto**: oportunitetni strošek (domače naloge, piškoti s popustom), sprememba ponudbe IN povpraševanja hkrati (jabolka, maslo, kava/čaj), cenovna elastičnost in prihodki, popolni komplementi (hamburger + 2 piva = 15).
- **Pogosto**: MRS iz U = 3F^0,5 M², Cobb-Douglas ravnotežje (U = 3XY² → X = 16,7, Y = 66,7), Janko in Metka (strma/položna indiferenčna krivulja), učinek substitucije in dohodka za inferiorno dobrino + Engelova krivulja.
- **Pasti**: pri dveh hkratnih premikih je ena spremenljivka nedoločena. Potrošniški presežek in zadovoljstvo se ob podražitvi zmanjšata **oba**. Pri MRS vedno preveri, katera dobrina je na kateri osi.
`,
  }],
};
