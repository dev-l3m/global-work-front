<script setup lang="ts">
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

// Structured data pour la page d'accueil - appelé directement dans setup()
useOrganizationStructuredData({
  name: 'Global Work Hub',
  url: 'https://global-work-hub.com',
  logo: 'https://global-work-hub.com/assets/hub-logo.png',
  description:
    "Global Work Hub connecte les entreprises aux meilleurs professionnels internationaux pour le recrutement et l'externalisation RH.",
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
  description:
    'Recrutement international et externalisation RH. Trouvez les meilleurs talents dans 15+ pays.',
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
