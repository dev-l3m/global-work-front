<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import PublicLayout from '@/layouts/PublicLayout.vue'

const router = useRouter()

// Meta tags SEO pour la page 404
useHead({
  title: 'Page non trouvée - 404 | Global Work Hub',
  meta: [
    {
      name: 'description',
      content:
        "La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil pour découvrir nos services de recrutement international.",
    },
    {
      name: 'robots',
      content: 'noindex, follow',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://global-work-hub.com/404',
    },
  ],
})

function goHome() {
  router.push('/')
}
</script>

<template>
  <PublicLayout>
    <v-container class="py-16">
      <div class="text-center">
        <div class="mb-8">
          <h1 class="text-h2 text-md-h1 font-weight-bold mb-4">404</h1>
          <h2 class="text-h5 text-md-h4 font-weight-medium mb-4">Page non trouvée</h2>
          <p class="text-body-1 text-medium-emphasis mb-8" style="max-width: 600px; margin: 0 auto">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée. Retournez à
            l'accueil pour découvrir nos services de recrutement international.
          </p>
        </div>

        <div class="d-flex flex-column flex-md-row gap-4 justify-center">
          <v-btn color="primary" size="large" class="text-none font-weight-bold" @click="goHome">
            <v-icon icon="mdi-home" start />
            Retour à l'accueil
          </v-btn>
          <v-btn
            variant="outlined"
            size="large"
            class="text-none font-weight-medium"
            to="/contactez-nous"
          >
            <v-icon icon="mdi-email" start />
            Nous contacter
          </v-btn>
        </div>

        <div class="mt-12">
          <p class="text-body-2 text-medium-emphasis mb-4">Pages populaires :</p>
          <div class="d-flex flex-wrap gap-3 justify-center">
            <v-btn variant="text" to="/recrutement" class="text-none">Recrutement</v-btn>
            <v-btn variant="text" to="/partage-salarial" class="text-none">Partage salarial</v-btn>
            <v-btn variant="text" to="/faq" class="text-none">FAQ</v-btn>
            <v-btn variant="text" to="/contactez-nous" class="text-none">Contact</v-btn>
          </div>
        </div>
      </div>
    </v-container>
  </PublicLayout>
</template>

<style scoped>
h1 {
  background: linear-gradient(135deg, #6b5ae0 0%, #ff7a3c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 8rem;
}

@media (max-width: 960px) {
  h1 {
    font-size: 5rem;
  }
}
</style>
