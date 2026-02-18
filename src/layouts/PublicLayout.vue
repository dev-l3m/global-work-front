<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import HeaderLanding from '@/components/layout/HeaderLanding.vue'
import { supportedLocales, type SupportedLocale, setLocale } from '@/plugins/i18n'
import { addLocaleToPath, removeLocaleFromPath } from '@/router/i18n-routes'

const router = useRouter()
const route = useRoute()
const { locale, t } = useI18n()

// Détecter la landing page : /fr, /en, /es ou / (redirigé vers /fr)
const isLandingPage = computed(() => {
  const path = route.path
  return path === '/' || path === '/fr' || path === '/en' || path === '/es'
})

const menuAccueil = ref(false)
const menuAPropos = ref(false)
const menuServices = ref(false)
const menuRessources = ref(false)
const menuCompte = ref(false)
const isScrolled = ref(false)
const mobileMenu = ref(false)
const languageMenu = ref(false)
const maintenanceDialog = ref(false)

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

// Helper pour générer un lien localisé
function getLocalizedPath(path: string): string {
  return addLocaleToPath(path, currentLocale.value)
}

// Fonction pour afficher le dialog de maintenance au lieu de naviguer
function showMaintenanceDialog(event?: Event) {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  maintenanceDialog.value = true
}

const isAccueilActive = () => {
  // Accueil est actif sur la page d'accueil et ses sous-pages
  const path = route.path
  return (
    path === '/' ||
    path === '/fr' ||
    path === '/en' ||
    path === '/es' ||
    path === '/pourquoi-global-work-hub' ||
    path.startsWith('/fr/pourquoi-global-work-hub') ||
    path.startsWith('/en/pourquoi-global-work-hub') ||
    path.startsWith('/es/pourquoi-global-work-hub') ||
    path === '/ce-quon-dit-sur-nous' ||
    path.startsWith('/fr/ce-quon-dit-sur-nous') ||
    path.startsWith('/en/ce-quon-dit-sur-nous') ||
    path.startsWith('/es/ce-quon-dit-sur-nous')
  )
}

const isAProposActive = () => {
  // À propos est actif sur les pages Notre mission et Notre méthode
  const path = route.path
  return (
    path === '/notre-mission' ||
    path.startsWith('/fr/notre-mission') ||
    path.startsWith('/en/notre-mission') ||
    path.startsWith('/es/notre-mission') ||
    path === '/notre-methode' ||
    path.startsWith('/fr/notre-methode') ||
    path.startsWith('/en/notre-methode') ||
    path.startsWith('/es/notre-methode')
  )
}

const isDropdownItemActive = (to: string) => {
  const path = route.path
  if (to.startsWith('/#')) {
    const hash = to.substring(1)
    return (
      route.hash === hash ||
      (path === '/' && route.hash === hash) ||
      ((path === '/fr' || path === '/en' || path === '/es') && route.hash === hash)
    )
  }
  if (to === '/') return path === '/' || path === '/fr' || path === '/en' || path === '/es'
  // Connexion et inscription : un seul actif selon la page (pas les deux)
  if (to === '/connexion')
    return (
      path === '/connexion' ||
      path.startsWith('/fr/connexion') ||
      path.startsWith('/en/connexion') ||
      path.startsWith('/es/connexion')
    )
  if (to === '/inscription')
    return (
      path === '/inscription' ||
      path.startsWith('/fr/inscription') ||
      path.startsWith('/en/inscription') ||
      path.startsWith('/es/inscription')
    )
  // Vérifier si le chemin correspond exactement ou commence par le chemin localisé
  return (
    path === to ||
    path.startsWith(to) ||
    path.startsWith(`/fr${to}`) ||
    path.startsWith(`/en${to}`) ||
    path.startsWith(`/es${to}`)
  )
}

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Check initial state
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function goToLogin() {
  const loginPath = addLocaleToPath('/connexion', currentLocale.value)
  router.push(`${loginPath}?role=client`)
  mobileMenu.value = false
}

function goToContact() {
  const contactPath = addLocaleToPath('/contactez-nous', currentLocale.value)
  router.push(contactPath)
  mobileMenu.value = false
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  const headerOffset = 80 // cohérent avec le scrollBehavior du router
  const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - headerOffset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })
}

function handleFooterContactClick() {
  // Si on est sur la landing page, scroll vers #contact
  if (isLandingPage.value) {
    scrollToSection('contact')
  } else {
    // Sinon, naviguer vers la page de contact
    router.push(getLocalizedPath('/contactez-nous'))
  }
}

const year = new Date().getFullYear()

