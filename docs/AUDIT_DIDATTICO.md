# AUDIT DIDATTICO — V1 "In viaggio con la Matematica"

> FASE 0 del `PIANO_SVILUPPO_V2.md`. Documento di sola analisi: nessun file di contenuto o di codice è stato modificato per produrlo. Fonte: lettura integrale di `CLAUDE.md`, `PIANO_SVILUPPO_V2.md`, `HELP_SYSTEM_V2.md`, `data.js` (2169 righe, 6 moduli), `app.js` (693 righe) e degli script `scripts/gen_exercises.js` / `scripts/build_data.js`.

**Metodo.** `data.js` non contiene metadati di skill, difficoltà cognitiva o prerequisiti (conferma diretta del gap descritto in `PIANO_SVILUPPO_V2.md` §6). Per produrre gli inventari delle sezioni 1-2 ho quindi ricostruito una tassonomia di skill "de facto", raggruppando gli esercizi per hint condiviso e per struttura della domanda (stessa formulazione, numeri diversi). È una ricostruzione interpretativa, non un dato dichiarato nel codice — è essa stessa la prova che manca un livello di metadati esplicito.

---

## Sommario esecutivo

- **216 esercizi** (6 moduli × 36, fissi 12/12/12 per livello) + **60 quiz** (6×10). Conteggio a cura fissa, non guidato da criteri pedagogici (conferma quanto già ipotizzato in `PIANO_SVILUPPO_V2.md` §2.4).
- **38% degli esercizi (83/216)** sono "quasi-duplicati cosmetici": stessa struttura testuale, cambiano solo i numeri. In 2 casi la struttura è identica **anche tra livello facile e medio** (nessuna reale crescita di complessità), e in 1 caso la domanda è **testualmente identica** in due livelli diversi.
- Il modulo **Equazioni** introduce la regola "cambia lato → cambia segno" come prima spiegazione operativa, esattamente la scorciatoia che `PIANO_SVILUPPO_V2.md` §2.2 vieta esplicitamente di anticipare rispetto al principio che la giustifica. Non esiste alcun modello di bilancia, né in teoria né come interazione.
- Termini chiave (variabile, incognita, coefficiente, termine, primo/secondo membro, mcm) sono **usati prima di essere definiti**, o mai definiti.
- Il sistema di aiuto attuale ha **un solo livello statico** (`ex.hint`, un'unica stringa sempre uguale per skill). La scala a 6 livelli descritta in `HELP_SYSTEM_V2.md` non esiste in nessuna forma: niente indizi progressivi, niente passaggio guidato, niente esercizio gemello, niente diagnosi dell'errore, niente recupero del prerequisito.
- Il "Diario di viaggio" mostra percentuali per modulo e i 5 errori più ripetuti, ma non collega nulla di questo a un'azione: non esiste mastery per skill, non esiste sessione consigliata, non esiste ripasso dilazionato.
- La copertura del programma è solidamente **ripasso scuola media**; mancano quasi per intero gli argomenti "ponte" verso la prima ITT Turismo (insiemi, monomi/polinomi, disequazioni, piano cartesiano, statistica).

---

## 1. Architettura dei contenuti

Ordine attuale in `data.js` (= ordine mostrato nella mappa "tappe"): `numeri → frazioni → potenze → algebra → equazioni → geometria`.

### 1.1 `numeri` — Numeri Interi e Razionali

- **Obiettivo didattico:** operare con numeri interi relativi (Z) e applicare l'ordine delle operazioni; introdurre i razionali (Q) solo per nome.
- **Prerequisiti (impliciti, non dichiarati nell'app):** concetto di numero, tabelline, divisione con resto, lettura della retta numerica.
- **Concetti introdotti:** numeri interi, regola dei segni (+/−, ×/:), ordine delle operazioni (parentesi → potenze → moltiplicazioni/divisioni → addizioni/sottrazioni), numeri razionali Q (solo nominati, mai esercitati come tali: nessun esercizio richiede di riconoscere o convertire un decimale in frazione in questo modulo).
- **Concetti usati ma non insegnati in questo modulo:** parentesi quadre e graffe annidate (usate in 8/12 esercizi difficili) — la teoria le nomina in un elenco ("Parentesi (tonde, poi quadre, poi graffe)") ma non c'è alcuna slide dedicata a *come* si risolve un annidamento, solo due esempi svolti che lo mostrano in azione senza spiegare la regola generale prima.
- **Collegamenti con altri moduli:** prerequisito trasversale per tutti i moduli successivi (segni e ordine delle operazioni ricorrono in frazioni, potenze, algebra, equazioni).

### 1.2 `frazioni` — Frazioni e Percentuali

- **Obiettivo didattico:** semplificare/sommare/confrontare frazioni; calcolare percentuali dirette e sconti.
- **Prerequisiti impliciti non soddisfatti:** MCD (per semplificare) e mcm (per il denominatore comune) sono **usati esplicitamente nel testo della teoria** ("di solito il minimo comune multiplo") ma **non sono mai definiti né in questo né in alcun altro modulo** della V1. È il gap di prerequisito più netto trovato nell'audit.
- **Concetti introdotti:** frazione come parte di un intero, semplificazione, addizione/sottrazione (stesso denominatore e denominatore diverso), moltiplicazione/divisione, percentuale come frazione su 100.
- **Concetto usato ma insegnato solo per un caso semplice:** la "variazione percentuale successiva" (aumento poi sconto, o sconto poi ulteriore sconto sul nuovo prezzo) è richiesta in **8 dei 12 esercizi di livello difficile**, ma la teoria mostra un solo esempio svolto di sconto singolo — mai una catena di due variazioni. Lo studente arriva al livello difficile senza aver mai visto un esempio guidato del meccanismo "sul nuovo prezzo, non su quello originale" che è proprio l'insidia concettuale di questi esercizi.
- **Problema di sequenza:** 2 esercizi difficili ("Chiama P il prezzo di vendita: 0,60 × P = 24€. Isola P.") richiedono di impostare e risolvere un'equazione di primo grado — tecnica insegnata solo nel modulo `equazioni`, che nella sequenza attuale viene **dopo** (tappa 5 contro tappa 2).
- **Collegamenti:** usa segni/ordine operazioni da `numeri`; anticipa (senza dichiararlo) una tecnica di `equazioni`.

### 1.3 `potenze` — Potenze e Radici

- **Obiettivo didattico:** calcolare potenze ed elevamenti, applicare le proprietà (prodotto/quoziente di potenze con stessa base, potenza di potenza), calcolare radici quadrate esatte.
- **Prerequisiti:** moltiplicazione ripetuta (spiegata), ordine delle operazioni (da `numeri`).
- **Concetti introdotti:** potenza/base/esponente, proprietà delle potenze, radice quadrata come operazione inversa.
- **Lacuna interna:** `a^0 = 1` è enunciato in teoria come "caso speciale" senza alcuna giustificazione (nessun collegamento con `a^n : a^n = a^(n-n) = a^0`, che pure la stessa slide ha appena mostrato per la divisione) — è esattamente il tipo di "regola mnemonica presentata come causa" che `PIANO_SVILUPPO_V2.md` §10.B vieta. Inoltre è **testato una sola volta** (1 domanda nel quiz, zero esercizi): un concetto introdotto ma quasi mai esercitato.
- **Collegamenti:** propedeutico a `algebra` (x²) e `geometria` (Pitagora, area del cerchio, lato da area).

### 1.4 `algebra` — Espressioni Algebriche

- **Obiettivo didattico:** introdurre le variabili, i termini simili, la semplificazione di espressioni, il calcolo del valore numerico.
- **Prerequisiti impliciti non costruiti:** la teoria introduce "lettere (dette variabili)" di sfuggita, in una sola frase, senza mai distinguere esplicitamente **variabile** da **incognita** (termine che comparirà nel modulo successivo, `equazioni`, senza essere mai messo in relazione col primo). "Coefficiente" e "termine" sono usati sistematicamente negli hint ("Somma i coefficienti...") ma **non sono mai definiti nella teoria di questo modulo** con quel nome — la teoria parla solo di "termini simili" e "il numero davanti".
- **Concetti introdotti:** variabile, termini simili, somma/sottrazione di termini simili, proprietà distributiva, valore numerico di un'espressione.
- **Formato:** unico modulo con una quota rilevante di esercizi `type: 'expr'` (16/36) — risposta come stringa algebrica normalizzata, non numero.
- **Skill sotto-rappresentata e critica:** la distributiva "doppia con segno" (es. `5(x−1) − 2(x+3)`) — il prerequisito diretto della skill dominante di `equazioni/difficile` — compare **una sola volta** in tutto il modulo (1/36 esercizi). È l'anello più debole della catena di prerequisiti verso il livello difficile di equazioni.
- **Collegamenti:** usa potenze (x²); propedeutico a `equazioni`.

### 1.5 `equazioni` — Equazioni di Primo Grado

- **Obiettivo didattico:** risolvere equazioni di primo grado a un'incognita.
- **Problema pedagogico centrale (vedi §3):** la teoria (slide "Come si risolve") introduce direttamente "si portano tutti i termini con la x da un lato e i numeri dall'altro, cambiando di segno ogni termine che 'cambia lato'" — la scorciatoia esplicitamente vietata da `PIANO_SVILUPPO_V2.md` §2.2 come prima spiegazione. La slide precedente ("I principi di equivalenza") enuncia in astratto che si può "sommare/sottrarre lo stesso numero a entrambi i membri", ma **non viene mai collegata operativamente** alla regola del cambio di segno: manca il passaggio esplicito "sottraggo lo stesso termine da entrambi i membri, poi semplifico" per almeno un esempio.
- **Prerequisiti impliciti non costruiti:** "primo membro"/"secondo membro" sono usati (nella slide "principi di equivalenza") senza mai essere definiti; "incognita" non è mai distinta da "variabile" (vedi 1.4).
- **Concetti introdotti:** equazione, principi di equivalenza (solo enunciati), tecnica "sposta e cambia segno", verifica della soluzione.
- **Concetto insegnato ma mai esercitato:** la "verifica della soluzione" ha una slide di teoria dedicata, ma **nessuno dei 36 esercizi** chiede esplicitamente di verificare una soluzione data (solo gli esempi svolti in teoria la mostrano).
- **Collegamenti:** usa la distributiva di `algebra` (sotto-rappresentata, vedi 1.4); non è propedeutico a nulla nella V1 (nessun modulo su disequazioni).

### 1.6 `geometria` — Geometria Piana

- **Obiettivo didattico:** calcolare perimetro/area delle figure piane principali, teorema di Pitagora, cerchio.
- **Prerequisiti:** potenze/radici quadrate (dichiarato correttamente in sequenza, essendo tappa 6 dopo `potenze`).
- **Concetti introdotti:** perimetro, area, formule per quadrato/rettangolo/triangolo/cerchio, teorema di Pitagora.
- **Lacuna:** il teorema di Pitagora è enunciato e applicato numericamente, ma non c'è **alcuna spiegazione visiva o intuitiva del perché** sia vero (nessun riferimento ai quadrati costruiti sui lati, richiesto esplicitamente come attività in `PIANO_SVILUPPO_V2.md` §5.9). Stessa lacuna di `equazioni`: regola calata dall'alto.
- **Mancano interamente:** angoli, classificazione di triangoli/quadrilateri, unità di misura ed equivalenze (un esercizio sulle piastrelle mescola m² e cm senza mai insegnare la conversione).
- **Collegamenti:** usa potenze/radici; ultimo modulo, non propedeutico ad altro nella V1.

---

## 2. Inventario delle skill

Tassonomia ricostruita per cluster di hint/struttura (vedi nota metodologica in apertura). "Esercizi" = conteggio sui 36 per modulo; "Quiz" = quante delle 10 domande del quiz finale del modulo testano quella skill (stima per somiglianza di formulazione).

### numeri
| Skill | Livello | Prerequisiti | Difficoltà reale | Formato | Esercizi | Quiz | Lacune |
|---|---|---|---|---|---|---|---|
| Regola dei segni (+,−,×,:) | facile | nessuno | 1 — riconoscimento | numeric/choice | 9 | ~6 | ok |
| Logica varia (sequenze, enigmi) | facile/medio/difficile | nessuno dichiarato | eterogenea, 1 esercizio unico per problema | numeric/choice | 2+4+4=10 | 0 | nessun esercizio gemello: se lo studente sbaglia un enigma non ha modo di riprovarne uno analogo |
| Ordine operazioni, parentesi tonde | medio | segni | 2 — applicazione | numeric | 8 | ~3 | ok |
| Ordine operazioni, parentesi annidate (quadre/graffe) | difficile | ordine op. tonde | 3 — integrazione | numeric | 8 | **0** | skill più difficile del modulo mai testata nel quiz finale |

### frazioni
| Skill | Livello | Prerequisiti | Difficoltà reale | Formato | Esercizi | Quiz | Lacune |
|---|---|---|---|---|---|---|---|
| Percentuale diretta di un numero | facile | moltiplicazione/divisione | 1 | numeric | 4 | ~3 | ok |
| Semplificazione frazione | facile | **MCD (mai insegnato)** | 1 | numeric | 2 | ~1 | prerequisito assente |
| Somma frazioni, stesso denominatore | facile | nessuno | 1 | numeric | 3 | ~2 | ok |
| Frazione di un numero (n/d di N) | medio | divisione | 2 | numeric | 3 | ~1 | ok |
| Sconto/risparmio percentuale | medio | perc. diretta | 2 | numeric | 2 | ~1 | ok |
| Somma frazioni, denominatore diverso | medio | **mcm (mai insegnato)** | 2 | numeric | 3 | ~2 | prerequisito assente |
| Problemi testuali misti (uno-off) | facile/medio | varie | eterogenea | numeric | 2+3=5 | ~1 | nessun gemello |
| Variazione percentuale successiva | difficile | perc. diretta, **mai una catena in teoria** | 3 | numeric | 8 | 0 | concetto sotto-spiegato, skill dominante del livello ma **assente dal quiz** |
| Percentuale inversa (isola l'incognita) | difficile | **equazioni (non ancora insegnate)** | 4 | numeric | 2 | 0 | prerequisito fuori sequenza |

### potenze
| Skill | Livello | Prerequisiti | Difficoltà reale | Formato | Esercizi | Quiz | Lacune |
|---|---|---|---|---|---|---|---|
| Potenza n-esima diretta | facile | moltiplicazione | 1 | numeric | ~4 | ~4 | ok |
| Radice quadrata di un quadrato perfetto | facile+medio | tabellina/quadrati | 1 (**identica nei due livelli**) | numeric | 4+4=8 | ~3 | vedi §4, cross-level duplicate |
| Prodotto/quoziente stessa base | medio | potenza diretta | 2 | numeric | 2 | ~1 | ok |
| Potenza di potenza | medio | prodotto stessa base | 2 | numeric | 2 | ~1 | ok |
| Problemi di crescita esponenziale (raddoppio) | facile/medio/difficile | potenza diretta | eterogenea, buona progressione reale (4→40→1023 viste) | numeric | ~6 | 0 | skill genuinamente ben graduata, ma mai in quiz |
| Espressioni miste potenze (prodotto + somma) | difficile | prodotto stessa base | 3 | numeric | 5 | 0 | ok ma sovra-rappresentata rispetto alle altre skill difficili |
| Proprietà del prodotto sotto radice | difficile | radice, prodotto potenze | 3 | numeric | 2 | 0 | ok |
| `a^0 = 1` | teoria | — | — | quiz only | 0 | 1 | introdotta ma non esercitata, non giustificata (vedi 1.3) |

### algebra
| Skill | Livello | Prerequisiti | Difficoltà reale | Formato | Esercizi | Quiz | Lacune |
|---|---|---|---|---|---|---|---|
| Somma termini simili | facile | **"coefficiente" mai definito** | 1 | expr | 7 | ~3 | terminologia non introdotta |
| Valore numerico, lineare | facile | sostituzione | 1 | numeric | 4 | ~2 | ok |
| Sottrazione termini simili | medio | somma termini simili | 2 | expr | 6 | ~2 | ok |
| Valore numerico con potenza (x²+cx) | medio | potenze | 2 | numeric | 2 | 0 | ok |
| Distributiva semplice, un solo prodotto | medio | termini simili | 2 | expr/numeric | 2 | ~2 | ok |
| Valore numerico con potenza e segno negativo | difficile | valore num. con potenza | 3 | numeric | 8 | ~1 | skill duplicata "a" vs "x" senza reale differenza cognitiva (vedi §4) |
| **Distributiva doppia con segno** (prerequisito diretto di equazioni/difficile) | difficile | distributiva semplice | 3-4 | expr | **1** | ~1 | fortemente sotto-rappresentata, vedi 1.4 |
| Problemi "pensa un numero" (algebra ricreativa) | facile/medio/difficile | variabile | eterogenea | numeric/choice | 3 | 0 | nessun gemello |

### equazioni
| Skill | Livello | Prerequisiti | Difficoltà reale | Formato | Esercizi | Quiz | Lacune |
|---|---|---|---|---|---|---|---|
| Operazione inversa singola (x+b=c, x−b=c, ax=b, x:a=b) | facile | nessuno dichiarato | 1, ma 4 operazioni diverse **sotto lo stesso hint generico** | numeric | 9 | ~5 | skill non distinta internamente |
| Problemi testuali → equazione semplice | facile/medio/difficile | traduzione testo→simbolo | eterogenea | numeric | 2+3+2=7 | 0 | nessun gemello, mai in quiz |
| Termini x su ambo i lati / distributiva semplice | medio | operazione inversa | 2 | numeric | 8 | ~4 | ok |
| Distributiva con termini su ambo i lati | difficile | **distributiva doppia (algebra, 1 solo es.)** | 3-4 | numeric | 8 | ~4 | prerequisito sotto-allenato a monte |
| Verifica della soluzione | teoria | — | — | — | **0** | 0 | insegnata ma mai esercitata |

### geometria
| Skill | Livello | Prerequisiti | Difficoltà reale | Formato | Esercizi | Quiz | Lacune |
|---|---|---|---|---|---|---|---|
| Area quadrato/rettangolo/triangolo | facile | moltiplicazione | 1 | numeric | 7 | ~4 | ok |
| Perimetro quadrato | facile | nessuno | 1 | numeric | 2 | ~1 | ok |
| Problemi vari (griglie, piscine) | facile/medio | area | eterogenea | numeric | ~3 | 0 | nessun gemello |
| Area/circonferenza cerchio | medio | potenze (r²), π come dato | 2 | numeric | 4 | ~2 | π non spiegato come concetto, solo fornito come valore |
| Pitagora, ipotenusa da due cateti | medio | radice quadrata | 2 | numeric | 2 | ~2 | ok |
| Lato da area (radice) | medio | radice | 2 | numeric | 2 | 0 | ok |
| Pitagora, cateto mancante | difficile | ipotenusa da cateti | 3 | numeric | 5 | 0 | sovra-rappresentata, quasi-duplicati (vedi §4) |
| Perimetro → costo | difficile | perimetro | 2-3 (non davvero "difficile") | numeric | 2 | 0 | numeri più grandi, non più passaggi — vedi §4 |
| Aree composte (L-shape, piastrellatura, corona circolare) | difficile | area, sottrazione di aree | 4 — genuino transfer | numeric | 3 | 0 | unica skill davvero "livello 4" del modulo, ma isolata e mai ripetuta |

---

## 3. Accuratezza della teoria

### 3.1 Concetti insufficientemente spiegati

- **Equazioni — "cambia lato, cambia segno"** (`equazioni`, slide "Come si risolve"). Presentata come procedura senza derivazione dal principio di equivalenza appena enunciato nella slide precedente. È l'esempio letterale usato in `PIANO_SVILUPPO_V2.md` §10 come caso da evitare.
- **Minimo comune multiplo** (`frazioni`, slide "Semplificare e confrontare" e "Operazioni con le frazioni"). Nominato due volte, mai definito, mai calcolato passo-passo in un esempio svolto.
- **Massimo comun divisore** (`frazioni`, semplificazione). Implicito nell'hint ("il loro massimo comun divisore") ma mai nominato nella teoria.
- **Variazione percentuale successiva** (`frazioni`, livello difficile). 8/12 esercizi la richiedono, la teoria la mostra zero volte in modo esplicito come schema generale (solo un singolo sconto).
- **Perché a^0 = 1** (`potenze`). Enunciato come "caso speciale", non derivato dalla proprietà del quoziente appena mostrata nella riga precedente della stessa slide.
- **Perché il teorema di Pitagora è vero** (`geometria`). Solo enunciato + applicazione numerica, nessun riferimento visivo ai quadrati costruiti sui lati.
- **Cosa sia π** (`geometria`). Fornito come "si usa solitamente π ≈ 3,14" senza dire che è un rapporto (circonferenza/diametro) o un numero con infinite cifre; per una studentessa che lo incontra la prima volta, π appare come una costante arbitraria da ricordare.

### 3.2 Prerequisiti mancanti (usati prima di essere costruiti)

| Concetto usato | Dove | Dovrebbe essere definito | Stato |
|---|---|---|---|
| mcm | `frazioni` teoria | prima di `frazioni` | mai definito in tutta la V1 |
| MCD | `frazioni` esercizi (hint) | prima di `frazioni` | mai definito |
| "coefficiente", "termine" (nome esplicito) | `algebra` hint | `algebra` teoria | usati solo negli hint, mai definiti nelle slide |
| "variabile" vs "incognita" | `algebra` → `equazioni` | `algebra` teoria | mai distinti esplicitamente |
| "primo membro"/"secondo membro" | `equazioni` teoria | `equazioni` teoria stessa | usati alla prima occorrenza senza definizione |
| Isolare un'incognita in un'equazione (0,60×P=24) | `frazioni` difficile | `equazioni` (tappa successiva) | richiesto 2 tappe prima di essere insegnato |
| Distributiva "doppia" con segno negativo davanti a due parentesi | `equazioni` difficile (8 esercizi) | `algebra` (dove compare 1 sola volta) | sotto-allenato a monte |

### 3.3 Scorciatoie introdotte troppo presto

- "Cambia lato, cambia segno" (equazioni) — vedi 3.1, il caso più grave.
- Regola dei segni per moltiplicazione/divisione presentata come tabella da memorizzare ("segni uguali → +, segni diversi → −") senza un singolo esempio che ne mostri la coerenza con l'addizione ripetuta (es. perché (−3)×2 = −6 collegato a "−3 sommato due volte"). Non è un errore, ma è un'occasione mancata di costruire la regola invece di enunciarla — coerente con lo spirito (non la lettera) del vincolo V2.

### 3.4 Terminologia poco rigorosa

- "I numeri crescono andando verso destra" (numeri, slide 1): corretto ma mai collegato esplicitamente al concetto di "maggiore di" per numeri negativi, che è proprio il punto concettualmente delicato per chi ha appena imparato i negativi.
- "Radice quadrata √x... risponde alla domanda 'quale numero moltiplicato per sé stesso dà x?'" (potenze): tecnicamente incompleta (andrebbe specificato "quale numero **non negativo**", dato che sia 4 che −4 al quadrato danno 16) — irrilevante per gli esercizi attuali (sempre positivi) ma un'imprecisione che si porterebbe dietro se in futuro si toccassero i numeri reali.
- "Un'equazione è un'uguaglianza... che contiene un'incognita" (equazioni): corretto, ma la parola "incognita" non era mai comparsa prima in tutta l'app (in `algebra` si è sempre parlato di "variabile") — la studentessa incontra un sinonimo non dichiarato come tale.

### 3.5 Esempi ambigui o mal calibrati

- Nessun esempio francamente errato o matematicamente scorretto è stato trovato (il vincolo "correttezza matematica" del gate A sembra rispettato — coerente con la garanzia "generato per costruzione" di `scripts/gen_exercises.js` per i contenuti generati, e con revisione manuale per quelli storici).
- Esempio **troppo facile per il livello dichiarato**: in `potenze/medio`, "Radice quadrata di 100 = ?" è testualmente identica a un esercizio di `potenze/facile` (vedi §4, duplicato esatto).
- Esempio **troppo difficile per il livello dichiarato**: in `equazioni/facile`, l'ultimo esercizio della lista logica ("Alberto ha una caramella in più di Marco...") richiede di impostare un sistema a tre incognite espresse in funzione di una sola variabile — cognitivamente più vicino a un livello 3 (integrazione) che a un livello 1 (riconoscimento), pur restando nel bucket "facile".

---

## 4. Progressione della difficoltà

Verifica facile → medio → difficile per anomalie concrete (non solo "i numeri sono più grandi").

| Modulo | Esercizio/gruppo | Motivazione | Proposta di correzione |
|---|---|---|---|
| potenze | "Radice quadrata di 100 = ?" in facile **e** medio | Duplicato esatto testuale, stesso identico esercizio in due livelli diversi | Sostituire l'occorrenza in `medio` con un quadrato meno immediato (es. 169, 196, già presenti altrove nel pool) o rimuoverla |
| potenze | Radice quadrata di quadrati perfetti (9,16,36,100 in facile; 64,100,169,196 in medio) | Stessa identica skill e stessa struttura testuale in due livelli; la sola differenza è la dimensione del numero, non la complessità cognitiva — esattamente l'anti-pattern vietato da `PIANO_SVILUPPO_V2.md` §2.3/§9 | Nel livello `medio`, sostituire con una skill di livello 2 reale (es. radice di un prodotto, o radice + operazione) invece di ripetere l'identica skill del facile |
| frazioni | Somma frazioni stesso denominatore (7/8+1/8 ecc. in facile; 1/2+5/6, 1/2+3/4 in medio) | Le occorrenze in "medio" (1/2+5/6, 1/2+3/4, 1/2+1/6) sono in realtà denominatori **diversi**, quindi la skill è corretta; ma la formulazione testuale è indistinguibile da quella del facile e non è segnalato in alcun modo (né UI né hint) *perché* è più difficile | Aggiungere nell'hint del livello medio un richiamo esplicito al passaggio in più ("trova prima il denominatore comune, poi somma") per marcare la differenza, oggi implicita |
| algebra | Valore numerico con potenza e segno (8 esercizi difficile, stessa skill ripetuta su variabile `a` e su `x`) | Cambiare il nome della variabile non aumenta la difficoltà cognitiva: sono 8 varianti della stessa unica skill presentata come fosse piena copertura del livello difficile | Diversificare realmente: aggiungere varianti con parentesi, con due variabili, o con un passaggio di distributiva in più (collegandosi alla lacuna di 1.4) |
| geometria | Perimetro→costo recinzione (2 esercizi difficile) | Un solo passaggio in più (moltiplicare per il costo al metro) rispetto al perimetro semplice del livello facile; classificato "difficile" solo perché i numeri sono più grandi (16×5, 10×14) | Riclassificare come "medio", o aggiungere un vincolo che lo renda davvero di livello 3 (es. sconto sul materiale, area vs perimetro da scegliere) |
| geometria | Pitagora, cateto mancante (5 esercizi difficile, stessa struttura, terne pitagoriche diverse) | Stessa skill già presente in `medio` (ipotenusa da cateti) con l'incognita spostata; corretto come "un passaggio cognitivo in più" (livello 2), ma la sovra-rappresentazione (5/12 del livello difficile) squilibra il livello a scapito di skill di transfer più alte (aree composte, presenti solo 3 volte) | Ridurre a 2-3 occorrenze, redistribuire lo spazio verso problemi di area composta o applicativi |
| equazioni | Ultimo esercizio logico di `facile` (caramelle a tre persone) | Cognitivamente più vicino a un livello 3 (impostazione di più relazioni contemporanee) che al livello 1 dichiarato | Spostare a `medio` o riformulare con una sola relazione |

**Nota generale.** Le anomalie sopra sono i casi più netti; il quadro complessivo (§5) mostra che il 38% degli esercizi sono varianti puramente numeriche della stessa struttura — non tutte sono anomalie di progressione (ripetere una skill di livello 1 più volte nello stesso livello è normale e desiderabile per l'automatizzazione), ma le **2 famiglie cross-livello** individuate sopra (radice quadrata, somma frazioni) sono i casi in cui la ripetizione attraversa il confine di difficoltà senza reale salto di complessità.

---

## 5. Analisi quantitativa

Fonte: script Node che carica `MODULES` via `vm` (stesso pattern usato da `scripts/build_data.js`) ed esegue conteggi/pattern-matching sulle stringhe delle domande. Nessuna modifica ai file del progetto.

### 5.1 Totali

| Metrica | Valore |
|---|---|
| Moduli | 6 |
| Esercizi totali | 216 (36 per modulo, fissi) |
| Quiz totali | 60 (10 per modulo, fissi) |
| Esercizi per livello (facile / medio / difficile) | 72 / 72 / 72 — perfettamente equidistribuiti per costruzione, non per esigenza pedagogica |

### 5.2 Distribuzione dei formati (su 216 esercizi)

| Formato | Conteggio | % |
|---|---|---|
| `numeric` (risposta numerica) | 196 | 90,7% |
| `expr` (espressione algebrica normalizzata) | 16 | 7,4% — tutti in `algebra` |
| `choice` (scelta multipla inline) | 4 | 1,9% — sparsi in `numeri`(1), `algebra`(1), `equazioni`(1), più eventuali altri |

Nessun esercizio usa un formato diverso da questi tre. Il quiz finale (60 domande) è **sempre** `choice` per definizione del formato quiz. In totale, su 276 interazioni valutative (216 esercizi + 60 quiz), **≥ 232 (84%)** sono scelta multipla o input numerico a risposta singola — coerente con la diagnosi di `PIANO_SVILUPPO_V2.md` §2.1 ("nessun modulo... deve essere composto soltanto da teoria swipe + esercizi con input + quiz": nella V1 lo è, per tutti e 6 i moduli).

### 5.3 Esercizi "logica" (badge 🧠)

| Modulo | Facile | Medio | Difficile | Totale |
|---|---|---|---|---|
| numeri | 2 | 3 | 4 | 9 |
| frazioni | 1 | 1 | 1 | 3 |
| potenze | 1 | 2 | 1 | 4 |
| algebra | 1 | 2 | 1 | 4 |
| equazioni | 2 | 3 | 2 | 7 |
| geometria | 1 | 2 | 1 | 4 |
| **Totale** | | | | **31/216 (14,4%)** |

Questi esercizi sono quasi sempre **unici** (nessun esercizio gemello nello stesso modulo/livello): se sbagliati, lo studente non ha modo di riprovarne uno strutturalmente simile.

### 5.4 Duplicati esatti

**1 duplicato esatto trovato**: `"Radice quadrata di 100 = ?"` compare identica in `potenze/facile` (indice 1) e `potenze/medio` (indice 2), stessa domanda, stessa risposta.

### 5.5 Quasi-duplicati ("cosmetici": stessa struttura testuale, cambiano solo i numeri)

Metodo: normalizzazione del testo della domanda sostituendo ogni numero con un segnaposto, raggruppamento per struttura risultante.

| Metrica | Valore |
|---|---|
| Esercizi coinvolti in almeno un gruppo di quasi-duplicati | 83 / 216 (**38%**) |
| Gruppi di quasi-duplicati (≥2 occorrenze) | 44 |
| Gruppo più numeroso | "Radice quadrata di N" (`potenze`), 8 occorrenze tra facile e medio |
| Gruppi che attraversano il confine di livello (stessa struttura in 2 livelli diversi) | **2** (radice quadrata in potenze; somma frazioni in frazioni — dettaglio in §4) |

Per modulo:

| Modulo | Esercizi in gruppi quasi-duplicati | Gruppi |
|---|---|---|
| numeri | 14/36 | 8 |
| frazioni | 17/36 | 7 |
| potenze | 18/36 | 6 |
| algebra | 10/36 | 7 |
| equazioni | 10/36 | 7 |
| geometria | 14/36 | 9 |

**Lettura.** Non tutta questa ripetizione è un problema: esercitare più volte la stessa skill di livello 1 con numeri diversi (es. 4 esercizi "regola dei segni" nello stesso livello facile) è normale automatizzazione. Il problema pedagogico reale è ristretto ai 2 gruppi cross-livello (§4) e, più in generale, alla **dimensione** del fenomeno: quasi 4 esercizi su 10 sono variazioni puramente numeriche della stessa frase, il che conferma quantitativamente la preoccupazione di `PIANO_SVILUPPO_V2.md` §8 ("evitare duplicati cosmetici in cui cambiano soltanto due numeri") — riconducibile allo spazio di pattern ristretto dei generatori in `scripts/gen_exercises.js` (es. `genPotenzeFacile` ha solo 2 "mode", `genGeometriaFacile` solo 4 "pattern").

### 5.6 Esercizi per skill

Vedi tabelle dettagliate in §2 (colonna "Esercizi"). In sintesi, la distribuzione **non è uniforme tra skill**: alcune skill hanno 8-9 occorrenze (es. "distributiva con termini ambo i lati" in equazioni/difficile) mentre skill altrettanto o più importanti ne hanno 1 (es. "distributiva doppia con segno" in algebra/difficile, prerequisito diretto della prima).

---

## 6. Analisi dell'esperienza utente

Basata sulla lettura di `app.js` (state machine, rendering, gestione eventi) e `styles.css`.

- **Schermate troppo lunghe:** non presenti in senso stretto — ogni vista (`renderExerciseQuestion`, `renderQuiz`, ecc.) mostra una sola domanda alla volta, coerente con "mobile-first reale". Le uniche schermate potenzialmente dense sono le cartoline di teoria con `type:'steps'` quando tutti i passaggi sono rivelati (fino a 4 blocchi di testo impilati in un'unica card).
- **Eccesso di swipe:** la teoria è **sempre e solo** un mazzo di 6 cartoline scorrevoli (swipe orizzontale via `bindTheorySwipe`), per tutti e 6 i moduli, senza eccezioni. È esattamente il pattern "teoria = sequenza di cartoline da scorrere" segnalato come monotono in `PIANO_SVILUPPO_V2.md` §2.1. Non c'è alcuna modalità di teoria alternativa (interattiva, manipolativa) in tutta la V1.
- **Interazioni ripetitive:** il ciclo esercizio è identico per tutti i 216 esercizi — leggi domanda, digita/scegli risposta, "Controlla", leggi feedback, "Avanti". L'unica variazione di formato è `choice` vs input numerico. Nessuna interazione di tipo drag/tap-to-place/costruzione esiste nella V1.
- **Punti di possibile blocco:**
  - Nel modulo `equazioni`, uno studente che non ha interiorizzato "cambia lato, cambia segno" (perché mai derivato, vedi §3) non ha alcuna via di recupero interna all'esercizio: l'unico aiuto è l'hint statico, che ripete la stessa istruzione procedurale della teoria, non la spiega diversamente.
  - `checkCurrentAnswer()` (app.js:160-170): se l'input è vuoto, la funzione fa solo `focus()` e ritorna, senza alcun messaggio — uno studente che preme "Controlla" a vuoto non riceve alcun feedback visibile sul perché non è successo nulla.
  - La tolleranza dell'1% relativo in `checkAnswer` (per arrotondamenti) potrebbe generare un falso "corretto" per errori di battitura vicini al valore giusto, o viceversa un falso "sbagliato" percepito come ingiusto su numeri piccoli dove l'1% relativo è inferiore alla tolleranza assoluta minima (0,01) — comportamento corretto per il caso d'uso attuale, ma non spiegato mai allo studente (nessun messaggio "risposta quasi giusta, controlla gli arrotondamenti").
- **Assenza di feedback (oltre corretto/sbagliato):** il feedback è binario (✅/❌) più, in caso di errore, la sola risposta corretta mostrata in chiaro (`renderExerciseQuestion`, blocco `feedbackBlock`). Non c'è mai spiegazione del *perché* la risposta data era sbagliata, né in quale passaggio.
- **Assenza di attività manipolative:** confermata al 100% — zero interazioni diverse da tap su bottone/opzione e digitazione testo in tutta l'app.
- **Punto positivo da preservare:** la delega di eventi via `data-action` e il pattern `render()` a innerHTML singolo (senza framework) sono una base tecnica solida e già pronta ad accogliere nuovi tipi di vista (`state.view` è già uno switch estendibile) — un vincolo tecnico basso per l'introduzione futura di nuove interazioni, purché implementate nello stesso stile.

---

## 7. Sistema di aiuto

Confronto diretto tra lo stato attuale (`app.js` + `data.js`) e la scala descritta in `HELP_SYSTEM_V2.md`.

| Livello richiesto da `HELP_SYSTEM_V2.md` | Presente in V1? |
|---|---|
| Livello 0 — tentativo autonomo | Sì (comportamento di default) |
| Livello 1 — piccolo indizio | **Parzialmente**: esiste un solo campo `ex.hint`, statico, uguale per ogni esercizio della stessa skill (es. tutti i 9 esercizi "regola dei segni" di `numeri/facile` condividono la stessa identica stringa di hint) |
| Livello 2 — richiamo della regola | **No**: l'hint unico spesso *è già* il richiamo della regola (non c'è gradualità tra "piccolo indizio" e "regola esplicita") |
| Livello 3 — primo passaggio risolto | **No**: non esiste in nessun esercizio |
| Livello 4 — passaggio guidato completo | **Parzialmente, ma solo in teoria**: le slide `type:'steps'` (2 per modulo, sempre gli "esempi svolti") mostrano un walkthrough completo, ma sono slegate dagli esercizi — non è possibile, bloccati su un esercizio specifico, chiedere "mostrami un esempio guidato di questo tipo" |
| Livello 5 — soluzione completa | **Parzialmente**: dopo un errore viene mostrata la risposta finale corretta, ma **mai i passaggi** per arrivarci |
| Livello 6 — esercizio gemello immediato | **No**: non esiste in nessuna forma; `exerciseNext()` avanza sempre all'esercizio successivo della lista fissa, indipendentemente da correttezza o richiesta |

- **Qualità degli hint:** corretti matematicamente, ma **generici e non progressivi** — spesso ripetono la regola già letta in teoria invece di dare un indizio graduale (violando lo spirito, se non la lettera, del principio "wrong → understand → repair → verify → continue" di `HELP_SYSTEM_V2.md`, che nella V1 è di fatto "wrong → reveal answer → continue").
- **Coerenza degli esempi:** gli esempi svolti in teoria (`type:'steps'`) sono coerenti e ben scelti, ma **non sono mai richiamati** dal motore di aiuto durante l'esercizio (nessun collegamento dati tra una slide di teoria e un esercizio specifico).
- **Assenza di spiegazioni progressive:** confermata — `state.exHintVisible` è un booleano, non un contatore di livello; `showHint()` mostra sempre e solo l'unico `ex.hint` disponibile.
- **Assenza di recupero dei prerequisiti:** confermata — nessun collegamento dati tra un esercizio e un prerequisito esplicito (perché tale collegamento, come notato in §1 e §3.2, non esiste nemmeno concettualmente in `data.js`).
- **Assenza di esercizi gemelli:** confermata — nessun campo o meccanismo che leghi due esercizi come "varianti della stessa skill" a runtime; l'unico modo per uno studente di rifare un esercizio simile è tornare indietro e ripetere l'intero livello.
- **Assenza di diagnosi dell'errore:** confermata — `checkAnswer()` restituisce solo un booleano; non esiste alcuna logica di classificazione dell'errore (es. "hai sbagliato il segno" vs "hai sbagliato il calcolo"), né un campo `commonErrors` in `data.js`.
- **Regola di regressione** (`HELP_SYSTEM_V2.md`, "se lo studente sbaglia ripetutamente, fermare la progressione e proporre un recupero"): **assente**. `openExercises()` sceglie il primo livello non completato in base a `progress[id].exercises[level]` (booleano di completamento, non di padronanza), quindi uno studente che sbaglia 10 esercizi su 12 in un livello lo vede comunque segnato "completato" e passa al successivo senza alcun intervento.
- **Mastery tracking:** `computeStats()` calcola solo una percentuale aggregata per modulo (corretti/tentativi), non per skill, non pesata per recenza/difficoltà/uso di hint come richiesto da `PIANO_SVILUPPO_V2.md` §7.1.

---

## 8. Copertura del programma

Seguendo la distinzione richiesta da `PIANO_SVILUPPO_V2.md` §3.1 (Percorso A — Fondamenta/ripasso pre-superiori vs Percorso B — Ponte prima superiore) più il programma tipico ITT Turismo.

### 8.1 Percorso A — Ripasso scuola media (Fondamenta)

| Argomento | Presente in V1? |
|---|---|
| Numeri interi, segni, ordine operazioni | ✅ (`numeri`) |
| Frazioni: semplificazione, operazioni | ✅ (`frazioni`), ma **manca mcm/MCD come concetto esplicito** (§3.2) |
| Percentuali dirette e sconti | ✅ (`frazioni`) |
| Percentuale inversa / variazioni successive | ⚠️ presente solo negli esercizi difficili, non insegnata (§3.1) |
| Potenze e radici (basi numeriche) | ✅ (`potenze`) |
| Geometria: perimetro/area figure principali, Pitagora | ✅ (`geometria`), ma solo formule, non proprietà/angoli |
| Divisibilità, numeri primi, scomposizione, MCD/mcm | ❌ assente |
| Rapporti e proporzioni | ❌ assente (un solo esercizio isolato di proporzionalità diretta in `frazioni/facile`, i boscaioli, mai generalizzato a teoria) |
| Proporzionalità diretta/inversa come concetto | ❌ assente |
| Unità di misura ed equivalenze | ❌ assente |
| Media, mediana, moda, frequenze | ❌ assente |
| Piano cartesiano di base | ❌ assente |
| Angoli, classificazione triangoli/quadrilateri | ❌ assente |
| Problem solving testuale, traduzione linguaggio naturale → modello | ⚠️ presente in modo sparso (i problemi a tema turismo/logica), mai come skill esplicita e progressiva |

**Valutazione:** buona base ma incompleta. mcm/MCD, proporzioni e unità di misura sono i gap più urgenti perché già **presupposti implicitamente** dagli esercizi esistenti.

### 8.2 Percorso B — Ponte prima superiore

| Argomento | Presente in V1? |
|---|---|
| Linguaggio algebrico: variabile, coefficiente, termine | ⚠️ presente ma non definito esplicitamente (§3.2) |
| Espressioni algebriche, termini simili | ✅ (`algebra`) |
| Equazioni di primo grado | ✅ (`equazioni`), con la riserva pedagogica di §3.1 |
| Insiemi e operazioni tra insiemi | ❌ assente |
| Monomi (coefficiente/parte letterale/grado) come concetto formale | ❌ assente (algebra V1 non usa mai il termine "monomio" né "grado") |
| Polinomi come concetto formale | ❌ assente (si opera su espressioni, mai nominate "polinomio" salvo un hint) |
| Disequazioni di primo grado | ❌ assente |
| Piano cartesiano | ❌ assente |
| Relazione/funzione | ❌ assente |
| Retta (pendenza/intercetta intuitive) | ❌ assente |
| Statistica descrittiva | ❌ assente |

**Valutazione:** il Percorso B è quasi interamente da costruire. La V1 copre solo i primi due argomenti della lista (algebra base ed equazioni), che sono comunque un buon punto di partenza avendo già ricevuto attenzione.

### 8.3 Argomenti ridondanti o da spostare

- Nessun argomento è chiaramente ridondante nella V1 attuale (la copertura è scarsa, non eccessiva).
- **Da spostare:** i 2 problemi di "percentuale inversa" in `frazioni/difficile` (richiedono di isolare un'incognita) — da spostare dopo `equazioni`, oppure da riformulare senza richiedere esplicitamente la tecnica algebrica (es. per tentativi/ragionamento proporzionale).

---

## 9. Nuove interazioni — valutazione di fattibilità

Contesto tecnico: nessun framework, nessuna dipendenza esterna, un solo file `app.js` con state machine a `switch(state.view)` e delega eventi su `data-action`. Il pattern pointer-based già usato per lo swipe della teoria (`bindTheorySwipe`, `pointerdown/pointermove/pointerup`) è un precedente diretto riusabile per qualunque interazione trascinabile — evita di introdurre l'HTML5 Drag&Drop API nativa, che ha supporto touch scarso su iOS Safari.

| Componente | Complessità | Impatto didattico | Rischi | Priorità |
|---|---|---|---|---|
| Bilancia delle equazioni | Alta (animazione a due piatti, sincronizzata con lo stato dell'equazione, SVG/CSS) | Molto alto — risolve direttamente il problema pedagogico più grave individuato (§3.1) | Deve restare comprensibile su schermo iPhone piccolo; rischio di animazioni che rallentano invece di chiarire | **Alta** |
| Tap-to-place | Bassa-media (variante accessibile senza drag reale: tocca sorgente, poi tocca destinazione) | Alto — è il prerequisito di accessibilità richiesto esplicitamente da `PIANO_SVILUPPO_V2.md` §13 per ogni drag-and-drop | Nessuno rilevante | **Alta** (da implementare comunque, in parallelo a qualsiasi drag) |
| Drag and drop (puro, no tap alternativo) | Media (pointer events, già un precedente nel codice) | Nullo se non accompagnato da tap-to-place (violerebbe il vincolo di accessibilità del piano) | Precisione touch su iPhone, necessità di alternativa obbligatoria | Media, **solo se accoppiato a tap-to-place** |
| Costruzione delle espressioni (blocchi tappabili) | Media (nuovo tipo di vista + stato per blocchi disponibili/posizionati) | Alto — allena la traduzione testo→modello, oggi assente come skill esplicita | Validazione di espressioni equivalenti ma scritte in ordine diverso (richiede normalizzazione, già esistente in `normalizeExpr`) | Alta |
| Riordino dei passaggi | Bassa-media (lista tappabile con frecce su/giù invece di drag, più semplice e già accessibile) | Alto — misura comprensione del processo, non solo del risultato | Nessuno rilevante | Alta |
| Ricerca dell'errore ("caccia all'errore") | Bassa (nuovo `type` di esercizio: testo con passaggi + scelta di quale è sbagliato) | Molto alto — esplicitamente citato come prioritario in `PIANO_SVILUPPO_V2.md` §5.10 e `HELP_SYSTEM_V2.md`; il più economico da costruire tecnicamente | Richiede contenuto nuovo (soluzioni sbagliate plausibili) per ogni skill — costo di autoria, non di codice | **Alta**, ottimo rapporto costo/beneficio |
| Frazioni visuali (barre/pizza) | Media (SVG o CSS grid per rappresentare parti) | Alto per il modulo `frazioni`, specialmente per mcm/denominatore comune (gap individuato in §3.2) | Nessuno rilevante | Alta |
| Percentuali visuali (griglia 10×10) | Bassa (CSS grid, nessuna libreria) | Alto, economico | Nessuno rilevante | Alta, ottimo rapporto costo/beneficio |
| Geometria interattiva (trascina base/altezza, scomponi figure) | Alta (richiede coordinate, hit-testing su griglia, più stato) | Alto ma il modulo geometria è già relativamente solido (§8) | Rischio maggiore di bug su gesture touch imprecise; superficie di test più ampia | Media |
| Tutor adattivo | Media (nessuna UI complessa, solo logica su `history` già esistente in `localStorage`) | Molto alto, ma dipende dai metadati skill che oggi non esistono (§2) | Rischio di stime di mastery fuorvianti con pochi tentativi (esplicitamente citato come rischio da evitare in `PIANO_SVILUPPO_V2.md` §7.1) | Alta, ma **bloccata** dall'introduzione preventiva dei metadati skill (FASE 4 prima di FASE 5 nel piano) |

---

## 10. Top 20 interventi

Ordinati per impatto didattico atteso, in linea con le priorità dichiarate in `PIANO_SVILUPPO_V2.md` §17 (accuratezza teoria/prerequisiti → progressione difficoltà → interazioni → diagnosi errore → banca esercizi → tutor adattivo → copertura programma).

| # | Intervento | Beneficio didattico | Impatto tecnico | Rischio regressione | Priorità |
|---|---|---|---|---|---|
| 1 | Riscrivere la teoria di `equazioni` (slide "Come si risolve"): introdurre prima il principio di equivalenza applicato esplicitamente ("sottraggo lo stesso termine da entrambi i membri"), poi la scorciatoia dichiarata come tale | Molto alto — risolve il problema pedagogico più grave del progetto | Solo contenuto testuale | Basso | **Critica** |
| 2 | Definire esplicitamente in teoria: variabile, incognita, coefficiente, termine, primo/secondo membro (anche solo come paragrafo aggiuntivo, prima di un vero glossario interattivo) | Alto — chiude 5 gap di prerequisito individuati in §3.2 | Solo contenuto | Basso | **Critica** |
| 3 | Insegnare mcm e MCD prima o dentro `frazioni`, con un esempio svolto | Alto — chiude il gap di prerequisito più netto trovato | Solo contenuto (nuova slide) | Basso | **Critica** |
| 4 | Correggere il duplicato esatto "Radice quadrata di 100" (facile=medio, `potenze`) | Medio — bug di progressione concreto e facilmente riproducibile | Minimo (modifica 1 esercizio in `data.js`) | Basso, ma **richiede comunque una modifica di data.js**, fuori scope di questo audit | Alta |
| 5 | Insegnare esplicitamente lo schema "variazione percentuale successiva" prima del livello difficile di `frazioni` (dove è richiesto 8 volte) | Alto — chiude il gap teoria/esercizi più squilibrato quantitativamente | Solo contenuto | Basso | Alta |
| 6 | Spostare o riformulare i 2 problemi "percentuale inversa" di `frazioni/difficile` che richiedono equazioni non ancora insegnate | Medio-alto — corregge una violazione di sequenza prerequisiti | Richiede editing contenuti o riordino moduli | Basso-medio (riordino moduli tocca la UI "mappa tappe") | Alta |
| 7 | Aumentare gli esercizi sulla skill "distributiva doppia con segno" in `algebra/difficile` (oggi 1/36) per allenare davvero il prerequisito di `equazioni/difficile` (8/36) | Alto — corregge lo squilibrio prerequisito→uso più netto trovato in §2 | Contenuto (nuovi esercizi, generabile con lo script esistente) | Basso | Alta |
| 8 | Aggiungere almeno un esercizio "verifica la soluzione" in `equazioni`, oggi insegnato in teoria ma mai esercitato | Medio — chiude un gap teoria-insegnata/mai-testata | Contenuto | Basso | Media-alta |
| 9 | Spiegare il perché di `a^0=1` collegandolo alla proprietà del quoziente già mostrata nella stessa slide | Medio — corregge una "regola calata dall'alto" (gate B del piano) | Solo contenuto | Basso | Media-alta |
| 10 | Aggiungere una spiegazione visiva/intuitiva del teorema di Pitagora (quadrati sui lati) | Medio-alto — prepara il terreno per la futura "geometria manipolativa" | Contenuto + eventuale grafica statica (nessuna interazione richiesta per il minimo) | Basso | Media |
| 11 | Introdurre nel quiz finale di `numeri` almeno una domanda sulle parentesi annidate (oggi assenti nel quiz nonostante siano la skill del livello difficile) | Medio — allinea la verifica finale alla difficoltà reale del percorso | Contenuto | Basso | Media |
| 12 | Introdurre i metadati `skill`/`difficulty`/`cognitiveType` per esercizio (schema `PIANO_SVILUPPO_V2.md` §6), inizialmente solo come dati non ancora usati dalla UI | Alto — precondizione tecnica per audit automatici, mastery per skill, tutor adattivo | Medio (tocca la struttura dati, non il rendering) | Medio — richiede attenzione a non rompere `checkAnswer`/progress esistenti | Alta (abilitante, non urgente di per sé) |
| 13 | Sostituire l'hint singolo con almeno 2 livelli (indizio leggero + regola esplicita) per le skill più critiche (equazioni, distributiva) come primo passo verso la scala a 6 livelli di `HELP_SYSTEM_V2.md` | Alto — riduce il divario più ampio rispetto a un documento guida | Medio (nuovo campo dati + piccola logica UI, non richiede nuovo framework) | Basso-medio | Alta |
| 14 | Introdurre un "esercizio gemello" minimo (anche solo 1 variante con numeri diversi) per le skill logic/word-problem oggi senza alcun duplicato | Medio-alto — chiude il gap "nessun recupero" più diffuso nell'app | Contenuto + piccola logica di selezione | Basso | Media |
| 15 | Nel Diario, collegare "argomenti da ripassare" (già calcolato in `computeStats`) a un'azione concreta (es. bottone "Riprova questi 5 errori"), invece di sola visualizzazione passiva | Alto — primo passo minimo di tutor adattivo senza richiedere il mastery model completo | Medio (nuova vista + piccola logica di filtro sullo storico già esistente) | Basso | Alta |
| 16 | Spiegare esplicitamente in teoria cosa sia π (rapporto circonferenza/diametro) invece di fornirlo come costante da usare | Basso-medio | Solo contenuto | Basso | Bassa-media |
| 17 | Aggiungere una spiegazione/derivazione minima anche per la regola dei segni (numeri) collegandola all'addizione ripetuta | Basso-medio | Solo contenuto | Basso | Bassa-media |
| 18 | Rendere le slide "steps" (esempio svolto) verificabili con una micro-domanda finale, invece di considerare "teoria vista" al solo click su "Vai agli esercizi" | Medio — comincia a rispondere al vincolo "la comprensione va controllata con micro-interazioni non punitive" (piano §4) | Medio (nuovo tipo di slide + stato) | Medio | Media |
| 19 | Introdurre "ricerca dell'errore" come nuovo `type` di esercizio, partendo da equazioni e algebra (dove i passaggi sono già naturalmente sequenziali) | Alto, costo tecnico basso (§9) | Medio (nuovo tipo di esercizio + rendering dedicato) | Medio | Alta (primo esperimento di interazione oltre lo swipe) |
| 20 | Introdurre percentuali visuali (griglia 10×10) come prima interazione manipolativa reale, per il rapporto costo/beneficio più favorevole tra le opzioni di §9 | Alto, costo tecnico basso | Medio (nuova vista, CSS grid, nessuna dipendenza) | Medio | Alta |

---

## Rischi tecnici e di regressione da tenere presenti in FASE 1+

- `data.js` non ha versionamento dello schema: qualunque nuovo campo (`skill`, `hintSteps`, ecc.) deve essere **additivo e opzionale**, altrimenti rischia di rompere `checkAnswer()`/`normalizeNumber()`/`normalizeExpr()` che oggi leggono solo `answer`, `type`, `options`, `correct`.
- `progress` e `history` in `localStorage` non hanno migrazione (per esplicita scelta architetturale, vedi `CLAUDE.md`): qualunque cambio di forma del progresso per modulo (es. per introdurre mastery per skill) richiede bump della chiave (`-v2`) e comporta **perdita silenziosa dei progressi attuali** se non gestito — da pianificare esplicitamente prima di toccare `STORAGE_KEY`/`HISTORY_KEY`.
- `sw.js` cachea in modo cache-first: ogni modifica futura, anche solo di contenuto, richiede il bump di `CACHE_NAME` (regola già documentata in `CLAUDE.md`, da non dimenticare quando si passerà all'implementazione).
- Il duplicato esatto individuato al punto 4 di §10 e i due gruppi cross-livello di §4 sono correzioni puntuali a basso rischio, ma **richiedono comunque una modifica di `data.js`**: sono fuori dal perimetro di questo audit (che non modifica contenuti) e vanno programmati come primo intervento chirurgico della FASE 1.

## Piano di test suggerito prima di qualunque modifica ai contenuti

1. Rieseguire il self-consistency check descritto in `CLAUDE.md` (carica `MODULES` via `vm`, verifica che ogni `answer`/`choice.correct`/`quiz.correct` sia valido) dopo ogni modifica, non solo alla fine.
2. Rieseguire lo script di analisi quasi-duplicati usato per §5 dopo ogni batch di nuovi esercizi, per evitare di reintrodurre lo stesso pattern di ripetizione cosmetica.
3. Per ogni nuova skill (Definition of Done, `PIANO_SVILUPPO_V2.md` §15): verificare manualmente che almeno un esempio guidato in teoria preceda il primo esercizio che la richiede (oggi non è così per mcm, variazione percentuale successiva, distributiva doppia).
4. E2E via Chrome DevTools Protocol (pattern già descritto in `CLAUDE.md`) su almeno un modulo per verificare che il nuovo contenuto non rompa il rendering su viewport iPhone.

---

## Proposta di nuova sequenza dei moduli (da valutare, non implementata)

L'ordine attuale (`numeri → frazioni → potenze → algebra → equazioni → geometria`) genera la violazione di prerequisito di §1.2/§3.2 (frazioni/difficile richiede tecniche di equazioni). Sequenza alternativa che rispetta le dipendenze reali individuate in questo audit:

`numeri → potenze → algebra → equazioni → frazioni e percentuali → geometria`

Con questo ordine, i problemi di "percentuale inversa" (isola l'incognita) diventano coerenti con quanto già appreso, e `geometria` resta comunque dopo `potenze` come richiesto. Da validare con il proprietario del prodotto prima di qualunque riordino, perché cambia l'esperienza già vista da eventuali utenti che hanno già iniziato il percorso in ordine attuale (implica gestione di `progress` esistente, vedi rischi sopra).
