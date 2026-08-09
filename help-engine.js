'use strict';
/* ===== Help Engine (V2) =====
   Implementa la scala di aiuto a 7 livelli (0-6) di HELP_SYSTEM_V2.md:
   0 tentativo autonomo, 1 piccolo indizio, 2 richiamo della regola,
   3 primo passaggio svolto, 4 spiegazione guidata, 5 soluzione completa,
   6 esercizio gemello.

   Attivo solo per esercizi che dichiarano ex.hintSteps (campo opzionale
   additivo, vedi CLAUDE.md sui rischi di schema): gli esercizi degli altri
   moduli, che non hanno questo campo, continuano a usare l'unico ex.hint
   statico della V1 — comportamento invariato.

   Caricato dopo interactions.js (da cui riusa EquationModel per generare i
   gemelli delle equazioni) e prima di app.js.
*/
const HELP_MAX_LEVEL = 6;

function helpHasLadder(ex) {
  return Array.isArray(ex.hintSteps) && ex.hintSteps.length > 0;
}

function helpMaxLevelFor(ex) {
  if (!helpHasLadder(ex)) return 1; // comportamento V1: un solo livello (hint singolo)
  if (ex.model) return HELP_MAX_LEVEL; // ha un modello simbolico: può generare un gemello
  return Math.min(HELP_MAX_LEVEL, ex.workedSolution ? 5 : 2);
}

function nextHelpLevel(ex, currentLevel) {
  return Math.min(currentLevel + 1, helpMaxLevelFor(ex));
}

// Restituisce { kind:'hint'|'steps'|'twin', text } per il livello richiesto.
function getHelpContent(ex, level) {
  if (level <= 0) return null;
  if (!helpHasLadder(ex)) return { kind: 'hint', text: ex.hint };
  if (level === 1) return { kind: 'hint', text: ex.hintSteps[0] || ex.hint };
  if (level === 2) return { kind: 'hint', text: ex.hintSteps[1] || ex.hintSteps[0] || ex.hint };
  const solution = ex.workedSolution || [];
  if (!solution.length) return { kind: 'hint', text: ex.hintSteps[ex.hintSteps.length - 1] };
  if (level === 3) return { kind: 'steps', text: solution.slice(0, 1) };
  if (level === 4) return { kind: 'steps', text: solution.slice(0, Math.max(1, solution.length - 1)) };
  return { kind: 'steps', text: solution }; // livello 5+
}

/* ===== Diagnosi errori comuni =====
   ex.commonErrors: [{ id, when, message }] — "when" è la chiave di un piccolo
   catalogo di test condiviso (ERROR_TESTS), così il contenuto in data.js
   resta puro dato e non porta codice eseguibile arbitrario.
*/
const ERROR_TESTS = {
  // ha invertito il segno del risultato (classico errore "cambia lato, non cambia segno")
  signFlip: (userVal, correctVal) => userVal !== null && correctVal !== null && userVal === -correctVal && correctVal !== 0,
  // ha ottenuto un risultato vicino ma non corretto, coerente con un errore di calcolo isolato (non un segno invertito)
  smallSlip: (userVal, correctVal) => userVal !== null && correctVal !== null && userVal !== correctVal && userVal !== -correctVal && Math.abs(userVal - correctVal) <= 3,
  // ha lasciato il risultato di un passaggio intermedio invece di continuare a isolare la x
  zeroOrEmpty: (userVal) => userVal === 0
};

function diagnoseCommonError(ex, userVal, correctVal) {
  if (!Array.isArray(ex.commonErrors) || !ex.commonErrors.length) return null;
  for (const err of ex.commonErrors) {
    const test = ERROR_TESTS[err.when];
    if (test && test(userVal, correctVal)) return err;
  }
  return null;
}

/* ===== Esercizio gemello (Livello 6) =====
   Se l'esercizio ha un modello simbolico ax+b=cx+d, genera una variante con
   coefficienti diversi ma la stessa struttura (stesso numero di passaggi),
   così il livello 6 non ripropone mai la stessa domanda. Senza modello
   simbolico non esiste un gemello automatico: livello 6 non disponibile
   (helpMaxLevelFor lo esclude già).
*/
function generateTwin(ex) {
  if (!ex.model || typeof Interactions === 'undefined') return null;
  const EM = Interactions.EquationModel;
  const pick = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  const hasX2 = ex.model.c !== 0;
  let a, c, x, b, d;
  do {
    a = pick(2, 9);
    c = hasX2 ? pick(2, 9) : 0;
  } while (a === c);
  do { x = pick(-10, 10); } while (x === 0); // x=0 rende il gemello poco istruttivo
  b = pick(-15, 15);
  d = (a - c) * x + b; // garantisce una soluzione intera
  const model = { a, b, c, d };
  return {
    q: EM.formatEquation(model),
    answer: String(x),
    hint: ex.hint,
    hintSteps: ex.hintSteps,
    workedSolution: EM.solutionSteps(model),
    commonErrors: ex.commonErrors,
    skill: ex.skill,
    level6: ex.level6,
    cognitiveType: ex.cognitiveType,
    model
  };
}

/* ===== export (script classico) ===== */
const HelpEngine = {
  HELP_MAX_LEVEL,
  helpHasLadder,
  helpMaxLevelFor,
  nextHelpLevel,
  getHelpContent,
  diagnoseCommonError,
  generateTwin
};
