const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'drill', label: 'Drill', icon: '✏️' },
  { key: 'compare', label: 'Compare', icon: '📊' },
]

export default function Sidebar({ view, onNavigate, languagesReady }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-logo">📚</span>
        <span className="sidebar-name">Verbario</span>
      </div>
      <nav className="sidebar-nav">
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
    </aside>
  )
}
