// Enkratna skripta: vstavi vsebino predmeta Pravo iz pravo-src/ v data.json
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "data.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const k1uvod = require("./pravo-src/k1-uvod");
const k1eu = require("./pravo-src/k1-eu");
const k1stvarno = require("./pravo-src/k1-stvarno");
const k1oblig = require("./pravo-src/k1-oblig");
const k2korp = require("./pravo-src/k2-korp");
const k2sp = require("./pravo-src/k2-sp-osebne");
const k2doo = require("./pravo-src/k2-doo");
const k2dd = require("./pravo-src/k2-dd");
const k2pren = require("./pravo-src/k2-prenehanje");
const { notesK1, notesK2 } = require("./pravo-src/notes");
const flashcards = require("./pravo-src/flashcards");

const pravo = data
  .flatMap((sem) => sem.subjects)
  .find((s) => s.id === "pravo");
if (!pravo) throw new Error("Predmet pravo ni najden v data.json");

const k1 = pravo.parts.find((p) => p.id === "k1");
const k2 = pravo.parts.find((p) => p.id === "k2");
const izpit = pravo.parts.find((p) => p.id === "izpit");

k1.decks = [k1uvod, k1eu, k1stvarno, k1oblig];
k1.notes = notesK1;

k2.decks = [k2korp, k2sp, k2doo, k2dd, k2pren];
k2.notes = notesK2;

izpit.decks = [];
izpit.flashcards = flashcards;

// Preveri strukturo vprašanj
let total = 0;
for (const part of [k1, k2]) {
  for (const deck of part.decks) {
    for (const q of deck.questions) {
      total++;
      if (q.type === "match") {
        if (!Array.isArray(q.pairs) || q.pairs.length < 2)
          throw new Error(`Match brez parov: ${q.q}`);
      } else {
        if (!Array.isArray(q.options) || q.options.length < 2)
          throw new Error(`MCQ brez možnosti: ${q.q}`);
        if (typeof q.correct !== "number" || q.correct < 0 || q.correct >= q.options.length)
          throw new Error(`Napačen correct pri: ${q.q}`);
        if (!q.explanation) throw new Error(`Brez razlage: ${q.q}`);
      }
    }
  }
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 1) + "\n");
console.log(`OK: pravo vpisan. Vprašanj: ${total}. Decki k1: ${k1.decks.map(d=>d.id+"("+d.questions.length+")").join(", ")}; k2: ${k2.decks.map(d=>d.id+"("+d.questions.length+")").join(", ")}. Flashcard setov: ${flashcards.length}.`);
