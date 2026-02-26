import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchPodcastItemList } from '@/services/api/podcasts'

export type { PodcastItem } from '@/types/api'

const PAGE_SIZE = 10

export function usePodcastItemList(categoryId?: number | string) {
  return useInfiniteQuery({
    queryKey: ['podcastItems', categoryId],
    queryFn: ({ pageParam }) => fetchPodcastItemList(pageParam as number, categoryId),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length >= PAGE_SIZE ? allPages.length + 1 : undefined,
  })
}
