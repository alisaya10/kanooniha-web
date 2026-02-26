import { useQuery } from '@tanstack/react-query'

import { fetchWorkBookKinds } from '@/services/api/records'

export type { WorkBookKind } from '@/types/api'

export function useWorkBookKinds() {
  return useQuery({
    queryKey: ['workBookKinds'],
    queryFn: fetchWorkBookKinds,
    staleTime: 2 * 60 * 1000,
  })
}
