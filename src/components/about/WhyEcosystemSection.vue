<script setup lang="ts">
const phases = [
  {
    phase: 'Phase 1',
    title: 'Analyse besoins + Sourcing ciblé',
    icon: 'mdi-magnify',
    color: 'primary',
  },
  {
    phase: 'Phase 2',
    title: 'Présentation profil + Validation mutuelle',
    icon: 'mdi-handshake',
    color: 'secondary',
  },
  {
    phase: 'Phase 3',
    title: 'Contractualisation + Onboarding complet',
    icon: 'mdi-file-document-edit',
    color: 'primary',
  },
  {
    phase: 'Phase 4',
    title: 'Démarrage mission + Suivi quotidien',
    icon: 'mdi-rocket-launch',
    color: 'secondary',
  },
  {
    phase: 'Phase 5',
    title: 'Reporting + Ajustements',
    icon: 'mdi-chart-line',
    color: 'success',
  },
]
</script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-10">
      <div class="text-overline text-primary font-weight-bold mb-2">
        L'Écosystème Global Work Hub
      </div>
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">
        Un process complet, de l'analyse au reporting
      </div>
    </div>

    <v-row>
      <v-col
        v-for="(phase, index) in phases"
        :key="index"
        cols="12"
        sm="6"
        lg="4"
        v-scroll-animation="{
          animation: 'scaleIn',
          delay: index * 0.12,
          threshold: 0.1,
        }"
      >
        <v-card class="pa-6 phase-card" variant="outlined" elevation="2">
          <div class="d-flex align-center ga-3 mb-3">
            <v-avatar :color="phase.color" variant="tonal" size="48">
              <v-icon :icon="phase.icon" size="24" />
            </v-avatar>
            <div class="text-overline font-weight-bold">{{ phase.phase }}</div>
          </div>
          <div class="text-subtitle-1 font-weight-bold">{{ phase.title }}</div>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-center mt-8">
      <v-btn
        color="primary"
        size="large"
        class="text-none font-weight-bold ecosystem-cta-btn"
        prepend-icon="mdi-arrow-right"
        href="#contact"
      >
        Découvrir notre process complet
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>
.phase-card {
  border-radius: 20px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
  height: 100%;
}

.phase-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}

@media (max-width: 599px) {
  .ecosystem-cta-btn {
    font-size: 0.875rem !important;
  }
}
</style>
