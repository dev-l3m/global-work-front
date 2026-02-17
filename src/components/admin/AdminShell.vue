<script setup lang="ts"></script>

<template>
  <v-app class="admin-shell">
    <slot />
  </v-app>
</template>

<style scoped>
.admin-shell {
  background: rgb(var(--v-theme-surface));
  min-height: 100vh;
}
</style>
