export type MessageListItem = {
  id: number
  title: string
  fullName: string
  hasSeen: boolean
  filePath: string | null
  insertDate: string
  insertMessageDate_Gregorian: string
  link: string
  linkTitle: string
  message: string
  messageKind: number
  messageReference: number
  oFamily: string
  oName: string
}
