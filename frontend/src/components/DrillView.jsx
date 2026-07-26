import { useEffect, useState } from 'react'
import { checkDrillAnswer, fetchDrillQuestion } from '../api'

export default function DrillView() {
  const [question, setQuestion] = useState(null)
  const [esAnswer, setEsAnswer] = useState('')
  const [frAnswer, setFrAnswer] = useState('')
  const [result, setResult] = useState(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [error, setError] = useState(null)

  function loadQuestion() {
    setResult(null)
    setEsAnswer('')
    setFrAnswer('')
    fetchDrillQuestion()
      .then(setQuestion)
      .catch((err) => setError(err.message))
  }

  useEffect(loadQuestion, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (result) {
      loadQuestion()
      return
    }
    checkDrillAnswer({
      verb_id: question.verb_id,
      person_index: question.person_index,
      es_answer: esAnswer,
      fr_answer: frAnswer,
    })
      .then((data) => {
        setResult(data)
        setScore((s) => ({
          correct: s.correct + (data.es.correct ? 1 : 0) + (data.fr.correct ? 1 : 0),
          total: s.total + 2,
        }))
      })
      .catch((err) => setError(err.message))
  }

  if (error) return <p className="error">{error}</p>
  if (!question) return <p>Loading…</p>

  return (
    <div className="drill-view">
      <p className="score">
        Score: {score.correct} / {score.total}
      </p>

      <h2>
        {question.es_infinitive} <span className="divider">/</span> {question.fr_infinitive}
      </h2>
      <p className="english">{question.english}</p>

      <form onSubmit={handleSubmit}>
        <div className="drill-row">
          <label>
            Spanish — {question.es_person}
            <input
              type="text"
              value={esAnswer}
              onChange={(e) => setEsAnswer(e.target.value)}
              disabled={!!result}
              autoFocus
            />
          </label>
          {result && (
            <span className={result.es.correct ? 'feedback correct' : 'feedback incorrect'}>
              {result.es.correct ? '✓' : `✗ ${result.es.correct_answer}`}
            </span>
          )}
        </div>

        <div className="drill-row">
          <label>
            French — {question.fr_person}
            <input
              type="text"
              value={frAnswer}
              onChange={(e) => setFrAnswer(e.target.value)}
              disabled={!!result}
            />
          </label>
          {result && (
            <span className={result.fr.correct ? 'feedback correct' : 'feedback incorrect'}>
              {result.fr.correct ? '✓' : `✗ ${result.fr.correct_answer}`}
            </span>
          )}
        </div>

        <button type="submit">{result ? 'Next verb' : 'Check answers'}</button>
      </form>
    </div>
  )
}
