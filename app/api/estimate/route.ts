import { NextResponse } from 'next/server'

/**
 * POST /api/estimate
 *
 * Custom-build cost estimator endpoint.
 *
 * The client sends the user's problem description here. This is where the
 * backend AI should analyze the problem and return one or more solution /
 * growth scenarios with estimated costs.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * TODO(backend): Replace the mocked `scenarios` below with a real AI call.
 *
 * Recommended flow:
 *   1. Read `problem` from the request body.
 *   2. Call your model (e.g. AI SDK `generateObject`) with a schema that
 *      matches the `Scenario` shape returned below.
 *   3. Return the structured scenarios as JSON.
 *
 * The response contract the UI expects is:
 *   { scenarios: Scenario[], summary?: string }
 * where Scenario = {
 *   id: string
 *   title: string
 *   description: string
 *   costLow: number        // one-time build cost, lower bound (USD)
 *   costHigh: number       // one-time build cost, upper bound (USD)
 *   timeline: string       // e.g. "2–3 weeks"
 *   growth: string         // projected impact / ROI narrative
 *   recommended?: boolean
 * }
 * ─────────────────────────────────────────────────────────────────────────
 */

export type Scenario = {
  id: string
  title: string
  description: string
  costLow: number
  costHigh: number
  timeline: string
  growth: string
  recommended?: boolean
}

export async function POST(request: Request) {
  const { problem } = (await request.json().catch(() => ({}))) as {
    problem?: string
  }

  if (!problem || problem.trim().length < 8) {
    return NextResponse.json(
      { error: 'Please describe your problem in a little more detail.' },
      { status: 400 },
    )
  }

  // ── MOCK RESPONSE ─────────────────────────────────────────────────────
  // Deterministic placeholder scenarios so the UI is fully functional.
  // Delete this block once the AI analysis above is wired in.
  await new Promise((r) => setTimeout(r, 1200)) // simulate model latency

  const scenarios: Scenario[] = [
    {
      id: 'lean',
      title: 'Lean MVP',
      description:
        'A focused build that automates the single highest-impact part of your workflow to prove value fast.',
      costLow: 2500,
      costHigh: 4000,
      timeline: '2–3 weeks',
      growth:
        'Reclaim ~10 hrs/week of manual work and validate the automation before scaling.',
    },
    {
      id: 'growth',
      title: 'Growth System',
      description:
        'An end-to-end system covering the full process with integrations into your existing stack.',
      costLow: 6000,
      costHigh: 9000,
      timeline: '4–6 weeks',
      growth:
        'Handle 3–5x current volume with no added headcount and compounding efficiency gains.',
      recommended: true,
    },
    {
      id: 'scale',
      title: 'Scale & Autonomy',
      description:
        'A fully autonomous, self-monitoring platform with analytics and multi-team rollout.',
      costLow: 12000,
      costHigh: 20000,
      timeline: '8–12 weeks',
      growth:
        'Operate at enterprise scale with predictable unit economics and near-zero manual oversight.',
    },
  ]

  return NextResponse.json({
    summary:
      'Based on your problem, here are three ways we could build and scale a solution.',
    scenarios,
  })
  // ──────────────────────────────────────────────────────────────────────
}
