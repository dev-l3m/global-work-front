<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import { CGUHeroSection, CGUContentSection } from '@/components/resources'
import { WhyCTASection } from '@/components/about'
</script>

<template>
  <PublicLayout>
    <CGUHeroSection title="Conditions Générales d'Utilisation du site Global Work Hub" />

    <v-divider />

    <CGUContentSection />

    <v-divider />

    <WhyCTASection />
  </PublicLayout>
</template>
