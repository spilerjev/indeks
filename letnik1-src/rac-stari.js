/* Računovodstvo (1. letnik) - kratke računske naloge v slogu izpita (poslovni izid, bilanca, zaloge, amortizacija,
   časovne razmejitve, finančne naložbe). Naloge so napisane na novo z lastnimi podjetji in številkami; vse preračunano. */
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });

const naloge = [
  C('Začetna zaloga 40 proizvodov po 480 €. V obdobju so proizvedli 120 proizvodov; celotni stroški 90.000 €, od tega 60.000 € proizvajalnih (metoda proizvajalnih stroškov, FIFO). Končna zaloga je 30 proizvodov, prodajna cena 1.000 € + DDV. Kolikšen je poslovni izid?', [
    '35.800 €', '65.800 €', '43.300 €', '64.400 €'], 0,
    'Stroškovna cena = 60.000 / 120 = 500. Prodanih 40 + 120 − 30 = 130: FIFO 40 · 480 + 90 · 500 = 64.200. Prihodki 130 · 1.000 = 130.000 (DDV ni prihodek). Neproizvajalni stroški 30.000 so odhodki obdobja. 130.000 − 64.200 − 30.000 = 35.800. (65.800 = brez neproizvajalnih stroškov.)'),
  C('Proizvajalni stroški meseca so 3.000 €, neproizvajalni 1.200 €, proizvedli so 150 proizvodov. Začetna zaloga 200 po 22 €. Prodali so 280 po 35 € + DDV (FIFO). Kolikšen je poslovni izid?', [
    '2.600 €', '3.800 €', '2.680 €', '1.400 €'], 0,
    'Stroškovna cena = 3.000 / 150 = 20. FIFO: 200 · 22 + 80 · 20 = 6.000. Prihodki 280 · 35 = 9.800. 9.800 − 6.000 − 1.200 = 2.600. (3.800 = brez neproizvajalnih stroškov, 2.680 = po povprečnih cenah.)'),
  C('Kratkoročna sredstva 30.000 €, dolgoročna 50.000 €, dolgoročni dolgovi 20.000 €, kratkoročni 28.000 €. Kolikšen je kazalnik finančnega vzvoda (dolgovi / kapital)?', [
    '1,5', '0,6', '0,67', '2,5'], 0,
    'Sredstva 80.000 = obveznosti do virov. Dolgovi 48.000 → kapital 32.000. Vzvod = 48.000 / 32.000 = 1,5. (0,6 = dolgovi / sredstva, 2,5 = sredstva / kapital.)'),
  C('Podjetje Triglav: delež dolgoročnih sredstev 60 %, kratkoročna sredstva 80.000 €, delež dolgov v financiranju 35 %. Koliko sta kapital in dolgovi?', [
    'Kapital 130.000 €, dolgovi 70.000 €', 'Kapital 120.000 €, dolgovi 80.000 €', 'Kapital 70.000 €, dolgovi 130.000 €', 'Kapital 78.000 €, dolgovi 42.000 €'], 0,
    'Kratkoročna sredstva so 40 % → sredstva = 80.000 / 0,4 = 200.000. Dolgovi 35 % = 70.000, kapital 130.000. Vzvod = 70.000 / 130.000 = 0,54.'),
  C('Plesna šola: 15 tečajnikov, račun 360 € + 22 % DDV, plačano pred tečajem (oktober-marec); prihodke obračunava mesečno. Koliko so prihodki za oktober in stanje PČR konec oktobra?', [
    'Prihodki 900 €, PČR 4.500 €', 'Prihodki 5.400 €, PČR 0 €', 'Prihodki 1.098 €, PČR 5.490 €', 'Prihodki 900 €, PČR 5.400 €'], 0,
    'Prejeto 6.588 € (5.400 + DDV 1.188). Ob prejemu: kratkoročno odloženi prihodki (PČR) 5.400. Mesečno 5.400 / 6 = 900 v prihodke, PČR pade na 4.500.'),
  C('Šola jadranja izda 40 računov po 500 € + 22 % DDV, plačanih vnaprej, tečaj traja maj-avgust. Koliko prihodkov prizna vsak mesec?', [
    '5.000 €', '6.100 €', '20.000 €', '4.400 €'], 0,
    '40 · 500 = 20.000 € prihodkov brez DDV, razporejenih na 4 mesece. DDV (4.400) je obveznost do države, ne prihodek.'),
  C('Podjetje Lipica 1. 1.: proizvajalna oprema NV 900.000 (odpisanost 30 %), neproizvajalna oprema NV 500.000 (20 %), KFN 40.000, material 25.000, nedokončana proizvodnja 50.000, proizvodi 150.000, TRR 120.000, AČR 15.000, dolgoročno posojilo 300.000. Kolikšen je osnovni kapital?', [
    '1.130.000 €', '1.430.000 €', '1.500.000 €', '1.115.000 €'], 0,
    'Sredstva: 630.000 + 400.000 + 40.000 + 25.000 + 50.000 + 150.000 + 120.000 + 15.000 = 1.430.000 (oprema po neodpisani vrednosti). Kapital = sredstva − dolgovi = 1.130.000. AČR so sredstvo, ne obveznost.'),
  C('Zaloga 3.000 kg materiala po 8 €, dokup 5.000 kg po 10 € + DDV. V proizvodnjo gre 4.500 kg po FIFO. Kolikšen je strošek materiala?', [
    '39.000 €', '41.625 €', '45.000 €', '36.000 €'], 0,
    'FIFO: 3.000 · 8 + 1.500 · 10 = 39.000. (41.625 = povprečna cena 9,25; 45.000 = vse po 10.)'),
  C('Podjetje proda 800 delnic (knjigovodska vrednost 40.000 €) po 58 € za delnico. Kaj nastane?', [
    'Finančni prihodek 6.400 €', 'Poslovni prihodek 46.400 €', 'Finančni prihodek 46.400 €', 'Finančni odhodek 6.400 €'], 0,
    'Prejeto 46.400, iz knjig izločimo 40.000 → razlika 6.400 je finančni prihodek (dobiček pri prodaji finančne naložbe).'),
  C('Nova proizvajalna oprema 24.000 € + montaža 1.500 € (oboje + DDV), preostala vrednost 3.000 €, doba 5 let, usposobljena 10. 9. Kolikšna je amortizacija v tem letu?', [
    '1.125 €', '4.500 €', '1.500 €', '1.275 €'], 0,
    'Amortizacijska osnova = 25.500 − 3.000 = 22.500 / 5 = 4.500 na leto. Amortizira se od 1. 10. (prvi dan naslednjega meseca) → 3/12 = 1.125. (1.500 = 4 meseci, 1.275 = brez preostale vrednosti.)'),
  C('Podjetje plača anuiteto dolgoročnega posojila 45.000 €, od tega 12.000 € obresti. Kaj velja?', [
    'Finančni odhodek 12.000, posojilo se zmanjša za 33.000', 'Finančni odhodek 45.000, posojilo se zmanjša za 45.000', 'Finančni odhodek 33.000, posojilo se zmanjša za 12.000', 'Izdatek 12.000, posojilo se zmanjša za 45.000'], 0,
    'Celotna anuiteta je izdatek (−45.000 na TRR). Le obresti so odhodek; glavnica (33.000) zmanjša obveznost.'),
  C('Zaloga 400 kg materiala za 60.000 €, dokup 1.600 kg po 175 € + DDV. V proizvodnjo gre 1.500 kg po metodi povprečnih cen. Kolikšen je strošek materiala?', [
    '255.000 €', '262.500 €', '252.500 €', '225.000 €'], 0,
    'Povprečna cena = (60.000 + 280.000) / 2.000 kg = 170 €/kg. 1.500 · 170 = 255.000. (262.500 = vse po 175, 252.500 = FIFO.)'),
  C('Podjetje ima 500 delnic X, kupljenih za 90.000 €; proda 200 delnic po 165 €. Kaj nastane?', [
    'Finančni odhodek 3.000 €', 'Finančni prihodek 33.000 €', 'Finančni prihodek 3.000 €', 'Finančni odhodek 57.000 €'], 0,
    'Knjigovodska vrednost 200 delnic = 200 · 180 = 36.000. Prejeto 33.000 → izguba 3.000 je finančni odhodek.'),
  C('Proizvajalna oprema NV 800.000 €, preostala vrednost 50.000 €; neproizvajalna NV 900.000 €, preostala 0. Doba koristnosti 6 let. Kolikšna je letna amortizacija?', [
    'Proizvajalna 125.000, neproizvajalna 150.000', 'Proizvajalna 133.333, neproizvajalna 150.000', 'Proizvajalna 125.000, neproizvajalna 141.667', 'Proizvajalna 150.000, neproizvajalna 125.000'], 0,
    'Amortizacijska osnova = NV − preostala vrednost: (800.000 − 50.000) / 6 = 125.000; 900.000 / 6 = 150.000. Opremo, usposobljeno konec decembra, začnemo amortizirati 1. 1.'),
  C('Podjetje Kolpa 1. 1.: zemljišče 200.000, proizvajalna oprema NV 300.000 (odpisanost 25 %), neproizvajalna oprema NV 100.000 (50 %), material 20.000, nedokončana proizvodnja 8.000, proizvodi 12.000, DFN 30.000, TRR 15.000; dolgoročno posojilo 180.000, PČR 5.000. Kolikšen je osnovni kapital?', [
    '375.000 €', '380.000 €', '560.000 €', '500.000 €'], 0,
    'Sredstva: 200.000 + 225.000 + 50.000 + 20.000 + 8.000 + 12.000 + 30.000 + 15.000 = 560.000. Kapital = 560.000 − 180.000 − 5.000 = 375.000. Zemljišče se ne amortizira; PČR so obveznost.'),
  C('Zaloga 6.000 enot materiala za 18.000 €, dokup 10.000 enot po 3,5 € + DDV. V proizvodnjo gre 11.000 enot po FIFO. Kolikšen je strošek materiala?', [
    '35.500 €', '38.500 €', '36.438 €', '33.000 €'], 0,
    'FIFO: 6.000 · 3 + 5.000 · 3,5 = 18.000 + 17.500 = 35.500. (36.438 = povprečna cena 3,3125 €, 38.500 = vse po 3,5.)'),
  C('Podjetje plača anuiteto 24.000 € (obresti so tretjina) in proda 150 od 250 delnic B (vrednost 30.000 €) po 140 €. Koliko so finančni prihodki in odhodki?', [
    'Prihodek 3.000 €, odhodek 8.000 €', 'Prihodek 21.000 €, odhodek 24.000 €', 'Prihodek 3.000 €, odhodek 24.000 €', 'Prihodek 5.000 €, odhodek 16.000 €'], 0,
    'Delnice: 150 · 140 = 21.000 − 150 · 120 = 18.000 → prihodek 3.000. Anuiteta: obresti 8.000 = finančni odhodek, glavnica 16.000 zmanjša posojilo.'),
];

module.exports = {
  id: 'rac',
  parts: [{ id: 'izpit', decks: [{ id: 'rac-stari', name: 'Računske v slogu izpita', calc: true, questions: naloge }] }],
};
