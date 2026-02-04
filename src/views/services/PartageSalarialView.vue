<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import { PartageSalarialHeroSection, PartageSalarialFeaturesSection } from '@/components/services'
import { WhyCTASection } from '@/components/about'
</script>

<template>
  <PublicLayout>
    <PartageSalarialHeroSection title="Partage salarial et rémunération internationale" />

    <v-divider />

    <PartageSalarialFeaturesSection />

    <v-divider />

    <WhyCTASection />
  </PublicLayout>
</template>
