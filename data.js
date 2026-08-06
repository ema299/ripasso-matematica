// Contenuti didattici: 6 tappe del viaggio di ripasso matematica
// Ogni esercizio: { q, answer, hint, unit? , type: 'expr' per risposte algebriche }
// answer numerico: stringa (accetta anche frazioni "a/b", confrontate con tolleranza)
// answer type 'expr': array di stringhe accettate (normalizzate senza spazi)

const MODULES = [
  {
    id: 'numeri',
    icon: '🧭',
    accent: 'teal',
    title: 'Numeri Interi e Razionali',
    tagline: 'La prima tappa: si parte da qui',
    theory: [
      {
        title: 'I numeri interi (Z)',
        body: "I numeri interi comprendono i numeri positivi, i numeri negativi e lo zero: ... -3, -2, -1, 0, 1, 2, 3 ...\n\nSulla retta numerica, i numeri crescono andando verso destra e diminuiscono andando verso sinistra."
      },
      {
        title: 'Le regole dei segni',
        body: "Addizione e sottrazione: se i segni sono uguali si sommano i valori e si tiene il segno; se sono diversi si sottraggono e si tiene il segno del numero più grande.\n\nMoltiplicazione e divisione: segni uguali → risultato positivo (+). Segni diversi → risultato negativo (−).\n\nEsempio: (−3) · (−2) = +6   mentre   (−3) · 2 = −6"
      },
      {
        title: "L'ordine delle operazioni",
        body: "Quando in un'espressione ci sono più operazioni, si segue quest'ordine:\n\n1. Parentesi (tonde, poi quadre, poi graffe)\n2. Potenze\n3. Moltiplicazioni e divisioni (da sinistra a destra)\n4. Addizioni e sottrazioni (da sinistra a destra)"
      },
      {
        title: 'I numeri razionali (Q)',
        body: "I numeri razionali includono anche le frazioni e i numeri decimali: 1/2, −3/4, 0,75 ...\n\nOgni numero decimale limitato o periodico può essere scritto come frazione, e viceversa."
      }
    ],
    exercises: {
      facile: [
        { q: '(−5) + 8 = ?', answer: '3', hint: 'Sulla retta numerica parti da −5 e vai avanti di 8 passi verso destra.' },
        { q: '12 − 20 = ?', answer: '-8', hint: 'Segni diversi: sottrai i valori (20−12) e tieni il segno del numero più grande in valore assoluto.' },
        { q: '(−4) · (−3) = ?', answer: '12', hint: 'Segni uguali → risultato positivo.' },
        { q: '(−15) : 5 = ?', answer: '-3', hint: 'Segni diversi → risultato negativo.' },
        { q: '(−7) + (−6) = ?', answer: '-13', hint: 'Segni uguali: somma i valori e tieni il segno meno.' }
      ],
      medio: [
        { q: '3 + 2 · (−4) = ?', answer: '-5', hint: 'Prima la moltiplicazione: 2·(−4) = −8, poi 3 + (−8).' },
        { q: '(5 − 8) · (−2) = ?', answer: '6', hint: 'Prima risolvi la parentesi: 5−8 = −3, poi moltiplica per −2.' },
        { q: '−6 + 3 · 2 − 1 = ?', answer: '-1', hint: 'Prima la moltiplicazione (3·2=6), poi somme e sottrazioni da sinistra a destra.' },
        { q: '20 : (−4) + 3 = ?', answer: '-2', hint: 'Prima la divisione: 20:(−4) = −5, poi somma 3.' },
        { q: '−10 + 4 · (−2) − (−6) = ?', answer: '-12', hint: 'Occhio al doppio segno: − (−6) diventa +6. Fai prima la moltiplicazione.' }
      ],
      difficile: [
        { q: '(−3 − 5) · (2 − 6) : (−4) = ?', answer: '-8', hint: 'Risolvi prima le due parentesi separatamente, poi moltiplica e infine dividi.' },
        { q: '15 − [8 − (12 − 20)] = ?', answer: '-1', hint: 'Parti dalla parentesi più interna: 12−20, poi risolvi quella quadra.' },
        { q: '(−2) · [(−3 + 7) − (5 − 9)] = ?', answer: '-16', hint: 'Risolvi prima le due tonde dentro la quadra, poi la sottrazione tra i risultati.' },
        { q: '[(−18) : (−3) − 4] · (−2) = ?', answer: '-4', hint: 'Prima la divisione dentro la quadra, poi la sottrazione, infine moltiplica.' },
        { q: '−5 + [(−2) · 3 − (−4 − 2)] = ?', answer: '-5', hint: 'Nella quadra: prima la moltiplicazione, poi la sottrazione (occhio al doppio segno finale).' }
      ]
    },
    quiz: [
      { q: 'Quanto fa (−8) + 3?', options: ['−11', '−5', '5', '11'], correct: 1 },
      { q: 'Quanto fa (−6) · (−7)?', options: ['−42', '−13', '13', '42'], correct: 3 },
      { q: 'Quanto fa 24 : (−6)?', options: ['−4', '−18', '4', '18'], correct: 0 },
      { q: 'Quanto fa 5 − (−9)?', options: ['−14', '−4', '4', '14'], correct: 3 },
      { q: 'Quanto fa 4 + 2 · (−3)?', options: ['−18', '−2', '2', '18'], correct: 1 },
      { q: 'Quanto fa (−3 − 4) · (−2)?', options: ['−14', '−1', '1', '14'], correct: 3 }
    ]
  },

  {
    id: 'frazioni',
    icon: '🍕',
    accent: 'coral',
    title: 'Frazioni e Percentuali',
    tagline: 'Dividere in parti uguali',
    theory: [
      {
        title: "Cos'è una frazione",
        body: "Una frazione a/b rappresenta una parte di un intero diviso in b parti uguali, di cui ne prendiamo a.\n\nEsempio: 3/4 di una pizza significa dividerla in 4 fette uguali e prenderne 3."
      },
      {
        title: 'Semplificare e confrontare',
        body: "Una frazione si semplifica dividendo numeratore e denominatore per uno stesso numero.\n\nEsempio: 6/8 = 3/4 (dividendo entrambi per 2).\n\nPer sommare o confrontare frazioni con denominatori diversi serve trovare un denominatore comune (di solito il minimo comune multiplo)."
      },
      {
        title: 'Operazioni con le frazioni',
        body: "Somma/sottrazione: prima si riducono allo stesso denominatore, poi si sommano i numeratori.\n\nMoltiplicazione: numeratore per numeratore, denominatore per denominatore.\n\nDivisione: si moltiplica la prima frazione per il reciproco (capovolta) della seconda."
      },
      {
        title: 'Le percentuali',
        body: "Una percentuale è una frazione con denominatore 100. Il 20% di un numero significa 20/100 di quel numero.\n\nPer calcolare il p% di un numero N: (N · p) : 100.\n\nEsempio: il 20% di 50 = (50 · 20) : 100 = 10."
      }
    ],
    exercises: {
      facile: [
        { q: 'Semplifica la frazione 4/8', answer: '1/2', hint: 'Dividi numeratore e denominatore per 4.' },
        { q: 'Quanto fa 1/4 + 1/4?', answer: '1/2', hint: 'Denominatore già uguale: somma solo i numeratori.' },
        { q: 'Quanto fa il 20% di 50?', answer: '10', hint: '(50 · 20) : 100' },
        { q: 'Scrivi 3/10 in percentuale (solo il numero, es. 25 per 25%)', answer: '30', unit: '%', hint: 'Moltiplica la frazione per 100: (3:10)·100.' },
        { q: 'Quanto fa 1/2 · 1/3?', answer: '1/6', hint: 'Moltiplica numeratore per numeratore e denominatore per denominatore.' }
      ],
      medio: [
        { q: 'Quanto fa 2/3 + 1/6?', answer: '5/6', hint: 'Denominatore comune 6: trasforma 2/3 in 4/6.' },
        { q: 'Quanto fa 3/4 − 1/2?', answer: '1/4', hint: 'Denominatore comune 4: trasforma 1/2 in 2/4.' },
        { q: 'Quanto fa 5/6 : 1/3?', answer: '5/2', hint: 'Moltiplica 5/6 per il reciproco di 1/3, cioè 3/1.' },
        { q: 'Quanto fa il 15% di 80?', answer: '12', hint: '(80 · 15) : 100' },
        { q: 'Un pantalone costa 40€ con sconto del 25%. Quanti euro si risparmiano?', answer: '10', unit: '€', hint: 'Calcola il 25% di 40.' }
      ],
      difficile: [
        { q: 'Quanto fa (2/3 + 1/4) : 5/6?', answer: '11/10', hint: 'Prima risolvi la somma in parentesi (denominatore comune 12), poi dividi per 5/6.' },
        { q: 'Un prezzo di 50€ aumenta del 20% e poi lo stesso nuovo prezzo viene scontato del 20%. Prezzo finale?', answer: '48', unit: '€', hint: 'Aumenta prima 50 del 20%, poi applica lo sconto del 20% sul nuovo prezzo (non su 50).' },
        { q: 'Calcola 3/5 di 120, poi aumenta il risultato del 10%', answer: '79.2', hint: 'Prima 3/5 di 120, poi aggiungi il 10% di quel risultato.' },
        { q: 'Quanto fa (1/2 − 1/3) · 2/5?', answer: '1/15', hint: 'Denominatore comune 6 per la sottrazione, poi moltiplica.' },
        { q: 'Un viaggio costa 350€. Con lo sconto "primo prenota" del 12% quanto si paga?', answer: '308', unit: '€', hint: 'Sottrai il 12% di 350 da 350, oppure moltiplica 350 per 0,88.' }
      ]
    },
    quiz: [
      { q: 'Semplificando 6/9 si ottiene:', options: ['1/3', '2/3', '3/2', '6/9'], correct: 1 },
      { q: '1/3 + 1/6 = ?', options: ['1/2', '2/9', '1/9', '2/6'], correct: 0 },
      { q: 'Il 10% di 250 è:', options: ['2,5', '25', '250', '2500'], correct: 1 },
      { q: '3/4 di 200 è:', options: ['50', '100', '150', '300'], correct: 2 },
      { q: 'Un prezzo di 60€ scontato del 30% diventa:', options: ['18€', '30€', '42€', '48€'], correct: 2 },
      { q: '2/5 : 1/10 = ?', options: ['1/25', '1/4', '4', '25'], correct: 2 }
    ]
  },

  {
    id: 'potenze',
    icon: '⚡',
    accent: 'gold',
    title: 'Potenze e Radici',
    tagline: 'Moltiplicazioni ripetute e il percorso inverso',
    theory: [
      {
        title: "Cos'è una potenza",
        body: "Una potenza a^n indica che la base a va moltiplicata per sé stessa n volte (n è l'esponente).\n\nEsempio: 2^3 = 2 · 2 · 2 = 8"
      },
      {
        title: 'Le proprietà delle potenze',
        body: "Stessa base: a^n · a^m = a^(n+m)     a^n : a^m = a^(n−m)\n\nPotenza di potenza: (a^n)^m = a^(n·m)\n\nCasi speciali: a^1 = a       a^0 = 1  (per a ≠ 0)"
      },
      {
        title: 'Proprietà del prodotto',
        body: "La radice (o la potenza) di un prodotto è il prodotto delle radici (o potenze):\n\n√(a · b) = √a · √b\n\nEsempio: √(9 · 16) = √9 · √16 = 3 · 4 = 12"
      },
      {
        title: 'Le radici quadrate',
        body: "La radice quadrata √x è l'operazione inversa dell'elevamento al quadrato: risponde alla domanda \"quale numero moltiplicato per sé stesso dà x?\".\n\nConviene memorizzare: √1=1, √4=2, √9=3, √16=4, √25=5, √36=6, √49=7, √64=8, √81=9, √100=10, √144=12."
      }
    ],
    exercises: {
      facile: [
        { q: '2^3 = ?', answer: '8', hint: '2 · 2 · 2' },
        { q: '5^2 = ?', answer: '25', hint: '5 · 5' },
        { q: '3^0 = ?', answer: '1', hint: 'Qualsiasi numero (diverso da 0) elevato a 0 fa 1.' },
        { q: 'Radice quadrata di 49 = ?', answer: '7', hint: 'Quale numero moltiplicato per sé stesso dà 49?' },
        { q: '10^2 = ?', answer: '100', hint: '10 · 10' }
      ],
      medio: [
        { q: '2^3 · 2^2 = ?', answer: '32', hint: 'Stessa base: somma gli esponenti (3+2), poi calcola la potenza.' },
        { q: '(3^2)^2 = ?', answer: '81', hint: 'Potenza di potenza: moltiplica gli esponenti (2·2).' },
        { q: '5^4 : 5^2 = ?', answer: '25', hint: 'Stessa base: sottrai gli esponenti (4−2).' },
        { q: 'Radice quadrata di 144 = ?', answer: '12', hint: 'Quale numero moltiplicato per sé stesso dà 144?' },
        { q: '4^3 = ?', answer: '64', hint: '4 · 4 · 4' }
      ],
      difficile: [
        { q: '2^3 · 2^0 + 3^2 = ?', answer: '17', hint: 'Calcola separatamente le due potenze (ricorda 2^0=1), poi somma.' },
        { q: '(2^2)^3 : 2^4 = ?', answer: '4', hint: 'Prima la potenza di potenza (2^2)^3 = 2^6, poi sottrai gli esponenti nella divisione.' },
        { q: 'Radice quadrata di (9 · 16) = ?', answer: '12', hint: 'Usa √(a·b) = √a · √b.' },
        { q: 'Calcola la radice quadrata di (3^2 + 4^2)', answer: '5', hint: 'Prima calcola le due potenze e sommale (9+16), poi estrai la radice.' },
        { q: '5^3 : (5 · 5) = ?', answer: '5', hint: 'Scrivi 5·5 come 5^2, poi sottrai gli esponenti.' }
      ]
    },
    quiz: [
      { q: '4^2 = ?', options: ['6', '8', '16', '32'], correct: 2 },
      { q: '2^5 = ?', options: ['10', '16', '25', '32'], correct: 3 },
      { q: 'Radice quadrata di 81 = ?', options: ['8', '9', '40,5', '81'], correct: 1 },
      { q: '3^2 · 3^3 = ?', options: ['81', '243', '729', '15'], correct: 1 },
      { q: '(2^3)^2 = ?', options: ['12', '16', '36', '64'], correct: 3 },
      { q: 'Radice quadrata di 100 = ?', options: ['10', '50', '100', '1000'], correct: 0 }
    ]
  },

  {
    id: 'algebra',
    icon: '🧩',
    accent: 'teal',
    title: 'Espressioni Algebriche',
    tagline: 'Quando le lettere prendono il posto dei numeri',
    theory: [
      {
        title: "Cos'è un'espressione algebrica",
        body: "Un'espressione algebrica usa lettere (dette variabili) al posto di numeri non ancora conosciuti.\n\nEsempio: 2x + 3 è un'espressione dove x rappresenta un numero qualsiasi."
      },
      {
        title: 'Termini simili',
        body: "Due termini sono simili se hanno la stessa parte letterale (stessa lettera, stesso esponente). Si possono sommare/sottrarre i loro coefficienti (i numeri davanti).\n\nEsempio: 3x + 5x = 8x       7a − 2a = 5a"
      },
      {
        title: 'Sommare e sottrarre polinomi',
        body: "Per sommare o sottrarre polinomi si raggruppano i termini simili tra loro.\n\nAttenzione al segno meno davanti a una parentesi: cambia il segno a tutti i termini dentro.\n\nEsempio: (5x−2) − (3x+4) = 5x−2−3x−4 = 2x−6"
      },
      {
        title: "Il valore di un'espressione",
        body: "Per calcolare il valore di un'espressione, si sostituisce un numero al posto della lettera e si esegue il calcolo.\n\nEsempio: 2x+1 per x=3 → 2·3+1 = 7"
      }
    ],
    exercises: {
      facile: [
        { q: 'Somma i termini simili: 3x + 5x = ?', answer: ['8x'], type: 'expr', hint: 'Somma i coefficienti 3 e 5, tieni la x.' },
        { q: 'Semplifica: 7a − 2a = ?', answer: ['5a'], type: 'expr', hint: 'Sottrai i coefficienti 7 e 2, tieni la a.' },
        { q: 'Calcola il valore di 2x+1 per x=3', answer: '7', hint: 'Sostituisci 3 al posto di x: 2·3+1' },
        { q: 'Semplifica: 4y + 3 + 2y = ?', answer: ['6y+3'], type: 'expr', hint: 'Somma i termini in y (4y e 2y); il numero 3 resta da solo.' },
        { q: 'Calcola il valore di 3a per a=5', answer: '15', hint: '3 · 5' }
      ],
      medio: [
        { q: 'Semplifica: 5x + 3y − 2x + y = ?', answer: ['3x+4y', '4y+3x'], type: 'expr', hint: 'Raggruppa separatamente i termini in x e quelli in y.' },
        { q: 'Somma i polinomi: (2x+3) + (x−5) = ?', answer: ['3x-2'], type: 'expr', hint: 'Raggruppa i termini in x insieme e i numeri insieme.' },
        { q: 'Sottrai: (5x−2) − (3x+4) = ?', answer: ['2x-6'], type: 'expr', hint: 'Il segno meno cambia segno a entrambi i termini della seconda parentesi.' },
        { q: 'Calcola il valore di x^2+2x per x=3', answer: '15', hint: '3^2 + 2·3 = 9 + 6' },
        { q: 'Semplifica: 2(x+3) = ?', answer: ['2x+6'], type: 'expr', hint: 'Moltiplica il 2 per ogni termine dentro la parentesi (proprietà distributiva).' }
      ],
      difficile: [
        { q: 'Semplifica: 3(x+2) − 2(x−1) = ?', answer: ['x+8'], type: 'expr', hint: 'Prima distribuisci entrambi i prodotti, poi raggruppa i termini simili (occhio ai segni).' },
        { q: 'Calcola il valore di 2x^2 − 3x + 1 per x=−2', answer: '15', hint: '2·(−2)^2 − 3·(−2) + 1. Ricorda: (−2)^2 = 4.' },
        { q: 'Semplifica: 4x − [2x − (x+3)] = ?', answer: ['3x+3'], type: 'expr', hint: 'Risolvi prima la parentesi tonda dentro la quadra, poi la quadra.' },
        { q: 'Somma: (x^2+2x−1) + (3x^2−x+4) = ?', answer: ['4x^2+x+3'], type: 'expr', hint: 'Raggruppa i termini in x^2, poi quelli in x, poi i numeri. Scrivi il risultato in questo ordine.' },
        { q: 'Calcola il valore di (a+b)^2 per a=2, b=3', answer: '25', hint: 'Prima calcola a+b, poi eleva al quadrato il risultato.' }
      ]
    },
    quiz: [
      { q: 'Semplifica 4x+3x:', options: ['7x', '12x', '7', 'x⁷'], correct: 0 },
      { q: 'Il valore di 3x−2 per x=4 è:', options: ['10', '12', '14', '9'], correct: 0 },
      { q: 'Somma i polinomi (x+2)+(2x−5):', options: ['3x−3', 'x−3', '3x+7', '2x−3'], correct: 0 },
      { q: 'Semplifica 2(x−3):', options: ['2x−3', '2x−6', 'x−6', '2x+6'], correct: 1 },
      { q: 'Il valore di x^2 per x=−3 è:', options: ['−9', '9', '−6', '6'], correct: 1 },
      { q: 'Semplifica 5a+2b−3a:', options: ['2a+2b', '8a+2b', '2a−2b', '5a−b'], correct: 0 }
    ]
  },

  {
    id: 'equazioni',
    icon: '⚖️',
    accent: 'coral',
    title: 'Equazioni di Primo Grado',
    tagline: 'Trovare il valore che tiene tutto in equilibrio',
    theory: [
      {
        title: "Cos'è un'equazione",
        body: "Un'equazione è un'uguaglianza tra due espressioni che contiene un'incognita (di solito x). Risolverla significa trovare il valore di x che rende vera l'uguaglianza.\n\nEsempio: x + 3 = 7  →  x = 4"
      },
      {
        title: 'I principi di equivalenza',
        body: "Un'equazione resta vera (equivalente) se:\n\n1° principio: si somma o sottrae lo stesso numero a entrambi i membri.\n\n2° principio: si moltiplica o divide entrambi i membri per uno stesso numero diverso da zero."
      },
      {
        title: "Come si risolve",
        body: "Si portano tutti i termini con la x da un lato e i numeri dall'altro, cambiando di segno ogni termine che \"cambia lato\".\n\nEsempio: 2x + 3 = 11 → 2x = 11 − 3 → 2x = 8 → x = 4"
      },
      {
        title: 'La verifica',
        body: "Per controllare che il risultato sia corretto, si sostituisce il valore trovato al posto della x nell'equazione originale: se i due membri diventano uguali, la soluzione è corretta."
      }
    ],
    exercises: {
      facile: [
        { q: 'x + 3 = 7', answer: '4', hint: 'Sposta il 3 dall\'altra parte cambiandogli segno.' },
        { q: 'x − 5 = 2', answer: '7', hint: 'Sposta il −5 dall\'altra parte: diventa +5.' },
        { q: '2x = 10', answer: '5', hint: 'Dividi entrambi i membri per 2.' },
        { q: 'x : 3 = 4', answer: '12', hint: 'Moltiplica entrambi i membri per 3.' },
        { q: '3x = −9', answer: '-3', hint: 'Dividi entrambi i membri per 3.' }
      ],
      medio: [
        { q: '2x + 3 = 11', answer: '4', hint: 'Sposta il 3: 2x = 11−3, poi dividi per 2.' },
        { q: '3x − 4 = 11', answer: '5', hint: 'Sposta il −4: 3x = 11+4, poi dividi per 3.' },
        { q: '5x + 2 = 3x + 10', answer: '4', hint: 'Porta le x a sinistra e i numeri a destra: 5x−3x = 10−2.' },
        { q: '4(x+1) = 20', answer: '4', hint: 'Distribuisci il 4, poi risolvi come al solito.' },
        { q: '2x − 5 = x + 1', answer: '6', hint: 'Porta le x a sinistra e i numeri a destra: 2x−x = 1+5.' }
      ],
      difficile: [
        { q: '3(x−2) + 4 = 2x + 5', answer: '7', hint: 'Distribuisci il 3(x−2), semplifica il membro sinistro, poi isola la x.' },
        { q: '2(x+3) − (x−1) = 10', answer: '3', hint: 'Distribuisci entrambe le parentesi: occhio al segno meno davanti alla seconda.' },
        { q: '5x − 2(x−4) = 2x + 6', answer: '-2', hint: 'Distribuisci −2(x−4), semplifica il membro sinistro, poi isola la x.' },
        { q: '(x+1)/2 = (x−1)/3 + 1', answer: '1', hint: 'Moltiplica tutta l\'equazione per 6 (minimo comune multiplo di 2 e 3) per eliminare le frazioni.' },
        { q: '3(2x−1) − 4 = 5(x+1) − 3', answer: '9', hint: 'Distribuisci entrambi i membri, poi porta le x da una parte e i numeri dall\'altra.' }
      ]
    },
    quiz: [
      { q: 'Risolvi: x + 7 = 12', options: ['5', '19', '−5', '7'], correct: 0 },
      { q: 'Risolvi: 3x = 21', options: ['7', '18', '24', '63'], correct: 0 },
      { q: 'Risolvi: 2x − 4 = 10', options: ['3', '6', '7', '14'], correct: 2 },
      { q: 'Risolvi: 4x + 1 = 13', options: ['2', '3', '4', '12'], correct: 1 },
      { q: 'Risolvi: 2(x+1) = 8', options: ['2', '3', '4', '8'], correct: 1 },
      { q: 'Risolvi: 5x − 3 = 2x + 9', options: ['2', '3', '4', '6'], correct: 2 }
    ]
  },

  {
    id: 'geometria',
    icon: '🗺️',
    accent: 'gold',
    title: 'Geometria Piana',
    tagline: "L'ultima tappa: misurare lo spazio",
    theory: [
      {
        title: 'Perimetro e area',
        body: "Il perimetro è la lunghezza del contorno di una figura (si misura in cm, m...).\n\nL'area è la misura della superficie racchiusa dalla figura (si misura in cm², m²...)."
      },
      {
        title: 'Le figure principali',
        body: "Quadrato (lato l): perimetro = 4·l, area = l²\n\nRettangolo (base b, altezza h): perimetro = 2·(b+h), area = b·h\n\nTriangolo (base b, altezza h): area = (b·h) : 2"
      },
      {
        title: 'Il cerchio',
        body: "Circonferenza (il \"perimetro\" del cerchio) di raggio r: C = 2·π·r\n\nArea del cerchio di raggio r: A = π·r²\n\nSi usa solitamente π ≈ 3,14"
      },
      {
        title: 'Il teorema di Pitagora',
        body: "In un triangolo rettangolo, il quadrato costruito sull'ipotenusa è uguale alla somma dei quadrati costruiti sui due cateti:\n\nipotenusa² = cateto1² + cateto2²\n\nUtile per trovare un lato mancante quando si conoscono gli altri due."
      }
    ],
    exercises: {
      facile: [
        { q: 'Area di un quadrato con lato 5 cm', answer: '25', unit: 'cm²', hint: 'Area = lato²' },
        { q: 'Perimetro di un quadrato con lato 6 cm', answer: '24', unit: 'cm', hint: 'Perimetro = 4 · lato' },
        { q: 'Area di un rettangolo con base 8 cm e altezza 3 cm', answer: '24', unit: 'cm²', hint: 'Area = base · altezza' },
        { q: 'Perimetro di un rettangolo con base 10 cm e altezza 4 cm', answer: '28', unit: 'cm', hint: 'Perimetro = 2 · (base + altezza)' },
        { q: 'Area di un triangolo con base 6 cm e altezza 4 cm', answer: '12', unit: 'cm²', hint: 'Area = (base · altezza) : 2' }
      ],
      medio: [
        { q: 'Un triangolo rettangolo ha i cateti di 3 cm e 4 cm. Quanto misura l\'ipotenusa?', answer: '5', unit: 'cm', hint: 'Usa il teorema di Pitagora: ipotenusa = √(cateto1² + cateto2²)' },
        { q: 'Un rettangolo ha area 48 cm² e base 8 cm. Quanto è alto?', answer: '6', unit: 'cm', hint: 'altezza = area : base' },
        { q: 'Circonferenza di un cerchio con raggio 7 cm (usa π ≈ 3,14)', answer: '43.96', unit: 'cm', hint: 'C = 2 · π · r' },
        { q: 'Area di un cerchio con raggio 5 cm (usa π ≈ 3,14)', answer: '78.5', unit: 'cm²', hint: 'A = π · r²' },
        { q: 'Un quadrato ha area 64 cm². Quanto misura il lato?', answer: '8', unit: 'cm', hint: 'Il lato è la radice quadrata dell\'area.' }
      ],
      difficile: [
        { q: 'Un triangolo rettangolo ha ipotenusa 13 cm e un cateto 5 cm. Quanto misura l\'altro cateto?', answer: '12', unit: 'cm', hint: 'cateto = √(ipotenusa² − cateto²)' },
        { q: 'Un giardino rettangolare misura 12 m x 7 m. Per recintarlo con una rete che costa 8€ al metro, quanto si spende in totale?', answer: '304', unit: '€', hint: 'Prima calcola il perimetro, poi moltiplica per il costo al metro.' },
        { q: 'Un cerchio ha area 78,5 cm² (usa π ≈ 3,14). Quanto misura il raggio?', answer: '5', unit: 'cm', hint: 'Dall\'area, calcola r² = area : π, poi estrai la radice quadrata.' },
        { q: 'Una piscina rettangolare di 10 m x 6 m ha intorno un bordo largo 1 m su ogni lato. Qual è l\'area totale (piscina + bordo)?', answer: '96', unit: 'm²', hint: 'Il bordo aggiunge 1 m per lato: le dimensioni totali diventano 12 m x 8 m.' },
        { q: 'Un triangolo rettangolo ha i cateti di 9 cm e 12 cm. Quanto misura l\'ipotenusa?', answer: '15', unit: 'cm', hint: 'Usa il teorema di Pitagora.' }
      ]
    },
    quiz: [
      { q: 'Area di un quadrato con lato 9 cm:', options: ['18 cm²', '36 cm²', '81 cm²', '90 cm²'], correct: 2 },
      { q: 'Perimetro di un rettangolo 5x9 cm:', options: ['14 cm', '28 cm', '45 cm', '49 cm'], correct: 1 },
      { q: 'Ipotenusa di un triangolo rettangolo con cateti 6 e 8:', options: ['10', '14', '48', '100'], correct: 0 },
      { q: 'Area di un cerchio con raggio 10 cm (π≈3,14):', options: ['31,4 cm²', '62,8 cm²', '314 cm²', '628 cm²'], correct: 2 },
      { q: 'Area di un triangolo con base 10 e altezza 6:', options: ['16', '30', '60', '32'], correct: 1 },
      { q: 'Un cateto misura 9, l\'ipotenusa 15. Quanto misura l\'altro cateto?', options: ['6', '12', '18', '24'], correct: 1 }
    ]
  }
];
