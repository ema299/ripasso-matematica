'use strict';
// Assembla il data.js finale unendo:
// - i 6 moduli originali (teoria/esercizi/quiz già presenti in data.js)
// - il pool generato e verificato (curated.json)
// - i contenuti scritti a mano: logica + problemi a tema turismo (hand_extra.json)
// Uso: node scripts/build_data.js > data.new.js

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const SCRATCH = '/tmp/claude-0/-root/bf9d4b8c-ff0a-4372-aa57-7b8e07a7d6aa/scratchpad';
const ROOT = path.join(__dirname, '..');

// 1) carica i MODULES originali eseguendo data.js in una sandbox
const dataSrc = fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(dataSrc + '\nglobalThis.MODULES = MODULES;', sandbox);
const original = sandbox.MODULES;
if (!original) throw new Error('MODULES non trovato in data.js originale');

const curated = JSON.parse(fs.readFileSync(path.join(SCRATCH, 'curated.json'), 'utf8'));
const rawPool = JSON.parse(fs.readFileSync(path.join(SCRATCH, 'pool.json'), 'utf8'));
const handExtra = JSON.parse(fs.readFileSync(path.join(SCRATCH, 'hand_extra.json'), 'utf8'));

function sig(q) {
  const nums = (q.match(/-?\d+(?:\.\d+)?/g) || []).slice().sort().join(',');
  const kind = q.replace(/-?\d+(?:\.\d+)?/g, '#');
  return kind + '|' + nums;
}

const LEVELS = ['facile', 'medio', 'difficile'];
const TARGET_PER_LEVEL = 12;

for (const mod of original) {
  const gen = curated[mod.id];
  const hand = handExtra[mod.id];
  if (!gen || !hand) throw new Error('Contenuti mancanti per modulo ' + mod.id);

  // 5a slide di teoria
  mod.theory.push(hand.theoryExtra);

  // esercizi: generati (curati) + scritti a mano, con padding dal pool grezzo se serve
  const usedSigs = new Set();
  for (const lvl of LEVELS) {
    const combined = [...gen[lvl], ...hand.exercises[lvl]];
    combined.forEach(it => usedSigs.add(sig(it.q)));

    if (combined.length < TARGET_PER_LEVEL) {
      const pool = rawPool[mod.id][lvl];
      for (const it of pool) {
        if (combined.length >= TARGET_PER_LEVEL) break;
        const s = sig(it.q);
        if (usedSigs.has(s)) continue;
        usedSigs.add(s);
        combined.push(it);
      }
    }
    if (combined.length !== TARGET_PER_LEVEL) {
      console.error(`ATTENZIONE: ${mod.id}/${lvl} ha ${combined.length} esercizi (target ${TARGET_PER_LEVEL})`);
    }
    mod.exercises[lvl] = combined;
  }

  // quiz: 6 originali + 4 nuovi
  mod.quiz = [...mod.quiz, ...hand.quizExtra];
}

const out = 'const MODULES = ' + JSON.stringify(original, null, 2) + ';\n';
process.stdout.write(out);
