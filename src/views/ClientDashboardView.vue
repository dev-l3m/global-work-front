<script setup lang="ts">
import { ref } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

// Données de démonstration (à remplacer par votre API)
const stats = ref({
  talentsActifs: 12,
  demandesEnCours: 3,
  missionsTerminees: 28,
  satisfaction: 98,
})

const demandesRecentes = ref([
  { id: 1, poste: 'Développeur Full Stack', statut: 'En cours', date: '2024-01-15' },
  { id: 2, poste: 'Support Client Multilingue', statut: 'En attente', date: '2024-01-20' },
  { id: 3, poste: 'Marketing Digital', statut: 'Terminée', date: '2024-01-10' },
])
</script>

<template>
  <AppLayout>
    <v-row>
      <v-col cols="12">
        <div class="d-flex align-center justify-space-between flex-wrap ga-4">
          <div>
            <div class="text-h4 font-weight-bold">Tableau de bord</div>
            <div class="text-body-2 text-medium-emphasis mt-1">
              Bienvenue, {{ auth.user?.email }}. Gérez vos talents et vos missions en toute
              simplicité.
            </div>
          </div>
          <v-btn
            color="primary"
            size="large"
            prepend-icon="mdi-plus"
            class="text-none font-weight-bold"
          >
            Nouvelle demande
          </v-btn>
        </div>
      </v-col>

      <!-- Statistiques -->
      <v-col cols="12" md="3">
        <v-card class="pa-5" variant="tonal" color="primary">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-overline font-weight-bold">Talents actifs</div>
              <div class="text-h4 font-weight-bold mt-2">{{ stats.talentsActifs }}</div>
            </div>
            <v-avatar color="primary" size="56" variant="flat">
              <v-icon icon="mdi-account-group" size="32" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-5" variant="outlined">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-overline font-weight-bold">Demandes en cours</div>
              <div class="text-h4 font-weight-bold mt-2">{{ stats.demandesEnCours }}</div>
            </div>
            <v-avatar color="secondary" size="56" variant="tonal">
              <v-icon icon="mdi-file-document-edit" size="32" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-5" variant="outlined">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-overline font-weight-bold">Missions terminées</div>
              <div class="text-h4 font-weight-bold mt-2">{{ stats.missionsTerminees }}</div>
            </div>
            <v-avatar color="success" size="56" variant="tonal">
              <v-icon icon="mdi-check-circle" size="32" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-5" variant="outlined">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-overline font-weight-bold">Satisfaction</div>
              <div class="text-h4 font-weight-bold mt-2">{{ stats.satisfaction }}%</div>
            </div>
            <v-avatar color="warning" size="56" variant="tonal">
              <v-icon icon="mdi-star" size="32" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <!-- Actions rapides -->
      <v-col cols="12">
        <div class="text-h6 font-weight-bold mb-4">Actions rapides</div>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-card class="pa-4 cursor-pointer" variant="outlined" hover>
              <div class="d-flex align-center ga-3">
                <v-avatar color="primary" variant="tonal">
                  <v-icon icon="mdi-account-plus" />
                </v-avatar>
                <div>
                  <div class="font-weight-bold">Rechercher un talent</div>
                  <div class="text-caption text-medium-emphasis">Nouvelle demande</div>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="pa-4 cursor-pointer" variant="outlined" hover>
              <div class="d-flex align-center ga-3">
                <v-avatar color="secondary" variant="tonal">
                  <v-icon icon="mdi-file-document-multiple" />
                </v-avatar>
                <div>
                  <div class="font-weight-bold">Mes documents</div>
                  <div class="text-caption text-medium-emphasis">Contrats & factures</div>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="pa-4 cursor-pointer" variant="outlined" hover>
              <div class="d-flex align-center ga-3">
                <v-avatar color="info" variant="tonal">
                  <v-icon icon="mdi-chart-line" />
                </v-avatar>
                <div>
                  <div class="font-weight-bold">Rapports</div>
                  <div class="text-caption text-medium-emphasis">Performance & KPI</div>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="pa-4 cursor-pointer" variant="outlined" hover>
              <div class="d-flex align-center ga-3">
                <v-avatar color="success" variant="tonal">
                  <v-icon icon="mdi-lifebuoy" />
                </v-avatar>
                <div>
                  <div class="font-weight-bold">Support</div>
                  <div class="text-caption text-medium-emphasis">Aide & contact</div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- Demandes récentes -->
      <v-col cols="12" md="8">
        <v-card class="pa-5" variant="outlined">
          <div class="d-flex align-center justify-space-between mb-4">
            <div class="text-h6 font-weight-bold">Demandes récentes</div>
            <v-btn variant="text" append-icon="mdi-arrow-right">Voir tout</v-btn>
          </div>
          <v-list>
            <v-list-item v-for="demande in demandesRecentes" :key="demande.id" class="px-0">
              <template #prepend>
                <v-avatar
                  :color="
                    demande.statut === 'Terminée'
                      ? 'success'
                      : demande.statut === 'En cours'
                        ? 'primary'
                        : 'warning'
                  "
                  variant="tonal"
                  size="40"
                >
                  <v-icon
                    :icon="
                      demande.statut === 'Terminée'
                        ? 'mdi-check'
                        : demande.statut === 'En cours'
                          ? 'mdi-clock'
                          : 'mdi-pause'
                    "
                  />
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-bold">{{ demande.poste }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ demande.statut }} • {{ demande.date }}
              </v-list-item-subtitle>
              <template #append>
                <v-chip
                  :color="
                    demande.statut === 'Terminée'
                      ? 'success'
                      : demande.statut === 'En cours'
                        ? 'primary'
                        : 'warning'
                  "
                  variant="tonal"
                  size="small"
                >
                  {{ demande.statut }}
                </v-chip>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- Informations compte -->
      <v-col cols="12" md="4">
        <v-card class="pa-5" variant="outlined">
          <div class="text-h6 font-weight-bold mb-4">Mon compte</div>
          <div class="d-flex align-center ga-3 mb-4">
            <v-avatar color="primary" variant="tonal" size="48">
              <v-icon icon="mdi-domain" />
            </v-avatar>
            <div>
              <div class="font-weight-bold">Entreprise</div>
              <div class="text-body-2 text-medium-emphasis">{{ auth.user?.email }}</div>
            </div>
          </div>
          <v-divider class="my-4" />
          <div class="text-body-2 text-medium-emphasis mb-2">
            <v-icon icon="mdi-shield-check" size="16" class="mr-2" />
            Compte vérifié
          </div>
          <div class="text-body-2 text-medium-emphasis">
            <v-icon icon="mdi-calendar" size="16" class="mr-2" />
            Membre depuis janvier 2024
          </div>
          <v-btn variant="outlined" block class="mt-4 text-none">Gérer mon compte</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </AppLayout>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
  transition: all 0.2s ease;
}
.cursor-pointer:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
