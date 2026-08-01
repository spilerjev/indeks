# indeks. - predaja projekta (za nadaljevanje v novem chatu)

**indeks.** je slovenski študijski pripomoček (kvizi + zapiski + flashcardi + slovar) za 1. letnik ekonomije na EF UL, zgrajen kot en React/JSX artefakt prek Node.js build pipeline-a.

## Kako nadaljevati v NOVEM chatu
1. V nov chat naloži `indeks-pipeline.zip`.
2. Reci: **"Razširi indeks-pipeline.zip v /home/claude in nadaljuj projekt indeks. po HANDOFF.md."**
3. Claude naj naredi:
   ```bash
   cd /home/claude && unzip -o /mnt/user-data/uploads/indeks-pipeline.zip -d /home/claude
   npm install                # esbuild za validacijo (ali: npm i esbuild --no-save)
   node build.js              # sestavi /mnt/user-data/outputs/indeks-app.jsx
   ```
4. Po VSAKI spremembi: `node build.js`, nato esbuild validacija, nato `present_files indeks-app.jsx`.

Validacija (mora biti brez napak):
```bash
npx esbuild /mnt/user-data/outputs/indeks-app.jsx --bundle --loader:.jsx=jsx \
  --format=esm --outfile=/dev/null --jsx=automatic \
  --external:lucide-react --external:react --external:react-dom
```

## POMEMBNO - stanje pipeline-a (beri najprej)
Delovni imenik se med sejami **ponastavi**. Ta zip je bil **rekonstruiran iz zgrajenega `indeks-app.jsx`**, zato je struktura poenostavljena:

- `indeks-template.jsx` - React aplikacija (motor); vsebuje `const DATA = __DATA_JSON__;`.
- `data.json` - **vsa vsebina** (vsi predmeti, vprašanja, zapiski, flashcardi, slovar) kot en JSON.
- `build.js` - vstavi `data.json` v template -> zapiše `/mnt/user-data/outputs/indeks-app.jsx`. Ima pomožnik `findPart(sid, pid)`.
- `package.json`, `HANDOFF.md`.

**Vsebino se zdaj ureja neposredno v `data.json`** (prej so bili ločeni moduli stat.js, rac.js, rac-knjizbe.js, stat-naloge.js, ov.js ipd. - ti v tem zipu NE obstajajo več, so pa vsi njihovi podatki znotraj data.json). Če želiš spet modularno, razbij data.json na module in jih sestavi v build.js. Vsebina (806 vprašanj) je 100 % ohranjena.

Struktura `data.json`: `[ {id, name, subjects:[ {id, name, tier, parts:[ {id, name, type, decks:[ {id, name, calc?, questions:[...]} ], notes?, flashcards?} ]} ]} ]`.

## Trenutno stanje
- **1007 vprašanj**, čist build, esbuild validira.
- Napolnjeni predmeti: **Osnove statistike** (398), **Pravo družb in poslovno pravo** (201), **Uvod v računovodstvo** (143), **Organizacijsko vedenje** (137), **Informatika** (86), **Makroekonomija 1** (42).
- **Pravo** (dodano 22. 7. 2026, vir: School/Pravo 1/Zapiski + rešitve vaj): k1 = 4 kvizi (uvod v pravoznanstvo, EU, stvarno, obligacijsko; 97 vpr.) + zapiski; k2 = 5 kvizov (korporacijsko splošno, s.p. + osebne družbe, d.o.o., d.d., prenehanje + izvršba + intelektualna lastnina; 104 vpr.) + zapiski; izpit = 4 seti flashcardov (55 kartic). Slovar: ~30 vnosov `subj:"pravo"` v template-u.
- Izvorni moduli za pravo so v `pravo-src/` (k1-*.js, k2-*.js, notes.js, flashcards.js); enkratna skripta `add-pravo.js` jih je že vpisala v data.json (vsebino se naprej ureja v data.json ali prek modulov + ponovni zagon skripte). `data.json.bak` = varnostna kopija pred vpisom prava.
- **build.js je prilagojen za lokalni mac**: bere iz mape pipeline-a, piše v `dist/indeks-app.jsx` (ne več /home/claude in /mnt/user-data). Lokalni predogled: `dist/index.html` + `dist/preview.js` (esbuild bundle z react/lucide iz node_modules).

## Tipi vprašanj (motor jih zna vse)
- **MCQ**: `{q, options[], correct, explanation, more?, wrong?{opt:zakaj-ne}, htmlExpl?, given?, hint?, calc?}`. `wrong` = pojasnilo za posamezno napačno možnost; `htmlExpl`/`given`/`hint`/`more` renderirajo HTML; `calc:true` uvrsti deck med "Računske naloge".
- **match** (povezovanje): `{type:"match", q, pairs:[{term,def}], explanation}`.
- **grid** (dopolni matriko): `{type:"grid", q, cols[], rows:[{label, cells[]}], fixed:["r-c"], explanation}`. Prazne celice se polnijo iz nabora čipov; preverjanje po vrednosti (obvladuje podvojene vrednosti).

