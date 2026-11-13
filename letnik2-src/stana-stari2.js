/* Statistična analiza - stari 1. preizkušnji: 15. 11. 2019 (EF Zapiski, fotografija z rešitvami študenta)
   in uradni zgled "Prva PP" (1. 1. 2010, z uradnim ključem odgovorov). Rešitve so preračunane; pri 2019/14 je študent
   napačno prepisal frekvence (pravilno n = 20). Vprašanja, ki so že v kvizu "Iz starih kolokvijev", so izpuščena. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

const tbl = require('./tbl');
const IZPIS_2019 = 'Čas priprave 20 študentov na izpit (v urah) - frekvenčna porazdelitev in varianca sta v računalniškem izpisu (tabela).';
const G_2019 = tbl('Čas priprave (ure)', ['Razred', 'Št. študentov', '%'], [['od 0 do pod 4', 7, '35,0'], ['od 4 do pod 8', 6, '30,0'], ['od 8 do pod 12', 4, '20,0'], ['od 12 do pod 16', 3, '15,0'], ['<b>Skupaj</b>', '<b>20</b>', '<b>100,0</b>']], 'Varianca (vzorčna ocena): 18,989. Povprečje v izpisu ni navedeno.');
const IZPIS_2010 = 'Število zaposlenih z diplomo EF v 100 podjetjih - frekvenčna porazdelitev in opisne statistike so v računalniškem izpisu (tabeli).';
const G_2010 = tbl('Število zaposlenih z EF (n = 100)', ['Razred', 'Frekvenca', '%', 'Kumulativni %'], [['1–5', 12, 12, 12], ['6–10', 15, 15, 27], ['11–15', 15, 15, 42], ['16–20', 32, 32, 74], ['21–25', 18, 18, 92], ['26–30', 8, 8, 100], ['<b>Skupaj</b>', '<b>100</b>', '<b>100</b>', '']])
  + tbl('Statistics', ['N', 'Mean', 'Median', 'Std. Deviation'], [[100, '15,65', '16,30', '7,298']]);
const G_GLED = tbl('Crosstabulation: nogomet (gleda tekme) × spol', ['nogomet', '', 'Moški', 'Ženske', 'Total'],
  [['DA', 'Count', 60, 40, 100], ['', '% within nogomet', '60,0 %', '40,0 %', '100 %'], ['NE', 'Count', 30, 50, 80], ['', '% within nogomet', '37,5 %', '62,5 %', '100 %'], ['<b>Total</b>', 'Count', 90, 90, 180], ['', '% within nogomet', '50,0 %', '50,0 %', '100 %']]);

module.exports = [
  Q('(Preizkušnja 2019) Občina želi oceniti delež izmed 2000 avtomobilov z ustrezno zimsko opremo. Predvidevajo okoli 70 %. Ocena naj od predvidene vrednosti ne odstopa za več kot 10 %, α = 5 %, vzorec brez ponavljanja. Koliko avtomobilov naj izberejo?', [
    'vsaj 153', 'vsaj 165', 'največ 164', '81'], 0,
    'Relativna napaka 10 % od 0,7 → D = 0,07. n₀ = (1,96/0,07)² · 0,7 · 0,3 = 784 · 0,21 = 164,6. Popravek za končno populacijo: n = 164,6/(1 + 164,6/2000) = 152,1 → vsaj 153.'),
  Q('(Preizkušnja 2019) Od 200 izbranih avtomobilov jih ima 150 ustrezno zimsko opremo. Interval zaupanja za odstotni delež pri α = 0,05?', [
    '69 % < Π < 81 %', '70 % < Π < 75 %', '63 % < Π < 77 %', '0,63 < Π < 0,77'], 0,
    'p = 0,75; se(p) = √(0,75 · 0,25/199) ≈ 0,031; 0,75 ± 1,96 · 0,031 → 0,69 do 0,81. (S popravkom za končno populacijo je rezultat enak po zaokroževanju.)'),
  Q('(Preizkušnja 2019) Kaj se zgodi z intervalom zaupanja, če zvišamo stopnjo tveganja?', [
    'Interval se zoži', 'Interval se razširi', 'Stopnja tveganja nima vpliva na širino', 'Vpliv je odvisen od vrednosti na vzorcu'], 0,
    'Višji α → manjši z (npr. 1,64 namesto 1,96) → ožji, a manj zanesljiv interval.'),
  Q('(Preizkušnja 2019) Velikost vzorca povečamo s faktorjem 4 (vzorec je manjši od 10 % populacije). Kaj se zgodi s širino intervala za aritmetično sredino?', [
    'Širina se prepolovi', 'Širina se zoži s faktorjem 4', 'Širina se podvoji', 'Širina se ne spremeni'], 0,
    'se(ȳ) = s/√n; √4 = 2, zato se standardna napaka in širina intervala prepolovita.'),
  Q('(Preizkušnja 2019) Imamo več cenilk za isti parameter. Katera je bolj učinkovita?', [
    'Tista z manjšo standardno napako', 'Tista z večjo standardno napako', 'Tista z manjšo stopnjo tveganja', 'Tista z večjo variabilnostjo ocen'], 0,
    'Učinkovitejša cenilka ima manjšo variabilnost vzorčnih ocen oz. manjšo standardno napako.'),
  Q('(Preizkušnja 2019) Iz seznama osnovnih šol slučajno izberejo 20 % šol, v izbranih šolah pa po 10 % razredov, da ocenijo povprečno število učencev v razredu. Vrsta vzorčenja in elementarna enota?', [
    'Vzorčenje v dveh stopnjah; razred', 'Vzorčenje v skupinicah; učenec', 'Stratificirano vzorčenje; osnovna šola', 'Vzorčenje v dveh stopnjah; učenec'], 0,
    'Izbor poteka v dveh korakih (šola → razred). Opazujemo razred (število učencev v njem), zato je razred elementarna enota.'),
  Q('(Preizkušnja 2019) Študentska komisija ocenjuje okoliške lokale (število jedi, cene kave, sedeži, čistoča). Kaj je enota opazovanja?', [
    'Prehrambeni lokal', 'Študent, ki je član komisije', 'Profil na družbenem omrežju', 'Kava, rogljiček ali sendvič'], 0,
    'Lastnosti (ponudba, cene, sedeži) opazujemo pri lokalu.'),
  Q('(Preizkušnja 2019) Spremenljivka "čistoča" z vrednostmi zelo umazano - umazano - čisto - zelo čisto. Najvišja merska lestvica?', [
    'Urejenostna (ordinalna)', 'Imenska (nominalna)', 'Razmična (intervalna)', 'Razmernostna'], 0,
    'Vrednosti lahko uredimo, razlik med njimi pa ne moremo meriti.'),
  Q('(Preizkušnja 2019) Količina kostanja v merici je normalna z mediano 300 g in KV 0,1. Koliko kostanja vsebuje polovica najbolj povprečnih meric?', [
    'Med 280 in 320 g', 'Med 255 in 345 g', 'Med 285 in 315 g', 'Točno 300 g'], 0,
    'μ = 300, σ = 0,1 · 300 = 30. Srednjih 50 %: μ ± 0,674σ = 300 ± 20 → 280 do 320 g.'),
  Q('(Preizkušnja 2019) Drug kostanjar: Y ~ N(300 g, 50 g). Koliko kostanja vsebuje 20 % največjih meric in kako imenujemo to mejo?', [
    'Vsaj 342 g; osmi decil', 'Največ 258 g; drugi decil', '258 g; osmi decil', 'Vsaj 310 g; četrti kvintil'], 0,
    'F(z) = 0,8 → z = 0,84; y = 300 + 0,84 · 50 = 342 g. Vrednost, pod katero je 80 % meric, je 8. decil.'),
  Q('(Preizkušnja 2019) Y ~ N(300 g, 50 g), en kostanj tehta 10 g. Koliko odstotkov meric vsebuje vsaj 25 kostanjev?', [
    '84 %', '16 %', '68 %', 'skoraj vse'], 0,
    '25 kostanjev = 250 g; z = (250 − 300)/50 = −1; P(Y ≥ 250) = 1 − 0,1587 = 0,8413.'),
  Q('(Preizkušnja 2019) Y ~ N(300 g, 50 g). Koliko odstotkov meric vsebuje natanko 300 g?', [
    '0', '50', 'največ 50', 'vsaj 50'], 0,
    'Pri zvezni spremenljivki je verjetnost posamezne vrednosti enaka nič; pozitivna je le verjetnost intervala.'),
  Q('(Preizkušnja 2019) Zanima nas, koliko časa (v urah) so se študenti pripravljali na preizkušnjo. Kaj je opazovana spremenljivka?', [
    'Čas priprave na preizkušnjo', 'Povprečno število ur priprave', 'Ura', 'Študent'], 0,
    'Študent je enota, ura je merska enota, povprečje je parameter.'),
  Q('(Preizkušnja 2019) ' + IZPIS_2019 + ' Koliko študentov se je pripravljalo vsaj 8 ur?', [
    '35 % študentov', '15 % študentov', '13 študentov', '85 % študentov'], 0,
    'Razreda 8-12 in 12-16: 4 + 3 = 7 od 20 = 35 %.'),
  Q('(Preizkušnja 2019) ' + IZPIS_2019 + ' Čas je normalno porazdeljen, vzorec je majhen glede na populacijo. Interval zaupanja za povprečni čas pri α = 1 %?', [
    '4,1 < μ < 9,1', '4,7 < μ < 8,5', '4 < μ < 8', 'Ocene ni mogoče podati'], 0,
    'ȳ iz razredov: (2·7 + 6·6 + 10·4 + 14·3)/20 = 6,6 ure; s = √18,989 = 4,36; se = 4,36/√20 = 0,974; 6,6 ± 2,58 · 0,974 → 4,1 do 9,1. Povprečje ni izpisano, a ga izračunamo iz sredin razredov.'),
  Q('(Zgled 2010) 180 gledalcev nogometnih tekem: v tabeli Crosstabs je spremenljivka nogomet (ali gleda tekme) v vrsticah (čelo tabele), spol v stolpcih (glava tabele); izračunani so odstotki "% within nogomet". Kaj drži?', [
    'Izračunali smo strukturo po spremenljivki, ki je v glavi tabele', 'Izračunali smo strukturo po obeh spremenljivkah hkrati', 'Mediana za spremenljivko spol je 50 %', 'Med moškimi je 60 % takih, ki gledajo tekme'], 0,
    'Odstotki "within nogomet" v vsaki vrstici razdelijo enote po spolu (glava tabele). Med moškimi gleda 60/90 = 66,7 %; spol je imenska, zato mediana ne obstaja.'),
  Q('(Zgled 2010) Na tekmah reprezentance: nekateri na nobeni, rekorder na 45, porazdelitev izrazito asimetrična v desno. Kaj drži?', [
    'Ocena aritmetične sredine je večja od ocene mediane', 'Porazdelitev je zelo podobna normalni', 'Spremenljivka je zvezna', 'Ocena koeficienta variacije je 45'], 0,
    'Desna asimetrija: Mo < Me < ȳ. Število obiskov je diskretna spremenljivka; vr = 45 − 0 lahko izračunamo.'),
  Q('(Zgled 2010) ' + IZPIS_2010 + ' Katera trditev je pravilna?', [
    'Ocena koeficienta variacije je 0,466', 'V drugem razredu je bilo 27 % podjetij', '92 % podjetij je imelo do vključno 21 zaposlenih z EF', 'Ocena modusa je 16,3'], 0,
    'KV = 7,298/15,65 = 0,466. Drugi razred ima 15 % (27 % je kumulativa), 92 % jih ima do 25 zaposlenih, 16,3 je mediana.'),
  Q('(Zgled 2010) ' + IZPIS_2010 + ' Interval zaupanja za povprečno število zaposlenih z EF pri α = 0,05?', [
    '14,2 < μ < 17,1', '1,3 < μ < 30,0', '14,2 % < Π < 17,1 %', 'ȳ = 15,65'], 0,
    'se = 7,298/√100 = 0,730; 15,65 ± 1,96 · 0,730 → 14,2 do 17,1. Π je delež (ne povprečje), ȳ je točkovna ocena.'),
  Q('(Zgled 2010) Katera trditev o intervalu zaupanja je NAPAČNA?', [
    'α pove verjetnost, da prava vrednost leži znotraj izračunanega intervala', 'Če znižamo α, se poveča vrednost standardizirane spremenljivke', 'Če vzorec povečamo na 4-kratnik, se standardna napaka razpolovi', 'Če zvišamo α, se poveča delež vzorcev z napačnim sklepom'], 0,
    'α je delež vzorcev, pri katerih interval NE zajame prave vrednosti (verjetnost, da je zunaj). Za en izračunan interval ne vemo, ali zajame parameter.'),
];
module.exports.forEach((q) => { if (q.q.includes(IZPIS_2019)) q.given = G_2019; else if (q.q.includes(IZPIS_2010)) q.given = G_2010; else if (q.q.startsWith('(Zgled 2010) 180 gledalcev')) q.given = G_GLED; });