// Arrays pour le menu mobile
const mobileServices = computed(() => {
  void locale.value // Pour la réactivité
  return [
    { to: '/recrutement', label: t('layout.navSubmenu.services.recruitment') },
    { to: '/partage-salarial', label: t('layout.navSubmenu.services.talentPortage') },
    { to: '/gestion-de-co', label: t('layout.navSubmenu.services.coManagement') },
    { to: '/rh-et-administratif', label: t('layout.navSubmenu.services.hrAdmin') },
    { to: '/accompagnement-conseil', label: t('layout.navSubmenu.services.accompaniment') },
  ]
})

const mobileResources = computed(() => {
  void locale.value // Pour la réactivité
  return [
    { to: '/blog-conseils', label: t('layout.navSubmenu.resources.blog') },
    { to: '/faq', label: t('layout.navSubmenu.resources.faq') },
    { to: '/politique-de-confidentialite', label: t('layout.navSubmenu.resources.privacy') },
    { to: '/conditions-tarification', label: t('layout.navSubmenu.resources.pricing') },
    { to: '/structure-securite', label: t('layout.navSubmenu.resources.security') },
    { to: '/mentions-legales', label: t('layout.navSubmenu.resources.legal') },
    { to: '/conditions-generales-utilisation', label: t('layout.navSubmenu.resources.terms') },
    {
      to: '/politique-de-protection-des-donnees-personnelles',
      label: t('layout.navSubmenu.resources.gdpr'),
    },
  ]
})
</script>

