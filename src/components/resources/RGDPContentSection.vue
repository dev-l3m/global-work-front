<script setup lang="ts">
const rgpdSections = [
  {
    title: 'Finalité du traitement',
    icon: 'mdi-target',
    color: 'primary',
    items: [
      'Gestion des contacts, clients et talents internationaux',
      'Suivi administratif et légal des missions',
      'Communication sur services et offres adaptées',
    ],
  },
  {
    title: 'Base légale',
    icon: 'mdi-scale-balance',
    color: 'secondary',
    items: [
      'Consentement explicite pour les communications',
      "Exécution d'un contrat ou mesures précontractuelles",
      "Respect d'obligations légales",
    ],
  },
  {
    title: 'Droits des personnes',
    icon: 'mdi-account-check-outline',
    color: 'success',
    items: [
      'Accès aux données',
      'Rectification des informations inexactes',
      'Suppression ou limitation du traitement',
      'Opposition au traitement',
      'Portabilité des données',
    ],
  },
  {
    title: 'Sécurité des données',
    icon: 'mdi-shield-check',
    color: 'info',
    items: [
      'Chiffrement SSL pour toutes transmissions',
      'Serveurs sécurisés et accès restreint',
      'Procédures internes pour protéger la confidentialité',
    ],
  },
  {
    title: 'Durée de conservation',
    icon: 'mdi-clock-outline',
    color: 'warning',
    content:
      'Les données sont conservées uniquement le temps nécessaire aux finalités déclarées, puis anonymisées ou supprimées selon les obligations légales.',
  },
  {
    title: 'Contact pour exercer vos droits',
    icon: 'mdi-email-outline',
    color: 'error',
    contact: {
      email: 'contact@globalworkhub.com',
      phone: '+33 9 78 45 50 89',
    },
  },
]
</script>

<template>
  <v-container class="py-16">
    <v-row>
      <v-col
        v-for="(section, index) in rgpdSections"
        :key="index"
        cols="12"
        md="6"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: index * 0.1,
          threshold: 0.1,
        }"
      >
        <v-card class="pa-8 rgpd-card h-100" elevation="3">
          <div class="d-flex align-center ga-3 mb-6">
            <v-avatar :color="section.color" variant="flat" size="56">
              <v-icon :icon="section.icon" size="28" color="white" />
            </v-avatar>
            <div class="text-h6 font-weight-bold">{{ section.title }}</div>
          </div>

          <div v-if="section.items" class="rgpd-items">
            <ul class="rgpd-list">
              <li
                v-for="(item, itemIndex) in section.items"
                :key="itemIndex"
                class="text-body-1 text-medium-emphasis"
              >
                {{ item }}
              </li>
            </ul>
          </div>

          <div
            v-else-if="section.content"
            class="rgpd-content text-body-1 text-medium-emphasis"
            v-html="section.content"
          />

          <div v-else-if="section.contact" class="rgpd-contact">
            <div class="d-flex align-center ga-2 mb-3">
              <v-icon icon="mdi-email" size="20" color="primary" />
              <a
                :href="`mailto:${section.contact.email}`"
                class="text-body-1 text-primary text-decoration-none"
              >
                {{ section.contact.email }}
              </a>
            </div>
            <div class="d-flex align-center ga-2">
              <v-icon icon="mdi-phone" size="20" color="primary" />
              <a
                :href="`tel:${section.contact.phone.replace(/\s/g, '')}`"
                class="text-body-1 text-primary text-decoration-none"
              >
                {{ section.contact.phone }}
              </a>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-center mt-10">
      <v-btn
        color="primary"
        size="large"
        class="text-none font-weight-bold"
        prepend-icon="mdi-shield-account"
        href="mailto:contact@globalworkhub.com"
        style="padding: 16px 32px; font-size: 16px"
      >
        Exercer vos droits RGPD
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>
.rgpd-card {
  border-radius: 20px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 244, 255, 0.8) 100%);
}

.rgpd-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}

.rgpd-items {
  margin-top: 8px;
}

.rgpd-list {
  padding-left: 1.2rem;
  margin: 0;
  list-style: none;
}

.rgpd-list li {
  margin-bottom: 12px;
  line-height: 1.8;
  position: relative;
  padding-left: 1.5rem;
}

.rgpd-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
  font-size: 1.5em;
}

.rgpd-content {
  line-height: 1.8;
}

.rgpd-contact {
  margin-top: 8px;
}

.rgpd-contact a:hover {
  text-decoration: underline !important;
}
</style>
