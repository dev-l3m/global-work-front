import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export function useScrollAnimation(
  elementRef: Ref<HTMLElement | null>,
  options: {
    threshold?: number
    rootMargin?: string
    animationClass?: string
    once?: boolean
  } = {}
) {
  const isVisible = ref(false)
  const hasAnimated = ref(false)

  const {
    threshold = 0.1,
    rootMargin = '0px',
    animationClass = 'animate-in',
    once = true,
  } = options

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (once) {
            hasAnimated.value = true
          }
        } else if (!once) {
          isVisible.value = false
        }
      })
    },
    {
      threshold,
      rootMargin,
    }
  )

  onMounted(() => {
    if (elementRef.value) {
      observer.observe(elementRef.value)
    }
  })

  onUnmounted(() => {
    if (elementRef.value) {
      observer.unobserve(elementRef.value)
    }
    observer.disconnect()
  })

  return {
    isVisible,
    hasAnimated,
    animationClass,
  }
}
