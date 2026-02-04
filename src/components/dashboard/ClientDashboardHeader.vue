<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

defineEmits<{
  newRequest: []
}>()
</script>

<template>
  <v-col cols="12">
    <div
      class="dashboard-header d-flex flex-column flex-sm-row align-stretch align-sm-center justify-space-between flex-wrap ga-3 ga-sm-4"
    >
      <div class="dashboard-header-text min-width-0">
        <h1 class="dashboard-header-title text-h5 text-sm-h4 font-weight-bold">Tableau de bord</h1>
        <p class="dashboard-header-subtitle text-body-2 text-medium-emphasis mt-1 mb-0">
          Bienvenue, {{ auth.user?.email }}. Gérez vos talents et vos missions en toute simplicité.
        </p>
      </div>
      <v-btn
        color="primary"
        size="large"
        prepend-icon="mdi-plus"
        class="dashboard-header-btn text-none font-weight-bold flex-shrink-0"
        @click="$emit('newRequest')"
      >
        Nouvelle demande
      </v-btn>
    </div>
  </v-col>
</template>

<style scoped>
.dashboard-header-title {
  word-break: break-word;
}
.dashboard-header-subtitle {
  word-break: break-word;
}
@media (max-width: 600px) {
  .dashboard-header-btn {
    width: 100%;
  }
}
</style>
