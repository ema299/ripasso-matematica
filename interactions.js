'use strict';
/* ===== Interactions Engine (V2) =====
   Componenti didattici riutilizzabili oltre alla teoria a cartoline e agli
   esercizi a risposta numerica/scelta multipla (PIANO_SVILUPPO_V2.md §5-6).

   Ogni componente espone: init (stato iniziale), una o più azioni (che
   ricevono l'esercizio + lo stato corrente e restituiscono il nuovo stato),
   e render (che restituisce l'HTML del corpo esercizio, da inserire dentro
   .exercise-card al posto dell'input classico).

   Contratto delle azioni: { ist, completed?, correct? }
   - ist: nuovo stato dell'interazione da salvare in state.interaction
   - completed: true quando l'esercizio è da considerarsi risolto/verificato
     (chi chiama passa poi a state.exState = 'checked', esattamente come per
     gli esercizi a input classico)
   - correct: esito da loggare quando completed è true

   Questo file non legge né scrive variabili globali di app.js: riceve tutto
   nei parametri, così resta testabile in isolamento (node --check +
   self-consistency) e riutilizzabile da qualunque altro modulo che popoli
   gli stessi campi opzionali (balanceData/groupData/orderData/...).
   Caricato PRIMA di help-engine.js e app.js (vedi index.html).
*/

/* ---------- Modello simbolico di un'equazione lineare ax+b = cx+d ---------- */
const EquationModel = {
  isSolved(m) { return m.c === 0 && m.b === 0 && m.a === 1; },

  correctMove(m) {
    if (m.c !== 0) return { kind: 'x', k: m.c };
    if (m.b !== 0) return { kind: 'n', k: m.b };
    if (m.a !== 1) return { kind: 'div', k: m.a };
    return null;
  },

  applyMove(m, move) {
    if (move.kind === 'x') return { a: m.a - move.k, b: m.b, c: m.c - move.k, d: m.d };
    if (move.kind === 'n') return { a: m.a, b: m.b - move.k, c: m.c, d: m.d - move.k };
    if (move.kind === 'div') return { a: m.a / move.k, b: m.b / move.k, c: m.c / move.k, d: m.d / move.k };
    return m;
  },

  moveLabel(move) {
    if (move.kind === 'x') return (move.k > 0 ? '−' : '+') + Math.abs(move.k) + 'x';
    if (move.kind === 'n') return (move.k > 0 ? '−' : '+') + Math.abs(move.k);
    if (move.kind === 'div') return '÷' + move.k;
    return '';
  },

  formatSide(coefX, konst) {
    let s;
    if (coefX === 0) s = String(konst);
    else {
      s = coefX === 1 ? 'x' : coefX === -1 ? '−x' : `${coefX}x`;
      if (konst !== 0) s += konst > 0 ? ` + ${konst}` : ` − ${Math.abs(konst)}`;
    }
    return s;
  },

  formatEquation(m) { return `${EquationModel.formatSide(m.a, m.b)} = ${EquationModel.formatSide(m.c, m.d)}`; },

  // Sequenza generica di passaggi testuali "bilancia", usata sia dal
  // livello 4/5 dell'aiuto sia dal generatore di esercizi gemelli.
  solutionSteps(m) {
    const steps = [];
    let cur = { ...m };
    let guard = 0;
    while (!EquationModel.isSolved(cur) && guard < 6) {
      const move = EquationModel.correctMove(cur);
      if (!move) break;
      const next = EquationModel.applyMove(cur, move);
      const verb = move.kind === 'div' ? `Divido entrambi i membri per ${move.k}` : `Applico ${EquationModel.moveLabel(move)} a entrambi i membri`;
      steps.push(`${verb}: ${EquationModel.formatEquation(next)}`);
      cur = next;
      guard++;
    }
    steps.push(`x = ${cur.d}`);
    return steps;
  }
};

