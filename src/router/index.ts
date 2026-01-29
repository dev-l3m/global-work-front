import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/LandingView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/pourquoi-global-work-hub',
    name: 'why',
    component: () => import('@/views/WhyGlobalWorkHubView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/ce-quon-dit-sur-nous',
    name: 'testimonials',
    component: () => import('@/views/TestimonialsView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/notre-mission',
    name: 'mission',
    component: () => import('@/views/MissionView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/notre-methode',
    name: 'methode',
    component: () => import('@/views/MethodeView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/recrutement',
    name: 'recrutement',
    component: () => import('@/views/RecrutementView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/partage-salarial',
    name: 'partage-salarial',
    component: () => import('@/views/PartageSalarialView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/gestion-de-co',
    name: 'gestion-de-co',
    component: () => import('@/views/GestionCoView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/rh-et-administratif',
    name: 'rh-admin',
    component: () => import('@/views/RHAdminView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/accompagnement-conseil',
    name: 'conseil',
    component: () => import('@/views/ConseilView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/blog-conseils',
    name: 'blog',
    component: () => import('@/views/BlogView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('@/views/FAQView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/politique-de-confidentialite',
    name: 'privacy',
    component: () => import('@/views/PrivacyView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/conditions-tarification',
    name: 'tarification',
    component: () => import('@/views/TarificationView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/structure-securite',
    name: 'structure',
    component: () => import('@/views/StructureView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/mentions-legales',
    name: 'legal',
    component: () => import('@/views/LegalView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/conditions-generales-utilisation',
    name: 'cgu',
    component: () => import('@/views/CGUView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/politique-de-protection-des-donnees-personnelles',
    name: 'rgpd',
    component: () => import('@/views/RGDPView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/contactez-nous',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/inscription',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/connexion',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/espace-client',
    name: 'client',
    component: () => import('@/views/ClientDashboardView.vue'),
    meta: { requiresAuth: true, role: 'client', layout: 'app' },
  },
  {
    path: '/espace-collaborateur',
    name: 'collaborateur',
    component: () => import('@/views/CollaborateurDashboardView.vue'),
    meta: { requiresAuth: true, role: 'collaborateur', layout: 'app' },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

function isAuthorized(to: RouteLocationNormalized) {
  const auth = useAuthStore()
  const requiresAuth = Boolean(to.meta.requiresAuth)
  const requiredRole = (to.meta.role as string | undefined) ?? undefined

  if (!requiresAuth) return true
  if (!auth.isAuthenticated) return false
  if (!requiredRole) return true
  return auth.role === requiredRole
}

router.beforeEach(to => {
  if (isAuthorized(to)) return true

  return {
    name: 'login',
    query: { redirect: to.fullPath },
  }
})
