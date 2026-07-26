import { LANGUAGES, LANGUAGE_NAMES, isPairSupported } from '../languages'
import RomanceTree from './RomanceTree'

export default function HomeView({ known, target, onKnownChange, onTargetChange, onTreeSelect, onNavigate }) {
  const supported = isPairSupported(known, target)
  const incomplete = !known || !target

  return (
    <div className="home-grid">
      <section className="card span-2">
        <h2>What language do you know, and what do you want to learn?</h2>
        <p className="english">
          Pick your known Romance language and the one you want to learn — drills will compare
          them side by side so you can lean on what you already know.
        </p>

        <div className="language-pickers">
          <label>
            I already know
            <select value={known ?? ''} onChange={(e) => onKnownChange(e.target.value || null)}>
              <option value="">Select a language…</option>
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} disabled={!l.available}>
                  {l.name}
                  {!l.available ? ' (coming soon)' : ''}
                </option>
              ))}
            </select>
          </label>

          <label>
            I want to learn
            <select value={target ?? ''} onChange={(e) => onTargetChange(e.target.value || null)}>
              <option value="">Select a language…</option>
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} disabled={!l.available}>
                  {l.name}
                  {!l.available ? ' (coming soon)' : ''}
                </option>
              ))}
            </select>
          </label>
        </div>

        {!incomplete && !supported && (
          <p className="hint hint-warning">
            {LANGUAGE_NAMES[known]} ↔ {LANGUAGE_NAMES[target]} isn't ready yet. Spanish ↔ French is
            available now — more Romance languages are coming soon.
          </p>
        )}
        {incomplete && <p className="hint">Choose both languages above, or click two languages on the tree below.</p>}
      </section>

      <section className="card span-2">
        <h2>The Romance language family</h2>
        <RomanceTree known={known} target={target} onSelect={onTreeSelect} />
      </section>

      {supported && (
        <>
          <section className="card nav-card" onClick={() => onNavigate('drill')}>
            <h2>Start a drill</h2>
            <p className="english">
              Practice conjugating {LANGUAGE_NAMES[known]} and {LANGUAGE_NAMES[target]} verbs
              side by side.
            </p>
          </section>
          <section className="card nav-card" onClick={() => onNavigate('compare')}>
            <h2>Compare verbs</h2>
            <p className="english">
              Browse the full conjugation tables and see where the two languages diverge.
            </p>
          </section>
        </>
      )}
    </div>
  )
}
