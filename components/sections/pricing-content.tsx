'use client'

import { useState } from 'react'
import {
  Check,
  MessageSquareText,
  Hammer,
  FlaskConical,
  BadgeDollarSign,
  Sparkles,
} from 'lucide-react'
import { Reveal, BlurText } from '@/components/interactive/reveal'
import { MagneticButton } from '@/components/interactive/magnetic-button'

/**
 * Subscription products. Prices are placeholders — edit the `monthly`
 * (per-unit, per-month) and `yearly` (per-unit, per-year) numbers freely.
 */
const PRODUCTS = [
  {
    name: 'VoiceFlow',
    tag: 'Voice CRM',
    unit: 'profile',
    monthly: 8,
    yearly: 86,
    blurb:
      'Centralized voice CRM that routes, logs, and scores every call and message autonomously.',
  },
  {
    name: 'BD Automation',
    tag: 'Application Engine',
    unit: 'profile',
    monthly: 6,
    yearly: 65,
    blurb:
      'Scrapes job boards, tailors a CV per listing, and submits applications fully unattended.',
  },
  {
    name: 'BD Inbox',
    tag: 'Email Routing',
    unit: 'profile',
    monthly: 5,
    yearly: 54,
    blurb:
      'Reads, classifies, and routes every business-development email into the right pipeline stage.',
  },
  {
    name: 'ChiefStaff',
    tag: 'Executive Assistant',
    unit: 'seat',
    monthly: 12,
    yearly: 130,
    blurb:
      'An autonomous assistant that sits in meetings, reads your inbox, and distributes follow-up work.',
  },
  {
    name: 'FaceSwap',
    tag: 'Video Inference',
    unit: 'stream',
    monthly: 15,
    yearly: 162,
    blurb:
      'Real-time video inference engine that renders a consistent identity on a live feed at ultra-low latency.',
  },
  {
    name: 'Interview Copilot',
    tag: 'Confidence Tool',
    unit: 'profile',
    monthly: 9,
    yearly: 97,
    blurb:
      'Listens in real-time and surfaces strategic cues on what to emphasize, ask, and when to pause.',
  },
]

const CUSTOM_STEPS = [
  {
    icon: MessageSquareText,
    title: 'Tell us your problem',
    body: 'Share your biggest operational bottleneck in a zero-risk consultation. No contracts to begin.',
  },
  {
    icon: Hammer,
    title: 'We build the solution',
    body: 'We scope, design, and engineer a bespoke AI system built specifically for your workflow.',
  },
  {
    icon: FlaskConical,
    title: 'Test it',
    body: 'Put the system to work against your real processes and confirm it solves the problem end-to-end.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Pay only if satisfied',
    body: 'Happy with the build? You pay once and own the finished product outright — no subscription.',
  },
]

function savingsPct(monthly: number, yearly: number) {
  return Math.round(((monthly * 12 - yearly) / (monthly * 12)) * 100)
}

