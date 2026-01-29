<script setup lang="ts"></script>

<template>
  <v-container class="py-16">
    <v-card class="pa-8 question-card" elevation="4">
      <div class="text-center">
        <v-icon icon="mdi-help-circle-outline" color="primary" size="56" class="mb-4" />
        <div class="text-h5 font-weight-bold mb-4">
          Vous ne trouvez pas réponse à votre question ?
        </div>
        <v-textarea
          placeholder="Posez votre question ici..."
          variant="outlined"
          rows="4"
          class="mb-4"
          style="max-width: 600px; margin: 0 auto"
          hide-details
        />
        <v-btn
          color="primary"
          size="large"
          class="text-none font-weight-bold"
          prepend-icon="mdi-send"
          href="#contact"
        >
          Envoyer ma question
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.question-card {
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(107, 90, 224, 0.08) 0%, rgba(255, 122, 60, 0.08) 100%);
  border: 2px solid rgba(107, 90, 224, 0.2);
  transition: all 0.3s ease;
}

.question-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(107, 90, 224, 0.2);
}
</style>
