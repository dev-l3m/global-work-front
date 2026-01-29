<script setup lang="ts">
import { ref } from 'vue'

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

const expandedPanels = ref<number[]>([])
</script>

<template>
  <v-container class="py-16">
    <v-expansion-panels v-model="expandedPanels" variant="accordion" multiple>
      <v-expansion-panel
        v-for="(category, categoryIndex) in categories"
        :key="categoryIndex"
        :value="categoryIndex"
        class="faq-panel"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: categoryIndex * 0.1,
          threshold: 0.1,
        }"
      >
        <v-expansion-panel-title>
          <div class="d-flex align-center ga-3">
            <v-avatar :color="category.color" variant="tonal" size="40">
              <v-icon :icon="category.icon" size="20" />
            </v-avatar>
            <span class="text-h6 font-weight-bold">{{ category.title }}</span>
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-expansion-panels variant="accordion" class="mt-2">
            <v-expansion-panel
              v-for="(item, itemIndex) in category.questions"
              :key="itemIndex"
              class="faq-question-panel"
            >
              <v-expansion-panel-title class="text-subtitle-1 font-weight-medium">
                {{ item.question }}
              </v-expansion-panel-title>
              <v-expansion-panel-text
                class="text-body-2 text-medium-emphasis"
                style="line-height: 1.8"
              >
                {{ item.answer }}
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<style scoped>
.faq-panel {
  margin-bottom: 16px;
  border-radius: 12px !important;
  border: 2px solid rgba(107, 90, 224, 0.1);
  overflow: hidden;
}

.faq-panel:hover {
  border-color: rgba(107, 90, 224, 0.3);
}

.faq-question-panel {
  margin-bottom: 8px;
  border-radius: 8px !important;
  border-left: 3px solid rgba(107, 90, 224, 0.2);
}

.faq-question-panel:hover {
  border-left-color: rgba(107, 90, 224, 0.5);
}
</style>
