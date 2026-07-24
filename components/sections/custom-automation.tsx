'use client'

import { Reveal, BlurText } from '@/components/interactive/reveal'
import { MagneticButton } from '@/components/interactive/magnetic-button'

export function CustomAutomation() {
  return (
    <section className="relative border-t border-white/10 py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal className="mb-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary">
          <span className="h-px w-8 bg-primary" />
          Bespoke builds
          <span className="h-px w-8 bg-primary" />
        </Reveal>

        <BlurText
          as="h2"
          text={'Your workflow is unique.\nYour automation should be too.'}
          className="mx-auto max-w-4xl text-balance text-3xl font-semibold uppercase leading-[1.05] tracking-tight md:text-6xl"
          stagger={0.05}
        />

        <Reveal
          as="p"
          delay={0.1}
          className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          If our proven products don&apos;t cover your exact manual chaos,
          let&apos;s build the one that does. We&apos;ll scope, design, and
          deploy a custom AI architecture specifically for your internal
          processes.
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <MagneticButton href="#contact" variant="solid">
            Tell us your problem
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}
