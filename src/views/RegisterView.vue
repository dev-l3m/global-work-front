<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import { RegisterHeroSection, RegisterTypeSection } from '@/components/account'
import { WhyCTASection } from '@/components/about'
</script>

<template>
  <PublicLayout>
    <RegisterHeroSection
      title="Bienvenue chez Global Work Hub"
      subtitle="Créez votre compte et commencez à transformer votre recrutement international dès aujourd'hui."
    />

    <v-divider />

    <RegisterTypeSection />

    <v-divider />

    <WhyCTASection />
  </PublicLayout>
</template>
