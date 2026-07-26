import { LANGUAGES } from '../languages'

const WIDTH = 600
const HEIGHT = 240
const ROOT = { x: WIDTH / 2, y: 36 }
const CHILD_Y = 160
const CHILD_SPACING = WIDTH / (LANGUAGES.length + 1)

export default function RomanceTree({ known, target, onSelect }) {
  return (
    <svg
      className="romance-tree"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="Family tree of Romance languages descending from Latin"
    >
      {LANGUAGES.map((lang, i) => {
        const x = CHILD_SPACING * (i + 1)
        return (
          <line
            key={`line-${lang.code}`}
            x1={ROOT.x}
            y1={ROOT.y + 14}
            x2={x}
            y2={CHILD_Y - 24}
            className="tree-branch"
          />
        )
      })}

      <g className="tree-node tree-node-root">
        <circle cx={ROOT.x} cy={ROOT.y} r={22} />
        <text x={ROOT.x} y={ROOT.y + 5} textAnchor="middle">
          Latin
        </text>
      </g>

      {LANGUAGES.map((lang, i) => {
        const x = CHILD_SPACING * (i + 1)
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
            transform={`translate(${x}, ${CHILD_Y})`}
            onClick={() => lang.available && onSelect(lang.code)}
            tabIndex={lang.available ? 0 : -1}
            role="button"
            aria-disabled={!lang.available}
            onKeyDown={(e) => {
              if (lang.available && (e.key === 'Enter' || e.key === ' ')) onSelect(lang.code)
            }}
          >
            <title>{lang.available ? lang.name : `${lang.name} (coming soon)`}</title>
            {isTarget && <circle className="node-glow" r={26} style={{ fill: lang.color }} />}
            <circle r={22} style={{ fill: lang.color }} />
            {isKnown && <circle className="node-ring" r={26} />}
            <text y={5} textAnchor="middle">
              {lang.flag ?? lang.name.slice(0, 2).toUpperCase()}
            </text>
            <text y={40} textAnchor="middle" className="tree-node-label">
              {lang.name}
            </text>
            {(isKnown || isTarget) && (
              <text y={54} textAnchor="middle" className="tree-node-tag">
                {isKnown ? 'known' : 'learning'}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
