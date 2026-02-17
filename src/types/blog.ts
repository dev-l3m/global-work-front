/**
 * Types pour le système de blog
 */

export interface BlogPostFrontmatter {
  title: string
  slug: string
  description: string
  date: string
  category: string
  tags: string[]
  cover?: string
  coverAlt?: string
  readingTime?: number
}

export interface BlogPostHeading {
  id: string
  text: string
  level: number
}

export interface BlogPost extends BlogPostFrontmatter {
  content: string // HTML rendu
  headings: BlogPostHeading[]
  frontmatter: BlogPostFrontmatter
}

export interface PaginatedPosts {
  posts: BlogPost[]
  total: number
  totalPages: number
  currentPage: number
}
