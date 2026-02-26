import { useQuery } from '@tanstack/react-query'

import { fetchPodcastCategories } from '@/services/api/podcasts'

export type { PodcastCategory } from '@/types/api'

export function usePodcastCategories() {
  return useQuery({
    queryKey: ['podcastCategories'],
    queryFn: fetchPodcastCategories,
    staleTime: 2 * 60 * 1000,
  })
}
