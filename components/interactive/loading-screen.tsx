'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
    lenis?.stop()

    const logo = logoRef.current!
    const root = rootRef.current!

    // Spin: start extremely fast, decelerate to a slow, calm rotation.
    const spin = gsap.to(logo, {
      rotation: 360,
      duration: 0.28,
      repeat: -1,
      ease: 'none',
    })
    // Ease the timeScale from very fast (8x) down to slow (0.5x)
    gsap.fromTo(
      spin,
      { timeScale: 8 },
      { timeScale: 0.5, duration: 2.4, ease: 'power2.out' },
    )

    // Progress counter driving the bar + number
    const progress = { value: 0 }
    const tl = gsap.timeline({
      onUpdate: () => setCount(Math.round(progress.value)),
    })
    tl.to(progress, { value: 100, duration: 2.6, ease: 'power2.inOut' })
    if (barRef.current) {
      tl.to(barRef.current, { scaleX: 1, duration: 2.6, ease: 'power2.inOut' }, 0)
    }
    tl.call(() => setDone(true))
    // Slow the spin to a graceful stop, then reveal the site
    tl.to(spin, { timeScale: 0, duration: 0.6, ease: 'power3.out' }, '>-0.1')
    tl.to(
      logo,
      { scale: 1.15, duration: 0.5, ease: 'power3.out' },
      '<',
    )
    tl.to(
      root,
      {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
        onComplete: () => {
          lenis?.start()
          onComplete()
        },
      },
      '+=0.15',
    )

    return () => {
      spin.kill()
      tl.kill()
      lenis?.start()
    }
  }, [onComplete])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
    >
      <div ref={logoRef} className="relative h-24 w-24">
        <div className="absolute inset-0 rounded-full bg-primary/25 blur-3xl" />
        <Image
          src="/logo-white.svg"
          alt="Heptagram AI"
          fill
          priority
          className="object-contain drop-shadow-[0_0_25px_oklch(0.88_0.21_128_/_0.6)]"
        />
      </div>

      <div className="mt-10 flex w-44 flex-col items-center gap-3">
        <div className="h-px w-full overflow-hidden bg-white/10">
          <div
            ref={barRef}
            className="h-full w-full origin-left scale-x-0 bg-primary"
          />
        </div>
        <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
          {done ? 'READY' : `${count.toString().padStart(3, '0')}%`}
        </span>
      </div>
    </div>
  )
}
