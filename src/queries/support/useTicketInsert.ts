import { useMutation } from '@tanstack/react-query'

import { ticketInsert } from '@/services/api/support'

export type { TicketInsertParams } from '@/types/api'

export function useTicketInsert() {
  return useMutation({
    mutationFn: ticketInsert,
  })
}
