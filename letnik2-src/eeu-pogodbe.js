/* Ekonomika EU: interaktivna časovnica pogodb (klik na pogodbo jo razširi).
   Vstavi se na vrh zapiskov kolokvija prek part.notesHtml (glej add-letnik2-vsebina.js).
   Barve: ust = ustanovitvena, spr = spreminjevalna, nev = ni začela veljati. */

const T = (cls, year, inForce, name, short, body) => `
<details class="tl tl-${cls}"><summary><span class="tl-y">${year}<small>${inForce}</small></span><span class="tl-t"><b>${name}</b><small>${short}</small></span></summary>
<div class="tl-body">${body}</div></details>`;

const L = (items) => '<ul>' + items.map((i) => `<li>${i}</li>`).join('') + '</ul>';

module.exports = `<h2>📜 Časovnica pogodb EU (klikni pogodbo za podrobnosti)</h2>
<div class="tl-legend"><span class="tl-dot tl-ust"></span>ustanovitvena <span class="tl-dot tl-spr"></span>spreminjevalna <span class="tl-dot tl-nev"></span>ni začela veljati</div>
<div class="tl-wrap">
${T('ust', '1951', 'velja 1952', 'Pariška pogodba (ESPJ)', 'Skupni trg premoga in jekla, 6 držav', `
<p><b>Podpis:</b> 18. 4. 1951, Pariz · <b>velja:</b> 23. 7. 1952 · <b>potekla:</b> 23. 7. 2002 (sklenjena za 50 let).</p>
<p><b>Ozadje:</b> Schumanova deklaracija <b>9. 5. 1950</b> (danes dan Evrope), idejni oče Jean Monnet. Cilj je bil pod skupni nadzor postaviti vojno industrijo, da bi vojna med Francijo in Nemčijo postala »materialno nemogoča«.</p>
<p><b>Kaj je prinesla:</b></p>
${L([
  '<b>Evropsko skupnost za premog in jeklo (ESPJ)</b>: odprava carin in količinskih omejitev pri trgovini s premogom in jeklom.',
  '<b>6 ustanoviteljic:</b> Francija, Z. Nemčija, Italija, Belgija, Nizozemska, Luksemburg.',
  '<b>Visoka oblast</b> je bila prvi <b>nadnacionalni</b> organ (prvi predsednik Monnet) in predhodnica Evropske komisije. Poleg nje so nastali Posebni svet ministrov, Skupna skupščina (predhodnica EP) in Sodišče.',
])}
<div class="tip"><b>Za izpit:</b> to je prvi primer <b>federalnega (nadnacionalnega) pristopa</b>. Po izteku leta 2002 so dejavnosti ESPJ prenesli v Evropsko skupnost.</div>`)}
${T('ust', '1957', 'velja 1958', 'Rimski pogodbi (EGS + Euratom)', 'Carinska unija, skupni trg, SKP', `
<p><b>Podpis:</b> 25. 3. 1957, Rim · <b>velja:</b> 1. 1. 1958. Sta dve pogodbi, zato govorimo o »Rimskih pogodbah«.</p>
<p><b>Ozadje:</b> konferenca v Messini (1955) in Spaakovo poročilo. Po neuspehu Evropske obrambne skupnosti (1954) so se integracije lotili prek gospodarstva.</p>
<p><b>Kaj sta prinesli:</b></p>
${L([
  '<b>EGS (Evropska gospodarska skupnost)</b> s ciljem <b>skupnega trga</b>: štiri svoboščine (blago, storitve, osebe, kapital).',
  '<b>Carinska unija:</b> odprava carin med članicami in <b>skupna zunanja carinska tarifa</b>. Dokončana je bila <b>1. 7. 1968</b>, leto in pol pred rokom.',
  '<b>Skupna kmetijska politika (SKP)</b>, ki deluje od 1962, ter skupna trgovinska in prometna politika in pravila konkurence.',
  'Usklajevanje <b>posrednih</b> davkov (prometni davek, kasneje DDV), kolikor je potrebno za skupni trg.',
  '<b>Euratom</b>: skupno miroljubno razvijanje jedrske energije.',
])}
<p><b>Česa NI bilo:</b> monetarne unije, zunanje in varnostne politike, neposrednih davkov in fiskalne politike. Integracija je bila <b>ekonomska, ne politična</b>.</p>
<div class="tip"><b>Za izpit:</b> EGS je predhodnica EU. Pazi na past: carinska unija je nastala z Rimom (1957/1968) in ne z Maastrichtom.</div>`)}
${T('spr', '1965', 'velja 1967', 'Pogodba o združitvi', 'Skupna Komisija in Svet za tri skupnosti', `
<p><b>Podpis:</b> 8. 4. 1965, Bruselj · <b>velja:</b> 1. 7. 1967.</p>
<p><b>Kaj je prinesla:</b></p>
${L([
  'Za vse tri skupnosti (ESPJ, EGS, Euratom) uvede <b>eno Komisijo</b> in <b>en Svet</b>. Skupščina in Sodišče sta bila skupna že od 1958.',
  'Skupnosti ostanejo <b>pravno ločene</b>, skupaj se imenujejo <b>»Evropske skupnosti«</b>.',
  'Uvede enoten proračun za upravne izdatke.',
])}
<p><b>Sočasno dogajanje (ni del pogodbe):</b> kriza »praznega stola« 1965/66, ko je de Gaulle bojkotiral Svet zaradi glasovanja z večino. Končala se je z <b>Luksemburškim kompromisom (1966)</b>, po katerem ima država pri »vitalnih nacionalnih interesih« dejansko veto.</p>`)}
${T('spr', '1986', 'velja 1987', 'Enotni evropski akt (EEA)', 'Enotni trg do konca 1992', `
<p><b>Podpis:</b> februar 1986 (Luxembourg in Haag) · <b>velja:</b> 1. 7. 1987.</p>
<p><b>Ozadje:</b> »evrosklerosis« (stagnacija v 1970-ih), Delorsova Komisija in <b>Bela knjiga (1985)</b> s približno 300 ukrepi za odpravo netarifnih ovir.</p>
<p><b>Kaj je prinesel:</b></p>
${L([
  'Cilj <b>notranjega (enotnega) trga do 31. 12. 1992</b>: prost pretok blaga, storitev, oseb in kapitala brez netarifnih ovir.',
  '<b>Kvalificirana večina</b> v Svetu za ukrepe notranjega trga, kar pomeni manj vetov.',
  '<b>Postopek sodelovanja</b>, s katerim dobi Evropski parlament več vpliva.',
  'V pogodbo prvič zapiše <b>Evropski svet</b> in <b>evropsko politično sodelovanje</b> (zunanja politika).',
  'Nova področja: okolje, raziskave in razvoj ter ekonomska in socialna kohezija. Na njegovi podlagi je 1989 nastalo Sodišče prve stopnje.',
])}
<div class="tip"><b>Za izpit:</b> EEA je <b>prva večja sprememba</b> Rimskih pogodb. Njegovo bistvo je enotni trg.</div>`)}
${T('spr', '1992', 'velja 1993', 'Maastricht (Pogodba o EU)', 'Nastanek EU, 3 stebri, EMU', `
<p><b>Podpis:</b> 7. 2. 1992, Maastricht · <b>velja:</b> 1. 11. 1993. Uveljavitev se je zamaknila, ker so Danci na referendumu 1992 rekli NE (sprejeli so jo 1993 z izjemami), Francozi pa so jo potrdili le tesno (približno 51 %).</p>
<p><b>Kaj je prinesla:</b></p>
${L([
  '<b>Nastane Evropska unija</b>, EGS pa se preimenuje v <b>Evropsko skupnost (ES)</b>.',
  '<b>Tri stebri:</b> 1. Evropske skupnosti (nadnacionalno), 2. SZVP (medvladno), 3. pravosodje in notranje zadeve (medvladno).',
  '<b>EMU v treh fazah</b> in euro najpozneje do 1999. <b>Konvergenčni kriteriji:</b> inflacija, primanjkljaj ≤ 3 % BDP, dolg ≤ 60 % BDP, dolgoročne obrestne mere in stabilen tečaj v ERM.',
  '<b>Državljanstvo EU</b>, s katerim pridobiš volilno pravico na lokalnih in evropskih volitvah v državi bivanja.',
  '<b>Postopek soodločanja</b>, ki da EP enakopravno vlogo s Svetom na nekaterih področjih.',
  'Načelo <b>subsidiarnosti</b>, kohezijski sklad in Odbor regij.',
  '<b>Izjeme (opt-out):</b> VB in Danska pri EMU, VB pri socialnem poglavju (zato je to le protokol).',
])}
<div class="tip"><b>Za izpit:</b> »Od kdaj imamo EU?« Odgovor je <b>1. 11. 1993</b> in ne 1992 (takrat je bila le podpisana).</div>`)}
${T('spr', '1997', 'velja 1999', 'Amsterdamska pogodba', 'Schengen v EU, premik v 1. steber', `
<p><b>Podpis:</b> 2. 10. 1997 · <b>velja:</b> 1. 5. 1999.</p>
<p><b>Kaj je prinesla:</b></p>
${L([
  '<b>Schengenski pravni red</b> postane del EU. Sam sporazum je bil podpisan 1985 izven pogodb, VB in Irska imata izjemo.',
  '<b>Azil, vize in priseljevanje</b> se preselijo iz 3. v <b>1. steber</b> (»območje svobode, varnosti in pravice«).',
  'Preostanek 3. stebra se preimenuje v <b>policijsko in pravosodno sodelovanje v kazenskih zadevah</b> (PJSZ).',
  '<b>Socialno poglavje</b> se preseli v besedilo pogodbe, ker VB (Blair) opusti izjemo. Doda se tudi poglavje o <b>zaposlovanju</b>.',
  'Razširi soodločanje (EP okrepljen) in uvede <b>Visokega predstavnika za SZVP</b> (prvi je bil Javier Solana).',
  'Uvede <b>tesnejše (okrepljeno) sodelovanje</b>, kar pomeni, da lahko skupina držav gre hitreje naprej.',
])}
<div class="tip"><b>Past:</b> <b>Pakt za stabilnost in rast (1997)</b> je sprejet istega leta, a NI del Amsterdamske pogodbe (sestavljajo ga resolucija in uredbe).</div>`)}
${T('spr', '2001', 'velja 2003', 'Pogodba iz Nice', 'Priprava institucij na širitev 2004', `
<p><b>Podpis:</b> 26. 2. 2001 · <b>velja:</b> 1. 2. 2003. Irci so jo na referendumu 2001 zavrnili, 2002 pa sprejeli.</p>
<p><b>Ozadje:</b> pred širitvijo s 15 na 25+ držav je bilo treba rešiti »amsterdamske ostanke«, tj. institucionalna vprašanja, ki jih Amsterdam ni rešil.</p>
<p><b>Kaj je prinesla:</b></p>
${L([
  '<b>Velikost Komisije:</b> en komisar na državo, zato velike države izgubijo drugega komisarja.',
  '<b>Nova razdelitev glasov v Svetu</b> (ponderiranje) in »trojna večina« (glasovi, države, prebivalstvo).',
  'Več odločanja s <b>kvalificirano večino</b>, nova razdelitev sedežev v EP in lažje okrepljeno sodelovanje.',
  'Ob vrhu v Nici (2000) je bila razglašena <b>Listina EU o temeljnih pravicah</b>, vendar le politično in še ne zavezujoče.',
])}
<div class="tip"><b>Za izpit:</b> Nica je bila »tehnična« pogodba, katere namen je bil pripraviti institucije na <b>veliko širitev 2004</b>.</div>`)}
${T('nev', '2004', 'zavrnjena 2005', 'Pogodba o ustavi za Evropo', 'Propadla na referendumih FR in NL', `
<p><b>Podpis:</b> 29. 10. 2004, Rim · <b>ni začela veljati</b>.</p>
<p><b>Ozadje:</b> pripravila jo je <b>Konvencija o prihodnosti Evrope</b> (2002-03, predsedoval Valéry Giscard d'Estaing). Nadomestila naj bi vse dotedanje pogodbe z enim besedilom.</p>
${L([
  'Zavrnjena je bila na referendumih v <b>Franciji (29. 5. 2005)</b> in na <b>Nizozemskem (1. 6. 2005)</b>, nato je sledilo »obdobje razmisleka«.',
  'Vsebovala je simbole države (zastavo, himno, ime »ustava«, »evropski zunanji minister«), kar je bilo politično sporno.',
  'Večina vsebine je kasneje prešla v <b>Lizbonsko pogodbo</b>, simboli pa so bili izpuščeni.',
])}`)}
${T('spr', '2007', 'velja 2009', 'Lizbonska pogodba', 'Konec stebrov, pravna osebnost, čl. 50', `
<p><b>Podpis:</b> 13. 12. 2007 · <b>velja:</b> 1. 12. 2009. Irci so jo na referendumu 2008 zavrnili, 2009 pa sprejeli. Nastala je kot nadomestilo za propadlo ustavo.</p>
<p><b>Kaj je prinesla:</b></p>
${L([
  '<b>Ukine stebre</b>, EU dobi <b>pravno osebnost</b> in nadomesti Evropsko skupnost.',
  'Temelj sta dve pogodbi: <b>PEU</b> (Pogodba o EU) in <b>PDEU</b> (Pogodba o delovanju EU).',
  '<b>Čl. 50 PEU</b> prvič uredi <b>izstop</b> iz EU z dvoletnim rokom za pogajanja. Uporabilo ga je Združeno kraljestvo (Brexit, izstop 31. 1. 2020).',
  '<b>Stalni predsednik Evropskega sveta</b> z mandatom 2,5 leta (prvi je bil Herman Van Rompuy). Evropski svet in ECB postaneta instituciji EU.',
  '<b>Visoki predstavnik za zunanje zadeve in varnostno politiko</b>, ki je hkrati podpredsednik Komisije (prva je bila Catherine Ashton).',
  '<b>Redni zakonodajni postopek</b> (soodločanje kot pravilo), ki EP postavi ob bok Svetu.',
  '<b>Dvojna večina</b> v Svetu od 2014: <b>55 % držav</b> in <b>65 % prebivalstva</b>.',
  '<b>Listina o temeljnih pravicah</b> postane pravno zavezujoča.',
  '<b>Evropska državljanska pobuda</b> z 1 milijonom podpisov ter večja vloga nacionalnih parlamentov (nadzor subsidiarnosti, »rumeni karton«).',
])}
<div class="tip"><b>Mnemonik:</b> »KONEC, OSEBA, IZHOD« pomeni konec stebrov, pravno osebnost in čl. 50 za izhod.</div>`)}
</div>
<div class="note-card"><h3>Širitve EU</h3>
<div class="tbl"><table><tr><th>Leto</th><th>Države</th><th>Skupaj</th></tr>
<tr><td>1958</td><td>ustanoviteljice: Francija, Z. Nemčija, Italija, Belgija, Nizozemska, Luksemburg</td><td>6</td></tr>
<tr><td>1973</td><td>VB, Irska, Danska</td><td>9</td></tr>
<tr><td>1981</td><td>Grčija</td><td>10</td></tr>
<tr><td>1986</td><td>Španija, Portugalska</td><td>12</td></tr>
<tr><td>1995</td><td>Avstrija, Švedska, Finska</td><td>15</td></tr>
<tr><td>2004</td><td><b>Slovenija</b>, Češka, Slovaška, Poljska, Madžarska, Estonija, Latvija, Litva, Malta, Ciper</td><td>25</td></tr>
<tr><td>2007</td><td>Bolgarija, Romunija</td><td>27</td></tr>
<tr><td>2013</td><td>Hrvaška</td><td>28</td></tr>
<tr><td>2020</td><td>izstop VB (čl. 50)</td><td>27</td></tr>
</table></div>
<div class="tip"><b>Mnemonik za vrstni red pogodb:</b> P → R → Z → EEA → M → A → N → (U) → L, torej Pariz, Rim, Združitev, Enotni akt, Maastricht, Amsterdam, Nica, (Ustava), Lizbona.</div>
</div>
`;
