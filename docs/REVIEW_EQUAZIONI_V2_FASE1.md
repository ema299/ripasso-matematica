# REVIEW INDIPENDENTE — Equazioni V2, Fase 1

> Review tecnica e didattica del commit `6259ea73719ede662791c10b4368202260ef53bf` ("feat(equations): implement guided interactive V2 learning flow"). Obiettivo: stabilire se questo modulo può diventare il modello architetturale/didattico da generalizzare agli altri 5 moduli. Nessun file di codice è stato modificato per produrre questa review. Metodo: lettura integrale di `CLAUDE.md`, `PIANO_SVILUPPO_V2.md`, `HELP_SYSTEM_V2.md`, `docs/AUDIT_DIDATTICO.md`, `docs/EQUAZIONI_V2_FASE1.md` (trattato come autodichiarazione dell'implementatore, non come fonte di verità — ogni sua affermazione rilevante è stata riverificata sul codice/dati reali); lettura integrale di `app.js`, `interactions.js`, `help-engine.js`, `scripts/build_equazioni_v2.js`; estrazione ed esame del modulo `equazioni` live da `data.js` (15 slide di teoria, 56 esercizi, 10 quiz); due sotto-review indipendenti in parallelo (didattica+help-system; interazioni+UX/accessibilità) i cui finding più consequenziali sono stati riverificati direttamente riproducendo l'output del codice, non solo accettati.

---

## 1. Review didattica

### Punti di forza reali (non finding, ma evidenza necessaria per un giudizio bilanciato)

- La slide "Come si risolve" è stata riscritta in modo genuinamente derivativo, non cosmetico: *"Guarda cosa è successo: il '+3' a sinistra è sparito, e a destra è comparso un '−3'... Non è una regola magica: è solo il risultato visibile di aver sottratto lo stesso numero da entrambi i membri."* Corregge realmente il problema #1 dell'audit.
- La distinzione variabile/incognita è costruita con esempi paralleli e contrastivi genuinamente efficaci ("y = 2×biglietti" vs "2×biglietti = 18"), con opzioni di verifica che attaccano esplicitamente il fraintendimento più comune.
- Le mini-verifiche delle micro-lezioni sono contenutisticamente ben scritte, non decorative: es. l'opzione errata sul principio di equivalenza è letteralmente il fraintendimento vietato da `PIANO_SVILUPPO_V2.md` §10 ("il 3 cambia magicamente segno").
- Nessun esempio matematicamente scorretto è stato trovato in teoria o negli esercizi (coerente con l'assenza di errori aritmetici già verificata nel commit stesso).

### Finding

**D1 — [HIGH] Prerequisito citato prima di essere definito, nello stesso punto che questo lavoro doveva correggere.**
La micro-lezione "Termine" (slide 3) recita: *"Nell'equazione 2x − 7 = x + 4, i termini sono: 2x e −7 (**primo membro**), x e +4 (**secondo membro**)"* — ma "primo membro" e "secondo membro" vengono definiti solo alle slide 5 e 6, due-tre schede dopo. Verificato direttamente su `data.js` (`eq.theory[3].example`, confronto con `eq.theory[5].title`/`eq.theory[6].title`).
*Conseguenza:* una studentessa che legge le schede in ordine incontra un termine tecnico non ancora spiegato, esattamente la categoria di problema (prerequisito implicito) che l'intera Fase 2 doveva eliminare.
*Correzione raccomandata:* nella slide "Termine", sostituire "(primo membro)"/"(secondo membro)" con una formulazione neutra ("a sinistra dell'uguale"/"a destra dell'uguale"), oppure spostare la slide dopo le due sui membri.

**D2 — [HIGH] L'ordine reale degli esercizi inverte l'ordine pedagogico stabilito dalla teoria.**
Verificato direttamente: in **tutti e tre** i livelli, gli esercizi con `format:'balance'` sono in coda all'array, dopo 11-13 esercizi numerici che richiedono già la scorciatoia "isola la x":
```
facile:    11× numeric, poi balance, balance, order, group, group, build, build
medio:     13× numeric, poi balance, balance, order, group, build
difficile: 12× numeric, poi balance, order, build, error-detect×5
```
*Conseguenza:* la teoria insegna correttamente bilancia→scorciatoia, ma la banca esercizi fa esercitare la scorciatoia 11-13 volte per livello *prima* che la studentessa tocchi mai l'interazione pensata per giustificarla. È l'inversione esatta del criterio di successo dichiarato nel piano ("una studentessa che non conosce la regola del cambio di segno deve poter capire perché la trasformazione è lecita senza memorizzare una formula arbitraria") — con questo ordinamento, la scorciatoia viene automatizzata per ripetizione ben prima che la bilancia possa svolgere il suo ruolo.
*Correzione raccomandata:* per il livello facile in particolare, anteporre almeno le 2 bilance ai numerici puri, o intercalarle nelle prime posizioni.

**D3 — [MEDIUM] Le micro-verifiche non bloccano la navigazione: "swipe veloce" resta possibile.**
`renderTheory` non disabilita mai `prev-slide`/`next-slide` in base a `state.theoryChecks`; `theory-done` chiama solo `markTheorySeen()`. `PIANO_SVILUPPO_V2.md` §4 è esplicito: *"La studentessa non deve poter semplicemente fare swipe veloce e risultare 'teoria vista'."* Meccanicamente, può ancora farlo — le verifiche sono presenti ma facoltative.
*Correzione raccomandata:* non necessariamente bloccare (rischio di frustrazione), ma quantomeno tracciare quante micro-verifiche sono state saltate e mostrarlo nel Diario, o richiedere risposta prima di abilitare "next" solo sulle micro-lezioni (non sulle steps-card esistenti, che restano volutamente più leggere).

**D4 — [MEDIUM] Hint copiato e sbagliato su tutti e 4 gli esercizi "costruisci l'equazione".**
Verificato letteralmente: tutti e 4 gli esercizi `format:'build'` condividono la stessa stringa hint `"Traduci un pezzo alla volta: \"il triplo di un numero\" è 3x, \"diminuito di 4\" è −4, \"è uguale a\" è =."` — ma **nessuna delle 4 frasi contiene "diminuito di 4"** (le frasi reali dicono "aumentato di 2", "diminuito di 5", "diminuito di 7", il problema delle camere d'hotel). Anche il primo esercizio, il più vicino concettualmente, non contiene quel testo.
*Conseguenza:* una studentessa che chiede aiuto viene istruita a cercare un pezzo di frase che non esiste nel problema che ha davanti.
*Correzione raccomandata:* generare l'hint dinamicamente dalla frase reale, o quantomeno scrivere 4 hint distinti.

**D5 — [LOW-MEDIUM] Ridondanza reale tra due slide consecutive.**
La micro-lezione 9 ("Il principio di equivalenza") e la slide legacy immediatamente successiva ("I principi di equivalenza") reinsegnano la stessa idea; la seconda è esplicitamente presentata come formalizzazione della prima ("Ora formalizziamo quello che hai appena visto"), quindi non è duplicazione pura, ma con 15 slide totali (9 nuove + 6 esistenti) il rischio di monotonia che `PIANO_SVILUPPO_V2.md` §2.1 segnala esplicitamente non è stato eliminato, solo spostato più avanti nel mazzo.

**D6 — [LOW-MEDIUM] Prerequisiti impliciti non ancora chiusi (pre-esistenti, non introdotti da questo commit, ma non risolti).**
La distributiva (usata in 8/20 esercizi difficile e nell'esempio svolto) resta insegnata solo nel modulo `algebra`, dove l'audit aveva già segnalato una sola occorrenza su 36 esercizi. La "verifica della soluzione" resta dimostrata solo in teoria, zero esercizi dedicati sui 56 — stessa lacuna già rilevata su V1.

### Risposta alle domande esplicite

- *Quantità di teoria eccessiva? "Troppe slide" sostituite da "ancora più slide"?* In parte sì: 15 slide è molto per un mazzo swipeabile, ma il contenuto nuovo è genuinamente diverso in formato (situazione+esempio+verifica, non solo prosa), quindi non è la stessa monotonia di prima — è un rischio nuovo e più lieve, non l'assenza di rischio.
- *Salti di difficoltà / studentessa debole si perde?* Il salto più concreto è D2: chi non ha interiorizzato bene le prime micro-lezioni arriva agli esercizi bilancia (l'attività pensata apposta per lei) solo dopo aver già macinato 11+ esercizi con la scorciatoia — il momento in cui ne avrebbe più beneficio è already passato.
- *Studentessa forte annoiata?* 9 micro-lezioni con verifica ciascuna, per concetti che una studentessa già solida su x/incognita/coefficiente conosce, senza alcuna via di skip — rischio concreto ma minore, dato che le card sono brevi.

---

## 2. Review sistema di aiuto (scala 0-6)

### Finding

**H1 — [HIGH] La scala è nominalmente 0-6 ma nella pratica collassa alla soluzione completa 1-2 livelli prima del previsto.**
Verificato eseguendo `HelpEngine.getHelpContent` sui dati reali:
- `x + 7 = 12` (1 passaggio): livello 3 mostra già `"x = 5"` per intero. Livelli 4, 5, 6 sono ridondanti tra loro.
- `7x − 6 = 57` (2 passaggi): livello 4 mostra già `"x = 9"` per intero.

Per la maggioranza degli esercizi facile (a un solo passaggio), la "soluzione completa" (nominalmente livello 5, per `HELP_SYSTEM_V2.md`) arriva di fatto al livello 3. Questo non è un bug di calcolo — è una conseguenza diretta di come `getHelpContent` mappa `workedSolution.slice(...)` su array corti — ma contraddice lo spirito esplicito del documento guida: *"wrong -> understand -> repair -> verify -> continue"*, non *"wrong -> reveal answer subito dopo un indizio -> continue"*.
*Correzione raccomandata:* per gli esercizi a 1-2 passaggi, comprimere onestamente la scala dichiarata (es. non offrire livelli 4-5 distinti se producono lo stesso contenuto) oppure intercalare un livello "spiega perché, non solo cosa" prima del passaggio numerico.

**H2 — [HIGH] La regola di regressione di `HELP_SYSTEM_V2.md` non è implementata da nessuna parte.**
Verificato per lettura diretta di `app.js`/`help-engine.js`: `openExercises()` sceglie il livello con `LEVELS.find(l => !p.exercises[l])` (un booleano di completamento); `exerciseNext()` marca `p.exercises[state.exLevel] = true` incondizionatamente al raggiungimento della fine dell'array, indipendentemente da quante risposte siano state sbagliate. Nessun codice in tutto il commit abbassa la difficoltà, ripropone un esercizio più semplice o forza una micro-lezione dopo errori ripetuti. La regola è dichiarata esplicitamente obbligatoria in `HELP_SYSTEM_V2.md` ("se lo studente sbaglia ripetutamente: fermare la progressione..."), ed è citata come lacuna nota anche dal report dell'implementatore — qui viene confermato che non esiste in nessuna forma, nemmeno parziale.
*Correzione raccomandata:* anche una versione minima (es. contatore di errori consecutivi per skill nella sessione corrente; oltre soglia, forzare un `request-twin` automatico o mostrare un banner con link alla micro-lezione pertinente) chiuderebbe il gap più visibile rispetto al documento guida.

**H3 — [HIGH] L'esercizio gemello (livello 6) non verifica nulla: si può fallire e proseguire comunque.**
Verificato: `requestTwin()` non tocca `exIndex`; dopo la risposta al gemello (giusta o sbagliata), l'unica azione mostrata è "Avanti →" → `exerciseNext()`, che avanza incondizionatamente e cancella `exTwin` via `resetExerciseUIState()`. Non esiste alcun ramo che ripeta il gemello, ne offra un secondo, o blocchi l'avanzamento se `exLastCorrect` è falso sul gemello. Il passo "verify" di *"wrong -> understand -> repair -> verify -> continue"* esiste come schermata ma il suo esito non viene mai controllato prima di consentire "continue".
*Correzione raccomandata:* se il gemello viene sbagliato, non mostrare "Avanti" ma "Riprova" (nuovo gemello) o quantomeno un messaggio esplicito prima di lasciar proseguire.

**H4 — [MEDIUM] Il gomito più debole della scala di aiuto è esattamente sui formati più nuovi.**
Verificato: gli esercizi `order`/`group`/`build`/`error-detect` hanno `hintSteps` ma non `model` né `workedSolution` (solo i 5 `balance` e i 31 esercizi numerici originali li hanno) → `helpMaxLevelFor` restituisce `min(6, 2) = 2` per tutti loro: solo indizio leggero + richiamo della regola, mai un passaggio guidato, mai un gemello. Stesso limite per i 5 esercizi puramente logici (`Alberto/Marco/Luca`, `Matteo 2000`, `tre sorelle`) che non hanno modello simbolico. Il risultato è che l'aiuto più ricco è disponibile proprio dove serve meno (esercizi numerici di routine) e più povero dove l'interazione è nuova e la studentessa più probabilmente si blocca.

**H5 — [MEDIUM] L'euristica `smallSlip` ha un falso positivo concreto e riproducibile.**
`smallSlip: (u,c) => u!==c && u!==-c && Math.abs(u-c)<=3`. Controesempio concreto: correttezza attesa `x=2`, risposta sbagliata per un errore concettuale reale (non un refuso) che porta a `x=-1`: `|-1-2|=3`, non è segno invertito (`-1 ≠ -2`) → l'euristica scatta comunque, mostrando *"Il procedimento sembra impostato bene, ma c'è un piccolo errore di calcolo"* — un messaggio rassicurante e fuorviante per un errore che non è affatto di semplice calcolo. La soglia è assoluta (±3), non relativa alla grandezza della risposta attesa, quindi il rischio è massimo proprio sugli esercizi facile (risposte piccole).

**H6 — [LOW] `zeroOrEmpty` è codice morto.** Definito in `ERROR_TESTS` ma mai referenziato da alcun `when` in `data.js` (verificato: solo `signFlip`/`smallSlip` compaiono, 31 volte ciascuno).

**H7 — [NOTE, non un problema] Verbosità su iPhone: rischio basso, verificato.** La sequenza più lunga (famiglia "parentesi ambo membri", 8 esercizi) produce al massimo 4 righe brevi (~40-50 caratteri), non un muro di testo su 390px. Nessuna correzione necessaria.

---

## 3. Review delle interazioni

Per ciascun componente: valore didattico, qualità UX, riusabilità, coupling, accessibilità, rischio di comportamento ambiguo. Tutti i finding sotto sono stati verificati direttamente sul codice sorgente (non solo riportati dalla sub-review).

### Bilancia (`balance`)

- **Valore didattico:** reale, non un quiz travestito — mantiene un modello simbolico genuino (`EquationModel`) e ricalcola le opzioni ad ogni round; la trappola "segno invertito" richiede davvero di sapere qual è l'operazione inversa corretta, non è indovinabile per pattern-matching.
- **F1 — [HIGH] La trappola "un piatto solo" si autodenuncia nell'etichetta del bottone.** Verificato in `interactions.js:89`: `label: EquationModel.moveLabel(correct) + ' (un piatto solo)'` — il testo del bottone sbagliato è *la risposta corretta più la confessione tra parentesi che è sbagliata*. Una studentessa non deve mai ragionare sul perché sia sbagliata: evita semplicemente l'opzione con le parole in più. Questo vanifica lo scopo pedagogico specifico richiesto dalla Fase 3 del task per quella trappola. La trappola "segno invertito" invece NON si autodenuncia (l'etichetta è solo "+3"/"−3", nessun suffisso) — il problema è specifico e circoscritto a un solo dei due pattern.
  *Correzione raccomandata:* rimuovere " (un piatto solo)" dall'etichetta e comunicare la conseguenza (bilancia che si inclina) solo dopo la scelta, come già fa il messaggio contestuale.
- **F2 — [MEDIUM] Tentativi sbagliati sulla bilancia sono gratuiti, illimitati e invisibili alle statistiche.** `applyMove` chiama `logAttempt` (via `applyInteraction`) solo quando l'esercizio si risolve (`completed:true`), mai sui tentativi con trappola. Una studentessa può cliccare alla cieca tutte le opzioni ad ogni round finché una funziona; il Diario/mastery registrerà comunque un solo tentativo "corretto", indistinguibile da chi ha risolto al primo colpo. Rende l'esercizio aggirabile senza comprensione E inquina i dati su cui si baserà un futuro tutor adattivo.
- **Riusabilità:** non riusabile as-is per altri moduli (dipende da `EquationModel`), ma il coupling è pulito e isolato — nessun altro componente lo referenzia, quindi non "perde" verso i componenti generici.

### Riordina i passaggi (`order`)

- **Valore didattico:** buono, richiede comprensione reale della sequenza risolutiva.
- **F3 — [MEDIUM] Nel caso peggiore, riordinare richiede un numero di tap sproporzionato.** Con solo scambi adiacenti (su/giù) e una permutazione iniziale completamente invertita, servono `n(n−1)/2` tap: 10 per l'esercizio a 5 passaggi presente nei dati reali (`3(x−2)=x+4`), 6 per quelli a 4 passaggi. `shuffleUntilDifferent` non limita quanto "mescolato" sia lo shuffle iniziale, solo evita che sia identico all'ordine corretto.
- **F4 — [MEDIUM] Bersagli di tap piccoli e ravvicinati.** `.order-row__arrows button { width:30px; height:30px }` con `gap:4px` — sotto la soglia consigliata di ~44px per iOS, con le due frecce adiacenti (rischio concreto di toccare la freccia sbagliata su schermo piccolo).
- **F5 — [LOW] Unica inconsistenza tra i 4 pulsanti "Controlla": `order-check` non riceve mai l'attributo `disabled`** (gli altri tre lo ricevono condizionalmente). Innocuo qui (una permutazione è sempre "completa"), ma è un'incoerenza non spiegata nel pattern.
- **Riusabilità:** piena — nessun riferimento a `EquationModel` o a logica specifica delle equazioni in tutto il componente.

### Raggruppa i termini simili (`group`)

- **F6 — [HIGH] Il bucket è un `<div>` non raggiungibile da tastiera, con nessun `role`/`tabindex`/gestore `keydown`.** Verificato: `interactions.js:275` produce `<div class="group-bucket" data-action="group-tap-bucket" ...>`, e l'unico gestore `keydown` in tutta l'app (`app.js:822-827`) copre solo Invio sul campo `#ex-input`. Un utente che seleziona un termine da tastiera (i chip *sono* `<button>`, quello funziona) non ha alcun modo di completare il tap sul bucket: l'esercizio non è risolvibile senza mouse/touch. Va oltre "poco accessibile" — è un blocco funzionale totale per quella modalità d'uso, in un componente esplicitamente pensato per essere generalizzato.
  *Correzione raccomandata:* rendere i bucket `<button>` (o aggiungere `role="button" tabindex="0"` + gestore Enter/Spazio), coerente con come i chip sono già implementati.
- **F7 — [MEDIUM] Il pool si ridispone ad ogni assegnazione, con rischio di tap veloci sul chip sbagliato.** `flex-wrap` + rimozione immediata del chip assegnato sposta la posizione dei chip restanti; una sequenza di tap rapidi rischia di colpire un termine diverso da quello previsto dopo il primo spostamento.
- **F8 — [LOW-MEDIUM] Deselezionare un chip già piazzato sovrascrive silenziosamente una selezione precedente diversa**, senza messaggio (comportamento confuso più che un bug bloccante).
- **Punti positivi verificati:** il gating di `group-check` riflette sempre correttamente lo stato reale post-render (nessun bug di "disabled" non aggiornato); `tapBucket` non fa nulla se non c'è una selezione attiva, quindi non è possibile doppia-assegnazione per tap rapidi su due bucket.
- **Riusabilità:** piena a livello di dati/logica; il finding F6 va corretto prima di considerarlo un componente accessibile riutilizzabile.

### Costruisci l'equazione (`build`)

- **F9 — [MEDIUM] Se l'ordine dei blocchi è sbagliato ma i blocchi sono giusti, il feedback non lo distingue da un errore di contenuto.** `check()` confronta solo la sequenza intera; il messaggio è lo stesso identico ("❌ Non è ancora l'equazione giusta. Rileggi la frase con calma.") sia per blocchi sbagliati sia per solo ordine sbagliato — nessun indizio posizionale, a differenza di `error-detect` che almeno evidenzia il passaggio specifico.
- **Punto positivo verificato:** i blocchi distrattori nei dati reali sono ben scelti (es. `−2`/`15` per un esercizio "aumentato di 2 = 17": trappole di segno e di soluzione-prematura), non rumore casuale.
- **Riusabilità:** piena, stesso pattern di `order`/`group`.

### Caccia all'errore (`error-detect`)

- **Valore didattico:** il più solido dei 5 — identificare *quale* passaggio si rompe richiede confronto riga-per-riga, difficile da indovinare per pattern-matching.
- **F10 — [MEDIUM] Tentativo singolo, nessuna via di recupero sulla stessa istanza.** Confermato tracciando `select()`/`check()`: una volta `checked:true`, non esiste alcun percorso di codice che lo riporti a `false` se non uscire e rientrare nell'esercizio (che però fa avanzare `exIndex`, non ripropone lo stesso). Coerente con il resto dell'app (anche gli esercizi numerici classici non permettono un secondo tentativo sulla stessa domanda), quindi non è una regressione — ma è un limite più sentito qui, dato che il formato è esplicitamente presentato come diagnostico.

### Trasversali

- **F11 — [MEDIUM] Segnalazione corretto/sbagliato solo a colore in tutti e 4 i componenti non-bilancia.** `.error-step`/`.order-row`/`.chip--placed` usano solo `border-color`/`background` (verde/rosso) per marcare giusto/sbagliato, senza icona o testo per singolo elemento — proprio la coppia cromatica più problematica per il daltonismo rosso-verde più comune. Il messaggio aggregato esiste ma non identifica quale elemento specifico è sbagliato in `order`/`group`.
- **F12 — [MEDIUM, non "nessuna protezione" — precisato] Il rischio doppio-tap è di mira sbagliata, non di doppia esecuzione.** Poiché il click handler è sincrono e JS è single-thread, un secondo tap fisico non può mai colpire lo stesso bottone due volte prima che il primo re-render sia completato — quindi non c'è vera race condition. Il rischio reale è che il secondo tap, arrivando dopo il re-render, colpisca un elemento diverso ora nella stessa posizione (aggravato da F7/F17 sul reflow del pool).
- **F13 — [LOW] Nessuna gestione del focus/`aria-live` sui blocchi di feedback**, in tutti i componenti — verosimilmente preesistente nell'app, non introdotto da questo commit, ma con più passaggi interattivi il costo per un utente di tecnologie assistive cresce.
- **F14 — [LOW] Nessuna validazione difensiva se `ex.model`/`orderData`/`groupData`/`buildData`/`errorData` fossero assenti** con `ex.format` impostato: non innescato da alcun contenuto reale oggi, ma un futuro autore di contenuti per un altro modulo che dimentica un campo otterrebbe `NaN`/etichette rotte silenziosamente invece di un errore esplicito.

### Verdetto di riusabilità per componente

| Componente | Riusabile as-is | Nota |
|---|---|---|
| `order` | ✅ Sì | Nessun riferimento equazioni-specifico |
| `group` | ⚠️ Sì, ma con F6 da correggere prima | Blocco tastiera reale |
| `build` | ✅ Sì | Nessun riferimento equazioni-specifico |
| `error-detect` | ✅ Sì | Nessun riferimento equazioni-specifico |
| `balance` | ❌ No, per design | Richiede un modello simbolico equivalente per ogni dominio (es. proporzioni); coupling pulito, non "perde" verso gli altri |

---

## 4. Review architetturale

**Responsabilità dei 3 file:**
- `app.js`: possiede l'unico `state` globale mutabile, il ciclo `render()`, e ora anche il dispatch generico `applyInteraction(kind, method, ...args)` verso `Interactions`. Cresciuto di 192 righe nette; la funzione più grande post-commit è `renderExerciseQuestion` (~72 righe, 3 rami) — non allarmante, ma con una duplicazione minore del markup `<p class="exercise-counter">...</p>` ripetuto identico nei 3 rami.
- `interactions.js`: correttamente "puro" — nessuna lettura/scrittura di variabili globali di `app.js`, contratto `{ist, completed?, correct?}` uniforme e ben rispettato in 4 componenti su 5 (l'unica incoerenza: `errorDetect.check` non specchiava `correct` dentro `ist`, **già corretto nel commit** dopo un giro di test — verificato che la versione committata è quella corretta).
- `help-engine.js`: correttamente isolato dietro il flag opzionale `hintSteps`; `generateTwin` è l'unica funzione con logica 100% equazioni-specifica non isolata dietro un'interfaccia — vedi F16.

**F15 — [MEDIUM] Il dispatcher di `app.js` richiede un caso `switch` per ogni singola azione, non per formato.** 11 dei 24 casi nello switch di delega eventi sono dispatch a una riga verso `applyInteraction` (es. `case 'balance-move': applyInteraction('balance', 'applyMove', btn.dataset.moveId); break;`). Economico oggi, ma se altri 5 moduli aggiungono anche solo 2-3 azioni ciascuno con lo stesso pattern, lo switch crescerà linearmente a 60-80 casi quasi identici. Non è "migliaia di righe duplicate", ma è un pattern che non scala elegantemente: un'alternativa (`data-action="interact" data-kind="..." data-method="..."`) eliminerebbe la crescita, restando compatibile con l'architettura esistente.

**F16 — [MEDIUM] `generateTwin` è hardcoded sulle equazioni, senza punto di estensione per altri moduli.** L'unico criterio è `if (!ex.model) return null` seguito da matematica specifica di `EquationModel` (coefficienti a/b/c/d). Se `frazioni` o `potenze` vorranno gemelli generati proceduralmente, oggi l'unica via è aggiungere altri rami hardcoded dentro la stessa funzione — che diventerebbe un accumulo di if/else per modulo. Prima di aggiungere un secondo generatore, vale la pena introdurre un piccolo registro (es. `ex.generatorKey` → funzione), coerente con lo schema dati già previsto in `PIANO_SVILUPPO_V2.md` §6 (`generatorKey: null`).

**F17 — [LOW-MEDIUM] Duplicazione minore tra i 4 componenti non-bilancia.** Ogni `render()`/`check()` reimplementa autonomamente il proprio "tutti gli elementi assegnati?"/paragrafo di feedback invece di condividere 1-2 helper. Accettabile a 5 componenti, da consolidare prima di aggiungerne altri.

**Proprietà positiva verificata:** lo stato globale aggiunto (`interaction`, `exTwin`, `exHelpLevel`, `exErrorDiagnosis`, `theoryChecks`) è generico per formato/campo-opzionale, non specifico del modulo equazioni — non richiede una crescita di `state` per ogni nuovo modulo, solo per ogni nuovo *tipo* di interazione. Questa è una proprietà architetturale sana per la generalizzazione.

### Risposta esplicita: questa architettura può supportare tutti i moduli V2?

**Parzialmente.** L'infrastruttura di base (contratto init/action/render, scala di aiuto a livelli, catalogo diagnosi errori, stato globale generico per formato) è genuinamente riutilizzabile e già lo dimostra per 4 dei 5 componenti. Non è però "copia-incolla per ogni modulo": è più corretto dire che `interactions.js`/`help-engine.js` **cresceranno per accumulo** (nuovi componenti/generatori aggiunti agli stessi due file), e due punti — il dispatcher a switch in `app.js` (F15) e `generateTwin` senza registro (F16) — accumuleranno complessità proporzionale al numero di moduli se non vengono generalizzati **prima** di ripetere il pattern una seconda volta. Non è un'architettura da buttare, ma nemmeno pienamente pronta a scalare a costo marginale zero.

---

## 5. Builder one-shot (`scripts/build_equazioni_v2.js`)

Verificato empiricamente rieseguendo lo script sul `data.js` già trasformato: fallisce immediatamente e rumorosamente (`Error: Slide "Come si risolve" non trovata: struttura inattesa`, way prima di qualunque `stdout.write`) — **non silenziosamente**, il che è il comportamento di fallimento più sicuro possibile per uno script non pensato per essere rieseguito. Nessun rischio di corruzione silenziosa.

**F18 — [MEDIUM] Lo script non è idempotente/rieseguibile, e mescola autoria di contenuto con trasformazione meccanica.** Le 9 micro-lezioni, i 20 nuovi esercizi interattivi e i template di hint sono scritti *inline* nello script stesso (398 righe), non caricati da un JSON curato esterno. Questo è coerente con il precedente già presente nel repository (`scripts/add_worked_steps.js`, anch'esso non rieseguibile e con contenuto inline, esplicitamente documentato in `CLAUDE.md` come "il pattern da seguire") — quindi non è una deviazione introdotta da questo commit, ma è comunque in tensione diretta con la preferenza architetturale richiesta da questa review (trasformazioni idempotenti, builder rieseguibili, source of truth chiara). Il precedente `scripts/build_data.js` invece separa correttamente contenuto curato (`curated.json`/`hand_extra.json`) dal merge — un modello migliore, già presente nello stesso repository, che non è stato riusato qui.
*Conseguenza pratica:* se in futuro serve capire "perché questo esercizio ha il modello {5,-14,2,-38}" o rigenerare il modulo da zero dopo un conflitto di merge, l'unica fonte è uno script che non può più essere eseguito con successo — `data.js` stesso diventa l'unica fonte di verità *de facto* da quel momento in poi (accettabile, ma va riconosciuto esplicitamente, non lasciato implicito).
*Correzione raccomandata prima della generalizzazione:* per i prossimi moduli, separare contenuto curato (JSON) da script di merge, sul modello di `build_data.js`, oppure — più semplice — documentare esplicitamente che questi script "one-shot" sono e restano non rieseguibili per design, così la scelta è dichiarata e non scoperta a posteriori.

---

## 6. `data.js` — analisi quantitativa delle 1944 righe aggiunte

Misurato programmaticamente (non stimato):

| Categoria | Righe JSON | % del totale |
|---|---|---|
| 9 micro-lezioni (contenuto pedagogico nuovo) | 164 | 8% |
| 20 esercizi nei 5 nuovi formati (contenuto perlopiù nuovo, ma strutturalmente verboso: 25-50 righe/esercizio per via del pretty-print JSON a 2 spazi) | 732 | 38% |
| Metadati aggiunti ai 31 esercizi originali già esistenti (skill/level6/cognitiveType/hintSteps/workedSolution/model/commonErrors) | 933 | 48% |
| — di cui `commonErrors` duplicato **per valore** 31 volte (stesso array in memoria, JSON non condivide riferimenti) | **372** | **19%** |
| — di cui `workedSolution` persistito staticamente pur essendo **derivabile a runtime al 100%** da `model` tramite `EquationModel.solutionSteps()` già presente nello stesso esercizio (verificato: tutti i 36 esercizi con `workedSolution` hanno anche `model`) | **111** | **6%** |

**F19 — [MEDIUM] Circa un quarto delle righe aggiunte (483/1944) è duplicazione esatta o dato ridondante calcolabile a runtime, non nuova didattica.** Sono correzioni piccole e localizzate, non un refactoring:
- `commonErrors`: sostituire la copia inline con un riferimento (`commonErrorsKey: 'linear_equation_basic'`) risolto a runtime da `help-engine.js` contro un piccolo catalogo condiviso, invece di duplicare l'array in ogni esercizio.
- `workedSolution`: per gli esercizi con `model`, calcolarlo on-demand in `getHelpContent`/`generateTwin` invece di persisterlo; mantenerlo statico solo per i ~5 esercizi senza modello simbolico (problemi logici) dove non è derivabile.

**Risposta esplicita: `data.js` può restare la source of truth nella V2?**
Sì, per ora — 4025 righe totali non sono un problema di per sé per un file JS statico caricato una volta. Ma la **proporzione** di duplicazione/ridondanza misurata qui (25%) è preoccupante se estrapolata linearmente su 5 moduli aggiuntivi con lo stesso trattamento: nel caso peggiore, `commonErrors` duplicato e `workedSolution` ridondante potrebbero da soli aggiungere ~2500 righe pure-duplicate al file finale. Non serve separare `data.js` in più file adesso (sarebbe un refactoring non necessario per il problema attuale), ma le due correzioni F19 andrebbero fatte **prima** di ripetere il pattern, non dopo.

**F20 — [NOTE] Le 5 nuove bilance hanno `model` ma non `commonErrors`, per via dell'ordine di esecuzione dello script** (il tagging avviene prima che gli esercizi bilancia vengano concatenati all'array). Innocuo in pratica — la bilancia non passa mai da `checkCurrentAnswer`/`diagnoseCommonError`, essendo interamente guidata dalle mosse — ma è un'inconsistenza di schema silenziosa che vale la pena notare prima che qualcuno ci faccia affidamento.

---

## 7. Test — cosa NON viene verificato

I 19 test e2e citati nel report dell'implementatore sono stati eseguiti in un profilo Chrome headless **sempre nuovo**, senza mai seminare `localStorage` con dati preesistenti. Questo lascia scoperto esattamente lo scenario di rischio più esplicitamente segnalato da `CLAUDE.md` stesso (assenza di migrazione dello storage). Verificando il codice per tracciare cosa succederebbe realmente:

**T1 — [CRITICAL, trovato per lettura diretta del codice, non ipotizzato] Una studentessa che aveva già completato un livello prima di questo aggiornamento non vedrà mai i nuovi esercizi in quel livello attraverso la navigazione naturale.**
Tracciato con precisione:
- `openExercises()` (chiamata dal tasto "Esercizi" del menu modulo, il percorso naturale) sceglie il livello con `LEVELS.find(l => !p.exercises[l])` — salta qualunque livello già marcato `true`.
- `levelTrackHtml` renderizza i pillola-livello come `<div>` semplici, **senza `data-action`**: non sono cliccabili. Non esiste alcuna UI per riaprire esplicitamente un livello già completato.
- L'unico modo per forzare `exLevel='facile'` è `case 'theory-done': markTheorySeen(); openExercises('facile')` — cioè rientrare in Teoria e premere di nuovo "Vai agli esercizi", un percorso non ovvio per chi ha già superato quel livello.

*Scenario concreto:* Alessandra (l'utente reale dell'app) ha già usato il modulo equazioni prima di questo deploy e ha completato il livello facile (12 esercizi originali). Dopo l'aggiornamento, `progress.equazioni.exercises.facile` resta `true` (lo storage non è stato toccato da questo commit, quindi il valore sopravvive intatto). Aprendo "Esercizi" dal menu, l'app la porta dritta a medio/difficile: le 2 bilance, il riordino, le 2 raggruppa-termini e le 2 costruisci-equazione aggiunte al livello facile **non verranno mai viste**, a meno che lei non scopra da sola il percorso teoria→"vai agli esercizi".
*Correzione raccomandata:* rendere le pillole di `levelTrackHtml` cliccabili (richiamando `openExercises(level)` esplicitamente) risolverebbe sia questo caso sia, più in generale, la libertà di navigazione tra livelli — fix piccolo e a basso rischio.

**T2 — [MEDIUM] Nessun test su Service Worker/cache offline reale.** `CACHE_NAME` è stato incrementato a v4 e i 2 nuovi file aggiunti a `CORE_ASSETS`, ma nessun test verifica che un client con la v3 già installata (il caso reale di un'app già sulla home screen di un iPhone) riceva effettivamente l'aggiornamento, scarichi i nuovi file, ed evict correttamente la cache precedente. Area esplicitamente segnalata a rischio da `CLAUDE.md` e mai esercitata da alcun test in questo commit.

**T3 — [MEDIUM] Refresh/interruzione a metà di un'interazione perde tutto il lavoro, non solo la singola risposta.** Tutto lo stato (`state.interaction`, posizione nella bilancia, blocchi piazzati in `build`, assegnazioni in `group`) è solo in memoria, mai persistito. Questo è comportamento V1 preesistente (anche un input numerico si perdeva al refresh), non una regressione — ma il costo per la studentessa è più alto ora: perdere 6-8 tap di un `build`/`order` a metà è più frustrante che riscrivere un numero.

**T4 — [MEDIUM] Nessun test con `localStorage` corrotto/di forma vecchia oltre al parse-fail già gestito.** `loadProgress`/`loadHistory` gestiscono un JSON.parse fallito (try/catch → default), ma non è mai stato verificato uno storage strutturalmente valido ma "vecchio" (il caso reale è proprio T1, non un JSON malformato).

**T5 — [LOW-MEDIUM] Doppio tap rapido: nessun test, rischio reale ma circoscritto.** Confermato in sede di architettura (F12): non c'è vera race condition (JS è single-thread, il render è sincrono), ma un secondo tap fisico può colpire un elemento diverso da quello mirato dopo che il primo tap ha già ridisegnato il DOM — mai verificato empiricamente con eventi touch reali ravvicinati, solo ragionato staticamente.

**T6 — [LOW] Nessun test su viewport più piccoli (es. iPhone SE, 375×667) o orientamento landscape.** Solo 390×844 verificato. Il CSS usa layout relativi/flex, quindi il rischio è probabilmente basso, ma non verificato.

**T7 — [LOW] Input inconsueti non testati sul percorso di diagnosi errori**: es. risposta con virgola decimale su un esercizio con `commonErrors` — il codice dovrebbe gestirlo correttamente (`normalizeNumber` supporta le virgole) ma non è stato esercitato da alcun test insieme alla diagnosi.

---

## 8. Tabella riassuntiva dei finding

| ID | Severità | File | Sintesi |
|---|---|---|---|
| T1 | **CRITICAL** | `app.js` (`openExercises`, `levelTrackHtml`) | Progressi preesistenti nascondono permanentemente i nuovi esercizi di un livello già completato |
| D1 | HIGH | `data.js` (theory[3]) | "Termine" usa primo/secondo membro prima di definirli |
| D2 | HIGH | `data.js` (exercises) | Balance sempre in coda: scorciatoia esercitata 11-13 volte prima della bilancia |
| F1 | HIGH | `interactions.js:89` | Trappola "un piatto solo" si autodenuncia nell'etichetta |
| F6 | HIGH | `interactions.js:275` | Bucket `group` non raggiungibile da tastiera: esercizio irrisolvibile senza touch/mouse |
| H1 | HIGH | `help-engine.js` (`getHelpContent`) | Scala 0-6 collassa alla soluzione completa al livello 3-4 per esercizi corti |
| H2 | HIGH | `app.js`/`help-engine.js` | Regola di regressione di HELP_SYSTEM_V2.md assente ovunque |
| H3 | HIGH | `app.js` (`requestTwin`/`exerciseNext`) | Il gemello (livello 6) non verifica nulla: si avanza comunque |
| D4 | MEDIUM | `data.js` (build exercises) | Hint copiato e sbagliato su tutti e 4 gli esercizi "costruisci" |
| D3 | MEDIUM | `app.js` (`renderTheory`) | Micro-verifiche non bloccano la navigazione |
| F2 | MEDIUM | `interactions.js` (`balance`) | Tentativi trappola gratuiti/illimitati, invisibili alle statistiche |
| F3/F4 | MEDIUM | `interactions.js`/`styles.css` (`order`) | Riordino costoso in tap nel caso peggiore; bersagli piccoli |
| F7 | MEDIUM | `interactions.js` (`group`/`build`) | Reflow del pool: rischio mira sbagliata su tap rapidi |
| F9 | MEDIUM | `interactions.js` (`build`) | Nessun feedback posizionale su ordine sbagliato |
| F10 | MEDIUM | `interactions.js` (`error-detect`) | Tentativo singolo, nessun recupero sulla stessa istanza |
| F11 | MEDIUM | `styles.css` | Segnalazione corretto/sbagliato solo a colore, in 4 componenti |
| F12 | MEDIUM | architettura generale | Rischio di mira sbagliata su doppio tap (non race condition) |
| F15 | MEDIUM | `app.js` (dispatcher) | Switch per-azione non scala linearmente su più moduli |
| F16 | MEDIUM | `help-engine.js` (`generateTwin`) | Nessun registro/estensione per generatori di altri moduli |
| F18 | MEDIUM | `scripts/build_equazioni_v2.js` | Non rieseguibile; contenuto e trasformazione mescolati |
| F19 | MEDIUM | `data.js` | 25% delle righe aggiunte è duplicazione esatta o dato ridondante calcolabile |
| H4 | MEDIUM | `help-engine.js` | Aiuto più povero esattamente sui formati più nuovi |
| H5 | MEDIUM | `help-engine.js` (`smallSlip`) | Falso positivo concreto su soglia assoluta non relativa |
| T2 | MEDIUM | `sw.js` | Nessun test reale su aggiornamento cache/offline |
| T3/T4 | MEDIUM | app-wide / `app.js` | Stato interattivo non persistito; nessun test su storage "vecchio ma valido" |
| D5/D6 | LOW-MEDIUM | `data.js` teoria | Ridondanza tra 2 slide; distributiva/verifica ancora sotto-allenate (pre-esistente) |
| F5/F8/F13/F14 | LOW | vari | Incoerenza `disabled` su `order-check`; deselezione silenziosa in `group`; nessun `aria-live`; nessuna validazione difensiva su dati mancanti |
| F17 | LOW-MEDIUM | `interactions.js` | Piccola duplicazione tra i 4 componenti non-bilancia |
| T5/T6/T7 | LOW | vari | Doppio tap, viewport piccoli, input inconsueti: non testati (rischio basso-medio, non verificato) |
| H6 | LOW | `help-engine.js` | `zeroOrEmpty` codice morto |
| F20 | NOTE | `data.js` | 5 bilance hanno `model` ma non `commonErrors` (innocuo) |

---

## 9. Verdetto

## **B — APPROVED AFTER SMALL FIXES**

**Motivazione.** L'infrastruttura di base è solida e vale la pena mantenerla: il contratto `init/action/render` di `interactions.js` è pulito e genuinamente puro; 4 dei 5 componenti sono riutilizzabili senza modifiche da altri moduli; lo schema dati è additivo come richiesto e non ha toccato gli altri 5 moduli (verificato); la scala di aiuto e la diagnosi errori sono infrastrutture reali, non finte. La correzione del problema pedagogico più grave della V1 ("cambia segno" come regola calata dall'alto) è genuinamente riuscita nella teoria.

Non è però "pronto così com'è" per essere replicato 5 volte: esiste **un bug con impatto reale sull'utente attuale dell'app** (T1 — i progressi già esistenti nascondono i nuovi contenuti, e questa è letteralmente Alessandra), **tre scostamenti sostanziali tra quello che `HELP_SYSTEM_V2.md` richiede esplicitamente e quello che il codice fa davvero** (H1/H2/H3 — scala che collassa, nessuna regressione, gemello che non verifica), **un difetto di accessibilità che rende un componente interamente non funzionale per un canale di input** (F6), e **un'inversione dell'ordine pedagogico dichiarato** (D2 — la bilancia arriva dopo, non prima, della scorciatoia che dovrebbe giustificare). Nessuno di questi richiede di buttare l'architettura o il modello didattico: sono correzioni mirate, quasi tutte a un solo file o a un ordinamento di array, non un redesign.

Per questo il verdetto non è A (troppi scostamenti reali dal documento guida per un "sì" pulito) né C/D (il fondamento — pattern a riduttore, modello simbolico puro, schema additivo, isolamento dagli altri moduli — è corretto e non va riprogettato; i problemi sono contenuto, sequenza e alcuni difetti UI puntuali, non architettura sbagliata).

---

## 10. Priorità successive (max 10, se il verdetto è B)

### BLOCKING BEFORE GENERALIZATION

1. **[T1]** Rendere le pillole di `levelTrackHtml` cliccabili (o altro meccanismo esplicito) così un livello già completato resti raggiungibile — altrimenti ogni futura espansione di contenuto in un livello "done" ripete lo stesso problema in ogni modulo.
2. **[F1]** Rimuovere il suffisso auto-rivelatore " (un piatto solo)" dall'etichetta della trappola bilancia.
3. **[F6]** Rendere i bucket di `group` accessibili da tastiera (o documentare esplicitamente il limite come scelta accettata, non come omissione) prima di riusare il componente altrove.
4. **[D2]** Riordinare gli array esercizi in modo che almeno una bilancia preceda il grosso del drill numerico in ogni livello, coerentemente con l'ordine già corretto della teoria.
5. **[D1]** Correggere la micro-lezione "Termine" per non usare "primo/secondo membro" prima della loro definizione.
6. **[H2]** Implementare almeno una versione minima della regola di regressione di `HELP_SYSTEM_V2.md` — è dichiarata obbligatoria dal documento che questo commit dichiara di implementare.
7. **[H3]** Far sì che un gemello sbagliato non porti a "Avanti" incondizionato: quantomeno un secondo gemello o un messaggio esplicito prima di proseguire.

### CAN BE DEFERRED

8. **[D4]** Correggere l'hint copiato/sbagliato sui 4 esercizi "costruisci l'equazione".
9. **[H1]** Ritarare le soglie di `getHelpContent` così il livello 5 sia genuinamente dove arriva la soluzione completa per esercizi corti, o comprimere onestamente la scala dichiarata.
10. **[F16 + F19]** Introdurre un registro/estensione per `generateTwin` prima di aggiungere un secondo generatore modulo-specifico, e ridurre la duplicazione `commonErrors`/`workedSolution` in `data.js` (per riferimento invece che per valore) prima di ripetere il pattern su altri 5 moduli — altrimenti la duplicazione osservata (25% delle righe aggiunte) si moltiplica.

*(Deliberatamente fuori da questa lista, perché a rischio/impatto più basso o già adeguatamente circoscritti: F2/F3/F4/F7/F9/F10/F11/F15/F18/H4/H5/T2/T3/T4/D3/D5/D6 e i finding LOW/NOTE — restano comunque documentati in tabella §8 per una futura sessione di pulizia.)*
