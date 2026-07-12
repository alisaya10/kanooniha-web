// queries/download.queries.ts
import { useQuery } from '@tanstack/react-query'

import { fetchContentAppItem } from '@/services/api/strategicPlanOrTextBook'
import { DownloadContentType } from '@/types/api/strategicPlanOrTextBook.types'

export type {
  ContentDto,
  DownloadContentType,
} from '@/types/api/strategicPlanOrTextBook.types'

export type UseContentAppItemParams = {
  type: DownloadContentType
}

export function useContentAppItem({ type }: UseContentAppItemParams) {
  return useQuery({
    queryKey: ['contentAppItem', type],
    queryFn: () => fetchContentAppItem(type),
  })
}
