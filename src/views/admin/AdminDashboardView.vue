<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getAdminStats } from '@/api/admin/admin.stats.api'
import type { AdminStats } from '@/api/admin/admin.types'
import AdminKpiCards from '@/components/admin/AdminKpiCards.vue'
import type { KpiItem } from '@/components/admin/AdminKpiCards.vue'
import { getApiErrorMessage } from '@/utils/api-error'

const stats = ref<AdminStats | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const kpiItems = computed<KpiItem[]>(() => {
  const s = stats.value
  if (!s) return []
  return [
    {
      label: 'Utilisateurs total',
      value: s.usersTotal,
      icon: 'mdi-account-group',
      color: 'primary',
    },
    { label: 'Clients', value: s.clientsTotal, icon: 'mdi-account-tie', color: 'secondary' },
    { label: 'Collaborateurs', value: s.collaborateursTotal, icon: 'mdi-account', color: 'info' },
    {
      label: 'Demandes total',
      value: s.demandesTotal,
      icon: 'mdi-file-document-outline',
      color: 'warning',
    },
    {
      label: 'Missions total',
      value: s.missionsTotal,
      icon: 'mdi-briefcase-outline',
      color: 'success',
    },
    { label: 'Demandes en cours', value: s.demandesEnCours ?? '—', icon: 'mdi-clock-outline' },
    { label: 'Missions actives', value: s.missionsActives ?? '—', icon: 'mdi-play-circle-outline' },
  ]
})

async function fetchStats() {
  isLoading.value = true
  error.value = null
  try {
    stats.value = await getAdminStats()
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
  <div>
    <h1 class="text-h5 font-weight-bold mb-4">Tableau de bord</h1>
    <v-alert v-if="error" type="error" variant="tonal" class="mb-4">
      {{ error }}
    </v-alert>
    <AdminKpiCards :items="kpiItems" :loading="isLoading" />
  </div>
</template>
