import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PINK  = '#B83A5E'
const CREAM = '#EDE8D3'
const SERIF = "'Cormorant Garamond', Georgia, serif"
const SANS  = "'Inter', system-ui, sans-serif"

const LABELS = ["Computer Science @ Northeastern '26", 'Software Engineer']

export default function Hero() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % LABELS.length), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <section style={{ background: PINK, minHeight: '100svh', display: 'flex', flexDirection: 'column', borderBottom: '2px solid #0D0D0D' }}>

      {/* nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid rgba(237,232,211,0.15)' }}>
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          style={{ fontFamily: SANS, fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(237,232,211,0.45)' }}
        >Kashvi Mehta</motion.span>

        <motion.nav
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }}
          style={{ display: 'flex', gap: '32px', alignItems: 'center' }}
        >
          {[['Projects','#projects'],['Experience','#experience'],['Skills','#skills'],['Contact','#contact']].map(([l,h]) => (
            <a key={l} href={h}
              style={{ fontFamily: SANS, fontSize: '0.7rem', fontWeight: 500, color: 'rgba(237,232,211,0.55)', letterSpacing: '0.04em', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = CREAM)}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,232,211,0.55)')}
            >{l}</a>
          ))}
        </motion.nav>
      </div>

      {/* main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '36px 40px 0' }}>

        {/* animated labels */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.15 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}
        >
          {/* right only */}
          <div style={{ height: '16px', overflow: 'hidden', marginLeft: 'auto' }}>
            <AnimatePresence mode="wait">
              <motion.span key={idx}
                initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ fontFamily: SANS, fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.08em', color: 'rgba(237,232,211,0.5)', display: 'block' }}
              >{LABELS[idx]}</motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* name — vertically centered in remaining space */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {[{ text: 'KASHVI', italic: false }, { text: 'Mehta', italic: true }].map(({ text, italic }, i) => (
            <div key={text} style={{ overflow: 'hidden', lineHeight: 0.84 }}>
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(7rem, 20.5vw, 22rem)',
                  fontWeight: 300,
                  color: CREAM,
                  letterSpacing: '-0.04em',
                  fontStyle: italic ? 'italic' : 'normal',
                  display: 'block',
                }}
              >{text}</motion.h1>
            </div>
          ))}
        </div>
      </div>

      {/* bottom bar */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}
        style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '20px 40px', borderTop: '1px solid rgba(237,232,211,0.15)' }}
      >
        {[
          { l: 'GitHub ↗',   h: 'https://github.com/kashvime' },
          { l: 'LinkedIn ↗', h: 'https://linkedin.com/in/kashvi-mehta' },
        ].map(({ l, h }) => (
          <a key={l} href={h} target="_blank" rel="noreferrer"
            style={{ fontFamily: SANS, fontSize: '0.7rem', fontWeight: 500, color: 'rgba(237,232,211,0.45)', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = CREAM)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,232,211,0.45)')}
          >{l}</a>
        ))}
        <a href="#projects"
          style={{ fontFamily: SANS, fontSize: '0.7rem', fontWeight: 700, color: 'rgba(237,232,211,0.45)', transition: 'color 0.15s', marginLeft: 'auto' }}
          onMouseEnter={e => (e.currentTarget.style.color = CREAM)}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,232,211,0.45)')}
        >Scroll ↓</a>
      </motion.div>
    </section>
  )
}