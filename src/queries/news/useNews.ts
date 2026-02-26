import { useQuery } from '@tanstack/react-query'

import { fetchNewsList } from '@/services/api/news'

export type { NewsItem } from '@/types/api'

export function useNewsList() {
  return useQuery({
    queryKey: ['newsList'],
    queryFn: fetchNewsList,
    staleTime: 5 * 60 * 1000,
  })
}
