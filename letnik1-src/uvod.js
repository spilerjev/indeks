/* Uvod v poslovanje (1. letnik, 1. semester) - 2. kolokvij in izpit.
   Viri: osnovne informacije 2025/26 (P1), predavanja 6 (nominalna/realna ekonomičnost, rentabilnost)
   in 7 (teorija produkcije, stroški, prag rentabilnosti, optimalni obseg) iz EF Zapiski,
   vaje v slogu izpita so napisane na novo (lastna formulacija, nove številke). Vsi rezultati so preračunani.
   Kolokvij: 30 min, 10 vprašanj izbirnega tipa (1 pravilen). Izpit: 90 min, teorija + računske naloge, 80 točk. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const cards = (arr) => arr.map(([front, back]) => ({ front, back }));

const NOTES_K2 = `
## Kako poteka 2. kolokvij
- 2. kolokvij je na vajah v prvem tednu januarja (2025/26: 5.-9. 1.). **30 minut, 10 vprašanj izbirnega tipa, 1 pravilen odgovor, 10 točk.**
- Snov: nadaljevanje predavanj po 1. kolokviju - nominalna in realna ekonomičnost, rentabilnost, teorija produkcije in stroškov, prag rentabilnosti, optimalni obseg poslovanja.
> Točen obseg snovi povesta predavateljici na predavanjih in vajah - preveri na Canvasu.

## 6 · Ekonomičnost (2. del) in rentabilnost
### Nominalna in realna ekonomičnost
- **Nominalna (EN)** = Σ(Q·PC) / Σ(Qp·NC) v **tekočih** cenah. **Realna (ER)** = isto v **stalnih** cenah (cene izhodiščnega leta).
- **ER** kaže dejansko učinkovitost: odvisna je od **produktivnosti dela** in **racionalnosti trošenja** (izkoriščenost časa, opreme, materiala, izmet).
- **EN** = vpliv ER + **vpliv inflacije**. Inflacija je **ugodna**, ko cene učinkov (PC) rastejo hitreje kot cene prvin (NC); **neugodna**, ko rastejo počasneje.
- ER ugodna + inflacija ugodna → EN naraste **bolj** kot ER. ER ugodna + inflacija neugodna → EN naraste manj, ostane enaka ali pade (pade, če je vpliv inflacije močnejši).
### Rentabilnost (dobičkonosnost)
- **ROE** = dobiček / povprečni kapital (vidik lastnika). **ROA** = dobiček / povprečna sredstva (vidik podjetja kot celote).
- Ker je kapital ≤ sredstva, je pri dobičku **ROE ≥ ROA**.
- **DuPont**: ROE = ROA × (sredstva / kapital). Večja zadolženost → večje razmerje sredstva/kapital → večji ROE pri danem ROA.
- ROA = dobičkovnost prihodkov × obračanje sredstev = (dobiček/prihodki) × (prihodki/sredstva) = **(1 − 1/E) × KOS**.

## 7 · Teorija produkcije
### Produkcijski faktorji
- **Fiksni** (obsega ne moremo takoj spremeniti) in **variabilni** (lahko ga spremenimo takoj).
- **Zelo kratko obdobje**: vsi faktorji fiksni, ni produkcije, ponudba le iz zalog. **Kratko**: fiksni + variabilni (obdobje produkcije). **Dolgo**: vsi variabilni (obdobje planiranja).
- **Aktivni** vplivajo na velikost produkta, **pasivni** na kakovost. **Substitucijski** se zamenjujejo (tehnični koeficienti variabilni), **komplementarni** se dopolnjujejo (tehnični koeficienti fiksni).
- **Tehnični koeficient** = količina faktorja / količina produkta.
- Produkcijska funkcija: **maksimalni** možni produkt pri dani kombinaciji faktorjev z najboljšo razpoložljivo tehnologijo. Predpostavke: fizične enote, homogeni in deljivi, le aktivni faktorji, najboljša tehnologija.
- **Cobb-Douglas**: Q = A·K^α·L^β, α = eK, β = eL. Linearna v logaritmih.
### Kratkoročna produkcijska funkcija Q = f(K0, L)
- **MPV** = ΔQ/ΔV (naklon tangente), **APV** = Q/V (naklon poltraka iz izhodišča).
- **Zakon o padajočem mejnem fizičnem donosu**: pri fiksnem drugem faktorju MPV najprej narašča, nato neizogibno pada (fiksni faktor je prezasičen z variabilnim). Velja v kratkem obdobju - **ne zamenjuj s padajočimi donosi obsega** (dolgo obdobje).
- MPV > APV → APV narašča; **MPV = APV → APV max**; MPV < APV → APV pada. Ko je Q max, je MPV = 0.
### Tri področja produkcije
| Področje | Kaj velja | Ali proizvajamo |
|---|---|---|
| I. | APV narašča (do APV max) | ne - fiksni faktor premalo izkoriščen |
| II. (ekonomsko) | MPV in APV padata, MPV > 0 | da - vsa razmerja tehnično optimalna |
| III. | MPV < 0 | ne - fiksni faktor prezasičen |
- **Ekstenzivna meja (EM)**: APV max (= MPV), minimalni obseg variabilnega faktorja. **Intenzivna meja (IM)**: MPV = 0, maksimalni obseg.
- **Simetričnost**: I. področje za variabilni faktor = III. za fiksni, II. je skupno. IM za variabilni = EM za fiksni. Popolna simetričnost velja le za **linearno homogeno** funkcijo (e = 1).
### Donosi obsega in elastičnosti
- **e** (koeficient produkcijske funkcije) = % sprememba Q ob 1 % povečanju **vseh** faktorjev. **e = eL + eK**. e > 1 naraščajoči, = 1 konstantni, < 1 padajoči donosi.
- **eL = MPL/APL** (% sprememba Q ob 1 % več L pri fiksnem K), **eK = MPK/APK**. e je dolgoročni, eL in eK kratkoročna koncepta.
- **Eulerjev teorem**: MPL·L + MPK·K = e·Q.
- V EM faktorja je eX = 1 (MP = AP), v IM je eX = 0 (MP = 0).

## 7 · Stroški in obseg poslovanja
- **FC** niso odvisni od obsega (najemnina, zavarovanje, časovna amortizacija) - fiksni le znotraj danih zmogljivosti (**relativno fiksni**). **VC** z obsegom vedno naraščajo: progresivni (EVC > 1), proporcionalni (= 1), degresivni (< 1). TC = FC + VC, krivulja TC je vzporedna VC.
- **AFC = FC/Q** vedno pada; AVC: progresivni VC → narašča, proporcionalni → konstantni, degresivni → pada. **AC = AFC + AVC = lastna cena**, pri kratkoročni produkcijski funkciji oblike U.
- **MC = ΔTC/ΔQ = ΔVC/ΔQ** - mejni stroški so po izvoru v celoti variabilni. **MC = Pv / MPv**.
- MC < AC → AC pada; **MC = AC → AC min**; MC > AC → AC narašča. MC seka AVC in AC v njunih minimumih.
### Elastičnost stroškov
- **ETC = MC/AC = 1/e**. ETC > 1 ↔ padajoči donosi; = 1 ↔ konstantni; < 1 ↔ naraščajoči.
- **EAC = ETC − 1**: > 0 → AC naraščajo, = 0 → konstantni, < 0 → padajo. **EFC = 0**.
- Točkovna elastičnost: ETC = (ΔTC/TC1) / (ΔQ/Q1).

## 7 · Prag rentabilnosti in optimalni obseg
- **Prag rentabilnosti** (točka preloma): ni ne dobička ne izgube - **TR = TC** oz. **P = AC (lastna cena)**. Predpostavka: kar proizvede, tudi proda (stroški = odhodki).
- Pri kratkoročni produkcijski funkciji sta pri P > ACmin **dva** praga; pri proporcionalnih VC le **en**.
- **Q_BE = FC / (P − AVC)**; P − AVC = **pokritje** (prispevek za kritje). Splošno: Q = (FC + π) / (P − AVC).
- Prag znižamo z nižjimi FC, nižjimi AVC ali višjo ceno.
- **MR = AR = P** (popolna konkurenca). **Mπ = P − MC**, **Aπ = P − AC**.
- **Optimalni obseg**: **P = MC** (Mπ = 0, Tπ max) - ne pri ACmin! Dokler je P > MC, se splača povečevati obseg.
| Raven cene | Pri optimalnem obsegu |
|---|---|
| P > ACmin | dobiček (največji) |
| P = ACmin | ni dobička ne izgube - optimum je hkrati prag rentabilnosti |
| AVCmin < P < ACmin | izguba, a manjša od FC → kratkoročno proizvaja |
| P = AVCmin | izguba = FC → točka indiferentnosti |
| P < AVCmin | ne proizvaja |
> Pogosta napaka: podjetje kratkoročno posluje z izgubo, če s prihodki pokrije **variabilne** stroške (TR > VC), ne fiksnih!
- P > MC → proizvaja premalo (poveča obseg); P < MC → proizvaja preveč (zmanjša obseg).
`;

const NOTES_IZPIT = `
## Kako poteka izpit
- Pisni izpit, **90 minut, 80 točk**: teoretična vprašanja (izbirna, pogosto z več pravilnimi odgovori) in računske naloge. Kolokvija prineseta do 20 točk. **Za pozitivno oceno 60 %.**
- Pogoste izpitne naloge: prag rentabilnosti (izpeljava obrazca + stopnja izkoriščenosti), ROA/ROE in ekonomičnost, prejemki-prihodki-stroški-odhodki, kalkulacija z dodatki, amortizacija, Eulerjev teorem in elastičnost stroškov, mejni stroški, realna produktivnost.
- Pri izpeljavah in skicah (simetričnost področij, mejni dobiček) mora biti vse natančno označeno.
### Prejemki, prihodki, stroški, odhodki, izdatki
- **Izdatki** = odlivi denarja, **prejemki** = prilivi denarja.
- **Stroški** = vrednost porabljenih prvin (za vso proizvodnjo). **Odhodki** = stroški, ki se nanašajo na **prodane** učinke (prodana količina × lastna cena).
- **Prihodki** = vrednost prodanih učinkov po načelu zaračunane prodaje (ob izstavitvi računa), ne ob plačilu.
- Če proizvede več, kot proda → stroški > odhodki. Dano posojilo je izdatek, ki ni strošek.
### Kalkulacija z dodatki
1. Splošne stroške razdeliš s ključem: **dodatek (%) = splošni stroški / osnova** (npr. vsi neposredni stroški ali neposredno delo).
2. Vsakemu proizvodu prišteješ dodatek × njegova osnova.
3. **Lastna cena = vsi stroški proizvoda / količina.**
`;

/* ---------- 2. kolokvij ---------- */
const ekonRent = [
  Q('Kaj je realna ekonomičnost (ER)?', [
    'Razmerje med vrednostjo učinkov in prvin v stalnih cenah',
    'Razmerje med vrednostjo učinkov in prvin v tekočih cenah',
    'Razmerje med dobičkom in povprečno vloženimi sredstvi',
    'Razmerje med obsegom proizvodnje in opravljenimi urami'], 0,
    'ER izloči vpliv cen: količine vrednotimo po stalnih (izhodiščnih) cenah. Tako pokaže dejansko učinkovitost podjetja.'),
  Q('Od česa je odvisno gibanje realne ekonomičnosti?', [
    'Od produktivnosti dela in racionalnosti trošenja prvin',
    'Od gibanja prodajnih in nabavnih cen na trgih',
    'Od strukture virov financiranja in zadolženosti',
    'Od hitrosti obračanja obratnih in osnovnih sredstev'], 0,
    'ER kaže učinkovitost: produktivnost dela in racionalnost trošenja (izkoriščenost časa, opreme, materiala, izmet). Cene vplivajo le na nominalno ekonomičnost.'),
  Q('Kdaj je vpliv inflacije na nominalno ekonomičnost ugoden?', [
    'Ko cene poslovnih učinkov rastejo hitreje kot cene prvin',
    'Ko cene poslovnih prvin rastejo hitreje kot cene učinkov',
    'Ko cene učinkov in cene prvin rastejo enako hitro',
    'Ko realna ekonomičnost raste hitreje kot nominalna'], 0,
    'Ugoden vpliv: ↑PC > ↑NC (prihodki se dražijo bolj kot vložki). Neugoden: ↑PC < ↑NC. Ni vpliva: ↑PC = ↑NC.'),
  Q('Realna ekonomičnost se je izboljšala, vpliv inflacije pa je bil neugoden. Kaj velja za nominalno ekonomičnost?', [
    'Lahko naraste, ostane enaka ali pade - pade, če prevlada inflacija',
    'Vedno naraste, in sicer bolj kot se je izboljšala realna ekonomičnost',
    'Vedno pade, ker neugoden vpliv inflacije vedno prevlada nad vplivom ER',
    'Ostane nespremenjena, ker se ugoden in neugoden vpliv vedno izničita'], 0,
    'Vplivi delujejo v nasprotni smeri. Če je neugodni vpliv inflacije močnejši od ugodnega vpliva ER, EN pade; če je šibkejši, EN naraste manj kot ER.'),
  Q('Obrat je lani proizvedel 10 % več ob 4 % več delovnih urah, izmet se je zmanjšal, izkoriščenost strojev povečala. Prodajne cene so zrasle za 9 %, cene porabljenih prvin za 6 %. Kaj velja?', [
    'Nominalna ekonomičnost se je povečala bolj kot realna',
    'Realna ekonomičnost se je povečala bolj kot nominalna',
    'Produktivnost dela se je zmanjšala, vpliv cen je ugoden',
    'Vpliv cen je neugoden, realna ekonomičnost se je zmanjšala'], 0,
    'Produktivnost ↑ (1,10/1,04), izmet ↓, izkoriščenost ↑ → realna ekonomičnost (ER) se izboljša. Cene učinkov rastejo hitreje kot cene prvin (9 % > 6 %) → ugoden vpliv cen. Oba vpliva delujeta v isto smer, zato nominalna (EN) zraste bolj kot ER.'),
  Q('Obrat je proizvedel 6 % več ob 5 % več urah, izmet je manjši, izkoriščenost strojev večja. Prodajne cene so zrasle za 3 %, cene prvin za 7 %. Kaj velja?', [
    'Vpliv cen je neugoden, realna ekonomičnost se je povečala',
    'Vpliv cen je ugoden, realna ekonomičnost se je povečala',
    'Vpliv cen je neugoden, realna ekonomičnost se je zmanjšala',
    'Nominalna ekonomičnost je zagotovo zrasla bolj kot realna'], 0,
    'Produktivnost ↑ (1,06/1,05), izmet ↓, izkoriščenost ↑ → ER se izboljša. Cene prvin rastejo hitreje kot cene učinkov (7 % > 3 %) → neugoden vpliv cen. EN pade le, če je vpliv cen močnejši od izboljšanja ER.'),
  Q('Kaj meri rentabilnost sredstev (ROA)?', [
    'Dobiček glede na povprečno vložena vsa poslovna sredstva',
    'Dobiček glede na povprečni kapital, ki so ga vložili lastniki',
    'Prihodke glede na povprečno vložena vsa poslovna sredstva',
    'Prihodke glede na odhodke v istem obračunskem obdobju'], 0,
    'ROA = dobiček / povprečna sredstva - vidik podjetja kot celote. ROE = dobiček / povprečni kapital - vidik lastnika. Prihodki/odhodki je ekonomičnost.'),
  Q('Kateri kazalnik je običajno večji, ROA ali ROE, in zakaj?', [
    'ROE, ker je povprečni kapital manjši od povprečnih sredstev',
    'ROA, ker so povprečna sredstva večja od povprečnega kapitala',
    'ROE, ker dobiček za lastnike vključuje še obresti dolgov',
    'Enaka sta, ker sta sredstva in obveznosti do virov enaki'], 0,
    'Sredstva = kapital + dolgovi, zato je kapital ≤ sredstva. Isti dobiček, deljen z manjšim imenovalcem, da večji ROE.'),
  Q('Podjetje pri nespremenjeni donosnosti sredstev (ROA) del lastniškega kapitala nadomesti s posojilom. Kaj se po DuPontovi razčlenitvi zgodi z ROE?', [
    'ROE naraste, ker se poveča razmerje sredstva/kapital (finančni vzvod)',
    'ROE pade, ker se razmerje sredstva/kapital zmanjša',
    'ROE se ne spremeni, ker je ROA enak',
    'ROE naraste, ker se poveča razmerje sredstva/dolg'], 0,
    'ROE = ROA × sredstva/kapital. Več dolga pri enakih sredstvih pomeni manj kapitala, večje razmerje sredstva/kapital in višji ROE (a tudi večje tveganje).'),
  Q('Kako je ROA povezana z ekonomičnostjo (E) in koeficientom obračanja sredstev (KOS)?', [
    'ROA = (1 − 1/E) × KOS',
    'ROA = (E − 1) × KOS',
    'ROA = (1 − E) / KOS',
    'ROA = E × (1 − 1/KOS)'], 0,
    'ROA = dobiček/prihodki × prihodki/sredstva. Dobiček/prihodki = (P − O)/P = 1 − O/P = 1 − 1/E. Drugi faktor je obračanje sredstev.'),
];

