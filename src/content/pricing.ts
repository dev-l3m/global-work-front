/**
 * Données de tarification pour Global Work Hub
 * Structure data-driven pour faciliter la maintenance
 */

export interface PricingPlan {
  id: string
  name: string
  priceLabel: string
  description: string
  highlights: string[]
  ctaText: string
  ctaLink: string
  popular?: boolean
}

export interface PricingFeature {
  id: string
  name: string
  description?: string
  plans: {
    [planId: string]: boolean | string // true/false ou texte personnalisé
  }
}

export interface PricingFAQ {
  question: string
  answer: string
}

export interface PricingExample {
  profile: string
  range: string
  description: string
}

export interface PricingAddon {
  name: string
  price: string
  description: string
}

export interface PricingCondition {
  title: string
  description: string
  icon?: string
}

// Plans de tarification
export const pricingPlans: PricingPlan[] = [
  {
    id: 'complete',
    name: 'Forfait Mensuel Complet',
    priceLabel: 'À partir de 800€ / mois',
    description: 'Solution tout inclus pour votre recrutement international',
    highlights: [
      'Recrutement & sourcing illimité',
      'Salaire du talent inclus',
      'Encadrement & management quotidien',
      'Formation continue',
      'Support juridique & administratif',
      'Outils de collaboration',
      'Reporting mensuel',
      'Ajustements possibles',
    ],
    ctaText: 'Obtenir un devis personnalisé',
    ctaLink: '/contactez-nous',
    popular: true,
  },
]

// Features pour le tableau comparatif
export const pricingFeatures: PricingFeature[] = [
  {
    id: 'recruitment',
    name: 'Recrutement & Sourcing',
    description: 'Recherche et sélection de talents',
    plans: {
      complete: true,
    },
  },
  {
    id: 'salary',
    name: 'Salaire du talent',
    description: 'Rémunération mensuelle incluse',
    plans: {
      complete: true,
    },
  },
  {
    id: 'management',
    name: 'Encadrement & Management',
    description: 'Suivi quotidien et accompagnement',
    plans: {
      complete: true,
    },
  },
  {
    id: 'training',
    name: 'Formation continue',
    description: 'Développement des compétences',
    plans: {
      complete: true,
    },
  },
  {
    id: 'legal',
    name: 'Support juridique & Admin',
    description: 'Conformité légale et gestion administrative',
    plans: {
      complete: true,
    },
  },
  {
    id: 'tools',
    name: 'Outils de collaboration',
    description: 'Plateforme et outils de travail',
    plans: {
      complete: true,
    },
  },
  {
    id: 'reporting',
    name: 'Reporting mensuel',
    description: 'Suivi des performances et KPIs',
    plans: {
      complete: true,
    },
  },
  {
    id: 'adjustments',
    name: 'Ajustements possibles',
    description: 'Flexibilité selon vos besoins',
    plans: {
      complete: true,
    },
  },
  {
    id: 'trial',
    name: 'Essai 30 jours',
    description: "Période d'essai sans engagement",
    plans: {
      complete: true,
    },
  },
  {
    id: 'support',
    name: 'Support illimité',
    description: 'Assistance 24/7',
    plans: {
      complete: true,
    },
  },
]

