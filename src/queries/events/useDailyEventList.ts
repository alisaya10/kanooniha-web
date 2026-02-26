import { useQuery } from '@tanstack/react-query'

import { fetchDailyEventList } from '@/services/api/events'

export type { DailyEventItem } from '@/types/api'

export function useDailyEventList(date: string) {
  return useQuery({
    queryKey: ['dailyList', date],
    queryFn: () => fetchDailyEventList(date),
    enabled: Boolean(date),
    staleTime: 2 * 60 * 1000,
  })
}
