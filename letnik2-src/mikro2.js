/* Mikroekonomija 2 (2. letnik, ekonomska smer) - 2. kolokvij: ekonomika blaginje in družbena izbira, trgi pri popolni konkurenci
   (finalni, vmesni, trg dela, trg kapitala), splošno ravnotežje. Zapiski, vprašanja in primeri so lastni (CLAUDE.md):
   primeri z volitvami, delom, varčevanjem in investicijami imajo nove scenarije in na novo izračunane številke.
   1. kolokvij in izpit še nimata gradiva. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (id, q, options, correct, explanation) => withId(id, { q, options, correct, explanation });
const M = (id, q, pairs, explanation) => withId(id, { type: 'match', q, pairs: pairs.map(([term, def]) => ({ term, def })), explanation });

/* ------------------------------------------------------------------ zapiski ------------------------------------------------------------------ */
const NOTES = `
## Pet alokacijskih pravil in vloga cen

### Kaj pomeni učinkovito gospodarstvo
- Gospodarstvo je **učinkovito (Paretov optimum)**, ko nikomur ne moremo izboljšati položaja, ne da bi komu drugemu poslabšali.
- Za to mora veljati pet alokacijskih pravil. V popolni konkurenci jih uresničijo **racionalni subjekti** (porabniki maksimirajo korist, podjetja dobiček) in **enake, dane cene za vse**.

| Pravilo | Kdo in kako | Pogoj |
|---|---|---|
| 1. Menjava | porabnika maksimirata korist | MSS(S) = Px/Py = MSS(J) |
| 2. Proizvodnja (1.) | podjetji minimirata stroške | MSTN(X) = w/r = MSTN(Y) |
| 3. Proizvodnja (2.) | zaposlitev dejavnika do max dobička | MFR_L(A) = w = MFR_L(B), enako za K in r |
| 4. Proizvodnja (3.) | podjetji maksimirata dobiček | MPT(A) = Px/Py = MPT(B) |
| 5. Menjava in proizvodnja | oboje hkrati | MSS = Px/Py = MPT |

- MSS = mejna stopnja substitucije (naklon indiferenčne krivulje), MSTN = mejna stopnja tehnične nadomestljivosti (naklon izokvante), MPT = mera proizvodne transformacije (naklon meje proizvodnih možnosti), MFR = mejni faktorski prihodek.
> Bistvo: **cene so ključ do učinkovitosti**, cene pa se oblikujejo na trgih. Zato v nadaljevanju gledamo, kako nastanejo cene na posameznih trgih.

## Ekonomika blaginje

### Od pogodbene krivulje do meje porabnikovih možnosti
- V Edgeworthovem diagramu (dana količina X in Y, porabnika J in S) **pogodbena krivulja** povezuje vse učinkovite razdelitve (tam se MSS obeh porabnikov izenačita).
- Vsako točko pogodbene krivulje prenesemo v diagram koristnosti (U_J, U_S) → dobimo **mejo porabnikovih možnosti**: največja korist enega pri dani koristi drugega.
- Meja je **izbočena**, ker: dobrine porabnikoma niso enako ustrezne, porabnika želita različne kombinacije, mejna korist pada.
- Točke **znotraj** meje so neučinkovite. Premik na mejo je lahko:
  - po **Paretovem kriteriju**: nekdo pridobi, nihče ne izgubi (le del meje, ki leži »severovzhodno« od začetne točke),
  - po **Kaldor-Hicksovem kriteriju**: dobitniki pridobijo toliko, da bi *lahko* poravnali izgubo poražencev (**nadomestitveno načelo**); nadomestilo ni nujno izplačano. Ta kriterij dopušča več premikov kot Paretov.
- Do učinkovitih točk vodi trg, **ne pove pa, katera razdelitev je prava** – meja je množica vseh učinkovitih razdelitev.

### Visoka meja porabnikovih možnosti in Bergsonova funkcija
- Vsaka točka na meji proizvodnih možnosti da drugačno količino X in Y → drug Edgeworthov diagram → drugo mejo porabnikovih možnosti (A, B, C ...).
- **Visoka meja porabnikovih možnosti** je **ovojnica** vseh teh mej: največja korist J pri dani koristi S, upoštevaje vse proizvodne možnosti. Na njej velja MSS = MPT (5. pravilo).
- Katero točko na visoki meji izbere družba, **ni ekonomska odločitev**: odloči politični proces (**Bergsonova funkcija družbene blaginje**), omejujejo pa ga gospodarske možnosti.
- Odprto vprašanje: ali lahko iz individualnih preferenc z demokratičnimi postopki sploh izpeljemo družbene preference?

## Družbena izbira: glasovanje in Arrowov teorem

### Condorcetov glasovalni paradoks
- Primer (lasten): Ana: pica > suši > burger; Bor: suši > burger > pica; Cene: burger > pica > suši.
- Po parih: pica : suši = 2 : 1, suši : burger = 2 : 1, burger : pica = 2 : 1 → pica > suši > burger > pica.
- Vsak posameznik ima jasne in tranzitivne preference, **skupina pa ne** – družbena preferenca je krožna, tranzitivnost ne velja.
- **Condorcetov zmagovalec** = možnost, ki v primerjavi po parih premaga vse druge. V paradoksu ga ni.
- Pri veliko volivcih in malo možnostih je paradoks redek; **več kot je možnosti, verjetnejši je**.

### Glasovalni postopki, ki primerjajo vse možnosti hkrati
- **Relativna večina (plurality)**: zmaga največ prvih mest.
- **Dva kroga (two-round runoff)**: če nihče nima več kot 50 %, se prva dva pomerita v drugem krogu.
- **Sprotno izločanje (instant runoff)**: izločamo možnost z najmanj prvimi mesti, njene glasove prenesemo na naslednjo izbiro, dokler nekdo ne preseže 50 %.
- **Bordovo točkovanje**: pri k možnostih dobi 1. mesto k − 1 točk, zadnje 0; zmaga največ točk.
- Isti glasovi lahko pri različnih postopkih dajo **različne zmagovalce** – družbena preferenca je odvisna od postopka. Noben od teh postopkov ne zagotovi, da zmaga Condorcetov zmagovalec.

### Arrowovi pogoji in teorem
1. Družbena izbira temelji na **racionalnih preferencah vseh** (vsak par je mogoče primerjati, velja tranzitivnost).
2. **Soglasje (Pareto)**: če vsi menijo a > b, mora tudi družba (in če en meni a > b, drugi so indiferentni, tudi).
3. **Brez diktatorja**: izbira ne sme biti odvisna od enega člana.
4. **Neodvisnost od nepomembnih alternativ**: razvrstitev a in b se ne sme spremeniti, če dodamo ali odvzamemo c.

**Arrowov teorem**: noben volilni sistem z razvrščanjem ne izpolni vseh pogojev hkrati.

- Bordovo točkovanje lahko krši 4. pogoj: 3 volivci A > B > C, 2 volivca B > C > A → Borda: B 7, A 6, C 2 (B > A). Če C umaknemo, je A : B = 3 : 2 (A > B), čeprav nihče ni spremenil mnenja o A in B.
> Tudi če politični proces ni »popoln«, je izbrana točka začetek ekonomskih procesov.

## Trgi pri popolni konkurenci: vrste trgov

### Trge ločimo po obnašanju, ne po blagu
- Isti avto je na **finalnem trgu**, če ga kupi gospodinjstvo, sedež zanj pa na **vmesnem trgu**, ker ga kupi proizvajalec avtomobilov.

| Trg | Kupci | Ponudniki |
|---|---|---|
| Finalni | max korist (U) | max dobiček (π) |
| Vmesni | max dobiček | max dobiček |
| Trg dela | max dobiček | max korist |
| Trg kapitala | max dobiček | max korist |

- Trg dela in trg kapitala imata enako logiko, zato iz štirih vrst dobimo **tri skupine**.
- Krožni tok: izdatek kupcev = prihodek ponudnikov na finalnih trgih; odhodki teh ponudnikov so prihodki na vmesnih trgih; stroški dela so dohodek gospodinjstev (trg dela); prihranki gredo prek trga kapitala, vrnejo se kot obresti in dividende.

### Ponudba na finalnem trgu
- Podjetje v popolni konkurenci maksimira π = TR − TC, pogoj **MR (= P) = MC**.
- Kratkoročna krivulja ponudbe podjetja = krivulja **MC nad minimumom AVC**. Tržna ponudba = **vodoravna vsota** individualnih.

## Povpraševanje: učinek substitucije in učinek dohodka

### Marshallova in Hicksova krivulja
- Ko se X poceni, se premaknemo iz točke 1 v točko 2. Premik razstavimo:
  - **učinek substitucije**: premik *po isti* indiferenčni krivulji (X je relativno cenejši),
  - **učinek (realnega) dohodka**: preskok na *višjo* indiferenčno krivuljo (z istim denarjem kupimo več).
- **Marshallova** krivulja povpraševanja upošteva oba učinka, **Hicksova** samo učinek substitucije (ostanemo na isti indiferenčni krivulji).
- Tržna krivulja povpraševanja = vodoravna vsota individualnih. Povpraševanje po proizvodih enega popolnega konkurenta je vodoravno (neskončno elastično).

| Dobrina (pocenitev X) | Učinek substitucije | Učinek dohodka | Razmerje | Skupaj |
|---|---|---|---|---|
| Normalna | + | + | – | obseg ↑ |
| Inferiorna | + | − | US > UD | obseg ↑ |
| Giffenova | + | − | US < UD | obseg ↓ |

- Učinek substitucije vedno deluje **v nasprotni smeri od spremembe cene** (zato je cenovna elastičnost praviloma negativna; izjema je Giffenova dobrina).

### Sprememba cene druge dobrine (Py ↑, Px enaka)
- Učinek substitucije poveča povpraševanje po X (X je relativno cenejši), učinek dohodka ga zmanjša (realni dohodek pade).
- US > UD → povpraševanje po X ↑ → **substituta** (E_K > 0); US < UD → ↓ → **komplementa** (E_K < 0); US = UD → **neodvisni** dobrini (E_K = 0).
- Odnos med dobrinama se vidi v obliki indiferenčnih krivulj (skoraj ravne = bližnja substituta, pravokotne = popolna komplementa).

### Ravnotežje na trgu
- Pri ceni nad ravnotežno je **presežna ponudba** → konkurenca med ponudniki zniža ceno; pri ceni pod ravnotežno je **presežno povpraševanje** → konkurenca med kupci jo dvigne. Ravnotežje je **konvergenčno**.

## Trg dela

### Ponudba dela: prosti čas ali dohodek
- Posameznik ima **potencialni delovni čas** (npr. 14 ur na dan) in ga deli na delo L in prosti čas.
- **Dohodkovna premica** kaže dosegljive kombinacije dohodka in prostega časa; njen naklon je mezdna stopnja w (višja w → bolj strma premica).
- **Indiferenčne krivulje** (dohodek – prosti čas) kažejo, koliko prostega časa je pripravljen žrtvovati za dodatni dohodek.
- Primer (lasten): 14 ur, w = 12 €/h. Če dela 9 ur, zasluži 108 € in ima 5 ur prostega časa; največji možni dohodek je 168 €.

### Dvig mezdne stopnje
- **Učinek substitucije**: prosti čas je dražji (ura počitka stane več izgubljenega dohodka) → **več dela**.
- **Učinek dohodka**: pri istih urah je posameznik bogatejši in si »kupi« več prostega časa → **manj dela**.
- US > UD → ponudba dela raste; UD > US → ponudba dela pade → individualna krivulja ponudbe se lahko **zavije nazaj**.
- **Nadure z višjim plačilom** veljajo le za dodatne ure: dohodek za dosedanje ure se ne spremeni, zato prevlada učinek substitucije in ponudba dela praviloma zraste. Če pa nekdo že dela ogromno ur, je učinek dohodka močan in višje plačilo ne prinese nujno več dela.
- **Tržna ponudba dela** (vodoravna vsota) je na dolgi rok naraščajoča: višja mezda privabi nove delavce v panogo, kar odtehta tiste, ki delajo manj ur.

### Povpraševanje po delu
- Podjetje zaposluje, dokler je **MFR_L ≥ w**: MFR_L = ΔTR/ΔL = Px · MP_L (mejni faktorski prihodek dela).
- **AFR_L** = TR/L = Px · AP_L (povprečni faktorski prihodek dela). Če je w nad AFR_L, so stroški dela večji od prihodkov → podjetje ne zaposli nikogar.
- Individualna krivulja povpraševanja po delu = **padajoči del MFR_L pod presečiščem z AFR_L** (in nad osjo).
- Gibanje **po krivulji**: sprememba w. **Premik krivulje**: tehnologija, količina kapitala K, cena proizvoda Px, na tržni ravni še število podjetij.
- **Tržno povpraševanje** je bolj togo od vsote individualnih: ko w pade, vsa podjetja zaposlijo več → proizvedejo več → Px pade → MFR_L pade.

### Ravnotežje in brezposelnost
- Ravnotežna mezda w* izenači obseg ponudbe in povpraševanja po delu.
- Pri mezdi nad w* je presežna ponudba dela → **neprostovoljna brezposelnost** (pri tej mezdi bi delali, a dela ne dobijo). Kdor pri w* ne želi delati, je **prostovoljno brezposeln**.

## Trg kapitala

### Dva pomena kapitala
- **Vrednostno izražena produkcijska sredstva** (stroji, oprema) → njihova cena nastane na **vmesnih trgih**.
- **Denarna sredstva za organiziranje proizvodnje** → cena nastane na **trgu kapitala** kot nagrada za odpoved sedanji potrošnji.
- Trg kapitala: **dolžniški** (posojila, obrestna mera i) in **lastniški/trajni** (investiranje, donos r).
- Dohodek danes: Y0 = C0 + S. Prihranek S prenesemo v prihodnjo potrošnjo C1 na **dva načina**: s posojanjem ali z investiranjem.

### Ponudba dolžniškega kapitala
- **Medčasovna dohodkovna premica**: C1 = S · (1 + i), naklon (absolutno) 1 + i.
- Primer (lasten): Y0 = 2.000 €, i = 5 %. Če privarčuje 800 €, je C0 = 1.200 € in C1 = 840 €; največja možna C1 je 2.100 €.
- Dvig i: **učinek substitucije** (sedanja potrošnja je dražja) → več varčevanja; **učinek dohodka** (varčevalec je bogatejši) → več C0 → manj varčevanja. Neto učinek je odvisen od moči obeh; tržna ponudba (vodoravna vsota) je naraščajoča.
- Povpraševanje po kapitalu: podjetja po MFR_K (kot pri delu). Ravnotežje: obrestna mera i* in količina K*.

### Ponudba trajnega kapitala (investiranje)
- **Medčasovna meja proizvodnih možnosti**: kombinacije C0 in C1, ki jih omogočijo investicije. Je izbočena, ker donos dodatnih investicij pada (**mejna učinkovitost kapitala** pada, povprečni donos r = C1/I − 1).
- Smiselni obseg investicij **maksimira sedanjo vrednost premoženja** W = C0 + C1/(1 + i).
- Primer (lasten): Y = 50.000 €, i = 8 %. I = 10.000 → C1 = 13.500 (W = 52.500); I = 20.000 → C1 = 24.840 (W = 53.000); I = 30.000 → C1 = 34.560 (W = 52.000). Izbere I = 20.000 €.
- Če želi privarčevati **manj**, kot je smiselno investirati (S < I), razliko **izposodi** na dolžniškem trgu (to se splača, ker je donos investicije r večji od i). Če želi privarčevati **več** (S > I), investira I, presežek pa **posodi**.

## Vmesni trgi in splošno ravnotežje

### Vmesni trgi
- Kupci in ponudniki **oba maksimirata dobiček**. Ponudba podjetja (delno) sovpada s krivuljo MC.
- Povpraševanje po vmesnem blagu: MFR_VB = Px · MP_VB; individualno povpraševanje je padajoči del MFR_VB pod presečiščem z AFR_VB.
- Tržno povpraševanje je zaradi vpliva cene vmesnega blaga na Px bolj togo od vsote individualnih. Ravnotežje je konvergenčno.

### Splošno ravnotežje (Walras)
- Parcialna analiza gleda en trg. **Teorija splošnega ravnotežja** (Léon Walras) sprašuje, ali cene lahko vzpostavijo ravnotežje **na vseh trgih hkrati**.
- n trgov: povpraševanje D_i in ponudba S_i sta odvisna od vseh cen; **presežno povpraševanje** ED_i = D_i − S_i. Splošno ravnotežje: ED_i = 0 na vseh trgih.
- **Walrasov zakon**: vrednost vseh presežnih povpraševanj je vedno 0, Σ P_i · ED_i = 0 (pri **vsakem** sistemu cen). Dva trga: Px · EDx + Py · EDy = 0.
- Posledica: enačbe so **linearno odvisne** – če je n − 1 trgov v ravnotežju, je tudi n-ti. Dobimo le n − 1 neodvisnih enačb.
- Zato dodamo **numerer** (standard vrednosti, Pn = 1). Rešitev so **relativne cene**; denarna cena = relativna cena × denarna cena numererja.
- Celoten model: n enačb povpraševanja in n enačb ravnotežja na finalnih trgih, n × m enačb tehničnih količnikov, m enačb ponudbe in m enačb ravnotežja na trgih proizvodnih dejavnikov.
  - **Walrasov ravnotežni pogoj** (finalni trg): cena, ki jo kupci želijo plačati, = ponudbena cena, p_i = Σ a_ij · P_j.
  - **Marshallov ravnotežni pogoj** (trg dejavnika): obseg povpraševanja = obseg ponudbe, Q_j = Σ a_ij · q_i.
  - Walrasov zakon tu: izdatki za finalno blago = dohodki od prodaje dejavnikov, Σ p_i q_i = Σ P_j Q_j → spet ena enačba odveč, rešljivo šele z numererjem.

### Kaj določa denarne cene
- **Fisherjeva enačba**: M · V = P · T (količina denarja × obtočna hitrost = raven cen × število transakcij).
- Sprememba količine denarja spremeni **denarno ceno numererja** in s tem vse denarne cene, **relativnih cen pa ne**.
`;

