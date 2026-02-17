<script setup lang="ts"></script>

<template>
  <v-container class="py-10 py-md-16">
    <v-card class="pa-6 pa-sm-8 question-card mx-auto" elevation="2" max-width="640">
      <div class="text-center">
        <v-icon icon="mdi-help-circle-outline" color="primary" size="48" class="mb-3 mb-sm-4" />
        <h2 class="text-h5 text-md-h4 font-weight-bold mb-2">
          Vous ne trouvez pas réponse à votre question ?
        </h2>
        <p class="text-body-2 text-medium-emphasis mb-4 mx-auto question-card-desc">
          Notre équipe vous répond rapidement. Utilisez le formulaire de contact sur la page
          d'accueil.
        </p>
        <v-btn
          color="primary"
          size="large"
          class="text-none font-weight-bold"
          prepend-icon="mdi-send"
          :to="{ path: '/', hash: '#contact' }"
        >
          Accéder au formulaire de contact
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.question-card {
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(107, 90, 224, 0.06) 0%, rgba(255, 122, 60, 0.06) 100%);
  border: 1px solid rgba(107, 90, 224, 0.15);
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.question-card:hover {
  border-color: rgba(107, 90, 224, 0.3);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.12);
}

.question-card-desc {
  max-width: 480px;
  line-height: 1.6;
}
</style>
