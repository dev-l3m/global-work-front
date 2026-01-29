<script setup lang="ts">
import PublicLayout from '@/layouts/PublicLayout.vue'
import { LoginForm } from '@/components/account'
</script>

<template>
  <PublicLayout>
    <div class="login-page">
      <v-container class="py-8 py-md-16">
        <LoginForm />
      </v-container>
    </div>
  </PublicLayout>
</template>

<style scoped>
.login-page {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgba(107, 90, 224, 0.03) 0%,
    rgba(255, 122, 60, 0.03) 50%,
    rgba(107, 90, 224, 0.03) 100%
  );
  position: relative;
  overflow: hidden;
}

.login-page::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(107, 90, 224, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.login-page::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255, 122, 60, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}
</style>
