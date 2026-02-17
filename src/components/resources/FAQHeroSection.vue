<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <v-container class="py-12 py-md-16 hero-faq-section">
    <div
      class="text-center hero-faq-inner"
      v-scroll-animation="{ animation: 'fadeInUp', delay: 0 }"
    >
      <v-icon icon="mdi-help-circle" color="primary" size="56" class="mb-3 mb-sm-4" />
      <h1 class="text-h4 text-sm-h3 text-md-h2 font-weight-bold mb-3 mb-sm-4 hero-title">
        {{ title }}
      </h1>
      <p class="text-body-1 text-medium-emphasis mx-auto hero-subtitle">
        Retrouvez les réponses aux questions les plus fréquentes sur nos services et notre
        accompagnement.
      </p>
    </div>
  </v-container>
</template>

<style scoped>
.hero-faq-section {
  background: linear-gradient(
    180deg,
    rgba(240, 238, 248, 0.5) 0%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(240, 238, 248, 0.5) 100%
  );
  border-radius: 0 0 32px 32px;
  margin-bottom: 24px;
}

.hero-faq-inner {
  max-width: 640px;
  margin-inline: auto;
}

.hero-title {
  background: linear-gradient(135deg, #6b5ae0 0%, #ff7a3c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  max-width: 520px;
  line-height: 1.6;
}

@media (max-width: 600px) {
  .hero-faq-section {
    border-radius: 0 0 24px 24px;
  }

  .hero-subtitle {
    font-size: 0.9375rem;
  }
}
</style>
