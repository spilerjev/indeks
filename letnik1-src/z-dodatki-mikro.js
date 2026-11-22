/* Mikroekonomija 1 - dodatki za 1. kolokvij: posameznikovo in tržno povpraševanje + kartice.
   Lastna formulacija, lastni scenariji in številke; računske rešitve preverja mikro-check.js. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });   // računsko
const cards = (arr) => arr.map(([front, back]) => ({ front, back }));

const vprasanja = [
  // 1 - Slutsky
  C('Ana ima koristnost U = X·Y² in dohodek M = 360 €. Cena dobrine X pade z 10 € na 5 €, cena Y se ne spremeni. Kolikšna sta učinek substitucije in učinek dohodka za X po Slutskyju?', [
    'Učinek substitucije 4, učinek dohodka 8',
    'Učinek substitucije 6, učinek dohodka 6',
    'Učinek substitucije 8, učinek dohodka 4',
    'Učinek substitucije 12, učinek dohodka 0'], 2,
    'Pri U = X·Y² gre za X tretjina dohodka: X = M/(3Px). Prej X₀ = 360/30 = 12, potem X₁ = 360/15 = 24. Kompenzirani dohodek M\' = 360 − 12·5 = 300, zato Xₛ = 300/15 = 20. Substitucija 20 − 12 = 8, dohodek 24 − 20 = 4.'),
  // 2 - Hicks
  C('Bor ima koristnost U = X·Y, dohodek M = 200 €, Py = 1 €. Cena X pade s 4 € na 1 €. Kolikšen je učinek dohodka za X po Hicksu?', [
    '50', '37,5', '75', '25'], 0,
    'Prej X₀ = 200/(2·4) = 25, Y₀ = 100, U = 2.500. Potem X₁ = 200/2 = 100. Pri novih cenah in U = 2.500 je kompenzirana košarica X = Y = 50. Substitucija 50 − 25 = 25, dohodek 100 − 50 = 50.'),
  // 3 - kompenzirani dohodek
  C('Cilka ima koristnost U = X·Y² in dohodek 480 €. Cena X pade z 8 € na 5 €. Koliko dohodka bi ji po Slutskyju pustili, da bi si ob novih cenah lahko kupila natanko prvotno košarico?', [
    '380 €', '420 €', '540 €', '300 €'], 1,
    'Prvotno X₀ = 480/(3·8) = 20. Kompenzirani dohodek M\' = M − X₀·ΔP = 480 − 20·3 = 420 €.'),
  // 4 - Giffen
  C('Dobrina X se poceni. Učinek substitucije poveča kupljeno količino za 5 enot, učinek dohodka pa jo zmanjša za 7 enot. Kolikšen je skupni učinek in za kakšno dobrino gre?', [
    '+12; normalna dobrina',
    '−2; inferiorna, a ne Giffenova',
    '+2; Giffenova dobrina',
    '−2; Giffenova dobrina'], 3,
    'Skupni učinek = 5 − 7 = −2: ob nižji ceni kupi manj. Učinek dohodka deluje proti substituciji (inferiorna) in je močnejši, kar je Giffenova dobrina.'),
  // 5 - dohodkovna elastičnost
  C('Ko se Davidov mesečni dohodek poveča s 1.500 € na 1.800 €, zmanjša nakupe instant rezancev z 20 na 17 paketov. Kolikšna je dohodkovna elastičnost (odstotki glede na začetno vrednost) in kakšna je dobrina?', [
    '0,75; normalna',
    '−0,75; inferiorna',
    '−1,33; inferiorna',
    '−0,75; luksuzna'], 1,
    'Dohodek +20 %, količina −15 %. E_M = −15 / 20 = −0,75 < 0, zato je dobrina inferiorna.'),
  // 6 - Engelova krivulja
  C('Koristnost je U = X·Y³, cena dobrine X je 5 €. Kakšna je Engelova krivulja za dobrino X (X v odvisnosti od dohodka M)?', [
    'X = M/5', 'X = 3M/20', 'X = M/20', 'X = M/15'], 2,
    'Pri U = X·Y³ potrošnik za X porabi 1/(1 + 3) = 1/4 dohodka: X = M/(4·5) = M/20. Engelova krivulja je naraščajoča premica, X je normalna dobrina.'),
  // 7 - PCC
  C('Eva ima koristnost U = X·Y, dohodek 120 € in Py = 2 €. Cena X se zviša z 2 € na 3 € in nato na 4 €. Kako se spreminja Y in kakšna je krivulja cena-potrošnja (PCC), če je X na vodoravni osi?', [
    'Y ostane 30, PCC je vodoravna',
    'Y naraste s 30 na 40, PCC raste',
    'Y pade s 30 na 15, PCC pada',
    'Y ostane 60, PCC je navpična'], 0,
    'Pri U = X·Y gre za vsako dobrino polovica dohodka: Y = 60/2 = 30 ne glede na Px, X pa pade s 30 na 20 in 15. Točke optimuma ležijo na vodoravni premici Y = 30.'),
  // 8 - potrošnikov presežek
  C('Povpraševanje po vstopnicah za bazen je Qd = 120 − 4P. Za koliko se spremeni potrošnikov presežek, če se cena zviša z 10 € na 15 €?', [
    '−300 €', '−400 €', '−450 €', '−350 €'], 3,
    'Pri P = 10 je Q = 80, pri P = 15 je Q = 60. Izguba je trapez: (80 + 60)/2 · 5 = 350 €. Preverba: presežek pade z ½·80·20 = 800 € na ½·60·15 = 450 €.'),
  // 9 - horizontalno seštevanje
  C('Na trgu sta dva kupca: Filip s Q = 40 − 2P in Gaja s Q = 30 − P. Kolikšna je tržna količina pri ceni 10 € in pri ceni 25 €?', [
    '40 in 0', '40 in 5', '45 in 5', '40 in −5'], 1,
    'Pri P = 10: 20 + 20 = 40. Pri P = 25 Filip ne kupuje (njegova najvišja cena je 20), zato je tržna količina le Gajina: 30 − 25 = 5.'),
  // 10 - lom tržne krivulje
  C('Hana ima povpraševanje Q = 60 − 3P, Igor pa Q = 36 − P. Pri kateri ceni ima tržna krivulja lom in kakšna je pod to ceno?', [
    'P = 36; Q = 96 − 4P',
    'P = 20; Q = 36 − P',
    'P = 20; Q = 96 − 4P',
    'P = 24; Q = 96 − 4P'], 2,
    'Hana začne kupovati šele pod 20 € (60 − 3P = 0 pri P = 20). Nad 20 € velja le Q = 36 − P, pod 20 € pa vsota (60 − 3P) + (36 − P) = 96 − 4P.'),
  // teorija
  Q('Dobrina X se poceni. Kaj velja za učinek substitucije (ob nespremenjeni koristnosti)?', [
    'Poveča količino X pri vsaki vrsti dobrine',
    'Poveča količino X le pri normalni dobrini',
    'Pri Giffenovi dobrini zmanjša količino X',
    'Pri inferiorni dobrini je enak nič'], 0,
    'Učinek substitucije je vedno nasproten spremembi cene: relativno cenejšo dobrino kupimo več. Vrsta dobrine določa le smer učinka dohodka.'),
  Q('Kdaj je dobrina Giffenova?', [
    'Ko je inferiorna in je njen učinek dohodka močnejši od učinka substitucije',
    'Ko je normalna in je njen učinek dohodka močnejši od substitucije',
    'Ko je inferiorna, a učinek substitucije prevlada nad dohodkom',
    'Ko je luksuzna in jo kupci ob višji ceni kupijo zaradi ugleda'], 0,
    'Giffenova dobrina mora biti inferiorna, učinek dohodka pa mora po absolutni vrednosti preseči učinek substitucije, zato krivulja povpraševanja raste.'),
  Q('Krivulja dohodek-potrošnja (ICC) se ob višjih dohodkih zavije nazaj proti navpični osi, na kateri je dobrina Y. Kaj to pove o dobrini X na vodoravni osi?', [
    'X je pri teh dohodkih normalna, Y inferiorna',
    'X je Giffenova dobrina',
    'Pri teh dohodkih sta obe dobrini inferiorni',
    'X je pri teh dohodkih inferiorna dobrina'], 3,
    'Ko se ICC zavije proti osi Y, se z rastjo dohodka X zmanjšuje, Y pa povečuje: X je inferiorna. O Giffenu brez spremembe cene ne moremo sklepati, obe dobrini pa ne moreta biti hkrati inferiorni.'),
  Q('Kako dobimo tržno krivuljo povpraševanja po zasebni dobrini iz individualnih krivulj?', [
    'Za vsako količino navpično seštejemo cene, ki so jih kupci pripravljeni plačati',
    'Izračunamo povprečje individualnih krivulj',
    'Seštejemo naklone individualnih krivulj',
    'Pri vsaki ceni seštejemo količine, ki jih zahtevajo posamezniki'], 3,
    'Tržno povpraševanje je horizontalna vsota: pri dani ceni seštejemo količine vseh kupcev. Navpično seštevanje se uporablja pri javnih dobrinah.'),
  Q('Po čem se razlikujeta Hicksova in Slutskyjeva razčlenitev učinka spremembe cene?', [
    'Hicks ohranja kupno moč za prvotno košarico, Slutsky pa prvotno koristnost',
    'Hicks ohranja prvotno koristnost, Slutsky pa kupno moč za prvotno košarico',
    'Hicks velja le za normalne, Slutsky le za inferiorne dobrine',
    'Hicks in Slutsky dasta različen skupni učinek spremembe cene'], 1,
    'Pri Hicksu kompenzirani dohodek ohrani potrošnika na prvotni indiferenčni krivulji, pri Slutskyju pa mu omogoči nakup prvotne košarice. Skupni učinek je v obeh enak, razlikuje se le razdelitev.'),
];

const kartice = cards([
  ['Ekonomija', 'Veda o tem, kako družba razporeja redke vire med različne možne rabe.'],
  ['Oportunitetni strošek', 'Vrednost najboljše možnosti, ki se ji odpoveš, ko izbereš neko drugo.'],
  ['Proste in ekonomske dobrine', 'Prosta dobrina je na voljo v izobilju. Pri ekonomski (redki) bi bilo pri ceni 0 povpraševanje večje od razpoložljive količine.'],
  ['Transformacijska krivulja', 'Kombinacije dveh dobrin, ki jih gospodarstvo lahko proizvede z vsemi viri. Je izbočena zaradi naraščajočih oportunitetnih stroškov; točke pod njo so neučinkovite.'],
  ['Tri temeljna ekonomska vprašanja', 'Kaj in koliko proizvesti, kako proizvesti in za koga proizvesti.'],
  ['Mešano gospodarstvo', 'Trg ob državi, ker trg sam ne zagotovi učinkovitosti v vseh primerih, stabilne rasti, pravične delitve in varstva okolja.'],
  ['Cilji tržnih osebkov', 'Gospodinjstva čim večje zadovoljstvo (koristnost), podjetja čim večji dobiček, država popravlja tržne napake.'],
  ['Predpostavke popolne konkurence', 'Veliko kupcev in prodajalcev, homogen proizvod, popolna mobilnost dejavnikov (in informiranost).'],
  ['Gibanje po krivulji ali premik krivulje', 'Sprememba cene same dobrine = gibanje po krivulji. Sprememba necenovnega dejavnika (dohodek, cene drugih dobrin, pričakovanja, tehnologija) = premik krivulje.'],
  ['Presežek ponudbe in presežek povpraševanja', 'Cena nad ravnotežno: Qs > Qd (presežek ponudbe). Cena pod ravnotežno: Qd > Qs (presežek povpraševanja).'],
  ['Cenovna elastičnost povpraševanja', 'E = %ΔQ / %ΔP. Večja je ob več substitutih in na dolgi rok.'],
  ['Elastičnost in celotni prihodek', 'Pri |E| < 1 podražitev poveča prihodek, pri |E| > 1 ga zmanjša, pri |E| = 1 ostane enak.'],
  ['Križna elastičnost', 'E > 0: substituta, E < 0: komplementa, E ≈ 0: nepovezani dobrini.'],
  ['Najvišja in najnižja cena', 'Najvišja (pod ravnotežjem) povzroči presežek povpraševanja, najnižja (nad ravnotežjem) presežek ponudbe.'],
  ['Trošarina', 'Večji del bremena nosi manj elastična stran trga, ne glede na to, kdo davek odvede. Davčni prihodek = t · Qt.'],
  ['Premica cene (proračunska premica)', 'Px·X + Py·Y = M; naklon −Px/Py, presečišče z osjo X pri M/Px.'],
  ['Predpostavke o preferencah', 'Popolnost, tranzitivnost, več je bolje. Zato indiferenčne krivulje padajo in se ne sekajo.'],
  ['MRS (mejna stopnja nadomestljivosti)', 'Koliko enot ene dobrine se potrošnik odpove za dodatno enoto druge ob enaki koristnosti; absolutni naklon indiferenčne krivulje, MRS = MUx/MUy.'],
  ['Optimum potrošnika', 'Premica cene se dotika najvišje dosegljive indiferenčne krivulje: MRS = Px/Py, oziroma MUx/Px = MUy/Py.'],
  ['Ordinalni in kardinalni pristop', 'Ordinalni zahteva le vrstni red košaric. Kardinalni meri koristnost v enotah in predpostavlja padajočo mejno koristnost.'],
]);

module.exports = { id: 'mikro', parts: [
  { id: 'k1',
    decks: [{ id: 'mikro-k1-povprasevanje', name: 'Posameznikovo in tržno povpraševanje', calc: true, questions: vprasanja }],
    flashcards: [{ id: 'mikro-c-k1', name: 'Pojmi in formule (K1)', cards: kartice }] } ] };
