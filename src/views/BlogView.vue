<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import { BlogHeroSection, BlogArticlesSection, BlogNewsletterSection } from '@/components/resources'
import { WhyCTASection } from '@/components/about'
</script>

<template>
  <PublicLayout>
    <BlogHeroSection title="Conseils d'Experts en Recrutement International" />

    <v-divider />

    <BlogArticlesSection />

    <v-divider />

    <BlogNewsletterSection />

    <v-divider />

    <WhyCTASection />
  </PublicLayout>
</template>
