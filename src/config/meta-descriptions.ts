/**
 * Configuration des meta descriptions pour toutes les pages stratégiques
 * Chaque description doit être entre 150-160 caractères
 * Inclure le mot-clé principal et être orientée bénéfice utilisateur
 */

export interface PageMeta {
  title: string
  description: string
}

export const metaDescriptions: Record<string, PageMeta> = {
  // Page d'accueil
  landing: {
    title: 'Global Work Hub - Recrutement International & Externalisation RH',
    description:
      'Recrutez les meilleurs talents internationaux avec Global Work Hub. Solution complète de recrutement et externalisation RH pour booster votre croissance.',
  },

  // Pages publiques
  why: {
    title: 'Pourquoi Global Work Hub ? - Externalisation RH Fiable',
    description:
      'Découvrez pourquoi Global Work Hub est la solution idéale pour votre externalisation RH. Flexibilité, fiabilité et stabilité pour vos équipes internationales.',
  },
  testimonials: {
    title: 'Témoignages Clients - Global Work Hub',
    description:
      'Découvrez les témoignages de nos clients satisfaits. Global Work Hub transforme le recrutement international avec des résultats concrets et mesurables.',
  },

  // Pages À propos
  mission: {
    title: 'Notre Mission - Global Work Hub',
    description:
      "Notre mission : démocratiser l'accès aux meilleures ressources humaines mondiales. Une troisième voie entre recrutement local et freelancing.",
  },
  methode: {
    title: 'Notre Méthode - Global Work Hub',
    description:
      'Découvrez notre méthode unique de recrutement international. Processus éprouvé pour sélectionner, encadrer et intégrer vos talents en toute simplicité.',
  },

  // Pages Services
  recrutement: {
    title: 'Recrutement International - Global Work Hub',
    description:
      'Recrutement international simplifié. Trouvez et intégrez les meilleurs talents en 15+ pays. Processus rapide, encadré et performant dès le premier jour.',
  },
  'partage-salarial': {
    title: 'Partage Salarial (EOR) - Global Work Hub',
    description:
      "Solution de partage salarial (EOR) pour embaucher à l'international sans créer d'entité. Conformité légale garantie dans 15+ pays.",
  },
  'gestion-de-co': {
    title: 'Gestion de Co-Entreprise - Global Work Hub',
    description:
      "Gérez votre co-entreprise internationale en toute simplicité. Accompagnement complet pour structurer et optimiser vos opérations à l'étranger.",
  },
  'rh-admin': {
    title: 'RH & Administratif - Global Work Hub',
    description:
      "Externalisez votre gestion RH et administrative à l'international. Paie, contrats, conformité : nous gérons tout pour vous concentrer sur votre cœur de métier.",
  },
  conseil: {
    title: 'Accompagnement & Conseil - Global Work Hub',
    description:
      "Bénéficiez de l'expertise de nos consultants RH internationaux. Accompagnement stratégique pour optimiser votre expansion à l'étranger.",
  },

  // Pages Ressources
  blog: {
    title: 'Blog & Conseils - Global Work Hub',
    description:
      "Découvrez nos articles et conseils sur le recrutement international, l'externalisation RH et l'expansion à l'étranger. Actualités et bonnes pratiques.",
  },
  pricing: {
    title: 'Nos Tarifs - Tarification Transparente Tout Inclus | Global Work Hub',
    description:
      'Tarification transparente et tout inclus pour le recrutement international. À partir de 800€/mois, essai 30 jours sans engagement. Devis personnalisé disponible.',
  },
  faq: {
    title: 'FAQ - Questions Fréquentes - Global Work Hub',
    description:
      "Trouvez les réponses à vos questions sur le recrutement international, l'externalisation RH et nos services. FAQ complète et mise à jour régulièrement.",
  },
  privacy: {
    title: 'Politique de Confidentialité - Global Work Hub',
    description:
      "Consultez notre politique de confidentialité. Global Work Hub s'engage à protéger vos données personnelles conformément au RGPD et aux standards internationaux.",
  },
  tarification: {
    title: 'Conditions & Tarification - Global Work Hub',
    description:
      "Découvrez nos conditions et tarifs pour le recrutement international et l'externalisation RH. Transparence totale sur nos services et nos prix.",
  },
  structure: {
    title: 'Structure & Sécurité - Global Work Hub',
    description:
      'En savoir plus sur notre structure sécurisée et notre organisation. Global Work Hub garantit la conformité légale et la protection de vos données.',
  },
  legal: {
    title: 'Mentions Légales - Global Work Hub',
    description:
      'Consultez les mentions légales de Global Work Hub. Informations sur notre société, notre siège social et nos coordonnées officielles.',
  },
  cgu: {
    title: "Conditions Générales d'Utilisation - Global Work Hub",
    description:
      "Lisez nos conditions générales d'utilisation. Règles et modalités d'utilisation de nos services de recrutement international et d'externalisation RH.",
  },
  rgpd: {
    title: 'Politique RGPD - Protection des Données - Global Work Hub',
    description:
      "Notre politique de protection des données personnelles conforme au RGPD. Transparence sur la collecte, l'utilisation et la protection de vos données.",
  },

  // Pages Contact & Auth
  contact: {
    title: 'Contactez-Nous - Global Work Hub',
    description:
      'Contactez notre équipe pour discuter de votre projet de recrutement international. Réponse rapide et accompagnement personnalisé pour votre expansion.',
  },
  login: {
    title: 'Connexion - Espace Client - Global Work Hub',
    description:
      'Connectez-vous à votre espace client Global Work Hub. Accédez à vos missions, talents et tableaux de bord en toute sécurité.',
  },
  register: {
    title: 'Inscription - Rejoignez Global Work Hub',
    description:
      'Créez votre compte Global Work Hub et accédez à nos services de recrutement international. Inscription simple et rapide pour démarrer votre projet.',
  },
}

/**
 * Meta description par défaut si aucune n'est trouvée
 */
export const defaultMeta: PageMeta = {
  title: 'Global Work Hub - Recrutement International & Externalisation RH',
  description:
    'Recrutez les meilleurs talents internationaux avec Global Work Hub. Solution complète de recrutement et externalisation RH pour booster votre croissance.',
}

/**
 * Récupère les meta tags pour une route donnée
 */
export function getMetaForRoute(routeName: string | symbol | null | undefined): PageMeta {
  if (!routeName || typeof routeName !== 'string') {
    return defaultMeta
  }
  return metaDescriptions[routeName] || defaultMeta
}
