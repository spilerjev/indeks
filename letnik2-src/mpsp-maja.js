/* MPSP - dodatek: Majini zapiski z vaj 4 (predvidevanje povpraševanja, 5. 11. 2026).
   Vir: Vaje/ZAPISKI.md, razdelek "Majini zapiski". */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const calc = (arr) => arr.map((q) => ({ ...q, calc: true }));

const teorija = [
  Q('Za kakšno napovedovanje je primerna linearna regresija (Primer 4.2, naročila glede na pogodbe) in za kakšno ne?', ['Za kratkoročno (tedenske napovedi), za dolgoročno ne', 'Za dolgoročno (iščemo trend), za kratkoročno ne', 'Za obe enako, če je r² nad 0,5', 'Samo za napovedi znotraj opazovanega obdobja'], 1,
    'Regresija opiše dolgoročni trend; za kratkoročne napovedi uporabimo drsečo sredino ali eksponentno glajenje.'),
  Q('Kaj pove korelacijski koeficient r in kaj determinacijski koeficient r² pri regresiji naročil na sklenjene pogodbe?', ['r = naklon regresijske premice (b); r² = odsek na osi y (a)', 'r = delež pojasnjene variance (0 … 1); r² = jakost povezave (−1 … 1)', 'r = smer in jakost povezave (−1 … 1); r² = pojasnjevalna moč (0 … 1)', 'r = napaka napovedi (e_t); r² = povprečna absolutna napaka (PANN)'], 2,
    'Primer 4.2: r = 0,894 (močna pozitivna), r² = 0,8 → 80 % variabilnosti naročil pojasnijo pogodbe, model je uporaben za napovedovanje.'),
  Q('Pri izračunu PANN za obdobje od 4. do 6. tedna delimo vsoto absolutnih napak z n. Kaj je ta n?', ['Število tednov v drseči sredini (N = 2)', 'Število vseh tednov s podatki (6)', 'Število tednov s podatki minus 1 (5)', 'Število tednov, za katere računamo napako (3)'], 3,
    'PANN = Σ|e_t|/n, n = 3 (tedni 4, 5, 6). N (dolžina drseče sredine) je nekaj drugega.'),
  Q('Zakaj pri eksponentnem glajenju prvo napoved (npr. F₄) dobimo z naivno metodo?', ['Ker formula F_{t+1} = F_t + α(D_t − F_t) potrebuje predhodno napoved, ki je še nimamo', 'Ker je naivna metoda pri majhnih α natančnejša od eksponentnega glajenja', 'Ker tako zahteva izračun PANN za primerjavo obeh metod', 'Ker drseča sredina v prvem tednu še ni na voljo'], 0,
    'Brez F₃ ne moremo izračunati F₄, zato vzamemo F₄ = D₃ (naivna metoda) in šele nato glajenje.'),
  Q('Kako konstanta glajenja α vpliva na stabilnost in odzivnost napovedi?', ['Nižja α → bolj odzivne, manj stabilne; višja α → bolj stabilne, manj odzivne', 'α vpliva le na velikost PANN, na stabilnost in odzivnost napovedi pa ne', 'Nižja α → bolj stabilne, manj odzivne; višja α → manj stabilne, bolj odzivne', 'Višja α → bolj stabilne in hkrati bolj odzivne napovedi; nižja α → obratno'], 2,
    'Majhna α daje malo teže zadnji napaki (glajenje), velika α hitro sledi spremembam. Pri nihajočem povpraševanju ima α = 0,2 nižji PANN kot 0,4.'),
  Q('Napaka v napovedi je e_t = D_t − F_t. Kaj pomeni pozitivna napaka?', ['Napoved je bila previsoka (povpraševanje smo precenili)', 'Napoved je bila prenizka (povpraševanje smo podcenili)', 'Napoved je bila točna, napaka je le zaokrožitvena', 'Metoda je nestabilna in jo moramo zamenjati'], 1,
    'D > F → podcenili; D < F → precenili. Pri PANN upoštevamo absolutne vrednosti, zato PANN ne pove smeri.'),
  Q('Po PANN za 4.–6. teden (drseča sredina 10,0; eksponentno glajenje 10,8) katero metodo izbere podjetje za napoved v 7. tednu?', ['Eksponentno glajenje, ker ima višji PANN', 'Naivno metodo, ker ne potrebuje izračuna', 'Drsečo sredino, ker ima nižji PANN', 'Nobeno, ker sta PANN preblizu skupaj'], 2,
    'Nižji PANN = zanesljivejša metoda; "ker je nižja vrednost, bi drsečo sredino izbrali v 7. tednu".'),
  Q('Kaj pomeni visoka vrednost PANN (povprečne absolutne napake v napovedi)?', ['Napoved sistematično precenjuje povpraševanje - metoda je slabša', 'Napoved v povprečju bolj odstopa od dejanskega - metoda je slabša', 'Napoved sistematično podcenjuje povpraševanje - metoda je slabša', 'Metoda je bolj odzivna na spremembe povpraševanja - je boljša'], 1,
    'PANN pove, za koliko v povprečju napoved zgreši (brez smeri): višja kot je, slabša je metoda.'),
];

