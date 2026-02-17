<script setup lang="ts">
import type { ServiceUseCase } from '@/content/services'

defineProps<{
  useCases: ServiceUseCase[]
  title?: string
}>()
</script>

<template>
  <section class="service-usecases-section">
    <v-container class="py-16">
      <div class="text-center mb-12">
        <h2 class="text-h4 text-md-h3 font-weight-bold mb-4">
          {{ title || "Cas d'usage concrets" }}
        </h2>
        <p class="text-body-1 text-medium-emphasis max-width-700 mx-auto">
          Découvrez comment nos clients utilisent ce service pour accélérer leur croissance.
        </p>
      </div>

      <v-row>
        <v-col
          v-for="(useCase, index) in useCases"
          :key="index"
          cols="12"
          md="4"
          v-scroll-animation="{
            animation: 'fadeInUp',
            delay: index * 0.1,
            threshold: 0.1,
          }"
        >
          <v-card class="usecase-card h-100 pa-6" elevation="2">
            <div class="d-flex align-start ga-3 mb-4">
              <v-icon icon="mdi-check-circle" color="success" size="24" />
              <h3 class="text-h6 font-weight-bold">{{ useCase.title }}</h3>
            </div>
            <div v-if="useCase.industry" class="mb-3">
              <v-chip size="small" color="primary" variant="tonal">
                {{ useCase.industry }}
              </v-chip>
            </div>
            <p class="text-body-2 text-medium-emphasis mb-0" style="line-height: 1.7">
              {{ useCase.description }}
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.service-usecases-section {
  background: rgba(107, 90, 224, 0.03);
}

.usecase-card {
  border-radius: 20px;
  transition: all 0.3s ease;
  background: white;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
}

.usecase-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
  border-color: rgb(var(--v-theme-primary));
}

.max-width-700 {
  max-width: 700px;
}
</style>
