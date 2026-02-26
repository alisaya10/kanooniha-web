export type WorkBookKind = {
  kind: string
  title: string
  isDateValue: boolean
  isPdf: boolean
  isHtml: boolean
  isActive: boolean
  dateValue?: string
}

export type WorkBookDownloadResponse = {
  wordBookPdfLink?: string
  workBorkPdfStatus: string
  workBook?: string
}

export type LastExam = {
  title: string
  isShow: boolean
  dateValue: number
  dateValuePersian: string
  totalLevel: number
  totalRank: number
}

export type NextExam = {
  title: string
  isShow: boolean
  dateValue: number
  dateValuePersian: string
  remainingDays: number
  remainingDaysText: string
}

export type PastRecordItem = {
  dateValue: string | number
  totalLevel?: number
  totalRank?: number
}

export type PastRecordsResponse = {
  message?: string
  data: PastRecordItem[]
}