const rac = calc([
  Q('Primer 4.2: n = 8, Σx = 1 470, Σy = 95, Σx² = 273 300, Σxy = 17 830. Kolikšen je regresijski koeficient b?', ['(8 · 17 830 − 1 470 · 95)/(8 · 273 300) = 0,0013', '(8 · 17 830 − 1 470 · 95)/(8 · 273 300 − 1 470²) = 0,117', '17 830/273 300 = 0,065', '95/1 470 = 0,065'], 1,
    'b = (nΣxy − ΣxΣy)/(nΣx² − (Σx)²) = (142 640 − 139 650)/(2 186 400 − 2 160 900) = 2 990/25 500 = 0,117.'),
  Q('Primer 4.2: n = 8, Σx = 1 470, Σy = 95, Σx² = 273 300, Σxy = 17 830. Kolikšen je odsek a regresijske premice?', ['(273 300 · 95 − 1 470 · 17 830)/(8 · 273 300 − 1 470²) = −9,67', '(8 · 17 830 − 1 470 · 95)/(8 · 273 300 − 1 470²) = 0,117', '(273 300 · 95 − 1 470 · 17 830)/(8 · 273 300) = −0,11', '95/8 + 0,117 · 1 470/8 = 33,37'], 0,
    'a = (Σx²Σy − ΣxΣxy)/(nΣx² − (Σx)²) = (25 963 500 − 26 210 100)/25 500 = −9,671. Enako: a = ȳ − b x̄ = 11,875 − 0,117 · 183,75.'),
  Q('Regresija y = −9,671 + 0,117x (naročila v mio € glede na sklenjene pogodbe). Kolikšna je napoved naročil za 9. trimesečje, če bo pogodb za 260 mio €?', ['30,42 mio €', '20,75 mio €', '24,26 mio €', '−9,55 mio €'], 1,
    '−9,671 + 0,117 · 260 = 20,75 mio € (10. tr. pri 290: 24,26; 11. pri 300: 25,43; 12. pri 270: 21,92). Pozor: ekstrapolacija izven opazovanih 150–220.'),
  Q('Primer 4.2: korelacijski koeficient r = 0,894. Koliko je r² in kako ga interpretiramo?', ['0,95: 95 % napovedi naročil bo pravilnih', '0,80: 80 % variabilnosti naročil pojasnijo pogodbe', '0,447: povezava med pogodbami in naročili je šibka', '1,79: povezava je več kot popolna, model ni uporaben'], 1,
    'r² = 0,894² = 0,80 = pojasnjevalna (napovedna) moč modela; preostalih 20 % pojasnjujejo drugi dejavniki.'),
  Q('Eksponentno glajenje α = 0,4, povpraševanje 90, 110, 80, 100 (tedni 1–4), F₂ = 90 (naivna). Napovedi za 3. in 4. teden ter PANN za 2.–4. teden?', ['F₃ = 94; F₄ = 91,2; PANN = 14,3', 'F₃ = 98; F₄ = 90,8; PANN = 47,2', 'F₃ = 98; F₄ = 90,8; PANN = 15,7', 'F₃ = 102; F₄ = 93,2; PANN = 16,1'], 2,
    'F₃ = 90 + 0,4 · (110 − 90) = 98; F₄ = 98 + 0,4 · (80 − 98) = 90,8; napake 20, −18, 9,2 → PANN = 47,2/3 = 15,7 (pri α = 0,2 je PANN 14,3 → izberemo 0,2).'),
]);

module.exports = { teorija, rac };
