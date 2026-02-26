import { useQuery } from '@tanstack/react-query'

import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import { apiClient } from '@/services/api/client'

async function fetchActiveEventCount(): Promise<number> {
  const { data } = await apiClient.get<number>(API_ENDPOINTS.EVENTS.ACTIVE_COUNT)
  return data
}

export function useActiveEventCount() {
  return useQuery({
    queryKey: ['events', 'activeCount'],
    queryFn: fetchActiveEventCount,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}
