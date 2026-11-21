/* Organizacijsko vedenje - vaje v slogu izpita (trditve P/N in izbirna vprašanja) ter ponovitev pred izpitom.
   Vprašanja so napisana na novo (lastne formulacije in primeri); dejstva so iz predavanj in učbenika. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const D = (q, drzi, explanation) => Q(q, ['Drži', 'Ne drži'], drzi ? 0 : 1, explanation);
const PN = (q, prav, explanation) => Q(q, ['Pravilno', 'Napačno'], prav ? 0 : 1, explanation);

const izpit = [
  withId('q54yyxs', D('Korda med simbole moči šteje tudi to, kako je urejena pisarna vodilnega (velikost mize, razpored prostora).', true,
    'Drži. Med simbole statusa in moči Korda uvršča tudi videz pisarne - masivno pohištvo, velikost in razporeditev prostora.')),
  withId('q13ors6x', D('Osebe z izrazitim makiavelizmom težko lažejo in drugih ne izkoriščajo za lastne cilje.', false,
    'Ne drži. Makiavelisti zlahka manipulirajo in lažejo, kažejo malo empatije; zanje cilj opravičuje sredstva.')),
  withId('qnsm3ku', D('Po načelih instrumentalnega (operantnega) pogojevanja bomo vedenje, ki ni bilo nagrajeno, verjetneje opustili.', true,
    'Drži. Nagrajeno vedenje ponavljamo pogosteje, nenagrajeno redkeje.')),
  withId('qlw6t7y', D('Pri selektivnem zaznavanju posameznik iz okolja izbere in prepozna le nekatere dražljaje, druge pa prezre.', true,
    'Drži. Na izbor vplivajo interesi, izkušnje in osebne značilnosti zaznavalca.')),
  withId('q10plqh0', D('Motivacijo človek podeduje kot stabilno osebnostno potezo.', false,
    'Ne drži. Motivacija je skupek procesov (smer, intenzivnost, vztrajnost), ki so odvisni od posameznika in situacije; ni podedovana lastnost.')),
  withId('q9kwt46', { q: "McClellandova teorija potreb sodi med procesne teorije motivacije.",
      options: ["Drži","Ne drži"],
      correct: 1,
      explanation: "Ne drži. McClellandova teorija (potrebe po dosežkih, moči in povezanosti) je vsebinska teorija, tako kot Maslow, Alderfer in Herzberg; procesne teorije pojasnjujejo, kako motivacija poteka." }),
  withId('q1l6u1lh', D('Po sodobnem (interakcijskem) pogledu je konflikt treba vedno zatreti, ker organizaciji le škoduje.', false,
    'Ne drži. To je tradicionalni pogled. Sodobni pogled konflikt šteje za neizogiben in v zmerni meri koristen.')),
  withId('q2zmim0', D('Netflix smo pri predavanjih obravnavali kot primer kulture svobode in odgovornosti.', true,
    'Drži. Netflix je primer kulture, ki zaposlenim daje veliko svobode in od njih zahteva odgovornost.')),
  withId('qxasrc6', D('Obleka zaposlenih, arhitektura stavbe in logotip sodijo med temeljne predpostavke organizacijske kulture (najgloblja raven po Scheinu).', false,
    'Ne drži. To so artefakti - vidna, površinska raven kulture. Temeljne predpostavke so nezavedna, samoumevna prepričanja.')),
  withId('q6xn99r', D('Etični vodja postavlja standarde, nagrajuje etično vedenje in je pri tem sam dosleden vzornik.', true,
    'Drži. Etični vodje so vzorniki, ki etiko dosledno uresničujejo tudi v lastnem ravnanju.')),
  withId('q16ruuiz', D('V fazi iluminacije ustvarjalnega procesa posameznik problem zavestno odloži in se z njim ne ukvarja.', false,
    'Ne drži. Odložitev problema je inkubacija. Iluminacija je trenutek uvida. Zaporedje: priprava → inkubacija → iluminacija → verifikacija.')),
  withId('q7m4g3o', D('Vloga posredovalca po Mintzbergu sodi med odločitvene vloge.', false,
    'Ne drži. Sprejemalec, posredovalec in govorec so informacijske vloge; odločitvene so npr. podjetnik, reševalec motenj, razporejevalec virov in pogajalec.')),
  withId('q1ovxlff', D('Družbeno izmikanje pomeni, da posameznik v skupini vloži več truda kot pri samostojnem delu.', false,
    'Ne drži. Pri družbenem izmikanju (zastonjkarstvu) posameznik v skupini vloži MANJ truda - to je nakazal že Ringelmannov poskus.')),
  withId('q29hn49', D('Kohezivnost skupine se običajno poveča, če je skupina manjša in če nagrajujemo skupino kot celoto.', true,
    'Drži. Kohezivnost krepijo tudi več skupnega časa, tekmovanje z drugimi skupinami in skupni uspehi.')),
  withId('q1eivf1y', D('Govorice so formalni komunikacijski kanal, ki ga vodstvo načrtno usmerja.', false,
    'Ne drži. Govorice so neformalna komunikacija, ki je vodstvo ne nadzoruje.')),
  withId('qyctwbz', Q('Pfeffer osebne kvalitete za pridobivanje moči deli na voljo in zmožnosti. Katere sodijo med VOLJO?', [
    'Ambicije, energija, fokus', 'Empatija, toleriranje konflikta, samospoznavanje', 'Samozaupanje, empatija, inteligentnost', 'Makiavelizem, proaktivnost, samozavest'], 0,
    'Volja: ambicije, energija, fokus. Zmožnosti: toleriranje konflikta, empatija, samospoznavanje, samozaupanje.')),
  withId('qib9jd6', Q('Zaposleni sledijo vodji, ker ga spoštujejo in bi mu radi bili podobni. Na kateri vir moči se vodja opira?', [
    'Referenčno moč', 'Ekspertno moč', 'Legitimno moč', 'Moč nagrajevanja'], 0,
    'Referenčna moč izvira iz identifikacije sodelavcev z vodjo, njegovega ugleda in privlačnosti osebnosti. Ekspertna izvira iz znanja, legitimna iz položaja.')),
  withId('qg8z6fx', Q('Člani projektne skupine zamolčijo pomisleke, ker se jim zdi, da se vsi strinjajo, in sprejmejo slabo odločitev. Kako imenujemo ta pojav?', [
    'Enoumje (groupthink)', 'Polarizacija skupine', 'Kohezivnost', 'Družbeno izmikanje'], 0,
    'Pri enoumju želja po soglasju prevlada nad realistično presojo; člani živijo v iluziji enotnosti. Polarizacija pomeni premik skupine k skrajnejšemu stališču.')),
  withId('queca5k', Q('Kaj drži za Zimbardov zaporniški eksperiment?', [
    'Vloge pazikov in zapornikov so bile udeležencem dodeljene naključno', 'Udeležence so v vloge razporedili glede na izmerjeno agresivnost', 'Poskus je potekal do konca načrtovanega obdobja brez zapletov', 'Pokazal je, da se ljudje novim vlogam ne prilagajajo'], 0,
    'Vloge so bile dodeljene naključno (testiranje je le izločilo k agresiji nagnjene). Poskus so predčasno prekinili, ker so se udeleženci vlogam prilagodili hitreje in huje, kot so pričakovali.')),
  withId('qy3fo1t', Q('Kako imenujemo stališče zaposlenega, ki se poistoveti s podjetjem in njegovimi cilji ter želi v njem ostati?', [
    'Organizacijska pripadnost', 'Zadovoljstvo z delom', 'Organizacijsko državljansko vedenje', 'Zavzetost za delo'], 0,
    'Organizacijska pripadnost = identifikacija z organizacijo in želja ohraniti članstvo. Zadovoljstvo je pozitiven odnos do dela, državljansko vedenje pa prostovoljno ravnanje nad okvirom delovnih nalog.')),
  withId('q1f5tf8c', Q('Vodja oddelka direktorju poroča le dobre novice, slabe pa omili ali izpusti. Za katero oviro v komuniciranju gre?', [
    'Filtriranje', 'Selektivno zaznavanje', 'Zaznavna obramba', 'Informacijska preobremenjenost'], 0,
    'Filtriranje je namerno prirejanje sporočila, da je prejemniku všečnejše. Selektivno zaznavanje se dogaja pri prejemniku, ne pri pošiljatelju.')),
  withId('q1bnn3uc', Q('Kaj velja za razliko med emocijami in razpoloženji?', [
    'Emocije sproži konkreten dogodek, razpoloženja pogosto nimajo jasnega vzroka in trajajo dlje', 'Razpoloženja sproži konkreten dogodek, emocije nimajo jasnega vzroka', 'Emocije trajajo dlje kot razpoloženja', 'Razpoloženja so vedno intenzivnejša od emocij'], 0,
    'Emocije so intenzivne, kratkotrajne in usmerjene na nekaj ali nekoga. Razpoloženja so manj intenzivna, trajajo dlje in pogosto nimajo prepoznavnega sprožilca.')),
  withId('qqnzdr6', Q('Pri razgovoru za službo dobi povprečen kandidat slabšo oceno, ker je bil tik pred njim izjemen kandidat. Za katero napako pri zaznavanju gre?', [
    'Učinek kontrasta', 'Halo učinek', 'Temeljna napaka pripisovanja', 'Projekcija'], 0,
    'Pri učinku kontrasta oceno popači primerjava z osebo, ki smo jo srečali tik prej. Halo učinek pomeni sklepanje iz ene lastnosti na celoto.')),
  withId('ql98nfw', Q('Katera trditev se ujema z Buzanovim pogledom na učenje?', [
    'Učenje je vzpostavljanje asociativnih zvez in poteka vse življenje', 'Možgani so genetsko v celoti določeni in jih učenje ne spreminja', 'Pozabljanje je neizogibno propadanje vsega naučenega', 'Učenje se konča z odraslostjo'], 0,
    'Buzan: možgane oblikuje aktivnost, učenje so asociativne zveze, proces traja vse življenje; »pozabljanje« je le brisanje zvez.')),
  withId('q6ck0tb', Q('Po katerem pristopu stres nastane, ko zunanje zahteve porušijo posameznikovo naravno ravnotežje?', [
    'Homeostatični pristop', 'Pristop kognitivne ocene', 'Pristop skladnosti oseba-okolje', 'Psihoanalitični pristop'], 0,
    'Homeostatični pristop (Cannon) stres razume kot porušeno ravnotežje. Pri kognitivni oceni je ključno, kako posameznik situacijo oceni.')),
  withId('qg3syob', Q('Starš mora zaradi nujnega sestanka izpustiti otrokovo šolsko prireditev. Kateri vrsti konflikta vlog to ustreza?', [
    'Konflikt med vlogami', 'Konflikt znotraj vloge', 'Konflikt oseba-vloga', 'Dvoumnost vloge'], 0,
    'Zahteve ene vloge (delo) onemogočijo izpolnitev druge (družina) - konflikt med vlogami, kamor sodi konflikt delo-družina.')),
  withId('q1648ubu', Q('Študent se pri predmetu ne trudi, ker meni, da mu tudi dober rezultat ne bo prinesel štipendije. Katera teorija motivacije to najbolje pojasni?', [
    'Vroomova teorija pričakovanj (nizka instrumentalnost)', 'Adamsova teorija pravičnosti', 'Herzbergova dvofaktorska teorija', 'Alderferjeva teorija ERG'], 0,
    'Vroom: motivacija = pričakovanje × instrumentalnost × valenca. Če uspešnost ne vodi do nagrade (instrumentalnost ≈ 0), motivacije ni.')),
  withId('qssmmhv', Q('Katero lastnost vodje so anketiranci v raziskavah Kouzesa in Posnerja najpogosteje postavili na prvo mesto?', [
    'Poštenost', 'Kompetentnost', 'Navdihovanje', 'Inteligentnost'], 0,
    'V vseh ponovitvah raziskave je bila na prvem mestu poštenost; sledile so usmerjenost v prihodnost, kompetentnost in navdihovanje.')),
  withId('q1myc75b', Q('Nekateri sodelavci imajo z vodjo tesen, zaupen odnos, drugi le formalnega. Katera teorija vodenja razlikuje ti skupini?', [
    'Teorija izmenjave vodja-sodelavec (LMX)', 'Fiedlerjev kontingenčni model', 'Hersey-Blanchardova situacijska teorija', 'Teorija transformacijskega vodenja'], 0,
    'LMX loči »notranjo« skupino (kakovostne izmenjave, več zaupanja) in »zunanjo« skupino (formalen odnos).')),
  withId('qlcx4g2', Q('Raziskovalec isti vprašalnik čez mesec dni ponovno uporabi na istih ljudeh, da preveri, ali dobi podobne rezultate. Katera merska lastnost ga zanima?', [
    'Zanesljivost', 'Veljavnost', 'Objektivnost', 'Občutljivost'], 0,
    'Ponovljivost rezultatov (test-retest) je zanesljivost. Veljavnost pove, ali merimo to, kar želimo meriti.')),
  withId('q6o37bp', Q('Nova sodelavka v prvih mesecih spoznava neformalna pravila in vrednote podjetja. Kako imenujemo ta proces?', [
    'Organizacijska socializacija', 'Institucionalizacija', 'Mentorstvo', 'Usposabljanje'], 0,
    'Organizacijska socializacija je proces, v katerem novi zaposleni prevzamejo vrednote in norme kulture. Mentorstvo in usposabljanje sta lahko njegova orodja.')),
  withId('qk259nk', Q('Sodelavec v sporih vedno popusti, da ohrani dober odnos, čeprav se pri tem odpove svojim interesom. Katero strategijo reševanja konfliktov uporablja?', [
    'Izglajevanje', 'Izogibanje', 'Reševanje problemov', 'Pospeševanje'], 0,
    'Izglajevanje (prilagajanje): nizka skrb zase, visoka skrb za drugega. Pri izogibanju se konfliktu umaknemo, pri reševanju problemov iščemo rešitev, ki koristi obema.')),
  withId('q1ozuln9', Q('Pri timski vaji razvrščanja predmetov za preživetje rezultate primerjamo s strokovno rešitvijo. Kdaj lahko rečemo, da je tim dosegel sinergijo?', [
    'Ko je napaka tima manjša od najmanjše individualne napake', 'Ko je napaka tima večja od povprečne individualne napake', 'Ko je povprečna individualna napaka manjša od najmanjše', 'Ko je največja individualna napaka manjša od napake tima'], 0,
    'Uspešnost tima merimo z napako tima, najboljšega posameznika z najmanjšo individualno napako. Če je tim boljši celo od najboljšega člana, gre za sinergijo.')),
  withId('qj6t1pb', Q('Rokeach vrednote deli na terminalne in instrumentalne. Kateri primer je instrumentalna vrednota?', [
    'Poštenost kot način ravnanja', 'Svoboda kot končni cilj', 'Mir v svetu kot končni cilj', 'Udobno življenje kot končni cilj'], 0,
    'Terminalne vrednote so želena končna stanja, instrumentalne pa načini ravnanja, s katerimi jih dosegamo (poštenost, pogum, odgovornost).')),
  withId('qro633x', Q('Katera lastnost NE sodi med dimenzije modela Velikih pet?', [
    'Makiavelizem', 'Vestnost', 'Sprejemljivost', 'Odprtost za izkušnje'], 0,
    'Velikih pet: ekstravertiranost, sprejemljivost, vestnost, čustvena stabilnost in odprtost za izkušnje. Makiavelizem je posebna osebnostna lastnost.')),
  withId('q19d4swo', Q('Tomaž je prepričan, da je njegovo napredovanje odvisno predvsem od njegovega truda in znanja. Kaj je zanj značilno?', [
    'Notranji lokus kontrole', 'Zunanji lokus kontrole', 'Makiavelizem', 'Nizka samoučinkovitost'], 0,
    'Notranji lokus kontrole: izide pripisujemo lastnim dejanjem. Pri zunanjem jih pripisujemo sreči, drugim ljudem ali okoliščinam.')),
  withId('q175x0su', Q('Kateri generaciji pripisujemo vrednote, kot so ambicioznost, upiranje avtoriteti in lojalnost lastni karieri?', [
    'Baby-boom generaciji (rojeni 1945-1964)', 'Generaciji X', 'Generaciji Y (milenijci)', 'Generaciji Z'], 0,
    'Te vrednote pripisujemo baby-boom generaciji. Generaciji X pripisujemo predvsem neodvisnost in ravnovesje med delom in življenjem.')),
  withId('qjvninh', Q('Kaj NE drži za organizacijsko vedenje kot znanstveno disciplino?', [
    'Organizacije obravnava kot zaprte sisteme, neodvisne od okolja', 'Povzema spoznanja psihologije, sociologije in antropologije', 'Pojave proučuje sistematično z raziskovalnimi metodami', 'Upošteva, da so učinki odvisni od situacije'], 0,
    'OV organizacije obravnava kot odprte sisteme. Sidra OV: interdisciplinarnost, znanstvena metoda, kontingenčnost, večnivojskost (posameznik, skupina, organizacija).')),
  withId('q1mz1p48', Q('Katero ravnanje vodje izhaja iz McGregorjeve teorije X?', [
    'Vodja natančno predpiše postopke in dnevno nadzira delo', 'Vodja zaposlene vključi v reševanje problemov', 'Vodja zaposlenim prepusti odločitve o načinu dela', 'Vodja spodbuja samoiniciativnost in odgovornost'], 0,
    'Teorija X predpostavlja, da ljudje delo neradi opravljajo in se izogibajo odgovornosti, zato jih je treba nadzirati. Ostala ravnanja ustrezajo teoriji Y.')),
  withId('q241zpt', Q('Katera disciplina je organizacijskemu vedenju prispevala spoznanja o razlikah v vrednotah in stališčih med kulturami?', [
    'Antropologija', 'Psihologija', 'Sociologija', 'Politične vede'], 0,
    'Antropologija proučuje družbe in kulture ter njihove primerjave. Psihologija prispeva predvsem k razumevanju posameznika, sociologija skupin in organizacij.')),
];

const poudarki = [
  withId('q1mebrj6', Q('Oblikovalski timi (npr. v podjetju IDEO) pri svojem delu nenehno usklajujejo zamisli. Katera stopnja soodvisnosti nalog je zanje značilna?', [
    'Poglobljena (popolna) soodvisnost', 'Združevalna soodvisnost', 'Zaporedna soodvisnost', 'Soodvisnost le pri končnem rezultatu'], 0,
    'Pri poglobljeni soodvisnosti člani nenehno sodelujejo in se usklajujejo - to je najvišja stopnja interakcije.')),
  withId('q1ad8nlc', PN('Po Tuckmanovem modelu skupina najprej preide viharno fazo in šele nato oblikuje skupne norme.', true,
    'Pravilno. Faze: oblikovanje → viharna faza → oblikovanje norm → izvajanje → zaključevanje. Norme nastanejo v svoji fazi, ne sočasno z izvajanjem nalog.')),
  withId('q1l2hc79', Q('Vodja opazi, da sodelavec zamuja le na ponedeljkove sestanke, drugje pa je točen. Kateri Kelleyjev kriterij pri tem opazuje?', [
    'Razločevalnost', 'Doslednost', 'Konsenzualnost', 'Kontrast'], 0,
    'Razločevalnost: ali se oseba v različnih situacijah vede različno. Doslednost: ali se v isti situaciji vede enako skozi čas. Konsenzualnost: ali se drugi v isti situaciji vedejo enako.')),
  withId('q2penw6', Q('Ana po menjavi službe prve mesece navdušeno hvali novo delo, nato zadovoljstvo upade. Kako imenujemo začetni vzpon zadovoljstva?', [
    'Učinek medenega meseca', 'Učinek mačka', 'Halo učinek', 'Učinek kontrasta'], 0,
    'Učinek medenega meseca: po zamenjavi službe zadovoljstvo začasno močno naraste; sledi lahko upad (učinek mačka).')),
  withId('q1hq2gde', PN('Ljudje isto situacijo zaznavajo različno, ker na zaznavo vplivajo tudi izkušnje, motivi in pričakovanja.', true,
    'Pravilno. Zaznava ni le odsev dražljajev; oblikujejo jo lastnosti zaznavalca, zaznavanega in situacije.')),
  withId('qu103ca', PN('Zadovoljstvo z delom najverjetneje povečamo z enoličnimi nalogami brez izzivov in odgovornosti.', false,
    'Napačno. Zadovoljstvo povečujejo delovna mesta z izzivi, pravično plačilo, kompetentni nadrejeni in opolnomočenje.')),
  withId('q1wyz7sh', PN('Po dispozicijskem modelu je zadovoljstvo z delom predvsem odraz trenutnih razmer na delovnem mestu in se hitro spreminja.', false,
    'Napačno. Dispozicijski model zadovoljstvo razume kot razmeroma stabilno značilnost posameznika, ki se kaže v različnih situacijah.')),
  withId('q4k5fuo', Q('Po Karasekovem modelu kombinacija visokih delovnih zahtev in nizkega nadzora (avtonomije) vodi v:', [
    'Visok stres (preobremenitev)', 'Aktivno delo in učenje', 'Pasivno delo', 'Nizek stres'], 0,
    'Visoke zahteve + nizek nadzor = obremenjujoče delo (distres). Visoke zahteve + visok nadzor = aktivno delo (eustres). Nizke zahteve + nizek nadzor = pasivnost.')),
  withId('q1q56wgf', Q('Zaposluješ za humanitarno organizacijo in iščeš kandidate, ki jim je mar za dobrobit drugih. Na katero skupino Schwartzovih vrednot se osredotočiš?', [
    'Samopreseganje (dobrohotnost, univerzalizem)', 'Samopoudarjanje (moč, dosežki)', 'Ohranjanje (tradicija, varnost)', 'Odprtost za spremembe (stimulacija, samostojnost)'], 0,
    'Dobrohotnost in univerzalizem sta vrednoti samopreseganja v Schwartzovi teoriji individualnih vrednot.')),
  withId('q10jhz8y', PN('Vrednote so razmeroma trajne in se pri odraslem človeku ne spreminjajo iz meseca v mesec.', true,
    'Pravilno. Vrednote so posplošeni, razmeroma stabilni motivacijski cilji.')),
  withId('q11a0i7m', { q: "Tina vodi prodajni oddelek: vsak ponedeljek postavi tedenske cilje, sproti spremlja številke in naloge razdeli med sodelavce. Oddelek dosega načrt, za počutje ekipe pa si vzame malo časa. Katera vedenjska vloga po Lipičniku prevladuje?",
      options: ["Proizvajalec","Integrator","Administrator","Podjetnik"],
      correct: 0,
      explanation: "Proizvajalec je usmerjen v rezultate in učinkovitost (cilji, spremljanje, delegiranje). Integrator je usmerjen v ljudi in odnose, administrator v pravila in postopke, podjetnik v nove priložnosti." }),
  withId('qgrlsux', Q('Podjetje išče notranjega naslednika direktorja, ki bo povezal zaposlene in ohranil dobre odnose. Katera vedenjska vloga je najprimernejša?', [
    'Integrator', 'Administrator', 'Podjetnik', 'Proizvajalec'], 0,
    'Integrator je usmerjen k ljudem, ceni harmonijo in povezuje zaposlene, zato je primeren za prevzem vodenja v obdobju prehoda.')),
];

module.exports = {
  id: 'ov',
  parts: [{ id: 'izpit', decks: [
    { id: 'ov-izpit2021', name: 'Vaje v slogu izpita (trditve in izbirna vprašanja)', questions: izpit },
    { id: 'ov-poudarki', name: 'Ponovitev pred izpitom', questions: poudarki },
  ] }],
};
