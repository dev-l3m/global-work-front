<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import { getPostBySlug, getRelatedPosts, getAdjacentPosts } from '@/composables/useBlog'
import { useBlogPostStructuredData } from '@/composables/useBlogStructuredData'
import type { BlogPost } from '@/types/blog'
import { BlogNewsletterSection } from '@/components/resources'
import { WhyCTASection } from '@/components/about'

const route = useRoute()
const router = useRouter()

const post = ref<BlogPost | null>(null)
const relatedPosts = ref<BlogPost[]>([])
const previousPost = ref<BlogPost | null>(null)
const nextPost = ref<BlogPost | null>(null)
const loading = ref(true)
const activeHeading = ref<string>('')

const baseUrl = import.meta.env.VITE_SITE_URL || 'https://global-work-hub.com'

// Meta tags dynamiques
const metaTitle = computed(() => post.value?.title || 'Article')
const metaDescription = computed(() => post.value?.description || '')
const canonicalUrl = computed(() => `${baseUrl}/blog/${post.value?.slug || ''}`)
const ogImage = computed(() => {
  if (post.value?.cover) {
    return post.value.cover.startsWith('http') ? post.value.cover : `${baseUrl}${post.value.cover}`
  }
  return `${baseUrl}/images/blog/default-og.webp`
})

useHead(() => {
  if (!post.value) return {}

  return {
    title: metaTitle.value,
    meta: [
      {
        name: 'description',
        content: metaDescription.value,
      },
      {
        property: 'og:title',
        content: metaTitle.value,
      },
      {
        property: 'og:description',
        content: metaDescription.value,
      },
      {
        property: 'og:type',
        content: 'article',
      },
      {
        property: 'og:url',
        content: canonicalUrl.value,
      },
      {
        property: 'og:image',
        content: ogImage.value,
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: metaTitle.value,
      },
      {
        name: 'twitter:description',
        content: metaDescription.value,
      },
      {
        name: 'twitter:image',
        content: ogImage.value,
      },
      {
        property: 'article:published_time',
        content: new Date(post.value.date).toISOString(),
      },
      {
        property: 'article:author',
        content: 'Global Work Hub',
      },
      {
        property: 'article:section',
        content: post.value.category,
      },
      ...post.value.tags.map(tag => ({
        property: 'article:tag',
        content: tag,
      })),
    ],
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl.value,
      },
    ],
  }
})

