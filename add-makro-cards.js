/* Doda kartice v Makroekonomijo (izpeljane iz obstojecih zapiskov v appu). Ne spremeni kvizov/zapiskov. */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, 'data.json');
const DATA = JSON.parse(fs.readFileSync(P, 'utf8'));

const flashcards = [
  { id: 'makro-c-temelji', name: 'Temelji in merjenje', cards: [
    { front: 'Mikro vs makroekonomija', back: 'Mikro: individualna enota (posameznik, podjetje, trg ene dobrine). Makro: agregatna raven (potrošnja, investicije, raven cen).' },
    { front: 'Pozitivna vs normativna ekonomija', back: 'Pozitivna opisuje »kot stvari so«; normativna »kaj naj bi bilo« (vrednostne sodbe).' },
    { front: 'Oportunitetni strošek', back: 'Strošek izgubljene (najboljše) alternative.' },
    { front: 'Transformacijska krivulja', back: 'Maksimalni output ob danem znanju in inputih; usločena zaradi padajočega mejnega produkta.' },
    { front: 'Nevidna roka (A. Smith)', back: 'Sledenje lastnim interesom vodi k najboljšemu za vse; odpove pri monopolu in onesnaževanju.' },
    { front: 'Gini in Lorenzova krivulja', back: 'Gini meri neenakost (0 = popolna enakost, 1 = popolna neenakost); Lorenzova krivulja jo prikaže grafično.' },
    { front: 'Okunovo luknjičasto vedro', back: 'Prerazdelitev k revnim zmanjša motivacijo za delo → trade-off med enakostjo in učinkovitostjo.' },
    { front: 'BDP (izdatkovna metoda)', back: 'BDP = C + I + G + NX. Dohodkovna: plače + dobički + obresti + rente.' },
    { front: 'Nominalni / realni / potencialni BDP', back: 'Nominalni = tekoče cene; realni = stalne cene; potencialni = max ob stabilnih cenah; dejanski = v danih razmerah.' },
    { front: 'NDP in neto naložbe', back: 'NDP = BDP − amortizacija. Neto naložbe = bruto naložbe − amortizacija.' },
    { front: 'Poslovni cikel / recesija', back: 'Odstopanja dejanskega od potencialnega BDP; recesija = padec vsaj 2 trimesečji, sledi ekspanzija.' },
  ]},
  { id: 'makro-c-politika', name: 'AD-AS, denar, politike', cards: [
    { front: 'AD krivulja – zakaj padajoča?', back: 'Nižje cene → višja realna ponudba denarja → nižje obrestne mere → več investicij.' },
    { front: 'AS kratkoročno vs dolgoročno', back: 'Kratkoročno naraščajoča (lepljive cene/mezde), dolgoročno navpična (vsi stroški se prilagodijo).' },
    { front: 'Stagflacija', back: 'Upočasnjena rast + visoka inflacija (premik AS).' },
    { front: 'Multiplikator (izdatkov)', back: '1/MNV = 1/(1−MNP). Davčni multiplikator je nižji (del dohodka gre v varčevanje).' },
    { front: 'Paradoks varčevanja', back: 'Pretirano varčevanje zmanjša AD, dohodek in na koncu tudi samo varčevanje.' },
    { front: 'Denarni agregati M1–M4', back: 'M1 (gotovina + knjižni), M2 (+ hranilni računi), M3 (+ dolgoročni depoziti), M4 (+ tuj denar).' },
    { front: 'Denarni multiplikator', back: '= 1 / stopnja obveznih rezerv.' },
    { front: 'Instrumenti centralne banke', back: 'Diskontna stopnja, politika odprtega trga (nakup/prodaja VP), obvezne rezerve.' },
    { front: 'Restriktivna vs ekspanzivna MP', back: 'Restriktivna (ob inflaciji): manj denarja → višje obr. mere → nižji AD, I, BDP. Ekspanzivna: obratno.' },
    { front: 'Kvantitativna teorija denarja', back: 'M · V = P · Q.' },
    { front: 'Neposredni vs posredni davki', back: 'Neposredni (dohodnina, davek na dobiček): ni prevaljevanja. Posredni (npr. DDV): se prevaljujejo na kupca.' },
  ]},
];

let placed = false;
for (const sem of DATA) for (const su of sem.subjects) if (su.id === 'makro') {
  su.parts[0].flashcards = flashcards;
  placed = true;
}
if (!placed) { console.error('NAPAKA: makro ni najden'); process.exit(1); }

fs.writeFileSync(P, JSON.stringify(DATA));
let c = 0; flashcards.forEach((d) => c += d.cards.length);
console.log('Dodane kartice v makro:', flashcards.length, 'kompleti,', c, 'kartic.');
