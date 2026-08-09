'use strict';

/* ===== Costanti ===== */
const STUDENT_NAME = 'Alessandra';
const LEVELS = ['facile', 'medio', 'difficile'];
const LEVEL_LABELS = { facile: 'Facile', medio: 'Medio', difficile: 'Difficile' };
const STORAGE_KEY = 'ripasso-mate-progress-v1';
const HISTORY_KEY = 'ripasso-mate-history-v1';
const HISTORY_MAX = 1000;

/* ===== Progresso persistente ===== */
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}
function saveProgress() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (e) { /* storage non disponibile */ }
}
let progress = loadProgress();

function ensureModuleProgress(id) {
  if (!progress[id]) {
    progress[id] = {
      theorySeen: false,
      exercises: { facile: false, medio: false, difficile: false },
      quiz: { done: false, score: 0, total: 0 }
    };
  }
  return progress[id];
}

function getModule(id) { return MODULES.find(m => m.id === id); }
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

// Ogni livello di ogni modulo aveva esattamente 12 esercizi in V1 (vedi
// docs/AUDIT_DIDATTICO.md). Se un progresso "completato" non porta con sé un
// conteggio esplicito (perché salvato prima di questo campo), si presume
// fosse contro quella banca V1: se la banca attuale ha un numero diverso di
// esercizi, il livello va considerato "da riaprire", non più aggiornato.
// Campo additivo: nessuna migrazione di STORAGE_KEY necessaria.
const LEGACY_EXERCISE_COUNT = 12;
function isLevelStale(m, p, level) {
  if (!p.exercises[level]) return false;
  const currentCount = m.exercises[level].length;
  const completedCount = (p.exerciseCounts && p.exerciseCounts[level] !== undefined) ? p.exerciseCounts[level] : LEGACY_EXERCISE_COUNT;
  return completedCount !== currentCount;
}

/* ===== Storico risposte (per statistiche e futura personalizzazione) ===== */
function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
function saveHistory() {
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch (e) { /* storage non disponibile */ }
}
let history = loadHistory();

