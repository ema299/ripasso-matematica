# PIANO SVILUPPO V2 — In Viaggio con la Matematica

> Documento operativo per Claude Code. Questo file rappresenta la roadmap didattica e di prodotto della V2. Prima di implementare modifiche sostanziali, leggere anche `CLAUDE.md` e verificare che le modifiche rispettino questo piano.

## 1. Obiettivo

Trasformare l'app da buon eserciziario estivo a **tutor di matematica progressivo, interattivo e adattivo**, pensato per una studentessa che sta entrando nel primo anno di un Istituto Tecnico per il Turismo.

L'app non deve presupporre che la studentessa conosca già il linguaggio matematico che sta introducendo. Ogni concetto nuovo deve essere costruito da zero, con spiegazioni accurate, esempi guidati, attività manipolative/interattive, esercizi graduati e verifica della comprensione.

Principio guida:

> capire → manipolare → esercitarsi → sbagliare con feedback utile → consolidare → verificare → ripassare nel tempo.

La V2 non deve limitarsi ad aumentare il numero di domande o di slide.

---

## 2. Problemi individuati nella V1

### 2.1 Troppa uniformità nell'esperienza didattica

La teoria è quasi sempre presentata come sequenza di cartoline/slides da scorrere. Il formato è gradevole ma, ripetuto per tutti i concetti, rischia di diventare passivo e monotono.

**Vincolo V2:** nessun modulo importante deve essere composto soltanto da teoria swipe + esercizi con input + quiz.

Ogni modulo deve introdurre almeno **2 modalità interattive differenti** oltre alle normali domande.

### 2.2 La teoria talvolta presuppone conoscenze non ancora costruite

Esempio critico: equazioni.

La frase «porta le x da una parte e i numeri dall'altra cambiando segno» è una scorciatoia procedurale, non una spiegazione sufficiente per chi potrebbe non sapere ancora:

- cosa rappresenta `x`;
- differenza tra variabile e incognita;
- cosa sono primo e secondo membro;
- cosa è un termine;
- cosa è un coefficiente;
- perché l'uguaglianza funziona come un equilibrio;
- perché un termine sembra “cambiare segno” quando passa dall'altra parte;
- che in realtà si sta applicando la stessa operazione a entrambi i membri;
- come verificare una soluzione.

**Vincolo V2:** mai introdurre una scorciatoia prima del concetto che la giustifica.

Per le equazioni, insegnare prima il modello della bilancia e le operazioni inverse. Solo dopo introdurre “sposta e cambia segno” come abbreviazione, dichiarando esplicitamente perché funziona.

### 2.3 Difficoltà non sempre realmente crescente

Le etichette `facile`, `medio`, `difficile` esistono, ma in alcuni moduli la difficoltà è soprattutto una variazione numerica e non un aumento della complessità cognitiva. Alcuni esercizi classificati difficili risultano più semplici di altri medi.

**Vincolo V2:** la difficoltà deve essere definita da una tassonomia esplicita, non dal valore dei numeri.

Proposta:

- **Livello 1 — riconoscimento / singola regola**: un concetto, un passaggio, numeri semplici.
- **Livello 2 — applicazione**: 2-3 passaggi, scelta della regola corretta, segni o denominatori differenti.
- **Livello 3 — integrazione**: più concetti insieme, trasformazioni, problemi testuali, dati non immediatamente utilizzabili.
- **Livello 4 — ragionamento / transfer**: problema nuovo, errore da diagnosticare, scelta della strategia, applicazione in contesto reale.

L'interfaccia può continuare a mostrare Facile / Medio / Difficile, ma il generatore e i contenuti devono rispettare una progressione verificabile.

### 2.4 Numero di esercizi: sufficiente per una prima sessione, non per la padronanza

La V1 contiene 36 esercizi + 10 quiz per modulo. È una buona quantità per un primo percorso, ma una banca statica di 36 esercizi diventa rapidamente prevedibile se la studentessa deve recuperare una lacuna o ripetere un argomento.

**Obiettivo V2:** separare il concetto di *sessione* dal concetto di *banca esercizi*.

