import { useState } from 'react'
import { CursorProvider } from '@/context/CursorContext'
import { CustomCursor } from '@/components/cursor/CustomCursor'
import { Loader } from '@/components/Loader'
import { Navigation } from '@/components/Navigation'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Hero } from '@/components/sections/Hero'
import { FeaturedProperties } from '@/components/sections/FeaturedProperties'
import { Stats } from '@/components/sections/Stats'
import { About } from '@/components/sections/About'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { useLenis } from '@/lib/useLenis'

function SiteContent() {
  // Smooth scrolling, synced with GSAP's ticker so ScrollTrigger-driven
  // animation (see Stats.tsx) never drifts out of phase with the scroll.
  useLenis()

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <FeaturedProperties />
        <Stats />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <CursorProvider>
      <div className="has-custom-cursor min-h-screen bg-obsidian">
        <CustomCursor />
        {loading && <Loader onComplete={() => setLoading(false)} />}
        {!loading && <SiteContent />}
      </div>
    </CursorProvider>
  )
}

export default App
