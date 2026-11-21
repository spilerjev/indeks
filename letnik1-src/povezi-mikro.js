/* Mikroekonomija: naloge povezovanja (pojem ↔ opis). Dejstva usklajena z obstoječimi vprašanji in zapiski. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const M = (q, pairs, explanation) => ({ type: 'match', q, pairs: pairs.map(([term, def]) => ({ term, def })), explanation });

const k1 = [
  withId('qqwsxas', M('Poveži temeljni ekonomski pojem z njegovim pomenom.', [
    ['Oportunitetni strošek', 'Količina dobrine, ki se ji odpovemo za enoto druge dobrine'],
    ['Ekonomske dobrine', 'Redke dobrine: povpraševanje pri ceni nič presega ponudbo'],
    ['Ravnotežna cena', 'Cena, pri kateri se izenačita obseg ponudbe in povpraševanja'],
    ['Ceteris paribus', 'Ob nespremenjenih drugih pogojih opazujemo vpliv ene spremenljivke'],
    ['Proizvodni dejavniki po generičnem nastanku', 'Zemlja, delo in kapital'],
  ], 'Osnovni pojmi iz uvodnega dela: redkost, alternativni strošek in tržno ravnotežje.')),
  withId('q1mn3w00', M('Poveži vrsto elastičnosti oziroma njen predznak s pomenom.', [
    ['Cenovna elastičnost povpraševanja', 'Odzivnost obsega povpraševanja na spremembo cene dobrine'],
    ['Križna elastičnost > 0', 'Dobrini sta substituta'],
    ['Križna elastičnost < 0', 'Dobrini sta komplementa'],
    ['Dohodkovna elastičnost > 0', 'Normalna dobrina'],
    ['Dohodkovna elastičnost < 0', 'Inferiorna dobrina'],
  ], 'Predznak križne elastičnosti loči substitute (+) od komplementov (−), predznak dohodkovne pa normalne (+) od inferiornih (−) dobrin.')),
  withId('q1seea9t', M('Poveži predpostavko oziroma pojem iz teorije potrošnika z opisom.', [
    ['Popolnost preferenc', 'Potrošnik zna primerjati vsaki dve kombinaciji dobrin'],
    ['Tranzitivnost', 'Če ima raje A kot B in B kot C, ima raje tudi A kot C'],
    ['Več je bolje kot manj', 'Večja količina dobrin prinaša večjo koristnost'],
    ['Ordinalno razvrščanje', 'Kombinacije le razvrstimo, ne merimo, za koliko se razlikujejo'],
    ['Ravnotežje po kardinalni teoriji', 'MU_A / P_A = MU_B / P_B'],
  ], 'Tri temeljne predpostavke o preferencah so popolnost, tranzitivnost in "več je bolje"; ravnotežje je, ko zadnji evro v vsaki dobrini prinese enako mejno koristnost.')),
  withId('q1imx847', M('Poveži spremembo na trgu z njenim učinkom.', [
    ['Rast dohodka (normalna dobrina)', 'Krivulja povpraševanja se premakne v desno'],
    ['Izboljšanje tehnologije proizvodnje', 'Krivulja ponudbe se premakne v desno'],
    ['Sprememba cene same dobrine', 'Premik vzdolž krivulje, ne premik krivulje'],
    ['Podražitev substituta', 'Povpraševanje po dobrini se poveča'],
    ['Podražitev komplementa', 'Povpraševanje po dobrini se zmanjša'],
  ], 'Dejavniki povpraševanja (dohodek, cene drugih dobrin, okus) premikajo krivuljo D, tehnologija in cene inputov krivuljo S; lastna cena pomeni premik vzdolž krivulje.')),
];

const k2 = [
  withId('qdcyaml', M('Poveži krivuljo stroškov z njeno lastnostjo.', [
    ['MC (mejni stroški)', 'Seka AVC in ATC v njunem minimumu'],
    ['AFC (povprečni fiksni stroški)', 'Z večanjem obsega nenehno padajo'],
    ['LAC (dolgoročni povprečni stroški)', 'Ovojnica kratkoročnih krivulj povprečnih stroškov'],
    ['AVC (povprečni variabilni stroški)', 'Variabilni stroški na enoto proizvoda'],
    ['TC (celotni stroški)', 'Vsota fiksnih in variabilnih stroškov'],
  ], 'Ker MC meri strošek dodatne enote, sečeta AVC in ATC v minimumu; AFC = FC/Q pada z obsegom.')),
  withId('q1xz7gnp', M('Poveži pogoj s posledico za podjetje v popolni konkurenci.', [
    ['MR = MC', 'Obseg proizvodnje z največjim dobičkom'],
    ['P ≥ AVC_min', 'Kratkoročno podjetje proizvaja'],
    ['P < AVC_min', 'Podjetje kratkoročno ustavi proizvodnjo'],
    ['P = ATC_min', 'Normalni dobiček, dolgoročno ravnotežje'],
    ['Krivulja MC nad minimumom AVC', 'Kratkoročna krivulja ponudbe podjetja'],
  ], 'Pogoj MR = MC velja za vsa podjetja; pri popolnem konkurentu je MR = P, zato je ponudba del krivulje MC nad minimumom AVC.')),
  withId('q1jxc28', M('Poveži pojem iz teorije proizvodnje z opisom.', [
    ['Kratko obdobje', 'Vsaj en proizvodni dejavnik je stalen'],
    ['Maksimum celotnega proizvoda', 'Mejni proizvod je enak 0'],
    ['Naklon izokoste', '−w/r (razmerje cen dela in kapitala)'],
    ['Optimalna kombinacija dejavnikov', 'MP_L / w = MP_K / r'],
    ['Zakon padajočih donosov', 'Mejni proizvod variabilnega dejavnika sčasoma pada'],
  ], 'Optimum je tam, kjer je izokvanta tangentna na izokosto: razmerje mejnih proizvodov je enako razmerju cen dejavnikov.')),
];

const izpit = [
  withId('qhvu7c7', M('Poveži tržno strukturo z njeno značilnostjo.', [
    ['Popolna konkurenca', 'Veliko ponudnikov, homogeno blago, podjetje sprejema ceno'],
    ['Monopol', 'En ponudnik; krivulja povpraševanja podjetja je tržna krivulja'],
    ['Monopolistična konkurenca', 'Veliko ponudnikov z diferenciranimi proizvodi'],
    ['Oligopol', 'Malo ponudnikov, strateška soodvisnost odločitev'],
    ['Monopson', 'En sam kupec, npr. edini delodajalec na trgu'],
  ], 'Strukture ločimo po številu ponudnikov, homogenosti proizvodov in vplivu na ceno; monopson je zrcalna slika monopola na strani kupca.')),
  withId('qadam0r', M('Poveži pojem s tržnih struktur z opisom.', [
    ['Naravni monopol', 'Visoki fiksni in nizki mejni stroški, ATC pada'],
    ['Nashevo ravnotežje', 'Nihče nima razloga enostransko spremeniti strategije'],
    ['Uspešen kartel', 'Neelastično povpraševanje in dogovor o količinah'],
    ['Cenovna diskriminacija', 'Različnim kupcem zaračuna različne cene za isti proizvod'],
  ], 'Pojmi iz poglavij o monopolu in oligopolu.')),
];

module.exports = {
  id: 'mikro',
  parts: [
    { id: 'k1', decks: [{ id: 'mikro-k1-povezi', name: 'Povezovanje pojmov', questions: k1 }] },
    { id: 'k2', decks: [{ id: 'mikro-k2-povezi', name: 'Povezovanje pojmov', questions: k2 }] },
    { id: 'izpit', decks: [{ id: 'mikro-iz-povezi', name: 'Povezovanje pojmov (tržne strukture)', questions: izpit }] },
  ],
};
