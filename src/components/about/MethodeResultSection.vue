<script setup lang="ts"></script>

<template>
  <v-container class="py-16">
    <v-card class="pa-8 result-card" elevation="4">
      <div class="text-center">
        <v-icon icon="mdi-check-circle" color="success" size="64" class="mb-4" />
        <div class="text-h4 text-md-h3 font-weight-bold mb-4">
          Le résultat : une équipe étendue dans un délai raisonnable
        </div>
        <div
          class="text-body-1 text-medium-emphasis mx-auto"
          style="max-width: 800px; line-height: 1.8"
        >
          Notre méthode transforme l'externalisation habituellement incertain en un investissement
          stratégique prévisible et mesurable. Vous n'obtenez pas un freelance isolé, mais une
          extension de votre propre équipe, managée, engagée et entièrement dédiée à votre succès.
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.result-card {
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(107, 90, 224, 0.08) 0%, rgba(255, 122, 60, 0.08) 100%);
  border: 2px solid rgba(107, 90, 224, 0.2);
  transition: all 0.3s ease;
}

.result-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(107, 90, 224, 0.2);
}
</style>
