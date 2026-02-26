import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import type {
  CalendarEventItem,
  CalendarEventListParams,
  DailyEventItem,
} from '@/types/api/events.types'
import { apiClient } from './client'

export async function fetchCalendarEventList(
  params: CalendarEventListParams,
): Promise<CalendarEventItem[]> {
  const { data } = await apiClient.get<CalendarEventItem[]>(
    API_ENDPOINTS.EVENTS.CALENDAR_LIST(params.FromDate, params.ToDate),
  )
  return data
}

export async function fetchDailyEventList(date: string): Promise<DailyEventItem[]> {
  const { data } = await apiClient.get<DailyEventItem[]>(
    API_ENDPOINTS.EVENTS.DAILY_LIST(date),
  )
  return data
}

export async function fetchActiveEventCount(): Promise<number> {
  const { data } = await apiClient.get<number>(API_ENDPOINTS.EVENTS.ACTIVE_COUNT)
  return data
}

export async function fetchEventSkyRoom(
  roomId: string,
  apiType: string,
): Promise<string> {
  const { data } = await apiClient.get<string>(
    API_ENDPOINTS.EVENTS.SKY_ROOM(roomId, apiType),
  )
  return data
}
