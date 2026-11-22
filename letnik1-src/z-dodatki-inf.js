/* Informatika - dodatki za izpit: preglednice (sklici, IF, VLOOKUP, SUMIF), vrtilne tabele, Reševalec, SQL.
   Primeri in številke so lastni. Formule so zapisane s podpičjem in decimalno vejico (slovenske nastavitve). */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });   // računsko
const cards = (arr) => arr.map(([front, back]) => ({ front, back }));

const orodja = [
  C('V celici C2 je formula =B2*$E$1. Formulo skopiraš v celico C5. Kakšna formula je v C5?',
    ['=B5*$E$4', '=B5*$E$1', '=B2*$E$1', '=E5*$B$1'], 1,
    'Kopiranje za 3 vrstice navzdol premakne relativni sklic B2 v B5. Absolutni sklic $E$1 ima zaklenjena stolpec in vrstico, zato ostane enak.'),
  C('V celici C3 je formula =$A3*B$1. Kopiraš jo v celico E6. Kakšna formula nastane?',
    ['=$A6*D$1', '=$C6*D$1', '=$A6*D$4', '=$A3*B$1'], 0,
    'Premik je 2 stolpca desno in 3 vrstice navzdol. Pri $A3 je zaklenjen stolpec, vrstica se spremeni v 6; pri B$1 je zaklenjena vrstica, stolpec B pa preide v D.'),
  C('V celici A1 je vrednost 100. Kaj vrne formula =IF(A1>100;A1*0,9;A1-5)?',
    ['90', '100', '95', '105'], 2,
    'Pogoj 100 > 100 ni izpolnjen (meja ni vključena), zato se izvede tretji argument: 100 - 5 = 95.'),
  C('V A2:A7 so regije (Vzhod, Zahod, Vzhod, Sever, Vzhod, Zahod), v B2:B7 pa prodaja (120, 80, 45, 60, 35, 90). Kaj vrne =SUMIF(A2:A7;"Vzhod";B2:B7)?',
    ['165', '430', '3', '200'], 3,
    'SUMIF sešteje le vrstice, kjer je regija Vzhod: 120 + 45 + 35 = 200. Vsota vseh je 430, število vrstic z Vzhodom (COUNTIF) pa 3.'),
  C('V A2:C6 so šifre, nazivi in cene: K1 Miza 120, K2 Stol 45, K3 Omara 310, K4 Polica 60, K5 Postelja 480. Kaj vrne =VLOOKUP("K3";A2:C6;3;FALSE)?',
    ['Omara', '310', '60', '#N/A'], 1,
    'FALSE zahteva natančno ujemanje: najde vrstico K3 in vrne vrednost iz 3. stolpca obsega, to je ceno 310. Naziv Omara je v 2. stolpcu.'),
  C('V A2:A7 so spodnje meje točk (0, 50, 60, 70, 80, 90), v B2:B7 pa ocene (5, 6, 7, 8, 9, 10). Kaj vrne =VLOOKUP(74;A2:B7;2;TRUE)?',
    ['7', '9', '8', '#N/A'], 2,
    'TRUE pomeni približno ujemanje v naraščajoče urejenem prvem stolpcu: poišče največjo mejo, ki ni večja od 74, to je 70, in vrne oceno 8.'),
  Q('V vrtilni tabeli želiš prikazati skupno prodajo po regijah (vrstice) in letih (stolpci). Kam postaviš polje Prodaja?',
    ['V območje Vrednosti, povzeto z vsoto', 'V območje Vrstice, poleg polja Regija', 'V območje Filtri, da izbereš leto', 'V območje Stolpci, poleg polja Leto'], 0,
    'Številsko polje, ki ga povzemamo (seštevamo, štejemo, povprečimo), sodi v območje Vrednosti. Vrstice, stolpci in filtri določajo, po čem se podatki razvrstijo.'),
  Q('Z Reševalcem (Solver) iščeš, koliko izdelkov X in Y naj podjetje izdela, da bo dobiček največji. Kaj nastaviš kot ciljno celico?',
    ['Celici s količinama izdelkov X in Y, ki ju Reševalec spreminja', 'Celico z razpoložljivo kapaciteto stroja, ki omejuje proizvodnjo', 'Celico s ceno izdelka X, ki je vnesena kot konstanta', 'Celico s formulo za skupni dobiček, ki je odvisna od količin'], 3,
    'Ciljna celica vsebuje formulo, ki jo maksimiziramo (ali minimiziramo). Količine so spremenljive celice, kapaciteta pa nastopa v omejitvah.'),
  C('Reševalec maksimizira dobiček 30x + 20y pri omejitvah 2x + y ≤ 100 (ure stroja), x + y ≤ 80 (skladišče) ter x, y ≥ 0. Kolikšen je največji dobiček?',
    ['1.500 €', '1.600 €', '1.800 €', '2.400 €'], 2,
    'Optimum je v oglišču, kjer veljata obe omejitvi: iz 2x + y = 100 in x + y = 80 sledi x = 20, y = 60. Dobiček je 30 · 20 + 20 · 60 = 1.800 €, kar je več kot v ogliščih (50, 0) s 1.500 € in (0, 80) s 1.600 €.'),
  C('Tabela Narocila ima vrstice (stranka, znesek): (Ana, 40), (Ana, 70), (Bor, 120), (Ana, 90), (Bor, 30), (Cene, 55). Kaj poizvedba SELECT stranka, SUM(znesek) FROM Narocila WHERE znesek > 50 GROUP BY stranka vrne za Ano?',
    ['200', '160', '2', '90'], 1,
    'WHERE najprej izloči vrstice z zneskom do 50 (Anino naročilo 40), nato GROUP BY sešteje po strankah: 70 + 90 = 160.'),
  C('Tabela Kupci ima id 1, 2, 3 in 4. Tabela Narocila ima šest vrstic s kupec_id 1, 1, 2, 3, 3 in 5. Koliko vrstic vrne SELECT * FROM Kupci INNER JOIN Narocila ON Kupci.id = Narocila.kupec_id?',
    ['5', '6', '4', '7'], 0,
    'INNER JOIN vrne le pare z ujemanjem: kupca 1 in 3 imata po dve naročili, kupec 2 eno, skupaj 5. Naročilo s kupec_id 5 nima kupca, kupec 4 pa nima naročil.'),
];

