/* 1. letnik: zvočne razlage (sklop Poslušaj) po delih. Modul je seznam predmetov; add-letnik1-vsebina.js prenese mp.audio.
   Posnetki: docs/podcast/<predmet-del>/, viri (lastni zapiski): docs/podcast-src/<predmet-del>/. */
module.exports = [
  { id: 'pravo', parts: [
    { id: 'k1', audio: [
      { id: 'pravo-k1-ep1', n: 1, title: 'Uvod v pravoznanstvo', sub: 'Osnove poslovnega prava in izpitne pasti', file: 'podcast/pravo-k1/01-pravoznanstvo.m4a', sec: 1498 },
      { id: 'pravo-k1-ep2b', n: 2, title: 'Pravo Evropske unije', sub: 'Kako evropsko pravo povozi slovensko ustavo', file: 'podcast/pravo-k1/02b-pravo-EU-lastni-primeri.m4a', sec: 1235 },
      { id: 'pravo-k1-ep3b', n: 3, title: 'Stvarno pravo', sub: 'Ekonomska logika stvarnega prava', file: 'podcast/pravo-k1/03b-stvarno-pravo-lastni-primeri.m4a', sec: 1291 },
      { id: 'pravo-k1-ep4', n: 4, title: 'Obligacijsko pravo', sub: 'Skrite pasti obligacijskega prava', file: 'podcast/pravo-k1/04-obligacijsko-pravo.m4a', sec: 1732 },
    ] },
  ] },
];
