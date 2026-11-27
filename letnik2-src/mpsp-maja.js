/* MPSP - dodatek: Majini zapiski z vaj 4 (predvidevanje povpraševanja, 5. 11. 2026).
   Vir: Vaje/ZAPISKI.md, razdelek "Majini zapiski". */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const calc = (arr) => arr.map((q) => ({ ...q, calc: true }));

const teorija = [
  withId('q5vqjor', { q: "Za kakšno napovedovanje je primerna linearna regresija in za kakšno ne?",
      options: ["Za kratkoročno (tedenske napovedi), za dolgoročno ne","Za dolgoročno (iščemo trend), za kratkoročno ne","Za obe enako, če je r² nad 0,5","Samo za napovedi znotraj opazovanega obdobja"],
      correct: 1,
      explanation: "Regresija opiše dolgoročni trend; za kratkoročne napovedi uporabimo drsečo sredino ali eksponentno glajenje." }),
  withId('q16kven4', { q: "Kaj pove korelacijski koeficient r in kaj determinacijski koeficient r² pri regresiji?",
      options: ["r = naklon regresijske premice (b); r² = odsek na osi y (a)","r = delež pojasnjene variance (0 … 1); r² = jakost povezave (−1 … 1)","r = smer in jakost povezave (−1 … 1); r² = pojasnjevalna moč (0 … 1)","r = napaka napovedi (e_t); r² = povprečna absolutna napaka (PANN)"],
      correct: 2,
      explanation: "Primer: r = 0,95 pomeni močno pozitivno povezavo; r² = 0,90 pomeni, da x pojasni 90 % variabilnosti y." }),
  withId('q135q6r7', Q('Pri izračunu PANN za tri tedne delimo vsoto absolutnih napak z n. Kaj je ta n?', ['Število tednov v drseči sredini', 'Število vseh tednov s podatki', 'Število tednov s podatki minus 1', 'Število tednov, za katere računamo napako (3)'], 3,
    'PANN = Σ|e_t|/n, n = 3 (trije tedni z izračunano napako). Dolžina drseče sredine je nekaj drugega.')),
  withId('q1o69kqi', Q('Zakaj pri eksponentnem glajenju prvo napoved dobimo z naivno metodo?', ['Ker formula F_{t+1} = F_t + α(D_t − F_t) potrebuje predhodno napoved, ki je še nimamo', 'Ker je naivna metoda pri majhnih α natančnejša od eksponentnega glajenja', 'Ker tako zahteva izračun PANN za primerjavo obeh metod', 'Ker drseča sredina v prvem tednu še ni na voljo'], 0,
    'Brez prejšnje napovedi ne moremo izračunati naslednje, zato za prvo napoved vzamemo zadnje dejansko povpraševanje (naivna metoda), nato gladimo.')),
  withId('q18a9130', Q('Kako konstanta glajenja α vpliva na stabilnost in odzivnost napovedi?', ['Nižja α → bolj odzivne, manj stabilne; višja α → bolj stabilne, manj odzivne', 'α vpliva le na velikost PANN, na stabilnost in odzivnost napovedi pa ne', 'Nižja α → bolj stabilne, manj odzivne; višja α → manj stabilne, bolj odzivne', 'Višja α → bolj stabilne in hkrati bolj odzivne napovedi; nižja α → obratno'], 2,
    'Majhna α daje malo teže zadnji napaki (glajenje), velika α hitro sledi spremembam. Pri močno nihajočem povpraševanju je zato pogosto boljša manjša α.')),
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
  withId('qqpyjwz', Q('Sladoledarna (x = temperatura v °C, y = prodaja v sto kepicah): n = 6, Σx = 150, Σy = 72, Σx² = 3.850, Σxy = 1.880. Kolikšen je naklon b?', ['b = 0,8', 'b = 0,12', 'b = 1,25', 'b = 12'], 0,
    'b = (n · Σxy − Σx · Σy) / (n · Σx² − (Σx)²) = (11.280 − 10.800) / (23.100 − 22.500) = 480 / 600 = 0,8.')),
  withId('qrqc8p2', Q('Sladoledarna: n = 6, Σx = 150, Σy = 72, b = 0,8. Kolikšen je odsek a regresijske premice?', ['a = −8', 'a = 8', 'a = 12', 'a = 20'], 0,
    'x̄ = 150/6 = 25, ȳ = 72/6 = 12; a = ȳ − b · x̄ = 12 − 0,8 · 25 = −8. Odsek nima smiselne razlage, ker 0 °C ni v opazovanem razponu.')),
  withId('qu6wwej', Q('Sladoledarna: ŷ = −8 + 0,8 · x (x = temperatura v °C, y = prodaja v sto kepicah), opazovane temperature od 20 do 30 °C. Kolikšna je napoved za 28 °C?', ['12,0 sto kepic', '14,4 sto kepic', '20,0 sto kepic', '22,4 sto kepic'], 1,
    'ŷ = −8 + 0,8 · 28 = −8 + 22,4 = 14,4 sto kepic. 28 °C je znotraj opazovanega razpona (interpolacija).')),
  withId('q17m0u4e', Q('Sladoledarna: korelacijski koeficient med temperaturo in prodajo je r = 0,95. Koliko je r² in kako ga razložimo?', ['0,90: 90 % variabilnosti prodaje pojasni temperatura', '0,95: 95 % napovedi prodaje bo točnih', '0,48: povezava med temperaturo in prodajo je šibka', '0,90: 90 % dni je bilo toplih'], 0,
    'r² = 0,95² ≈ 0,90. Delež pojasnjene variabilnosti, ne delež točnih napovedi.')),
  withId('q15blj7x', Q('Eksponentno glajenje z α = 0,4: napoved za 5. mesec je 100, dejansko povpraševanje v 5. mesecu 90, v 6. mesecu 110. Kolikšna je napoved za 7. mesec?', ['96,0', '101,6', '104,0', '110,0'], 1,
    'F₆ = 100 + 0,4 · (90 − 100) = 96; F₇ = 96 + 0,4 · (110 − 96) = 96 + 5,6 = 101,6.')),
]);

module.exports = { teorija, rac };
