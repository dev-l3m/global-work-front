<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@unhead/vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import {
  pricingPlans,
  pricingFeatures,
  pricingFAQ,
  pricingExamples,
  pricingAddons,
  pricingConditions,
} from '@/content/pricing'
import { usePricingFAQStructuredData } from '@/composables/usePricingStructuredData'
import { WhyCTASection } from '@/components/about'

const baseUrl = import.meta.env.VITE_SITE_URL || 'https://global-work-hub.com'
const isMobile = ref(false)

// Détection mobile pour le tableau comparatif
if (typeof window !== 'undefined') {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 960
  }
  checkMobile()
  window.addEventListener('resize', checkMobile)
}

// Meta tags SEO
useHead({
  title: 'Nos Tarifs - Tarification Transparente Tout Inclus | Global Work Hub',
  meta: [
    {
      name: 'description',
      content:
        'Tarification transparente et tout inclus pour le recrutement international. À partir de 800€/mois, essai 30 jours sans engagement. Devis personnalisé disponible.',
    },
    {
      property: 'og:title',
      content: 'Nos Tarifs - Tarification Transparente | Global Work Hub',
    },
    {
      property: 'og:description',
      content:
        'Découvrez nos tarifs transparents pour le recrutement international. Tout inclus, sans frais cachés, essai 30 jours.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: `${baseUrl}/nos-tarifs`,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'Nos Tarifs - Global Work Hub',
    },
    {
      name: 'twitter:description',
      content:
        'Tarification transparente pour le recrutement international. Tout inclus, essai 30 jours.',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `${baseUrl}/nos-tarifs`,
    },
  ],
})

// Structured data FAQPage
usePricingFAQStructuredData(pricingFAQ)
</script>

