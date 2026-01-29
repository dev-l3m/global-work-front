<script setup lang="ts">
const features = [
  {
    title: 'Gestion complète des salaires et charges sociales',
    icon: 'mdi-cash-multiple',
    color: 'primary',
  },
  {
    title: 'Paiement sécurisé selon les standards internationaux',
    icon: 'mdi-shield-check',
    color: 'secondary',
  },
  {
    title: 'Flexibilité pour contrats à temps plein ou partiel',
    icon: 'mdi-calendar-clock',
    color: 'success',
  },
]

const advantages = [
  {
    title: 'Réduction de la complexité administrative',
    icon: 'mdi-file-document-edit',
    color: 'primary',
  },
  {
    title: 'Respect de la législation locale et européenne',
    icon: 'mdi-gavel',
    color: 'secondary',
  },
  {
    title: 'Transparence sur tous les coûts',
    icon: 'mdi-eye',
    color: 'success',
  },
]
</script>

<template>
  <v-container class="py-16">
    <v-row>
      <v-col cols="12" md="6">
        <div class="text-center mb-8">
          <div class="text-h5 font-weight-bold mb-6">Ce que nous proposons</div>
        </div>
        <v-row>
          <v-col
            v-for="(feature, index) in features"
            :key="index"
            cols="12"
            v-scroll-animation="{
              animation: 'fadeInUp',
              delay: index * 0.15,
              threshold: 0.1,
            }"
          >
            <v-card class="pa-4 feature-card" variant="outlined" elevation="2">
              <div class="d-flex align-center ga-3">
                <v-avatar :color="feature.color" variant="tonal" size="48">
                  <v-icon :icon="feature.icon" size="24" />
                </v-avatar>
                <div class="text-subtitle-2 font-weight-bold">{{ feature.title }}</div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <div class="text-center mb-8">
          <div class="text-h5 font-weight-bold mb-6">Avantages</div>
        </div>
        <v-row>
          <v-col
            v-for="(advantage, index) in advantages"
            :key="index"
            cols="12"
            v-scroll-animation="{
              animation: 'fadeInUp',
              delay: index * 0.15,
              threshold: 0.1,
            }"
          >
            <v-card class="pa-4 advantage-card" variant="tonal" color="primary" elevation="2">
              <div class="d-flex align-center ga-3">
                <v-avatar :color="advantage.color" variant="flat" size="48">
                  <v-icon :icon="advantage.icon" size="24" color="white" />
                </v-avatar>
                <div class="text-subtitle-2 font-weight-bold">{{ advantage.title }}</div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.feature-card {
  border-radius: 16px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateX(8px);
  box-shadow: 0 8px 24px rgba(107, 90, 224, 0.15);
}

.advantage-card {
  border-radius: 16px;
  border-left: 4px solid rgb(var(--v-theme-secondary));
  transition: all 0.3s ease;
}

.advantage-card:hover {
  transform: translateX(8px);
  box-shadow: 0 8px 24px rgba(255, 122, 60, 0.15);
}
</style>
