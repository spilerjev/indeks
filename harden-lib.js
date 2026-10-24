/* Težji odgovori: popravki oblike [predpona vprašanja, [3 napačni odgovori], mesto pravilnega, (novo besedilo pravilnega)].
   Pravilni odgovor se vzame iz obstoječega vprašanja (če ni podan nov), napačni se vstavijo okoli njega. Idempotentno. */
function applyHarden(questions, patches, label) {
  let ok = 0;
  for (const [prefix, wrongs, pos, newCorrect] of patches) {
    const hit = questions.filter((q) => q.options && q.q.startsWith(prefix));
    if (hit.length !== 1) { console.warn(`  ! ${label}: "${prefix}" ujemanj: ${hit.length}`); continue; }
    const q = hit[0];
    const right = newCorrect || q.options[q.correct];
    if (wrongs.length !== 3 || pos < 0 || pos > 3) { console.warn(`  ! ${label}: slab vnos pri "${prefix}"`); continue; }
    const opts = wrongs.slice(); opts.splice(pos, 0, right);
    if (new Set(opts).size !== 4) { console.warn(`  ! ${label}: podvojen odgovor pri "${prefix}"`); continue; }
    q.options = opts; q.correct = pos; ok++;
  }
  console.log(`  ${label}: težjih odgovorov ${ok}/${patches.length}`);
}
module.exports = { applyHarden };
