<script setup lang="ts">
import type { BlogPost } from '@/types/blog'

defineProps<{
  posts: BlogPost[]
  title?: string
}>()

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <section v-if="posts.length > 0" class="service-blog-section">
    <v-container class="py-16">
      <div class="text-center mb-12">
        <h2 class="text-h4 text-md-h3 font-weight-bold mb-4">
          {{ title || 'Articles connexes' }}
        </h2>
        <p class="text-body-1 text-medium-emphasis max-width-700 mx-auto">
          Découvrez nos articles de blog pour approfondir vos connaissances sur ce sujet.
        </p>
      </div>

      <v-row>
        <v-col
          v-for="post in posts"
          :key="post.slug"
          cols="12"
          md="4"
          v-scroll-animation="{
            animation: 'fadeInUp',
            delay: 0.1,
            threshold: 0.1,
          }"
        >
          <v-card :to="`/blog/${post.slug}`" class="blog-link-card h-100" elevation="2" hover>
            <v-img
              v-if="post.cover"
              :src="post.cover"
              :alt="post.coverAlt"
              height="200"
              cover
              loading="lazy"
            />
            <v-card-title class="text-h6 font-weight-bold pa-4">
              {{ post.title }}
            </v-card-title>
            <v-card-subtitle class="pa-4 pt-0">
              <div class="d-flex align-center ga-2 mb-2">
                <v-chip size="small" color="primary" variant="tonal">
                  {{ post.category }}
                </v-chip>
                <span class="text-caption text-medium-emphasis">
                  {{ formatDate(post.date) }}
                </span>
              </div>
              <div class="text-body-2">{{ post.description }}</div>
            </v-card-subtitle>
            <v-card-actions class="pa-4 pt-0">
              <v-btn
                color="primary"
                variant="text"
                prepend-icon="mdi-arrow-right"
                class="text-none"
                :to="`/blog/${post.slug}`"
              >
                Lire l'article
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.service-blog-section {
  background: rgba(107, 90, 224, 0.03);
}

.blog-link-card {
  border-radius: 20px;
  transition: all 0.3s ease;
}

.blog-link-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}

.max-width-700 {
  max-width: 700px;
}
</style>
