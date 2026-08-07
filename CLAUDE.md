# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Mandatory V2 development plan

Before starting substantial product, content, pedagogy, exercise-generation, or UX work, read **`PIANO_SVILUPPO_V2.md`** in full.

That document is the owner-approved product and didactic roadmap. Its priorities, gates, and Definition of Done are requirements, not optional suggestions.

The first requested V2 activity is **FASE 0 — Audit**: produce `docs/AUDIT_DIDATTICO.md` before any mass rewrite or expansion of `data.js`. In particular, audit prerequisites, theory accuracy, real difficulty progression, duplicated exercises, missing curriculum areas, and skills that are used before being properly explained.

If implementation choices conflict with `PIANO_SVILUPPO_V2.md`, stop and document the conflict rather than silently bypassing the plan.

## What this is

A mobile-first PWA for summer math review, built for one specific student (Alessandra, entering 1st year of an Istituto Tecnico per il Turismo). No framework, no build step, no package.json — plain HTML/CSS/JS served as static files, installable to an iPhone home screen and fully offline-capable.

## Commands

There is no build step and no test framework. Everything is driven by plain `node`/`python3`.

```bash
# Run locally
python3 -m http.server 8765   # then open http://localhost:8765

# Syntax-check after editing any JS file
node --check app.js
node --check data.js

# Regenerate app icons (writes icons/*.png)
python3 scripts/gen_icons.py
```

### Verifying content changes (no test framework — use this pattern)

There are no unit tests. Correctness of `data.js` is verified two ways; reuse both after touching content:

1. **Self-consistency check** — load `MODULES` via Node's `vm` module (it's a plain `const MODULES = [...]` script, not a CommonJS module), replicate `checkAnswer()`/`normalizeNumber()`/`normalizeExpr()` from `app.js`, and assert every exercise's stored `answer` is accepted by its own checker, and every `choice`/quiz `correct` index is in range. See `scripts/build_data.js` for the `vm.runInContext(src + '\nglobalThis.MODULES = MODULES;', sandbox)` trick needed to pull the `const` out of the sandbox.
2. **Real browser e2e** — no Puppeteer/Playwright is installed. Drive headless Chrome directly over the Chrome DevTools Protocol: spawn `google-chrome --headless=new --remote-debugging-port=N`, open a target via `PUT /json/new?<url>`, connect a raw `WebSocket` to `webSocketDebuggerUrl`, and send `Runtime.evaluate` / `Page.captureScreenshot` commands. Gotchas hit while building this: read `event.data` in the `message` listener, not the event itself; wrap multi-statement `Runtime.evaluate` snippets in an IIFE (`(() => { ... })()`) because top-level `const`/`let` persist across separate `Runtime.evaluate` calls in the same page and will throw "already declared" on reuse.

## Architecture

**No virtual DOM, no diffing.** `app.js` keeps one mutable `state` object and a single `render()` that does a `switch (state.view)` and replaces `#app.innerHTML` wholesale on every state change. Event handling is delegated once at startup (`appEl.addEventListener('click', ...)` reading `e.target.closest('[data-action]')`), so it survives the innerHTML replacement without needing to be re-bound. Keep new interactive elements on this `data-action="..."` convention rather than inline `onclick`.

**`data.js` is the single content source of truth.** It's loaded as a plain `<script>` before `app.js` (both are classic scripts sharing one global scope — `const MODULES` in `data.js` is visible in `app.js` even though it's not a `window` property). Each entry in the `MODULES` array is one "tappa" (stop) shaped like:
```js
{ id, icon, accent, title, tagline,
  theory: [ {title, body} | {title, type:'steps', steps:[...]} ],
  exercises: { facile: [...], medio: [...], difficile: [...] },  // 12 each
  quiz: [ {q, options, correct} ]  // 10
}
```
Exercise objects default to numeric-answer type; `type: 'expr'` means `answer` is an array of accepted normalized string variants (algebraic simplification); `type: 'choice'` means `options`/`correct` like quiz questions but rendered inline in the exercise flow. `logic: true` tags a logic-puzzle-style item (drives the 🧠 badge and the "argomenti da ripassare" grouping in the Diario). `unit` is purely cosmetic (shown next to the input, not part of the parsed answer). Answer matching tolerates comma decimals and `a/b` fractions with a 1% relative tolerance (see `normalizeNumber`/`checkAnswer` in `app.js`).

**Content is built, not hand-typed, for the mechanical majority.** `scripts/gen_exercises.js` generates large pools of arithmetic/algebra/geometry exercises where the answer is computed by the same code that renders the question (correct by construction), printed as JSON. `scripts/build_data.js` then loads the *existing* `data.js` (via the `vm` trick above), merges in a curated slice of the generated pool plus hand-authored logic/word-problem JSON, and re-emits a full `data.js`. `scripts/add_worked_steps.js` is a one-off in the same style (load MODULES via `vm`, mutate, re-serialize) — this is the pattern to follow for any future scripted content migration: never hand-edit the same JSON structure six times over, write a small Node transform instead.

**State persists to two independent `localStorage` keys** (bump the key suffix, e.g. `-v2`, if the shape changes, since there's no migration code): `ripasso-mate-progress-v1` (per-module completion: theory seen / per-level exercises done / quiz score) and `ripasso-mate-history-v1` (every attempt ever logged via `logAttempt()`, capped at `HISTORY_MAX`, feeding `computeStats()` for the "Diario di viaggio" screen). The student's name is the `STUDENT_NAME` constant at the top of `app.js` — it's hardcoded, not configurable via UI.

**PWA shell**: `manifest.json` + `sw.js` (cache-first with background revalidation). `sw.js`'s `CACHE_NAME` must be bumped on any change to a cached asset (`index.html`, `styles.css`, `app.js`, `data.js`, `manifest.json`, icons) or previously-installed devices keep serving stale content indefinitely. Icons are generated (not hand-drawn) by `scripts/gen_icons.py` using Pillow.

**Deployment**: GitHub Pages from the `main` branch of `ema299/ripasso-matematica`, served via the Actions-based `pages-build-deployment` workflow at `https://ema299.github.io/ripasso-matematica/`. The repo needs the empty `.nojekyll` file at the root — without it GitHub Pages runs the file set through Jekyll first and the build errors out even though nothing here is a Jekyll site.
