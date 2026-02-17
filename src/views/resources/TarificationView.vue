<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import {
  TarificationHeroSection,
  TarificationStructureSection,
  TarificationConditionsSection,
  TarificationExamplesSection,
} from '@/components/resources'
import { WhyCTASection } from '@/components/about'
</script>

<template>
  <PublicLayout>
    <TarificationHeroSection
      title="Conditions de collaboration et tarification transparente"
      subtitle="Parce que la transparence est la base d'une collaboration durable, voici nos conditions clairement établies. Pas de frais cachés, pas de mauvaises surprises : juste une relation commerciale saine et équitable pour les deux parties."
    />

    <!-- CTA vers nos tarifs -->
    <v-container class="py-8">
      <div class="text-center">
        <v-btn
          color="primary"
          size="large"
          class="text-none font-weight-bold"
          prepend-icon="mdi-cash-multiple"
          to="/nos-tarifs"
        >
          Voir nos tarifs détaillés
        </v-btn>
      </div>
    </v-container>

    <v-divider />

    <TarificationStructureSection />

    <v-divider />

    <TarificationConditionsSection />

    <v-divider />

    <TarificationExamplesSection />

    <v-divider />

    <WhyCTASection />
  </PublicLayout>
</template>
