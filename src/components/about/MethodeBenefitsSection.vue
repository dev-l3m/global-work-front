<script setup lang="ts">
const benefits = [
  {
    icon: 'mdi-lightning-bolt',
    title: 'Rapidité',
    description: 'Déploiement accéléré au lieu de processus interminables',
    color: 'secondary',
  },
  {
    icon: 'mdi-chart-timeline-variant',
    title: 'Performance',
    description: 'Suivi quotidien, objectifs clairs',
    color: 'primary',
  },
  {
    icon: 'mdi-cog',
    title: 'Flexibilité',
    description: 'Adaptation selon vos besoins évolutifs',
    color: 'success',
  },
]

const features = [
  {
    icon: 'mdi-magnify',
    title: 'Recrutement sur-mesure',
    description:
      'Nous sélectionnons pour vous des profils qualifiés, engagés et déjà immatriculés, pour des missions parfaitement cadrées, à temps plein ou partiel.',
  },
  {
    icon: 'mdi-clock-fast',
    title: 'Gagnez en efficacité',
    description:
      'Divisez par trois le temps consacré au recrutement et à la gestion RH. Nous nous occupons de tout : sélection, contractualisation, encadrement.',
  },
  {
    icon: 'mdi-cash',
    title: 'Maîtrisez vos coûts',
    description:
      'Réduisez significativement vos charges fixes grâce à des talents internationaux facturant au juste prix, sans concession sur la qualité.',
  },
]
</script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-10">
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">Notre solution</div>
    </div>

    <v-row class="mb-12">
      <v-col
        v-for="(benefit, index) in benefits"
        :key="index"
        cols="12"
        md="4"
        v-scroll-animation="{
          animation: 'scaleIn',
          delay: index * 0.15,
          threshold: 0.1,
        }"
      >
        <v-card class="pa-6 benefit-card" variant="tonal" :color="benefit.color" elevation="2">
          <v-avatar :color="benefit.color" variant="flat" size="56" class="mb-4">
            <v-icon :icon="benefit.icon" size="28" color="white" />
          </v-avatar>
          <div class="text-h6 font-weight-bold mb-2">{{ benefit.title }}</div>
          <div class="text-body-2 text-medium-emphasis">{{ benefit.description }}</div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="(feature, index) in features"
        :key="index"
        cols="12"
        md="4"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: index * 0.15,
          threshold: 0.1,
        }"
      >
        <v-card class="pa-6 feature-card" variant="outlined" elevation="2">
          <v-avatar color="primary" variant="tonal" size="56" class="mb-4">
            <v-icon :icon="feature.icon" size="28" />
          </v-avatar>
          <div class="text-h6 font-weight-bold mb-3">{{ feature.title }}</div>
          <div class="text-body-2 text-medium-emphasis" style="line-height: 1.7">
            {{ feature.description }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.benefit-card {
  border-radius: 20px;
  transition: all 0.3s ease;
  height: 100%;
  text-align: center;
}

.benefit-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}

.feature-card {
  border-radius: 20px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}
</style>