<template>
  <PublicLayout>
    <!-- Hero Section -->
    <v-container class="py-16">
      <div class="text-center mb-12 max-width-900 mx-auto">
        <h1 class="text-h3 text-md-h2 font-weight-bold mb-4">Nos tarifs</h1>
        <p class="text-h6 text-md-h5 text-medium-emphasis mb-6">
          Transparence, tout inclus, sans surprise
        </p>
        <div class="d-flex flex-wrap justify-center ga-3 mb-8">
          <v-chip color="success" variant="tonal" size="small">
            <v-icon icon="mdi-calendar-check" start size="16" />
            Essai 30 jours
          </v-chip>
          <v-chip color="primary" variant="tonal" size="small">
            <v-icon icon="mdi-headset" start size="16" />
            Support illimité
          </v-chip>
          <v-chip color="info" variant="tonal" size="small">
            <v-icon icon="mdi-shield-check" start size="16" />
            Sans frais cachés
          </v-chip>
        </div>
        <v-btn
          color="primary"
          size="x-large"
          class="text-none font-weight-bold"
          prepend-icon="mdi-file-document-outline"
          href="/contactez-nous"
        >
          Obtenir un devis personnalisé
        </v-btn>
      </div>
    </v-container>

    <v-divider />

    <!-- Plans Cards -->
    <section class="pricing-plans-section">
      <v-container class="py-16">
        <div class="text-center mb-12">
          <h2 class="text-h4 text-md-h3 font-weight-bold mb-4">Forfait Mensuel Complet</h2>
          <p class="text-body-1 text-medium-emphasis max-width-700 mx-auto">
            Une solution tout inclus pour votre recrutement international, sans surprise ni frais
            cachés.
          </p>
        </div>

        <v-row justify="center">
          <v-col v-for="plan in pricingPlans" :key="plan.id" cols="12" md="10" lg="8" xl="6">
            <v-card
              :class="['plan-card', { 'plan-card-popular': plan.popular }]"
              elevation="4"
              :border="plan.popular ? 'primary' : undefined"
            >
              <v-card-title v-if="plan.popular" class="plan-badge">
                <v-chip color="primary" size="small" class="font-weight-bold">
                  <v-icon icon="mdi-star" start size="16" />
                  Le plus populaire
                </v-chip>
              </v-card-title>

              <v-card-text class="pa-8">
                <div class="text-h5 font-weight-bold mb-2">{{ plan.name }}</div>
                <div class="text-h4 text-primary font-weight-bold mb-4">
                  {{ plan.priceLabel }}
                </div>
                <div class="text-body-2 text-medium-emphasis mb-6">{{ plan.description }}</div>

                <v-divider class="mb-6" />

                <div class="plan-features">
                  <div
                    v-for="(highlight, index) in plan.highlights"
                    :key="index"
                    class="d-flex align-start ga-3 mb-3"
                  >
                    <v-icon icon="mdi-check-circle" color="success" size="20" class="mt-1" />
                    <span class="text-body-1">{{ highlight }}</span>
                  </div>
                </div>

                <v-btn
                  :color="plan.popular ? 'primary' : 'primary'"
                  :variant="plan.popular ? 'flat' : 'outlined'"
                  size="large"
                  block
                  class="text-none font-weight-bold mt-6"
                  :href="plan.ctaLink"
                >
                  {{ plan.ctaText }}
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Comparison Table -->
    <section class="pricing-comparison-section">
      <v-container class="py-16">
        <div class="text-center mb-12">
          <h2 class="text-h4 text-md-h3 font-weight-bold mb-4">Ce qui est inclus</h2>
          <p class="text-body-1 text-medium-emphasis max-width-700 mx-auto">
            Comparatif détaillé de tous les services inclus dans notre forfait mensuel.
          </p>
        </div>

        <!-- Desktop Table -->
        <div v-if="!isMobile" class="comparison-table-wrapper">
          <v-table class="comparison-table">
            <thead>
              <tr>
                <th class="text-left">Fonctionnalité</th>
                <th class="text-center">Forfait Mensuel Complet</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="feature in pricingFeatures" :key="feature.id">
                <td>
                  <div class="font-weight-medium">{{ feature.name }}</div>
                  <div v-if="feature.description" class="text-caption text-medium-emphasis">
                    {{ feature.description }}
                  </div>
                </td>
                <td class="text-center">
                  <v-icon
                    v-if="feature.plans.complete"
                    icon="mdi-check-circle"
                    color="success"
                    size="24"
                  />
                  <span v-else class="text-medium-emphasis">—</span>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>

        <!-- Mobile Stacked Cards -->
        <div v-else>
          <v-expansion-panels variant="accordion" class="mb-4">
            <v-expansion-panel
              v-for="plan in pricingPlans"
              :key="plan.id"
              :title="plan.name"
              :subtitle="plan.priceLabel"
            >
              <v-expansion-panel-text>
                <div
                  v-for="feature in pricingFeatures"
                  :key="feature.id"
                  class="d-flex align-center ga-3 mb-3"
                >
                  <v-icon
                    v-if="feature.plans[plan.id]"
                    icon="mdi-check-circle"
                    color="success"
                    size="20"
                  />
                  <span v-else class="text-medium-emphasis">—</span>
                  <div>
                    <div class="font-weight-medium">{{ feature.name }}</div>
                    <div v-if="feature.description" class="text-caption text-medium-emphasis">
                      {{ feature.description }}
                    </div>
                  </div>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-container>
    </section>

    <!-- Examples Section -->
    <section class="pricing-examples-section">
      <v-container class="py-16">
        <div class="text-center mb-12">
          <h2 class="text-h4 text-md-h3 font-weight-bold mb-4">
            Exemples de fourchettes tarifaires
          </h2>
          <p class="text-body-1 text-medium-emphasis max-width-700 mx-auto">
            Tarifs indicatifs selon le profil et la séniorité. Un devis personnalisé vous sera
            fourni après analyse de vos besoins précis.
          </p>
        </div>

        <v-row>
          <v-col
            v-for="(example, index) in pricingExamples"
            :key="index"
            cols="12"
            sm="6"
            md="3"
            v-scroll-animation="{
              animation: 'fadeInUp',
              delay: index * 0.1,
              threshold: 0.1,
            }"
          >
            <v-card class="example-card h-100" elevation="2">
              <v-card-title class="text-h6 font-weight-bold pa-4 pb-2">
                {{ example.profile }}
              </v-card-title>
              <v-card-subtitle class="text-h5 text-primary font-weight-bold pa-4 pt-0 pb-2">
                {{ example.range }}
              </v-card-subtitle>
              <v-card-text class="pa-4 pt-0">
                <div class="text-body-2 text-medium-emphasis">{{ example.description }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Addons Section -->
    <section class="pricing-addons-section">
      <v-container class="py-16">
        <div class="text-center mb-12">
          <h2 class="text-h4 text-md-h3 font-weight-bold mb-4">Options additionnelles</h2>
          <p class="text-body-1 text-medium-emphasis max-width-700 mx-auto">
            Personnalisez votre offre avec nos options supplémentaires.
          </p>
        </div>

        <v-row>
          <v-col
            v-for="(addon, index) in pricingAddons"
            :key="index"
            cols="12"
            md="4"
            v-scroll-animation="{
              animation: 'fadeInUp',
              delay: index * 0.1,
              threshold: 0.1,
            }"
          >
            <v-card class="addon-card h-100" elevation="2">
              <v-card-title class="text-h6 font-weight-bold pa-4 pb-2">
                {{ addon.name }}
              </v-card-title>
              <v-card-subtitle class="text-h6 text-primary font-weight-bold pa-4 pt-0 pb-2">
                {{ addon.price }}
              </v-card-subtitle>
              <v-card-text class="pa-4 pt-0">
                <div class="text-body-2">{{ addon.description }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Conditions Section -->
    <section class="pricing-conditions-section">
      <v-container class="py-16">
        <div class="text-center mb-12">
          <h2 class="text-h4 text-md-h3 font-weight-bold mb-4">Transparence & Conditions</h2>
          <p class="text-body-1 text-medium-emphasis max-width-700 mx-auto">
            Nos engagements pour votre tranquillité d'esprit.
          </p>
        </div>

        <v-row>
          <v-col
            v-for="(condition, index) in pricingConditions"
            :key="index"
            cols="12"
            sm="6"
            md="3"
            v-scroll-animation="{
              animation: 'fadeInUp',
              delay: index * 0.1,
              threshold: 0.1,
            }"
          >
            <v-card class="condition-card h-100 text-center pa-6" elevation="2">
              <v-icon
                v-if="condition.icon"
                :icon="condition.icon"
                color="primary"
                size="48"
                class="mb-4"
              />
              <div class="text-h6 font-weight-bold mb-2">{{ condition.title }}</div>
              <div class="text-body-2 text-medium-emphasis">{{ condition.description }}</div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- FAQ Section -->
    <!-- <section class="pricing-faq-section">
      <v-container class="py-16">
      <div class="text-center mb-12">
        <h2 class="text-h4 text-md-h3 font-weight-bold mb-4">Questions fréquentes sur nos tarifs</h2>
        <p class="text-body-1 text-medium-emphasis max-width-700 mx-auto">
          Trouvez les réponses à vos questions sur notre tarification.
        </p>
      </div>

      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <v-expansion-panels variant="accordion" class="faq-panels">
            <v-expansion-panel
              v-for="(faq, index) in pricingFAQ"
              :key="index"
              :title="faq.question"
              class="faq-panel"
            >
              <v-expansion-panel-text>
                <div class="text-body-1 faq-answer" v-html="faq.answer"></div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      </v-container>
    </section> -->

    <!-- Final CTA -->
    <WhyCTASection
      title="Prêt à démarrer votre projet de recrutement international ?"
      description="Obtenez un devis personnalisé adapté à vos besoins. Réponse sous 24h."
      button-text="Obtenir un devis personnalisé"
      button-href="/contactez-nous"
    />

    <!-- Sticky CTA Mobile -->
    <div class="sticky-cta-mobile d-md-none">
      <v-btn
        color="primary"
        size="large"
        block
        class="text-none font-weight-bold"
        prepend-icon="mdi-file-document-outline"
        href="/contactez-nous"
      >
        Obtenir un devis
      </v-btn>
    </div>
  </PublicLayout>
