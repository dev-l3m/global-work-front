/**
 * Centralized auth storage (token + user) for use in store and HTTP interceptors.
 * Avoids duplication and allows future switch to sessionStorage if needed.
 */

const TOKEN_KEY = 'gwh.accessToken'
const USER_KEY = 'gwh.user'

export interface StoredUser {
  email: string
  role: 'client' | 'collaborateur' | 'admin'
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function getUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredUser
  } catch {
    return null
  }
}

export function setUser(user: StoredUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearUser(): void {
  localStorage.removeItem(USER_KEY)
}

export function clearAuth(): void {
  clearToken()
  clearUser()
}
