import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import type { VersionCheckResponse } from '@/types/api/app.types'
import { apiClient } from './client'

export async function fetchVersionCheck(): Promise<VersionCheckResponse> {
  const { data } = await apiClient.get<VersionCheckResponse>(
    API_ENDPOINTS.APP.VERSION_CHECK,
  )
  return data
}
