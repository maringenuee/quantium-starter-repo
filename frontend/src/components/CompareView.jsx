import { useEffect, useState } from 'react'
import { fetchVerb, fetchVerbs } from '../api'

export default function CompareView() {
  const [verbs, setVerbs] = useState([])
  const [persons, setPersons] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [verb, setVerb] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchVerbs()
      .then((data) => {
        setVerbs(data.verbs)
        setPersons(data.persons)
        setSelectedId(data.verbs[0]?.id ?? null)
      })
      .catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    if (!selectedId) return
    fetchVerb(selectedId)
      .then((data) => setVerb(data.verb))
      .catch((err) => setError(err.message))
  }, [selectedId])

  if (error) return <p className="error">{error}</p>
  if (!verbs.length || !verb || !persons) return <p>Loading…</p>

  return (
    <div className="compare-view">
      <label className="verb-select">
        Verb
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          {verbs.map((v) => (
            <option key={v.id} value={v.id}>
              {v.es.infinitive} / {v.fr.infinitive} — {v.english}
            </option>
          ))}
        </select>
      </label>

      <h2>
        {verb.es.infinitive} <span className="divider">/</span> {verb.fr.infinitive}
      </h2>
      <p className="english">{verb.english}</p>

      <table className="conjugation-table">
        <thead>
          <tr>
            <th>Person</th>
            <th className={verb.es.regular ? 'regular' : 'irregular'}>
              Spanish {verb.es.regular ? '(regular)' : '(irregular)'}
            </th>
            <th className={verb.fr.regular ? 'regular' : 'irregular'}>
              French {verb.fr.regular ? '(regular)' : '(irregular)'}
            </th>
          </tr>
        </thead>
        <tbody>
          {persons.es.map((esPerson, i) => (
            <tr key={i}>
              <td className="person-cell">
                <div>{esPerson}</div>
                <div className="person-fr">{persons.fr[i]}</div>
              </td>
              <td className={verb.es.regular ? 'regular' : 'irregular'}>{verb.es.present[i]}</td>
              <td className={verb.fr.regular ? 'regular' : 'irregular'}>{verb.fr.present[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="legend">
        <span className="swatch regular" /> regular pattern &nbsp;
        <span className="swatch irregular" /> irregular / diverges from pattern
      </p>
    </div>
  )
}
