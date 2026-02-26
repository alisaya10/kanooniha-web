import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import type { LoginParams, LoginResponse, UserInfo } from '@/types/api/auth.types'
import { apiClient } from './client'

export async function fetchUserInfo(): Promise<UserInfo> {
  const { data } = await apiClient.get<UserInfo>(API_ENDPOINTS.AUTH.USER_INFO)
  return data
}

export async function login(params: LoginParams): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, params)
  return data
}
