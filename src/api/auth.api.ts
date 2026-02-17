import { http } from '@/api/http'
import type { AuthResponse, LoginDto, RegisterDto, User } from '@/api/types/auth'

export function register(data: RegisterDto): Promise<AuthResponse> {
  return http.post<AuthResponse>('/auth/register', data).then(res => res.data)
}

export function login(data: LoginDto): Promise<AuthResponse> {
  return http.post<AuthResponse>('/auth/login', data).then(res => res.data)
}

export function me(): Promise<User> {
  return http.get<User>('/auth/me').then(res => res.data)
}
