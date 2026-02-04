<script setup lang="ts"></script>

<template>
  <v-container class="py-16">
    <v-card class="pa-10 objective-card" elevation="4">
      <div class="text-center objective-card-content">
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
          class="text-none font-weight-bold mt-8 conseil-cta-btn"
          prepend-icon="mdi-calendar-clock"
          href="/contactez-nous"
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

@media (max-width: 599px) {
  .objective-card {
    padding: 1.5rem !important;
  }

  .objective-card-content {
    overflow: visible;
  }

  .conseil-cta-btn {
    display: block !important;
    width: 100% !important;
    max-width: 100% !important;
    font-size: 0.8125rem !important;
    min-height: 48px !important;
    padding: 10px 16px !important;
    box-sizing: border-box;
  }
  .conseil-cta-btn :deep(.v-btn__content) {
    flex-wrap: wrap;
    white-space: normal;
    text-align: center;
    line-height: 1.3;
    justify-content: center;
  }
  .conseil-cta-btn :deep(.v-btn__prepend) {
    display: none !important;
  }
}
@media (max-width: 360px) {
  .objective-card {
    padding: 1rem !important;
  }
  .conseil-cta-btn {
    font-size: 0.75rem !important;
    padding: 8px 12px !important;
  }
}
</style>
