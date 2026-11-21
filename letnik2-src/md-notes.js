/* ZAPISKI.md -> HTML za part.notes (h2 = sklop, h3/h4 = note-card, > = tip, tabele, seznami).
   opts.skip: seznam naslovov (začetek besedila), katerih razdelki se izpustijo (skupaj s podrazdelki).
   opts.replace: [[regex|string, zamenjava], ...] - pred pretvorbo (npr. odstrani osebne opombe). */
const fs = require('fs');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function inline(s) {
  s = esc(s);
  s = s.replace(/`([^`]+)`/g, '<i>$1</i>');
  s = s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  s = s.replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\w)/g, '$1<em>$2</em>');
  s = s.replace(/(^|\W)_([^_]+)_(?=\W|$)/g, '$1<em>$2</em>');
  return s;
}

/* Zasebnost: ZAPISKI.md so osebni zapiski, app pa berejo vsi. Pred pretvorbo:
   - izpustimo vrstice in razdelke (do naslednjega naslova iste ali višje ravni) z oznako 🔒 ali s sestavo skupin/osebnimi roki,
   - osebne fraze (»moje rešitve«, »Leon s predavanja«, »Majini zapiski, ko me ni bilo« ...) prepišemo v nevtralne. */
const PRIVATE_SECTION = /🔒|\bnaš[ae]? seminarsk|\bmoj del\b|\bmoja skupina\b|\bpredstavitev\b.*\bmoj/i;
const PRIVATE_LINE = /🔒|\b(Skupina|skupine|Delitev dela|Oblikovanje seminarskih skupin)\b.*\b(Leon|Hana|Tinkara|Aljaž|Maja|Matjaž)\b|\bmoja skupina\b|\bprijavljen\b.*\boddano\b/i;
const PRIVATE_REPLACE = [
  [/\s*→ ✅ \*\*prijavljen\*\* \(oddano[^)]*\)\.?/g, '.'],
  [/Dopolnjujem sproti, ko Leon kaj sliši na predavanjih ali vajah\./g, 'Dopolnjeno sproti po navodilih s predavanj in vaj.'],
  [/Vir: Leon z vaj,?/g, 'Vir: vaje,'],
  [/\(Predavanje [^)]*sem zamudil, povzetek je narejen iz prosojnic\.\)/g, '(Povzetek je narejen iz prosojnic.)'],
  [/Praznine sem izpolnil vnaprej iz učbeniške logike; ko prof razloži, preveri\./g, 'Praznine so izpolnjene vnaprej po učbeniški logiki; preveri z razlago profesorice.'],
  [/Kjer sem ugibal, je 🔎/g, 'Negotova mesta so označena s 🔎'],
  [/ - Leon Špiler \(osnutek\)/g, ' (osnutek)'],
  [/📒 Majini zapiski — /g, '📒 Dopolnilni zapiski — '],
  [/, ko me ni bilo\)/g, ')'],
  [/Majine izpolnjene prosojnice potrjujejo, kar sem zgoraj izpolnil sam \(tudi 🔎 ugibanja\)/g, 'Izpolnjene prosojnice s predavanj potrjujejo zgornje (tudi 🔎 ugibanja)'],
  [/Majine prosojnice z ročnimi zapiski/g, 'prosojnice z ročnimi zapiski s predavanj'],
  [/Njene številke se ujemajo z mojimi rešitvami zgoraj/g, 'Številke se ujemajo z rešitvami zgoraj'],
  [/\(Majin zapis s predavanja\)/g, '(zapis s predavanja)'],
  [/\(po Majinih zapiskih\)/g, '(po zapiskih s predavanja)'],
  [/prej sem napačno sklepal na/g, 'prejšnji zapis je napačno navajal'],
  [/rešitve z vaj \(Maja\)/g, 'rešitve z vaj'],
  [/Vse se ujema z mojimi:/g, 'Vse se ujema z rešitvami zgoraj:'],
  [/Majine ročne rešitve z vaj 1–4 se \*\*ujemajo z mojimi V01–V04\*\*/g, 'Ročne rešitve z vaj 1–4 se **ujemajo z V01–V04**'],
  [/Vaje 5 in 6 v njenem PDF-ju nimajo rešitev\. Dve njeni številki sta prepisni napaki/g, 'Vaje 5 in 6 v tem PDF-ju nimajo rešitev. Dve številki sta prepisni napaki'],
  [/Rezultati so enaki mojim zgoraj/g, 'Rezultati so enaki zgornjim'],
  [/\(moje zgoraj z b = /g, '(zgornji z b = '],
  [/Leon piše v VELIKI DVORANI \(VD\)\*\* \(priimki S–Ž\)/g, 'priimki S–Ž pišejo v VELIKI DVORANI (VD)**'],
  [/verjetnost, da je Leon v ekipi/g, 'verjetnost, da je določen študent v ekipi'],
  [/\(oba naša CSV-ja/g, '(oba CSV-ja'],
  [/\(ta je moj, preveri z R\.\)/g, '(lasten izračun, preveri z R.)'],
  [/\(Izračun je moj, ker je vaja prazna; preveri\.\)/g, '(lasten izračun, ker je vaja prazna; preveri.)'],
  [/nisem prepričan, kaj točno je mišljeno/g, 'ni jasno, kaj točno je mišljeno'],
  [/\(moja razvrstitev, preveri/g, '(razvrstitev, preveri'],
  [/Vse številke spodaj sem preveril z izračunom\./g, 'Vse številke spodaj so preverjene z izračunom.'],
  [/Leonovi zapiski s predavanja:/g, 'Zapiski s predavanja:'],
  [/Leonova ugotovitev:/g, 'Ugotovitev s predavanja:'],
  [/\(Leon s predavanja ✅:/g, '(s predavanja:'],
  [/Leon s predavanja ✅:/g, 'S predavanja:'],
  [/✅ Leon:/g, 'S predavanja:'],
  [/Leon ✅:/g, 'S predavanja:'],
  [/\(Leon ✅\)/g, '(s predavanja)'],
  [/\(Leon: /g, '(s predavanja: '],
  [/ Leon: \*/g, ' S predavanja: *'],
  [/\(Leon, (\d{1,2}\. \d{1,2}\. \d{4})\)/g, '(zapis z vaj, $1)'],
  [/\(moj zapis na vajah\)/g, '(zapis z vaj)'],
  [/\bMoje rešitve\b/g, 'Rešitve'],
  [/\bmoje rešitve\b/g, 'rešitve'],
  [/\bMoj primer\b/g, 'Primer'],
  [/\bMoj izračun\b/g, 'Izračun'],
  [/\bmoj izračun\b/g, 'izračun'],
  [/\bMoj amortizacijski načrt\b/g, 'Amortizacijski načrt'],
  [/\bMoja razlaga\b/g, 'Razlaga'],
  [/\bmoja razlaga\b/g, 'razlaga'],
  [/\bMoja presoja\b/g, 'Presoja'],
  [/\bMoj predlog\b/g, 'Predlog'],
  [/je moj dodatek/g, 'je dodatek k prosojnicam'],
  [/\(moji odgovori za razumevanje\)/g, '(odgovori za razumevanje)'],
  [/potrebe moje raziskave/g, 'potrebe raziskave'],
  [/mene pa zanima/g, 'raziskovalca pa zanima'],
  [/\(koliko lahko zaslužim drugje\)/g, '(koliko je mogoče zaslužiti drugje)'],
  [/ali bom 107 € res dobil/g, 'ali bo 107 € res izplačanih'],
  [/ta je moj, preveri z R\./g, 'lasten izračun, preveri z R.'],
  [/ - Maja\.pdf/g, '.pdf'],
  [/\(jaz 39,24/g, '(tu 39,24'],
];
function scrubPrivate(md) {
  for (const [re, to] of PRIVATE_REPLACE) md = md.replace(re, to);
  const out = []; let skipLevel = 0;
  for (const line of md.replace(/\r/g, '').split('\n')) {
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      if (skipLevel && level > skipLevel) continue;
      skipLevel = 0;
      if (PRIVATE_SECTION.test(h[2])) { skipLevel = level; continue; }
    } else if (skipLevel) continue;
    if (PRIVATE_LINE.test(line)) continue;
    out.push(line);
  }
  return out.join('\n');
}

/* Slike v zapiskih: vrstica "![opis](relativna/pot.webp)" ali omemba `pot.webp|png|jpg|svg` v besedilu
   (npr. "Fotografija: `Predavanja/...webp`"). opts.img = {base: mapa ZAPISKI.md, outDir: docs/img/<predmet>, url: 'img/<predmet>/'}.
   Datoteka se kopira v docs (objavljeno), v zapiskih pa se prikaže kot slika (klik = odpre v polni velikosti). */
const IMG_EXT = /\.(webp|png|jpe?g|svg|gif)$/i;
/* Ne objavljamo avtorskega gradiva profesorjev: izrezi in fotografije prosojnic ostanejo le v lokalnih zapiskih. */
/* + slike učbeniških primerov in table z vaj (»Vaje/…/Primer 5.2 …png«, »…tabla…«), 21. 11. 2026: nadomestijo jih lastni grafi */
const IMG_NOPUBLISH = /slike s prosojnic|fotografije s predavanja|prosojnic[ae]?\/|Primer[ _]\d+\.\d+[^/]*\.(png|jpe?g|webp|heic)$|tabla[^/]*\.(png|jpe?g|webp|heic)$/i;
function imgFigure(rel, cap, img) {
  const path = require('path');
  rel = rel.replace(/^<|>$/g, '');
  if (IMG_NOPUBLISH.test(rel)) return null;
  const src = path.join(img.base, rel);
  if (!fs.existsSync(src)) { console.warn('  ! ni slike:', rel); return null; }
  // nevtralno ime (brez »Predavanja_slike_…«, »Vaje_V02_…«) in v SVG besedilo brez oznak predavanj, vaj in slik (notes-sources.js)
  const { neutralName, scrubSvg } = require('./notes-sources');
  const name = neutralName(rel.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9.]+/g, '_').replace(/^_+/, ''));
  fs.mkdirSync(img.outDir, { recursive: true });
  if (/\.svg$/i.test(name)) fs.writeFileSync(path.join(img.outDir, name), scrubSvg(fs.readFileSync(src, 'utf8')));
  else fs.copyFileSync(src, path.join(img.outDir, name));
  const url = img.url + name, alt = esc(cap || '');
  return `<figure class="nimg"><a href="${url}" target="_blank" rel="noopener"><img src="${url}" alt="${alt}" loading="lazy"></a>${cap ? '<figcaption>' + inline(cap) + '</figcaption>' : ''}</figure>`;
}

function render(md, opts = {}) {
  for (const [a, b] of opts.replace || []) md = typeof a === 'string' ? md.split(a).join(b) : md.replace(a, b);
  md = scrubPrivate(md);
  if (opts.img) {
    // omemba slike v besedilu -> dodatna vrstica s sliko (z enakim zamikom, da ostane v isti alineji)
    md = md.split('\n').flatMap((l) => {
      if (/^\s*!\[/.test(l)) return [l];
      const ind0 = (l.match(/^(\s*)([-*]|\d+\.)?\s*/) || [''])[0].replace(/[-*\d.]/g, ' ');
      const inl = [...l.matchAll(/!\[([^\]]*)\]\((<[^>]+>|[^)]+)\)/g)];
      if (inl.length) return [l.replace(/!\[([^\]]*)\]\((<[^>]+>|[^)]+)\)/g, '').replace(/[\s:]+$/, ''), ...inl.map((m) => ind0 + '![' + m[1] + '](' + m[2] + ')')];
      const refs = [...l.matchAll(/`([^`]+)`/g)].map((m) => m[1]).filter((p) => IMG_EXT.test(p));
      const ind = (l.match(/^(\s*)([-*]|\d+\.)?\s*/) || [''])[0].replace(/[-*\d.]/g, ' ');
      return [l, ...refs.map((p) => ind + '![](' + p + ')')];
    }).join('\n');
  }
  const skip = (opts.skip || []).map((x) => x.toLowerCase());
  const lines = md.replace(/\r/g, '').split('\n');
  const out = [];
  let inCard = false, skipLevel = 0, para = [];
  const listStack = []; // [{type, indent}]
  let table = null, quote = [], code = null;

  const closeLists = (toIndent = -1) => {
    while (listStack.length && listStack[listStack.length - 1].indent > toIndent) out.push(`</li></${listStack.pop().type}>`);
  };
  const flushPara = () => { if (para.length) { out.push('<p>' + inline(para.join(' ')) + '</p>'); para = []; } };
  const flushTable = () => {
    if (!table) return;
    const rows = table.filter((r) => !/^\s*\|?\s*:?-{2,}/.test(r));
    const cells = (r) => r.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => inline(c.trim()));
    const [head, ...body] = rows;
    out.push('<div class="tbl"><table><thead><tr>' + cells(head).map((c) => `<th>${c}</th>`).join('') + '</tr></thead><tbody>' +
      body.map((r) => '<tr>' + cells(r).map((c) => `<td>${c}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>');
    table = null;
  };
  const flushQuote = () => { if (quote.length) { out.push('<div class="tip">' + quote.map(inline).join('<br>') + '</div>'); quote = []; } };
  const flushAll = () => { flushPara(); closeLists(); flushTable(); flushQuote(); };
  const closeCard = () => { flushAll(); if (inCard) { out.push('</div>'); inCard = false; } };

  for (const raw of lines) {
    if (/^\s*```/.test(raw)) {
      if (code) { if (!skipLevel) out.push('<pre>' + esc(code.join('\n')) + '</pre>'); code = null; }
      else { if (!skipLevel) flushAll(); code = []; }
      continue;
    }
    if (code) { code.push(raw); continue; }
    const h = raw.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = h[1].length, text = h[2].trim();
      if (skipLevel && level > skipLevel) continue;
      skipLevel = 0;
      if (skip.some((s) => text.toLowerCase().startsWith(s))) { closeCard(); skipLevel = level; continue; }
      if (level === 1) continue;
      closeCard();
      if (level === 2) out.push(`<h2>${inline(text)}</h2>`);
      else { out.push(`<div class="note-card"><h3>${inline(text)}</h3>`); inCard = true; }
      continue;
    }
    if (skipLevel) continue;
    if (/^\s*(Vir|Viri|Gradivo)\s*:/.test(raw) || /^---+\s*$/.test(raw)) { flushAll(); continue; }
    const im = raw.match(/^(\s*)!\[([^\]]*)\]\((<[^>]+>|[^)]+)\)\s*$/);
    if (im) {
      const fig = opts.img ? imgFigure(im[3].trim(), im[2].trim(), opts.img) : null;
      flushPara(); flushTable(); flushQuote();
      if (!(listStack.length && im[1].length > 0)) closeLists();
      if (fig) out.push(fig);
      continue;
    }
    if (/^\s*\|/.test(raw)) { flushPara(); closeLists(); flushQuote(); (table = table || []).push(raw); continue; }
    flushTable();
    const q = raw.match(/^\s*>\s?(.*)$/);
    if (q) { flushPara(); closeLists(); if (q[1].trim()) quote.push(q[1]); continue; }
    flushQuote();
    const li = raw.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
    if (li) {
      flushPara();
      const indent = li[1].length, type = /\d/.test(li[2]) ? 'ol' : 'ul';
      const top = listStack[listStack.length - 1];
      if (!top || indent > top.indent) { out.push(`<${type}><li>`); listStack.push({ type, indent }); }
      else { closeLists(indent); out.push('</li><li>'); }
      out.push(inline(li[3]));
      continue;
    }
    if (!raw.trim()) { flushPara(); continue; }
    if (listStack.length && /^\s+/.test(raw)) { out.push(' ' + inline(raw.trim())); continue; }
    closeLists();
    para.push(raw.trim());
  }
  closeCard();
  return out.join('\n').replace(/<ul><li>\s*<\/li><\/ul>/g, '').replace(/ ?— ?/g, ' - ');
}

module.exports = { render, scrubPrivate };
