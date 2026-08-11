'use strict';
// ============================================================================
// SCRIPT DI MIGRAZIONE STORICA (one-shot). Applica a data.js l'output di un
// Workflow con 5 agenti autori + 5 agenti di verifica indipendenti (uno per
// modulo numeri/frazioni/potenze/algebra/geometria) che hanno prodotto:
// correzioni mirate alla teoria (le 4 slide concettuali, non gli esempi
// svolti), skill tag su tutti gli esercizi esistenti di ciascun modulo,
// correzioni puntuali ai bug di progressione/duplicati segnalati in
// docs/AUDIT_DIDATTICO.md, e 3 nuovi esercizi interattivi per modulo che
// usano il motore generico di interactions.js (format error-detect/order/
// group/build). Il modulo `equazioni` non viene toccato in nessun modo.
//
// Superset di scripts/extend_5_moduli_light_pass.js (che gestiva solo
// error-detect, 2 per modulo): questo script gestisce tutti e 4 i format
// generici e valida strutturalmente ciascuno prima di scrivere data.js.
//
// Uso: node scripts/extend_5_moduli_parita.js <path-a-workflow-output.json>
// dove il JSON di input è l'array [{id, valid, notes, output}, ...]
// restituito dal Workflow (uno per modulo, `output` conforme allo schema
// AUTHOR_SCHEMA/VERIFY_SCHEMA descritto nello script del Workflow usato per
// generarlo).
//
// Non pensato per essere rieseguito sul proprio output: inserisce i nuovi
// esercizi interattivi in modo posizionale, rieseguirlo li duplicherebbe.
// ============================================================================

const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const dataPath = path.join(ROOT, 'data.js');

const inputPath = process.argv[2];
if (!inputPath) {
  console.error('Uso: node scripts/extend_5_moduli_parita.js <path-a-workflow-output.json>');
  process.exit(1);
}
const workflowOutput = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

