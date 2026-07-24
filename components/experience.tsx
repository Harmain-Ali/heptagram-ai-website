'use client'

import { useState } from 'react'
import { SmoothScroll } from '@/components/interactive/smooth-scroll'
import { CustomCursor } from '@/components/interactive/custom-cursor'
import { LoadingScreen } from '@/components/interactive/loading-screen'
import { Navbar } from '@/components/sections/navbar'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Process } from '@/components/sections/process'
import { Products } from '@/components/sections/products'
import { CustomAutomation } from '@/components/sections/custom-automation'
import { Testimonials } from '@/components/sections/testimonials'
import { Footer } from '@/components/sections/footer'

export function Experience() {
  const [loading, setLoading] = useState(true)

  return (
    <SmoothScroll>
      <CustomCursor />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <Navbar />
      <main>
        <Hero ready={!loading} />
        <About />
        <Process />
        <Products />
        <CustomAutomation />
        <Testimonials />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
