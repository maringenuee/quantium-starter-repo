export const LANGUAGES = [
  { code: 'es', name: 'Spanish', available: true },
  { code: 'fr', name: 'French', available: true },
  { code: 'it', name: 'Italian', available: false },
  { code: 'pt', name: 'Portuguese', available: false },
  { code: 'ro', name: 'Romanian', available: false },
  { code: 'ca', name: 'Catalan', available: false },
]

export const LANGUAGE_NAMES = Object.fromEntries(LANGUAGES.map((l) => [l.code, l.name]))

export function isPairSupported(known, target) {
  if (!known || !target || known === target) return false
  return [known, target].every((code) => LANGUAGE_NAMES[code] !== undefined) &&
    new Set([known, target]).size === 2 &&
    ['es', 'fr'].includes(known) &&
    ['es', 'fr'].includes(target)
}
