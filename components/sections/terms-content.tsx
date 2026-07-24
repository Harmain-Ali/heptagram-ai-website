'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BlurText, Reveal } from '@/components/interactive/reveal'

type Block =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'sub'; heading: string; text: string }

type Section = {
  id: string
  num: number
  title: string
  blocks: Block[]
}

const SECTIONS: Section[] = [
  {
    id: 'acceptance',
    num: 1,
    title: 'Acceptance of Terms',
    blocks: [
      {
        type: 'p',
        text: 'By engaging Heptagram AI ("Heptagram," "we," "us," or "our") for any product, pilot, or service, including but not limited to FaceSwap, VoiceFlow, BD Inbox, BD Automation, Interview Copilot, and ChiefStaff (collectively, the "Services"), you ("Client," "you") agree to be bound by these Terms & Conditions ("Terms"). If you do not agree, do not use or purchase the Services. If you accept these Terms on behalf of a company or other legal entity, you represent that you have authority to bind that entity.',
      },
    ],
  },
  {
    id: 'who-we-are',
    num: 2,
    title: 'Who We Are',
    blocks: [
      {
        type: 'p',
        text: 'Heptagram AI is an automation systems provider building custom, one-time deployed software solutions for staffing, recruiting, and business-development teams. We provide products and services on both a project (one-time) and ongoing pilot/consulting basis, and act at all times as an independent contractor, not as an employee, agent, joint venturer, or partner of the Client.',
      },
    ],
  },
  {
    id: 'description',
    num: 3,
    title: 'Description of Services',
    blocks: [
      {
        type: 'p',
        text: 'Heptagram builds and delivers automation tools that a Client deploys within its own environment, including:',
      },
      {
        type: 'ul',
        items: [
          'BD Automation: automated job-listing discovery, CV tailoring, and application submission.',
          'BD Inbox: automated classification and routing of business-development email.',
          'VoiceFlow: automated call routing, logging, and reporting.',
          'Interview Copilot: real-time structural guidance provided to a candidate during a live interview.',
          'FaceSwap: real-time identity overlay for video calls.',
          'ChiefStaff: an AI Chief of Staff for executives that captures meeting notes, triages email, delegates tasks, sources and screens hiring candidates, and reports on competitor and market activity.',
        ],
      },
      {
        type: 'p',
        text: 'Unless otherwise agreed in writing, Services are delivered as a configured deployment of Heptagram\u2019s software onto infrastructure controlled by the Client or a third-party host chosen by the Client. Heptagram does not operate, monitor, or guarantee uptime of Client-hosted deployments unless a separate managed-hosting agreement is signed.',
      },
    ],
  },
  {
    id: 'zero-risk-pilot',
    num: 4,
    title: 'The Zero-Risk Pilot',
    blocks: [
      {
        type: 'p',
        text: 'Where Heptagram offers a "zero-risk pilot" or equivalent trial arrangement, the specific scope, duration, success criteria, and outcome of that pilot will be set out in writing (including by email or the intake form the Client completes) before work begins. Only the criteria stated in that written scope determine whether the pilot fee (if any) is waived or refunded. Marketing statements describing typical or illustrative outcomes (for example, expected response counts within a stated period) are estimates based on prior engagements and are not a guarantee for any specific Client, whose results depend on factors outside Heptagram\u2019s control, including the Client\u2019s own job postings, market conditions, and third-party platform behavior.',
      },
    ],
  },
  {
    id: 'fees',
    num: 5,
    title: 'Fees & Payment Model',
    blocks: [
      {
        type: 'p',
        text: 'Heptagram\u2019s standard commercial model is a one-time build and deployment fee per product, rather than a recurring software license or subscription fee charged by Heptagram. Once delivered and accepted, the Client owns the deployed configuration for continued use, subject to Section 7 (Intellectual Property).',
      },
      {
        type: 'ul',
        items: [
          'Invoices are due on the schedule stated in the applicable order form, statement of work, or invoice. Late payments may accrue interest at the maximum rate permitted by applicable law and may result in suspension of support or delivery.',
          'All fees are quoted exclusive of applicable taxes, duties, and withholding, which are the Client\u2019s responsibility unless local law places the obligation on Heptagram.',
          'Except where required by law or expressly agreed in a written pilot scope, fees for work already performed or delivered are non-refundable.',
          'Optional ongoing support, monitoring, updates, or feature work beyond the original one-time build may be offered under a separate paid arrangement, which the Client is free to decline.',
        ],
      },
    ],
  },
  {
    id: 'hosting',
    num: 6,
    title: 'Hosting & Third-Party Costs',
    blocks: [
      {
        type: 'p',
        text: 'Because Heptagram charges once for the build rather than a recurring platform fee, the Client is responsible for arranging and paying, directly to the relevant provider, for:',
      },
      {
        type: 'ul',
        items: [
          'Web, application, or server hosting required to run the deployed automation;',
          'Any large-language-model, speech, telephony, email, or other third-party API provider used by the deployment (for example, an LLM provider\u2019s usage-based API fees); and',
          'Any software licenses, phone numbers, sending domains, or accounts the automation connects to on the Client\u2019s behalf.',
        ],
      },
      {
        type: 'p',
        text: 'Heptagram is not responsible for price changes, rate limits, outages, or policy changes made by these third-party providers, and is not liable for costs the Client incurs directly with them.',
      },
    ],
  },
  {
    id: 'ip',
    num: 7,
    title: 'Intellectual Property',
    blocks: [
      {
        type: 'p',
        text: 'Subject to full payment, Heptagram grants the Client a perpetual, non-exclusive, non-transferable license to use the specific configured deployment delivered to the Client for the Client\u2019s own internal business purposes. Heptagram retains all right, title, and interest in its underlying frameworks, models, templates, source libraries, and general methodology ("Heptagram IP"), whether or not incorporated into a Client deployment, and nothing in these Terms transfers ownership of Heptagram IP to the Client. The Client may not resell, sublicense, white-label, or redistribute the Services or Heptagram IP to third parties without a separate written agreement. All Client data, candidate data, and Client-owned content remain the property of the Client.',
      },
    ],
  },
  {
    id: 'client-responsibilities',
    num: 8,
    title: 'Client Responsibilities',
    blocks: [
      { type: 'p', text: 'The Client is solely responsible for:' },
      {
        type: 'ul',
        items: [
          'The accuracy and legality of all data, job postings, candidate information, scripts, and content it provides for use by the Services;',
          'Obtaining any consents, disclosures, or licenses required by law before using automated calling, recording, email, or identity-overlay features on real individuals;',
          'Compliance with the terms of service of any third-party platform the Services interact with (job boards, email providers, telephony carriers, video-conferencing platforms, ATS/CRM systems, and similar); and',
          'Maintaining the confidentiality of any credentials, API keys, or access Heptagram is given to configure the deployment.',
        ],
      },
    ],
  },
  {
    id: 'product-compliance',
    num: 9,
    title: 'Product-Specific Compliance',
    blocks: [
      {
        type: 'p',
        text: 'The Services automate activities that carry jurisdiction-specific legal obligations. The Client agrees to the following, product by product:',
      },
      {
        type: 'sub',
        heading: 'BD Automation',
        text: 'Automated submission of job applications must comply with the terms of service of each job board or portal used. The Client is responsible for confirming that automated or bulk submission is permitted on any platform it directs the Service to use.',
      },
      {
        type: 'sub',
        heading: 'BD Inbox',
        text: 'Automated processing of business email may involve personal data of candidates, clients, or employees. The Client is responsible for having a lawful basis to process that data under applicable data-protection law (see Section 11).',
      },
      {
        type: 'sub',
        heading: 'VoiceFlow',
        text: 'Call recording, logging, and routing are subject to consent requirements that vary by jurisdiction, including one-party and two-party (all-party) consent rules under U.S. state law, and consent and transparency obligations under the laws of other countries. The Client is solely responsible for obtaining any consent required before a call is recorded, logged, or analyzed, and for complying with applicable telemarketing and do-not-call rules (including the U.S. Telephone Consumer Protection Act, where applicable).',
      },
      {
        type: 'sub',
        heading: 'Interview Copilot',
        text: 'Interview Copilot is designed to give a candidate structural, confidence-building guidance during a live interview, not to supply answers the candidate did not generate. The Client and any candidate using this Service are responsible for complying with the interviewing employer\u2019s own policies on permitted tools and for disclosing the use of assistive tools where required to do so.',
      },
      {
        type: 'sub',
        heading: 'FaceSwap',
        text: 'Real-time identity overlay on a video call must only be used where all participants have been informed that a visual overlay is in use, or where the Client has an independent lawful basis (for example, an authorized agent appearing under a consistent brand identity with the knowledge of their employer). The Client must not use this Service to impersonate a specific real, identifiable individual without that individual\u2019s consent, or for any fraudulent, deceptive, or unlawful purpose, and confirms it will comply with applicable synthetic-media, deepfake-disclosure, and consumer-protection laws in the jurisdictions where it operates.',
      },
      {
        type: 'sub',
        heading: 'ChiefStaff',
        text: 'ChiefStaff processes meeting recordings or transcripts, email content, and employee-related information on the Client\u2019s behalf, and may connect to third-party hiring and professional-networking platforms (including LinkedIn) to source or screen candidates. The Client is responsible for: obtaining consent from meeting participants and employees before their communications or performance data are processed, in line with applicable workplace surveillance and data-protection law; ensuring any connected platform\u2019s own terms of service permit the automated or assisted use the Client has requested, since several major platforms restrict automated data collection or outreach by their own rules; and using any competitor or market intelligence gathered only through lawful, public, or properly licensed sources.',
      },
    ],
  },
  {
    id: 'acceptable-use',
    num: 10,
    title: 'Acceptable Use',
    blocks: [
      {
        type: 'p',
        text: 'The Client will not use the Services to: violate any applicable law; harass, defraud, or impersonate any person without lawful basis and consent; send unsolicited bulk communications in violation of anti-spam law (including CAN-SPAM); infringe the intellectual property or privacy rights of any third party; or attempt to reverse-engineer, resell, or circumvent the licensing of Heptagram IP. Heptagram may suspend or terminate Services immediately, without refund, upon reasonable belief that this Section has been violated.',
      },
    ],
  },
  {
    id: 'data-privacy',
    num: 11,
    title: 'Data & Privacy',
    blocks: [
      {
        type: 'p',
        text: 'Each party will comply with data-protection laws applicable to its own processing of personal data, including, where applicable, the Pakistan Personal Data Protection Bill and Prevention of Electronic Crimes Act 2016, the EU/UK General Data Protection Regulation, and U.S. state privacy laws (such as the California Consumer Privacy Act). Heptagram processes Client-provided data solely to configure, deliver, and (where separately contracted) support the Services, and does not sell Client personal data. Where required by applicable law, the parties will enter into a separate data processing agreement.',
      },
    ],
  },
  {
    id: 'warranties',
    num: 12,
    title: 'Warranties & Disclaimers',
    blocks: [
      {
        type: 'p',
        text: 'Heptagram will perform the Services with reasonable skill and care. Except as expressly stated in these Terms or a signed statement of work, the Services are provided "as is" and "as available," without warranties of any kind, whether express, implied, or statutory, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement. Heptagram does not warrant that the Services will be uninterrupted, error-free, or produce any specific business outcome (such as a specific number of hires, candidate responses, or cost savings).',
      },
    ],
  },
  {
    id: 'liability',
    num: 13,
    title: 'Limitation of Liability',
    blocks: [
      {
        type: 'p',
        text: 'To the maximum extent permitted by applicable law: (a) neither party is liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, lost revenue, or lost data, arising from or related to these Terms or the Services; and (b) Heptagram\u2019s total aggregate liability arising out of or relating to the Services will not exceed the total fees actually paid by the Client to Heptagram for the specific Service giving rise to the claim in the twelve (12) months preceding the event giving rise to liability. Nothing in these Terms limits liability that cannot be limited or excluded under applicable law, including liability for fraud, gross negligence, or willful misconduct where such limitation is not permitted.',
      },
    ],
  },
  {
    id: 'indemnification',
    num: 14,
    title: 'Indemnification',
    blocks: [
      {
        type: 'p',
        text: 'The Client will indemnify and hold Heptagram harmless from third-party claims, damages, and reasonable costs arising from: (a) the Client\u2019s use of the Services in violation of Section 9 (Product-Specific Compliance) or Section 10 (Acceptable Use); (b) data or content the Client provided; or (c) the Client\u2019s violation of applicable law. Heptagram will indemnify the Client against third-party claims that the delivered, unmodified Heptagram IP directly infringes a third party\u2019s intellectual property rights, subject to prompt notice and Heptagram\u2019s control of the defense.',
      },
    ],
  },
  {
    id: 'confidentiality',
    num: 15,
    title: 'Confidentiality',
    blocks: [
      {
        type: 'p',
        text: 'Each party will keep confidential any non-public business, technical, or candidate/client information it receives from the other in connection with the Services, and will use it only to perform its obligations, except where disclosure is required by law or a valid legal process.',
      },
    ],
  },
  {
    id: 'term-termination',
    num: 16,
    title: 'Term & Termination',
    blocks: [
      {
        type: 'p',
        text: 'These Terms apply for as long as the Client uses any Service and survive with respect to Sections 7, 11, 12, 13, 14, 15, and 18 after any termination. Heptagram may suspend or terminate a Service for non-payment or breach of Section 10 with notice where practicable. Either party may terminate an ongoing engagement for convenience on written notice as specified in the applicable order form; fees for work already performed remain payable.',
      },
    ],
  },
  {
    id: 'force-majeure',
    num: 17,
    title: 'Force Majeure',
    blocks: [
      {
        type: 'p',
        text: 'Neither party is liable for delay or failure to perform caused by events beyond its reasonable control, including internet or telecommunications failures, third-party platform or API outages, acts of government, or natural disaster.',
      },
    ],
  },
  {
    id: 'governing-law',
    num: 18,
    title: 'Governing Law & Dispute Resolution',
    blocks: [
      {
        type: 'p',
        text: 'Heptagram AI operates internationally and serves clients based in Pakistan, the United States, and other countries. Unless a separate signed agreement with the Client states otherwise:',
      },
      {
        type: 'ul',
        items: [
          'These Terms are governed by the laws of the Islamic Republic of Pakistan, without regard to conflict-of-laws principles, to the extent consistent with any mandatory consumer-protection or data-protection law of the Client\u2019s own home jurisdiction that cannot be waived by contract (including relevant U.S. state law or EU/UK law, where applicable to that Client).',
          'The parties will first attempt to resolve any dispute in good faith through direct negotiation between the parties for at least thirty (30) days.',
          'Any dispute not resolved by negotiation will be finally resolved by binding arbitration on a confidential, individual (non-class) basis, with the seat of arbitration and rules to be specified in the applicable order form; absent such specification, arbitration will be seated in Pakistan under the rules of a recognized international arbitral institution.',
          'Either party may seek interim injunctive relief from a competent court to protect its intellectual property or confidential information pending arbitration.',
        ],
      },
      {
        type: 'p',
        text: 'Note: This page is a general template intended to give Clients clear, good-faith notice of how Heptagram AI operates commercially and legally. It is not a substitute for advice from a licensed lawyer in your jurisdiction. Clients with specific regulatory obligations (for example, in regulated industries, or operating call centers, recruitment agencies, or telemarketing under local law) should have their own counsel review this page and the applicable order form before relying on it.',
      },
    ],
  },
  {
    id: 'changes',
    num: 19,
    title: 'Changes to These Terms',
    blocks: [
      {
        type: 'p',
        text: 'Heptagram may update these Terms from time to time. The "Last updated" date at the top of this page reflects the latest revision. Material changes affecting an active, signed statement of work will be communicated to the Client directly before taking effect for that engagement.',
      },
    ],
  },
  {
    id: 'contact',
    num: 20,
    title: 'Contact',
    blocks: [
      {
        type: 'p',
        text: 'Questions about these Terms can be sent to info@heptagram-ai.com or via WhatsApp.',
      },
    ],
  },
]

