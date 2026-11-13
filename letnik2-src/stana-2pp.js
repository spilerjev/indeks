/* Statistična analiza - 2. preizkušnja 20. 12. 2019 (fotografija izpita s popravki) in uradni zgled 2. PP (1. 1. 2009,
   z uradnim ključem) iz EF Zapiskov. Vsako vprašanje nosi svoje podatke (povzetek SPSS izpisa v besedilu);
   rešitve so preverjene z izpisi (reziduali, se, df, enostranske p-vrednosti). */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

const tbl = require('./tbl');
const SMUC = 'Smučišča (n = 20): odvisna spremenljivka CENA vozovnice (€), pojasnjevalne PROGE (skupna dolžina prog, km), VIŠINA (nadmorska višina, m) in ZMOGLJIVOST (tisoč smučarjev/h); multipla regresija, metoda Forward. SPSS izpis je v tabelah.';
const G_SMUC = tbl('Correlations (Pearson, s spremenljivko CENA)', ['Spremenljivka', 'r s CENO', 'Sig. (1-tailed)'], [['PROGE', '0,916', '0,000'], ['VIŠINA', '<b>?</b>', '0,019'], ['ZMOGLJIVOST', '0,903', '0,000']], 'Vrednost korelacije VIŠINA–CENA v izpisu manjka (vprašanje).')
  + tbl('ANOVA - Model 2 (PROGE, ZMOGLJIVOST)', ['', 'Sum of Squares', 'df', 'Mean Square', 'F', 'Sig.'], [['Regression', '581,84', 2, '290,92', '62,5', '0,000'], ['Residual', '79,11', 17, '4,65', '', ''], ['Total', '660,95', 19, '', '', '']])
  + tbl('Coefficients - Model 2', ['', 'B', 't', 'Sig. (2-tailed)'], [['(Constant)', '6,538', '', ''], ['PROGE', '0,357', '3,018', '0,008'], ['ZMOGLJIVOST', '0,443', '2,421', '0,027']]);
const BUS = 'Potniki na 10 avtobusnih postajah (v tisoč) decembra in junija; preizkus dvojic (Paired Samples). Izpis je v tabelah.';
const G_BUS = tbl('Paired Samples Statistics', ['', 'Mean', 'N'], [['DECEMBER', '26,10', 10], ['JUNIJ', '23,00', 10]])
  + tbl('Paired Samples Test (DECEMBER − JUNIJ)', ['Mean', 'Std. Deviation', 'Std. Error Mean', '95 % CI Lower', '95 % CI Upper', 't', 'df', 'Sig. (2-tailed)'], [['<b>?</b>', '5,238', '<b>?</b>', '−0,647', '6,847', '1,872', 9, '0,094']], 'Dve vrednosti v izpisu manjkata (vprašanji).');
const GORIVO = 'Poraba goriva na prebivalca (PORABAPC, galone) v 35 ameriških državah; pojasnjevalne spremenljivke DOVOL (delež voznikov), DOHPC (dohodek na prebivalca) in DAVEK; multipla regresija, metoda Forward. Izpis je v tabelah.';
const G_GORIVO = tbl('Model Summary', ['Model', 'Spremenljivke', 'R', 'R Square', 'Std. Error', 'R Square Change', 'F Change'], [[1, 'DOVOL', '0,693', '0,480', '', '0,480', '30,51'], [2, 'DOVOL, DOHPC', '0,831', '0,691', '54,498', '0,210', '']])
  + tbl('ANOVA', ['Model', '', 'df', 'Mean Square', 'F', 'Sig.'], [[1, 'Regression', 1, '147.702,9', '30,51', '0,000'], ['', 'Residual', 33, '4.841,3', '', ''], [2, 'Regression', 2, '106.211,3', '35,76', '0,000'], ['', 'Residual', 32, '2.970,1', '', '']], 'DAVEK v model ni bil vključen (Excluded Variables).');
