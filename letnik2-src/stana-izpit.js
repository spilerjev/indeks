/* Statistična analiza - uradni zgled izpita (EF Zapiski/2. letnik/Statistična analiza/Izpit/Zgled izpita.pdf, 28. 12. 2022).
   Izbirna vprašanja so preoblikovana tako, da vsako nosi svoje podatke (računalniški izpisi so povzeti v besedilu);
   odprte naloge (trend, vzorčenje v skupinicah, interval za število) so pretvorjene v izbirna vprašanja z izračunanimi rešitvami. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

const IZPIS1 = 'R: describeBy(ocena ~ srednja šola): gim n = 23, povprečje 6,96, sd 1,15; drugo n = 7, povprečje 7,00, sd 1,53. Welch t-test: t = −0,070, df = 8,17, p = 0,946, 95 % interval za razliko −1,48 do 1,39.';
const IZPIS2 = 'R: 180 gledalcev; nogomet DA/NE po spolu: M-DA 60, Ž-DA 40, M-NE 30, Ž-NE 50. chisq.test (Yates): X² = 8,12, df = 1, p = 0,0044. prop.table(observed): M-DA 0,33, M-NE 0,17, Ž-DA 0,22, Ž-NE 0,28.';

module.exports = [
  Q('(Zgled izpita) Kaj velja za koeficient parcialne korelacije med odvisno in eno od pojasnjevalnih spremenljivk v multiplem regresijskem modelu?', [
    'Pove smer in moč linearne povezanosti med njima ob izločenem vplivu ostalih pojasnjevalnih spremenljivk',
    'Pove, koliko odstotkov variabilnosti odvisne spremenljivke pojasni ta pojasnjevalna spremenljivka',
    'Pove samo smer linearne povezanosti ob izločenem vplivu ostalih spremenljivk',
    'Pove samo moč linearne povezanosti, ne glede na ostale spremenljivke'], 0,
    'Parcialni korelacijski koeficient je "očiščena" korelacija (predznak = smer, velikost = moč). Delež pojasnjene variance pove parcialni determinacijski koeficient.'),
  Q('(Zgled izpita) Katero predpostavko multiple regresije preverjamo z mero VIF?', [
    'Odsotnost pretirane multikolinearnosti', 'Normalno porazdelitev slučajnih napak', 'Odsotnost heteroskedastičnosti slučajnih napak', 'Odsotnost izrazitih osamelcev'], 0,
    'VIF (variance inflation factor) meri, koliko je posamezna pojasnjevalna spremenljivka linearno odvisna od ostalih; VIF > 10 je problematičen.'),
  Q('(Zgled izpita) Kaj velja za preizkus domneve o razliki med aritmetičnima sredinama za NEODVISNA vzorca?', [
    'Običajno uporabimo Welchev preizkus (t*), razen če lahko predpostavimo enaki varianci na obeh populacijah',
    'Pred preizkusom o razliki sredin obvezno izvedemo preizkus o razliki varianc',
    'Stopinje prostosti pri Welchevem preizkusu so m = n₁ + n₂ − 2',
    'Temu preizkusu pravimo tudi preizkus dvojic'], 0,
    'Welchev preizkus ne zahteva enakih varianc (df po Welch-Satterthwaite). Preizkus dvojic je za odvisna vzorca; m = n₁ + n₂ − 2 velja za Studentov t.'),
  Q('(Zgled izpita) Katera trditev o preizkušanju domnev NI pravilna?', [
    'Če zavrnemo ničelno domnevo, ko ta velja, naredimo napako druge vrste',
    'Če je vzorčna ocena v kritičnem območju, zavrnemo ničelno domnevo',
    'Tudi če velja alternativna domneva, je nek delež vzorčnih ocen v območju sprejema',
    'Množico vzorčnih ocen, pri katerih zavrnemo H₀, imenujemo kritično območje'], 0,
    'Zavrnitev prave H₀ je napaka PRVE vrste (α). Napaka druge vrste (β) je nezavrnitev napačne H₀.'),
  Q('(Zgled izpita) Z izračunom drsečih sredin pri časovnih vrstah zajamemo dve izmed štirih sestavin klasičnega modela. Kateri?', [
    'Trend in cikel', 'Trend in periodično komponento', 'Periodično komponento in iregularne vplive', 'Cikel in iregularne vplive'], 0,
    'Drseče sredine izločijo periodično komponento in slučajne (iregularne) vplive; ostane gladka komponenta trend + cikel.'),
  Q('(Zgled izpita) ' + IZPIS1 + ' Kateri par domnev ustreza prikazanemu preizkusu?', [
    'H₀: μ₁ = μ₂ in H₁: μ₁ ≠ μ₂', 'H₀: μ₁ = μ₂ in H₁: μ₁ > μ₂', 'H₀: μd = 0 in H₁: μd ≠ 0', 'H₀: μ₁ ≥ μ₂ in H₁: μ₁ < μ₂'], 0,
    'Izpis pravi "true difference in means is not equal to 0" → dvostranski preizkus za neodvisna vzorca (ne dvojice).'),
  Q('(Zgled izpita) ' + IZPIS1 + ' Katera p-vrednost velja za ta (dvostranski) preizkus in ali je razlika značilna?', [
    'p = 0,946; razlika ni značilna', 'p = 0,473; razlika ni značilna', 'p = 0,473; razlika je značilna', 'p = 0,946; razlika je značilna'], 0,
    'Dvostranski preizkus → p iz izpisa (0,946) > α = 0,05 → H₀ ne zavrnemo. Polovica (0,473) bi veljala za enostranski preizkus.'),
  Q('(Zgled izpita) ' + IZPIS1 + ' Kako pravilno razložimo rezultat?', [
    'Ne moremo trditi, da vrsta srednje šole vpliva na uspešnost pri izpitu (α = 0,05)',
    'Dokazali smo, da vrsta srednje šole ne vpliva na uspešnost (p = 0,946)',
    'Ugotavljamo, da vrsta srednje šole vpliva na uspešnost; trditev postavljamo pri α = 0,05',
    'Ugotavljamo, da vrsta srednje šole ne vpliva; trditev postavljamo pri stopnji značilnosti p = 0,946'], 0,
    'H₀ nikoli ne "dokažemo"; če je ne zavrnemo, le nimamo dovolj dokazov za H₁.'),
  Q('(Zgled izpita) Raziskovalec želi dokazati, da je povprečna višina študentov VEČJA od predpostavljene μ₀ (n = 25, σ = 10 cm). Kateri domnevi preizkuša?', [
    'H₀: μ ≤ μ₀ in H₁: μ > μ₀', 'H₀: μ = μ₀ in H₁: μ ≠ μ₀', 'H₀: μ ≥ μ₀ in H₁: μ < μ₀', 'H₀: ȳ = μ₀ in H₁: ȳ > μ₀'], 0,
    'Trditev, ki jo dokazujemo, gre v H₁ (desnostranski preizkus); domneve so vedno o parametru μ, ne o vzorčni oceni ȳ.'),
  Q('(Zgled izpita) Preizkus H₀: μ ≤ μ₀, H₁: μ > μ₀ (n = 25, σ = 10 cm). Katero količino nanašamo na vodoravno os, če grafično prikažemo porazdelitev vzorčnih ocen (na navpični je gostota verjetnosti)?', [
    'ȳ (vzorčno aritmetično sredino)', 'μ (populacijsko povprečje)', 'μ₀ (predpostavljeno povprečje)', 'f(ȳ) (gostoto)'], 0,
    'Porazdelitev vzorčnih ocen je porazdelitev slučajne spremenljivke ȳ; μ₀ in μ₁ sta na osi le točki.'),
  Q('(Zgled izpita) Preizkus H₀: μ ≤ μ₀, H₁: μ > μ₀, n = 25, σ = 10 cm, α = 0,05. Kritična meja?', [
    'ȳₖ = μ₀ + 3,3', 'ȳₖ = μ₀ + 16,5', 'ȳₖ = ȳ + 3,3', 'ȳₖ = μ₁ − 3,3'], 0,
    'se = σ/√n = 10/5 = 2; desnostranski preizkus z₀,₀₅ = 1,645 → ȳₖ = μ₀ + 1,645 · 2 = μ₀ + 3,3.'),
  Q('(Zgled izpita) V grafu časovne vrste opazimo periodičnost. Katera metoda jo natančneje opiše in ovrednoti?', [
    'Metoda kvocientov na vrsto drsečih sredin', 'Drseče sredine', 'Trend', 'Asociacija'], 0,
    'Kvocienti dejanskih vrednosti in drsečih sredin dajo indekse sezonskosti; same drseče sredine periodičnost le odstranijo.'),
  Q('(Zgled izpita) ' + IZPIS2 + ' Katera trditev je pravilna?', [
    'Tabela prop.table prikazuje relativno strukturo po obeh spremenljivkah hkrati',
    'Tabela prikazuje relativno strukturo po spremenljivki v čelu tabele',
    'Med moškimi je 60 % takšnih, ki spremljajo nogomet',
    'Mediana za spremenljivko spol je 50 %'], 0,
    'Deleži so od skupnega n = 180 (vsota 1,00). Med moškimi gleda nogomet 60/90 = 67 %; mediana za nominalno spremenljivko ne obstaja.'),
  Q('(Zgled izpita) Pri χ² preizkusu smo uporabili Yatesov popravek. Kdaj ga uporabimo?', [
    'Pri kontingenčni tabeli 2 × 2 (dve opisni spremenljivki z dvema vrednostma)',
    'Vedno, kadar preverjamo skladnost opazovanih in pričakovanih frekvenc',
    'Kadar je v vsaj enem polju pričakovana frekvenca večja od 5',
    'Kadar je v vsaj enem polju opazovana frekvenca večja od 5'], 0,
    'Popravek za zveznost se uporablja pri eni stopinji prostosti (tabela 2 × 2); R ga privzeto vklopi (correct = TRUE).'),
  Q('(Zgled izpita) ' + IZPIS2 + ' Kaj smo ugotovili s preizkusom?', [
    'Ker je p = 0,004 < α = 0,05, sta spol in spremljanje nogometnih tekem povezani spremenljivki',
    'Ker je p = 0,004 < α = 0,05, spol ni povezan s spremljanjem tekem',
    'Ker je p = 0,004 < α = 0,05, razlika ni značilna',
    'Ker je p < α, opazovani spremenljivki nista povezani'], 0,
    'Nizka p-vrednost → zavrnemo H₀ o neodvisnosti → povezanost je statistično značilna.'),
  Q('(Zgled izpita) Pojav Y: 2016–2020 vrednosti 10, 12, 14, 17, 22 (stabilna rast ~20 % letno). S katero enostavno metodo presodimo obliko trenda in katera oblika je primerna?', [
    'Verižni indeksi / razmerja zaporednih členov so približno enaka → eksponentni trend',
    'Razlike zaporednih členov so enake → linearni trend',
    'Drseče sredine kažejo cikel → polinomski trend',
    'Korelogram → logaritemski trend'], 0,
    'Enako razmerje med zaporednimi členi = enakomerno relativno stopnjevanje → eksponentna funkcija (lineariziramo z logaritmiranjem).'),
  Q('(Zgled izpita) Eksponentni trend za 2016–2020 (t = −2 … 2): povprečje log Y = 1,160, k_logY,t = 0,836, k_t = 10. Napoved za 2022 in letna stopnja rasti?', [
    'Y₂₀₂₂ ≈ 31; vsako leto + 21,2 %', 'Y₂₀₂₂ ≈ 26; vsako leto + 8,4 %', 'Y₂₀₂₂ ≈ 22; vsako leto + 20,0 %', 'Y₂₀₂₂ ≈ 35; vsako leto + 12,1 %'], 0,
    'b = 0,836/10 = 0,0836; log Y = 1,160 + 0,0836 t; 2022 → t = 4: log Y = 1,494 → Y ≈ 31,2. 10^0,0836 = 1,212 → trend raste 21,2 % letno (preprost povprečni koeficient dinamike bi bil (22/10)^(1/4) = 1,218).'),
  Q('(Zgled izpita) Država nima ažurnega seznama gospodinjstev, ima pa seznam občin; slučajno izbere nekaj občin in v njih opazuje VSA gospodinjstva. Vrsta vzorčenja in primarna enota?', [
    'Vzorčenje v skupinicah; primarna enota je občina', 'Vzorčenje v več stopnjah; primarna enota je gospodinjstvo',
    'Stratificirano vzorčenje; stratum je občina', 'Enostavno slučajno vzorčenje; enota je gospodinjstvo'], 0,
    'Opazujemo vse elementarne enote izbranih skupinic → vzorčenje v skupinicah. Natančnost merimo s se(ȳ). Učinkovito je, kadar so občine podobne med seboj, gospodinjstva znotraj njih pa raznolika; prednost: hitreje in ceneje.'),
  Q('(Zgled izpita) Kdaj je vzorčenje v skupinicah pri dani velikosti vzorca učinkovito?', [
    'Ko so skupinice med seboj podobne, enote znotraj skupinic pa raznolike',
    'Ko so skupinice med seboj zelo različne, enote znotraj pa homogene',
    'Ko imamo seznam vseh elementarnih enot populacije',
    'Ko je število skupinic majhno in so velike'], 0,
    'Vsaka skupinica naj bo "mala populacija" (heterogena znotraj); pri stratificiranem vzorčenju je obratno (stratumi homogeni znotraj).'),
  Q('(Zgled izpita) N = 300.000 gospodinjstev, slučajni vzorec n = 1.900, od tega 342 načrtuje večji nakup. Intervalna ocena ŠTEVILA takih gospodinjstev pri α = 0,01?', [
    'Približno od 47.000 do 61.000 gospodinjstev', 'Približno od 52.000 do 56.000 gospodinjstev',
    'Približno od 40.000 do 68.000 gospodinjstev', 'Natanko 54.000 gospodinjstev'], 0,
    'p = 0,18; se(p) = √(0,18 · 0,82/1.900) = 0,0088; z = 2,58 → 0,18 ± 0,0227 → 0,157 do 0,203; × N → ≈ 47.100 do 60.900.'),
  Q('(Zgled izpita) Kaj pomeni stopnja tveganja α = 0,01 pri intervalni oceni?', [
    'Pri 1 % vseh možnih slučajnih vzorcev te velikosti tako izračunani interval parametra ne zajame',
    'Verjetnost, da je parameter zunaj intervala, je 99 %',
    'Ocena odstopa od parametra za največ 1 %',
    'Napaka 2. vrste je 1 %'], 0,
    'α je verjetnost, da postopek da interval, ki parametra ne vsebuje; 1 − α = 99 % je stopnja zaupanja.'),
];
