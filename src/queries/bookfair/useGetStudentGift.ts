import { useQuery } from '@tanstack/react-query'

import { fetchStudentGift } from '@/services/api/bookFair'

export type { GetStudentGiftResponse } from '@/types/api'

export function useGetStudentGift() {
  return useQuery({
    queryKey: ['StudentGift'],
    queryFn: fetchStudentGift,
    staleTime: 0,
  })
}
