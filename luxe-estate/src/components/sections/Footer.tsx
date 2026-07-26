import { useCursor } from '@/context/CursorContext'

const SOCIALS = ['Instagram', 'LinkedIn', 'Journal']

export function Footer() {
  const { setCursor, resetCursor } = useCursor()

  return (
    <footer className="relative border-t border-hairline px-6 py-16 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-2xl text-ivory">LUXE ESTATE</p>
          <p className="mt-3 text-sm leading-relaxed text-ivory-dim">
            A private collection of the world's most extraordinary residences.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="label-coord">Stay Informed</p>
          <div className="flex items-center gap-3 border-b border-hairline pb-2">
            <input
              type="email"
              placeholder="you@domain.com"
              className="w-56 bg-transparent text-sm text-ivory outline-none placeholder:text-ivory-dim/50"
            />
            <span
              onMouseEnter={() => setCursor('button', 'Join')}
              onMouseLeave={resetCursor}
              className="cursor-none font-mono text-xs uppercase tracking-widest text-gold"
            >
              →
            </span>
          </div>
        </div>

        <div className="flex gap-8">
          {SOCIALS.map((s) => (
            <a
              key={s}
              href="#"
              onMouseEnter={() => setCursor('link', s)}
              onMouseLeave={resetCursor}
              className="font-mono text-xs uppercase tracking-widest text-ivory-dim transition-colors hover:text-gold"
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl border-t border-hairline pt-6 text-xs text-ivory-dim/60">
        © {new Date().getFullYear()} Luxe Estate. All residences shown are illustrative.
      </div>
    </footer>
  )
}
