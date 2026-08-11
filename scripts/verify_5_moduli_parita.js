'use strict';
// Verifica di regressione dopo scripts/extend_5_moduli_parita.js +
// scripts/register_twin_models.js. Uso: node scripts/verify_5_moduli_parita.js
//
// Replica checkAnswer()/normalizeNumber()/normalizeExpr() da app.js (stesso
// pattern di CLAUDE.md, vedi scripts/build_data.js), più: valida gli
// esercizi error-detect/order/group/build appena aggiunti (stesse regole
// del validatore di extend_5_moduli_parita.js, per rilevare eventuali
// regressioni introdotte da modifiche manuali successive), verifica che
// ogni esercizio dei 5 moduli toccati abbia skill, e verifica che
// 'equazioni' sia rimasto byte-per-byte identico a HEAD (questa passata
// non doveva toccarlo).

const fs = require('fs');
const vm = require('vm');
const { execSync } = require('child_process');
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

let headSrc;
try { headSrc = execSync('git show HEAD:data.js', { cwd: ROOT, encoding: 'utf8' }); }
catch (e) { console.error('❌ impossibile leggere data.js da HEAD:', e.message); process.exit(1); }
const headSandbox = {};
vm.createContext(headSandbox);
vm.runInContext(headSrc + '\nglobalThis.MODULES = MODULES;', headSandbox);
const headModules = headSandbox.MODULES;

const candidate = loadModules(dataPath);

let failures = 0;
function fail(msg) { failures++; console.error('❌ ' + msg); }
function ok(msg) { console.log('✅ ' + msg); }

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
function isPermutation(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
  const sa = [...a].sort(), sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

const LEVELS = ['facile', 'medio', 'difficile'];
const TOUCHED = new Set(['numeri', 'frazioni', 'potenze', 'algebra', 'geometria']);

/* ---- 1) equazioni deve restare identico a HEAD ---- */
const hEq = headModules.find(m => m.id === 'equazioni');
const cEq = candidate.find(m => m.id === 'equazioni');
if (JSON.stringify(hEq) !== JSON.stringify(cEq)) fail('equazioni è cambiato rispetto a HEAD (non doveva essere toccato da questa passata)');
else ok('equazioni invariato rispetto a HEAD');

/* ---- 2) self-consistency risposte + formati interattivi ---- */
for (const m of candidate) {
  for (const level of LEVELS) {
    for (const ex of m.exercises[level]) {
      if (ex.type === 'choice') {
        if (!(ex.correct >= 0 && ex.correct < ex.options.length)) fail(`${m.id}/${level}: choice.correct fuori range in "${ex.q}"`);
        continue;
      }
      if (ex.format === 'error-detect') {
        const n = ex.errorData.steps.length;
        if (!(ex.errorData.errorIndex >= 0 && ex.errorData.errorIndex < n)) fail(`${m.id}/${level}: errorIndex fuori range in "${ex.q}"`);
        continue;
      }
      if (ex.format === 'order') {
        const ids = ex.orderData.steps.map(s => s.id);
        if (!isPermutation(ex.orderData.correctOrder, ids)) fail(`${m.id}/${level}: order.correctOrder non è permutazione degli step in "${ex.q}"`);
        continue;
      }
      if (ex.format === 'group') {
        const bucketKeys = new Set(ex.groupData.buckets.map(b => b.key));
        for (const t of ex.groupData.terms) {
          if (!bucketKeys.has(t.group)) fail(`${m.id}/${level}: group term "${t.id}" ha group "${t.group}" inesistente in "${ex.q}"`);
        }
        continue;
      }
      if (ex.format === 'build') {
        const ids = ex.buildData.blocks.map(b => b.id);
        if (!ex.buildData.correctSequence.every(id => ids.includes(id))) fail(`${m.id}/${level}: build.correctSequence contiene un id assente da blocks in "${ex.q}"`);
        continue;
      }
      if (ex.format === 'balance') continue; // modello equazioni, non toccato da questa passata
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
ok('self-consistency (answer/choice/quiz + strutture interattive) completata su tutti i moduli');

/* ---- 3) i 5 moduli toccati: ogni esercizio classico deve avere skill + generatorKey/model ---- */
for (const m of candidate) {
  if (!TOUCHED.has(m.id)) continue;
  let missingSkill = 0, missingModel = 0, total = 0, interactive = 0;
  for (const level of LEVELS) {
    for (const ex of m.exercises[level]) {
      total++;
      if (!ex.skill) missingSkill++;
      if (ex.format) { interactive++; continue; } // error-detect/order/group/build: modello non applicabile
      if (!ex.generatorKey || !ex.model) missingModel++;
    }
  }
  if (missingSkill > 0) fail(`${m.id}: ${missingSkill}/${total} esercizi senza skill`);
  else ok(`${m.id}: tutti i ${total} esercizi (${total - interactive} classici + ${interactive} interattivi) hanno skill`);
  if (missingModel > 0) fail(`${m.id}: ${missingModel} esercizi classici senza generatorKey/model (gemello non generabile)`);
  else ok(`${m.id}: tutti i ${total - interactive} esercizi classici hanno generatorKey/model (gemello generabile)`);
}

/* ---- 4) conteggio esercizi/quiz per modulo (informativo) ---- */
console.log('\n--- conteggi ---');
for (const m of candidate) {
  const counts = LEVELS.map(l => m.exercises[l].length).join('/');
  const formats = {};
  LEVELS.forEach(l => m.exercises[l].forEach(e => { if (e.format) formats[e.format] = (formats[e.format] || 0) + 1; }));
  console.log(`${m.id}: facile/medio/difficile = ${counts}, quiz = ${m.quiz.length}, interattivi = ${JSON.stringify(formats)}`);
}

console.log('\n' + (failures === 0 ? `TUTTO OK (0 fallimenti)` : `${failures} FALLIMENTI`));
process.exit(failures === 0 ? 0 : 1);