const produkcija = [
  Q('Kaj so fiksni produkcijski faktorji?', [
    'Faktorji, katerih obsega zaposlitve ne moremo takoj spremeniti',
    'Faktorji, katerih obseg zaposlitve lahko takoj prilagodimo',
    'Faktorji, ki vplivajo predvsem na kakovost produkta',
    'Faktorji, ki se v produkcijskem procesu medsebojno zamenjujejo'], 0,
    'Fiksni = obsega ne moremo brez težav spremeniti takoj, ko je to potrebno. Variabilni = lahko ga spremenimo takoj. Kakovost določajo pasivni, zamenjujejo se substitucijski.'),
  Q('Kaj je značilno za kratko obdobje?', [
    'Imamo fiksne in variabilne faktorje, zato ga imenujemo obdobje produkcije',
    'Vsi faktorji so fiksni, ponudba se oblikuje le iz obstoječih zalog',
    'Vsi faktorji so variabilni, zato ga imenujemo obdobje planiranja',
    'Vsi faktorji so komplementarni, tehnični koeficienti so fiksni'], 0,
    'Zelo kratko: vse fiksno, le zaloge. Kratko: fiksni + variabilni (obdobje produkcije). Dolgo: vse variabilno (obdobje planiranja).'),
  Q('Kaj velja za substitucijske produkcijske faktorje?', [
    'Medsebojno se zamenjujejo, njihovi tehnični koeficienti so variabilni',
    'Medsebojno se dopolnjujejo, njihovi tehnični koeficienti so fiksni',
    'Medsebojno se zamenjujejo, njihovi tehnični koeficienti so fiksni',
    'Vplivajo le na kakovost produkta, ne pa na njegovo velikost'], 0,
    'Substitucijski se zamenjujejo (variabilni tehnični koeficienti), komplementarni se dopolnjujejo (fiksni koeficienti). Tehnični koeficient = količina faktorja / količina produkta.'),
  Q('Kaj prikazuje produkcijska funkcija?', [
    'Maksimalni možni produkt pri vsaki kombinaciji faktorjev z najboljšo tehnologijo',
    'Povprečni produkt, ki ga podjetje doseže z obstoječo tehnologijo',
    'Minimalne stroške, s katerimi podjetje proizvede dani obseg produkta',
    'Vse kombinacije faktorjev, ki jih podjetje lahko kupi z danim proračunom'], 0,
    'Produkcijska funkcija = odnos med produktom in faktorji: največji možni produkt v enoti časa za vsako kombinacijo, ob najboljši razpoložljivi tehnologiji. Zadnja možnost opisuje izokosto.'),
  Q('Kaj pravi zakon o padajočem mejnem fizičnem donosu?', [
    'Ob večanju variabilnega faktorja pri fiksnem drugem MPV po neki točki začne padati',
    'Ob sorazmernem večanju vseh faktorjev se produkt poveča podproporcionalno',
    'Ob večanju variabilnega faktorja pri fiksnem drugem APV ves čas pada',
    'Ob večanju fiksnega faktorja pri danem variabilnem MPV ves čas narašča'], 0,
    'Gre za kratko obdobje: fiksni faktor postane prezasičen z variabilnim. Ne zamenjuj s padajočimi donosi obsega (povečanje vseh faktorjev, dolgo obdobje).'),
  Q('Kje doseže povprečni produkt variabilnega faktorja (APV) maksimum?', [
    'Kjer je MPV enak APV',
    'Kjer je MPV enak 0',
    'Kjer je MPV največji',
    'Kjer je celotni produkt največji'], 0,
    'Ko je MPV > APV, APV narašča; ko je MPV < APV, pada. Torej je APV max tam, kjer ga MPV seka. MPV = 0 je pri maksimumu celotnega produkta.'),
  Q('Kaj je značilno za drugo (ekonomsko) področje produkcije?', [
    'MPV in APV padata, MPV je še pozitiven',
    'APV narašča, MPV je večji od APV',
    'MPV je negativen, celotni produkt pada',
    'MPV narašča, APV pada proti nič'], 0,
    'II. področje: od APV max (ekstenzivna meja) do MPV = 0 (intenzivna meja). Vsa razmerja so tehnično optimalna. I.: APV narašča. III.: MPV < 0.'),
  Q('Zakaj podjetje ne proizvaja v prvem področju produkcije?', [
    'Fiksni faktor je premalo izkoriščen, zato se splača povečati variabilni faktor',
    'Fiksni faktor je prezasičen z variabilnim, zato je mejni produkt negativen',
    'Mejni produkt variabilnega faktorja je tam enak nič in produkt ne raste',
    'Povprečni produkt tam pada, zato vsak dodatni delavec zmanjša produkt'], 0,
    'V I. področju APV narašča - z več variabilnega faktorja se vsak vložek bolje izkoristi. Prezasičenost fiksnega faktorja (MPV < 0) je značilna za III. področje.'),
  Q('Kaj je intenzivna meja za variabilni faktor?', [
    'Meja med II. in III. področjem, kjer je MPV = 0',
    'Meja med I. in II. področjem, kjer je APV max',
    'Meja med I. in II. področjem, kjer je MPV max',
    'Meja med II. in III. področjem, kjer je APV = 0'], 0,
    'Intenzivna meja = maksimalni obseg variabilnega faktorja na ekonomskem področju (MPV = 0). Ekstenzivna meja = minimalni obseg (APV max = MPV).'),
  Q('Kaj pomeni simetričnost področij produkcije?', [
    'I. področje za variabilni faktor je III. področje za fiksni, II. je skupno',
    'I. področje za variabilni faktor je I. področje tudi za fiksni faktor',
    'Intenzivna meja za variabilni faktor je intenzivna meja tudi za fiksni',
    'Področja so simetrična le, kadar so donosi obsega naraščajoči'], 0,
    'Simetrija: I. ↔ III., II. je enako za oba faktorja; IM za variabilni = EM za fiksni in obratno. Popolna simetrija velja le pri linearno homogeni funkciji (konstantni donosi).'),
  Q('Kaj pove koeficient produkcijske funkcije e = 1,3?', [
    'Ob 1 % povečanju vseh faktorjev se produkt poveča za 1,3 % - naraščajoči donosi',
    'Ob 1 % povečanju dela pri fiksnem kapitalu se produkt poveča za 1,3 %',
    'Ob 1 % povečanju vseh faktorjev se produkt poveča za 0,3 % - padajoči donosi',
    'Ob povečanju vseh faktorjev za 1 enoto se produkt poveča za 1,3 enote'], 0,
    'e meri odziv produkta na sorazmerno povečanje VSEH faktorjev (dolgo obdobje). e > 1 → naraščajoči donosi. Odziv na en faktor pri fiksnem drugem meri eL ali eK.'),
  Q('Elastičnost produkta glede na delo je 0,6. Kaj to pomeni?', [
    'Če se delo poveča za 1 % (kapital ostane enak), se produkt poveča za 0,6 %',
    'Če se delo in kapital hkrati povečata za 1 %, se produkt poveča za 0,6 %',
    'Če se delo poveča za 1 enoto, se produkt poveča za 0,6 enote',
    'Če se delo poveča za 1 %, se produkt poveča za 60 %'], 0,
    'eL = MPL/APL: odstotni odziv produkta na 1 % več dela pri nespremenjenem kapitalu. Odziv na hkratno povečanje obeh faktorjev je elastičnost produkcijske funkcije e = eL + eK. Odziv v enotah je mejni proizvod.'),
  Q('Kako izračunamo elastičnost produkta glede na delo (eL)?', [
    'eL = MPL / APL',
    'eL = APL / MPL',
    'eL = MPL · L / K',
    'eL = e − 1'], 0,
    'eL = (ΔQ/Q)/(ΔL/L) = (ΔQ/ΔL)/(Q/L) = MPL/APL. Pri Cobb-Douglasu je eL kar eksponent pri L.'),
  Q('Koliko je elastičnost produkta glede na faktor v njegovi ekstenzivni meji?', [
    '1, ker sta MP in AP faktorja enaka',
    '0, ker je mejni produkt faktorja nič',
    'Več kot 1, ker AP faktorja še narašča',
    'Negativna, ker je mejni produkt negativen'], 0,
    'eX = MPX/APX. V ekstenzivni meji je AP max = MP → eX = 1. V intenzivni meji je MP = 0 → eX = 0.'),
  Q('Kaj pravi Eulerjev teorem za produkcijsko funkcijo?', [
    'MPL · L + MPK · K = e · Q',
    'MPL · K + MPK · L = e · Q',
    'APL · L + APK · K = e · Q',
    'MPL / L + MPK / K = e / Q'], 0,
    'Vsota mejnih produktov, pomnoženih z zaposlenimi količinami, je e × Q. Pri konstantnih donosih (e = 1) je vsota enaka Q.'),
  Q('Kaj velja za linearno homogeno produkcijsko funkcijo?', [
    'Donosi so konstantni, MP in AP sta odvisna le od razmerja med faktorjema',
    'Donosi so naraščajoči, II. področje produkcije se razširi',
    'Donosi so padajoči, II. področje produkcije se zoži',
    'Donosi so konstantni, MP in AP sta odvisna od absolutnega obsega faktorjev'], 0,
    'Linearno homogena = stopnja homogenosti 1 = e = 1. MP in AP sta odvisna le od razmerja K/L, simetrija področij je popolna.'),
];

