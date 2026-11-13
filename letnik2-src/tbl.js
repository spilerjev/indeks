/* HTML tabela za polje `given` (prikaže se nad odgovori). tbl(naslov, glava[], vrstice[][], opomba?) */
const TH = 'border:1px solid var(--line);padding:4px 9px;background:var(--paper2);font-weight:700;text-align:center;white-space:nowrap';
const TD = 'border:1px solid var(--line);padding:4px 9px;text-align:center;white-space:nowrap';
const TDL = 'border:1px solid var(--line);padding:4px 9px;text-align:left;white-space:nowrap';
function tbl(title, head, rows, note) {
  let h = '';
  if (title) h += `<div style="font-size:13px;font-weight:700;margin:8px 0 2px">${title}</div>`;
  h += `<div style="overflow-x:auto"><table style="border-collapse:collapse;font-size:13px;margin:4px 0 4px">`;
  if (head && head.length) h += '<tr>' + head.map((c) => `<th style="${TH}">${c}</th>`).join('') + '</tr>';
  for (const r of rows) h += '<tr>' + r.map((c, i) => `<td style="${i === 0 ? TDL : TD}">${c}</td>`).join('') + '</tr>';
  h += '</table></div>';
  if (note) h += `<div style="font-size:12.5px;color:var(--ink2);margin:2px 0 6px">${note}</div>`;
  return h;
}
module.exports = tbl;
