import type { Directive } from 'vue'

export type RevealVariant = 'up' | 'left' | 'right' | 'scale'

export interface RevealBindingValue {
  variant?: RevealVariant
  delay?: number
  once?: boolean
}

const DEFAULT_VARIANT: RevealVariant = 'up'
const DEFAULT_DELAY = 0
const DEFAULT_ONCE = true
const ROOT_MARGIN = '0px 0px -10% 0px'
const THRESHOLD = 0.15

const observers = new Map<Element, IntersectionObserver>()

function getDelay(el: HTMLElement, value: RevealBindingValue | undefined): number {
  if (value != null && typeof value.delay === 'number') return value.delay
  const dataDelay = el.getAttribute('data-delay')
  if (dataDelay != null) {
    const n = parseInt(dataDelay, 10)
    if (!Number.isNaN(n)) return n
  }
  return DEFAULT_DELAY
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const vReveal: Directive<HTMLElement, RevealBindingValue | undefined> = {
  mounted(el, binding) {
    const value = binding.value
    const variant = (value?.variant ?? DEFAULT_VARIANT) as RevealVariant
    const delay = getDelay(el, value)
    const once = value?.once ?? DEFAULT_ONCE

    el.classList.add('reveal', `reveal--${variant}`)
    el.style.setProperty('--reveal-delay', `${delay}ms`)

    if (prefersReducedMotion()) {
      el.classList.add('reveal--in')
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('reveal--in')
            if (once) {
              observer.unobserve(el)
              observers.delete(el)
            }
          } else if (!once) {
            el.classList.remove('reveal--in')
          }
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: THRESHOLD }
    )

    observer.observe(el)
    observers.set(el, observer)
  },

  unmounted(el) {
    const observer = observers.get(el)
    if (observer) {
      observer.unobserve(el)
      observers.delete(el)
    }
  },
}
