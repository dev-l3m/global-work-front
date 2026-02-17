<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import { getPaginatedPosts, getAllCategories } from '@/composables/useBlog'
import type { BlogPost } from '@/types/blog'
import { BlogNewsletterSection } from '@/components/resources'
import { WhyCTASection } from '@/components/about'

const route = useRoute()
const router = useRouter()

const posts = ref<BlogPost[]>([])
const categories = ref<string[]>([])
const loading = ref(true)
const currentPage = ref(1)
const totalPages = ref(1)
const totalPosts = ref(0)
const perPage = 10

const baseUrl = import.meta.env.VITE_SITE_URL || 'https://global-work-hub.com'

// Calculer la page depuis la query string
const pageFromQuery = computed(() => {
  const page = parseInt(route.query.page as string) || 1
  return Math.max(1, page)
})

// Meta tags pour la page liste
useHead({
  title: 'Blog & Conseils - Global Work Hub',
  meta: [
    {
      name: 'description',
      content:
        "Découvrez nos articles et conseils sur le recrutement international, l'externalisation RH et l'expansion à l'étranger. Actualités et bonnes pratiques.",
    },
    {
      property: 'og:title',
      content: 'Blog & Conseils - Global Work Hub',
    },
    {
      property: 'og:description',
      content:
        "Découvrez nos articles et conseils sur le recrutement international, l'externalisation RH et l'expansion à l'étranger.",
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: `${baseUrl}/blog`,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `${baseUrl}/blog${currentPage.value > 1 ? `?page=${currentPage.value}` : ''}`,
    },
  ],
})

onMounted(async () => {
  currentPage.value = pageFromQuery.value
  await loadPosts()
  await loadCategories()
})

async function loadPosts() {
  try {
    loading.value = true
    const result = await getPaginatedPosts(currentPage.value, perPage)
    posts.value = result.posts
    totalPages.value = result.totalPages
    totalPosts.value = result.total
  } catch (error) {
    console.error('Erreur lors du chargement des articles:', error)
  } finally {
    loading.value = false
  }
}

async function loadCategories() {
  try {
    categories.value = await getAllCategories()
  } catch (error) {
    console.error('Erreur lors du chargement des catégories:', error)
  }
}

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  router.push({ query: { page: page > 1 ? page : undefined } })
  loadPosts()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

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
  <PublicLayout>
    <!-- Hero Section -->
    <v-container class="py-16">
      <div class="text-center mb-12">
        <div class="text-h3 text-md-h2 font-weight-bold mb-4">
          Conseils d'Experts en Recrutement International
        </div>
        <div class="text-body-1 text-medium-emphasis max-width-800 mx-auto">
          Découvrez nos articles et conseils pour optimiser votre recrutement international et votre
          gestion RH à l'étranger.
        </div>
      </div>
    </v-container>

    <v-divider />

    <!-- Articles List -->
    <v-container class="py-16">
      <div v-if="loading" class="text-center py-16">
        <v-progress-circular indeterminate color="primary" size="64" />
      </div>

      <div v-else-if="posts.length === 0" class="text-center py-16">
        <v-icon icon="mdi-book-open-variant" size="64" color="primary" class="mb-4" />
        <div class="text-h6 mb-2">Aucun article disponible</div>
        <div class="text-body-2 text-medium-emphasis">Les articles seront bientôt disponibles.</div>
      </div>

      <v-row v-else>
        <v-col
          v-for="(post, index) in posts"
          :key="post.slug"
          cols="12"
          md="6"
          lg="4"
          v-scroll-animation="{
            animation: 'fadeInUp',
            delay: index * 0.1,
            threshold: 0.1,
          }"
        >
          <v-card
            class="article-card h-100 d-flex flex-column"
            elevation="2"
            :to="`/blog/${post.slug}`"
            hover
          >
            <!-- Cover Image -->
            <v-img
              v-if="post.cover"
              :src="post.cover"
              :alt="post.coverAlt"
              height="200"
              cover
              loading="lazy"
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height bg-grey-lighten-4">
                  <v-icon icon="mdi-image" size="48" color="grey-lighten-1" />
                </div>
              </template>
            </v-img>

            <v-card-title class="text-h6 font-weight-bold pa-4 pb-2">
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
                <span class="text-caption text-medium-emphasis">
                  · {{ post.readingTime }} min de lecture
                </span>
              </div>
              <div class="text-body-2">{{ post.description }}</div>
            </v-card-subtitle>

            <v-card-actions class="pa-4 pt-0 mt-auto">
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

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-12 d-flex justify-center">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="7"
          color="primary"
          @update:model-value="goToPage"
        />
      </div>
    </v-container>

    <v-divider />

    <BlogNewsletterSection />

    <v-divider />

    <WhyCTASection />
  </PublicLayout>
</template>

<style scoped>
.article-card {
  border-radius: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}

.max-width-800 {
  max-width: 800px;
}
</style>
