<script setup lang="ts">
import { ref, onMounted } from 'vue'

export interface FormationItem {
  id: number
  titre: string
  statut: 'Terminée' | 'En cours'
  date: string
}

const formations = ref<FormationItem[]>([])
const isLoading = ref(true)

function getStatutColor(statut: FormationItem['statut']) {
  return statut === 'Terminée' ? 'success' : 'info'
}

function getStatutIcon(statut: FormationItem['statut']) {
  return statut === 'Terminée' ? 'mdi-check' : 'mdi-book-open'
}

/** Service : récupère les formations du collaborateur (à remplacer par l’API) */
async function fetchFormations() {
  isLoading.value = true
  try {
    // TODO: remplacer par appel API (ex. api.getCollaborateurFormations())
    await new Promise(resolve => setTimeout(resolve, 200))
    formations.value = [
      { id: 1, titre: 'Formation React Avancé', statut: 'Terminée', date: '2024-01-10' },
      { id: 2, titre: 'Certification Agile', statut: 'En cours', date: '2024-01-20' },
    ]
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
