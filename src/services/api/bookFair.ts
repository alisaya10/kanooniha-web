import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import type {
  GetInvitationGiftResponse,
  GetMemberGiftResponse,
  GetQuestionListResponse,
  GetStudentGiftResponse,
  SubmitAnswerParams,
  SubmitAnswerResponse,
} from '@/types/api'
import { apiClient } from './client'

export async function fetchQuestionList(): Promise<GetQuestionListResponse> {
  const { data } = await apiClient.get<GetQuestionListResponse>(
    API_ENDPOINTS.BOOK_FAIR.GET_QUESTION_LIST,
  )
  return data
}

export async function submitAnswer(
  params: SubmitAnswerParams,
): Promise<SubmitAnswerResponse> {
  const { data } = await apiClient.post<SubmitAnswerResponse>(
    API_ENDPOINTS.BOOK_FAIR.SUBMIT_ANSWER,
    params,
  )
  return data
}

export async function fetchMemberGift(): Promise<GetMemberGiftResponse> {
  const { data } = await apiClient.get<GetMemberGiftResponse>(
    API_ENDPOINTS.BOOK_FAIR.GET_MEMBER_GIFT,
  )
  return data
}

export async function fetchStudentGift(): Promise<GetStudentGiftResponse> {
  const { data } = await apiClient.get<GetStudentGiftResponse>(
    API_ENDPOINTS.BOOK_FAIR.GET_STUDENT_GIFT,
  )
  return data
}

export async function fetchInvitationCode(): Promise<GetInvitationGiftResponse> {
  const { data } = await apiClient.get<string>(
    API_ENDPOINTS.BOOK_FAIR.GET_INVITATION_CODE,
  )
  return data
}