module.exports = { id: 'inf', parts: [
  { id: 'izpit',
    decks: [
      { id: 'inf-iz-orodja', name: 'Preglednice, Reševalec in SQL', calc: true, questions: orodja },
    ],
    flashcards: [
      { id: 'inf-c-izpit', name: 'Preglednice in SQL', cards: cards([
        ['Absolutni sklic $A$1', 'Pri kopiranju formule se ne spremeni (zaklenjena stolpec in vrstica).'],
        ['Mešana sklica $A1 in A$1', '$A1 zaklene stolpec, A$1 zaklene vrstico.'],
        ['SUMIF', '=SUMIF(obseg; pogoj; obseg_vsote): sešteje le vrednosti, kjer je pogoj izpolnjen.'],
        ['VLOOKUP', '=VLOOKUP(iskano; tabela; št_stolpca; FALSE/TRUE): FALSE natančno, TRUE približno ujemanje v urejenem stolpcu.'],
        ['Vrtilna tabela - območja', 'Filtri, Stolpci, Vrstice in Vrednosti (povzetek: vsota, štetje, povprečje).'],
        ['Reševalec (Solver)', 'Ciljna celica (max/min), spremenljive celice in omejitve.'],
        ['WHERE : HAVING', 'WHERE filtrira vrstice pred združevanjem, HAVING skupine po GROUP BY.'],
        ['INNER JOIN : LEFT JOIN', 'INNER vrne le ujemajoče se vrstice; LEFT vrne vse iz leve tabele, manjkajoče z NULL.'],
      ]) },
    ] },
] };