- Una sessione deve rimanere breve: circa 8-15 esercizi.
- La banca sottostante dovrebbe offrire almeno 50-100 varianti/opportunità per modulo, preferibilmente generate deterministicamente quando possibile.
- Non mostrare 100 esercizi consecutivi.
- Se un concetto è già padroneggiato, ridurre la ripetizione.
- Se un concetto è debole, proporre nuove varianti dello stesso skill.
- Evitare che la studentessa impari a memoria le risposte.

### 2.5 Feedback troppo orientato al risultato

Dopo un errore non basta mostrare la risposta corretta.

La V2 deve, dove possibile, identificare **il passaggio** o **il tipo di errore** e offrire una progressione:

1. piccolo indizio;
2. indizio più esplicito;
3. primo passaggio svolto;
4. soluzione completa;
5. esercizio molto simile immediato per verificare che il concetto sia stato recuperato.

---

## 3. Audit del programma — da fare PRIMA di espandere i contenuti

Il repository attuale copre:

1. Numeri interi e razionali
2. Frazioni e percentuali
3. Potenze e radici
4. Espressioni algebriche
5. Equazioni di primo grado
6. Geometria piana

Questa è una buona base di **ripasso/ponte verso la prima superiore**, ma NON va considerata automaticamente equivalente al programma completo del primo anno di un Istituto Tecnico Economico/Turismo.

Le linee guida del primo biennio degli istituti tecnici organizzano la matematica in quattro grandi aree: **aritmetica e algebra, geometria, relazioni e funzioni, dati e previsioni**. Programmi reali di classi prime del settore turismo includono frequentemente anche insiemi, monomi/polinomi più completi, disequazioni, piano cartesiano/retta e statistica.

### 3.1 Distinguere due obiettivi

La V2 deve rendere esplicita la distinzione:

**Percorso A — Fondamenta / ripasso pre-superiori**

Ciò che la studentessa dovrebbe saper maneggiare bene prima di iniziare la prima superiore.

**Percorso B — Ponte / anteprima della prima superiore**

Concetti che verranno affrontati durante il primo anno e che possono essere introdotti gradualmente senza trasformare l'app in un intero libro scolastico.

### 3.2 Gap da verificare nel percorso Fondamenta

Eseguire un audit contenuto-per-contenuto e decidere se integrare:

- divisibilità, numeri primi, scomposizione, MCD e mcm;
- numeri decimali e conversione frazione ↔ decimale;
- rapporti e proporzioni;
- proporzionalità diretta e inversa;
- percentuale diretta, inversa e variazioni percentuali successive;
- unità di misura ed equivalenze;
- ordine delle operazioni con maggiore varietà;
- lettura e costruzione di semplici grafici;
- media, mediana, moda e frequenze come prerequisito utile;
- piano cartesiano di base;
- geometria: angoli, triangoli, quadrilateri, proprietà essenziali, scale e problemi di misura, oltre alle sole formule di area/perimetro;
- problem solving testuale e traduzione dal linguaggio naturale al linguaggio matematico.

### 3.3 Gap possibili nel percorso Ponte prima superiore

Valutare l'aggiunta, in moduli separati o come contenuti “anteprima”:

- insiemi e operazioni tra insiemi;
- monomi: coefficiente, parte letterale, grado, monomi simili/opposti;
- operazioni con monomi;
- polinomi: termini, grado, somme/sottrazioni/prodotti semplici;
- equazioni: casi via via più complessi, verifica, possibile distinzione determinata/impossibile/indeterminata quando appropriato;
- disequazioni di primo grado introduttive;
- piano cartesiano;
- concetto di relazione e funzione;
- retta: lettura intuitiva di pendenza/intercetta, senza anticipare inutilmente formalismi;
- statistica descrittiva: frequenza assoluta/relativa, grafici, media, moda, mediana.

**Non aggiungere tutto indiscriminatamente.** Prima costruire una matrice `skill -> prerequisiti -> teoria -> attività -> esercizi -> verifica`.

---

## 4. Nuovo modello della teoria: micro-lezioni, non slide infinite

