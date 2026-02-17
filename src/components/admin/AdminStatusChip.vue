<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    status: string
    /** Map status -> color. Defaults for common admin statuses. */
    colorMap?: Record<string, string>
  }>(),
  {
    colorMap: () => ({
      active: 'success',
      pending: 'warning',
      blocked: 'error',
      en_cours: 'primary',
      brouillon: 'default',
      validee: 'success',
      refusee: 'error',
      terminee: 'success',
      done: 'success',
      paused: 'warning',
    }),
  }
)

const color = computed(() => props.colorMap[props.status] ?? 'default')
const label = computed(() => {
  const s = props.status
  if (s === 'en_cours') return 'En cours'
  if (s === 'validee') return 'Validée'
  if (s === 'refusee') return 'Refusée'
  if (s === 'terminee') return 'Terminée'
  if (s === 'brouillon') return 'Brouillon'
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ')
})
</script>

<template>
  <v-chip :color="color" variant="tonal" size="small" class="text-none">
    {{ label }}
  </v-chip>
</template>