</template>

<style scoped>
.max-width-700 {
  max-width: 700px;
}

.max-width-900 {
  max-width: 900px;
}

/* Hero Section */
.pricing-hero-section {
  background: linear-gradient(
    180deg,
    rgba(107, 90, 224, 0.08) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(240, 238, 248, 0.3) 100%
  );
  border-radius: 0 0 40px 40px;
  margin-bottom: 24px;
}

/* Plans Section */
.pricing-plans-section {
  background: rgba(255, 255, 255, 1);
}

/* Comparison Section */
.pricing-comparison-section {
  background: rgba(107, 90, 224, 0.03);
}

/* Examples Section */
.pricing-examples-section {
  background: rgba(255, 255, 255, 1);
}

/* Addons Section */
.pricing-addons-section {
  background: rgba(107, 90, 224, 0.03);
}

/* Conditions Section */
.pricing-conditions-section {
  background: rgba(255, 255, 255, 1);
}

/* FAQ Section */
.pricing-faq-section {
  background: rgba(107, 90, 224, 0.03);
}

.plan-card {
  border-radius: 24px;
  transition: all 0.3s ease;
  position: relative;
  overflow: visible;
  background: white;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
}

.plan-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(107, 90, 224, 0.2);
  border-color: rgb(var(--v-theme-primary));
}

