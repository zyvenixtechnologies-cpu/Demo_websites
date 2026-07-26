import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stats } from '@/data/properties'

gsap.registerPlugin(ScrollTrigger)

export function Stats() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])
  const barRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach((stat, i) => {
        const el = valueRefs.current[i]
        const bar = barRefs.current[i]
        if (!el) return

        const proxy = { val: 0 }
        gsap.to(proxy, {
          val: stat.value,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
          onUpdate: () => {
            el.textContent =
              (stat.decimals ? proxy.val.toFixed(stat.decimals) : Math.floor(proxy.val).toString()) +
              stat.suffix
          },
        })

        if (bar) {
          gsap.fromTo(
            bar,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.4,
              ease: 'power3.out',
              transformOrigin: 'left',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                once: true,
              },
            },
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative border-y border-hairline bg-panel/40 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 md:grid-cols-4 md:px-12">
        {stats.map((stat, i) => (
          <div key={stat.id} className="flex flex-col gap-3">
            <span
              ref={(el) => {
                valueRefs.current[i] = el
              }}
              className="font-display text-4xl text-gold md:text-5xl"
            >
              0{stat.suffix}
            </span>
            <span className="label-coord">{stat.label}</span>
            <div className="h-px w-full bg-hairline">
              <div
                ref={(el) => {
                  barRefs.current[i] = el
                }}
                className="h-px w-full origin-left scale-x-0 bg-gold"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
