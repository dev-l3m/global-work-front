# Guide de Contribution

## Vérification de Code Automatique

Ce projet utilise des outils de vérification de code qui s'exécutent automatiquement lors des commits :

### Outils Configurés

- **ESLint** : Analyse statique du code pour détecter les erreurs et problèmes
- **Prettier** : Formatage automatique du code
- **Husky** : Git hooks pour automatiser les vérifications
- **lint-staged** : Exécute les vérifications uniquement sur les fichiers modifiés

### Avant de Committer

Lorsque vous faites un `git commit`, les outils suivants s'exécutent automatiquement :

1. **ESLint** : Vérifie et corrige automatiquement les erreurs de linting
2. **Prettier** : Formate automatiquement le code selon les règles définies

Si des erreurs ne peuvent pas être corrigées automatiquement, le commit sera bloqué.

### Commandes Manuelles

Vous pouvez aussi exécuter les vérifications manuellement :

```bash
# Vérifier le linting (sans corriger)
yarn lint:check

# Corriger automatiquement les erreurs de linting
yarn lint

# Vérifier le formatage (sans corriger)
yarn format:check

# Formater automatiquement le code
yarn format

# Vérifier les types TypeScript
yarn type-check
```

### Configuration

- **ESLint** : `eslint.config.js`
- **Prettier** : `.prettierrc`
- **lint-staged** : Configuration dans `package.json`
- **Husky hooks** : `.husky/pre-commit`

### Règles Principales

- **Vue 3** : Support complet avec règles recommandées
- **TypeScript** : Vérification stricte des types
- **Formatage** : Single quotes, pas de point-virgule, 2 espaces d'indentation
- **Sécurité** : Avertissements pour `v-html` (XSS potentiel)
