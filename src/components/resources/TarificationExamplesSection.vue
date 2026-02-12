<script setup lang="ts">
const examples = [
  {
    title: 'Assistant virtuel',
    price: '800-1200€/mois',
    icon: 'mdi-account-tie',
    color: 'primary',
  },
  {
    title: 'Développeur confirmé',
    price: '1500-2500€/mois',
    icon: 'mdi-code-tags',
    color: 'secondary',
  },
  {
    title: 'Chargé marketing',
    price: '1200-1800€/mois',
    icon: 'mdi-chart-line',
    color: 'success',
  },
  {
    title: 'Support client expert',
    price: '1000-1500€/mois',
    icon: 'mdi-headset',
    color: 'info',
  },
]
</script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-12">
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">Exemples de tarification</div>
      <div
        class="text-body-1 text-medium-emphasis mx-auto"
        style="max-width: 700px; line-height: 1.8"
      >
        <strong>Tarifs tout inclus : salaire, encadrement, outils, formation</strong>
      </div>
    </div>

    <v-row>
      <v-col
        v-for="(example, index) in examples"
        :key="index"
        cols="12"
        sm="6"
        md="3"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: index * 0.1,
          threshold: 0.1,
        }"
      >
        <v-card class="pa-6 example-card h-100" elevation="3">
          <div class="text-center">
            <v-avatar :color="example.color" variant="flat" size="72" class="mb-4">
              <v-icon :icon="example.icon" size="36" color="white" />
            </v-avatar>
            <div class="text-h6 font-weight-bold mb-2">{{ example.title }}</div>
            <div class="text-h5 font-weight-bold text-primary mb-2">{{ example.price }}</div>
            <v-chip color="success" variant="tonal" size="small" class="mt-2"> Tout inclus </v-chip>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-center mt-10">
      <v-btn
        color="primary"
        size="x-large"
        class="text-none font-weight-bold"
        prepend-icon="mdi-file-document-edit"
        href="#contact"
        style="padding: 16px 32px; font-size: 16px"
      >
        Obtenir un devis personnalisé
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>
.example-card {
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 238, 248, 0.8) 100%);
  border: 2px solid rgba(107, 90, 224, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.example-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 20px 60px rgba(107, 90, 224, 0.2);
  border-color: rgba(107, 90, 224, 0.3);
}
</style>
