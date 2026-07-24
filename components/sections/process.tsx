'use client'

import { Reveal, BlurText } from '@/components/interactive/reveal'
import { MagneticButton } from '@/components/interactive/magnetic-button'

const STEPS = [
  {
    n: '01',
    title: 'Scope',
    body: 'Tell us about your biggest operational bottleneck. We start with a zero-risk consultation requiring 0 contracts to begin.',
  },
  {
    n: '02',
    title: 'Architect',
    body: 'We engineer a bespoke AI automation system designed to solve your specific problem. We build the automation once, and you own the final solution.',
  },
  {
    n: '03',
    title: 'Integrate',
    body: 'Deploy the new system smoothly into your daily operations. Our custom builds integrate seamlessly with the platforms you already use.',
  },
  {
    n: '04',
    title: 'Recover',
    body: 'Stop bleeding margins. Reclaim 15+ hours per employee every week and recover the average $12.5k monthly lost to manual data entry.',
  },
]

export function Process() {
  return (
    <section id="process" className="relative border-t border-white/10 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary">
              <span className="h-px w-8 bg-primary" />
              How it works
            </Reveal>
            <BlurText
              as="h2"
              text={'From your problem\nto a system you own.'}
              className="text-balance text-3xl font-semibold uppercase leading-[1.1] tracking-tight md:text-5xl"
              stagger={0.05}
            />
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 md:grid-cols-2">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.n}
              delay={(i % 2) * 0.1}
              className="group relative bg-background/40 p-8 transition-colors duration-500 hover:bg-primary/[0.06] md:p-10"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm text-primary">{s.n}</span>
                <span className="h-px flex-1 bg-white/10 transition-colors duration-500 group-hover:bg-primary/40" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold uppercase tracking-tight md:text-3xl">
                {s.title}
              </h3>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-10 text-center md:p-14">
          <p className="max-w-2xl text-balance text-xl font-medium leading-relaxed md:text-2xl">
            &ldquo;No contracts. Just a 15-minute session to map out your biggest
            operational bottleneck.&rdquo;
          </p>
          <MagneticButton href="#contact" variant="solid">
            Book a free call
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}
