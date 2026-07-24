'use client'

import { useState } from 'react'
import { Check, Hammer, Sparkles, Calculator } from 'lucide-react'
import { Reveal, BlurText } from '@/components/interactive/reveal'
import { MagneticButton } from '@/components/interactive/magnetic-button'
import { CustomEstimator } from '@/components/sections/custom-estimator'

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

function savingsPct(monthly: number, yearly: number) {
  return Math.round(((monthly * 12 - yearly) / (monthly * 12)) * 100)
}

export function PricingContent() {
  const [active, setActive] = useState(1) // BD Automation by default
  const [yearly, setYearly] = useState(false)
  const [qty, setQty] = useState(30)
  const [features, setFeatures] = useState(0)

  const product = PRODUCTS[active]
  const price = yearly ? product.yearly : product.monthly
  const save = savingsPct(product.monthly, product.yearly)
  const fullYearAtMonthly = product.monthly * 12

  // Calculator — recurring subscription cost + one-time custom features.
  const safeQty = Number.isFinite(qty) && qty > 0 ? Math.floor(qty) : 0
  const safeFeatures =
    Number.isFinite(features) && features > 0 ? Math.floor(features) : 0
  const recurringTotal = price * safeQty
  const featuresTotal = safeFeatures * 100
  const yearlySavings = yearly
    ? (product.monthly * 12 - product.yearly) * safeQty
    : 0

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

            {/* Cost calculator */}
            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 md:p-7">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                <Calculator className="h-4 w-4" />
                Estimate your cost
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Enter how many {product.unit}s you need to run and we&apos;ll
                calculate your {yearly ? 'annual' : 'monthly'} total.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Number of {product.unit}s
                  </span>
                  <div className="flex items-center rounded-xl border border-white/15 bg-background/60 focus-within:border-primary/60">
                    <button
                      type="button"
                      aria-label={`Decrease ${product.unit}s`}
                      onClick={() => setQty((q) => Math.max(0, (q || 0) - 1))}
                      className="px-3 py-2.5 text-lg text-muted-foreground transition-colors hover:text-primary"
                    >
                      &minus;
                    </button>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={Number.isFinite(qty) ? qty : ''}
                      onChange={(e) => setQty(Number.parseInt(e.target.value, 10))}
                      className="w-full min-w-0 bg-transparent px-1 py-2.5 text-center text-lg font-semibold tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      aria-label={`Increase ${product.unit}s`}
                      onClick={() => setQty((q) => (q || 0) + 1)}
                      className="px-3 py-2.5 text-lg text-muted-foreground transition-colors hover:text-primary"
                    >
                      +
                    </button>
                  </div>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Custom features
                  </span>
                  <div className="flex items-center rounded-xl border border-white/15 bg-background/60 focus-within:border-primary/60">
                    <button
                      type="button"
                      aria-label="Decrease custom features"
                      onClick={() =>
                        setFeatures((f) => Math.max(0, (f || 0) - 1))
                      }
                      className="px-3 py-2.5 text-lg text-muted-foreground transition-colors hover:text-primary"
                    >
                      &minus;
                    </button>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={Number.isFinite(features) ? features : ''}
                      onChange={(e) =>
                        setFeatures(Number.parseInt(e.target.value, 10))
                      }
                      className="w-full min-w-0 bg-transparent px-1 py-2.5 text-center text-lg font-semibold tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      aria-label="Increase custom features"
                      onClick={() => setFeatures((f) => (f || 0) + 1)}
                      className="px-3 py-2.5 text-lg text-muted-foreground transition-colors hover:text-primary"
                    >
                      +
                    </button>
                  </div>
                </label>
              </div>

              {/* Breakdown */}
              <dl className="mt-5 flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">
                    {safeQty} {product.unit}
                    {safeQty === 1 ? '' : 's'} &times; ${price}
                    {yearly ? '/yr' : '/mo'}
                  </dt>
                  <dd className="font-semibold tabular-nums">
                    ${recurringTotal.toLocaleString()}
                    {yearly ? '/yr' : '/mo'}
                  </dd>
                </div>
                {safeFeatures > 0 && (
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">
                      {safeFeatures} custom feature
                      {safeFeatures === 1 ? '' : 's'} &times; $100 (one-time)
                    </dt>
                    <dd className="font-semibold tabular-nums">
                      +${featuresTotal.toLocaleString()}
                    </dd>
                  </div>
                )}
                {yearly && yearlySavings > 0 && (
                  <div className="flex items-center justify-between text-primary">
                    <dt>Annual savings vs. monthly</dt>
                    <dd className="font-semibold tabular-nums">
                      &minus;${yearlySavings.toLocaleString()}
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-4">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Estimated total
                </span>
                <span className="text-right">
                  <span className="text-3xl font-bold tabular-nums tracking-tight">
                    ${recurringTotal.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {yearly ? '/yr' : '/mo'}
                  </span>
                  {safeFeatures > 0 && (
                    <span className="block text-xs text-muted-foreground">
                      + ${featuresTotal.toLocaleString()} one-time setup
                    </span>
                  )}
                </span>
              </div>
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

            {/* AI problem-analysis estimator */}
            <CustomEstimator />

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
