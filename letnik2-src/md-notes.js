/* ZAPISKI.md -> HTML za part.notes (h2 = sklop, h3/h4 = note-card, > = tip, tabele, seznami).
   opts.skip: seznam naslovov (začetek besedila), katerih razdelki se izpustijo (skupaj s podrazdelki).
   opts.replace: [[regex|string, zamenjava], ...] - pred pretvorbo (npr. odstrani osebne opombe). */
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

function render(md, opts = {}) {
  for (const [a, b] of opts.replace || []) md = typeof a === 'string' ? md.split(a).join(b) : md.replace(a, b);
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

module.exports = { render };
