<script setup lang="ts">
import { ref } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

// Données de démonstration (à remplacer par votre API)
const missions = ref([
  { id: 1, client: 'Client A', poste: 'Développeur Full Stack', statut: 'En cours', heures: 35 },
  { id: 2, client: 'Client B', poste: 'Support Client', statut: 'En attente', heures: 0 },
])

const formations = ref([
  { id: 1, titre: 'Formation React Avancé', statut: 'Terminée', date: '2024-01-10' },
  { id: 2, titre: 'Certification Agile', statut: 'En cours', date: '2024-01-20' },
])
</script>

<template>
  <AppLayout>
    <v-row>
      <v-col cols="12">
        <div class="d-flex align-center justify-space-between flex-wrap ga-4">
          <div>
            <div class="text-h4 font-weight-bold">Mon espace</div>
            <div class="text-body-2 text-medium-emphasis mt-1">
              Bienvenue, {{ auth.user?.email }}. Gérez vos missions et votre parcours professionnel.
            </div>
          </div>
          <v-btn
            color="primary"
            size="large"
            prepend-icon="mdi-calendar-check"
            class="text-none font-weight-bold"
          >
            Voir mon planning
          </v-btn>
        </div>
      </v-col>

      <!-- Statistiques -->
      <v-col cols="12" md="3">
        <v-card class="pa-5" variant="tonal" color="primary">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-overline font-weight-bold">Missions actives</div>
              <div class="text-h4 font-weight-bold mt-2">
                {{ missions.filter(m => m.statut === 'En cours').length }}
              </div>
            </div>
            <v-avatar color="primary" size="56" variant="flat">
              <v-icon icon="mdi-briefcase" size="32" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-5" variant="outlined">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-overline font-weight-bold">Heures cette semaine</div>
              <div class="text-h4 font-weight-bold mt-2">
                {{ missions.reduce((acc, m) => acc + m.heures, 0) }}h
              </div>
            </div>
            <v-avatar color="secondary" size="56" variant="tonal">
              <v-icon icon="mdi-clock-outline" size="32" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-5" variant="outlined">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-overline font-weight-bold">Formations</div>
              <div class="text-h4 font-weight-bold mt-2">{{ formations.length }}</div>
            </div>
            <v-avatar color="success" size="56" variant="tonal">
              <v-icon icon="mdi-school" size="32" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-5" variant="outlined">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-overline font-weight-bold">Évaluation</div>
              <div class="text-h4 font-weight-bold mt-2">4.8/5</div>
            </div>
            <v-avatar color="warning" size="56" variant="tonal">
              <v-icon icon="mdi-star" size="32" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <!-- Mes missions -->
      <v-col cols="12" md="8">
        <v-card class="pa-5" variant="outlined">
          <div class="d-flex align-center justify-space-between mb-4">
            <div class="text-h6 font-weight-bold">Mes missions</div>
            <v-btn variant="text" append-icon="mdi-arrow-right">Voir tout</v-btn>
          </div>
          <v-list>
            <v-list-item v-for="mission in missions" :key="mission.id" class="px-0">
              <template #prepend>
                <v-avatar
                  :color="mission.statut === 'En cours' ? 'primary' : 'warning'"
                  variant="tonal"
                  size="40"
                >
                  <v-icon
                    :icon="mission.statut === 'En cours' ? 'mdi-play-circle' : 'mdi-pause-circle'"
                  />
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-bold">{{ mission.poste }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ mission.client }} • {{ mission.heures }}h/semaine
              </v-list-item-subtitle>
              <template #append>
                <v-chip
                  :color="mission.statut === 'En cours' ? 'primary' : 'warning'"
                  variant="tonal"
                  size="small"
                >
                  {{ mission.statut }}
                </v-chip>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- Formations -->
      <v-col cols="12" md="4">
        <v-card class="pa-5" variant="outlined">
          <div class="text-h6 font-weight-bold mb-4">Mes formations</div>
          <v-list>
            <v-list-item v-for="formation in formations" :key="formation.id" class="px-0">
              <template #prepend>
                <v-avatar
                  :color="formation.statut === 'Terminée' ? 'success' : 'info'"
                  variant="tonal"
                  size="32"
                >
                  <v-icon
                    :icon="formation.statut === 'Terminée' ? 'mdi-check' : 'mdi-book-open'"
                    size="20"
                  />
                </v-avatar>
              </template>
              <v-list-item-title class="text-body-2 font-weight-bold">{{
                formation.titre
              }}</v-list-item-title>
              <v-list-item-subtitle class="text-caption">{{ formation.date }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
          <v-btn variant="outlined" block class="mt-4 text-none">Voir toutes les formations</v-btn>
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
                  <v-icon icon="mdi-account-edit" />
                </v-avatar>
                <div>
                  <div class="font-weight-bold">Mon profil</div>
                  <div class="text-caption text-medium-emphasis">Mettre à jour</div>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="pa-4 cursor-pointer" variant="outlined" hover>
              <div class="d-flex align-center ga-3">
                <v-avatar color="secondary" variant="tonal">
                  <v-icon icon="mdi-file-document" />
                </v-avatar>
                <div>
                  <div class="font-weight-bold">Mes documents</div>
                  <div class="text-caption text-medium-emphasis">Contrats & attestations</div>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="pa-4 cursor-pointer" variant="outlined" hover>
              <div class="d-flex align-center ga-3">
                <v-avatar color="info" variant="tonal">
                  <v-icon icon="mdi-school" />
                </v-avatar>
                <div>
                  <div class="font-weight-bold">Formations</div>
                  <div class="text-caption text-medium-emphasis">Parcours & certifications</div>
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
