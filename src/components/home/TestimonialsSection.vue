<script setup lang="ts">
import NewsletterSection from './NewsletterSection.vue'

const testimonials = [
  {
    quote:
      'Global Work Hub simplifie le recrutement international et nous permet de déployer rapidement des équipes performantes, sans ajouter de complexité RH.',
    author: 'Client Global Work Hub',
    role: 'Directeur RH',
  },
]
</script>

<template>
  <v-container id="ressources" class="py-16">
    <v-row>
      <v-col cols="12" md="6">
        <div class="text-overline text-primary font-weight-bold mb-2">Ils parlent de nous</div>
        <div class="text-h4 text-md-h3 font-weight-bold mb-6">Ce qu'on dit sur nous</div>
        <v-card
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="pa-6 testimonial-card"
          elevation="2"
        >
          <div class="d-flex align-start ga-3 mb-4">
            <v-icon icon="mdi-format-quote-open" size="40" color="primary" />
            <div class="text-body-1 testimonial-quote">«&nbsp;{{ testimonial.quote }}&nbsp;»</div>
          </div>
          <v-divider class="my-4" />
          <div class="d-flex align-center ga-3">
            <v-avatar color="primary" variant="tonal" size="40">
              <v-icon icon="mdi-account" />
            </v-avatar>
            <div>
              <div class="text-body-2 font-weight-bold">{{ testimonial.author }}</div>
              <div class="text-caption text-medium-emphasis">{{ testimonial.role }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <NewsletterSection />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.testimonial-card {
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 244, 255, 0.9) 100%);
  border: 1px solid rgba(107, 90, 224, 0.1);
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}

.testimonial-quote {
  line-height: 1.8;
  font-style: italic;
  color: rgba(0, 0, 0, 0.87);
}
</style>
