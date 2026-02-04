# Organisation des vues (`src/views`)

Les vues sont regroupées par domaine pour faciliter la maintenance et éviter la confusion à long terme.

## Structure des dossiers

| Dossier        | Rôle                                        | Exemples                                                       |
| -------------- | ------------------------------------------- | -------------------------------------------------------------- |
| **public/**    | Pages d'accueil et contenu public (vitrine) | Landing, Pourquoi GWH, Témoignages                             |
| **about/**     | Pages « À propos »                          | Notre mission, Notre méthode                                   |
| **services/**  | Pages de présentation des services          | Recrutement, Partage salarial, Gestion de co, RH, Conseil      |
| **resources/** | Ressources, blog, FAQ, pages légales        | Blog, FAQ, Confidentialité, CGU, RGPD, Tarification, Structure |
| **contact/**   | Page contact                                | Contactez-nous                                                 |
| **auth/**      | Connexion et inscription                    | Login, Register                                                |
| **dashboard/** | Espaces connectés (après authentification)  | Tableau de bord client, Tableau de bord collaborateur          |

## Où ajouter une nouvelle vue ?

- **Nouvelle page vitrine (accueil, témoignages, etc.)** → `public/`
- **Nouvelle page « À propos »** → `about/`
- **Nouvelle page service** → `services/`
- **Nouvelle page ressource (blog, légal, FAQ, etc.)** → `resources/`
- **Page contact ou formulaire dédié** → `contact/`
- **Page de connexion / inscription / mot de passe** → `auth/`
- **Nouvelle page d'espace connecté** → `dashboard/`

Après avoir créé ou déplacé une vue, mettre à jour le routeur dans `src/router/index.ts` avec le bon chemin d'import (ex. `@/views/public/MaNouvelleView.vue`).
