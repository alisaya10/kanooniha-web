import { useQuery } from '@tanstack/react-query'

import { fetchBookFairCityList } from '@/services/api/auth'

export function useBookFairCityList(stateCode: number | null) {
  return useQuery({
    queryKey: ['bookFairCityList', stateCode],
    queryFn: () => fetchBookFairCityList(stateCode!),
    enabled: stateCode != null,
    staleTime: 5 * 60 * 1000,
  })
}
