/* Uvod v računovodstvo (1. letnik) - dodatne računske naloge: izkaz poslovnega izida po različici I in II,
   izkaz denarnih tokov, časovne razmejitve s T-konti, metode vrednotenja zalog in zaloge proizvodov po
   proizvajalnih stroških. Vsa podjetja in številke so izmišljeni; rešitve preverja rac-check.js. */
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });

const ipi = [
  C('Trgovina Murka: začetna zaloga blaga 14.000 €, nabava blaga v letu 52.000 € (nabavna vrednost brez DDV), končna zaloga blaga 11.500 €. Prihodki od prodaje so 90.000 €. Kolikšen je kosmati poslovni izid od prodaje?', [
    '35.500 €', '38.000 €', '40.500 €', '11.500 €'], 0,
    'Nabavna vrednost prodanega blaga = 14.000 + 52.000 − 11.500 = 54.500. Kosmati izid = 90.000 − 54.500 = 35.500. (38.000 = nabava namesto prodanega blaga, 40.500 = sprememba zaloge z napačnim predznakom.)'),
  C('Proizvodno podjetje Lesnik (različica I): prihodki od prodaje 200.000 €, zaloge proizvodov in nedokončane proizvodnje so se povečale s 30.000 € na 42.000 €. Stroški materiala 70.000 €, storitev 25.000 €, dela 60.000 €, amortizacija 15.000 €. Kolikšen je poslovni izid iz poslovanja?', [
    '30.000 €', '18.000 €', '42.000 €', '54.000 €'], 2,
    'Kosmati donos = 200.000 + (42.000 − 30.000) = 212.000. Stroški po naravnih vrstah = 70.000 + 25.000 + 60.000 + 15.000 = 170.000. Izid = 212.000 − 170.000 = 42.000. (18.000 = povečanje zalog odšteto namesto prišteto.)'),
  C('Podjetje Kovinar ima prihodke od prodaje 150.000 €, zaloge proizvodov pa so se med letom zmanjšale s 25.000 € na 16.000 €. Stroški obdobja so 128.000 €. Kolikšen je kosmati donos iz poslovanja po različici I?', [
    '159.000 €', '141.000 €', '150.000 €', '13.000 €'], 1,
    'Zmanjšanje zalog proizvodov za 9.000 pomeni, da je bil del prodanega izdelan v preteklih obdobjih, zato se kosmati donos zmanjša: 150.000 − 9.000 = 141.000. (13.000 je že poslovni izid: 141.000 − 128.000.)'),
  C('Podjetje Tkalec (različica II): proizvajalni stroški obdobja 120.000 €, stroški prodajanja 18.000 €, splošni stroški uprave 12.000 €. Zaloga proizvodov po proizvajalnih stroških: začetna 20.000 €, končna 32.000 €. Prihodki od prodaje 180.000 €. Kolikšen je kosmati poslovni izid od prodaje?', [
    '60.000 €', '48.000 €', '42.000 €', '72.000 €'], 3,
    'Proizvajalni stroški prodanih proizvodov = 20.000 + 120.000 − 32.000 = 108.000. Kosmati izid = 180.000 − 108.000 = 72.000. (42.000 je izid iz poslovanja po odštetju 30.000 neproizvajalnih stroškov.)'),
  C('Podjetje Brest: prihodki od prodaje 260.000 €, proizvajalni stroški obdobja 150.000 €, neproizvajalni stroški 40.000 €. Zaloga proizvodov po proizvajalnih stroških se je zmanjšala s 35.000 € na 25.000 €. Kolikšen je poslovni izid iz poslovanja po različici II?', [
    '70.000 €', '80.000 €', '60.000 €', '100.000 €'], 2,
    'Proizvajalni stroški prodanih = 35.000 + 150.000 − 25.000 = 160.000, kosmati izid = 100.000, izid iz poslovanja = 100.000 − 40.000 = 60.000. Enak je po različici I: (260.000 − 10.000) − 190.000 = 60.000. (70.000 = prezrta sprememba zalog.)'),
  C('Podjetje Alpka je izdelalo 2.000 izdelkov. Stroški: material 30.000 € (ves proizvajalni), delo 40.000 € (od tega 32.000 € v proizvodnji), amortizacija 18.000 € (od tega 14.000 € proizvajalne opreme), storitve 10.000 € (od tega 4.000 € v proizvodnji). Začetne zaloge ni, končna zaloga je 300 izdelkov. Kolikšna je vrednost končne zaloge po proizvajalnih stroških?', [
    '14.700 €', '12.000 €', '13.200 €', '68.000 €'], 1,
    'Proizvajalni stroški = 30.000 + 32.000 + 14.000 + 4.000 = 80.000, na enoto 80.000 / 2.000 = 40. Končna zaloga = 300 · 40 = 12.000. (14.700 = vsi stroški 98.000 na enoto, 68.000 = vrednost 1.700 prodanih.)'),
  C('Podjetje Sočan je izdelalo 500 proizvodov s proizvajalnimi stroški 45.000 €, neproizvajalni stroški so 9.000 €. Začetne zaloge ni. Prodali so 420 proizvodov po 130 € (brez DDV). Kolikšen je poslovni izid, če zaloge vrednotijo po proizvajalnih stroških?', [
    '600 €', '16.800 €', '9.240 €', '7.800 €'], 3,
    'Stroškovna cena = 45.000 / 500 = 90. Prihodki 420 · 130 = 54.600, proizvajalni stroški prodanih 420 · 90 = 37.800. Izid = 54.600 − 37.800 − 9.000 = 7.800. (9.240 = neproizvajalni stroški napačno vračunani v zalogo, 600 = vsi stroški obdobja kot odhodki.)'),
  C('Trgovina Pika je v prvem mesecu poslovanja kupila 400 kosov blaga po 25 € (brez DDV) in prodala 320 kosov po 40 €. Stroški plač prodajalcev in najemnine so 2.500 €. Koliko so poslovni odhodki meseca?', [
    '10.500 €', '12.500 €', '8.000 €', '2.300 €'], 0,
    'Odhodek je le nabavna vrednost prodanega blaga 320 · 25 = 8.000 in stroški obdobja 2.500, skupaj 10.500. Neprodanih 80 kosov (2.000) ostane v zalogi. (12.500 = celotna nabava kot odhodek, 2.300 = poslovni izid.)'),
];

