import type { Directive } from 'vue'

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  animation?: string
  delay?: number
  once?: boolean
}

const defaultOptions: ScrollAnimationOptions = {
  threshold: 0.1,
  rootMargin: '0px',
  animation: 'fadeInUp',
  delay: 0,
  once: true,
}

const observers = new Map<Element, IntersectionObserver>()

export const vScrollAnimation: Directive = {
  mounted(el: HTMLElement, binding) {
    const options = { ...defaultOptions, ...binding.value } as ScrollAnimationOptions

    // Add initial state
    el.style.opacity = '0'
    el.style.transition = `opacity ${options.delay}s ease-out, transform ${options.delay}s ease-out`

    // Set initial transform based on animation type
    switch (options.animation) {
      case 'fadeInUp':
        el.style.transform = 'translateY(40px)'
        break
      case 'fadeInDown':
        el.style.transform = 'translateY(-40px)'
        break
      case 'fadeInLeft':
        el.style.transform = 'translateX(-40px)'
        break
      case 'fadeInRight':
        el.style.transform = 'translateX(40px)'
        break
      case 'scaleIn':
        el.style.transform = 'scale(0.9)'
        break
      default:
        el.style.transform = 'translateY(40px)'
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(
              () => {
                el.style.opacity = '1'
                el.style.transform = 'translate(0, 0) scale(1)'
                if (options.once) {
                  observer.unobserve(el)
                }
              },
              (options.delay || 0) * 1000
            )
          } else if (!options.once) {
            el.style.opacity = '0'
            switch (options.animation) {
              case 'fadeInUp':
                el.style.transform = 'translateY(40px)'
                break
              case 'fadeInDown':
                el.style.transform = 'translateY(-40px)'
                break
              case 'fadeInLeft':
                el.style.transform = 'translateX(-40px)'
                break
              case 'fadeInRight':
                el.style.transform = 'translateX(40px)'
                break
              case 'scaleIn':
                el.style.transform = 'scale(0.9)'
                break
            }
          }
        })
      },
      {
        threshold: options.threshold,
        rootMargin: options.rootMargin,
      }
    )

    observer.observe(el)
    observers.set(el, observer)
  },

  unmounted(el: HTMLElement) {
    const observer = observers.get(el)
    if (observer) {
      observer.unobserve(el)
      observer.disconnect()
      observers.delete(el)
    }
  },
}