/* ===== Curiosità: persistenza (storage separato, non tocca progress/history) ===== */
const CURIOSITA_KEY = 'ripasso-mate-curiosita-v1';
function loadCuriositaProgress() {
  try {
    const raw = localStorage.getItem(CURIOSITA_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return (parsed && typeof parsed === 'object' && parsed.quizDone) ? parsed : { quizDone: {} };
  } catch (e) {
    return { quizDone: {} };
  }
}
function saveCuriositaProgress() {
  try { localStorage.setItem(CURIOSITA_KEY, JSON.stringify(curiositaProgress)); } catch (e) { /* storage non disponibile */ }
}
let curiositaProgress = loadCuriositaProgress();
const CURIOSITA_CATEGORY_LABELS = { spazio: 'Spazio', scienza: 'Scienza', natura: 'Natura', corpo_umano: 'Corpo umano', tecnologia: 'Tecnologia', storia: 'Storia', geografia: 'Geografia' };
function sortedCuriosita() {
  if (typeof CURIOSITA === 'undefined') return [];
  return [...CURIOSITA].sort((a, b) => b.date.localeCompare(a.date));
}

function logAttempt(entry) {
  history.push({ ts: Date.now(), ...entry });
  if (history.length > HISTORY_MAX) history = history.slice(history.length - HISTORY_MAX);
  saveHistory();
}

function computeStats() {
  const perModule = MODULES.map(m => {
    const attempts = history.filter(h => h.moduleId === m.id);
    const correct = attempts.filter(h => h.correct).length;
    const pct = attempts.length ? Math.round((correct / attempts.length) * 100) : null;
    return { id: m.id, title: m.title, icon: m.icon, accent: m.accent, attempts: attempts.length, correct, pct };
  });

  const wrongCounts = new Map();
  history.forEach(h => {
    if (h.correct) return;
    const key = h.moduleId + '|' + h.question;
    const prev = wrongCounts.get(key);
    if (prev) prev.count++;
    else wrongCounts.set(key, { moduleTitle: getModule(h.moduleId).title, question: h.question, count: 1, logic: !!h.logic });
  });
  const topMistakes = Array.from(wrongCounts.values()).sort((a, b) => b.count - a.count).slice(0, 5);

  const totalAttempts = history.length;
  const totalCorrect = history.filter(h => h.correct).length;
  return { perModule, topMistakes, totalAttempts, totalCorrect };
}

// Stima di padronanza per skill, ricavata dallo storico già presente in
// localStorage (nessun nuovo storage, nessun server). Solo i tentativi con
// un campo `skill` (oggi: equazioni) contribuiscono. Pesa le risposte più
// recenti più di quelle vecchie e richiede almeno MIN_ATTEMPTS tentativi
// prima di esprimere un giudizio, per evitare percentuali ingannevoli con
// un solo tentativo (PIANO_SVILUPPO_V2.md §7.1).
const MASTERY_MIN_ATTEMPTS = 2;
const MASTERY_RECENT_WINDOW = 8;
function computeMastery() {
  const bySkill = new Map();
  history.forEach(h => {
    if (!h.skill || h.kind !== 'exercise') return;
    if (!bySkill.has(h.skill)) bySkill.set(h.skill, []);
    bySkill.get(h.skill).push(h);
  });
  const mastery = {};
  bySkill.forEach((attempts, skill) => {
    const sorted = attempts.slice().sort((a, b) => a.ts - b.ts);
    const recent = sorted.slice(-MASTERY_RECENT_WINDOW);
    let score = 0, weightSum = 0;
    recent.forEach((h, i) => {
      const weight = i + 1;
      score += (h.correct ? 1 : 0) * weight;
      weightSum += weight;
    });
    mastery[skill] = {
      pct: attempts.length >= MASTERY_MIN_ATTEMPTS && weightSum ? Math.round((score / weightSum) * 100) : null,
      attempts: attempts.length
    };
  });
  return mastery;
}
// Le skill "deboli" per il ripasso mirato: mastery nota e sotto soglia,
// ordinate dalla più debole. Esclude le skill senza abbastanza tentativi.
function weakSkills(mastery, threshold, max) {
  return Object.entries(mastery)
    .filter(([, m]) => m.pct !== null && m.pct < threshold)
    .sort((a, b) => a[1].pct - b[1].pct)
    .slice(0, max)
    .map(([skill]) => skill);
}

/* ===== Verifica risposte ===== */
function normalizeNumber(str) {
  const s = String(str).trim().replace(',', '.');
  if (/^-?\d+\/\d+$/.test(s)) {
    const [a, b] = s.split('/').map(Number);
    return b === 0 ? null : a / b;
  }
  const n = parseFloat(s);
  return Number.isNaN(n) ? null : n;
}
function normalizeExpr(str) {
  return String(str).toLowerCase().replace(/\s+/g, '').replace(/\*/g, '');
}
function checkAnswer(ex, raw) {
  const input = String(raw).trim();
  if (!input) return false;
  if (ex.type === 'expr') {
    const userNorm = normalizeExpr(input);
    return ex.answer.some(a => normalizeExpr(a) === userNorm);
  }
  const userVal = normalizeNumber(input);
  const correctVal = normalizeNumber(ex.answer);
  if (userVal === null || correctVal === null) return false;
  const tolerance = Math.max(0.01, Math.abs(correctVal) * 0.01);
  return Math.abs(userVal - correctVal) <= tolerance;
}

/* ===== Stato applicazione ===== */
const FORMAT_KEY = { balance: 'balance', order: 'order', group: 'group', build: 'build', 'error-detect': 'errorDetect' };
const state = {
  view: 'home',
  moduleId: null,
  theoryIndex: 0,
  theoryRevealed: {},
  theoryChecks: {}, // { [slideIndex]: {selected, checked} } per le micro-verifiche non punitive
  exLevel: 'facile',
  exIndex: 0,
  exState: 'question', // question | checked | levelComplete
  exHelpLevel: 0, // scala di aiuto 0-6 (HELP_SYSTEM_V2.md); 0 = nessun aiuto richiesto
  exErrorDiagnosis: null, // { message } dalla banca errori comuni, se l'ultima risposta errata corrisponde a un pattern noto
  exTwin: null, // esercizio gemello generato al livello 6 di aiuto, sostituisce l'esercizio corrente finché non si preme "Avanti"
  exTwinAttempt: 0, // quanti gemelli sono già stati generati per l'esercizio corrente (0 = nessuno ancora)
  exWrongStreak: 0, // errori consecutivi sulla stessa famiglia di esercizio (level6), per la regola di regressione
  exWrongStreakGroup: null,
  remediationRule: null, // testo di richiamo mostrato nella schermata di micro-ripasso
  remediationTwin: null, // esercizio di recupero generato dalla regola di regressione, in attesa di essere avviato
  interaction: null, // stato del componente interattivo (bilancia/riordino/raggruppa/costruisci/caccia-errore) per l'esercizio corrente
  exLastCorrect: false,
  exUserAnswer: '',
  exSelectedIndex: null,
  quizIndex: 0,
  quizScore: 0,
  quizAnswered: false,
  quizSelected: null,
  ripassoQueue: [], // esercizi gemelli generati per il ripasso mirato sulle skill deboli
  ripassoIndex: 0,
  ripassoChecked: false,
  ripassoLastCorrect: false,
  ripassoUserAnswer: '',
  ripassoScore: 0,
  curiositaId: null, // id della curiosità aperta in vista dettaglio
  curiositaQuizChecked: false,
  curiositaQuizSelected: null
};

/* ===== Navigazione ===== */
function goHome() { state.view = 'home'; state.moduleId = null; render(); }
function openModule(id) { state.moduleId = id; state.view = 'module-menu'; render(); }
function backToModuleMenu() { state.view = 'module-menu'; render(); }

/* ===== Curiosità: navigazione ===== */
function openCuriositaList() { state.view = 'curiosita-list'; render(); }
function openCuriositaDetail(id) {
  state.curiositaId = id;
  state.curiositaQuizChecked = false;
  state.curiositaQuizSelected = null;
  state.view = 'curiosita-detail';
  render();
}
function selectCuriositaQuiz(idx) {
  if (state.curiositaQuizChecked) return;
  const item = CURIOSITA.find(c => c.id === state.curiositaId);
  if (!item) return;
  state.curiositaQuizSelected = idx;
  state.curiositaQuizChecked = true;
  curiositaProgress.quizDone[item.id] = { correct: idx === item.quiz.correct };
  saveCuriositaProgress();
  render();
}

function openTheory() { state.view = 'theory'; state.theoryIndex = 0; state.theoryRevealed = {}; state.theoryChecks = {}; render(); }
function microcheckSelect(slideIndex, index) {
  const cur = state.theoryChecks[slideIndex] || { selected: null, checked: false };
  if (cur.checked) return;
  state.theoryChecks[slideIndex] = { selected: index, checked: true };
  render();
}
function revealStep(idx) {
  const m = getModule(state.moduleId);
  const slide = m.theory[idx];
  if (!slide || slide.type !== 'steps') return;
  const current = state.theoryRevealed[idx] || 1;
  state.theoryRevealed[idx] = Math.min(current + 1, slide.steps.length);
  render();
}
function markTheorySeen() { ensureModuleProgress(state.moduleId).theorySeen = true; saveProgress(); }
function moveSlide(delta) {
  const m = getModule(state.moduleId);
  state.theoryIndex = clamp(state.theoryIndex + delta, 0, m.theory.length - 1);
  render();
}

// Reimposta tutto lo stato UI effimero (aiuto/selezione/interazione) legato
// all'esercizio corrente e, se l'esercizio ha un format interattivo,
// inizializza il suo stato tramite Interactions.<format>.init(). Chiamata
// ogni volta che l'esercizio "attivo" cambia (nuovo livello, avanti, gemello).
function resetExerciseUIState() {
  state.exState = 'question';
  state.exHelpLevel = 0;
  state.exSelectedIndex = null;
  state.exUserAnswer = '';
  state.exErrorDiagnosis = null;
  state.exTwin = null;
  state.exTwinAttempt = 0;
  state.remediationRule = null;
  state.remediationTwin = null;
  state.interaction = null;
  const m = getModule(state.moduleId);
  const list = m && m.exercises[state.exLevel];
  const ex = list && list[state.exIndex];
  if (ex && ex.format && FORMAT_KEY[ex.format]) {
    state.interaction = Interactions[FORMAT_KEY[ex.format]].init(ex);
  }
}
// L'esercizio "attivo" è normalmente quello in posizione exIndex, tranne
// quando è in corso un esercizio gemello (livello 6 di aiuto): in quel caso
// lo sostituisce temporaneamente senza avanzare nella lista.
function getCurrentExercise() {
  if (state.exTwin) return state.exTwin;
  const m = getModule(state.moduleId);
  return m.exercises[state.exLevel][state.exIndex];
}

function openExercises(levelOverride) {
  const m = getModule(state.moduleId);
  const p = ensureModuleProgress(state.moduleId);
  state.exLevel = levelOverride || LEVELS.find(l => !p.exercises[l] || isLevelStale(m, p, l)) || 'facile';
  state.exIndex = 0;
  state.exWrongStreak = 0;
  state.exWrongStreakGroup = null;
  state.view = 'exercises';
  resetExerciseUIState();
  render();
}
function bumpHelpLevel() {
  const ex = getCurrentExercise();
  state.exHelpLevel = HelpEngine.nextHelpLevel(ex, state.exHelpLevel);
  render();
}
function requestTwin() {
  const ex = getCurrentExercise();
  const twin = HelpEngine.generateTwin(ex);
  if (!twin) return;
  state.exTwin = twin;
  state.exTwinAttempt = (state.exTwinAttempt || 0) + 1;
  state.exState = 'question';
  state.exHelpLevel = 0;
  state.exSelectedIndex = null;
  state.exUserAnswer = '';
  state.exErrorDiagnosis = null;
  state.interaction = null; // i gemelli generati sono sempre a risposta numerica
  render();
}

// ===== Regola di regressione (HELP_SYSTEM_V2.md) =====
// Deterministica, locale, senza alcuna dipendenza esterna: 3 errori
// consecutivi sulla stessa famiglia di esercizio (ex.level6) interrompono la
// progressione automatica e inseriscono un micro-ripasso + un esercizio di
// recupero prima di riprendere. Non si applica durante un gemello già in
// corso: lì il recupero è già gestito da requestTwin/exerciseNext (vedi
// renderInteractiveExercise/numeric checked-branch, ramo "gemello sbagliato").
const REMEDIATION_THRESHOLD = 3;
function recordAttemptOutcome(ex, correct) {
  if (correct) { state.exWrongStreak = 0; state.exWrongStreakGroup = null; return; }
  const group = ex.level6 != null ? ex.level6 : (ex.skill || null);
  if (group !== null && group === state.exWrongStreakGroup) state.exWrongStreak++;
  else { state.exWrongStreak = 1; state.exWrongStreakGroup = group; }
}
function maybeTriggerRemediation(ex) {
  if (state.exTwin) return;
  if (state.exWrongStreak < REMEDIATION_THRESHOLD) return;
  if (!ex.model) return; // serve un modello simbolico per generare un esercizio di recupero
  state.exState = 'remediation';
  state.remediationRule = (ex.hintSteps && ex.hintSteps[1]) || ex.hint;
  state.remediationTwin = HelpEngine.generateTwin(ex);
  state.exWrongStreak = 0;
  state.exWrongStreakGroup = null;
}
function remediationContinue() {
  if (state.remediationTwin) {
    state.exTwin = state.remediationTwin;
    state.remediationTwin = null;
    state.remediationRule = null;
    state.exState = 'question';
    state.exHelpLevel = 0;
    state.exTwinAttempt = 1;
    state.exSelectedIndex = null;
    state.exUserAnswer = '';
    state.exErrorDiagnosis = null;
    state.interaction = null;
    render();
    return;
  }
  state.remediationRule = null;
  exerciseNext();
}

function checkCurrentAnswer() {
  const input = document.getElementById('ex-input');
  if (!input || !input.value.trim()) { if (input) input.focus(); return; }
  const m = getModule(state.moduleId);
  const ex = getCurrentExercise();
  state.exLastCorrect = checkAnswer(ex, input.value);
  state.exUserAnswer = input.value;
  state.exState = 'checked';
  state.exErrorDiagnosis = null;
  if (!state.exLastCorrect) {
    const userVal = normalizeNumber(input.value);
    const correctRaw = Array.isArray(ex.answer) ? ex.answer[0] : ex.answer;
    state.exErrorDiagnosis = HelpEngine.diagnoseCommonError(ex, userVal, normalizeNumber(correctRaw));
  }
  logAttempt({ moduleId: m.id, kind: 'exercise', level: state.exLevel, question: ex.q, correct: state.exLastCorrect, logic: !!ex.logic, twin: !!state.exTwin, skill: ex.skill || null });
  if (!state.exTwin) {
    recordAttemptOutcome(ex, state.exLastCorrect);
    maybeTriggerRemediation(ex);
  }
  render();
}
function selectExerciseChoice(idx) {
  if (state.exState === 'checked') return;
  const m = getModule(state.moduleId);
  const ex = getCurrentExercise();
  state.exSelectedIndex = idx;
  state.exLastCorrect = idx === ex.correct;
  state.exState = 'checked';
  logAttempt({ moduleId: m.id, kind: 'exercise', level: state.exLevel, question: ex.q, correct: state.exLastCorrect, logic: !!ex.logic });
  render();
}
function applyInteraction(kind, method, ...args) {
  const m = getModule(state.moduleId);
  const ex = getCurrentExercise();
  const comp = Interactions[kind];
  const result = comp[method](ex, state.interaction, ...args);
  state.interaction = result.ist;
  if (result.completed) {
    state.exLastCorrect = result.correct;
    state.exState = 'checked';
    logAttempt({ moduleId: m.id, kind: 'exercise', level: state.exLevel, question: ex.q, correct: result.correct, logic: !!ex.logic, twin: !!state.exTwin, skill: ex.skill || null });
    if (!state.exTwin) {
      recordAttemptOutcome(ex, result.correct);
      maybeTriggerRemediation(ex);
    }
  }
  render();
}
function exerciseNext() {
  const m = getModule(state.moduleId);
  const list = m.exercises[state.exLevel];
  state.exIndex++;
  resetExerciseUIState();
  if (state.exIndex >= list.length) {
    const p = ensureModuleProgress(state.moduleId);
    p.exercises[state.exLevel] = true;
    p.exerciseCounts = p.exerciseCounts || {};
    p.exerciseCounts[state.exLevel] = list.length;
    saveProgress();
    state.exState = 'levelComplete';
  }
  render();
}
function levelContinue() {
  if (state.exLevel === 'difficile') { openQuiz(); return; }
  state.exLevel = LEVELS[LEVELS.indexOf(state.exLevel) + 1];
  state.exIndex = 0;
  state.exWrongStreak = 0;
  state.exWrongStreakGroup = null;
  resetExerciseUIState();
  render();
}

function openQuiz() {
  state.view = 'quiz';
  state.quizIndex = 0;
  state.quizScore = 0;
  state.quizAnswered = false;
  state.quizSelected = null;
  render();
}
function selectQuizOption(idx) {
  if (state.quizAnswered) return;
  const m = getModule(state.moduleId);
  const q = m.quiz[state.quizIndex];
  state.quizAnswered = true;
  state.quizSelected = idx;
  const correct = idx === q.correct;
  if (correct) state.quizScore++;
  logAttempt({ moduleId: m.id, kind: 'quiz', level: null, question: q.q, correct, logic: !!q.logic });
  render();
}
function quizNext() {
  if (!state.quizAnswered) return;
  const m = getModule(state.moduleId);
  state.quizIndex++;
  state.quizAnswered = false;
  state.quizSelected = null;
  if (state.quizIndex >= m.quiz.length) {
    const p = ensureModuleProgress(state.moduleId);
    p.quiz = { done: true, score: state.quizScore, total: m.quiz.length };
    saveProgress();
    state.view = 'result';
  }
  render();
}

/* ===== Ripasso mirato (esercizi adattivi) =====
   Sessione breve di esercizi generati al volo (stesso motore dei gemelli,
   Interactions.EquationModel + HelpEngine.generateTwin) mirati sulle skill
   con la mastery più bassa calcolata dallo storico. Non tocca il progresso
   "ufficiale" dei livelli: è pratica supplementare su richiesta, non parte
   della sequenza valutata. Oggi disponibile solo per equazioni (unico
   modulo con esercizi taggati per skill/model). */
const RIPASSO_SIZE = 5;
const RIPASSO_THRESHOLD = 70;
function buildRipassoQueue() {
  const eq = getModule('equazioni');
  const allEx = [...eq.exercises.facile, ...eq.exercises.medio, ...eq.exercises.difficile];
  const withModel = allEx.filter(e => e.model);
  const mastery = computeMastery();
  const weak = weakSkills(mastery, RIPASSO_THRESHOLD, RIPASSO_SIZE);
  const queue = [];
  weak.forEach(skill => {
    const exemplar = withModel.find(e => e.skill === skill);
    const twin = exemplar && HelpEngine.generateTwin(exemplar);
    if (twin) queue.push(twin);
  });
  // Storico troppo corto per individuare skill deboli: pesca comunque un
  // breve giro di pratica invece di lasciare la sessione vuota.
  let guard = 0;
  while (queue.length < RIPASSO_SIZE && withModel.length && guard < 20) {
    const pick = withModel[Math.floor(Math.random() * withModel.length)];
    const twin = HelpEngine.generateTwin(pick);
    if (twin) queue.push(twin);
    guard++;
  }
  return queue;
}
function startRipassoMirato() {
  state.moduleId = 'equazioni';
  state.view = 'ripasso';
  state.ripassoQueue = buildRipassoQueue();
  state.ripassoIndex = 0;
  state.ripassoChecked = false;
  state.ripassoUserAnswer = '';
  state.ripassoScore = 0;
  render();
}
function checkRipassoAnswer() {
  const input = document.getElementById('ripasso-input');
  if (!input || !input.value.trim()) { if (input) input.focus(); return; }
  const ex = state.ripassoQueue[state.ripassoIndex];
  state.ripassoLastCorrect = checkAnswer(ex, input.value);
  state.ripassoUserAnswer = input.value;
  state.ripassoChecked = true;
  if (state.ripassoLastCorrect) state.ripassoScore++;
  logAttempt({ moduleId: 'equazioni', kind: 'exercise', level: null, question: ex.q, correct: state.ripassoLastCorrect, skill: ex.skill || null, ripasso: true });
  render();
}
function ripassoNext() {
  state.ripassoIndex++;
  state.ripassoChecked = false;
  state.ripassoUserAnswer = '';
  render();
}

/* ===== Rendering: Home ===== */
function progressLabel(p) {
  if (p.quiz.done) return `Completata · ${p.quiz.score}/${p.quiz.total} al quiz`;
  if (LEVELS.every(l => p.exercises[l])) return 'Esercizi fatti · manca il quiz';
  if (p.theorySeen) return 'Teoria vista · esercizi da fare';
  return 'Da iniziare';
}
function renderHome() {
  const stops = MODULES.map((m, i) => {
    const p = ensureModuleProgress(m.id);
    return `
      <button class="stop ${p.quiz.done ? 'is-done' : ''} stop--${m.accent}" type="button" data-action="open-module" data-id="${m.id}">
        <span class="stop__connector" aria-hidden="true"></span>
        <span class="stop__badge">${m.icon}</span>
        <span class="stop__body">
          <span class="stop__title">${i + 1}. ${m.title}</span>
          <span class="stop__tagline">${m.tagline}</span>
          <span class="stop__progress">${progressLabel(p)}</span>
        </span>
        <span class="stop__stamp" aria-hidden="true">✔</span>
      </button>`;
  }).join('');
  const stamps = MODULES.filter(m => ensureModuleProgress(m.id).quiz.done).length;
  return `
    <header class="topbar topbar--home">
      <button class="diary-link" data-action="open-diario" type="button">📖 Diario</button>
      <p class="eyebrow">Il passaporto di ${STUDENT_NAME} · ${stamps}/${MODULES.length} timbri</p>
      <h1 class="app-title">In viaggio con la Matematica</h1>
      <p class="app-subtitle">Ogni tappa ha teoria, esercizi che crescono di difficoltà (con qualche indovinello di logica!) e un quiz finale. Buon viaggio, ${STUDENT_NAME}! 🧳</p>
    </header>
    ${renderCuriositaTeaser()}
    <div class="route">${stops}</div>
  `;
}
// Piccolo invito alla sezione Curiosità (separata dal percorso di
// matematica): mostra l'ultima voce aggiunta. Nessun output se il primo
// lotto di contenuti non è ancora stato pubblicato (CURIOSITA vuoto).
function renderCuriositaTeaser() {
  const items = sortedCuriosita();
  if (!items.length) return '';
  const latest = items[0];
  return `
    <button class="curiosita-teaser" data-action="open-curiosita-list" type="button">
      <span class="curiosita-teaser__icon">${latest.icon}</span>
      <span class="curiosita-teaser__body">
        <span class="curiosita-teaser__label">Curiosità di oggi</span>
        <span class="curiosita-teaser__title">${latest.title}</span>
      </span>
      <span class="curiosita-teaser__arrow" aria-hidden="true">→</span>
    </button>`;
}

/* ===== Rendering: Menu modulo ===== */
function renderModuleMenu() {
  const m = getModule(state.moduleId);
  const p = ensureModuleProgress(m.id);
  const idx = MODULES.indexOf(m);
  const levelsDone = LEVELS.filter(l => p.exercises[l]).length;
  return `
    <header class="topbar">
      <button class="back" data-action="go-home" type="button" aria-label="Torna alla mappa">←</button>
      <p class="eyebrow">${m.icon} Tappa ${idx + 1} di ${MODULES.length}</p>
      <h1 class="module-title">${m.title}</h1>
    </header>
    <div class="menu-cards">
      <button class="menu-card" data-action="open-theory" type="button">
        <span class="menu-card__icon">📖</span>
        <span class="menu-card__label">Teoria</span>
        <span class="menu-card__hint">${p.theorySeen ? 'Rivedi le cartoline quando vuoi' : 'Ripassa le regole in cartoline'}</span>
      </button>
      <button class="menu-card" data-action="open-exercises" type="button">
        <span class="menu-card__icon">✏️</span>
        <span class="menu-card__label">Esercizi</span>
        <span class="menu-card__hint">Facili → medi → difficili</span>
        <span class="menu-card__progress">${levelsDone}/3 livelli completati</span>
      </button>
      <button class="menu-card" data-action="open-quiz" type="button">
        <span class="menu-card__icon">🎫</span>
        <span class="menu-card__label">Quiz finale</span>
        <span class="menu-card__hint">Ottieni il timbro sul passaporto</span>
        <span class="menu-card__progress">${p.quiz.done ? `Fatto · ${p.quiz.score}/${p.quiz.total}` : 'Da fare'}</span>
      </button>
    </div>
  `;
}

/* ===== Rendering: Teoria ===== */
function renderStepsPostcard(s, idx) {
  const revealed = state.theoryRevealed[idx] || 1;
  const total = s.steps.length;
  const items = s.steps.slice(0, revealed).map((text, i) => `
    <div class="step-item ${i === revealed - 1 ? 'step-item--enter' : ''}">
      <span class="step-item__badge">${i + 1}</span>
      <span class="step-item__connector" aria-hidden="true"></span>
      <p class="step-item__text">${text}</p>
    </div>`).join('');
  const isDone = revealed >= total;
  const footer = isDone
    ? `<p class="step-item__done">✓ Hai visto tutti i passaggi</p>`
    : `<button class="btn btn--primary" data-action="reveal-step" data-slide-index="${idx}" type="button">Passo successivo (${revealed}/${total}) →</button>`;
  return `
    <article class="postcard postcard--steps">
      <p class="postcard__label">Appunti di viaggio</p>
      <h2 class="postcard__title">${s.title}</h2>
      <div class="step-list">${items}</div>
      ${footer}
    </article>`;
}
function renderMicrolessonPostcard(s, idx) {
  const st = state.theoryChecks[idx] || { selected: null, checked: false };
  const options = s.check.options.map((opt, i) => {
    let cls = 'quiz-option';
    if (st.checked) {
      if (i === s.check.correct) cls += ' is-correct';
      else if (i === st.selected) cls += ' is-wrong';
    }
    return `<button class="${cls}" type="button" data-action="microcheck-select" data-slide-index="${idx}" data-index="${i}" ${st.checked ? 'disabled' : ''}>${opt}</button>`;
  }).join('');
  const feedback = st.checked
    ? `<p class="exercise-feedback ${st.selected === s.check.correct ? 'is-ok' : 'is-bad'}">${st.selected === s.check.correct ? '✅ Esatto!' : '💡 Non proprio: la risposta giusta è evidenziata sopra.'}</p>`
    : '';
  return `
    <article class="postcard postcard--micro">
      <p class="postcard__label">Prerequisiti</p>
      <h2 class="postcard__title">${s.title}</h2>
      <p class="micro__situation">🤔 ${s.situation}</p>
      <p class="micro__explain">${s.explain}</p>
      <p class="micro__example">✏️ ${s.example}</p>
      <div class="micro-check">
        <p class="micro-check__q">${s.check.q}</p>
        <div class="quiz-options">${options}</div>
        ${feedback}
      </div>
    </article>`;
}
function renderTheory() {
  const m = getModule(state.moduleId);
  const slides = m.theory.map((s, i) => s.type === 'steps' ? renderStepsPostcard(s, i) : s.type === 'microlesson' ? renderMicrolessonPostcard(s, i) : `
    <article class="postcard">
      <p class="postcard__label">Appunti di viaggio</p>
      <h2 class="postcard__title">${s.title}</h2>
      <p class="postcard__body">${s.body}</p>
    </article>`).join('');
  const dots = m.theory.map((_, i) => `<span class="${i === state.theoryIndex ? 'is-active' : ''}"></span>`).join('');
  return `
    <header class="topbar">
      <button class="back" data-action="go-module" type="button" aria-label="Indietro">←</button>
      <p class="eyebrow">Teoria</p>
      <h1 class="module-title">${m.title}</h1>
    </header>
    <div class="deck" id="deck">
      <div class="deck__track" id="deck-track" style="transform: translateX(${-state.theoryIndex * 100}%)">${slides}</div>
    </div>
    <div class="deck-nav">
      <button class="deck-nav__btn" data-action="prev-slide" type="button" aria-label="Precedente" ${state.theoryIndex === 0 ? 'disabled' : ''}>‹</button>
      <div class="deck-dots">${dots}</div>
      <button class="deck-nav__btn" data-action="next-slide" type="button" aria-label="Successiva" ${state.theoryIndex === m.theory.length - 1 ? 'disabled' : ''}>›</button>
    </div>
    <button class="cta cta--wide" data-action="theory-done" type="button">Vai agli esercizi →</button>
  `;
}

/* ===== Rendering: Esercizi ===== */
// Le pillole sono sempre tappabili: permettono di riaprire un livello già
// completato (es. dopo un aggiornamento che ha aggiunto nuovi esercizi a un
// livello segnato "fatto" in passato — vedi isLevelStale) senza dover
// ripassare dalla teoria per trovare la scorciatoia "vai agli esercizi".
function levelTrackHtml(m, p) {
  return LEVELS.map(l => {
    const stale = isLevelStale(m, p, l);
    const cls = `level-pill ${l === state.exLevel ? 'is-current' : ''} ${p.exercises[l] && !stale ? 'is-complete' : ''}`;
    const badge = stale ? '<span class="level-pill__badge" title="Nuovi esercizi disponibili">●</span>' : '';
    return `<button class="${cls}" type="button" data-action="open-exercises-level" data-level="${l}">${LEVEL_LABELS[l]}${badge}</button>`;
  }).join('');
}
function renderLevelComplete() {
  const isLast = state.exLevel === 'difficile';
  const nextLabel = state.exLevel === 'facile' ? 'Medio' : 'Difficile';
  return `
    <div class="exercise-card" style="text-align:center;">
      <p class="exercise-q">🎉 Livello ${LEVEL_LABELS[state.exLevel]} completato!</p>
      <p style="color:var(--muted); font-size:14.5px; line-height:1.5;">
        ${isLast ? 'Hai finito tutti gli esercizi di questa tappa. Ora sei pronta per il quiz finale!' : `Passa al livello ${nextLabel} per esercizi un po' più impegnativi.`}
      </p>
      <div class="exercise-actions" style="margin-top:22px;">
        <button class="btn btn--primary" data-action="level-continue" type="button">${isLast ? 'Vai al quiz →' : `Continua: ${nextLabel} →`}</button>
      </div>
    </div>
  `;
}
// Regola di regressione (HELP_SYSTEM_V2.md): dopo errori ripetuti sulla
// stessa famiglia di esercizio, si interrompe la progressione automatica per
// un micro-ripasso prima di riprendere (mai un aumento di difficoltà).
function renderRemediation() {
  const cta = state.remediationTwin ? 'Prova un esempio simile →' : 'Ho capito, continua →';
  return `
    <div class="exercise-card">
      <p class="exercise-q">Facciamo una piccola pausa 🌿</p>
      <p style="color:var(--muted); font-size:14.5px; line-height:1.55; margin-bottom:16px;">Hai avuto qualche difficoltà con questo tipo di esercizio. Rivediamo insieme la regola prima di continuare.</p>
      <p class="exercise-hint">💡 ${state.remediationRule}</p>
      <div class="exercise-actions exercise-actions--end" style="margin-top:18px;">
        <button class="btn btn--primary" data-action="remediation-continue" type="button">${cta}</button>
      </div>
    </div>
  `;
}
// Contenuto dell'aiuto per il livello corrente (HELP_SYSTEM_V2.md): per gli
// esercizi senza scala (altri moduli) equivale al vecchio hint singolo.
function helpBlockHtml(ex) {
  const content = HelpEngine.getHelpContent(ex, state.exHelpLevel);
  if (!content) return '';
  if (content.kind === 'hint') return `<p class="exercise-hint">💡 ${content.text}</p>`;
  return `<div class="exercise-hint exercise-hint--steps"><p class="exercise-hint__label">💡 Passaggi:</p>${content.text.map(t => `<p>${t}</p>`).join('')}</div>`;
}
function helpButtonHtml(ex) {
  const max = HelpEngine.helpMaxLevelFor(ex);
  if (state.exHelpLevel >= max) {
    if (max >= HelpEngine.HELP_MAX_LEVEL && ex.model && !state.exTwin) {
      return `<button class="btn btn--ghost" data-action="request-twin" type="button">🔁 Esercizio simile</button>`;
    }
    return '';
  }
  return `<button class="btn btn--ghost" data-action="show-hint" type="button">💡 Aiuto</button>`;
}
function renderInteractiveExercise(ex, total, checked, logicTag, twinTag) {
  const comp = Interactions[FORMAT_KEY[ex.format]];
  const preStep = ex.preStep ? `<p class="exercise-prestep">📎 ${ex.preStep}</p>` : '';
  const body = comp.render(ex, state.interaction);
  const tail = checked
    ? `<div class="exercise-actions exercise-actions--end"><button class="btn btn--primary" data-action="exercise-next" type="button">Avanti →</button></div>`
    : `${helpBlockHtml(ex)}<div class="exercise-actions exercise-actions--end">${helpButtonHtml(ex)}</div>`;
  return `
    <p class="exercise-counter">${LEVEL_LABELS[state.exLevel]} · Domanda ${state.exIndex + 1} di ${total} ${logicTag}${twinTag}</p>
    <div class="exercise-card">${preStep}${body}${tail}</div>
  `;
}
function renderExerciseQuestion(m) {
  const list = m.exercises[state.exLevel];
  const ex = getCurrentExercise();
  const total = list.length;
  const checked = state.exState === 'checked';
  const logicTag = ex.logic ? `<span class="exercise-tag">🧠 Logica</span>` : '';
  const twinTag = state.exTwin ? `<span class="exercise-tag exercise-tag--twin">🔁 Esercizio simile</span>` : '';

  if (ex.format && FORMAT_KEY[ex.format]) {
    return renderInteractiveExercise(ex, total, checked, logicTag, twinTag);
  }

  if (ex.type === 'choice') {
    const optionsHtml = ex.options.map((opt, i) => {
      let cls = 'quiz-option';
      if (checked) {
        if (i === ex.correct) cls += ' is-correct';
        else if (i === state.exSelectedIndex) cls += ' is-wrong';
      }
      return `<button class="${cls}" type="button" data-action="exercise-choice" data-index="${i}" ${checked ? 'disabled' : ''}>${opt}</button>`;
    }).join('');
    const feedback = checked
      ? (state.exLastCorrect ? `<p class="exercise-feedback is-ok">✅ Esatto, complimenti!</p>` : `<p class="exercise-feedback is-bad">❌ La risposta corretta era: ${ex.options[ex.correct]}</p>`)
      : '';
    const actionsBlock = checked
      ? `<div class="exercise-actions exercise-actions--end"><button class="btn btn--primary" data-action="exercise-next" type="button">Avanti →</button></div>`
      : `<div class="exercise-actions exercise-actions--end">${helpButtonHtml(ex)}</div>`;
    return `
      <p class="exercise-counter">${LEVEL_LABELS[state.exLevel]} · Domanda ${state.exIndex + 1} di ${total} ${logicTag}${twinTag}</p>
      <div class="exercise-card">
        <p class="exercise-q">${ex.q}</p>
        <div class="quiz-options">${optionsHtml}</div>
        ${checked ? '' : helpBlockHtml(ex)}
        ${feedback}
        ${actionsBlock}
      </div>
    `;
  }

  const unit = ex.unit ? `<span class="exercise-unit">${ex.unit}</span>` : '';
  let feedbackBlock = '';
  let actionsBlock;
  if (checked) {
    if (state.exLastCorrect) {
      feedbackBlock = `<p class="exercise-feedback is-ok">✅ Esatto, complimenti!</p>`;
      actionsBlock = `<div class="exercise-actions exercise-actions--end"><button class="btn btn--primary" data-action="exercise-next" type="button">Avanti →</button></div>`;
    } else {
      const shown = ex.type === 'expr' ? ex.answer[0] : ex.answer;
      const diag = state.exErrorDiagnosis ? `<p class="exercise-feedback is-bad">🔍 ${state.exErrorDiagnosis.message}</p>` : '';
      feedbackBlock = diag + `<p class="exercise-feedback is-bad">❌ Non proprio. Risposta corretta: ${shown}${ex.unit ? ' ' + ex.unit : ''}</p>`;
      // Un gemello (livello 6) sbagliato non deve poter avanzare come se
      // nulla fosse: prima un secondo tentativo con un nuovo gemello, poi
      // (se ancora sbagliato) la soluzione guidata prima di proseguire —
      // "wrong -> understand -> repair -> verify -> continue", non un
      // "Avanti" incondizionato (fix Review Fase1 §2 finding H3).
      if (state.exTwin && state.exTwinAttempt < 2) {
        feedbackBlock += `<p class="exercise-hint">💡 Non fa niente: proviamo un altro esempio simile per verificare insieme che il concetto sia chiaro.</p>`;
        actionsBlock = `<div class="exercise-actions exercise-actions--end"><button class="btn btn--primary" data-action="request-twin" type="button">Riprova con un esempio simile →</button></div>`;
      } else if (state.exTwin) {
        const full = HelpEngine.getHelpContent(ex, HelpEngine.HELP_MAX_LEVEL);
        feedbackBlock += (full && full.kind === 'steps')
          ? `<div class="exercise-hint exercise-hint--steps"><p class="exercise-hint__label">💡 Ripassiamo insieme, passo per passo:</p>${full.text.map(t => `<p>${t}</p>`).join('')}</div>`
          : '';
        actionsBlock = `<div class="exercise-actions exercise-actions--end"><button class="btn btn--primary" data-action="exercise-next" type="button">Ho capito, continua →</button></div>`;
      } else {
        // Esercizio adattivo: subito dopo QUALSIASI errore (non solo dopo 3
        // di fila, che restano gestiti dalla regola di regressione), offre
        // un esercizio gemello generato al volo per rinforzare subito il
        // concetto sbagliato — non obbligatorio, la studentessa può anche
        // solo proseguire.
        const canRetrySimile = !!ex.model;
        actionsBlock = `<div class="exercise-actions exercise-actions--end">
          ${canRetrySimile ? '<button class="btn btn--ghost" data-action="request-twin" type="button">🔁 Prova un esercizio simile</button>' : ''}
          <button class="btn btn--primary" data-action="exercise-next" type="button">Avanti →</button>
        </div>`;
      }
    }
  } else {
    actionsBlock = `
      <div class="exercise-actions">
        ${helpButtonHtml(ex)}
        <button class="btn btn--primary" data-action="check-answer" type="button">Controlla</button>
      </div>`;
  }
  const inputValue = checked ? state.exUserAnswer : '';
  return `
    <p class="exercise-counter">${LEVEL_LABELS[state.exLevel]} · Domanda ${state.exIndex + 1} di ${total} ${logicTag}${twinTag}</p>
    <div class="exercise-card">
      <p class="exercise-q">${ex.q}</p>
      <div class="exercise-input-row">
        <input class="exercise-input" id="ex-input" type="text" inputmode="decimal" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="La tua risposta" value="${inputValue}" ${checked ? 'disabled' : ''}>
        ${unit}
      </div>
      ${checked ? '' : helpBlockHtml(ex)}
      ${feedbackBlock}
      ${actionsBlock}
    </div>
  `;
}
function renderExercises() {
  const m = getModule(state.moduleId);
  const p = ensureModuleProgress(m.id);
  const body = state.exState === 'levelComplete' ? renderLevelComplete()
    : state.exState === 'remediation' ? renderRemediation()
    : renderExerciseQuestion(m);
  return `
    <header class="topbar">
      <button class="back" data-action="go-module" type="button" aria-label="Indietro">←</button>
      <p class="eyebrow">Esercizi</p>
      <h1 class="module-title">${m.title}</h1>
    </header>
    <div class="level-track">${levelTrackHtml(m, p)}</div>
    <div class="exercise-wrap">${body}</div>
  `;
}

/* ===== Rendering: Quiz ===== */
function renderQuiz() {
  const m = getModule(state.moduleId);
  const q = m.quiz[state.quizIndex];
  const total = m.quiz.length;
  const optionsHtml = q.options.map((opt, i) => {
    let cls = 'quiz-option';
    if (state.quizAnswered) {
      if (i === q.correct) cls += ' is-correct';
      else if (i === state.quizSelected) cls += ' is-wrong';
    }
    return `<button class="${cls}" type="button" data-action="quiz-option" data-index="${i}" ${state.quizAnswered ? 'disabled' : ''}>${opt}</button>`;
  }).join('');
  const feedback = state.quizAnswered
    ? (state.quizSelected === q.correct
        ? `<p class="exercise-feedback is-ok">✅ Esatto!</p>`
        : `<p class="exercise-feedback is-bad">❌ La risposta corretta era: ${q.options[q.correct]}</p>`)
    : '';
  const nextBtn = state.quizAnswered
    ? `<button class="btn btn--primary" data-action="quiz-next" type="button">${state.quizIndex + 1 >= total ? 'Vedi il risultato →' : 'Avanti →'}</button>`
    : '';
  return `
    <header class="topbar">
      <button class="back" data-action="go-module" type="button" aria-label="Indietro">←</button>
      <p class="eyebrow">Quiz finale</p>
      <h1 class="module-title">${m.title}</h1>
    </header>
    <div class="exercise-wrap">
      <p class="exercise-counter">Domanda ${state.quizIndex + 1} di ${total}</p>
      <div class="exercise-card">
        <p class="exercise-q">${q.q}</p>
        <div class="quiz-options">${optionsHtml}</div>
        ${feedback}
        <div class="exercise-actions exercise-actions--end">${nextBtn}</div>
      </div>
    </div>
  `;
}

/* ===== Rendering: Carta d'imbarco (risultato) ===== */
function renderResult() {
  const m = getModule(state.moduleId);
  const p = ensureModuleProgress(m.id);
  const pct = Math.round((p.quiz.score / p.quiz.total) * 100);
  let outcome, message;
  if (pct >= 80) { outcome = 'Ottimo! 🌟'; message = 'Padroneggi già questa tappa. Sei pronta a proseguire il viaggio!'; }
  else if (pct >= 50) { outcome = 'Bene 💪'; message = 'Buon lavoro. Rivedi la teoria e riprova gli esercizi più difficili per fissare bene i concetti.'; }
  else { outcome = 'Da rivedere 📚'; message = 'Nessun problema: ripassa le cartoline di teoria e rifai gli esercizi con calma, poi riprova il quiz.'; }
  return `
    <header class="topbar">
      <button class="back" data-action="go-home" type="button" aria-label="Torna alla mappa">←</button>
    </header>
    <div class="pass-wrap">
      <div class="pass">
        <div class="pass__main">
          <p class="pass__eyebrow">Carta d'imbarco</p>
          <h2 class="pass__title">Quiz completato</h2>
          <div class="pass__row">
            <div><p class="pass__label">Passeggera</p><p class="pass__value">${STUDENT_NAME}</p></div>
            <div><p class="pass__label">Tappa</p><p class="pass__value">${m.title}</p></div>
          </div>
          <div class="pass__row">
            <div><p class="pass__label">Punteggio</p><p class="pass__value pass__value--big">${p.quiz.score}/${p.quiz.total}</p></div>
            <div><p class="pass__label">Esito</p><p class="pass__value">${outcome}</p></div>
          </div>
        </div>
        <div class="pass__stub">
          <span class="pass__stamp">✔</span>
          <p class="pass__gate">GATE<br><span>${m.icon}</span></p>
        </div>
      </div>
      <p class="pass__message">${message}</p>
      <button class="cta cta--wide" data-action="go-home" type="button">Torna alla mappa del viaggio</button>
    </div>
  `;
}

/* ===== Rendering: Ripasso mirato ===== */
function renderRipasso() {
  const total = state.ripassoQueue.length;
  const header = `
    <header class="topbar">
      <button class="back" data-action="open-diario" type="button" aria-label="Indietro">←</button>
      <p class="eyebrow">Ripasso mirato · Equazioni</p>
      <h1 class="module-title">${total ? `Domanda ${Math.min(state.ripassoIndex + 1, total)} di ${total}` : 'Ripasso mirato'}</h1>
    </header>`;
  if (total === 0) {
    return header + `
      <div class="exercise-wrap">
        <div class="exercise-card" style="text-align:center;">
          <p class="exercise-q">Non ci sono ancora abbastanza esercizi di equazioni per generare un ripasso mirato.</p>
        </div>
      </div>`;
  }
  if (state.ripassoIndex >= total) {
    return header + `
      <div class="exercise-wrap">
        <div class="exercise-card" style="text-align:center;">
          <p class="exercise-q">🎉 Ripasso completato!</p>
          <p style="color:var(--muted); font-size:14.5px; line-height:1.5;">${state.ripassoScore}/${total} risposte corrette.</p>
          <div class="exercise-actions" style="margin-top:22px; justify-content:center;">
            <button class="btn btn--primary" data-action="open-diario" type="button">Torna al Diario</button>
          </div>
        </div>
      </div>`;
  }
  const ex = state.ripassoQueue[state.ripassoIndex];
  const checked = state.ripassoChecked;
  let feedbackBlock = '', actionsBlock;
  if (checked) {
    feedbackBlock = state.ripassoLastCorrect
      ? `<p class="exercise-feedback is-ok">✅ Esatto, complimenti!</p>`
      : `<p class="exercise-feedback is-bad">❌ Non proprio. Risposta corretta: ${ex.answer}</p>`;
    actionsBlock = `<div class="exercise-actions exercise-actions--end"><button class="btn btn--primary" data-action="ripasso-next" type="button">${state.ripassoIndex + 1 >= total ? 'Vedi il risultato →' : 'Avanti →'}</button></div>`;
  } else {
    actionsBlock = `<div class="exercise-actions exercise-actions--end"><button class="btn btn--primary" data-action="ripasso-check" type="button">Controlla</button></div>`;
  }
  return header + `
    <div class="exercise-wrap">
      <div class="exercise-card">
        <p class="exercise-q">${ex.q}</p>
        <div class="exercise-input-row">
          <input class="exercise-input" id="ripasso-input" type="text" inputmode="decimal" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="La tua risposta" value="${checked ? state.ripassoUserAnswer : ''}" ${checked ? 'disabled' : ''}>
        </div>
        ${feedbackBlock}
        ${actionsBlock}
      </div>
    </div>`;
}

/* ===== Rendering: Curiosità ===== */
function renderCuriositaList() {
  const items = sortedCuriosita();
  const cards = items.length ? items.map(c => {
    const done = curiositaProgress.quizDone[c.id];
    const badge = done ? `<span class="curiosita-card__done" aria-hidden="true">${done.correct ? '✅' : '↻'}</span>` : '';
    return `
      <button class="curiosita-card" data-action="open-curiosita-detail" data-id="${c.id}" type="button">
        <span class="curiosita-card__icon">${c.icon}</span>
        <span class="curiosita-card__body">
          <span class="curiosita-card__category">${CURIOSITA_CATEGORY_LABELS[c.category] || c.category}</span>
          <span class="curiosita-card__title">${c.title}</span>
        </span>
        ${badge}
      </button>`;
  }).join('') : `<p style="color:var(--muted); font-size:14px; padding:0 4px;">Nessuna curiosità ancora: torna a trovarci presto!</p>`;
  return `
    <header class="topbar">
      <button class="back" data-action="go-home" type="button" aria-label="Torna alla mappa">←</button>
      <p class="eyebrow">Curiosità</p>
      <h1 class="module-title">Scopri qualcosa di nuovo</h1>
    </header>
    <div class="curiosita-list">${cards}</div>
  `;
}
function renderCuriositaDetail() {
  const item = CURIOSITA.find(c => c.id === state.curiositaId);
  if (!item) return renderCuriositaList();
  const checked = state.curiositaQuizChecked;
  const optionsHtml = item.quiz.options.map((opt, i) => {
    let cls = 'quiz-option';
    if (checked) {
      if (i === item.quiz.correct) cls += ' is-correct';
      else if (i === state.curiositaQuizSelected) cls += ' is-wrong';
    }
    return `<button class="${cls}" type="button" data-action="curiosita-quiz-select" data-index="${i}" ${checked ? 'disabled' : ''}>${opt}</button>`;
  }).join('');
  const feedback = checked
    ? `<p class="exercise-feedback ${state.curiositaQuizSelected === item.quiz.correct ? 'is-ok' : 'is-bad'}">${state.curiositaQuizSelected === item.quiz.correct ? '✅ Esatto!' : '❌ Non proprio.'} ${item.quiz.explanation}</p>`
    : '';
  return `
    <header class="topbar">
      <button class="back" data-action="open-curiosita-list" type="button" aria-label="Indietro">←</button>
      <p class="eyebrow">${CURIOSITA_CATEGORY_LABELS[item.category] || item.category}</p>
      <h1 class="module-title">${item.title}</h1>
    </header>
    <div class="curiosita-detail">
      <article class="postcard">
        <p class="postcard__label">${item.icon} Curiosità</p>
        <p class="postcard__body">${item.summary}</p>
      </article>
      <p class="curiosita-source">Fonte: <a href="${item.source.url}" target="_blank" rel="noopener noreferrer">${item.source.name}</a></p>
      <div class="exercise-card">
        <p class="exercise-q">${item.quiz.q}</p>
        <div class="quiz-options">${optionsHtml}</div>
        ${feedback}
      </div>
    </div>
  `;
}

/* ===== Rendering: Diario di viaggio (statistiche) ===== */
function renderDiario() {
  const stats = computeStats();
  if (stats.totalAttempts === 0) {
    return `
      <header class="topbar">
        <button class="back" data-action="go-home" type="button" aria-label="Torna alla mappa">←</button>
        <p class="eyebrow">Diario di viaggio</p>
        <h1 class="module-title">Il diario di ${STUDENT_NAME}</h1>
      </header>
      <div class="diary-wrap">
        <div class="diary-empty">
          <p style="font-size:34px; margin-bottom:10px;">🧳</p>
          <p style="font-weight:800; font-size:16px; margin-bottom:6px;">Il diario è ancora vuoto</p>
          <p style="color:var(--muted); font-size:14px; line-height:1.5;">Inizia qualche esercizio in una tappa: qui vedrai i tuoi progressi e gli argomenti da ripassare.</p>
        </div>
      </div>
    `;
  }
  const overallPct = Math.round((stats.totalCorrect / stats.totalAttempts) * 100);
  const rows = stats.perModule.map(s => `
    <div class="diary-row">
      <span class="diary-row__icon">${s.icon}</span>
      <div class="diary-row__body">
        <div class="diary-row__top">
          <span class="diary-row__title">${s.title}</span>
          <span class="diary-row__pct">${s.pct === null ? '—' : s.pct + '%'}</span>
        </div>
        <div class="diary-bar"><div class="diary-bar__fill diary-bar__fill--${s.accent}" style="width:${s.pct || 0}%"></div></div>
        <span class="diary-row__meta">${s.attempts ? `${s.correct}/${s.attempts} risposte corrette` : 'Non ancora iniziata'}</span>
      </div>
    </div>
  `).join('');
  const mistakesHtml = stats.topMistakes.length
    ? stats.topMistakes.map(t => `
      <div class="diary-mistake">
        <p class="diary-mistake__module">${t.moduleTitle}${t.logic ? ' · 🧠 logica' : ''}</p>
        <p class="diary-mistake__q">${t.question}</p>
      </div>`).join('')
    : `<p style="color:var(--muted); font-size:13.5px;">Nessun errore ripetuto finora, complimenti! 🌟</p>`;
  return `
    <header class="topbar">
      <button class="back" data-action="go-home" type="button" aria-label="Torna alla mappa">←</button>
      <p class="eyebrow">Diario di viaggio</p>
      <h1 class="module-title">Il diario di ${STUDENT_NAME}</h1>
    </header>
    <div class="diary-wrap">
      <div class="diary-summary">
        <span class="diary-summary__big">${overallPct}%</span>
        <span class="diary-summary__label">risposte corrette su ${stats.totalAttempts} esercizi svolti in totale</span>
      </div>
      <h2 class="diary-section-title">Le tue tappe</h2>
      ${rows}
      <h2 class="diary-section-title">Argomenti da ripassare</h2>
      <div class="diary-mistakes">${mistakesHtml}</div>
      ${renderRipassoCta()}
    </div>
  `;
}
// Invito al ripasso mirato: esercizi adattivi generati sulle skill più
// deboli (calcolate da computeMastery). Visibile solo se c'è abbastanza
// storico su equazioni per generare qualcosa di sensato.
function renderRipassoCta() {
  const mastery = computeMastery();
  const weak = weakSkills(mastery, RIPASSO_THRESHOLD, RIPASSO_SIZE);
  const hasEnoughHistory = Object.values(mastery).some(m => m.pct !== null);
  if (!hasEnoughHistory) return '';
  const desc = weak.length
    ? `Ho notato ${weak.length} ${weak.length === 1 ? 'argomento' : 'argomenti'} su cui vale la pena fare un po' di pratica in più. Genero al volo ${RIPASSO_SIZE} esercizi simili, diversi ogni volta.`
    : `Le equazioni sembrano andare bene! Puoi comunque fare qualche esercizio di ripasso in più, generato al volo.`;
  return `
    <h2 class="diary-section-title">Ripasso mirato</h2>
    <div class="diary-mistake" style="background:rgba(31,122,115,0.08); border-color:rgba(31,122,115,0.18);">
      <p class="diary-mistake__q" style="margin-bottom:12px;">${desc}</p>
      <button class="btn btn--primary" data-action="start-ripasso" type="button">Inizia il ripasso →</button>
    </div>
  `;
}

/* ===== Render principale ===== */
function render() {
  const app = document.getElementById('app');
  switch (state.view) {
    case 'home': app.innerHTML = renderHome(); break;
    case 'module-menu': app.innerHTML = renderModuleMenu(); break;
    case 'theory': app.innerHTML = renderTheory(); break;
    case 'exercises': app.innerHTML = renderExercises(); break;
    case 'quiz': app.innerHTML = renderQuiz(); break;
    case 'result': app.innerHTML = renderResult(); break;
    case 'diario': app.innerHTML = renderDiario(); break;
    case 'ripasso': app.innerHTML = renderRipasso(); break;
    case 'curiosita-list': app.innerHTML = renderCuriositaList(); break;
    case 'curiosita-detail': app.innerHTML = renderCuriositaDetail(); break;
  }
  afterRender();
}
function afterRender() {
  window.scrollTo(0, 0);
  if (state.view === 'theory') bindTheorySwipe();
}

/* ===== Swipe cartoline teoria ===== */
function bindTheorySwipe() {
  const deck = document.getElementById('deck');
  const track = document.getElementById('deck-track');
  if (!deck || !track) return;
  const m = getModule(state.moduleId);
  let startX = 0, currentX = 0, dragging = false, width = deck.clientWidth;

  function onDown(e) {
    dragging = true;
    startX = currentX = (e.touches ? e.touches[0].clientX : e.clientX);
    width = deck.clientWidth;
    track.style.transition = 'none';
  }
  function onMove(e) {
    if (!dragging) return;
    currentX = (e.touches ? e.touches[0].clientX : e.clientX);
    let delta = currentX - startX;
    if ((state.theoryIndex === 0 && delta > 0) || (state.theoryIndex === m.theory.length - 1 && delta < 0)) delta *= 0.35;
    track.style.transform = `translateX(calc(${-state.theoryIndex * 100}% + ${delta}px))`;
  }
  function onUp() {
    if (!dragging) return;
    dragging = false;
    track.style.transition = '';
    const delta = currentX - startX;
    const threshold = width * 0.18;
    if (delta < -threshold && state.theoryIndex < m.theory.length - 1) state.theoryIndex++;
    else if (delta > threshold && state.theoryIndex > 0) state.theoryIndex--;
    render();
  }
  deck.addEventListener('pointerdown', onDown);
  deck.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp, { once: true });
  window.addEventListener('pointercancel', onUp, { once: true });
}

