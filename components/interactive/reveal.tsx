'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Generic blur + fade + rise reveal for any block of content when it
 * scrolls into view.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  y = 24,
  once = true,
}: {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  y?: number
  once?: boolean
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, filter: 'blur(14px)', y },
        {
          autoAlpha: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 1,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: once
              ? 'play none none none'
              : 'play none none reverse',
          },
        },
      )
    })

    return () => ctx.revert()
  }, [delay, y, once])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

/**
 * Word-by-word blur reveal for headings.
 */
export function BlurText({
  text,
  as: Tag = 'h2',
  className,
  wordClassName,
  start = 'top 85%',
  stagger = 0.08,
  delay = 0,
  play,
}: {
  text: string
  as?: ElementType
  className?: string
  wordClassName?: string
  start?: string
  stagger?: number
  delay?: number
  /**
   * Controlled mode. When provided, the reveal is gated on this flag
   * instead of a ScrollTrigger — useful for above-the-fold headings that
   * should animate only once an intro/loading sequence has finished.
   */
  play?: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const controlled = play !== undefined

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.registerPlugin(ScrollTrigger)

    const words = el.querySelectorAll<HTMLElement>('[data-word]')

    // In controlled mode, keep the words hidden until `play` turns true.
    if (controlled && !play) {
      gsap.set(words, { autoAlpha: 0, filter: 'blur(12px)', yPercent: 60 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { autoAlpha: 0, filter: 'blur(12px)', yPercent: 60 },
        {
          autoAlpha: 1,
          filter: 'blur(0px)',
          yPercent: 0,
          duration: 0.9,
          delay,
          ease: 'power3.out',
          stagger,
          ...(controlled ? {} : { scrollTrigger: { trigger: el, start } }),
        },
      )
    })

    return () => ctx.revert()
  }, [start, stagger, delay, controlled, play])

  const lines = text.split('\n')

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((word, wi) => (
            <span
              key={wi}
              className="inline-block overflow-hidden align-bottom"
            >
              <span
                data-word
                className={`inline-block ${wordClassName ?? ''}`}
              >
                {word}
                {wi < line.split(' ').length - 1 ? '\u00A0' : ''}
              </span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
