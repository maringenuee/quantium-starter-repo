import { useEffect, useState } from 'react'
import TopNav from './components/TopNav'
import Header from './components/Header'
import HomeView from './components/HomeView'
import DrillView from './components/DrillView'
import CompareView from './components/CompareView'
import { isPairSupported } from './languages'
import './App.css'

function loadStored(key) {
  try {
    return localStorage.getItem(key) || null
  } catch {
    return null
  }
}

export default function App() {
  const [view, setView] = useState('home')
  const [known, setKnown] = useState(() => loadStored('verbario-known'))
  const [target, setTarget] = useState(() => loadStored('verbario-target'))

  const languagesReady = isPairSupported(known, target)

  useEffect(() => {
    try {
      known ? localStorage.setItem('verbario-known', known) : localStorage.removeItem('verbario-known')
      target ? localStorage.setItem('verbario-target', target) : localStorage.removeItem('verbario-target')
    } catch {
      // localStorage unavailable — selection just won't persist across reloads
    }
  }, [known, target])

  function handleTreeSelect(code) {
    if (known === code) {
      setKnown(null)
    } else if (target === code) {
      setTarget(null)
    } else if (!known) {
      setKnown(code)
    } else {
      setTarget(code)
    }
  }

  function handleNavigate(nextView) {
    if (nextView !== 'home' && !languagesReady) return
    setView(nextView)
  }

  return (
    <div className="app-shell">
      <TopNav view={view} onNavigate={handleNavigate} languagesReady={languagesReady} />
      <Header view={view} known={known} target={target} onNavigate={handleNavigate} />
      <main className="content-grid">
        {view === 'home' && (
          <HomeView
            known={known}
            target={target}
            onKnownChange={setKnown}
            onTargetChange={setTarget}
            onTreeSelect={handleTreeSelect}
            onNavigate={handleNavigate}
          />
        )}
        {view === 'drill' && languagesReady && <DrillView known={known} target={target} />}
        {view === 'compare' && languagesReady && <CompareView known={known} target={target} />}
      </main>
    </div>
  )
}