/* ------------------------------------------------------------------ vprašanja ------------------------------------------------------------------ */
const blaginja = [
  Q('i19c7af5b06', 'Kaj prikazuje pogodbena krivulja v Edgeworthovem diagramu menjave med porabnikoma J in S?', ['Vse razdelitve, kjer sta mejni stopnji substitucije obeh porabnikov enaki', 'Vse razdelitve, pri katerih imata porabnika enako količino dobrine X in dobrine Y', 'Vse kombinacije dobrin, ki jih gospodarstvo lahko proizvede', 'Vse razdelitve, pri katerih je korist obeh porabnikov enako velika'], 0,
    'Pogodbena krivulja poveže dotikališča indiferenčnih krivulj obeh porabnikov, kjer MSS(J) = MSS(S). To so učinkovite (Paretove) razdelitve v menjavi.'),
  Q('ifb145f15f1', 'Kako iz pogodbene krivulje dobimo mejo porabnikovih možnosti?', ['Vsako točko pogodbene krivulje prenesemo v diagram koristnosti obeh porabnikov', 'Seštejemo indiferenčne krivulje obeh porabnikov v vodoravni smeri pri vsaki ceni', 'Povežemo točke, kjer je MSS enaka meri proizvodne transformacije', 'Vzamemo najvišjo indiferenčno krivuljo vsakega porabnika posebej'], 0,
    'Meja porabnikovih možnosti je ista množica učinkovitih razdelitev, le prikazana v prostoru koristnosti (U_J, U_S) namesto v prostoru dobrin.'),
  Q('id5d76ff712', 'Zakaj je meja porabnikovih možnosti izbočena (stran od izhodišča)?', ['Ker dobrine porabnikoma niso enako ustrezne in ker mejna korist pada', 'Ker se ob prerazdelitvi dobrin spremeni skupna količina dobrin v gospodarstvu', 'Ker podjetja pri večji proizvodnji dosegajo naraščajoče donose obsega', 'Ker porabnika pri menjavi vedno dobita enako količino obeh dobrin'], 0,
    'Ko enemu porabniku odvzamemo dobrino, ki mu malo pomeni, in jo damo drugemu, ki mu veliko pomeni, korist drugega zraste bolj, kot pade korist prvega. Tudi padajoča mejna korist prispeva k izbočenosti.'),
  Q('i58643b9bed', 'Gospodarstvo je v točki znotraj meje porabnikovih možnosti. Kaj velja?', ['Stanje je neučinkovito: vsaj enemu lahko izboljšamo položaj brez škode drugemu', 'Stanje je učinkovito, a razdelitev koristi med porabnika ni pravična', 'Stanje je nedosegljivo pri danih količinah dobrin v gospodarstvu', 'Stanje je učinkovito po Kaldor-Hicksovem kriteriju, ne pa tudi po Paretovem kriteriju'], 0,
    'Točke znotraj meje pomenijo, da menjava še ni izčrpala vseh koristi. Premik na mejo je mogoč tako, da nihče ne izgubi.'),
  Q('i70ee7d1863', 'Kdaj je sprememba izboljšanje po Paretovem kriteriju?', ['Ko se vsaj enemu položaj izboljša in se nikomur ne poslabša', 'Ko dobitniki pridobijo več, kot skupaj izgubijo vsi poraženci v družbi', 'Ko se poveča skupna korist vseh članov družbe v povprečju', 'Ko država poraženim izplača nadomestilo iz proračuna'], 0,
    'Paretov kriterij je strog: nihče ne sme izgubiti. Kaldor-Hicksov kriterij zahteva le, da bi dobitniki lahko poravnali izgube.'),
  Q('i9d0ff582cc', 'Na čem temelji Kaldor-Hicksov kriterij?', ['Na nadomestitvenem načelu: dobitniki bi lahko poravnali izgube poražencev', 'Na načelu, da nihče ne sme izgubiti, enako kot pri Paretovem kriteriju učinkovitosti', 'Na glasovanju večine o tem, katera razdelitev je pravična', 'Na pogoju, da so mejne stopnje substitucije vseh enake'], 0,
    'Nadomestilo je hipotetično – ni nujno, da je tudi izplačano. Zato Kaldor-Hicksov kriterij dopusti več premikov kot Paretov.'),
  Q('ica59ddff5b', 'Kateri kriterij dopušča več premikov iz neučinkovite točke na mejo porabnikovih možnosti?', ['Kaldor-Hicksov, ker dovoli tudi premike, pri katerih nekdo izgubi', 'Paretov, ker upošteva čisto vse točke na celotni meji porabnikovih možnosti', 'Oba enako, ker vodita v iste točke na meji možnosti', 'Noben, ker trg sam izbere edino učinkovito točko'], 0,
    'Po Paretu so dovoljeni le premiki na odsek meje, kjer nihče ne izgubi. Po Kaldor-Hicksu je dovoljen premik v katerokoli točko na meji, saj bi dobitniki lahko poravnali izgube.'),
  Q('i45c2b56f05', 'Kaj je visoka meja porabnikovih možnosti?', ['Ovojnica mej porabnikovih možnosti za vse točke meje proizvodnih možnosti', 'Meja porabnikovih možnosti pri najvišji možni proizvodnji dobrine X', 'Krivulja, ki povezuje najvišje dosegljive indiferenčne krivulje obeh porabnikov', 'Meja, ki jo določi država z Bergsonovo funkcijo blaginje'], 0,
    'Vsaka kombinacija proizvodnje X in Y da svoj Edgeworthov diagram in svojo mejo porabnikovih možnosti. Visoka meja vzame najboljše od vseh: največjo korist J pri dani koristi S.'),
  Q('i1ead8bee47', 'Kateri pogoj velja v točkah na visoki meji porabnikovih možnosti?', ['Mejna stopnja substitucije je enaka meri proizvodne transformacije', 'Mejna stopnja tehnične nadomestljivosti je enaka razmerju cen dobrin', 'Korist obeh porabnikov je enaka, ne glede na proizvodnjo', 'Mejni faktorski prihodek dela je enak obrestni meri'], 0,
    'Visoka meja upošteva hkrati učinkovitost v menjavi in proizvodnji, zato velja 5. alokacijsko pravilo: MSS = Px/Py = MPT.'),
  Q('ia376f69db4', 'Kdo odloči, v kateri točki visoke meje porabnikovih možnosti se bo družba ustavila?', ['Politični proces (Bergsonova funkcija), omejen z gospodarskimi možnostmi', 'Trg s popolno konkurenco, ker vedno pripelje v edino učinkovito točko na meji', 'Podjetja, ki maksimirajo dobiček pri danih cenah dobrin', 'Porabnika sama z menjavo dobrin na pogodbeni krivulji'], 0,
    'Vse točke na visoki meji so učinkovite. Izbira med njimi je vprašanje razdelitve, ki ni ekonomsko, ampak politično.'),
  Q('ia64fa6d357', 'Katero novo vprašanje odpre ekonomika blaginje?', ['Ali lahko iz individualnih preferenc z demokratičnim postopkom izpeljemo družbene preference', 'Ali lahko podjetja v popolni konkurenci dosežejo pozitiven dolgoročni dobiček', 'Ali so mejne stopnje substitucije porabnikov vedno padajoče', 'Ali lahko gospodarstvo proizvaja nad mejo proizvodnih možnosti'], 0,
    'Bergsonova funkcija naj bi nastala v političnem procesu. Analiza glasovanja (Condorcet, Arrow) pokaže, da to ni preprosto.'),
  Q('i7bc88455a0', 'Pri katerem alokacijskem pravilu se izenačita mejni stopnji substitucije dveh porabnikov?', ['Pri 1. pravilu (učinkovitost v menjavi)', 'Pri 2. pravilu (minimiranje stroškov)', 'Pri 4. pravilu (maksimiranje dobička podjetij)', 'Pri 3. pravilu (zaposlitev proizvodnih dejavnikov)'], 0,
    '1. pravilo: MSS(S) = Px/Py = MSS(J). Porabnika se ob danih cenah sama prilagodita, zato se njuni MSS izenačita.'),
  Q('i4c5c50c93f', 'Kateri pogoj opisuje 2. alokacijsko pravilo (1. pravilo v proizvodnji)?', ['Mejni stopnji tehnične nadomestljivosti v proizvodnji X in Y sta enaki w/r', 'Mejna stopnja substitucije porabnikov je enaka meri proizvodne transformacije', 'Mera proizvodne transformacije obeh podjetij je enaka Px/Py', 'Mejni faktorski prihodek dela je v obeh podjetjih enak w'], 0,
    'Podjetja minimirajo stroške: MSTN(X) = w/r = MSTN(Y). Ker imata obe enako razmerje cen dejavnikov, se MSTN izenačita.'),
  Q('ie5387ab686', 'Kateri pogoj velja po 3. alokacijskem pravilu (2. pravilo v proizvodnji)?', ['Mejni faktorski prihodek dela je v vseh podjetjih enak mezdni stopnji w', 'Mejna stopnja substitucije vseh porabnikov je enaka razmerju cen', 'Mera proizvodne transformacije obeh podjetij je enaka mejni stopnji substitucije', 'Povprečni faktorski prihodek dela je v vseh podjetjih enak'], 0,
    'Vsako podjetje zaposluje do MFR_L = w (in MFR_K = r). Ker je w za vse enaka, se MFR izenačijo.'),
  Q('i4a0e791d8c', 'Zakaj se v popolni konkurenci uresniči vseh pet alokacijskih pravil?', ['Ker subjekti ravnajo racionalno ob danih in enakih cenah za vse', 'Ker država določi cene, ki izenačijo mejne stopnje substitucije', 'Ker podjetja sama določajo cene svojih proizvodov in storitev', 'Ker so vsi porabniki enaki po okusih in po dohodkih'], 0,
    'Porabniki prilagajajo MSS cenam, podjetja MSTN, MFR in MPT cenam. Ker so cene enake za vse, se vse mejne stopnje izenačijo.'),
];

