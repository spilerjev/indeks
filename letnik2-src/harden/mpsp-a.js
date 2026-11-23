// MPSP: težji napačni odgovori
module.exports = [
  [ "Kako izračunamo obremenitev resursa?", [ "Čas najdaljše aktivnosti, pri kateri sodeluje", "Povprečje časov vseh aktivnosti v procesu", "Število enot resursa, deljeno s časom" ], 3, "Vsota časov vseh aktivnosti, pri katerih sodeluje" ],
  [ "Kaj je ozko grlo procesa?", [ "Najdaljša aktivnost v procesnem diagramu", "Resurs z največjo zmogljivostjo", "Aktivnost na kritični poti" ], 3, "Resurs z najmanjšo zmogljivostjo; določa zmogljivost procesa" ],
  [ "Kako izračunamo izkoriščenost resursa?", [ "Zmogljivost resursa / zmogljivost procesa", "Obremenitev resursa / število enot", "1 − zmogljivost procesa" ], 3, "Zmogljivost procesa / zmogljivost resursa" ],
  [ "Kaj je zmogljivost skupine resursov?", [ "Obremenitev · število enot", "Najmanjša zmogljivost med enotami skupine", "Skupni čas vseh aktivnosti skupine" ], 3, "Zmogljivost ene enote · število enot" ],
  [ "Kaj je tehnološki pretočni čas (TPČ)?", [ "Čas najkrajše poti v procesnem diagramu", "Seštevek časov vseh aktivnosti v procesu", "Čas aktivnosti, ki je ozko grlo" ], 3, "Čas najdaljše poti (kritična pot)" ],
  [ "Dodamo dodatnega delavca na aktivnost.", [ "Skrajša ga, ker delo opravita dva delavca", "Podaljša ga zaradi usklajevanja med delavcema", "Ne vemo, odvisno od ozkega grla" ], 3, "Ne spremeni ga, poveča lahko zmogljivost" ],
  [ "Kaj pomeni oznaka \"O\"", [ "Odpade", "Ostane enako", "Optimalno" ], 3, "Ne vemo" ]
];