const idt = [
  C('Podjetje Vrba v letu: prejemki od kupcev 180.000 €, izdatki za dobavitelje 95.000 €, izdatki za plače 40.000 €, plačan davek od dobička 5.000 €, nakup opreme 30.000 €, prejeto posojilo 20.000 €, izplačane dividende 8.000 €. Kolikšen je denarni izid pri poslovanju (neposredna metoda)?', [
    '45.000 €', '10.000 €', '40.000 €', '22.000 €'], 2,
    'Pri poslovanju: 180.000 − 95.000 − 40.000 − 5.000 = 40.000. Nakup opreme spada k investiranju, posojilo in dividende k financiranju. (45.000 = brez davka, 22.000 = skupni denarni izid.)'),
  C('Podjetje Vrba (prejemki od kupcev 180.000 €, izdatki za dobavitelje 95.000 €, za plače 40.000 €, davek 5.000 €, nakup opreme 30.000 €, prejeto posojilo 20.000 €, dividende 8.000 €) je imelo na začetku leta 6.000 € denarnih sredstev. Koliko jih ima na koncu leta?', [
    '22.000 €', '28.000 €', '36.000 €', '20.000 €'], 1,
    'Poslovanje +40.000, investiranje −30.000, financiranje +20.000 − 8.000 = +12.000. Skupni denarni izid 22.000, končno stanje 6.000 + 22.000 = 28.000. (22.000 = brez začetnega stanja, 36.000 = brez dividend.)'),
  C('Podjetje Javor: čisti dobiček 50.000 €, amortizacija 18.000 €. Terjatve do kupcev so se povečale za 7.000 €, zaloge zmanjšale za 4.000 €, obveznosti do dobaviteljev zmanjšale za 3.000 €. Kolikšen je denarni izid pri poslovanju (posredna metoda)?', [
    '74.000 €', '44.000 €', '68.000 €', '62.000 €'], 3,
    '50.000 + 18.000 (amortizacija ni izdatek) − 7.000 (več terjatev) + 4.000 (manj zalog) − 3.000 (plačali smo več dolgov) = 62.000. (74.000 = obrnjeni predznaki sprememb, 68.000 = prezrte spremembe obratnih postavk.)'),
  C('Podjetje Hrast je imelo izgubo 10.000 €, amortizacija je 25.000 €. Terjatve so se zmanjšale za 6.000 €, zaloge povečale za 9.000 €, obveznosti do dobaviteljev povečale za 5.000 €, kratkoročne PČR (vračunani stroški) povečale za 2.000 €. Kolikšen je denarni izid pri poslovanju (posredna metoda)?', [
    '19.000 €', '39.000 €', '17.000 €', '11.000 €'], 0,
    '−10.000 + 25.000 + 6.000 − 9.000 + 5.000 + 2.000 = 19.000. Vračunani stroški so znižali izid, a še niso bili plačani, zato jih prištejemo. (39.000 = izguba prišteta, 17.000 = prezrte PČR.)'),
  C('Podjetje Bor je kupilo opremo za 60.000 €, prodalo staro opremo za 8.000 € (knjigovodska vrednost 5.000 €) in kupilo dolgoročne obveznice za 12.000 €. Kolikšen je denarni izid pri investiranju?', [
    '−67.000 €', '−52.000 €', '−64.000 €', '−80.000 €'], 2,
    'Prejemek je dejanska kupnina 8.000 (ne knjigovodska vrednost): −60.000 + 8.000 − 12.000 = −64.000. (−67.000 = upoštevana knjigovodska vrednost, −52.000 = prezrte obveznice.)'),
  C('Podjetje Jelka je prejelo dolgoročno posojilo 100.000 €, odplačalo glavnico 30.000 €, plačalo obresti 6.000 € (uvršča jih med financiranje), izplačalo dividende 15.000 € in se dokapitaliziralo z vplačilom 40.000 €. Kolikšen je denarni izid pri financiranju?', [
    '95.000 €', '89.000 €', '104.000 €', '49.000 €'], 1,
    '100.000 − 30.000 − 6.000 − 15.000 + 40.000 = 89.000. (95.000 = brez obresti, 104.000 = brez dividend, 49.000 = brez dokapitalizacije.)'),
];