const glasovanje = [
  Q('i39fddf85ce', 'Ana: pica > suši > burger; Bor: suši > burger > pica; Cene: burger > pica > suši. Kaj pokaže glasovanje po parih z večino?', ['Krožno preferenco: pica > suši > burger > pica', 'Zmago pice, ker jo dva od treh postavita pred suši', 'Zmago burgerja, ker ga noben ne postavi na zadnje mesto', 'Neodločen izid, ker ima vsaka hrana eno prvo mesto'], 0,
    'Pica : suši = 2 : 1, suši : burger = 2 : 1, burger : pica = 2 : 1. Vsak posameznik je tranzitiven, skupina ni – to je Condorcetov glasovalni paradoks.'),
  Q('ifc9ffc6a33', 'Kaj je Condorcetov glasovalni paradoks?', ['Posamezniki imajo tranzitivne preference, večinska preferenca skupine pa je krožna', 'Posamezniki imajo krožne preference, skupina pa tranzitivno', 'Večina lahko izvoli možnost, ki jo vsak posameznik posebej postavi na zadnje mesto', 'Pri dveh možnostih večinsko glasovanje nikoli ne da zmagovalca'], 0,
    'Iz A > B in B > C bi pričakovali A > C, glasovanje pa da C > A. Tranzitivnost na ravni skupine ne velja.'),
  Q('ia556738d77', 'Kaj je Condorcetov zmagovalec?', ['Možnost, ki v primerjavi po parih premaga vsako drugo možnost', 'Možnost z največ prvimi mesti že v prvem krogu glasovanja po relativni večini', 'Možnost z največ točkami po Bordovem točkovanju', 'Možnost, ki ostane zadnja pri sprotnem izločanju'], 0,
    'Condorcetov zmagovalec je definiran po parih. Drugi postopki ga ne izberejo nujno, tudi če obstaja.'),
  Q('idb43da2ec0', 'Kdaj je Condorcetov glasovalni paradoks verjetnejši?', ['Ko je možnosti več', 'Ko je volivcev več in možnosti le dve', 'Ko imajo vsi volivci enake preference', 'Ko glasujemo z Bordovim točkovanjem'], 0,
    'Pri veliko volivcih in malo možnostih je paradoks redek. Več kot je možnosti, več je kombinacij preferenc, ki vodijo v krožnost.'),
  Q('i7ba8f44cbf', 'Kako deluje glasovanje z relativno večino (plurality)?', ['Zmaga možnost z največ prvimi mesti, tudi brez večine', 'Zmaga možnost, ki dobi več kot polovico glasov v drugem krogu', 'Zmaga možnost z največ točkami za vsa mesta na seznamu', 'Zmaga možnost, ki premaga vse druge v primerjavi po parih'], 0,
    'Šteje samo prvo mesto. Zmagovalec ima lahko le tretjino glasov ali manj, če je možnosti veliko.'),
  Q('i5811d9ff38', 'Kako deluje sprotno izločanje (instant runoff)?', ['Najšibkejša možnost izpade, njeni glasovi gredo naslednjim izbiram, do večine nad 50 %', 'Prva dva po prvih mestih se pomerita v drugem krogu, ostali izpadejo hkrati', 'Vsaki možnosti seštejemo točke za vsa mesta, zmaga največ točk', 'Vsako možnost primerjamo z vsako drugo in štejemo zmage po parih'], 0,
    'Glasovi izločenih se postopno prenašajo, kar omogoči, da zmaga možnost, ki je mnogim druga izbira.'),
  Q('ic04e111d67', 'Koliko točk dobi 1. mesto pri Bordovem točkovanju s petimi možnostmi?', ['4 točke (zadnje mesto 0)', '5 točk (zadnje mesto 1)', '1 točko (ostala mesta 0)', '10 točk (vsako nižje 2 manj)'], 0,
    'Pri k možnostih dobi 1. mesto k − 1 točk, vsako naslednje eno manj, zadnje 0.'),
  Q('i9855817052', 'Kaj pokaže primerjava različnih glasovalnih postopkov z istimi individualnimi preferencami?', ['Družbena preferenca je odvisna od izbranega postopka agregacije', 'Vsi postopki vedno izberejo istega zmagovalca', 'Pravi zmagovalec je pri vseh postopkih vedno tisti z največ prvimi mesti', 'Bordovo točkovanje vedno izbere Condorcetovega zmagovalca'], 0,
    'Ista volja volivcev lahko da štiri različne zmagovalce. Noben postopek ne zagotovi, da zmaga Condorcetov zmagovalec.'),
  Q('if38b5cbecc', 'Kateri NI eden od Arrowovih pogojev za pošten volilni sistem?', ['Zmaga vedno možnost z več kot polovico prvih mest', 'Neodvisnost od nepomembnih alternativ', 'Odsotnost diktatorja', 'Soglasje: če vsi posamezniki menijo a > b, mora tako meniti tudi družba'], 0,
    'Arrowovi pogoji: racionalne preference vseh, soglasje (Pareto), brez diktatorja, neodvisnost od nepomembnih alternativ.'),
  Q('if8f8240c77', 'Kaj zahteva Arrowov pogoj neodvisnosti od nepomembnih alternativ?', ['Razvrstitev a in b se ne spremeni, če dodamo ali odvzamemo možnost c', 'Volivci ne smejo poznati vseh možnosti pred glasovanjem', 'Možnosti, ki jih nihče od volivcev ne postavi na prvo mesto, se pri izidu ne štejejo', 'Izid ne sme biti odvisen od enega samega volivca'], 0,
    'Če družba meni a > b, se to ne sme obrniti zaradi tega, ali je na glasovnici še c.'),
  Q('i362dce6b91', '3 volivci: A > B > C, 2 volivca: B > C > A. Bordovo točkovanje (2, 1, 0) da B pred A. Kaj se zgodi, ko C umaknemo?', ['A premaga B s 3 : 2, kar krši neodvisnost od nepomembnih alternativ', 'B ostane pred A, ker se nihče ni premislil o razmerju med A in B', 'A in B sta izenačena, ker umik C ne vpliva na nobenega volivca', 'Zmaga C, ker se umik upošteva šele po končanem glasovanju'], 0,
    'Z C: A = 3 · 2 = 6, B = 3 · 1 + 2 · 2 = 7, C = 2. Brez C (1, 0): A = 3, B = 2. Mnenje o A in B se ni spremenilo, razvrstitev pa se je obrnila.'),
  Q('i55d2772b2c', 'Kaj pravi Arrowov teorem?', ['Noben volilni sistem z razvrščanjem ne izpolni vseh pogojev za pošteno družbeno preferenco', 'Večinsko glasovanje po parih vedno da tranzitivno in pošteno družbeno preferenco', 'Bordovo točkovanje izpolni vse Arrowove pogoje, če so na izbiro največ tri možnosti', 'Pošteno družbeno preferenco je mogoče izpeljati le, če v družbi obstaja diktator'], 0,
    'Arrowov teorem nezmožnosti: hkrati ni mogoče izpolniti racionalnosti, soglasja, odsotnosti diktatorja in neodvisnosti od nepomembnih alternativ.'),
  Q('ic5e26bcc2d', 'Kaj zahteva Arrowov pogoj soglasja (Paretov pogoj)?', ['Če vsi posamezniki menijo a > b, mora tudi družba razvrstiti a > b', 'Vsi posamezniki morajo glasovati za isto možnost', 'Družba mora izbrati možnost, ki ji ne nasprotuje prav noben posameznik', 'Glasovi vseh posameznikov morajo imeti enako težo'], 0,
    'Velja tudi, če en posameznik meni a > b, vsi drugi pa so indiferentni: družba naj razvrsti a > b.'),
  Q('i1734064f3d', 'Kaj Arrow zahteva od individualnih preferenc pri 1. pogoju?', ['Da so popolne (primerjati je mogoče vsak par) in tranzitivne', 'Da so pri vseh volivcih v družbi popolnoma enake', 'Da vsak volivec glasuje le za eno, najljubšo možnost', 'Da so neodvisne od cen in dohodkov na trgu dobrin'], 0,
    'Za vsak par a in b mora posameznik povedati a > b, a = b ali a < b, in iz a > b ter b > c mora slediti a > c.'),
];

