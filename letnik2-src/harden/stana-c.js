// Statistična analiza: težji napačni odgovori, 3. serija (november 2026) - verjetne zamenjave, podobne dolžine.
module.exports = [
  ['Na kateri merski lestvici merimo stopnjo izobrazbe?', [
    'Imenski (nominalni)', 'Razmični (intervalni)', 'Razmernostni (ničla)'], 1, 'Urejenostni (ordinalni)'],
  ['Na kateri lestvici je temperatura v °C?', [
    'Urejenostni (ordinalni)', 'Razmernostni (ničla)', 'Imenski (nominalni)'], 0, 'Razmični (intervalni)'],
  ['Na kateri lestvici je temperatura v kelvinih', [
    'Razmični (intervalni)', 'Urejenostni (ordinalni)', 'Imenski (nominalni)'], 2, 'Razmernostni (ničla)'],
  ['Kateri parameter zahteva RAZMERNOSTNO lestvico?', [
    'Aritmetična sredina', 'Standardni odklon', 'Variacijski razmik'], 3, 'Koeficient variacije'],
  ['Analiza ocene pri SA v odvisnosti od ocene pri OS', [
    'Univariatna', 'Bivariatna', 'Sklepna'], 2, 'Multivariatna'],
  ['Kateri izmed naštetih je RELATIVNA mera variabilnosti?', [
    'Standardni odklon', 'Variacijski razmik', 'Kvartilni odklon'], 1, 'Koeficient variacije'],
  ['ȳ = 30,5 in Me = 25,05, boxplot ima osamelce zgoraj', [
    'Simetrična', 'Asimetrična v levo', 'Sploščena (platikurtična)'], 3, 'Asimetrična v desno'],
  ['Kaj želi profesorica pri zapisu rešitve izračuna na izpitu?', [
    'Končni rezultat in R ukaz, s katerim je bil izračunan',
    'Formulo in rezultat, interpretacija ni potrebna',
    'Vstavljene številke in rezultat, formula ni potrebna'], 2,
    'Formulo, številke, rezultat in interpretacijo z enoto'],
  ['Kaj je f(y) pri zvezni porazdelitvi?', [
    'Verjetnost, da spremenljivka zavzame vrednost y',
    'Kumulativna verjetnost P(Y ≤ y) do vrednosti y',
    'Kvantil porazdelitve pri dani verjetnosti y'], 1,
    'Gostota; verjetnost je ploščina pod krivuljo'],
  ['Kaj je F(y)?', [
    'Gostota verjetnosti pri vrednosti y',
    'Verjetnost P(Y > y), desni rep',
    'Verjetnost P(Y = y), točkovna'], 0, 'Porazdelitvena funkcija P(Y ≤ y)'],
  ['P(Y > b) = ?', ['F(b)', 'F(−b) − 1', 'f(b)'], 2, '1 − F(b)'],
  ['Katera porazdelitev opisuje število uspehov v n poskusih BREZ vračanja?', [
    'Binomska', 'Poissonova', 'Geometrijska'], 1, 'Hipergeometrična'],
  ['Katera trditev o normalni porazdelitvi NI pravilna?', [
    'Določata jo μ in σ',
    'Je simetrična in unimodalna',
    'Ploščina levo od mediane je 0,5'], 3, 'Manjši σ pomeni bolj sploščen zvon'],
  ['Pri normalni porazdelitvi za vrednost a velja F_Y(a) = F_Z(z_a)', [
    'Standardizacija spremeni ploščine pod krivuljo',
    'F_Y je pri normalni porazdelitvi vedno 0,5',
    'Z ima drugačno povprečje in enak σ kot Y'], 3,
    'Ploščine ostanejo enake, zadošča ena tabela'],
  ['Zgled 1. preizkušnje: izbrali so 20 krajev', [
    'Stratificirano', 'Vzorčenje v skupinicah', 'Kvotno vzorčenje'], 2, 'Vzorčenje v več stopnjah'],
  ['Čas študija študentov v preteklem tednu (n = 150, od 0 do 45 ur): porazdelitev', [
    'Porazdelitev je zelo podobna normalni',
    'Ocena koeficienta variacije je 45 ur',
    'Variacijskega razmika ne moremo izračunati'], 3,
    'Ocena povprečja je večja od mediane'],
  ['Košarkarski klub je na pripravah v gorskem letovišču. Za prvo peterko', [
    'Prva peterka', 'Košarkarska ekipa', 'Gorsko letovišče'], 3, 'Posamezen igralec'],
  ['Kaj velja za standardno napako?', [
    'Meri variabilnost spremenljivke med enotami populacije',
    'Za manjše vzorce je manjša kot za večje vzorce',
    'Ocena SE deleža je neodvisna od točkovne ocene p'], 0,
    'Je praviloma manjša od standardnega odklona'],
  ['Delež avtomobilov z zimsko opremo: π ≈ 0,7', [
    'Vsaj 140 avtomobilov', 'Največ 130 avtomobilov', 'Vsaj 81 avtomobilov'], 3, 'Vsaj 131 avtomobilov'],
  ['s = 12,77 in ȳ = 30,47 (tisoč €). Koliko je kv?', [
    '2,39 (≈ 239 %)', '0,24 (≈ 24 %)', '12,77 %'], 1, '0,419 (≈ 42 %)'],
  ['Nogometaši: f₃ = 18, y₃ = 50, ȳ = 40,2', [
    '176,4', '96,04', '1800'], 3, '1728,72'],
  ['Kateri NI razlog za vzorčenje?', [
    'Nižja cena raziskave kot pri popisu',
    'Krajši čas zbiranja in obdelave podatkov',
    'Popolno opazovanje lahko uniči enote'], 1, 'Vzorec je vedno natančnejši od popisa'],
  ['Pri vzorčenju brez ponavljanja iz končne populacije se Var(ȳ) popravi', [
    '(N + n)/N', '(N − 1)/(N − n)', 'n/(N − 1)'], 3, '(N − n)/(N − 1)'],
  ['Kaj je stopnja tveganja α pri intervalni oceni?', [
    'Verjetnost, da izračunani interval zajame parameter',
    'Delež enot populacije, ki leži zunaj intervala',
    'Delež vzorcev, pri katerih interval zajame parameter'], 2,
    'Delež vzorcev, pri katerih interval NE zajame parametra'],
  ['Kako določimo α?', [
    'Izračunamo ga iz vzorčnih podatkov in variance',
    'Odčitamo ga iz širine izračunanega intervala',
    'Je vedno enak 5 %, drugačen ni dovoljen'], 0,
    'Vnaprej ga izbere raziskovalec ali naročnik'],
  ['Kaj se zgodi z intervalom, če znižamo α s 5 % na 1 %?', [
    'Zoži se (z = 1,64 namesto 1,96)',
    'Ostane enak, spremeni se le zaupanje',
    'Premakne se, širina ostane enaka'], 3, 'Razširi se (z = 2,58 namesto 1,96)'],
  ['Naloga sprašuje, koliko je "največ" ljudi proti gradnji', [
    'Dvostranski interval',
    'Enostranski s spodnjo mejo',
    'Točkovna ocena deleža'], 0, 'Enostranski z zgornjo mejo'],
  ['Kako zaokrožujemo meje intervala?', [
    'Navznoter (spodnjo navzgor, zgornjo navzdol)', 'Obe navzgor (spodnjo in zgornjo mejo)', 'Po matematičnih pravilih zaokroževanja'], 3, 'Navzven (spodnjo navzdol, zgornjo navzgor)'],
  ['Kdaj velja predpostavka g ~ N(E(g), SE(g)) za interval?', [
    'Le če je n < 30 in je σ znan',
    'Le če je σ populacije znan',
    'Vedno, ne glede na porazdelitev in n'], 1, 'Če je Y normalna ali n ≥ 100'],
  ['Kaj je √(1 − f) v formuli za se(ȳ)?', [
    'Stopnja zaupanja (f = 1 − α)',
    'Koeficient variacije (f = s/ȳ)',
    'Kritična vrednost (f = z_α/2)'], 2, 'Popravek za končno populacijo (f = n/N)'],
  ['Zakaj pri majhnih vzorcih uporabimo t-porazdelitev namesto Z?', [
    'Ker t da ožje intervale, ko je vzorec majhen',
    'Ker porazdelitev Z za majhne n ne obstaja',
    'Ker je t simetrična, Z pa je asimetrična'], 1,
    'Ker σ ocenimo s s, zato t da širše intervale'],
  ['Velikost vzorca podvojimo (125 → 250)', [
    'Se prepolovi (faktor 2)', 'Se zmanjša za faktor 4', 'Ostane enaka kot prej'], 2, 'Se zmanjša za faktor √2'],
  ['Kaj velja za interval, izračunan na konkretnem vzorcu?', [
    'Z verjetnostjo 1 − α vemo, da zajame parameter',
    'Vedno zajame vzorčno oceno in parameter',
    'Če je α dovolj nizek, vemo, ali zajame parameter'], 0,
    'Ne vemo, ali zajame pravo vrednost parametra'],
  ['Interval za total Y_tot = N·μ dobimo tako, da:', [
    'Meje za μ pomnožimo z n, α ostane enak',
    'Meje za μ delimo z N, α ostane enak',
    'Meje za μ pomnožimo z N, α podvojimo'], 3, 'Meje za μ pomnožimo z N, α ostane enak'],
  ['Kako zmanjšanje standardnega odklona s (450 → 400 €) vpliva na interval?', [
    'Razširi se, ker je s manjši', 'Ostane enak, ker se n ne spremeni', 'Premakne se navzdol'], 1,
    'Zoži se, ker je se manjša'],
  ['Kaj je cenilka za delež Π in kakšna je njena standardna napaka?', [
    'p = n_a/N; se(p) = √(p(1 − p)/N) · √(1 − f)',
    'p = n_a/n; se(p) = √(p/n) · √(1 − f)',
    'p = n_a/n; se(p) = p(1 − p)/n · (1 − f)'], 3,
    'p = n_a/n; se(p) = √(p(1 − p)/n) · √(1 − f)'],
  ['Kaj je TOČNOST ocene?', [
    'Samo natančnost ocene', 'Samo nepristranskost cenilke', 'Ozkost intervala zaupanja'], 0, 'Natančnost + nepristranskost'],
  ['Formule za velikost vzorca dajo nₛ (s ponavljanjem)', [
    'n = nₛ · (1 − nₛ/N), zaokrožimo navzdol',
    'n = nₛ / (1 − nₛ/N), zaokrožimo navzgor',
    'n = nₛ · N / (N + 1), zaokrožimo navzgor'], 3,
    'n = nₛ / (1 + nₛ/N), zaokrožimo navzgor'],
  ['Kaj je stratificirano vzorčenje?', [
    'Izberemo skupinice in v njih opazujemo vse enote',
    'Vzorec sestavimo po kvotah glede na znano strukturo',
    'Iz seznama izberemo vsako s-to enoto po vrsti'], 0,
    'Populacijo razdelimo na homogene stratume, v vsakem ESV'],
  ['Zakaj je stratificirano vzorčenje bolj učinkovito od ESV?', [
    'Ker je cenejše na enoto in ne potrebuje okvira',
    'Ker je pri istih stroških vzorec vedno večji',
    'Ker so razlike med stratumi zanemarljive'], 3,
    'Manjša variabilnost v stratumih → manjša se'],
  ['Kdaj je vzorčenje v skupinicah učinkovito?', [
    'Ko so skupinice med seboj zelo različne, znotraj pa podobne',
    'Ko so enote znotraj posamezne skupinice zelo podobne',
    'Ko je skupinic malo in so po velikosti zelo različne'], 2,
    'Ko so skupinice znotraj raznolike, med seboj podobne'],
  ['Kaj je enota vzorčenja?', [
    'Enota, ki jo dejansko opazujemo in merimo',
    'Vsaka enota populacije, ne glede na izbor',
    'Enota, ki jo izbere anketar po kvoti'], 1,
    'Enota, ki jo izbiramo s slučajnimi števili'],
  ['Kdaj je sistematično vzorčenje pristransko?', [
    'Ko je populacija zelo velika',
    'Ko je delež vzorca f majhen',
    'Ko je seznam urejen po abecedi'], 0, 'Ko se korak ujema s periodo'],
  ['Bistvena pomanjkljivost kvotnega vzorčenja je:', [
    'Visoka cena na anketirano enoto v primerjavi z ESV',
    'Potrebuje popoln seznam vseh enot populacije',
    'Struktura vzorca ni enaka strukturi populacije'], 2,
    'Ni slučajno, zato ne moremo sklepati na populacijo'],
  ['MOL: cena m² zemljišč v mestnih, primestnih in podeželskih', [
    'V skupinicah; seznam vseh območij v MOL',
    'Kvotno; okvir vzorčenja ni potreben',
    'Sistematično; seznam vseh občin v regiji'], 1, 'Stratificirano; seznam zemljišč po stratumih'],
  ['(Preizkušnja 2019) Spremenljivka "čistoča"', [
    'Imenska (nominalna)', 'Razmična (intervalna)', 'Razmernostna (ničla)'], 0, 'Urejenostna (ordinalna)'],
  ['(Zgled 2010) 180 gledalcev', [
    'Izračunali smo strukturo po spremenljivki v čelu tabele',
    'Izračunali smo strukturo po obeh spremenljivkah hkrati',
    'Med moškimi je 60 % takih, ki gledajo tekme'], 2,
    'Izračunali smo strukturo po spremenljivki v glavi tabele'],
  ['(Zgled 2010) Na tekmah reprezentance', [
    'Porazdelitev je zelo podobna normalni',
    'Spremenljivka je zvezna (merjena)',
    'Ocena koeficienta variacije je 45'], 1, 'Povprečje je večje od mediane'],
  ['Kaj je napaka 1. vrste?', [
    'Ne zavrnemo H₀, ki ne velja',
    'Zavrnemo H₁, ki dejansko velja',
    'Ne zavrnemo H₀, ki velja'], 2, 'Zavrnemo H₀, ki dejansko velja'],
  ['Zakaj ob nezavrnitvi ne rečemo "H₀ velja"?', [
    'Ker je stopnja značilnosti α pri preizkusu previsoka',
    'Ker je p-vrednost v tem primeru manjša od α',
    'Ker je ničelna domneva H₀ po definiciji napačna'], 3, 'Ker verjetnosti napake 2. vrste (β) ne poznamo'],
  ['Kako se spremenita α in β, če kritično mejo premaknemo', [
    'Oba se hkrati zmanjšata', 'Oba ostaneta enaka', 'Oba se hkrati povečata'], 1, 'Ko se α zmanjša, se β poveča'],
  ['Kaj je p-vrednost?', [
    'Verjetnost, da ničelna domneva H₀ velja',
    'Verjetnost napake 2. vrste (β) pri preizkusu',
    'Delež vzorcev, ki padejo v območje sprejema'], 0,
    'Najmanjša α, pri kateri bi še zavrnili H₀'],
  ['Kaj so sestavljene domneve?', [
    'Domneve z eno samo vrednostjo v H₀ in H₁',
    'Domneve o dveh parametrih hkrati',
    'Domneve, pri katerih α ni določen'], 3, 'H₁ ima več možnih vrednosti (≠, <, >)'],
  ['Zakaj intervalna ocena ni primerna za majhne vzorce?', [
    'Ker pri majhnih vzorcih nima stopnje tveganja α',
    'Ker je preizkus domnev vedno natančnejši od intervala',
    'Ker iz majhnega vzorca ne moremo izračunati ȳ'], 2,
    'Ker je se velika in ne velja predpostavka normalnosti'],
  ['Koliko stopinj prostosti ima varianca, ocenjena iz vzorca n enot?', [
    'n', 'n − 2', 'n + 1'], 1, 'n − 1'],
  ['Statistično značilen rezultat (nizka p) pomeni:', [
    'Rezultat je vsebinsko in praktično pomemben',
    'Alternativna domneva H₁ zagotovo velja',
    'Verjetnost napake je pri sklepu enaka nič'], 3,
    'Odstopanje od H₀ je značilno, ne nujno pomembno'],
];
