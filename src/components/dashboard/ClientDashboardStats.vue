<script setup lang="ts">
import { ref, onMounted } from 'vue'

export interface DashboardStats {
  talentsActifs: number
  demandesEnCours: number
  missionsTerminees: number
  satisfaction: number
}

const stats = ref<DashboardStats>({
  talentsActifs: 0,
  demandesEnCours: 0,
  missionsTerminees: 0,
  satisfaction: 0,
})

const isLoading = ref(true)

/** Service : récupère les statistiques du tableau de bord (à remplacer par l’API) */
async function fetchStats() {
  isLoading.value = true
  try {
    // TODO: remplacer par appel API (ex. api.getClientDashboardStats())
    await new Promise(resolve => setTimeout(resolve, 300))
    stats.value = {
      talentsActifs: 12,
      demandesEnCours: 3,
      missionsTerminees: 28,
      satisfaction: 98,
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
        label: 'Talents actifs',
        value: stats.talentsActifs,
        color: 'primary',
        icon: 'mdi-account-group',
        variant: 'tonal' as const,
      },
      {
        label: 'Demandes en cours',
        value: stats.demandesEnCours,
        color: 'secondary',
        icon: 'mdi-file-document-edit',
        variant: 'outlined' as const,
      },
      {
        label: 'Missions terminées',
        value: stats.missionsTerminees,
        color: 'success',
        icon: 'mdi-check-circle',
        variant: 'outlined' as const,
      },
      {
        label: 'Satisfaction',
        value: `${stats.satisfaction}%`,
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