Le cartoline possono rimanere come uno dei formati, ma non devono essere il formato dominante.

Ogni nuovo concetto dovrebbe seguire, quando sensato, questa struttura:

1. **Domanda intuitiva / situazione concreta**
2. **Manipolazione visuale o interattiva**
3. **Nome matematico del concetto**
4. **Regola formalizzata**
5. **Esempio guidato**
6. **“Prova tu” da un solo passaggio**
7. **Errore tipico da riconoscere**
8. **Mini verifica prima di proseguire**

La studentessa non deve poter semplicemente fare swipe veloce e risultare “teoria vista”. La comprensione va controllata con micro-interazioni non punitive.

---

## 5. Nuove interazioni didattiche da progettare

Implementare progressivamente componenti riutilizzabili. Evitare mini-giochi puramente decorativi: ogni interazione deve rappresentare un concetto matematico.

### 5.1 Bilancia delle equazioni

Visualizzare due piatti collegati dal segno `=`.

Esempio:

`x + 3 = 7`

La studentessa sceglie “−3” e l'operazione viene applicata visivamente **a entrambi i membri**:

`x + 3 − 3 = 7 − 3`

poi

`x = 4`

Solo dopo diverse attività di questo tipo si abilita la scorciatoia drag-and-drop “porta il termine dall'altra parte”, accompagnata dalla spiegazione che il cambio di segno è il risultato dell'operazione inversa fatta su entrambi i membri.

### 5.2 Componi / riscrivi l'equazione

Attività drag-and-drop o tap-to-move:

- porta tutti i termini con `x` a sinistra;
- porta i termini numerici a destra;
- riordina i passaggi della soluzione;
- scegli quale trasformazione mantiene equivalente l'equazione;
- individua il passaggio sbagliato in una soluzione già svolta.

### 5.3 Costruisci l'espressione da una frase

Esempio:

> “Il triplo di un numero diminuito di 4 è 11”

Blocchi disponibili:

`3` `x` `−4` `=` `11` `+4` ecc.

La studentessa compone `3x − 4 = 11` prima di risolverla.

### 5.4 Raggruppa i termini simili

Card/blocchi trascinabili per separare:

`3x`, `−2`, `5x`, `+7`, `−x`

in gruppi di termini simili prima della semplificazione.

### 5.5 Frazioni visuali

Usare barre, pizza/rettangoli o segmenti per:

- costruire una frazione;
- riconoscere frazioni equivalenti;
- portare due frazioni allo stesso denominatore;
- visualizzare perché si sommano i numeratori solo dopo aver uniformato le parti.

### 5.6 Percentuali e proporzioni manipolative

Slider o griglie 10×10 per vedere `35%` come 35 celle su 100.

Scenari turismo/commercio:

- sconto;
- aumento;
- occupazione hotel;
- posti prenotati;
- cambio di scala;
- “conosco la parte e la percentuale, trova il totale”.

### 5.7 Ordine delle operazioni

Far scegliere **quale operazione eseguire per prima** evidenziando visivamente il pezzo dell'espressione.

Possibile attività: trascinare le operazioni in ordine oppure toccare il prossimo blocco da risolvere.

### 5.8 Potenze e radici visuali

- potenza come moltiplicazione ripetuta;
- quadrato geometrico per `n²`;
- radice quadrata come lato di un quadrato di area nota;
- proprietà delle potenze scoperte con pattern prima della regola formale.

### 5.9 Geometria manipolativa

Non limitarsi a inserire numeri nelle formule.

Possibili attività:

- trascinare altezza/base;
- comporre e scomporre figure;
- scegliere quale misura serve e quale è superflua;
- costruire rettangoli/triangoli su griglia;
- stimare prima di calcolare;
- applicare Pitagora visualizzando i quadrati sui lati;
- problemi con piantine, mappe, scale e spazi turistici.

### 5.10 “Caccia all'errore”

Mostrare una soluzione sbagliata e chiedere:

> In quale passaggio compare il primo errore?

Questa modalità deve comparire in più moduli perché misura comprensione meglio della sola produzione del risultato finale.

