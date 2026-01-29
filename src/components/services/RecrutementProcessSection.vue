<script setup lang="ts">
const steps = [
  {
    title: 'Analyse des besoins',
    icon: 'mdi-clipboard-text-search',
    color: 'primary',
  },
  {
    title: 'Sourcing et présélection',
    icon: 'mdi-account-search',
    color: 'secondary',
  },
  {
    title: 'Présentation et validation des talents',
    icon: 'mdi-handshake',
    color: 'success',
  },
  {
    title: 'Onboarding et suivi opérationnel',
    icon: 'mdi-rocket-launch',
    color: 'info',
  },
]
</script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-10">
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">Processus</div>
    </div>

    <v-row>
      <v-col
        v-for="(step, index) in steps"
        :key="index"
        cols="12"
        sm="6"
        md="3"
        v-scroll-animation="{
          animation: 'scaleIn',
          delay: index * 0.15,
          threshold: 0.1,
        }"
      >
        <v-card class="pa-6 process-card" variant="outlined" elevation="2">
          <div class="text-center">
            <v-avatar :color="step.color" variant="tonal" size="64" class="mb-4">
              <v-icon :icon="step.icon" size="32" />
            </v-avatar>
            <div class="text-subtitle-1 font-weight-bold">{{ step.title }}</div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.process-card {
  border-radius: 20px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
  height: 100%;
}

.process-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}
</style>
