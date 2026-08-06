'use strict';
// Trasforma la 5a cartolina "Esempio svolto" di ogni modulo in una rivelazione
// passo-passo (type:'steps') e ne aggiunge una seconda, diversa, con lo stesso
// formato. Uso: node scripts/add_worked_steps.js > data.js (poi sostituire).

const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const dataSrc = fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(dataSrc + '\nglobalThis.MODULES = MODULES;', sandbox);
const MODULES = sandbox.MODULES;

const STEPS = {
  numeri: {
    first: [
      'Il problema: −4 + 3 × (−2) − (−5)',
      'Prima la moltiplicazione: 3 × (−2) = −6\n\nDiventa: −4 + (−6) − (−5)',
      'Il doppio segno meno diventa più: − (−5) = +5\n\nDiventa: −4 − 6 + 5',
      'Da sinistra a destra: −4 − 6 = −10, poi −10 + 5 = −5\n\nRisultato: −5'
    ],
    secondTitle: 'Un altro esempio',
    second: [
      'Il problema: 15 − [2 × (−3) + 4]',
      'Nella quadra, prima la moltiplicazione: 2 × (−3) = −6\n\nDiventa: 15 − [−6 + 4]',
      'Risolviamo la quadra: −6 + 4 = −2\n\nDiventa: 15 − (−2)',
      'Il doppio segno meno diventa più: 15 + 2 = 17\n\nRisultato: 17'
    ]
  },
  frazioni: {
    first: [
      'Il problema: 2/3 + 1/4',
      'Troviamo il denominatore comune: mcm(3,4) = 12',
      'Trasformiamo le frazioni: 2/3 = 8/12   e   1/4 = 3/12',
      'Sommiamo i numeratori: 8/12 + 3/12 = 11/12\n\nRisultato: 11/12'
    ],
    secondTitle: 'Un altro esempio',
    second: [
      'Il problema: uno zaino costa 60€, con uno sconto del 15%. Quanto si paga?',
      'Calcoliamo lo sconto: 15% di 60 = (60×15):100 = 9€',
      'Sottraiamo lo sconto dal prezzo pieno: 60€ − 9€ = 51€\n\nRisultato: si pagano 51€'
    ]
  },
  potenze: {
    first: [
      'Il problema: (2^3)^2 : 2^4',
      'Potenza di potenza: moltiplichiamo gli esponenti → (2^3)^2 = 2^6',
      'Ora abbiamo: 2^6 : 2^4',
      'Stessa base nella divisione: sottraiamo gli esponenti → 2^(6−4) = 2^2 = 4\n\nRisultato: 4'
    ],
    secondTitle: 'Un altro esempio',
    second: [
      'Il problema: calcola √(9 × 16)',
      'Usiamo la proprietà √(a×b) = √a × √b: √9 × √16',
      'Calcoliamo le due radici: √9 = 3   e   √16 = 4',
      'Moltiplichiamo: 3 × 4 = 12\n\nRisultato: 12'
    ]
  },
  algebra: {
    first: [
      'Il problema: semplifica 3(x+2) − (x−5)',
      'Distribuiamo il 3: 3(x+2) = 3x+6',
      'Distribuiamo il segno meno: − (x−5) = −x+5\n\n(il segno meno cambia il segno a entrambi i termini dentro la parentesi)',
      'Raggruppiamo i termini simili: (3x−x) + (6+5) = 2x+11\n\nRisultato: 2x+11'
    ],
    secondTitle: 'Un altro esempio',
    second: [
      'Il problema: calcola il valore di 2x² − 3x per x = −2',
      'Calcoliamo x²: (−2)² = 4, quindi 2x² = 2×4 = 8',
      'Calcoliamo 3x: 3×(−2) = −6, quindi −3x = −(−6) = +6',
      'Sommiamo: 8 + 6 = 14\n\nRisultato: 14'
    ]
  },
  equazioni: {
    first: [
      'Il problema: risolvi 3(x−2) = x+4',
      'Distribuiamo il 3: 3x−6 = x+4',
      'Portiamo le x a sinistra e i numeri a destra: 3x−x = 4+6',
      'Semplifichiamo: 2x = 10 → x = 5',
      'Verifica: 3(5−2)=9  e  5+4=9 ✓ Corretto!'
    ],
    secondTitle: 'Un altro esempio',
    second: [
      'Il problema: risolvi x/2 + 3 = 7',
      'Portiamo il 3 dall\'altra parte: x/2 = 7 − 3 = 4',
      'Moltiplichiamo entrambi i membri per 2: x = 4 × 2 = 8\n\nVerifica: 8/2+3 = 4+3 = 7 ✓'
    ]
  },
  geometria: {
    first: [
      'Il problema: un triangolo rettangolo ha i cateti 6 cm e 8 cm. Troviamo l\'ipotenusa e l\'area.',
      'Ipotenusa (teorema di Pitagora): √(6²+8²) = √(36+64) = √100 = 10 cm',
      'Area: (6×8):2 = 24 cm²\n\nRisultato: ipotenusa 10 cm, area 24 cm²'
    ],
    secondTitle: 'Un altro esempio',
    second: [
      'Il problema: un cerchio ha raggio 5 cm. Calcoliamo circonferenza e area (π ≈ 3,14).',
      'Circonferenza: C = 2 × π × r = 2 × 3,14 × 5 = 31,4 cm',
      'Area: A = π × r² = 3,14 × 25 = 78,5 cm²\n\nRisultato: circonferenza 31,4 cm, area 78,5 cm²'
    ]
  }
};

for (const mod of MODULES) {
  const s = STEPS[mod.id];
  if (!s) throw new Error('Mancano gli step per ' + mod.id);
  const lastIdx = mod.theory.length - 1;
  if (mod.theory[lastIdx].title !== 'Esempio svolto') throw new Error('Struttura inattesa per ' + mod.id);
  mod.theory[lastIdx] = { title: 'Esempio svolto', type: 'steps', steps: s.first };
  mod.theory.push({ title: s.secondTitle, type: 'steps', steps: s.second });
}

process.stdout.write('const MODULES = ' + JSON.stringify(MODULES, null, 2) + ';\n');