/* ---------- Bilancia (format: 'balance') =====
   Interazione a due fasi, per evitare che un'opzione riveli da sola di
   essere la trappola (fix Review Fase 1, finding F1):
   fase 'op'     -> la studentessa sceglie QUALE operazione applicare
                    (l'opzione corretta e quella con segno invertito hanno
                    etichette ugualmente plausibili: "−4x" vs "+4x", nessun
                    suffisso che la denunci);
   fase 'target' -> sceglie SU QUALI piatti applicarla ("solo sinistro",
                    "solo destro", "entrambi"). Solo "entrambi" fa avanzare
                    il modello; le altre due mostrano lo sbilanciamento,
                    spiegano perché, e riportano al modello precedente senza
                    penalità (nessun logAttempt su un tentativo con trappola).
*/
function balanceOpOptions(m) {
  const correct = EquationModel.correctMove(m);
  if (!correct) return [];
  const flipped = { kind: correct.kind, k: -correct.k };
  return shuffle([
    { ...correct, id: 'correct', label: EquationModel.moveLabel(correct) },
    { ...flipped, id: 'wrongSign', label: EquationModel.moveLabel(flipped) }
  ]);
}
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

const balance = {
  init(ex) {
    const model = { ...ex.model };
    return { model, phase: 'op', opOptions: balanceOpOptions(model), chosenOp: null, msg: null, tilt: false, solved: false, trapStreak: 0 };
  },
  chooseOp(ex, ist, opId) {
    if (ist.phase !== 'op') return { ist };
    const chosen = ist.opOptions.find(o => o.id === opId);
    if (!chosen) return { ist };
    return { ist: { ...ist, phase: 'target', chosenOp: chosen, msg: null, tilt: false } };
  },
  chooseTarget(ex, ist, target) {
    if (ist.phase !== 'target') return { ist };
    if (target !== 'both') {
      const trapStreak = ist.trapStreak + 1;
      const msg = trapStreak >= 2
        ? 'La bilancia si sbilancia: qualunque operazione scegli, deve valere per ENTRAMBI i piatti, altrimenti l\'uguaglianza si rompe.'
        : 'Occhio: hai applicato l\'operazione solo a un piatto. La bilancia non è più in equilibrio! Il modello torna come prima: scegli di nuovo.';
      return { ist: { ...ist, msg, tilt: true, trapStreak, phase: 'op', opOptions: balanceOpOptions(ist.model), chosenOp: null } };
    }
    if (ist.chosenOp.id === 'wrongSign') {
      return { ist: { ...ist, msg: 'Questa operazione mantiene l\'equilibrio (è lecita: l\'hai applicata a entrambi i piatti), ma non ti avvicina a isolare la x. Riprova con l\'operazione inversa giusta.', tilt: false, trapStreak: 0, phase: 'op', opOptions: balanceOpOptions(ist.model), chosenOp: null } };
    }
    const nextModel = EquationModel.applyMove(ist.model, ist.chosenOp);
    const solved = EquationModel.isSolved(nextModel);
    return {
      ist: {
        model: nextModel,
        phase: 'op',
        opOptions: solved ? [] : balanceOpOptions(nextModel),
        chosenOp: null,
        msg: null,
        tilt: false,
        solved,
        trapStreak: 0
      },
      completed: solved,
      correct: true
    };
  },
  render(ex, ist) {
    const m = ist.model;
    const leftChips = sideChips(m.a, m.b);
    const rightChips = sideChips(m.c, m.d);
    const beam = `
      <div class="balance ${ist.solved ? 'is-solved' : ''} ${ist.tilt ? 'is-tilted' : ''}">
        <div class="balance__beam">
          <div class="balance__pan balance__pan--left">${leftChips}</div>
          <div class="balance__pan balance__pan--right">${rightChips}</div>
        </div>
        <div class="balance__post" aria-hidden="true"></div>
      </div>
      <p class="balance__eqline">${EquationModel.formatEquation(m)}</p>`;
    if (ist.solved) {
      return beam + `<p class="exercise-feedback is-ok">✅ Hai isolato la x applicando sempre la stessa operazione a entrambi i piatti: x = ${m.d}</p>`;
    }
    const msg = ist.msg ? `<p class="exercise-hint">💡 ${ist.msg}</p>` : '';
    if (ist.phase === 'target') {
      const targets = `
        <div class="balance-moves">
          <button class="balance-move" type="button" data-action="balance-target" data-target="left">Solo piatto sinistro</button>
          <button class="balance-move" type="button" data-action="balance-target" data-target="right">Solo piatto destro</button>
          <button class="balance-move" type="button" data-action="balance-target" data-target="both">Entrambi i piatti</button>
        </div>`;
      const prompt = `<p class="balance__prompt">Applichi "${ist.chosenOp.label}"... a quale/i piatto/i?</p>`;
      return beam + prompt + targets + msg;
    }
    const options = ist.opOptions.map(o => `<button class="balance-move" type="button" data-action="balance-op" data-op-id="${o.id}">${o.label}</button>`).join('');
    const prompt = msg ? '' : `<p class="balance__prompt">Quale operazione applichi per avvicinarti a "x = …"?</p>`;
    return beam + `<div class="balance-moves">${options}</div>${prompt}${msg}`;
  }
};
function sideChips(coefX, konst) {
  let chips = '';
  if (coefX !== 0) chips += `<span class="chip chip--x">${coefX === 1 ? 'x' : coefX === -1 ? '−x' : coefX + 'x'}</span>`;
  if (konst !== 0 || coefX === 0) chips += `<span class="chip chip--n">${konst}</span>`;
  return chips;
}

