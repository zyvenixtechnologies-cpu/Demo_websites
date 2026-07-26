import { motion, useMotionValue } from 'framer-motion'
import { useRef, useState } from 'react'
import { testimonials } from '@/data/properties'
import { useCursor } from '@/context/CursorContext'

export function Testimonials() {
  const { setCursor, resetCursor } = useCursor()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)
  const x = useMotionValue(0)

  return (
    <section id="testimonials" className="relative overflow-hidden py-28 md:py-36">
      <div className="mx-auto mb-14 max-w-7xl px-6 md:px-12">
        <p className="label-coord mb-4">Client Notes</p>
        <h2 className="max-w-xl font-display text-4xl leading-tight text-ivory md:text-5xl">
          Drag through a few words from the people who trusted us.
        </h2>
      </div>

      <div
        ref={containerRef}
        className="relative mx-6 cursor-none overflow-hidden md:mx-12"
        onMouseEnter={() => setCursor('drag', 'Drag')}
        onMouseLeave={resetCursor}
      >
        <motion.div
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.12}
          style={{ x }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) setActive((a) => Math.min(a + 1, testimonials.length - 1))
            if (info.offset.x > 80) setActive((a) => Math.max(a - 1, 0))
          }}
          animate={{ x: `-${active * 100}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          className="flex"
        >
          {testimonials.map((t) => (
            <div key={t.id} className="w-full flex-shrink-0 px-2">
              <div className="mx-auto max-w-3xl rounded-2xl border border-hairline bg-panel/60 p-10 backdrop-blur-md md:p-16">
                <p className="font-display text-2xl leading-relaxed text-ivory md:text-3xl">
                  “{t.quote}”
                </p>
                <div className="mt-8 flex items-center gap-4 border-t border-hairline pt-6">
                  <div className="h-10 w-10 rounded-full border border-gold/50" />
                  <div>
                    <p className="text-sm text-ivory">{t.name}</p>
                    <p className="label-coord">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActive(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? 'w-8 bg-gold' : 'w-1.5 bg-hairline'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