---

## 6. Architettura didattica dei contenuti

Prima di aggiungere centinaia di esercizi, introdurre metadati per ogni esercizio.

Schema suggerito (adattare senza rompere la V1):

```js
{
  id,
  skill: 'equazioni.operazione_inversa',
  prerequisites: ['numeri.segni'],
  difficulty: 1,          // scala interna oggettiva
  cognitiveType: 'apply', // recognize | apply | integrate | reason | diagnose
  format: 'numeric',      // numeric | choice | drag | order | balance | build | error
  q,
  answer,
  hintSteps: [...],
  workedSolution: [...],
  commonErrors: [...],
  generatorKey: null,
  context: 'tourism'
}
```

Non è obbligatorio usare esattamente questi nomi, ma devono esistere informazioni sufficienti a:

- sapere quale skill misura la domanda;
- sapere perché è facile/media/difficile;
- proporre recupero mirato;
- generare statistiche per concetto, non solo per modulo;
- evitare ripetizioni inutili.

---

## 7. Tutor adattivo locale — priorità alta

La V2 deve sfruttare lo storico già presente in `localStorage`.

Non serve inizialmente alcuna API AI esterna.

### 7.1 Mastery per skill

Calcolare per ogni skill una stima semplice di padronanza basata almeno su:

- correttezza;
- recenza;
- livello di difficoltà;
- numero di tentativi;
- uso di hint;
- correzione dopo un errore;
- prestazione su una domanda simile successiva.

Evitare percentuali ingannevoli con un solo tentativo.

### 7.2 Sessione “Cosa faccio oggi?”

Aggiungere una modalità che componga automaticamente una sessione breve:

- 1-2 domande di richiamo;
- focus sulle skill deboli;
- 1 domanda leggermente più difficile se la skill è stabile;
- 1 domanda di transfer/problem solving;
- chiusura con feedback semplice.

Target: 10-15 minuti, non maratone.

### 7.3 Ripasso dilazionato

Le skill già apprese devono riapparire dopo alcuni giorni in piccole dosi. Non considerare definitivamente “completato” un argomento dopo un solo quiz.

---

## 8. Quantità degli esercizi

Non usare come KPI “numero totale di domande”. Il KPI deve essere **copertura delle skill × varietà × qualità × possibilità di ripetizione**.

Target iniziale consigliato:

- 8-15 esercizi mostrati per sessione;
- almeno 15-25 opportunità per ciascuna skill importante tra statiche e generate;
- 50-100+ varianti potenziali per modulo dove la generazione parametrica è affidabile;
- almeno 20-30% di esercizi non puramente meccanici nei livelli medio/difficile;
- almeno una quota di error diagnosis / scelta strategia / problemi testuali;
- evitare duplicati cosmetici in cui cambiano soltanto due numeri.

Il generatore deterministico esistente è un punto di forza: estenderlo con vincoli pedagogici e non solo numerici.

---

## 9. Regole sulla difficoltà

Ogni esercizio deve ricevere una difficoltà motivabile.

Esempi di fattori che aumentano la difficoltà:

- numero di passaggi;
- presenza di numeri negativi;
- frazioni/decimali;
- incognita in entrambi i membri;
- parentesi/distributiva;
- informazioni superflue;
- necessità di tradurre testo → modello;
- scelta autonoma della strategia;
- combinazione di più skill;
- necessità di riconoscere un errore.

**Non** classificare un esercizio come difficile semplicemente perché contiene numeri più grandi.

Aggiungere uno script di audit che segnali anomalie evidenti, ad esempio:

- livello difficile con una sola operazione già presente nel facile;
- troppe domande quasi identiche;
- skill presenti solo in teoria e mai testate;
- skill testate ma non spiegate;
- hint che rivelano direttamente la soluzione;
- quiz finale che testa soltanto skill facili.

---

## 10. Accuratezza matematica e pedagogica — gate obbligatorio

Ogni contenuto deve superare tre controlli separati:

### A. Correttezza matematica

Risposta e soluzione devono essere corrette.

### B. Correttezza pedagogica

