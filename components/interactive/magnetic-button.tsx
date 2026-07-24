'use client'

import { useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ArrowUpRight } from 'lucide-react'

type Variant = 'solid' | 'outline'

export function MagneticButton({
  children,
  href = '#contact',
  variant = 'solid',
  className = '',
  icon = true,
}: {
  children: ReactNode
  href?: string
  variant?: Variant
  className?: string
  icon?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    const inner = innerRef.current
    if (!el || !inner) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, { x: x * 0.3, y: y * 0.4, duration: 0.6, ease: 'power3' })
    gsap.to(inner, { x: x * 0.15, y: y * 0.2, duration: 0.6, ease: 'power3' })
  }

  const onLeave = () => {
    gsap.to([ref.current, innerRef.current], {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)',
    })
  }

  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors'
  const styles =
    variant === 'solid'
      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
      : 'border border-white/25 text-foreground hover:border-primary hover:text-primary'

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${styles} ${className}`}
    >
      <span ref={innerRef} className="inline-flex items-center gap-2">
        {children}
        {icon && (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </span>
    </a>
  )
}
