<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import {
  RecrutementHeroSection,
  RHAdminServicesSection,
  RHAdminBenefitsSection,
} from '@/components/services'
import { WhyCTASection } from '@/components/about'
</script>

<template>
  <PublicLayout>
    <RecrutementHeroSection title="Externalisation RH et services administratifs" />

    <v-divider />

    <RHAdminServicesSection />

    <v-divider />

    <RHAdminBenefitsSection />

    <v-divider />

    <WhyCTASection />
  </PublicLayout>
</template>
