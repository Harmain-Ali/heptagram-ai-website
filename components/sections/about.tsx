'use client'

import { Reveal, BlurText } from '@/components/interactive/reveal'

const STATS = [
  { value: '15+', label: 'Hours reclaimed / employee weekly' },
  { value: '$12.5k', label: 'Monthly margin recovered on average' },
  { value: '0', label: 'Subscriptions. You own the build' },
]

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <Reveal className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary">
        <span className="h-px w-8 bg-primary" />
        We engineer autonomous systems
      </Reveal>

      <BlurText
        as="h2"
        text={'We turn operational bottlenecks into assets you own.'}
        className="max-w-4xl text-balance text-3xl font-semibold uppercase leading-[1.1] tracking-tight md:text-5xl"
        stagger={0.05}
      />

      <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
        <Reveal
          as="p"
          className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          At Heptagram AI, we don&apos;t believe in endless software
          subscriptions or manual busywork. We are a specialized AI engineering
          agency that transforms your biggest operational bottlenecks into
          proprietary, automated assets. Instead of renting fragmented tools
          forever, we architect custom intelligence that your business owns
          outright.
        </Reveal>
        <Reveal
          as="p"
          delay={0.1}
          className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Most businesses are trapped renting rigid SaaS products that only
          solve half of their problem. To bridge the gap, they rely on manual
          data entry, copy-pasting, and disconnected systems. We exist to
          eliminate that friction. We believe that if a business process is
          repeatable, it should be autonomous.
        </Reveal>
      </div>

      <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-3">
        {STATS.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.1}
            className="bg-background/40 p-8"
          >
            <div className="text-4xl font-semibold text-primary md:text-5xl">
              {s.value}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
