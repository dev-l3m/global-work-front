<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

// TODO: venir du store ou de l’API (profil client)
const memberSince = 'janvier 2024'
</script>

<template>
  <v-col cols="12" md="4">
    <v-card class="account-card pa-4 pa-sm-5" variant="outlined">
      <h2 class="account-card-title text-h6 font-weight-bold mb-3 mb-sm-4">Mon compte</h2>
      <div class="d-flex align-center ga-3 mb-3 mb-sm-4">
        <v-avatar color="primary" variant="tonal" size="48" class="account-avatar flex-shrink-0">
          <v-icon icon="mdi-domain" />
        </v-avatar>
        <div class="min-width-0 flex-grow-1">
          <div class="font-weight-bold account-company">Entreprise</div>
          <div class="text-body-2 text-medium-emphasis account-email text-truncate">
            {{ auth.user?.email }}
          </div>
        </div>
      </div>
      <v-divider class="my-3 my-sm-4" />
      <div class="text-body-2 text-medium-emphasis mb-2 account-meta">
        <v-icon icon="mdi-shield-check" size="16" class="mr-2" />
        Compte vérifié
      </div>
      <div class="text-body-2 text-medium-emphasis account-meta">
        <v-icon icon="mdi-calendar" size="16" class="mr-2" />
        Membre depuis {{ memberSince }}
      </div>
      <v-btn variant="outlined" block class="mt-4 text-none" size="small">Gérer mon compte</v-btn>
    </v-card>
  </v-col>
</template>

<style scoped>
.account-email {
  word-break: break-all;
}
@media (max-width: 600px) {
  .account-card-title {
    font-size: 1rem !important;
  }
  .account-avatar {
    width: 40px !important;
    height: 40px !important;
    min-width: 40px !important;
  }
  .account-avatar :deep(.v-icon) {
    font-size: 20px !important;
  }
  .account-company {
    font-size: 0.875rem !important;
  }
  .account-email,
  .account-meta {
    font-size: 0.8125rem !important;
  }
}
</style>
