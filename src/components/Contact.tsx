import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SANS  = "'Inter', system-ui, sans-serif"
const SERIF = "'Cormorant Garamond', Georgia, serif"
const PINK  = '#B83A5E'
const CREAM = '#EDE8D3'

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" style={{ background: PINK, borderTop: '2px solid #0D0D0D' }}>
      <div ref={ref} style={{ padding: '80px 40px' }}>

        <div style={{ overflow: 'hidden', marginBottom: '40px' }}>
          <motion.h2
            initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: SERIF, fontSize: 'clamp(4rem, 10vw, 10rem)', fontWeight: 300, color: CREAM, letterSpacing: '-0.04em', lineHeight: 0.88, fontStyle: 'italic' }}
          >Kashvi Mehta</motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}
        >
          <a href="mailto:mehta.kash@northeastern.edu"
            style={{ fontFamily: SANS, fontSize: '0.82rem', fontWeight: 700, background: CREAM, color: PINK, padding: '14px 28px', borderRadius: '4px', letterSpacing: '0.01em', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >mehta.kash@northeastern.edu</a>
          {[
            { l: 'GitHub ↗',   h: 'https://github.com/kashvime' },
            { l: 'LinkedIn ↗', h: 'https://linkedin.com/in/kashvi-mehta' },
          ].map(({ l, h }) => (
            <a key={l} href={h} target="_blank" rel="noreferrer"
              style={{ fontFamily: SANS, fontSize: '0.75rem', color: 'rgba(237,232,211,0.6)', borderBottom: '1px solid rgba(237,232,211,0.3)', paddingBottom: '1px', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = CREAM)}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,232,211,0.6)')}
            >{l}</a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