const stroski = [
  Q('Zakaj govorimo o relativno fiksnih stroških?', [
    'Ker so fiksni le znotraj danih zmogljivosti, ob širitvi pa skokovito narastejo',
    'Ker se spreminjajo sorazmerno z obsegom poslovanja znotraj zmogljivosti',
    'Ker jih podjetje lahko prenese na kupce prek višje prodajne cene',
    'Ker se na enoto proizvoda ne spreminjajo, ne glede na obseg'], 0,
    'FC so absolutno fiksni le znotraj obstoječih zmogljivosti. Ko podjetje zmogljivosti razširi, FC skokovito narastejo in so nato spet fiksni na višji ravni.'),
  Q('Kaj je značilno za degresivne variabilne stroške?', [
    'Naraščajo počasneje kot obseg, EVC < 1, AVC padajo',
    'Naraščajo hitreje kot obseg, EVC > 1, AVC naraščajo',
    'Naraščajo enako hitro kot obseg, EVC = 1, AVC so konstantni',
    'Z rastjo obsega padajo, EVC < 0, AVC padajo'], 0,
    'Variabilni stroški vedno naraščajo. Degresivni počasneje kot Q (EVC < 1) → AVC padajo. Progresivni: EVC > 1, AVC rastejo. Proporcionalni: EVC = 1, AVC konstantni.'),
  Q('Kako se gibljejo povprečni fiksni stroški (AFC) z naraščanjem obsega?', [
    'Ves čas padajo in se približujejo nič',
    'Najprej padajo, nato naraščajo (oblika U)',
    'Ostanejo nespremenjeni, ker so FC fiksni',
    'Naraščajo, ker FC razdelimo na več enot'], 0,
    'AFC = FC/Q: isti znesek se razdeli na vse več enot, zato AFC ves čas padajo (v limiti proti 0).'),
  Q('Zakaj imajo povprečni stroški (AC) pri kratkoročni produkcijski funkciji obliko črke U?', [
    'Pri majhnem obsegu prevladujejo padajoči AFC, pri večjem naraščajoči AVC',
    'Pri majhnem obsegu prevladujejo naraščajoči AFC, pri večjem padajoči AVC',
    'Ker mejni stroški najprej naraščajo in nato po neki točki padajo',
    'Ker fiksni stroški z obsegom najprej padajo in nato spet naraščajo'], 0,
    'AC = AFC + AVC. Na začetku jih navzdol vlečejo padajoči AFC, kasneje prevladajo naraščajoči AVC. AC in AVC se asimptotično približujeta.'),
  Q('Kateri stroški so po izvoru mejni stroški?', [
    'V celoti variabilni, ker je ΔTC = ΔVC',
    'Delno fiksni in delno variabilni stroški',
    'V celoti fiksni, ker vključujejo amortizacijo',
    'Splošni stroški, ker jih ne moremo pripisati nosilcu'], 0,
    'ΔTC = (FC2 + VC2) − (FC1 + VC1) = VC2 − VC1, ker je FC2 = FC1. Zato je MC = ΔVC/ΔQ.'),
  Q('Kakšna je povezava med MC in AC?', [
    'MC < AC → AC padajo; MC = AC → AC min; MC > AC → AC naraščajo',
    'MC < AC → AC naraščajo; MC = AC → AC max; MC > AC → AC padajo',
    'MC < AC → AC padajo; MC = AC → AC max; MC > AC → AC naraščajo',
    'MC in AC sta neodvisna, AC so odvisni le od fiksnih stroškov'], 0,
    'Splošno pravilo mejnih in povprečnih količin: mejna pod povprečno jo vleče navzdol, nad njo navzgor. MC seka AC in AVC v njunih minimumih.'),
  Q('Kako so mejni stroški povezani s ceno in mejnim produktom variabilnega faktorja?', [
    'MC = Pv / MPv',
    'MC = Pv · MPv',
    'MC = MPv / Pv',
    'MC = Pv / APv'], 0,
    'ΔTC = ΔV · Pv, ΔQ = ΔV · MPv → MC = Pv/MPv. Ko MPv pada, MC naraščajo (krivulja MC je zrcalna slika MPV).'),
  Q('Elastičnost celotnih stroškov je ETC = 1,4. Kaj to pomeni?', [
    'Ob 1 % večjem obsegu TC narastejo za 1,4 %, AC za 0,4 % - padajoči donosi',
    'Ob 1 % večjem obsegu TC narastejo za 1,4 %, AC padejo za 0,4 % - naraščajoči donosi',
    'Ob 1 % večjem obsegu TC narastejo za 0,4 %, AC za 1,4 % - padajoči donosi',
    'Ob 1 % večjem obsegu TC narastejo za 1,4 %, AC ostanejo enaki - konstantni donosi'], 0,
    'EAC = ETC − 1 = 0,4 > 0 → AC naraščajo. ETC = 1/e > 1 → e < 1 → padajoči donosi obsega.'),
  Q('Kakšna je zveza med elastičnostjo celotnih stroškov in donosi obsega?', [
    'ETC = 1/e; ETC < 1 pomeni naraščajoče donose',
    'ETC = e; ETC < 1 pomeni padajoče donose',
    'ETC = 1 − e; ETC < 0 pomeni naraščajoče donose',
    'ETC = e − 1; ETC > 0 pomeni naraščajoče donose'], 0,
    'Če produkt raste hitreje od faktorjev (e > 1), stroški rastejo počasneje od obsega (ETC < 1). Torej ETC = 1/e in ETC = MC/AC.'),
  Q('Produkcijska funkcija ima elastičnost 0,8. Katera trditev drži?', [
    'Padajoči donosi; stroški rastejo hitreje kot obseg, EAC = 0,25',
    'Padajoči donosi; stroški rastejo počasneje kot obseg, EAC = −0,25',
    'Naraščajoči donosi; stroški rastejo hitreje kot obseg, EAC = 0,25',
    'Konstantni donosi; EAC = 0'], 0,
    'e = 0,8 < 1 → padajoči donosi. ETC = 1/e = 1,25 > 1 → TC rastejo hitreje kot obseg. EAC = ETC − 1 = 0,25 > 0 → povprečni stroški rastejo.'),
  Q('Produkcijska funkcija ima elastičnost 1,25. Katera trditev drži?', [
    'Naraščajoči donosi; stroški rastejo počasneje kot obseg, EAC = −0,2',
    'Naraščajoči donosi; stroški rastejo hitreje kot obseg, EAC = 0,25',
    'Padajoči donosi; stroški rastejo počasneje kot obseg, EAC = −0,2',
    'Naraščajoči donosi; EAC = 0,25, povprečni stroški rastejo'], 0,
    'e = 1,25 > 1 → naraščajoči donosi. ETC = 1/1,25 = 0,8 < 1 → TC rastejo počasneje kot obseg. EAC = 0,8 − 1 = −0,2 → AC padajo.'),
  Q('Koliko je elastičnost fiksnih stroškov (EFC)?', [
    'Vedno 0',
    'Vedno 1',
    'Vedno negativna',
    'Enaka ETC − 1'], 0,
    'FC se z obsegom ne spreminjajo, zato je odstotna sprememba FC vedno 0. ETC − 1 je elastičnost povprečnih stroškov (EAC).'),
];