## Ključne funkcije motorja (indeks-template.jsx)
- `qid(q)` hashira besedilo vprašanja -> stabilen id (za beleženje uspešnosti).
- Slovar `GLOSSARY` (array `{t,s,b?,d,subj?}`): `b:1`=ujemanje cele besede; `subj:"rac"`=prikaz le pri tem predmetu (vnosi brez `subj` so globalni). Preskočen pri tipih match in grid ter pri definicijskih vprašanjih (da ne izda odgovora).
- **Mešani kviz**: uteženo vzorčenje (`weightedSampleSmart`, decay 0.8^uporab + tema + zgrešena), statistika mešanih se šteje (sintetična ključa `__mix`/`__mixcalc`).
- **Mastery zanka** (na zaključku mešanega kviza): `poolMastery` + `weakestSample`; ko so vsa vprašanja vsaj enkrat pravilna -> "Bravo, obvladaš"; gumb "Ponovi vprašanja, ki jih še ne znam" -> `beginFocus()` cilja najšibkejša (uspešnost < 0.67, od najnižje).
- Temni/svetli način, statistika po predmetu in skupna, razlaga napačnih odgovorov, "Preberi več", flashcardi s SVG.

## Kaj je bilo narejeno v zadnji seji
- **Statistika**: popravki ključev - top-down glavna dejavnost = **52.25** (past hierarhije); strukturni krog = **nasprotna smer urinega kazalca, izhodišče 0° pri uri 3**; vprašanje z 3 napačnimi trditvami prepisano na eno.
- **Glavna dejavnost - konvencija predmeta = "po številu zaposlenih"** (izbral uporabnik, celoten predmet usklajen: teorija, Naloga 10 -> a+b+c+d, zapiski). Metodološko je uradno "dodana vrednost", a izpitni ključ uporablja zaposlene.
- **Grid tip** dodan (matrika klasifikacij ISIC/CPC/... x OZN/Eurostat/SURS).
- **Mešani kviz**: statistika se prikazuje + mastery zanka.
- **Računovodstvo (velika nadgradnja)**: slovar (28 pojmov, subj:"rac"); povezovalne naloge **integrirane v prave kvize** (ne ločen odsek); ~24 novih vprašanj iz predavanj; zapiski (7 sklopov); nov deck **"Knjiženje poslovnih dogodkov"** (24 nalog: dogodek -> knjižba -> razlaga debet/kredit, iz vaj "Vrste knjižb").

## Odprti TODO-ji
- **Računovodstvo - računske naloge** (svoj razdelek, `calc:true`): metode vrednotenja proizvodov (Super Frost, "Metoda"), amortizacija (Ciklon), časovne razmejitve kot T-konti, prodaja OOS (3 scenariji). Vir na Drive (mapa Racunovodstvo/Vaje, PDF-ji "Metode vrednotenja proizvodov", "Aktivne in pasivne časovne razmejitve").
- Več nalog knjiženja (gotovinska prodaja z DDV + stroški prodanih hkrati).
- Pretekli **izpiti** (Drive: Racunovodstvo/Izpiti) - vključi.
- **Statistika**: vzorčenje (vzorčne ocene, napake), uravnoteženje dolžine odgovorov.
- Namestitev / računi / deljenje (deployment).

## Drive (računovodstvo)
- Racunovodstvo (root): `1vpGCyNlvL7aKLiPQR1E6LhxMJ8EUYsfU`
- Predavanja: `1zFTISNuRMJaAG06S1z2G0vKrwTQ5ir7a` (15 PDF)
- Vaje: `1iHSi57EQo6wwd9v4bXMYbuJooW3AXiRE` | Izpiti: `171h0cg7Y0QEXXamgFspyw049RDzNB6QT` | Zapiski: `1fzO0rxJ0QOTTRp4VhXCXHQWjnsDvynJt`
- "Vrste knjižb.pdf": `1WXnvuhydAcSeHkuSNBqNEeeVWxO6Ddz4`
- Drive poizvedbe delujejo prek `parentId = '...'` (ne `in parents`).

## Preference (uporabnik: Coco / leon.spiler)
- Bodi **strog in direkten**, ne sprejemaj vsega; nasprotuj z argumenti, kadar je treba (uporabnik to izrecno želi, da ne zaupa preveč AI-ju).
- Vsak dolgi pomišljaj "-" nadomesti s kratkim "-".
- Slovenske strokovne termine ohrani (npr. zožena/polna lastna cena), tudi če je sicer privzeta angleščina.
- Cilj ocene pri predmetih je "samo prestati"; vsebina naj bo točna in izpitno uporabna.
