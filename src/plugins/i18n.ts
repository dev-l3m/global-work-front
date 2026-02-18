import { createI18n } from 'vue-i18n'
import fr from '@/locales/fr.json'
import en from '@/locales/en.json'
import es from '@/locales/es.json'

export type SupportedLocale = 'fr' | 'en' | 'es'

export const supportedLocales: SupportedLocale[] = ['fr', 'en', 'es']

export const defaultLocale: SupportedLocale = 'fr'

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages: {
    fr,
    en,
    es,
  },
  globalInjection: true,
})

export function setLocale(locale: SupportedLocale) {
  if (supportedLocales.includes(locale)) {
    i18n.global.locale.value = locale
    document.documentElement.lang = locale
    localStorage.setItem('locale', locale)
  }
}

export function getLocale(): SupportedLocale {
  const stored = localStorage.getItem('locale')
  if (stored && supportedLocales.includes(stored as SupportedLocale)) {
    return stored as SupportedLocale
  }

  // Try to detect browser language
  const browserLang = navigator.language.split('-')[0]
  if (supportedLocales.includes(browserLang as SupportedLocale)) {
    return browserLang as SupportedLocale
  }

  return defaultLocale
}
