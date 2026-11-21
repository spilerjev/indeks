/* Pogoji uporabe in politika zasebnosti: legal/*.md -> HTML za strani #/pogoji in #/zasebnost (build.js vstavi __LEGAL_JSON__).
   Preprost Markdown: # / ## naslovi, odstavki, seznami "- ", tabele "| a | b |", **krepko**, [besedilo](povezava).
   {{KONTAKT}} zamenja aplikacija (TERMS_CONTACT). Ob vsebinski spremembi dvigni TERMS_VERSION v indeks-template.jsx. */
const fs = require('fs');
const path = require('path');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) => esc(s)
  .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
  .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, h) => `<a href="${h.replace(/"/g, '&quot;')}"${/^https?:/.test(h) ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`);
const cells = (line) => line.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

function mdToHtml(md) {
  const lines = md.replace(/\r/g, '').split('\n');
  const out = [];
  let title = '';
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    let m;
    if ((m = /^# (.+)/.exec(l))) { title = m[1].trim(); i++; continue; }
    if ((m = /^## (.+)/.exec(l))) { out.push(`<h2>${inline(m[1].trim())}</h2>`); i++; continue; }
    if (/^\s*- /.test(l)) {
      const items = [];
      while (i < lines.length && /^\s*- /.test(lines[i])) { items.push(`<li>${inline(lines[i].replace(/^\s*- /, ''))}</li>`); i++; }
      out.push(`<ul>${items.join('')}</ul>`); continue;
    }
    if (/^\|/.test(l)) {
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) { rows.push(lines[i]); i++; }
      const head = cells(rows[0]);
      const body = rows.slice(2).map(cells);
      out.push('<div class="ix-legal-tbl"><table><thead><tr>' + head.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>' +
        body.map((r) => '<tr>' + r.map((c, k) => `<td data-h="${esc(head[k] || '')}">${inline(c)}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>');
      continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(#|\s*- |\|)/.test(lines[i])) { para.push(lines[i].trim()); i++; }
    out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return { title, html: out.join('\n') };
}

function loadLegal() {
  const dir = path.join(__dirname, 'legal');
  return {
    pogoji: mdToHtml(fs.readFileSync(path.join(dir, 'pogoji-uporabe.md'), 'utf8')),
    zasebnost: mdToHtml(fs.readFileSync(path.join(dir, 'politika-zasebnosti.md'), 'utf8')),
  };
}
module.exports = { mdToHtml, loadLegal };
