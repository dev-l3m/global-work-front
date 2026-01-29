<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import { RGDPHeroSection, RGDPContentSection } from '@/components/resources'
import { WhyCTASection } from '@/components/about'
</script>

<template>
  <PublicLayout>
    <RGDPHeroSection title="Conformité RGPD de Global Work Hub" />

    <v-divider />

    <RGDPContentSection />

    <v-divider />

    <WhyCTASection />
  </PublicLayout>
</template>
