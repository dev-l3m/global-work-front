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
