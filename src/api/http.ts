import axios from 'axios'
import { getToken, clearAuth } from '@/utils/auth-storage'

const baseURL = import.meta.env.VITE_API_URL as string | undefined
const withCredentials = import.meta.env.VITE_API_WITH_CREDENTIALS === 'true'

export const http = axios.create({
  baseURL: baseURL ?? '',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials,
})

http.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status

    if (status === 401) {
      clearAuth()
      const frontendUrl = (import.meta.env.VITE_FRONTEND_URL as string) || window.location.origin
      const redirectPath = window.location.pathname + window.location.search
      const redirect =
        redirectPath && redirectPath !== '/' ? `?redirect=${encodeURIComponent(redirectPath)}` : ''
      window.location.href = `${frontendUrl.replace(/\/$/, '')}/connexion${redirect}`
      return Promise.reject(error)
    }

    if (status === 403) {
      console.warn('[API] 403 Forbidden', error.config?.url)
    }
    if (status >= 500) {
      console.warn('[API] Server error', status, error.config?.url)
    }

    return Promise.reject(error)
  }
)
