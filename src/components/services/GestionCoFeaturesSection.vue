<script setup lang="ts">
const services = [
  {
    title: 'Suivi des missions et reporting',
    icon: 'mdi-chart-timeline-variant',
    color: 'primary',
  },
  {
    title: 'Gestion administrative des contrats',
    icon: 'mdi-file-document-edit',
    color: 'secondary',
  },
  {
    title: 'Coordination multi-pays et multi-équipes',
    icon: 'mdi-earth',
    color: 'success',
  },
]

const benefits = [
  {
    title: 'Réduction du temps consacré aux tâches administratives',
    icon: 'mdi-clock-fast',
    color: 'primary',
  },
  {
    title: 'Reporting précis et régulier',
    icon: 'mdi-chart-box',
    color: 'secondary',
  },
  {
    title: 'Optimisation des flux opérationnels',
    icon: 'mdi-cog',
    color: 'success',
  },
]
</script>

<template>
  <v-container class="py-16">
    <v-row>
      <v-col cols="12" md="6">
        <div class="text-center mb-8">
          <div class="text-h5 font-weight-bold mb-6">Nos services</div>
        </div>
        <v-row>
          <v-col
            v-for="(service, index) in services"
            :key="index"
            cols="12"
            v-scroll-animation="{
              animation: 'fadeInUp',
              delay: index * 0.15,
              threshold: 0.1,
            }"
          >
            <v-card class="pa-4 service-card" variant="outlined" elevation="2">
              <div class="d-flex align-center ga-3">
                <v-avatar :color="service.color" variant="tonal" size="48">
                  <v-icon :icon="service.icon" size="24" />
                </v-avatar>
                <div class="text-subtitle-2 font-weight-bold">{{ service.title }}</div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <div class="text-center mb-8">
          <div class="text-h5 font-weight-bold mb-6">Bénéfices</div>
        </div>
        <v-row>
          <v-col
            v-for="(benefit, index) in benefits"
            :key="index"
            cols="12"
            v-scroll-animation="{
              animation: 'fadeInUp',
              delay: index * 0.15,
              threshold: 0.1,
            }"
          >
            <v-card class="pa-4 benefit-card" variant="tonal" color="primary" elevation="2">
              <div class="d-flex align-center ga-3">
                <v-avatar :color="benefit.color" variant="flat" size="48">
                  <v-icon :icon="benefit.icon" size="24" color="white" />
                </v-avatar>
                <div class="text-subtitle-2 font-weight-bold">{{ benefit.title }}</div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <div class="text-center mt-10">
      <v-btn
        color="primary"
        size="large"
        class="text-none font-weight-bold gestion-cta-btn"
        prepend-icon="mdi-arrow-right"
        to="/contactez-nous"
      >
        Découvrez nos solutions de gestion
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>
.service-card {
  border-radius: 16px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateX(8px);
  box-shadow: 0 8px 24px rgba(107, 90, 224, 0.15);
}

.benefit-card {
  border-radius: 16px;
  border-left: 4px solid rgb(var(--v-theme-secondary));
  transition: all 0.3s ease;
}

.benefit-card:hover {
  transform: translateX(8px);
  box-shadow: 0 8px 24px rgba(255, 122, 60, 0.15);
}

@media (max-width: 599px) {
  .gestion-cta-btn {
    font-size: 0.875rem !important;
  }
}
</style>
