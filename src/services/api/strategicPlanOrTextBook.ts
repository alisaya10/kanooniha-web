import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import {
  DownloadContentType,
  type ContentDto,
} from '@/types/api/strategicPlanOrTextBook.types'
import { apiClient } from './client'

export async function fetchContentAppItem(
  type: DownloadContentType,
): Promise<ContentDto> {
  const { data } = await apiClient.get<ContentDto>(
    API_ENDPOINTS.DOWNLOAD.CONTENT_APP_ITEM(type),
  )
  return data
}
