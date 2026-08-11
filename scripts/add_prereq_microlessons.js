'use strict';
// ============================================================================
// SCRIPT DI MIGRAZIONE STORICA (one-shot). Porta la teoria dei 5 moduli
// numeri/frazioni/potenze/algebra/geometria alla stessa profondità
// strutturale già raggiunta da equazioni in V2: aggiunge slide type
// 'microlesson' (la stessa card interattiva con situation/explain/example/
// check già implementata in app.js renderMicrolessonPostcard, generica e
// non specifica di equazioni) per i termini prerequisito più critici
// individuati in docs/AUDIT_DIDATTICO.md (MCD/mcm mai definiti in frazioni,
// coefficiente/termine mai definiti in algebra, perché a^0=1 in potenze,
// cos'è pi greco in geometria, cos'è un numero relativo in numeri), e
// snellisce le cartoline esistenti che ne conteneva già una spiegazione
// inline per evitare di spiegare la stessa cosa due volte di seguito.
//
// Non pensato per essere rieseguito: inserisce slide in modo posizionale.
// Non tocca equazioni.
// ============================================================================

const fs = require('fs');
const vm = require('vm');
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

const MODULES = loadModules(dataPath);
const byId = id => MODULES.find(m => m.id === id);

function ml(concept, title, situation, explain, example, check) {
  return { title, type: 'microlesson', concept, situation, explain, example, check };
}

/* ================= FRAZIONI ================= */
{
  const m = byId('frazioni');
  const mcd = ml('mcd', 'Cos’è il MCD?',
    'Per semplificare una frazione al minimo in un solo colpo, invece di provare a dividere per 2, poi per 3, poi ancora… conviene trovare subito il numero più grande possibile per cui dividere.',
    'Il MCD (Massimo Comun Divisore) di due numeri è il più grande numero che li divide entrambi esattamente, senza resto. Dividendo numeratore e denominatore per il loro MCD si ottiene subito la frazione ridotta ai minimi termini.',
    'MCD(12, 18): i divisori di 12 sono 1, 2, 3, 4, 6, 12; i divisori di 18 sono 1, 2, 3, 6, 9, 18. Il più grande in comune è 6, quindi MCD(12, 18) = 6.',
    { q: 'Qual è il MCD tra 8 e 12?', options: ['2', '4', '6', '24'], correct: 1 });
  const mcm = ml('mcm', 'Cos’è il mcm?',
    'Per sommare due frazioni con denominatori diversi non puoi sommare direttamente i numeratori: prima devi "tradurle" con lo stesso denominatore.',
    'Il mcm (minimo comune multiplo) di due numeri è il più piccolo numero che è multiplo di entrambi. Usato come denominatore comune, permette di sommare o confrontare frazioni con denominatori diversi.',
    'mcm(4, 6): i multipli di 4 sono 4, 8, 12, 16…; i multipli di 6 sono 6, 12, 18…; il più piccolo in comune è 12, quindi mcm(4, 6) = 12.',
    { q: 'Qual è il mcm tra 3 e 4?', options: ['7', '1', '12', '24'], correct: 2 });
  m.theory.splice(1, 0, mcd, mcm);
  const simplifica = m.theory[3]; // "Semplificare e confrontare", ora spostata dopo le 2 microlesson
  simplifica.body = 'Una frazione si semplifica dividendo numeratore e denominatore per il loro MCD (visto nella scheda precedente): il risultato è già ridotto ai minimi termini in un solo passaggio.\n\n' +
    'Esempio: nella frazione 6/8, il MCD tra 6 e 8 è 2: dividendo numeratore e denominatore per 2 si ottiene 3/4, già ridotta ai minimi termini (perché MCD(3,4) = 1, non si può più semplificare).\n\n' +
    'Per sommare o confrontare frazioni con denominatori diversi serve invece un denominatore comune: si usa il mcm (visto nella scheda precedente) dei due denominatori.';
}

/* ================= ALGEBRA ================= */
{
  const m = byId('algebra');
  const termine = ml('termine', 'Cos’è un termine?',
    'Guarda l’espressione 4a + 9 − 2a: sembra complicata, ma è fatta di pezzi più piccoli, uniti dai simboli + e −.',
    'Un termine è ciascuno dei "pezzi" di un’espressione, separati da + o −. In 4a + 9 − 2a ci sono tre termini: 4a, +9, −2a. Ogni termine ha il proprio segno, anche quando non è scritto esplicitamente davanti (il primo termine, se non ha segno, è considerato positivo).',
    'In 7x − 4 + 3x, i termini sono: 7x, −4, +3x — tre termini in totale.',
    { q: 'Quanti termini ci sono in 6y + 2 − y?', options: ['1', '2', '3', '4'], correct: 2 });
  const coefficiente = ml('coefficiente', 'Cos’è il coefficiente?',
    'Nel termine 5x, il numero 5 e la lettera x fanno parte dello stesso "pezzo", ma hanno ruoli diversi.',
    'Il coefficiente è il numero scritto davanti alla lettera in un termine: dice per quante volte va contata quella lettera. Se scrivo solo x, il coefficiente è 1 (sottinteso); se scrivo −x, il coefficiente è −1.',
    'Nel termine −3a, il coefficiente è −3. Nel termine b (senza numero davanti), il coefficiente è 1.',
    { q: 'Qual è il coefficiente di y nel termine −y?', options: ['0', '1', '−1', 'Non esiste'], correct: 2 });
  m.theory.splice(1, 0, termine, coefficiente);
  const termSimili = m.theory[3]; // "Termini e coefficienti", ora spostata
  termSimili.title = 'Termini simili';
  termSimili.body = 'Due termini sono simili se hanno la stessa parte letterale (stessa lettera, stesso esponente): come hai visto nelle schede precedenti, un termine ha un coefficiente (il numero davanti) e una parte letterale (la lettera).\n\n' +
    'Due termini simili si possono sommare o sottrarre sommando/sottraendo i loro coefficienti, perché rappresentano la stessa "unità" letterale.\n\n' +
    'Esempio: 3x + 5x = 8x (i coefficienti 3 e 5 si sommano perché il termine è lo stesso, x)       7a − 2a = 5a';
}

