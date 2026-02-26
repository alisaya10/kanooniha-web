import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import type {
  TicketAppItem,
  TicketInsertParams,
  TicketMessageInsertParams,
  TicketMessageItem,
  TicketReceiverKind,
  TicketRequestKind,
} from '@/types/api/support.types'
import { apiClient } from './client'

export async function fetchTicketRequestKinds(): Promise<TicketRequestKind[]> {
  const { data } = await apiClient.get<TicketRequestKind[]>(
    API_ENDPOINTS.SUPPORT.REQUEST_OPTIONS,
  )
  return data
}

export async function fetchTicketReceiverKindList(): Promise<TicketReceiverKind[]> {
  const { data } = await apiClient.get<TicketReceiverKind[]>(
    API_ENDPOINTS.SUPPORT.TICKET_RECEIVER_KIND_LIST,
  )
  return data
}

export type TicketAppListParams = {
  pageIndex: number
  pageSize: number
}

export async function fetchTicketAppList(
  params: TicketAppListParams,
): Promise<TicketAppItem[]> {
  const { data } = await apiClient.get<TicketAppItem[]>(
    API_ENDPOINTS.SUPPORT.TICKET_APP_LIST,
    {
      params: {
        pageIndex: params.pageIndex.toString(),
        pageSize: params.pageSize.toString(),
      },
    },
  )
  return data
}

export async function fetchTicketMessageList(
  ticketId: string | number,
): Promise<TicketMessageItem[]> {
  const { data } = await apiClient.get<TicketMessageItem[]>(
    API_ENDPOINTS.SUPPORT.TICKET_MESSAGE_LIST(ticketId),
  )
  return data
}

export async function ticketMessageInsert(
  params: TicketMessageInsertParams,
): Promise<number> {
  const { data } = await apiClient.post<number>(
    API_ENDPOINTS.SUPPORT.TICKET_MESSAGE_INSERT,
    params,
  )
  return data
}

export async function ticketInsert(params: TicketInsertParams): Promise<number> {
  const { data } = await apiClient.post<number>(
    API_ENDPOINTS.SUPPORT.TICKET_INSERT,
    params,
  )
  return data
}
