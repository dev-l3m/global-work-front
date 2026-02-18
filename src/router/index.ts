import { createRouter, createWebHistory } from 'vue-router'
import { useHead } from '@unhead/vue'
import {
  redirectLoggedInToDashboard,
  requiresAuth,
  requiresAdmin,
  localeGuard,
} from '@/router/guards'
import { adminRoutes } from '@/router/admin.routes'
import { getMetaForRoute } from '@/config/meta-descriptions'
import { createLocalizedRoutes } from '@/router/i18n-routes'

const routes: import('vue-router').RouteRecordRaw[] = [
  // ——— Redirection de / vers /fr ———
  {
    path: '/',
    redirect: '/fr',
  },
  // ——— Public (accueil, pourquoi, témoignages) ———
  // Routes landing explicites pour éviter les problèmes de résolution
  {
    path: '/fr',
    name: 'landing',
    component: () => import('@/views/public/LandingView.vue'),
    meta: { layout: 'public', locale: 'fr' },
  },
  {
    path: '/en',
    name: 'landing-en',
    component: () => import('@/views/public/LandingView.vue'),
    meta: { layout: 'public', locale: 'en' },
  },
  {
    path: '/es',
    name: 'landing-es',
    component: () => import('@/views/public/LandingView.vue'),
    meta: { layout: 'public', locale: 'es' },
  },
  ...createLocalizedRoutes(
    {
      name: 'why',
      component: () => import('@/views/public/WhyGlobalWorkHubView.vue'),
      meta: { layout: 'public' },
    },
    '/pourquoi-global-work-hub'
  ),
  ...createLocalizedRoutes(
    {
      name: 'testimonials',
      component: () => import('@/views/public/TestimonialsView.vue'),
      meta: { layout: 'public' },
    },
    '/ce-quon-dit-sur-nous'
  ),
  // ——— À propos ———
  ...createLocalizedRoutes(
    {
      name: 'mission',
      component: () => import('@/views/about/MissionView.vue'),
      meta: { layout: 'public' },
    },
    '/notre-mission'
  ),
  ...createLocalizedRoutes(
    {
      name: 'methode',
      component: () => import('@/views/about/MethodeView.vue'),
      meta: { layout: 'public' },
    },
    '/notre-methode'
  ),
  // ——— Services ———
  ...createLocalizedRoutes(
    {
      name: 'recrutement',
      component: () => import('@/views/services/RecrutementView.vue'),
      meta: { layout: 'public' },
    },
    '/recrutement'
  ),
  ...createLocalizedRoutes(
    {
      name: 'partage-salarial',
      component: () => import('@/views/services/PartageSalarialView.vue'),
      meta: { layout: 'public' },
    },
    '/partage-salarial'
  ),
  ...createLocalizedRoutes(
    {
      name: 'gestion-de-co',
      component: () => import('@/views/services/GestionCoView.vue'),
      meta: { layout: 'public' },
    },
    '/gestion-de-co'
  ),
  ...createLocalizedRoutes(
    {
      name: 'rh-admin',
      component: () => import('@/views/services/RHAdminView.vue'),
      meta: { layout: 'public' },
    },
    '/rh-et-administratif'
  ),
  ...createLocalizedRoutes(
    {
      name: 'conseil',
      component: () => import('@/views/services/ConseilView.vue'),
      meta: { layout: 'public' },
    },
    '/accompagnement-conseil'
  ),
  // ——— Ressources (blog, FAQ, légal) ———
  ...createLocalizedRoutes(
    {
      name: 'blog',
      component: () => import('@/views/blog/BlogListView.vue'),
      meta: { layout: 'public' },
    },
    '/blog'
  ),
  // Route blog avec slug (doit être générée manuellement car elle a un paramètre dynamique)
  {
    path: '/:locale(fr|en|es)/blog/:slug',
    name: 'blog-post',
    component: () => import('@/views/blog/BlogPostView.vue'),
    meta: { layout: 'public' },
  },
  // Redirection de l'ancienne URL vers la nouvelle
  {
    path: '/blog-conseils',
    redirect: '/fr/blog',
  },
  ...createLocalizedRoutes(
    {
      name: 'faq',
      component: () => import('@/views/resources/FAQView.vue'),
      meta: { layout: 'public' },
    },
    '/faq'
  ),
  ...createLocalizedRoutes(
    {
      name: 'privacy',
      component: () => import('@/views/resources/PrivacyView.vue'),
      meta: { layout: 'public' },
    },
    '/politique-de-confidentialite'
  ),
  ...createLocalizedRoutes(
    {
      name: 'tarification',
      component: () => import('@/views/resources/TarificationView.vue'),
      meta: { layout: 'public' },
    },
    '/conditions-tarification'
  ),
  ...createLocalizedRoutes(
    {
      name: 'structure',
      component: () => import('@/views/resources/StructureView.vue'),
      meta: { layout: 'public' },
    },
    '/structure-securite'
  ),
  ...createLocalizedRoutes(
    {
      name: 'legal',
      component: () => import('@/views/resources/LegalView.vue'),
      meta: { layout: 'public' },
    },
    '/mentions-legales'
  ),
  ...createLocalizedRoutes(
    {
      name: 'cgu',
      component: () => import('@/views/resources/CGUView.vue'),
      meta: { layout: 'public' },
    },
    '/conditions-generales-utilisation'
  ),
  ...createLocalizedRoutes(
    {
      name: 'rgpd',
      component: () => import('@/views/resources/RGDPView.vue'),
      meta: { layout: 'public' },
    },
    '/politique-de-protection-des-donnees-personnelles'
  ),
  // ——— Tarifs ———
  ...createLocalizedRoutes(
    {
      name: 'pricing',
      component: () => import('@/views/public/PricingView.vue'),
      meta: { layout: 'public' },
    },
    '/nos-tarifs'
  ),
  // ——— Contact ———
  ...createLocalizedRoutes(
    {
      name: 'contact',
      component: () => import('@/views/contact/ContactView.vue'),
      meta: { layout: 'public' },
    },
    '/contactez-nous'
  ),
  // ——— Auth (connexion / inscription) ———
  ...createLocalizedRoutes(
    {
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: { layout: 'public' },
    },
    '/inscription'
  ),
  ...createLocalizedRoutes(
    {
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { layout: 'public' },
    },
    '/connexion'
  ),
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
  // ——— 404 Catch-all (doit être en dernier) ———
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/errors/NotFoundView.vue'),
    meta: { layout: 'public' },
  },
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

