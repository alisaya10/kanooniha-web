import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import type {
  LastExam,
  NextExam,
  PastRecordsResponse,
  WorkBookDownloadResponse,
  WorkBookKind,
} from '@/types/api/records.types'
import { apiClient } from './client'

export async function fetchWorkBookKinds(): Promise<WorkBookKind[]> {
  const { data } = await apiClient.get<WorkBookKind[]>(API_ENDPOINTS.RECORDS.KINDS)
  return data
}

export async function fetchDownloadWorkBook(
  kind: string,
  dateValue: string,
): Promise<WorkBookDownloadResponse> {
  const { data } = await apiClient.post<WorkBookDownloadResponse>(
    API_ENDPOINTS.RECORDS.DOWNLOAD,
    {},
    { params: { kind, dateValue: dateValue ?? '' } },
  )
  return data
}

export async function fetchPastRecords(): Promise<PastRecordsResponse> {
  const { data } = await apiClient.get<PastRecordsResponse | PastRecordsResponse['data']>(
    API_ENDPOINTS.RECORDS.PAST_RECORDS,
  )
  if (Array.isArray(data)) {
    return { data, message: undefined }
  }
  return data as PastRecordsResponse
}

export async function fetchLastExam(): Promise<LastExam> {
  const { data } = await apiClient.get<LastExam>(API_ENDPOINTS.RECORDS.LAST_EXAM)
  return data
}

export async function fetchNextExam(): Promise<NextExam> {
  const { data } = await apiClient.get<NextExam>(API_ENDPOINTS.RECORDS.NEXT_EXAM)
  return data
}
