<script setup lang="ts">
const approaches = [
  {
    title: 'Analyse personnalisée de vos besoins',
    icon: 'mdi-magnify-scan',
    color: 'primary',
    description:
      'Nous étudions en profondeur votre contexte, vos objectifs et vos contraintes pour identifier les meilleures opportunités.',
  },
  {
    title: 'Recommandations stratégiques pour recrutement international',
    icon: 'mdi-lightbulb-on',
    color: 'secondary',
    description:
      "Conseils experts basés sur notre expérience pour optimiser votre stratégie de recrutement à l'international.",
  },
  {
    title: 'Optimisation des processus et des coûts',
    icon: 'mdi-chart-timeline-variant',
    color: 'success',
    description:
      "Identification des axes d'amélioration pour réduire vos coûts tout en améliorant l'efficacité opérationnelle.",
  },
]
</script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-12">
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">Notre approche</div>
    </div>

    <v-row>
      <v-col
        v-for="(approach, index) in approaches"
        :key="index"
        cols="12"
        md="4"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: index * 0.15,
          threshold: 0.1,
        }"
      >
        <v-card class="pa-6 approach-card h-100" elevation="3">
          <div class="text-center mb-4">
            <v-avatar :color="approach.color" variant="flat" size="72" class="mb-4">
              <v-icon :icon="approach.icon" size="36" color="white" />
            </v-avatar>
            <div class="text-h6 font-weight-bold mb-3">{{ approach.title }}</div>
            <div class="text-body-2 text-medium-emphasis" style="line-height: 1.7">
              {{ approach.description }}
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.approach-card {
  border-radius: 24px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(135deg, rgba(107, 90, 224, 0.2), rgba(255, 122, 60, 0.2)) border-box;
}

.approach-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 20px 60px rgba(107, 90, 224, 0.2);
  border-color: rgba(107, 90, 224, 0.4);
}
</style>
