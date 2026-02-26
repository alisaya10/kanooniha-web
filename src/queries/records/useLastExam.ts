import { useQuery } from '@tanstack/react-query'

import { fetchLastExam } from '@/services/api/records'

export type { LastExam } from '@/types/api'

export function useLastExam() {
  return useQuery({
    queryKey: ['lastExam'],
    queryFn: fetchLastExam,
    staleTime: 2 * 60 * 1000,
  })
}
