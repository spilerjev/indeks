/* Lastni grafi za zapiske 2. letnika (preglasitve razdelkov, letnik2-src/notes-overrides.js, 22. 11. 2026).
   Moduli figures/zapiski/<predmet>.js izvozijo { 'z-<predmet>-…': () => svg }. Izvoz `notes` (ne `figs`):
   grafi se vstavijo v zapiske kot SVG ob renderju (notes-sources.js), v razlage kvizov ne gredo. */
const fs = require('fs'), path = require('path');
const notes = {}, DIR = path.join(__dirname, 'zapiski');
for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.js')).sort()) for (const [id, fn] of Object.entries(require(path.join(DIR, f)))) {
  if (notes[id]) throw new Error('Graf za zapiske ' + id + ' je definiran dvakrat (' + f + ')');
  notes[id] = fn;
}
module.exports = { notes };
