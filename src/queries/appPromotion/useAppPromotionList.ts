import { useQuery } from '@tanstack/react-query'

import { fetchAppPromotionList } from '@/services/api/appPromotion'

export type { AppPromotionItem } from '@/types/api'

export function useAppPromotionList() {
  return useQuery({
    queryKey: ['appPromotionList'],
    queryFn: fetchAppPromotionList,
    staleTime: 5 * 60 * 1000,
  })
}
