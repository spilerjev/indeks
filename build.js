/* indeks. — build: vstavi data.json v indeks-template.jsx → /Users/cocosmacbook/Documents/Claude/Indeks app/indeks-pipeline/dist/indeks-app.jsx
   Pipeline je bil rekonstruiran iz zgrajenega artefakta (vsebina 100% ohranjena).
   DATA je zaenkrat en JSON (data.json). Za urejanje: spreminjaj data.json (ali ga razbij na module in tu sestavi). */
const fs = require('fs');
const DATA = require(require('path').join(__dirname,'data.json'));

// (po želji) pomožnik za iskanje dela predmeta:
function findPart(sid, pid) {
  for (const sem of DATA) for (const su of sem.subjects) if (su.id === sid)
    for (const p of su.parts) if (p.id === pid) return p;
  return null;
}

const tpl = fs.readFileSync(require('path').join(__dirname,'indeks-template.jsx'), 'utf8');
const out = tpl.replace('__DATA_JSON__', JSON.stringify(DATA));
fs.writeFileSync('/Users/cocosmacbook/Documents/Claude/Indeks app/indeks-pipeline/dist/indeks-app.jsx', out);

let q = 0; DATA.forEach(s => s.subjects.forEach(su => su.parts.forEach(p => (p.decks||[]).forEach(d => q += (d.questions||[]).length))));
console.log('Written indeks-app.jsx  |  size: ' + (out.length/1024).toFixed(1) + 'KB  |  total questions: ' + q);
console.log('token replaced: ' + !out.includes('__DATA_JSON__'));