const trgi = [
  Q('iad2ca7bcd8', 'Po čem ločimo vrste trgov v teoriji popolne konkurence?', ['Po obnašanju kupcev in ponudnikov, ne po tem, kaj se prodaja', 'Po vrsti blaga, ki se prodaja na trgu: hrana, stroji, delo in denar', 'Po številu ponudnikov in kupcev, ki nastopajo na trgu', 'Po tem, ali je blago domače ali uvoženo iz tujine'], 0,
    'Avto je finalno blago, če ga kupi gospodinjstvo; avtosedež je vmesno blago, ker ga kupi proizvajalec. Odloča cilj kupca in ponudnika.'),
  Q('i1fc90351b1', 'Kaj maksimirata kupec in ponudnik na finalnem trgu?', ['Kupec korist, ponudnik dobiček', 'Kupec dobiček, ponudnik korist', 'Oba dobiček', 'Oba korist'], 0,
    'Gospodinjstvo kupuje zaradi koristi, podjetje prodaja zaradi dobička.'),
  Q('i662d2c19ec', 'Kaj maksimirata kupec in ponudnik na vmesnem trgu?', ['Oba dobiček', 'Kupec korist, ponudnik dobiček', 'Kupec dobiček, ponudnik korist', 'Oba korist'], 0,
    'Na vmesnem trgu podjetje kupuje od podjetja, zato oba sledita dobičku.'),
  Q('ia4052e5520', 'Kaj maksimirata kupec in ponudnik na trgu dela?', ['Kupec dobiček, ponudnik korist', 'Kupec korist, ponudnik dobiček', 'Oba dobiček', 'Oba korist'], 0,
    'Delo kupujejo podjetja (dobiček), ponujajo pa ga posamezniki, ki se odločajo med prostim časom in dohodkom (korist). Enako velja za trg kapitala.'),
  Q('i537ef17bc3', 'Zakaj iz štirih vrst trgov dobimo tri skupine?', ['Ker imata trg dela in trg kapitala enako obnašanje kupcev in ponudnikov', 'Ker sta finalni in vmesni trg v razmerah popolne konkurence popolnoma enaka', 'Ker trg kapitala ni trg, ampak del bančnega sistema', 'Ker na vmesnem trgu ni ponudnikov, ki bi maksimirali dobiček'], 0,
    'Na obeh kupuje podjetje (max π), ponuja posameznik (max U).'),
  Q('i2aa2e43727', 'Gospodinjstvo kupi pralni stroj za dom, pralnica pa enak stroj za svoje delo. Na katerih trgih sta nakupa?', ['Prvi na finalnem, drugi na vmesnem trgu', 'Oba na finalnem trgu, ker gre za isti stroj', 'Oba na vmesnem trgu, ker stroj ni hrana', 'Prvi na vmesnem, drugi na trgu kapitala'], 0,
    'Trg določa obnašanje kupca: gospodinjstvo maksimira korist (finalni trg), pralnica dobiček (vmesni trg).'),
  Q('i059933a398', 'Kaj velja v krožnem toku za odhodke ponudnikov na finalnih trgih za nakup sestavnih delov?', ['So prihodki ponudnikov na vmesnih trgih', 'So dohodki gospodinjstev na trgu dela', 'So prihranki gospodinjstev, ki gredo na trg kapitala', 'So izdatki kupcev na finalnih trgih'], 0,
    'Izdatki kupcev = prihodki na finalnih trgih; odhodki teh ponudnikov za vmesno blago = prihodki na vmesnih trgih; stroški dela = dohodki gospodinjstev.'),
  Q('i2b4fc11194', 'Kateri del krivulje mejnih stroškov je kratkoročna krivulja ponudbe podjetja v popolni konkurenci?', ['Del nad minimumom povprečnih variabilnih stroškov', 'Del pod minimumom povprečnih variabilnih stroškov', 'Del nad minimumom povprečnih fiksnih stroškov', 'Celotna krivulja mejnih stroškov od izhodišča'], 0,
    'Podjetje proizvaja tam, kjer P = MC, a le, če cena pokrije vsaj povprečne variabilne stroške.'),
  Q('if0e442f63a', 'Kako dobimo tržno krivuljo ponudbe iz individualnih krivulj podjetij?', ['Z vodoravnim seštevanjem količin pri vsaki ceni', 'Z navpičnim seštevanjem cen pri vsaki količini', 'Z izračunom povprečja individualnih krivulj', 'Z zmnožkom cene in količine vsakega podjetja'], 0,
    'Pri dani ceni seštejemo, koliko ponudi vsako podjetje. Enako velja za povpraševanje.'),
  Q('ie442c13b07', 'Cena dobrine je nad ravnotežno. Kaj se zgodi na trgu s popolno konkurenco?', ['Presežna ponudba sproži konkurenco med ponudniki, ki zniža ceno', 'Presežno povpraševanje sproži konkurenco med kupci, ki dvigne ceno', 'Cena ostane, ker jo popolni konkurenti jemljejo kot dano', 'Ponudniki zapustijo panogo, cena pa ostane na isti ravni'], 0,
    'Pri previsoki ceni ponudniki ne prodajo vsega in znižujejo ceno, dokler se trg ne izčisti. Ravnotežje je konvergenčno.'),
  Q('i6fac026b2b', 'Cena dobrine je pod ravnotežno. Kaj se zgodi na trgu s popolno konkurenco?', ['Presežno povpraševanje sproži konkurenco med kupci, ki dvigne ceno', 'Presežna ponudba sproži konkurenco med ponudniki, ki zniža ceno', 'Cena ostane enaka, ker jo država ščiti pred vsemi spremembami na tem trgu', 'Kupci se odpovejo nakupu, zato cena pade še nižje'], 0,
    'Kupci, ki ne dobijo blaga, ponujajo več, zato cena raste proti ravnotežni.'),
];

const povpr = [
  Q('i9e4a07bb16', 'Kaj grafično pomeni učinek substitucije ob pocenitvi dobrine X?', ['Premik po isti indiferenčni krivulji k več X in manj Y', 'Preskok na višjo indiferenčno krivuljo ob istem razmerju cen', 'Premik dohodkovne premice vzporedno navzven', 'Premik po dohodkovni premici k manj X in več Y'], 0,
    'Učinek substitucije izloči spremembo realnega dohodka: porabnik ostane na isti koristi, le prilagodi se novemu razmerju cen.'),
  Q('i62370295c5', 'Kaj grafično pomeni učinek realnega dohodka ob pocenitvi dobrine X?', ['Preskok na višjo indiferenčno krivuljo, ker z istim denarjem kupi več', 'Premik po isti indiferenčni krivulji k več X in manj Y', 'Zasuk indiferenčne krivulje, ker se spremenijo preference', 'Premik po krivulji povpraševanja navzgor, ker je cena dobrine X zdaj višja'], 0,
    'Pri istem nominalnem dohodku je dosegljiva večja košarica, zato porabnik doseže višjo indiferenčno krivuljo.'),
  Q('ie568d6bb6a', 'Kateri učinek upošteva Hicksova krivulja povpraševanja?', ['Samo učinek substitucije', 'Samo učinek dohodka', 'Učinek substitucije in učinek dohodka', 'Nobenega, kaže le tržno povpraševanje'], 0,
    'Hicksova krivulja ohrani porabnika na isti indiferenčni krivulji. Marshallova upošteva oba učinka.'),
  Q('ia954a3c5db', 'Kateri učinek upošteva Marshallova krivulja povpraševanja?', ['Učinek substitucije in učinek dohodka', 'Samo učinek substitucije', 'Samo učinek dohodka', 'Samo učinek spremembe preferenc porabnika do X'], 0,
    'Marshallova krivulja je običajna krivulja povpraševanja: kaže skupni učinek spremembe cene.'),
  Q('i4fcbc5a0b0', 'Dobrina X je normalna. V katero smer delujeta učinka ob pocenitvi X?', ['Oba povečata obseg povpraševanja po X', 'Učinek substitucije ga poveča, učinek dohodka zmanjša', 'Učinek substitucije ga zmanjša, učinek dohodka poveča', 'Oba zmanjšata obseg povpraševanja po X'], 0,
    'Pri normalni dobrini višji realni dohodek pomeni več X, zato se učinka seštejeta.'),
  Q('i8a134e8c16', 'Dobrina X je inferiorna, a ne Giffenova. Kaj se zgodi ob pocenitvi X?', ['Obseg povpraševanja zraste, ker je učinek substitucije močnejši od učinka dohodka', 'Obseg povpraševanja pade, ker je učinek dohodka močnejši od substitucije', 'Obseg povpraševanja se ne spremeni, ker se oba učinka med seboj popolnoma izničita', 'Obseg povpraševanja zraste, ker oba učinka delujeta v pozitivno smer'], 0,
    'Pri inferiorni dobrini učinek dohodka deluje v nasprotno smer, a je šibkejši od učinka substitucije.'),
  Q('i9063514c41', 'Kaj je značilno za Giffenovo dobrino ob pocenitvi?', ['Učinek dohodka je negativen in močnejši od učinka substitucije, obseg pade', 'Učinek substitucije je negativen in močnejši od učinka dohodka, obseg pade', 'Oba učinka sta pozitivna, a obseg vseeno pade', 'Učinek dohodka je pozitiven in obseg zato zraste'], 0,
    'Giffenova dobrina je močno inferiorna: pocenitev porabnika toliko »obogati«, da je kupi manj. Krivulja povpraševanja narašča.'),
  Q('i84bacabf54', 'Zakaj ima cenovna elastičnost povpraševanja praviloma negativen predznak?', ['Ker učinek substitucije vedno deluje v nasprotni smeri od spremembe cene', 'Ker učinek dohodka pri vseh dobrinah vedno deluje v nasprotni smeri od spremembe cene', 'Ker so vse dobrine normalne in imajo pozitiven učinek dohodka', 'Ker porabniki ob višjih cenah vedno zaslužijo manj'], 0,
    'Učinek substitucije je vedno »obraten«: dražje → manj. Izjema je Giffenova dobrina, kjer prevlada učinek dohodka.'),
  Q('i232268019b', 'Cena Y se zviša, cena X ostane enaka. V katero smer delujeta učinka na povpraševanje po X?', ['Učinek substitucije ga poveča, učinek dohodka zmanjša', 'Oba ga povečata, ker je X relativno cenejši', 'Učinek substitucije ga zmanjša, učinek dohodka poveča', 'Oba ga zmanjšata, ker je porabnik revnejši'], 0,
    'X je relativno cenejši (substitucija k X), realni dohodek pa je nižji (manj vsega, tudi X, če je normalna dobrina).'),
  Q('i121bba58df', 'Cena Y se zviša in povpraševanje po X zraste. Kaj to pove o dobrinah X in Y?', ['Sta substituta, ker je učinek substitucije močnejši od učinka dohodka', 'Sta komplementa, ker je učinek dohodka tu močnejši od učinka substitucije', 'Sta neodvisni dobrini, ker se učinka izničita', 'X je Giffenova dobrina, ker raste ob dražji Y'], 0,
    'Ko US > UD, povpraševanje po X raste in križna elastičnost je pozitivna: X in Y sta substituta.'),
  Q('i750244a600', 'Cena Y se zviša in povpraševanje po X pade. Kaj to pove o dobrinah X in Y?', ['Sta komplementa, ker je učinek dohodka močnejši od učinka substitucije', 'Sta substituta, ker je učinek substitucije tu močnejši od učinka dohodka', 'Sta neodvisni dobrini, ker se X ni podražila', 'X je inferiorna dobrina, Y pa normalna'], 0,
    'US < UD → povpraševanje po X pade, križna elastičnost je negativna: X in Y sta komplementa.'),
  Q('i5c5a00e7b1', 'Križna elastičnost povpraševanja po X glede na ceno Y je 0. Kakšni dobrini sta X in Y?', ['Neodvisni dobrini', 'Bližnja substituta', 'Popolna komplementa', 'Giffenovi dobrini'], 0,
    'E_K = 0: učinek substitucije in učinek dohodka sta enako močna, povpraševanje po X se ne spremeni.'),
  Q('i928fb2d9a2', 'Kje se v diagramu porabnika vidi odnos med dobrinama X in Y?', ['V obliki indiferenčnih krivulj', 'V naklonu dohodkovne premice', 'V položaju dohodkovne premice', 'V presečišču krivulje z ordinatno osjo'], 0,
    'Skoraj ravne indiferenčne krivulje pomenijo bližnja substituta, pravokotne pa popolna komplementa. Naklon dohodkovne premice je le razmerje cen.'),
  Q('i28d26478bb', 'Kakšna je krivulja povpraševanja po proizvodih enega podjetja v popolni konkurenci?', ['Vodoravna (neskončno elastična) pri tržni ceni', 'Padajoča, enaka tržni krivulji povpraševanja', 'Navpična pri količini, ki jo podjetje proizvede', 'Naraščajoča, enaka krivulji mejnih stroškov'], 0,
    'Podjetje je premajhno, da bi vplivalo na ceno: po tržni ceni proda kolikor hoče. Tržna krivulja povpraševanja je padajoča.'),
  Q('i98caf13ce2', 'Dobrina X je normalna. Kakšna je Hicksova krivulja povpraševanja v primerjavi z Marshallovo?', ['Bolj strma, ker ne vključuje učinka dohodka, ki obseg še poveča', 'Bolj položna, ker vključuje oba učinka, ki ju sproži sprememba cene', 'Enaka, ker je pri normalni dobrini učinek dohodka nič', 'Naraščajoča, ker kaže samo učinek dohodka'], 0,
    'Pri normalni dobrini učinek dohodka okrepi odziv, zato se Marshallova krivulja bolj odzove (je bolj položna). Hicksova kaže le substitucijo.'),
];