<template>
  <v-app class="app-gradient public-layout">
    <HeaderLanding v-if="isLandingPage" />
    <template v-else>
      <v-app-bar flat :class="['app-bar-modern', { 'app-bar-scrolled': isScrolled }]" height="72">
        <div class="nav-container">
          <div class="nav-left">
            <v-btn
              variant="text"
              class="logo-btn d-flex align-center px-0 text-none"
              @click="
                router.push(
                  route.path.startsWith('/fr')
                    ? '/fr'
                    : route.path.startsWith('/en')
                      ? '/en'
                      : route.path.startsWith('/es')
                        ? '/es'
                        : '/fr'
                )
              "
            >
              <img
                src="/assets/hub-logo.png"
                alt="Global Work Hub - Logo recrutement international et externalisation RH"
                class="logo"
              />
            </v-btn>
          </div>

          <!-- Bouton burger pour mobile -->
          <v-btn
            icon
            variant="text"
            class="mobile-menu-btn d-md-none"
            color="default"
            @click="mobileMenu = !mobileMenu"
          >
            <v-icon>{{ mobileMenu ? 'mdi-close' : 'mdi-menu' }}</v-icon>
          </v-btn>

          <div class="nav-center d-none d-md-flex">
            <v-menu
              v-model="menuAccueil"
              location="bottom"
              :close-on-content-click="false"
              offset="8"
            >
              <template #activator="{ props }">
                <v-btn
                  variant="text"
                  class="nav-link"
                  :class="{ 'nav-link-active': isAccueilActive() || menuAccueil }"
                  v-bind="props"
                >
                  {{ t('layout.nav.home') }}
                  <v-icon icon="mdi-chevron-down" size="16" class="ml-1" />
                </v-btn>
              </template>
              <v-list class="dropdown-menu">
                <!-- <v-list-item
                to="/"
                :class="['dropdown-item', { 'dropdown-item-active': isDropdownItemActive('/') }]"
              >
                {{ t('layout.nav.home') }}
              </v-list-item> -->
                <v-list-item
                  to="/pourquoi-global-work-hub"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/pourquoi-global-work-hub') },
                  ]"
                >
                  {{ t('layout.navSubmenu.home.whyGlobalWorkHub') }}
                </v-list-item>
                <v-list-item
                  to="/ce-quon-dit-sur-nous"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/ce-quon-dit-sur-nous') },
                  ]"
                >
                  {{ t('layout.navSubmenu.home.testimonials') }}
                </v-list-item>
              </v-list>
            </v-menu>

            <v-menu
              v-model="menuAPropos"
              location="bottom"
              :close-on-content-click="false"
              offset="8"
            >
              <template #activator="{ props }">
                <v-btn
                  variant="text"
                  class="nav-link"
                  :class="{ 'nav-link-active': isAProposActive() || menuAPropos }"
                  v-bind="props"
                >
                  <span class="nav-link-text">{{ t('layout.nav.about') }}</span>
                  <v-icon icon="mdi-chevron-down" size="16" class="ml-1" />
                </v-btn>
              </template>
              <v-list class="dropdown-menu">
                <v-list-item
                  to="/notre-mission"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/notre-mission') },
                  ]"
                >
                  {{ t('layout.navSubmenu.about.mission') }}
                </v-list-item>
                <v-list-item
                  to="/notre-methode"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/notre-methode') },
                  ]"
                >
                  {{ t('layout.navSubmenu.about.method') }}
                </v-list-item>
              </v-list>
            </v-menu>

            <v-menu
              v-model="menuServices"
              location="bottom"
              :close-on-content-click="false"
              offset="8"
            >
              <template #activator="{ props }">
                <v-btn
                  variant="text"
                  class="nav-link"
                  :class="{
                    'nav-link-active':
                      route.path === '/recrutement' ||
                      route.path === '/partage-salarial' ||
                      route.path === '/gestion-de-co' ||
                      route.path === '/rh-et-administratif' ||
                      route.path === '/accompagnement-conseil' ||
                      route.hash === '#services' ||
                      menuServices,
                  }"
                  v-bind="props"
                >
                  <span class="nav-link-text">{{ t('layout.nav.services') }}</span>
                  <v-icon icon="mdi-chevron-down" size="16" class="ml-1" />
                </v-btn>
              </template>
              <v-list class="dropdown-menu">
                <v-list-item
                  to="/recrutement"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/recrutement') },
                  ]"
                >
                  {{ t('layout.navSubmenu.services.recruitment') }}
                </v-list-item>
                <v-list-item
                  to="/partage-salarial"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/partage-salarial') },
                  ]"
                >
                  {{ t('layout.navSubmenu.services.talentPortage') }}
                </v-list-item>
                <v-list-item
                  to="/gestion-de-co"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/gestion-de-co') },
                  ]"
                >
                  {{ t('layout.navSubmenu.services.coManagement') }}
                </v-list-item>
                <v-list-item
                  to="/rh-et-administratif"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/rh-et-administratif') },
                  ]"
                >
                  {{ t('layout.navSubmenu.services.hrAdmin') }}
                </v-list-item>
                <v-list-item
                  to="/accompagnement-conseil"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/accompagnement-conseil') },
                  ]"
                >
                  {{ t('layout.navSubmenu.services.accompaniment') }}
                </v-list-item>
              </v-list>
            </v-menu>

            <v-menu
              v-model="menuRessources"
              location="bottom"
              :close-on-content-click="false"
              offset="8"
            >
              <template #activator="{ props }">
                <v-btn
                  variant="text"
                  class="nav-link"
                  :class="{
                    'nav-link-active':
                      route.path === '/blog-conseils' ||
                      route.path === '/faq' ||
                      route.path === '/politique-de-confidentialite' ||
                      route.path === '/conditions-tarification' ||
                      route.path === '/structure-securite' ||
                      route.hash === '#ressources' ||
                      menuRessources,
                  }"
                  v-bind="props"
                >
                  <span class="nav-link-text">{{ t('layout.nav.resources') }}</span>
                  <v-icon icon="mdi-chevron-down" size="16" class="ml-1" />
                </v-btn>
              </template>
              <v-list class="dropdown-menu">
                <v-list-item
                  to="/blog-conseils"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/blog-conseils') },
                  ]"
                >
                  {{ t('layout.navSubmenu.resources.blog') }}
                </v-list-item>
                <v-list-item
                  to="/faq"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/faq') },
                  ]"
                >
                  {{ t('layout.navSubmenu.resources.faq') }}
                </v-list-item>
                <v-list-item
                  to="/politique-de-confidentialite"
                  :class="[
                    'dropdown-item',
                    {
                      'dropdown-item-active': isDropdownItemActive('/politique-de-confidentialite'),
                    },
                  ]"
                >
                  {{ t('layout.navSubmenu.resources.privacy') }}
                </v-list-item>
                <v-list-item
                  to="/conditions-tarification"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/conditions-tarification') },
                  ]"
                >
                  {{ t('layout.navSubmenu.resources.pricing') }}
                </v-list-item>
                <v-list-item
                  to="/structure-securite"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/structure-securite') },
                  ]"
                >
                  {{ t('layout.navSubmenu.resources.security') }}
                </v-list-item>
              </v-list>
            </v-menu>

            <v-menu
              v-model="menuCompte"
              location="bottom"
              :close-on-content-click="false"
              offset="8"
            >
              <template #activator="{ props }">
                <v-btn
                  variant="text"
                  class="nav-link"
                  :class="{
                    'nav-link-active':
                      menuCompte || route.path === '/connexion' || route.path === '/inscription',
                  }"
                  v-bind="props"
                >
                  <span class="nav-link-text">{{ t('layout.nav.account') }}</span>
                  <v-icon icon="mdi-chevron-down" size="16" class="ml-1" />
                </v-btn>
              </template>
              <v-list class="dropdown-menu">
                <v-list-item
                  to="/connexion?role=client"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/connexion') },
                  ]"
                >
                  {{ t('layout.navSubmenu.account.login') }}
                </v-list-item>
                <v-list-item
                  to="/inscription"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/inscription') },
                  ]"
                >
                  {{ t('layout.navSubmenu.account.register') }}
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

          <div class="nav-right d-none d-md-flex align-center">
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
                    {{
                      t(`common.${loc === 'fr' ? 'french' : loc === 'en' ? 'english' : 'spanish'}`)
                    }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-btn
              color="success"
              variant="flat"
              class="cta-btn cta-btn-left text-none font-weight-bold"
              @click="router.push(getLocalizedPath('/inscription'))"
            >
              {{ t('layout.buttons.clientSpace') }}
            </v-btn>
            <v-btn
              color="secondary"
              variant="flat"
              class="cta-btn cta-btn-right text-none font-weight-bold"
              @click="router.push(getLocalizedPath('/contactez-nous'))"
            >
              {{ t('layout.buttons.contactUs') }}
            </v-btn>
          </div>
        </div>
      </v-app-bar>

      <!-- Drawer mobile -->
      <v-navigation-drawer v-model="mobileMenu" temporary location="right" class="mobile-drawer">
        <div class="mobile-drawer-content">
          <!-- Menu mobile -->
          <v-list class="mobile-menu-list">
            <!-- Accueil -->
            <v-list-group value="accueil" :class="{ 'mobile-group-active': isAccueilActive() }">
              <template #activator="{ props }">
                <v-list-item
                  v-bind="props"
                  :class="['mobile-menu-item', { 'mobile-menu-item-active': isAccueilActive() }]"
                >
                  <v-list-item-title>{{ t('layout.nav.home') }}</v-list-item-title>
                </v-list-item>
              </template>
              <v-list-item
                :to="'/pourquoi-global-work-hub'"
                :class="[
                  'mobile-menu-item',
                  { 'mobile-menu-item-active': isDropdownItemActive('/pourquoi-global-work-hub') },
                ]"
                @click="mobileMenu = false"
              >
                <v-list-item-title class="mobile-sub-item">{{
                  t('layout.navSubmenu.home.whyGlobalWorkHub')
                }}</v-list-item-title>
              </v-list-item>
              <v-list-item
                :to="'/ce-quon-dit-sur-nous'"
                :class="[
                  'mobile-menu-item',
                  { 'mobile-menu-item-active': isDropdownItemActive('/ce-quon-dit-sur-nous') },
                ]"
                @click="mobileMenu = false"
              >
                <v-list-item-title class="mobile-sub-item">{{
                  t('layout.navSubmenu.home.testimonials')
                }}</v-list-item-title>
              </v-list-item>
            </v-list-group>

            <v-divider class="my-2" />

            <!-- À propos -->
            <v-list-group value="apropos" :class="{ 'mobile-group-active': isAProposActive() }">
              <template #activator="{ props }">
                <v-list-item
                  v-bind="props"
                  :class="['mobile-menu-item', { 'mobile-menu-item-active': isAProposActive() }]"
                >
                  <v-list-item-title>{{ t('layout.nav.about') }}</v-list-item-title>
                </v-list-item>
              </template>
              <v-list-item
                :to="'/notre-mission'"
                :class="[
                  'mobile-menu-item',
                  { 'mobile-menu-item-active': isDropdownItemActive('/notre-mission') },
                ]"
                @click="mobileMenu = false"
              >
                <v-list-item-title class="mobile-sub-item">{{
                  t('layout.navSubmenu.about.mission')
                }}</v-list-item-title>
              </v-list-item>
              <v-list-item
                :to="'/notre-methode'"
                :class="[
                  'mobile-menu-item',
                  { 'mobile-menu-item-active': isDropdownItemActive('/notre-methode') },
                ]"
                @click="mobileMenu = false"
              >
                <v-list-item-title class="mobile-sub-item">{{
                  t('layout.navSubmenu.about.method')
                }}</v-list-item-title>
              </v-list-item>
            </v-list-group>

            <v-divider class="my-2" />

            <!-- Services -->
            <v-list-group
              value="services"
              :class="{
                'mobile-group-active':
                  route.path === '/recrutement' ||
                  route.path === '/partage-salarial' ||
                  route.path === '/gestion-de-co' ||
                  route.path === '/rh-et-administratif' ||
                  route.path === '/accompagnement-conseil',
              }"
            >
              <template #activator="{ props }">
                <v-list-item
                  v-bind="props"
                  class="mobile-menu-item"
                  :class="{
                    'mobile-menu-item-active':
                      route.path === '/recrutement' ||
                      route.path === '/partage-salarial' ||
                      route.path === '/gestion-de-co' ||
                      route.path === '/rh-et-administratif' ||
                      route.path === '/accompagnement-conseil',
                  }"
                >
                  <v-list-item-title>{{ t('layout.nav.services') }}</v-list-item-title>
                </v-list-item>
              </template>
              <v-list-item
                v-for="service in mobileServices"
                :key="service.to"
                :to="service.to"
                :class="[
                  'mobile-menu-item',
                  { 'mobile-menu-item-active': isDropdownItemActive(service.to) },
                ]"
                @click="mobileMenu = false"
              >
                <v-list-item-title class="mobile-sub-item">{{ service.label }}</v-list-item-title>
              </v-list-item>
            </v-list-group>

            <v-divider class="my-2" />

            <!-- Ressources -->
            <v-list-group
              value="ressources"
              :class="{
                'mobile-group-active':
                  route.path === '/blog-conseils' ||
                  route.path === '/faq' ||
                  route.path === '/politique-de-confidentialite' ||
                  route.path === '/conditions-tarification' ||
                  route.path === '/structure-securite' ||
                  route.path === '/mentions-legales' ||
                  route.path === '/conditions-generales-utilisation' ||
                  route.path === '/politique-de-protection-des-donnees-personnelles',
              }"
            >
              <template #activator="{ props }">
                <v-list-item
                  v-bind="props"
                  class="mobile-menu-item"
                  :class="{
                    'mobile-menu-item-active':
                      route.path === '/blog-conseils' ||
                      route.path === '/faq' ||
                      route.path === '/politique-de-confidentialite' ||
                      route.path === '/conditions-tarification' ||
                      route.path === '/structure-securite' ||
                      route.path === '/mentions-legales' ||
                      route.path === '/conditions-generales-utilisation' ||
                      route.path === '/politique-de-protection-des-donnees-personnelles',
                  }"
                >
                  <v-list-item-title>{{ t('layout.nav.resources') }}</v-list-item-title>
                </v-list-item>
              </template>
              <v-list-item
                v-for="resource in mobileResources"
                :key="resource.to"
                :to="resource.to"
                :class="[
                  'mobile-menu-item',
                  { 'mobile-menu-item-active': isDropdownItemActive(resource.to) },
                ]"
                @click="mobileMenu = false"
              >
                <v-list-item-title class="mobile-sub-item">{{ resource.label }}</v-list-item-title>
              </v-list-item>
            </v-list-group>

            <v-divider class="my-2" />

            <!-- Mon compte -->
            <v-list-group
              value="compte"
              :class="{
                'mobile-group-active': route.path === '/connexion' || route.path === '/inscription',
              }"
            >
              <template #activator="{ props }">
                <v-list-item
                  v-bind="props"
                  class="mobile-menu-item"
                  :class="{
                    'mobile-menu-item-active':
                      route.path === '/connexion' || route.path === '/inscription',
                  }"
                >
                  <v-list-item-title>{{ t('layout.nav.account') }}</v-list-item-title>
                </v-list-item>
              </template>
              <v-list-item
                :to="'/connexion?role=client'"
                :class="[
                  'mobile-menu-item',
                  { 'mobile-menu-item-active': isDropdownItemActive('/connexion') },
                ]"
                @click="mobileMenu = false"
              >
                <v-list-item-title class="mobile-sub-item">{{
                  t('layout.navSubmenu.account.login')
                }}</v-list-item-title>
              </v-list-item>
              <v-list-item
                :to="'/inscription'"
                :class="[
                  'mobile-menu-item',
                  { 'mobile-menu-item-active': isDropdownItemActive('/inscription') },
                ]"
                @click="mobileMenu = false"
              >
                <v-list-item-title class="mobile-sub-item">{{
                  t('layout.navSubmenu.account.register')
                }}</v-list-item-title>
              </v-list-item>
            </v-list-group>
          </v-list>

          <v-divider class="my-4" />

          <!-- Sélecteur de langue mobile -->
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

          <v-divider class="my-4" />

          <!-- Boutons CTA mobile -->
          <div class="mobile-cta-buttons pa-4">
            <v-btn
              color="success"
              variant="flat"
              block
              size="large"
              class="mb-3 text-none font-weight-bold"
              @click="goToLogin"
            >
              {{ t('layout.buttons.clientSpace') }}
            </v-btn>
            <v-btn
              color="secondary"
              variant="flat"
              block
              size="large"
              class="text-none font-weight-bold"
              @click="goToContact"
            >
              {{ t('layout.buttons.contactUs') }}
            </v-btn>
          </div>
        </div>
      </v-navigation-drawer>
    </template>

    <v-main class="main-gradient">
      <slot />
    </v-main>

    <v-footer class="footer-modern">
      <v-container>
        <v-col cols="12">
          <!-- Row 1 : Logo, question et CTA -->
          <v-row class="align-center">
            <v-col cols="12">
              <div class="footer-top-content">
                <div class="footer-logo-container">
                  <img
                    src="/assets/hub-logo.png"
                    alt="Global Work Hub - Logo recrutement international et externalisation RH"
                    class="footer-logo-image"
                  />
                </div>
                <div class="footer-cta-question">
                  <h3 class="text-h6 text-md-h5 font-weight-bold">
                    {{ t('layout.footer.cta.title') }}
                  </h3>
                  <p class="text-body-2 mt-2 mb-0" style="opacity: 0.9">
                    {{ t('layout.footer.cta.subtitle') }}
                  </p>
                </div>
                <div class="footer-cta-button">
                  <v-btn
                    color="secondary"
                    variant="flat"
                    size="large"
                    class="footer-contact-btn text-none font-weight-bold"
                    @click="handleFooterContactClick"
                  >
                    {{ t('layout.footer.cta.button') }}
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- Row 2 : 4 colonnes de liens -->
          <v-row class="footer-main-section">
            <v-col cols="12" sm="6" md="3">
              <div class="footer-column-header mb-4">
                {{ t('layout.footer.sections.resources') }}
              </div>
              <div class="d-flex flex-column ga-3">
                <a href="#" class="footer-link" @click.prevent="showMaintenanceDialog">{{
                  t('layout.footer.links.blog')
                }}</a>
                <a href="#" class="footer-link" @click.prevent="showMaintenanceDialog">{{
                  t('layout.navSubmenu.resources.faq')
                }}</a>
              </div>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <div class="footer-column-header mb-4">{{ t('layout.footer.sections.legal') }}</div>
              <div class="d-flex flex-column ga-3">
                <a href="#" class="footer-link" @click.prevent="showMaintenanceDialog">{{
                  t('layout.navSubmenu.resources.legal')
                }}</a>
                <a href="#" class="footer-link" @click.prevent="showMaintenanceDialog">{{
                  t('layout.navSubmenu.resources.privacy')
                }}</a>
                <a href="#" class="footer-link" @click.prevent="showMaintenanceDialog">{{
                  t('layout.navSubmenu.resources.terms')
                }}</a>
                <a href="#" class="footer-link" @click.prevent="showMaintenanceDialog">{{
                  t('layout.navSubmenu.resources.gdpr')
                }}</a>
              </div>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <div class="footer-column-header mb-4">{{ t('layout.footer.sections.contact') }}</div>
              <div class="d-flex flex-column ga-3">
                <a href="#" class="footer-link" @click.prevent="showMaintenanceDialog">{{
                  t('layout.footer.links.whoWeAre')
                }}</a>
                <a href="#" class="footer-link" @click.prevent="showMaintenanceDialog">{{
                  t('layout.footer.links.ourServices')
                }}</a>
                <a href="#" class="footer-link" @click.prevent="showMaintenanceDialog">{{
                  t('layout.navSubmenu.about.method')
                }}</a>
              </div>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <div class="footer-column-header mb-4">
                {{ t('layout.footer.sections.contactInfo') }}
              </div>
              <div class="d-flex flex-column ga-3 footer-address">
                <div class="d-flex align-center ga-2">
                  <v-icon icon="mdi-email" size="18" color="white" />
                  <a href="mailto:contact@global-work-hub.com" class="footer-link"
                    >contact@global-work-hub.com</a
                  >
                </div>
                <div class="d-flex align-center ga-2">
                  <v-icon icon="mdi-phone" size="18" color="white" />
                  <a href="tel:+33978455089" class="footer-link">+33 9 78 45 50 89</a>
                </div>
                <div class="footer-address-line mt-2">GlobalKey Partners Ltd</div>
                <div class="footer-address-line">128 City Road, London EC1V 2NX</div>
                <div class="footer-address-line">United Kingdom</div>
                <div class="d-flex align-center ga-2 mt-2">
                  <v-icon icon="mdi-clock-outline" size="18" color="white" />
                  <span class="footer-address-line">Lun - Ven: 9h - 18h (CET)</span>
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- Row 3 : Copyright -->
          <v-row>
            <v-col cols="12">
              <div class="footer-copyright">
                <div class="text-center text-body-2">
                  © {{ year }} Global Work Hub. {{ t('layout.footer.copyright') }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </v-footer>

    <!-- Dialog de maintenance -->
    <!-- <v-dialog v-model="maintenanceDialog" max-width="500" persistent>
      <v-card>
        <v-card-title class="d-flex align-center">
          <v-icon icon="mdi-wrench" color="warning" class="mr-3" size="32"></v-icon>
          <span class="text-h6">{{ t('layout.footer.maintenance.title') }}</span>
        </v-card-title>
        <v-card-text class="pt-4">
          <p class="text-body-1">
            {{ t('layout.footer.maintenance.message') }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="flat"
            @click="maintenanceDialog = false"
            class="text-none"
          >
            {{ t('layout.footer.maintenance.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <!-- Dialog de maintenance -->
    <v-dialog v-model="maintenanceDialog" max-width="400" persistent>
      <v-card class="pa-6">
        <div class="text-center">
          <v-icon icon="mdi-cog" size="48" color="primary" class="mb-4" />
          <div class="text-h6 font-weight-bold mb-2">
            {{ t('layout.footer.maintenance.title') }}
          </div>
          <p class="text-body-2 text-medium-emphasis mb-4">
            {{ t('layout.footer.maintenance.message') }}
          </p>
          <v-btn color="primary" variant="flat" block @click="maintenanceDialog = false">
            {{ t('layout.footer.maintenance.close') }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<style scoped>
.public-layout {
  --layout-bg: #f0eef8;
  --active-color: #6b5ae0;
}

@supports (color: oklch(0.5 0.2 0)) {
  .public-layout {
    --active-color: oklch(50% 0.2 290);
  }
}

:deep(.v-application) {
  background: var(--layout-bg) !important;
  min-height: 100vh;
}

.app-gradient {
  background: var(--layout-bg) !important;
}

.main-gradient {
  background: var(--layout-bg) !important;
  min-height: calc(100vh - 72px);
}

.app-bar-modern {
  background: var(--layout-bg) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition:
    background 0.3s ease,
    backdrop-filter 0.3s ease;
}

.app-bar-scrolled {
  background: var(--layout-bg) !important;
  backdrop-filter: blur(12px);
}

.nav-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.nav-left {
  flex-shrink: 0;
}

.logo-btn {
  transition: transform 0.2s ease;
}

.logo-btn:hover {
  transform: scale(1.05);
}

.logo {
  height: 40px;
  border-radius: 12px;
}

.nav-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.nav-link {
  color: #5b6270 !important;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0.3px;
  transition: all 0.2s ease;
  min-width: auto;
  padding: 8px 12px;
}

.nav-link:hover {
  color: #0b0f19 !important;
  background-color: rgba(0, 0, 0, 0.04);
}

.nav-link-active {
  color: var(--active-color) !important;
  font-weight: 600;
  background-color: rgba(107, 90, 224, 0.12) !important;
}

.nav-link-text {
  line-height: 1.2;
  text-align: left;
}

.nav-right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.language-selector {
  min-width: auto;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.language-selector:hover {
  background-color: rgba(0, 0, 0, 0.04);
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

.cta-btn {
  height: 44px;
  padding: 0 24px;
  font-size: 13px;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.cta-btn-left {
  border-radius: 22px 0 0 22px;
}

.cta-btn-right {
  border-radius: 22px;
  background: var(--active-color) !important;
  color: white !important;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.footer-modern {
  background: linear-gradient(175deg, #3d3b52 0%, #35334a 35%, #2d2b42 60%, #252338 100%);
  color: white;
  padding: 0;
  position: relative;
  margin-top: 80px;
  overflow: hidden;
}

.footer-modern::before {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  width: 200%;
  height: 100%;
  background: radial-gradient(
    ellipse 80% 60% at 25% 15%,
    rgba(107, 90, 224, 0.2) 0%,
    rgba(107, 90, 224, 0.06) 40%,
    transparent 70%
  );
  pointer-events: none;
}

.footer-modern::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: -30%;
  width: 150%;
  height: 100%;
  background: radial-gradient(
    ellipse 60% 80% at 75% 85%,
    rgba(255, 122, 60, 0.15) 0%,
    rgba(255, 122, 60, 0.04) 45%,
    transparent 70%
  );
  pointer-events: none;
}

.footer-top-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
  text-align: center;
}

.footer-logo-container {
  flex-shrink: 0;
}

.footer-logo-image {
  height: auto;
  max-width: 200px;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: block;
}

.footer-logo-image:hover {
  transform: translateY(-2px) scale(1.05);
  filter: drop-shadow(0 6px 20px rgba(107, 90, 224, 0.4));
}

.footer-cta-question {
  flex: 1;
  text-align: center;
  min-width: 300px;
}

.footer-cta-question h3 {
  color: white;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 0.6s ease-out;
}

.footer-cta-button {
  flex-shrink: 0;
}

.footer-contact-btn {
  background: linear-gradient(135deg, #ff8550 0%, #ff7a3c 35%, #ff6b35 100%) !important;
  color: white !important;
  padding: 16px 36px;
  border-radius: 10px;
  font-size: 14px;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 20px rgba(255, 122, 60, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.footer-contact-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition:
    width 0.6s ease,
    height 0.6s ease;
}

.footer-contact-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 30px rgba(255, 122, 60, 0.5);
}

.footer-contact-btn:hover::before {
  width: 300px;
  height: 300px;
}

.footer-main-section {
  padding: 56px 0;
  position: relative;
  z-index: 1;
}

.footer-column-header {
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 8px;
}

.footer-column-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #8e7ce8 0%, #ff7a3c 100%);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.footer-column-header:hover::after {
  width: 60px;
}

.footer-link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 14px;
  line-height: 1.8;
  display: inline-block;
  position: relative;
  padding-left: 0;
}

.footer-link::before {
  content: '→';
  position: absolute;
  left: -20px;
  opacity: 0;
  color: #ff7a3c;
  transition: all 0.3s ease;
  transform: translateX(-5px);
}

.footer-link:hover {
  color: #ff7a3c;
  text-decoration: none;
  padding-left: 20px;
  transform: translateX(5px);
}

.footer-link:hover::before {
  opacity: 1;
  transform: translateX(0);
}

.footer-address {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  line-height: 1.8;
}

.footer-address-line {
  color: rgba(255, 255, 255, 0.85);
  transition: all 0.3s ease;
  padding: 4px 0;
}

.footer-address-line:hover {
  color: white;
  transform: translateX(5px);
}

.footer-address .v-icon {
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(255, 122, 60, 0.3));
}

.footer-address a:hover .v-icon {
  transform: scale(1.2);
  filter: drop-shadow(0 2px 8px rgba(255, 122, 60, 0.6));
}

.footer-copyright {
  padding: 24px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;
}

.footer-copyright::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(107, 90, 224, 0.5) 50%, transparent 100%);
}

.footer-copyright .text-body-2 {
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
}

.footer-copyright:hover .text-body-2 {
  color: rgba(255, 255, 255, 0.9);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 960px) {
  .footer-top-content {
    flex-direction: column;
    text-align: center;
    gap: 24px;
  }

  .footer-cta-question {
    min-width: auto;
    width: 100%;
  }

  .footer-logo-container {
    margin: 0 auto;
  }

  .footer-cta-button {
    width: 100%;
  }

  .footer-contact-btn {
    width: 100%;
  }

  .footer-link:hover {
    padding-left: 0;
    transform: none;
  }

  .footer-link::before {
    display: none;
  }
}

.dropdown-menu {
  background: linear-gradient(
    135deg,
    rgba(107, 90, 224, 0.95) 0%,
    rgba(63, 61, 86, 0.98) 100%
  ) !important;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  padding: 8px 0;
  min-width: 260px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  margin-top: 8px;
  backdrop-filter: blur(20px);
  overflow: hidden;
}

.dropdown-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 14px 28px !important;
  min-height: 48px;
  color: rgba(255, 255, 255, 0.85) !important;
  font-size: 14px;
  font-weight: 400;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-left: 4px solid transparent;
  position: relative;
  margin: 2px 8px;
  border-radius: 8px;
}

.dropdown-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: linear-gradient(90deg, rgba(255, 122, 60, 0.2), transparent);
  transition: width 0.3s ease;
  border-radius: 8px 0 0 8px;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.12) !important;
  border-left-color: rgba(107, 90, 224, 0.7);
  padding-left: 24px !important;
  color: #ffffff !important;
  transform: translateX(4px);
}

.dropdown-item:hover::before {
  width: 100%;
}

.dropdown-item-active {
  background: linear-gradient(
    90deg,
    rgba(107, 90, 224, 0.2) 0%,
    rgba(107, 90, 224, 0.08) 100%
  ) !important;
  color: var(--active-color) !important;
  font-weight: 600;
  border-left-color: var(--active-color);
  box-shadow: 0 2px 8px rgba(107, 90, 224, 0.15);
}

.dropdown-item-active::before {
  width: 100%;
  background: linear-gradient(90deg, rgba(107, 90, 224, 0.25), transparent);
}

.dropdown-item :deep(.v-list-item__prepend) {
  display: none;
}

.mobile-menu-btn {
  display: none;
}

.mobile-drawer {
  background: linear-gradient(
    180deg,
    rgba(63, 61, 86, 0.98) 0%,
    rgba(45, 43, 66, 0.95) 50%,
    rgba(35, 33, 56, 1) 100%
  ) !important;
}

.mobile-drawer-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.mobile-menu-list {
  flex: 1;
  overflow-y: auto;
  background: transparent;
  padding: 8px 0;
}

.mobile-menu-list :deep(.v-list-group__items) {
  background: rgba(0, 0, 0, 0.1);
}

.mobile-group-active :deep(.v-list-item__title) {
  color: var(--active-color) !important;
  font-weight: 600;
}

.mobile-menu-item {
  color: rgba(255, 255, 255, 0.85) !important;
  padding: 12px 24px !important;
  min-height: 48px;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.mobile-menu-item:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  border-left-color: rgba(107, 90, 224, 0.7);
  color: #ffffff !important;
}

.mobile-menu-item-active {
  background: linear-gradient(
    90deg,
    rgba(107, 90, 224, 0.2) 0%,
    rgba(107, 90, 224, 0.08) 100%
  ) !important;
  color: var(--active-color) !important;
  font-weight: 600;
  border-left-color: var(--active-color);
}

.mobile-sub-item {
  padding-left: 24px !important;
  font-size: 14px !important;
}

.mobile-language-selector {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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

.mobile-cta-buttons {
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 960px) {
  .mobile-menu-btn {
    display: block !important;
  }

  .nav-container {
    padding: 0 16px;
  }

  .nav-center {
    display: none !important;
  }

  .nav-right {
    display: none !important;
  }
}
</style>
