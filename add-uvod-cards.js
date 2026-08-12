/* Doda kartice (flashcards) v Uvod v poslovanje / 1. kolokvij. Ne spremeni obstojecih kvizov/zapiskov. */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, 'data.json');
const DATA = JSON.parse(fs.readFileSync(P, 'utf8'));

const flashcards = [
  { id: 'uvp-k1-pojmi', name: 'Pojmi in prvine', cards: [
    { front: 'Gospodarjenje', back: 'Zavestna dejavnost za zmanjševanje omejenosti dobrin. Elementi: zavestna dejavnost, potrebe, omejenost dobrin.' },
    { front: 'Proste vs ekonomske dobrine', back: 'Proste: ponudba > povpraševanje tudi pri ceni 0. Ekonomske (redke): manj, kot znašajo potrebe → imajo ceno.' },
    { front: 'Temeljni ekonomski problem', back: 'Omejenost (redkost) dobrin. Rešitev = proizvodnja; je temeljni razlog za gospodarjenje.' },
    { front: 'Minimaks (minimax) načelo', back: 'Dani rezultat z minimalno porabo vložkov ALI z danimi vložki maksimalni rezultat. V praksi optimum.' },
    { front: '4 poslovne prvine', back: 'Delovna sredstva, predmeti dela, delo, storitve.' },
    { front: 'Delovna sredstva vs predmeti dela', back: 'DS: ne spremenijo se v učinek, več procesov, postopna obraba, ohranijo obliko. PD: spremenijo se v učinek, potrošijo v enem procesu.' },
    { front: 'Angažiranje', back: 'Pridobitev (zaposlitev) prvin; predpogoj trošenja. Vrednostno = premoženje = aktiva bilance stanja.' },
    { front: 'Trošenje in strošek', back: 'Trošenje = uporaba prvin. Naturalno = potroški, vrednostno = stroški. C = Σ Qi·Pi.' },
    { front: 'Dodana vrednost', back: 'Nastane nekaj novega, bolj uporabnega, z višjo vrednostjo za kupca kot vsota vhodnih prvin.' },
  ]},
  { id: 'uvp-k1-sredstva', name: 'Sredstva in amortizacija', cards: [
    { front: 'Delitev poslovnih sredstev', back: 'Osnovna sredstva (OS), obratna sredstva (ObS), finančne naložbe (FN). SRS: dolgoročna / kratkoročna.' },
    { front: 'Osnovna sredstva – vrednost v bilanci', back: 'Izkazana po neodpisani (sedanji) vrednosti = nabavna − odpisana (kumulativa amortizacije).' },
    { front: 'Zmogljivost OS', back: 'Intenzivna (proizvodi/čas. enoto), ekstenzivna (čas delovanja), integralna (zmnožek obeh).' },
    { front: 'Koeficient obračanja ObS', back: 'KO = stroškovna vrednost proizvodnje / povprečno stanje ObS. Dnevi vezave = 360 / KO.' },
    { front: 'Potrebni obseg ObS', back: '= načrtovana stroškovna vrednost proizvodnje / koeficient obračanja.' },
    { front: 'Amortizacija – kaj in namen', back: 'Strošek delovnega sredstva; namen = enostavna reprodukcija (zamenjava DS v enakem obsegu).' },
    { front: 'Katera sredstva se ne amortizirajo?', back: 'Zemljišča. (Amortiziramo opredmetena OS in neopredmetena s končno dobo koristnosti; po krajši dobi.)' },
    { front: 'Časovne vs funkcionalne metode amortiziranja', back: 'Časovne: eksogeni dejavniki (čas), letna Am fiksna. Funkcionalne (proizvodna): endogeni (uporaba), Am/izdelek fiksna.' },
  ]},
  { id: 'uvp-k1-stroski', name: 'Stroški, kalkulacije, uspeh', cards: [
    { front: '4 naravne vrste stroškov', back: 'Stroški delovnih sredstev (amortizacija), dela, predmetov dela (material), storitev.' },
    { front: 'FIFO / LIFO / povprečne cene', back: 'FIFO = prve nabavne cene; povprečne = po povprečju; LIFO (zadnje cene) po SRS NI dovoljen.' },
    { front: 'Neposredni vs posredni stroški', back: 'Neposredni: vemo, kdo in koliko jih je povzročil. Posredni (splošni): skupni, razporejamo s ključi.' },
    { front: 'Ključ za splošne stroške', back: 'Ključ = splošni stroški / osnova za razporejanje × 100.' },
    { front: 'Lastna cena – struktura', back: 'Nep. material + nep. delo + amortizacija + proizvodna režija + upravno-prodajno-nabavna režija.' },
    { front: 'Poslovni izid', back: 'Prihodki − odhodki. Prihodki = vrednost prodanih količin; odhodki = stroški prodanih količin.' },
    { front: 'Stroški vs odhodki vs izdatki', back: 'Stroški = proizvedeno; odhodki = prodano; izdatki = odliv denarja. Amortizacija = strošek brez izdatka.' },
    { front: 'Ekonomičnost / produktivnost / rentabilnost', back: 'E = Q/C (prihodki/odhodki); PL = Q/L; ROE = dobiček/kapital, ROA = dobiček/sredstva.' },
    { front: 'Marža vs rabat', back: 'Marža = % od nabavne cene (določi trgovina). Rabat = % popust od prodajne cene (prizna proizvajalec).' },
  ]},
];

let placed = false;
for (const sem of DATA) for (const su of sem.subjects) if (su.id === 'uvod') {
  const p = su.parts.find((x) => x.id === 'k1');
  p.flashcards = flashcards;
  placed = true;
}
if (!placed) { console.error('NAPAKA: uvod/k1 ni najden'); process.exit(1); }

fs.writeFileSync(P, JSON.stringify(DATA));
let c = 0; flashcards.forEach((d) => c += d.cards.length);
console.log('Dodane kartice v uvod/k1:', flashcards.length, 'kompleti,', c, 'kartic.');
