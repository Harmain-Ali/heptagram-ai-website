import type { Metadata } from 'next'
import { PricingExperience } from '@/components/pricing-experience'

export const metadata: Metadata = {
  title: 'Pricing — Heptagram AI',
  description:
    'Subscribe to a proven AI product priced per unit, or commission a one-time custom build you own outright. Simple monthly and yearly plans, no long-term contracts.',
}

export default function PricingPage() {
  return <PricingExperience />
}
