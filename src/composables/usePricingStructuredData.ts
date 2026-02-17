import { useHead } from '@unhead/vue'
import type { PricingFAQ } from '@/content/pricing'

/**
 * Ajoute les structured data JSON-LD FAQPage pour la page tarifs
 */
export function usePricingFAQStructuredData(faqs: PricingFAQ[]): void {
  useHead(() => {
    if (!faqs || faqs.length === 0) return {}

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }

    return {
      script: [
        {
          type: 'application/ld+json',
          textContent: JSON.stringify(structuredData),
        },
      ],
    }
  })
}
