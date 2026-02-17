/**
 * Données détaillées pour chaque service
 * Structure data-driven pour faciliter la maintenance et l'optimisation SEO
 */

export interface ServiceBenefit {
  title: string
  description: string
  icon: string
}

export interface ServiceUseCase {
  title: string
  description: string
  industry?: string
}

export interface ServiceTestimonial {
  quote: string
  author: string
  role: string
  company: string
  rating: number
}

export interface ServiceData {
  id: string
  name: string
  slug: string
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroSubtitle: string
  description: string
  benefits: ServiceBenefit[]
  useCases: ServiceUseCase[]
  testimonials: ServiceTestimonial[]
  keywords: string[]
  relatedBlogPosts: string[] // slugs d'articles de blog
  ctaText: string
  ctaLink: string
}

// Service : Recrutement International
export const recrutementService: ServiceData = {
  id: 'recrutement',
  name: 'Recrutement International',
  slug: 'recrutement',
  metaTitle:
    'Recrutement International Simplifié - Trouvez les Meilleurs Talents | Global Work Hub',
  metaDescription:
    'Recrutement international simplifié pour PME et startups. Trouvez et intégrez les meilleurs talents en 15+ pays. Processus rapide, encadré et performant dès le premier jour.',
  heroTitle: 'Recrutement international simplifié',
  heroSubtitle:
    "Trouvez et intégrez les meilleurs talents internationaux en quelques semaines. Du sourcing à l'intégration, nous gérons tout pour vous.",
  description:
    "Notre service de recrutement international vous permet d'accéder à un vivier de talents élargi dans 15+ pays. Nous gérons l'ensemble du processus : sourcing, présélection, tests techniques, entretiens, onboarding et suivi opérationnel. Chaque talent est encadré et formé pour s'intégrer rapidement dans vos équipes.",
  benefits: [
    {
      title: 'Accès à un vivier élargi',
      description:
        'Accédez aux meilleurs talents dans 15+ pays, sans vous limiter à votre marché local.',
      icon: 'mdi-earth',
    },
    {
      title: 'Processus rapide',
      description: "Délais réduits : de la recherche à l'intégration en 2-4 semaines.",
      icon: 'mdi-speedometer',
    },
    {
      title: 'Encadrement complet',
      description:
        "Chaque talent bénéficie d'un encadrement RH quotidien et d'une formation continue.",
      icon: 'mdi-account-supervisor',
    },
    {
      title: 'Réduction des coûts',
      description: "Jusqu'à 40% d'économies sur les coûts salariaux tout en maintenant la qualité.",
      icon: 'mdi-cash-multiple',
    },
    {
      title: 'Conformité garantie',
      description:
        "Conformité légale et administrative garantie dans tous les pays d'intervention.",
      icon: 'mdi-shield-check',
    },
    {
      title: 'Reporting mensuel',
      description: 'Suivi des performances et KPIs avec reporting mensuel détaillé.',
      icon: 'mdi-chart-line',
    },
  ],
  useCases: [
    {
      title: 'PME en croissance',
      description:
        'Une PME française spécialisée dans le développement logiciel recrute une équipe de 5 développeurs en Pologne. Résultat : économie de 40% sur les coûts salariaux, intégration en 3 semaines, taux de rétention de 100%.',
      industry: 'Tech / SaaS',
    },
    {
      title: 'Startup scale-up',
      description:
        "Une startup en phase de scale-up recrute 10 profils marketing et support client en 2 mois. L'encadrement quotidien garantit une intégration rapide et une performance immédiate.",
      industry: 'E-commerce',
    },
    {
      title: 'Expansion internationale',
      description:
        'Une entreprise française souhaite tester un nouveau marché en recrutant une équipe locale encadrée, sans créer de filiale. Solution flexible et rapide.',
      industry: 'Services',
    },
  ],
  testimonials: [
    {
      quote:
        'Global Work Hub a transformé notre approche du recrutement international. En quelques semaines, nous avons pu déployer une équipe complète de développeurs qualifiés. Leur accompagnement RH est remarquable.',
      author: 'Sophie Martin',
      role: 'Directrice RH',
      company: 'TechCorp France',
      rating: 5,
    },
    {
      quote:
        "La flexibilité et la réactivité de Global Work Hub sont exceptionnelles. Nous avons pu ajuster nos effectifs rapidement selon nos besoins, sans les contraintes du recrutement local. Un vrai gain de temps et d'argent.",
      author: 'Marc Dubois',
      role: 'CEO',
      company: 'StartupInnov',
      rating: 5,
    },
  ],
  keywords: [
    'recrutement international',
    'externalisation recrutement',
    'recrutement talents internationaux',
    'sourcing international',
    'recrutement PME',
    'recrutement startup',
  ],
  relatedBlogPosts: [
    '5-avantages-recrutement-international-pme',
    'manager-equipe-distance-best-practices',
  ],
  ctaText: 'Démarrer votre recrutement',
  ctaLink: '/contactez-nous',
}

