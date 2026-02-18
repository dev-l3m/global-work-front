import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import { supportedLocales } from '@/plugins/i18n'
import { removeLocaleFromPath, addLocaleToPath } from '@/router/i18n-routes'

const BASE_URL = 'https://global-work-hub.com'

/**
 * Composable pour gérer les meta tags SEO multilingues avec hreflang
 * @param titleKey - Clé de traduction pour le titre (ex: 'meta.home.title')
 * @param descriptionKey - Clé de traduction pour la description (ex: 'meta.home.description')
 */
export function useSeoMetaI18n(titleKey: string, descriptionKey: string) {
  const route = useRoute()
  const { t, locale } = useI18n()

  // Appliquer les meta tags et hreflang avec une fonction réactive
  useHead(() => {
    // Obtenir le chemin sans locale pour générer les URLs alternates
    const pathWithoutLocale = removeLocaleFromPath(route.path)

    // Générer les URLs hreflang pour toutes les locales
    const alternateLinks: Array<{ rel: string; hreflang: string; href: string }> = []

    // Générer un lien pour chaque locale supportée
    for (const loc of supportedLocales) {
      const localizedPath = addLocaleToPath(pathWithoutLocale, loc)
      alternateLinks.push({
        rel: 'alternate',
        hreflang: loc,
        href: `${BASE_URL}${localizedPath}${route.hash || ''}`,
      })
    }

    // Ajouter x-default pointant vers la locale par défaut (fr)
    const defaultPath = addLocaleToPath(pathWithoutLocale, 'fr')
    alternateLinks.push({
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${BASE_URL}${defaultPath}${route.hash || ''}`,
    })

    // Générer l'URL canonique avec la locale actuelle
    const canonicalUrl = `${BASE_URL}${route.path}${route.hash || ''}`.replace(/\/$/, '')

    return {
      title: t(titleKey),
      meta: [
        {
          name: 'description',
          content: t(descriptionKey),
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: canonicalUrl,
        },
        ...alternateLinks,
      ],
      htmlAttrs: {
        lang: locale.value,
      },
    }
  })

  return {
    title: computed(() => t(titleKey)),
    description: computed(() => t(descriptionKey)),
  }
}
