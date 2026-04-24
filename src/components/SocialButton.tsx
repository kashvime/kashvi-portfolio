import { motion, useAnimation } from 'framer-motion'

const SANS  = "'Inter', system-ui, sans-serif"
const GREEN = '#9BC940'

const GITHUB_PATH = "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0 1 12 6.6c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.3 24 12 24 5.37 18.627 0 12 0z"

const LINKEDIN_PATH = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"

const ICONS: Record<string, string> = {
  github: GITHUB_PATH,
  linkedin: LINKEDIN_PATH,
}

interface SocialButtonProps {
  href: string
  type: 'github' | 'linkedin'
  label: string
  dark?: boolean
}

export default function SocialButton({ href, type, label, dark = false }: SocialButtonProps) {
  const controls = useAnimation()

  const handleEnter = async () => {
    await controls.start({ pathLength: 0, transition: { duration: 0 } })
    controls.start({ pathLength: 1, transition: { duration: 0.6, ease: 'easeInOut' } })
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      onHoverStart={handleEnter}
      whileHover={{ y: -3, boxShadow: '0 6px 20px rgba(155,201,64,0.55)' }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: SANS,
        fontSize: '0.68rem',
        fontWeight: 700,
        color: '#0D0D0D',
        background: GREEN,
        padding: '8px 18px 8px 12px',
        borderRadius: '20px',
        letterSpacing: '0.04em',
        boxShadow: '0 2px 10px rgba(155,201,64,0.35)',
        textDecoration: 'none',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        {/* filled base — always visible, slightly faded */}
        <path d={ICONS[type]} fill="rgba(13,13,13,0.25)" />
        {/* animated stroke draw on hover */}
        <motion.path
          d={ICONS[type]}
          fill="none"
          stroke="#0D0D0D"
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 1 }}
          animate={controls}
        />
      </svg>
      {label}
    </motion.a>
  )
}
