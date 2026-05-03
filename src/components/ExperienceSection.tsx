import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EXPERIENCE } from '../data'
import { useIsMobile } from './useIsMobile'

const SANS = "'Inter', system-ui, sans-serif"
const SERIF = "'Cormorant Garamond', Georgia, serif"
const PINK = '#E05A82'
const CREAM = '#EDE8D3'
const MUTED = 'rgba(13,13,13,0.45)'
const BORDER = '2px solid #0D0D0D'

type Entry = (typeof EXPERIENCE)[number]

function ExperienceRow({
  e,
  i,
  isLast,
}: {
  e: Entry
  i: number
  isLast: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useIsMobile()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderBottom: isLast ? 'none' : BORDER }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '80px 1fr 180px',
          gap: isMobile ? '12px' : '32px',
          padding: isMobile ? '28px 20px' : '44px 40px',
          alignItems: 'start',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = 'rgba(224,90,130,0.08)')
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        {/* index */}
        <span
          style={{
            fontFamily: SERIF,
            fontSize: '1.1rem',
            fontWeight: 300,
            color: PINK,
            paddingTop: '6px',
            letterSpacing: '0.02em',
          }}
        >
          0{i + 1}
        </span>

        {/* content */}
        <div>
          <div style={{ display: 'grid', gap: '8px', marginBottom: '10px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '8px',
              }}
            >
              <h3
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                  fontWeight: 400,
                  color: '#0D0D0D',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                {e.role}
              </h3>
              {isMobile && (
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: '0.65rem',
                    color: MUTED,
                    letterSpacing: '0.04em',
                    flexShrink: 0,
                    paddingTop: '6px',
                  }}
                >
                  {e.period}
                </span>
              )}
            </div>
            <span
              style={{
                fontFamily: SANS,
                fontSize: '0.65rem',
                fontWeight: 700,
                color: PINK,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {e.org}
            </span>
          </div>
          <p
            style={{
              fontFamily: SANS,
              fontSize: '0.84rem',
              fontWeight: 300,
              color: MUTED,
              lineHeight: 1.85,
              maxWidth: '560px',
              marginBottom: '20px',
            }}
          >
            {e.desc}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {e.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: SANS,
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  background: 'rgba(224,90,130,0.12)',
                  border: '1.5px solid rgba(224,90,130,0.5)',
                  color: PINK,
                  padding: '3px 12px',
                  borderRadius: '3px',
                  letterSpacing: '0.02em',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* period */}
        {!isMobile && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              paddingTop: '6px',
            }}
          >
            <span
              style={{
                fontFamily: SANS,
                fontSize: '0.68rem',
                color: MUTED,
                letterSpacing: '0.04em',
                textAlign: 'right',
              }}
            >
              {e.period}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function ExperienceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const isMobile = useIsMobile()

  return (
    <section
      id="experience"
      style={{ background: CREAM, borderTop: BORDER, borderBottom: BORDER }}
    >
      {/* editorial header */}
      <div
        ref={ref}
        style={{
          padding: isMobile ? '40px 20px 0' : '64px 40px 0',
          borderBottom: BORDER,
        }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          style={{
            fontFamily: SANS,
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: PINK,
            display: 'block',
            marginBottom: '28px',
          }}
        >
          Experience
        </motion.span>

        <div style={{ overflow: 'hidden', paddingBottom: '52px' }}>
          {['EXPERIENCE'].map((word, i) => (
            <div key={word} style={{ overflow: 'hidden', lineHeight: 0.88 }}>
              <motion.h2
                initial={{ y: '108%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{
                  duration: 1,
                  delay: 0.1 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(5rem, 14vw, 14rem)',
                  fontWeight: 300,
                  color: '#0D0D0D',
                  letterSpacing: '-0.04em',
                  fontStyle: 'italic',
                  display: 'block',
                }}
              >
                {word}
              </motion.h2>
            </div>
          ))}
        </div>
      </div>

      {/* experience rows */}
      {EXPERIENCE.map((e, i) => (
        <ExperienceRow
          key={e.org}
          e={e}
          i={i}
          isLast={i === EXPERIENCE.length - 1}
        />
      ))}

      <div style={{ height: '24px' }} />
    </section>
  )
}
