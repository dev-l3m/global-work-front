<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, locale } = useI18n()

const specialties = computed(() => {
  void locale.value // Pour la réactivité
  const items = tm('specialites.items') as Array<{ title: string; description: string }>
  const icons = [
    'mdi-phone',
    'mdi-cart-outline',
    'mdi-code-tags',
    'mdi-file-document-outline',
    'mdi-palette-outline',
    'mdi-wrench',
  ]
  const iconColors = ['#6B5AE0', '#FF7A3C', 'oklch(55% 0.18 240)', '#2563eb', '#FF7A3C', '#2563eb']

  return items.map((item, index) => ({
    icon: icons[index],
    iconColor: iconColors[index],
    title: item.title,
    description: item.description,
  }))
})
</script>

<template>
  <section id="specialites" class="specialites-section-block landing-section-anchor">
    <v-container class="py-16">
      <div class="section-header text-center mb-10" v-reveal="{ variant: 'up', delay: 0 }">
        <div class="text-overline text-primary font-weight-bold mb-2">
          {{ t('specialites.overline') }}
        </div>
        <h2 class="specialites-title text-h4 text-md-h3 font-weight-bold mb-3">
          {{ t('specialites.title') }}
        </h2>
        <p class="text-body-1 text-medium-emphasis mx-auto" style="max-width: 640px">
          {{ t('specialites.subtitle') }}
        </p>
      </div>

      <v-row>
        <v-col
          v-for="(item, index) in specialties"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          class="specialite-col"
          v-reveal="{ variant: 'up', delay: index * 90 }"
        >
          <v-card class="specialite-card pa-12" elevation="0" rounded="xl">
            <div
              class="specialite-card-inner"
              :style="{ '--specialite-icon-color': item.iconColor }"
            >
              <div class="specialite-icon-wrap">
                <v-avatar size="48" class="specialite-icon" rounded="lg">
                  <v-icon :icon="item.icon" size="48" class="specialite-icon-svg" />
                </v-avatar>
              </div>
              <h3 class="specialite-title text-h6 font-weight-bold mb-2">
                {{ item.title }}
              </h3>
              <p class="specialite-description text-body-2 text-medium-emphasis">
                {{ item.description }}
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.specialites-section-block {
  background: #f0eef8;
  position: relative;
  overflow: hidden;
}

.specialites-title {
  color: #0b0f19;
}

.specialite-card {
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 8px 32px rgba(11, 18, 40, 0.06);
  background: white;
  height: 100%;
  transition:
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.specialite-card:hover {
  box-shadow: 0 12px 40px rgba(11, 18, 40, 0.1);
  transform: translateY(-2px);
}

.specialite-card-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  height: 100%;
}

.specialite-icon-wrap {
  flex-shrink: 0;
}

.specialite-icon-svg {
  color: var(--specialite-icon-color) !important;
}

.specialite-title {
  color: #0b0f19;
  line-height: 1.3;
  margin: 0;
}

.specialite-description {
  color: #5b6270;
  line-height: 1.6;
  margin: 0;
  flex: 1;
}

.specialite-col {
  display: flex;
}

@media (max-width: 600px) {
  .specialite-card {
    border-radius: 16px;
    padding: 1.25rem !important;
  }
}
</style>
