import { motion } from 'framer-motion'

const TIMELINE = [
  { year: '1998', event: 'Founded in Geneva with a single listing in the Alps.' },
  { year: '2006', event: 'Opened our first Pacific office, in Malibu.' },
  { year: '2014', event: 'Crossed 200 estates represented across 4 continents.' },
  { year: '2026', event: 'Now present in 27 countries, still privately held.' },
]

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-36">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
        <div className="relative">
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-[4/5] w-full overflow-hidden rounded-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
              alt="Interior of a modern luxury residence"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-hairline bg-obsidian/70 p-6 backdrop-blur-md md:block">
            <p className="font-display text-3xl text-gold">27</p>
            <p className="label-coord mt-1">Countries served</p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-10">
          <div>
            <p className="label-coord mb-4">Our Philosophy</p>
            <h2 className="font-display text-4xl leading-tight text-ivory md:text-5xl">
              We sell fewer homes than most agencies — on purpose.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-ivory-dim md:text-base">
              Scarcity is not a marketing position for us; it's how we operate. Every
              residence is walked in person, every seller is met face to face, and every
              client works directly with a partner of the firm — never a rotating desk
              of associates.
            </p>
          </div>

          <div className="flex flex-col divide-y divide-hairline border-y border-hairline">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="grid grid-cols-[80px_1fr] items-baseline gap-4 py-4"
              >
                <span className="font-mono text-sm text-gold">{item.year}</span>
                <span className="text-sm text-ivory-dim">{item.event}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
