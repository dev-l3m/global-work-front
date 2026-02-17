<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import { recrutementService } from '@/content/services'
import { getRelatedBlogPosts } from '@/composables/useService'
import type { BlogPost } from '@/types/blog'
import {
  RecrutementHeroSection,
  RecrutementProcessSection,
  RecrutementProfilesSection,
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
  title: recrutementService.metaTitle,
  meta: [
    {
      name: 'description',
      content: recrutementService.metaDescription,
    },
    {
      property: 'og:title',
      content: recrutementService.metaTitle,
    },
    {
      property: 'og:description',
      content: recrutementService.metaDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: `${baseUrl}/recrutement`,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: recrutementService.metaTitle,
    },
    {
      name: 'twitter:description',
      content: recrutementService.metaDescription,
    },
    {
      name: 'keywords',
      content: recrutementService.keywords.join(', '),
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `${baseUrl}/recrutement`,
    },
  ],
})

onMounted(async () => {
  // Charger les articles de blog liés
  relatedPosts.value = await getRelatedBlogPosts(recrutementService)
})
</script>

<template>
  <PublicLayout>
    <!-- Hero Section -->
    <RecrutementHeroSection :title="recrutementService.heroTitle" />

    <v-divider />

    <!-- Description Section -->
    <section class="service-description-section">
      <v-container class="py-16">
        <div class="max-width-900 mx-auto">
          <h2 class="text-h4 text-md-h3 font-weight-bold mb-6 text-center">
            {{ recrutementService.name }}
          </h2>
          <p
            class="text-body-1 text-medium-emphasis mb-4"
            style="line-height: 1.8; font-size: 1.1rem"
          >
            {{ recrutementService.description }}
          </p>
          <p class="text-body-1 text-medium-emphasis" style="line-height: 1.8">
            {{ recrutementService.heroSubtitle }}
          </p>
        </div>
      </v-container>
    </section>

    <v-divider />

    <!-- Benefits Section -->
    <ServiceBenefitsSection
      :benefits="recrutementService.benefits"
      title="Les avantages du recrutement international"
    />

    <v-divider />

    <!-- Process Section -->
    <RecrutementProcessSection />

    <v-divider />

    <!-- Use Cases Section -->
    <ServiceUseCasesSection :use-cases="recrutementService.useCases" title="Cas d'usage concrets" />

    <v-divider />

    <!-- Profiles Section -->
    <RecrutementProfilesSection />

    <v-divider />

    <!-- Testimonials Section -->
    <ServiceTestimonialsSection
      :testimonials="recrutementService.testimonials"
      title="Témoignages clients - Recrutement international"
    />

    <v-divider />

    <!-- Blog Links Section -->
    <ServiceBlogLinksSection
      :posts="relatedPosts"
      title="En savoir plus sur le recrutement international"
    />

    <v-divider />

    <!-- Final CTA -->
    <WhyCTASection
      :title="`Prêt à démarrer votre recrutement international ?`"
      :description="`Parlez à un expert et découvrez comment nous pouvons vous aider à trouver les meilleurs talents en 15+ pays.`"
      :button-text="recrutementService.ctaText"
      :button-href="recrutementService.ctaLink"
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
