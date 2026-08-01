# indeks.

Slovenski študijski pripomoček za 1. letnik EF UL — kvizi, zapiski, kartice in slovar, zgrajen kot en React/JSX artefakt prek Node build pipeline-a.

## Zgradba

- `indeks-template.jsx` — React aplikacija (motor); vsebuje `const DATA = __DATA_JSON__;`.
- `data.json` — vsa vsebina (predmeti, vprašanja, zapiski, kartice, slovar).
- `build.js` — vstavi `data.json` v template → `dist/indeks-app.jsx`.
- `dist/preview-entry.jsx` — vstopna točka (mountanje Reacta).
- `docs/` — objavljen statični build (GitHub Pages servira to mapo).

## Build

```bash
npm install      # esbuild (in react/lucide za bundle)
npm run build    # data → dist/indeks-app.jsx → docs/preview.js
```

Rezultat je v `docs/` (`index.html` + `preview.js`), ki ga servira GitHub Pages.

## Objava

GitHub Pages je nastavljen na vejo `main`, mapa `/docs`. Vsak `git push` po `npm run build` posodobi objavljeno aplikacijo.
