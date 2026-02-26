import { useMutation } from '@tanstack/react-query'

import { visitMessage } from '@/services/api/messages'

export function useVisitMessage() {
  return useMutation({
    mutationFn: visitMessage,
  })
}