const pragOpt = [
  Q('Kaj je prag rentabilnosti (točka preloma)?', [
    'Obseg, pri katerem prihodki ravno pokrijejo vse stroške',
    'Obseg, pri katerem prihodki pokrijejo variabilne stroške',
    'Obseg, pri katerem je dobiček podjetja največji',
    'Obseg, pri katerem so povprečni stroški najnižji'], 0,
    'Prag rentabilnosti: TR = TC oz. P = AC (lastna cena) - ni ne dobička ne izgube. Največji dobiček je pri P = MC.'),
  Q('Koliko pragov rentabilnosti ima podjetje pri proporcionalnih variabilnih stroških?', [
    'Enega, ker AC ves čas padajo',
    'Dva, ker ima AC obliko črke U',
    'Nobenega, ker je MC konstanten',
    'Dva, ker TR in TC nista vzporedni'], 0,
    'Pri proporcionalnih VC so AVC konstantni, AC = AFC + AVC pa ves čas padajo → TR in TC se sekata le enkrat. Dva praga sta pri kratkoročni produkcijski funkciji (AC v obliki U) in P > ACmin.'),
  Q('Kateri je obrazec za prag rentabilnosti pri proporcionalnih variabilnih stroških?', [
    'Q = FC / (P − AVC)',
    'Q = FC / (P − AC)',
    'Q = (FC + VC) / P',
    'Q = FC / (AVC − P)'], 0,
    'TR = TC → P·Q = FC + AVC·Q → Q(P − AVC) = FC → Q = FC/(P − AVC). P − AVC je pokritje na enoto.'),
  Q('Kako podjetje zniža prag rentabilnosti?', [
    'Z nižjimi fiksnimi stroški, nižjimi AVC ali višjo ceno',
    'Z višjimi fiksnimi stroški, nižjimi AVC ali nižjo ceno',
    'Z višjimi AVC, nižjimi fiksnimi stroški ali nižjo ceno',
    'Z večjimi zmogljivostmi pri nespremenjenih stroških in ceni'], 0,
    'Q_BE = FC/(P − AVC): manjši števec ali večje pokritje (P − AVC) zniža prag. Večje zmogljivosti ne spremenijo praga, le stopnjo izkoriščenosti, pri kateri nastopi.'),
  Q('Čemu je pri popolni konkurenci enak mejni prihodek (MR)?', [
    'Prodajni ceni',
    'Mejnim stroškom',
    'Povprečnim stroškom',
    'Celotnemu prihodku'], 0,
    'TR = P·Q, P je dan → MR = dTR/dQ = P. Tudi povprečni prihodek AR = TR/Q = P.'),
  Q('Kako izračunamo mejni dobiček (Mπ)?', [
    'Mπ = P − MC',
    'Mπ = P − AC',
    'Mπ = MC − AC',
    'Mπ = AR − AVC'], 0,
    'Mπ = dTπ/dQ = MR − MC = P − MC. P − AC je povprečni dobiček (Aπ).'),
  Q('Kje je optimalni obseg poslovanja?', [
    'Kjer je prodajna cena enaka mejnim stroškom',
    'Kjer so povprečni stroški najnižji',
    'Kjer je prodajna cena enaka lastni ceni',
    'Kjer je povprečni dobiček največji'], 0,
    'Dobiček je največji, ko je Mπ = 0, torej P = MC. Za ACmin se še splača širiti obseg, dokler je P > MC.'),
  Q('Kaj velja pri ceni med AVCmin in ACmin pri optimalnem obsegu?', [
    'Podjetje ima izgubo, manjšo od FC, zato kratkoročno proizvaja',
    'Podjetje ima dobiček, ker cena presega povprečne variabilne stroške',
    'Podjetje ima izgubo, večjo od FC, zato proizvodnjo ustavi',
    'Podjetje nima ne dobička ne izgube, optimum je prag rentabilnosti'], 0,
    'P > AVC → prihodki pokrijejo VC in del FC → izguba < FC. Če bi ustavilo, bi bila izguba = FC. Prag rentabilnosti je optimum pri P = ACmin.'),
  Q('Pod katerim pogojem lahko podjetje kratkoročno posluje kljub izgubi?', [
    'Če s prihodki pokrije vsaj variabilne stroške (TR > VC)',
    'Če s prihodki pokrije vsaj fiksne stroške (TR > FC)',
    'Če je prodajna cena višja od mejnih stroškov',
    'Če je prodajna cena višja od povprečnih stroškov'], 0,
    'Pogosta napaka je "pokrije fiksne stroške". Primer: FC = 200, VC = 700, TR = 600 → TR > FC, a izguba 300 > FC; bolje je ustaviti.'),
  Q('Kaj predstavlja optimalni obseg, ko je P = AVCmin?', [
    'Točko indiferentnosti - izguba je enaka FC',
    'Prag rentabilnosti - ni ne dobička ne izgube',
    'Največji dobiček - mejni dobiček je enak nič',
    'Točko, pri kateri je izguba manjša od FC'], 0,
    'Pri P = AVCmin so prihodki ravno enaki VC → izguba = FC, enako kot brez proizvodnje. Pod AVCmin podjetje ne proizvaja; ponudba gre po MC od AVCmin navzgor.'),
  Q('Kaj mora storiti podjetje, ko je prodajna cena višja od mejnih stroškov?', [
    'Povečati obseg - proizvaja premalo, dodatna enota poveča dobiček',
    'Zmanjšati obseg - proizvaja preveč, dodatna enota zmanjša dobiček',
    'Ohraniti obseg - P > MC pomeni, da je že v optimumu',
    'Ustaviti proizvodnjo - cena ne pokrije variabilnih stroškov'], 0,
    'P > MC → Mπ > 0: dodatna enota prinese več, kot stane (poveča dobiček ali zmanjša izgubo). Obseg povečuje do P = MC.'),
  Q('Popolni konkurent proizvaja obseg, pri katerem je P = MC. Kaj velja glede na položaj cene?', [
    'Pri P < AVC naj proizvodnjo ustavi, ker bi bila izguba večja od fiksnih stroškov',
    'Pri AVC < P < AC posluje z dobičkom in naj nadaljuje',
    'Pri P > AC ima izgubo, a pokrije variabilne stroške in del fiksnih',
    'Pri P < AVC posluje z dobičkom, ker pokrije vse stroške'], 0,
    'P < AVC: izguba bi bila večja od FC, proizvodnjo ustavi. AVC < P < AC: izguba, manjša od FC - v kratkem roku nadaljuje. P > AC: dobiček.'),
];

