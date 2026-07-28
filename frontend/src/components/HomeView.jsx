import { LANGUAGES, LANGUAGE_NAMES, LANGUAGE_BY_CODE, isPairSupported } from '../languages'
import RomanceTree from './RomanceTree'
import HeroIllustration from './HeroIllustration'
import TypingMessages from './TypingMessages'

const TYPING_EXAMPLES = ['hablo → parle', 'tengo → j’ai', 'quiero → je veux', 'puedo → peux', 'vivo → vis']

function LanguageSelect({ label, value, onChange }) {
  const selected = value ? LANGUAGE_BY_CODE[value] : null
  return (
    <label className="lang-select">
      {label}
      <div className="lang-select-control">
        <span className="lang-select-flag">{selected ? selected.flag ?? '🏳️' : '🌐'}</span>
        <select value={value ?? ''} onChange={(e) => onChange(e.target.value || null)}>
          <option value="">Select a language…</option>
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code} disabled={!l.available}>
              {l.name}
              {!l.available ? ' (coming soon)' : ''}
            </option>
          ))}
        </select>
      </div>
    </label>
  )
}

export default function HomeView({ known, target, onKnownChange, onTargetChange, onTreeSelect, onNavigate }) {
  const supported = isPairSupported(known, target)
  const incomplete = !known || !target

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-text">
          <h1 className="hero-title">Verbario</h1>
          <p className="hero-subtitle">
            Learn a new Romance language through the one you already speak — compare verbs
            side by side instead of memorizing them twice.
          </p>
        </div>
        <HeroIllustration />
      </section>

      <div className="home-grid">
        <section className="card panel-card span-2">
          <h2>What language do you know, and what do you want to learn?</h2>
          <p className="english">
            Pick your known Romance language and the one you want to learn — drills will
            compare them side by side so you can lean on what you already know.
          </p>

          <div className="language-pickers">
            <LanguageSelect label="I already know" value={known} onChange={onKnownChange} />
            <LanguageSelect label="I want to learn" value={target} onChange={onTargetChange} />
          </div>

          {!incomplete && !supported && (
            <p className="hint hint-warning">
              {LANGUAGE_NAMES[known]} ↔ {LANGUAGE_NAMES[target]} isn't ready yet. Spanish ↔
              French is available now — more Romance languages are coming soon.
            </p>
          )}
          {incomplete && (
            <p className="hint">Choose both languages above, or click two languages on the tree below.</p>
          )}
        </section>

        <section className="card panel-card span-2">
          <div className="tree-card-header">
            <h2>The Romance language family</h2>
            <span className="tree-typing-chip">
              <TypingMessages messages={TYPING_EXAMPLES} />
            </span>
          </div>
          <RomanceTree known={known} target={target} onSelect={onTreeSelect} />
        </section>

        {supported && (
          <>
            <section className="card nav-card" onClick={() => onNavigate('drill')}>
              <span className="card-icon" style={{ background: LANGUAGE_BY_CODE[target].color }}>
                ✏️
              </span>
              <h2>Start a drill</h2>
              <p className="english">
                Practice conjugating {LANGUAGE_NAMES[known]} and {LANGUAGE_NAMES[target]} verbs
                side by side.
              </p>
            </section>
            <section className="card nav-card" onClick={() => onNavigate('compare')}>
              <span className="card-icon" style={{ background: LANGUAGE_BY_CODE[known].color }}>
                📊
              </span>
              <h2>Compare verbs</h2>
              <p className="english">
                Browse the full conjugation tables and see where the two languages diverge.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
