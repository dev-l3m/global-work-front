<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { supportedLocales, type SupportedLocale, setLocale } from '@/plugins/i18n'
import { addLocaleToPath, removeLocaleFromPath } from '@/router/i18n-routes'

const LANDING_SECTIONS = ['services', 'specialites', 'resultats', 'contact'] as const
const HEADER_HEIGHT = 72

const router = useRouter()
const route = useRoute()
const { locale, t } = useI18n()

const isScrolled = ref(false)
const mobileMenu = ref(false)
const activeSection = ref<string>('')
const languageMenu = ref(false)

const currentLocale = computed(() => locale.value as SupportedLocale)

// URLs des drapeaux depuis un CDN
const flagUrls = {
  fr: 'https://flagcdn.com/w20/fr.png',
  en: 'https://flagcdn.com/w20/gb.png',
  es: 'https://flagcdn.com/w20/es.png',
}

function changeLanguage(newLocale: SupportedLocale) {
  if (newLocale === currentLocale.value) return

  setLocale(newLocale)
  languageMenu.value = false

  // Mettre à jour l'URL avec la nouvelle locale
  const currentPath = removeLocaleFromPath(route.path)
  const newPath = addLocaleToPath(currentPath, newLocale)
  router.push(newPath)
}

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

/** Navigation vers une section : le router scrollBehavior gère le scroll (hash + offset 80px). */
function onNavClick(id: string) {
  mobileMenu.value = false
  activeSection.value = id
  const currentPath = removeLocaleFromPath(route.path)
  const localePath =
    currentPath === '/' ? `/${currentLocale.value}` : `/${currentLocale.value}${currentPath}`
  router.push({ path: localePath, hash: '#' + id })
}

function setupIntersectionObserver() {
  const observer = new IntersectionObserver(
    entries => {
      const visible = entries
        .filter(
          e =>
            e.isIntersecting &&
            LANDING_SECTIONS.includes(e.target.id as (typeof LANDING_SECTIONS)[number])
        )
        .map(e => ({ id: e.target.id, top: e.boundingClientRect.top }))
      if (visible.length === 0) return
      visible.sort((a, b) => a.top - b.top)
      const first = visible[0]
      if (!first) return
      const next = first.id
      if (next !== activeSection.value) {
        activeSection.value = next
        if (route.path === '/') {
          const newHash = '#' + next
          if (window.location.hash !== newHash) {
            window.history.replaceState(
              null,
              '',
              window.location.pathname + window.location.search + newHash
            )
          }
        }
      }
    },
    {
      root: null,
      rootMargin: `-${HEADER_HEIGHT}px 0px -40% 0px`,
      threshold: 0,
    }
  )

  LANDING_SECTIONS.forEach(id => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })

  return () => {
    LANDING_SECTIONS.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.unobserve(el)
    })
  }
}

let teardownObserver: (() => void) | null = null

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
  const hash = route.hash.slice(1)
  if (
    route.path === '/' &&
    hash &&
    LANDING_SECTIONS.includes(hash as (typeof LANDING_SECTIONS)[number])
  ) {
    activeSection.value = hash
  }
  teardownObserver = setupIntersectionObserver()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  teardownObserver?.()
})

function isActive(id: string) {
  return activeSection.value === id
}
</script>

