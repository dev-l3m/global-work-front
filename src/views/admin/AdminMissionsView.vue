<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { listMissions } from '@/api/admin/admin.missions.api'
import type { AdminMission, AdminMissionStatus } from '@/api/admin/admin.types'
import AdminFiltersBar from '@/components/admin/AdminFiltersBar.vue'
import AdminTable from '@/components/admin/AdminTable.vue'
import AdminStatusChip from '@/components/admin/AdminStatusChip.vue'
import { getApiErrorMessage } from '@/utils/api-error'
import type { AdminTableColumn } from '@/components/admin/AdminTable.vue'

const route = useRoute()
const router = useRouter()

const items = ref<AdminMission[]>([])
const total = ref(0)
const isLoading = ref(true)
const error = ref<string | null>(null)

const page = computed(() => Math.max(1, Number(route.query.page) || 1))
const limit = computed(() => Math.min(50, Math.max(10, Number(route.query.limit) || 20)))
const statusFilter = computed(
  () => (route.query.status as AdminMissionStatus | undefined) ?? undefined
)

const columns: AdminTableColumn[] = [
  { key: 'title', label: 'Titre' },
  { key: 'status', label: 'Statut' },
  { key: 'clientId', label: 'Client ID' },
  { key: 'collaborateurId', label: 'Collaborateur ID' },
  {
    key: 'startDate',
    label: 'Début',
    format: (v: unknown) => (v ? new Date(String(v)).toLocaleDateString('fr-FR') : '—'),
  },
]

const statusOptions = [
  { value: '', text: 'Tous' },
  { value: 'active', text: 'Active' },
  { value: 'paused', text: 'En pause' },
  { value: 'done', text: 'Terminée' },
]

async function fetchMissions() {
  isLoading.value = true
  error.value = null
  try {
    const res = await listMissions({
      page: page.value,
      limit: limit.value,
      q: (route.query.q as string) || undefined,
      status: statusFilter.value,
    })
    items.value = res.items
    total.value = res.total
  } catch (err) {
    error.value = getApiErrorMessage(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchMissions()
})

watch(
  () => [route.query.page, route.query.limit, route.query.q, route.query.status],
  () => {
    fetchMissions()
  },
  { immediate: false }
)

function goToPage(p: number) {
  router.push({ query: { ...route.query, page: String(p) } })
}
</script>

<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-4">Missions</h1>
    <AdminFiltersBar
      search-key="q"
      search-placeholder="Rechercher..."
      :filters="[{ queryKey: 'status', label: 'Statut', options: statusOptions }]"
      class="mb-4"
    />
    <v-alert v-if="error" type="error" variant="tonal" class="mb-4">
      {{ error }}
    </v-alert>
    <AdminTable :columns="columns" :items="items" :loading="isLoading" row-key="id">
      <template #cell-status="{ row }">
        <AdminStatusChip :status="(row as unknown as AdminMission).status" />
      </template>
    </AdminTable>
    <div class="d-flex align-center justify-space-between mt-4 flex-wrap gap-2">
      <div class="text-body-2 text-medium-emphasis">{{ total }} résultat(s)</div>
      <v-pagination
        :model-value="page"
        :length="Math.ceil(total / limit) || 1"
        :total-visible="7"
        density="comfortable"
        @update:model-value="goToPage"
      />
    </div>
  </div>
</template>
