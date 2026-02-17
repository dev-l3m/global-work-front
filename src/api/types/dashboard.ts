/** Client dashboard stats (GET /dashboard/client/stats) */
export interface ClientDashboardStats {
  talentsActifs: number
  demandesEnCours: number
  missionsTerminees: number
  satisfaction: number
}

/** Single demande item (GET /dashboard/client/demandes) */
export interface DemandeItem {
  id: number
  poste: string
  statut: 'En attente' | 'En cours' | 'Terminée'
  date: string
}

/** Collaborateur dashboard stats (GET /dashboard/collaborateur/stats) */
export interface CollaborateurStats {
  missionsActives: number
  heuresSemaine: number
  formationsCount: number
  evaluation: string
}

/** Single mission item (GET /dashboard/collaborateur/missions) */
export interface MissionItem {
  id: number
  client: string
  poste: string
  statut: 'En cours' | 'En attente'
  heures: number
}

/** Single formation item (GET /dashboard/collaborateur/formations) */
export interface FormationItem {
  id: number
  titre: string
  statut: 'Terminée' | 'En cours'
  date: string
}
