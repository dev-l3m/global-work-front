<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, locale } = useI18n()

const results = computed(() => {
  void locale.value // Pour la réactivité
  const items = tm('testimonials.items') as Array<{
    title: string
    description: string
    highlight: string
  }>
  const icons = ['mdi-chart-line', 'mdi-bullseye-arrow', 'mdi-lightning-bolt', 'mdi-phone-in-talk']
  const iconBgs = ['#6B5AE0', '#FF7A3C', '#2563eb', 'oklch(65% 0.12 290)']

  return items.map((item, index) => ({
    icon: icons[index],
    iconBg: iconBgs[index],
    title: item.title,
    description: item.description,
    highlight: item.highlight,
  }))
})

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
        <div class="text-overline text-primary font-weight-bold mb-2">
          {{ t('testimonials.overline') }}
        </div>
        <h2 class="resultats-title text-h4 text-md-h3 font-weight-bold">
          {{ t('testimonials.title') }}
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
  position: relative;
  overflow: hidden;
  background-image: url('/assets/resultats.webp');
  background-size: 150%;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 50vh;
}

.resultats-section-block::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-color: #e4e3e6;
  z-index: 0;
  opacity: 0.8;
}

.resultats-section-block :deep(.v-container) {
  background: transparent;
  position: relative;
  z-index: 1;
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

.section-header {
  position: relative;
  z-index: 1;
}

.resultat-card {
  background: #ffffff;
  border: 2px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 8px 32px rgba(11, 18, 40, 0.06);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
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
  flex: 1;
}

.resultat-highlight {
  color: #6b5ae0;
  font-weight: 700;
}

.resultat-col {
  display: flex;
  align-items: stretch;
}

.resultat-col :deep(.v-card) {
  width: 100%;
}

@media (max-width: 600px) {
  .resultat-card {
    border-radius: 16px;
    padding: 1.25rem !important;
  }
}
</style>
