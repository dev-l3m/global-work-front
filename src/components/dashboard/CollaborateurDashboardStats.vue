<script setup lang="ts">
import { ref, onMounted } from 'vue'

export interface CollaborateurStats {
  missionsActives: number
  heuresSemaine: number
  formationsCount: number
  evaluation: string
}

const stats = ref<CollaborateurStats>({
  missionsActives: 0,
  heuresSemaine: 0,
  formationsCount: 0,
  evaluation: '0/5',
})

const isLoading = ref(true)

/** Service : récupère les statistiques du tableau de bord collaborateur (à remplacer par l’API) */
async function fetchStats() {
  isLoading.value = true
  try {
    // TODO: remplacer par appel API (ex. api.getCollaborateurDashboardStats())
    await new Promise(resolve => setTimeout(resolve, 300))
    stats.value = {
      missionsActives: 1,
      heuresSemaine: 35,
      formationsCount: 2,
      evaluation: '4.8/5',
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchStats()
})
</script>

<template>
  <template
    v-for="(stat, i) in [
      {
        label: 'Missions actives',
        value: stats.missionsActives,
        color: 'primary',
        icon: 'mdi-briefcase',
        variant: 'tonal' as const,
      },
      {
        label: 'Heures cette semaine',
        value: `${stats.heuresSemaine}h`,
        color: 'secondary',
        icon: 'mdi-clock-outline',
        variant: 'outlined' as const,
      },
      {
        label: 'Formations',
        value: stats.formationsCount,
        color: 'success',
        icon: 'mdi-school',
        variant: 'outlined' as const,
      },
      {
        label: 'Évaluation',
        value: stats.evaluation,
        color: 'warning',
        icon: 'mdi-star',
        variant: 'outlined' as const,
      },
    ]"
    :key="i"
  >
    <v-col cols="12" sm="6" md="3">
      <v-card class="stats-card pa-4 pa-sm-5" :variant="stat.variant" :color="stat.color">
        <div class="d-flex align-center justify-space-between">
          <div class="min-width-0 flex-grow-1">
            <div class="stats-label text-overline font-weight-bold">{{ stat.label }}</div>
            <div class="stats-value text-h5 text-sm-h4 font-weight-bold mt-2">
              <v-skeleton-loader v-if="isLoading" type="text" width="60" />
              <template v-else>{{ stat.value }}</template>
            </div>
          </div>
          <v-avatar :color="stat.color" size="56" variant="flat" class="stats-avatar flex-shrink-0">
            <v-icon :icon="stat.icon" size="32" />
          </v-avatar>
        </div>
      </v-card>
    </v-col>
  </template>
</template>

<style scoped>
@media (max-width: 600px) {
  .stats-avatar {
    width: 44px !important;
    height: 44px !important;
    min-width: 44px !important;
  }
  .stats-avatar :deep(.v-icon) {
    font-size: 24px !important;
  }
}
</style>
