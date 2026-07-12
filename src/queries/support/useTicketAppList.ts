import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchTicketAppList } from '@/services/api/support'

const PAGE_SIZE = 10

export type { TicketAppItem } from '@/types/api'

export function useTicketAppList() {
  return useInfiniteQuery({
    queryKey: ['ticketAppList'],
    queryFn: ({ pageParam }) =>
      fetchTicketAppList({ pageIndex: pageParam as number, pageSize: PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.length || lastPage.length < PAGE_SIZE) return undefined
      return allPages.length + 1
    },
    staleTime: 0,
    gcTime: 0,
  })
}
