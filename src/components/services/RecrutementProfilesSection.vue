<script setup lang="ts">
const profiles = [
  {
    title: 'IT et technique',
    icon: 'mdi-code-tags',
    color: 'primary',
    description: 'Développeurs, ingénieurs, architectes techniques et experts IT.',
  },
  {
    title: 'Marketing et e-commerce',
    icon: 'mdi-chart-line',
    color: 'secondary',
    description: 'Spécialistes marketing digital, e-commerce, SEO et communication.',
  },
  {
    title: 'Support client et administration',
    icon: 'mdi-headset',
    color: 'success',
    description: 'Agents de support, assistants administratifs et gestionnaires.',
  },
]
</script>

<template>
  <v-container class="py-16">
    <div class="text-center mb-10">
      <div class="text-h4 text-md-h3 font-weight-bold mb-4">Types de profils</div>
    </div>

    <v-row>
      <v-col
        v-for="(profile, index) in profiles"
        :key="index"
        cols="12"
        md="4"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: index * 0.15,
          threshold: 0.1,
        }"
      >
        <v-card class="pa-6 profile-card" variant="outlined" elevation="2">
          <div class="text-center mb-4">
            <v-avatar :color="profile.color" variant="tonal" size="64">
              <v-icon :icon="profile.icon" size="32" />
            </v-avatar>
          </div>
          <div class="text-h6 font-weight-bold text-center mb-3">{{ profile.title }}</div>
          <div class="text-body-2 text-medium-emphasis text-center" style="line-height: 1.7">
            {{ profile.description }}
          </div>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-center mt-10">
      <v-btn
        color="primary"
        size="large"
        class="text-none font-weight-bold recrutement-cta-btn"
        prepend-icon="mdi-send"
        :to="{ path: '/', hash: '#contact' }"
      >
        Soumettez votre recherche de talents
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>
.profile-card {
  border-radius: 20px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
  height: 100%;
}

.profile-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}

@media (max-width: 599px) {
  .recrutement-cta-btn {
    font-size: 0.875rem !important;
  }
}
</style>