// Structured data JSON-LD
useBlogPostStructuredData(() => {
  if (!post.value) return null

  return {
    headline: post.value.title,
    description: post.value.description,
    image: ogImage.value,
    datePublished: new Date(post.value.date).toISOString(),
    author: {
      name: 'Global Work Hub',
      url: baseUrl,
    },
    publisher: {
      name: 'Global Work Hub',
      logo: {
        url: `${baseUrl}/assets/hub-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl.value,
    },
  }
})

onMounted(async () => {
  const slug = route.params.slug as string
  await loadPost(slug)
})

async function loadPost(slug: string) {
  try {
    loading.value = true
    const loadedPost = await getPostBySlug(slug)

    if (!loadedPost) {
      router.push({ name: 'not-found' })
      return
    }

    post.value = loadedPost

    // Charger les articles liés
    relatedPosts.value = await getRelatedPosts(loadedPost, 3)

    // Charger les articles précédent/suivant
    const adjacent = await getAdjacentPosts(loadedPost)
    previousPost.value = adjacent.previous
    nextPost.value = adjacent.next

    // Ajouter les IDs aux headings dans le HTML pour le scroll
    addHeadingIds()

    // Observer les headings pour le TOC actif
    observeHeadings()
  } catch (error) {
    console.error("Erreur lors du chargement de l'article:", error)
    router.push({ name: 'not-found' })
  } finally {
    loading.value = false
  }
}

function addHeadingIds() {
  if (!post.value) return

  // Les IDs sont déjà générés par useBlog.ts, on s'assure juste qu'ils sont dans le DOM
  nextTick(() => {
    const headings = document.querySelectorAll('article h2, article h3')
    headings.forEach(heading => {
      const text = heading.textContent || ''
      const id = slugify(text)
      heading.id = id
    })
  })
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function observeHeadings() {
  if (!post.value || post.value.headings.length === 0) return

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeHeading.value = entry.target.id
        }
      })
    },
    {
      rootMargin: '-20% 0% -70% 0%',
    }
  )

  nextTick(() => {
    post.value?.headings.forEach(heading => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })
  })
}

function scrollToHeading(id: string) {
  const element = document.getElementById(id)
  if (element) {
    const offset = 80 // Header height
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
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
    <div v-if="loading" class="text-center py-16">
      <v-progress-circular indeterminate color="primary" size="64" />
    </div>

    <template v-else-if="post">
      <!-- Hero Section -->
      <v-container class="py-16">
        <div class="max-width-900 mx-auto">
          <!-- Breadcrumb -->
          <div class="mb-4">
            <v-breadcrumbs
              :items="[
                { title: 'Accueil', to: '/' },
                { title: 'Blog', to: '/blog' },
                { title: post.title, disabled: true },
              ]"
            />
          </div>

          <!-- Category & Date -->
          <div class="d-flex align-center ga-2 mb-4">
            <v-chip size="small" color="primary" variant="tonal">
              {{ post.category }}
            </v-chip>
            <span class="text-body-2 text-medium-emphasis">{{ formatDate(post.date) }}</span>
            <span class="text-body-2 text-medium-emphasis">·</span>
            <span class="text-body-2 text-medium-emphasis"
              >{{ post.readingTime }} min de lecture</span
            >
          </div>

          <!-- Title (H1) -->
          <h1 class="text-h3 text-md-h2 font-weight-bold mb-6">{{ post.title }}</h1>

          <!-- Cover Image -->
          <v-img
            v-if="post.cover"
            :src="post.cover"
            :alt="post.coverAlt"
            height="400"
            cover
            class="mb-8 rounded-lg"
            loading="eager"
            :aspect-ratio="16 / 9"
          >
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height bg-grey-lighten-4">
                <v-progress-circular indeterminate color="primary" />
              </div>
            </template>
          </v-img>
        </div>
      </v-container>

      <v-divider />

      <!-- Content & TOC -->
      <v-container class="py-16">
        <v-row>
          <!-- Main Content -->
          <v-col cols="12" lg="8">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <article class="blog-content max-width-800" v-html="post.content" />

            <!-- Tags -->
            <div v-if="post.tags.length > 0" class="mt-8">
              <div class="d-flex flex-wrap ga-2">
                <v-chip
                  v-for="tag in post.tags"
                  :key="tag"
                  size="small"
                  variant="outlined"
                  color="primary"
                >
                  {{ tag }}
                </v-chip>
              </div>
            </div>

            <!-- Navigation Previous/Next -->
            <v-row class="mt-12">
              <v-col cols="12" md="6">
                <v-card
                  v-if="previousPost"
                  :to="`/blog/${previousPost.slug}`"
                  class="pa-4 navigation-card"
                  hover
                  elevation="2"
                >
                  <div class="text-caption text-medium-emphasis mb-2">
                    <v-icon icon="mdi-arrow-left" size="16" class="mr-1" />
                    Article précédent
                  </div>
                  <div class="text-body-1 font-weight-bold">{{ previousPost.title }}</div>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card
                  v-if="nextPost"
                  :to="`/blog/${nextPost.slug}`"
                  class="pa-4 navigation-card text-right"
                  hover
                  elevation="2"
                >
                  <div class="text-caption text-medium-emphasis mb-2">
                    Article suivant
                    <v-icon icon="mdi-arrow-right" size="16" class="ml-1" />
                  </div>
                  <div class="text-body-1 font-weight-bold">{{ nextPost.title }}</div>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <!-- Sidebar: TOC -->
          <v-col cols="12" lg="4">
            <v-card v-if="post.headings.length > 0" class="pa-4 toc-card" elevation="2" sticky>
              <div class="text-h6 font-weight-bold mb-4">Sommaire</div>
              <nav>
                <div
                  v-for="heading in post.headings"
                  :key="heading.id"
                  :class="[
                    'toc-item',
                    heading.level === 3 ? 'toc-item-level-3' : '',
                    activeHeading === heading.id ? 'toc-item-active' : '',
                  ]"
                  @click="scrollToHeading(heading.id)"
                >
                  {{ heading.text }}
                </div>
              </nav>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-divider />

      <!-- Related Posts -->
      <v-container v-if="relatedPosts.length > 0" class="py-16">
        <div class="text-h5 font-weight-bold mb-8 text-center">Articles similaires</div>
        <v-row>
          <v-col v-for="relatedPost in relatedPosts" :key="relatedPost.slug" cols="12" md="4">
            <v-card
              :to="`/blog/${relatedPost.slug}`"
              class="article-card h-100"
              elevation="2"
              hover
            >
              <v-img
                v-if="relatedPost.cover"
                :src="relatedPost.cover"
                :alt="relatedPost.coverAlt"
                height="200"
                cover
                loading="lazy"
              />
              <v-card-title class="text-h6 font-weight-bold pa-4">
                {{ relatedPost.title }}
              </v-card-title>
              <v-card-subtitle class="pa-4 pt-0">
                <div class="d-flex align-center ga-2 mb-2">
                  <v-chip size="small" color="primary" variant="tonal">
                    {{ relatedPost.category }}
                  </v-chip>
                  <span class="text-caption text-medium-emphasis">
                    {{ formatDate(relatedPost.date) }}
                  </span>
                </div>
                <div class="text-body-2">{{ relatedPost.description }}</div>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-divider />

      <BlogNewsletterSection />

      <v-divider />

      <WhyCTASection />
    </template>
  </PublicLayout>
</template>

<style scoped>
.blog-content {
  line-height: 1.8;
}

.blog-content :deep(h2) {
  font-size: 1.75rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  scroll-margin-top: 80px;
}

.blog-content :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  scroll-margin-top: 80px;
}

.blog-content :deep(p) {
  margin-bottom: 1.25rem;
}

.blog-content :deep(ul),
.blog-content :deep(ol) {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

.blog-content :deep(li) {
  margin-bottom: 0.5rem;
}

.blog-content :deep(a) {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
}

.blog-content :deep(a:hover) {
  text-decoration: underline;
}

.blog-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.blog-content :deep(blockquote) {
  border-left: 4px solid rgb(var(--v-theme-primary));
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: rgba(var(--v-theme-on-surface), 0.7);
}

.toc-card {
  position: sticky;
  top: 80px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

.toc-item {
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.25rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: rgba(var(--v-theme-on-surface), 0.7);
  font-size: 0.9rem;
}

.toc-item-level-3 {
  padding-left: 1.5rem;
  font-size: 0.85rem;
}

.toc-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
}

.toc-item-active {
  background-color: rgba(var(--v-theme-primary), 0.15);
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
}

.navigation-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.navigation-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(107, 90, 224, 0.15);
}

.article-card {
  border-radius: 20px;
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}

.max-width-800 {
  max-width: 800px;
}

.max-width-900 {
  max-width: 900px;
}
</style>
