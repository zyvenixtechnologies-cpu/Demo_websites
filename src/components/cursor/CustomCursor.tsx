import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useSpring, useTransform } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useCursor } from '@/context/CursorContext'
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice'
import { CursorRing } from './CursorRing'
import { CursorGlow } from './CursorGlow'
import { CursorLabel } from './CursorLabel'

const IDLE_TIMEOUT = 3000

interface Ripple {
  id: number
  x: number
  y: number
}

/**
 * Renders the site's entire custom-cursor experience. Mounted once,
 * high in the tree, and left alone — every page just reads/writes
 * CursorContext to change its appearance.
 */
export function CustomCursor() {
  const isTouch = useIsTouchDevice()
  const { variant, label } = useCursor()
  const { x, y } = useMousePosition()

  const [isDown, setIsDown] = useState(false)
  const [isIdle, setIsIdle] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const rippleId = useRef(0)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Inner dot: fast, tight spring — reads as "attached" to the pointer.
  const dotX = useSpring(x, { stiffness: 1000, damping: 45, mass: 0.2 })
  const dotY = useSpring(y, { stiffness: 1000, damping: 45, mass: 0.2 })

  // Outer ring: softer spring — this is the visible "lag" behind the dot.
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 })

  // Scroll-velocity stretch: a transient vertical squash/stretch that
  // decays back to neutral, giving the cursor weight during fast scrolls.
  const scrollStretch = useSpring(0, { stiffness: 300, damping: 30 })
  const scaleY = useTransform(scrollStretch, (v) => 1 + v)
  const scaleX = useTransform(scrollStretch, (v) => 1 - v * 0.4)

  // --- idle detection -------------------------------------------------
  useEffect(() => {
    if (isTouch) return

    const resetIdleTimer = () => {
      setIsIdle(false)
      if (idleTimer.current) clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => setIsIdle(true), IDLE_TIMEOUT)
    }

    resetIdleTimer()
    window.addEventListener('pointermove', resetIdleTimer, { passive: true })
    return () => {
      window.removeEventListener('pointermove', resetIdleTimer)
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [isTouch])

  // --- click compression + ripple -------------------------------------
  useEffect(() => {
    if (isTouch) return

    const handleDown = (e: PointerEvent) => {
      setIsDown(true)
      const id = rippleId.current++
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }])
    }
    const handleUp = () => setIsDown(false)

    window.addEventListener('pointerdown', handleDown)
    window.addEventListener('pointerup', handleUp)
    return () => {
      window.removeEventListener('pointerdown', handleDown)
      window.removeEventListener('pointerup', handleUp)
    }
  }, [isTouch])

  // --- scroll velocity --------------------------------------------------
  useEffect(() => {
    if (isTouch) return

    let lastY = window.scrollY
    let rafId: number

    const measure = () => {
      const current = window.scrollY
      const velocity = current - lastY
      lastY = current
      // Clamp so a huge jump (e.g. anchor link) doesn't distort wildly.
      const clamped = Math.max(-0.4, Math.min(0.4, velocity / 120))
      scrollStretch.set(Math.abs(clamped))
      rafId = requestAnimationFrame(measure)
    }
    rafId = requestAnimationFrame(measure)
    return () => cancelAnimationFrame(rafId)
  }, [isTouch, scrollStretch])

  if (isTouch) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Glow sits lowest, lags with the ring */}
      <motion.div className="pointer-events-none absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
        <CursorGlow variant={variant} />
      </motion.div>

      {/* Ring: morphing shape, scroll stretch, click compression */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0"
        style={{ x: ringX, y: ringY, scaleX, scaleY }}
        animate={isIdle ? { scale: [1, 1.12, 1] } : { scale: 1 }}
        transition={isIdle ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
      >
        <CursorRing variant={variant} compressed={isDown} />
        <CursorLabel label={label} />
      </motion.div>

      {/* Inner dot: fast, always circular */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 rounded-full bg-ivory"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
        }}
        animate={{
          width: variant === 'default' ? 6 : 4,
          height: variant === 'default' ? 6 : 4,
          scale: isDown ? 0.6 : 1,
          opacity: variant === 'hidden' ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            className="pointer-events-none absolute rounded-full border border-gold"
            style={{ left: r.x, top: r.y, translateX: '-50%', translateY: '-50%' }}
            initial={{ width: 8, height: 8, opacity: 0.6 }}
            animate={{ width: 90, height: 90, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() =>
              setRipples((prev) => prev.filter((ripple) => ripple.id !== r.id))
            }
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