/* ---------- Caccia all'errore (format: 'error-detect') ---------- */
const errorDetect = {
  init() { return { selected: null, checked: false }; },
  select(ex, ist, index) {
    if (ist.checked) return { ist };
    return { ist: { ...ist, selected: index } };
  },
  check(ex, ist) {
    if (ist.selected === null) return { ist };
    const correct = ist.selected === ex.errorData.errorIndex;
    return { ist: { ...ist, checked: true, correct }, completed: true, correct };
  },
  render(ex, ist) {
    const steps = ex.errorData.steps.map((s, i) => {
      let cls = 'error-step';
      if (ist.selected === i) cls += ' is-selected';
      if (ist.checked) {
        if (i === ex.errorData.errorIndex) cls += ' is-correct';
        else if (i === ist.selected) cls += ' is-wrong';
      }
      return `<button class="${cls}" type="button" data-action="error-select" data-index="${i}" ${ist.checked ? 'disabled' : ''}>
        <span class="error-step__num">${i + 1}</span><span class="error-step__text">${s.text}</span>
      </button>`;
    }).join('');
    const checkBtn = !ist.checked
      ? `<div class="exercise-actions exercise-actions--end"><button class="btn btn--primary" type="button" data-action="error-check" ${ist.selected === null ? 'disabled' : ''}>Controlla</button></div>`
      : `<p class="exercise-feedback ${ist.selected === ex.errorData.errorIndex ? 'is-ok' : 'is-bad'}">${ist.selected === ex.errorData.errorIndex ? '✅ Esatto, hai trovato l\'errore!' : '❌ Non era questo il primo errore.'} ${ex.errorData.explanation}</p>`;
    return `<p class="error-detect__prompt">Tocca il passaggio in cui compare il primo errore:</p><div class="error-steps">${steps}</div>${checkBtn}`;
  }
};

