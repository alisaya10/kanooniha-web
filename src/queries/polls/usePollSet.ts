import { useMutation } from '@tanstack/react-query'

import { pollSet } from '@/services/api/polls'

export type { PollSetParams, PollSetResponse } from '@/types/api'

export function usePollSet() {
  return useMutation({
    mutationFn: pollSet,
  })
}
