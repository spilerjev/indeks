/* Statistična analiza - dodatek: Majini zapiski P05 (velikost vzorca, vzorčenja z omejitvami) + V05
   (teden 3.-7. 11. 2026). Vir: ZAPISKI.md, razdelek "Majini zapiski". */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const calc = (arr) => arr.map((q) => ({ ...q, calc: true }));

const teorija = [
  Q('Kako morajo biti oblikovani stratumi pri stratificiranem vzorčenju?', ['Znotraj stratuma čim bolj heterogeni, med stratumi pa čim bolj podobni', 'Znotraj stratuma čim bolj homogeni, med stratumi čim bolj različni (heterogeni)', 'Vsi stratumi enako veliki, enote v njih pa izbrane namerno', 'Stratumi se smejo prekrivati, da je skupni vzorec večji'], 1,
    'Variabilnost znotraj homogenih stratumov je manjša kot v celotni populaciji, zato je se(ȳ_str) manjša in interval ožji kot pri ESV.'),
  Q('Kako morajo biti oblikovane skupinice pri vzorčenju v skupinicah, da je to učinkovito?', ['Skupinice si med seboj podobne, enote znotraj njih pa raznolike', 'Skupinice med seboj različne, enote znotraj njih pa čim bolj podobne', 'Skupinice čim manjše, enote znotraj njih pa izbrane namerno', 'Skupinice oblikovane po proučevani spremenljivki, da so znotraj homogene'], 0,
    'Ravno obratno kot pri stratumih: vsaka skupinica naj bo "mini populacija" (heterogenost na elementarni ravni), skupinice pa si podobne.'),
  Q('Katero vzorčenje je smiselno izvesti vedno, ko je mogoče?', ['Kvotno (npr. po letniku), ker ne potrebuje okvira vzorčenja', 'Stratificirano (npr. po spolu), ker zmanjša standardno napako', 'Sistematično (vsaka k-ta enota), ker je izbor najhitrejši', 'V skupinicah (npr. po društvih), ker je najcenejše'], 1,
    'Stratificiranje pri isti n, N in α da bolj učinkovito cenilko (manjša se) - zahteva pa dodatne informacije za oblikovanje stratumov.'),
  Q('Kako izračunamo povprečje pri stratificiranem vzorčenju?', ['ȳ_str je navadno povprečje vseh vzorčnih vrednosti, uteži niso potrebne', 'ȳ_str je povprečje stratumskih povprečij, tehtano z vzorčnimi n_j/n', 'ȳ_str je tehtano povprečje stratumskih povprečij z utežmi N_j/N, ne navadno povprečje', 'ȳ_str je mediana stratumskih povprečij'], 2,
    'ȳ_str = (1/N) Σ N_j ȳ_j: uteži so velikosti stratumov v populaciji. Od navadnega povprečja se razlikuje, kadar vzorčni deleži po stratumih niso enaki.'),
  Q('Pri določanju velikosti vzorca: na kateri dve veličini NE moremo vplivati, da bi izboljšali natančnost?', ['Na velikost populacije in variabilnost proučevane spremenljivke', 'Na stopnjo tveganja α in velikost vzorca', 'Na stopnjo tveganja α in variabilnost spremenljivke', 'Na velikost vzorca in velikost populacije'], 0,
    'Natančnost D = z · SE je odvisna od α, n, N in variabilnosti; raziskovalec izbira le α in n.'),
  Q('Obrestna mera zraste z 2 % na 3 %. Kakšna je sprememba absolutno in kakšna relativno?', ['1 %; 1 odstotna točka', '1 odstotna točka; 50 %', '50 %; 1 odstotna točka', '1 odstotna točka; 33 %'], 1,
    'Absolutno: 3 − 2 = 1 odstotna točka. Relativno: 1/2 = 50 %. Enako ločimo absolutno (D_p) in relativno (D°_p) natančnost pri velikosti vzorca.'),
  Q('Zakaj nₛ (vzorec s ponavljanjem) ne zaokrožimo, n (brez ponavljanja) pa zaokrožimo navzgor?', ['nₛ je le vmesni rezultat; končni n zaokrožimo navzgor, ker ne sme biti manjši', 'nₛ je že celo število; n zaokrožimo navzgor, ker tako zahteva paket samplingbook', 'nₛ zaokrožimo navzdol, n pa navzgor, da se zaokrožitveni napaki izničita', 'Oba zaokrožimo navzgor, nₛ pa še pomnožimo z velikostjo populacije N'], 0,
    'n = nₛ/(1 + nₛ/N) računamo z nezaokroženim nₛ; "vsaj n" - zahtevano natančnost dosežemo pri n ali več enotah.'),
  Q('Naloga zahteva oceno SPODNJE meje deleža pri tveganju α = 1 %. Kateri z uporabimo pri izračunu velikosti vzorca?', ['z_α/2 = z_0,005 = 2,5758 (dvostransko)', 'z_α = z_0,01 = 2,3263 (enostransko, cela α)', 'z_0,05 = 1,6449', 'z_0,025 = 1,96'], 1,
    'Pri enostranski oceni gre v formulo cela α (ne α/2). Primer 5.2 (potres): zato 8 476 stavb in ne več.'),
  Q('V R-ju računamo velikost vzorca za ENOSTRANSKO oceno pri α = 1 %. Kateri level vpišemo v sample.size.prop in zakaj?', ['level = 0,99 (1 − α), ker R računa enostransko', 'level = 0,995 (1 − α/2), ker R α ne razpolovi', 'level = 0,98 (1 − 2α), ker R α avtomatsko razpolovi', 'level = 0,01, ker R zahteva α in ne stopnje zaupanja'], 2,
    'R uporabi z_(1−level)/2; za cel z_0,01 = 2,3263 moramo vpisati level = 0,98. Potres: sample.size.prop(e = 0.05*0.2, P = 0.2, N = 400000, level = 0.98) → 8476.'),
  Q('Kako v R-ju (paket samplingbook) izračunamo velikost vzorca za delež pri RELATIVNI natančnosti 4 %, Π = 0,21, N = 860 000, α = 5 %?', ['sample.size.prop(e = 0.04, P = 0.21, N = 860000, level = 0.95)', 'sample.size.mean(e = 0.04, S = 0.21, N = 860000, level = 0.95)', 'sample.size.prop(e = 0.04*0.21, P = 0.21, N = 860000, level = 0.95)', 'sample.size.prop(e = 0.21, P = 0.04, N = 860000, level = 0.90)'], 2,
    'e je absolutni odklon zaupanja; pri relativni natančnosti e = D°_p · Π = 0,04 · 0,21 = 0,0084 → 8939 gospodinjstev. Z e = 0.04 (absolutno) dobimo 399.'),
  Q('V čem se dvostopenjsko vzorčenje razlikuje od vzorčenja v skupinicah?', ['Skupinice: izbiramo elementarne enote neposredno; dve stopnji: izbiramo samo skupinice in opazujemo vse enote', 'Skupinice: slučajna izbira le na primarni ravni, nato vse enote; dve stopnji: slučajna izbira tudi na elementarni ravni', 'Dvostopenjsko je neverjetnostno (kvote na vsaki stopnji), v skupinicah pa verjetnostno s slučajnimi števili', 'Razlike ni: pri obeh na vsaki stopnji opazujemo vse enote izbranih primarnih enot'], 1,
    'Gasilci: v skupinicah izberemo društva in popišemo VSE člane; v dveh stopnjah v izbranih društvih slučajno izberemo še del članov. Obe sta verjetnostni.'),
  Q('Kaj velja za stratificirano, skupinsko, večstopenjsko in sistematično vzorčenje v primerjavi s kvotnim?', ['Vsa so neverjetnostna, kvotno je edino verjetnostno', 'Verjetnostni sta le stratificirano in sistematično, ostala tri so neverjetnostna', 'Vsa štiri so verjetnostna (verjetnost izbire enote je znana), kvotno je neverjetnostno', 'Vsa so verjetnostna, tudi kvotno, ker ima enako strukturo kot populacija'], 2,
    'Pri verjetnostnih vzorčenjih znamo povedati, s kakšno verjetnostjo je enota izbrana; pri kvotnem tega ne vemo (namerna izbira), zato ne poznamo porazdelitve ocen.'),
  Q('Če v nalogi ni navedeno, ali je interval enostranski ali dvostranski, kaj naredimo?', ['Enostranski interval z zgornjo mejo (z_α)', 'Dvostranski interval (z_α/2)', 'Enostranski interval s spodnjo mejo (z_α)', 'Izračunamo oba in izberemo ožjega'], 1,
    'Privzeto je dvostranski interval; enostranskega uporabimo le, kadar naloga izrecno išče spodnjo ali zgornjo mejo ("vsaj", "največ").'),
  Q('Kako iz intervala za povprečje pri stratificiranem vzorčenju dobimo interval za vsoto vrednosti (Y_tot)?', ['Obe meji pomnožimo z n pri isti α (14,55–15,45 l → 2 910–3 090 l)', 'Obe meji pomnožimo z N pri isti α (14,55–15,45 l → 873 000–927 000 l)', 'Obe meji delimo z N in pomnožimo s številom stratumov k', 'Vsote iz intervala za povprečje ni mogoče oceniti, potrebujemo nov vzorec'], 1,
    'Y_tot = N · μ, zato Y_str,s = N · ȳ_str,s in Y_str,z = N · ȳ_str,z (ista α). Mleko: 60 000 gospodinjstev.'),
];

