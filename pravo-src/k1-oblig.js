// Pravo - 1. kolokvij - Deck 4: Obligacijsko pravo
module.exports = {
  id: "pk1-oblig",
  name: "Obligacijsko pravo",
  questions: [
    {
      q: "Kaj ureja obligacijsko pravo?",
      options: [
        "Razmerja pripadnosti in oblasti na stvareh",
        "Obveznostna razmerja: ena stranka je zavezana nekaj storiti, opustiti ali dopustiti, druga je upravičena zahtevati izpolnitev",
        "Statusna vprašanja pravnih oseb",
        "Kazniva dejanja in sankcije"
      ],
      correct: 1,
      explanation: "Obligacijsko pravo ureja obveznostna razmerja med pravnimi subjekti. Deli se na pogodbeno in odškodninsko pravo. Temeljni predpis je Obligacijski zakonik (OZ)."
    },
    {
      type: "match",
      q: "Poveži temeljno načelo obligacijskega prava z vsebino.",
      pairs: [
        { term: "Načelo dispozitivnosti", def: "Stranki lahko določita svoja pravila; če jih ne, veljajo pravila OZ" },
        { term: "Prosto urejanje razmerij", def: "Udeleženci svobodno urejajo obligacijska razmerja, a ne v nasprotju z ustavo, prisilnimi predpisi ali moralo" },
        { term: "Vestnost in poštenje", def: "Upoštevanje posamičnih in skupnih interesov ter pošteno ravnanje" },
        { term: "Dolžnost izpolnitve", def: "Prevzete obveznosti je treba spoštovati in izpolniti, sicer dolžnik odgovarja upniku" }
      ],
      explanation: "Za strokovnjake velja še skrbnost dobrega strokovnjaka (ravnati morajo, kot bi ravnal skrben strokovnjak), za ostale skrbnost dobrega gospodarstvenika."
    },
    {
      q: "Kakšna je razlika med dispozitivno in kogentno pravno normo?",
      options: [
        "Dispozitivna velja samo v gospodarskem pravu, kogentna v civilnem",
        "Pri dispozitivni se stranke lahko dogovorijo drugače, kot določa zakon; kogentna velja prisilno - samo tako, kot pravi zakon",
        "Kogentne norme veljajo samo za državo",
        "Razlike ni"
      ],
      correct: 1,
      explanation: "Dispozitivna norma: stranke se lahko dogovorijo drugače (značilno za obligacije in notranja razmerja v družbah). Kogentna (prisilna) norma: velja samo, kar pravi zakon - drugačen dogovor ni mogoč."
    },
    {
      q: "Na katerih pravnih temeljih lahko nastane obligacijsko razmerje?",
      options: [
        "Samo na podlagi pogodbe",
        "Pogodba, enostranski pravni posli, povzročitev škode in neupravičena pridobitev",
        "Samo na podlagi zakona ali sodne odločbe",
        "Dedovanje, priposestvovanje in najdba"
      ],
      correct: 1,
      explanation: "Štirje temelji: pogodba (dvostranski posel, soglasje), enostranski pravni posli (javna obljuba nagrade, ponudba), povzročitev škode (oškodovanec zahteva povrnitev) in neupravičena pridobitev (korist brez veljavne podlage)."
    },
    {
      q: "Kakšna je razlika med zavezovalnim in razpolagalnim pravnim poslom?",
      options: [
        "Zavezovalni povzroči nastanek obveznosti; razpolagalni je druga faza, s katero upravičenec dobi stvar oziroma premoženjsko pravico",
        "Razpolagalni je vedno pisen, zavezovalni usten",
        "Zavezovalni sklene prodajalec, razpolagalni kupec",
        "Gre za sinonima"
      ],
      correct: 0,
      explanation: "Zavezovalni posel (npr. prodajna pogodba) povzroči nastanek/prenehanje obligacijskih pravic in obveznosti. Razpolagalni posel je druga faza - pravno dejanje, s katerim upravičenec dobi stvar ali pravico (npr. izročitev, vpis v ZK). Lastnina preide, ko je razpolagalni posel končan v vseh sestavinah."
    },
    {
      q: "Kdaj fizična oseba pridobi pravno in kdaj poslovno sposobnost?",
      options: [
        "Obe z rojstvom",
        "Pravno sposobnost z rojstvom, poslovno sposobnost pri 18 letih (delno pri 15)",
        "Pravno pri 15, poslovno pri 18 letih",
        "Obe pri 18 letih"
      ],
      correct: 1,
      explanation: "Pravna sposobnost (biti nosilec pravic in obveznosti): fizične osebe z rojstvom, pravne osebe z registracijo/vpisom v register. Poslovna sposobnost (sklepati pravne posle): pri 18 letih, delna pri 15. Kazenska odgovornost nastopi pri 14 letih.",
      more: "Delno poslovno sposobni ne morejo sklepati poslov, ki bi pomembno vplivali na njihovo življenje (velja tudi za osebe z motnjami ali opite). Posel 10-letnika bi bil ničen."
    },
    {
      q: "Kdaj je pogodba sklenjena?",
      options: [
        "Ko jo podpišeta obe stranki pri notarju",
        "Ko se stranki sporazumeta o bistvenih sestavinah pogodbe (soglasje volj)",
        "Ko je izpolnjena prva obveznost",
        "Ko jo potrdi sodišče"
      ],
      correct: 1,
      explanation: "Pogodba je sklenjena, ko stranki dosežeta soglasje volj o bistvenih sestavinah. Volja mora biti svobodno izražena - brez sile, grožnje ali prevare. Praviloma oblika ni predpisana (izjeme: npr. prodaja nepremičnine pisno, nekatere pogodbe notarski zapis)."
    },
    {
      q: "Ali so pogajanja pred sklenitvijo pogodbe zavezujoča?",
      options: [
        "Da, stranka pogajanj ne sme prekiniti",
        "Ne - vsaka stranka jih lahko prekine; odgovarja pa za škodo, če od pogajanj odstopi neupravičeno",
        "Da, če trajajo več kot mesec dni",
        "Ne, in odškodninska odgovornost nikoli ne nastane"
      ],
      correct: 1,
      explanation: "Pogajanja niso zavezujoča, edina obveznost je vestnost in poštenost. Kdor od pogajanj odstopi neupravičeno, odgovarja za škodo (dejanske stroške, ne izgubljenega dobička). Z opravičljivim razlogom lahko stranka odstopi brez odgovornosti."
    },
    {
      q: "Kaj velja za ponudbo?",
      options: [
        "Ponudnik jo lahko kadarkoli prekliče",
        "Ponudba zavezuje ponudnika; preklic učinkuje le, če naslovnik prejme preklic, preden prejme ponudbo",
        "Ponudba brez roka veljavnosti ne velja",
        "Molk naslovnika vedno pomeni sprejem ponudbe"
      ],
      correct: 1,
      explanation: "Ponudba zavezuje ponudnika - ne more je preklicati, umakniti ali od nje odstopiti (razen če preklic prispe pred ponudbo ali hkrati z njo). Pogodba je sklenjena, ko ponudnik prejme izjavo naslovnika o sprejemu. Molk NE pomeni sprejema, razen pri stalni poslovni vezi.",
      hint: "Praktični nasvet z vaj: v ponudbi vedno napiši, do kdaj velja - sicer lahko velja 'za skos'."
    },
    {
      q: "Kaj je predpogodba?",
      options: [
        "Nezavezujoče pismo o nameri",
        "Pogodba, s katero se stranka zaveže, da bo kasneje sklenjena glavna pogodba; stranki zavezuje in mora vsebovati bistvene sestavine glavne pogodbe",
        "Osnutek pogodbe brez pravnih učinkov",
        "Pogodba, sklenjena pod odložnim pogojem"
      ],
      correct: 1,
      explanation: "Predpogodba je zavezujoča in mora vsebovati bistvene sestavine glavne pogodbe. Spada v predpogodbeno fazo skupaj z zbiranjem informacij, pogajanji, pismom o nameri in dajanjem ponudb."
    },
    {
      q: "Katere predpostavke morajo biti izpolnjene za veljavnost pogodbe?",
      options: [
        "Samo podpis obeh strank",
        "Pravna in poslovna sposobnost strank, soglasje volj, možen/dopusten/določen ali določljiv predmet, dopustna poslovna podlaga in ustrezna oblika, kadar jo zakon zahteva",
        "Notarska overitev in plačilo davka",
        "Pisna oblika in dve priči"
      ],
      correct: 1,
      explanation: "Predpostavke veljavnosti: sposobnost strank, soglasje volj, predmet (možen, dopusten, določen/določljiv), dopustna podlaga (kavza) in oblika, kadar jo zakon določa. Predmet je nedopusten, če nasprotuje ustavi, prisilnim predpisom ali morali."
    },
    {
      q: "Kdaj govorimo o zmoti, kdaj o nesporazumu in kdaj o simuliranem pravnem poslu?",
      options: [
        "Zmota = enostranska napaka volje; nesporazum = obojestranska; simuliran posel = zavestno neskladje med voljo in izjavo",
        "Zmota = zavestna napaka; nesporazum = enostranska; simuliran posel = obojestranska",
        "Vsi trije pojmi so sinonimi za prevaro",
        "Zmota in nesporazum sta kaznivi dejanji, simulacija ne"
      ],
      correct: 0,
      explanation: "Napake volje (neskladje izjavljene in prave volje): zmota = enostranska nezavedna napaka (tudi pri prevari gre za zmoto, ki jo povzroči druga stranka); nesporazum = obojestranski; simuliran (navidezen) pravni posel = stranki zavestno izjavita nekaj drugega, kot v resnici hočeta - med strankama je ničen."
    },
    {
      q: "Kakšna je razlika med ničnostjo in izpodbojnostjo pogodbe?",
      options: [
        "Ničnost je absolutna neveljavnost (pogodba nasprotuje ustavi, prisilnim predpisom, morali) in nima učinkov; izpodbojna pogodba učinkuje, dokler se ne izpodbije",
        "Nična pogodba velja, dokler je sodišče ne razveljavi; izpodbojna nikoli ne velja",
        "Ničnost velja samo pri gospodarskih pogodbah",
        "Izpodbojnost je strožja sankcija od ničnosti"
      ],
      correct: 0,
      explanation: "Ničnost = absolutna neveljavnost (nasprotovanje ustavi, prisilnim predpisom, morali); pogodba nima učinkov (za nazaj). Izpodbojnost = relativna neveljavnost; pogodba povzroča učinke, dokler je upravičenec ne izpodbije (npr. pogodba, sklenjena pod utemeljeno grožnjo, v zmoti).",
      more: "Primer z vaj: pogodba o 'zanositvi s sosedom' je nemoralna - sodišče se z njo sploh ne ukvarja, je nična. Pogodba pod grožnjo je izpodbojna, če je grožnja nedopustna in strah utemeljen; legalna grožnja, povezana z obveznostjo (prijava na FURS zaradi neplačevanja davkov), ni nujno nedopustna."
    },
    {
      q: "Kateri so pogoji za nastanek odškodninske obveznosti?",
      options: [
        "Nedopustno škodljivo dejstvo, nastanek škode, vzročna zveza in odškodninska odgovornost",
        "Pogodba, zamuda, opomin in obresti",
        "Samo nastanek škode",
        "Naklep, obsodba in kazen"
      ],
      correct: 0,
      explanation: "Štirje pogoji: (1) nedopustno škodljivo dejstvo, (2) škoda, (3) vzročna zveza med dejstvom in škodo, (4) odškodninska odgovornost. Velja adekvatna vzročnost: upoštevajo se le posledice, ki po življenjski izkušnji niso povsem izredne. Namen: povrnitev škode + spodbude za preprečevanje."
    },
    {
      q: "Katera sredstva utrjujejo obveznosti STVARNO in katera OSEBNO?",
      options: [
        "Stvarna: ara, zastavna in pridržna pravica; osebna: poroštvo, pogodbena kazen, odstopnina",
        "Stvarna: poroštvo in kazen; osebna: ara in hipoteka",
        "Vsa sredstva so osebna",
        "Stvarna: menica in ček; osebna: hipoteka"
      ],
      correct: 0,
      explanation: "Stvarna utrditev: ara, zastavna pravica, pridržna pravica. Osebna utrditev: poroštvo, pogodbena kazen, odstopnina. Poleg tega še: zamudne obresti, avans, bančna garancija, menica, izvršnica."
    },
    {
      q: "Kaj je ara?",
      options: [
        "Denarni znesek, ki ga ob sklenitvi pogodbe ena stranka izroči drugi v znamenje, da je pogodba sklenjena",
        "Plačilo celotne kupnine vnaprej",
        "Obresti za zamudo pri plačilu",
        "Zavarovanje, ki ga izda banka"
      ],
      correct: 0,
      explanation: "Ara zagotavlja pogodbeno disciplino. Če je za razvezo kriva stranka, ki je aro dala, jo izgubi (druga stranka lahko zahteva tudi izpolnitev in povrnitev škode); če je kriva stranka, ki je aro prejela, lahko druga zahteva vrnitev DVOJNE are (ali izpolnitev in povrnitev škode). Ob izpolnitvi se ara vračuna ali vrne. Brez posebnega dogovora ara NE daje pravice do odstopa; če je dogovorjena pravica odstopa, se ara šteje za odstopnino."
    },
    {
      q: "Kaj velja za pogodbeno kazen?",
      options: [
        "Upnik jo lahko zahteva samo do višine dejanske škode",
        "Je dogovorjen denarni znesek ali premoženjska korist za primer neizpolnitve ali zamude; upnik jo lahko zahteva, tudi če presega nastalo škodo",
        "Določi jo sodišče po prostem preudarku",
        "Dovoljena je samo v gospodarskih pogodbah"
      ],
      correct: 1,
      explanation: "Pogodbena kazen je s pogodbo določen znesek/korist, ki jo dolžnik plača ob neizpolnitvi ali zamudi (če ni določeno drugače, velja za zamudo). Upnik jo lahko zahteva, tudi če presega nastalo škodo."
    },
    {
      q: "Kakšna je razlika med poroštvom in patronatsko izjavo?",
      options: [
        "Poroštvo je pravno formalna (pisna) zaveza poroka izpolniti dolžnikovo obveznost; patronatska izjava je le častna/moralna zaveza brez pravne obveznosti",
        "Patronatska izjava je strožja od poroštva",
        "Poroštvo je ustni dogovor, patronatska izjava pisni",
        "Gre za isti institut z različnima imenoma"
      ],
      correct: 0,
      explanation: "Poroštvo: porok se zaveže upniku izpolniti veljavno in zapadlo obveznost dolžnika, če je ta ne izpolni; mora biti pisno; porokova obveznost ne sme biti večja od dolžnikove. Patronatska izjava: le častna (moralna, nepravna) zaveza izdajatelja."
    },
    {
      q: "Kaj je bančna garancija?",
      options: [
        "Poroštvo banke, vezano na veljavnost osnovne pogodbe",
        "Nepreklicna obveza banke, da bo ob predložitvi ustrezne pisne zahteve upravičencu plačala do zneska iz garancije - je abstraktno zavarovanje",
        "Kredit z ugodno obrestno mero",
        "Zavarovanje vloge do 100.000 EUR"
      ],
      correct: 1,
      explanation: "Bančna garancija je nepreklicno jamstvo banke, da bo ob predložitvi pisne zahteve v skladu z garancijskimi pogoji plačala zahtevani znesek do višine iz garancije. Je ABSTRAKTNO zavarovanje - neodvisno od osnovnega posla."
    },
    {
      q: "Kakšna je razlika med trasirano in lastno menico?",
      options: [
        "Pri trasirani izdajatelj (trasant) pozove trasata, da plača upniku (remitentu); pri lastni se izdajatelj sam zaveže plačati",
        "Lastna menica se glasi na prinosnika, trasirana na ime",
        "Trasirana menica ni prenosljiva",
        "Razlika je samo v roku plačila"
      ],
      correct: 0,
      explanation: "Trasirana menica: trasant pozove drugo osebo (trasata), naj plača meničnemu upniku (remitentu). Lastna menica: izdajatelj se sam zaveže plačati ('obljuba plačila', podobna zadolžnici). Menica je individualni vrednostni papir; uporablja se kot zavarovanje, kreditno in plačilno sredstvo."
    },
    {
      q: "Katera trditev o izvršnici je pravilna?",
      options: [
        "Lahko jo izda vsak potrošnik za zavarovanje kredita",
        "Je neprenosljiva listina z izjavo dolžnika (gospodarski subjekt ali javni organ), ki je izvršilni naslov in omogoča poplačilo brez sodne poti",
        "Je enaka menici in prosto prenosljiva",
        "Uporablja se lahko tudi pri finančnih pogodbah bank"
      ],
      correct: 1,
      explanation: "Izvršnica (ZPreZP-1, 2012, proti plačilni nedisciplini): dolžnik in upnik sta lahko SAMO gospodarska subjekta ali javni organ; le pri dobavi blaga/storitev (NE pri finančnih pogodbah). Je izvršilni naslov (več kot menica, ki je verodostojna listina), NI prenosljiva, vsebuje nepreklicno pooblastilo za plačilo v breme dolžnikovih računov pri bankah."
    },
    {
      q: "Kdaj lahko stranka zahteva razvezo pogodbe zaradi spremenjenih okoliščin?",
      options: [
        "Kadarkoli si premisli",
        "Če se okoliščine po sklenitvi pogodbe tako spremenijo, da otežijo izpolnitev ene stranke; zahteva jo stranka, katere izpolnitev je otežena",
        "Če so okoliščine nastale pred sklenitvijo pogodbe",
        "Samo ob soglasju obeh strank"
      ],
      correct: 1,
      explanation: "Institut spremenjenih okoliščin (rebus sic stantibus) je izjema od načela pacta sunt servanda (pogodbe je treba spoštovati). Pogoji: okoliščine otežijo izpolnitev, nastanejo PO sklenitvi, razvezo zahteva prizadeta stranka. Na okoliščine, nastale pred sklenitvijo, se ni mogoče sklicevati; prav tako ne po že opravljeni izpolnitvi.",
      more: "Primeri z vaj: covid ali vojna (skok cen materialov) so spremenjene okoliščine; redne spremembe občinskih načrtov niso. Razlika od višje sile: pri višji sili izpolnitev fizično NI mogoča (naravne nesreče), pri spremenjenih okoliščinah je mogoča, a ni več ekonomsko smiselna."
    },
    {
      q: "Kateri so pogoji za veljavno pobotanje (kompenzacijo)?",
      options: [
        "Terjatvi morata biti vzajemni, istovrstni, zapadli, iztožljivi in likvidni; izražena mora biti volja",
        "Zadostuje, da sta terjatvi denarni",
        "Pobotanje odredi sodišče po uradni dolžnosti",
        "Terjatvi morata biti enako visoki"
      ],
      correct: 0,
      explanation: "Pobot: vzajemnost (isti stranki sta si medsebojno upnik in dolžnik), istovrstnost (npr. obe denarni), zapadlost, iztožljivost (zastarelih terjatev ni mogoče pobotati), likvidnost (nesporna, določena terjatev) + izjava volje. Terjatve tretje osebe ni mogoče pobotati.",
      wrong: {
        3: "Višini ni treba biti enaki - pobotata se do višine nižje terjatve, razlika ostane."
      }
    },
    {
      q: "Kdaj nastopi dolžnikova zamuda in kaj so zamudne obresti?",
      options: [
        "Zamuda nastopi ob izteku roka oziroma ko upnik pozove dolžnika; zamudne obresti (8 % letno) plača dolžnik poleg glavnice pri denarnih obveznostih",
        "Zamuda nastopi šele s tožbo; obresti določi sodišče",
        "Zamuda nastopi ob sklenitvi pogodbe",
        "Zamudne obresti so kazen, ki jo izreče inšpektor"
      ],
      correct: 0,
      explanation: "Dolžnik zamudi, ko ob zapadlosti ne izpolni; če rok ni določen, ko ga upnik pozove. Dolžnik mora povrniti tudi škodo. Pri denarnih obveznostih tečejo zamudne obresti (8 % letni pribitek). Če zamudi upnik, preneha zamuda dolžnika (in nehajo teči obresti); breme naključnega uničenja preide na stranko v zamudi."
    },
    {
      q: "Kaj sta nemožnost izpolnitve in višja sila?",
      options: [
        "Nemožnost je trajno stanje, ki prepreči izpolnitev: če obstaja že ob sklenitvi, je pogodba nična; če nastane zaradi višje sile, obveznost preneha",
        "Nemožnost izpolnitve vedno pomeni odškodninsko odgovornost dolžnika",
        "Višja sila je vsaka sprememba cen na trgu",
        "Pri višji sili mora dolžnik vseeno izpolniti pogodbo"
      ],
      correct: 0,
      explanation: "Nemožnost ob sklenitvi = ničnost; naknadna nemožnost zaradi višje sile = prenehanje obveznosti (brez odškodninske odgovornosti - stranka, kriva za ničnost, pa mora drugi povrniti škodo). Višja sila = dogodek izven našega vpliva (naravne nesreče); spremembe na trgu so 'le' spremenjene okoliščine.",
      more: "Primer z vaj: študentka zaradi operacije fizično ni mogla na izpit - sodišče je priznalo višjo silo in ji ni bilo treba vrniti štipendije."
    },
    {
      q: "Katera je bistvena sestavina prodajne pogodbe?",
      options: [
        "Cena",
        "Določitev stvari (cena ni bistvena sestavina - mora biti le določljiva)",
        "Rok izročitve",
        "Pisna oblika"
      ],
      correct: 1,
      explanation: "V vseh pravnih sistemih je bistvena sestavina prodajne pogodbe določitev STVARI; cena ni bistvena (mora biti določljiva). Prodajalec se zavezuje stvar izročiti tako, da kupec pridobi lastninsko pravico, kupec pa plačati kupnino. Če kupnine ni, je to darilna pogodba; če je namesto kupnine nekaj drugega, menjalna pogodba."
    },
    {
      q: "V kakšnem roku mora kupec grajati očitne stvarne napake?",
      options: [
        "V 8 dneh od pregleda; pri gospodarskih pogodbah nemudoma; skrito napako v 8 dneh od odkritja",
        "V 30 dneh v vseh primerih",
        "V 6 mesecih od izročitve",
        "Rok ni predpisan"
      ],
      correct: 0,
      explanation: "Kupec mora stvar pregledati in očitne napake grajati v 8 dneh (gospodarske pogodbe: nemudoma); skrite napake v 8 dneh od odkritja. Stvarna napaka: stvar nima lastnosti za običajno rabo, za posebno rabo (znano prodajalcu), dogovorjenih lastnosti ali se ne ujema z vzorcem/modelom. Prodajalec ne odgovarja za napake, ki so bile kupcu znane. Kupčevi zahtevki: odprava napake ali zamenjava, znižanje kupnine ali odstop od pogodbe."
    },
    {
      q: "Kaj velja za podjemno pogodbo?",
      options: [
        "Podjemnik se zavezuje opraviti posel (izdelava, popravilo); iz svojega materiala mora dati material srednje kakovosti in opozoriti na napake naročnikovega materiala",
        "Podjemnik se zavezuje prenesti lastninsko pravico na stvari",
        "Podjemnik ne odgovarja za napake dela",
        "Naročnik ni dolžan prevzeti izvršenega dela"
      ],
      correct: 0,
      explanation: "Podjemna pogodba: podjemnik opravi posel (izdelava/popravilo) v določenem času. Iz svojega materiala da material srednje kakovosti; na napake naročnikovega materiala mora opozoriti, sicer odgovarja za škodo. Naročnik mora delo pregledati in takoj obvestiti podjemnika, skrito napako prijaviti v enem mesecu, delo pa prevzeti."
    },
    {
      q: "Servis noče vrniti popravljenega avtomobila, dokler stranka ne plača računa za popravilo. Za kateri institut gre?",
      options: [
        "Zastavna pravica",
        "Pridržna (retencijska) pravica",
        "Ara",
        "Samovoljno ravnanje - servis avto mora vrniti"
      ],
      correct: 1,
      explanation: "Pridržna pravica je akcesorna pravica: imetnik sme pridržati stvar, ki jo je dolžan izročiti, dokler mu dolžnik ne plača. Pogoji: zapadla terjatev, ki izhaja iz pridržane stvari; predmet je stvar; dolg je denaren; stvar je pri upniku."
    },
    {
      q: "Odstopnina (skesnina) je:",
      options: [
        "denarni znesek ali količina nadomestljivih stvari, ki jo stranka plača, če želi odstopiti od pogodbe; izjava o odstopu učinkuje le skupaj z izročitvijo odstopnine",
        "kazen, ki jo izreče sodišče ob razvezi pogodbe",
        "obvezna sestavina vsake pogodbe",
        "vračilo are v dvojnem znesku"
      ],
      correct: 0,
      explanation: "Stranki se lahko dogovorita, da ena ali vsaka lahko odstopi od pogodbe, če da odstopnino. Izjava o odstopu deluje le, če je hkrati dana odstopnina. Ko stranka izjavi, da bo dala odstopnino, ne more več zahtevati izpolnitve. Avans (predplačilo) pa je vnaprejšnja izpolnitev na račun obveznosti, ki še ni zapadla."
    }
  ]
};
