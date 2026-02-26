import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import type {
  PollListItem,
  PollSetParams,
  PollSetResponse,
} from '@/types/api/polls.types'
import { apiClient } from './client'

export async function fetchPollList(): Promise<PollListItem[]> {
  const { data } = await apiClient.get<PollListItem[]>(API_ENDPOINTS.POLLS.LIST)
  return data
}

export async function pollSet(params: PollSetParams): Promise<PollSetResponse> {
  const { data } = await apiClient.post<PollSetResponse>(API_ENDPOINTS.POLLS.VOTE, params)
  return data
}
