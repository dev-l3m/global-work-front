import { createRouter, createWebHistory } from 'vue-router'
import { redirectLoggedInToDashboard, requiresAuth, requiresAdmin } from '@/router/guards'
import { adminRoutes } from '@/router/admin.routes'

const routes: import('vue-router').RouteRecordRaw[] = [
  // ——— Public (accueil, pourquoi, témoignages) ———
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/public/LandingView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/pourquoi-global-work-hub',
    name: 'why',
    component: () => import('@/views/public/WhyGlobalWorkHubView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/ce-quon-dit-sur-nous',
    name: 'testimonials',
    component: () => import('@/views/public/TestimonialsView.vue'),
    meta: { layout: 'public' },
  },
  // ——— À propos ———
  {
    path: '/notre-mission',
    name: 'mission',
    component: () => import('@/views/about/MissionView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/notre-methode',
    name: 'methode',
    component: () => import('@/views/about/MethodeView.vue'),
    meta: { layout: 'public' },
  },
  // ——— Services ———
  {
    path: '/recrutement',
    name: 'recrutement',
    component: () => import('@/views/services/RecrutementView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/partage-salarial',
    name: 'partage-salarial',
    component: () => import('@/views/services/PartageSalarialView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/gestion-de-co',
    name: 'gestion-de-co',
    component: () => import('@/views/services/GestionCoView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/rh-et-administratif',
    name: 'rh-admin',
    component: () => import('@/views/services/RHAdminView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/accompagnement-conseil',
    name: 'conseil',
    component: () => import('@/views/services/ConseilView.vue'),
    meta: { layout: 'public' },
  },
  // ——— Ressources (blog, FAQ, légal) ———
  {
    path: '/blog-conseils',
    name: 'blog',
    component: () => import('@/views/resources/BlogView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('@/views/resources/FAQView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/politique-de-confidentialite',
    name: 'privacy',
    component: () => import('@/views/resources/PrivacyView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/conditions-tarification',
    name: 'tarification',
    component: () => import('@/views/resources/TarificationView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/structure-securite',
    name: 'structure',
    component: () => import('@/views/resources/StructureView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/mentions-legales',
    name: 'legal',
    component: () => import('@/views/resources/LegalView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/conditions-generales-utilisation',
    name: 'cgu',
    component: () => import('@/views/resources/CGUView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/politique-de-protection-des-donnees-personnelles',
    name: 'rgpd',
    component: () => import('@/views/resources/RGDPView.vue'),
    meta: { layout: 'public' },
  },
  // ——— Contact ———
  {
    path: '/contactez-nous',
    name: 'contact',
    component: () => import('@/views/contact/ContactView.vue'),
    meta: { layout: 'public' },
  },
  // ——— Auth (connexion / inscription) ———
  {
    path: '/inscription',
    name: 'register',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: { layout: 'public' },
  },
  {
    path: '/connexion',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { layout: 'public' },
  },
  // ——— Tableaux de bord (espaces connectés) ———
  {
    path: '/espace-client',
    name: 'client',
    component: () => import('@/views/dashboard/ClientDashboardView.vue'),
    meta: { requiresAuth: true, role: 'client', layout: 'app' },
  },
  {
    path: '/espace-collaborateur',
    name: 'collaborateur',
    component: () => import('@/views/dashboard/CollaborateurDashboardView.vue'),
    meta: { requiresAuth: true, role: 'collaborateur', layout: 'app' },
  },
  // ——— Admin (backoffice) ———
  ...adminRoutes,
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return new Promise(resolve => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resolve({
              el: to.hash,
              behavior: 'smooth',
              top: 80, // 72px header + 8px (aligné avec scroll-margin-top en style.css)
            })
          })
        })
      })
    }
    return { left: 0, top: 0 }
  },
})

router.beforeEach(to => {
  const loggedInRedirect = redirectLoggedInToDashboard(to)
  if (loggedInRedirect !== true) return loggedInRedirect
  const authResult = requiresAuth(to)
  if (authResult !== true) return authResult
  const adminResult = requiresAdmin(to)
  if (adminResult !== true) return adminResult
  return true
})
