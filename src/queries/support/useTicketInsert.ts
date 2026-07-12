import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ticketInsert } from '@/services/api/support'

export type { TicketInsertParams } from '@/types/api'

export function useTicketInsert() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ticketInsert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticketAppList'] })
    },
  })
}
