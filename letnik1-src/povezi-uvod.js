/* Uvod v poslovanje: naloge povezovanja. */
const M = (q, pairs, explanation) => ({ type: 'match', q, pairs: pairs.map(([term, def]) => ({ term, def })), explanation });

const k1 = [
  M('Poveži poslovno prvino s primerom oziroma značilnostjo.', [
    ['Delovna sredstva', 'Stroji in zgradbe; vrednost prenašajo postopno z amortizacijo'],
    ['Predmeti dela', 'Material in surovine; v učinek preidejo v celoti'],
    ['Delo', 'Delovna sila zaposlenih'],
    ['Storitve', 'Tuje storitve, npr. prevoz in vzdrževanje'],
  ], 'Štiri poslovne prvine so delovna sredstva, predmeti dela, delo in storitve; vsaka povzroča svojo naravno vrsto stroškov.'),
  M('Poveži ekonomsko kategorijo z njenim pomenom.', [
    ['Strošek', 'Cenovno izražena poraba prvin: potrošek × cena'],
    ['Odhodek', 'Stroški prodanih učinkov'],
    ['Izdatek', 'Odliv denarja'],
    ['Prihodek', 'Nastane ob izstavitvi računa'],
    ['Prejemek', 'Nastane ob plačilu računa'],
  ], 'Stroški in odhodki so poslovni tokovi, izdatki in prejemki denarni; amortizacija je strošek, ki ni izdatek.'),
  M('Poveži vrsto sredstev z opisom.', [
    ['Osnovna sredstva', 'Dolgoročno vezano premoženje, vrednost prenaša prek amortizacije'],
    ['Obratna sredstva', 'Denar, zaloge in terjatve; obrnejo se večkrat na leto'],
    ['Finančne naložbe', 'Dana posojila, delnice, obveznice, depoziti'],
    ['Zemljišča', 'Osnovno sredstvo, ki se ne amortizira'],
  ], 'Sredstva ločimo po hitrosti obračanja in načinu prenašanja vrednosti na učinke.'),
  M('Poveži vrsto stroškov oziroma pojem s pomenom.', [
    ['Neposredni stroški', 'Natančno vemo, kateri nosilec jih je povzročil'],
    ['Posredni (splošni) stroški', 'Nosilcem jih pripišemo s ključi'],
    ['Fiksni stroški', 'V celoti neodvisni od obsega poslovanja'],
    ['Variabilni stroški', 'Spreminjajo se z obsegom poslovanja'],
    ['Stroškovni nosilec', 'Poslovni učinek: proizvod ali storitev'],
  ], 'Delitev po načinu pripisovanja (neposredni/posredni) je neodvisna od delitve po odzivnosti na obseg (fiksni/variabilni).'),
];

const k2 = [
  M('Poveži področje produkcije z značilnostjo.', [
    ['I. področje', 'Mejni proizvod je večji od povprečnega, povprečni še raste'],
    ['II. (ekonomsko) področje', 'Mejni in povprečni proizvod padata, mejni je še pozitiven'],
    ['III. področje', 'Mejni proizvod je negativen, celotni proizvod pada'],
    ['Intenzivna meja', 'Meja med II. in III. področjem, kjer je MPV = 0'],
  ], 'Racionalno se proizvaja v II. področju; področja za variabilni in fiksni faktor so simetrična.'),
  M('Poveži vrsto stroškov glede na odzivnost z njeno lastnostjo.', [
    ['Proporcionalni variabilni', 'EVC = 1, povprečni variabilni stroški so stalni'],
    ['Degresivni variabilni', 'EVC < 1, povprečni variabilni stroški padajo'],
    ['Progresivni variabilni', 'EVC > 1, povprečni variabilni stroški rastejo'],
    ['Fiksni', 'EVC = 0, z obsegom se ne spreminjajo'],
    ['Mejni', 'ΔTC/ΔQ; po izvoru v celoti variabilni'],
  ], 'Elastičnost variabilnih stroškov EVC pove, kako hitro rastejo glede na obseg.'),
  M('Poveži kazalnik uspešnosti z opredelitvijo.', [
    ['Ekonomičnost', 'Razmerje med vrednostjo učinkov in vrednostjo prvin (prihodki/odhodki)'],
    ['Produktivnost', 'Količina učinkov na enoto dela'],
    ['Rentabilnost', 'Dobiček v razmerju do vloženega kapitala'],
    ['Realna ekonomičnost', 'Ekonomičnost, merjena v stalnih cenah'],
    ['Prag rentabilnosti', 'Obseg, pri katerem prihodki pokrijejo vse stroške: Q = FC / (P − AVC)'],
  ], 'Tri temeljna načela gospodarjenja so produktivnost, ekonomičnost in rentabilnost.'),
];

module.exports = {
  id: 'uvod',
  parts: [
    { id: 'k1', decks: [{ id: 'uvp-k1-povezi', name: 'Povezovanje pojmov', questions: k1 }] },
    { id: 'k2', decks: [{ id: 'uvp-k2-povezi', name: 'Povezovanje pojmov', questions: k2 }] },
  ],
};
