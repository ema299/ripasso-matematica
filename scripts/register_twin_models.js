'use strict';
// ============================================================================
// SCRIPT DI MIGRAZIONE STORICA (one-shot). Da eseguire DOPO
// scripts/extend_5_moduli_parita.js. Rende "gemellabili" (HelpEngine.
// canGenerateTwin) tutti gli esercizi classici (senza `format`, cioè non
// error-detect/order/group/build) dei moduli numeri/frazioni/potenze/
// algebra/geometria, sullo stesso principio già in uso per equazioni:
//
//   - ex.generatorKey = '<modulo>' aggancia l'esercizio al generatore
//     registrato in help-engine.js (che a runtime chiama la funzione
//     corrispondente di generators.js per il livello dell'esercizio);
//   - ex.model = { level } indica a quel generatore quale funzione usare;
//   - ex.hintSteps, se assente, viene sintetizzato come [ex.hint] — non
//     introduce contenuto nuovo, replica solo l'hint esistente in modo che
//     helpHasLadder() sia vero e la scala di aiuto/il gemello diventino
//     raggiungibili dalla UI (altrimenti restano al livello 1 anche con
//     generatorKey impostato, vedi help-engine.js helpMaxLevelFor).
//
// Non tocca equazioni. Idempotente: se un esercizio ha già generatorKey e
// hintSteps non li sovrascrive, quindi è sicuro da rieseguire (a differenza
// di extend_5_moduli_parita.js, che invece non lo è per i suoi inserimenti
// posizionali).
// ============================================================================

const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const dataPath = path.join(ROOT, 'data.js');

function loadModules(file) {
  const src = fs.readFileSync(file, 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(src + '\nglobalThis.MODULES = MODULES;', sandbox);
  return sandbox.MODULES;
}

const MODULES = loadModules(dataPath);
const LEVELS = ['facile', 'medio', 'difficile'];
const TARGET_MODULES = ['numeri', 'frazioni', 'potenze', 'algebra', 'geometria'];

let tagged = 0, skippedInteractive = 0, alreadyTagged = 0;
TARGET_MODULES.forEach(id => {
  const m = MODULES.find(mm => mm.id === id);
  if (!m) { console.error(`❌ modulo non trovato: ${id}`); process.exit(1); }
  LEVELS.forEach(level => {
    m.exercises[level].forEach(ex => {
      if (ex.format) { skippedInteractive++; return; } // error-detect/order/group/build: non ha un modello numerico da rigenerare
      if (ex.generatorKey) { alreadyTagged++; return; }
      ex.generatorKey = id;
      ex.model = { level };
      if (!Array.isArray(ex.hintSteps) || ex.hintSteps.length === 0) ex.hintSteps = [ex.hint];
      tagged++;
    });
  });
});

const out = 'const MODULES = ' + JSON.stringify(MODULES, null, 2) + ';\n';
fs.writeFileSync(dataPath, out);
console.log(`✅ ${tagged} esercizi classici taggati con generatorKey/model (${skippedInteractive} interattivi saltati, ${alreadyTagged} già taggati).`);
console.log('data.js aggiornato con successo.');
