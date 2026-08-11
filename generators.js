'use strict';
/* ===== Generatori di esercizi (motore condiviso) =====
   Stesse funzioni pure di scripts/gen_exercises.js (correttezza per
   costruzione: il valore lo calcola questo stesso codice, mai scritto a
   mano), estratte in un file caricabile dal browser così help-engine.js può
   riusarle per generare "esercizi gemelli" nei moduli numeri/frazioni/
   potenze/algebra/geometria — esattamente come TWIN_GENERATORS.equazioni fa
   per il modulo equazioni (vedi help-engine.js). equazioni non è qui: ha
   già il proprio modello simbolico in interactions.js/EquationModel.

   Se modifichi la logica di generazione qui, valuta se scripts/
   gen_exercises.js (usato per popolare pool iniziali di data.js, non a
   runtime) debba restare allineato o possa divergere: sono file distinti
   con scopi distinti, non un'unica fonte di verità.

   Caricato PRIMA di help-engine.js (vedi index.html).
*/

function ri(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[ri(0, arr.length - 1)]; }
function riNonZero(min, max) { let n; do { n = ri(min, max); } while (n === 0); return n; }
function fmtNum(n) { return Math.round(n * 1000) / 1000; }
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function coefVarVariants(coef, v) {
  if (coef === 0) return ['0'];
  const canon = Math.abs(coef) === 1 ? (coef === 1 ? v : `-${v}`) : `${coef}${v}`;
  const literal = `${coef}${v}`;
  return canon === literal ? [canon] : [canon, literal];
}

/* ============== NUMERI (interi, ordine delle operazioni) ============== */
function genNumeriFacile(n) {
  const out = [];
  const ops = ['+', '-', '×', ':'];
  for (let i = 0; i < n; i++) {
    const op = pick(ops);
    let a, b, val, q;
    if (op === ':') {
      b = riNonZero(-9, 9);
      const mult = riNonZero(-9, 9);
      a = b * mult;
      val = mult;
      q = `${a} : (${b}) = ?`;
    } else {
      a = riNonZero(-15, 15);
      b = riNonZero(-15, 15);
      if (op === '+') val = a + b;
      else if (op === '-') val = a - b;
      else val = a * b;
      q = op === '+' ? `(${a}) + (${b}) = ?` : op === '-' ? `(${a}) − (${b}) = ?` : `(${a}) × (${b}) = ?`;
    }
    out.push({ q, answer: String(val), hint: 'Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo.' });
  }
  return out;
}
function genNumeriMedio(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = riNonZero(-12, 12), b = riNonZero(-9, 9), c = riNonZero(2, 9);
    const pattern = ri(0, 3);
    let q, val;
    if (pattern === 0) { q = `${a} + ${b} × ${c} = ?`; val = a + b * c; }
    else if (pattern === 1) { q = `(${a} − ${b}) × ${c} = ?`; val = (a - b) * c; }
    else if (pattern === 2) { q = `${a} − ${b} × ${c} = ?`; val = a - b * c; }
    else { const d = b * c; q = `${d} : ${c} + ${a} = ?`; val = d / c + a; }
    out.push({ q, answer: String(val), hint: "Ricorda l'ordine delle operazioni: prima moltiplicazioni/divisioni, poi addizioni/sottrazioni (o risolvi prima la parentesi)." });
  }
  return out;
}
function genNumeriDifficile(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = riNonZero(-9, 9), b = riNonZero(-9, 9), c = riNonZero(2, 6), d = riNonZero(-9, 9);
    const pattern = ri(0, 2);
    let q, val;
    if (pattern === 0) { q = `(${a} − ${b}) × (${d} − ${c}) = ?`; val = (a - b) * (d - c); }
    else if (pattern === 1) { q = `${a} − [${b} − (${d} − ${c})] = ?`; val = a - (b - (d - c)); }
    else { const prod = c * d; q = `[${prod} : ${c} − ${a}] × (−${Math.abs(b)}) = ?`; val = (prod / c - a) * (-Math.abs(b)); }
    out.push({ q, answer: String(val), hint: 'Risolvi sempre prima le parentesi più interne, poi procedi verso le più esterne.' });
  }
  return out;
}

