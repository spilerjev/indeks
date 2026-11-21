/* Matematika: naloge povezovanja. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const M = (q, pairs, explanation) => ({ type: 'match', q, pairs: pairs.map(([term, def]) => ({ term, def })), explanation });

const k1 = [
  withId('q1mpah5j', M('Poveži pogoj na odvod z lastnostjo funkcije.', [
    ['f′(x) > 0', 'Funkcija narašča'],
    ['f′(x) = 0', 'Stacionarna točka'],
    ['f″(x) > 0', 'Funkcija je konveksna'],
    ['f″(x) < 0', 'Funkcija je konkavna'],
    ['f″ spremeni predznak', 'Prevoj'],
  ], 'Prvi odvod opisuje monotonost, drugi ukrivljenost; v stacionarni točki o ekstremu odloča drugi odvod.')),
  withId('q1obi5fk', M('Poveži pojem iz finančne matematike z opisom.', [
    ['Prenumerandni znesek', 'Dospe na začetku obdobja'],
    ['Postnumerandni znesek', 'Dospe na koncu obdobja'],
    ['Obrestno obrestni račun', 'Obresti se pripišejo glavnici in naprej obrestujejo'],
    ['Diskontiranje', 'Izračun sedanje vrednosti prihodnjega zneska'],
    ['Anuiteta', 'Enak znesek v enakih časovnih presledkih'],
  ], 'Razlika med prenumerandnim in postnumerandnim plačilom je ena obrestovalna doba.')),
];

const k2 = [
  withId('qyerkle', M('Poveži pojem iz linearne algebre z opisom.', [
    ['det A ≠ 0', 'Inverzna matrika obstaja'],
    ['det A = 0', 'Matrika je singularna'],
    ['Transponiranje', 'Zamenjava vrstic in stolpcev'],
    ['Enotska matrika I', 'A · I = A'],
    ['Cramerjevo pravilo', 'Rešitev sistema z determinantami'],
  ], 'Inverz obstaja natanko tedaj, ko je determinanta različna od nič.')),
  withId('ql56lez', M('Poveži dogodke oziroma pojem iz verjetnosti s formulo.', [
    ['Nezdružljiva (izključujoča) dogodka', 'P(A ∪ B) = P(A) + P(B)'],
    ['Neodvisna dogodka', 'P(A ∩ B) = P(A) · P(B)'],
    ['Pogojna verjetnost', 'P(A | B) = P(A ∩ B) / P(B)'],
    ['Nasprotni dogodek', 'P(A′) = 1 − P(A)'],
    ['Gostota verjetnosti', 'f(x) ≥ 0 in ∫ f(x) dx = 1'],
  ], 'Osnovna pravila računanja z verjetnostmi.')),
];

module.exports = {
  id: 'mat',
  parts: [
    { id: 'k1', decks: [{ id: 'mat-k1-povezi', name: 'Povezovanje pojmov', questions: k1 }] },
    { id: 'k2', decks: [{ id: 'mat-k2-povezi', name: 'Povezovanje pojmov', questions: k2 }] },
  ],
};
