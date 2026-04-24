import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SANS   = "'Inter', system-ui, sans-serif"
const MUTED  = 'rgba(17,17,22,0.42)'
const BORDER = 'rgba(17,17,22,0.08)'

export default function TagWithInfo({ label, info }: { label: string; info?: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
      <span style={{
        fontFamily: SANS, fontSize: '0.7rem', color: MUTED,
        border: `1px solid ${BORDER}`, padding: '3px 10px',
        borderRadius: '99px', lineHeight: 1.4,
      }}>{label}</span>

      {info && (
        <button
          onClick={e => { e.stopPropagation(); setOpen(v => !v) }}
          style={{
            width: 15, height: 15, borderRadius: '50%',
            border: `1px solid ${BORDER}`,
            background: open ? 'rgba(91,134,194,0.15)' : 'transparent',
            color: 'rgba(17,17,22,0.38)',
            fontFamily: SANS, fontSize: '0.58rem', fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'none', flexShrink: 0,
            transition: 'background 0.15s, color 0.15s',
            lineHeight: 1,
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#5b86c2')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(17,17,22,0.38)')}
        >i</button>
      )}

      <AnimatePresence>
        {open && info && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', bottom: 'calc(100% + 8px)', left: 0,
              background: '#111116', color: '#fff',
              fontFamily: SANS, fontSize: '0.72rem', fontWeight: 300,
              lineHeight: 1.55, padding: '9px 13px', borderRadius: '7px',
              maxWidth: '260px', whiteSpace: 'normal',
              boxShadow: '0 8px 24px rgba(17,17,22,0.22)',
              zIndex: 50,
              pointerEvents: 'none',
            }}
          >
            <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '3px' }}>{label}</span>
            {info}
            {/* Arrow */}
            <span style={{
              position: 'absolute', bottom: -5, left: 16,
              width: 0, height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid #111116',
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
