/* Napolni Mikroekonomija 1 -> 1. kolokvij (poglavja 1-3). Vir: prosojnice MIKRO1-3 (izvoz .key->PDF). */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, 'data.json');
const DATA = JSON.parse(fs.readFileSync(P, 'utf8'));

const decks = [
  { id: 'mikro-k1-ekonomist', name: 'Razmišljati kot ekonomist', questions: [
    { q: 'Kaj proučuje ekonomija?', options: ['Samo denar in borze', 'Kako posamezniki in družba razdeljujejo omejene dobrine med alternativne oblike potrošnje', 'Izključno delovanje bank', 'Samo proizvodnjo v tovarnah'], correct: 1, explanation: 'Ekonomija je znanost o alokaciji redkih resursov — kako družba razdeljuje omejene dobrine med alternativne rabe.' },
    { q: 'Kaj je oportunitetni (alternativni) strošek?', options: ['Denarni strošek nakupa', 'Količina dobrine, ki se ji moramo odpovedati, da pridobimo enoto druge dobrine', 'Strošek, ki ga plača država', 'Vsota vseh stroškov proizvodnje'], correct: 1, explanation: 'Oportunitetni strošek = vrednost izgubljene (najboljše) alternative — česa se odpovemo za dodatno enoto druge dobrine.' },
    { q: 'Kaj so ekonomske dobrine?', options: ['Dobrine, ki jih je več, kot znašajo potrebe', 'Dobrine, pri katerih je obseg povpraševanja pri ceni nič večji od razpoložljive ponudbe (relativno redke)', 'Samo storitve', 'Dobrine brez cene'], correct: 1, explanation: 'Ekonomske (relativno redke) dobrine: povpraševanje pri ceni 0 > ponudba, zato imajo ceno. Proste dobrine so v izobilju.' },
    { q: 'Kateri so proizvodni dejavniki po generičnem nastanku?', options: ['Delo in proizvodna sredstva', 'Zemlja, delo, kapital', 'Nabava, proizvodnja, prodaja', 'Prihodki, odhodki, dobiček'], correct: 1, explanation: 'Po generičnem nastanku: zemlja, delo, kapital. Po vlogi v gospodarjenju: delo in proizvodna sredstva.' },
    { q: 'Zakaj je transformacijska krivulja izbočena (konkavna navzven)?', options: ['Zaradi inflacije', 'Zaradi naraščajočih oportunitetnih stroškov (padajočega mejnega produkta)', 'Ker so cene fiksne', 'Ker je proizvodnja neomejena'], correct: 1, explanation: 'Transformacijska krivulja je izbočena zaradi naraščajočih oportunitetnih stroškov — dejavniki niso enako primerni za vse dobrine.' },
    { q: 'Katera so tri temeljna ekonomska vprašanja?', options: ['Kdaj, kje, zakaj proizvajati', 'Kaj (in koliko), kako in za koga proizvajati', 'Koliko zaposliti, plačati, prodati', 'Kaj kupiti, prodati, hraniti'], correct: 1, explanation: 'Tri temeljna vprašanja: kaj in koliko proizvajati, kako proizvajati, za koga proizvajati.' },
    { q: 'Kako tržni mehanizem rešuje vprašanje "kaj in koliko proizvajati"?', options: ['Odloča država s planom', 'Odločajo kupci z odločitvami o svoji potrošni izbiri', 'Določi konkurenca med proizvajalci', 'Naključno'], correct: 1, explanation: 'Kaj/koliko: kupci (potrošna izbira). Kako: konkurenca med proizvajalci. Za koga: trg proizvodnih dejavnikov.' },
    { q: 'Kaj je značilno za blagovno gospodarstvo (v nasprotju z naturalnim)?', options: ['Usklajevanje z mehanizmom totalnega planiranja', 'Delitev dela ureja tržni mehanizem prek višine tržne cene', 'Proizvodnja le za lastno potrošnjo', 'Ni menjave'], correct: 1, explanation: 'V blagovnem gospodarstvu delitve dela ne ureja planski organ, ampak tržni mehanizem prek tržnih cen.' },
    { q: 'Zakaj je tržni mehanizem problematičen (razlogi za mešano gospodarstvo)?', options: ['Ker je vedno učinkovit', 'Ne zagotavlja učinkovitosti in stabilne rasti, povečuje neenakost, ne rešuje okoljskih problemov', 'Ker odpravlja vso neenakost', 'Ker prepove konkurenco'], correct: 1, explanation: 'Trg ne zagotavlja učinkovitosti in stabilne rasti, povečuje neenakost in ne rešuje okoljskih problemov → potreben je poseg države (mešano gospodarstvo).' },
    { q: 'Kaj v ekonomski teoriji predpostavljamo o gospodinjstvih?', options: ['So proizvajalci dobrin', 'So racionalni potrošniki in lastniki proizvodnih dejavnikov, ki maksimirajo zadovoljitev potreb', 'Ne sprejemajo odločitev', 'Maksimirajo dobiček'], correct: 1, explanation: 'Gospodinjstva = racionalni potrošniki, lastniki proizvodnih dejavnikov (vir dohodkov), želijo maksimalno zadovoljitev potreb. Podjetja maksimirajo dobiček.' },
    { q: 'Kako se razlikujeta mikro- in makroekonomija?', options: ['Mikro proučuje celoto, makro posameznika', 'Mikro analizira posamezne ekonomske osebke in odločanje o posameznih dobrinah; makro preučuje ekonomijo kot celoto', 'Sta sinonima', 'Mikro se ukvarja le z inflacijo'], correct: 1, explanation: 'Mikroekonomija = analiza posameznih osebkov in dobrin; makroekonomija = delovanje gospodarstva kot celote. Makro ima mikroekonomsko podlago.' },
  ]},
  { id: 'mikro-k1-ponudba', name: 'Ponudba, povpraševanje, ravnotežje', questions: [
    { q: 'Katere so značilnosti popolne konkurence?', options: ['Malo prodajalcev in diferencirano blago', 'Veliko kupcev in prodajalcev, homogeno blago, popolna mobilnost proizvodnih dejavnikov', 'En sam prodajalec', 'Državno določene cene'], correct: 1, explanation: 'Popolna konkurenca: veliko kupcev/prodajalcev, homogeno blago, popolna mobilnost dejavnikov.' },
    { q: 'Kaj pravi zakon o padajočem povpraševanju?', options: ['Višja cena → večje povpraševanje', 'Ceteris paribus: višja cena → manjši obseg povpraševanja (in obratno)', 'Cena ne vpliva na povpraševanje', 'Povpraševanje je konstantno'], correct: 1, explanation: 'Ceteris paribus se z višjo ceno obseg povpraševanja zmanjša (dQd/dPd ≤ 0). Krivulja povpraševanja je padajoča.' },
    { q: 'Kateri od naštetih NI dejavnik (shifter) povpraševanja?', options: ['Razpoložljivi dohodek', 'Cene substitutov', 'Cena komplementarnega blaga', 'Tehnologija proizvodnje'], correct: 3, explanation: 'Tehnologija je dejavnik ponudbe. Dejavniki povpraševanja: cena blaga, cene substitutov in komplementov, dohodek, pričakovanja.' },
    { q: 'Kakšna funkcija cene je obseg ponudbe (ceteris paribus)?', options: ['Padajoča', 'Naraščajoča (dQs/dPs ≥ 0)', 'Konstantna', 'Neodvisna od cene'], correct: 1, explanation: 'Obseg ponudbe je naraščajoča funkcija cene: višja cena → večja ponujena količina.' },
    { q: 'Kaj je ravnotežna cena?', options: ['Najvišja možna cena', 'Cena, pri kateri se izenačita obseg ponudbe in povpraševanja in ni teženj po spremembi', 'Cena, ki jo določi država', 'Povprečje vseh cen'], correct: 1, explanation: 'Ravnotežna cena (P*): Qs = Qd; silnice ponudbe in povpraševanja se izenačijo, trg nima teženj po spremembi.' },
    { q: 'Kaj se zgodi pri ceni nad ravnotežno?', options: ['Presežek povpraševanja → konkurenca med kupci', 'Presežek ponudbe → konkurenca med prodajalci → cena pade', 'Trg je v ravnotežju', 'Ponudba izgine'], correct: 1, explanation: 'Visoka cena → presežek ponudbe → konkurenca med prodajalci potiska ceno navzdol. Nizka cena → presežek povpraševanja → konkurenca med kupci.' },
    { q: 'Kaj povzroči premik (ne gibanje po) krivulje ponudbe v desno?', options: ['Sprememba cene samega blaga', 'Padec cene surovin / boljša tehnologija (pri dani ceni se proizvede več)', 'Povečanje povpraševanja', 'Uvedba maksimalne cene'], correct: 1, explanation: 'Premik krivulje ponudbe povzročijo necenovni dejavniki (stroški, tehnologija). Sprememba cene blaga je zgolj gibanje po krivulji.' },
    { q: 'Ob povečanju razpoložljivega dohodka (ponudba nespremenjena) se ravnotežje spremeni tako, da:', options: ['P in Q padeta', 'Krivulja povpraševanja se premakne v desno → P in Q narasteta', 'Samo cena pade', 'Nič se ne spremeni'], correct: 1, explanation: 'Večji dohodek → premik povpraševanja v desno → presežek povpraševanja → ravnotežna cena in količina narasteta.' },
    { q: 'Kaj določa obliko tržne strukture?', options: ['Le cena blaga', 'Število kupcev in prodajalcev, stopnja diferenciacije proizvodov, mobilnost proizvodnih dejavnikov', 'Samo tehnologija', 'Le davki'], correct: 1, explanation: 'Tržno strukturo določajo: število kupcev/prodajalcev, stopnja diferenciacije proizvodov, mobilnost proizvodnih dejavnikov.' },
    { q: 'Kaj pomeni predpostavka ceteris paribus?', options: ['Vse se spreminja hkrati', 'Ob nespremenjenih drugih pogojih (opazujemo vpliv ene spremenljivke)', 'Cene so vedno enake', 'Trg je vedno v ravnotežju'], correct: 1, explanation: 'Ceteris paribus = ob sicer nespremenjenih pogojih; izoliramo vpliv ene spremenljivke.' },
  ]},
  { id: 'mikro-k1-elasticnost', name: 'Elastičnost in vloga države', questions: [
    { q: 'Kaj meri koeficient elastičnosti?', options: ['Absolutno spremembo cene', 'Odstotno spremembo ene spremenljivke zaradi 1 % spremembe druge', 'Vsoto prihodkov', 'Naklon ponudbe'], correct: 1, explanation: 'Elastičnost = mera občutljivosti; E = %ΔX / %ΔY (odstotna sprememba ene glede na odstotno spremembo druge).' },
    { q: 'Kdaj je povpraševanje cenovno bolj elastično?', options: ['Ko dobrina nima substitutov', 'Ko ima dobrina več substitutov (in dolgoročno bolj kot kratkoročno)', 'Za nujna zdravila', 'Nikoli'], correct: 1, explanation: 'Več substitutov → bolj elastično. Povpraševanje je dolgoročno bolj elastično (ljudje potrebujejo čas za spremembo navad).' },
    { q: 'Kaj pomeni križna elastičnost povpraševanja večja od 0?', options: ['Komplementarni dobrini', 'Substitucijski (nadomestni) dobrini', 'Nepovezani dobrini', 'Nujna dobrina'], correct: 1, explanation: 'Križna elastičnost > 0 → substituti; < 0 → komplementi; = 0 → nepovezani dobrini.' },
    { q: 'Če je povpraševanje neelastično (−1 < Ed < 0), kaj se zgodi s celotnimi izdatki (CE), ko cena naraste?', options: ['CE se zmanjšajo', 'CE se povečajo (padec količine je manjši od rasti cene)', 'CE ostanejo enaki', 'CE postanejo negativni'], correct: 1, explanation: 'Pri neelastičnem povpraševanju rast cene poveča CE = P·Q, ker se količina zmanjša manj, kot naraste cena.' },
    { q: 'Kaj povzroči predpisana maksimalna cena (pod ravnotežno)?', options: ['Presežek ponudbe', 'Presežek povpraševanja (primanjkljaj)', 'Ravnotežje', 'Zvišanje cene'], correct: 1, explanation: 'Maksimalna cena Pmax < P0 → obseg povpraševanja > obseg ponudbe → presežek povpraševanja (npr. neprofitna najemnina).' },
    { q: 'Kaj je primer predpisane minimalne cene?', options: ['Neprofitna najemnina', 'Minimalna plača ali minimalna cena kmetijskih proizvodov (Pmin > P0)', 'Trošarina na gorivo', 'Cena bitcoina'], correct: 1, explanation: 'Minimalna cena Pmin > P0 → presežek ponudbe. Primeri: minimalna plača, minimalna cena pšenice.' },
    { q: 'Od česa je odvisen delež trošarine, ki ga dejansko plača potrošnik?', options: ['Le od višine trošarine', 'Od cenovne elastičnosti povpraševanja in ponudbe', 'Od dohodka države', 'Vedno plača vse potrošnik'], correct: 1, explanation: 'Porazdelitev davčnega bremena je odvisna od razmerja elastičnosti: bolj neelastična stran nosi večji delež. Ni odvisno od tega, kdo davek odvaja.' },
    { q: 'Ali je pomembno, ali trošarino v proračun odvajajo proizvajalci ali potrošniki?', options: ['Da, ravnotežje je popolnoma drugačno', 'Ne — izoblikuje se enako ravnotežje in enaka porazdelitev bremena', 'Da, potrošniki vedno plačajo več', 'Da, proizvajalci vedno plačajo vse'], correct: 1, explanation: 'Ekonomsko breme je enako ne glede na to, kdo davek zakonsko odvaja; odloča elastičnost, ne pravna zaveza.' },
  ]},
  { id: 'mikro-k1-potrosnik', name: 'Obnašanje potrošnikov', questions: [
    { q: 'Kaj prikazuje premica proračunskih omejitev (premica cene)?', options: ['Vse kombinacije dobrin, ki dajejo enako zadovoljstvo', 'Vse kombinacije dobrin, ki jih potrošnik lahko kupi z danim dohodkom pri danih cenah', 'Ravnotežno ceno', 'Ponudbo podjetja'], correct: 1, explanation: 'Premica cene: PH·H + PO·O = M. Naklon = −PH/PO (razmerje cen). Prikazuje dosegljive kombinacije pri danem dohodku.' },
    { q: 'Katere so tri temeljne predpostavke o potrošnikovih preferencah?', options: ['Popolne, tranzitivne, "več je bolje kot manj"', 'Fiksne, linearne, konstantne', 'Naključne, spremenljive, negativne', 'Enake za vse potrošnike'], correct: 0, explanation: 'Preference so: popolne (razvrsti vse kombinacije), tranzitivne (če A≻B in B≻C, potem A≻C) in nenasičenost ("več je bolje").' },
    { q: 'Zakaj se indiferenčni krivulji ne moreta sekati?', options: ['Ker sta vzporedni', 'Ker bi to kršilo tranzitivnost/nenasičenost preferenc', 'Ker sta navpični', 'Lahko se sekata'], correct: 1, explanation: 'Sekanje bi pomenilo protislovje (dve različni ravni koristnosti v isti točki) → krši tranzitivnost in "več je bolje".' },
    { q: 'Kaj izraža mejna stopnja nadomestljivosti (MRS)?', options: ['Razmerje dohodkov', 'Koliko enot ene dobrine se je potrošnik pripravljen odreči za dodatno enoto druge ob nespremenjenem zadovoljstvu', 'Ceno dobrine', 'Skupno koristnost'], correct: 1, explanation: 'MRS = naklon (absolutna vrednost) tangente na indiferenčno krivuljo — menjalno razmerje med dobrinama ob enaki koristnosti.' },
    { q: 'Kakšne so indiferenčne krivulje za popolna substituta?', options: ['Pravokotni (L-oblika)', 'Ravne (premice) — MRS je konstantna', 'Konkavne', 'Navpične'], correct: 1, explanation: 'Popolna substituta (npr. Coca Cola in Cockta): premočrtne indiferenčne krivulje s konstantno MRS. Popolna komplementa: L-oblika.' },
    { q: 'Kaj velja v optimalni potrošni izbiri (potrošnikovem ravnotežju)?', options: ['MRS je večja od razmerja cen', 'Premica cene je tangenta na najvišjo dosegljivo indiferenčno krivuljo: MRS = razmerje cen (PH/PO)', 'Potrošnik porabi le del dohodka', 'Koristnost je nič'], correct: 1, explanation: 'V optimumu: točka je na premici cene IN na najvišji dosegljivi indiferenčni krivulji → MRS = PH/PO.' },
    { q: 'Kaj pravi zakon padajoče mejne koristnosti?', options: ['Vsaka dodatna enota prinese več koristnosti', 'Vsaka dodatna enota dobrine prinese manj dodatnega zadovoljstva (MU pada)', 'Koristnost je konstantna', 'Celotna koristnost pada'], correct: 1, explanation: 'Mejna koristnost (MU) dodatne enote pada z večanjem potrošnje; celotna koristnost (TU) še narašča, a vse počasneje.' },
    { q: 'Kdaj je potrošnik v ravnotežju po kardinalni teoriji koristnosti?', options: ['Ko porabi ves dohodek na eno dobrino', 'Ko zadnji evro, vložen v katero koli dobrino, prinese enako mejno koristnost: MUA/PA = MUB/PB', 'Ko so cene enake', 'Ko je MU = 0'], correct: 1, explanation: 'Pogoj ravnotežja: MUA/PA = MUB/PB (oz. MUA/MUB = PA/PB) — zadnji evro v vsaki dobrini prinese enako mejno korist.' },
    { q: 'Kaj pomeni ordinalno razvrščanje preferenc?', options: ['Natančno izmerimo, koliko zadovoljstva prinaša vsaka kombinacija', 'Kombinacije le razvrstimo po vrstnem redu, ne merimo za koliko se razlikujejo', 'Merjenje v evrih', 'Preference so nepomembne'], correct: 1, explanation: 'Ordinalno merjenje (šibkejše predpostavke): le vrstni red kombinacij. Kardinalno bi zahtevalo natančno velikost koristnosti.' },
  ]},
  { id: 'mikro-k1-racunske', name: 'Računske naloge', calc: true, questions: [
    { q: 'Dohodek M = 100 EUR, cena hrane Ph = 5, cena obleke Po = 10. Kolikšen je naklon premice cene (−Ph/Po) in največ hrane?', options: ['Naklon −2, max hrane 10', 'Naklon −1/2, max hrane 20 (M/Ph)', 'Naklon −1, max hrane 100', 'Naklon −1/2, max hrane 10'], correct: 1, explanation: 'Max hrane = M/Ph = 100/5 = 20; max obleke = M/Po = 10. Naklon = −Ph/Po = −5/10 = −1/2.' },
    { q: 'Povpraševanje Qd = 400 − 4Pd. Kolikšna je cenovna elastičnost pri ceni 50?', options: ['−2 (elastično)', '−1 (enotska elastičnost)', '−0,5 (neelastično)', '0'], correct: 1, explanation: 'Pri P=50: Q = 400 − 200 = 200. Ed = (dQ/dP)·(P/Q) = (−4)·(50/200) = −1 → enotska elastičnost.' },
    { q: 'Povpraševanje Qd = 100/Pd. Kolikšna je cenovna elastičnost pri ceni 10?', options: ['−1 (in enaka vzdolž cele krivulje)', '−10', '−0,1', '0'], correct: 0, explanation: 'Pri funkciji oblike Q = a/P je elastičnost povsod enaka −1 (enakostranična hiperbola).' },
    { q: 'Qd = 286 − 15Pd, Qs = 86 + 25Ps, trošarina t = 2 EUR/enoto (odvedejo proizvajalci). Kolikšni so davčni prihodki?', options: ['192,25 EUR', '384,5 EUR', '211 EUR', '96 EUR'], correct: 1, explanation: 'Ps = Pd − 2. 286 − 15Pd = 86 + 25(Pd−2) → Pd = 6,25; Qt = 286 − 15·6,25 = 192,25. Davčni prihodki = t·Qt = 2·192,25 = 384,5 EUR.' },
    { q: 'Pri isti nalogi (pred davkom P* = 5). Kolikšen delež trošarine (t = 2) plača potrošnik?', options: ['0,375 (37,5 %)', '0,625 (62,5 %)', '1 (100 %)', '0,5 (50 %)'], correct: 1, explanation: 'Delež kupca = (Pd − P*)/t = (6,25 − 5)/2 = 0,625 → potrošnik nosi 62,5 % bremena.' },
    { q: 'Potrošnik ima ravnotežni pogoj MUA/PA = MUB/PB. Dobrina A: cena 4, MU = 3; dobrina B: cena 2, MU = 5. Kaj velja?', options: ['Razporeditev je optimalna', 'Ni optimalno — MUB/PB (2,5) > MUA/PA (0,75), zato naj troši več B', 'Naj troši več A', 'MU je nepomembna'], correct: 1, explanation: 'MUA/PA = 3/4 = 0,75; MUB/PB = 5/2 = 2,5. Ker B prinaša več koristi na evro, naj potrošnik preusmeri porabo v B.' },
    { q: 'Žiga: M = 170, Px = 20, Py = 10; MU padajo po tabeli. Optimum je X* = 6, Y* = 5. Kolikšna je celotna koristnost (TU)?', options: ['100', '115', '170', '80'], correct: 1, explanation: 'TU = (16+15+14+13+12+10) + (9+8+7+6+5) = 80 + 35 = 115 utilov. Poraba: 20·6 + 10·5 = 170 = ves dohodek.' },
  ]},
];