export function PricingContent() {
  const [active, setActive] = useState(1) // BD Automation by default
  const [yearly, setYearly] = useState(false)

  const product = PRODUCTS[active]
  const price = yearly ? product.yearly : product.monthly
  const save = savingsPct(product.monthly, product.yearly)
  const fullYearAtMonthly = product.monthly * 12

  return (
    <section className="relative pt-36 pb-28 md:pt-44 md:pb-40">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-24 -z-10 mx-auto h-72 max-w-3xl rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="text-center">
          <Reveal className="mb-4 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary">
            <span className="h-px w-8 bg-primary" />
            Pricing
            <span className="h-px w-8 bg-primary" />
          </Reveal>
          <BlurText
            as="h1"
            text={'Pricing built around\nhow you grow.'}
            className="mx-auto max-w-3xl text-balance text-4xl font-semibold uppercase leading-[1.05] tracking-tight md:text-6xl"
            stagger={0.05}
          />
          <Reveal
            as="p"
            delay={0.1}
            className="mx-auto mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground md:text-lg"
          >
            Subscribe to a proven product priced per unit, or commission a
            one-time custom build. Either way, no long-term contracts to start.
          </Reveal>
        </div>

        {/* Billing toggle */}
        <Reveal
          delay={0.15}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={`rounded-full px-6 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
                !yearly
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
                yearly
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  yearly
                    ? 'bg-primary-foreground/15 text-primary-foreground'
                    : 'bg-primary/15 text-primary'
                }`}
              >
                Save up to {savingsPct(PRODUCTS[4].monthly, PRODUCTS[4].yearly)}%
              </span>
            </button>
          </div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {yearly ? 'Billed annually — pay upfront, save more' : 'Billed month to month'}
          </p>
        </Reveal>

        {/* Two cards */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Card 1 — Subscription SaaS */}
          <Reveal className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary">
              <Sparkles className="h-4 w-4" />
              Subscription products
            </div>
            <h2 className="mt-4 text-2xl font-semibold uppercase tracking-tight md:text-3xl">
              Ready-made SaaS
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Pick one of our six production systems and pay per unit. Scale up
              or down anytime.
            </p>

            {/* Product selector */}
            <div className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
                Select a product
              </p>
              <div className="flex flex-wrap gap-2">
                {PRODUCTS.map((p, i) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
                      active === i
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-white/15 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price display */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-background/40 p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-widest text-primary">
                  {product.tag}
                </span>
                {yearly && (
                  <span className="inline-flex items-center rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    Save {save}%
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-end gap-2">
                <span className="text-5xl font-bold tracking-tight md:text-6xl">
                  ${price}
                </span>
                <span className="mb-2 text-sm text-muted-foreground">
                  {`/ ${product.unit} · ${yearly ? 'per year' : 'per month'}`}
                </span>
              </div>

              {yearly ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="text-muted-foreground/60 line-through">
                    ${fullYearAtMonthly}
                  </span>{' '}
                  billed monthly for a year — you keep ${fullYearAtMonthly - price}{' '}
                  per {product.unit}.
                </p>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  Switch to yearly to save {save}% — ${product.yearly} / {product.unit}.
                </p>
              )}

              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                {product.blurb}
              </p>
            </div>

            {/* Features / notes */}
            <ul className="mt-6 flex flex-col gap-3 text-sm">
              {[
                'Full onboarding & integration into your existing tools',
                'Autonomous operation — no babysitting required',
                'Custom features — $100 per new full feature',
                'Cancel or rescale anytime, no lock-in',
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <MagneticButton href="#contact" variant="solid" className="w-full">
                Contact sales
              </MagneticButton>
              <p className="mt-3 text-center text-xs uppercase tracking-widest text-muted-foreground">
                Book a 15-minute meeting to get started
              </p>
            </div>
          </Reveal>

          {/* Card 2 — Custom products */}
          <Reveal
            delay={0.1}
            className="flex flex-col rounded-3xl border border-primary/25 bg-primary/[0.04] p-8 md:p-10"
          >
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary">
              <Hammer className="h-4 w-4" />
              Custom builds
            </div>
            <h2 className="mt-4 text-2xl font-semibold uppercase tracking-tight md:text-3xl">
              Bespoke products
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Need something our products don&apos;t cover? We build a one-time
              solution you own outright — you only pay when you&apos;re
              satisfied.
            </p>

            {/* Steps */}
            <ol className="mt-8 flex flex-col gap-4">
              {CUSTOM_STEPS.map((s, i) => (
                <li
                  key={s.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-background/40 p-4 md:p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-primary">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-base font-semibold uppercase tracking-tight">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Pricing note */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-background/40 p-6 text-center md:p-8">
              <p className="text-3xl font-bold tracking-tight md:text-4xl">
                Custom quote
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Priced on project scope & requirements — one-time payment, no
                subscription.
              </p>
            </div>

            <div className="mt-auto pt-8">
              <MagneticButton
                href="mailto:info@heptagram-ai.com"
                variant="outline"
                className="w-full"
              >
                Contact our team
              </MagneticButton>
              <p className="mt-3 text-center text-xs uppercase tracking-widest text-muted-foreground">
                Tell us your problem — we&apos;ll map the solution
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
