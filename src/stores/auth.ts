import { defineStore } from 'pinia'

export type UserRole = 'client' | 'collaborateur'

type SessionUser = {
  email: string
  role: UserRole
}

const STORAGE_KEY = 'gwh.session'

function loadSession(): SessionUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as SessionUser
  } catch {
    return null
  }
}

function saveSession(user: SessionUser | null) {
  if (!user) {
    localStorage.removeItem(STORAGE_KEY)
    return
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: loadSession() as SessionUser | null,
  }),
  getters: {
    isAuthenticated: s => !!s.user,
    role: s => s.user?.role ?? null,
  },
  actions: {
    login(email: string, role: UserRole) {
      this.user = { email, role }
      saveSession(this.user)
    },
    logout() {
      this.user = null
      saveSession(null)
    },
  },
})
