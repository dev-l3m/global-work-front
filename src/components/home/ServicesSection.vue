<script setup lang="ts">
import { ref } from 'vue'

const services = [
  {
    title: 'Recrutement international',
    icon: 'mdi-earth',
    color: 'primary',
    description:
      'Sourcing express de talents pré-qualifiés dans 15+ pays, avec intégration rapide dans vos outils.',
    features: ['Quelques jours', 'Profils pré-qualifiés', '15+ pays'],
  },
  {
    title: 'Partage salarial (EOR)',
    icon: 'mdi-account-cash-outline',
    color: 'secondary',
    description:
      'Contrats clairs, conformité internationale, prise en charge administrative complète.',
    features: ['48h', 'Intégration complète', 'Conformité européenne'],
  },
  {
    title: 'RH & administratif',
    icon: 'mdi-human-male-board',
    color: 'primary',
    description:
      'Suivi opérationnel continu, reporting RH, support juridique permanent pour une collaboration pérenne.',
    features: ['Permanent', 'Reporting mensuel', 'Support dédié'],
  },
  {
    title: 'Gestion de co',
    icon: 'mdi-chart-line-variant',
    color: 'secondary',
    description:
      'Optimisation des coûts, transparence tarifaire, économies significatives vs recrutement local.',
    features: ['-40% vs local', 'Transparence totale', 'Pas de frais cachés'],
  },
  {
    title: 'Accompagnement / Conseil',
    icon: 'mdi-lightbulb-on-outline',
    color: 'primary',
    description:
      'Conseil stratégique RH, accompagnement personnalisé, optimisation de vos processus internationaux.',
    features: ['Sur mesure', 'Expertise dédiée', 'Accompagnement continu'],
  },
]

const hoveredIndex = ref<number | null>(null)
</script>

<template>
  <v-container id="services" class="py-16">
    <div class="text-center mb-12">
      <div class="text-overline text-primary font-weight-bold mb-2">Nos services</div>
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">
        Un recrutement international à 360°
      </div>
      <div class="text-body-1 text-medium-emphasis mx-auto" style="max-width: 700px">
        De la recherche de talents à leur gestion quotidienne : nous pilotons vos ressources
        humaines à l'international. Concentrez-vous sur votre croissance, nous gérons le reste.
      </div>
    </div>

    <v-row>
      <v-col
        v-for="(service, index) in services"
        :key="index"
        cols="12"
        sm="6"
        lg="4"
        class="service-col"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: index * 0.1,
          threshold: 0.1,
        }"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
      >
        <v-card
          class="pa-6 service-card"
          variant="outlined"
          :class="{ 'service-card-hovered': hoveredIndex === index }"
        >
          <div class="d-flex align-center ga-3 mb-4">
            <v-avatar :color="service.color" variant="tonal" size="56">
              <v-icon :icon="service.icon" size="28" />
            </v-avatar>
            <div class="text-h6 font-weight-bold">{{ service.title }}</div>
          </div>
          <div class="text-body-2 text-medium-emphasis mb-4">{{ service.description }}</div>
          <v-divider class="mb-4" />
          <div class="d-flex flex-wrap ga-2">
            <v-chip
              v-for="(feature, idx) in service.features"
              :key="idx"
              size="small"
              :color="service.color"
              variant="tonal"
            >
              {{ feature }}
            </v-chip>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-center mt-8">
      <v-btn
        color="primary"
        size="large"
        class="text-none font-weight-bold"
        prepend-icon="mdi-arrow-right"
        href="/notre-methode"
      >
        Voir tous nos services détaillés
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>
.service-col {
  animation: fadeInUp 0.6s ease-out both;
}

.service-col:nth-child(1) {
  animation-delay: 0.1s;
}

.service-col:nth-child(2) {
  animation-delay: 0.2s;
}

.service-col:nth-child(3) {
  animation-delay: 0.3s;
}

.service-col:nth-child(4) {
  animation-delay: 0.4s;
}

.service-col:nth-child(5) {
  animation-delay: 0.5s;
}

.service-card {
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  border-width: 2px;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  background: linear-gradient(135deg, #6b5ae0 0%, #ff7a3c 100%);
  transition: height 0.4s ease;
  z-index: 0;
}

.service-card-hovered {
  transform: translateY(-12px);
  box-shadow: 0 16px 48px rgba(107, 90, 224, 0.2);
  border-color: #6b5ae0;
}

.service-card-hovered::before {
  height: 4px;
}

.service-card > * {
  position: relative;
  z-index: 1;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
