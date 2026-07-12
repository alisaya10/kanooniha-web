export type CalendarEventItem = {
  eventDate: string
  totalEventCount: number
}

export type CalendarEventListParams = {
  FromDate: string
  ToDate: string
}

export type DailyEventItem = {
  eventId: string
  creatorKindId: number
  areaCode: number | null
  apiType: number
  createDate: string
  description: string
  eventDate: string
  expiryDate: string
  groupCodes: string
  name: string
  officeCode: number | null
  roomId: number | null
  updateDate: string
  url: string | null
  presenterName: string
}
