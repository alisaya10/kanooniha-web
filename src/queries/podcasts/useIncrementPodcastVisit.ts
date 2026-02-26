import { useMutation } from '@tanstack/react-query'

import { incrementPodcastVisit } from '@/services/api/podcasts'

export function useIncrementPodcastVisit() {
  return useMutation({
    mutationFn: incrementPodcastVisit,
  })
}
