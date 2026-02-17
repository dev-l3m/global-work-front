<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCollaborateurMissions } from '@/api/dashboard-collaborateur.api'
import type { MissionItem } from '@/api/types/dashboard'
import { getApiErrorMessage } from '@/utils/api-error'

const missions = ref<MissionItem[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

function getStatutColor(statut: MissionItem['statut']) {
  return statut === 'En cours' ? 'primary' : 'warning'
}

function getStatutIcon(statut: MissionItem['statut']) {
  return statut === 'En cours' ? 'mdi-play-circle' : 'mdi-pause-circle'
}

async function fetchMissions() {
  isLoading.value = true
  error.value = null
  try {
    missions.value = await getCollaborateurMissions()
  } catch (err) {
    error.value = getApiErrorMessage(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchMissions()
})
</script>

<template>
  <v-col cols="12" md="8">
    <v-card class="missions-card pa-4 pa-sm-5" variant="outlined">
      <div
        class="missions-header d-flex flex-column flex-sm-row align-stretch align-sm-center justify-space-between gap-2 mb-3 mb-sm-4"
      >
        <h2 class="missions-title text-h6 font-weight-bold mb-0">Mes missions</h2>
        <v-btn
          variant="text"
          append-icon="mdi-arrow-right"
          size="small"
          class="align-self-start align-self-sm-center flex-shrink-0"
          >Voir tout</v-btn
        >
      </div>
      <v-skeleton-loader v-if="isLoading" type="list-item@2" />
      <v-alert v-else-if="error" type="error" variant="tonal" density="compact" class="mb-4">
        {{ error }}
      </v-alert>
      <v-list v-else class="missions-list">
        <v-list-item v-for="mission in missions" :key="mission.id" class="px-0 missions-list-item">
          <template #prepend>
            <v-avatar
              :color="getStatutColor(mission.statut)"
              variant="tonal"
              size="40"
              class="missions-list-avatar flex-shrink-0"
            >
              <v-icon :icon="getStatutIcon(mission.statut)" />
            </v-avatar>
          </template>
          <v-list-item-title class="font-weight-bold missions-list-title">{{
            mission.poste
          }}</v-list-item-title>
          <v-list-item-subtitle class="missions-list-subtitle">
            {{ mission.client }} • {{ mission.heures }}h/semaine
          </v-list-item-subtitle>
          <template #append>
            <v-chip
              :color="getStatutColor(mission.statut)"
              variant="tonal"
              size="small"
              class="missions-list-chip"
            >
              {{ mission.statut }}
            </v-chip>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-col>
</template>

<style scoped>
@media (max-width: 600px) {
  .missions-title {
    font-size: 1rem !important;
  }
  .missions-list-item :deep(.v-list-item__prepend) {
    padding-inline-end: 12px;
  }
  .missions-list-avatar {
    width: 36px !important;
    height: 36px !important;
    min-width: 36px !important;
  }
  .missions-list-avatar :deep(.v-icon) {
    font-size: 18px !important;
  }
  .missions-list-title {
    font-size: 0.875rem !important;
  }
  .missions-list-subtitle {
    font-size: 0.75rem !important;
  }
  .missions-list-chip {
    font-size: 0.6875rem !important;
  }
}
</style>
