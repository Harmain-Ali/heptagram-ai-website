'use client'

import { useState } from 'react'
import { Sparkles, Loader2, TrendingUp, Clock, RotateCcw } from 'lucide-react'

type Scenario = {
  id: string
  title: string
  description: string
  costLow: number
  costHigh: number
  timeline: string
  growth: string
  recommended?: boolean
}

const SUGGESTIONS = [
  'Automate my lead follow-up emails',
  'Build an AI voice agent for support',
  'Scrape and qualify job applicants',
]

export function CustomEstimator() {
  const [problem, setProblem] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>(
    'idle',
  )
  const [error, setError] = useState<string | null>(null)
  const [summary, setSummary] = useState<string | null>(null)
  const [scenarios, setScenarios] = useState<Scenario[]>([])

  async function analyze() {
    if (problem.trim().length < 8 || status === 'loading') return
    setStatus('loading')
    setError(null)
    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? 'Something went wrong.')
      setSummary(data.summary ?? null)
      setScenarios(data.scenarios ?? [])
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  function reset() {
    setStatus('idle')
    setScenarios([])
    setSummary(null)
    setError(null)
  }

  const canSubmit = problem.trim().length >= 8 && status !== 'loading'

  return (
    <div className="mt-8 flex flex-1 flex-col">
      {/* Prompt / input */}
      {status !== 'done' && (
        <div className="rounded-2xl border border-white/10 bg-background/40 p-5 md:p-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <Sparkles className="h-4 w-4" />
            AI cost estimator
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Describe the problem you want solved. Our AI analyzes it and maps out
            build scenarios with estimated costs and growth impact.
          </p>

          <label htmlFor="problem" className="sr-only">
            Describe your problem
          </label>
          <textarea
            id="problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                (e.metaKey || e.ctrlKey) &&
                !e.nativeEvent.isComposing &&
                e.keyCode !== 229
              ) {
                e.preventDefault()
                analyze()
              }
            }}
            rows={4}
            placeholder="e.g. My sales team wastes hours manually chasing leads over email and Slack..."
            className="mt-4 w-full resize-none rounded-xl border border-white/15 bg-background/60 p-4 text-sm leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
          />

          {/* Suggestions */}
          <div className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setProblem(s)}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>

          {error && (
            <p className="mt-3 text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={analyze}
            disabled={!canSubmit}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing your problem…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Estimate my cost
              </>
            )}
          </button>
          <p className="mt-2 text-center text-[11px] uppercase tracking-widest text-muted-foreground/70">
            Press ⌘/Ctrl + Enter to run
          </p>
        </div>
      )}

      {/* Results */}
      {status === 'done' && (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                <Sparkles className="h-4 w-4" />
                Estimated scenarios
              </div>
              {summary && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {summary}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={reset}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              New
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            {scenarios.map((s) => (
              <div
                key={s.id}
                className={`rounded-2xl border p-5 ${
                  s.recommended
                    ? 'border-primary/50 bg-primary/[0.07]'
                    : 'border-white/10 bg-background/40'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold uppercase tracking-tight">
                    {s.title}
                  </h3>
                  {s.recommended && (
                    <span className="inline-flex rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>

                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <span className="text-2xl font-bold tabular-nums tracking-tight">
                      ${s.costLow.toLocaleString()}–$
                      {s.costHigh.toLocaleString()}
                    </span>
                    <span className="ml-1 text-xs text-muted-foreground">
                      one-time
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {s.timeline}
                  </span>
                </div>

                <p className="mt-3 flex items-start gap-2 rounded-xl bg-primary/[0.06] p-3 text-xs leading-relaxed text-muted-foreground">
                  <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {s.growth}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Estimates are AI-generated starting points. Final scope is confirmed
            in your consultation.
          </p>
        </div>
      )}
    </div>
  )
}