const delo = [
  Q('i9efe8ae71c', 'Med čim se posameznik odloča pri ponudbi dela?', ['Med prostim časom in dohodkom', 'Med delovnim časom in prostim časom pri isti koristi', 'Med sedanjo in prihodnjo potrošnjo', 'Med dvema dobrinama na finalnem trgu'], 0,
    'Indiferenčne krivulje na trgu dela kažejo kombinacije dohodka in prostega časa, med katerimi je posameznik indiferenten.'),
  Q('ic183117acb', 'Kaj kaže dohodkovna premica ponudnika dela?', ['Dosegljive kombinacije dohodka in prostega časa pri dani mezdni stopnji', 'Enakovredne kombinacije dohodka in prostega časa, med katerimi je posameznik indiferenten', 'Ponudbo dela posameznika pri različnih mezdnih stopnjah', 'Kombinacije delovnega in prostega časa, ki dajo enako korist'], 0,
    'Dohodkovna premica je omejitev (kaj je mogoče), indiferenčne krivulje pa preference (kaj je enako dobro).'),
  Q('i12edc012d0', 'Kaj se zgodi z dohodkovno premico ponudnika dela, ko se mezdna stopnja zviša?', ['Postane bolj strma, presečišče na osi prostega časa ostane', 'Postane bolj položna, presečišče z osjo dohodka se premakne navzdol', 'Vzporedno se premakne navzven, naklon ostane', 'Se ne spremeni, spremenijo se le indiferenčne krivulje'], 0,
    'Naklon je mezdna stopnja: vsaka ura dela prinese več. Potencialni delovni čas (presečišče z osjo prostega časa) ostane enak.'),
  Q('i5d5ba3f138', 'Kako na ponudbo dela deluje učinek substitucije ob dvigu mezdne stopnje?', ['Poveča jo, ker je ura prostega časa dražja', 'Zmanjša jo, ker je posameznik bogatejši', 'Ne vpliva, ker se potencialni delovni čas ne spremeni', 'Poveča jo le, če je prosti čas inferiorna dobrina'], 0,
    'Višja mezda pomeni, da ura počitka stane več izgubljenega dohodka, zato posameznik nadomesti prosti čas z delom.'),
  Q('i8e2eed9b41', 'Kako na ponudbo dela deluje učinek dohodka ob dvigu mezdne stopnje (prosti čas je normalna dobrina)?', ['Zmanjša jo, ker si bogatejši posameznik »privošči« več prostega časa', 'Poveča jo, ker je ura prostega časa dražja kot prej', 'Ne vpliva, ker se dohodek pri istih urah ne spremeni', 'Poveča jo, ker višji dohodek posameznika spodbudi k še več dela in potrošnje'], 0,
    'Pri istih urah dela je dohodek višji. Če je prosti čas normalna dobrina, posameznik želi več prostega časa in dela manj.'),
  Q('ic82e97d77d', 'Mezdna stopnja se zviša, učinek dohodka je močnejši od učinka substitucije. Kaj se zgodi s ponudbo dela posameznika?', ['Zmanjša se, krivulja ponudbe dela se zavije nazaj', 'Poveča se, krivulja ponudbe dela je naraščajoča', 'Ostane enaka, ker se učinka vedno izničita', 'Poveča se le pri nadurah, pri rednih urah pa ostane enaka'], 0,
    'Ko prevlada učinek dohodka, višja mezda pomeni manj ponujenih ur. Individualna krivulja ponudbe dela ima negativni naklon.'),
  Q('i61b80abb0a', 'Zakaj nadure z višjim plačilom praviloma povečajo ponudbo dela bolj kot enak dvig mezde za vse ure?', ['Ker se dohodek za dosedanje ure ne spremeni in je učinek dohodka zato šibek', 'Ker nadure sploh ne spremenijo dohodkovne premice posameznika', 'Ker je pri nadurah učinek substitucije negativen in zato šibek', 'Ker se z uvedbo nadur potencialni delovni čas posameznika podaljša'], 0,
    'Višje plačilo velja le za dodatne ure, zato se premica zlomi in strmi le tam. Prevlada učinek substitucije.'),
  Q('i404d9ea3bc', 'Bolnišnica dvigne plačilo nadur zdravnikom, ki že zdaj opravijo zelo veliko nadur. Zakaj ponudba dela morda ne bo zrasla?', ['Ker je pri tako visokem dohodku učinek dohodka lahko močnejši od učinka substitucije', 'Ker učinek substitucije pri nadurah vedno deluje v smeri manjše ponudbe dela', 'Ker se ob višjem plačilu nadur potencialni delovni čas zdravnikov skrajša', 'Ker so nadure po zakonu plačane po isti mezdi kot redno delo'], 0,
    'Kdor že dela ogromno in veliko zasluži, si z višjim plačilom raje »kupi« prosti čas. Višje plačilo ni vedno učinkovit način za več dela.'),
  Q('i399ee1b833', 'Zakaj je dolgoročna tržna krivulja ponudbe dela naraščajoča, čeprav se lahko individualne krivulje zavijejo nazaj?', ['Višja mezda privabi nove delavce, kar odtehta tiste, ki delajo manj ur', 'Ker vsi posamezniki pri višji mezdi vedno in brez izjeme ponudijo več ur dela', 'Ker tržno ponudbo dobimo z navpičnim seštevanjem mezd', 'Ker podjetja pri višji mezdi zaposlijo več delavcev'], 0,
    'Tržna ponudba je vodoravna vsota posameznikov z različnimi preferencami; vstop novih delavcev v panogo prevlada.'),
  Q('ie4b5e5b4c9', 'Do katere točke podjetje v popolni konkurenci zaposluje delavce?', ['Dokler je mejni faktorski prihodek dela vsaj enak mezdni stopnji', 'Dokler je mejni proizvod zadnjega delavca še pozitiven', 'Dokler povprečni proizvod dela ne doseže svojega maksimuma', 'Dokler je mezdna stopnja še nižja od cene, po kateri proda svoj proizvod'], 0,
    'Maksimiranje dobička na trgu dela: max (MFR_L − w). Zadnji delavec mora prinesti vsaj toliko, kolikor stane.'),
  Q('ic496ad9e07', 'Kako izračunamo mejni faktorski prihodek dela (MFR_L) v popolni konkurenci?', ['Cena proizvoda krat mejni proizvod dela', 'Mezdna stopnja krat število zaposlenih', 'Celotni prihodek deljen s številom zaposlenih', 'Cena proizvoda krat povprečni proizvod dela'], 0,
    'MFR_L = ΔTR/ΔL = Px · MP_L, ker je cena za popolnega konkurenta dana. Px · AP_L je povprečni faktorski prihodek (AFR_L).'),
  Q('i2645eab08b', 'Kateri del krivulje MFR_L je individualna krivulja povpraševanja po delu?', ['Pozitivni del MFR_L pod presečiščem s krivuljo AFR_L', 'Celotna krivulja MFR_L od izhodišča naprej', 'Naraščajoči del krivulje MFR_L od izhodišča do njenega maksimuma', 'Del MFR_L nad krivuljo AFR_L'], 0,
    'Če je mezda višja od AFR_L, je strošek dela (w · L) večji od celotnega prihodka (AFR_L · L) in podjetje ne zaposli nikogar.'),
  Q('i5e59bd8f3d', 'Kaj povzroči premik individualne krivulje povpraševanja po delu (ne gibanja po njej)?', ['Sprememba tehnologije, količine kapitala ali cene proizvoda', 'Sprememba mezdne stopnje, ki jo podjetje plača delavcem', 'Sprememba števila ur, ki jih delavci ponudijo na trgu', 'Sprememba preferenc delavcev pri izbiri med prostim časom in dohodkom'], 0,
    'Sprememba w pomeni gibanje po krivulji. Tehnologija, K in Px spremenijo MFR_L in premaknejo krivuljo.'),
  Q('i5ed182f300', 'Zakaj je tržna krivulja povpraševanja po delu bolj toga od vodoravne vsote individualnih krivulj?', ['Nižja mezda → vsa podjetja proizvedejo več → cena proizvoda in MFR_L padeta', 'Ker podjetja ob nižji mezdi zaposlijo manj delavcev kot prej', 'Ker se ob nižji mezdi na trgu hkrati poveča tudi ponudba dela', 'Ker je tržno povpraševanje navpična vsota individualnih krivulj'], 0,
    'Nižja w → več L → več Qx → nižja Px → nižji MFR_L. Odziv celotnega trga je zato manjši, kot če bi Px ostala.'),
  Q('ia9480e9ce7', 'Kaj poleg tehnologije, kapitala in cene proizvoda premakne tržno krivuljo povpraševanja po delu?', ['Število podjetij v panogi', 'Mezdna stopnja', 'Število ur, ki jih ponudijo delavci', 'Velikost potencialnega delovnega časa'], 0,
    'Tržno povpraševanje je vsota povpraševanja vseh podjetij, zato se poveča, ko v panogo vstopijo nova podjetja.'),
  Q('iebf28fb9ed', 'Mezda na trgu dela je nad ravnotežno. Kakšna brezposelnost nastane?', ['Neprostovoljna: pri tej mezdi bi več ljudi delalo, kot je delovnih mest', 'Prostovoljna: ljudje pri tako visoki mezdi ne želijo več delati', 'Nobena, ker trg dela pri vsaki ravni mezde zaposli vse, ki želijo delati', 'Prostovoljna, ker podjetja pri tej mezdi ne želijo zaposlovati'], 0,
    'Presežna ponudba dela pomeni, da del tistih, ki bi pri tej mezdi delali, dela ne dobi. Prostovoljno brezposelni so tisti, ki pri ravnotežni mezdi ne želijo delati.'),
];

