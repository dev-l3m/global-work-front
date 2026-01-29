<script setup lang="ts">
const structureItems = [
  {
    title: 'Tarif mensuel fixe selon profil et compétences',
    icon: 'mdi-currency-eur',
    color: 'primary',
  },
  {
    title: 'Paiement mensuel ou trimestriel selon préférence',
    icon: 'mdi-calendar-clock',
    color: 'secondary',
  },
  {
    title: 'Tous frais inclus : recrutement, formation, suivi',
    icon: 'mdi-check-circle',
    color: 'success',
  },
  {
    title: 'Devis personnalisé sous 24h',
    icon: 'mdi-file-document-edit',
    color: 'info',
  },
]
</script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-12">
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">Structure Tarifaire</div>
    </div>

    <v-row>
      <v-col
        v-for="(item, index) in structureItems"
        :key="index"
        cols="12"
        sm="6"
        md="3"
        v-scroll-animation="{
          animation: 'scaleIn',
          delay: index * 0.1,
          threshold: 0.1,
        }"
      >
        <v-card class="pa-6 structure-card h-100" elevation="2">
          <div class="text-center">
            <v-avatar :color="item.color" variant="flat" size="64" class="mb-4">
              <v-icon :icon="item.icon" size="32" color="white" />
            </v-avatar>
            <div class="text-subtitle-2 font-weight-bold" style="line-height: 1.5">
              {{ item.title }}
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.structure-card {
  border-radius: 20px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
}

.structure-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}
</style>
