import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import type { BlogPost, BlogPostFrontmatter } from '@/types/blog'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

/**
 * Charge tous les fichiers markdown du dossier blog
 */
async function loadBlogPosts(): Promise<BlogPost[]> {
  // Import dynamique de tous les fichiers markdown comme texte brut
  const modules = import.meta.glob<string>('@/content/blog/*.md?raw', {
    eager: true,
  })

  const posts: BlogPost[] = []

  for (const path in modules) {
    // Exclure README.md
    if (path.includes('README.md')) {
      continue
    }

    const content = modules[path]
    if (!content) {
      console.warn(`Module invalide ignoré: ${path}`)
      continue
    }
    const { data, content: markdownContent } = matter(content)

    // Validation du frontmatter
    if (!data.slug || !data.title) {
      console.warn(`Article invalide ignoré: ${path} (slug ou title manquant)`)
      continue
    }

    // Rendu du markdown en HTML
    const html = md.render(markdownContent)

    // Extraction des headings pour le TOC
    const headings = extractHeadings(html)

    // Calcul du temps de lecture si non fourni
    const readingTime = data.readingTime || calculateReadingTime(markdownContent)

    const post: BlogPost = {
      slug: data.slug,
      title: data.title,
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      category: data.category || 'Non catégorisé',
      tags: Array.isArray(data.tags) ? data.tags : [],
      cover: data.cover || '',
      coverAlt: data.coverAlt || data.title,
      readingTime,
      content: html,
      headings,
      frontmatter: data as BlogPostFrontmatter,
    }

    posts.push(post)
  }

  // Trier par date (plus récent en premier)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Extrait les headings (H2, H3) du HTML pour générer le TOC
 */
function extractHeadings(html: string): Array<{ id: string; text: string; level: number }> {
  const headings: Array<{ id: string; text: string; level: number }> = []
  const headingRegex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi
  let match

  while ((match = headingRegex.exec(html)) !== null) {
    if (!match[1] || !match[2]) continue
    const level = parseInt(match[1], 10)
    const text = match[2].replace(/<[^>]*>/g, '') // Supprimer les balises HTML
    const id = slugify(text)

    headings.push({ id, text, level })
  }

  return headings
}

/**
 * Convertit un texte en slug pour les anchors
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Calcule le temps de lecture approximatif (mots/min)
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * Récupère un article par son slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await loadBlogPosts()
  return posts.find(post => post.slug === slug) || null
}

/**
 * Récupère tous les articles
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  return loadBlogPosts()
}

/**
 * Récupère les articles paginés
 */
export async function getPaginatedPosts(
  page: number = 1,
  perPage: number = 10
): Promise<{ posts: BlogPost[]; total: number; totalPages: number; currentPage: number }> {
  const allPosts = await loadBlogPosts()
  const total = allPosts.length
  const totalPages = Math.ceil(total / perPage)
  const start = (page - 1) * perPage
  const end = start + perPage
  const posts = allPosts.slice(start, end)

  return {
    posts,
    total,
    totalPages,
    currentPage: page,
  }
}

/**
 * Récupère les articles similaires (même catégorie ou tags communs)
 */
export async function getRelatedPosts(
  currentPost: BlogPost,
  limit: number = 3
): Promise<BlogPost[]> {
  const allPosts = await loadBlogPosts()
  const related: Array<{ post: BlogPost; score: number }> = []

  for (const post of allPosts) {
    if (post.slug === currentPost.slug) continue

    let score = 0

    // Même catégorie = +2 points
    if (post.category === currentPost.category) {
      score += 2
    }

    // Tags communs = +1 point par tag
    const commonTags = post.tags.filter(tag => currentPost.tags.includes(tag))
    score += commonTags.length

    if (score > 0) {
      related.push({ post, score })
    }
  }

  // Trier par score décroissant et prendre les meilleurs
  return related
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post)
}

/**
 * Récupère les articles par catégorie
 */
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await loadBlogPosts()
  return allPosts.filter(post => post.category === category)
}

/**
 * Récupère toutes les catégories uniques
 */
export async function getAllCategories(): Promise<string[]> {
  const allPosts = await loadBlogPosts()
  const categories = new Set(allPosts.map(post => post.category))
  return Array.from(categories).sort()
}

/**
 * Récupère tous les tags uniques
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await loadBlogPosts()
  const tags = new Set(allPosts.flatMap(post => post.tags))
  return Array.from(tags).sort()
}

/**
 * Récupère les articles précédent et suivant
 */
export async function getAdjacentPosts(
  currentPost: BlogPost
): Promise<{ previous: BlogPost | null; next: BlogPost | null }> {
  const allPosts = await loadBlogPosts()
  const currentIndex = allPosts.findIndex(post => post.slug === currentPost.slug)

  return {
    previous: currentIndex > 0 ? (allPosts[currentIndex - 1] ?? null) : null,
    next: currentIndex < allPosts.length - 1 ? (allPosts[currentIndex + 1] ?? null) : null,
  }
}
