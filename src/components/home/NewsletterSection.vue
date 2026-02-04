<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const isSubmitting = ref(false)

// Snackbar (top right)
const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref<'success' | 'warning' | 'error'>('success')

// Simule les emails déjà inscrits (en prod = réponse API)
const subscribedEmails = ref<Set<string>>(new Set())

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isEmailValid(value: string): boolean {
  return emailRegex.test(value.trim())
}

function handleSubscribe() {
  const value = email.value.trim()

  if (!value) {
    snackbarMessage.value = "L'adresse email est obligatoire."
    snackbarColor.value = 'error'
    snackbar.value = true
    return
  }

  if (!isEmailValid(value)) {
    snackbarMessage.value = 'Veuillez saisir une adresse email valide.'
    snackbarColor.value = 'error'
    snackbar.value = true
    return
  }

  const emailLower = value.toLowerCase()
  if (subscribedEmails.value.has(emailLower)) {
    snackbarMessage.value = 'Cet email est déjà inscrit à notre newsletter.'
    snackbarColor.value = 'warning'
    snackbar.value = true
    return
  }

  isSubmitting.value = true
  // TODO: Appel API newsletter
  setTimeout(() => {
    subscribedEmails.value.add(emailLower)
    snackbarMessage.value = 'Inscription réussie. Vous recevrez nos prochaines actualités.'
    snackbarColor.value = 'success'
    snackbar.value = true
    email.value = ''
    isSubmitting.value = false
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
        hide-details
        clearable
        @keydown.enter="handleSubscribe"
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

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      location="top right"
      multi-line
      :timeout="4000"
      transition="scroll-y-transition"
    >
      {{ snackbarMessage }}
    </v-snackbar>
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
