/* Informatika: naloge povezovanja. */
const M = (q, pairs, explanation) => ({ type: 'match', q, pairs: pairs.map(([term, def]) => ({ term, def })), explanation });

const k1 = [
  M('Poveži pojem iz strateške vloge informatike z opisom.', [
    ['Porterjevih 5 tekmovalnih sil', 'Konkurenti, novi vstopi, substituti, kupci, dobavitelji'],
    ['Porterjeve osnovne strategije', 'Nižji stroški, razločevanje, tržna usmeritev'],
    ['Temeljna aktivnost vrednostne verige', 'Npr. izhodna logistika'],
    ['Vrednostni sistem', 'Vrednostne verige vseh členov oskrbovalne verige skupaj'],
    ['CRM', 'Sistem za upravljanje odnosov s strankami'],
  ], 'Porterjevi modeli pojasnjujejo, kje lahko IT ustvari konkurenčno prednost.'),
  M('Poveži pojem iz podatkovnih baz z opisom.', [
    ['Glavni ključ', 'Atribut, ki enolično loči vrstice v tabeli'],
    ['Sestavljeni ključ', 'Več atributov skupaj, ker en sam ne zadošča'],
    ['Domena atributa', 'Množica dopustnih vrednosti atributa'],
    ['Izpeljani atribut', 'Vrednost izračunamo iz drugih atributov, npr. starost'],
    ['SUPB', 'Zbirka programov za tvorbo, uporabo in vzdrževanje baze, npr. MySQL'],
  ], 'Relacijski model: tabele, atributi, ključi in sistem za upravljanje podatkovne baze.'),
  M('Poveži pojem iz računalniških omrežij z opisom.', [
    ['LAN', 'Krajevno omrežje v eni ali nekaj stavbah; hitro in poceni'],
    ['Usmerjevalnik', 'Povezuje omrežja in usmerja pakete IP'],
    ['Intranet', 'IS podjetja na tehnologiji TCP/IP in storitvah interneta'],
    ['3. raven modela OSI', 'Omrežna raven, protokol IP'],
    ['POP3 in SMTP', 'Protokola za elektronsko pošto'],
  ], 'Osnovni gradniki omrežij in protokoli.'),
];

const k2 = [
  M('Poveži pojem poslovne inteligence z opisom.', [
    ['Podatkovno skladišče (DWH)', 'Centralno skladišče očiščenih podatkov iz več virov za analitiko'],
    ['Data Lake', 'Shramba vseh vrst podatkov v surovi obliki'],
    ['ETL', 'Extract, Transform, Load'],
    ['Zvijanje (roll-up)', 'Operacija OLAP, ki podatke prikaže manj podrobno'],
    ['Podatkovno rudarjenje', 'Avtomatizirano iskanje prej neznanih vzorcev'],
  ], 'BI arhitektura: podatkovni viri → DWH → analitični modeli → vizualizacija.'),
  M('Poveži vrsto informacijskega sistema oziroma pojem z opisom.', [
    ['Transakcijski IS (TPS)', 'Operativna raven; ponavljajoče se transakcije, skoraj povsem avtomatiziran'],
    ['Poslovnointeligenčni sistem', 'Agregirani podatki iz TPS, primerjava dejanskega z načrtovanim'],
    ['ERP', 'Povezuje vse oddelke in procese v en IS s centralno bazo'],
    ['Otoki informacij', 'Nepovezani IS v isti organizaciji brez pretoka informacij'],
    ['Matični podatki', 'Podatki o entitetah v procesih: kupci, dobavitelji, material'],
  ], 'ERP odpravlja otoke informacij; BI nadgrajuje podatke iz transakcijskih sistemov.'),
];

const k3 = [
  M('Poveži pojem s področja umetne inteligence z opisom.', [
    ['John McCarthy (1956)', 'Uvedel termin umetna inteligenca'],
    ['Alan Turing (1950)', 'Delo Computing Machinery and Intelligence (Turingov test)'],
    ['RLHF', 'Učenje s krepitvijo iz človeških povratnih informacij'],
    ['Knowledge cutoff', 'Datum, po katerem model ne pozna dogodkov'],
    ['Umetna gotovost', 'Iluzija strokovnosti zaradi avtoritativno zvenečih odgovorov'],
  ], 'Zgodovina UI in pojmi iz delovanja velikih jezikovnih modelov.'),
  M('Poveži pojem s področja veriženja blokov z opisom.', [
    ['Pametne pogodbe', 'Programi, ki se izvršijo ob izpolnitvi pogojev (Ethereum, 2015)'],
    ['DeFi', 'Decentralizirane finance brez bank in posrednikov'],
    ['DAO', 'Decentralizirana avtonomna organizacija'],
    ['CBDC', 'Centralne bančne digitalne valute'],
    ['Hyperledger Fabric', 'Zasebna, podjetniška platforma'],
  ], 'Vsak dogodek v glavni knjigi potrdi večina udeležencev.'),
  M('Poveži pojem iz e-poslovanja z opisom.', [
    ['G2C', 'Npr. oddaja napovedi za odmero dohodnine'],
    ['B2B', 'Največji delež e-poslovanja po količini transakcij'],
    ['VMI', 'Zaloge pri trgovcu vodi dobavitelj, naročila sproži IS sam'],
    ['Zasebna e-tržnica', 'E-tržnica za oskrbo podjetja, ki je njen lastnik'],
    ['RIP', 'Računalniška izmenjava poslovnih listin namesto papirja'],
  ], 'Vrste e-poslovanja po udeležencih in modeli oskrbe.'),
];

module.exports = {
  id: 'inf',
  parts: [
    { id: 'k1', decks: [{ id: 'inf-k1-povezi', name: 'Povezovanje pojmov', questions: k1 }] },
    { id: 'k2', decks: [{ id: 'inf-k2-povezi', name: 'Povezovanje pojmov', questions: k2 }] },
    { id: 'k3', decks: [{ id: 'inf-k3-povezi', name: 'Povezovanje pojmov', questions: k3 }] },
  ],
};
