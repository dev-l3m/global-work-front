<script setup lang="ts">
const organizations = [
  {
    title: 'Siège Angleterre',
    icon: 'mdi-earth',
    color: 'primary',
    items: [
      'Sourcing et coordination globale',
      'Formation des talents en continu',
      'Suivi opérationnel 24/7',
      'Hubs locaux dans 15 pays',
    ],
  },
  {
    title: 'Structure Européenne Londres',
    icon: 'mdi-office-building',
    color: 'secondary',
    items: [
      'Contractualisation européenne',
      'Facturation avec conformité fiscale',
      'Support client en français',
      'Conformité RGPD et droit du travail',
    ],
  },
]
</script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-12">
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">
        Notre organisation aux quatre coins du monde
      </div>
    </div>

    <v-row>
      <v-col
        v-for="(org, index) in organizations"
        :key="index"
        cols="12"
        md="6"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: index * 0.15,
          threshold: 0.1,
        }"
      >
        <v-card class="pa-8 org-card h-100" elevation="3">
          <div class="d-flex align-center ga-3 mb-6">
            <v-avatar :color="org.color" variant="flat" size="64">
              <v-icon :icon="org.icon" size="32" color="white" />
            </v-avatar>
            <div class="text-h5 font-weight-bold">{{ org.title }}</div>
          </div>
          <ul class="org-list">
            <li
              v-for="(item, itemIndex) in org.items"
              :key="itemIndex"
              class="text-body-1 text-medium-emphasis"
            >
              {{ item }}
            </li>
          </ul>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-center mt-8">
      <v-card class="pa-6 highlight-card" variant="tonal" color="primary" elevation="2">
        <div class="text-h6 font-weight-bold">
          Un hub mondial, une relation contractuelle européenne.
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<style scoped>
.org-card {
  border-radius: 24px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 244, 255, 0.8) 100%);
}

.org-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}

.org-list {
  padding-left: 1.2rem;
  margin: 0;
  list-style: none;
}

.org-list li {
  margin-bottom: 12px;
  line-height: 1.8;
  position: relative;
  padding-left: 1.5rem;
}

.org-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
  font-size: 1.3em;
}

.highlight-card {
  border-radius: 16px;
  max-width: 600px;
  margin: 0 auto;
}
</style>
