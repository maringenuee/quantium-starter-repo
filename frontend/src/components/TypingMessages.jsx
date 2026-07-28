import { useEffect, useState } from 'react'

const TYPING_SPEED = 100
const DELETING_SPEED = 50
const PAUSE_TIME = 2000

export default function TypingMessages({ messages }) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = messages[messageIndex % messages.length]

    if (!isDeleting && text === current) {
      const pause = setTimeout(() => setIsDeleting(true), PAUSE_TIME)
      return () => clearTimeout(pause)
    }

    if (isDeleting && text === '') {
      setIsDeleting(false)
      setMessageIndex((i) => (i + 1) % messages.length)
      return
    }

    const timeout = setTimeout(
      () => {
        setText((t) => (isDeleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)))
      },
      isDeleting ? DELETING_SPEED : TYPING_SPEED,
    )
    return () => clearTimeout(timeout)
  }, [text, isDeleting, messageIndex, messages])

  return (
    <span className="typing-messages">
      {text}
      <span className="typing-cursor" aria-hidden="true" />
    </span>
  )
}
