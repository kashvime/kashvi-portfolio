import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '../data'

const SANS   = "'Inter', system-ui, sans-serif"
const SERIF  = "'Cormorant Garamond', Georgia, serif"
const PINK   = '#E05A82'
const CREAM  = '#EDE8D3'
const MUTED  = 'rgba(13,13,13,0.45)'
const BORDER = '2px solid #0D0D0D'

type Project = typeof PROJECTS[0]

function ReadmeDrawer({ readme }: { readme: NonNullable<Project['readme']> }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{ overflow: 'hidden', borderTop: '1.5px solid rgba(13,13,13,0.1)' }}
    >
      <div style={{ padding: '36px 40px 40px 112px' }}>
        {/* overview */}
        <p style={{ fontFamily: SERIF, fontSize: '1.05rem', fontWeight: 400, color: '#0D0D0D', lineHeight: 1.75, maxWidth: '680px', marginBottom: '32px' }}>
          {readme.overview}
        </p>

        {/* sections */}
        <div style={{ display: 'grid', gridTemplateColumns: readme.sections.length >= 3 ? 'repeat(3, 1fr)' : `repeat(${readme.sections.length}, 1fr)`, gap: '40px' }}>
          {readme.sections.map(sec => (
            <div key={sec.title}>
              <p style={{ fontFamily: SANS, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: PINK, marginBottom: '14px' }}>{sec.title}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {sec.points.map((pt, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: PINK, fontSize: '0.55rem', marginTop: '5px', flexShrink: 0 }}>▸</span>
                    <span style={{ fontFamily: SANS, fontSize: '0.78rem', fontWeight: 300, color: '#0D0D0D', lineHeight: 1.65 }}>
                      {/* render inline code */}
                      {pt.split(/(`[^`]+`)/g).map((chunk, ci) =>
                        chunk.startsWith('`') && chunk.endsWith('`')
                          ? <code key={ci} style={{ fontFamily: 'monospace', fontSize: '0.73rem', background: 'rgba(13,13,13,0.07)', padding: '1px 5px', borderRadius: '2px' }}>{chunk.slice(1, -1)}</code>
                          : chunk
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ProjectRow({ p, i, expanded, onToggle }: { p: Project; i: number; expanded: boolean; onToggle: () => void }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderBottom: BORDER }}
    >
      {/* main row — clickable */}
      <div
        onClick={p.readme ? onToggle : undefined}
        style={{ display: 'grid', gridTemplateColumns: '80px 1fr 180px', gap: '32px', padding: '44px 40px', alignItems: 'start', transition: 'background 0.2s', cursor: p.readme ? 'pointer' : 'default' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(155,201,64,0.07)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        {/* number */}
        <span style={{ fontFamily: SERIF, fontSize: '1.1rem', fontWeight: 300, color: PINK, paddingTop: '6px', letterSpacing: '0.02em' }}>{p.num}</span>

        {/* content */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 400, color: '#0D0D0D', letterSpacing: '-0.02em', lineHeight: 1 }}>{p.name}</h3>
            <span style={{ fontFamily: SANS, fontSize: '0.65rem', fontWeight: 700, color: PINK, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.tagline}</span>
          </div>
          <p style={{ fontFamily: SANS, fontSize: '0.84rem', fontWeight: 300, color: MUTED, lineHeight: 1.85, maxWidth: '560px', marginBottom: '20px' }}>{p.desc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
            {p.tags.map(t => (
              <span key={t} style={{ fontFamily: SANS, fontSize: '0.68rem', fontWeight: 700, background: 'rgba(224,90,130,0.12)', border: '1.5px solid rgba(224,90,130,0.5)', color: PINK, padding: '3px 12px', borderRadius: '3px', letterSpacing: '0.02em', boxShadow: '0 0 8px rgba(224,90,130,0.2)' }}>{t}</span>
            ))}
            {p.readme && (
              <span style={{ fontFamily: SANS, fontSize: '0.65rem', fontWeight: 500, color: MUTED, marginLeft: '8px', letterSpacing: '0.02em' }}>
                {expanded ? '↑ collapse' : '↓ readme'}
              </span>
            )}
          </div>
        </div>

        {/* links + year */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end', paddingTop: '6px' }}>
          <span style={{ fontFamily: SANS, fontSize: '0.68rem', color: MUTED, letterSpacing: '0.04em' }}>{p.year}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end', marginTop: '8px' }}>
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer"
                onClick={e => e.stopPropagation()}
                style={{ fontFamily: SANS, fontSize: '0.72rem', fontWeight: 700, background: PINK, color: '#fff', padding: '8px 18px', borderRadius: '3px', transition: 'opacity 0.15s', display: 'inline-block' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >Live ↗</a>
            )}
            <a href={p.github} target="_blank" rel="noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ fontFamily: SANS, fontSize: '0.72rem', fontWeight: 600, color: '#0D0D0D', borderBottom: '1.5px solid #0D0D0D', paddingBottom: '1px', transition: 'opacity 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >GitHub ↗</a>
          </div>
        </div>
      </div>

      {/* readme drawer */}
      <AnimatePresence>
        {expanded && p.readme && <ReadmeDrawer readme={p.readme} />}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Work() {
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true })
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section id="projects" style={{ background: CREAM, borderBottom: BORDER }}>

      {/* header */}
      <div ref={ref} style={{ padding: '64px 40px 0', borderBottom: BORDER }}>
        <motion.span
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}
          style={{ fontFamily: SANS, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: PINK, display: 'block', marginBottom: '28px' }}
        >Projects</motion.span>

        <div style={{ overflow: 'hidden', paddingBottom: '52px' }}>
          <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
            <motion.h2
              initial={{ y: '108%' }} animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: SERIF, fontSize: 'clamp(5rem, 14vw, 14rem)', fontWeight: 300, color: '#0D0D0D', letterSpacing: '-0.04em', fontStyle: 'italic', display: 'block' }}
            >PROJECTS</motion.h2>
          </div>
        </div>
      </div>

      {/* project rows */}
      {PROJECTS.map((p, i) => (
        <ProjectRow
          key={p.num}
          p={p}
          i={i}
          expanded={open === p.num}
          onToggle={() => setOpen(open === p.num ? null : p.num)}
        />
      ))}

      <div style={{ height: '24px' }} />
    </section>
  )
}
