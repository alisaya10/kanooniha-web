import { useQuery } from '@tanstack/react-query'

import { fetchTicketMessageList } from '@/services/api/support'

export type { TicketMessageItem } from '@/types/api'

export function useTicketMessageList(ticketId: string | number | undefined) {
  return useQuery({
    queryKey: ['ticketMessageList', ticketId],
    queryFn: () => fetchTicketMessageList(ticketId!),
    enabled: ticketId != null && ticketId !== '',
  })
}
