/* Bundle dist/preview-entry.jsx (React + lucide + supabase + app) -> docs/preview.js
   Nato v docs/index.html vpiše preview.js?v=<hash>, da brskalniki dobijo novo verzijo (cache-busting). */
const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const root = __dirname;

esbuild.build({
  entryPoints: [path.join(root, 'dist/preview-entry.jsx')],
  bundle: true,
  format: 'iife',
  outfile: path.join(root, 'docs/preview.js'),
  loader: { '.jsx': 'jsx' },
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
  minify: true,
  logLevel: 'info',
}).then(() => {
  const js = fs.readFileSync(path.join(root, 'docs/preview.js'));
  const hash = crypto.createHash('sha1').update(js).digest('hex').slice(0, 10);
  const idxPath = path.join(root, 'docs/index.html');
  let html = fs.readFileSync(idxPath, 'utf8');
  html = html.replace(/preview\.js(\?v=[a-f0-9]+)?/, 'preview.js?v=' + hash);
  fs.writeFileSync(idxPath, html);
  console.log('index.html -> preview.js?v=' + hash);
}).catch(() => process.exit(1));
