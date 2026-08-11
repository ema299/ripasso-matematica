const MODULES = [
  {
    "id": "numeri",
    "icon": "🧭",
    "accent": "teal",
    "title": "Numeri Interi e Razionali",
    "tagline": "La prima tappa: si parte da qui",
    "theory": [
      {
        "title": "Cos’è un numero relativo?",
        "type": "microlesson",
        "concept": "numero_relativo",
        "situation": "Finora forse hai sempre lavorato solo con numeri \"normali\": 1, 2, 3, 100… Ma cosa succede se il risultato di un conto è più piccolo di zero?",
        "explain": "I numeri relativi (o interi relativi) sono i numeri che hanno un segno: positivo (+) se sono maggiori di zero, negativo (−) se sono minori di zero. Lo zero non ha segno. Il segno fa parte del numero tanto quanto la sua cifra: −5 e 5 sono due numeri diversi, uno agli antipodi dell’altro rispetto allo zero.",
        "example": "Se hai 20€ e ne spendi 35€, il tuo saldo non è \"15 mancanti\": è −15€, un numero negativo che rappresenta un debito.",
        "check": {
          "q": "Cosa indica il segno di un numero relativo?",
          "options": [
            "Se il numero è pari o dispari",
            "Se il numero è maggiore o minore di zero",
            "Se il numero è intero o decimale",
            "Niente, è solo decorativo"
          ],
          "correct": 1
        }
      },
      {
        "title": "I numeri interi (Z)",
        "body": "I numeri interi comprendono i numeri positivi, i numeri negativi e lo zero: ... -3, -2, -1, 0, 1, 2, 3 ...\n\nSulla retta numerica, i numeri crescono andando verso destra e diminuiscono andando verso sinistra: un numero è maggiore di un altro (si scrive con il simbolo >) quando si trova più a destra sulla retta, minore (<) quando si trova più a sinistra.\n\nQuesta regola vale anche per i numeri negativi, ed è il punto che spesso confonde chi li ha appena imparati: −2 si trova più a destra di −5 sulla retta (è più vicino allo zero), quindi −2 è maggiore di −5, cioè −2 > −5 — anche se, guardando solo le cifre senza il segno, 5 sembra \"più grande\" di 2. Per confrontare due numeri negativi conta sempre la loro posizione sulla retta, non le cifre senza segno: più un numero negativo è vicino allo zero, più è grande."
      },
      {
        "title": "Le regole dei segni",
        "body": "Moltiplicazione con un numero positivo: pensala come una somma ripetuta. Per esempio (−3) × 2 significa \"−3 sommato due volte\": (−3) × 2 = (−3) + (−3) = −6. Un numero negativo moltiplicato per un positivo dà quindi un risultato negativo.\n\nMa allora perché (−3) × (−2) fa +6 e non −6? Segui questo schema: (−3) × 3 = −9, (−3) × 2 = −6, (−3) × 1 = −3, (−3) × 0 = 0. Ogni volta che il secondo fattore diminuisce di 1, il risultato aumenta di 3. Se lo schema continua in modo coerente anche sotto lo zero, allora (−3) × (−1) deve fare 0 + 3 = +3, e (−3) × (−2) deve fare +3 + 3 = +6. Il prodotto di due numeri negativi è positivo non per una regola arbitraria da imparare a memoria, ma perché è l'unico modo di restare coerenti con lo schema della moltiplicazione anche oltre lo zero.\n\nDa questo ragionamento nasce la regola pratica, valida anche per la divisione (che è l'operazione inversa della moltiplicazione): segni uguali (+ e +, oppure − e −) → risultato positivo; segni diversi → risultato negativo.\n\nAddizione e sottrazione: se i segni sono uguali si sommano i valori e si tiene il segno; se sono diversi si sottraggono e si tiene il segno del numero più grande.\n\nEsempio: (−3) · (−2) = +6   mentre   (−3) · 2 = −6"
      },
      {
        "title": "L'ordine delle operazioni",
        "body": "Quando in un'espressione ci sono più operazioni, si segue quest'ordine:\n\n1. Parentesi (tonde, poi quadre, poi graffe)\n2. Potenze\n3. Moltiplicazioni e divisioni (da sinistra a destra)\n4. Addizioni e sottrazioni (da sinistra a destra)\n\nQuando le parentesi sono annidate, cioè una dentro l'altra, vale questa regola: si risolve sempre prima la parentesi più interna, e si procede via via verso quella più esterna — mai il contrario.\n\nEsempio: 10 − [3 + (2 × 4 − 5)]\n\n1. Si parte dalla parentesi più interna, quella tonda: (2 × 4 − 5) = (8 − 5) = 3\n2. L'espressione diventa: 10 − [3 + 3]\n3. Ora la quadra è rimasta l'unica parentesi: [3 + 3] = 6\n4. Infine: 10 − 6 = 4"
      },
      {
        "title": "I numeri razionali (Q)",
        "body": "I numeri razionali includono anche le frazioni e i numeri decimali: 1/2, −3/4, 0,75 ...\n\nOgni numero decimale limitato o periodico può essere scritto come frazione, e viceversa."
      },
      {
        "title": "Esempio svolto",
        "type": "steps",
        "steps": [
          "Il problema: −4 + 3 × (−2) − (−5)",
          "Prima la moltiplicazione: 3 × (−2) = −6\n\nDiventa: −4 + (−6) − (−5)",
          "Il doppio segno meno diventa più: − (−5) = +5\n\nDiventa: −4 − 6 + 5",
          "Da sinistra a destra: −4 − 6 = −10, poi −10 + 5 = −5\n\nRisultato: −5"
        ]
      },
      {
        "title": "Un altro esempio",
        "type": "steps",
        "steps": [
          "Il problema: 15 − [2 × (−3) + 4]",
          "Nella quadra, prima la moltiplicazione: 2 × (−3) = −6\n\nDiventa: 15 − [−6 + 4]",
          "Risolviamo la quadra: −6 + 4 = −2\n\nDiventa: 15 − (−2)",
          "Il doppio segno meno diventa più: 15 + 2 = 17\n\nRisultato: 17"
        ]
      }
    ],
    "exercises": {
      "facile": [
        {
          "q": "Senza calcolare il risultato esatto, tocca ogni espressione e mettila nel gruppo giusto guardando solo i segni dei numeri:",
          "format": "group",
          "skill": "numeri.regola_segni",
          "cognitiveType": "apply",
          "hint": "Non calcolare il valore: guarda solo se i segni dei due numeri sono uguali o diversi tra loro.",
          "hintSteps": [
            "Segni uguali (+ e +, oppure − e −) danno sempre risultato positivo; segni diversi (+ e −, oppure − e +) danno sempre risultato negativo.",
            "Regola: nella moltiplicazione e nella divisione, segni uguali → risultato positivo; segni diversi → risultato negativo. Applicala guardando solo i segni, senza fare il calcolo completo."
          ],
          "groupData": {
            "terms": [
              {
                "id": "t1",
                "label": "(−4) × (−5)",
                "group": "pos"
              },
              {
                "id": "t2",
                "label": "(−6) × 3",
                "group": "neg"
              },
              {
                "id": "t3",
                "label": "8 × (−2)",
                "group": "neg"
              },
              {
                "id": "t4",
                "label": "(−12) : (−3)",
                "group": "pos"
              },
              {
                "id": "t5",
                "label": "(−15) : 5",
                "group": "neg"
              },
              {
                "id": "t6",
                "label": "7 × 2",
                "group": "pos"
              }
            ],
            "buckets": [
              {
                "key": "pos",
                "label": "Risultato positivo (+)"
              },
              {
                "key": "neg",
                "label": "Risultato negativo (−)"
              }
            ]
          }
        },
        {
          "q": "(-8) + (-14) = ?",
          "answer": "-22",
          "hint": "Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo.",
          "skill": "numeri.regola_segni",
          "cognitiveType": "recognize",
          "generatorKey": "numeri",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo."
          ]
        },
        {
          "q": "(-8) × (14) = ?",
          "answer": "-112",
          "hint": "Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo.",
          "skill": "numeri.regola_segni",
          "cognitiveType": "recognize",
          "generatorKey": "numeri",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo."
          ]
        },
        {
          "q": "(6) × (-3) = ?",
          "answer": "-18",
          "hint": "Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo.",
          "skill": "numeri.regola_segni",
          "cognitiveType": "recognize",
          "generatorKey": "numeri",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo."
          ]
        },
        {
          "q": "-20 : (-4) = ?",
          "answer": "5",
          "hint": "Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo.",
          "skill": "numeri.regola_segni",
          "cognitiveType": "recognize",
          "generatorKey": "numeri",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo."
          ]
        },
        {
          "q": "6 : (-6) = ?",
          "answer": "-1",
          "hint": "Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo.",
          "skill": "numeri.regola_segni",
          "cognitiveType": "recognize",
          "generatorKey": "numeri",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo."
          ]
        },
        {
          "q": "(10) + (-5) = ?",
          "answer": "5",
          "hint": "Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo.",
          "skill": "numeri.regola_segni",
          "cognitiveType": "recognize",
          "generatorKey": "numeri",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo."
          ]
        },
        {
          "q": "(9) × (-9) = ?",
          "answer": "-81",
          "hint": "Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo.",
          "skill": "numeri.regola_segni",
          "cognitiveType": "recognize",
          "generatorKey": "numeri",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo."
          ]
        },
        {
          "q": "(-8) − (-7) = ?",
          "answer": "-1",
          "hint": "Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo.",
          "skill": "numeri.regola_segni",
          "cognitiveType": "apply",
          "generatorKey": "numeri",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo."
          ]
        },
        {
          "q": "Sono un numero compreso tra 10 e 20: sono multiplo di 3 ma sono dispari. Chi sono?",
          "answer": "15",
          "hint": "Elenca i multipli di 3 tra 10 e 20, poi scarta quelli pari.",
          "logic": true,
          "skill": "numeri.logica",
          "cognitiveType": "apply",
          "generatorKey": "numeri",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Elenca i multipli di 3 tra 10 e 20, poi scarta quelli pari."
          ]
        },
        {
          "q": "Qual è il numero successivo nella sequenza: 3, 7, 11, 15, ... ?",
          "answer": "19",
          "hint": "Guarda di quanto aumenta ogni volta rispetto al numero precedente.",
          "logic": true,
          "skill": "numeri.logica",
          "cognitiveType": "apply",
          "generatorKey": "numeri",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Guarda di quanto aumenta ogni volta rispetto al numero precedente."
          ]
        },
        {
          "q": "Un pullman turistico ha 48 posti. Sono già stati prenotati 31 posti. Quanti posti restano liberi?",
          "answer": "17",
          "hint": "Sottrai i posti già prenotati dal totale.",
          "skill": "numeri.problemi_pratici",
          "cognitiveType": "apply",
          "generatorKey": "numeri",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Sottrai i posti già prenotati dal totale."
          ]
        },
        {
          "q": "(-1) + (1) = ?",
          "answer": "0",
          "hint": "Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo.",
          "skill": "numeri.regola_segni",
          "cognitiveType": "recognize",
          "generatorKey": "numeri",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Applica le regole dei segni: segni uguali → risultato positivo, segni diversi → risultato negativo."
          ]
        }
      ],
      "medio": [
        {
          "q": "Trova il passaggio sbagliato in questa risoluzione di 5 + 3 × (−4):",
          "format": "error-detect",
          "skill": "numeri.ordine_operazioni",
          "cognitiveType": "diagnose",
          "hint": "Controlla quale operazione va eseguita per prima quando non ci sono parentesi: la moltiplicazione o l'addizione?",
          "hintSteps": [
            "Nell'espressione non ci sono parentesi: conta l'ordine delle operazioni senza parentesi. Tra moltiplicazione e addizione, quale ha la priorità?",
            "Regola: senza parentesi, si eseguono sempre prima le moltiplicazioni e le divisioni, e solo dopo le addizioni e le sottrazioni — indipendentemente dall'ordine in cui sono scritte da sinistra a destra."
          ],
          "errorData": {
            "steps": [
              {
                "text": "Il problema è 5 + 3 × (−4). Sommiamo prima 5 e 3: 5 + 3 = 8."
              },
              {
                "text": "Moltiplichiamo il risultato per (−4): 8 × (−4) = −32."
              },
              {
                "text": "Il risultato finale è −32."
              }
            ],
            "errorIndex": 0,
            "explanation": "Il primo passaggio è già sbagliato: nell'ordine delle operazioni le moltiplicazioni si eseguono PRIMA delle addizioni, quindi va calcolato per primo 3 × (−4) = −12, e solo dopo si somma: 5 + (−12) = −7. Sommare prima 5 e 3 tratta l'espressione come se ci fosse una parentesi attorno a '5 + 3', che invece non c'è."
          }
        },
        {
          "q": "-40 : 8 + -6 = ?",
          "answer": "-11",
          "hint": "Ricorda l'ordine delle operazioni: prima moltiplicazioni/divisioni, poi addizioni/sottrazioni (o risolvi prima la parentesi).",
          "skill": "numeri.ordine_operazioni",
          "cognitiveType": "apply",
          "generatorKey": "numeri",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Ricorda l'ordine delle operazioni: prima moltiplicazioni/divisioni, poi addizioni/sottrazioni (o risolvi prima la parentesi)."
          ]
        },
        {
          "q": "-36 : 6 + 10 = ?",
          "answer": "4",
          "hint": "Ricorda l'ordine delle operazioni: prima moltiplicazioni/divisioni, poi addizioni/sottrazioni (o risolvi prima la parentesi).",
          "skill": "numeri.ordine_operazioni",
          "cognitiveType": "apply",
          "generatorKey": "numeri",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Ricorda l'ordine delle operazioni: prima moltiplicazioni/divisioni, poi addizioni/sottrazioni (o risolvi prima la parentesi)."
          ]
        },
        {
          "q": "7 + 8 × 4 = ?",
          "answer": "39",
          "hint": "Ricorda l'ordine delle operazioni: prima moltiplicazioni/divisioni, poi addizioni/sottrazioni (o risolvi prima la parentesi).",
          "skill": "numeri.ordine_operazioni",
          "cognitiveType": "apply",
          "generatorKey": "numeri",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Ricorda l'ordine delle operazioni: prima moltiplicazioni/divisioni, poi addizioni/sottrazioni (o risolvi prima la parentesi)."
          ]
        },
        {
          "q": "4 − -5 × 6 = ?",
          "answer": "34",
          "hint": "Ricorda l'ordine delle operazioni: prima moltiplicazioni/divisioni, poi addizioni/sottrazioni (o risolvi prima la parentesi).",
          "skill": "numeri.ordine_operazioni",
          "cognitiveType": "apply",
          "generatorKey": "numeri",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Ricorda l'ordine delle operazioni: prima moltiplicazioni/divisioni, poi addizioni/sottrazioni (o risolvi prima la parentesi)."
          ]
        },
        {
          "q": "(-7 − 3) × 5 = ?",
          "answer": "-50",
          "hint": "Ricorda l'ordine delle operazioni: prima moltiplicazioni/divisioni, poi addizioni/sottrazioni (o risolvi prima la parentesi).",
          "skill": "numeri.ordine_operazioni",
          "cognitiveType": "apply",
          "generatorKey": "numeri",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Ricorda l'ordine delle operazioni: prima moltiplicazioni/divisioni, poi addizioni/sottrazioni (o risolvi prima la parentesi)."
          ]
        },
        {
          "q": "(-4 − -5) × 3 = ?",
          "answer": "3",
          "hint": "Ricorda l'ordine delle operazioni: prima moltiplicazioni/divisioni, poi addizioni/sottrazioni (o risolvi prima la parentesi).",
          "skill": "numeri.ordine_operazioni",
          "cognitiveType": "apply",
          "generatorKey": "numeri",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Ricorda l'ordine delle operazioni: prima moltiplicazioni/divisioni, poi addizioni/sottrazioni (o risolvi prima la parentesi)."
          ]
        },
        {
          "q": "-1 − 1 × 5 = ?",
          "answer": "-6",
          "hint": "Ricorda l'ordine delle operazioni: prima moltiplicazioni/divisioni, poi addizioni/sottrazioni (o risolvi prima la parentesi).",
          "skill": "numeri.ordine_operazioni",
          "cognitiveType": "apply",
          "generatorKey": "numeri",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Ricorda l'ordine delle operazioni: prima moltiplicazioni/divisioni, poi addizioni/sottrazioni (o risolvi prima la parentesi)."
          ]
        },
        {
          "q": "-72 : 8 + 4 = ?",
          "answer": "-5",
          "hint": "Ricorda l'ordine delle operazioni: prima moltiplicazioni/divisioni, poi addizioni/sottrazioni (o risolvi prima la parentesi).",
          "skill": "numeri.ordine_operazioni",
          "cognitiveType": "apply",
          "generatorKey": "numeri",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Ricorda l'ordine delle operazioni: prima moltiplicazioni/divisioni, poi addizioni/sottrazioni (o risolvi prima la parentesi)."
          ]
        },
        {
          "q": "Il fruttivendolo Renato confeziona le arance in vassoi da 12 o in vassoi da 21: in entrambi i casi, riempiendo i vassoi al massimo, gli avanza sempre 1 arancia. Sapendo che ha meno di 100 arance, quante sono esattamente?",
          "answer": "85",
          "hint": "Il numero di arance meno 1 deve essere multiplo sia di 12 sia di 21: cerca il loro minimo comune multiplo.",
          "logic": true,
          "skill": "numeri.logica",
          "cognitiveType": "integrate",
          "generatorKey": "numeri",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Il numero di arance meno 1 deve essere multiplo sia di 12 sia di 21: cerca il loro minimo comune multiplo."
          ]
        },
        {
          "q": "Un orologio digitale mostra ore e minuti (es. le 15:23 → cifre 1,5,2,3). Qual è, in un giorno intero, il valore massimo possibile della somma delle 4 cifre mostrate?",
          "type": "choice",
          "options": [
            "21",
            "22",
            "23",
            "24",
            "25"
          ],
          "correct": 3,
          "hint": "Le ore vanno da 00 a 23 e i minuti da 00 a 59: cerca l'orario con le cifre più \"grandi\" possibile.",
          "logic": true,
          "skill": "numeri.logica",
          "cognitiveType": "integrate",
          "generatorKey": "numeri",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Le ore vanno da 00 a 23 e i minuti da 00 a 59: cerca l'orario con le cifre più \"grandi\" possibile."
          ]
        },
        {
          "q": "In un hotel, le camere sul lato mare hanno solo numeri dispari. Quante camere dispari ci sono tra la 101 e la 199 (compresi)?",
          "answer": "50",
          "hint": "Conta quanti numeri dispari ci sono in quell'intervallo: puoi pensare a coppie (101,103), (105,107)...",
          "logic": true,
          "skill": "numeri.logica",
          "cognitiveType": "apply",
          "generatorKey": "numeri",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Conta quanti numeri dispari ci sono in quell'intervallo: puoi pensare a coppie (101,103), (105,107)..."
          ]
        },
        {
          "q": "In uno stabilimento balneare ci sono 6 file da 9 ombrelloni ciascuna. Se 5 sono rotti e vengono tolti, quanti ombrelloni restano?",
          "answer": "49",
          "hint": "Calcola prima il totale degli ombrelloni, poi sottrai quelli rotti.",
          "skill": "numeri.problemi_pratici",
          "cognitiveType": "apply",
          "generatorKey": "numeri",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Calcola prima il totale degli ombrelloni, poi sottrai quelli rotti."
          ]
        }
      ],
      "difficile": [
        {
          "q": "Metti in ordine i passaggi per risolvere 12 − [3 + (2 × (−4) + 5)]:",
          "format": "order",
          "skill": "numeri.parentesi_annidate",
          "cognitiveType": "integrate",
          "hint": "Guarda sempre quale parentesi è la più interna (quella che non contiene altre parentesi al suo interno): quella si risolve per prima.",
          "hintSteps": [
            "Cerca la parentesi che non contiene nessun'altra parentesi al suo interno: quella tonda con la moltiplicazione è la più interna, quindi è la prima da risolvere.",
            "Regola: risolvi sempre la parentesi più interna, sostituiscila con il suo risultato, e ripeti finché non resta nessuna parentesi, procedendo verso quella più esterna — mai il contrario."
          ],
          "orderData": {
            "steps": [
              {
                "id": "s1",
                "text": "L'espressione da risolvere è 12 − [3 + (2 × (−4) + 5)]."
              },
              {
                "id": "s2",
                "text": "Risolvi la moltiplicazione nella parentesi tonda più interna: 2 × (−4) = −8. L'espressione diventa 12 − [3 + (−8 + 5)]."
              },
              {
                "id": "s3",
                "text": "Risolvi l'addizione rimasta nella parentesi tonda: −8 + 5 = −3. L'espressione diventa 12 − [3 + (−3)]."
              },
              {
                "id": "s4",
                "text": "Risolvi la parentesi quadra: 3 + (−3) = 0. L'espressione diventa 12 − 0."
              },
              {
                "id": "s5",
                "text": "Esegui l'ultima sottrazione: 12 − 0 = 12."
              }
            ],
            "correctOrder": [
              "s1",
              "s2",
              "s3",
              "s4",
              "s5"
            ]
          }
        },
        {
          "q": "[-12 : 4 − 3] × (−6) = ?",
          "answer": "36",
          "hint": "Risolvi sempre prima le parentesi più interne, poi procedi verso le più esterne.",
          "skill": "numeri.parentesi_annidate",
          "cognitiveType": "integrate",
          "generatorKey": "numeri",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Risolvi sempre prima le parentesi più interne, poi procedi verso le più esterne."
          ]
        },
        {
          "q": "[9 : 3 − -3] × (−1) = ?",
          "answer": "-6",
          "hint": "Risolvi sempre prima le parentesi più interne, poi procedi verso le più esterne.",
          "skill": "numeri.parentesi_annidate",
          "cognitiveType": "integrate",
          "generatorKey": "numeri",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Risolvi sempre prima le parentesi più interne, poi procedi verso le più esterne."
          ]
        },
        {
          "q": "[28 : 4 − 6] × (−3) = ?",
          "answer": "-3",
          "hint": "Risolvi sempre prima le parentesi più interne, poi procedi verso le più esterne.",
          "skill": "numeri.parentesi_annidate",
          "cognitiveType": "integrate",
          "generatorKey": "numeri",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Risolvi sempre prima le parentesi più interne, poi procedi verso le più esterne."
          ]
        },
        {
          "q": "(3 − -3) × (5 − 2) = ?",
          "answer": "18",
          "hint": "Risolvi sempre prima le parentesi più interne, poi procedi verso le più esterne.",
          "skill": "numeri.ordine_operazioni",
          "cognitiveType": "apply",
          "generatorKey": "numeri",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Risolvi sempre prima le parentesi più interne, poi procedi verso le più esterne."
          ]
        },
        {
          "q": "[27 : 3 − -3] × (−1) = ?",
          "answer": "-12",
          "hint": "Risolvi sempre prima le parentesi più interne, poi procedi verso le più esterne.",
          "skill": "numeri.parentesi_annidate",
          "cognitiveType": "integrate",
          "generatorKey": "numeri",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Risolvi sempre prima le parentesi più interne, poi procedi verso le più esterne."
          ]
        },
        {
          "q": "8 − [-5 − (-5 − 4)] = ?",
          "answer": "4",
          "hint": "Risolvi sempre prima le parentesi più interne, poi procedi verso le più esterne.",
          "skill": "numeri.parentesi_annidate",
          "cognitiveType": "integrate",
          "generatorKey": "numeri",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Risolvi sempre prima le parentesi più interne, poi procedi verso le più esterne."
          ]
        },
        {
          "q": "2 − [-9 − (-6 − 3)] = ?",
          "answer": "2",
          "hint": "Risolvi sempre prima le parentesi più interne, poi procedi verso le più esterne.",
          "skill": "numeri.parentesi_annidate",
          "cognitiveType": "integrate",
          "generatorKey": "numeri",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Risolvi sempre prima le parentesi più interne, poi procedi verso le più esterne."
          ]
        },
        {
          "q": "-2 − [4 − (2 − 4)] = ?",
          "answer": "-8",
          "hint": "Risolvi sempre prima le parentesi più interne, poi procedi verso le più esterne.",
          "skill": "numeri.parentesi_annidate",
          "cognitiveType": "integrate",
          "generatorKey": "numeri",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Risolvi sempre prima le parentesi più interne, poi procedi verso le più esterne."
          ]
        },
        {
          "q": "In una gara con 4 concorrenti, Jacopo dice: \"Sono arrivato primo\". Luca dice: \"Non sono né primo né ultimo\". Michele dice: \"Non sono ultimo\". Nando dice: \"Sono arrivato quarto\". Solo uno di loro ha mentito: chi?",
          "type": "choice",
          "options": [
            "Jacopo",
            "Luca",
            "Michele",
            "Nando"
          ],
          "correct": 0,
          "hint": "Supponi, uno alla volta, che ciascuno abbia mentito, e controlla se le altre tre affermazioni possono essere tutte vere insieme.",
          "logic": true,
          "skill": "numeri.logica",
          "cognitiveType": "reason",
          "generatorKey": "numeri",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Supponi, uno alla volta, che ciascuno abbia mentito, e controlla se le altre tre affermazioni possono essere tutte vere insieme."
          ]
        },
        {
          "q": "Un albergo numera le camere da 1 a 200. Quante di queste contengono almeno una cifra 7 (es. 7, 17, 71, 173...)?",
          "answer": "38",
          "hint": "Conta separatamente i numeri da 1 a 99 con almeno un 7 (sono 19), poi quelli da 100 a 200 con almeno un 7 (altri 19).",
          "logic": true,
          "skill": "numeri.logica",
          "cognitiveType": "reason",
          "generatorKey": "numeri",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Conta separatamente i numeri da 1 a 99 con almeno un 7 (sono 19), poi quelli da 100 a 200 con almeno un 7 (altri 19)."
          ]
        },
        {
          "q": "Un dado a 6 facce viene lanciato due volte. In quanti modi diversi la somma dei due lanci può fare 8?",
          "answer": "5",
          "hint": "Elenca tutte le coppie (primo lancio, secondo lancio) che sommano a 8, con ciascun valore da 1 a 6.",
          "logic": true,
          "skill": "numeri.logica",
          "cognitiveType": "reason",
          "generatorKey": "numeri",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Elenca tutte le coppie (primo lancio, secondo lancio) che sommano a 8, con ciascun valore da 1 a 6."
          ]
        },
        {
          "q": "Una leggenda narra che l'inventore degli scacchi chiese come ricompensa 1 chicco di riso sulla prima casella, 2 sulla seconda, 4 sulla terza, raddoppiando ogni volta. Quanti chicchi ci sono sulla decima casella?",
          "answer": "512",
          "hint": "Ogni casella raddoppia la precedente: sulla casella n ci sono 2 elevato alla (n−1) chicchi.",
          "logic": true,
          "skill": "numeri.logica",
          "cognitiveType": "reason",
          "generatorKey": "numeri",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Ogni casella raddoppia la precedente: sulla casella n ci sono 2 elevato alla (n−1) chicchi."
          ]
        }
      ]
    },
    "quiz": [
      {
        "q": "Quanto fa (−8) + 3?",
        "options": [
          "−11",
          "−5",
          "5",
          "11"
        ],
        "correct": 1
      },
      {
        "q": "Quanto fa (−6) · (−7)?",
        "options": [
          "−42",
          "−13",
          "13",
          "42"
        ],
        "correct": 3
      },
      {
        "q": "Quanto fa 24 : (−6)?",
        "options": [
          "−4",
          "−18",
          "4",
          "18"
        ],
        "correct": 0
      },
      {
        "q": "Quanto fa 5 − (−9)?",
        "options": [
          "−14",
          "−4",
          "4",
          "14"
        ],
        "correct": 3
      },
      {
        "q": "Quanto fa 4 + 2 · (−3)?",
        "options": [
          "−18",
          "−2",
          "2",
          "18"
        ],
        "correct": 1
      },
      {
        "q": "Quanto fa (−3 − 4) · (−2)?",
        "options": [
          "−14",
          "−1",
          "1",
          "14"
        ],
        "correct": 3
      },
      {
        "q": "Quanto fa (−9) × 4?",
        "options": [
          "−36",
          "−13",
          "13",
          "36"
        ],
        "correct": 0
      },
      {
        "q": "Quanto fa 5 − 3 × (−2)?",
        "options": [
          "1",
          "−1",
          "11",
          "−11"
        ],
        "correct": 2
      },
      {
        "q": "Quanto fa (−20) : 5 + 2?",
        "options": [
          "−2",
          "−6",
          "2",
          "6"
        ],
        "correct": 0
      },
      {
        "q": "Quanto fa (−4 − 6) × (−2)?",
        "options": [
          "−20",
          "−16",
          "16",
          "20"
        ],
        "correct": 3
      },
      {
        "q": "Quanto fa 20 − [3 × (4 − 7) + 5]?",
        "options": [
          "6",
          "10",
          "16",
          "24"
        ],
        "correct": 3
      }
    ]
  },
  {
    "id": "frazioni",
    "icon": "🍕",
    "accent": "coral",
    "title": "Frazioni e Percentuali",
    "tagline": "Dividere in parti uguali",
    "theory": [
      {
        "title": "Cos'è una frazione",
        "body": "Una frazione a/b rappresenta una parte di un intero diviso in b parti uguali, di cui ne prendiamo a.\n\nI due numeri della frazione hanno un nome preciso: a, il numero sopra la linea, si chiama numeratore e indica quante parti prendiamo; b, il numero sotto la linea, si chiama denominatore e indica in quante parti uguali è stato diviso l'intero.\n\nEsempio: 3/4 di una pizza significa dividerla in 4 fette uguali (il denominatore è 4) e prenderne 3 (il numeratore è 3)."
      },
      {
        "title": "Cos’è il MCD?",
        "type": "microlesson",
        "concept": "mcd",
        "situation": "Per semplificare una frazione al minimo in un solo colpo, invece di provare a dividere per 2, poi per 3, poi ancora… conviene trovare subito il numero più grande possibile per cui dividere.",
        "explain": "Il MCD (Massimo Comun Divisore) di due numeri è il più grande numero che li divide entrambi esattamente, senza resto. Dividendo numeratore e denominatore per il loro MCD si ottiene subito la frazione ridotta ai minimi termini.",
        "example": "MCD(12, 18): i divisori di 12 sono 1, 2, 3, 4, 6, 12; i divisori di 18 sono 1, 2, 3, 6, 9, 18. Il più grande in comune è 6, quindi MCD(12, 18) = 6.",
        "check": {
          "q": "Qual è il MCD tra 8 e 12?",
          "options": [
            "2",
            "4",
            "6",
            "24"
          ],
          "correct": 1
        }
      },
      {
        "title": "Cos’è il mcm?",
        "type": "microlesson",
        "concept": "mcm",
        "situation": "Per sommare due frazioni con denominatori diversi non puoi sommare direttamente i numeratori: prima devi \"tradurle\" con lo stesso denominatore.",
        "explain": "Il mcm (minimo comune multiplo) di due numeri è il più piccolo numero che è multiplo di entrambi. Usato come denominatore comune, permette di sommare o confrontare frazioni con denominatori diversi.",
        "example": "mcm(4, 6): i multipli di 4 sono 4, 8, 12, 16…; i multipli di 6 sono 6, 12, 18…; il più piccolo in comune è 12, quindi mcm(4, 6) = 12.",
        "check": {
          "q": "Qual è il mcm tra 3 e 4?",
          "options": [
            "7",
            "1",
            "12",
            "24"
          ],
          "correct": 2
        }
      },
      {
        "title": "Semplificare e confrontare",
        "body": "Una frazione si semplifica dividendo numeratore e denominatore per il loro MCD (visto nella scheda precedente): il risultato è già ridotto ai minimi termini in un solo passaggio.\n\nEsempio: nella frazione 6/8, il MCD tra 6 e 8 è 2: dividendo numeratore e denominatore per 2 si ottiene 3/4, già ridotta ai minimi termini (perché MCD(3,4) = 1, non si può più semplificare).\n\nPer sommare o confrontare frazioni con denominatori diversi serve invece un denominatore comune: si usa il mcm (visto nella scheda precedente) dei due denominatori."
      },
      {
        "title": "Operazioni con le frazioni",
        "body": "Somma/sottrazione: prima si riducono allo stesso denominatore, poi si sommano i numeratori.\n\nMoltiplicazione: numeratore per numeratore, denominatore per denominatore.\n\nDivisione: si moltiplica la prima frazione per il reciproco (capovolta) della seconda."
      },
      {
        "title": "Le percentuali",
        "body": "Una percentuale è una frazione con denominatore 100. Il 20% di un numero significa 20/100 di quel numero.\n\nPer calcolare il p% di un numero N: (N · p) : 100.\n\nEsempio: il 20% di 50 = (50 · 20) : 100 = 10.\n\nAttenzione quando nello stesso problema ci sono DUE variazioni percentuali una dopo l'altra (per esempio uno sconto seguito da un altro sconto, o un aumento seguito da uno sconto): la seconda percentuale si calcola SEMPRE sul nuovo valore ottenuto dopo la prima variazione, non su quello di partenza.\n\nEsempio: un prezzo di 100€ ha uno sconto del 20%, poi un ulteriore sconto del 10%.\n1) Primo sconto: il 20% di 100€ è 20€, quindi il nuovo prezzo è 100€ − 20€ = 80€.\n2) Secondo sconto: si calcola il 10% sul NUOVO prezzo di 80€ (non più su 100€), cioè il 10% di 80€ è 8€. Prezzo finale: 80€ − 8€ = 72€.\n\nAttenzione: lo sconto totale non è semplicemente 20% + 10% = 30% (che darebbe 70€). È un errore comune, perché il secondo sconto si applica su un importo già ridotto: lo sconto complessivo \"reale\" è quindi minore del 30% (in questo esempio è del 28%)."
      },
      {
        "title": "Esempio svolto",
        "type": "steps",
        "steps": [
          "Il problema: 2/3 + 1/4",
          "Troviamo il denominatore comune: mcm(3,4) = 12",
          "Trasformiamo le frazioni: 2/3 = 8/12   e   1/4 = 3/12",
          "Sommiamo i numeratori: 8/12 + 3/12 = 11/12\n\nRisultato: 11/12"
        ]
      },
      {
        "title": "Un altro esempio",
        "type": "steps",
        "steps": [
          "Il problema: uno zaino costa 60€, con uno sconto del 15%. Quanto si paga?",
          "Calcoliamo lo sconto: 15% di 60 = (60×15):100 = 9€",
          "Sottraiamo lo sconto dal prezzo pieno: 60€ − 9€ = 51€\n\nRisultato: si pagano 51€"
        ]
      }
    ],
    "exercises": {
      "facile": [
        {
          "q": "Trova il passaggio sbagliato in questo procedimento per semplificare la frazione 9/12.",
          "format": "error-detect",
          "skill": "frazioni.mcd_semplificazione",
          "cognitiveType": "diagnose",
          "hint": "Il MCD trovato nel secondo passaggio è corretto: controlla con calma il calcolo della divisione nel passaggio successivo.",
          "hintSteps": [
            "Il MCD(9,12) = 3 indicato nel secondo passaggio è corretto: il problema non è nel MCD, ma nel calcolo che segue.",
            "Quando dividi il denominatore 12 per il MCD 3, il risultato deve essere 12 : 3 = 4, non 5: ricontrolla quella divisione."
          ],
          "errorData": {
            "steps": [
              {
                "text": "Il problema: semplifica la frazione 9/12."
              },
              {
                "text": "Troviamo il MCD tra 9 e 12: i divisori di 9 sono 1, 3, 9; i divisori di 12 sono 1, 2, 3, 4, 6, 12; il divisore più grande in comune è 3, quindi MCD(9,12) = 3."
              },
              {
                "text": "Dividiamo numeratore e denominatore per il MCD: 9 : 3 = 3 e 12 : 3 = 5, quindi la frazione diventa 3/5."
              },
              {
                "text": "3/5 è già ridotta ai minimi termini, perché MCD(3,5) = 1."
              }
            ],
            "errorIndex": 2,
            "explanation": "Il MCD trovato (3) è corretto, ma il calcolo della divisione nel passo successivo è sbagliato: 12 : 3 fa 4, non 5. Il procedimento corretto è 9 : 3 = 3 e 12 : 3 = 4, quindi la frazione semplificata è 3/4 (già ridotta al minimo, perché MCD(3,4) = 1), non 3/5."
          }
        },
        {
          "q": "Quanto fa il 40% di 60?",
          "answer": "24",
          "hint": "(numero × percentuale) : 100",
          "skill": "frazioni.percentuale_di_un_numero",
          "cognitiveType": "recognize",
          "generatorKey": "frazioni",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "(numero × percentuale) : 100"
          ]
        },
        {
          "q": "Quanto fa il 75% di 80?",
          "answer": "60",
          "hint": "(numero × percentuale) : 100",
          "skill": "frazioni.percentuale_di_un_numero",
          "cognitiveType": "recognize",
          "generatorKey": "frazioni",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "(numero × percentuale) : 100"
          ]
        },
        {
          "q": "Semplifica la frazione 2/6",
          "answer": "1/3",
          "hint": "Dividi numeratore e denominatore per lo stesso numero (il loro massimo comun divisore).",
          "skill": "frazioni.mcd_semplificazione",
          "cognitiveType": "recognize",
          "generatorKey": "frazioni",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Dividi numeratore e denominatore per lo stesso numero (il loro massimo comun divisore)."
          ]
        },
        {
          "q": "Quanto fa il 10% di 80?",
          "answer": "8",
          "hint": "(numero × percentuale) : 100",
          "skill": "frazioni.percentuale_di_un_numero",
          "cognitiveType": "recognize",
          "generatorKey": "frazioni",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "(numero × percentuale) : 100"
          ]
        },
        {
          "q": "Semplifica la frazione 12/18",
          "answer": "2/3",
          "hint": "Dividi numeratore e denominatore per lo stesso numero (il loro massimo comun divisore).",
          "skill": "frazioni.mcd_semplificazione",
          "cognitiveType": "recognize",
          "generatorKey": "frazioni",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Dividi numeratore e denominatore per lo stesso numero (il loro massimo comun divisore)."
          ]
        },
        {
          "q": "7/8 + 1/8 = ?",
          "answer": "1",
          "hint": "Stesso denominatore: somma solo i numeratori.",
          "skill": "frazioni.somma_sottrazione_stesso_denominatore",
          "cognitiveType": "recognize",
          "generatorKey": "frazioni",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Stesso denominatore: somma solo i numeratori."
          ]
        },
        {
          "q": "Quanto fa il 50% di 20?",
          "answer": "10",
          "hint": "(numero × percentuale) : 100",
          "skill": "frazioni.percentuale_di_un_numero",
          "cognitiveType": "recognize",
          "generatorKey": "frazioni",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "(numero × percentuale) : 100"
          ]
        },
        {
          "q": "1/8 + 5/8 = ?",
          "answer": "3/4",
          "hint": "Stesso denominatore: somma solo i numeratori.",
          "skill": "frazioni.somma_sottrazione_stesso_denominatore",
          "cognitiveType": "recognize",
          "generatorKey": "frazioni",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Stesso denominatore: somma solo i numeratori."
          ]
        },
        {
          "q": "Se 6 boscaioli segano 6 alberi in 6 ore, quanto tempo impiegheranno 10 boscaioli a segare 10 alberi?",
          "answer": "6",
          "unit": "ore",
          "hint": "Il rapporto tra boscaioli e alberi resta lo stesso di prima: ogni boscaiolo continua a segare un albero nello stesso tempo.",
          "logic": true,
          "skill": "frazioni.ragionamento_proporzionale",
          "cognitiveType": "reason",
          "generatorKey": "frazioni",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Il rapporto tra boscaioli e alberi resta lo stesso di prima: ogni boscaiolo continua a segare un albero nello stesso tempo."
          ]
        },
        {
          "q": "Un pacchetto vacanze a Rimini costa 480€, con lo sconto Early Booking del 15%. Quanto costa dopo lo sconto?",
          "answer": "408",
          "unit": "€",
          "hint": "Calcola il 15% di 480 e sottrailo dal prezzo pieno.",
          "skill": "frazioni.problema_percentuale_sconto",
          "cognitiveType": "apply",
          "generatorKey": "frazioni",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Calcola il 15% di 480 e sottrailo dal prezzo pieno."
          ]
        },
        {
          "q": "In una spiaggia, 3/5 degli ombrelloni sono occupati. Se ci sono 40 ombrelloni in totale, quanti sono liberi?",
          "answer": "16",
          "hint": "Calcola prima quanti sono occupati (3/5 di 40), poi sottrai dal totale.",
          "skill": "frazioni.problema_frazione_parte_intero",
          "cognitiveType": "apply",
          "generatorKey": "frazioni",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Calcola prima quanti sono occupati (3/5 di 40), poi sottrai dal totale."
          ]
        },
        {
          "q": "2/6 + 3/6 = ?",
          "answer": "5/6",
          "hint": "Stesso denominatore: somma solo i numeratori.",
          "skill": "frazioni.somma_sottrazione_stesso_denominatore",
          "cognitiveType": "recognize",
          "generatorKey": "frazioni",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Stesso denominatore: somma solo i numeratori."
          ]
        }
      ],
      "medio": [
        {
          "q": "Osserva ogni espressione: riconosci se serve sommare subito i numeratori (stesso denominatore), trovare prima il mcm (denominatori diversi), oppure calcolare una frazione di un numero.",
          "format": "group",
          "skill": "frazioni.riconoscere_tecnica_frazioni",
          "cognitiveType": "apply",
          "hint": "Guarda prima i denominatori delle frazioni coinvolte: sono uguali, sono diversi, oppure non c'è affatto una somma tra due frazioni?",
          "hintSteps": [
            "Se i denominatori sono già uguali puoi sommare subito i numeratori. Se sono diversi, devi prima trovare il mcm e trasformare le frazioni. Se invece l'esercizio chiede 'la frazione X di un numero', non stai sommando nulla: devi dividere il numero per il denominatore e moltiplicare per il numeratore.",
            "Regola pratica: cerca il segno '+' o '−' tra due frazioni per riconoscere una somma (poi confronta i denominatori); cerca invece la parola 'di' tra una frazione e un numero per riconoscere 'frazione di un numero'."
          ],
          "groupData": {
            "buckets": [
              {
                "key": "stesso_denom",
                "label": "Stesso denominatore: sommo subito"
              },
              {
                "key": "denom_diverso",
                "label": "Denominatori diversi: serve il mcm"
              },
              {
                "key": "frazione_di_numero",
                "label": "Frazione di un numero"
              }
            ],
            "terms": [
              {
                "id": "u1",
                "label": "3/8 + 2/8",
                "group": "stesso_denom"
              },
              {
                "id": "u2",
                "label": "2/5 + 1/3",
                "group": "denom_diverso"
              },
              {
                "id": "u3",
                "label": "Calcola 3/5 di 40",
                "group": "frazione_di_numero"
              },
              {
                "id": "u4",
                "label": "5/6 − 1/6",
                "group": "stesso_denom"
              },
              {
                "id": "u5",
                "label": "1/4 + 2/3",
                "group": "denom_diverso"
              },
              {
                "id": "u6",
                "label": "Calcola 2/7 di 63",
                "group": "frazione_di_numero"
              }
            ]
          }
        },
        {
          "q": "Calcola 4/6 di 24",
          "answer": "16",
          "hint": "Dividi il numero per il denominatore, poi moltiplica per il numeratore.",
          "skill": "frazioni.frazione_di_un_numero",
          "cognitiveType": "apply",
          "generatorKey": "frazioni",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Dividi il numero per il denominatore, poi moltiplica per il numeratore."
          ]
        },
        {
          "q": "Calcola 3/6 di 48",
          "answer": "24",
          "hint": "Dividi il numero per il denominatore, poi moltiplica per il numeratore.",
          "skill": "frazioni.frazione_di_un_numero",
          "cognitiveType": "apply",
          "generatorKey": "frazioni",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Dividi il numero per il denominatore, poi moltiplica per il numeratore."
          ]
        },
        {
          "q": "Uno zaino da viaggio costa 150€ con uno sconto del 15%. Quanti euro si risparmiano?",
          "answer": "22.5",
          "unit": "€",
          "hint": "Calcola il 15% di 150.",
          "skill": "frazioni.problema_percentuale_sconto",
          "cognitiveType": "apply",
          "generatorKey": "frazioni",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Calcola il 15% di 150."
          ]
        },
        {
          "q": "Uno zaino da viaggio costa 120€ con uno sconto del 30%. Quanti euro si risparmiano?",
          "answer": "36",
          "unit": "€",
          "hint": "Calcola il 30% di 120.",
          "skill": "frazioni.problema_percentuale_sconto",
          "cognitiveType": "apply",
          "generatorKey": "frazioni",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Calcola il 30% di 120."
          ]
        },
        {
          "q": "1/2 + 5/6 = ?",
          "answer": "4/3",
          "hint": "Trova il denominatore comune, poi somma i numeratori.",
          "skill": "frazioni.somma_sottrazione_denominatore_diverso",
          "cognitiveType": "apply",
          "generatorKey": "frazioni",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Trova il denominatore comune, poi somma i numeratori."
          ]
        },
        {
          "q": "1/2 + 3/4 = ?",
          "answer": "5/4",
          "hint": "Trova il denominatore comune, poi somma i numeratori.",
          "skill": "frazioni.somma_sottrazione_denominatore_diverso",
          "cognitiveType": "apply",
          "generatorKey": "frazioni",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Trova il denominatore comune, poi somma i numeratori."
          ]
        },
        {
          "q": "1/2 + 1/6 = ?",
          "answer": "2/3",
          "hint": "Trova il denominatore comune, poi somma i numeratori.",
          "skill": "frazioni.somma_sottrazione_denominatore_diverso",
          "cognitiveType": "apply",
          "generatorKey": "frazioni",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Trova il denominatore comune, poi somma i numeratori."
          ]
        },
        {
          "q": "Calcola 2/4 di 16",
          "answer": "8",
          "hint": "Dividi il numero per il denominatore, poi moltiplica per il numeratore.",
          "skill": "frazioni.frazione_di_un_numero",
          "cognitiveType": "apply",
          "generatorKey": "frazioni",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Dividi il numero per il denominatore, poi moltiplica per il numeratore."
          ]
        },
        {
          "q": "In una gara di cucina, la metà dei partecipanti prepara un dolce e 2/5 preparano un primo piatto: il resto (6 persone) prepara un antipasto. Quanti sono i partecipanti in totale?",
          "answer": "60",
          "hint": "Dolce e primo insieme sono 1/2 + 2/5 dei partecipanti: il resto (le 6 persone) è la parte rimanente della frazione totale.",
          "logic": true,
          "skill": "frazioni.ragionamento_proporzionale",
          "cognitiveType": "integrate",
          "generatorKey": "frazioni",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Dolce e primo insieme sono 1/2 + 2/5 dei partecipanti: il resto (le 6 persone) è la parte rimanente della frazione totale."
          ]
        },
        {
          "q": "In agenzia, 5/6 dei clienti prenota un volo con bagaglio incluso. Su 120 clienti, quanti NON hanno il bagaglio incluso?",
          "answer": "20",
          "hint": "Calcola prima quanti hanno il bagaglio incluso (5/6 di 120), poi sottrai dal totale.",
          "skill": "frazioni.problema_frazione_parte_intero",
          "cognitiveType": "apply",
          "generatorKey": "frazioni",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Calcola prima quanti hanno il bagaglio incluso (5/6 di 120), poi sottrai dal totale."
          ]
        },
        {
          "q": "Un hotel aumenta il prezzo di una camera da 80€ del 25% in alta stagione. Poi, per chi prenota online, applica uno sconto del 10% sul nuovo prezzo. Quanto costa la camera prenotata online?",
          "answer": "90",
          "unit": "€",
          "hint": "Prima aumenta 80€ del 25%, poi sconta il 10% sul NUOVO prezzo (non su 80).",
          "skill": "frazioni.variazione_percentuale_successiva",
          "cognitiveType": "integrate",
          "generatorKey": "frazioni",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Prima aumenta 80€ del 25%, poi sconta il 10% sul NUOVO prezzo (non su 80)."
          ]
        },
        {
          "q": "Il 3/8 di una classe di 32 studenti va in gita scolastica a Firenze. Quanti studenti restano a scuola?",
          "answer": "20",
          "hint": "Calcola prima quanti vanno in gita (3/8 di 32), poi sottrai dal totale.",
          "skill": "frazioni.problema_frazione_parte_intero",
          "cognitiveType": "apply",
          "generatorKey": "frazioni",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Calcola prima quanti vanno in gita (3/8 di 32), poi sottrai dal totale."
          ]
        }
      ],
      "difficile": [
        {
          "q": "Per ciascun problema, riconosci se serve una percentuale diretta, una percentuale inversa o una variazione successiva (due variazioni percentuali in cascata).",
          "format": "group",
          "skill": "frazioni.riconoscere_tipo_percentuale",
          "cognitiveType": "reason",
          "hint": "Chiediti: conosci già il totale e ti serve trovare una parte (diretta)? Oppure conosci una parte/percentuale e devi risalire al totale (inversa)? O ci sono due variazioni in fila (successiva)?",
          "hintSteps": [
            "Percentuale diretta: conosci il totale (o il prezzo pieno) e devi calcolare quanto vale una sua percentuale. Percentuale inversa: conosci solo una parte o una percentuale e devi risalire al totale/prezzo pieno. Variazione successiva: nello stesso problema compaiono DUE percentuali applicate una dopo l'altra.",
            "Cerca le parole chiave: se leggi due percentuali diverse con 'poi' o 'sul nuovo prezzo', è sempre variazione successiva; se la domanda chiede 'quanto costava PRIMA' o 'qual è il prezzo pieno' partendo da un valore già scontato/aumentato, è percentuale inversa; altrimenti, se calcoli direttamente una percentuale di un valore dato, è percentuale diretta."
          ],
          "groupData": {
            "buckets": [
              {
                "key": "diretta",
                "label": "Percentuale diretta"
              },
              {
                "key": "inversa",
                "label": "Percentuale inversa"
              },
              {
                "key": "successiva",
                "label": "Variazione successiva"
              }
            ],
            "terms": [
              {
                "id": "t1",
                "label": "Un volo costa 240€ con uno sconto del 15%: quanto si paga?",
                "group": "diretta"
              },
              {
                "id": "t2",
                "label": "Un souvenir costa 18€, cioè il 30% del prezzo di listino: qual è il prezzo di listino?",
                "group": "inversa"
              },
              {
                "id": "t3",
                "label": "Il prezzo aumenta del 10%, poi si applica uno sconto del 20% sul nuovo prezzo: prezzo finale?",
                "group": "successiva"
              },
              {
                "id": "t4",
                "label": "Il 25% di un gruppo di 200 turisti parte in gita al mattino: quanti partono?",
                "group": "diretta"
              },
              {
                "id": "t5",
                "label": "Una camera costa 60€ dopo uno sconto del 20%: quanto costava prima dello sconto?",
                "group": "inversa"
              },
              {
                "id": "t6",
                "label": "Il biglietto aumenta del 5%, poi c'è uno sconto studenti del 50% sul nuovo prezzo: quanto pagano gli studenti?",
                "group": "successiva"
              }
            ]
          }
        },
        {
          "q": "Un viaggio costa 500€. Il prezzo aumenta del 60%, poi sul nuovo prezzo viene applicato uno sconto del 25%. Prezzo finale?",
          "answer": "600",
          "unit": "€",
          "hint": "Aumenta prima 500 del 60%, poi applica lo sconto del 25% sul NUOVO prezzo (non su 500).",
          "skill": "frazioni.variazione_percentuale_successiva",
          "cognitiveType": "integrate",
          "generatorKey": "frazioni",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Aumenta prima 500 del 60%, poi applica lo sconto del 25% sul NUOVO prezzo (non su 500)."
          ]
        },
        {
          "q": "Un viaggio costa 350€. Il prezzo aumenta del 20%, poi sul nuovo prezzo viene applicato uno sconto del 5%. Prezzo finale?",
          "answer": "399",
          "unit": "€",
          "hint": "Aumenta prima 350 del 20%, poi applica lo sconto del 5% sul NUOVO prezzo (non su 350).",
          "skill": "frazioni.variazione_percentuale_successiva",
          "cognitiveType": "integrate",
          "generatorKey": "frazioni",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Aumenta prima 350 del 20%, poi applica lo sconto del 5% sul NUOVO prezzo (non su 350)."
          ]
        },
        {
          "q": "Un pacchetto vacanza in agenzia costa 400€. Con lo sconto \"prenota prima\" del 10% quanto si paga?",
          "answer": "360",
          "unit": "€",
          "hint": "Sottrai il 10% di 400 dal prezzo pieno.",
          "skill": "frazioni.problema_percentuale_sconto",
          "cognitiveType": "apply",
          "generatorKey": "frazioni",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Sottrai il 10% di 400 dal prezzo pieno."
          ]
        },
        {
          "q": "Calcola 3/4 di 200, poi aumenta il risultato del 50%",
          "answer": "225",
          "hint": "Prima 3/4 di 200, poi aggiungi il 50% di quel risultato.",
          "skill": "frazioni.variazione_percentuale_successiva",
          "cognitiveType": "integrate",
          "generatorKey": "frazioni",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Prima 3/4 di 200, poi aggiungi il 50% di quel risultato."
          ]
        },
        {
          "q": "Un pacchetto vacanza in agenzia costa 450€. Con lo sconto \"prenota prima\" del 30% quanto si paga?",
          "answer": "315",
          "unit": "€",
          "hint": "Sottrai il 30% di 450 dal prezzo pieno.",
          "skill": "frazioni.problema_percentuale_sconto",
          "cognitiveType": "apply",
          "generatorKey": "frazioni",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Sottrai il 30% di 450 dal prezzo pieno."
          ]
        },
        {
          "q": "Un pacchetto vacanza in agenzia costa 300€. Con lo sconto \"prenota prima\" del 15% quanto si paga?",
          "answer": "255",
          "unit": "€",
          "hint": "Sottrai il 15% di 300 dal prezzo pieno.",
          "skill": "frazioni.problema_percentuale_sconto",
          "cognitiveType": "apply",
          "generatorKey": "frazioni",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Sottrai il 15% di 300 dal prezzo pieno."
          ]
        },
        {
          "q": "Un pacchetto vacanza in agenzia costa 450€. Con lo sconto \"prenota prima\" del 15% quanto si paga?",
          "answer": "382.5",
          "unit": "€",
          "hint": "Sottrai il 15% di 450 dal prezzo pieno.",
          "skill": "frazioni.problema_percentuale_sconto",
          "cognitiveType": "apply",
          "generatorKey": "frazioni",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Sottrai il 15% di 450 dal prezzo pieno."
          ]
        },
        {
          "q": "Un viaggio costa 300€. Il prezzo aumenta del 15%, poi sul nuovo prezzo viene applicato uno sconto del 30%. Prezzo finale?",
          "answer": "241.5",
          "unit": "€",
          "hint": "Aumenta prima 300 del 15%, poi applica lo sconto del 30% sul NUOVO prezzo (non su 300).",
          "skill": "frazioni.variazione_percentuale_successiva",
          "cognitiveType": "integrate",
          "generatorKey": "frazioni",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Aumenta prima 300 del 15%, poi applica lo sconto del 30% sul NUOVO prezzo (non su 300)."
          ]
        },
        {
          "q": "Il pacchetto vacanze a Rimini da 480€ ha lo sconto Early Booking del 15%. Pagando tutto in un'unica soluzione, si ha anche un ulteriore 5% di sconto sul prezzo già scontato. Quanto si paga in totale?",
          "answer": "387.6",
          "unit": "€",
          "hint": "Applica prima il 15% su 480€, poi il 5% sul NUOVO prezzo ottenuto (non sui 480€ di partenza).",
          "logic": true,
          "skill": "frazioni.variazione_percentuale_successiva",
          "cognitiveType": "reason",
          "generatorKey": "frazioni",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Applica prima il 15% su 480€, poi il 5% sul NUOVO prezzo ottenuto (non sui 480€ di partenza)."
          ]
        },
        {
          "q": "Su un pullman turistico, 3/4 dei posti sono occupati da turisti italiani e i rimanenti da turisti stranieri. Se i turisti stranieri sono 15, quanti sono i posti totali sul pullman?",
          "answer": "60",
          "hint": "I turisti stranieri sono 1/4 del totale: se 1/4 corrisponde a 15, quanto vale il totale?",
          "skill": "frazioni.frazione_inversa",
          "cognitiveType": "reason",
          "generatorKey": "frazioni",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "I turisti stranieri sono 1/4 del totale: se 1/4 corrisponde a 15, quanto vale il totale?"
          ]
        },
        {
          "skill": "frazioni.percentuale_inversa",
          "cognitiveType": "reason",
          "q": "In un negozio di souvenir, il costo di produzione di uno zaino è 24€ e rappresenta il 60% del prezzo di vendita. Quanto costa lo zaino in negozio (prezzo di vendita)?",
          "answer": "40",
          "unit": "€",
          "hint": "24€ corrisponde al 60% del prezzo di vendita. Calcola prima quanto vale l'1% del prezzo (24 : 60), poi moltiplica per 100 per trovare il 100% (il prezzo intero).",
          "generatorKey": "frazioni",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "24€ corrisponde al 60% del prezzo di vendita. Calcola prima quanto vale l'1% del prezzo (24 : 60), poi moltiplica per 100 per trovare il 100% (il prezzo intero)."
          ]
        },
        {
          "skill": "frazioni.percentuale_inversa",
          "cognitiveType": "reason",
          "q": "Il prezzo di un biglietto aereo è aumentato del 20% rispetto allo scorso anno, arrivando a 156€ oggi. Questi 156€ rappresentano il 120% del prezzo dello scorso anno (100% del prezzo più il 20% di aumento). Quanto costava il biglietto l'anno scorso?",
          "answer": "130",
          "unit": "€",
          "hint": "156€ corrisponde al 120% del prezzo dello scorso anno (100% + 20% di aumento). Calcola quanto vale l'1% (156 : 120), poi moltiplica per 100 per trovare il prezzo originale (100%).",
          "generatorKey": "frazioni",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "156€ corrisponde al 120% del prezzo dello scorso anno (100% + 20% di aumento). Calcola quanto vale l'1% (156 : 120), poi moltiplica per 100 per trovare il prezzo originale (100%)."
          ]
        }
      ]
    },
    "quiz": [
      {
        "q": "Semplificando 6/9 si ottiene:",
        "options": [
          "1/3",
          "2/3",
          "3/2",
          "6/9"
        ],
        "correct": 1
      },
      {
        "q": "1/3 + 1/6 = ?",
        "options": [
          "1/2",
          "2/9",
          "1/9",
          "2/6"
        ],
        "correct": 0
      },
      {
        "q": "Il 10% di 250 è:",
        "options": [
          "2,5",
          "25",
          "250",
          "2500"
        ],
        "correct": 1
      },
      {
        "q": "3/4 di 200 è:",
        "options": [
          "50",
          "100",
          "150",
          "300"
        ],
        "correct": 2
      },
      {
        "q": "Un prezzo di 60€ scontato del 30% diventa:",
        "options": [
          "18€",
          "30€",
          "42€",
          "48€"
        ],
        "correct": 2
      },
      {
        "q": "2/5 : 1/10 = ?",
        "options": [
          "1/25",
          "1/4",
          "4",
          "25"
        ],
        "correct": 2
      },
      {
        "q": "3/8 + 1/8 = ?",
        "options": [
          "1/2",
          "4/16",
          "3/8",
          "1/4"
        ],
        "correct": 0
      },
      {
        "q": "Il 50% di 84 è:",
        "options": [
          "21",
          "42",
          "84",
          "168"
        ],
        "correct": 1
      },
      {
        "q": "5/6 − 1/6 = ?",
        "options": [
          "2/3",
          "1/2",
          "1/3",
          "5/12"
        ],
        "correct": 0
      },
      {
        "q": "3/4 : 1/2 = ?",
        "options": [
          "3/2",
          "3/8",
          "2/3",
          "1/8"
        ],
        "correct": 0
      }
    ]
  },
  {
    "id": "potenze",
    "icon": "⚡",
    "accent": "gold",
    "title": "Potenze e Radici",
    "tagline": "Moltiplicazioni ripetute e il percorso inverso",
    "theory": [
      {
        "title": "Cos'è una potenza",
        "body": "Una potenza a^n indica che la base a va moltiplicata per sé stessa n volte (n è l'esponente).\n\nEsempio: 2^3 = 2 · 2 · 2 = 8"
      },
      {
        "title": "Le proprietà delle potenze",
        "body": "Stessa base: a^n · a^m = a^(n+m)     a^n : a^m = a^(n−m)\n\nPotenza di potenza: (a^n)^m = a^(n·m)\n\nCaso semplice: a^1 = a (la base moltiplicata per sé stessa una sola volta è semplicemente la base)."
      },
      {
        "title": "Perché a⁰ = 1?",
        "type": "microlesson",
        "concept": "esponente_zero",
        "situation": "Nella scheda precedente hai visto che a^n : a^m = a^(n−m). Cosa succede se n ed m sono uguali?",
        "explain": "a⁰ non è un caso a parte da imparare a memoria: si ricava dalla proprietà della divisione. Se scegliamo lo stesso esponente sia sopra sia sotto, a^n : a^n = a^(n−n) = a⁰. Ma a^n : a^n è anche un numero diviso per se stesso, e un numero (diverso da zero) diviso per se stesso fa sempre 1. Quindi a⁰ deve valere proprio 1.",
        "example": "5⁰ = 5^3 : 5^3 = 1 (perché qualunque numero diverso da zero diviso per se stesso fa 1), non perché è una regola arbitraria da ricordare.",
        "check": {
          "q": "Perché 4⁰ = 1?",
          "options": [
            "Perché lo dice una regola da ricordare a memoria",
            "Perché 4⁰ = 4² : 4², e un numero diverso da zero diviso per se stesso fa 1",
            "Perché ogni numero elevato a 0 diventa 0",
            "Perché vale solo per basi pari"
          ],
          "correct": 1
        }
      },
      {
        "title": "Proprietà del prodotto",
        "body": "La radice (o la potenza) di un prodotto è il prodotto delle radici (o potenze):\n\n√(a · b) = √a · √b\n\nEsempio: √(9 · 16) = √9 · √16 = 3 · 4 = 12"
      },
      {
        "title": "Le radici quadrate",
        "body": "La radice quadrata √x è l'operazione inversa dell'elevamento al quadrato: risponde alla domanda \"quale numero, moltiplicato per sé stesso, dà x?\". Attenzione: sia 4×4=16 sia (−4)×(−4)=16, ma per convenzione il simbolo √ indica sempre e solo il risultato non negativo: √16 = 4, non −4.\n\nConviene memorizzare: √1=1, √4=2, √9=3, √16=4, √25=5, √36=6, √49=7, √64=8, √81=9, √100=10, √144=12."
      },
      {
        "title": "Esempio svolto",
        "type": "steps",
        "steps": [
          "Il problema: (2^3)^2 : 2^4",
          "Potenza di potenza: moltiplichiamo gli esponenti → (2^3)^2 = 2^6",
          "Ora abbiamo: 2^6 : 2^4",
          "Stessa base nella divisione: sottraiamo gli esponenti → 2^(6−4) = 2^2 = 4\n\nRisultato: 4"
        ]
      },
      {
        "title": "Un altro esempio",
        "type": "steps",
        "steps": [
          "Il problema: calcola √(9 × 16)",
          "Usiamo la proprietà √(a×b) = √a × √b: √9 × √16",
          "Calcoliamo le due radici: √9 = 3   e   √16 = 4",
          "Moltiplichiamo: 3 × 4 = 12\n\nRisultato: 12"
        ]
      }
    ],
    "exercises": {
      "facile": [
        {
          "q": "Radice quadrata di 9 = ?",
          "answer": "3",
          "hint": "Quale numero moltiplicato per sé stesso dà questo risultato?",
          "skill": "potenze.radice_quadrata_memorizzata",
          "cognitiveType": "recognize",
          "generatorKey": "potenze",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Quale numero moltiplicato per sé stesso dà questo risultato?"
          ]
        },
        {
          "q": "Radice quadrata di 100 = ?",
          "answer": "10",
          "hint": "Quale numero moltiplicato per sé stesso dà questo risultato?",
          "skill": "potenze.radice_quadrata_memorizzata",
          "cognitiveType": "recognize",
          "generatorKey": "potenze",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Quale numero moltiplicato per sé stesso dà questo risultato?"
          ]
        },
        {
          "q": "4^3 = ?",
          "answer": "64",
          "hint": "4 moltiplicato per sé stesso 3 volte.",
          "skill": "potenze.potenza_diretta",
          "cognitiveType": "recognize",
          "generatorKey": "potenze",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "4 moltiplicato per sé stesso 3 volte."
          ]
        },
        {
          "q": "Radice quadrata di 16 = ?",
          "answer": "4",
          "hint": "Quale numero moltiplicato per sé stesso dà questo risultato?",
          "skill": "potenze.radice_quadrata_memorizzata",
          "cognitiveType": "recognize",
          "generatorKey": "potenze",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Quale numero moltiplicato per sé stesso dà questo risultato?"
          ]
        },
        {
          "q": "4^2 = ?",
          "answer": "16",
          "hint": "4 moltiplicato per sé stesso 2 volte.",
          "skill": "potenze.potenza_diretta",
          "cognitiveType": "recognize",
          "generatorKey": "potenze",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "4 moltiplicato per sé stesso 2 volte."
          ]
        },
        {
          "q": "9^3 = ?",
          "answer": "729",
          "hint": "9 moltiplicato per sé stesso 3 volte.",
          "skill": "potenze.potenza_diretta",
          "cognitiveType": "recognize",
          "generatorKey": "potenze",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "9 moltiplicato per sé stesso 3 volte."
          ]
        },
        {
          "q": "8^2 = ?",
          "answer": "64",
          "hint": "8 moltiplicato per sé stesso 2 volte.",
          "skill": "potenze.potenza_diretta",
          "cognitiveType": "recognize",
          "generatorKey": "potenze",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "8 moltiplicato per sé stesso 2 volte."
          ]
        },
        {
          "q": "Radice quadrata di 36 = ?",
          "answer": "6",
          "hint": "Quale numero moltiplicato per sé stesso dà questo risultato?",
          "skill": "potenze.radice_quadrata_memorizzata",
          "cognitiveType": "recognize",
          "generatorKey": "potenze",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Quale numero moltiplicato per sé stesso dà questo risultato?"
          ]
        },
        {
          "q": "Qual è il numero successivo nella sequenza: 1, 2, 4, 8, 16, ... ?",
          "answer": "32",
          "hint": "Ogni numero è il doppio del precedente: sono le potenze di 2.",
          "logic": true,
          "skill": "potenze.crescita_esponenziale",
          "cognitiveType": "apply",
          "generatorKey": "potenze",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Ogni numero è il doppio del precedente: sono le potenze di 2."
          ]
        },
        {
          "q": "Un video ha 5 visualizzazioni il primo giorno e ogni giorno raddoppia. Quante visualizzazioni avrà il quarto giorno?",
          "answer": "40",
          "hint": "Giorno1=5, giorno2=5×2, giorno3=doppio di giorno2... prosegui raddoppiando.",
          "skill": "potenze.crescita_esponenziale",
          "cognitiveType": "apply",
          "generatorKey": "potenze",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Giorno1=5, giorno2=5×2, giorno3=doppio di giorno2... prosegui raddoppiando."
          ]
        },
        {
          "q": "Quale numero elevato al quadrato dà 25?",
          "answer": "5",
          "hint": "È la radice quadrata di 25.",
          "skill": "potenze.radice_quadrata_memorizzata",
          "cognitiveType": "recognize",
          "generatorKey": "potenze",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "È la radice quadrata di 25."
          ]
        },
        {
          "q": "9^2 = ?",
          "answer": "81",
          "hint": "9 moltiplicato per sé stesso 2 volte.",
          "skill": "potenze.potenza_diretta",
          "cognitiveType": "recognize",
          "generatorKey": "potenze",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "9 moltiplicato per sé stesso 2 volte."
          ]
        }
      ],
      "medio": [
        {
          "q": "Tocca ogni espressione, poi tocca il gruppo giusto, in base a quale proprietà delle potenze useresti per calcolarla:",
          "format": "group",
          "skill": "potenze.riconosci_proprieta",
          "cognitiveType": "apply",
          "hint": "Guarda la struttura dell'espressione: c'è un'operazione (× oppure :) tra due potenze con la stessa base, oppure un'unica potenza già elevata a un altro esponente, oppure l'esponente è proprio 0?",
          "hintSteps": [
            "Se vedi due potenze con la STESSA base collegate da × o da :, stai usando la regola del prodotto o del quoziente.",
            "Se vedi una potenza già elevata a un altro esponente, tipo (a^n)^m, è potenza di potenza; se invece l'esponente è 0, il risultato vale sempre 1 (qualunque sia la base, purché diversa da zero)."
          ],
          "groupData": {
            "buckets": [
              {
                "key": "prodotto",
                "label": "Prodotto di potenze, stessa base → sommi gli esponenti"
              },
              {
                "key": "quoziente",
                "label": "Quoziente di potenze, stessa base → sottrai gli esponenti"
              },
              {
                "key": "potenza_di_potenza",
                "label": "Potenza di potenza → moltiplichi gli esponenti"
              },
              {
                "key": "esponente_zero",
                "label": "Esponente zero → il risultato è sempre 1"
              }
            ],
            "terms": [
              {
                "id": "t1",
                "label": "2^3 × 2^5",
                "group": "prodotto"
              },
              {
                "id": "t2",
                "label": "5^8 : 5^2",
                "group": "quoziente"
              },
              {
                "id": "t3",
                "label": "(3^2)^4",
                "group": "potenza_di_potenza"
              },
              {
                "id": "t4",
                "label": "9^0",
                "group": "esponente_zero"
              },
              {
                "id": "t5",
                "label": "7^2 × 7^1",
                "group": "prodotto"
              },
              {
                "id": "t6",
                "label": "6^5 : 6^3",
                "group": "quoziente"
              },
              {
                "id": "t7",
                "label": "(4^1)^3",
                "group": "potenza_di_potenza"
              },
              {
                "id": "t8",
                "label": "12^0",
                "group": "esponente_zero"
              }
            ]
          }
        },
        {
          "q": "6^3 × 6^1 = ?",
          "answer": "1296",
          "hint": "Stessa base: somma gli esponenti.",
          "skill": "potenze.prodotto_quoziente_stessa_base",
          "cognitiveType": "apply",
          "generatorKey": "potenze",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Stessa base: somma gli esponenti."
          ]
        },
        {
          "q": "Radice quadrata di 196 = ?",
          "answer": "14",
          "hint": "Quale numero moltiplicato per sé stesso dà questo risultato?",
          "skill": "potenze.radice_quadrata_memorizzata",
          "cognitiveType": "recognize",
          "generatorKey": "potenze",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Quale numero moltiplicato per sé stesso dà questo risultato?"
          ]
        },
        {
          "q": "Radice quadrata di (25 × 36) = ?",
          "answer": "30",
          "hint": "Usa √(a·b) = √a · √b: calcola le due radici separatamente, poi moltiplicale.",
          "skill": "potenze.radice_prodotto",
          "cognitiveType": "apply",
          "generatorKey": "potenze",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Usa √(a·b) = √a · √b: calcola le due radici separatamente, poi moltiplicale."
          ]
        },
        {
          "q": "Radice quadrata di 64 = ?",
          "answer": "8",
          "hint": "Quale numero moltiplicato per sé stesso dà questo risultato?",
          "skill": "potenze.radice_quadrata_memorizzata",
          "cognitiveType": "recognize",
          "generatorKey": "potenze",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Quale numero moltiplicato per sé stesso dà questo risultato?"
          ]
        },
        {
          "q": "5^2 × 5^1 = ?",
          "answer": "125",
          "hint": "Stessa base: somma gli esponenti.",
          "skill": "potenze.prodotto_quoziente_stessa_base",
          "cognitiveType": "apply",
          "generatorKey": "potenze",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Stessa base: somma gli esponenti."
          ]
        },
        {
          "q": "(5^1)^2 = ?",
          "answer": "25",
          "hint": "Potenza di potenza: moltiplica gli esponenti.",
          "skill": "potenze.potenza_di_potenza",
          "cognitiveType": "apply",
          "generatorKey": "potenze",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Potenza di potenza: moltiplica gli esponenti."
          ]
        },
        {
          "q": "(5^2)^2 = ?",
          "answer": "625",
          "hint": "Potenza di potenza: moltiplica gli esponenti.",
          "skill": "potenze.potenza_di_potenza",
          "cognitiveType": "apply",
          "generatorKey": "potenze",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Potenza di potenza: moltiplica gli esponenti."
          ]
        },
        {
          "q": "Radice quadrata di 169 = ?",
          "answer": "13",
          "hint": "Quale numero moltiplicato per sé stesso dà questo risultato?",
          "skill": "potenze.radice_quadrata_memorizzata",
          "cognitiveType": "recognize",
          "generatorKey": "potenze",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Quale numero moltiplicato per sé stesso dà questo risultato?"
          ]
        },
        {
          "q": "Le torri di Archie: il 1° giorno costruisce una torre con 1 cubo. Ogni giorno aggiunge sopra un livello quadrato il cui lato è il triplo del precedente (2° giorno: livello 3×3=9, totale 10; 3° giorno: livello 9×9=81, totale 91). Quanti cubi in totale il 4° giorno, se il nuovo livello è 27×27?",
          "answer": "820",
          "hint": "Il nuovo livello ha 27×27 cubi: sommalo al totale che aveva alla fine del 3° giorno (91).",
          "logic": true,
          "skill": "potenze.crescita_esponenziale",
          "cognitiveType": "reason",
          "generatorKey": "potenze",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Il nuovo livello ha 27×27 cubi: sommalo al totale che aveva alla fine del 3° giorno (91)."
          ]
        },
        {
          "q": "Quanti chicchi di riso ci sono sulla decima casella di una scacchiera, se sulla prima c'è 1 chicco e ogni casella raddoppia la precedente?",
          "answer": "512",
          "hint": "Sulla casella n ci sono 2 elevato alla (n−1) chicchi.",
          "logic": true,
          "skill": "potenze.crescita_esponenziale",
          "cognitiveType": "apply",
          "generatorKey": "potenze",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Sulla casella n ci sono 2 elevato alla (n−1) chicchi."
          ]
        },
        {
          "q": "Quale numero elevato al cubo dà 27?",
          "answer": "3",
          "hint": "Quale numero moltiplicato 3 volte per sé stesso dà 27?",
          "skill": "potenze.potenza_diretta",
          "cognitiveType": "recognize",
          "generatorKey": "potenze",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Quale numero moltiplicato 3 volte per sé stesso dà 27?"
          ]
        },
        {
          "q": "Un gruppo turistico raddoppia il numero di iscritti ogni anno: nel 2024 erano 15. Quanti saranno nel 2027 se il trend continua?",
          "answer": "120",
          "hint": "Raddoppia il numero di iscritti 3 volte (per il 2025, 2026 e 2027).",
          "skill": "potenze.crescita_esponenziale",
          "cognitiveType": "apply",
          "generatorKey": "potenze",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Raddoppia il numero di iscritti 3 volte (per il 2025, 2026 e 2027)."
          ]
        }
      ],
      "difficile": [
        {
          "q": "Trova il passaggio sbagliato nella risoluzione di 3^2 × 3^4",
          "format": "error-detect",
          "skill": "potenze.prodotto_quoziente_stessa_base",
          "cognitiveType": "diagnose",
          "hint": "Quando moltiplichi due potenze con la stessa base, gli esponenti si sommano o si moltiplicano?",
          "hintSteps": [
            "Ripassa la proprietà del prodotto fra potenze con la stessa base mostrata in teoria: a^n · a^m = a^(n+m).",
            "Confronta con la potenza di potenza, (a^n)^m = a^(n·m): qui c'è un'unica potenza elevata a un altro esponente, oppure un prodotto tra due potenze distinte?"
          ],
          "errorData": {
            "steps": [
              {
                "text": "Il problema: 3^2 × 3^4"
              },
              {
                "text": "Stessa base: moltiplichiamo gli esponenti → 3^(2×4) = 3^8"
              },
              {
                "text": "Quindi il risultato è 3^8"
              },
              {
                "text": "3^8 vale 6.561"
              }
            ],
            "errorIndex": 1,
            "explanation": "Nel prodotto di potenze con la stessa base gli esponenti si SOMMANO, non si moltiplicano: a^n · a^m = a^(n+m). Moltiplicare gli esponenti è la regola della POTENZA DI POTENZA, (a^n)^m = a^(n·m), qui applicata per errore a un prodotto di due potenze distinte. Il risultato corretto è 3^2 × 3^4 = 3^(2+4) = 3^6 = 729."
          }
        },
        {
          "q": "Metti in ordine i passaggi per risolvere: Radice quadrata di (9 × 16) + 3^2",
          "format": "order",
          "skill": "potenze.espressioni_miste",
          "cognitiveType": "integrate",
          "hint": "Prima semplifica dentro la radice usando la proprietà del prodotto, poi calcola la potenza per conto suo: solo alla fine puoi sommare i due risultati.",
          "hintSteps": [
            "Ricorda: prima di poter sommare due termini diversi (una radice e una potenza) devi averli già calcolati entrambi come numeri singoli.",
            "Usa √(a·b) = √a · √b per semplificare la radice per prima, calcola 3^2 separatamente, e solo alla fine somma i due numeri ottenuti."
          ],
          "orderData": {
            "steps": [
              {
                "id": "s1",
                "text": "Applica la proprietà del prodotto sotto radice: √(9 × 16) = √9 × √16"
              },
              {
                "id": "s2",
                "text": "Calcola le due radici e moltiplicale tra loro: √9 = 3, √16 = 4, quindi 3 × 4 = 12"
              },
              {
                "id": "s3",
                "text": "Calcola la potenza separatamente: 3^2 = 9"
              },
              {
                "id": "s4",
                "text": "Somma i due risultati ottenuti: 12 + 9 = 21"
              }
            ],
            "correctOrder": [
              "s1",
              "s2",
              "s3",
              "s4"
            ]
          }
        },
        {
          "q": "4^1 × 4^2 + 3^1 = ?",
          "answer": "67",
          "hint": "Calcola separatamente il prodotto di potenze (stessa base → somma esponenti) e la potenza finale, poi somma.",
          "skill": "potenze.espressioni_miste",
          "cognitiveType": "integrate",
          "generatorKey": "potenze",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Calcola separatamente il prodotto di potenze (stessa base → somma esponenti) e la potenza finale, poi somma."
          ]
        },
        {
          "q": "3^3 × 3^1 + 2^1 = ?",
          "answer": "83",
          "hint": "Calcola separatamente il prodotto di potenze (stessa base → somma esponenti) e la potenza finale, poi somma.",
          "skill": "potenze.espressioni_miste",
          "cognitiveType": "integrate",
          "generatorKey": "potenze",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Calcola separatamente il prodotto di potenze (stessa base → somma esponenti) e la potenza finale, poi somma."
          ]
        },
        {
          "q": "Radice quadrata di (16 × 16) = ?",
          "answer": "16",
          "hint": "Usa √(a·b) = √a · √b: calcola le due radici separatamente.",
          "skill": "potenze.radice_prodotto",
          "cognitiveType": "integrate",
          "generatorKey": "potenze",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Usa √(a·b) = √a · √b: calcola le due radici separatamente."
          ]
        },
        {
          "q": "Radice quadrata di (100 × 100) = ?",
          "answer": "100",
          "hint": "Usa √(a·b) = √a · √b: calcola le due radici separatamente.",
          "skill": "potenze.radice_prodotto",
          "cognitiveType": "integrate",
          "generatorKey": "potenze",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Usa √(a·b) = √a · √b: calcola le due radici separatamente."
          ]
        },
        {
          "q": "5^1 × 5^2 + 4^2 = ?",
          "answer": "141",
          "hint": "Calcola separatamente il prodotto di potenze (stessa base → somma esponenti) e la potenza finale, poi somma.",
          "skill": "potenze.espressioni_miste",
          "cognitiveType": "integrate",
          "generatorKey": "potenze",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Calcola separatamente il prodotto di potenze (stessa base → somma esponenti) e la potenza finale, poi somma."
          ]
        },
        {
          "q": "5^1 × 5^2 + 3^2 = ?",
          "answer": "134",
          "hint": "Calcola separatamente il prodotto di potenze (stessa base → somma esponenti) e la potenza finale, poi somma.",
          "skill": "potenze.espressioni_miste",
          "cognitiveType": "integrate",
          "generatorKey": "potenze",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Calcola separatamente il prodotto di potenze (stessa base → somma esponenti) e la potenza finale, poi somma."
          ]
        },
        {
          "q": "3^2 × 3^2 + 4^1 = ?",
          "answer": "85",
          "hint": "Calcola separatamente il prodotto di potenze (stessa base → somma esponenti) e la potenza finale, poi somma.",
          "skill": "potenze.espressioni_miste",
          "cognitiveType": "integrate",
          "generatorKey": "potenze",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Calcola separatamente il prodotto di potenze (stessa base → somma esponenti) e la potenza finale, poi somma."
          ]
        },
        {
          "q": "(2^2)^2 : 2^1 = ?",
          "answer": "8",
          "hint": "Prima la potenza di potenza, poi sottrai gli esponenti nella divisione.",
          "skill": "potenze.potenza_di_potenza",
          "cognitiveType": "integrate",
          "generatorKey": "potenze",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Prima la potenza di potenza, poi sottrai gli esponenti nella divisione."
          ]
        },
        {
          "q": "Un video di viaggi ha 200 visualizzazioni il primo giorno e ogni giorno raddoppia rispetto al precedente. In quale giorno (1°, 2°, 3°...) supera per la prima volta 1.000.000 di visualizzazioni?",
          "answer": "14",
          "hint": "Le visualizzazioni al giorno n sono 200 × 2^(n−1): prova a calcolare per n vicino a 12-14.",
          "logic": true,
          "skill": "potenze.crescita_esponenziale",
          "cognitiveType": "reason",
          "generatorKey": "potenze",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Le visualizzazioni al giorno n sono 200 × 2^(n−1): prova a calcolare per n vicino a 12-14."
          ]
        },
        {
          "q": "Quanti chicchi di riso in totale ci sono sulle prime 10 caselle di una scacchiera (1, 2, 4, 8, ... raddoppiando ogni volta)?",
          "answer": "1023",
          "hint": "La somma 1+2+4+...+2^9 è sempre uguale alla potenza successiva meno 1: 2^10 − 1.",
          "skill": "potenze.crescita_esponenziale",
          "cognitiveType": "reason",
          "generatorKey": "potenze",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "La somma 1+2+4+...+2^9 è sempre uguale alla potenza successiva meno 1: 2^10 − 1."
          ]
        },
        {
          "q": "Se 3^x = 81, quanto vale x?",
          "answer": "4",
          "hint": "Scrivi 81 come potenza di 3.",
          "skill": "potenze.potenza_diretta",
          "cognitiveType": "reason",
          "generatorKey": "potenze",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Scrivi 81 come potenza di 3."
          ]
        },
        {
          "q": "Il lato di un quadrato viene raddoppiato. Di quante volte aumenta la sua area?",
          "answer": "4",
          "hint": "Se il lato diventa 2l, l'area diventa (2l)² = 4 × l².",
          "skill": "potenze.potenza_diretta",
          "cognitiveType": "reason",
          "generatorKey": "potenze",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Se il lato diventa 2l, l'area diventa (2l)² = 4 × l²."
          ]
        }
      ]
    },
    "quiz": [
      {
        "q": "4^2 = ?",
        "options": [
          "6",
          "8",
          "16",
          "32"
        ],
        "correct": 2
      },
      {
        "q": "2^5 = ?",
        "options": [
          "10",
          "16",
          "25",
          "32"
        ],
        "correct": 3
      },
      {
        "q": "Radice quadrata di 81 = ?",
        "options": [
          "8",
          "9",
          "40,5",
          "81"
        ],
        "correct": 1
      },
      {
        "q": "3^2 · 3^3 = ?",
        "options": [
          "81",
          "243",
          "729",
          "15"
        ],
        "correct": 1
      },
      {
        "q": "(2^3)^2 = ?",
        "options": [
          "12",
          "16",
          "36",
          "64"
        ],
        "correct": 3
      },
      {
        "q": "Radice quadrata di 100 = ?",
        "options": [
          "10",
          "50",
          "100",
          "1000"
        ],
        "correct": 0
      },
      {
        "q": "6^2 = ?",
        "options": [
          "12",
          "36",
          "62",
          "26"
        ],
        "correct": 1
      },
      {
        "q": "3^4 = ?",
        "options": [
          "12",
          "64",
          "81",
          "34"
        ],
        "correct": 2
      },
      {
        "q": "Radice quadrata di 64 = ?",
        "options": [
          "6",
          "7",
          "8",
          "32"
        ],
        "correct": 2
      },
      {
        "q": "5^0 = ?",
        "options": [
          "0",
          "1",
          "5",
          "50"
        ],
        "correct": 1
      },
      {
        "q": "Perché possiamo dire che 6^0 = 1?",
        "options": [
          "Perché 6^0 si può scrivere come 6^3 : 6^3 (cioè a^n : a^n = a^0), e un numero diverso da zero diviso per se stesso vale sempre 1",
          "Perché ogni numero elevato a 0 diventa automaticamente 0",
          "Perché l'esponente 0 cancella la base, lasciando il numero 1 per convenzione arbitraria da ricordare a memoria",
          "Perché vale solo per basi pari, come 6"
        ],
        "correct": 0
      }
    ]
  },
  {
    "id": "algebra",
    "icon": "🧩",
    "accent": "teal",
    "title": "Espressioni Algebriche",
    "tagline": "Quando le lettere prendono il posto dei numeri",
    "theory": [
      {
        "title": "Cos'è un'espressione algebrica",
        "body": "Un'espressione algebrica usa lettere al posto di numeri. Quella lettera può avere due ruoli diversi, a seconda del contesto.\n\nVariabile: rappresenta un numero generico, libero di cambiare — è il caso di questo capitolo. In 2x+3, x è una variabile: possiamo sostituire x con numeri diversi e il risultato cambia di volta in volta (lo farai negli esercizi di questa tappa).\n\nIncognita: rappresenta un valore preciso ma ancora sconosciuto, che va scoperto risolvendo un'equazione — è il caso della prossima tappa del viaggio. È la stessa idea di fondo ('una lettera al posto di un numero'): cambia solo se quel valore resta libero di variare (variabile) o va cercato (incognita).\n\nEsempio: 2x + 3 è un'espressione dove x rappresenta un numero qualsiasi: è una variabile."
      },
      {
        "title": "Cos’è un termine?",
        "type": "microlesson",
        "concept": "termine",
        "situation": "Guarda l’espressione 4a + 9 − 2a: sembra complicata, ma è fatta di pezzi più piccoli, uniti dai simboli + e −.",
        "explain": "Un termine è ciascuno dei \"pezzi\" di un’espressione, separati da + o −. In 4a + 9 − 2a ci sono tre termini: 4a, +9, −2a. Ogni termine ha il proprio segno, anche quando non è scritto esplicitamente davanti (il primo termine, se non ha segno, è considerato positivo).",
        "example": "In 7x − 4 + 3x, i termini sono: 7x, −4, +3x — tre termini in totale.",
        "check": {
          "q": "Quanti termini ci sono in 6y + 2 − y?",
          "options": [
            "1",
            "2",
            "3",
            "4"
          ],
          "correct": 2
        }
      },
      {
        "title": "Cos’è il coefficiente?",
        "type": "microlesson",
        "concept": "coefficiente",
        "situation": "Nel termine 5x, il numero 5 e la lettera x fanno parte dello stesso \"pezzo\", ma hanno ruoli diversi.",
        "explain": "Il coefficiente è il numero scritto davanti alla lettera in un termine: dice per quante volte va contata quella lettera. Se scrivo solo x, il coefficiente è 1 (sottinteso); se scrivo −x, il coefficiente è −1.",
        "example": "Nel termine −3a, il coefficiente è −3. Nel termine b (senza numero davanti), il coefficiente è 1.",
        "check": {
          "q": "Qual è il coefficiente di y nel termine −y?",
          "options": [
            "0",
            "1",
            "−1",
            "Non esiste"
          ],
          "correct": 2
        }
      },
      {
        "title": "Termini simili",
        "body": "Due termini sono simili se hanno la stessa parte letterale (stessa lettera, stesso esponente): come hai visto nelle schede precedenti, un termine ha un coefficiente (il numero davanti) e una parte letterale (la lettera).\n\nDue termini simili si possono sommare o sottrarre sommando/sottraendo i loro coefficienti, perché rappresentano la stessa \"unità\" letterale.\n\nEsempio: 3x + 5x = 8x (i coefficienti 3 e 5 si sommano perché il termine è lo stesso, x)       7a − 2a = 5a"
      },
      {
        "title": "Polinomi e proprietà distributiva",
        "body": "Un polinomio è semplicemente un'espressione algebrica formata da più termini uniti da + o −: ad esempio 3x + 5y − 2 è un polinomio di tre termini.\n\nQuando un numero moltiplica una parentesi, come in 3(x+2), possiamo pensare 3(x+2) come \"(x+2) ripetuto 3 volte\": (x+2)+(x+2)+(x+2). Raggruppando i termini simili si ottiene (x+x+x)+(2+2+2) = 3x+6 — il 3 finisce per moltiplicare separatamente sia la x sia il 2. Questa regola si chiama proprietà distributiva: a·(b+c) = a·b + a·c.\n\nPer sommare o sottrarre due polinomi si raggruppano i termini simili tra loro. Il segno meno davanti a una parentesi equivale a moltiplicare per −1: per la proprietà distributiva, cambia il segno a tutti i termini dentro.\n\nEsempio: (5x−2) − (3x+4) = 5x−2−3x−4 = 2x−6"
      },
      {
        "title": "Il valore di un'espressione",
        "body": "Per calcolare il valore di un'espressione, si sostituisce un numero al posto della lettera e si esegue il calcolo.\n\nEsempio: 2x+1 per x=3 → 2·3+1 = 7"
      },
      {
        "title": "Esempio svolto",
        "type": "steps",
        "steps": [
          "Il problema: semplifica 3(x+2) − (x−5)",
          "Distribuiamo il 3: 3(x+2) = 3x+6",
          "Distribuiamo il segno meno: − (x−5) = −x+5\n\n(il segno meno cambia il segno a entrambi i termini dentro la parentesi)",
          "Raggruppiamo i termini simili: (3x−x) + (6+5) = 2x+11\n\nRisultato: 2x+11"
        ]
      },
      {
        "title": "Un altro esempio",
        "type": "steps",
        "steps": [
          "Il problema: calcola il valore di 2x² − 3x per x = −2",
          "Calcoliamo x²: (−2)² = 4, quindi 2x² = 2×4 = 8",
          "Calcoliamo 3x: 3×(−2) = −6, quindi −3x = −(−6) = +6",
          "Sommiamo: 8 + 6 = 14\n\nRisultato: 14"
        ]
      }
    ],
    "exercises": {
      "facile": [
        {
          "q": "Semplifica: 3b + 7b = ?",
          "answer": [
            "10b"
          ],
          "type": "expr",
          "hint": "Somma i coefficienti, la lettera resta la stessa.",
          "skill": "algebra.somma_termini_simili",
          "cognitiveType": "recognize",
          "generatorKey": "algebra",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Somma i coefficienti, la lettera resta la stessa."
          ]
        },
        {
          "q": "Semplifica: 8a + 7a = ?",
          "answer": [
            "15a"
          ],
          "type": "expr",
          "hint": "Somma i coefficienti, la lettera resta la stessa.",
          "skill": "algebra.somma_termini_simili",
          "cognitiveType": "recognize",
          "generatorKey": "algebra",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Somma i coefficienti, la lettera resta la stessa."
          ]
        },
        {
          "q": "Semplifica: 9x + 9x = ?",
          "answer": [
            "18x"
          ],
          "type": "expr",
          "hint": "Somma i coefficienti, la lettera resta la stessa.",
          "skill": "algebra.somma_termini_simili",
          "cognitiveType": "recognize",
          "generatorKey": "algebra",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Somma i coefficienti, la lettera resta la stessa."
          ]
        },
        {
          "q": "Semplifica: 9a + 2a = ?",
          "answer": [
            "11a"
          ],
          "type": "expr",
          "hint": "Somma i coefficienti, la lettera resta la stessa.",
          "skill": "algebra.somma_termini_simili",
          "cognitiveType": "recognize",
          "generatorKey": "algebra",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Somma i coefficienti, la lettera resta la stessa."
          ]
        },
        {
          "q": "Calcola il valore di 3b + 5 per b=5",
          "answer": "20",
          "hint": "Sostituisci 5 al posto di b.",
          "skill": "algebra.sostituzione_variabile",
          "cognitiveType": "apply",
          "generatorKey": "algebra",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Sostituisci 5 al posto di b."
          ]
        },
        {
          "q": "Semplifica: 2a + 5a = ?",
          "answer": [
            "7a"
          ],
          "type": "expr",
          "hint": "Somma i coefficienti, la lettera resta la stessa.",
          "skill": "algebra.somma_termini_simili",
          "cognitiveType": "recognize",
          "generatorKey": "algebra",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Somma i coefficienti, la lettera resta la stessa."
          ]
        },
        {
          "q": "Calcola il valore di 2y + 7 per y=0",
          "answer": "7",
          "hint": "Sostituisci 0 al posto di y.",
          "skill": "algebra.sostituzione_variabile",
          "cognitiveType": "apply",
          "generatorKey": "algebra",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Sostituisci 0 al posto di y."
          ]
        },
        {
          "q": "Semplifica: 6y + 2y = ?",
          "answer": [
            "8y"
          ],
          "type": "expr",
          "hint": "Somma i coefficienti, la lettera resta la stessa.",
          "skill": "algebra.somma_termini_simili",
          "cognitiveType": "recognize",
          "generatorKey": "algebra",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Somma i coefficienti, la lettera resta la stessa."
          ]
        },
        {
          "q": "Pensa un numero, aggiungi 10, moltiplica per 2, sottrai 6, dividi per 2, sottrai il numero di partenza. Cosa ottieni sempre, qualunque numero tu abbia scelto?",
          "answer": "7",
          "hint": "Prova con un numero a piacere (es. 5) e segui tutti i passaggi: il risultato non dipende dal numero scelto!",
          "logic": true,
          "skill": "algebra.problema_numero_pensato",
          "cognitiveType": "reason",
          "generatorKey": "algebra",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Prova con un numero a piacere (es. 5) e segui tutti i passaggi: il risultato non dipende dal numero scelto!"
          ]
        },
        {
          "q": "Calcola il valore di 5x per x=4, poi sottrai 3",
          "answer": "17",
          "hint": "Prima 5×4, poi sottrai 3.",
          "skill": "algebra.sostituzione_variabile",
          "cognitiveType": "apply",
          "generatorKey": "algebra",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Prima 5×4, poi sottrai 3."
          ]
        },
        {
          "q": "Semplifica: 2a + 3a + a = ?",
          "type": "expr",
          "answer": [
            "6a"
          ],
          "hint": "Somma tutti e tre i coefficienti (ricorda: \"a\" da sola vale 1a).",
          "skill": "algebra.somma_termini_simili",
          "cognitiveType": "apply",
          "generatorKey": "algebra",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Somma tutti e tre i coefficienti (ricorda: \"a\" da sola vale 1a)."
          ]
        },
        {
          "q": "Semplifica: 2a + 4a = ?",
          "answer": [
            "6a"
          ],
          "type": "expr",
          "hint": "Somma i coefficienti, la lettera resta la stessa.",
          "skill": "algebra.somma_termini_simili",
          "cognitiveType": "recognize",
          "generatorKey": "algebra",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Somma i coefficienti, la lettera resta la stessa."
          ]
        }
      ],
      "medio": [
        {
          "q": "Il doppio di un numero, diminuito di 3",
          "format": "build",
          "skill": "algebra.costruisci_espressione",
          "cognitiveType": "apply",
          "hint": "Traduci un pezzo alla volta: \"il doppio di un numero\" è 2x, \"diminuito di 3\" è −3.",
          "hintSteps": [
            "Chiama il numero sconosciuto x: \"il doppio\" significa moltiplicato per 2, quindi il primo blocco è 2x.",
            "\"Diminuito di 3\" significa sottrarre 3 al risultato: il blocco finale è −3, non +3 (attenzione ai blocchi con il segno sbagliato)."
          ],
          "buildData": {
            "sentence": "Il doppio di un numero, diminuito di 3",
            "blocks": [
              {
                "id": "2x",
                "label": "2x"
              },
              {
                "id": "-3",
                "label": "−3"
              },
              {
                "id": "3x",
                "label": "3x"
              },
              {
                "id": "+3",
                "label": "+3"
              }
            ],
            "correctSequence": [
              "2x",
              "-3"
            ]
          }
        },
        {
          "q": "Raggruppa i termini simili di: 5x² + 3x − 2x² + 7 − 4x − 9",
          "format": "group",
          "skill": "algebra.raggruppa_termini_simili",
          "cognitiveType": "recognize",
          "hint": "Guarda la parte letterale di ogni termine: x², x, oppure nessuna lettera (termine costante).",
          "hintSteps": [
            "Un termine con x² non è simile a un termine con x, anche se la lettera è la stessa: conta anche l'esponente.",
            "Metti insieme solo i termini che hanno la stessa parte letterale (stessa lettera e stesso esponente): i due termini in x² insieme, i due in x insieme, i due numeri costanti da soli."
          ],
          "groupData": {
            "buckets": [
              {
                "key": "x2",
                "label": "Termini in x²"
              },
              {
                "key": "x",
                "label": "Termini in x"
              },
              {
                "key": "const",
                "label": "Termini costanti"
              }
            ],
            "terms": [
              {
                "id": "t1",
                "label": "5x²",
                "group": "x2"
              },
              {
                "id": "t2",
                "label": "+3x",
                "group": "x"
              },
              {
                "id": "t3",
                "label": "−2x²",
                "group": "x2"
              },
              {
                "id": "t4",
                "label": "+7",
                "group": "const"
              },
              {
                "id": "t5",
                "label": "−4x",
                "group": "x"
              },
              {
                "id": "t6",
                "label": "−9",
                "group": "const"
              }
            ]
          }
        },
        {
          "q": "Semplifica: 5x − 7x = ?",
          "answer": [
            "-2x"
          ],
          "type": "expr",
          "hint": "Sottrai i coefficienti mantenendo la lettera.",
          "skill": "algebra.sottrazione_termini_simili",
          "cognitiveType": "recognize",
          "generatorKey": "algebra",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Sottrai i coefficienti mantenendo la lettera."
          ]
        },
        {
          "q": "Calcola il valore di a^2 + 3a per a=4",
          "answer": "28",
          "hint": "Calcola prima a², poi 3·a, infine somma.",
          "skill": "algebra.sostituzione_espressione_potenza",
          "cognitiveType": "apply",
          "generatorKey": "algebra",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Calcola prima a², poi 3·a, infine somma."
          ]
        },
        {
          "q": "Semplifica: 8a − 1a = ?",
          "answer": [
            "7a"
          ],
          "type": "expr",
          "hint": "Sottrai i coefficienti mantenendo la lettera.",
          "skill": "algebra.sottrazione_termini_simili",
          "cognitiveType": "recognize",
          "generatorKey": "algebra",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Sottrai i coefficienti mantenendo la lettera."
          ]
        },
        {
          "q": "Semplifica: 6y − 7y = ?",
          "answer": [
            "-y",
            "-1y"
          ],
          "type": "expr",
          "hint": "Sottrai i coefficienti mantenendo la lettera.",
          "skill": "algebra.sottrazione_termini_simili",
          "cognitiveType": "recognize",
          "generatorKey": "algebra",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Sottrai i coefficienti mantenendo la lettera."
          ]
        },
        {
          "q": "Semplifica: 9a − 1a = ?",
          "answer": [
            "8a"
          ],
          "type": "expr",
          "hint": "Sottrai i coefficienti mantenendo la lettera.",
          "skill": "algebra.sottrazione_termini_simili",
          "cognitiveType": "recognize",
          "generatorKey": "algebra",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Sottrai i coefficienti mantenendo la lettera."
          ]
        },
        {
          "q": "Semplifica: 3x − 4x = ?",
          "answer": [
            "-x",
            "-1x"
          ],
          "type": "expr",
          "hint": "Sottrai i coefficienti mantenendo la lettera.",
          "skill": "algebra.sottrazione_termini_simili",
          "cognitiveType": "recognize",
          "generatorKey": "algebra",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Sottrai i coefficienti mantenendo la lettera."
          ]
        },
        {
          "q": "Semplifica: 6a − 4a = ?",
          "answer": [
            "2a"
          ],
          "type": "expr",
          "hint": "Sottrai i coefficienti mantenendo la lettera.",
          "skill": "algebra.sottrazione_termini_simili",
          "cognitiveType": "recognize",
          "generatorKey": "algebra",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Sottrai i coefficienti mantenendo la lettera."
          ]
        },
        {
          "q": "Calcola il valore di y^2 + 5y per y=4",
          "answer": "36",
          "hint": "Calcola prima y², poi 5·y, infine somma.",
          "skill": "algebra.sostituzione_espressione_potenza",
          "cognitiveType": "apply",
          "generatorKey": "algebra",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Calcola prima y², poi 5·y, infine somma."
          ]
        },
        {
          "q": "Un mattone, su un piatto della bilancia, pesa come 1 kg più mezzo mattone sull'altro piatto. Quanto pesa un mattone intero?",
          "answer": "2",
          "unit": "kg",
          "hint": "Chiama x il peso del mattone: x = 1 + x/2. Isola la x.",
          "logic": true,
          "skill": "algebra.problema_bilancia",
          "cognitiveType": "reason",
          "generatorKey": "algebra",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Chiama x il peso del mattone: x = 1 + x/2. Isola la x."
          ]
        },
        {
          "q": "Pensa un numero, moltiplicalo per 3, aggiungi 12, dividi per 3, sottrai il numero di partenza. Cosa ottieni sempre?",
          "answer": "4",
          "hint": "Scrivi l'espressione con una lettera al posto del numero pensato e semplificala.",
          "logic": true,
          "skill": "algebra.problema_numero_pensato",
          "cognitiveType": "reason",
          "generatorKey": "algebra",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Scrivi l'espressione con una lettera al posto del numero pensato e semplificala."
          ]
        },
        {
          "q": "Semplifica: 4(x − 2) + 3x = ?",
          "type": "expr",
          "answer": [
            "7x-8"
          ],
          "hint": "Distribuisci il 4, poi somma tra loro i termini in x.",
          "skill": "algebra.distributiva_singola",
          "cognitiveType": "integrate",
          "generatorKey": "algebra",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Distribuisci il 4, poi somma tra loro i termini in x."
          ]
        },
        {
          "q": "Calcola il valore di 2(x+3) per x=5",
          "answer": "16",
          "hint": "Prima somma dentro la parentesi, poi moltiplica per 2.",
          "skill": "algebra.sostituzione_con_parentesi",
          "cognitiveType": "apply",
          "generatorKey": "algebra",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Prima somma dentro la parentesi, poi moltiplica per 2."
          ]
        }
      ],
      "difficile": [
        {
          "q": "Metti in ordine i passaggi per semplificare: 4(x+1) − (x−3)",
          "format": "order",
          "skill": "algebra.distributiva_doppia_segno_negativo",
          "cognitiveType": "integrate",
          "hint": "Prima si distribuiscono i prodotti (occhio al segno meno davanti alla seconda parentesi), poi si raggruppano i termini simili.",
          "hintSteps": [
            "Il primo passaggio è il problema di partenza, l'ultimo è il risultato già semplificato: nel mezzo prima si distribuisce, poi si raggruppa.",
            "4(x+1) diventa 4x+4; −(x−3) diventa −x+3 perché il segno meno cambia il segno di entrambi i termini dentro la parentesi; infine si sommano i termini simili: (4x−x)+(4+3) = 3x+7."
          ],
          "orderData": {
            "steps": [
              {
                "id": "s1",
                "text": "4(x+1) − (x−3)"
              },
              {
                "id": "s2",
                "text": "4x + 4 − x + 3"
              },
              {
                "id": "s3",
                "text": "(4x − x) + (4 + 3)"
              },
              {
                "id": "s4",
                "text": "3x + 7"
              }
            ],
            "correctOrder": [
              "s1",
              "s2",
              "s3",
              "s4"
            ]
          }
        },
        {
          "q": "Calcola il valore di 2a^2 − 2a per a=3",
          "answer": "12",
          "hint": "Calcola prima a² con il suo segno, poi i due prodotti, infine somma.",
          "skill": "algebra.sostituzione_espressione_potenza",
          "cognitiveType": "apply",
          "generatorKey": "algebra",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Calcola prima a² con il suo segno, poi i due prodotti, infine somma."
          ]
        },
        {
          "q": "Calcola il valore di 3a^2 + 5a per a=-4",
          "answer": "28",
          "hint": "Calcola prima a² con il suo segno, poi i due prodotti, infine somma.",
          "skill": "algebra.sostituzione_espressione_potenza",
          "cognitiveType": "apply",
          "generatorKey": "algebra",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Calcola prima a² con il suo segno, poi i due prodotti, infine somma."
          ]
        },
        {
          "q": "Calcola il valore di 4x^2 + 6x per x=4",
          "answer": "88",
          "hint": "Calcola prima x² con il suo segno, poi i due prodotti, infine somma.",
          "skill": "algebra.sostituzione_espressione_potenza",
          "cognitiveType": "apply",
          "generatorKey": "algebra",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Calcola prima x² con il suo segno, poi i due prodotti, infine somma."
          ]
        },
        {
          "q": "Calcola il valore di 2x^2 − 3x per x=-3",
          "answer": "27",
          "hint": "Calcola prima x² con il suo segno, poi i due prodotti, infine somma.",
          "skill": "algebra.sostituzione_espressione_potenza",
          "cognitiveType": "apply",
          "generatorKey": "algebra",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Calcola prima x² con il suo segno, poi i due prodotti, infine somma."
          ]
        },
        {
          "q": "Calcola il valore di 4x^2 + 5x per x=5",
          "answer": "125",
          "hint": "Calcola prima x² con il suo segno, poi i due prodotti, infine somma.",
          "skill": "algebra.sostituzione_espressione_potenza",
          "cognitiveType": "apply",
          "generatorKey": "algebra",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Calcola prima x² con il suo segno, poi i due prodotti, infine somma."
          ]
        },
        {
          "q": "Calcola il valore di 5a^2 + 4a per a=3",
          "answer": "57",
          "hint": "Calcola prima a² con il suo segno, poi i due prodotti, infine somma.",
          "skill": "algebra.sostituzione_espressione_potenza",
          "cognitiveType": "apply",
          "generatorKey": "algebra",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Calcola prima a² con il suo segno, poi i due prodotti, infine somma."
          ]
        },
        {
          "skill": "algebra.sostituzione_mista_potenza_parentesi",
          "cognitiveType": "integrate",
          "q": "Calcola il valore di 3(x−2) + 2x^2 per x=4",
          "answer": "38",
          "hint": "Calcola prima il valore dentro la parentesi (x−2) e moltiplica per 3, poi calcola 2x² a parte, infine somma i due risultati.",
          "generatorKey": "algebra",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Calcola prima il valore dentro la parentesi (x−2) e moltiplica per 3, poi calcola 2x² a parte, infine somma i due risultati."
          ]
        },
        {
          "skill": "algebra.sostituzione_due_variabili",
          "cognitiveType": "integrate",
          "q": "Calcola il valore di x^2 − 2y per x=3, y=−4",
          "answer": "17",
          "hint": "Sostituisci x e y con i loro valori uno alla volta: occhio al segno di y, che è negativo, quindi −2y diventa una sottrazione di un numero negativo (cioè si somma).",
          "generatorKey": "algebra",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Sostituisci x e y con i loro valori uno alla volta: occhio al segno di y, che è negativo, quindi −2y diventa una sottrazione di un numero negativo (cioè si somma)."
          ]
        },
        {
          "q": "In aeroporto, ogni valigia oltre la prima costa 25€ di sovrapprezzo. Se un passeggero ha 4 valigie, quanto paga di sovrapprezzo in totale?",
          "answer": "75",
          "unit": "€",
          "hint": "Le valigie che pagano sovrapprezzo sono tutte tranne la prima: moltiplica il loro numero per 25€.",
          "skill": "algebra.problema_traduzione",
          "cognitiveType": "reason",
          "generatorKey": "algebra",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Le valigie che pagano sovrapprezzo sono tutte tranne la prima: moltiplica il loro numero per 25€."
          ]
        },
        {
          "q": "Semplifica: 5(x−1) − 2(x+3) = ?",
          "type": "expr",
          "answer": [
            "3x-11"
          ],
          "hint": "Distribuisci entrambi i prodotti (occhio al segno meno davanti al secondo), poi raggruppa i termini simili.",
          "skill": "algebra.distributiva_doppia_segno_negativo",
          "cognitiveType": "integrate",
          "generatorKey": "algebra",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Distribuisci entrambi i prodotti (occhio al segno meno davanti al secondo), poi raggruppa i termini simili."
          ]
        },
        {
          "q": "Calcola il valore di 2x^2 − 3(x+1) per x=3",
          "answer": "6",
          "hint": "Calcola prima 2x², poi 3 per (x+1), infine sottrai.",
          "skill": "algebra.sostituzione_mista_potenza_parentesi",
          "cognitiveType": "integrate",
          "generatorKey": "algebra",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Calcola prima 2x², poi 3 per (x+1), infine sottrai."
          ]
        },
        {
          "q": "Pensa un numero, sommalo a 7, moltiplica il risultato per 4, sottrai 28, dividi per 4. Cosa ottieni?",
          "type": "choice",
          "options": [
            "Il doppio del numero di partenza",
            "Il numero di partenza stesso",
            "Il numero di partenza più 7",
            "Sempre zero"
          ],
          "correct": 1,
          "hint": "Scrivi l'espressione con una lettera al posto del numero pensato e semplificala passo passo.",
          "logic": true,
          "skill": "algebra.problema_numero_pensato",
          "cognitiveType": "reason",
          "generatorKey": "algebra",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Scrivi l'espressione con una lettera al posto del numero pensato e semplificala passo passo."
          ]
        }
      ]
    },
    "quiz": [
      {
        "q": "Semplifica 4x+3x:",
        "options": [
          "7x",
          "12x",
          "7",
          "x⁷"
        ],
        "correct": 0
      },
      {
        "q": "Il valore di 3x−2 per x=4 è:",
        "options": [
          "10",
          "12",
          "14",
          "9"
        ],
        "correct": 0
      },
      {
        "q": "Somma i polinomi (x+2)+(2x−5):",
        "options": [
          "3x−3",
          "x−3",
          "3x+7",
          "2x−3"
        ],
        "correct": 0
      },
      {
        "q": "Semplifica 2(x−3):",
        "options": [
          "2x−3",
          "2x−6",
          "x−6",
          "2x+6"
        ],
        "correct": 1
      },
      {
        "q": "Il valore di x^2 per x=−3 è:",
        "options": [
          "−9",
          "9",
          "−6",
          "6"
        ],
        "correct": 1
      },
      {
        "q": "Semplifica 5a+2b−3a:",
        "options": [
          "2a+2b",
          "8a+2b",
          "2a−2b",
          "5a−b"
        ],
        "correct": 0
      },
      {
        "q": "Semplifica 6x − 4x:",
        "options": [
          "2x",
          "10x",
          "2",
          "24x"
        ],
        "correct": 0
      },
      {
        "q": "Il valore di 4x+3 per x=2 è:",
        "options": [
          "7",
          "8",
          "11",
          "14"
        ],
        "correct": 2
      },
      {
        "q": "Somma i polinomi (3x−1)+(2x+4):",
        "options": [
          "5x+3",
          "5x+5",
          "x+3",
          "5x−3"
        ],
        "correct": 0
      },
      {
        "q": "Semplifica 3(x+4):",
        "options": [
          "3x+4",
          "3x+7",
          "3x+12",
          "x+12"
        ],
        "correct": 2
      }
    ]
  },
  {
    "id": "equazioni",
    "icon": "⚖️",
    "accent": "coral",
    "title": "Equazioni di Primo Grado",
    "tagline": "Trovare il valore che tiene tutto in equilibrio",
    "theory": [
      {
        "title": "Cos'è x?",
        "type": "microlesson",
        "concept": "x",
        "situation": "Immagina di sapere che, aggiungendo 3 valigie a quelle che hai già, arrivi a 7 in totale. Non sai ancora quante valigie hai ORA: quel numero sconosciuto ha bisogno di un nome.",
        "explain": "In matematica, invece di scrivere ogni volta “il numero che non conosco ancora”, usiamo una lettera al posto del numero. La più usata è x, ma potrebbe essere una qualsiasi altra lettera (y, n, t...). x non è un simbolo magico: è solo un contenitore per un numero che, al momento, non conosciamo.",
        "example": "Nella frase “x valigie + 3 valigie = 7 valigie”, x rappresenta il numero di valigie che avevi all'inizio. Risolvere il problema significa scoprire quale numero si nasconde dietro la x.",
        "check": {
          "q": "Cosa rappresenta la lettera x in un’equazione?",
          "options": [
            "Sempre il numero 10",
            "Un numero che non conosciamo ancora e vogliamo trovare",
            "Una parola in codice",
            "Il numero delle domande"
          ],
          "correct": 1
        }
      },
      {
        "title": "Variabile",
        "type": "microlesson",
        "concept": "variabile",
        "situation": "Non tutte le lettere “nascondono” sempre lo stesso identico numero: a volte una lettera serve per descrivere una regola valida per tanti casi insieme.",
        "explain": "Una variabile è una lettera che può assumere valori diversi, a seconda della situazione. Serve per scrivere una regola generale, non per trovare un unico numero preciso.",
        "example": "Il costo di un taxi è “C = 3 + 1,5 × km”. Qui km è una variabile: cambia da viaggio a viaggio (5 km, 12 km, 20 km...) e la formula resta valida per ognuno di questi valori.",
        "check": {
          "q": "Quando una lettera è usata come \"variabile\"?",
          "options": [
            "Quando rappresenta un unico numero fisso da scoprire",
            "Quando descrive una regola valida per valori diversi, non un unico numero da trovare",
            "Quando è sempre uguale a zero",
            "Quando si trova alla fine della frase"
          ],
          "correct": 1
        }
      },
      {
        "title": "Incognita",
        "type": "microlesson",
        "concept": "incognita",
        "situation": "In un’equazione come x + 3 = 7, invece, la lettera non può assumere tanti valori diversi: c’è un solo numero che rende vera l’uguaglianza.",
        "explain": "Quando una lettera rappresenta un unico numero preciso da trovare per rendere vera un’uguaglianza, si chiama incognita (non più genericamente \"variabile\"). x + 3 = 7 è vera solo se x vale esattamente 4: qui x è un’incognita.",
        "example": "Variabile: \"y = 2 × numero di biglietti\" (y cambia a seconda di quanti biglietti compri: è una regola generale). Incognita: \"2 × biglietti = 18\" (c’è un solo numero di biglietti che rende vera l’uguaglianza: è un’incognita da trovare).",
        "check": {
          "q": "Qual è la differenza principale tra variabile e incognita?",
          "options": [
            "Nessuna, sono sempre sinonimi",
            "La variabile descrive una regola per valori diversi; l’incognita è il numero preciso che rende vera una particolare uguaglianza",
            "La variabile si usa solo in geometria",
            "L’incognita è sempre negativa"
          ],
          "correct": 1
        }
      },
      {
        "title": "Cos'è un'equazione",
        "body": "Un'equazione è un'uguaglianza tra due espressioni che contiene un'incognita (di solito x). Risolverla significa trovare il valore di x che rende vera l'uguaglianza.\n\nEsempio: x + 3 = 7  →  x = 4"
      },
      {
        "title": "Primo membro",
        "type": "microlesson",
        "concept": "primo_membro",
        "situation": "Un’equazione è divisa in due parti dal simbolo =, un po’ come una bilancia con due piatti.",
        "explain": "Tutto ciò che si trova a SINISTRA del simbolo = si chiama primo membro (o membro sinistro).",
        "example": "In 2x + 3 = 11, il primo membro è \"2x + 3\".",
        "check": {
          "q": "Qual è il primo membro di 4x − 1 = 15?",
          "options": [
            "4x − 1",
            "15",
            "=",
            "4x − 1 = 15"
          ],
          "correct": 0
        }
      },
      {
        "title": "Secondo membro",
        "type": "microlesson",
        "concept": "secondo_membro",
        "situation": "…e tutto ciò che si trova a DESTRA del simbolo = ha un nome altrettanto preciso.",
        "explain": "Tutto ciò che si trova a DESTRA del simbolo = si chiama secondo membro (o membro destro). Un’equazione è un’uguaglianza tra il valore del primo membro e il valore del secondo membro.",
        "example": "In 2x + 3 = 11, il secondo membro è \"11\". In 2x + 3 = x + 8, il secondo membro è \"x + 8\": anche il secondo membro può contenere l’incognita.",
        "check": {
          "q": "Qual è il secondo membro di 3x = x + 10?",
          "options": [
            "3x",
            "x",
            "x + 10",
            "10"
          ],
          "correct": 2
        }
      },
      {
        "title": "Termine",
        "type": "microlesson",
        "concept": "termine",
        "situation": "Guarda l’espressione 3x + 5 − 2x: sembra complicata, ma è fatta di pezzi più piccoli, uniti dai simboli + e −.",
        "explain": "Un termine è ciascuno dei \"pezzi\" di un’espressione, separati da + o −. In 3x + 5 − 2x ci sono tre termini: 3x, +5, −2x. Ogni termine ha il proprio segno, anche quando non è scritto esplicitamente (il primo termine, se non ha segno davanti, è considerato positivo).",
        "example": "Nell’equazione 2x − 7 = x + 4, i termini sono: 2x e −7 (primo membro), x e +4 (secondo membro): quattro termini in totale.",
        "check": {
          "q": "Quanti termini ci sono in 5x − 3 + 2x?",
          "options": [
            "1",
            "2",
            "3",
            "4"
          ],
          "correct": 2
        }
      },
      {
        "title": "Coefficiente",
        "type": "microlesson",
        "concept": "coefficiente",
        "situation": "Nel termine 5x, il numero 5 e la lettera x fanno parte dello stesso \"pezzo\", ma hanno ruoli diversi.",
        "explain": "Il coefficiente è il numero scritto davanti alla lettera in un termine: dice per quante volte va contata quella lettera. In 5x il coefficiente è 5. Se scrivo solo x, il coefficiente è 1 (sottinteso); se scrivo −x, il coefficiente è −1.",
        "example": "Nel termine −3x, il coefficiente è −3. Nel termine x, il coefficiente è 1. Nel termine 7 (senza lettera), non c’è un coefficiente: è un termine numerico puro.",
        "check": {
          "q": "Qual è il coefficiente di x nel termine −x?",
          "options": [
            "0",
            "1",
            "−1",
            "Non esiste"
          ],
          "correct": 2
        }
      },
      {
        "title": "Operazioni inverse",
        "type": "microlesson",
        "concept": "operazioni_inverse",
        "situation": "Per scoprire quanto vale x in x + 3 = 7, dobbiamo \"liberarla\" dal +3 che le sta accanto. Come si annulla un +3?",
        "explain": "Ogni operazione ha un’operazione inversa che la annulla: l’inversa di +3 è −3; l’inversa di −5 è +5; l’inversa di ×4 è ÷4; l’inversa di ÷2 è ×2. Per isolare l’incognita, si applica l’operazione inversa di ciò che le sta accanto.",
        "example": "In x + 3 = 7, per eliminare il \"+3\" accanto alla x applico l’operazione inversa: sottraggo 3. Nella prossima scheda vedrai perché questo va fatto su ENTRAMBI i membri, non solo su uno.",
        "check": {
          "q": "Qual è l’operazione inversa di \"×5\"?",
          "options": [
            "+5",
            "−5",
            "×5",
            "÷5"
          ],
          "correct": 3
        }
      },
      {
        "title": "Il principio di equivalenza",
        "type": "microlesson",
        "concept": "principio_equivalenza",
        "situation": "Immagina una vera bilancia in equilibrio, con dei pesi su entrambi i piatti. Se aggiungi 2 kg SOLO a sinistra, cosa succede?",
        "explain": "Un’equazione è come una bilancia in equilibrio: i due membri hanno lo stesso valore. Se applichi un’operazione a un SOLO membro, l’equilibrio si rompe e l’equazione non è più vera. Se applichi la STESSA operazione a ENTRAMBI i membri, l’equilibrio resta: ottieni un’equazione equivalente, con la stessa soluzione.",
        "example": "x + 3 = 7. Sottraggo 3 da ENTRAMBI i membri: x + 3 − 3 = 7 − 3, cioè x = 4. È lo stesso identico principio della bilancia: quello che fai a sinistra, lo devi fare anche a destra.",
        "check": {
          "q": "Perché x + 3 = 7 diventa x = 4 quando sottraggo 3?",
          "options": [
            "Perché il 3 \"cambia magicamente segno\" quando attraversa l’uguale",
            "Perché ho sottratto 3 da ENTRAMBI i membri, e questo mantiene l’uguaglianza vera",
            "Perché x deve sempre essere positiva",
            "Perché 7 − 3 fa sempre 4"
          ],
          "correct": 1
        }
      },
      {
        "title": "I principi di equivalenza",
        "body": "Ora formalizziamo quello che hai appena visto con la bilancia. Un'equazione resta vera (equivalente) se:\n\n1° principio: si somma o sottrae lo stesso numero a entrambi i membri.\n\n2° principio: si moltiplica o divide entrambi i membri per uno stesso numero diverso da zero."
      },
      {
        "title": "Perché \"cambi membro, cambi segno\"",
        "body": "Il principio di equivalenza dice: applica la STESSA operazione a entrambi i membri.\n\nEsempio: 2x + 3 = 11. Il termine “+3” è accanto alla x: applico l'operazione inversa, cioè sottraggo 3 da ENTRAMBI i membri:\n2x + 3 − 3 = 11 − 3\n2x = 8\n\nGuarda cosa è successo: il “+3” a sinistra è sparito, e a destra è comparso un “−3”. Da qui nasce la scorciatoia che userai spesso: “quando un termine passa all'altro membro, cambia segno”. Non è una regola magica: è solo il risultato visibile di aver sottratto lo stesso numero da entrambi i membri e aver semplificato. Ora che sai PERCHÉ funziona, puoi usarla per andare più veloce."
      },
      {
        "title": "La verifica",
        "body": "Per controllare che il risultato sia corretto, si sostituisce il valore trovato al posto della x nell'equazione originale: se i due membri diventano uguali, la soluzione è corretta."
      },
      {
        "title": "Esempio svolto",
        "type": "steps",
        "steps": [
          "Il problema: risolvi 3(x−2) = x+4",
          "Distribuiamo il 3: 3x−6 = x+4",
          "Portiamo le x a sinistra e i numeri a destra: 3x−x = 4+6",
          "Semplifichiamo: 2x = 10 → x = 5",
          "Verifica: 3(5−2)=9  e  5+4=9 ✓ Corretto!"
        ]
      },
      {
        "title": "Un altro esempio",
        "type": "steps",
        "steps": [
          "Il problema: risolvi x/2 + 3 = 7",
          "Portiamo il 3 dall'altra parte: x/2 = 7 − 3 = 4",
          "Moltiplichiamo entrambi i membri per 2: x = 4 × 2 = 8\n\nVerifica: 8/2+3 = 4+3 = 7 ✓"
        ]
      }
    ],
    "exercises": {
      "facile": [
        {
          "q": "Risolvi con la bilancia: x + 4 = 9",
          "format": "balance",
          "skill": "equazioni.bilancia",
          "level6": 1,
          "cognitiveType": "apply",
          "hint": "Applica sempre la stessa operazione a entrambi i piatti della bilancia.",
          "hintSteps": [
            "Isola la x applicando ad entrambi i membri l’operazione inversa di quella scritta accanto alla x.",
            "Se vedi +b accanto alla x, sottrai b da entrambi i membri; se vedi ×a, dividi entrambi i membri per a."
          ],
          "answer": "5",
          "model": {
            "a": 1,
            "b": 4,
            "c": 0,
            "d": 9
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "Risolvi con la bilancia: 6x = 42",
          "format": "balance",
          "skill": "equazioni.bilancia",
          "level6": 1,
          "cognitiveType": "apply",
          "hint": "Applica sempre la stessa operazione a entrambi i piatti della bilancia.",
          "hintSteps": [
            "Isola la x applicando ad entrambi i membri l’operazione inversa di quella scritta accanto alla x.",
            "Se vedi +b accanto alla x, sottrai b da entrambi i membri; se vedi ×a, dividi entrambi i membri per a."
          ],
          "answer": "7",
          "model": {
            "a": 6,
            "b": 0,
            "c": 0,
            "d": 42
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "Raggruppa i termini simili di: 5x + 3 − 2x + 7",
          "format": "group",
          "skill": "equazioni.raggruppa_termini",
          "level6": 1,
          "cognitiveType": "recognize",
          "hint": "Separa i termini che contengono la x da quelli che sono solo numeri.",
          "hintSteps": [
            "Guarda ogni termine uno alla volta: contiene una x oppure no?",
            "I termini con la x vanno insieme, i termini numerici vanno insieme: il segno di ogni termine resta suo."
          ],
          "groupData": {
            "buckets": [
              {
                "key": "x",
                "label": "Termini con la x"
              },
              {
                "key": "num",
                "label": "Termini numerici"
              }
            ],
            "terms": [
              {
                "id": "t1",
                "label": "5x",
                "group": "x"
              },
              {
                "id": "t2",
                "label": "+3",
                "group": "num"
              },
              {
                "id": "t3",
                "label": "−2x",
                "group": "x"
              },
              {
                "id": "t4",
                "label": "+7",
                "group": "num"
              }
            ]
          }
        },
        {
          "q": "Raggruppa i termini simili di: 4x − 6 − x + 2",
          "format": "group",
          "skill": "equazioni.raggruppa_termini",
          "level6": 1,
          "cognitiveType": "recognize",
          "hint": "Separa i termini che contengono la x da quelli che sono solo numeri.",
          "hintSteps": [
            "Guarda ogni termine uno alla volta: contiene una x oppure no?",
            "I termini con la x vanno insieme, i termini numerici vanno insieme: il segno di ogni termine resta suo."
          ],
          "groupData": {
            "buckets": [
              {
                "key": "x",
                "label": "Termini con la x"
              },
              {
                "key": "num",
                "label": "Termini numerici"
              }
            ],
            "terms": [
              {
                "id": "t1",
                "label": "4x",
                "group": "x"
              },
              {
                "id": "t2",
                "label": "−6",
                "group": "num"
              },
              {
                "id": "t3",
                "label": "−x",
                "group": "x"
              },
              {
                "id": "t4",
                "label": "+2",
                "group": "num"
              }
            ]
          }
        },
        {
          "q": "x + 7 = 12",
          "answer": "5",
          "hint": "Isola la x applicando ad entrambi i membri la stessa operazione inversa.",
          "skill": "equazioni.isola_x_addizione",
          "level6": 1,
          "cognitiveType": "apply",
          "hintSteps": [
            "Isola la x applicando ad entrambi i membri l’operazione inversa di quella scritta accanto alla x.",
            "Se vedi +b accanto alla x, sottrai b da entrambi i membri; se vedi ×a, dividi entrambi i membri per a."
          ],
          "model": {
            "a": 1,
            "b": 7,
            "c": 0,
            "d": 12
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "5x = 55",
          "answer": "11",
          "hint": "Isola la x applicando ad entrambi i membri la stessa operazione inversa.",
          "skill": "equazioni.isola_x_moltiplicazione",
          "level6": 1,
          "cognitiveType": "apply",
          "hintSteps": [
            "Isola la x applicando ad entrambi i membri l’operazione inversa di quella scritta accanto alla x.",
            "Se vedi +b accanto alla x, sottrai b da entrambi i membri; se vedi ×a, dividi entrambi i membri per a."
          ],
          "model": {
            "a": 5,
            "b": 0,
            "c": 0,
            "d": 55
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "x − 1 = 6",
          "answer": "7",
          "hint": "Isola la x applicando ad entrambi i membri la stessa operazione inversa.",
          "skill": "equazioni.isola_x_sottrazione",
          "level6": 1,
          "cognitiveType": "apply",
          "hintSteps": [
            "Isola la x applicando ad entrambi i membri l’operazione inversa di quella scritta accanto alla x.",
            "Se vedi +b accanto alla x, sottrai b da entrambi i membri; se vedi ×a, dividi entrambi i membri per a."
          ],
          "model": {
            "a": 1,
            "b": -1,
            "c": 0,
            "d": 6
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "2x = -18",
          "answer": "-9",
          "hint": "Isola la x applicando ad entrambi i membri la stessa operazione inversa.",
          "skill": "equazioni.isola_x_moltiplicazione",
          "level6": 1,
          "cognitiveType": "apply",
          "hintSteps": [
            "Isola la x applicando ad entrambi i membri l’operazione inversa di quella scritta accanto alla x.",
            "Se vedi +b accanto alla x, sottrai b da entrambi i membri; se vedi ×a, dividi entrambi i membri per a."
          ],
          "model": {
            "a": 2,
            "b": 0,
            "c": 0,
            "d": -18
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "x − 8 = -11",
          "answer": "-3",
          "hint": "Isola la x applicando ad entrambi i membri la stessa operazione inversa.",
          "skill": "equazioni.isola_x_sottrazione",
          "level6": 1,
          "cognitiveType": "apply",
          "hintSteps": [
            "Isola la x applicando ad entrambi i membri l’operazione inversa di quella scritta accanto alla x.",
            "Se vedi +b accanto alla x, sottrai b da entrambi i membri; se vedi ×a, dividi entrambi i membri per a."
          ],
          "model": {
            "a": 1,
            "b": -8,
            "c": 0,
            "d": -11
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "7x = 28",
          "answer": "4",
          "hint": "Isola la x applicando ad entrambi i membri la stessa operazione inversa.",
          "skill": "equazioni.isola_x_moltiplicazione",
          "level6": 1,
          "cognitiveType": "apply",
          "hintSteps": [
            "Isola la x applicando ad entrambi i membri l’operazione inversa di quella scritta accanto alla x.",
            "Se vedi +b accanto alla x, sottrai b da entrambi i membri; se vedi ×a, dividi entrambi i membri per a."
          ],
          "model": {
            "a": 7,
            "b": 0,
            "c": 0,
            "d": 28
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "x − 3 = -8",
          "answer": "-5",
          "hint": "Isola la x applicando ad entrambi i membri la stessa operazione inversa.",
          "skill": "equazioni.isola_x_sottrazione",
          "level6": 1,
          "cognitiveType": "apply",
          "hintSteps": [
            "Isola la x applicando ad entrambi i membri l’operazione inversa di quella scritta accanto alla x.",
            "Se vedi +b accanto alla x, sottrai b da entrambi i membri; se vedi ×a, dividi entrambi i membri per a."
          ],
          "model": {
            "a": 1,
            "b": -3,
            "c": 0,
            "d": -8
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "9x = 54",
          "answer": "6",
          "hint": "Isola la x applicando ad entrambi i membri la stessa operazione inversa.",
          "skill": "equazioni.isola_x_moltiplicazione",
          "level6": 1,
          "cognitiveType": "apply",
          "hintSteps": [
            "Isola la x applicando ad entrambi i membri l’operazione inversa di quella scritta accanto alla x.",
            "Se vedi +b accanto alla x, sottrai b da entrambi i membri; se vedi ×a, dividi entrambi i membri per a."
          ],
          "model": {
            "a": 9,
            "b": 0,
            "c": 0,
            "d": 54
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "Un padre ha 40 anni, suo figlio 14. Tra quanti anni l'età del padre sarà il doppio di quella del figlio?",
          "answer": "12",
          "unit": "anni",
          "hint": "Scrivi l'equazione 40+x = 2×(14+x) e risolvila.",
          "logic": true,
          "skill": "equazioni.problema_testuale",
          "level6": 5,
          "cognitiveType": "integrate",
          "hintSteps": [
            "Rileggi la frase e individua qual è il numero sconosciuto: chiamalo x.",
            "Traduci ogni pezzo della frase in un’operazione, poi risolvi l’equazione ottenuta come al solito."
          ],
          "model": {
            "a": 1,
            "b": 40,
            "c": 2,
            "d": 28
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "Il triplo di un numero, diminuito di 4, fa 11. Qual è il numero?",
          "answer": "5",
          "hint": "Scrivi l'equazione 3x − 4 = 11 e risolvila.",
          "skill": "equazioni.problema_testuale",
          "level6": 5,
          "cognitiveType": "integrate",
          "hintSteps": [
            "Rileggi la frase e individua qual è il numero sconosciuto: chiamalo x.",
            "Traduci ogni pezzo della frase in un’operazione, poi risolvi l’equazione ottenuta come al solito."
          ],
          "model": {
            "a": 3,
            "b": -4,
            "c": 0,
            "d": 11
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "x + 9 = 7",
          "answer": "-2",
          "hint": "Isola la x applicando ad entrambi i membri la stessa operazione inversa.",
          "skill": "equazioni.isola_x_addizione",
          "level6": 1,
          "cognitiveType": "apply",
          "hintSteps": [
            "Isola la x applicando ad entrambi i membri l’operazione inversa di quella scritta accanto alla x.",
            "Se vedi +b accanto alla x, sottrai b da entrambi i membri; se vedi ×a, dividi entrambi i membri per a."
          ],
          "model": {
            "a": 1,
            "b": 9,
            "c": 0,
            "d": 7
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "Riordina i passaggi per risolvere 4x − 3 = 9",
          "format": "order",
          "answer": "3",
          "skill": "equazioni.riordina_passaggi",
          "level6": 2,
          "cognitiveType": "apply",
          "hint": "Prima isola il termine con la x, poi trova il valore di x.",
          "hintSteps": [
            "Prima isola il termine con la x, poi trova il coefficiente.",
            "Sposta prima il numero senza x nell’altro membro (operazione inversa su entrambi i membri), poi dividi per il coefficiente rimasto."
          ],
          "orderData": {
            "steps": [
              {
                "id": "s1",
                "text": "4x − 3 = 9"
              },
              {
                "id": "s2",
                "text": "4x = 9 + 3"
              },
              {
                "id": "s3",
                "text": "4x = 12"
              },
              {
                "id": "s4",
                "text": "x = 3"
              }
            ],
            "correctOrder": [
              "s1",
              "s2",
              "s3",
              "s4"
            ]
          }
        },
        {
          "q": "Il triplo di un numero aumentato di 2 è uguale a 17.",
          "format": "build",
          "answer": "5",
          "skill": "equazioni.costruisci_equazione",
          "level6": 5,
          "cognitiveType": "integrate",
          "hint": "Traduci un pezzo alla volta: \"il triplo di un numero\" è 3x, \"aumentato di 2\" è +2, \"è uguale a\" è =.",
          "hintSteps": [
            "Rileggi la frase e individua qual è il numero sconosciuto: chiamalo x.",
            "Traduci ogni pezzo della frase in un’operazione, poi risolvi l’equazione ottenuta come al solito."
          ],
          "buildData": {
            "sentence": "Il triplo di un numero aumentato di 2 è uguale a 17.",
            "blocks": [
              {
                "id": "3x",
                "label": "3x"
              },
              {
                "id": "+2",
                "label": "+2"
              },
              {
                "id": "=",
                "label": "="
              },
              {
                "id": "17",
                "label": "17"
              },
              {
                "id": "d1",
                "label": "−2"
              },
              {
                "id": "d2",
                "label": "15"
              }
            ],
            "correctSequence": [
              "3x",
              "+2",
              "=",
              "17"
            ]
          }
        },
        {
          "q": "Un numero diminuito di 5 è uguale a 12.",
          "format": "build",
          "answer": "17",
          "skill": "equazioni.costruisci_equazione",
          "level6": 5,
          "cognitiveType": "integrate",
          "hint": "Traduci un pezzo alla volta: \"un numero\" è x, \"diminuito di 5\" è −5, \"è uguale a\" è =.",
          "hintSteps": [
            "Rileggi la frase e individua qual è il numero sconosciuto: chiamalo x.",
            "Traduci ogni pezzo della frase in un’operazione, poi risolvi l’equazione ottenuta come al solito."
          ],
          "buildData": {
            "sentence": "Un numero diminuito di 5 è uguale a 12.",
            "blocks": [
              {
                "id": "x",
                "label": "x"
              },
              {
                "id": "-5",
                "label": "−5"
              },
              {
                "id": "=",
                "label": "="
              },
              {
                "id": "12",
                "label": "12"
              },
              {
                "id": "d1",
                "label": "+5"
              },
              {
                "id": "d2",
                "label": "5x"
              }
            ],
            "correctSequence": [
              "x",
              "-5",
              "=",
              "12"
            ]
          }
        }
      ],
      "medio": [
        {
          "q": "Risolvi con la bilancia: 3x + 2 = x + 10",
          "format": "balance",
          "skill": "equazioni.bilancia",
          "level6": 3,
          "cognitiveType": "integrate",
          "hint": "Applica sempre la stessa operazione a entrambi i piatti della bilancia.",
          "hintSteps": [
            "Isola la x applicando ad entrambi i membri l’operazione inversa di quella scritta accanto alla x.",
            "Se vedi +b accanto alla x, sottrai b da entrambi i membri; se vedi ×a, dividi entrambi i membri per a."
          ],
          "answer": "4",
          "model": {
            "a": 3,
            "b": 2,
            "c": 1,
            "d": 10
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "Risolvi con la bilancia: 5x − 3 = 2x + 9",
          "format": "balance",
          "skill": "equazioni.bilancia",
          "level6": 3,
          "cognitiveType": "integrate",
          "hint": "Applica sempre la stessa operazione a entrambi i piatti della bilancia.",
          "hintSteps": [
            "Isola la x applicando ad entrambi i membri l’operazione inversa di quella scritta accanto alla x.",
            "Se vedi +b accanto alla x, sottrai b da entrambi i membri; se vedi ×a, dividi entrambi i membri per a."
          ],
          "answer": "4",
          "model": {
            "a": 5,
            "b": -3,
            "c": 2,
            "d": 9
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "Raggruppa i termini simili di: 6x + 5 − 2x − 9 + x",
          "format": "group",
          "skill": "equazioni.raggruppa_termini",
          "level6": 2,
          "cognitiveType": "recognize",
          "hint": "Separa i termini che contengono la x da quelli che sono solo numeri.",
          "hintSteps": [
            "Guarda ogni termine uno alla volta: contiene una x oppure no?",
            "I termini con la x vanno insieme, i termini numerici vanno insieme: il segno di ogni termine resta suo."
          ],
          "groupData": {
            "buckets": [
              {
                "key": "x",
                "label": "Termini con la x"
              },
              {
                "key": "num",
                "label": "Termini numerici"
              }
            ],
            "terms": [
              {
                "id": "t1",
                "label": "6x",
                "group": "x"
              },
              {
                "id": "t2",
                "label": "+5",
                "group": "num"
              },
              {
                "id": "t3",
                "label": "−2x",
                "group": "x"
              },
              {
                "id": "t4",
                "label": "−9",
                "group": "num"
              },
              {
                "id": "t5",
                "label": "+x",
                "group": "x"
              }
            ]
          }
        },
        {
          "q": "Alberto ha una caramella in più di Marco, che ne ha due in più di Luca. In totale hanno 59 caramelle. Quante ne ha Luca?",
          "answer": "18",
          "hint": "Chiama L le caramelle di Luca: Marco ne ha L+2, Alberto L+3. Scrivi l'equazione della somma totale.",
          "logic": true,
          "skill": "equazioni.problema_logico",
          "level6": 5,
          "cognitiveType": "reason",
          "hintSteps": [
            "Rileggi la frase e individua qual è il numero sconosciuto: chiamalo x.",
            "Traduci ogni pezzo della frase in un’operazione, poi risolvi l’equazione ottenuta come al solito."
          ],
          "model": {
            "a": 3,
            "b": 5,
            "c": 0,
            "d": 59
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "7(x + 5) = -35",
          "answer": "-10",
          "hint": "Porta tutti i termini con la x da un lato e i numeri dall'altro, cambiando segno quando li sposti.",
          "skill": "equazioni.parentesi",
          "level6": 4,
          "cognitiveType": "apply",
          "hintSteps": [
            "Prima di tutto, distribuisci il numero davanti alla parentesi su ogni termine dentro.",
            "Dopo aver distribuito, procedi come per un’equazione con la x da entrambe le parti."
          ],
          "model": {
            "a": 7,
            "b": 35,
            "c": 0,
            "d": -35
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "2x − 5 = 4x − 9",
          "answer": "2",
          "hint": "Porta tutti i termini con la x da un lato e i numeri dall'altro, cambiando segno quando li sposti.",
          "skill": "equazioni.x_ambo_membri",
          "level6": 3,
          "cognitiveType": "apply",
          "hintSteps": [
            "Il primo obiettivo è avere la x da un lato solo.",
            "Sottrai da entrambi i membri il termine con la x più piccolo (ad es. se hai 2x a destra, sottrai 2x da entrambi i membri): sparirà da un lato e si sottrarrà dall’altro."
          ],
          "model": {
            "a": 2,
            "b": -5,
            "c": 4,
            "d": -9
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "7x − 6 = 57",
          "answer": "9",
          "hint": "Porta tutti i termini con la x da un lato e i numeri dall'altro, cambiando segno quando li sposti.",
          "skill": "equazioni.due_passaggi",
          "level6": 2,
          "cognitiveType": "apply",
          "hintSteps": [
            "Prima isola il termine con la x, poi trova il coefficiente.",
            "Sposta prima il numero senza x nell’altro membro (operazione inversa su entrambi i membri), poi dividi per il coefficiente rimasto."
          ],
          "model": {
            "a": 7,
            "b": -6,
            "c": 0,
            "d": 57
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "4x + 6 = 46",
          "answer": "10",
          "hint": "Porta tutti i termini con la x da un lato e i numeri dall'altro, cambiando segno quando li sposti.",
          "skill": "equazioni.due_passaggi",
          "level6": 2,
          "cognitiveType": "apply",
          "hintSteps": [
            "Prima isola il termine con la x, poi trova il coefficiente.",
            "Sposta prima il numero senza x nell’altro membro (operazione inversa su entrambi i membri), poi dividi per il coefficiente rimasto."
          ],
          "model": {
            "a": 4,
            "b": 6,
            "c": 0,
            "d": 46
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "4(x + 2) = 4",
          "answer": "-1",
          "hint": "Porta tutti i termini con la x da un lato e i numeri dall'altro, cambiando segno quando li sposti.",
          "skill": "equazioni.parentesi",
          "level6": 4,
          "cognitiveType": "apply",
          "hintSteps": [
            "Prima di tutto, distribuisci il numero davanti alla parentesi su ogni termine dentro.",
            "Dopo aver distribuito, procedi come per un’equazione con la x da entrambe le parti."
          ],
          "model": {
            "a": 4,
            "b": 8,
            "c": 0,
            "d": 4
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "8x + 8 = 88",
          "answer": "10",
          "hint": "Porta tutti i termini con la x da un lato e i numeri dall'altro, cambiando segno quando li sposti.",
          "skill": "equazioni.due_passaggi",
          "level6": 2,
          "cognitiveType": "apply",
          "hintSteps": [
            "Prima isola il termine con la x, poi trova il coefficiente.",
            "Sposta prima il numero senza x nell’altro membro (operazione inversa su entrambi i membri), poi dividi per il coefficiente rimasto."
          ],
          "model": {
            "a": 8,
            "b": 8,
            "c": 0,
            "d": 88
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "4x − 2 = 22",
          "answer": "6",
          "hint": "Porta tutti i termini con la x da un lato e i numeri dall'altro, cambiando segno quando li sposti.",
          "skill": "equazioni.due_passaggi",
          "level6": 2,
          "cognitiveType": "apply",
          "hintSteps": [
            "Prima isola il termine con la x, poi trova il coefficiente.",
            "Sposta prima il numero senza x nell’altro membro (operazione inversa su entrambi i membri), poi dividi per il coefficiente rimasto."
          ],
          "model": {
            "a": 4,
            "b": -2,
            "c": 0,
            "d": 22
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "3x − 2 = 5x + 8",
          "answer": "-5",
          "hint": "Porta tutti i termini con la x da un lato e i numeri dall'altro, cambiando segno quando li sposti.",
          "skill": "equazioni.x_ambo_membri",
          "level6": 3,
          "cognitiveType": "apply",
          "hintSteps": [
            "Il primo obiettivo è avere la x da un lato solo.",
            "Sottrai da entrambi i membri il termine con la x più piccolo (ad es. se hai 2x a destra, sottrai 2x da entrambi i membri): sparirà da un lato e si sottrarrà dall’altro."
          ],
          "model": {
            "a": 3,
            "b": -2,
            "c": 5,
            "d": 8
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "Un tour operator applica una tariffa di 50€ fissi più 8€ per ogni giorno di soggiorno. Un altro applica 30€ fissi più 12€ al giorno. Da quanti giorni di soggiorno i due tour operator costano esattamente uguale?",
          "answer": "5",
          "unit": "giorni",
          "hint": "Scrivi l'equazione 50+8x = 30+12x e risolvila.",
          "logic": true,
          "skill": "equazioni.problema_testuale",
          "level6": 5,
          "cognitiveType": "integrate",
          "hintSteps": [
            "Rileggi la frase e individua qual è il numero sconosciuto: chiamalo x.",
            "Traduci ogni pezzo della frase in un’operazione, poi risolvi l’equazione ottenuta come al solito."
          ],
          "model": {
            "a": 8,
            "b": 50,
            "c": 12,
            "d": 30
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "Alberto ha una caramella in più di Marco, che ne ha due in più di Luca. In totale hanno 59 caramelle. Quante ne ha Alberto?",
          "answer": "21",
          "hint": "Chiama L le caramelle di Luca: Marco=L+2, Alberto=L+3. Risolvi 3L+5=59, poi calcola le caramelle di Alberto.",
          "logic": true,
          "skill": "equazioni.problema_logico",
          "level6": 5,
          "cognitiveType": "reason",
          "hintSteps": [
            "Rileggi la frase e individua qual è il numero sconosciuto: chiamalo x.",
            "Traduci ogni pezzo della frase in un’operazione, poi risolvi l’equazione ottenuta come al solito."
          ]
        },
        {
          "q": "Matteo è nato nel 2000. Nel 2014 aveva 14 anni e la somma delle cifre di quell'anno (2+0+1+4=7) era esattamente la metà della sua età. In quale altro anno la somma delle cifre dell'anno sarà un terzo della sua età?",
          "answer": "2024",
          "hint": "L'età di Matteo nell'anno Y è (Y−2000). Cerca Y tale che la somma delle sue cifre sia (Y−2000):3: prova per tentativi vicino al 2020.",
          "logic": true,
          "skill": "equazioni.problema_logico",
          "level6": null,
          "cognitiveType": "reason",
          "hintSteps": [
            "Rileggi la frase e individua qual è il numero sconosciuto: chiamalo x.",
            "Traduci ogni pezzo della frase in un’operazione, poi risolvi l’equazione ottenuta come al solito."
          ]
        },
        {
          "q": "5(x−3) = 2x + 6",
          "answer": "7",
          "hint": "Distribuisci il 5, poi porta le x da una parte e i numeri dall'altra.",
          "skill": "equazioni.parentesi",
          "level6": 4,
          "cognitiveType": "apply",
          "hintSteps": [
            "Prima di tutto, distribuisci il numero davanti alla parentesi su ogni termine dentro.",
            "Dopo aver distribuito, procedi come per un’equazione con la x da entrambe le parti."
          ],
          "model": {
            "a": 5,
            "b": -15,
            "c": 2,
            "d": 6
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "Riordina i passaggi per risolvere 5x − 4 = 2x + 11",
          "format": "order",
          "answer": "5",
          "skill": "equazioni.riordina_passaggi",
          "level6": 3,
          "cognitiveType": "integrate",
          "hint": "Il primo passaggio deve avvicinare tutte le x da un lato solo.",
          "hintSteps": [
            "Il primo obiettivo è avere la x da un lato solo.",
            "Sottrai da entrambi i membri il termine con la x più piccolo (ad es. se hai 2x a destra, sottrai 2x da entrambi i membri): sparirà da un lato e si sottrarrà dall’altro."
          ],
          "orderData": {
            "steps": [
              {
                "id": "s1",
                "text": "5x − 4 = 2x + 11"
              },
              {
                "id": "s2",
                "text": "5x − 2x = 11 + 4"
              },
              {
                "id": "s3",
                "text": "3x = 15"
              },
              {
                "id": "s4",
                "text": "x = 5"
              }
            ],
            "correctOrder": [
              "s1",
              "s2",
              "s3",
              "s4"
            ]
          }
        },
        {
          "q": "Il doppio di un numero, diminuito di 7, è uguale al numero aumentato di 3.",
          "format": "build",
          "answer": "10",
          "skill": "equazioni.costruisci_equazione",
          "level6": 5,
          "cognitiveType": "integrate",
          "hint": "Traduci un pezzo alla volta: \"il doppio di un numero\" è 2x, \"diminuito di 7\" è −7; a destra, \"il numero\" è di nuovo x e \"aumentato di 3\" è +3.",
          "hintSteps": [
            "Rileggi la frase e individua qual è il numero sconosciuto: chiamalo x.",
            "Traduci ogni pezzo della frase in un’operazione, poi risolvi l’equazione ottenuta come al solito."
          ],
          "buildData": {
            "sentence": "Il doppio di un numero, diminuito di 7, è uguale al numero aumentato di 3.",
            "blocks": [
              {
                "id": "2x",
                "label": "2x"
              },
              {
                "id": "-7",
                "label": "−7"
              },
              {
                "id": "=",
                "label": "="
              },
              {
                "id": "x",
                "label": "x"
              },
              {
                "id": "+3",
                "label": "+3"
              },
              {
                "id": "d1",
                "label": "+7"
              },
              {
                "id": "d2",
                "label": "3x"
              }
            ],
            "correctSequence": [
              "2x",
              "-7",
              "=",
              "x",
              "+3"
            ]
          }
        }
      ],
      "difficile": [
        {
          "q": "2(x + 3) = x + 11",
          "format": "balance",
          "skill": "equazioni.bilancia",
          "level6": 4,
          "cognitiveType": "integrate",
          "hint": "Applica sempre la stessa operazione a entrambi i piatti della bilancia.",
          "hintSteps": [
            "Prima di tutto, distribuisci il numero davanti alla parentesi su ogni termine dentro.",
            "Dopo aver distribuito, procedi come per un’equazione con la x da entrambe le parti."
          ],
          "preStep": "Distribuiamo prima il 2: 2x + 6 = x + 11",
          "answer": "5",
          "model": {
            "a": 2,
            "b": 6,
            "c": 1,
            "d": 11
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "5(x − 2) − 4 = 2x − 38",
          "answer": "-8",
          "hint": "Distribuisci il prodotto a sinistra, poi porta le x da una parte e i numeri dall'altra.",
          "skill": "equazioni.parentesi_ambo_membri",
          "level6": 4,
          "cognitiveType": "integrate",
          "hintSteps": [
            "Prima di tutto, distribuisci il numero davanti alla parentesi su ogni termine dentro.",
            "Dopo aver distribuito, procedi come per un’equazione con la x da entrambe le parti."
          ],
          "model": {
            "a": 5,
            "b": -14,
            "c": 2,
            "d": -38
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "3(x − 1) + 4 = 4x + 9",
          "answer": "-8",
          "hint": "Distribuisci il prodotto a sinistra, poi porta le x da una parte e i numeri dall'altra.",
          "skill": "equazioni.parentesi_ambo_membri",
          "level6": 4,
          "cognitiveType": "integrate",
          "hintSteps": [
            "Prima di tutto, distribuisci il numero davanti alla parentesi su ogni termine dentro.",
            "Dopo aver distribuito, procedi come per un’equazione con la x da entrambe le parti."
          ],
          "model": {
            "a": 3,
            "b": 1,
            "c": 4,
            "d": 9
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "5(x + 2) − 7 = 2x − 6",
          "answer": "-3",
          "hint": "Distribuisci il prodotto a sinistra, poi porta le x da una parte e i numeri dall'altra.",
          "skill": "equazioni.parentesi_ambo_membri",
          "level6": 4,
          "cognitiveType": "integrate",
          "hintSteps": [
            "Prima di tutto, distribuisci il numero davanti alla parentesi su ogni termine dentro.",
            "Dopo aver distribuito, procedi come per un’equazione con la x da entrambe le parti."
          ],
          "model": {
            "a": 5,
            "b": 3,
            "c": 2,
            "d": -6
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "2(x − 1) + 6 = 5x − 14",
          "answer": "6",
          "hint": "Distribuisci il prodotto a sinistra, poi porta le x da una parte e i numeri dall'altra.",
          "skill": "equazioni.parentesi_ambo_membri",
          "level6": 4,
          "cognitiveType": "integrate",
          "hintSteps": [
            "Prima di tutto, distribuisci il numero davanti alla parentesi su ogni termine dentro.",
            "Dopo aver distribuito, procedi come per un’equazione con la x da entrambe le parti."
          ],
          "model": {
            "a": 2,
            "b": 4,
            "c": 5,
            "d": -14
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "4(x + 6) − 4 = 3x + 21",
          "answer": "1",
          "hint": "Distribuisci il prodotto a sinistra, poi porta le x da una parte e i numeri dall'altra.",
          "skill": "equazioni.parentesi_ambo_membri",
          "level6": 4,
          "cognitiveType": "integrate",
          "hintSteps": [
            "Prima di tutto, distribuisci il numero davanti alla parentesi su ogni termine dentro.",
            "Dopo aver distribuito, procedi come per un’equazione con la x da entrambe le parti."
          ],
          "model": {
            "a": 4,
            "b": 20,
            "c": 3,
            "d": 21
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "5(x − 5) + 1 = 3x − 18",
          "answer": "3",
          "hint": "Distribuisci il prodotto a sinistra, poi porta le x da una parte e i numeri dall'altra.",
          "skill": "equazioni.parentesi_ambo_membri",
          "level6": 4,
          "cognitiveType": "integrate",
          "hintSteps": [
            "Prima di tutto, distribuisci il numero davanti alla parentesi su ogni termine dentro.",
            "Dopo aver distribuito, procedi come per un’equazione con la x da entrambe le parti."
          ],
          "model": {
            "a": 5,
            "b": -24,
            "c": 3,
            "d": -18
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "(x − 5) + 10 = 3x + 15",
          "answer": "-5",
          "hint": "Distribuisci il prodotto a sinistra, poi porta le x da una parte e i numeri dall'altra.",
          "skill": "equazioni.parentesi_ambo_membri",
          "level6": 4,
          "cognitiveType": "integrate",
          "hintSteps": [
            "Prima di tutto, distribuisci il numero davanti alla parentesi su ogni termine dentro.",
            "Dopo aver distribuito, procedi come per un’equazione con la x da entrambe le parti."
          ],
          "model": {
            "a": 1,
            "b": 5,
            "c": 3,
            "d": 15
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "3(x + 1) + 2 = 5x + 7",
          "answer": "-1",
          "hint": "Distribuisci il prodotto a sinistra, poi porta le x da una parte e i numeri dall'altra.",
          "skill": "equazioni.parentesi_ambo_membri",
          "level6": 4,
          "cognitiveType": "integrate",
          "hintSteps": [
            "Prima di tutto, distribuisci il numero davanti alla parentesi su ogni termine dentro.",
            "Dopo aver distribuito, procedi come per un’equazione con la x da entrambe le parti."
          ],
          "model": {
            "a": 3,
            "b": 5,
            "c": 5,
            "d": 7
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "Le età di tre sorelle sono tutte diverse. La media delle tre età è 10 anni. Prendendole a due a due: la media di una coppia è 11 anni e quella di un'altra coppia è 12 anni. Quanti anni ha la sorella maggiore?",
          "answer": "16",
          "unit": "anni",
          "hint": "La somma delle tre età è 30. Le somme delle tre possibili coppie, sommate insieme, danno il doppio della somma totale (60): trova la terza somma di coppia, poi capisci a quale coppia (le due più piccole, o quella con la maggiore) appartiene ciascuna somma.",
          "logic": true,
          "skill": "equazioni.problema_logico",
          "level6": null,
          "cognitiveType": "reason",
          "hintSteps": [
            "Rileggi la frase e individua qual è il numero sconosciuto: chiamalo x.",
            "Traduci ogni pezzo della frase in un’operazione, poi risolvi l’equazione ottenuta come al solito."
          ]
        },
        {
          "q": "Con 6 fiammiferi, senza spezzarli, è possibile formare 4 triangoli equilateri identici. Come?",
          "type": "choice",
          "options": [
            "Disponendoli in una stella a 6 punte sul tavolo",
            "Costruendo una piramide a base triangolare (tetraedro)",
            "Non è possibile con soli 6 fiammiferi",
            "Disponendoli in due triangoli separati"
          ],
          "correct": 1,
          "hint": "Pensa in 3 dimensioni, non solo sul piano del tavolo!",
          "logic": true,
          "skill": "logica.pensiero_laterale",
          "level6": null,
          "cognitiveType": "reason"
        },
        {
          "q": "In un'agenzia viaggi, il prezzo di un tour è dato da 3 volte il numero di partecipanti più una quota fissa di 50€. Se il prezzo totale è stato 230€, quanti partecipanti c'erano?",
          "answer": "60",
          "hint": "Scrivi l'equazione 3x + 50 = 230 e risolvila.",
          "skill": "equazioni.problema_testuale",
          "level6": 5,
          "cognitiveType": "integrate",
          "hintSteps": [
            "Rileggi la frase e individua qual è il numero sconosciuto: chiamalo x.",
            "Traduci ogni pezzo della frase in un’operazione, poi risolvi l’equazione ottenuta come al solito."
          ],
          "model": {
            "a": 3,
            "b": 50,
            "c": 0,
            "d": 230
          },
          "commonErrorsKey": "linear_basic"
        },
        {
          "q": "La somma di tre numeri interi consecutivi è 72. Qual è il più grande dei tre?",
          "answer": "25",
          "hint": "Chiama x il numero di mezzo: gli altri due sono x−1 e x+1. Scrivi l'equazione della somma.",
          "skill": "equazioni.problema_testuale",
          "level6": 5,
          "cognitiveType": "integrate",
          "hintSteps": [
            "Rileggi la frase e individua qual è il numero sconosciuto: chiamalo x.",
            "Traduci ogni pezzo della frase in un’operazione, poi risolvi l’equazione ottenuta come al solito."
          ]
        },
        {
          "q": "Riordina i passaggi per risolvere 3(x − 2) = x + 4",
          "format": "order",
          "answer": "5",
          "skill": "equazioni.riordina_passaggi",
          "level6": 4,
          "cognitiveType": "integrate",
          "hint": "Il primo passaggio è sempre distribuire il numero davanti alla parentesi.",
          "hintSteps": [
            "Prima di tutto, distribuisci il numero davanti alla parentesi su ogni termine dentro.",
            "Dopo aver distribuito, procedi come per un’equazione con la x da entrambe le parti."
          ],
          "orderData": {
            "steps": [
              {
                "id": "s1",
                "text": "3(x − 2) = x + 4"
              },
              {
                "id": "s2",
                "text": "3x − 6 = x + 4"
              },
              {
                "id": "s3",
                "text": "3x − x = 4 + 6"
              },
              {
                "id": "s4",
                "text": "2x = 10"
              },
              {
                "id": "s5",
                "text": "x = 5"
              }
            ],
            "correctOrder": [
              "s1",
              "s2",
              "s3",
              "s4",
              "s5"
            ]
          }
        },
        {
          "q": "In un hotel il numero di camere occupate è il triplo di quelle libere. In totale ci sono 48 camere. Quante sono le camere libere?",
          "format": "build",
          "answer": "12",
          "skill": "equazioni.costruisci_equazione",
          "level6": 5,
          "cognitiveType": "integrate",
          "hint": "Chiama x le camere libere: \"il triplo di quelle libere\" è 3x (le occupate). Libere + occupate = 48, cioè x + 3x = 48.",
          "hintSteps": [
            "Rileggi la frase e individua qual è il numero sconosciuto: chiamalo x.",
            "Traduci ogni pezzo della frase in un’operazione, poi risolvi l’equazione ottenuta come al solito."
          ],
          "buildData": {
            "sentence": "In un hotel il numero di camere occupate è il triplo di quelle libere. In totale ci sono 48 camere. Quante sono le camere libere?",
            "blocks": [
              {
                "id": "3x",
                "label": "3x"
              },
              {
                "id": "+x",
                "label": "+x"
              },
              {
                "id": "=",
                "label": "="
              },
              {
                "id": "48",
                "label": "48"
              },
              {
                "id": "d1",
                "label": "−x"
              },
              {
                "id": "d2",
                "label": "24"
              }
            ],
            "correctSequence": [
              "3x",
              "+x",
              "=",
              "48"
            ]
          }
        },
        {
          "q": "Trova l'errore nella risoluzione di 2x − 5 = 3",
          "format": "error-detect",
          "skill": "equazioni.caccia_errore",
          "level6": 6,
          "cognitiveType": "diagnose",
          "hint": "Ricontrolla ogni passaggio confrontandolo con quello precedente: cosa è stato applicato a entrambi i membri?",
          "hintSteps": [
            "Confronta due righe consecutive alla volta: cosa è cambiato?",
            "Chiediti se l’operazione applicata è davvero l’inversa corretta, se è stata applicata a entrambi i membri e se il calcolo è giusto."
          ],
          "errorData": {
            "steps": [
              {
                "text": "2x − 5 = 3"
              },
              {
                "text": "2x = 3 − 5"
              },
              {
                "text": "2x = −2"
              },
              {
                "text": "x = −1"
              }
            ],
            "errorIndex": 1,
            "explanation": "L'operazione inversa di \"−5\" è \"+5\", non \"−5\". Il passaggio corretto è: 2x = 3 + 5 = 8, quindi x = 4."
          }
        },
        {
          "q": "Trova l'errore nella risoluzione di x + 6 = 14",
          "format": "error-detect",
          "skill": "equazioni.caccia_errore",
          "level6": 6,
          "cognitiveType": "diagnose",
          "hint": "Ricontrolla ogni passaggio confrontandolo con quello precedente: cosa è stato applicato a entrambi i membri?",
          "hintSteps": [
            "Confronta due righe consecutive alla volta: cosa è cambiato?",
            "Chiediti se l’operazione applicata è davvero l’inversa corretta, se è stata applicata a entrambi i membri e se il calcolo è giusto."
          ],
          "errorData": {
            "steps": [
              {
                "text": "x + 6 = 14"
              },
              {
                "text": "x + 6 − 6 = 14"
              },
              {
                "text": "x = 14"
              }
            ],
            "errorIndex": 1,
            "explanation": "Il −6 è stato applicato solo al primo membro. Va sottratto da ENTRAMBI: x + 6 − 6 = 14 − 6, quindi x = 8."
          }
        },
        {
          "q": "Trova l'errore nella risoluzione di 3x + 5 = 20",
          "format": "error-detect",
          "skill": "equazioni.caccia_errore",
          "level6": 6,
          "cognitiveType": "diagnose",
          "hint": "Ricontrolla ogni passaggio confrontandolo con quello precedente: cosa è stato applicato a entrambi i membri?",
          "hintSteps": [
            "Confronta due righe consecutive alla volta: cosa è cambiato?",
            "Chiediti se l’operazione applicata è davvero l’inversa corretta, se è stata applicata a entrambi i membri e se il calcolo è giusto."
          ],
          "errorData": {
            "steps": [
              {
                "text": "3x + 5 = 20"
              },
              {
                "text": "3x = 20 − 5"
              },
              {
                "text": "3x = 16"
              },
              {
                "text": "x = 16/3"
              }
            ],
            "errorIndex": 2,
            "explanation": "20 − 5 fa 15, non 16: è un errore di calcolo. Il passaggio corretto è 3x = 15, quindi x = 5."
          }
        },
        {
          "q": "Trova l'errore nella risoluzione di 5x − 3 = 2x + 9",
          "format": "error-detect",
          "skill": "equazioni.caccia_errore",
          "level6": 6,
          "cognitiveType": "diagnose",
          "hint": "Ricontrolla ogni passaggio confrontandolo con quello precedente: cosa è stato applicato a entrambi i membri?",
          "hintSteps": [
            "Confronta due righe consecutive alla volta: cosa è cambiato?",
            "Chiediti se l’operazione applicata è davvero l’inversa corretta, se è stata applicata a entrambi i membri e se il calcolo è giusto."
          ],
          "errorData": {
            "steps": [
              {
                "text": "5x − 3 = 2x + 9"
              },
              {
                "text": "5x − 2x = 9 + 3"
              },
              {
                "text": "5x = 12"
              },
              {
                "text": "x = 12/5"
              }
            ],
            "errorIndex": 2,
            "explanation": "5x − 2x fa 3x, non 5x: il termine con la x non è stato semplificato. Il passaggio corretto è 3x = 12, quindi x = 4."
          }
        },
        {
          "q": "Trova l'errore nella risoluzione di 6x − 9 = 21",
          "format": "error-detect",
          "skill": "equazioni.caccia_errore",
          "level6": 6,
          "cognitiveType": "diagnose",
          "hint": "Ricontrolla ogni passaggio confrontandolo con quello precedente: cosa è stato applicato a entrambi i membri?",
          "hintSteps": [
            "Confronta due righe consecutive alla volta: cosa è cambiato?",
            "Chiediti se l’operazione applicata è davvero l’inversa corretta, se è stata applicata a entrambi i membri e se il calcolo è giusto."
          ],
          "errorData": {
            "steps": [
              {
                "text": "6x − 9 = 21"
              },
              {
                "text": "6x = 21 + 7"
              },
              {
                "text": "6x = 28"
              },
              {
                "text": "x = 14/3"
              }
            ],
            "errorIndex": 1,
            "explanation": "Nell'equazione di partenza il numero è 9, non 7: è stato ricopiato male. Il passaggio corretto è 6x = 21 + 9 = 30, quindi x = 5."
          }
        }
      ]
    },
    "quiz": [
      {
        "q": "Risolvi: x + 7 = 12",
        "options": [
          "5",
          "19",
          "−5",
          "7"
        ],
        "correct": 0
      },
      {
        "q": "Risolvi: 3x = 21",
        "options": [
          "7",
          "18",
          "24",
          "63"
        ],
        "correct": 0
      },
      {
        "q": "Risolvi: 2x − 4 = 10",
        "options": [
          "3",
          "6",
          "7",
          "14"
        ],
        "correct": 2
      },
      {
        "q": "Risolvi: 4x + 1 = 13",
        "options": [
          "2",
          "3",
          "4",
          "12"
        ],
        "correct": 1
      },
      {
        "q": "Risolvi: 2(x+1) = 8",
        "options": [
          "2",
          "3",
          "4",
          "8"
        ],
        "correct": 1
      },
      {
        "q": "Risolvi: 5x − 3 = 2x + 9",
        "options": [
          "2",
          "3",
          "4",
          "6"
        ],
        "correct": 2
      },
      {
        "q": "Risolvi: x − 6 = 4",
        "options": [
          "10",
          "−10",
          "2",
          "−2"
        ],
        "correct": 0
      },
      {
        "q": "Risolvi: 3x + 2 = 14",
        "options": [
          "4",
          "12",
          "16",
          "4,67"
        ],
        "correct": 0
      },
      {
        "q": "Risolvi: 5(x−1) = 20",
        "options": [
          "3",
          "4",
          "5",
          "6"
        ],
        "correct": 2
      },
      {
        "q": "Risolvi: 3x + 1 = x + 9",
        "options": [
          "2",
          "3",
          "4",
          "5"
        ],
        "correct": 2
      }
    ]
  },
  {
    "id": "geometria",
    "icon": "🗺️",
    "accent": "gold",
    "title": "Geometria Piana",
    "tagline": "L'ultima tappa: misurare lo spazio",
    "theory": [
      {
        "title": "Perimetro e area",
        "body": "Il perimetro è la lunghezza del contorno di una figura (si misura in cm, m...).\n\nL'area è la misura della superficie racchiusa dalla figura (si misura in cm², m²...)."
      },
      {
        "title": "Le figure principali",
        "body": "Quadrato (lato l): perimetro = 4·l, area = l²\n\nRettangolo (base b, altezza h): perimetro = 2·(b+h), area = b·h\n\nTriangolo (base b, altezza h): area = (b·h) : 2"
      },
      {
        "title": "Cos’è π (pi greco)?",
        "type": "microlesson",
        "concept": "pi_greco",
        "situation": "In ogni cerchio, grande o piccolo, esiste un rapporto che non cambia mai.",
        "explain": "π (pi greco) è il rapporto tra la circonferenza di un cerchio (il suo perimetro) e il suo diametro: circonferenza : diametro = π. Non è una costante inventata: è un numero che si può davvero misurare, uguale per ogni cerchio perché tutti i cerchi hanno la stessa forma, solo in scala diversa. Ha infinite cifre decimali che non si ripetono mai, quindi si usa un’approssimazione: π ≈ 3,14.",
        "example": "Se misuri un piatto rotondo e trovi che la circonferenza è circa 3,14 volte il diametro, qualunque sia la dimensione del piatto, quel rapporto è sempre π.",
        "check": {
          "q": "Cos’è π (pi greco)?",
          "options": [
            "Un numero deciso per convenzione, diverso per ogni cerchio",
            "Il rapporto tra circonferenza e diametro, uguale per ogni cerchio",
            "La metà del raggio di un cerchio",
            "Un’unità di misura per gli angoli"
          ],
          "correct": 1
        }
      },
      {
        "title": "Le formule del cerchio",
        "body": "Poiché il diametro è il doppio del raggio (d = 2·r), dalla definizione di π vista nella scheda precedente si ricavano le formule che si usano per i calcoli:\n\nCirconferenza di raggio r: C = 2·π·r\n\nArea del cerchio di raggio r: A = π·r²\n\nNella pratica si usa l’approssimazione π ≈ 3,14."
      },
      {
        "title": "Il teorema di Pitagora",
        "body": "In un triangolo rettangolo, il lato più lungo (quello opposto all'angolo retto) si chiama ipotenusa; gli altri due lati, quelli che formano l'angolo retto, si chiamano cateti.\n\nIl teorema di Pitagora dice che:\n\nipotenusa² = cateto1² + cateto2²\n\nPerché è vero? Immagina di costruire un quadrato su ciascuno dei tre lati del triangolo rettangolo, usando quel lato come lato del quadrato: un quadrato sull'ipotenusa e uno su ciascun cateto. L'area di un quadrato è (lato)², quindi l'area del quadrato costruito sull'ipotenusa è ipotenusa², e le aree degli altri due quadrati sono cateto1² e cateto2².\n\nIl teorema afferma esattamente che l'area del quadrato grande (quello costruito sull'ipotenusa) è sempre identica alla somma delle aree dei due quadrati più piccoli (quelli costruiti sui cateti) — per qualunque triangolo rettangolo, non importa quanto siano lunghi i lati. Per questo si può passare dai lati del triangolo alle loro aree al quadrato e viceversa: ipotenusa² = cateto1² + cateto2² è proprio l'uguaglianza tra quell'area grande e la somma delle due aree piccole.\n\nUtile per trovare un lato mancante quando si conoscono gli altri due: se conosci i due cateti, sommi i loro quadrati e fai la radice quadrata per trovare l'ipotenusa; se conosci l'ipotenusa e un cateto, sottrai il quadrato del cateto noto da quello dell'ipotenusa e fai la radice quadrata per trovare l'altro cateto."
      },
      {
        "title": "Esempio svolto",
        "type": "steps",
        "steps": [
          "Il problema: un triangolo rettangolo ha i cateti 6 cm e 8 cm. Troviamo l'ipotenusa e l'area.",
          "Ipotenusa (teorema di Pitagora): √(6²+8²) = √(36+64) = √100 = 10 cm",
          "Area: (6×8):2 = 24 cm²\n\nRisultato: ipotenusa 10 cm, area 24 cm²"
        ]
      },
      {
        "title": "Un altro esempio",
        "type": "steps",
        "steps": [
          "Il problema: un cerchio ha raggio 5 cm. Calcoliamo circonferenza e area (π ≈ 3,14).",
          "Circonferenza: C = 2 × π × r = 2 × 3,14 × 5 = 31,4 cm",
          "Area: A = π × r² = 3,14 × 25 = 78,5 cm²\n\nRisultato: circonferenza 31,4 cm, area 78,5 cm²"
        ]
      }
    ],
    "exercises": {
      "facile": [
        {
          "q": "Area di un quadrato con lato 15 cm",
          "answer": "225",
          "unit": "cm²",
          "hint": "Area = lato²",
          "skill": "geometria.area_figure_base",
          "cognitiveType": "recognize",
          "generatorKey": "geometria",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Area = lato²"
          ]
        },
        {
          "q": "Area di un quadrato con lato 10 cm",
          "answer": "100",
          "unit": "cm²",
          "hint": "Area = lato²",
          "skill": "geometria.area_figure_base",
          "cognitiveType": "recognize",
          "generatorKey": "geometria",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Area = lato²"
          ]
        },
        {
          "q": "Area di un rettangolo con base 8 cm e altezza 12 cm",
          "answer": "96",
          "unit": "cm²",
          "hint": "Area = base × altezza",
          "skill": "geometria.area_figure_base",
          "cognitiveType": "recognize",
          "generatorKey": "geometria",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Area = base × altezza"
          ]
        },
        {
          "q": "Area di un rettangolo con base 12 cm e altezza 3 cm",
          "answer": "36",
          "unit": "cm²",
          "hint": "Area = base × altezza",
          "skill": "geometria.area_figure_base",
          "cognitiveType": "recognize",
          "generatorKey": "geometria",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Area = base × altezza"
          ]
        },
        {
          "q": "Perimetro di un quadrato con lato 12 cm",
          "answer": "48",
          "unit": "cm",
          "hint": "Perimetro = 4 × lato",
          "skill": "geometria.perimetro_quadrato",
          "cognitiveType": "recognize",
          "generatorKey": "geometria",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Perimetro = 4 × lato"
          ]
        },
        {
          "q": "Perimetro di un quadrato con lato 15 cm",
          "answer": "60",
          "unit": "cm",
          "hint": "Perimetro = 4 × lato",
          "skill": "geometria.perimetro_quadrato",
          "cognitiveType": "recognize",
          "generatorKey": "geometria",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Perimetro = 4 × lato"
          ]
        },
        {
          "q": "Area di un quadrato con lato 9 cm",
          "answer": "81",
          "unit": "cm²",
          "hint": "Area = lato²",
          "skill": "geometria.area_figure_base",
          "cognitiveType": "recognize",
          "generatorKey": "geometria",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Area = lato²"
          ]
        },
        {
          "q": "Area di un triangolo con base 11 cm e altezza 8 cm",
          "answer": "44",
          "unit": "cm²",
          "hint": "Area = (base × altezza) : 2",
          "skill": "geometria.area_figure_base",
          "cognitiveType": "recognize",
          "generatorKey": "geometria",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Area = (base × altezza) : 2"
          ]
        },
        {
          "q": "Con 6 fiammiferi, senza spezzarli, quanti triangoli equilateri identici puoi formare se li disponi come una piccola piramide (invece che sul piano del tavolo)?",
          "answer": "4",
          "hint": "Pensa a un tetraedro: quante facce triangolari ha?",
          "logic": true,
          "skill": "geometria.problemi_vari",
          "cognitiveType": "reason",
          "generatorKey": "geometria",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Pensa a un tetraedro: quante facce triangolari ha?"
          ]
        },
        {
          "q": "Quanti quadratini 1×1 ci sono in una griglia di 3×3 caselle?",
          "answer": "9",
          "hint": "In una griglia n×n ci sono n×n quadratini piccoli.",
          "skill": "geometria.problemi_vari",
          "cognitiveType": "recognize",
          "generatorKey": "geometria",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "In una griglia n×n ci sono n×n quadratini piccoli."
          ]
        },
        {
          "q": "Un hotel ha una piscina quadrata di lato 8 m. Qual è la sua area?",
          "answer": "64",
          "unit": "m²",
          "hint": "Area del quadrato = lato².",
          "skill": "geometria.area_figure_base",
          "cognitiveType": "apply",
          "generatorKey": "geometria",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Area del quadrato = lato²."
          ]
        },
        {
          "q": "Area di un quadrato con lato 5 cm",
          "answer": "25",
          "unit": "cm²",
          "hint": "Area = lato²",
          "skill": "geometria.area_figure_base",
          "cognitiveType": "recognize",
          "generatorKey": "geometria",
          "model": {
            "level": "facile"
          },
          "hintSteps": [
            "Area = lato²"
          ]
        }
      ],
      "medio": [
        {
          "q": "Un giardino rettangolare (12 m × 8 m) ha un terrazzo triangolare aggiunto su un lato, un'aiuola quadrata al centro dove non cresce erba, e una piccola piscina circolare scavata. Per ciascuna area, decidi se va sommata o sottratta per calcolare l'area utile del giardino.",
          "format": "group",
          "skill": "geometria.aree_composte",
          "cognitiveType": "reason",
          "hint": "Chiediti: quest'area fa parte della superficie utile in più, o è una parte che manca/è stata tolta?",
          "hintSteps": [
            "Se l'elemento aggiunge superficie alla figura principale, la sua area va sommata; se toglie superficie (un buco, una parte esclusa), va sottratta.",
            "Regola: aree di parti aggiunte alla figura -> si sommano; aree di parti escluse/tolte dalla figura -> si sottraggono."
          ],
          "groupData": {
            "terms": [
              {
                "id": "t1",
                "label": "Area del giardino rettangolare (12m×8m)",
                "group": "somma"
              },
              {
                "id": "t2",
                "label": "Area del terrazzo triangolare aggiunto su un lato",
                "group": "somma"
              },
              {
                "id": "t3",
                "label": "Area dell'aiuola quadrata (dove non cresce erba)",
                "group": "sottrai"
              },
              {
                "id": "t4",
                "label": "Area della piscina circolare scavata",
                "group": "sottrai"
              }
            ],
            "buckets": [
              {
                "key": "somma",
                "label": "Si SOMMA all'area utile"
              },
              {
                "key": "sottrai",
                "label": "Si SOTTRAE dall'area utile"
              }
            ]
          }
        },
        {
          "q": "Un ragazzo deve trovare l'ipotenusa di un triangolo rettangolo con cateti 6 cm e 8 cm. Ecco il suo procedimento. Tocca il passaggio in cui compare il primo errore.",
          "format": "error-detect",
          "skill": "geometria.pitagora_ipotenusa",
          "cognitiveType": "diagnose",
          "hint": "Rileggi bene la formula: cosa si somma davvero, i cateti oppure i loro quadrati?",
          "hintSteps": [
            "Il teorema di Pitagora riguarda le AREE dei quadrati costruiti sui lati, non i lati stessi presi da soli.",
            "La regola corretta e' ipotenusa² = cateto1² + cateto2², quindi ipotenusa = √(cateto1² + cateto2²): non si sommano mai direttamente i due cateti."
          ],
          "errorData": {
            "steps": [
              {
                "text": "Scrivo la formula per trovare l'ipotenusa: ipotenusa = cateto1 + cateto2"
              },
              {
                "text": "Sostituisco i valori: ipotenusa = 6 + 8"
              },
              {
                "text": "Calcolo: ipotenusa = 14 cm"
              }
            ],
            "errorIndex": 0,
            "explanation": "Il teorema di Pitagora dice ipotenusa² = cateto1² + cateto2² (si sommano i QUADRATI dei cateti, non i cateti stessi). La formula corretta è ipotenusa = √(cateto1² + cateto2²) = √(36 + 64) = √100 = 10 cm, non la somma diretta dei due cateti (che darebbe erroneamente 14 cm)."
          }
        },
        {
          "q": "Area di un cerchio con raggio 6 cm (usa π ≈ 3,14)",
          "answer": "113.04",
          "unit": "cm²",
          "hint": "A = π × r²",
          "skill": "geometria.area_circonferenza_cerchio",
          "cognitiveType": "apply",
          "generatorKey": "geometria",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "A = π × r²"
          ]
        },
        {
          "q": "Un triangolo rettangolo ha i cateti di 8 cm e 15 cm. Quanto misura l'ipotenusa?",
          "answer": "17",
          "unit": "cm",
          "hint": "ipotenusa = √(cateto1² + cateto2²)",
          "skill": "geometria.pitagora_ipotenusa",
          "cognitiveType": "apply",
          "generatorKey": "geometria",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "ipotenusa = √(cateto1² + cateto2²)"
          ]
        },
        {
          "q": "Circonferenza di un cerchio con raggio 3 cm (usa π ≈ 3,14)",
          "answer": "18.84",
          "unit": "cm",
          "hint": "C = 2 × π × r",
          "skill": "geometria.area_circonferenza_cerchio",
          "cognitiveType": "apply",
          "generatorKey": "geometria",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "C = 2 × π × r"
          ]
        },
        {
          "q": "Un quadrato ha area 36 cm². Quanto misura il lato?",
          "answer": "6",
          "unit": "cm",
          "hint": "Il lato è la radice quadrata dell'area.",
          "skill": "geometria.lato_da_area",
          "cognitiveType": "apply",
          "generatorKey": "geometria",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Il lato è la radice quadrata dell'area."
          ]
        },
        {
          "q": "Un triangolo rettangolo ha i cateti di 12 cm e 16 cm. Quanto misura l'ipotenusa?",
          "answer": "20",
          "unit": "cm",
          "hint": "ipotenusa = √(cateto1² + cateto2²)",
          "skill": "geometria.pitagora_ipotenusa",
          "cognitiveType": "apply",
          "generatorKey": "geometria",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "ipotenusa = √(cateto1² + cateto2²)"
          ]
        },
        {
          "q": "Area di un cerchio con raggio 8 cm (usa π ≈ 3,14)",
          "answer": "200.96",
          "unit": "cm²",
          "hint": "A = π × r²",
          "skill": "geometria.area_circonferenza_cerchio",
          "cognitiveType": "apply",
          "generatorKey": "geometria",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "A = π × r²"
          ]
        },
        {
          "q": "Un quadrato ha area 64 cm². Quanto misura il lato?",
          "answer": "8",
          "unit": "cm",
          "hint": "Il lato è la radice quadrata dell'area.",
          "skill": "geometria.lato_da_area",
          "cognitiveType": "apply",
          "generatorKey": "geometria",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Il lato è la radice quadrata dell'area."
          ]
        },
        {
          "q": "Circonferenza di un cerchio con raggio 7 cm (usa π ≈ 3,14)",
          "answer": "43.96",
          "unit": "cm",
          "hint": "C = 2 × π × r",
          "skill": "geometria.area_circonferenza_cerchio",
          "cognitiveType": "apply",
          "generatorKey": "geometria",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "C = 2 × π × r"
          ]
        },
        {
          "q": "Quanti quadrati di qualsiasi dimensione (1×1, 2×2, 3×3, 4×4) si contano in una griglia di 4×4 caselle?",
          "answer": "30",
          "hint": "Somma i quadrati di ogni dimensione: 4² quadrati 1×1, 3² quadrati 2×2, 2² quadrati 3×3, 1² quadrato 4×4.",
          "logic": true,
          "skill": "geometria.problemi_vari",
          "cognitiveType": "integrate",
          "generatorKey": "geometria",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Somma i quadrati di ogni dimensione: 4² quadrati 1×1, 3² quadrati 2×2, 2² quadrati 3×3, 1² quadrato 4×4."
          ]
        },
        {
          "q": "Nel tangram, il quadrato di partenza ha area 1. I due triangoli piccoli valgono 1/16 ciascuno, il quadrato medio, il triangolo medio e il parallelogramma valgono 1/8 ciascuno, i due triangoli grandi 1/4 ciascuno. Quanto vale la somma di tutti i 7 pezzi?",
          "answer": "1",
          "hint": "Somma: 2×(1/16) + 3×(1/8) + 2×(1/4). Il risultato deve ricostruire il quadrato intero.",
          "logic": true,
          "skill": "geometria.problemi_vari",
          "cognitiveType": "integrate",
          "generatorKey": "geometria",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Somma: 2×(1/16) + 3×(1/8) + 2×(1/4). Il risultato deve ricostruire il quadrato intero."
          ]
        },
        {
          "q": "Un hotel vuole pavimentare una hall a forma di L: un rettangolo di 6m × 4m a cui viene tolto un angolo quadrato di 2m × 2m. Qual è l'area della hall?",
          "answer": "20",
          "unit": "m²",
          "hint": "Calcola l'area del rettangolo grande, poi sottrai l'area dell'angolo tolto.",
          "skill": "geometria.aree_composte",
          "cognitiveType": "integrate",
          "generatorKey": "geometria",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Calcola l'area del rettangolo grande, poi sottrai l'area dell'angolo tolto."
          ]
        },
        {
          "q": "Un triangolo rettangolo ha area 30 cm² e base 12 cm. Quanto è alto?",
          "answer": "5",
          "unit": "cm",
          "hint": "Area = (base × altezza):2, quindi altezza = (2 × area):base.",
          "skill": "geometria.lato_da_area",
          "cognitiveType": "apply",
          "generatorKey": "geometria",
          "model": {
            "level": "medio"
          },
          "hintSteps": [
            "Area = (base × altezza):2, quindi altezza = (2 × area):base."
          ]
        }
      ],
      "difficile": [
        {
          "q": "Una sala rettangolare di 12 m × 8 m ha una botola circolare di raggio 2 m che va esclusa dalla superficie calpestabile. Metti in ordine i passaggi per calcolare l'area calpestabile (usa π ≈ 3,14).",
          "format": "order",
          "skill": "geometria.aree_composte",
          "cognitiveType": "integrate",
          "hint": "Pensa a cosa devi calcolare prima: le due aree separate, o gia' la loro differenza?",
          "hintSteps": [
            "Calcola prima l'area della figura grande, poi quella della parte da escludere, e solo alla fine sottrai una dall'altra.",
            "L'ordine corretto e': area del rettangolo -> area del cerchio -> sottrazione tra le due aree -> risultato finale."
          ],
          "orderData": {
            "steps": [
              {
                "id": "rect",
                "text": "Calcolo l'area del rettangolo: 12 × 8 = 96 m²"
              },
              {
                "id": "circle",
                "text": "Calcolo l'area del cerchio: π × 2² = 3,14 × 4 = 12,56 m²"
              },
              {
                "id": "subtract",
                "text": "Sottraggo l'area del cerchio da quella del rettangolo: 96 − 12,56 = 83,44 m²"
              },
              {
                "id": "result",
                "text": "L'area calpestabile è 83,44 m²"
              }
            ],
            "correctOrder": [
              "rect",
              "circle",
              "subtract",
              "result"
            ]
          }
        },
        {
          "q": "Una piscina rettangolare di 11 m x 10 m ha un bordo largo 1 m su ogni lato. Qual è l'area totale (piscina + bordo)?",
          "answer": "156",
          "unit": "m²",
          "hint": "Il bordo aggiunge 1 m per lato: le dimensioni totali diventano (base+2) x (altezza+2).",
          "skill": "geometria.aree_composte",
          "cognitiveType": "integrate",
          "generatorKey": "geometria",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Il bordo aggiunge 1 m per lato: le dimensioni totali diventano (base+2) x (altezza+2)."
          ]
        },
        {
          "q": "Un triangolo rettangolo ha ipotenusa 13 cm e un cateto 5 cm. Quanto misura l'altro cateto?",
          "answer": "12",
          "unit": "cm",
          "hint": "cateto = √(ipotenusa² − cateto²)",
          "skill": "geometria.pitagora_cateto_mancante",
          "cognitiveType": "apply",
          "generatorKey": "geometria",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "cateto = √(ipotenusa² − cateto²)"
          ]
        },
        {
          "q": "Un triangolo rettangolo ha ipotenusa 10 cm e un cateto 6 cm. Quanto misura l'altro cateto?",
          "answer": "8",
          "unit": "cm",
          "hint": "cateto = √(ipotenusa² − cateto²)",
          "skill": "geometria.pitagora_cateto_mancante",
          "cognitiveType": "apply",
          "generatorKey": "geometria",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "cateto = √(ipotenusa² − cateto²)"
          ]
        },
        {
          "skill": "geometria.perimetro_costo",
          "cognitiveType": "integrate",
          "q": "Un giardino rettangolare misura 10 m x 14 m. Vuoi recintarlo con una rete che costa 10€ al metro. Il negozio vende anche piastrelle da giardino a 8€ al m² per pavimentarlo, ma per ora vuoi sapere solo quanto costa la rete per recintarlo. Quanto spendi per la rete?",
          "answer": "480",
          "unit": "€",
          "hint": "Ti servono solo i dati della recinzione (perimetro e costo al metro): il prezzo delle piastrelle non serve per questo calcolo. Prima calcola il perimetro, poi moltiplica per il costo al metro.",
          "generatorKey": "geometria",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Ti servono solo i dati della recinzione (perimetro e costo al metro): il prezzo delle piastrelle non serve per questo calcolo. Prima calcola il perimetro, poi moltiplica per il costo al metro."
          ]
        },
        {
          "skill": "geometria.perimetro_costo",
          "cognitiveType": "integrate",
          "q": "Un giardino rettangolare misura 16 m x 5 m. Vuoi recintarlo con una rete che costa 9€ al metro. Il negozio vende anche del prato sintetico a 15€ al m² per coprire tutto il giardino, ma per ora vuoi sapere solo quanto costa la rete per recintarlo. Quanto spendi per la rete?",
          "answer": "378",
          "unit": "€",
          "hint": "Ti servono solo i dati della recinzione (perimetro e costo al metro): il prezzo del prato sintetico non serve per questo calcolo. Prima calcola il perimetro, poi moltiplica per il costo al metro.",
          "generatorKey": "geometria",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Ti servono solo i dati della recinzione (perimetro e costo al metro): il prezzo del prato sintetico non serve per questo calcolo. Prima calcola il perimetro, poi moltiplica per il costo al metro."
          ]
        },
        {
          "q": "Un triangolo rettangolo ha ipotenusa 17 cm e un cateto 15 cm. Quanto misura l'altro cateto?",
          "answer": "8",
          "unit": "cm",
          "hint": "cateto = √(ipotenusa² − cateto²)",
          "skill": "geometria.pitagora_cateto_mancante",
          "cognitiveType": "apply",
          "generatorKey": "geometria",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "cateto = √(ipotenusa² − cateto²)"
          ]
        },
        {
          "q": "Un triangolo rettangolo ha ipotenusa 29 cm e un cateto 20 cm. Quanto misura l'altro cateto?",
          "answer": "21",
          "unit": "cm",
          "hint": "cateto = √(ipotenusa² − cateto²)",
          "skill": "geometria.pitagora_cateto_mancante",
          "cognitiveType": "apply",
          "generatorKey": "geometria",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "cateto = √(ipotenusa² − cateto²)"
          ]
        },
        {
          "skill": "geometria.aree_composte",
          "cognitiveType": "integrate",
          "q": "Una piazza rettangolare di 30 m × 20 m ha al centro una fontana circolare di raggio 4 m. Il comune vuole pavimentare tutta la piazza tranne la fontana. Quanti m² di pavimentazione servono (usa π ≈ 3,14)?",
          "answer": "549.76",
          "unit": "m²",
          "hint": "Calcola l'area del rettangolo, poi sottrai l'area del cerchio (π × raggio²).",
          "generatorKey": "geometria",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Calcola l'area del rettangolo, poi sottrai l'area del cerchio (π × raggio²)."
          ]
        },
        {
          "q": "Quanti quadrati di qualsiasi dimensione si contano in una griglia di 6×6 caselle?",
          "answer": "91",
          "hint": "Somma i quadrati di ogni dimensione da 1×1 a 6×6: 6²+5²+4²+3²+2²+1².",
          "logic": true,
          "skill": "geometria.problemi_vari",
          "cognitiveType": "integrate",
          "generatorKey": "geometria",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Somma i quadrati di ogni dimensione da 1×1 a 6×6: 6²+5²+4²+3²+2²+1²."
          ]
        },
        {
          "q": "Un hotel vuole pavimentare la hall a forma di L (rettangolo 6m×4m meno un angolo di 2m×2m, area 20 m²) con piastrelle quadrate da 40 cm di lato. Quante piastrelle servono?",
          "answer": "125",
          "hint": "L'area di una piastrella è 0,4×0,4 m². Dividi l'area totale della hall per l'area di una piastrella.",
          "skill": "geometria.aree_composte",
          "cognitiveType": "integrate",
          "generatorKey": "geometria",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "L'area di una piastrella è 0,4×0,4 m². Dividi l'area totale della hall per l'area di una piastrella."
          ]
        },
        {
          "q": "Un cerchio è inscritto in un quadrato di lato 10 cm (tocca tutti e 4 i lati). Quanto vale l'area compresa tra il quadrato e il cerchio (usa π ≈ 3,14)?",
          "answer": "21.5",
          "unit": "cm²",
          "hint": "Il diametro del cerchio è uguale al lato del quadrato, quindi il raggio è 5 cm. Calcola l'area del quadrato meno l'area del cerchio.",
          "skill": "geometria.aree_composte",
          "cognitiveType": "integrate",
          "generatorKey": "geometria",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Il diametro del cerchio è uguale al lato del quadrato, quindi il raggio è 5 cm. Calcola l'area del quadrato meno l'area del cerchio."
          ]
        },
        {
          "q": "Un triangolo rettangolo ha area 84 cm² e un cateto di 14 cm. Quanto misura l'altro cateto?",
          "answer": "12",
          "unit": "cm",
          "hint": "Area = (cateto1 × cateto2):2, quindi cateto2 = (2×area):cateto1.",
          "skill": "geometria.lato_da_area",
          "cognitiveType": "integrate",
          "generatorKey": "geometria",
          "model": {
            "level": "difficile"
          },
          "hintSteps": [
            "Area = (cateto1 × cateto2):2, quindi cateto2 = (2×area):cateto1."
          ]
        }
      ]
    },
    "quiz": [
      {
        "q": "Area di un quadrato con lato 9 cm:",
        "options": [
          "18 cm²",
          "36 cm²",
          "81 cm²",
          "90 cm²"
        ],
        "correct": 2
      },
      {
        "q": "Perimetro di un rettangolo 5x9 cm:",
        "options": [
          "14 cm",
          "28 cm",
          "45 cm",
          "49 cm"
        ],
        "correct": 1
      },
      {
        "q": "Ipotenusa di un triangolo rettangolo con cateti 6 e 8:",
        "options": [
          "10",
          "14",
          "48",
          "100"
        ],
        "correct": 0
      },
      {
        "q": "Area di un cerchio con raggio 10 cm (π≈3,14):",
        "options": [
          "31,4 cm²",
          "62,8 cm²",
          "314 cm²",
          "628 cm²"
        ],
        "correct": 2
      },
      {
        "q": "Area di un triangolo con base 10 e altezza 6:",
        "options": [
          "16",
          "30",
          "60",
          "32"
        ],
        "correct": 1
      },
      {
        "q": "Un cateto misura 9, l'ipotenusa 15. Quanto misura l'altro cateto?",
        "options": [
          "6",
          "12",
          "18",
          "24"
        ],
        "correct": 1
      },
      {
        "q": "Area di un rettangolo 7×4 cm:",
        "options": [
          "11 cm²",
          "22 cm²",
          "28 cm²",
          "56 cm²"
        ],
        "correct": 2
      },
      {
        "q": "Perimetro di un triangolo equilatero con lato 6 cm:",
        "options": [
          "12 cm",
          "18 cm",
          "24 cm",
          "36 cm"
        ],
        "correct": 1
      },
      {
        "q": "Area di un cerchio con raggio 4 cm (π≈3,14):",
        "options": [
          "12,56 cm²",
          "25,12 cm²",
          "50,24 cm²",
          "100,48 cm²"
        ],
        "correct": 2
      },
      {
        "q": "Ipotenusa di un triangolo rettangolo con cateti 9 e 12:",
        "options": [
          "15",
          "21",
          "108",
          "225"
        ],
        "correct": 0
      }
    ]
  }
];
