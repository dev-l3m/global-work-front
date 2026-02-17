<script setup lang="ts">
export interface KpiItem {
  label: string
  value: string | number
  icon?: string
  color?: string
}

defineProps<{
  items: KpiItem[]
  loading?: boolean
}>()
</script>

<template>
  <v-row>
    <v-col v-for="(item, i) in items" :key="i" cols="12" sm="6" md="4" lg="3">
      <v-card class="pa-4" variant="outlined" :loading="loading">
        <div class="d-flex align-center justify-space-between">
          <div class="min-width-0 flex-grow-1">
            <div class="text-caption text-medium-emphasis">{{ item.label }}</div>
            <div class="text-h5 font-weight-bold mt-1">
              <v-skeleton-loader v-if="loading" type="text" width="60" />
              <template v-else>{{ item.value }}</template>
            </div>
          </div>
          <v-avatar v-if="item.icon" :color="item.color ?? 'primary'" variant="tonal" size="44">
            <v-icon :icon="item.icon" />
          </v-avatar>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>