const kapital = [
  Q('i5ad48f2c9f', 'Kaj je kapital v pomenu, ki ga obravnava trg kapitala?', ['Denarna sredstva za organiziranje proizvodnje', 'Vrednostno izražena produkcijska sredstva, kot so stroji', 'Celotna vrednost zemljišč in stavb v gospodarstvu', 'Zaloga gotovine, ki jo ima podjetje v blagajni'], 0,
    'Cena strojev in opreme nastane na vmesnih trgih. Na trgu kapitala gre za denar za organizacijo proizvodnje, njegova cena je nagrada za odpoved sedanji potrošnji.'),
  Q('i85b5317499', 'Kaj je cena na trgu kapitala?', ['Nagrada za odpoved koristi iz sedanje potrošnje', 'Cena strojev in opreme, ki jih podjetje kupi za proizvodnjo', 'Strošek dela, potrebnega za izdelavo strojev', 'Dobiček podjetja po plačilu vseh obveznosti'], 0,
    'Kdor varčuje, se danes odpove potrošnji; obresti oziroma donos so nagrada za to.'),
  Q('ib4da8bcf21', 'Na katera dva načina posameznik prenese prihranek S v prihodnjo potrošnjo?', ['S posojanjem in z investiranjem', 'S potrošnjo in z davki', 'Z delom v sedanjosti in s prostim časom v prihodnosti', 'Z izvozom in z uvozom'], 0,
    'Posojanje = trg dolžniškega kapitala (obrestna mera i), investiranje = trg lastniškega oziroma trajnega kapitala (donos r).'),
  Q('i0e641077c5', 'Kaj kaže naklon medčasovne dohodkovne premice pri posojanju prihrankov?', ['1 + i: koliko prihodnje potrošnje dobimo za enoto sedanje', 'i: koliko obresti plačamo za posojilo', 'Razmerje med dohodkom danes in dohodkom jutri', 'Pripravljenost posameznika, da odloži del potrošnje v prihodnost'], 0,
    'C1 = S · (1 + i), zato je tan α = C1/S = 1 + i. Pripravljenost odložiti potrošnjo kažejo indiferenčne krivulje.'),
  Q('i0290cdd8e3', 'Kaj kažejo medčasovne indiferenčne krivulje?', ['Pripravljenost žrtvovati sedanjo potrošnjo v korist prihodnje', 'Dosegljive kombinacije sedanje in prihodnje potrošnje pri dani obrestni meri', 'Kombinacije investicij z enako sedanjo vrednostjo', 'Odnos med obrestno mero in obsegom prihrankov'], 0,
    'Indiferenčne krivulje so preference. Dosegljive kombinacije kaže medčasovna dohodkovna premica.'),
  Q('i0883416910', 'Obrestna mera se zviša. Kako na varčevanje posojilodajalca deluje učinek substitucije?', ['Poveča ga, ker je sedanja potrošnja relativno dražja', 'Zmanjša ga, ker je varčevalec bogatejši', 'Ne vpliva, ker se dohodek posojilodajalca danes ne spremeni', 'Zmanjša ga, ker so posojila dražja'], 0,
    'Vsak evro, porabljen danes, pomeni odpoved več evrom jutri. Zato se posameznik odloči za več varčevanja.'),
  Q('i92fc959e00', 'Obrestna mera se zviša. Kako na varčevanje posojilodajalca deluje učinek dohodka?', ['Zmanjša ga, ker je posojilodajalec bogatejši in poveča tudi sedanjo potrošnjo', 'Poveča ga, ker je sedanja potrošnja zdaj relativno dražja kot prej', 'Ne vpliva, ker posojilodajalec obresti dobi šele v prihodnosti', 'Poveča ga, ker višje obresti pomenijo tudi višji dohodek že danes'], 0,
    'Posojilodajalec pri istem varčevanju dobi več, zato si lahko privošči več potrošnje tudi danes. Neto učinek na S je odvisen od moči obeh učinkov.'),
  Q('i798c4c3457', 'Kako dobimo tržno krivuljo ponudbe dolžniškega kapitala?', ['Z vodoravnim seštevanjem individualnih ponudb prihrankov', 'Z navpičnim seštevanjem obrestnih mer posameznikov', 'Iz krivulje mejnega faktorskega prihodka kapitala', 'Iz meje proizvodnih možnosti posameznega investitorja v trajni kapital'], 0,
    'Pri vsaki obrestni meri seštejemo prihranke vseh posameznikov. Povpraševanje po kapitalu pa izhaja iz MFR_K podjetij.'),
  Q('i464943e253', 'Kaj kaže medčasovna meja proizvodnih možnosti pri trajnem kapitalu?', ['Kombinacije sedanje in prihodnje potrošnje, ki jih omogočijo investicije', 'Kombinacije sedanje in prihodnje potrošnje, ki jih omogoči posojanje prihrankov', 'Kombinacije dela in kapitala z enako proizvodnjo', 'Kombinacije investicij, ki jih izbere banka'], 0,
    'Investiranje prenaša potrošnjo v prihodnost prek proizvodnje. Meja je izbočena, ker donos dodatnih investicij pada.'),
  Q('id32069ab1b', 'Zakaj je medčasovna meja proizvodnih možnosti izbočena?', ['Ker mejna učinkovitost kapitala pada: dodatne investicije prinesejo manj', 'Ker obrestna mera z obsegom investicij v gospodarstvu narašča', 'Ker posameznik ob večjih investicijah danes potroši vedno več', 'Ker povprečni donos investicij z obsegom investiranja narašča'], 0,
    'Najprej izvedemo najdonosnejše projekte, nato manj donosne. Mejna učinkovitost kapitala je donos zadnjega izvedenega projekta.'),
  Q('i65e9b58076', 'Kateri obseg investicij je za ponudnika trajnega kapitala najbolj smiseln?', ['Tisti, ki maksimira sedanjo vrednost premoženja W = C0 + C1/(1 + i)', 'Tisti, ki maksimira prihodnjo potrošnjo C1', 'Tisti, ki ima najvišji povprečni donos investicije', 'Tisti, pri katerem je sedanja potrošnja natanko enaka prihodnji potrošnji'], 0,
    'Smiselno je investirati, dokler donos zadnje enote investicije presega obrestno mero; takrat je sedanja vrednost premoženja največja.'),
  Q('ida4a767de5', 'Ponudnik trajnega kapitala želi privarčevati manj, kot je najbolj smiselno investirati (S < I). Kaj stori?', ['Del investicije financira s prihranki, del z izposojo na dolžniškem trgu', 'Investira le toliko, kolikor je privarčeval, in se odpove višjemu W', 'Razliko posodi na trgu dolžniškega kapitala', 'Proda del investicije in s tem poveča sedanjo potrošnjo'], 0,
    'Izposoja se splača, ker je pričakovani donos investicije r višji od obrestne mere i.'),
  Q('i678b2e1d53', 'Ponudnik trajnega kapitala želi privarčevati več, kot je najbolj smiselno investirati (S > I). Kaj stori?', ['Investira smiselni obseg, preostanek prihrankov posodi na dolžniškem trgu', 'Investira vse prihranke, ker večji obseg investicij vedno prinese več dobička', 'Razliko si izposodi na trgu dolžniškega kapitala', 'Preostanek prihrankov porabi danes'], 0,
    'Večje investicije bi prinesle donos, nižji od obrestne mere, zato je bolje presežek posoditi.'),
  Q('i02f7dec631', 'Kaj je mejna učinkovitost kapitala?', ['Donos zadnjega izvedenega investicijskega projekta', 'Povprečni donos vseh izvedenih investicijskih projektov', 'Donos prvega, najdonosnejšega investicijskega projekta', 'Obrestna mera, po kateri si podjetje izposodi denar'], 0,
    'Povprečna stopnja donosa je C1/I − 1 za celoten obseg investicij; mejna učinkovitost gleda le zadnjo enoto.'),
  Q('id10d8061ff', 'Kako na trgu kapitala nastane ravnotežna obrestna mera?', ['V presečišču tržne ponudbe prihrankov in tržnega povpraševanja po kapitalu', 'Določi jo centralna banka ne glede na ponudbo in povpraševanje', 'Kot povprečje donosov vseh investicij v gospodarstvu', 'V presečišču medčasovne meje proizvodnih možnosti in najvišje indiferenčne krivulje'], 0,
    'Ponudba = vsota prihrankov posameznikov, povpraševanje = vsota MFR_K podjetij. Presečišče da i* in K*.'),
];

