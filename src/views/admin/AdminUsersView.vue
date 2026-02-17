<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { listUsers } from '@/api/admin/admin.users.api'
import type { AdminUser, AdminUserRole, AdminUserStatus } from '@/api/admin/admin.types'
import AdminFiltersBar from '@/components/admin/AdminFiltersBar.vue'
import AdminTable from '@/components/admin/AdminTable.vue'
import AdminStatusChip from '@/components/admin/AdminStatusChip.vue'
import { getApiErrorMessage } from '@/utils/api-error'
import type { AdminTableColumn } from '@/components/admin/AdminTable.vue'

const route = useRoute()
const router = useRouter()

const items = ref<AdminUser[]>([])
const total = ref(0)
const isLoading = ref(true)
const error = ref<string | null>(null)

const page = computed(() => Math.max(1, Number(route.query.page) || 1))
const limit = computed(() => Math.min(50, Math.max(10, Number(route.query.limit) || 20)))
const q = computed(() => (route.query.q as string) ?? '')
const roleFilter = computed((): AdminUserRole | undefined => {
  const r = route.query.role as string
  return r === 'client' || r === 'collaborateur' || r === 'admin' ? r : undefined
})
const statusFilter = computed((): AdminUserStatus | undefined => {
  const s = route.query.status as string
  return s === 'active' || s === 'pending' || s === 'blocked' ? s : undefined
})

const columns: AdminTableColumn[] = [
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Rôle' },
  { key: 'status', label: 'Statut' },
  { key: 'organizationName', label: 'Organisation' },
  {
    key: 'createdAt',
    label: 'Créé le',
    format: (v: unknown) => (v ? new Date(String(v)).toLocaleDateString('fr-FR') : '—'),
  },
]

const roleOptions = [
  { value: '', text: 'Tous les rôles' },
  { value: 'client', text: 'Client' },
  { value: 'collaborateur', text: 'Collaborateur' },
  { value: 'admin', text: 'Admin' },
]

const statusOptions = [
  { value: '', text: 'Tous' },
  { value: 'active', text: 'Actif' },
  { value: 'pending', text: 'En attente' },
  { value: 'blocked', text: 'Bloqué' },
]

async function fetchUsers() {
  isLoading.value = true
  error.value = null
  try {
    const res = await listUsers({
      page: page.value,
      limit: limit.value,
      q: q.value || undefined,
      role: roleFilter.value,
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
  fetchUsers()
})

watch(
  () => [route.query.page, route.query.limit, route.query.q, route.query.role, route.query.status],
  () => {
    fetchUsers()
  },
  { immediate: false }
)

function goToPage(p: number) {
  router.push({ query: { ...route.query, page: String(p) } })
}

function onRowClick(row: Record<string, unknown>) {
  const id = row.id as string
  if (id) router.push({ name: 'admin-user-detail', params: { id } })
}
</script>

<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-4">Utilisateurs</h1>
    <AdminFiltersBar
      search-key="q"
      search-placeholder="Email ou organisation..."
      :filters="[
        { queryKey: 'role', label: 'Rôle', options: roleOptions },
        { queryKey: 'status', label: 'Statut', options: statusOptions },
      ]"
      class="mb-4"
    />
    <v-alert v-if="error" type="error" variant="tonal" class="mb-4">
      {{ error }}
    </v-alert>
    <AdminTable
      :columns="columns"
      :items="items"
      :loading="isLoading"
      row-key="id"
      @row-click="onRowClick"
    >
      <template #cell-status="{ row }">
        <AdminStatusChip
          v-if="(row as unknown as AdminUser).status"
          :status="(row as unknown as AdminUser).status!"
        />
        <span v-else>—</span>
      </template>
      <template #cell-role="{ value }">
        <v-chip size="small" variant="tonal" class="text-none">{{ value }}</v-chip>
      </template>
      <template #actions="{ row }">
        <v-btn
          size="small"
          variant="text"
          color="primary"
          class="text-none"
          @click.stop="
            router.push({
              name: 'admin-user-detail',
              params: { id: (row as unknown as AdminUser).id },
            })
          "
        >
          Voir
        </v-btn>
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
