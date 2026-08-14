/* Doda kartice v Uvod v računovodstvo in Osnove statistike (izpeljane iz obstojecih zapiskov). */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, 'data.json');
const DATA = JSON.parse(fs.readFileSync(P, 'utf8'));

const racCards = [
  { id: 'rac-c-temelji', name: 'Temelji in okvir', cards: [
    { front: 'Računovodstvo vs knjigovodstvo', back: 'Knjigovodstvo (evidentiranje) je del računovodstva; računovodstvo je širše (še analiziranje, načrtovanje, nadziranje).' },
    { front: 'Vrste računovodstva', back: 'Finančno (zunanji uporabniki), stroškovno (notranje poslovanje/analitika), poslovodno (odločanje, prihodnost).' },
    { front: 'Notranji vs zunanji uporabniki', back: 'Notranji: poslovodstvo, lastniki z aktivno pravico, zaposleni. Zunanji: posojilodajalci, država, dobavitelji, kupci, konkurenti.' },
    { front: 'SRS vs MSRP (IFRS)', back: 'SRS: majhna/srednja podjetja. MSRP: obvezno za borzna podjetja, banke, zavarovalnice, konsolidacije. ZDA: US GAAP.' },
    { front: 'Dve temeljni predpostavki', back: '(1) Nastanek poslovnih dogodkov (accrual — beležimo ob nastanku, ne ob plačilu); (2) časovna neomejenost delovanja (going-concern).' },
    { front: 'Pravilnik o računovodstvu', back: 'Temeljni notranji akt podjetja. Zakonski okvir: ZGD (8. poglavje) + standardi (SRS/MSRP).' },
  ]},
  { id: 'rac-c-bilanca', name: 'Bilanca in knjižbe', cards: [
    { front: 'Temeljna enačba bilance stanja', back: 'SREDSTVA = OBVEZNOSTI DO VIROV SREDSTEV (na določen dan). Sredstva po likvidnosti, obveznosti po zapadlosti.' },
    { front: 'Konto: debet in kredit', back: 'Debet = leva stran, kredit = desna stran konta.' },
    { front: 'Kontni razredi', back: 'Sredstva: 0,1,3,6; obveznosti do virov: 2 (kratkoročne), 9 (kapital/dolgoročne); stroški: 4; odhodki in prihodki: 7; poslovni izid: 8.' },
    { front: '4 temeljne knjižbe (le v BS)', back: '↑S↑OVS, ↓S↓OVS, ↑S↓S, ↑OVS↓OVS.' },
    { front: '4 izvedene knjižbe (prek poslovnega izida)', back: '↑S↑prihodkov, ↓S↑odhodkov, ↓OVS↑prihodkov, ↑OVS↑odhodkov.' },
    { front: 'Strošek vs izdatek vs odhodek', back: 'Strošek nastane ob porabi prvin (≠ izdatek = odliv denarja, ≠ odhodek = strošek prodanih učinkov). Naravne vrste: material, delo, amortizacija, storitve.' },
  ]},
  { id: 'rac-c-os-zaloge', name: 'Osnovna sredstva in zaloge', cards: [
    { front: 'Neodpisana (knjigovodska) vrednost OOS', back: 'Nabavna vrednost − popravek vrednosti = neodpisana (knjigovodska) vrednost.' },
    { front: 'Amortizacija OOS – osnova in začetek', back: 'AO = nabavna − preostala vrednost; mesečni strošek = AO/(leta×12); amortizirati začnemo mesec po usposobitvi.' },
    { front: 'Prodaja OOS glede na neodpisano vrednost (NV)', back: 'Cena = NV → ni izida; cena > NV → drugi poslovni prihodki; cena < NV → drugi poslovni odhodki.' },
    { front: 'Vrednotenje zalog', back: 'Material in blago po nabavni vrednosti; proizvodi in nedokončana proizvodnja po stroških nastajanja.' },
    { front: 'Metode vrednotenja proizvodov', back: 'Zožena lastna cena (vsi stroški → najvišja), proizvajalni stroški (priporočajo MSRP/SRS), spremenljivi proizvajalni stroški (najnižja).' },
  ]},
];

const statCards = [
  { id: 'stat-c-pojmi', name: 'Pojmi in lestvice', cards: [
    { front: 'Statistika (definicija)', back: 'Zbiranje, urejanje, prikaz in analiza množičnih podatkov.' },
    { front: 'Populacija vs vzorec', back: 'Populacija = vse enote; vzorec = del populacije.' },
    { front: 'Merske lestvice (Stevens)', back: 'Imenska (kategorije), ordinalna (vrstni red), intervalna (enaki razmiki, brez prave ničle), razmernostna (prava ničla). Višja = več operacij.' },
    { front: 'Kvalitativni vs kvantitativni; primarni vs sekundarni', back: 'Kvalitativni (opisni) vs kvantitativni (številski). Primarni (anketa, intervju, opazovanje) vs sekundarni (npr. SURS SI-STAT).' },
    { front: 'PEST vs SWOT', back: 'PEST = analiza zunanjega okolja; SWOT = prednosti/slabosti (in priložnosti/nevarnosti).' },
  ]},
  { id: 'stat-c-srednje', name: 'Srednje vrednosti in razpršenost', cards: [
    { front: 'Aritmetična sredina vs mediana vs modus', back: 'AS: občutljiva na osamelce. Mediana: razdeli niz na pol, odporna na osamelce. Modus: najpogostejša vrednost.' },
    { front: 'Geometrijska sredina', back: 'Uporablja se za povprečenje stopenj rasti.' },
    { front: 'Mere razpršenosti', back: 'Variacijski razmik, varianca, standardni odklon (koren variance), koeficient variacije = (σ/AS)×100.' },
    { front: 'Strukture vs koeficienti', back: 'Strukture: deleži ×100, vsota 100 %. Koeficient: razmerje dveh vsebinsko povezanih absolutnih števil.' },
  ]},
  { id: 'stat-c-prikazi', name: 'Tabele in grafikoni', cards: [
    { front: 'Podatkovna matrika (razpredelnica surovih podatkov)', back: 'Enote v vrsticah, spremenljivke v stolpcih (logika Excela/SPSS).' },
    { front: 'Frekvenčna vs kontingenčna tabela', back: 'Frekvenčna: porazdelitev frekvenc ene spremenljivke. Kontingenčna (dvorazsežna): dve opisni spremenljivki hkrati (vrstice × stolpci).' },
    { front: 'Histogram', back: 'Frekvenčna porazdelitev zvezne spremenljivke; stolpci se stikajo.' },
    { front: 'Strukturni (tortni) krog', back: 'Struktura (deleži) celote. Začnemo pri 0° (desno, ura 3), izseke nizamo po velikosti od največjega, v nasprotni smeri urinega kazalca.' },
    { front: 'Linijski grafikon', back: 'Kronološko gibanje pojava (časovna vrsta).' },
  ]},
];

function setCards(subjId, partIdx, cards) {
  let ok = false;
  for (const sem of DATA) for (const su of sem.subjects) if (su.id === subjId) {
    su.parts[partIdx].flashcards = cards; ok = true;
  }
  return ok;
}

if (!setCards('rac', 0, racCards)) { console.error('rac ni najden'); process.exit(1); }
if (!setCards('stat', 0, statCards)) { console.error('stat ni najden'); process.exit(1); }

fs.writeFileSync(P, JSON.stringify(DATA));
const rc = racCards.reduce((a, d) => a + d.cards.length, 0);
const sc = statCards.reduce((a, d) => a + d.cards.length, 0);
console.log('rac kartice:', rc, '| stat kartice:', sc);
