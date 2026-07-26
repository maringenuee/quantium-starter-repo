import { useEffect, useState } from 'react'
import { fetchVerb, fetchVerbs } from '../api'
import { LANGUAGE_NAMES } from '../languages'

export default function CompareView({ known, target }) {
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

  const knownVerb = verb[known]
  const targetVerb = verb[target]
  const knownPersons = persons[known]
  const targetPersons = persons[target]

  return (
    <div className="card compare-view">
      <label className="verb-select">
        Verb
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          {verbs.map((v) => (
            <option key={v.id} value={v.id}>
              {v[known].infinitive} / {v[target].infinitive} — {v.english}
            </option>
          ))}
        </select>
      </label>

      <h2>
        {knownVerb.infinitive} <span className="divider">/</span> {targetVerb.infinitive}
      </h2>
      <p className="english">{verb.english}</p>

      <table className="conjugation-table">
        <thead>
          <tr>
            <th>Person</th>
            <th className={knownVerb.regular ? 'regular' : 'irregular'}>
              {LANGUAGE_NAMES[known]} {knownVerb.regular ? '(regular)' : '(irregular)'}
            </th>
            <th className={targetVerb.regular ? 'regular' : 'irregular'}>
              {LANGUAGE_NAMES[target]} {targetVerb.regular ? '(regular)' : '(irregular)'}
            </th>
          </tr>
        </thead>
        <tbody>
          {knownPersons.map((knownPerson, i) => (
            <tr key={i}>
              <td className="person-cell">
                <div>{knownPerson}</div>
                <div className="person-fr">{targetPersons[i]}</div>
              </td>
              <td className={knownVerb.regular ? 'regular' : 'irregular'}>{knownVerb.present[i]}</td>
              <td className={targetVerb.regular ? 'regular' : 'irregular'}>{targetVerb.present[i]}</td>
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
