'use strict';
// FASE 1 della V2 — modulo equazioni come modello di riferimento.
// Trasforma SOLO mod.id === 'equazioni' in data.js:
//  - antepone 9 micro-lezioni sui prerequisiti (Fase 2 del task)
//  - riscrive la slide "Come si risolve" derivandola dal principio di equivalenza
//    invece di introdurre subito "cambia lato, cambia segno" (Fase 3 / audit §3.1)
//  - tagga i 36 esercizi esistenti con skill/level6/cognitiveType e, dove
//    l'esercizio è una pura equazione lineare, con un modello simbolico
//    {a,b,c,d} (ax+b=cx+d) verificato PROGRAMMATICAMENTE contro answer
//  - sposta l'esercizio "caramelle (Luca)" da facile a medio (correzione
//    di progressione già raccomandata da AUDIT_DIDATTICO.md §4/§10 item 6)
//  - aggiunge 20 nuovi esercizi nei 5 nuovi formati interattivi (Fase 4)
//  - non tocca gli altri 5 moduli
//
// Uso: node scripts/build_equazioni_v2.js > data.new.js
//      poi: mv data.new.js data.js (dopo aver rieseguito il self-consistency check)

const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const dataSrc = fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8');
const engineSrc = fs.readFileSync(path.join(ROOT, 'interactions.js'), 'utf8') + '\n' +
  fs.readFileSync(path.join(ROOT, 'help-engine.js'), 'utf8');
const sandbox = { console, Math };
vm.createContext(sandbox);
vm.runInContext(dataSrc + '\nglobalThis.MODULES = MODULES;', sandbox);
vm.runInContext(engineSrc + '\nglobalThis.Interactions = Interactions;', sandbox);
const MODULES = sandbox.MODULES;
const EM = sandbox.Interactions.EquationModel;

const mod = MODULES.find(m => m.id === 'equazioni');
if (!mod) throw new Error('Modulo equazioni non trovato');

/* ===================================================================
   1) MICRO-LEZIONI PREREQUISITI (Fase 2)
   =================================================================== */
