import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import type { NewsItem } from '@/types/api/news.types'
import { apiClient } from './client'

export async function fetchNewsList(): Promise<NewsItem[]> {
  const { data } = await apiClient.get<NewsItem[]>(API_ENDPOINTS.NEWS.LIST)
  return data
}
