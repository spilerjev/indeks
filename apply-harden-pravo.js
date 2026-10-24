/* Težji odgovori za Pravo: node apply-harden-pravo.js && npm run build */
const fs = require('fs'), path = require('path');
const { applyHarden } = require('./harden-lib');
const DATA = path.join(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(DATA, 'utf8'));
const bak = DATA + '.bak-preharden-pravo';
if (!fs.existsSync(bak)) fs.writeFileSync(bak, JSON.stringify(data));
const subj = data.flatMap((s) => s.subjects).find((x) => x.id === 'pravo');
const qs = subj.parts.flatMap((p) => (p.decks || []).flatMap((d) => d.questions));
const dir = path.join(__dirname, 'harden-pravo');
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort()) applyHarden(qs, require(path.join(dir, f)), f);
fs.writeFileSync(DATA, JSON.stringify(data));
