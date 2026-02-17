import { getServiceBySlug, type ServiceData } from '@/content/services'
import { getAllPosts } from '@/composables/useBlog'
import type { BlogPost } from '@/types/blog'

/**
 * Récupère les données d'un service par son slug
 */
export function getService(slug: string): ServiceData | null {
  return getServiceBySlug(slug) || null
}

/**
 * Récupère les articles de blog liés à un service
 */
export async function getRelatedBlogPosts(service: ServiceData): Promise<BlogPost[]> {
  if (!service.relatedBlogPosts || service.relatedBlogPosts.length === 0) {
    return []
  }

  const allPosts = await getAllPosts()
  return allPosts.filter(post => service.relatedBlogPosts.includes(post.slug))
}