const MICROLESSONS = [
  {
    title: "Cos'è x?", type: 'microlesson', concept: 'x',
    situation: "Immagina di sapere che, aggiungendo 3 valigie a quelle che hai già, arrivi a 7 in totale. Non sai ancora quante valigie hai ORA: quel numero sconosciuto ha bisogno di un nome.",
    explain: "In matematica, invece di scrivere ogni volta “il numero che non conosco ancora”, usiamo una lettera al posto del numero. La più usata è x, ma potrebbe essere una qualsiasi altra lettera (y, n, t...). x non è un simbolo magico: è solo un contenitore per un numero che, al momento, non conosciamo.",
    example: "Nella frase “x valigie + 3 valigie = 7 valigie”, x rappresenta il numero di valigie che avevi all'inizio. Risolvere il problema significa scoprire quale numero si nasconde dietro la x.",
    check: { q: 'Cosa rappresenta la lettera x in un’equazione?', options: ['Sempre il numero 10', 'Un numero che non conosciamo ancora e vogliamo trovare', 'Una parola in codice', 'Il numero delle domande'], correct: 1 }
  },
  {
    title: 'Variabile', type: 'microlesson', concept: 'variabile',
    situation: "Non tutte le lettere “nascondono” sempre lo stesso identico numero: a volte una lettera serve per descrivere una regola valida per tanti casi insieme.",
    explain: "Una variabile è una lettera che può assumere valori diversi, a seconda della situazione. Serve per scrivere una regola generale, non per trovare un unico numero preciso.",
    example: "Il costo di un taxi è “C = 3 + 1,5 × km”. Qui km è una variabile: cambia da viaggio a viaggio (5 km, 12 km, 20 km...) e la formula resta valida per ognuno di questi valori.",
    check: { q: 'Quando una lettera è usata come "variabile"?', options: ['Quando rappresenta un unico numero fisso da scoprire', 'Quando descrive una regola valida per valori diversi, non un unico numero da trovare', 'Quando è sempre uguale a zero', 'Quando si trova alla fine della frase'], correct: 1 }
  },
  {
    title: 'Incognita', type: 'microlesson', concept: 'incognita',
    situation: 'In un’equazione come x + 3 = 7, invece, la lettera non può assumere tanti valori diversi: c’è un solo numero che rende vera l’uguaglianza.',
    explain: 'Quando una lettera rappresenta un unico numero preciso da trovare per rendere vera un’uguaglianza, si chiama incognita (non più genericamente "variabile"). x + 3 = 7 è vera solo se x vale esattamente 4: qui x è un’incognita.',
    example: 'Variabile: "y = 2 × numero di biglietti" (y cambia a seconda di quanti biglietti compri: è una regola generale). Incognita: "2 × biglietti = 18" (c’è un solo numero di biglietti che rende vera l’uguaglianza: è un’incognita da trovare).',
    check: { q: 'Qual è la differenza principale tra variabile e incognita?', options: ['Nessuna, sono sempre sinonimi', 'La variabile descrive una regola per valori diversi; l’incognita è il numero preciso che rende vera una particolare uguaglianza', 'La variabile si usa solo in geometria', 'L’incognita è sempre negativa'], correct: 1 }
  },
  {
    title: 'Termine', type: 'microlesson', concept: 'termine',
    situation: 'Guarda l’espressione 3x + 5 − 2x: sembra complicata, ma è fatta di pezzi più piccoli, uniti dai simboli + e −.',
    explain: 'Un termine è ciascuno dei "pezzi" di un’espressione, separati da + o −. In 3x + 5 − 2x ci sono tre termini: 3x, +5, −2x. Ogni termine ha il proprio segno, anche quando non è scritto esplicitamente (il primo termine, se non ha segno davanti, è considerato positivo).',
    example: 'Nell’equazione 2x − 7 = x + 4, i termini sono: 2x e −7 (primo membro), x e +4 (secondo membro): quattro termini in totale.',
    check: { q: 'Quanti termini ci sono in 5x − 3 + 2x?', options: ['1', '2', '3', '4'], correct: 2 }
  },
  {
    title: 'Coefficiente', type: 'microlesson', concept: 'coefficiente',
    situation: 'Nel termine 5x, il numero 5 e la lettera x fanno parte dello stesso "pezzo", ma hanno ruoli diversi.',
    explain: 'Il coefficiente è il numero scritto davanti alla lettera in un termine: dice per quante volte va contata quella lettera. In 5x il coefficiente è 5. Se scrivo solo x, il coefficiente è 1 (sottinteso); se scrivo −x, il coefficiente è −1.',
    example: 'Nel termine −3x, il coefficiente è −3. Nel termine x, il coefficiente è 1. Nel termine 7 (senza lettera), non c’è un coefficiente: è un termine numerico puro.',
    check: { q: 'Qual è il coefficiente di x nel termine −x?', options: ['0', '1', '−1', 'Non esiste'], correct: 2 }
  },
  {
    title: 'Primo membro', type: 'microlesson', concept: 'primo_membro',
    situation: 'Un’equazione è divisa in due parti dal simbolo =, un po’ come una bilancia con due piatti.',
    explain: 'Tutto ciò che si trova a SINISTRA del simbolo = si chiama primo membro (o membro sinistro).',
    example: 'In 2x + 3 = 11, il primo membro è "2x + 3".',
    check: { q: 'Qual è il primo membro di 4x − 1 = 15?', options: ['4x − 1', '15', '=', '4x − 1 = 15'], correct: 0 }
  },
  {
    title: 'Secondo membro', type: 'microlesson', concept: 'secondo_membro',
    situation: '…e tutto ciò che si trova a DESTRA del simbolo = ha un nome altrettanto preciso.',
    explain: 'Tutto ciò che si trova a DESTRA del simbolo = si chiama secondo membro (o membro destro). Un’equazione è un’uguaglianza tra il valore del primo membro e il valore del secondo membro.',
    example: 'In 2x + 3 = 11, il secondo membro è "11". In 2x + 3 = x + 8, il secondo membro è "x + 8": anche il secondo membro può contenere l’incognita.',
    check: { q: 'Qual è il secondo membro di 3x = x + 10?', options: ['3x', 'x', 'x + 10', '10'], correct: 2 }
  },
  {
    title: 'Operazioni inverse', type: 'microlesson', concept: 'operazioni_inverse',
    situation: 'Per scoprire quanto vale x in x + 3 = 7, dobbiamo "liberarla" dal +3 che le sta accanto. Come si annulla un +3?',
    explain: 'Ogni operazione ha un’operazione inversa che la annulla: l’inversa di +3 è −3; l’inversa di −5 è +5; l’inversa di ×4 è ÷4; l’inversa di ÷2 è ×2. Per isolare l’incognita, si applica l’operazione inversa di ciò che le sta accanto.',
    example: 'In x + 3 = 7, per eliminare il "+3" accanto alla x applico l’operazione inversa: sottraggo 3. Nella prossima scheda vedrai perché questo va fatto su ENTRAMBI i membri, non solo su uno.',
    check: { q: 'Qual è l’operazione inversa di "×5"?', options: ['+5', '−5', '×5', '÷5'], correct: 3 }
  },
  {
    title: 'Il principio di equivalenza', type: 'microlesson', concept: 'principio_equivalenza',
    situation: 'Immagina una vera bilancia in equilibrio, con dei pesi su entrambi i piatti. Se aggiungi 2 kg SOLO a sinistra, cosa succede?',
    explain: 'Un’equazione è come una bilancia in equilibrio: i due membri hanno lo stesso valore. Se applichi un’operazione a un SOLO membro, l’equilibrio si rompe e l’equazione non è più vera. Se applichi la STESSA operazione a ENTRAMBI i membri, l’equilibrio resta: ottieni un’equazione equivalente, con la stessa soluzione.',
    example: 'x + 3 = 7. Sottraggo 3 da ENTRAMBI i membri: x + 3 − 3 = 7 − 3, cioè x = 4. È lo stesso identico principio della bilancia: quello che fai a sinistra, lo devi fare anche a destra.',
    check: { q: 'Perché x + 3 = 7 diventa x = 4 quando sottraggo 3?', options: ['Perché il 3 "cambia magicamente segno" quando attraversa l’uguale', 'Perché ho sottratto 3 da ENTRAMBI i membri, e questo mantiene l’uguaglianza vera', 'Perché x deve sempre essere positiva', 'Perché 7 − 3 fa sempre 4'], correct: 1 }
  }
];