// Debug: Log des routes générées (à retirer en production)
if (import.meta.env.DEV) {
  const allRoutes = router.getRoutes()
  console.log(
    'Routes générées:',
    allRoutes.map(r => ({ path: r.path, name: r.name }))
  )
  console.log(
    'Routes recrutement:',
    allRoutes.filter(r => r.path.includes('recrutement'))
  )
}

router.beforeEach((to, _from, next) => {
  // Debug en développement pour la route recrutement
  if (import.meta.env.DEV && to.path.includes('recrutement')) {
    console.log('🔍 Navigation vers:', to.path)
    console.log('🔍 Route name:', to.name)
    console.log(
      '🔍 Routes disponibles:',
      router
        .getRoutes()
        .filter(r => r.path.includes('recrutement'))
        .map(r => r.path)
    )
  }

  // Guard de locale (doit être en premier pour gérer les redirections de locale)
  const localeResult = localeGuard(to)
  if (localeResult !== true) {
    if (localeResult === false) {
      return next(false)
    }
    return next(localeResult)
  }

  const loggedInRedirect = redirectLoggedInToDashboard(to)
  if (loggedInRedirect !== true) {
    if (loggedInRedirect === false) {
      return next(false)
    }
    return next(loggedInRedirect)
  }

  const authResult = requiresAuth(to)
  if (authResult !== true) {
    if (authResult === false) {
      return next(false)
    }
    return next(authResult)
  }

  const adminResult = requiresAdmin(to)
  if (adminResult !== true) {
    if (adminResult === false) {
      return next(false)
    }
    return next(adminResult)
  }

  return next()
})

// Appliquer les meta descriptions et canonical automatiquement
router.afterEach(to => {
  // Ne pas appliquer les meta automatiques pour les pages qui gèrent leurs propres meta
  if (to.name === 'blog-post' || to.name === 'pricing') {
    return
  }

  const meta = getMetaForRoute(to.name)
  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://global-work-hub.com'
  const canonicalUrl = `${baseUrl}${to.fullPath === '/' ? '' : to.fullPath}`.replace(/\/$/, '')

  useHead({
    title: meta.title,
    meta: [
      {
        name: 'description',
        content: meta.description,
      },
      // Meta robots pour les pages privées
      ...(to.meta.requiresAuth || to.meta.role === 'admin'
        ? [
            {
              name: 'robots',
              content: 'noindex, nofollow',
            },
          ]
        : []),
    ],
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl,
      },
    ],
  })
})
