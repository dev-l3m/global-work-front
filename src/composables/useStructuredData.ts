import { useHead } from '@unhead/vue'
import type { Organization, WebSite, Service, BreadcrumbList } from '@/types/structured-data'

/**
 * Composable pour gérer les structured data (JSON-LD) pour le SEO
 */

export function useOrganizationStructuredData(data: Organization) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    logo: data.logo,
    description: data.description,
    ...(data.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: data.address.streetAddress,
        addressLocality: data.address.addressLocality,
        addressCountry: data.address.addressCountry,
      },
    }),
    ...(data.contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: data.contactPoint.telephone,
        contactType: data.contactPoint.contactType,
        email: data.contactPoint.email,
      },
    }),
    sameAs: data.sameAs || [],
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        textContent: JSON.stringify(structuredData),
      },
    ],
  })
}

export function useWebSiteStructuredData(data: WebSite) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    url: data.url,
    description: data.description,
    ...(data.potentialAction && {
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: data.potentialAction.urlTemplate,
        },
        'query-input': 'required name=search_term_string',
      },
    }),
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        textContent: JSON.stringify(structuredData),
      },
    ],
  })
}

export function useServiceStructuredData(data: Service) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.description,
    provider: {
      '@type': 'Organization',
      name: data.provider.name,
      url: data.provider.url,
    },
    areaServed: data.areaServed || [],
    serviceType: data.serviceType,
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        textContent: JSON.stringify(structuredData),
      },
    ],
  })
}

export function useBreadcrumbStructuredData(data: BreadcrumbList) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: data.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        textContent: JSON.stringify(structuredData),
      },
    ],
  })
}
