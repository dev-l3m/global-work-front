import { http } from '@/api/http'
import type {
  AdminUser,
  AdminUserRole,
  AdminUserStatus,
  ListUsersParams,
  Paginated,
} from '@/api/admin/admin.types'

export function listUsers(params: ListUsersParams = {}): Promise<Paginated<AdminUser>> {
  return http.get<Paginated<AdminUser>>('/admin/users', { params }).then(res => res.data)
}

export function getUser(id: string): Promise<AdminUser> {
  return http.get<AdminUser>(`/admin/users/${id}`).then(res => res.data)
}

export function updateUserStatus(id: string, status: AdminUserStatus): Promise<AdminUser> {
  return http.patch<AdminUser>(`/admin/users/${id}/status`, { status }).then(res => res.data)
}

export function updateUserRole(id: string, role: AdminUserRole): Promise<AdminUser> {
  return http.patch<AdminUser>(`/admin/users/${id}/role`, { role }).then(res => res.data)
}

export function deleteUser(id: string): Promise<void> {
  return http.delete(`/admin/users/${id}`).then(() => undefined)
}
