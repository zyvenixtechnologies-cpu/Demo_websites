import { useMotionValue } from 'framer-motion'
import { useEffect, useRef } from 'react'

/**
 * Tracks the pointer position into two framer-motion MotionValues.
 *
 * Deliberately bypasses React state: writing to a MotionValue does not
 * trigger a re-render, it just pushes the number straight to whatever
 * DOM nodes are subscribed to it (via useTransform / style bindings).
 * That's what keeps a screen-wide mousemove listener from causing
 * React to re-render the whole tree 60+ times a second.
 */
export function useMousePosition() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rafId = useRef<number | null>(null)
  const pending = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      pending.current = { x: e.clientX, y: e.clientY }
      if (rafId.current !== null) return

      rafId.current = requestAnimationFrame(() => {
        if (pending.current) {
          x.set(pending.current.x)
          y.set(pending.current.y)
        }
        rafId.current = null
      })
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handleMove)
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [x, y])

  return { x, y }
}
