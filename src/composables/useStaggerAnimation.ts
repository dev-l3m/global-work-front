import { onMounted, ref } from 'vue'

export function useStaggerAnimation(
  itemsCount: number,
  options: {
    delay?: number
    animationClass?: string
  } = {}
) {
  const { delay = 0.1, animationClass = 'animate-fade-in-up' } = options
  const visibleItems = ref<boolean[]>(new Array(itemsCount).fill(false))

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(
            () => {
              visibleItems.value[index] = true
            },
            index * delay * 1000
          )
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  )

  onMounted(() => {
    const elements = document.querySelectorAll('.stagger-item')
    elements.forEach(el => {
      observer.observe(el)
    })
  })

  return {
    visibleItems,
    getItemClass: (index: number) => {
      return visibleItems.value[index] ? animationClass : ''
    },
  }
}
