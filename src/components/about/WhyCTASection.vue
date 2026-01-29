<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
}>()
</script>

<template>
  <v-container class="py-16">
    <v-card class="pa-8 cta-card" elevation="4">
      <div class="text-center">
        <div class="text-h4 text-md-h3 font-weight-bold mb-4">
          {{ title || 'Prêt à sécuriser votre croissance avec des équipes stables ?' }}
        </div>
        <div class="text-body-1 text-medium-emphasis mb-6 mx-auto" style="max-width: 700px">
          {{ description || "Ne laissez plus l'incertitude du recrutement freiner vos ambitions." }}
        </div>
        <v-btn
          color="primary"
          size="large"
          class="text-none font-weight-bold"
          prepend-icon="mdi-send"
          :href="buttonHref || '#contact'"
        >
          {{ buttonText || 'Contactez-nous' }}
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.cta-card {
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(107, 90, 224, 0.05) 0%, rgba(255, 122, 60, 0.05) 100%);
  border: 2px solid rgba(107, 90, 224, 0.2);
  transition: all 0.3s ease;
}

.cta-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(107, 90, 224, 0.2);
}
</style>
