<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import { RegisterHeroSection, RegisterTypeSection } from '@/components/account'
import { WhyCTASection } from '@/components/about'

const route = useRoute()
const showForm = computed(() => !!(route.query.type || route.query.profil))
</script>

<template>
  <PublicLayout>
    <RegisterHeroSection
      v-if="!showForm"
      title="Bienvenue chez Global Work Hub"
      subtitle="Créez votre compte et commencez à transformer votre recrutement international dès aujourd'hui."
    />

    <v-divider v-if="!showForm" />

    <RegisterTypeSection />

    <v-divider v-if="!showForm" />

    <WhyCTASection v-if="!showForm" />
  </PublicLayout>
</template>
