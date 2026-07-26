import { useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, type RefObject } from 'react'

interface MagneticOptions {
  /** How far (px) from the element's center the pull starts. */
  radius?: number
  /** How strongly the element travels toward the pointer, 0–1. */
  strength?: number
  /** Spring stiffness/damping — softer values feel weightier. */
  stiffness?: number
  damping?: number
}

/**
 * Makes an element magnetically drift toward the pointer when the
 * pointer enters its attraction radius, and spring back to rest
 * once the pointer leaves. Returns a ref to attach to the element
 * and motion values to bind to its transform.
 */
export function useMagnetic<T extends HTMLElement>({
  radius = 90,
  strength = 0.4,
  stiffness = 150,
  damping = 15,
}: MagneticOptions = {}): {
  ref: RefObject<T | null>
  x: ReturnType<typeof useSpring>
  y: ReturnType<typeof useSpring>
} {
  const ref = useRef<T | null>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness, damping, mass: 0.2 })
  const y = useSpring(rawY, { stiffness, damping, mass: 0.2 })

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const handlePointerMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const distance = Math.hypot(distX, distY)

      if (distance < radius) {
        rawX.set(distX * strength)
        rawY.set(distY * strength)
      } else {
        rawX.set(0)
        rawY.set(0)
      }
    }

    const handlePointerLeaveWindow = () => {
      rawX.set(0)
      rawY.set(0)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('blur', handlePointerLeaveWindow)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('blur', handlePointerLeaveWindow)
    }
  }, [radius, strength, rawX, rawY])

  return { ref, x, y }
}
