/* Ekonomika EU in Slovenija - stara kolokvija 2021 (z uradnim ključem) in 2014 (z rešitvami).
   Vir: EF Zapiski/2. letnik/Ekonomika EU in Slovenija/Kolokvij. Računske naloge so preračunane.
   Izpuščena so vprašanja, ki brez slike niso rešljiva (2021: 3, 10, 11, 15; 2014: 10, 11) in zastarela dejstva (2014: 1). */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const calc = (q) => ({ ...q, calc: true });

module.exports = [
  // ---- Kolokvij 2021
  Q('(Kolokvij 2021) Obkrožite PRAVILNI odgovor.', [
    'WTO pozna FTA, carinsko unijo, ekonomsko-integracijski sporazum (EIA) in delne sporazume; najpogostejši so FTA, carinsko unijo ima EU s Turčijo, San Marinom in Andoro.',
    'Po Kemp-Wanovem teoremu integracije ne zmanjšajo svetovne blaginje, zato tudi pri tretjih državah ne pride do znižanja cene na meji in obsega trgovanja z njimi.',
    'V EU velja ena sama shema splošnih preferencialov, ki enako obravnava vse manj razvite, najmanj razvite in občutljive države koristnice.',
    'WTO je nastala 1995 iz Urugvajske runde; njena pravila sestavljata le GATT in GATS, v Nairobiju 2015 pa so sprejeli TFA in odpravo kmetijskih izvoznih subvencij.',
    'Integracije so po WTO dovoljene, če zunanje carine niso višje od povprečja pred integracijo in obsegajo vsaj 50 % trgovine med partnericami.'], 0,
    'Kemp-Wan: tretje države ostanejo na enaki ravni le, če se zunanje carine prilagodijo - ne pomeni, da cena na meji ne pade. EU ima več shem GSP (GSP, GSP+, EBA). Pravila WTO vključujejo tudi TRIPS. Člen 24 zahteva "bistveno vso" trgovino, ne 50 %.'),
  calc(Q('(Kolokvij 2021) Grčija: Qd = 525 − 1,5P, Qs = −75 + 1,5P (EUR, kg). Prosta menjava, svetovna cena 180 EUR. Neto korist od menjave za Grčijo?', [
    '600 EUR', '300 EUR', '1200 EUR', '4800 EUR'], 0,
    'Avtarkija: 525 − 1,5P = −75 + 1,5P → P = 200. Pri 180: Qd = 255, Qs = 195, uvoz 60. Neto korist = trikotnik ½ · (200 − 180) · 60 = 600 EUR.')),
  Q('(Kolokvij 2021) Obkrožite NEPRAVILNO trditev o zgodovini EU in integracijah.', [
    'Pomemben uspeh EU je sklenitev sporazuma TTIP z ZDA; ZDA so se z azijsko-pacifiško regijo povezale v TPP.',
    'Delorsova komisija je pripravila Maastrichtsko pogodbo, ki določa ustanovitev monetarne unije do leta 1999.',
    'Preferencialno poreklo se ugotavlja po spremembi tarifne številke, po obdelavah in predelavah ter po dodani vrednosti; možna je tudi kumulacija.',
    'EU je novim demokracijam pomagala s programom Phare, a je bila do njihovega članstva zadržana zaradi velikih kmetijskih sektorjev.'], 0,
    'TTIP ni bil nikoli sklenjen (pogajanja so zastala 2016), ZDA pa so iz TPP izstopile 2017.'),
  Q('(Kolokvij 2021) Obkrožite PRAVILNO trditev o zgodovini EU.', [
    'Marshallov plan je privedel do OEEC in Evropske plačilne unije, ki je mesečno multilateralno kompenzirala terjatve in dolgove ter pospeševala trgovino.',
    'ESPJ temelji na federativnem načelu, pogodba je bila podpisana 9. 5. 1952, njen cilj pa je bil postaviti premog in jeklo pod nadzor Nemčije in Francije.',
    'Sporazum o EEA velja od 1994; članice so vse države EU ter Norveška, Islandija, Lihtenštajn in Švica, zajema pa tudi skupno kmetijsko politiko.',
    'Rimska pogodba (1958) določa carinsko unijo, skupni trg in harmonizacijo fiskalne in monetarne politike ter vključuje socialno poglavje.'], 0,
    'ESPJ (Pariška pogodba 1951) je bila nadnacionalna z Visoko oblastjo, ne pod nadzorom dveh držav. Švica ni v EEA, EEA ne zajema skupne kmetijske politike. Rimska pogodba ni predvidela monetarne harmonizacije.'),
  calc(Q('(Kolokvij 2021) Francija: Qd = 50 − 0,6P, Qs = 10 + 0,2P (EUR, mio kosov). Žoga stane 30 EUR v Španiji in 35 EUR na Portugalskem, carina 50 %. Francija sklene FTA s Portugalsko. Koliko je uvoz po FTA?', [
    '12 mio žog', '4 mio žog', '8 mio žog', '16 mio žog'], 0,
    'Pred FTA: Španija + carina = 45 < Portugalska + carina = 52,5 → cena 45, Qd = 23, Qs = 19, uvoz 4. Po FTA: Portugalska brez carine 35 < 45 → cena 35, Qd = 29, Qs = 17, uvoz 12 (vse iz Portugalske).')),
  calc(Q('(Kolokvij 2021) FTA Francija-Portugalska (žoge): pred sporazumom Francija uvozi 4 mio žog iz Španije (45 EUR s carino), po FTA 12 mio žog iz Portugalske (35 EUR). Ali pride do ustvarjanja ali preusmerjanja trgovine?', [
    'Do obojega: ustvarjanje 8 mio, preusmerjanje 4 mio žog', 'Samo do ustvarjanja trgovine v višini 12 mio žog', 'Samo do preusmerjanja trgovine v višini 4 mio žog', 'Do obojega: ustvarjanje 4 mio, preusmerjanje 8 mio žog'], 0,
    'Prejšnji uvoz 4 mio iz Španije se preusmeri na dražjo Portugalsko (preusmerjanje 4). Uvoz se poveča s 4 na 12 (ustvarjanje 8 = 2 manj domače proizvodnje + 6 več potrošnje).')),
  calc(Q('(Kolokvij 2021) FTA Francija-Portugalska (žoge): cena pade s 45 na 35 EUR, Qd z 23 na 29 mio, Qs z 19 na 17 mio; prejšnji uvoz 4 mio iz Španije (carina 15 EUR/žogo) se preusmeri. Učinek FTA na blaginjo Francije?', [
    '+20 mio EUR', '−20 mio EUR', '+80 mio EUR', '−60 mio EUR'], 0,
    'Potrošniki +260 (10 · (23 + 29)/2), proizvajalci −180 (10 · (19 + 17)/2), carinski prihodki −60 (15 · 4). Skupaj +20. Ali: ustvarjanje ½ · 10 · 8 = +40, preusmerjanje (35 − 30) · 4 = −20.')),
  Q('(Kolokvij 2021) Obkrožite NEPRAVILNI odgovor o zgodovini EU.', [
    'EFTA (Stockholmska konvencija 1960) ima danes 3 članice - Norveško, Islandijo in Lihtenštajn, ki so hkrati članice EEA.',
    'Program enotnega trga (Enotni evropski akt) je vključeval odpravo mejnih formalnosti, harmonizacijo DDV, liberalizacijo javnih naročil in kapitala.',
    'Načelo vzajemnega priznavanja proizvodov je nadomestilo harmonizacijo z direktivami in temelji na sodbi Cassis de Dijon.',
    'Baldwinova domino teorija: rast integracije sproži pritisk nečlanic za vstop; Velika Britanija je za vstop prvič zaprosila 1961.'], 0,
    'EFTA ima 4 članice (tudi Švico), Švica pa ni članica EEA.'),
  Q('(Kolokvij 2021) Obkrožite PRAVILNI odgovor o ekonomskih integracijah.', [
    'NAFTA je 1. 7. 2020 nadomestil sporazum USMCA, ki za razliko od NAFTA ureja tudi trgovino z digitalnimi proizvodi.',
    'Mercosur je sporazum o prosti trgovini Brazilije, Argentine, Urugvaja in Paragvaja; EU z njim že ima veljaven trgovinski sporazum.',
    'Unasur v Latinski Ameriki od leta 2011 uspešno deluje brez sprememb, Andska skupnost pa je prostotrgovinsko združenje.',
    'EU ni med pomembnejšimi partnerji ASEAN-a, zato z njim ni začela resnejših pogajanj o sporazumu.'], 0,
    'Mercosur je carinska unija (ne le FTA); 2019 je bil dosežen le politični dogovor. Unasur je razpadel (izstopi 2018-2019). EU je tretji največji partner ASEAN.'),
  calc(Q('(Kolokvij 2021) Italija: čokolada 4 h, bomboni 6 h; Belgija: čokolada 2 h, bomboni 4 h. Kaj velja po teoriji relativnih primerjalnih prednosti?', [
    'Belgija ima absolutno prednost pri obeh, relativno pri čokoladi; Italija relativno pri bombonih', 'Belgija ima absolutno in relativno prednost pri obeh proizvodih, menjave ne bo', 'Italija ima relativno prednost pri čokoladi, Belgija pri bombonih', 'Belgija ima absolutno prednost le pri čokoladi, Italija pri bombonih'], 0,
    'Relativni stroški čokolade (v bombonih): Italija 4/6 = 0,67, Belgija 2/4 = 0,5 → Belgija je relativno cenejša pri čokoladi, Italija pri bombonih (6/4 = 1,5 < 4/2 = 2).')),
  calc(Q('(Kolokvij 2021) Čokolada in bomboni: Italija potrebuje 4 h za čokolado in 6 h za bombone, Belgija 2 h in 4 h. V katerem intervalu se oblikuje menjalno razmerje?', [
    '1 čokolada = med 0,5 in 0,67 bombona', '1 čokolada = med 1,5 in 2 bombona', '1 bombon = med 0,5 in 0,67 čokolade', '1 čokolada = med 2 in 4 bomboni'], 0,
    'MR mora biti med domačima relativnima cenama: v Belgiji 1 C = 0,5 B, v Italiji 1 C = 0,67 B (ekvivalentno 1 B = 1,5 do 2 C).')),
  // ---- Kolokvij 2014
  Q('(Kolokvij 2014) Za ekonomske integracije (RTA) velja:', [
    'V zadnjih 20 letih so RTA prevladujoča oblika trgovinske liberalizacije v svetu',
    'Prevladujejo poglobljene oblike (carinska unija, notranji trg), FTA je precej manj',
    'V svetu je pri WTO prijavljenih manj kot 10 aktivnih integracijskih sporazumov',
    'V njih sodelujejo le razvite države, manj razvite pa le v okviru WTO'], 0,
    'Večina RTA so FTA; pri WTO jih je prijavljenih več sto, sodelujejo tudi manj razvite države.'),
  Q('(Kolokvij 2014) Za WTO in regionalne trgovinske sporazume (RTA) velja:', [
    'RTA kršijo načelo nediskriminacije, a jih člen XXIV pod pogoji izrecno dovoljuje',
    'RTA so skladni z načelom MFN, ker zagotavljajo prosto trgovino, zato jih WTO spodbuja',
    'Cilj WTO je zagotoviti stabilnost deviznih tečajev med članicami',
    'Države ne morejo biti hkrati članice WTO in regionalnih integracij'], 0,
    'Preferenciali za partnerje so izjema od MFN; dovoljeni po členu XXIV GATT (in klavzuli o omogočanju). Stabilnost tečajev je naloga IMF.'),
  Q('(Kolokvij 2014) Za FTA in carinsko unijo (CU) velja:', [
    'Pravila o poreklu v FTA preprečujejo uvoz iz tretjih držav prek partnerice z nižjo carino (trade deflection)',
    'FTA tako kot CU omogoča prost pretok blaga znotraj integracije, ne glede na poreklo blaga',
    'FTA za članice pomeni izgubo suverenosti, saj zahteva sprejem skupne carinske tarife',
    'WTO načeloma dovoljuje le CU, FTA pa le izjemoma'], 0,
    'V FTA vsaka članica ohrani svojo zunanjo carino, zato so potrebna pravila o poreklu. Skupno zunanjo tarifo ima CU.'),
  calc(Q('(Kolokvij 2014) Madžarska, pšenica: S = 4P − 6, D = −2P + 18, svetovna cena 2, prosta menjava, majhna država. Kaj drži?', [
    'Presežek ponudnikov se zmanjša za 12', 'Madžarska uvozi 14 kg pšenice', 'Presežek potrošnikov se poveča za 12', 'Neto korist je 24'], 0,
    'Avtarkija P = 4, Q = 10. Pri P = 2: S = 2, D = 14, uvoz 12. PS: −(2 + 10)/2 · 2 = −12; CS: +(10 + 14)/2 · 2 = +24; neto +12.')),
  calc(Q('(Kolokvij 2014) Carina na pšenico: Madžarska (S = 4P − 6, D = −2P + 18, svetovna cena 2, majhna država) uvede 50 % carino. Kaj drži v primerjavi s prosto menjavo?', [
    'Carinski prihodek je 6', 'Mrtva izguba je 6', 'Potrošnikov presežek se zmanjša za 6', 'Ponudnikov presežek se zmanjša za 13'], 0,
    'P = 3: S = 6, D = 12, uvoz 6 → prihodek 1 · 6 = 6. Mrtva izguba 2 + 2 = 4, CS −13, PS +4.')),
  Q('(Kolokvij 2014) Notranji trg je stopnja integracije, za katero velja:', [
    'Prosta trgovina in skupna zunanja carina, prosta trgovina s storitvami in prost pretok proizvodnih dejavnikov',
    'Prosta trgovina s proizvodi s poreklom iz članic, vsaka članica ima svojo carinsko tarifo',
    'Prost pretok blaga, storitev, kapitala in dela ter harmonizacija vseh ekonomskih politik',
    'Uvedba skupne valute in skupne denarne politike vseh članic'], 0,
    'Drugi odgovor je FTA, tretji ekonomska unija, četrti monetarna unija.'),
  calc(Q('(Kolokvij 2014) EU majice: S = 3 + 4P, D = 52 − 3P; Uganda 3 €, Južna Afrika 4 €, MFN carina 50 %. EU sklene FTA z Južno Afriko. Kaj drži?', [
    'Pride do preusmerjanja trgovine v višini 17,5 majic z Ugande na Južno Afriko', 'Uvoz se poveča s 17,5 na 21, ker cena pade s 6 € na 4 €', 'Preusmerjanja ni, ker se uvaža iz Ugande tudi po sporazumu', 'Cena v EU pade za 3 €, kar povzroči ustvarjanje in preusmerjanje'], 0,
    'Pred FTA: Uganda + carina = 4,5 < JA + carina = 6 → P = 4,5, D = 38,5, S = 21, uvoz 17,5 iz Ugande. Po FTA: JA brez carine 4 < 4,5 → P = 4, uvoz 21 iz JA. Preusmerjanje 17,5, ustvarjanje 3,5.')),
  calc(Q('(Kolokvij 2014) FTA EU-Južna Afrika, majice: S = 3 + 4P, D = 52 − 3P; pred FTA uvoz 17,5 iz Ugande po 4,5 € (carina 1,5 €), po FTA uvoz 21 iz JA po 4 €. Kaj drži za učinke FTA na trgu majic?', [
    'Carinski prihodki EU se znižajo za 26,25 €', 'Blaginja EU se zniža za 5 €', 'Blaginja EU se poveča za 1 €', 'FTA z Ugando bi imel negativne učinke na blaginjo'], 0,
    'Prihodek pred: 1,5 · 17,5 = 26,25 → po 0. Blaginja: CS +19,6, PS −10, carina −26,25 → približno −16,6 €. FTA z Ugando (najcenejšo) bi bil le ustvarjanje trgovine, torej pozitiven.')),
];
