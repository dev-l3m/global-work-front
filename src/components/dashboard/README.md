# Composants tableaux de bord

Chaque section est un composant qui gère **sa propre logique et ses appels service**. Les vues ne font qu’assembler ces composants.

## Tableau de bord client

| Composant                       | Rôle                                                                           | Données / service                                   |
| ------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------- |
| **ClientDashboardHeader**       | Titre, message de bienvenue, bouton « Nouvelle demande »                       | Store auth (email). Émet `newRequest`.              |
| **ClientDashboardStats**        | 4 cartes (talents actifs, demandes en cours, missions terminées, satisfaction) | `fetchStats()` au montage (à remplacer par API).    |
| **ClientDashboardQuickActions** | 4 actions rapides (talent, documents, rapports, support)                       | Liste statique + navigation (router).               |
| **ClientDashboardDemandes**     | Liste « Suivi de mes demandes »                                                | `fetchDemandes()` au montage (à remplacer par API). |
| **ClientDashboardAccountCard**  | Carte « Mon compte » (entreprise, vérifié, membre depuis)                      | Store auth. `memberSince` à brancher sur API.       |

## Tableau de bord collaborateur

| Composant                              | Rôle                                                                     | Données / service                                     |
| -------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------- |
| **CollaborateurDashboardHeader**       | Titre « Mon espace », message de bienvenue, bouton « Voir mon planning » | Store auth. Émet `viewPlanning`.                      |
| **CollaborateurDashboardStats**        | 4 cartes (missions actives, heures/semaine, formations, évaluation)      | `fetchStats()` au montage (à remplacer par API).      |
| **CollaborateurDashboardMissions**     | Liste « Mes missions »                                                   | `fetchMissions()` au montage (à remplacer par API).   |
| **CollaborateurDashboardFormations**   | Liste « Mes formations » + bouton                                        | `fetchFormations()` au montage (à remplacer par API). |
| **CollaborateurDashboardQuickActions** | 4 actions rapides (profil, documents, formations, support)               | Liste statique + navigation (router).                 |

Pour ajouter un appel API : modifier le composant concerné, sans toucher à la vue.
