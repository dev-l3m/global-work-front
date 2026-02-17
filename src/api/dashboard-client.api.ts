import { http } from '@/api/http'
import type { ClientDashboardStats, DemandeItem } from '@/api/types/dashboard'

export function getClientStats(): Promise<ClientDashboardStats> {
  return http.get<ClientDashboardStats>('/dashboard/client/stats').then(res => res.data)
}

export function getClientDemandes(limit = 5): Promise<DemandeItem[]> {
  return http
    .get<DemandeItem[]>('/dashboard/client/demandes', { params: { limit } })
    .then(res => res.data)
}
