// types/api/download.ts
export const DownloadContentType = {
  StrategicPlan: 0,
  TextBook: 1,
} as const

export type DownloadContentType =
  (typeof DownloadContentType)[keyof typeof DownloadContentType]
// این معادل: type DownloadContentType = 0 | 1

export interface ContentDto {
  id?: number
  type: DownloadContentType
  link: string
  examDate?: number
  groupCode: number
  desc?: string
}

export interface ContentAppItemParams {
  type: DownloadContentType
}
