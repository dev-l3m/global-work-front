<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  /** Query key for search (e.g. 'q') */
  searchKey?: string
  /** Placeholder for search field */
  searchPlaceholder?: string
  /** Filters: { queryKey, label, options: { value, text }[] } */
  filters?: { queryKey: string; label: string; options: { value: string; text: string }[] }[]
}>()

const route = useRoute()
const router = useRouter()

const searchKey = props.searchKey ?? 'q'
const search = ref<string>((route.query[searchKey] as string) ?? '')

watch(
  () => route.query[searchKey],
  v => {
    search.value = (v as string) ?? ''
  }
)

let searchDebounce: ReturnType<typeof setTimeout> | null = null

function applyFilters(updates: Record<string, string | undefined>) {
  const query = { ...route.query }
  for (const [k, v] of Object.entries(updates)) {
    if (v === undefined || v === '') delete query[k]
    else query[k] = v
  }
  delete query.page
  router.push({ query })
}

function onSearchInput() {
  if (searchDebounce) clearTimeout(searchDebounce)
  searchDebounce = setTimeout(() => {
    applyFilters({ [searchKey]: search.value || undefined })
  }, 300)
}

function onFilterChange(key: string, value: string) {
  applyFilters({ [key]: value || undefined })
}

function reset() {
  search.value = ''
  const query: Record<string, string> = {}
  router.push({ query })
}
</script>

<template>
  <div
    class="admin-filters-bar d-flex flex-wrap align-center gap-3 pa-3 pa-sm-4 rounded-lg bg-surface-variant"
  >
    <v-text-field
      v-model="search"
      :placeholder="searchPlaceholder ?? 'Rechercher...'"
      density="compact"
      variant="outlined"
      hide-details
      clearable
      class="admin-filters-search"
      style="max-width: 280px"
      @update:model-value="onSearchInput"
    >
      <template #prepend-inner>
        <v-icon icon="mdi-magnify" size="20" />
      </template>
    </v-text-field>
    <template v-for="f in filters" :key="f.queryKey">
      <v-select
        :model-value="(route.query[f.queryKey] as string) ?? ''"
        :items="f.options"
        :label="f.label"
        density="compact"
        variant="outlined"
        hide-details
        clearable
        class="admin-filters-select"
        style="min-width: 140px"
        @update:model-value="(v: string) => onFilterChange(f.queryKey, v)"
      />
    </template>
    <v-btn variant="text" size="small" color="primary" class="text-none" @click="reset">
      Réinitialiser
    </v-btn>
  </div>
</template>
