<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import { gestionCoService } from '@/content/services'
import { getRelatedBlogPosts } from '@/composables/useService'
import type { BlogPost } from '@/types/blog'
import {
  GestionCoHeroSection,
  GestionCoFeaturesSection,
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
  title: gestionCoService.metaTitle,
  meta: [
    {
      name: 'description',
      content: gestionCoService.metaDescription,
    },
    {
      property: 'og:title',
      content: gestionCoService.metaTitle,
    },
    {
      property: 'og:description',
      content: gestionCoService.metaDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: `${baseUrl}/gestion-de-co`,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: gestionCoService.metaTitle,
    },
    {
      name: 'twitter:description',
      content: gestionCoService.metaDescription,
    },
    {
      name: 'keywords',
      content: gestionCoService.keywords.join(', '),
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `${baseUrl}/gestion-de-co`,
    },
  ],
})

onMounted(async () => {
  relatedPosts.value = await getRelatedBlogPosts(gestionCoService)
})
</script>

<template>
  <PublicLayout>
    <!-- Hero Section -->
    <GestionCoHeroSection :title="gestionCoService.heroTitle" />

    <v-divider />

    <!-- Description Section -->
    <section class="service-description-section">
      <v-container class="py-16">
        <div class="max-width-900 mx-auto">
          <h2 class="text-h4 text-md-h3 font-weight-bold mb-6 text-center">
            {{ gestionCoService.name }}
          </h2>
          <p
            class="text-body-1 text-medium-emphasis mb-4"
            style="line-height: 1.8; font-size: 1.1rem"
          >
            {{ gestionCoService.description }}
          </p>
          <p class="text-body-1 text-medium-emphasis" style="line-height: 1.8">
            {{ gestionCoService.heroSubtitle }}
          </p>
        </div>
      </v-container>
    </section>

    <v-divider />

    <!-- Benefits Section -->
    <ServiceBenefitsSection
      :benefits="gestionCoService.benefits"
      title="Les avantages de la gestion de co-entreprise"
    />

    <v-divider />

    <!-- Features Section -->
    <GestionCoFeaturesSection />

    <v-divider />

    <!-- Use Cases Section -->
    <ServiceUseCasesSection :use-cases="gestionCoService.useCases" title="Cas d'usage concrets" />

    <v-divider />

    <!-- Testimonials Section -->
    <ServiceTestimonialsSection
      :testimonials="gestionCoService.testimonials"
      title="Témoignages clients - Gestion de co-entreprise"
    />

    <v-divider />

    <!-- Blog Links Section -->
    <ServiceBlogLinksSection
      :posts="relatedPosts"
      title="En savoir plus sur la gestion de co-entreprise"
    />

    <v-divider />

    <!-- Final CTA -->
    <WhyCTASection
      :title="`Prêt à structurer votre co-entreprise internationale ?`"
      :description="`Découvrez comment nous pouvons vous accompagner dans la création et la gestion de votre co-entreprise.`"
      :button-text="gestionCoService.ctaText"
      :button-href="gestionCoService.ctaLink"
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
