<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <v-container class="py-16 hero-rgpd-section">
    <div class="text-center mb-10" v-scroll-animation="{ animation: 'fadeInUp', delay: 0 }">
      <v-icon icon="mdi-shield-lock-outline" color="primary" size="64" class="mb-4" />
      <h1 class="text-h3 text-md-h2 text-lg-h1 font-weight-bold mb-6 hero-title">
        {{ title }}
      </h1>
    </div>
  </v-container>
</template>

<style scoped>
.hero-rgpd-section {
  background: linear-gradient(
    180deg,
    rgba(240, 238, 248, 0.5) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(240, 238, 248, 0.5) 100%
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
