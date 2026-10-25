// PF1 vaje 3-6 (teorija): enaka dolžina možnosti
module.exports = [
  ['Kaj meri beta koeficient delnice?', [
    'Celotno nihanje donosa delnice okoli njenega povprečja',
    'Delež dobička, ki ga podjetje izplača kot dividende',
    'Korelacijo donosa delnice z netvegano naložbo'], 3, 'Občutljivost donosa delnice na donos trga'],
  ['Katero tveganje lahko z diverzifikacijo', [
    'Sistematično (tržno) tveganje, ki ga trg nagradi',
    'Inflacijsko tveganje, ki zadeva vse naložbe',
    'Vse tveganje, če imamo v portfelju dve delnici'], 3, 'Nesistematično (specifično) tveganje podjetja'],
  ['Za kaj vlagatelji z dobro razpršenim portfeljem', [
    'Za celotno tveganje posamezne delnice',
    'Za nesistematično tveganje posameznega podjetja',
    'Za vsako tveganje, ki ga prevzamejo pri naložbi'], 3, 'Za sistematično tveganje, merjeno z beto'],
  ['Kako izračunamo beto portfelja?', [
    'Kot standardni odklon bet posameznih delnic',
    'Kot vsoto bet posameznih delnic v portfelju',
    'Kot najvišjo beto med delnicami v portfelju'], 0, 'Kot tehtano povprečje bet posameznih delnic'],
  ['Kako vpliva nižja korelacija med delnicama', [
    'Pričakovana donosnost portfelja se zmanjša',
    'Standardni odklon portfelja se poveča',
    'Korelacija ne vpliva na tveganje portfelja'], 1, 'Standardni odklon portfelja se zmanjša'],
  ['Kaj je tržna premija za tveganje?', [
    'Pričakovana tržna donosnost, E(r_m)',
    'Beta tržnega portfelja, ki je enaka 1',
    'Razlika med donosnostjo obveznice in delnice podjetja'], 3, 'Razlika E(r_m) − r_f'],
  ['Pričakovana donosnost delnice je pod njeno zahtevano', [
    'Delnica je podcenjena, zato jo kupimo',
    'Delnica je pravilno vrednotena',
    'Delnica ima negativno beto'], 2, 'Delnica je precenjena, zato jo prodamo'],
  ['Kaj se zgodi s SML, če se pričakovana inflacija', [
    'SML postane strmejša, naklon se poveča za 2',
    'SML se premakne navzdol, ker beta ostane enaka',
    'SML ostane enaka, ker se spremeni samo r_f'], 3, 'SML se vzporedno dvigne za 2 o. t.'],
  ['Kako po CAPM izračunamo zahtevano donosnost lastniškega', [
    'r_E = r_f + β · E(r_m)',
    'r_E = β · r_f + E(r_m)',
    'r_E = E(r_m) − β · r_f'], 1, 'r_E = r_f + β · (E(r_m) − r_f)'],
  ['Kako flotacijski stroški vplivajo na strošek novoizdanih', [
    'Znižajo ga, ker podjetje prejme več kapitala',
    'Ne vplivajo nanj, ker jih plača država',
    'Povečajo samo strošek dolga, ne lastniškega kapitala'], 3, 'Povečajo ga: r = D₁/(P₀(1 − F)) + g'],
  ['Kako izračunamo strošek dolga po davkih?', [
    'r_D · (1 + t)', 'r_D / (1 − t)', 'r_D − t'], 3, 'r_D · (1 − t)'],
  ['Kako se izračuna WACC?', [
    'Navadno povprečje stroška dolga in lastniškega kapitala',
    'Tehtano povprečje z uteženimi knjigovodskimi vrednostmi',
    'Strošek lastniškega kapitala, povečan za davčno stopnjo'], 0, 'Tehtano povprečje stroškov z uteženimi tržnimi vrednostmi'],
  ['Zakaj mejni strošek kapitala naraste', [
    'Ker davek na dobiček naraste',
    'Ker postane dolg cenejši od lastniškega kapitala',
    'Ker mora podjetje izplačati višje dividende'], 3, 'Ker so nove delnice dražje (flotacija)'],
  ['Kako izberemo projekte po metodi mejnega stroška', [
    'Izvedemo vse projekte z donosnostjo nad netvegano mero',
    'Izvedemo samo najdonosnejši projekt v ponudbi',
    'Izvedemo projekte po vrstnem redu velikosti'], 1, 'Izvedemo projekte, ki presegajo mejni WACC'],
  ['Podjetje ima divizijo z veliko višjim tveganjem', [
    'WACC celotnega podjetja',
    'Netvegano obrestno mero',
    'Strošek dolga podjetja po davku'], 3, 'Strošek kapitala s tveganjem divizije'],
  ['Podjetje se financira izključno z lastniškim kapitalom. Kako vrednotimo', [
    'Z diskontiranjem dividend podjetja z netvegano mero',
    'Z knjigovodsko vrednostjo sredstev divizije',
    'Z navadnim povprečjem tržnih kazalnikov podjetja'], 2, 'Z diskontiranjem FCF divizije s stroškom kapitala njene bete'],
];
