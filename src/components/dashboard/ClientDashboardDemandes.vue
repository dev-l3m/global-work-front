<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getClientDemandes } from '@/api/dashboard-client.api'
import type { DemandeItem } from '@/api/types/dashboard'
import { getApiErrorMessage } from '@/utils/api-error'

const demandes = ref<DemandeItem[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

function getStatutColor(statut: DemandeItem['statut']) {
  return statut === 'Terminée' ? 'success' : statut === 'En cours' ? 'primary' : 'warning'
}

function getStatutIcon(statut: DemandeItem['statut']) {
  return statut === 'Terminée' ? 'mdi-check' : statut === 'En cours' ? 'mdi-clock' : 'mdi-pause'
}

async function fetchDemandes() {
  isLoading.value = true
  error.value = null
  try {
    demandes.value = await getClientDemandes(5)
  } catch (err) {
    error.value = getApiErrorMessage(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchDemandes()
})
</script>

<template>
  <v-col cols="12" md="8">
    <v-card class="demandes-card pa-4 pa-sm-5" variant="outlined">
      <div
        class="demandes-header d-flex flex-column flex-sm-row align-stretch align-sm-center justify-space-between gap-2 mb-2"
      >
        <h2 class="demandes-title text-h6 font-weight-bold mb-0">Suivi de mes demandes</h2>
        <v-btn
          variant="text"
          append-icon="mdi-arrow-right"
          size="small"
          class="align-self-start align-self-sm-center flex-shrink-0"
          >Voir tout</v-btn
        >
      </div>
      <p class="text-body-2 text-medium-emphasis mb-4 demandes-description">
        Consultez l'état de vos demandes de recrutement : en attente, en cours de traitement ou
        terminées. Cliquez sur une demande pour voir le détail.
      </p>
      <v-skeleton-loader v-if="isLoading" type="list-item@3" />
      <v-alert v-else-if="error" type="error" variant="tonal" density="compact" class="mb-4">
        {{ error }}
      </v-alert>
      <v-list v-else class="demandes-list">
        <v-list-item v-for="demande in demandes" :key="demande.id" class="px-0 demandes-list-item">
          <template #prepend>
            <v-avatar
              :color="getStatutColor(demande.statut)"
              variant="tonal"
              size="40"
              class="demandes-list-avatar flex-shrink-0"
            >
              <v-icon :icon="getStatutIcon(demande.statut)" />
            </v-avatar>
          </template>
          <v-list-item-title class="font-weight-bold demandes-list-title">{{
            demande.poste
          }}</v-list-item-title>
          <v-list-item-subtitle class="demandes-list-subtitle">
            {{ demande.statut }} • {{ demande.date }}
          </v-list-item-subtitle>
          <template #append>
            <v-chip
              :color="getStatutColor(demande.statut)"
              variant="tonal"
              size="small"
              class="demandes-list-chip"
            >
              {{ demande.statut }}
            </v-chip>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-col>
</template>

<style scoped>
@media (max-width: 600px) {
  .demandes-title {
    font-size: 1rem !important;
  }
  .demandes-description {
    font-size: 0.8125rem !important;
  }
  .demandes-list-item :deep(.v-list-item__prepend) {
    padding-inline-end: 12px;
  }
  .demandes-list-avatar {
    width: 36px !important;
    height: 36px !important;
    min-width: 36px !important;
  }
  .demandes-list-avatar :deep(.v-icon) {
    font-size: 18px !important;
  }
  .demandes-list-title {
    font-size: 0.875rem !important;
  }
  .demandes-list-subtitle {
    font-size: 0.75rem !important;
  }
  .demandes-list-chip {
    font-size: 0.6875rem !important;
  }
}
</style>