const racK2 = [
  Q('Povprečna sredstva 2 mio EUR, 60 % financiranih z lastnimi viri. Prihodki 2,2 mio, odhodki 1,6 mio EUR. Koliko je ROE?', [
    '50 %', '30 %', '27 %', '37,5 %'], 0,
    'Kapital = 0,6 × 2 = 1,2 mio. Dobiček = 2,2 − 1,6 = 0,6 mio. ROE = 0,6/1,2 = 50 %. (ROA = 0,6/2 = 30 %, E = 2,2/1,6 = 1,375.)'),
  Q('Povprečna sredstva 2 mio EUR, prihodki 2,2 mio, odhodki 1,6 mio EUR. Koliko sta ROA in ekonomičnost?', [
    'ROA 30 %, E = 1,375', 'ROA 50 %, E = 1,375', 'ROA 30 %, E = 0,727', 'ROA 27 %, E = 1,100'], 0,
    'Dobiček = 0,6 mio. ROA = 0,6/2 = 30 %. E = prihodki/odhodki = 2,2/1,6 = 1,375.'),
  Q('Povprečna sredstva so 500.000 EUR, zadolženost 30 %, prihodki 420.000 EUR, ROE 15 %. Koliko sta ROA in ekonomičnost?', [
    'ROA 10,5 %, E = 1,14', 'ROA 15 %, E = 1,14', 'ROA 4,5 %, E = 1,06', 'ROA 12,5 %, E = 1,15'], 0,
    'Kapital = 0,7 × 500.000 = 350.000. Dobiček = 0,15 × 350.000 = 52.500. ROA = 52.500/500.000 = 10,5 %. Odhodki = 420.000 − 52.500 = 367.500 → E = 1,14. (Če kapital zamenjamo z dolgom 150.000, dobimo ROA 4,5 %.)'),
  Q('Povprečna sredstva so 400.000 EUR, zadolženost 25 %, prihodki 270.000 EUR, ekonomičnost 1,125. Koliko sta ROA in ROE?', [
    'ROA 7,5 %, ROE 10 %', 'ROA 7,5 %, ROE 30 %', 'ROA 10 %, ROE 7,5 %', 'ROA 6,75 %, ROE 9 %'], 0,
    'Odhodki = 270.000/1,125 = 240.000 → dobiček 30.000. ROA = 30.000/400.000 = 7,5 %. Kapital = 0,75 × 400.000 = 300.000 → ROE = 10 %. (ROE 30 % dobimo, če dobiček delimo z dolgom.)'),
  Q('Ekonomičnost je 1,25, koeficient obračanja sredstev 2. Koliko je ROA?', [
    '40 %', '50 %', '20 %', '25 %'], 0,
    'ROA = (1 − 1/E) × KOS = (1 − 0,8) × 2 = 0,4 = 40 %.'),
  Q('Leto 1: 1.000 izdelkov po 10 EUR, porabljenih 500 enot prvine po 16 EUR. Leto 2: 1.100 izdelkov po 12 EUR, 520 enot prvine po 18 EUR. Za koliko se je spremenila realna ekonomičnost?', [
    '+5,8 %', '+12,8 %', '+10,0 %', '−5,8 %'], 0,
    'E1 = 10.000/8.000 = 1,25. ER2 (cene leta 1) = 11.000/8.320 = 1,322 → indeks 105,8. Nominalno: 13.200/9.360 = 1,410 → +12,8 % (ugoden vpliv inflacije: +20 % > +12,5 %).'),
  Q('Leto 1: 1.000 izdelkov po 10 EUR, porabljenih 500 enot prvine po 16 EUR. Leto 2: 1.100 izdelkov po 12 EUR, 520 enot prvine po 18 EUR. Za koliko se je spremenila nominalna ekonomičnost?', [
    '+12,8 %', '+5,8 %', '+20,0 %', '+7,0 %'], 0,
    'EN1 = 10.000/8.000 = 1,25. EN2 = (1.100 × 12)/(520 × 18) = 13.200/9.360 = 1,410. Indeks = 112,8 → +12,8 %.'),
  Q('Obseg proizvodnje se poveča s 700 na 900 enot, stroški pa s 15 na 18 mio EUR. Koliko so mejni stroški?', [
    '15.000 EUR', '3 mio EUR', '20.000 EUR', '21.429 EUR'], 0,
    'Dodatni stroški ΔTC = 3 mio, ΔQ = 200 → MC = 3.000.000/200 = 15.000 EUR na enoto.'),
  Q('Produkt se poveča z 2.000 na 2.500 enot, stroški pa z 10 na 13 mio EUR. Koliko sta MC in ETC (točkovno)?', [
    'MC = 6.000 EUR, ETC = 1,2', 'MC = 6.000 EUR, ETC = 0,83', 'MC = 5.200 EUR, ETC = 1,2', 'MC = 6.000 EUR, ETC = 0,2'], 0,
    'MC = 3 mio/500 = 6.000 EUR. ETC = (3/10)/(500/2.000) = 0,3/0,25 = 1,2 → TC rastejo hitreje kot Q (padajoči donosi), EAC = 0,2.'),
  Q('Pri 200 enotah znašajo plače 6 mio EUR, elastičnost plač je 1,1. Koliko bi znašale plače pri 240 enotah?', [
    '7,32 mio EUR', '7,20 mio EUR', '6,60 mio EUR', '7,92 mio EUR'], 0,
    'Obseg +20 % → plače +20 % × 1,1 = +22 %. 6 × 1,22 = 7,32 mio EUR.'),
  Q('Cena variabilnega faktorja je 20 EUR/enoto. Ko zaposlitev naraste z 12 na 15 enot, produkt naraste s 40 na 52 enot. Kolikšni so mejni stroški (MC) na enoto produkta?', [
    '5 EUR', '4 EUR', '20 EUR', '60 EUR'], 0,
    'ΔTC = 3 × 20 = 60 EUR, ΔQ = 12 → MC = 5 EUR. Enako: MPv = 12/3 = 4 → MC = Pv/MPv = 20/4 = 5.'),
  Q('Podjetje zaposluje 50 enot dela in 40 enot kapitala ter proizvede 5.000 enot. MPL = 70, MPK = 50. Koliko je elastičnost produkcijske funkcije (e) in kakšni so donosi?', [
    'e = 1,1 - naraščajoči donosi', 'e = 0,91 - padajoči donosi', 'e = 1,1 - padajoči donosi', 'e = 1,0 - konstantni donosi'], 0,
    'Euler: MPL·L + MPK·K = e·Q → 70 × 50 + 50 × 40 = 5.500 = e × 5.000 → e = 1,1 > 1 → naraščajoči donosi. ETC = 1/1,1 = 0,91, EAC = −0,09.'),
  Q('Isto podjetje (40 enot kapitala, 5.000 enot produkta, MPK = 50). Za koliko % se poveča produkt, če pri nespremenjenem delu kapital povečamo za 20 %?', [
    '8 %', '20 %', '40 %', '10 %'], 0,
    'APK = 5.000/40 = 125. eK = MPK/APK = 50/125 = 0,4. Produkt se poveča za 20 % × 0,4 = 8 %.'),
  Q('Produkcijska funkcija Q = 0,548·K^0,8·L^0,45. Kakšni so donosi obsega in kolikšna je elastičnost povprečnih stroškov (EAC)?', [
    'Naraščajoči (e = 1,25), EAC = −0,2', 'Padajoči (e = 0,8), EAC = 0,25', 'Naraščajoči (e = 1,25), EAC = 0,25', 'Konstantni (e = 1), EAC = 0'], 0,
    'e = 0,8 + 0,45 = 1,25 > 1. ETC = 1/1,25 = 0,8 → EAC = −0,2: ob 1 % večjem obsegu AC padejo za 0,2 %.'),
  Q('Produkcijska funkcija Q = 0,548·K^0,8·L^0,45. Kolikšen je mejni proizvod dela (MPL), če je povprečni proizvod dela APL = 200 enot?', [
    '90 enot', '160 enot', '444 enot', '250 enot'], 0,
    'eL = 0,45 = MPL/APL → MPL = 0,45 × 200 = 90 enot.'),
  Q('Q = 0,548·K^0,8·L^0,45. Za koliko se poveča Q, če pri fiksnem K povečamo L za 20 %?', [
    'Za 9 %', 'Za 16 %', 'Za 25 %', 'Za 20 %'], 0,
    'eL = 0,45 → 20 % × 0,45 = 9 %.'),
  Q('Zmogljivost 120.000 enot, FC = 160 mio EUR, P = 7.000 EUR, AVC = 5.000 EUR. Pri kateri izkoriščenosti nastopi prag rentabilnosti?', [
    '66,7 %', '50,0 %', '80,0 %', '75,0 %'], 0,
    'Q_BE = 160 mio/(7.000 − 5.000) = 80.000 enot. 80.000/120.000 = 66,7 %.'),
  Q('Zmogljivost 120.000 enot, FC = 160 mio EUR, P = 7.000 EUR, AVC = 5.000 EUR. Kolikšen je poslovni izid pri 60.000 proizvodih?', [
    'Izguba 40 mio EUR', 'Dobiček 120 mio EUR', 'Izguba 160 mio EUR', 'Dobiček 20 mio EUR'], 0,
    '60.000 je 20.000 enot pod pragom (80.000) → izguba = 20.000 × 2.000 = 40 mio. Ali: TR = 420 mio, TC = 160 + 300 = 460 mio.'),
  Q('Zmogljivost 120.000 enot, FC = 160 mio EUR, P = 7.000 EUR, AVC = 5.000 EUR. Kolikšen je poslovni izid pri 75 % izkoriščenosti?', [
    'Dobiček 20 mio EUR', 'Izguba 20 mio EUR', 'Dobiček 180 mio EUR', 'Dobiček 50 mio EUR'], 0,
    '75 % × 120.000 = 90.000 enot, 10.000 nad pragom → dobiček = 10.000 × 2.000 = 20 mio EUR.'),
  Q('Mejni produkt variabilnega faktorja je 4 enote, njegova cena 12 EUR, prodajna cena produkta 5 EUR. Kaj naj stori podjetje?', [
    'Poveča obseg - P > MC (5 > 3), proizvaja premalo', 'Zmanjša obseg - P < MC (5 < 48), proizvaja preveč', 'Ohrani obseg - P = MC, je v optimumu', 'Zmanjša obseg - P > MC (5 > 3), proizvaja preveč'], 0,
    'MC = Pv/MPv = 12/4 = 3 EUR < P = 5 → Mπ > 0. Povečuje zaposlitev, dokler MPv ne pade dovolj, da je MC = P.'),
  Q('Delo stane 2 EUR/enoto, produkt se prodaja po 5 EUR. L = 1, 2, 3, 4, 5 → Q = 10, 18, 20, 20,4, 20,6. Pri katerem obsegu velja P = MC?', [
    'Q = 20,4 (L = 4)', 'Q = 20 (L = 3)', 'Q = 18 (L = 2)', 'Q = 20,6 (L = 5)'], 0,
    'MC = 2/ΔQ: 0,2; 0,25; 1; 5; 10. P = 5 = MC pri prehodu na L = 4 → Q = 20,4, dobiček 5 × 20,4 − 8 = 94 (enako kot pri Q = 20, Mπ = 0). Pri L = 5 bi dobiček padel na 93.'),
];

