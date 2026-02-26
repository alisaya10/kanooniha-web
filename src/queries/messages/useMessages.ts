import { useQuery } from '@tanstack/react-query'

import { fetchMessagesList } from '@/services/api/messages'

export type { MessageListItem } from '@/types/api'

export function useMessagesList() {
  return useQuery({
    queryKey: ['messagesList'],
    queryFn: fetchMessagesList,
    staleTime: 5 * 60 * 1000,
  })
}
