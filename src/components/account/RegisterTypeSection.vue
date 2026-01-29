<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedType = ref<string | null>(null)

const accountTypes = [
  {
    id: 'entreprise',
    title: 'Une entreprise',
    description:
      "Vous créez un compte pour gérer des employés ou des prestataires au nom d'une entreprise.",
    icon: 'mdi-office-building',
    color: 'primary',
  },
  {
    id: 'agence',
    title: 'Une agence de recrutement / société RH',
    description:
      "Vous vous inscrivez pour gérer les employés et prestataires de vos clients via la plateforme, suivre leurs demandes et gérer les contrats à l'international.",
    icon: 'mdi-briefcase-account',
    color: 'secondary',
  },
]

const canProceed = computed(() => selectedType.value !== null)

function nextStep() {
  if (selectedType.value) {
    // Rediriger vers la page d'inscription avec le type sélectionné
    router.push(`/inscription?type=${selectedType.value}`)
  }
}
</script>

<template>
  <v-container class="py-16">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="register-type-card" elevation="8">
          <v-card-text class="pa-8">
            <div class="text-h5 font-weight-bold text-center mb-8">
              Vous inscrivez-vous en tant que ?
            </div>

            <v-row class="mb-6">
              <v-col
                v-for="type in accountTypes"
                :key="type.id"
                cols="12"
                md="6"
                v-scroll-animation="{
                  animation: 'scaleIn',
                  delay: type.id === 'entreprise' ? 0.1 : 0.2,
                  threshold: 0.1,
                }"
              >
                <v-card
                  :class="['type-card', { 'type-card-selected': selectedType === type.id }]"
                  :color="selectedType === type.id ? type.color : undefined"
                  :variant="selectedType === type.id ? 'flat' : 'outlined'"
                  elevation="2"
                  @click="selectedType = type.id"
                >
                  <v-card-text class="pa-6 text-center">
                    <v-avatar :color="type.color" variant="flat" size="72" class="mb-4">
                      <v-icon :icon="type.icon" size="36" color="white" />
                    </v-avatar>
                    <div class="text-h6 font-weight-bold mb-3">{{ type.title }}</div>
                    <div class="text-body-2 text-medium-emphasis" style="line-height: 1.6">
                      {{ type.description }}
                    </div>
                    <v-icon
                      v-if="selectedType === type.id"
                      icon="mdi-check-circle"
                      color="white"
                      size="32"
                      class="mt-3"
                    />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <div class="d-flex justify-space-between align-center flex-wrap ga-4">
              <v-btn variant="text" color="primary" class="text-none" to="/connexion">
                <v-icon icon="mdi-arrow-left" class="mr-2" />
                Ou vous avez déjà un compte ? Se connecter
              </v-btn>

              <v-btn
                color="primary"
                size="large"
                class="text-none font-weight-bold"
                :disabled="!canProceed"
                @click="nextStep"
                style="padding: 16px 32px; font-size: 16px"
              >
                SUIVANT
                <v-icon icon="mdi-arrow-right" class="ml-2" />
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.register-type-card {
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(247, 244, 255, 0.95) 100%);
  border: 1px solid rgba(107, 90, 224, 0.1);
  backdrop-filter: blur(10px);
}

.type-card {
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(107, 90, 224, 0.2);
  min-height: 280px;
  display: flex;
  align-items: center;
}

.type-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.2);
  border-color: rgba(107, 90, 224, 0.4);
}

.type-card-selected {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 16px 48px rgba(107, 90, 224, 0.3);
  border-color: transparent;
}

.type-card-selected .text-body-2 {
  color: rgba(255, 255, 255, 0.9) !important;
}

.type-card-selected .text-h6 {
  color: white !important;
}
</style>
