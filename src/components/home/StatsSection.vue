<script setup lang="ts">
import { onMounted, ref } from 'vue'

const stats = [
  {
    label: 'Talents déployés',
    value: '200+',
    description: 'Profils internationaux accompagnés en 2024.',
    color: 'primary',
    icon: 'mdi-account-group',
  },
  {
    label: 'Pays actifs',
    value: '15+',
    description: 'Un vivier mondial de talents qualifiés.',
    color: 'secondary',
    icon: 'mdi-earth',
  },
  {
    label: 'Satisfaction',
    value: '98%',
    description: 'Taux de satisfaction client sur nos missions.',
    color: 'success',
    icon: 'mdi-star',
  },
]

const animatedValues = ref<Record<string, string>>({})

onMounted(() => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stats.forEach(stat => {
            animateValue(stat.value, stat.label)
          })
          observer.disconnect()
        }
      })
    },
    { threshold: 0.3 }
  )

  const element = document.getElementById('stats-section')
  if (element) {
    observer.observe(element)
  }
})

function animateValue(value: string, key: string) {
  const numericValue = parseInt(value.replace(/\D/g, ''))
  if (isNaN(numericValue)) {
    animatedValues.value[key] = value
    return
  }

  const duration = 2000
  const start = 0
  const increment = numericValue / (duration / 16)
  let current = start

  const timer = setInterval(() => {
    current += increment
    if (current >= numericValue) {
      animatedValues.value[key] = value
      clearInterval(timer)
    } else {
      animatedValues.value[key] = Math.floor(current) + (value.includes('+') ? '+' : '')
    }
  }, 16)
}
</script>

<template>
  <v-container id="stats-section" class="py-8">
    <v-row no-gutters class="stats-row">
      <v-col
        v-for="(stat, index) in stats"
        :key="index"
        cols="12"
        md="4"
        :class="['pr-md-4 mb-4 mb-md-0', { 'stats-card': true }]"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <v-card
          class="pa-6 stats-card-inner"
          :variant="index === 0 ? 'tonal' : 'outlined'"
          :color="index === 0 ? stat.color : undefined"
        >
          <div class="d-flex align-center ga-3 mb-3">
            <v-avatar :color="stat.color" variant="tonal" size="48">
              <v-icon :icon="stat.icon" size="24" />
            </v-avatar>
            <div class="text-overline font-weight-bold">{{ stat.label }}</div>
          </div>
          <div class="text-h3 font-weight-bold mt-2 stats-value">
            {{ (animatedValues[stat.label] as string) || stat.value }}
          </div>
          <div class="text-body-2 text-medium-emphasis mt-2">{{ stat.description }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.stats-row {
  margin-top: -60px;
  position: relative;
  z-index: 2;
}

.stats-card {
  /* Animation gérée par v-scroll-animation */
}

.stats-card-inner {
  border-radius: 20px;
  transition: all 0.3s ease;
  height: 100%;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
}

.stats-card-inner:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.stats-value {
  background: linear-gradient(135deg, #6b5ae0 0%, #ff7a3c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (max-width: 960px) {
  .stats-row {
    margin-top: 0;
  }
}
</style>
