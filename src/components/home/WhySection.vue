<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const cards = computed(() => [
  {
    title: t('why.cards.one.title'),
    body: t('why.cards.one.body'),
  },
  {
    title: t('why.cards.two.title'),
    body: t('why.cards.two.body'),
  },
  {
    title: t('why.cards.three.title'),
    body: t('why.cards.three.body'),
  },
])
</script>

<template>
  <section id="pourquoi" class="why-section-block landing-section-anchor">
    <v-container class="py-16">
      <div class="section-header text-center mb-10" v-reveal="{ variant: 'up', delay: 0 }">
        <div class="text-overline text-primary font-weight-bold mb-2">{{ $t('why.overline') }}</div>
        <h2 class="text-h4 text-md-h3 font-weight-bold mb-3">{{ $t('why.title') }}</h2>
        <p class="text-body-1 text-medium-emphasis mx-auto" style="max-width: 640px">
          {{ $t('why.subtitle') }}
        </p>
      </div>

      <v-row>
        <v-col
          v-for="(item, index) in cards"
          :key="index"
          cols="12"
          md="4"
          class="comparison-col"
          v-reveal="{ variant: 'up', delay: index * 90 }"
        >
          <v-card
            :class="['pa-6 comparison-card', `comparison-card--${index}`]"
            variant="outlined"
            elevation="0"
          >
            <div class="text-h6 font-weight-bold mb-4">{{ item.title }}</div>
            <p class="comparison-body text-body-2 text-medium-emphasis">{{ item.body }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.why-section-block {
  background: linear-gradient(
    180deg,
    rgba(240, 238, 248, 0.6) 0%,
    rgba(255, 255, 255, 0.9) 30%,
    rgba(240, 238, 248, 0.5) 100%
  );
}

.comparison-card {
  border-radius: 20px;
  transition: all 0.3s ease;
  height: 100%;
  border-width: 2px;
  background: white !important;
  border-color: rgba(0, 0, 0, 0.12);
}

.comparison-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.comparison-card--0:hover {
  border-color: #6b5ae0 !important;
}

.comparison-card--1:hover {
  border-color: #ff7a3c !important;
}

.comparison-card--2:hover {
  border-color: oklch(60% 0.2 240) !important;
}

@supports not (color: oklch(0.5 0.2 0)) {
  .comparison-card--2:hover {
    border-color: #4a7ae0 !important;
  }
}

.comparison-body {
  line-height: 1.7;
  margin: 0;
}
</style>
