import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, type MouseEvent } from 'react'
import { useCursor } from '@/context/CursorContext'
import type { Property } from '@/data/properties'

export function PropertyCard({ property, index }: { property: Property; index: number }) {
  const { setCursor, resetCursor } = useCursor()
  const [favourited, setFavourited] = useState(false)

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(useTransform(ry, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(rx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    rx.set((e.clientX - rect.left) / rect.width - 0.5)
    ry.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => {
    rx.set(0)
    ry.set(0)
    resetCursor()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
      className="group relative"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setCursor('card', 'View Property')}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-2xl border border-hairline bg-panel"
      >
        {/* Architectural corner brackets — the site's recurring blueprint motif */}
        {(['top-2 left-2 border-l border-t', 'top-2 right-2 border-r border-t', 'bottom-2 left-2 border-l border-b', 'bottom-2 right-2 border-r border-b'] as const).map(
          (pos) => (
            <span
              key={pos}
              className={`pointer-events-none absolute z-20 h-4 w-4 border-gold/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${pos}`}
            />
          ),
        )}

        <div className="relative h-80 w-full overflow-hidden">
          <motion.img
            src={property.image}
            alt={property.name}
            className="h-full w-full object-cover"
            style={{ scale: 1.02 }}
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />

          <button
            onClick={(e) => {
              e.stopPropagation()
              setFavourited((f) => !f)
            }}
            onMouseEnter={(e) => {
              e.stopPropagation()
              setCursor('button', favourited ? 'Saved' : 'Save')
            }}
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-obsidian/50 backdrop-blur-md"
            aria-label="Save property"
          >
            <span className={favourited ? 'text-gold' : 'text-ivory-dim'}>♦</span>
          </button>

          <div className="absolute left-4 top-4 z-20 rounded-full border border-hairline bg-obsidian/50 px-3 py-1 backdrop-blur-md">
            <span className="font-mono text-[0.65rem] tracking-widest text-gold">{property.price}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display text-xl text-ivory">{property.name}</h3>
              <p className="mt-1 text-sm text-ivory-dim">{property.location}</p>
            </div>
          </div>
          <p className="label-coord">{property.coordinates}</p>
          <div className="flex items-center gap-4 border-t border-hairline pt-3 font-mono text-xs text-ivory-dim">
            <span>{property.beds} Beds</span>
            <span className="h-1 w-1 rounded-full bg-hairline" />
            <span>{property.baths} Baths</span>
            <span className="h-1 w-1 rounded-full bg-hairline" />
            <span>{property.area}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
