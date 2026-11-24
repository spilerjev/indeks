/* Test odločanja o tipkah predvajalnika (playerKeyAction v indeks-template.jsx): node test-tipke.js */
const fs = require('fs'), assert = require('assert');
const src = fs.readFileSync(__dirname + '/indeks-template.jsx', 'utf8');
const a = src.indexOf('function playerKeyAction('), b = src.indexOf('/* Mini predvajalnik na dnu zaslona');
assert(a > 0 && b > a, 'funkcija ni najdena');
const f = new Function(src.slice(a, b) + '; return playerKeyAction;')();
const el = (tag, attrs = {}, editable = false) => ({ tagName: tag, isContentEditable: editable, getAttribute: (k) => (k in attrs ? attrs[k] : null) });
const ev = (key, target = el('DIV'), o = {}) => ({ key, target, defaultPrevented: false, ctrlKey: false, metaKey: false, altKey: false, repeat: false, ...o });
assert.strictEqual(f(ev('ArrowLeft'), 'notes'), 'back');
assert.strictEqual(f(ev('ArrowRight'), 'part'), 'fwd');
assert.strictEqual(f(ev(' '), 'quiz'), 'toggle');
assert.strictEqual(f(ev('Enter'), 'quiz'), null);                       // Enter ostane kvizu
assert.strictEqual(f(ev('ArrowDown'), 'quiz'), null);                   // ↑ ↓ ostaneta kvizu
assert.strictEqual(f(ev(' '), 'cards'), null);                          // kartice: presledek obrne
assert.strictEqual(f(ev('ArrowRight'), 'cards'), null);                 // kartice: → znam
assert.strictEqual(f(ev(' ', el('INPUT')), 'notes'), null);             // tipkanje
assert.strictEqual(f(ev('ArrowLeft', el('TEXTAREA')), 'notes'), null);
assert.strictEqual(f(ev(' ', el('DIV', {}, true)), 'notes'), null);     // contenteditable
assert.strictEqual(f(ev(' ', el('BUTTON')), 'notes'), null);            // fokusiran gumb: brez dvojnega dejanja
assert.strictEqual(f(ev(' ', el('DIV', { role: 'button' })), 'notes'), null);
assert.strictEqual(f(ev('ArrowLeft', el('BUTTON')), 'notes'), 'back');  // puščice na gumbu delujejo
assert.strictEqual(f(ev(' ', undefined, { metaKey: true }), 'notes'), null);
assert.strictEqual(f(ev('ArrowLeft', undefined, { altKey: true }), 'notes'), null);
assert.strictEqual(f(ev(' ', undefined, { repeat: true }), 'notes'), null);
assert.strictEqual(f(ev(' ', undefined, { defaultPrevented: true }), 'notes'), null);
assert.strictEqual(f(ev(' '), 'notes', true), null);                    // odprt dialog
console.log('test-tipke: vse v redu');
