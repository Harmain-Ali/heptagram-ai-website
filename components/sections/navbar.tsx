'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '#contact' },
]

type Lenis = { scrollTo: (target: string | HTMLElement, opts?: object) => void }

export function Navbar() {
  const ref = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return
    e.preventDefault()
    setOpen(false)
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis
    const target = document.querySelector(href)
    if (lenis && target) {
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.3 })
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { y: -80, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', delay: 0.2 },
    )
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 md:px-6 ${
          scrolled
            ? 'border-white/10 bg-background/70 backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a
          href="#hero"
          onClick={(e) => handleNav(e, '#hero')}
          className="flex items-center gap-2.5"
        >
          <Image
            src="/logo-white.svg"
            alt="Heptagram AI logo"
            width={22}
            height={22}
            className="h-5 w-5"
          />
          <span className="text-sm font-semibold uppercase tracking-[0.18em]">
            Heptagram AI
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={(e) => handleNav(e, l.href)}
                className="group relative rounded-full px-4 py-2 text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={(e) => handleNav(e, '#contact')}
          className="hidden rounded-full bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-[1.03] md:inline-flex"
        >
          Book a Call
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full bg-foreground transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-full bg-foreground transition-transform ${open ? '-translate-y-1 -rotate-45' : ''}`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="absolute inset-x-4 top-20 rounded-3xl border border-white/10 bg-background/95 p-4 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={(e) => handleNav(e, l.href)}
                  className="block rounded-xl px-4 py-3 text-sm uppercase tracking-widest text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={(e) => handleNav(e, '#contact')}
                className="mt-1 block rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-primary-foreground"
              >
                Book a Call
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
