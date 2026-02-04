<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLogin } from '@/composables/useLogin'
import type { UserRole } from '@/stores/auth'

const route = useRoute()
const { role, email, password, isLoading, error, isValid, submit, loginWithGoogle, clearError } =
  useLogin()

const showPassword = ref(false)
const rememberMe = ref(false)
const registeredSuccess = computed(() => route.query.registered === 'true')

const roleOptions: { label: string; value: UserRole; icon: string }[] = [
  { label: 'Client', value: 'client', icon: 'mdi-account-tie' },
  { label: 'Collaborateur', value: 'collaborateur', icon: 'mdi-account' },
]
</script>

<template>
  <div class="login-form-container">
    <div class="login-header" v-scroll-animation="{ animation: 'fadeInDown', delay: 0 }">
      <v-icon icon="mdi-lock-outline" color="primary" class="login-header-icon mb-3 mb-sm-4" />
      <h1 class="login-title text-h5 text-sm-h4 text-md-h3 font-weight-bold mb-2">Connexion</h1>
      <p class="login-subtitle text-body-2 text-sm-body-1 text-medium-emphasis">
        Accédez à votre espace sécurisé
      </p>
    </div>

    <v-card
      class="login-card"
      elevation="8"
      v-scroll-animation="{ animation: 'fadeInUp', delay: 0.1 }"
    >
      <v-card-text class="login-card-text pa-4 pa-sm-6 pa-md-8">
        <!-- Sélection du rôle -->
        <div class="mb-4 mb-sm-6">
          <div
            class="login-role-title text-subtitle-2 font-weight-bold mb-2 mb-sm-3 text-medium-emphasis"
          >
            Je suis un :
          </div>
          <v-btn-toggle
            v-model="role"
            mandatory
            variant="outlined"
            color="primary"
            class="login-role-toggle w-100"
            divided
          >
            <v-btn
              v-for="option in roleOptions"
              :key="option.value"
              :value="option.value"
              class="flex-grow-1 login-role-btn"
              size="large"
            >
              <v-icon :icon="option.icon" class="mr-1 mr-sm-2" />
              <span class="login-role-label">{{ option.label }}</span>
            </v-btn>
          </v-btn-toggle>
        </div>

        <v-divider class="my-4 my-sm-6" />

        <!-- Message de confirmation après inscription (sans emoji) -->
        <v-alert
          v-if="registeredSuccess"
          type="success"
          variant="tonal"
          density="compact"
          class="mb-4"
          closable
        >
          Votre compte a été créé. Vous pouvez vous connecter avec votre adresse e-mail et votre mot
          de passe.
        </v-alert>

        <!-- Formulaire de connexion -->
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="email"
            label="Nom d'utilisateur ou e-mail"
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

          <div class="login-remember-row mb-4 mb-sm-6">
            <v-checkbox
              v-model="rememberMe"
              label="Se souvenir de moi"
              density="compact"
              hide-details
              color="primary"
              class="login-checkbox"
            />
            <a href="#" class="login-forgot-link text-primary text-decoration-none text-body-2">
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

          <v-divider class="my-4 my-sm-6">
            <span class="text-body-2 text-medium-emphasis px-3 px-sm-4">ou</span>
          </v-divider>

          <v-btn
            variant="outlined"
            size="large"
            block
            class="google-button"
            @click="loginWithGoogle"
          >
            <v-icon icon="mdi-google" class="mr-2" />
            Se connecter avec Google
          </v-btn>
        </v-form>

        <v-alert
          type="info"
          variant="tonal"
          density="compact"
          class="mt-4 mt-sm-6 login-demo-alert"
        >
          <div class="text-caption">
            <strong>Mode démo :</strong> L'email et le mot de passe suffisent (à remplacer par votre
            API).
          </div>
        </v-alert>
      </v-card-text>
    </v-card>

    <div
      class="login-footer mt-4 mt-sm-6"
      v-scroll-animation="{ animation: 'fadeInUp', delay: 0.2 }"
    >
      <p class="text-body-2 text-medium-emphasis login-footer-text">
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
  padding: 1rem 0.75rem;
  width: 100%;
}

.login-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.login-header-icon {
  font-size: 40px !important;
}

.login-title {
  line-height: 1.25;
}

.login-card {
  border-radius: 20px;
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
  min-height: 48px;
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
  min-height: 48px;
}

.google-button:hover {
  border-color: rgba(107, 90, 224, 0.4);
  background: rgba(107, 90, 224, 0.05);
  transform: translateY(-2px);
}

/* Ligne "Se souvenir" + "Mot de passe oublié" : empilée sur mobile */
.login-remember-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.login-checkbox {
  flex-shrink: 0;
}

.login-forgot-link {
  flex-shrink: 0;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  padding: 8px 0;
}

.login-footer {
  text-align: center;
}

.login-footer-text {
  line-height: 1.5;
}

/* Mobile (≤ 600px) – tailles de texte réduites */
@media (max-width: 600px) {
  .login-form-container {
    padding: 0.75rem 12px;
  }

  .login-header {
    margin-bottom: 1.25rem;
  }

  .login-header-icon {
    font-size: 32px !important;
  }

  .login-title {
    font-size: 1.35rem !important;
    line-height: 1.3;
  }

  .login-subtitle {
    font-size: 0.8125rem !important;
  }

  .login-role-title {
    font-size: 0.8125rem !important;
  }

  .login-card {
    border-radius: 16px;
  }

  .login-card-text :deep(.v-field .v-label),
  .login-card-text :deep(.v-field input) {
    font-size: 0.875rem !important;
  }

  .login-card-text :deep(.v-checkbox .v-label) {
    font-size: 0.8125rem !important;
  }

  .login-forgot-link {
    font-size: 0.8125rem !important;
    padding-left: 12px;
    min-height: 40px;
  }

  .login-card-text :deep(.v-divider .v-divider__content) {
    font-size: 0.8125rem !important;
  }

  .login-button,
  .login-card-text :deep(.google-button .v-btn__content) {
    font-size: 0.9375rem !important;
  }

  .login-card-text :deep(.google-button) {
    font-size: 0.9375rem !important;
  }

  .login-footer-text {
    font-size: 0.8125rem !important;
  }

  .login-card-text :deep(.v-alert .v-alert__content) {
    font-size: 0.75rem !important;
  }

  .login-remember-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .login-role-toggle :deep(.v-btn) {
    min-height: 44px;
    padding-left: 8px;
    padding-right: 8px;
  }

  .login-role-label {
    font-size: 0.8125rem !important;
  }
}

/* Très petit mobile (≤ 360px) */
@media (max-width: 360px) {
  .login-form-container {
    padding: 0.5rem 8px;
  }

  .login-title {
    font-size: 1.2rem !important;
  }

  .login-subtitle,
  .login-role-title {
    font-size: 0.75rem !important;
  }

  .login-role-label {
    font-size: 0.75rem !important;
  }

  .login-card-text :deep(.v-field .v-label),
  .login-card-text :deep(.v-field input) {
    font-size: 0.8125rem !important;
  }

  .login-button,
  .login-card-text :deep(.google-button) {
    font-size: 0.875rem !important;
  }
}
</style>