/* ============== POTENZE E RADICI ============== */
const SQUARES = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225];
function genPotenzeFacile(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const mode = ri(0, 1);
    if (mode === 0) {
      const a = ri(2, 9), e = ri(2, 3);
      out.push({ q: `${a}^${e} = ?`, answer: String(Math.pow(a, e)), hint: `${a} moltiplicato per sé stesso ${e} volte.` });
    } else {
      const idx = ri(0, SQUARES.length - 1);
      const root = idx + 1;
      out.push({ q: `Radice quadrata di ${SQUARES[idx]} = ?`, answer: String(root), hint: 'Quale numero moltiplicato per sé stesso dà questo risultato?' });
    }
  }
  return out;
}
function genPotenzeMedio(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const pattern = ri(0, 2);
    const a = ri(2, 6);
    if (pattern === 0) {
      const e1 = ri(2, 3), e2 = ri(1, 2);
      out.push({ q: `${a}^${e1} × ${a}^${e2} = ?`, answer: String(Math.pow(a, e1 + e2)), hint: 'Stessa base: somma gli esponenti.' });
    } else if (pattern === 1) {
      const e1 = ri(1, 2), e2 = ri(2, 2);
      out.push({ q: `(${a}^${e1})^${e2} = ?`, answer: String(Math.pow(a, e1 * e2)), hint: 'Potenza di potenza: moltiplica gli esponenti.' });
    } else {
      const idx = ri(4, SQUARES.length - 1);
      out.push({ q: `Radice quadrata di ${SQUARES[idx]} = ?`, answer: String(idx + 1), hint: 'Quale numero moltiplicato per sé stesso dà questo risultato?' });
    }
  }
  return out;
}
function genPotenzeDifficile(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const pattern = ri(0, 2);
    if (pattern === 0) {
      const a = ri(2, 5), e1 = ri(1, 3), e2 = ri(1, 2), b = ri(2, 4), e3 = ri(1, 2);
      const val = Math.pow(a, e1) * Math.pow(a, e2) + Math.pow(b, e3);
      out.push({ q: `${a}^${e1} × ${a}^${e2} + ${b}^${e3} = ?`, answer: String(val), hint: 'Calcola separatamente il prodotto di potenze (stessa base → somma esponenti) e la potenza finale, poi somma.' });
    } else if (pattern === 1) {
      const a = ri(2, 4), e1 = ri(2, 2), e2 = ri(1, 2), e3 = ri(1, 2);
      const val = Math.pow(a, e1 * e2 - e3);
      out.push({ q: `(${a}^${e1})^${e2} : ${a}^${e3} = ?`, answer: String(val), hint: 'Prima la potenza di potenza, poi sottrai gli esponenti nella divisione.' });
    } else {
      const x = ri(3, 12), y = ri(3, 12);
      const val = Math.round(Math.sqrt(x * x * y * y));
      out.push({ q: `Radice quadrata di (${x * x} × ${y * y}) = ?`, answer: String(val), hint: 'Usa √(a·b) = √a · √b: calcola le due radici separatamente.' });
    }
  }
  return out;
}

/* ============== GEOMETRIA PIANA ============== */
const TRIPLES = [[3, 4, 5], [6, 8, 10], [9, 12, 15], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [12, 16, 20]];
function genGeometriaFacile(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const pattern = ri(0, 3);
    if (pattern === 0) { const l = ri(3, 15); out.push({ q: `Area di un quadrato con lato ${l} cm`, answer: String(l * l), unit: 'cm²', hint: 'Area = lato²' }); }
    else if (pattern === 1) { const l = ri(3, 15); out.push({ q: `Perimetro di un quadrato con lato ${l} cm`, answer: String(l * 4), unit: 'cm', hint: 'Perimetro = 4 × lato' }); }
    else if (pattern === 2) { const b = ri(4, 18), h = ri(3, 12); out.push({ q: `Area di un rettangolo con base ${b} cm e altezza ${h} cm`, answer: String(b * h), unit: 'cm²', hint: 'Area = base × altezza' }); }
    else { const b = ri(4, 16), h = ri(3, 12); out.push({ q: `Area di un triangolo con base ${b} cm e altezza ${h} cm`, answer: String(fmtNum(b * h / 2)), unit: 'cm²', hint: 'Area = (base × altezza) : 2' }); }
  }
  return out;
}
function genGeometriaMedio(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const pattern = ri(0, 3);
    if (pattern === 0) { const t = pick(TRIPLES); out.push({ q: `Un triangolo rettangolo ha i cateti di ${t[0]} cm e ${t[1]} cm. Quanto misura l'ipotenusa?`, answer: String(t[2]), unit: 'cm', hint: 'ipotenusa = √(cateto1² + cateto2²)' }); }
    else if (pattern === 1) { const r = ri(2, 12); out.push({ q: `Circonferenza di un cerchio con raggio ${r} cm (usa π ≈ 3,14)`, answer: String(fmtNum(2 * 3.14 * r)), unit: 'cm', hint: 'C = 2 × π × r' }); }
    else if (pattern === 2) { const r = ri(2, 12); out.push({ q: `Area di un cerchio con raggio ${r} cm (usa π ≈ 3,14)`, answer: String(fmtNum(3.14 * r * r)), unit: 'cm²', hint: 'A = π × r²' }); }
    else { const l = ri(4, 16); out.push({ q: `Un quadrato ha area ${l * l} cm². Quanto misura il lato?`, answer: String(l), unit: 'cm', hint: 'Il lato è la radice quadrata dell\'area.' }); }
  }
  return out;
}
function genGeometriaDifficile(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const pattern = ri(0, 2);
    if (pattern === 0) { const t = pick(TRIPLES); const known = pick([0, 1]); out.push({ q: `Un triangolo rettangolo ha ipotenusa ${t[2]} cm e un cateto ${t[known]} cm. Quanto misura l'altro cateto?`, answer: String(t[1 - known]), unit: 'cm', hint: 'cateto = √(ipotenusa² − cateto²)' }); }
    else if (pattern === 1) { const w = ri(6, 20), h = ri(4, 15), costPerM = ri(3, 12); const perim = 2 * (w + h); out.push({ q: `Un giardino rettangolare misura ${w} m x ${h} m. Recintarlo con una rete costa ${costPerM}€ al metro. Quanto si spende in totale?`, answer: String(perim * costPerM), unit: '€', hint: 'Prima calcola il perimetro, poi moltiplica per il costo al metro.' }); }
    else { const w = ri(6, 14), h = ri(4, 10), border = 1; const outer = (w + 2 * border) * (h + 2 * border); out.push({ q: `Una piscina rettangolare di ${w} m x ${h} m ha un bordo largo 1 m su ogni lato. Qual è l'area totale (piscina + bordo)?`, answer: String(outer), unit: 'm²', hint: 'Il bordo aggiunge 1 m per lato: le dimensioni totali diventano (base+2) x (altezza+2).' }); }
  }
  return out;
}

