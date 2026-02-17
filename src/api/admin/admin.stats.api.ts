import { http } from '@/api/http'
import type { AdminStats } from '@/api/admin/admin.types'

export function getAdminStats(): Promise<AdminStats> {
  return http.get<AdminStats>('/admin/stats').then(res => res.data)
}
