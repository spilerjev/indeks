/* Temelji trženja - stari izpiti (EF Zapiski: "TRŽENJE-IZPIT", zbrani roki z rešitvami študentov).
   Vprašanja tipa "Kaj od naštetega je pravilno?" (izbira kombinacije) in P/N trditve.
   Vključena so le vprašanja, kjer se rešitev ujema s snovjo; dvomljive študentske rešitve so izpuščene
   (npr. "ŽCI ima pri večini izdelkov podobno obliko in dolžino - P"). Trditve, ki so že v kvizih, so izpuščene. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation, fixedOrder: true });
const PN = (q, drzi, explanation) => ({ q, options: ['Drži', 'Ne drži'], correct: drzi ? 0 : 1, explanation });
const K = ['1, 2 in 3', '1, 3 in 4', '2 in 3', '1 in 2', 'Vse štiri', 'Nobena'];
const kombo = (uvod, trditve, pravilno, razlaga, ponudba) => {
  const opts = ponudba || K.filter((o) => o !== pravilno).slice(0, 3).concat(pravilno);
  const sorted = [...new Set(opts)].sort((a, b) => K.indexOf(a) - K.indexOf(b));
  return Q(uvod + ' ' + trditve.map((t, i) => `(${i + 1}) ${t}`).join(' '), sorted, sorted.indexOf(pravilno), razlaga);
};

const kombinacije = [
  kombo('(Izpit) Kaj je pravilno?', [
    'Analiza izgubljenih porabnikov je ena od metod za spremljanje zadovoljstva porabnikov.',
    'Porabnik kupi tisti izdelek, ki ima zanj višjo celotno vrednost.',
    'Pretekle izkušnje porabnika so pomemben dejavnik pri oblikovanju njegovih pričakovanj glede izdelka.',
    'Podjetje lahko poveča zaznano vrednost z nižjo ceno ali z nižjimi nedenarnimi stroški porabnika.'], '1, 3 in 4',
    'Porabnik ne izbere izdelka z višjo "celotno vrednostjo", temveč z višjo zaznano vrednostjo (koristi minus stroški).',
    ['1, 2 in 3', '1, 3 in 4', 'Vse štiri', '2 in 3']),
  kombo('(Izpit) Kaj je pravilno?', [
    'IKT je izboljšala ciljno trženje: lažje prepoznavanje segmentov, izbira ciljnih trgov, pozicioniranje.',
    'Močna prisotnost tujih podjetij na domačem trgu je eden od razlogov za internacionalizacijo.',
    'Podjetja pri internacionalizaciji iščejo odgovore na vprašanja kam, kako, kaj in kdaj.',
    'Spletna stran mora biti neprilagojena posamezni ciljni skupini, da doseže čim več porabnikov.'], '1, 2 in 3',
    'Spletna stran mora biti prilagojena ciljnim skupinam.',
    ['1, 2 in 3', '1, 3 in 4', 'Vse štiri', '2 in 3']),
  kombo('(Izpit) Kaj je pravilno?', [
    'Zunanji pogled na blagovno znamko vključuje zavedanje, podobo, zaznano kakovost in zvestobo.',
    'Tradicionalna opredelitev blagovne znamke jo enači z vizualnim delom - logotipom.',
    'Uspešne blagovne znamke potrebujejo zadostna sredstva pri uvajanju in pri vzdrževanju.',
    'Vidni del identitete predstavlja vidik porabnikov, nevidni pa vidik porabnikov in notranjih skupin.'], '1, 2 in 3',
    'Četrta trditev meša vidika: identiteta je pogled podjetja (notranji pogled), podoba je pogled porabnikov.',
    ['1, 2 in 3', '1 in 2', 'Vse štiri', '2 in 3']),
  kombo('(Izpit) Kaj je pravilno?', [
    'Strategije konkurentov in njihove cene predstavljajo zgornjo mejo cene.',
    'Razločevalne cene prilagodijo osnovno ceno glede na razlike pri porabnikih, izdelkih, lokacijah.',
    'Amazon uporablja dinamične cene - cene nenehno prilagaja ponudbi in povpraševanju.',
    'Metoda pribitka je posebej uspešna, če konkurenca cene določa po zaznani vrednosti.'], '2 in 3',
    'Zgornjo mejo cene določa zaznana vrednost (porabniki), spodnjo stroški; konkurenca je vmesni dejavnik.',
    ['1, 2 in 3', '2 in 3', '1 in 2', 'Vse štiri']),
  kombo('(Izpit) Kaj je pravilno?', [
    'Ekskluzivna distribucija pomeni, da posrednik dobi izključno pravico za prodajo izdelka.',
    'Oskrbna veriga je širši pojem kot tržna pot, saj vključuje tudi odnos dobavitelj-posrednik.',
    'Za neposredne tržne poti na porabniških trgih so značilne poti ene ali dveh ravni.',
    'Podjetje v danem trenutku ne more hkrati uporabljati posrednih in neposrednih tržnih poti.'], '1 in 2',
    'Neposredna tržna pot nima posrednikov (ničelna raven). Podjetja pogosto kombinirajo poti (večkanalno trženje).',
    ['1, 2 in 3', '1 in 2', '2 in 3', 'Vse štiri']),
  kombo('(Izpit) Kaj je pravilno?', [
    'Ciljanje (drugi korak ciljnega trženja) pomeni ocenjevanje privlačnosti segmentov in izbiro ciljnih trgov.',
    'Tržni segment je skupina porabnikov s podobnim skupkom želja.',
    'Percepcijski zemljevid je vizualna slika zaznavanja, ki kaže relativni položaj konkurenčnih izdelkov.',
    'Pri segmentaciji porabniških trgov lahko uporabimo tudi vedenjske in psihografske osnove.'], 'Vse štiri',
    'Vse trditve so pravilne: segmentacija → ciljanje → pozicioniranje.',
    ['1, 2 in 3', '1, 3 in 4', 'Vse štiri', '2 in 3']),
  kombo('(Izpit) Kaj je pravilno?', [
    'Omnibus raziskave imajo več naročnikov, pobudnik je raziskovalna agencija.',
    'Smiselno je začeti s primarnimi podatki; če ti ne obstajajo, zberemo sekundarne.',
    'Za globinske intervjuje se odločimo, ko pri temi veljajo družbeno sprejete norme vedenja.',
    'Metoda opazovanja postaja vedno bolj priljubljena.'], '1, 3 in 4',
    'Najprej pregledamo sekundarne (že obstoječe) podatke, primarne zbiramo, ko sekundarnih ni ali niso primerni.',
    ['1, 2 in 3', '1, 3 in 4', 'Vse štiri', '2 in 3']),
  kombo('(Izpit) Kaj je pravilno?', [
    'Življenjski cikel izdelka sestavljajo tri stopnje: rast, zrelost in upadanje.',
    'Na stopnji zrelosti lahko podjetje uporabi strategijo hitrega posnemanja smetane.',
    'Po mnenju kritikov je stopnjo življenjskega cikla preveč enostavno določiti.',
    'Podjetja uvajajo nove izdelke zaradi visoke stopnje uspešnosti novosti na trgu.'], 'Nobena',
    'ŽCI ima štiri stopnje (z uvajanjem); posnemanje smetane je strategija ob uvajanju; kritiki pravijo, da je stopnjo težko določiti; delež neuspešnih novosti je visok.',
    ['1 in 2', '2 in 3', 'Vse štiri', 'Nobena']),
  kombo('(Izpit) Kaj je pravilno?', [
    'Sodobni porabnik je zaradi pomanjkanja časa šibkeje vpleten v nakupno vedenje.',
    'Stopnja življenjskega cikla družine je osebni dejavnik, ki vpliva na nakupno vedenje.',
    'K formalnim komunikacijskim potem prištevamo orodja trženjskega komuniciranja ponudnika.',
    'Spletno nakupovanje ima za porabnike mnogo prednosti in nobenih slabosti.'], '2 in 3',
    'Spletno nakupovanje ima tudi slabosti (ni otipa, tveganje, dostava).',
    ['1, 2 in 3', '2 in 3', '1 in 2', 'Vse štiri']),
  kombo('(Izpit) Kaj je pravilno?', [
    'Neposredno trženje omogoča stroškovno učinkovito, ciljno usmerjeno trženje.',
    'Osebna prodaja je ključna, ko so izdelki zapleteni, dragi ali jih kupujemo le občasno.',
    'K trženju od ust do ust prištevamo izražanje mnenj, ki ga vodi industrija.',
    'Dobre baze podatkov so osnova za učinkovito neposredno trženje.'], '1, 3 in 4',
    'Pravilne so 1, 2 in 4: trženje od ust do ust NI vodeno s strani industrije. (Ponujena kombinacija "1, 2 in 4" je zato pravilen odgovor.)',
    ['1, 3 in 4', '1, 2 in 3', 'Vse štiri', '2 in 3']),
  kombo('(Izpit) Kaj je pravilno?', [
    'Porabniki so vse bolj aktivno vključeni v trženjsko komuniciranje in grajenje blagovne znamke.',
    'Med orodja pospeševanja prodaje, usmerjena na posrednike, štejemo kupone in vračila gotovine.',
    'Vsebino sporočila lahko predstavimo z razumskim, čustvenim ali moralnim pozivom.',
    'Odnosi z javnostmi ustvarijo zavedanje z bistveno višjimi stroški kot oglaševanje.'], '1 in 2',
    'Pravilni sta 1 in 3. Kuponi in vračila gotovine so usmerjeni na porabnike; odnosi z javnostmi so cenejši od oglaševanja.',
    ['1 in 2', '2 in 3', '1, 2 in 3', 'Vse štiri']),
  kombo('(Izpit) Kaj je pravilno?', [
    'Trženje lahko enačimo z oglaševanjem in prodajo.',
    'Trženje je poslovna funkcija, ki deluje neodvisno od ostalih področij podjetja.',
    'Podjetja s trženjsko usmeritvijo zadovoljijo potrebe in želje porabnikov uspešneje od konkurentov.',
    'Potrebe porabnikov ustvarjajo tržniki, želje pa izvirajo iz porabnikov samih.'], '2 in 3',
    'Pravilna je le 3. Trženje je več kot oglaševanje in prodaja, povezano je z vsemi funkcijami; potreb tržniki ne ustvarjajo.',
    ['2 in 3', '1 in 2', 'Vse štiri', 'Nobena']),
  kombo('(Izpit) Kaj je pravilno?', [
    'Ključne določljivke kakovosti storitev so zanesljivost, odzivnost, neopredmetenost in zbujanje zaupanja.',
    'Tudi proizvajalec gospodinjskih aparatov potrebuje znanja o trženju storitev.',
    'Razlikovanje cen lahko pomaga pri premagovanju minljivosti storitev.',
    'Notranje trženje je uporabno v storitvenih podjetjih, v proizvodnih pa ne.'], '2 in 3',
    'Neopredmetenost je značilnost storitev, ne določljivka kakovosti (te so zanesljivost, odzivnost, zagotovilo, empatija, otipljivi elementi).',
    ['1, 2 in 3', '2 in 3', '1 in 2', 'Vse štiri']),
];
// Pri dveh vprašanjih ponujena kombinacija ne ustreza pravilnemu naboru - popravek: zamenjamo besedilo pravilne kombinacije.
kombinacije[9].options[kombinacije[9].correct] = '1, 2 in 4';
kombinacije[10].options[kombinacije[10].correct] = '1 in 3';
kombinacije[11].options[kombinacije[11].correct] = 'Samo 3';

const pn = [
  PN('(Izpit) Interbrandov model vrednotenja blagovnih znamk spada med kombinirane modele.', true, 'Interbrand združuje finančni (dobiček znamke) in tržni/porabniški vidik (moč znamke).'),
  PN('(Izpit) Stroški tržnih poti so eden manjših izdatkov trženja, zato jim podjetja ne posvečajo velike pozornosti.', false, 'Tržne poti so velik strošek in strateška odločitev.'),
  PN('(Izpit) Red Bull je na začetku za prepoznavnost znamke uporabljal predvsem oglaševanje.', false, 'Red Bull je gradil znamko z gverilskim trženjem, deljenjem vzorcev in dogodki, ne s klasičnim oglaševanjem.'),
  PN('(Izpit) Dizajnersko razmišljanje razdelimo na fazo navdiha (inspiracije), ideacije in implementacije.', true, 'Design thinking: inspiracija → ideacija → implementacija; interdisciplinarni, na porabnika osredotočen pristop.'),
  PN('(Izpit) Relativni tržni delež nad 100 % pomeni, da je podjetje tržni vodja.', true, 'Relativni tržni delež = lastni delež / delež največjega konkurenta; > 100 % pomeni vodilni položaj.'),
  PN('(Izpit) Naloga tržnikov je ustvarjati segmente in prilagajati trženjski splet posameznemu segmentu.', false, 'Segmenti obstajajo na trgu - tržniki jih prepoznajo, ne ustvarjajo.'),
  PN('(Izpit) Proces strateškega trženjskega načrtovanja začnemo z opredelitvijo poslanstva.', true, 'Poslanstvo → cilji → analiza → strategije → izvedba in nadzor.'),
  PN('(Izpit) V družini je kupec oseba, ki opravi nakup in entiteto tudi uporablja.', false, 'Kupec opravi nakup; uporabnik (porabnik) je lahko druga oseba.'),
  PN('(Izpit) Podjetje s tradicionalnim pogledom na posredovanje vrednosti posluje po vodilu "izdelati - prodati".', true, 'Sodobni pogled začne pri porabniku: izbrati vrednost → zagotoviti → sporočiti.'),
  PN('(Izpit) Usmeritev podjetja v posameznega porabnika lahko vodi do trženjske kratkovidnosti.', false, 'Trženjsko kratkovidnost povzroči osredotočenost na izdelek namesto na potrebe porabnika.'),
  PN('(Izpit) Ko podjetje izboljša prikladnost embalaže obstoječega izdelka, ne moremo govoriti o novem izdelku.', false, 'Po trženjski opredelitvi so novi izdelki tudi izboljšave in spremembe obstoječih izdelkov.'),
  PN('(Izpit) Pri storitvah imamo 3 dodatne P-je: ljudi, postopke in procese.', false, 'Dodatni trije P-ji so ljudje, procesi in fizični dokazi.'),
  PN('(Izpit) Ko govorimo o ravneh tržnih poti, imamo v mislih njihovo dolžino.', true, 'Število ravni posrednikov = dolžina tržne poti.'),
  PN('(Izpit) Droga Kolinska uporablja strategijo krovnih družinskih imen.', false, 'Uporablja ločena (individualna) imena: Argeta, Barcaffe, Cockta ...'),
  PN('(Izpit) Tržni potencial je vedno enak, ne glede na trženjsko okolje.', false, 'Tržni potencial je odvisen od okolja (npr. recesija ali razcvet).'),
  PN('(Izpit) Vrste distribucije (intenzivna, selektivna, ekskluzivna) ločimo glede na vrsto vključenih posrednikov.', false, 'Ločimo jih glede na število posrednikov.'),
  PN('(Izpit) Tržniki so enotnega mnenja, da je pri pozicioniranju najbolje poudariti le eno prednost.', false, 'Nekateri zagovarjajo eno, drugi dve ali tri prednosti.'),
  PN('(Izpit) Družina je ena najvplivnejših ŽELENIH referenčnih skupin.', false, 'Družina je primarna (članska) referenčna skupina, ne želena.'),
  PN('(Izpit) Bistvena pomanjkljivost določanja cene s pribitkom je, da je stroške težko ugotoviti.', false, 'Stroške je razmeroma lahko ugotoviti; pomanjkljivost je, da metoda zanemari povpraševanje in konkurenco.'),
  PN('(Izpit) Trženjsko raziskovanje se ukvarja s pridobivanjem vsakodnevnih podatkov o dogajanju na trgu.', false, 'To je trženjsko obveščanje; raziskovanje rešuje konkreten trženjski problem.'),
  PN('(Izpit) Nesposobni in nemotivirani zaposleni so glavni povzročitelji 2. vrzeli v modelu kakovosti storitev.', false, 'Zaposleni povzročajo 3. vrzel (med standardi in izvedbo storitve).'),
  PN('(Izpit) Če podjetje pod istim imenom poleg čokolade proizvaja tudi sladoled (Mars), uporablja širitev blagovne znamke.', true, 'Širitev znamke = obstoječe ime na novi kategoriji izdelkov.'),
  PN('(Izpit) Pri trajnostnem trženju uravnotežimo družbeno, ekonomsko in demografsko razsežnost.', false, 'Tri razsežnosti so družbena, ekonomska in okoljska (ekološka).'),
  PN('(Izpit) Prva stvar pri internacionalizaciji je izbira izdelkov in njihovo prilagajanje.', false, 'Najprej odgovorimo na vprašanje KAM (ciljni trgi), nato kako, kaj in kdaj.'),
  PN('(Izpit) Na mikrookolje podjetje nima vpliva.', false, 'Na mikrookolje (dobavitelji, posredniki, kupci, zaposleni) podjetje lahko vpliva, na makrookolje pa ne.'),
  PN('(Izpit) Simobilovo mikrookolje vključuje tudi Tuš (konkurenco).', true, 'Konkurenti so del mikrookolja.'),
  PN('(Izpit) V družini ima vsaka oseba lahko samo eno od vlog (pobudnik, vplivnež, odločevalec, kupec, porabnik).', false, 'Ena oseba ima lahko več vlog.'),
  PN('(Izpit) Mobilno trženje spada med interaktivno trženje.', true, 'Mobilno trženje je oblika interaktivnega (digitalnega) trženja.'),
  PN('(Izpit) Jedro izdelka pri gledališču sta dvorana in stoli.', false, 'Jedro je korist - doživetje predstave; dvorana in stoli so del dejanskega izdelka.'),
  PN('(Izpit) Ob uvajanju izdelka lahko uporabimo hiter prodor (nizke cene, močno komuniciranje).', true, 'Strategije uvajanja: hitro/počasno posnemanje smetane, hiter/počasen prodor.'),
  PN('(Izpit) Premoženje blagovne znamke vključuje zavedanje, podobo, ime, vrednost in zvestobo.', false, 'Sestavine so zavedanje, podoba, zaznana kakovost in zvestoba.'),
  PN('(Izpit) Spodnji prag cene je minimum, ki ga je porabnik pripravljen plačati.', false, 'Spodnjo mejo cene določajo stroški; zgornjo zaznana vrednost porabnika.'),
  PN('(Izpit) Odnosi z javnostmi so dražji od oglaševanja.', false, 'Prednost odnosov z javnostmi so nižji stroški in večja verodostojnost.'),
  PN('(Izpit) Življenjski slog spada med osebne dejavnike nakupnega vedenja.', true, 'Osebni dejavniki: starost in ŽCD, poklic, ekonomski položaj, življenjski slog, osebnost.'),
  PN('(Izpit) Povpraševanje lahko merimo za različne ravni izdelka, prostorske razsežnosti in časovne ravni.', true, 'Merjenje povpraševanja ima tri razsežnosti: izdelek, prostor, čas.'),
];

module.exports = { kombinacije, pn };
