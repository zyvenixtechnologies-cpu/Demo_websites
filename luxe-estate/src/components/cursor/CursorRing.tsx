import { motion } from 'framer-motion'
import type { CursorVariant } from '@/context/CursorContext'

interface RingShape {
  width: number
  height: number
  borderRadius: number
}

/**
 * Geometry per variant. Cards/labels get a wide rounded-rectangle
 * ("glass pill") instead of a circle so there is room for text;
 * plain hovers stay circular.
 */
const RING_SHAPE: Record<CursorVariant, RingShape> = {
  default: { width: 34, height: 34, borderRadius: 999 },
  button: { width: 64, height: 64, borderRadius: 999 },
  link: { width: 22, height: 22, borderRadius: 999 },
  card: { width: 128, height: 56, borderRadius: 28 },
  image: { width: 96, height: 96, borderRadius: 999 },
  drag: { width: 110, height: 48, borderRadius: 24 },
  view: { width: 118, height: 50, borderRadius: 25 },
  play: { width: 84, height: 84, borderRadius: 999 },
  explore: { width: 110, height: 48, borderRadius: 24 },
  zoom: { width: 96, height: 96, borderRadius: 999 },
  hidden: { width: 0, height: 0, borderRadius: 999 },
}

export function CursorRing({
  variant,
  compressed,
}: {
  variant: CursorVariant
  compressed: boolean
}) {
  const shape = RING_SHAPE[variant]

  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 flex items-center justify-center border"
      style={{
        x: '-50%',
        y: '-50%',
        mixBlendMode: 'difference',
        borderColor: 'rgba(244,240,232,0.85)',
        backdropFilter: variant === 'card' || variant === 'drag' || variant === 'view' || variant === 'explore'
          ? 'blur(6px)'
          : undefined,
        background:
          variant === 'card' || variant === 'drag' || variant === 'view' || variant === 'explore'
            ? 'rgba(244,240,232,0.06)'
            : 'transparent',
      }}
      animate={{
        width: shape.width,
        height: shape.height,
        borderRadius: shape.borderRadius,
        scale: compressed ? 0.82 : 1,
        opacity: variant === 'hidden' ? 0 : 1,
        borderWidth: variant === 'link' ? 1.5 : 1,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.5 }}
    />
  )
}
