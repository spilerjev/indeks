/* Temelji managementa - dodatki za izpit: družbena odgovornost, trajnost, učeča se organizacija, stres.
   Vprašanja so napisana na novo, z lastnimi scenariji. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
// vprašanja z možnostjo "Vsi navedeni ..." - vrstni red ostane (ta možnost je zadnja)
const QF = (q, options, correct, explanation) => ({ q, options, correct, explanation, fixedOrder: true });
const cards = (arr) => arr.map(([front, back]) => ({ front, back }));

const druzb = [
  Q('Kakšen je vrstni red ravni Carrollove piramide družbene odgovornosti podjetij, od temelja proti vrhu?',
    ['Ekonomska, pravna, etična, filantropska', 'Pravna, ekonomska, etična, filantropska', 'Etična, pravna, ekonomska, filantropska', 'Filantropska, etična, pravna, ekonomska'], 0,
    'Carroll (1991) postavi na dno ekonomsko odgovornost (biti donosen), nato pravno (spoštovati zakone), etično (ravnati pošteno) in na vrh filantropsko (biti dober državljan).'),
  Q('Srednje veliko podjetje vsako leto financira lokalni mladinski klub, čeprav tega ne zahtevajo niti zakon niti kupci niti običaji v panogi. Na katero raven Carrollove piramide se nanaša to ravnanje?',
    ['Ekonomsko', 'Pravno', 'Etično', 'Filantropsko'], 3,
    'Filantropska odgovornost je prostovoljna in od družbe le zaželena: podjetje prispeva skupnosti, ne da bi to od njega kdo pričakoval ali zahteval.'),
  Q('Trgovec bi lahko zakonito obdržal višje cene za stalne kupce, ki ne primerjajo ponudb, a jih izenači s cenami za nove kupce, ker se mu tako ravnanje zdi nepošteno. Katero raven družbene odgovornosti s tem uresničuje?',
    ['Pravno, ker gre za varstvo potrošnikov', 'Etično, ker ravna nad zahtevami zakona', 'Filantropsko, ker gre za prostovoljno dobrodelnost', 'Ekonomsko, ker se mu s tem poveča dobiček'], 1,
    'Etična odgovornost pomeni ravnati pošteno in pravično tudi tam, kjer zakon tega ne zapoveduje. Družba tako ravnanje pričakuje, ni pa zapisano v predpisih.'),
  Q('Kaj zajema koncept trojnega izida (triple bottom line), ki ga je predlagal John Elkington?',
    ['Družbeno, okoljsko in ekonomsko uspešnost', 'Prihodke, stroške in poslovni izid', 'Planiranje, organiziranje in kontroliranje', 'Odnose s kupci, dobavitelji in konkurenti'], 0,
    'Trojni izid (ljudje, planet, dobiček) zahteva, da podjetje uspešnost meri ne le finančno, temveč tudi po vplivu na družbo in okolje.'),
  Q('Katera opredelitev trajnostnega razvoja ustreza Brundtlandskemu poročilu (1987)?',
    ['Razvoj, pri katerem podjetje vsako leto poveča dobiček vsaj za stopnjo inflacije', 'Razvoj, pri katerem skrb za okolje v celoti prevzamejo državni organi', 'Zadovoljiti potrebe sedanjosti, ne da bi ogrozili potrebe prihodnjih generacij', 'Razvoj, pri katerem se gospodarska rast ustavi, da se zaščiti narava'], 2,
    'Brundtlandsko poročilo trajnostni razvoj opredeli kot razvoj, ki zadovolji sedanje potrebe, ne da bi zmanjšal možnosti prihodnjih generacij, da zadovoljijo svoje.'),
  Q('Podjetje v oglasih poudarja »zeleno« embalažo, večino proizvodnje pa ohranja z visokimi izpusti in o njih ne objavlja podatkov. Kako imenujemo takšno ravnanje?',
    ['Zeleno zavajanje (greenwashing)', 'Krožno gospodarstvo (ponovna uporaba)', 'Trajnostno poročanje', 'Filantropska odgovornost'], 0,
    'Zeleno zavajanje je ustvarjanje vtisa okoljske odgovornosti, ki ga dejansko poslovanje ne podpira. Trajnostno poročanje bi zahtevalo prav razkritje podatkov o izpustih.'),
  Q('V oddelku ob vsaki zamudi iščejo enega krivca, namesto da bi videli, kako se odločitve nabave, proizvodnje in prodaje medsebojno krepijo v povratnih zankah. Katera Sengeova disciplina jim najbolj manjka?',
    ['Sistemsko mišljenje', 'Osebno mojstrstvo', 'Oblikovanje skupne vizije', 'Timsko učenje'], 0,
    'Sistemsko mišljenje (peta disciplina) organizacijo vidi kot celoto povezanih delov in vzročnih zank, ne kot niz posameznih dogodkov s posameznimi krivci.'),
  Q('Zaposleni nove predloge sproti zavračajo z mislijo »pri nas to tako ali tako ne gre«, ne da bi to predpostavko kdaj preverili. Na katero Sengeovo disciplino se nanaša ta težava?',
    ['Osebno mojstrstvo', 'Mentalni modeli', 'Sistemsko mišljenje', 'Skupna vizija'], 1,
    'Mentalni modeli so globoko zasidrane predpostavke in predstave o svetu, ki usmerjajo ravnanje. Učeča se organizacija jih ozavesti in preverja.'),
  Q('Kaj je značilno za učečo se organizacijo?',
    ['Znanje je zbrano pri vrhnjem managementu, ki ga po potrebi posreduje navzdol', 'Učenje poteka predvsem na formalnih tečajih, ločeno od vsakdanjega dela', 'Vsi zaposleni sodelujejo pri iskanju in reševanju težav ter izboljšavah', 'Napake se strogo kaznujejo, da se ne bi nikoli več ponovile'], 2,
    'V učeči se organizaciji vsak zaposleni sodeluje pri iskanju in reševanju težav, zato organizacija nenehno eksperimentira, se izboljšuje in povečuje svoje zmožnosti.'),
  Q('Kakšen je vrstni red faz splošnega prilagoditvenega sindroma (Hans Selye) ob dolgotrajnem stresu?',
    ['Odpor, alarm, izčrpanost', 'Izčrpanost, alarm, odpor', 'Alarm, izčrpanost, odpor', 'Alarm, odpor, izčrpanost'], 3,
    'Telo se na stresor najprej odzove z alarmom, nato se v fazi odpora prilagaja in mobilizira vire. Če stres traja predolgo, viri pošijo in nastopi izčrpanost.'),
  Q('Kaj pravi zakon Yerkesa in Dodsona o povezavi med stresom (vzburjenostjo) in uspešnostjo?',
    ['Uspešnost z vsako dodatno ravnijo stresa enakomerno in brez kakršne koli omejitve narašča', 'Uspešnost je najvišja pri zmerni vzburjenosti, ob premajhni in preveliki upade', 'Uspešnost je največja tedaj, ko zaposleni ne doživljajo nobenega stresa', 'Raven stresa na uspešnost zaposlenih nima nobenega merljivega vpliva'], 1,
    'Povezava ima obliko obrnjene črke U: zmeren stres (eustres) spodbuja, premajhen ne motivira, prevelik (distres) pa uspešnost zniža.'),
  Q('Kateri od naštetih ukrepov za obvladovanje stresa uvede organizacija in ne posameznik sam?',
    ['Redna telesna vadba, ki si jo zaposleni organizira po službi', 'Tehnike sproščanja in globokega dihanja med odmori', 'Jasna opredelitev vlog in razumna razporeditev obremenitev', 'Boljše načrtovanje lastnega časa in postavljanje prioritet'], 2,
    'Organizacija stres zmanjšuje pri viru: z jasnimi vlogami, primerno obremenitvijo, vključevanjem v odločanje in podporo. Vadba, sproščanje in načrtovanje časa so ukrepi posameznika.'),
  Q('Zaposlena za isto nalogo dobi od dveh nadrejenih nasprotujoči si navodili. Kateri vzrok stresa na delovnem mestu je to?',
    ['Konflikt vlog', 'Nejasnost vlog', 'Preobremenjenost z delom', 'Premajhna obremenitev'], 0,
    'Konflikt vlog nastane, ko so pričakovanja do posameznika nezdružljiva. Pri nejasnosti vlog pa zaposleni sploh ne ve, kaj se od njega pričakuje.'),
];

const vsi = [
  QF('Kaj od naštetega je lahko posledica dolgotrajnega stresa zaposlenih za organizacijo?',
    ['Več bolniških odsotnosti zaposlenih', 'Večja fluktuacija zaposlenih', 'Več napak in nižja kakovost dela', 'Vsi navedeni odgovori so pravilni'], 3,
    'Dolgotrajen stres zniža zdravje in zavzetost zaposlenih, zato se povečajo odsotnosti, odhodi in napake. Pravilne so vse naštete posledice.'),
  QF('Kaj spada med Sengeove discipline učeče se organizacije?',
    ['Osebno mojstrstvo vsakega posameznika', 'Oblikovanje skupne vizije', 'Timsko učenje v dialogu', 'Vsi navedeni odgovori so pravilni'], 3,
    'Senge opiše pet disciplin: sistemsko mišljenje, osebno mojstrstvo, mentalne modele, skupno vizijo in timsko učenje. Vse naštete so med njimi.'),
  QF('Katera trditev o stresu na delovnem mestu je pravilna?',
    ['Stres povzročajo izključno dejavniki zunaj delovnega mesta', 'Osebnost tipa B je bolj nagnjena k stresu kot osebnost tipa A', 'Zmerna raven stresa (eustres) lahko uspešnost celo poveča', 'Vsi navedeni odgovori so pravilni'], 2,
    'Eustres spodbuja in izboljša uspešnost. Stres pogosto izvira prav iz dela (obremenitev, vloge, odnosi), k stresu pa je bolj nagnjena osebnost tipa A, zato vse trditve niso pravilne.'),
  QF('Kaj od naštetega spada v pravno raven Carrollove piramide?',
    ['Donacija za obnovo šolskega igrišča v kraju, kjer podjetje deluje', 'Spoštovanje predpisov o varstvu okolja in delovnih razmerjih', 'Ustvarjanje dobička za lastnike podjetja', 'Vsi navedeni odgovori so pravilni'], 1,
    'Pravna raven pomeni poslovati v okviru zakonov. Donacija je filantropska, ustvarjanje dobička pa ekonomska odgovornost, zato vse možnosti niso pravilne.'),
  QF('Katera ravnanja podjetja so skladna s trajnostnim managementom?',
    ['Zmanjševanje porabe energije in odpadkov v proizvodnji', 'Poštena plačila in varno delovno okolje za zaposlene', 'Dolgoročno donosno poslovanje namesto hitrih zaslužkov', 'Vsi navedeni odgovori so pravilni'], 3,
    'Trajnostni management hkrati upošteva okoljski, družbeni in ekonomski vidik (trojni izid). Vsako od naštetih ravnanj pokriva enega od njih.'),
];

module.exports = { id: 'mng', parts: [
  { id: 'izpit',
    decks: [
      { id: 'mng-druzb', name: 'Družbena odgovornost, učenje in stres', questions: druzb },
      { id: 'mng-vsi', name: 'Preveri vse trditve', questions: vsi },
    ],
    flashcards: [
      { id: 'mng-c-druzb', name: 'Odgovornost, trajnost in stres', cards: cards([
        ['Carrollova piramida (od temelja navzgor)', 'Ekonomska (zahtevana), pravna (zahtevana), etična (pričakovana), filantropska (zaželena) odgovornost.'],
        ['Etična odgovornost', 'Pošteno in pravično ravnanje tudi tam, kjer ga zakon ne zahteva.'],
        ['Trojni izid (Elkington)', 'Uspešnost merimo družbeno, okoljsko in ekonomsko: ljudje, planet, dobiček.'],
        ['Trajnostni razvoj (Brundtlandsko poročilo, 1987)', 'Zadovoljiti sedanje potrebe, ne da bi ogrozili možnosti prihodnjih generacij.'],
        ['Zeleno zavajanje', 'Ustvarjanje vtisa okoljske odgovornosti, ki ga dejansko poslovanje ne podpira.'],
        ['Peta disciplina (Senge)', 'Sistemsko mišljenje: povezuje ostale štiri discipline in gleda organizacijo kot celoto zank.'],
        ['Mentalni modeli', 'Globoko zasidrane predpostavke, ki usmerjajo ravnanje; učeča se organizacija jih preverja.'],
        ['Splošni prilagoditveni sindrom (Selye)', 'Alarm, odpor, izčrpanost.'],
        ['Eustres in distres', 'Eustres je zmeren, spodbuden stres; distres je škodljiv in uspešnost zniža.'],
        ['Konflikt vlog : nejasnost vlog', 'Nezdružljiva pričakovanja : zaposleni ne ve, kaj se od njega pričakuje.'],
      ]) },
    ] },
] };
