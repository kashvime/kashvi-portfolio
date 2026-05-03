const SANS = "'Inter', system-ui, sans-serif"
const GREEN = '#9BC940'

const items = [
  'Software Engineer',
  'Full-Stack',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'System Design',
  'Real-Time Systems',
  'Clean Architecture',
  "Northeastern '26",
]

export default function Divider() {
  const duped = [...items, ...items]
  return (
    <div
      style={{
        background: GREEN,
        overflow: 'hidden',
        padding: '14px 0',
        borderBottom: '2px solid #0D0D0D',
      }}
    >
      <div className="ticker-track">
        {duped.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: SANS,
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#0D0D0D',
              paddingRight: '48px',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
            <span style={{ marginLeft: '48px', opacity: 0.4 }}>★</span>
          </span>
        ))}
      </div>
    </div>
  )
}
