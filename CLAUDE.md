# indeks. - pravila za vsebino (avtorske pravice)

Velja za VSO novo in predelano vsebino: kvize, zapiske, kartice, slike in podcaste. Podlaga: dopis UL študentom o študijskih gradivih (https://arhiv.pf.uni-lj.si/media/dopis.za.studente.pdf), Izpitni pravilnik EF (16. 6. 2025, 34. člen) in ZASP (5., 9., 50., 51. in 101. člen). Pregled je bil narejen 20. 11. 2026. Cilj: do januarja 2027 je vsa vsebina lastna, ker je možna plačljiva verzija od 2. semestra.

## Dovoljeno
- **Lastni zapiski:** povzetki, razlage in primeri z lastnimi besedami, urejeni po temah (ne po prosojnicah ali številkah predavanj). Javni viri (»vir: SURS«, Eurostat, zakon, avtor teorije) se navajajo.
- **Brez pripisov internih virov v vsebini appa:** nobenih sklicev na prosojnice, strani PDF, imena datotek, številke predavanj in vaj (»P04«, »V04«, »Vaje 3, naloga 1«), Canvas, učbenik po straneh ali osebe (»profesor je rekel«, »asistent«, imena pedagogov). Velja za zapiske, kartice, vprašanja, razlage, slike (tudi besedilo v SVG in imena datotek), naslove epizod in besedila vmesnika. Zasebni `ZAPISKI.md` v mapi School lahko vire obdržijo; pretvorba jih odstrani (`letnik2-src/notes-sources.js`, `notes-fixes.js`), gradnja pa pade ob novem pripisu (`sources-lint.js`).
- **Naloge z vaj in zgledi iz učbenika** so tuje delo, enako kot izpitna vprašanja: v kvizih, zapiskih in slikah jih nadomesti z lastnim primerom (nov scenarij, nove številke, na novo izračunana rešitev).
- **Študijski primeri z vaj ne sodijo v app, tudi če so o resničnih podjetjih** (npr. Starbucks, Google Glass, Argeta, Duolingo, YG): isto snov ponazori z lastnim, izmišljenim primerom. Velja za zapiske, kvize, kartice, slike in vire podcastov. Odločitev lastnika, 23. 11. 2026.
- **Dejstva, ideje, načela, formule in letnice** (npr. EFTA 1960, Rimska pogodba 1957). Ti po 9. členu ZASP niso varovani, zato jih smeš uporabiti tudi, če so bili na izpitu.
- **Lastni grafi in slike** (SVG iz `figures/`, lastne risbe). Javni podatki (SURS, Eurostat) z navedbo vira.
- **Podcasti (NotebookLM)**, če so viri SAMO naši zapiski (`docs/podcast-src/*.md`) in ne prosojnice, PDF-ji predavanj ali izpiti.

## Ni dovoljeno
- **Dobesedna ali skoraj dobesedna izpitna in kolokvijska vprašanja.** Vprašanja v slogu izpita piši na novo: lastna formulacija, nove številke (rešitev ponovno izračunaj in preveri), lastne napačne možnosti. Ko je snov ista, je to v redu.
- **Oznake izvora:** »(Izpit 2017)«, »Kolokvijsko vprašanje 2019«, »Pretekli izpit (2. rok 2021)«, »Delni test 2023«, »s fotografij izpitov« ipd. v imenih kompletov, vprašanjih ali razlagah. Dovoljeno je: »v slogu izpita«, »pogosta tema na izpitu«.
- **Kopije tujih slik:** posnetki prosojnic, fotografije table ali predavanj, slike iz učbenikov. Nariši na novo kot lasten graf. Slike z Wikimedie samo z ustrezno licenco in navedbo avtorja.
- **Snemanje predavanj** in dobesedni prepisi predavanj kot vsebina appa.
- **V podcastu (`docs/podcast-src/`, npr. `99-kaj-sprasujejo.md`) ne beri dobesednih izpitnih vprašanj.** Veljajo ista pravila kot za kvize.

## Ob vsakem dodajanju vsebine
Preden zaključiš, preveri: ali je karkoli prepisano iz izpita, prosojnice ali fotografije? Če je, predelaj ali odstrani.

# Stalni id (statistika uporabnikov) - BERI PRED VSAKO SPREMEMBO VPRAŠANJ

**`id` vprašanja ter ID kompleta, dela in predmeta se nikoli ne spremenijo in nikoli ponovno ne uporabijo.** Na njih so ključeni statistika po vprašanju v brskalniku (`indeks.qstat.v1`, `indeks.mixuse.v1`, `indeks.rankedseen.v1`), vprašanja v matchih (`question_ids`) in rezultati po kompletih (`user_stats`, pot `sem/predmet/del/komplet`, tudi v URL-ju). Sprememba = uporabnikom se ponastavi statistika (to se je zgodilo 20. 11. 2026 in se ne sme ponoviti).

- **Vsako vprašanje v `data.json` ima polje `id`** (prvo polje v objektu). Prvotni id-ji (21. 11. 2026) so hash besedila (= stari qid), novi so naključni `i` + 10 šestnajstiških znakov. Isti `id` smejo nositi samo vprašanja z enako vsebino (`q`, `options`, `correct`, `pairs`, `type`; razlaga ne šteje), npr. isti komplet v `k2` in `izpit`.
- **Popravek besedila ali možnosti:** spremeni besedilo, `id` ostane. Nikoli ne briši vprašanja in ga ne dodajaj na novo, da bi ga »popravil«.
- **Moduli v `letnik1-src/` in `letnik2-src/`** so vir resnice za svoje komplete. Vprašanje v modulu nosi id izrecno: `withId('q1abc', Q('besedilo', [...], 0, 'razlaga'))` ali `{ id: 'q1abc', q: ... }`. `add-letnik1-vsebina.js`, `add-letnik2-vsebina.js` in `sync-decks.js` (prek `ids-lib.js`) vzamejo id iz modula, sicer ga podedujejo od vprašanja z natanko enakim besedilom v starem kompletu, sicer dodelijo novega in izpišejo opozorilo. Ko v modulu spremeniš besedilo vprašanja brez `withId`, dobi nov id, stari izgine in **gradnja pade** - to je namerno.
- **`node assign-ids.js`**: novim vprašanjem brez id dodeli id in jih vpiše v `ids-manifest.json`. Je edini ukaz, ki piše manifest; `build.js` nikoli ne piše v `data.json`. `node assign-ids.js --check` samo preveri. Namerno odstranjeno vprašanje: `node assign-ids.js --retire <id> "razlog"` (id gre med upokojene in ga nihče več ne sme uporabiti).
- **`ids-manifest.json`** (sledena): `active` = vsi id-ji v uporabi (vrednost je informativen hash vsebine), `retired` = upokojeni z datumom in razlogom. **`build.js` pade**, če: vprašanje nima id; isti id nosi različno vsebino; id iz `active` manjka in ni upokojen; je uporabljen upokojen id; sta v istem delu dva kompleta z istim ID (tudi po `regroup.js`); je star ključ iz aliasa živ id.
- **`qid-alias.json`** (sledena): `alias` = star hash besedila -> nov id (predelava 20. 11. 2026), `copy` = hash -> novi id-ji, ki dobijo kopijo statistike. Migracija v `indeks-template.jsx` (`migrateQids`) teče ob vsakem zagonu aplikacije. **Te datoteke in migracijske kode nikoli ne krajšaj in ne odstranjuj** - brskalnik, ki appa ni odprl mesece, mora dobiti isti prenos. Test: `npm run build:data && node test-qid-migracija.js`.
- **ID kompleta, dela ali predmeta ne preimenuj** (tudi če nosi izvor v imenu, npr. `*-stari`). Ime (`name`) se sme spremeniti. Preimenovanje ID-ja bi zahtevalo alias poti v lokalni statistiki, `mergeStats` in `community_stats`.
- **Enkratne skripte** (`add-pravo.js`, `add-mikro.js`, `add-uvod.js`, `add-pravo-vaje*.js`, `add-makro-quiz.js`) so onemogočene, ker bi ponoven zagon izbrisal ali podvojil komplete. Nove vsebine ne dodajaj z enkratnimi skriptami, ki zamenjajo cel seznam kompletov.
