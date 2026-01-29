<script setup lang="ts">
import FeatureCard from '@/components/shared/FeatureCard.vue'

const pillars = [
  {
    title: '1. SOURCING EXPERT',
    description:
      'Nous ne publions pas d’annonces. Nous chassons les talents dans notre réseau pré-qualifié de 500+ profils actifs.',
  },
  {
    title: '2. ENCADREMENT QUOTIDIEN',
    description:
      'Chaque talent a un référent local + un manager européen. Double supervision pour une performance maximale.',
  },
  {
    title: '3. ACCOMPAGNEMENT CONTINU',
    description:
      'Si des ajustements sont nécessaires, nous les prenons en charge. Suivi personnalisé tout au long de la mission.',
  },
]
</script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-10">
      <div class="text-overline text-primary font-weight-bold mb-2">Nos 3 piliers</div>
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">
        Un modèle construit sur la stabilité
      </div>
    </div>

    <v-row>
      <v-col
        v-for="(pillar, index) in pillars"
        :key="index"
        cols="12"
        md="4"
        v-scroll-animation="{
          animation: 'scaleIn',
          delay: index * 0.15,
          threshold: 0.1,
        }"
      >
        <FeatureCard :title="pillar.title" :description="pillar.description" />
      </v-col>
    </v-row>
  </v-container>
</template>
