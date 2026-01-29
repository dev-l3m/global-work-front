<script setup lang="ts">
const securityItems = [
  {
    title: 'Sécurité Juridique Renforcée',
    icon: 'mdi-shield-lock',
    color: 'primary',
    items: [
      "Contrat d'entreprise via structure européenne",
      'Mission à durée indéterminée (engagement 3 mois minimum)',
      'Préavis organisé selon termes contractuels',
      'Clause anti-contournement pour protection mutuelle',
      'NDA systématique et confidentialité renforcée',
    ],
  },
  {
    title: 'Certifications & Assurances',
    icon: 'mdi-certificate',
    color: 'success',
    items: [
      'Immatriculation officielle UK',
      'Assurance responsabilité civile professionnelle',
      'Conformité RGPD certifiée',
      'Processus qualité standardisés',
    ],
  },
]
</script>

<template>
  <v-container class="py-16">
    <v-row>
      <v-col
        v-for="(item, index) in securityItems"
        :key="index"
        cols="12"
        md="6"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: index * 0.15,
          threshold: 0.1,
        }"
      >
        <v-card class="pa-8 security-card h-100" elevation="4">
          <div class="d-flex align-center ga-3 mb-6">
            <v-avatar :color="item.color" variant="flat" size="72">
              <v-icon :icon="item.icon" size="36" color="white" />
            </v-avatar>
            <div class="text-h5 font-weight-bold">{{ item.title }}</div>
          </div>
          <ul class="security-list">
            <li
              v-for="(listItem, itemIndex) in item.items"
              :key="itemIndex"
              class="text-body-1 text-medium-emphasis"
            >
              {{ listItem }}
            </li>
          </ul>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.security-card {
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(107, 90, 224, 0.08) 0%, rgba(255, 122, 60, 0.08) 100%);
  border: 2px solid rgba(107, 90, 224, 0.2);
  transition: all 0.3s ease;
}

.security-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(107, 90, 224, 0.2);
  border-color: rgba(107, 90, 224, 0.3);
}

.security-list {
  padding-left: 1.2rem;
  margin: 0;
  list-style: none;
}

.security-list li {
  margin-bottom: 12px;
  line-height: 1.8;
  position: relative;
  padding-left: 1.5rem;
}

.security-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: rgb(var(--v-theme-success));
  font-weight: bold;
  font-size: 1.3em;
}
</style>
