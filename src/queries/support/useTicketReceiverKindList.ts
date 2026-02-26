import { useQuery } from '@tanstack/react-query'

import { fetchTicketReceiverKindList } from '@/services/api/support'

export type { TicketReceiverKind } from '@/types/api'

export function useTicketReceiverKindList() {
  return useQuery({
    queryKey: ['receiverKindList'],
    queryFn: fetchTicketReceiverKindList,
    staleTime: 5 * 60 * 1000,
  })
}