/* ---------- Izpit ---------- */
const izpitTeorija = [
  Q('Kaj je bistvena značilnost splošnih (posrednih) stroškov?', [
    'Ne moremo jih neposredno pripisati posameznemu stroškovnemu nosilcu; lahko so fiksni ali variabilni',
    'Vedno so fiksni, ker niso odvisni od obsega proizvodnje',
    'Natančno vemo, kateri izdelek jih je povzročil, zato jih pripišemo neposredno',
    'Nastanejo le v upravi in prodaji, nikoli v proizvodnji'], 0,
    'Delitev na neposredne in splošne gleda na to, ali strošek lahko pripišemo nosilcu. Delitev na fiksne in variabilne je druga delitev - splošni stroški so lahko eno ali drugo. Splošni stroški nastajajo tudi v proizvodnji (SSP).'),
  Q('Podjetje pospeši obračanje zalog in terjatev pri nespremenjenem obsegu poslovanja. Kaj se zgodi?', [
    'Koeficient obračanja se poveča, povprečno stanje obratnih sredstev se zmanjša, potrebnih je manj virov',
    'Koeficient obračanja se zmanjša, povprečno stanje pa se poveča',
    'Koeficient obračanja se poveča, povprečno stanje se poveča, potrebnih je več virov',
    'Povprečno stanje se ne spremeni, ker je obseg poslovanja enak'], 0,
    'KO = obseg / povprečno stanje obratnih sredstev. Pri danem obsegu večji KO pomeni manjše povprečno stanje → manj virov za financiranje.'),
  Q('Podjetje v letu proda natanko vse, kar je proizvedlo (zalog ne ustvarja). Kateri kategoriji sta enaki?', [
    'Stroški in odhodki', 'Prihodki in prejemki', 'Stroški in izdatki', 'Odhodki in izdatki'], 0,
    'Odhodki so stroški prodanih učinkov. Če je prodano vse proizvedeno, so stroški enaki odhodkom.'),
  Q('Vsi kupci plačajo takoj ob nakupu, terjatev ni. Kateri kategoriji sta enaki?', [
    'Prihodki in prejemki', 'Stroški in odhodki', 'Prejemki in izdatki', 'Odhodki in prihodki'], 0,
    'Prihodek nastane ob izstavitvi računa, prejemek ob plačilu. Če kupci plačajo takoj, sta enaka.'),
  Q('Po katerem merilu delimo stroške na naravne vrste?', [
    'Po prvini, ki jih povzroča: storitve, delo, material, delovna sredstva',
    'Po odzivu na spremembo obsega: fiksni in variabilni',
    'Po možnosti pripisa nosilcu: neposredni in posredni',
    'Po mestu nastanka: proizvodnja, uprava, prodaja'], 0,
    'Naravne vrste = po prvini. Fiksni/variabilni = po odzivu na obseg. Neposredni/posredni (splošni) = po možnosti pripisa nosilcu. Po mestu nastanka delimo na stroškovna mesta.'),
  Q('Stroj se obrablja predvsem zaradi intenzivne uporabe. Kako ga je smiselno amortizirati?', [
    'S funkcionalno (proizvodno) ali kombinirano metodo',
    'S časovno metodo, ker je obraba odvisna le od pretečenega časa',
    'Ne amortiziramo ga, ker ni predmet dela',
    'Kot splošni strošek brez znanega nosilca'], 0,
    'Amortizacija je strošek delovnih sredstev. Obraba zaradi uporabe (endogeni dejavniki) → funkcionalne ali kombinirane metode; zastaranje in čas (eksogeni dejavniki) → časovne metode.'),
  Q('Podjetje uporablja časovno (linearno) metodo amortizacije in poveča obseg proizvodnje. Kaj se zgodi?', [
    'Letna amortizacija ostane enaka, amortizacija na enoto pade - to spodbuja boljšo izkoriščenost',
    'Letna amortizacija se poveča sorazmerno z obsegom',
    'Amortizacija na enoto ostane enaka, ker je metoda časovna',
    'Amortizacija na enoto naraste, ker se stroj hitreje obrablja'], 0,
    'Pri časovnih metodah je letni znesek fiksen, zato amortizacija na enoto z obsegom pada (nižja lastna cena). Pri funkcionalnih metodah je amortizacija na enoto stalna, letni znesek pa sledi obsegu.'),
  Q('Kaj je glavna slabost oblikovanja cene po metodi "stroški plus"?', [
    'Ne upošteva povpraševanja in cen na trgu',
    'Cena ne pokrije stroškov proizvodnje',
    'Uporablja se le v trgovini, kjer gre za maržo',
    'Pribitek pokrije le fiksne stroške, dobička ni'], 0,
    'Stroški plus: lastna cena na enoto + pribitek za dobiček (proizvodna podjetja). Ker izhaja iz stroškov, zanemari, koliko so kupci pripravljeni plačati. Marža je pojem trgovine.'),
  Q('Kako izračunamo mejne stroške?', [
    'Sprememba celotnih stroškov / sprememba količine produkta',
    'Celotni stroški / količina produkta',
    'Sprememba fiksnih stroškov / sprememba količine produkta',
    'Sprememba celotnih stroškov / sprememba zaposlitve faktorja'], 0,
    'MC = ΔTC/ΔQ: prirast celotnih stroškov za enoto več PRODUKTA. TC/Q so povprečni stroški; fiksni stroški na MC ne vplivajo.'),
  Q('Trgovina prodaja izdelek po maloprodajni ceni, ki jo je določil proizvajalec, trgovina pa dobi 15 % te cene. Kako se imenuje ta odstotek?', [
    'Rabat - odstotek od prodajne cene, ki jo določi proizvajalec',
    'Marža - odstotek od nabavne cene, ki ga doda trgovina',
    'Rabat - odstotek od nabavne cene',
    'Čisti dobiček trgovine'], 0,
    'Pri marži trgovec sam doda odstotek nabavni ceni. Pri rabatu ceno določi proizvajalec, trgovec dobi odstotek od nje. Razlika v ceni pokriva tudi stroške trgovine, ne le dobiček.'),
  Q('Kako sta povezana angažiranje in trošenje prvin?', [
    'Prvine je treba najprej pridobiti (angažirati), šele nato jih trošimo; naturalni izraz trošenja so potroški',
    'Trošenje je predpogoj angažiranja',
    'Vrednostni izraz angažiranja so stroški',
    'Trošenje pomeni le porabo denarja za nakup prvin'], 0,
    'Angažiranje = pridobitev prvin (naturalno: DS, zaloge, delavci; vrednostno: premoženje). Trošenje = poraba (naturalno: potroški; vrednostno: stroški).'),
  Q('Podjetje v letu proizvede 1.000 izdelkov, proda pa 800. Kaj velja?', [
    'Stroški so večji od odhodkov, ker so odhodki le stroški prodanih izdelkov',
    'Odhodki so večji od stroškov, ker vključujejo zaloge',
    'Stroški in odhodki so enaki, ker gre za isto proizvodnjo',
    'Izdatki so vedno enaki stroškom tega leta'], 0,
    'Odhodki = stroški prodanih učinkov; neprodani izdelki ostanejo v zalogah. Izdatki so odlivi denarja (npr. dano posojilo je izdatek, ni pa strošek).'),
  Q('Podjetje 10. 3. izstavi račun, kupec ga plača 25. 4. Kdaj podjetje zabeleži prihodek in kdaj prejemek?', [
    'Prihodek 10. 3., prejemek 25. 4.', 'Prihodek 25. 4., prejemek 10. 3.', 'Oboje 25. 4. (plačana realizacija)', 'Oboje 10. 3. (zaračunana realizacija)'], 0,
    'Prihodke ugotavljamo po načelu zaračunane prodaje (račun), prejemki so dejanski prilivi denarja.'),
];

