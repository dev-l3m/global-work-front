<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  subject: '',
  message: '',
  email: '',
  phone: '',
})

const isSubmitting = ref(false)

function handleSubmit() {
  if (!form.value.email || !form.value.message) return
  isSubmitting.value = true
  // TODO: Implement contact form submission
  setTimeout(() => {
    isSubmitting.value = false
    form.value = { subject: '', message: '', email: '', phone: '' }
  }, 2000)
}
</script>

<template>
  <v-container id="contact" class="py-16">
    <div class="text-center mb-8">
      <div class="text-overline text-primary font-weight-bold mb-2">Contact</div>
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">Contactez-nous</div>
      <div class="text-body-1 text-medium-emphasis mx-auto" style="max-width: 600px">
        Une question sur nos services&nbsp;? Un projet en tête&nbsp;? Notre équipe vous répond
        rapidement.
      </div>
    </div>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-6 contact-form-card" elevation="2">
          <v-select
            v-model="form.subject"
            label="Objet de votre demande"
            :items="[
              'Demande d\'information générale',
              'Demande de devis personnalisé',
              'Demande de support technique',
              'Demande partenariat',
              'Autre',
            ]"
            prepend-inner-icon="mdi-text-box-outline"
            variant="outlined"
            class="mb-3"
          />
          <v-textarea
            v-model="form.message"
            class="mb-3"
            label="Précisez votre demande"
            rows="4"
            auto-grow
            prepend-inner-icon="mdi-text-long"
            variant="outlined"
            required
          />
          <v-text-field
            v-model="form.email"
            class="mb-3"
            label="Votre adresse email"
            type="email"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            required
          />
          <v-text-field
            v-model="form.phone"
            class="mb-4"
            label="Votre numéro de téléphone (optionnel)"
            prepend-inner-icon="mdi-phone-outline"
            variant="outlined"
          />
          <v-btn
            color="primary"
            class="text-none font-weight-bold"
            prepend-icon="mdi-send-outline"
            size="large"
            block
            :loading="isSubmitting"
            :disabled="!form.email || !form.message"
            @click="handleSubmit"
          >
            Envoyer votre demande
          </v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-6 contact-info-card" elevation="2">
          <div class="text-h6 font-weight-bold mb-4 d-flex align-center ga-2">
            <v-icon icon="mdi-information-outline" color="primary" />
            Nos coordonnées
          </div>
          <div class="text-body-1 mb-4 contact-address">
            <strong>GlobalKey Partners Ltd</strong><br />
            128 City Road<br />
            London EC1V 2NX<br />
            United Kingdom
          </div>
          <v-divider class="my-4" />
          <div class="d-flex flex-column ga-3">
            <div class="d-flex align-center ga-3 contact-item">
              <v-avatar color="primary" variant="tonal" size="40">
                <v-icon icon="mdi-email-outline" />
              </v-avatar>
              <div>
                <div class="text-caption text-medium-emphasis">Email</div>
                <a
                  href="mailto:contact@global-work-hub.com"
                  class="text-body-1 text-decoration-none"
                >
                  contact@global-work-hub.com
                </a>
              </div>
            </div>
            <div class="d-flex align-center ga-3 contact-item">
              <v-avatar color="secondary" variant="tonal" size="40">
                <v-icon icon="mdi-phone-outline" />
              </v-avatar>
              <div>
                <div class="text-caption text-medium-emphasis">Téléphone</div>
                <a href="tel:+33978455089" class="text-body-1 text-decoration-none">
                  +33 9 78 45 50 89
                </a>
              </div>
            </div>
            <div class="d-flex align-center ga-3 contact-item">
              <v-avatar color="primary" variant="tonal" size="40">
                <v-icon icon="mdi-clock-outline" />
              </v-avatar>
              <div>
                <div class="text-caption text-medium-emphasis">Horaires</div>
                <div class="text-body-1">Lun - Ven: 9h - 18h (CET)</div>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.contact-form-card,
.contact-info-card {
  border-radius: 20px;
  transition: all 0.3s ease;
}

.contact-form-card:hover,
.contact-info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}

.contact-address {
  line-height: 1.8;
}

.contact-item {
  transition: transform 0.2s ease;
}

.contact-item:hover {
  transform: translateX(4px);
}
</style>
