/* Liki in oprema za Areno (bitka). Uredi tukaj, nato: npm run build
   Vsak lik ima sliko docs/liki/<id>.png (kvadrat, npr. 512×512; naredi jo z Geminijem). Dokler slike ni,
   aplikacija pokaže začetnice. Liki so izmišljeni junaki po znanih osebah; opisi so šaljivi, ne žaljivi.

   Mehanika (računa jo Supabase funkcija duel_answer, zato je za vse igralce enaka):
     pravilen odgovor = napad na vse še žive nasprotnike:
       škoda   = atk × serija × hitrost × kritik, nasprotnikov ščit jo zmanjša za shield %
       serija  = 1 + streak × (zaporednih pravilnih − 1), največ 1,5
       hitrost = 1 + quick, če si odgovoril v 15 s (sicer 1)
       kritik  = 2× z verjetnostjo crit %
       heal    = vsak healEvery-ti zaporedni pravilni odgovor ti vrne heal HP (največ do polnega)
     napačen odgovor = serija se prekine; penaltyAt (privzeto 2) zaporednih napačnih = −10 HP sebi
       (kazen proti ugibanju); oprema lahko penaltyAt dvigne na 3.
     hints = plonkec: tolikokrat na match lahko skriješ en napačen odgovor (odjemalec).
     Igralec z 0 HP je izločen. Zmaga zadnji živ oz. ob koncu tisti z največ HP (nato več pravilnih, nato hitrejši).
   Strežnik številke omeji: hp 60–160, atk 5–20, crit 0–50 %, streak 0–0,3, quick 0–0,5, shield 0–0,5, heal 0–30, healEvery 2–5, penaltyAt 2–4, hints 0–5.

   Načini matcha: classic (točke), basic (osnovna bitka: vsi lik BASIC spodaj), battle (bitka z liki in opremo).
   Sposobnost lika (ability): vsak lik ima eno. Pasivne veljajo ves match, aktivne uporabiš enkrat na match
   (gumb med vprašanjem). Id-ji so trdo zakodirani v strežniku (duel_answer / duel_ability) in odjemalcu:
     underdog  (pasivna) +15 % škode, ko imaš manj HP od povprečja nasprotnikov
     rage      (pasivna) +40 % škode, ko imaš manj kot 30 % HP
     iron      (pasivna) prejeta škoda −15 % (kot ščit)
     compound  (pasivna) vsak pravilen odgovor +3 HP
     nocrit    (pasivna) kritiki nasprotnikov proti tebi štejejo kot navaden udarec
     stimulus  (aktivna) +25 HP takoj
     cheat     (aktivna) pokaže pravilni odgovor pri trenutnem vprašanju
     allin     (aktivna) naslednji odgovor: pravilen = 3× škoda, napačen = −20 HP sebi
     tariff    (aktivna) vsi nasprotniki takoj izgubijo 15 HP (ščit ne pomaga)

   Lik:    { id, unlock, name, title, desc, stats: {hp, atk, crit, streak}, ability: {id, name, desc} }   (id = ime slike v docs/liki/)
   Oprema: { id, name, desc, mod: {hp?, atk?, crit?, streak?, quick?, shield?, heal?, healEvery?, penaltyAt?, hints?} }; igralec izbere do 2. */

