<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const title = computed(() => {
  if (route.name === 'client') return 'Espace client'
  if (route.name === 'collaborateur') return 'Espace collaborateur'
  return 'Espace'
})

function onLogout() {
  auth.logout()
  router.push({ name: 'landing' })
}
</script>

<template>
  <v-app>
    <v-navigation-drawer permanent>
      <v-list density="comfortable" nav>
        <v-list-item class="mb-2" title="Global Work Hub" subtitle="Portail" />
        <v-divider class="mb-2" />

        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          :to="auth.role === 'client' ? '/espace-client' : '/espace-collaborateur'"
        />
        <v-list-item prepend-icon="mdi-file-document-outline" title="Documents" disabled />
        <v-list-item prepend-icon="mdi-calendar-check" title="Planning" disabled />
        <v-list-item prepend-icon="mdi-lifebuoy" title="Support" disabled />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar flat color="surface">
      <v-container class="d-flex align-center">
        <div class="text-subtitle-1 font-weight-bold">{{ title }}</div>
        <v-spacer />
        <v-chip v-if="auth.user" color="secondary" variant="tonal" class="mr-2">
          {{ auth.user.email }}
        </v-chip>
        <v-btn prepend-icon="mdi-logout" variant="text" @click="onLogout">Déconnexion</v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container class="py-8">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
