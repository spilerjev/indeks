// PF1: časovna vrednost, obveznice, delnice - težji napačni odgovori enake dolžine
module.exports = [
  ['Zakaj je denar danes vreden več kot enak znesek čez eno leto?', [
    'Samo zaradi inflacije, ki zmanjšuje kupno moč denarja',
    'Samo zaradi davkov, ki jih plačamo na obresti',
    'Pravzaprav ni vreden več, če je znesek enak'], 3, 'Zaradi potrošnje, oportunitetnega stroška in tveganja z inflacijo'],
  ['Kje na časovni premici ležijo denarni tokovi', [
    'Na začetku obdobij; odtoki so pozitivni',
    'Na sredini obdobij; vsi tokovi so pozitivni',
    'Kjerkoli; predznak ni pomemben'], 3, 'Na koncu obdobij; odtoki negativni, pritoki pozitivni'],
  ['Kaj je pristranskost eksponentne rasti?', [
    'Ljudje precenjujejo inflacijo in se ji preveč izogibajo',
    'Banke pri dolgoročnih posojilih zaračunavajo preveč obresti',
    'Obresti pri navadnem obrestovanju rastejo linearno'], 3, 'Ljudje rast linearizirajo in podcenjujejo obrestovanje'],
  ['Kaj je EAR (efektivna letna obrestna mera)?', [
    'Navedena (nominalna) letna obrestna mera posojila',
    'Obrestna mera po odbitku davka od obresti',
    'Realna obrestna mera po odbitku inflacije'], 3, 'Mera z enkratnim letnim pripisom: (1 + r/m)^m − 1'],
  ['V čem se EOM pri potrošniških posojilih', [
    'Ni razlike, EOM je isto kot EAR',
    'EOM je vedno nižja od nominalne obrestne mere',
    'EOM velja samo za depozite in varčevanje'], 3, 'EOM zajame še stroške, kot sta odobritev in zavarovanje'],
  ['Kaj je proporcionalna in kaj konformna mesečna obrestna mera?', [
    'Proporcionalna (1 + r)^(1/12) − 1; konformna r/12',
    'Obe sta r/12, razlikujeta se le po zaokroževanju',
    'Proporcionalna r · 12; konformna (1 + r)^12 − 1'], 3, 'Proporcionalna r/12; konformna (1 + r)^(1/12) − 1'],
  ['Kje "stoji" vrednost, ki jo da formula za FV anuitete', [
    'FV eno obdobje po zadnjem plačilu; PV ob prvem plačilu',
    'Obe ob prvem plačilu anuitete',
    'Obe ob zadnjem plačilu anuitete'], 3, 'FV ob zadnjem plačilu; PV eno obdobje pred prvim'],
  ['Kaj je obrok posojila z matematičnega vidika?', [
    'Večna renta z enakim zneskom do izteka posojila',
    'Brezkuponska obveznica z dospetjem ob koncu posojila',
    'Navadno obrestovanje glavnice po obrestni meri'], 3, 'Anuiteta: A = PV · r/[1 − (1 + r)⁻ⁿ]'],
  ['Neenaki denarni tokovi (100, 110, 120, 130, 140).', [
    'Da, s povprečnim tokom 120 in n = 5',
    'Da, če dodamo rast tokov',
    'Samo pri diskontni stopnji 10 %'], 3, 'Ne - vsak tok diskontiramo posebej in seštejemo'],
  ['Kako se leta pri iskanju n', [
    'Navzdol, ker se obresti pripisujejo ob koncu leta',
    'Na najbližje celo število po pravilih zaokroževanja',
    'Sploh se ne zaokrožujejo, zapišemo vse decimalke'], 3, 'Nikoli navzdol: 16,24 leta → 16,3 ali 17 let'],
  ['Kako iskanje r (podvojitev v 10 letih)', [
    'Oboje z logaritmom: r = ln 2 / 10',
    'Oboje s korenom: n = 2^(1/r)',
    'r = 72/10, n = ln 2 / ln(1 + r)'], 3, 'r = 2^(1/10) − 1 (koren); n z logaritmom'],
  ['Kaj pove Fisherjeva enačba?', [
    'r_nom = r_real · π',
    'r_real = r_nom + π',
    'r_nom = π − r_real'], 3, '(1 + r_nom) = (1 + r_real)(1 + π)'],
  ['Kako izračunamo perpetuiteto kot limito anuitete?', [
    'n → 0: (1 + r)ⁿ → 1, zato PV → A',
    'r → ∞: faktor PVIFA → 0, zato PV → 0',
    'Perpetuitete ne moremo izpeljati iz anuitete'], 3, 'n → ∞: (1 + r)⁻ⁿ → 0, zato PV → C/r'],
  ['Kako se na vajah priporoča računati z obrestno mero na obdobje?', [
    'Vedno vpisati 0,03/12 neposredno v formulo',
    'Obrestno mero zaokrožiti na eno decimalko',
    'Uporabiti letno mero in spremeniti število obdobij'], 3, 'Najprej izračunati r na obdobje in jo shraniti v kalkulator'],
  ['Cena obveznice je:', [
    'Nominalna vrednost, zmanjšana za kupone',
    'Vsota vseh izplačanih kuponov do zapadlosti',
    'Kupon, deljen s kuponsko obrestno mero'], 3, 'Sedanja vrednost kuponov in glavnice pri zahtevani donosnosti'],
  ['Kdaj se obveznica prodaja s PREMIJO?', [
    'Kupon < zahtevana donosnost (cena pod nominalno)',
    'Kupon = zahtevana donosnost (cena enaka nominalni)',
    'Vedno, kadar ima dolgo zapadlost'], 3, 'Kupon > zahtevana donosnost (cena nad nominalno)'],
  ['Kdaj je tekoča donosnost višja od donosnosti do dospetja?', [
    'Pri obveznici z diskontom, ker ne upošteva dobička ob zapadlosti',
    'Nikoli, ker sta vedno enaki',
    'Pri brezkuponski obveznici'], 3, 'Pri obveznici s premijo, ker ne upošteva izgube premije'],
  ['Kaj je donosnost do dospetja (YTM)?', [
    'Kuponska obrestna mera ob izdaji',
    'Letni kupon, deljen s tržno ceno',
    'Dividendna donosnost izdajatelja'], 3, 'Diskontna stopnja, pri kateri je SV plačil enaka ceni'],
  ['Kdaj se brezkuponska obveznica prodaja pri pozitivni donosnosti?', [
    'S premijo, ker nima kuponov',
    'Po nominalni vrednosti',
    'Brez tržne cene, ker ni kuponov'], 3, 'Z diskontom: donos je razlika do nominalne vrednosti'],
  ['Zakaj ima dolgoročna obveznica z nizkim kuponom', [
    'Ker je kreditno tveganje daljših obveznic večje',
    'Ker ima višjo tekočo donosnost',
    'Ker je dražja od kratkoročnih obveznic'], 3, 'Večina vrednosti je v oddaljeni glavnici, diskontirani z visoko potenco'],
  ['Kaj meri bonitetna ocena?', [
    'Obrestno tveganje obveznice',
    'Likvidnost trga obveznice',
    'Pričakovano inflacijo v državi izdajatelja'], 3, 'Tveganje neplačila (kreditno tveganje)'],
  ['Kaj pomeni razmik do Nemčije (pribitek)?', [
    'Razliko v kuponih med slovenskimi in nemškimi obveznicami',
    'Razliko v zapadlosti med obveznicama',
    'Davčno razliko med državama'], 3, 'Premijo za tveganje države nad nemško donosnostjo'],
  ['Kaj pomeni "čista cena" na tečajnici?', [
    'Cena z vključenim davkom',
    'Cena po odbitku kupona',
    'Cena z natečenimi obrestmi'], 3, 'Cena brez natečenih obresti; kupec jih doplača prodajalcu'],
  ['Kaj je krivulja donosnosti in kaj je obrnjena krivulja?', [
    'Cena glede na kupon; obrnjena = padajoča cena',
    'Dividende v času; obrnjena = padajoče dividende',
    'Inflacija v času; obrnjena = padajoča inflacija'], 3, 'Donosnost po zapadlosti; obrnjena = kratkoročne višje od dolgoročnih'],
  ['Kaj je zelena premija (greenium)?', [
    'Dodatni kupon zelenih obveznic',
    'Davčna olajšava za zelene naložbe',
    'Pribitek za tveganje okoljskih projektov'], 3, 'Majhna nižja donosnost zelenih obveznic'],
  ['Pri obveznici, vezani na trajnostne cilje', [
    'Zmanjša se, ker je izdajatelj kaznovan',
    'Ostane enaka, ker se kupon ne spreminja',
    'Obveznica zapade predčasno'], 3, 'Poveča se, ker se kupon poveča'],
  ['Kaj je bila prva digitalna obveznica Republike Slovenije', [
    'Papirna obveznica z digitalnim certifikatom',
    'Obveznica, ki je plačevala kupone v kriptovalutah',
    'Tokenizirani sklad državnih obveznic'], 3, 'Prva digitalna obveznica države EU na DLT'],
  ['V čem se delnica razlikuje od obveznice?', [
    'Ima kupone in glavnico, ki jih podjetje obljubi',
    'Je vedno varnejša naložba od obveznice',
    'Ne daje glasovalnih pravic delničarju'], 3, 'Dividende niso obljubljene, ni zapadlosti, višja donosnost'],
  ['Iz česa je sestavljena donosnost delnice?', [
    'Samo iz dividend',
    'Samo iz kapitalskega dobička',
    'Iz kupona in glavnice'], 3, 'Iz dividendne donosnosti in kapitalskega dobička'],
  ['Krka izplača dividendo 9,10 € na delnico.', [
    'Zraste za približno 9 €',
    'Ostane približno enak',
    'Pade za več kot 20 €'], 3, 'Pade za približno znesek dividende'],
  ['Kdo dobi dividendo?', [
    'Kdorkoli kupi delnico na dan skupščine',
    'Samo uprava družbe',
    'Kdor kupi delnico po presečnem dnevu'], 3, 'Kdor je vpisan v delniško knjigo na presečni dan'],
  ['Kaj pove višja povprečna donosnost delnic', [
    'Delnice so varnejše od obveznic',
    'Obveznice so slabša naložba',
    'Delnice so odporne na inflacijo'], 3, 'Nadomestilo za večje tveganje'],
  ['Kaj je vrednost delnice po modelu diskontiranih dividend?', [
    'Knjigovodska vrednost lastniškega kapitala na delnico',
    'Čisti dobiček zadnjega leta, deljen s številom delnic',
    'Tržna kapitalizacija, deljena s številom delnic'], 3, 'SV pričakovanih dividend pri zahtevani donosnosti'],
  ['Kaj se zgodi z vrednostjo po Gordonovem modelu, ko se rast g približa rE?', [
    'Pade proti nič',
    'Ostane enaka',
    'Postane negativna'], 3, 'Eksplodira, ker gre imenovalec proti nič'],
  ['Kako ocenimo rast dividend iz zadržanega dobička?', [
    'g = izplačilno razmerje · ROE',
    'g = ROE',
    'g = ROA'], 3, 'g ≈ b · ROE (b = zadržani delež)'],
  ['Kdaj uporabimo sestavljeni model vrednotenja delnice?', [
    'Ko podjetje ne izplačuje dividend',
    'Ko so dividende stalne',
    'Ko vrednotimo obveznice'], 3, 'Ko najprej hitra rast, nato stalna; preostalo vrednost z Gordonom'],
  ['Kako vrednotimo podjetje, ki ne izplačuje dividend?', [
    'Delnica je brez vrednosti, ker ni izplačil',
    'S knjigovodsko vrednostjo lastniškega kapitala',
    'Z obrestno mero na bančni depozit'], 3, 'S celotnimi izplačili ali FCF; lastniški kapital = vrednost − neto dolg'],
  ['Če iz tečaja in dividend obrnemo Gordonov model', [
    'Dividendno razmerje',
    'Donosnost na lastniški kapital (ROE)',
    'Beta koeficient delnice'], 3, 'Zahtevano donosnost: rE = D₁/P₀ + g'],
  ['Na kaj se odziva tečaj delnice?', [
    'Samo na objavljene računovodske rezultate',
    'Samo na izplačane dividende',
    'Na knjigovodsko vrednost kapitala'], 3, 'Na spremembo pričakovanj o denarnih tokovih in tveganju'],
  ['Kaj lahko strojno učenje (Gu, Kelly, Xiu 2020)', [
    'Zamenja koncept sedanje vrednosti',
    'Odpravi tveganje pri vrednotenju',
    'Napove vse tečaje delnic'], 3, 'Izboljša napovedi, logika vrednotenja ostane'],
  ['Kako vplivajo trajnostne preference vlagateljev', [
    'Sploh ne vplivajo na zahtevano donosnost',
    'Vedno povečajo zahtevano donosnost zelenih podjetij',
    'Vplivajo le na obveznice, ne na delnice'], 3, 'Zelena podjetja imajo lahko nižjo zahtevano donosnost'],
];
