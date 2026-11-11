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
    'Običajno uporabimo Welchev preizkus (t*), razen če lahko predpostavimo enaki varianci na obeh populacijah', 'Pred preizkusom o razliki sredin obvezno izvedemo še preizkus o razliki med variancama na obeh populacijah', 'Stopinje prostosti pri Welchevem preizkusu (t*) se izračunajo kot m = n₁ + n₂ − 2, enako kot pri Studentovem', 'Izbira med Welchevim in Studentovim preizkusom je odvisna od tega, ali je spremenljivka normalno porazdeljena'], 0,
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
    'Metoda kvocientov na vrsto drsečih sredin', 'Metoda drsečih sredin brez kvocientov', 'Metoda najmanjših kvadratov (trend)', 'Metoda asociacije (kontingenčna tabela)'], 0,
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
    'Ker je p = 0,004 < α = 0,05, sta spol in spremljanje nogometnih tekem povezani spremenljivki', 'Ker je p = 0,004 < α = 0,05, smo ugotovili povezanost, a spol ni povezan s spremljanjem tekem', 'Ker je p = 0,004 < α = 0,05, razlika ni značilna in spol ne vpliva na spremljanje tekem', 'Ker je p = 0,004 < α = 0,05, opazovani spremenljivki nista povezani in sta neodvisni'], 0,
    'Nizka p-vrednost → zavrnemo H₀ o neodvisnosti → povezanost je statistično značilna.'),
  Q('(Zgled izpita) Pojav Y: 2016–2020 vrednosti 10, 12, 14, 17, 22 (stabilna rast ~20 % letno). S katero enostavno metodo presodimo obliko trenda in katera oblika je primerna?', [
    'Verižni indeksi / razmerja zaporednih členov so približno enaka → eksponentni trend', 'Razlike zaporednih členov (absolutni prirastki) so približno enake → linearni trend', 'Drseče sredine kažejo izrazit cikel okoli povprečja → polinomski trend druge stopnje', 'Korelogram kaže padajočo avtokorelacijo → logaritemski trend s pojemajočo rastjo'], 0,
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
    'Pri 1 % vseh možnih slučajnih vzorcev te velikosti tako izračunani interval parametra ne zajame', 'Verjetnost, da je parameter zunaj izračunanega intervala, je 99 %, znotraj pa 1 %', 'Ocena iz vzorca odstopa od parametra za največ 1 % njegove vrednosti (relativna natančnost)', 'Verjetnost napake 2. vrste je 1 %, zato je moč intervalne ocene 99 %'], 0,
    'α je verjetnost, da postopek da interval, ki parametra ne vsebuje; 1 − α = 99 % je stopnja zaupanja.'),
  Q('(Zgled izpita 2009) Cena parcel (€) v odvisnosti od velikosti (m²) in oddaljenosti od Ljubljane (km), n = 33, Stepwise. Model 2: konstanta −21.648,8, velikost 362,349 (t = 14,9), oddaljenost −2.953,083 (se = 840,7, Sig. 0,001); R² = 0,896. Katera je najprimernejša ocena regresijske funkcije?', [
    'cena″ = −21.648,8 + 362,349·velikost − 2.953,083·oddaljenost', 'cena″ = −230.134,3 + 375,271·velikost (model 1)', 'cena″ = 0,892·velikost − 0,210·oddaljenost (standardizirani koeficienti)', 'cena = −21.648,8 + 362,349·velikost · (−2.953,083)·oddaljenost'], 0,
    'Vzamemo zadnji (popolnejši) model s stepwise postopka; obe spremenljivki sta značilni. Standardizirani koeficienti (Beta) niso ocena funkcije v izvirnih enotah.'),
  Q('(Zgled izpita 2009) Parcele: cena″ = −21.648,8 + 362,349·velikost − 2.953,083·oddaljenost. Kako razložimo oceno regresijskega koeficienta pri velikosti?', [
    'Če je parcela za 1 m² večja, oddaljenost od Ljubljane pa se ne spremeni, je v povprečju dražja za 362,349 €', 'Za 1 m² večje parcele so v povprečju dražje za 362,349 € (ne glede na oddaljenost)', 'Če se površina poveča za 1 m², je parcela dražja za 0,892 € pri nespremenjeni oddaljenosti', 'Pričakovano povečanje cene za 1 m² večje površine je 375,271 €'], 0,
    'Parcialni regresijski koeficient vedno razlagamo ob nespremenjenih ostalih pojasnjevalnih spremenljivkah (ceteris paribus); 375,271 je koeficient iz modela 1, 0,892 je Beta.'),
  Q('(Zgled izpita 2009) Parcele: koeficient oddaljenosti −2.953,083, se = 840,722, Sig. (2-tailed) 0,001. Katera trditev NI pravilna?', [
    'Želimo dokazati H₁: β_oddaljenost > 0', 'Enostranski preizkus koeficienta odkrije značilno razliko pri polpromilni stopnji značilnosti', 'Parcele, ki so dlje od Ljubljane, so pri isti velikosti v povprečju cenejše', 'Manjkajoča vrednost preizkusa je t = −3,513'], 0,
    'Dokazati želimo negativen vpliv (H₁: β < 0). t = −2.953,083/840,722 = −3,51; enostranski P = 0,001/2 = 0,0005. Predznaka t, parcialnega regresijskega in parcialnega korelacijskega koeficienta se ujemajo.'),
  Q('(Zgled izpita 2009) Parcele: R² modela 2 = 0,896, modela 1 = 0,853; Pearsonova korelacija velikost-oddaljenost = −0,152; parcialna korelacija cena-oddaljenost ob izločeni velikosti = −0,540. Katera trditev je pravilna?', [
    'Povezanost med velikostjo parcele in oddaljenostjo od Ljubljane je linearna, negativna in šibka (r = −0,152)', 'Ocena koeficienta multiple determinacije je 0,946', 'Partdeterminacijski koeficient ob vstopu oddaljenosti je 0,041', 'Parcialni korelacijski koeficient cena-oddaljenost ob izločeni velikosti je −0,292'], 0,
    'R² = 0,896 (0,946 je R); part R² = 0,896 − 0,853 = 0,043; parcialna korelacija je −0,540. Koeficient variacije velikosti = 2.165,8/1.637,7 = 132 %.'),
  Q('(Zgled izpita 2009) Tlakovci: za I. kvaliteto standardni odklon premera ne sme preseči 4 mm. Vzorec 10 tlakovcev: 198, 199, 203, 204, 202, 201, 200, 203, 205, 198 (s² = 6,23). Ali je kupec prejel tlakovce I. kvalitete (α = 5 %)?', [
    'Da: χ² = 9·6,23/16 = 3,51 < 16,92 (m = 9), H₀: σ = 4 ne zavrnemo', 'Ne: χ² = 3,51 > 2,70, H₀ zavrnemo', 'Da: z = (201,3 − 200)/4 = 0,33 < 1,645', 'Ne moremo odločiti brez podatka o populacijski sredini'], 0,
    'Preizkus variance: χ² = (n − 1)s²/σ₀² s m = n − 1 = 9; H₁: σ > 4 mm (desnostranski). Kritična meja χ²(9; 0,05) = 16,92.'),
  Q('(Zgled izpita 2009) Pri t-preizkusu dveh neodvisnih vzorcev je Levenov test dal F = 0,536, Sig. = 0,470. Katera trditev NI pravilna?', [
    'Levenov (Bartlettov) preizkus je odkril značilno razliko med variancama', 'Če Levenov preizkus odkrije značilno razliko, rezultate t-preizkusa beremo iz druge vrstice', 'Preizkusiti želimo domnevi o enakosti oziroma neenakosti varianc', 'Razmerje varianc 1,15²/1,53² = 0,565 je vrednost F-preizkusa varianc'], 0,
    'Sig. 0,470 > 0,05 → varianci se ne razlikujeta značilno → beremo prvo vrstico (equal variances assumed): t = −0,081, P = 0,936.'),
];
