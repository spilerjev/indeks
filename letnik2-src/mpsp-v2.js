/* MPSP - dodatek: Vaje 2 - analiza procesa (zmogljivost, ozko grlo, TPČ, Littlov zakon), 22. 10. 2026
   Vir: School/.../Management proizvodnih in storitvenih procesov/Vaje/ZAPISKI.md */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

const teorija = [
  Q('Kako izračunamo obremenitev resursa?', ['Čas najdaljše aktivnosti', 'Seštevek časov vseh aktivnosti, pri katerih resurs sodeluje', 'Povprečje časov aktivnosti', 'Število enot resursa'], 1,
    'Ena aktivnost lahko zahteva več resursov hkrati (npr. zdravnik + stol) - čas štejemo vsakemu od njih.'),
  Q('Kaj je ozko grlo procesa?', ['Najdaljša aktivnost', 'Resurs z najmanjšo zmogljivostjo (skupine) - to je zmogljivost procesa', 'Resurs z največjo obremenitvijo na enoto', 'Aktivnost na kritični poti'], 1,
    'Ozko grlo ≠ kritična pot. Zmogljivost ↔ ozko grlo, TPČ ↔ kritična pot.'),
  Q('Kako izračunamo izkoriščenost resursa?', ['Zmogljivost resursa / zmogljivost procesa', 'Zmogljivost procesa / zmogljivost resursa', 'Obremenitev / število enot', '1 − zmogljivost'], 1,
    'Ozko grlo ima izkoriščenost 100 %, ostali manj.'),
  Q('Kaj je zmogljivost skupine resursov?', ['Obremenitev · število enot', 'Zmogljivost ene enote · število enot', 'Najmanjša zmogljivost med enotami', 'Skupni čas aktivnosti'], 1,
    'Npr. 2 stola po 2 pacienta/h = 4 pacienti/h. Najmanjša zmogljivost skupine med resursi = zmogljivost procesa.'),
  Q('Kaj je tehnološki pretočni čas (TPČ)?', ['Čas najkrajše poti v diagramu', 'Čas najdaljše poti v procesnem diagramu (kritična pot)', 'Seštevek vseh aktivnosti', 'Čas ozkega grla'], 1,
    'Kritične aktivnosti so tiste na najdaljši poti; nekritične imajo rezervo.'),
  Q('Dodamo dodatnega delavca na aktivnost. Kako to vpliva na TPČ?', ['Skrajša ga', 'Ne spremeni ga (N) - delavec ne skrajša časa ene enote, poveča pa lahko zmogljivost', 'Podaljša ga', 'Ne vemo (O)'], 1,
    'Dodaten delavec nikoli ne spremeni TPČ. Skrajšanje kritične aktivnosti pa ne zagotavlja krajšega TPČ, če obstaja več kritičnih poti.'),
  Q('Aktivnost Y je kritična, a ni ozko grlo. Kaj se zgodi, če Y podaljšamo?', ['TPČ se podaljša (P), zmogljivost: ne vemo (O) - Y lahko postane novo ozko grlo', 'TPČ ostane, zmogljivost se poveča', 'Oboje ostane enako', 'Oboje se skrajša'], 0,
    'Kritična → TPČ se zagotovo poveča. Ali Y postane ozko grlo, ne vemo.'),
  Q('Aktivnost X je ozko grlo, a ni kritična, Z je kritična in ozko grlo. Dodamo delavca na X. Kaj je s TPČ in zmogljivostjo?', ['Oboje se izboljša', 'Zmogljivost ostane (N) - ozko grlo je še Z; TPČ ostane (N)', 'Zmogljivost naraste, TPČ ostane', 'TPČ se skrajša'], 1,
    'Če je ozkih grl več, moraš delovati na vsa. Dodaten delavec ne skrajša časa aktivnosti.'),
  Q('Kaj pomeni oznaka "O" pri vprašanjih P/Z/N/O?', ['Odpade', 'Ne vemo (odvisno od podatkov)', 'Ostane enako', 'Optimalno'], 1,
    'P - poveča se, Z - zmanjša se, N - ne spremeni se, O - ne vemo.'),
  Q('Kako v skripti zapišemo Littlov zakon za določitev časa čakanja?', ['PČ = Z / P', 'PČ = Z · P', 'Z = PČ / P', 'P = Z · PČ'], 0,
    'Z = PČ · P, torej PČ = Z/P. Pri čakanju poznamo zalogo (Z), ne časa.'),
];

