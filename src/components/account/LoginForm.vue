<script setup lang="ts">
import { ref } from 'vue'
import { useLogin } from '@/composables/useLogin'
import type { UserRole } from '@/stores/auth'

const { role, email, password, isLoading, error, isValid, submit, loginWithGoogle, clearError } =
  useLogin()

const showPassword = ref(false)
const rememberMe = ref(false)

const roleOptions: { label: string; value: UserRole; icon: string }[] = [
  { label: 'Client', value: 'client', icon: 'mdi-account-tie' },
  { label: 'Collaborateur', value: 'collaborateur', icon: 'mdi-account' },
]
</script>

<template>
  <div class="login-form-container">
    <div class="login-header" v-scroll-animation="{ animation: 'fadeInDown', delay: 0 }">
      <v-icon icon="mdi-lock-outline" color="primary" size="48" class="mb-4" />
      <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">Connexion</h1>
      <p class="text-body-1 text-medium-emphasis">Accédez à votre espace sécurisé</p>
    </div>

    <v-card
      class="login-card"
      elevation="8"
      v-scroll-animation="{ animation: 'fadeInUp', delay: 0.1 }"
    >
      <v-card-text class="pa-8">
        <!-- Sélection du rôle -->
        <div class="mb-6">
          <div class="text-subtitle-2 font-weight-bold mb-3 text-medium-emphasis">Je suis un :</div>
          <v-btn-toggle
            v-model="role"
            mandatory
            variant="outlined"
            color="primary"
            class="w-100"
            divided
          >
            <v-btn
              v-for="option in roleOptions"
              :key="option.value"
              :value="option.value"
              class="flex-grow-1"
              size="large"
            >
              <v-icon :icon="option.icon" class="mr-2" />
              {{ option.label }}
            </v-btn>
          </v-btn-toggle>
        </div>

        <v-divider class="my-6" />

        <!-- Formulaire de connexion -->
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="email"
            label="Identifiant ou e-mail"
            type="email"
            placeholder="prenom.nom@exemple.com"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            autocomplete="email"
            class="mb-4"
            :error-messages="error && !password ? error : ''"
            required
          />

          <v-text-field
            v-model="password"
            label="Mot de passe"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            variant="outlined"
            autocomplete="current-password"
            class="mb-2"
            :error-messages="error && password ? error : ''"
            @click:append-inner="showPassword = !showPassword"
            required
          />

          <div class="d-flex justify-space-between align-center mb-6">
            <v-checkbox
              v-model="rememberMe"
              label="Se souvenir de moi"
              density="compact"
              hide-details
              color="primary"
            />
            <a href="#" class="text-primary text-decoration-none text-body-2">
              Mot de passe oublié ?
            </a>
          </div>

          <v-alert
            v-if="error"
            type="error"
            variant="tonal"
            density="compact"
            class="mb-4"
            closable
            @click:close="clearError"
          >
            {{ error }}
          </v-alert>

          <v-btn
            color="primary"
            size="x-large"
            block
            class="mb-4 login-button"
            :disabled="!isValid || isLoading"
            :loading="isLoading"
            type="submit"
          >
            <v-icon icon="mdi-login" class="mr-2" />
            Se connecter
          </v-btn>

          <v-divider class="my-6">
            <span class="text-body-2 text-medium-emphasis px-4">ou</span>
          </v-divider>

          <v-btn
            variant="outlined"
            size="large"
            block
            class="google-button"
            @click="loginWithGoogle"
          >
            <v-icon icon="mdi-google" class="mr-2" />
            Continue with Google
          </v-btn>
        </v-form>

        <v-alert type="info" variant="tonal" density="compact" class="mt-6">
          <div class="text-caption">
            <strong>Mode démo :</strong> L'email et le mot de passe suffisent (à remplacer par votre
            API).
          </div>
        </v-alert>
      </v-card-text>
    </v-card>

    <div class="login-footer mt-6" v-scroll-animation="{ animation: 'fadeInUp', delay: 0.2 }">
      <p class="text-body-2 text-medium-emphasis">
        Pas encore de compte ?
        <router-link to="/inscription" class="text-primary text-decoration-none font-weight-bold">
          S'inscrire
        </router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-form-container {
  max-width: 480px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-card {
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(247, 244, 255, 0.95) 100%);
  border: 1px solid rgba(107, 90, 224, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.login-card:hover {
  box-shadow: 0 20px 60px rgba(107, 90, 224, 0.15);
  transform: translateY(-2px);
}

.login-button {
  background: linear-gradient(135deg, #6b5ae0 0%, #ff7a3c 100%);
  color: white;
  font-weight: bold;
  text-transform: none;
  letter-spacing: 0.5px;
  padding: 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(107, 90, 224, 0.3);
}

.login-button:disabled {
  opacity: 0.6;
}

.google-button {
  border: 2px solid rgba(107, 90, 224, 0.2);
  border-radius: 12px;
  text-transform: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.google-button:hover {
  border-color: rgba(107, 90, 224, 0.4);
  background: rgba(107, 90, 224, 0.05);
  transform: translateY(-2px);
}

.login-footer {
  text-align: center;
}
</style>
