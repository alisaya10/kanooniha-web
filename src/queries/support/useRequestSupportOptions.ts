import { useQuery } from '@tanstack/react-query'

import { fetchTicketRequestKinds } from '@/services/api/support'

export type { TicketRequestKind } from '@/types/api'

export function useRequestSupportOptions() {
  return useQuery({
    queryKey: ['requestOptions'],
    queryFn: fetchTicketRequestKinds,
    staleTime: 5 * 60 * 1000,
  })
}
