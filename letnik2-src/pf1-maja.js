/* Poslovne finance 1 - dodatek: Majine rešitve z vaj 1-2 (TVM naloge, ki jih app še ni imel).
   Vir: ZAPISKI.md, razdelka V02 in "Majini zapiski". */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const calc = (arr) => arr.map((q) => ({ ...q, calc: true }));

const rac = calc([
  Q('Hipoteka: 30-letni kredit, letni obrok 12 000 €, 6 % letno. Po 12 plačanih obrokih (ostane jih 18) želite poplačati preostali dolg. Kolikšen je?', ['12 000 · 18 = 216 000 €', '12 000 · [1 − 1,06⁻¹⁸]/0,06 = 129 931,24 €', '12 000 · [1,06¹⁸ − 1]/0,06 = 370 862 €', '12 000 · [1 − 1,06⁻¹²]/0,06 = 100 607 €'], 1,
    'Preostali dolg = sedanja vrednost preostalih 18 obrokov (PVIFA 6 %, 18 = 10,8276). Po 20 letih (10 obrokov): 88 321,04 €.'),
  Q('Hipoteka 12 000 €/leto, 6 %, po 12. obroku ostane 18 obrokov (SV 129 931,24 €). Koliko plačate, če kredit poplačate tik PREDEN zapade 12. obrok?', ['129 931,24 · 1,06 = 137 727,11 €', '129 931,24 €', '129 931,24 − 12 000 = 117 931,24 €', '129 931,24 + 12 000 = 141 931,24 €'], 3,
    'Anuitetna formula vrednoti tokove eno obdobje pred prvim plačilom; obrok, ki zapade zdaj, prištejemo v celoti.'),
  Q('Naložba izplača 10 000 € čez 4 leta, zahtevana donosnost je 5 % letno. Koliko ste pripravljeni plačati danes?', ['10 000/1,05⁴ = 8 227,02 €', '10 000/(1 + 0,05 · 4) = 8 333,33 €', '10 000 · 1,05⁴ = 12 155,06 €', '10 000/1,05 = 9 523,81 €'], 0,
    'PV = FV/(1 + r)ⁿ. Linearni izračun (8 333) ne upošteva obresti na obresti.'),
  Q('Za 8 227,02 € danes dobite 10 000 € čez 4 leta pri MESEČNEM obrestovanju. Kolikšna mora biti navedena letna obrestna mera in zakaj ni 5 %?', ['r = 5 %/12 · 12 = 5 %; enaka, ker je obrestovanje v obeh primerih linearno in brez obrestnih obresti', 'r = [(10 000/8 227,02)^(1/48) − 1] · 12 = 4,89 %; nižja zaradi obresti na obresti med letom', 'r = (10 000/8 227,02)^(1/4) − 1 = 5 %; enaka, ker je EOM vedno enaka navedeni meri', 'r = 4,89 % · 12 = 58,7 %; višja, ker je obdobij obrestovanja dvanajstkrat več'], 1,
    'Mesečni pripis pomeni, da se obresti obrestujejo že med letom, zato zadošča nižja navedena mera; EOM ostane 5 %.'),
  Q('Navedena letna obrestna mera je 4,89 % z mesečnim pripisom obresti. Kolikšna je efektivna obrestna mera (EOM)?', ['0,0489 · 12 = 58,7 %', '(1 + 0,0489)¹² − 1 = 77,3 %', '(1 + 0,0489/12)¹² − 1 = 5,00 %', '0,0489/12 = 0,41 %'], 2,
    'EOM = (1 + r/m)ᵐ − 1 = 1,004075¹² − 1 = 5,00 %: enaka efektivna donosnost kot 5 % z letnim pripisom.'),
  Q('Na banko položite 10 000 € pri 1 % letno. Koliko imate čez 3 leta pri LETNEM in koliko pri MESEČNEM obračunu obresti?', ['10 300,00 € (letno); 10 303,01 € (mesečno)', '10 303,01 € (letno); 10 304,42 € (mesečno)', '10 303,01 € (letno); 10 303,01 € (mesečno)', '10 304,42 € (letno); 10 361,53 € (mesečno)'], 1,
    'Letno: 10 000 · 1,01³ = 10 303,01. Mesečno: 10 000 · (1 + 0,01/12)³⁶ = 10 304,42 - razlika je majhna, ker je r nizek.'),
  Q('Obrestna mera 1 % letno, obresti se obračunavajo mesečno. Kolikšna je dejanska letna donosnost (EOM)?', ['0,01/12 · 12 = 1,0000 %', '(1 + 0,01)¹² − 1 = 12,68 %', '1 % + 0,01 % = 1,01 %', '(1 + 0,01/12)¹² − 1 = 1,0046 %'], 3,
    'EOM = (1 + r/m)ᵐ − 1 = 1,000833¹² − 1 = 1,0046 %.'),
  Q('Katera možnost je pri 11 % letno najbolj vredna: 150 € čez 1 leto, 220 € čez 5 let ali 330 € čez 10 let?', ['330 € čez 10 let (SV 116,22 €) > 220 € čez 5 let (130,56 €) > 150 € čez 1 leto (135,14 €)', '150 € čez 1 leto (SV 135,14 €) > 220 € čez 5 let (130,56 €) > 330 € čez 10 let (116,22 €)', '220 € čez 5 let (SV 130,56 €) > 150 € čez 1 leto (135,14 €) > 330 € čez 10 let (116,22 €)', 'Vse tri so enakovredne, ker je obrestna mera enaka in primerjamo nominalne zneske'], 1,
    'Primerjamo sedanje vrednosti: 150/1,11 = 135,14; 220/1,11⁵ = 130,56; 330/1,11¹⁰ = 116,22.'),
  Q('Podjetje bi mesečni strošek 5 000 € trajno odpravilo z elektronskim pošiljanjem izpiskov. Pri 0,5 % mesečno je sedanja vrednost prihranka?', ['5 000 · 12/0,005 = 12 000 000 €', '5 000/0,06 = 83 333 €', '5 000/0,005 = 1 000 000 €', '5 000 · 0,005 = 25 €'], 2,
    'Perpetuiteta: PV = C/r z mesečno mero (0,5 %) in mesečnim tokom.'),
  Q('1 000 € ob koncu vsakega od naslednjih 100 let pri 7 % letno. Kolikšna je sedanja vrednost in koliko je vredno zadnje plačilo?', ['100 000 €; zadnje plačilo 1 000 €', '14 269,25 €; zadnje plačilo le 1,23 €', '14 285,71 €; zadnje plačilo 14,29 €', '7 000 €; zadnje plačilo 70 €'], 1,
    'PV = 1 000 · PVIFA(7 %, 100) = 14 269,25 € - skoraj perpetuiteta (1 000/0,07 = 14 285,71), ker so oddaljeni tokovi skoraj brez vrednosti.'),
  Q('2 000 € pri 5 % letno: obresti po 5 letih so 552,56 €, po 10 letih 1 257,79 €. Zakaj obresti v 5 letih niso polovica obresti v 10 letih?', ['Ker banka v drugem petletju uporabi višjo obrestno mero za zveste vlagatelje', 'Ker se v prvih petih letih obresti še ne pripisujejo h glavnici', 'Ker se obrestujejo tudi že pripisane obresti, rast je eksponentna', 'Ker je inflacija v drugem petletju višja in jo banka upošteva'], 2,
    'FV = 2 000 · 1,05⁵ = 2 552,56 in 2 000 · 1,05¹⁰ = 3 257,79; brez obrestnih obresti bi bilo 500 in 1 000.'),
  Q('Hči gre čez 7 let na fakulteto; takrat želite imeti 108 000 € pri 6 % letno. Koliko vplačate danes?', ['108 000/(1 + 0,06 · 7) = 76 056,34 €', '108 000 · 1,06⁷ = 162 391 €', '108 000/7 = 15 428,57 €', '108 000/1,06⁷ = 71 826,17 €'], 3,
    'PV = 108 000/1,5036 = 71 826,17 €.'),
]);

module.exports = { rac };
