import { useQuery } from '@tanstack/react-query'

import { fetchNextExam } from '@/services/api/records'

export type { NextExam } from '@/types/api'

export function useNextExam() {
  return useQuery({
    queryKey: ['nextExam'],
    queryFn: fetchNextExam,
    staleTime: 2 * 60 * 1000,
  })
}
