<script setup lang="ts">
import { ref } from 'vue'

const showComingSoonDialog = ref(false)

const articles = [
  {
    title: '5 avantages du recrutement international pour les PME',
    icon: 'mdi-trending-up',
    color: 'primary',
  },
  {
    title: 'Comment bien manager une équipe à distance : best practices',
    icon: 'mdi-account-group',
    color: 'secondary',
  },
  {
    title: 'Les compétences les plus recherchées en 2024 dans le digital',
    icon: 'mdi-code-tags',
    color: 'success',
  },
  {
    title: 'Externalisation : comment choisir entre freelance et équipe encadrée',
    icon: 'mdi-handshake',
    color: 'info',
  },
]
</script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-12">
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">Articles récents</div>
    </div>

    <v-row>
      <v-col
        v-for="(article, index) in articles"
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
        <v-card class="pa-6 article-card h-100" elevation="2">
          <div class="article-card-header">
            <div class="article-card-header-row d-flex align-center ga-3 mb-3">
              <v-avatar :color="article.color" variant="tonal" size="48">
                <v-icon :icon="article.icon" size="24" />
              </v-avatar>
              <div class="text-overline text-primary font-weight-bold">Article</div>
            </div>
            <div
              class="text-subtitle-1 font-weight-bold article-card-title"
              style="line-height: 1.5"
            >
              {{ article.title }}
            </div>
          </div>
          <v-btn
            variant="text"
            color="primary"
            class="mt-4 text-none"
            prepend-icon="mdi-arrow-right"
            size="small"
            @click="showComingSoonDialog = true"
          >
            Lire l'article
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showComingSoonDialog" max-width="400" persistent>
      <v-card class="pa-6 coming-soon-dialog">
        <div class="coming-soon-dialog-content">
          <v-icon icon="mdi-cog" size="48" color="primary" class="mb-4" />
          <div class="text-h6 font-weight-bold mb-2">Fonctionnalité en cours de développement</div>
          <p class="text-body-2 text-medium-emphasis mb-4">
            La lecture des articles sera bientôt disponible.
          </p>
          <v-btn color="primary" variant="flat" @click="showComingSoonDialog = false">
            Fermer
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.article-card {
  border-radius: 20px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
  border-left-width: 6px;
}

/* Mobile : centrer l'en-tête de la carte */
@media (max-width: 599px) {
  .article-card-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .article-card-header-row {
    justify-content: center;
  }
}

.coming-soon-dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
