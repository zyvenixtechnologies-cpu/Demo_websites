import { motion } from 'framer-motion'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useCursor } from '@/context/CursorContext'
import type { CursorVariant } from '@/context/CursorContext'

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onDrag' | 'onDragStart' | 'onDragEnd'
>

interface MagneticButtonProps extends NativeButtonProps {
  children: ReactNode
  variant?: 'solid' | 'outline'
  cursorLabel?: string
  cursorVariant?: CursorVariant
}

/**
 * A button that gently drifts toward the pointer within its attraction
 * radius and sets the custom cursor to its "button" personality while
 * hovered. Used for every CTA on the site.
 */
export function MagneticButton({
  children,
  variant = 'solid',
  cursorLabel,
  cursorVariant = 'button',
  className = '',
  ...rest
}: MagneticButtonProps) {
  const { ref, x, y } = useMagnetic<HTMLButtonElement>({ radius: 100, strength: 0.35 })
  const { setCursor, resetCursor } = useCursor()

  const base =
    variant === 'solid'
      ? 'bg-gold text-obsidian hover:bg-gold-bright'
      : 'border border-gold text-ivory hover:bg-gold/10'

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseEnter={() => setCursor(cursorVariant, cursorLabel)}
      onMouseLeave={resetCursor}
      className={`group relative inline-flex items-center gap-3 rounded-full px-8 py-3.5 font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-300 ${base} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
