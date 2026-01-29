<script setup lang="ts">
defineProps<{
  icon?: string
  iconColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  title: string
  items?: string[]
  description?: string
}>()
</script>

<template>
  <v-card class="pa-6 h-100 feature-card" variant="outlined" elevation="2">
    <div v-if="icon || title" class="d-flex align-center ga-3 mb-4">
      <v-avatar v-if="icon" :color="iconColor || 'primary'" variant="tonal" size="56">
        <v-icon :icon="icon" size="28" />
      </v-avatar>
      <div v-if="title" class="text-h6 font-weight-bold">{{ title }}</div>
    </div>
    <ul v-if="items && items.length > 0" class="mt-3 text-body-2 text-medium-emphasis feature-list">
      <li v-for="(item, index) in items" :key="index" class="feature-item">
        <v-icon icon="mdi-check-circle" size="18" color="success" class="mr-2" />
        {{ item }}
      </li>
    </ul>
    <div
      v-if="description"
      class="text-body-2 text-medium-emphasis mt-3"
      style="line-height: 1.7"
      v-html="description"
    />
  </v-card>
</template>

<style scoped>
.feature-card {
  border-radius: 20px;
  transition: all 0.3s ease;
  border-width: 2px;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
  border-color: rgb(var(--v-theme-primary));
}

.feature-list {
  padding-left: 0;
  margin: 0;
  list-style: none;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  line-height: 1.6;
}

.feature-item:last-child {
  margin-bottom: 0;
}
</style>