const razmZal = [
  C('Podjetje Sava 1. 9. plača zavarovanje za 12 mesecev vnaprej, 4.800 €. Kolikšno je stanje kratkoročno odloženih stroškov (AČR) na 31. 12.?', [
    '1.600 €', '4.800 €', '3.600 €', '3.200 €'], 3,
    'Mesečni strošek = 4.800 / 12 = 400. Za september-december gre v stroške 4 · 400 = 1.600, odloženih ostane 8 · 400 = 3.200. (1.600 je strošek letošnjega leta.)'),
  C('Konto kratkoročno odloženi stroški (AČR) ima začetno stanje 1.500 €. Med letom: vnaprej plačana najemnina 6.000 € (v breme konta), prenos dela najemnine med stroške 4.500 €, vnaprej plačana naročnina 900 €, prenos naročnine med stroške 600 €. Kolikšno je končno stanje konta?', [
    '3.300 € (debetno stanje)', '3.300 € (kreditno stanje)', '8.400 € (debetno stanje)', '5.100 € (kreditno stanje)'], 0,
    'Debet: 1.500 + 6.000 + 900 = 8.400; kredit (prenosi v stroške): 4.500 + 600 = 5.100. Saldo 8.400 − 5.100 = 3.300 na debetni strani, saj je AČR sredstvo.'),
  C('Agencija Vizija 1. 11. zaračuna in prejme naročnino za 6 mesecev, 7.200 € + 22 % DDV. Kolikšno je stanje kratkoročno odloženih prihodkov (PČR) na 31. 12.?', [
    '2.400 €', '7.200 €', '4.800 €', '5.856 €'], 2,
    'Mesečni prihodek = 7.200 / 6 = 1.200. Prihodki novembra in decembra 2.400, odloženi ostanejo 4 · 1.200 = 4.800. DDV je obveznost do države, ne del razmejitve. (5.856 = z DDV.)'),
  C('Podjetje Drava je 1. 7. najelo posojilo 60.000 € s 6 % letno obrestno mero; obresti za celo leto plača 30. 6. naslednje leto. Koliko vnaprej vračunanih stroškov (odhodkov) obresti izkaže na 31. 12.?', [
    '3.600 €', '1.800 €', '900 €', '300 €'], 1,
    'Letne obresti 60.000 · 0,06 = 3.600, letošnjemu letu pripada 6 mesecev: 3.600 · 6/12 = 1.800. Strošek je nastal, račun pa še ne, zato gre v PČR. (3.600 = celoletne obresti.)'),
  C('Konto kratkoročno vnaprej vračunani stroški (PČR) ima začetno stanje 2.000 €. Med letom podjetje vračuna stroške 5.000 € (v dobro konta), ob prejemu računov pa konto zmanjša za 4.200 €. Kolikšno je končno stanje konta?', [
    '2.800 € (debetno stanje)', '7.000 € (kreditno stanje)', '11.200 € (kreditno stanje)', '2.800 € (kreditno stanje)'], 3,
    'Kredit: 2.000 + 5.000 = 7.000; debet (poraba ob prejemu računov): 4.200. Saldo 7.000 − 4.200 = 2.800 na kreditni strani, saj je PČR obveznost.'),
  C('Podjetje Gradnja ima pred razmejitvami dobiček 20.000 €. Pri tem še ni opravilo razmejitev za: decembrska dela za 9.000 €, ki jih bo zaračunalo januarja; najemnino 12.000 €, plačano 1. 10. za 12 mesecev, ki jo je v celoti knjižilo med stroške; decembrsko elektriko 1.500 €, za katero račun še ni prispel. Kolikšen je popravljen dobiček?', [
    '36.500 €', '27.500 €', '39.500 €', '18.500 €'], 0,
    'Nezaračunani prihodki +9.000 (AČR). Od najemnine pripada letu 3 · 1.000 = 3.000, 9.000 se odloži (AČR) in zniža stroške. Vračunani stroški −1.500 (PČR). 20.000 + 9.000 + 9.000 − 1.500 = 36.500. (27.500 = prezrta najemnina.)'),
  C('Material: začetna zaloga 200 kg po 5 €; 3. 3. nabava 300 kg po 6 €; 10. 3. poraba 350 kg; 20. 3. nabava 250 kg po 6,80 €; 28. 3. poraba 200 kg. Kolikšna je vrednost končne zaloge po metodi FIFO?', [
    '1.270 €', '1.200 €', '1.360 €', '1.000 €'], 2,
    'Po FIFO ostane zadnjih 200 kg iz nabave 20. 3.: 200 · 6,80 = 1.360. Porabljeno je 1.900 + 1.240 = 3.140, skupaj 4.500. (1.270 = drseče povprečne cene, 1.200 = tehtano povprečje.)'),
  C('Material: začetna zaloga 200 kg po 5 €; 3. 3. nabava 300 kg po 6 €; 10. 3. poraba 350 kg; 20. 3. nabava 250 kg po 6,80 €; 28. 3. poraba 200 kg. Kolikšen je strošek materiala v marcu po metodi drsečih povprečnih cen?', [
    '3.140 €', '3.230 €', '3.300 €', '3.080 €'], 1,
    'Po nabavi 3. 3.: 2.800 / 500 = 5,60; poraba 350 · 5,60 = 1.960, ostane 150 kg za 840. Po nabavi 20. 3.: (840 + 1.700) / 400 = 6,35; poraba 200 · 6,35 = 1.270. Skupaj 3.230. (3.140 = FIFO, 3.080 = cena 5,60 za obe porabi.)'),
  C('Material: začetna zaloga 200 kg po 5 €; nabavi 300 kg po 6 € in 250 kg po 6,80 €; v mesecu porabijo skupaj 550 kg. Kolikšen je strošek materiala po metodi tehtanih povprečnih cen (izračun ob koncu meseca)?', [
    '3.230 €', '3.140 €', '3.263,33 €', '3.300 €'], 3,
    'Tehtana povprečna cena = (1.000 + 1.800 + 1.700) / 750 = 6. Strošek = 550 · 6 = 3.300. (3.263,33 = navadno povprečje cen 5, 6 in 6,80 brez tehtanja s količinami.)'),
  C('Trgovina Zvezda: začetna zaloga 100 kosov blaga po 20 €, nabava 300 kosov po 24 €, prodaja 320 kosov po 35 € (brez DDV). Kolikšen je kosmati poslovni izid od prodaje po metodi FIFO?', [
    '3.920 €', '3.840 €', '3.520 €', '4.800 €'], 0,
    'NVPB po FIFO = 100 · 20 + 220 · 24 = 7.280. Prihodki 320 · 35 = 11.200. Kosmati izid = 11.200 − 7.280 = 3.920. (3.840 = povprečna cena 23, 3.520 = vse po 24.)'),
];

module.exports = { id: 'rac', parts: [
  { id: 'izpit',
    decks: [
      { id: 'rac-ipi-razlicici', name: 'Izkaz poslovnega izida: različici I in II', calc: true, questions: ipi },
      { id: 'rac-denarni-tokovi', name: 'Izkaz denarnih tokov', calc: true, questions: idt },
      { id: 'rac-razmejitve-zaloge', name: 'Časovne razmejitve in vrednotenje zalog', calc: true, questions: razmZal },
    ],
    flashcards: [] } ] };
