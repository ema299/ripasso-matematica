'use strict';
// ============================================================================
// SCRIPT DI MIGRAZIONE IDEMPOTENTE (verificato empiricamente: rieseguirlo su
// un data.js già trasformato produce un output byte-per-byte identico — a
// differenza di scripts/build_equazioni_v2.js, di cui è il seguito e che
// invece fallisce rumorosamente se rieseguito). Tutte le trasformazioni qui
// dentro sono per costruzione idempotenti: riordino per titolo/format (non
// per posizione), sovrascrittura di un valore fisso, rimozione/aggiunta di
// un campo condizionata alla sua assenza/presenza. È SICURO rilanciarlo dopo
// un'ulteriore modifica manuale di data.js che non tocchi i titoli/domande
// usati come chiave — ma resta comunque data.js sul disco, non questo
// script, la source of truth: vedi CLAUDE.md.
// ============================================================================
//
// FASE FINALE — fix dei finding BLOCKING della review indipendente
// (docs/REVIEW_EQUAZIONI_V2_FASE1.md) che riguardano data.js. Trasforma
// SOLO mod.id === 'equazioni', esattamente come scripts/build_equazioni_v2.js
// di cui è il seguito. Script storico di migrazione, non pensato per essere
// rieseguito sul proprio output (vedi header di build_equazioni_v2.js e
// docs/EQUAZIONI_V2_FINAL.md per la spiegazione).
//
//  - D1: riordina la teoria così "Termine" segua "Primo/Secondo membro"
//    invece di usarli prima di definirli (bug di prerequisito trovato dalla
//    review, non serviva editare il testo: bastava lo spostamento)
//  - D2: riordina gli esercizi così la bilancia preceda il grosso del drill
//    numerico in ogni livello, invece di seguirlo sempre
//  - D4: hint copiato e sbagliato sui 4 esercizi "costruisci l'equazione"
//  - F19/F20: rimuove workedSolution dai 36 esercizi con modello simbolico
//    (ricavabile a runtime via EquationModel.solutionSteps, vedi
//    help-engine.js), e sostituisce l'array commonErrors duplicato per
//    valore 31 volte con un riferimento commonErrorsKey risolto a runtime
//    (anche sui 5 esercizi bilancia, che ne erano privi per un dettaglio
//    dell'ordine di esecuzione dello script precedente — F20)
//
// Uso: node scripts/finalize_equazioni_v2.js > data.new.js
//      poi: node scripts/verify_equazioni_v2.js data.new.js && mv data.new.js data.js

const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const dataSrc = fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8');
const sandbox = { console, Math };
vm.createContext(sandbox);
vm.runInContext(dataSrc + '\nglobalThis.MODULES = MODULES;', sandbox);
const MODULES = sandbox.MODULES;
const mod = MODULES.find(m => m.id === 'equazioni');
if (!mod) throw new Error('Modulo equazioni non trovato');

/* ===================================================================
   D1 — riordino teoria (nessuna modifica di testo: la slide "Termine"
   segue ora "Primo membro"/"Secondo membro" invece di precederle)
   =================================================================== */
const NEW_THEORY_ORDER = [
  "Cos'è x?", 'Variabile', 'Incognita',
  "Cos'è un'equazione",
  'Primo membro', 'Secondo membro',
  'Termine', 'Coefficiente',
  'Operazioni inverse', 'Il principio di equivalenza',
  'I principi di equivalenza',
  'Perché "cambi membro, cambi segno"',
  'La verifica', 'Esempio svolto', 'Un altro esempio'
];
const byTitle = new Map(mod.theory.map(s => [s.title, s]));
if (byTitle.size !== mod.theory.length) throw new Error('Titoli di teoria non univoci: impossibile riordinare in sicurezza');
const reordered = NEW_THEORY_ORDER.map(title => {
  const s = byTitle.get(title);
  if (!s) throw new Error('Slide di teoria non trovata: ' + title);
  return s;
});
if (reordered.length !== mod.theory.length) throw new Error(`Riordino teoria incompleto: ${reordered.length} vs ${mod.theory.length} originali`);
mod.theory = reordered;

