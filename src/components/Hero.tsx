import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from './useIsMobile'

const PINK = '#B83A5E'
const CREAM = '#EDE8D3'
const SERIF = "'Cormorant Garamond', Georgia, serif"
const SANS = "'Inter', system-ui, sans-serif"

const LABELS = ["Computer Science @ Northeastern '26", 'Software Engineer']

const GITHUB_PATH =
  'M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0 1 12 6.6c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.3 24 12 24 5.37 18.627 0 12 0z'
const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

export default function Hero() {
  const [idx, setIdx] = useState(0)
  const isMobile = useIsMobile()
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % LABELS.length), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      style={{
        background: PINK,
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '3px solid #0D0D0D',
      }}
    >
      {/* nav */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: isMobile ? '16px 20px' : '20px 40px',
          borderBottom: '1px solid rgba(237,232,211,0.15)',
        }}
      >
        <div />

        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            display: 'flex',
            gap: isMobile ? '16px' : '32px',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
          }}
        >
          {[
            ['Projects', '#projects'],
            ['Experience', '#experience'],
            ['Skills', '#skills'],
            ['Contact', '#contact'],
          ].map(([l, h]) => (
            <a
              key={l}
              href={h}
              style={{
                fontFamily: SANS,
                fontSize: '0.7rem',
                fontWeight: 500,
                color: 'rgba(237,232,211,0.55)',
                letterSpacing: '0.04em',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = CREAM)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'rgba(237,232,211,0.55)')
              }
            >
              {l}
            </a>
          ))}
        </motion.nav>
      </div>

      {/* main */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: isMobile ? '24px 20px 0' : '36px 40px 0',
        }}
      >
        {/* animated labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <div style={{ height: '16px', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={idx}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: SANS,
                  fontSize: '0.76rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: 'rgba(237,232,211,0.5)',
                  display: 'block',
                }}
              >
                {LABELS[idx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* name — vertically centered in remaining space */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {[
            { text: 'KASHVI', italic: false },
            { text: 'Mehta', italic: true },
          ].map(({ text, italic }, i) => (
            <div key={text} style={{ overflow: 'hidden', lineHeight: 0.84 }}>
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 1.1,
                  delay: 0.1 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(7rem, 20.5vw, 22rem)',
                  fontWeight: 300,
                  color: CREAM,
                  letterSpacing: '-0.04em',
                  fontStyle: italic ? 'italic' : 'normal',
                  display: 'block',
                }}
              >
                {text}
              </motion.h1>
            </div>
          ))}
        </div>
      </div>

      {/* bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: isMobile ? '16px 20px' : '20px 40px',
          flexWrap: 'wrap',
        }}
      >
        {[
          { l: 'GitHub', h: 'https://github.com/kashvime', icon: GITHUB_PATH },
          {
            l: 'LinkedIn',
            h: 'https://linkedin.com/in/kashvi-mehta',
            icon: LINKEDIN_PATH,
          },
        ].map(({ l, h, icon }) => (
          <a
            key={l}
            href={h}
            target="_blank"
            rel="noreferrer"
            aria-label={l}
            title={l}
            style={{
              fontFamily: SANS,
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.02em',
              color: CREAM,
              background: 'rgba(245,243,238,0.08)',
              border: '1px solid rgba(245,243,238,0.12)',
              borderRadius: '6px',
              padding: '10px 14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              transition:
                'background 0.15s, color 0.15s, transform 0.15s, border-color 0.15s',
              backdropFilter: 'blur(6px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(245,243,238,0.14)'
              e.currentTarget.style.borderColor = 'rgba(245,243,238,0.2)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(245,243,238,0.08)'
              e.currentTarget.style.borderColor = 'rgba(245,243,238,0.12)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <path d={icon} fill="currentColor" />
            </svg>
            {l}
          </a>
        ))}
        <a
          href="#projects"
          style={{
            fontFamily: SANS,
            fontSize: '0.68rem',
            fontWeight: 600,
            color: 'rgba(237,232,211,0.72)',
            background: 'rgba(245,243,238,0.08)',
            border: '1px solid rgba(245,243,238,0.16)',
            borderRadius: '4px',
            padding: '7px 11px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
            boxShadow: 'none',
            transition: 'background 0.15s, color 0.15s, border-color 0.15s',
            marginLeft: 'auto',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(245,243,238,0.14)'
            e.currentTarget.style.color = '#F5F3EE'
            e.currentTarget.style.borderColor = 'rgba(245,243,238,0.24)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(245,243,238,0.08)'
            e.currentTarget.style.color = 'rgba(237,232,211,0.78)'
            e.currentTarget.style.borderColor = 'rgba(245,243,238,0.16)'
          }}
        >
          <span style={{ fontSize: '0.8rem', lineHeight: 1 }}>↓</span>
          Scroll
        </a>
      </motion.div>
    </section>
  )
}
