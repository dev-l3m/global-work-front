<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import {
  WhyHeroSection,
  WhyDistinguishingFeatures,
  WhyThreePillars,
  WhyStabilitySection,
  WhyTalentsSection,
  WhyEcosystemSection,
  WhyCTASection,
} from '@/components/about'

const heroData = {
  overline: 'POURQUOI GLOBAL WORK HUB',
  title: 'Pourquoi choisir Global Work Hub ?',
  paragraphs: [
    'Dans un marché mondialisé où la réactivité et la compétence sont reines, le recrutement est devenu un enjeu stratégique majeur. Pourtant, les entreprises font face à un double dilemme : des processus internes longs, coûteux et rigides, et des freelances indépendants sources d’instabilité.',
    'Choisir <strong>Global Work Hub</strong>, c’est refuser ce compromis. Nous avons conçu une solution d’<strong>externalisation RH</strong> qui combine la flexibilité de l’externalisation avec la fiabilité et l’engagement d’une équipe interne. Nous sommes votre département de <strong>ressources humaines</strong> délocalisé, garant de la performance et de la <strong>stabilité</strong> de vos talents.',
  ],
}
</script>

<template>
  <PublicLayout>
    <WhyHeroSection v-bind="heroData" />

    <v-divider />

    <WhyDistinguishingFeatures />

    <v-divider />

    <WhyThreePillars />

    <v-divider />

    <WhyStabilitySection />

    <v-divider />

    <WhyTalentsSection />

    <v-divider />

    <WhyEcosystemSection />

    <v-divider />

    <WhyCTASection />
  </PublicLayout>
</template>
