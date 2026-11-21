# Podcast za Ekonomiko EU (kolokvij 24. 11.) z NotebookLM — navodila

Sedem epizod, ena na predavanje (vaje so priložene svojemu predavanju). Vsaka epizoda ima svojo datoteko in svoj zvezek v NotebookLM, da se voditelja držita ene teme.

## Enkratna nastavitev
0. Brave: `brave://settings/downloads` → izklopi "Ask where to save each file", mapa Prenosi (narejeno 21. 11. 2026).
1. Odpri notebooklm.google.com (prijavljen z računom, ki ima Gemini Pro → višje omejitve NotebookLM).
2. Zgoraj desno **Settings (zobnik) → Output language → Slovenščina**. To velja za vse zvezke; brez tega bo podcast v angleščini.

## Za vsako epizodo (7×)
1. **Create new** zvezek, poimenuj ga po epizodi (npr. „EEU 01 Zgodovina EU").
2. **Add source → Upload** in naloži samo datoteko te epizode iz te mape (`01-zgodovina-EU.md` …).
3. Desno v **Studio → Audio Overview** klikni **Customize** (svinčnik) in prilepi fokus-prompt te epizode (spodaj). Če je na voljo dolžina, izberi **Longer**.
4. **Generate**. Traja 3–8 minut. Poslušaj vsaj začetek in konec: preveri letnice in številke iz prompta. Če kaj ne drži, klikni **Regenerate** z dodanim stavkom „Popravek: …".
5. Tri pike pri posnetku → **Download**. Brave shrani v Prenosi brez vprašanja; nato `node podcast/pull.js eeu-k1 <št. epizode> <slug>` datoteko premakne v `podcast/eeu-k1/` in `docs/podcast/eeu-k1/` ter izpiše naslov in dolžino za vpis v `part.audio` (letnik2-src/eeu.js).

## Splošna pravila za prompt (so že vključena v vsakega spodaj)
Pogovor v slovenščini, dva voditelja, za študenta 2. letnika EF, ki se pripravlja na kolokvij; brez izmišljenih primerov, številke in letnice samo iz vira; na koncu 60-sekundni povzetek „kaj si zapomni za kolokvij".

---

## Fokus-prompti

### 01 — Zgodovina EU (P01)
Pogovor v slovenščini za študenta ekonomije, ki se uči za kolokvij. Držita se izključno vira. Razložita vzroke povezovanja po 2. svetovni vojni (mir, obnova, politika siromašenja sosedov, Morgenthaujev plan), Marshallov načrt, OEEC/OECD, Evropsko plačilno unijo, SEV, Svet Evrope, razliko med federalnim in medvladnim pristopom, ESPJ in Schumanovo deklaracijo (9. 5. 1950), Rimsko pogodbo (podpis 25. 3. 1957, veljava 1. 1. 1958), EFTA, širitve po letih, prazen stol in luksemburški kompromis, evropesimizem, Cassis de Dijon, Enotno evropsko listino, Maastricht, Amsterdam, Lizbono. Letnice ponovita počasi. Ne izmišljujta primerov. Zaključita s povzetkom v 60 sekundah: 10 letnic, ki jih mora študent znati.

### 02 — 1. vaje: nastanek EU (V01)
Pogovor v slovenščini za študenta, ki ponavlja za kolokvij. Vir so rešene naloge z vaj: pojdita skozi njih kot kviz – eden postavi vprašanje z vaj, drugi odgovori in razloži zakaj, nato dodata pogosto napako. Poudarita: ustanoviteljice, zaporedje pogodb, širitve (1973, 1981, 1986, 1995, 2004, 2007, 2013), razliko EGS–EFTA, kopenhagenske kriterije, Phare, člen 50 in izstop VB. Letnice in države naj bodo točne po viru. Končajta s hitrim ponavljanjem vseh širitev po vrsti.

### 03 — Primerjalne prednosti (P02 + V02)
Pogovor v slovenščini. Razložita absolutne (Smith) in primerjalne prednosti (Ricardo) na številčnem primeru iz vira (ne izmišljujta svojih številk), menjalna razmerja in kdaj menjava ne poteka, specializacijo in koristi, pokritost uvoza z izvozom. Drugi voditelj naj igra študenta, ki dela tipične napake pri računanju oportunitetnih stroškov, prvi ga popravlja. Na koncu 60 sekund: postopek v treh korakih, kako rešiš nalogo s primerjalnimi prednostmi.

### 04 — Učinki proste trgovine (P03 + V03)
Pogovor v slovenščini. Razložita presežek potrošnika in proizvajalca, avtarkijo, svetovno ceno, uvozno povpraševanje (MD) in izvozno ponudbo (XS), kdo pridobi in kdo izgubi pri odprtju trgovine (uvoznica proti izvoznici), ter rešene naloge z vaj 3 (presežki, svetovna cena) korak za korakom z besedami, brez grafov: opisujta, kaj se zgodi s ploščinami. Številke samo iz vira. Zaključek: 60 sekund „kaj si zapomni": kdo dobi, kdo izgubi, neto učinek.

### 05 — Carine (P04 + V04)
Pogovor v slovenščini. Razložita MFN carino, ad valorem carino, učinke carine v majhni državi (potrošniki, proizvajalci, država, mrtva izguba B + D) in veliki državi (pogoji menjave E, optimalna carina, kdaj se blaginja poveča), razliko med fiskalnim in proizvodnim učinkom na uvoz, nato carinsko reformo EU in dogovora z ZDA in Kitajsko po viru. Rešene naloge z vaj 4 pojdita korak za korakom. Opozorita na pasti pri računanju. Konec: 60-sekundni povzetek formul in vrstnega reda računanja.

### 06 — Preferencialna liberalizacija (P05 + V05)
Pogovor v slovenščini. Razložita Vinerja: ustvarjanje in preusmerjanje trgovine, Vinerjevo nejasnost, predpostavke modela s tremi državami (H, P, ROW), učinek na partnerico in tretje države, kdaj integracija bolj verjetno poveča blaginjo (Artis in Lee), empirične ugotovitve, spaghetti bowl, zakaj je MFN znižanje v teoriji boljše od FTA. Rešene naloge z vaj 5 razložita korak za korakom (ustvarjanje proti preusmerjanju v številkah iz vira). Konec: 60 sekund „kaj si zapomni za kolokvij".

### 07 — Ekonomske integracije in WTO (P06)
Pogovor v slovenščini. Razložita stopnje integracije od FTA do EMU (kaj se doda na vsaki stopnji), negativno in pozitivno integracijo (Tinbergen), Schengen, pravila WTO za carinske unije (člen 24 GATT), tri stebre WTO, krog iz Dohe, Bali (TFA), Nairobi (kmetijske izvozne subvencije), EUCA. Vir je krajši, zato vsak pojem utrdita s kratkim primerom iz vira in enim vprašanjem, kakršno bi lahko bilo na kolokviju. Konec: 60 sekund ponovitve stopenj integracije po vrsti.


> Pravilo (CLAUDE.md): vir podcasta so SAMO naši zapiski (`docs/podcast-src/*.md`), ne prosojnice, PDF-ji ali izpitna vprašanja.
