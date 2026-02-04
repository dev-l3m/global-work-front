<script setup lang="ts">
const comparisons = [
  {
    title: 'Freelance',
    icon: 'mdi-account-alert-outline',
    color: 'error',
    points: [
      'Instabilité chronique',
      'Qualité inconstante',
      'Risque juridique',
      'Gestion complète à votre charge',
    ],
  },
  {
    title: 'Salariat local',
    icon: 'mdi-clock-alert-outline',
    color: 'warning',
    points: [
      'Processus longs (3 à 6 mois)',
      'Charges élevées (+45%)',
      'Rigidité structurelle',
      'Difficulté à ajuster les effectifs',
    ],
  },
  {
    title: 'Notre solution',
    icon: 'mdi-rocket-launch',
    color: 'primary',
    variant: 'tonal',
    points: [
      'Rapidité de déploiement',
      'Performance mesurable',
      'Flexibilité encadrée',
      'Talents experts intégrés',
    ],
    highlight: true,
  },
]
</script>

<template>
  <section id="pourquoi" class="why-section-block">
    <v-container class="py-16">
      <div class="d-flex align-end justify-space-between flex-wrap ga-4 mb-10">
        <div class="section-header">
          <div class="text-overline text-primary font-weight-bold mb-2">Notre approche</div>
          <div class="text-h4 text-md-h3 font-weight-bold mb-3">Pourquoi Global Work Hub</div>
          <div class="text-body-1 text-medium-emphasis" style="max-width: 600px">
            Le recrutement international ne doit pas être un parcours du combattant. Nous offrons
            une alternative fiable, encadrée et performante aux freelances instables et aux
            recrutements locaux coûteux.
          </div>
        </div>
        <v-btn variant="text" append-icon="mdi-arrow-right" class="text-none" to="/notre-methode">
          Découvrir notre méthode
        </v-btn>
      </div>

      <v-row>
        <v-col
          v-for="(item, index) in comparisons"
          :key="index"
          cols="12"
          md="4"
          class="comparison-col"
          v-scroll-animation="{
            animation: 'scaleIn',
            delay: index * 0.15,
            threshold: 0.2,
          }"
        >
          <v-card
            class="pa-6 comparison-card"
            :variant="(item.variant || 'outlined') as 'outlined' | 'tonal'"
            :color="item.highlight ? 'primary' : undefined"
            :class="{ 'comparison-card-highlight': item.highlight }"
          >
            <div class="d-flex align-center ga-3 mb-4">
              <v-avatar
                :color="item.color"
                :variant="item.highlight ? ('flat' as const) : ('tonal' as const)"
                size="56"
              >
                <v-icon :icon="item.icon" size="28" />
              </v-avatar>
              <div class="text-h6 font-weight-bold">{{ item.title }}</div>
            </div>
            <ul class="comparison-list">
              <li v-for="(point, idx) in item.points" :key="idx" class="comparison-point">
                <v-icon
                  :icon="item.highlight ? 'mdi-check-circle' : 'mdi-alert-circle-outline'"
                  :color="item.highlight ? 'success' : item.color"
                  size="20"
                  class="mr-2"
                />
                {{ point }}
              </li>
            </ul>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.why-section-block {
  background: linear-gradient(
    180deg,
    rgba(247, 244, 255, 0.6) 0%,
    rgba(255, 255, 255, 0.9) 30%,
    rgba(247, 244, 255, 0.5) 100%
  );
  border-radius: 0;
}

.section-header {
  animation: fadeInUp 0.6s ease-out;
}

.comparison-col {
  animation: fadeInUp 0.6s ease-out both;
}

.comparison-col:nth-child(1) {
  animation-delay: 0.1s;
}

.comparison-col:nth-child(2) {
  animation-delay: 0.2s;
}

.comparison-col:nth-child(3) {
  animation-delay: 0.3s;
}

.comparison-card {
  border-radius: 20px;
  transition: all 0.3s ease;
  height: 100%;
  border-width: 2px;
}

.comparison-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.comparison-card-highlight {
  background: linear-gradient(135deg, rgba(107, 90, 224, 0.1) 0%, rgba(255, 122, 60, 0.1) 100%);
  border: 2px solid #6b5ae0;
  position: relative;
  overflow: hidden;
}

.comparison-card-highlight::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #6b5ae0 0%, #ff7a3c 100%);
}

.comparison-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comparison-point {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.6;
}

.comparison-point:last-child {
  margin-bottom: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
