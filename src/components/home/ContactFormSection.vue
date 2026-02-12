<script setup lang="ts">
import { ref, computed } from 'vue'

const currentStep = ref(1)
const totalSteps = 4

const formData = ref({
  subject: '',
  subjectDetail: '',
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  contactPreference: 'email',
  availability: 'indifferent',
  acceptPrivacy: false,
})

const subjectOptions = [
  "Demande d'information générale",
  'Demande de devis personnalisé',
  'Demande de support technique',
  'Demande partenariat',
  'Autre (préciser)',
]

const contactPreferences = [
  { value: 'email', label: 'Par email' },
  { value: 'phone', label: 'Par téléphone' },
  { value: 'both', label: 'Les deux' },
]

const availabilityOptions = [
  { value: 'morning', label: 'En matinée' },
  { value: 'afternoon', label: 'En après-midi' },
  { value: 'evening', label: 'En soirée' },
  { value: 'indifferent', label: 'Indifférent' },
]

const isLoading = ref(false)
const isSubmitted = ref(false)

const canProceedStep1 = computed(() => {
  return formData.value.subject !== '' && formData.value.subjectDetail.trim() !== ''
})

const canProceedStep2 = computed(() => {
  return (
    formData.value.name.trim() !== '' &&
    formData.value.email.trim() !== '' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)
  )
})

const canProceedStep3 = computed(() => {
  return formData.value.message.trim() !== ''
})

const canSubmit = computed(() => {
  return (
    canProceedStep3.value &&
    formData.value.acceptPrivacy &&
    formData.value.contactPreference !== '' &&
    formData.value.availability !== ''
  )
})

function nextStep() {
  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

function previousStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

async function submitForm() {
  isLoading.value = true
  try {
    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 1500))
    isSubmitted.value = true
  } catch (error) {
    console.error("Erreur lors de l'envoi:", error)
  } finally {
    isLoading.value = false
  }
}

function resetForm() {
  currentStep.value = 1
  formData.value = {
    subject: '',
    subjectDetail: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    contactPreference: 'email',
    availability: 'indifferent',
    acceptPrivacy: false,
  }
  isSubmitted.value = false
}
</script>