const AVTOBUSI = 'Iztrošenost avtobusov v dveh podjetjih (po 11 avtobusov); preizkus za dva neodvisna vzorca (Independent Samples). Izpis je v tabelah.';
const G_AVTOBUSI = tbl('Group Statistics', ['Podjetje', 'N', 'Mean'], [['1', 11, '153,45'], ['2', 11, '94,91']])
  + tbl('Independent Samples Test', ['Levene F', 'Levene Sig.', 't', 'df', 'Sig. (2-tailed)'], [['1,325', '0,263', '1,759', 20, '0,094']]);

module.exports = [
  Q('(2. PP 2019) ' + SMUC + ' V tabeli Correlations manjka korelacija VIŠINA-CENA. Kolikšna je in kaj pomeni?', [
    'r = 0,467: linearna povezanost med CENO in VIŠINO je pozitivna in srednje močna (P = 0,019)',
    'r = 0,467: spremenljivka CENA statistično značilno vpliva na spremenljivko VIŠINA',
    'r = 0,432: CENA in VIŠINA sta statistično značilno srednje močno povezani',
    'r = 0,432: smučišča z višjo nadmorsko višino imajo dražje vozovnice'], 0,
    'Korelacijska matrika je simetrična (r_VIŠINA,CENA = r_CENA,VIŠINA = 0,467). Korelacija ne pove smeri vpliva, le povezanost; 0,432 je parcialna korelacija iz tabele Excluded Variables.'),
  Q('(2. PP 2019) ' + SMUC + ' Kolikšen je multipli determinacijski koeficient boljšega modela in kaj pomeni?', [
    'R² = 0,880: z linearnim vplivom PROGE in ZMOGLJIVOST pojasnimo 88 % variabilnosti CENE',
    'R² = 0,774: CENA, PROGE in ZMOGLJIVOST imajo 77,4 % skupne variabilnosti',
    'R = 0,938: spremenljivke so linearno pozitivno in zelo močno povezane',
    'R² = 0,432: PROGE in ZMOGLJIVOST pojasnita 43,2 % variabilnosti CENE'], 0,
    'R² = pojasnjena/skupna vsota kvadratov = 581,84/660,95 = 0,880 (R = 0,938 je multipli korelacijski koeficient).'),
  Q('(2. PP 2019) ' + SMUC + ' Katero domnevo preizkušamo s F-preizkusom v tabeli ANOVA (F = 62,5)?', [
    'H₀: β₁ = β₂ = 0; H₁: vsaj en β_j je različen od 0', 'H₀: σ_R ≤ σ_e; H₁: σ_R > σ_e', 'H₀: β₁ = β₂ = 0; H₁: vsaj en β_j je večji od 0', 'H₀: β₁ = β₂ = 0; H₁: β₁ in β₂ sta oba različna od 0'], 0,
    'F-preizkus preverja ustreznost regresijske funkcije kot celote: ali je vsaj ena pojasnjevalna spremenljivka značilna.'),
  Q('(2. PP 2019) V tabeli ANOVA je df za Total enak 19. Koliko smučišč je bilo v vzorcu?', [
    '20', '19', '18', '38'], 0,
    'df_skupaj = n − 1 → n = 20. (Regresija: k = 2, residual: n − k − 1 = 17.)'),
  Q('(2. PP 2019) ' + SMUC + ' Ali lahko trdimo, da ob nespremenjeni zmogljivosti večja skupna dolžina prog v povprečju zviša ceno vozovnice?', [
    'Da, pri P = 0,004', 'Da, pri P = 0,027', 'Da, pri P = 0,016', 'Ne, ker je P > 0,005'], 0,
    'Enostranski preizkus za koeficient PROGE: P = 0,008/2 = 0,004 < 0,05. Vrednost 0,027 pripada spremenljivki ZMOGLJIVOST.'),
  Q('(2. PP 2019) Model: CENA = 6,538 + 0,357·PROGE + 0,443·ZMOGLJIVOST. Smučišče Snežinka: 17 km prog, zmogljivost 12,6 tisoč smučarjev/h, vozovnica 22 EUR. Kolikšen je rezidual (napaka) e?', [
    '3,8 EUR', '3,8 %', '−3,8 smučišča', '4,2 EUR'], 0,
    'ŷ = 6,538 + 0,357·17 + 0,443·12,6 = 18,19 EUR; e = y − ŷ = 22 − 18,19 = 3,81 EUR. Nadmorska višina v model ni vključena.'),
  Q('(2. PP 2019) ' + BUS + ' Kolikšna je povprečna razlika (Mean) v tabeli Paired Samples Test?', [
    '3,10', '2,80', '0', '9,81'], 0,
    'd̄ = 26,10 − 23,00 = 3,10 (december − junij); interval −0,647 do 6,847 je simetričen okoli 3,10.'),
  Q('(2. PP 2019) ' + BUS + ' Kolikšna je standardna napaka razlike (Std. Error Mean)?', [
    '1,656', '5,803', '0,524', '16,564'], 0,
    'se(d̄) = s_d/√n = 5,238/√10 = 1,656; preverba: t = 3,10/1,656 = 1,872.'),
  Q('(2. PP 2019) ' + BUS + ' Ali je župan potrdil tezo, da se pozimi z avtobusom vozi več potnikov kot poleti?', [
    'Da, pri stopnji značilnosti P = 0,047', 'Župan ne more zavrniti ničelne domneve pri P = 0,094', 'Ne, ker ni odkril značilne razlike', 'Župan ne more zavrniti ničelne domneve pri P = 0,188'], 0,
    'Teza je enostranska (H₁: μ_d > 0), zato P = 0,094/2 = 0,047 < 0,05 → H₀ zavrnemo.'),
  Q('(2. PP 2019) Preizkus dvojic na 10 postajah: koliko znašajo stopinje prostosti?', [
    '9', '10', '18', '20'], 0,
    'Pri preizkusu dvojic je m = n − 1 = 9 (n = število parov).'),
  Q('(2. PP 2019) Občina: med 2000 avtomobili pričakujejo okoli 85 % z zimsko opremo. V vzorcu 40 avtomobilov jih 24 še ni bilo opremljenih. Ali lahko trdijo, da je delež opremljenih letos nižji kot lani?', [
    'Da, preizkus je odkril značilno odstopanje pri α = 0,001 (kritična meja 3,09)',
    'Ne, preizkus ni odkril značilnega odstopanja pri α = 0,05 (kritična meja 1,64)',
    'Zaradi premajhnega vzorca bi morali izvesti binomski preizkus',
    'Za izračun bi potrebovali še standardni odklon'], 0,
    'p = 16/40 = 0,40; H₀: π ≥ 0,85, H₁: π < 0,85; z = (0,40 − 0,85)/√(0,85·0,15/40) = −7,97, kar je daleč pod −3,09. Pogoj nπ₀ = 34 in n(1 − π₀) = 6 ≥ 5 je izpolnjen.'),
  Q('(2. PP 2019) S katerim preizkusom preverimo, ali sta varianci na dveh neodvisnih (različno velikih) vzorcih enaki?', [
    'F', 't', 't*', 'hi-kvadrat'], 0,
    'F = s₁²/s₂² (večja varianca v števcu); v SPSS ta namen opravi Levenov test.'),
  Q('(2. PP 2019) Asistentka z enim samim preizkusom preveri, ali se povprečne ocene pri štirih predmetih razlikujejo. Kaj je statistična enota in kaj spremenljivka?', [
    'Enota: študent; spremenljivka: ocena pri posameznem predmetu', 'Enota: predmet; spremenljivka: povprečna ocena pri predmetu', 'Enota: študent; spremenljivka: povprečna ocena študenta v 2. letniku', 'Enota: predmet; spremenljivka: ocena pri posameznem predmetu'], 0,
    'ANOVA primerja aritmetične sredine ocen (spremenljivka) po skupinah (predmet je faktor); enota je študent, pri katerem oceno izmerimo.'),
  Q('(2. PP 2019) Asistentka s preizkusom NI uspela dokazati, da se povprečne ocene pri štirih predmetih razlikujejo. Kateri preizkus je izvedla in kakšna je bila P-vrednost?', [
    'ANOVA; P-vrednost je bila višja od 5 %, zato H₀ o enakosti aritmetičnih sredin ni mogla zavrniti',
    't-preizkus skupin; P-vrednost je bila višja od 5 %',
    't-preizkus dvojic; P-vrednost je bila višja od 5 %',
    't-preizkus skupin; P-vrednost je bila nižja od 5 %, zato so povprečja različna'], 0,
    'Štiri skupine → analiza variance (F-preizkus); t-preizkus primerja le dve sredini.'),
  Q('(2. PP 2019) Kaj je pri preizkušanju domnev verjetnost za napako prve vrste (α)?', [
    'Verjetnost, da na podlagi vzorca zavrnemo ničelno domnevo, čeprav dejansko velja',
    'Verjetnost, da na podlagi vzorca ne zavrnemo ničelne domneve, čeprav ne velja',
    'Verjetnost, da na podlagi vzorca zavrnemo alternativno domnevo, čeprav velja',
    'Verjetnost, da sprejmemo alternativno domnevo, čeprav na vzorcu ne velja'], 0,
    'Napaka 2. vrste (β) je nezavrnitev napačne H₀; moč preizkusa je 1 − β.'),
  Q('(Zgled 2. PP) Katera značilnost JE predpostavka modela enostavne linearne regresije?', [
    'Varianca slučajne napake je enaka pri vsaki vrednosti neodvisne spremenljivke',
    'Pojasnjena varianca je večja od nepojasnjene variance',
    'Tako odvisna kot neodvisna spremenljivka sta slučajni spremenljivki',
    'Neodvisna spremenljivka se mora porazdeljevati normalno'], 0,
    'Homoskedastičnost. Vrednosti X so določene (nenaključne), normalno porazdeljena mora biti ODVISNA spremenljivka (napake); regresijski koeficient izraža absolutno spremembo.'),
  Q('(Zgled 2. PP) ' + GORIVO + ' Partdeterminacijski koeficient je 0,210. Kaj to pomeni?', [
    'Delež pojasnjene variance porabe goriva se je povečal za 21 odstotnih točk, ker smo vključili še dohodek na prebivalca', 'Determinacijski koeficient se je zaradi vključitve dohodka na prebivalca povečal za 21 odstotnih točk na 0,210', 'Delež pojasnjene variance porabe goriva se je povečal za 0,21 odstotne točke zaradi vključitve dohodka', 'Determinacijski koeficient se je povečal za 0,210, ker smo vključili vse preostale neodvisne spremenljivke'], 0,
    'R² change = 0,691 − 0,480 = 0,210 = razlika med multiplim in enostavnim determinacijskim koeficientom.'),
  Q('(Zgled 2. PP) ' + GORIVO + ' Eden od parametrov v Model Summary je 0,831. Kaj pomeni?', [
    'Multipli korelacijski koeficient: povezanost med PORABAPC ter DOVOL in DOHPC je linearna in močna', 'Pearsonov korelacijski koeficient: povezanost med PORABAPC in DOHPC je linearna, pozitivna in močna', 'Parcialni korelacijski koeficient: povezanost med PORABAPC in DOHPC ob izločenem vplivu DOVOL je močna', 'Multipli korelacijski koeficient: povezanost med PORABAPC ter DOVOL, DOHPC in DAVEK je linearna in močna'], 0,
    'R modela 2 = √0,691 = 0,831; DAVEK ni bil vključen (Excluded Variables).'),
  Q('(Zgled 2. PP) ' + GORIVO + ' Katera trditev o F-vrednostih v tabeli ANOVA je pravilna?', [
    'F = 30,51 preizkuša H₀, da je regresijski koeficient enostavne regresije enak nič; ker je P zanemarljiva, DOVOL značilno vpliva na PORABAPC', 'F = 35,76 preizkuša H₀, da sta oba parcialna regresijska koeficienta hkrati enaka nič; ker je P zanemarljiva, sprejmemo H₀, da DOHPC vpliva', 'F = 30,51 preizkuša H₀, da je prvi parcialni regresijski koeficient enak nič; ker je P zanemarljiva, H₀ ne moremo zavrniti, DOVOL nima vpliva', 'F = 30,51 preizkuša H₀, da je regresijski koeficient različen od nič; ker je P zanemarljivo majhna, DOVOL nima značilnega vpliva na PORABAPC'], 0,
    'Model 1: F = S²_R/S²_e = 147.702,9/4.841,3 = 30,51; model 2: F = 106.211,3/2.970,1 = 35,76.'),
  Q('(Zgled 2. PP) ' + GORIVO + ' Kaj pomeni ocena standardnega odklona napake 54,498 pri multipli regresiji?', [
    'Velikost odklonov opazovanih vrednosti porabe goriva od ocenjenih vrednosti (iz multiple regresijske funkcije) je 54,498 galone', 'Velikost odklonov ocenjenih vrednosti porabe goriva (iz multiple regresijske funkcije) od ocenjene povprečne porabe je 54,498 galone', 'Absolutna mera variabilnosti, ki meri velikost razlik med ocenjenimi vrednostmi porabe goriva na prebivalca, je 54,498 galone', 'Standardni odklon napake 54,498 pove, da je 54,498 % variance porabe goriva pojasnjene z variiranjem DOVOL in DOHPC'], 0,
    's_e = √(nepojasnjena vsota kvadratov/(n − k − 1)) = √2.970,1 = 54,5; meri razpršenost točk okoli regresijske ploskve.'),
  Q('(Zgled 2. PP) V tabeli ANOVA je obkrožena vrednost Mean Square za regresijo (106.211,3). Kako se imenuje ta kazalec?', [
    'Ocena pojasnjene variance', 'Ocena nepojasnjene variance', 'Pojasnjena vsota kvadratov', 'Nepojasnjena vsota kvadratov'], 0,
    'S²_R = k_R/k (vsota kvadratov regresije / število pojasnjevalnih spremenljivk); S²_e = k_e/(n − k − 1).'),
  Q('(Zgled 2. PP) Davčni inšpektor preverja, ali podjetje odvaja premalo DDV (predpisanih 20 %). V vzorcu 30 računov oceni povprečni odstotek in standardni odklon. Domnevi in preizkus?', [
    'H₀: μ = 20, H₁: μ < 20; t = (ȳ − μ₀)/se(ȳ)', 'H₀: μ = 20, H₁: μ ≠ 20; t = (ȳ − μ₀)/se(ȳ)', 'H₀: μ = 20, H₁: μ > 20; z = (ȳ − μ₀)/SE(ȳ)', 'H₀: σ² = 20, H₁: σ² < 20; χ² = (n − 1)s²/σ₀²'], 0,
    '"Premalo" → levostranski preizkus; σ ni znan (ocenjen s), zato t-preizkus s se(ȳ) = s/√n in m = n − 1 = 29.'),
  Q('(Zgled 2. PP) Katera trditev o preizkušanju domnev NI pravilna?', [
    'Razlika je značilna, če je vrednost P večja od najvišje dopustne stopnje značilnosti',
    'Kot najvišjo dopustno stopnjo značilnosti navadno uporabljamo 0,05',
    'Vrednost P je najmanjša verjetnost, pri kateri je možno zavrniti ničelno domnevo',
    'Če zavrnemo ničelno domnevo, ki v resnici velja, naredimo napako prve vrste'], 0,
    'Razlika je značilna, če je P MANJŠA ali enaka α.'),
  Q('(Zgled 2. PP) 18 upokojencev: korelacija med pokojnino in izdatki za potovanja je 0,50. Kaj velja za preizkus H₀, da spremenljivki nista povezani?', [
    't = 2,31 > kritična meja pri α/2 = 0,025 in m = 16, zato pri α = 0,05 zavrnemo H₀: spremenljivki sta povezani', 'Domneve ni mogoče preveriti, ker manjkata ocenjeni regresijski koeficient in ocena njegove standardne napake', 'Če bi bil ocenjeni korelacijski koeficient večji, bi bila ob vsem drugem enakem vrednost t-preizkusa nižja', 'Ker je ocenjeni korelacijski koeficient pozitiven, lahko ničelno domnevo zavrnemo brez izračuna t-vrednosti'], 0,
    'se(r) = √((1 − r²)/(n − 2)) = √(0,75/16) = 0,2165; t = 0,50/0,2165 = 2,31 > t₀,₀₂₅(16) = 2,12.'),
  Q('(Zgled 2. PP) Korelacija med pokojnino in izdatki za potovanja je 0,50 (n = 18). Katera trditev je NAPAČNA?', [
    'Če se pokojnina poveča za 1 evro, se izdatki za potovanja v povprečju povišajo za 0,50 evra',
    'Ocenjeni regresijski koeficient ima enak predznak kot korelacijski koeficient',
    'Ocena standardne napake korelacijskega koeficienta je 0,2165',
    'Četrtina variabilnosti izdatkov je pojasnjena z variiranjem pokojnine'], 0,
    '0,50 je korelacijski, ne regresijski koeficient; r² = 0,25 = delež pojasnjene variance.'),
  Q('(Zgled 2. PP) ' + AVTOBUSI + ' Ali lahko trdimo, da je iztrošenost v prvem podjetju višja? Kateri domnevi?', [
    'H₀: μ₁ ≤ μ₂; H₁: μ₁ > μ₂', 'H₀: μ_d = 0; H₁: μ_d ≠ 0', 'H₀: μ₁ = μ₂; H₁: μ₁ ≠ μ₂', 'H₀: μ₁ ≥ μ₂; H₁: μ₁ < μ₂'], 0,
    'Neodvisna vzorca (dve podjetji) in enostranska trditev → desnostranski preizkus dveh sredin.'),
  Q('(Zgled 2. PP) ' + AVTOBUSI + ' Vrednost preizkusnega izraza, P-vrednost in sklep?', [
    't = 1,76; P = 0,047; razlika je značilna', 't = 1,76; P = 0,094; razlika ni značilna', 'F = 1,325; P = 0,263; razlika ni značilna', 't = −1,76; P = 0,048; razlika je značilna'], 0,
    'Levene P = 0,263 → enaki varianci → prva vrstica. Enostranski P = 0,094/2 = 0,047 < 0,05.'),
  Q('(Zgled 2. PP) ' + AVTOBUSI + ' Kako razložimo rezultat?', [
    'H₀ zavrnemo pri P = 0,047 in sklenemo, da je povprečna iztrošenost v prvem podjetju večja kot v drugem',
    'P-vrednost je previsoka, zato H₀ ne moremo zavrniti',
    'H₀ zavrnemo pri P = 0,05 in sklenemo, da sta iztrošenosti enaki',
    'Ker pri F-preizkusu nismo odkrili razlik, ne moremo trditi, da je iztrošenost večja'], 0,
    'Levenov F primerja varianci (pogoj za izbiro vrstice), ne sredin.'),
  Q('(Zgled 2. PP) Katera trditev o Levenovem testu je NAPAČNA?', [
    'Vrednost Levenovega testa dobimo tako, da delimo oceno variance prvega podjetja z oceno variance drugega',
    'Z Levenovim testom preizkušamo ničelno domnevo, da sta varianci enaki',
    'Če je pri Levenovem testu razlika značilna, rezultate t-preizkusa beremo v drugi vrstici (Equal variances not assumed)',
    'Vrednost Levenovega testa je vedno pozitivna'], 0,
    'Razmerje varianc je klasični F-preizkus; Levenov test temelji na absolutnih odklonih od sredin in je manj občutljiv na nenormalnost.'),
];
module.exports.forEach((q) => { if (q.q.includes(SMUC)) q.given = G_SMUC; else if (q.q.includes(BUS)) q.given = G_BUS; else if (q.q.includes(GORIVO)) q.given = G_GORIVO; else if (q.q.includes(AVTOBUSI)) q.given = G_AVTOBUSI; });
