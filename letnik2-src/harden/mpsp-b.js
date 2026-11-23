// MPSP: težji napačni odgovori, 2. serija (november 2026).
module.exports = [
  [ "Kaj je ozko grlo procesa?", [ "Aktivnost z najdaljšim časom v procesnem diagramu", "Resurs z največjo zmogljivostjo, ki je najbolj obremenjen", "Aktivnost na kritični poti, ki traja najdlje" ], 3, "Resurs z najmanjšo zmogljivostjo, ki določa zmogljivost" ],
  [ "Kako zaokrožimo cikel, ki ni celo število", [ "Navzgor - da ne preobremenimo mest", "Na najbližje celo število", "Ga ne zaokrožujemo, ostane decimalen" ], 1, "Navzdol - da dosežemo količino" ],
  [ "Kako izračunamo minimalno število delovnih mest?", [ "c / Σt, zaokroženo navzgor", "Σt · c, zaokroženo navzdol", "Σt / c, zaokroženo navzdol" ], 0, "Σt / c, zaokroženo navzgor" ],
  [ "Kako izračunamo učinkovitost linije?", [ "c / Σt", "n · c / Σt", "1 − Σt/(n · c)" ], 1, "Σt / (n · c)" ],
  [ "Katero pravilo uporabljamo pri razporejanju nalog na delovna mesta?", [ "Najprej najkrajša naloga (ob izenačenju: manj sledečih nalog)", "Najprej naloga z največ predhodnimi nalogami", "Najprej naloga, ki je v diagramu najbolj levo" ], 1, "Najprej najdaljša naloga (ob izenačenju: več sledečih)" ],
  [ "Katero delovno mesto je ozko grlo linije?", [ "Tisto z najmanj dodeljenimi nalogami", "Prvo delovno mesto na liniji", "Tisto z največ prostega časa v ciklu" ], 1, "Tisto z najdaljšim časom obdelave" ],
  [ "Kaj počne metoda CRAFT?", [ "Uravnoteži montažno linijo po pravilu najdaljše naloge", "Napoveduje povpraševanje z eksponentnim glajenjem", "Izračuna kritično pot in rezervne čase projekta" ], 3, "Zamenjuje pare naprav in zmanjšuje Σ prenosi × razdalja" ],
  [ "Kaj je naivna metoda napovedovanja?", [ "F_t = povprečje vseh preteklih obdobij", "F_t = povprečje zadnjih treh obdobij", "F_t = D_(t−1) + trend zadnjega obdobja" ], 3, "F_t = D_(t−1)" ],
  [ "Formula eksponentnega glajenja je:", [ "F_t = F_(t−1) + α (F_(t−1) − D_(t−1))", "F_t = α · D_(t−1) + α · F_(t−1)", "F_t = D_(t−1) + α (D_(t−1) − F_(t−1))" ], 0, "F_t = F_(t−1) + α (D_(t−1) − F_(t−1))" ],
  [ "Po čem izberemo zanesljivejšo metodo napovedovanja?", [ "Po kumulativni napaki (KNN) blizu 0", "Po najvišji napovedi povpraševanja", "Po najmanjšem α pri glajenju" ], 3, "Po nižji PANN (MAD)" ],
];
