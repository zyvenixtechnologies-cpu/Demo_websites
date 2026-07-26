import { AnimatePresence, motion } from 'framer-motion'

export function CursorLabel({ label }: { label: string | null }) {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0 flex items-center justify-center"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <AnimatePresence mode="wait">
        {label && (
          <motion.span
            key={label}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.18 }}
            className="whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ivory"
            style={{ mixBlendMode: 'difference' }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