/* ---------- Riordina i passaggi (format: 'order') ---------- */
const order = {
  init(ex) {
    const ids = ex.orderData.steps.map(s => s.id);
    return { order: shuffleUntilDifferent(ids), checked: false, correct: null };
  },
  move(ex, ist, id, dir) {
    if (ist.checked) return { ist };
    const arr = ist.order.slice();
    const i = arr.indexOf(id);
    const j = dir === 'up' ? i - 1 : i + 1;
    if (j < 0 || j >= arr.length) return { ist };
    const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    return { ist: { ...ist, order: arr } };
  },
  check(ex, ist) {
    const correct = ist.order.every((id, i) => id === ex.orderData.correctOrder[i]);
    return { ist: { ...ist, checked: true, correct }, completed: true, correct };
  },
  render(ex, ist) {
    const byId = new Map(ex.orderData.steps.map(s => [s.id, s.text]));
    const rows = ist.order.map((id, i) => `
      <div class="order-row ${ist.checked ? (id === ex.orderData.correctOrder[i] ? 'is-correct' : 'is-wrong') : ''}">
        <span class="order-row__num">${i + 1}</span>
        <span class="order-row__text">${byId.get(id)}</span>
        <span class="order-row__arrows">
          <button type="button" data-action="order-move" data-id="${id}" data-dir="up" ${ist.checked || i === 0 ? 'disabled' : ''} aria-label="Sposta su">▲</button>
          <button type="button" data-action="order-move" data-id="${id}" data-dir="down" ${ist.checked || i === ist.order.length - 1 ? 'disabled' : ''} aria-label="Sposta giù">▼</button>
        </span>
      </div>`).join('');
    const action = !ist.checked
      ? `<div class="exercise-actions exercise-actions--end"><button class="btn btn--primary" type="button" data-action="order-check">Controlla l'ordine</button></div>`
      : `<p class="exercise-feedback ${ist.correct ? 'is-ok' : 'is-bad'}">${ist.correct ? '✅ Ordine corretto!' : '❌ L\'ordine non è ancora giusto: guarda quali righe sono evidenziate in rosso.'}</p>`;
    return `<p class="order-detect__prompt">Metti i passaggi nell'ordine giusto per risolvere l'equazione:</p><div class="order-list">${rows}</div>${action}`;
  }
};
function shuffleUntilDifferent(ids) {
  if (ids.length < 2) return ids.slice();
  let shuffled = shuffle(ids);
  let guard = 0;
  while (shuffled.every((id, i) => id === ids[i]) && guard < 8) { shuffled = shuffle(ids); guard++; }
  return shuffled;
}

/* ---------- Raggruppa i termini simili (format: 'group') ---------- */
const group = {
  init(ex) {
    return { assignment: {}, selected: null, checked: false, correct: null };
  },
  tapTerm(ex, ist, id) {
    if (ist.checked) return { ist };
    if (ist.assignment[id]) {
      const assignment = { ...ist.assignment };
      delete assignment[id];
      return { ist: { ...ist, assignment, selected: id } };
    }
    return { ist: { ...ist, selected: id } };
  },
  tapBucket(ex, ist, bucketKey) {
    if (ist.checked || !ist.selected) return { ist };
    const assignment = { ...ist.assignment, [ist.selected]: bucketKey };
    return { ist: { ...ist, assignment, selected: null } };
  },
  check(ex, ist) {
    const allPlaced = ex.groupData.terms.every(t => ist.assignment[t.id]);
    if (!allPlaced) return { ist };
    const correct = ex.groupData.terms.every(t => ist.assignment[t.id] === t.group);
    return { ist: { ...ist, checked: true, correct }, completed: true, correct };
  },
  render(ex, ist) {
    const buckets = ex.groupData.buckets;
    const poolTerms = ex.groupData.terms.filter(t => !ist.assignment[t.id]);
    const pool = poolTerms.map(t => `<button class="chip chip--pick ${ist.selected === t.id ? 'is-selected' : ''}" type="button" data-action="group-tap-term" data-id="${t.id}">${t.label}</button>`).join('') || '<span class="group-pool__empty">Tutti i termini sono stati assegnati.</span>';
    const bucketsHtml = buckets.map(b => {
      const items = ex.groupData.terms.filter(t => ist.assignment[t.id] === b.key);
      const chips = items.map(t => {
        let cls = 'chip chip--placed';
        if (ist.checked) cls += t.group === b.key ? ' is-correct' : ' is-wrong';
        return `<button class="${cls}" type="button" data-action="group-tap-term" data-id="${t.id}" ${ist.checked ? 'disabled' : ''}>${t.label}</button>`;
      }).join('');
      return `<div class="group-bucket" data-action="group-tap-bucket" data-bucket="${b.key}" role="button" tabindex="0" aria-label="Assegna a: ${b.label}"><p class="group-bucket__label">${b.label}</p><div class="group-bucket__items">${chips}</div></div>`;
    }).join('');
    const allPlaced = ex.groupData.terms.every(t => ist.assignment[t.id]);
    const action = !ist.checked
      ? `<div class="exercise-actions exercise-actions--end"><button class="btn btn--primary" type="button" data-action="group-check" ${allPlaced ? '' : 'disabled'}>Controlla</button></div>`
      : `<p class="exercise-feedback ${ist.correct ? 'is-ok' : 'is-bad'}">${ist.correct ? '✅ Raggruppamento corretto!' : '❌ Qualche termine è nel gruppo sbagliato: guarda i chip in rosso.'}</p>`;
    return `<p class="group-terms__prompt">Tocca un termine, poi tocca il gruppo a cui appartiene:</p><div class="group-pool">${pool}</div><div class="group-buckets">${bucketsHtml}</div>${action}`;
  }
};

