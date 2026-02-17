import type { RouteLocationNormalized } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

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
