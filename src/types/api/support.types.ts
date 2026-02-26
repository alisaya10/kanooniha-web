export type TicketRequestKind = {
  kindId: number
  title: string
}

export type TicketReceiverKind = {
  receiverKindId: number
  name: string
  kind: number
  isActive: boolean
}

export type TicketAppItem = {
  ticketId: number
  userId: number
  counter: number | null
  supportKindId: number
  supportKindName: string
  receiverKindId: number
  ticketStatus: number
  answeredMessageCount: number
  lastMessage: string
  receiverKindName: string
  isClosed: boolean
  dateCreate: string
  dateUpdate: string | null
  currentYear: number
}

export type TicketInsertParams = {
  supportKindId: number
  message: string
  receiverKindId: number
}

export type TicketMessageItem = {
  messageId: number
  ticketId: number
  senderKind: number
  counter: number
  areaCode: number
  officeCode: number
  fullName: string
  message: string
  messageStatus: number
  dateCreate: string
}

export type TicketMessageInsertParams = {
  ticketId: number
  message: string
}
