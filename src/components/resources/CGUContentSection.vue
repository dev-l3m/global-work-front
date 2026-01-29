<script setup lang="ts">
const cguSections = [
  {
    title: 'Objet',
    icon: 'mdi-target',
    color: 'primary',
    content:
      "Les présentes CGU définissent les règles d'utilisation du site, des services et de toutes informations fournies par Global Work Hub.",
  },
  {
    title: 'Accès au site',
    icon: 'mdi-lock-open-outline',
    color: 'secondary',
    content:
      "L'accès est libre et gratuit. L'utilisateur s'engage à ne pas perturber le fonctionnement du site ni à utiliser ses contenus à des fins illégales.",
  },
  {
    title: 'Services proposés',
    icon: 'mdi-briefcase-outline',
    color: 'success',
    items: [
      'Mise en relation avec des talents internationaux',
      'Gestion des candidatures et missions encadrées',
      'Informations et ressources RH',
    ],
  },
  {
    title: 'Responsabilité',
    icon: 'mdi-shield-alert-outline',
    color: 'warning',
    content:
      'Global Work Hub ne garantit pas la disponibilité continue du site ni la pertinence des informations pour tous usages.',
  },
  {
    title: 'Propriété intellectuelle',
    icon: 'mdi-copyright',
    color: 'info',
    content:
      'Le contenu du site (textes, images, logos, vidéos) est protégé. Toute reproduction est interdite sans autorisation écrite.',
  },
  {
    title: 'Modification des CGU',
    icon: 'mdi-pencil-outline',
    color: 'error',
    content:
      "Global Work Hub se réserve le droit de modifier les CGU à tout moment. L'utilisation continue du site vaut acceptation des nouvelles conditions.",
  },
]
</script>

<template>
  <v-container class="py-16">
    <v-row>
      <v-col
        v-for="(section, index) in cguSections"
        :key="index"
        cols="12"
        md="6"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: index * 0.1,
          threshold: 0.1,
        }"
      >
        <v-card class="pa-8 cgu-card h-100" elevation="3">
          <div class="d-flex align-center ga-3 mb-6">
            <v-avatar :color="section.color" variant="flat" size="56">
              <v-icon :icon="section.icon" size="28" color="white" />
            </v-avatar>
            <div class="text-h6 font-weight-bold">{{ section.title }}</div>
          </div>

          <div v-if="section.items" class="cgu-items">
            <ul class="cgu-list">
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
            class="cgu-content text-body-1 text-medium-emphasis"
            v-html="section.content"
          />
        </v-card>
      </v-col>
    </v-row>

    <div class="text-center mt-10">
      <v-btn
        color="primary"
        size="large"
        class="text-none font-weight-bold"
        prepend-icon="mdi-help-circle-outline"
        to="/faq"
        style="padding: 16px 32px; font-size: 16px"
      >
        Lire notre FAQ pour plus d'informations
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>
.cgu-card {
  border-radius: 20px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 244, 255, 0.8) 100%);
}

.cgu-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}

.cgu-items {
  margin-top: 8px;
}

.cgu-list {
  padding-left: 1.2rem;
  margin: 0;
  list-style: none;
}

.cgu-list li {
  margin-bottom: 12px;
  line-height: 1.8;
  position: relative;
  padding-left: 1.5rem;
}

.cgu-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
  font-size: 1.5em;
}

.cgu-content {
  line-height: 1.8;
}
</style>
