/* Ekonomika EU in Slovenija - vaje v slogu kolokvija (zgodovina, integracije, prosta trgovina, carine, FTA).
   Primeri in številke so lastni; računske rešitve so preračunane. */
const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });
const CALC = ["Portugalska, olivno olje: Qd = 400 − 2P, Qs = −50 + P (EUR, litri). Ob prosti menjavi je svetovna cena 120 EUR. Kolikšna je neto korist od menjave za Portugalsko?", "Italija, kolesa: Qd = 900 − 2P, Qs = −100 + 2P (tisoč kosov, EUR). Kolo stane 150 EUR na Kitajskem in 170 EUR v Romuniji, MFN carina je 20 %. Italija sklene FTA z Romunijo. Koliko je uvoz po FTA?", "FTA Italija-Romunija (kolesa): pred sporazumom Italija uvozi 280 tisoč koles iz Kitajske (180 EUR s carino), po FTA 320 tisoč iz Romunije (170 EUR). Ali pride do ustvarjanja ali preusmerjanja trgovine?", "FTA Italija-Romunija (kolesa): cena pade s 180 na 170 EUR, Qd z 540 na 560, Qs z 260 na 240 (tisoč); prejšnji uvoz 280 tisoč iz Kitajske (carina 30 EUR/kolo) se preusmeri. Kolikšen je učinek FTA na blaginjo Italije?", "Avstrija porabi za kolut sira 3 ure, za zaboj vina 5 ur; Slovenija za sir 4 ure, za vino 6 ur. Kaj velja po teoriji primerjalnih prednosti?", "Avstrija: sir 3 h, vino 5 h; Slovenija: sir 4 h, vino 6 h. V katerem intervalu se oblikuje menjalno razmerje, da je menjava koristna za obe?", "Slovaška, koruza: S = 3P − 4, D = −P + 20, svetovna cena 4, prosta menjava, majhna država. Kaj drži?", "Slovaška, koruza (S = 3P − 4, D = −P + 20, svetovna cena 4, majhna država) uvede 25 % carino. Kaj drži v primerjavi s prosto menjavo?", "EU, čevlji: S = 10 + 2P, D = 130 − 3P; par stane 10 € v Indiji in 12 € v Turčiji, MFN carina 30 %. EU sklene FTA s Turčijo. Kaj drži?", "FTA EU-Turčija, čevlji: S = 10 + 2P, D = 130 − 3P; pred FTA uvoz 55 iz Indije po 13 € (carina 3 €), po FTA uvoz 60 iz Turčije po 12 €. Kaj drži za učinke FTA?"];

