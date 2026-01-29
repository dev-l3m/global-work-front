<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import { FAQHeroSection, FAQCategoriesSection, FAQQuestionSection } from '@/components/resources'
import { WhyCTASection } from '@/components/about'
</script>

<template>
  <PublicLayout>
    <FAQHeroSection title="FAQ" />

    <v-divider />

    <FAQCategoriesSection />

    <v-divider />

    <FAQQuestionSection />

    <v-divider />

    <WhyCTASection />
  </PublicLayout>
</template>
