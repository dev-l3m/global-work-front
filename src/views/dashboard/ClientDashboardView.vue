<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import {
  ClientDashboardHeader,
  ClientDashboardStats,
  ClientDashboardQuickActions,
  ClientDashboardDemandes,
  ClientDashboardAccountCard,
} from '@/components/dashboard'

function onNewRequest() {
  // TODO: ouvrir modal ou rediriger vers formulaire nouvelle demande
}
</script>

<template>
  <AppLayout>
    <v-row>
      <ClientDashboardHeader @new-request="onNewRequest" />
      <ClientDashboardStats />
      <ClientDashboardQuickActions />
      <ClientDashboardDemandes />
      <ClientDashboardAccountCard />
    </v-row>
  </AppLayout>
</template>
