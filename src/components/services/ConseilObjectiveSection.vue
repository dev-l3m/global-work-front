<script setup lang="ts"></script>

<template>
  <v-container class="py-16">
    <v-card class="pa-10 objective-card" elevation="4">
      <div class="text-center">
        <v-icon icon="mdi-target" color="primary" size="64" class="mb-6" />
        <div class="text-h4 text-md-h3 font-weight-bold mb-6">Objectif</div>
        <div
          class="text-body-1 text-medium-emphasis mx-auto"
          style="max-width: 800px; line-height: 1.8"
        >
          Vous permettre de prendre les meilleures décisions pour vos opérations internationales
          avec un partenaire fiable.
        </div>
        <v-btn
          color="secondary"
          size="x-large"
          class="text-none font-weight-bold mt-8"
          prepend-icon="mdi-calendar-clock"
          href="#contact"
          style="padding: 16px 32px; font-size: 16px"
        >
          Demandez un rendez-vous conseil gratuit
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.objective-card {
  border-radius: 32px;
  background: linear-gradient(135deg, rgba(107, 90, 224, 0.08) 0%, rgba(255, 122, 60, 0.08) 100%);
  border: 2px solid rgba(107, 90, 224, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.objective-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(107, 90, 224, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
  pointer-events: none;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.objective-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(107, 90, 224, 0.2);
}
</style>
