/* Ekonomika EU in Slovenija - vaje v slogu celotnega izpita (institucije, EMU, proračun, integracije, računske naloge).
   Trditve in primeri so napisani na novo; računske rešitve so preračunane. */
const { withId } = require('../ids-lib');   // stalni id vprašanja (CLAUDE.md): ne spreminjaj in ne briši
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const CALC = ["Norveška, losos: Qd = 300 − P, Qs = 60 + ½·P (kg, EUR). Ob prosti menjavi je svetovna cena 200 EUR/kg. Kolikšna je neto korist od mednarodne menjave?", "Češka, pralni stroji: Qd = 3000 − 4P, Qs = −600 + 2P, svetovna cena 450 EUR, carina 20 %. Koliko znaša uvoz s carino?", "Češka, pralni stroji: Qd = 3000 − 4P, Qs = −600 + 2P, svetovna cena 450 EUR, carina 20 % (cena 540). Kolikšna je mrtva izguba zaradi carine?", "Danska v eni uri izdela 4 kolesa ali 9 parov čevljev, Švedska 3 kolesa ali 8 parov čevljev. Kaj sledi po teoriji primerjalnih prednosti?", "Danska (4 kolesa ali 9 parov čevljev na uro) in Švedska (3 kolesa ali 8 parov na uro). V katerem intervalu se oblikuje menjalno razmerje, da menjava poteka?", "Grčija porabi za liter olja 8 ur, za kolut sira 12 ur; Bolgarija za olje 6 ur, za sir 11 ur. Kaj sledi?", "Grčija (olje 8 h, sir 12 h) in Bolgarija (olje 6 h, sir 11 h). V katerem intervalu se oblikuje menjalno razmerje, da menjava poteka?", "Portugalska, olivno olje: Qd = 400 − 2P, Qs = −50 + P. Ob prosti menjavi je svetovna cena 120 EUR. Za koliko se spremeni presežek potrošnikov?", "Slovenija, kavči: Qd = 300 − P, Qs = −60 + 2P (tisoč kosov). Kavč stane 80 EUR na Kitajskem in 90 EUR v Avstriji, carina 25 %. Slovenija sklene FTA z Avstrijo. Kolikšen je uvoz po FTA?", "Slovenija, kavči: pred FTA uvoz 60.000 iz Kitajske (100 EUR s carino), po FTA z Avstrijo 90.000 po 90 EUR. Koliko je ustvarjanja in preusmerjanja trgovine?", "Slovenija, kavči: cena pade s 100 na 90 EUR, Qd 200 → 210, Qs 140 → 120 (tisoč), izguba carin 20 EUR · 60.000. Kolikšen je neto učinek FTA na blaginjo?", "Hrvaška, vino: Qd = 600 − 2P, Qs = −120 + 2P (litri, EUR). Ob prosti menjavi je svetovna cena 200 EUR. Kaj velja?"];