// Service : Partage Salarial (EOR)
export const partageSalarialService: ServiceData = {
  id: 'partage-salarial',
  name: 'Partage Salarial (EOR)',
  slug: 'partage-salarial',
  metaTitle:
    "Partage Salarial International (EOR) - Embaucher sans Créer d'Entité | Global Work Hub",
  metaDescription:
    "Solution de partage salarial (EOR) pour embaucher à l'international sans créer d'entité. Conformité légale garantie dans 15+ pays. Un seul interlocuteur pour tous vos besoins.",
  heroTitle: 'Partage salarial et rémunération internationale',
  heroSubtitle:
    "Embauchez à l'international sans créer d'entité. Nous gérons la conformité légale, la paie et les obligations administratives dans 15+ pays.",
  description:
    "Le partage salarial (EOR - Employer of Record) vous permet d'embaucher des talents internationaux sans créer de filiale dans chaque pays. Nous agissons comme employeur légal, gérons la paie, les cotisations sociales et la conformité juridique. Vous vous concentrez sur votre cœur de métier, nous gérons le reste.",
  benefits: [
    {
      title: "Sans création d'entité",
      description:
        "Embauchez dans 15+ pays sans créer de filiale. Gain de temps et d'argent considérable.",
      icon: 'mdi-office-building-outline',
    },
    {
      title: 'Conformité garantie',
      description:
        'Conformité légale et fiscale garantie dans tous les pays. Nous respectons toutes les réglementations locales.',
      icon: 'mdi-gavel',
    },
    {
      title: 'Gestion centralisée',
      description:
        'Un seul interlocuteur pour tous vos besoins : paie, contrats, administration dans tous les pays.',
      icon: 'mdi-view-dashboard',
    },
    {
      title: 'Rapidité de déploiement',
      description: 'Déploiement en quelques jours, sans les délais administratifs habituels.',
      icon: 'mdi-rocket-launch',
    },
    {
      title: 'Réduction des risques',
      description:
        'Réduction des risques juridiques et fiscaux grâce à notre expertise internationale.',
      icon: 'mdi-shield-lock',
    },
    {
      title: 'Flexibilité',
      description:
        'Ajustez vos effectifs rapidement selon vos besoins, sans contraintes administratives.',
      icon: 'mdi-sync',
    },
  ],
  useCases: [
    {
      title: 'Test de marché',
      description:
        'Une entreprise française teste un nouveau marché en embauchant 3 commerciaux via EOR. Après 6 mois de test réussi, création de la filiale avec équipe déjà formée.',
      industry: 'Commerce',
    },
    {
      title: 'Expansion rapide',
      description:
        "Une startup tech embauche 15 développeurs dans 5 pays différents en 2 mois, sans créer d'entités. Gain de temps et de coûts considérable.",
      industry: 'Tech',
    },
  ],
  testimonials: [
    {
      quote:
        "Le partage salarial nous a permis de tester plusieurs marchés rapidement sans les contraintes administratives. Un vrai gain de temps et d'argent.",
      author: 'Julie Bernard',
      role: 'Responsable Opérations',
      company: 'E-commerce Pro',
      rating: 5,
    },
  ],
  keywords: [
    'partage salarial',
    'EOR',
    'employer of record',
    'embauche internationale',
    'portage salarial international',
    'conformité internationale',
  ],
  relatedBlogPosts: ['5-avantages-recrutement-international-pme'],
  ctaText: 'Découvrir le partage salarial',
  ctaLink: '/contactez-nous',
}

