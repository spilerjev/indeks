/* 1. letnik: zvočne razlage (sklop Poslušaj) po delih. Modul je seznam predmetov; add-letnik1-vsebina.js prenese mp.audio.
   Posnetki: docs/podcast/<predmet-del>/, viri (lastni zapiski): docs/podcast-src/<predmet-del>/. */
module.exports = [
  { id: 'pravo', parts: [
    { id: 'k1', audio: [
      { id: 'pravo-k1-ep1', n: 1, title: 'Uvod v pravoznanstvo (vaje 1)', sub: 'Osnove poslovnega prava in izpitne pasti', file: 'podcast/pravo-k1/01-pravoznanstvo.m4a', sec: 1498 },
      { id: 'pravo-k1-ep2', n: 2, title: 'Pravo Evropske unije (vaje 2)', sub: 'Pasti zloglasnega kolokvija iz prava EU', file: 'podcast/pravo-k1/02-pravo-EU.m4a', sec: 1110 },
      { id: 'pravo-k1-ep3', n: 3, title: 'Stvarno pravo (vaje 3 in 4)', sub: 'Stvarno pravo od posesti do hipoteke', file: 'podcast/pravo-k1/03-stvarno-pravo.m4a', sec: 2134 },
    ] },
  ] },
];