module.exports = [
  withId('q1abyuri', Q("Kaj NE velja za EFTA in njen odnos do EGS?", [
    "V 70. letih EGS in EFTA nista sklenili nobenih medsebojnih trgovinskih sporazumov", "EFTA je bila ustanovljena leta 1960 s Stockholmsko konvencijo", "Danska in Združeno kraljestvo sta leta 1973 iz EFTA prestopili v EGS", "Ustanoviteljice EFTA niso želele nadnacionalnega (federalnega) povezovanja"], 0,
    "Leta 1972-73 so članice EFTA z EGS sklenile dvostranske sporazume o prosti trgovini z industrijskim blagom.")),
  withId('q13eo24h', Q("Kaj NE velja za fiskalno politiko?", [
    "Avtomatski stabilizatorji v recesiji povečajo proračunski presežek", "Ciklično prilagojen primanjkljaj je enak dejanskemu, ko je proizvodna vrzel enaka nič", "Fiskalna politika ima daljše časovne odloge kot monetarna", "Prekomerno zadolževanje ene članice lahko škodi celotnemu evroobmočju"], 0,
    "V recesiji avtomatski stabilizatorji (nižji davki, višji transferji) povečajo PRIMANJKLJAJ in blažijo padec povpraševanja.")),
  withId('qa817za', Q("Norveška, losos: Qd = 300 − P, Qs = 60 + ½·P (kg, EUR). Ob prosti menjavi je svetovna cena 200 EUR/kg. Kolikšna je neto korist od mednarodne menjave?", [
    "1.200 EUR", "2.400 EUR", "6.000 EUR", "4.800 EUR"], 0,
    "Avtarkija: 300 − P = 60 + 0,5P → P = 160, Q = 140. Pri 200: D = 100, S = 160 → izvoz 60. Neto korist = ½ · 60 · 40 = 1.200 EUR (ponudniki +6.000, potrošniki −4.800).")),
  withId('qgr4i0e', Q("Kaj NE velja za načela odločanja v EU?", [
    "Po načelu subsidiarnosti EU ukrepa vedno, kadar je to mogoče", "Raznolike preference državljanov govorijo v prid odločanju na nižji ravni", "Čezmejne eksternalije in ekonomije obsega govorijo v prid odločanju na ravni EU", "Carinska unija in skupna trgovinska politika sta izključni pristojnosti EU"], 0,
    "Subsidiarnost pomeni, da EU ukrepa le, če ciljev ni mogoče zadovoljivo doseči na nacionalni ali nižji ravni.")),
  withId('q1kgvwbu', Q("Kaj NE velja za evropski mehanizem deviznih tečajev (ERM-1)?", [
    "Tečaji so bili popolnoma fiksni, prilagoditve paritet niso bile mogoče", "Temeljil je na paritetni mreži okoli ECU", "Nemška marka je imela vlogo sidra sistema", "Po krizi 1992/93 so dovoljeni razpon nihanja razširili na ±15 %"], 0,
    "V ERM-1 so bile prilagoditve centralnih paritet (re- in devalvacije) mogoče in so se večkrat zgodile.")),
  withId('qtnegs6', Q("Katera trditev o učinkih preferencialne liberalizacije NE drži?", [
    "Ustvarjanje trgovine domači državi vedno zmanjša blaginjo", "Preusmerjanje trgovine pomeni zamenjavo cenejšega uvoza iz tretje države z dražjim iz partnerice", "Neto učinek je lahko pozitiven ali negativen", "Ob preusmerjanju domača država izgubi carinske prihodke"], 0,
    "Ustvarjanje trgovine (nadomestitev dražje domače proizvodnje s cenejšim uvozom) blaginjo POVEČA; preusmerjanje jo zmanjša.")),
  withId('qa33y4', Q("Kaj NE velja za Pakt o stabilnosti in rasti?", [
    "Referenčna vrednost za javni dolg je 3 % BDP", "Referenčna vrednost za proračunski primanjkljaj je 3 % BDP", "Postopek presežnega primanjkljaja lahko vodi tudi do sankcij", "Preventivni del temelji na srednjeročnem proračunskem cilju"], 0,
    "Referenčna vrednost za dolg je 60 % BDP, za primanjkljaj 3 % BDP.")),
  withId('q1c6y4i4', Q("Katera trditev o ekonomski in monetarni uniji drži?", [
    "Evrosistem sestavljajo ECB in nacionalne centralne banke držav z evrom", "Evrosistem sestavljajo ECB in centralne banke vseh članic EU", "ECB vodi tudi fiskalno politiko držav evroobmočja", "Danska je na podlagi izjeme že prevzela evro"], 0,
    "ECB in centralne banke VSEH članic EU sestavljajo Evropski sistem centralnih bank (ESCB); Evrosistem le z državami z evrom.")),
  withId('qxukokk', Q("Katera trditev o prihodkih proračuna EU drži?", [
    "Carine po skupni zunanji tarifi so tradicionalni lastni vir proračuna EU", "Največji vir proračuna EU so carine", "Članice obdržijo vse pobrane carine", "Proračun EU se financira predvsem z davkom na dobiček podjetij"], 0,
    "Največji vir je prispevek na podlagi BND. Članice za stroške pobiranja obdržijo le del carin.")),
  withId('qw6kpud', Q("Kaj velja za reformo Pakta o stabilnosti in rasti iz leta 2011 (šesterček)?", [
    "Uvedla je obrnjeno kvalificirano večino za sprejem predlogov Komisije", "Odpravila je mejo 3 % BDP za primanjkljaj", "Popolnoma je odpravila možnost sankcij", "Velja le za države zunaj evroobmočja"], 0,
    "Z obrnjeno kvalificirano večino predlog Komisije obvelja, razen če ga Svet s kvalificirano večino zavrne - izvajanje je strožje.")),
  withId('qokxff', Q("Katera trditev o uvoznem povpraševanju in izvozni ponudbi NE drži?", [
    "Uvozno povpraševanje domače države s ceno narašča", "V avtarkiji je uvoz enak nič", "Uvozno povpraševanje je razlika med domačim povpraševanjem in ponudbo pod avtarkično ceno", "Svetovna cena se oblikuje, kjer je uvozno povpraševanje enako izvozni ponudbi"], 0,
    "Uvozno povpraševanje s ceno PADA (pri višji ceni je domača ponudba večja in povpraševanje manjše); izvozna ponudba s ceno narašča.")),
  withId('qlikw0r', Q("Češka, pralni stroji: Qd = 3000 − 4P, Qs = −600 + 2P, svetovna cena 450 EUR, carina 20 %. Koliko znaša uvoz s carino?", [
    "360 pralnih strojev", "900 pralnih strojev", "840 pralnih strojev", "480 pralnih strojev"], 0,
    "Cena s carino 540: D = 3000 − 2160 = 840, S = −600 + 1080 = 480 → uvoz 360 (brez carine bi bil 900).")),
  withId('qagxdqv', Q("Češka, pralni stroji: Qd = 3000 − 4P, Qs = −600 + 2P, svetovna cena 450 EUR, carina 20 % (cena 540). Kolikšna je mrtva izguba zaradi carine?", [
    "24.300 EUR", "32.400 EUR", "12.150 EUR", "56.700 EUR"], 0,
    "Proizvodni del ½ · 90 · (480 − 300) = 8.100, potrošni del ½ · 90 · (1200 − 840) = 16.200 → 24.300 EUR. Carinski prihodek je 90 · 360 = 32.400 EUR.")),
  withId('q18llype', Q("Katera trditev o ECB NE drži?", [
    "Glavni cilj ECB je polna zaposlenost", "Glavni cilj ECB je stabilnost cen", "Operacije glavnega refinanciranja so ključni instrument ECB", "Kvantitativno rahljanje je nestandardni ukrep ECB"], 0,
    "Primarni cilj ECB je stabilnost cen; druge cilje EU podpira le, če to ne ogroža stabilnosti cen.")),
  withId('q1qwsd20', Q("Kaj NI eden od kopenhagenskih kriterijev za vstop v EU?", [
    "Da je kandidatka ob vstopu že članica evroobmočja", "Stabilne institucije, ki zagotavljajo demokracijo in pravno državo", "Delujoče tržno gospodarstvo", "Sposobnost prevzema obveznosti članstva"], 0,
    "Kopenhagenski kriteriji (1993): politični, ekonomski in pravni (prevzem pravnega reda). Evro je kasnejši korak.")),
  withId('qyhfch3', Q("Kaj NE velja za ključne dogodke v zgodovini evropskega povezovanja?", [
    "Schumanova deklaracija je bila podpisana v Rimu leta 1957", "Schumanova deklaracija (9. 5. 1950) je predlagala skupno upravljanje premoga in jekla", "Jean Monnet je vodil Visoko oblast ESPJ", "Rimski pogodbi (1957) sta ustanovili EGS in Euratom"], 0,
    "Schumanova deklaracija je bila predstavljena v Parizu 9. 5. 1950; Rimski pogodbi sta iz leta 1957.")),
  withId('qty9rtz', Q("Danska v eni uri izdela 4 kolesa ali 9 parov čevljev, Švedska 3 kolesa ali 8 parov čevljev. Kaj sledi po teoriji primerjalnih prednosti?", [
    "Danska bo izvažala kolesa in uvažala čevlje", "Danska bo izvažala čevlje in uvažala kolesa", "Danska bo izvažala obe dobrini, ker je absolutno učinkovitejša", "Menjava ne bo potekala"], 0,
    "Oportunitetni strošek kolesa: Danska 9/4 = 2,25 para, Švedska 8/3 = 2,67 para → Danska ima primerjalno prednost pri kolesih.")),
  withId('qhpsfaa', Q("Danska (4 kolesa ali 9 parov čevljev na uro) in Švedska (3 kolesa ali 8 parov na uro). V katerem intervalu se oblikuje menjalno razmerje, da menjava poteka?", [
    "2,25 para < MR < 2,67 para za kolo", "0,38 para < MR < 0,44 para za kolo", "3 pari < MR < 4 pari za kolo", "1 par < MR < 2,25 para za kolo"], 0,
    "Za 1 kolo: Danska se odpove 2,25 para, Švedska 2,67 para; menjalno razmerje mora biti med obema oportunitetnima stroškoma.")),
  withId('q1gzuluq', Q("Katera trditev o učinkih povečanja trga zaradi integracije NE drži?", [
    "Večji trg praviloma zviša povprečne stroške podjetij", "Večji trg omogoča prihranke obsega in nižje povprečne stroške", "Integracija okrepi konkurenco in zniža pribitke", "Del podjetij lahko zaradi močnejše konkurence izstopi s trga"], 0,
    "Večji trg omogoča večjo proizvodnjo na podjetje in izkoriščanje ekonomij obsega → nižji povprečni stroški in cene.")),
  withId('q1o37g1n', Q("Delavci se iz države z nizkimi plačami preselijo v državo z višjimi plačami. Kaj velja?", [
    "Izseljenci pridobijo, skupni proizvod obeh držav se poveča", "Plače v ciljni državi se zvišajo", "Plače v izvorni državi se znižajo", "Skupni proizvod obeh držav se zmanjša"], 0,
    "Delo se premakne tja, kjer je njegov mejni produkt višji → skupni proizvod naraste. V ciljni državi plače padejo, v izvorni zrastejo.")),
  withId('q1duwepe', Q("Kaj NE velja za Lizbonsko pogodbo?", [
    "Ohranila je tristebrno strukturo EU", "Uvedla je možnost izstopa iz EU", "Uvedla je dvojno kvalificirano večino v Svetu EU", "EU je pridobila pravno osebnost"], 0,
    "Lizbonska pogodba je odpravila stebre (uvedli jih je Maastricht).")),
  withId('iefbbe73b55', { q: "Članica ustvari 4 % bruto nacionalnega dohodka EU. Kolikšen del vseh prispevkov iz vira na podlagi BND praviloma plača (brez popravkov in rabatov)?",
      options: ["Približno 4 %, ker se vir obračuna po enotni stopnji od BND vsake članice","Enak del kot vsaka druga članica, torej 1/27, ne glede na BND","Toliko, kolikor znašajo carine, ki jih pobere na svoji zunanji meji","Delež, ki je enak njenemu deležu prebivalstva EU, ne glede na BND"],
      correct: 0,
      explanation: "Vir na podlagi BND je izravnalni vir: vse članice plačajo enak odstotek svojega BND, zato je delež prispevka sorazmeren deležu BND. Prinese največji del prihodkov; carine so tradicionalni lastni vir in so ločene od njega." }),
  withId('qkh3vio', Q("Katera trditev o institucijah in pravu EU NE drži?", [
    "Državljanstvo EU je uvedla Lizbonska pogodba", "Državljanstvo EU dopolnjuje nacionalno državljanstvo", "Evropski parlament volijo državljani neposredno", "Svet EU sestavljajo ministri držav članic"], 0,
    "Državljanstvo EU je uvedla Maastrichtska pogodba (1992).")),
  withId('qnvtewt', Q("Katera trditev o začetkih evropskega integriranja drži?", [
    "EGS je bila ustanovljena z Rimsko pogodbo (1957), EFTA pa leta 1960 kot odgovor nanjo", "EFTA je nastala pred EGS", "Rimska pogodba je ustanovila ESPJ", "Združeno kraljestvo je bilo ustanovna članica EGS"], 0,
    "ESPJ je ustanovila Pariška pogodba (1951). Združeno kraljestvo je v EGS vstopilo leta 1973.")),
  withId('q3qorzd', Q("Kaj NE velja za zakonodajo in odločanje v EU?", [
    "Dvojna kvalificirana večina zahteva 65 % članic, ki predstavljajo 55 % prebivalstva", "Dvojna kvalificirana večina zahteva 55 % članic, ki predstavljajo 65 % prebivalstva", "Uredbe veljajo neposredno v vseh članicah", "Direktive je treba prenesti v nacionalni pravni red"], 0,
    "Pravilno: 55 % članic in 65 % prebivalstva; številki sta v prvi trditvi zamenjani.")),
  withId('q1nnmxvn', Q("Majhna država uvede carino na uvozno blago. Katera trditev drži?", [
    "Uvoz se zmanjša, ker domača proizvodnja naraste in potrošnja pade; neto izguba sta trikotnika mrtve izgube", "Svetovna cena pade, zato država s carino vedno pridobi", "Uvoz se poveča zaradi višje domače cene", "Carinski prihodek je enak izgubi potrošnikov"], 0,
    "Pri majhni državi se domača cena zviša za celotno carino. Izguba potrošnikov je večja od dobička proizvajalcev in carinskih prihodkov - razlika sta proizvodni in potrošni trikotnik.")),
  withId('q1jd0nvy', Q("Grčija porabi za liter olja 8 ur, za kolut sira 12 ur; Bolgarija za olje 6 ur, za sir 11 ur. Kaj sledi?", [
    "Bolgarija bo izvažala olje, Grčija sir", "Grčija bo izvažala olje, Bolgarija sir", "Bolgarija bo izvažala obe dobrini", "Menjava ne bo koristna"], 0,
    "Razmerje ur olje/sir: Grčija 8/12 = 0,67, Bolgarija 6/11 = 0,55 → olje je relativno cenejše v Bolgariji, sir v Grčiji.")),
  withId('qzfhd7x', Q("Grčija (olje 8 h, sir 12 h) in Bolgarija (olje 6 h, sir 11 h). V katerem intervalu se oblikuje menjalno razmerje, da menjava poteka?", [
    "0,55 sira < MR < 0,67 sira za liter olja", "1,5 sira < MR < 1,83 sira za liter olja", "0,67 sira < MR < 0,75 sira za liter olja", "Točno 1 sir za liter olja"], 0,
    "Oportunitetni strošek litra olja: Bolgarija 6/11 = 0,55 sira, Grčija 8/12 = 0,67 sira; menjalno razmerje je med njima.")),
  withId('q35zpkj', Q("Katera trditev o pravnih aktih EU NE drži?", [
    "Direktive veljajo neposredno, enako kot uredbe", "Uredbe veljajo neposredno v vseh članicah", "Direktive določajo cilj, način prenosa izberejo članice", "Odločbe zavezujejo tiste, na katere so naslovljene"], 0,
    "Direktive je treba prenesti v nacionalni pravni red; neposredno veljajo uredbe.")),
  withId('q15iisu1', Q("Katera trditev o pravilih WTO za integracije NE drži?", [
    "WTO dovoljuje območje proste trgovine le, če članice carine odpravijo takoj ob podpisu", "Člen XXIV GATT pod pogoji dovoljuje območja proste trgovine in carinske unije", "Sporazum mora zajeti bistveno vso medsebojno trgovino", "Carine je treba odpraviti v razumnem prehodnem obdobju"], 0,
    "Dovoljeno je postopno odpravljanje carin v razumnem roku (praviloma do 10 let).")),
  withId('q8cizys', Q("Katera trditev o zgodovini EU drži?", [
    "Sodba Cassis de Dijon je uveljavila načelo vzajemnega priznavanja", "Vsaka evropska država se lahko pridruži EU brez dodatnih pogojev", "Rimska pogodba ni urejala skupne kmetijske politike", "Enotni evropski akt je uvedel evro"], 0,
    "Izdelek, zakonito proizveden in prodan v eni članici, se sme prodajati tudi v drugih. Enotni evropski akt (1986) je pospešil notranji trg; evro je uvedla Maastrichtska pogodba.")),
  withId('q1btj6ae', Q("Kaj NE velja za fiskalno politiko v evroobmočju?", [
    "Zaradi skupne valute imajo članice vedno enake cikle, zato usklajevanje fiskalnih politik ni potrebno", "Fiskalna politika je glavni nacionalni instrument stabilizacije v EMU", "Pri asimetričnih šokih skupna denarna politika ne ustreza vsem članicam", "Fiskalna pravila omejujejo prelivanje posledic prekomernega zadolževanja"], 0,
    "Cikli se lahko razlikujejo (asimetrični šoki), zato je usklajevanje fiskalnih politik pomembno.")),
  withId('qffb6zj', Q("Majhna država odpravi carino le za partnerico, ki je dražja od tretje države, a z odpravo carine postane najcenejša. Kaj velja za blaginjo?", [
    "Ni enoznačno: ustvarjanje trgovine jo povečuje, preusmerjanje zmanjšuje", "Blaginja se zagotovo poveča", "Blaginja se zagotovo zmanjša", "Blaginja se ne spremeni, ker cena ostane enaka"], 0,
    "Vinerjeva analiza: neto učinek je odvisen od velikosti obeh učinkov (in s tem od cen ter naklonov krivulj).")),
  withId('qbo6r61', Q("Katera trditev o instrumentih ECB drži?", [
    "Obrestni meri za odprto ponudbo mejnega posojila in mejnega depozita tvorita koridor za medbančno obrestno mero", "ECB določa obrestne mere za stanovanjska posojila bank", "ECB kupuje državne obveznice neposredno ob izdaji", "Stopnja obveznih rezerv pri ECB je 50 % vlog"], 0,
    "Glavna obrestna mera je med obema; ECB ne sme neposredno financirati držav (prepoved nakupov na primarnem trgu).")),
  withId('q1ogb7dj', Q("Portugalska, olivno olje: Qd = 400 − 2P, Qs = −50 + P. Ob prosti menjavi je svetovna cena 120 EUR. Za koliko se spremeni presežek potrošnikov?", [
    "Poveča se za 3.900 EUR", "Poveča se za 1.350 EUR", "Zmanjša se za 2.550 EUR", "Poveča se za 2.550 EUR"], 0,
    "Pri 120 je D = 160 (v avtarkiji 100 pri ceni 150): ΔCS = (100 + 160)/2 · 30 = 3.900 EUR. Ponudniki izgubijo 2.550, neto korist 1.350 EUR.")),
  withId('qqbbt1f', Q("Slovenija, kavči: Qd = 300 − P, Qs = −60 + 2P (tisoč kosov). Kavč stane 80 EUR na Kitajskem in 90 EUR v Avstriji, carina 25 %. Slovenija sklene FTA z Avstrijo. Kolikšen je uvoz po FTA?", [
    "90.000 kavčev", "60.000 kavčev", "210.000 kavčev", "30.000 kavčev"], 0,
    "Pred FTA: Kitajska s carino 100 EUR < Avstrija 112,5 → P = 100: D = 200, S = 140, uvoz 60. Po FTA Avstrija 90 EUR: D = 210, S = 120 → uvoz 90 tisoč.")),
  withId('q8t462q', Q("Slovenija, kavči: pred FTA uvoz 60.000 iz Kitajske (100 EUR s carino), po FTA z Avstrijo 90.000 po 90 EUR. Koliko je ustvarjanja in preusmerjanja trgovine?", [
    "Preusmerjanje 60.000 in ustvarjanje 30.000 kavčev", "Ustvarjanje 90.000 kavčev", "Preusmerjanje 30.000 in ustvarjanje 60.000 kavčev", "Le preusmerjanje 90.000 kavčev"], 0,
    "Celoten prejšnji uvoz (60.000) se preusmeri k dražji Avstriji; dodatnih 30.000 je ustvarjanje trgovine.")),
  withId('qotrneo', Q("Slovenija, kavči: cena pade s 100 na 90 EUR, Qd 200 → 210, Qs 140 → 120 (tisoč), izguba carin 20 EUR · 60.000. Kolikšen je neto učinek FTA na blaginjo?", [
    "−450.000 EUR", "+2.050.000 EUR", "+750.000 EUR", "−1.200.000 EUR"], 0,
    "Potrošniki +(200 + 210)/2 · 10 = 2.050 tisoč; ponudniki −(140 + 120)/2 · 10 = 1.300 tisoč; carine −1.200 tisoč → −450.000 EUR.")),
  withId('qw97b1q', Q("Katera trditev o mehanizmih reševanja krize evroobmočja drži?", [
    "EFSF je bil začasni sklad, ki je temeljil na jamstvih držav evroobmočja", "Ob začetku grške krize je EU že imela stalni mehanizem ESM", "ESM je bil ustanovljen pred uvedbo evra", "Program OMT je izvajala Evropska komisija"], 0,
    "Ob grški krizi (2010) stalnega mehanizma ni bilo; EFSF (2010) je nadomestil stalni ESM (2012). OMT je program ECB.")),
  withId('q1mftqvj', Q("Katera trditev o fiskalnem paktu in pravilu dolga drži?", [
    "Država z dolgom nad 60 % BDP mora presežek zmanjševati v povprečju za 1/20 na leto", "Strukturni primanjkljaj ne sme preseči 3 % BDP", "Pravilo dolga velja le za države zunaj evroobmočja", "Država mora dolg nad 60 % BDP odpraviti v enem letu"], 0,
    "Fiskalni pakt omejuje strukturni primanjkljaj na 0,5 % BDP (1 % pri nizkem dolgu); 3 % je meja dejanskega primanjkljaja.")),
  withId('qed9tuo', Q("Kateri pogoj NI eden od kopenhagenskih kriterijev?", [
    "Članstvo v Svetovni trgovinski organizaciji", "Stabilne demokratične institucije in spoštovanje človekovih pravic", "Delujoče tržno gospodarstvo, sposobno prenesti konkurenco", "Sposobnost prevzema pravnega reda EU"], 0,
    "Kopenhagenski kriteriji so politični, ekonomski in pravni; članstvo v WTO ni med njimi.")),
  withId('q4f2ne3', Q("Kateri dve skupini odhodkov sta bili v finančni perspektivi EU 2014-2020 največji?", [
    "Pametna in vključujoča rast ter trajnostna rast in naravni viri", "Uprava ter varnost in državljanstvo", "Globalna Evropa ter uprava", "Varnost in državljanstvo ter globalna Evropa"], 0,
    "Kohezija in konkurenčnost (pametna in vključujoča rast) ter kmetijstvo (trajnostna rast: naravni viri) sta skupaj obsegali večino proračuna.")),
  withId('qu1omc5', Q("Kaj NE velja za denarno politiko ECB?", [
    "ECB stabilnost cen meri z indeksom cen posamezne največje članice", "Stabilnost cen ECB meri s HICP za celotno evroobmočje", "Od leta 2021 je cilj simetričnih 2 % srednjeročno", "Glavni cilj ECB je stabilnost cen"], 0,
    "ECB spremlja harmonizirani indeks cen življenjskih potrebščin (HICP) za evroobmočje kot celoto.")),
  withId('qtqcr7x', Q("Hrvaška, vino: Qd = 600 − 2P, Qs = −120 + 2P (litri, EUR). Ob prosti menjavi je svetovna cena 200 EUR. Kaj velja?", [
    "Hrvaška je izvoznica 80 litrov vina", "Hrvaška je uvoznica 80 litrov vina", "Hrvaška je izvoznica 240 litrov vina", "Hrvaška ne trguje, ker je svetovna cena enaka avtarkični"], 0,
    "Avtarkija: 600 − 2P = −120 + 2P → P = 180, Q = 240. Pri 200: D = 200, S = 280 → izvoz 80 litrov; neto korist ½ · 80 · 20 = 800 EUR.")),
];

module.exports.forEach((q) => { if (CALC.includes(q.q)) q.calc = true; });
