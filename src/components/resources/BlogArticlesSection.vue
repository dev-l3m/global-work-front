<script setup lang="ts">
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
          <div class="d-flex align-center ga-3 mb-3">
            <v-avatar :color="article.color" variant="tonal" size="48">
              <v-icon :icon="article.icon" size="24" />
            </v-avatar>
            <div class="text-overline text-primary font-weight-bold">Article</div>
          </div>
          <div class="text-subtitle-1 font-weight-bold" style="line-height: 1.5">
            {{ article.title }}
          </div>
          <v-btn
            variant="text"
            color="primary"
            class="mt-4 text-none"
            prepend-icon="mdi-arrow-right"
            size="small"
          >
            Lire l'article
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
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
</style>
