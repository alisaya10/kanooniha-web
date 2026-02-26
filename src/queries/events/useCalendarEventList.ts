import { useQuery } from '@tanstack/react-query'

import { fetchCalendarEventList } from '@/services/api/events'
import type { CalendarEventListParams } from '@/types/api'

export type { CalendarEventItem, CalendarEventListParams } from '@/types/api'

export function useCalendarEventList(params: CalendarEventListParams) {
  const enabled = Boolean(params.FromDate) && Boolean(params.ToDate)

  return useQuery({
    queryKey: ['calendarList', params.FromDate, params.ToDate],
    queryFn: () => fetchCalendarEventList(params),
    enabled,
    staleTime: 2 * 60 * 1000,
  })
}
