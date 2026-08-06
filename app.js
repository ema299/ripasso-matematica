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
const state = {
  view: 'home',
  moduleId: null,
  theoryIndex: 0,
  theoryRevealed: {},
  exLevel: 'facile',
  exIndex: 0,
  exState: 'question', // question | checked | levelComplete
  exHintVisible: false,
  exLastCorrect: false,
  exUserAnswer: '',
  exSelectedIndex: null,
  quizIndex: 0,
  quizScore: 0,
  quizAnswered: false,
  quizSelected: null
};

/* ===== Navigazione ===== */
function goHome() { state.view = 'home'; state.moduleId = null; render(); }
function openModule(id) { state.moduleId = id; state.view = 'module-menu'; render(); }
function backToModuleMenu() { state.view = 'module-menu'; render(); }

function openTheory() { state.view = 'theory'; state.theoryIndex = 0; state.theoryRevealed = {}; render(); }
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

function openExercises(levelOverride) {
  const p = ensureModuleProgress(state.moduleId);
  state.exLevel = levelOverride || LEVELS.find(l => !p.exercises[l]) || 'facile';
  state.exIndex = 0;
  state.exState = 'question';
  state.exHintVisible = false;
  state.exSelectedIndex = null;
  state.view = 'exercises';
  render();
}
function showHint() { state.exHintVisible = true; render(); }
function checkCurrentAnswer() {
  const input = document.getElementById('ex-input');
  if (!input || !input.value.trim()) { if (input) input.focus(); return; }
  const m = getModule(state.moduleId);
  const ex = m.exercises[state.exLevel][state.exIndex];
  state.exLastCorrect = checkAnswer(ex, input.value);
  state.exUserAnswer = input.value;
  state.exState = 'checked';
  logAttempt({ moduleId: m.id, kind: 'exercise', level: state.exLevel, question: ex.q, correct: state.exLastCorrect, logic: !!ex.logic });
  render();
}
function selectExerciseChoice(idx) {
  if (state.exState === 'checked') return;
  const m = getModule(state.moduleId);
  const ex = m.exercises[state.exLevel][state.exIndex];
  state.exSelectedIndex = idx;
  state.exLastCorrect = idx === ex.correct;
  state.exState = 'checked';
  logAttempt({ moduleId: m.id, kind: 'exercise', level: state.exLevel, question: ex.q, correct: state.exLastCorrect, logic: !!ex.logic });
  render();
}
function exerciseNext() {
  const m = getModule(state.moduleId);
  const list = m.exercises[state.exLevel];
  state.exIndex++;
  state.exState = 'question';
  state.exHintVisible = false;
  state.exSelectedIndex = null;
  if (state.exIndex >= list.length) {
    const p = ensureModuleProgress(state.moduleId);
    p.exercises[state.exLevel] = true;
    saveProgress();
    state.exState = 'levelComplete';
  }
  render();
}
function levelContinue() {
  if (state.exLevel === 'difficile') { openQuiz(); return; }
  state.exLevel = LEVELS[LEVELS.indexOf(state.exLevel) + 1];
  state.exIndex = 0;
  state.exState = 'question';
  state.exHintVisible = false;
  state.exSelectedIndex = null;
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
    <div class="route">${stops}</div>
  `;
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
function renderTheory() {
  const m = getModule(state.moduleId);
  const slides = m.theory.map((s, i) => s.type === 'steps' ? renderStepsPostcard(s, i) : `
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
function levelTrackHtml(p) {
  return LEVELS.map(l => `<div class="level-pill ${l === state.exLevel ? 'is-current' : ''} ${p.exercises[l] ? 'is-complete' : ''}">${LEVEL_LABELS[l]}</div>`).join('');
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
function renderExerciseQuestion(m) {
  const list = m.exercises[state.exLevel];
  const ex = list[state.exIndex];
  const total = list.length;
  const checked = state.exState === 'checked';
  const hintBlock = state.exHintVisible ? `<p class="exercise-hint">💡 ${ex.hint}</p>` : '';
  const logicTag = ex.logic ? `<span class="exercise-tag">🧠 Logica</span>` : '';

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
      : `<div class="exercise-actions exercise-actions--end"><button class="btn btn--ghost" data-action="show-hint" type="button">💡 Aiuto</button></div>`;
    return `
      <p class="exercise-counter">${LEVEL_LABELS[state.exLevel]} · Domanda ${state.exIndex + 1} di ${total} ${logicTag}</p>
      <div class="exercise-card">
        <p class="exercise-q">${ex.q}</p>
        <div class="quiz-options">${optionsHtml}</div>
        ${hintBlock}
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
    } else {
      const shown = ex.type === 'expr' ? ex.answer[0] : ex.answer;
      feedbackBlock = `<p class="exercise-feedback is-bad">❌ Non proprio. Risposta corretta: ${shown}${ex.unit ? ' ' + ex.unit : ''}</p>`;
    }
    actionsBlock = `<div class="exercise-actions exercise-actions--end"><button class="btn btn--primary" data-action="exercise-next" type="button">Avanti →</button></div>`;
  } else {
    actionsBlock = `
      <div class="exercise-actions">
        <button class="btn btn--ghost" data-action="show-hint" type="button">💡 Aiuto</button>
        <button class="btn btn--primary" data-action="check-answer" type="button">Controlla</button>
      </div>`;
  }
  const inputValue = checked ? state.exUserAnswer : '';
  return `
    <p class="exercise-counter">${LEVEL_LABELS[state.exLevel]} · Domanda ${state.exIndex + 1} di ${total} ${logicTag}</p>
    <div class="exercise-card">
      <p class="exercise-q">${ex.q}</p>
      <div class="exercise-input-row">
        <input class="exercise-input" id="ex-input" type="text" inputmode="decimal" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="La tua risposta" value="${inputValue}" ${checked ? 'disabled' : ''}>
        ${unit}
      </div>
      ${hintBlock}
      ${feedbackBlock}
      ${actionsBlock}
    </div>
  `;
}
function renderExercises() {
  const m = getModule(state.moduleId);
  const p = ensureModuleProgress(m.id);
  const body = state.exState === 'levelComplete' ? renderLevelComplete() : renderExerciseQuestion(m);
  return `
    <header class="topbar">
      <button class="back" data-action="go-module" type="button" aria-label="Indietro">←</button>
      <p class="eyebrow">Esercizi</p>
      <h1 class="module-title">${m.title}</h1>
    </header>
    <div class="level-track">${levelTrackHtml(p)}</div>
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
    case 'open-quiz': openQuiz(); break;
    case 'prev-slide': moveSlide(-1); break;
    case 'next-slide': moveSlide(1); break;
    case 'reveal-step': revealStep(Number(btn.dataset.slideIndex)); break;
    case 'theory-done': markTheorySeen(); openExercises('facile'); break;
    case 'show-hint': showHint(); break;
    case 'check-answer': checkCurrentAnswer(); break;
    case 'exercise-choice': selectExerciseChoice(Number(btn.dataset.index)); break;
    case 'exercise-next': exerciseNext(); break;
    case 'level-continue': levelContinue(); break;
    case 'quiz-option': selectQuizOption(Number(btn.dataset.index)); break;
    case 'quiz-next': quizNext(); break;
    case 'open-diario': state.view = 'diario'; render(); break;
  }
});
appEl.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' || e.target.id !== 'ex-input') return;
  e.preventDefault();
  if (state.exState === 'question') checkCurrentAnswer();
  else if (state.exState === 'checked') exerciseNext();
});

/* ===== Service worker (offline) ===== */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

/* ===== Avvio ===== */
render();
