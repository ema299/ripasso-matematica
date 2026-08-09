'use strict';
/* ===== Curiosità =====
   Contenuto per la sezione "Curiosità", separata dal percorso di
   matematica: scoperte/fatti scientifici reali con un mini-quiz ciascuno.
   Schema per voce:
   { id, date (ISO), category, icon, title, summary, source:{name,url},
     quiz:{ q, options:[4], correct, explanation } }
   Popolato inizialmente da ricerca verificata (vedi docs/CURIOSITA.md per i
   criteri di fonte/età-appropriatezza), poi aggiornato da una routine
   schedulata che segue lo stesso schema. Caricato come script classico
   prima di app.js (stesso pattern di data.js), MODULES non lo referenzia:
   è un contenuto indipendente dal percorso didattico di matematica.
*/
const CURIOSITA = [
  {
    "id": "voyager1-giorno-luce",
    "date": "2026-08-09",
    "category": "spazio",
    "icon": "🚀",
    "title": "Voyager 1: la sonda a un giorno di luce da noi",
    "summary": "La sonda spaziale Voyager 1, lanciata nel 1977, a novembre 2026 raggiungerà una distanza record dalla Terra: un giorno luce, cioè la distanza che la luce percorre in 24 ore. Sono più di 25 miliardi di chilometri! È l'oggetto costruito dall'uomo più lontano nello spazio. Un segnale radio impiega un giorno intero solo per arrivare fino a lei.",
    "source": {
      "name": "Focus.it",
      "url": "https://www.focus.it/scienza/spazio/voyager-1-a-un-giorno-luce-dalla-terra-la-data-storica-del-record-cosmico"
    },
    "quiz": {
      "q": "Che cosa significa che Voyager 1 sarà a 'un giorno luce' dalla Terra?",
      "options": [
        "È la distanza che la luce percorre in un giorno",
        "Voyager 1 impiega un giorno a tornare sulla Terra",
        "La sonda ha un giorno di carburante rimasto",
        "È distante quanto la Luna"
      ],
      "correct": 0,
      "explanation": "Un giorno luce è la distanza percorsa dalla luce in 24 ore: oltre 25 miliardi di km."
    }
  },
  {
    "id": "webb-galassia-mom-z14",
    "date": "2026-08-09",
    "category": "spazio",
    "icon": "🔭",
    "title": "James Webb scopre una galassia antichissima",
    "summary": "Il telescopio spaziale James Webb ha individuato una galassia chiamata MoM-z14, così lontana che la vediamo come era solo 280 milioni di anni dopo il Big Bang. È una delle galassie più antiche mai osservate. È piccolissima (circa 240 anni luce) ma piena di stelle giovani che si formano velocemente, per questo appare molto luminosa e blu.",
    "source": {
      "name": "AstroSpace.it",
      "url": "https://www.astrospace.it/2025/05/23/il-james-webb-ha-scoperto-una-galassia-a-soli-280-milioni-di-anni-dal-big-bang/"
    },
    "quiz": {
      "q": "Perché la galassia MoM-z14 è considerata una scoperta speciale?",
      "options": [
        "Perché è una delle galassie più antiche mai osservate",
        "Perché è la galassia più vicina alla Terra",
        "Perché contiene solo stelle morte",
        "Perché è stata fotografata da un telescopio sulla Terra"
      ],
      "correct": 0,
      "explanation": "MoM-z14 ci mostra l'universo com'era appena 280 milioni di anni dopo il Big Bang, cioè pochissimo tempo dopo la sua nascita."
    }
  },
  {
    "id": "obelischi-rna-bocca",
    "date": "2026-08-09",
    "category": "corpo_umano",
    "icon": "🫀",
    "title": "Obelischi: minuscoli anelli scoperti nel corpo umano",
    "summary": "Alcuni scienziati hanno scoperto nel corpo umano, soprattutto nella saliva, dei piccolissimi anelli di materiale genetico chiamati 'obelischi'. Non sono batteri e non sono nemmeno virus come quelli che conosciamo: sono qualcosa di nuovo per la scienza. Sono stati trovati in circa metà dei campioni di saliva analizzati. Gli scienziati stanno ancora studiando a cosa servano.",
    "source": {
      "name": "Scientific American",
      "url": "https://www.scientificamerican.com/article/weird-obelisks-found-in-human-gut-may-be-virus-like-entity/"
    },
    "quiz": {
      "q": "Cosa sono gli 'obelischi' scoperti dagli scienziati?",
      "options": [
        "Piccoli anelli di materiale genetico mai visti prima",
        "Un nuovo tipo di batterio dei denti",
        "Un farmaco per la bocca",
        "Un minerale presente nella saliva"
      ],
      "correct": 0,
      "explanation": "Gli obelischi sono minuscoli anelli di RNA (materiale genetico) diversi da tutto ciò che si conosceva finora."
    }
  },
  {
    "id": "calamaro-colossale-filmato",
    "date": "2026-08-09",
    "category": "natura",
    "icon": "🦑",
    "title": "Il calamaro colossale filmato vivo per la prima volta",
    "summary": "Per la prima volta nella storia, un calamaro colossale è stato filmato vivo nel suo ambiente naturale, a 600 metri di profondità nell'oceano Atlantico meridionale. Prima si conoscevano solo esemplari morti. Il calamaro ripreso era ancora giovane, lungo circa 30 centimetri, ma da adulto può arrivare a 7 metri! Il video mostra il suo corpo quasi trasparente e le braccia arancioni.",
    "source": {
      "name": "LaPresse",
      "url": "https://www.lapresse.it/ambiente/animali/2025/12/27/calamaro-gigante-il-primo-filmato-al-mondo-che-ne-conferma-lesistenza/"
    },
    "quiz": {
      "q": "Perché il video del calamaro colossale è così importante?",
      "options": [
        "È la prima volta che viene filmato vivo nel suo ambiente",
        "È il primo calamaro mai fotografato al mondo",
        "Ha rivelato che il calamaro colossale vive sulla terraferma",
        "Ha mostrato che il calamaro colossale è estinto"
      ],
      "correct": 0,
      "explanation": "Fino a questo video, gli scienziati conoscevano il calamaro colossale solo attraverso esemplari morti, mai vivi nel loro habitat."
    }
  },
  {
    "id": "mantide-sardegna-coda-serpente",
    "date": "2026-08-09",
    "category": "natura",
    "icon": "🦗",
    "title": "Una mantide 'danzante' scoperta in Sardegna",
    "summary": "In un angolo remoto della Sardegna è stata scoperta una nuovissima specie di mantide, mai vista prima dagli scienziati: si chiama Ameles serpentiscauda, cioè 'mantide dalla coda di serpente'. È piccolissima e ha un comportamento speciale: muove il corpo con movimenti che ricordano una danza. Non si trovava una nuova specie di mantide in Italia da circa 40 anni!",
    "source": {
      "name": "Il Bo Live (Università di Padova)",
      "url": "https://ilbolive.unipd.it/it/news/scienza-ricerca/mantide-dalla-danza-serpente-scoperta-sardegna"
    },
    "quiz": {
      "q": "Da quanto tempo non si scopriva una nuova specie di mantide in Italia?",
      "options": [
        "Circa 40 anni",
        "Circa 4 anni",
        "Circa 400 anni",
        "Non era mai successo prima"
      ],
      "correct": 0,
      "explanation": "Il testo dice che l'ultima scoperta di una nuova specie di mantide in Italia risaliva a circa 40 anni fa."
    }
  },
  {
    "id": "relitto-romano-neuchatel",
    "date": "2026-08-09",
    "category": "storia",
    "icon": "🏛️",
    "title": "Una nave romana ritrovata in un lago svizzero",
    "summary": "Nel lago di Neuchâtel, in Svizzera, gli archeologi hanno ritrovato il carico di una nave romana affondata circa 2000 anni fa. A bordo c'erano più di mille oggetti ben conservati: piatti, anfore che contenevano olio d'oliva arrivato dalla Spagna, ruote di carri e persino spade. Questi oggetti mostrano quanto fossero estesi i commerci ai tempi dei Romani.",
    "source": {
      "name": "swissinfo.ch",
      "url": "https://www.swissinfo.ch/eng/history/roman-cargo-found-at-the-bottom-of-lake-neuch%C3%A2tel/91155472"
    },
    "quiz": {
      "q": "Cosa trasportavano le anfore trovate nella nave romana?",
      "options": [
        "Olio d'oliva arrivato dalla Spagna",
        "Monete d'oro",
        "Libri antichi",
        "Sale del Mediterraneo"
      ],
      "correct": 0,
      "explanation": "Le anfore contenevano olio d'oliva che arrivava dalla Spagna, segno di commerci a lunga distanza già in epoca romana."
    }
  },
  {
    "id": "redwing-robot-giro-mondo",
    "date": "2026-08-09",
    "category": "tecnologia",
    "icon": "🤖",
    "title": "Un robot subacqueo farà il giro del mondo da solo",
    "summary": "Si chiama Redwing ed è un robot sottomarino senza equipaggio che ha iniziato un viaggio incredibile: fare il giro del mondo sott'acqua, da solo. La missione durerà circa 5 anni e Redwing percorrerà quasi 73.000 chilometri, raccogliendo dati sull'oceano come temperatura e correnti marine. Non ha eliche: si muove cambiando il proprio peso, un po' come fanno i sottomarini.",
    "source": {
      "name": "Rutgers University",
      "url": "https://www.rutgers.edu/news/world-first-autonomous-robot-glider-circle-globe-historic-ocean-mission"
    },
    "quiz": {
      "q": "Quanto tempo impiegherà circa Redwing a completare la sua missione?",
      "options": [
        "Circa 5 anni",
        "Circa 5 mesi",
        "Circa 50 anni",
        "Circa 5 settimane"
      ],
      "correct": 0,
      "explanation": "La missione di Redwing, chiamata Sentinel Mission, è stimata durare circa 5 anni."
    }
  },
  {
    "id": "nobel-chimica-2025-mof",
    "date": "2026-08-09",
    "category": "scienza",
    "icon": "🔬",
    "title": "Il Nobel per la Chimica ai materiali 'spugna' speciali",
    "summary": "Nel 2025 il Premio Nobel per la Chimica è stato assegnato a tre scienziati che hanno inventato i MOF, materiali fatti da metalli e molecole di carbonio collegati tra loro come un'impalcatura, pieni di minuscoli buchi. Sono così porosi che una zolletta di zucchero fatta di MOF avrebbe una superficie interna grande come un campo da calcio! Questi materiali possono catturare gas e persino l'acqua presente nell'aria del deserto.",
    "source": {
      "name": "NobelPrize.org",
      "url": "https://www.nobelprize.org/prizes/chemistry/2025/press-release/"
    },
    "quiz": {
      "q": "Qual è la caratteristica speciale dei MOF descritta nel testo?",
      "options": [
        "Sono pieni di minuscoli buchi e hanno una superficie interna enorme",
        "Sono materiali completamente pieni, senza spazi vuoti",
        "Sono fatti solo di zucchero",
        "Non riescono a catturare nessun gas"
      ],
      "correct": 0,
      "explanation": "I MOF sono porosi: hanno tantissimi piccoli spazi vuoti che permettono una superficie interna enorme nonostante le dimensioni minuscole."
    }
  },
  {
    "id": "barriera-corallina-atlantico-record",
    "date": "2026-08-09",
    "category": "geografia",
    "icon": "🌍",
    "title": "Scoperta la più grande barriera corallina di acque profonde",
    "summary": "Al largo delle coste orientali degli Stati Uniti, tra la Florida e la Carolina del Sud, gli scienziati hanno mappato la più grande barriera corallina di acque profonde mai scoperta. Si estende per quasi 500 chilometri ed è più grande dello stato del Vermont! Si trova a grande profondità, dove non arriva la luce del sole, quindi i coralli si nutrono filtrando le particelle di cibo nell'acqua invece di usare la fotosintesi.",
    "source": {
      "name": "NOAA Ocean Exploration",
      "url": "https://oceanexplorer.noaa.gov/news/million-mounds-news/"
    },
    "quiz": {
      "q": "Perché i coralli di questa barriera non usano la fotosintesi per nutrirsi?",
      "options": [
        "Perché si trovano a grande profondità, dove non arriva la luce del sole",
        "Perché sono coralli finti",
        "Perché vivono fuori dall'acqua",
        "Perché sono troppo piccoli per farlo"
      ],
      "correct": 0,
      "explanation": "A quella profondità la luce del sole non arriva, quindi la fotosintesi non è possibile e i coralli si nutrono filtrando il cibo dall'acqua."
    }
  }
];
