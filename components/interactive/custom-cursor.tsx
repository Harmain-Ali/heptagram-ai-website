'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only enable on fine pointers (desktop)
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return

    document.body.classList.add('custom-cursor')

    const dot = dotRef.current!
    const ring = ringRef.current!

    // quickTo for smooth trailing motion
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' })
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' })

    let visible = false
    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 })
      }
      ringX(e.clientX)
      ringY(e.clientY)
      dotX(e.clientX)
      dotY(e.clientY)
    }

    const setHover = (active: boolean) => {
      gsap.to(ring, {
        scale: active ? 2.4 : 1,
        borderColor: active
          ? 'oklch(0.88 0.21 128)'
          : 'oklch(0.985 0 0 / 0.5)',
        backgroundColor: active
          ? 'oklch(0.88 0.21 128 / 0.12)'
          : 'oklch(0.88 0.21 128 / 0)',
        duration: 0.35,
        ease: 'power3',
      })
      gsap.to(dot, { scale: active ? 0 : 1, duration: 0.3, ease: 'power3' })
    }

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        'a, button, [data-cursor="hover"]',
      )
      setHover(Boolean(target))
    }

    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.2 })
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3 })
    // Hide when the pointer leaves the window, and reset `visible` so the
    // next real movement fades it back in (previously it stayed hidden).
    const onLeave = () => {
      visible = false
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 })
    }
    const onEnter = (e: MouseEvent) => {
      visible = true
      gsap.set(ring, { x: e.clientX, y: e.clientY })
      gsap.set(dot, { x: e.clientX, y: e.clientY })
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      document.body.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-0"
        style={{ borderColor: 'oklch(0.985 0 0 / 0.5)' }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-0"
      />
    </div>
  )
}
