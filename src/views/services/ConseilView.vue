<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import { conseilService } from '@/content/services'
import { getRelatedBlogPosts } from '@/composables/useService'
import type { BlogPost } from '@/types/blog'
import {
  RecrutementHeroSection,
  ConseilApproachSection,
  ConseilObjectiveSection,
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
  title: conseilService.metaTitle,
  meta: [
    {
      name: 'description',
      content: conseilService.metaDescription,
    },
    {
      property: 'og:title',
      content: conseilService.metaTitle,
    },
    {
      property: 'og:description',
      content: conseilService.metaDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: `${baseUrl}/accompagnement-conseil`,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: conseilService.metaTitle,
    },
    {
      name: 'twitter:description',
      content: conseilService.metaDescription,
    },
    {
      name: 'keywords',
      content: conseilService.keywords.join(', '),
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `${baseUrl}/accompagnement-conseil`,
    },
  ],
})

onMounted(async () => {
  relatedPosts.value = await getRelatedBlogPosts(conseilService)
})
</script>

<template>
  <PublicLayout>
    <!-- Hero Section -->
    <RecrutementHeroSection :title="conseilService.heroTitle" />

    <v-divider />

    <!-- Description Section -->
    <section class="service-description-section">
      <v-container class="py-16">
        <div class="max-width-900 mx-auto">
          <h2 class="text-h4 text-md-h3 font-weight-bold mb-6 text-center">
            {{ conseilService.name }}
          </h2>
          <p
            class="text-body-1 text-medium-emphasis mb-4"
            style="line-height: 1.8; font-size: 1.1rem"
          >
            {{ conseilService.description }}
          </p>
          <p class="text-body-1 text-medium-emphasis" style="line-height: 1.8">
            {{ conseilService.heroSubtitle }}
          </p>
        </div>
      </v-container>
    </section>

    <v-divider />

    <!-- Benefits Section -->
    <ServiceBenefitsSection
      :benefits="conseilService.benefits"
      title="Les avantages de notre accompagnement"
    />

    <v-divider />

    <!-- Approach Section -->
    <ConseilApproachSection />

    <v-divider />

    <!-- Objective Section -->
    <ConseilObjectiveSection />

    <v-divider />

    <!-- Use Cases Section -->
    <ServiceUseCasesSection :use-cases="conseilService.useCases" title="Cas d'usage concrets" />

    <v-divider />

    <!-- Testimonials Section -->
    <ServiceTestimonialsSection
      :testimonials="conseilService.testimonials"
      title="Témoignages clients - Conseil & Accompagnement"
    />

    <v-divider />

    <!-- Blog Links Section -->
    <ServiceBlogLinksSection
      :posts="relatedPosts"
      title="En savoir plus sur l'accompagnement stratégique"
    />

    <v-divider />

    <!-- Final CTA -->
    <WhyCTASection
      :title="`Prêt à bénéficier de notre expertise ?`"
      :description="`Parlez à un consultant et découvrez comment nous pouvons vous accompagner dans votre expansion internationale.`"
      :button-text="conseilService.ctaText"
      :button-href="conseilService.ctaLink"
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
