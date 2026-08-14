/* Doda sklop dodatnih vprasanj v Makroekonomijo (iz obstojecih, preverjenih zapiskov). Ne spremeni obstojecih deckov. */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, 'data.json');
const DATA = JSON.parse(fs.readFileSync(P, 'utf8'));

const deck = { id: 'makro-pregled', name: 'Dodatna vprašanja (pregled)', questions: [
  { q: 'Kaj meri Ginijev koeficient?', options: ['Stopnjo inflacije', 'Neenakost (0 = popolna enakost, 1 = popolna neenakost)', 'Rast BDP', 'Stopnjo brezposelnosti'], correct: 1, explanation: 'Gini meri neenakost dohodka; grafično jo prikaže Lorenzova krivulja.' },
  { q: 'Kako izračunamo neto domači proizvod (NDP)?', options: ['BDP + amortizacija', 'BDP − amortizacija', 'BDP + NX', 'C + I + G'], correct: 1, explanation: 'NDP = BDP − amortizacija. Podobno: neto naložbe = bruto naložbe − amortizacija.' },
  { q: 'Kolikšen je multiplikator državnih izdatkov?', options: ['1/MNP', '1/(1−MNP) = 1/MNV', 'MNP/MNV', '1 − MNP'], correct: 1, explanation: 'Multiplikator = 1/MNV = 1/(1−MNP). Davčni multiplikator je nižji (del dohodka se prelije v varčevanje).' },
  { q: 'Kaj pravi paradoks varčevanja?', options: ['Več varčevanja vedno poveča dohodek', 'Pretirano varčevanje zmanjša AD, dohodek in na koncu tudi samo varčevanje', 'Varčevanje ne vpliva na AD', 'Varčevanje povzroči inflacijo'], correct: 1, explanation: 'Če vsi hkrati pretirano varčujejo, pade agregatno povpraševanje in s tem dohodek – na koncu tudi varčevanje.' },
  { q: 'Kako izračunamo denarni multiplikator?', options: ['1 / stopnja obveznih rezerv', 'M · V', '1 − MNP', 'P · Q'], correct: 0, explanation: 'Denarni multiplikator = 1 / stopnja obveznih rezerv.' },
  { q: 'Kaj pravi kvantitativna teorija denarja?', options: ['M − V = P − Q', 'M · V = P · Q', 'M / V = P / Q', 'M + V = P + Q'], correct: 1, explanation: 'M · V = P · Q (denarna masa × obtočna hitrost = raven cen × obseg transakcij).' },
  { q: 'Kateri davek je progresiven?', options: ['MDS = PDS (sorazmerni)', 'MDS < PDS (regresivni)', 'MDS > PDS (npr. dohodnina)', 'DDV'], correct: 2, explanation: 'Progresivni: mejna davčna stopnja > povprečna (dohodnina). Sorazmerni: MDS = PDS; regresivni: MDS < PDS.' },
  { q: 'Kaj prikazuje Lafferjeva krivulja?', options: ['Padajočo premico', 'Obrnjeno črko U – pri 0 % in 100 % davčni stopnji so prihodki 0', 'Naraščajočo eksponentno funkcijo', 'Vodoravno premico'], correct: 1, explanation: 'Lafferjeva krivulja (obrnjeni U): davčni prihodki so 0 pri 0 % in pri 100 %; nekje vmes so maksimalni.' },
  { q: 'Kaj priporoča Ramseyevo pravilo obdavčitve?', options: ['Obdavčiti cenovno elastične dobrine', 'Obdavčiti cenovno neelastične dobrine (cigareti, alkohol, nafta)', 'Vse dobrine enako', 'Ne obdavčiti ničesar'], correct: 1, explanation: 'Ramseyevo pravilo: obdavči cenovno neelastične dobrine – manjše izkrivljanje trga.' },
  { q: 'Kaj so avtomatski stabilizatorji?', options: ['Instrumenti centralne banke', 'Mehanizmi (nadomestila za brezposelnost, progresivni davki), ki sami blažijo poslovni cikel', 'Carine in kvote', 'Devizne rezerve'], correct: 1, explanation: 'Avtomatski stabilizatorji (nadomestila za brezposelnost, progresivni davki) samodejno blažijo nihanja cikla brez sprejemanja novih ukrepov.' },
  { q: 'Kaj je učinek izrinjanja (crowding-out)?', options: ['Ekspanzivna MP zniža obrestne mere', 'Strukturni deficit dvigne obrestne mere in izrine zasebne naložbe (ne deluje v recesiji)', 'Uvoz izrine domačo proizvodnjo', 'Inflacija izrine varčevanje'], correct: 1, explanation: 'Crowding-out: državno zadolževanje dvigne obrestne mere in izrine zasebne naložbe; v recesiji ne deluje (tam akceleracija).' },
  { q: 'Kolikšna je vsota plačilne bilance?', options: ['Vedno pozitivna', 'Tekoči račun + kapitalsko-finančni račun + statistična napaka = 0', 'Enaka BDP', 'Enaka javnemu dolgu'], correct: 1, explanation: 'Plačilna bilanca je uravnotežena: tekoči račun + kapitalsko-finančni račun + statistična napaka = 0.' },
  { q: 'Kje uporabljamo pojma devalvacija in revalvacija?', options: ['Pri drsečem tečaju', 'Pri stalnem tečaju (uradna odločitev vlade/CB)', 'Samo pri PPP', 'Pri nadzorovanem drsenju izključno'], correct: 1, explanation: 'Devalvacija/revalvacija = uradna sprememba pri stalnem tečaju. Apreciacija/depreciacija = tržna sprememba pri drsečem tečaju.' },
  { q: 'Kaj pravi teorija paritete kupne moči (PPP)?', options: ['Tečaji so vedno fiksni', 'Tečaji sledijo razliki v inflaciji med državami', 'Tečaji so neodvisni od cen', 'Tečaje določa samo centralna banka'], correct: 1, explanation: 'Pariteta kupne moči: dolgoročno se tečaji prilagajajo razliki v inflaciji med državami.' },
  { q: 'Kaj pravi Sayev zakon (klasiki)?', options: ['Povpraševanje ustvarja lastno ponudbo', 'Ponudba ustvarja lastno povpraševanje; AS je navpična', 'Cene so lepljive', 'Inflacija je denarni pojav'], correct: 1, explanation: 'Sayev zakon: ponudba ustvarja lastno povpraševanje (klasiki, navpična AS). Keynes: uravnavanje AD; monetarizem: inflacija je denarni pojav.' },
  { q: 'Kaj predstavljata krivulji IS in LM?', options: ['IS = trg denarja, LM = trg blaga', 'IS = ravnovesje trga blaga (S = I), LM = ravnovesje trga denarja (M = L)', 'Obe prikazujeta inflacijo', 'IS = ponudba, LM = povpraševanje po delu'], correct: 1, explanation: 'IS = ravnovesje na trgu blaga (varčevanje = investicije); LM = ravnovesje na trgu denarja (ponudba = povpraševanje po denarju).' },
  { q: 'Katera vrsta brezposelnosti nastane ob menjavi služb ali prvem vstopu na trg dela?', options: ['Strukturna', 'Ciklična', 'Frikcijska', 'Prikrita'], correct: 2, explanation: 'Frikcijska: menjava služb / prvi vstop. Strukturna: neusklajenost znanj in potreb. Ciklična: zaradi recesije.' },
  { q: 'Kakšna je Phillipsova krivulja kratkoročno in dolgoročno?', options: ['Kratkoročno navpična, dolgoročno inverzna', 'Kratkoročno inverzna (inflacija–brezposelnost), dolgoročno navpična (NAIRU)', 'Vedno vodoravna', 'Vedno pozitivno nagnjena'], correct: 1, explanation: 'Kratkoročno: inverzna povezava inflacija–brezposelnost. Dolgoročno: navpična pri naravni stopnji (NAIRU).' },
  { q: 'Katera so štiri kolesa (dejavniki) gospodarske rasti?', options: ['Denar, davki, dolg, deficit', 'Zemlja, naravni viri, kapital, tehnologija', 'C, I, G, NX', 'Inflacija, brezposelnost, rast, tečaj'], correct: 1, explanation: 'Štiri kolesa rasti: zemlja (delo/človeški viri), naravni viri, kapital, tehnologija.' },
]};

let ok = false;
for (const sem of DATA) for (const su of sem.subjects) if (su.id === 'makro') {
  su.parts[0].decks.push(deck); ok = true;
}
if (!ok) { console.error('makro ni najden'); process.exit(1); }
fs.writeFileSync(P, JSON.stringify(DATA));
console.log('Dodan sklop makro:', deck.questions.length, 'vprašanj.');
