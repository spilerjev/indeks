/* Formule po predmetih za zavihek »Formule« v kvizu. Vir: zapiski v aplikaciji, ZAPISKI.md, vaje.
   Oblika: FORMULAS[predmet] = [{ g: skupina, items: [{ n: ime, f: formula, d?: pojasnilo }] }]
   Dodaj/uredi tukaj, nato: npm run build */
const F = (n, f, d) => (d ? { n, f, d } : { n, f });

module.exports = {
  /* ------------------------------------------------ Poslovne finance 1 ------------------------------------------------ */
  pf1: [
    { g: 'Izkazi in prosti denarni tok', items: [
      F('Bilanca stanja', 'Sredstva = Obveznosti do virov sredstev (lastniški kapital + obveznosti)'),
      F('EBITDA', 'EBITDA = EBIT + amortizacija'),
      F('Davčni ščit obresti', 'obresti · t', 'Dolg stane r_D · (1 − t)'),
      F('NOPAT', 'NOPAT = EBIT · (1 − t)', 'Pri finančnih odločitvah uporabimo mejno davčno stopnjo'),
      F('Prosti denarni tok', 'FCF = EBIT · (1 − t) + amortizacija − naložbe v OS (CapEx) − povečanje operativnega NOK'),
      F('Vrednost podjetja', 'V = Σ FCFₜ/(1 + WACC)ᵗ;  stalni FCF: V = FCF/WACC;  rast g: V = FCF₁/(WACC − g)'),
      F('Vrednost lastniškega kapitala', 'Lastniški kapital = vrednost podjetja − neto dolg'),
    ]},
    { g: 'Kazalniki likvidnosti in solventnosti', items: [
      F('Kratkoročni koeficient', 'KS / KO'),
      F('Pospešeni koeficient', '(KS − zaloge) / KO'),
      F('Hitri koeficient', 'denar (+ kratkoročne fin. naložbe) / KO'),
      F('Delež obveznosti v sredstvih', 'D/A = obveznosti / sredstva'),
      F('Finančni dolg / lastniški kapital', 'D/E = finančni dolg / LK'),
      F('Multiplikator kapitala', 'A/E = sredstva / LK = 1 + D/E'),
      F('Kritje obresti', 'TIE = EBIT / obresti'),
    ]},
    { g: 'Učinkovitost (obračanje)', items: [
      F('Koeficient obračanja zalog', 'stroški prodaje (nabavna vrednost prodanega) / zaloge'),
      F('Koeficient obračanja terjatev', 'prihodki od prodaje / terjatve do kupcev'),
      F('Koeficient obračanja obveznosti do dobaviteljev', 'nabavna vrednost prodanega / obveznosti do dobaviteljev'),
      F('Koeficient obračanja sredstev', 'prihodki od prodaje / sredstva'),
      F('Dnevi vezave', '365 / koeficient obračanja', 'Pravilo: pri »obračanju X« je X v imenovalcu'),
      F('Obrat denarja', 'DVD = DV zalog + DV terjatev − DV obveznosti do dobaviteljev'),
    ]},
    { g: 'Donosnost in tržni kazalniki', items: [
      F('Neto marža', 'čisti dobiček / prihodki od prodaje'),
      F('ROA', 'ROA = čisti dobiček / sredstva = neto marža · obračanje sredstev'),
      F('ROE', 'ROE = čisti dobiček / lastniški kapital'),
      F('DuPont', 'ROE = neto marža · obračanje sredstev · A/E'),
      F('EPS', 'EPS = čisti dobiček / število delnic v obtoku'),
      F('BVPS', 'BVPS = lastniški kapital / število delnic'),
      F('P/E', 'P/E = tečaj / EPS'),
      F('P/B', 'P/B = tečaj / BVPS'),
      F('Dividendna donosnost', 'D/P₀'),
      F('Izplačilno razmerje', 'izplačilno razmerje = dividende / čisti dobiček;  zadržani delež b = 1 − izplačilno razmerje'),
    ]},
    { g: 'Časovna vrednost denarja', items: [
      F('Prihodnja vrednost', 'FV = PV · (1 + r)ⁿ', 'FVIF = (1 + r)ⁿ'),
      F('Sedanja vrednost', 'PV = FV / (1 + r)ⁿ', 'PVIF = 1/(1 + r)ⁿ'),
      F('Več denarnih tokov', 'PV = Σ CFₜ / (1 + r)ᵗ', 'Eksponent = leto toka, ne zaporedna številka'),
      F('FV anuitete', 'FV = A · [(1 + r)ⁿ − 1] / r', 'FVIFA; vrednost ob zadnjem plačilu'),
      F('PV anuitete', 'PV = A · [1 − (1 + r)⁻ⁿ] / r', 'PVIFA; vrednost eno obdobje pred prvim plačilom'),
      F('Anuiteta na začetku obdobij', 'vrednost navadne anuitete · (1 + r)'),
      F('Večna renta', 'PV = A / r;   rastoča: PV = A₁ / (r − g)'),
      F('Obrok posojila', 'A = PV · r / [1 − (1 + r)⁻ⁿ]'),
      F('Pripis m-krat letno', 'FV = PV · (1 + r/m)^(m·n)'),
      F('Efektivna letna mera (EAR)', 'EAR = (1 + r/m)^m − 1'),
      F('Mesečna mera', 'proporcionalna: r/12;  konformna: (1 + r)^(1/12) − 1'),
      F('Iskanje r in n', 'r = (FV/PV)^(1/n) − 1;   n = ln(FV/PV) / ln(1 + r)', 'Leta ne zaokrožujemo navzdol'),
      F('Čas podvojitve', 'n = ln 2 / ln(1 + r) ≈ 72 / R (R v %)'),
      F('Fisherjeva enačba', '(1 + r_nom) = (1 + r_real) · (1 + π);   r_real ≈ r_nom − π'),
    ]},
    { g: 'Obveznice', items: [
      F('Cena obveznice', 'P = C · PVIFA(y, n) + F/(1 + y)ⁿ', 'C = kuponska mera · F; diskontiramo z zahtevano donosnostjo y'),
      F('Polletni kuponi', 'kupon C/2, mera y/2, 2n obdobij'),
      F('Brezkuponska obveznica', 'P = F / (1 + y)ⁿ;   y = (F/P)^(1/n) − 1'),
      F('Večna obveznica', 'P = C / y'),
      F('Tekoča donosnost', 'letni kupon / cena'),
      F('YTM', 'diskontna stopnja, pri kateri je SV plačil = cena (RATE)'),
      F('Premija / diskont', 'kupon > y: premija; kupon < y: diskont; kupon = y: P = F'),
      F('Polna in čista cena', 'polna = čista + natečene obresti;   natečene = kupon · delež obdobja'),
      F('Obrestno tveganje', 'večje pri daljši zapadlosti in nižjem kuponu'),
    ]},
    { g: 'Delnice', items: [
      F('Donosnost delnice', 'r = D₁/P₀ + (P₁ − P₀)/P₀ = dividendna + kapitalska'),
      F('Stalna dividenda', 'P₀ = D / r'),
      F('Gordonov model', 'P₀ = D₁ / (r_E − g),  D₁ = D₀ · (1 + g),  r_E > g'),
      F('Rast iz zadržanega dobička', 'g ≈ b · ROE'),
      F('Implicitna zahtevana donosnost', 'r_E = D₁/P₀ + g'),
      F('Eno obdobje (cena čez leto)', 'P₀ = (D₁ + P₁) / (1 + r);   P₁ = P₀ · (1 + r) − D₁'),
      F('Sestavljeni model', 'Pₙ = Dₙ₊₁ / (r − g);   P₀ = Σ Dₜ/(1 + r)ᵗ + Pₙ/(1 + r)ⁿ'),
    ]},
    { g: 'Tveganje, portfelj in CAPM', items: [
      F('Pričakovana donosnost', 'E(r) = Σ pᵢ · rᵢ'),
      F('Varianca in standardni odklon', 'σ² = Σ pᵢ (rᵢ − E)²;   σ = √σ²'),
      F('Koeficient variacije', 'KV = σ / E'),
      F('Kovarianca in korelacija', 'Cov(A,B) = Σ pᵢ (rA − EA)(rB − EB);   ρ = Cov / (σA σB)'),
      F('Donosnost portfelja', 'E(P) = w₁E₁ + w₂E₂'),
      F('Standardni odklon portfelja', 'σ² = w₁²σ₁² + w₂²σ₂² + 2 w₁ w₂ ρ σ₁ σ₂'),
      F('Beta', 'β = Cov(rᵢ, rₘ) / Var(rₘ) = ρ · σᵢ / σₘ'),
      F('Beta portfelja', 'β_P = Σ wᵢ βᵢ', 'β tržnega portfelja = 1, β netvegane = 0'),
      F('CAPM / SML', 'r_E = r_f + β · (E(rₘ) − r_f)', 'Tržna premija = E(rₘ) − r_f'),
      F('Alfa', 'α = E(r) − zahtevana donosnost (CAPM);  α > 0 podcenjena'),
    ]},
    { g: 'Stroški kapitala', items: [
      F('Strošek zadržanega dobička', 'r_E = D₁/P₀ + g   (ali CAPM)'),
      F('Strošek novih delnic', 'r_E = D₁ / (P₀ · (1 − F)) + g', 'F = flotacijski stroški'),
      F('Strošek dolga po davku', 'r_D · (1 − t)'),
      F('PV davčnega ščita (trajni dolg)', 'PV = t · D'),
      F('WACC', 'WACC = w_E · r_E + w_D · r_D · (1 − t)', 'Uteži po tržnih vrednostih: w_E = E/(E + D)'),
      F('Kapitalski proračun brez novih delnic', 'zadržani dobiček / delež lastniškega kapitala v strukturi'),
    ]},
    { g: 'Naložbene odločitve (vaje 7-8)', items: [
      F('Neto sedanja vrednost', 'NPV = Σ CFₜ / (1 + r)ᵗ − I₀;   sprejmi, če NPV > 0'),
      F('IRR', 'IRR: diskontna stopnja, pri kateri je NPV = 0;   sprejmi, če IRR > WACC'),
      F('Doba povračila', 'čas, ko kumulativni CF preseže naložbo'),
      F('Različne življenjske dobe', 'ekvivalentni letni donos EAA = NPV / PVIFA(r, n)  (ali nadomestitvena veriga)'),
      F('Denarni tok iz poslovanja', 'ΔEBIT · (1 − t) + amortizacija'),
    ]},
  ],

  /* ------------------------------------------------ Statistična analiza ------------------------------------------------ */
  stana: [
    { g: 'Opisna statistika (nerazvrščeni podatki)', items: [
      F('Aritmetična sredina', 'ȳ = (1/n) Σ yᵢ'),
      F('Varianca (ocena)', 's² = Σ (yᵢ − ȳ)² / (n − 1)', 'Populacija: σ² = Σ(yᵢ − μ)²/N'),
      F('Standardni odklon', 's = √s²'),
      F('Variacijski razmik', 'vr = y_max − y_min'),
      F('Koeficient variacije', 'kv = s / ȳ', 'Relativna mera; zahteva razmernostno lestvico'),
    ]},
    { g: 'Razvrščeni podatki (K razredov)', items: [
      F('Sredina razreda', 'yₖ = (yₖ,spodnja + yₖ,zgornja) / 2'),
      F('Frekvence', 'Fₖ = Σ fⱼ (kumulativa);   relativna f°ₖ = fₖ / n;   kumulativa F°ₖ = Fₖ / n'),
      F('Aritmetična sredina', 'ȳ = (1/n) Σ fₖ yₖ'),
      F('Varianca', 's² = Σ fₖ (yₖ − ȳ)² / (n − 1)'),
      F('Kvantil iz frekvenc', 'razred, v katerem kumulativa F° preseže iskani delež (Q₁: 0,25, mediana: 0,5, D₉: 0,9)'),
    ]},
    { g: 'Verjetnostne porazdelitve', items: [
      F('Porazdelitvena funkcija', 'F(y) = P(Y ≤ y);   P(Y = a) = 0 pri zvezni'),
      F('Verjetnost na intervalu', 'P(a < Y ≤ b) = F(b) − F(a);   P(Y > b) = 1 − F(b)'),
      F('Normalna porazdelitev', 'Y ~ N(μ, σ);   Me = Mo = μ (simetrična)'),
      F('Standardizacija', 'z = (y − μ) / σ;   Fᵧ(a) = F_Z(z_a)'),
      F('Vrednost iz verjetnosti', 'y = μ + z · σ   (kvantil: qnorm(p, μ, σ))'),
      F('Pravilo μ ± kσ', '±1σ: 68,27 %;   ±2σ: 95,44 %;   ±3σ: 99,73 %;   ±1,96σ: 95 %'),
      F('Simetrija tabele', 'F_Z(−z) = 1 − F_Z(z)'),
      F('Koliko enot', 'N · P(a < Y ≤ b)'),
    ]},
    { g: 'Vzorčenje', items: [
      F('Vzorčni delež', 'f = n / N'),
      F('Število vzorcev (brez ponavljanja)', 'C(N, n) = N! / (n! (N − n)!)   (R: choose(N, n))'),
      F('Pričakovana vrednost cenilke', 'E(g) = Σ g_v / C(N, n);   nepristranska: E(g) = Γ'),
      F('Varianca cenilke ȳ (ESV brez ponavljanja)', 'Var(ȳ) = σ²/n · (N − n)/(N − 1)'),
      F('Ocena variance cenilke', 'var(ȳ) = s²/n · (N − n)/N'),
      F('Standardna napaka', 'SE(ȳ) = √Var(ȳ);   se(ȳ) = (s/√n) · √((N − n)/N)'),
      F('Velikost vzorca za delež', 'n = N · z² · π(1 − π) / (N · e² + z² · π(1 − π))', 'e = največja napaka, z po α'),
      F('CLI', 'n ≥ 100: g ~ N(E(g), SE(g))'),
    ]},
  ],

  /* ------------------------------------------------ Temelji trženja ------------------------------------------------ */
  trz: [
    { g: 'Vrednost in zadovoljstvo', items: [
      F('Zaznana vrednost', 'zaznana vrednost = celotna vrednost (koristi) − celotni stroški'),
      F('NPS', 'NPS = % promotorjev − % kritikov   (razpon −100 … +100)'),
      F('CLV', 'CLV = Σ dobiček porabnika v letu t / (1 + r)ᵗ  (sedanja vrednost)'),
    ]},
    { g: 'Tržni deleži', items: [
      F('Celotni tržni delež', 'prodaja podjetja / celotna prodaja na trgu · 100'),
      F('Tržni delež na ciljnem trgu', 'prodaja podjetja / prodaja na ciljnem trgu · 100'),
      F('Relativni tržni delež', 'tržni delež podjetja / tržni delež največjega konkurenta', 'Nad 100 %: tržni vodja'),
    ]},
    { g: 'Trženjski splet', items: [
      F('Izdelčni splet (4P)', 'izdelek + cena + tržne poti + trženjsko komuniciranje'),
      F('Storitveni splet (7P)', '4P + ljudje + procesi (postopki) + fizični dokazi', 'Destinacije: 4P + 3P + 2P (politika, sredstva)'),
      F('Širina / dolžina / globina', 'širina = št. skupin izdelkov;  dolžina = skupno št. artiklov;  globina = št. različic v skupini'),
    ]},
  ],

  /* ------------------------------------------------ Ekonomika EU in Slovenija ------------------------------------------------ */
  eeu: [
    { g: 'Mednarodna menjava', items: [
      F('Oportunitetni strošek', 'koliko druge dobrine opustimo za 1 enoto (npr. 1 kopalke = a_B/a_A brisač)'),
      F('Relativna prednost', 'država z NIŽJIM oportunitetnim stroškom; menjava ne poteka, če sta razmerji enaki'),
      F('Interval menjalnega razmerja', 'oportunitetni strošek (država 1) < MR < oportunitetni strošek (država 2)'),
      F('Koristi menjave', 'količina, ki jo država prihrani: dobi dobrino po menjalnem razmerju namesto po domačem oportunitetnem stroških'),
      F('Pokritost uvoza z izvozom', 'izvoz / uvoz · 100'),
      F('Odprtost gospodarstva', '(izvoz + uvoz) / BDP · 100'),
    ]},
    { g: 'Presežki in blaginja', items: [
      F('Uvoz in izvoz', 'uvoz = Qd(P) − Qs(P) pri P < avtarkična cena;   izvoz = Qs − Qd pri P > avtarkična'),
      F('Ravnotežje (avtarkija)', 'Qd(P*) = Qs(P*)'),
      F('Presežka', 'PP: lik pod D in nad ceno;  PrP: lik nad S in pod ceno;   W = PP + PrP'),
    ]},
    { g: 'Carine', items: [
      F('Domača cena po carini (majhna država)', 'P = P_w · (1 + t)'),
      F('Uvoz po carini', 'M = Qd(P_w(1 + t)) − Qs(P_w(1 + t))'),
      F('Carinski prihodek', 'T = t · P_w · M'),
      F('Mrtva izguba', 'trikotnika: ½ · Δ(cena) · ΔQs (proizvodni) + ½ · Δ(cena) · ΔQd (potrošni)'),
      F('Učinek carine na blaginjo', 'ΔW = ΔPP + ΔPrP + carinski prihodek (majhna država: vedno < 0)'),
      F('Velika država', 'P_w pade; domača cena naraste za manj kot t; učinek na W nejasen (optimalna carina)'),
    ]},
    { g: 'Preferencialna liberalizacija', items: [
      F('Vinerjeva nejasnost', 'ΔW = (B + D) − H;   ustvarjanje trgovine (+) proti preusmerjanju (−, izguba carin H)'),
      F('Trade deflection', 'FTA: blago iz tretje države vstopi prek članice z najnižjo carino (rešitev: pravila o poreklu, CU)'),
    ]},
  ],

  /* ------------------------------------------------ MPSP ------------------------------------------------ */
  mpsp: [
    { g: 'Analiza procesa', items: [
      F('Obremenitev resursa', 'vsota časov vseh aktivnosti, pri katerih resurs sodeluje (min/enoto)'),
      F('Zmogljivost enote resursa', '60 / obremenitev (enot/uro);   ali delovni čas / obremenitev'),
      F('Zmogljivost skupine', 'zmogljivost enote · število enot'),
      F('Zmogljivost procesa', 'min zmogljivosti resursov (ozko grlo)'),
      F('Izkoriščenost', 'zmogljivost procesa / zmogljivost resursa'),
      F('TPČ', 'najdaljša pot v procesnem diagramu (kritična pot)'),
      F('Littlov zakon', 'Z = P · PČ;   PČ = Z / P;   P = Z / PČ'),
    ]},
    { g: 'Finančno', items: [
      F('Prispevek za kritje', 'prihodki − variabilni stroški (YG: dobiček po davku v tabeli vaj)'),
      F('Davek in dobiček', 'dobiček iz poslovanja − finančni stroški = celotni dobiček;  davek = 25 % · dobiček'),
    ]},
    { g: 'Napovedovanje in zaloge', items: [
      F('Drseča sredina', 'F_{t+1} = (1/N) · Σ A_{t−N+1 … t}', 'Majhen N: hitro odziven; velik N: bolj gladka'),
      F('Eksponentno glajenje', 'F_{t+1} = α · A_t + (1 − α) · F_t'),
      F('Napaka in KNN', 'e_t = A_t − F_t;   KNN = Σ e_t   (lahko + ali −)'),
      F('MAD', 'MAD = Σ |A_t − F_t| / n'),
      F('Ekonomična količina naročila', 'Q* = √(2 · D · S / H)', 'Višji stroški skladiščenja H → manjša Q, pogostejša naročila'),
    ]},
  ],

  /* ------------------------------------------------ Osnove statistike (1. letnik) ------------------------------------------------ */
  stat: [
    { g: 'Srednje vrednosti in razpršenost', items: [
      F('Aritmetična sredina', 'ȳ = Σ y / n;   iz frekvenc: ȳ = Σ f · y / Σ f'),
      F('Geometrijska sredina', 'G = (y₁ · y₂ · … · yₙ)^(1/n)', 'Za povprečenje stopenj rasti'),
      F('Koeficient variacije', 'KV = σ / AS · 100'),
      F('Variacijski razmik', 'vr = y_max − y_min'),
    ]},
    { g: 'Relativna števila in indeksi', items: [
      F('Struktura', 'f / Σ f · 100;   vsota = 100 %'),
      F('Enostavni indeks', 'I = y₁ / y₀ · 100;   stopnja spremembe = I − 100'),
      F('Deflacioniranje', 'realna vrednost = nominalna / indeks cen · 100'),
      F('Vrednostni indeks', 'I_V = Σ p₁q₁ / Σ p₀q₀ · 100 = I_p · I_q / 100'),
      F('Laspeyres (cene)', 'I_p^L = Σ p₁q₀ / Σ p₀q₀ · 100   (uteži: bazne količine)'),
      F('Paasche (cene)', 'I_p^P = Σ p₁q₁ / Σ p₀q₁ · 100   (uteži: tekoče količine)'),
      F('Fisher', 'I^F = √(I^L · I^P)'),
      F('Relacija (križ)', 'I_V = I_p^L · I_q^P / 100'),
      F('Strukturni premiki', 'I(spremenljiva) / I(stalna) · 100'),
      F('Srednji indeksi', 'TAS (bazne vrednosti p₀q₀) = Laspeyres;  THS (tekoče vrednosti p₁q₁) = Paasche'),
    ]},
    { g: 'Prebivalstvo in aktivnost', items: [
      F('Skupni prirastek', 'naravni prirastek (rojeni − umrli) + selitveni saldo (priseljeni − odseljeni)'),
      F('Splošna stopnja rodnosti', 'SSN = živorojeni / srednje število prebivalcev · 1000'),
      F('Stopnja rodnosti žensk', 'SSR = živorojeni / ženske 15-49 · 1000'),
      F('Koeficient starostne odvisnosti', '(0-14 + 65+) / (15-64) · 100'),
      F('Indeks staranja', '65+ / 0-14 · 100'),
      F('Produktivnost in intenzivnost', 'produktivnost = Q / L;   intenzivnost = L / Q = 1 / produktivnost'),
    ]},
  ],

  /* ------------------------------------------------ Uvod v računovodstvo ------------------------------------------------ */
  rac: [
    { g: 'Bilanca in knjižbe', items: [
      F('Temeljna enačba', 'Sredstva = Obveznosti do virov sredstev (na določen dan)'),
      F('Neodpisana vrednost OOS', 'nabavna vrednost − popravek vrednosti'),
      F('Amortizacija (časovna)', 'AO = nabavna − preostala vrednost;  mesečni strošek = AO / (leta · 12);  začnemo mesec po usposobitvi'),
      F('Prodaja OOS', 'cena = NV: brez izida;  cena > NV: drugi poslovni prihodki;  cena < NV: drugi poslovni odhodki'),
    ]},
    { g: 'Izkaz poslovnega izida', items: [
      F('Odhodki iz stroškov', 'odhodki = stroški ± sprememba zalog (zaloga ↑: stroški − povečanje; zaloga ↓: stroški + zmanjšanje)'),
      F('Kosmati izid od prodaje', 'prihodki od prodaje − proizvajalni stroški prodanih proizvodov (trgovina: nabavna vrednost prodanega blaga)'),
      F('EBIT / EBITDA', 'EBIT = poslovni izid iz poslovanja;  EBITDA = EBIT + amortizacija'),
      F('Poslovni izid', 'prihodki − odhodki;  čisti poslovni izid = celotni izid − davek (DDPO)'),
    ]},
  ],

  /* ------------------------------------------------ Uvod v poslovanje ------------------------------------------------ */
  uvod: [
    { g: 'Stroški in sredstva', items: [
      F('Strošek', 'C = Σ Qᵢ · Pᵢ'),
      F('Nabavna vrednost', 'cena + vsi stroški do začetka delovanja'),
      F('Neodpisana vrednost OS', 'nabavna − odpisana vrednost (kumulativa amortizacije)'),
      F('Koeficient obračanja ObS', 'KO = stroškovna vrednost proizvodnje / povprečno stanje ObS;   dnevi vezave = 360 / KO'),
      F('Potrebni obseg ObS', 'načrtovana stroškovna vrednost proizvodnje / KO'),
      F('Zmogljivost OS', 'integralna = intenzivna · ekstenzivna'),
      F('Ključ za splošne stroške', 'splošni stroški / osnova za razporejanje · 100'),
      F('Lastna cena', 'LC = stroški ene enote učinka'),
    ]},
    { g: 'Uspešnost', items: [
      F('Poslovni izid', 'prihodki − odhodki'),
      F('Ekonomičnost', 'E = Q / C   (prihodki / odhodki; E > 1: dobiček)'),
      F('Produktivnost dela', 'PL = Q / L'),
      F('Rentabilnost', 'ROE = dobiček / kapital;   ROA = dobiček / sredstva'),
      F('Marža in rabat', 'marža: % od nabavne cene;   rabat: % popust od prodajne cene'),
      F('Indeks', '84 = −16 %;   120 = +20 %'),
    ]},
  ],

  /* ------------------------------------------------ Makroekonomija ------------------------------------------------ */
  makro: [
    { g: 'BDP in agregati', items: [
      F('BDP (izdatkovna metoda)', 'BDP = C + I + G + NX'),
      F('BDP (dohodkovna metoda)', 'BDP = plače + dobički + obresti + rente'),
      F('NDP', 'NDP = BDP − amortizacija;   neto naložbe = bruto naložbe − amortizacija'),
      F('Realni BDP in deflator', 'realni = nominalni / deflator · 100;   deflator = nominalni / realni · 100'),
      F('Inflacija', 'π = (P₁ − P₀) / P₀ · 100;   realna obrestna mera ≈ nominalna − inflacija'),
      F('Agregatno povpraševanje', 'AD = C + I + G + NX'),
    ]},
    { g: 'Multiplikatorji in denar', items: [
      F('Multiplikator izdatkov', '1 / MNV = 1 / (1 − MNP)', 'MNP + MNV = 1'),
      F('Davčni multiplikator', '−MNP / (1 − MNP)   (nižji od multiplikatorja izdatkov)'),
      F('Denarni multiplikator', '1 / stopnja obveznih rezerv'),
      F('Kvantitativna teorija', 'M · V = P · Q'),
      F('Ravnovesje', 'S = I (trg blaga, IS);   M = L (trg denarja, LM)'),
    ]},
    { g: 'Proračun', items: [
      F('Proračunski saldo', 'primanjkljaj: T < G;   presežek: T > G;   uravnotežen: T = G'),
      F('Plačilna bilanca', 'tekoči račun + kapitalsko-finančni račun + statistična napaka = 0'),
    ]},
  ],

  /* ------------------------------------------------ Mikroekonomija ------------------------------------------------ */
  mikro: [
    { g: 'Trg in elastičnost', items: [
      F('Ravnotežje', 'Qs = Qd → P*, Q*'),
      F('Cenovna elastičnost', 'E = %ΔQ / %ΔP'),
      F('Davčni prihodek', 'T = t · Q_t'),
      F('Oportunitetni strošek', 'vrednost izgubljene najboljše alternative'),
    ]},
    { g: 'Potrošnik', items: [
      F('Premica cene (proračunska)', 'P_H · H + P_O · O = M;   naklon = −P_H / P_O'),
      F('MRS', 'MRS = MU_H / MU_O = naklon indiferenčne krivulje'),
      F('Optimum potrošnika', 'MRS = P_H / P_O;   MU_A / P_A = MU_B / P_B'),
    ]},
  ],

  /* ------------------------------------------------ Organizacijsko vedenje ------------------------------------------------ */
  ov: [
    { g: 'Motivacija', items: [
      F('Motivacijski potencial dela (Hackman & Oldham)', 'OMP = [(raznolikost + identiteta + pomen) / 3] · avtonomija · povratne informacije'),
      F('Adamsova pravičnost', 'vložki posameznika / rezultati posameznika  =?  vložki reference / rezultati reference'),
      F('Karasek', 'stres = f(zahteve dela, nadzor nad delom)'),
    ]},
  ],

  /* ------------------------------------------------ Informatika ------------------------------------------------ */
  inf: [
    { g: 'Tveganja', items: [
      F('Tveganje', 'Tveganje = P₁ · P₂ · L', 'P₁ = verjetnost grožnje, P₂ = verjetnost uspeha, L = izguba; npr. 0,02 · 0,10 · 1.000.000 € = 2.000 €'),
      F('CIA trikotnik', 'Zaupnost · Celovitost · Razpoložljivost'),
    ]},
  ],
};