/* ===================================================================
   2) TEORIA: riscrittura "Come si risolve" (Fase 3 / audit §3.1, top-20 #1)
   =================================================================== */
const OLD_TITLE = 'Come si risolve';
const idx = mod.theory.findIndex(s => s.title === OLD_TITLE);
if (idx === -1) throw new Error('Slide "Come si risolve" non trovata: struttura inattesa');
mod.theory[idx] = {
  title: 'Perché "cambi membro, cambi segno"',
  body: "Il principio di equivalenza dice: applica la STESSA operazione a entrambi i membri.\n\nEsempio: 2x + 3 = 11. Il termine “+3” è accanto alla x: applico l'operazione inversa, cioè sottraggo 3 da ENTRAMBI i membri:\n2x + 3 − 3 = 11 − 3\n2x = 8\n\nGuarda cosa è successo: il “+3” a sinistra è sparito, e a destra è comparso un “−3”. Da qui nasce la scorciatoia che userai spesso: “quando un termine passa all'altro membro, cambia segno”. Non è una regola magica: è solo il risultato visibile di aver sottratto lo stesso numero da entrambi i membri e aver semplificato. Ora che sai PERCHÉ funziona, puoi usarla per andare più veloce."
};
// Rinforza il collegamento nella slide precedente (principi di equivalenza),
// che ora arriva SUBITO DOPO le micro-lezioni sui prerequisiti.
const principiIdx = mod.theory.findIndex(s => s.title === 'I principi di equivalenza');
if (principiIdx !== -1) {
  mod.theory[principiIdx].body = "Ora formalizziamo quello che hai appena visto con la bilancia. Un'equazione resta vera (equivalente) se:\n\n1° principio: si somma o sottrae lo stesso numero a entrambi i membri.\n\n2° principio: si moltiplica o divide entrambi i membri per uno stesso numero diverso da zero.";
}

mod.theory = [...MICROLESSONS, ...mod.theory];

/* ===================================================================
   3) MODELLO SIMBOLICO + VERIFICA PROGRAMMATICA
   =================================================================== */
function solveModel(a, b, c, d) {
  let m = { a, b, c, d };
  let guard = 0;
  while (!EM.isSolved(m) && guard < 8) {
    const move = EM.correctMove(m);
    if (!move) break;
    m = EM.applyMove(m, move);
    guard++;
  }
  return m.d;
}
function attachModel(ex, a, b, c, d) {
  const solved = solveModel(a, b, c, d);
  if (ex.answer === undefined) {
    // esercizio nuovo (es. bilancia): la soluzione del modello DIVENTA la risposta.
    ex.answer = String(solved);
  } else {
    // esercizio esistente: verifica che il modello scritto a mano risolva
    // esattamente allo stesso valore già dichiarato in data.js (catch di
    // eventuali errori di trascrizione dei coefficienti a,b,c,d).
    const expected = parseFloat(String(ex.answer).replace(',', '.'));
    if (Number.isNaN(expected) || Math.abs(solved - expected) > 1e-9) {
      throw new Error(`Modello inconsistente per "${ex.q}": modello risolve x=${solved}, answer dichiarato=${ex.answer}`);
    }
  }
  ex.model = { a, b, c, d };
  ex.workedSolution = EM.solutionSteps({ a, b, c, d });
  return ex;
}

