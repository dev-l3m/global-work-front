<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import { LegalHeroSection, LegalContentSection } from '@/components/resources'
import { WhyCTASection } from '@/components/about'
</script>

<template>
  <PublicLayout>
    <LegalHeroSection title="Mentions légales de Global Work Hub" />

    <v-divider />

    <LegalContentSection />

    <v-divider />

    <WhyCTASection />
  </PublicLayout>
</template>
