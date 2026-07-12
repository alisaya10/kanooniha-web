import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import type { AppPromotionListResponse } from '@/types/api/appPromotion.types'
import { apiClient } from './client'

export async function fetchAppPromotionList(): Promise<AppPromotionListResponse> {
  const { data } = await apiClient.get<AppPromotionListResponse>(
    API_ENDPOINTS.APP_PROMOTION.LIST,
  )
  return data
}
