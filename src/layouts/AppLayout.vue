<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const { mobile } = useDisplay()

const drawerOpen = ref(false)

const title = computed(() => {
  if (route.name === 'client') return 'Espace client'
  if (route.name === 'collaborateur') return 'Espace collaborateur'
  return 'Espace'
})

function onLogout() {
  auth.logout()
  router.push({ name: 'landing' })
}

function closeDrawer() {
  if (mobile.value) drawerOpen.value = false
}
</script>

<template>
  <v-app class="app-layout-dashboard">
    <v-navigation-drawer :permanent="!mobile" v-model="drawerOpen" class="dashboard-drawer">
      <div class="drawer-content d-flex flex-column h-100">
        <v-list density="comfortable" nav class="flex-grow-0">
          <v-list-item class="mb-2" title="Global Work Hub" subtitle="Portail" />
          <v-divider class="mb-2" />

          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Dashboard"
            :to="auth.role === 'client' ? '/espace-client' : '/espace-collaborateur'"
            @click="closeDrawer"
          />
          <v-list-item
            prepend-icon="mdi-file-document-outline"
            title="Documents"
            disabled
            @click="closeDrawer"
          />
          <v-list-item
            prepend-icon="mdi-calendar-check"
            title="Planning"
            disabled
            @click="closeDrawer"
          />
          <v-list-item prepend-icon="mdi-lifebuoy" title="Support" disabled @click="closeDrawer" />
        </v-list>

        <v-spacer />

        <div v-if="mobile" class="drawer-footer pa-3 pt-0">
          <v-chip
            v-if="auth.user"
            color="secondary"
            variant="tonal"
            size="small"
            class="w-100 mb-2"
          >
            {{ auth.user.email }}
          </v-chip>
          <v-btn
            block
            prepend-icon="mdi-logout"
            variant="outlined"
            color="error"
            class="text-none"
            @click="
              onLogout()
              closeDrawer()
            "
          >
            Déconnexion
          </v-btn>
        </div>
      </div>
    </v-navigation-drawer>

    <v-app-bar flat color="surface">
      <v-app-bar-nav-icon
        v-if="mobile"
        aria-label="Ouvrir le menu"
        @click="drawerOpen = !drawerOpen"
      />
      <v-container class="d-flex align-center flex-grow-1">
        <div class="text-subtitle-1 font-weight-bold text-truncate">{{ title }}</div>
        <v-spacer />
        <v-chip v-if="auth.user" color="secondary" variant="tonal" class="mr-2 d-none d-md-flex">
          {{ auth.user.email }}
        </v-chip>
        <v-btn
          prepend-icon="mdi-logout"
          variant="text"
          class="d-none d-md-inline-flex"
          @click="onLogout"
        >
          Déconnexion
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container class="dashboard-container py-4 py-sm-6 py-md-8">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
/* Ne pas utiliser le background .v-application (--v-theme-background) sur les deux dashboards */
.app-layout-dashboard {
  background: transparent !important;
}

.dashboard-drawer :deep(.v-navigation-drawer__content) {
  display: flex;
  flex-direction: column;
}

.drawer-content {
  min-height: 100%;
  flex: 1;
}

.drawer-footer {
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>
