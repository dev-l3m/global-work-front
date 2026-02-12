<script setup lang="ts">
defineProps<{
  title: string
  paragraphs: string[]
}>()
</script>

<template>
  <v-container class="py-16 hero-methode-section">
    <div class="text-center mb-10" v-scroll-animation="{ animation: 'fadeInUp', delay: 0 }">
      <h1 class="text-h3 text-md-h2 text-lg-h1 font-weight-bold mb-6 hero-title">
        {{ title }}
      </h1>
    </div>
    <div
      v-for="(paragraph, index) in paragraphs"
      :key="index"
      class="text-body-1 text-medium-emphasis mx-auto hero-paragraph"
      :class="{ 'mt-4': index === 0, 'mt-3': index > 0 }"
      style="max-width: 900px; line-height: 1.8"
      v-scroll-animation="{
        animation: 'fadeInUp',
        delay: (index + 1) * 0.2,
        threshold: 0.1,
      }"
      v-html="paragraph"
    />
  </v-container>
</template>

<style scoped>
.hero-methode-section {
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

.hero-paragraph {
  text-align: justify;
  text-align-last: center;
}
</style>
