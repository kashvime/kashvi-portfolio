import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

export function useCountUp(target: number, decimals = 0, active = false) {
  const [val, setVal] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    if (!active || done.current) return
    done.current = true
    const duration = 1600
    const start = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(parseFloat((ease * target).toFixed(decimals)))
      if (p < 1) requestAnimationFrame(step)
      else setVal(target)
    }
    requestAnimationFrame(step)
  }, [active, target, decimals])

  return decimals > 0 ? val.toFixed(decimals) : String(Math.round(val))
}