.plan-card-popular {
  border: 2px solid rgb(var(--v-theme-primary));
  box-shadow: 0 8px 32px rgba(107, 90, 224, 0.15);
}

.plan-badge {
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.plan-features {
  min-height: 300px;
}

.comparison-table-wrapper {
  overflow-x: auto;
  border-radius: 16px;
  border: 2px solid rgba(var(--v-theme-primary), 0.2);
  background: white;
  box-shadow: 0 4px 16px rgba(107, 90, 224, 0.1);
}

.comparison-table {
  background: white;
}

.comparison-table :deep(th) {
  background: rgba(var(--v-theme-primary), 0.1);
  font-weight: 600;
  padding: 20px 16px;
  color: rgb(var(--v-theme-primary));
  font-size: 1rem;
}

.comparison-table :deep(td) {
  padding: 20px 16px;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  font-size: 0.95rem;
}

.comparison-table :deep(tr:hover) {
  background: rgba(var(--v-theme-primary), 0.05);
}

.comparison-table :deep(tr:last-child td) {
  border-bottom: none;
}

.example-card,
.addon-card,
.condition-card {
  border-radius: 20px;
  transition: all 0.3s ease;
  background: white;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
}

.example-card:hover,
.addon-card:hover,
.condition-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
  border-color: rgb(var(--v-theme-primary));
}

.condition-card {
  border-left: 4px solid rgb(var(--v-theme-primary));
  background: rgba(107, 90, 224, 0.02);
}

.sticky-cta-mobile {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 12px 16px;
  background: white;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.12);
}

@media (min-width: 960px) {
  .sticky-cta-mobile {
    display: none;
  }
}

/* FAQ Panels */
.faq-panels {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(107, 90, 224, 0.1);
}

.faq-panel {
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.12);
}

.faq-panel:last-child {
  border-bottom: none;
}

.faq-answer {
  line-height: 1.8;
  color: rgba(var(--v-theme-on-surface), 0.9);
}

/* Amélioration de la lisibilité générale */
.pricing-plans-section h2,
.pricing-comparison-section h2,
.pricing-examples-section h2,
.pricing-addons-section h2,
.pricing-conditions-section h2,
.pricing-faq-section h2 {
  color: rgba(var(--v-theme-on-surface), 0.95);
}

/* Espacement amélioré pour les sections */
section {
  padding: 0;
}

section + section {
  margin-top: 0;
}
</style>
