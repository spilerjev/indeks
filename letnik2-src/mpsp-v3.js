/* MPSP - dodatek: Vaje 3 (linijska razmestitev, CRAFT) in Vaje 4 (predvidevanje povpraševanja).
   Vir: School/.../MPSP/Vaje/ZAPISKI.md. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const calc = (arr) => arr.map((q) => ({ ...q, calc: true }));

const teorija = [
  Q('Kako izračunamo cikel montažne linije?', ['Σ časov nalog / število delovnih mest', 'Razpoložljivi čas / zahtevana količina', 'Najdaljša naloga × število nalog', 'Zahtevana količina / razpoložljivi čas'], 1,
    'c = razpoložljivi čas / zahtevana količina. Večja zahtevana proizvodnja = krajši cikel.'),
  Q('Kako zaokrožimo cikel, ki ni celo število (npr. 125,2 s)?', ['Navzgor', 'Navzdol - da dosežemo zahtevano količino', 'Na najbližje celo število', 'Ga ne zaokrožujemo'], 1,
    'Daljši cikel bi pomenil manj izdelkov od zahtevanih.'),
  Q('Kako izračunamo minimalno število delovnih mest?', ['Σt / c, zaokroženo navzgor', 'c / Σt', 'Število nalog / 2', 'Σt · c'], 0,
    'Npr. ⌈500/180⌉ = ⌈2,78⌉ = 3.'),
  Q('Kako izračunamo učinkovitost linije?', ['c / Σt', 'Σt / (n · c)', 'n · c / Σt', '1 − c/Σt'], 1,
    'n = dejansko število delovnih mest. Prosti čas = n · c − Σt.'),
  Q('Katero pravilo uporabljamo pri razporejanju nalog na delovna mesta?', ['Najprej najkrajša naloga', 'Najprej najdaljša naloga (ob izenačenju: več sledečih nalog)', 'Naključno', 'Po abecedi'], 1,
    'Nalogo lahko dodelimo, ko so opravljene vse neposredne predhodnice in ne preseže preostanka cikla.'),
  Q('Katero delovno mesto je ozko grlo linije?', ['Tisto z najmanj nalogami', 'Tisto z najdaljšim časom obdelave', 'Prvo delovno mesto', 'Tisto z največ prostega časa'], 1,
    'Določa dejansko zmogljivost linije.'),
  Q('Kaj počne metoda CRAFT?', ['Uravnoteži montažno linijo', 'Iz začetne razmestitve preizkuša zamenjave parov naprav in izbere tisto z največjim zmanjšanjem Σ prenosi × razdalja', 'Napoveduje povpraševanje', 'Izračuna kritično pot'], 1,
    'Ponavljamo, dokler ni izboljšanja. Heuristika - ne zagotavlja vedno optimuma.'),
  Q('Kaj je naivna metoda napovedovanja?', ['F_t = povprečje vseh preteklih obdobij', 'F_t = D_(t−1) - napoved je zadnje dejansko povpraševanje', 'F_t = 0', 'F_t = trend'], 1,
    'Pogosto jo uporabimo kot začetno napoved pri eksponentnem glajenju.'),
  Q('Formula eksponentnega glajenja je:', ['F_t = F_(t−1) + α (D_(t−1) − F_(t−1))', 'F_t = α · D_t', 'F_t = (D_(t−1) + D_(t−2))/2', 'F_t = D_(t−1) − α'], 0,
    'Večji α = večja odzivnost na zadnje povpraševanje; manjši α = več glajenja (stabilnost).'),
  Q('Po čem izberemo zanesljivejšo metodo napovedovanja?', ['Po najvišji napovedi', 'Po nižji povprečni absolutni napaki (PANN / MAD)', 'Po kumulativni napaki 0', 'Po najmanjšem α'], 1,
    'PANN meri velikost odstopanj; kumulativna napaka (KNN) pove smer.'),
  Q('Regresija naročil na sklenjene pogodbe da r² = 0,799. Kaj to pomeni?', ['80 % napovedi je pravilnih', '≈ 80 % variabilnosti naročil pojasnijo sklenjene pogodbe', 'Korelacija je 0,8', 'Napaka je 20 %'], 1,
    'r = 0,894 pomeni močno pozitivno povezavo.'),
  Q('Zakaj je napoved z regresijo za x = 260 (opazovano 150-220) manj zanesljiva?', ['Ker je r premajhen', 'Ker gre za ekstrapolacijo izven opazovanega razpona', 'Ker je b negativen', 'Ker je n premajhen'], 1,
    'Zveza zunaj opazovanih vrednosti morda ne velja.'),
];

const rac = calc([
  Q('Linija: 160 enot v 8 urah, Σt = 500 s. Cikel in minimalno število delovnih mest?', ['180 s; 3', '160 s; 4', '180 s; 2', '200 s; 3'], 0,
    'c = 28.800/160 = 180 s; ⌈500/180⌉ = 3.'),
  Q('Montažna linija: vsota časov vseh operacij Σt = 500 s, 3 delovna mesta, cikel c = 180 s. Kolikšna je učinkovitost linije?', ['92,6 %', '83,3 %', '95,0 %', '88,9 %'], 0,
    '500/(3 · 180) = 0,926; prosti čas 40 s.'),
  Q('Montažna linija naj izdela 230 enot v 8 urah, vsota časov operacij Σt = 325 s. Kolikšen je cikel c in najmanjše število delovnih mest (DM)?', ['125 s; 3', '125,2 s; 2', '126 s; 3', '140 s; 3'], 0,
    '28.800/230 = 125,2 → navzdol 125 s; ⌈325/125⌉ = ⌈2,6⌉ = 3.'),
  Q('Montažna linija: vsota časov operacij Σt = 325 s, 3 delovna mesta, cikel c = 125 s. Kolikšna je učinkovitost linije?', ['86,7 %', '92,6 %', '81,3 %', '100 %'], 0,
    '325/(3 · 125) = 0,867.'),
  Q('CRAFT: prenosi med pari 1-2: 20, 1-3: 10, 2-3: 15; razdalje L1-L2 = 4, L1-L3 = 3, L2-L3 = 2. Stroški začetne razmestitve (1 na L1, 2 na L2, 3 na L3)?', ['140', '125', '130', '145'], 0,
    '20 · 4 + 10 · 3 + 15 · 2 = 80 + 30 + 30 = 140.'),
  Q('CRAFT: prenosi 1-2: 20, 1-3: 10, 2-3: 15; razdalje L1-L2 = 4, L1-L3 = 3, L2-L3 = 2. Kolikšen je strošek razmestitve L1 = naprava 3, L2 = naprava 1, L3 = naprava 2 (najnižji)?', ['125', '130', '140', '120'], 0,
    'Par 1-2 na razdalji 2 (L2-L3): 20 · 2; par 1-3 (L1-L2): 10 · 4; par 2-3 (L1-L3): 15 · 3 → 40 + 40 + 45 = 125.'),
  Q('Povpraševanje 90, 70, 80 (tedni 1-3). Napoved 4. tedna z 2-tedensko drsečo sredino?', ['75,0', '80,0', '80,0 (naivna)', '70,0'], 0,
    '(70 + 80)/2 = 75.'),
  Q('Eksponentno glajenje s konstanto α = 0,2: napoved za 4. teden F₄ = 80, dejansko povpraševanje v 4. tednu D₄ = 70. Kolikšna je napoved za 5. teden?', ['78,0', '72,0', '76,0', '80,0'], 0,
    '80 + 0,2 · (70 − 80) = 78.'),
  Q('Napake drseče sredine: −5, +15, −10; eksponentnega glajenja: −10, +12, −10,4. Katera metoda je zanesljivejša?', ['Drseča sredina (PANN 10,0 < 10,8)', 'Eksponentno glajenje (PANN 10,8)', 'Enako zanesljivi', 'Ne moremo določiti'], 0,
    'PANN = povprečje absolutnih napak: (5 + 15 + 10)/3 = 10,0; (10 + 12 + 10,4)/3 = 10,8.'),
  Q('Povpraševanje 90, 110, 80; F₂ = 90 (naivna), α = 0,2. Napoved za 3. teden?', ['94,0', '98,0', '92,0', '110,0'], 0,
    '90 + 0,2 · (110 − 90) = 94. Pri α = 0,4 bi bila 98.'),
  Q('Regresija naročil (mio €) na sklenjene pogodbe x (mio €): ŷ = −9,67 + 0,1173 · x. Kolikšna je napoved naročil, če bo pogodb za x = 260?', ['≈ 20,8 mio €', '≈ 30,5 mio €', '≈ 15,2 mio €', '≈ 24,3 mio €'], 0,
    '−9,67 + 0,1173 · 260 = 20,8 (ekstrapolacija).'),
]);

const kartice = [
  ['Uravnoteženje linije', 'c = razpoložljivi čas / količina (navzdol); min DM = ⌈Σt / c⌉; učinkovitost = Σt / (n · c).'],
  ['Pravilo razporejanja', 'Najdaljša naloga najprej; ob izenačenju več sledečih; le naloge z opravljenimi predhodnicami.'],
  ['CRAFT', 'Zamenjave parov naprav; izberi največje zmanjšanje Σ P · R; ponavljaj do ni izboljšanja (heuristika).'],
  ['Metode napovedovanja', 'Naivna F_t = D_(t−1); drseča sredina = povprečje zadnjih n; eksponentno F_t = F_(t−1) + α(D_(t−1) − F_(t−1)).'],
  ['PANN vs. KNN', 'PANN = povprečje |e| (velikost napak, izbira metode); KNN = vsota e (smer).'],
];

module.exports = { teorija, rac, kartice };
