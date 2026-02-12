<script setup lang="ts">
const results = [
  {
    icon: 'mdi-chart-line',
    iconBg: '#6B5AE0',
    title: 'Communication et marketing',
    description:
      "Développement de la communication d'une plateforme en ligne avec doublement du chiffre d'affaires en moins d'un an (+2 millions €).",
    highlight: "doublement du chiffre d'affaires en moins d'un an (+2 millions €)",
  },
  {
    icon: 'mdi-bullseye-arrow',
    iconBg: '#FF7A3C',
    title: 'Logistique',
    description:
      'Externalisation complète du back-office logistique avec indicateurs de performance à la clé.',
    highlight: '',
  },
  {
    icon: 'mdi-lightning-bolt',
    iconBg: '#2563eb',
    title: 'Time-to-market',
    description: 'Accélération du time-to-market sur un projet web de 3 mois réduit à 6 semaines.',
    highlight: 'de 3 mois réduit à 6 semaines',
  },
  {
    icon: 'mdi-phone-in-talk',
    iconBg: 'oklch(65% 0.12 290)',
    title: 'Support client',
    description:
      "Réduction de 40% des coûts d'un service support client tout en maintenant la qualité.",
    highlight: 'Réduction de 40% des coûts',
  },
]

function formatDescription(text: string, highlight: string) {
  if (!highlight || !text.includes(highlight)) {
    return [{ type: 'text' as const, value: text }]
  }
  const i = text.indexOf(highlight)
  return [
    { type: 'text' as const, value: text.slice(0, i) },
    { type: 'highlight' as const, value: highlight },
    { type: 'text' as const, value: text.slice(i + highlight.length) },
  ]
}
</script>

<template>
  <section id="resultats" class="resultats-section-block landing-section-anchor">
    <v-container class="py-16">
      <div class="section-header text-center mb-10">
        <div class="text-overline text-primary font-weight-bold mb-2">Résultats</div>
        <h2 class="resultats-title text-h4 text-md-h3 font-weight-bold">
          Ils ont transformé leur croissance avec Global Work Hub
        </h2>
      </div>

      <v-row class="resultats-grid">
        <v-col v-for="(item, index) in results" :key="index" cols="12" md="6" class="resultat-col">
          <v-card
            class="resultat-card pa-6"
            elevation="0"
            rounded="xl"
            :style="{ '--resultat-card-accent': item.iconBg }"
          >
            <div class="resultat-card-header d-flex align-center mb-3">
              <div class="resultat-icon-wrap" :style="{ backgroundColor: item.iconBg }">
                <v-icon :icon="item.icon" size="28" color="white" class="resultat-icon-svg" />
              </div>
              <h3 class="resultat-title text-subtitle-1 font-weight-bold mb-0">
                {{ item.title }}
              </h3>
            </div>
            <p class="resultat-description text-body-2 mb-0">
              <template
                v-for="(part, i) in formatDescription(item.description, item.highlight)"
                :key="i"
              >
                <span v-if="part.type === 'highlight'" class="resultat-highlight">{{
                  part.value
                }}</span>
                <template v-else>{{ part.value }}</template>
              </template>
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.resultats-section-block {
  background: #f0eef8;
  position: relative;
  overflow: hidden;
}

.resultats-section-block::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='%236B5AE0' fill-opacity='1'/%3E%3C/svg%3E");
  background-size: 80px 80px;
}

.resultats-title {
  color: #3b3f4a;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}

.resultats-grid {
  position: relative;
  z-index: 1;
}

.resultat-card {
  background: #ffffff;
  border: 2px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 8px 32px rgba(11, 18, 40, 0.06);
  height: 100%;
  transition:
    box-shadow 0.25s ease,
    transform 0.25s ease,
    border-color 0.25s ease;
}

.resultat-card:hover {
  border-color: var(--resultat-card-accent, #6b5ae0);
  box-shadow: 0 12px 40px rgba(11, 18, 40, 0.1);
  transform: translateY(-2px);
}

.resultat-card-header {
  gap: 18px;
}

.resultat-icon-wrap {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  box-sizing: border-box;
}

.resultat-icon-svg {
  flex-shrink: 0;
}

.resultat-title {
  color: #3b3f4a;
  line-height: 1.3;
}

.resultat-description {
  color: #5b6270;
  line-height: 1.7;
}

.resultat-highlight {
  color: #6b5ae0;
  font-weight: 700;
}

.resultat-col {
  display: flex;
}

@media (max-width: 600px) {
  .resultat-card {
    border-radius: 16px;
    padding: 1.25rem !important;
  }
}
</style>
