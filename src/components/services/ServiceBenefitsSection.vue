<script setup lang="ts">
import type { ServiceBenefit } from '@/content/services'

defineProps<{
  benefits: ServiceBenefit[]
  title?: string
}>()
</script>

<template>
  <section class="service-benefits-section">
    <v-container class="py-16">
      <div class="text-center mb-12">
        <h2 class="text-h4 text-md-h3 font-weight-bold mb-4">
          {{ title || 'Pourquoi choisir ce service ?' }}
        </h2>
      </div>

      <v-row>
        <v-col
          v-for="(benefit, index) in benefits"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          v-scroll-animation="{
            animation: 'fadeInUp',
            delay: index * 0.1,
            threshold: 0.1,
          }"
        >
          <v-card class="benefit-card h-100 pa-6" elevation="2">
            <div class="d-flex align-start ga-4">
              <v-avatar color="primary" variant="tonal" size="56">
                <v-icon :icon="benefit.icon" size="28" />
              </v-avatar>
              <div class="flex-grow-1">
                <h3 class="text-h6 font-weight-bold mb-2">{{ benefit.title }}</h3>
                <p class="text-body-2 text-medium-emphasis mb-0" style="line-height: 1.7">
                  {{ benefit.description }}
                </p>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.service-benefits-section {
  background: rgba(255, 255, 255, 1);
}

.benefit-card {
  border-radius: 20px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
  background: white;
}

.benefit-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
  border-left-width: 6px;
}
</style>