const sr = [
  Q('i04a4178331', 'Kako je določeno povpraševanje podjetja po vmesnem blagu v popolni konkurenci?', ['Z delom krivulje MFR_VB pod presečiščem z AFR_VB', 'S krivuljo mejnih stroškov podjetja nad minimumom AVC', 'S koristjo, ki jo vmesno blago prinese lastniku podjetja', 'S ceno končnega proizvoda, ne glede na mejni proizvod'], 0,
    'Logika je enaka kot pri delu: MFR_VB = Px · MP_VB, podjetje kupuje, dokler je MFR_VB ≥ P_VB.'),
  Q('ie6db76668a', 'Kaj je teorija splošnega ravnotežja?', ['Analiza, ali cene lahko hkrati vzpostavijo ravnotežje na vseh trgih', 'Analiza ravnotežja na enem samem trgu ob nespremenjenih cenah na drugih trgih', 'Analiza ravnotežja med varčevanjem in investicijami', 'Analiza, kako država izenači ponudbo in povpraševanje'], 0,
    'Parcialna analiza gleda en trg. Splošno ravnotežje (Walras) upošteva, da je povpraševanje na vsakem trgu odvisno od vseh cen.'),
  Q('i9cb6a18cb4', 'Kaj je presežno povpraševanje na trgu i?', ['Razlika med povpraševanjem in ponudbo, ED_i = D_i − S_i', 'Razlika med ponudbo in povpraševanjem, ED_i = S_i − D_i', 'Povpraševanje, ki presega ravnotežno ceno', 'Povpraševanje države poleg zasebnega povpraševanja'], 0,
    'ED_i je funkcija vseh cen. Trg je v ravnotežju, ko je ED_i = 0.'),
  Q('ib607c982e3', 'Kaj pravi Walrasov zakon?', ['Vsota vrednosti presežnih povpraševanj na vseh trgih je vedno 0', 'Na vsakem trgu je presežno povpraševanje vedno 0', 'Ravnotežje na trgu kapitala nastopi, ko so prihranki enaki investicijam', 'Na trgu je ravnotežje, ko je obseg povpraševanja enak ponudbi'], 0,
    'Σ P_i · ED_i = 0 velja pri vsakem sistemu cen, ne le v ravnotežju. Kar je preveč na enem trgu, je premalo na drugem.'),
  Q('ia3a8ee43c3', 'Ali Walrasov zakon velja le pri ravnotežnih cenah?', ['Ne, velja pri vsakem sistemu cen', 'Da, velja le, ko so vsi trgi v ravnotežju', 'Da, velja le pri relativnih cenah', 'Ne, velja le pri neravnotežnih cenah'], 0,
    'Walrasov zakon izhaja iz proračunskih omejitev: vsak kupuje s tem, kar proda. Zato velja vedno.'),
  Q('ib56f1b9ba1', 'Gospodarstvo ima n trgov in n − 1 jih je v ravnotežju. Kaj sledi po Walrasovem zakonu?', ['V ravnotežju je tudi n-ti trg', 'n-ti trg ima zagotovo presežno ponudbo', 'n-ti trg ima zagotovo presežno povpraševanje', 'O n-tem trgu ne moremo sklepati ničesar'], 0,
    'Če je Σ P_i · ED_i = 0 in je n − 1 členov enakih 0, mora biti 0 tudi zadnji.'),
  Q('i6e56053af6', 'Zakaj sistem n enačb presežnega povpraševanja ne da n neodvisnih cen?', ['Ker so enačbe zaradi Walrasovega zakona linearno odvisne', 'Ker je v sistemu več enačb kot neznanih cen', 'Ker ponudba na posameznem trgu ni odvisna od cen', 'Ker so vse cene že določene s količino denarja v obtoku'], 0,
    'Ena enačba sledi iz ostalih, zato imamo le n − 1 neodvisnih enačb za n cen. Sistem je rešljiv šele, ko dodamo enačbo numererja.'),
  Q('i3f639bc370', 'Kaj omogoči izbira numererja (standarda vrednosti) v modelu splošnega ravnotežja?', ['Izračun relativnih cen vseh dobrin glede na numerer (Pn = 1)', 'Izračun denarnih cen vseh dobrin brez podatka o količini denarja v obtoku', 'Odpravo Walrasovega zakona iz sistema enačb', 'Določitev ravnotežnega obsega proizvodnje numererja'], 0,
    'Rešitev so relativne cene. Denarna cena dobrine = relativna cena × denarna cena numererja.'),
  Q('ie6edd87d87', 'Kaj pravi Walrasov ravnotežni pogoj na finalnem trgu?', ['Cena, ki so jo kupci pripravljeni plačati, je enaka ponudbeni ceni', 'Obseg povpraševanja je enak obsegu ponudbe', 'Vsota presežnih povpraševanj vseh trgov je 0', 'Izdatki za finalno blago so enaki dohodkom od prodaje proizvodnih dejavnikov'], 0,
    'Ponudbena cena je strošek dejavnikov na enoto: p_i = Σ a_ij · P_j. Pogoj o količinah je Marshallov.'),
  Q('i716335e3db', 'Kaj pravi Marshallov ravnotežni pogoj na trgu proizvodnih dejavnikov?', ['Obseg povpraševanja po dejavniku je enak obsegu njegove ponudbe', 'Cena dejavnika je enaka ceni, ki so jo kupci pripravljeni plačati', 'Vsota presežnih povpraševanj je enaka 0', 'Na trgu nastopa le en ponudnik dejavnika'], 0,
    'Q_j = Σ a_ij · q_i: povpraševanje po dejavniku j je odvisno od obsega proizvodnje finalnega blaga.'),
  Q('i946fcd5242', 'Kaj so tehnični količniki a_ij v modelu splošnega ravnotežja?', ['Količina dejavnika j, potrebna za enoto finalnega blaga i', 'Cena dejavnika j, izražena v enotah numererja', 'Delež dobrine i v potrošnji porabnika j', 'Mejni proizvod dejavnika j pri proizvodnji zadnje enote dobrine i'], 0,
    'Tehnični količniki povezujejo cene dejavnikov s ponudbeno ceno blaga in obseg proizvodnje s povpraševanjem po dejavnikih.'),
  Q('ia6238b25bd', 'Kako se Walrasov zakon pokaže v celotnem modelu s finalnimi trgi in trgi dejavnikov?', ['Izdatki za finalno blago so enaki dohodkom od prodaje proizvodnih dejavnikov', 'Izdatki za finalno blago so vedno enaki prihrankom vseh gospodinjstev', 'Dohodki od prodaje dela so enaki dohodkom od prodaje kapitala', 'Cena vsake finalne dobrine je v ravnotežju enaka ceni numererja'], 0,
    'Σ p_i · q_i = Σ P_j · Q_j. Zato je obseg povpraševanja po zadnji dobrini določen z ostalimi in enačbe so linearno odvisne.'),
  Q('idc9cef6d6b', 'Kaj določa denarno ceno numererja?', ['Količina denarja v obtoku (Fisherjeva enačba M · V = P · T)', 'Walrasov zakon, ker velja pri vsakem sistemu relativnih cen', 'Tehnični količniki proizvodnje numererja', 'Mejna stopnja substitucije porabnikov'], 0,
    'Model splošnega ravnotežja da le relativne cene. Denarno raven cen določi denar: M · V = P · T.'),
  Q('i6ce5c7902a', 'Količina denarja v obtoku se poveča, obtočna hitrost in število transakcij ostaneta enaka. Kaj se zgodi s cenami po modelu?', ['Denarne cene zrastejo, relativne cene ostanejo enake', 'Relativne cene se spremenijo, denarne ostanejo enake', 'Zrastejo le cene dejavnikov, cene blaga ostanejo', 'Ne zgodi se nič, ker velja Walrasov zakon'], 0,
    'Sprememba M spremeni denarno ceno numererja in s tem vse denarne cene sorazmerno. Razmerja med cenami ostanejo.'),
  Q('ib50ddefaac', 'Kaj pomenijo črke v Fisherjevi enačbi M · V = P · T?', ['Količina denarja, obtočna hitrost, raven cen, število transakcij', 'Mejna korist, vrednost blaga, ponudba, tehnološki napredek', 'Mezdna stopnja, vložek dela, proizvodnja, delovni čas', 'Denarna masa, varčevanje, profit podjetij, davčna stopnja'], 0,
    'Količina denarja × kolikokrat se obrne = raven cen × število transakcij.'),
  Q('i591e043afd', 'Koliko enačb in neznank ima celoten Walrasov model brez numererja?', ['Enako število, a sistem ni rešljiv, ker so enačbe linearno odvisne', 'Več enačb kot neznank, zato je sistem predoločen in nerešljiv', 'Manj enačb kot neznank, ker manjkajo enačbe za tehnične količnike', 'Enako število, zato je sistem brez dodatkov rešljiv za denarne cene'], 0,
    'Neznanke: n cen in količin finalnega blaga, m cen in količin dejavnikov, n × m količnikov; enačb je prav toliko. Zaradi Walrasovega zakona je ena odveč, zato dodamo Pn = 1.'),
];

const rac = [
  Q('ife1042e456', '41 študentov izbira izlet (A, B, C, D). 14 jih razvrsti A > C > D > B, 12 B > D > C > A, 9 C > D > B > A, 6 D > C > B > A. Kdo zmaga z relativno večino?', ['A s 14 glasovi', 'B z 12 glasovi', 'C s 15 glasovi', 'D s 6 glasovi'], 0,
    'Štejemo prva mesta: A 14, B 12, C 9, D 6. Zmaga A, čeprav ima le 34 % glasov.'),
  Q('i5bc927357c', '41 študentov izbira izlet: 14 razvrsti A > C > D > B, 12 B > D > C > A, 9 C > D > B > A, 6 D > C > B > A. Kdo zmaga pri glasovanju v dveh krogih?', ['B, ker v drugem krogu premaga A s 27 : 14', 'A, ker ima v prvem krogu največ glasov', 'C, ker je prva ali druga izbira največ volivcev', 'D, ker ga noben volivec ne postavi na zadnje mesto'], 0,
    'V prvem krogu nihče nima več kot 50 %, v drugi krog gresta A (14) in B (12). Vsi, ki niso za A (12 + 9 + 6 = 27), imajo B pred A.'),
  Q('ib2d38462cb', '41 študentov izbira izlet: 14 razvrsti A > C > D > B, 12 B > D > C > A, 9 C > D > B > A, 6 D > C > B > A. Kdo zmaga s sprotnim izločanjem?', ['C, ki v zadnjem krogu premaga A s 27 : 14', 'A, ker ima največ prvih mest od začetka', 'B, ki v zadnjem krogu premaga A s 27 : 14', 'D, ki dobi glasove izločenih kandidatov'], 0,
    'Izpade D (6 → C, C = 15). Nato izpade B (12): naslednja živa izbira je C (D je izločen), C = 27. C proti A: 27 : 14.'),
  Q('id805c72943', '41 študentov izbira izlet: 14 razvrsti A > C > D > B, 12 B > D > C > A, 9 C > D > B > A, 6 D > C > B > A. Koliko točk dobi C po Bordovem točkovanju (3, 2, 1, 0)?', ['79', '74', '51', '42'], 0,
    'C: 14 · 2 + 12 · 1 + 9 · 3 + 6 · 2 = 28 + 12 + 27 + 12 = 79. Za primerjavo: D 74, B 51, A 42.'),
  Q('i5fab5a4d7e', '41 študentov izbira izlet: 14 razvrsti A > C > D > B, 12 B > D > C > A, 9 C > D > B > A, 6 D > C > B > A. Kdo je Condorcetov zmagovalec?', ['C, ker premaga A (27 : 14), B (29 : 12) in D (23 : 18)', 'A, ker ima največ prvih mest (14 od 41)', 'B, ker v dvokrožnem glasovanju premaga A s 27 : 14', 'Ni ga, ker po parih nastane krožni glasovalni paradoks'], 0,
    'C proti D: 14 + 9 = 23 volivcev ima C pred D, 12 + 6 = 18 obratno. C premaga vse; relativna večina in dva kroga ga ne izbereta.'),
  Q('i37a7bc269f', 'Pet članov komisije razvršča tri kandidate po Bordovem točkovanju (2, 1, 0): trije A > B > C, dva C > B > A. Kdo zmaga?', ['B s 5 točkami', 'A s 6 točkami', 'C s 4 točkami', 'A in B izenačena s 5 točkami'], 1,
    'A = 3 · 2 + 2 · 0 = 6, B = 3 · 1 + 2 · 1 = 5, C = 3 · 0 + 2 · 2 = 4. Zmaga A.'),
  Q('i2f074aaec6', 'Študentka ima na voljo 14 ur na dan, mezdna stopnja je 12 €/h. Dela 9 ur. Kolikšna sta njen dnevni dohodek in prosti čas?', ['108 € in 5 ur', '168 € in 0 ur', '60 € in 9 ur', '108 € in 9 ur'], 0,
    'Dohodek = 9 · 12 = 108 €, prosti čas = 14 − 9 = 5 ur.'),
  Q('i9cc8088847', 'Ponudnik dela ima potencialni delovni čas 14 ur na dan. Mezdna stopnja se dvigne z 12 €/h na 15 €/h. Kako se spremeni največji možni dnevni dohodek?', ['S 168 € na 210 €', 'S 108 € na 135 €', 'S 168 € na 180 €', 'Ostane 168 €, ker je potencialni čas enak'], 0,
    'Največji dohodek = potencialni čas × mezda: 14 · 12 = 168 €, 14 · 15 = 210 €. Premica postane bolj strma.'),
  Q('idc56a247eb', 'Pekarna prodaja štruce po 5 €. Mejni proizvod 1. do 5. pomočnika je 40, 36, 30, 22 in 12 štruc na dan. Koliko pomočnikov zaposli pri dnevni plači 100 €?', ['4', '3', '5', '2'], 0,
    'MFR_L = 5 · MP_L: 200, 180, 150, 110, 60. Zaposli, dokler je MFR_L ≥ 100: do 4. pomočnika (110). Pri 4 je AFR_L = 5 · 128/4 = 160 > 100, zato se splača.'),
  Q('i1d75fcbab8', 'Pekarna prodaja štruce po 5 €. Mejni proizvod 1. do 5. pomočnika je 40, 36, 30, 22 in 12 štruc na dan. Koliko pomočnikov zaposli pri dnevni plači 160 €?', ['2', '3', '1', '4'], 0,
    'MFR_L: 200, 180, 150 ... Pogoju MFR_L ≥ 160 ustrezata prva dva. AFR_L pri 2 = 5 · 76/2 = 190 ≥ 160.'),
  Q('id5a85d3795', 'Varčevalec ima danes dohodek 2.000 €, obrestna mera je 5 %. Privarčuje 800 €. Kolikšna je njegova potrošnja danes in prihodnje leto?', ['C0 = 1.200 €, C1 = 840 €', 'C0 = 800 €, C1 = 1.260 €', 'C0 = 1.200 €, C1 = 800 €', 'C0 = 2.000 €, C1 = 840 €'], 0,
    'C0 = 2.000 − 800 = 1.200 €. C1 = S · (1 + i) = 800 · 1,05 = 840 €.'),
  Q('icbfa240899', 'Varčevalec ima danes dohodek 2.000 €, obrestna mera je 5 %. Kolikšna je največja možna potrošnja prihodnje leto?', ['2.100 €', '2.000 €', '1.905 €', '2.050 €'], 0,
    'Če vse privarčuje: C1 = 2.000 · 1,05 = 2.100 €. To je presečišče medčasovne dohodkovne premice z osjo C1.'),
  Q('i674cf444c7', 'Podjetnica ima 50.000 €, obrestna mera je 8 %. Investicija 10.000 € prinese čez leto 13.500 €, 20.000 € prinese 24.840 €, 30.000 € pa 34.560 €. Kateri obseg investicije izbere?', ['20.000 €, ker da največjo sedanjo vrednost premoženja (53.000 €)', '30.000 €, ker omogoči največjo prihodnjo potrošnjo (C1 = 34.560 €)', '10.000 €, ker ima najvišji povprečni donos (35 %)', '0 €, ker so vse investicije bolj tvegane od posojanja'], 0,
    'W = C0 + C1/1,08: 40.000 + 12.500 = 52.500; 30.000 + 23.000 = 53.000; 20.000 + 32.000 = 52.000. Največ da 20.000 €.'),
  Q('idde983b663', 'Podjetnica ima 50.000 € in investira 20.000 €, ki čez leto prinesejo 24.840 €. Obrestna mera je 8 %. Danes želi potrošiti 35.000 €. Kaj stori in kolikšna je njena potrošnja prihodnje leto?', ['Izposodi si 5.000 €, C1 = 19.440 €', 'Posodi 5.000 €, C1 = 30.240 €', 'Investira le 15.000 €, C1 = 18.630 €', 'Izposodi si 5.000 €, C1 = 24.840 €'], 0,
    'Privarčuje 15.000 €, investira 20.000 €, zato si izposodi 5.000 €. C1 = 24.840 − 5.000 · 1,08 = 19.440 €.'),
  Q('if8cc887917', 'Podjetnica ima 50.000 € in investira 20.000 €, ki čez leto prinesejo 24.840 €. Obrestna mera je 8 %. Danes želi potrošiti le 25.000 €. Kolikšna je njena potrošnja prihodnje leto?', ['30.240 €', '29.840 €', '24.840 €', '27.000 €'], 0,
    'Privarčuje 25.000 €, investira 20.000 €, preostalih 5.000 € posodi. C1 = 24.840 + 5.000 · 1,08 = 30.240 €.'),
  Q('i2f635a1e53', 'Gospodarstvo z dvema dobrinama: Px = 4, Py = 2. Presežno povpraševanje po X je +3 enote. Koliko je presežno povpraševanje po Y po Walrasovem zakonu?', ['−6', '−3', '+6', '−1,5'], 0,
    'Px · EDx + Py · EDy = 0 → 4 · 3 + 2 · EDy = 0 → EDy = −6. Na trgu Y je presežna ponudba 6 enot.'),
  Q('i73e83e8076', 'Gospodarstvo s tremi trgi: P1 = 2, P2 = 5, P3 = 1 (numerer). ED1 = 4, ED2 = −2. Koliko je ED3 po Walrasovem zakonu?', ['+2', '−2', '0', '+18'], 0,
    '2 · 4 + 5 · (−2) + 1 · ED3 = 0 → 8 − 10 + ED3 = 0 → ED3 = 2.'),
  Q('if6eeeb5435', 'V gospodarstvu je M = 500, V = 6 in T = 1.500. Kolikšna je raven cen P po Fisherjevi enačbi?', ['2', '0,5', '18', '3'], 0,
    'M · V = P · T → P = 500 · 6 / 1.500 = 2.'),
  Q('ibaa2479686', 'V gospodarstvu je M = 500, V = 6 in T = 1.500. Količina denarja se poveča na 1.000, V in T ostaneta. Kaj se zgodi?', ['Raven cen se podvoji z 2 na 4, relativne cene ostanejo', 'Raven cen ostane 2, spremenijo pa se relativne cene dobrin', 'Raven cen zraste z 2 na 3, ker se T poveča', 'Raven cen pade na 1, ker je več denarja'], 0,
    'P = 1.000 · 6 / 1.500 = 4. Spremenijo se denarne cene, razmerja med cenami ne.'),
  Q('ibcef548b7a', 'Cena kave se zviša za 10 %, povpraševanje po čaju pa zraste za 4 %. Kolikšna je križna elastičnost in kaj pove?', ['+0,4: čaj in kava sta substituta', '−0,4: čaj in kava sta komplementa', '+2,5: čaj in kava sta komplementa', '0: čaj in kava sta neodvisni dobrini'], 0,
    'E_K = 4 % / 10 % = +0,4. Pozitivna križna elastičnost pomeni substituta (učinek substitucije je močnejši od učinka dohodka).'),
];

