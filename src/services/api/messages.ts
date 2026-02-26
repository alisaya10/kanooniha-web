import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import type { MessageListItem } from '@/types/api/messages.types'
import { apiClient } from './client'

export async function fetchMessagesList(): Promise<MessageListItem[]> {
  const { data } = await apiClient.get<MessageListItem[]>(API_ENDPOINTS.MESSAGES.LIST)
  return data
}

export async function visitMessage(messageId: string | number): Promise<number> {
  const { data } = await apiClient.get<number>(API_ENDPOINTS.MESSAGES.VISIT(messageId))
  return data
}
