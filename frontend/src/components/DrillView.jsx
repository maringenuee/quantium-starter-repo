import { useEffect, useState } from 'react'
import { checkDrillAnswer, fetchDrillQuestion } from '../api'
import { LANGUAGE_NAMES } from '../languages'

export default function DrillView({ known, target }) {
  const [question, setQuestion] = useState(null)
  const [answers, setAnswers] = useState({ es: '', fr: '' })
  const [result, setResult] = useState(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [error, setError] = useState(null)

  function loadQuestion() {
    setResult(null)
    setAnswers({ es: '', fr: '' })
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
      es_answer: answers.es,
      fr_answer: answers.fr,
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

  const languages = [known, target]

  return (
    <div className="card drill-view">
      <p className="score">
        Score: {score.correct} / {score.total}
      </p>

      <h2>
        {question.es_infinitive} <span className="divider">/</span> {question.fr_infinitive}
      </h2>
      <p className="english">{question.english}</p>

      <form onSubmit={handleSubmit}>
        {languages.map((lang) => (
          <div className="drill-row" key={lang}>
            <label>
              {LANGUAGE_NAMES[lang]} — {question[`${lang}_person`]}
              <input
                type="text"
                value={answers[lang]}
                onChange={(e) => setAnswers((a) => ({ ...a, [lang]: e.target.value }))}
                disabled={!!result}
                autoFocus={lang === known}
              />
            </label>
            {result && (
              <span className={result[lang].correct ? 'feedback correct' : 'feedback incorrect'}>
                {result[lang].correct ? '✓' : `✗ ${result[lang].correct_answer}`}
              </span>
            )}
          </div>
        ))}

        <button type="submit">{result ? 'Next verb' : 'Check answers'}</button>
      </form>
    </div>
  )
}