/* ===================================================================
   D2 — riordino esercizi: bilancia (e raggruppa-termini, propedeutico)
   prima del grosso del drill numerico, invece che sempre in coda.
   =================================================================== */
function partition(list) {
  const buckets = { balance: [], order: [], group: [], build: [], 'error-detect': [], plain: [] };
  for (const ex of list) buckets[ex.format || 'plain'].push(ex);
  return buckets;
}
function reorderLevel(list, sequence) {
  const buckets = partition(list);
  const out = [];
  for (const key of sequence) out.push(...buckets[key]);
  if (out.length !== list.length) throw new Error(`Riordino esercizi incompleto: ${out.length} vs ${list.length} originali`);
  return out;
}
mod.exercises.facile = reorderLevel(mod.exercises.facile, ['balance', 'group', 'plain', 'order', 'build']);
mod.exercises.medio = reorderLevel(mod.exercises.medio, ['balance', 'group', 'plain', 'order', 'build']);
mod.exercises.difficile = reorderLevel(mod.exercises.difficile, ['balance', 'plain', 'order', 'build', 'error-detect']);

/* ===================================================================
   D4 — hint copiato/sbagliato sui 4 esercizi "costruisci l'equazione"
   =================================================================== */
const allEx = [...mod.exercises.facile, ...mod.exercises.medio, ...mod.exercises.difficile];
function byQ(q) { const e = allEx.find(x => x.q === q); if (!e) throw new Error('Esercizio non trovato: ' + q); return e; }

byQ('Il triplo di un numero aumentato di 2 è uguale a 17.').hint =
  'Traduci un pezzo alla volta: "il triplo di un numero" è 3x, "aumentato di 2" è +2, "è uguale a" è =.';
byQ('Un numero diminuito di 5 è uguale a 12.').hint =
  'Traduci un pezzo alla volta: "un numero" è x, "diminuito di 5" è −5, "è uguale a" è =.';
byQ('Il doppio di un numero, diminuito di 7, è uguale al numero aumentato di 3.').hint =
  'Traduci un pezzo alla volta: "il doppio di un numero" è 2x, "diminuito di 7" è −7; a destra, "il numero" è di nuovo x e "aumentato di 3" è +3.';
byQ('In un hotel il numero di camere occupate è il triplo di quelle libere. In totale ci sono 48 camere. Quante sono le camere libere?').hint =
  'Chiama x le camere libere: "il triplo di quelle libere" è 3x (le occupate). Libere + occupate = 48, cioè x + 3x = 48.';

/* ===================================================================
   F19/F20 — dedup workedSolution (ricavabile a runtime dal model) e
   commonErrors (da array duplicato per valore a riferimento per chiave)
   =================================================================== */
let strippedWorkedSolution = 0;
let convertedCommonErrors = 0;
let addedCommonErrorsKey = 0;
allEx.forEach(ex => {
  if (ex.model && ex.workedSolution) { delete ex.workedSolution; strippedWorkedSolution++; }
  if (ex.model) {
    if (Array.isArray(ex.commonErrors)) { delete ex.commonErrors; convertedCommonErrors++; }
    if (!ex.commonErrorsKey) { ex.commonErrorsKey = 'linear_basic'; addedCommonErrorsKey++; }
  }
});
console.error(`[finalize] workedSolution rimosso da ${strippedWorkedSolution} esercizi (ricavabile a runtime)`);
console.error(`[finalize] commonErrors inline convertito in commonErrorsKey su ${convertedCommonErrors} esercizi`);
console.error(`[finalize] commonErrorsKey aggiunto (anche dove mancava, F20) su ${addedCommonErrorsKey} esercizi totali`);

process.stdout.write('const MODULES = ' + JSON.stringify(MODULES, null, 2) + ';\n');
