<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <v-container class="py-16 hero-contact-section">
    <div class="text-center mb-10" v-scroll-animation="{ animation: 'fadeInUp', delay: 0 }">
      <v-icon icon="mdi-email-outline" color="primary" size="64" class="mb-4" />
      <h1 class="text-h3 text-md-h2 text-lg-h1 font-weight-bold mb-4 hero-title">
        {{ title }}
      </h1>
      <p class="text-h6 text-medium-emphasis mx-auto" style="max-width: 700px; line-height: 1.8">
        {{ subtitle }}
      </p>
    </div>
  </v-container>
</template>

<style scoped>
.hero-contact-section {
  background: linear-gradient(
    180deg,
    rgba(247, 244, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(247, 244, 255, 0.5) 100%
  );
  border-radius: 0 0 40px 40px;
  margin-bottom: 24px;
}

.hero-title {
  background: linear-gradient(135deg, #6b5ae0 0%, #ff7a3c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