/* ================= POTENZE ================= */
{
  const m = byId('potenze');
  const props = m.theory[1]; // "Le proprietà delle potenze"
  props.body = 'Stessa base: a^n · a^m = a^(n+m)     a^n : a^m = a^(n−m)\n\n' +
    'Potenza di potenza: (a^n)^m = a^(n·m)\n\n' +
    'Caso semplice: a^1 = a (la base moltiplicata per sé stessa una sola volta è semplicemente la base).';
  const espZero = ml('esponente_zero', 'Perché a⁰ = 1?',
    'Nella scheda precedente hai visto che a^n : a^m = a^(n−m). Cosa succede se n ed m sono uguali?',
    'a⁰ non è un caso a parte da imparare a memoria: si ricava dalla proprietà della divisione. Se scegliamo lo stesso esponente sia sopra sia sotto, a^n : a^n = a^(n−n) = a⁰. Ma a^n : a^n è anche un numero diviso per se stesso, e un numero (diverso da zero) diviso per se stesso fa sempre 1. Quindi a⁰ deve valere proprio 1.',
    '5⁰ = 5^3 : 5^3 = 1 (perché qualunque numero diverso da zero diviso per se stesso fa 1), non perché è una regola arbitraria da ricordare.',
    { q: 'Perché 4⁰ = 1?', options: ['Perché lo dice una regola da ricordare a memoria', 'Perché 4⁰ = 4² : 4², e un numero diverso da zero diviso per se stesso fa 1', 'Perché ogni numero elevato a 0 diventa 0', 'Perché vale solo per basi pari'], correct: 1 });
  m.theory.splice(2, 0, espZero);
}

/* ================= NUMERI ================= */
{
  const m = byId('numeri');
  const relativo = ml('numero_relativo', 'Cos’è un numero relativo?',
    'Finora forse hai sempre lavorato solo con numeri "normali": 1, 2, 3, 100… Ma cosa succede se il risultato di un conto è più piccolo di zero?',
    'I numeri relativi (o interi relativi) sono i numeri che hanno un segno: positivo (+) se sono maggiori di zero, negativo (−) se sono minori di zero. Lo zero non ha segno. Il segno fa parte del numero tanto quanto la sua cifra: −5 e 5 sono due numeri diversi, uno agli antipodi dell’altro rispetto allo zero.',
    'Se hai 20€ e ne spendi 35€, il tuo saldo non è "15 mancanti": è −15€, un numero negativo che rappresenta un debito.',
    { q: 'Cosa indica il segno di un numero relativo?', options: ['Se il numero è pari o dispari', 'Se il numero è maggiore o minore di zero', 'Se il numero è intero o decimale', 'Niente, è solo decorativo'], correct: 1 });
  m.theory.splice(0, 0, relativo);
}

/* ================= GEOMETRIA ================= */
{
  const m = byId('geometria');
  const piGreco = ml('pi_greco', 'Cos’è π (pi greco)?',
    'In ogni cerchio, grande o piccolo, esiste un rapporto che non cambia mai.',
    'π (pi greco) è il rapporto tra la circonferenza di un cerchio (il suo perimetro) e il suo diametro: circonferenza : diametro = π. Non è una costante inventata: è un numero che si può davvero misurare, uguale per ogni cerchio perché tutti i cerchi hanno la stessa forma, solo in scala diversa. Ha infinite cifre decimali che non si ripetono mai, quindi si usa un’approssimazione: π ≈ 3,14.',
    'Se misuri un piatto rotondo e trovi che la circonferenza è circa 3,14 volte il diametro, qualunque sia la dimensione del piatto, quel rapporto è sempre π.',
    { q: 'Cos’è π (pi greco)?', options: ['Un numero deciso per convenzione, diverso per ogni cerchio', 'Il rapporto tra circonferenza e diametro, uguale per ogni cerchio', 'La metà del raggio di un cerchio', 'Un’unità di misura per gli angoli'], correct: 1 });
  m.theory.splice(2, 0, piGreco);
  const cerchio = m.theory[3]; // "Il cerchio e il numero π", ora spostata
  cerchio.title = 'Le formule del cerchio';
  cerchio.body = 'Poiché il diametro è il doppio del raggio (d = 2·r), dalla definizione di π vista nella scheda precedente si ricavano le formule che si usano per i calcoli:\n\n' +
    'Circonferenza di raggio r: C = 2·π·r\n\n' +
    'Area del cerchio di raggio r: A = π·r²\n\n' +
    'Nella pratica si usa l’approssimazione π ≈ 3,14.';
}

const out = 'const MODULES = ' + JSON.stringify(MODULES, null, 2) + ';\n';
fs.writeFileSync(dataPath, out);
console.log('data.js aggiornato: microlesson prerequisito aggiunte a numeri/frazioni/potenze/algebra/geometria.');
