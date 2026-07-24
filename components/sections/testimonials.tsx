'use client'

import Image from 'next/image'
import { Reveal, BlurText } from '@/components/interactive/reveal'

const QUOTES = [
  {
    quote:
      'Our recruiters were spending 10 hours a week just filling out applications. BD Automation cut that down to 30 minutes. We placed 6 more engineers in Q3 alone.',
    name: 'Sarah Mitchell',
    role: 'VP of Operations, TalentBridge Solutions (US)',
  },
  {
    quote:
      'VoiceFlow replaced our OpenPhone and a manual call logger. We saved $800/month and finally have real data on which calls are converting.',
    name: 'David Chen',
    role: 'CEO, Apex Staffing (Canada)',
  },
  {
    quote:
      'Interview Copilot gave our junior closers the confidence to handle European clients. Our conversion rate on international calls jumped by 35%.',
    name: 'Emma Roberts',
    role: 'Head of Recruitment, Nexus Talent (UK)',
  },
]

export function Testimonials() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 py-28 md:py-40">
      {/* texture backdrop */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/testimonial.png"
          alt=""
          fill
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Reveal className="mb-4 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-primary">
            <span className="h-px w-8 bg-primary" />
            Trusted by industry leaders
            <span className="h-px w-8 bg-primary" />
          </Reveal>
          <BlurText
            as="h2"
            text={'Across the US & Europe.'}
            className="text-balance text-3xl font-semibold uppercase leading-[1.1] tracking-tight md:text-5xl"
            stagger={0.05}
          />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal
              key={q.name}
              delay={i * 0.1}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-background/50 p-8 backdrop-blur-sm transition-colors duration-500 hover:border-primary/30"
            >
              <p className="text-pretty text-lg leading-relaxed">
                &ldquo;{q.quote}&rdquo;
              </p>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm font-semibold uppercase tracking-wide">
                  {q.name}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {q.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
