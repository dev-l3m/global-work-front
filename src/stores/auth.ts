import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as authApi from '@/api/auth.api'
import type { RegisterDto, User } from '@/api/types/auth'
import { getToken, setToken, getUser, setUser, clearAuth } from '@/utils/auth-storage'

import type { Role } from '@/api/types/auth'

export type UserRole = Role

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(getUser())
  const accessToken = ref<string | null>(getToken())

  const isAuthenticated = computed(() => !!user.value && !!accessToken.value)
  const role = computed(() => user.value?.role ?? null)
  const isClient = computed(() => user.value?.role === 'client')
  const isCollaborateur = computed(() => user.value?.role === 'collaborateur')
  const isAdmin = computed(() => user.value?.role === 'admin')

  function setAuth(u: User, token: string) {
    user.value = u
    accessToken.value = token
    setUser(u)
    setToken(token)
  }

  function initAuth() {
    const storedUser = getUser()
    const storedToken = getToken()
    if (storedUser && storedToken) {
      user.value = storedUser
      accessToken.value = storedToken
    } else {
      user.value = null
      accessToken.value = null
    }
  }

  async function register(dto: RegisterDto) {
    const res = await authApi.register(dto)
    setAuth(res.user, res.accessToken)
    return res
  }

  async function login(email: string, password: string, role?: Role) {
    const res = await authApi.login({ email, password, role })
    setAuth(res.user, res.accessToken)
    return res
  }

  async function fetchProfile() {
    const u = await authApi.me()
    user.value = u
    setUser(u)
    return u
  }

  function logout() {
    user.value = null
    accessToken.value = null
    clearAuth()
  }

  return {
    user,
    accessToken,
    isAuthenticated,
    role,
    isClient,
    isCollaborateur,
    isAdmin,
    initAuth,
    register,
    login,
    fetchProfile,
    logout,
  }
})
