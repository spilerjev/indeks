#!/usr/bin/env node
/* Prenese najnovejšo zvočno datoteko iz ~/Downloads (NotebookLM) v podcast/<mapa>/NN-slug.m4a in docs/podcast/<mapa>/,
   izpiše naslov iz NotebookLM (iz imena datoteke) in dolžino v sekundah (afinfo) za vpis v part.audio.
   Zagon: node podcast/pull.js eeu-k1 9 velikost-trga-BE-COMP   (brez tretjega argumenta se slug naredi iz naslova)
   Brave mora shranjevati brez vprašanja v Prenosi (brave://settings/downloads). */
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const [folder, nArg, slugArg] = process.argv.slice(2);
if (!folder || !nArg) { console.error('uporaba: node podcast/pull.js <mapa, npr. eeu-k1> <št. epizode> [slug]'); process.exit(1); }
const dl = path.join(process.env.HOME, 'Downloads');
const cands = fs.readdirSync(dl).filter((f) => /\.(m4a|mp3|wav)$/i.test(f) && !f.startsWith('.'))
  .map((f) => ({ f, t: fs.statSync(path.join(dl, f)).mtimeMs })).sort((a, b) => b.t - a.t);
if (!cands.length) { console.error('V ~/Downloads ni zvočne datoteke (.m4a/.mp3). Je prenos v Bravu končan?'); process.exit(2); }
const src = path.join(dl, cands[0].f);
if (Date.now() - cands[0].t > 6 * 3600e3) console.warn('Pozor: najnovejša datoteka je starejša od 6 ur: ' + cands[0].f);
const title = cands[0].f.replace(/\.[^.]+$/, '').replace(/_/g, ' ').trim();
const slug = slugArg || title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
const name = String(nArg).padStart(2, '0') + '-' + slug + path.extname(src).toLowerCase();
const dst1 = path.join(__dirname, folder, name), dst2 = path.join(__dirname, '..', 'docs', 'podcast', folder, name);
for (const d of [dst1, dst2]) { fs.mkdirSync(path.dirname(d), { recursive: true }); if (fs.existsSync(d)) { console.error('Že obstaja: ' + d); process.exit(3); } }
fs.copyFileSync(src, dst2); fs.renameSync(src, dst1);
let sec = null; try { const m = /estimated duration:\s*([\d.]+)/.exec(execSync(`afinfo "${dst1}"`).toString()); sec = m ? Math.round(+m[1]) : null; } catch (e) {}
const mb = (fs.statSync(dst1).size / 1048576).toFixed(1);
console.log(`Premaknjeno: ${cands[0].f}\n  -> podcast/${folder}/${name}\n  -> docs/podcast/${folder}/${name}\n  naslov (NotebookLM): "${title}"\n  dolžina: ${sec} s (${sec ? Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0') : '?'}), ${mb} MB`);
console.log(`\nVrstica za part.audio:\n  { id: '${folder.split('-')[0]}-ep${nArg}', n: ${nArg}, title: 'TODO naslov predavanja', sub: '${title.replace(/'/g, "\\'")}', file: 'podcast/${folder}/${name}', sec: ${sec} },`);
