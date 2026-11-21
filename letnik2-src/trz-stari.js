/* Temelji trženja - vaje v slogu izpita: »Kaj od naštetega je pravilno?« (izbira kombinacije) in trditve P/N.
   Trditve so napisane na novo (lastne formulacije in primeri); vsebina sledi učbeniku in predavanjem. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation, fixedOrder: true });
const PN = (q, drzi, explanation) => ({ q, options: ['Drži', 'Ne drži'], correct: drzi ? 0 : 1, explanation });
const K = ['1, 2 in 3', '1, 2 in 4', '1, 3 in 4', '2, 3 in 4', '1 in 2', '1 in 3', '1 in 4', '2 in 3', '2 in 4', 'Vse štiri', 'Nobena'];
const kombo = (uvod, trditve, pravilno, razlaga, ponudba) => {
  const opts = ponudba || K.filter((o) => o !== pravilno).filter((_, i) => i % 3 === 0).slice(0, 3).concat(pravilno);
  const sorted = [...new Set(opts)].sort((a, b) => K.indexOf(a) - K.indexOf(b));
  return Q(uvod + ' ' + trditve.map((t, i) => `(${i + 1}) ${t}`).join(' '), sorted, sorted.indexOf(pravilno), razlaga);
};
const KP = 'Kaj od naštetega je pravilno?';

const kombinacije = [
  withId('qagd8qd', kombo(KP, [
    'Anketa o zadovoljstvu je ena od metod za spremljanje zadovoljstva porabnikov.',
    'Porabnik vedno izbere ponudbo z najnižjo ceno, ne glede na koristi.',
    'Na pričakovanja porabnika vplivajo tudi priporočila prijateljev.',
    'Zaznano vrednost lahko povečamo tudi tako, da porabniku prihranimo čas.'], '1, 3 in 4',
    'Porabnik izbere ponudbo z najvišjo zaznano vrednostjo (vse koristi minus vsi denarni in nedenarni stroški), ne nujno najcenejše.')),
  withId('qs4i9en', kombo(KP, [
    'Digitalne tehnologije olajšajo prepoznavanje segmentov in prilagajanje ponudbe.',
    'Nasičenost domačega trga je eden od razlogov za vstop na tuje trge.',
    'Pri internacionalizaciji podjetje najprej izbere izdelek, šele nato ciljni trg.',
    'Spletna stran naj bo enaka za vse ciljne skupine, ker je tako stroškovno najučinkovitejša.'], '1 in 2',
    'Pri internacionalizaciji je prvo vprašanje KAM (ciljni trgi), nato kako, kaj in kdaj. Spletno stran prilagodimo ciljnim skupinam.')),
  withId('qqmbl8q', kombo(KP, [
    'Podoba znamke je pogled porabnikov, identiteta pa pogled podjetja.',
    'Sodobna opredelitev blagovno znamko enači zgolj z logotipom.',
    'Uspešna znamka potrebuje vlaganja tudi po uvedbi, ne le ob njej.',
    'Zvestoba je ena od sestavin premoženja blagovne znamke.'], '1, 3 in 4',
    'Z logotipom znamko enači tradicionalna, ne sodobna opredelitev. Premoženje znamke: zavedanje, podoba, zaznana kakovost, zvestoba.')),
  withId('quftf0l', kombo(KP, [
    'Spodnjo mejo cene določajo stroški izdelka.',
    'Pri dinamičnih cenah ponudnik cene sproti prilagaja povpraševanju.',
    'Zgornjo mejo cene določa cena najcenejšega konkurenta.',
    'Študentski popust je primer razločevalne cene.'], '1, 2 in 4',
    'Zgornjo mejo cene določa zaznana vrednost za porabnika; cene konkurentov so vmesni dejavnik.')),
  withId('q1s7zxfx', kombo(KP, [
    'Pri selektivni distribuciji podjetje izbere le nekaj posrednikov na območju.',
    'Neposredna tržna pot nima posrednikov.',
    'Oskrbna veriga je ožji pojem kot tržna pot.',
    'Podjetje lahko hkrati prodaja prek spleta in prek trgovcev (večkanalno trženje).'], '1, 2 in 4',
    'Oskrbna veriga je ŠIRŠI pojem: zajema vse od dobaviteljev do porabnika; tržna pot je njen del, usmerjen k ciljnemu trgu.')),
  withId('qaawx0h', kombo(KP, [
    'Segmentiranje je prvi korak ciljnega trženja.',
    'Pri pozicioniranju podjetje izbere, kako želi, da ga porabniki zaznavajo.',
    'Psihografska segmentacija upošteva življenjski slog in osebnost.',
    'Percepcijski zemljevid prikazuje relativni položaj znamk v očeh porabnikov.'], 'Vse štiri',
    'Ciljno trženje: segmentiranje → ciljanje → razlikovanje in pozicioniranje. Vse štiri trditve so pravilne.')),
  withId('qw0otfz', kombo(KP, [
    'Raziskavo smiselno začnemo s pregledom sekundarnih podatkov.',
    'Fokusna skupina je kvantitativna raziskovalna metoda.',
    'Pri omnibus raziskavi si stroške ankete deli več naročnikov.',
    'Opazovanje je primerno, ko porabniki o svojem vedenju ne znajo ali nočejo poročati.'], '1, 3 in 4',
    'Fokusna skupina je kvalitativna metoda. Primarne podatke zbiramo, ko sekundarnih ni ali niso primerni.')),
  withId('q1iz3afr', kombo(KP, [
    'Življenjski cikel izdelka ima štiri stopnje: uvajanje, rast, zrelost in upadanje.',
    'Posnemanje smetane je strategija za stopnjo upadanja.',
    'Stopnjo življenjskega cikla je v praksi pogosto težko določiti.',
    'Večina novih izdelkov na trgu uspe.'], '1 in 3',
    'Posnemanje smetane (visoka cena) je strategija ob uvajanju. Delež neuspešnih novih izdelkov je visok.')),
  withId('q1u2q9e7', kombo(KP, [
    'Starost in življenjski cikel družine sta osebna dejavnika nakupnega vedenja.',
    'Družina sodi med psihološke dejavnike nakupnega vedenja.',
    'Oglas podjetja je formalna (komercialna) komunikacijska pot.',
    'Spletno nakupovanje porabniku prinaša le prednosti.'], '1 in 3',
    'Družina je družbeni dejavnik. Spletno nakupovanje ima tudi slabosti (ni otipa izdelka, tveganje, čakanje na dostavo).')),
  withId('q1s5s9li', kombo(KP, [
    'Neposredno trženje temelji na dobrih bazah podatkov.',
    'Osebna prodaja je najprimernejša za poceni izdelke vsakdanje rabe.',
    'Trženje od ust do ust vodi podjetje s plačanimi oglasi.',
    'Neposredno trženje omogoča ciljano in merljivo komuniciranje.'], '1 in 4',
    'Osebna prodaja je ključna pri zapletenih, dragih in redko kupljenih izdelkih. Trženje od ust do ust so mnenja porabnikov, ki jih podjetje ne nadzoruje.')),
  withId('qji6g0x', kombo(KP, [
    'Porabniki vse bolj sodelujejo pri ustvarjanju vsebin o znamkah.',
    'Kuponi so orodje pospeševanja prodaje, usmerjeno na posrednike.',
    'Sporočilo lahko temelji na razumskem, čustvenem ali moralnem pozivu.',
    'Odnosi z javnostmi so praviloma dražji od oglaševanja.'], '1 in 3',
    'Kuponi in vračila gotovine so usmerjeni na porabnike. Odnosi z javnostmi so praviloma cenejši in bolj verodostojni od oglaševanja.')),
  withId('q1p2g18e', kombo(KP, [
    'Trženje je predvsem oglaševanje in prodaja.',
    'Trženje je povezano z vsemi poslovnimi funkcijami podjetja.',
    'Potrebe porabnikov ustvarijo tržniki.',
    'Želje so potrebe, ki jih oblikujeta kultura in osebnost.'], '2 in 4',
    'Trženje je več kot oglaševanje in prodaja. Potrebe so osnovna stanja pomanjkanja - tržniki jih ne ustvarijo, lahko pa vplivajo na želje.')),
  withId('q1qjdllx', kombo(KP, [
    'Zanesljivost in odzivnost sta določljivki kakovosti storitev.',
    'Tudi proizvodna podjetja potrebujejo znanje o trženju storitev (npr. servis).',
    'Razlikovanje cen ne pomaga pri obvladovanju minljivosti storitev.',
    'Notranje trženje je uporabno tudi v proizvodnih podjetjih.'], '1, 2 in 4',
    'Razlikovanje cen (npr. cenejši termini izven konic) je eden od načinov obvladovanja minljivosti storitev.')),
];

const pn = [
  withId('q1dzycj8', PN('Interbrand pri vrednotenju blagovne znamke upošteva tako finančne kot trženjske kazalnike.', true, 'Interbrand je kombiniran model: združuje finančni vidik (dobiček znamke) in tržni vidik (moč znamke).')),
  withId('q1v4j9zh', PN('Odločitve o tržnih poteh so strateške, ker podjetje nanje veže za daljši čas.', true, 'Tržne poti so velik strošek in dolgoročna obveza (pogodbe s posredniki), zato so strateška odločitev.')),
  withId('q1coz0tw', PN('Red Bull je prepoznavnost na začetku gradil predvsem z dogodki, deljenjem vzorcev in gverilskim trženjem.', true, 'Klasično oglaševanje ni bilo glavno orodje pri uvajanju te znamke.')),
  withId('qzdblc7', PN('Dizajnersko razmišljanje se začne z implementacijo in konča z navdihom.', false, 'Zaporedje je navdih (inspiracija) → ideacija → implementacija.')),
  withId('q25jk05', PN('Podjetje z relativnim tržnim deležem 80 % je tržni vodja.', false, 'Relativni tržni delež = lastni delež / delež največjega konkurenta; tržni vodja ima več kot 100 %.')),
  withId('q6ebqan', PN('Segmenti obstajajo na trgu; tržniki jih morajo prepoznati.', true, 'Tržniki segmentov ne ustvarjajo, ampak jih prepoznajo in nato prilagodijo trženjski splet.')),
  withId('q7xp3z6', PN('Strateško trženjsko načrtovanje se začne z izbiro trženjskega spleta.', false, 'Začne se z opredelitvijo poslanstva → cilji → analiza → strategije → izvedba in nadzor.')),
  withId('qrimcmj', PN('V družini sta kupec in porabnik izdelka lahko različni osebi.', true, 'Kupec opravi nakup, porabnik izdelek uporablja (npr. starš kupi igračo za otroka).')),
  withId('q1ik7r4b', PN('Sodobni pogled na posredovanje vrednosti se začne pri izdelavi izdelka, šele nato iščemo kupce.', false, 'To je tradicionalni pogled »izdelati - prodati«. Sodobni začne pri porabniku: izbrati vrednost → zagotoviti → sporočiti.')),
  withId('qfiwebt', PN('Trženjska kratkovidnost nastane, ko se podjetje osredotoči na izdelek namesto na potrebo, ki jo izdelek zadovoljuje.', true, 'Primer: proizvajalec svedrov, ki pozabi, da kupci v resnici želijo luknjo v steni.')),
  withId('q1943pqq', PN('Novi izdelki v trženjskem smislu so tudi izboljšave in spremembe obstoječih izdelkov.', true, 'Tudi nova embalaža, okus ali izboljšana različica štejejo za nov izdelek.')),
  withId('qbbqtyu', PN('Fizični dokazi so eden od treh dodatnih P-jev pri trženju storitev.', true, 'Dodatni P-ji pri storitvah so ljudje, procesi in fizični dokazi.')),
  withId('q1oy0xkr', PN('Tržna pot dveh ravni ima dva posrednika med proizvajalcem in porabnikom.', true, 'Npr. proizvajalec → veletrgovec → trgovec na drobno → porabnik. Število ravni = dolžina tržne poti.')),
  withId('q14kycrv', PN('Podjetje, ki vse izdelke prodaja pod imenom podjetja, uporablja krovno ime.', true, 'Nasprotje so ločena (individualna) imena za posamezne izdelke.')),
  withId('q5dc0sp', PN('Tržni potencial je odvisen od stanja v okolju, npr. od gospodarske rasti.', true, 'V razcvetu je tržni potencial večji kot v recesiji.')),
  withId('q1m60qxp', PN('Intenzivno, selektivno in ekskluzivno distribucijo ločimo po številu posrednikov na določeni ravni.', true, 'Ne po vrsti posrednikov.')),
  withId('q1opl180', PN('Vsi tržniki se strinjajo, da je treba pri pozicioniranju poudariti natanko tri prednosti.', false, 'Mnenja so deljena: nekateri zagovarjajo eno, drugi dve ali tri prednosti.')),
  withId('qgo3np2', PN('Družina je primarna (članska) referenčna skupina.', true, 'Želene referenčne skupine so tiste, ki jim posameznik želi pripadati.')),
  withId('q1r27v54', PN('Glavna slabost določanja cene s pribitkom je, da zanemari povpraševanje in konkurenco.', true, 'Stroške je razmeroma lahko ugotoviti; težava je, da metoda ne upošteva trga.')),
  withId('q1fc2c4s', PN('Trženjsko obveščanje je sprotno zbiranje podatkov o trgu, trženjsko raziskovanje pa rešuje konkreten problem.', true, 'Raziskovanje je sistematično in usmerjeno na določen trženjski problem.')),
  withId('q1xp3syd', PN('Vrzel med standardi kakovosti in dejansko izvedbo storitve pogosto povzročijo neusposobljeni ali nemotivirani zaposleni.', true, 'To je 3. vrzel v modelu kakovosti storitev.')),
  withId('qtpvsgl', PN('Če znani proizvajalec piškotov pod istim imenom začne prodajati sladoled, gre za širitev linije.', false, 'Obstoječe ime na novi kategoriji izdelkov je širitev blagovne znamke; širitev linije ostane v isti kategoriji.')),
  withId('q10im68i', { q: "Trajnostno trženje poleg želja današnjih porabnikov upošteva tudi dolgoročne posledice ponudbe za okolje in družbo.",
      options: ["Drži","Ne drži"],
      correct: 0,
      explanation: "Trajnostno trženje gleda dlje od trenutnega nakupa: ponudba naj ne škodi okolju in skupnosti, podjetje pa naj ostane uspešno tudi v prihodnje." }),
  withId('q1dw3sj0', PN('Pri internacionalizaciji je prvo vprašanje, na katere tuje trge vstopiti.', true, 'Zaporedje vprašanj: kam, kako, kaj in kdaj.')),
  withId('q1xz9hpk', PN('Na dobavitelje in posrednike (mikrookolje) podjetje lahko vpliva.', true, 'Na makrookolje (demografsko, ekonomsko, politično ...) podjetje praviloma ne more vplivati.')),
  withId('q1mp3uz6', PN('Konkurenti so del makrookolja podjetja.', false, 'Konkurenti so del mikrookolja (skupaj z dobavitelji, posredniki, kupci, javnostmi).')),
  withId('q126es0i', PN('Ena oseba v družini je lahko hkrati pobudnik, odločevalec in kupec.', true, 'Vloge v nakupnem procesu se lahko prekrivajo.')),
  withId('q1nttzje', PN('Mobilne aplikacije in obvestila na telefonu so oblika interaktivnega trženja.', true, 'Mobilno trženje sodi med interaktivno (digitalno) trženje.')),
  withId('qwblfny', PN('Pri kinu je jedro izdelka udoben sedež v dvorani.', false, 'Jedro je korist - doživetje filma; dvorana in sedeži so del dejanskega izdelka.')),
  withId('q1i6o8uz', PN('Strategija počasnega posnemanja smetane pomeni visoko ceno in skromno komuniciranje.', true, 'Strategije uvajanja: hitro/počasno posnemanje smetane (visoka cena), hiter/počasen prodor (nizka cena).')),
  withId('q5aags9', PN('Zaznana kakovost je ena od sestavin premoženja blagovne znamke.', true, 'Sestavine: zavedanje, podoba, zaznana kakovost in zvestoba.')),
  withId('q9didm1', PN('Zgornjo mejo cene določajo stroški proizvodnje.', false, 'Stroški določajo spodnjo mejo, zaznana vrednost porabnika zgornjo.')),
  withId('q19dr5ex', { q: "Pri odnosih z javnostmi podjetje objavo v medijih praviloma plača po enakem ceniku kot oglas.",
      options: ["Drži","Ne drži"],
      correct: 1,
      explanation: "Objava (publiciteta) pri odnosih z javnostmi ni plačan medijski prostor; zato je bolj verodostojna in stroškovno ugodnejša od oglaševanja, a ima podjetje manj nadzora nad sporočilom." }),
  withId('q1ob3bmn', PN('Osebnost in samopodoba sodita med kulturne dejavnike nakupnega vedenja.', false, 'Sodita med osebne dejavnike (poleg starosti, poklica, ekonomskega položaja in življenjskega sloga).')),
  withId('qyhzw0b', PN('Pri merjenju povpraševanja določimo raven izdelka, prostorsko razsežnost in časovno obdobje.', true, 'Merjenje povpraševanja ima tri razsežnosti: izdelek, prostor, čas.')),
];

module.exports = { kombinacije, pn };