const rac = [
  Q('Ortodont dr. Novak: receptor (aktivnosti 1, 2, 7 = 4 + 1 + 2 min) ima obremenitev:', ['4 min', '5 min', '7 min', '30 min'], 2,
    '4 + 1 + 2 = 7 min/pacienta → zmogljivost 60/7 = 8,6 pac./h.'),
  Q('Ortodont: stol je zaseden pri aktivnostih 2, 3, 4, 5, 6 (1 + 5 + 16 + 4 + 4). Kolikšna je zmogljivost procesa (1 stol, 1 receptor, 1 zobotehnik, 1 zdravnik)?', ['8,6 pac./h', '6,7 pac./h', '3 pac./h', '2 pac./h'], 3,
    'Obremenitev stola 30 min → 60/30 = 2 pac./h = ozko grlo. Zdravnik: 60/20 = 3, zobotehnik 60/9 = 6,7, receptor 60/7 = 8,6.'),
  Q('Ortodont: dodamo še en stol (2 stola). Kolikšna je nova zmogljivost procesa?', ['4 pac./h', '3 pac./h', '2 pac./h', '6,7 pac./h'], 1,
    'Stoli: 2 · 2 = 4/h, a zdravnik zmore le 3/h → ozko grlo se premakne na zdravnika: 3 pac./h (+1, ne +2).'),
  Q('Trije delavci, 5 operacij: O1 (30) → vzporedno O2 (20) in O3 (40) → O4 (20) → O5 (50). Kolikšen je TPČ?', ['140 min', '160 min', '120 min', '100 min'], 0,
    'Najdaljša pot: O1 + O3 + O4 + O5 = 30 + 40 + 20 + 50 = 140 min. O2 je nekritična (pot čez O2 je 20 min krajša).'),
  Q('Isti primer: delavec I (O1, O2), II (O3, O4), III (O5), vsak 500 min/dan. Kolikšna je zmogljivost procesa?', ['10 enot/dan', '8,3 enot/dan', '5 enot/dan', '12,5 enot/dan'], 1,
    'Obremenitve: I = 50, II = 60, III = 50 min. Zmogljivost: 10, 500/60 = 8,3, 10. Ozko grlo je delavec II → 8,3 enot/dan.'),
  Q('Isti primer: delavec IV prevzame O3 (40 min). Kolikšna je nova zmogljivost?', ['12,5 enot/dan', '10 enot/dan', '8,3 enot/dan', '25 enot/dan'], 1,
    'II (le O4, 20 min) = 25, IV (40 min) = 12,5, I in III = 10 → ozko grlo I in III: 10 enot/dan (+1,7).'),
  Q('Isti primer: ali daljši O2 vpliva na TPČ?', ['Poveča (P)', 'Ne spremeni (N)', 'Ne vemo (O) - če je podaljšek večji od 20 min, postane kritična', 'Zmanjša (Z)'], 2,
    'O2 ima rezervo 20 min. Če jo preseže, postane kritična (P), sicer N. Ker ne vemo za koliko, je odgovor O.'),
  Q('6 operacij, D1: O1 (20) + O5 (30), D2: O2 (20) + O4 (40), D3: O3 (20) + O6 (30), vsak 300 min/dan. Kolikšna je zmogljivost procesa?', ['6 proizv./dan', '5 proizv./dan', '4,3 proizv./dan', '7,5 proizv./dan'], 1,
    'D1 = 50 → 6, D2 = 60 → 5, D3 = 50 → 6. Ozko grlo D2 = 5 proizv./dan.'),
  Q('Isti primer: D1 prevzame še O2. Kaj se zgodi z zmogljivostjo procesa?', ['Poveča se na 6', 'Zmanjša se na 4,3', 'Ostane 5', 'Poveča se na 7,5'], 1,
    'D1 = 20 + 30 + 20 = 70 → 300/70 = 4,3. D2 = 40 → 7,5, D3 = 6. Preobremenili smo D1 - ozko grlo se je premaknilo in je zdaj slabše.'),
  Q('Isti primer: poti O1-O2-O4-O6 (110), O1-O2-O3-O6 (90), O1-O5-O6 (80). Kolikšen je TPČ in kaj je kritična pot?', ['110 min; O1, O2, O4, O6', '90 min; O1, O2, O3, O6', '80 min; O1, O5, O6', '280 min; vse aktivnosti'], 0,
    'TPČ = najdaljša pot = 110 min. Daljši O5 ima rezervo 30 min (O), krajši O2 zmanjša TPČ (Z) - O2 je kritična.'),
  Q('Urgenca: P = 50 bolnikov/h, čakajočih na prijavo Z = 30. Kolikšen je povprečni čas čakanja na prijavo?', ['0,6 h = 36 min', '1,67 min', '15 min', '30 min'], 0,
    'PČ = Z/P = 30/50 = 0,6 h = 36 min. Čakanje na pregled: 40/50 = 0,8 h = 48 min.'),
  Q('Urgenca: čakanje na prijavo 36 min, prijava 2 min, čakanje na pregled 48 min, pregled 5 min (recept, 90 %) ali 30 min (hospitalizacija, 10 %). Kolikšen je povprečni čas na oddelku?', ['91 min', '116 min', '93,5 min', '100 min'], 2,
    'Recept: 36 + 2 + 48 + 5 = 91 min; hospitalizacija: 116 min. Povprečje: 0,9 · 91 + 0,1 · 116 = 93,5 min.'),
  Q('Urgenca: povprečno trajanje pregleda je 0,9 · 5 + 0,1 · 30 = 7,5 min. Koliko bolnikov na uro pregleda en zdravnik?', ['8', '12', '50', '6,25'], 0,
    '60/7,5 = 8 bolnikov/h. Ker jih prihaja 50/h, jih mora biti zdravnikov vsaj 50/8 ≈ 6,25, sicer vrsta raste.'),
  Q('Urgenca: P = 50/h, povprečni čas na oddelku 93,5 min. Koliko bolnikov je povprečno na oddelku?', ['≈ 78', '≈ 50', '≈ 93', '≈ 8'], 0,
    'Z = P · PČ = 50 · (93,5/60) = 50 · 1,56 = 77,9 ≈ 78 bolnikov.'),
];

const kartice = [
  ['Postopek za zmogljivost procesa', '1) resursi za vsako aktivnost, 2) obremenitev = vsota časov, 3) zmogljivost enote = 60/obremenitev × št. enot, 4) ozko grlo = najmanjša, 5) izkoriščenost = zm. procesa / zm. resursa.'],
  ['Ozko grlo vs. kritična pot', 'Ozko grlo → zmogljivost procesa. Kritična pot (najdaljša) → TPČ.'],
  ['P / Z / N / O', 'Poveča / zmanjša / ne spremeni / ne vemo. Dodaten delavec nikoli ne spremeni TPČ.'],
  ['Littlov zakon', 'Z = PČ · P; PČ = Z/P. Pri čakanju poznamo zalogo.'],
];

module.exports = { teorija, rac, kartice };
