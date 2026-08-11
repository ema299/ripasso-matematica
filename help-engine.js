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

/* ===== Registro dei generatori di gemelli =====
   Ogni modulo con un modello simbolico proprio (oggi solo equazioni) può
   registrare un generatore qui invece di essere hardcoded dentro
   generateTwin/getHelpContent. Un esercizio si aggancia a un generatore in
   due modi: esplicitamente via ex.generatorKey, oppure — per compatibilità
   con gli esercizi di equazioni già esistenti in data.js, che non hanno
   quel campo — implicitamente se ex.model ha la forma {a,b,c,d} attesa dal
   generatore 'equazioni'. Nessuna migrazione di data.js richiesta.
*/
const TWIN_GENERATORS = {};
function registerTwinGenerator(key, generator) { TWIN_GENERATORS[key] = generator; }
function resolveGenerator(ex) {
  if (ex.generatorKey && TWIN_GENERATORS[ex.generatorKey]) return TWIN_GENERATORS[ex.generatorKey];
  if (ex.model && TWIN_GENERATORS.equazioni) return TWIN_GENERATORS.equazioni;
  return null;
}
function canGenerateTwin(ex) {
  return !!resolveGenerator(ex) && typeof Interactions !== 'undefined';
}

function helpHasLadder(ex) {
  return Array.isArray(ex.hintSteps) && ex.hintSteps.length > 0;
}

function helpMaxLevelFor(ex) {
  if (!helpHasLadder(ex)) return 1; // comportamento V1: un solo livello (hint singolo)
  if (canGenerateTwin(ex)) return HELP_MAX_LEVEL; // ha un generatore: può produrre un gemello
  return Math.min(HELP_MAX_LEVEL, ex.workedSolution ? 5 : 2);
}

function nextHelpLevel(ex, currentLevel) {
  return Math.min(currentLevel + 1, helpMaxLevelFor(ex));
}

// Restituisce { kind:'hint'|'steps', text } per il livello richiesto.
// Livelli 1-2: indizio/regola generici (invariati). Livelli 3-5: quando
// l'esercizio ha un modello simbolico, restano semanticamente distinti anche
// per soluzioni a un solo passaggio (fix Review Fase1 §2 finding H1: prima
// il livello 3 mostrava già l'intera soluzione per gli esercizi corti):
//   3 = individua il prossimo passo (SENZA calcolarne il risultato)
//   4 = quel passo svolto e spiegato (con risultato)
//   5 = soluzione guidata completa
function getHelpContent(ex, level) {
  if (level <= 0) return null;
  if (!helpHasLadder(ex)) return { kind: 'hint', text: ex.hint };
  if (level === 1) return { kind: 'hint', text: ex.hintSteps[0] || ex.hint };
  if (level === 2) return { kind: 'hint', text: ex.hintSteps[1] || ex.hintSteps[0] || ex.hint };
  const gen = resolveGenerator(ex);
  if (gen && typeof Interactions !== 'undefined') {
    if (level === 3) {
      const hint3 = gen.level3Hint ? gen.level3Hint(ex) : null;
      return hint3
        ? { kind: 'hint', text: hint3 }
        : { kind: 'hint', text: ex.hintSteps[ex.hintSteps.length - 1] };
    }
    const solution = solutionStepsFor(ex);
    if (level === 4) return { kind: 'steps', text: solution.slice(0, 1) };
    return { kind: 'steps', text: solution }; // livello 5+
  }
  const solution = ex.workedSolution || [];
  if (!solution.length) return { kind: 'hint', text: ex.hintSteps[ex.hintSteps.length - 1] };
  if (level === 3) return { kind: 'steps', text: solution.slice(0, 1) };
  if (level === 4) return { kind: 'steps', text: solution.slice(0, Math.max(1, solution.length - 1)) };
  return { kind: 'steps', text: solution };
}

// La soluzione guidata è derivabile a runtime dal modello simbolico: se non
// è stata persistita in data.js (non serve più esserlo, vedi Fase Finale
// §13/F19), la si calcola al volo invece di duplicarla come dato statico.
function solutionStepsFor(ex) {
  if (ex.workedSolution) return ex.workedSolution;
  const gen = resolveGenerator(ex);
  if (gen && gen.solutionSteps && typeof Interactions !== 'undefined') return gen.solutionSteps(ex);
  return [];
}

