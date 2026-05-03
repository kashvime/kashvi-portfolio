import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring_pos = useRef({ x: 0, y: 0 })
  const raf = useRef<number | null>(null)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    const onEnter = () => {
      ring.current?.setAttribute('data-hover', 'true')
    }
    const onLeave = () => {
      ring.current?.removeAttribute('data-hover')
    }

    window.addEventListener('mousemove', onMove)

    const addHover = () => {
      document.querySelectorAll('a,button,[data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    addHover()

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      ring_pos.current.x = lerp(ring_pos.current.x, pos.current.x, 0.1)
      ring_pos.current.y = lerp(ring_pos.current.y, pos.current.y, 0.1)

      if (dot.current) {
        dot.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${ring_pos.current.x - 20}px, ${ring_pos.current.y - 20}px)`
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div
        ref={dot}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#d4909f',
          pointerEvents: 'none',
          transition: 'opacity 0.2s',
          willChange: 'transform',
        }}
      />
      <div
        ref={ring}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9998,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid rgba(212,144,159,0.5)',
          pointerEvents: 'none',
          transition:
            'width 0.25s, height 0.25s, border-color 0.25s, margin 0.25s',
          willChange: 'transform',
        }}
        onTransitionEnd={() => {}}
      />
      <style>{`
        [data-hover] { width: 64px !important; height: 64px !important; border-color: rgba(212,144,159,0.8) !important; margin: -12px; }
        @media (hover: none) { .cursor-dot, .cursor-ring { display: none; } }
      `}</style>
    </>
  )
}
