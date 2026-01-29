<script setup lang="ts"></script>

<template>
  <v-container class="py-16">
    <v-card class="pa-8 cta-card" elevation="4">
      <v-row align="center">
        <v-col cols="12" md="8">
          <div class="text-h4 text-md-h3 font-weight-bold mb-3">
            Prêt à transformer votre recrutement international ?
          </div>
          <div class="text-body-1 text-medium-emphasis mb-4">
            Rejoignez les entreprises qui nous font confiance et découvrez comment Global Work Hub
            peut accélérer votre croissance.
          </div>
          <div class="d-flex ga-3 flex-wrap">
            <v-btn
              color="primary"
              size="large"
              class="text-none font-weight-bold"
              prepend-icon="mdi-send"
              href="#contact"
            >
              Contactez-nous
            </v-btn>
            <v-btn
              variant="outlined"
              color="primary"
              size="large"
              class="text-none"
              prepend-icon="mdi-calendar-clock"
              href="#contact"
            >
              Demander une démo
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="4" class="text-center">
          <v-icon icon="mdi-handshake" size="120" color="primary" class="mb-4" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped>
.cta-card {
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(107, 90, 224, 0.05) 0%, rgba(255, 122, 60, 0.05) 100%);
  border: 2px solid rgba(107, 90, 224, 0.2);
}
</style>
