import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { SKILL_GRAPH } from '../data'

const SANS   = "'Inter', system-ui, sans-serif"
const SERIF  = "'Cormorant Garamond', Georgia, serif"
const PINK   = '#E05A82'
const CREAM  = '#EDE8D3'
const MUTED  = 'rgba(13,13,13,0.45)'
const BORDER = '2px solid #0D0D0D'
const BORDER_LIGHT = 'rgba(13,13,13,0.09)'

const TYPE_COLOR: Record<string, string> = { project: '#5b86c2', experience: PINK, course: '#B07C3A' }
const TYPE_LABEL: Record<string, string> = { project: 'Project', experience: 'Experience', course: 'Course' }

type Arrow = { d: string; color: string; id: string }

function makeArrow(cr: DOMRect, src: DOMRect, dst: DOMRect, color: string, id: string): Arrow {
  const sx = src.right - cr.left, sy = src.top - cr.top + src.height / 2
  const dx = dst.left  - cr.left, dy = dst.top  - cr.top + dst.height / 2
  const mx = (sx + dx) / 2
  return { d: `M ${sx} ${sy} C ${mx} ${sy}, ${mx} ${dy}, ${dx} ${dy}`, color, id }
}

export default function Skills() {
  const [selected, setSelected]  = useState<string | null>(null)
  const containerRef              = useRef<HTMLDivElement>(null)
  const tagRefs                   = useRef<Map<string, HTMLElement>>(new Map())
  const itemRefs                  = useRef<(HTMLElement | null)[]>([])
  const [arrows, setArrows]       = useState<Arrow[]>([])
  const [svgDims, setSvgDims]     = useState({ w: 0, h: 0 })
  const sectionRef                = useRef(null)
  const inView                    = useInView(sectionRef, { once: true, margin: '-60px' })
  const headerRef                 = useRef(null)
  const headerInView              = useInView(headerRef, { once: true })
  const skillKeys                 = Object.keys(SKILL_GRAPH)
  const skillData                 = selected ? SKILL_GRAPH[selected] : null

  const recalc = useCallback(() => {
    if (!selected || !containerRef.current) { setArrows([]); return }
    const tagEl = tagRefs.current.get(selected)
    if (!tagEl) return
    const cr = containerRef.current.getBoundingClientRect()
    setSvgDims({ w: cr.width, h: cr.height })
    const newArrows: Arrow[] = []
    itemRefs.current.forEach((el, i) => {
      if (!el || !skillData) return
      const conn = skillData.connections[i]
      if (!conn) return
      newArrows.push(makeArrow(cr, tagEl.getBoundingClientRect(), el.getBoundingClientRect(), TYPE_COLOR[conn.type], `${selected}-${i}`))
    })
    setArrows(newArrows)
  }, [selected, skillData])

  useEffect(() => { itemRefs.current = []; const t = setTimeout(recalc, 100); return () => clearTimeout(t) }, [selected]) // eslint-disable-line
  useEffect(() => { window.addEventListener('resize', recalc); return () => window.removeEventListener('resize', recalc) }, [recalc])

  return (
    <section id="skills" ref={sectionRef} style={{ background: CREAM, borderBottom: BORDER }}>

      {/* editorial header */}
      <div ref={headerRef} style={{ padding: '64px 40px 0', borderBottom: BORDER }}>
        <motion.span
          initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}
          style={{ fontFamily: SANS, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: PINK, display: 'block', marginBottom: '28px' }}
        >Skills</motion.span>

        <div style={{ overflow: 'hidden', paddingBottom: '52px' }}>
          {['SKILLS'].map((word, i) => (
            <div key={word} style={{ overflow: 'hidden', lineHeight: 0.88 }}>
              <motion.h2
                initial={{ y: '108%' }} animate={headerInView ? { y: '0%' } : {}}
                transition={{ duration: 1, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(5rem, 14vw, 14rem)',
                  fontWeight: 300,
                  color: '#0D0D0D',
                  letterSpacing: '-0.04em',
                  fontStyle: 'italic',
                  display: 'block',
                }}
              >{word}</motion.h2>
            </div>
          ))}
        </div>
      </div>

      {/* interactive grid */}
      <div ref={containerRef} style={{ padding: '64px 40px', position: 'relative', borderBottom: BORDER }}>
        <svg style={{ position: 'absolute', top: 0, left: 0, width: svgDims.w, height: svgDims.h, pointerEvents: 'none', zIndex: 0, overflow: 'visible' }}>
          <AnimatePresence>
            {arrows.map(a => (
              <motion.path key={a.id} d={a.d} fill="none" stroke={a.color} strokeWidth={1.5} strokeOpacity={0.5} strokeDasharray="5 4"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            ))}
          </AnimatePresence>
        </svg>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', position: 'relative', zIndex: 1 }}>
          {/* left: skill tags */}
          <div>
            <p style={{ fontFamily: SANS, fontSize: '0.73rem', color: MUTED, marginBottom: '24px', lineHeight: 1.6 }}>
              {selected ? 'Click another to switch · click again to close' : "Click any skill to see where I've used it"}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skillKeys.map((skill, i) => {
                const isSel = selected === skill
                return (
                  <motion.button key={skill}
                    ref={el => { if (el) tagRefs.current.set(skill, el) }}
                    onClick={() => setSelected(isSel ? null : skill)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                    style={{
                      fontFamily: SANS, fontSize: '0.78rem', fontWeight: isSel ? 700 : 500,
                      padding: '7px 16px', borderRadius: '3px',
                      border: `1.5px solid ${isSel ? PINK : 'rgba(13,13,13,0.2)'}`,
                      background: isSel ? PINK : 'transparent',
                      color: isSel ? '#fff' : '#0D0D0D',
                      cursor: 'pointer', transition: 'all 0.18s',
                      boxShadow: isSel ? `0 4px 16px rgba(224,90,130,0.25)` : 'none',
                      letterSpacing: '0.02em',
                    }}
                  >{skill}</motion.button>
                )
              })}
            </div>
          </div>

          {/* right: detail panel */}
          <div style={{ minHeight: '260px' }}>
            <AnimatePresence mode="wait">
              {skillData && selected ? (
                <motion.div key={selected}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span style={{ fontFamily: SANS, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: PINK }}>{selected}</span>
                  <p style={{ fontFamily: SERIF, fontSize: '1.15rem', fontWeight: 400, color: '#0D0D0D', lineHeight: 1.7, margin: '10px 0 28px', maxWidth: '360px' }}>{skillData.how}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {skillData.connections.map((conn, i) => {
                      const color = TYPE_COLOR[conn.type]
                      return (
                        <motion.div key={i} ref={el => { itemRefs.current[i] = el }}
                          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: i * 0.09 }}
                          style={{ padding: '13px 16px', borderRadius: '3px', border: `1px solid ${color}28`, background: `${color}0A` }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '5px' }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
                            <span style={{ fontFamily: SANS, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color }}>{TYPE_LABEL[conn.type]}</span>
                          </div>
                          <p style={{ fontFamily: SANS, fontSize: '0.82rem', fontWeight: 500, color: '#0D0D0D', paddingLeft: '13px', marginBottom: '2px' }}>{conn.name}</p>
                          <p style={{ fontFamily: SANS, fontSize: '0.75rem', fontWeight: 300, color: MUTED, paddingLeft: '13px', lineHeight: 1.55 }}>{conn.detail}</p>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '60px' }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ fontFamily: SERIF, fontSize: '2.5rem', color: 'rgba(13,13,13,0.12)', marginBottom: '10px' }}>→</motion.div>
                    <p style={{ fontFamily: SERIF, fontSize: '1.3rem', fontWeight: 300, color: 'rgba(13,13,13,0.2)' }}>Select a skill</p>
                    <p style={{ fontFamily: SANS, fontSize: '0.7rem', color: 'rgba(13,13,13,0.2)', marginTop: '5px' }}>to see where I've used it</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </section>
  )
}
