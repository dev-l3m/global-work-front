import { useHead } from '@unhead/vue'

interface BlogPostStructuredData {
  headline: string
  description: string
  image: string
  datePublished: string
  author: {
    name: string
    url: string
  }
  publisher: {
    name: string
    logo: {
      url: string
    }
  }
  mainEntityOfPage: {
    '@type': string
    '@id': string
  }
}

/**
 * Ajoute les structured data JSON-LD pour un article de blog
 */
export function useBlogPostStructuredData(getData: () => BlogPostStructuredData | null): void {
  useHead(() => {
    const data = getData()
    if (!data) return {}

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: data.headline,
      description: data.description,
      image: data.image,
      datePublished: data.datePublished,
      author: {
        '@type': 'Organization',
        name: data.author.name,
        url: data.author.url,
      },
      publisher: {
        '@type': 'Organization',
        name: data.publisher.name,
        logo: {
          '@type': 'ImageObject',
          url: data.publisher.logo.url,
        },
      },
      mainEntityOfPage: {
        '@type': data.mainEntityOfPage['@type'],
        '@id': data.mainEntityOfPage['@id'],
      },
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
