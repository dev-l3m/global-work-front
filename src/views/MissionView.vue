<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import {
  MissionHeroSection,
  MissionSourcingSection,
  MissionGrowthSection,
  WhyCTASection,
} from '@/components/about'

const heroData = {
  overline: 'Notre mission chez Global Work Hub',
  title: 'Notre Mission',
  paragraphs: [
    "Le monde du travail a changé. Les entreprises font face à une double contrainte : une pénurie de <strong>talents qualifiés</strong> en local et une pression concurrentielle qui exige une agilité maximale. Pourtant, les solutions existantes sont souvent insatisfaisantes : le recrutement interne est lent et rigide, tandis que l'appel aux freelances manque de fiabilité et d'encadrement.",
    "Global Work Hub s'engage à briser la barrière entre recrutement local et freelancing.",
    "Nous existons pour offrir une troisième voie stratégique. Nous démocratisons l'accès aux meilleures <strong>ressources humaines</strong> mondiales, non pas comme une solution ponctuelle, mais comme un véritable levier de croissance durable pour votre entreprise.",
  ],
}
</script>

<template>
  <PublicLayout>
    <MissionHeroSection v-bind="heroData" />

    <v-divider />

    <MissionSourcingSection />

    <v-divider />

    <MissionGrowthSection />

    <v-divider />

    <WhyCTASection />
  </PublicLayout>
</template>
