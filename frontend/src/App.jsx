import { useState } from 'react'
import CompareView from './components/CompareView'
import DrillView from './components/DrillView'
import './App.css'

export default function App() {
  const [view, setView] = useState('drill')

  return (
    <div className="app">
      <header>
        <h1>Verbario</h1>
        <p className="tagline">Compare Spanish &amp; French verb conjugations side by side</p>
        <nav>
          <button className={view === 'drill' ? 'active' : ''} onClick={() => setView('drill')}>
            Drill
          </button>
          <button className={view === 'compare' ? 'active' : ''} onClick={() => setView('compare')}>
            Compare
          </button>
        </nav>
      </header>
      <main>{view === 'drill' ? <DrillView /> : <CompareView />}</main>
    </div>
  )
}
