<script setup lang="ts">
const sections = [
  {
    title: 'Collecte des données',
    icon: 'mdi-database',
    color: 'primary',
    content:
      'Nous recueillons uniquement les informations nécessaires à la gestion des demandes, candidatures et services :',
    items: ['Nom, email, entreprise, téléphone', 'Besoins professionnels'],
  },
  {
    title: 'Utilisation des données',
    icon: 'mdi-cog',
    color: 'secondary',
    content: 'Les données collectées sont utilisées pour :',
    items: [
      'Gestion des contacts et des missions',
      "Envoi d'informations pertinentes et offres personnalisées",
      'Suivi administratif et légal des missions internationales',
    ],
  },
  {
    title: 'Sécurité et stockage',
    icon: 'mdi-shield-check',
    color: 'success',
    content: null,
    items: [
      'Données sécurisées via chiffrement SSL et serveurs protégés',
      'Accès limité aux employés autorisés',
      'Conformité RGPD garantie',
    ],
  },
  {
    title: 'Partage des données',
    icon: 'mdi-share-variant',
    color: 'info',
    content:
      'Nous ne vendons jamais vos informations. Partage uniquement avec des partenaires nécessaires à la prestation de services (ex : hubs internationaux).',
    items: null,
  },
  {
    title: 'Droits des utilisateurs',
    icon: 'mdi-account-check',
    color: 'warning',
    content:
      "Vous pouvez exercer vos droits d'accès, modification, suppression et opposition sur vos données personnelles à tout moment en nous contactant à :",
    items: ['Email : contact@globalworkhub.com'],
  },
]
</script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-12">
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">
        Politique de confidentialité de Global Work Hub
      </div>
    </div>

    <v-row>
      <v-col
        v-for="(section, index) in sections"
        :key="index"
        cols="12"
        md="6"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: index * 0.15,
          threshold: 0.1,
        }"
      >
        <v-card class="pa-6 privacy-card h-100" elevation="2">
          <div class="d-flex align-center ga-3 mb-4">
            <v-avatar :color="section.color" variant="flat" size="56">
              <v-icon :icon="section.icon" size="28" color="white" />
            </v-avatar>
            <div class="text-h6 font-weight-bold">{{ section.title }}</div>
          </div>
          <div
            v-if="section.content"
            class="text-body-1 text-medium-emphasis mb-3"
            style="line-height: 1.8"
          >
            {{ section.content }}
          </div>
          <ul v-if="section.items" class="privacy-list">
            <li
              v-for="(item, itemIndex) in section.items"
              :key="itemIndex"
              class="text-body-2 text-medium-emphasis"
            >
              {{ item }}
            </li>
          </ul>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.privacy-card {
  border-radius: 20px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
}

.privacy-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}

.privacy-list {
  padding-left: 1.2rem;
  margin: 0;
  list-style: none;
}

.privacy-list li {
  margin-bottom: 8px;
  line-height: 1.7;
  position: relative;
  padding-left: 1rem;
}

.privacy-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
  font-size: 1.2em;
}
</style>
