<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import { ContactHeroSection, ContactFormSection } from '@/components/home'
</script>

<template>
  <PublicLayout>
    <ContactHeroSection
      title="Contactez-Nous"
      subtitle="Une question sur nos services ? Un projet en tête ? Notre équipe vous répond rapidement."
    />

    <v-divider />

    <ContactFormSection />
  </PublicLayout>
</template>