/* ---------- Costruisci l'equazione da una frase (format: 'build') ---------- */
const build = {
  init(ex) {
    return { pool: shuffleUntilDifferent(ex.buildData.blocks.map(b => b.id)), placed: [], checked: false, correct: null };
  },
  place(ex, ist, id) {
    if (ist.checked) return { ist };
    return { ist: { ...ist, pool: ist.pool.filter(x => x !== id), placed: [...ist.placed, id] } };
  },
  remove(ex, ist, id) {
    if (ist.checked) return { ist };
    return { ist: { ...ist, placed: ist.placed.filter(x => x !== id), pool: [...ist.pool, id] } };
  },
  check(ex, ist) {
    if (ist.placed.length !== ex.buildData.correctSequence.length) return { ist };
    const correct = ist.placed.every((id, i) => id === ex.buildData.correctSequence[i]);
    return { ist: { ...ist, checked: true, correct }, completed: true, correct };
  },
  render(ex, ist) {
    const byId = new Map(ex.buildData.blocks.map(b => [b.id, b.label]));
    const slots = ist.placed.map(id => `<button class="chip chip--placed" type="button" data-action="build-tap-placed" data-id="${id}" ${ist.checked ? 'disabled' : ''}>${byId.get(id)}</button>`).join('')
      || '<span class="build-slots__empty">Tocca i blocchi qui sotto per comporre l\'equazione.</span>';
    const pool = ist.pool.map(id => `<button class="chip chip--pick" type="button" data-action="build-tap-pool" data-id="${id}">${byId.get(id)}</button>`).join('');
    const ready = ist.placed.length === ex.buildData.correctSequence.length;
    const action = !ist.checked
      ? `<div class="exercise-actions exercise-actions--end"><button class="btn btn--primary" type="button" data-action="build-check" ${ready ? '' : 'disabled'}>Controlla</button></div>`
      : `<p class="exercise-feedback ${ist.correct ? 'is-ok' : 'is-bad'}">${ist.correct ? '✅ Equazione composta correttamente!' : '❌ Non è ancora l\'equazione giusta. Rileggi la frase con calma.'}</p>`;
    return `<p class="build-expr__sentence">${ex.buildData.sentence}</p>
      <div class="build-slots">${slots}</div>
      <div class="build-pool">${pool}</div>
      ${action}`;
  }
};

/* ===== export (script classico: espone sull'ambito globale condiviso) ===== */
const Interactions = { EquationModel, balance, errorDetect, order, group, build };
