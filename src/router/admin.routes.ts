import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    meta: { requiresAuth: true, role: 'admin', layout: 'admin' },
    children: [
      {
        path: '',
        redirect: { name: 'admin-dashboard' },
      },
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/AdminDashboardView.vue'),
        meta: { title: 'Tableau de bord' },
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('@/views/admin/AdminUsersView.vue'),
        meta: { title: 'Utilisateurs' },
      },
      {
        path: 'users/:id',
        name: 'admin-user-detail',
        component: () => import('@/views/admin/AdminUserDetailView.vue'),
        meta: { title: 'Détail utilisateur' },
      },
      {
        path: 'demandes',
        name: 'admin-demandes',
        component: () => import('@/views/admin/AdminDemandesView.vue'),
        meta: { title: 'Demandes' },
      },
      {
        path: 'missions',
        name: 'admin-missions',
        component: () => import('@/views/admin/AdminMissionsView.vue'),
        meta: { title: 'Missions' },
      },
      {
        path: 'settings',
        name: 'admin-settings',
        component: () => import('@/views/admin/AdminSettingsView.vue'),
        meta: { title: 'Paramètres' },
      },
    ],
  },
]
