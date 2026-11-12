/* Uvod v poslovanje (1. letnik, 1. semester) - 2. kolokvij in izpit.
   Viri: osnovne informacije 2025/26 (P1), predavanja 6 (nominalna/realna ekonomičnost, rentabilnost)
   in 7 (teorija produkcije, stroški, prag rentabilnosti, optimalni obseg) iz EF Zapiski,
   zbirka "UVP naloge z izpitov" (teoretična in računska izpitna vprašanja). Vsi rezultati so preračunani.
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
  Q('Proizvodnja +15 %, opravljene ure +5 %, izmet −1,8 %, izkoriščenost strojev +2 %; cene učinkov +12 %, cene prvin +8 %. Kaj velja? (izpit)', [
    'Nominalna ekonomičnost je zrasla bolj kot realna',
    'Realna ekonomičnost je zrasla bolj kot nominalna',
    'Produktivnost dela se je zmanjšala, vpliv inflacije je ugoden',
    'Vpliv inflacije je bil neugoden, ER se je zmanjšala'], 0,
    'Produktivnost ↑ (1,15/1,05), izmet ↓, izkoriščenost ↑ → ER ugodna. Cene učinkov rastejo bolj kot cene prvin (12 % > 8 %) → inflacija ugodna. Oba vpliva v isto smer → EN zraste bolj kot ER.'),
  Q('Proizvodnja +8 %, ure +7 %, izmet −3 %, izkoriščenost strojev +12 %; cene učinkov +5 %, cene prvin +8 %. Kaj velja? (izpit)', [
    'Inflacija je neugodna, realna ekonomičnost se je povečala',
    'Inflacija je ugodna, realna ekonomičnost se je povečala',
    'Inflacija je neugodna, realna ekonomičnost se je zmanjšala',
    'Nominalna ekonomičnost je zagotovo zrasla bolj kot realna'], 0,
    'Produktivnost ↑ (1,08/1,07), izmet ↓, izkoriščenost ↑ → ER ugodna. Cene prvin rastejo hitreje kot cene učinkov (8 % > 5 %) → inflacija neugodna. EN pade le, če je vpliv inflacije močnejši od ugodnega vpliva ER.'),
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
  Q('Katera trditev o DuPontovi razčlenitvi ROE je pravilna? (izpit)', [
    'ROE se poveča, če pri danem ROA naraste razmerje sredstva/kapital, kar pomeni večjo zadolženost',
    'ROE se poveča, če pri danem ROA naraste razmerje sredstva/kapital, kar pomeni manjšo zadolženost',
    'ROE se poveča, če pri danem ROA naraste razmerje sredstva/dolg, kar pomeni manjšo zadolženost',
    'ROE je odvisen od razmerja med prihodki in odhodki ter števila zaposlenih v podjetju'], 0,
    'ROE = ROA × sredstva/kapital. Več dolga pri istih sredstvih pomeni manj kapitala in večje razmerje sredstva/kapital → višji ROE.'),
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
  Q('Elastičnost produkta glede na kapital je 0,8. Kaj to pomeni? (izpit)', [
    'Q se poveča za 0,8 %, če se K poveča za 1 % ob nespremenjenem L',
    'Q se poveča za 0,8 %, če se oba faktorja povečata za 1 %',
    'Q se poveča za 0,8 enote, če se K poveča za 1 enoto ob nespremenjenem L',
    'Q se poveča za 80 %, če se zaposlitev kapitala poveča za 1 %'], 0,
    'eK = MPK/APK: odstotni odziv produkta na 1 % več kapitala pri fiksnem delu. Odziv na povečanje obeh faktorjev je e = eL + eK.'),
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
  Q('Elastičnost neke produkcijske funkcije je 0,5. Katera trditev je pravilna? (izpit)', [
    'Donosi so padajoči, TC naraščajo hitreje kot obseg, EAC > 0',
    'Donosi so padajoči, TC naraščajo počasneje kot obseg, EAC < 0',
    'Donosi so naraščajoči, TC naraščajo hitreje kot obseg, EAC < 0',
    'Donosi so padajoči, TC naraščajo počasneje kot obseg, EAC > 0'], 0,
    'e = 0,5 < 1 → padajoči donosi. ETC = 1/0,5 = 2 > 1 → TC rastejo hitreje kot Q. EAC = 2 − 1 = 1 > 0.'),
  Q('Elastičnost neke produkcijske funkcije je 1,5. Katera trditev je pravilna? (izpit)', [
    'Donosi so naraščajoči, TC naraščajo počasneje kot obseg, EAC < 0',
    'Donosi so naraščajoči, TC naraščajo hitreje kot obseg, EAC < 0',
    'Donosi so padajoči, TC naraščajo hitreje kot obseg, EAC > 0',
    'Donosi so naraščajoči, TC naraščajo počasneje kot obseg, EAC > 0'], 0,
    'e = 1,5 > 1 → naraščajoči donosi. ETC = 1/1,5 ≈ 0,67 < 1 → TC rastejo počasneje kot Q. EAC ≈ −0,33 < 0 → AC padajo.'),
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
  Q('Podjetje v popolni konkurenci proizvaja optimalni obseg. Katera trditev je pravilna? (izpit)', [
    'Če je P < AVC, ima izgubo, ker ne pokrije vseh VC, zato je smiselno ustaviti proizvodnjo',
    'Če je AVC < P < AC, ima dobiček, zato je smiselno nadaljevati proizvodnjo',
    'Če je P > AC, ima izgubo, a pokrije VC in del FC, zato je smiselno nadaljevati',
    'Če je P < AVC, ima dobiček, ker s prihodki pokrije vse stroške poslovanja'], 0,
    'P < AVC: izguba > FC, proizvodnjo ustavi. AVC < P < AC: izguba (ne dobiček), ki je manjša od FC. P > AC: dobiček.'),
];

const racK2 = [
  Q('Povprečna sredstva 2 mio EUR, 60 % financiranih z lastnimi viri. Prihodki 2,2 mio, odhodki 1,6 mio EUR. Koliko je ROE?', [
    '50 %', '30 %', '27 %', '37,5 %'], 0,
    'Kapital = 0,6 × 2 = 1,2 mio. Dobiček = 2,2 − 1,6 = 0,6 mio. ROE = 0,6/1,2 = 50 %. (ROA = 0,6/2 = 30 %, E = 2,2/1,6 = 1,375.)'),
  Q('Povprečna sredstva 2 mio EUR, prihodki 2,2 mio, odhodki 1,6 mio EUR. Koliko sta ROA in ekonomičnost?', [
    'ROA 30 %, E = 1,375', 'ROA 50 %, E = 1,375', 'ROA 30 %, E = 0,727', 'ROA 27 %, E = 1,100'], 0,
    'Dobiček = 0,6 mio. ROA = 0,6/2 = 30 %. E = prihodki/odhodki = 2,2/1,6 = 1,375.'),
  Q('Povprečna sredstva 200.000 EUR, zadolženost 40 %, prihodki 124.000 EUR, ROE 20 %. Koliko sta ROA in ekonomičnost? (izpit)', [
    'ROA 12 %, E = 1,24', 'ROA 20 %, E = 1,24', 'ROA 12 %, E = 1,20', 'ROA 8 %, E = 1,19'], 0,
    'Kapital = 0,6 × 200.000 = 120.000. Dobiček = 0,2 × 120.000 = 24.000. ROA = 24.000/200.000 = 12 %. Odhodki = 124.000 − 24.000 = 100.000 → E = 1,24.'),
  Q('Povprečna sredstva 200.000 EUR, zadolženost 40 %, prihodki 96.000 EUR, ekonomičnost 1,2. Koliko sta ROA in ROE? (izpit)', [
    'ROA 8 %, ROE 13,3 %', 'ROA 9,6 %, ROE 16 %', 'ROA 8 %, ROE 20 %', 'ROA 13,3 %, ROE 8 %'], 0,
    'Odhodki = 96.000/1,2 = 80.000 → dobiček 16.000. ROA = 16.000/200.000 = 8 %. Kapital = 120.000 → ROE = 13,3 %.'),
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
  Q('Podjetje zaposluje 25 L in 20 K ter proizvaja 2.000 Q. MPL = 40, MPK = 30. Koliko je e in kakšni so donosi? (izpit)', [
    'e = 0,8 - padajoči donosi', 'e = 1,25 - naraščajoči donosi', 'e = 0,8 - naraščajoči donosi', 'e = 1,0 - konstantni donosi'], 0,
    'Euler: 40 × 25 + 30 × 20 = 1.600 = e × 2.000 → e = 0,8 < 1 → padajoči donosi. ETC = 1/0,8 = 1,25, EAC = 0,25.'),
  Q('Podjetje zaposluje 25 L in 20 K ter proizvaja 2.000 Q. MPK = 30. Za koliko % se poveča Q, če pri fiksnem L povečamo K za 40 %?', [
    '12 %', '20 %', '32 %', '30 %'], 0,
    'APK = 2.000/20 = 100. eK = MPK/APK = 30/100 = 0,3. Q se poveča za 40 % × 0,3 = 12 %.'),
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
  Q('Splošni stroški so: (izpit)', [
    'Lahko odvisni od obsega ali ne, stalni ali spremenljivi; bistveno je, da ne vemo, kateri stroškovni nosilec jih je povzročil',
    'Lahko odvisni od obsega ali ne, stalni ali spremenljivi; bistveno je, da vemo, kateri stroškovni nosilec jih je povzročil',
    'Niso odvisni od obsega poslovanja, zato so stalni; bistveno je, da ne vemo, kateri stroškovni nosilec jih je povzročil',
    'Niso odvisni od obsega, ker se pojavljajo v vsakem podjetju ne glede na dejavnost, zato so za podjetje stalni stroški'], 0,
    'Delitev na neposredne/splošne gleda na to, ali strošek lahko pripišemo nosilcu. Delitev na fiksne/variabilne je druga delitev - splošni so lahko eno ali drugo.'),
  Q('Hitrost obračanja obratnih sredstev vpliva na njihovo povprečno stanje. Katera trditev je pravilna? (izpit)', [
    'Hitreje kot se obračajo, večji je koeficient obračanja, manjše je povprečno stanje in manj virov potrebujemo',
    'Hitreje kot se obračajo, večji je koeficient obračanja, večje je povprečno stanje in manj virov potrebujemo',
    'Počasneje kot se obračajo, manjši je koeficient obračanja, večje je povprečno stanje in manj virov potrebujemo',
    'Hitreje kot se obračajo, manjši je koeficient obračanja, večje je povprečno stanje in manj virov potrebujemo'], 0,
    'KO = obseg/povprečno stanje ObS. Pri danem obsegu večji KO pomeni manjše povprečno stanje → manj virov za financiranje.'),
  Q('Če bi v praksi veljalo, da podjetje vse, kar proizvede, tudi proda, kateri kategoriji bi bili enaki? (izpit)', [
    'Stroški in odhodki', 'Prihodki in prejemki', 'Stroški in izdatki', 'Odhodki in izdatki'], 0,
    'Odhodki = stroški prodanih učinkov. Če je prodano vse proizvedeno, so stroški = odhodki.'),
  Q('Če bi v praksi veljalo, da podjetje vse, kar proda, dobi tudi plačano, kateri kategoriji bi bili enaki? (izpit)', [
    'Prihodki in prejemki', 'Stroški in odhodki', 'Prejemki in izdatki', 'Stroški in prihodki'], 0,
    'Prihodek nastane ob izstavitvi računa, prejemek ob plačilu. Če je vse takoj plačano, sta enaka.'),
  Q('Katera trditev o delitvi stroškov je pravilna? (izpit)', [
    'Po naravnih vrstah nas zanima, katera prvina jih povzroča: storitve, delo, predmeti dela, delovna sredstva',
    'Po naravnih vrstah nas zanima, kako se spreminjajo z obsegom, zato jih delimo na variabilne in fiksne',
    'Po naravnih vrstah nas zanima, katera prvina jih povzroča, zato jih delimo na neposredne in posredne',
    'Pri delitvi na neposredne in posredne nas zanima, kako se stroški spreminjajo z obsegom poslovanja'], 0,
    'Naravne vrste = po prvini. Fiksni/variabilni = po odzivu na obseg. Neposredni/posredni (splošni) = po možnosti pripisa nosilcu.'),
  Q('Amortizacija je: (izpit)', [
    'Postopek ugotavljanja stroška delovnih sredstev; tista, ki se obrabljajo zaradi intenzivne uporabe, amortiziramo funkcionalno ali kombinirano',
    'Postopek ugotavljanja stroška predmetov dela; tiste, ki se obrabljajo zaradi intenzivne uporabe, amortiziramo funkcionalno ali kombinirano',
    'Postopek ugotavljanja stroška delovnih sredstev; tista, ki se obrabljajo zaradi intenzivne uporabe, amortiziramo po časovnih metodah',
    'Postopek razporejanja splošnih stroškov; tiste, za katere ne poznamo nosilca, amortiziramo po časovnih metodah'], 0,
    'Amortizacija = strošek delovnih sredstev. Obraba zaradi uporabe (endogeni dejavniki) → funkcionalne/kombinirane metode; zastaranje (eksogeni) → časovne.'),
  Q('Katera trditev o metodah amortiziranja je pravilna? (izpit)', [
    'Pri časovnih metodah je letna amortizacija enaka, zato na enoto z večjim obsegom pada, kar spodbuja večjo izkoriščenost',
    'Pri funkcionalnih metodah je letna amortizacija enaka, zato na enoto z večjim obsegom pada, kar spodbuja večjo izkoriščenost',
    'Pri časovnih metodah je letna amortizacija enaka, zato ne vpliva na lastno ceno in ne spodbuja večje izkoriščenosti',
    'Pri funkcionalnih metodah DS izgubljajo vrednost zaradi eksogenih dejavnikov, neodvisno od svoje uporabe'], 0,
    'Časovne metode: eksogeni dejavniki, letni znesek fiksen → Am/enoto pada z obsegom → nižja lastna cena → spodbuda za izkoriščenost. Funkcionalne: Am/enoto je fiksna.'),
  Q('Metoda "stroški plus": (izpit)', [
    'Je metoda v proizvodnih podjetjih, ki stroškom na enoto doda pribitek za dobiček; zanemarja tržno povpraševanje',
    'Je metoda v trgovini, kjer marža, dodana nabavni ceni blaga, pokriva stroške trgovine in dobiček',
    'Je metoda v proizvodnih podjetjih, kjer pribitek pokriva fiksne stroške poslovanja in dobiček',
    'Je metoda v trgovini, kjer marža, dodana nabavni ceni blaga, v celoti predstavlja trgovčev dobiček'], 0,
    'Stroški plus = lastna cena + pribitek za dobiček. Glavna slabost: ne upošteva povpraševanja na trgu. Marža je pojem trgovine.'),
  Q('Kaj velja za mejne stroške? (izpit)', [
    'So razmerje med spremembo celotnih stroškov in spremembo skupnega produkta',
    'So razmerje med celotnimi stroški in količino skupnega produkta',
    'So prirast fiksnih stroškov zaradi povečanja proizvodnje za enoto',
    'So prirast celotnih stroškov zaradi povečanja zaposlitve faktorja za enoto'], 0,
    'MC = ΔTC/ΔQ: prirast celotnih stroškov za enoto več PRODUKTA (ne faktorja). TC/Q so povprečni stroški.'),
  Q('Kaj velja za oblikovanje cen v trgovini? (izpit)', [
    'Rabat je odstotek od prodajne cene, marža je odstotek od nabavne cene',
    'Rabat je odstotek od nabavne cene, marža je odstotek od prodajne cene',
    'Pri rabatu maloprodajno ceno določi trgovina sama, pri marži proizvajalec',
    'Razlika v ceni v celoti predstavlja trgovčev dobiček'], 0,
    'Marža: trgovec sam doda odstotek nabavni ceni. Rabat: maloprodajno ceno določi proizvajalec, trgovec dobi odstotek od nje. Razlika v ceni pokriva tudi stroške trgovine.'),
  Q('Katera trditev o angažiranju in trošenju je pravilna? (izpit)', [
    'Angažiranje je predpogoj trošenja; naturalni vidik trošenja so potrošene količine prvin',
    'Trošenje je predpogoj angažiranja; naturalni vidik trošenja so potrošene količine prvin',
    'Angažiranje je predpogoj trošenja; vrednostni vidik angažiranja so stroški prvin',
    'Trošenje je poraba denarja za pridobivanje prvin; vrednostni vidik so stroški'], 0,
    'Angažiranje = pridobitev prvin (naturalno: DS, zaloge, delavci; vrednostno: premoženje). Trošenje = poraba (naturalno: potroški; vrednostno: stroški).'),
  Q('Katera trditev o razliki med stroški, odhodki in izdatki je pravilna? (izpit)', [
    'Odhodki so stroški prodanih učinkov; če podjetje proizvede več, kot proda, so stroški večji od odhodkov',
    'Stroški so odhodki prodanih učinkov; če podjetje proizvede več, kot proda, so stroški večji od odhodkov',
    'Odhodki so stroški prodanih učinkov; dano posojilo je primer stroška, ki ni izdatek',
    'Odhodki so stroški vseh proizvedenih učinkov; izdatki so prilivi denarja v podjetje'], 0,
    'Odhodki = stroški, ki se nanašajo na prodane učinke. Izdatki so odlivi denarja; dano posojilo je izdatek, ki ni strošek.'),
  Q('Kdaj podjetje zabeleži prihodek in kdaj prejemek? (izpit)', [
    'Prihodek ob izstavitvi računa, prejemek ob plačilu računa',
    'Prihodek ob plačilu računa, prejemek ob izstavitvi računa',
    'Oboje ob plačilu računa, ker velja načelo plačane realizacije',
    'Oboje ob dobavi blaga, ker velja načelo dejanske dobave'], 0,
    'Prihodke ugotavljamo po načelu zaračunane prodaje (račun), prejemki so dejanski prilivi denarja.'),
];

const izpitRac = [
  Q('Zmogljivost 90.000 proizvodov, P = 8,50 EUR, AVC = 7 EUR, FC = 45.000 EUR. Pri kateri izkoriščenosti nastopi točka preloma? (izpit)', [
    '33,3 %', '50,0 %', '66,7 %', '30,0 %'], 0,
    'Q = 45.000/(8,5 − 7) = 30.000. 30.000/90.000 = 33,3 %.'),
  Q('Zmogljivost 32.000 proizvodov, P = 8,50 EUR, AVC = 6,50 EUR, FC = 48.000 EUR. Pri kateri izkoriščenosti nastopi točka preloma? (izpit)', [
    '75 %', '24 %', '60 %', '80 %'], 0,
    'Q = 48.000/(8,5 − 6,5) = 24.000. 24.000/32.000 = 75 %.'),
  Q('Zmogljivost 50.000 enot, P = 85 EUR, AVC = 65 EUR, FC = 400.000 EUR. Pri kateri izkoriščenosti je prag in kolikšen je izid pri 60 %? (izpit)', [
    'Prag pri 40 %, dobiček 200.000 EUR', 'Prag pri 40 %, dobiček 600.000 EUR', 'Prag pri 60 %, izid 0 EUR', 'Prag pri 47 %, dobiček 150.000 EUR'], 0,
    'Q_BE = 400.000/20 = 20.000 = 40 %. Pri 60 % = 30.000 enot → π = 30.000 × 20 − 400.000 = 200.000 EUR.'),
  Q('Zmogljivost 100.000 enot, P = 20 EUR, AVC = 20 EUR, FC = 400.000 EUR. Kaj velja? (izpit)', [
    'Praga ni, pri 80 % je izguba 400.000 EUR', 'Prag je pri 20 %, pri 80 % je dobiček 1,2 mio EUR', 'Prag je pri 100 %, pri 80 % je izguba 80.000 EUR', 'Praga ni, pri 80 % je izguba 1,6 mio EUR'], 0,
    'Pokritje P − AVC = 0 → nobena količina ne pokrije FC, praga ni. Pri vsakem obsegu je izguba = FC = 400.000 EUR.'),
  Q('Produkt naraste s 400 na 500 enot, TC pa z 2 na 2,4 mio EUR. Koliko so MC in EAC? (izpit)', [
    'MC = 4.000 EUR, EAC = −0,2', 'MC = 4.000 EUR, EAC = 0,8', 'MC = 4.800 EUR, EAC = −0,2', 'MC = 400 EUR, EAC = 0,2'], 0,
    'MC = 400.000/100 = 4.000 EUR. ETC = (0,4/2)/(100/400) = 0,2/0,25 = 0,8 → EAC = −0,2: ob 1 % večjem obsegu AC padejo za 0,2 %.'),
  Q('Produkt naraste s 400 na 500 enot, TC z 2 na 2,4 mio EUR, prodajna cena je 3.000 EUR. Ali podjetje proizvaja prav? (izpit)', [
    'Preveč - P (3.000) < MC (4.000), obseg naj zmanjša', 'Premalo - P (3.000) < MC (4.000), obseg naj poveča', 'Premalo - P (3.000) > AC (4.800), obseg naj poveča', 'Ravno prav - P je večja od AVC, zato je v optimumu'], 0,
    'MC = 4.000 > P = 3.000 → zadnje enote stanejo več, kot prinesejo (Mπ < 0) → proizvaja preveč.'),
  Q('Čevlji 2008/2009 (količine; cene 2008): moški 100.000/80.000 po 30, otroški 200.000/120.000 po 20, ženski 80.000/100.000 po 50 EUR. Ure: 15.000 in 16.000. Kako se je realno spremenila produktivnost dela? (izpit)', [
    'Zmanjšala se je za 16,5 %', 'Povečala se je za 6,7 %', 'Zmanjšala se je za 10,9 %', 'Povečala se je za 16,5 %'], 0,
    'Stalne cene 2008: 2008 = 11 mio/15.000 h = 733,3 EUR/h; 2009 = (2,4 + 2,4 + 5) mio = 9,8 mio/16.000 h = 612,5 EUR/h. Indeks 83,5 → −16,5 %.'),
  Q('Vlakci (10.000 kos; delo 15.000, material 15.000) in avtomobilčki (20.000 kos; delo 15.000, material 30.000). SSP 75.000 po vseh neposrednih, SSNPU 90.000 po materialu. Lastna cena vlakca? (izpit)', [
    '9,00 EUR', '7,50 EUR', '8,00 EUR', '12,00 EUR'], 0,
    'SSP: 75.000/75.000 = 100 % → vlakci 30.000. SSNPU: 90.000/45.000 = 200 % materiala → vlakci 30.000. Skupaj 90.000/10.000 = 9 EUR. (Avtomobilček: 150.000/20.000 = 7,50 EUR.)'),
  Q('A (2.000 kos; delo 10.000, material 6.000) in B (1.000 kos; delo 6.000, material 4.000). SSP 20.800 po vseh neposrednih, SSNPU 19.200 po delu. Lastni ceni? (izpit)', [
    'A 20,40 EUR, B 25,20 EUR', 'A 25,20 EUR, B 20,40 EUR', 'A 18,40 EUR, B 29,20 EUR', 'A 20,40 EUR, B 20,40 EUR'], 0,
    'SSP: 20.800/26.000 = 80 % → A 12.800, B 8.000. SSNPU: 19.200/16.000 = 120 % dela → A 12.000, B 7.200. A = 40.800/2.000 = 20,40; B = 25.200/1.000 = 25,20.'),
  Q('Oprema: nabavna cena 80.000 + transport in montaža 20.000 EUR. V dobi koristnosti 25.000 ton, v 1. letu 4.000 t. Koliko je amortizacija v 1. letu po proizvodni metodi? (izpit)', [
    '16.000 EUR', '12.800 EUR', '16.667 EUR', '20.000 EUR'], 0,
    'Osnova = 100.000 (nabavna vrednost vključuje transport in montažo). 100.000/25.000 = 4 EUR/t → 4.000 × 4 = 16.000 EUR.'),
  Q('Kupljeno 300 kg A po 120 (plačano takoj) in 1.500 kg B po 160 EUR (40 % na kredit). Izdelanih 30.000 kosov z LC 80, prodanih 20.000 po 100 EUR. Koliko so stroški, odhodki in dobiček? (izpit)', [
    'Stroški 2,4 mio, odhodki 1,6 mio, dobiček 0,4 mio EUR', 'Stroški 1,6 mio, odhodki 2,4 mio, dobiček 0,4 mio EUR', 'Stroški 2,4 mio, odhodki 2,4 mio, dobiček −0,4 mio EUR', 'Stroški 0,28 mio, odhodki 1,6 mio, dobiček 0,4 mio EUR'], 0,
    'Stroški = 30.000 × 80 = 2,4 mio. Odhodki = prodano × LC = 20.000 × 80 = 1,6 mio. Prihodki = 20.000 × 100 = 2 mio → dobiček 0,4 mio EUR.'),
  Q('Prodanih 20.000 kosov po 100 EUR: 1. kupec 1.000 (plača takoj), 2. 3.000 (70 % takoj), 3. 7.000 (takoj), 4. 9.000 (50 % takoj). Koliko so prejemki? (izpit)', [
    '1.460.000 EUR', '2.000.000 EUR', '1.550.000 EUR', '1.370.000 EUR'], 0,
    '100.000 + 0,7 × 300.000 + 700.000 + 0,5 × 900.000 = 100.000 + 210.000 + 700.000 + 450.000 = 1.460.000 EUR. Prihodki so 2.000.000 EUR.'),
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
        { id: 'uvp-iz-teorija', name: 'Teoretična vprašanja s starih izpitov', questions: izpitTeorija },
        { id: 'uvp-iz-racunske', name: 'Računske naloge s starih izpitov', calc: true, questions: izpitRac },
      ],
      flashcards: [{ id: 'uvp-c-iz', name: 'Formule in pojmi (izpit)', cards: kartice }],
    },
  ],
};
