<script setup lang="ts">
const steps = [
  {
    number: '1.',
    title: 'Audit et cadrage stratégique',
    description:
      "Avant de chercher, nous analysons. Notre collaboration débute par un audit approfondi de votre besoin. Nous ne nous contentons pas d'une fiche de poste. Nous définissons avec vous les contours de la mission, votre culture d'entreprise, les outils à maîtriser et les indicateurs clés de performance (KPIs). Cette étape cruciale garantit un alignement parfait et un ciblage ultra-précis.",
    icon: 'mdi-clipboard-text-search',
    color: 'primary',
  },
  {
    number: '2.',
    title: 'Sourcing mondial et sélection des meilleurs candidats',
    description:
      'Grâce à notre expertise des viviers de talents internationaux, nous activons un <strong>processus de recrutement</strong> proactif. Nous allons chercher les profils là où ils excellent. Notre sélection est drastique :',
    items: [
      '<strong>Validation technique :</strong> Tests de compétences et mises en situation.',
      '<strong>Entretiens comportementaux :</strong> Évaluation des "soft skills", de l\'autonomie et de l\'engagement.',
      '<strong>Vérification :</strong> Contrôle systématique des références et du parcours. Seuls les candidats qui répondent à 100% de vos exigences techniques et humaines vous sont présentés.',
    ],
    icon: 'mdi-account-search',
    color: 'secondary',
  },
  {
    number: '3.',
    title: 'Intégration (Onboarding) pilotée',
    description:
      'C\'est ici que notre valeur ajoutée devient décisive. Nous ne vous "livrons" pas un contact. Nous co-pilotons l\'intégration du talent : configuration des outils, présentation aux équipes, clarification des objectifs et mise en place des rituels de communication. Nous nous assurons que votre nouveau collaborateur est opérationnel et parfaitement intégré dès le premier jour.',
    icon: 'mdi-rocket-launch',
    color: 'success',
  },
  {
    number: '4.',
    title: 'Gestion et accompagnement RH continu',
    description:
      "Notre mission ne s'arrête pas à la signature. Elle commence. Pour garantir la <strong>stabilité</strong> et la performance, nous assurons un <strong>accompagnement RH</strong> permanent :",
    items: [
      '<strong>Suivi managérial :</strong> Points hebdomadaires, suivi des objectifs et gestion de la motivation.',
      '<strong>Gestion administrative :</strong> Nous gérons la contractualisation, la facturation et la conformité légale.',
      "<strong>Prévention du turnover :</strong> En tant qu'employeur et manager RH, nous sommes le point de contact privilégié du talent. Nous anticipons les risques de départ et assurons la médiation, garantissant une relation de travail saine et durable.",
    ],
    icon: 'mdi-chart-line',
    color: 'info',
  },
]
</script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-12">
      <div class="text-overline text-primary font-weight-bold mb-2">SOURCING INTERNATIONAL</div>
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">
        Le processus Global Work Hub : 4 étapes-clés pour la stabilité et la performance
      </div>
      <div
        class="text-body-1 text-medium-emphasis mx-auto"
        style="max-width: 800px; line-height: 1.8"
      >
        Nous avons modélisé une méthode qui couvre l'intégralité du cycle de vie du talent, partant
        de la définition de votre besoin jusqu'à à son pilotage opérationnel.
      </div>
    </div>

    <v-row>
      <v-col
        v-for="(step, index) in steps"
        :key="index"
        cols="12"
        md="6"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: index * 0.15,
          threshold: 0.1,
        }"
      >
        <v-card class="pa-6 process-card" variant="outlined" elevation="2">
          <div class="d-flex align-center ga-3 mb-4">
            <v-avatar :color="step.color" variant="tonal" size="56">
              <v-icon :icon="step.icon" size="28" />
            </v-avatar>
            <div>
              <div class="text-overline text-primary font-weight-bold mb-1">
                SOURCING INTERNATIONAL
              </div>
              <div class="text-h6 font-weight-bold">{{ step.number }} {{ step.title }}</div>
            </div>
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div
            class="text-body-1 text-medium-emphasis mb-3"
            style="line-height: 1.8"
            v-html="step.description"
          />
          <ul v-if="step.items" class="text-body-2 text-medium-emphasis process-list">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <li v-for="(item, itemIndex) in step.items" :key="itemIndex" v-html="item" />
          </ul>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.process-card {
  border-radius: 20px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
  height: 100%;
}

.process-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}

.process-list {
  padding-left: 1.2rem;
  margin: 0;
  list-style: none;
}

.process-list li {
  margin-bottom: 8px;
  line-height: 1.7;
  position: relative;
  padding-left: 1rem;
}

.process-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
  font-size: 1.2em;
}
</style>
