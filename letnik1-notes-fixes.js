/* Ročni prepisi zapiskov 1. letnika, ki nastanejo iz modulov v letnik1-src/ (notesMd, notes, appendNotesMd).
   Uporablja jih add-letnik1-vsebina.js po renderju (applyFixes iz letnik2-src/notes-sources.js), zato jih ponoven zagon ne povrne.
   Oblika: { part: 'predmet/del', find, replace }. Namen: brez pripisov virov (predavanja, vaje, pedagogi, učbenik, Canvas), 21. 11. 2026. */
module.exports = [
  {"part":"ov/izpit","find":"<h3>Profesoričini poudarki (ni uradni seznam)</h3>","replace":"<h3>Ključne teme (ni uradni seznam)</h3>"},
  {"part":"ov/izpit","find":"<b>Primer vodij (14. sklop)</b>","replace":"<b>Primer vodij</b>"},
  {"part":"ov/izpit","find":"<b>Cialdini</b> (pravila prepričevanja, ~str. 200)","replace":"<b>Cialdini</b> (pravila prepričevanja)"},
  {"part":"mng/izpit","find":"Zanimivosti s predavanj: švedsko","replace":"Zanimivosti: švedsko"},
  {"part":"uvod/k2","find":"2. kolokvij je na vajah v prvem tednu januarja","replace":"2. kolokvij je v prvem tednu januarja"},
  {"part":"uvod/k2","find":"Snov: nadaljevanje predavanj po 1. kolokviju","replace":"Snov: nadaljevanje snovi po 1. kolokviju"},
  {"part":"uvod/k2","find":"<div class=\"tip\">Točen obseg snovi povesta predavateljici na predavanjih in vajah - preveri na Canvasu.</div>","replace":"<div class=\"tip\">Točen obseg snovi preveri pri predmetu.</div>"},
  {"part":"pravo/izpit","find":"<b>2 praktična primera</b> iz vaj (2 × 15 točk)","replace":"<b>2 praktična primera</b> (2 × 15 točk)"},
  {"part":"inf/k1","find":"1. kolokvij: prva štiri predavanja; 2. kolokvij: druga štiri; 3. kolokvij: preostala.","replace":"1. kolokvij: prvi del snovi; 2. kolokvij: drugi del; 3. kolokvij: preostala snov."},
  {"part":"inf/k2","find":"25 točk (vsaj 10), snov druge štirih predavanj: <b>poslovni","replace":"25 točk (vsaj 10), snov: <b>poslovni"},
  {"part":"inf/izpit","find":" Snov vseh predavanj in učbenik.","replace":" Snov vseh poglavij."},
  {"part":"inf/izpit","find":", etična dilema, vprašanje o gostu na predavanjih.","replace":", etična dilema."},
  // 22. 11. 2026: naslovi brez številk poglavij in lanskih datumov
  {"part":"inf/k3","find":"<h2>Poglavje 6 — Digitalizacija poslovanja: Razvoj IS</h2>","replace":"<h2>Digitalizacija poslovanja: Razvoj IS</h2>"},
  {"part":"inf/k3","find":"<h2>Poglavje 5 — Varnost in zaščita informacijskih virov</h2>","replace":"<h2>Varnost in zaščita informacijskih virov</h2>"},
  {"part":"inf/k3","find":"<h2>Poglavje 7 — Umetna inteligenca (AI)</h2>","replace":"<h2>Umetna inteligenca (AI)</h2>"},
  {"part":"inf/k3","find":"<h2>Poglavje 8 — Tehnologija veriženja blokov (Blockchain)</h2>","replace":"<h2>Tehnologija veriženja blokov (Blockchain)</h2>"},
  {"part":"mikro/k2","find":"<b>2. kolokvij</b> (12. 12.): poglavja 5, 6 in 7 - proizvodnja","replace":"<b>2. kolokvij</b>: proizvodnja"},
  {"part":"rac/izpit","find":"<b>ZGD</b> (8. poglavje) ureja","replace":"<b>ZGD</b> ureja"},
];
