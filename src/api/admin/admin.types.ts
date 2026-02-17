/** Generic paginated response from admin APIs */
export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  limit: number
}

export type AdminUserRole = 'client' | 'collaborateur' | 'admin'
export type AdminUserStatus = 'active' | 'pending' | 'blocked'

export interface AdminUser {
  id: string
  email: string
  role: AdminUserRole
  status?: AdminUserStatus
  createdAt?: string
  organizationName?: string
  name?: string
}

export type AdminDemandeStatut = 'brouillon' | 'en_cours' | 'validee' | 'refusee' | 'terminee'

export interface AdminDemande {
  id: string
  poste: string
  statut: AdminDemandeStatut
  clientId: string
  createdAt?: string
}

export type AdminMissionStatus = 'active' | 'paused' | 'done'

export interface AdminMission {
  id: string
  title: string
  status: AdminMissionStatus
  collaborateurId?: string
  clientId?: string
  startDate?: string
}

export interface AdminStats {
  usersTotal: number
  clientsTotal: number
  collaborateursTotal: number
  demandesTotal: number
  missionsTotal: number
  demandesEnCours?: number
  missionsActives?: number
}

/** Query params for list endpoints */
export interface ListUsersParams {
  page?: number
  limit?: number
  q?: string
  role?: AdminUserRole
  status?: AdminUserStatus
}

export interface ListDemandesParams {
  page?: number
  limit?: number
  q?: string
  status?: AdminDemandeStatut
}

export interface ListMissionsParams {
  page?: number
  limit?: number
  q?: string
  status?: AdminMissionStatus
}