module.exports = [
  Q("Katera trditev o regionalnih trgovinskih sporazumih, ki jih priglasijo pri WTO, drži?", [
    "WTO pozna območja proste trgovine, carinske unije, sporazume o ekonomski integraciji in delne sporazume; najpogostejša so območja proste trgovine", "Carinske unije so najpogostejša oblika sporazumov, ker WTO ne dovoljuje območij proste trgovine", "Delni sporazumi so dovoljeni le med razvitimi državami", "Sporazumi o storitvah (EIA) so prepovedani, dovoljeni so le sporazumi o blagu"], 0,
    "Večina priglašenih sporazumov so območja proste trgovine; carinskih unij je razmeroma malo. Delni sporazumi (enabling clause) so namenjeni državam v razvoju."),
  Q("Portugalska, olivno olje: Qd = 400 − 2P, Qs = −50 + P (EUR, litri). Ob prosti menjavi je svetovna cena 120 EUR. Kolikšna je neto korist od menjave za Portugalsko?", [
    "1.350 EUR", "3.900 EUR", "2.550 EUR", "2.700 EUR"], 0,
    "Avtarkija: 400 − 2P = −50 + P → P = 150, Q = 100. Pri 120: D = 160, S = 70 → uvoz 90. Neto korist = ½ · 90 · 30 = 1.350 EUR (potrošniki +3.900, ponudniki −2.550)."),
  Q("Katera trditev o zgodovini EU in ekonomskih integracijah NE drži?", [
    "EU in ZDA sta sklenili in uveljavili celovit sporazum TTIP", "Pogajanja o TTIP so zastala in sporazum ni bil sklenjen", "ZDA so izstopile iz sporazuma TPP, preostale države so sklenile CPTPP", "EU sklepa vse več dvostranskih sporazumov o prosti trgovini (npr. s Kanado in Japonsko)"], 0,
    "TTIP ni bil nikoli sklenjen. ZDA so leta 2017 izstopile iz TPP; ostalih 11 držav je podpisalo CPTPP."),
  Q("Katera trditev o povojnem obdobju v Evropi drži?", [
    "Marshallov plan je pripeljal do ustanovitve OEEC, v okviru katere je delovala Evropska plačilna unija za večstranski pobot terjatev", "Evropska plačilna unija je izdajala skupno evropsko valuto", "OEEC je bila ustanovljena po podpisu Rimske pogodbe", "Marshallov plan je financirala Sovjetska zveza"], 0,
    "EPU je omogočala mesečni večstranski pobot terjatev in dolgov med članicami OEEC; skupne valute ni izdajala."),
  Q("Italija, kolesa: Qd = 900 − 2P, Qs = −100 + 2P (tisoč kosov, EUR). Kolo stane 150 EUR na Kitajskem in 170 EUR v Romuniji, MFN carina je 20 %. Italija sklene FTA z Romunijo. Koliko je uvoz po FTA?", [
    "320 tisoč koles", "280 tisoč koles", "400 tisoč koles", "40 tisoč koles"], 0,
    "Pred FTA: Kitajska s carino 180 EUR < Romunija 204 EUR → uvoz iz Kitajske pri 180: D = 540, S = 260 → 280. Po FTA je Romunija brez carine 170 EUR: D = 560, S = 240 → uvoz 320 tisoč koles."),
  Q("FTA Italija-Romunija (kolesa): pred sporazumom Italija uvozi 280 tisoč koles iz Kitajske (180 EUR s carino), po FTA 320 tisoč iz Romunije (170 EUR). Ali pride do ustvarjanja ali preusmerjanja trgovine?", [
    "Do obojega: ustvarjanje 40 tisoč, preusmerjanje 280 tisoč koles", "Le do ustvarjanja trgovine 320 tisoč koles", "Le do preusmerjanja 40 tisoč koles", "Do ustvarjanja 280 tisoč in preusmerjanja 40 tisoč koles"], 0,
    "Preusmerjanje: prejšnji uvoz iz cenejše Kitajske (280) zdaj prihaja iz dražje Romunije. Ustvarjanje: dodatni uvoz 320 − 280 = 40 tisoč."),
  Q("FTA Italija-Romunija (kolesa): cena pade s 180 na 170 EUR, Qd z 540 na 560, Qs z 260 na 240 (tisoč); prejšnji uvoz 280 tisoč iz Kitajske (carina 30 EUR/kolo) se preusmeri. Kolikšen je učinek FTA na blaginjo Italije?", [
    "−5,4 mio EUR", "+5,5 mio EUR", "+3,0 mio EUR", "−8,4 mio EUR"], 0,
    "Potrošniki +(540 + 560)/2 · 10 = 5.500 tisoč; ponudniki −(260 + 240)/2 · 10 = 2.500 tisoč; izguba carinskih prihodkov 30 · 280 = 8.400 tisoč. Neto −5.400 tisoč = −5,4 mio EUR: preusmerjanje prevlada."),
  Q("Katera trditev o EFTA in EGP NE drži?", [
    "Švica je kot članica EFTA hkrati tudi članica EGP", "EFTA je bila ustanovljena s Stockholmsko konvencijo leta 1960", "Danes ima EFTA štiri članice: Islandijo, Lihtenštajn, Norveško in Švico", "Islandija, Lihtenštajn in Norveška so prek EGP vključene v notranji trg EU"], 0,
    "Švica je sporazum o EGP na referendumu zavrnila in z EU sodeluje prek dvostranskih sporazumov."),
  Q("Katera trditev o ekonomskih integracijah v Severni Ameriki drži?", [
    "Sporazum USMCA je leta 2020 nadomestil NAFTA in ureja tudi digitalno trgovino", "NAFTA je bila carinska unija s skupno zunanjo carino", "USMCA je skupni trg s prostim pretokom delovne sile", "NAFTA je še vedno v veljavi poleg USMCA"], 0,
    "NAFTA je bila območje proste trgovine (brez skupne zunanje carine). USMCA velja od 1. 7. 2020."),
  Q("Avstrija porabi za kolut sira 3 ure, za zaboj vina 5 ur; Slovenija za sir 4 ure, za vino 6 ur. Kaj velja po teoriji primerjalnih prednosti?", [
    "Avstrija ima absolutno prednost pri obeh, primerjalno pri siru; Slovenija primerjalno pri vinu", "Avstrija ima primerjalno prednost pri obeh dobrinah, zato menjava ni koristna", "Slovenija ima primerjalno prednost pri siru, Avstrija pri vinu", "Brez absolutne prednosti Slovenija ne more izvažati ničesar"], 0,
    "Razmerje ur sir/vino: Avstrija 3/5 = 0,6, Slovenija 4/6 = 0,67 → sir je relativno cenejši v Avstriji. Primerjalno prednost ima vsaka država pri eni dobrini."),
  Q("Avstrija: sir 3 h, vino 5 h; Slovenija: sir 4 h, vino 6 h. V katerem intervalu se oblikuje menjalno razmerje, da je menjava koristna za obe?", [
    "1 sir = med 0,60 in 0,67 vina", "1 sir = med 1,50 in 1,67 vina", "1 sir = med 0,75 in 0,83 vina", "1 sir = točno 1 vino"], 0,
    "Notranji oportunitetni strošek sira: Avstrija 3/5 = 0,6 vina, Slovenija 4/6 = 0,67 vina. Menjalno razmerje mora biti med njima."),
  Q("Kaj je značilno za regionalne trgovinske sporazume v zadnjih desetletjih?", [
    "Postali so prevladujoča oblika trgovinske liberalizacije v svetu", "Njihovo število upada, ker jih nadomešča WTO", "Sklepajo jih skoraj izključno države v razvoju", "Urejajo le trgovino s kmetijskimi proizvodi"], 0,
    "Zaradi zastoja večstranskih pogajanj (Doha) so države vse bolj sklepale regionalne in dvostranske sporazume."),
  Q("Kako se regionalni trgovinski sporazumi skladajo s pravili WTO?", [
    "Odstopajo od načela največjih ugodnosti (MFN), a jih člen XXIV GATT pod pogoji dovoljuje", "So neposredna uporaba načela MFN", "WTO jih v celoti prepoveduje", "Dovoljeni so le, če vključujejo vse članice WTO"], 0,
    "Preferencialna liberalizacija je po definiciji diskriminatorna, zato je potrebna izrecna izjema."),
  Q("Po čem se območje proste trgovine razlikuje od carinske unije?", [
    "V območju proste trgovine ima vsaka članica svojo carino do tretjih držav, zato so potrebna pravila o poreklu", "Carinska unija nima skupne zunanje carine", "Pravila o poreklu so potrebna le v carinski uniji", "V območju proste trgovine carine med članicami ostanejo"], 0,
    "Brez pravil o poreklu bi blago iz tretjih držav vstopalo prek članice z najnižjo carino (trade deflection)."),
  Q("Slovaška, koruza: S = 3P − 4, D = −P + 20, svetovna cena 4, prosta menjava, majhna država. Kaj drži?", [
    "Presežek ponudnikov se zmanjša za 22", "Presežek potrošnikov se poveča za 22", "Uvoz je 14", "Neto korist od menjave je 30"], 0,
    "Avtarkija: P = 6, Q = 14. Pri P = 4: S = 8, D = 16 → uvoz 8. Ponudniki −(14 + 8)/2 · 2 = −22, potrošniki +(14 + 16)/2 · 2 = +30, neto +8."),
  Q("Slovaška, koruza (S = 3P − 4, D = −P + 20, svetovna cena 4, majhna država) uvede 25 % carino. Kaj drži v primerjavi s prosto menjavo?", [
    "Carinski prihodek je 4", "Mrtva izguba je 4", "Uvoz se zmanjša na 8", "Cena na svetovnem trgu pade na 3"], 0,
    "Domača cena 5: S = 11, D = 15 → uvoz 4; carinski prihodek 1 · 4 = 4; mrtva izguba ½ · 1 · 3 + ½ · 1 · 1 = 2. Majhna država ne vpliva na svetovno ceno."),
  Q("Katera stopnja integracije poleg proste trgovine in skupne zunanje carine vključuje še prost pretok storitev in proizvodnih dejavnikov?", [
    "Skupni (notranji) trg", "Carinska unija", "Območje proste trgovine", "Ekonomska in monetarna unija"], 0,
    "FTA → carinska unija (+ skupna zunanja carina) → skupni trg (+ prost pretok dejavnikov) → ekonomska unija (+ usklajene politike) → monetarna unija."),
  Q("EU, čevlji: S = 10 + 2P, D = 130 − 3P; par stane 10 € v Indiji in 12 € v Turčiji, MFN carina 30 %. EU sklene FTA s Turčijo. Kaj drži?", [
    "Pride do preusmerjanja 55 parov iz Indije v Turčijo in ustvarjanja 5 parov", "Pride le do ustvarjanja trgovine 60 parov", "Uvoz se zmanjša, ker so turški čevlji dražji od indijskih", "Nič se ne spremeni, ker Indija ostane najcenejša"], 0,
    "Pred FTA: Indija s carino 13 € < Turčija 15,6 € → P = 13: S = 36, D = 91, uvoz 55. Po FTA: Turčija 12 €: S = 34, D = 94, uvoz 60."),
  Q("FTA EU-Turčija, čevlji: S = 10 + 2P, D = 130 − 3P; pred FTA uvoz 55 iz Indije po 13 € (carina 3 €), po FTA uvoz 60 iz Turčije po 12 €. Kaj drži za učinke FTA?", [
    "Carinski prihodki EU se znižajo za 165 €", "Presežek potrošnikov se zmanjša za 92,5 €", "Neto učinek na blaginjo EU je pozitiven", "Presežek ponudnikov se poveča za 35 €"], 0,
    "Potrošniki +92,5, ponudniki −35, carinski prihodki −165 → neto −107,5 €."),
];

module.exports.forEach((q) => { if (CALC.includes(q.q)) q.calc = true; });