// FAQ Tarifs
export const pricingFAQ: PricingFAQ[] = [
  {
    question: 'Comment est calculé le tarif mensuel ?',
    answer:
      'Le tarif mensuel dépend du profil recherché (compétences, séniorité, langues), de la complexité du poste et de la localisation du talent. Nous proposons des fourchettes transparentes dès le départ et un devis personnalisé après analyse de vos besoins précis.',
  },
  {
    question: "Qu'est-ce qui est inclus dans le forfait mensuel ?",
    answer:
      'Le forfait mensuel "Tout Inclus" comprend : le recrutement et sourcing, le salaire du talent, l\'encadrement et management quotidien, la formation continue, le support juridique et administratif, les outils de collaboration, le reporting mensuel, et la possibilité d\'ajustements selon vos besoins.',
  },
  {
    question: 'Y a-t-il des frais cachés ?',
    answer:
      'Non, notre tarification est 100% transparente. Le prix annoncé inclut tout ce qui est mentionné dans le forfait. Seules les options additionnelles (bureaux partagés, formations spécifiques) sont facturées en supplément et clairement indiquées.',
  },
  {
    question: "Quelle est la durée d'engagement ?",
    answer:
      'Nous proposons un essai de 30 jours sans engagement. Après cette période, vous pouvez continuer avec un engagement mensuel flexible, sans minimum de durée. Vous pouvez ajuster ou arrêter le service avec un préavis de 30 jours.',
  },
  {
    question: "Comment fonctionne l'essai de 30 jours ?",
    answer:
      "L'essai de 30 jours vous permet de tester notre service sans engagement. Vous bénéficiez de tous les services inclus dans le forfait. Si vous n'êtes pas satisfait, vous pouvez arrêter sans frais supplémentaires. Aucune carte bancaire n'est requise pour démarrer l'essai.",
  },
  {
    question: 'Peut-on changer de plan ou ajuster les services ?',
    answer:
      'Oui, notre approche est flexible. Vous pouvez ajuster le nombre de profils, modifier les compétences recherchées, ou ajouter des options supplémentaires à tout moment. Nous adaptons le tarif en conséquence de manière transparente.',
  },
  {
    question: 'Quels sont les délais pour obtenir un devis ?',
    answer:
      'Nous répondons à toutes les demandes de devis sous 24h ouvrées. Pour les besoins urgents, nous pouvons fournir une estimation rapide en quelques heures. Le devis détaillé et personnalisé est généralement disponible sous 48h.',
  },
  {
    question: 'Comment obtenir un devis personnalisé ?',
    answer:
      'Remplissez notre formulaire de contact en précisant vos besoins (profil recherché, compétences, séniorité, langues). Notre équipe vous contacte sous 24h pour discuter de votre projet et vous fournir un devis personnalisé adapté à vos besoins.',
  },
  {
    question: 'Les tarifs varient-ils selon les pays ?',
    answer:
      'Oui, les tarifs peuvent varier selon la localisation du talent en raison des différences de coûts de la vie et de rémunération par pays. Nous vous fournissons des fourchettes transparentes dès le départ et un devis précis selon le pays choisi.',
  },
  {
    question: 'Que se passe-t-il si le talent ne correspond pas à mes attentes ?',
    answer:
      "Pendant l'essai de 30 jours, si le talent ne correspond pas à vos attentes, nous procédons à un remplacement sans frais supplémentaires. Après l'essai, nous garantissons un remplacement sous 30 jours si les performances ne sont pas satisfaisantes.",
  },
]

// Exemples de fourchettes tarifaires
export const pricingExamples: PricingExample[] = [
  {
    profile: 'Assistant virtuel',
    range: '800 - 1 200€ / mois',
    description: 'Selon séniorité, langues maîtrisées et complexité des tâches',
  },
  {
    profile: 'Développeur confirmé',
    range: '1 500 - 2 500€ / mois',
    description: 'Selon stack technique, expérience et langues',
  },
  {
    profile: 'Chargé de marketing',
    range: '1 200 - 1 800€ / mois',
    description: 'Selon spécialisation, outils maîtrisés et langues',
  },
  {
    profile: 'Support client expert',
    range: '1 000 - 1 500€ / mois',
    description: 'Selon langues, outils CRM et séniorité',
  },
]

// Options additionnelles
export const pricingAddons: PricingAddon[] = [
  {
    name: 'Bureaux partagés',
    price: '+200€ / mois',
    description: 'Accès à des espaces de coworking dans nos hubs internationaux',
  },
  {
    name: 'Plateaux privés',
    price: 'Sur devis',
    description: 'Espaces de travail dédiés pour vos équipes',
  },
  {
    name: 'Formation spécifique sur mesure',
    price: 'Sur devis',
    description: 'Programmes de formation adaptés à vos outils et processus',
  },
]

// Conditions et transparence
export const pricingConditions: PricingCondition[] = [
  {
    title: 'Essai 30 jours',
    description: 'Testez notre service sans engagement. Aucune carte bancaire requise.',
    icon: 'mdi-calendar-check',
  },
  {
    title: 'Sans frais cachés',
    description: 'Tarification transparente, tout est inclus dans le prix annoncé.',
    icon: 'mdi-shield-check',
  },
  {
    title: 'Support illimité',
    description: 'Assistance 24/7 pour toutes vos questions et besoins.',
    icon: 'mdi-headset',
  },
  {
    title: 'Flexibilité totale',
    description: 'Ajustements possibles à tout moment selon vos besoins.',
    icon: 'mdi-sync',
  },
]
