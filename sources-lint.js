/* LINT VIROV: v vsebini appa ni pripisov, da snov izvira s predavanj, vaj, od pedagogov, iz učbenika, skripte, s Canvasa ali prosojnic/PDF
   (CLAUDE.md, odločitev 21. 11. 2026). build.js pade ob vsakem novem zadetku in izpiše pot ter izsek.
   Pregleda vsa besedila, ki jih vidi uporabnik: ime dela, zapiske, naslove epizod, imena in vsebino kartic, imena kompletov,
   vprašanja, možnosti, pare, razlage, namige, »more« in »given«. HTML oznake so odstranjene.
   Izjema je samo točen niz na točni poti (ALLOW) z razlogom; vzorcev ne mehčaj. Pot: predmet/del[/komplet#i.polje]. */
const RULES = [
  [/\bpdf\b/i, 'PDF'],
  [/prosojnic/i, 'prosojnica'],
  [/\b[PV]0\d\b/, 'oznaka predavanja ali vaje (P01, V03)'],
  [/predavanj|predavatelj|predavateljic/i, 'predavanje ali predavatelj'],
  [/\bvajah\b|\bz vaj\b|\bvaje\s+\d|\d\.\s*vaj/i, 'vaje kot vir'],
  [/asistent/i, 'asistent'],
  [/profesor|\bprof\b\.?|\bdoc\.\s|\bizr\.\s*prof/i, 'profesor'],
  [/canvas|e-?učilnic/i, 'Canvas'],
  [/učbenik|\bskript[aieou]\b|\bskriptah\b/i, 'učbenik ali skripta'],
  [/na tabli|s table\b|handoff|rečeno na glas|na seminarju/i, 'razlaga v razredu'],
  [/Lotrič|Dolinar/i, 'ime pedagoga'],
  [/\bpoglavj\w*\s+\d|\d+\.\s*poglavj|\(tem[aei]\s+\d|\btem[aei]?\s+\d+\s*[–-]\s*\d/i, 'številka poglavja ali teme'],
  [/\.docx?\b|\.xlsx?\b|\.pptx?\b/i, 'ime datoteke'],
  [/\btabel[aei]\s+\d+\.\d+/i, 'številka tabele iz gradiva'],
  // študijski primeri z vaj (tudi resnična podjetja) ne sodijo v app (Leon, 23. 11. 2026)
  [/Starbucks|Google Glass|\bArget[aeiou]\b|Duolingo|Študijski primer \d+/i, 'študijski primer z vaj', 'trz/'],
];
// Dovoljeno: [pot, točen izsek besedila (podniz), razlog]
const ALLOW = [
  ["eeu/k1:notes", "korupciji (poglavji 23 in 24 se odpreta prva", "pristopna poglavja EU (pogajanja), ne sklic na gradivo"],
  ["trz/kvizi:notes", "Za seminarsko (1. poglavje): na kratko", "poglavje lastne seminarske naloge"],
  ["trz/kvizi:notes", "uporabno za poglavje 5 seminarske!", "poglavje lastne seminarske naloge"],
  ["trz/kvizi:notes", "(tudi poglavje 2 seminarske!)", "poglavje lastne seminarske naloge"],
  ["trz/kvizi:notes", "(tudi 3. poglavje seminarske, 1,5 t)", "poglavje lastne seminarske naloge"],
  ["trz/kvizi:notes", "Osnutek (poglavja 1–5, ~8 strani", "poglavja lastne seminarske naloge"],
  ["pravo/k2:notes", "Omejitve: zakonita licenca (odplačno: učbeniki, pregledi tiska), prosta uporaba", "snov: zakonita licenca po ZASP (učbeniki kot vrsta dela)"],
  ["pravo/izpit:notes", "Omejitve: zakonita licenca (odplačno: učbeniki, pregledi tiska), prosta uporaba", "snov: zakonita licenca po ZASP (kopija zapiskov k2)"],
  ["pravo/k2/pk2-pren#13.explanation", "uporaba po zakonu (čitanke in učbeniki, pregledi tiska) - posega le", "snov: zakonita licenca po ZASP"],
  ["mikro/k1/mikro-k1-rac#10.q", "vzame 20 minut, ena stran povzetka učbenika pa 1 uro. Koliko je oportunitetni", "izmišljena računska naloga"],
  ["mng/izpit/mng-kont#9.options[1]", "uporabljati originalni, nepopisani učbenik", "šaljiva napačna možnost"],
  ["inf/k1:notes", "poteka predmet Izpit 75 točk + vaje 25 točk , za oceno 6 skupaj vsaj", "organizacija ocene (sestavni del ocene)"],
  ["inf/izpit:notes", "poteka predmet Izpit 75 točk + vaje 25 točk , za oceno 6 skupaj vsaj", "organizacija ocene (kopija zapiskov k1)"],
  ["inf/izpit:notes", "Pisni izpit, 75 točk (+ do 25 točk z vaj), skupaj vsaj 55 za pozitivno", "organizacija ocene"],
  ["inf/k3:notes", "Pozor: digitaliziran ročni podpis (na tablici) NI elektronski podpis!", "tablica = tablični zaslon"],
  ["inf/izpit:notes", "Pozor: digitaliziran ročni podpis (na tablici) NI elektronski podpis!", "tablica = tablični zaslon (kopija zapiskov k3)"],
  ["inf/k3/varnost#12.q", "Digitaliziran ročni podpis (na tablici) je veljaven elektronski podpis.", "tablica = tablični zaslon"],
  ["inf/izpit/inf-iz-vprasanja#13.options[3]", "dobavitelj račun lastnoročno podpisal na tablici", "tablica = tablični zaslon"],
  ["inf/k3/blockchain#3.options[2]", "elektronsko podpisane pogodbe v PDF obliki", "PDF kot oblika dokumenta"],
  ["stana/k1:notes", "statistiki. Gostota verjetnosti f(y) (PDF): definirana za vse realne y;", "PDF = funkcija gostote verjetnosti"],
  ["stana/k1:notes", "Varianca σ² = σ·σ, σ = √σ². Nekateri učbeniki pišejo N(μ, σ²) → N(140, 400)", "splošno o zapisu, ne pripis vira"],
  ["trz/kvizi:notes", "min na začetku predavanj, 6–8 prosojnic; poslati do srede zvečer + prinesti", "organizacija: naloga »novica iz prakse«"],
  ["trz/kvizi:notes", "do 5 v paru, 5 min na začetku predavanj Pozitivno od 60 točk: 60–66 (6),", "organizacija: naloga »novica iz prakse«"],
  ["trz/kvizi:notes", "izpitu Kvizi + delovni listi na vajah 13,5 9 kvizov × 1,5 t (3 vprašanja", "organizacija ocene"],
  ["trz/kvizi:notes", "(frizer striže, ti si na stolu; predavanje poteka, ti poslušaš). Porabniki", "primer storitve"],
  ["trz/kvizi:notes", "gost v restavraciji, sošolci na predavanju). Ravni vpletenosti porabnika", "primer storitve"],
  ["trz/kvizi:notes", "skupina v restavraciji, sošolci na predavanju, publika na koncertu) Past: »ljudje«", "primer storitve"],
  ["trz/kvizi:notes", "(študijske metode, dosegljivost profesorjev, prijaznost zaposlenih) → izkustvene", "primer storitve (študij)"],
  ["trz/kvizi:notes", "9h spočit, ob 19h utrujen; isti profesor ima dober in slab dan; isti hotel", "primer variabilnosti storitev"],
  ["trz/kvizi:notes", "internet stvari, 5G, NFT, glasovni asistenti, blockchain, droni, hologrami,", "tehnologija (glasovni asistent)"],
  ["trz/kvizi:notes", "anket - chatboti in virtualni asistenti zbirajo podatke; več odzivov,", "tehnologija (virtualni asistent)"],
  ["eeu/k1:notes", "11.) niso navedene kot obvezne. Predavanja: 70 % udeležba na sprotnem delu", "organizacija: pogoj za delni izpit"],
  ["eeu/k1:notes", "sreda 11. 11. 2026 ob 14:30, P-019. Vaje v ponedeljek 9. 11. potekajo", "organizacija: urnik kolokvija"],
  ["eeu/k1:notes", ", 2 bonus točki ; obravnava na vajah/seminarjih v tednu od 23. 11.", "organizacija: domača naloga"],
];
function texts(data, cb) {
  const strip = (s) => String(s).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
  for (const sem of data) for (const su of sem.subjects) for (const pa of su.parts) {
    const b = su.id + '/' + pa.id, put = (p, v) => { if (typeof v === 'string' && v) cb(p, strip(v)); };
    put(b + ':name', pa.name); put(b + ':notes', pa.notes);
    (pa.audio || []).forEach((a, i) => { put(`${b}/audio#${i}.title`, a.title); put(`${b}/audio#${i}.sub`, a.sub); });
    (pa.flashcards || []).forEach((fc) => { put(`${b}/fc:${fc.id}:name`, fc.name); (fc.cards || []).forEach((c, i) => { put(`${b}/fc:${fc.id}#${i}.front`, c.front); put(`${b}/fc:${fc.id}#${i}.back`, c.back); }); });
    (pa.decks || []).forEach((dk) => {
      put(`${b}/${dk.id}:name`, dk.name);
      dk.questions.forEach((q, i) => {
        const pre = `${b}/${dk.id}#${i}`;
        ['q', 'explanation', 'hint', 'more', 'given'].forEach((f) => put(`${pre}.${f}`, q[f]));
        (q.options || []).forEach((o, k) => put(`${pre}.options[${k}]`, o));
        (q.pairs || []).forEach((pp, k) => { put(`${pre}.pairs[${k}].term`, pp.term); put(`${pre}.pairs[${k}].def`, pp.def); });
      });
    });
  }
}
// izjema velja, če točen niz `at` na tej poti pokrije zadetek
function covers(t, at, i, len) { for (let k = t.indexOf(at); k >= 0; k = t.indexOf(at, k + 1)) if (k <= i && i + len <= k + at.length) return true; return false; }
function sourceLint(data) {
  const bad = [], used = new Set();
  texts(data, (p, t) => {
    for (const [re, what, only] of RULES) {
      if (only && !p.startsWith(only)) continue;   // pravilo samo za en predmet
      const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'); let m;
      while ((m = g.exec(t))) {
        const ctx = t.slice(Math.max(0, m.index - 60), m.index + m[0].length + 60);
        const ok = ALLOW.findIndex(([ap, at]) => ap === p && covers(t, at, m.index, m[0].length));
        if (ok >= 0) { used.add(ok); continue; }
        bad.push(`${p} [${what}]: …${ctx}…`);
      }
    }
  });
  return { bad, unused: ALLOW.filter((_, i) => !used.has(i)) };
}
module.exports = { sourceLint, RULES, ALLOW, texts };
