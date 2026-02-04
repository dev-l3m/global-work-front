<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import {
  TestimonialsHeroSection,
  TestimonialsStatsSection,
  TestimonialsListSection,
  TestimonialsCTASection,
} from '@/components/testimonials'
</script>

<template>
  <PublicLayout>
    <TestimonialsHeroSection />
    <v-divider />
    <TestimonialsStatsSection />
    <v-divider />
    <TestimonialsListSection />
    <v-divider />
    <TestimonialsCTASection />
  </PublicLayout>
</template>
