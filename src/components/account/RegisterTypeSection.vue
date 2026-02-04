<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const selectedType = ref<string | null>(null)
const showFormStep = ref(false)
const currentStep = ref(1)
const totalSteps = 4

const showForm = computed(() => {
  const type = route.query.type as string
  const profil = route.query.profil as string
  return !!(type || profil) || showFormStep.value
})

// Initialiser le type si présent dans l'URL
if (route.query.type || route.query.profil) {
  selectedType.value = (route.query.type as string) || (route.query.profil as string) || null
  showFormStep.value = true
}

const accountTypes = [
  {
    id: 'entreprise',
    title: 'Une entreprise',
    description:
      "Vous créez un compte pour gérer des employés ou des prestataires au nom d'une entreprise.",
    icon: 'mdi-office-building',
    color: 'primary',
  },
  {
    id: 'agence',
    title: 'Une agence de recrutement / société RH',
    description:
      "Vous vous inscrivez pour gérer les employés et prestataires de vos clients via la plateforme, suivre leurs demandes et gérer les contrats à l'international.",
    icon: 'mdi-briefcase-account',
    color: 'secondary',
  },
]

// Form data - Étape 1: Informations de l'organisation
const formData = ref({
  // Étape 1
  organizationName: '',
  legalForm: '',
  activitySectors: [] as string[],
  otherActivity: '',
  companySize: '',
  otherCompanySize: '',
  country: '',
  city: '',
  website: '',
  // Étape 2
  contactName: '',
  sex: '' as '' | 'femme' | 'homme',
  countryOfOrigin: '',
  contactFunction: '',
  contactPhone: '',
  // Étape 3
  serviceInterest: '',
  otherService: '',
  hasPartner: null as boolean | null,
  // Étape 4
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
  acceptContact: false,
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const errors = ref<Record<string, string>>({})

// Liste complète des pays
const countries = [
  'France',
  'Canada',
  'Madagascar',
  'Suisse',
  'Belgique',
  'Afrique du Sud',
  'Algérie',
  'Angola',
  'Bénin',
  'Botswana',
  'Burkina Faso',
  'Burundi',
  'Cap-Vert',
  'Cameroun',
  'Comores',
  'Congo (Brazzaville)',
  'Congo (Kinshasa)',
  "Côte d'Ivoire",
  'Djibouti',
  'Égypte',
  'Érythrée',
  'Eswatini',
  'Éthiopie',
  'Gabon',
  'Gambie',
  'Ghana',
  'Guinée',
  'Guinée-Bissau',
  'Guinée équatoriale',
  'Kenya',
  'Lesotho',
  'Liberia',
  'Libye',
  'Malawi',
  'Mali',
  'Maroc',
  'Maurice',
  'Mauritanie',
  'Mozambique',
  'Namibie',
  'Niger',
  'Nigeria',
  'Ouganda',
  'République centrafricaine',
  'Rwanda',
  'Sao Tomé-et-Principe',
  'Sénégal',
  'Seychelles',
  'Sierra Leone',
  'Somalie',
  'Soudan',
  'Soudan du Sud',
  'Tanzanie',
  'Tchad',
  'Togo',
  'Tunisie',
  'Zambie',
  'Zimbabwe',
  'Antigua-et-Barbuda',
  'Argentine',
  'Bahamas',
  'Barbade',
  'Belize',
  'Bolivie',
  'Brésil',
  'Chili',
  'Colombie',
  'Costa Rica',
  'Cuba',
  'Dominique',
  'Équateur',
  'États-Unis',
  'Grenade',
  'Guatemala',
  'Guyane',
  'Haïti',
  'Honduras',
  'Jamaïque',
  'Mexique',
  'Nicaragua',
  'Panama',
  'Paraguay',
  'Pérou',
  'République dominicaine',
  'Saint-Christophe-et-Niévès',
  'Sainte-Lucie',
  'Saint-Vincent-et-les-Grenadines',
  'Salvador',
  'Suriname',
  'Trinité-et-Tobago',
  'Uruguay',
  'Venezuela',
  'Afghanistan',
  'Arabie saoudite',
  'Arménie',
  'Azerbaïdjan',
  'Bahreïn',
  'Bangladesh',
  'Bhoutan',
  'Birmanie (Myanmar)',
  'Brunei',
  'Cambodge',
  'Chine',
  'Corée du Nord',
  'Corée du Sud',
  'Émirats arabes unis',
  'Géorgie',
  'Inde',
  'Indonésie',
  'Iran',
  'Irak',
  'Israël',
  'Japon',
  'Jordanie',
  'Kazakhstan',
  'Kirghizistan',
  'Koweït',
  'Laos',
  'Liban',
  'Malaisie',
  'Maldives',
  'Mongolie',
  'Népal',
  'Oman',
  'Ouzbékistan',
  'Pakistan',
  'Palestine',
  'Philippines',
  'Qatar',
  'Singapour',
  'Sri Lanka',
  'Syrie',
  'Tadjikistan',
  'Taïwan',
  'Thaïlande',
  'Timor oriental',
  'Turquie',
  'Turkménistan',
  'Vietnam',
  'Yémen',
  'Albanie',
  'Allemagne',
  'Andorre',
  'Autriche',
  'Bélarus',
  'Bosnie-Herzégovine',
  'Bulgarie',
  'Chypre',
  'Croatie',
  'Danemark',
  'Espagne',
  'Estonie',
  'Finlande',
  'Grèce',
  'Hongrie',
  'Irlande',
  'Islande',
  'Italie',
  'Kosovo',
  'Lettonie',
  'Liechtenstein',
  'Lituanie',
  'Luxembourg',
  'Macédoine du Nord',
  'Malte',
  'Moldavie',
  'Monaco',
  'Monténégro',
  'Norvège',
  'Pays-Bas',
  'Pologne',
  'Portugal',
  'République tchèque',
  'Roumanie',
  'Royaume-Uni',
  'Russie',
  'Saint-Marin',
  'Serbie',
  'Slovaquie',
  'Slovénie',
  'Suède',
  'Ukraine',
  'Vatican',
  'Australie',
  'Fidji',
  'Kiribati',
  'Îles Marshall',
  'Micronésie',
  'Nauru',
  'Nouvelle-Zélande',
  'Palaos',
  'Papouasie-Nouvelle-Guinée',
  'Salomon',
  'Samoa',
  'Tonga',
  'Tuvalu',
  'Vanuatu',
]

// Secteurs d'activité
const activitySectors = ['Services', 'BTP', 'Commerce', 'Santé', 'Formation', 'Autre']

// Tailles d'entreprise
const companySizes = ['1-5', '6-20', '21-50', '+50 salariés', 'Autre']

// Services Global Work Hub (liste détaillée + option Autre)
const gwhServices = [
  'Recrutement international',
  'Partage salarial (EOR)',
  'Gestion de co',
  'RH et administratif',
  'Accompagnement / Conseil',
  'Administration / Services publics',
  'Architecture / Urbanisme / Design',
  'Art / Culture / Audiovisuel / Média',
  'Banque / Assurance / Finance',
  'BTP / Construction / Immobilier',
  'Commerce / Distribution / Vente',
  'Communication / Marketing / Publicité',
  'Conseil / Audit / Stratégie',
  'Éducation / Formation / Enseignement',
  'Énergie / Environnement / Développement durable',
  'Hôtellerie / Restauration / Tourisme',
  'Industrie / Production / Fabrication',
  'Informatique / Télécoms / Numérique',
  'Juridique / Droit / Ressources humaines',
  'Logistique / Transport / Supply Chain',
  'Mode / Artisanat / Design',
  'Pharmaceutique / Santé / Biotechnologies',
  'Recherche / Sciences / Innovation',
  'Sécurité / Défense / Protection',
  'Social / Humanitaire / ONG',
  'Sport / Bien-être / Loisirs',
  'Autre',
]

const canProceed = computed(() => selectedType.value !== null)

// Validation par étape
function validateStep(step: number): boolean {
  errors.value = {}

  if (step === 1) {
    if (!formData.value.organizationName.trim()) {
      errors.value.organizationName = "Le nom de l'organisation est obligatoire"
    }
    if (!formData.value.activitySectors.length) {
      errors.value.activitySectors = "Le secteur d'activité est obligatoire"
    }
    if (formData.value.activitySectors.includes('Autre') && !formData.value.otherActivity.trim()) {
      errors.value.otherActivity = "Veuillez préciser l'autre secteur d'activité"
    }
    if (!formData.value.companySize) {
      errors.value.companySize = "La taille de l'entreprise est obligatoire"
    }
    if (formData.value.companySize === 'Autre' && !formData.value.otherCompanySize.trim()) {
      errors.value.otherCompanySize = "Veuillez préciser la taille de l'entreprise"
    }
    if (!formData.value.country) {
      errors.value.country = 'Le pays est obligatoire'
    }
  } else if (step === 2) {
    if (!formData.value.contactName.trim()) {
      errors.value.contactName = 'Le nom complet du contact est obligatoire'
    }
    if (!formData.value.sex) {
      errors.value.sex = 'Le sexe est obligatoire'
    }
    if (!formData.value.countryOfOrigin) {
      errors.value.countryOfOrigin = "Le pays d'origine est obligatoire"
    }
  } else if (step === 3) {
    if (!formData.value.serviceInterest) {
      errors.value.serviceInterest = 'Veuillez sélectionner un service'
    }
    if (
      (formData.value.serviceInterest === 'Autre' ||
        formData.value.serviceInterest === 'Autre secteur') &&
      !formData.value.otherService.trim()
    ) {
      errors.value.otherService = 'Veuillez préciser votre demande'
    }
    if (formData.value.hasPartner === null) {
      errors.value.hasPartner = 'Veuillez répondre à cette question'
    }
  } else if (step === 4) {
    if (!formData.value.email.trim()) {
      errors.value.email = "L'adresse e-mail est obligatoire"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
      errors.value.email = "L'adresse e-mail n'est pas valide"
    }
    if (!formData.value.password) {
      errors.value.password = 'Le mot de passe est obligatoire'
    } else if (formData.value.password.length < 8) {
      errors.value.password = 'Le mot de passe doit contenir au moins 8 caractères'
    }
    if (!formData.value.confirmPassword) {
      errors.value.confirmPassword = 'La confirmation du mot de passe est obligatoire'
    } else if (formData.value.password !== formData.value.confirmPassword) {
      errors.value.confirmPassword = 'Les mots de passe ne correspondent pas'
    }
    if (!formData.value.acceptTerms) {
      errors.value.acceptTerms = 'Vous devez accepter les conditions'
    }
  }

  return Object.keys(errors.value).length === 0
}

function nextStep() {
  if (selectedType.value && !showFormStep.value) {
    showFormStep.value = true
    return
  }

  if (validateStep(currentStep.value)) {
    if (currentStep.value < totalSteps) {
      currentStep.value++
    } else {
      submit()
    }
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
    errors.value = {}
  } else {
    goBack()
  }
}

function goBack() {
  selectedType.value = null
  showFormStep.value = false
  currentStep.value = 1
  router.push('/inscription')
}

function toggleActivitySector(sector: string) {
  const index = formData.value.activitySectors.indexOf(sector)
  if (index > -1) {
    formData.value.activitySectors.splice(index, 1)
  } else {
    if (sector === 'Autre') {
      formData.value.activitySectors = ['Autre']
    } else {
      formData.value.activitySectors = formData.value.activitySectors.filter(s => s !== 'Autre')
      formData.value.activitySectors.push(sector)
    }
  }
}

async function submit() {
  if (!validateStep(4)) {
    return
  }

  isLoading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    // TODO: Appel API inscription + envoi mail depuis contact@globalworkhub.com
    // TODO: Réception demande sur gestiondeprojets@l3m-holding.fr
    router.push('/connexion?registered=true')
  } catch (err) {
    errors.value.submit = err instanceof Error ? err.message : 'Une erreur est survenue'
  } finally {
    isLoading.value = false
  }
}

function signUpWithGoogle() {
  // TODO: Intégration Google Sign-In (OAuth) pour l'inscription
  router.push('/connexion?signup=google')
}

const progressPercentage = computed(() => (currentStep.value / totalSteps) * 100)
</script>

<template>
  <v-container class="py-16">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Étape 1: Sélection du type de compte -->
        <v-card
          v-if="!showForm"
          class="register-type-card"
          elevation="8"
          v-scroll-animation="{ animation: 'fadeInUp', delay: 0 }"
        >
          <v-card-text class="pa-8">
            <div class="text-h5 font-weight-bold text-center mb-8">
              Vous inscrivez-vous en tant que ?
            </div>

            <v-row class="mb-6">
              <v-col
                v-for="type in accountTypes"
                :key="type.id"
                cols="12"
                md="6"
                v-scroll-animation="{
                  animation: 'scaleIn',
                  delay: type.id === 'entreprise' ? 0.1 : 0.2,
                  threshold: 0.1,
                }"
              >
                <v-card
                  :class="['type-card', { 'type-card-selected': selectedType === type.id }]"
                  :color="selectedType === type.id ? type.color : undefined"
                  :variant="selectedType === type.id ? 'flat' : 'outlined'"
                  elevation="2"
                  @click="selectedType = type.id"
                >
                  <v-card-text class="pa-6 text-center">
                    <v-avatar :color="type.color" variant="flat" size="72" class="mb-4">
                      <v-icon :icon="type.icon" size="36" color="white" />
                    </v-avatar>
                    <div class="text-h6 font-weight-bold mb-3">{{ type.title }}</div>
                    <div class="text-body-2 text-medium-emphasis" style="line-height: 1.6">
                      {{ type.description }}
                    </div>
                    <v-icon
                      v-if="selectedType === type.id"
                      icon="mdi-check-circle"
                      color="white"
                      size="32"
                      class="mt-3"
                    />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <div class="d-flex justify-space-between align-center flex-wrap ga-4">
              <v-btn variant="text" color="primary" class="text-none" to="/connexion">
                <v-icon icon="mdi-arrow-left" class="mr-2" />
                Ou vous avez déjà un compte ? Se connecter
              </v-btn>

              <v-btn
                color="primary"
                size="large"
                class="text-none font-weight-bold"
                :disabled="!canProceed"
                @click="nextStep"
                style="padding: 16px 32px; font-size: 16px"
              >
                Suivant
                <v-icon icon="mdi-arrow-right" class="ml-2" />
              </v-btn>
            </div>
          </v-card-text>
        </v-card>

        <!-- Formulaire multi-étapes -->
        <v-card v-else class="register-form-card" elevation="8">
          <v-card-text class="pa-8">
            <!-- Header avec progression -->
            <div class="mb-6">
              <div class="d-flex align-center mb-2">
                <v-btn
                  v-if="currentStep > 1"
                  icon
                  variant="text"
                  size="small"
                  @click="prevStep"
                  class="mr-2"
                >
                  <v-icon icon="mdi-arrow-left" />
                </v-btn>
                <h2 class="text-h5 font-weight-bold flex-grow-1">Bienvenue chez Global Work Hub</h2>
              </div>
              <p class="text-body-2 text-medium-emphasis mb-4">
                Veuillez saisir vos informations pour créer un compte.
              </p>
              <v-progress-linear
                :model-value="progressPercentage"
                color="primary"
                height="4"
                rounded
                class="mb-2"
              />
              <div class="text-caption text-medium-emphasis text-center">
                Étape {{ currentStep }} sur {{ totalSteps }}
              </div>
            </div>

            <v-form @submit.prevent="nextStep">
              <!-- Étape 1: Informations de l'organisation -->
              <div v-if="currentStep === 1">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.organizationName"
                      label="Nom de l'organisation *"
                      variant="outlined"
                      prepend-inner-icon="mdi-office-building-outline"
                      :error-messages="errors.organizationName"
                      required
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.legalForm"
                      label="Forme juridique (ex: SARL, SAS, auto-entreprise, association...)"
                      variant="outlined"
                      prepend-inner-icon="mdi-file-document-outline"
                    />
                  </v-col>

                  <v-col cols="12">
                    <div class="text-subtitle-2 font-weight-medium mb-2">Secteur d'activité *</div>
                    <div class="d-flex flex-wrap ga-2 mb-2">
                      <v-chip
                        v-for="sector in activitySectors"
                        :key="sector"
                        :color="formData.activitySectors.includes(sector) ? 'primary' : 'default'"
                        :variant="formData.activitySectors.includes(sector) ? 'flat' : 'outlined'"
                        @click="toggleActivitySector(sector)"
                        class="cursor-pointer"
                      >
                        {{ sector }}
                        <v-icon
                          v-if="formData.activitySectors.includes(sector)"
                          icon="mdi-close"
                          size="small"
                          class="ml-1"
                        />
                      </v-chip>
                    </div>
                    <v-text-field
                      v-if="formData.activitySectors.includes('Autre')"
                      v-model="formData.otherActivity"
                      label="Autre activité"
                      variant="outlined"
                      :error-messages="errors.otherActivity"
                      class="mt-2"
                    />
                    <div v-if="errors.activitySectors" class="text-error text-caption mt-1">
                      {{ errors.activitySectors }}
                    </div>
                  </v-col>

                  <v-col cols="12">
                    <v-select
                      v-model="formData.companySize"
                      label="Taille de l'entreprise *"
                      :items="companySizes"
                      variant="outlined"
                      prepend-inner-icon="mdi-account-group-outline"
                      :error-messages="errors.companySize"
                      required
                    />
                    <v-text-field
                      v-if="formData.companySize === 'Autre'"
                      v-model="formData.otherCompanySize"
                      label="Autre entreprise taille"
                      variant="outlined"
                      :error-messages="errors.otherCompanySize"
                      class="mt-2"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-select
                      v-model="formData.country"
                      label="Pays de l'organisation *"
                      :items="countries"
                      variant="outlined"
                      prepend-inner-icon="mdi-map-marker-outline"
                      :error-messages="errors.country"
                      required
                    >
                      <template #prepend-item>
                        <v-list-item title="—Veuillez choisir une option—" disabled />
                        <v-divider />
                      </template>
                    </v-select>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.city"
                      label="Ville / région principale d'activité"
                      variant="outlined"
                      prepend-inner-icon="mdi-city-variant-outline"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.website"
                      label="Site web (facultatif)"
                      variant="outlined"
                      prepend-inner-icon="mdi-web"
                    />
                  </v-col>
                </v-row>
              </div>

              <!-- Étape 2: Informations du contact -->
              <div v-if="currentStep === 2">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.contactName"
                      label="Nom complet du contact *"
                      variant="outlined"
                      prepend-inner-icon="mdi-account-outline"
                      :error-messages="errors.contactName"
                      required
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.sex"
                      label="Sexe *"
                      :items="[
                        { title: 'Femme', value: 'femme' },
                        { title: 'Homme', value: 'homme' },
                      ]"
                      variant="outlined"
                      prepend-inner-icon="mdi-account-outline"
                      :error-messages="errors.sex"
                      required
                    >
                      <template #prepend-item>
                        <v-list-item title="— Choisir —" disabled />
                        <v-divider />
                      </template>
                    </v-select>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.countryOfOrigin"
                      label="Pays d'origine *"
                      :items="countries"
                      variant="outlined"
                      prepend-inner-icon="mdi-earth"
                      :error-messages="errors.countryOfOrigin"
                      required
                    >
                      <template #prepend-item>
                        <v-list-item title="— Choisir un pays —" disabled />
                        <v-divider />
                      </template>
                    </v-select>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.contactFunction"
                      label="Fonction dans l'entreprise (ex: dirigeant, directeur technique, responsable RH, chef de projet, assistant(e) de direction, ...)"
                      variant="outlined"
                      prepend-inner-icon="mdi-briefcase-outline"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.contactPhone"
                      label="Téléphone professionnel (facultatif)"
                      variant="outlined"
                      prepend-inner-icon="mdi-phone-outline"
                      type="tel"
                    />
                  </v-col>
                </v-row>
              </div>

              <!-- Étape 3: Services et expérience -->
              <div v-if="currentStep === 3">
                <v-row>
                  <v-col cols="12">
                    <v-select
                      v-model="formData.serviceInterest"
                      label="Quel service Global Work Hub souhaitez-vous utiliser ? *"
                      :items="gwhServices"
                      variant="outlined"
                      prepend-inner-icon="mdi-star-outline"
                      :error-messages="errors.serviceInterest"
                      required
                    >
                      <template #prepend-item>
                        <v-list-item title="— Veuillez choisir une option —" disabled />
                        <v-divider />
                      </template>
                    </v-select>
                    <v-text-field
                      v-if="formData.serviceInterest === 'Autre'"
                      v-model="formData.otherService"
                      label="Précisez votre demande"
                      placeholder="Décrivez votre besoin si aucune option ne correspond"
                      variant="outlined"
                      :error-messages="errors.otherService"
                      class="mt-2"
                    />
                  </v-col>

                  <v-col cols="12">
                    <div class="text-subtitle-2 font-weight-medium mb-3">
                      Avez-vous déjà collaboré avec un partenaire Global Work ?
                    </div>
                    <v-radio-group
                      v-model="formData.hasPartner"
                      :error-messages="errors.hasPartner"
                    >
                      <v-radio label="Oui" :value="true" />
                      <v-radio label="Non" :value="false" />
                    </v-radio-group>
                  </v-col>
                </v-row>
              </div>

              <!-- Étape 4: Compte et conditions -->
              <div v-if="currentStep === 4">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.email"
                      label="Adresse e-mail *"
                      type="email"
                      variant="outlined"
                      prepend-inner-icon="mdi-email-outline"
                      :error-messages="errors.email"
                      required
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.password"
                      label="Mot de passe *"
                      :type="showPassword ? 'text' : 'password'"
                      variant="outlined"
                      prepend-inner-icon="mdi-lock-outline"
                      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                      :error-messages="errors.password"
                      @click:append-inner="showPassword = !showPassword"
                      required
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.confirmPassword"
                      label="Confirmer le mot de passe *"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      variant="outlined"
                      prepend-inner-icon="mdi-lock-check-outline"
                      :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                      :error-messages="errors.confirmPassword"
                      @click:append-inner="showConfirmPassword = !showConfirmPassword"
                      required
                    />
                  </v-col>

                  <v-col cols="12">
                    <div class="text-subtitle-2 font-weight-medium mb-3">
                      Conditions d'utilisation
                    </div>
                    <v-checkbox
                      v-model="formData.acceptTerms"
                      color="primary"
                      :error="!!errors.acceptTerms"
                    >
                      <template #label>
                        <span>
                          J'accepte les
                          <router-link
                            to="/conditions-generales-utilisation"
                            class="text-primary text-decoration-none"
                            target="_blank"
                          >
                            conditions générales d'utilisation
                          </router-link>
                          et la
                          <router-link
                            to="/politique-de-confidentialite"
                            class="text-primary text-decoration-none"
                            target="_blank"
                          >
                            politique de confidentialité
                          </router-link>
                          de Global Work Hub.
                        </span>
                      </template>
                    </v-checkbox>
                    <div v-if="errors.acceptTerms" class="text-error text-caption mt-1 ml-8">
                      {{ errors.acceptTerms }}
                    </div>
                  </v-col>

                  <v-col cols="12">
                    <div class="text-subtitle-2 font-weight-medium mb-3">Newsletter et contact</div>
                    <v-checkbox v-model="formData.acceptContact" color="primary">
                      <template #label>
                        <span>
                          J'accepte de recevoir les actualités et les communications commerciales de
                          Global Work Hub (newsletter, offres, informations sur les services).
                        </span>
                      </template>
                    </v-checkbox>
                  </v-col>

                  <v-col cols="12">
                    <v-divider class="my-4" />
                    <div class="text-body-2 text-medium-emphasis mb-3">Ou créer un compte avec</div>
                    <v-btn
                      variant="outlined"
                      size="large"
                      block
                      class="google-signup-button text-none"
                      @click="signUpWithGoogle"
                    >
                      <v-icon icon="mdi-google" class="mr-2" />
                      S'inscrire avec Google
                    </v-btn>
                  </v-col>

                  <v-col cols="12">
                    <v-alert
                      v-if="errors.submit"
                      type="error"
                      variant="tonal"
                      density="compact"
                      class="mb-4"
                      closable
                      @click:close="errors.submit = ''"
                    >
                      {{ errors.submit }}
                    </v-alert>
                  </v-col>
                </v-row>
              </div>

              <!-- Boutons de navigation -->
              <div class="d-flex justify-space-between align-center mt-6">
                <v-btn
                  color="secondary"
                  variant="flat"
                  class="text-none font-weight-bold"
                  @click="prevStep"
                >
                  <v-icon icon="mdi-arrow-left" class="mr-2" />
                  Retour
                </v-btn>

                <v-btn
                  v-if="currentStep < totalSteps"
                  color="primary"
                  variant="flat"
                  class="text-none font-weight-bold"
                  @click="nextStep"
                  :loading="isLoading"
                >
                  Suivant
                  <v-icon icon="mdi-arrow-right" class="ml-2" />
                </v-btn>

                <v-btn
                  v-else
                  color="primary"
                  variant="flat"
                  size="large"
                  class="register-button text-none font-weight-bold"
                  @click="submit"
                  :disabled="isLoading"
                  :loading="isLoading"
                >
                  <v-icon icon="mdi-account-plus" class="mr-2" />
                  S'inscrire
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.register-type-card,
.register-form-card {
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(247, 244, 255, 0.95) 100%);
  border: 1px solid rgba(107, 90, 224, 0.1);
  backdrop-filter: blur(10px);
}

.type-card {
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(107, 90, 224, 0.2);
  min-height: 280px;
  display: flex;
  align-items: center;
}

.type-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(107, 90, 224, 0.2);
  border-color: rgba(107, 90, 224, 0.4);
}

.type-card-selected {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 16px 48px rgba(107, 90, 224, 0.3);
  border-color: transparent;
}

.type-card-selected .text-body-2 {
  color: rgba(255, 255, 255, 0.9) !important;
}

.type-card-selected .text-h6 {
  color: white !important;
}

.cursor-pointer {
  cursor: pointer;
}

.register-button {
  background: linear-gradient(135deg, #6b5ae0 0%, #ff7a3c 100%);
  color: white;
  font-weight: bold;
  text-transform: none;
  letter-spacing: 0.5px;
  padding: 16px 32px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.register-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(107, 90, 224, 0.3);
}

.register-button:disabled {
  opacity: 0.6;
}

.google-signup-button {
  border-radius: 12px;
  border: 2px solid rgba(107, 90, 224, 0.2);
  text-transform: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.google-signup-button:hover {
  border-color: rgba(107, 90, 224, 0.4);
  background: rgba(107, 90, 224, 0.05);
}
</style>
