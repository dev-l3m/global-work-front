<script setup lang="ts">
import FeatureCard from '@/components/shared/FeatureCard.vue'

const intro = {
  paragraph1:
    "Votre croissance ne peut pas attendre 12 semaines, le temps moyen d'un recrutement interne classique (chiffres APEC), et jusqu'à 6 mois pour les profils les plus spécialisés (IT, marketing, juridique…).",
  paragraph2:
    '<strong>Le problème :</strong> Les meilleurs profils sont rares, sollicités et souvent inaccessibles pour un recrutement local.<br/><br/><strong>Notre solution :</strong> Un accès direct à un réseau mondial de <strong>talents qualifiés</strong>, rigoureusement sélectionnés et pré-validés par nos experts en <strong>recrutement international</strong>.',
}

const features = [
  {
    title: 'Sourcing expert',
    description:
      'Nous savons où trouver les compétences spécifiques dont vous avez besoin (IT, support client, marketing, administration…) grâce à notre connaissance approfondie des hubs de talents mondiaux.',
  },
  {
    title: 'Processus accéléré',
    description:
      "Un processus d'onboarding optimisé pour réduire drastiquement le délai entre votre besoin et le démarrage de la mission.",
  },
  {
    title: 'Adéquation poste-profil',
    description:
      'Notre sélection ne se base pas uniquement sur les compétences techniques (hard skills) mais aussi sur les qualités humaines (soft skills) pour une intégration fluide dans vos équipes.',
  },
]
</script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-10">
      <div class="text-overline text-primary font-weight-bold mb-2">
        Talents immédiatement opérationnels
      </div>
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">
        Des talents qualifiés, disponibles rapidement
      </div>
    </div>

    <v-row class="mb-8">
      <v-col cols="12" md="6">
        <v-card class="pa-6 intro-card" variant="outlined">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="text-body-1 text-medium-emphasis mb-3" v-html="intro.paragraph1" />
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="text-body-1 text-medium-emphasis" v-html="intro.paragraph2" />
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-6 highlight-card" variant="tonal" color="primary">
          <div class="d-flex align-center ga-3 mb-3">
            <v-icon icon="mdi-clock-alert-outline" color="primary" size="32" />
            <div class="text-h6 font-weight-bold">Délais critiques</div>
          </div>
          <div class="text-body-1">
            <strong>12 semaines</strong> en moyenne pour un recrutement interne classique (APEC), et
            jusqu'à <strong>6 mois</strong> pour les profils les plus spécialisés (IT, marketing,
            juridique…).
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="(feature, index) in features"
        :key="index"
        cols="12"
        md="4"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: index * 0.15,
          threshold: 0.1,
        }"
      >
        <FeatureCard :title="feature.title" :description="feature.description" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.intro-card {
  border-radius: 20px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
}

.intro-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(107, 90, 224, 0.15);
}

.highlight-card {
  border-radius: 20px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
}

.highlight-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(107, 90, 224, 0.2);
}
</style>