/* ===== Diagnosi errori comuni =====
   ex.commonErrors: [{ id, when, message }] inline, OPPURE ex.commonErrorsKey
   che referenzia un set condiviso in COMMON_ERROR_SETS (evita di duplicare
   lo stesso catalogo su ogni esercizio in data.js, vedi Fase Finale §13/F19).
   "when" è la chiave di un piccolo catalogo di test condiviso (ERROR_TESTS),
   così il contenuto in data.js resta puro dato e non porta codice eseguibile
   arbitrario.
*/
const ERROR_TESTS = {
  // ha invertito il segno del risultato (classico errore "cambia lato, non cambia segno")
  signFlip: (userVal, correctVal) => userVal !== null && correctVal !== null && userVal === -correctVal && correctVal !== 0,
  // ha ottenuto un risultato vicino ma non corretto, coerente con un errore di calcolo isolato (non un segno invertito)
  smallSlip: (userVal, correctVal) => userVal !== null && correctVal !== null && userVal !== correctVal && userVal !== -correctVal && Math.abs(userVal - correctVal) <= 3,
  // ha lasciato il risultato di un passaggio intermedio invece di continuare a isolare la x
  zeroOrEmpty: (userVal) => userVal === 0
};
const COMMON_ERROR_SETS = {
  linear_basic: [
    { id: 'segno', when: 'signFlip', message: 'Hai trovato il numero giusto ma con il segno invertito: ricontrolla l’operazione inversa che hai applicato (l’inversa di +b è −b, non +b).' },
    { id: 'calcolo', when: 'smallSlip', message: 'Il procedimento sembra impostato bene, ma c’è un piccolo errore di calcolo in uno dei passaggi: ricontrolla le somme e le differenze.' }
  ]
};

function commonErrorsFor(ex) {
  if (Array.isArray(ex.commonErrors)) return ex.commonErrors;
  if (ex.commonErrorsKey && COMMON_ERROR_SETS[ex.commonErrorsKey]) return COMMON_ERROR_SETS[ex.commonErrorsKey];
  return null;
}

function diagnoseCommonError(ex, userVal, correctVal) {
  const errors = commonErrorsFor(ex);
  if (!errors || !errors.length) return null;
  for (const err of errors) {
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
  const gen = resolveGenerator(ex);
  if (!gen || typeof Interactions === 'undefined') return null;
  return gen.generate(ex);
}

// Generatore 'equazioni': l'unico registrato per ora. Si aggancia
// implicitamente a qualunque ex.model in forma {a,b,c,d} (vedi
// resolveGenerator), quindi nessun esercizio esistente in data.js ha
// bisogno di dichiarare generatorKey: 'equazioni' esplicitamente.
registerTwinGenerator('equazioni', {
  generate(ex) {
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
      commonErrors: commonErrorsFor(ex),
      skill: ex.skill,
      level6: ex.level6,
      cognitiveType: ex.cognitiveType,
      model
    };
  },
  solutionSteps(ex) { return Interactions.EquationModel.solutionSteps(ex.model); },
  level3Hint(ex) {
    const EM = Interactions.EquationModel;
    const move = EM.correctMove(ex.model);
    return move ? `Il prossimo passo: applica "${EM.moveLabel(move)}" a entrambi i membri. Prova a calcolarlo tu prima di guardare il risultato.` : null;
  }
});

/* ===== Generatori 'numeri'/'frazioni'/'potenze'/'algebra'/'geometria' =====
   A differenza di equazioni (un modello simbolico ax+b=cx+d riusabile per
   qualunque esercizio del modulo), questi 5 moduli non hanno un modello
   simbolico unico per skill: riusano invece le stesse funzioni generatrici
   "corrette per costruzione" di generators.js (lo stesso codice che ha
   originariamente popolato i pool di data.js, vedi CLAUDE.md), dispatchate
   per livello via ex.model.level. Un gemello è quindi "stesso modulo, stesso
   livello, pattern scelto a caso tra quelli del generatore" — meno preciso
   del match per singola skill di equazioni, ma corretto per costruzione e
   sufficiente per il ripasso mirato adattivo (vedi PIANO_SVILUPPO_V2.md
   FASE 4/5). Registrato solo se generators.js è stato caricato.
*/
if (typeof Generators !== 'undefined') {
  ['numeri', 'frazioni', 'potenze', 'algebra', 'geometria'].forEach(moduleId => {
    registerTwinGenerator(moduleId, {
      generate(ex) {
        const level = ex.model && ex.model.level;
        const genFn = Generators[moduleId] && Generators[moduleId][level];
        if (!genFn) return null;
        const fresh = genFn(1)[0];
        return {
          q: fresh.q,
          answer: fresh.answer,
          type: fresh.type,
          unit: fresh.unit,
          hint: ex.hint,
          hintSteps: ex.hintSteps,
          commonErrors: commonErrorsFor(ex),
          skill: ex.skill,
          cognitiveType: ex.cognitiveType,
          model: ex.model
        };
      },
      // Nessun modello simbolico condiviso da percorrere passo-passo: il
      // livello 4/5 mostra il richiamo della regola (hint) seguito dal
      // risultato, il livello 3 richiama la regola senza svelare il numero.
      solutionSteps(ex) {
        const ans = Array.isArray(ex.answer) ? ex.answer[0] : ex.answer;
        return [ex.hint, `Risultato: ${ans}${ex.unit ? ' ' + ex.unit : ''}`];
      },
      level3Hint(ex) {
        return (ex.hintSteps && ex.hintSteps[ex.hintSteps.length - 1]) || ex.hint;
      }
    });
  });
}

/* ===== export (script classico) ===== */
const HelpEngine = {
  HELP_MAX_LEVEL,
  helpHasLadder,
  helpMaxLevelFor,
  nextHelpLevel,
  getHelpContent,
  commonErrorsFor,
  diagnoseCommonError,
  generateTwin,
  canGenerateTwin,
  registerTwinGenerator
};
