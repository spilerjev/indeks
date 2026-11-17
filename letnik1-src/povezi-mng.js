/* Management: naloge povezovanja. */
const M = (q, pairs, explanation) => ({ type: 'match', q, pairs: pairs.map(([term, def]) => ({ term, def })), explanation });

const izpit = [
  M('Poveži funkcijo managementa (Daft) z njeno vsebino.', [
    ['Planiranje', 'Postavljanje ciljev in odločanje, kako jih doseči'],
    ['Organiziranje', 'Razdelitev nalog in virov ter koordinacija oddelkov'],
    ['Vodenje', 'Vplivanje na ljudi in njihovo motiviranje za doseganje ciljev'],
    ['Kontroliranje', 'Spremljanje izvedbe, primerjava s standardi in popravki'],
  ], 'Daft opredeli management kot doseganje ciljev skozi planiranje, organiziranje, vodenje in kontroliranje.'),
  M('Poveži motivacijsko teorijo z njenim bistvom.', [
    ['Maslow', 'Hierarhija potreb, na vrhu samouresničitev'],
    ['Herzberg', 'Higieniki in motivatorji (npr. priznanje za dosežke)'],
    ['McClelland', 'Potrebe po dosežkih, vključenosti in moči'],
    ['Vroom', 'Teorija pričakovanj: valenca je vrednost izida za posameznika'],
    ['Hackman in Oldham', 'Pet jedrnih dimenzij dela'],
  ], 'Vsebinske teorije (Maslow, Herzberg, McClelland) pojasnjujejo, KAJ motivira; procesna Vroomova pojasnjuje, KAKO poteka motivacija.'),
  M('Poveži vrsto moči z njenim virom.', [
    ['Legitimna moč', 'Formalni položaj v hierarhiji'],
    ['Nagrajevalna moč', 'Možnost dodeljevanja nagrad'],
    ['Prisilna moč', 'Možnost kaznovanja'],
    ['Ekspertna moč', 'Strokovno znanje in izkušnje'],
    ['Referenčna moč', 'Občudovanje in identifikacija z vodjo (osebnostna moč)'],
  ], 'Legitimna, nagrajevalna in prisilna moč so pozicijske, ekspertna in referenčna pa osebnostni.'),
  M('Poveži managersko orodje oziroma koncept z opisom.', [
    ['SWOT', 'Prednosti, slabosti, priložnosti in nevarnosti'],
    ['Porterjevih 5 sil', 'Analiza konkurenčnih sil v panogi'],
    ['MBO (planiranje s cilji)', 'Skupno postavljanje ciljev; zahteva stabilno okolje'],
    ['PDCA', 'Demingov cikel: plan, do, check, act'],
    ['BSC', 'Uravnoteženi sistem kazalnikov (Kaplan in Norton, 1992)'],
  ], 'SWOT in Porter sodita v strateško analizo, MBO v planiranje, PDCA in BSC v kontroliranje.'),
  M('Poveži organizacijsko strukturo oziroma pojem z opisom.', [
    ['Funkcijska struktura', 'Oddelki po funkcijah (proizvodnja, prodaja, finance)'],
    ['Divizijska struktura', 'Enote po izdelkih ali regijah (npr. McDonald’s); podvajanje virov'],
    ['Matrična struktura', 'Dvojna linija poveljevanja: funkcija in projekt'],
    ['Širok kontrolni razpon', 'Vodja ima veliko neposredno podrejenih, npr. start-up'],
    ['Centralizacija', 'Primerna v kriznih časih in pri zniževanju stroškov'],
  ], 'Struktura določa, kako se razdelijo naloge in viri; divizijska je prilagodljiva, a dražja zaradi podvajanja.'),
];

module.exports = {
  id: 'mng',
  parts: [{ id: 'izpit', decks: [{ id: 'mng-povezi', name: 'Povezovanje pojmov', questions: izpit }] }],
};
