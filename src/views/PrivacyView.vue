<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import { PrivacyHeroSection, PrivacyContentSection } from '@/components/resources'
import { WhyCTASection } from '@/components/about'
</script>

<template>
  <PublicLayout>
    <PrivacyHeroSection
      title="Protection de vos données"
      subtitle="La présente politique de confidentialité s'applique au site web de <strong>Global Work Hub</strong> et régit la manière dont nous collectons, utilisons, conservons et protégeons les informations personnelles de nos utilisateurs, conformément au <strong>Règlement Général sur la Protection des Données (RGPD)</strong>."
    />

    <v-divider />

    <PrivacyContentSection />

    <v-divider />

    <WhyCTASection />
  </PublicLayout>
</template>
