import { motion } from 'framer-motion'
import type { CursorVariant } from '@/context/CursorContext'

const GLOW_SIZE: Record<CursorVariant, number> = {
  default: 60,
  button: 90,
  card: 140,
  image: 160,
  link: 50,
  drag: 130,
  view: 140,
  play: 150,
  explore: 130,
  zoom: 160,
  hidden: 0,
}

/** Soft gold radial glow that sits beneath the ring — never sharp, never opaque. */
export function CursorGlow({ variant }: { variant: CursorVariant }) {
  const size = GLOW_SIZE[variant]

  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 rounded-full"
      style={{
        background:
          'radial-gradient(circle, rgba(201,167,104,0.35) 0%, rgba(201,167,104,0.08) 55%, transparent 75%)',
        filter: 'blur(4px)',
        x: '-50%',
        y: '-50%',
      }}
      animate={{
        width: size,
        height: size,
        opacity: variant === 'hidden' ? 0 : 1,
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
    />
  )
}