/* ===== Azioni (delegazione eventi) ===== */
const appEl = document.getElementById('app');
appEl.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;
  switch (action) {
    case 'go-home': goHome(); break;
    case 'open-module': openModule(btn.dataset.id); break;
    case 'go-module': backToModuleMenu(); break;
    case 'open-theory': openTheory(); break;
    case 'open-exercises': openExercises(); break;
    case 'open-exercises-level': openExercises(btn.dataset.level); break;
    case 'open-quiz': openQuiz(); break;
    case 'prev-slide': moveSlide(-1); break;
    case 'next-slide': moveSlide(1); break;
    case 'reveal-step': revealStep(Number(btn.dataset.slideIndex)); break;
    case 'microcheck-select': microcheckSelect(Number(btn.dataset.slideIndex), Number(btn.dataset.index)); break;
    case 'theory-done': markTheorySeen(); openExercises('facile'); break;
    case 'show-hint': bumpHelpLevel(); break;
    case 'request-twin': requestTwin(); break;
    case 'check-answer': checkCurrentAnswer(); break;
    case 'exercise-choice': selectExerciseChoice(Number(btn.dataset.index)); break;
    case 'exercise-next': exerciseNext(); break;
    case 'level-continue': levelContinue(); break;
    case 'remediation-continue': remediationContinue(); break;
    case 'balance-op': applyInteraction('balance', 'chooseOp', btn.dataset.opId); break;
    case 'balance-target': applyInteraction('balance', 'chooseTarget', btn.dataset.target); break;
    case 'order-move': applyInteraction('order', 'move', btn.dataset.id, btn.dataset.dir); break;
    case 'order-check': applyInteraction('order', 'check'); break;
    case 'error-select': applyInteraction('errorDetect', 'select', Number(btn.dataset.index)); break;
    case 'error-check': applyInteraction('errorDetect', 'check'); break;
    case 'group-tap-term': applyInteraction('group', 'tapTerm', btn.dataset.id); break;
    case 'group-tap-bucket': applyInteraction('group', 'tapBucket', btn.dataset.bucket); break;
    case 'group-check': applyInteraction('group', 'check'); break;
    case 'build-tap-pool': applyInteraction('build', 'place', btn.dataset.id); break;
    case 'build-tap-placed': applyInteraction('build', 'remove', btn.dataset.id); break;
    case 'build-check': applyInteraction('build', 'check'); break;
    case 'quiz-option': selectQuizOption(Number(btn.dataset.index)); break;
    case 'quiz-next': quizNext(); break;
    case 'open-diario': state.view = 'diario'; render(); break;
    case 'start-ripasso': startRipassoMirato(); break;
    case 'ripasso-check': checkRipassoAnswer(); break;
    case 'ripasso-next': ripassoNext(); break;
    case 'open-curiosita-list': openCuriositaList(); break;
    case 'open-curiosita-detail': openCuriositaDetail(btn.dataset.id); break;
    case 'curiosita-quiz-select': selectCuriositaQuiz(Number(btn.dataset.index)); break;
  }
});
appEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.id === 'ex-input') {
    e.preventDefault();
    if (state.exState === 'question') checkCurrentAnswer();
    else if (state.exState === 'checked') exerciseNext();
    return;
  }
  if (e.key === 'Enter' && e.target.id === 'ripasso-input') {
    e.preventDefault();
    if (!state.ripassoChecked) checkRipassoAnswer();
    else ripassoNext();
    return;
  }
  // Attivazione da tastiera per elementi interattivi non nativi (es. i bucket
  // di group-like-terms): i <button> gestiscono già Invio/Spazio da soli, i
  // div con role="button" no. Non duplica il click sui bottoni nativi perché
  // questi ultimi non hanno role="button" impostato esplicitamente.
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[role="button"][data-action]')) {
    e.preventDefault();
    e.target.click();
  }
});

/* ===== Service worker (offline) ===== */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

/* ===== Avvio ===== */
render();
