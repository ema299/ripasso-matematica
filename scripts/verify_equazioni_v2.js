'use strict';
// Fase 9 del task: verifica di regressione prima di sostituire data.js.
// Uso: node scripts/verify_equazioni_v2.js <path-al-nuovo-data.js>
//
// Replica checkAnswer()/normalizeNumber()/normalizeExpr() da app.js (stesso
// pattern documentato in CLAUDE.md) e in più:
//  - valida strutturalmente i 5 nuovi format interattivi
//  - verifica che i 5 moduli diversi da "equazioni" siano rimasti IDENTICI
//    byte-per-byte (serializzazione) rispetto all'attuale data.js

const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const candidatePath = process.argv[2];
if (!candidatePath) { console.error('Uso: node scripts/verify_equazioni_v2.js <path-al-nuovo-data.js>'); process.exit(1); }

function loadModules(file) {
  const src = fs.readFileSync(file, 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(src + '\nglobalThis.MODULES = MODULES;', sandbox);
  return sandbox.MODULES;
}

const original = loadModules(path.join(ROOT, 'data.js'));
const candidate = loadModules(candidatePath);

let failures = 0;
function fail(msg) { failures++; console.error('❌ ' + msg); }
function ok(msg) { console.log('✅ ' + msg); }

/* ---- replica di normalizeNumber/normalizeExpr/checkAnswer (app.js) ---- */
function normalizeNumber(str) {
  const s = String(str).trim().replace(',', '.');
  if (/^-?\d+\/\d+$/.test(s)) {
    const [a, b] = s.split('/').map(Number);
    return b === 0 ? null : a / b;
  }
  const n = parseFloat(s);
  return Number.isNaN(n) ? null : n;
}
function normalizeExpr(str) { return String(str).toLowerCase().replace(/\s+/g, '').replace(/\*/g, ''); }
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

const INTERACTIVE_FORMATS = new Set(['balance', 'order', 'group', 'build', 'error-detect']);

/* ---- 1) altri 5 moduli devono restare identici ---- */
for (const om of original) {
  if (om.id === 'equazioni') continue;
  const cm = candidate.find(m => m.id === om.id);
  if (!cm) { fail(`Modulo ${om.id} mancante nel candidato`); continue; }
  const a = JSON.stringify(om), b = JSON.stringify(cm);
  if (a !== b) fail(`Modulo ${om.id} è cambiato (dovrebbe restare intatto)`);
  else ok(`Modulo ${om.id} invariato`);
}

/* ---- 2) self-consistency su TUTTI i moduli (come da CLAUDE.md) ---- */
for (const m of candidate) {
  for (const level of ['facile', 'medio', 'difficile']) {
    for (const ex of m.exercises[level]) {
      if (ex.type === 'choice') {
        if (!(ex.correct >= 0 && ex.correct < ex.options.length)) fail(`${m.id}/${level}: choice.correct fuori range in "${ex.q}"`);
        continue;
      }
      if (ex.format && INTERACTIVE_FORMATS.has(ex.format)) {
        validateInteractive(m, level, ex);
        continue;
      }
      if (ex.type === 'expr') {
        if (!ex.answer.every(variant => checkAnswer(ex, variant))) fail(`${m.id}/${level}: una variante di answer non è accettata dal proprio checker in "${ex.q}"`);
      } else if (!checkAnswer(ex, ex.answer)) {
        fail(`${m.id}/${level}: answer non accettato dal proprio checker in "${ex.q}"`);
      }
    }
  }
  for (const q of m.quiz) {
    if (!(q.correct >= 0 && q.correct < q.options.length)) fail(`${m.id}/quiz: correct fuori range in "${q.q}"`);
  }
}

function validateInteractive(m, level, ex) {
  const where = `${m.id}/${level} "${ex.q}"`;
  if (ex.format === 'balance') {
    if (!ex.model) return fail(`${where}: balance senza model`);
    let cur = { ...ex.model }, guard = 0;
    while (!(cur.a === 1 && cur.b === 0 && cur.c === 0) && guard < 8) {
      if (cur.c !== 0) cur = { a: cur.a - cur.c, b: cur.b, c: 0, d: cur.d };
      else if (cur.b !== 0) cur = { a: cur.a, b: 0, c: cur.c, d: cur.d - cur.b };
      else if (cur.a !== 1) cur = { a: 1, b: cur.b, c: cur.c, d: cur.d / cur.a };
      guard++;
    }
    if (String(cur.d) !== String(ex.answer)) fail(`${where}: bilancia risolve x=${cur.d}, answer=${ex.answer}`);
    else ok(`${where}: modello bilancia coerente (x=${cur.d})`);
  } else if (ex.format === 'order') {
    const ids = ex.orderData.steps.map(s => s.id).sort();
    const correctIds = ex.orderData.correctOrder.slice().sort();
    if (JSON.stringify(ids) !== JSON.stringify(correctIds)) fail(`${where}: correctOrder non è una permutazione degli step`);
    else ok(`${where}: correctOrder valido`);
  } else if (ex.format === 'group') {
    const bucketKeys = new Set(ex.groupData.buckets.map(b => b.key));
    const allValid = ex.groupData.terms.every(t => bucketKeys.has(t.group));
    if (!allValid) fail(`${where}: un termine ha group non presente tra i buckets`);
    else ok(`${where}: assegnazioni group valide`);
  } else if (ex.format === 'build') {
    const blockIds = new Set(ex.buildData.blocks.map(b => b.id));
    const seqValid = ex.buildData.correctSequence.every(id => blockIds.has(id));
    if (!seqValid) fail(`${where}: correctSequence referenzia un blocco inesistente`);
    else ok(`${where}: correctSequence valida`);
  } else if (ex.format === 'error-detect') {
    const n = ex.errorData.steps.length;
    if (!(ex.errorData.errorIndex >= 0 && ex.errorData.errorIndex < n)) fail(`${where}: errorIndex fuori range`);
    else ok(`${where}: errorIndex valido`);
  }
}

/* ---- 3) microlezioni: ogni check ha un'opzione corretta valida ---- */
const eq = candidate.find(m => m.id === 'equazioni');
eq.theory.forEach((s, i) => {
  if (s.type !== 'microlesson') return;
  const c = s.check;
  if (!(c.correct >= 0 && c.correct < c.options.length)) fail(`equazioni/theory[${i}] "${s.title}": check.correct fuori range`);
  else ok(`equazioni/theory[${i}] "${s.title}": micro-verifica valida`);
});

console.log('\n' + (failures === 0 ? `TUTTO OK (0 fallimenti)` : `${failures} FALLIMENTI`));
process.exit(failures === 0 ? 0 : 1);