/* ============== FRAZIONI E PERCENTUALI ============== */
const NICE_PCT = [5, 10, 15, 20, 25, 30, 40, 50, 60, 75];
function genFrazioniFacile(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const pattern = ri(0, 2);
    if (pattern === 0) { const pct = pick(NICE_PCT); const base = pick([20, 40, 50, 60, 80, 100, 120, 200]); out.push({ q: `Quanto fa il ${pct}% di ${base}?`, answer: String(fmtNum(base * pct / 100)), hint: '(numero × percentuale) : 100' }); }
    else if (pattern === 1) { const den = pick([2, 3, 4, 5, 6, 8, 10]); const num1 = ri(1, den - 1); let num2 = ri(1, den - 1); out.push({ q: `${num1}/${den} + ${num2}/${den} = ?`, answer: `${num1 + num2}/${den}`, hint: 'Stesso denominatore: somma solo i numeratori.' }); }
    else { const reduced = pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5]]); const k = ri(2, 6); out.push({ q: `Semplifica la frazione ${reduced[0] * k}/${reduced[1] * k}`, answer: `${reduced[0]}/${reduced[1]}`, hint: 'Dividi numeratore e denominatore per lo stesso numero (il loro massimo comun divisore).' }); }
  }
  return out;
}
function genFrazioniMedio(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const pattern = ri(0, 2);
    if (pattern === 0) { const pct = pick(NICE_PCT); const price = pick([20, 30, 40, 50, 60, 80, 100, 120, 150]); out.push({ q: `Uno zaino da viaggio costa ${price}€ con uno sconto del ${pct}%. Quanti euro si risparmiano?`, answer: String(fmtNum(price * pct / 100)), unit: '€', hint: `Calcola il ${pct}% di ${price}.` }); }
    else if (pattern === 1) { const dens = pick([[2, 4], [2, 6], [3, 6], [2, 3], [4, 8], [3, 9], [2, 8]]); const [d1, d2] = dens; const lcm = (d1 * d2) / gcd(d1, d2); const n1 = ri(1, d1 - 1), n2 = ri(1, d2 - 1); const sum = n1 * (lcm / d1) + n2 * (lcm / d2); out.push({ q: `${n1}/${d1} + ${n2}/${d2} = ?`, answer: `${sum}/${lcm}`, hint: 'Trova il denominatore comune, poi somma i numeratori.' }); }
    else { const den = pick([3, 4, 5, 6]); const num = ri(1, den - 1); const base = den * pick([4, 8, 12, 16, 20]); out.push({ q: `Calcola ${num}/${den} di ${base}`, answer: String(base * num / den), hint: 'Dividi il numero per il denominatore, poi moltiplica per il numeratore.' }); }
  }
  return out;
}
function genFrazioniDifficile(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const pattern = ri(0, 2);
    if (pattern === 0) { const price = pick([200, 250, 300, 350, 400, 500]); const pct1 = pick(NICE_PCT); const pct2 = pick(NICE_PCT); const step1 = price * (1 + pct1 / 100); const final = step1 * (1 - pct2 / 100); out.push({ q: `Un viaggio costa ${price}€. Il prezzo aumenta del ${pct1}%, poi sul nuovo prezzo viene applicato uno sconto del ${pct2}%. Prezzo finale?`, answer: String(fmtNum(final)), unit: '€', hint: `Aumenta prima ${price} del ${pct1}%, poi applica lo sconto del ${pct2}% sul NUOVO prezzo (non su ${price}).` }); }
    else if (pattern === 1) { const base = pick([80, 100, 120, 150, 200]); const den = pick([4, 5, 8]); const num = ri(1, den - 1); const pct = pick(NICE_PCT); const part = base * num / den; const final = part * (1 + pct / 100); out.push({ q: `Calcola ${num}/${den} di ${base}, poi aumenta il risultato del ${pct}%`, answer: String(fmtNum(final)), hint: `Prima ${num}/${den} di ${base}, poi aggiungi il ${pct}% di quel risultato.` }); }
    else { const price = pick([250, 300, 350, 400, 450]); const pct = pick(NICE_PCT); out.push({ q: `Un pacchetto vacanza in agenzia costa ${price}€. Con lo sconto "prenota prima" del ${pct}% quanto si paga?`, answer: String(fmtNum(price * (1 - pct / 100))), unit: '€', hint: `Sottrai il ${pct}% di ${price} dal prezzo pieno.` }); }
  }
  return out;
}

