/* Makroekonomija: naloge povezovanja. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const M = (q, pairs, explanation) => ({ type: 'match', q, pairs: pairs.map(([term, def]) => ({ term, def })), explanation });

const izpit = [
  withId('q8pzqot', M('Poveži vrsto brezposelnosti z njenim vzrokom.', [
    ['Frikcijska', 'Menjava služb ali prvi vstop na trg dela'],
    ['Strukturna', 'Neusklajenost ponudbe in povpraševanja po delu, npr. propad panoge'],
    ['Ciklična', 'Premajhno agregatno povpraševanje v recesiji'],
    ['Sezonska', 'Odvisna od letnega časa'],
    ['NAIRU', 'Najnižja stopnja brezposelnosti, ki še ne pospešuje inflacije'],
  ], 'Frikcijska in strukturna brezposelnost obstajata tudi pri polni zaposlenosti, ciklična le v recesiji.')),
  withId('q1q5ef4u', M('Poveži ukrep oziroma pojem ekonomske politike z opisom.', [
    ['Fiskalna politika', 'Vlada uravnava državno porabo G in davke T'],
    ['Monetarna politika', 'Centralna banka uravnava količino denarja in obrestne mere'],
    ['Učinek izrinjanja', 'Deficit dvigne obrestne mere in izrine zasebne naložbe'],
    ['Avtomatski stabilizatorji', 'Progresivni davki in nadomestila, ki sami blažijo cikel'],
    ['Kvantitativno popuščanje', 'Centralna banka kupuje dolgoročne obveznice'],
  ], 'Učinek izrinjanja je temeljna omejitev fiskalne politike; kvantitativno popuščanje je nekonvencionalna monetarna politika.')),
  withId('qgvlrhl', M('Poveži sestavino agregatnega povpraševanja z vsebino.', [
    ['C', 'Zasebna potrošnja gospodinjstev'],
    ['I', 'Investicije podjetij'],
    ['G', 'Državna poraba'],
    ['NX', 'Neto izvoz: izvoz minus uvoz'],
  ], 'AD = C + I + G + NX.')),
  withId('q17ym9xi', M('Poveži makroekonomski pojem z opredelitvijo.', [
    ['Potencialni BDP', 'Največji BDP, vzdržen ob razumni stabilnosti cen'],
    ['Recesija', 'Upad BDP v vsaj dveh zaporednih trimesečjih'],
    ['Stagflacija', 'Stagnacija ob visoki inflaciji'],
    ['Likvidnostna past', 'Pri zelo nizkih obrestnih merah dodaten denar ne zniža obresti'],
    ['Seniorage', 'Prihodek centralne banke od izdajanja denarja'],
  ], 'Pojmi iz poglavij o gospodarskih ciklih in monetarni politiki.')),
  withId('q1kwb7sy', M('Poveži vrsto davka z njeno značilnostjo.', [
    ['Progresivni davek', 'Mejna davčna stopnja je večja od povprečne (dohodnina)'],
    ['Proporcionalni davek', 'Mejna in povprečna davčna stopnja sta enaki'],
    ['Regresivni davek', 'Mejna davčna stopnja je manjša od povprečne'],
    ['Posredni davki', 'DDV in trošarine; omogočajo prevaljevanje'],
    ['Neposredni davki', 'Dohodnina in davek od dobička; bremenijo neposredno zavezanca'],
  ], 'Progresivnost presojamo po razmerju med mejno in povprečno davčno stopnjo.')),
  withId('quh43al', M('Poveži avtorja oziroma dogodek z idejo.', [
    ['Adam Smith', 'Nevidna roka trga'],
    ['Keynes', 'Agregatno povpraševanje in državno poseganje v recesiji'],
    ['Bretton Woods (1944)', 'Stalne, a prilagodljive paritete do dolarja; IMF in Svetovna banka'],
    ['Racionalna pričakovanja', 'Pričakovani ukrepi vlade ne vplivajo na realni BDP'],
    ['Phillipsova krivulja', 'Kratkoročna zamenjava med inflacijo in brezposelnostjo'],
  ], 'Šole ekonomske misli in mednarodni monetarni sistem po 2. svetovni vojni.')),
];

module.exports = {
  id: 'makro',
  parts: [{ id: 'izpit', decks: [{ id: 'makro-povezi', name: 'Povezovanje pojmov', questions: izpit }] }],
};
