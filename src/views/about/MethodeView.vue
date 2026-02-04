<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import {
  MethodeHeroSection,
  MethodeProcessSection,
  MethodeBenefitsSection,
  MethodeResultSection,
  WhyCTASection,
} from '@/components/about'

const heroData = {
  title: 'Notre Méthode',
  paragraphs: [
    "Un <strong>recrutement international</strong> réussi ne se résume pas à trouver le bon CV. Le véritable enjeu est d'intégrer ce <strong>talent qualifié</strong> et de garantir son engagement sur le long terme. Les plateformes de sourcing traditionnelles s'arrêtent à la mise en relation, vous laissant seul face aux défis de l'intégration, du management à distance et du risque d'instabilité.",
    '<strong>Un processus à 360° pour transformer un potentiel en un levier de performance durable.</strong>',
    "Notre méthode est fondamentalement différente de ce qui se fait habituellement dans le <strong>secteur des ressources humaines</strong>. C'est un processus d'<strong>externalisation RH</strong> complet, conçu pour sécuriser votre investissement et transformer un profil à fort potentiel en un véritable atout stratégique pour votre croissance.",
  ],
}
</script>

<template>
  <PublicLayout>
    <MethodeHeroSection v-bind="heroData" />

    <v-divider />

    <MethodeProcessSection />

    <v-divider />

    <MethodeBenefitsSection />

    <v-divider />

    <MethodeResultSection />

    <v-divider />

    <WhyCTASection />
  </PublicLayout>
</template>
