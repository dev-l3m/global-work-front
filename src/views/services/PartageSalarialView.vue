<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import { partageSalarialService } from '@/content/services'
import { getRelatedBlogPosts } from '@/composables/useService'
import type { BlogPost } from '@/types/blog'
import {
  PartageSalarialHeroSection,
  PartageSalarialFeaturesSection,
  ServiceBenefitsSection,
  ServiceUseCasesSection,
  ServiceTestimonialsSection,
  ServiceBlogLinksSection,
} from '@/components/services'
import { WhyCTASection } from '@/components/about'

const relatedPosts = ref<BlogPost[]>([])
const baseUrl = import.meta.env.VITE_SITE_URL || 'https://global-work-hub.com'

// Meta tags SEO dynamiques
useHead({
  title: partageSalarialService.metaTitle,
  meta: [
    {
      name: 'description',
      content: partageSalarialService.metaDescription,
    },
    {
      property: 'og:title',
      content: partageSalarialService.metaTitle,
    },
    {
      property: 'og:description',
      content: partageSalarialService.metaDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: `${baseUrl}/partage-salarial`,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: partageSalarialService.metaTitle,
    },
    {
      name: 'twitter:description',
      content: partageSalarialService.metaDescription,
    },
    {
      name: 'keywords',
      content: partageSalarialService.keywords.join(', '),
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `${baseUrl}/partage-salarial`,
    },
  ],
})

onMounted(async () => {
  relatedPosts.value = await getRelatedBlogPosts(partageSalarialService)
})
</script>

<template>
  <PublicLayout>
    <!-- Hero Section -->
    <PartageSalarialHeroSection :title="partageSalarialService.heroTitle" />

    <v-divider />

    <!-- Description Section -->
    <section class="service-description-section">
      <v-container class="py-16">
        <div class="max-width-900 mx-auto">
          <h2 class="text-h4 text-md-h3 font-weight-bold mb-6 text-center">
            {{ partageSalarialService.name }}
          </h2>
          <p
            class="text-body-1 text-medium-emphasis mb-4"
            style="line-height: 1.8; font-size: 1.1rem"
          >
            {{ partageSalarialService.description }}
          </p>
          <p class="text-body-1 text-medium-emphasis" style="line-height: 1.8">
            {{ partageSalarialService.heroSubtitle }}
          </p>
        </div>
      </v-container>
    </section>

    <v-divider />

    <!-- Benefits Section -->
    <ServiceBenefitsSection
      :benefits="partageSalarialService.benefits"
      title="Les avantages du partage salarial (EOR)"
    />

    <v-divider />

    <!-- Features Section -->
    <PartageSalarialFeaturesSection />

    <v-divider />

    <!-- Use Cases Section -->
    <ServiceUseCasesSection
      :use-cases="partageSalarialService.useCases"
      title="Cas d'usage concrets"
    />

    <v-divider />

    <!-- Testimonials Section -->
    <ServiceTestimonialsSection
      :testimonials="partageSalarialService.testimonials"
      title="Témoignages clients - Partage salarial"
    />

    <v-divider />

    <!-- Blog Links Section -->
    <ServiceBlogLinksSection :posts="relatedPosts" title="En savoir plus sur le partage salarial" />

    <v-divider />

    <!-- Final CTA -->
    <WhyCTASection
      :title="`Prêt à embaucher à l'international sans créer d'entité ?`"
      :description="`Découvrez comment le partage salarial peut simplifier votre expansion internationale.`"
      :button-text="partageSalarialService.ctaText"
      :button-href="partageSalarialService.ctaLink"
    />
  </PublicLayout>
</template>

<style scoped>
.service-description-section {
  background: rgba(255, 255, 255, 1);
}

.max-width-900 {
  max-width: 900px;
}
</style>
