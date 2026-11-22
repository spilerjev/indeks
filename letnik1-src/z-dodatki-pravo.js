/* Pravo družb in poslovno pravo - dodatki: varstvo osebnih podatkov (izpit) in kartice za k1 in k2.
   Javni viri: Uredba (EU) 2016/679 (Splošna uredba o varstvu podatkov), ZVOP-2 (Uradni list RS, št. 163/2022).
   Vprašanja nimajo polja id - dodeli ga gradnja. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const C = (q, options, correct, explanation) => ({ q, options, correct, explanation, calc: true });   // računsko (tu jih ni)
const cards = (arr) => arr.map(([front, back]) => ({ front, back }));

const notesGdpr = `
## Varstvo osebnih podatkov
- **Viri**: Splošna uredba o varstvu podatkov (Uredba (EU) 2016/679, uporablja se od 25. 5. 2018) je neposredno uporabna; **ZVOP-2** (Uradni list RS, št. 163/2022, uporablja se od 26. 1. 2023) jo dopolnjuje, kjer uredba to dopušča.
- **Osebni podatek** je vsaka informacija o določenem ali določljivem posamezniku (ime, e-naslov, IP-naslov, lokacija).
- **Posebne vrste** (9. člen uredbe): zdravje, genetski in biometrični podatki, rasno ali etnično poreklo, politično mnenje, vera, članstvo v sindikatu, spolno življenje. Obdelava je načeloma prepovedana, razen v izrecno naštetih izjemah.

### Načela (5. člen)
- Zakonitost, poštenost in preglednost; omejitev namena; najmanjši obseg podatkov; točnost; omejitev shranjevanja; celovitost in zaupnost.
- **Odgovornost**: upravljavec mora skladnost z načeli tudi **dokazati**.

### Pravne podlage (6. člen)
- Privolitev, izvajanje pogodbe, zakonska obveznost, zaščita življenjskih interesov, javna naloga, zakoniti interes.
- **Privolitev**: prostovoljna, konkretna, informirana in nedvoumna; prekliče se kadarkoli, enako preprosto, kot je bila dana.
- Otrok po ZVOP-2 sam privoli v storitve informacijske družbe od **15. leta**, prej privoli ali odobri starš (uredba sama postavi 16 let in dovoli znižanje do 13).

### Pravice posameznika
- Informiranje (13., 14. člen), dostop (15.), popravek (16.), izbris oziroma pozaba (17.), omejitev obdelave (18.), prenosljivost (20.), ugovor (21.), varstvo pred zgolj avtomatiziranim odločanjem (22.).
- Upravljavec odgovori **v enem mesecu**, ob zahtevnih zadevah rok podaljša za največ dva meseca; odgovor je praviloma brezplačen.

### Upravljavec, obdelovalec in pooblaščena oseba
- **Upravljavec** določi namen in sredstva obdelave; **obdelovalec** obdeluje v njegovem imenu po pisni pogodbi (28. člen). Skupna upravljavca uredita odgovornost z dogovorom (26. člen).
- Evidenca dejavnosti obdelave (30. člen), ocena učinka pri visokem tveganju (35. člen), vgrajeno in privzeto varstvo (25. člen).
- **Pooblaščena oseba (DPO)** je obvezna za javne organe, pri rednem in sistematičnem spremljanju posameznikov v velikem obsegu in pri obsežni obdelavi posebnih vrst. Je neodvisna in je ni mogoče razrešiti zaradi opravljanja njenih nalog.

### Kršitev varnosti
- Upravljavec jo prijavi nadzornemu organu brez nepotrebnega odlašanja, **najpozneje v 72 urah** od seznanitve, razen če ni verjetno tveganje za posameznike (33. člen).
- Ob verjetno **visokem** tveganju obvesti tudi posameznike (34. člen). Obdelovalec o kršitvi takoj obvesti upravljavca.

### Nadzor, globe in prenosi
- **Informacijski pooblaščenec** je samostojen in neodvisen nadzorni organ v Sloveniji; obravnava pritožbe posameznikov (77. člen), izreka ukrepe in globe.
- Upravne globe (83. člen): do **10 mio EUR ali 2 %** svetovnega letnega prometa (obveznosti upravljavca in obdelovalca) ter do **20 mio EUR ali 4 %** (načela, pravne podlage, pravice posameznika, prenosi); upošteva se višji znesek.
- **Prenos v tretje države**: na podlagi sklepa Komisije o ustreznosti (45. člen), ustreznih zaščitnih ukrepov, kot so standardne pogodbene klavzule ali zavezujoča poslovna pravila (46., 47. člen), ali izjemoma po 49. členu (npr. izrecna privolitev).
`;

const gdpr = [
  Q('Spletna trgovina zbira datum rojstva kupcev, čeprav ga za dostavo ne potrebuje. Katero načelo Splošne uredbe o varstvu podatkov krši?', [
    'Načelo točnosti podatkov', 'Načelo omejitve shranjevanja', 'Načelo najmanjšega obsega podatkov', 'Načelo celovitosti in zaupnosti podatkov'], 2,
    'Podatki morajo biti ustrezni, relevantni in omejeni na to, kar je potrebno za namen. Datum rojstva za dostavo ni potreben.'),
  Q('Kaj po Splošni uredbi o varstvu podatkov pomeni načelo odgovornosti?', [
    'Upravljavec mora skladnost z načeli tudi dokazati', 'Obdelovalec v vsakem primeru odgovarja namesto upravljavca', 'Posameznik odgovarja za točnost svojih podatkov', 'Nadzorni organ odgovarja za vsako kršitev na svojem ozemlju'], 0,
    'Po 5. členu je upravljavec odgovoren za spoštovanje načel in mora to spoštovanje dokazati (npr. z evidencami in politikami).'),
  Q('Delodajalec obdeluje številko transakcijskega računa delavca, da mu nakaže plačo. Katera pravna podlaga je najprimernejša?', [
    'Privolitev delavca', 'Zakoniti interes delodajalca', 'Zaščita življenjskih interesov delavca', 'Izvajanje pogodbe o zaposlitvi'], 3,
    'Obdelava je potrebna za izpolnitev pogodbe, katere stranka je posameznik. Privolitev v delovnem razmerju praviloma ni prostovoljna.'),
  Q('Uporabnik je privolil v prejemanje e-novic, zdaj pa privolitev prekliče. Kaj velja?', [
    'Preklic velja šele, ko ga potrdi Informacijski pooblaščenec', 'Preklic je mogoč kadarkoli, obdelava pred preklicem ostane zakonita', 'Preklic učinkuje za nazaj, zato je vsa prejšnja obdelava nezakonita', 'Preklic je mogoč le pisno in z navedbo razloga'], 1,
    'Po 7. členu se privolitev prekliče kadarkoli in enako preprosto, kot je bila dana. Preklic ne vpliva na zakonitost obdelave pred njim.'),
  Q('Koliko mora biti star otrok, da po ZVOP-2 sam veljavno privoli v obdelavo podatkov pri storitvah informacijske družbe (npr. družbeno omrežje)?', [
    'Najmanj 13 let', 'Najmanj 16 let', 'Najmanj 18 let', 'Najmanj 15 let'], 3,
    'Splošna uredba postavi mejo 16 let in državam dovoli znižanje do 13 let. ZVOP-2 jo je določil pri 15 letih; za mlajše privoli ali odobri starš.'),
  Q('Posameznik zahteva kopijo podatkov, ki jih o njem hrani banka. V kakšnem roku mu mora banka praviloma odgovoriti?', [
    'V 8 dneh', 'V enem mesecu', 'V 72 urah', 'V treh mesecih'], 1,
    'Po 12. členu upravljavec odgovori brez nepotrebnega odlašanja, najpozneje v enem mesecu; ob zahtevnih zahtevah rok podaljša za največ dva meseca.'),
  Q('Posameznik želi podatke o svojih nakupih v strojno berljivi obliki prenesti k drugemu ponudniku. Katero pravico uveljavlja?', [
    'Pravico do prenosljivosti podatkov', 'Pravico do omejitve obdelave podatkov', 'Pravico do popravka', 'Pravico do ugovora'], 0,
    'Pravica do prenosljivosti (20. člen) omogoča prejem podatkov v strukturirani, strojno berljivi obliki in njihov prenos drugemu upravljavcu.'),
  Q('Podjetje najame zunanjo računovodsko hišo za obračun plač svojih delavcev. Kakšno vlogo ima računovodska hiša?', [
    'Upravljavec, ker podatke fizično hrani', 'Skupni upravljavec s podjetjem', 'Obdelovalec, ker podatke obdeluje v imenu podjetja', 'Tretja oseba brez obveznosti po uredbi'], 2,
    'Namen in sredstva obdelave določi podjetje (upravljavec), računovodska hiša podatke obdeluje v njegovem imenu po pogodbi iz 28. člena.'),
  Q('Kdaj mora upravljavec po Splošni uredbi o varstvu podatkov imenovati pooblaščeno osebo za varstvo podatkov?', [
    'Ko je javni organ ali v velikem obsegu sistematično spremlja posameznike', 'Ko ima več kot 250 zaposlenih in vodi evidenco dejavnosti obdelave', 'Ko letno obdela osebne podatke več kot 1.000 strank ali jih hrani v oblaku', 'Ko podatke posreduje obdelovalcu'], 0,
    'Po 37. členu je imenovanje obvezno za javne organe, za redno in sistematično spremljanje v velikem obsegu ter za obsežno obdelavo posebnih vrst podatkov. Število zaposlenih ni merilo.'),
  Q('V ponedeljek ob 9. uri podjetje ugotovi, da je napadalec odtujil bazo e-naslovov in gesel strank. Do kdaj mora kršitev najpozneje prijaviti Informacijskemu pooblaščencu?', [
    'Do petka ob 9. uri', 'Do konca naslednjega delovnega dne', 'V 30 dneh', 'Do četrtka ob 9. uri'], 3,
    'Po 33. členu se kršitev prijavi najpozneje v 72 urah od seznanitve: ponedeljek 9.00 + 72 ur = četrtek 9.00. Če je verjetno visoko tveganje za stranke, jih mora obvestiti tudi neposredno (34. člen).'),
  Q('Podjetje obdeluje podatke brez pravne podlage in tako krši 6. člen Splošne uredbe o varstvu podatkov. Kolikšna je najvišja upravna globa?', [
    '10 mio EUR ali 2 % svetovnega letnega prometa, kar je višje', '20 mio EUR ali 4 % prometa v Sloveniji, kar je nižje', '20 mio EUR ali 4 % svetovnega letnega prometa, kar je višje', '10 mio EUR ali 4 % svetovnega letnega prometa, kar je nižje'], 2,
    'Kršitve načel, pravnih podlag, pravic posameznika in prenosov sodijo v višji razred iz 83. člena: do 20 mio EUR ali 4 % celotnega svetovnega letnega prometa, upošteva se višji znesek.'),
  Q('Slovensko podjetje želi podatke strank prenesti ponudniku oblaka v državo zunaj EGP, za katero Komisija ni sprejela sklepa o ustreznosti. Na kateri podlagi je prenos običajno mogoč?', [
    'Na podlagi soglasja Informacijskega pooblaščenca za vsak posamezen prenos', 'Na podlagi standardnih pogodbenih klavzul kot ustreznega zaščitnega ukrepa', 'Na podlagi zakonitega interesa podjetja, brez dodatnih ukrepov', 'Prenos v takšno državo ni mogoč na nobeni podlagi'], 1,
    'Brez sklepa o ustreznosti (45. člen) je prenos mogoč z ustreznimi zaščitnimi ukrepi iz 46. člena, kot so standardne pogodbene klavzule ali zavezujoča poslovna pravila.'),
  Q('Posameznik meni, da trgovec nezakonito obdeluje njegove podatke, trgovec pa se na njegovo zahtevo ne odzove. Na koga se lahko po Splošni uredbi o varstvu podatkov pritoži v Sloveniji?', [
    'Na Varuha človekovih pravic, ki izda zavezujočo odločbo', 'Na Evropsko komisijo kot nadzorni organ EU', 'Na Informacijskega pooblaščenca kot nadzorni organ', 'Na Ustavno sodišče z ustavno pritožbo'], 2,
    'Po 77. členu ima posameznik pravico do pritožbe pri nadzornem organu; v Sloveniji je to Informacijski pooblaščenec, samostojen in neodvisen državni organ.'),
];

const cardsK1 = [
  ['Pravo (definicija)', 'Normativni sistem pravil, ki ga podpira verodostojna grožnja s fizično prisilo proti kršitelju.'],
  ['Common law proti kontinentalnemu pravu', 'Common law: precedensi, porota, sodnik nevtralen. Kontinentalno: obsežni zakoni, sodnik dejavno vodi postopek.'],
  ['Pravna država', 'Država, v kateri je vse delovanje državnih organov vezano na pravo; podpira jo delitev oblasti z zavorami in ravnovesji.'],
  ['Splošnost in abstraktnost pravne norme', 'Splošna: velja za nedoločen krog subjektov (kdor, vsakdo). Abstraktna: ureja tipski dejanski stan, ne posameznega primera.'],
  ['Splošni proti posamičnim pravnim aktom', 'Splošni: ustava, zakon, pravilnik. Posamični: sodba, upravna odločba, pogodba.'],
  ['Uredba vlade proti pravilniku', 'Oba sta podzakonska akta: uredbo izda vlada, pravilnik minister. Ne smeta nasprotovati zakonu.'],
  ['Mesto ratificirane mednarodne pogodbe', 'Po ratifikaciji je nad zakoni, a pod ustavo.'],
  ['Ustavno sodišče RS', 'Ločen organ zunaj rednega sodstva; 9 sodnikov, ki jih izvoli DZ na predlog predsednika republike.'],
  ['Kdo imenuje sodnike rednih sodišč?', 'Državni zbor na predlog Sodnega sveta.'],
  ['Redna proti izrednim pravnim sredstvom', 'Redna (pritožba, ugovor) so mogoča pred pravnomočnostjo. Izredna (revizija, obnova, zahteva za varstvo zakonitosti) šele po njej.'],
  ['Štiri temeljne svoboščine EU', 'Prost pretok blaga, storitev (in ustanavljanja), oseb (delavcev) in kapitala.'],
  ['Primarni viri prava EU', 'Ustanovitvene in pristopne pogodbe (PEU, PDEU), Listina EU o temeljnih pravicah, pogodbe EU s tretjimi državami, splošna pravna načela.'],
  ['Sklep, priporočilo in mnenje (EU)', 'Sklep: zavezujoč za tiste, ki jim je namenjen. Priporočilo in mnenje: nezavezujoča (mehko pravo).'],
  ['Načelo primarnosti prava EU', 'Ob nasprotju ima pravo EU prednost pred nacionalnim pravom; nacionalno sodišče nasprotno nacionalno pravilo ne uporabi.'],
  ['Posest proti imetništvu', 'Posest: dejanska oblast nad stvarjo zase (ni pravica, je pravno varovana). Imetništvo: oblast za drugega, npr. natakar s tujim kozarcem.'],
  ['Superficies solo cedit', 'Načelo enotnosti: zgradba je del zemljišča in deli njegovo pravno usodo.'],
  ['Prenos lastnine na nepremičnini', 'Zavezovalni posel (pogodba) + razpolagalni posel (zemljiškoknjižno dovolilo z overjenim podpisom) + vpis v zemljiško knjigo.'],
  ['Stvarna proti osebni služnosti', 'Stvarna: v korist vsakokratnega lastnika gospodujoče nepremičnine, prehaja z njo. Osebna (užitek, raba, stanovanje): v korist osebe, časovno omejena.'],
  ['Zavezovalni proti razpolagalnemu poslu', 'Zavezovalni ustvari obveznost (npr. prodajna pogodba). Razpolagalni jo izpolni, npr. prenese lastninsko pravico.'],
  ['Poroštvo proti patronatski izjavi', 'Poroštvo: pisna pravno zavezujoča obveznost poroka do upnika. Patronatska izjava: običajno le moralna zaveza matične družbe.'],
];

const cardsK2 = [
  ['Gospodarska družba (ZGD-1)', 'Pravna oseba, ki na trgu samostojno opravlja pridobitno dejavnost.'],
  ['Kdaj družba pridobi pravno osebnost?', 'Z vpisom v sodni register (konstitutiven vpis).'],
  ['Korporacijska upravičenja družbenika', 'Premoženjska (dobiček, likvidacijski delež) in upravljavska (glas, informacije). Družbenik ni lastnik premoženja družbe in ni njen upnik.'],
  ['Osebne proti kapitalskim družbam', 'Osebne: d.n.o., k.d. Kapitalske: d.o.o., d.d., k.d.d., SE. Ključna razlika: odgovornost družbenikov za obveznosti družbe.'],
  ['Ali je s.p. gospodarska družba?', 'Ne. S.p. je fizična oseba, ki opravlja dejavnost, vpiše se v Poslovni register Slovenije in odgovarja z vsem premoženjem.'],
  ['Sedež družbe', 'Kraj (ne natančen naslov), ki ga določi družba in je vpisan v sodni register. Ni del firme.'],
  ['Trojna funkcija osnovnega kapitala', 'Določa deleže družbenikov, zagotovi sredstva za začetek poslovanja in je jamstvo upnikom.'],
  ['Konkurenčna prepoved po ZGD-1 (zavezanci)', 'Družbeniki d.n.o., komplementarji, družbeniki in poslovodje d.o.o., člani uprave, UO in NS d.d., prokuristi. Sankcija: odškodnina.'],
  ['Konkurenčna klavzula (delovno pravo)', 'Dogovor, da delavec po prenehanju delovnega razmerja ne konkurira delodajalcu; največ 2 leti.'],
  ['Preoblikovanje s.p. v d.o.o.', 'Univerzalno pravno nasledstvo; za stare obveznosti podjetnik še odgovarja subsidiarno in solidarno z vsem premoženjem.'],
  ['Dvojna družba', 'Osebna družba (npr. k.d.), v kateri so vsi komplementarji kapitalske družbe, zato nobena fizična oseba ne odgovarja neomejeno.'],
  ['Kaducitetni postopek', 'Družbenik d.o.o., ki kljub pozivu ne vplača vložka, izgubi poslovni delež in že vplačane zneske.'],
  ['Izstop in izključitev družbenika d.o.o.', 'Na podlagi družbene pogodbe ali s tožbo iz utemeljenih razlogov; izstopni družbenik dobi plačilo vrednosti deleža.'],
  ['Enoosebna d.o.o.', 'En družbenik; namesto pogodbe akt o ustanovitvi, sklepe vpisuje v knjigo sklepov.'],
  ['Prepoved prikritih izplačil', 'Družbenikom se sme izplačati le bilančni dobiček ali znesek ob zmanjšanju OK; drugačna izplačila (npr. nakup nad tržno ceno) so prepovedana.'],
  ['Vinkulacija', 'Omejitev prenosa poslovnega deleža ali imenskih delnic, npr. soglasje družbe. Javna d.d. delnic ne sme vinkulirati.'],
  ['Statutarna strogost (d.d.)', 'Statut sme od zakona odstopati le, kjer ZGD-1 to izrecno dovoli.'],
  ['Nominalne proti kosovnim delnicam', 'Nominalna ima znesek na delnici (vsaj 1 EUR). Kosovna nima zneska, vsaka predstavlja enak del OK (OK / število delnic).'],
  ['Prisilna likvidacija', 'Postopek prenehanja, ki ga začne sodišče po uradni dolžnosti, ne na podlagi sklepa družbenikov.'],
  ['Zakonita licenca proti prosti uporabi (ZASP)', 'Zakonita licenca: uporaba brez dovoljenja, a proti plačilu. Prosta uporaba: brez dovoljenja in brez plačila (npr. zasebna raba).'],
];

module.exports = {
  id: 'pravo',
  notesGdpr,
  parts: [
    {
      id: 'izpit',
      decks: [{ id: 'pi-gdpr', name: 'Varstvo osebnih podatkov (GDPR in ZVOP-2)', questions: gdpr }],
      appendNotesMd: notesGdpr,   // kratki zapiski o varstvu osebnih podatkov na koncu zapiskov izpita
    },
    { id: 'k1', flashcards: [{ id: 'fc-pravo-k1', name: 'Pravoznanstvo, EU, stvarno in obligacijsko pravo', cards: cards(cardsK1) }] },
    { id: 'k2', flashcards: [{ id: 'fc-pravo-k2', name: 'Družbe, prenehanje in intelektualna lastnina', cards: cards(cardsK2) }] },
  ],
};
