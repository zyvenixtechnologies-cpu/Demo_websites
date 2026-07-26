import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 18)
        if (next >= 100) clearInterval(interval)
        return next
      })
    }, 140)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setDone(true), 500)
      return () => clearTimeout(t)
    }
  }, [progress])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-obsidian"
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="relative flex flex-col items-center gap-6">
            {/* Logo mark: a compass/loupe motif — echoes the cursor ring */}
            <motion.svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
            >
              <circle cx="32" cy="32" r="30" stroke="#C9A768" strokeWidth="1" />
              <circle cx="32" cy="32" r="3" fill="#C9A768" />
              <line x1="32" y1="4" x2="32" y2="14" stroke="#C9A768" strokeWidth="1" />
              <line x1="32" y1="50" x2="32" y2="60" stroke="#C9A768" strokeWidth="1" />
            </motion.svg>

            <div className="flex flex-col items-center gap-1">
              <span className="font-display text-2xl tracking-wide text-ivory">LUXE ESTATE</span>
              <span className="label-coord">Est. Presence</span>
            </div>

            <div className="mt-2 h-px w-48 overflow-hidden bg-hairline">
              <motion.div
                className="h-full bg-gold"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <span className="font-mono text-xs text-ivory-dim">{Math.floor(progress)}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