const notes = `
<h2>1 · Razmišljati kot ekonomist</h2>
<div class="note-card">
<h3>Temeljni pojmi</h3>
<ul>
<li><b>Ekonomija</b> = znanost o alokaciji redkih resursov (kako družba razdeljuje omejene dobrine med alternativne rabe).</li>
<li><b>Oportunitetni strošek</b> = vrednost izgubljene najboljše alternative.</li>
<li><b>Proste</b> vs <b>ekonomske (redke)</b> dobrine (pri ceni 0 je povpraševanje > ponudbe).</li>
<li><b>Proizvodni dejavniki</b>: zemlja, delo, kapital (generično) / delo in proizvodna sredstva (po vlogi).</li>
<li><b>Transformacijska krivulja</b>: izbočena zaradi naraščajočih oportunitetnih stroškov. Točke znotraj = neučinkovito.</li>
<li><b>Tri temeljna vprašanja</b>: kaj/koliko (kupci), kako (konkurenca), za koga (trg dejavnikov).</li>
<li>Trg ne zagotavlja učinkovitosti, stabilne rasti, enakosti, okolja → <b>mešano gospodarstvo</b>.</li>
<li>Tržni osebki: <b>gospodinjstva</b> (potrošniki, lastniki dejavnikov, maks. zadovoljstvo), <b>podjetja</b> (maks. dobiček), <b>država</b>. Makro ima mikroekonomsko podlago.</li>
</ul>
</div>

<h2>2 · Ponudba, povpraševanje, elastičnost</h2>
<div class="note-card">
<h3>Trg in ravnotežje</h3>
<ul>
<li><b>Popolna konkurenca</b>: veliko kupcev/prodajalcev, homogeno blago, popolna mobilnost dejavnikov.</li>
<li><b>Zakon padajočega povpraševanja</b> (dQd/dPd ≤ 0); <b>ponudba</b> naraščajoča (dQs/dPs ≥ 0).</li>
<li>Dejavniki D: cena, substituti, komplementi, dohodek, pričakovanja. Dejavniki S: cena, tehnologija, stroški, zaloge, pričakovanja.</li>
<li><b>Ravnotežje</b>: Qs = Qd, P*. Visoka cena → presežek ponudbe; nizka → presežek povpraševanja. <b>Premik</b> krivulje (necenovni dejavnik) ≠ gibanje po krivulji (cena blaga).</li>
</ul>
</div>
<div class="note-card">
<h3>Elastičnost in država</h3>
<ul>
<li><b>Elastičnost</b> E = %ΔQ / %ΔP. Več substitutov → bolj elastično; dolgoročno bolj elastično.</li>
<li><b>Križna</b>: >0 substituti, <0 komplementi, =0 nepovezani. Neelastično povpraševanje: ↑P → ↑CE.</li>
<li><b>Maksimalna cena</b> (< P0) → presežek povpraševanja; <b>minimalna cena</b> (> P0) → presežek ponudbe.</li>
<li><b>Trošarina</b>: davčno breme se deli glede na elastičnost (bolj neelastična stran plača več); ni pomembno, kdo davek odvaja. Davčni prihodek = t·Qt.</li>
</ul>
</div>

<h2>3 · Obnašanje potrošnikov</h2>
<div class="note-card">
<h3>Preference in ravnotežje</h3>
<ul>
<li><b>Premica cene</b>: PH·H + PO·O = M; naklon = −PH/PO.</li>
<li>Preference: <b>popolne, tranzitivne, "več je bolje"</b>. Indiferenčne krivulje padajo, se ne sekajo.</li>
<li><b>MRS</b> = koliko ene dobrine odstopiš za enoto druge ob enaki koristnosti (naklon indiferenčne krivulje). Popolna substituta = premice; komplementa = L-oblika.</li>
<li><b>Optimum</b>: premica cene tangenta na najvišjo indiferenčno krivuljo → <b>MRS = PH/PO</b>.</li>
<li><b>Kardinalna teorija</b>: padajoča mejna koristnost; ravnotežje <b>MUA/PA = MUB/PB</b>. Ordinalno = le vrstni red (šibkejše predpostavke).</li>
</ul>
</div>
`;

let placed = false;
for (const sem of DATA) for (const su of sem.subjects) if (su.id === 'mikro') {
  const p = su.parts[0]; // 1. kolokvij
  p.decks = decks;
  p.notes = notes;
  placed = true;
}
if (!placed) { console.error('NAPAKA: mikro ni najden'); process.exit(1); }

fs.copyFileSync(P, P + '.bak-premikro');
fs.writeFileSync(P, JSON.stringify(DATA));
let q = 0; decks.forEach((d) => q += d.questions.length);
console.log('Mikroekonomija / 1. kolokvij napolnjen:', decks.length, 'sklopov,', q, 'vprašanj, zapiski dodani.');
