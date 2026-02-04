<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import {
  RecrutementHeroSection,
  ConseilApproachSection,
  ConseilObjectiveSection,
} from '@/components/services'
import { WhyCTASection } from '@/components/about'
</script>

<template>
  <PublicLayout>
    <RecrutementHeroSection title="Conseil et accompagnement stratégique" />

    <v-divider />

    <ConseilApproachSection />

    <v-divider />

    <ConseilObjectiveSection />

    <v-divider />

    <WhyCTASection />
  </PublicLayout>
</template>
