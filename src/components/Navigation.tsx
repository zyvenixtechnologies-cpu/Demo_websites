import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useCursor } from '@/context/CursorContext'

const LINKS = [
  { label: 'Residences', href: '#properties' },
  { label: 'Philosophy', href: '#about' },
  { label: 'Journal', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { setCursor, resetCursor } = useCursor()

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="rounded-full border border-hairline bg-obsidian/40 px-5 py-2.5 backdrop-blur-md">
          <a
            href="#"
            className="font-display text-sm tracking-[0.15em] text-ivory"
            onMouseEnter={() => setCursor('link', 'Home')}
            onMouseLeave={resetCursor}
          >
            LUXE ESTATE
          </a>
        </div>

        <nav className="hidden items-center gap-2 rounded-full border border-hairline bg-obsidian/40 px-2 py-2 backdrop-blur-md md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-ivory-dim transition-colors hover:text-ivory"
              onMouseEnter={() => setCursor('link', link.label)}
              onMouseLeave={resetCursor}
            >
              {link.label}
              <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(true)}
          onMouseEnter={() => setCursor('button', 'Menu')}
          onMouseLeave={resetCursor}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-obsidian/40 backdrop-blur-md"
          aria-label="Open menu"
        >
          <span className="flex flex-col gap-1.5">
            <span className="h-px w-5 bg-ivory" />
            <span className="h-px w-5 bg-ivory" />
          </span>
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-10 bg-obsidian/95 backdrop-blur-xl"
          >
            <button
              onClick={() => setMenuOpen(false)}
              onMouseEnter={() => setCursor('button', 'Close')}
              onMouseLeave={resetCursor}
              className="absolute right-8 top-8 font-mono text-xs uppercase tracking-[0.2em] text-ivory-dim hover:text-ivory"
            >
              Close
            </button>
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={() => setCursor('view', 'Go')}
                onMouseLeave={resetCursor}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                className="font-display text-4xl text-ivory transition-colors hover:text-gold md:text-6xl"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
