/* Združevanje sklopov po temah (ob gradnji, data.json ostane nespremenjen). Cilj: sklopi po predavanjih/temah z 10-20 vprašanji.
   Konfiguracija: za vsak del seznam postavk v želenem vrstnem redu; postavka = 'deck-id' (ostane) ali
   { id, name, from: [ids], calc?, split? }. Sklopi, ki v seznamu niso omenjeni, se dodajo na konec (opozorilo).
   split: n razdeli sklop na n enako velikih delov "(1/n)". SPLIT_OVER: sklopi z več vprašanji se samodejno razpolovijo. */
const SPLIT_OVER = 36;

const CFG = {
  's1/mikro/k1': [
    { id: 'mikro-k1-trg', name: 'Razmišljati kot ekonomist, trg in ravnotežje', from: ['mikro-k1-ekonomist', 'mikro-k1-ponudba'] },
    { id: 'mikro-k1-elast', name: 'Elastičnost, vloga države in potrošnik (+ povezovanje)', from: ['mikro-k1-elasticnost', 'mikro-k1-potrosnik', 'mikro-k1-povezi'] },
    'mikro-k1-stari',
    { id: 'mikro-k1-rac', name: 'Računske naloge (tudi stari kolokviji)', from: ['mikro-k1-racunske', 'mikro-k1-stari-rac'], calc: true },
  ],
  's1/mikro/k2': [
    { id: 'mikro-k2-proiz', name: 'Proizvodnja in proizvodni stroški', from: ['mikro-k2-proizvodnja', 'mikro-k2-stroski'] },
    { id: 'mikro-k2-konk', name: 'Popolna konkurenca (+ povezovanje)', from: ['mikro-k2-konkurenca', 'mikro-k2-povezi'] },
    'mikro-k2-racunske',
  ],
  's1/mikro/izpit': [
    { id: 'mikro-iz-strukture', name: 'Tržne strukture in trg dela (+ povezovanje)', from: ['mikro-iz-monopol', 'mikro-iz-oligopol', 'mikro-iz-delo', 'mikro-iz-povezi'] },
    { id: 'mikro-iz-rac', name: 'Računske naloge (celotna snov)', from: ['mikro-iz-racunske', 'mikro-iz-k1'], calc: true },
  ],
  's1/mng/izpit': [
    { id: 'mng-uvod2', name: 'Uvod v management (+ povezovanje)', from: ['mng-uvod', 'mng-povezi'] },
    'mng-plan', 'mng-org', 'mng-vod', 'mng-mot', 'mng-kont', 'mng-delni',
  ],
  's1/uvod/k1': [
    { id: 'uvp-k1-gosp', name: 'Gospodarjenje in poslovne prvine (+ povezovanje)', from: ['gospodarjenje', 'uvp-k1-povezi'] },
    'sredstva', 'stroski-kalkulacije', 'uspeh-ekon-produkt', 'racunske',
  ],
  's1/uvod/k2': [
    { id: 'uvp-k2-ekon', name: 'Nominalna in realna ekonomičnost, rentabilnost (+ povezovanje)', from: ['uvp-k2-ekon-rent', 'uvp-k2-povezi'] },
    'uvp-k2-produkcija', 'uvp-k2-stroski', 'uvp-k2-prag-opt', 'uvp-k2-racunske',
  ],
  's1/mat/k1': [
    { id: 'mat-funk-odv', name: 'Funkcije, elastičnost in odvodi', from: ['mat-funkcije', 'mat-odvodi'], calc: true },
    { id: 'mat-dvespr-int', name: 'Funkcije dveh spremenljivk in integrali (+ povezovanje)', from: ['mat-dvespr', 'mat-integrali', 'mat-k1-povezi'], calc: true },
    'mat-financna', 'mat-stari-funkcije', 'mat-stari-financna',
  ],
  's1/mat/k2': [
    { id: 'mat-matr-verj', name: 'Matrike, sistemi in verjetnost (+ povezovanje)', from: ['mat-matrike', 'mat-verjetnost', 'mat-k2-povezi'], calc: true },
    'mat-stari-matrike', 'mat-stari-verjetnost',
  ],
  's2/makro/izpit': [
    { id: 'mk12', name: 'Temelji, tržne pomanjkljivosti in BDP', from: ['mk1', 'mk2'] },
    { id: 'mk34', name: 'AD–AS, cikli, denar in monetarna politika', from: ['mk3', 'mk4'] },
    { id: 'mk56', name: 'Javne finance, fiskalna politika in odprto gospodarstvo', from: ['mk5', 'mk6'] },
    { id: 'mk7p', name: 'Šole, brezposelnost, inflacija, rast (+ povezovanje)', from: ['mk7', 'makro-povezi'] },
    'makro-pregled', 'makro-kategorije', 'makro-politike', 'makro-roki', 'makro-racunske',
  ],
  's2/ov/izpit': [
    { id: 'ov1p', name: 'Uvod v OV (+ povezovanje)', from: ['ov1', 'ov-povezi'] },
    'ov2', 'ov3', 'ov4', 'ov5', 'ov6', 'ov7', 'ov8', 'ov-poudarki', 'ov-izpit2021',
  ],
  's2/stat/k2': [
    'st-t5-1', 'st-t5-2', 'st-t6',
    { id: 'st-t78', name: 'Skupinski indeksi: Laspeyres, Paasche, Fisher, strukturni premiki (temi 7–8)', from: ['st-t7', 'st-t8'] },
    'st-nal58',
  ],
  's2/stat/izpit': [
    'st-t12', 'st-t34-1', 'st-t34-2', 'st-t5-1', 'st-t5-2', 'st-t6',
    { id: 'st-t78', name: 'Skupinski indeksi: Laspeyres, Paasche, Fisher, strukturni premiki (temi 7–8)', from: ['st-t7', 'st-t8'] },
    'st-t9-1', 'st-t9-2', 'st-t9-3', 'st-t10', 'st-t11', 'st-t12b',
    { id: 'st-nal', name: 'Računske naloge · teme 5–12', from: ['st-nal58', 'st-nal912'], calc: true },
    'st-stari',
  ],
  's2/inf/k1': [
    { id: 'inf-k1-konk2', name: 'Poslovna informatika in konkurenčnost (+ povezovanje)', from: ['inf-k1-konk', 'inf-k1-povezi'] },
    'inf-k1-it', 'inf-k1-pb', 'inf-k1-kom',
  ],
  's2/inf/k2': [
    'biz', 'inf-k2-pis',
    { id: 'inf-k2-bi3', name: 'Podatkovno skladišče, OLAP in rudarjenje (+ povezovanje)', from: ['inf-k2-bi2', 'inf-k2-povezi'] },
  ],
  's2/inf/k3': [
    'is', 'varnost', 'ai', 'blockchain',
    { id: 'inf-k3-ep2', name: 'Elektronsko poslovanje (+ povezovanje)', from: ['inf-k3-ep', 'inf-k3-povezi'] },
  ],
  'y2s1/pf1/k1': [
    { id: 'pf1-cilj2', name: 'Cilj podjetja in vrednost (+ povezovanje)', from: ['cilj', 'pf1-k1-povezi'] },
    'agent', 'pf1-upravljanje', 'izkazi', 'pf1-izkazi2', 'kazalniki', 'pf1-tvm',
    'pf1-rac-vrednost', 'pf1-rac-kazalniki',
    { id: 'pf1-rac-tvm2', name: 'Računske: časovna vrednost denarja (vaje 2, z rešitvami)', from: ['pf1-rac-tvm', 'pf1-maja-rac'], calc: true },
  ],
  'y2s1/pf1/k2': [
    'pf1-obveznice', 'pf1-delnice',
    { id: 'pf1-tveg2', name: 'Tveganje in donosnost (+ povezovanje)', from: ['pf1-tveganje', 'pf1-k2-povezi'] },
    'pf1-capm-teorija',
    { id: 'pf1-rac-ob-del', name: 'Računske: obveznice in delnice', from: ['pf1-rac-obveznice', 'pf1-rac-delnice'], calc: true },
    'pf1-v3', 'pf1-v4', 'pf1-v5', 'pf1-v6',
  ],
  'y2s1/stana/k1': [
    'stana-pojmi',
    { id: 'stana-opisna2', name: 'Opisna statistika in frekvenčne porazdelitve (+ povezovanje)', from: ['stana-opisna', 'stana-k1-povezi'] },
    'stana-porazd', 'stana-vzorcenje', 'stana-intervalna',
    { id: 'stana-vzorcenja2', name: 'Velikost vzorca in vzorčenja z omejitvami (P05, V05)', from: ['stana-vzorcenja', 'stana-maja'] },
    'stana-stari', 'stana-stari2',
    'stana-rac-opisna', 'stana-rac-normalna', 'stana-rac-vzorcenje',
    { id: 'stana-rac-int-vel', name: 'Računske: intervalna ocena, velikost vzorca, stratificirano (P04–P05)', from: ['stana-rac-intervalna', 'stana-rac-velikost', 'stana-maja-rac'], calc: true },
  ],
  'y2s1/stana/k2': [
    { id: 'stana-domneve2', name: 'Osnove preizkušanja domnev (P06, V06) (+ povezovanje)', from: ['stana-domneve', 'stana-k2-povezi'] },
    'stana-2pp-stari', 'stana-rac-domneve',
  ],
  'y2s1/trz/kvizi': [
    { id: 'trz-usm2', name: 'Opredelitev trženja in usmeritve podjetja (+ povezovanje)', from: ['trz-usmeritve', 'trz-povezi'] },
    { id: 'trz-vred-povp', name: 'Vrednost, zadovoljstvo, merjenje povpraševanja in tržni delež', from: ['trz-vrednost', 'trz-povprasevanje'] },
    'trz-strategija', 'trz-okolje', 'trz-raziskave', 'trz-vedenje', 'trz-ciljno',
    { id: 'trz-vaje', name: 'Vaje: Google Glass, Argeta in Duolingo', from: ['trz-glass', 'trz-vaje-argeta-duo'] },
  ],
  'y2s1/eeu/k1': [
    'eeu-povojna', 'eeu-pristopi', 'eeu-krogi', 'eeu-vzhod', 'eeu-vaje1',
    { id: 'eeu-mm2', name: 'Mednarodna menjava: primerjalne prednosti in mikroekonomska orodja', from: ['eeu-mm', 'eeu-mikro'] },
    { id: 'eeu-carine', name: 'Carine: majhna in velika država, MFN (P04)', from: ['eeu-carine-teorija', 'eeu-maja'] },
    { id: 'eeu-pref-all', name: 'Preferencialna liberalizacija (Viner), partnerica, tretje države in empirija (P05)', from: ['eeu-pref', 'eeu-pref2'] },
    { id: 'eeu-integr', name: 'Stopnje integracije in sporazumi (tudi stari kolokviji)', from: ['eeu-integr2', 'eeu-integracije'] },
    'eeu-wto', 'eeu-p6b', 'eeu-stari', 'eeu-povezi',
    { id: 'eeu-rac-mm-presezki', name: 'Računske: primerjalne prednosti in presežki (vaje 2–3)', from: ['eeu-rac-mm', 'eeu-rac-v3'], calc: true },
    { id: 'eeu-rac-carine-cu', name: 'Računske: carine in carinska unija (vaje 4)', from: ['eeu-rac-carine', 'eeu-rac-v4'], calc: true },
    { id: 'eeu-rac-viner', name: 'Računske: ustvarjanje in preusmerjanje trgovine (vaje 3 in 5, z rešitvami)', from: ['eeu-rac-v5', 'eeu-maja-rac'], calc: true },
  ],
  'y2s1/mpsp/k1': [
    { id: 'mpsp-yg2', name: 'Vaje 1: YG - strategija in procesi (+ povezovanje)', from: ['mpsp-yg', 'mpsp-k1-povezi'] },
    'mpsp-v2-teorija',
    { id: 'mpsp-v34', name: 'Vaje 3-4: razmestitev in napovedovanje povpraševanja', from: ['mpsp-v3-teorija', 'mpsp-maja'] },
    { id: 'mpsp-rac-v12', name: 'Računske: Littlov zakon, prispevek za kritje, zmogljivost (vaje 1–2)', from: ['mpsp-rac', 'mpsp-v2-rac'], calc: true },
    { id: 'mpsp-rac-v34', name: 'Računske: razmestitev, napovedovanje, regresija (vaje 3–4)', from: ['mpsp-v3-rac', 'mpsp-maja-rac'], calc: true },
  ],
  'y2s1/mpsp/izpit': [
    { id: 'mpsp-izpit12', name: 'Stara izpitna vprašanja: zaloge, MRP, planiranje, kakovost', from: ['mpsp-izpit', 'mpsp-izpit2'] },
    'mpsp-izpit3',
    { id: 'mpsp-v56', name: 'Vaje 5-6: planiranje zmogljivosti, drevo odločanja, simulacija, lokacija', from: ['mpsp-v56-teorija', 'mpsp-v56-drevo'] },
    'mpsp-v56-rac',
  ],
};

