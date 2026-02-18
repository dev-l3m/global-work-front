<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PublicLayout from '@/layouts/PublicLayout.vue'
import {
  HeroSection,
  WhySection,
  ServicesSection,
  SpecialitesSection,
  TalentsShowcaseSection,
  TestimonialsSection,
  PillarsSection,
  CtaSection,
  ContactSection,
} from '@/components/home'
import {
  useOrganizationStructuredData,
  useWebSiteStructuredData,
} from '@/composables/useStructuredData'
import { useSeoMetaI18n } from '@/composables/useSeoMetaI18n'

const { t } = useI18n()

// SEO multilingue avec hreflang
useSeoMetaI18n('meta.home.title', 'meta.home.description')

// Structured data pour la page d'accueil - traduit selon la locale
useOrganizationStructuredData({
  name: 'Global Work Hub',
  url: 'https://global-work-hub.com',
  logo: 'https://global-work-hub.com/assets/hub-logo.png',
  description: t('structuredData.organization.description'),
  address: {
    streetAddress: '128 City Road',
    addressLocality: 'London',
    addressCountry: 'GB',
  },
  contactPoint: {
    telephone: '+33978455089',
    contactType: 'Customer Service',
    email: 'contact@global-work-hub.com',
  },
  sameAs: [],
})

useWebSiteStructuredData({
  name: 'Global Work Hub',
  url: 'https://global-work-hub.com',
  description: t('structuredData.website.description'),
})
</script>

<template>
  <PublicLayout class="landing">
    <HeroSection />
    <v-divider />
    <WhySection />
    <v-divider />
    <ServicesSection />
    <v-divider />
    <SpecialitesSection />
    <v-divider />
    <TalentsShowcaseSection />
    <v-divider />
    <TestimonialsSection />
    <v-divider />
    <PillarsSection />
    <v-divider />
    <CtaSection />
    <v-divider />
    <ContactSection />
  </PublicLayout>
</template>
