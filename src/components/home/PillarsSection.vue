<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, locale } = useI18n()

const column1 = computed(() => {
  void locale.value // Pour la réactivité
  return tm('pillars.column1') as string[]
})

const column2 = computed(() => {
  void locale.value // Pour la réactivité
  return tm('pillars.column2') as string[]
})

const column3 = computed(() => {
  void locale.value // Pour la réactivité
  return tm('pillars.column3') as string[]
})
</script>

<template>
  <section id="piliers" class="pillars-section-block">
    <v-container class="py-16">
      <div class="text-center mb-10" v-reveal="{ variant: 'up', delay: 0 }">
        <h2 class="pillars-title text-white font-weight-bold mb-4">
          {{ t('pillars.title') }}
        </h2>
        <p class="pillars-subtitle text-white">
          {{ t('pillars.subtitle') }}
        </p>
      </div>
      <v-row justify="center" class="pillars-grid">
        <v-col cols="12" md="4" class="d-flex flex-column" v-reveal="{ variant: 'up', delay: 0 }">
          <div v-for="(pillar, i) in column1" :key="`c1-${i}`" class="pillar-item">
            <v-icon icon="mdi-check-circle-outline" color="white" size="24" class="pillar-icon" />
            <span class="text-white">{{ pillar }}</span>
          </div>
        </v-col>
        <v-col cols="12" md="4" class="d-flex flex-column" v-reveal="{ variant: 'up', delay: 90 }">
          <div v-for="(pillar, i) in column2" :key="`c2-${i}`" class="pillar-item">
            <v-icon icon="mdi-check-circle-outline" color="white" size="24" class="pillar-icon" />
            <span class="text-white">{{ pillar }}</span>
          </div>
        </v-col>
        <v-col cols="12" md="4" class="d-flex flex-column" v-reveal="{ variant: 'up', delay: 180 }">
          <div v-for="(pillar, i) in column3" :key="`c3-${i}`" class="pillar-item">
            <v-icon icon="mdi-check-circle-outline" color="white" size="24" class="pillar-icon" />
            <span class="text-white">{{ pillar }}</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.pillars-section-block {
  background: #673ab7;
}

.pillars-title {
  font-size: 2.5rem;
  line-height: 1.2;
}

@media (min-width: 960px) {
  .pillars-title {
    font-size: 3rem;
  }
}

.pillars-subtitle {
  font-size: 1.25rem;
  line-height: 1.5;
  max-width: 720px;
  margin-inline: auto;
}

.pillars-grid {
  max-width: 960px;
  margin-inline: auto;
}

.pillar-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 10px 0;
  font-size: 1rem;
  line-height: 1.5;
}

.pillar-icon {
  flex-shrink: 0;
  margin-top: 2px;
}
</style>
