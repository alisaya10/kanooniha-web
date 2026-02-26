import { useQuery } from '@tanstack/react-query'

import { fetchVersionCheck } from '@/services/api/app'

export type { VersionCheckResponse } from '@/types/api'

export function useVersionCheck() {
  return useQuery({
    queryKey: ['versionCheck'],
    queryFn: fetchVersionCheck,
    staleTime: 0,
  })
}
