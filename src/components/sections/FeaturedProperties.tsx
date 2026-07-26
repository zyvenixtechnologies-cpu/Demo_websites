import { motion } from 'framer-motion'
import { properties } from '@/data/properties'
import { PropertyCard } from './PropertyCard'

export function FeaturedProperties() {
  return (
    <section id="properties" className="relative mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-36">
      <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="label-coord mb-4"
          >
            The Collection
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-xl font-display text-4xl leading-tight text-ivory md:text-5xl"
          >
            Six residences, chosen for what cannot be replicated.
          </motion.h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-ivory-dim">
          Every listing here has been personally walked and verified by our
          acquisitions team — no exceptions, regardless of price.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, i) => (
          <PropertyCard key={property.id} property={property} index={i} />
        ))}
      </div>
    </section>
  )
}