<template>
  <v-app-bar flat :class="['app-bar-landing', { 'app-bar-scrolled': isScrolled }]" height="72">
    <div class="nav-container-landing">
      <div class="nav-left">
        <v-btn
          variant="text"
          class="logo-btn d-flex align-center px-0 text-none"
          @click="router.push(`/${currentLocale}`)"
        >
          <img
            src="/assets/hub-logo.png"
            alt="Global Work Hub - Logo recrutement international et externalisation RH"
            class="logo"
          />
        </v-btn>
        <v-btn
          icon
          variant="text"
          class="mobile-menu-btn d-md-none"
          color="default"
          @click="mobileMenu = !mobileMenu"
        >
          <v-icon>{{ mobileMenu ? 'mdi-close' : 'mdi-menu' }}</v-icon>
        </v-btn>
      </div>

      <div class="nav-right-block d-none d-md-flex align-center">
        <nav class="nav-links">
          <button
            type="button"
            class="nav-link-landing"
            :class="{ 'nav-link-landing-active': isActive('services') }"
            @click="onNavClick('services')"
          >
            {{ t('nav.services') }}
          </button>
          <button
            type="button"
            class="nav-link-landing"
            :class="{ 'nav-link-landing-active': isActive('specialites') }"
            @click="onNavClick('specialites')"
          >
            {{ t('nav.specialites') }}
          </button>
          <button
            type="button"
            class="nav-link-landing"
            :class="{ 'nav-link-landing-active': isActive('resultats') }"
            @click="onNavClick('resultats')"
          >
            {{ t('nav.resultats') }}
          </button>
        </nav>

        <!-- Sélecteur de langue avec drapeaux -->
        <v-menu v-model="languageMenu" location="bottom end" offset-y>
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text"
              class="language-selector text-none"
              size="small"
              min-width="auto"
            >
              <img
                :src="flagUrls[currentLocale]"
                :alt="currentLocale.toUpperCase()"
                class="flag-icon"
              />
            </v-btn>
          </template>
          <v-list class="language-menu">
            <v-list-item
              v-for="loc in supportedLocales"
              :key="loc"
              :active="currentLocale === loc"
              @click="changeLanguage(loc)"
              class="language-item"
            >
              <template #prepend>
                <img :src="flagUrls[loc]" :alt="loc.toUpperCase()" class="flag-icon-menu" />
              </template>
              <v-list-item-title>
                {{ t(`common.${loc === 'fr' ? 'french' : loc === 'en' ? 'english' : 'spanish'}`) }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn class="cta-btn-landing text-none font-weight-bold" @click="onNavClick('contact')">
          {{ t('nav.contact') }}
        </v-btn>
      </div>
    </div>
  </v-app-bar>

  <v-navigation-drawer v-model="mobileMenu" temporary location="right" class="mobile-drawer">
    <div class="mobile-drawer-content">
      <v-list class="mobile-menu-list pa-4">
        <v-list-item class="mobile-menu-item" @click="onNavClick('services')">
          <v-list-item-title>{{ t('nav.services') }}</v-list-item-title>
        </v-list-item>
        <v-list-item class="mobile-menu-item" @click="onNavClick('specialites')">
          <v-list-item-title>{{ t('nav.specialites') }}</v-list-item-title>
        </v-list-item>
        <v-list-item class="mobile-menu-item" @click="onNavClick('resultats')">
          <v-list-item-title>{{ t('nav.resultats') }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider class="my-2" />

      <!-- Sélecteur de langue mobile avec drapeaux -->
      <div class="mobile-language-selector pa-4">
        <div class="text-caption text-medium-emphasis mb-2">{{ t('common.language') }}</div>
        <div class="d-flex gap-2">
          <v-btn
            v-for="loc in supportedLocales"
            :key="loc"
            :variant="currentLocale === loc ? 'flat' : 'outlined'"
            :color="currentLocale === loc ? 'primary' : 'default'"
            size="small"
            class="language-flag-btn"
            @click="changeLanguage(loc)"
          >
            <img :src="flagUrls[loc]" :alt="loc.toUpperCase()" class="flag-icon-mobile" />
            <span class="ml-2">{{ loc.toUpperCase() }}</span>
          </v-btn>
        </div>
      </div>

      <div class="mobile-cta-buttons pa-4">
        <v-btn
          block
          size="large"
          class="cta-btn-landing text-none font-weight-bold"
          @click="onNavClick('contact')"
        >
          {{ t('nav.contact') }}
        </v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<style scoped>
/* Manus-like tokens */
.app-bar-landing {
  --header-bg: rgba(248, 247, 252, 0.85);
  --header-bg-scrolled: rgba(248, 247, 252, 0.95);
  --nav-text: #3b3f4a;
  --nav-text-hover: #6b5ae0;
  --accent: #6b5ae0;
  --active-pill: rgba(107, 90, 224, 0.12);
}

@supports (color: oklch(0 0 0)) {
  .app-bar-landing {
    --header-bg: oklch(99% 0.002 290 / 0.85);
    --header-bg-scrolled: oklch(99% 0.002 290 / 0.95);
  }
}

.app-bar-landing {
  background: var(--header-bg) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition:
    background 0.3s ease,
    backdrop-filter 0.3s ease;
}

.app-bar-landing.app-bar-scrolled {
  background: var(--header-bg-scrolled) !important;
  backdrop-filter: blur(14px);
}

.app-bar-landing :deep(.v-toolbar__content) {
  height: 100%;
  width: 100%;
  max-width: 100%;
  padding: 0;
}

/* Flex: logo à gauche, nav+CTA à droite (un bloc) */
.nav-container-landing {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-btn {
  transition: transform 0.2s ease;
  border: none;
  box-shadow: none;
}

.logo-btn:hover,
.logo-btn:focus,
.logo-btn:focus-visible,
.logo-btn:active {
  transform: scale(1.05);
  border: none;
  outline: none;
  box-shadow: none;
}

.logo-btn:focus-visible {
  outline: none;
}

.logo-btn:deep(.v-btn__overlay),
.logo-btn:deep(.v-ripple__container) {
  opacity: 0;
}

.logo {
  height: 120px;
  border-radius: 12px;
}

/* Bloc droit : liens + CTA collés, espacement ~24px entre les items */
.nav-right-block {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-link-landing {
  color: var(--nav-text);
  font-size: 1rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition:
    color 0.2s ease,
    background 0.2s ease;
}

.nav-link-landing:hover {
  color: var(--nav-text-hover);
}

.nav-link-landing-active {
  color: var(--accent) !important;
  font-weight: 600;
  background: var(--active-pill);
}

.cta-btn-landing {
  background: var(--accent) !important;
  color: white !important;
  border-radius: 9999px;
  padding: 10px 26px;
  height: 44px;
  font-size: 0.9375rem;
  box-shadow: 0 2px 8px rgba(107, 90, 224, 0.2);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.cta-btn-landing:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(107, 90, 224, 0.35);
}

.mobile-menu-item {
  cursor: pointer;
}

.language-selector {
  color: var(--nav-text);
  font-weight: 500;
  min-width: auto;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.language-selector:hover {
  background: rgba(107, 90, 224, 0.08);
}

.flag-icon {
  width: 24px;
  height: 18px;
  object-fit: cover;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.language-menu {
  border-radius: 12px;
  padding: 4px;
}

.language-item {
  border-radius: 8px;
  margin: 2px 0;
  padding: 8px 12px;
}

.flag-icon-menu {
  width: 20px;
  height: 15px;
  object-fit: cover;
  border-radius: 2px;
  margin-right: 8px;
}

.mobile-language-selector {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.language-flag-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flag-icon-mobile {
  width: 20px;
  height: 15px;
  object-fit: cover;
  border-radius: 2px;
}
</style>
