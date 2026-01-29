<script setup lang="ts">
import { onMounted, ref } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <v-container class="py-16">
    <div class="text-center" :class="{ 'fade-in-up': isVisible }">
      <div class="text-overline text-primary font-weight-bold mb-3">Témoignages</div>
      <h1 class="text-h3 text-md-h2 text-lg-h1 font-weight-bold mb-4">Ce qu'on dit sur nous</h1>
      <div class="text-h6 text-md-h5 text-medium-emphasis mx-auto" style="max-width: 700px">
        Découvrez les retours de nos clients et partenaires sur leur expérience avec Global Work
        Hub. Leur satisfaction est notre priorité.
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
