<script setup lang="ts">
const problem = {
  title: 'Le problème',
  description:
    'Les plateformes traditionnelles vous laissent seuls face au talent après la signature. Le risque d\'abandon de mission, de "ghosting" ou de rupture de contrat intempestive est élevé. Cela met alors vos projets en péril.',
}

const solution = {
  title: 'Notre solution',
  description:
    'Un <strong>accompagnement RH</strong> permanent. Nos <strong>talents qualifiés</strong> sont nos collaborateurs. Nous assurons un pilotage proactif, une gestion de carrière et un suivi managérial quotidien.',
  items: [
    {
      icon: 'mdi-shield-check',
      title: 'Réduction des risques',
      description:
        'Nous gérons la relation contractuelle de A à Z. Notre structure et notre encadrement réduisent drastiquement le turnover.',
    },
    {
      icon: 'mdi-sync',
      title: 'Continuité de service',
      description:
        "En cas d'imprévu, Global Work Hub assure la continuité de la mission et la transmission des compétences. Votre projet n'est jamais à l'arrêt.",
    },
    {
      icon: 'mdi-chart-line',
      title: 'Performance garantie',
      description:
        "Notre suivi qualité garantit que les objectifs sont atteints et que le talent reste motivé et intégré à votre culture d'entreprise.",
    },
  ],
}
</script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-10">
      <div class="text-overline text-primary font-weight-bold mb-2">Stabilité & performance</div>
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">
        La stabilité avant tout : notre réponse à l'incertitude
      </div>
      <div class="text-body-1 text-medium-emphasis mx-auto" style="max-width: 800px">
        Le principal défi de l'externalisation n'est pas de <em>trouver</em> un profil, mais de le
        <em>garder</em> engagé, performant et aligné sur vos objectifs.
      </div>
    </div>

    <v-row class="mb-8">
      <v-col cols="12" md="6">
        <v-card class="pa-6 problem-card" variant="outlined" color="error" density="comfortable">
          <div class="d-flex align-center ga-3 mb-3">
            <v-icon icon="mdi-alert-circle" color="error" size="32" />
            <div class="text-h6 font-weight-bold">{{ problem.title }}</div>
          </div>
          <div class="text-body-1 text-medium-emphasis" v-html="problem.description" />
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-6 solution-card" variant="tonal" color="primary" density="comfortable">
          <div class="d-flex align-center ga-3 mb-3">
            <v-icon icon="mdi-lightbulb-on" color="primary" size="32" />
            <div class="text-h6 font-weight-bold">{{ solution.title }}</div>
          </div>
          <div class="text-body-1 text-medium-emphasis" v-html="solution.description" />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="(item, index) in solution.items"
        :key="index"
        cols="12"
        md="4"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: index * 0.15,
          threshold: 0.1,
        }"
      >
        <v-card class="pa-6 benefit-card" elevation="2">
          <div class="benefit-card-header">
            <v-avatar
              :color="index === 0 ? 'error' : index === 1 ? 'info' : 'success'"
              variant="tonal"
              size="56"
              class="mb-4"
            >
              <v-icon :icon="item.icon" size="28" />
            </v-avatar>
            <div class="text-h6 font-weight-bold mb-2">{{ item.title }}</div>
          </div>
          <div class="text-body-2 text-medium-emphasis benefit-card-description">
            {{ item.description }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.problem-card {
  border-left: 4px solid rgb(var(--v-theme-error));
  border-radius: 16px;
  transition: all 0.3s ease;
}

.problem-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(244, 67, 54, 0.15);
}

.solution-card {
  border-left: 4px solid rgb(var(--v-theme-primary));
  border-radius: 16px;
  transition: all 0.3s ease;
}

.solution-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(107, 90, 224, 0.15);
}

.benefit-card {
  border-radius: 20px;
  transition: all 0.3s ease;
  height: 100%;
}

.benefit-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

@media (max-width: 599px) {
  .benefit-card-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
