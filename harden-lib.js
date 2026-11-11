/* Težji odgovori: popravki oblike [predpona vprašanja, [3 napačni odgovori], mesto pravilnega, (novo besedilo pravilnega)].
   Pravilni odgovor se vzame iz obstoječega vprašanja (če ni podan nov), napačni se vstavijo okoli njega. Idempotentno. 5. element 'vse' dovoli popravek vseh enakih vprašanj (isto vprašanje v več kvizih). */
function applyHarden(questions, patches, label) {
  let ok = 0;
  for (const [prefix, wrongs, pos, newCorrect, vse] of patches) {
    const hit = questions.filter((q) => q.options && q.q.startsWith(prefix));
    if (!hit.length || (hit.length > 1 && vse !== 'vse')) { console.warn(`  ! ${label}: "${prefix}" ujemanj: ${hit.length}`); continue; }
    for (const q of hit) {
    const right = newCorrect || q.options[q.correct];
    if (wrongs.length !== 3 || pos < 0 || pos > 3) { console.warn(`  ! ${label}: slab vnos pri "${prefix}"`); continue; }
    const opts = wrongs.slice(); opts.splice(pos, 0, right);
    if (new Set(opts).size !== 4) { console.warn(`  ! ${label}: podvojen odgovor pri "${prefix}"`); continue; }
    q.options = opts; q.correct = pos; ok++;
    }
  }
  console.log(`  ${label}: težjih odgovorov ${ok}/${patches.length}`);
}
module.exports = { applyHarden };
