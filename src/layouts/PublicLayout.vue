<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeaderLanding from '@/components/layout/HeaderLanding.vue'

const router = useRouter()
const route = useRoute()

const isLandingPage = computed(() => route.path === '/')

const menuAccueil = ref(false)
const menuAPropos = ref(false)
const menuServices = ref(false)
const menuRessources = ref(false)
const menuCompte = ref(false)
const isScrolled = ref(false)
const mobileMenu = ref(false)

const isAccueilActive = () => {
  // Accueil est actif sur la page d'accueil et ses sous-pages
  return (
    route.path === '/' ||
    route.path === '/pourquoi-global-work-hub' ||
    route.path === '/ce-quon-dit-sur-nous'
  )
}

const isAProposActive = () => {
  // À propos est actif sur les pages Notre mission et Notre méthode
  return route.path === '/notre-mission' || route.path === '/notre-methode'
}

const isDropdownItemActive = (to: string) => {
  if (to.startsWith('/#')) {
    const hash = to.substring(1)
    return route.hash === hash || (route.path === '/' && route.hash === hash)
  }
  if (to === '/') return route.path === '/'
  // Connexion et inscription : un seul actif selon la page (pas les deux)
  if (to === '/connexion') return route.path === '/connexion'
  if (to === '/inscription') return route.path === '/inscription'
  return route.path === to || route.path.startsWith(to)
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
  router.push('/connexion?role=client')
  mobileMenu.value = false
}

function goToContact() {
  router.push('/contactez-nous')
  mobileMenu.value = false
}