const CHARACTERS = [
  { id: "smith", unlock: 1, name: "Adam Smith", title: "Nevidna roka",
    desc: "Uravnotežen začetnik: solidno življenje, zanesljiv udarec, brez muh.",
    stats: { hp: 110, atk: 10, crit: 12, streak: 0.1 },
    ability: { id: "underdog", name: "Nevidna roka", desc: "Pasivno: +15 % škode, ko imaš manj HP od povprečja nasprotnikov." } },
  { id: "keynes", unlock: 2, name: "J. M. Keynes", title: "Stimulus",
    desc: "Zapravlja brez zadržkov: močan udarec, a manj življenja.",
    stats: { hp: 95, atk: 13, crit: 12, streak: 0.1 },
    ability: { id: "stimulus", name: "Stimulus", desc: "Aktivno (1×): takoj +25 HP." } },
  { id: "marx", unlock: 4, name: "Karl Marx", title: "Kapital",
    desc: "Trmast in vzdržljiv: največ življenja, šibkejši udarec.",
    stats: { hp: 135, atk: 9, crit: 8, streak: 0.1 },
    ability: { id: "rage", name: "Revolucija", desc: "Pasivno: +40 % škode, ko imaš manj kot 30 % HP." } },
  { id: "thatcher", unlock: 6, name: "Margaret Thatcher", title: "Privatizacija",
    desc: "Ne popušča: veliko življenja, dosleden udarec, malo kritikov.",
    stats: { hp: 125, atk: 10, crit: 8, streak: 0.12 },
    ability: { id: "iron", name: "Železna lady", desc: "Pasivno: prejeta škoda −15 %." } },
  { id: "buffett", unlock: 8, name: "Warren Buffett", title: "Dolgoročni vlagatelj",
    desc: "Počasi, a zanesljivo: ogromno življenja, obresti na serijo.",
    stats: { hp: 130, atk: 8, crit: 8, streak: 0.18 },
    ability: { id: "compound", name: "Obrestne obresti", desc: "Pasivno: vsak pravilen odgovor +3 HP." } },
  { id: "gates", unlock: 10, name: "Bill Gates", title: "Antivirus",
    desc: "Programer: uravnotežen, malo boljši kritiki, požarni zid.",
    stats: { hp: 105, atk: 10, crit: 18, streak: 0.1 },
    ability: { id: "nocrit", name: "Požarni zid", desc: "Pasivno: kritiki nasprotnikov proti tebi štejejo kot navaden udarec." } },
  { id: "huang", unlock: 12, name: "Jensen Huang", title: "Računska moč",
    desc: "Vsak zaporedni pravilni odgovor je občutno močnejši; in zna goljufati.",
    stats: { hp: 100, atk: 9, crit: 10, streak: 0.25 },
    ability: { id: "cheat", name: "Goljufija", desc: "Aktivno (1×): pokaže pravilni odgovor pri trenutnem vprašanju." } },
  { id: "musk", unlock: 14, name: "Elon Musk", title: "Inovator",
    desc: "Nepredvidljiv: veliko kritikov, hitro zgori, odštekane ideje.",
    stats: { hp: 90, atk: 10, crit: 30, streak: 0.08 },
    ability: { id: "allin", name: "Vse ali nič", desc: "Aktivno (1×): naslednji odgovor dela 3× škodo, če je pravilen; če je napačen, izgubiš 20 HP." } },
  { id: "trump", unlock: 16, name: "Donald Trump", title: "Špekulant",
    desc: "Vse ali nič: najmočnejši udarec, najmanj življenja.",
    stats: { hp: 85, atk: 14, crit: 15, streak: 0.08 },
    ability: { id: "tariff", name: "Tarife", desc: "Aktivno (1×): vsi nasprotniki takoj izgubijo 15 HP, ščit ne pomaga." } },
];

const ITEMS = [
  { id: "svincnik", unlock: 1, name: "Svinčnik", desc: "Klasika: +1 napad, +5 HP", mod: { atk: 1, hp: 5 } },
  { id: "zvezek", unlock: 1, name: "Zvezek", desc: "Urejeni zapiski: kazen šele pri 3 zaporednih napačnih (namesto 2)", mod: { penaltyAt: 3 } },
  { id: "macbook", unlock: 3, name: "MacBook", desc: "Za napredne: +12 % kritik", mod: { crit: 12 } },
  { id: "airpods", unlock: 5, name: "AirPods Max", desc: "Fokus: +8 % serije na zaporedni pravilni odgovor", mod: { streak: 0.08 } },
  { id: "redbull", unlock: 7, name: "Red Bull", desc: "Poživilo: +25 % škode pri odgovoru v 15 s", mod: { quick: 0.25 } },
  { id: "vrecka", unlock: 9, name: "Nikotinska vrečka", desc: "Zadet: +3 napad, −15 HP", mod: { atk: 3, hp: -15 } },
  { id: "kavica", unlock: 11, name: "Kavica", desc: "Blažje poživilo: +12 % škode pri hitrem odgovoru, +10 HP", mod: { quick: 0.12, hp: 10 } },
  { id: "toast", unlock: 13, name: "Kapital toast", desc: "Sit in miren: +35 HP", mod: { hp: 35 } },
  { id: "burger", unlock: 15, name: "Kapital burger", desc: "Vsak 2. zaporedni pravilni odgovor vrne 10 HP", mod: { heal: 10, healEvery: 2 } },
  { id: "ucbenik", unlock: 17, name: "Učbenik", desc: "Ščit: prejeta škoda −15 %", mod: { shield: 0.15 } },
  { id: "plonkec", unlock: 18, name: "Plonkec", desc: "3× na match skrije en napačen odgovor", mod: { hints: 3 } },
];

/* Osnovna bitka (način "basic"): vsi igralci imajo tega istega lika, brez opreme in brez sposobnosti.
   Uravnoteženo za 10 vprašanj: 10 pravilnih = ravno 100 škode; vsak 3. zaporedni pravilni vrne 5 HP. */
const BASIC = { id: "basic", name: "Študent", title: "Osnovna bitka",
  desc: "Vsi enaki: 100 HP, napad 10, kritik 10 %, serija +10 %, vsak 3. zaporedni pravilni +5 HP.",
  stats: { hp: 100, atk: 10, crit: 10, streak: 0.1 }, heal: 5, healEvery: 3 };

/* XP in nivoji (battle pass). Enake številke so v supabase/1v1.sql (player_xp, level_of, arena_unlocks) — ob spremembi popravi oboje.
   XP: 10 na rešen kviz (vadba), 40 na odigran match, 60 na zmago. LEVELS[i] = XP za nivo i+1. unlock = nivo, na katerem se lik/oprema odklene. */
const XP_RULES = { attempt: 10, match: 40, win: 60 };
const LEVELS = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3250, 3850, 4500, 5200, 5950, 6750, 7600, 8500];

module.exports = { CHARACTERS, ITEMS, BASIC, XP_RULES, LEVELS };
