'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BlurText, Reveal } from '@/components/interactive/reveal'
import { MagneticButton } from '@/components/interactive/magnetic-button'

export function Footer() {
  const logoRef = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.to(logoRef.current, {
        rotation: 360,
        duration: 45,
        repeat: -1,
        ease: 'none',
      })
      gsap.fromTo(
        wordmarkRef.current,
        { yPercent: 40, autoAlpha: 0, filter: 'blur(16px)' },
        {
          yPercent: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wordmarkRef.current,
            start: 'top 95%',
          },
        },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-white/10 pt-28 md:pt-40"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-10 h-20 w-20">
            <div className="absolute inset-0 scale-150 rounded-full bg-primary/20 blur-3xl" />
            <div ref={logoRef} className="relative h-full w-full">
              <Image
                src="/logo-white.svg"
                alt="Heptagram AI"
                fill
                className="object-contain drop-shadow-[0_0_25px_oklch(0.88_0.21_128_/_0.5)]"
              />
            </div>
          </div>

          <BlurText
            as="h2"
            text={'Your competitors are automating.\nAre you?'}
            className="mx-auto max-w-4xl text-balance text-4xl font-semibold uppercase leading-[1.02] tracking-tight md:text-7xl"
            stagger={0.05}
          />

          <Reveal
            delay={0.15}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <MagneticButton href="mailto:info@heptagram-ai.com" variant="solid">
              Tell us your problem
            </MagneticButton>
            <MagneticButton href="#products" variant="outline">
              Explore our solutions
            </MagneticButton>
          </Reveal>
        </div>

        {/* Contact / links row */}
        <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-white/10 py-8 text-sm md:flex-row">
          <a
            href="mailto:info@heptagram-ai.com"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            info@heptagram-ai.com
          </a>
          <nav className="flex items-center gap-6 text-xs uppercase tracking-widest text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              WhatsApp
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              LinkedIn
            </a>
            <a
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms
            </a>
          </nav>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            © 2026 Heptagram AI — All rights reserved
          </p>
        </div>
      </div>

      {/* Giant wordmark */}
      <div
        ref={wordmarkRef}
        className="pointer-events-none select-none px-6 pb-6 pt-10"
      >
        <p className="bg-gradient-to-b from-foreground/15 to-foreground/[0.02] bg-clip-text text-center text-[16vw] font-bold uppercase leading-none tracking-tighter text-transparent">
          Heptagram
        </p>
      </div>
    </footer>
  )
}