const HINTS = {
  isola_x: ['Isola la x applicando ad entrambi i membri l’operazione inversa di quella scritta accanto alla x.', 'Se vedi +b accanto alla x, sottrai b da entrambi i membri; se vedi ×a, dividi entrambi i membri per a.'],
  due_passaggi: ['Prima isola il termine con la x, poi trova il coefficiente.', 'Sposta prima il numero senza x nell’altro membro (operazione inversa su entrambi i membri), poi dividi per il coefficiente rimasto.'],
  ambo_membri: ['Il primo obiettivo è avere la x da un lato solo.', 'Sottrai da entrambi i membri il termine con la x più piccolo (ad es. se hai 2x a destra, sottrai 2x da entrambi i membri): sparirà da un lato e si sottrarrà dall’altro.'],
  parentesi: ['Prima di tutto, distribuisci il numero davanti alla parentesi su ogni termine dentro.', 'Dopo aver distribuito, procedi come per un’equazione con la x da entrambe le parti.'],
  problema: ['Rileggi la frase e individua qual è il numero sconosciuto: chiamalo x.', 'Traduci ogni pezzo della frase in un’operazione, poi risolvi l’equazione ottenuta come al solito.']
};
const COMMON_ERRORS = [
  { id: 'segno', when: 'signFlip', message: 'Hai trovato il numero giusto ma con il segno invertito: ricontrolla l’operazione inversa che hai applicato (l’inversa di +b è −b, non +b).' },
  { id: 'calcolo', when: 'smallSlip', message: 'Il procedimento sembra impostato bene, ma c’è un piccolo errore di calcolo in uno dei passaggi: ricontrolla le somme e le differenze.' }
];

function tag(ex, skill, level6, cognitiveType, hintKey) {
  ex.skill = skill;
  ex.level6 = level6;
  ex.cognitiveType = cognitiveType;
  if (hintKey) ex.hintSteps = HINTS[hintKey];
  return ex;
}

/* ---- FACILE: operazioni inverse singole ---- */
const facile = mod.exercises.facile;
function byQ(list, q) { const e = list.find(x => x.q === q); if (!e) throw new Error('Esercizio non trovato: ' + q); return e; }

attachModel(tag(byQ(facile, 'x + 7 = 12'), 'equazioni.isola_x_addizione', 1, 'apply', 'isola_x'), 1, 7, 0, 12);
attachModel(tag(byQ(facile, '5x = 55'), 'equazioni.isola_x_moltiplicazione', 1, 'apply', 'isola_x'), 5, 0, 0, 55);
attachModel(tag(byQ(facile, 'x − 1 = 6'), 'equazioni.isola_x_sottrazione', 1, 'apply', 'isola_x'), 1, -1, 0, 6);
attachModel(tag(byQ(facile, '2x = -18'), 'equazioni.isola_x_moltiplicazione', 1, 'apply', 'isola_x'), 2, 0, 0, -18);
attachModel(tag(byQ(facile, 'x − 8 = -11'), 'equazioni.isola_x_sottrazione', 1, 'apply', 'isola_x'), 1, -8, 0, -11);
attachModel(tag(byQ(facile, '7x = 28'), 'equazioni.isola_x_moltiplicazione', 1, 'apply', 'isola_x'), 7, 0, 0, 28);
attachModel(tag(byQ(facile, 'x − 3 = -8'), 'equazioni.isola_x_sottrazione', 1, 'apply', 'isola_x'), 1, -3, 0, -8);
attachModel(tag(byQ(facile, '9x = 54'), 'equazioni.isola_x_moltiplicazione', 1, 'apply', 'isola_x'), 9, 0, 0, 54);
attachModel(tag(byQ(facile, 'x + 9 = 7'), 'equazioni.isola_x_addizione', 1, 'apply', 'isola_x'), 1, 9, 0, 7);

