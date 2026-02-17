import { http } from '@/api/http'
import type {
  AdminDemande,
  AdminDemandeStatut,
  ListDemandesParams,
  Paginated,
} from '@/api/admin/admin.types'

export function listDemandes(params: ListDemandesParams = {}): Promise<Paginated<AdminDemande>> {
  return http.get<Paginated<AdminDemande>>('/admin/demandes', { params }).then(res => res.data)
}

export function getDemande(id: string): Promise<AdminDemande> {
  return http.get<AdminDemande>(`/admin/demandes/${id}`).then(res => res.data)
}

export function updateDemandeStatus(id: string, status: AdminDemandeStatut): Promise<AdminDemande> {
  return http.patch<AdminDemande>(`/admin/demandes/${id}/status`, { status }).then(res => res.data)
}
