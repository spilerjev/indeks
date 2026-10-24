// Statistična analiza: težji napačni odgovori (zamenjave sorodnih pojmov, enake dolžine)
module.exports = [
  ['Kaj je statistična enota?', [
    'Lastnost enote, ki jo opazujemo in merimo (spremenljivka)',
    'Množica vseh enot, na katere se raziskava nanaša',
    'Skupna značilnost vseh enot v populaciji (parameter)'], 1, 'Posamezni nosilec informacij: oseba, podjetje, izdelek'],
  ['Kaj je parameter?', [
    'Vrednost spremenljivke, izmerjena pri eni statistični enoti',
    'Ocena značilnosti populacije, izračunana iz vzorca',
    'Merska enota, v kateri je izražena spremenljivka'], 3, 'Značilnost populacije kot celote (μ, σ, Me, delež)'],
  ['Na kateri merski lestvici merimo stopnjo izobrazbe?', [
    'Imenski (nominalni)', 'Razmični (intervalni)', 'Razmernostni'], 1, 'Urejenostni (ordinalni)'],
  ['Na kateri lestvici je hišna', [
    'Urejenostni (ordinalni)', 'Razmični (intervalni)', 'Razmernostni'], 0, 'Imenski (nominalni)'],
  ['Na kateri lestvici je temperatura v °C?', [
    'Imenski', 'Urejenostni', 'Razmernostni'], 2, 'Razmični (intervalni)'],
  ['Na kateri lestvici je temperatura v kelvinih', [
    'Razmični', 'Urejenostni', 'Imenski'], 0, 'Razmernostni'],
  ['Kateri parameter smemo izračunati za imensko spremenljivko', [
    'Mediano', 'Aritmetično sredino', 'Koeficient variacije'], 3, 'Modus'],
  ['Kateri parameter zahteva RAZMERNOSTNO lestvico?', [
    'Modus', 'Mediana', 'Aritmetična sredina'], 2, 'Koeficient variacije'],
  ['Kaj pomeni, da so merske lestvice hierarhične', [
    'Vsako spremenljivko lahko merimo na vseh štirih lestvicah',
    'Nižja lestvica je natančnejša od višje in zato bolj zaželena',
    'Lestvice se medsebojno izključujejo in jih ne moremo primerjati'], 0, 'Višja lestvica omogoča vse, kar nižja, in še več'],
  ['Pravilo za določanje lestvice', [
    'Ali ima ničla pomen → ali lahko uredim → ali ima razlika pomen',
    'Ali je število → ali je zvezna → ali je diskretna',
    'Ali je vzorec → ali je populacija → ali je parameter'], 3, 'Ali lahko uredim → ali ima razlika pomen → ali ima ničla pomen'],
  ['Kakovost žarnice (pokvarjena / brezhibna) je:', [
    'Številska, diskretna', 'Urejenostna', 'Razmernostna'], 2, 'Imenska (dihotomna)'],
  ['Razlika med opisno in sklepno statistiko je predvsem v:', [
    'Vrsti formul: opisna računa povprečja, sklepna pa deleže',
    'Vrsti podatkov: opisna dela s številskimi, sklepna z imenskimi',
    'Pogostosti uporabe: opisna za velike vzorce, sklepna za male'], 3, 'Namenu: povzetek podatkov proti posploševanju na populacijo'],
  ['Zakaj pri vzorčni varianci delimo z n − 1?', [
    'Ker je vzorec vedno za eno enoto manjši od populacije',
    'Ker mora biti varianca vedno pozitivna',
    'Ker tako dobimo enako enoto kot pri standardnem odklonu'], 3, 'Za nepristransko oceno: eno prostostno stopnjo porabi ȳ'],
  ['Q₁ plač v podjetju je 1200 €', [
    '25 % zaposlenih ima plačo nad 1200 €',
    'Povprečna plača najnižje četrtine zaposlenih je 1200 €',
    'Delež zaposlenih s plačo 1200 € je 25 %'], 3, 'Četrtina ima plačo do 1200 €, 75 % višjo'],
  ['Kako interpretiramo kv = 0,42', [
    'Prejemki se med zaposlenimi razlikujejo za 42 %',
    '42 % zaposlenih ima prejemke nad povprečjem',
    'Povprečje je 42 % standardnega odklona'], 3, 'Standardni odklon je 42 % povprečja'],
  ['Zakaj pri interpretaciji variance', [
    'Ker je varianca vedno brezenotska količina',
    'Ker je varianca delež populacije, ne vrednost spremenljivke',
    'Ker je to ocena vzorca, enote pa pišemo samo pri parametrih'], 3, 'Enota "evro na kvadrat" nima pomena; zapišemo 163,16 · 10⁶'],
  ['Zakaj odklone od povprečja pri varianci kvadriramo?', [
    'Da so vrednosti večje in lažje berljive',
    'Da dobimo enoto, ki je enaka enoti spremenljivke',
    'Da z vsoto kvadratov dobimo mediano'], 3, 'Ker je vsota navadnih odklonov vedno 0'],
  ['Kaj na boxplotu (R) predstavlja zgornji ročaj?', [
    'Absolutni maksimum, vključno z osamelci',
    'Tretji kvartil Q₃',
    '90. percentil porazdelitve'], 3, 'Največjo vrednost brez osamelcev'],
  ['Kaj je v izpisu frq() stolpec "Value"', [
    'Spodnje meje razredov',
    'Kumulativne frekvence razredov',
    'Relativne frekvence razredov'], 3, 'Sredine razredov'],
  ['Kaj pomeni stolpec "Valid %" v izpisu frq()?', [
    'Kumulativni delež enot do vključno tega razreda',
    'Delež veljavnih vzorcev med vsemi vzorci',
    'Odstotek enot, ki so osamelci'], 3, 'Relativna frekvenca brez manjkajočih vrednosti'],
  ['Zakaj se ocene iz razvrščenih podatkov', [
    'Zaradi napake pri izračunu v programu R',
    'Ker smo pri razvrščanju spremenili vzorec',
    'Ker smo pri razvrščenih podatkih delili z n namesto z n − 1'], 3, 'Ker smo vrednosti nadomestili s sredinami razredov'],
  ['F₃ = 44 (n = 46)', [
    '44 zaposlenih ima prejemke med 40.500 in 60.500 €',
    '44 % zaposlenih ima prejemke do 60.500 €',
    '44 zaposlenih ima prejemke nad 60.500 €'], 3, '44 enot ima prejemke do vključno 60.500 €'],
  ['Kaj želi profesorica pri zapisu rešitve', [
    'Samo končni rezultat, če je pravilen',
    'Samo R ukaz, s katerim je bil rezultat izračunan',
    'Samo formulo brez vstavljenih številk'], 3, 'Formulo, številke, rezultat in interpretacijo z enoto'],
  ['V izpisu pastecs::stat.desc() je coef.var izražen:', [
    'V odstotkih (npr. 41,9)',
    'V enotah spremenljivke',
    'Kot kvadrat enote'], 3, 'Kot delež (npr. 0,419)'],
  ['Kaj je razlika med frekvenčno in verjetnostno porazdelitvijo?', [
    'Frekvenčna velja za zvezne, verjetnostna za diskretne spremenljivke',
    'Verjetnostna je vedno normalna, frekvenčna poljubna',
    'Frekvenčna vsebuje relativne, verjetnostna absolutne frekvence'], 3, 'Frekvenčna je empirična, verjetnostna teoretični model'],
  ['Kaj je f(y) pri zvezni porazdelitvi?', [
    'Verjetnost, da spremenljivka zavzame vrednost y',
    'Kumulativna verjetnost P(Y ≤ y)',
    'Kvantil porazdelitve pri dani verjetnosti'], 3, 'Gostota verjetnosti; verjetnost je ploščina pod krivuljo'],
  ['Kaj je F(y)?', [
    'Gostota verjetnosti pri y',
    'Verjetnost P(Y > y)',
    'Verjetnost P(Y = y)'], 3, 'P(Y ≤ y), porazdelitvena funkcija'],
  ['Kaj pri tem predmetu pomeni zapis Y ~ N(150, 30)?', [
    'μ = 150 in varianca σ² = 30',
    'Mediana 30 in povprečje 150',
    'Velikost vzorca 150 in σ = 30'], 3, 'μ = 150 in σ = 30'],
  ['Kaj se zgodi z zvonom, če povečamo σ', [
    'Premakne se v desno ob nespremenjeni obliki',
    'Postane višji in ožji, ploščina ostane 1',
    'Postane asimetričen v desno'], 3, 'Postane nižji in širši, ploščina ostane 1'],
  ['Koliko je mediana pri Y ~ N(5; 0,05)', [
    '5, ker pri normalni vedno velja Me = μ',
    '0,05, ker je to standardni odklon',
    'Ne moremo vedeti brez podatkov o vzorcu'], 3, '5, ker je porazdelitev simetrična'],
  ['Kaj pove z = −1,67?', [
    'Verjetnost 1,67 % pod povprečjem',
    'Vrednost je 1,67-krat manjša od povprečja',
    'Vrednost leži izven normalne porazdelitve'], 3, 'Vrednost je 1,67 σ pod povprečjem'],
  ['Katera trditev o normalni porazdelitvi NI pravilna?', [
    'Določata jo μ in σ',
    'Je simetrična in unimodalna',
    'Ploščina levo od mediane je 0,5'], 3, 'Manjši σ pomeni bolj sploščen zvon'],
  ['Pri normalni porazdelitvi za vrednost a velja F_Y(a) = F_Z(z_a)', [
    'Standardizacija spremeni ploščine pod krivuljo',
    'F_Y je pri normalni vedno enaka 0,5',
    'Z ima drugačno povprečje kot Y'], 3, 'Ploščine se ne spremenijo, zato zadošča ena tabela'],
  ['Katera trditev o vzorčenju v več stopnjah NI pravilna?', [
    'Primerno je za hierarhično urejene populacije',
    'Primarne in elementarne enote niso iste',
    'Seznama vseh enot populacije ne potrebujemo'], 3, 'Pri dani velikosti vzorca je vedno najnatančnejše'],
  ['Čas, ki so ga študenti v preteklem tednu', [
    'Ure', 'Povprečni čas študija', 'Število študentov, ki so študirali'], 3, 'Čas, namenjen študiju'],
  ['Isti primer: porazdelitev časa študija je izrazito', [
    'Porazdelitev je podobna normalni',
    'Ocena KV je 45 ur',
    'Variacijskega razmika ne moremo izračunati'], 3, 'Ocena aritmetične sredine je večja od ocene mediane'],
  ['Prva peterka košarkarjev', [
    'Prva peterka', 'Košarkarska ekipa', 'Gorsko letovišče'], 3, 'Posamezen član kluba'],
  ['Kaj velja za cenilko?', [
    'Je slučajna spremenljivka, katere vrednosti se razlikujejo od enote do enote',
    'Njen rezultat je prava vrednost parametra',
    'Ista formula velja za vse parametre'], 3, 'Funkcija vzorca; rezultat na vzorcu je ocena'],
  ['Kaj velja za standardno napako?', [
    'Meri variabilnost spremenljivke med enotami',
    'Za manjše vzorce je manjša kot za večje',
    'Ocena SE deleža je neodvisna od točkovne ocene'], 3, 'Je praviloma manjša od standardnega odklona spremenljivke'],
  ['Kdaj je med nepristranskimi cenilkami', [
    'Ko ima manjšo stopnjo tveganja',
    'Ko ima večjo standardno napako',
    'Ko je dosledna'], 3, 'Ko ima manjšo standardno napako'],
  ['Kaj je vzorčno opazovanje?', [
    'Opazovanje vseh enot populacije z namenom popolnega popisa',
    'Opazovanje samo najbolj tipičnih enot po presoji raziskovalca',
    'Zbiranje podatkov iz obstoječih registrov brez anketiranja'], 3, 'Opazovanje dela enot in sklepanje na populacijo'],
  ['Kateri NI razlog za vzorčenje?', [
    'Nižja cena raziskave',
    'Krajši čas izvedbe',
    'Popolno opazovanje včasih ni mogoče'], 3, 'Vzorčenje je vedno natančnejše od popisa'],
  ['Glavna slabost neslučajne izbire enot je:', [
    'Visoka cena izvedbe',
    'Potreben je vzorčni okvir vseh enot',
    'Dolgo trajanje terenskega dela'], 3, 'Neobjektivnost: ne moremo oceniti kakovosti ocen'],
  ['Kaj je vzorčni okvir?', [
    'Seznam enot, ki so bile izbrane v vzorec',
    'Interval zaupanja za iskani parameter',
    'Obrazec za izračun standardne napake'], 3, 'Oštevilčen seznam vseh enot populacije'],
  ['Kateri so trije koraki postopka slučajne izbire?', [
    'Anketa → analiza → poročilo',
    'Kvote → izbira → utežitev',
    'Ocena → test → odločitev'], 3, 'Okvir → generiranje slučajnih števil → izbira enot'],
  ['Kaj pomeni vzorčenje BREZ ponavljanja?', [
    'Vsaka enota je lahko izbrana večkrat',
    'Vzorec je vedno enak populaciji',
    'Enote izbiramo po vrstnem redu v okviru'], 3, 'Vsaka enota je izbrana največ enkrat'],
  ['Kaj velja pri enostavnem slučajnem vzorčenju (ESV)?', [
    'Nekateri vzorci so verjetnejši od drugih',
    'Vzorec mora biti kvotni',
    'Velikost vzorca ne vpliva na natančnost'], 3, 'Vsak vzorec iste velikosti je enako verjeten'],
  ['Koliko je vseh možnih vzorcev velikosti n', [
    'N^n', 'N!/n!', 'N · n'], 3, 'N!/(n!(N − n)!)'],
  ['Kaj je cenilka?', [
    'Ena fiksna, a nepoznana vrednost populacije',
    'Vrednost, izračunana na enem vzorcu',
    'Seznam vseh enot populacije'], 3, 'Funkcija vzorca, slučajna spremenljivka'],
  ['Kaj je vzorčna ocena (estimate)?', [
    'Slučajna spremenljivka, funkcija vzorca',
    'Populacijska vrednost parametra',
    'Standardni odklon vzorca'], 3, 'Vrednost cenilke na posameznem vzorcu'],
  ['Kaj je standardna napaka SE(ȳ)?', [
    'Standardni odklon spremenljivke Y med enotami populacije',
    'Razlika med ȳ in μ na enem vzorcu',
    'Varianca spremenljivke Y v vzorcu'], 3, 'Standardni odklon vzorčnih ocen'],
  ['Kaj pomeni, da je cenilka učinkovita?', [
    'Je nepristranska',
    'Je enostavna za izračun',
    'Je dosledna'], 3, 'Med nepristranskimi ima najmanjšo varianco'],
  ['Zakaj pri vzorčni varianci s² delimo z n − 1 in ne z n?', [
    'Da je račun enostavnejši',
    'Ker je n vedno prevelik',
    'Ker tako zahteva R'], 3, 'Da je s² nepristranska cenilka'],
  ['Kdaj se vzorčne ocene aritmetične sredine ali deleža', [
    'Vedno, ne glede na velikost vzorca',
    'Samo če je n < 30',
    'Samo pri vzorčenju s ponavljanjem'], 3, 'Pri velikih vzorcih (n ≥ 100)'],
  ['Pri vzorčenju brez ponavljanja iz končne populacije', [
    '(N + n)/N', 'n/N', '1/√n'], 3, '(N − n)/(N − 1)'],
  ['Kaj pomeni velika črka Var, SE in mala črka var, se?', [
    'Nič, zapis je poljuben',
    'Velike za populacijo, male za vzorec enote',
    'Male črke so v odstotkih'], 3, 'Velike: prave vrednosti; male: ocene iz vzorca'],
  ['Kje ima porazdelitvena funkcija normalne porazdelitve prevoj?', [
    'Pri μ − σ in μ + σ', 'Pri y = 0', 'Nima prevoja'], 3, 'Pri y = μ'],
];