const izpitRac = [
  Q('Zmogljivost je 60.000 izdelkov, P = 12 EUR, AVC = 9 EUR, FC = 54.000 EUR. Pri kateri izkoriščenosti zmogljivosti nastopi prag rentabilnosti?', [
    '30 %', '18 %', '70 %', '50 %'], 0,
    'Q = FC/(P − AVC) = 54.000/3 = 18.000. 18.000/60.000 = 30 %.'),
  Q('Zmogljivost je 25.000 izdelkov, P = 15 EUR, AVC = 11 EUR, FC = 80.000 EUR. Pri kateri izkoriščenosti nastopi prag rentabilnosti?', [
    '80 %', '20 %', '64 %', '73 %'], 0,
    'Q = 80.000/(15 − 11) = 20.000. 20.000/25.000 = 80 %.'),
  Q('Zmogljivost je 40.000 enot, P = 60 EUR, AVC = 45 EUR, FC = 360.000 EUR. Pri kateri izkoriščenosti je prag rentabilnosti in kolikšen je izid pri 75 % izkoriščenosti?', [
    'Prag pri 60 %, dobiček 90.000 EUR', 'Prag pri 60 %, dobiček 450.000 EUR', 'Prag pri 75 %, izid 0 EUR', 'Prag pri 40 %, dobiček 90.000 EUR'], 0,
    'Q_BE = 360.000/15 = 24.000 = 60 %. Pri 75 % = 30.000 enot → π = 30.000 × 15 − 360.000 = 90.000 EUR (450.000 je kritje brez odštetih FC).'),
  Q('Zmogljivost je 80.000 enot, P = 35 EUR, AVC = 35 EUR, FC = 250.000 EUR. Kaj velja?', [
    'Praga ni, pri 90 % izkoriščenosti je izguba 250.000 EUR', 'Prag je pri 25 %, pri 90 % je dobiček 2,27 mio EUR', 'Prag je pri 100 %, pri 90 % je izguba 25.000 EUR', 'Praga ni, pri 90 % je izguba 2,52 mio EUR'], 0,
    'Kritje na enoto P − AVC = 0 → nobena količina ne pokrije FC, praga ni. Pri vsakem obsegu je izguba enaka FC = 250.000 EUR.'),
  Q('Produkt naraste s 600 na 750 enot, celotni stroški pa s 3 na 3,45 mio EUR. Koliko sta MC in EAC?', [
    'MC = 3.000 EUR, EAC = −0,4', 'MC = 3.000 EUR, EAC = 0,6', 'MC = 4.600 EUR, EAC = −0,4', 'MC = 300 EUR, EAC = 0,4'], 0,
    'MC = 450.000/150 = 3.000 EUR. ETC = (0,45/3)/(150/600) = 0,15/0,25 = 0,6 → EAC = −0,4: ob 1 % večjem obsegu AC padejo za 0,4 %. (4.600 EUR je AC pri 750 enotah.)'),
  Q('Produkt naraste s 600 na 750 enot, celotni stroški s 3 na 3,45 mio EUR, prodajna cena je 3.600 EUR. Ali podjetje proizvaja pravi obseg?', [
    'Premalo - P (3.600) > MC (3.000), obseg naj poveča', 'Preveč - P (3.600) > MC (3.000), obseg naj zmanjša', 'Preveč - P (3.600) < AC (4.600), obseg naj zmanjša', 'Ravno prav - P je večja od MC, zato je v optimumu'], 0,
    'MC = 3.000 < P = 3.600 → dodatne enote prinesejo več, kot stanejo (mejni dobiček > 0), zato naj obseg poveča, dokler ni P = MC. AC je za odločitev o obsegu nepomemben.'),
  Q('Pekarna, količine v letu 1 / letu 2 (stalne cene leta 1): kruh 50.000 / 60.000 kosov po 2 EUR, pecivo 30.000 / 25.000 po 3 EUR, torte 2.000 / 2.600 po 25 EUR. Ure dela: 8.000 in 8.125. Kako se je spremenila realna produktivnost dela?', [
    'Povečala se je za 6,7 %', 'Povečala se je za 8,3 %', 'Povečala se je za 5,2 %', 'Zmanjšala se je za 6,7 %'], 0,
    'Stalne cene: leto 1 = 240.000 EUR / 8.000 h = 30 EUR/h; leto 2 = (120.000 + 75.000 + 65.000) = 260.000 EUR / 8.125 h = 32 EUR/h. Indeks 106,7 → +6,7 %. (8,3 % dobimo, če prezremo več ur; 5,2 % s seštevanjem kosov.)'),
  Q('Kocke (5.000 kos; delo 20.000, material 10.000 EUR) in sestavljanke (10.000 kos; delo 10.000, material 20.000 EUR). Splošni stroški proizvodnje 48.000 EUR se delijo po vseh neposrednih stroških, splošni stroški nabave, prodaje in uprave 60.000 EUR po neposrednem delu. Kolikšna je lastna cena kocke?', [
    '18,80 EUR', '7,40 EUR', '14,80 EUR', '10,80 EUR'], 0,
    'SSP: 48.000/60.000 = 80 % → kocke 24.000. SSNPU: 60.000/30.000 = 200 % dela → kocke 40.000. Skupaj 30.000 + 24.000 + 40.000 = 94.000/5.000 = 18,80 EUR. (Sestavljanka: 74.000/10.000 = 7,40 EUR; SSNPU po materialu da 14,80 EUR.)'),
  Q('X (4.000 kos; delo 16.000, material 8.000 EUR) in Y (2.000 kos; delo 8.000, material 8.000 EUR). SSP 30.000 EUR po vseh neposrednih stroških, SSNPU 18.000 EUR po neposrednem materialu. Kolikšni sta lastni ceni?', [
    'X 12,75 EUR, Y 18,50 EUR', 'X 18,50 EUR, Y 12,75 EUR', 'X 13,50 EUR, Y 17,00 EUR', 'X 12,75 EUR, Y 12,75 EUR'], 0,
    'SSP: 30.000/40.000 = 75 % → X 18.000, Y 12.000. SSNPU: 18.000/16.000 = 112,5 % materiala → X 9.000, Y 9.000. X = 51.000/4.000 = 12,75; Y = 37.000/2.000 = 18,50. (SSNPU po delu da 13,50 in 17,00.)'),
  Q('Stroj: nakupna cena 150.000 EUR, prevoz 6.000 in montaža 4.000 EUR. V dobi koristnosti bo opravil 200.000 delovnih ur, v 1. letu 36.000 ur. Koliko je amortizacija v 1. letu po proizvodni (funkcionalni) metodi?', [
    '28.800 EUR', '27.000 EUR', '32.000 EUR', '36.000 EUR'], 0,
    'Nabavna vrednost vključuje prevoz in montažo: 160.000 EUR. 160.000/200.000 = 0,80 EUR/h → 36.000 × 0,80 = 28.800 EUR. (Brez prevoza in montaže bi bilo 27.000 EUR.)'),
  Q('Podjetje kupi 2.000 kg materiala po 50 EUR (polovico na kredit), izdela 25.000 kosov z lastno ceno 60 EUR in jih proda 18.000 po 75 EUR. Koliko so stroški, odhodki in dobiček?', [
    'Stroški 1,5 mio, odhodki 1,08 mio, dobiček 0,27 mio EUR', 'Stroški 1,08 mio, odhodki 1,5 mio, dobiček 0,27 mio EUR', 'Stroški 1,5 mio, odhodki 1,5 mio, dobiček −0,15 mio EUR', 'Stroški 0,1 mio, odhodki 1,08 mio, dobiček 0,27 mio EUR'], 0,
    'Stroški = 25.000 × 60 = 1,5 mio. Odhodki = prodano × LC = 18.000 × 60 = 1,08 mio. Prihodki = 18.000 × 75 = 1,35 mio → dobiček 0,27 mio EUR. Nakup materiala (0,1 mio) je nabava oz. izdatek, ne strošek obdobja.'),
  Q('Prodanih je 15.000 kosov po 80 EUR: kupec A 2.000 kos (plača takoj), B 5.000 (60 % takoj), C 3.000 (vse na kredit), D 5.000 (80 % takoj). Koliko so prejemki v obdobju?', [
    '720.000 EUR', '1.200.000 EUR', '960.000 EUR', '640.000 EUR'], 0,
    '160.000 + 0,6 × 400.000 + 0 + 0,8 × 400.000 = 160.000 + 240.000 + 320.000 = 720.000 EUR. Prihodki so 1.200.000 EUR.'),
];

