import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/cursor/MagneticButton'

function FloatingField({ label, type = 'text' }: { label: string; type?: string }) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder=" "
        className="peer w-full border-b border-hairline bg-transparent py-3 text-ivory outline-none transition-colors focus:border-gold"
      />
      <label className="pointer-events-none absolute left-0 top-3 text-sm text-ivory-dim transition-all duration-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs">
        {label}
      </label>
    </div>
  )
}

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-36">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <div>
          <p className="label-coord mb-4">Private Enquiries</p>
          <h2 className="max-w-md font-display text-4xl leading-tight text-ivory md:text-5xl">
            Speak with a partner, not a call centre.
          </h2>
          <div className="mt-10 flex flex-col gap-6 text-sm text-ivory-dim">
            <div>
              <p className="label-coord mb-1">Headquarters</p>
              <p>14 Rue du Rhône, Geneva, Switzerland</p>
            </div>
            <div>
              <p className="label-coord mb-1">Direct Line</p>
              <p>+41 22 555 0134</p>
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-8 rounded-2xl border border-hairline bg-panel/50 p-8 backdrop-blur-md md:p-10"
        >
          <FloatingField label="Full name" />
          <FloatingField label="Email address" type="email" />
          <FloatingField label="Budget range" />
          <MagneticButton type="submit" cursorLabel="Send" cursorVariant="button" className="mt-2 self-start">
            Request Introduction
          </MagneticButton>
        </motion.form>
      </div>
    </section>
  )
}
