<script setup lang="ts">
import AdminShell from '@/components/admin/AdminShell.vue'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import AdminTopbar from '@/components/admin/AdminTopbar.vue'
</script>

<template>
  <AdminShell>
    <AdminSidebar />
    <v-main>
      <AdminTopbar />
      <v-container fluid class="pa-4 pa-md-6">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>
  </AdminShell>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
