import type { Metadata } from 'next'
import { TermsExperience } from '@/components/terms-experience'

export const metadata: Metadata = {
  title: 'Terms & Conditions — Heptagram AI',
  description:
    'The Terms & Conditions governing every engagement, pilot, and paid deployment between Heptagram AI and its clients.',
}

export default function TermsPage() {
  return <TermsExperience />
}
