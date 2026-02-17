<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCollaborateurStats } from '@/api/dashboard-collaborateur.api'
import type { CollaborateurStats } from '@/api/types/dashboard'
import { getApiErrorMessage } from '@/utils/api-error'

const stats = ref<CollaborateurStats>({
  missionsActives: 0,
  heuresSemaine: 0,
  formationsCount: 0,
  evaluation: '0/5',
})

const isLoading = ref(true)
const error = ref<string | null>(null)

async function fetchStats() {
  isLoading.value = true
  error.value = null
  try {
    stats.value = await getCollaborateurStats()
  } catch (err) {
    error.value = getApiErrorMessage(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchStats()
})
</script>

<template>
  <v-col v-if="error" cols="12">
    <v-alert type="error" variant="tonal" density="compact">{{ error }}</v-alert>
  </v-col>
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