attachModel(tag(byQ(facile, 'Un padre ha 40 anni, suo figlio 14. Tra quanti anni l\'età del padre sarà il doppio di quella del figlio?'), 'equazioni.problema_testuale', 5, 'integrate', 'problema'), 1, 40, 2, 28);
attachModel(tag(byQ(facile, 'Il triplo di un numero, diminuito di 4, fa 11. Qual è il numero?'), 'equazioni.problema_testuale', 5, 'integrate', 'problema'), 3, -4, 0, 11);

// Sposta il problema delle caramelle (Luca) da facile a medio: richiede
// impostare 3 relazioni contemporanee, cognitivamente più vicino al
// livello 3 che al livello 1 (AUDIT_DIDATTICO.md §4, top-20 #6).
const luca = byQ(facile, 'Alberto ha una caramella in più di Marco, che ne ha due in più di Luca. In totale hanno 59 caramelle. Quante ne ha Luca?');
attachModel(tag(luca, 'equazioni.problema_logico', 5, 'reason', 'problema'), 3, 5, 0, 59);
mod.exercises.facile = facile.filter(e => e !== luca);
mod.exercises.medio = [luca, ...mod.exercises.medio];

/* ---- MEDIO: due passaggi / x ambo i membri / parentesi ---- */
const medio = mod.exercises.medio;
attachModel(tag(byQ(medio, '7(x + 5) = -35'), 'equazioni.parentesi', 4, 'apply', 'parentesi'), 7, 35, 0, -35);
attachModel(tag(byQ(medio, '2x − 5 = 4x − 9'), 'equazioni.x_ambo_membri', 3, 'apply', 'ambo_membri'), 2, -5, 4, -9);
attachModel(tag(byQ(medio, '7x − 6 = 57'), 'equazioni.due_passaggi', 2, 'apply', 'due_passaggi'), 7, -6, 0, 57);
attachModel(tag(byQ(medio, '4x + 6 = 46'), 'equazioni.due_passaggi', 2, 'apply', 'due_passaggi'), 4, 6, 0, 46);
attachModel(tag(byQ(medio, '4(x + 2) = 4'), 'equazioni.parentesi', 4, 'apply', 'parentesi'), 4, 8, 0, 4);
attachModel(tag(byQ(medio, '8x + 8 = 88'), 'equazioni.due_passaggi', 2, 'apply', 'due_passaggi'), 8, 8, 0, 88);
attachModel(tag(byQ(medio, '4x − 2 = 22'), 'equazioni.due_passaggi', 2, 'apply', 'due_passaggi'), 4, -2, 0, 22);
attachModel(tag(byQ(medio, '3x − 2 = 5x + 8'), 'equazioni.x_ambo_membri', 3, 'apply', 'ambo_membri'), 3, -2, 5, 8);
attachModel(tag(byQ(medio, 'Un tour operator applica una tariffa di 50€ fissi più 8€ per ogni giorno di soggiorno. Un altro applica 30€ fissi più 12€ al giorno. Da quanti giorni di soggiorno i due tour operator costano esattamente uguale?'), 'equazioni.problema_testuale', 5, 'integrate', 'problema'), 8, 50, 12, 30);
attachModel(tag(byQ(medio, '5(x−3) = 2x + 6'), 'equazioni.parentesi', 4, 'apply', 'parentesi'), 5, -15, 2, 6);
tag(byQ(medio, 'Alberto ha una caramella in più di Marco, che ne ha due in più di Luca. In totale hanno 59 caramelle. Quante ne ha Alberto?'), 'equazioni.problema_logico', 5, 'reason', 'problema');
tag(byQ(medio, 'Matteo è nato nel 2000. Nel 2014 aveva 14 anni e la somma delle cifre di quell\'anno (2+0+1+4=7) era esattamente la metà della sua età. In quale altro anno la somma delle cifre dell\'anno sarà un terzo della sua età?'), 'equazioni.problema_logico', null, 'reason', 'problema');

