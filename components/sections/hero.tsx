'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BlurText } from '@/components/interactive/reveal'
import { MagneticButton } from '@/components/interactive/magnetic-button'

export function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Idle float + slow rotation + scroll parallax
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.to(logoRef.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: 'none',
      })
      gsap.to(logoRef.current, {
        y: 18,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to(imageRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to(contentRef.current, {
        yPercent: -12,
        autoAlpha: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Entrance once loading finishes
  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { scale: 0.6, autoAlpha: 0, filter: 'blur(30px)' },
        {
          scale: 1,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'power3.out',
        },
      )
      gsap.fromTo(
        '[data-hero-fade]',
        { autoAlpha: 0, y: 30, filter: 'blur(10px)' },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.12,
          delay: 0.5,
          ease: 'power3.out',
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [ready])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-svh items-center justify-center overflow-hidden pt-28"
    >
      {/* Background texture */}
      <div ref={imageRef} className="absolute inset-0 -z-10 scale-110">
        <Image
          src="/images/hero.png"
          alt=""
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_78%)]" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        {/* Glowing asterisk */}
        <div className="relative mb-8 h-28 w-28 md:h-36 md:w-36">
          <div className="absolute inset-0 scale-150 rounded-full bg-primary/20 blur-3xl" />
          <div ref={logoRef} className="relative h-full w-full">
            <Image
              src="/logo-white.svg"
              alt="Heptagram AI"
              fill
              priority
              className="object-contain drop-shadow-[0_0_35px_oklch(0.88_0.21_128_/_0.55)]"
            />
          </div>
        </div>

        <div ref={contentRef} className="flex flex-col items-center">
          <span
            data-hero-fade
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            You own the solution
          </span>

          <BlurText
            as="h1"
            text={'Stop managing manual chaos.\nScale with custom AI automation.'}
            className="max-w-5xl text-balance text-3xl font-semibold uppercase leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem]"
            stagger={0.06}
            play={ready}
            delay={0.4}
          />

          <p
            data-hero-fade
            className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Why rent fragmented software when you can own the solution? We build
            custom AI automation systems where you only pay for the build —
            never the subscription.
          </p>

          <div
            data-hero-fade
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <MagneticButton href="#contact" variant="solid">
              Tell us your problem
            </MagneticButton>
            <MagneticButton href="#products" variant="outline">
              Explore our solutions
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
