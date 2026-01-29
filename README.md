# Global Work Hub - Frontend

Front-end moderne et professionnel pour **Global Work Hub**, une plateforme de recrutement international avec accompagnement RH intégré.

🌐 **Site de référence** : [https://global-work-hub.com](https://global-work-hub.com)  
🎨 **Inspiration design** : [1PACT](https://1pact.com/)

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Stack technique](#stack-technique)
- [Fonctionnalités](#fonctionnalités)
- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
- [Développement](#développement)
- [Build et déploiement](#build-et-déploiement)
- [Qualité de code](#qualité-de-code)
- [Documentation](#documentation)

## 🎯 Aperçu

Global Work Hub est une solution complète de recrutement international qui permet aux entreprises de :

- ✅ Recruter des talents internationaux qualifiés
- ✅ Bénéficier d'un accompagnement RH intégré
- ✅ Gérer leurs ressources humaines à l'international
- ✅ Accéder à un réseau de 15+ pays

### Pages principales

- **Landing page** : Page d'accueil avec présentation des services
- **Pourquoi Global Work Hub** : Page détaillant la valeur ajoutée
- **Ce qu'on dit sur nous** : Témoignages clients
- **Espace client** : Dashboard pour les entreprises
- **Espace collaborateur** : Dashboard pour les talents

## 🛠 Stack technique

### Core

- **Vue 3.5** - Framework JavaScript progressif
- **TypeScript 5.9** - Typage statique
- **Vite 7** - Build tool et dev server ultra-rapide
- **Vue Router 4** - Routing côté client
- **Pinia 2** - State management

### UI & Design

- **Vuetify 3** - Framework de composants Material Design
- **Material Design Icons** - Bibliothèque d'icônes (via CDN)
- **Google Fonts** - Inter & Roboto (via CDN)

### Qualité de code

- **ESLint 9** - Linter JavaScript/TypeScript
- **Prettier 3** - Formateur de code
- **Husky 9** - Git hooks
- **lint-staged** - Lint des fichiers modifiés uniquement
- **vue-tsc** - Vérification TypeScript pour Vue

## ✨ Fonctionnalités

### 🎨 Design moderne

- Design inspiré de [1PACT](https://1pact.com/)
- Animations au scroll (Intersection Observer)
- Gradient backgrounds cohérents
- Responsive design (mobile-first)
- Glassmorphism effects
- Transitions fluides

### 🧩 Architecture modulaire

- Composants réutilisables organisés par section
- Structure scalable et maintenable
- Separation of concerns
- Composables pour la logique réutilisable
- Directives personnalisées

### 🔐 Authentification

- Système d'authentification (mode démo avec localStorage)
- Gestion des rôles (Client / Collaborateur)
- Guards de navigation
- Espaces dédiés par rôle

### 📱 Responsive

- Mobile-first approach
- Breakpoints Vuetify
- Navigation adaptative
- Composants flexibles

## 📁 Structure du projet

```
global-work-front/
├── public/                 # Assets statiques
│   └── assets/
│       └── hub-logo.png
├── src/
│   ├── assets/            # Assets du projet
│   ├── components/         # Composants réutilisables
│   │   ├── home/          # Composants page d'accueil
│   │   ├── about/         # Composants "À propos"
│   │   ├── testimonials/  # Composants témoignages
│   │   ├── services/      # Composants services (à venir)
│   │   ├── resources/     # Composants ressources (à venir)
│   │   ├── account/       # Composants compte (à venir)
│   │   └── shared/        # Composants partagés
│   ├── composables/       # Composables Vue réutilisables
│   ├── directives/        # Directives Vue personnalisées
│   ├── layouts/           # Layouts de l'application
│   │   ├── PublicLayout.vue
│   │   └── AppLayout.vue
│   ├── plugins/           # Plugins Vue (Vuetify, etc.)
│   ├── router/            # Configuration Vue Router
│   ├── stores/            # Stores Pinia
│   ├── styles/            # Styles globaux et animations
│   ├── types/             # Types TypeScript
│   ├── views/             # Pages/Vues
│   ├── App.vue            # Composant racine
│   └── main.ts            # Point d'entrée
├── .husky/                # Git hooks
├── dist/                  # Build de production
├── CONTRIBUTING.md        # Guide de contribution
├── eslint.config.js       # Configuration ESLint
├── .prettierrc            # Configuration Prettier
├── package.json
├── tsconfig.json          # Configuration TypeScript
├── vite.config.ts         # Configuration Vite
└── README.md              # Ce fichier
```

> 📖 Voir [src/components/README.md](./src/components/README.md) pour la documentation détaillée des composants.

## 🚀 Installation

### Prérequis

- **Node.js** : LTS (v18 ou supérieur recommandé)
- **Yarn** : 1.x

### Étapes

1. **Cloner le repository**

```bash
git clone <repository-url>
cd global-work-front
```

2. **Installer les dépendances**

```bash
yarn install
```

3. **Lancer le serveur de développement**

```bash
yarn dev --host
```

L'application sera accessible sur `http://localhost:5173`

## 💻 Développement

### Scripts disponibles

```bash
# Développement
yarn dev              # Lance le serveur de dev
yarn dev --host       # Lance avec accès réseau

# Build
yarn build            # Build de production
yarn preview          # Prévisualise le build de production

# Qualité de code
yarn lint             # Lint et corrige automatiquement
yarn lint:check       # Vérifie le linting (sans corriger)
yarn format           # Formate le code avec Prettier
yarn format:check     # Vérifie le formatage
yarn type-check       # Vérifie les types TypeScript
```

### Hot Module Replacement (HMR)

Le projet utilise Vite qui offre un HMR ultra-rapide. Les modifications sont reflétées instantanément dans le navigateur.

### Variables d'environnement

Créer un fichier `.env.local` pour les variables d'environnement :

```env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=Global Work Hub
```

## 🏗 Build et déploiement

### Build de production

```bash
yarn build
```

Le build sera généré dans le dossier `dist/`.

### Optimisations

- **Code splitting** automatique par Vite
- **Tree shaking** pour réduire la taille du bundle
- **Minification** des assets
- **Compression gzip** des fichiers statiques

### Déploiement

Le dossier `dist/` contient tous les fichiers nécessaires pour le déploiement sur n'importe quel serveur web statique :

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Serveur Nginx/Apache

## 🔍 Qualité de code

### Vérification automatique

Le projet utilise **Husky** et **lint-staged** pour exécuter automatiquement les vérifications à chaque commit :

1. **ESLint** : Vérifie et corrige les erreurs de linting
2. **Prettier** : Formate le code automatiquement

Si des erreurs ne peuvent pas être corrigées automatiquement, le commit sera bloqué.

### Configuration

- **ESLint** : `eslint.config.js`
- **Prettier** : `.prettierrc`
- **TypeScript** : `tsconfig.json`

> 📖 Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour plus de détails sur les outils de qualité de code.

### Règles principales

- **Vue 3** : Support complet avec règles recommandées
- **TypeScript** : Vérification stricte des types
- **Formatage** : Single quotes, pas de point-virgule, 2 espaces
- **Sécurité** : Avertissements pour `v-html` (XSS potentiel)

## 📚 Documentation

### Documentation des composants

Voir [src/components/README.md](./src/components/README.md) pour :

- Structure des composants
- Guide d'utilisation
- Exemples de code
- Animations disponibles
- Bonnes pratiques

### Guide de contribution

Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour :

- Processus de contribution
- Standards de code
- Workflow Git
- Outils de qualité

## 🎨 Animations

Le projet utilise un système d'animations inspiré de [1PACT](https://1pact.com/) :

- **Directive `v-scroll-animation`** : Animations déclenchées au scroll
- **Composables** : `useScrollAnimation`, `useStaggerAnimation`
- **Types disponibles** : `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`, `scaleIn`

Exemple :

```vue
<div
  v-scroll-animation="{
    animation: 'fadeInUp',
    delay: 0.2,
    threshold: 0.1,
  }"
>
  Contenu animé
</div>
```

## 🔐 Authentification

L'authentification actuelle est en **mode démo** (stockage `localStorage`) dans `src/stores/auth.ts` pour permettre de valider rapidement les parcours UI.

### Rôles disponibles

- **Client** : Accès à l'espace client (`/espace-client`)
- **Collaborateur** : Accès à l'espace collaborateur (`/espace-collaborateur`)

### Connexion

- Route : `/connexion`
- Sélection du rôle via radio buttons
- Email requis (validation basique)

> ⚠️ **Note** : L'authentification réelle devra être implémentée avec un backend.

## 🛣 Routes

| Route                       | Description             | Layout             |
| --------------------------- | ----------------------- | ------------------ |
| `/`                         | Page d'accueil          | Public             |
| `/pourquoi-global-work-hub` | Page "Pourquoi"         | Public             |
| `/ce-quon-dit-sur-nous`     | Témoignages             | Public             |
| `/connexion`                | Page de connexion       | Public             |
| `/espace-client`            | Dashboard client        | App (auth requise) |
| `/espace-collaborateur`     | Dashboard collaborateur | App (auth requise) |

## 🎯 Prochaines étapes

- [ ] Intégration API backend
- [ ] Authentification réelle (JWT/OAuth)
- [ ] Pages services détaillées
- [ ] Blog/Ressources
- [ ] Internationalisation (i18n)
- [ ] Tests unitaires (Vitest)
- [ ] Tests E2E (Playwright/Cypress)

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez :

1. Lire [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Créer une branche pour votre fonctionnalité
3. Suivre les standards de code
4. Soumettre une pull request

## 📄 Licence

Ce projet est privé et propriétaire de Global Work Hub.

## 📞 Contact

- **Email** : contact@global-work-hub.com
- **Téléphone** : +33 9 78 45 50 89
- **Site web** : [https://global-work-hub.com](https://global-work-hub.com)

---

**Dernière mise à jour** : 2025-01-29  
**Version** : 0.0.0 (développement)