function regroup(data) {
  for (const sem of data) for (const subj of sem.subjects) for (const part of subj.parts) {
    const key = `${sem.id}/${subj.id}/${part.id}`;
    const cfg = CFG[key];
    const byId = {}; (part.decks || []).forEach((d) => { byId[d.id] = d; });
    const used = new Set();
    let out = [];
    if (cfg) {
      for (const item of cfg) {
        if (typeof item === 'string') { if (!byId[item]) { console.warn(`regroup ${key}: ni sklopa ${item}`); continue; } out.push(byId[item]); used.add(item); continue; }
        const srcs = item.from.filter((id) => { if (!byId[id]) console.warn(`regroup ${key}: ni sklopa ${id}`); return byId[id]; });
        if (!srcs.length) continue;
        const d = { id: item.id, name: item.name, questions: srcs.flatMap((id) => byId[id].questions) };
        const calc = item.calc != null ? item.calc : srcs.every((id) => byId[id].calc);
        if (calc) d.calc = true;
        srcs.forEach((id) => used.add(id));
        out.push(d);
      }
      (part.decks || []).forEach((d) => { if (!used.has(d.id)) { console.warn(`regroup ${key}: sklop ${d.id} ni v konfiguraciji, dodan na konec`); out.push(d); } });
    } else out = part.decks || [];
    // samodejno razpolavljanje velikih sklopov (vrstni red vprašanj ostane)
    const final = [];
    for (const d of out) {
      const n = d.questions.length;
      if (n > SPLIT_OVER) {
        const k = Math.ceil(n / 20) > 2 ? Math.ceil(n / 20) : 2;
        const size = Math.ceil(n / k);
        for (let i = 0; i < k; i++) final.push({ ...d, id: `${d.id}-${i + 1}`, name: `${d.name} (${i + 1}/${k})`, questions: d.questions.slice(i * size, (i + 1) * size) });
      } else final.push(d);
    }
    part.decks = final;
  }
  return data;
}
module.exports = regroup;
