export default function HeroIllustration() {
  return (
    <svg
      className="hero-illustration"
      viewBox="0 0 420 380"
      role="img"
      aria-label="Illustration of a person studying flashcards with a giant pencil"
    >
      <circle cx="210" cy="185" r="175" className="memphis-bg-blob" />
      <ellipse cx="205" cy="345" rx="95" ry="14" className="memphis-shadow" />

      {/* leaf accent */}
      <path
        d="M 60 300 Q 30 270 55 235 Q 90 250 85 290 Q 75 302 60 300 Z"
        className="memphis-leaf"
      />
      <circle cx="360" cy="90" r="10" className="memphis-dot dot-yellow" />
      <circle cx="345" cy="260" r="7" className="memphis-dot dot-coral" />
      <circle cx="70" cy="120" r="8" className="memphis-dot dot-teal" />

      {/* legs, crossed */}
      <path d="M 170 300 Q 150 340 195 345 Q 230 348 235 320" className="memphis-pants" />
      <path d="M 245 300 Q 270 335 230 348 Q 195 352 180 328" className="memphis-pants" />

      {/* resting arm */}
      <path
        d="M 178 195 Q 145 225 150 270"
        className="memphis-limb"
        style={{ stroke: '#C9B7FF' }}
      />
      <circle cx="150" cy="272" r="15" className="memphis-hand" />

      {/* torso */}
      <rect x="160" y="165" width="100" height="120" rx="46" className="memphis-torso" />

      {/* raised arm holding pencil */}
      <path
        d="M 248 195 Q 288 190 292 145"
        className="memphis-limb"
        style={{ stroke: '#C9B7FF' }}
      />
      <circle cx="293" cy="140" r="15" className="memphis-hand" />

      {/* pencil */}
      <g transform="translate(293 140) rotate(-35)">
        <rect x="-8" y="-70" width="16" height="70" rx="6" className="memphis-pencil-body" />
        <path d="M -8 -70 L 8 -70 L 0 -90 Z" className="memphis-pencil-tip" />
        <rect x="-8" y="-46" width="16" height="8" className="memphis-pencil-band" />
      </g>

      {/* floating flashcard */}
      <g transform="translate(255 55) rotate(-6)">
        <rect x="-55" y="-30" width="110" height="60" rx="14" className="memphis-card" />
        <text x="0" y="-6" textAnchor="middle" className="memphis-card-text">
          hablo
        </text>
        <text x="0" y="16" textAnchor="middle" className="memphis-card-text accent">
          parle
        </text>
      </g>

      {/* neck + head */}
      <rect x="196" y="140" width="28" height="30" className="memphis-skin" />
      <circle cx="210" cy="115" r="50" className="memphis-skin" />

      {/* hair */}
      <path
        d="M 162 110 Q 158 60 210 58 Q 262 60 258 110 Q 250 85 210 85 Q 175 85 165 108 Z"
        className="memphis-hair"
      />

      {/* face */}
      <ellipse cx="193" cy="118" rx="5" ry="7" className="memphis-eye" />
      <ellipse cx="229" cy="118" rx="5" ry="7" className="memphis-eye" />
      <path d="M 198 138 Q 210 146 222 138" className="memphis-smile" />
    </svg>
  )
}
