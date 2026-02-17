import { http } from '@/api/http'
import type { CollaborateurStats, FormationItem, MissionItem } from '@/api/types/dashboard'

export function getCollaborateurStats(): Promise<CollaborateurStats> {
  return http.get<CollaborateurStats>('/dashboard/collaborateur/stats').then(res => res.data)
}

export function getCollaborateurMissions(): Promise<MissionItem[]> {
  return http.get<MissionItem[]>('/dashboard/collaborateur/missions').then(res => res.data)
}

export function getCollaborateurFormations(): Promise<FormationItem[]> {
  return http.get<FormationItem[]>('/dashboard/collaborateur/formations').then(res => res.data)
}
