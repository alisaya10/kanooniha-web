import { useQuery } from '@tanstack/react-query'

import { fetchBookFairProfileData } from '@/services/api/auth'

export type {
  BookFairProfileDataResponse,
  BookFairProfileSelectItem,
} from '@/types/api/auth.types'

export function useBookFairProfileData() {
  return useQuery({
    queryKey: ['bookFairProfileData'],
    queryFn: fetchBookFairProfileData,
    staleTime: 0,
  })
}