// Service : Gestion de Co-Entreprise
export const gestionCoService: ServiceData = {
  id: 'gestion-de-co',
  name: 'Gestion de Co-Entreprise',
  slug: 'gestion-de-co',
  metaTitle:
    'Gestion de Co-Entreprise Internationale - Structuration & Optimisation | Global Work Hub',
  metaDescription:
    "Gérez votre co-entreprise internationale en toute simplicité. Accompagnement complet pour structurer et optimiser vos opérations à l'étranger.",
  heroTitle: 'Gestion de co-entreprise internationale',
  heroSubtitle:
    "Structurez et optimisez vos opérations à l'étranger avec notre accompagnement complet en gestion de co-entreprise.",
  description:
    "Notre service de gestion de co-entreprise vous accompagne dans la structuration et l'optimisation de vos opérations internationales. Nous vous aidons à créer, gérer et développer votre co-entreprise dans le respect des réglementations locales.",
  benefits: [
    {
      title: 'Structuration optimale',
      description:
        'Structuration juridique et fiscale optimisée selon vos besoins et les réglementations locales.',
      icon: 'mdi-sitemap',
    },
    {
      title: 'Accompagnement complet',
      description:
        'Accompagnement de A à Z : création, gestion opérationnelle, optimisation fiscale et juridique.',
      icon: 'mdi-handshake',
    },
    {
      title: 'Réduction des coûts',
      description:
        'Optimisation fiscale et réduction des coûts administratifs grâce à notre expertise.',
      icon: 'mdi-cash',
    },
  ],
  useCases: [
    {
      title: 'Création de co-entreprise',
      description:
        'Une entreprise française crée une co-entreprise en Pologne avec notre accompagnement. Structuration optimisée, économies fiscales, opérationnelle en 2 mois.',
      industry: 'Manufacturing',
    },
  ],
  testimonials: [],
  keywords: [
    'gestion co-entreprise',
    'co-entreprise internationale',
    'structuration internationale',
    'optimisation fiscale',
  ],
  relatedBlogPosts: [],
  ctaText: 'En savoir plus',
  ctaLink: '/contactez-nous',
}

