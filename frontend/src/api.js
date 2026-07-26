async function request(path, options) {
  const res = await fetch(path, options)
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with ${res.status}`)
  }
  return res.json()
}

export function fetchVerbs() {
  return request('/api/verbs')
}

export function fetchVerb(id) {
  return request(`/api/verbs/${id}`)
}

export function fetchDrillQuestion() {
  return request('/api/drill/question')
}

export function checkDrillAnswer(payload) {
  return request('/api/drill/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}
