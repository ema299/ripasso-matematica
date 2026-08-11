# Sezione Curiosità

> Sezione separata dal percorso di matematica: scoperte scientifiche/fatti curiosi reali, ciascuno con un breve riassunto e un mini-quiz a scelta multipla. Accessibile dalla home (invito "Curiosità di oggi") e dall'elenco completo.

## Schema dati (`curiosita-data.js`)

Caricato come script classico prima di `app.js` (stesso pattern di `data.js`), espone `const CURIOSITA = [...]`. Non referenziato da `MODULES`: contenuto indipendente dal percorso didattico di matematica.

```js
{
  id,           // stringa kebab-case univoca
  date,         // ISO "YYYY-MM-DD", usata per ordinare (più recente prima)
  category,     // spazio | scienza | natura | corpo_umano | tecnologia | storia | geografia
  icon,         // singola emoji
  title,        // breve, max ~60 caratteri
  summary,      // 2-4 frasi semplici in italiano, niente gergo non spiegato
  source: { name, url },
  quiz: { q, options: [4 stringhe], correct: indice 0-based, explanation }
}
```

Il quiz deve essere risolvibile leggendo solo il `summary` (non richiede conoscenze esterne), con 3 opzioni sbagliate plausibili ma distinguibili dopo la lettura.

## Persistenza

Chiave `localStorage` dedicata `ripasso-mate-curiosita-v1`, **separata** da `ripasso-mate-progress-v1`/`ripasso-mate-history-v1`: quali quiz sono stati fatti e con che esito, indipendente dai progressi di matematica.

## Criteri di fonte ed età-appropriatezza

Applicati sia al primo lotto (ricerca manuale via agente con WebSearch) sia alla routine notturna (quando attiva):

- **Solo fonti riconosciute**: agenzie di stampa, testate di divulgazione scientifica affermate (ANSA Scienza, Focus, Le Scienze, Wired, National Geographic...), enti di ricerca/università, agenzie spaziali (ESA/NASA), Nobel Prize, NOAA e simili. Mai blog non verificabili, aggregatori anonimi, tabloid, contenuti generati da altre AI.
- **Niente contenuti spaventosi**: violenza, temi macabri, sessuali, politicamente divisivi, morte/disastri/estinzioni trattati in modo crudo. Un fatto reale che tocca questi temi va riformulato in chiave neutra/educativa o scartato.
- **Auto-verifica esplicita** prima di pubblicare ogni voce: "lo mostrerei tranquillamente a una tredicenne senza supervisione?" — in caso di dubbio, si scarta o si riformula.
- **Nessun URL inventato**: solo fonti effettivamente trovate durante la ricerca.
- **Meglio non pubblicare che abbassare gli standard**: se in una notte non si trova nulla che soddisfi i criteri, non si aggiunge nulla.

## Primo lotto (9 voci, 2026-08-09)

Prodotto da un agente con accesso a WebSearch, criteri sopra applicati esplicitamente. Note del processo (voci scartate/riformulate):
- Riformulata la voce sulla mantide sarda (Ameles serpentiscauda): omesso il riferimento al cannibalismo sessuale tipico delle mantidi presente nello studio originale, mantenuto solo l'aspetto della scoperta/comportamento "danzante".
- Riformulata la voce sugli "obelischi" (RNA scoperto nel corpo umano): omesso il dettaglio che sono stati trovati anche in campioni fecali, focus mantenuto su saliva/bocca.
- Scartata una notizia su un relitto etrusco/tomba inviolata (tema "tomba" giudicato borderline senza valore educativo aggiuntivo).
- Scartate diverse fonti aggregatori non verificabili incontrate durante la ricerca.

Fonti verificate una per una (HTTP reale) prima della pubblicazione: 8/9 raggiungibili direttamente, 1 (Focus.it) protetta da una verifica anti-bot Cloudflare che blocca sia `curl` sia Chrome headless — non un segnale di URL inventato, solo di un sito con protezione anti-scraping più aggressiva.

## Routine notturna (schedulata, cloud)

**Stato: attiva.** Collegamento GitHub completato il 2026-08-11 tramite `/web-setup`. Routine creata via `RemoteTrigger` (id `trig_019RqyfsJH9TTLAqFY5aJnft`, https://claude.ai/code/routines/trig_019RqyfsJH9TTLAqFY5aJnft), prima esecuzione prevista nella notte tra l'11 e il 12 agosto 2026.

**Comportamento** (cron `0 1 * * *` UTC, cioè le 01:00 UTC = le 03:00 ora italiana estiva):
1. Legge `curiosita-data.js` per evitare duplicati.
2. Cerca 1 (max 2) fatto/scoperta reale e recente, applicando i criteri di sicurezza sopra.
3. Se non trova nulla che li soddisfi, **non modifica nulla** (nessun commit quella notte).
4. Aggiunge la voce allo schema esistente, verifica `node --check curiosita-data.js`.
5. Incrementa `CACHE_NAME` in `sw.js` (obbligatorio: senza bump, i dispositivi con la cache vecchia non vedrebbero mai il nuovo contenuto).
6. Commit + push su `origin/main`. Nessun altro file del repository viene toccato (esplicitamente vietato nel prompt della routine).

**Nessuna revisione umana prevista** (scelta esplicita dell'utente, PIANO_SVILUPPO_V2.md non si applica a questa sezione che è fuori dal perimetro "matematica"). Il controllo di qualità è interamente affidato ai criteri sopra, applicati dall'agente stesso prima di pubblicare.
