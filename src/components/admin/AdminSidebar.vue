<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { title: 'Tableau de bord', to: { name: 'admin-dashboard' }, icon: 'mdi-view-dashboard' },
  { title: 'Utilisateurs', to: { name: 'admin-users' }, icon: 'mdi-account-group' },
  { title: 'Demandes', to: { name: 'admin-demandes' }, icon: 'mdi-file-document-outline' },
  { title: 'Missions', to: { name: 'admin-missions' }, icon: 'mdi-briefcase-outline' },
  { title: 'Paramètres', to: { name: 'admin-settings' }, icon: 'mdi-cog-outline' },
]
</script>

<template>
  <v-navigation-drawer permanent class="admin-sidebar">
    <v-list density="comfortable" nav>
      <v-list-item
        class="mb-2"
        title="Backoffice"
        subtitle="Global Work Hub"
        prepend-icon="mdi-shield-account"
      />
      <v-divider class="mb-2" />
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
        :active="route.name === (item.to as { name: string }).name"
        rounded="lg"
        class="mb-1"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.admin-sidebar {
  border-inline-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>
