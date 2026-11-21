/* Organizacijsko vedenje: naloge povezovanja. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const M = (q, pairs, explanation) => ({ type: 'match', q, pairs: pairs.map(([term, def]) => ({ term, def })), explanation });

const izpit = [
  withId('q1d00bfn', M('Poveži teorijo motivacije z njenim bistvom.', [
    ['Locke', 'Konkretni in težki cilji s povratno informacijo dvignejo uspešnost'],
    ['Adams', 'Zaznana nepravičnost: primerjava vložkov in rezultatov z drugimi'],
    ['Csikszentmihalyi', 'Zanos: ravnotežje med spretnostmi in izzivi'],
    ['Hackman in Oldham', 'Značilnosti dela (raznolikost, identiteta, pomen, avtonomija, povratna informacija)'],
    ['McGregor', 'Teorija X in teorija Y o pogledu vodje na zaposlene'],
  ], 'Po teoriji Y vodja zaposlene vključuje v reševanje problemov.')),
  withId('q1mog5ev', M('Poveži pojem iz zaznavanja in pripisovanja z opisom.', [
    ['Temeljna napaka pripisovanja', 'Precenjevanje notranjih in podcenjevanje zunanjih vzrokov'],
    ['Kelleyjeva teorija', 'Razločevalnost, konsenzualnost, doslednost'],
    ['Pygmalionov učinek', 'Visoka pričakovanja zvišajo uspešnost'],
    ['Kognitivna disonanca (Festinger)', 'Neskladje med stališči ali med vedenjem in stališči'],
    ['Naučena nemoč (Seligman)', 'Občutek izgube kontrole ob neizogibnem dogodku'],
  ], 'Procesi pripisovanja vzrokov in njihove pristranskosti.')),
  withId('q1bpmrxu', M('Poveži znano študijo oziroma model z ugotovitvijo.', [
    ['Asch', 'Pritisk skupine vodi v konformizem kljub očitni napaki'],
    ['Hawthorne', 'Norme skupine pomembno vplivajo na individualno vedenje'],
    ['Milgram', 'Okoli 65 % ljudi je ubogalo avtoriteto do najvišjega sunka'],
    ['Zimbardo', 'Vloge zapornikov in paznikov so bile dodeljene naključno'],
    ['Tuckman', 'Faze skupine: oblikovanje, viharjenje, pravila, izvajanje, zaključevanje'],
  ], 'Klasične študije socialne psihologije o vplivu skupine in avtoritete.')),
  withId('q8sn4wd', M('Poveži pojem s področja vodenja z opisom.', [
    ['Transformacijsko vodenje', 'Navdihne sprejetje skupne vizije nad lastnimi interesi'],
    ['Transakcijsko vodenje', 'Izmenjava: nagrade za doseganje ciljev'],
    ['Uslužnostno (servant) vodenje', 'Želja najprej služiti drugim'],
    ['Stekleni previs', 'Ženske pogosteje napredujejo v času krize'],
    ['Makiavelizem', 'Prepričanje, da cilj opravičuje sredstva'],
  ], 'Idealiziran vpliv (karizma) je del transformacijskega, ne transakcijskega vodenja.')),
  withId('q894er7', M('Poveži pojem s področja stresa in čustev z opisom.', [
    ['Izgorelost', 'Izčrpanost, depersonalizacija in malo osebnih uspehov'],
    ['Cannon', 'Homeostaza in odziv beg ali boj'],
    ['Površinsko igranje', 'Izražanje zahtevanih čustev, ki jih oseba ne občuti'],
    ['Konflikt oseba-vloga', 'Zahteva po vedenju, ki ni skladno z vrednotami osebe'],
    ['Dvoumnost vloge', 'Nejasnost, kaj se od osebe pričakuje'],
  ], 'Stres na delovnem mestu izvira tudi iz nejasnih ali nasprotujočih si vlog.')),
  withId('q1aow20t', M('Poveži pojem s področja vrednot in etike z opisom.', [
    ['Kohlberg', 'Prekonvencionalna, konvencionalna in postkonvencionalna stopnja'],
    ['Rokeach', 'Terminalne in instrumentalne vrednote'],
    ['Musek', 'Hedonske, potenčne, moralne in izpolnitvene vrednote'],
    ['Ugašanje etičnosti', 'Postopno bledenje etične komponente odločitve'],
    ['Etična linija', 'Kanal za anonimno prijavo kršitev etičnih načel'],
  ], 'Na postkonvencionalni stopnji človek presoja po lastnih, jasno opredeljenih načelih.')),
];

module.exports = {
  id: 'ov',
  parts: [{ id: 'izpit', decks: [{ id: 'ov-povezi', name: 'Povezovanje pojmov', questions: izpit }] }],
};
