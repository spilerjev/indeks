/* Bundle dist/preview-entry.jsx (React + lucide + supabase + app) -> docs/preview.js */
const esbuild = require('esbuild');
const path = require('path');
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
}).catch(() => process.exit(1));