function SectionBlock({ block }: { block: Block }) {
  if (block.type === 'p') {
    return (
      <p className="text-pretty leading-relaxed text-muted-foreground">
        {block.text}
      </p>
    )
  }
  if (block.type === 'ul') {
    return (
      <ul className="flex flex-col gap-3">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="relative pl-6 text-pretty leading-relaxed text-muted-foreground"
          >
            <span className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    )
  }
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
        {block.heading}
      </h3>
      <p className="text-pretty leading-relaxed text-muted-foreground">
        {block.text}
      </p>
    </div>
  )
}

export function TermsContent() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="relative">
      {/* Reading progress bar */}
      <div className="fixed inset-x-0 top-0 z-40 h-0.5 bg-transparent">
        <div
          ref={progressRef}
          className="h-full origin-left scale-x-0 bg-primary"
        />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-36 md:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
        />
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
              Legal
            </span>
          </Reveal>
          <BlurText
            as="h1"
            text="Terms & Conditions"
            className="mt-4 text-balance text-4xl font-semibold uppercase leading-[1.02] tracking-tight md:text-7xl"
            stagger={0.06}
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              These Terms govern every engagement, pilot, and paid deployment
              between Heptagram AI and its clients, across every jurisdiction we
              operate in.
            </p>
            <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground/70">
              Last updated: 19 July 2026
            </p>
          </Reveal>
        </div>
      </section>

      {/* Body: TOC + content */}
      <section className="px-6 pb-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[260px_1fr]">
          {/* Table of contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground/70">
                On this page
              </p>
              <nav className="flex flex-col gap-1 border-l border-white/10">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="-ml-px border-l border-transparent py-1.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Sections */}
          <div className="flex flex-col gap-16">
            {SECTIONS.map((s) => (
              <Reveal key={s.id} y={30}>
                <article id={s.id} className="scroll-mt-28">
                  <div className="mb-5 flex items-baseline gap-4">
                    <span className="font-mono text-sm text-primary">
                      {String(s.num).padStart(2, '0')}
                    </span>
                    <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                      {s.title}
                    </h2>
                  </div>
                  <div className="flex flex-col gap-4 md:pl-9">
                    {s.blocks.map((block, i) => (
                      <SectionBlock key={i} block={block} />
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}

            <Reveal>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary transition-opacity hover:opacity-70"
              >
                <span aria-hidden>&larr;</span> Back to home
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
