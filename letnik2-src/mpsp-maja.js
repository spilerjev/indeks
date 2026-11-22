/* MPSP - dodatek: Majini zapiski z vaj 4 (predvidevanje povpraševanja, 5. 11. 2026).
   Vir: Vaje/ZAPISKI.md, razdelek "Majini zapiski". */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const calc = (arr) => arr.map((q) => ({ ...q, calc: true }));

const teorija = [
  withId('q5vqjor', { q: "Za kakšno napovedovanje je primerna linearna regresija (npr. prodaja toplotnih črpalk glede na izdana gradbena dovoljenja) in za kakšno ne?",
      options: ["Za kratkoročno (tedenske napovedi), za dolgoročno ne","Za dolgoročno (iščemo trend), za kratkoročno ne","Za obe enako, če je r² nad 0,5","Samo za napovedi znotraj opazovanega obdobja"],
      correct: 1,
      explanation: "Regresija opiše dolgoročni trend; za kratkoročne napovedi uporabimo drsečo sredino ali eksponentno glajenje." }),
  withId('q16kven4', { q: "Kaj pove korelacijski koeficient r in kaj determinacijski koeficient r² pri regresiji prodaje toplotnih črpalk na izdana gradbena dovoljenja?",
      options: ["r = naklon regresijske premice (b); r² = odsek na osi y (a)","r = delež pojasnjene variance (0 … 1); r² = jakost povezave (−1 … 1)","r = smer in jakost povezave (−1 … 1); r² = pojasnjevalna moč (0 … 1)","r = napaka napovedi (e_t); r² = povprečna absolutna napaka (PANN)"],
      correct: 2,
      explanation: "Pri toplotnih črpalkah: r = 0,960 (močna pozitivna povezava), r² = 0,92 → 92 % variabilnosti prodaje pojasnijo izdana dovoljenja, model je uporaben za napovedovanje." }),
  withId('q135q6r7', Q('Pri izračunu PANN za obdobje od 4. do 6. tedna delimo vsoto absolutnih napak z n. Kaj je ta n?', ['Število tednov v drseči sredini (N = 2)', 'Število vseh tednov s podatki (6)', 'Število tednov s podatki minus 1 (5)', 'Število tednov, za katere računamo napako (3)'], 3,
    'PANN = Σ|e_t|/n, n = 3 (tedni 4, 5, 6). N (dolžina drseče sredine) je nekaj drugega.')),
  withId('q1o69kqi', Q('Zakaj pri eksponentnem glajenju prvo napoved (npr. F₄) dobimo z naivno metodo?', ['Ker formula F_{t+1} = F_t + α(D_t − F_t) potrebuje predhodno napoved, ki je še nimamo', 'Ker je naivna metoda pri majhnih α natančnejša od eksponentnega glajenja', 'Ker tako zahteva izračun PANN za primerjavo obeh metod', 'Ker drseča sredina v prvem tednu še ni na voljo'], 0,
    'Brez F₃ ne moremo izračunati F₄, zato vzamemo F₄ = D₃ (naivna metoda) in šele nato glajenje.')),
  withId('q18a9130', Q('Kako konstanta glajenja α vpliva na stabilnost in odzivnost napovedi?', ['Nižja α → bolj odzivne, manj stabilne; višja α → bolj stabilne, manj odzivne', 'α vpliva le na velikost PANN, na stabilnost in odzivnost napovedi pa ne', 'Nižja α → bolj stabilne, manj odzivne; višja α → manj stabilne, bolj odzivne', 'Višja α → bolj stabilne in hkrati bolj odzivne napovedi; nižja α → obratno'], 2,
    'Majhna α daje malo teže zadnji napaki (glajenje), velika α hitro sledi spremembam. Pri nihajočem povpraševanju ima α = 0,2 nižji PANN kot 0,4.')),
  withId('q1bcytwd', Q('Napaka v napovedi je e_t = D_t − F_t. Kaj pomeni pozitivna napaka?', ['Napoved je bila previsoka (povpraševanje smo precenili)', 'Napoved je bila prenizka (povpraševanje smo podcenili)', 'Napoved je bila točna, napaka je le zaokrožitvena', 'Metoda je nestabilna in jo moramo zamenjati'], 1,
    'D > F → podcenili; D < F → precenili. Pri PANN upoštevamo absolutne vrednosti, zato PANN ne pove smeri.')),
  withId('q1rnqdp6', { q: "PANN za tri tedne je pri drseči sredini 8,7, pri eksponentnem glajenju pa 7,7. Katero metodo podjetje izbere za napoved v naslednjem tednu?",
      options: ["Drsečo sredino, ker ima višji PANN","Naivno metodo, ker ne potrebuje izračuna","Eksponentno glajenje, ker ima nižji PANN","Nobeno, ker sta PANN preblizu skupaj"],
      correct: 2,
      explanation: "Nižji PANN = v povprečju manjše odstopanje napovedi od dejanskega povpraševanja = zanesljivejša metoda, zato izberemo eksponentno glajenje." }),
  withId('q101qdya', Q('Kaj pomeni visoka vrednost PANN (povprečne absolutne napake v napovedi)?', ['Napoved sistematično precenjuje povpraševanje - metoda je slabša', 'Napoved v povprečju bolj odstopa od dejanskega - metoda je slabša', 'Napoved sistematično podcenjuje povpraševanje - metoda je slabša', 'Metoda je bolj odzivna na spremembe povpraševanja - je boljša'], 1,
    'PANN pove, za koliko v povprečju napoved zgreši (brez smeri): višja kot je, slabša je metoda.')),
];