const rac = calc([
  Q('Potres (Primer 5.2): N = 400 000 zgradb, pričakovan delež poškodovanih Π = 20 %, ocenjujemo SPODNJO mejo z relativno natančnostjo 5 % pri α = 1 %. Kako velik vzorec brez ponavljanja?', ['nₛ = (2,5758/0,05)² · 0,8/0,2 = 10 616 → n ≈ 10 342', 'nₛ = (2,3263/0,05)² · 0,2/0,8 = 541 → n ≈ 540', 'nₛ = (2,3263/0,05)² · 0,8/0,2 = 8 659 → n ≈ 8 476', 'nₛ = (2,3263 · 0,2/0,05)² = 87 → n ≈ 87'], 2,
    'Spodnja meja → enostransko → cela α: z = 2,3263. nₛ = (z/D°)² · (1 − Π)/Π = 8 659; n = 8 659/(1 + 8 659/400 000) = 8 475,6 → vsaj 8 476 (R: level = 0.98).'),
  Q('Mleko (Primer 4.1, 3 stratumi): 14,55 < μ < 15,45 l pri α = 5 %, N = 60 000 gospodinjstev. Kakšen je interval za skupno mesečno količino kupljenega mleka?', ['873 000 < Y_tot < 927 000 l (meje × N)', '14,55 < Y_tot < 15,45 l (interval je isti)', '2 910 < Y_tot < 3 090 l (meje × n = 200)', '727 500 < Y_tot < 772 500 l (meje × N/1,2)'], 0,
    'Y_tot = N · μ → meji pomnožimo s 60 000: 14,55 · 60 000 = 873 000, 15,45 · 60 000 = 927 000 (profesorica na tabli: 873 243 do 926 877 z nezaokroženimi mejami).'),
  Q('Zabave (V05, nal. 2): študentke N₁ = 450, ȳ₁ = 7,0; študenti N₂ = 280, ȳ₂ = 11,8 obiskov. Kolikšna je stratificirana ocena povprečja?', ['(7 + 11,8)/2 = 9,4', '(450 · 7 + 280 · 11,8)/730 = 8,84', '(90 · 7 + 56 · 11,8)/730 = 1,77', '(450 · 7 + 280 · 11,8)/146 = 44,2'], 1,
    'ȳ_str = Σ N_j ȳ_j / N = (3 150 + 3 304)/730 = 8,84. Uteži so N_j (populacija), imenovalec N = 730.'),
  Q('Zabave: ȳ_str = 8,84, se(ȳ_str) = 0,223, α = 0,05 (ni navedeno, da je enostransko). Kakšen je interval zaupanja?', ['8,47 < μ < 9,21 (enostranski z = 1,645)', '8,62 < μ < 9,06 (z = 1)', '8,40 < μ < 9,28 (dvostranski, z = 1,96)', '8,26 < μ < 9,42 (z = 2,58)'], 2,
    'Če ni napisano, je interval dvostranski: 8,84 ± 1,96 · 0,223 = 8,84 ± 0,44.'),
  Q('Zabave: N₁ = 450, n₁ = 90, s₁² = 5,29; N₂ = 280, n₂ = 56, s₂² = 15,21; N = 730. Kolikšna je standardna napaka se(ȳ_str)?', ['√[450 · 5,29/90 · 360/450 + 280 · 15,21/56 · 224/280]/730 = 0,012', '√(450² · 5,29/90 + 280² · 15,21/56)/730 = 0,250', '√[450² · 5,29/90 · 360/450 + 280² · 15,21/56 · 224/280]/730 = 0,223', '√(5,29/90 + 15,21/56) · (450 + 280)/730 = 0,575'], 2,
    'var(ȳ_str) = (1/N²) Σ N_j² · s_j²/n_j · (N_j − n_j)/N_j = 26 557/532 900 = 0,0498; se = 0,223. Ocene varianc s² so že nepristranske (ne kvadriramo še enkrat).'),
  Q('Kvotno vzorčenje n = 120: letniki v razmerju 3 : 2 : 1, v vsakem letniku M : Ž = 4 : 6. Koliko študentk 2. letnika in koliko študentov 3. letnika je v kvoti?', ['16 študentk 2. letnika; 12 študentov 3. letnika', '36 študentk 2. letnika; 8 študentov 3. letnika', '24 študentk 2. letnika; 20 študentov 3. letnika', '24 študentk 2. letnika; 8 študentov 3. letnika'], 3,
    '2. letnik = 120 · 2/6 = 40 → Ž 60 % = 24; 3. letnik = 20 → M 40 % = 8. Skupaj 48 M in 72 Ž.'),
]);

module.exports = { teorija, rac };
