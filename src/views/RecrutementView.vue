<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import {
  RecrutementHeroSection,
  RecrutementProcessSection,
  RecrutementProfilesSection,
} from '@/components/services'
import { WhyCTASection } from '@/components/about'
</script>

<template>
  <PublicLayout>
    <RecrutementHeroSection title="Recrutement international simplifié" />

    <v-divider />

    <RecrutementProcessSection />

    <v-divider />

    <RecrutementProfilesSection />

    <v-divider />

    <WhyCTASection />
  </PublicLayout>
</template>
