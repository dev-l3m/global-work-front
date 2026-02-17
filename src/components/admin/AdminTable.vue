<script setup lang="ts">
export interface AdminTableColumn {
  key: string
  label: string
  sortable?: boolean
  /** Optional formatter: (value, row) => string */
  format?: (value: unknown, row: Record<string, unknown>) => string
}

withDefaults(
  defineProps<{
    columns: AdminTableColumn[]
    items: Record<string, unknown>[]
    loading?: boolean
    rowKey?: string
  }>(),
  { loading: false, rowKey: 'id' }
)

const emit = defineEmits<{
  rowClick: [row: Record<string, unknown>]
}>()

function getCellValue(row: Record<string, unknown>, col: AdminTableColumn): string {
  const value = row[col.key]
  if (col.format) return col.format(value, row)
  if (value == null) return '—'
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  if (typeof value === 'object' && value !== null && 'toString' in value) return String(value)
  return '—'
}

function onRowClick(row: Record<string, unknown>) {
  emit('rowClick', row)
}
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th
          v-for="col in columns"
          :key="col.key"
          class="text-left text-body-2 font-weight-bold"
        >
          {{ col.label }}
        </th>
        <th v-if="$slots.actions" class="text-right text-body-2 font-weight-bold">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="loading">
        <tr v-for="i in 5" :key="`skeleton-${i}`">
          <td
            v-for="col in columns"
            :key="col.key"
            colspan="1"
          >
            <v-skeleton-loader type="text" />
          </td>
          <td v-if="$slots.actions"><v-skeleton-loader type="button" width="80" /></td>
        </tr>
      </template>
      <template v-else-if="items.length === 0">
        <tr>
          <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="text-center py-8 text-medium-emphasis">
            Aucun résultat
          </td>
        </tr>
      </template>
      <template v-else>
        <tr
          v-for="(row, index) in items"
          :key="(row[rowKey] as string) ?? index"
          class="admin-table-row"
          @click="onRowClick(row)"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            class="text-body-2"
          >
            <slot :name="`cell-${col.key}`" :value="row[col.key]" :row="row">
              {{ getCellValue(row as Record<string, unknown>, col) }}
            </slot>
          </td>
          <td v-if="$slots.actions" class="text-right" @click.stop>
            <slot name="actions" :row="row" />
          </td>
        </tr>
      </template>
    </tbody>
  </v-table>
</template>

<style scoped>
.admin-table-row {
  cursor: pointer;
}
.admin-table-row:hover {
  background: rgba(var(--v-theme-primary), 0.04);
}
</style>