La spiegazione deve essere vera anche concettualmente. Evitare regole mnemoniche presentate come cause matematiche.

Esempio:

- ❌ «Il termine attraversa l'uguale e quindi cambia segno» come spiegazione iniziale.
- ✅ «Sottraggo lo stesso termine da entrambi i membri; dopo la semplificazione sembra che il termine sia passato dall'altra parte con segno opposto.»

### C. Prerequisiti

Ogni parola/concept utilizzato deve essere già stato spiegato oppure definito sul posto.

Creare un **glossario interattivo** per parole come:

- variabile;
- incognita;
- coefficiente;
- termine;
- membro;
- equivalente;
- numeratore/denominatore;
- multiplo/divisore;
- potenza/base/esponente;
- perimetro/area;
- cateto/ipotenusa.

Termini del glossario possono essere tappabili senza uscire dalla lezione.

---

## 11. Test diagnostico iniziale

Prima di obbligare la studentessa a seguire tutto in sequenza, progettare un breve test diagnostico.

Caratteristiche:

- 15-25 domande;
- copertura ampia delle skill fondamentali;
- adattamento leggero se possibile;
- nessun voto punitivo;
- risultato espresso come mappa: “solido / da rivedere / da costruire”.

Il diagnostico deve alimentare la prima sessione consigliata.

---

## 12. Diario V2

Il Diario non deve mostrare solo percentuali per tappa.

Aggiungere progressivamente:

- skill solide;
- skill fragili;
- errori ricorrenti;
- concetti da ripassare oggi;
- miglioramenti recenti;
- uso degli aiuti;
- storico sintetico, non ansiogeno;
- suggerimento della prossima sessione.

Esempio:

> Equazioni — 62% in miglioramento
> 
> ✓ operazioni inverse
> 
> ⚠ segni quando sposti termini
> 
> Oggi: 6 minuti di esercizi mirati + 2 problemi.

---

## 13. UX e ritmo

Principi:

- mobile-first reale;
- interazioni a tap singolo quando possibile;
- drag-and-drop deve avere alternativa tap-to-select/tap-to-place per accessibilità e precisione su iPhone;
- animazioni brevi e informative, mai decorative al punto da rallentare;
- evitare schermate con troppo testo;
- spezzare la teoria in micro-concetti, ma senza trasformare ogni frase in una slide;
- mostrare chiaramente “perché sto facendo questo esercizio”;
- sessioni brevi con punto naturale di pausa;
- mantenere il tema viaggio, ma la metafora non deve ostacolare il linguaggio matematico.

---

## 14. Roadmap di implementazione

### FASE 0 — Audit senza cambiare l'esperienza utente

1. Inventariare tutte le skill attualmente presenti in `data.js`.
2. Creare matrice prerequisiti.
3. Contare esercizi per skill, formato e livello.
4. Individuare duplicati e livelli incoerenti.
5. Individuare concetti usati ma mai spiegati.
6. Confrontare la copertura con il target “ripasso pre-superiori” e, separatamente, con la tipica prima dell'Istituto Tecnico Turismo.
7. Salvare il report in `docs/AUDIT_DIDATTICO.md`.

**Gate:** non espandere in massa `data.js` prima di aver prodotto l'audit.

### FASE 1 — Fondamenta teoriche corrette

Priorità:

1. Numeri e segni.
2. Frazioni/percentuali/proporzioni.
3. Linguaggio algebrico: cos'è una lettera, variabile, incognita, termine, coefficiente.
4. Equazioni e principio della bilancia.

Rivedere ogni lezione secondo la regola “zero prerequisiti impliciti”.

### FASE 2 — Nuovo motore di micro-lezioni

Implementare componenti riutilizzabili oltre alla cartolina:

- `explain`
- `steps`
- `choose-next-step`
- `order-steps`
- `build-expression`
- `balance-equation`
- `group-like-terms`
- `error-detect`
- `visual-fraction`

Non è necessario costruirli tutti insieme. Iniziare da equazioni e algebra.

### FASE 3 — Equazioni interattive

Implementare per prima la bilancia + manipolazione dei termini.

