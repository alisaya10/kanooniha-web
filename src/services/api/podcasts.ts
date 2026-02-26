import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import type { PodcastCategory, PodcastItem } from '@/types/api/podcasts.types'
import { apiClient } from './client'

export async function fetchPodcastCategories(): Promise<PodcastCategory[]> {
  const { data } = await apiClient.get<PodcastCategory[]>(
    API_ENDPOINTS.PODCASTS.CATEGORY_LIST,
  )
  return data
}

export async function fetchPodcastItemList(
  pageIndex: number,
  categoryId?: number | string,
): Promise<PodcastItem[]> {
  const params: Record<string, number | string> = { pageIndex }
  if (categoryId != null && categoryId !== '') params.categoryId = categoryId
  const { data } = await apiClient.get<PodcastItem[]>(API_ENDPOINTS.PODCASTS.ITEM_LIST, {
    params,
  })
  return Array.isArray(data) ? data : []
}

export async function incrementPodcastVisit(podcastId: string | number): Promise<void> {
  await apiClient.get(API_ENDPOINTS.PODCASTS.VISIT_COUNT(podcastId))
}
