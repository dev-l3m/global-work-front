<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section id="cta-final" class="cta-section-block">
    <v-container class="py-16">
      <div class="text-center mb-8" v-reveal="{ variant: 'up', delay: 0 }">
        <h2 class="text-h4 text-md-h3 font-weight-bold mb-3">
          {{ t('cta.title') }}
        </h2>
        <p class="text-body-1 text-medium-emphasis mx-auto mb-6" style="max-width: 560px">
          {{ t('cta.subtitle') }}
        </p>
        <div class="d-flex flex-wrap justify-center ga-3">
          <span v-reveal="{ variant: 'up', delay: 160 }">
            <v-btn color="primary" size="large" class="text-none font-weight-bold" href="#contact">
              <v-icon icon="mdi-calendar-clock" start />
              {{ t('cta.buttonSchedule') }}
            </v-btn>
          </span>
          <span v-reveal="{ variant: 'up', delay: 260 }">
            <v-btn
              variant="outlined"
              color="primary"
              size="large"
              class="text-none font-weight-medium"
              href="#contact"
            >
              <v-icon icon="mdi-file-document-outline" start />
              {{ t('cta.buttonDownload') }}
            </v-btn>
          </span>
        </div>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.cta-section-block {
  background: rgba(107, 90, 224, 0.06);
  border-top: 1px solid rgba(107, 90, 224, 0.1);
}
</style>