const rac = calc([
  withId('qqpyjwz', { q: "Toplotne črpalke (y v sto kosih, x = izdana gradbena dovoljenja): n = 8, Σx = 1 325, Σy = 108, Σx² = 225 975, Σxy = 18 390. Kolikšen je regresijski koeficient b?",
      options: ["(8 · 18 390 − 1 325 · 108)/(8 · 225 975) = 0,0022","(8 · 18 390 − 1 325 · 108)/(8 · 225 975 − 1 325²) = 0,077","18 390/225 975 = 0,081","108/1 325 = 0,082"],
      correct: 1,
      explanation: "b = (nΣxy − ΣxΣy)/(nΣx² − (Σx)²) = (147 120 − 143 100)/(1 807 800 − 1 755 625) = 4 020/52 175 = 0,0770. Eno dodatno dovoljenje pomeni v povprečju ≈ 7,7 kosa več prodanih črpalk.",
      calc: true }),
  withId('qrqc8p2', { q: "Toplotne črpalke: n = 8, Σx = 1 325, Σy = 108, Σx² = 225 975, Σxy = 18 390. Kolikšen je odsek a regresijske premice?",
      options: ["(225 975 · 108 − 1 325 · 18 390)/(8 · 225 975 − 1 325²) = 0,739","(8 · 18 390 − 1 325 · 108)/(8 · 225 975 − 1 325²) = 0,077","(225 975 · 108 − 1 325 · 18 390)/(8 · 225 975) = 0,021","108/8 + 0,077 · 1 325/8 = 26,26"],
      correct: 0,
      explanation: "a = (Σx²Σy − ΣxΣxy)/(nΣx² − (Σx)²) = (24 405 300 − 24 366 750)/52 175 = 38 550/52 175 = 0,739. Enako: a = ȳ − b x̄ = 13,5 − 0,0770 · 165,625 = 0,739.",
      calc: true }),
  withId('qu6wwej', { q: "Regresija ŷ = 0,739 + 0,07705x (prodaja toplotnih črpalk v sto kosih glede na izdana gradbena dovoljenja). Kolikšna je napoved prodaje za 9. četrtletje, če pričakujemo 250 dovoljenj?",
      options: ["19,28 sto kosov","20,01 sto kosov","21,56 sto kosov","0,82 sto kosov"],
      correct: 1,
      explanation: "0,739 + 0,0771 · 250 = 20,01 sto kosov (10. četrtletje pri 270 dovoljenjih: 21,56; 11. pri 230: 18,47). Pozor: 250 je zunaj opazovanega razpona 120-210, zato gre za ekstrapolacijo.",
      calc: true }),
  withId('q17m0u4e', { q: "Toplotne črpalke: korelacijski koeficient med izdanimi gradbenimi dovoljenji in prodajo je r = 0,960. Koliko je r² in kako ga interpretiramo?",
      options: ["0,98: 98 % napovedi prodaje bo pravilnih","0,92: 92 % variabilnosti prodaje pojasnijo izdana dovoljenja","0,48: povezava med dovoljenji in prodajo je šibka","1,92: povezava je več kot popolna, model ni uporaben"],
      correct: 1,
      explanation: "r² = 0,960² = 0,92 = pojasnjevalna (napovedna) moč modela; preostalih 8 % pojasnjujejo drugi dejavniki (npr. subvencije, cene energentov). 0,98 = √r, 0,48 = r/2, 1,92 = 2r - vse so napačni izračuni.",
      calc: true }),
  withId('q15blj7x', { q: "Eksponentno glajenje α = 0,4, povpraševanje po kolesih 120, 104, 132, 115 (tedni 1-4), F₂ = 120 (naivna). Kolikšni sta napovedi za 3. in 4. teden ter PANN za 2.-4. teden?",
      options: ["F₃ = 116,8; F₄ = 119,8; PANN = 12,0","F₃ = 113,6; F₄ = 121,0; PANN = 40,4","F₃ = 113,6; F₄ = 121,0; PANN = 13,5","F₃ = 126,4; F₄ = 124,2; PANN = 10,3"],
      correct: 2,
      explanation: "F₃ = 120 + 0,4 · (104 − 120) = 113,6; F₄ = 113,6 + 0,4 · (132 − 113,6) = 120,96 ≈ 121,0; napake −16; 18,4; −5,96 → PANN = 40,36/3 = 13,5 (40,4 je vsota, ne povprečje). Pri α = 0,2 je PANN 12,0 → izberemo α = 0,2.",
      calc: true }),
]);

module.exports = { teorija, rac };
