import { http } from '@/api/http'
import type {
  AdminMission,
  AdminMissionStatus,
  ListMissionsParams,
  Paginated,
} from '@/api/admin/admin.types'

export function listMissions(params: ListMissionsParams = {}): Promise<Paginated<AdminMission>> {
  return http.get<Paginated<AdminMission>>('/admin/missions', { params }).then(res => res.data)
}

export function updateMissionStatus(id: string, status: AdminMissionStatus): Promise<AdminMission> {
  return http.patch<AdminMission>(`/admin/missions/${id}/status`, { status }).then(res => res.data)
}
