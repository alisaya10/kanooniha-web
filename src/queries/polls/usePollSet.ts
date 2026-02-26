import { useMutation, useQueryClient } from '@tanstack/react-query'

import { pollSet } from '@/services/api/polls'

export type { PollSetParams, PollSetResponse } from '@/types/api'

export function usePollSet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: pollSet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pollList'] })
    },
  })
}
