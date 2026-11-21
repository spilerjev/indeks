/* Uvod v poslovanje - dodatne računske naloge v slogu izpita (rentabilnost, stroški, kalkulacija, amortizacija, prag).
   Naloge so napisane na novo (lastni primeri in številke); vse rešitve so preračunane. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });

const izpitSlike = [
  withId('q1dj5xbf', C('Povprečna sredstva podjetja so 800.000 EUR, stopnja zadolženosti 50 %, prihodki 600.000 EUR, ROE = 12 %. Koliko sta ekonomičnost in ROA?', [
    'E = 1,09, ROA = 6 %', 'E = 1,09, ROA = 12 %', 'E = 1,12, ROA = 9 %', 'E = 1,05, ROA = 6 %'], 0,
    'Kapital = 50 % × 800.000 = 400.000. Dobiček = 12 % × 400.000 = 48.000. Odhodki = 600.000 − 48.000 = 552.000 → E = 1,09. ROA = 48.000 / 800.000 = 6 %.')),
  withId('q1wb65g6', C('Povprečna sredstva so 800.000 EUR, zadolženost 20 %, prihodki 600.000 EUR, ekonomičnost 1,25. Koliko sta ROA in ROE?', [
    'ROA = 15 %, ROE = 18,75 %', 'ROA = 15 %, ROE = 75 %', 'ROA = 18,75 %, ROE = 15 %', 'ROA = 12 %, ROE = 15 %'], 0,
    'Odhodki = 600.000 / 1,25 = 480.000. Dobiček = 120.000. ROA = 120.000 / 800.000 = 15 %. Kapital = 80 % = 640.000 → ROE = 18,75 %. (75 % dobimo, če dobiček delimo z dolgom 160.000.)')),
  withId('q13qd3ua', C('Povprečna sredstva so 12 mio EUR, 75 % jih je financiranih z lastnimi viri. Prihodki 9 mio, odhodki 8,1 mio EUR. Koliko so ROE, ROA in ekonomičnost?', [
    'ROE = 10 %, ROA = 7,5 %, E = 1,11', 'ROE = 30 %, ROA = 7,5 %, E = 1,11', 'ROE = 10 %, ROA = 10 %, E = 0,90', 'ROE = 7,5 %, ROA = 10 %, E = 1,11'], 0,
    'Dobiček = 0,9 mio. Kapital = 75 % × 12 = 9 mio → ROE = 10 %. ROA = 0,9 / 12 = 7,5 %. E = 9 / 8,1 = 1,11. (30 % = deljeno z dolgom 3 mio.)')),
  withId('qmj7z7z', C('Zmogljivost je 250.000 enot. Pri povečanju proizvodnje s 120.000 na 150.000 enot se celotni stroški povečajo s 4,8 na 6 mio EUR. Koliko sta MC in elastičnost povprečnih stroškov?', [
    'MC = 40 EUR; povprečni stroški so pri tem obsegu stalni (EAC = 0)', 'MC = 40 EUR; povprečni stroški rastejo enako hitro kot obseg (EAC = 1)', 'MC = 50 EUR; povprečni stroški so stalni (EAC = 0)', 'MC = 40 EUR; povprečni stroški padajo enako hitro, kot obseg raste (EAC = −1)'], 0,
    'MC = 1,2 mio / 30.000 = 40 EUR. ETC = (1,2/4,8) / (30/120) = 25 % / 25 % = 1. EAC = ETC − 1 = 0: ob 1 % večjem obsegu AC ostanejo enaki.')),
  withId('q2l7k9a', C('Zmogljivost je 50.000 enot. Pri povečanju z 20.000 na 25.000 enot se celotni stroški povečajo s 500.000 na 575.000 EUR. Koliko so MC, FC in EAC (variabilni stroški so sorazmerni)?', [
    'MC = 15, FC = 200.000, EAC = −0,4', 'MC = 15, FC = 75.000, EAC = −0,4', 'MC = 15, FC = 200.000, EAC = 0,6', 'MC = 23, FC = 0, EAC = 0'], 0,
    'MC = 75.000 / 5.000 = 15. FC = 500.000 − 15 × 20.000 = 200.000. ETC = 15 % / 25 % = 0,6 → EAC = −0,4: ob 1 % večjem obsegu AC padejo za 0,4 %.')),
  withId('q7j3ptu', C('Podjetje ima MC = 15 EUR in FC = 200.000 EUR, variabilni stroški so sorazmerni na celotnem intervalu. Koliko so celotni stroški pri 32.000 enotah?', [
    '680.000 EUR', '480.000 EUR', '880.000 EUR', '640.000 EUR'], 0,
    'TC = FC + MC × Q = 200.000 + 15 × 32.000 = 680.000 EUR. (480.000 so le variabilni stroški.)')),
  withId('qfmbtw2', C('Elastičnost produkta glede na kapital je 0,3, MPL = 36, APL = 40. Koliko sta elastičnost produkcijske funkcije in EAC?', [
    'Naraščajoči donosi (e = 1,2), AC ob 1 % večjem obsegu padejo za 0,17 %', 'Naraščajoči donosi (e = 1,2), AC ob 1 % večjem obsegu zrastejo za 0,2 %', 'Padajoči donosi (e = 0,6), AC zrastejo za 0,67 %', 'Padajoči donosi (e = 0,3), AC zrastejo za 2,3 %'], 0,
    'eL = MPL/APL = 0,9; e = eK + eL = 1,2 → naraščajoči donosi. ETC = 1/e = 0,83, EAC = −0,17: ob 1 % večjem obsegu AC padejo za 0,17 %.')),
  withId('q5f2o13', C('Mizi A (400 kos; delo 9.000, material 11.000 EUR) in B (250 kos; delo 6.000, material 14.000 EUR). Splošni stroški 30.000 EUR se delijo po vseh neposrednih stroških. Kolikšni sta lastni ceni?', [
    'A = 87,50 EUR, B = 140 EUR', 'A = 95 EUR, B = 128 EUR', 'A = 140 EUR, B = 87,50 EUR', 'A = 50 EUR, B = 80 EUR'], 0,
    'Dodatek = 30.000 / 40.000 = 75 %. A: 20.000 + 15.000 = 35.000 / 400 = 87,50. B: 20.000 + 15.000 = 35.000 / 250 = 140. (Ključ po delu da 95 in 128; brez splošnih stroškov 50 in 80.)')),
  withId('q18cuolc', C('Polici A (500 kos; delo 8.000, material 12.000 EUR) in B (200 kos; delo 15.000, material 10.000 EUR). Splošni stroški 36.000 EUR se delijo po vseh neposrednih stroških. Kolikšni sta lastni ceni?', [
    'A = 72 EUR, B = 225 EUR', 'A = 79,27 EUR, B = 206,82 EUR', 'A = 40 EUR, B = 125 EUR', 'A = 90 EUR, B = 180 EUR'], 0,
    'Osnova = vsi neposredni: 20.000 + 25.000 = 45.000 → dodatek 80 %. A: 20.000 + 16.000 = 36.000 / 500 = 72. B: 25.000 + 20.000 = 45.000 / 200 = 225. (79,27 in 206,82 dobiš, če za osnovo napačno vzameš le material.)')),
  withId('qg7d0nq', C('Oprema: nakupna cena 280.000, prevoz 12.000, montaža 8.000 EUR, doba koristnosti 5 let, metoda vsote letnih števil. Kolikšni so letni zneski amortizacije?', [
    '100.000, 80.000, 60.000, 40.000, 20.000', '93.333, 74.667, 56.000, 37.333, 18.667', '60.000 vsako leto', '20.000, 40.000, 60.000, 80.000, 100.000'], 0,
    'Amortizacijska osnova = 280.000 + 12.000 + 8.000 = 300.000 (nabavna vrednost vključuje prevoz in montažo). Vsota let = 15 → 5/15, 4/15, 3/15, 2/15, 1/15. (Druga vrstica je brez prevoza in montaže, tretja linearna metoda.)')),
  withId('q1lwz786', C('Investicija: zemljišče 2,5 mio EUR in zgradba 6 mio EUR (linearno, 25 let). Koliko znaša letna amortizacija zemljišča in zgradbe?', [
    'Zemljišče 0, zgradba 240.000 EUR', 'Zemljišče 100.000, zgradba 240.000 EUR', 'Zemljišče 0, zgradba 340.000 EUR', 'Zemljišče 0, zgradba 600.000 EUR'], 0,
    'Zemljišče se ne obrablja in se ne amortizira. Zgradba: 6 mio / 25 = 240.000 EUR na leto.')),
  withId('qijp1lu', C('Oprema 400.000 + prevoz 30.000 + montaža 50.000 EUR, proizvodna metoda; načrtovana proizvodnja 6.000, 5.000, 4.000, 3.000 in 2.000 kosov. Kolikšna je amortizacija v 1. letu?', [
    '144.000 EUR (24 EUR/kos)', '120.000 EUR (20 EUR/kos)', '96.000 EUR (24 EUR/kos)', '160.000 EUR (26,7 EUR/kos)'], 0,
    'Osnova 480.000 / 20.000 kosov = 24 EUR/kos. 1. leto: 6.000 × 24 = 144.000; nato 120.000, 96.000, 72.000, 48.000. (20 EUR/kos je brez prevoza in montaže; 160.000 bi dala vsota letnih števil.)')),
  withId('q4o5t4b', C('Proizvodna hala stane 3,6 mio EUR in se amortizira linearno v 30 letih. Kolikšna je letna amortizacija?', [
    '120.000 EUR', '60.000 EUR', '360.000 EUR', '180.000 EUR'], 0,
    '3.600.000 / 30 = 120.000 EUR na leto.')),
  withId('q4yw2pu', C('Zmogljivost je 150.000 enot, P = 40 EUR, AVC = 25 EUR, FC = 450.000 EUR. Kje je prag rentabilnosti in kolikšen je poslovni izid pri 70 % izkoriščenosti?', [
    '20 %, dobiček 1.125.000 EUR', '20 %, izguba 450.000 EUR', '30 %, dobiček 1.575.000 EUR', '20 %, dobiček 1.575.000 EUR'], 0,
    'Q = 450.000 / (40 − 25) = 30.000 = 20 %. Pri 70 % = 105.000 enot: kritje 105.000 × 15 = 1.575.000 − FC 450.000 = dobiček 1.125.000 EUR.')),
  withId('qobmvzi', C('Zmogljivost je 40.000 enot, P = 300 EUR, AVC = 240 EUR, FC = 1.800.000 EUR. Pri kateri izkoriščenosti je prag rentabilnosti?', [
    '75 %', '25 %', '60 %', '80 %'], 0,
    'Q = 1.800.000 / (300 − 240) = 30.000. 30.000 / 40.000 = 75 %.')),
  withId('q1drfucd', C('Kmetija prodaja jabolka po 4 EUR/kg (cena je dana). Dodatna ura sezonskega dela stane 30 EUR in prinese 5 kg jabolk. Kmetija posluje z dobičkom (med obema pragoma rentabilnosti). Kaj ji svetujete?', [
    'Naj zmanjša obseg: zadnji kg stane 6 EUR, prinese pa le 4 EUR',
    'Naj poveča obseg: zadnji kg stane 6 EUR, prinese pa le 4 EUR',
    'Naj poveča obseg: zadnji kg stane le 0,17 EUR',
    'Naj ostane pri obsegu, saj posluje z dobičkom'], 0,
    'MC = cena faktorja / MP = 30 / 5 = 6 EUR > P = 4: zadnja enota prinese manj, kot stane. Optimum je pri P = MC, torej pri manjšem obsegu. Lega med pragoma pomeni le, da je dobiček pozitiven.')),
  withId('qsqivte', C('Vrata A, B, C: v letu 1 količine 200/100/50 po 150/250/400 EUR, v letu 2 količine 220/150/40. Ure dela: 5.000 in 6.000. Kakšna je realna sprememba produktivnosti dela?', [
    'Zmanjšala se je za 3,9 %', 'Povečala se je za 15,3 %', 'Zmanjšala se je za 2,4 %', 'Povečala se je za 3,9 %'], 0,
    'Stalne cene leta 1: leto 1 = 75.000 / 5.000 = 15 EUR/h; leto 2 = (33.000 + 37.500 + 16.000) = 86.500 / 6.000 = 14,42 EUR/h. Indeks 96,1. (15,3 % je rast vrednosti proizvodnje brez upoštevanja ur; −2,4 % da seštevanje kosov.)')),
];

module.exports = {
  id: 'uvod',
  parts: [{
    id: 'izpit',
    decks: [{ id: 'uvp-iz-slike', name: 'Računske v slogu izpita (2. sklop)', calc: true, questions: izpitSlike }],
  }],
};