/* ---- DIFFICILE: parentesi + x ambo i membri, problemi, logica ---- */
const difficile = mod.exercises.difficile;
attachModel(tag(byQ(difficile, '5(x − 2) − 4 = 2x − 38'), 'equazioni.parentesi_ambo_membri', 4, 'integrate', 'parentesi'), 5, -14, 2, -38);
attachModel(tag(byQ(difficile, '3(x − 1) + 4 = 4x + 9'), 'equazioni.parentesi_ambo_membri', 4, 'integrate', 'parentesi'), 3, 1, 4, 9);
attachModel(tag(byQ(difficile, '5(x + 2) − 7 = 2x − 6'), 'equazioni.parentesi_ambo_membri', 4, 'integrate', 'parentesi'), 5, 3, 2, -6);
attachModel(tag(byQ(difficile, '2(x − 1) + 6 = 5x − 14'), 'equazioni.parentesi_ambo_membri', 4, 'integrate', 'parentesi'), 2, 4, 5, -14);
attachModel(tag(byQ(difficile, '4(x + 6) − 4 = 3x + 21'), 'equazioni.parentesi_ambo_membri', 4, 'integrate', 'parentesi'), 4, 20, 3, 21);
attachModel(tag(byQ(difficile, '5(x − 5) + 1 = 3x − 18'), 'equazioni.parentesi_ambo_membri', 4, 'integrate', 'parentesi'), 5, -24, 3, -18);
attachModel(tag(byQ(difficile, '(x − 5) + 10 = 3x + 15'), 'equazioni.parentesi_ambo_membri', 4, 'integrate', 'parentesi'), 1, 5, 3, 15);
attachModel(tag(byQ(difficile, '3(x + 1) + 2 = 5x + 7'), 'equazioni.parentesi_ambo_membri', 4, 'integrate', 'parentesi'), 3, 5, 5, 7);
tag(byQ(difficile, 'Le età di tre sorelle sono tutte diverse. La media delle tre età è 10 anni. Prendendole a due a due: la media di una coppia è 11 anni e quella di un\'altra coppia è 12 anni. Quanti anni ha la sorella maggiore?'), 'equazioni.problema_logico', null, 'reason', 'problema');
tag(byQ(difficile, 'Con 6 fiammiferi, senza spezzarli, è possibile formare 4 triangoli equilateri identici. Come?'), 'logica.pensiero_laterale', null, 'reason', null);
attachModel(tag(byQ(difficile, 'In un\'agenzia viaggi, il prezzo di un tour è dato da 3 volte il numero di partecipanti più una quota fissa di 50€. Se il prezzo totale è stato 230€, quanti partecipanti c\'erano?'), 'equazioni.problema_testuale', 5, 'integrate', 'problema'), 3, 50, 0, 230);
tag(byQ(difficile, 'La somma di tre numeri interi consecutivi è 72. Qual è il più grande dei tre?'), 'equazioni.problema_testuale', 5, 'integrate', 'problema');

// Ogni esercizio con un modello simbolico riceve anche l'archivio di errori
// comuni riutilizzabile (Fase 6): segno invertito, piccolo errore di calcolo.
[...mod.exercises.facile, ...mod.exercises.medio, ...mod.exercises.difficile].forEach(ex => {
  if (ex.model) ex.commonErrors = COMMON_ERRORS;
});

/* ===================================================================
   4) NUOVI ESERCIZI INTERATTIVI (Fase 4)
   =================================================================== */

// --- Bilancia (format: 'balance') ---
function balanceExercise(q, a, b, c, d, level6, extra) {
  const ex = Object.assign({
    q, format: 'balance', skill: 'equazioni.bilancia', level6, cognitiveType: level6 >= 3 ? 'integrate' : 'apply',
    hint: 'Applica sempre la stessa operazione a entrambi i piatti della bilancia.',
    hintSteps: HINTS.isola_x
  }, extra || {});
  return attachModel(ex, a, b, c, d);
}
const balanceFacile = [
  balanceExercise('Risolvi con la bilancia: x + 4 = 9', 1, 4, 0, 9, 1),
  balanceExercise('Risolvi con la bilancia: 6x = 42', 6, 0, 0, 42, 1)
];
const balanceMedio = [
  balanceExercise('Risolvi con la bilancia: 3x + 2 = x + 10', 3, 2, 1, 10, 3),
  balanceExercise('Risolvi con la bilancia: 5x − 3 = 2x + 9', 5, -3, 2, 9, 3)
];
const balanceDifficile = [
  balanceExercise('2(x + 3) = x + 11', 2, 6, 1, 11, 4, { preStep: 'Distribuiamo prima il 2: 2x + 6 = x + 11', hintSteps: HINTS.parentesi })
];

