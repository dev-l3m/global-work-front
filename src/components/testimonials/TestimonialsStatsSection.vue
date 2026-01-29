<script setup lang="ts">
const stats = [
  {
    value: '98%',
    label: 'Taux de satisfaction',
    description: 'Clients satisfaits de nos services',
    icon: 'mdi-star',
    color: 'primary',
  },
  {
    value: '200+',
    label: 'Talents déployés',
    description: 'Profils accompagnés avec succès',
    icon: 'mdi-account-group',
    color: 'secondary',
  },
  {
    value: '60+',
    label: 'Entreprises accompagnées',
    description: 'Clients qui nous font confiance',
    icon: 'mdi-office-building',
    color: 'success',
  },
  {
    value: '4.9/5',
    label: 'Note moyenne',
    description: 'Basée sur les retours clients',
    icon: 'mdi-thumb-up',
    color: 'primary',
  },
]
</script>

<template>
  <v-container class="py-12">
    <v-row>
      <v-col
        v-for="(stat, index) in stats"
        :key="index"
        cols="12"
        sm="6"
        md="3"
        class="stats-col"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <v-card class="pa-6 text-center stats-card" elevation="2">
          <v-avatar :color="stat.color" variant="tonal" size="64" class="mb-4">
            <v-icon :icon="stat.icon" size="32" />
          </v-avatar>
          <div class="text-h3 font-weight-bold mb-2 stats-value">{{ stat.value }}</div>
          <div class="text-subtitle-1 font-weight-bold mb-1">{{ stat.label }}</div>
          <div class="text-caption text-medium-emphasis">{{ stat.description }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.stats-col {
  animation: fadeInUp 0.6s ease-out both;
}

.stats-card {
  border-radius: 20px;
  transition: all 0.3s ease;
  height: 100%;
}

.stats-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}

.stats-value {
  background: linear-gradient(135deg, #6b5ae0 0%, #ff7a3c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
