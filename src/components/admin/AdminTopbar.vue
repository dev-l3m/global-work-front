<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const router = useRouter()
const auth = useAuthStore()
const { user } = storeToRefs(auth)

function onLogout() {
  auth.logout()
  router.push({ name: 'landing' })
}
</script>

<template>
  <v-app-bar flat density="default" class="admin-topbar">
    <v-app-bar-nav-icon class="d-md-none" />
    <v-spacer />
    <div class="d-flex align-center ga-2">
      <v-chip v-if="user?.email" color="primary" variant="tonal" size="small" class="text-none">
        {{ user.email }}
      </v-chip>
      <v-chip color="secondary" variant="flat" size="small" class="text-none"> Admin </v-chip>
      <v-btn icon variant="text" size="small" title="Déconnexion" @click="onLogout">
        <v-icon icon="mdi-logout" />
      </v-btn>
    </div>
  </v-app-bar>
</template>

<style scoped>
.admin-topbar {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>
