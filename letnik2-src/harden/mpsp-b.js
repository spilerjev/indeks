// MPSP: težji napačni odgovori, 2. serija (november 2026).
module.exports = [
  ['Kakšna je poslovna strategija YG (povezani fitnes)?', [
    'Stroškovno vodstvo z najnižjo ceno med vsemi fitnesi',
    'Nišna strategija za profesionalne in vrhunske športnike',
    'Diferenciacija z vrhunsko opremo po premijski ceni'], 3,
    'Diferenciacija s priročnostjo in prilagodljivostjo po dostopni ceni'],
  ['Katera je nevarnost iz okolja za YG?', [
    'Razmah hibridnega dela, ki zmanjšuje obisk fitnesov',
    'Napredek umetne inteligence v osebnem treniranju',
    'Staranje prebivalstva in manjši delež mladih vadečih'], 3,
    'Vrnitev ljudi v fitnese in lahko posnemljiva konkurenca'],
  ['Fitnes: 6 trenerjev, 2 izmeni po 4 h, skupine po 4 stranke', ['48', '96', '384'], 3, '192'],
  ['Kateri ukrep najbolj poveča prispevek za kritje (izhodišče 10.500)?', [
    'Prodaja +50 % (18.000)', 'Finančni stroški −50 % (12.750)', 'Cena +10 % (21.000)'], 3, 'Proizvodni stroški −20 % (22.500)'],
  ['Kaj je ozko grlo procesa?', [
    'Aktivnost z najdaljšim časom v procesnem diagramu',
    'Resurs z največjo zmogljivostjo, ki je najbolj obremenjen',
    'Aktivnost na kritični poti, ki traja najdlje'], 3,
    'Resurs z najmanjšo zmogljivostjo, ki določa zmogljivost'],
  ['Kritična pot O1 → O3 → O4 → O5 = 140 min', [
    'Poveča (P) - vsak podaljšek podaljša TPČ',
    'Ne spremeni (N) - O2 ni na kritični poti',
    'Zmanjša (Z) - O2 se izvaja vzporedno'], 3,
    'Ne vemo (O) - kritična postane nad 20 min'],
  ['D1: O1 (20) + O5 (30), D2: O2 (20) + O4 (40), D3: O3 (20) + O6 (30), vsak 300 min/dan (zmogljivost 5 proizv./dan). D1 prevzame', [
    'Poveča se na 6', 'Ostane 5', 'Poveča se na 7,5'], 1, 'Zmanjša se na 4,3'],
  ['Urgenca: P = 50 bolnikov/h, čakajočih na prijavo Z = 30', [
    '1,67 min', '15 min', '30 min'], 0, '36 min'],
  ['Kako zaokrožimo cikel, ki ni celo število', [
    'Navzgor - da ne preobremenimo mest',
    'Na najbližje celo število',
    'Ga ne zaokrožujemo, ostane decimalen'], 1, 'Navzdol - da dosežemo količino'],
  ['Kako izračunamo minimalno število delovnih mest?', [
    'c / Σt, zaokroženo navzgor', 'Σt · c, zaokroženo navzdol', 'Σt / c, zaokroženo navzdol'], 0, 'Σt / c, zaokroženo navzgor'],
  ['Kako izračunamo učinkovitost linije?', [
    'c / Σt', 'n · c / Σt', '1 − Σt/(n · c)'], 1, 'Σt / (n · c)'],
  ['Katero pravilo uporabljamo pri razporejanju nalog na delovna mesta?', [
    'Najprej najkrajša naloga (ob izenačenju: manj sledečih nalog)',
    'Najprej naloga z največ predhodnimi nalogami',
    'Najprej naloga, ki je v diagramu najbolj levo'], 1,
    'Najprej najdaljša naloga (ob izenačenju: več sledečih)'],
  ['Katero delovno mesto je ozko grlo linije?', [
    'Tisto z najmanj dodeljenimi nalogami',
    'Prvo delovno mesto na liniji',
    'Tisto z največ prostega časa v ciklu'], 1, 'Tisto z najdaljšim časom obdelave'],
  ['Kaj počne metoda CRAFT?', [
    'Uravnoteži montažno linijo po pravilu najdaljše naloge',
    'Napoveduje povpraševanje z eksponentnim glajenjem',
    'Izračuna kritično pot in rezervne čase projekta'], 3,
    'Zamenjuje pare naprav in zmanjšuje Σ prenosi × razdalja'],
  ['Kaj je naivna metoda napovedovanja?', [
    'F_t = povprečje vseh preteklih obdobij',
    'F_t = povprečje zadnjih treh obdobij',
    'F_t = D_(t−1) + trend zadnjega obdobja'], 3, 'F_t = D_(t−1)'],
  ['Formula eksponentnega glajenja je:', [
    'F_t = F_(t−1) + α (F_(t−1) − D_(t−1))',
    'F_t = α · D_(t−1) + α · F_(t−1)',
    'F_t = D_(t−1) + α (D_(t−1) − F_(t−1))'], 0, 'F_t = F_(t−1) + α (D_(t−1) − F_(t−1))'],
  ['Po čem izberemo zanesljivejšo metodo napovedovanja?', [
    'Po kumulativni napaki (KNN) blizu 0',
    'Po najvišji napovedi povpraševanja',
    'Po najmanjšem α pri glajenju'], 3, 'Po nižji PANN (MAD)'],
  ['Regresija naročil na sklenjene pogodbe da r² = 0,799', [
    '80 % napovedi je točno pravilnih',
    'Korelacijski koeficient je 0,799',
    'Napaka napovedi je približno 20 %'], 3, '80 % variabilnosti pojasnijo pogodbe'],
  ['Zakaj je napoved z regresijo za x = 260', [
    'Ker je korelacija r premajhna',
    'Ker je naklon b negativen',
    'Ker je vzorec n premajhen'], 1, 'Ker gre za ekstrapolacijo'],
  ['Napake drseče sredine: −5, +15, −10', [
    'Eksponentno glajenje (PANN 10,8)',
    'Eksponentno glajenje (KNN −8,4)',
    'Drseča sredina (KNN 0)'], 3, 'Drseča sredina (PANN 10,0)'],
  ['Če se pri neodvisnem povpraševanju povečajo stroški skladiščenja:', [
    'Količina naročila se poveča, naročamo redkeje',
    'Dobavni rok se podaljša, TPN se poveča',
    'Varnostna zaloga se poveča, EOQ ostane'], 3, 'Količina naročila se zmanjša, naročamo pogosteje'],
  ['(Izpit) S čim lahko podjetje zmanjšuje sezonska nihanja', [
    'S spreminjanjem števila zaposlenih in z nadurnim delom',
    'S podizvajalci in začasnim najemom dodatne opreme',
    'Z gradnjo zalog v mirnem obdobju za sezono'], 0,
    'Z diferenciacijo cen, promocijo, odlogi in rezervacijami'],
];
