<script setup lang="ts">
const conditions = [
  {
    title: "Conditions d'engagement",
    icon: 'mdi-handshake',
    color: 'primary',
    items: [
      "Période d'essai : 30 jours pour validation mutuelle",
      'Engagement minimum : 3 mois fermes',
      'Préavis flexible : selon termes contractuels',
      'Ajustements possibles : horaires, missions, outils',
    ],
  },
  {
    title: 'Garanties incluses',
    icon: 'mdi-shield-check',
    color: 'success',
    items: [
      'Support illimité pendant toute la collaboration',
      'Ajustements et optimisations continues',
      'Transparence totale sur les processus',
      'Résiliation possible selon termes contractuels',
    ],
  },
]
</script>

<template>
  <v-container class="py-16">
    <v-row>
      <v-col
        v-for="(condition, index) in conditions"
        :key="index"
        cols="12"
        md="6"
        v-scroll-animation="{
          animation: 'fadeInUp',
          delay: index * 0.15,
          threshold: 0.1,
        }"
      >
        <v-card class="pa-6 condition-card h-100" elevation="3">
          <div class="d-flex align-center ga-3 mb-4">
            <v-avatar :color="condition.color" variant="flat" size="56">
              <v-icon :icon="condition.icon" size="28" color="white" />
            </v-avatar>
            <div class="text-h6 font-weight-bold">{{ condition.title }}</div>
          </div>
          <ul class="condition-list">
            <li
              v-for="(item, itemIndex) in condition.items"
              :key="itemIndex"
              class="text-body-2 text-medium-emphasis"
            >
              {{ item }}
            </li>
          </ul>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.condition-card {
  border-radius: 20px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
}

.condition-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.15);
}

.condition-list {
  padding-left: 1.2rem;
  margin: 0;
  list-style: none;
}

.condition-list li {
  margin-bottom: 12px;
  line-height: 1.7;
  position: relative;
  padding-left: 1rem;
}

.condition-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: rgb(var(--v-theme-success));
  font-weight: bold;
  font-size: 1.2em;
}
</style>
