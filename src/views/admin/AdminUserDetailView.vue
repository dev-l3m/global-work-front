<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUser } from '@/api/admin/admin.users.api'
import type { AdminUser } from '@/api/admin/admin.types'
import AdminStatusChip from '@/components/admin/AdminStatusChip.vue'
import { getApiErrorMessage } from '@/utils/api-error'

const route = useRoute()
const router = useRouter()

const user = ref<AdminUser | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const id = computed(() => route.params.id as string)

onMounted(async () => {
  if (!id.value) return
  isLoading.value = true
  error.value = null
  try {
    user.value = await getUser(id.value)
  } catch (err) {
    error.value = getApiErrorMessage(err)
  } finally {
    isLoading.value = false
  }
})

function goBack() {
  router.push({ name: 'admin-users' })
}
</script>

<template>
  <div>
    <v-btn variant="text" color="primary" class="mb-4 text-none" @click="goBack">
      <v-icon icon="mdi-arrow-left" start />
      Retour à la liste
    </v-btn>
    <v-alert v-if="error" type="error" variant="tonal" class="mb-4">
      {{ error }}
    </v-alert>
    <v-skeleton-loader v-if="isLoading" type="article, list-item@3" />
    <v-card v-else-if="user" variant="outlined" class="pa-4 pa-sm-6">
      <h1 class="text-h5 font-weight-bold mb-4">Détail utilisateur</h1>
      <v-row>
        <v-col cols="12" md="6">
          <div class="text-subtitle-2 text-medium-emphasis mb-1">Identité</div>
          <div class="d-flex align-center ga-2 mb-2">
            <span class="font-weight-medium">{{ user.email }}</span>
            <AdminStatusChip v-if="user.status" :status="user.status" />
          </div>
          <div class="text-body-2 mb-1">
            <strong>Rôle :</strong> <v-chip size="small" variant="tonal">{{ user.role }}</v-chip>
          </div>
          <div v-if="user.createdAt" class="text-body-2 text-medium-emphasis">
            Créé le {{ new Date(user.createdAt).toLocaleDateString('fr-FR') }}
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-subtitle-2 text-medium-emphasis mb-1">Organisation</div>
          <div v-if="user.organizationName" class="text-body-2">
            {{ user.organizationName }}
          </div>
          <div v-else class="text-body-2 text-medium-emphasis">—</div>
        </v-col>
      </v-row>
      <v-divider class="my-4" />
      <div class="text-caption text-medium-emphasis">
        Actions admin (changer rôle/statut) à brancher sur les endpoints PATCH si besoin.
      </div>
    </v-card>
    <v-alert v-else type="info" variant="tonal"> Utilisateur introuvable. </v-alert>
  </div>
</template>