<template>
  <v-container class="py-16">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="contact-form-card" elevation="8">
          <v-card-text class="pa-8">
            <!-- Indicateur de progression -->
            <div class="mb-8">
              <div class="d-flex justify-space-between align-center mb-4">
                <div
                  v-for="step in totalSteps"
                  :key="step"
                  class="step-indicator"
                  :class="{ active: step <= currentStep, completed: step < currentStep }"
                >
                  <v-avatar :color="step <= currentStep ? 'primary' : 'grey'" size="40">
                    <v-icon v-if="step < currentStep" icon="mdi-check" color="white" />
                    <span v-else class="text-white font-weight-bold">{{ step }}</span>
                  </v-avatar>
                </div>
              </div>
              <v-progress-linear
                :model-value="(currentStep / totalSteps) * 100"
                color="primary"
                height="4"
                rounded
              />
            </div>

            <!-- Message de succès -->
            <v-alert v-if="isSubmitted" type="success" variant="tonal" class="mb-6" prominent>
              <div class="text-h5 font-weight-bold mb-2">Merci pour votre message</div>
              <div class="text-body-1 mb-4">Vous allez être redirigé vers la page d'accueil.</div>
              <v-btn color="primary" @click="resetForm">Envoyer un autre message</v-btn>
            </v-alert>

            <!-- Formulaire multi-étapes -->
            <v-form v-else @submit.prevent="submitForm">
              <!-- Étape 1 : Objet de la demande -->
              <div v-show="currentStep === 1" class="form-step">
                <div class="text-h6 font-weight-bold mb-4">Étape 1 : Objet de votre demande</div>
                <v-select
                  v-model="formData.subject"
                  :items="subjectOptions"
                  label="Objet de votre demande *"
                  variant="outlined"
                  class="mb-4"
                  required
                />
                <v-textarea
                  v-model="formData.subjectDetail"
                  label="Précisez votre demande *"
                  variant="outlined"
                  rows="4"
                  required
                />
              </div>

              <!-- Étape 2 : Informations personnelles -->
              <div v-show="currentStep === 2" class="form-step">
                <div class="text-h6 font-weight-bold mb-4">Étape 2 : Vos coordonnées</div>
                <v-text-field
                  v-model="formData.name"
                  label="Nom et prénom *"
                  variant="outlined"
                  class="mb-4"
                  required
                />
                <v-text-field
                  v-model="formData.email"
                  label="Votre adresse email *"
                  type="email"
                  variant="outlined"
                  class="mb-4"
                  required
                />
                <v-text-field
                  v-model="formData.phone"
                  label="Votre numéro de téléphone (optionnel)"
                  type="tel"
                  variant="outlined"
                  prepend-inner-icon="mdi-phone"
                />
              </div>

              <!-- Étape 3 : Message -->
              <div v-show="currentStep === 3" class="form-step">
                <div class="text-h6 font-weight-bold mb-4">Étape 3 : Votre message</div>
                <v-text-field
                  v-model="formData.company"
                  label="Nom de votre entreprise (optionnel)"
                  variant="outlined"
                  class="mb-4"
                />
                <v-textarea
                  v-model="formData.message"
                  label="Votre message *"
                  variant="outlined"
                  rows="6"
                  required
                />
              </div>

              <!-- Étape 4 : Préférences et confirmation -->
              <div v-show="currentStep === 4" class="form-step">
                <div class="text-h6 font-weight-bold mb-4">Étape 4 : Préférences de contact</div>
                <v-radio-group v-model="formData.contactPreference" class="mb-4">
                  <v-radio
                    v-for="pref in contactPreferences"
                    :key="pref.value"
                    :value="pref.value"
                    :label="pref.label"
                  />
                </v-radio-group>
                <v-select
                  v-model="formData.availability"
                  :items="availabilityOptions"
                  item-title="label"
                  item-value="value"
                  label="Disponibilités pour être contacté"
                  variant="outlined"
                  class="mb-4"
                />
                <v-checkbox v-model="formData.acceptPrivacy" color="primary" class="mb-4" required>
                  <template #label>
                    <span>
                      J'accepte que mes informations soient utilisées pour me recontacter et j'ai
                      pris connaissance de la
                      <router-link
                        to="/politique-de-confidentialite"
                        class="text-primary text-decoration-none"
                      >
                        politique de confidentialité
                      </router-link>
                      .
                    </span>
                  </template>
                </v-checkbox>
              </div>

              <!-- Boutons de navigation -->
              <div class="d-flex justify-space-between mt-8">
                <v-btn v-if="currentStep > 1" variant="outlined" size="large" @click="previousStep">
                  <v-icon icon="mdi-arrow-left" class="mr-2" />
                  Retour
                </v-btn>
                <div v-else></div>

                <v-btn
                  v-if="currentStep < totalSteps"
                  color="primary"
                  size="large"
                  :disabled="
                    (currentStep === 1 && !canProceedStep1) ||
                    (currentStep === 2 && !canProceedStep2) ||
                    (currentStep === 3 && !canProceedStep3)
                  "
                  @click="nextStep"
                >
                  Suivant
                  <v-icon icon="mdi-arrow-right" class="ml-2" />
                </v-btn>

                <v-btn
                  v-else
                  color="primary"
                  size="large"
                  :disabled="!canSubmit || isLoading"
                  :loading="isLoading"
                  type="submit"
                >
                  <v-icon icon="mdi-send" class="mr-2" />
                  Envoyer votre demande
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.contact-form-card {
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 238, 248, 0.95) 100%);
  border: 1px solid rgba(107, 90, 224, 0.1);
  backdrop-filter: blur(10px);
}

.step-indicator {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.step-indicator:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 20px;
  left: 60%;
  width: 80%;
  height: 2px;
  background: rgba(0, 0, 0, 0.1);
  z-index: 0;
}

.step-indicator.completed:not(:last-child)::after {
  background: rgb(var(--v-theme-primary));
}

.form-step {
  min-height: 300px;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
