import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore, type UserRole } from '@/stores/auth'
import { getApiErrorMessage } from '@/utils/api-error'

export function useLogin() {
  const auth = useAuthStore()
  const route = useRoute()
  const router = useRouter()

  const role = ref<UserRole>((route.query.role as UserRole) || 'client')
  const email = ref('')
  const password = ref('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const redirect = computed(() => (route.query.redirect as string | undefined) ?? undefined)

  const isValid = computed(() => {
    return email.value.trim().length > 0 && password.value.length > 0
  })

  async function submit() {
    if (!isValid.value) {
      error.value = 'Veuillez remplir tous les champs'
      return
    }

    error.value = null
    isLoading.value = true

    try {
      await auth.login(email.value.trim(), password.value, role.value)
      // Redirection selon le rôle renvoyé par l'API (et vu par le guard) pour accéder au bon dashboard
      const userRole = auth.role
      if (redirect.value) {
        router.push(redirect.value)
        return
      }
      if (userRole === 'admin') {
        router.push('/admin')
      } else if (userRole === 'collaborateur') {
        router.push('/espace-collaborateur')
      } else {
        router.push('/espace-client')
      }
    } catch (err) {
      error.value = getApiErrorMessage(err)
    } finally {
      isLoading.value = false
    }
  }

  function loginWithGoogle() {
    // Ouvrir le dialog "en cours de développement" (géré dans LoginForm)
  }

  function clearError() {
    error.value = null
  }

  return {
    role,
    email,
    password,
    isLoading,
    error,
    isValid,
    submit,
    loginWithGoogle,
    clearError,
  }
}