// Service : RH & Administratif
export const rhAdminService: ServiceData = {
  id: 'rh-admin',
  name: 'RH & Administratif',
  slug: 'rh-et-administratif',
  metaTitle:
    'Externalisation RH & Administrative - Gestion Complète Internationale | Global Work Hub',
  metaDescription:
    "Externalisez votre gestion RH et administrative à l'international. Paie, contrats, conformité : nous gérons tout pour vous concentrer sur votre cœur de métier.",
  heroTitle: 'Externalisation RH et services administratifs',
  heroSubtitle:
    'Déléguez toute votre gestion RH et administrative à nos experts. Paie, contrats, conformité : nous gérons tout pour vous.',
  description:
    "Notre service d'externalisation RH et administrative vous permet de déléguer toute la gestion opérationnelle de vos équipes internationales. Paie, contrats, conformité légale, reporting : nous gérons tout pour que vous puissiez vous concentrer sur votre cœur de métier.",
  benefits: [
    {
      title: 'Gestion complète',
      description:
        'Gestion complète de la paie, des contrats, des cotisations sociales et de la conformité légale.',
      icon: 'mdi-file-document-multiple',
    },
    {
      title: 'Conformité garantie',
      description: "Conformité légale et fiscale garantie dans tous les pays d'intervention.",
      icon: 'mdi-shield-check',
    },
    {
      title: 'Gain de temps',
      description:
        'Libérez votre équipe RH pour se concentrer sur la stratégie et le développement.',
      icon: 'mdi-clock-outline',
    },
    {
      title: 'Réduction des coûts',
      description:
        'Réduction des coûts administratifs grâce à notre expertise et nos outils optimisés.',
      icon: 'mdi-cash-multiple',
    },
    {
      title: 'Reporting détaillé',
      description: 'Reporting mensuel détaillé sur toutes les activités RH et administratives.',
      icon: 'mdi-chart-box',
    },
  ],
  useCases: [
    {
      title: 'PME en croissance',
      description:
        'Une PME délègue toute sa gestion RH internationale à Global Work Hub. Gain de temps de 80%, réduction des coûts administratifs de 30%.',
      industry: 'Services',
    },
  ],
  testimonials: [
    {
      quote:
        "L'externalisation RH nous a permis de nous concentrer sur notre croissance. La gestion administrative est impeccable et nous avons une totale confiance.",
      author: 'Marie Dupont',
      role: 'CFO',
      company: 'FinanceGroup',
      rating: 5,
    },
  ],
  keywords: [
    'externalisation RH',
    'gestion RH internationale',
    'paie internationale',
    'administration RH',
    'conformité RH',
  ],
  relatedBlogPosts: ['manager-equipe-distance-best-practices'],
  ctaText: 'Découvrir nos services RH',
  ctaLink: '/contactez-nous',
}

// Service : Accompagnement & Conseil
export const conseilService: ServiceData = {
  id: 'conseil',
  name: 'Accompagnement & Conseil',
  slug: 'accompagnement-conseil',
  metaTitle: 'Accompagnement & Conseil RH International - Expertise Stratégique | Global Work Hub',
  metaDescription:
    "Bénéficiez de l'expertise de nos consultants RH internationaux. Accompagnement stratégique pour optimiser votre expansion à l'étranger.",
  heroTitle: 'Conseil et accompagnement stratégique',
  heroSubtitle:
    "Bénéficiez de l'expertise de nos consultants RH internationaux pour optimiser votre expansion à l'étranger.",
  description:
    "Notre service d'accompagnement et de conseil vous apporte l'expertise nécessaire pour réussir votre expansion internationale. Nos consultants RH vous accompagnent dans la définition de votre stratégie, l'optimisation de vos processus et la résolution de vos défis opérationnels.",
  benefits: [
    {
      title: 'Expertise stratégique',
      description: 'Accompagnement par des consultants RH experts en expansion internationale.',
      icon: 'mdi-lightbulb-on',
    },
    {
      title: 'Optimisation des processus',
      description:
        'Optimisation de vos processus RH et opérationnels pour maximiser la performance.',
      icon: 'mdi-cog',
    },
    {
      title: 'Résolution de problèmes',
      description: 'Résolution rapide de vos défis opérationnels grâce à notre expertise terrain.',
      icon: 'mdi-puzzle',
    },
  ],
  useCases: [
    {
      title: "Stratégie d'expansion",
      description:
        "Une entreprise française bénéficie d'un accompagnement stratégique pour son expansion en Europe de l'Est. Stratégie optimisée, déploiement réussi en 3 mois.",
      industry: 'Services',
    },
  ],
  testimonials: [],
  keywords: [
    'conseil RH international',
    'accompagnement expansion',
    'consultant RH',
    'stratégie internationale',
  ],
  relatedBlogPosts: ['manager-equipe-distance-best-practices'],
  ctaText: 'Demander un conseil',
  ctaLink: '/contactez-nous',
}

// Export de tous les services
export const allServices: ServiceData[] = [
  recrutementService,
  partageSalarialService,
  gestionCoService,
  rhAdminService,
  conseilService,
]

// Helper pour récupérer un service par slug
export function getServiceBySlug(slug: string): ServiceData | undefined {
  return allServices.find(service => service.slug === slug)
}
