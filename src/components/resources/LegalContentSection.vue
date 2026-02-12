<script setup lang="ts">
const legalSections = [
  {
    title: '1. Mentions légales de Global Work Hub',
    icon: 'mdi-information-outline',
    color: 'primary',
    items: [
      { label: 'Éditeur du site :', value: 'Global Work Hub' },
      { label: 'Siège social :', value: 'GlobalKey Partners Ltd, 128 City Road. London ECIV 2NX' },
      { label: 'Email :', value: 'contact@globalworkhub.com' },
      { label: 'Téléphone :', value: '+33 9 78 45 50 89' },
    ],
  },
  {
    title: '2. Hébergement du site',
    icon: 'mdi-server',
    color: 'secondary',
    items: [
      { label: "Nom de l'hébergeur :", value: 'Global Work Hub' },
      { label: 'Adresse :', value: 'GlobalKey Partners Ltd, 128 City Road. London ECIV 2NX' },
      { label: 'Téléphone :', value: '+33 9 78 45 50 89' },
    ],
  },
  {
    title: '3. Propriété intellectuelle',
    icon: 'mdi-copyright',
    color: 'info',
    content:
      "Tous les contenus présents sur ce site (textes, images, vidéos, logos, graphiques) sont la propriété exclusive de **Global Work Hub** et sont protégés par le droit d'auteur. Toute reproduction ou utilisation sans autorisation est strictement interdite.",
  },
  {
    title: '4. Responsabilité',
    icon: 'mdi-shield-alert-outline',
    color: 'warning',
    content:
      "**Global Work Hub** ne saurait être tenu responsable des erreurs ou omissions présentes sur le site, ni des dommages directs ou indirects résultant de l'utilisation des informations ou services proposés.",
  },
]
</script>

<template>
  <v-container class="py-16">
    <v-row>
      <v-col
        v-for="(section, index) in legalSections"
        :key="index"
        cols="12"
        md="6"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: index * 0.1,
          threshold: 0.1,
        }"
      >
        <v-card class="pa-8 legal-card h-100" elevation="3">
          <div class="d-flex align-center ga-3 mb-6">
            <v-avatar :color="section.color" variant="flat" size="56">
              <v-icon :icon="section.icon" size="28" color="white" />
            </v-avatar>
            <div class="text-h6 font-weight-bold">{{ section.title }}</div>
          </div>

          <div v-if="section.items" class="legal-items">
            <div
              v-for="(item, itemIndex) in section.items"
              :key="itemIndex"
              class="legal-item mb-4"
            >
              <div class="text-subtitle-2 font-weight-bold text-primary mb-1">
                {{ item.label }}
              </div>
              <div class="text-body-1 text-medium-emphasis">{{ item.value }}</div>
            </div>
          </div>

          <div
            v-else-if="section.content"
            class="legal-content text-body-1 text-medium-emphasis"
            v-html="section.content"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.legal-card {
  border-radius: 20px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 238, 248, 0.8) 100%);
}

.legal-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}

.legal-items {
  margin-top: 8px;
}

.legal-item {
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(107, 90, 224, 0.1);
}

.legal-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}

.legal-content {
  line-height: 1.8;
}

.legal-content :deep(strong) {
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
}
</style>