Criterio di successo: una studentessa che non conosce la regola del cambio di segno deve poter capire perché la trasformazione è lecita senza memorizzare una formula arbitraria.

### FASE 4 — Banca esercizi e difficoltà

1. Aggiungere metadati skill/difficulty/cognitiveType.
2. Ampliare generatori.
3. Correggere la progressione facile→medio→difficile.
4. Generare sessioni variabili.
5. Aggiungere audit automatici.

### FASE 5 — Tutor adattivo locale

1. mastery per skill;
2. sessione consigliata;
3. remediation dopo errore;
4. spaced review;
5. Diario V2.

### FASE 6 — Copertura programma

Solo dopo aver migliorato il motore didattico, aggiungere gli eventuali moduli mancanti decisi nell'audit (es. proporzioni, piano cartesiano/statistica, insiemi, disequazioni, ecc.).

---

## 15. Definition of Done per ogni nuova skill

Una skill può essere considerata implementata solo se:

- [ ] è definita in modo comprensibile;
- [ ] i prerequisiti sono disponibili;
- [ ] esiste almeno un esempio guidato;
- [ ] esiste almeno un'interazione attiva dove appropriato;
- [ ] esistono esercizi con progressione reale;
- [ ] esiste almeno un problema applicativo o di transfer;
- [ ] esiste almeno un errore tipico/diagnostico dove sensato;
- [ ] gli hint sono progressivi;
- [ ] è possibile verificare la risposta automaticamente;
- [ ] la skill è tracciata nello storico;
- [ ] compare nel mastery/Diario;
- [ ] i contenuti sono matematicamente verificati;
- [ ] l'esperienza funziona su schermo iPhone;
- [ ] la PWA continua a funzionare offline;
- [ ] la cache del service worker viene invalidata correttamente quando necessario.

---

## 16. Cose da NON fare

- Non trasformare l'app in un clone di un libro scolastico pieno di testo.
- Non aggiungere framework solo per implementare animazioni/interazioni se non realmente necessario.
- Non introdurre backend o API AI finché il tutor adattivo locale non dimostra di averne bisogno.
- Non creare centinaia di esercizi quasi identici per gonfiare il numero totale.
- Non chiamare “difficile” un esercizio solo perché ha numeri più grandi.
- Non mostrare immediatamente sempre la soluzione completa dopo un errore.
- Non usare “cambia lato = cambia segno” come spiegazione fondamentale.
- Non rendere obbligatorio il drag-and-drop come unico metodo di interazione.
- Non rompere i progressi esistenti senza una strategia di migrazione/versionamento.

---

## 17. Priorità prodotto

Ordine raccomandato:

1. **Accuratezza della teoria e prerequisiti**
2. **Progressione reale della difficoltà**
3. **Interazioni diverse dalle slide**
4. **Diagnosi dell'errore e feedback progressivo**
5. **Banca esercizi più ampia e non ripetitiva**
6. **Tutor adattivo / cosa fare oggi**
7. **Copertura dei gap di programma**
8. Rifiniture estetiche e gamification aggiuntiva

La qualità didattica viene prima del numero di feature.

---

## 18. Prima attività richiesta a Claude

Prima di implementare la V2, eseguire **FASE 0** e produrre `docs/AUDIT_DIDATTICO.md`.

L'audit deve contenere almeno:

1. tabella di tutte le skill attuali per modulo;
2. prerequisiti impliciti ed espliciti;
3. concetti usati senza spiegazione sufficiente;
4. conteggio esercizi per skill e difficoltà;
5. analisi duplicati / esercizi troppo simili;
6. verifica della crescita reale facile → medio → difficile;
7. gap del percorso di ripasso pre-superiori;
8. gap rispetto alla tipica matematica del primo anno di un Istituto Tecnico Turismo, mantenendo separati i due obiettivi;
9. proposta di nuova sequenza dei moduli;
10. top 10 interventi ordinati per impatto didattico;
11. rischi tecnici e di regressione;
12. piano di test prima di modificare i contenuti.

**Non procedere a una riscrittura massiva prima di consegnare questo audit.**