const povezi = [
  M('i9906bcd51a', 'Poveži trg z obnašanjem kupcev in ponudnikov.', [
    ['Finalni trg', 'Kupci max korist, ponudniki max dobiček'],
    ['Vmesni trg', 'Kupci in ponudniki max dobiček'],
    ['Trg dela', 'Kupci max dobiček, ponudniki izbirajo med prostim časom in dohodkom'],
    ['Trg kapitala', 'Kupci max dobiček, ponudniki izbirajo med sedanjo in prihodnjo potrošnjo'],
  ], 'Trge ločimo po obnašanju, ne po blagu. Trg dela in kapitala imata enako logiko, zato so tri skupine.'),
  M('i212b86c16b', 'Poveži glasovalni postopek ali pojem z opisom.', [
    ['Relativna večina', 'Zmaga največ prvih mest'],
    ['Dva kroga', 'Prva dva se pomerita, če nihče nima več kot 50 %'],
    ['Sprotno izločanje', 'Najšibkejši izpade, njegovi glasovi gredo naprej'],
    ['Bordovo točkovanje', 'Točke za vsako mesto, zmaga največ točk'],
    ['Condorcetov zmagovalec', 'Premaga vse druge v primerjavi po parih'],
  ], 'Isti glasovi lahko dajo različne zmagovalce – družbena preferenca je odvisna od postopka.'),
  M('i7e2d9185cc', 'Poveži pojem splošnega ravnotežja z opisom.', [
    ['Walrasov zakon', 'Vsota vrednosti presežnih povpraševanj je vedno 0'],
    ['Walrasov ravnotežni pogoj', 'Cena, ki jo plačajo kupci, je enaka ponudbeni ceni'],
    ['Marshallov ravnotežni pogoj', 'Obseg povpraševanja je enak obsegu ponudbe'],
    ['Numerer', 'Dobrina s ceno 1, v kateri izrazimo relativne cene'],
    ['Fisherjeva enačba', 'Določa denarno raven cen: M · V = P · T'],
  ], 'Model splošnega ravnotežja da relativne cene; denarne cene so odvisne od količine denarja.'),
];

const kartice = [
  ['Pogodbena krivulja', 'Vse učinkovite razdelitve dobrin med porabnika; MSS obeh porabnikov sta enaki.'],
  ['Meja porabnikovih možnosti', 'Pogodbena krivulja v prostoru koristnosti: največja korist enega pri dani koristi drugega.'],
  ['Visoka meja porabnikovih možnosti', 'Ovojnica mej porabnikovih možnosti za vse točke na meji proizvodnih možnosti; MSS = MPT.'],
  ['Paretov kriterij', 'Izboljšanje: vsaj enemu bolje, nikomur slabše.'],
  ['Kaldor-Hicksov kriterij', 'Nadomestitveno načelo: dobitniki bi lahko poravnali izgube poražencev (ni nujno, da jih).'],
  ['Bergsonova funkcija blaginje', 'Izraz družbenih preferenc; določi točko na visoki meji porabnikovih možnosti; nastane v političnem procesu.'],
  ['Condorcetov paradoks', 'Tranzitivni posamezniki, krožna večinska preferenca skupine.'],
  ['Condorcetov zmagovalec', 'Možnost, ki premaga vse druge po parih.'],
  ['Bordovo točkovanje', 'Pri k možnostih 1. mesto k − 1 točk, zadnje 0; lahko krši neodvisnost od nepomembnih alternativ.'],
  ['Arrowovi pogoji', 'Racionalne preference vseh, soglasje (Pareto), brez diktatorja, neodvisnost od nepomembnih alternativ.'],
  ['Arrowov teorem', 'Noben sistem z razvrščanjem ne izpolni vseh pogojev hkrati.'],
  ['Učinek substitucije', 'Premik po isti indiferenčni krivulji; vedno v nasprotni smeri od spremembe cene.'],
  ['Učinek dohodka', 'Preskok na drugo indiferenčno krivuljo zaradi spremembe realnega dohodka.'],
  ['Hicksova krivulja', 'Povpraševanje samo z učinkom substitucije (ista korist).'],
  ['Marshallova krivulja', 'Povpraševanje z obema učinkoma.'],
  ['Giffenova dobrina', 'Inferiorna dobrina, kjer učinek dohodka prevlada nad substitucijo: cena ↓ → obseg ↓.'],
  ['Križna elastičnost', 'E_K > 0 substituta, E_K < 0 komplementa, E_K = 0 neodvisni dobrini.'],
  ['Dvig mezde: US in UD', 'US → več dela (prosti čas je dražji), UD → manj dela (bogatejši); UD > US → krivulja se zavije nazaj.'],
  ['Mejni faktorski prihodek dela', 'MFR_L = Px · MP_L; podjetje zaposluje, dokler je MFR_L ≥ w.'],
  ['Povpraševanje po delu', 'Padajoči del MFR_L pod presečiščem z AFR_L; premik: tehnologija, K, Px (trg: še število podjetij).'],
  ['Medčasovna dohodkovna premica', 'C1 = S · (1 + i); naklon 1 + i.'],
  ['Izbira investicije', 'Maksimira W = C0 + C1/(1 + i); S < I → izposoja, S > I → posojanje.'],
  ['Walrasov zakon', 'Σ P_i · ED_i = 0 pri vsakem sistemu cen; enačbe so linearno odvisne.'],
  ['Numerer', 'Dobrina s ceno 1; rešitev modela so relativne cene.'],
  ['Fisherjeva enačba', 'M · V = P · T; denar spremeni denarne, ne relativnih cen.'],
].map(([front, back]) => ({ front, back }));

module.exports = {
  id: 'mikro2',
  smer: 'ekonomska',   // vidijo ga le študenti brez izbrane smeri in študenti te smeri (profil → smer)
  name: 'Mikroekonomija 2',
  tier: 'A',
  parts: [
    { id: 'k1', name: '1. kolokvij', type: 'kolokvij' },
    {
      id: 'k2', name: '2. kolokvij', type: 'kolokvij',
      appendNotesMd: NOTES,
      decks: [
        { id: 'mikro2-blaginja', name: 'Alokacijska pravila in ekonomika blaginje', questions: blaginja },
        { id: 'mikro2-glasovanje', name: 'Družbena izbira: glasovanje in Arrowov teorem', questions: glasovanje },
        { id: 'mikro2-trgi', name: 'Vrste trgov, ponudba in ravnotežje', questions: trgi },
        { id: 'mikro2-povprasevanje', name: 'Povpraševanje: učinek substitucije in dohodka', questions: povpr },
        { id: 'mikro2-delo', name: 'Trg dela: ponudba, povpraševanje, ravnotežje', questions: delo },
        { id: 'mikro2-kapital', name: 'Trg kapitala: varčevanje in investiranje', questions: kapital },
        { id: 'mikro2-sr', name: 'Vmesni trgi in splošno ravnotežje', questions: sr },
        { id: 'mikro2-povezi', name: 'Povezovanje pojmov', questions: povezi },
        { id: 'mikro2-rac', name: 'Računske: glasovanje, delo, kapital, Walras', calc: true, questions: rac },
      ],
      flashcards: [{ id: 'mikro2-c-k2', name: 'Ključni pojmi', cards: kartice }],
    },
    { id: 'izpit', name: 'Izpit', type: 'izpit' },
  ],
};
