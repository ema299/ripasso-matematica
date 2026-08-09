# EQUAZIONI V2 — Consolidamento finale

> Consegna della fase di finalizzazione: correzione dei finding BLOCKING di `docs/REVIEW_EQUAZIONI_V2_FASE1.md`, validazione, versionamento e pubblicazione. Base: commit `6259ea73719ede662791c10b4368202260ef53bf` (FASE 1). Ambito: **solo il modulo equazioni**, nessun altro modulo toccato (verificato programmaticamente contro la storia git, vedi §5).

## 1. Architettura finale

Invariata nella forma rispetto alla FASE 1 (vedi `docs/EQUAZIONI_V2_FASE1.md` per il disegno originale): `app.js` possiede lo stato e il rendering, `interactions.js` i 5 componenti interattivi + il modello simbolico `EquationModel`, `help-engine.js` la scala di aiuto e la diagnosi errori. Le modifiche di questa fase sono correzioni mirate dentro questa stessa architettura, non un redesign:

- **Bilancia (`interactions.js`)**: passata da un'interazione a fase singola (3 bottoni, uno dei quali si autodenunciava nell'etichetta) a due fasi — prima "quale operazione" (2 opzioni ugualmente plausibili: corretta e segno invertito), poi "su quali piatti" (sinistro / destro / entrambi). Nessuna opzione rivela più da sola di essere la trappola.
- **Livelli riapribili (`app.js`)**: le pillole di livello sono ora bottoni cliccabili; `isLevelStale()` confronta il conteggio esercizi registrato al completamento (`progress[modulo].exerciseCounts`, nuovo campo additivo) con quello attuale della banca esercizi, e considera "da riaprire" un livello marcato completo la cui banca è nel frattempo cresciuta.
- **Scala di aiuto (`help-engine.js`)**: per gli esercizi con modello simbolico, il livello 3 ora descrive la prossima operazione SENZA calcolarne il risultato (prima mostrava già la soluzione completa per gli esercizi a un solo passaggio); il livello 4 mostra quel passaggio svolto; il livello 5 la soluzione guidata completa.
- **Gemello (livello 6, `app.js`)**: un gemello sbagliato non porta più a un "Avanti" incondizionato. Primo errore → un secondo gemello fresco; secondo errore → soluzione guidata completa, poi si può proseguire. Solo un gemello risolto correttamente chiude il ciclo immediatamente.
- **Regola di regressione (`app.js`, nuova)**: 3 errori consecutivi sulla stessa famiglia di esercizio (`level6`) interrompono la progressione automatica e mostrano una schermata di micro-ripasso (richiamo della regola) seguita da un esercizio di recupero generato al volo, prima di riprendere il percorso normale. Deterministica, locale, nessuna dipendenza esterna.
- **Accessibilità (`interactions.js`, `app.js`)**: i bucket di "raggruppa i termini" sono ora `role="button" tabindex="0"`, attivabili con Invio/Spazio da tastiera tramite un nuovo gestore generico in `app.js` (non duplica l'attivazione sui bottoni nativi, che la gestiscono già da soli).
- **`data.js`**: teoria e banca esercizi di equazioni riordinate (vedi §2), 4 hint corretti, `workedSolution` non più persistito per i 36 esercizi con modello simbolico (ricavato a runtime), `commonErrors` sostituito da un riferimento `commonErrorsKey` risolto contro un catalogo condiviso in `help-engine.js` invece di essere duplicato per valore 31 volte.

## 2. Finding BLOCKING della review — stato

| Finding | Stato | Soluzione |
|---|---|---|
| **T1** (CRITICAL) — progressi V1 nascondono i nuovi esercizi | ✅ Risolto | Pillole cliccabili + `isLevelStale()`; testato con localStorage seminato nella forma V1 esatta (vedi §4) |
| **F1** — trappola bilancia "un piatto solo" si autodenuncia | ✅ Risolto | Bilancia ridisegnata a due fasi; nessuna etichetta contiene più indizi sulla propria correttezza |
| **F6** — bucket "raggruppa termini" non raggiungibile da tastiera | ✅ Risolto | `role="button" tabindex="0"` + gestore keydown generico in `app.js`; verificato con un vero evento tastiera simulato (non solo attributi) |
| **D1** — "Termine" usa primo/secondo membro prima di definirli | ✅ Risolto | Teoria riordinata (nessuna modifica di testo: la slide segue ora la definizione dei membri) |
| **D2** — bilancia sempre dopo il drill numerico | ✅ Risolto | Bilancia (e raggruppa-termini) riposizionati in testa a ogni livello |
| **H2** — regola di regressione assente | ✅ Risolto | Implementata in forma minima ma reale (vedi §1); non è un sistema AI, solo un contatore deterministico + un esercizio di recupero |
| **H3** — il gemello non verifica nulla | ✅ Risolto | Un gemello sbagliato non avanza più incondizionatamente (vedi §1) |
| **D4** (deferito in review, corretto qui) — hint "costruisci l'equazione" copiato/sbagliato | ✅ Risolto | 4 hint riscritti, ciascuno coerente con la propria frase |
| **H1** — scala 0-6 collassa alla soluzione completa al livello 3-4 | ✅ Risolto | Livello 3 ridisegnato per non rivelare più il risultato (vedi §1) |
| **F19** — 25% delle righe aggiunte in FASE 1 era duplicazione/dato ridondante | ✅ Risolto | `workedSolution` calcolato a runtime, `commonErrors` deduplicato per riferimento; `data.js` passato da 4025 a 3506 righe |
| **F16/F18** — builder non rieseguibile / source of truth ambigua | ✅ Chiarito | Vedi §3 |

Nessun finding BLOCKING è stato lasciato irrisolto.

## 3. Script one-shot — chiarimento

- `scripts/build_equazioni_v2.js` (FASE 1): script storico, **non rieseguibile** — verificato empiricamente che fallisce rumorosamente e immediatamente se rilanciato (cerca stringhe della V1 che non esistono più). Intestazione aggiornata per dichiararlo esplicitamente.
- `scripts/finalize_equazioni_v2.js` (questa fase): **idempotente per costruzione** — ogni sua trasformazione (riordino per titolo/formato, sovrascrittura di un valore fisso, aggiunta/rimozione di un campo condizionata alla sua assenza/presenza) è naturalmente stabile. Verificato empiricamente: un secondo lancio produce un output byte-per-byte identico. Sicuro da rilanciare, ma resta comunque `data.js` sul disco — non lo script — la fonte di verità.
- `CLAUDE.md` aggiornato con una sezione esplicita che dichiara questa distinzione per ogni sessione futura, così nessuno rilanci per errore uno script storico come fosse un normale passo di build.

## 4. Compatibilità con i progressi V1 — verificata, non assunta

Scenario testato end-to-end con localStorage seminato esattamente nella forma che aveva un dispositivo prima di questo deploy (nessun `exerciseCounts`, nessuno dei nuovi campi):

1. `progress.equazioni.exercises = {facile:true, medio:true, difficile:false}`, storico con 2 voci.
2. Reload della pagina → progresso e storico sopravvivono intatti (nessuna perdita silenziosa).
3. Apertura "Esercizi" → il livello facile (marcato completo in V1, ma con 6 esercizi interattivi nuovi non ancora visti) viene riconosciuto come "da riaprire" e proposto per primo, non saltato.
4. La lista facile riaperta contiene davvero i nuovi esercizi (bilancia, raggruppa, costruisci), bilancia in testa.
5. Le pillole "Facile" e "Medio" mostrano un indicatore "nuovo" cliccabile; "Difficile" no (mai completato, quindi correttamente "da fare" e non "stale").
6. Al ri-completamento del livello, il nuovo conteggio viene registrato per il futuro.
7. Il modulo `numeri`, mai toccato da questa fase, non viene mai segnalato come "stale" nonostante non abbia `exerciseCounts`: la sua banca esercizi non è cambiata (12 in V1, 12 ora), quindi il confronto coincide.
8. `localStorage` con JSON corrotto: nessun crash, fallback pulito allo stato vuoto (comportamento preesistente, riconfermato).

## 5. Test

**77 controlli automatici**, tutti verdi, distribuiti su 5 sessioni Chrome headless indipendenti (pattern CDP di `CLAUDE.md`) più i controlli statici:

| Suite | Controlli | Copre |
|---|---|---|
| Upgrade V1→V2 / localStorage | 9/9 | Scenario §4 per intero, localStorage corrotto |
| Suite principale | 27/27 | Altri moduli (comportamento, non solo dati), riordino teoria/esercizi, scala di aiuto, gemello corretto/sbagliato, regressione, bilancia (mossa corretta + 2 trappole), riordino/raggruppa/costruisci/caccia-errore, F6, D4, refresh a metà attività, back/navigation |
| Accessibilità/viewport/SW | 16/16 | Attivazione da tastiera con evento reale, registrazione service worker, contenuto cache v5, isolamento cache/localStorage, 3 viewport iPhone (SE 375px, standard 390px, Pro Max 430px): nessun overflow orizzontale, campo risposta e bottoni tappabili (≥40px), teoria/bilancia leggibili |
| 19 test originali FASE 1 (aggiornati per la nuova API bilancia) | 20/20 | Regressione completa rispetto alla FASE 1 |
| Sicurezza altri moduli | 5/5 | La regola di regressione non si attiva mai per nessuno dei 5 moduli non toccati (nessun esercizio ha `model`) |

Più: `node --check` su tutti i file JS, self-consistency estesa (`scripts/verify_equazioni_v2.js`), e confronto diretto — via `git show`, non un confronto contro se stesso — tra il contenuto attuale di `data.js` per `numeri`/`frazioni`/`potenze`/`algebra`/`geometria` e quello del commit base `6259ea7`: **identici byte per byte**.

**Limite onesto:** un tentativo di forzare empiricamente via CDP un ciclo completo "cache di una versione precedente presente → nuova installazione del service worker → eviction" si è rivelato inaffidabile in sessione headless (Chrome attiva il nuovo service worker più rapidamente della finestra utile per iniettare una cache simulata, e un secondo `register()` con lo stesso identico `sw.js` non innesca sempre un nuovo ciclo `activate` osservabile). La correttezza della pulizia (`caches.keys().then(keys => keys.filter(k => k !== CACHE_NAME).map(caches.delete))`, codice invariato rispetto alla FASE 1) è confermata sia per lettura diretta del codice sia con un test unitario Node isolato della stessa espressione. È documentato come limite del metodo di test, non taciuto.

## 6. Compatibilità

- **Progressi V1**: preservati, verificati (§4).
- **Altri 5 moduli**: dati identici byte-per-byte al commit base; comportamento verificato (teoria, esercizi, regola di regressione mai attivabile).
- **localStorage**: stesse due chiavi (`ripasso-mate-progress-v1`, `ripasso-mate-history-v1`), nessun bump; nuovi campi (`exerciseCounts`, `twin`, `skill` nello storico) sono additivi e opzionali.
- **Service worker**: `CACHE_NAME` da `v4` a `v5` (bump obbligatorio per gli asset modificati in questa fase); logica di pulizia invariata; cache applicativa e `localStorage` sono storage completamente separati — confermato che ripulire le cache non tocca in alcun modo i progressi salvati.

## 7. Comportamento aiuto e remediation — riassunto per chi userà l'app

- **Livelli 0-2**: tentativo autonomo, poi indizio leggero, poi richiamo della regola — invariati.
- **Livello 3**: ora dice *cosa* fare (es. "applica −7 a entrambi i membri"), non calcola più il risultato al posto della studentessa.
- **Livello 4**: mostra quel passaggio svolto.
- **Livello 5**: soluzione guidata completa.
- **Livello 6**: un esercizio "gemello", diverso ma della stessa forma. Se sbagliato, non si avanza come se nulla fosse: secondo gemello, poi (se serve) soluzione guidata — solo allora si può continuare.
- **Regressione automatica**: 3 errori di fila sullo stesso tipo di esercizio fermano la progressione da sole, senza che la studentessa debba chiedere aiuto: breve richiamo della regola + un esercizio di recupero, poi si riprende.

## 8. Accesso per Alessandra

Nessuna installazione richiesta. L'indirizzo da aprire in Safari è:

**https://ema299.github.io/ripasso-matematica/**

L'aggiunta alla schermata Home resta possibile ma è **opzionale** (icona di condivisione di Safari → "Aggiungi a Home") — serve solo per un accesso più rapido e per l'uso offline, non è necessaria per usare l'app.

## 9. Debito tecnico residuo (non bloccante)

Vedi il report finale in chat per l'elenco completo con severità — qui solo la sintesi:

1. Diagnosi automatica errori (segno/calcolo) copre solo 2 dei 5 pattern richiesti dal piano generale; gli altri restano coperti solo dagli esercizi dedicati "caccia all'errore".
2. `order`/`group`/`build`/`error-detect` restano capped al livello 2 di aiuto (nessun modello simbolico da cui derivare passaggi/gemelli per questi formati).
3. Il dispatcher di `app.js` richiede un caso `switch` per azione; economico oggi, da rivedere se altri moduli aggiungono molte nuove interazioni.
4. `generateTwin` resta specifico delle equazioni, senza registro per generatori di altri moduli.
5. La regola di regressione è deterministica e semplice per scelta esplicita del task; non traccia mastery persistente per skill (fuori perimetro di questa fase).
