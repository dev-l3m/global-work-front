import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore, type UserRole } from '@/stores/auth'

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
      // Simuler un délai d'authentification
      await new Promise(resolve => setTimeout(resolve, 500))

      // Pour le mode démo, on accepte n'importe quel email/mot de passe
      // À remplacer par un appel API réel
      auth.login(email.value.trim(), role.value)

      if (redirect.value) {
        router.push(redirect.value)
        return
      }

      router.push(role.value === 'client' ? '/espace-client' : '/espace-collaborateur')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Une erreur est survenue'
    } finally {
      isLoading.value = false
    }
  }

  function loginWithGoogle() {
    // À implémenter avec l'API Google OAuth
    error.value = 'Connexion Google à implémenter'
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
