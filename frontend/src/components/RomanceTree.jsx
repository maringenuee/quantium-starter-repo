import { LANGUAGES } from '../languages'

const WIDTH = 760
const HEIGHT = 420
const TRUNK_BASE = { x: WIDTH / 2, y: 400 }
const BRANCH_POINT = { x: WIDTH / 2, y: 280 }
const LEAF_MARGIN_X = 70
const LEAF_BASE_Y = 175
const LEAF_DOME_HEIGHT = 115

const LEAF_POSITIONS = LANGUAGES.map((_, i) => {
  const t = LANGUAGES.length === 1 ? 0.5 : i / (LANGUAGES.length - 1)
  return {
    x: LEAF_MARGIN_X + t * (WIDTH - 2 * LEAF_MARGIN_X),
    y: LEAF_BASE_Y - LEAF_DOME_HEIGHT * Math.sin(Math.PI * t),
  }
})

const TRUNK_PATH = `
  M ${TRUNK_BASE.x - 26} ${TRUNK_BASE.y}
  Q ${TRUNK_BASE.x - 34} ${(TRUNK_BASE.y + BRANCH_POINT.y) / 2} ${BRANCH_POINT.x - 7} ${BRANCH_POINT.y}
  L ${BRANCH_POINT.x + 7} ${BRANCH_POINT.y}
  Q ${TRUNK_BASE.x + 34} ${(TRUNK_BASE.y + BRANCH_POINT.y) / 2} ${TRUNK_BASE.x + 26} ${TRUNK_BASE.y}
  Z
`

const ROOT_PATHS = [
  `M ${TRUNK_BASE.x - 8} ${TRUNK_BASE.y} Q ${TRUNK_BASE.x - 55} ${TRUNK_BASE.y + 8} ${TRUNK_BASE.x - 85} ${TRUNK_BASE.y + 18}`,
  `M ${TRUNK_BASE.x} ${TRUNK_BASE.y} L ${TRUNK_BASE.x} ${TRUNK_BASE.y + 20}`,
  `M ${TRUNK_BASE.x + 8} ${TRUNK_BASE.y} Q ${TRUNK_BASE.x + 55} ${TRUNK_BASE.y + 8} ${TRUNK_BASE.x + 85} ${TRUNK_BASE.y + 18}`,
]

export default function RomanceTree({ known, target, onSelect }) {
  return (
    <svg
      className="romance-tree"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="Family tree of Romance languages descending from Latin"
    >
      <defs>
        <radialGradient id="tree-parchment" cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#f8f2e2" />
          <stop offset="100%" stopColor="#e7dcc0" />
        </radialGradient>
        <filter id="tree-blob-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <rect className="tree-bg" width={WIDTH} height={HEIGHT} rx={24} />

      {ROOT_PATHS.map((d, i) => (
        <path key={i} d={d} className="tree-root" />
      ))}

      {LEAF_POSITIONS.map((pos, i) => {
        const mid = { x: (BRANCH_POINT.x + pos.x) / 2, y: (BRANCH_POINT.y + pos.y) / 2 - 22 }
        return (
          <path
            key={`branch-${LANGUAGES[i].code}`}
            d={`M ${BRANCH_POINT.x} ${BRANCH_POINT.y} Q ${mid.x} ${mid.y} ${pos.x} ${pos.y}`}
            className="tree-branch"
          />
        )
      })}

      <path d={TRUNK_PATH} className="tree-trunk" />

      <g className="tree-node tree-node-root" transform={`translate(${BRANCH_POINT.x}, ${BRANCH_POINT.y})`}>
        <circle r={24} />
        <text y={5} textAnchor="middle">
          Latin
        </text>
      </g>

      {LANGUAGES.map((lang, i) => {
        const pos = LEAF_POSITIONS[i]
        const isKnown = known === lang.code
        const isTarget = target === lang.code
        const classes = [
          'tree-node',
          lang.available ? 'available' : 'unavailable',
          isKnown ? 'selected-known' : '',
          isTarget ? 'selected-target' : '',
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <g
            key={lang.code}
            className={classes}
            data-lang={lang.code}
            transform={`translate(${pos.x}, ${pos.y})`}
            onClick={() => lang.available && onSelect(lang.code)}
            tabIndex={lang.available ? 0 : -1}
            role="button"
            aria-disabled={!lang.available}
            onKeyDown={(e) => {
              if (lang.available && (e.key === 'Enter' || e.key === ' ')) onSelect(lang.code)
            }}
          >
            <title>{lang.available ? lang.name : `${lang.name} (coming soon)`}</title>

            <g className="foliage" filter="url(#tree-blob-blur)">
              <circle cx={-16} cy={-8} r={26} style={{ fill: lang.color }} />
              <circle cx={16} cy={-12} r={22} style={{ fill: lang.color }} />
              <circle cx={2} cy={14} r={25} style={{ fill: lang.color }} />
            </g>

            {isTarget && <circle className="node-glow" r={30} style={{ fill: lang.color }} />}
            <circle className="node-core" r={22} style={{ fill: lang.color }} />
            {isKnown && <circle className="node-ring" r={27} />}

            <text y={5} textAnchor="middle" className="node-glyph">
              {lang.flag ?? lang.name.slice(0, 2).toUpperCase()}
            </text>
            <text y={50} textAnchor="middle" className="tree-node-label">
              {lang.name}
            </text>
            {(isKnown || isTarget) && (
              <text y={64} textAnchor="middle" className="tree-node-tag">
                {isKnown ? 'known' : 'learning'}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
