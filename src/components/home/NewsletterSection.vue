<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const isSubmitting = ref(false)

function handleSubscribe() {
  if (!email.value) return
  isSubmitting.value = true
  // TODO: Implement newsletter subscription
  setTimeout(() => {
    isSubmitting.value = false
    email.value = ''
  }, 1000)
}
</script>

<template>
  <div>
    <div class="text-overline text-primary font-weight-bold mb-2">Ressources</div>
    <div class="text-h4 text-md-h3 font-weight-bold mb-6">Newsletter Global Work Hub</div>
    <v-card class="pa-6 newsletter-card" elevation="2">
      <div class="text-body-2 text-medium-emphasis mb-4">
        Recevez nos nouveautés, articles de blog et réponses à vos questions les plus fréquentes.
      </div>
      <v-text-field
        v-model="email"
        class="mt-4"
        label="Votre adresse email"
        placeholder="prenom.nom@exemple.com"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        type="email"
        :disabled="isSubmitting"
      />
      <v-btn
        color="primary"
        class="mt-4 text-none font-weight-bold"
        prepend-icon="mdi-bell-ring-outline"
        block
        size="large"
        :loading="isSubmitting"
        @click="handleSubscribe"
      >
        Je m'abonne
      </v-btn>
      <div class="text-caption text-medium-emphasis mt-3 text-center">
        En vous abonnant, vous acceptez notre politique de confidentialité.
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.newsletter-card {
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 244, 255, 0.9) 100%);
  border: 1px solid rgba(107, 90, 224, 0.1);
  transition: all 0.3s ease;
}

.newsletter-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}
</style>
