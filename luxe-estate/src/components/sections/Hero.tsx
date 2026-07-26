import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { MagneticButton } from '@/components/cursor/MagneticButton'
import { useCursor } from '@/context/CursorContext'

const HEADLINE = 'Luxury Living Redefined'

/** Lightweight ambient particle field, gently drawn toward the pointer. */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)
    const pointer = { x: width / 2, y: height / 2 }

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }))

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    const handlePointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('pointermove', handlePointer, { passive: true })

    let rafId: number
    const render = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        const dx = pointer.x - p.x
        const dy = pointer.y - p.y
        const dist = Math.hypot(dx, dy)
        if (dist < 180) {
          p.x += dx * 0.0025
          p.y += dy * 0.0025
        }
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(201,167,104,0.55)'
        ctx.fill()
      }
      rafId = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handlePointer)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
}

/** Ticks a number up once on mount, used for the live property count. */
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const value = useMotionValue(0)
  const rounded = useTransform(value, (v) => Math.floor(v).toLocaleString())
  const spanRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const controls = animate(value, to, { duration: 1.8, ease: 'easeOut', delay: 0.6 })
    const unsub = rounded.on('change', (v) => {
      if (spanRef.current) spanRef.current.textContent = v
    })
    return () => {
      controls.stop()
      unsub()
    }
  }, [to, value, rounded])

  return (
    <span>
      <span ref={spanRef}>0</span>
      {suffix}
    </span>
  )
}

export function Hero() {
  const { setCursor, resetCursor } = useCursor()

  // Mouse parallax for the background image / gradient layer.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const bgX = useTransform(mx, [-1, 1], [-14, 14])
  const bgY = useTransform(my, [-1, 1], [-14, 14])

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', handle, { passive: true })
    return () => window.removeEventListener('pointermove', handle)
  }, [mx, my])

  return (
    <section className="relative flex h-screen min-h-[720px] w-full items-end overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 -z-20 scale-110"
        style={{ x: bgX, y: bgY }}
      >
        <img
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2400&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/30" />
      <ParticleField />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-20 md:px-12 md:pb-28">
        <div className="flex flex-col gap-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="label-coord"
          >
            Est. 1998 — 27 Countries
          </motion.span>

          <h1 className="max-w-4xl font-display text-6xl leading-[0.95] tracking-tight text-ivory md:text-8xl">
            {HEADLINE.split(' ').map((word, wi) => (
              <span key={wi} className="mr-5 inline-flex overflow-hidden align-top last:mr-0">
                {word.split('').map((char, ci) => (
                  <motion.span
                    key={ci}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      delay: 0.35 + wi * 0.12 + ci * 0.025,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="max-w-md text-sm leading-relaxed text-ivory-dim md:text-base"
          >
            A private collection of the world's most extraordinary residences,
            curated for those who consider a home the finest work of architecture
            they will ever own.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex flex-wrap items-center gap-6"
        >
          <MagneticButton cursorLabel="Explore" cursorVariant="explore">
            View Residences
          </MagneticButton>
          <MagneticButton variant="outline" cursorLabel="Open" cursorVariant="link">
            Our Philosophy
          </MagneticButton>

          <div className="ml-2 font-mono text-sm text-ivory-dim">
            <span className="text-2xl text-gold"><CountUp to={412} suffix="+" /></span>
            <span className="ml-2 label-coord align-middle">Estates Represented</span>
          </div>
        </motion.div>
      </div>

      {/* Floating search panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 right-6 z-10 hidden w-72 rounded-2xl border border-hairline bg-obsidian/50 p-5 backdrop-blur-xl md:block"
        onMouseEnter={() => setCursor('card', 'Search')}
        onMouseLeave={resetCursor}
      >
        <p className="label-coord mb-3">Find a Residence</p>
        <div className="flex items-center justify-between border-b border-hairline pb-2 text-sm text-ivory-dim">
          <span>Location, region</span>
          <span className="text-gold">→</span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-6 z-10 flex items-center gap-3 md:left-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <motion.div
          className="h-10 w-px bg-gold"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
        <span className="label-coord">Scroll</span>
      </motion.div>
    </section>
  )
}
