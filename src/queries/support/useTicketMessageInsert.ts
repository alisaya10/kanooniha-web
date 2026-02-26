import { useMutation } from '@tanstack/react-query'

import { ticketMessageInsert } from '@/services/api/support'

export type { TicketMessageInsertParams } from '@/types/api'

export function useTicketMessageInsert() {
  return useMutation({
    mutationFn: ticketMessageInsert,
  })
}
