/* Uvod v poslovanje - računske naloge s fotografij starih izpitov (EF Zapiski / Slike izpitov).
   Naloge, ki so že v zbirki "UVP naloge z izpitov" (uvod.js), so izpuščene. Vse rešitve preračunane -
   študentske rešitve na fotografijah so bile pri amortizaciji, stolih (2. različica) in elastičnosti TC napačne. */
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });

const izpitSlike = [
  C('(Izpit) Povprečna sredstva 200.000 EUR, stopnja zadolženosti 40 %, prihodki 124.000 EUR, ROE = 20 %. Koliko sta ekonomičnost in ROA?', [
    'E = 1,24, ROA = 12 %', 'E = 1,24, ROA = 20 %', 'E = 1,16, ROA = 12 %', 'E = 1,20, ROA = 8 %'], 0,
    'Kapital = 60 % × 200.000 = 120.000. Dobiček = 20 % × 120.000 = 24.000. Odhodki = 124.000 − 24.000 = 100.000 → E = 1,24. ROA = 24.000 / 200.000 = 12 %.'),
  C('(Izpit) Povprečna sredstva 200.000 EUR, zadolženost 40 %, prihodki 124.000 EUR, ekonomičnost 1,2. Koliko sta ROA in ROE?', [
    'ROA = 10,33 %, ROE = 17,22 %', 'ROA = 12 %, ROE = 20 %', 'ROA = 10,33 %, ROE = 25,83 %', 'ROA = 20 %, ROE = 33,3 %'], 0,
    'Odhodki = 124.000 / 1,2 = 103.333. Dobiček = 20.667. ROA = 20.667 / 200.000 = 10,33 %. Kapital = 60 % = 120.000 → ROE = 17,22 %. (25,83 % bi dobil, če bi kapital zamenjal z dolgom.)'),
  C('(Izpit) Povprečna sredstva 20 mio EUR, 40 % jih je financiranih z lastnimi viri. Prihodki 18 mio, odhodki 16 mio EUR. ROE, ROA in ekonomičnost?', [
    'ROE = 25 %, ROA = 10 %, E = 1,125', 'ROE = 16,7 %, ROA = 10 %, E = 1,125', 'ROE = 25 %, ROA = 11,1 %, E = 0,89', 'ROE = 10 %, ROA = 25 %, E = 1,125'], 0,
    'Dobiček = 2 mio. Kapital = 40 % × 20 = 8 mio → ROE = 25 %. ROA = 2/20 = 10 %. E = 18/16 = 1,125. (16,7 % = deljeno z dolgovi 12 mio.)'),
  C('(Izpit) Zmogljivost 300.000 enot. Pri povečanju proizvodnje s 160.000 na 200.000 enot se TC povečajo z 8 na 10 mio EUR. Koliko sta MC in elastičnost povprečnih stroškov?', [
    'MC = 50 EUR, EAC = 0 (AC se ne spreminjajo)', 'MC = 50 EUR, EAC = 1 (AC rastejo sorazmerno)', 'MC = 40 EUR, EAC = 0 (AC se ne spreminjajo)', 'MC = 50 EUR, EAC = −1 (AC padajo sorazmerno)'], 0,
    'MC = 2 mio / 40.000 = 50. ETC = (2/8) / (40/160) = 25 % / 25 % = 1. EAC = ETC − 1 = 0: ob 1 % večjem obsegu ostanejo AC enaki.'),
  C('(Izpit) Zmogljivost 30.000 enot. Pri povečanju s 10.000 na 15.000 enot se TC povečajo s 300.000 na 400.000 EUR. Koliko so MC, FC in EAC?', [
    'MC = 20, FC = 100.000, EAC = −0,33', 'MC = 20, FC = 100.000, EAC = −0,11', 'MC = 20, FC = 200.000, EAC = −0,33', 'MC = 26,7, FC = 0, EAC = 0,67'], 0,
    'MC = 100.000 / 5.000 = 20. FC = 300.000 − 20 × 10.000 = 100.000. ETC = 33,3 % / 50 % = 0,67 → EAC = −0,33: ob 1 % večjem obsegu AC padejo za 0,33 %. (−0,11 je napačen izračun s študentske rešitve.)'),
  C('(Izpit) Isto podjetje (MC = 20, FC = 100.000), variabilni stroški so sorazmerni na celotnem intervalu. Koliko so TC pri 20.000 enotah?', [
    '500.000 EUR', '400.000 EUR', '600.000 EUR', '533.333 EUR'], 0,
    'TC = FC + MC × Q = 100.000 + 20 × 20.000 = 500.000. Ali: 300.000 + 20 × (20.000 − 10.000).'),
  C('(Izpit) Elastičnost produkta glede na kapital je 0,2, MPL = 20, APL = 50. Koliko sta elastičnost produkcijske funkcije in EAC?', [
    'e = 0,6, EAC = 0,67', 'e = 0,6, EAC = −0,4', 'e = 2,7, EAC = −0,63', 'e = 0,4, EAC = 1,5'], 0,
    'eL = MPL/APL = 0,4; e = eK + eL = 0,6 → padajoči donosi. ETC = 1/e = 1,67, EAC = 0,67: ob 1 % večjem obsegu AC zrastejo za 0,67 %.'),
  C('(Izpit) Stola A (500 kos; delo 12.000, material 10.000) in B (300 kos; delo 8.000, material 10.000). Splošni stroški 50.000 EUR po vseh neposrednih stroških. Lastni ceni?', [
    'A = 99 EUR, B = 135 EUR', 'A = 94 EUR, B = 143,33 EUR', 'A = 110 EUR, B = 116,67 EUR', 'A = 54 EUR, B = 60 EUR'], 0,
    'Dodatek = 50.000 / 40.000 = 125 %. A: 22.000 + 27.500 = 49.500 / 500 = 99. B: 18.000 + 22.500 = 40.500 / 300 = 135.'),
  C('(Izpit) Stola A (400 kos; delo 10.000, material 12.000) in B (300 kos; delo 18.000, material 18.000). Splošni stroški 45.000 EUR po vseh neposrednih stroških. Lastni ceni?', [
    'A = 97,67 EUR, B = 213,10 EUR', 'A = 100 EUR, B = 210 EUR', 'A = 81,25 EUR, B = 235 EUR', 'A = 55 EUR, B = 120 EUR'], 0,
    'Osnova = vsi neposredni: 22.000 + 36.000 = 58.000 → dodatek 77,6 %. A: 22.000 + 17.069 = 39.069 / 400 = 97,67. B: 36.000 + 27.931 = 63.931 / 300 = 213,10. (100 in 210 dobiš, če za osnovo napačno vzameš le material.)'),
  C('(Izpit) Oprema: nabavna cena 520.000, transport 10.000, montaža 20.000 EUR, doba koristnosti 4 leta, metoda vsote letnih števil. Letni zneski amortizacije?', [
    '220.000, 165.000, 110.000, 55.000', '208.000, 156.000, 104.000, 52.000', '137.500 vsako leto', '55.000, 110.000, 165.000, 220.000'], 0,
    'Amortizacijska osnova = 520.000 + 10.000 + 20.000 = 550.000 (nabavna vrednost vključuje transport in montažo). Vsota let = 10 → 4/10, 3/10, 2/10, 1/10. (208.000 ... je napaka s študentske rešitve - brez transporta in montaže.)'),
  C('(Izpit) Investicija: zemljišče 4 mio, zgradba 5 mio EUR (linearno, 20 let). Koliko znaša letna amortizacija zemljišča in zgradbe?', [
    'Zemljišče 0, zgradba 250.000 EUR', 'Zemljišče 200.000, zgradba 250.000 EUR', 'Zemljišče 0, zgradba 450.000 EUR', 'Zemljišče 0, zgradba 500.000 EUR'], 0,
    'Zemljišče se ne obrablja in se ne amortizira. Zgradba: 5 mio / 20 = 250.000 na leto.'),
  C('(Izpit) Oprema 500.000 + transport 60.000 + montaža 70.000 EUR, proizvodna metoda; načrtovana proizvodnja 5.000, 4.000, 3.000, 2.000, 1.000 kosov. Amortizacija v 1. letu?', [
    '210.000 EUR (42 EUR/kos)', '110.000 EUR (22 EUR/kos)', '126.000 EUR (42 EUR/kos)', '166.667 EUR (33,3 EUR/kos)'], 0,
    'Osnova 630.000 / 15.000 kosov = 42 EUR/kos. 1. leto: 5.000 × 42 = 210.000; nato 168.000, 126.000, 84.000, 42.000. (Po vsoti letnih števil je 1. leto prav tako 5/15 × 630.000 = 210.000.)'),
  C('(Izpit) Ista investicija: zgradba 4 mio EUR, linearno, 20 let. Letna amortizacija zgradbe?', [
    '200.000 EUR', '100.000 EUR', '400.000 EUR', '300.000 EUR'], 0,
    '4.000.000 / 20 = 200.000 EUR na leto. (100.000 na študentski rešitvi je napačno.)'),
  C('(Izpit) Zmogljivost 200.000 enot, P = 50 EUR, AVC = 30 EUR, FC = 400.000 EUR. Prag rentabilnosti in poslovni izid pri 60 % izkoriščenosti?', [
    '10 %, dobiček 2.000.000 EUR', '10 %, izguba 400.000 EUR', '20 %, dobiček 1.600.000 EUR', '10 %, dobiček 2.400.000 EUR'], 0,
    'Q = 400.000 / (50 − 30) = 20.000 = 10 %. Pri 60 % = 120.000 enot: TR = 6 mio, TC = 0,4 + 3,6 = 4 mio → dobiček 2 mio EUR.'),
  C('(Izpit) Zmogljivost 30.000 enot, P = 500 EUR, AVC = 400 EUR, FC = 2.000.000 EUR. Pri kateri izkoriščenosti je prag rentabilnosti?', [
    '66,7 %', '20 %', '80 %', '50 %'], 0,
    'Q = 2.000.000 / (500 − 400) = 20.000. 20.000 / 30.000 = 66,7 %.'),
  C('(Izpit) Popolni konkurent, en variabilni faktor: MP faktorja je 4 enote, njegova cena 20 EUR, cena produkta 3 EUR. Proizvaja med obema pragoma rentabilnosti. Kaj naj stori?', [
    'Proizvaja preveč - MC = 5 > P = 3, obseg naj zmanjša',
    'Proizvaja premalo - MC = 5 > P = 3, obseg naj poveča',
    'Proizvaja premalo - MC = 0,6 < P = 3, obseg naj poveča',
    'Je v optimumu, ker je med obema pragoma rentabilnosti'], 0,
    'MC = cena faktorja / MP = 20 / 4 = 5 EUR > P = 3: zadnja enota prinese manj, kot stane. Optimum je pri P = MC, torej pri manjšem obsegu.'),
  C('(Izpit) Okna A, B, C: 2018 količine 100/200/300 po 300/400/500 EUR, 2019 količine 250/300/400. Ure dela: 20.000 in 25.000. Realna sprememba produktivnosti dela?', [
    'Povečala se je za 21,5 %', 'Povečala se je za 28,5 %', 'Zmanjšala se je za 21,5 %', 'Povečala se je za 25 %'], 0,
    'Stalne cene 2018: 2018 = 260.000 / 20.000 = 13 EUR/h; 2019 = 395.000 / 25.000 = 15,8 EUR/h. Indeks 121,5. (28,5 % bi dobil s tekočimi cenami 2019 - to ni realna sprememba.)'),
];

module.exports = {
  id: 'uvod',
  parts: [{
    id: 'izpit',
    decks: [{ id: 'uvp-iz-slike', name: 'Računske s fotografij izpitov', calc: true, questions: izpitSlike }],
  }],
};
