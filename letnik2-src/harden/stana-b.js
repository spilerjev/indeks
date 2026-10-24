// Statistična analiza: popravek zadnjega dela - verjetne zamenjave
module.exports = [
  ['Glavna slabost neslučajne izbire enot je:', [
    'Višja cena kot pri slučajni izbiri, ker zahteva vzorčni okvir',
    'Potreba po večjem vzorcu, da dosežemo enako natančnost',
    'Ocene so vedno pristranske, ker nimajo pričakovane vrednosti'], 3, 'Neobjektivnost: ne moremo predvideti porazdelitve ocen in njihove kakovosti'],
  ['Kaj je vzorčni okvir?', [
    'Seznam enot, ki so bile dejansko izbrane v vzorec',
    'Interval, v katerem leži iskani parameter z dano verjetnostjo',
    'Tabela vseh možnih vzorcev z vrednostmi ocen'], 3, 'Oštevilčen seznam vseh enot populacije'],
  ['Kateri so trije koraki postopka slučajne izbire?', [
    'Določitev kvot → anketiranje najlaže dosegljivih → utežitev',
    'Vzorčni okvir → izračun ocene → intervalna ocena',
    'Izbira vzorca → merjenje spremenljivke → ocena parametra'], 3, 'Okvir → generiranje slučajnih števil → izbira enot s temi številkami'],
  ['Kaj pomeni vzorčenje BREZ ponavljanja?', [
    'Vsaka enota je lahko izbrana večkrat, a vsakič v drugem vzorcu',
    'Vzorec je enak celotni populaciji, zato se enote ne ponavljajo',
    'Enote izbiramo zaporedno po vrstnem redu v okviru'], 3, 'Vsaka enota je izbrana največ enkrat'],
  ['Kaj velja pri enostavnem slučajnem vzorčenju (ESV)?', [
    'Verjetnejši so vzorci, v katerih so enote z višjimi vrednostmi',
    'Vzorec je sestavljen iz enot, ki jih izbere raziskovalec po kvotah',
    'Natančnost ocene ni odvisna od velikosti vzorca'], 3, 'Vsak vzorec iste velikosti je enako verjeten'],
  ['Koliko je vseh možnih vzorcev velikosti n', [
    'N^n (vrstni red je pomemben, enote se ponavljajo)',
    'N!/n! (vrstni red je pomemben, brez ponavljanja)',
    'N · n (vsaka enota v vsakem položaju)'], 3, 'N!/(n!(N − n)!)'],
  ['Kaj je cenilka?', [
    'Ena fiksna, a nepoznana vrednost, ki opisuje populacijo',
    'Število, izračunano na enem konkretnem vzorcu',
    'Skupna značilnost vseh enot v vzorcu'], 3, 'Funkcija vzorca, ki je slučajna spremenljivka'],
  ['Kaj je vzorčna ocena (estimate)?', [
    'Slučajna spremenljivka, ki je funkcija vzorca',
    'Populacijska vrednost, ki jo ocenjujemo',
    'Standardni odklon vzorčnih ocen'], 3, 'Vrednost cenilke na posameznem vzorcu'],
  ['Kaj je standardna napaka SE(ȳ)?', [
    'Standardni odklon spremenljivke Y med enotami populacije',
    'Razlika med vzorčno oceno in pravo vrednostjo na enem vzorcu',
    'Varianca spremenljivke Y, izračunana na vzorcu'], 3, 'Standardni odklon vzorčnih ocen'],
  ['Kaj pomeni, da je cenilka učinkovita?', [
    'Njena pričakovana vrednost je enaka parametru',
    'Z večanjem vzorca se ocene približujejo parametru',
    'Je enostavna za izračun in ne potrebuje vzorčnega okvirja'], 3, 'Med nepristranskimi ima najmanjšo varianco'],
  ['Zakaj pri vzorčni varianci s² delimo z n − 1 in ne z n?', [
    'Ker je vzorec manjši od populacije za eno enoto',
    'Ker moramo vsaj eno enoto uporabiti kot referenčno',
    'Ker bi z n dobili vrednost, ki je v povprečju prevelika'], 3, 'Za nepristransko oceno variance'],
  ['Kdaj se vzorčne ocene aritmetične sredine ali deleža', [
    'Vedno, tudi pri majhnih vzorcih iz poljubne porazdelitve',
    'Samo pri majhnih vzorcih (n < 30)',
    'Samo pri vzorčenju s ponavljanjem'], 3, 'Pri velikih vzorcih (n ≥ 100) po CLI'],
  ['Pri vzorčenju brez ponavljanja iz končne populacije', [
    '(N + n)/N', 'n/(N − 1)', '(N − 1)/(N − n)'], 3, '(N − n)/(N − 1)'],
  ['Kaj pomeni velika črka Var, SE in mala črka var, se?', [
    'Velike črke so za populacijo, male za vzorec enote',
    'Velike črke so v osnovnih enotah, male v odstotkih',
    'Zapis je poljuben, pomen določi avtor naloge'], 3, 'Velike: prave vrednosti; male: ocene iz vzorca'],
  ['Kje ima porazdelitvena funkcija normalne porazdelitve prevoj?', [
    'Pri μ − σ in μ + σ, kjer ima prevoja zvon',
    'Pri y = 0, kjer je F(0) = 0,5',
    'Nima prevoja, ker je monotono naraščajoča'], 3, 'Pri y = μ, kjer je F = 0,5'],
  ['Kdaj je med nepristranskimi cenilkami', [
    'Ko ima manjšo stopnjo tveganja α',
    'Ko ima večjo standardno napako',
    'Ko je poleg tega tudi dosledna'], 3, 'Ko ima manjšo standardno napako'],
  ['Kateri NI razlog za vzorčenje?', [
    'Nižja cena raziskave',
    'Krajši čas zbiranja podatkov',
    'Popolno opazovanje včasih uniči enote'], 3, 'Vzorčenje je vedno natančnejše od popisa'],
];
