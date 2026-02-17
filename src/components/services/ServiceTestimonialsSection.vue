<script setup lang="ts">
import type { ServiceTestimonial } from '@/content/services'

defineProps<{
  testimonials: ServiceTestimonial[]
  title?: string
}>()
</script>

<template>
  <section v-if="testimonials.length > 0" class="service-testimonials-section">
    <v-container class="py-16">
      <div class="text-center mb-12">
        <h2 class="text-h4 text-md-h3 font-weight-bold mb-4">
          {{ title || 'Ils nous font confiance' }}
        </h2>
        <p class="text-body-1 text-medium-emphasis max-width-700 mx-auto">
          Découvrez les retours authentiques de nos clients sur ce service.
        </p>
      </div>

      <v-row>
        <v-col
          v-for="(testimonial, index) in testimonials"
          :key="index"
          cols="12"
          md="6"
          v-scroll-animation="{
            animation: 'fadeInUp',
            delay: index * 0.1,
            threshold: 0.1,
          }"
        >
          <v-card class="testimonial-card pa-6 h-100" elevation="2">
            <div class="d-flex align-start ga-3 mb-4">
              <v-icon icon="mdi-format-quote-open" size="40" color="primary" />
              <div class="text-body-1 testimonial-quote flex-grow-1" style="line-height: 1.8">
                «&nbsp;{{ testimonial.quote }}&nbsp;»
              </div>
            </div>

            <div class="d-flex align-center ga-2 mb-3">
              <div class="d-flex ga-1">
                <v-icon
                  v-for="i in testimonial.rating"
                  :key="i"
                  icon="mdi-star"
                  size="16"
                  color="warning"
                />
              </div>
            </div>

            <v-divider class="my-4" />

            <div class="d-flex align-center ga-3">
              <v-avatar color="primary" variant="tonal" size="48">
                <v-icon icon="mdi-account" />
              </v-avatar>
              <div class="flex-grow-1">
                <div class="text-body-2 font-weight-bold">{{ testimonial.author }}</div>
                <div class="text-caption text-medium-emphasis">
                  {{ testimonial.role }} - {{ testimonial.company }}
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.service-testimonials-section {
  background: rgba(255, 255, 255, 1);
}

.testimonial-card {
  border-radius: 20px;
  transition: all 0.3s ease;
  background: white;
  border-left: 4px solid rgb(var(--v-theme-primary));
}

.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}

.testimonial-quote {
  color: rgba(var(--v-theme-on-surface), 0.9);
}

.max-width-700 {
  max-width: 700px;
}
</style>
