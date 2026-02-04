<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

interface QuickAction {
  title: string
  subtitle: string
  icon: string
  color: string
  to?: string
}

const actions: QuickAction[] = [
  {
    title: 'Rechercher un talent',
    subtitle: 'Nouvelle demande',
    icon: 'mdi-account-plus',
    color: 'primary',
    to: '/espace-client', // TODO: lien vers formulaire nouvelle demande
  },
  {
    title: 'Mes documents',
    subtitle: 'Contrats & factures',
    icon: 'mdi-file-document-multiple',
    color: 'secondary',
    to: '/espace-client', // TODO: lien vers documents
  },
  {
    title: 'Rapports',
    subtitle: 'Performance & KPI',
    icon: 'mdi-chart-line',
    color: 'info',
    to: '/espace-client', // TODO: lien vers rapports
  },
  {
    title: 'Support',
    subtitle: 'Aide & contact',
    icon: 'mdi-lifebuoy',
    color: 'success',
    to: '/contactez-nous',
  },
]

function handleAction(action: QuickAction) {
  if (action.to) {
    router.push(action.to)
  }
}
</script>

<template>
  <v-col cols="12">
    <div class="text-h6 font-weight-bold mb-3 mb-sm-4 quick-actions-title">Actions rapides</div>
    <v-row dense class="quick-actions-row">
      <v-col v-for="(action, i) in actions" :key="i" cols="12" sm="6" md="3">
        <v-card
          class="pa-3 pa-sm-4 quick-action-card"
          variant="outlined"
          hover
          @click="handleAction(action)"
        >
          <div class="d-flex align-center ga-3">
            <v-avatar
              :color="action.color"
              variant="tonal"
              size="40"
              class="quick-action-avatar flex-shrink-0"
            >
              <v-icon :icon="action.icon" size="20" />
            </v-avatar>
            <div class="min-width-0 flex-grow-1">
              <div class="font-weight-bold text-body-2 text-sm-body-1 quick-action-title">
                {{ action.title }}
              </div>
              <div class="text-caption text-medium-emphasis quick-action-subtitle">
                {{ action.subtitle }}
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<style scoped>
.quick-action-card {
  cursor: pointer;
  transition: all 0.2s ease;
}
.quick-action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
@media (max-width: 600px) {
  .quick-actions-title {
    font-size: 1rem !important;
  }
  .quick-action-title {
    font-size: 0.875rem !important;
  }
  .quick-action-subtitle {
    font-size: 0.75rem !important;
  }
}
</style>
