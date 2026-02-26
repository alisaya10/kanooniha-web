import { useQuery } from '@tanstack/react-query'

import { fetchPollList } from '@/services/api/polls'

export type { PollListItem, PollQuestion } from '@/types/api'

export function usePollList() {
  return useQuery({
    queryKey: ['pollList'],
    queryFn: fetchPollList,
    staleTime: 5 * 60 * 1000,
  })
}
