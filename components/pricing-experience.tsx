'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SmoothScroll } from '@/components/interactive/smooth-scroll'
import { CustomCursor } from '@/components/interactive/custom-cursor'
import { PricingContent } from '@/components/sections/pricing-content'
import { Footer } from '@/components/sections/footer'

function PricingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="flex w-full max-w-6xl items-center justify-between rounded-full border border-white/10 bg-background/70 px-4 py-2.5 backdrop-blur-xl md:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo-white.svg"
            alt="Heptagram AI logo"
            width={22}
            height={22}
            className="h-5 w-5"
          />
          <span className="text-sm font-semibold uppercase tracking-[0.18em]">
            Heptagram AI
          </span>
        </Link>

        <Link
          href="/"
          className="rounded-full border border-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-white/5"
        >
          Back to Home
        </Link>
      </nav>
    </header>
  )
}

export function PricingExperience() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <PricingHeader />
      <main>
        <PricingContent />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
