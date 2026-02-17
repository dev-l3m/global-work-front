<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import { rhAdminService } from '@/content/services'
import { getRelatedBlogPosts } from '@/composables/useService'
import type { BlogPost } from '@/types/blog'
import {
  RecrutementHeroSection,
  RHAdminServicesSection,
  RHAdminBenefitsSection,
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
  title: rhAdminService.metaTitle,
  meta: [
    {
      name: 'description',
      content: rhAdminService.metaDescription,
    },
    {
      property: 'og:title',
      content: rhAdminService.metaTitle,
    },
    {
      property: 'og:description',
      content: rhAdminService.metaDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: `${baseUrl}/rh-et-administratif`,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: rhAdminService.metaTitle,
    },
    {
      name: 'twitter:description',
      content: rhAdminService.metaDescription,
    },
    {
      name: 'keywords',
      content: rhAdminService.keywords.join(', '),
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `${baseUrl}/rh-et-administratif`,
    },
  ],
})

onMounted(async () => {
  relatedPosts.value = await getRelatedBlogPosts(rhAdminService)
})
</script>

<template>
  <PublicLayout>
    <!-- Hero Section -->
    <RecrutementHeroSection :title="rhAdminService.heroTitle" />

    <v-divider />

    <!-- Description Section -->
    <section class="service-description-section">
      <v-container class="py-16">
        <div class="max-width-900 mx-auto">
          <h2 class="text-h4 text-md-h3 font-weight-bold mb-6 text-center">
            {{ rhAdminService.name }}
          </h2>
          <p
            class="text-body-1 text-medium-emphasis mb-4"
            style="line-height: 1.8; font-size: 1.1rem"
          >
            {{ rhAdminService.description }}
          </p>
          <p class="text-body-1 text-medium-emphasis" style="line-height: 1.8">
            {{ rhAdminService.heroSubtitle }}
          </p>
        </div>
      </v-container>
    </section>

    <v-divider />

    <!-- Benefits Section -->
    <ServiceBenefitsSection
      :benefits="rhAdminService.benefits"
      title="Les avantages de l'externalisation RH"
    />

    <v-divider />

    <!-- Services Section -->
    <RHAdminServicesSection />

    <v-divider />

    <!-- Benefits Details Section -->
    <RHAdminBenefitsSection />

    <v-divider />

    <!-- Use Cases Section -->
    <ServiceUseCasesSection :use-cases="rhAdminService.useCases" title="Cas d'usage concrets" />

    <v-divider />

    <!-- Testimonials Section -->
    <ServiceTestimonialsSection
      :testimonials="rhAdminService.testimonials"
      title="Témoignages clients - Externalisation RH"
    />

    <v-divider />

    <!-- Blog Links Section -->
    <ServiceBlogLinksSection
      :posts="relatedPosts"
      title="En savoir plus sur l'externalisation RH"
    />

    <v-divider />

    <!-- Final CTA -->
    <WhyCTASection
      :title="`Prêt à externaliser votre gestion RH ?`"
      :description="`Découvrez comment nous pouvons simplifier votre gestion RH internationale.`"
      :button-text="rhAdminService.ctaText"
      :button-href="rhAdminService.ctaLink"
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
