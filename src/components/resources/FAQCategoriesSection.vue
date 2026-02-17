<script setup lang="ts">
const categories = [
  {
    title: 'Performance et Stabilité',
    icon: 'mdi-chart-line',
    color: 'primary',
    questions: [
      {
        question: "Entreprise basée à l'international, est-ce vraiment sécurisé ?",
        answer:
          "Notre structure européenne à Londres gère la relation commerciale et contractuelle. Vous bénéficiez d'une approche européenne avec une sécurité juridique totale.",
      },
      {
        question: 'Comment protégez-vous nos données confidentielles ?',
        answer:
          'NDA obligatoire, accès VPN sécurisés, chiffrement bout en bout, conformité RGPD certifiée. Accès limités aux données strictement nécessaires.',
      },
      {
        question: 'Risques juridiques de requalification en salariat ?',
        answer:
          "Contrat d'entreprise à entreprise via notre structure européenne. Relation triangulaire sécurisée, pas de lien direct employeur-employé.",
      },
    ],
  },
  {
    title: 'Sécurité et Conformité',
    icon: 'mdi-shield-check',
    color: 'secondary',
    questions: [
      {
        question: 'Risque de départ soudain comme un freelance classique ?',
        answer:
          "Contrat d'entreprise encadré, suivi actif quotidien, structure organisationnelle stable. Relation d'entreprise, pas individuelle.",
      },
      {
        question: 'Comment garantir la qualité du travail à distance ?',
        answer:
          'Horaires alignés sur les vôtres, outils partagés (Slack/Teams), supervision quotidienne, profils pré-testés et formés.',
      },
      {
        question: 'Que se passe-t-il si ça ne fonctionne pas ?',
        answer:
          "Période d'essai 30 jours incluse. Accompagnement pour ajustements ou recherche d'alternative adaptée selon termes contractuels.",
      },
      {
        question: 'Quelle est votre structure juridique ?',
        answer:
          'Nous opérons via une structure européenne basée à Londres, garantissant une contractualisation sécurisée et une conformité totale avec le droit européen.',
      },
      {
        question: 'Comment protégez-vous nos données ?',
        answer:
          'NDA systématique, accès sécurisés, chiffrement des données et conformité RGPD stricte.',
      },
    ],
  },
  {
    title: 'Coûts et Processus',
    icon: 'mdi-cash',
    color: 'success',
    questions: [
      {
        question: "Pourquoi ne pas recruter directement à l'international ?",
        answer:
          'Nous gérons sourcing expert, vérification légale, encadrement quotidien, conformité et coordination. Vous économisez des mois de complexité.',
      },
      {
        question: 'Délai réaliste de déploiement ?',
        answer:
          'Profils disponibles rapidement grâce à notre réseau pré-qualifié. Délais adaptés selon spécificité du besoin.',
      },
    ],
  },
  {
    title: 'International et Communication',
    icon: 'mdi-earth',
    color: 'info',
    questions: [
      {
        question: 'Barrière de langue avec talents non-francophones ?',
        answer:
          'Sélection selon niveau linguistique requis. Tests préalables obligatoires. Madagascar/Sénégal pour français natif si nécessaire.',
      },
      {
        question: 'Différences culturelles, gestion des horaires ?',
        answer:
          'Formation interculturelle incluse. Horaires alignés sur vos besoins (Europe, Amérique). Encadrement local pour adaptation.',
      },
      {
        question: "Évolutivité de l'équipe selon croissance ?",
        answer:
          'Scaling rapide possible. Ajout/ajustement de profils selon termes contractuels. Nous nous adaptons à vos cycles business.',
      },
    ],
  },
  {
    title: 'Processus de Recrutement',
    icon: 'mdi-account-search',
    color: 'primary',
    questions: [
      {
        question: 'Quel est le délai moyen pour trouver un talent ?',
        answer:
          '3-5 jours ouvrés pour la présentation des premiers profils, grâce à notre réseau pré-qualifié.',
      },
      {
        question: 'Puis-je interviewer les candidats ?',
        answer: 'Bien sûr. Nous organisons les entretiens selon votre disponibilité.',
      },
    ],
  },
  {
    title: 'Management et Suivi',
    icon: 'mdi-account-group',
    color: 'secondary',
    questions: [
      {
        question: 'Comment se passe le management au quotidien ?',
        answer:
          'Chaque talent a un manager local et un référent européen. Double supervision pour une performance optimale.',
      },
      {
        question: 'Que se passe-t-il en cas de problème avec un talent ?',
        answer:
          'Notre équipe intervient immédiatement pour trouver une solution, y compris le remplacement si nécessaire.',
      },
    ],
  },
]
</script>

<template>
  <v-container class="py-10 py-md-16 faq-categories">
    <div
      v-for="(category, categoryIndex) in categories"
      :key="categoryIndex"
      class="faq-category-block mb-10"
    >
      <div class="d-flex align-center ga-3 mb-4">
        <v-avatar :color="category.color" variant="tonal" size="48">
          <v-icon :icon="category.icon" size="24" />
        </v-avatar>
        <h2 class="text-h5 text-md-h4 font-weight-bold faq-category-title">
          {{ category.title }}
        </h2>
      </div>

      <v-expansion-panels variant="accordion" class="faq-questions-panels">
        <v-expansion-panel
          v-for="(item, itemIndex) in category.questions"
          :key="itemIndex"
          class="faq-question-panel"
        >
          <v-expansion-panel-title class="faq-question-title">
            {{ item.question }}
          </v-expansion-panel-title>
          <v-expansion-panel-text class="faq-question-answer">
            {{ item.answer }}
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-container>
</template>

<style scoped>
.faq-categories {
  max-width: 900px;
  margin-inline: auto;
}

.faq-category-block {
  scroll-margin-top: 80px;
}

.faq-category-title {
  color: rgb(var(--v-theme-on-surface));
}

.faq-questions-panels {
  box-shadow: none;
  background: transparent !important;
}

.faq-question-panel {
  margin-bottom: 8px;
  border-radius: 12px !important;
  border: 1px solid rgba(107, 90, 224, 0.15);
  overflow: hidden;
  background: #fff !important;
}

.faq-question-panel :deep(.v-expansion-panel__shadow) {
  display: none;
}

.faq-question-panel :deep(.v-expansion-panel-title),
.faq-question-panel :deep(.v-expansion-panel-text__wrapper) {
  background: #fff !important;
  color: #0b0f19 !important;
}

.faq-question-panel :deep(.v-expansion-panel-title:hover),
.faq-question-panel :deep(.v-expansion-panel-title--active) {
  background: rgba(240, 238, 248, 0.6) !important;
}

.faq-question-panel :deep(.v-expansion-panel-title .v-icon) {
  color: rgb(var(--v-theme-primary)) !important;
}

.faq-question-panel:last-child {
  margin-bottom: 0;
}

.faq-question-panel:hover {
  border-color: rgba(107, 90, 224, 0.3);
}

.faq-question-title {
  font-size: 1rem !important;
  font-weight: 600;
  line-height: 1.4;
  min-height: 56px;
  color: #0b0f19 !important;
}

.faq-question-title :deep(.v-expansion-panel-title__icon) {
  margin-inline-start: auto;
  color: rgb(var(--v-theme-primary)) !important;
}

.faq-question-answer {
  font-size: 0.9375rem;
  line-height: 1.75;
  color: #5b6270 !important;
  padding-top: 0 !important;
}

@media (max-width: 600px) {
  .faq-question-title {
    font-size: 0.9375rem !important;
    min-height: 52px;
  }

  .faq-category-block {
    margin-bottom: 2.5rem;
  }
}
</style>
