<script setup lang="ts">
const services = [
  {
    title: 'Recrutement et intégration',
    icon: 'mdi-account-plus',
    color: 'primary',
    description:
      "Nous gérons tout le processus de recrutement et d'intégration de vos talents internationaux.",
  },
  {
    title: 'Gestion des contrats et paie',
    icon: 'mdi-file-document-multiple',
    color: 'secondary',
    description:
      'Prise en charge complète de la contractualisation et de la gestion de la paie selon les standards internationaux.',
  },
  {
    title: 'Suivi juridique et conformité',
    icon: 'mdi-shield-check',
    color: 'success',
    description: 'Assurance de la conformité légale dans tous les pays où opèrent vos talents.',
  },
  {
    title: 'Reporting et KPI opérationnels',
    icon: 'mdi-chart-line',
    color: 'info',
    description:
      'Tableaux de bord et rapports réguliers pour suivre la performance de vos équipes.',
  },
]
</script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-12">
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">Services proposés</div>
      <div class="text-body-1 text-medium-emphasis mx-auto" style="max-width: 700px">
        Une gamme complète de services RH et administratifs pour simplifier la gestion de vos
        talents internationaux
      </div>
    </div>

    <v-row>
      <v-col
        v-for="(service, index) in services"
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
        <v-card class="pa-6 service-card h-100" elevation="3">
          <div class="text-center mb-4">
            <v-avatar :color="service.color" variant="flat" size="72" class="mb-4">
              <v-icon :icon="service.icon" size="36" color="white" />
            </v-avatar>
            <div class="text-h6 font-weight-bold mb-3">{{ service.title }}</div>
            <div class="text-body-2 text-medium-emphasis" style="line-height: 1.6">
              {{ service.description }}
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.service-card {
  border-radius: 24px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(135deg, rgba(107, 90, 224, 0.2), rgba(255, 122, 60, 0.2)) border-box;
}

.service-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 20px 60px rgba(107, 90, 224, 0.2);
  border-color: rgba(107, 90, 224, 0.4);
}
</style>
