import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import type {
  BookFairProfileDataResponse,
  BookFairProfileSelectItem,
  BookFairSignupParams,
  BookFairSignupResponse,
  BookFairSubmitProfileParams,
  BookFairSubmitProfileResponse,
  LoginParams,
  LoginResponse,
  MemberVerifyParams,
  UserInfo,
} from '@/types/api/auth.types'
import { apiClient } from './client'

export async function fetchUserInfo(): Promise<UserInfo> {
  const { data } = await apiClient.get<UserInfo>(API_ENDPOINTS.AUTH.USER_INFO)
  return data
}

export async function login(params: LoginParams): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, params)
  return data
}

export async function bookFairSignup(
  params: BookFairSignupParams,
): Promise<BookFairSignupResponse> {
  const { data } = await apiClient.post<BookFairSignupResponse>(
    API_ENDPOINTS.AUTH.BOOK_FAIR_SIGNUP,
    params,
  )
  return data
}

/** پس از interceptor، بدنه به مقدار داخلی `data` (JWT) تبدیل می‌شود */
export async function memberVerify(params: MemberVerifyParams): Promise<string> {
  const { data } = await apiClient.post<string>(
    API_ENDPOINTS.AUTH.BOOK_FAIR_MEMBER_VERIFY,
    params,
  )
  return data
}

export async function bookFairSubmitProfile(
  params: BookFairSubmitProfileParams,
): Promise<BookFairSubmitProfileResponse> {
  const { data } = await apiClient.post<BookFairSubmitProfileResponse>(
    API_ENDPOINTS.BOOK_FAIR.SUBMIT_PROFILE,
    params,
  )
  return data
}

export async function fetchBookFairProfileData(): Promise<
  BookFairProfileDataResponse['data']
> {
  const { data } = await apiClient.get<BookFairProfileDataResponse['data']>(
    API_ENDPOINTS.BOOK_FAIR.GET_PROFILE_DATA,
  )
  return data
}

export async function fetchBookFairCityList(
  stateCode: number,
): Promise<BookFairProfileSelectItem[]> {
  const { data } = await apiClient.get<BookFairProfileSelectItem[] | unknown>(
    API_ENDPOINTS.BOOK_FAIR.CITY_LIST(stateCode),
  )
  return Array.isArray(data) ? data : []
}
