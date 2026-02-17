import type { AxiosError } from 'axios'

/**
 * Extract a user-friendly error message from an API error (axios or generic).
 */
export function getApiErrorMessage(err: unknown): string {
  if (err == null) return 'Une erreur est survenue'

  const axiosErr = err as AxiosError<{ message?: string | string[]; statusCode?: number }>
  if (axiosErr.response?.data) {
    const data = axiosErr.response.data
    if (typeof data.message === 'string') return data.message
    if (Array.isArray(data.message) && data.message.length > 0) {
      return typeof data.message[0] === 'string' ? data.message[0] : 'Données invalides'
    }
  }

  if (axiosErr.message && typeof axiosErr.message === 'string') {
    if (axiosErr.code === 'ECONNABORTED' || axiosErr.message.includes('timeout')) {
      return 'La requête a expiré. Réessayez.'
    }
    if (axiosErr.message.includes('Network Error')) {
      return 'Impossible de joindre le serveur. Vérifiez votre connexion.'
    }
  }

  if (err instanceof Error && err.message) return err.message
  return 'Une erreur est survenue'
}