/* ============== ESPRESSIONI ALGEBRICHE ============== */
function genAlgebraFacile(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const pattern = ri(0, 1);
    const v = pick(['x', 'a', 'y', 'b']);
    if (pattern === 0) { const c1 = ri(2, 9), c2 = ri(2, 9); out.push({ q: `Semplifica: ${c1}${v} + ${c2}${v} = ?`, answer: coefVarVariants(c1 + c2, v), type: 'expr', hint: 'Somma i coefficienti, la lettera resta la stessa.' }); }
    else { const coef = ri(2, 6); const val = ri(-6, 6); const b = ri(0, 8); out.push({ q: `Calcola il valore di ${coef}${v}${b ? ` + ${b}` : ''} per ${v}=${val}`, answer: String(coef * val + b), hint: `Sostituisci ${val} al posto di ${v}.` }); }
  }
  return out;
}
function genAlgebraMedio(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const pattern = ri(0, 1);
    const v = pick(['x', 'a', 'y']);
    if (pattern === 0) { const c1 = ri(2, 9); let c2 = ri(1, 7); if (c2 === c1) c2 = c1 + 1; const res = c1 - c2; out.push({ q: `Semplifica: ${c1}${v} − ${c2}${v} = ?`, answer: coefVarVariants(res, v), type: 'expr', hint: 'Sottrai i coefficienti mantenendo la lettera.' }); }
    else { const coef = ri(2, 5); const val = ri(-5, 5); out.push({ q: `Calcola il valore di ${v}^2 + ${coef}${v} per ${v}=${val}`, answer: String(val * val + coef * val), hint: `Calcola prima ${v}², poi ${coef}·${v}, infine somma.` }); }
  }
  return out;
}
function genAlgebraDifficile(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const v = pick(['x', 'a']);
    const val = riNonZero(-5, 5);
    const c1 = ri(2, 6), c2 = riNonZero(-6, 6);
    const res = c1 * val * val + c2 * val;
    out.push({ q: `Calcola il valore di ${c1}${v}^2 ${c2 >= 0 ? '+ ' + c2 : '− ' + Math.abs(c2)}${v} per ${v}=${val}`, answer: String(res), hint: `Calcola prima ${v}² con il suo segno, poi i due prodotti, infine somma.` });
  }
  return out;
}

/* ===== export (script classico) ===== */
const Generators = {
  numeri: { facile: genNumeriFacile, medio: genNumeriMedio, difficile: genNumeriDifficile },
  potenze: { facile: genPotenzeFacile, medio: genPotenzeMedio, difficile: genPotenzeDifficile },
  geometria: { facile: genGeometriaFacile, medio: genGeometriaMedio, difficile: genGeometriaDifficile },
  frazioni: { facile: genFrazioniFacile, medio: genFrazioniMedio, difficile: genFrazioniDifficile },
  algebra: { facile: genAlgebraFacile, medio: genAlgebraMedio, difficile: genAlgebraDifficile },
};
