import { LANGUAGE_NAMES } from '../languages'

const TITLES = {
  home: ['Welcome', 'Compare Romance languages, one verb at a time'],
  drill: ['Drill', 'Practice conjugations in both languages at once'],
  compare: ['Compare', 'See the full conjugation table side by side'],
}

export default function Header({ view, known, target, onNavigate }) {
  const [title, subtitle] = TITLES[view]

  return (
    <header className="app-header">
      <div>
        <h1 className="font-serif">{title}</h1>
        <p className="tagline">{subtitle}</p>
      </div>
      {known && target && (
        <button className="language-badge" onClick={() => onNavigate('home')}>
          {LANGUAGE_NAMES[known]} ↔ {LANGUAGE_NAMES[target]}
          <span className="language-badge-edit">change</span>
        </button>
      )}
    </header>
  )
}
