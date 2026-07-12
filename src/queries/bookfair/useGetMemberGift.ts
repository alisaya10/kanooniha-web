import { useQuery } from '@tanstack/react-query'

import { fetchMemberGift } from '@/services/api/bookFair'

export type { GetQuestionListResponse } from '@/types/api'

export function useGetMemberGift() {
  return useQuery({
    queryKey: ['giftList'],
    queryFn: fetchMemberGift,
    staleTime: 0,
  })
}
