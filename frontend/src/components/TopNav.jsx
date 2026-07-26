const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'drill', label: 'Drill', icon: '✏️' },
  { key: 'compare', label: 'Compare', icon: '📊' },
]

export default function TopNav({ view, onNavigate, languagesReady }) {
  return (
    <header className="top-nav">
      <div className="top-nav-brand">
        <span className="top-nav-logo">📚</span>
        <span className="top-nav-name">Verbario</span>
      </div>
      <nav className="top-nav-links">
        {NAV_ITEMS.map((item) => {
          const disabled = item.key !== 'home' && !languagesReady
          return (
            <button
              key={item.key}
              className={view === item.key ? 'active' : ''}
              disabled={disabled}
              title={disabled ? 'Choose your languages on the Home page first' : undefined}
              onClick={() => onNavigate(item.key)}
            >
              <span className="nav-icon" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </button>
          )
        })}
      </nav>
    </header>
  )
}
