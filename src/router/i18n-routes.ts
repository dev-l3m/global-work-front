import type { RouteRecordRaw } from 'vue-router'
import { supportedLocales, type SupportedLocale, defaultLocale } from '@/plugins/i18n'

/**
 * Extrait la locale de l'URL
 */
export function getLocaleFromPath(path: string): SupportedLocale | null {
  const segments = path.split('/').filter(Boolean)
  const firstSegment = segments[0]
  if (supportedLocales.includes(firstSegment as SupportedLocale)) {
    return firstSegment as SupportedLocale
  }
  return null
}

/**
 * Retire le préfixe de langue du chemin
 */
export function removeLocaleFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean)
  if (segments.length > 0 && supportedLocales.includes(segments[0] as SupportedLocale)) {
    return '/' + segments.slice(1).join('/')
  }
  return path
}

/**
 * Ajoute le préfixe de langue au chemin
 */
export function addLocaleToPath(path: string, locale: SupportedLocale): string {
  const cleanPath = path.startsWith('/') ? path : '/' + path
  if (cleanPath === '/') {
    return `/${locale}`
  }
  return `/${locale}${cleanPath}`
}

/**
 * Génère les routes multilingues pour une route donnée
 */
export function createLocalizedRoutes(
  baseRoute: Omit<RouteRecordRaw, 'path' | 'children'>,
  path: string
): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // Route avec préfixe de langue pour chaque locale
  for (const locale of supportedLocales) {
    const localizedPath = path === '/' ? `/${locale}` : `/${locale}${path}`
    // Générer un nom unique pour chaque locale si un nom est fourni
    const baseName = baseRoute.name != null ? String(baseRoute.name) : undefined
    const routeName =
      baseName != null ? (locale === defaultLocale ? baseName : `${baseName}-${locale}`) : undefined

    const route: RouteRecordRaw = {
      ...(baseRoute as RouteRecordRaw),
      name: routeName,
      path: localizedPath,
      meta: {
        ...(baseRoute.meta ?? {}),
        locale,
      },
    }

    routes.push(route)
  }

  // Note: La redirection de / vers /fr est gérée dans router/index.ts
  // On ne génère pas de redirection ici pour éviter les conflits

  return routes
}