const year = new Date().getFullYear()
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
              @click="router.push('/')"
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
                  Accueil
                  <v-icon icon="mdi-chevron-down" size="16" class="ml-1" />
                </v-btn>
              </template>
              <v-list class="dropdown-menu">
                <!-- <v-list-item
                to="/"
                :class="['dropdown-item', { 'dropdown-item-active': isDropdownItemActive('/') }]"
              >
                Accueil
              </v-list-item> -->
                <v-list-item
                  to="/pourquoi-global-work-hub"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/pourquoi-global-work-hub') },
                  ]"
                >
                  Pourquoi Global Work Hub
                </v-list-item>
                <v-list-item
                  to="/ce-quon-dit-sur-nous"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/ce-quon-dit-sur-nous') },
                  ]"
                >
                  Ce qu'on dit sur nous
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
                  <span class="nav-link-text">À propos</span>
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
                  Notre mission
                </v-list-item>
                <v-list-item
                  to="/notre-methode"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/notre-methode') },
                  ]"
                >
                  Notre méthode
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
                  <span class="nav-link-text">Nos services</span>
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
                  Recrutement international
                </v-list-item>
                <v-list-item
                  to="/partage-salarial"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/partage-salarial') },
                  ]"
                >
                  Partage salarial (EOR)
                </v-list-item>
                <v-list-item
                  to="/gestion-de-co"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/gestion-de-co') },
                  ]"
                >
                  Gestion de co
                </v-list-item>
                <v-list-item
                  to="/rh-et-administratif"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/rh-et-administratif') },
                  ]"
                >
                  RH & administratif
                </v-list-item>
                <v-list-item
                  to="/accompagnement-conseil"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/accompagnement-conseil') },
                  ]"
                >
                  Accompagnement / Conseil
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
                  <span class="nav-link-text">Ressources</span>
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
                  Nouveautés / Blog
                </v-list-item>
                <v-list-item
                  to="/faq"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/faq') },
                  ]"
                >
                  FAQ
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
                  Politique de confidentialité
                </v-list-item>
                <v-list-item
                  to="/conditions-tarification"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/conditions-tarification') },
                  ]"
                >
                  Conditions & Tarification
                </v-list-item>
                <v-list-item
                  to="/structure-securite"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/structure-securite') },
                  ]"
                >
                  Structure & Sécurité
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
                  <span class="nav-link-text">Mon compte</span>
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
                  Se connecter
                </v-list-item>
                <v-list-item
                  to="/inscription"
                  :class="[
                    'dropdown-item',
                    { 'dropdown-item-active': isDropdownItemActive('/inscription') },
                  ]"
                >
                  S'inscrire
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

          <div class="nav-right d-none d-md-flex">
            <v-btn
              color="success"
              variant="flat"
              class="cta-btn cta-btn-left text-none font-weight-bold"
              @click="router.push('/inscription')"
            >
              Espace client
            </v-btn>
            <v-btn
              color="secondary"
              variant="flat"
              class="cta-btn cta-btn-right text-none font-weight-bold"
              @click="router.push('/contactez-nous')"
            >
              Contactez-nous
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
                  <v-list-item-title>Accueil</v-list-item-title>
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
                <v-list-item-title class="mobile-sub-item"
                  >Pourquoi Global Work Hub</v-list-item-title
                >
              </v-list-item>
              <v-list-item
                :to="'/ce-quon-dit-sur-nous'"
                :class="[
                  'mobile-menu-item',
                  { 'mobile-menu-item-active': isDropdownItemActive('/ce-quon-dit-sur-nous') },
                ]"
                @click="mobileMenu = false"
              >
                <v-list-item-title class="mobile-sub-item">Ce qu'on dit sur nous</v-list-item-title>
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
                  <v-list-item-title>À propos</v-list-item-title>
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
                <v-list-item-title class="mobile-sub-item">Notre mission</v-list-item-title>
              </v-list-item>
              <v-list-item
                :to="'/notre-methode'"
                :class="[
                  'mobile-menu-item',
                  { 'mobile-menu-item-active': isDropdownItemActive('/notre-methode') },
                ]"
                @click="mobileMenu = false"
              >
                <v-list-item-title class="mobile-sub-item">Notre méthode</v-list-item-title>
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
                  <v-list-item-title>Nos services</v-list-item-title>
                </v-list-item>
              </template>
              <v-list-item
                v-for="service in [
                  { to: '/recrutement', label: 'Recrutement international' },
                  { to: '/partage-salarial', label: 'Partage salarial (EOR)' },
                  { to: '/gestion-de-co', label: 'Gestion de co' },
                  { to: '/rh-et-administratif', label: 'RH & administratif' },
                  { to: '/accompagnement-conseil', label: 'Accompagnement / Conseil' },
                ]"
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
                  <v-list-item-title>Ressources</v-list-item-title>
                </v-list-item>
              </template>
              <v-list-item
                v-for="resource in [
                  { to: '/blog-conseils', label: 'Nouveautés / Blog' },
                  { to: '/faq', label: 'FAQ' },
                  { to: '/politique-de-confidentialite', label: 'Politique de confidentialité' },
                  { to: '/conditions-tarification', label: 'Conditions & Tarification' },
                  { to: '/structure-securite', label: 'Structure & Sécurité' },
                  { to: '/mentions-legales', label: 'Mentions légales' },
                  { to: '/conditions-generales-utilisation', label: 'CGU' },
                  { to: '/politique-de-protection-des-donnees-personnelles', label: 'RGPD' },
                ]"
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
                  <v-list-item-title>Mon compte</v-list-item-title>
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
                <v-list-item-title class="mobile-sub-item">Se connecter</v-list-item-title>
              </v-list-item>
              <v-list-item
                :to="'/inscription'"
                :class="[
                  'mobile-menu-item',
                  { 'mobile-menu-item-active': isDropdownItemActive('/inscription') },
                ]"
                @click="mobileMenu = false"
              >
                <v-list-item-title class="mobile-sub-item">S'inscrire</v-list-item-title>
              </v-list-item>
            </v-list-group>
          </v-list>

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
              Espace client
            </v-btn>
            <v-btn
              color="secondary"
              variant="flat"
              block
              size="large"
              class="text-none font-weight-bold"
              @click="goToContact"
            >
              Contactez-nous
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
                    Prêt à accélérer votre croissance internationale ?
                  </h3>
                  <p class="text-body-2 mt-2 mb-0" style="opacity: 0.9">
                    Le monde est votre vivier de talents. Nous transformons votre vision en équipes
                    performantes.
                  </p>
                </div>
                <div class="footer-cta-button">
                  <v-btn
                    color="secondary"
                    variant="flat"
                    size="large"
                    class="footer-contact-btn text-none font-weight-bold"
                    @click="router.push('/contactez-nous')"
                  >
                    Contactez-nous
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- Row 2 : 4 colonnes de liens -->
          <v-row class="footer-main-section">
            <v-col cols="12" sm="6" md="3">
              <div class="footer-column-header mb-4">Ressources</div>
              <div class="d-flex flex-column ga-3">
                <router-link to="/blog-conseils" class="footer-link">Notre blog</router-link>
                <router-link to="/faq" class="footer-link">FAQ</router-link>
              </div>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <div class="footer-column-header mb-4">Mentions et politiques</div>
              <div class="d-flex flex-column ga-3">
                <router-link to="/mentions-legales" class="footer-link"
                  >Mentions légales</router-link
                >
                <router-link to="/politique-de-confidentialite" class="footer-link"
                  >Politique de confidentialité</router-link
                >
                <router-link to="/conditions-generales-utilisation" class="footer-link"
                  >CGU</router-link
                >
                <router-link
                  to="/politique-de-protection-des-donnees-personnelles"
                  class="footer-link"
                  >RGPD</router-link
                >
              </div>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <div class="footer-column-header mb-4">Nos coordonnées</div>
              <div class="d-flex flex-column ga-3">
                <router-link to="/notre-mission" class="footer-link">Qui sommes-nous</router-link>
                <a href="/notre-mission" class="footer-link">Nos services</a>
                <router-link to="/notre-methode" class="footer-link">Notre méthode</router-link>
              </div>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <div class="footer-column-header mb-4">Contact</div>
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
                  © {{ year }} Global Work Hub. Tous droits réservés.
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </v-footer>
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
  gap: 8px;
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
