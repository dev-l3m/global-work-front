<script setup lang="ts">
import FeatureCard from '@/components/shared/FeatureCard.vue'

const features = [
  {
    icon: 'mdi-office-building-outline',
    iconColor: 'primary' as const,
    title: 'Pas une Plateforme, une organisation',
    items: [
      'Structure dédiée avec 20+ employés',
      'Process industrialisés et éprouvés',
      'Suivi individuel de chaque collaboration',
      'Écosystème complet de A à Z',
    ],
  },
  {
    icon: 'mdi-rocket-launch-outline',
    iconColor: 'secondary' as const,
    title: 'Rapidité sans compromis sur qualité',
    items: [
      'Pré-sélection permanente de 500+ profils',
      'Tests techniques et comportementaux validés',
      'Onboarding standardisé',
      'Déploiement opérationnel optimisé',
    ],
  },
  {
    icon: 'mdi-shield-check-outline',
    iconColor: 'primary' as const,
    title: 'Sécurité juridique totale',
    items: [
      'Structure européenne pour contractualisation',
      'Conformité droit du travail européen',
      'Assurances et garanties professionnelles',
      'Protection anti-contournement mutuelle',
    ],
  },
  {
    icon: 'mdi-chart-line-variant',
    iconColor: 'secondary' as const,
    title: 'Performance mesurée et suivie',
    items: [
      'KPI définis et suivis mensuellement',
      'Reporting transparent en temps réel',
      'Ajustements proactifs si nécessaire',
      'Accompagnement continu de la relation',
    ],
  },
]
</script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-12">
      <div class="text-overline text-primary font-weight-bold mb-2">Ce qui nous distingue</div>
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">
        Une organisation complète, pas une simple plateforme
      </div>
    </div>

    <v-row>
      <v-col
        v-for="(feature, index) in features"
        :key="index"
        cols="12"
        md="6"
        lg="3"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: index * 0.15,
          threshold: 0.1,
        }"
      >
        <FeatureCard v-bind="feature" />
      </v-col>
    </v-row>
  </v-container>
</template>
