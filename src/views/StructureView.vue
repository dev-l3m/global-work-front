<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import {
  StructureHeroSection,
  StructureOrganizationSection,
  StructureSecuritySection,
} from '@/components/resources'
import { WhyCTASection } from '@/components/about'
</script>

<template>
  <PublicLayout>
    <StructureHeroSection
      overline="STRUCTURE & SÉCURITÉ"
      title="Structure internationale et Sécurité juridique - Conformité Europe"
      subtitle="La confiance se mérite, surtout dans l'international. Notre organisation bipolaire vous offre le meilleur des deux mondes : l'efficacité opérationnelle mondiale et la sécurité juridique européenne. Transparence totale sur notre structure pour votre tranquillité."
    />

    <v-divider />

    <StructureOrganizationSection />

    <v-divider />

    <StructureSecuritySection />

    <v-divider />

    <WhyCTASection />
  </PublicLayout>
</template>
