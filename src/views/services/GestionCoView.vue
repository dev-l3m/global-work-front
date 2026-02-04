<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import { GestionCoHeroSection, GestionCoFeaturesSection } from '@/components/services'
import { WhyCTASection } from '@/components/about'
</script>

<template>
  <PublicLayout>
    <GestionCoHeroSection title="Gestion opérationnelle et administrative simplifiée" />

    <v-divider />

    <GestionCoFeaturesSection />

    <v-divider />

    <WhyCTASection />
  </PublicLayout>
</template>
