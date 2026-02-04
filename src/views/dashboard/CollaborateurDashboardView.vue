<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import {
  CollaborateurDashboardHeader,
  CollaborateurDashboardStats,
  CollaborateurDashboardMissions,
  CollaborateurDashboardFormations,
  CollaborateurDashboardQuickActions,
} from '@/components/dashboard'

function onViewPlanning() {
  // TODO: ouvrir planning ou rediriger vers page planning
}
</script>

<template>
  <AppLayout>
    <v-row>
      <CollaborateurDashboardHeader @view-planning="onViewPlanning" />
      <CollaborateurDashboardStats />
      <CollaborateurDashboardMissions />
      <CollaborateurDashboardFormations />
      <CollaborateurDashboardQuickActions />
    </v-row>
  </AppLayout>
</template>
