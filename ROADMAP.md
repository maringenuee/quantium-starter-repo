# Verbario roadmap

## Concept

A comparative language-learning tool for Romance languages. Spanish, French,
Italian, Portuguese, Romanian, and Catalan all descend from Latin and share
highly regular conjugation patterns, so a learner's existing language becomes
a shortcut for the next one. The user picks "the language I know" + "the
language I want to learn," and every drill/comparison shows both side by
side.

## Phase 1 — shipped (MVP)

Working for one language pair (Spanish ↔ French), built as a placeholder
architecture for the rest of the family.

- **Backend**: Flask (`backend/app.py`), a single JSON data file
  (`backend/data/verbs.json`) — no database. 20 hand-authored Spanish/French
  verb pairs, present tense only, each flagged regular/irregular per language.
  - `GET /api/verbs` — list of verbs + pronoun labels for both languages
  - `GET /api/verbs/<id>` — full conjugation for one verb
  - `GET /api/drill/question` — random verb + grammatical person (no answer
    included)
  - `POST /api/drill/check` — grades an answer for both languages
    independently, returns correct/incorrect + the right form
- **Frontend**: React 19 + Vite, plain CSS (no Tailwind, no component
  library, no animation library). Dev proxy forwards `/api` to Flask on port
  5001.
  - `App.jsx` — top-level state: current view, known/target language codes
    (persisted to localStorage)
  - `TopNav.jsx` — floating glass-blur pill navbar
  - `Header.jsx` — per-page title/subtitle + "change languages" badge
  - `HomeView.jsx` — hero, language-pair picker, family tree, quick-start
    cards
  - `RomanceTree.jsx` — hand-built SVG illustration (tapered trunk, curved
    branches, foliage-blob clusters per language), clickable nodes double as
    the language picker
  - `HeroIllustration.jsx` — flat "Corporate Memphis"-style character SVG
  - `TypingMessages.jsx` — typewriter effect cycling through example verb
    pairs
  - `DrillView.jsx` / `CompareView.jsx` — quiz mode and browse mode
  - `languages.js` — single source of truth for language metadata

**Known limitations:** only Spanish↔French has real data (others show as
"coming soon" on the tree); present tense only; no persistence beyond
localStorage; no accounts; no automated tests.

## Phase 2 — planned

Meaningfully bigger scope than Phase 1: introduces accounts, a real
database, and a paid external API dependency. Should be scoped as its own
milestone, not an incremental tweak.

### 1. Drills — expanded

- **Pronunciation playback**: a speaker icon next to each answer box. Before
  answering, hear the infinitive; after grading, hear the correct
  conjugated form in each language (withheld until then so it doesn't give
  away the answer).
- **In-drill notes access**: a "Notes" toggle opens a slide-over panel
  without leaving the current question, showing notes filtered to the verb
  in play (plus search/browse-all). A "+ Note" shortcut pre-fills the
  current verb.

### 2. Comparative Grammar Reference — new section

Distinct from the existing per-verb Compare view. Broader, book-style
reference material not tied to a single verb:

- Subject pronoun tables across all six Romance languages, not just the
  active pair.
- Regular conjugation-ending patterns by verb class (Spanish `-ar/-er/-ir`
  vs. French `-er/-ir/-re`, etc.).
- Tense-formation rules (once more tenses exist beyond present).
- Stem-change / spelling-change rule tables (e.g. Spanish `e→ie`, French
  `-ger` verbs adding an `e` before `-ons`).
- A "false friends" / faux amis table for the active pair.

Needs its own content file (e.g. `grammar_rules.json`), separate from
`verbs.json` — structured rule entries (title, languages covered, table
rows, explanatory text). Notes can attach to a specific rule entry here too,
not just to verbs.

### 3. Audio pronunciation — cross-cutting

Decision: **third-party TTS API** (e.g. ElevenLabs, Google/Azure TTS) for
near-native quality, over browser Web Speech API (free but robotic) or
pre-recorded native speaker clips (highest quality but expensive to
produce/scale).

- Backend endpoint (e.g. `GET /api/audio?lang=es&text=hablo`) proxies the
  TTS provider. API key is a server-side secret, never exposed to the
  frontend.
- **Caching is essential**: cache generated audio keyed by (language, text)
  — on disk or object storage — so the same conjugated form isn't
  re-synthesized (and re-billed) on every play. Check cache before calling
  the API.
- Frontend gets a reusable `<SpeakerButton lang text>` component used in
  Drill feedback, Compare tables, and the Grammar Reference tables.
- Ops note: first paid external dependency — needs API key management and
  visibility into cache size/API spend.

### 4. Notes — new feature, account-based

Decision: **account-based, backend database** (not local-only), so notes
sync across devices. This is the point where the app stops being anonymous.

- **Accounts**: even a lightweight scheme (magic-link email, or simple
  email+password) is real auth work that doesn't exist today.
- **A real database**: the backend currently has no database at all (just a
  static JSON file). SQLite is fine to start; Postgres if it needs to scale.
- **Data model** (rough sketch):
  - `users` (id, email, created_at)
  - `notes` (id, user_id, body, verb_id nullable, grammar_rule_id nullable,
    tags, created_at, updated_at)
- **UX**: a persistent "My Notes" area to browse/search/edit everything,
  inline "+ Note" affordances anywhere a verb or grammar rule is shown, plus
  the in-drill panel described above.
