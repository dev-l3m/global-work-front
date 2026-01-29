<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import {
  HeroSection,
  StatsSection,
  WhySection,
  ServicesSection,
  TestimonialsSection,
  ContactSection,
} from '@/components/home'
</script>

<template>
  <PublicLayout>
    <HeroSection />
    <StatsSection />
    <v-divider />
    <WhySection />
    <v-divider />
    <ServicesSection />
    <v-divider />
    <TestimonialsSection />
    <v-divider />
    <ContactSection />
  </PublicLayout>
</template>