function loadModules(file) {
  const src = fs.readFileSync(file, 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(src + '\nglobalThis.MODULES = MODULES;', sandbox);
  return sandbox.MODULES;
}

const MODULES = loadModules(dataPath);
const LEVELS = ['facile', 'medio', 'difficile'];
let errors = 0;
function fail(msg) { errors++; console.error('❌ ' + msg); }
function ok(msg) { console.log('✅ ' + msg); }
function warn(msg) { console.warn('⚠️  ' + msg); }

function isPermutation(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
  const sa = [...a].sort(), sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

function validateInteractive(id, ex) {
  const tag = `${id}: interattivo "${ex.q}"`;
  if (!['error-detect', 'order', 'group', 'build'].includes(ex.format)) { fail(`${tag}: format non valido "${ex.format}"`); return false; }
  if (!ex.hintSteps || ex.hintSteps.length < 1) { fail(`${tag}: hintSteps mancante`); return false; }
  if (ex.format === 'error-detect') {
    const d = ex.errorData;
    if (!d || !Array.isArray(d.steps) || d.steps.length < 2) { fail(`${tag}: errorData.steps mancante o troppo corto`); return false; }
    if (!(d.errorIndex >= 0 && d.errorIndex < d.steps.length)) { fail(`${tag}: errorData.errorIndex fuori range`); return false; }
    if (!d.explanation) { fail(`${tag}: errorData.explanation mancante`); return false; }
  } else if (ex.format === 'order') {
    const d = ex.orderData;
    if (!d || !Array.isArray(d.steps) || d.steps.length < 2) { fail(`${tag}: orderData.steps mancante o troppo corto`); return false; }
    const ids = d.steps.map(s => s.id);
    if (new Set(ids).size !== ids.length) { fail(`${tag}: orderData.steps ha id duplicati`); return false; }
    if (!isPermutation(d.correctOrder, ids)) { fail(`${tag}: orderData.correctOrder non è una permutazione degli id di steps`); return false; }
  } else if (ex.format === 'group') {
    const d = ex.groupData;
    if (!d || !Array.isArray(d.terms) || d.terms.length < 2 || !Array.isArray(d.buckets) || d.buckets.length < 2) { fail(`${tag}: groupData.terms/buckets mancante o troppo corto`); return false; }
    const bucketKeys = new Set(d.buckets.map(b => b.key));
    const termIds = d.terms.map(t => t.id);
    if (new Set(termIds).size !== termIds.length) { fail(`${tag}: groupData.terms ha id duplicati`); return false; }
    for (const t of d.terms) {
      if (!bucketKeys.has(t.group)) { fail(`${tag}: term "${t.id}" ha group "${t.group}" che non esiste in buckets`); return false; }
    }
  } else if (ex.format === 'build') {
    // A differenza di 'order' (tutti gli step vanno posizionati), 'build' può
    // includere blocchi-distrattore in blocks che NON compaiono in
    // correctSequence (vedi build.check in interactions.js: confronta solo
    // i blocchi effettivamente posizionati con correctSequence, non richiede
    // di esaurire il pool) — quindi correctSequence è un sottoinsieme
    // ordinato di blocks, non una sua permutazione.
    const d = ex.buildData;
    if (!d || !d.sentence || !Array.isArray(d.blocks) || d.blocks.length < 2) { fail(`${tag}: buildData.sentence/blocks mancante o troppo corto`); return false; }
    const ids = d.blocks.map(b => b.id);
    if (new Set(ids).size !== ids.length) { fail(`${tag}: buildData.blocks ha id duplicati`); return false; }
    if (!Array.isArray(d.correctSequence) || d.correctSequence.length === 0) { fail(`${tag}: buildData.correctSequence mancante o vuota`); return false; }
    if (!d.correctSequence.every(id => ids.includes(id))) { fail(`${tag}: buildData.correctSequence contiene un id assente da blocks`); return false; }
  }
  return true;
}

workflowOutput.forEach(({ id, valid, notes, output }) => {
  if (id === 'equazioni') { fail(`equazioni non deve comparire nell'input di questo script`); return; }
  if (!output) { fail(`${id}: nessun output (agente fallito?), modulo SALTATO`); return; }
  const m = MODULES.find(mm => mm.id === id);
  if (!m) { fail(`modulo non trovato in data.js: ${id}`); return; }
  if (valid === false) warn(`${id}: il verificatore ha segnalato correzioni — ${(notes || []).join(' | ') || '(nessuna nota)'}`);

  const expectedTotal = LEVELS.reduce((s, l) => s + m.exercises[l].length, 0);

  // 1) teoria: patch mirata alle sole slide concettuali (0-3)
  (output.theoryFixes || []).forEach(fix => {
    if (!(fix.slideIndex >= 0 && fix.slideIndex <= 3)) { fail(`${id}: theoryFixes.slideIndex fuori range (${fix.slideIndex})`); return; }
    m.theory[fix.slideIndex].title = fix.title;
    m.theory[fix.slideIndex].body = fix.body;
  });
  ok(`${id}: ${(output.theoryFixes || []).length} slide di teoria corrette`);

  // 2) skill tag su tutti gli esercizi esistenti (deve coprirli tutti)
  const byKey = new Map();
  (output.skillTags || []).forEach(t => byKey.set(t.level + ':' + t.index, t));
  let tagged = 0;
  LEVELS.forEach(level => {
    m.exercises[level].forEach((ex, i) => {
      const tag = byKey.get(level + ':' + i);
      if (!tag) { fail(`${id}: skill tag mancante per ${level}[${i}] ("${ex.q}")`); return; }
      ex.skill = tag.skill;
      ex.cognitiveType = tag.cognitiveType;
      tagged++;
    });
  });
  if (tagged !== expectedTotal) fail(`${id}: taggati ${tagged}/${expectedTotal} esercizi esistenti (attesi tutti)`);
  else ok(`${id}: ${tagged}/${expectedTotal} esercizi esistenti taggati con skill`);

  // 3) correzioni puntuali (duplicati, sovra-rappresentazioni, riformulazioni, aggiunte)
  (output.dataBugFixes || []).forEach(fix => {
    if (fix.level === 'quiz') {
      if (fix.action === 'insert') m.quiz.push(fix.newQuestion);
      else if (fix.action === 'replaceQuiz') {
        if (!(fix.index >= 0 && fix.index < m.quiz.length)) { fail(`${id}: dataBugFixes quiz index fuori range`); return; }
        m.quiz[fix.index] = fix.newQuestion;
      } else { fail(`${id}: dataBugFixes quiz action non valida "${fix.action}"`); return; }
      ok(`${id}: quiz - ${fix.description}`);
      return;
    }
    const arr = m.exercises[fix.level];
    if (!arr) { fail(`${id}: dataBugFixes level non valido "${fix.level}"`); return; }
    if (fix.action === 'replace') {
      if (!(fix.index >= 0 && fix.index < arr.length)) { fail(`${id}: dataBugFixes replace index fuori range in ${fix.level} ("${fix.description}")`); return; }
      // mantiene skill/cognitiveType già assegnati al vecchio esercizio in
      // quella posizione, a meno che newQuestion non li specifichi già.
      const preserved = { skill: arr[fix.index].skill, cognitiveType: arr[fix.index].cognitiveType };
      arr[fix.index] = Object.assign({}, preserved, fix.newQuestion);
    } else if (fix.action === 'insert') {
      arr.push(fix.newQuestion);
    } else {
      fail(`${id}: dataBugFixes action non valida "${fix.action}"`);
      return;
    }
    ok(`${id}: ${fix.level} - ${fix.description}`);
  });

  // 4) nuovi esercizi interattivi (error-detect/order/group/build), validati
  //    strutturalmente prima di essere inseriti a INIZIO del livello scelto
  //    (non in coda: come le lezioni D2 della review equazioni, l'interazione
  //    che spiega/mette alla prova il "perché" non va appesa dopo tutti i drill).
  let added = 0;
  (output.newInteractiveExercises || []).forEach(raw => {
    if (!validateInteractive(id, raw)) return;
    const level = raw.insertLevel;
    if (!LEVELS.includes(level)) { fail(`${id}: newInteractiveExercises insertLevel non valido "${level}"`); return; }
    const ex = {
      q: raw.q,
      format: raw.format,
      skill: raw.skill,
      cognitiveType: raw.cognitiveType,
      hint: raw.hint,
      hintSteps: raw.hintSteps,
    };
    if (raw.format === 'error-detect') ex.errorData = raw.errorData;
    if (raw.format === 'order') ex.orderData = raw.orderData;
    if (raw.format === 'group') ex.groupData = raw.groupData;
    if (raw.format === 'build') ex.buildData = raw.buildData;
    m.exercises[level].splice(0, 0, ex);
    added++;
  });
  ok(`${id}: ${added} nuovi esercizi interattivi aggiunti (di ${(output.newInteractiveExercises || []).length} proposti)`);
});

if (errors > 0) {
  console.error(`\n${errors} problemi trovati durante il merge — data.js NON è stato scritto.`);
  process.exit(1);
}

const out = 'const MODULES = ' + JSON.stringify(MODULES, null, 2) + ';\n';
fs.writeFileSync(dataPath, out);
console.log('\ndata.js aggiornato con successo.');
