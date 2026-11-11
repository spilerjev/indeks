/* Računovodstvo (1. letnik) - kratke računske naloge in deli celostnih primerov s starih izpitov
   (8. 7. 2016 "Funchal", 2. kolokvij "Biševo", Vaje za ponovitev 2022 "Moto"). Vse preračunano;
   študentska rešitev za Mangart (vzvod 1,25) je napačna. Naloge z nejasno osnovo marže so izpuščene. */
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });

const naloge = [
  C('(Izpit 2016) Začetna zaloga 50 proizvodov po 550 €. Proizvedli so 100 proizvodov; celotni stroški 100.000 €, od tega 60.000 € proizvajalnih (metoda proizvajalnih stroškov, FIFO). Končna zaloga 20 proizvodov, cena 1.200 € + DDV. Poslovni izid?', [
    '40.500 €', '80.500 €', '28.500 €', '62.000 €'], 0,
    'Stroškovna cena = 60.000 / 100 = 600. Prodanih 130: FIFO 50 · 550 + 80 · 600 = 75.500. Prihodki 130 · 1.200 = 156.000 (DDV ni prihodek). Neproizvajalni stroški 40.000 gredo v odhodke obdobja. 156.000 − 75.500 − 40.000 = 40.500.'),
  C('(Kolokvij) December: proizvajalni stroški 2.000 €, neproizvajalni 1.600 €, proizvedli 100 proizvodov. Začetna zaloga 250 po 21 €. Prodali 300 po 40 € + DDV (FIFO). Poslovni izid?', [
    '4.150 €', '5.750 €', '2.400 €', '4.250 €'], 0,
    'Stroškovna cena = 2.000 / 100 = 20. FIFO: 250 · 21 + 50 · 20 = 6.250. Prihodki 12.000. 12.000 − 6.250 − 1.600 = 4.150. (5.750 = brez neproizvajalnih stroškov.)'),
  C('(Izpit 2016) Kratkoročna sredstva 20.000 €, dolgoročna 40.000 €, dolgoročni dolgovi 15.000 €, kratkoročni 25.000 €. Kazalnik finančnega vzvoda (dolgovi / kapital)?', [
    '2,0', '0,67', '0,5', '1,6'], 0,
    'Sredstva 60.000 = obveznosti do virov. Dolgovi 40.000 → kapital 20.000. Vzvod = 40.000 / 20.000 = 2. (0,67 = dolgovi / sredstva.)'),
  C('(Kolokvij) Mangart: delež dolgoročnih sredstev 70 %, kratkoročna sredstva 60.000 €, delež dolgov v financiranju 25 %. Kapital in dolgovi?', [
    'Kapital 150.000 €, dolgovi 50.000 €', 'Kapital 140.000 €, dolgovi 60.000 €', 'Kapital 50.000 €, dolgovi 150.000 €', 'Kapital 105.000 €, dolgovi 35.000 €'], 0,
    'Kratkoročna = 30 % → sredstva = 200.000. Dolgovi 25 % = 50.000, kapital 150.000. Vzvod = 0,33 (ne 1,25, kot je v študentski rešitvi).'),
  C('(Izpit 2016) Jezikovna šola: 20 tečajnikov, račun 480 € + 20 % DDV, plačano pred tečajem (januar-junij), prihodke obračunava mesečno. Prihodki za januar in stanje PČR konec januarja?', [
    'Prihodki 1.600 €, PČR 8.000 €', 'Prihodki 9.600 €, PČR 0 €', 'Prihodki 1.920 €, PČR 9.600 €', 'Prihodki 1.600 €, PČR 9.600 €'], 0,
    'Prejeto 11.520 € (9.600 + DDV 1.920). Ob prejemu: kratkoročno odloženi prihodki (PČR) 9.600. Mesečno 9.600 / 6 = 1.600 v prihodke, PČR pade na 8.000.'),
  C('(Kolokvij) Šola plezanja: 60 računov po 400 € + 20 % DDV, plačano vnaprej, tečaj junij-september. Koliko prihodkov prizna vsak mesec?', [
    '6.000 €', '7.200 €', '24.000 €', '4.800 €'], 0,
    '60 · 400 = 24.000 € prihodkov brez DDV, razporejenih na 4 mesece. DDV (4.800) je obveznost do države, ne prihodek.'),
  C('(Izpit 2016) Funchal 1. 1. 2015: proizv. oprema NV 1.400.000 (odpis. 40 %), neproizv. oprema NV 800.000 (25 %), KFN 60.000, material 18.000, nedokončana proizvodnja 75.000, proizvodi 280.000, TRR 230.000, AČR 26.000, dolgoročno posojilo 400.000. Osnovni kapital?', [
    '1.729.000 €', '2.129.000 €', '2.669.000 €', '1.703.000 €'], 0,
    'Sredstva: 840.000 + 600.000 + 60.000 + 18.000 + 75.000 + 280.000 + 230.000 + 26.000 = 2.129.000 (oprema po neodpisani vrednosti). Kapital = sredstva − dolgovi = 1.729.000.'),
  C('(Izpit 2016) Funchal: zaloga 2.000 kg materiala po 9 €, dokup 4.000 kg po 11 € + DDV. V proizvodnjo 3.000 kg po FIFO. Strošek materiala?', [
    '29.000 €', '31.000 €', '33.000 €', '30.000 €'], 0,
    'FIFO: 2.000 · 9 + 1.000 · 11 = 29.000. (31.000 = povprečna cena 10,33; 33.000 = vse po 11.)'),
  C('(Izpit 2016) Funchal proda 1.000 delnic Krke (knjigovodska vrednost 60.000 €) po 65 €/delnico. Kaj nastane?', [
    'Finančni prihodek 5.000 €', 'Poslovni prihodek 65.000 €', 'Finančni prihodek 65.000 €', 'Finančni odhodek 5.000 €'], 0,
    'Prejeto 65.000, iz knjig izločimo 60.000 → razlika 5.000 je finančni prihodek (dobiček pri prodaji finančne naložbe).'),
  C('(Izpit 2016) Nova proizvajalna oprema 30.000 € + montaža 2.000 € (oboje + DDV), preostala vrednost 5.000 €, doba 4 leta, usposobljena 17. 6. 2015. Amortizacija v letu 2015?', [
    '3.375 €', '6.750 €', '4.000 €', '3.938 €'], 0,
    'Amortizacijska osnova = 32.000 − 5.000 = 27.000 / 4 = 6.750 na leto. Amortizira se od 1. 7. (prvi dan naslednjega meseca) → 6/12 = 3.375. (3.938 = 7 mesecev.)'),
  C('(Izpit 2016) Funchal plača anuiteto dolgoročnega posojila 60.000 €, od tega 35.000 € obresti. Kaj velja?', [
    'Finančni odhodek 35.000, posojilo se zmanjša za 25.000', 'Finančni odhodek 60.000, posojilo se zmanjša za 60.000', 'Finančni odhodek 25.000, posojilo se zmanjša za 35.000', 'Izdatek 35.000, posojilo se zmanjša za 60.000'], 0,
    'Celotna anuiteta je izdatek (−60.000 na TRR). Le obresti so odhodek; glavnica (25.000) zmanjša obveznost.'),
  C('(Kolokvij) Biševo: zaloga 500 kg materiala za 100.000 €, dokup 1.500 kg po 240 € + DDV. V proizvodnjo 1.200 kg po metodi povprečnih cen. Strošek materiala?', [
    '276.000 €', '288.000 €', '240.000 €', '268.000 €'], 0,
    'Povprečna cena = (100.000 + 360.000) / 2.000 kg = 230 €/kg. 1.200 · 230 = 276.000. (288.000 = vse po 240, 268.000 = FIFO.)'),
  C('(Kolokvij) Biševo: 400 delnic X za 80.000 €; proda 300 delnic po 170 €. Kaj nastane?', [
    'Finančni odhodek 9.000 €', 'Finančni prihodek 51.000 €', 'Finančni prihodek 9.000 €', 'Finančni odhodek 29.000 €'], 0,
    'Knjigovodska vrednost 300 delnic = 300 · 200 = 60.000. Prejeto 51.000 → izguba 9.000 je finančni odhodek.'),
  C('(Kolokvij) Biševo: proizvajalna oprema NV 1.200.000 €, preostala vrednost 40.000 €; neproizvajalna NV 1.600.000 €, preostala 0. Doba 5 let. Letna amortizacija?', [
    'Proizvajalna 232.000, neproizvajalna 320.000', 'Proizvajalna 240.000, neproizvajalna 320.000', 'Proizvajalna 96.000, neproizvajalna 192.000', 'Proizvajalna 232.000, neproizvajalna 192.000'], 0,
    'Amortizacijska osnova = NV − preostala vrednost: (1.200.000 − 40.000) / 5 = 232.000; 1.600.000 / 5 = 320.000. Stroj, usposobljen 20. 12., se začne amortizirati šele 1. 1.'),
  C('(Vaje 2022) Moto 1. 1. 2017: zemljišče 300.000, proizv. oprema NV 200.000 (odpis. 20 %), neproizv. oprema NV 150.000 (40 %), material 16.000, nedokončana 6.000, proizvodi 10.000, DFN 40.000, TRR 24.000; dolgoročno posojilo 250.000, PČR 4.000. Osnovni kapital?', [
    '392.000 €', '396.000 €', '646.000 €', '502.000 €'], 0,
    'Sredstva: 300.000 + 160.000 + 90.000 + 16.000 + 6.000 + 10.000 + 40.000 + 24.000 = 646.000. Kapital = 646.000 − 250.000 − 4.000 = 392.000. Zemljišče se ne amortizira.'),
  C('(Vaje 2022) Moto: zaloga 8.000 enot materiala za 16.000 €, dokup 9.000 enot po 2,5 € + DDV. V proizvodnjo 14.000 enot po FIFO. Strošek materiala?', [
    '31.000 €', '35.000 €', '31.706 €', '28.000 €'], 0,
    'FIFO: 8.000 · 2 + 6.000 · 2,5 = 16.000 + 15.000 = 31.000. (31.706 = povprečna cena 2,26 €.)'),
  C('(Vaje 2022) Moto plača anuiteto 20.000 € (obresti so četrtina) in proda 300 od 400 delnic A (vrednost 40.000 €) po 160 €. Finančni prihodki in odhodki?', [
    'Prihodek 18.000 €, odhodek 5.000 €', 'Prihodek 48.000 €, odhodek 20.000 €', 'Prihodek 8.000 €, odhodek 15.000 €', 'Prihodek 18.000 €, odhodek 20.000 €'], 0,
    'Delnice: 300 · 160 = 48.000 − 300 · 100 = 18.000 prihodka. Anuiteta: obresti 5.000 = finančni odhodek, glavnica 15.000 zmanjša posojilo.'),
];

module.exports = {
  id: 'rac',
  parts: [{ id: 'izpit', decks: [{ id: 'rac-stari', name: 'Računske s starih izpitov', calc: true, questions: naloge }] }],
};
