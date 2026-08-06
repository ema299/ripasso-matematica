# In Viaggio con la Matematica 🧭

App web (PWA) per il ripasso estivo di matematica, pensata per prepararsi al primo anno di un istituto tecnico turistico.

## Contenuti

6 tappe, ciascuna con teoria (5 cartoline swipeabili), 36 esercizi a difficoltà crescente (facile → medio → difficile, con problemi di logica e a scelta multipla mescolati dentro) con aiuto su richiesta, e un quiz finale da 10 domande con "carta d'imbarco" come risultato:

1. Numeri interi e razionali
2. Frazioni e percentuali
3. Potenze e radici
4. Espressioni algebriche
5. Equazioni di primo grado
6. Geometria piana

I progressi e lo storico delle risposte vengono salvati nel browser (localStorage): si può chiudere l'app e riprendere da dove si era rimasti, e la schermata "Diario di viaggio" mostra le statistiche per tappa e gli argomenti da ripassare.

## Come usarla su iPhone

1. Apri il link dell'app in Safari.
2. Tocca l'icona di condivisione (il quadrato con la freccia) → **"Aggiungi a Home"**.
3. Da quel momento l'app si apre a schermo intero come un'app vera, e funziona anche offline dopo il primo caricamento.

## Sviluppo locale

Non serve alcuna build: sono file statici (HTML/CSS/JS).

```
python3 -m http.server 8765
```

e poi apri `http://localhost:8765`.

Le icone si rigenerano con:

```
python3 scripts/gen_icons.py
```

I contenuti (`data.js`) sono stati costruiti unendo un pool di esercizi generato in modo deterministico e verificato per costruzione (`scripts/gen_exercises.js`) con problemi di logica e a tema turismo scritti a mano, tramite `scripts/build_data.js`. Per rigenerare il pool meccanico:

```
node scripts/gen_exercises.js > pool.json
```
