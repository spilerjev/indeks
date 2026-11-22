/* Osnove statistike (1. letnik) - dodatki: računski komplet o frekvenčnih porazdelitvah, kvantilih, variabilnosti
   in koncentraciji (k1) ter kartice za indekse (k2) in statistični sistem s prebivalstvom (izpit).
   Lastni scenariji in številke; vse rešitve preračuna stat-check.js. Peta možnost je fiksno zadnja. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });
const cards = (arr) => arr.map(([front, back]) => ({ front, back }));
const N5 = 'Noben od navedenih odgovorov ni pravilen';

// Porazdelitev A: čas vožnje na delo (min) za 175 zaposlenih
const TA = 'Čas vožnje na delo 175 zaposlenih (min): 0-10: 24, 10-20: 40, 20-30: 38, 30-50: 52, 50-80: 21.';
// Porazdelitev B: mesečni stroški mobilne telefonije (€) za 200 uporabnikov
const TB = 'Mesečni stroški mobilne telefonije 200 uporabnikov (€): 0-10: 20, 10-20: 50, 20-30: 64, 30-40: 40, 40-60: 26.';

const porazdelitve = [
  C(TA + ' Kolikšni so širina, sredina in gostota frekvence razreda 30-50?', [
    'i = 20, sredina 40, gostota 2,6 na minuto',
    'i = 20, sredina 40, gostota 5,2 na minuto',
    'i = 20, sredina 35, gostota 2,6 na minuto',
    'i = 50, sredina 40, gostota 1,0 na minuto',
    N5], 0,
    'Širina = 50 - 30 = 20 min, sredina = (30 + 50) / 2 = 40 min, gostota = f / i = 52 / 20 = 2,6 zaposlenega na minuto. Gostota 5,2 nastane z deljenjem s 10, kot da bi bili vsi razredi enako široki.'),

  C(TA + ' Kolikšna je mediana (z linearno interpolacijo v razredu)?', [
    '25,0 min', '36,7 min', '26,2 min', '29,2 min', N5], 2,
    'P·N = 0,5 · 175 = 87,5. Kumulativa: 24, 64, 102 → mediana je v razredu 20-30. Me = 20 + (87,5 - 64) / 38 · 10 = 26,2 min. 29,2 min je aritmetična sredina, 25,0 le sredina razreda.'),

  C(TB + ' Kolikšen je prvi kvartil Q₁?', [
    '15,0 €', '16,0 €', '20,0 €', '34,0 €', N5], 1,
    'P·N = 0,25 · 200 = 50. Kumulativa: 20, 70 → Q₁ je v razredu 10-20. Q₁ = 10 + (50 - 20) / 50 · 10 = 16,0 €. 20,0 € nastane, če ne odštejemo 20 enot pred razredom, 34,0 € je Q₃.'),

  C(TB + ' Kolikšen je kvartilni razmik?', [
    '60,0 €', '9,0 €', '20,0 €', '18,0 €', N5], 3,
    'Q₁ = 10 + (50 - 20) / 50 · 10 = 16,0 €. Q₃: 0,75 · 200 = 150, kumulativa do 30 € je 134 → Q₃ = 30 + (150 - 134) / 40 · 10 = 34,0 €. KR = 34,0 - 16,0 = 18,0 €. 9,0 € je kvartilni odklon (polovica razmika), 20,0 € razlika sredin razredov.'),

  C(TB + ' Nad katerim zneskom so stroški 10 % uporabnikov z najvišjimi stroški (deveti decil)?', [
    '44,6 €', '42,3 €', '50,0 €', '60,0 €', N5], 0,
    'P·N = 0,9 · 200 = 180, kumulativa do 40 € je 174 → D₉ je v razredu 40-60 (širina 20). D₉ = 40 + (180 - 174) / 26 · 20 = 44,6 €. 42,3 € nastane, če vzamemo širino 10 kot pri drugih razredih.'),

  C(TB + ' Kolikšen delež uporabnikov ima stroške kvečjemu 25 € (kvantilni rang P vrednosti 25 €)?', [
    '35 %', '67 %', '51 %', '32 %', N5], 2,
    'Do 20 € je 70 uporabnikov, 25 € je na polovici razreda 20-30, zato dodamo 0,5 · 64 = 32. F(25) = 102, P = 102 / 200 = 0,51 → 51 %. 35 % upošteva le razrede do 20 €, 67 % ves razred 20-30.'),

  C('Točke 9 kandidatov na sprejemnem preizkusu: 14, 9, 17, 12, 17, 20, 11, 17, 15. Kolikšen rang ima vrednost 17 v ranžirni vrsti, urejeni od najmanjše do največje vrednosti?', [
    '6', '8', '21', '9', N5], 4,
    'Ranžirna vrsta: 9, 11, 12, 14, 15, 17, 17, 17, 20. Vrednost 17 zaseda 6., 7. in 8. mesto, enake vrednosti dobijo povprečni rang (6 + 7 + 8) / 3 = 7. Pravilnega ranga 7 ni med navedenimi.'),

  C('Mesečna prodaja 12 trgovin (tisoč €): 42, 18, 35, 27, 51, 23, 30, 64, 38, 25, 46, 33. Kolikšen je kvartilni razmik, če kvartil določimo z rangom R = P·N + 0,5?', [
    '46 tisoč €', '18 tisoč €', '34 tisoč €', '9 tisoč €', N5], 1,
    'Ranžirna vrsta: 18, 23, 25, 27, 30, 33, 35, 38, 42, 46, 51, 64. Q₁: R = 3,5 → (25 + 27) / 2 = 26. Q₃: R = 9,5 → (42 + 46) / 2 = 44. KR = 44 - 26 = 18 tisoč €. 46 tisoč € je variacijski razmik, 34 tisoč € mediana.'),

  C('Čakalni čas 8 pacientov v ambulanti (min): 12, 7, 15, 9, 20, 11, 6, 16. Kolikšna je varianca, če paciente obravnavamo kot populacijo?', [
    '22,9 min²', '4,5 min²', '160,0 min²', '20,0 min²', N5], 3,
    'AS = 96 / 8 = 12. Kvadrati odklonov: 0, 25, 9, 9, 64, 1, 36, 16, vsota 160. σ² = 160 / 8 = 20,0 min². 22,9 nastane z deljenjem s 7, 4,5 je standardni odklon.'),

  C('Število otrok v 25 gospodinjstvih: 0 otrok: 2, 1 otrok: 6, 2 otroka: 9, 3 otroci: 6, 4 otroci: 2. Kolikšen je standardni odklon?', [
    '1,06', '1,12', '2,26', '0,53', N5], 0,
    'AS = 50 / 25 = 2,0. Σf·x² = 128, povprečje kvadratov = 128 / 25 = 5,12. σ² = 5,12 - 2,0² = 1,12, σ = √1,12 = 1,06 otroka. 1,12 je varianca, 2,26 = √5,12 (brez odštetja AS²).'),

  C('Za 20 izdelkov velja Σx = 360 in Σx² = 7.200 (x je čas izdelave v minutah). Kolikšen je koeficient variacije?', [
    '200,0 %', '105,4 %', '33,3 %', '6,0 %', N5], 2,
    'AS = 360 / 20 = 18. σ² = 7.200 / 20 - 18² = 360 - 324 = 36, σ = 6 min. KV = 6 / 18 · 100 = 33,3 %. 200,0 % = σ² / AS, 105,4 % = √360 / 18 (brez odštetja AS²).'),

  C('V oddelku A je povprečna plača 1.850 € (σ = 296 €), v oddelku B 2.400 € (σ = 360 €). Kaj drži?', [
    'KV_B = 15,0 % in KV_A = 16,0 %, zato so plače v B relativno bolj razpršene',
    'KV_A = 16,0 % in KV_B = 15,0 %, zato so plače v A relativno bolj razpršene',
    'Plače v B so bolj razpršene, ker je σ_B = 360 € večji od σ_A = 296 €',
    'KV_A = 6,25 % in KV_B = 6,67 %, zato so plače v B relativno bolj razpršene',
    N5], 1,
    'KV_A = 296 / 1.850 · 100 = 16,0 %, KV_B = 360 / 2.400 · 100 = 15,0 %. Pri različno visokih sredinah primerjamo relativno mero, zato so plače v A relativno bolj razpršene, čeprav je σ_A manjši.'),

  C('Kumulativni deleži dohodka po kvintilih gospodinjstev (od najrevnejših): 0,06; 0,17; 0,33; 0,57; 1,00. Kolikšen je Ginijev koeficient, če ga izračunamo kot G = 1 - Σ (Pᵢ - Pᵢ₋₁)(Qᵢ + Qᵢ₋₁)?', [
    '0,652', '0,148', '0,574', '0,348', N5], 3,
    'Vsi razredi imajo Pᵢ - Pᵢ₋₁ = 0,2. Vsote sosednjih Q: 0,06 + 0,23 + 0,50 + 0,90 + 1,57 = 3,26. G = 1 - 0,2 · 3,26 = 0,348. 0,652 je površina pod Lorenzovo krivuljo, pomnožena z 2 (pozabljen 1 -).'),

  C('Kumulativni deleži dohodka po kvintilih gospodinjstev (od najrevnejših): 0,06; 0,17; 0,33; 0,57; 1,00. Kolikšno je razmerje S80/S20 (dohodek najbogatejše petine proti najrevnejši petini)?', [
    '16,7', '9,5', '1,8', '7,2', N5], 3,
    'Najbogatejša petina ima 1,00 - 0,57 = 0,43 dohodka, najrevnejša 0,06. S80/S20 = 0,43 / 0,06 = 7,2. 9,5 = 0,57 / 0,06 (kumulativa namesto deleža petine), 16,7 = 1 / 0,06.'),

  C('Gospodinjstva v štirih skupinah (od najnižjega dohodka na člana): deleži gospodinjstev 0,4; 0,3; 0,2; 0,1, deleži dohodka 0,15; 0,25; 0,30; 0,30. Kolikšen je Ginijev koeficient po G = 1 - Σ (Pᵢ - Pᵢ₋₁)(Qᵢ + Qᵢ₋₁)?', [
    '0,615', '0,125', '0,580', '0,160', N5], 4,
    'Kumulativi: P = 0,4; 0,7; 0,9; 1,0 in Q = 0,15; 0,40; 0,70; 1,00. Σ = 0,4 · 0,15 + 0,3 · 0,55 + 0,2 · 1,10 + 0,1 · 1,70 = 0,615, G = 1 - 0,615 = 0,385. Pravilnega rezultata 0,385 ni med navedenimi; 0,125 nastane, če vse skupine štejemo kot enako velike (0,25).'),
];

const indeksiKartice = cards([
  ['Enostavni indeks', 'I = y₁ / y₀ · 100: razmerje dveh vrednosti (dveh obdobij, dveh krajev ali dveh pojavov), izraženo v odstotkih.'],
  ['Kako preberemo indeks 135 in indeks 80?', 'I - 100 pove spremembo v %: 135 → 35 % več, 80 → 20 % manj. I / 100 pove, kolikokrat: 1,35-krat.'],
  ['Časovni, krajevni in stvarni indeks', 'Časovni primerja dve obdobji, krajevni dva kraja, stvarni dva različna pojava (npr. ženske in moške).'],
  ['Bazni in verižni indeks', 'Bazni: vsa obdobja primerjamo s stalno osnovo. Verižni: vsako obdobje primerjamo s predhodnim.'],
  ['Deflacioniranje', 'Realna vrednost = nominalna vrednost / indeks cen · 100. Izloči vpliv spremembe cen.'],
  ['Realni indeks (npr. realne plače)', 'I_real = I_nominalni / I_cen · 100.'],
  ['Indeks vrednosti, cen in količin', 'Iᵥ = Iₚ · I_q / 100: vrednost = cena · količina.'],
  ['Laspeyresov indeks cen', 'Iₚ(L) = Σp₁q₀ / Σp₀q₀ · 100: uteži so količine baznega obdobja.'],
  ['Paaschejev indeks cen', 'Iₚ(P) = Σp₁q₁ / Σp₀q₁ · 100: uteži so količine tekočega obdobja.'],
  ['Fisherjev indeks', 'Geometrijska sredina Laspeyresovega in Paaschejevega: I(F) = √(L · P).'],
  ['Tehtana aritmetična sredina enostavnih indeksov cen', 'Z utežmi baznih vrednosti p₀q₀ je enaka agregatnemu Laspeyresovemu indeksu.'],
  ['Tehtana harmonična sredina enostavnih indeksov cen', 'Z utežmi tekočih vrednosti p₁q₁ je enaka agregatnemu Paaschejevemu indeksu.'],
  ['Križna razčlenitev indeksa vrednosti', 'Iᵥ = Iₚ(L) · I_q(P) / 100 = Iₚ(P) · I_q(L) / 100: en indeks vedno Laspeyres, drugi Paasche.'],
  ['Indeks stalne in spremenljive strukture', 'Stalna struktura: povprečno ceno računamo z baznimi utežmi. Spremenljiva: indeks povprečne cene z dejanskimi (tekočimi) strukturami.'],
  ['Indeks strukturnih premikov', 'I(spremenljiva struktura) / I(stalna struktura) · 100. Pod 100: struktura se je premaknila k cenejšim postavkam in zavrla rast povprečne cene.'],
  ['Agregatni indeksi: prednosti', 'Neposredna ekonomska razlaga (dejanske vrednosti košarice), natančnost, razčlenitev Iᵥ na cenovni in količinski del.'],
  ['Agregatni indeksi: slabosti', 'Potrebne so vse cene in količine v obeh obdobjih; izbira uteži premakne rezultat (Laspeyres rast cen praviloma preceni, Paasche podceni).'],
  ['Srednji indeksi: kdaj so uporabni', 'Ko imamo enostavne indekse in vrednostne uteži, ne pa vseh količin (tako se računa npr. indeks cen življenjskih potrebščin).'],
]);

const sistemKartice = cards([
  ['Evropski statistični sistem (ESS)', 'Mreža statističnih ustanov EU; na vrhu je Eurostat, v Sloveniji je glavni izvajalec državne statistike SURS.'],
  ['NACE, SKD in ISIC', 'Klasifikacije dejavnosti: ISIC (ZN) je osnova za NACE (EU), SKD je slovenska različica NACE.'],
  ['HS, PRODCOM in CPA', 'HS: blago za carinske in zunanjetrgovinske namene. PRODCOM: industrijski proizvodi. CPA: proizvodi, razvrščeni po dejavnosti, iz katere izvirajo.'],
  ['Metapodatki', 'Podatki o podatkih: opis vira, definicij, metode zbiranja in kakovosti.'],
  ['Kako določimo glavno dejavnost enote?', 'Po dejavnosti z največ zaposlenimi, pri več ravneh klasifikacije po metodi od zgoraj navzdol: najprej najvišja raven, nato znotraj nje nižje.'],
  ['Podjetje (pravna enota)', 'Ena enota na pravni subjekt; kriterij je pravni status.'],
  ['Lokalna enota (LE)', 'Podjetje ali njegov del na enem naslovu; število LE = število različnih lokacij, ne glede na dejavnosti.'],
  ['Enota enovrstne dejavnosti (EED)', 'Del podjetja z eno vrsto dejavnosti (eno šifro), ne glede na lokacijo; število EED = število različnih šifer.'],
  ['Lokalna enota enovrstne dejavnosti (LEVED)', 'Ena dejavnost na eni lokaciji; štejemo le dejansko obstoječe pare (naslov, šifra), ne zmnožka lokacij in šifer.'],
  ['Skupni prirastek prebivalstva', 'Naravni prirastek (živorojeni - umrli) + selitveni prirastek (priseljeni - odseljeni).'],
  ['Splošna stopnja natalitete', 'Živorojeni / povprečno število vseh prebivalcev · 1.000.'],
  ['Splošna stopnja fertilnosti', 'Živorojeni / povprečno število žensk, starih 15-49 let · 1.000; vedno večja od stopnje natalitete.'],
  ['Koeficient maskulinitete', 'Število moških na 1.000 žensk; ob rojstvu okoli 1.050.'],
  ['Koeficient starostne odvisnosti', '(prebivalci 0-14 + 65 let in več) / prebivalci 15-64 · 100.'],
  ['Indeks staranja', 'Prebivalci 65 let in več / prebivalci 0-14 · 100; nad 100 je starejših več kot otrok.'],
  ['Linearna in geometrijska napoved prebivalstva', 'Linearna: stalni absolutni prirastek. Geometrijska: stalna stopnja rasti; pri pozitivni rasti da višjo napoved.'],
  ['Produktivnost in intenzivnost', 'Produktivnost = obseg proizvodnje / vložek dela; intenzivnost je njena obratna vrednost (vložek na enoto proizvoda).'],
  ['Pariteta kupne moči (PKM)', 'Menjalno razmerje, ki izenači cene enake košarice med državami; preprost primer je indeks Big Mac.'],
]);

module.exports = {
  id: 'stat',
  parts: [
    { id: 'k1', decks: [{ id: 'st-k1-porazdelitve', name: 'Računske naloge: porazdelitve, kvantili, variabilnost, koncentracija', calc: true, questions: porazdelitve }] },
    { id: 'k2', flashcards: [{ id: 'stat-c-indeksi', name: 'Indeksi in deflacioniranje', cards: indeksiKartice }] },
    { id: 'izpit', flashcards: [{ id: 'stat-c-sistem-preb', name: 'Statistični sistem, enote in prebivalstvo', cards: sistemKartice }] },
  ],
};
