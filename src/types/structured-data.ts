/**
 * Types pour les structured data (JSON-LD)
 */

export interface Organization {
  name: string
  url: string
  logo: string
  description: string
  address?: {
    streetAddress: string
    addressLocality: string
    addressCountry: string
  }
  contactPoint?: {
    telephone: string
    contactType: string
    email: string
  }
  sameAs?: string[]
}

export interface WebSite {
  name: string
  url: string
  description: string
  potentialAction?: {
    urlTemplate: string
  }
}

export interface Service {
  name: string
  description: string
  provider: {
    name: string
    url: string
  }
  areaServed?: string[]
  serviceType: string
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface BreadcrumbList {
  items: BreadcrumbItem[]
}
