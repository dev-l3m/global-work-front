<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, locale } = useI18n()

/**
 * Helper pour garantir qu'une valeur est toujours un tableau de strings
 * @param v - Valeur à normaliser (peut être array, string, ou autre)
 * @returns Tableau de strings (jamais vide, jamais une string)
 */
function asStringArray(v: unknown): string[] {
  if (Array.isArray(v)) {
    return v.map(String)
  }
  if (typeof v === 'string') {
    return [v] // Fallback : si c'est une string, la mettre dans un array
  }
  return [] // Fallback : si ce n'est ni array ni string, retourner un array vide
}

const tabs = computed(() => {
  // Utiliser locale.value pour rendre le computed réactif au changement de langue
  void locale.value
  return [
    t('services.tabs.recruitment'),
    t('services.tabs.talentPortage'),
    t('services.tabs.adminManagement'),
    t('services.tabs.accompaniment'),
  ]
})

const activeTab = ref(0)

const tabContents = computed(() => {
  // Utiliser locale.value pour rendre le computed réactif au changement de langue
  void locale.value
  return [
    {
      icon: 'mdi-account-group',
      iconColor: '#6B5AE0',
      subtitle: t('services.tabContents.recruitment.subtitle'),
      paragraph: t('services.tabContents.recruitment.paragraph'),
      bullets: asStringArray(tm('services.tabContents.recruitment.bullets')),
    },
    {
      icon: 'mdi-briefcase-outline',
      iconColor: '#FF7A3C',
      subtitle: t('services.tabContents.talentPortage.subtitle'),
      paragraph: t('services.tabContents.talentPortage.paragraph'),
      bullets: asStringArray(tm('services.tabContents.talentPortage.bullets')),
    },
    {
      icon: 'mdi-file-document-outline',
      iconColor: 'oklch(60% 0.2 240)',
      subtitle: t('services.tabContents.adminManagement.subtitle'),
      paragraph: t('services.tabContents.adminManagement.paragraph'),
      bullets: asStringArray(tm('services.tabContents.adminManagement.bullets')),
    },
    {
      icon: 'mdi-bullseye-arrow',
      iconColor: '#6B5AE0',
      subtitle: t('services.tabContents.accompaniment.subtitle'),
      paragraph: t('services.tabContents.accompaniment.paragraph'),
      bullets: asStringArray(tm('services.tabContents.accompaniment.bullets')),
    },
  ]
})

const currentContent = computed(() => tabContents.value[activeTab.value] ?? tabContents.value[0])
</script>

<template>
  <section id="services" class="services-section-block landing-section-anchor">
    <v-container class="py-16">
      <div class="text-center mb-6" v-reveal="{ variant: 'up', delay: 0 }">
        <div class="text-overline text-primary font-weight-bold mb-2">
          {{ $t('services.overline') }}
        </div>
        <h2 class="services-title text-h4 text-md-h3 font-weight-bold mb-6">
          {{ $t('services.title') }}
        </h2>
        <div class="tabs-row d-flex flex-wrap justify-center gap-3 mb-8">
          <button
            v-for="(tab, idx) in tabs"
            :key="idx"
            type="button"
            class="service-tab"
            :class="{ 'service-tab--active': activeTab === idx }"
            @click="activeTab = idx"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <v-card
        class="services-content-card pa-6 pa-md-8"
        elevation="0"
        v-reveal="{ variant: 'up', delay: 90 }"
      >
        <div
          v-if="currentContent"
          class="card-content-inner"
          :style="{ '--card-icon-color': currentContent.iconColor }"
        >
          <div class="card-icon-wrap">
            <v-avatar size="64" class="card-icon" rounded="lg">
              <v-icon :icon="currentContent.icon" size="32" class="card-icon-svg" />
            </v-avatar>
          </div>
          <div class="card-body">
            <h3 class="card-subtitle text-h6 text-md-h5 font-weight-bold mb-3">
              {{ currentContent.subtitle }}
            </h3>
            <p class="card-paragraph text-body-1 text-medium-emphasis mb-4">
              {{ currentContent.paragraph }}
            </p>
            <ul class="card-bullets">
              <li v-for="(bullet, i) in currentContent.bullets" :key="i" class="bullet-item">
                <v-icon icon="mdi-check-circle" size="22" class="bullet-icon" />
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </div>
        </div>
      </v-card>

      <div class="text-center mt-8" v-reveal="{ variant: 'up', delay: 180 }">
        <v-btn
          color="primary"
          size="large"
          class="text-none font-weight-bold"
          prepend-icon="mdi-arrow-right"
          to="/recrutement"
        >
          {{ $t('services.ctaButton') }}
        </v-btn>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.services-section-block {
  background: #f0eef8;
  position: relative;
  overflow: hidden;
}

.services-title {
  color: #0b0f19;
}

.tabs-row {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 10px;
  background: #f0eef8;
  border-radius: 9999px;
  max-width: 100%;
}

.service-tab {
  padding: 10px 20px;
  border-radius: 9999px;
  border: none;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  background: transparent;
  color: #0b0f19;
  font-family: inherit;
}

.service-tab:hover:not(.service-tab--active) {
  color: #6b5ae0;
}

.service-tab--active {
  background: #6b5ae0;
  color: white;
  box-shadow: 0 2px 12px rgba(107, 90, 224, 0.3);
}

.service-tab--active:hover {
  background: #5a4bc9;
  color: white;
}

.services-content-card {
  border-radius: 28px;
  border-color: #5b6270;
  border: 2px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 10px 40px rgba(11, 18, 40, 0.06);
  background: white;
  max-width: 900px;
  margin: 0 auto;
  overflow: visible;
}

.card-content-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

@media (min-width: 960px) {
  .card-content-inner {
    flex-direction: row;
    align-items: flex-start;
  }
}

.card-icon-wrap {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
}

.card-icon {
  background: color-mix(in srgb, var(--card-icon-color) 18%, white) !important;
}

.card-icon-svg {
  color: var(--card-icon-color) !important;
}

.card-body {
  flex: 1 1 0%;
  min-width: 0;
}

@media (max-width: 959px) {
  .card-body {
    text-align: center;
    width: 100%;
  }
}

.card-subtitle {
  color: #0b0f19;
  line-height: 1.35;
  margin: 0;
}

.card-paragraph {
  color: #5b6270;
  line-height: 1.7;
  margin: 0;
}

.card-bullets {
  list-style: none;
  padding: 0;
  margin: 0;
}

@media (max-width: 959px) {
  .card-bullets {
    margin-left: auto;
    margin-right: auto;
    max-width: fit-content;
    text-align: left;
  }
}

.bullet-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 1rem;
  line-height: 1.6;
  color: #5b6270;
}

.bullet-item:last-child {
  margin-bottom: 0;
}

.bullet-icon {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--card-icon-color) !important;
}

@media (max-width: 600px) {
  .tabs-row {
    padding: 5px 8px;
  }

  .service-tab {
    padding: 8px 14px;
    font-size: 0.875rem;
  }

  .services-content-card {
    border-radius: 24px;
  }
}
</style>
