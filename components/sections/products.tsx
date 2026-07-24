'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Reveal, BlurText } from '@/components/interactive/reveal'

const PRODUCTS = [
  {
    n: '01',
    name: 'VoiceFlow',
    tag: 'Voice CRM',
    body: 'A proprietary voice CRM engineered for high-volume recruiting and sales teams. We eliminate scattered communications by building a centralized engine where every call and message is routed, logged, and scored completely autonomously.',
  },
  {
    n: '02',
    name: 'BD Automation',
    tag: 'Application Engine',
    body: 'A proprietary application engine that scrapes job boards, tailors a CV for each listing, and submits the application fully unattended. No recruiter ever touches the process, freeing your team to focus exclusively on closing.',
  },
  {
    n: '03',
    name: 'BD Inbox',
    tag: 'Email Routing',
    body: 'A high-volume email management engine that reads, classifies, and routes every business-development email into the right pipeline stage the moment it lands. It organizes your communications before a human ever opens them.',
  },
  {
    n: '04',
    name: 'ChiefStaff',
    tag: 'Executive Assistant',
    body: 'An autonomous executive assistant engineered to sit in your meetings, read your inbox, distribute follow-up work, and screen your next hire. Not a basic chatbot — an intelligent operational system that never forgets a detail.',
  },
  {
    n: '05',
    name: 'FaceSwap',
    tag: 'Video Inference',
    body: 'A proprietary video inference engine that renders a new, consistent identity on top of a live video feed in real-time. Built for global, high-stakes environments with latency so low your clients will never notice the swap.',
  },
  {
    n: '06',
    name: 'Interview Copilot',
    tag: 'Confidence Tool',
    body: 'An intelligent assistant that listens in real-time and surfaces strategic cues: what to emphasize, what to ask, and when to pause. Not a cheating tool — a confidence tool engineered to support your team in high-stakes conversations.',
  },
]

export function Products() {
  const [active, setActive] = useState(0)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const tagRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    gsap.fromTo(
      [tagRef.current, bodyRef.current],
      { autoAlpha: 0, filter: 'blur(10px)', y: 14 },
      {
        autoAlpha: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power3.out',
      },
    )
  }, [active])

  return (
    <section
      id="products"
      className="relative border-t border-white/10 py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary">
          <span className="h-px w-8 bg-primary" />
          Proven solutions
        </Reveal>
        <BlurText
          as="h2"
          text={'Systems already in production.'}
          className="max-w-3xl text-balance text-3xl font-semibold uppercase leading-[1.1] tracking-tight md:text-5xl"
          stagger={0.05}
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* List */}
          <ul className="flex flex-col">
            {PRODUCTS.map((p, i) => (
              <li key={p.n}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center gap-5 border-b border-white/10 py-6 text-left transition-colors"
                >
                  <span
                    className={`font-mono text-sm transition-colors ${
                      active === i ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {p.n}
                  </span>
                  <span
                    className={`text-2xl font-semibold uppercase tracking-tight transition-all duration-300 md:text-4xl ${
                      active === i
                        ? 'translate-x-1 text-foreground'
                        : 'text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground'
                    }`}
                  >
                    {p.name}
                  </span>
                  <span
                    className={`ml-auto h-2 w-2 rounded-full transition-all duration-300 ${
                      active === i
                        ? 'scale-100 bg-primary'
                        : 'scale-0 bg-primary'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Detail panel */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <span
                ref={tagRef}
                className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-widest text-primary"
              >
                {PRODUCTS[active].tag}
              </span>
              <h3 className="mt-6 text-3xl font-semibold uppercase tracking-tight md:text-4xl">
                {PRODUCTS[active].name}
              </h3>
              <p
                ref={bodyRef}
                className="mt-5 text-pretty leading-relaxed text-muted-foreground md:text-lg"
              >
                {PRODUCTS[active].body}
              </p>
              <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <span className="font-mono text-primary">
                  {PRODUCTS[active].n}
                </span>
                / 06
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
