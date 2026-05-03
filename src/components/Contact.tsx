import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useIsMobile } from './useIsMobile'

const SANS = "'Inter', system-ui, sans-serif"
const SERIF = "'Cormorant Garamond', Georgia, serif"
const PINK = '#B83A5E'
const CREAM = '#EDE8D3'
const MAIL_PATH =
  'M2.25 5.25h19.5A1.25 1.25 0 0 1 23 6.5v11A1.25 1.25 0 0 1 21.75 18.75H2.25A1.25 1.25 0 0 1 1 17.5v-11A1.25 1.25 0 0 1 2.25 5.25Zm.68 1.5L12 13.18l9.07-6.43H2.93Zm18.57 10.5v-8.66l-9.07 6.43a.75.75 0 0 1-.86 0L2.5 8.59v8.66h19Z'

const GITHUB_PATH =
  'M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0 1 12 6.6c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.3 24 12 24 5.37 18.627 0 12 0z'
const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isMobile = useIsMobile()
  const contactItems = [
    {
      icon: MAIL_PATH,
      values: [
        {
          text: 'mehta.kash@northeastern.edu',
          href: 'mailto:mehta.kash@northeastern.edu',
        },
      ],
    },
    {
      icon: MAIL_PATH,
      values: [
        {
          text: 'kashvimehta2022@gmail.com',
          href: 'mailto:kashvimehta2022@gmail.com',
        },
      ],
    },
    {
      icon: LINKEDIN_PATH,
      values: [
        {
          text: 'linkedin.com/in/kashvi-mehta',
          href: 'https://linkedin.com/in/kashvi-mehta',
        },
      ],
    },
    {
      icon: GITHUB_PATH,
      values: [
        { text: 'github.com/kashvime', href: 'https://github.com/kashvime' },
      ],
    },
  ]

  return (
    <section
      id="contact"
      style={{ background: PINK, borderTop: '2px solid #0D0D0D' }}
    >
      <div ref={ref} style={{ padding: isMobile ? '40px 24px' : '70px' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? '1fr'
              : 'minmax(0, 2.6fr) minmax(0, 1px) minmax(360px, 1.4fr)',
            columnGap: '28px',
            rowGap: isMobile ? '32px' : '0',
            alignItems: 'start',
            maxWidth: '1180px',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                fontWeight: 300,
                color: CREAM,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                fontStyle: 'italic',
                marginLeft: isMobile ? '0' : '40px',
                marginTop: '20px',
              }}
            >
              Kashvi Mehta
            </motion.h2>
          </div>

          {!isMobile && (
            <div
              aria-hidden="true"
              style={{
                width: '1px',
                minHeight: '100%',
                background: 'rgba(245,243,238,0.22)',
              }}
            />
          )}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              paddingTop: '6px',
            }}
          >
            {contactItems.map((item, idx) => (
              <div
                key={`${item.icon}-${idx}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: CREAM,
                    minWidth: 0,
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ flexShrink: 0 }}
                  >
                    <path d={item.icon} fill="currentColor" />
                  </svg>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    fontFamily: SANS,
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    fontWeight: 500,
                    color: '#bab8b3',
                    letterSpacing: '0.01em',
                    opacity: '0.96',
                    minWidth: 0,
                  }}
                >
                  {item.values.map((value) => (
                    <span key={value.text}>
                      <a
                        href={value.href}
                        target={
                          value.href.startsWith('http') ? '_blank' : undefined
                        }
                        rel={
                          value.href.startsWith('http')
                            ? 'noreferrer'
                            : undefined
                        }
                        style={{
                          fontFamily: SERIF,
                          fontWeight: 800,
                          letterSpacing: '0.03em',
                          color: '#F5F3EE',
                          textDecoration: 'none',
                          opacity: '0.92',
                          transition: 'opacity 0.15s, transform 0.15s',
                          wordBreak: 'break-all',
                          display: 'inline-flex',
                          alignItems: 'center',
                          whiteSpace: isMobile ? 'normal' : 'nowrap',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '1'
                          e.currentTarget.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '0.92'
                          e.currentTarget.style.transform = 'translateY(0)'
                        }}
                      >
                        {value.text}
                      </a>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
