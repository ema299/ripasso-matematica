# EQUAZIONI V2 — FASE 1 del task "modulo di riferimento"

> Consegna secondo la Fase 10 del task. Fonte: `PIANO_SVILUPPO_V2.md`, `HELP_SYSTEM_V2.md`, `CLAUDE.md`, `docs/AUDIT_DIDATTICO.md`. Ambito: **solo il modulo `equazioni`**; gli altri 5 moduli non sono stati toccati (verificato programmaticamente, vedi §4).

## 1. Cosa è cambiato, in una frase

Il modulo equazioni non presuppone più che la studentessa sappia cosa sono x, incognita, membro, coefficiente; insegna il principio della bilancia prima della scorciatoia "cambia segno"; offre 5 modalità di interazione oltre a input/scelta multipla; ha una scala di aiuto a 7 livelli (0-6, incluso l'esercizio gemello) invece di un hint statico unico; e diagnostica almeno un errore comune (segno invertito) invece di limitarsi a mostrare la risposta corretta.

## 2. File modificati o creati

| File | Tipo | Motivazione |
|---|---|---|
| `interactions.js` | **nuovo** | Componenti riutilizzabili (bilancia, riordina, raggruppa, costruisci, caccia-errore) + modello simbolico `EquationModel` di un'equazione lineare `ax+b=cx+d`. Nessuna dipendenza da `app.js`: riceve tutto nei parametri, per restare testabile e riusabile da altri moduli in futuro (PIANO §5-6). |
| `help-engine.js` | **nuovo** | Scala di aiuto a 7 livelli, diagnosi errori comuni, generatore di esercizi gemelli (livello 6). Attivo solo su esercizi che dichiarano `hintSteps` (campo opzionale): gli altri moduli, che non lo dichiarano, si comportano esattamente come in V1. |
| `data.js` | modificato | **Solo** `MODULES.find(m=>m.id==='equazioni')` è cambiato: 9 micro-lezioni prerequisiti anteposte alla teoria, 1 slide riscritta ("Come si risolve" → derivazione dalla bilancia), 36 esercizi esistenti taggati con metadati opzionali (`skill`, `level6`, `cognitiveType`, `model`, `hintSteps`, `workedSolution`, `commonErrors`), 1 esercizio spostato da facile a medio, 20 nuovi esercizi nei 5 nuovi formati. Gli altri 5 moduli sono bit-per-bit identici (assertion automatica in `scripts/verify_equazioni_v2.js`). |
| `app.js` | modificato | Stato esteso (`exHelpLevel`, `exTwin`, `interaction`, `exErrorDiagnosis`, `theoryChecks`), nuovo renderer per le slide `microlesson`, nuovo dispatcher generico verso `Interactions.<formato>`, sostituito l'hint booleano con la scala a livelli, aggiunta diagnosi errori nel percorso di correzione. Ogni nuovo ramo è condizionato all'esistenza dei nuovi campi opzionali: gli esercizi degli altri moduli, privi di quei campi, attraversano lo stesso codice di prima con lo stesso identico output. |
| `styles.css` | modificato | Stili per: micro-lezioni, bilancia (piatti/chip/animazione), caccia-errore, riordina, raggruppa, costruisci-equazione, badge "gemello", pre-step testuale, stato `:disabled` dei pulsanti azione (mancava). Nessuna regola esistente rimossa o rinominata. |
| `index.html` | modificato | Aggiunti i due nuovi `<script>` (`interactions.js`, `help-engine.js`) prima di `app.js`. |
| `sw.js` | modificato | `CACHE_NAME` da `v3` a `v4` (regola obbligatoria da `CLAUDE.md` quando cambia un asset cacheato) + i 2 nuovi file nella lista `CORE_ASSETS`. |
| `scripts/build_equazioni_v2.js` | **nuovo** | Script di trasformazione one-off (pattern già usato da `scripts/add_worked_steps.js`): carica `data.js` via `vm`, muta solo il modulo equazioni, verifica ogni modello simbolico contro la risposta già dichiarata (o lo usa per derivarla per gli esercizi nuovi), re-serializza. Non è pensato per essere rieseguito (idempotente solo alla prima applicazione: se rilanciato su un `data.js` già trasformato, i `byQ(...)` non troverebbero più le stringhe originali e fallirebbe rumorosamente — comportamento voluto, non un bug). |
| `scripts/verify_equazioni_v2.js` | **nuovo** | Gate di non-regressione, pensato per restare nel repo e essere riusato: replica `checkAnswer`/`normalizeNumber`/`normalizeExpr` da `app.js`, valida strutturalmente i 5 nuovi formati, e verifica che tutti i moduli diversi da `equazioni` restino identici. |
| `docs/EQUAZIONI_V2_FASE1.md` | **nuovo** | Questo documento. |

## 3. Cosa copre ciascuna fase del task

- **Fase 2 (prerequisiti):** 9 micro-lezioni (x, variabile, incognita, termine, coefficiente, primo/secondo membro, operazioni inverse, principio di equivalenza), ciascuna con situazione concreta, spiegazione, esempio, mini-verifica non punitiva (la navigazione non è mai bloccata dall'esito).
- **Fase 3 (bilancia):** componente `balance` con modello simbolico generico (funziona per qualunque `ax+b=cx+d` a coefficienti interi, non solo per gli esempi scritti a mano); a ogni passo propone 3 opzioni: la mossa corretta, una mossa che mantiene l'equilibrio ma non aiuta (segno invertito), e la stessa mossa applicata a un solo piatto (che sbilancia visivamente la bilancia). La scorciatoia "cambia segno" resta insegnata, ma solo dopo, e dichiarata esplicitamente come conseguenza — non più come prima spiegazione (correzione diretta dell'item #1 dei top-20 dell'audit).
- **Fase 4 (interazioni):** 5 componenti, tutti tap-only (nessun drag nativo, per l'accessibilità touch su iPhone richiesta da PIANO §13): bilancia, riordina passaggi (frecce su/giù), raggruppa termini simili (tap termine poi tap gruppo), costruisci l'equazione da una frase, caccia all'errore.
- **Fase 5 (aiuto):** livelli 0-6 come da `HELP_SYSTEM_V2.md`; il livello 6 (gemello) è generato proceduralmente per ogni esercizio con modello simbolico (33 dei 36 esercizi originali + tutti i nuovi `balance`), non solo per gli esercizi nuovi.
- **Fase 6 (errori comuni):** 2 pattern rilevabili automaticamente da una risposta numerica finale (segno invertito, piccolo errore di calcolo) collegati a 33 esercizi; più 5 esercizi dedicati di tipo `error-detect` che coprono anche gli altri 3 pattern richiesti dal task (un solo membro, mancata semplificazione, trascrizione) — questi ultimi due non sono rilevabili da una risposta numerica isolata, servono passaggi espliciti da ispezionare (vedi limiti, §6).
- **Fase 7 (difficoltà):** tassonomia interna a 6 livelli (riconoscimento/operazioni elementari → equazioni semplici → x ambo i membri → parentesi → problemi testuali → caccia all'errore), mappata sulle 3 tab facile/medio/difficile esistenti (decisione presa con l'utente prima di scrivere codice, per non rompere lo storage/UI condivisi con gli altri moduli).

## 4. Test eseguiti

1. `node --check` su tutti i file JS (`app.js`, `data.js`, `interactions.js`, `help-engine.js`, `sw.js`, i 2 script nuovi).
2. `scripts/verify_equazioni_v2.js`: self-consistency estesa (pattern di `CLAUDE.md`, replica `checkAnswer`) + validazione strutturale dei 5 nuovi formati + assert che `numeri`/`frazioni`/`potenze`/`algebra`/`geometria` siano rimasti `JSON.stringify`-identici. **0 fallimenti.** Ha anche scoperto — e permesso di distinguere da un difetto reale — un bug pre-esistente e indipendente nel modulo `algebra` (vedi §7).
3. E2E su Chrome headless reale (pattern CDP di `CLAUDE.md`, script in `/tmp/.../scratchpad/e2e.js`, non incluso nel repo perché usa un path di scratchpad locale): 19 asserzioni su comportamento V1 invariato (`numeri`), micro-lezioni, bilancia (mossa corretta + entrambe le trappole), riordina, raggruppa, costruisci, caccia-errore, scala di aiuto fino al gemello, diagnosi errore di segno. **19/19 passate** dopo aver corretto 2 bug reali trovati proprio da questi test (vedi §7) e 3 difetti nello script di test stesso.
4. Ispezione visiva via screenshot (viewport 390×844, iPhone-size) di: micro-lezione, bilancia, caccia-errore, costruisci-equazione.

## 5. Bug reali trovati e corretti durante lo sviluppo

- **`HelpEngine.generateTwin` non copiava `commonErrors`** sull'esercizio gemello: la diagnosi errori spariva silenziosamente per qualunque tentativo fallito su un gemello. Corretto.
- **`Interactions.errorDetect.check` non replicava `correct` dentro `ist`** (lo restituiva solo a livello di risultato dell'azione): il rendering non ne risentiva (ricalcola da `ist.selected`), ma qualunque altro consumatore futuro di `state.interaction.correct` avrebbe letto `undefined`. Corretto per coerenza con gli altri 3 componenti.
- **`attachModel` nello script di build non impostava `answer` quando assente** e il confronto `Math.abs(NaN) > 1e-9` è sempre `false` in JS: la "verifica automatica" sui nuovi esercizi bilancia non verificava nulla. Corretto: ora deriva `answer` dal modello quando assente, e verifica quando già presente.
- **Bug pre-esistente, indipendente, nel modulo `algebra`** (fuori ambito, non toccato): il mio script di verifica iniziale segnalava 2 falsi negativi su esercizi `type:'expr'`; indagando è emerso che era un difetto del *mio* test (passava l'intero array `answer` a `checkAnswer` invece di ogni variante), non dei dati — corretto lo script, `algebra` risulta corretto.

## 6. Limiti noti / cosa NON è stato fatto

- La diagnosi automatica su risposta numerica copre solo 2 dei 5 pattern di errore richiesti dalla Fase 6 (segno invertito, calcolo); "un solo membro", "mancata semplificazione", "trascrizione" sono coperti solo esperienzialmente (trappole della bilancia) o nei 5 esercizi dedicati `error-detect`, perché una risposta numerica finale isolata non porta abbastanza informazione per distinguerli con certezza.
- Il generatore di gemelli (livello 6) copre solo equazioni lineari con modello simbolico; per i 3 problemi puramente logici (caramelle-Alberto, Matteo/2000, tre sorelle) e per il rompicapo dei fiammiferi non esiste un gemello automatico — è una scelta esplicita (evitare un generatore di problemi testuali arbitrario, fuori scope), non un difetto dimenticato.
- La banca di esercizi interattivi è volutamente piccola (20 nuovi esercizi, non centinaia): PIANO §8 vieta esplicitamente di gonfiare il conteggio; ogni nuovo esercizio rappresenta una skill/livello distinto, non una variante cosmetica.
- Il mastery-per-skill e la sessione "Cosa faccio oggi?" (FASE 5 del piano generale) non sono stati implementati: erano esplicitamente fuori dal perimetro di questo task ("SOLO il modulo equazioni", niente tutor adattivo).

## 7. Rischi

- **Crescita di `app.js`** (+192 righe): resta sotto una soglia ragionevole perché la logica pesante è stata spostata in `interactions.js`/`help-engine.js`; se altri moduli adotteranno lo stesso modello, `app.js` resterà stabile (il dispatcher è già generico per formato).
- **Contenuto quantitativamente concentrato**: gli 8 esercizi "parentesi + x ambo i membri" del livello difficile (già presenti in V1, solo ritaggati) restano sovra-rappresentati rispetto ad altre skill, come già segnalato dall'audit — non corretto in questa fase per rispettare "nessun grande refactoring non necessario".
- **`scripts/build_equazioni_v2.js` non è rieseguibile** sullo stato attuale di `data.js` (i `byQ(...)` cercano stringhe della V1 originale). Va trattato come uno script storico, non come parte della pipeline di build corrente — coerente con `add_worked_steps.js`, già presente con lo stesso limite.

## 8. Attività successive consigliate

1. Estendere lo stesso modello (`interactions.js`/`help-engine.js` + schema dati additivo) agli altri moduli, a partire da `algebra` (raggruppa termini, costruisci-espressione sono già riusabili senza modifiche) e `frazioni` (frazioni visuali, PIANO §5.5, richiede un nuovo componente ma stesso pattern).
2. Aggiungere i pattern di diagnosi mancanti ("un solo membro", "mancata semplificazione", "trascrizione") come classificatori euristici sui passaggi intermedi, quando un formato li rende ispezionabili (es. in una futura vista "mostra il tuo procedimento").
3. Valutare se aumentare la copertura di esercizi `error-detect`/`order`/`group`/`build` per le skill sotto-rappresentate segnalate dall'audit (distributiva doppia con segno), riusando gli stessi generatori.
4. Considerare il riordino dei moduli proposto dall'audit (`numeri → potenze → algebra → equazioni → frazioni → geometria`) prima di estendere il tutor adattivo, per non costruire mastery su una sequenza di prerequisiti nota per essere sbagliata.
