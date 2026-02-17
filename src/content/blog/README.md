# Guide d'ajout d'articles de blog

Ce dossier contient tous les articles de blog au format Markdown avec frontmatter YAML.

## Structure d'un article

Chaque article doit être un fichier `.md` avec le format suivant :

```markdown
---
title: "Titre SEO de l'article"
slug: 'slug-url-de-l-article'
description: 'Meta description (150-160 caractères)'
date: '2026-02-17'
category: 'Recrutement'
tags: ['tag1', 'tag2', 'tag3']
cover: '/images/blog/cover-x.webp'
coverAlt: "Description de l'image pour l'accessibilité"
readingTime: 6
---

Contenu de l'article en Markdown...
```

## Champs du frontmatter

- **title** (obligatoire) : Titre SEO de l'article (sera utilisé comme H1)
- **slug** (obligatoire) : URL de l'article (ex: `mon-article` → `/blog/mon-article`)
- **description** (obligatoire) : Meta description (150-160 caractères recommandés)
- **date** (obligatoire) : Date de publication au format `YYYY-MM-DD`
- **category** (obligatoire) : Catégorie de l'article (ex: "Recrutement", "Management", "Digital")
- **tags** (optionnel) : Liste de tags pour le référencement
- **cover** (optionnel) : Chemin vers l'image de couverture (depuis `/public`)
- **coverAlt** (optionnel) : Texte alternatif pour l'image (recommandé pour l'accessibilité)
- **readingTime** (optionnel) : Temps de lecture en minutes (calculé automatiquement si non fourni)

## Format Markdown

Le contenu de l'article utilise le format Markdown standard :

- **H2** (`##`) : Sections principales (apparaissent dans le TOC)
- **H3** (`###`) : Sous-sections (apparaissent dans le TOC)
- **Liens** : `[texte](url)` ou `[texte](/route-interne)`
- **Images** : `![alt](url)`
- **Listes** : `- item` ou `1. item`
- **Code** : `` `code` `` ou blocs de code

## Exemple complet

```markdown
---
title: '5 Avantages du Recrutement International pour les PME'
slug: '5-avantages-recrutement-international-pme'
description: 'Découvrez les 5 avantages clés du recrutement international pour les PME : accès aux talents, réduction des coûts, flexibilité et compétitivité.'
date: '2026-02-15'
category: 'Recrutement'
tags: ['recrutement', 'PME', 'international', 'talents']
cover: '/images/blog/recrutement-international-pme.webp'
coverAlt: 'Équipe internationale travaillant ensemble sur un projet'
readingTime: 6
---

Le recrutement international représente une opportunité majeure...

## 1. Accès à un vivier de talents élargi

L'un des principaux avantages...

### Exemple concret

Une PME française...
```

## Bonnes pratiques SEO

1. **Titre** : Inclure le mot-clé principal, être descriptif (50-60 caractères)
2. **Description** : 150-160 caractères, inclure le mot-clé, être orientée bénéfice
3. **Slug** : Court, descriptif, avec tirets (pas d'accents, pas d'espaces)
4. **Contenu** :
   - Utiliser des H2/H3 pour structurer
   - Inclure le mot-clé principal naturellement
   - Ajouter des liens internes vers d'autres articles
   - Utiliser des images avec ALT descriptifs
5. **Images** :
   - Format WebP recommandé
   - Taille optimisée (< 200KB si possible)
   - Dimensions : 1200x630px pour les images OG

## Ajout d'un nouvel article

1. Créer un nouveau fichier `.md` dans ce dossier
2. Remplir le frontmatter avec toutes les informations
3. Écrire le contenu en Markdown
4. Ajouter l'image de couverture dans `/public/images/blog/`
5. Mettre à jour le sitemap.xml avec la nouvelle URL (optionnel, peut être automatisé)

L'article apparaîtra automatiquement sur `/blog` après le build !

## Catégories disponibles

- **Recrutement** : Articles sur le recrutement international
- **Management** : Gestion d'équipe, leadership
- **Digital** : Technologies, compétences digitales
- **RH** : Ressources humaines, administration
- **Conseil** : Conseils et bonnes pratiques

## Tags recommandés

Utilisez des tags pertinents et cohérents :

- `recrutement`, `international`, `PME`, `talents`
- `management`, `télétravail`, `équipe`, `productivité`
- `digital`, `compétences`, `technologie`, `IA`
- `RH`, `externalisation`, `conseil`
