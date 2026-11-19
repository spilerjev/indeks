/* 1. letnik: datumi kolokvijev in izpitnih rokov 2026/27 (vir: Leonov koledar, 19. 11. 2026).
   date = en datum; dates = več rokov (app pokaže najbližjega prihodnjega). Modul je seznam predmetov. */
module.exports = [
  { id: 'mikro', parts: [
    { id: 'k2', date: '2026-12-14T19:00' },
    { id: 'izpit', dates: ['2027-01-18', '2027-02-01'] },
  ] },
  { id: 'mat', parts: [
    { id: 'k2', date: '2026-12-15T19:00' },
    { id: 'izpit', dates: ['2027-01-25', '2027-02-09'] },
  ] },
  { id: 'pravo', parts: [
    { id: 'k2', date: '2027-01-05' },
    { id: 'izpit', dates: ['2027-01-20', '2027-02-03'] },
  ] },
  { id: 'uvod', parts: [
    { id: 'k2', date: '2027-01-07T11:00' },
    { id: 'izpit', dates: ['2027-01-22', '2027-02-05'] },
  ] },
  { id: 'mng', parts: [
    { id: 'izpit', dates: ['2027-01-27T08:00', '2027-02-11'] },
  ] },
];