// --- Riordina i passaggi (format: 'order') ---
const orderFacile = [{
  q: 'Riordina i passaggi per risolvere 4x − 3 = 9', format: 'order', answer: '3',
  skill: 'equazioni.riordina_passaggi', level6: 2, cognitiveType: 'apply',
  hint: 'Prima isola il termine con la x, poi trova il valore di x.', hintSteps: HINTS.due_passaggi,
  orderData: {
    steps: [
      { id: 's1', text: '4x − 3 = 9' },
      { id: 's2', text: '4x = 9 + 3' },
      { id: 's3', text: '4x = 12' },
      { id: 's4', text: 'x = 3' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4']
  }
}];
const orderMedio = [{
  q: 'Riordina i passaggi per risolvere 5x − 4 = 2x + 11', format: 'order', answer: '5',
  skill: 'equazioni.riordina_passaggi', level6: 3, cognitiveType: 'integrate',
  hint: 'Il primo passaggio deve avvicinare tutte le x da un lato solo.', hintSteps: HINTS.ambo_membri,
  orderData: {
    steps: [
      { id: 's1', text: '5x − 4 = 2x + 11' },
      { id: 's2', text: '5x − 2x = 11 + 4' },
      { id: 's3', text: '3x = 15' },
      { id: 's4', text: 'x = 5' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4']
  }
}];
const orderDifficile = [{
  q: 'Riordina i passaggi per risolvere 3(x − 2) = x + 4', format: 'order', answer: '5',
  skill: 'equazioni.riordina_passaggi', level6: 4, cognitiveType: 'integrate',
  hint: 'Il primo passaggio è sempre distribuire il numero davanti alla parentesi.', hintSteps: HINTS.parentesi,
  orderData: {
    steps: [
      { id: 's1', text: '3(x − 2) = x + 4' },
      { id: 's2', text: '3x − 6 = x + 4' },
      { id: 's3', text: '3x − x = 4 + 6' },
      { id: 's4', text: '2x = 10' },
      { id: 's5', text: 'x = 5' }
    ],
    correctOrder: ['s1', 's2', 's3', 's4', 's5']
  }
}];

// --- Raggruppa i termini simili (format: 'group') ---
function groupExercise(q, level6, terms) {
  return {
    q, format: 'group', skill: 'equazioni.raggruppa_termini', level6, cognitiveType: 'recognize',
    hint: 'Separa i termini che contengono la x da quelli che sono solo numeri.',
    hintSteps: ['Guarda ogni termine uno alla volta: contiene una x oppure no?', 'I termini con la x vanno insieme, i termini numerici vanno insieme: il segno di ogni termine resta suo.'],
    groupData: {
      buckets: [{ key: 'x', label: 'Termini con la x' }, { key: 'num', label: 'Termini numerici' }],
      terms
    }
  };
}
const groupFacile = [
  groupExercise('Raggruppa i termini simili di: 5x + 3 − 2x + 7', 1, [
    { id: 't1', label: '5x', group: 'x' }, { id: 't2', label: '+3', group: 'num' },
    { id: 't3', label: '−2x', group: 'x' }, { id: 't4', label: '+7', group: 'num' }
  ]),
  groupExercise('Raggruppa i termini simili di: 4x − 6 − x + 2', 1, [
    { id: 't1', label: '4x', group: 'x' }, { id: 't2', label: '−6', group: 'num' },
    { id: 't3', label: '−x', group: 'x' }, { id: 't4', label: '+2', group: 'num' }
  ])
];
const groupMedio = [
  groupExercise('Raggruppa i termini simili di: 6x + 5 − 2x − 9 + x', 2, [
    { id: 't1', label: '6x', group: 'x' }, { id: 't2', label: '+5', group: 'num' },
    { id: 't3', label: '−2x', group: 'x' }, { id: 't4', label: '−9', group: 'num' },
    { id: 't5', label: '+x', group: 'x' }
  ])
];

// --- Costruisci l'equazione da una frase (format: 'build') ---
function buildExercise(sentence, level6, blocks, correctSequence, answer) {
  return {
    q: sentence, format: 'build', answer, skill: 'equazioni.costruisci_equazione', level6, cognitiveType: 'integrate',
    hint: 'Traduci un pezzo alla volta: "il triplo di un numero" è 3x, "diminuito di 4" è −4, "è uguale a" è =.',
    hintSteps: HINTS.problema,
    buildData: { sentence, blocks, correctSequence }
  };
}
const buildFacile = [
  buildExercise('Il triplo di un numero aumentato di 2 è uguale a 17.', 5,
    [{ id: '3x', label: '3x' }, { id: '+2', label: '+2' }, { id: '=', label: '=' }, { id: '17', label: '17' }, { id: 'd1', label: '−2' }, { id: 'd2', label: '15' }],
    ['3x', '+2', '=', '17'], '5'),
  buildExercise('Un numero diminuito di 5 è uguale a 12.', 5,
    [{ id: 'x', label: 'x' }, { id: '-5', label: '−5' }, { id: '=', label: '=' }, { id: '12', label: '12' }, { id: 'd1', label: '+5' }, { id: 'd2', label: '5x' }],
    ['x', '-5', '=', '12'], '17')
];
const buildMedio = [
  buildExercise('Il doppio di un numero, diminuito di 7, è uguale al numero aumentato di 3.', 5,
    [{ id: '2x', label: '2x' }, { id: '-7', label: '−7' }, { id: '=', label: '=' }, { id: 'x', label: 'x' }, { id: '+3', label: '+3' }, { id: 'd1', label: '+7' }, { id: 'd2', label: '3x' }],
    ['2x', '-7', '=', 'x', '+3'], '10')
];
const buildDifficile = [
  buildExercise('In un hotel il numero di camere occupate è il triplo di quelle libere. In totale ci sono 48 camere. Quante sono le camere libere?', 5,
    [{ id: '3x', label: '3x' }, { id: '+x', label: '+x' }, { id: '=', label: '=' }, { id: '48', label: '48' }, { id: 'd1', label: '−x' }, { id: 'd2', label: '24' }],
    ['3x', '+x', '=', '48'], '12')
];

// --- Caccia all'errore (format: 'error-detect') ---
function errorExercise(q, level6, steps, errorIndex, explanation) {
  return {
    q, format: 'error-detect', skill: 'equazioni.caccia_errore', level6, cognitiveType: 'diagnose',
    hint: 'Ricontrolla ogni passaggio confrontandolo con quello precedente: cosa è stato applicato a entrambi i membri?',
    hintSteps: ['Confronta due righe consecutive alla volta: cosa è cambiato?', 'Chiediti se l’operazione applicata è davvero l’inversa corretta, se è stata applicata a entrambi i membri e se il calcolo è giusto.'],
    errorData: { steps, errorIndex, explanation }
  };
}
const errorDifficile = [
  errorExercise('Trova l\'errore nella risoluzione di 2x − 5 = 3', 6,
    [{ text: '2x − 5 = 3' }, { text: '2x = 3 − 5' }, { text: '2x = −2' }, { text: 'x = −1' }],
    1, 'L\'operazione inversa di "−5" è "+5", non "−5". Il passaggio corretto è: 2x = 3 + 5 = 8, quindi x = 4.'),
  errorExercise('Trova l\'errore nella risoluzione di x + 6 = 14', 6,
    [{ text: 'x + 6 = 14' }, { text: 'x + 6 − 6 = 14' }, { text: 'x = 14' }],
    1, 'Il −6 è stato applicato solo al primo membro. Va sottratto da ENTRAMBI: x + 6 − 6 = 14 − 6, quindi x = 8.'),
  errorExercise('Trova l\'errore nella risoluzione di 3x + 5 = 20', 6,
    [{ text: '3x + 5 = 20' }, { text: '3x = 20 − 5' }, { text: '3x = 16' }, { text: 'x = 16/3' }],
    2, '20 − 5 fa 15, non 16: è un errore di calcolo. Il passaggio corretto è 3x = 15, quindi x = 5.'),
  errorExercise('Trova l\'errore nella risoluzione di 5x − 3 = 2x + 9', 6,
    [{ text: '5x − 3 = 2x + 9' }, { text: '5x − 2x = 9 + 3' }, { text: '5x = 12' }, { text: 'x = 12/5' }],
    2, '5x − 2x fa 3x, non 5x: il termine con la x non è stato semplificato. Il passaggio corretto è 3x = 12, quindi x = 4.'),
  errorExercise('Trova l\'errore nella risoluzione di 6x − 9 = 21', 6,
    [{ text: '6x − 9 = 21' }, { text: '6x = 21 + 7' }, { text: '6x = 28' }, { text: 'x = 14/3' }],
    1, 'Nell\'equazione di partenza il numero è 9, non 7: è stato ricopiato male. Il passaggio corretto è 6x = 21 + 9 = 30, quindi x = 5.')
];

mod.exercises.facile = [...mod.exercises.facile, ...balanceFacile, ...orderFacile, ...groupFacile, ...buildFacile];
mod.exercises.medio = [...mod.exercises.medio, ...balanceMedio, ...orderMedio, ...groupMedio, ...buildMedio];
mod.exercises.difficile = [...mod.exercises.difficile, ...balanceDifficile, ...orderDifficile, ...buildDifficile, ...errorDifficile];

process.stdout.write('const MODULES = ' + JSON.stringify(MODULES, null, 2) + ';\n');
