export type AppPromotionItem = {
  id?: number | null
  title: string
  groupCodes: string
  color: string
  imagePath: string
  link: string
  description: string
  isActive: boolean
  dateInsert: string
  dateUpdate?: string | null
}

export type AppPromotionListResponse = AppPromotionItem[]
