import type { RouteLocationNormalized } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { supportedLocales, defaultLocale, setLocale } from '@/plugins/i18n'
import { getLocaleFromPath, removeLocaleFromPath, addLocaleToPath } from '@/router/i18n-routes'

/** Si déjà connecté et qu'il va sur la page de connexion, rediriger vers son dashboard. */
export function redirectLoggedInToDashboard(
  to: RouteLocationNormalized
): boolean | { path: string } {
  if (to.name !== 'login') return true
  const auth = useAuthStore()
  const { isAuthenticated, role } = storeToRefs(auth)
  if (!isAuthenticated.value) return true
  if (role.value === 'admin') return { path: '/admin' }
  if (role.value === 'collaborateur') return { path: '/espace-collaborateur' }
  return { path: '/espace-client' }
}

export function requiresAuth(
  to: RouteLocationNormalized
): boolean | { name: string; query?: { redirect: string } } {
  const auth = useAuthStore()
  const { isAuthenticated, role } = storeToRefs(auth)
  const needsAuth = Boolean(to.meta.requiresAuth)

  if (!needsAuth) return true
  if (!isAuthenticated.value) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  const requiredRole = to.meta.role as string | undefined
  if (!requiredRole) return true
  if (role.value !== requiredRole) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  return true
}

/** Admin routes: only role === 'admin'. Non-authenticated => login; authenticated but not admin => home. */
export function requiresAdmin(
  to: RouteLocationNormalized
): boolean | { name: string; query?: { redirect: string } } {
  const auth = useAuthStore()
  const { isAuthenticated, role } = storeToRefs(auth)
  const isAdminRoute = to.path.startsWith('/admin')

  if (!isAdminRoute) return true
  if (!isAuthenticated.value) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (role.value !== 'admin') {
    return { name: 'landing' }
  }
  return true
}

/**
 * Guard pour gérer les locales dans les routes
 * - Redirige / vers /fr (ou locale par défaut)
 * - Valide que la locale dans l'URL est supportée
 * - Synchronise la locale i18n avec la route
 * - Exclut les routes admin et dashboard (pas de préfixe de locale)
 */
export function localeGuard(to: RouteLocationNormalized): boolean | { path: string } {
  // Exclure les routes admin et dashboard (pas de préfixe de locale)
  if (
    to.path.startsWith('/admin') ||
    to.path.startsWith('/espace-client') ||
    to.path.startsWith('/espace-collaborateur')
  ) {
    return true
  }

  // Si c'est la racine, rediriger vers la locale par défaut
  if (to.path === '/') {
    return { path: `/${defaultLocale}` }
  }

  // Extraire la locale de l'URL
  const localeFromPath = getLocaleFromPath(to.path)

  // Si une locale est trouvée dans le chemin
  if (localeFromPath) {
    // Vérifier qu'elle est supportée
    if (!supportedLocales.includes(localeFromPath)) {
      // Si la locale n'est pas supportée, rediriger vers la locale par défaut
      const pathWithoutLocale = removeLocaleFromPath(to.path)
      const defaultPath = addLocaleToPath(pathWithoutLocale, defaultLocale)
      return { path: `${defaultPath}${to.hash || ''}` }
    }

    // Synchroniser la locale i18n avec la route
    setLocale(localeFromPath)
    // Laisser passer la route - le router vérifiera si elle existe
    // Le guard s'exécute avant la résolution de la route, donc on doit laisser passer
    // et laisser le router gérer la résolution
    return true
  }

  // Si aucune locale n'est trouvée, rediriger vers la version localisée par défaut
  // Cela permet d'accéder à /recrutement qui sera redirigé vers /fr/recrutement
  const defaultPath = addLocaleToPath(to.path, defaultLocale)
  return { path: `${defaultPath}${to.hash || ''}` }
}