const kartice = cards([
  ['Nominalna vs realna ekonomičnost', 'EN v tekočih cenah, ER v stalnih cenah. ER = učinkovitost (produktivnost, racionalnost trošenja), EN = ER + vpliv inflacije.'],
  ['Ugoden vpliv inflacije', 'Cene učinkov rastejo hitreje kot cene prvin (↑PC > ↑NC).'],
  ['ROE / ROA', 'ROE = dobiček / povprečni kapital. ROA = dobiček / povprečna sredstva. ROE ≥ ROA.'],
  ['DuPont', 'ROE = ROA × sredstva/kapital; ROA = (1 − 1/E) × obračanje sredstev.'],
  ['Zelo kratko / kratko / dolgo obdobje', 'Vse fiksno (le zaloge) / fiksni + variabilni (produkcija) / vse variabilno (planiranje).'],
  ['Zakon o padajočem mejnem fizičnem donosu', 'Pri fiksnem drugem faktorju MPV po neki točki pada - kratko obdobje. Ne zamenjuj s padajočimi donosi obsega!'],
  ['Tri področja produkcije', 'I: APV narašča. II (ekonomsko): MPV in APV padata, MPV > 0. III: MPV < 0.'],
  ['Ekstenzivna / intenzivna meja', 'EM: APV max = MPV (min. obseg V). IM: MPV = 0 (max. obseg V).'],
  ['Koeficient produkcijske funkcije e', '% sprememba Q ob 1 % več vseh faktorjev. e = eL + eK. >1 naraščajoči, =1 konstantni, <1 padajoči donosi.'],
  ['eL, eK', 'eL = MPL/APL, eK = MPK/APK. Pri Cobb-Douglasu = eksponenta.'],
  ['Eulerjev teorem', 'MPL·L + MPK·K = e·Q.'],
  ['MC', 'MC = ΔTC/ΔQ = ΔVC/ΔQ = Pv/MPv. Po izvoru v celoti variabilni.'],
  ['MC in AC', 'MC < AC → AC pada; MC = AC → AC min; MC > AC → AC narašča.'],
  ['ETC, EAC', 'ETC = MC/AC = 1/e. EAC = ETC − 1. EFC = 0.'],
  ['Prag rentabilnosti', 'TR = TC oz. P = AC. Q = FC/(P − AVC).'],
  ['Mπ, Aπ', 'Mπ = P − MC, Aπ = P − AC. MR = AR = P.'],
  ['Optimalni obseg', 'P = MC (Mπ = 0) - ne pri ACmin.'],
  ['Kratkoročno poslovanje z izgubo', 'Smiselno, če TR > VC (izguba < FC). P = AVCmin → točka indiferentnosti; P < AVCmin → ne proizvaja.'],
  ['Stroški / odhodki', 'Odhodki = stroški prodanih učinkov. Proizvede več kot proda → stroški > odhodki.'],
  ['Prihodki / prejemki', 'Prihodek ob izstavitvi računa, prejemek ob plačilu.'],
  ['Kalkulacija z dodatki', 'Dodatek = splošni stroški / osnova; LC = vsi stroški proizvoda / količina.'],
]);

module.exports = {
  id: 'uvod',
  parts: [
    {
      id: 'k2', name: '2. kolokvij', type: 'kolokvij',
      notesMd: NOTES_K2,
      decks: [
        { id: 'uvp-k2-ekon-rent', name: 'Nominalna in realna ekonomičnost, rentabilnost', questions: ekonRent },
        { id: 'uvp-k2-produkcija', name: 'Teorija produkcije', questions: produkcija },
        { id: 'uvp-k2-stroski', name: 'Stroški in elastičnost stroškov', questions: stroski },
        { id: 'uvp-k2-prag-opt', name: 'Prag rentabilnosti in optimalni obseg', questions: pragOpt },
        { id: 'uvp-k2-racunske', name: 'Računske naloge', calc: true, questions: racK2 },
      ],
      flashcards: [{ id: 'uvp-c-k2', name: 'Formule in pojmi (K2)', cards: kartice.slice(0, 18) }],
    },
    {
      id: 'izpit', name: 'Izpit', type: 'izpit',
      notesMd: NOTES_IZPIT + NOTES_K2.replace(/## Kako poteka 2\. kolokvij[\s\S]*?(?=\n## 6)/, ''),
      prependNotesOf: 'k1',
      decks: [
        { id: 'uvp-iz-teorija', name: 'Teorija v slogu izpita', questions: izpitTeorija },
        { id: 'uvp-iz-racunske', name: 'Računske v slogu izpita', calc: true, questions: izpitRac },
      ],
      flashcards: [{ id: 'uvp-c-iz', name: 'Formule in pojmi (izpit)', cards: kartice }],
    },
  ],
};
