import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useIsMobile } from './useIsMobile'

const SANS = "'Inter', system-ui, sans-serif"
const SERIF = "'Cormorant Garamond', Georgia, serif"
const PINK = '#B83A5E'
const CREAM = '#EDE8D3'
const MUTED = 'rgba(13,13,13,0.45)'
const BORDER = '2px solid #0D0D0D'

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useIsMobile()

  return (
    <section style={{ background: CREAM, borderBottom: BORDER }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: isMobile ? '32px 20px 36px' : '48px 40px 52px' }}
      >
        <span
          style={{
            fontFamily: SANS,
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: PINK,
            display: 'block',
            marginBottom: '24px',
          }}
        >
          Education
        </span>

        <div
          style={{
            display: 'flex',
            alignItems: isMobile ? 'flex-start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '20px' : '40px',
            border: '1.5px solid rgba(13,13,13,0.1)',
            borderRadius: '16px',
            padding: isMobile ? '24px 20px' : '36px 40px',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                fontWeight: 400,
                color: '#0D0D0D',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                marginBottom: '6px',
              }}
            >
              Northeastern University
            </p>
            <p
              style={{
                fontFamily: SANS,
                fontSize: '0.78rem',
                fontWeight: 400,
                color: MUTED,
                marginBottom: '4px',
              }}
            >
              Khoury College of Computer Sciences
            </p>
            <p
              style={{
                fontFamily: SANS,
                fontSize: '0.9rem',
                fontWeight: 500,
                color: '#0D0D0D',
                marginBottom: '20px',
              }}
            >
              Computer Science + Cognitive Psychology
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                'GPA 3.5',
                "Dean's List",
                'Peer Mentor',
                'Graduating May 2026',
              ].map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: SANS,
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: t === 'Graduating May 2026' ? PINK : '#0D0D0D',
                    background:
                      t === 'Graduating May 2026'
                        ? 'rgba(184,58,94,0.08)'
                        : 'rgba(13,13,13,0.05)',
                    border:
                      t === 'Graduating May 2026'
                        ? '1.5px solid rgba(184,58,94,0.25)'
                        : '1.5px solid rgba(13,13,13,0.1)',
                    padding: '5px 14px',
                    borderRadius: '3px',
                    letterSpacing: '0.01em',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div style={{ flexShrink: 0, textAlign: 'right' }}>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                fontWeight: 300,
                color: 'rgba(13,13,13,0.16)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            >
              2026
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
