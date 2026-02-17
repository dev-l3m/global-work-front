<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCollaborateurFormations } from '@/api/dashboard-collaborateur.api'
import type { FormationItem } from '@/api/types/dashboard'
import { getApiErrorMessage } from '@/utils/api-error'

const formations = ref<FormationItem[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

function getStatutColor(statut: FormationItem['statut']) {
  return statut === 'Terminée' ? 'success' : 'info'
}

function getStatutIcon(statut: FormationItem['statut']) {
  return statut === 'Terminée' ? 'mdi-check' : 'mdi-book-open'
}

async function fetchFormations() {
  isLoading.value = true
  error.value = null
  try {
    formations.value = await getCollaborateurFormations()
  } catch (err) {
    error.value = getApiErrorMessage(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchFormations()
})
</script>

<template>
  <v-col cols="12" md="4">
    <v-card class="formations-card pa-4 pa-sm-5" variant="outlined">
      <h2 class="formations-title text-h6 font-weight-bold mb-3 mb-sm-4">Mes formations</h2>
      <v-skeleton-loader v-if="isLoading" type="list-item@2" />
      <v-alert v-else-if="error" type="error" variant="tonal" density="compact" class="mb-4">
        {{ error }}
      </v-alert>
      <v-list v-else class="formations-list">
        <v-list-item
          v-for="formation in formations"
          :key="formation.id"
          class="px-0 formations-list-item"
        >
          <template #prepend>
            <v-avatar
              :color="getStatutColor(formation.statut)"
              variant="tonal"
              size="32"
              class="formations-list-avatar flex-shrink-0"
            >
              <v-icon :icon="getStatutIcon(formation.statut)" size="20" />
            </v-avatar>
          </template>
          <v-list-item-title class="text-body-2 font-weight-bold formations-list-title">
            {{ formation.titre }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-caption formations-list-subtitle">{{
            formation.date
          }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-btn variant="outlined" block class="mt-4 text-none" size="small"
        >Voir toutes les formations</v-btn
      >
    </v-card>
  </v-col>
</template>

<style scoped>
@media (max-width: 600px) {
  .formations-title {
    font-size: 1rem !important;
  }
  .formations-list-item :deep(.v-list-item__prepend) {
    padding-inline-end: 12px;
  }
  .formations-list-avatar {
    width: 28px !important;
    height: 28px !important;
    min-width: 28px !important;
  }
  .formations-list-avatar :deep(.v-icon) {
    font-size: 16px !important;
  }
  .formations-list-title {
    font-size: 0.875rem !important;
  }
  .formations-list-subtitle {
    font-size: 0.75rem !important;
  }
}
</style>
