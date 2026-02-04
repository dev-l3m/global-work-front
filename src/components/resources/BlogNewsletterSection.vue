<script setup lang="ts">
import { ref, computed } from 'vue'

const email = ref('')
const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref<'success' | 'error' | 'warning'>('success')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const isEmailValid = computed(() => emailRegex.test(email.value.trim()))
const snackbarTimeout = computed(() => (snackbarColor.value === 'success' ? 5000 : 4000))

function showSnackbar(message: string, type: 'success' | 'error' | 'warning' = 'success') {
  snackbarMessage.value = message
  snackbarColor.value = type
  snackbar.value = true
}

function handleSubscribe() {
  const trimmed = email.value.trim()
  if (!trimmed) {
    showSnackbar('Veuillez renseigner votre adresse e-mail.', 'warning')
    return
  }
  if (!isEmailValid.value) {
    showSnackbar('Adresse e-mail invalide.', 'error')
    return
  }
  showSnackbar('Merci pour votre inscription à la newsletter.', 'success')
  email.value = ''
}
</script>

<template>
  <v-container class="py-16">
    <v-card class="pa-8 newsletter-card" elevation="4">
      <div class="text-center">
        <v-icon icon="mdi-email-newsletter" color="primary" size="56" class="mb-4" />
        <div class="text-h5 font-weight-bold mb-4">
          "Restez informé des tendances du recrutement international"
        </div>
        <v-text-field
          v-model="email"
          placeholder="Votre email ici.."
          variant="outlined"
          prepend-inner-icon="mdi-email"
          class="mb-4"
          style="max-width: 400px; margin: 0 auto"
          hide-details
        />
        <v-btn
          color="primary"
          size="large"
          class="text-none font-weight-bold"
          prepend-icon="mdi-send"
          @click="handleSubscribe"
        >
          S'abonner à la newsletter
        </v-btn>
      </div>
    </v-card>
  </v-container>

  <v-snackbar
    v-model="snackbar"
    :color="snackbarColor"
    location="top right"
    :timeout="snackbarTimeout"
  >
    {{ snackbarMessage }}
  </v-snackbar>
</template>

<style scoped>
.newsletter-card {
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(107, 90, 224, 0.08) 0%, rgba(255, 122, 60, 0.08) 100%);
  border: 2px solid rgba(107, 90, 224, 0.2);
  transition: all 0.3s ease;
}

.newsletter-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(107, 90, 224, 0.2);
}
</style>
