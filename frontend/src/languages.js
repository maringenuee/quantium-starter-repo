export const LANGUAGES = [
  { code: 'es', name: 'Spanish', available: true, flag: '🇪🇸', color: '#E8604F' },
  { code: 'fr', name: 'French', available: true, flag: '🇫🇷', color: '#4C7EF3' },
  { code: 'it', name: 'Italian', available: false, flag: '🇮🇹', color: '#3FA96B' },
  { code: 'pt', name: 'Portuguese', available: false, flag: '🇵🇹', color: '#1FADA0' },
  { code: 'ro', name: 'Romanian', available: false, flag: '🇷🇴', color: '#E0AC3F' },
  { code: 'ca', name: 'Catalan', available: false, flag: null, color: '#B26FE0' },
]

export const LANGUAGE_NAMES = Object.fromEntries(LANGUAGES.map((l) => [l.code, l.name]))
export const LANGUAGE_BY_CODE = Object.fromEntries(LANGUAGES.map((l) => [l.code, l]))

export function isPairSupported(known, target) {
  if (!known || !target || known === target) return false
  return [known, target].every((code) => LANGUAGE_NAMES[code] !== undefined) &&
    new Set([known, target]).size === 2 &&
    ['es', 'fr'].includes(known) &&
    ['es', 'fr'].includes(target)
}
